// Conceptos animados del gimnasio (spec 2026-11-20-preuda-razonamiento-diez). Cuando el estudiante se atasca en un paso de
// un reto, «Recordar el concepto» abre una tarjeta con una animación corta: un dibujo que se arma por tiempos, cada uno con su
// rótulo. Un concepto es solo datos: CONCEPTOS[id] = { title, scene, beats: [texto con $TeX$ por tiempo] }.
// La escena es SVG (320 × 170). Cada pieza lleva `b`: el tiempo en que aparece (0 = desde el inicio). Tipos de escena:
//   barra   { bars: [{ label, b, segs: [{ w (0–1), t, c, b }] }] }             partes de un todo, lo que queda, porcentajes
//   recta   { min, max, ticks: [n], hops: [{ from, to, t, c, b }], dots: [{ v, t, c, b }] }       saltos en la recta
//   venn    { a, b, regs: { a: {t, b}, ab: {t, b}, b: {t, b}, out: {t, b} } }                      dos conjuntos
//   arbol   { levels: [{ n, labels, b }], foot: { t, b } }                      ramas que se multiplican
//   tabla   { cols, rows, cells: [[texto]], hl: [{ r, c, col, b }] }            tabla con casillas que se encienden
//   ciclo   { items: [texto], marks: [{ i, b, c }], center: { t, b } }          rueda de un patrón que se repite
//   figura  { shapes: [{ k: 'poly' | 'line' | 'circle' | 'rect' | 'text', … , c, fill, b }] }     dibujo libre
//   pasos   { lines: [texto] }                                                  un renglón por tiempo
// Colores `c`: 'a' (el del curso), 'g' (dorado), 'f' (naranja), 'ok', 'bad', 'ink', 'mute'.
const CONCEPTOS = {};

const CON = (() => {
  const W = 320, H = 170;
  const COL = { a: 'var(--c-ink, var(--brand))', g: 'var(--gold)', f: 'var(--fire)', ok: 'var(--ok)', bad: 'var(--bad)', ink: 'var(--ink)', mute: 'var(--mute)' };
  const col = c => COL[c] || COL.a;
  const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const at = (b, fx = 'pop') => ` data-b="${b || 0}" data-fx="${fx}"`;
  const txt = (t, x, y, o = {}) => `<text x="${x}" y="${y}" font-size="${o.s || 12}" font-weight="${o.w || 500}" text-anchor="${o.a || 'middle'}" style="fill:${col(o.c || 'ink')}"${at(o.b)}>${e(t)}</text>`;
  const fill = (c, k = 26) => `color-mix(in srgb, ${col(c)} ${k}%, transparent)`;

  const build = {
    barra(s) {
      const n = s.bars.length, h = n > 2 ? 26 : 32, gap = (H - 24 - n * h) / (n + 1), x0 = 22, w = W - 44;
      return s.bars.map((bar, i) => {
        const y = 12 + gap * (i + 1) + h * i + (bar.label ? 8 : 0);
        let x = x0 + (bar.x || 0) * w;
        const segs = bar.segs.map(g => {
          const sw = g.w * w, r = `<g${at(g.b ?? bar.b)}><rect x="${x + 1}" y="${y}" width="${Math.max(0, sw - 2)}" height="${h}" rx="5" style="fill:${fill(g.c, g.dim ? 8 : 30)};stroke:${col(g.c)}" stroke-width="1.2"${g.dim ? ' stroke-dasharray="3 3"' : ''}/>${g.t ? `<text x="${x + sw / 2}" y="${y + h / 2 + 4}" font-size="${sw < 46 ? 10 : 11.5}" font-weight="600" text-anchor="middle" style="fill:var(--ink)">${e(g.t)}</text>` : ''}</g>`;
          x += sw; return r;
        }).join('');
        return `${bar.label ? txt(bar.label, x0, y - 6, { a: 'start', s: 10.5, c: 'mute', b: bar.b }) : ''}${segs}`;
      }).join('');
    },
    recta(s) {
      const x0 = 26, w = W - 52, y = 112, px = v => x0 + (v - s.min) / (s.max - s.min) * w;
      const ticks = (s.ticks || []).map(v => `<line x1="${px(v)}" y1="${y - 5}" x2="${px(v)}" y2="${y + 5}" style="stroke:var(--mute)" stroke-width="1.2"/>${txt(v, px(v), y + 20, { s: 11, c: 'mute' })}`).join('');
      const hops = (s.hops || []).map(h => {
        const a = px(h.from), b = px(h.to), top = y - Math.min(58, 16 + Math.abs(b - a) * .42), up = h.down ? 2 * y - top : top;
        return `<path d="M${a} ${y} Q${(a + b) / 2} ${up} ${b} ${y}" fill="none" style="stroke:${col(h.c)}" stroke-width="2.2" stroke-linecap="round"${at(h.b, 'draw')}/>${h.t ? txt(h.t, (a + b) / 2, h.down ? (y + up) / 2 + 20 : (y + up) / 2 - 7, { s: 11.5, w: 600, c: h.c, b: h.b }) : ''}`;
      }).join('');
      const dots = (s.dots || []).map(d => `<g${at(d.b)}><circle cx="${px(d.v)}" cy="${y}" r="5.5" style="fill:${col(d.c)}"/>${d.t ? `<text x="${px(d.v)}" y="${y + 36}" font-size="11.5" font-weight="600" text-anchor="middle" style="fill:${col(d.c)}">${e(d.t)}</text>` : ''}</g>`).join('');
      return `<line x1="${x0 - 8}" y1="${y}" x2="${x0 + w + 8}" y2="${y}" style="stroke:var(--mute)" stroke-width="1.5" stroke-linecap="round"/>${ticks}${hops}${dots}`;
    },
    venn(s) {
      const R = s.regs, cy = 88, r = 54, ax = 124, bx = 196;
      const reg = (k, x, y, c) => (R[k] ? txt(R[k].t, x, y, { s: 15, w: 600, c: R[k].c || c, b: R[k].b }) : '');
      return `<rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="12" fill="none" style="stroke:var(--line)" stroke-width="1.2"/>
        <circle cx="${ax}" cy="${cy}" r="${r}" style="fill:${fill('a', 14)};stroke:${col('a')}" stroke-width="1.6"/><circle cx="${bx}" cy="${cy}" r="${r}" style="fill:${fill('g', 14)};stroke:${col('g')}" stroke-width="1.6"/>
        ${txt(s.a, ax - 30, 30, { s: 11, c: 'a', w: 600 })}${txt(s.b, bx + 30, 30, { s: 11, c: 'g', w: 600 })}
        ${reg('a', ax - 24, cy + 5, 'ink')}${reg('ab', (ax + bx) / 2, cy + 5, 'ink')}${reg('b', bx + 24, cy + 5, 'ink')}${reg('out', W - 40, H - 24, 'mute')}`;
    },
    arbol(s) {
      const L = s.levels, x0 = 30, dx = (W - 76) / L.length;
      let nodes = [[x0, 80]], out = `<circle cx="${x0}" cy="80" r="4" style="fill:var(--ink)"/>`, span = 132;
      L.forEach((lv, li) => {
        const next = [], each = span / nodes.length;
        nodes.forEach(([x, y]) => {
          for (let k = 0; k < lv.n; k++) {
            const yy = y + (k - (lv.n - 1) / 2) * (each / lv.n), xx = x + dx, c = lv.c?.[k] || (k % 2 ? 'g' : 'a');
            out += `<path d="M${x + 5} ${y} L${xx - 8} ${yy}" fill="none" style="stroke:${col(c)}" stroke-width="1.6" stroke-linecap="round" opacity=".75"${at(lv.b, 'draw')}/><circle cx="${xx}" cy="${yy}" r="${nodes.length * lv.n > 8 ? 3 : 4.5}" style="fill:${col(c)}"${at(lv.b)}/>`;
            if (lv.labels && nodes.length * lv.n <= 8) out += txt(lv.labels[k], xx, yy - 8, { s: 10.5, w: 600, c, b: lv.b });
            next.push([xx, yy]);
          }
        });
        if (lv.name) out += txt(lv.name, x0 + dx * (li + 1), 162, { s: 10, c: 'mute', b: lv.b });
        nodes = next;
      });
      return out + (s.foot ? txt(s.foot.t, W - 14, 20, { a: 'end', s: 13, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    tabla(s) {
      const nc = s.cols.length, nr = s.rows.length, hw = s.hw ?? 46, cw = Math.min(46, (W - 28 - hw) / nc), ch = Math.min(26, (H - 44) / nr), x0 = (W - hw - cw * nc) / 2 + hw, y0 = 34;
      let out = s.cols.map((c, j) => txt(c, x0 + cw * (j + .5), y0 - 8, { s: 10.5, c: 'a', w: 600 })).join('') + s.rows.map((r, i) => txt(r, x0 - 8, y0 + ch * (i + .5) + 4, { s: 10.5, c: 'g', w: 600, a: 'end' })).join('');
      (s.hl || []).forEach(h => { out += `<rect x="${x0 + cw * h.c + 1.5}" y="${y0 + ch * h.r + 1.5}" width="${cw * (h.cs || 1) - 3}" height="${ch * (h.rs || 1) - 3}" rx="5" style="fill:${fill(h.col || 'ok', 34)};stroke:${col(h.col || 'ok')}" stroke-width="1.4"${at(h.b)}/>`; });
      for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) {
        out += `<rect x="${x0 + cw * j}" y="${y0 + ch * i}" width="${cw}" height="${ch}" fill="none" style="stroke:var(--line)" stroke-width="1"/>`;
        const v = s.cells?.[i]?.[j]; if (v != null && v !== '') out += txt(v.t ?? v, x0 + cw * (j + .5), y0 + ch * (i + .5) + 4, { s: 11, b: v.b });
      }
      return out + (s.foot ? txt(s.foot.t, W / 2, H - 6, { s: 12, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    ciclo(s) {
      const n = s.items.length, cx = W / 2, cy = 86, R = 56, P = i => [cx + R * Math.sin(2 * Math.PI * i / n), cy - R * Math.cos(2 * Math.PI * i / n)];
      let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" style="stroke:var(--line)" stroke-width="1.5" stroke-dasharray="2 5"/>`;
      (s.marks || []).forEach(m => { const [x, y] = P(m.i); out += `<circle cx="${x}" cy="${y}" r="17" style="fill:${fill(m.c || 'ok', 36)};stroke:${col(m.c || 'ok')}" stroke-width="1.8"${at(m.b)}/>`; });
      s.items.forEach((t, i) => { const [x, y] = P(i); out += `<circle cx="${x}" cy="${y}" r="13" style="fill:var(--card);stroke:${col('a')}" stroke-width="1.3"${at(s.b?.[i])}/>${txt(t, x, y + 4.5, { s: 12.5, w: 600, b: s.b?.[i] })}`; });
      return out + (s.center ? txt(s.center.t, cx, cy + 5, { s: 13, w: 600, c: s.center.c || 'a', b: s.center.b }) : '') + (s.foot ? txt(s.foot.t, cx, H - 5, { s: 12, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    figura(s) {
      return s.shapes.map(h => {
        const st = `fill:${h.fill ? fill(h.fill, h.k2 || 26) : 'none'};stroke:${col(h.c)}`, sw = ` stroke-width="${h.sw || 1.8}" stroke-linejoin="round" stroke-linecap="round"${h.dash ? ' stroke-dasharray="4 4"' : ''}`;
        if (h.k === 'poly') return `<path d="M${h.pts.map(p => p.join(' ')).join(' L')}${h.open ? '' : ' Z'}" style="${st}"${sw}${at(h.b, h.fill ? 'pop' : 'draw')}/>`;
        if (h.k === 'line') return `<path d="M${h.pts[0].join(' ')} L${h.pts[1].join(' ')}" style="${st}"${sw}${at(h.b, 'draw')}/>`;
        if (h.k === 'circle') return `<circle cx="${h.at[0]}" cy="${h.at[1]}" r="${h.r}" style="${st}"${sw}${at(h.b)}/>`;
        if (h.k === 'rect') return `<rect x="${h.at[0]}" y="${h.at[1]}" width="${h.w}" height="${h.h}" rx="${h.rx ?? 4}" style="${st}"${sw}${at(h.b)}/>`;
        return txt(h.t, h.at[0], h.at[1], { s: h.s || 12, w: h.w || 600, c: h.c || 'ink', a: h.a, b: h.b });
      }).join('');
    },
    pasos(s) {
      const n = s.lines.length, dy = Math.min(34, (H - 30) / n), y0 = (H - dy * (n - 1)) / 2 + 5;
      return s.lines.map((l, i) => txt(l.t ?? l, W / 2, y0 + dy * i, { s: l.s || (i === n - 1 ? 17 : 15), w: 600, c: l.c || (i === n - 1 ? 'ok' : 'ink'), b: l.b ?? i })).join('');
    },
  };

  const svg = id => { const c = CONCEPTOS[id]; return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(c.title)}">${build[c.scene.type](c.scene)}</svg>`; };
  // Tiempos que usa el dibujo (para la prueba: ninguno debe pasar del último rótulo).
  const maxBeat = id => Math.max(0, ...[...svg(id).matchAll(/data-b="(\d+)"/g)].map(m => +m[1]));

  // Abre la tarjeta sobre `root` (la pantalla del reto). Devuelve la función que la cierra.
  function open(root, id) {
    const c = CONCEPTOS[id];
    if (!c) return () => {};
    const still = !window.anime || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const veil = document.createElement('div');
    veil.className = 'con-veil';
    veil.innerHTML = `<div class="con-card" role="dialog" aria-modal="true" aria-label="${e(c.title)}">
      <div class="con-top"><div><small>Recuerda el concepto</small><h3>${e(c.title)}</h3></div></div>
      <div class="con-stage">${svg(id)}</div>
      <p class="con-cap" aria-live="polite"></p>
      <div class="con-dots">${c.beats.map(() => '<i></i>').join('')}</div>
      <div class="con-row"><button type="button" class="btn ghost" data-again>Repetir</button><button type="button" class="btn main" data-ok>Entendido</button></div>
    </div>`;
    root.appendChild(veil);
    const cap = veil.querySelector('.con-cap'), dots = [...veil.querySelectorAll('.con-dots i')], parts = [...veil.querySelectorAll('[data-b]')];
    const T = s => { s = s.replace(/(\d) %/g, '$1 %'); return typeof tex === 'function' ? tex(s) : s; };
    let timer = 0, alive = true;
    const hide = el => { el.style.opacity = 0; if (el.dataset.fx === 'draw') { const n = el.getTotalLength?.() || 200; el.style.strokeDasharray = n; el.style.strokeDashoffset = n; el.style.opacity = 1; } };
    function beat(k) {
      if (!alive) return;
      cap.innerHTML = T(c.beats[k]);
      dots.forEach((d, i) => d.classList.toggle('on', i <= k));
      const now = parts.filter(p => +p.dataset.b === k);
      if (still) now.forEach(p => { p.style.opacity = 1; p.style.strokeDashoffset = 0; });
      else {
        anime({ targets: cap, opacity: [0, 1], translateY: [6, 0], duration: 320, easing: 'easeOutQuad' });
        anime({ targets: now.filter(p => p.dataset.fx === 'draw'), strokeDashoffset: 0, duration: 700, delay: anime.stagger(90), easing: 'easeInOutSine' });
        anime({ targets: now.filter(p => p.dataset.fx !== 'draw'), opacity: [0, 1], translateY: [7, 0], duration: 460, delay: anime.stagger(70, { start: 120 }), easing: 'easeOutCubic' });
      }
      if (k + 1 < c.beats.length) timer = setTimeout(() => beat(k + 1), still ? 0 : 1500 + c.beats[k].replace(/\$[^$]*\$/g, 'xxxx').length * 42);
    }
    const play = () => { clearTimeout(timer); if (!still) { window.anime.remove(parts); parts.forEach(hide); } beat(0); };
    const close = () => { if (!alive) return; alive = false; clearTimeout(timer); window.anime?.remove(parts); veil.classList.remove('open'); setTimeout(() => veil.remove(), 220); };
    veil.addEventListener('click', ev => { if (ev.target === veil || ev.target.closest('[data-ok]')) close(); else if (ev.target.closest('[data-again]')) play(); });
    requestAnimationFrame(() => { veil.classList.add('open'); play(); veil.querySelector('[data-ok]').focus({ preventScroll: true }); });
    return close;
  }
  return { svg, maxBeat, open, types: Object.keys(build) };
})();
