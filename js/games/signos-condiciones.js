// Signos con dos condiciones (spec 2026-11-24-ejercicios-explora): se voltean los signos para que el PRODUCTO sea positivo y
// la SUMA negativa a la vez, dejando al menos un número positivo. Los resultados quedan tapados hasta comprobar.
// params = { factores }   state = { neg: [bool], tocado }
XG.juego('signos-condiciones', {
  ini: p => ({ neg: p.factores.map(() => false), tocado: false }),
  listo: s => !!s.tocado,
  vals: (s, p) => p.factores.map((f, i) => (s.neg[i] ? -f : f)),
  ok(s, p) { const v = p.factores.map((f, i) => (s.neg[i] ? -f : f)); return v.reduce((a, b) => a * b, 1) > 0 && v.reduce((a, b) => a + b, 0) < 0 && v.some(x => x > 0); },
  sol(p) {
    for (let m = 1; m < (1 << p.factores.length) - 1; m++) {
      const v = p.factores.map((f, i) => (m >> i & 1 ? -f : f));
      if (v.reduce((a, b) => a * b, 1) > 0 && v.reduce((a, b) => a + b, 0) < 0) return { neg: p.factores.map((_, i) => !!(m >> i & 1)), tocado: true };
    }
    return null;
  },
  texto(p) {
    const v = this.vals(this.solve(p), p);
    return `Por ejemplo, $${v.map(XG.par).join(' \\cdot ')} = ${v.reduce((a, b) => a * b, 1)}$ y $${v.map(XG.par).join(' + ')} = ${v.reduce((a, b) => a + b, 0)}$`;
  },
  monta(stage, p, ui) {
    const G = GAMES['signos-condiciones'];
    stage.innerHTML = `<div class="xp-fact">${p.factores.map((_, i) => `<button type="button" class="xp-f" data-i="${i}"></button>`).join('')}</div>
      <div class="xg-dos"><div class="xp-coin"><small>Producto</small><b>?</b><em>positivo</em></div><div class="xp-coin"><small>Suma</small><b>?</b><em>negativa</em></div></div>`;
    const bs = [...stage.querySelectorAll('.xp-f')], coins = [...stage.querySelectorAll('.xp-coin')];
    const draw = () => bs.forEach((b, i) => {
      const n = ui.s.neg[i], v = n ? -p.factores[i] : p.factores[i];
      b.classList.toggle('neg', n); b.textContent = XG.menos(v); b.setAttribute('aria-label', `${v}: cambiar el signo`);
    });
    stage.onclick = e => {
      const b = e.target.closest('.xp-f');
      if (!b || ui.locked) return;
      const i = +b.dataset.i;
      ui.set({ neg: ui.s.neg.map((x, k) => (k === i ? !x : x)), tocado: true });
      XS.flip(); xpTick(); draw();
      if (!xpStill()) b.animate([{ transform: 'rotateY(90deg)' }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    };
    draw(); ui.nota('Toca un número para cambiarle el signo. Deja al menos uno positivo.');
    function destapa(c, v, bien) {
      c.classList.toggle('neg', v < 0); c.classList.add(bien ? 'good' : 'bad'); c.classList.remove(bien ? 'bad' : 'good');
      c.querySelector('b').textContent = v > 0 ? `+${v}` : XG.menos(v);
      XS.flip();
      if (!xpStill()) c.animate([{ transform: 'rotateX(90deg) scale(.9)' }, { transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    function muestra(fin) {
      const v = G.vals(ui.s, p), prod = v.reduce((a, b) => a * b, 1), sum = v.reduce((a, b) => a + b, 0), n = ui.s.neg.filter(Boolean).length;
      destapa(coins[0], prod, prod > 0);
      ui.nota(`${n} ${n === 1 ? 'signo menos' : 'signos menos'}: ${n % 2 ? 'impar, producto negativo' : 'par, producto positivo'}.`);
      ui.espera(1300, () => {
        destapa(coins[1], sum, sum < 0);
        ui.lee(`$${v.map(XG.par).join(' + ')} = ${sum}$`);
        fin?.(v);
      });
    }
    return ok => {
      muestra(v => {
        if (ok) return;
        const todos = v.every(x => x < 0);
        ui.espera(1500, () => {
          if (todos) ui.nota('Cumple las dos, pero faltó dejar un número positivo. Así sí:');
          ui.espera(todos ? 1800 : 0, () => {
            ui.muestra(G.solve(p)); draw(); ui.lee('');
            coins.forEach(c => { c.classList.remove('good', 'bad', 'neg'); c.querySelector('b').textContent = '?'; });
            muestra();
          });
        });
      });
    };
  },
});
