// Paréntesis justo (spec 2026-11-24-ejercicios-explora): se arrastra el dedo sobre la cuenta, del primer número al último que
// van dentro, para poner el paréntesis que la hace dar `meta`. No se calcula nada hasta comprobar.
// params = { expr: '5 - 8 * 3 - 1', meta }   state = { a, b } (número en que abre y número en que cierra)
(() => {
  const calc = { '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b };
  const lista = p => p.expr.split(' ');
  function toks(s, p) {
    let k = -1;
    const out = [];
    for (const t of lista(p)) {
      if (!/\d/.test(t)) { out.push(t); continue; }
      k++;
      if (s && k === s.a) out.push('(');
      out.push(t);
      if (s && k === s.b) out.push(')');
    }
    return out;
  }
  // Índice de la operación que sigue: dentro del paréntesis, × ÷ primero, de izquierda a derecha.
  function sigue(t) {
    const hi = t.indexOf(')'), a = hi < 0 ? 0 : t.lastIndexOf('(', hi) + 1, b = hi < 0 ? t.length : hi;
    for (const ops of ['*/', '+-']) for (let i = a; i < b; i++) if (t[i].length === 1 && ops.includes(t[i]) && i > a) return i;
    return -1;
  }
  function aplica(t, i) {
    const r = [...t];
    r.splice(i - 1, 3, String(calc[t[i]](+t[i - 1], +t[i + 1])));
    if (r[i - 2] === '(' && r[i] === ')') r.splice(i - 2, 3, r[i - 1]);
    return r;
  }
  const valor = t => { let x = [...t]; while (x.length > 1) x = aplica(x, sigue(x)); return +x[0]; };
  const numeros = p => lista(p).filter(t => /\d/.test(t)).length;
  const sol = p => { for (let a = 0; a < numeros(p); a++) for (let b = a + 1; b < numeros(p); b++) if (valor(toks({ a, b }, p)) === p.meta) return { a, b }; return null; };
  const SIM = { '*': '×', '/': '÷', '-': '−' };
  const linda = t => t.map((x, i) => (/^-\d/.test(x) && i && t[i - 1] !== '(' ? `(${x.replace('-', '−')})` : SIM[x] || x.replace('-', '−')));

  XG.juego('parentesis-justo', {
    toks, valor,
    ini: () => ({ a: -1, b: -1 }),
    listo: s => s.a >= 0 && s.b > s.a,
    ok: (s, p) => s.a >= 0 && s.b > s.a && valor(toks(s, p)) === p.meta,
    sol,
    texto: p => `$${toks(sol(p), p).join(' ').replace(/\*/g, '\\cdot').replace(/\//g, '\\div')} = ${p.meta}$`,
    monta(stage, p, ui) {
      stage.innerHTML = `<div class="xp-expr xg-sel"></div><p class="xg-igual">debe dar <b>${XG.menos(p.meta)}</b></p>`;
      const ex = stage.firstChild;
      let ancla = -1, dedo = null, pos = [];
      function draw() {
        const s = ui.s, hay = s.a >= 0;
        let k = -1, h = '';
        for (const t of lista(p)) {
          const num = /\d/.test(t);
          if (num) k++;
          const dentro = hay && (num ? k >= s.a && k <= s.b : k >= s.a && k < s.b);
          if (num && hay && k === s.a) h += `<span class="xp-par on">(</span>`;
          h += num ? `<button type="button" class="xp-n xg-num${dentro ? ' in' : ''}" data-n="${k}" aria-pressed="${dentro}">${t}</button>` : `<span class="xg-op${dentro ? ' in' : ''}">${SIM[t] || t}</span>`;
          if (num && hay && k === s.b) h += `<span class="xp-par on">)</span>`;
        }
        ex.innerHTML = h;
      }
      // Las posiciones se miden una vez por gesto: al aparecer el paréntesis la fila se corre y el dedo no debe saltar de número.
      const mide = () => { pos = [...ex.querySelectorAll('.xg-num')].map(b => { const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
      const cerca = e => {
        let best = -1, d = 1e9;
        pos.forEach(([x, y], n) => { const k = Math.hypot(e.clientX - x, (e.clientY - y) * 1.5); if (k < d) { d = k; best = n; } });
        return best;
      };
      const pon = n => {
        const s = { a: Math.min(ancla, n), b: Math.max(ancla, n) };
        if (s.a === ui.s.a && s.b === ui.s.b) return;
        ui.set(s); XS.tick(n); xpTick(); draw();
        ui.nota(s.a === s.b ? 'Sigue arrastrando hasta el último número que va adentro.' : '');
      };
      ex.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { ex.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mide(); const n = cerca(e);
        // Con un solo número marcado, tocar otro cierra ahí (sin arrastrar).
        if (!(ui.s.a >= 0 && ui.s.a === ui.s.b && n !== ui.s.a)) ancla = n;
        pon(n); };
      ex.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) pon(cerca(e)); };
      ex.onpointerup = ex.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      ex.onkeydown = e => {
        const b = e.target.closest('.xg-num');
        if (!b || ui.locked || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault(); e.stopPropagation();
        const n = +b.dataset.n;
        if (!(ui.s.a >= 0 && ui.s.a === ui.s.b && n !== ui.s.a)) ancla = n;
        pon(n); ex.querySelector(`[data-n="${n}"]`).focus({ preventScroll: true });
      };
      draw(); ui.nota('Pasa el dedo del primer número al último que van dentro del paréntesis.');
      function corre(s, fin) {
        let t = toks(s, p);
        const pinta = (i, nuevo) => {
          ex.innerHTML = linda(t).map((x, k) => `<span class="${/\d/.test(t[k]) ? `xp-n${k === nuevo ? ' new' : ''}` : t[k] === '(' || t[k] === ')' ? 'xp-par on' : `xg-op${k === i ? ' now' : ''}`}">${x}</span>`).join('');
        };
        pinta();
        (function paso() {
          if (t.length === 1) { ex.classList.add('done'); return fin(+t[0]); }
          const i = sigue(t);
          ui.espera(550, () => { pinta(i); XS.pop(); ui.espera(650, () => { const par = t[i - 2] === '(' && t[i + 2] === ')'; t = aplica(t, i); pinta(-1, par ? i - 2 : i - 1); XS.merge(); paso(); }); });
        })();
      }
      return ok => {
        ui.nota('');
        corre(ui.s, v => {
          if (ok) return ui.nota('Primero el paréntesis; después, lo de afuera.');
          ui.nota(`Ahí da ${XG.menos(v)}. Mira dónde iba.`);
          ui.espera(1500, () => { ex.classList.remove('done'); corre(sol(p), () => {}); });
        });
      };
    },
  });
})();
