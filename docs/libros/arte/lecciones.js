// Lecciones de cada libro, en el orden en que salen en los .tex.
const fs = require('fs'), path = require('path'), T = path.join(__dirname, '../tex');
const lecciones = n => [...fs.readFileSync(path.join(T, `libro${n}.tex`), 'utf8').matchAll(/\\parte\{(l\d-[a-z]+)\}/g)]
  .flatMap(m => [...fs.readFileSync(path.join(T, m[1] + '.tex'), 'utf8').matchAll(/\\leccion\{(pu-[a-z]+-\d+)\}/g)].map(x => x[1]));
module.exports = { lecciones };
