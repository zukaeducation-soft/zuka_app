// Armazones de los acertijos dibujados con las escenas de la explicación (spec 2026-11-24-ejercicios-explora). Las pistas van escritas
// y con su regla; al comprobar se encienden una por una, cumplida o rota, sobre lo que armó el estudiante.
//   XG.puestos(nombre, d)  fichas que se llevan a sus puestos.   params { fichas, pistas: [{ t, r }], fijas?, ini? }   state { q }
//   XG.marca(nombre, d)    se tocan los sitios que cumplen.      state { on: [bool] }
//   XG.cartas(nombre, d)   se escogen k pistas que dejan un solo orden posible.   params { names, dadas?, cartas, k }   state { en }
//   XG.tabla(nombre)       tabla de ✓ y ✗.   params { filas, cols, pistas }   state { c }
// Reglas en js/games/logica-kit.js: XG.regla (filas, mesas), XG.reglaEq (equipos) y XG.reglaTb (tablas).
Object.assign(XG, (() => {
  const perms = a => (a.length < 2 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(r => [x, ...r])));
  const lazo = (a, b, n) => { const d = Math.abs(a - b); return Math.min(d, n - d); };
  // o: lista de nombres por puesto (o null). Reglas de fila y de mesa redonda (terminadas en «c»; el puesto sigue en el sentido del reloj).
  function regla([k, a, b, x], o) {
    const n = o.length, i = o.indexOf(a), j = o.indexOf(b);
    if (i < 0) return false;
    switch (k) {
      case 'en': return i === b;
      case 'noen': return i !== b;
      case 'grupo': return i >= b && i <= x;
      case 'noext': return i > 0 && i < n - 1;
      case 'mismo': return j >= 0 && i % 3 === j % 3;      // misma columna, en dos filas de tres
      case 'rel': return j >= 0 && j % 3 === i % 3 + x;
    }
    if (j < 0) return false;
    switch (k) {
      case 'sig': return j === i + 1;
      case 'antes': return i < j;
      case 'dist': return j - i === x;
      case 'junto': return Math.abs(i - j) === 1;
      case 'nojunto': return Math.abs(i - j) !== 1;
      case 'sigc': return j === (i + 1) % n;
      case 'frente': return lazo(i, j, n) * 2 === n;
      case 'juntoc': return lazo(i, j, n) === 1;
      case 'nojuntoc': return lazo(i, j, n) !== 1;
      case 'entre': return lazo(i, j, n) === 1 && lazo(i, o.indexOf(x), n) === 1;
    }
    throw new Error(`regla ${k}`);
  }
  // Equipos: s es el conjunto (arreglo) de los que van.
  function reglaEq([k, a, b], s) {
    const A = s.includes(a), B = s.includes(b);
    switch (k) {
      case 'va': return A;
      case 'si': return !A || B;
      case 'nojuntos': return !(A && B);
      case 'o': return A || B;
      case 'rompe': return !reglaEq(a, s);
      case 'son': return s.length === a;
    }
    throw new Error(`regla ${k}`);
  }
  // Tablas: v(r, c) dice si hay ✓.
  function reglaTb([k, r, c, c2], v, n) {
    switch (k) {
      case 'es': return v(r, c);
      case 'no': return !v(r, c);
      case 'o': return v(r, c) || v(r, c2);
      case 'liga': return Array.from({ length: n }, (_, i) => i).some(i => v(i, r) && v(i, c));
    }
    throw new Error(`regla ${k}`);
  }

  // Lista de pistas en HTML; `revisa` las enciende de a una y al final llama fin(primera rota o −1).
  function pistas(ui, box, lista) {
    box.className = 'xg-pistas';
    box.innerHTML = lista.map(x => `<div class="xg-pista"><i aria-hidden="true"></i><span>${tex(x.t)}</span></div>`).join('');
    return {
      revisa(vals, fin) {
        const els = [...box.children];
        els.forEach(e => e.classList.remove('bien', 'mal'));
        let k = 0;
        (function sig() {
          if (k >= els.length) return fin(vals.indexOf(false));
          els[k].classList.add(vals[k] ? 'bien' : 'mal');
          vals[k] ? XS.tick(k * 2) : XS.nope();
          k++; ui.espera(480, sig);
        })();
      },
    };
  }

  function puestos(name, d) {
    const lleno = q => q.map(l => l[0] ?? null);
    const cumple = (q, p) => { const o = lleno(q); return p.pistas.map(x => regla(x.r, o)); };
    const ocultas = (q, p) => (p.ocultas || []).every(r => regla(r, lleno(q)));   // condiciones que dice el enunciado
    const todas = p => {
      const n = d.slots(p).length, fij = p.fijas || {}, lib = Array.from({ length: n }, (_, i) => i).filter(i => fij[i] == null), out = [];
      for (const o of perms(p.fichas)) { const q = Array.from({ length: n }, (_, i) => (fij[i] != null ? [fij[i]] : [])); lib.forEach((i, k) => { q[i] = [o[k]]; }); if (cumple(q, p).every(Boolean) && ocultas(q, p)) out.push({ q }); }
      return out;
    };
    XG.juego(name, {
      puestos: true, slots: p => d.slots(p), fondo: (K, p) => d.fondo(K, p), alto: p => d.alto(p), todas, cumple,
      ini: p => ({ q: d.slots(p).map((_, i) => (p.fijas?.[i] != null ? [p.fijas[i]] : p.ini ? [p.ini[i]] : [])) }),
      listo: (s, p) => s.q.every(l => l.length) && (!p.ini || s.q.some((l, i) => l[0] !== p.ini[i])),
      ok: (s, p) => s.q.every(l => l.length) && cumple(s.q, p).every(Boolean) && ocultas(s.q, p),
      sol: p => todas(p)[0],
      texto: p => `${d.orden || ''}${lleno(todas(p)[0].q).map(x => x).join(', ')}`,
      monta(stage, p, ui) {
        stage.innerHTML = '<div class="xg-lona xg-rot"></div><div></div>';
        const [box, lis] = stage.children, L = pistas(ui, lis, p.pistas);
        let esc = null;
        const monta = s => { esc?.(); esc = XPD.fichas(box, { slots: d.slots(p), fichas: p.fichas, fijas: p.fijas, alto: d.alto(p), cumple: () => true, fondo: K => d.fondo(K, p) }, s, { set: n => { ui.set(n); ui.nota(''); }, nota() {} }); };
        monta(ui.s); ui.limpia(() => esc?.());
        ui.nota(p.ini ? 'Arrastra una ficha sobre otra para cambiarlas. Un toque la saca y otro la pone donde quepa.' : 'Arrastra cada ficha a su puesto. Un toque también la lleva o la devuelve.');
        box.addEventListener('keydown', e => { if (!ui.locked && e.target.closest('.xfi-ch') && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation(); });
        return ok => {
          box.inert = true; ui.nota('');
          const s = ui.s; monta(s);   // suelta un arrastre a medias: lo que se ve es lo calificado
          L.revisa(cumple(s.q, p), mala => {
            if (ok) { XS.merge(); return ui.nota('Todas las pistas se cumplen.'); }
            ui.nota(mala >= 0 ? 'Las pistas marcadas no se cumplen.' : p.avisoOculto);
            ui.espera(2800, () => { const b = todas(p)[0]; ui.muestra(b); monta(b); L.revisa(cumple(b.q, p), () => ui.nota('Así se cumplen todas.')); });
          });
        };
      },
    });
  }

  // d = { sitios(p) → [{ x, y, w, h, red? }], cara(K, p, i, on), fondo(K, p), alto(p), vale(on, p), sol(p) → [índices], unica (la respuesta
  //       es ese conjunto), pistas(p)?, cumple(on, p)?, aviso(on, p), bien(p), texto(p), pie }
  function marca(name, d) {
    const arr = (is, p) => d.sitios(p).map((_, i) => is.includes(i));
    XG.juego(name, {
      marca: true, sitios: p => d.sitios(p), cara: (K, p, i, on) => d.cara(K, p, i, on), fondo: (K, p) => d.fondo?.(K, p) || '', alto: p => d.alto(p), aviso: (s, p) => d.aviso(s.on, p), cumple: (s, p) => d.cumple?.(s.on, p),
      ini: p => ({ on: arr([], p) }),
      listo: (s, p) => (p.cuantos ? s.on.filter(Boolean).length === p.cuantos : s.on.some(Boolean)),
      ok: (s, p) => (d.vale ? !!d.vale(s.on, p) : arr(d.sol(p), p).every((x, i) => x === s.on[i])),
      sol: p => ({ on: arr(d.sol(p), p) }),
      texto: p => d.texto(p),
      monta(stage, p, ui) {
        const H = d.alto(p), st = d.sitios(p);
        stage.innerHTML = `<div class="xg-lona"><svg class="xp-svg xd xg-mk" viewBox="0 0 340 ${H}" role="group" aria-label="Toca los que cumplen"></svg></div><div></div>`;
        const svg = stage.querySelector('svg'), L = d.pistas ? pistas(ui, stage.children[1], d.pistas(p)) : null;
        let juicio = null;
        const draw = () => {
          svg.innerHTML = (d.fondo?.(XPK, p) || '') + st.map((t, i) => {
            const on = ui.s.on[i], c = juicio ? (juicio[i] ? (on ? ' bien' : ' falta') : on ? ' mal' : '') : '';
            return `<g class="xg-sit${on ? ' on' : ''}${c}" data-i="${i}" ${ui.locked ? '' : 'tabindex="0" role="button"'} aria-pressed="${on}"${d.nombre ? ` aria-label="${d.nombre(p, i)}"` : ''}>${t.red ? `<circle class="caja" cx="${t.x}" cy="${t.y}" r="${t.w / 2}"/>` : `<rect class="caja" x="${t.x - t.w / 2}" y="${t.y - t.h / 2}" width="${t.w}" height="${t.h}" rx="10"/>`}${d.cara(XPK, p, i, on)}</g>`;
          }).join('');
        };
        const toca = i => {
          if (ui.locked) return;
          ui.set({ on: ui.s.on.map((x, k) => (k === i ? !x : x)) }); XS.pop(); xpTick(); draw();
          if (p.cuantos) { const n = ui.s.on.filter(Boolean).length; ui.nota(n > p.cuantos ? `Van ${n}: son ${p.cuantos}.` : ''); }
        };
        svg.onclick = e => { const g = e.target.closest('.xg-sit'); if (g) toca(+g.dataset.i); };
        svg.onkeydown = e => {
          const g = e.target.closest('.xg-sit'); if (!g || ui.locked || !/^(Enter| |Arrow.*)$/.test(e.key)) return;
          e.preventDefault(); e.stopPropagation();
          const i = +g.dataset.i, m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (!m) toca(i);
          svg.querySelector(`[data-i="${m ? (i + m + st.length) % st.length : i}"]`).focus();
        };
        draw(); ui.nota(d.pie || 'Toca todos los que cumplen. Otro toque los quita.');
        return ok => {
          ui.nota('');
          const muestra = fin => { if (L && d.cumple) L.revisa(d.cumple(ui.s.on, p), fin); else { juicio = ok ? ui.s.on : arr(d.sol(p), p); draw(); ui.espera(700, fin); } };
          muestra(() => {
            if (ok) { XS.merge(); if (!juicio) { juicio = ui.s.on; } draw(); return ui.nota(d.bien(p)); }
            XS.nope(); ui.nota(d.aviso(ui.s.on, p));
            ui.espera(2800, () => { const b = { on: arr(d.sol(p), p) }; ui.muestra(b); juicio = b.on; draw(); if (L && d.cumple) L.revisa(d.cumple(b.on, p), () => ui.nota(d.bien(p))); else ui.nota(d.bien(p)); });
          });
        };
      },
    });
  }

  function cartas(name, d) {
    const quedan = (en, p) => perms(p.names).filter(o => [...(p.dadas || []), ...en.filter(i => i != null).map(i => p.cartas[i])].every(x => regla(x.r, o)));
    const combos = p => { const out = [], f = (i, a) => { if (a.length === p.k) { if (quedan(a, p).length === 1) out.push({ en: a }); return; } for (; i < p.cartas.length; i++) f(i + 1, [...a, i]); }; f(0, []); return out; };
    XG.juego(name, {
      cartas: true, quedan, combos,
      ini: p => ({ en: Array(p.k).fill(null) }),
      listo: s => s.en.every(i => i != null),
      ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === p.k && quedan(s.en, p).length === 1,
      sol: p => combos(p)[0],
      texto: p => { const s = combos(p)[0]; return `${s.en.map(i => `«${p.cartas[i].t}»`).join(' y ')}: solo queda ${d.lee(quedan(s.en, p)[0], p)}`; },
      monta(stage, p, ui) {
        stage.innerHTML = '<div class="xg-mundos"></div><div class="xg-casillas"></div><div class="xp-tray xg-frases" data-drop data-tray></div>';
        const [mun, cas, tray] = stage.children, U = perms(p.names);
        if (d.cab) mun.insertAdjacentHTML('beforebegin', `<p class="xg-cab">${d.cab(p)}</p>`);
        mun.innerHTML = U.map((o, i) => `<span data-u="${i}">${d.lee(o, p)}</span>`).join('');
        const vivos = p.dadas ? quedan([], p) : U;
        U.forEach((o, i) => { if (!vivos.includes(o) && !vivos.some(v => v.join() === o.join())) mun.children[i].classList.add('fuera'); });
        const draw = () => {
          cas.innerHTML = ui.s.en.map((i, k) => `<button type="button" class="xp-slot${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="pista ${k + 1}">${i != null ? tex(p.cartas[i].t) : `pista ${k + 1}`}</button>`).join('');
          tray.innerHTML = p.cartas.map((c, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${tex(c.t)}</button>`)).join('');
        };
        const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
        XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
          onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
          onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
        });
        draw(); ui.nota(d.pie);
        const corre = (en, fin) => {
          [...mun.children].forEach((e, i) => { e.classList.remove('tacha', 'queda'); });
          let k = 0;
          (function sig() {
            if (k >= en.length) { const r = quedan(en, p); [...mun.children].forEach((e, i) => { if (r.some(o => o.join() === U[i].join())) e.classList.add('queda'); }); return fin(r.length); }
            const r = quedan(en.slice(0, k + 1), p);
            [...mun.children].forEach((e, i) => { if (!r.some(o => o.join() === U[i].join()) && !e.classList.contains('fuera')) e.classList.add('tacha'); });
            XS.tick(k * 3); k++; ui.espera(900, sig);
          })();
        };
        return ok => {
          tray.hidden = true; ui.nota('');
          corre(ui.s.en, n => {
            if (ok) { XS.merge(); return ui.nota('Queda uno solo: con eso basta.'); }
            XS.nope(); ui.nota(n ? `Todavía quedan ${n} posibles: no basta.` : 'No queda ninguno: esas pistas se contradicen.');
            ui.espera(2800, () => { const s = combos(p)[0]; ui.muestra(s); draw(); corre(s.en, () => ui.nota('Con estas queda uno solo.')); });
          });
        };
      },
    });
  }

  // Tabla de doble entrada, con uno o dos bloques de columnas (cada bloque, tantas columnas como filas).
  function tabla(name, o = {}) {
    const dims = p => ({ n: p.filas.length, m: p.cols.length });
    const ver = (c, p) => { const { m } = dims(p); return (r, k) => c[r * m + k] === 1; };
    const uno = (c, p) => { const { n, m } = dims(p), v = ver(c, p); for (let b = 0; b < m; b += n) for (let i = 0; i < n; i++) { let f = 0, k = 0; for (let j = 0; j < n; j++) { f += v(i, b + j); k += v(j, b + i); } if (f !== 1 || k !== 1) return false; } return true; };
    const cumple = (c, p) => p.pistas.map(x => reglaTb(x.r, ver(c, p), p.filas.length));
    const todas = p => {
      const { n, m } = dims(p), P = perms(Array.from({ length: n }, (_, i) => i)), out = [];
      const f = (b, c) => { if (b >= m) { if (cumple(c, p).every(Boolean)) out.push({ c }); return; } for (const q of P) { const d = [...c]; q.forEach((k, r) => { d[r * m + b + k] = 1; }); f(b + n, d); } };
      f(0, Array(n * m).fill(0)); return out;
    };
    XG.juego(name, {
      tabla: true, todas, cumple, uno,
      ini: p => ({ c: Array(p.filas.length * p.cols.length).fill(0) }),
      listo: (s, p) => s.c.filter(x => x === 1).length === p.cols.length,
      ok: (s, p) => uno(s.c, p) && cumple(s.c, p).every(Boolean),
      sol: p => todas(p)[0],
      texto: p => { const { n, m } = dims(p), v = ver(todas(p)[0].c, p); return p.filas.map((f, r) => `${f}: ${p.cols.filter((_, k) => v(r, k)).join(' y ')}`).join('; '); },
      monta(stage, p, ui) {
        stage.innerHTML = '<div class="xg-lona"></div><div></div>';
        const [box, lis] = stage.children, { n, m } = dims(p), L = pistas(ui, lis, p.pistas);
        let esc = null;
        const monta = s => { esc?.(); esc = XPD.rejilla(box, { f: n, c: m, filas: p.filas, cols: p.cols, estados: 3, rot: ['', '✓', '✗'], unoAUno: true, cw: 62, ch: 42, izq: 62, sobre: m > n ? (K, g) => K.l(g.x(n), g.y(0) - 18, g.x(n), g.y(n), 'lg') : null }, s, { set: x => { if (ui.locked) return; ui.set({ c: x.c }); dice(); }, nota() {} }); };
        const dice = () => { const k = ui.s.c.filter(x => x === 1).length; ui.nota(`${k} de ${m} ✓. Un toque pone ✓, otro ✗ y otro borra.`); };
        monta(ui.s); ui.limpia(() => esc?.()); dice();
        box.addEventListener('keydown', e => { if (!ui.locked && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation(); });
        return ok => {
          box.inert = true; ui.nota('');
          L.revisa(cumple(ui.s.c, p), mala => {
            if (ok) { XS.merge(); return ui.nota('Un ✓ por fila y por columna, y todas las pistas se cumplen.'); }
            XS.nope(); ui.nota(mala >= 0 ? 'Las pistas marcadas no se cumplen.' : 'Hay una fila o una columna con dos ✓.');
            ui.espera(2800, () => { const b = todas(p)[0]; ui.muestra(b); monta(b); L.revisa(cumple(b.c, p), () => ui.nota('Así se cumplen todas.')); });
          });
        };
      },
    });
  }

  return { puestos, marca, cartas, tabla, regla, reglaEq, reglaTb, perms };
})());
