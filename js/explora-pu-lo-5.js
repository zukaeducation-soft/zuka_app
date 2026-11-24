// Preuniversitario · pu-lo-5 «Verdad y mentira» (Explora). Los ejemplos no son los de los ejercicios.
{
  const globo = (K, y, n, t, cls) => K.c(38, y, 16, cls) + K.t(38, y + 5, n[0], 's') + K.r(64, y - 18, 258, 36, 'fc', 12) + K.t(193, y + 5, t, 's');
  const Z = (y = 150) => [{ x: 88, y, w: 156, h: 74, n: 3, et: 'dice la verdad', ey: -42 }, { x: 252, y, w: 156, h: 74, n: 3, et: 'miente', ey: -42 }];
  const caso = (filas, cols, o = {}) => ({ f: filas.length, c: cols.length, filas, cols, izq: 92, cw: 70, ch: 40, estados: 3, rot: ['', 'V', 'F'], unoAUno: true, ...o });

  xpLec('pu-lo-5', [
    ['Suponer y mirar si choca',
      xpMira('fichas', 'Empecemos por la idea: **supón** que alguien dice la verdad y mira si algo choca.', { slots: Z(144), fichas: ['Ana', 'Beto'], alto: 184, fondo: (K, v) => globo(K, 26, 'Ana', '«Beto miente»', 'fa') + globo(K, 68, 'Beto', '«Ana y yo mentimos»', 'fg') + K.t(170, 102, v.p || '', v.mal ? 's tf' : 's ta') }, [
        ['Ana dice que Beto miente. Beto dice que los dos mienten.', {}],
        ['Supongamos que Beto dice la verdad.', { pon: { 0: 'Beto' }, v: { p: 'supongamos' } }],
        ['Entonces los dos mienten… ¡y Beto estaría mintiendo! Choca: no puede ser.', { v: { p: '¡choca!', mal: 1 }, marca: [0] }],
        ['Beto miente. Su frase es falsa: no mienten los dos. Entonces Ana dice la verdad.', { saca: [0], pon: { 1: 'Beto', 0: 'Ana' }, v: { p: '', mal: 0 } }],
        ['Comprobamos: Ana dijo «Beto miente», y es cierto. Todo cuadra.', { v: { p: 'cuadra' } }],
      ], 'Supón una cosa; si choca, la contraria es la verdadera. Al final, comprueba todo.'),
      xpHaz('fichas', '¿Quién dice la verdad y quién miente?', { slots: Z(), fichas: ['Cata', 'Dino'], meta: [[], ['Cata', 'Dino']], alto: 192, fondo: K => globo(K, 26, 'Cata', '«Dino dice la verdad»', 'fa') + globo(K, 68, 'Dino', '«Solo uno de los dos miente»', 'fg'), pista: 'Si Dino dijera la verdad, Cata también: serían dos, no uno.' }, 'Si Dino dijera la verdad, Cata también, y entonces nadie mentiría: choca. Los dos mienten.')],
    ['¿Quién fue? Una tabla de casos',
      xpMira('rejilla', 'Segunda idea: si hay un culpable, revisa **cada sospechoso** en una tabla.', caso(['si fue Leo', 'si fue Mía', 'si fue Nico'], ['Leo', 'Mía', 'Nico'], { pie: 'Leo: «fue Mía» · Mía: «fue Nico» · Nico: «Mía miente»' }), [
        ['Alguien se comió el ponqué, y se sabe que **solo uno** miente.', {}],
        ['Si fue Leo: Leo miente y Mía miente. Nico acierta. Dos mentiras: no.', { x: [0, 1], on: [2] }],
        ['Si fue Mía: Leo acierta, Mía miente y Nico acierta. ¡Una sola mentira!', { on: [3, 5], x: [4] }],
        ['Si fue Nico: Leo miente, Mía acierta y Nico miente. Dos: no.', { x: [6, 8], on: [7] }],
        ['Solo la segunda fila cumple. Fue Mía.', { luz: [3, 4, 5] }],
      ], 'Una fila por sospechoso: escribe V o F en cada frase y busca la fila que cumple la condición.'),
      xpHaz('rejilla', 'P: «fue Q». Q: «yo no fui». R: «yo no fui». Solo **una** frase es verdadera. Llena la tabla: ¿quién fue?', caso(['si fue P', 'si fue Q', 'si fue R'], ['P', 'Q', 'R'], { meta: { 0: 2, 1: 1, 2: 1, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1, 8: 2 }, dice: c => `${c.filter(x => x).length} de 9 casillas. Un toque pone V, otro F.`, lleno: c => c.every(x => x), pista: 'Revisa fila por fila: si fue P, la frase de P («fue Q») es falsa, y las de Q y R, verdaderas.' }), 'Con P hay dos verdades, con Q también y con R solo una: fue R.')],
    ['Atajos',
      xpMira('fichas', 'Tercera idea: dos frases que **se contradicen** ya dan información.', { slots: Z(174), fichas: ['Eva', 'Fito', 'Gina'], alto: 214, fondo: (K, v) => globo(K, 20, 'Eva', '«Fue Gina»', 'fa') + globo(K, 58, 'Fito', '«Yo fui»', 'fg') + globo(K, 96, 'Gina', '«Yo no fui»', 'ff') }, [
        ['Alguien rompió el florero, y solo uno de los tres dice la verdad.', {}],
        ['Eva dice «fue Gina» y Gina dice «yo no fui». Una es verdad y la otra no.', {}],
        ['La única verdad está entre ellas. Entonces Fito miente: él no fue.', { pon: { 1: 'Fito' } }],
        ['Fue Eva o Gina. Si fue Gina, Eva dice la verdad y Gina miente: cumple.', { pon: { 0: 'Eva', 1: 'Gina' } }],
        ['Si fue Eva, Gina dice la verdad y Eva miente: también cumple. Faltaría otra pista.', { saca: [0, 1], pon: { 0: 'Gina', 1: ['Fito', 'Eva'] } }],
      ], 'Frases opuestas: una es verdad y la otra mentira, sin saber cuál. Eso decide a los demás.'),
      xpHaz('fichas', 'De estos tres, **exactamente uno** miente. Ubícalos.', { slots: Z(174), fichas: ['Hugo', 'Inés', 'Juan'], meta: [['Hugo', 'Juan'], 'Inés'], alto: 214, fondo: K => globo(K, 20, 'Hugo', '«Inés miente»', 'fa') + globo(K, 58, 'Inés', '«Juan miente»', 'fg') + globo(K, 96, 'Juan', '«Hugo dice la verdad»', 'ff'), pista: 'Hugo e Inés: si Inés dijera la verdad, Hugo mentiría y Juan también.' }, 'Hugo e Inés se contradicen: uno miente. Si fuera Hugo, también mentiría Juan. Miente Inés.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En una isla cada uno dice siempre la verdad o siempre miente. Kira habla por las dos. Ubícalas.', { slots: Z(132), fichas: ['Kira', 'Lola'], meta: ['Kira', 'Lola'], alto: 174, fondo: K => globo(K, 34, 'Kira', '«Al menos una de las dos miente»', 'fa'), pista: 'Si Kira mintiera, su frase sería falsa: ninguna mentiría. ¿Se puede?' }, 'Si Kira mintiera, su frase sería cierta: choca. Dice la verdad, así que miente Lola.')],
  ], 'Suponer hasta que choque, revisar a cada sospechoso y aprovechar las frases opuestas.');
}
