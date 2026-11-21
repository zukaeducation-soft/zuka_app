// El subrayador (lectura, kit LEC): arriba, una conclusión que el texto no dice con esas palabras; abajo, uno o dos párrafos del
// texto con cada oración lista para subrayar. Se arrastra el subrayador hasta la oración que la prueba, y esa oración se pinta.
// Varias oraciones hablan del mismo tema: solo una permite concluir lo que dice la tarjeta. Entrena las preguntas «¿cuál
// fragmento del texto permite afirmar que…?» y la costumbre de sustentar cada inferencia en el texto.
// params = { doc, rounds: [{ claim, p: párrafo | [párrafos], answer: índice de la oración entre las que se muestran, ask? }] }
(() => {
  const sents = (doc, r) => [].concat(r.p).flatMap(n => LEC.sentences(doc.paras[n - 1]).map(s => ({ n, s })));
  GAMES['subraya-prueba'] = LEC.drop('subraya-prueba', {
    foot: 'Arrastra el subrayador hasta una oración, o tócalo y luego toca la oración.',
    norm: p => p.rounds.map(r => {
      const ss = sents(p.doc, r);
      return {
        ask: r.ask || 'Subraya la oración que prueba esta conclusión.',
        chips: ['subrayador'],
        zones: ss.map((x, i) => ({ label: `oración ${i + 1} del párrafo ${x.n}`, cap: 1 })),
        key: [r.answer],
        src: { ...r, ss },
      };
    }),
    solution: rs => rs.map(r => `«${LEC.first(r.src.ss[r.src.answer].s, 9)}» (párrafo ${r.src.ss[r.src.answer].n})`).join(' · '),
    render: (r, u) => {
      LEC.css('subraya-prueba', `
.lec-claim { margin: 0 0 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--line); border-left: 3px solid var(--c, var(--brand)); background: var(--bg2); font-size: 15px; line-height: 1.5; }
.lec-claim .lec-zl { display: block; margin-bottom: 3px; }
.lec-sp { margin: 0 0 8px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--line); background: var(--bg2); font-size: 15px; line-height: 1.8; }
.lec-zone.lec-hl { display: inline; min-height: 0; padding: 2px 1px; border: 0; border-radius: 4px; background: transparent; box-decoration-break: clone; -webkit-box-decoration-break: clone; text-decoration: underline dotted color-mix(in srgb, var(--mute) 55%, transparent); text-underline-offset: 4px; }
.lec-zone.lec-hl.over { background: color-mix(in srgb, var(--c, var(--brand)) 18%, transparent); }
.lec-zone.lec-hl.full { background: color-mix(in srgb, var(--c, var(--brand)) 32%, transparent); text-decoration: none; }
.lec-hl .lec-gap { display: none; }
.lec-hl .lec-chip { display: inline-block; margin-left: 4px; padding: 0 7px; font-size: 11px; line-height: 1.6; vertical-align: 1px; }
.lec-subraya-prueba .lec-pool .lec-chip::before { content: ''; display: inline-block; width: 14px; height: 8px; margin-right: 6px; border-radius: 2px; background: color-mix(in srgb, var(--c, var(--brand)) 70%, transparent); transform: skewX(-18deg); }`);
      const byP = {};
      r.src.ss.forEach((x, i) => { (byP[x.n] = byP[x.n] || []).push(u.zone(i, { inline: true, noLabel: true, cls: 'lec-hl', before: u.fmt(x.s) })); });
      const paras = Object.keys(byP).map(n => `<p class="lec-sp"><span class="lec-pn">${n}</span>${byP[n].join(' ')}</p>`).join('');
      return `<p class="lec-claim"><span class="lec-zl">Conclusión</span>${u.fmt(r.src.claim)}</p>${paras}${u.pool()}`;
    },
  });
})();
