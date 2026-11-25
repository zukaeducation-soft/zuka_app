// Página pública para colegios e instituciones (spec 2026-11-25-instituciones): servicios, el portal con datos de ejemplo y el
// cotizador. Las cuentas están en js/instituciones.js; la solicitud entra por pedir_cotizacion, que recalcula el precio.
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const sb = window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY, { auth: { persistSession: false, storageKey: 'zuka-publico' } }) : null;
const COLOR = { preuda: '#a3e635', preicfes: '#f08cff', algebra: '#b3a7ff', trig: '#5fdcf2', calc: '#ff9dcb', geo: '#8fb8ff', fis: '#ffcf5c', int: '#6ee7a8', lin: '#ffb27a' };
const TXT = { preuda: 'El examen de admisión a la UdeA: razonamiento lógico y comprensión lectora.', preicfes: 'Las cinco pruebas de Saber 11.', algebra: 'De los conjuntos a los logaritmos, desde cero.', trig: 'Ángulos, triángulos y ondas.' };
let CURSOS = [['preuda', 'Preuniversitario UdeA'], ['preicfes', 'Preicfes Saber 11'], ['algebra', 'Álgebra'], ['trig', 'Trigonometría']].map(([id, nombre]) => ({ id, nombre })), PRODUCTOS = null, AJUSTES = {};
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const q = new URLSearchParams(location.search), nDe = v => Math.max(1, Math.min(5000, Math.round(+v) || 60));
const st = { n: nDe(q.get('n')), meses: q.get('m') === '12' ? 12 : 6, cursos: (q.get('c') || 'preuda').split(',').filter(c => /^[a-z]+$/.test(c)), extras: [], d: {} };
const conf = () => instConf(AJUSTES.inst_precios), precio = () => instPrecio(st, PRODUCTOS, conf());
const vaN = v => { const n = 10 * Math.pow(100, v / 100); return n < 50 ? Math.round(n) : n < 200 ? Math.round(n / 5) * 5 : Math.round(n / 10) * 10; }, deN = n => Math.max(0, Math.min(100, 50 * Math.log10(n / 10)));

// ---- servicios ----
const SERV = [['Cursos por cupos', 'Cada estudiante entra con su código, en el celular o el computador.', '#a3e635', '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11"/>'], ['Portal de seguimiento', 'Quién entra, cuánto estudia, qué domina y quién necesita ayuda.', '#6fd3ff', '<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/>'], ['Gimnasio cerebral', 'Retos por niveles para practicar lo que ya aprendieron.', '#ffd257', '<path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/>'],
  ['Libros impresos', 'Cuatro libros a color para el examen de admisión. Se cotizan por cantidad.', '#ff9d8c', '<path d="M12 6c-2-1.500-5-2-8-2v14c3 0 6 .5 8 2 2-1.500 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>'], ['Asesorías en vivo', 'Una hora virtual con un profe, para un grupo pequeño. Se cotizan por horas.', '#c9bbff', '<rect x="3" y="5" width="13" height="14" rx="3"/><path d="M16 10l5-3v10l-5-3"/>']];
$('.pi-serv').innerHTML = SERV.map(([h, p, c, d]) => `<article style="--c:${c}"><svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg><h3>${h}</h3><p>${p}</p></article>`).join('') + '<article class="pi-serv-c"><h3>Cursos disponibles</h3><ul></ul></article>';
const pintaCursos = () => { $('.pi-serv-c ul').innerHTML = CURSOS.map(c => `<li style="--c:${COLOR[c.id] || '#6fd3ff'}"><b>${esc(c.nombre)}</b>${TXT[c.id] || ''}</li>`).join(''); };

// ---- el portal, para tocar (datos de ejemplo) ----
const EJ = [['Ana Ríos', '11A', 86, 120], ['Juan Mejía', '11A', 64, 75], ['Luisa Cano', '11B', 41, 40], ['Mateo Vélez', '11B', 12, 5], ['Sara Gil', '10A', 73, 98], ['Tomás Roa', '10A', 8, 0]];
const DEMOS = {
  registrar: ['Registrar', () => `<div class="pd-dos"><div><h3>Pega tu lista</h3><p>Desde Excel: nombre, grupo y documento. Cambia el texto y mira.</p><textarea aria-label="Lista de ejemplo" spellcheck="false">Ana Ríos, 11A\nJuan Mejía, 11A\nLuisa Cano, 11B\nMateo Vélez, 11B</textarea></div><div class="pd-res" aria-live="polite"></div></div>`, d => {
    const ta = $('textarea', d), pinta = () => { const { lista, malas } = instLista(ta.value); $('.pd-res', d).innerHTML = `<p class="pd-cup"><b>${lista.length}</b> de 10 cupos<i style="--p:${Math.min(100, lista.length * 10)}%"></i></p><ul>${lista.slice(0, 10).map((x, i) => `<li><span>${esc(x.nombre)}<small>${esc(x.grupo)}</small></span><code>${['K7M2P', 'QX4TR', 'H9WDN', 'B3YVC', 'T8JLE', 'M5RKS', 'W2PFA', 'D6XQH', 'N4CTY', 'R9GVB'][i]}-•••••</code></li>`).join('')}</ul>${malas.length ? `<p class="pd-mal">${malas.length === 1 ? 'Un renglón' : `${malas.length} renglones`} por revisar.</p>` : ''}${lista.length > 10 ? '<p class="pd-mal">No alcanzan los cupos del ejemplo.</p>' : ''}`; };
    ta.oninput = pinta; pinta();
  }],
  seguir: ['Seguir', () => `<div class="pd-f" role="group" aria-label="Grupo">${['Todos', '10A', '11A', '11B'].map((g, i) => `<button type="button" data-g="${g}" aria-pressed="${!i}">${g}</button>`).join('')}</div><div class="pd-seg" aria-live="polite"></div>`, d => {
    let g = 'Todos'; const pinta = () => { const xs = EJ.filter(e => g === 'Todos' || e[1] === g), m = Math.round(xs.reduce((t, e) => t + e[2], 0) / xs.length); $('.pd-seg', d).innerHTML = `<div class="pd-k"><p><b>${xs.filter(e => e[3]).length} de ${xs.length}</b>estudiaron esta semana</p><p><b>${m} %</b>de avance</p><p><b>${xs.reduce((t, e) => t + e[3], 0)}</b>minutos</p></div><ul>${xs.map(e => `<li class="${e[2] < 20 ? 'al' : ''}"><span>${e[0]}<small>${e[1]}${e[3] ? '' : ' · no ha entrado'}</small></span><i style="--p:${e[2]}%"></i><b>${e[2]} %</b></li>`).join('')}</ul>`; };
    $$('[data-g]', d).forEach(b => { b.onclick = () => { g = b.dataset.g; $$('[data-g]', d).forEach(x => x.setAttribute('aria-pressed', x === b)); pinta(); }; }); pinta();
  }],
  metas: ['Poner metas', () => '<div class="pd-dos"><div><h3>Una meta con fecha</h3><p>Elige cuántas lecciones. El estudiante la ve al abrir la app.</p><input type="range" min="1" max="8" value="4" aria-label="Lecciones de la meta"><p class="pd-n"></p></div><div class="pd-cel" aria-live="polite"></div></div>', d => {
    const r = $('input', d), pinta = () => { const n = +r.value; $('.pd-n', d).innerHTML = `<b>${n}</b> ${n === 1 ? 'lección' : 'lecciones'} de Álgebra para 11A`; $('.pd-cel', d).innerHTML = `<small>Lo que ve el estudiante</small><b>Conjuntos, antes del viernes</b><span>1 de ${n} ${n === 1 ? 'lección' : 'lecciones'}</span><i style="--p:${100 / n}%"></i><em>Seguir</em>`; }; r.oninput = pinta; pinta();
  }],
  docentes: ['Tus docentes', () => `<div class="pd-f" role="group" aria-label="Quién mira">${['Gestor', 'Docente de 11A', 'Docente de 10A'].map((g, i) => `<button type="button" data-g="${i}" aria-pressed="${!i}">${g}</button>`).join('')}</div><div class="pd-seg" aria-live="polite"></div>`, d => {
    const G = [null, '11A', '10A']; const pinta = i => { const xs = EJ.filter(e => !G[i] || e[1] === G[i]); $('.pd-seg', d).innerHTML = `<p class="pd-que">${i ? `Ve a los ${xs.length} estudiantes de ${G[i]} y les pone metas.` : 'Ve a todos, registra, cambia grupos y descarga listas.'}</p><ul>${EJ.map(e => `<li class="${xs.includes(e) ? '' : 'no'}"><span>${xs.includes(e) ? e[0] : '— — —'}<small>${e[1]}</small></span><i style="--p:${xs.includes(e) ? e[2] : 0}%"></i><b>${xs.includes(e) ? `${e[2]} %` : ''}</b></li>`).join('')}</ul>`; };
    $$('[data-g]', d).forEach(b => { b.onclick = () => { $$('[data-g]', d).forEach(x => x.setAttribute('aria-pressed', x === b)); pinta(+b.dataset.g); }; }); pinta(0);
  }],
};
const tabs = $('.pi-tabs');
tabs.innerHTML = Object.entries(DEMOS).map(([k, [t]], i) => `<button type="button" role="tab" id="pi-t-${k}" aria-controls="pi-demo" data-k="${k}" aria-selected="${!i}" tabindex="${i ? -1 : 0}">${t}</button>`).join('');
function demo(k) { const d = $('#pi-demo'); $$('button', tabs).forEach(b => { const on = b.dataset.k === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; }); d.setAttribute('aria-labelledby', `pi-t-${k}`); d.innerHTML = DEMOS[k][1](); DEMOS[k][2](d); }
tabs.onclick = e => { const b = e.target.closest('button'); if (b) demo(b.dataset.k); };
tabs.onkeydown = e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key], bs = $$('button', tabs); if (!d) return; e.preventDefault(); const b = bs[(bs.indexOf(document.activeElement) + d + bs.length) % bs.length]; demo(b.dataset.k); b.focus(); };
demo('registrar');

// ---- precios y cotizador ----
const EXTRAS = ['Libros impresos', 'Asesorías en vivo'], TIPOS = ['Colegio', 'Preuniversitario o academia', 'Universidad o instituto', 'Fundación', 'Alcaldía o secretaría', 'Otra'];
function cotizador() {
  const c = $('.pi-cot');
  c.innerHTML = `<div class="pc-arma"><div class="pc-n"><label for="pc-n">Estudiantes</label><input id="pc-n" type="number" min="1" max="5000" inputmode="numeric"></div><input class="pc-r" type="range" min="0" max="100" step="1" aria-label="Estudiantes, con la barra">
      <div class="pc-tr" aria-label="Descuento por cantidad"></div><fieldset><legend>Cursos</legend><div class="pc-cs"></div></fieldset>
      <fieldset><legend>Duración</legend><div class="pc-cs"><button type="button" data-m="6">6 meses</button><button type="button" data-m="12">1 año<small></small></button></div></fieldset>
      <fieldset><legend>También me interesa</legend><div class="pc-cs">${EXTRAS.map(x => `<button type="button" data-x="${x}">${x}</button>`).join('')}</div></fieldset></div>
    <div class="pc-lado"><div class="pc-res" aria-live="polite"></div><form class="pc-form" novalidate><h3>Recibe la cotización</h3>
      ${campo('nombre', 'Institución', 'required maxlength="120" autocomplete="organization"')}<label class="pf"><span>Tipo</span><select name="tipo">${TIPOS.map(t => `<option>${t}</option>`).join('')}</select></label>${campo('ciudad', 'Ciudad o municipio', 'maxlength="80" autocomplete="address-level2"')}${campo('contacto', 'Tu nombre', 'required maxlength="80" autocomplete="name"')}${campo('cargo', 'Tu cargo (opcional)', 'maxlength="60" autocomplete="organization-title"')}${campo('correo', 'Correo', 'type="email" required maxlength="120" autocomplete="email"')}${campo('telefono', 'Celular o teléfono', 'type="tel" required maxlength="30" autocomplete="tel"')}
      <label class="pf an"><span>¿Algo que debamos saber? (opcional)</span><textarea name="mensaje" rows="3" maxlength="800"></textarea></label>
      <label class="pf-c an"><input type="checkbox" name="acepta"><span>Autorizo que Zuka use estos datos para responder esta solicitud (Ley 1581 de 2012).</span></label><p class="pf-mal an" role="alert" hidden></p><p class="pf-n an">Valores en pesos colombianos. El valor final y los impuestos se confirman en la propuesta.</p><button class="pi-btn azul an" type="submit">Pedir cotización</button></form></div>`;
  const n = $('#pc-n'), r = $('.pc-r');
  n.oninput = () => { if (+n.value >= 1) { st.n = nDe(n.value); r.value = deN(st.n); pinta(); } }; n.onchange = () => { st.n = nDe(n.value); n.value = st.n; pinta(); };
  r.oninput = () => { st.n = vaN(+r.value); n.value = st.n; pinta(); };
  c.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.c) st.cursos = st.cursos.includes(b.dataset.c) ? st.cursos.filter(x => x !== b.dataset.c) : [...st.cursos, b.dataset.c];
    else if (b.dataset.m) st.meses = +b.dataset.m; else if (b.dataset.x) st.extras = st.extras.includes(b.dataset.x) ? st.extras.filter(x => x !== b.dataset.x) : [...st.extras, b.dataset.x];
    else if (b.dataset.t) { st.n = +b.dataset.t; n.value = st.n; r.value = deN(st.n); } else return;
    pinta();
  };
  n.value = st.n; r.value = deN(st.n);
  $('.pc-form').onsubmit = envia;
  pinta();
}
const campo = (k, t, attr) => `<label class="pf"><span>${t}</span><input name="${k}" ${/type=/.test(attr) ? '' : 'type="text"'} ${attr}></label>`;
let antes = 0;
function pinta() {
  const p = precio(), cf = conf(), sig = instSiguiente(st.n, cf), nom = id => esc((CURSOS.find(c => c.id === id) || { nombre: id }).nombre);
  $('.pc-arma .pc-cs').innerHTML = CURSOS.map(c => { const x = PRODUCTOS?.find(y => y.curso === c.id && y.meses === 6 && y.activo)?.precio; return `<button type="button" data-c="${c.id}" aria-pressed="${st.cursos.includes(c.id)}" style="--c:${COLOR[c.id] || '#6fd3ff'}">${esc(c.nombre)}<small>${x != null ? `${cop(x)} por 6 meses` : PRODUCTOS ? 'Se cotiza' : '…'}</small></button>`; }).join('');
  $$('[data-m]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.m === st.meses)); $$('[data-x]').forEach(b => b.setAttribute('aria-pressed', st.extras.includes(b.dataset.x)));
  $('[data-m="12"] small').textContent = cf.anio ? `${cf.anio} % menos` : '';
  const max = Math.max(1, ...cf.tramos.map(t => t[1]));
  $('.pc-tr').innerHTML = cf.tramos.map((t, i) => { const fin = cf.tramos[i + 1]?.[0]; return `<button type="button" data-t="${t[0] === 1 ? 10 : t[0]}" class="${st.n >= t[0] && (!fin || st.n < fin) ? 'on' : ''}" style="--h:${100 - t[1] / max * 55}%"><i></i><b>${t[1] ? `−${t[1]} %` : 'Precio base'}</b><small>${fin ? `${t[0]} a ${fin - 1}` : `${t[0]} o más`}</small></button>`; }).join('');
  $('.pc-res').innerHTML = !st.cursos.length ? '<p class="pr-v">Elige al menos un curso.</p>' : `<p class="pr-t">${st.n} ${st.n === 1 ? 'estudiante' : 'estudiantes'} · ${st.meses === 12 ? '1 año' : '6 meses'}</p>${!PRODUCTOS ? '<p class="pr-v">Calculando…</p>' : p.unitario ? `<p class="pr-u"><b data-cuenta>${cop(antes || p.unitario)}</b> por estudiante</p><p class="pr-tot">Total estimado <b>${cop(p.total)}</b></p>${p.base > p.unitario ? `<p class="pr-a">Precio normal ${cop(p.base)}. Ahorras ${cop((p.base - p.unitario) * st.n)}.</p>` : ''}` : '<p class="pr-u"><b>Se cotiza</b></p>'}
    ${p.unitario && p.sinPrecio.length ? `<p class="pr-s">${p.sinPrecio.map(nom).join(', ')}: te enviamos el valor.</p>` : ''}${st.extras.length ? `<p class="pr-s">${st.extras.join(' y ')}: te enviamos el valor.</p>` : ''}${p.unitario && sig ? `<p class="pr-s pr-n">Con ${sig[0] - st.n} ${sig[0] - st.n === 1 ? 'estudiante' : 'estudiantes'} más, el descuento sube al ${sig[1]} %.</p>` : ''}`;
  const b = $('[data-cuenta]');   // el número corre hasta el nuevo precio
  if (b) { const de = antes || p.unitario, a = p.unitario, t0 = performance.now(); antes = a; if (!quieto && de !== a) { const f = t => { if (!b.isConnected) return; const k = Math.min(1, (t - t0) / 320); b.textContent = cop(de + (a - de) * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); } else b.textContent = cop(a); }
}
async function envia(e) {
  e.preventDefault();
  const f = e.target, msg = $('.pf-mal', f), v = Object.fromEntries(new FormData(f)), mal = (t, k) => { msg.textContent = t; msg.hidden = false; f[k]?.focus(); };
  msg.hidden = true;
  if (!st.cursos.length) return mal('Elige al menos un curso.');
  if (v.nombre.trim().length < 2) return mal('Escribe el nombre de la institución.', 'nombre');
  if (v.contacto.trim().length < 2) return mal('Escribe tu nombre.', 'contacto');
  if (!/^\S+@\S+\.\S+$/.test(v.correo.trim())) return mal('Revisa el correo.', 'correo');
  const tel = v.telefono.replace(/\D/g, ''); if (tel.length < 7 || tel.length > 15) return mal('Revisa el teléfono.', 'telefono');
  if (!f.acepta.checked) return mal('Falta la autorización de datos.', 'acepta');
  const b = $('[type=submit]', f); b.disabled = true; b.textContent = 'Enviando…';
  try {
    if (!sb) throw new Error('red');
    const { data, error } = await sb.rpc('pedir_cotizacion', { p: { ...v, acepta: true, estudiantes: st.n, meses: st.meses, cursos: st.cursos, extras: st.extras } });
    if (error) throw error;
    if (!data.ok) { mal('Ya recibimos varias solicitudes desde aquí. Escríbenos por WhatsApp.'); } else listo(data, v);
  } catch (x) {
    if (x.code === '22023') mal(x.message);
    else {   // la base no respondió: la misma solicitud, por WhatsApp
      const p = precio(), u = waLink(AJUSTES.whatsapp, `Hola, quiero una cotización de Zuka para ${v.nombre.trim()} (${v.ciudad.trim() || 'sin ciudad'}): ${st.n} estudiantes, ${st.meses === 12 ? '1 año' : '6 meses'}, ${st.cursos.map(c => (CURSOS.find(y => y.id === c) || { nombre: c }).nombre).join(', ')}${st.extras.length ? ` y ${st.extras.join(', ')}` : ''}.${p.unitario ? ` Estimado: ${cop(p.total)}.` : ''} Soy ${v.contacto.trim()}, ${v.correo.trim()}.`);
      mal('No se pudo enviar desde aquí.'); if (u) msg.insertAdjacentHTML('beforeend', ` <a href="${esc(u)}" target="_blank" rel="noopener">Enviarla por WhatsApp</a>`);
    }
  }
  b.disabled = false; b.textContent = 'Pedir cotización';
}
function listo(r, v) {
  const e = r.estimado, num = `ZI-${String(r.id).padStart(4, '0')}`, nom = id => (CURSOS.find(c => c.id === id) || { nombre: id }).nombre, sin = e.sin_precio || [];
  const hoja = `<div class="ho"><header><img src="/brand/logo-light.svg" alt="Zuka" width="104" height="38"><div><b>Cotización ${num}</b><span>${new Date().toLocaleDateString('es-CO', { dateStyle: 'long' })}</span></div></header>
    <dl><div><dt>Institución</dt><dd>${esc(v.nombre)}</dd></div><div><dt>Contacto</dt><dd>${esc(v.contacto)}${v.cargo ? `, ${esc(v.cargo)}` : ''}</dd></div><div><dt>Ciudad</dt><dd>${esc(v.ciudad) || '—'}</dd></div><div><dt>Cupos</dt><dd>${st.n}</dd></div><div><dt>Duración</dt><dd>${st.meses === 12 ? '1 año' : '6 meses'}</dd></div></dl>
    <table><thead><tr><th>Concepto</th><th>Valor</th></tr></thead><tbody>${st.cursos.filter(c => !sin.includes(c)).map(c => `<tr><td>${esc(nom(c))}</td><td>Incluido</td></tr>`).join('')}<tr><td>Portal para gestores y docentes</td><td>Incluido</td></tr>${[...sin.map(nom), ...st.extras].map(t => `<tr><td>${esc(t)}</td><td>Por cotizar</td></tr>`).join('')}${e.unitario ? `<tr><td>Precio por estudiante${e.descuento ? ` (descuento por cantidad ${e.descuento} %)` : ''}${e.anio ? ` (por un año ${e.anio} %)` : ''}</td><td>${cop(e.unitario)}</td></tr>` : ''}</tbody><tfoot><tr><th>Total estimado</th><th>${e.unitario ? cop(e.total) : 'Por cotizar'}</th></tr></tfoot></table>
    <p>Valores en pesos colombianos. Es un estimado: el valor final y los impuestos se confirman en la propuesta.</p></div>`;
  const wa = waLink(AJUSTES.whatsapp, `Hola, pedí la cotización ${num} para ${v.nombre} (${st.n} estudiantes).`);
  $('.pi-cot').innerHTML = `<div class="pc-ok"><h3 tabindex="-1">¡Recibimos tu solicitud!</h3><p>Te escribimos a ${esc(v.correo)}. Mientras tanto, guarda tu cotización.</p>${hoja}<div class="pi-ctas"><button class="pi-btn azul" type="button" data-imp>Imprimir o guardar en PDF</button>${wa ? `<a class="pi-btn borde-o" target="_blank" rel="noopener" href="${esc(wa)}">Escribir por WhatsApp</a>` : ''}<button class="pi-btn borde-o" type="button" data-otra>Hacer otra</button></div></div>`;
  $('#pi-hoja').innerHTML = hoja;
  $('[data-imp]').onclick = () => { $('#pi-hoja').hidden = false; print(); $('#pi-hoja').hidden = true; };
  $('[data-otra]').onclick = () => { antes = 0; cotizador(); $('#cotizar').scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' }); };
  $('#cotizar').scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' }); $('.pc-ok h3').focus({ preventScroll: true });
}
// ---- datos ----
pintaCursos(); cotizador();
if (sb) Promise.all([sb.from('cursos').select('id,nombre,publicado,orden').order('orden'), sb.from('productos').select('curso,meses,precio,activo'), sb.from('ajustes').select('*')]).then(([c, p, a]) => {
  if (c.data?.length) { CURSOS = c.data.filter(x => x.publicado); st.cursos = st.cursos.filter(x => CURSOS.some(y => y.id === x)); if (!st.cursos.length && CURSOS[0]) st.cursos = [CURSOS[0].id]; }
  if (p.data) PRODUCTOS = p.data;
  if (a.data) AJUSTES = Object.fromEntries(a.data.map(x => [x.clave, x.valor]));
  const u = waLink(AJUSTES.whatsapp, 'Hola, represento a una institución y quiero información de Zuka.'), w = $('.pi-wa'); if (u) { w.href = u; w.hidden = false; }
  pintaCursos(); if ($('.pc-res')) pinta();
}, () => {});
// «El portal» se inclina con el puntero, como las tarjetas de la app.
const foto = $('.pi-foto'); if (!quieto && matchMedia('(hover: hover)').matches) { foto.onpointermove = e => { const r = foto.getBoundingClientRect(); foto.style.setProperty('--x', ((e.clientX - r.left) / r.width - .5).toFixed(3)); foto.style.setProperty('--y', ((e.clientY - r.top) / r.height - .5).toFixed(3)); }; foto.onpointerleave = () => { foto.style.setProperty('--x', 0); foto.style.setProperty('--y', 0); }; }
