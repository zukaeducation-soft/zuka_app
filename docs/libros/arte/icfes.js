// Libros del Preicfes Saber 11 (spec 2026-11-26-libros-preicfes): uno por componente, armado con los datos del curso en la app.
// Escribe tex/salida/icf/i<N>-<mundo>.tex para N = 5 (Matemáticas), 6 (Lectura Crítica), 7 (Sociales), 8 (Ciencias), 9 (Inglés).
// Cada lección: ruta y capítulos dibujados (pasos.js), problema resuelto, error para cazar, preguntas como las del examen y «Lo que
// construiste»; cada mundo cierra con su evaluación. Uso: node icfes.js [N…]
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '../../..');
const { loadScripts, get } = require(path.join(ROOT, 'tests/load'));
const { tex } = require('./texto');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio/.test(f));
const exp = [...html.matchAll(/src="(js\/explora[^"]*)"/g)].map(m => m[1]).filter(f => !/voces/.test(f));
const ctx = loadScripts(['js/art.js', ...all, ...exp]);
const C = get(ctx, 'COURSES').find(c => c.id === 'preicfes'), X = get(ctx, 'EXPLORA');
const BLOQUES = ['matematicas', 'lectura', 'sociales', 'ciencias', 'ingles'];
const OUT = path.join(__dirname, '../tex/salida/icf');
fs.mkdirSync(OUT, { recursive: true });
const L = 'ABCDEFG';
const sinHuecos = s => s.split(/\[\[(.+?)\]\]/).map((x, i) => (i % 2 ? `\\zhueco{${tex(x)}}` : tex(x))).join('');
const plano = s => tex(String(s).replace(/\[\[(.+?)\]\]/g, '$1'));
const opciones = o => `\\begin{zopc}${o.map((t, i) => `\n\\item[\\op{${L[i]}}] ${tex(t)}`).join('')}\n\\end{zopc}`;
const textoDoc = d => {
  const f = d.ficha ? [d.ficha.autor, d.ficha.fuente, d.ficha.fecha].filter(Boolean).join(' · ') : 'Texto original escrito para este libro';
  return `\\begin{texto}{${tex(d.title || '')}}{${tex(f)}}\n${d.paras.map(p => `\\pa ${tex(p)}`).join('\n\n')}\n\\end{texto}`;
};
const PAPEL = ['opcion-examen', 'pregunta-examen'];
const nombreDe = id => C.units.flatMap(u => u.lessons).find(l => l.id === id);

const libros = (process.argv.slice(2).length ? process.argv.slice(2) : ['5', '6', '7', '8', '9']).map(Number);
const resumen = [];
for (const n of libros) {
  const b = BLOQUES[n - 5], us = C.units.filter(u => u.block === b), partes = [];
  let nres = 0, nerr = 0, nopc = 0, neva = 0, nfuera = 0;
  us.forEach((u, w) => {
    const t = [`% GENERADO por docs/libros/arte/icfes.js: no editar a mano.`];
    const ideas = u.lessons.map(l => (X[l.id]?.pasos || []).find(p => p.tipo === 'cierre')?.idea || '');
    t.push(`\\mundo{${tex(u.title)}}{${u.world}}{\\zintromundo{${u.lessons.length}}}{%\n${u.lessons.map((l, i) => `\\item \\textbf{${w + 1}.${i + 1}} ${tex(l.title)}${ideas[i] ? `\\newline{\\small\\color{zmute}${tex(ideas[i])}}` : ''}`).join('\n')}}`);
    const usados = new Set();
    u.lessons.forEach(l => {
      t.push(`\n% ------------------------------------------------------------------\n\\leccion{${l.id}}{${tex(l.title)}}{}`);
      const g = k => l.ex.filter(e => e.game === k);
      // Problema resuelto paso a paso (Matemáticas y Ciencias)
      g('completa-solucion').forEach(e => {
        nres++;
        t.push(`\\zresuelto{${tex(e.params.q)}}{${e.params.lines.map((x, i) => `\\zcuadrotexto{${i + 1}}{${sinHuecos(x)}}`).join('\\vspace{5pt}\n')}}{${tex(e.explain)}}`);
      });
      // ¿Dónde está el error?
      g('caza-error').forEach(e => {
        nerr++; const p = e.params;
        t.push(`\\zerror{${tex(p.q)}}{${p.steps.map((x, i) => `\\zcuadrotexto{${i + 1}}{${tex(x)}}`).join('\\vspace{3pt}\n')}}{Paso ${p.wrong + 1}. Lo correcto: ${tex(p.fixes[0])}. ${tex(e.explain)}}`);
      });
      // Lectura, Sociales, Inglés: una pregunta del examen comentada con su texto
      const propia = u.exam.items.filter(it => it.lesson === l.id && it.ex.game === 'pregunta-examen');
      if (propia.length) {
        const it = propia[0], p = it.ex.params; usados.add(it);
        t.push(`\\zcomentadatitulo\n${textoDoc(p.doc)}\n\\zcomentada{${tex(p.q)}}{${p.options.map((o, i) => `\\item[\\op{${L[i]}}${i === p.answer ? '{\\color{zok}\\ding{51}}' : '{\\color{zcoral}\\ding{55}}'}] ${tex(o)}`).join('\n')}}{${it.ex.hint ? tex(it.ex.hint) : ''}}{\\textbf{Opción ${L[p.answer]}.} ${tex(it.ex.explain)}}{${tex(it.review || '')}}`);
      }
      // Así sale en el examen
      const op = g('opcion-examen');
      if (op.length) {
        t.push('\\zasisale\n\\begin{ejercicios}');
        op.forEach(e => { nopc++; const p = e.params; t.push(`\\item ${tex(p.q)}\n${opciones(p.options)}\n\\sol{${L[p.answer]}. ${tex(e.explain)}}`); });
        t.push('\\end{ejercicios}');
      }
      t.push('\\loqueconstruiste');
    });
    // Evaluación del mundo: lo que se puede responder en papel
    const items = u.exam.items.filter(it => !usados.has(it));
    const papel = items.filter(it => PAPEL.includes(it.ex.game));
    nfuera += items.length - papel.length;
    if (papel.length) {
      t.push('\n\\evaluacion');
      let doc = null, abierta = false;
      papel.forEach(it => {
        neva++; const p = it.ex.params, d = p.doc && p.doc.paras ? p.doc : null, num = nombreDe(it.lesson);
        const donde = `(${w + 1}.${u.lessons.indexOf(num) + 1})`;
        if (d && d !== doc) { if (abierta) t.push('\\end{ejercicios}'); t.push(textoDoc(d)); doc = d; abierta = false; }
        if (!abierta) { t.push('\\begin{ejercicios}'); abierta = true; }
        t.push(`\\item ${tex(p.q)}\n${opciones(p.options)}\n\\sol{${L[p.answer]}. ${tex(it.ex.explain)} ${donde}}`);
      });
      t.push('\\end{ejercicios}');
    }
    const f = `i${n}-${u.world.replace(/^icf-[a-z]+-/, '')}`;
    fs.writeFileSync(path.join(OUT, f + '.tex'), t.join('\n') + '\n');
    partes.push(f);
  });
  fs.writeFileSync(path.join(OUT, `mundos-${n}.tex`), us.map(u => tex(u.title)).join(' · ') + '\n');
  fs.writeFileSync(path.join(OUT, `partes-${n}.tex`), partes.map(f => `\\parte{salida/icf/${f}}`).join('\n') + '\n');
  resumen.push(`libro ${n} (${b}): ${us.length} mundos, ${us.reduce((a, u) => a + u.lessons.length, 0)} lecciones, ${nres} resueltos, ${nerr} errores, ${nopc} de examen, ${neva} en evaluaciones, ${nfuera} de evaluación solo en la app`);
}
console.log(resumen.join('\n'));
