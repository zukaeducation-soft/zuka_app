// Portal de ejemplo (/instituciones/portal/?demo): un colegio inventado, sin red. Sirve para mostrarlo y para probarlo.
function portalDemo() {
  let s = 7; const az = () => (s = (s * 16807) % 2147483647) / 2147483647, hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
  const N = ['Ana', 'Juan', 'Luisa', 'Mateo', 'Sara', 'Tomás', 'Valentina', 'Samuel', 'Isabella', 'Daniel', 'Camila', 'Andrés', 'Mariana', 'Felipe', 'Sofía', 'Nicolás'], A = ['Ríos', 'Mejía', 'Cano', 'Vélez', 'Gil', 'Roa', 'Ospina', 'Arango', 'Duque', 'Zapata', 'Henao'], L = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const cod = () => Array.from({ length: 10 }, () => L[Math.floor(az() * 32)]).join('');
  const cursos = [{ id: 'algebra', nombre: 'Álgebra' }, { id: 'preicfes', nombre: 'Preicfes Saber 11' }], T = { algebra: ['Qué es un conjunto', 'Relaciones entre conjuntos', 'Operaciones', 'Naturales y enteros', 'Racionales', 'Reales', 'Axiomas de campo', 'Consecuencias', 'Orden', 'Razones', 'Proporciones', 'Regla de tres', 'Porcentajes', 'Aumentos', 'Potencias', 'Raíces'], preicfes: ['Enteros', 'Leer un texto', 'El mapa', 'La célula', 'Verb to be', 'Fracciones', 'La tesis', 'El Estado', 'La fuerza', 'Past simple'] };
  const lecciones = cursos.flatMap(c => T[c.id].map((titulo, i) => ({ id: `${c.id}-${i}`, curso: c.id, titulo })));
  const estudiantes = [], uso = [], hechas = [];
  ['10A', '10B', '11A', '11B'].forEach((g, gi) => { for (let i = 0; i < 13; i++) {
    const id = gi * 20 + i + 1, fuerza = Math.max(.2, az() * .8 + gi * .07), entro = az() > .08, cs = gi < 2 ? ['algebra'] : ['algebra', 'preicfes'];
    estudiantes.push({ id, nombre: `${N[Math.floor(az() * N.length)]} ${A[Math.floor(az() * A.length)]} ${A[Math.floor(az() * A.length)]}`, grupo: g, identificador: String(1000000 + id), cursos: cs, activo: true, codigo: cod(), alta: instDia(hoy, -75), entro, ultima: null });
    if (!entro) continue;
    const corte = az() > .92 ? 9 + Math.floor(az() * 12) : 0;
    for (let d = 74; d >= corte; d--) if (az() < fuerza * .62) { const ej = 4 + Math.floor(az() * 18); uso.push([id, instDia(hoy, -d), Math.round((300 + az() * 1900)), ej, Math.round(ej * Math.min(1, .3 + fuerza * .6 + az() * .15))]); }
    cs.forEach(c => T[c].forEach((x, k) => { if (az() < fuerza * 1.25 - k * .055) hechas.push([id, `${c}-${k}`, instDia(hoy, -Math.max(corte, Math.floor(az() * 70)))]); }));
  } });
  const D = { institucion: { id: 'demo', nombre: 'Colegio de ejemplo', ciudad: 'Medellín', cupos: 60, cursos: ['algebra', 'preicfes'], desde: instDia(hoy, -80), hasta: instDia(hoy, 190), estado: 'activa', vigente: true, usados: 52 }, yo: { nombre: 'Gestor de ejemplo', papel: 'gestor', grupos: [] }, hoy, cursos, lecciones, estudiantes, uso, hechas,
    metas: [{ id: 1, titulo: 'Conjuntos completo', curso: 'algebra', lecciones: ['algebra-0', 'algebra-1', 'algebra-2'], grupo: '', hasta: instDia(hoy, 4), creado_por: 'Gestor de ejemplo' }, { id: 2, titulo: 'Arranque del Preicfes', curso: 'preicfes', lecciones: ['preicfes-0', 'preicfes-1', 'preicfes-2', 'preicfes-3'], grupo: '11A', hasta: instDia(hoy, 9), creado_por: 'Marta Docente' }],
    equipo: [{ id: 1, nombre: 'Gestor de ejemplo', correo: '', papel: 'gestor', grupos: [], activo: true, codigo: null, entro: true, ultima: new Date().toISOString(), yo: true }, { id: 2, nombre: 'Marta Docente', correo: '', papel: 'docente', grupos: ['11A', '11B'], activo: true, codigo: cod(), entro: false, ultima: null, yo: false }], registro: [{ quien: 'Gestor de ejemplo', accion: 'alta', detalle: { cuantos: 52 }, en: new Date().toISOString() }] };
  const de = ids => D.estudiantes.filter(e => ids.map(Number).includes(e.id)), err = t => { const e = new Error(t); e.code = '22023'; throw e; };
  return async (a, p = {}) => {
    const usados = () => D.estudiantes.filter(e => e.activo).length;
    if (a === 'panel') { D.institucion.usados = usados(); return structuredClone(D); }
    if (a === 'estudiante') return { nota: de([p.id])[0]?.nota || '', dispositivos: 1, evaluaciones: [{ titulo: 'Evaluación de Conjuntos', curso: 'algebra', nota: 78 }], tiempo: [] };
    if (a === 'alta') { if (usados() + p.lista.length > D.institucion.cupos) err(`No alcanzan los cupos: quedan ${D.institucion.cupos - usados()}`); const nuevos = p.lista.map(x => { const e = { id: 1000 + D.estudiantes.length, ...x, cursos: p.cursos, activo: true, codigo: cod(), alta: hoy, entro: false, ultima: null }; D.estudiantes.push(e); return e; }); return { ok: true, nuevos, repetidos: [] }; }
    if (a === 'editar') de(p.ids).forEach(e => ['nombre', 'grupo', 'cursos', 'identificador', 'nota'].forEach(k => { if (p[k] !== undefined) e[k] = p[k]; }));
    if (a === 'retirar') de(p.ids).forEach(e => { e.activo = false; }); if (a === 'reactivar') de(p.ids).forEach(e => { e.activo = true; });
    if (a === 'codigo') { const e = de(p.ids)[0]; e.codigo = cod(); return { ok: true, codigo: e.codigo }; }
    if (a === 'meta_guardar') D.metas.unshift({ id: Date.now(), ...p, creado_por: D.yo.nombre }); if (a === 'meta_borrar') D.metas = D.metas.filter(m => m.id !== p.id);
    if (a === 'equipo_guardar') { if (p.id) Object.assign(D.equipo.find(x => x.id === +p.id), { nombre: p.nombre, correo: p.correo, papel: p.papel, grupos: p.grupos }); else { const c = cod(); D.equipo.push({ id: Date.now(), ...p, activo: true, codigo: c, entro: false, ultima: null }); return { ok: true, codigo: c }; } }
    if (a === 'equipo_estado') D.equipo.find(x => x.id === +p.id).activo = p.si; if (a === 'equipo_codigo') return { ok: true, codigo: cod() };
    if (a === 'grupo_renombrar') D.estudiantes.forEach(e => { if (e.grupo === p.grupo) e.grupo = p.nuevo; });
    return { ok: true };
  };
}
