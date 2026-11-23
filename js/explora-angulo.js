// Explora · escena «angulo» (spec 2026-11-23-explora-leccion-interactiva, lección trig-41a): una rueda donde el lado terminal
// se arrastra con el dedo. Se puede girar más de una vuelta y hacia atrás; una espiral muestra el giro (positivo, color del
// curso; negativo, naranja). En las explicaciones, cada momento puede mostrar el radio (`radio`), el arco sobre la
// circunferencia (`arco`), radios de un radián puestos uno tras otro (`radios`) o un rótulo propio (`etiqueta`).
// Va después de js/explora.js (usa XP, XPD, XS, xpSpring, xpTick, xpMenos, xpClamp).

const xpGcd = (a, b) => (b ? xpGcd(b, a % b) : a);
// Grados enteros → radianes con π (en TeX y en texto plano).
function xpRad(deg, tex = true) {
  if (!deg) return '0';
  const g = xpGcd(Math.abs(deg), 180), n = Math.abs(deg / g), d = 180 / g, sg = deg < 0 ? (tex ? '-' : '−') : '';
  const pi = tex ? '\\pi' : 'π', num = n === 1 ? pi : `${n}${pi}`;
  if (d === 1) return `${sg}${num}`;
  return tex ? `${sg}\\tfrac{${num}}{${d}}` : `${sg}${num}/${d}`;
}
const xpGiro = x => ((x % 360) + 540) % 360 - 180;   // diferencia de ángulos en [−180, 180)

// Ángulo: `meta` (grados) o, con `cot`, cualquier coterminal de `cot` distinto de él. `etq`: 'grados', 'rad' o 'ambos'.
XP.angulo = {
  ini: p => ({ deg: p.desde ?? 0 }),
  ok: (s, p) => (p.cot != null ? s.deg !== p.cot && ((s.deg - p.cot) % 360 + 360) % 360 === 0 : s.deg === p.meta),
  sol: p => ({ deg: p.cot != null ? p.cot + 360 : p.meta }),
  lee(s, p) {
    const g = `${s.deg}^\\circ`, r = xpRad(s.deg);
    return `$\\theta = ${p.etq === 'rad' ? r : p.etq === 'grados' ? g : `${g} = ${r}`}$`;
  },
  dice(s, p = {}) {
    const d = s.deg, a = Math.abs(d), v = Math.floor(a / 360), r = a % 360;
    if (!d) return p.pista || 'Arrastra el lado terminal para girar.';
    if (v) return `${v === 1 ? 'Una vuelta' : `${v} vueltas`}${r ? ` y ${r}° más` : v === 1 ? ' exacta' : ' exactas'}, ${d > 0 ? 'hacia adelante' : 'hacia atrás'}.`;
    return `Giraste ${a}° ${d > 0 ? 'contra las agujas del reloj: positivo' : 'como las agujas del reloj: negativo'}.`;
  },
};

XPD.angulo = (stage, p, s, api) => {
  const W = 340, H = 236, CX = 170, CY = 116, R = 82, lo = p.min ?? -720, hi = p.max ?? 720, paso = p.paso || 15;
  stage.innerHTML = `<svg class="xp-svg xa" viewBox="0 0 ${W} ${H}" role="slider" tabindex="0" aria-label="Ángulo: flechas para girar ${paso}°, Re Pág y Av Pág para un cuarto de vuelta" aria-valuemin="${lo}" aria-valuemax="${hi}">
    <line class="xa-ax" x1="${CX - R - 40}" y1="${CY}" x2="${CX + R + 40}" y2="${CY}"/>
    <line class="xa-ax" x1="${CX}" y1="${CY - R - 26}" x2="${CX}" y2="${CY + R + 26}"/>
    <circle class="xa-circ" cx="${CX}" cy="${CY}" r="${R}"/><g class="xp-dyn"></g></svg>`;
  const svg = stage.firstChild, dyn = svg.lastChild;
  let c = s.deg, touched = false, stop = null, lastD = s.deg, flags = {}, prev = 0;
  const P = (deg, r) => [CX + r * Math.cos(deg * Math.PI / 180), CY - r * Math.sin(deg * Math.PI / 180)];
  const camino = (a, b, rf) => {
    const n = Math.max(2, Math.ceil(Math.abs(b - a) / 4)), pts = [];
    for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n; pts.push(P(t, rf(t)).map(v => v.toFixed(1)).join(' ')); }
    return 'M' + pts.join(' L');
  };
  function draw() {
    const d = Math.round(c), neg = c < 0, RAD = 180 / Math.PI;
    if (d !== lastD) {
      if (Math.round(d / paso) !== Math.round(lastD / paso)) XS.tick(d / 24);
      if (Math.trunc(d / 360) !== Math.trunc(lastD / 360)) XS.pop();   // una vuelta completa
      lastD = d;
    }
    let h = '';
    // Sobre la circunferencia: radios de un radián, uno tras otro, o el arco que recorre el ángulo.
    if (flags.radios && Math.abs(c) > 0.5) {
      const sg = Math.sign(c);
      for (let k = 0; k * RAD < Math.abs(c); k++) {
        h += `<path class="xa-rad${k % 2 ? ' b' : ''}" d="${camino(sg * k * RAD, sg * Math.min((k + 1) * RAD, Math.abs(c)), () => R)}"/>`;
        if ((k + 1) * RAD <= Math.abs(c)) { const m = P(sg * (k + 0.5) * RAD, R + 15); h += `<text class="xa-rl" x="${m[0]}" y="${m[1] + 5}">${k + 1}</text>`; }
      }
    } else if (flags.arco && Math.abs(c) > 0.5) {
      h += `<path class="xa-rad" d="${camino(0, c, () => R)}"/>`;
      if (Math.abs(Math.abs(c) - RAD) < 1.5) { const m = P(c / 2, R + 15); h += `<text class="xa-rl" x="${m[0]}" y="${m[1] + 5}">r</text>`; }
    }
    if (flags.radio) h += `<line class="xa-r" x1="${CX}" y1="${CY}" x2="${CX + R}" y2="${CY}"/><text class="xa-rl" x="${CX + R / 2}" y="${CY + 18}">r</text>`;
    // El giro: una espiral que se abre con cada vuelta, con su flecha.
    if (Math.abs(c) > 1) {
      const rf = t => 20 + 9 * Math.abs(t) / 360, e = P(c, rf(c)), e0 = P(c - Math.sign(c) * 8, rf(c - Math.sign(c) * 8));
      const ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]);
      h += `<path class="xa-spin${neg ? ' neg' : ''}" d="${camino(0, c, rf)}"/>`
        + `<path class="xa-spin${neg ? ' neg' : ''}" d="M${e[0] - 9 * Math.cos(ang - 0.5)} ${e[1] - 9 * Math.sin(ang - 0.5)} L${e[0]} ${e[1]} L${e[0] - 9 * Math.cos(ang + 0.5)} ${e[1] - 9 * Math.sin(ang + 0.5)}"/>`;
    }
    const t = P(c, R + 14), lb = P(c, R + 50);
    h += `<line class="xa-ini" x1="${CX}" y1="${CY}" x2="${CX + R + 14}" y2="${CY}"/>`
      + `<line class="xa-term${neg ? ' neg' : ''}" x1="${CX}" y1="${CY}" x2="${t[0]}" y2="${t[1]}"/>`
      + `<circle class="xa-o" cx="${CX}" cy="${CY}" r="3.5"/>`;
    if (!touched) h += `<circle class="xp-halo" cx="${t[0]}" cy="${t[1]}" r="12"/>`;
    h += `<g class="xp-tok${neg ? ' flip' : ''}"><circle cx="${t[0]}" cy="${t[1]}" r="11"/></g>`;
    const etq = p.etq || 'ambos';
    const calc = etq === 'rad' ? xpRad(d, false) : etq === 'grados' ? `${xpMenos(d)}°` : `${xpMenos(d)}° = ${xpRad(d, false)}`;
    const txt = flags.etiqueta != null ? (Math.abs(c - (flags.a ?? c)) < 0.5 ? flags.etiqueta : '') : calc;
    const w = txt.length * 8, sn = Math.sin(c * Math.PI / 180);
    if (Math.abs(sn) > 0.8) {   // arriba o abajo: al lado de la manija
      const der = t[0] + 20 + w <= W - 4;
      h += `<text class="xa-lab" text-anchor="${der ? 'start' : 'end'}" x="${der ? t[0] + 20 : t[0] - 20}" y="${t[1] + 5}">${txt}</text>`;
    } else h += `<text class="xa-lab" x="${xpClamp(lb[0], w / 2 + 4, W - w / 2 - 4)}" y="${xpClamp(lb[1] + 5, 16, H - 6)}">${txt}</text>`;
    dyn.innerHTML = h;
    svg.setAttribute('aria-valuenow', String(d));
    svg.setAttribute('aria-valuetext', `${d} grados`);
  }
  const raw = e => {
    const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width - CX, y = (e.clientY - r.top) * H / r.height - CY;
    return Math.atan2(-y, x) * 180 / Math.PI;
  };
  const fija = () => { const d = xpClamp(Math.round(c / paso) * paso, lo, hi); if (d !== s.deg) { s = { deg: d }; xpTick(); api.set(s, true); } };
  let dedo = null;
  const lejos = e => { const r = svg.getBoundingClientRect(); return Math.hypot((e.clientX - r.left) * W / r.width - CX, (e.clientY - r.top) * H / r.height - CY) > 18; };
  svg.onpointerdown = e => {
    if (dedo != null || !lejos(e)) return;
    dedo = e.pointerId; touched = true; stop?.();
    try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
    svg.classList.add('drag');
    prev = raw(e); c = xpClamp(c + xpGiro(prev - c), lo, hi);   // el lado terminal salta al dedo por el camino más corto
    fija(); draw();
    svg.onpointermove = ev => {
      if (ev.pointerId !== dedo) return;
      const a = raw(ev);
      if (lejos(ev)) { c = xpClamp(c + xpGiro(a - prev), lo, hi); fija(); draw(); }
      prev = a;
    };
  };
  svg.onpointerup = svg.onpointercancel = e => {
    if (!svg.onpointermove || e.pointerId !== dedo) return;
    dedo = null; svg.onpointermove = null; svg.classList.remove('drag');
    api.set(s);   // la meta cuenta donde se suelta
    stop = xpSpring(c, s.deg, x => { c = x; draw(); });
  };
  svg.onkeydown = e => {
    const k = { ArrowRight: paso, ArrowUp: paso, ArrowLeft: -paso, ArrowDown: -paso, PageUp: 90, PageDown: -90 }[e.key];
    if (k == null && e.key !== 'Home') return;
    e.preventDefault(); touched = true; stop?.();
    c = e.key === 'Home' ? 0 : xpClamp(s.deg + k, lo, hi);
    s = { deg: Math.round(c) }; xpTick(); api.set(s); draw();
  };
  draw();
  return Object.assign(() => stop?.(), { mover(x, m) { touched = true; if (m) flags = m; c = x; s = { deg: Math.round(x) }; draw(); } });
};
