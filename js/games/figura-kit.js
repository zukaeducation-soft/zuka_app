// Tres armazones sobre XG para los ejercicios que se responden manipulando una figura (spec 2026-11-24-ejercicios-explora). Se
// dibujan con las piezas XPK de la explicación (js/explora-escenas.js, que carga después: solo se usan al montar).
//   XG.figura(nombre, d)   se arrastran las manijas de la figura; al comprobar la figura se completa con lo que escondía.
//       d = { ini(p) → v, manijas(p), ok(v, p), sol(p) → v, texto(p), alto(p), dib(v, K, p, f), lee(v, p), aviso(v, p), bien(v, p), ms }
//       f va de 0 (mientras se responde: nada de resultados) a 1 (la figura ejecutó la respuesta).
//   XG.rotula(nombre, d)   se arrastran medidas a los lugares de la figura. state { q }
//       d = { slots(p), fichas(p), metas(p) → [ficha por lugar], fondo(K, p, f), alto(p), texto(p), aviso(q, p), bien(p) }
//   XG.tiros(nombre, d)    en movimiento: se fija un valor y al soltar la escena lo lanza. Tiros, con un fallo perdonado.
//       d = { perilla(t, p) → { et, min, max, cara, lee }, meta(t, p), alto, dib(t, v, K, p, f), falla(t, v, p), cuenta(t, p), ms }
Object.assign(XG, (() => {
  const igual = (a, b) => Object.keys(a).every(k => a[k] === b[k]);
  const lona = (box, alto, rol = 'role="img"', et = 'Figura del ejercicio') => {
    box.innerHTML = `<svg class="xp-svg xd" viewBox="0 0 340 ${alto}" ${rol} aria-label="${et}"></svg>`;
    return box.firstChild;
  };

  function figura(name, d) {
    XG.juego(name, {
      ini: p => d.ini(p),
      listo: (s, p) => !igual(d.ini(p), s),
      ok: (s, p) => d.ok(s, p), sol: p => d.sol(p), texto: p => d.texto(p),
      figura: true, manijas: p => d.manijas(p), aviso: (s, p) => d.aviso(s, p), bien: (s, p) => d.bien(s, p), lee: (s, p) => d.lee?.(s, p) || '', dib: (v, K, p, f) => d.dib(v, K, p, f), alto: p => d.alto(p),
      monta(stage, p, ui) {
        const H = d.alto(p), ms = xpManijas({ alto: H, manijas: d.manijas(p) });
        stage.innerHTML = '<div class="xg-lona"></div>';
        const svg = lona(stage.firstChild, H, 'tabindex="0" role="application"', `Figura: se mueve con el dedo o con las flechas${ms.length > 1 ? '; espacio cambia de punto' : ''}`);
        let v = { ...ui.s }, dedo = null, act = null, dx = 0, dy = 0, tocado = false, foco = 0, teclas = false;
        const pinta = (f = 0) => {
          let h = d.dib(v, XPK, p, f);
          ms.forEach((m, i) => {
            const [x, y] = m.en(v, p).map(XPK.n), r = m.r || 11;
            if (m.regla) {
              h += XPK.l(34, m.y, 306, m.y, 'lm');
              const n = (m.mx[0] - m.mn[0]) / m.ps[0];
              if (n <= 24) for (let k = 0; k <= n; k++) h += XPK.l(34 + k / n * 272, m.y - 4, 34 + k / n * 272, m.y + 4, 'lm');
              h += XPK.t(34, m.y - 22, m.et || '', 's tm', 'start');
            }
            if (ui.locked && !m.regla) return;
            const t = m.rot ? m.rot(v) : m.regla ? XPK.sig(v[m.ks[0]]) : '';
            if (!tocado && !ui.locked) h += `<circle class="xp-halo" cx="${x}" cy="${y}" r="${t ? 16 : r}"/>`;
            if (teclas && !ui.locked && foco === i) h += `<circle class="xl la" cx="${x}" cy="${y}" r="${(t ? 16 : r) + 4}"/>`;
            h += `<g class="xp-tok"><circle cx="${x}" cy="${y}" r="${t ? 16 : r}"/>${t ? `<text x="${x}" y="${y + 5}"${t.length > 3 ? ' style="font-size:11px"' : ''}>${t}</text>` : ''}</g>`;
          });
          svg.innerHTML = h;
        };
        const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 340 / r.width, (e.clientY - r.top) * H / r.height]; };
        const pon = (m, raw) => {
          const nv = { ...v };
          m.ks.forEach((k, i) => { if (Number.isFinite(raw[i])) nv[k] = xpPaso(raw[i], m.mn[i], m.mx[i], m.ps[i]); });
          if (igual(v, nv) || (m.limita && !m.limita(nv))) return;
          v = nv; XS.tick((nv[m.ks[0]] - m.mn[0]) / ((m.mx[0] - m.mn[0]) || 1) * 18 - 6); xpTick(); ui.set({ ...v }); pinta();
        };
        const arr = x => (Array.isArray(x) ? x : [x]);
        svg.onpointerdown = e => {
          if (ui.locked || dedo != null) return;
          const [x, y] = at(e), c = ms.map((m, i) => { const q = m.en(v, p); return { i, q, d: m.regla ? (Math.abs(y - m.y) < 24 ? 0 : 999) : Math.hypot(q[0] - x, q[1] - y) }; }).sort((a, b) => a.d - b.d)[0];
          if (c.d > 46) return;
          dedo = e.pointerId; foco = c.i; act = ms[c.i]; tocado = true; teclas = false;
          [dx, dy] = act.regla ? [0, 0] : [c.q[0] - x, c.q[1] - y];   // se agarra desde donde se toca, sin saltos
          try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ }
          svg.classList.add('drag');
          if (act.regla) pon(act, arr(act.de(x, y, v, p))); else pinta();
        };
        svg.onpointermove = e => { if (e.pointerId !== dedo || ui.locked) return; const [x, y] = at(e); pon(act, arr(act.de(x + dx, y + dy, v, p))); };
        svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId !== dedo) return; dedo = act = null; svg.classList.remove('drag'); };
        svg.onkeydown = e => {
          if (ui.locked) return;
          const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
          if (e.key === ' ') { e.preventDefault(); e.stopPropagation(); foco = (foco + 1) % ms.length; teclas = true; return pinta(); }
          if (!k) return;
          e.preventDefault(); e.stopPropagation(); teclas = tocado = true;
          const m = ms[foco];
          pon(m, m.ks.map((q, i) => v[q] + m.ps[i] * (m.ks.length > 1 ? k[i] : k[0] * (m.inv ? -1 : 1) + k[1])));
          pinta();
        };
        svg.style.touchAction = 'none';
        pinta(); ui.nota(d.pie || 'Arrastra el punto que brilla.');
        const revela = fin => ui.tween(0, 1, d.ms || 1300, pinta, () => { pinta(1); ui.lee(d.lee?.(v, p) || ''); fin(); });
        return ok => {
          dedo = act = null; svg.classList.remove('drag'); ui.nota('');
          revela(() => {
            if (ok) { XS.merge(); return ui.nota(d.bien(v, p)); }
            XS.nope(); ui.nota(d.aviso(v, p));
            ui.espera(2600, () => {
              const a = { ...v }, b = d.sol(p);
              ui.muestra(b); ui.lee('');
              ui.tween(0, 1, 900, t => { for (const k in b) v[k] = a[k] + (b[k] - a[k]) * t; pinta(1); }, () => { v = { ...b }; pinta(1); ui.lee(d.lee?.(v, p) || ''); ui.nota(d.bien(v, p)); });
            });
          });
        };
      },
    });
  }

  // La bandeja se revuelve (siempre igual): las fichas buenas no salen en el orden de sus lugares, porque un toque llena el primero libre.
  function revuelve(fichas, metas) {
    const coin = a => metas.filter((m, i) => a[i] === m).length;
    let mejor = null;
    for (let s = 1; s <= 60; s++) {
      let h = s * 2654435761 >>> 0;
      const a = [...fichas];
      for (let i = a.length - 1; i > 0; i--) { h = (Math.imul(h ^ (h >>> 15), 2246822519) + s) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
      if (!mejor || coin(a) < coin(mejor)) mejor = a;
      if (!coin(mejor)) break;
    }
    return mejor;
  }
  function rotula(name, d) {
    const fichas = p => revuelve(d.fichas(p), d.metas(p));
    // d.juzga(q, p), si existe, dice lugar por lugar qué vale (p. ej. dos lugares que aceptan sus fichas en cualquier orden).
    const bien = (s, p) => (d.juzga ? d.juzga(s.q, p) : d.metas(p).map((m, i) => s.q[i]?.[0] === m));
    XG.juego(name, {
      ini: p => ({ q: d.slots(p).map(() => []) }),
      listo: s => s.q.every(l => l.length),
      ok: (s, p) => bien(s, p).every(Boolean),
      sol: p => ({ q: d.metas(p).map(m => [m]) }),
      texto: p => d.texto(p),
      rotula: true, slots: p => d.slots(p), fichas, metas: p => d.metas(p), aviso: (s, p) => d.aviso(s.q, p), bien: p => d.bien(p), fondo: (K, p, f) => d.fondo(K, p, f), alto: p => d.alto(p),
      monta(stage, p, ui) {
        stage.innerHTML = '<div class="xg-lona xg-rot"></div>';
        const box = stage.firstChild, slots = d.slots(p);
        let esc = null, f = 0;
        const monta = s => {
          esc?.(); esc = XPD.fichas(box, { slots, fichas: fichas(p), alto: d.alto(p), cumple: () => true,
            fondo: K => d.fondo(K, p, f) },
          s, { set: n => { ui.set(n); ui.nota(''); }, nota() {} });
        };
        monta(ui.s); ui.limpia(() => esc?.());
        ui.nota('Arrastra cada ficha a su lugar, o tócala.');
        box.addEventListener('keydown', e => { if (!ui.locked && e.target.closest('.xfi-ch') && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation(); });
        return ok => {
          box.inert = true;
          const s = { q: ui.s.q.map(l => [...l]) }, juicio = bien(s, p), MV = XG.ROTULA?.[name];
          monta(s); ui.nota('');
          // Encima de las fichas: lo que ejecuta la escena, la lectura de cada lugar y sus marcas.
          const capa = k => {
            const svg = box.querySelector('.xfi');
            if (!svg.querySelector('.xg-mv')) svg.insertAdjacentHTML('beforeend', '<g class="xg-mv" aria-hidden="true"><g class="es"></g><g class="le"></g><g class="an"></g></g>');
            return svg.querySelector(`.xg-mv .${k}`);
          };
          const cambia = d.fondo(XPK, p, 0) !== d.fondo(XPK, p, 1);
          const anda = fin => (cambia ? ui.tween(0, 1, 1300, x => { f = x; esc.salta([{}]); }, fin) : fin());
          const corre = (q, fin) => { if (!MV) return fin(); const v = q.map(l => l[0]); ui.tween(0, 1, 1400, x => { try { capa('es').innerHTML = MV(XPK, p, v, x); } catch (e) { /* sin escena, sigue */ } }, () => ui.espera(250, fin)); };
          const columna = p.et?.length === slots.length && slots.every(z => z.x === slots[0].x), x0 = p.tab ? 34 + 32 * p.letras.length : 8;
          // Camino hasta el lugar i: un punto que salta desde el anterior (si hay una cuenta) o un renglón que se subraya.
          const lee = (i, x) => {
            const sl = slots[i], an = slots[i - 1], w = sl.w || 56, h = sl.h || 42;
            if (an && an.y === sl.y && p.ops?.[i - 1]?.trim()) { const y = sl.y - h / 2 - 2; return XPK.c(an.x + (sl.x - an.x) * x, y - 22 * Math.sin(Math.PI * x), 5, 'fA'); }
            if (columna) return XPK.l(x0, sl.y + h / 2 - 3, x0 + (sl.x - w / 2 - 6 - x0) * x, sl.y + h / 2 - 3, 'la');
            return XPK.f(1 - x, XPK.r(sl.x - w / 2 - 4 - 10 * (1 - x), sl.y - h / 2 - 4 - 10 * (1 - x), w + 8 + 20 * (1 - x), h + 8 + 20 * (1 - x), 'fn', 16));
          };
          const sella = (i, si, nace) => {
            const sl = slots[i], w = sl.w || 56, h = sl.h || 42, x = sl.x + w / 2 + 1, y = sl.y - h / 2 - 1;
            capa('an').insertAdjacentHTML('beforeend', `${XPK.r(sl.x - w / 2 - 4, sl.y - h / 2 - 4, w + 8, h + 8, `${si ? 'bien' : 'mal'} xg-aro`, 13)}<g class="xg-sello">${XPK.c(Math.min(331, x), Math.max(9, y), 8, si ? 'fo' : 'ff')}<text class="xt s" x="${Math.min(331, x)}" y="${Math.max(9, y) + 4}" style="text-anchor:middle;font-size:11px">${si ? '✓' : '✗'}</text></g>`);
            box.querySelectorAll(`.xfi-ch.in[data-slot="${i}"]`).forEach(g => g.classList.add(nace || si ? 'mv-bien' : 'mv-mal'));
          };
          const revisa = (lista, j, fin, nace) => {
            let k = 0; const dura = Math.max(60, Math.min(260, 1500 / lista.length));
            (function sig() {
              if (k >= lista.length) { capa('le').innerHTML = ''; return ui.espera(300, fin); }
              const i = lista[k++];
              ui.tween(0, 1, dura, x => { capa('le').innerHTML = lee(i, x); }, () => { sella(i, j[i], nace); j[i] ? XS.tick(k * 2) : XS.nope(); ui.espera(dura * 0.6, sig); });
            })();
          };
          // Lo que da la cuenta con las fichas puestas.
          const cuenta = q => { const c = XG.cadena?.(p.ops, q.map(l => l[0])); if (c) ui.lee(c.tex); };
          const todos = XG.ORDEN?.[name] || slots.map((_, i) => i);
          anda(() => corre(s.q, () => revisa(todos, juicio, () => {
            cuenta(s.q);
            if (ok) { XS.merge(); return ui.nota(d.bien(p)); }
            XS.nope(); ui.nota(d.aviso(s.q, p));
            ui.espera(2800, () => corrige());
          })));
          // Las fichas buenas vuelan a su lugar y las otras vuelven a la bandeja.
          function corrige() {
            const b = { q: d.metas(p).map(m => [m]) }, lugar = g => (/translate\(([-\d.]+) ([-\d.]+)\)/.exec(g.getAttribute('transform')) || [0, 0, 0]).slice(1).map(Number);
            const foto = () => [...box.querySelectorAll('.xfi-ch')].map(g => ({ g, t: g.textContent, z: lugar(g) }));
            const antes = foto().map(x => ({ t: x.t, z: x.z }));
            ui.muestra(b); monta(b); ui.nota(''); ui.lee('');
            const van = [];
            for (const x of foto()) { const i = antes.findIndex(y => y.t === x.t && y.z.join() === x.z.join()); if (i >= 0) antes.splice(i, 1); else van.push(x); }
            for (const x of van) { const i = antes.findIndex(y => y.t === x.t); x.de = i >= 0 ? antes.splice(i, 1)[0].z : x.z; }
            const mueve = k => van.forEach(x => x.g.setAttribute('transform', `translate(${XPK.n(x.de[0] + (x.z[0] - x.de[0]) * k)} ${XPK.n(x.de[1] + (x.z[1] - x.de[1]) * k)})`));
            mueve(0); XS.pop();
            ui.tween(0, 1, 900, mueve, () => { mueve(1); todos.filter(i => juicio[i]).forEach(i => sella(i, true, true)); corre(b.q, () => revisa(todos.filter(i => !juicio[i]), juicio.map(() => true), () => { cuenta(b.q); ui.nota(d.bien(p)); }, true)); });
          }
        };
      },
    });
  }

  const MAXF = 2;
  function tiros(name, d) {
    XG.juego(name, {
      ini: () => ({ n: 0, fallos: 0 }),
      listo: (s, p) => s.n >= p.tiros.length || s.fallos >= MAXF,
      ok: (s, p) => s.n >= p.tiros.length && s.fallos < MAXF,
      sol: p => ({ n: p.tiros.length, fallos: 0 }),
      tira(s, v, p) {
        if (s.n >= p.tiros.length || s.fallos >= MAXF) return s;
        return v === d.meta(p.tiros[s.n], p) ? { ...s, n: s.n + 1 } : { ...s, fallos: s.fallos + 1 };
      },
      texto: p => p.tiros.map(t => `${d.cuenta(t, p)}`).join('; '),
      tiros: true, perilla: (t, p) => d.perilla(t, p), meta: (t, p) => d.meta(t, p), dib: (t, v, K, p, f) => d.dib(t, v, K, p, f), falla: (t, v, p) => d.falla(t, v, p),
      monta(stage, p, ui) {
        const G = GAMES[name];
        stage.innerHTML = '<div class="xg-pide"></div><div class="xp-dots" aria-hidden="true"></div><div class="xg-lona"></div><div class="xg-perillas"></div>';
        const [pide, dots, box, per] = stage.children, svg = lona(box, d.alto);
        svg.style.overflow = 'hidden';   // lo que se pasa sale del cuadro, no de la lona
        let vuela = false, pe = null;
        const tiro = () => p.tiros[Math.min(ui.s.n, p.tiros.length - 1)];
        const punto = () => { dots.innerHTML = p.tiros.map((_, k) => `<i class="${k < ui.s.n ? 'done' : k === ui.s.n ? 'now' : ''}"></i>`).join(''); };
        const pone = () => {
          const t = tiro(), o = d.perilla(t, p), foco = per.contains(document.activeElement);   // el foco sigue en la perilla nueva
          punto(); pide.innerHTML = tex(t.q); svg.innerHTML = d.dib(t, null, XPK, p, 0); per.innerHTML = '';
          pe = XG.perilla(ui, per, { ...o, v: o.min, lee: v => (v === o.min ? 'estira y suelta' : o.lee(v)), quieta: () => vuela || G.listo(ui.s, p), on() {}, suelta: lanza });
          if (foco) pe.svg.focus({ preventScroll: true });
        };
        const corre = (t, v, fin) => { let u = -1; ui.tween(0, 1, d.ms || 1500, f => { const k = Math.floor(f * 6); if (k !== u) { u = k; XS.tick(k * 2); } svg.innerHTML = d.dib(t, v, XPK, p, f); }, () => { svg.innerHTML = d.dib(t, v, XPK, p, 1); fin(); }); };
        function lanza(v) {
          const t = tiro();
          if (vuela || G.listo(ui.s, p) || v === d.perilla(t, p).min) return;
          vuela = true; ui.nota('');
          corre(t, v, () => {
            if (ui.locked) return;
            const antes = ui.s, s = G.tira(antes, v, p), bien = s.n > antes.n;
            ui.set(s); bien ? XS.merge() : XS.nope();
            ui.lee(bien ? d.cuenta(t, p) : '');
            ui.nota(bien ? (s.n >= p.tiros.length ? 'Ya están todos. Comprueba.' : 'Justo.') : d.falla(t, v, p), !bien);
            if (!bien && s.fallos >= MAXF) ui.espera(1700, () => !ui.locked && ui.nota('Se acabaron los intentos. Comprueba para ver cómo era.', true));
            if (G.listo(s, p)) { vuela = false; return punto(); }
            ui.espera(2000, () => { vuela = false; ui.lee(''); ui.nota(bien ? 'Siguiente tiro.' : 'Otra vez: ya no puedes fallar más.'); pone(); });
          });
        }
        pone(); ui.nota(d.pie || 'Estira hasta el valor y suelta.');
        return ok => {
          ui.nota(ok ? 'Todos justos.' : 'Mira cómo era.');
          if (ok) return;
          const t = tiro(), m = d.meta(t, p);
          pe.set(m); ui.espera(400, () => corre(t, m, () => ui.lee(d.cuenta(t, p))));
        };
      },
    });
  }

  return { figura, rotula, tiros };
})());
