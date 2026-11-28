// Tutor de dudas (spec 2026-11-28-tutor-de-dudas; idea tomada de OpenMAIC): botón «Duda» en la barra de la lección (y flotante
// en la explicación en el celular). Abre una hoja con preguntas listas sobre el paso o el ejercicio que se ve, y la función `tutor`
// (supabase/functions/tutor) responde con Gemini sin regalar la respuesta. Lo que viaja: curso, lección, el enunciado y la pista (o
// el paso y sus ideas); nunca la solución.
const Tutor = { curso: null, leccion: null, foco: null, hilo: [], quedan: null, pidiendo: null };
const TUTOR_ERR = {
  sesion: 'Entra con tu código para preguntarle al tutor.',
  limite: 'Ya usaste tus preguntas de hoy. En unas horas tienes más.',
  apagado: 'El tutor todavía no está disponible. Mientras tanto, la pista te puede ayudar.',
  formato: 'Toca una de las preguntas o escribe tu duda.',
  bloqueo: 'El tutor no puede responder eso. Pregunta sobre la lección.',
  servidor: 'El tutor no pudo responder ahora. Inténtalo de nuevo.',
  red: 'Sin conexión: el tutor necesita internet.',
  conectando: 'Estamos conectando tu cuenta. Inténtalo de nuevo en un momento.',
};
const TUTOR_ICON = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M9.8 9.2a2.3 2.3 0 1 1 3.2 2.1c-.6.3-1 .8-1 1.4M12 14.6v.01"/></svg>';
const tutorCorta = (s, n) => String(s ?? '').trim().slice(0, n);

// Lo que se envía a la función (puro: se prueba en Node). Todo va recortado como lo recorta el servidor.
function tutorCuerpo(foco, { curso, leccion, pregunta, historial }) {
  const f = foco || {}, ej = f.tipo === 'ejercicio';
  const contexto = ej ? `Enunciado: ${f.q || ''}${f.hint ? `\nPista del ejercicio: ${f.hint}` : ''}`
    : `Paso de la explicación: ${f.texto || ''}${(f.ideas || []).length ? `\nIdeas que ya construyó: ${f.ideas.join(' | ')}` : ''}`;
  return {
    curso: tutorCorta(curso && curso.name, 80), leccion: tutorCorta(leccion && leccion.title, 120), leccion_id: tutorCorta(leccion && leccion.id, 40),
    tipo: ej ? 'ejercicio' : 'explica', contexto: tutorCorta(contexto, 1500), pregunta: tutorCorta(pregunta, 300),
    historial: (historial || []).slice(-4).map(h => (h.rol === 'tutor' ? { rol: 'tutor', texto: tutorCorta(h.texto, 1200) } : { rol: 'estudiante', texto: tutorCorta(h.texto, 300) })),
  };
}
const tutorChips = f => (f && f.tipo === 'ejercicio' ? ['¿Por dónde empiezo?', 'No entiendo el enunciado', '¿Qué idea uso aquí?'] : ['No entiendo este paso', '¿Por qué funciona?', 'Dame otro ejemplo']);
// Solo las vueltas completas (pregunta y respuesta) viajan como conversación.
function tutorVueltas(hilo) {
  const out = [];
  for (let i = 0; i + 1 < hilo.length; i++) if (hilo[i].rol === 'estudiante' && hilo[i + 1].rol === 'tutor' && !hilo[i + 1].mal && !hilo[i + 1].espera) out.push(hilo[i], hilo[i + 1]);
  return out;
}

// La lección dice dónde está el estudiante: startLesson (js/app.js), renderExercise (js/exercises.js) y Explora (js/explora.js).
// null: nada sobre qué preguntar (un video, la pantalla final).
function tutorLeccion(c, l) { Tutor.curso = c; Tutor.leccion = l; Tutor.foco = null; Tutor.hilo = []; }
function tutorEnfoca(foco) {
  if (JSON.stringify(foco) !== JSON.stringify(Tutor.foco)) Tutor.hilo = [];   // otra pregunta, otra conversación
  Tutor.foco = foco; tutorMarca();
}
// Se enciende con el ajuste público `tutor_diario` (lo crea la migración del tutor; 0 lo apaga desde el panel), con sesión.
// En el computador de desarrollo siempre se ve.
const tutorEncendido = aj => Number.parseInt(String((aj || {}).tutor_diario || ''), 10) > 0;
const tutorHay = () => (typeof SIN_CANDADOS !== 'undefined' && SIN_CANDADOS) || (typeof Cuenta !== 'undefined' && !!Cuenta.user && tutorEncendido(Cuenta.ajustes));
function tutorMarca() {
  if (typeof document === 'undefined') return;
  const no = !Tutor.foco || !!Tutor.foco.exam || !tutorHay();   // en una evaluación no hay tutor
  document.querySelectorAll('.lesson .tutor-btn').forEach(b => { b.hidden = no; });
}
const tutorBoton = (cls = '') => `<button class="tutor-btn ${cls}" type="button" aria-label="Tengo una duda" hidden>${TUTOR_ICON}<span>Duda</span></button>`;

const tutorTexto = s => String(s || '').split(/\n{2,}/).map(p => `<p>${tex(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
function tutorPinta(hilo) {
  return hilo.map(h => `<div class="tutor-msg ${h.rol}${h.mal ? ' mal' : ''}">${h.rol === 'tutor' ? (h.espera ? '<p class="tutor-espera">Pensando…</p>' : tutorTexto(h.texto)) : `<p>${esc(h.texto)}</p>`}</div>`).join('');
}
async function tutorPide(cuerpo) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return { ok: false, error: 'red' };
  if (!Cuenta.sb || !Cuenta.user) return { ok: false, error: 'sesion' };
  if (Cuenta.user.offline) return { ok: false, error: 'conectando' };   // sesión guardada que aún no se confirma con el servidor
  const { data, error } = await Cuenta.sb.functions.invoke('tutor', { body: cuerpo });
  if (!error) return data || { ok: false, error: 'servidor' };
  if (error.context && error.context.status === 401) return { ok: false, error: 'sesion' };
  try { const j = await error.context.json(); if (j && j.error) return j; } catch (e) { /* sin cuerpo */ }
  return { ok: false, error: /fetch|network|failed to send/i.test(`${error.name} ${error.message}`) ? 'red' : 'servidor' };
}
function openTutor() {
  const f = Tutor.foco; if (!f) return;
  const sobre = f.tipo === 'ejercicio' ? f.q : f.texto;
  openSheet(`<h3 class="sheet-title">Tu duda</h3>
    <p class="tutor-sobre"><b>${f.tipo === 'ejercicio' ? 'Sobre este ejercicio' : 'Sobre este paso'}:</b> ${tex(sobre || '')}</p>
    <div class="tutor-hilo"></div><p class="tutor-dice sk-oculto" role="status"></p>
    <div class="tutor-chips">${tutorChips(f).map(t => `<button type="button" class="tutor-chip">${esc(t)}</button>`).join('')}</div>
    <form class="tutor-form" novalidate><label class="fld"><span>O escribe tu duda</span><textarea name="duda" rows="2" maxlength="300"></textarea></label>
      <button class="btn main" type="submit">Preguntar</button></form>
    <p class="tutor-pie muted">El tutor te orienta; no te da la respuesta de los ejercicios.<span class="tutor-quedan"></span></p>`, sh => {
    const form = sh.querySelector('.tutor-form');
    // Siempre sobre la hoja que está abierta ahora (se pudo cerrar y abrir otra mientras el tutor respondía).
    const pinta = () => {
      const hilo = document.querySelector('#sheet .tutor-hilo'); if (!hilo) return;
      const b = document.querySelector('#sheet .tutor-form button'), q = document.querySelector('#sheet .tutor-quedan');
      hilo.innerHTML = tutorPinta(Tutor.hilo); hilo.lastElementChild?.scrollIntoView({ block: 'nearest' });
      b.disabled = !!Tutor.pidiendo; if (Tutor.quedan != null) q.textContent = ` Te quedan ${Tutor.quedan} preguntas hoy.`;
    };
    const avisa = t => { const d = document.querySelector('#sheet .tutor-dice'); if (d) d.textContent = String(t).replace(/\$/g, ''); };   // el lector de pantalla oye solo lo nuevo
    const pregunta = async texto => {
      texto = tutorCorta(texto, 300);
      if (Tutor.pidiendo || texto.length < 2) return;
      const cuerpo = tutorCuerpo(f, { curso: Tutor.curso, leccion: Tutor.leccion, pregunta: texto, historial: tutorVueltas(Tutor.hilo) });
      const espera = { rol: 'tutor', espera: true };
      Tutor.hilo = [...Tutor.hilo.filter(h => !h.mal), { rol: 'estudiante', texto }, espera]; Tutor.pidiendo = espera; pinta();
      let r; try { r = await tutorPide(cuerpo); } catch (e) { r = { ok: false, error: 'servidor' }; } finally { Tutor.pidiendo = null; }
      const i = Tutor.hilo.indexOf(espera);
      if (i < 0) return pinta();   // cambió de paso mientras tanto: esa conversación ya no está
      const msg = r && r.ok ? { rol: 'tutor', texto: r.respuesta } : { rol: 'tutor', mal: true, texto: TUTOR_ERR[r && r.error] || TUTOR_ERR.servidor };
      Tutor.hilo.splice(i, 1, msg);
      if (r && (r.ok || r.error === 'limite')) Tutor.quedan = r.quedan ?? 0;
      pinta(); avisa(msg.texto);
    };
    sh.querySelectorAll('.tutor-chip').forEach(c => { c.onclick = () => pregunta(c.textContent); });
    form.onsubmit = e => {
      e.preventDefault(); const t = form.duda.value;
      if (tutorCorta(t, 300).length < 2) { Tutor.hilo = [...Tutor.hilo.filter(h => !h.mal), { rol: 'tutor', mal: true, texto: TUTOR_ERR.formato }]; pinta(); avisa(TUTOR_ERR.formato); return; }
      form.duda.value = ''; pregunta(t);
    };
    pinta();
  });
}
