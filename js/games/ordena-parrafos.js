// Reconstruye el texto (lectura, kit LEC): el texto llega con los párrafos revueltos. El primero queda fijo arriba y los demás se
// arrastran a la columna, uno debajo del otro, hasta que el texto se pueda leer de corrido. El comienzo de cada párrafo va en
// negrita: ahí están las costuras (conectores, «esto», «al día siguiente», «sin embargo») que dicen qué va antes. El texto
// ordenado se abre al comprobar. Entrena la estructura y la cohesión: «el párrafo que debe ir después del 2 es…».
// params = { doc, ask? }
(() => {
  const hook = t => { const w = t.split(/\s+/); const n = Math.min(4, Math.max(2, w.length >> 4)); return `**${w.slice(0, n).join(' ')}** ${w.slice(n).join(' ')}`; };
  GAMES['ordena-parrafos'] = LEC.drop('ordena-parrafos', {
    hideBody: true,
    hideMsg: 'El texto se abre en orden cuando compruebes.',
    foot: 'Arrastra cada párrafo a su lugar en la columna, o tócalo y luego toca el lugar.',
    norm: p => {
      const rest = p.doc.paras.slice(1);
      return [{
        ask: p.ask || 'Los párrafos están revueltos. Ponlos en orden debajo del primero.',
        chips: rest.map(hook),
        zones: rest.map((_, i) => ({ label: `${i + 2}`, cap: 1 })),
        key: rest.map((_, i) => i),
        head: p.doc.paras[0],
      }];
    },
    solution: (rs, p) => `Orden del texto: ${p.doc.paras.map((t, i) => `${i + 1} «${LEC.first(t, 4)}»`).join(' → ')}`,
    render: (r, u) => {
      LEC.css('ordena-parrafos', `
.lec-ord { display: grid; gap: 6px; }
.lec-ord-head { margin: 0; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--c, var(--brand)); background: color-mix(in srgb, var(--c, var(--brand)) 9%, var(--bg2)); font-size: 14.5px; line-height: 1.6; }
.lec-ord-n { display: inline-grid; place-items: center; min-width: 22px; height: 22px; margin-right: 6px; border-radius: 6px; border: 1px solid var(--c, var(--brand)); color: var(--c-ink, var(--brand)); font-size: 12px; font-weight: 700; }
.lec-ord .lec-zone { display: grid; grid-template-columns: auto 1fr; align-items: start; min-height: 52px; border-style: dashed; }
.lec-ord .lec-zone.full { border-style: solid; }
.lec-ord .lec-zone > .lec-zl { padding-top: 3px; }
.lec-ord .lec-zone > .lec-chip { grid-column: 2; }
.lec-ord-wait { font-size: 13px; color: var(--mute); font-style: italic; padding-top: 3px; }
.lec-ordena-parrafos .lec-chip { display: block; width: 100%; text-align: left; font-size: 14px; line-height: 1.55; white-space: normal; }
.lec-ordena-parrafos .lec-pool { flex-direction: column; }
.lec-ord-seam { justify-self: center; width: 2px; height: 10px; background: var(--line); }
.lec-ord-seam.on { background: var(--c, var(--brand)); }
.lec-ghost { max-width: min(82vw, 440px); max-height: 38vh; overflow: hidden; }`);
      const filled = zi => u.placed(zi).length > 0;
      const rows = r.zones.map((_, zi) => `<span class="lec-ord-seam${filled(zi) && (zi === 0 || filled(zi - 1)) ? ' on' : ''}" aria-hidden="true"></span>`
        + u.zone(zi, { after: filled(zi) ? '' : '<span class="lec-ord-wait">¿Qué párrafo sigue aquí?</span>' })).join('');
      return `<div class="lec-ord"><p class="lec-ord-head"><span class="lec-ord-n">1</span>${u.fmt(r.head)}</p>${rows}</div>${u.pool()}`;
    },
  });
})();
