// Configuración para que la app sea rápida, segura y estable (spec 2026-11-24-configuracion-rapida-segura):
// el service worker abre desde la caché en producción, la narración se guarda aparte, Vercel manda cabeceras de
// seguridad con una política de contenido (CSP) que coincide con lo que la página carga, las librerías externas
// llevan su huella (SRI) y lo que no es la app no se publica.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { ROOT } = require('./load');

const lee = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = lee('index.html'), admin = lee('admin/index.html'), swSrc = lee('sw.js');

// Service worker con cachés por nombre, cada una con su registro de lo guardado.
function loadSW({ origin = 'https://zuka.example', search = '', fetch, guardado = {} } = {}) {
  const listeners = {}, puestos = [], borradas = [];
  const cacheDe = nombre => ({
    addAll: async () => {}, add: async () => {},
    match: async (req) => (guardado[nombre] || {})[typeof req === 'string' ? req : new URL(req.url).pathname],
    put: async (req) => { puestos.push([nombre, new URL(req.url).pathname]); },
  });
  const self = { addEventListener: (t, fn) => { listeners[t] = fn; }, location: { origin, search }, clients: { claim: async () => {} } };
  const ctx = vm.createContext({
    self, URL, console, setTimeout, clearTimeout, Response: { error: () => 'ERROR' },
    caches: {
      open: async n => cacheDe(n), match: async () => undefined,
      keys: async () => Object.keys(guardado), delete: async k => { borradas.push(k); },
    },
    fetch: fetch || (async () => ({ ok: true, clone: () => ({}), tag: 'RED' })),
  });
  vm.runInContext(swSrc, ctx, { filename: 'sw.js' });
  return { listeners, puestos, borradas, ctx, VERSION: vm.runInContext('VERSION', ctx) };
}
function fire(sw, url, mode = 'no-cors') {
  let res; const vivos = [];
  sw.listeners.fetch({
    request: { url, method: 'GET', mode, headers: { has: () => false } },
    respondWith: p => { res = p; }, waitUntil: p => vivos.push(p),
  });
  return { res, vivos };
}

test('producción: un archivo guardado sale de la caché sin tocar la red', async () => {
  let red = 0;
  const sw = loadSW({ fetch: async () => { red++; return { ok: true, clone: () => ({}) }; }, guardado: {} });
  sw.ctx.caches.open = async () => ({ match: async () => 'COPIA', put: async () => {} });
  assert.equal(await fire(sw, 'https://zuka.example/js/app.js').res, 'COPIA');
  assert.equal(await fire(sw, 'https://zuka.example/index.html?tab=gym', 'navigate').res, 'COPIA');
  assert.equal(red, 0, 'no se pide nada a la red');
});

test('producción: lo que no está guardado se pide a la red y se guarda en la caché de la versión', async () => {
  const sw = loadSW();
  const r = await fire(sw, 'https://zuka.example/css/nuevo.css').res;
  assert.equal(r.tag, 'RED');
  assert.deepEqual(sw.puestos, [[sw.VERSION, '/css/nuevo.css']]);
});

test('producción: una navegación a cualquier dirección abre el index.html guardado', async () => {
  const sw = loadSW({ fetch: async () => { throw new Error('sin red'); } });
  sw.ctx.caches.open = async () => ({ match: async req => (req === 'index.html' ? 'INDEX' : undefined), put: async () => {} });
  assert.equal(await fire(sw, 'https://zuka.example/?tab=clips', 'navigate').res, 'INDEX');
});

test('producción: sin copia y sin red responde error (no se queda colgado)', async () => {
  const sw = loadSW({ fetch: async () => { throw new Error('sin red'); } });
  assert.equal(await fire(sw, 'https://zuka.example/js/x.js').res, 'ERROR');
});

test('localhost: red primero, para ver los cambios al programar; con «?cache» se prueba el modo de producción', async () => {
  const red = { ok: true, clone: () => ({}), tag: 'RED' };
  const dev = loadSW({ origin: 'http://localhost:5173', fetch: async () => red });
  dev.ctx.caches.match = async () => 'COPIA';
  assert.equal(await fire(dev, 'http://localhost:5173/js/app.js').res, red);
  const prod = loadSW({ origin: 'http://localhost:5173', search: '?cache', fetch: async () => red });
  prod.ctx.caches.open = async () => ({ match: async () => 'COPIA', put: async () => {} });
  assert.equal(await fire(prod, 'http://localhost:5173/js/app.js').res, 'COPIA');
});

test('los videos propios, el panel y Supabase siguen sin pasar por la caché', () => {
  const sw = loadSW();
  for (const u of ['https://zuka.example/media/clips/abejas.mp4', 'https://zuka.example/admin/', 'https://x.supabase.co/rest/v1/perfiles']) {
    assert.equal(fire(sw, u).res, undefined, u);
  }
});

test('la narración se guarda en su propia caché: el audio sale de la copia y la lista se refresca por detrás', async () => {
  let red = 0;
  const voz = { '/media/voz/pu-cm-1/abc.m4a': 'AUDIO', '/media/voz/pu-cm-1/voz.json': 'LISTA' };
  const sw = loadSW({ fetch: async () => { red++; return { ok: true, status: 200, clone: () => ({}), tag: 'RED' }; }, guardado: { 'zuka-voz-v1': voz } });
  assert.equal(await fire(sw, 'https://zuka.example/media/voz/pu-cm-1/abc.m4a').res, 'AUDIO');
  assert.equal(red, 0, 'un audio guardado no vuelve a la red');
  const lista = fire(sw, 'https://zuka.example/media/voz/pu-cm-1/voz.json');
  assert.equal(await lista.res, 'LISTA');
  await Promise.all(lista.vivos);
  assert.equal(red, 1, 'la lista se refresca por detrás');
  const nuevo = await fire(sw, 'https://zuka.example/media/voz/pu-cm-2/def.m4a').res;
  assert.equal(nuevo.tag, 'RED');
  assert.ok(sw.puestos.some(([c, p]) => c === 'zuka-voz-v1' && p === '/media/voz/pu-cm-2/def.m4a'));
});

test('al activar una versión se borran las cachés viejas, pero no la de la narración', async () => {
  const sw = loadSW({ guardado: { 'zuka-v1': {}, 'zuka-voz-v1': {} } });
  let p; sw.listeners.activate({ waitUntil: x => { p = x; } }); await p;
  assert.deepEqual(sw.borradas, ['zuka-v1']);
});

// ---------- Librerías externas con huella ----------
const externos = doc => [...doc.matchAll(/<(script|link)\b[^>]*?(?:src|href)="(https:\/\/[^"]+)"[^>]*>/g)]
  .filter(m => m[1] === 'script' || /rel="stylesheet"/.test(m[0])).map(m => ({ tag: m[0], url: m[2] }));

test('cada script u hoja de estilo de un CDN lleva su huella (integrity) y crossorigin', () => {
  for (const [nombre, doc] of [['index.html', html], ['admin/index.html', admin]]) {
    for (const { tag, url } of externos(doc)) {
      if (/fonts\.googleapis\.com/.test(url)) continue;   // su CSS cambia según el navegador: no admite huella
      assert.match(tag, /integrity="sha384-[A-Za-z0-9+/=]{64}"/, `${nombre}: sin huella ${url}`);
      assert.match(tag, /crossorigin="anonymous"/, `${nombre}: sin crossorigin ${url}`);
    }
  }
  for (const f of ['js/player.js', 'js/games/kit.js']) assert.match(lee(f), /s\.integrity = /, `${f} carga su librería sin huella`);
});

test('el service worker guarda al instalarse las mismas direcciones externas que pide index.html', () => {
  const cdn = vm.runInContext('CDN', loadSW().ctx);
  for (const { url } of externos(html)) {
    if (/fonts\.googleapis\.com/.test(url)) continue;
    assert.ok(cdn.includes(url), `no se guarda ${url}`);
  }
  assert.ok(cdn.includes(lee('js/games/kit.js').match(/const P5_URL = '([^']+)'/)[1]), 'p5.js');
});

// ---------- Cabeceras de Vercel ----------
const vercel = JSON.parse(lee('vercel.json'));
const cabeceras = fuente => Object.fromEntries((vercel.headers.find(h => h.source === fuente) || { headers: [] }).headers.map(h => [h.key, h.value]));
const todas = cabeceras('/(.*)');
const csp = Object.fromEntries((todas['Content-Security-Policy'] || '').split(';').map(d => d.trim().split(/\s+/)).filter(d => d[0]).map(d => [d[0], d.slice(1)]));

test('Vercel manda las cabeceras de seguridad en todas las respuestas', () => {
  assert.equal(todas['X-Content-Type-Options'], 'nosniff');
  assert.equal(todas['X-Frame-Options'], 'SAMEORIGIN');
  assert.equal(todas['Referrer-Policy'], 'strict-origin-when-cross-origin');   // Bunny necesita el origen en Referer
  assert.match(todas['Permissions-Policy'], /camera=\(\)/);
  assert.deepEqual(csp['object-src'], ["'none'"]);
  assert.deepEqual(csp['base-uri'], ["'self'"]);
  assert.deepEqual(csp['frame-ancestors'], ["'self'"]);
  assert.ok(!csp['script-src'].includes("'unsafe-inline'") && !csp['script-src'].includes("'unsafe-eval'"), 'script-src sin unsafe-inline ni unsafe-eval');
});

test('la política de contenido permite cada script en línea de las páginas (por su huella)', () => {
  for (const [nombre, doc] of [['index.html', html], ['admin/index.html', admin]]) {
    for (const m of doc.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      // El navegador calcula la huella con finales de línea LF, esté como esté el archivo en el disco (Git en Windows).
      const h = `'sha256-${crypto.createHash('sha256').update(m[1].replace(/\r\n?/g, '\n')).digest('base64')}'`;
      assert.ok(csp['script-src'].includes(h), `${nombre}: un script en línea cambió; pon ${h} en script-src de vercel.json`);
    }
    assert.ok(!/<[a-z][^>]*\son[a-z]+="/i.test(doc), `${nombre}: los manejadores en línea (onclick="…") no pasan la política`);
  }
});

test('la política de contenido permite los servidores que la app usa', () => {
  const permite = (dir, url) => (csp[dir] || []).some(s => s === new URL(url).origin || (s.includes('*') && new RegExp('^' + s.replace(/\./g, '\\.').replace('*', '[^/]+') + '$').test(new URL(url).origin)));
  for (const { tag, url } of externos(html).concat(externos(admin))) {
    assert.ok(permite(tag.startsWith('<script') ? 'script-src' : 'style-src', url), url);
  }
  const acceso = lee('js/acceso.js').match(/SUPA_URL = '([^']+)'/)[1];
  assert.ok(permite('connect-src', acceso), 'Supabase');
  const content = lee('js/content.js');
  for (const host of content.match(/vz-[a-z0-9-]+\.b-cdn\.net/g)) {
    assert.ok(permite('media-src', 'https://' + host) && permite('connect-src', 'https://' + host), host);
  }
  assert.ok(permite('script-src', 'https://www.youtube.com/iframe_api') && permite('frame-src', 'https://www.youtube-nocookie.com/x'));
  // El service worker vuelve a pedir lo que guarda de los CDN: connect-src también los necesita.
  for (const u of vm.runInContext('CDN', loadSW().ctx)) assert.ok(permite('connect-src', u), u);
  assert.ok(csp['worker-src'].includes('blob:'), 'hls.js crea su trabajador desde un blob');
});

test('la narración se guarda un año en el navegador y sw.js nunca', () => {
  assert.match(cabeceras('/media/voz/(.*).m4a')['Cache-Control'], /max-age=31536000, immutable/);
  assert.match(cabeceras('/sw.js')['Cache-Control'], /no-cache/);
});

// ---------- Lo que se publica ----------
test('no se publica lo que no es la app, y nada de lo que la app carga queda fuera', () => {
  const fuera = lee('.vercelignore').split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  for (const d of ['/video', '/docs', '/tests', '/tools', '/supabase']) assert.ok(fuera.includes(d), `falta ${d}`);
  const shell = vm.runInContext('SHELL', loadSW().ctx);
  const tapa = f => fuera.some(p => (p.startsWith('/') ? ('/' + f).startsWith(p + '/') || '/' + f === p || (p.includes('*') && new RegExp('^' + p.replace(/\./g, '\\.').replace(/\*/g, '[^/]*') + '$').test('/' + f)) : false));
  for (const f of [...shell.filter(f => f !== './'), 'sw.js', 'vercel.json', 'admin/index.html', 'admin/admin.js', 'admin/admin.css', 'media/voz/pu-cm-1/voz.json']) {
    assert.ok(!tapa(f), `${f} quedaría sin publicar`);
  }
});

// Con caché primero, un archivo del shell que Vercel no tenga (404) impide instalar la versión nueva: nadie se actualiza.
test('cada archivo del shell está en Git (lo que no se sube, Vercel no lo tiene)', t => {
  let enGit;
  try { enGit = new Set(execFileSync('git', ['ls-files', '--cached', '--', 'index.html', 'manifest.json', 'css', 'js', 'icons', 'brand'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n')); }
  catch { return t.skip('sin git'); }
  const faltan = vm.runInContext('SHELL', loadSW().ctx).filter(f => f !== './' && !enGit.has(f));
  assert.equal(faltan.join(', '), '', 'haz git add de estos archivos antes de subir');
});

// ---------- La versión del service worker ----------
// Con caché primero, un cambio que se sube sin cambiar VERSION no le llega a nadie.
test('si cambió algún archivo del shell respecto a origin/main, VERSION también cambió', t => {
  let cambiados, vieja;
  try {
    const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    cambiados = git('diff', '--name-only', 'origin/main', '--', 'index.html', 'manifest.json', 'css', 'js', 'icons', 'brand').split('\n').filter(Boolean);
    vieja = git('show', 'origin/main:sw.js').match(/const VERSION = '([^']+)'/)[1];
  } catch { return t.skip('sin git o sin origin/main'); }
  const sw = loadSW();
  const shell = new Set(vm.runInContext('SHELL', sw.ctx));
  const tocados = cambiados.filter(f => shell.has(f));
  if (tocados.length) assert.notEqual(sw.VERSION, vieja, `cambió ${tocados.slice(0, 3).join(', ')}…: sube VERSION en sw.js`);
});
