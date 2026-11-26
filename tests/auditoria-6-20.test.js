// Auditoría del 2026-11-26 (docs/auditoria-2026-11-26.md), hallazgos 6 y 14 a 20.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

// ---------- 6. Las pantallas completas aíslan lo que tapan ----------
// Página de mentira: elementos con inert, clase y foco, lo justo para tapaSync.
function pagina({ abierta = false, entrada = false } = {}) {
  const el = id => ({ id, inert: false, tabIndex: 0, clases: new Set(), focos: 0, classList: { contains(c) { return this.de.clases.has(c); } }, contains(x) { return x === this; }, focus() { this.focos++; doc.activeElement = this; } });
  const els = {}; for (const id of ['topbar', 'view', 'tabbar', 'overlay']) { els[id] = el(id); els[id].classList.de = els[id]; }
  if (abierta) els.overlay.clases.add('open');
  if (entrada) { els.auth = el('auth'); els.auth.classList.de = els.auth; }
  const doc = { activeElement: null, querySelector: s => els[s.slice(1)] || null };
  return { doc, els };
}
const tapa = () => { const ctx = loadScripts(['js/tapa.js']); return { sync: get(ctx, 'tapaSync'), detras: get(ctx, 'tapaDetras') }; };

test('tapaDetras: la lección tapa la app; la entrada tapa también la lección', () => {
  const { detras } = tapa();
  assert.equal(detras(false, false).join(), '');
  assert.equal(detras(true, false).join(), '#topbar,#view,#tabbar');
  assert.equal(detras(false, true).join(), '#topbar,#view,#tabbar,#overlay');
});

test('al abrir una lección lo de atrás queda inerte y el foco entra; al cerrarla, vuelve', () => {
  const { sync } = tapa(), { doc, els } = pagina({ abierta: true });
  sync(doc);
  assert.ok(els.topbar.inert && els.view.inert && els.tabbar.inert && !els.overlay.inert);
  assert.equal(els.overlay.focos, 1); assert.equal(els.overlay.tabIndex, -1);
  sync(doc); assert.equal(els.overlay.focos, 1, 'no vuelve a robar el foco mientras sigue abierta');
  els.overlay.clases.delete('open'); sync(doc);
  assert.ok(!els.topbar.inert && !els.view.inert && !els.tabbar.inert);
});

test('la pantalla de entrada deja inerte también la lección, y no suelta lo que otro había tapado', () => {
  const { sync } = tapa(), { doc, els } = pagina({ entrada: true });
  els.view.inert = true;   // lo tapó otro (la presentación)
  sync(doc);
  assert.ok(els.topbar.inert && els.overlay.inert); assert.equal(els.auth.focos, 1);
  delete els.auth; sync(doc);
  assert.ok(!els.topbar.inert && !els.overlay.inert);
  assert.ok(els.view.inert, 'lo de otro sigue como estaba');
});

test('si otro suelta algo que la lección aún tapa, se vuelve a tapar', () => {
  const { sync } = tapa(), { doc, els } = pagina({ abierta: true });
  sync(doc); els.view.inert = false; sync(doc);
  assert.ok(els.view.inert);
  els.overlay.clases.delete('open'); sync(doc); assert.ok(!els.view.inert);
});

test('con una hoja encima (pantalla inerte) no se le quita el foco a la hoja', () => {
  const { sync } = tapa(), { doc, els } = pagina({ entrada: true });
  els.auth.inert = true; sync(doc);
  assert.equal(els.auth.focos, 0);
});

test('de la entrada se vuelve a la presentación: lo de atrás sigue tapado, ahora por ella', () => {
  const { sync } = tapa(), { doc, els } = pagina({ entrada: true });
  sync(doc); assert.ok(els.view.inert);
  delete els.auth; els.landing = { id: 'landing' };   // pzVolver: quita la entrada y abre la presentación, que tapa lo mismo
  sync(doc); assert.ok(els.topbar.inert && els.view.inert && els.overlay.inert, 'no se suelta lo que ahora tapa la presentación');
  delete els.landing; for (const k of ['topbar', 'view', 'tabbar', 'overlay']) els[k].inert = false;   // la presentación se cierra y suelta lo suyo
  sync(doc); assert.ok(!els.view.inert);
  els.overlay.clases.add('open'); sync(doc); assert.ok(els.view.inert, 'y la siguiente lección vuelve a tapar');
});

test('si una pantalla reemplaza a otra y el foco quedó en el aire, vuelve a entrar', () => {
  const { sync } = tapa(), { doc, els } = pagina({ abierta: true });
  sync(doc); assert.equal(els.overlay.focos, 1);
  doc.body = { id: 'body' }; doc.activeElement = doc.body;   // el botón enfocado se borró con la pantalla anterior
  sync(doc); assert.equal(els.overlay.focos, 2);
});

test('tapa.js viene con la app, vigila la página y el foco de la pantalla no se dibuja', () => {
  const idx = read('index.html'), src = read('js/tapa.js');
  assert.ok(idx.indexOf('js/app.js"') < idx.indexOf('js/tapa.js"') && idx.includes('js/tapa.js"'));
  assert.match(src, /new MutationObserver/);
  assert.match(src, /attributeFilter: \['class', 'inert'\]/);
  assert.match(read('css/styles.css'), /#overlay:focus, #auth:focus \{ outline: none; \}/);
});

test('tras comprobar, el foco pasa al botón de la retroalimentación (lección y gimnasio)', () => {
  for (const f of ['js/app.js', 'js/gimnasio.js']) assert.match(read(f), /root\.classList\.add\('fb-open'\);\n\s+\$\('\.btn', fb\)\.focus\(\{ preventScroll: true \}\);/, f);
});

test('los campos de la cuenta llevan su nombre accesible', () => {
  assert.match(read('js/cuenta.js'), /<input name="\$\{name\}" type="\$\{type\}" aria-label="\$\{label\}" \$\{extra\}>/);
});

// ---------- 14. La app abierta busca versiones nuevas ----------
test('al volver a primer plano se busca versión nueva, a lo sumo una vez por hora', async () => {
  const checkOnReturn = get(loadScripts(['js/update.js']), 'checkOnReturn');
  let t = 0, n = 0, oye = null;
  const doc = { visibilityState: 'visible', addEventListener: (k, f) => { assert.equal(k, 'visibilitychange'); oye = f; } };
  checkOnReturn({ update: () => { n++; return Promise.reject(new Error('sin red')); } }, doc, () => t);
  oye(); assert.equal(n, 0, 'recién cargada no hace falta');
  t = 3600001; doc.visibilityState = 'hidden'; oye(); assert.equal(n, 0, 'al esconderse no');
  doc.visibilityState = 'visible'; oye(); assert.equal(n, 1);
  t += 60000; oye(); assert.equal(n, 1, 'no antes de una hora');
  t += 3600000; oye(); assert.equal(n, 2);
  await new Promise(r => setTimeout(r, 5));   // el fallo de red no revienta
  assert.match(read('js/app.js'), /checkOnReturn\(reg\)/);
});

// ---------- 15. Errores en producción ----------
test('errorFicha: recorta, deja solo la ruta del archivo y descarta el ruido', () => {
  const ficha = get(loadScripts(['js/errores.js']), 'errorFicha');
  const f = ficha('TypeError: x is undefined ' + 'a'.repeat(400), 'https://zukaapp-mu.vercel.app/js/paquetes/zuka-2.js?v=3', 120);
  assert.equal(f.origen, '/js/paquetes/zuka-2.js'); assert.equal(f.linea, 120); assert.equal(f.mensaje.length, 300);
  assert.equal(ficha('Script error.', '', 0), null);
  assert.equal(ficha('ResizeObserver loop limit exceeded', 'https://x/a.js', 1), null);
  assert.equal(ficha('boom', 'chrome-extension://abc/x.js', 3), null, 'lo de extensiones no es nuestro');
  assert.equal(ficha('', 'https://x/a.js', 1), null);
  // Lo que el navegador cita de los datos y las consultas de las direcciones no viajan.
  const j = ficha('Unexpected token \'J\', "Juan Pérez Gómez, 3001234567" is not valid JSON', 'https://x/a.js', 1).mensaje;
  assert.ok(!j.includes('3001234567') && j.includes('is not valid JSON'), j);
  assert.ok(!ficha('Failed to fetch https://x.supabase.co/rest/v1/y?token=abc123&z=1 now', '', 0).mensaje.includes('abc123'));
});

test('errorManda: cada error una vez, pocos por sesión y solo con sesión en línea', () => {
  const ctx = loadScripts(['js/errores.js']), manda = get(ctx, 'errorManda'), ficha = get(ctx, 'errorFicha');
  const idos = [], sb = { rpc: (n, a) => { idos.push([n, a.p.mensaje]); return Promise.resolve({}); } };
  const con = { sb, user: { id: 'u' } };
  manda(ficha('uno', 'https://x/a.js', 1), con); manda(ficha('uno', 'https://x/a.js', 1), con);
  assert.equal(idos.join(), 'registrar_error,uno');
  manda(ficha('dos', 'https://x/a.js', 1), { sb, user: null }); manda(ficha('tres', 'https://x/a.js', 1), { sb, user: { id: 'u', offline: true } });
  assert.equal(idos.length, 1, 'sin sesión o sin red no se manda');
  for (let i = 0; i < 20; i++) manda(ficha('e' + i, 'https://x/a.js', 1), con);
  assert.ok(idos.length <= 5, 'tope por sesión');
  manda(null, con);
  manda(ficha('sin cuenta todavía', 'https://x/a.js', 1));   // en el arranque `Cuenta` no existe: no revienta
});

test('errores.js viene con la app y escucha los dos tipos de fallo; la base los recibe con tope', () => {
  const src = read('js/errores.js');
  assert.ok(read('index.html').includes('js/errores.js"'));
  assert.match(src, /addEventListener\('error'/); assert.match(src, /addEventListener\('unhandledrejection'/);
  const sql = fs.readdirSync(path.join(ROOT, 'supabase/migrations')).map(f => read('supabase/migrations/' + f)).join('\n');
  assert.match(sql, /create table public\.errores_app/);
  assert.match(sql, /alter table public\.errores_app enable row level security/);
  assert.match(sql, /grant execute on function privado\.registrar_error\(jsonb\), public\.registrar_error\(jsonb\) to authenticated;/);
  assert.match(sql, /interval '1 day'\) >= 20/, 'tope por estudiante');
});

test('si no se puede guardar el avance, se avisa una sola vez', () => {
  const app = read('js/app.js'), i = app.indexOf('function save()'), fn = app.slice(i, app.indexOf('\n}', i) + 2);
  const avisos = [], ctx = { S: {}, KEY: 'k', localStorage: { setItem() { throw new Error('QuotaExceededError'); } }, toast: t => avisos.push(t) };
  require('vm').runInNewContext(`let saveFallo = false;\n${fn}\nsave(); save(); save();`, ctx);
  assert.equal(avisos.length, 1); assert.match(avisos[0], /No se pudo guardar/);
});

// ---------- 16. Lienzos con nombre y barra de video con teclado ----------
test('el lienzo de un juego lleva el enunciado como nombre', () => {
  assert.match(read('js/games/kit.js'), /cv\.setAttribute\('aria-label', host\.dataset\?\.label \|\| /);
  assert.match(read('js/exercises.js'), /stage\.dataset\.label = /);
  const leido = get(loadScripts(['js/exercises.js']), 'texLeido');
  assert.equal(leido('Ubica $\\tfrac{3}{4}$ y $\\frac{1}{2}\\,$ en la recta'), 'Ubica 3 sobre 4 y 1 sobre 2 en la recta');
  assert.equal(leido('Gira hasta $\\operatorname{sen}\\theta$'), 'Gira hasta sen');
});

test('la barra del video responde a flechas, Inicio y Fin', () => {
  const seekKey = get(loadScripts(['js/ui.js', 'js/player.js']), 'seekKey');
  assert.equal(seekKey('ArrowRight', 10, 100), 15); assert.equal(seekKey('ArrowLeft', 3, 100), 0);
  assert.equal(seekKey('ArrowRight', 98, 100), 100); assert.equal(seekKey('Home', 50, 100), 0); assert.equal(seekKey('End', 50, 100), 100);
  assert.equal(seekKey('a', 50, 100), null); assert.equal(seekKey('ArrowRight', 5, 0), null, 'sin duración no hay a dónde ir');
  const src = read('js/player.js');
  assert.match(src, /role="slider" tabindex="0" aria-label="Posición del video" aria-valuemin="0"/);
  assert.match(src, /aria-valuetext/);
  assert.match(src, /seekKey\(e\.key, api\.time\(\), api\.duration\(\)\)[\s\S]{0,200}e\.stopPropagation\(\)/, 'la flecha no cambia de ejercicio');
});

// ---------- 17. Zona táctil y letra mínima ----------
test('ninguna letra de la app baja de 12 px y los botones pequeños tienen zona táctil de 44', () => {
  const css = read('css/styles.css');
  // .tv-skip es el rótulo de una pantalla en miniatura dibujada en el recorrido (aria-hidden): no es texto de la interfaz.
  const chicas = [...css.replace(/^\.tv-skip .*$/m, '').matchAll(/font-size: (\d+(?:\.\d+)?)px/g)].map(m => +m[1]).filter(n => n < 12);
  assert.equal(chicas.length, 0, `quedan ${chicas.length}: ${[...new Set(chicas)].join(', ')}`);
  assert.match(css, /\.icon-btn::after, \.hint-btn::after, button\.tb-stat::after \{[^}]*width: max\(100%, 44px\); height: max\(100%, 44px\)/);
});

// ---------- 18. El panel pregunta antes de lo que no tiene vuelta fácil ----------
test('publicar un curso, descartar una solicitud y liberar un dispositivo piden confirmación', () => {
  const p = read('admin/panel.js');
  assert.match(p, /i\.checked && !await confirma\(\{ titulo: `¿Publicar /);
  assert.match(p, /if \(await confirma\(\{ titulo: '¿Descartar la solicitud\?'[^\n]+solicitud_estado/);
  assert.match(p, /if \(await confirma\(\{ titulo: '¿Liberar este dispositivo\?'[^\n]+dispositivos_borrar/);
});

// ---------- 19. Sin vidas: salida al gimnasio ----------
test('«Te quedaste sin vidas» lleva al gimnasio', () => {
  const app = read('js/app.js'), i = app.indexOf('function outOfHearts()'), fn = app.slice(i, i + 900);
  assert.match(fn, /data-gym>Ir al gimnasio<\/button>/);
  assert.match(fn, /\[data-gym\]', body\)\.onclick = \(\) => close\('gym'\)/);
});

// ---------- 20. Importar el empaquetador no escribe nada ----------
test('tools/empaquetar.js solo escribe cuando se corre, no al importarlo', () => {
  const src = read('tools/empaquetar.js'), i = src.indexOf('if (require.main === module)');
  assert.ok(i > 0);
  assert.ok(!/writeFileSync/.test(src.slice(0, i)), 'nada se escribe fuera del bloque principal');
  assert.match(src, /if \(require\.main === module\) \{\n  const f = require\('fs'\)[\s\S]+instituciones\/cuentas\.js[\s\S]+instituciones\/banco\.json/);
  assert.equal(src.split('if (require.main === module)').length, 3);
});
