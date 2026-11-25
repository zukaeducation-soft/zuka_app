// Escribe docs/libros/tex/zuka-logo.tex (la marca, desde tools/marca.js) y explora-rl.tex (la ruta y las ideas de cada
// lección de Razonamiento lógico, desde js/explora-pu-*.js). Generados: no editar a mano. build.sh lo corre siempre.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../../..');
const { loadScripts, get } = require(path.join(ROOT, 'tests/load'));
const { BRAIN_D, RAYS_D, WORD_D } = require(path.join(ROOT, 'tools/marca'));
const TEX = path.join(__dirname, '../tex');

// ---- marca: contornos como comandos de pgf, en un cuadro guardado (1254 unidades = 100 mm) ----
const U = 100 / 1254;
const pt = (x, y) => `\\pgfpoint{${(x * U).toFixed(3)}mm}{${(-y * U).toFixed(3)}mm}`;
function pgf(d) {
  return d.match(/[MLCZ][^MLCZ]*/g).map(s => {
    const n = (s.slice(1).match(/-?[\d.]+/g) || []).map(Number), p = [];
    for (let i = 0; i < n.length; i += 2) p.push(pt(n[i], n[i + 1]));
    return { M: () => `\\pgfpathmoveto{${p[0]}}`, L: () => `\\pgfpathlineto{${p[0]}}`,
      C: () => `\\pgfpathcurveto{${p.join('}{')}}`, Z: () => '\\pgfpathclose' }[s[0]]();
  }).join('%\n');
}
const fill = '\\pgfusepath{fill}%\n';
const mark = pgf(BRAIN_D) + fill + pgf(RAYS_D) + fill, word = pgf(WORD_D) + fill;
const logo = `% GENERADO por docs/libros/arte/desde_app.js: no editar a mano.
% \\zukamark[color]{alto}: el cerebro; \\zukahor: cerebro y palabra en fila; \\zukaver: la palabra debajo.
\\newcommand{\\zuka@dibmark}{${mark}}
\\newcommand{\\zuka@dibword}{${word}}
\\newcommand{\\zuka@logo}[3]{\\resizebox{!}{#2}{\\color{#1}\\begin{pgfpicture}\\color{#1}#3\\end{pgfpicture}}}
\\newcommand{\\zukamark}[2][zink]{\\zuka@logo{#1}{#2}{\\zuka@dibmark}}
\\newcommand{\\zukaver}[2][zink]{\\zuka@logo{#1}{#2}{\\zuka@dibmark\\zuka@dibword}}
\\newcommand{\\zukahor}[2][zink]{\\zuka@logo{#1}{#2}{\\zuka@dibmark
  \\begin{pgfscope}\\pgftransformshift{\\pgfpoint{54mm}{123.8mm}}\\pgftransformscale{2}\\zuka@dibword\\end{pgfscope}}}
`;
fs.writeFileSync(path.join(TEX, 'zuka-logo.tex'), logo);

// ---- rutas e ideas ----
const files = fs.readdirSync(path.join(ROOT, 'js')).filter(f => /^explora-pu-/.test(f)).map(f => 'js/' + f);
const X = get(loadScripts(['js/explora.js', 'js/explora-numeros.js', 'js/explora-escenas.js', ...files]), 'EXPLORA');
const { tex } = require('./texto');
const out = ['% GENERADO por docs/libros/arte/desde_app.js desde js/explora-pu-*.js: no editar a mano.'];
for (const id of Object.keys(X)) {
  const l = X[id];
  out.push(`\\rutade{${id}}{${l.caps.map(c => `{${tex(c)}}`).join(',')}}`);
  out.push(`\\andamiode{${id}}{${l.pasos.filter(p => p.tipo === 'muestra').map(p => `\\item ${tex(p.idea)}`).join('\n  ')}}`);
}
fs.writeFileSync(path.join(TEX, 'explora-rl.tex'), out.join('\n') + '\n');
console.log(`zuka-logo.tex y explora-rl.tex (${Object.keys(X).length} lecciones)`);
