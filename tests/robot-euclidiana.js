// Galería de los ejercicios con escena de Geometría Euclidiana (se evalúa en la página):
//   fetch("tests/robot-euclidiana.js").then(r => r.text()).then(eval);
//   __euc('euc-circunferencia', 'light')   → una rejilla con cada escena de cada lección del mundo, al empezar y resuelta,
//   para mirarlas de un vistazo (textos que se pisan, figuras que se salen, manijas fuera). Devuelve cuántas dibujó y los errores.
window.__euc = (mundo, tema = 'dark', ancho = 300) => {
  document.documentElement.dataset.theme = tema;
  document.getElementById('gal')?.remove();
  const c = COURSES.find(x => x.id === 'euc'), g = document.createElement('div'), errores = [];
  g.id = 'gal';
  g.style.cssText = `position:fixed;inset:0;z-index:99999;overflow:auto;background:var(--bg);color:var(--ink);display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;padding:8px;--c:${c.color};--c-on:#04201c;--c-ink:color-mix(in srgb, ${c.color} 72%, var(--ink))`;
  document.body.appendChild(g);
  let n = 0;
  const svg = (alto, h) => `<svg class="xp-svg xd" viewBox="0 0 340 ${alto}" style="width:100%;display:block">${h}</svg>`;
  const caja = (s, t, cls = '') => `<g class="xp-tok ${cls}"><rect x="${s.x - s.w / 2}" y="${s.y - s.h / 2}" width="${s.w}" height="${s.h}" rx="8" fill="none" stroke="currentColor" opacity=".5"/><text x="${s.x}" y="${s.y + 5}" style="text-anchor:middle;font-size:13px;fill:currentColor">${t}</text></g>`;
  const us = c.units.filter(u => !mundo || u.world === mundo);
  for (const u of us) for (const [id, e] of [...u.lessons.flatMap(l => l.ex.map(e => [l.id, e])), ...u.exam.items.map(it => [`examen ${it.lesson}`, it.ex])]) {
    const G = GAMES[e.game], p = e.params;
    if (!G?.xp) continue;
    const cuadros = [];
    try {
      if (G.figura) {
        const man = v => xpManijas({ alto: G.alto(p), manijas: G.manijas(p) }).map(m => { const [x, y] = m.en(v, p); return `<circle cx="${x}" cy="${y}" r="11" fill="none" stroke="currentColor" stroke-dasharray="3 3"/>`; }).join('');
        cuadros.push(svg(G.alto(p), G.dib(G.ini(p), XPK, p, 0) + man(G.ini(p))), svg(G.alto(p), G.dib(G.solve(p), XPK, p, 1)));
      } else if (G.rotula) {
        const sl = G.slots(p), m = G.metas(p);
        cuadros.push(svg(G.alto(p), G.fondo(XPK, p, 0) + sl.map(s => caja(s, '')).join('')), svg(G.alto(p), G.fondo(XPK, p, 1) + sl.map((s, i) => caja(s, m[i])).join(''))
          + `<div>${G.fichas(p).join(' · ')}</div>`);
      } else if (G.tiros) {
        const alto = typeof G.alto === 'function' ? G.alto(p) : 200;
        p.tiros.forEach(t => cuadros.push(`<div>${tex(t.q)}</div>` + svg(alto, G.dib(t, G.meta(t, p), XPK, p, 1))));
      } else if (G.marca) {
        const st = G.sitios(p), on = G.solve(p).on;
        cuadros.push(svg(G.alto(p), G.fondo(XPK, p) + st.map((s, i) => G.cara(XPK, p, i, on[i]) + (on[i] ? `<rect x="${s.x - s.w / 2}" y="${s.y - s.h / 2}" width="${s.w}" height="${s.h}" rx="8" fill="none" stroke="currentColor"/>` : '')).join('')));
      } else cuadros.push(`<div>(${e.game}: sin vista previa)</div>`);
    } catch (er) { errores.push(`${id} ${e.game}: ${er.message}`); cuadros.push(`<div style="color:red">ERROR ${er.message}</div>`); }
    const d = document.createElement('div');
    d.style.cssText = `width:${ancho}px;border:1px solid var(--line);border-radius:8px;padding:4px;font-size:10px;line-height:1.25`;
    d.innerHTML = `<div><b>${id} · ${e.game}</b><br>${tex(e.q)}</div>${cuadros.join('')}<div style="opacity:.7">${tex(G.texto(p))}</div>`;
    g.appendChild(d); n++;
  }
  return { n, errores };
};
