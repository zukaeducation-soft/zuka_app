// Zuka para instituciones (spec 2026-11-25-instituciones): cuentas puras que comparten la landing, /instituciones, su portal y
// el panel. Sin DOM ni red: se prueban en Node (tests/instituciones.test.js). La base repite el precio (privado.inst_estimado).

const INST_PRECIOS = { tramos: [[1, 0], [30, 10], [100, 20], [300, 30]], anio: 10 };
// Lo que el panel guardó en ajustes.inst_precios; si no se entiende, los de arriba.
function instConf(texto) {
  try {
    const c = JSON.parse(texto), tr = (c.tramos || []).map(t => [Math.round(+t[0]), +t[1]]).filter(t => t[0] >= 1 && t[1] >= 0 && t[1] <= 90).sort((a, b) => a[0] - b[0]);
    if (tr.length && +c.anio >= 0 && +c.anio <= 90) return { tramos: tr, anio: +c.anio };
  } catch (e) { /* los de siempre */ }
  return INST_PRECIOS;
}
const instDescuento = (n, conf = INST_PRECIOS) => conf.tramos.reduce((d, [desde, p]) => (n >= desde ? Math.max(d, p) : d), 0);
// Precio por estudiante y total. productos: filas { curso, meses, precio, activo } de la tienda. Un año = dos periodos de 6 meses.
function instPrecio({ n, meses, cursos }, productos, conf = INST_PRECIOS) {
  const de = c => (productos || []).find(p => p.curso === c && p.meses === 6 && p.activo)?.precio ?? null;
  const base = cursos.reduce((t, c) => t + (de(c) || 0), 0) * (meses === 12 ? 2 : 1), descuento = instDescuento(n, conf), anio = meses === 12 ? conf.anio : 0;
  const unitario = Math.round(base * (100 - descuento) * (100 - anio) / 1e6) * 100;
  return { base, descuento, anio, unitario, total: unitario * n, sinPrecio: cursos.filter(c => de(c) == null) };
}
// Cuánto falta para el siguiente descuento: [estudiantes, %] o null.
const instSiguiente = (n, conf = INST_PRECIOS) => { const d = instDescuento(n, conf); return conf.tramos.find(t => t[0] > n && t[1] > d) || null; };

// Lista pegada de Excel o de un CSV: una persona por renglón. Sin títulos: «nombre, grupo, documento». Con títulos (en cualquiera de
// las cinco primeras filas) reconoce nombre y apellidos separados (SIMAT: APELLIDO1, APELLIDO2, NOMBRE1, NOMBRE2) y el grado con el grupo.
function instLista(texto) {
  const s = String(texto || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n'), out = [], malas = [], vistos = new Set();
  const sep = s.includes('\t') ? '\t' : s.includes(';') ? ';' : ',';
  // Casillas: entre comillas caben el separador y el salto de línea.
  const filas = []; let fila = [], caja = '', dentro = false, linea = 1, desde = 1;
  const casilla = () => { fila.push(caja.replace(/\s+/g, ' ').trim()); caja = ''; }, renglon = () => { casilla(); if (fila.some(Boolean)) filas.push({ c: fila, n: desde }); fila = []; desde = linea; };
  for (let k = 0; k < s.length; k++) {
    const x = s[k];
    if (x === '\n') linea++;
    if (dentro) { if (x === '"' && s[k + 1] === '"') { caja += '"'; k++; } else if (x === '"') dentro = false; else caja += x; }
    else if (x === '"' && !caja.trim()) { dentro = true; caja = ''; } else if (x === sep) casilla(); else if (x === '\n') renglon(); else caja += x;
  }
  renglon();
  const plano = x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const QUE = [['id', /^(n(ro|um|o)?|numero|tipo y numero)? ?(de |del )?(documento|doc|identificacion|identidad|cedula|t i|ti|tarjeta de identidad)( de identidad| de identificacion| estudiante| del estudiante| alumno)?$|^codigo( estudiante| del estudiante)?$/], ['junto', /^(nombres? completos?|nombres? y apellidos?|apellidos? y nombres?)( del estudiante| de los estudiantes| estudiante| alumno)?$|^estudiantes?$|^alumnos?$/],
    ['ap', /^(primer |segundo )?apellidos? ?[12s]?( primero| segundo| del estudiante| estudiante)?$/], ['no', /^(primer |segundo )?nombres? ?[12s]?( primero| segundo| del estudiante| estudiante| del alumno)?$/], ['gd', /^grado( cod| codigo)?$/], ['gr', /^(grupo|curso|salon|seccion)( cod| codigo| nombre)?$/]];
  const lee = c => { const m = {}; c.forEach((x, k) => { const q = QUE.find(y => y[1].test(plano(x))); if (q) (m[q[0]] = m[q[0]] || []).push(k); }); return m; };
  let T = null, ini = 0;
  for (let k = 0; k < Math.min(5, filas.length) && !T; k++) { const m = lee(filas[k].c); if (m.junto || m.no) { T = m; ini = k + 1; } }
  const ignora = T ? filas[ini - 1].c.filter((x, k) => x && !Object.values(T).some(ks => ks.includes(k)) && !/^(n|no|nro|item|tipodoc|tipo doc|tipo de documento)$/.test(plano(x))) : [];
  const de = (c, ks) => (ks || []).map(k => c[k] || '').filter(Boolean).join(' ');
  filas.slice(ini).forEach(({ c, n }) => {
    const g = T ? de(c, T.gr) : c[1] || '', d = T ? de(c, T.gd) : '', nombre = T ? (T.ap && T.no ? `${de(c, T.no)} ${de(c, T.ap)}`.trim() : de(c, (T.junto || T.no).slice(0, T.junto ? 1 : 9))) : c[0] || '';
    const x = { nombre: nombre.slice(0, 80), grupo: (d && g && !plano(g).startsWith(plano(d)) ? `${d}-${g}` : g || d).slice(0, 40), identificador: (T ? de(c, (T.id || []).slice(0, 1)) : c[2] || '').slice(0, 40) };
    const mal = por => malas.push({ linea: n, texto: c.join(', '), por });
    if (x.nombre.length < 2 || !/\p{L}/u.test(x.nombre)) return mal('sin nombre');
    const k = x.identificador.toLowerCase() || `${x.nombre}|${x.grupo}`.toLowerCase();
    if (vistos.has(k)) return mal('repetido en la lista');
    vistos.add(k); out.push(x);
  });
  // Sin títulos, si el «grupo» casi nunca se repite y no trae números, lo más probable es que sean apellidos.
  const gs = out.map(x => x.grupo).filter(Boolean), raro = !T && gs.length >= 4 && new Set(gs).size > gs.length * .7 && gs.filter(x => /\d/.test(x)).length < gs.length / 2;
  return { lista: out, malas, raro, ignora };
}

const instDia = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const instEntre = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const instBogota = iso => (iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) : '');
// La base manda el uso y lo hecho compactos (un texto por estudiante); el formato de antes también sirve.
function instAbre(D) {
  const lee = (o, f) => (Array.isArray(o) ? o : Object.entries(o || {}).flatMap(([id, t]) => t.split(';').map(x => f(+id, x.split(',')))));
  return { ...D, uso: lee(D.uso, (id, [d, s, e, a]) => [id, instDia(D.hoy, -d), +s, +e, +a]), hechas: lee(D.hechas, (id, [l, d]) => [id, l, d === '' || d == null ? null : instDia(D.hoy, -d)]) };
}
// Un día cuenta como estudio con un ejercicio respondido o cinco minutos: abrir y cerrar la app no es estudiar.
const instEstudio = u => u[3] > 0 || u[2] >= 300;
// Todo lo que muestra el portal, para unos filtros { dias, grupo, curso }. D: lo que devuelve institucion('panel').
function instCalcula(D, f) {
  const hoy = D.hoy, desde = instDia(hoy, 1 - f.dias), antes = instDia(hoy, 1 - 2 * f.dias), deCurso = new Map(D.lecciones.map(l => [l.id, l.curso]));
  const porCurso = new Map(); D.lecciones.forEach(l => porCurso.set(l.curso, [...(porCurso.get(l.curso) || []), l]));
  const contrato = new Set(D.cursos.map(c => c.id)), suyos = e => e.cursos.filter(c => contrato.has(c) && (!f.curso || c === f.curso));
  const gente = D.estudiantes.filter(e => e.activo && (!f.grupo || e.grupo === (f.grupo === '(sin grupo)' ? '' : f.grupo)) && (!f.curso || e.cursos.includes(f.curso)));
  const ids = new Set(gente.map(e => e.id)), uso = new Map(), hechas = new Map();
  D.uso.forEach(u => { if (ids.has(u[0])) uso.set(u[0], [...(uso.get(u[0]) || []), u]); });
  D.hechas.forEach(h => { if (ids.has(h[0])) { if (!hechas.has(h[0])) hechas.set(h[0], new Map()); hechas.get(h[0]).set(h[1], h[2]); } });
  const filas = gente.map(e => {
    const us = uso.get(e.id) || [], en = us.filter(u => u[1] >= desde), hs = hechas.get(e.id) || new Map(), cs = suyos(e);
    const total = cs.reduce((t, c) => t + (porCurso.get(c) || []).length, 0), n = [...hs.keys()].filter(l => cs.includes(deCurso.get(l))).length;
    const ej = en.reduce((t, u) => t + u[3], 0), ac = en.reduce((t, u) => t + u[4], 0), ult = [us.map(u => u[1]).sort().pop() || '', instBogota(e.ultima)].sort().pop();
    return { ...e, min: Math.round(en.reduce((t, u) => t + u[2], 0) / 60), ejercicios: ej, aciertos: ej >= 10 ? Math.round(100 * ac / ej) : null, hechas: n, total, avance: total ? n / total : 0,
      nuevas: [...hs].filter(([l, d]) => d && d >= desde && cs.includes(deCurso.get(l))).length, ult, sin: ult ? instEntre(ult, hoy) : null, dias: new Set(en.filter(instEstudio).map(u => u[1])).size };
  });
  const media = xs => (xs.length ? xs.reduce((t, x) => t + x, 0) / xs.length : 0), dentro = filas.filter(e => e.entro), prom = media(dentro.map(e => e.avance));
  // Se compara con su grupo (si alcanza a ser grupo): cada uno puede llevar otros cursos y otro ritmo.
  const deGrupo = new Map(); dentro.forEach(e => deGrupo.set(e.grupo, [...(deGrupo.get(e.grupo) || []), e.avance]));
  filas.forEach(e => { const g = deGrupo.get(e.grupo) || []; e.alerta = instAlerta(e, hoy, g.length >= 5 ? media(g) : prom); });
  const suma = (a, b) => [...uso.values()].flat().filter(u => u[1] >= a && u[1] <= b), activos = xs => new Set(xs.filter(instEstudio).map(u => u[0])).size, mins = xs => Math.round(xs.reduce((t, u) => t + u[2], 0) / 60);
  const ahora = suma(desde, hoy), previo = suma(antes, instDia(desde, -1)), ej = ahora.reduce((t, u) => t + u[3], 0);
  const serie = Array.from({ length: f.dias }, (_, i) => { const d = instDia(desde, i), xs = ahora.filter(u => u[1] === d); return { d, min: mins(xs), activos: activos(xs) }; });
  const grupos = [...new Set(D.estudiantes.filter(e => e.activo).map(e => e.grupo))].sort((a, b) => a.localeCompare(b, 'es', { numeric: true })).map(g => {
    const xs = filas.filter(e => e.grupo === g); return { grupo: g, n: xs.length, entraron: xs.filter(e => e.entro).length, activos: xs.filter(e => e.dias).length, avance: media(xs.map(e => e.avance)), min: Math.round(media(xs.map(e => e.min))), alerta: xs.filter(e => e.alerta).length };
  }).filter(g => g.n);
  const cursos = D.cursos.filter(c => !f.curso || c.id === f.curso).map(c => {
    const xs = gente.filter(e => e.cursos.includes(c.id)), ls = porCurso.get(c.id) || [], mapa = ls.map(l => ({ ...l, n: xs.filter(e => hechas.get(e.id)?.has(l.id)).length }));
    return { ...c, n: xs.length, total: ls.length, mapa, avance: xs.length && ls.length ? mapa.reduce((t, l) => t + l.n, 0) / (xs.length * ls.length) : 0 };
  });
  return { filas, serie, grupos, cursos, prom, entraron: dentro.length, activos: activos(ahora), activosAntes: activos(previo), min: mins(ahora), minAntes: mins(previo), aciertos: ej ? Math.round(100 * ahora.reduce((t, u) => t + u[4], 0) / ej) : null,
    nuevas: filas.reduce((t, e) => t + e.nuevas, 0), alertas: filas.filter(e => e.alerta).sort((a, b) => a.alerta.peso - b.alerta.peso), hechas };
}
// Quién necesita una mano y por qué (una sola razón, la más urgente). null: va bien.
// Los umbrales son un punto de partida: no están validados (docs/instituciones/verificacion.md dice cómo medirlos).
const INST_UMBRAL = { nunca: 3, ausente: 7, aciertos: 50, atras: .5 };
function instAlerta(e, hoy, prom, U = INST_UMBRAL) {
  if (!e.entro) return instEntre(e.alta, hoy) >= U.nunca ? { k: 'nunca', t: 'Aún no ha entrado', peso: 1 } : null;
  if (e.sin != null && e.sin >= U.ausente) return { k: 'ausente', t: `Lleva ${e.sin} días sin entrar`, peso: 2 };
  if (e.aciertos != null && e.aciertos < U.aciertos) return { k: 'aciertos', t: `Acierta el ${e.aciertos} % de los ejercicios`, peso: 3 };
  if (prom >= .08 && e.avance < prom * U.atras) return { k: 'atras', t: 'Va muy atrás de su grupo', peso: 4 };
  return null;
}
// Una meta: cuántos la cumplieron de los que la tienen. hechas: Map(id → Map(lección → día)).
function instMeta(m, estudiantes, hechas, hoy) {
  const xs = estudiantes.filter(e => e.activo && (!m.grupo || e.grupo === m.grupo) && e.cursos.includes(m.curso));
  const filas = xs.map(e => { const n = m.lecciones.filter(l => hechas.get(e.id)?.has(l)).length; return { e, n, ok: n === m.lecciones.length }; });
  return { filas, n: filas.length, ok: filas.filter(x => x.ok).length, p: filas.length ? filas.reduce((t, x) => t + x.n, 0) / (filas.length * m.lecciones.length) : 0, quedan: instEntre(hoy, m.hasta) };
}
// ¿Sus datos (nombre, grupo, documento…) los maneja su institución? Solo los cambian el gestor, en el portal, o Zuka. Quien compró un curso por su
// cuenta y lo tiene vigente maneja los suyos. La base repite la regla (privado.inst_fija).
function instFija({ perfil, accesos = [], inst }, now = Date.now()) {
  if (!perfil || perfil.rol === 'admin') return false;
  if (perfil.rol === 'gestor') return true;
  return !!(inst && inst.nombres && inst.nombres.length) && !accesos.some(a => !a.institucion && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > now);
}
// ¿Su institución le maneja los cursos? Entonces la app no le ofrece compras ni asesorías. Quien además compró algo por su cuenta
// (un curso vigente u horas) conserva la tienda: es suyo.
function instManda({ perfil, accesos = [], inst, horas = 0 }, now = Date.now()) {
  if (!perfil || perfil.rol === 'admin') return false;
  if (perfil.rol === 'gestor') return true;
  return !!(inst && inst.nombres && inst.nombres.length) && !(horas > 0) && !accesos.some(a => !a.institucion && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > now);
}
// Cursos de un estudiante con lo que le abre su institución: gana lo propio solo si está pago y dura más.
function instJunta(propios, deInst) {
  const out = new Map((propios || []).map(a => [a.curso, a]));
  (deInst || []).forEach(x => { const a = out.get(x.curso); if (!(a && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > new Date(x.hasta))) out.set(x.curso, x); });
  return [...out.values()].sort((a, b) => a.curso.localeCompare(b.curso));
}
// ¿Aciertan las alertas? avisos y mal: Set de ids (lo que marcó el portal y lo que dijo el docente sin verlo); todos: los evaluados.
function instMide(avisos, mal, todos) {
  const vp = todos.filter(id => avisos.has(id) && mal.has(id)).length, fp = todos.filter(id => avisos.has(id) && !mal.has(id)).length, fn = todos.filter(id => !avisos.has(id) && mal.has(id)).length;
  // Intervalo de Wilson al 95 %: con pocos estudiantes un 70 % puede no significar nada.
  const w = (k, n) => { if (!n) return [0, 1]; const z = 1.96, p = k / n, d = 1 + z * z / n, c = p + z * z / (2 * n), m = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)); return [Math.max(0, (c - m) / d), Math.min(1, (c + m) / d)]; };
  return { vp, fp, fn, precision: vp + fp ? vp / (vp + fp) : null, cobertura: vp + fn ? vp / (vp + fn) : null, icPrecision: w(vp, vp + fp), icCobertura: w(vp, vp + fn) };
}

// ---------- docente responsable y simulacros (spec 2026-11-25-docente-responsable) ----------
// Nota: porcentaje de aciertos, de 0 a 100. No es un puntaje del examen real.
const instNota = (aciertos, n) => (n ? Math.round(100 * aciertos / n) : 0);
// Elige n preguntas repartidas entre los mundos, primero las que no se han usado; las de un mismo texto quedan seguidas.
function instElige(preguntas, mundos, n, usadas = new Set(), azar = Math.random) {
  const revuelve = xs => { const a = [...xs]; for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(azar() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
  const cola = new Map(mundos.map(m => [m, revuelve(preguntas.filter(p => p.m === m)).sort((a, b) => usadas.has(a.k) - usadas.has(b.k))])), out = [];
  for (const nuevas of [true, false]) {
    while (out.length < n) {
      let puso = false;
      for (const m of mundos) { const q = cola.get(m), j = q.findIndex(p => !nuevas || !usadas.has(p.k)); if (j < 0 || out.length >= n) continue; out.push(q.splice(j, 1)[0]); puso = true; }
      if (!puso) break;
    }
  }
  return instOrdena(out, mundos);
}
const instOrdena = (ps, mundos) => ps.map((p, i) => ({ p, i, j: mundos.indexOf(p.m), t: p.d == null ? -1 : ps.findIndex(x => x.d === p.d) })).sort((a, b) => a.j - b.j || (a.t < 0 ? a.i : a.t) - (b.t < 0 ? b.i : b.t) || a.i - b.i).map(x => x.p);
// Todo lo que se lee de un simulacro. det: { preguntas, resultados } de docencia('simulacro'); gente: los que deben presentarlo.
function instSimulacro(det, gente) {
  const ps = det.preguntas, N = ps.length, de = new Map(det.resultados.map(r => [r.estudiante, r]));
  const filas = gente.map(e => { const r = de.get(e.id); return { e, r: r || null, estado: !r ? 'falta' : r.entregado ? 'entregado' : 'curso', nota: r && r.entregado ? instNota(r.aciertos, N) : null }; });
  const ok = filas.filter(f => f.estado === 'entregado'), media = xs => (xs.length ? Math.round(xs.reduce((t, x) => t + x, 0) / xs.length) : null);
  const preguntas = ps.map((p, i) => {
    const dist = [0, 0, 0, 0]; let blanco = 0; ok.forEach(f => { const o = f.r.respuestas[i]; if (o >= 0 && o < 4) dist[o]++; else blanco++; });
    const mal = dist.map((x, o) => [x, o]).filter(x => x[1] !== p.r).sort((a, b) => b[0] - a[0])[0];
    return { i, p, dist, blanco, acierto: ok.length ? dist[p.r] / ok.length : null, trampa: mal && mal[0] > 0 && mal[0] >= dist[p.r] ? mal[1] : null };
  });
  const por = clave => [...new Set(ps.map(clave))].map(m => { const xs = preguntas.filter(x => clave(x.p) === m); return { m, n: xs.length, acierto: ok.length ? xs.reduce((t, x) => t + x.acierto, 0) / xs.length : null, lecciones: [...new Set(xs.filter(x => x.acierto != null && x.acierto < .6).map(x => x.p.l).filter(Boolean))] }; });
  const grupos = [...new Set(gente.map(e => e.grupo))].sort((a, b) => a.localeCompare(b, 'es', { numeric: true })).map(g => { const xs = filas.filter(f => f.e.grupo === g), k = xs.filter(f => f.nota != null); return { grupo: g, n: xs.length, entregaron: k.length, nota: media(k.map(f => f.nota)) }; });
  const notas = ok.map(f => f.nota), tramos = [0, 20, 40, 60, 80].map(d => ({ d, h: d === 80 ? 100 : d + 19, n: notas.filter(x => x >= d && (d === 80 || x < d + 20)).length }));
  return { filas, n: gente.length, entregaron: ok.length, curso: filas.filter(f => f.estado === 'curso').length, nota: media(notas), min: notas.length ? Math.min(...notas) : null, max: notas.length ? Math.max(...notas) : null, preguntas, mundos: por(p => p.m).sort((a, b) => (a.acierto ?? 1) - (b.acierto ?? 1)), grupos, tramos };
}
// Por mundo, lo que acertó un estudiante en varios simulacros. dets: [{ preguntas, resultados }].
function instPorMundo(dets, id) {
  const out = new Map();
  dets.forEach(d => { const r = d.resultados.find(x => x.estudiante === id && x.entregado); if (!r) return; d.preguntas.forEach((p, i) => { const x = out.get(p.m) || { m: p.m, n: 0, ok: 0, lecciones: new Set() }; x.n++; if (r.respuestas[i] === p.r) x.ok++; else if (p.l) x.lecciones.add(p.l); out.set(p.m, x); }); });
  return [...out.values()].map(x => ({ ...x, lecciones: [...x.lecciones] })).sort((a, b) => a.ok / a.n - b.ok / b.n);
}
