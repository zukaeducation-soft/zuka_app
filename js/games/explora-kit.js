// Kit de los ejercicios dibujados con las escenas de la explicación (spec 2026-11-24-ejercicios-explora). Usa las piezas de
// js/explora.js (xpAxis, xpArc, xpTween, XS…), que se cargan después: aquí solo se llaman al montar el juego.
//   XG.juego(nombre, { ini(p), listo(s, p), ok(s, p), sol(p), texto(p), monta(stage, p, ui) → fin(ok) })
// Todo es puro menos `monta`. La escena no dice el resultado mientras se responde; `fin(ok)` (al comprobar) ejecuta la
// respuesta del estudiante y, si no sirve, muestra la buena.
const XG = (() => {
  const menos = n => String(n).replace('-', '−');
  const par = n => (n < 0 ? `(${n})` : `${n}`);
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const still = () => typeof xpStill === 'function' && xpStill();

  function juego(name, d) {
    const { ini, listo, ok, sol, texto, monta, ...mas } = d;
    GAMES[name] = {
      xp: true, ...mas, ini, listo, texto, solve: sol,
      grade: (s, p) => ({ ok: !!s && !!ok(s, p), solution: GAMES[name].texto(p) }),
      create(host, p, api) {
        const root = document.createElement('div');
        root.className = `xg xg-${name}`;
        root.innerHTML = '<div class="xp-stage"></div><div class="xp-read" aria-live="polite"></div><p class="xp-nota" role="status"></p>';
        host.appendChild(root);
        const [stage, read, nota] = root.children;
        let s = ini(p), locked = false, vivo = true;
        const stops = new Set();
        // Las teclas con que se maneja el juego no siguen a la lección (allá Enter comprueba y las flechas cambian de ejercicio).
        root.addEventListener('keydown', e => {
          if (!locked && e.target.closest('button, [role=slider]') && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation();
        });
        const ui = {
          root, stage, p, api,
          get s() { return s; },
          get locked() { return locked; },
          set(n) { if (locked) return; s = n; api.ready(!!listo(s, p)); },
          muestra(n) { s = n; },   // ya calificado: la escena enseña otra respuesta
          lee(t) { if (read.dataset.t === t) return; read.dataset.t = t; read.innerHTML = t ? tex(t) : ''; read.classList.remove('swap'); void read.offsetWidth; read.classList.add('swap'); },
          nota(t, aviso) { if (nota.dataset.t === t) return; nota.dataset.t = t; nota.classList.toggle('aviso', !!aviso); nota.innerHTML = xpPalabras(t, 22); },
          // Lo que queda pendiente se corta al salir del ejercicio.
          espera(ms, f) { const id = setTimeout(() => vivo && f(), ms); stops.add(() => clearTimeout(id)); return id; },
          tween(a, b, ms, on, done) { stops.add(xpTween(a, b, ms, x => vivo && on(x), () => vivo && done?.())); },
          limpia(f) { stops.add(f); },
        };
        // El aviso sube desde abajo: si tapa la escena, la lección se desplaza lo justo para verla correr.
        const aLaVista = () => {
          const body = root.closest('.lesson-body'), fb = body?.parentElement.querySelector('.feedback.show');
          if (!body || !fb) return;
          const r = root.getBoundingClientRect(), f = fb.getBoundingClientRect();
          if (f.left >= r.right || f.right <= r.left) return;   // en computador el aviso va en otra columna
          const sobra = r.bottom - f.top, arriba = r.top - body.getBoundingClientRect().top;
          if (sobra > 0) body.scrollBy({ top: Math.min(sobra, Math.max(0, arriba)), behavior: still() ? 'auto' : 'smooth' });
        };
        const fin = monta(stage, p, ui);
        return {
          loaded: Promise.resolve(),
          getState: () => s,
          lock(okk) { if (locked) return; locked = true; root.classList.add('fin'); fin(okk); ui.espera(160, aLaVista); },
          destroy() { vivo = false; stops.forEach(f => f()); root.remove(); },
          peek: () => ({ state: s, solve: sol(p) }),
        };
      },
    };
  }

  // Recta como la de la explicación. Sin `rotulos` escribe todos los números (cada `cada`); con `rotulos`, solo esos.
  function recta(box, { min, max, cada = 1, rotulos = null, et = menos, alto = 156, y = 108 }) {
    const W = 340, PAD = 24, n = max - min, X = v => PAD + (v - min) / n * (W - 2 * PAD);
    let h = `<line class="xp-ax" x1="8" y1="${y}" x2="${W - 8}" y2="${y}"/>`;
    for (let v = min; v <= max; v++) {
      const big = rotulos ? rotulos.includes(v) : v % cada === 0;
      h += `<line class="xp-tk${v === 0 ? ' z' : ''}" x1="${X(v)}" y1="${y - (big ? 6 : 3)}" x2="${X(v)}" y2="${y + (big ? 6 : 3)}"/>`;
      if (big) h += `<text class="xp-lb${v === 0 ? ' z' : ''}" x="${X(v)}" y="${y + 24}">${et(v)}</text>`;
    }
    box.innerHTML = `<svg class="xp-svg" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Recta de ${menos(min)} a ${menos(max)}"><g class="xg-bajo"></g>${h}<g class="xg-din"></g></svg>`;
    const svg = box.firstChild;
    const pt = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * alto / r.height]; };
    return { svg, bajo: svg.querySelector('.xg-bajo'), din: svg.querySelector('.xg-din'), X, y, W, min, max, pt, at: e => min + (pt(e)[0] - PAD) / (W - 2 * PAD) * n };
  }
  const ficha = (x, y, t, cls = '') => `<g class="xp-tok ${cls}"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 5}">${menos(t)}</text></g>`;
  const arco = (x1, x2, y, h, cls) => `<path class="${cls}" d="M${x1} ${y} Q${(x1 + x2) / 2} ${y - 2 * h} ${x2} ${y}"/>`;

  // Perilla sobre un riel de enteros (dedo o flechas): { et, min, max, v, on(v), lee(v) }. Devuelve { set, v }.
  function perilla(ui, box, o) {
    const W = 340, X0 = 34, X1 = 306, Y = 34, X = v => X0 + (v - o.min) / (o.max - o.min) * (X1 - X0);
    const el = document.createElement('div');
    el.className = 'xg-per';
    el.innerHTML = `<svg class="xp-svg" viewBox="0 0 ${W} 60" role="slider" tabindex="0" aria-label="${o.et}" aria-valuemin="${o.min}" aria-valuemax="${o.max}"></svg>`;
    box.appendChild(el);
    const svg = el.firstChild;
    let v = o.v, tocado = false, dedo = null;
    const draw = () => {
      let h = `<text class="xg-et" x="8" y="12">${o.et}</text><text class="xg-val" x="${W - 8}" y="12">${o.lee(v)}</text><line class="xb-rule" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}"/>`;
      for (let k = o.min; k <= o.max; k++) h += `<line class="xb-tk${k === 0 ? ' z' : ''}" x1="${X(k)}" y1="${Y - (k === 0 ? 8 : 4)}" x2="${X(k)}" y2="${Y + (k === 0 ? 8 : 4)}"/>`;
      if (v !== 0 && o.min < 0) h += `<line class="xp-trail${v < 0 ? ' neg' : ''}" x1="${X(0)}" y1="${Y}" x2="${X(v)}" y2="${Y}"/>`;
      if (!tocado && !ui.locked) h += `<circle class="xp-halo" cx="${X(v)}" cy="${Y}" r="15"/>`;
      svg.innerHTML = h + ficha(X(v), Y, o.cara ? o.cara(v) : v, v < 0 ? 'flip' : '');
      svg.setAttribute('aria-valuenow', v); svg.setAttribute('aria-valuetext', o.lee(v) || (o.cara ? `${o.cara(v)}` : menos(v)));
    };
    const pon = n => { n = clamp(n, o.min, o.max); tocado = true; if (n !== v) { v = n; XS.tick(v); xpTick(); o.on(v); } draw(); };
    const at = e => { const r = svg.getBoundingClientRect(); return Math.round(o.min + ((e.clientX - r.left) * W / r.width - X0) / (X1 - X0) * (o.max - o.min)); };
    svg.onpointerdown = e => { if (ui.locked || o.quieta?.() || dedo != null || (o.suelta && Math.abs(at(e) - v) * (X(1) - X(0)) > 30)) return; dedo = e.pointerId; try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } svg.classList.add('drag'); pon(at(e)); };
    svg.onpointermove = e => { if (dedo === e.pointerId && !ui.locked) pon(at(e)); };
    const deja = e => { if (dedo !== e.pointerId) return false; dedo = null; svg.classList.remove('drag'); return !ui.locked; };
    svg.onpointerup = e => { if (deja(e)) o.suelta?.(v); };
    svg.onpointercancel = e => { if (deja(e) && o.suelta) pon(0); };   // un gesto del sistema no lanza
    svg.onkeydown = e => {
      if (ui.locked || o.quieta?.()) return;
      const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (k) { e.preventDefault(); e.stopPropagation(); pon(v + k); }
      else if (e.key === 'Enter' && o.suelta) { e.preventDefault(); e.stopPropagation(); o.suelta(v); }
    };
    draw();
    return { svg, el, get v() { return v; }, set(n) { v = n; draw(); } };
  }

  // Juego de perillas: se fijan uno o dos números y al comprobar la escena los ejecuta.
  //   { campos(p) → [{ k, et, min, max, ini, cara, lee }], listo, ok, sol, texto, alto, quieta(p) → svg, cuadro(s, p, f) → svg, ms,
  //     lee(s, p) → renglón, aviso(s, p), bien(s, p) }     state = { [k]: valor }
  function conPerillas(name, d) {
    juego(name, {
      ini: p => Object.fromEntries(d.campos(p).map(c => [c.k, c.ini])),
      listo: (s, p) => d.listo(s, p), ok: (s, p) => d.ok(s, p), sol: p => d.sol(p), texto: d.texto,
      campos: d.campos, aviso: d.aviso, cuadro: (s, p, f) => d.cuadro(s, p, f), quieta: p => d.quieta(p),
      monta(stage, p, ui) {
        stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
        const [lona, per] = stage.children, campos = d.campos(p);
        lona.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 340 ${d.alto}" role="img" aria-label="Escena del ejercicio"></svg>`;
        const svg = lona.firstChild;
        svg.innerHTML = d.quieta(p);
        const ps = campos.map(c => perilla(ui, per, { ...c, v: c.ini, on: v => ui.set({ ...ui.s, [c.k]: v }) }));
        ui.nota(campos.length > 1 ? 'Mueve las perillas. La escena responde al comprobar.' : 'Mueve la perilla. La escena responde al comprobar.');
        const corre = (s, fin) => { ui.lee(''); ui.tween(0, 1, d.ms || 1200, f => { svg.innerHTML = d.cuadro(s, p, f); }, () => { svg.innerHTML = d.cuadro(s, p, 1); ui.lee(d.lee?.(s, p) || ''); fin(); }); };
        return ok => {
          const s = ui.s;
          ui.nota('');
          corre(s, () => {
            if (ok) return ui.nota(d.bien(s, p));
            ui.nota(d.aviso(s, p));
            ui.espera(2300, () => { const b = d.sol(p); campos.forEach((c, k) => ps[k].set(b[c.k])); corre(b, () => ui.nota(d.bien(b, p))); });
          });
        };
      },
    });
  }

  // Camina por la recta R de `desde` por los tramos [{ d, t }]: pinta cada tramo como flecha y va escribiendo la cuenta.
  function camina(ui, R, desde, tramos, { cada, fin, cara = x => x }) {
    let k = 0, x = desde, fijo = '';
    const tok = (c, cls = '') => ficha(R.X(c), R.y, cara(Math.round(c)), cls);
    const flecha = (a, b, y, d) => {
      const dir = Math.sign(b - a) || 1, f = d < 0 ? ' flip' : '';
      return `<line class="xp-arrow${f}" x1="${R.X(a)}" y1="${y}" x2="${R.X(b) - dir * 7}" y2="${y}"/><path class="xp-head${f}" d="M${R.X(b)} ${y} l${-dir * 10} -6 v12 z"/>`
        + `<text class="xp-tag" x="${(R.X(a) + R.X(b)) / 2}" y="${y - 9}">${d > 0 ? '+' : ''}${menos(d)}</text>`;
    };
    R.din.innerHTML = tok(x);
    (function paso() {
      if (k >= tramos.length) return fin?.(x);
      const { d } = tramos[k], a = x, b = clamp(x + d, R.min, R.max), fuera = b !== x + d, y = R.y - 34 - 30 * k;
      let last = Math.round(a);
      ui.tween(a, b, 350 + 130 * Math.abs(b - a), c => {
        if (Math.round(c) !== last) { last = Math.round(c); XS.tick(last); }
        R.din.innerHTML = fijo + (Math.abs(c - a) > 0.3 ? flecha(a, c, y, d) : '') + tok(c);
      }, () => { if (fuera) return fin?.(a + d, true); fijo += flecha(a, b, y, d); x = a + d; k++; cada?.(k, x); ui.espera(350, paso); });
    })();
  }

  // Fichas que se arrastran (o se tocan): el mismo gesto de la zona de examen.
  const arrastra = (ui, root, sel, o) => ui.limpia(EXQ.drag(root, sel, { live: () => !ui.locked, ...o }));

  return { juego, conPerillas, recta, perilla, camina, arrastra, ficha, arco, menos, par, clamp };
})();
