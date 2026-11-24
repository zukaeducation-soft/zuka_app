// Lanza la ficha (spec 2026-11-24-ejercicios-explora; en movimiento): sale una operación y la ficha espera en su primer número.
// Se estira el impulso (sentido y número de pasos) y al soltar la ficha sale saltando. Tres tiros; se perdona un fallo.
// params = { min, max, tope, tiros: [{ t: '-5 - (-9)', desde, d }] }   state = { n: tiros hechos, fallos }
(() => {
  const MAXF = 2;
  XG.juego('lanza-ficha', {
    ini: () => ({ n: 0, fallos: 0 }),
    listo: (s, p) => s.n >= p.tiros.length || s.fallos >= MAXF,
    ok: (s, p) => s.n >= p.tiros.length && s.fallos < MAXF,
    sol: p => ({ n: p.tiros.length, fallos: 0 }),
    tira(s, k, p) {
      if (s.n >= p.tiros.length || s.fallos >= MAXF) return s;
      return k === p.tiros[s.n].d ? { ...s, n: s.n + 1 } : { ...s, fallos: s.fallos + 1 };
    },
    texto: p => p.tiros.map(t => `$${t.t} = ${t.desde + t.d}$`).join(', '),
    monta(stage, p, ui) {
      const G = GAMES['lanza-ficha'];
      stage.innerHTML = '<div class="xg-op-grande"></div><div class="xp-dots" aria-hidden="true"></div><div class="xg-lona"></div><div class="xg-perillas"></div>';
      const [op, dots, lona, per] = stage.children;
      const R = XG.recta(lona, { min: p.min, max: p.max, alto: 150 });
      let vuela = false;
      const tiro = () => p.tiros[Math.min(ui.s.n, p.tiros.length - 1)];
      const quieta = (x, cls) => { R.din.innerHTML = XG.ficha(R.X(x), R.y, x, cls); };
      const pone = () => {
        dots.innerHTML = p.tiros.map((_, k) => `<i class="${k < ui.s.n ? 'done' : k === ui.s.n ? 'now' : ''}"></i>`).join('');
        op.innerHTML = tex(`$${tiro().t}$`); quieta(tiro().desde); pe?.set(0);
      };
      let pe = null;
      pe = XG.perilla(ui, per, { et: 'Impulso', min: -p.tope, max: p.tope, v: 0, quieta: () => vuela || G.listo(ui.s, p),
        lee: v => (v ? `${Math.abs(v)} ${Math.abs(v) === 1 ? 'paso' : 'pasos'} a la ${v > 0 ? 'derecha' : 'izquierda'}` : 'estira y suelta'), on() {}, suelta: lanza });
      function lanza(k) {
        if (!k || vuela || G.listo(ui.s, p)) return;
        vuela = true;
        const t = tiro(), dir = Math.sign(k), n = Math.abs(k);
        let i = 0, estela = '';
        ui.nota('');
        (function brinco() {
          const a = t.desde + dir * i, b = a + dir;
          if (i >= n || b < p.min || b > p.max) return cae(t.desde + dir * i, i < n);
          i++;
          ui.tween(0, 1, 170, u => {
            const x = R.X(a) + (R.X(b) - R.X(a)) * u, y = R.y - 26 * 4 * u * (1 - u);
            R.din.innerHTML = estela + XG.ficha(x, y, u < 0.5 ? a : b, dir < 0 ? 'flip' : '');
          }, () => { estela += XG.arco(R.X(a), R.X(b), R.y, 11, `xp-hop${dir < 0 ? ' flip' : ''}`); XS.hop(i); brinco(); });
        })();
        function cae(x, fuera) {
          const antes = ui.s, s = G.tira(antes, k, p), bien = s.n > antes.n;
          ui.set(s);
          R.din.innerHTML = estela + `<circle class="xp-ring${bien ? ' good' : ' bad'}" cx="${R.X(x)}" cy="${R.y}" r="20"/>` + XG.ficha(R.X(x), R.y, x);
          bien ? XS.merge() : XS.nope();
          ui.lee(bien ? `$${t.t} = ${x}$` : '');
          const sentido = Math.sign(t.d) !== dir;
          ui.nota(bien ? (s.n >= p.tiros.length ? 'Tres tiros. Comprueba.' : 'Ahí es.')
            : fuera ? 'Se salió de la recta.' : sentido ? 'La operación va hacia el otro lado.' : n < Math.abs(t.d) ? 'Faltaron pasos.' : 'Sobraron pasos.', !bien);
          if (!bien && s.fallos >= MAXF) ui.espera(1500, () => !ui.locked && ui.nota('Se acabaron los intentos. Comprueba para ver cómo era.', true));
          if (G.listo(s, p)) { vuela = false; dots.innerHTML = p.tiros.map((_, j) => `<i class="${j < s.n ? 'done' : ''}"></i>`).join(''); return; }
          ui.espera(1700, () => { vuela = false; ui.lee(''); ui.nota(bien ? 'Siguiente tiro.' : 'Otra vez: ya no puedes fallar más.'); pone(); });
        }
      }
      pone(); ui.nota('Estira el impulso hacia donde va la operación y suelta.');
      return ok => {
        ui.nota(ok ? 'Tres tiros en su lugar.' : 'Mira cómo era.');
        if (ok) return;
        const t = tiro();
        ui.espera(400, () => { ui.lee(`$${t.t} = ${t.desde + t.d}$`); XG.camina(ui, R, t.desde, [t], {}); });
      };
    },
  });
})();
