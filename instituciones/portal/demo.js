// Portal de ejemplo (/instituciones/portal/?demo): un colegio inventado, sin red. Sirve para mostrarlo y para probarlo.
function portalDemo(B, comoDocente) {
  let s = 7; const az = () => (s = (s * 16807) % 2147483647) / 2147483647, hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
  const N = ['Ana', 'Juan', 'Luisa', 'Mateo', 'Sara', 'Tomás', 'Valentina', 'Samuel', 'Isabella', 'Daniel', 'Camila', 'Andrés', 'Mariana', 'Felipe', 'Sofía', 'Nicolás'], A = ['Ríos', 'Mejía', 'Cano', 'Vélez', 'Gil', 'Roa', 'Ospina', 'Arango', 'Duque', 'Zapata', 'Henao'], L = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const cod = () => Array.from({ length: 10 }, () => L[Math.floor(az() * 32)]).join('');
  const cursos = [{ id: 'algebra', nombre: 'Álgebra' }, { id: 'preicfes', nombre: 'Preicfes Saber 11' }], T = { algebra: ['Qué es un conjunto', 'Relaciones entre conjuntos', 'Operaciones', 'Naturales y enteros', 'Racionales', 'Reales', 'Axiomas de campo', 'Consecuencias', 'Orden', 'Razones', 'Proporciones', 'Regla de tres', 'Porcentajes', 'Aumentos', 'Potencias', 'Raíces'], preicfes: [] };
  const icf = (B ? B.componentes : []).flatMap(c => c.mundos.filter(m => !m.extra).flatMap(m => m.lecciones.map((id, k) => ({ id, curso: 'preicfes', titulo: m.lecciones.length > 1 ? `${m.nombre} ${k + 1}` : m.nombre }))));
  const lecciones = [...T.algebra.map((titulo, i) => ({ id: `algebra-${i}`, curso: 'algebra', titulo })), ...icf];
  const estudiantes = [], uso = [], hechas = [];
  ['10A', '10B', '11A', '11B'].forEach((g, gi) => { for (let i = 0; i < 13; i++) {
    const id = gi * 20 + i + 1, fuerza = Math.max(.2, az() * .8 + gi * .07), entro = az() > .08, cs = gi < 2 ? ['algebra'] : ['algebra', 'preicfes'];
    estudiantes.push({ id, nombre: `${N[Math.floor(az() * N.length)]} ${A[Math.floor(az() * A.length)]} ${A[Math.floor(az() * A.length)]}`, grupo: g, identificador: String(1000000 + id), cursos: cs, activo: true, codigo: cod(), alta: instDia(hoy, -75), entro, ultima: null });
    if (!entro) continue;
    const corte = az() > .92 ? 9 + Math.floor(az() * 12) : 0;
    for (let d = 74; d >= corte; d--) if (az() < fuerza * .62) { const ej = 4 + Math.floor(az() * 18); uso.push([id, instDia(hoy, -d), Math.round((300 + az() * 1900)), ej, Math.round(ej * Math.min(1, .3 + fuerza * .6 + az() * .15))]); }
    if (cs.includes('preicfes')) icf.forEach((l, k) => { if (az() < fuerza * .9 - (k % 20) * .045) hechas.push([id, l.id, instDia(hoy, -Math.max(corte, Math.floor(az() * 50)))]); });
    cs.forEach(c => T[c].forEach((x, k) => { if (az() < fuerza * 1.25 - k * .055) hechas.push([id, `${c}-${k}`, instDia(hoy, -Math.max(corte, Math.floor(az() * 70)))]); }));
  } });
  const D = { institucion: { id: 'demo', nombre: 'Colegio de ejemplo', ciudad: 'Medellín', cupos: 60, cursos: ['algebra', 'preicfes'], desde: instDia(hoy, -80), hasta: instDia(hoy, 190), estado: 'activa', vigente: true, usados: 52 }, yo: { nombre: 'Gestor de ejemplo', papel: 'gestor', grupos: [] }, hoy, cursos, lecciones, estudiantes, uso, hechas,
    metas: [{ id: 1, titulo: 'Conjuntos completo', curso: 'algebra', lecciones: ['algebra-0', 'algebra-1', 'algebra-2'], grupo: '', hasta: instDia(hoy, 4), creado_por: 'Gestor de ejemplo' }, { id: 2, titulo: 'Arranque del Preicfes', curso: 'preicfes', lecciones: icf.slice(0, 4).map(l => l.id), grupo: '11A', hasta: instDia(hoy, 9), creado_por: 'Marta Docente' }],
    equipo: [{ id: 1, nombre: 'Gestor de ejemplo', correo: '', papel: 'gestor', grupos: [], activo: true, codigo: null, entro: true, ultima: new Date().toISOString(), yo: true }, { id: 2, nombre: 'Marta Docente', correo: '', papel: 'docente', grupos: ['11A', '11B'], activo: true, codigo: null, entro: true, ultima: new Date().toISOString(), yo: false }, { id: 3, nombre: 'Julio Letras', correo: '', papel: 'docente', grupos: ['11A', '11B'], activo: true, codigo: cod(), entro: false, ultima: null, yo: false }], registro: [{ quien: 'Gestor de ejemplo', accion: 'alta', detalle: { cuantos: 52 }, en: new Date().toISOString() }] };
  if (comoDocente) { D.yo = { nombre: 'Marta Docente', papel: 'docente', grupos: ['11A', '11B'], id: 2 }; D.estudiantes = D.estudiantes.filter(e => e.grupo.startsWith('11')); }
  const X = demoDocencia(B, D, az, hoy);
  const de = ids => D.estudiantes.filter(e => ids.map(Number).includes(e.id)), err = t => { const e = new Error(t); e.code = '22023'; throw e; };
  return async (a, p = {}) => {
    const usados = () => D.estudiantes.filter(e => e.activo).length;
    if (a.startsWith('doc:')) return X.api(a.slice(4), p, comoDocente);
    if (a === 'panel') { D.institucion.usados = usados(); return structuredClone(D); }
    if (a === 'estudiante') return { nota: de([p.id])[0]?.nota || '', dispositivos: 1, evaluaciones: [{ titulo: 'Evaluación de Conjuntos', curso: 'algebra', nota: 78 }], tiempo: [] };
    if (a === 'alta') { if (usados() + p.lista.length > D.institucion.cupos) err(`No alcanzan los cupos: quedan ${D.institucion.cupos - usados()}`); const nuevos = p.lista.map(x => { const e = { id: 1000 + D.estudiantes.length, ...x, cursos: p.cursos, activo: true, codigo: cod(), alta: hoy, entro: false, ultima: null }; D.estudiantes.push(e); return e; }); return { ok: true, nuevos, repetidos: [] }; }
    if (a === 'editar') de(p.ids).forEach(e => ['nombre', 'grupo', 'cursos', 'identificador', 'nota'].forEach(k => { if (p[k] !== undefined) e[k] = p[k]; }));
    if (a === 'retirar') de(p.ids).forEach(e => { e.activo = false; }); if (a === 'reactivar') de(p.ids).forEach(e => { e.activo = true; });
    if (a === 'codigo') { const e = de(p.ids)[0]; e.codigo = cod(); return { ok: true, codigo: e.codigo }; }
    if (a === 'meta_guardar') D.metas.unshift({ id: Date.now(), ...p, creado_por: D.yo.nombre }); if (a === 'meta_borrar') D.metas = D.metas.filter(m => m.id !== p.id);
    if (a === 'equipo_guardar') { if (p.id) Object.assign(D.equipo.find(x => x.id === +p.id), { nombre: p.nombre, correo: p.correo, papel: p.papel, grupos: p.grupos }); else { const c = cod(), id = Date.now(); D.equipo.push({ id, ...p, activo: true, codigo: c, entro: false, ultima: null }); return { ok: true, codigo: c, id }; } }
    if (a === 'equipo_estado') D.equipo.find(x => x.id === +p.id).activo = p.si; if (a === 'equipo_codigo') return { ok: true, codigo: cod() };
    if (a === 'grupo_renombrar') D.estudiantes.forEach(e => { if (e.grupo === p.grupo) e.grupo = p.nuevo; });
    return { ok: true };
  };
}
// Docencia de ejemplo: responsables, dos simulacros presentados, uno abierto, observaciones y avisos.
function demoDocencia(B, D, az, hoy) {
  const X = { asignaciones: ['11A', '11B'].map(grupo => ({ componente: 'matematicas', grupo, gestor: 2, nombre: 'Marta Docente' })).concat([{ componente: 'lectura', grupo: '11A', gestor: 3, nombre: 'Julio Letras' }]), simulacros: [], resultados: [], observaciones: [], avisos: [] }, det = {}; let k = 1;
  const iso = d => new Date(`${instDia(hoy, d)}T13:00:00Z`).toISOString(), onces = () => D.estudiantes.filter(e => e.activo && e.grupo.startsWith('11'));
  const crea = (p, autor, mio) => { const id = k++; det[id] = { id, preguntas: p.preguntas, textos: p.textos || [], resultados: [] }; X.simulacros.unshift({ id, componente: p.componente, titulo: p.titulo, n: p.preguntas.length, minutos: p.minutos, grupos: p.grupos, abre: p.abre, cierra: p.cierra, muestra: p.muestra || 'cerrar', autor, mio }); return id; };
  if (B) [['matematicas', 'Diagnóstico', -30, -28, .86, 3], ['matematicas', 'Simulacro 2', -9, -6, .93, 5], ['lectura', 'Lectura 1', -12, -10, .8, 4], ['matematicas', 'Simulacro 3', -1, 4, .45, 6]].forEach(([c, titulo, a, z, pr, nm]) => {
    const C = B.componentes.find(x => x.id === c), ms = C.mundos.filter(m => !m.extra).slice(0, nm).map(m => m.id), ps = instElige(B.preguntas, ms, 10, new Set(), az), ts = [...new Set(ps.map(x => x.d).filter(d => d != null))];
    const id = crea({ componente: c, titulo, preguntas: ps.map(x => ({ ...x, d: x.d == null ? null : ts.indexOf(x.d) })), textos: ts.map(t => B.textos[t]), minutos: 30, grupos: c === 'lectura' ? ['11A'] : ['11A', '11B'], abre: iso(a), cierra: iso(z) }, c === 'lectura' ? 'Julio Letras' : 'Marta Docente', true);
    onces().filter(e => X.simulacros[0].grupos.includes(e.grupo)).forEach(e => { if (az() > pr) return; const f = .35 + ((e.id * 37) % 50) / 100 + (a > -10 ? .06 : 0), rs = ps.map((x, i) => (az() < f - (i % 4 === 3 ? .25 : 0) ? x.r : az() < .06 ? -1 : (x.r + 1 + Math.floor(az() * az() * 3)) % 4)), ac = rs.filter((o, i) => o === ps[i].r).length, seg = 500 + Math.round(az() * 1200), sal = az() > .85 ? 1 + Math.floor(az() * 4) : 0; det[id].resultados.push({ estudiante: e.id, entregado: true, respuestas: rs, aciertos: ac, segundos: seg, salidas: sal }); X.resultados.push([id, e.id, 1, ac, seg, sal]); });
  });
  const una = onces()[2]; if (una) X.observaciones.push({ id: 1, estudiante: una.id, componente: 'matematicas', tipo: 'compromiso', texto: 'Acordamos repasar porcentajes antes del viernes.', autor: 'Marta Docente', en: new Date(Date.now() - 2e8).toISOString(), mia: true });
  X.avisos.push({ id: 1, componente: 'matematicas', grupos: ['11A', '11B'], estudiante: null, texto: 'El simulacro 3 cierra el domingo. Háganlo con calma.', hasta: instDia(hoy, 4), autor: 'Marta Docente', en: new Date().toISOString(), mio: true });
  const bog = t => new Date(`${t}:00-05:00`).toISOString();
  return { api: async (a, p, doc) => {
    if (a === 'datos') { const suyo = c => !doc || X.asignaciones.some(y => y.gestor === 2 && y.componente === c); return structuredClone({ ...X, asignaciones: X.asignaciones.filter(y => !doc || y.gestor === 2), simulacros: X.simulacros.filter(s => suyo(s.componente)), avisos: X.avisos.filter(s => suyo(s.componente)) }); }
    if (a === 'simulacro') return structuredClone(det[p.id]);
    if (a === 'asignar') { X.asignaciones = X.asignaciones.filter(y => !(y.componente === p.componente && p.grupos.includes(y.grupo))); const g = D.equipo.find(y => y.id === +p.gestor); if (g) { p.grupos.forEach(grupo => X.asignaciones.push({ componente: p.componente, grupo, gestor: g.id, nombre: g.nombre })); if (g.papel === 'docente') g.grupos = [...new Set([...g.grupos, ...p.grupos])]; } }
    if (a === 'simulacro_crear') return { ok: true, id: crea({ ...p, abre: bog(p.abre), cierra: bog(p.cierra) }, D.yo.nombre, true) };
    if (a === 'simulacro_editar') { const s = X.simulacros.find(y => y.id === +p.id); ['titulo', 'muestra'].forEach(c => { if (p[c]) s[c] = p[c]; }); ['abre', 'cierra'].forEach(c => { if (p[c]) s[c] = bog(p[c]); }); }
    if (a === 'simulacro_borrar') { X.simulacros = X.simulacros.filter(y => y.id !== +p.id); X.resultados = X.resultados.filter(r => r[0] !== +p.id); }
    if (a === 'intento_nuevo') { X.resultados = X.resultados.filter(r => !(r[0] === +p.id && r[1] === +p.estudiante)); det[p.id].resultados = det[p.id].resultados.filter(r => r.estudiante !== +p.estudiante); }
    if (a === 'observacion_guardar') X.observaciones.unshift({ id: Date.now(), ...p, autor: D.yo.nombre, en: new Date().toISOString(), mia: true }); if (a === 'observacion_borrar') X.observaciones = X.observaciones.filter(o => o.id !== +p.id);
    if (a === 'aviso_guardar') X.avisos.unshift({ id: Date.now(), grupos: [], estudiante: null, ...p, autor: D.yo.nombre, en: new Date().toISOString(), mio: true }); if (a === 'aviso_borrar') X.avisos = X.avisos.filter(o => o.id !== +p.id);
    return { ok: true };
  } };
}
