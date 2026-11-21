// Sella la trampa (lectura, kit LEC): una pregunta como las del examen con sus cuatro opciones; abajo, sellos con las trampas
// típicas. A cada opción se le arrastra su sello: la que es la respuesta, la que dice de más (generaliza o exagera lo que el
// texto dice), la que dice lo contrario, la que habla de algo que el texto no dice y la que mezcla datos del texto que no van
// juntos. Sobra un sello. Entrena a descartar con razones, no por intuición, que es lo que más pesa en el examen.
// params = { doc, q, options: [[opción, tipo]] }   tipo: 0 respuesta · 1 dice de más · 2 dice lo contrario · 3 no lo dice ·
// 4 mezcla datos. Cada opción tiene un tipo distinto y hay una sola respuesta.
(() => {
const TRAMPAS = ['Es la respuesta', 'Dice de más', 'Dice lo contrario', 'El texto no lo dice', 'Mezcla datos'];
GAMES['trampa-opcion'] = LEC.drop('trampa-opcion', {
  foot: 'Arrastra a cada opción su sello. Sobra uno.',
  norm: p => [{
    ask: 'Ponle a cada opción su sello: ¿por qué es o no es la respuesta?',
    chips: TRAMPAS,
    zones: p.options.map((_, i) => ({ label: `opción ${'ABCD'[i]}`, cap: 1 })),
    key: TRAMPAS.map((_, t) => { const i = p.options.findIndex(o => o[1] === t); return i >= 0 ? i : null; }),
    q: p.q, opts: p.options,
  }],
  solution: rs => rs[0].opts.map((o, i) => `${'ABCD'[i]}: ${TRAMPAS[o[1]]}`).join(' · '),
  render: (r, u) => {
    LEC.css('trampa-opcion', `
.lec-trq { margin: 0 0 8px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--line); background: var(--bg2); font-size: 15px; line-height: 1.5; font-weight: 700; }
.lec-trq .lec-zl { display: block; margin-bottom: 3px; font-weight: 700; }
.lec-tr .lec-zone { display: grid; grid-template-columns: auto 1fr; gap: 4px 9px; align-items: start; }
.lec-tr-l { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--c, var(--brand)); color: var(--c-ink, var(--brand)); font-weight: 700; font-size: 13px; }
.lec-tr-t { font-size: 14.5px; line-height: 1.5; }
.lec-tr .lec-zone > .lec-chip { grid-column: 2; justify-self: end; transform: rotate(-3deg); border-style: double; border-width: 3px; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
.lec-tr .lec-zone > .lec-chip.good, .lec-tr .lec-zone > .lec-chip.bad { transform: none; }`);
    const rows = r.opts.map((o, i) => u.zone(i, { noLabel: true, before: `<span class="lec-tr-l">${'ABCD'[i]}</span><span class="lec-tr-t">${u.fmt(o[0])}</span>` })).join('');
    return `<p class="lec-trq"><span class="lec-zl">Pregunta</span>${u.fmt(r.q)}</p><div class="lec-zones lec-tr">${rows}</div>${u.pool()}`;
  },
});
})();
