// Galería de las escenas de Explora (se evalúa en la página): fetch("tests/robot-explora-galeria.js").then(r => r.text()).then(eval);
// __gal(['pu-ge-1'], 'light')  → una rejilla con cada momento de cada explicación y cada práctica resuelta, para mirarlos de un vistazo.
window.__gal = (ids, tema = 'dark', ancho = 300) => {
  document.documentElement.dataset.theme = tema;
  document.getElementById('gal')?.remove();
  const g = document.createElement('div');
  g.id = 'gal';
  g.style.cssText = 'position:fixed;inset:0;z-index:99999;overflow:auto;background:var(--bg);color:var(--ink);display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;padding:8px;--c:#a3e635;--c-on:#10140a;--c-ink:color-mix(in srgb, #a3e635 72%, var(--ink))';
  document.body.appendChild(g);
  const mudo = { set() {}, nota() {}, decir: () => false, memo: {}, ideas: () => [] };
  for (const id of ids) EXPLORA[id].pasos.forEach((p, i) => {
    const cuadro = (titulo, cuenta, monta) => {
      const d = document.createElement('div');
      d.style.cssText = `width:${ancho}px;border:1px solid var(--line);border-radius:8px;padding:4px;font-size:10px;line-height:1.25`;
      d.innerHTML = `<div style="height:39px;overflow:hidden">${id} ${i}: ${tex(titulo)}</div><div class="xp-stage" style="min-height:0"></div><div style="text-align:center;font-size:12px">${tex(cuenta || '')}</div>`;
      g.appendChild(d);
      try { monta(d.children[1]); } catch (e) { d.style.borderColor = 'red'; d.firstChild.textContent = `${id} ${i} ERROR ${e.message}`; }
    };
    if (p.tipo === 'muestra') p.momentos.forEach((m, k) => cuadro(m.dice, m.cuenta, st => {
      const en = { ...p.en, momentos: p.momentos }, e = XPD[p.escena](st, en, XP[p.escena].ini(en), mudo);
      e.salta?.(p.momentos.slice(0, k + 1));
    }));
    else if (p.tipo !== 'cierre') for (const s of [XP[p.tipo].ini(p), XP[p.tipo].sol(p)]) cuadro(p.texto, XP[p.tipo].lee(s, p), st => XPD[p.tipo](st, p, s, mudo));
  });
};
