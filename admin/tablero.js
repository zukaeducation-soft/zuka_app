// Tablero del panel (spec 2026-11-24-tablero): cifras con filtros cruzados. Todo se calcula aquí con las tablas que la
// administración ya puede leer (RLS es_admin); no guarda nada. Va antes de panel.js, que trae $, esc, curso, tabla, csv…

// ---------- cuentas puras (se prueban en Node: tests/tablero.test.js) ----------
const TB_DIA = 86400000;
const tbDia = iso => (iso ? (String(iso).length === 10 ? String(iso) : new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' })) : '');
const tbSuma = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * TB_DIA).toISOString().slice(0, 10);
const tbEntre = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / TB_DIA);
const tbLunes = d => tbSuma(d, -((new Date(`${d}T00:00:00Z`).getUTCDay() + 6) % 7));
// Rango elegido y el de antes, del mismo largo. dias = 0: todo (sin comparación).
function tbRango(dias, hoy, primero) {
  if (!dias) return { desde: primero && primero < hoy ? primero : hoy, hasta: hoy, antes: null };
  return { desde: tbSuma(hoy, 1 - dias), hasta: hoy, antes: { desde: tbSuma(hoy, 1 - 2 * dias), hasta: tbSuma(hoy, -dias) } };
}
// Tramos de la serie: por día hasta 31 días, por semana hasta 190 y por mes de ahí en adelante.
const tbGrano = r => { const n = tbEntre(r.desde, r.hasta) + 1; return n <= 31 ? 'dia' : n <= 190 ? 'semana' : 'mes'; };
const tbClave = (d, g) => (g === 'dia' ? d : g === 'semana' ? tbLunes(d) : d.slice(0, 7));
function tbTramos(r, g) {
  const out = [];
  for (let d = r.desde; d <= r.hasta; d = tbSuma(d, 1)) { const k = tbClave(d, g); if (out[out.length - 1] !== k) out.push(k); }
  return out;
}
// Una persona con lo que se usa para filtrar. accesoDe(lista, curso) → { estado } (accesoCurso de js/acceso.js).
function tbPersona(p, accesos, accesoDe) {
  const es = accesos.map(a => accesoDe([a], a.curso).estado);
  const estado = p.bloqueado ? 'pausa' : es.includes('pago') ? 'pago' : es.includes('vencido') ? 'vencido' : es.includes('prueba') ? 'prueba' : 'nada';
  return { id: p.id, nombre: p.nombre || '', telefono: p.telefono || '', estado, cursos: accesos.map(a => a.curso), ocupacion: p.ocupacion || '', edad: p.edad || '', ciudad: tbCiudad(p.ciudad), medio: p.medio || '', alta: tbDia(p.creado_en), ultima: tbDia(p.ultima_vez),
    vence: accesos.filter(a => a.tipo === 'pago' && a.hasta).map(a => tbDia(a.hasta)).sort().pop() || '' };
}
// «medellín », «MEDELLIN» y «Medellín» son la misma ciudad.
const tbPlano = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const tbCiudad = s => { const t = tbPlano(s); return t.replace(/(^|[\s-])([a-z])/g, (m, a, b) => a + b.toUpperCase()); };
const TB_DIMS = ['estado', 'curso', 'ocupacion', 'edad', 'ciudad', 'medio'];
// ¿La persona pasa los filtros? `menos`: la dimensión que no se aplica (la gráfica que la muestra la deja ver entera).
const tbPasa = (p, f, menos) => TB_DIMS.every(k => k === menos || !f[k] || (k === 'curso' ? p.cursos.includes(f.curso) : (p[k] || '—') === f[k]));
// Todo lo que se ve, para unos filtros. D: { personas, uso, hechas, pagos, hoy, primero }.
function tbCalcula(D, f) {
  const r = tbRango(f.dias, D.hoy, D.primero), g = tbGrano(r), gente = D.personas.filter(p => tbPasa(p, f)), ids = new Set(gente.map(p => p.id));
  const deHoy = new Map(D.personas.map(p => [p.id, p]));
  const pagoVa = x => (!f.curso || x.curso === f.curso) && (x.u && deHoy.has(x.u) ? tbPasa(deHoy.get(x.u), f, 'curso') : TB_DIMS.every(k => k === 'curso' || !f[k]));
  const datos = { uso: D.uso.filter(x => ids.has(x.u) && x.seg + x.ej + x.lec > 0), hechas: D.hechas.filter(x => ids.has(x.u) && (!f.curso || x.curso === f.curso)), pagos: D.pagos.filter(pagoVa), altas: gente };
  const M = {
    activos: { n: 'Estudiantes activos', de: datos.uso, dia: x => x.dia, junta: xs => new Set(xs.map(x => x.u)).size },
    minutos: { n: 'Minutos de estudio', de: datos.uso, dia: x => x.dia, junta: xs => Math.round(xs.reduce((t, x) => t + x.seg, 0) / 60) },
    lecciones: { n: 'Lecciones completadas', de: datos.hechas, dia: x => x.dia, junta: xs => xs.length },
    aciertos: { n: 'Aciertos', u: '%', de: datos.uso, dia: x => x.dia, junta: xs => { const e = xs.reduce((t, x) => t + x.ej, 0); return e ? Math.round(100 * xs.reduce((t, x) => t + x.ac, 0) / e) : null; } },
    ventas: { n: 'Ventas', u: '$', de: datos.pagos, dia: x => x.dia, junta: xs => xs.reduce((t, x) => t + x.valor, 0) },
    altas: { n: 'Estudiantes nuevos', de: datos.altas, dia: x => x.alta, junta: xs => xs.length },
  };
  const en = (m, a) => (a ? m.de.filter(x => { const d = m.dia(x); return d && d >= a.desde && d <= a.hasta; }) : []);
  const tramos = tbTramos(r, g);
  const metricas = Object.fromEntries(Object.entries(M).map(([k, m]) => {
    const xs = en(m, r), ant = en(m, r.antes), porTramo = new Map();
    xs.forEach(x => { const c = tbClave(m.dia(x), g); (porTramo.get(c) || porTramo.set(c, []).get(c)).push(x); });
    // La serie de antes se alinea por días corridos: el primer día de antes cae en el primero de ahora.
    const antTramo = new Map(); if (r.antes) ant.forEach(x => { const c = tbClave(tbSuma(m.dia(x), tbEntre(r.antes.desde, r.desde)), g); (antTramo.get(c) || antTramo.set(c, []).get(c)).push(x); });
    const v = m.junta(xs), w = r.antes ? m.junta(ant) : null;
    return [k, { n: m.n, u: m.u || '', v, antes: w, cambio: w == null || v == null ? null : m.u === '%' ? v - w : w ? Math.round(100 * (v - w) / w) : null, serie: tramos.map(c => (porTramo.has(c) ? m.junta(porTramo.get(c)) : m.u === '%' ? null : 0)), previa: r.antes ? tramos.map(c => (antTramo.has(c) ? m.junta(antTramo.get(c)) : m.u === '%' ? null : 0)) : null }];
  }));
  // Reparto de personas por una dimensión, sin aplicar el filtro de esa misma dimensión.
  const reparto = k => { const c = new Map(); D.personas.filter(p => tbPasa(p, f, k)).forEach(p => (k === 'curso' ? p.cursos : [p[k] || '—']).forEach(v => c.set(v, (c.get(v) || 0) + 1))); return [...c].map(([id, n]) => ({ id, n })).sort((a, b) => b.n - a.n); };
  const enRango = en(M.lecciones, r), porLeccion = new Map(); enRango.forEach(x => porLeccion.set(x.l, (porLeccion.get(x.l) || 0) + 1));
  const aMedias = new Map(); D.medias.forEach(x => { if (ids.has(x.u) && (!f.curso || x.curso === f.curso) && x.dia >= r.desde && x.dia <= r.hasta) aMedias.set(x.l, (aMedias.get(x.l) || 0) + 1); });
  const ventasCurso = new Map(); D.pagos.filter(x => (x.u && deHoy.has(x.u) ? tbPasa(deHoy.get(x.u), f, 'curso') : TB_DIMS.every(k => k === 'curso' || !f[k])) && x.dia >= r.desde && x.dia <= r.hasta).forEach(x => ventasCurso.set(x.curso, (ventasCurso.get(x.curso) || 0) + x.valor));
  const top = m => [...m].map(([id, n]) => ({ id, n })).sort((a, b) => b.n - a.n);
  // Embudo: de siempre (no del rango), sobre las personas filtradas.
  const nLec = new Map(); datos.hechas.forEach(x => nLec.set(x.u, (nLec.get(x.u) || 0) + 1));
  const usaron = new Set(datos.uso.map(x => x.u)); datos.hechas.forEach(x => usaron.add(x.u));
  const embudo = [['Registrados', gente.length], ['Entraron a estudiar', gente.filter(p => usaron.has(p.id)).length], ['Terminaron 1 lección', gente.filter(p => nLec.get(p.id) >= 1).length], ['Terminaron 5 o más', gente.filter(p => nLec.get(p.id) >= 5).length], ['Con plan pagado', gente.filter(p => p.estado === 'pago').length]].map(([n, v]) => ({ id: n, n: v }));
  // Calendario: minutos por día de las últimas 16 semanas (no depende del rango).
  const minDia = new Map(); datos.uso.forEach(x => minDia.set(x.dia, (minDia.get(x.dia) || 0) + x.seg / 60));
  const ini = tbSuma(tbLunes(D.hoy), -15 * 7), calendario = Array.from({ length: 16 * 7 }, (_, i) => { const d = tbSuma(ini, i); return { d, v: d > D.hoy ? null : Math.round(minDia.get(d) || 0) }; });
  // Retención: de quienes llegaron cada semana, qué parte estudió en las semanas siguientes.
  const usoSem = new Map(); datos.uso.forEach(x => { const s = tbLunes(x.dia); (usoSem.get(x.u) || usoSem.set(x.u, new Set()).get(x.u)).add(s); });
  const retencion = Array.from({ length: 8 }, (_, i) => tbSuma(tbLunes(D.hoy), -7 * (7 - i))).map(s => { const g2 = gente.filter(p => p.alta && tbLunes(p.alta) === s); return { s, n: g2.length, sem: Array.from({ length: 8 }, (_, k) => { const t = tbSuma(s, 7 * k); return t > D.hoy || !g2.length ? null : Math.round(100 * g2.filter(p => usoSem.get(p.id)?.has(t)).length / g2.length); }) }; });
  const riesgo = gente.filter(p => p.estado === 'pago').map(p => ({ ...p, sin: p.ultima ? tbEntre(p.ultima, D.hoy) : null })).filter(p => p.sin == null || p.sin >= 7).sort((a, b) => (b.sin ?? 9999) - (a.sin ?? 9999));
  return { r, g, tramos, gente, metricas, reparto, embudo, calendario, retencion, riesgo, lecciones: top(porLeccion), medias: top(aMedias), ventasCurso: top(ventasCurso) };
}
// Marcas del eje: 0 y hasta cuatro valores redondos que cubren el máximo.
function tbEje(max) {
  if (!(max > 0)) return [0, 1];
  const b = 10 ** Math.floor(Math.log10(max / 3)), p = [1, 2, 2.5, 5, 10].map(k => k * b).find(x => Number.isInteger(x) && max / x <= 4) || b, paso = max <= 4 ? 1 : p, n = Math.ceil(max / paso);
  return Array.from({ length: n + 1 }, (_, i) => Math.round(i * paso * 100) / 100);
}

// ---------- datos ----------
const TB = { D: null, f: { dias: 30 }, metrica: 'activos', quien: 'ocupacion', lec: 'lecciones', cur: 'personas', hora: null };
async function tbTodo(t, cols, orden) {
  const out = [];
  for (let i = 0; i < 60; i++) {
    let q = sb.from(t).select(cols);
    for (const c of orden) q = q.order(c);
    const { data, error } = await q.range(i * 1000, i * 1000 + 999);
    if (error) throw error;
    out.push(...data);
    if (data.length < 1000) return out;
  }
  toast('Hay demasiados registros: el tablero muestra una parte.', true);
  return out;
}
async function tbCarga() {
  const [per, acc, uso, pro, pag, lec] = await Promise.all([
    tbTodo('perfiles', 'id,nombre,telefono,rol,bloqueado,creado_en,ultima_vez,edad,ciudad,ocupacion,medio', ['id']), tbTodo('accesos', 'usuario,curso,tipo,desde,hasta,dias', ['usuario', 'curso']), tbTodo('uso_diario', 'usuario,dia,segundos,lecciones,ejercicios,aciertos', ['usuario', 'dia']),
    tbTodo('progreso', 'usuario,leccion,completada,actualizado_en,completada_en', ['usuario', 'leccion']), tbTodo('pagos', 'id,usuario,curso,valor,creado_en', ['id']), tbTodo('lecciones', 'id,tipo,curso,titulo', ['id'])]);
  const L = new Map(lec.filter(l => l.tipo === 'leccion').map(l => [l.id, l])), deQuien = new Map();
  acc.forEach(a => (deQuien.get(a.usuario) || deQuien.set(a.usuario, []).get(a.usuario)).push(a));
  // Solo estudiantes: las cuentas administradoras no cuentan en ninguna cifra.
  const personas = per.filter(p => p.rol === 'estudiante').map(p => tbPersona(p, deQuien.get(p.id) || [], accesoCurso)), de = new Set(personas.map(p => p.id));
  const prog = pro.filter(x => de.has(x.usuario) && L.has(x.leccion)).map(x => ({ u: x.usuario, l: x.leccion, curso: L.get(x.leccion).curso, hecha: x.completada, dia: tbDia(x.completada ? x.completada_en || x.actualizado_en : x.actualizado_en) }));
  const hoy = tbDia(new Date().toISOString());
  const D = { personas, hoy, L, uso: uso.filter(x => de.has(x.usuario)).map(x => ({ u: x.usuario, dia: x.dia, seg: x.segundos || 0, lec: x.lecciones || 0, ej: x.ejercicios || 0, ac: x.aciertos || 0 })),
    hechas: prog.filter(x => x.hecha), medias: prog.filter(x => !x.hecha), pagos: pag.filter(x => x.valor > 0).map(x => ({ u: x.usuario, curso: CURSOS.some(c => c.id === x.curso) ? x.curso : '—', valor: x.valor, dia: tbDia(x.creado_en) })) };
  D.primero = [...personas.map(p => p.alta), ...D.uso.map(x => x.dia), ...D.pagos.map(x => x.dia)].filter(Boolean).sort()[0] || hoy;
  return D;
}

// ---------- textos ----------
const tbN = v => Number(v).toLocaleString('es-CO');
const tbPlata = v => (v >= 1e6 ? `$ ${(v / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 })} M` : v >= 1000 ? `$ ${tbN(Math.round(v / 1000))} mil` : `$ ${tbN(v)}`);
const tbVal = (v, u, corto) => (v == null ? '—' : u === '$' ? (corto ? tbPlata(v) : cop(v)) : u === '%' ? `${v} %` : tbN(v));
const tbRotDim = (k, id) => (id === '—' ? (k === 'curso' ? 'Tienda y pedidos' : 'Sin dato') : k === 'estado' ? ESTADO[id][1] : k === 'curso' ? curso(id).nombre : k === 'ciudad' ? id : datoTexto(k, id));
const tbFecha = (c, g, largo) => (g === 'mes' ? `${MESES[+c.slice(5, 7) - 1]}${largo ? ` ${c.slice(0, 4)}` : ''}` : `${largo && g === 'semana' ? 'Semana del ' : ''}${diaCorto(c)}`);
const TB_NOMBRE = { estado: 'Estado', curso: 'Curso', ocupacion: 'Qué hace', edad: 'Edad', ciudad: 'Ciudad', medio: 'Nos conoció por' };

// ---------- vista ----------
function vTablero() {
  carga(async () => { TB.D = await tbCarga(); TB.hora = new Date(); return TB.D; }, () => {
    view.innerHTML = `<div class="pn-head"><div><h1>Tablero</h1><p class="pn-hoy">Toca cualquier barra para filtrar todo lo demás; tócala otra vez para quitar el filtro.</p></div>
        <div class="pn-acc"><button class="btn ghost" type="button" data-tb-csv>Descargar Excel</button><button class="btn ghost" type="button" data-tb-act>Actualizar</button></div></div>
      <div class="tb-filtros"><div class="pn-chips" role="radiogroup" aria-label="Periodo">${[[7, '7 días'], [30, '30 días'], [90, '90 días'], [365, '1 año'], [0, 'Todo']].map(([n, t]) => `<label><input type="radio" name="tb-dias" value="${n}"${TB.f.dias === n ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div>
        <label class="fld"><span class="pn-sr">Curso</span><select data-tb-f="curso"><option value="">Todos los cursos</option>${CURSOS.map(c => `<option value="${esc(c.id)}">${esc(c.nombre)}</option>`).join('')}</select></label>
        <label class="fld"><span class="pn-sr">Estado</span><select data-tb-f="estado"><option value="">Todos los estados</option>${Object.entries(ESTADO).map(([k, v]) => `<option value="${k}">${v[1]}</option>`).join('')}</select></label>
        <div class="tb-activos" aria-live="polite"></div></div>
      <div class="tb-kpis" role="group" aria-label="Cifra de la gráfica"></div>
      <div class="tb-malla">
        ${tbTarjeta('linea', 'ancho', '')}${tbTarjeta('embudo', '', 'Camino del estudiante', 'Desde el registro, sin importar el periodo')}
        ${tbTarjeta('cursos', '', 'Cursos', '', [['personas', 'Estudiantes'], ['ventas', 'Ventas']], 'cur')}${tbTarjeta('estado', '', 'Estado')}${tbTarjeta('quien', '', 'Quiénes son', '', [['ocupacion', 'Qué hacen'], ['edad', 'Edad'], ['ciudad', 'Ciudad'], ['medio', 'Cómo llegaron']], 'quien')}
        ${tbTarjeta('lec', 'medio', 'Lecciones', '', [['lecciones', 'Más completadas'], ['medias', 'Donde se quedan']], 'lec')}${tbTarjeta('cal', 'medio', 'Cuándo estudian', 'Minutos por día, últimas 16 semanas')}
        ${tbTarjeta('ret', 'medio', 'Retención', 'De quienes llegaron cada semana, cuántos estudiaron después')}${tbTarjeta('riesgo', 'medio', 'Con plan y sin entrar', 'Llevan 7 días o más sin abrir la app')}
      </div><p class="pn-count" data-tb-pie></p><div class="tb-tip" role="status" hidden></div>`;
    $$('[name="tb-dias"]', view).forEach(x => { x.onchange = () => { TB.f.dias = +x.value; tbPinta(); }; });
    $$('[data-tb-f]', view).forEach(x => { x.onchange = () => tbFiltra(x.dataset.tbF, x.value, true); });
    $$('[data-tb-seg]', view).forEach(x => { x.onchange = () => { TB[x.dataset.tbSeg] = x.value; tbPinta(); }; });
    $('[data-tb-act]', view).onclick = e => ocupado(e.currentTarget, async () => { TB.D = await tbCarga(); TB.hora = new Date(); if (location.hash === '#tablero') tbPinta(); });
    $('[data-tb-csv]', view).onclick = () => { const x = TB.x; csv('zuka-tablero', ['Estudiante', 'Celular', 'Estado', 'Cursos', 'Qué hace', 'Edad', 'Ciudad', 'Nos conoció por', 'Registro', 'Último ingreso'], x.gente.map(p => [p.nombre, p.telefono, ESTADO[p.estado][1], p.cursos.map(c => curso(c).nombre).join(', '), ...['ocupacion', 'edad', 'ciudad', 'medio'].map(k => (p[k] ? tbRotDim(k, p[k]) : '')), p.alta, p.ultima])); };
    view.onpointerdown = e => { if (e.pointerType === 'touch' && !e.target.closest('.tb-lin, [data-tip]')) tbTip(); };
    view.onclick = e => {
      if (!$('.tb-malla', view)) return;
      const b = e.target.closest('[data-dim]'); if (b) return tbFiltra(b.dataset.dim, b.dataset.id);
      const t = e.target.closest('[data-tb-tabla]'); if (t) return tbDatos(t.dataset.tbTabla);
      const k = e.target.closest('[data-kpi]'); if (k) { TB.metrica = k.dataset.kpi; tbPinta(); $(`[data-kpi="${TB.metrica}"]`, view)?.focus({ preventScroll: true }); }
    };
    tbPinta();
    const caja = $('.tb-malla', view), ro = new ResizeObserver(() => { if (!caja.isConnected) return ro.disconnect(); if (caja.clientWidth !== TB.ancho) { TB.ancho = caja.clientWidth; tbLinea(); } });
    TB.ancho = caja.clientWidth; ro.observe(caja);
  });
}
const tbTarjeta = (id, cls, t, sub = '', seg = null, clave = '') => `<section class="pn-card tb-c ${cls}" data-c="${id}"><header><div><h2 data-tit>${t}</h2>${sub ? `<p class="pn-count">${sub}</p>` : ''}</div><button class="tb-ver" type="button" data-tb-tabla="${id}">Ver datos<span class="pn-sr"> de ${t || 'la gráfica'}</span></button></header>
  ${seg ? `<div class="tb-seg" role="radiogroup" aria-label="${t}">${seg.map(([v, n]) => `<label><input type="radio" name="tb-${id}" data-tb-seg="${clave}" value="${v}"${TB[clave] === v ? ' checked' : ''}><span>${n}</span></label>`).join('')}</div>` : ''}<div class="tb-in"></div></section>`;
function tbFiltra(k, v, fijo = false) {
  TB.f[k] = !fijo && TB.f[k] === v ? '' : v;
  const a = document.activeElement, d = a?.dataset?.dim && [a.dataset.dim, a.dataset.id], busca = raiz => $$(`${raiz} [data-dim]`, view).find(b => b.dataset.dim === d[0] && b.dataset.id === d[1]);
  tbPinta();
  if (d) (busca('.tb-malla') || $('.tb-activos button', view) || $('[name="tb-dias"]:checked', view))?.focus({ preventScroll: true });
}
function tbPinta() {
  const f = TB.f, x = TB.x = tbCalcula(TB.D, f), caja = id => $(`[data-c="${id}"] .tb-in`, view);
  $$('[data-tb-f]', view).forEach(s => { s.value = f[s.dataset.tbF] || ''; });
  const puestos = TB_DIMS.filter(k => f[k]);
  $('.tb-activos', view).innerHTML = puestos.map(k => `<button type="button" data-dim="${k}" data-id="${esc(f[k])}">${TB_NOMBRE[k]}: <b>${esc(tbRotDim(k, f[k]))}</b><span aria-hidden="true">×</span><span class="pn-sr">, quitar filtro</span></button>`).join('') + (puestos.length > 1 ? '<button type="button" class="limpia" data-tb-limpia>Limpiar</button>' : '');
  const lim = $('[data-tb-limpia]', view); if (lim) lim.onclick = () => { TB_DIMS.forEach(k => { TB.f[k] = ''; }); tbPinta(); $('[name="tb-dias"]:checked', view).focus({ preventScroll: true }); };
  $('.tb-kpis', view).innerHTML = Object.entries(x.metricas).map(([k, m]) => `<button type="button" aria-pressed="${k === TB.metrica}" class="tb-kpi" data-kpi="${k}"><span>${m.n}</span><b>${tbVal(m.v, m.u, true)}</b>${m.cambio == null ? `<small>${x.r.antes ? 'Sin datos antes' : 'Desde el comienzo'}</small>` : `<small class="${m.cambio > 0 ? 'sube' : m.cambio < 0 ? 'baja' : ''}">${m.cambio > 0 ? '▲' : m.cambio < 0 ? '▼' : '='} ${Math.abs(m.cambio)} ${m.u === '%' ? (Math.abs(m.cambio) === 1 ? 'punto' : 'puntos') : '%'} <em>que antes</em></small>`}${tbChispa(m.serie)}</button>`).join('');
  tbLinea();
  caja('embudo').innerHTML = x.gente.length ? `<ol class="tb-emb">${x.embudo.map((e, i) => `<li style="--w:${100 * e.n / x.embudo[0].n}%;--s:${(e.n / x.embudo[0].n) || 0}"><span>${e.id}</span><b>${tbN(e.n)}</b><small>${i ? `${Math.round(100 * e.n / x.embudo[0].n)} %` : ''}</small><i${e.n ? '' : ' class="cero"'}></i></li>`).join('')}</ol>` : tbNada();
  const cur = TB.cur === 'ventas' ? x.ventasCurso : x.reparto('curso');
  caja('cursos').innerHTML = tbBarras(cur, 'curso', TB.cur === 'ventas' ? '$' : '');
  caja('estado').innerHTML = tbBarras(x.reparto('estado'), 'estado');
  const q = x.reparto(TB.quien); if (TB.quien === 'edad') { const o = DATOS.edad.map(y => y[0]); q.sort((a, b) => (o.indexOf(a.id) + 1 || 99) - (o.indexOf(b.id) + 1 || 99)); }
  caja('quien').innerHTML = tbBarras(q, TB.quien);
  const ls = x[TB.lec].slice(0, 8), tope = Math.max(1, ...ls.map(l => l.n));
  caja('lec').innerHTML = ls.length ? `<ul class="tb-bars">${ls.map(l => { const L = TB.D.L.get(l.id); return `<li><span class="tb-b"><span>${esc(L.titulo)}<small>${esc(curso(L.curso).nombre)}</small></span><b>${tbN(l.n)}</b><i style="--w:${100 * l.n / tope}%;--s:${(l.n / tope) || 0}"></i></span></li>`; }).join('')}</ul>` : tbNada(TB.lec === 'medias' ? 'Nadie dejó lecciones a medias en este periodo.' : 'Nadie ha completado lecciones en este periodo.');
  const maxD = Math.max(1, ...x.calendario.map(c => c.v || 0));
  caja('cal').innerHTML = `<div class="tb-cal"><div class="tb-cal-d" aria-hidden="true">${[...'LMXJVSD'].map(d => `<span>${d}</span>`).join('')}</div><div class="tb-cal-g" role="img" aria-label="Minutos de estudio por día">${x.calendario.map(c => (c.v == null ? '<i class="no"></i>' : `<i data-tip="${diaCorto(c.d)}|${tbN(c.v)} min" style="--p:${c.v ? Math.round(18 + 82 * c.v / maxD) : 0}%"></i>`)).join('')}</div></div>
    <p class="tb-esc"><span>Menos</span>${[0, 28, 50, 75, 100].map(p => `<i style="--p:${p}%"></i>`).join('')}<span>Más</span></p>`;
  caja('ret').innerHTML = x.retencion.some(s => s.n) ? `<div class="pn-tabla"><table class="tb-ret"><thead><tr><th>Llegaron</th><th class="pn-num">Cuántos</th>${Array.from({ length: 8 }, (_, k) => `<th>${k ? `S${k}` : 'S0'}</th>`).join('')}</tr></thead><tbody>${x.retencion.map(s => `<tr><th>${diaCorto(s.s)}</th><td class="pn-num">${s.n}</td>${s.sem.map(v => (v == null ? '<td></td>' : `<td class="r" style="--p:${Math.round(v * .8)}%"><span>${v} %</span></td>`)).join('')}</tr>`).join('')}</tbody></table></div><p class="pn-count">S0 es la semana en que llegaron; S1, la siguiente.</p>` : tbNada('Nadie llegó en las últimas 8 semanas.');
  caja('riesgo').innerHTML = x.riesgo.length ? `<ul class="pn-vence">${x.riesgo.slice(0, 8).map(p => `<li>${avatar(p.nombre)}<span><a href="#estudiante/${p.id}">${esc(p.nombre || 'Sin nombre')}</a><small>${p.sin == null ? 'Nunca ha entrado' : `Hace ${p.sin} días`}${p.vence ? `, plan hasta el ${diaCorto(p.vence)}` : ''}</small></span>${waA(p.telefono, `Hola${p.nombre ? ` ${p.nombre}` : ''}, te extrañamos en Zuka. ¿Cómo vas? Si algo se te enredó, cuéntanos y te ayudamos.`, 'Escribir')}</li>`).join('')}</ul>${x.riesgo.length > 8 ? `<p class="pn-count">y ${x.riesgo.length - 8} más (en «Ver datos»)</p>` : ''}` : tbNada(x.gente.some(p => p.estado === 'pago') ? 'Todos los que tienen plan entraron esta semana.' : 'Nadie tiene plan con estos filtros.');
  $('[data-tb-pie]', view).textContent = `${tbN(x.gente.length)} ${x.gente.length === 1 ? 'estudiante' : 'estudiantes'} con estos filtros. Las cuentas administradoras no cuentan. Al filtrar por curso, las ventas no incluyen los pedidos de la tienda. Datos de las ${TB.hora.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })}.`;
  tbTips();
}
const tbNada = (t = 'No hay datos con estos filtros.') => `<p class="pn-state">${t}</p>`;
// Barras que filtran: la elegida queda viva y las demás se apagan. El tono es uno solo: el largo dice cuánto.
function tbBarras(xs, k, u = '') {
  if (!xs.length) return tbNada();
  const tope = Math.max(1, ...xs.map(y => y.n)), tot = xs.reduce((t, y) => t + y.n, 0), el = TB.f[k], ver = xs.slice(0, 8);
  const elegido = el && !ver.some(y => y.id === el) && xs.find(y => y.id === el); if (elegido) ver.push(elegido);
  return `<ul class="tb-bars${el ? ' hay' : ''}">${ver.map(y => { const fija = k === 'curso' && y.id === '—'; return `<li><${fija ? 'span class="tb-b"' : `button type="button" class="tb-b${el === y.id ? ' on' : ''}" data-dim="${k}" data-id="${esc(y.id)}" aria-pressed="${el === y.id}"`}><span>${esc(tbRotDim(k, y.id))}</span><b>${tbVal(y.n, u, true)}${u ? '' : `<small>${Math.round(100 * y.n / tot)} %</small>`}</b><i style="--w:${100 * y.n / tope}%;--s:${(y.n / tope) || 0}"></i></${fija ? 'span' : 'button'}></li>`; }).join('')}</ul>${xs.length > ver.length ? `<p class="pn-count">y ${xs.length - ver.length} más (en «Ver datos»)</p>` : ''}`;
}
function tbChispa(s) {
  const v = s.map(y => y ?? 0), m = Math.max(1, ...v), n = Math.max(1, v.length - 1);
  return `<svg class="tb-chispa" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="${v.map((y, i) => `${i ? 'L' : 'M'}${(100 * i / n).toFixed(1)} ${(22 - 20 * y / m).toFixed(1)}`).join('')}${v.length === 1 ? 'H100' : ''}"/></svg>`;
}
// Línea principal: la cifra elegida en el tiempo, contra el periodo anterior.
function tbLinea() {
  const c = $('[data-c="linea"]', view); if (!c || !TB.x) return;
  const x = TB.x, m = x.metricas[TB.metrica], caja = $('.tb-in', c), W = Math.max(280, caja.clientWidth), H = 280, L = m.u === '$' ? 70 : 54, B = 30, R = 14, A = 12;
  $('[data-tit]', c).textContent = m.n;
  const eje = tbEje(Math.max(0, ...m.serie.filter(v => v != null), ...(m.previa || []).filter(v => v != null))), M = m.u === '%' ? 100 : eje[eje.length - 1], marcas = m.u === '%' ? [0, 25, 50, 75, 100] : eje;
  const n = x.tramos.length, X = i => (n === 1 ? (L + W - R) / 2 : L + (W - L - R) * i / (n - 1)), Y = v => H - B - (H - B - A) * v / M;
  const linea = s => { let d = '', arriba = true; s.forEach((v, i) => { if (v == null) { arriba = true; return; } d += `${arriba ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`; arriba = false; }); return d; };
  const cada = Math.max(1, Math.ceil(n / Math.floor((W - L - R) / 62))), sinHuecos = m.serie.every(v => v != null);
  caja.innerHTML = `${m.previa ? '<p class="tb-ley"><span class="a">Este periodo</span><span class="b">Periodo anterior</span></p>' : ''}<svg class="tb-lin" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" tabindex="0" role="img" aria-label="${m.n} en el tiempo. Usa las flechas para recorrer.">
    ${marcas.map(v => `<path class="g" d="M${L} ${Y(v)}H${W - R}"/><text class="y" x="${L - 10}" y="${Y(v) + 4}">${m.u === '$' ? tbPlata(v) : m.u === '%' ? `${v} %` : tbN(v)}</text>`).join('')}
    ${x.tramos.map((t, i) => ((n - 1 - i) % cada === 0 ? `<text class="x" x="${X(i)}" y="${H - 8}"${i === n - 1 && n > 1 ? ' style="text-anchor:end"' : ''}>${tbFecha(t, x.g)}</text>` : '')).join('')}
    ${sinHuecos && n > 1 ? `<path class="area" d="${linea(m.serie)}L${X(n - 1)} ${Y(0)}L${X(0)} ${Y(0)}Z"/>` : ''}${m.previa ? `<path class="prev" d="${linea(m.previa)}"/>` : ''}<path class="act" d="${linea(m.serie)}"/>
    ${m.serie.map((v, i) => (v != null && (n === 1 || (m.serie[i - 1] == null && m.serie[i + 1] == null)) ? `<circle class="pt" cx="${X(i)}" cy="${Y(v)}" r="4"/>` : '')).join('')}<g class="cur" hidden><path class="v"/><circle class="q" r="4"/><circle class="p" r="5"/></g></svg>`;
  const svg = $('svg', caja), cur = $('.cur', svg); let en = n - 1;
  const pon = (i, cx, cy) => {
    en = Math.max(0, Math.min(n - 1, i)); cur.removeAttribute('hidden');
    $('.v', cur).setAttribute('d', `M${X(en)} ${A}V${H - B}`);
    for (const [q, s] of [['.p', m.serie], ['.q', m.previa]]) { const e = $(q, cur), v = s?.[en]; e.style.display = v == null ? 'none' : ''; if (v != null) { e.setAttribute('cx', X(en)); e.setAttribute('cy', Y(v)); } }
    const r = svg.getBoundingClientRect();
    tbTip(cx ?? r.left + X(en) * r.width / W, cy ?? r.top + Y(m.serie[en] ?? 0) * r.height / H, tbFecha(x.tramos[en], x.g, true), [['a', tbVal(m.serie[en], m.u), 'este periodo'], ...(m.previa ? [['b', tbVal(m.previa[en], m.u), 'antes']] : [])]);
  };
  const quita = () => { cur.setAttribute('hidden', ''); tbTip(); };
  svg.onpointermove = svg.onpointerdown = e => { const r = svg.getBoundingClientRect(); pon(n === 1 ? 0 : Math.round(((e.clientX - r.left) * W / r.width - L) / (W - L - R) * (n - 1)), e.clientX, e.clientY); };
  svg.onpointerleave = e => { if (e.pointerType !== 'touch') quita(); }; svg.onblur = quita; svg.onfocus = () => { if (svg.matches(':focus-visible')) pon(en); };
  svg.onkeydown = e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pon(en + d); } };
}
// Globo con el dato: el valor primero. Texto siempre con textContent.
function tbTip(x, y, titulo, filasT) {
  const t = $('.tb-tip', view); if (!t) return;
  if (titulo == null) { t.hidden = true; return; }
  t.replaceChildren(); const h = document.createElement('small'); h.textContent = titulo; t.append(h);
  (filasT || []).forEach(([c, v, n]) => { const p = document.createElement('p'), k = document.createElement('i'), b = document.createElement('b'), s = document.createElement('span'); k.className = c; b.textContent = v; s.textContent = n; p.append(k, b, s); t.append(p); });
  t.hidden = false;
  const z = document.body.currentCSSZoom || 1, W = innerWidth / z, H = innerHeight / z, w = t.offsetWidth, hh = t.offsetHeight; x /= z; y /= z;   // interfaz compacta
  t.style.left = `${Math.max(8, Math.min(W - w - 8, x + 14 + w > W ? x - w - 14 : x + 14))}px`; t.style.top = `${Math.max(8, Math.min(H - hh - 8, y - hh - 10))}px`;
}
function tbTips() {
  $$('[data-tip]', view).forEach(e => { const [a, b] = e.dataset.tip.split('|'); e.onpointerenter = ev => tbTip(ev.clientX, ev.clientY, a, [['a', b, 'de estudio']]); e.onpointerleave = ev => { if (ev.pointerType !== 'touch') tbTip(); }; });
}
// La tabla detrás de cada gráfica.
function tbDatos(id) {
  const x = TB.x, m = x.metricas[TB.metrica], L = k => TB.D.L.get(k);
  const T = {
    linea: () => [m.n, ['Cuándo', 'Este periodo', ...(m.previa ? ['Antes'] : [])], x.tramos.map((t, i) => [tbFecha(t, x.g, true), tbVal(m.serie[i], m.u), ...(m.previa ? [tbVal(m.previa[i], m.u)] : [])])],
    embudo: () => ['Camino del estudiante', ['Paso', 'Estudiantes', 'Parte'], x.embudo.map(e => [e.id, tbN(e.n), pct(e.n, x.embudo[0].n)])],
    cursos: () => ['Cursos', ['Curso', TB.cur === 'ventas' ? 'Ventas' : 'Estudiantes'], (TB.cur === 'ventas' ? x.ventasCurso : x.reparto('curso')).map(y => [tbRotDim('curso', y.id), tbVal(y.n, TB.cur === 'ventas' ? '$' : '')])],
    estado: () => ['Estado', ['Estado', 'Estudiantes'], x.reparto('estado').map(y => [tbRotDim('estado', y.id), tbN(y.n)])],
    quien: () => [TB_NOMBRE[TB.quien], [TB_NOMBRE[TB.quien], 'Estudiantes'], x.reparto(TB.quien).map(y => [tbRotDim(TB.quien, y.id), tbN(y.n)])],
    lec: () => [TB.lec === 'medias' ? 'Donde se quedan' : 'Lecciones más completadas', ['Lección', 'Curso', 'Estudiantes'], x[TB.lec].map(y => [L(y.id).titulo, curso(L(y.id).curso).nombre, tbN(y.n)])],
    cal: () => ['Cuándo estudian', ['Día', 'Minutos'], x.calendario.filter(c => c.v).reverse().map(c => [diaCorto(c.d), tbN(c.v)])],
    ret: () => ['Retención', ['Llegaron', 'Cuántos', ...Array.from({ length: 8 }, (_, k) => `S${k}`)], x.retencion.map(s => [diaCorto(s.s), s.n, ...s.sem.map(v => (v == null ? '' : `${v} %`))])],
    riesgo: () => ['Con plan y sin entrar', ['Estudiante', 'Celular', 'Último ingreso', 'Plan hasta'], x.riesgo.map(p => [p.nombre || 'Sin nombre', p.telefono, p.ultima || 'Nunca', p.vence])],
  };
  const [t, cab, fs] = T[id]();
  ventana(`<div class="pn-form1"><h2>${esc(t)}</h2>${tabla(cab.map((h, i) => ({ t: esc(h), n: i && id !== 'riesgo' })), fs.map(f => `<tr>${f.map((v, i) => (i ? td(esc(cab[i]), esc(v), id !== 'riesgo' ? 'pn-num' : '') : `<td class="pn-main">${esc(v)}</td>`)).join('')}</tr>`), 'No hay datos con estos filtros.')}
    <div class="pn-pie"><button class="btn ghost" type="button" data-x>Descargar Excel</button><button class="btn main" type="button" data-cerrar>Cerrar</button></div></div>`, d => { d.classList.add('tb-dlg'); $('[data-x]', d).onclick = () => csv(`zuka-${id}`, cab, fs); });
}
