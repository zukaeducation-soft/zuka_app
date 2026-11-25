// Narración en Bunny Storage (spec 2026-11-24-voz-en-bunny): nombres que salen del contenido, la app solo pide lo publicado,
// el service worker lo guarda y poda lo que ya no se usa, y un audio que no carga no atropella la lectura.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT } = require('./load');
const { paquete, leeVoces, escribeVoces, CDN } = require('../tools/subir-voz');

const lee = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const src = lee('js/explora.js');
const voces = leeVoces(lee('js/explora-voces.js'));

test('los nombres salen del contenido: otro audio es otro nombre y otra lista', () => {
  const man = { Hola: { f: 'a.m4a', d: 1.2 }, Adiós: { f: 'b.m4a', d: 2 } };
  const A = paquete(man, f => Buffer.from('audio ' + f));
  const A2 = paquete(man, f => Buffer.from('audio ' + f));
  const B = paquete(man, f => Buffer.from(f === 'a.m4a' ? 'otra toma' : 'audio ' + f));
  assert.equal(A.lista.nombre, A2.lista.nombre);
  assert.notEqual(A.lista.nombre, B.lista.nombre);
  const a = JSON.parse(A.lista.datos), b = JSON.parse(B.lista.datos);
  assert.notEqual(a.Hola.f, b.Hola.f);
  assert.equal(a['Adiós'].f, b['Adiós'].f);
  assert.equal(a.Hola.d, 1.2);
});

test('no se publica un audio vacío, perdido o sin duración', () => {
  assert.throws(() => paquete({ x: { f: 'a', d: 1 } }, () => null), /perdido/);
  assert.throws(() => paquete({ x: { f: 'a', d: 1 } }, () => Buffer.alloc(0)), /vacío/);
  assert.throws(() => paquete({ x: { f: 'a', d: 0 } }, () => Buffer.from('x')), /duración/);
  assert.throws(() => paquete({}, () => Buffer.from('x')), /vacía/);
});

test('js/explora-voces.js se lee y se escribe igual, y apunta a listas con huella', () => {
  assert.deepEqual(leeVoces(escribeVoces(voces)), voces);
  for (const [id, f] of Object.entries(voces)) {
    assert.match(f, /^voz-[0-9a-f]{12}\.json$/, id);
    assert.ok(fs.existsSync(path.join(ROOT, `js/explora-${id}.js`)), `${id} tiene explicación`);
  }
  assert.ok(voces['pu-cm-1'], 'la lección 1 está publicada');
});

test('la app lee de la misma zona a la que sube el script, y las listas cargan antes que el reproductor', () => {
  assert.equal(src.match(/const EXPLORA_VOZ = '([^']+)'/)[1], CDN);
  const html = lee('index.html');
  assert.ok(html.indexOf('js/explora-voces.js') > 0 && html.indexOf('js/explora-voces.js') < html.indexOf('"js/player.js"'));
  assert.ok(require('./load').shell().includes("'js/explora-voces.js'"));
});

test('xpVozFuentes: Bunny y, si falla, la copia propia; una lección sin narración no pide nada en producción', () => {
  const ctx = vm.createContext({ EXPLORA_VOCES: { 'pu-x': 'voz-abc.json' }, console });
  ctx.window = ctx;
  vm.runInContext(src.match(/const EXPLORA_VOZ = [^\n]+\n/)[0] + src.match(/function xpVozFuentes[\s\S]*?\n}/)[0], ctx);
  const f = (id, host) => vm.runInContext(`JSON.stringify(xpVozFuentes('${id}', '${host}'))`, ctx);
  assert.equal(f('pu-x', 'zuka.app'), JSON.stringify([[CDN + 'pu-x/', 'voz-abc.json'], ['media/voz/pu-x/', 'voz.json']]));
  assert.equal(f('pu-y', 'zuka.app'), '[]');
  assert.equal(f('pu-x', 'localhost'), JSON.stringify([['media/voz/pu-x/', 'voz.json'], [CDN + 'pu-x/', 'voz-abc.json']]), 'en localhost manda la toma local');
  assert.equal(f('pu-y', 'localhost'), JSON.stringify([['media/voz/pu-y/', 'voz.json']]), 'en localhost se oye lo que aún no se sube');
});

test('un audio que no carga o tarda no atropella la lectura ni se queda esperando', () => {
  assert.match(src, /cache\.delete\(url\); return null;/, 'un fallo se puede reintentar');
  assert.match(src, /XP_VOZ_PLAZO/, 'hay un plazo para que empiece a sonar');
  const m = src.slice(src.indexOf('XPD.muestra ='), src.indexOf('XPD.signos ='));
  assert.match(m, /if \(ok === false\) habla = null/, 'sin audio vuelve el tiempo de lectura');
  assert.match(src, /const f = pendiente; silencio\(\); f\?\.\(false\)/, 'callar a mitad de frase no deja la explicación colgada');
  assert.match(src, /j\?\.\[txt\] \? XS\.carga\(otra\[0\] \+ j\[txt\]\.f\)/, 'si un audio falla, la misma frase sale de la copia propia');
});

test('nada secreto en el script y los audios nuevos no van a GitHub', () => {
  const s = lee('tools/subir-voz.js');
  assert.match(s, /bunny_storage_key\.txt/);
  assert.ok(!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i.test(s + lee('js/explora-voces.js') + src), 'ninguna llave');
  const gi = lee('.gitignore');
  assert.ok(!/^!media\/voz\/\*\*\/\*\.m4a$/m.test(gi));
  assert.match(gi, /^media\/voz\/\*\/voz\.json$/m);
  assert.match(gi, /^!media\/voz\/pu-cm-1\/\*\.m4a$/m, 'la lección 1 queda de respaldo');
});

// ---------- Service worker ----------
function sw(guardado, red) {
  const L = {}, puestos = [], borrados = [];
  const c = {
    match: async r => guardado[r.url], keys: async () => Object.keys(guardado).map(url => ({ url })),
    put: async r => { puestos.push(r.url); }, delete: async r => { borrados.push(r.url); }, addAll: async () => {}, add: async () => {},
  };
  const ctx = vm.createContext({
    self: { addEventListener: (t, f) => { L[t] = f; }, location: { origin: 'https://zuka.example', search: '' } },
    URL, console, setTimeout, clearTimeout, Response: { error: () => 'ERROR' }, caches: { open: async () => c, match: async () => undefined }, fetch: red,
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx);
  return async url => {
    let res; const vivos = [];
    L.fetch({ request: { url, method: 'GET', mode: 'cors', headers: { has: () => false } }, respondWith: p => { res = p; }, waitUntil: p => vivos.push(p) });
    const r = await res; await Promise.all(vivos);
    return { r, puestos, borrados };
  };
}
const ok = j => { const r = { status: 200, ok: true, clone: () => r, json: async () => j }; return r; };

test('SW: un audio de Bunny guardado no vuelve a la red; uno nuevo se guarda', async () => {
  let n = 0;
  const pide = sw({ [CDN + 'pu-x/a.m4a']: 'AUDIO' }, async () => { n++; return ok({}); });
  assert.equal((await pide(CDN + 'pu-x/a.m4a')).r, 'AUDIO');
  assert.equal(n, 0);
  assert.ok((await pide(CDN + 'pu-x/b.m4a')).puestos.includes(CDN + 'pu-x/b.m4a'));
});

test('SW: al llegar una lista nueva se podan los audios viejos de esa lección, y solo de esa', async () => {
  const pide = sw({
    [CDN + 'pu-x/sigue.m4a']: 1, [CDN + 'pu-x/viejo.m4a']: 1, [CDN + 'pu-x/voz-1.json']: 1, [CDN + 'pu-xx/otra.m4a']: 1,
  }, async () => ok({ Hola: { f: 'sigue.m4a', d: 1 } }));
  const { borrados } = await pide(CDN + 'pu-x/voz-2.json');
  assert.deepEqual(borrados.sort(), [CDN + 'pu-x/viejo.m4a', CDN + 'pu-x/voz-1.json'].sort());
});

test('SW: un error de Bunny no se guarda y los videos de Bunny Stream siguen fuera', async () => {
  const pide = sw({}, async () => ({ status: 404, ok: false, clone() { return this; } }));
  assert.deepEqual((await pide(CDN + 'pu-x/c.m4a')).puestos, []);
  const L = sw({}, async () => ok({}));
  assert.equal((await L('https://vz-1a76d229-c83.b-cdn.net/x/720p/video.m3u8')).r, undefined);
});
