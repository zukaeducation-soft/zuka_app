// Simulacros del Preicfes que el estudiante presenta por su cuenta (spec 2026-11-26-simulacros-preicfes). Cada simulacro tiene las
// cinco pruebas, de 24 preguntas A–D nuevas; cada prueba se presenta aparte, con reloj, y se revisa con explicaciones. Con las cinco
// presentadas sale el puntaje global de 0 a 500 (Lectura, Matemáticas, Sociales y Ciencias pesan 3; Inglés, 1). Los datos van en
// js/simulacro-icf-N.js (PI_SIMULACROS.push(…)); este archivo va después de simulacros.js (usa simTexto, simMate y SIM_L).
const PI_SIMULACROS = [];
const SIM_PRUEBAS = [['lectura', 'Lectura Crítica'], ['matematicas', 'Matemáticas'], ['sociales', 'Sociales y Ciudadanas'], ['ciencias', 'Ciencias Naturales'], ['ingles', 'Inglés']];
const SIM_MIN = 48;   // minutos por prueba: dos por pregunta

// ---------------------------------------------------------------- lógica pura (se prueba en Node)
const simPuntaje = (aciertos, n) => Math.round(100 * aciertos / n);
function simGlobal(p) {
  if (!SIM_PRUEBAS.every(([k]) => p[k] != null)) return null;
  return Math.round(5 * (3 * (p.lectura + p.matematicas + p.sociales + p.ciencias) + p.ingles) / 13);
}
// Mundos para repasar: los que más errores tuvieron, en orden.
function simRepaso(items, resp) {
  const n = new Map();
  items.forEach((it, i) => { if (resp[i] !== it.r) n.set(it.m, (n.get(it.m) || 0) + 1); });
  return [...n].sort((a, b) => b[1] - a[1]).map(x => x[0]);
}
// Ayudantes para escribir los datos: P(mundo, enunciado, opciones, índice correcto, explicación, texto?) y T(título, párrafos, tabla?).
const simP = (m, q, o, r, e, d) => ({ m, q, o, r, e, d: d ?? null });
const simT = (title, paras, tabla) => ({ title, paras, tabla });

// ---------------------------------------------------------------- pantalla
const simRes = id => (S.simIcf ||= {})[id] ||= {};
const simNotas = s => Object.fromEntries(SIM_PRUEBAS.map(([k]) => [k, simRes(s.id)[k]?.best ?? null]));
const simLlave = () => C_PREICFES()?.units.find(u => u.exam)?.exam.id;
const C_PREICFES = () => COURSES.find(c => c.id === 'preicfes');
function simTextoIcf(t, abierto) {
  const tabla = t.tabla ? `<table class="simi-tabla">${t.tabla.map((f, i) => `<tr>${f.map(c => (i ? `<td>${simMate(c)}</td>` : `<th>${simMate(c)}</th>`)).join('')}</tr>`).join('')}</table>` : '';
  return simTexto(t, abierto).replace('</div></details>', `${tabla}</div></details>`);
}

function simIcfHTML(c) {
  if (c.id !== 'preicfes' || !PI_SIMULACROS.length) return '';
  const llave = simLlave(), cerrado = typeof planMotivo === 'function' && llave && planMotivo(llave);
  return `<section class="simi" aria-label="Simulacros"><h2 class="comp-title">Simulacros</h2><p class="simi-p">Las cinco pruebas, con preguntas nuevas y reloj: ${SIM_MIN} minutos por prueba. Presenta cada una cuando quieras; con las cinco sale tu puntaje global.</p>
    ${PI_SIMULACROS.map(s => { const nt = simNotas(s), gl = simGlobal(nt), hechas = SIM_PRUEBAS.filter(([k]) => nt[k] != null).length;
      return `<article class="simi-card"><header><b>${esc(s.titulo)}</b><span>${gl != null ? `<strong>${gl}</strong> de 500` : `${hechas} de 5 pruebas`}</span></header>
      <div class="simi-pr">${SIM_PRUEBAS.map(([k, nom]) => `<button type="button" data-simi="${s.id}" data-pr="${k}"${cerrado ? ' data-lock="1"' : ''}><span>${esc(nom)}</span><small>${cerrado ? ICON.lock : nt[k] != null ? `${nt[k]} de 100` : 'Presentar'}</small></button>`).join('')}</div></article>`; }).join('')}</section>`;
}
function simIcfBind(root) {
  root.querySelectorAll('[data-simi]').forEach(b => { b.onclick = () => {
    if (b.dataset.lock) return openBloqueo(simLlave());
    const s = PI_SIMULACROS.find(x => x.id === b.dataset.simi); if (s) simIcfAbre(s, b.dataset.pr);
  }; });
}

function simIcfAbre(s, pr) {
  const nom = SIM_PRUEBAS.find(x => x[0] === pr)[1], r = simRes(s.id)[pr], cur = S.simIcfCurso;
  const sigue = cur && cur.id === s.id && cur.pr === pr && cur.fin > Date.now();
  openSheet(`<div class="ls exam-sheet"><p class="eyebrow">${esc(s.titulo)}</p><h3>${esc(nom)}</h3><p class="ls-meta"><span>${ICON.clock} ${SIM_MIN} min</span><span>${ICON.target} ${s.pruebas[pr].length} preguntas</span></p>
    <ul class="exam-rules"><li>Preguntas de selección múltiple con una sola respuesta: A, B, C o D.</li><li>El reloj no se detiene si sales; puedes volver mientras quede tiempo.</li><li>Puedes ir y volver entre preguntas. Al entregar verás cada respuesta explicada.</li>${r ? `<li>Tu mejor resultado: ${r.best} de 100. Puedes volver a presentarla.</li>` : ''}</ul>
    <button class="btn main" type="button" data-go>${sigue ? 'Seguir' : 'Empezar'}</button>${r?.last ? '<button class="btn ghost" type="button" data-rev>Ver mis respuestas</button>' : ''}</div>`, sh => {
    sh.querySelector('[data-go]').onclick = () => { closeSheet(false); simIcfPresenta(s, pr, sigue ? cur : null); };
    const rv = sh.querySelector('[data-rev]'); if (rv) rv.onclick = () => { closeSheet(false); simIcfRevisa(s, pr, r.last.resp, r.last.pct); };
  });
}

function simIcfPresenta(s, pr, cur) {
  if (typeof cleanup === 'function') { cleanup(); cleanup = null; }
  const L = s.pruebas[pr], n = L.length, nom = SIM_PRUEBAS.find(x => x[0] === pr)[1];
  const resp = cur ? cur.resp.slice() : L.map(() => -1), fin = cur ? cur.fin : Date.now() + SIM_MIN * 60000;
  let k = 0, listo = false, timer = 0;
  const guarda = () => { S.simIcfCurso = { id: s.id, pr, resp, fin }; save(); };
  guarda();
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(nom)} · ${esc(s.titulo)}</b><span class="exam-clock" role="timer" aria-label="Tiempo restante">${ICON.clock}<b></b></span></div>
    <div class="lesson-body" tabindex="-1"></div><nav class="simu-nav" aria-label="Preguntas"></nav><div class="lesson-foot exam-foot"><button class="btn ghost skip" type="button">Anterior</button><button class="btn main" type="button">Siguiente</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const body = $('.lesson-body', ov), nav = $('.simu-nav', ov), clock = $('.exam-clock', ov), ant = $('.skip', ov), sig = $('.btn.main', ov);
  const marca = j => { resp[k] = resp[k] === j ? -1 : j; guarda(); };
  function pinta(foco) {
    const p = L[k], t = p.d != null ? s.textos[p.d] : null;
    body.innerHTML = `<div class="simu-c${t ? ' con' : ''}">${t ? simTextoIcf(t, k === 0 || L[k - 1].d !== p.d || innerWidth >= 900) : ''}<div class="simu-q"><p class="ex-kind">Pregunta ${k + 1} de ${n}</p><p class="simu-e" id="simu-e">${simMate(p.q)}</p><div class="simu-ops" role="radiogroup" aria-labelledby="simu-e">${p.o.map((o, j) => `<button type="button" role="radio" aria-checked="${resp[k] === j}" tabindex="${(resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1}" data-o="${j}"><b>${SIM_L[j]}</b><span>${simMate(o)}</span></button>`).join('')}</div></div></div>`;
    body.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => { marca(+b.dataset.o); Sfx.tap(); ops(+b.dataset.o); }; });
    ant.disabled = !k; sig.textContent = k === n - 1 ? 'Entregar' : 'Siguiente'; puntos(); body.scrollTop = 0; if (foco) body.focus({ preventScroll: true });
  }
  function ops(f) { body.querySelectorAll('[data-o]').forEach((b, j) => { b.setAttribute('aria-checked', resp[k] === j); b.tabIndex = (resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1; if (j === f) b.focus({ preventScroll: true }); }); puntos(); }
  function puntos() { nav.innerHTML = L.map((p, i) => `<button type="button" class="${i === k ? 'cur' : ''}${resp[i] >= 0 ? ' hecha' : ''}" data-i="${i}" aria-label="Pregunta ${i + 1}${resp[i] >= 0 ? ', respondida' : ''}"${i === k ? ' aria-current="true"' : ''}>${i + 1}</button>`).join(''); nav.querySelectorAll('[data-i]').forEach(b => { b.onclick = () => { k = +b.dataset.i; pinta(true); }; }); nav.querySelector('.cur')?.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  ant.onclick = () => { if (k) { k--; pinta(true); } };
  sig.onclick = async () => {
    if (k < n - 1) { k++; return pinta(true); }
    const f = resp.filter(o => o < 0).length;
    if (await ask({ title: '¿Entregar la prueba?', text: f ? `Te ${f === 1 ? 'falta 1 pregunta' : `faltan ${f} preguntas`} por responder.` : 'Respondiste todas.', ok: 'Entregar', cancel: 'Seguir' })) entrega();
  };
  const tick = () => { const q = Math.max(0, (fin - Date.now()) / 1000); $('b', clock).textContent = fmtClock(q); clock.classList.toggle('low', q <= 60); if (q <= 0 && !listo) entrega(); };
  function entrega() {
    if (listo) return; listo = true; quita();
    const ok = resp.filter((o, i) => o === L[i].r).length, pct = simPuntaje(ok, n), r = simRes(s.id);
    r[pr] = { best: Math.max(r[pr]?.best ?? 0, pct), last: { pct, resp: resp.slice(), at: Date.now() } };
    delete S.simIcfCurso; save();
    cierra(); simIcfRevisa(s, pr, resp, pct, true);
  }
  function tecla(e) { if (listo || document.querySelector('dialog[open], .dialog')) return; const b = e.target.closest?.('[data-o]'); if (b && ['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); const j = (+b.dataset.o + (e.key === 'ArrowDown' ? 1 : 3)) % 4; resp[k] = -1; marca(j); ops(j); } else if (/^[a-d]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) { const j = SIM_L.indexOf(e.key.toUpperCase()); resp[k] = -1; marca(j); ops(j); } }
  const quita = () => { clearInterval(timer); document.removeEventListener('keydown', tecla); };
  function cierra() { quita(); ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; }
  lessonClose = async () => { if (listo) return cierra(); if (await ask({ title: '¿Salir de la prueba?', text: 'El reloj sigue corriendo. Puedes volver desde el curso mientras te quede tiempo.', ok: 'Salir', cancel: 'Seguir', danger: true })) { if (listo) return; cierra(); go('learn'); } };
  $('[data-close]', ov).onclick = () => lessonClose();
  document.addEventListener('keydown', tecla);
  timer = setInterval(tick, 500); pinta(); tick();
}

function simIcfRevisa(s, pr, resp, pct, recien) {
  const L = s.pruebas[pr], nom = SIM_PRUEBAS.find(x => x[0] === pr)[1], ok = resp.filter((o, i) => o === L[i].r).length;
  const nt = simNotas(s), gl = simGlobal(nt), rep = simRepaso(L, resp).slice(0, 4).map(w => ({ w, u: C_PREICFES().units.find(u => u.world === w) })).filter(x => x.u);
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(nom)} · ${esc(s.titulo)}</b></div><div class="lesson-body"><div class="simu-rev">
    <div class="simu-nota"><b>${pct}</b><span>de 100<small>${ok} de ${L.length} preguntas${recien ? '' : ' · último intento'}</small></span></div>
    ${gl != null ? `<p class="simi-gl">Con las cinco pruebas, tu puntaje global en este simulacro es <b>${gl}</b> de 500.</p>` : `<p class="simi-gl">Te ${5 - SIM_PRUEBAS.filter(([k]) => nt[k] != null).length === 1 ? 'falta 1 prueba' : `faltan ${5 - SIM_PRUEBAS.filter(([k]) => nt[k] != null).length} pruebas`} para tener el puntaje global.</p>`}
    ${rep.length ? `<section class="er-sec er-rev"><h3>${ICON.bulb} Para repasar</h3>${rep.map(x => `<button class="btn ghost sm" type="button" data-w="${x.w}">${esc(x.u.title)} ${ICON.right}</button>`).join('')}</section>` : ''}
    ${L.map((p, i) => { const o = resp[i], bien = o === p.r; return `<details class="er-q ${bien ? 'ok' : 'bad'}"><summary><span class="er-ic">${bien ? ICON.check : o < 0 ? '–' : ICON.x}</span><span><small>Pregunta ${i + 1} · ${bien ? 'Correcta' : o < 0 ? 'Sin responder' : 'Incorrecta'}</small>${simMate(p.q)}</span></summary><div class="er-q-body">${p.d != null ? simTextoIcf(s.textos[p.d], false) : ''}<ol class="simu-op2">${p.o.map((x, j) => `<li class="${j === p.r ? 'ok' : j === o ? 'mal' : ''}"><b>${SIM_L[j]}</b><span>${simMate(x)}${j === p.r ? '<small>Correcta</small>' : j === o ? '<small>La que marcaste</small>' : ''}</span></li>`).join('')}</ol><p class="fb-exp">${simMate(p.e)}</p></div></details>`; }).join('')}
    </div></div><div class="lesson-foot"><button class="btn main" type="button">Continuar</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const cierra = () => { ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('learn'); };
  lessonClose = cierra; $('[data-close]', ov).onclick = cierra; $('.lesson-foot .btn', ov).onclick = cierra;
  ov.querySelectorAll('[data-w]').forEach(b => { b.onclick = () => {
    const c = C_PREICFES(), i = c.units.findIndex(u => u.world === b.dataset.w); cierra();
    S.course = c.id; openBlock = { course: c.id, id: c.units[i].block }; openWorld = { course: c.id, i }; save(); go('learn');
  }; });
}
