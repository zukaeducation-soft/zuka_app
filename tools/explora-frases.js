// Lista las frases que se dicen en voz alta en una explicación Explora: el enunciado de cada paso y cada momento de las
// explicaciones. Uso: node tools/explora-frases.js pu-cm-1 > salida.json  →  [{ t: lo que se lee, h: lo que se dice }]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { hablar } = require('./explora-habla');

const ROOT = path.join(__dirname, '..');
// La explicación de una lección: js/explora-<id>.js o, si el archivo trae varias, el que la define con xpLec.
function archivoDe(id) {
  if (fs.existsSync(path.join(ROOT, `js/explora-${id}.js`))) return `js/explora-${id}.js`;
  const f = fs.readdirSync(path.join(ROOT, 'js')).find(x => /^explora-.*.js$/.test(x) && fs.readFileSync(path.join(ROOT, 'js', x), 'utf8').includes(`xpLec('${id}'`));
  return f ? `js/${f}` : null;
}
function frases(id) {
  const propio = archivoDe(id);
  if (!propio) throw new Error(`No hay explicación para ${id}`);
  const ctx = vm.createContext({ console, Math, setTimeout, clearTimeout });
  ctx.window = ctx;
  for (const f of ['js/explora.js', 'js/explora-angulo.js', 'js/explora-numeros.js', 'js/explora-escenas.js', propio]) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
  }
  const def = vm.runInContext('EXPLORA', ctx)[id];
  if (!def) throw new Error(`No hay explicación para ${id}`);
  const out = [];
  for (const p of def.pasos) {
    out.push(p.texto);
    for (const m of p.momentos || []) out.push(m.dice);
  }
  return [...new Set(out)].map(t => ({ t, h: hablar(t) }));
}

if (require.main === module) process.stdout.write(JSON.stringify(frases(process.argv[2] || 'pu-cm-1'), null, 1));
module.exports = { frases, archivoDe };
