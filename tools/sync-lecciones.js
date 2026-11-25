// Escribe el SQL que pone al día la tabla `lecciones` de Supabase con el contenido de la app.
// Uso: node tools/sync-lecciones.js > lecciones.sql   (y se corre en Supabase)
// Añade lo nuevo y actualiza tipo, curso, título, orden y videos. `prueba` es lo que abre un código
// de prueba. No borra filas.
const { loadScripts, get } = require('../tests/load');

// Los mismos archivos y en el mismo orden que carga la app: si falta uno, faltan sus lecciones o sus evaluaciones.
const html = require('fs').readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const deIndex = [...html.matchAll(/src="(js\/[^"]+\.js)"/g)].map(m => m[1]);
const ctx = loadScripts(['js/ui.js', 'js/worlds.js', 'js/content.js', 'js/curiosidades.js', 'js/acceso.js',
  ...deIndex.filter(f => /^js\/(games\/(kit|formula|arma-la-cuenta|escala-solucion)\.js$|courses\/|data\.js$)/.test(f) && !/sin-escribir/.test(f))]);
const rows = get(ctx, 'catalogo(COURSES, CURIOS, summaryOf)');

const q = s => `'${String(s).replace(/'/g, "''")}'`;
const values = rows.map(r =>
  `(${q(r.id)}, ${q(r.tipo)}, ${q(r.curso)}, ${q(r.titulo)}, ${r.orden}, ${r.prueba}, array[${r.videos.map(q).join(', ')}]::text[])`);

process.stdout.write(`insert into public.lecciones (id, tipo, curso, titulo, orden, prueba, videos) values
${values.join(',\n')}
on conflict (id) do update set tipo = excluded.tipo, curso = excluded.curso, titulo = excluded.titulo,
  orden = excluded.orden, prueba = excluded.prueba, videos = excluded.videos;
`);
if (process.argv.includes('--resumen')) console.error(`${rows.length} filas`);
