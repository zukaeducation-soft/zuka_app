// Kit de los juegos en movimiento por preguntas (Preuniversitario UdeA, razonamiento; spec 2026-11-20-preuda-movimiento).
// Seis juegos que reciben lo mismo que vuela-precios y rompe-cambios, pero con una mecánica física distinta cada uno:
// params = { rounds: [{ title, items: [{ ask, options: [...], answer }] }], miss? }. Va después de kit.js.
// Nada se mueve si no lo mueve el estudiante: lo que avanza solo (un aro en el aire, una carga que baja) se detiene y espera.
// s = { pick: opción elegida (índice de `options`) o −1, order: orden en pantalla, wrong: posición en pantalla del último
// error }. ok(s, item) = s.pick === item.answer.
const MV = (() => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const orderOf = it => shuffledOrder(it.options.length, it.ask);
  // Definición para questGame (cada juego hace questGame(MV.quiz({ … }))): el enunciado es la pregunta y la solución,
  // «pregunta: respuesta».
  function quiz(def) {
    return {
      aspect: 1.3,
      idle: 'Sin prisa: solo se mueve lo que tú muevas',
      prompt: it => it.ask,
      solution: it => `${it.ask}: ${it.options[it.answer]}`,
      ok: (s, it) => !!s && s.pick === it.answer,
      answer: it => ({ pick: it.answer }),
      yes: it => `${it.options[it.answer]}. ¡Bien!`,
      ...def,
      init: (it, r, G) => ({ pick: -1, wrong: -1, order: orderOf(it), ...(def.init ? def.init(it, r, G) : {}) }),
      retry: G => { const w = G.s.wrong, s = def.init ? def.init(G.item, G.round, G) : {}; G.s = { pick: -1, wrong: w, order: G.s.order, ...s }; G._gl = null; },
    };
  }
  // El objeto llegó a la opción de la posición k: se califica. Fallar quita una vida y vuelve todo al inicio.
  function choose(G, k) {
    const s = G.s, it = G.item;
    s.pick = s.order[k]; s.wrong = k;
    const miss = G.params.miss;
    return G.submit(`«${it.options[s.pick]}» no es${miss ? `: ${miss}` : ''}`);
  }
  // Tono de la opción k: verde al acertar, rojo la del último error.
  const toneOf = (G, k) => (G.solved && G.s.order[k] === G.item.answer ? G.C.ok : G.s.wrong === k && !G.solved ? G.C.bad : null);
  // Rótulo de una opción: tarjeta con borde; si no cabe en un renglón, en dos.
  function tag(p, C, txt, cx, cy, w, h, tone) {
    drawPracticePanel(p, { x: cx - w / 2, y: cy - h / 2, w, h }, C.card, tone ?? C.line, 8, tone ? 2 : 1);
    p.noStroke(); p.fill(tone === C.ok ? C.ok : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
    const s = String(txt);
    p.textSize(13);
    if (p.textWidth(s) <= w - 10 || !s.includes(' ') || (typeof formulaWanted === 'function' && formulaWanted(s))) { fitText(p, s, cx, cy + 1, w - 10, 13, h - 4); return; }
    p.textSize(12);
    const lines = wrapWords(s, w - 10, t => p.textWidth(t)).slice(0, 2);
    lines.forEach((ln, i) => fitText(p, ln, cx, cy + 1 + (i - (lines.length - 1) / 2) * 14, w - 8, 12));
  }
  // Puntos de un camino para el robot (cajas de tamaño cero, como las de questGame).
  const pt = (x, y) => ({ x, y, w: 0, h: 0 });
  // Color con transparencia (0 a 255).
  const alpha = (p, col, a) => { const c = p.color(col); c.setAlpha(a); return c; };
  return { clamp, orderOf, quiz, choose, toneOf, tag, pt, alpha };
})();
