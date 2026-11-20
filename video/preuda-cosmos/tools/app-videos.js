// Escribe js/courses/preuda-videos.js a partir de video/preuda-cosmos/out/voz/bunny.json (lo llena tools/bunny.py al subir a Bunny):
// cada lección del Preuniversitario cuyo video ya terminó de codificarse recibe clip.bunny, clip.duration (la de Bunny) y escenas de
// respaldo que cuentan el mismo video (una por escena de la película: su nombre y sus rótulos).
// Uso: node video/preuda-cosmos/tools/app-videos.js   → imprime cuántas lecciones tienen video.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const FILMS = path.join(__dirname, '..', 'films');
const DB = path.join(__dirname, '..', 'out', 'voz', 'bunny.json');
const OUT = path.join(ROOT, 'js', 'courses', 'preuda-videos.js');

const db = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, 'utf8')) : {};
const cap = s => s.charAt(0) + s.slice(1).toLowerCase();
const rows = [];
for (const [film, e] of Object.entries(db)) {
  if (film.startsWith('_') || !e.guid || !e.length || !e.lesson) continue;
  const D = require(path.join(FILMS, `${film}.data.js`));
  const scenes = D.SCENES.map(s => {
    const text = s.caps.map(c => c.slice(2).filter(Boolean).join(': ')).join('. ').replace(/\s+/g, ' ').trim();
    const d = Math.min(12, Math.max(5, Math.round(text.split(' ').length / 2.6)));
    return [d, cap(s.name), text.endsWith('.') ? text : `${text}.`];
  });
  rows.push([e.lesson, { bunny: e.guid, duration: Math.round(e.length * 10) / 10, film, scenes }]);
}
rows.sort((a, b) => a[0].localeCompare(b[0]));
const body = rows.map(([id, v]) => `  ${JSON.stringify(id)}: ${JSON.stringify(v)},`).join('\n');
fs.writeFileSync(OUT, `// Videos del Preuniversitario ya subidos a Bunny (biblioteca 811556), con voz. GENERADO por
// video/preuda-cosmos/tools/app-videos.js desde out/voz/bunny.json: no editar a mano. Va después de preuda-razonamiento.js.
// Cada entrada: { bunny, duration (s, la que reporta Bunny), film, scenes: [[segundos, título, texto]] } (escenas de respaldo).
const PU_VIDEOS = {
${body}
};
(() => {
  const lessons = PU_RAZONAMIENTO.flatMap(u => u.lessons);
  for (const [id, v] of Object.entries(PU_VIDEOS)) {
    const l = lessons.find(l => l.id === id);
    if (l) l.clip = { bunny: v.bunny, duration: v.duration, scenes: v.scenes.map(([d, title, text]) => sc(d, text, { title })) };
  }
})();
`);
console.log(`${rows.length} lecciones con video de Bunny`);
