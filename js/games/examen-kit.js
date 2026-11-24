// Zona de examen del Preuniversitario, razonamiento lógico (spec 2026-11-20-preuda-razonamiento-diez). Tres juegos HTML que
// ponen el concepto de la lección en un problema como los del examen, cada uno con un gesto distinto:
//   completa-solucion  el problema y su solución con huecos: se arrastran las fichas a los huecos (un toque la manda al primer hueco libre).
//                      params = { q, lines: ['… [[valor]] …'], extra: [fichas que sobran] }   state = { fill: [texto | null] }
//   caza-error         una solución con un paso equivocado: se toca el paso y se le arrastra encima la corrección.
//                      params = { q, steps: [texto], wrong, fixes: [texto], fix }             state = { line, fix }
//   opcion-examen      la pregunta en el formato real, con opciones A–D.
//                      params = { q, options: [4], answer }                                    state = { pick }
// Los textos llevan TeX entre $…$. En `lines`, los huecos [[…]] van fuera de las fórmulas.
const EXQ = (() => {
  // «30 %» no se parte entre dos renglones.
  const T = s => { s = String(s).replace(/(\d) %/g, '$1 %'); return typeof tex === 'function' ? tex(s) : s; };
  const TAG = '<p class="exq-tag"><i></i>Como en el examen</p>';
  const head = p => `${TAG}<div class="exq-q">${T(p.q)}</div>`;
  const BL = /\[\[(.+?)\]\]/g;
  const blanksOf = p => p.lines.flatMap(l => [...l.matchAll(BL)].map(m => m[1]));
  // Orden fijo y revuelto (no depende del azar: la misma ficha queda siempre en el mismo sitio).
  const mix = (list, seed) => {
    const h = s => { let x = 2166136261 ^ seed; for (const ch of s) x = Math.imul(x ^ ch.charCodeAt(0), 16777619); return x >>> 0; };
    return list.map((t, i) => [h(`${t}#${i}`), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  };
  const box = (host, cls) => { const b = document.createElement('div'); b.className = `exq ${cls}`; host.appendChild(b); return b; };

  // Arrastre de fichas con el dedo o el ratón. onDrop(ficha, elemento bajo el dedo); un toque sin mover llama onTap(ficha).
  function drag(root, sel, { onDrop, onTap, live }) {
    let d = null;
    root.addEventListener('pointerdown', e => {
      const el = e.target.closest(sel);
      if (!el || !live() || d) return;
      d = { el, id: e.pointerId, x: e.clientX, y: e.clientY, ghost: null };
    });
    const move = e => {
      if (!d || e.pointerId !== d.id) return;
      if (!d.ghost && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 7) {
        const r = d.el.getBoundingClientRect();
        d.ghost = d.el.cloneNode(true);
        d.ghost.classList.add('exq-ghost');
        Object.assign(d.ghost.style, { width: `${r.width}px`, left: `${r.left}px`, top: `${r.top}px` });
        d.ox = e.clientX - r.left; d.oy = e.clientY - r.top;
        document.body.appendChild(d.ghost);
        d.el.classList.add('lift');
      }
      if (d.ghost) {
        e.preventDefault();
        d.ghost.style.left = `${e.clientX - d.ox}px`; d.ghost.style.top = `${e.clientY - d.oy}px`;
        const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-drop]');
        root.querySelectorAll('.over').forEach(o => o !== over && o.classList.remove('over'));
        if (over && root.contains(over)) over.classList.add('over');
      }
    };
    const up = e => {
      if (!d || e.pointerId !== d.id) return;
      const { el, ghost } = d; d = null;
      el.classList.remove('lift');
      root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
      if (!ghost) return;     // sin arrastre: el click normal hace de toque
      ghost.remove();
      if (!live()) return;
      const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-drop]');
      root.dataset.dragged = '1'; setTimeout(() => { delete root.dataset.dragged; }, 60);
      if (over && root.contains(over)) onDrop(el, over);
    };
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    root.addEventListener('click', e => {
      if (root.dataset.dragged || !live()) return;
      const el = e.target.closest(sel);
      if (el) onTap(el);
    });
    return () => { d?.ghost?.remove(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }

  // ── completa-solucion ──────────────────────────────────────────────────────────────────────────────────────────────
  const completa = {
    grade(state, params) {
      const bl = blanksOf(params);
      return { ok: bl.every((b, i) => state?.fill?.[i] === b), solution: params.lines.map(l => l.replace(BL, '$1')).join(' · ') };
    },
    solve: params => ({ fill: blanksOf(params) }),
    create(host, params, api) {
      const bl = blanksOf(params), chips = [...bl, ...(params.extra || [])], order = mix(chips, params.q.length);
      const fill = bl.map(() => -1);      // índice de la ficha puesta en cada hueco
      let locked = false;
      const b = box(host, 'exq-completa');
      const used = c => fill.includes(c);
      function render() {
        let n = 0;
        const line = l => l.split(BL).map((s, i) => {
          if (i % 2 === 0) return T(s);
          const k = n++, c = fill[k];
          const cls = locked ? (c >= 0 && chips[c] === bl[k] ? ' good' : ' bad') : c >= 0 ? ' full' : '';
          return `<button type="button" class="exq-blank${cls}" data-drop data-b="${k}" aria-label="hueco ${k + 1}${c >= 0 ? `: ${chips[c]}` : ', vacío'}">${locked ? T(bl[k]) : c >= 0 ? T(chips[c]) : ''}</button>`;
        }).join('');
        const tray = order.filter(c => !used(c)).map(c => `<button type="button" class="exq-chip" data-c="${c}">${T(chips[c])}</button>`).join('');
        b.innerHTML = `${head(params)}<ol class="exq-sol">${params.lines.map(l => `<li>${line(l)}</li>`).join('')}</ol>
          ${locked ? '' : `<div class="exq-tray" data-drop data-tray aria-label="Fichas">${tray || '<span class="exq-empty">Toca un hueco para devolver su ficha</span>'}</div>`}`;
      }
      const put = (c, k) => { const was = fill.indexOf(c); if (was >= 0) fill[was] = -1; fill[k] = c; after(); };
      const after = () => { api.sfx?.tap?.(); render(); api.ready(fill.every(c => c >= 0)); };
      const off = drag(b, '.exq-chip, .exq-blank.full', {
        live: () => !locked,
        onDrop(el, over) {
          const c = el.dataset.c != null ? +el.dataset.c : fill[+el.dataset.b];
          if (over.dataset.b != null) put(c, +over.dataset.b);
          else if (over.dataset.tray != null && el.dataset.b != null) { fill[+el.dataset.b] = -1; after(); }
        },
        onTap(el) {
          if (el.dataset.c != null) {
            const free = fill.indexOf(-1);
            if (free >= 0) put(+el.dataset.c, free);
          } else { fill[+el.dataset.b] = -1; after(); }
        },
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ fill: fill.map(c => (c >= 0 ? chips[c] : null)) }),
        lock() { locked = true; render(); },
        destroy() { off(); b.remove(); },
        peek: () => ({ fill, chips, solve: bl }),
      };
    },
  };

  // ── caza-error ─────────────────────────────────────────────────────────────────────────────────────────────────────
  const caza = {
    grade(state, params) {
      return { ok: state?.line === params.wrong && state?.fix === params.fix, solution: `El error está en el paso ${params.wrong + 1}. Debía ser: ${params.fixes[params.fix]}` };
    },
    solve: params => ({ line: params.wrong, fix: params.fix }),
    create(host, params, api) {
      const st = { line: -1, fix: -1 };
      let locked = false;
      const order = mix(params.fixes, params.q.length + 7);
      const b = box(host, 'exq-caza');
      function render() {
        const steps = params.steps.map((s, i) => {
          const on = i === st.line, fixed = on && st.fix >= 0;
          const cls = locked ? (i === params.wrong ? ' good' : on ? ' bad' : '') : on ? ' on' : '';
          const show = locked && i === params.wrong ? params.fixes[params.fix] : fixed ? params.fixes[st.fix] : null;
          return `<li><button type="button" class="exq-step${cls}" data-drop data-i="${i}" aria-pressed="${on}"><span class="exq-n">${i + 1}</span><span class="exq-t">${show != null ? `<s>${T(s)}</s><b>${T(show)}</b>` : T(s)}</span></button></li>`;
        }).join('');
        const tray = st.line < 0 ? '<span class="exq-empty">Toca el paso que no se justifica</span>'
          : order.map(f => `<button type="button" class="exq-chip wide${f === st.fix ? ' on' : ''}" data-f="${f}">${T(params.fixes[f])}</button>`).join('');
        b.innerHTML = `${head(params)}<p class="exq-sub">Esta solución tiene <b>un paso equivocado</b>.</p><ol class="exq-steps">${steps}</ol>
          ${locked ? '' : `<p class="exq-sub">${st.line < 0 ? '' : 'Arrastra al paso cómo debía quedar:'}</p><div class="exq-tray col">${tray}</div>`}`;
      }
      const after = () => { api.sfx?.tap?.(); render(); api.ready(st.line >= 0 && st.fix >= 0); };
      const off = drag(b, '.exq-chip, .exq-step', {
        live: () => !locked,
        onDrop(el, over) { if (el.dataset.f != null && over.dataset.i != null) { st.line = +over.dataset.i; st.fix = +el.dataset.f; after(); } },
        onTap(el) {
          if (el.dataset.f != null) st.fix = +el.dataset.f;
          else { const i = +el.dataset.i; if (st.line !== i) { st.line = i; st.fix = -1; } }
          after();
        },
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ ...st }),
        lock() { locked = true; render(); },
        destroy() { off(); b.remove(); },
        peek: () => ({ state: st, solve: { line: params.wrong, fix: params.fix } }),
      };
    },
  };

  // ── opcion-examen ──────────────────────────────────────────────────────────────────────────────────────────────────
  const L = 'ABCD';
  const opcion = {
    grade(state, params) { return { ok: state?.pick === params.answer, solution: `${L[params.answer]}. ${params.options[params.answer]}` }; },
    solve: params => ({ pick: params.answer }),
    create(host, params, api) {
      const st = { pick: -1 };
      let locked = false;
      const b = box(host, 'exq-opcion');
      function render() {
        b.innerHTML = `${head(params)}<div class="exq-opts" role="radiogroup" aria-label="Opciones">${params.options.map((o, i) => {
          const cls = locked ? (i === params.answer ? ' good' : i === st.pick ? ' bad' : '') : i === st.pick ? ' on' : '';
          return `<button type="button" class="exq-opt${cls}" role="radio" aria-checked="${i === st.pick}" data-i="${i}"><b>${L[i]}</b><span>${T(o)}</span></button>`;
        }).join('')}</div>`;
      }
      b.addEventListener('click', e => {
        const o = e.target.closest('.exq-opt');
        if (!o || locked) return;
        st.pick = +o.dataset.i; api.sfx?.tap?.(); render(); api.ready(true);
        b.querySelector(`.exq-opt[data-i="${st.pick}"]`)?.focus({ preventScroll: true });
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ ...st }),
        lock() { locked = true; render(); },
        destroy() { b.remove(); },
        peek: () => ({ state: st, solve: params.answer }),
      };
    },
  };

  return { completa, caza, opcion, blanksOf, drag };
})();
