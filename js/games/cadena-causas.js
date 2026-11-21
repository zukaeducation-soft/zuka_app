// La cadena de causas (lectura, kit LEC): una cadena de eslabones unidos por flechas «por eso». Se arrastra a cada eslabón un
// hecho del texto, desde la primera causa hasta el último efecto; la flecha se enciende cuando los dos eslabones que une tienen
// su hecho. En la bandeja sobran hechos que el texto sí cuenta pero que no son parte de la cadena (o que la cadena no produce).
// Entrena causa y efecto: «según el texto, X ocurrió porque…», «una consecuencia de… fue…».
// params = { doc, chain: [hechos en orden, de la causa al efecto], extra: [hechos que sobran], ask? }
GAMES['cadena-causas'] = LEC.drop('cadena-causas', {
  foot: 'Pon cada hecho en su eslabón, de la causa al efecto. Lo que no es parte de la cadena se queda abajo.',
  norm: p => {
    const n = p.chain.length;
    return [{
      ask: p.ask || 'Arma la cadena: ¿qué causó qué, según el texto?',
      chips: [...p.chain, ...p.extra],
      zones: p.chain.map((_, i) => ({ label: i === 0 ? 'Primero' : i === n - 1 ? 'Al final' : `Paso ${i + 1}`, cap: 1 })),
      key: [...p.chain.map((_, i) => i), ...p.extra.map(() => null)],
    }];
  },
  solution: rs => rs[0].chips.slice(0, rs[0].zones.length).map(t => `«${t}»`).join(' → '),
  render: (r, u) => {
    LEC.css('cadena-causas', `
.lec-chain { display: grid; gap: 0; }
.lec-chain .lec-zone { display: grid; grid-template-columns: 1fr; gap: 4px; min-height: 52px; border-style: dashed; }
.lec-chain .lec-zone.full { border-style: solid; }
.lec-chain .lec-zone > .lec-chip { justify-self: start; }
.lec-link { display: flex; align-items: center; gap: 8px; height: 30px; padding-left: 18px; font-size: 12px; color: var(--mute); }
.lec-link svg { width: 14px; height: 24px; fill: none; stroke: var(--line); stroke-width: 2; stroke-linecap: round; transition: stroke .2s; }
.lec-link.on { color: var(--c-ink, var(--brand)); }
.lec-link.on svg { stroke: var(--c, var(--brand)); }`);
    const has = zi => u.placed(zi).length > 0;
    const parts = r.zones.map((_, zi) => (zi ? `<div class="lec-link${has(zi - 1) && has(zi) ? ' on' : ''}" aria-hidden="true"><svg viewBox="0 0 14 24"><path d="M7 2 V20 M2 15 L7 21 L12 15"/></svg>por eso</div>` : '') + u.zone(zi)).join('');
    return `<div class="lec-chain">${parts}</div>${u.pool()}`;
  },
});
