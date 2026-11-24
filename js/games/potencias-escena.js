// Ejercicios de potencias, raíces y estimación con las escenas de la explicación (pu-cm-4; spec 2026-11-24-ejercicios-explora).
// Kit en js/games/explora-kit.js. La escena no dice el resultado mientras se responde; al comprobar ejecuta la respuesta.
//   crece-factor       cuántas rondas de multiplicar por lo mismo hacen falta.        state { e }
//   cuadrado-justo     lado de un cuadrado con un área tantas veces mayor.            state { v }
//   exponentes-justos  poner tres exponentes para que salga el pedido.                state { en }
//   misma-potencia     escribir un número como potencia de dos bases.                 state { a, b }
//   raiz-bandera       estimar una raíz en la recta, en décimas.                      state { v }
//   estima-diez        estimar un producto como a · 10ⁿ.                              state { a, e }
(() => {
  const W = 340, X0 = 20, BW = 300;
  const mil = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const milT = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');

  // ------------------------------------------------------------------------------------------------------ crece-factor
  XG.conPerillas('crece-factor', {
    campos: p => [{ k: 'e', et: 'Rondas', min: 0, max: p.max, ini: 0, lee: v => `${v} ${v === 1 ? 'ronda' : 'rondas'}` }],
    listo: s => s.e > 0,
    ok: (s, p) => p.base ** s.e === p.meta,
    sol: p => ({ e: Math.round(Math.log(p.meta) / Math.log(p.base)) }),
    texto(p) { const e = this.solve(p).e; return `$${Array(e).fill(p.base).join(' \\cdot ')} = ${p.base}^{${e}} = ${p.meta}$`; },
    alto: 130,
    quieta: p => `<g class="xp-tok"><circle cx="40" cy="62" r="15"/><text x="40" y="67">1</text></g><text class="xp-tag" x="190" y="60">× ${p.base} en cada ronda</text><text class="xg-et" x="130" y="84">hasta ${p.meta}</text>`,
    cuadro(s, p, f) {
      const n = Math.max(1, s.e), k = Math.min(s.e, Math.floor(f * n + 0.001)), paso = Math.min(64, 290 / n);
      let h = '';
      for (let i = 0; i <= k; i++) {
        const x = 26 + i * paso, v = p.base ** i, r = Math.min(26, 11 + 2.4 * i);
        if (i) h += `<text class="xg-et xg-cen" x="${x - paso / 2}" y="28">×${p.base}</text><line class="xp-link" x1="${x - paso + 11}" y1="66" x2="${x - 11}" y2="66"/>`;
        h += `<circle class="xp-ring${v === p.meta ? ' good' : ''}" cx="${x}" cy="66" r="${Math.min(r, paso / 2 - 2)}"/><text class="xp-tag" x="${x}" y="${i % 2 && paso < 50 ? 124 : 108}">${mil(v)}</text>`;
      }
      return h;
    },
    ms: 2400,
    lee: (s, p) => `$${p.base}^{${s.e}} = ${milT(p.base ** s.e)}$`,
    aviso: (s, p) => (p.base ** s.e > p.meta ? 'Te pasaste de rondas.' : 'Faltan rondas.'),
    bien: () => 'Cada ronda es un factor más.',
  });

  // ---------------------------------------------------------------------------------------------------- cuadrado-justo
  XG.conPerillas('cuadrado-justo', {
    campos: p => [{ k: 'v', et: 'Lado nuevo', min: 1, max: p.max, ini: 1, cara: v => v * p.lado, lee: v => `${v * p.lado} m` }],
    listo: s => s.v !== 1,
    ok: (s, p) => s.v * s.v === p.veces,
    sol: p => ({ v: Math.sqrt(p.veces) }),
    texto: p => `El lado se multiplica por $\\sqrt{${p.veces}} = ${Math.sqrt(p.veces)}$: $${p.lado * Math.sqrt(p.veces)}$ m, y $${p.lado * Math.sqrt(p.veces)}^2 = ${p.veces} \\cdot ${p.lado * p.lado}$`,
    alto: 176,
    quieta: p => `<rect class="xb-fill" x="150" y="80" width="26" height="26" rx="3"/><text class="xp-tag" x="163" y="72">lado ${p.lado} m</text><text class="xg-et xg-cen" x="170" y="132">el área debe ser ${p.veces} veces esta</text>`,
    cuadro(s, p, f) {
      const n = s.v, g = Math.sqrt(p.veces), c = Math.min(26, 150 / Math.max(1, n)), x0 = 170 - n * c / 2, y0 = 12, k = Math.ceil(n), tot = Math.floor(f * k * k);
      let h = `<rect class="xb-out" x="${x0}" y="${y0}" width="${n * c}" height="${n * c}"/>`;
      for (let i = 0; i < tot; i++) { const a = i % k, b = Math.floor(i / k), w = Math.min(1, n - a), q = Math.min(1, n - b); if (w > 0 && q > 0) h += `<rect class="xb-fill${i ? ' b' : ''}" x="${x0 + a * c + 0.6}" y="${y0 + b * c + 0.6}" width="${Math.max(0, w * c - 1.2)}" height="${Math.max(0, q * c - 1.2)}" rx="2"/>`; }
      if (f >= 1 && n !== g) h += `<rect class="xg-marca" fill="none" x="${x0}" y="${y0}" width="${Math.min(150, g * c)}" height="${Math.min(150, g * c)}"/>`;   // el que se pedía
      return h;
    },
    ms: 1800,
    lee: (s, p) => `$${s.v * p.lado}^2 = ${(s.v * p.lado) ** 2} \\qquad ${p.veces} \\cdot ${p.lado}^2 = ${p.veces * p.lado * p.lado}$`,
    aviso: (s, p) => (s.v === p.veces ? 'Multiplicaste el lado: el área creció muchísimo más.' : s.v * s.v > p.veces ? 'El área se pasa.' : 'Al área le falta.'),
    bien: () => 'El lado crece con la raíz de las veces.',
  });

  // -------------------------------------------------------------------------------------------------- exponentes-justos
  const val = (en, p) => p.cartas[en[0]] * p.cartas[en[1]] + p.cartas[en[2]];
  XG.juego('exponentes-justos', {
    ini: () => ({ en: [null, null, null] }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === 3 && val(s.en, p) === p.meta,
    sol(p) { const n = p.cartas.length; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) if (a !== b && b !== c && a !== c && val([a, b, c], p) === p.meta) return { en: [a, b, c] }; return null; },
    texto(p) { const [a, b, c] = this.solve(p).en.map(i => p.cartas[i]); return `Por ejemplo, $(${p.base}^{${a}})^{${b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${a * b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${p.meta}}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-exp"></div><div class="xg-cadena"></div><div class="xp-tray" data-drop data-tray></div>';
      const [ex, cad, tray] = stage.children;
      const draw = () => {
        const sl = k => `<button type="button" class="xp-slot${ui.s.en[k] != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="exponente ${k + 1}">${ui.s.en[k] != null ? p.cartas[ui.s.en[k]] : ''}</button>`;
        ex.innerHTML = `<span class="xg-gr"><i>(</i><b>${p.base}</b>${sl(0)}<i>)</i>${sl(1)}</span><i>·</i><span class="xg-gr"><b>${p.base}</b>${sl(2)}</span><i>=</i><span class="xg-gr xg-meta"><b>${p.base}</b><sup>${p.meta}</sup></span>`;
        tray.innerHTML = p.cartas.map((c, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${c}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      draw(); ui.nota('Arrastra un número a cada exponente.');
      // Escribe los factores: los grupos de adentro y, aparte, los de la otra potencia.
      const corre = (en, fin) => {
        const [a, b, c] = en.map(i => p.cartas[i]), total = a * b + c;
        let k = 0; cad.innerHTML = '';
        (function factor() {
          if (k < total) {
            const g = k < a * b ? Math.floor(k / a) % 2 : 2;
            if (k && (k === a * b || (k < a * b && k % a === 0))) cad.insertAdjacentHTML('beforeend', '<span class="xg-sep"></span>');
            cad.insertAdjacentHTML('beforeend', `<span class="xg-fac xg-mini par${g === 1 ? 1 : 0}${g === 2 ? ' solo' : ''}">${p.base}</span>`);
            k++; XS.hop(k % 8); return ui.espera(110, factor);
          }
          ui.lee(`$(${p.base}^{${a}})^{${b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${a} \\cdot ${b} + ${c}} = ${p.base}^{${total}}$`); fin(total);
        })();
      };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, t => {
          if (ok) return ui.nota(`${t} factores en total.`);
          ui.nota(ui.s.en.reduce((x, i) => x + p.cartas[i], 0) === p.meta ? `Sumaste los tres. Los grupos se multiplican: son ${t} factores.` : `Son ${t} factores, no ${p.meta}.`);
          ui.espera(2400, () => { const s = GAMES['exponentes-justos'].solve(p); ui.muestra(s); draw(); tray.hidden = true; ui.lee(''); corre(s.en, () => ui.nota('Así sí.')); });
        });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- misma-potencia
  XG.conPerillas('misma-potencia', {
    campos: p => [{ k: 'a', et: `Exponente del ${p.bases[0]}`, min: 1, max: p.max, ini: 1, lee: () => '' }, { k: 'b', et: `Exponente del ${p.bases[1]}`, min: 1, max: p.max, ini: 1, lee: () => '' }],
    listo: s => s.a > 1 || s.b > 1,
    ok: (s, p) => p.bases[0] ** s.a === p.meta && p.bases[1] ** s.b === p.meta,
    sol: p => ({ a: Math.round(Math.log(p.meta) / Math.log(p.bases[0])), b: Math.round(Math.log(p.meta) / Math.log(p.bases[1])) }),
    texto(p) { const s = this.solve(p); return `$${p.meta} = ${p.bases[0]}^{${s.a}} = ${p.bases[1]}^{${s.b}}$`; },
    alto: 118,
    quieta: p => `<text class="xp-tag xg-gr2" x="170" y="66">${mil(p.meta)}</text>`,
    cuadro(s, p, f) {
      const fila = (y, base, e, cls) => { const n = Math.floor(f * e + 0.001), w = Math.min(34, 280 / e), x0 = 170 - e * w / 2; let h = ''; for (let i = 0; i < n; i++) h += `<rect class="xg-lote ${cls}" x="${x0 + i * w + 1.5}" y="${y}" width="${w - 3}" height="30" rx="6"/><text class="xp-tag" x="${x0 + (i + 0.5) * w}" y="${y + 20}">${base}</text>`; return h; };
      return fila(16, p.bases[0], s.a, 'on2') + fila(70, p.bases[1], s.b, 'de');
    },
    ms: 1600,
    lee: (s, p) => `$${p.bases[0]}^{${s.a}} = ${milT(p.bases[0] ** s.a)} \\qquad ${p.bases[1]}^{${s.b}} = ${milT(p.bases[1] ** s.b)}$`,
    aviso: (s, p) => { const x = p.bases[0] ** s.a === p.meta, y = p.bases[1] ** s.b === p.meta; return x || y ? `La del ${x ? p.bases[0] : p.bases[1]} sí; la del ${x ? p.bases[1] : p.bases[0]} no da ${p.meta}.` : `Ninguna da ${p.meta}.`; },
    bien: p => 'El mismo número, con factores más grandes o más pequeños.',
  });

  // ------------------------------------------------------------------------------------------------------ raiz-bandera
  XG.conPerillas('raiz-bandera', {
    campos: p => [{ k: 'v', et: 'Tu estimación', min: p.min * 10, max: p.max * 10, ini: p.min * 10, cara: v => v / 10, lee: v => `${(v / 10).toFixed(1)}` }],
    listo: (s, p) => s.v !== p.min * 10,
    ok: (s, p) => Math.abs(s.v / 10 - Math.sqrt(p.n)) <= p.tol,
    sol: p => ({ v: Math.round(10 * Math.sqrt(p.n)) }),
    texto: p => `$\\sqrt{${p.n}} \\approx ${Math.round(10 * Math.sqrt(p.n)) / 10}$`,
    alto: 128,
    quieta: p => { let h = `<line class="xp-ax" x1="20" y1="84" x2="320" y2="84"/>`; for (let v = p.min; v <= p.max; v++) { const x = X0 + BW * (v - p.min) / (p.max - p.min); h += `<line class="xp-tk z" x1="${x}" y1="78" x2="${x}" y2="90"/><text class="xp-lb z" x="${x}" y="110">${v}</text>`; } return h; },
    cuadro(s, p, f) {
      const X = v => X0 + BW * (v - p.min) / (p.max - p.min), v = s.v / 10, r = Math.sqrt(p.n);
      let h = this.quieta(p);
      for (let k = p.min; k <= p.max; k++) h += `<text class="xg-et xg-cen" x="${X(k)}" y="${66}">${k * k}</text>`;
      h += `<g class="xp-tok"><circle cx="${X(p.min + (v - p.min) * Math.min(1, f * 1.4))}" cy="84" r="9"/></g>`;
      if (f >= 1) h += `<line class="xg-marca" x1="${X(r)}" y1="30" x2="${X(r)}" y2="94"/><text class="xp-tag xg-ok" x="${X(r)}" y="24">área ${p.n}</text>`;
      return h;
    },
    ms: 1400,
    lee: (s, p) => `$${s.v / 10}^2 = ${Math.round(s.v * s.v) / 100}$`,
    aviso: (s, p) => (s.v / 10 > Math.sqrt(p.n) ? `Un cuadrado de ese lado tiene más de ${p.n}.` : `Un cuadrado de ese lado tiene menos de ${p.n}.`),
    bien: (s, p) => `El cuadrado de ese lado queda muy cerca de ${p.n}.`,
  });

  // ------------------------------------------------------------------------------------------------------- estima-diez
  XG.conPerillas('estima-diez', {
    campos: p => [{ k: 'a', et: 'Primera cifra', min: 1, max: 9, ini: 1, lee: () => '' }, { k: 'e', et: 'Ceros', min: 0, max: 6, ini: 0, lee: v => `${v} ${v === 1 ? 'cero' : 'ceros'}` }],
    listo: s => s.e > 0,
    ok: (s, p) => s.a === p.a && s.e === p.e,
    sol: p => ({ a: p.a, e: p.e }),
    texto: p => `$${p.redondo.join(' \\cdot ')} = ${milT(p.a * 10 ** p.e)} = ${p.a} \\cdot 10^{${p.e}}$ (exacto: $${milT(p.x * p.y)}$)`,
    alto: 112,
    quieta: p => `<text class="xp-tag xg-gr2" x="170" y="66">${p.x} × ${p.y}</text>`,
    cuadro(s, p, f) {
      const v = s.a * 10 ** s.e, r = p.x * p.y, L = x => Math.max(1, 300 * x / Math.max(v, r));   // a escala: un cero de más se nota
      return `<rect class="xb-fill b" x="20" y="22" width="${L(r) * f}" height="24" rx="5"/><text class="xg-et" x="20" y="16">${p.x} × ${p.y} = ${mil(r)}</text><rect class="xb-fill" x="20" y="64" width="${L(v) * f}" height="24" rx="5"/><text class="xg-et" x="20" y="60">tu estimación: ${mil(v)}</text>`;
    },
    ms: 1300,
    aviso: (s, p) => (s.e !== p.e && s.a === p.a ? `La cifra sí, pero con ${s.e > p.e ? 'más' : 'menos'} ceros de los que van.` : s.e === p.e ? 'Los ceros sí; la primera cifra no.' : 'Redondea cada número a una cifra y cuenta los ceros de los dos.'),
    bien: () => 'Se multiplican las cifras y se cuentan los ceros.',
  });
})();
