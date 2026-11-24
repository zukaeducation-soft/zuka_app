// Uso en la página: fetch("tests/robot-explora.js").then(r => r.text()).then(eval); await __robot("pu-cm-2", "preuda")
// Robot de prueba para Explora (se evalúa en la página): recorre una lección de principio a fin. Las explicaciones corren
// solas (con animaciones y pausas aceleradas); en la práctica arrastra el dedo sobre la escena como lo haría el estudiante.
window.__robot = async (id, curso) => {
  const w = ms => new Promise(r => setTimeout(r, ms));
  window.xpTween = (a, b, ms, on, done) => { on(b); done(); return () => {}; };
  XP.muestra.pausa = () => 60;
  XS.voz = () => null;
  document.getElementById('landing')?.style && (document.getElementById('landing').style.display = 'none');
  const c = COURSES.find(c => c.id === curso), l = c.units.flatMap(u => u.lessons).find(l => l.id === id);
  delete XP_MEM[id];
  startLesson(c, l);
  await w(900);
  const def = EXPLORA[id], log = [];
  const svgPt = (svg, x, y) => {
    const r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
    return [r.left + x * r.width / vb.width, r.top + y * r.height / vb.height];
  };
  const arrastra = async (svg, pts) => {
    svg.setPointerCapture = () => {};
    const ev = (t, [x, y]) => svg.dispatchEvent(new PointerEvent(t, { clientX: x, clientY: y, pointerId: 1, bubbles: true }));
    ev('pointerdown', pts[0]); for (const p of pts) ev('pointermove', p); ev('pointerup', pts.at(-1)); await w(120);
  };
  for (let i = 0; i < def.pasos.length; i++) {
    const p = def.pasos[i], next = document.querySelector('.xp-next');
    if (p.tipo === 'muestra') {
      for (let k = 0; k < 200 && next.disabled; k++) await w(50);
    } else if (p.tipo === 'barras') {
      const svg = document.querySelector('.xb'), d = p.dpide ?? (p.cortar ? p.meta[1] : (p.d ?? p.meta[1])), n = p.meta[0] * d / p.meta[1];
      const X = k => 20 + (k - 1) / 11 * 300, llena = () => arrastra(document.querySelector('.xb'), [svgPt(svg, 22, 40), svgPt(svg, 20 + ((n - 0.5) / d) * 300, 40)]);
      // Primero se toma la fracción con las partes con que viene y luego se corta, de una en una: lo tomado debe conservarse.
      if (p.cortar && (p.meta[0] * (p.d ?? 1)) % p.meta[1] === 0 && p.d > 1) {
        const d0 = p.d, n0 = p.meta[0] * d0 / p.meta[1];
        await arrastra(svg, [svgPt(svg, 22, 40), svgPt(svg, 20 + ((n0 - 0.5) / d0) * 300, 40)]);
        const pasos = []; for (let k = d0; k !== d; k += Math.sign(d - d0)) pasos.push(svgPt(svg, X(k), 118)); pasos.push(svgPt(svg, X(d), 118));
        await arrastra(svg, pasos);
        if (!(XP_MEM[id].estados[i]?.n === n && XP_MEM[id].estados[i]?.d === d)) log.push(`${i} CORTAR NO CONSERVA: ${JSON.stringify(XP_MEM[id].estados[i])}`);
      } else {
        if (p.cortar) await arrastra(svg, [svgPt(svg, X(p.d ?? 1), 118), svgPt(svg, X(d), 118)]);
        await llena();
      }
    } else if (p.tipo === 'cien') {
      const svg = document.querySelector('.xc100'), k = p.meta, cell = j => [61.5 + ((j - 1) % 10) * 22 + 9, 6 + Math.floor((j - 1) / 10) * 22 + 9];
      await arrastra(svg, [svgPt(svg, ...cell(Math.max(1, k - 5))), svgPt(svg, ...cell(k))]);
    } else if (p.tipo === 'potencia') {
      const svg = document.querySelector('.xpw'), max = p.max ?? (p.modo === 'lado' ? 10 : 6), min = p.modo === 'lado' ? 1 : 0;
      const X = v => 30 + (v - min) / (max - min) * 280;
      await arrastra(svg, [svgPt(svg, X(p.desde ?? 1), 196), svgPt(svg, X(p.meta), 196)]);   // sobre la regla (debajo de 165)
    } else if (p.tipo === 'casillas') {
      for (const f of p.filas) { [...document.querySelectorAll('.xp-chip')].find(b => b.dataset.f === f.r && !b.disabled).click(); await w(80); }
    }
    await w(150);
    log.push(`${i} ${p.tipo}${p.escena ? '/' + p.escena : ''}: ${next.disabled ? 'NO' : 'ok'} | ${document.querySelector('.xp-read').textContent.slice(0, 40)}`);
    if (next.disabled) break;
    if (i < def.pasos.length - 1) { next.click(); await w(250); }
  }
  return log;
};
