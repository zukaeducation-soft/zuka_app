// Kit de los ejercicios de lectura en los que el texto es la escena (spec 2026-11-24-lectura-explora). Va después de
// explora-kit.js y lectura-kit.js. Armazones sobre XG.juego (estado puro; nada dice si va bien hasta comprobar):
//   HOJA.toca(nombre, d)    se tocan trozos del texto (subrayar, tachar).            estado { m: [claves] }
//   HOJA.zonas(nombre, d)   fichas que van al margen o a huecos de la escena.        estado { en: [zona por ficha, −1 = bandeja] }
//   HOJA.pinta(nombre, d)   se pintan oraciones con marcadores.                      estado { c: [marcador por línea, −1] }
//   HOJA.hilos(nombre, d)   se tira un hilo de cada tarjeta a un punto del texto.    estado { a: [destino por tarjeta, −1] }
//   HOJA.ordena(nombre, d)  tiras que se mueven hasta que el orden tiene sentido.    estado { o: [índices], t: ya se movió }
// `p.mira[i]` es el aviso de la ficha o tarjeta i cuando quedó mal: cierto en cualquier sitio equivocado y sin dar la respuesta.
// `p.luz` = [[párrafo, trozo literal]]: las palabras que lo prueban, que se encienden al final.
const HOJA = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const luzDe = (t, n, luz = []) => luz.filter(l => l[0] === n).reduce((h, l) => h.replace(esc(l[1]), m => `<mark class="hj-luz">${m}</mark>`), fmt(t));
  const oraciones = (p, n) => (p.trozos?.[n] ? p.trozos[n].split('|') : LEC.sentences(p.doc.paras[n - 1]));
  const parr = (n, dentro, o = {}) => `<div class="hj-p ${o.cls || ''}" data-p="${n}" ${o.attr || ''}><b class="hj-n" aria-label="párrafo ${n}">${n}</b>${o.antes || ''}<p>${dentro}</p></div>`;
  const cabeza = d => `<header class="hj-cab"><h4 data-b="titulo">${esc(d.title)}</h4>${d.ficha ? `<p>${['autor', 'fuente', 'fecha'].map(k => `<span data-b="${k}">${esc(d.ficha[k])}</span>`).join('<i>·</i>')}</p>` : ''}</header>`;
  // La hoja: título y párrafos (todos, o los `nums`). `trozo(n, i, t)` envuelve cada oración.
  function hoja(p, o = {}) {
    const d = p.doc, nums = o.nums || d.paras.map((_, i) => i + 1);
    return `<article class="hj-hoja ${o.cls || ''}" ${o.attr || ''}>${o.cab ?? cabeza(d)}${nums.map(n => parr(n, o.trozo
      ? oraciones(p, n).map((t, i) => o.trozo(n, i, t)).join(p.trozos?.[n] ? '' : ' ') : luzDe(d.paras[n - 1], n, p.luz), o.parr?.(n))).join('')}</article>`;
  }
  // El texto entero, plegado: en el examen siempre se puede volver a él.
  const completo = d => `<details class="hj-todo"><summary>Ver el texto completo</summary>${hoja({ doc: d })}</details>`;
  // Lo tapado tampoco se lee con lector de pantalla hasta que se destapa.
  const tapa = (root, si) => root.querySelectorAll('.hj-hoja.cortina .hj-p, .hj-velo, .hj-queda').forEach(x => (si ? x.setAttribute('aria-hidden', 'true') : x.removeAttribute('aria-hidden')));
  const prende = root => tapa(root, false) || root.querySelectorAll('.hj-luz').forEach((m, i) => { m.style.setProperty('--d', `${i * 260}ms`); m.classList.add('on'); if (!i) aVer(root, m); });
  // En un texto largo, lo primero que se enciende queda a la vista (el aviso tapa la mitad de abajo en el celular).
  const aVer = (root, m) => setTimeout(() => {
    const s = root.isConnected && quienRueda(root); if (!s) return;
    const r = s.getBoundingClientRect(), y = m.getBoundingClientRect().top, fb = document.querySelector('.feedback.show')?.getBoundingClientRect();
    const abajo = fb && fb.left < r.right && fb.right > r.left ? Math.min(r.bottom, fb.top) : r.bottom;
    if (y < r.top + 10 || y > abajo - 30) s.scrollBy({ top: y - r.top - (abajo - r.top) / 3, behavior: quieto() ? 'auto' : 'smooth' });
  }, 700);
  const quieto = () => typeof xpStill === 'function' && xpStill();
  const tactil = () => { if (typeof xpTick === 'function') xpTick(); };

  // Se arrastra la ficha, o se toca la ficha y luego el sitio (dedo, ratón o teclado). Cerca del borde, la hoja se desplaza sola.
  function manos(ui, root, pon) {
    let sel = null;
    const elige = el => { root.querySelectorAll('.hj-sel').forEach(x => x.classList.remove('hj-sel')); sel = el ? el.dataset.f : null; el?.classList.add('hj-sel'); root.querySelectorAll('[data-f]').forEach(x => x.setAttribute('aria-pressed', x === el)); root.classList.toggle('hj-lleva', !!el); };
    XG.arrastra(ui, root, '[data-f]', {
      onDrop: (el, z) => { elige(null); pon(+el.dataset.f, +z.dataset.drop); },
      onTap: el => {
        const z = el.closest('[data-drop]');
        if (sel === el.dataset.f) { elige(null); return pon(+el.dataset.f, -1); }
        if (sel != null && z && z.dataset.drop !== '-1') { const f = +sel; elige(null); return pon(f, +z.dataset.drop); }
        elige(el); XS.tick(2);
      },
    });
    root.addEventListener('click', e => {
      if (ui.locked || root.dataset.dragged || sel == null || e.target.closest('[data-f]')) return;
      const z = e.target.closest('[data-drop]');
      if (z && root.contains(z)) { const f = +sel; elige(null); pon(f, +z.dataset.drop); }
    });
    root.addEventListener('keydown', e => {
      if (ui.locked || e.target.dataset?.drop == null || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.stopPropagation(); e.preventDefault(); e.target.click();
    });
    desplaza(ui, root);
  }
  const quienRueda = root => { const h = root.querySelector('.hj-esc'); return h && h.scrollHeight > h.clientHeight + 6 && getComputedStyle(h).overflowY === 'auto' ? h : root.closest('.lesson-body'); };
  function desplaza(ui, root, llevando = () => !!document.querySelector('.exq-ghost')) {
    let y = 0, t = 0;
    const paso = () => {
      t = 0;
      if (!llevando()) return;
      const s = quienRueda(root); if (!s) return;
      const r = s.getBoundingClientRect(), m = root.querySelector('.hj-mesa')?.getBoundingClientRect();
      const abajo = m && m.top > r.top + 120 && m.left < r.left + 20 && m.top < r.bottom ? m.top : r.bottom;
      const v = y < r.top + 54 ? -7 : y > abajo - 54 && y < abajo ? 7 : 0;
      if (v) s.scrollTop += v;
      t = requestAnimationFrame(paso);
    };
    const mueve = e => { y = e.clientY; if (!t && llevando()) t = requestAnimationFrame(paso); };
    window.addEventListener('pointermove', mueve);
    ui.limpia(() => { window.removeEventListener('pointermove', mueve); cancelAnimationFrame(t); });
  }
  // Se revisa marca por marca: `lista` = [[elemento, si va bien]].
  function revisa(ui, lista, fin) {
    let i = 0;
    const cada = quieto() ? 0 : Math.max(160, Math.min(420, 2200 / Math.max(1, lista.length)));
    (function sig() {
      if (i >= lista.length) return ui.espera(quieto() ? 0 : 380, fin);
      const [el, ok] = lista[i++];
      if (el) { el.classList.add(ok ? 'hj-bien' : 'hj-mal'); if (ok) XS.pop(); else XS.nope(); }
      ui.espera(cada, sig);
    })();
  }
  // Lo que pasa al comprobar, igual en todos: revisar, decir, y si falló mostrar la buena.
  function cierra(ui, ok, { lista, aviso, bien, buena, final }) {
    ui.nota('');
    revisa(ui, lista(), () => {
      if (ok) { final(); return ui.nota(bien); }
      ui.nota(aviso, true);
      ui.espera(2400, () => { buena(); final(); ui.nota(bien); });
    });
  }
  const igual = (c, z) => (c == null ? z === -1 : Array.isArray(c) ? c.includes(z) : c === z);
  const base = c => (c == null ? -1 : Array.isArray(c) ? c[0] : c);

  // ------------------------------------------------------------------------------------------------ fichas a zonas o huecos
  // d: { escena(p) → html con HOJA.zona(i, rótulo); varias; minimo(p); vivo(root, p, s); final(root, p); rot(p, i) }
  // p: { fichas, va: [zona | [zonas] | null por ficha], mira, bien, luz }
  const zona = (i, rot = '', cls = '', nombre = '') => `<span class="hj-z ${cls}" data-drop="${i}" tabindex="0" role="button" data-nom="${esc(nombre || rot || `lugar ${i + 1}`)}" aria-label="${esc(nombre || rot || `lugar ${i + 1}`)}"><span class="hj-dentro" data-z="${i}" data-rot="${esc(rot)}"></span></span>`;
  function zonas(nombre, d) {
    XG.juego(nombre, {
      tipo: 'zonas', varias: !!d.varias, ini: p => ({ en: p.fichas.map(() => -1) }), ok: (s, p) => p.va.every((c, f) => igual(c, s.en[f])),
      listo: (s, p) => s.en.filter(z => z >= 0).length >= p.va.filter(c => c != null).length,
      sol: p => ({ en: p.va.map(base) }), rot: (p, i) => d.rot(p, i),
      texto: p => p.va.map((c, f) => (c == null ? '' : `${d.rot(p, base(c))} → ${p.fichas[f]}`)).filter(Boolean).join(' · '),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre}"><div class="hj-esc">${d.escena(p)}</div><div class="hj-mesa"><div class="hj-band" data-drop="-1" aria-label="fichas"></div></div></div>`;
        const root = stage.firstChild, band = root.querySelector('.hj-band'), orden = LEC.mix(p.fichas);
        tapa(root, true);
        const pinta = () => {
          const s = ui.s, foco = document.activeElement?.dataset?.f;
          const ficha = k => `<button type="button" class="hj-f" data-f="${k}">${esc(p.fichas[k])}</button>`;
          band.innerHTML = orden.filter(k => s.en[k] < 0).map(ficha).join('');
          root.classList.toggle('hj-vacia', !band.innerHTML);
          root.querySelectorAll('[data-z]').forEach(z => {
            const l = orden.filter(k => s.en[k] === +z.dataset.z);
            z.innerHTML = l.map(ficha).join('') || (z.dataset.rot ? `<em>${esc(z.dataset.rot)}</em>` : '');
            z.parentElement.classList.toggle('hj-llena', l.length > 0);
            z.parentElement.setAttribute('aria-label', `${z.parentElement.dataset.nom}${l.length ? `: ${l.map(k => p.fichas[k]).join(', ')}` : ''}`);
          });
          if (foco != null) root.querySelector(`[data-f="${foco}"]`)?.focus({ preventScroll: true });
          d.vivo?.(root, p, s);
        };
        pinta();
        ui.nota(d.ayuda || 'Arrastra cada ficha, o tócala y luego toca su lugar.');
        manos(ui, root, (f, z) => {
          const en = [...ui.s.en], antes = en[f];
          if (z >= 0 && !d.varias) { const otra = en.findIndex((q, k) => q === z && k !== f); if (otra >= 0) en[otra] = antes; }
          en[f] = z; ui.set({ en }); XS.pop(); tactil(); pinta();
        });
        const el = f => root.querySelector(`[data-f="${f}"]`);
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const malas = p.va.map((c, f) => (igual(c, s.en[f]) ? -1 : f)).filter(f => f >= 0);
          cierra(ui, okk, {
            lista: () => s.en.map((z, f) => [z, f]).filter(x => x[0] >= 0).sort((a, b) => a[0] - b[0]).map(([, f]) => [el(f), !malas.includes(f)]),
            aviso: p.mira?.[malas.find(f => s.en[f] >= 0) ?? malas[0]] || '', bien: p.bien,
            buena() { ui.muestra({ en: p.va.map(base) }); pinta(); p.va.forEach((c, f) => c != null && el(f)?.classList.add('hj-bien')); },
            final() { prende(root); d.final?.(root, p, ui); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------------- tocar trozos
  // d: { escena(p, T) con T(clave, texto) → trozo; claves(p); texto(p); modo: 'subraya' | 'tacha'; ayuda; final }
  // p: { va: [claves], n, mira: { clave: aviso }, falta }
  function toca(nombre, d) {
    XG.juego(nombre, {
      tipo: 'toca', ini: () => ({ m: [] }), claves: p => d.claves(p).map(String),
      listo: (s, p) => (p.n ? s.m.length === p.n : s.m.length > 0),
      ok: (s, p) => [...s.m].sort().join() === p.va.map(String).sort().join(),
      sol: p => ({ m: p.va.map(String) }), texto: p => d.texto(p),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre} hj-toca hj-${d.modo}"><div class="hj-esc">${d.escena(p, (k, t) => `<span class="hj-t" data-k="${k}" role="button" tabindex="0" aria-pressed="false">${fmt(t)}</span>`)}</div></div>`;
        const root = stage.firstChild, q = k => root.querySelector(`.hj-t[data-k="${k}"]`), va = p.va.map(String);
        const pinta = () => {
          root.querySelectorAll('.hj-t').forEach(t => { const on = ui.s.m.includes(t.dataset.k); t.classList.toggle('on', on); t.setAttribute('aria-pressed', on); });
          d.vivo?.(root, p, ui.s);
        };
        const pon = k => {
          if (ui.locked) return;
          const m = ui.s.m.includes(k) ? ui.s.m.filter(x => x !== k) : p.n && ui.s.m.length >= p.n ? [...ui.s.m.slice(1), k] : [...ui.s.m, k];
          ui.set({ m }); XS.pop(); tactil(); pinta();
        };
        root.addEventListener('click', e => { const t = e.target.closest('.hj-t'); if (t) pon(t.dataset.k); });
        root.addEventListener('keydown', e => { const t = e.target.closest?.('.hj-t'); if (t && !ui.locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); pon(t.dataset.k); } });
        ui.nota((d.ayuda || 'Toca una oración para subrayarla; otro toque la suelta.') + (p.n > 1 ? ` Son ${p.n}.` : ''));
        pinta();
        return okk => {
          const m = ui.s.m; root.classList.add('hj-fin');
          const mala = m.find(k => !va.includes(k));
          cierra(ui, okk, {
            lista: () => [...root.querySelectorAll('.hj-t')].filter(t => m.includes(t.dataset.k)).map(t => [t, va.includes(t.dataset.k)]),
            aviso: (mala != null && p.mira?.[mala]) || p.falta || '', bien: p.bien,
            buena() { ui.muestra({ m: va }); pinta(); root.querySelectorAll('.hj-mal').forEach(t => t.classList.remove('hj-mal')); va.forEach(k => q(k)?.classList.add('hj-bien')); },
            final() { prende(root); d.final?.(root, p, ui); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------ pintar con marcadores
  // Se escoge un marcador y se tocan oraciones (o se arrastra el marcador hasta la oración).
  // d: { escena(p, T) }   p: { lineas, plumas, va: [pluma por línea], mira }    estado { c: [pluma por línea, −1 sin pintar] }
  function pinta(nombre, d) {
    XG.juego(nombre, {
      tipo: 'pinta', ini: p => ({ c: p.lineas.map(() => -1) }), listo: s => s.c.every(x => x >= 0),
      ok: (s, p) => s.c.join() === p.va.join(), sol: p => ({ c: [...p.va] }),
      texto: p => p.lineas.map((t, i) => `${t.length > 34 ? `«${t.split(' ').slice(0, 4).join(' ')}…»` : `«${t}»`} → ${p.plumas[p.va[i]]}`).join(' · '),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre} hj-pinta"><div class="hj-esc">${d.escena(p, (i, t) => `<p class="hj-linea" data-drop="${i}" data-l="${i}" tabindex="0" role="button"><span>${fmt(t)}</span><small></small></p>`)}</div><div class="hj-mesa"><div class="hj-band">${p.plumas.map((t, k) => `<button type="button" class="hj-f hj-pluma m${k}" data-f="${k}" aria-pressed="${!k}"><i></i>${esc(t)}</button>`).join('')}</div></div></div>`;
        const root = stage.firstChild, L = i => root.querySelector(`[data-l="${i}"]`);
        let pluma = 0;
        const draw = () => {
          p.lineas.forEach((t, i) => {
            const k = ui.s.c[i], el = L(i);
            el.className = `hj-linea${k >= 0 ? ` m${k}` : ''}`; el.lastChild.textContent = k >= 0 ? p.plumas[k] : '';
            el.setAttribute('aria-label', `${t} ${k >= 0 ? p.plumas[k] : 'sin pintar'}`);
          });
          root.querySelectorAll('.hj-pluma').forEach((b, k) => { b.classList.toggle('hj-sel', k === pluma); b.setAttribute('aria-pressed', k === pluma); });
        };
        const pon = (i, k) => { const c = [...ui.s.c]; c[i] = c[i] === k ? -1 : k; ui.set({ c }); XS.pop(); tactil(); draw(); };
        XG.arrastra(ui, root, '[data-f]', { onDrop: (el, z) => { pluma = +el.dataset.f; if (ui.s.c[+z.dataset.drop] !== pluma) pon(+z.dataset.drop, pluma); else draw(); }, onTap: el => { pluma = +el.dataset.f; XS.tick(pluma * 3); draw(); } });
        const linea = e => (ui.locked || root.dataset.dragged ? null : e.target.closest?.('.hj-linea'));
        root.addEventListener('click', e => { const x = linea(e); if (x) pon(+x.dataset.l, pluma); });
        root.addEventListener('keydown', e => { const x = linea(e); if (x && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); pon(+x.dataset.l, pluma); } });
        desplaza(ui, root);
        draw();
        ui.nota('Escoge un marcador y toca las oraciones; con otro toque se borra.');
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const mala = s.c.findIndex((k, i) => k !== p.va[i]);
          cierra(ui, okk, {
            lista: () => s.c.map((k, i) => [L(i), k === p.va[i]]), aviso: p.mira[mala] || '', bien: p.bien,
            buena() { ui.muestra({ c: [...p.va] }); draw(); p.va.forEach((_, i) => L(i).classList.add('hj-bien')); }, final() { prende(root); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------------- tirar hilos
  // d: { escena(p) con [data-t="i"] en los destinos; destinos(p) → cuántos; rot(p, i) }   p: { tarjetas, va: [destino | [destinos]], mira }
  function hilos(nombre, d) {
    XG.juego(nombre, {
      tipo: 'hilos', ini: p => ({ a: p.tarjetas.map(() => -1) }), listo: s => s.a.every(x => x >= 0),
      ok: (s, p) => p.va.every((c, i) => igual(c, s.a[i])), sol: p => ({ a: p.va.map(base) }), destinos: p => d.destinos(p),
      texto: p => p.tarjetas.map((t, i) => `${t} → ${d.rot(p, base(p.va[i]))}`).join(' · '),
      monta(stage, p, ui) {
        const orden = LEC.mix(p.tarjetas);
        stage.innerHTML = `<div class="hj hj-${nombre} hj-hilos"><div class="hj-esc">${d.escena(p)}</div><div class="hj-mesa"><div class="hj-orig">${orden.map((k, n) => `<button type="button" class="hj-o c${n % 4}" data-o="${k}"><i class="hj-nudo"></i><span>${esc(p.tarjetas[k])}</span></button>`).join('')}</div></div><svg class="hj-svg" aria-hidden="true"></svg></div>`;
        const root = stage.firstChild, svg = root.lastElementChild, escena = root.firstChild, ver = {};
        let dedo = null, sel = null, guia = null;
        tapa(root, true);
        const T = i => root.querySelector(`[data-t="${i}"]`), O = i => root.querySelector(`[data-o="${i}"]`), color = k => `c${orden.indexOf(k) % 4}`;
        const curva = (a, b) => { const m = (a[1] + b[1]) / 2; return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} C${a[0].toFixed(1)} ${m.toFixed(1)} ${b[0].toFixed(1)} ${m.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
        function pinta() {
          const b = root.getBoundingClientRect(), e = escena.getBoundingClientRect(), dentro = escena.scrollHeight > escena.clientHeight + 6;
          const nudo = k => { const r = O(k).querySelector('.hj-nudo').getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; };
          svg.setAttribute('viewBox', `0 0 ${Math.max(1, b.width)} ${Math.max(1, b.height)}`);
          let g = '';
          p.tarjetas.forEach((_, k) => {
            const t = ui.s.a[k];
            O(k).classList.toggle('on', t >= 0);
            O(k).setAttribute('aria-label', `${p.tarjetas[k]}${t >= 0 ? `, atada a ${d.rot(p, t)}` : ''}`);
            if (t < 0 || !T(t)) return;
            // El hilo llega a la primera línea del destino.
            const r = (T(t).getClientRects()[0] || T(t).getBoundingClientRect()), bloque = getComputedStyle(T(t)).display !== 'inline', rango = orden.indexOf(k);
            const w = bloque ? [r.right - 16 - rango * 18 - b.left, r.top + Math.min(r.height / 2, 16) - b.top] : [r.left + 4 - b.left, r.top + 3 - b.top];   // en los bloques, a la derecha y en abanico: no tapa las letras
            if (dentro) w[1] = XG.clamp(w[1], e.top - b.top + 4, e.bottom - b.top - 4);
            if (!bloque) w[0] += ui.s.a.slice(0, k).filter(x => x === t).length * 14;
            g += `<path class="hj-hilo ${color(k)} ${ver[k] || ''}" d="${curva(nudo(k), w)}"/><circle class="hj-pin ${color(k)} ${ver[k] || ''}" cx="${w[0].toFixed(1)}" cy="${w[1].toFixed(1)}" r="5"/>`;
          });
          if (guia) g += `<path class="hj-hilo vivo" d="${curva(nudo(guia.k), guia.q)}"/>`;
          svg.innerHTML = g;
          root.querySelectorAll('[data-t]').forEach(t => t.classList.toggle('hj-atada', ui.s.a.includes(+t.dataset.t)));
        }
        const pon = (k, t) => { const a = [...ui.s.a]; a[k] = t; ui.set({ a }); XS.pop(); tactil(); pinta(); };
        const elige = k => { sel = k; root.querySelectorAll('.hj-o').forEach(o => { const on = k != null && +o.dataset.o === k; o.classList.toggle('hj-sel', on); o.setAttribute('aria-pressed', on); }); root.classList.toggle('hj-lleva', k != null); };
        const meta = e => { const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-t]'); return t && root.contains(t) ? t : null; };
        root.addEventListener('pointerdown', e => { const o = e.target.closest('.hj-o'); if (!o || ui.locked || dedo) return; dedo = { id: e.pointerId, k: +o.dataset.o, x: e.clientX, y: e.clientY, mov: false }; });
        const mueve = e => {
          if (!dedo || e.pointerId !== dedo.id) return;
          if (!dedo.mov && Math.hypot(e.clientX - dedo.x, e.clientY - dedo.y) < 8) return;
          dedo.mov = true; e.preventDefault();
          const b = root.getBoundingClientRect(), t = meta(e);
          guia = { k: dedo.k, q: [e.clientX - b.left, e.clientY - b.top] };
          root.querySelectorAll('.over').forEach(o => o !== t && o.classList.remove('over'));
          t?.classList.add('over');
          pinta();
        };
        const deja = e => {
          if (!dedo || e.pointerId !== dedo.id) return;
          const g = dedo; dedo = null; guia = null;
          root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
          if (!g.mov) return;
          root.dataset.dragged = '1'; setTimeout(() => { delete root.dataset.dragged; }, 60);
          const t = e.type === 'pointerup' && !ui.locked && meta(e);
          if (t) { elige(null); pon(g.k, +t.dataset.t); } else pinta();
        };
        const oye = [[window, 'pointermove', mueve, { passive: false }], [window, 'pointerup', deja], [window, 'pointercancel', deja], [window, 'resize', pinta], [document, 'scroll', pinta, true], [root, 'toggle', pinta, true]];
        oye.forEach(([o, t, f, c]) => o.addEventListener(t, f, c));
        ui.limpia(() => oye.forEach(([o, t, f, c]) => o.removeEventListener(t, f, c)));
        desplaza(ui, root, () => !!dedo?.mov);
        root.addEventListener('click', e => {
          if (ui.locked || root.dataset.dragged) return;
          const o = e.target.closest('.hj-o'), t = e.target.closest('[data-t]');
          if (o) { XS.tick(2); return elige(sel === +o.dataset.o ? null : +o.dataset.o); }
          if (t && sel != null) { const k = sel; elige(null); pon(k, +t.dataset.t); }
        });
        root.addEventListener('keydown', e => { if (ui.locked || e.target.dataset?.t == null || (e.key !== 'Enter' && e.key !== ' ')) return; e.preventDefault(); e.stopPropagation(); e.target.click(); });
        ui.nota(d.ayuda || 'Tira un hilo desde cada tarjeta hasta el texto, o toca la tarjeta y luego el texto.');
        ui.espera(60, pinta);
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const malas = p.va.map((c, k) => (igual(c, s.a[k]) ? -1 : k)).filter(k => k >= 0);
          let i = 0;
          const marca = (k, bien) => { ver[k] = bien ? 'good' : 'bad'; O(k).classList.remove('hj-mal'); O(k).classList.add(bien ? 'hj-bien' : 'hj-mal'); };
          const cierre = () => { prende(root); d.final?.(root, p, ui); ui.nota(p.bien); ui.espera(80, pinta); ui.espera(700, pinta); };
          ui.nota('');
          (function sig() {
            if (i < orden.length) { const k = orden[i++], bien = !malas.includes(k); marca(k, bien); if (bien) XS.pop(); else XS.nope(); pinta(); return ui.espera(quieto() ? 0 : 420, sig); }
            if (okk) return cierre();
            ui.nota(p.mira?.[malas[0]] || '', true);
            ui.espera(2400, () => { ui.muestra({ a: p.va.map(base) }); orden.forEach(k => marca(k, true)); pinta(); cierre(); });
          })();
        };
      },
    });
  }

  // -------------------------------------------------------------------------------------------------------- mover tiras
  // d: { tiras(p) en el orden bueno; cabeza(p) }   p: { ini: permutación, fija: las primeras n no se mueven, mira, bien }
  function ordena(nombre, d) {
    XG.juego(nombre, {
      tipo: 'ordena', ini: p => ({ o: [...p.ini], t: false }), listo: s => s.t, ok: (s, p) => s.o.join() === p.ini.map((_, i) => i).join(),
      sol: p => ({ o: p.ini.map((_, i) => i), t: true }), tiras: p => d.tiras(p),
      texto: p => d.tiras(p).map((t, i) => `${i + 1}. ${t.length > 60 ? `${t.split(' ').slice(0, 7).join(' ')}…` : t}`).join(' '),
      monta(stage, p, ui) {
        const tiras = d.tiras(p), fija = p.fija || 0;
        stage.innerHTML = `<div class="hj hj-${nombre} hj-ordena"><div class="hj-esc">${d.cabeza?.(p) || ''}<ol class="hj-tiras"></ol></div></div>`;
        const root = stage.firstChild, ol = root.querySelector('ol');
        ol.innerHTML = tiras.map((t, i) => `<li class="hj-tira" data-i="${i}"><button type="button" class="hj-asa" aria-label="Mover: ${esc(t.split(' ').slice(0, 5).join(' '))}"><i></i></button><span>${luzDe(t, i + 1, p.luz)}</span></li>`).join('');
        const li = i => ol.querySelector(`[data-i="${i}"]`);
        // Cambia el orden y cada tira se desliza hasta su nuevo puesto.
        const acomoda = (ms = 220, menos = null) => {
          const antes = new Map([...ol.children].map(x => [x, x.getBoundingClientRect().top]));
          ui.s.o.forEach(i => ol.appendChild(li(i)));
          [...ol.children].forEach((x, n) => {
            x.classList.toggle('fija', n < fija);
            const dy = antes.get(x) - x.getBoundingClientRect().top;
            if (!dy || x === menos || quieto() || !x.animate) return;
            x.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: ms, easing: 'cubic-bezier(.2,.8,.2,1)' });
          });
        };
        acomoda(0);
        const lleva = (i, a) => { a = XG.clamp(a, fija, tiras.length - 1); const o = ui.s.o.filter(x => x !== i); o.splice(a, 0, i); if (o.join() === ui.s.o.join()) return false; ui.set({ o, t: true }); XS.tick(a); tactil(); return true; };
        let dedo = null;
        ol.addEventListener('pointerdown', e => {
          const x = e.target.closest('.hj-tira'); if (!x || ui.locked || dedo || x.classList.contains('fija')) return;
          if (e.pointerType !== 'mouse' && !e.target.closest('.hj-asa')) return;   // con el dedo, del asa: el resto deja desplazar
          dedo = { id: e.pointerId, x, i: +x.dataset.i }; x.classList.add('lift'); e.preventDefault(); x.querySelector('.hj-asa').focus({ preventScroll: true });
        });
        const mueve = e => {
          if (!dedo || e.pointerId !== dedo.id || ui.locked) return;
          e.preventDefault();
          const n = [...ol.children].filter(x => x !== dedo.x).filter(x => { const r = x.getBoundingClientRect(); return e.clientY > r.top + r.height / 2; }).length;
          if (lleva(dedo.i, n)) acomoda();
        };
        const deja = e => { if (!dedo || e.pointerId !== dedo.id) return; dedo.x.classList.remove('lift'); dedo = null; };
        window.addEventListener('pointermove', mueve, { passive: false }); window.addEventListener('pointerup', deja); window.addEventListener('pointercancel', deja);
        ui.limpia(() => { window.removeEventListener('pointermove', mueve); window.removeEventListener('pointerup', deja); window.removeEventListener('pointercancel', deja); });
        desplaza(ui, root, () => !!dedo);
        ol.addEventListener('keydown', e => {
          const x = e.target.closest('.hj-tira'); if (!x || ui.locked || !['ArrowUp', 'ArrowDown'].includes(e.key) || x.classList.contains('fija')) return;
          e.preventDefault(); e.stopPropagation();
          const i = +x.dataset.i;
          if (lleva(i, ui.s.o.indexOf(i) + (e.key === 'ArrowUp' ? -1 : 1))) { acomoda(); x.querySelector('.hj-asa').focus({ preventScroll: true }); }
        });
        ui.nota(d.ayuda || 'Arrastra cada tira de su asa, o usa las flechas del teclado.');
        return okk => {
          root.classList.add('hj-fin');
          const s = ui.s;
          cierra(ui, okk, {
            lista: () => s.o.map((i, n) => [li(i), i === n]).slice(fija),
            aviso: p.mira?.[s.o.find((i, n) => i !== n)] || '', bien: p.bien,
            buena() { ui.muestra({ o: p.ini.map((_, i) => i), t: true }); root.querySelectorAll('.hj-mal').forEach(x => x.classList.remove('hj-mal')); acomoda(700); },
            final() { [...ol.children].forEach(x => x.classList.add('hj-bien')); prende(root); },
          });
        };
      },
    });
  }

  return { esc, fmt, hoja, completo, cabeza, parr, zona, zonas, toca, pinta, hilos, ordena, oraciones, prende, luzDe, igual, base };
})();
