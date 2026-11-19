// «Cuantificadores y silogismos» · escenas de la lección pu-lo-4. Motor en kit.js, preu.js y piezas.js; guion en silogismos.data.js.
// El primer conjunto en cian, el segundo en ámbar, el tercero en violeta, lo que se mira ahora en lima, lo seguro en verde y lo que rompe en magenta.
const A_ = C.cyan, B_ = C.amber, C_ = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Conjunto: elipse con relleno suave y rótulo.
function setE(x, y, rx, ry, col, lab, o = {}) {
  X.save(); X.fillStyle = hexA(col, o.fill ?? .08); X.beginPath(); X.ellipse(x, y, rx, ry, 0, 0, 7); X.fill(); X.restore();
  stroke(col, 3, () => X.ellipse(x, y, rx, ry, 0, 0, 7), { g: 10, dash: o.dash });
  if (lab) mono(lab, x + (o.lx || 0), y + (o.ly ?? -ry + 40), col, { s: o.s || 24 });
}
const S = {
  // 1 · El reto: los músicos de la banda.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Se sabe que «todos los músicos de la banda leen partituras» y', 'que «algunos estudiantes de once son músicos de la banda».', 'La única afirmación que necesariamente es verdadera es:'], opts: ['Algunos estudiantes de once leen partituras', 'Todos los estudiantes de once leen partituras', 'Todos los que leen partituras son de la banda', 'Algunos estudiantes de once no leen partituras'], ok: 0, col1: true, os: 30 });
    fade(A(t, 9.6, .6), () => { setE(CX, 1180, 380, 210, B_, 'leen partituras'); setE(CX - 60, 1210, 170, 110, A_, 'músicos de la banda', { ly: 8, s: 22 }); });
    fade(A(t, 10.4, .5), () => setE(CX + 180, 1260, 200, 110, C_, 'de once', { lx: 80, ly: 10, dash: [10, 6] }));
  },
  // 2 · Todos: un círculo dentro.
  todos(t) {
    stars(t, .3);
    setE(CX, 820, 400, 270, B_, 'flores'); fade(A(t, 1, .6), () => setE(CX - 100, 860, 170, 120, A_, 'violetas', { ly: 8 }));
    fade(A(t, 9.2, .5), () => { dot(CX + 220, 900, 14, B_, 14); mono('rosa', CX + 220, 950, B_, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { F([['todo ', 'r'], ['A', 'i', A_], [' es ', 'r'], ['B', 'i', B_], ['  ⇒  ', 'r'], ['A', 'i', A_], [' dentro de ', 'r'], ['B', 'i', B_]], CX, 1200, 46); mono('no al revés', CX, 1270, BAD, { s: 26 }); });
  },
  // 3 · Ninguno: separados.
  ninguno(t) {
    stars(t, .3);
    setE(300, 820, 200, 160, A_, 'triángulos'); setE(780, 820, 200, 160, B_, 'cuatro lados');
    polyL([[300, 760], [240, 870], [360, 870]], A_, { lw: 3 }); stroke(B_, 3, () => X.rect(730, 770, 100, 100), { g: 10 });
    fade(A(t, 9.2, .5), () => { arrow(500, 820, 580, 820, BAD, 1, 3, { h: 10 }); arrow(580, 860, 500, 860, BAD, 1, 3, { h: 10 }); mono('no se tocan', CX, 1060, BAD, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['ningún ', 'r'], ['A', 'i', A_], [' es ', 'r'], ['B', 'i', B_], ['  =  ', 'r'], ['ningún ', 'r'], ['B', 'i', B_], [' es ', 'r'], ['A', 'i', A_]], CX, 1180, 46));
  },
  // 4 · Algunos: al menos uno.
  algunos(t) {
    stars(t, .3);
    setE(400, 820, 240, 180, A_, 'músicos', { lx: -60 }); setE(680, 820, 240, 180, B_, 'zurdos', { lx: 60 });
    fade(A(t, 9.2, .5), () => { dot(540, 830, 16, NOW, 20); mono('al menos uno', 540, 900, NOW, { s: 22 }); });
    fade(A(t, 18.2, .5), () => { X.save(); X.fillStyle = hexA(C.mute, .25); X.beginPath(); X.ellipse(400, 820, 240, 180, 0, 0, 7); X.fill(); X.restore(); mono('¿y aquí? puede haber o no', 280, 1060, C.mute, { s: 22 }); });
  },
  // 5 · Problema: los gatos de Marta.
  gatos(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se sabe que «todos los gatos de Marta son negros» y que', '«Tom no es negro». Se puede concluir que:'], opts: ['Tom no es un gato de Marta', 'Tom es un gato de Marta', 'Tom no es un gato', 'Marta no tiene gatos'], ok: 0, col1: true, os: 32, rv: 22.6 });
    fade(A(t, 10, .5), () => { setE(420, 1150, 320, 200, B_, 'negros'); setE(380, 1180, 150, 100, A_, 'gatos de Marta', { ly: 8, s: 22 }); fade(A(t, 11, .5), () => { dot(880, 1150, 16, t > 20.4 ? RES : NOW, 18); mono('Tom', 880, 1210, t > 20.4 ? RES : NOW, { s: 26 }); }); });
  },
  // 6 · La cadena: un silogismo.
  cadena(t) {
    stars(t, .3);
    setE(CX, 840, 440, 300, C_, 'americanos');
    fade(A(t, 1, .5), () => setE(CX - 40, 880, 290, 200, B_, 'colombianos'));
    fade(A(t, 1.8, .5), () => setE(CX - 80, 910, 140, 90, A_, 'bogotanos', { ly: 8 }));
    fade(A(t, 18.2, .5), () => { F([['bogotanos', 'r', A_], ['  ⊂  ', 'r'], ['colombianos', 'r', B_], ['  ⊂  ', 'r'], ['americanos', 'r', C_]], CX, 1250, 40); mono('todos los bogotanos son americanos', CX, 1320, RES, { s: 26 }); });
  },
  // 7 · Problema: ningún reptil tiene pelo.
  reptiles(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Se sabe que «ningún reptil tiene pelo» y que «algunos', 'animales del zoológico tienen pelo». Es necesariamente', 'verdadera:'], opts: ['Algunos del zoológico no son reptiles', 'Ningún animal del zoológico es reptil', 'Algunos del zoológico son reptiles', 'Todos los del zoológico tienen pelo'], ok: 0, col1: true, os: 30, rv: 22.6 });
    fade(A(t, 10, .5), () => { setE(250, 1240, 170, 140, BAD, 'reptiles'); setE(760, 1240, 210, 150, B_, 'con pelo', { lx: 60 }); setE(560, 1260, 210, 120, A_, 'zoológico', { ly: 90, dash: [10, 6] }); fade(A(t, 11, .5), () => { dot(660, 1250, 16, t > 20.4 ? RES : NOW, 18); }); });
  },
  // 8 · La trampa: puede ser no es seguro.
  trampa(t) {
    stars(t, .3);
    const two = t > 9;
    setE(CX, 820, 380, 250, B_, 'B'); setE(CX - 120, 840, 160, 120, A_, 'A', { ly: 8 });
    setE(two ? CX + 230 : CX - 20, two ? 840 : 860, 120, 90, C_, 'C', { ly: 8, dash: [8, 6] });
    fade(win(t, .8, 9), () => mono('aquí A y C se cruzan', CX, 1130, NOW, { s: 26 }));
    fade(A(t, 9.4, .5), () => mono('aquí no: las premisas siguen cumpliéndose', CX, 1130, BAD, { s: 26 }));
    fade(A(t, 18.2, .5), () => mono('necesario = cierto en todos los dibujos', CX, 1230, RES, { s: 28 }));
  },
  // 9 · La banda resuelta.
  resolver(t) {
    stars(t, .3);
    setE(CX - 40, 820, 400, 250, B_, 'leen partituras'); setE(CX - 120, 850, 180, 120, A_, 'músicos de la banda', { ly: 8, s: 22 });
    fade(A(t, 10.2, .5), () => { setE(CX + 220, 900, 260, 140, C_, 'de once', { lx: 90, ly: 10, dash: [10, 6] }); dot(CX - 20, 880, 16, t > 20.2 ? RES : NOW, 20); });
    fade(A(t, 20.2, .5), () => { mono('este estudiante está en la banda y lee', CX, 1140, RES, { s: 24 }); mono('el resto de once: puede leer o no', CX, 1190, C.mute, { s: 22 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['algunos leen', 'todos leen', 'todo lector, músico', 'algunos no leen'], 0, 'en la banda ⇒ lee partituras', { s: 32, fs: 40 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['A dentro de B', 'r']], 'todos'], [[['separados', 'r']], 'ninguno'], [[['se cruzan', 'r']], 'algunos: al menos uno'], [[['en todos los dibujos', 'r']], 'necesariamente']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [A_, B_, C_]);
    });
  },
};
