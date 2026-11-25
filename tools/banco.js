// Banco de preguntas de los simulacros (spec 2026-11-25-docente-responsable): junta las preguntas A–D de los cursos en
// instituciones/banco.json, que el portal carga para armar simulacros. Lo corre tools/empaquetar.js; no editar el resultado a mano.
const fs = require('fs'), path = require('path'), ROOT = path.join(__dirname, '..');
const PREFIJO = { matematicas: 'icf-ma-', lectura: 'icf-lc-', sociales: 'icf-sc-', ciencias: 'icf-cn-', ingles: 'icf-en-' };
const huella = t => { let h = 2166136261; for (const ch of t) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0; return h.toString(36); };

function banco() {
  const { loadScripts, get } = require('../tests/load');
  const js = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/src="(js\/[^"]+\.js)"/g)].map(m => m[1]);
  const ctx = loadScripts(['js/ui.js', 'js/worlds.js', 'js/content.js', 'js/curiosidades.js', 'js/acceso.js', ...js.filter(f => /^js\/(games\/(kit|formula|arma-la-cuenta|escala-solucion)\.js$|courses\/|data\.js$)/.test(f) && !/sin-escribir/.test(f))]);
  const C = get(ctx, 'COURSES'), icf = C.find(c => c.id === 'preicfes'), pu = C.find(c => c.id === 'preuda');
  const textos = [], vT = new Map(), preguntas = [], vP = new Set();
  const texto = p => {
    const ds = p.docs || (p.doc ? [p.doc] : []); if (!ds.length) return null;
    const t = { title: ds.map(d => d.title).join(' · '), paras: ds.flatMap((d, i) => (ds.length > 1 ? [`**Texto ${i + 1}. ${d.title}**`, ...d.paras] : d.paras)) }, k = JSON.stringify(t);
    if (!vT.has(k)) { vT.set(k, textos.length); textos.push(t); }
    return vT.get(k);
  };
  const saca = (u, comp, mundo, conLeccion) => {
    const xs = [...(u.exam ? u.exam.items : []), ...u.lessons.flatMap(l => l.ex.map(ex => ({ lesson: l.id, ex })))];
    xs.filter(x => ['opcion-examen', 'pregunta-examen'].includes(x.ex.game)).forEach(x => {
      const p = x.ex.params, k = huella(JSON.stringify([p.q, p.options, p.doc && p.doc.title]));
      if (vP.has(k)) return; vP.add(k);
      preguntas.push({ k, c: comp, m: mundo, l: conLeccion ? x.lesson : '', q: p.q, o: [...p.options], r: p.answer, e: x.ex.explain || '', d: texto(p) });
    });
  };
  const componentes = icf.blocks.map(b => ({ id: b.id, nombre: b.title || b.name, prefijo: PREFIJO[b.id], mundos: icf.units.filter(u => u.block === b.id).map(u => { saca(u, b.id, u.world, true); return { id: u.world, nombre: u.title, lecciones: u.lessons.map(l => l.id) }; }) }));
  // El Preuniversitario amplía el banco: quien solo tiene Preicfes no las ha visto.
  [['razonamiento', 'matematicas'], ['lectura', 'lectura']].forEach(([b, c]) => pu.units.filter(u => u.block === b).forEach(u => { const n = preguntas.length; saca(u, c, u.world, false); if (preguntas.length > n) componentes.find(x => x.id === c).mundos.push({ id: u.world, nombre: u.title, lecciones: [], extra: true }); }));
  return JSON.stringify({ componentes, preguntas, textos }, null, 0).replace(/\},\{"k"/g, '},\n{"k"') + '\n';
}
module.exports = { banco };
if (require.main === module) { fs.writeFileSync(path.join(ROOT, 'instituciones/banco.json'), banco()); console.log('instituciones/banco.json'); }
