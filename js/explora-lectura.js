// Explora · escena «hoja» para las lecciones de comprensión lectora (spec 2026-11-24-lectura-explora): el texto es la escena.
//   { cab: [título, autor, fuente, fecha], paras: [[trozos…]…], tapa, unidos }   trozos: 't','a','f','d' los bordes; 0, 1, 2… el texto
// En las explicaciones cada momento cambia la hoja (y lo demás se queda como estaba):
//   luz [trozos] (solo ese momento) · tacha [trozos] · nota { párrafo: rótulo } · tapa true | false · sello { trozo: rótulo }
// En la práctica: modo 'toca' (subrayar los que cumplen; meta [trozos]), 'tacha' (igual, pero se quitan) o 'margen'
// (arrastrar o tocar rótulos al margen de cada párrafo; rotulos, meta [rótulo por párrafo]). Va después de explora-escenas.js.
XP.hoja = {
  ini: p => (p.modo === 'margen' ? { n: p.paras.map(() => -1) } : { m: [] }),
  ok(s, p) {
    if (p.modo === 'margen') return s.n.join() === p.meta.join();
    return [...s.m].map(String).sort().join() === p.meta.map(String).sort().join();
  },
  sol: p => (p.modo === 'margen' ? { n: [...p.meta] } : { m: p.meta.map(String) }),
  lee: () => '',
  dice(s, p) {
    if (p.modo === 'margen') { const f = s.n.filter(x => x < 0).length; return f === s.n.length ? 'Arrastra cada rótulo a su párrafo, o tócalo y luego toca el párrafo.' : f ? `${f === 1 ? 'Falta un párrafo' : `Faltan ${f} párrafos`}.` : XP.hoja.ok(s, p) ? 'Cada uno con su rótulo.' : 'Todos con rótulo: mira si cada uno corresponde.'; }
    const n = s.m.length, v = p.modo === 'tacha' ? ['Toca lo que sobra para tacharlo.', 'tachada', 'tachadas'] : ['Toca un trozo para subrayarlo; otro toque lo suelta.', 'subrayada', 'subrayadas'];
    return !n ? v[0] : `${n} de ${p.meta.length} ${n === 1 ? 'marca' : 'marcas'}.`;
  },
};

XPD.hoja = (stage, p, s, api) => {
  const mira = !!p.momentos, toca = !mira && p.modo !== 'margen';
  let k = 0, v = { luz: [], tacha: [], nota: {}, sello: {}, tapa: !!p.tapa }, sel = null, timer = 0, dedo = null, tecla = null;
  const tr = (id, t, cls = '') => `<span class="hj-t ${cls}" data-k="${id}"${toca && !p.quietos?.includes(id) ? ' role="button" tabindex="0"' : ''}>${HOJA.fmt(t)}</span>`;
  const cab = p.cab ? `<header class="hj-cab"><h4>${tr('t', p.cab[0])}</h4><p>${['a', 'f', 'd'].map((id, i) => tr(id, p.cab[i + 1])).join('<i>·</i>')}</p></header>` : '';
  stage.innerHTML = `<div class="hj hj-mira ${toca ? `hj-toca hj-${p.modo === 'tacha' ? 'tacha' : 'subraya'}` : ''}"><article class="hj-hoja">${cab}${p.paras.map((l, i) => `<div class="hj-p" data-p="${i}"><b class="hj-n">${p.letras?.[i] || i + 1}</b><span class="hj-marg"></span><p>${l.map(t => tr(k++, t)).join(p.unidos ? '' : ' ')}</p></div>`).join('')}</article>${p.modo === 'margen' ? '<div class="hj-band"></div>' : ''}</div>`;
  const root = stage.firstChild, T = id => root.querySelector(`.hj-t[data-k="${id}"]`), P = i => root.querySelector(`.hj-p[data-p="${i}"]`);
  const chip = (i, en) => `<button type="button" class="hj-f${sel === i ? ' hj-sel' : ''}" data-r="${i}" data-en="${en}">${HOJA.esc(p.rotulos[i])}</button>`;

  function pintaMira() {
    root.querySelectorAll('.hj-t').forEach(t => {
      const id = t.dataset.k, en = l => l.map(String).includes(id);
      t.classList.toggle('on', en(v.luz)); t.classList.toggle('tachado', en(v.tacha));
      t.dataset.sello = v.sello[id] || ''; t.classList.toggle('con-sello', !!v.sello[id]);
    });
    root.classList.toggle('foco', v.luz.length > 0);
    root.classList.toggle('tapada', v.tapa);
    p.paras.forEach((_, i) => { const m = P(i).querySelector('.hj-marg'), t = v.nota[i] || ''; if (m.textContent !== t) m.innerHTML = t ? `<em class="hj-nota">${HOJA.esc(t)}</em>` : ''; });
  }
  function pinta() {
    if (mira) return pintaMira();
    if (toca) return root.querySelectorAll('.hj-t').forEach(t => { const on = s.m.includes(t.dataset.k); t.classList.toggle('on', on); if (t.getAttribute('role')) t.setAttribute('aria-pressed', on); });
    root.querySelector('.hj-band').innerHTML = p.rotulos.map((_, i) => (s.n.includes(i) ? '' : chip(i, -1))).join('');
    p.paras.forEach((_, i) => { P(i).querySelector('.hj-marg').innerHTML = s.n[i] >= 0 ? chip(s.n[i], i) : '<em class="hj-hueco">?</em>'; });
    root.querySelectorAll('[data-r]').forEach(b => { b.onkeydown = tecla; });
    root.classList.toggle('hj-lleva', sel != null);
  }
  // Al completar las marcas sin cumplir, se avisa (sin decir cuál).
  const fin = lleno => { XS.pop(); xpTick(); api.nota(''); api.set(s); pinta(); if (lleno && !XP.hoja.ok(s, p)) { XS.nope(); api.nota(p.pista || 'Casi: algo no cumple. Vuelve a leer y cambia una marca.'); } };
  if (toca) {
    const pon = t => {
      const id = t.dataset.k, l = s.m.includes(id) ? s.m.filter(x => x !== id) : s.m.length >= p.meta.length ? [...s.m.slice(1), id] : [...s.m, id];
      s = { m: l }; fin(l.length === p.meta.length);
    };
    const cual = e => e.target.closest?.('.hj-t[role=button]');
    root.onclick = e => { const t = cual(e); if (t) pon(t); };
    root.querySelectorAll('.hj-t[role=button]').forEach(t => { t.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pon(t); } }; });
  }
  if (p.modo === 'margen' && !mira) {
    const pon = (r, i) => {
      const n = s.n.map(x => (x === r ? -1 : x)), de = s.n.indexOf(r);
      if (i >= 0) { if (n[i] >= 0 && de >= 0) n[de] = n[i]; n[i] = r; }
      sel = null; s = { n }; fin(n.every(x => x >= 0));
    };
    // Un toque elige el rótulo y otro en el párrafo lo pone; arrastrar hace lo mismo.
    root.onpointerdown = e => { const b = e.target.closest('[data-r]'); if (!b || dedo) return; dedo = { id: e.pointerId, r: +b.dataset.r, en: +b.dataset.en, b, x: e.clientX, y: e.clientY, g: null }; };
    const mueve = e => {
      if (!dedo || e.pointerId !== dedo.id) return;
      if (!dedo.g) {
        if (Math.hypot(e.clientX - dedo.x, e.clientY - dedo.y) < 7) return;
        const r = dedo.b.getBoundingClientRect();
        dedo.g = dedo.b.cloneNode(true); dedo.g.classList.add('exq-ghost'); Object.assign(dedo.g.style, { width: `${r.width}px`, left: `${r.left}px`, top: `${r.top}px` });
        dedo.ox = e.clientX - r.left; dedo.oy = e.clientY - r.top; document.body.appendChild(dedo.g); dedo.b.classList.add('lift');
      }
      e.preventDefault();
      dedo.g.style.left = `${e.clientX - dedo.ox}px`; dedo.g.style.top = `${e.clientY - dedo.oy}px`;
      const q = document.elementFromPoint(e.clientX, e.clientY)?.closest('.hj-p');
      root.querySelectorAll('.over').forEach(o => o !== q && o.classList.remove('over'));
      if (q && root.contains(q)) q.classList.add('over');
      const st = root.closest('.xp-step'), r = st?.getBoundingClientRect();
      if (r) { if (e.clientY < r.top + 46) st.scrollTop -= 8; else if (e.clientY > r.bottom - 46) st.scrollTop += 8; }
    };
    const deja = e => {
      if (!dedo || e.pointerId !== dedo.id) return;
      const d = dedo; dedo = null; d.g?.remove(); d.b.classList.remove('lift');
      root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
      if (e.type === 'pointercancel') return;
      const q = document.elementFromPoint(e.clientX, e.clientY)?.closest('.hj-p');
      if (d.g) { if (q && root.contains(q)) pon(d.r, +q.dataset.p); else if (d.en >= 0) pon(d.r, -1); return; }
      if (sel != null && d.en >= 0 && sel !== d.r) return pon(sel, d.en);
      sel = sel === d.r ? null : d.r; XS.tick(2); pinta();
    };
    root.onclick = e => { const q = e.target.closest('.hj-p'); if (q && sel != null && !e.target.closest('[data-r]')) pon(sel, +q.dataset.p); };
    tecla = e => {   // la explicación solo deja pasar las teclas al manejador del propio botón
      const b = e.currentTarget; if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); const r = +b.dataset.r, en = +b.dataset.en;   // con teclado: de la bandeja al primer párrafo libre, y de vuelta
      pon(r, en >= 0 ? -1 : Math.max(0, s.n.indexOf(-1)));
      (root.querySelector('.hj-band [data-r]') || root.querySelector('[data-r]'))?.focus({ preventScroll: true });
    };
    window.addEventListener('pointermove', mueve, { passive: false }); window.addEventListener('pointerup', deja); window.addEventListener('pointercancel', deja);
    timer = () => { window.removeEventListener('pointermove', mueve); window.removeEventListener('pointerup', deja); window.removeEventListener('pointercancel', deja); dedo?.g?.remove(); };
  }
  pinta();
  const aplica = m => {
    v = { luz: m.luz || [], tacha: [...v.tacha, ...(m.tacha || [])], nota: { ...v.nota, ...m.nota }, sello: { ...v.sello, ...m.sello }, tapa: m.tapa ?? v.tapa };
    if (m.limpia) v = { ...v, tacha: m.tacha || [], nota: m.nota || {}, sello: m.sello || {} };
  };
  let t = 0;
  return Object.assign(() => { clearTimeout(t); if (typeof timer === 'function') timer(); }, {
    anima(m, done) {
      aplica(m); pinta();
      if (m.tacha) XS.tick(-6); else if (m.luz || m.nota || m.sello) XS.pop();
      const q = m.luz?.length ? T(m.luz[0]) : m.nota ? P(Object.keys(m.nota)[0]) : null, st = root.closest('.xp-step');
      // En pantallas pequeñas la hoja puede ser más alta que el paso: lo que se nombra queda a la vista.
      if (q && st && st.scrollHeight > st.clientHeight + 4) { const a = q.getBoundingClientRect(), b = st.getBoundingClientRect(); if (a.bottom > b.bottom - 10 || a.top < b.top + 10) st.scrollBy({ top: a.top - b.top - b.height * 0.45, behavior: xpStill() ? 'auto' : 'smooth' }); }
      t = setTimeout(done, xpStill() ? 0 : 750);
      return () => clearTimeout(t);
    },
    salta(l) { l.forEach(aplica); v.luz = []; pinta(); },
  });
};
