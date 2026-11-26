// Lecciones de cada libro, en el orden en que salen en los .tex (1–4 Preuniversitario; 5–9 Preicfes, generados por icfes.js).
const fs = require('fs'), path = require('path'), T = path.join(__dirname, '../tex');
const lee = f => (fs.existsSync(path.join(T, f + '.tex')) ? fs.readFileSync(path.join(T, f + '.tex'), 'utf8') : '');
const partes = n => { const t = lee(`libro${n}`); return [...(t + [...t.matchAll(/\\input\{(salida\/icf\/partes-\d)\}/g)].map(m => lee(m[1])).join('\n')).matchAll(/\\parte\{([^}]+)\}/g)].map(m => m[1]); };
const lecciones = n => partes(n).flatMap(f => [...lee(f).matchAll(/\\leccion\{((?:pu|icf)-[a-z]+-(?:[a-z]+-)?\d+)\}/g)].map(x => x[1]));
module.exports = { lecciones };
