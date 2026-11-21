// El resumen que cabe (lectura, kit LEC): una ficha de resumen con pocos renglones y una bandeja con ideas del texto: unas son las
// que sostienen todo el texto y otras son detalles, ejemplos o cifras que el texto sí dice pero que no lo resumen. Solo caben las
// esenciales; abajo, el resumen se lee de corrido con lo que se va poniendo. Entrena «el mejor resumen del texto es…» y la
// diferencia entre idea principal y detalle.
// params = { doc, ideas: [[idea, true si es esencial]], ask? }
GAMES['resumen-esencial'] = LEC.drop('resumen-esencial', {
  foot: 'Solo caben las ideas que resumen todo el texto. Los detalles se quedan en la bandeja.',
  norm: p => {
    const n = p.ideas.filter(i => i[1]).length, all = Array.from({ length: n }, (_, i) => i);
    return [{
      ask: p.ask || `El resumen cabe en ${n} renglones. Llénalos con las ideas que sostienen todo el texto.`,
      chips: p.ideas.map(i => i[0]),
      zones: all.map(i => ({ label: `renglón ${i + 1}`, cap: 1 })),
      key: p.ideas.map(i => i[1] ? all : null),
    }];
  },
  solution: rs => `Resumen: ${rs[0].chips.filter((_, c) => rs[0].key[c] != null).map(t => `«${t}»`).join(' + ')}`,
  render: (r, u) => {
    LEC.css('resumen-esencial', `
.lec-sum { padding: 10px 12px 12px; border-radius: 12px; border: 1px solid var(--line); background: var(--bg2); }
.lec-sum-h { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.lec-sum-m { font-size: 12px; color: var(--mute); }
.lec-sum .lec-zone { display: grid; grid-template-columns: 22px 1fr; align-items: center; min-height: 40px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; background: transparent; padding: 6px 2px; }
.lec-sum .lec-zone.over { background: color-mix(in srgb, var(--c, var(--brand)) 10%, transparent); }
.lec-sum .lec-zone > .lec-chip { grid-column: 2; justify-self: start; }
.lec-sum-read { margin: 10px 0 0; font-size: 14.5px; line-height: 1.6; }
.lec-sum-read.empty { color: var(--mute); font-style: italic; }`);
    const used = r.zones.map((_, zi) => u.placed(zi)[0]).filter(c => c != null);
    const read = used.length ? `${used.map(c => u.fmt(r.chips[c]).replace(/[.\s]+$/, '')).join('. ')}.` : 'Aquí se lee el resumen a medida que lo llenas.';
    const lines = r.zones.map((_, zi) => u.zone(zi, { cls: 'lec-sum-line' }).replace(/<span class="lec-zl">renglón (\d+)<\/span>/, '<span class="lec-zl">$1</span>')).join('');
    return `<div class="lec-sum"><div class="lec-sum-h"><span class="lec-zl">Resumen del texto</span><span class="lec-sum-m">${used.length} de ${r.zones.length} renglones</span></div>`
      + `<div class="lec-zones">${lines}</div><p class="lec-sum-read${used.length ? '' : ' empty'}">${read}</p></div>${u.pool()}`;
  },
});
