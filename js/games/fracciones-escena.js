// Ejercicios de fracciones con la escena de barras de la explicación (pu-cm-2; spec 2026-11-24-ejercicios-explora). Kit en
// js/games/explora-kit.js. Mientras se responde no se dibuja la barra de la respuesta; al comprobar se dibuja y se compara.
//   corta-iguales     correr los cortes hasta que las partes sean iguales y tomar las que se piden.   state { c: [cortes], t: [partes tomadas] }
//   fraccion-gemela   armar una fracción que mida lo mismo, con más partes.                           state { n, d }
//   entre-fracciones  armar una fracción que caiga entre dos.                                         state { n, d }
//   piezas-exactas    escoger tres pedazos que llenen justo lo pedido.                                 state { en: [pieza | null] }
//   resta-falta       armar lo que salió para que quede lo que quedó.                                 state { n, d }
//   parte-de-parte    marcar en un terreno una parte de otra parte.                                   state { w, h }
//   total-escondido   de una parte, reconstruir el total.                                             state { parte, n }
(() => {
  const tf = (n, d) => (d === 1 ? `${n}` : `\\tfrac{${n}}{${d}}`);
  const W = 340, X0 = 20, BW = 300;
  // Barra cortada en d partes con n llenas (la escena «barras»). f: fracción llena si va a medias de una animación.
  const barra = (y, h, n, d, o = {}) => {
    const x = o.x ?? X0, w = o.w ?? BW, f = o.f ?? n / d;
    let s = `<rect class="xb-out" x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>`;
    if (f > 0) s += `<rect class="xb-fill ${o.cls || ''}" x="${x}" y="${y}" width="${w * Math.min(1, f)}" height="${h}" rx="7"/>`;
    if (d <= 30) for (let k = 1; k < d; k++) s += `<line class="xb-cut" x1="${x + w * k / d}" y1="${y}" x2="${x + w * k / d}" y2="${y + h}"/>`;
    if (o.et) s += `<text class="xp-tag" x="${x + w / 2}" y="${y - 8}">${o.et}</text>`;
    return s;
  };
  const lienzo = (box, alto) => { box.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Barras de fracciones"></svg>`; return box.firstChild; };
  // Dos perillas: arriba y abajo de la fracción que se arma; el renglón la escribe.
  function armaFraccion(ui, box, max) {
    const lee = () => ui.lee(ui.s.n ? `$\\dfrac{${ui.s.n}}{${ui.s.d}}$` : '');
    const a = XG.perilla(ui, box, { et: 'Numerador', min: 0, max, v: 0, lee: () => '', on: n => { ui.set({ ...ui.s, n }); lee(); } });
    const b = XG.perilla(ui, box, { et: 'Denominador', min: 1, max, v: 1, lee: () => '', on: d => { ui.set({ ...ui.s, d }); lee(); } });
    return { pon(n, d) { a.set(n); b.set(d); ui.lee(`$\\dfrac{${n}}{${d}}$`); } };
  }
  const iniF = () => ({ n: 0, d: 1 });
  const busca = (max, f) => { for (let d = 1; d <= max; d++) for (let n = 1; n <= max; n++) if (f(n, d)) return { n, d }; return null; };
  const igual = (n, d, [a, b]) => n * b === a * d;

  // ---------------------------------------------------------------------------------------------------- corta-iguales
  const partes = (s, p) => { const c = [0, ...s.c, p.ticks]; return c.slice(1).map((x, i) => x - c[i]); };
  XG.juego('corta-iguales', {
    ini: p => ({ c: [...p.ini], t: Array(p.n).fill(false) }),
    listo: s => s.t.some(Boolean),
    ok: (s, p) => partes(s, p).every(x => x === p.ticks / p.n) && s.t.filter(Boolean).length === p.toma,
    sol: p => ({ c: p.ini.map((_, i) => (i + 1) * p.ticks / p.n), t: Array.from({ length: p.n }, (_, i) => i < p.toma) }),
    texto: p => `${p.n} partes iguales de ${p.ticks / p.n} cm y ${p.toma} tomadas: $${tf(p.toma, p.n)}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-libre"></div>';
      const svg = lienzo(stage.firstChild, 150), X = v => X0 + v / p.ticks * BW, Y = 44, H = 52;
      let arr = -1, dedo = null, mal = false;
      const draw = () => {
        const c = [0, ...ui.s.c, p.ticks], bien = p.ticks / p.n;
        let h = `<rect class="xb-out" x="${X0}" y="${Y}" width="${BW}" height="${H}" rx="7"/>`;
        ui.s.t.forEach((t, i) => {
          h += `<rect class="${t ? 'xb-fill' : 'xg-hueco'}${mal && c[i + 1] - c[i] !== bien ? ' bad' : ''}" x="${X(c[i]) + 1}" y="${Y}" width="${X(c[i + 1]) - X(c[i]) - 2}" height="${H}" rx="5" data-p="${i}" role="button" tabindex="${ui.locked ? -1 : 0}" aria-pressed="${t}" aria-label="Parte ${i + 1}"/>`;
          if (ui.locked) h += `<text class="xp-tag${t ? ' xg-sobre' : ''}" x="${(X(c[i]) + X(c[i + 1])) / 2}" y="${Y + 32}">${c[i + 1] - c[i]}</text>`;
        });
        for (let k = 0; k <= p.ticks; k++) h += `<line class="xb-tk" x1="${X(k)}" y1="${Y + H + 6}" x2="${X(k)}" y2="${Y + H + (k % 5 ? 11 : 15)}"/>`;
        ui.s.c.forEach((v, i) => { h += `<g class="xg-corte${i === arr ? ' on' : ''}" tabindex="${ui.locked ? -1 : 0}" role="slider" aria-label="Corte ${i + 1}" aria-valuemin="1" aria-valuemax="${p.ticks - 1}" aria-valuenow="${v}" data-c="${i}"><line x1="${X(v)}" y1="${Y - 14}" x2="${X(v)}" y2="${Y + H + 6}"/><circle cx="${X(v)}" cy="${Y - 18}" r="11"/><path d="M${X(v) - 4} ${Y - 18} h8"/></g>`; });
        svg.innerHTML = h;
      };
      const pon = (i, v) => {
        const c = ui.s.c, lo = (c[i - 1] ?? 0) + 1, hi = (c[i + 1] ?? p.ticks) - 1;
        v = XG.clamp(v, lo, hi);
        if (v === c[i]) return;
        ui.set({ ...ui.s, c: c.map((x, k) => (k === i ? v : x)) }); XS.tick(v); xpTick(); draw();
      };
      const toma = i => { ui.set({ ...ui.s, t: ui.s.t.map((t, k) => (k === i ? !t : t)) }); XS.pop(); xpTick(); draw(); };
      const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * 150 / r.height]; };
      svg.onpointerdown = e => {
        if (ui.locked || dedo != null) return;
        const [x, y] = at(e);
        const corte = e.target.closest?.('[data-c]');
        if (y > Y - 2 && !corte) {   // tocar una parte la toma o la suelta
          const b = e.target.closest?.('[data-p]');
          if (b) toma(+b.dataset.p);
          return;
        }
        arr = corte ? +corte.dataset.c : ui.s.c.reduce((m, v, i) => (Math.abs(X(v) - x) < Math.abs(X(ui.s.c[m]) - x) ? i : m), 0);
        if (!corte && Math.abs(X(ui.s.c[arr]) - x) > 24) { arr = -1; return; }
        dedo = e.pointerId;
        try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ }
        draw();
      };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) pon(arr, Math.round((at(e)[0] - X0) / BW * p.ticks)); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) { dedo = null; arr = -1; draw(); } };
      svg.onkeydown = e => {
        const b = e.target.closest('[data-p]');
        if (b && !ui.locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); const i = +b.dataset.p; toma(i); svg.querySelector(`[data-p="${i}"]`)?.focus({ preventScroll: true }); return; }
        const g = e.target.closest('[data-c]'), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!g || !k || ui.locked) return;
        e.preventDefault(); e.stopPropagation();
        const i = +g.dataset.c; pon(i, ui.s.c[i] + k); svg.querySelector(`[data-c="${i}"]`)?.focus({ preventScroll: true });
      };
      draw(); ui.nota('Arrastra las manijas de arriba. Toca una parte para tomarla.');
      return ok => {
        mal = !ok; draw();
        const tam = partes(ui.s, p), par = tam.every(x => x === tam[0]);
        ui.nota(ok ? 'Todas miden lo mismo: ahora sí tiene nombre.' : !par ? `Las partes miden ${tam.join(', ')} cm: no son iguales.` : 'Son iguales, pero no tomaste las que se pedían.');
        if (!ok) ui.espera(2600, () => { ui.muestra(GAMES['corta-iguales'].solve(p)); mal = false; XS.merge(); draw(); });
        else ui.lee(`$${tf(p.toma, p.n)}$`);
      };
    },
  });

  // -------------------------------------------------------------------------------------------------- fraccion-gemela
  XG.juego('fraccion-gemela', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.d > p.a[1] && s.n > 0 && igual(s.n, s.d, p.a),
    sol: p => busca(p.max, (n, d) => d > p.a[1] && igual(n, d, p.a)),
    texto(p) { const s = this.solve(p); return `Por ejemplo, $${tf(p.a[0], p.a[1])} = ${tf(s.n, s.d)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 126), arma = (n, d, f) => { svg.innerHTML = barra(22, 36, ...p.a, { et: p.a.join('/') }) + (n ? barra(78, 36, n, d, { f, cls: 'b' }) : `<rect class="xg-tapada" x="${X0}" y="78" width="${BW}" height="36" rx="7"/><text class="xp-tag" x="170" y="102">?</text>`); };
      arma();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('Tu barra se dibuja al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, n / d, 1100, f => arma(n, d, f), fin);
      return ok => {
        const { n, d } = ui.s;
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota(`Termina en el mismo punto, con ${d} partes más pequeñas.`);
          ui.nota(igual(n, d, p.a) ? `Mide lo mismo, pero ${d} no es más de ${p.a[1]}.` : n > d ? 'La tuya pasa de la barra entera.' : n / d > p.a[0] / p.a[1] ? 'La tuya es más larga.' : 'La tuya es más corta.');
          ui.espera(2000, () => { const s = GAMES['fraccion-gemela'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta sí termina en el mismo punto.')); });
        });
      };
    },
  });

  // ------------------------------------------------------------------------------------------------- entre-fracciones
  XG.juego('entre-fracciones', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.n * p.lo[1] > p.lo[0] * s.d && s.n * p.hi[1] < p.hi[0] * s.d,
    sol: p => busca(p.max, (n, d) => n * p.lo[1] > p.lo[0] * d && n * p.hi[1] < p.hi[0] * d),
    texto(p) { const s = this.solve(p); return `Por ejemplo, $${tf(...p.lo)} < ${tf(s.n, s.d)} < ${tf(...p.hi)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 118), Y = 74, X = v => X0 + Math.min(1.05, v) * BW;
      const pinta = (m = '') => {
        let h = `<rect class="xg-franja" x="${X(p.lo[0] / p.lo[1])}" y="${Y - 30}" width="${X(p.hi[0] / p.hi[1]) - X(p.lo[0] / p.lo[1])}" height="38" rx="4"/><line class="xp-ax" x1="${X0}" y1="${Y}" x2="${X0 + BW}" y2="${Y}"/>`;
        for (const [v, t] of [[0, '0'], [1, '1']]) h += `<line class="xp-tk z" x1="${X(v)}" y1="${Y - 6}" x2="${X(v)}" y2="${Y + 6}"/><text class="xp-lb z" x="${X(v)}" y="${Y + 24}">${t}</text>`;
        [p.lo, p.hi].forEach((f, k) => { h += `<line class="xg-hilo" x1="${X(f[0] / f[1])}" y1="${Y - 34}" x2="${X(f[0] / f[1])}" y2="${Y + 8}"/><text class="xp-tag" x="${X(f[0] / f[1]) + (k ? 12 : -12)}" y="${Y - 42}">${f.join('/')}</text>`; });
        svg.innerHTML = h + m;
      };
      pinta();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('Tu fracción cae en la recta al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, Math.min(1.05, n / d), 1200, v => pinta(`<line class="xp-trail" x1="${X0}" y1="${Y}" x2="${X(v)}" y2="${Y}"/><g class="xp-tok"><circle cx="${X(v)}" cy="${Y}" r="9"/></g>`), fin);
      return ok => {
        const { n, d } = ui.s, v = n / d, a = p.lo[0] / p.lo[1], b = p.hi[0] / p.hi[1];
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota('Cae entre las dos.');
          ui.nota(v === a || v === b ? 'Vale lo mismo que una de las dos: no queda en medio.' : v < a ? `Queda antes de ${p.lo.join('/')}.` : v > 1 ? 'Pasa del 1.' : `Queda después de ${p.hi.join('/')}.`);
          ui.espera(2000, () => { const s = GAMES['entre-fracciones'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta sí cae entre las dos.')); });
        });
      };
    },
  });

  // --------------------------------------------------------------------------------------------------- piezas-exactas
  const suma = (en, p) => en.reduce((t, i) => t + p.den * p.piezas[i][0] / p.piezas[i][1], 0);   // en partes de 1/den
  XG.juego('piezas-exactas', {
    ini: p => ({ en: Array(p.k).fill(null) }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === p.k && suma(s.en, p) === p.den * p.meta[0] / p.meta[1],
    sol(p) {
      const n = p.piezas.length;
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) if (suma([a, b, c], p) === p.den * p.meta[0] / p.meta[1]) return { en: [a, b, c] };
      return null;
    },
    texto(p) { return `$${this.solve(p).en.map(i => tf(...p.piezas[i])).join(' + ')} = ${tf(...p.meta)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
      const [lona, frase, tray] = stage.children, svg = lienzo(lona, 92), Y = 34, H = 42, BW = 280, xm = X0 + BW * p.meta[0] / p.meta[1];
      const pinta = (m = '') => { svg.innerHTML = `<rect class="xb-out" x="${X0}" y="${Y}" width="${BW}" height="${H}" rx="7"/>${m}<line class="xg-marca" x1="${xm}" y1="${Y - 10}" x2="${xm}" y2="${Y + H + 8}"/><text class="xp-tag xg-ok" x="${xm - 4}" y="${Y - 14}">${p.meta.join('/')}</text>`; };
      const cara = i => tex(`$${tf(...p.piezas[i])}$`);
      const draw = () => {
        frase.innerHTML = ui.s.en.map((i, k) => `${k ? '<span>+</span>' : ''}<button type="button" class="xp-slot xg-ch${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? cara(i) : ''}</button>`).join('');
        tray.innerHTML = p.piezas.map((_, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${cara(i)}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      pinta(); draw(); ui.nota('Los pedazos se ponen en la barra al comprobar.');
      const corre = (en, fin) => {
        let x = 0, h = '', k = 0;
        (function pieza() {
          if (k >= en.length) return fin(x);
          const [a, b] = p.piezas[en[k]], w = a / b, x0 = x, cls = ['', ' b', ' c'][k % 3];
          const r = (f, t) => `<rect class="xb-fill xg-pz${cls}" x="${X0 + x0 * BW}" y="${Y}" width="${Math.max(0, BW * f - 2)}" height="${H}" rx="5"/>${t ? `<text class="xp-tag xg-sobre" x="${X0 + (x0 + w / 2) * BW}" y="${Y + 27}">${a}/${b}</text>` : ''}`;
          ui.tween(0, w, 650, f => pinta(h + r(f)), () => { h += r(w, true); x += w; k++; XS.hop(k * 2); pinta(h); ui.espera(250, pieza); });
        })();
      };
      // Con la marca por denominador si todas caben; si no, con uno más fino.
      const cuenta = en => { const d = en.every(i => p.meta[1] % p.piezas[i][1] === 0) ? p.meta[1] : p.den; ui.lee(`$${en.map(i => tf(d * p.piezas[i][0] / p.piezas[i][1], d)).join(' + ')} = ${tf(suma(en, p) * d / p.den, d)}$`); };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, x => {
          cuenta(ui.s.en);
          if (ok) return ui.nota('Justo hasta la marca.');
          ui.nota(x > p.meta[0] / p.meta[1] ? 'Se pasa de la marca.' : 'No alcanza la marca.');
          ui.espera(2000, () => { const s = GAMES['piezas-exactas'].solve(p); ui.muestra(s); draw(); tray.hidden = true; ui.lee(''); corre(s.en, () => { cuenta(s.en); ui.nota('Estas tres sí.'); }); });
        });
      };
    },
  });

  // ------------------------------------------------------------------------------------------------------ resta-falta
  XG.juego('resta-falta', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.n > 0 && (p.de[0] * s.d - s.n * p.de[1]) * p.queda[1] === p.queda[0] * p.de[1] * s.d,
    sol: p => busca(p.max, (n, d) => (p.de[0] * d - n * p.de[1]) * p.queda[1] === p.queda[0] * p.de[1] * d),
    texto(p) { const s = this.solve(p); return `$${tf(...p.de)} - ${tf(s.n, s.d)} = ${tf(...p.queda)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 140), y = 26;
      const pinta = (quita = 0) => {
        const a = p.de[0] / p.de[1], q = p.queda[0] / p.queda[1], v = Math.max(0, a - quita);
        svg.innerHTML = barra(y, 34, 0, 1, { f: v, et: `antes: ${p.de.join('/')}` }) + (quita ? `<rect class="xg-quita" x="${X0 + BW * v}" y="${y}" width="${BW * (a - v)}" height="34" rx="4"/>` : '')
          + barra(96, 34, ...p.queda, { et: `después: ${p.queda.join('/')}`, cls: 'b' }) + `<line class="xg-hilo" x1="${X0 + BW * q}" y1="${y - 4}" x2="${X0 + BW * q}" y2="130"/>`;
      };
      pinta();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('El gasto se descuenta al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, n / d, 1200, pinta, fin);
      return ok => {
        const { n, d } = ui.s, queda = p.de[0] / p.de[1] - n / d, q = p.queda[0] / p.queda[1];
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota('Queda justo lo que marca ahora.');
          ui.nota(queda > q ? `Así quedaría más de ${p.queda.join('/')}: se gastó más.` : queda < 0 ? 'Es más de lo que había en el tanque.' : `Así quedaría menos de ${p.queda.join('/')}: se gastó menos.`);
          ui.espera(2000, () => { const s = GAMES['resta-falta'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta es.')); });
        });
      };
    },
  });

  // --------------------------------------------------------------------------------------------------- parte-de-parte
  const celdas = p => p.cols * p.filas * p.de[0] * p.parte[0] / (p.de[1] * p.parte[1]);
  XG.juego('parte-de-parte', {
    ini: () => ({ w: 0, h: 0 }),
    listo: s => s.w > 0 && s.h > 0,
    ok: (s, p) => s.w * s.h === celdas(p),
    sol: p => ({ w: p.cols * p.de[0] / p.de[1], h: p.filas * p.parte[0] / p.parte[1] }),
    texto: p => `$${tf(...p.parte)} \\cdot ${tf(...p.de)} = ${tf(p.de[0] * p.parte[0], p.de[1] * p.parte[1])}$: ${celdas(p)} de los ${p.cols * p.filas} lotes`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-libre"></div>';
      const C = 40, H = p.filas * C + 12, x0 = (W - p.cols * C) / 2, svg = lienzo(stage.firstChild, H);
      let dedo = null, guia = 0, tocado = false;
      const draw = () => {
        let h = '';
        for (let f = 0; f < p.filas; f++) for (let c = 0; c < p.cols; c++) h += `<rect class="xg-lote${guia && c < p.cols * p.de[0] / p.de[1] ? ' de' : ''}" x="${x0 + c * C + 1.5}" y="${6 + f * C + 1.5}" width="${C - 3}" height="${C - 3}" rx="6"/>`;
        if (ui.s.w) h += `<rect class="xg-siembra${guia === 2 ? ' good' : ''}" x="${x0 + 1.5}" y="7.5" width="${ui.s.w * C - 3}" height="${ui.s.h * C - 3}" rx="7"/>`;
        const ex = x0 + Math.max(0.5, ui.s.w) * C, ey = 6 + Math.max(0.5, ui.s.h) * C;
        if (!ui.locked) h += (tocado ? '' : `<circle class="xp-halo" cx="${ex}" cy="${ey}" r="11"/>`) + `<g class="xp-tok"><circle cx="${ex}" cy="${ey}" r="10"/></g>`;
        svg.innerHTML = h;
      };
      const pon = (w, h) => { w = XG.clamp(w, 1, p.cols); h = XG.clamp(h, 1, p.filas); tocado = true; if (w !== ui.s.w || h !== ui.s.h) { ui.set({ w, h }); XS.tick(w * h % 9); xpTick(); svg.setAttribute('aria-valuenow', w * h); } draw(); };
      const mueve = e => { const r = svg.getBoundingClientRect(); pon(Math.round(((e.clientX - r.left) * W / r.width - x0) / C), Math.round(((e.clientY - r.top) * H / r.height - 6) / C)); };
      svg.setAttribute('tabindex', '0'); svg.setAttribute('role', 'slider'); svg.setAttribute('aria-label', 'Terreno: mueve la esquina con las flechas'); svg.setAttribute('aria-valuemin', '0'); svg.setAttribute('aria-valuemax', p.cols * p.filas); svg.setAttribute('aria-valuenow', '0');
      svg.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mueve(e); };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) mueve(e); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      svg.onkeydown = e => {
        const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key];
        if (!k || ui.locked) return;
        e.preventDefault(); e.stopPropagation(); pon(ui.s.w + k[0], ui.s.h + k[1]);
      };
      draw(); ui.nota('Arrastra la esquina para marcar los lotes.');
      return ok => {
        const n = ui.s.w * ui.s.h;
        ui.lee(`$${n}\\text{ de }${p.cols * p.filas}$`);
        ui.nota(ok ? 'Justo esa parte del terreno.' : `Marcaste ${n} de ${p.cols * p.filas} lotes.`);
        guia = ok ? 2 : 0; draw();
        if (!ok) ui.espera(1800, () => {
          guia = 1; draw(); XS.pop(); ui.nota('Primero, lo sembrado.');
          ui.espera(1600, () => { ui.muestra(GAMES['parte-de-parte'].solve(p)); guia = 2; XS.merge(); draw(); ui.nota('Después, la parte de eso.'); ui.lee(`$${celdas(p)}\\text{ de }${p.cols * p.filas}$`); });
        });
      };
    },
  });

  // -------------------------------------------------------------------------------------------------- total-escondido
  XG.juego('total-escondido', {
    ini: () => ({ parte: 1, n: 1 }),
    listo: s => s.n > 1 && s.parte > 1,
    ok: (s, p) => s.n === p.frac[1] && s.parte * p.frac[0] === p.vale,
    sol: p => ({ n: p.frac[1], parte: p.vale / p.frac[0] }),
    texto: p => `Cada parte vale $${p.vale} \\div ${p.frac[0]} = ${p.vale / p.frac[0]}$ y son ${p.frac[1]} partes: $${p.vale / p.frac[0] * p.frac[1]}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 104), Y = 36;
      const pinta = (parte, n, f = 1) => {
        const w = Math.min(44, BW / Math.max(n, 1)), x = X0 + (BW - w * n) / 2;
        let h = `<text class="xp-tag" x="170" y="18">${p.frac.join('/')} del total = ${p.vale}</text>`;
        for (let k = 0; k < n * f; k++) h += `<rect class="${k < p.frac[0] ? 'xb-fill' : 'xb-out'}" x="${x + k * w + 1}" y="${Y}" width="${w - 2}" height="38" rx="5"/>` + (parte ? `<text class="xp-tag${k < p.frac[0] ? ' xg-sobre' : ''}" x="${x + (k + 0.5) * w}" y="${Y + 25}">${parte}</text>` : '');
        if (!n) h += `<rect class="xg-tapada" x="${X0}" y="${Y}" width="${BW}" height="38" rx="7"/><text class="xp-tag" x="170" y="${Y + 25}">?</text>`;
        svg.innerHTML = h;
      };
      pinta(0, 0);
      const pa = XG.perilla(ui, stage.lastChild, { et: 'Cada parte vale', min: 1, max: 12, v: 1, lee: () => '', on: parte => ui.set({ ...ui.s, parte }) });
      const pb = XG.perilla(ui, stage.lastChild, { et: 'Partes del total', min: 1, max: 10, v: 1, lee: () => '', on: n => ui.set({ ...ui.s, n }) });
      ui.nota('Decide en cuántas partes va el total y cuánto vale cada una.');
      const corre = (parte, n, fin) => ui.tween(0, 1, 250 * n, f => pinta(parte, n, f), () => { pinta(parte, n); ui.lee(`$${n < p.frac[0] ? '' : `${p.frac[0]} \\cdot ${parte} = ${p.frac[0] * parte} \\quad `}${n} \\cdot ${parte} = ${n * parte}$`); fin(); });
      return ok => {
        const { parte, n } = ui.s;
        ui.nota('');
        corre(parte, n, () => {
          if (ok) return ui.nota('De la parte al total: primero una parte, después todas.');
          ui.nota(n !== p.frac[1] ? `El total no va en ${n} partes: mira el denominador.` : `${p.frac[0]} partes de ${parte} no suman ${p.vale}.`);
          ui.espera(2200, () => { const s = GAMES['total-escondido'].solve(p); pa.set(s.parte); pb.set(s.n); corre(s.parte, s.n, () => ui.nota('Así sí cuadra.')); });
        });
      };
    },
  });
})();
