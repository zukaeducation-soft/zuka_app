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

// Lista pegada de Excel o de un CSV: una persona por renglón, «nombre, grupo, documento» con tabulador, punto y coma o coma.
// Salta el renglón de títulos y avisa de lo que no sirve.
function instLista(texto) {
  const filas = String(texto || '').replace(/^﻿/, '').split(/\r?\n/).map(l => l.trim()).filter(Boolean), out = [], malas = [], vistos = new Set();
  const sep = filas.some(l => l.includes('\t')) ? '\t' : filas.some(l => l.includes(';')) ? ';' : ',';
  filas.forEach((l, i) => {
    const c = l.split(sep).map(x => x.trim().replace(/^"|"$/g, '').replace(/\s+/g, ' ').trim());
    if (!i && /^(nombres?( completos?| y apellidos)?|estudiantes?|alumnos?)$/i.test(c[0])) return;
    const x = { nombre: (c[0] || '').slice(0, 80), grupo: (c[1] || '').slice(0, 40), identificador: (c[2] || '').slice(0, 40) };
    if (x.nombre.length < 2 || !/\p{L}/u.test(x.nombre)) return malas.push({ linea: i + 1, texto: l, por: 'sin nombre' });
    const k = x.identificador.toLowerCase() || `${x.nombre}|${x.grupo}`.toLowerCase();
    if (vistos.has(k)) return malas.push({ linea: i + 1, texto: l, por: 'repetido en la lista' });
    vistos.add(k); out.push(x);
  });
  return { lista: out, malas };
}

const instDia = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const instEntre = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const instBogota = iso => (iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) : '');
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
      nuevas: [...hs].filter(([l, d]) => d && d >= desde && cs.includes(deCurso.get(l))).length, ult, sin: ult ? instEntre(ult, hoy) : null, dias: new Set(en.filter(u => u[2] > 0).map(u => u[1])).size };
  });
  const media = xs => (xs.length ? xs.reduce((t, x) => t + x, 0) / xs.length : 0), dentro = filas.filter(e => e.entro), prom = media(dentro.map(e => e.avance));
  filas.forEach(e => { e.alerta = instAlerta(e, hoy, prom); });
  const suma = (a, b) => [...uso.values()].flat().filter(u => u[1] >= a && u[1] <= b), activos = xs => new Set(xs.filter(u => u[2] > 0).map(u => u[0])).size, mins = xs => Math.round(xs.reduce((t, u) => t + u[2], 0) / 60);
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
function instAlerta(e, hoy, prom) {
  if (!e.entro) return instEntre(e.alta, hoy) >= 3 ? { k: 'nunca', t: 'Aún no ha entrado', peso: 1 } : null;
  if (e.sin != null && e.sin >= 7) return { k: 'ausente', t: `Lleva ${e.sin} días sin entrar`, peso: 2 };
  if (e.aciertos != null && e.aciertos < 50) return { k: 'aciertos', t: `Acierta el ${e.aciertos} % de los ejercicios`, peso: 3 };
  if (prom >= .08 && e.avance < prom * .5) return { k: 'atras', t: 'Va muy atrás del promedio', peso: 4 };
  return null;
}
// Una meta: cuántos la cumplieron de los que la tienen. hechas: Map(id → Map(lección → día)).
function instMeta(m, estudiantes, hechas, hoy) {
  const xs = estudiantes.filter(e => e.activo && (!m.grupo || e.grupo === m.grupo) && e.cursos.includes(m.curso));
  const filas = xs.map(e => { const n = m.lecciones.filter(l => hechas.get(e.id)?.has(l)).length; return { e, n, ok: n === m.lecciones.length }; });
  return { filas, n: filas.length, ok: filas.filter(x => x.ok).length, p: filas.length ? filas.reduce((t, x) => t + x.n, 0) / (filas.length * m.lecciones.length) : 0, quedan: instEntre(hoy, m.hasta) };
}
// Cursos de un estudiante con lo que le abre su institución: gana lo propio solo si está pago y dura más.
function instJunta(propios, deInst) {
  const out = new Map((propios || []).map(a => [a.curso, a]));
  (deInst || []).forEach(x => { const a = out.get(x.curso); if (!(a && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > new Date(x.hasta))) out.set(x.curso, x); });
  return [...out.values()].sort((a, b) => a.curso.localeCompare(b.curso));
}
