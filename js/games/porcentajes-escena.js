// Ejercicios de decimales y porcentajes con las escenas de la explicación (pu-cm-3; spec 2026-11-24-ejercicios-explora). Kit en
// js/games/explora-kit.js. La escena no dice el resultado mientras se responde; al comprobar ejecuta la respuesta.
//   rejilla-otra        pintar un porcentaje en una rejilla que no es de 100.            state { k }
//   que-porcentaje      decir qué porcentaje es una parte.                               state { v } (de 5 en 5)
//   pedazos-porciento   escoger tres pedazos del total que suman el porcentaje pedido.   state { en }
//   etiqueta-vieja      hallar el precio de antes de un descuento.                       state { v } (de 5 en 5)
//   vuelta-al-precio    cuánto bajar para deshacer un aumento.                           state { v } (de 5 en 5)
//   factor-final        qué queda tras dos cambios seguidos.                             state { v }
(() => {
  const W = 340, X0 = 20, BW = 300;
  const num = x => String(Math.round(x * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const lienzo = (box, alto) => { box.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Escena del porcentaje"></svg>`; return box.firstChild; };
  // Barra de ancho proporcional a v (max es el valor del ancho completo) con rótulo arriba.
  const barra = (y, v, max, cls, et) => `<rect class="xb-fill ${cls}" x="${X0}" y="${y}" width="${Math.max(0, BW * v / max)}" height="30" rx="6"/>${et ? `<text class="xg-et" x="${X0}" y="${y - 7}">${et}</text>` : ''}`;

  // ------------------------------------------------------------------------------------------------------ rejilla-otra
  const meta = p => p.cols * p.filas * p.pct / 100;
  XG.juego('rejilla-otra', {
    ini: () => ({ k: 0 }),
    listo: s => s.k > 0,
    ok: (s, p) => s.k === meta(p),
    sol: p => ({ k: meta(p) }),
    texto: p => `${meta(p)} de las ${p.cols * p.filas} sillas: $${p.pct / 100} \\cdot ${p.cols * p.filas} = ${meta(p)}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div>';
      const C = 32, H = p.filas * C + 12, x0 = (W - p.cols * C) / 2, svg = lienzo(stage.firstChild, H), tot = p.cols * p.filas;
      let dedo = null, marca = 0;
      const draw = () => {
        let h = '';
        for (let i = 0; i < tot; i++) h += `<rect class="xg-lote${i < ui.s.k ? ' on' : ''}${marca && i < marca ? ' de' : ''}" x="${x0 + (i % p.cols) * C + 2}" y="${6 + Math.floor(i / p.cols) * C + 2}" width="${C - 4}" height="${C - 4}" rx="7"/>`;
        svg.innerHTML = h; svg.setAttribute('aria-valuenow', ui.s.k);
      };
      const pon = k => { k = XG.clamp(k, 0, tot); if (k === ui.s.k) return; ui.set({ k }); XS.tick(k % 12); xpTick(); draw(); };
      const mueve = e => {
        const r = svg.getBoundingClientRect(), f = XG.clamp(Math.floor(((e.clientY - r.top) * H / r.height - 6) / C), 0, p.filas - 1);
        pon(f * p.cols + XG.clamp(Math.ceil(((e.clientX - r.left) * W / r.width - x0) / C), 0, p.cols));
      };
      for (const [a, v] of [['tabindex', '0'], ['role', 'slider'], ['aria-label', 'Sillas pintadas'], ['aria-valuemin', 0], ['aria-valuemax', tot]]) svg.setAttribute(a, v);
      svg.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mueve(e); };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) mueve(e); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      svg.onkeydown = e => { const k = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: p.cols, ArrowUp: -p.cols }[e.key]; if (!k || ui.locked) return; e.preventDefault(); e.stopPropagation(); pon(ui.s.k + k); };
      draw(); ui.nota('Arrastra sobre las sillas para pintarlas.');
      return ok => {
        ui.lee(`$\\dfrac{${ui.s.k}}{${tot}} = ${num(100 * ui.s.k / tot)}\\,\\%$`);
        ui.nota(ok ? 'Esa es la parte pedida, aunque no sean 100 sillas.' : ui.s.k === p.pct ? `${p.pct} sillas no son el ${p.pct} %: el porcentaje es de cada 100.` : `Pintaste el ${num(100 * ui.s.k / tot)} %.`);
        if (!ok) ui.espera(2400, () => { ui.muestra({ k: meta(p) }); marca = meta(p); XS.merge(); draw(); ui.nota('Esta es la parte pedida.'); ui.lee(`$\\dfrac{${meta(p)}}{${tot}} = ${p.pct}\\,\\%$`); });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- que-porcentaje
  XG.conPerillas('que-porcentaje', {
    campos: p => [{ k: 'v', et: 'Porcentaje', min: 0, max: 20, ini: 0, cara: v => v * 5, lee: v => `${v * 5} %` }],
    listo: s => s.v > 0,
    ok: (s, p) => s.v * 5 * p.todo === 100 * p.parte,
    sol: p => ({ v: 20 * p.parte / p.todo }),
    texto: p => `$${p.parte} \\div ${p.todo} = ${p.parte / p.todo}$: el ${100 * p.parte / p.todo} %`,
    alto: 120,
    quieta: (p, K) => `<text class="xp-tag" x="170" y="22">${p.parte} de ${p.todo}</text><rect class="xg-tapada" x="20" y="44" width="300" height="34" rx="7"/><text class="xp-tag" x="170" y="67">?</text>`,
    cuadro(s, p, f) {
      const a = p.parte / p.todo, b = s.v / 20;
      let h = `<rect class="xb-out" x="20" y="30" width="300" height="30" rx="7"/>` + barra(30, a * f, 1, '', `${p.parte} de ${p.todo}`) + `<rect class="xb-out" x="20" y="84" width="300" height="30" rx="7"/>` + barra(84, b * f, 1, 'b', `${s.v * 5} %`);
      for (let k = 1; k < 10; k++) h += `<line class="xb-cut" x1="${20 + 30 * k}" y1="84" x2="${20 + 30 * k}" y2="114"/>`;
      return h;
    },
    aviso: (s, p) => (s.v * 5 === p.parte ? `${p.parte} es la cantidad, no el porcentaje.` : s.v * 5 * p.todo > 100 * p.parte ? 'Tu porcentaje es más que la parte.' : 'Tu porcentaje es menos que la parte.'),
    bien: () => 'Miden lo mismo: es esa parte de cada 100.',
  });

  // ------------------------------------------------------------------------------------------------- pedazos-porciento
  const suma = (en, p) => en.reduce((t, i) => t + p.cartas[i], 0);
  XG.juego('pedazos-porciento', {
    ini: p => ({ en: Array(p.k).fill(null) }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === p.k && suma(s.en, p) * 100 === p.pct * p.total,
    sol(p) {
      const n = p.cartas.length;
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) if (suma([a, b, c], p) * 100 === p.pct * p.total) return { en: [a, b, c] };
      return null;
    },
    texto(p) { const e = this.solve(p).en; return `$${e.map(i => p.cartas[i]).join(' + ')} = ${suma(e, p)}$: ${e.map(i => `${p.cartas[i] * 100 / p.total} %`).join(' + ')} = ${p.pct} %`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
      const [lona, frase, tray] = stage.children, svg = lienzo(lona, 96), xm = X0 + BW * p.pct / 100;
      const pinta = (m = '', fin) => { svg.innerHTML = `<rect class="xb-out" x="${X0}" y="36" width="${BW}" height="40" rx="7"/>${m}<text class="xg-et" x="${X0}" y="20">total: ${p.total}</text>` + (fin ? `<line class="xg-marca" x1="${xm}" y1="26" x2="${xm}" y2="86"/><text class="xp-tag xg-ok" x="${xm}" y="22">${p.pct} %</text>` : ''); };
      const draw = () => {
        frase.innerHTML = ui.s.en.map((i, k) => `${k ? '<span>+</span>' : ''}<button type="button" class="xp-slot xg-ch${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? p.cartas[i] : ''}</button>`).join('');
        tray.innerHTML = p.cartas.map((c, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${c}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      pinta(); draw(); ui.nota('Cada carta es una cantidad. Piensa qué porcentaje del total es.');
      const corre = (en, fin) => {
        let x = 0, h = '', k = 0;
        (function pieza() {
          if (k >= en.length) return fin(x);
          const v = p.cartas[en[k]], w = v / p.total, x0 = x, cls = ['', ' b', ' c'][k % 3];
          const r = (f, t) => `<rect class="xb-fill xg-pz${cls}" x="${X0 + x0 * BW}" y="36" width="${Math.max(1, BW * f - 1)}" height="40" rx="4"/>${t && w > 0.12 ? `<text class="xp-tag xg-sobre" x="${X0 + (x0 + w / 2) * BW}" y="61">${Math.round(w * 100)} %</text>` : ''}`;
          ui.tween(0, w, 650, f => pinta(h + r(f), true), () => { h += r(w, true); x += w; k++; XS.hop(k * 2); pinta(h, true); ui.espera(300, pieza); });
        })();
        ui.lee(`$${en.map(i => `${Math.round(p.cartas[i] * 100 / p.total)}\\,\\%`).join(' + ')} = ${Math.round(suma(en, p) * 100 / p.total)}\\,\\%$`);
      };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, x => {
          if (ok) return ui.nota('Justo el porcentaje pedido.');
          ui.nota(suma(ui.s.en, p) === p.pct ? `Suman ${p.pct}, pero ${p.pct} no es el ${p.pct} % de ${p.total}.` : x * 100 > p.pct ? 'Se pasa.' : 'No alcanza.');
          ui.espera(2000, () => { const s = GAMES['pedazos-porciento'].solve(p); ui.muestra(s); draw(); corre(s.en, () => ui.nota('Estas tres sí.')); });
        });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- etiqueta-vieja
  XG.conPerillas('etiqueta-vieja', {
    campos: p => [{ k: 'v', et: 'Precio de antes', min: 10, max: 40, ini: 10, cara: v => v * 5, lee: v => `${v * 5} mil` }],
    listo: (s, p) => s.v > 10,
    ok: (s, p) => s.v * 5 * (100 - p.baja) === 100 * p.queda,
    sol: p => ({ v: 20 * p.queda / (100 - p.baja) }),
    texto: p => `$${p.queda} \\div ${(100 - p.baja) / 100} = ${100 * p.queda / (100 - p.baja)}$ mil`,
    alto: 128,
    quieta: p => `<rect class="xg-tapada" x="20" y="24" width="300" height="30" rx="7"/><text class="xp-tag" x="170" y="45">antes: ?</text>` + barra(84, p.queda, 200, 'b', `después de bajar ${p.baja} %: ${p.queda} mil`),
    cuadro(s, p, f) {
      const v = s.v * 5, cae = v * p.baja / 100 * f;
      return barra(24, v - cae, 200, '', `antes: ${v} mil`) + `<rect class="xg-quita" x="${X0 + BW * (v - cae) / 200}" y="24" width="${BW * cae / 200}" height="30"/>` + barra(84, p.queda, 200, 'b', `quedó en ${p.queda} mil`) + `<line class="xg-hilo" x1="${X0 + BW * p.queda / 200}" y1="18" x2="${X0 + BW * p.queda / 200}" y2="118"/>`;
    },
    lee: (s, p) => `$${s.v * 5} \\cdot ${(100 - p.baja) / 100} = ${num(s.v * 5 * (100 - p.baja) / 100)}$`,
    aviso: (s, p) => (s.v * 5 * (100 - p.baja) > 100 * p.queda ? 'Quedaría más caro: el precio de antes era menor.' : s.v * 5 <= p.queda ? 'El precio de antes tiene que ser mayor.' : 'Quedaría más barato: el precio de antes era mayor.'),
    bien: () => 'El descuento se toma del precio de antes, no del que quedó.',
  });

  // -------------------------------------------------------------------------------------------------- vuelta-al-precio
  XG.conPerillas('vuelta-al-precio', {
    campos: p => [{ k: 'v', et: 'Descuento', min: 0, max: 10, ini: 0, cara: v => v * 5, lee: v => `${v * 5} %` }],
    listo: s => s.v > 0,
    ok: (s, p) => (100 + p.sube) * (100 - s.v * 5) === 10000,
    sol: p => ({ v: (100 - 10000 / (100 + p.sube)) / 5 }),
    texto: p => `$${(100 + p.sube) / 100} \\cdot ${10000 / (100 + p.sube) / 100} = 1$: hay que bajar el ${100 - 10000 / (100 + p.sube)} %`,
    alto: 120,
    quieta: p => barra(26, 100, 150, '', 'antes: 100') + barra(82, 100 + p.sube, 150, 'b', `después de subir el ${p.sube} %`),
    cuadro(s, p, f) {
      const v = 100 + p.sube, cae = v * s.v * 5 / 100 * f;
      return barra(26, 100, 150, '', 'antes: 100') + barra(82, v - cae, 150, 'b', `${v} baja ${s.v * 5} %`) + `<rect class="xg-quita" x="${X0 + BW * (v - cae) / 150}" y="82" width="${BW * cae / 150}" height="30"/><line class="xg-hilo" x1="${X0 + BW * 100 / 150}" y1="18" x2="${X0 + BW * 100 / 150}" y2="118"/>`;
    },
    lee: (s, p) => `$${100 + p.sube} \\cdot ${num((100 - s.v * 5) / 100)} = ${num((100 + p.sube) * (100 - s.v * 5) / 100)}$`,
    aviso: (s, p) => (s.v * 5 === p.sube ? 'Queda por debajo: ese porcentaje ahora se toma de un precio más grande.' : (100 + p.sube) * (100 - s.v * 5) < 10000 ? 'Bajó demasiado.' : 'Todavía está por encima.'),
    bien: () => 'Vuelve justo al precio de antes.',
  });

  // ------------------------------------------------------------------------------------------------------ factor-final
  const final = p => p.cambios.reduce((t, c) => t * (100 + c) / 100, 100);
  XG.conPerillas('factor-final', {
    campos: p => [{ k: 'v', et: 'Queda, de cada 100', min: p.min, max: p.max, ini: p.ini, lee: v => `${v}` }],
    listo: (s, p) => s.v !== p.ini,
    ok: (s, p) => s.v === Math.round(final(p)),
    sol: p => ({ v: Math.round(final(p)) }),
    texto: p => `$${p.cambios.map(c => (100 + c) / 100).join(' \\cdot ')} = ${Math.round(final(p)) / 100}$: quedan ${Math.round(final(p))} de cada 100`,
    alto: 128,
    quieta: () => barra(24, 100, 125, '', 'al comienzo: 100') + '<rect class="xg-tapada" x="20" y="84" width="300" height="30" rx="7"/><text class="xp-tag" x="170" y="105">al final: ?</text>',
    cuadro(s, p, f) {
      const n = p.cambios.length, u = f * n, k = Math.min(n - 1, Math.floor(u));
      let v = 100; for (let i = 0; i < k; i++) v *= (100 + p.cambios[i]) / 100;
      v *= 1 + p.cambios[k] / 100 * (u - k);
      return barra(24, v, 125, '', `${p.cambios[k] < 0 ? 'baja' : 'sube'} ${Math.abs(p.cambios[k])} %: ${num(v)}`) + barra(84, s.v, 125, 'b', `tu respuesta: ${s.v}`) + (f >= 1 ? `<line class="xg-hilo" x1="${X0 + BW * v / 125}" y1="18" x2="${X0 + BW * v / 125}" y2="118"/>` : '');
    },
    ms: 2600,
    aviso: (s, p) => (s.v === 100 + p.cambios.reduce((a, b) => a + b, 0) ? 'Los porcentajes no se suman: el segundo se toma del precio nuevo.' : s.v > final(p) ? 'Queda menos.' : 'Queda más.'),
    bien: () => 'Los cambios seguidos se multiplican.',
  });
})();
