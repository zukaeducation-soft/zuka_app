// Simulacros y avisos que pone el docente responsable (spec 2026-11-25-docente-responsable): tarjetas en Inicio y la pantalla para
// presentarlos. Un intento, con el reloj de la base; lo marcado se guarda solo y califica la base. Va después de metas.js.
const SIM_COMP = { matematicas: 'Matemáticas', lectura: 'Lectura Crítica', sociales: 'Sociales y Ciudadanas', ciencias: 'Ciencias Naturales', ingles: 'Inglés' };
const simHora = iso => new Date(iso).toLocaleString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'America/Bogota' });
// Qué decir y qué botón poner. Pura: se prueba en Node.
function simTarjeta(s, ahora = Date.now()) {
  const abre = Date.parse(s.abre), cierra = Date.parse(s.cierra), lim = s.limite ? Date.parse(s.limite) : 0;
  if (s.estado === 'curso' && lim > ahora) return { t: `Lo estás presentando: quedan ${Math.max(1, Math.ceil((lim - ahora) / 60000))} min`, b: 'Seguir', hace: 'empezar', urge: true };
  if (s.estado === 'nuevo') {
    if (ahora < abre) return { t: `Abre el ${simHora(s.abre)}`, b: '', hace: '' };
    if (ahora >= cierra) return { t: 'Cerró y no lo presentaste', b: '', hace: '', mal: true, viejo: ahora - cierra > 3 * 864e5 };
    return { t: `Hasta el ${simHora(s.cierra)}`, b: 'Empezar', hace: 'empezar', urge: cierra - ahora < 864e5 };
  }
  if (s.ver || (s.muestra === 'cerrar' && ahora >= cierra)) return { t: s.aciertos == null ? 'Ya puedes ver tus respuestas' : `Sacaste ${instNota(s.aciertos, s.n)} de 100`, b: 'Ver respuestas', hace: 'revisar', viejo: ahora - cierra > 10 * 864e5 };
  return { t: s.muestra === 'nunca' ? 'Entregado. Pregúntale la nota a tu docente' : 'Entregado. Verás tus resultados cuando cierre', b: '', hace: '', viejo: ahora - cierra > 3 * 864e5 };
}
function simulacrosHTML() {
  const av = Cuenta.inst.avisos || [], ss = (Cuenta.inst.simulacros || []).map(s => ({ s, t: simTarjeta(s) })).filter(x => !x.t.viejo).sort((a, b) => !!b.t.urge - !!a.t.urge || (b.t.hace === 'empezar') - (a.t.hace === 'empezar') || Date.parse(a.s.cierra) - Date.parse(b.s.cierra));
  if (!av.length && !ss.length) return '';
  return `${av.length ? `<section class="hm-avisos" aria-label="Avisos de tus docentes">${av.slice(0, 4).map(a => `<article><p>${esc(a.texto)}</p><small>${esc(a.autor)} · ${esc(SIM_COMP[a.componente] || '')}</small></article>`).join('')}</section>` : ''}
    ${ss.length ? `<section class="hm-metas hm-sims"><h2 class="home-h2">Simulacros</h2><div class="hm-mt">${ss.slice(0, 6).map(({ s, t }) => `<article class="${t.urge ? 'urge' : ''}" style="--c:${COURSES.find(c => c.id === 'preicfes')?.color || 'var(--brand)'}"><div><b>${esc(s.titulo)}</b><small>${esc(SIM_COMP[s.componente] || '')} · ${s.n} preguntas · ${s.minutos} min</small><small class="${t.mal ? 'mal' : ''}">${esc(t.t)}</small></div>${t.b ? `<button class="btn ${t.hace === 'empezar' ? 'main' : 'ghost'} sm" type="button" data-sim="${s.id}" data-sim-a="${t.hace}">${t.b}</button>` : ''}</article>`).join('')}</div></section>` : ''}`;
}
function simulacrosBind(root) { root.querySelectorAll('[data-sim]').forEach(b => { b.onclick = () => { const s = Cuenta.inst.simulacros.find(x => x.id === +b.dataset.sim); if (s) b.dataset.simA === 'revisar' ? simRevisar(s, b) : simAviso(s, b); }; }); }
const simApi = async (a, p) => { const { data, error } = await Cuenta.sb.rpc('simulacro', { p_accion: a, p }); if (error) throw error; return data; };
const simError = e => (/fetch|network|load failed/i.test(e?.message || '') ? 'No hay conexión. Inténtalo de nuevo.' : e?.message || 'No se pudo abrir.');
const simMate = t => tex(t).replace(/__(.+?)__/g, '<u>$1</u>');
// Vuelve a leer lo de su institución (tras entregar, su tarjeta cambia).
async function simRefresca() { try { const r = await Cuenta.sb.rpc('mi_institucion'); if (r.data) { Object.assign(Cuenta.inst, { metas: r.data.metas || [], simulacros: r.data.simulacros || [], avisos: r.data.avisos || [] }); cuentaCache(); if (tab === 'home' && !lessonClose) go('home'); } } catch (e) { /* la próxima vez que entre */ } }

function simAviso(s) {
  const sigue = s.estado === 'curso';
  openSheet(`<div class="ls exam-sheet"><p class="eyebrow">${esc(SIM_COMP[s.componente] || 'Simulacro')}</p><h3>${esc(s.titulo)}</h3><p class="ls-meta"><span>${ICON.clock} ${s.minutos} min</span><span>${ICON.target} ${s.n} preguntas</span></p>
    <ul class="exam-rules"><li>Tienes un solo intento.</li><li>El reloj sigue aunque cierres la app.</li><li>Lo que marques se guarda solo. Puedes ir y volver entre preguntas.</li><li>Tu docente ve tus respuestas y si sales de la pantalla.</li></ul>
    <button class="btn main" type="button" data-go>${sigue ? 'Seguir' : 'Empezar ahora'}</button></div>`, sh => {
    const b = sh.querySelector('[data-go]');
    b.onclick = async () => { b.disabled = true; b.textContent = 'Abriendo…'; try { const d = await simApi('empezar', { id: s.id }); closeSheet(); simPresenta(s, d); } catch (e) { b.disabled = false; b.textContent = 'Intentar de nuevo'; toast(simError(e)); simRefresca(); } };
  });
}

const SIM_L = 'ABCD', simCopia = id => `zuka-sim-${Cuenta.user?.id || ''}-${id}`;
const simTexto = (t, abierto) => `<details class="lec-doc"${abierto ? ' open' : ''}><summary><span class="lec-dk">Texto</span><span class="lec-dt">${esc(t.title)}</span></summary><div class="lec-body">${t.paras.map((p, i) => `<p class="lec-p"><span class="lec-pn" aria-hidden="true">${i + 1}</span>${simMate(p)}</p>`).join('')}</div></details>`;
function simPresenta(s, d) {
  cleanup?.(); cleanup = null;
  const n = d.preguntas.length, resp = d.respuestas.slice(); let fin = Date.now() + d.segundos * 1000, marcaB = d.marca || '', k = 0, salidas = 0, listo = false, sucio = false, guarda = 0, timer = 0, enviando = false, fallo = false;
  // Si la red falló antes de cerrar, lo último marcado quedó en este dispositivo.
  try { const c = JSON.parse(localStorage.getItem(simCopia(s.id)) || 'null'); if (c && c.n === n && c.inicio === d.inicio) { salidas = c.salidas || 0; if (c.p && (c.marca || '') === marcaB) { c.resp.forEach((o, i) => { resp[i] = o; }); sucio = true; } } } catch (e) { /* sin copia */ }
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(d.titulo)}</b><span class="exam-clock" role="timer" aria-label="Tiempo restante">${ICON.clock}<b></b></span></div>
    <div class="lesson-body" tabindex="-1"></div><nav class="simu-nav" aria-label="Preguntas"></nav><div class="lesson-foot exam-foot"><button class="btn ghost skip" type="button">Anterior</button><button class="btn main" type="button">Siguiente</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const body = $('.lesson-body', ov), nav = $('.simu-nav', ov), clock = $('.exam-clock', ov), [ant, sig] = [$('.skip', ov), $('.btn.main', ov)];
  const copia = () => { try { localStorage.setItem(simCopia(s.id), JSON.stringify({ n, inicio: d.inicio, marca: marcaB, resp, salidas, p: sucio })); } catch (e) { /* sin sitio */ } };
  const manda = async () => { if (!sucio || listo || enviando) return; sucio = false; enviando = true; try { const r = await simApi('guardar', { id: s.id, respuestas: resp, salidas }); if (listo) return; if (r.guardado === false) return yaNo(r); fin = Date.now() + r.segundos * 1000; marcaB = r.marca || ''; copia(); ov.querySelector('.simu')?.classList.remove('sinred'); } catch (e) { sucio = true; ov.querySelector('.simu')?.classList.add('sinred'); } enviando = false; };
  // Ya se entregó en otro dispositivo o el docente lo cerró antes: se dice, no se finge.
  const yaNo = r => { listo = true; clearInterval(timer); clearTimeout(guarda); dismissDialog(); limpia(); final(r, 'Este simulacro ya cerró', 'Vale lo que alcanzó a guardarse antes.'); };
  const limpia = () => { try { localStorage.removeItem(simCopia(s.id)); } catch (e) { /* nada */ } };
  function final(r, t, p) {
    nav.hidden = true; body.innerHTML = `<div class="simu-fin"><span class="lock-ico">${ICON.check}</span><h2>${t}</h2><p>${p ? `${p} ` : ''}${r.ver ? 'Ya puedes ver tus respuestas.' : s.muestra === 'nunca' ? 'Tu docente te dirá cómo te fue.' : 'Verás tus resultados en Inicio cuando cierre.'}</p></div>`;
    const nv = { ...s, estado: 'entregado', ver: r.ver }; ant.hidden = !r.ver; ant.disabled = false; ant.textContent = 'Salir'; ant.onclick = () => cierra(); sig.disabled = false; sig.textContent = r.ver ? 'Ver respuestas' : 'Continuar'; sig.onclick = () => { cierra(); if (r.ver) simRevisar(nv); }; sig.focus(); simRefresca();
  }
  const marca = (i, o) => { resp[i] = resp[i] === o ? -1 : o; sucio = true; copia(); clearTimeout(guarda); guarda = setTimeout(manda, 2500); };
  function pinta(foco) {
    const p = d.preguntas[k], ult = k === n - 1;
    body.innerHTML = `<div class="simu-c${p.d != null && d.textos[p.d] ? ' con' : ''}">${p.d != null && d.textos[p.d] ? simTexto(d.textos[p.d], k === 0 || d.preguntas[k - 1].d !== p.d || innerWidth >= 900) : ''}<div class="simu-q"><p class="ex-kind">Pregunta ${k + 1} de ${n}</p><p class="simu-e" id="simu-e">${simMate(p.q)}</p><div class="simu-ops" role="radiogroup" aria-labelledby="simu-e">${p.o.map((o, j) => `<button type="button" role="radio" aria-checked="${resp[k] === j}" tabindex="${(resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1}" data-o="${j}"><b>${SIM_L[j]}</b><span>${simMate(o)}</span></button>`).join('')}</div></div></div>`;
    body.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => { marca(k, +b.dataset.o); Sfx.tap(); pintaOps(+b.dataset.o); }; });
    ant.disabled = !k; sig.textContent = ult ? 'Entregar' : 'Siguiente'; puntos(); body.scrollTop = 0; if (foco) body.focus({ preventScroll: true });
  }
  function pintaOps(f) { body.querySelectorAll('[data-o]').forEach((b, j) => { b.setAttribute('aria-checked', resp[k] === j); b.tabIndex = (resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1; if (j === f) b.focus({ preventScroll: true }); }); puntos(); }
  function puntos() { nav.innerHTML = d.preguntas.map((p, i) => `<button type="button" class="${i === k ? 'cur' : ''}${resp[i] >= 0 ? ' hecha' : ''}" data-i="${i}" aria-label="Pregunta ${i + 1}${resp[i] >= 0 ? ', respondida' : ''}"${i === k ? ' aria-current="true"' : ''}>${i + 1}</button>`).join(''); nav.querySelectorAll('[data-i]').forEach(b => { b.onclick = () => { k = +b.dataset.i; pinta(true); }; }); nav.querySelector('.cur')?.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  ant.onclick = () => { if (k) { k--; pinta(true); } };
  sig.onclick = async () => {
    if (k < n - 1) { k++; return pinta(true); }
    const f = resp.filter(o => o < 0).length;
    if (await ask({ title: '¿Entregar el simulacro?', text: f ? `Te ${f === 1 ? 'falta 1 pregunta' : `faltan ${f} preguntas`} por responder. Después de entregar no puedes cambiar nada.` : 'Respondiste todas. Después de entregar no puedes cambiar nada.', ok: 'Entregar', cancel: 'Seguir' })) entrega();
  };
  const t0 = () => Math.max(0, (fin - Date.now()) / 1000);
  function tick() { const q = t0(); $('b', clock).textContent = fmtClock(q); clock.classList.toggle('low', q <= 60); if (q <= 0 && !listo) entrega(true); else if (sucio && Math.round(q) % 20 === 0) manda(); }
  async function entrega(tiempo) {
    if (listo) return; listo = true; fallo = false; clearInterval(timer); clearTimeout(guarda); dismissDialog(); sig.disabled = ant.disabled = true; nav.hidden = true;
    body.innerHTML = '<p class="simu-fin">Entregando…</p>';
    try {
      const r = await simApi('entregar', { id: s.id, respuestas: resp, salidas }); limpia();
      r.guardado === false ? final(r, tiempo ? 'Se acabó el tiempo' : 'Este simulacro ya cerró', 'Vale lo que alcanzó a guardarse antes.') : final(r, tiempo ? 'Se acabó el tiempo' : 'Entregado', '');
    } catch (e) { listo = false; fallo = true; sucio = true; copia(); body.innerHTML = `<div class="simu-fin"><h2>No se pudo entregar</h2><p>${esc(simError(e))} Lo que marcaste está en este dispositivo: inténtalo ya, porque cuando se acaba el tiempo no se recibe.</p></div>`; sig.disabled = false; sig.textContent = 'Intentar de nuevo'; sig.onclick = () => entrega(tiempo); }
  }
  function cierra() { listo = true; clearInterval(timer); clearTimeout(guarda); document.removeEventListener('keydown', tecla); document.removeEventListener('visibilitychange', sale); ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('home'); }
  lessonClose = async () => { if (listo) return cierra(); if (await ask({ title: '¿Salir del simulacro?', text: 'El reloj sigue corriendo. Puedes volver desde Inicio mientras te quede tiempo.', ok: 'Salir', cancel: 'Seguir', danger: true })) { if (listo) return; await manda(); cierra(); simRefresca(); } };
  $('[data-close]', ov).onclick = () => lessonClose();
  function sale() { if (listo || fallo) return; if (!document.hidden) { sucio = true; manda(); return; }   // al volver, se ajusta el reloj con la base
    { salidas++; sucio = true; copia(); manda(); } }
  function tecla(e) { if (listo || fallo || document.querySelector('dialog[open], .dialog')) return; const b = e.target.closest?.('[data-o]'); if (b && ['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); const j = (+b.dataset.o + (e.key === 'ArrowDown' ? 1 : 3)) % 4; resp[k] = -1; marca(k, j); pintaOps(j); } else if (/^[a-d]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) { const j = SIM_L.indexOf(e.key.toUpperCase()); resp[k] = -1; marca(k, j); pintaOps(j); } }
  document.addEventListener('keydown', tecla); document.addEventListener('visibilitychange', sale);
  timer = setInterval(tick, 500); pinta(); tick(); if (sucio) manda();
}
async function simRevisar(s, boton) {
  if (boton) boton.disabled = true;
  let d; try { d = await simApi('revisar', { id: s.id }); } catch (e) { if (boton) boton.disabled = false; return toast(simError(e)); }
  if (boton) boton.disabled = false;
  cleanup?.(); cleanup = null;
  const ov = $('#overlay'), nota = instNota(d.aciertos, d.n), les = new Map(); d.preguntas.forEach((p, i) => { if (p.l && d.respuestas[i] !== p.r) les.set(p.l, (les.get(p.l) || 0) + 1); });
  const rep = [...les].sort((a, b) => b[1] - a[1]).map(x => findLesson(x[0])).filter(Boolean).slice(0, 4);
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(d.titulo)}</b></div><div class="lesson-body"><div class="simu-rev"><div class="simu-nota"><b>${nota}</b><span>de 100<small>${d.aciertos} de ${d.n} preguntas</small></span></div>
    ${rep.length ? `<section class="er-sec er-rev"><h3>${ICON.bulb} Para repasar</h3>${rep.map(f => `<button class="btn ghost sm" type="button" data-les="${f.l.id}">${esc(f.l.title)} ${ICON.right}</button>`).join('')}</section>` : ''}
    ${d.preguntas.map((p, i) => { const o = d.respuestas[i], ok = o === p.r; return `<details class="er-q ${ok ? 'ok' : 'bad'}"><summary><span class="er-ic">${ok ? ICON.check : o < 0 ? '–' : ICON.x}</span><span><small>Pregunta ${i + 1} · ${ok ? 'Correcta' : o < 0 ? 'Sin responder' : 'Incorrecta'}</small>${simMate(p.q)}</span></summary><div class="er-q-body">${p.d != null && d.textos[p.d] ? simTexto(d.textos[p.d], false) : ''}<ol class="simu-op2">${p.o.map((x, j) => `<li class="${j === p.r ? 'ok' : j === o ? 'mal' : ''}"><b>${SIM_L[j]}</b><span>${simMate(x)}${j === p.r ? '<small>Correcta</small>' : j === o ? '<small>La que marcaste</small>' : ''}</span></li>`).join('')}</ol>${p.e ? `<p class="fb-exp">${simMate(p.e)}</p>` : ''}</div></details>`; }).join('')}</div></div><div class="lesson-foot"><button class="btn main" type="button">Continuar</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const cierra = () => { ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('home'); };
  lessonClose = cierra; $('[data-close]', ov).onclick = cierra; $('.lesson-foot .btn', ov).onclick = cierra;
  ov.querySelectorAll('[data-les]').forEach(b => { b.onclick = () => { const f = findLesson(b.dataset.les); cierra(); if (f && isUnlocked(f.c, f.l)) startLesson(f.c, f.l); else openCourse('preicfes'); }; });
}
