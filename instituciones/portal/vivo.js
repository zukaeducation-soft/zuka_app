// Piezas gráficas del portal (spec 2026-11-25-portal-en-la-app): el menú (el mismo de la app más las opciones del portal), la cabecera de
// cada componente, el mapa del salón, la constelación de mundos y el radar de un estudiante. Va antes de portal.js.
const MARCO = window.parent !== window;   // abierto dentro de la app
const irApp = t => { if (MARCO) { try { return parent.zukaIr(t); } catch (e) { /* sigue */ } } location.assign('/'); };
const falla = t => { try { parent.zukaFalla(t); } catch (e) { /* nada */ } };
// ¿La app instalada ya trae el portal adentro? Con una versión vieja, el portal se queda en su página.
const appNueva = () => { try { return localStorage.getItem('zuka-portal') === '1'; } catch (e) { return false; } };
// Dentro de la app las vistas no apilan historial (el «atrás» del celular es de la app): se lleva una pila propia.
const pila = [], anota = () => { const h = location.hash.slice(1); if (pila[pila.length - 1] !== h) pila.push(h); if (pila.length > 30) pila.shift(); };
const irA = h => (MARCO ? location.replace(`#${h}`) : (location.hash = h));
addEventListener('hashchange', anota);
document.addEventListener('click', e => { const a = MARCO && !e.defaultPrevented && e.button === 0 && !e.ctrlKey && !e.metaKey && e.target.closest?.('a[href^="#"], .pn-brand'); if (!a) return; e.preventDefault(); a.matches('.pn-brand') ? irApp('home') : irA(a.getAttribute('href').slice(1)); });
window.portalVuelve = () => { const d = [...document.querySelectorAll('dialog[open]')].pop(); if (d) { d.close(); return true; } if (pila.length < 2) return false; pila.pop(); irA(pila[pila.length - 1] || 'resumen'); return true; };
// La app lo vuelve a mostrar: si pasó un rato, se lee otra vez (sin interrumpir lo que se esté escribiendo).
let leido = Date.now();
window.portalRefresca = async () => { if (!D || Date.now() - leido < 60000 || document.querySelector('dialog[open], .pd-nuevo')) return; leido = Date.now(); try { await carga(); marco(); ruta(false); } catch (e) { /* queda lo que había */ } };
const QUIETO = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const APP_ICO = { home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', cursos: '<path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM4 21V5M6 19h14v2H6"/>', profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', portal: '<path d="M3 21h18M5 21V9l7-5 7 5v12M9.500 21v-6h5v6M9 11h.01M15 11h.01"/>', mas: '<circle cx="5" cy="12" r="1.600"/><circle cx="12" cy="12" r="1.600"/><circle cx="19" cy="12" r="1.600"/>' };
const aico = k => `<svg class="pn-i" viewBox="0 0 24 24" aria-hidden="true">${APP_ICO[k]}</svg>`;
const NAV_C = { resumen: '#2f7cf6', componente: '#2f7cf6', estudiantes: '#0f9960', contenido: '#7a5af8', simulacros: '#d0387f', avisos: '#c77700', metas: '#0891b2', responsables: '#7a5af8', equipo: '#0f9960', contrato: '#64748b' };
const navT = (k, t) => (k === 'componente' && gestor() ? 'Preicfes' : t);
const CORTO = { componente: 'Componente', contenido: 'Lecciones', responsables: 'Docentes' };
const navPend = k => (k === 'simulacros' && X ? X.simulacros.filter(s => simEstado(s) === 'abierto').length : 0);
const globo = k => (navPend(k) ? `<i class="pv-gl" aria-label="${navPend(k)} abiertos">${navPend(k)}</i>` : '');
function menu() {
  const ops = NAV.filter(([k]) => vistaOk(k)), n = $('.pn-nav'), app = (k, t) => `<button class="pv-app" type="button" data-app="${k}">${aico(k)}<span>${t}</span></button>`;
  n.hidden = false; n.setAttribute('aria-label', 'Menú');
  n.innerHTML = `${app('home', 'Inicio')}${app('cursos', 'Mis cursos')}<p class="pv-portal">${aico('portal')}<span>Portal</span></p><div class="pv-sub" role="group" aria-label="Portal">${secciones(ops).map(([s, xs]) => `${s ? `<small class="pv-sec">${s}</small>` : ''}${xs.map(([k, t]) => `<a href="#${k}" style="--nc1:${NAV_C[k]}">${ico(k)}<span>${navT(k, t)}</span>${globo(k)}</a>`).join('')}`).join('')}</div>${app('profile', 'Tú')}`;
  // Celular: abajo, lo que más se usa; el resto (y la app) en «Más».
  const pri = (gestor() ? ['resumen', 'estudiantes', 'simulacros'] : ['componente', 'estudiantes', 'simulacros', 'resumen', 'metas']).filter(k => vistaOk(k)).slice(0, 3);
  let b = $('.pv-tab'); if (!b) { b = document.createElement('nav'); b.className = 'pv-tab'; b.setAttribute('aria-label', 'Menú del portal'); document.body.appendChild(b); }
  b.innerHTML = `<button type="button" data-app="home">${aico('home')}<span>Inicio</span></button>${pri.map(k => `<a href="#${k}">${ico(k)}<span>${CORTO[k] || NAV.find(x => x[0] === k)[1]}</span>${globo(k)}</a>`).join('')}<button type="button" data-mas aria-haspopup="dialog">${aico('mas')}<span>Más</span></button>`;
  b.dataset.pri = pri.join();
  $('[data-mas]', b).onclick = () => hojaMas(ops);
  $$('[data-app]').forEach(x => { x.onclick = () => irApp(x.dataset.app); });
}
function hojaMas(ops) {
  const d = ventana(`<div class="pv-hoja">${secciones(ops).map(([s, xs], j) => `<h2>${s || 'Portal'}</h2><div class="pv-grid">${xs.map(([k, t], i) => `<a href="#${k}" style="--nc1:${NAV_C[k]};--i:${i + j * 2}"><i>${ico(k)}</i><span>${navT(k, t)}</span>${globo(k)}</a>`).join('')}</div>`).join('')}<h2>Zuka</h2><div class="pv-grid">${[['home', 'Inicio'], ['cursos', 'Mis cursos'], ['profile', 'Tú']].map(([k, t], i) => `<button type="button" data-app="${k}" style="--i:${ops.length + i}"><i>${aico(k)}</i><span>${t}</span></button>`).join('')}</div>${MARCO ? '' : '<button class="link-btn" type="button" data-fuera>Salir</button>'}</div>`, w => {
    $$('a', w).forEach(a => { a.onclick = () => w.close(); }); $$('[data-app]', w).forEach(x => { x.onclick = () => { w.close(); irApp(x.dataset.app); }; });
    const s = $('[data-fuera]', w); if (s) s.onclick = () => $('[data-salir]').click();
  });
  d.classList.add('pv-sheet');
}
function menuOn(k) {
  $$('.pn-nav a, .pv-tab a').forEach(a => { const on = a.getAttribute('href') === `#${k}`; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  $('.pv-tab [data-mas]')?.classList.toggle('on', !$('.pv-tab').dataset.pri.split(',').includes(k));
  const h = $('.pn-head h1', view);   // cada vista con el dibujo de su opción
  if (h && !h.closest('.pv-hero') && !h.closest('.pn-quien') && ICO[k] && !$('.pv-ic', view)) { const c = h.closest('.pn-head').firstElementChild; c.classList.add('pv-con'); c.insertAdjacentHTML('afterbegin', `<span class="pv-ic" style="--nc1:${NAV_C[k] || '#2f7cf6'}">${ico(k)}</span>`); }
}
// Al llegar a una vista: entra por partes y los números suben.
function anima() {
  if (QUIETO()) return;
  view.classList.remove('entra'); void view.offsetWidth; view.classList.add('entra'); clearTimeout(anima.t); anima.t = setTimeout(() => view.classList.remove('entra'), 1100);
  $$('.po-k > b, .gs-k > b, .pv-hero [data-num]', view).forEach(b => {
    const n = b.firstChild; if (!n || n.nodeType !== 3 || !/^\d+$/.test(n.data.trim())) return; const fin = +n.data, t0 = performance.now(); if (fin < 2) return;
    const paso = t => { const p = Math.min(1, (t - t0) / 700); n.data = String(Math.round(fin * (1 - (1 - p) ** 3))); if (p < 1 && b.isConnected) requestAnimationFrame(paso); }; requestAnimationFrame(paso);
  });
}

// ---------- cabecera de un componente ----------
const COMP_ART = {
  matematicas: '<circle class="o1" cx="150" cy="92" r="64"/><path class="o2" d="M40 150h190M62 170V30"/><path class="o3" d="M66 146c30 0 34-96 66-96s30 62 90 62"/><circle class="p" cx="132" cy="50" r="7"/><circle class="p" cx="222" cy="112" r="7"/><path class="o2" d="M150 92l45-45M150 92h64"/><path class="o3" d="M176 92a26 26 0 0 0-8-18"/>',
  lectura: '<path class="o2" d="M140 60c-28-18-62-20-92-10v100c30-10 64-8 92 10 28-18 62-20 92-10V50c-30-10-64-8-92 10zM140 60v100"/><path class="o3" d="M68 76c18-4 36-2 52 5M68 98c18-4 36-2 52 5M68 120c14-3 26-2 38 2M160 81c16-7 34-9 52-5M160 103c16-7 34-9 52-5"/><circle class="p" cx="214" cy="128" r="22"/><path class="o2" d="M230 144l22 22"/>',
  sociales: '<circle class="o2" cx="140" cy="100" r="68"/><ellipse class="o3" cx="140" cy="100" rx="30" ry="68"/><path class="o3" d="M74 82h132M74 118h132M140 32v136"/><circle class="p" cx="172" cy="78" r="8"/><circle class="p" cx="104" cy="124" r="8"/><path class="o2" d="M104 124c20-40 46-46 68-46"/>',
  ciencias: '<ellipse class="o2" cx="140" cy="100" rx="92" ry="34"/><ellipse class="o3" cx="140" cy="100" rx="92" ry="34" transform="rotate(60 140 100)"/><ellipse class="o2" cx="140" cy="100" rx="92" ry="34" transform="rotate(120 140 100)"/><circle class="p" cx="140" cy="100" r="13"/><circle class="p" cx="232" cy="100" r="6"/><circle class="p" cx="94" cy="20" r="6"/><circle class="p" cx="94" cy="180" r="6"/>',
  ingles: '<path class="o2" d="M48 44h112a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16H92l-26 24v-24H48a16 16 0 0 1-16-16V60a16 16 0 0 1 16-16z"/><path class="o3" d="M58 70h86M58 92h54"/><path class="o2" d="M196 84h36a16 16 0 0 1 16 16v40a16 16 0 0 1-16 16h-12v22l-24-22h-40a16 16 0 0 1-16-16"/><circle class="p" cx="196" cy="122" r="5"/><circle class="p" cx="214" cy="122" r="5"/><circle class="p" cx="232" cy="122" r="5"/>',
};
function heroH({ comp, sobre, t, frase, abajo = '' }) {
  return `<section class="pv-hero" style="--cc:${COMP_C[comp]}"><svg class="pv-arte" viewBox="0 0 280 200" aria-hidden="true">${COMP_ART[comp]}</svg><div class="pv-h"><p class="pv-sobre">${sobre}</p><h1>${t}</h1><p class="pv-frase">${frase}</p>${abajo}</div></section>`;
}
function ligaHero() {
  const h = $('.pv-hero', view), a = h && $('.pv-arte', h); if (!h || !a || QUIETO()) return; let pide = 0, u = null;
  h.onpointermove = e => { u = e; if (!pide) pide = requestAnimationFrame(() => { pide = 0; const b = h.getBoundingClientRect(); a.style.setProperty('--x', ((u.clientX - b.left) / b.width - .5).toFixed(3)); a.style.setProperty('--y', ((u.clientY - b.top) / b.height - .5).toFixed(3)); }); };
}
// Grupos como pestañas.
const grupoTabs = (gs, sel) => (gs.length > 1 ? `<div class="pv-gs" role="radiogroup" aria-label="Grupo">${['', ...gs].map(g => `<label><input type="radio" name="kg" value="${esc(g)}"${sel === g ? ' checked' : ''}><span>${g ? esc(g) : 'Todos'}</span></label>`).join('')}</div>` : '');

// ---------- mapa del salón: avance (→) y nota (↑) ----------
const ZONAS = [['bien', 'Van muy bien', 'avanzan y aciertan'], ['fallan', 'Avanzan, pero fallan', 'repasar lo hecho'], ['lento', 'Aciertan, pero van despacio', 'animarlos a seguir'], ['apoyo', 'Necesitan apoyo', 'hablar con ellos'], ['sin', 'Aún sin nota', 'no han presentado']];
function zonas(xs, media) { return xs.map(x => ({ ...x, z: x.prom == null ? 'sin' : x.prom >= 60 ? (x.e.avance >= media ? 'bien' : 'lento') : x.e.avance >= media ? 'fallan' : 'apoyo' })); }
function salonH(xs) {
  const c = z => xs.filter(x => x.z === z).length;
  return `<section class="pn-card pv-salon"><div class="pn-head"><div><h2>Tu salón de un vistazo</h2><p class="pn-count">Más a la derecha, más avance. Más arriba, mejor nota. Toca a un estudiante.</p></div></div>
    <div class="pv-zs" role="group" aria-label="Resaltar">${ZONAS.filter(z => c(z[0])).map(([k, t, s]) => `<button type="button" class="z-${k}" data-z="${k}" aria-pressed="false"><b>${c(k)}</b><span>${t}<small>${s}</small></span></button>`).join('')}</div>
    <div class="pv-plano" role="group" aria-label="Estudiantes según avance y nota. Muévete con las flechas"><i class="pv-eje x">Avance</i><i class="pv-eje y">Nota</i><i class="pv-c v"></i><i class="pv-c h"></i>${xs.map((x, i) => `<button type="button" class="pv-b z-${x.z}" data-b="${i}" tabindex="${i ? -1 : 0}" aria-label="${esc(x.e.nombre)}, ${esc(x.e.grupo)}: avance ${pc(x.e.avance)}, ${x.prom == null ? 'sin nota' : `nota ${x.prom}`}${x.por ? `. ${esc(x.por.t)}` : ''}">${esc(x.e.nombre.split(/\s+/).slice(0, 2).map(p => [...p][0]).join('').toUpperCase())}${x.por ? '<s></s>' : ''}</button>`).join('')}<div class="pv-tip" hidden></div></div></section>`;
}
function ligaSalon(xs, media, abre) {
  const p = $('.pv-plano', view); if (!p) return; const bs = $$('.pv-b', p), tip = $('.pv-tip', p), tope = Math.max(.3, ...xs.map(x => x.e.avance)), sin = xs.some(x => x.prom == null);
  const pon = () => {
    const W = p.clientWidth, H = p.clientHeight, r = W < 520 ? 17 : 21, m = r + 8, base = sin ? r * 2 + 22 : 0, fx = a => m + 14 + a / tope * (W - 2 * m - 14), fy = n => H - m - base - n / 100 * (H - 2 * m - base);
    const q = xs.map(x => ({ x: fx(x.e.avance), y: x.prom == null ? H - r - 8 : fy(x.prom), s: x.prom == null }));
    for (let k = 0; k < 60; k++) for (let i = 0; i < q.length; i++) for (let j = 0; j < i; j++) { const a = q[i], b = q[j]; if (a.s !== b.s) continue; let dx = a.x - b.x, dy = a.s ? 0 : a.y - b.y; const d = Math.hypot(dx, dy) || .01, f = 2 * r + 2 - d; if (f > 0) { if (!dx && !dy) { dx = .01 * (i % 2 ? 1 : -1); dy = a.s ? 0 : .01; } const u = Math.hypot(dx, dy), s = f / 2; a.x += dx / u * s; b.x -= dx / u * s; if (!a.s) { a.y += dy / u * s; b.y -= dy / u * s; } } }
    q.forEach((o, i) => { o.x = Math.min(W - r - 4, Math.max(r + 4, o.x)); o.y = Math.min(H - r - 4 - (o.s ? 0 : base), Math.max(r + 4, o.y)); Object.assign(bs[i].style, { left: `${o.x}px`, top: `${o.y}px`, width: `${2 * r}px`, height: `${2 * r}px` }); });
    $('.pv-c.v', p).style.left = `${fx(media)}px`; $('.pv-c.v', p).style.bottom = `${base}px`; $('.pv-c.h', p).style.top = `${fy(60)}px`;
  };
  pon(); const ro = new ResizeObserver(() => (p.isConnected ? pon() : ro.disconnect())); ro.observe(p);
  const ve = i => { const x = xs[i], b = bs[i]; tip.innerHTML = `<b>${esc(x.e.nombre)}</b><span>${esc(x.e.grupo)} · avance ${pc(x.e.avance)} · ${x.prom == null ? 'sin nota' : `nota ${x.prom}`}</span>${x.por ? `<em>${esc(x.por.t)}</em>` : ''}`; tip.hidden = false; const W = p.clientWidth, w = tip.offsetWidth, l = Math.min(W - w - 6, Math.max(6, b.offsetLeft + b.offsetWidth / 2 - w / 2)), ab = b.offsetTop < tip.offsetHeight + 14; tip.style.left = `${l}px`; tip.style.top = `${ab ? b.offsetTop + b.offsetHeight + 8 : b.offsetTop - tip.offsetHeight - 8}px`; };
  bs.forEach((b, i) => { b.onpointerenter = e => { if (e.pointerType === 'mouse') ve(i); }; b.onpointerleave = () => { tip.hidden = true; }; b.onfocus = () => { if (b.matches(':focus-visible')) ve(i); }; b.onblur = () => { tip.hidden = true; }; b.onclick = () => abre(xs[i]); });
  p.onkeydown = e => {
    const i = bs.indexOf(document.activeElement), v = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (i < 0 || !v) return; e.preventDefault();
    const o = bs[i], sig = bs.map((b, j) => { const dx = b.offsetLeft - o.offsetLeft, dy = b.offsetTop - o.offsetTop, a = dx * v[0] + dy * v[1]; return { j, a, c: a + 2 * Math.abs(dx * v[1] + dy * v[0]) }; }).filter(x => x.j !== i && x.a > 1).sort((a, b) => a.c - b.c)[0];
    if (sig) { o.tabIndex = -1; bs[sig.j].tabIndex = 0; bs[sig.j].focus(); }
  };
  $$('[data-z]', view).forEach(b => { b.onclick = () => { const on = b.getAttribute('aria-pressed') !== 'true'; $$('[data-z]', view).forEach(x => x.setAttribute('aria-pressed', x === b && on)); bs.forEach((x, i) => x.classList.toggle('off', on && xs[i].z !== b.dataset.z)); }; });
}
// Ficha rápida al tocar a un estudiante.
function fichaRapida(x, comp) {
  const ns = x.ns, e = x.e;
  ventana(`<div class="pn-form1 pv-ficha"><div class="pn-quien">${avatar(e.nombre)}<div><h2>${esc(e.nombre)}</h2><p class="pn-count">${esc(e.grupo)} · ${ultima(e)}</p></div></div>${x.por ? `<p class="po-aviso mal">${esc(x.por.t)}.</p>` : ''}<div class="pv-mini"><p><b>${pc(e.avance)}</b><span>avance</span></p><p><b>${x.prom ?? '—'}</b><span>promedio</span></p><p><b>${e.min}</b><span>min en 28 días</span></p></div>${ns.length ? `<div class="pv-chispa" role="img" aria-label="Notas: ${ns.map(n => n.nota).join(', ')}">${ns.slice(-8).map(n => `<i class="${nivel(n.nota)}" style="--h:${n.nota}%"><b>${n.nota}</b></i>`).join('')}</div>` : ''}<div class="pn-pie">${vig() ? '<button class="btn ghost" type="button" data-ob>Observación</button><button class="btn ghost" type="button" data-av>Aviso</button>' : ''}<a class="btn main" href="#alumno/${e.id}">Ver todo</a></div></div>`, d => {
    $('a.btn', d).onclick = () => d.close(); const o = $('[data-ob]', d), a = $('[data-av]', d); if (o) o.onclick = () => { d.close(); dlgObs(e, comp); }; if (a) a.onclick = () => { d.close(); dlgAviso({ comp, uno: e }); };
  });
}

// ---------- constelación de mundos ----------
function constelaH(ms, av) {
  const L = 106, n = ms.length, pt = i => [L * i + L / 2, 74 + [0, 26, 6, -18][i % 4]], camino = k => ms.slice(0, k).map((m, i) => { const [x, y] = pt(i); if (!i) return `M${x} ${y}`; const [a, b] = pt(i - 1); return `C${a + L / 2} ${b} ${x - L / 2} ${y} ${x} ${y}`; }).join('');
  return `<div class="pv-cons"><ol style="--n:${n};width:${L * n}px"><svg viewBox="0 0 ${L * n} 190" width="${L * n}" height="190" aria-hidden="true"><path d="${camino(n)}"/></svg>${ms.map((m, i) => { const p = av(m), [x, y] = pt(i); return `<li style="left:${x}px;top:${y}px;--p:${p.toFixed(3)};--i:${i}"><button type="button" data-m="${m.id}" aria-label="${esc(m.nombre)}: ${pc(p)} de avance. Ver quién falta"><span class="pv-nodo"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" pathLength="1"/><circle class="v" cx="32" cy="32" r="28" pathLength="1"/></svg><b>${Math.round(p * 100)}<small>%</small></b></span><span class="pv-mn">${esc(m.nombre)}</span></button></li>`; }).join('')}</ol></div>`;
}
// ---------- radar ----------
function radarH(ejes, quien) {
  const n = ejes.length; if (n < 3) return ''; const R = 96, pt = (i, p) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [130 + Math.cos(a) * R * p, 130 + Math.sin(a) * R * p].map(v => v.toFixed(1)).join(' '); }, pol = f => ejes.map((e, i) => pt(i, Math.max(.02, f(e)))).join(' L');
  return `<div class="pv-radar"><svg viewBox="0 0 260 260" role="img" aria-label="${ejes.map(e => `${esc(e.t)}: ${pc(e.a)}, grupo ${pc(e.g)}`).join('; ')}">${[.25, .5, .75, 1].map(p => `<path class="r" d="M${ejes.map((e, i) => pt(i, p)).join(' L')}Z"/>`).join('')}${ejes.map((e, i) => `<path class="r" d="M130 130 L${pt(i, 1)}"/>`).join('')}<path class="g" d="M${pol(e => e.g)}Z"/><path class="a" d="M${pol(e => e.a)}Z"/>${ejes.map((e, i) => { const [x, y] = pt(i, Math.max(.02, e.a)).split(' '), [tx, ty] = pt(i, 1.18).split(' '); return `<circle cx="${x}" cy="${y}" r="5" data-r="${i}"/><text x="${tx}" y="${ty}" dy=".35em">${i + 1}</text>`; }).join('')}</svg><ol>${ejes.map((e, i) => `<li data-r="${i}"><b>${i + 1}</b><span>${esc(e.t)}</span><em>${pc(e.a)}</em></li>`).join('')}</ol><p class="pd-ley2"><span><i class="yo"></i>${esc(quien)}</span><span><i class="gr"></i>Su grupo</span></p></div>`;
}
function ligaRadar() { const r = $('.pv-radar', view); if (!r) return; r.onpointerover = e => { const k = e.target.closest?.('[data-r]')?.dataset.r; $$('[data-r]', r).forEach(x => x.classList.toggle('on', k != null && x.dataset.r === k)); }; r.onpointerleave = () => $$('.on', r).forEach(x => x.classList.remove('on')); }
