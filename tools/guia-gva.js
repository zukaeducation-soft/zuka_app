// Rehace el bloque GUIDE_GVA de js/guia.js con los juegos de js/games/gva-escena-*.js, según su armazón (XG.figura, XG.rotula,
// XG.tiros, XG.marca). Se corre después de añadir juegos al curso de Geometría Vectorial: node tools/guia-gva.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const dir = path.join(ROOT, 'js/games');
const kinds = {};
for (const f of fs.readdirSync(dir).filter(f => /^gva-escena-\d+\.js$/.test(f))) {
  for (const [, k, n] of fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/XG\.([a-z]+)\(\s*'([a-z0-9-]+)'/g)) (kinds[k] ||= []).push(n);
}
const otros = Object.keys(kinds).filter(k => !['figura', 'rotula', 'tiros', 'marca'].includes(k));
if (otros.length) { console.error(`armazón sin guía: ${otros.join(', ')}`); process.exit(1); }
const p = path.join(ROOT, 'js/guia.js'), s = fs.readFileSync(p, 'utf8');
const ini = s.indexOf('const GUIDE_GVA = {'), fin = s.indexOf('};\n', ini) + 3;
const cuerpo = 'const GUIDE_GVA = {\n' + Object.keys(kinds).sort().map(k => `  ${k}: [${[...new Set(kinds[k])].sort().map(n => `'${n}'`).join(', ')}],\n`).join('') + '};\n';
fs.writeFileSync(p, s.slice(0, ini) + cuerpo + s.slice(fin));
console.log(Object.entries(kinds).map(([k, l]) => `${k}: ${l.length}`).join(', '));
