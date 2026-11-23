// Explora: la explicación interactiva que ocupa el lugar del video (spec 2026-11-23-explora-leccion-interactiva).
// El estudiante construye la idea paso a paso: una frase, una escena que se arrastra y una meta. Al cumplirla se revela
// la idea, que entra al «andamio» (lo que lleva construido). Sin vidas, sin reloj y sin «Comprobar».
//
//   EXPLORA['<id de lección>'] = { caps: ['Capítulo', …], pasos: [{ cap, tipo, texto, idea, …parámetros }] }
//   XP[tipo]  = { ini(p) → estado, ok(estado, p), sol(p) → estado cumplido, lee(estado, p) → renglón en TeX }   (puro)
//   XPD[tipo] = (escena, p, estado, api) → dibuja y escucha el dedo; api.set(estado), api.nota(texto), api.memo
// Va después de ui.js y antes de player.js (makePlayer llama a exploraPlayer).

const EXPLORA = {};
const XP = {};

const xpPar = n => (n < 0 ? `(${n})` : `${n}`);            // en TeX: un negativo va entre paréntesis
const xpMenos = n => String(n).replace('-', '−');           // en pantalla: menos tipográfico
const xpSigno = n => (n > 0 ? '+' : '') + xpMenos(n);
const xpPasos = n => `${n} ${n === 1 ? 'paso' : 'pasos'}`;

XP.apuesta = {
  ini: () => ({ pick: null }),
  ok: s => s.pick != null,
  sol: p => ({ pick: p.opciones[0] }),
  lee: () => '',
};

// Ficha en la recta. modo: 'llegar' (a meta), 'espejo' (el reflejo cae en meta), 'distancia' (desde `ancla`),
// 'salto' (sale de `desde`; con `resta` la cuenta es desde − resta) y 'dos' (tocar los lugares a `dist` de `ancla`).
XP.recta = {
  ini: p => (p.modo === 'dos' ? { sel: [] } : { v: p.desde }),
  ok(s, p) {
    if (p.modo === 'dos') return s.sel.length === p.metas.length && p.metas.every(m => s.sel.includes(m));
    return (p.modo === 'espejo' ? -s.v : s.v) === p.meta;
  },
  sol: p => (p.modo === 'dos' ? { sel: [...p.metas] } : { v: p.modo === 'espejo' ? -p.meta : p.meta }),
  lee(s, p) {
    if (p.modo === 'dos') return s.sel.length ? s.sel.map(m => `$|{${m}} - ${xpPar(p.ancla)}| = ${Math.abs(m - p.ancla)}$`).join(' · ') : '';
    if (p.modo === 'espejo') return `$-(${s.v}) = ${-s.v}$`;
    if (p.modo === 'distancia') return `$|{${s.v}} - ${xpPar(p.ancla)}| = ${Math.abs(s.v - p.ancla)}$`;
    if (p.modo === 'salto') {
      if (p.resta != null) return `$${p.desde} - ${xpPar(p.resta)} = ${s.v === p.meta ? s.v : '\\,?'}$`;
      const d = s.v - p.desde;
      return d ? `$${p.desde} + ${xpPar(d)} = ${s.v}$` : `$${p.desde}$`;
    }
    return `$${s.v}$`;
  },
  // La frase con que la escena responde a cada movimiento (todas las `dice` son puras).
  dice(s, p) {
    if (p.modo === 'dos') {
      const m = s.sel.at(-1);
      if (m == null) return `Cuenta ${xpPasos(p.dist)} desde el ${xpMenos(p.ancla)}, hacia un lado.`;
      const d = Math.abs(m - p.ancla);
      if (d !== p.dist) return `El ${xpMenos(m)} está a ${xpPasos(d)} del ${xpMenos(p.ancla)}, no a ${p.dist}.`;
      return `El ${xpMenos(m)} está a ${xpPasos(d)}: sirve.${XP.recta.ok(s, p) ? '' : ' Falta el del otro lado.'}`;
    }
    const v = s.v;
    if (p.modo === 'espejo') {
      return v === 0 ? 'En el 0 la ficha y su reflejo se juntan: el opuesto de 0 es 0.'
        : `Tu ficha está a ${xpPasos(Math.abs(v))} del 0. Su reflejo también, al otro lado.`;
    }
    if (p.modo === 'distancia') {
      const d = Math.abs(v - p.ancla), lo = Math.min(v, p.ancla), hi = Math.max(v, p.ancla);
      if (!d) return 'Sin moverse, la distancia es 0.';
      return `De ${xpMenos(p.ancla)} a ${xpMenos(v)} hay ${xpPasos(d)}.${lo < 0 && hi > 0 ? ` Son ${-lo} hasta el 0 y ${hi} más.` : ''}`;
    }
    if (p.modo === 'salto') {
      const d = v - p.desde, n = p.resta != null ? -p.resta : p.suma;
      if (!d) return 'La ficha aún no se mueve.';
      if (n == null) return `Te moviste ${xpPasos(Math.abs(d))} a la ${d > 0 ? 'derecha' : 'izquierda'}.`;
      if (Math.sign(d) !== Math.sign(n)) {
        return p.resta != null ? `Así estarías sumando ${xpMenos(p.resta)}. Restar va al otro lado.` : `Sumar ${xpMenos(n)} va hacia la ${n > 0 ? 'derecha' : 'izquierda'}.`;
      }
      if (Math.abs(d) < Math.abs(n)) return `Llevas ${Math.abs(d)} de ${xpPasos(Math.abs(n))}.`;
      return Math.abs(d) > Math.abs(n) ? `Te pasaste: eran ${xpPasos(Math.abs(n))}.` : 'Justo ahí.';
    }
    return v === 0 ? 'El 0 no es positivo ni negativo: es la frontera.'
      : `Estás en ${xpMenos(v)}: a la ${v > 0 ? 'derecha del 0, es positivo' : 'izquierda del 0, es negativo'}.`;
  },
};

// Cadena de b saltos iguales de tamaño a que sale del 0; se arrastra la punta. Con b negativo la cadena se voltea.
XP.saltos = {
  ini: p => ({ b: p.desde ?? 1 }),
  ok: (s, p) => p.a * s.b === p.meta,
  sol: p => ({ b: p.meta / p.a }),
  lee: (s, p) => `$${xpPar(p.a)} \\cdot ${xpPar(s.b)} = ${p.a * s.b}$`,
  dice(s, p) {
    const n = Math.abs(s.b), t = `${n} ${n === 1 ? 'salto' : 'saltos'}`;
    if (!s.b) return 'Cero saltos: te quedas en el 0.';
    return s.b > 0 ? `${t} de ${xpMenos(p.a)}: vas por ${xpMenos(p.a * s.b)}.` : `Cruzaste el 0 y la cadena se volteó: ${t} al revés, ${xpMenos(p.a * s.b)}.`;
  },
  // Veces que corresponden a la posición x de la punta, sin salirse de la recta.
  veces(x, p) {
    let b = Math.round(x / p.a);
    while (p.a * b > p.max || p.a * b < p.min) b -= Math.sign(b);
    return b || 0;
  },
};

// Factores que se tocan para cambiarles el signo; hay que usar `menos` signos menos.
XP.signos = {
  ini: p => ({ neg: p.factores.map(() => false) }),
  valor: (s, p) => p.factores.reduce((t, f, i) => t * (s.neg[i] ? -f : f), 1),
  ok: (s, p) => s.neg.filter(Boolean).length === p.menos,
  sol: p => ({ neg: p.factores.map((_, i) => i < p.menos) }),
  lee: (s, p) => `$${p.factores.map((f, i) => `(${s.neg[i] ? -f : f})`).join('')} = ${XP.signos.valor(s, p)}$`,
  dice(s) {
    const n = s.neg.filter(Boolean).length;
    if (!n) return 'Sin signos menos nadie da la vuelta: positivo.';
    return n % 2 ? `${n === 1 ? 'Una vuelta' : `${n} vueltas`}: quedas mirando al lado negativo.` : `${n} vueltas: vuelves a mirar al lado positivo.`;
  },
};

// Predice y mira: se elige qué va a pasar y la escena (`escena`: 'recta' o 'saltos', con parámetros `en`) se anima sola
// de `de` a `a`. No se califica: acertar o no cambia la frase (`porque` explica al que no acertó).
XP.predice = {
  ini: () => ({ pick: null, visto: false }),
  ok: s => s.visto,
  sol: p => ({ pick: p.bien, visto: true }),
  lee: (s, p) => (s.visto ? p.cuenta : ''),
  dice(s, p) {
    if (s.pick == null) return 'Elige, y la escena te muestra qué pasa.';
    if (!s.visto) return 'Mira…';
    return s.pick === p.bien ? 'Lo viste venir.' : p.porque;
  },
};

// Explicación: la escena (`escena` con parámetros `en`) muestra la idea sola, por momentos { dice, de, a, cuenta };
// el estudiante toca para pasar al siguiente. No pide nada: se cumple al ver el último momento.
XP.muestra = {
  ini: () => ({ n: 0, fin: false }),
  ok: (s, p) => s.fin && s.n >= p.momentos.length,
  sol: p => ({ n: p.momentos.length, fin: true }),
  lee: (s, p) => p.momentos[Math.max(0, s.n - 1)].cuenta || '',
  dice: (s, p) => p.momentos[Math.max(0, s.n - 1)].dice,
};

// Jerarquía: la expresión son fichas (números y operadores separados por espacios) y se toca la operación que sigue.
const XP_CAPA = { paren: 'Antes va lo que está dentro del paréntesis.', pot: 'Antes va la potencia.',
  mul: 'Antes van × y ÷, de izquierda a derecha.', sum: 'Sumas y restas van de izquierda a derecha.' };
XP.capas = {
  ini: p => ({ toks: p.expr.split(' ').map(t => (/^-?\d+$/.test(t) ? +t : t)), fallos: 0 }),
  ok: s => s.toks.length === 1,
  // Índice del operador que toca: dentro del paréntesis más interno, ^ primero, luego × ÷, luego + −.
  sigue(toks) {
    const hi = toks.indexOf(')'), lo = hi < 0 ? -1 : toks.lastIndexOf('(', hi);
    const a = lo + 1, b = hi < 0 ? toks.length : hi;
    for (const ops of ['^', '*/', '+-']) {
      for (let i = a; i < b; i++) if (typeof toks[i] === 'string' && ops.includes(toks[i])) return i;
    }
    return -1;
  },
  capa(toks, i) { return toks.includes(')') ? 'paren' : toks[i] === '^' ? 'pot' : '*/'.includes(toks[i]) ? 'mul' : 'sum'; },
  aplica(s, i) {
    const t = [...s.toks], a = t[i - 1], b = t[i + 1];
    const r = { '+': a + b, '-': a - b, '*': a * b, '/': a / b, '^': a ** b }[t[i]];
    t.splice(i - 1, 3, r);
    if (t[i - 2] === '(' && t[i] === ')') t.splice(i - 2, 3, r);   // un paréntesis con un solo número ya no hace falta
    return { toks: t, fallos: s.fallos };
  },
  toca(s, i) {
    const n = XP.capas.sigue(s.toks);
    return i === n ? XP.capas.aplica(s, i) : { ...s, fallos: s.fallos + 1, fallo: XP.capas.capa(s.toks, n) };
  },
  sol(p) { let s = XP.capas.ini(p); while (!XP.capas.ok(s)) s = XP.capas.aplica(s, XP.capas.sigue(s.toks)); return s; },
  lee: () => '',
  dice(s) {
    const n = s.toks.filter(t => typeof t === 'string' && '+-*/^'.includes(t)).length;
    return n ? `${n === 1 ? 'Queda una operación' : `Quedan ${n} operaciones`}.` : 'Quedó un solo número: ese es el resultado.';
  },
};

// Fichas a casillas: cada fila { tex, r } recibe la ficha r.
XP.casillas = {
  ini: p => ({ puesto: p.filas.map(() => null) }),
  ok: (s, p) => p.filas.every((f, i) => s.puesto[i] === f.r),
  sol: p => ({ puesto: p.filas.map(f => f.r) }),
  lee: () => '',
};

XP.cierre = { ini: () => ({}), ok: () => true, sol: () => ({}), lee: () => '' };

// ------------------------------------------------------------------------------------------------------------------
// Dibujo. Nada de lo que sigue corre al cargar el archivo (las pruebas lo cargan sin navegador).

const xpStill = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const xpTick = () => { try { if (navigator.userActivation?.hasBeenActive) navigator.vibrate?.(6); } catch (e) { /* sin vibración */ } };

// Resorte: lleva un valor de `from` a `to` llamando a `on` en cada cuadro. Devuelve cómo detenerlo.
function xpSpring(from, to, on) {
  if (xpStill() || from === to) { on(to); return () => {}; }
  let x = from, v = 0, last = performance.now(), id = 0;
  const f = t => {
    const dt = Math.min(0.032, (t - last) / 1000); last = t;
    v += (-260 * (x - to) - 22 * v) * dt; x += v * dt;
    if (Math.abs(x - to) < 0.004 && Math.abs(v) < 0.04) return on(to);
    on(x); id = requestAnimationFrame(f);
  };
  id = requestAnimationFrame(f);
  return () => cancelAnimationFrame(id);
}

// Recorrido con tiempo fijo y arranque y frenada suaves (para lo que la escena muestra sola).
function xpTween(from, to, ms, on, done) {
  if (xpStill()) { on(to); done(); return () => {}; }
  let t0 = 0, id = requestAnimationFrame(function f(t) {
    t0 ||= t;
    const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    on(from + (to - from) * e);
    if (k < 1) id = requestAnimationFrame(f); else done();
  });
  return () => cancelAnimationFrame(id);
}

// Destello al ganar una idea: chispas que salen del centro de la escena.
function xpChispas(stage) {
  if (xpStill()) return;
  const r = stage.getBoundingClientRect(), host = stage.closest('.explora');
  if (!host) return;
  const h = host.getBoundingClientRect();
  for (let k = 0; k < 10; k++) {
    const d = document.createElement('i'), ang = (k / 10) * 2 * Math.PI + 0.3, far = 46 + 26 * (k % 3);
    d.className = 'xp-chispa';
    d.style.left = r.left - h.left + r.width / 2 + 'px'; d.style.top = r.top - h.top + r.height / 2 + 'px';
    host.appendChild(d);
    d.animate([{ transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * far}px), calc(-50% + ${Math.sin(ang) * far}px)) scale(.2)`, opacity: 0 }],
    { duration: 620, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => d.remove();
  }
}

const XP_W = 340, XP_H = 156, XP_PAD = 24, XP_Y = 108;
function xpAxis(stage, p, cada = 1) {
  const n = p.max - p.min, X = v => XP_PAD + (v - p.min) / n * (XP_W - 2 * XP_PAD);
  let h = `<line class="xp-ax" x1="8" y1="${XP_Y}" x2="${XP_W - 8}" y2="${XP_Y}"/>`;
  for (let v = p.min; v <= p.max; v++) {
    const big = v % cada === 0;
    h += `<line class="xp-tk${v === 0 ? ' z' : ''}" x1="${X(v)}" y1="${XP_Y - (big ? 6 : 3)}" x2="${X(v)}" y2="${XP_Y + (big ? 6 : 3)}"/>`;
    if (big) h += `<text class="xp-lb${v === 0 ? ' z' : ''}" x="${X(v)}" y="${XP_Y + 24}">${xpMenos(v)}</text>`;
  }
  stage.innerHTML = `<svg class="xp-svg" viewBox="0 0 ${XP_W} ${XP_H}" role="img">${h}<g class="xp-dyn"></g></svg>`;
  const svg = stage.firstChild;
  // Posición del dedo en unidades de la recta.
  const at = e => { const r = svg.getBoundingClientRect(); return p.min + ((e.clientX - r.left) * XP_W / r.width - XP_PAD) / (XP_W - 2 * XP_PAD) * n; };
  return { svg, dyn: svg.querySelector('.xp-dyn'), X, at };
}
const xpArc = (x1, x2, h, cls) => `<path class="${cls}" d="M${x1} ${XP_Y} Q${(x1 + x2) / 2} ${XP_Y - h * 2} ${x2} ${XP_Y}"/>`;
const xpClamp = (x, a, b) => Math.max(a, Math.min(b, x));

const XPD = {};
const XP_MEM = {};   // por lección: { memo, estados, hechos, i } (ver exploraPlayer)

XPD.recta = (stage, p, s, api) => {
  const { svg, dyn, X, at } = xpAxis(stage, p);
  let c = s.v ?? 0, touched = false, stop = null;
  const tok = (x, t, cls = '') => `<g class="xp-tok ${cls}"><circle cx="${x}" cy="${XP_Y}" r="15"/><text x="${x}" y="${XP_Y + 5}">${xpMenos(t)}</text></g>`;
  function draw() {
    const v = Math.round(c), x = X(c);
    let h = '';
    if (p.modo === 'dos') {
      h += `<circle class="xp-anc" cx="${X(p.ancla)}" cy="${XP_Y}" r="6"/>`;
      for (const m of s.sel) {
        h += xpArc(X(p.ancla), X(m), 17, `xp-arc${Math.abs(m - p.ancla) === p.dist ? ' good' : ''}`)
          + `<text class="xp-tag" x="${(X(p.ancla) + X(m)) / 2}" y="${XP_Y - 42}">${Math.abs(m - p.ancla)}</text>`
          + `<circle class="xp-ring${Math.abs(m - p.ancla) === p.dist ? ' good' : ''}" cx="${X(m)}" cy="${XP_Y}" r="11"/>`;
      }
      dyn.innerHTML = h; return;
    }
    if (p.modo === 'espejo') {
      h += `<line class="xp-mir" x1="${X(0)}" y1="${XP_Y - 70}" x2="${X(0)}" y2="${XP_Y + 10}"/>`
        + `<line class="xp-link" x1="${x}" y1="${XP_Y}" x2="${X(-c)}" y2="${XP_Y}"/>` + tok(X(-c), -v, 'ghost');
    }
    if (p.modo === 'distancia') {
      h += `<circle class="xp-anc" cx="${X(p.ancla)}" cy="${XP_Y}" r="6"/>` + xpArc(X(p.ancla), x, 20, 'xp-arc');
      const a = Math.min(p.ancla, v), b = Math.max(p.ancla, v);
      for (let k = a + 1; k <= b; k++) h += `<circle class="xp-step-dot" cx="${X(k - 0.5)}" cy="${XP_Y - 12}" r="2.4"/>`;
      if (v !== p.ancla) h += `<text class="xp-tag" x="${(X(p.ancla) + x) / 2}" y="${XP_Y - 48}">${Math.abs(v - p.ancla)} ${Math.abs(v - p.ancla) === 1 ? 'paso' : 'pasos'}</text>`;
    }
    if (p.modo === 'salto') {
      const x0 = X(p.desde), y = XP_Y - 40, d = v - p.desde, dir = Math.sign(c - p.desde);
      h += `<circle class="xp-anc hollow" cx="${x0}" cy="${XP_Y}" r="7"/>`;
      if (Math.abs(c - p.desde) > 0.15) {
        h += `<line class="xp-arrow" x1="${x0}" y1="${y}" x2="${x - dir * 7}" y2="${y}"/>`
          + `<path class="xp-head" d="M${x} ${y} l${-dir * 10} -6 v12 z"/>`
          + `<text class="xp-tag" x="${(x0 + x) / 2}" y="${y - 11}">${xpSigno(d)}</text>`;
      }
    }
    if (!touched) h += `<circle class="xp-halo" cx="${x}" cy="${XP_Y}" r="15"/>`;
    dyn.innerHTML = h + tok(x, v);
  }
  if (p.modo === 'dos') {
    svg.onpointerdown = e => {
      const m = xpClamp(Math.round(at(e)), p.min, p.max);
      if (m === p.ancla) return;
      s = { sel: s.sel.includes(m) ? s.sel.filter(k => k !== m) : [...s.sel, m].slice(-p.metas.length) };
      xpTick(); api.set(s); draw();
    };
  } else {
    const move = e => {
      c = xpClamp(at(e), p.min, p.max);
      if (Math.round(c) !== s.v) { s = { v: Math.round(c) }; xpTick(); api.set(s, true); }
      draw();
    };
    svg.onpointerdown = e => { touched = true; stop?.(); svg.setPointerCapture(e.pointerId); svg.classList.add('drag'); move(e); svg.onpointermove = move; };
    svg.onpointerup = svg.onpointercancel = () => {
      svg.onpointermove = null; svg.classList.remove('drag');
      api.set(s);   // la meta cuenta donde se suelta la ficha, no por donde pasa
      stop = xpSpring(c, s.v, x => { c = x; draw(); });
    };
  }
  draw();
  // mover(x): lleva la ficha sin dedo (la usa «predice y mira»).
  return Object.assign(() => stop?.(), { mover(x) { touched = true; c = x; s = { v: Math.round(x) }; draw(); } });
};

XPD.saltos =(stage, p, s, api) => {
  const { svg, dyn, X, at } = xpAxis(stage, p, Math.abs(p.a));
  let c = p.a * s.b, touched = false, stop = null;
  function draw() {
    const b = s.b, n = Math.abs(b), paso = p.a * Math.sign(b), x = X(c);
    let h = `<circle class="xp-goal" cx="${X(p.meta)}" cy="${XP_Y}" r="15"/>`;
    for (let k = 0; k < n; k++) h += xpArc(X(paso * k), X(paso * (k + 1)), 13, `xp-hop${b < 0 ? ' flip' : ''}`);
    h += `<text class="xp-tag" x="${xpClamp(x, 70, XP_W - 70)}" y="${XP_Y - 44}">${xpMenos(b)} ${n === 1 ? 'vez' : 'veces'}${b < 0 ? ' · se voltea' : ''}</text>`;
    if (!touched) h += `<circle class="xp-halo" cx="${x}" cy="${XP_Y}" r="13"/>`;
    dyn.innerHTML = h + `<g class="xp-tok${b < 0 ? ' flip' : ''}"><circle cx="${x}" cy="${XP_Y}" r="13"/></g>`;
  }
  const move = e => {
    c = xpClamp(at(e), p.min, p.max);
    const b = XP.saltos.veces(c, p);
    if (b !== s.b) { s = { b }; xpTick(); api.set(s, true); }
    draw();
  };
  svg.onpointerdown = e => { touched = true; stop?.(); svg.setPointerCapture(e.pointerId); svg.classList.add('drag'); move(e); svg.onpointermove = move; };
  svg.onpointerup = svg.onpointercancel = () => {
    svg.onpointermove = null; svg.classList.remove('drag');
    api.set(s);
    stop = xpSpring(c, p.a * s.b, x => { c = x; draw(); });
  };
  draw();
  return Object.assign(() => stop?.(), { mover(x) { touched = true; c = x; s = { b: XP.saltos.veces(x, p) }; draw(); } });
};

// Predice y mira: la escena de adentro no se toca; al elegir, se anima sola de p.de a p.a.
XPD.predice = (stage, p, s, api) => {
  stage.innerHTML = `<div class="xp-watch"></div><div class="xp-tray">${p.opciones.map((o, k) => `<button type="button" class="xp-chip" data-k="${k}">${o}</button>`).join('')}</div>`;
  const box = stage.firstChild, chips = [...stage.querySelectorAll('.xp-chip')];
  const escena = XPD[p.escena](box, p.en, XP[p.escena].ini(p.en), { set() {}, nota() {}, memo: {} });
  let stop = null;
  if (!s.visto) s = XP.predice.ini();   // si se salió a media animación, se vuelve a elegir
  const marca =() => chips.forEach((c, k) => { c.disabled = s.pick != null; c.classList.toggle('on', s.pick === k); });
  escena.mover(s.visto ? p.a : p.de); marca();
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'); if (!chip || s.pick != null) return;
    s = { pick: +chip.dataset.k, visto: false }; xpTick(); api.set(s, true); marca();
    stop = xpTween(p.de, p.a, 1500, x => escena.mover(x), () => { s = { ...s, visto: true }; api.set(s); });
  };
  return () => { stop?.(); escena(); };
};

// Explicación por momentos: arranca sola; al terminar cada momento, un toque en la escena trae el siguiente.
XPD.muestra = (stage, p, s, api) => {
  stage.innerHTML = '<div class="xp-watch"></div><button type="button" class="xp-sigue" hidden></button>';
  const box = stage.firstChild, btn = stage.lastChild, total = p.momentos.length, mudo = { set() {}, nota() {}, memo: {} };
  let escena = null, stop = null, busy = false, timer = 0;
  const monta = () => { escena?.(); escena = XPD[p.escena](box, p.en, XP[p.escena].ini(p.en), mudo); };
  const espera = t => { btn.textContent = t; btn.hidden = false; };
  function play(n) {
    const m = p.momentos[n];
    busy = true; btn.hidden = true;
    s = { n: n + 1, fin: false }; api.set(s, true);
    const done = () => {
      busy = false;
      if (n + 1 < total) return espera('Toca para seguir');
      s = { n: total, fin: true }; api.set(s); espera('Ver otra vez');
    };
    if (escena.anima) stop = escena.anima(m, done);
    else if (m.a == null || m.a === m.de) { escena.mover(m.a ?? m.de); timer = setTimeout(done, 1200); stop = () => clearTimeout(timer); }
    else stop = xpTween(m.de, m.a, m.ms || 1500, x => escena.mover(x), done);
  }
  stage.onclick = () => {
    if (busy) return;
    xpTick();
    if (s.fin || s.n >= total) { monta(); play(0); } else play(s.n);
  };
  monta();
  if (s.fin) {   // ya vista: queda en su último cuadro y se puede repetir
    const u = p.momentos[total - 1];
    if (!escena.anima) escena.mover(u.a ?? u.de);
    espera('Ver otra vez');
  } else timer = setTimeout(() => play(0), 500);
  return () => { clearTimeout(timer); stop?.(); escena(); };
};

XPD.signos =(stage, p, s, api) => {
  stage.innerHTML = `<div class="xp-fact">${p.factores.map((f, i) => `<button type="button" class="xp-f" data-i="${i}"><span></span></button>`).join('<i>·</i>')}</div>
    <div class="xp-coin"><b></b><small></small></div>`;
  const coin = stage.querySelector('.xp-coin');
  function draw(flip) {
    stage.querySelectorAll('.xp-f').forEach((b, i) => {
      b.classList.toggle('neg', s.neg[i]); b.firstChild.textContent = xpMenos(s.neg[i] ? -p.factores[i] : p.factores[i]);
      if (flip === i && !xpStill()) b.animate([{ transform: 'rotateY(90deg)' }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
    const n = s.neg.filter(Boolean).length, v = XP.signos.valor(s, p);
    coin.classList.toggle('neg', v < 0);
    coin.querySelector('b').textContent = xpSigno(v);
    coin.querySelector('small').textContent = `${n} ${n === 1 ? 'signo menos' : 'signos menos'} · ${n % 2 ? 'impar' : 'par'}`;
    if (flip != null && !xpStill()) coin.animate([{ transform: 'rotateX(90deg) scale(.9)' }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  stage.onclick = e => {
    const b = e.target.closest('.xp-f'); if (!b) return;
    const i = +b.dataset.i;
    s = { neg: s.neg.map((x, k) => (k === i ? !x : x)) };
    xpTick(); api.set(s); draw(i);
  };
  draw();
  // anima(m): en una explicación, voltea el signo del factor m.i (o solo espera si el momento no voltea nada).
  return Object.assign(() => {}, { anima(m, done) {
    if (m.i != null) { s = { neg: s.neg.map((x, k) => (k === m.i ? !x : x)) }; draw(m.i); }
    const t = setTimeout(done, 1000);
    return () => clearTimeout(t);
  } });
};

XPD.capas = (stage, p, s, api) => {
  const OP = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  function draw(nuevo) {
    const t = s.toks, h = [];
    for (let i = 0; i < t.length; i++) {
      if (typeof t[i] === 'number') {
        const par = t[i] < 0 && (i > 0 || t[i + 1] === '^');
        h.push(`<span class="xp-n${i === nuevo ? ' new' : ''}">${par ? '(' : ''}${xpMenos(t[i])}${par ? ')' : ''}</span>`);
      } else if (t[i] === '^') {   // el exponente va pegado a su base: no se separan al partir el renglón
        h.push(`<span class="xp-grp">${h.pop()}<button type="button" class="xp-op pow" data-i="${i}">${t[i + 1]}</button></span>`); i++;
      } else if (t[i] === '(' || t[i] === ')') h.push(`<span class="xp-par">${t[i]}</span>`);
      else h.push(`<button type="button" class="xp-op" data-i="${i}">${OP[t[i]]}</button>`);
    }
    stage.innerHTML = `<div class="xp-expr${XP.capas.ok(s) ? ' done' : ''}">${h.join('')}</div>`;
  }
  stage.onclick = e => {
    const b = e.target.closest('.xp-op'); if (!b || XP.capas.ok(s)) return;
    const i = +b.dataset.i, r = XP.capas.toca(s, i);
    if (r.fallo) {
      s = { toks: r.toks, fallos: r.fallos }; api.nota(XP_CAPA[r.fallo]);
      if (!xpStill()) b.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'none' }], { duration: 240 });
      return;
    }
    // La ficha nueva queda donde estaba el primer número de la operación (uno antes si se quitó un paréntesis).
    const nuevo = r.toks.length === s.toks.length - 4 ? i - 2 : i - 1;
    s = r; xpTick(); api.nota(''); api.set(s); draw(nuevo);
  };
  draw();
  // anima(): en una explicación, señala la operación que sigue y la funde sola.
  return Object.assign(() => {}, { anima(m, done) {
    const i = XP.capas.sigue(s.toks);
    let t2 = 0;
    stage.querySelector(`.xp-op[data-i="${i}"]`)?.classList.add('now');
    const t1 = setTimeout(() => {
      const r = XP.capas.aplica(s, i), nuevo = r.toks.length === s.toks.length - 4 ? i - 2 : i - 1;
      s = r; draw(nuevo); t2 = setTimeout(done, 700);
    }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  } });
};

XPD.casillas = (stage, p, s, api) => {
  let malas = [], timer = 0;
  function draw() {
    const usadas = s.puesto.filter(x => x != null);
    stage.innerHTML = `<div class="xp-rows">${p.filas.map((f, i) => `<div class="xp-row"><span class="xp-q">${tex(f.tex)} =</span>
      <button type="button" class="xp-slot${s.puesto[i] != null ? ' full' : ''}${malas.includes(i) ? ' bad' : ''}" data-slot="${i}">${s.puesto[i] ?? ''}</button></div>`).join('')}</div>
      <div class="xp-tray">${p.fichas.map(f => `<button type="button" class="xp-chip" data-f="${f}"${usadas.includes(f) ? ' disabled' : ''}>${f}</button>`).join('')}</div>`;
  }
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'), slot = e.target.closest('.xp-slot');
    if (malas.length) return;
    if (chip) { const i = s.puesto.indexOf(null); if (i < 0) return; s = { puesto: s.puesto.map((x, k) => (k === i ? chip.dataset.f : x)) }; }
    else if (slot && s.puesto[+slot.dataset.slot] != null) s = { puesto: s.puesto.map((x, k) => (k === +slot.dataset.slot ? null : x)) };
    else return;
    xpTick(); api.nota(''); api.set(s);
    if (!s.puesto.includes(null) && !XP.casillas.ok(s, p)) {
      malas = p.filas.map((f, i) => (s.puesto[i] === f.r ? -1 : i)).filter(i => i >= 0);
      api.nota(p.pista || 'Casi. Mira otra vez las que tiemblan.');
      timer = setTimeout(() => { s = { puesto: s.puesto.map((x, k) => (malas.includes(k) ? null : x)) }; malas = []; api.set(s); draw(); }, 900);
    }
    draw();
  };
  draw();
  return () => clearTimeout(timer);
};

XPD.apuesta = (stage, p, s, api) => {
  function draw() {
    stage.innerHTML = `<div class="xp-tray big">${p.opciones.map(o => `<button type="button" class="xp-chip${s.pick === o ? ' on' : ''}" data-f="${o}">${o}</button>`).join('')}</div>`;
  }
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'); if (!chip) return;
    s = { pick: chip.dataset.f }; api.memo[p.clave] = s.pick; xpTick(); api.set(s); draw();
  };
  draw();
};

XPD.cierre = (stage, p, s, api) => {
  const pick = api.memo[p.clave], bien = pick === p.real;
  stage.innerHTML = `${pick == null ? '' : `<div class="xp-bet ${bien ? 'ok' : 'off'}"><span>Apostaste <b>${esc(pick)}</b></span><span>Era <b>${esc(p.real)}</b></span>
      <small>${bien ? 'Tu intuición ya iba bien. Ahora sabes por qué.' : 'Ahora lo puedes medir, y no hace falta apostar.'}</small></div>`}
    <ol class="xp-built">${api.ideas().map((t, i) => `<li style="--i:${i}">${tex(t)}</li>`).join('')}</ol>`;
};

// ------------------------------------------------------------------------------------------------------------------
// La explicación como «reproductor»: mismo contrato que los videos (play, destroy, opts.onEnd). Devuelve null si la
// lección no tiene explicación (o se pide otra parte, o es el feed de Clips): makePlayer sigue con el video.

function exploraPlayer(host, lesson, course, opts) {
  const def = EXPLORA[lesson.id];
  if (!def || opts.feed || (opts.clip && opts.clip !== lesson.clip)) return null;
  const hayVideo = !!(lesson.clip.bunny || lesson.clip.video || lesson.clip.youtube);
  // Lo construido se recuerda mientras la app esté abierta: al volver a la explicación desde un ejercicio (repaso)
  // se retoma donde iba, con «A practicar» a la mano, y no hay que rehacer los pasos.
  const mem = XP_MEM[lesson.id] ||= { memo: {}, estados: [], hechos: [], i: 0 };
  const { memo, estados, hechos } = mem;
  let i = Math.min(mem.i, def.pasos.length - 1), clean = null, video = null;
  const lesEl = host.closest('.lesson');
  lesEl?.classList.add('has-explora');
  // Las teclas de la lección (Enter, flechas) saltarían la explicación: aquí no pasan de este punto.
  const keys = e => { if (['Enter', ' ', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) e.stopPropagation(); };
  document.addEventListener('keydown', keys, true);
  const suelta = () => { document.removeEventListener('keydown', keys, true); lesEl?.classList.remove('has-explora'); };

  host.innerHTML = `<div class="explora">
    <header class="xp-top">
      <div class="xp-segs">${def.caps.map(() => '<i><b></b></i>').join('')}</div>
      <div class="xp-meta"><span class="xp-cap"></span><button type="button" class="xp-ideas" aria-label="Ideas que llevas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16M6 13h12M8 8h8"/></svg><b>0</b></button></div>
    </header>
    <div class="xp-step"><p class="xp-text"></p><div class="xp-stage"></div><div class="xp-read"></div><p class="xp-nota" role="status"></p>
      <div class="xp-idea" aria-live="polite"><span>Idea</span><p></p></div></div>
    <footer class="xp-foot"><button type="button" class="xp-back" aria-label="Paso anterior">‹</button><button type="button" class="btn xp-next" disabled>Seguir</button></footer>
    ${hayVideo ? '<button type="button" class="xp-video">Prefiero ver el video</button>' : ''}
    <div class="xp-sheet" hidden><div class="xp-sheet-in"><h4>Lo que llevas construido</h4><ol></ol><button type="button" class="btn ghost xp-sheet-x">Volver</button></div></div>
  </div>`;
  const $x = q => host.querySelector(q);
  const root = $x(".explora"), step = $x('.xp-step'), stage = $x('.xp-stage'), read = $x('.xp-read'), nota = $x('.xp-nota');
  const idea = $x('.xp-idea'), next = $x('.xp-next'), back = $x('.xp-back'), sheet = $x('.xp-sheet');
  // La lección pasa de video a ejercicios deslizando: aquí el dedo es para la escena, así que el gesto no sale.
  root.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

  // El andamio: si la lección tiene explicaciones (`muestra`), guarda sus ideas (los conceptos); si no, las de cada paso.
  const conMuestra = def.pasos.some(p => p.tipo === 'muestra');
  const ideas = () => def.pasos.filter((p, k) => hechos[k] && (conMuestra ? p.tipo === 'muestra' : p.tipo !== 'apuesta' && p.tipo !== 'cierre')).map(p => p.idea);
  function chrome() {
    const p = def.pasos[i];
    host.querySelectorAll('.xp-segs i').forEach((seg, c) => {
      const mine = def.pasos.map((q, k) => (q.cap === c ? k : -1)).filter(k => k >= 0);
      seg.firstChild.style.width = mine.filter(k => hechos[k]).length / mine.length * 100 + '%';
      seg.classList.toggle('now', c === p.cap);
    });
    $x('.xp-cap').textContent = def.caps[p.cap];
    $x('.xp-ideas b').textContent = ideas().length;
    back.disabled = i === 0;
    next.disabled = !hechos[i];
    next.textContent = i === def.pasos.length - 1 ? 'A practicar' : 'Seguir';
    idea.classList.toggle('show', !!hechos[i]);
    if (hayVideo) $x('.xp-video').hidden = i > 0;
  }
  function cumple(first) {
    hechos[i] = true;
    if (first) {
      if (typeof Sfx !== 'undefined') Sfx.ok();
      xpChispas(stage);
      const n = $x('.xp-ideas');
      if (!xpStill()) n.animate([{ transform: 'scale(1.25)' }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    chrome();
  }
  function show(dir = 1) {
    clean?.(); clean = null;
    mem.i = i;
    const k = i, p = def.pasos[i], t = XP[p.tipo];   // k: este paso; una escena vieja no escribe en el paso que se ve ahora
    let s = estados[i] ?? t.ini(p);
    $x('.xp-text').innerHTML = tex(p.texto);
    idea.lastElementChild.innerHTML = tex(p.idea);
    nota.textContent = '';
    stage.onclick = null; stage.className = `xp-stage t-${p.tipo}`;
    // Renglón de la cuenta y frase con que la escena responde (un aviso de error la tapa hasta el siguiente movimiento).
    const leer = () => { read.innerHTML = tex(t.lee(s, p)); nota.classList.remove('aviso'); nota.innerHTML = tex(t.dice?.(s, p) || ''); };
    const api = {
      memo, ideas,
      nota: m => { if (k !== i) return; if (!m) return leer(); nota.classList.add('aviso'); nota.textContent = m; },
      // vivo: el dedo sigue arrastrando; se actualiza el renglón pero la meta se mira al soltar.
      set(ns, vivo) { if (k !== i) return; s = estados[k] = ns; leer(); if (!vivo && !hechos[k] && t.ok(s, p)) cumple(true); },
    };
    clean = XPD[p.tipo](stage, p, s, api) || null;
    leer();
    if (p.tipo === 'cierre') hechos[i] = true;
    chrome();
    if (!xpStill()) step.animate([{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
    step.scrollTop = 0;
  }
  next.onclick = () => { if (i === def.pasos.length - 1) return opts.onEnd?.(); i++; show(1); };
  back.onclick = () => { if (i > 0) { i--; show(-1); } };
  $x('.xp-ideas').onclick = () => {
    const l = ideas();
    sheet.querySelector('ol').innerHTML = l.length ? l.map(t => `<li>${tex(t)}</li>`).join('') : '<li class="none">Aún nada: cada paso que resuelvas deja aquí su idea.</li>';
    sheet.hidden = false;
  };
  sheet.onclick = e => { if (e.target === sheet || e.target.closest('.xp-sheet-x')) sheet.hidden = true; };
  if (hayVideo) {
    $x('.xp-video').onclick = () => {
      clean?.(); clean = null; suelta(); host.innerHTML = '';
      video = makeClipPlayer(host, lesson, course, opts); video.play();
    };
  }

  return {
    play() { show(1); },
    destroy() { clean?.(); clean = null; suelta(); if (video) video.destroy(); else host.innerHTML = ''; },
  };
}
