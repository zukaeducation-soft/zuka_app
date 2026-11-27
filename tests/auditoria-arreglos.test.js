// Arreglos de la auditoría del 2026-11-26 (docs/auditoria-2026-11-26.md, hallazgos 2 a 5).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

// ---------- 2. Tema claro: los mensajes de estado se leen ----------
const css = read('css/styles.css');
const block = sel => (css.match(new RegExp(sel.replace(/[.#[\]=":*()]/g, '\\$&') + '\\s*\\{([^}]*)\\}')) || [])[1] || '';
const dark = block(':root'), light = block(':root[data-theme="light"]');
const v = (b, name) => ((b.match(new RegExp(`${name}:\\s*([^;]+);`)) || [])[1] || '').trim();
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lum = c => { const [r, g, b] = c.map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const razon = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mezcla = (a, b, t) => a.map((x, i) => Math.round(x * t + b[i] * (1 - t)));
const TINTAS = { ok: '--fb-ok', bad: '--fb-bad', gold: null, fire: null };

test('cada color de estado tiene su tinta de texto, en los dos temas', () => {
  for (const k of Object.keys(TINTAS)) for (const b of [dark, light]) assert.match(v(b, `--${k}-ink`), /^#[0-9a-f]{6}$/i, `--${k}-ink`);
});

test('tema claro: la tinta de estado contrasta 4.5 o más sobre el fondo, la tarjeta, su aviso y su píldora', () => {
  const fondo = rgb(v(light, '--bg')), tarjeta = rgb(v(light, '--card'));
  for (const [k, fb] of Object.entries(TINTAS)) {
    const tinta = rgb(v(light, `--${k}-ink`)), pildora = mezcla(rgb(v(light, `--${k}`)), tarjeta, 0.2);
    const sobre = { fondo, tarjeta, pildora, ...(fb ? { aviso: rgb(v(light, fb)) } : {}) };
    for (const [n, c] of Object.entries(sobre)) assert.ok(razon(tinta, c) >= 4.5, `--${k}-ink sobre ${n}: ${razon(tinta, c).toFixed(2)}`);
  }
});

test('tema oscuro: la tinta de estado sigue contrastando', () => {
  for (const k of Object.keys(TINTAS)) assert.ok(razon(rgb(v(dark, `--${k}-ink`)), rgb(v(dark, '--bg'))) >= 4.5, k);
});

test('los textos de acierto, error y plan usan la tinta y no el color de relleno', () => {
  const reglas = f => [...read(f).replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({ sel: m[1].trim(), body: m[2] }));
  const color = (f, sel) => { const r = reglas(f).find(x => x.sel === sel); assert.ok(r, `${f}: ${sel}`); return (r.body.match(/(?:^|[;\s])color:\s*([^;]+)/) || [])[1]; };
  const casos = [
    ['css/styles.css', '.feedback.ok h4', 'ok'], ['css/styles.css', '.feedback.bad h4', 'bad'],
    ['css/styles.css', '.pill.ok', 'ok'], ['css/styles.css', '.pill.bad', 'bad'], ['css/styles.css', '.pill.warn', 'gold'],
    ['css/styles.css', '.form-msg.ok', 'ok'], ['css/styles.css', '.form-msg.bad', 'bad'], ['css/styles.css', '.plan-facts dd.warn', 'fire'],
    ['css/styles.css', '.ds.xp b', 'gold'], ['css/styles.css', '.ds.acc b', 'ok'], ['css/styles.css', '.streak-up', 'fire'],
    ['css/styles.css', '.canje-check', 'ok'], ['css/styles.css', '.er-timeup', 'bad'],
    ['css/acceso.css', '.plan-cursos .warn', 'fire'], ['css/acceso.css', '.tu-ok', 'ok'],
  ];
  for (const [f, sel, k] of casos) assert.match(color(f, sel) || '', new RegExp(`var\\(--${k}-ink\\)`), `${f}: ${sel}`);
});

// ---------- Seguridad (threat model 2026-11-26) ----------
test('el servidor local solo atiende a este computador y nunca entrega archivos de llaves', () => {
  const src = read('tools/servir.js');
  assert.match(src, /process\.argv\.includes\('--red'\) \? '0\.0\.0\.0' : '127\.0\.0\.1'/);
  assert.match(src, /\.listen\(PORT, HOST,/);
  assert.match(src, /startsWith\(ROOT \+ path\.sep\)/);
  const secreto = new RegExp(src.match(/const SECRETO = \/(.+)\/i;/)[1], 'i');
  for (const r of ['/gemini api keys.txt', '/.env', '/x/api-key.txt', '/secretos.json']) assert.ok(secreto.test(r), r);
  for (const r of ['/index.html', '/js/paquetes/zuka-1.js', '/css/styles.css', '/js/clave.js']) assert.ok(!secreto.test(r), r);
});

test('los informes de amenazas no van al repositorio ni a la web', () => {
  assert.match(read('.gitignore'), /^threat-model\/$/m);
  assert.match(read('.vercelignore'), /^\/threat-model$/m);
});

test('las funciones viejas que cualquier sesión podía llamar se borran en una migración', () => {
  const sql = fs.readdirSync(path.join(ROOT, 'supabase/migrations')).map(f => read('supabase/migrations/' + f)).join('\n');
  for (const f of ['add_xp(integer)', 'merge_xp(integer)', 'delete_account()', 'reset_progress()', 'handle_new_user()']) assert.ok(sql.includes('drop function if exists public.' + f), f);
  assert.match(sql, /drop trigger if exists on_auth_user_created on auth\.users/);
});

// ---------- 3. Service worker: lo del CDN no se pierde al cambiar de versión ----------
function loadSW(guardado = {}, add = async () => {}) {
  const listeners = {}, borradas = [], pedidos = [];
  const tiendas = new Map(Object.entries(guardado).map(([k, o]) => [k, new Map(Object.entries(o))]));
  const abre = name => {
    if (!tiendas.has(name)) tiendas.set(name, new Map());
    const m = tiendas.get(name);
    return {
      match: async u => m.get(u), put: async (u, r) => { m.set(u, r); }, addAll: async l => l.forEach(u => m.set(u, 'RED')),
      // `add` y `pedidos` son del CDN: los paquetes propios (js/paquetes) llegan siempre.
      add: async u => { if (u.startsWith('https:')) { pedidos.push(u); await add(u); } m.set(u, 'RED'); },
    };
  };
  const ctx = vm.createContext({
    self: { addEventListener: (t, fn) => { listeners[t] = fn; }, location: { origin: 'https://zuka.example', search: '' }, clients: { claim: async () => {} } },
    URL, console, Response: { error: () => 'ERROR' }, setTimeout: fn => setImmediate(fn), clearTimeout() {}, fetch: async () => ({ ok: true, clone: () => ({}) }),
    caches: {
      open: async n => abre(n), keys: async () => [...tiendas.keys()], delete: async k => { borradas.push(k); tiendas.delete(k); },
      match: async u => { for (const m of tiendas.values()) if (m.has(u)) return m.get(u); },
    },
  });
  vm.runInContext(read('sw.js'), ctx, { filename: 'sw.js' });
  const corre = async t => { let p; listeners[t]({ waitUntil: x => { p = x; } }); await p; };
  return { ctx, tiendas, borradas, pedidos, corre, cdn: vm.runInContext('CDN', ctx), version: vm.runInContext('VERSION', ctx), nombre: vm.runInContext('CDN_CACHE', ctx) };
}

test('las librerías de CDN van en su propia caché y activar una versión no la borra', async () => {
  const sw = loadSW({ 'zuka-v1': {}, 'zuka-voz-v2': {} });
  assert.notEqual(sw.nombre, sw.version);
  await sw.corre('install');
  for (const u of sw.cdn) assert.ok(sw.tiendas.get(sw.nombre).has(u), u);
  await sw.corre('activate');
  assert.deepEqual(sw.borradas, ['zuka-v1']);
});

test('con el CDN caído, la versión nueva conserva las copias que ya tenía la anterior', async () => {
  const viejo = Object.fromEntries(loadSW().cdn.map(u => [u, 'COPIA']));
  const sw = loadSW({ 'zuka-v1': viejo }, async () => { throw new Error('CDN caído'); });
  await sw.corre('install'); await sw.corre('activate');
  assert.ok(!sw.tiendas.has('zuka-v1'));
  for (const u of sw.cdn) assert.equal(sw.tiendas.get(sw.nombre).get(u), 'COPIA', u);
});

test('lo que ya está guardado del CDN no se vuelve a pedir', async () => {
  const base = loadSW();
  const sw = loadSW({ [base.nombre]: Object.fromEntries(base.cdn.map(u => [u, 'COPIA'])) });
  await sw.corre('install');
  assert.deepEqual(sw.pedidos, []);
});

// ---------- 4. hls.js: un fallo de carga no deja los videos sin reproductor ----------
test('si hls.js no carga, la siguiente vez se intenta de nuevo', async () => {
  const src = read('js/player.js').match(/let hlsLib = null;\nfunction loadHls\(\) \{[\s\S]*?\n\}/)[0];
  const scripts = [];
  const ctx = vm.createContext({ window: {}, document: { createElement: () => ({}), head: { appendChild: s => scripts.push(s) } } });
  vm.runInContext(src, ctx);
  const uno = vm.runInContext('loadHls()', ctx);
  scripts[0].onerror(new Error('sin red'));
  await assert.rejects(uno);
  const dos = vm.runInContext('loadHls()', ctx);
  assert.equal(scripts.length, 2, 'no volvió a pedir el script');
  ctx.window.Hls = 'HLS'; scripts[1].onload();
  assert.equal(await dos, 'HLS');
});

// ---------- 5. Dos pestañas: lo que guardó la otra no se pisa ----------
const junta = get(loadScripts(['js/estado.js']), 'estadoJunta');
const pestana = o => ({ done: {}, secs: {}, cuenta: { uid: 'u1' }, xp: 0, ...o });

test('lo que guardó otra pestaña se junta con lo de esta', () => {
  const s = pestana({ done: { a: true }, secs: { a: 30, b: 5 }, xp: 10, theme: 'dark' });
  assert.equal(junta(s, pestana({ done: { b: true }, secs: { b: 90 }, xp: 40, theme: 'light' })), true);
  assert.equal(JSON.stringify(s.done), '{"a":true,"b":true}');
  assert.equal(JSON.stringify(s.secs), '{"a":30,"b":90}');
  assert.equal(s.xp, 40);
  assert.equal(s.theme, 'dark', 'las preferencias de esta pestaña no cambian');
});

test('si la otra pestaña reinició el progreso después, manda ese reinicio', () => {
  const s = pestana({ done: { a: true }, secs: { a: 30 }, xp: 90, reinicio: 1 });
  junta(s, pestana({ done: {}, secs: {}, xp: 0, reinicio: 2 }));
  assert.equal(JSON.stringify(s.done), '{}'); assert.equal(s.xp, 0); assert.equal(s.reinicio, 2);
  const t = pestana({ done: {}, xp: 0, reinicio: 2 });
  junta(t, pestana({ done: { a: true }, xp: 90, reinicio: 1 }));
  assert.equal(JSON.stringify(t.done), '{}'); assert.equal(t.xp, 0);
});

test('el avance de otra cuenta no se junta', () => {
  const s = pestana({ done: { a: true }, xp: 10 });
  assert.equal(junta(s, pestana({ cuenta: { uid: 'u2' }, done: { z: true }, xp: 500 })), false);
  assert.equal(JSON.stringify(s.done), '{"a":true}'); assert.equal(s.xp, 10);
  assert.equal(junta(s, null), false);
});

test('reiniciar en otra pestaña también borra aquí el gimnasio y la última lección', () => {
  const s = pestana({ done: { a: true }, gym: { g: { best: 3 } }, lastLesson: 'alg-1', misCursos: ['trig'], reinicio: 1 });
  junta(s, pestana({ reinicio: 2 }));
  assert.equal(s.gym, undefined); assert.equal(s.lastLesson, undefined); assert.equal(s.misCursos, undefined);
});

// La pestaña recibe el evento «storage» de verdad: filtra por clave, junta y no cuenta dos veces el uso.
function conVentana() {
  const oyentes = {};
  const window = { addEventListener: (t, fn) => { oyentes[t] = fn; } };
  const ctx = vm.createContext({ window, console, setInterval() {}, clearTimeout() {}, setTimeout() {} });
  vm.runInContext("var KEY = 'zuka-v1'; var S = { done: { a: true }, secs: {}, cuenta: { uid: 'u1' }, xp: 10, answered: 100, correct: 80 }; var uso = { ans: 100, ok: 80 };", ctx);
  vm.runInContext(read('js/estado.js'), ctx, { filename: 'js/estado.js' });
  return { ctx, emite: (key, o) => oyentes.storage({ key, newValue: o && JSON.stringify(o) }), lee: e => vm.runInContext(e, ctx) };
}
const otra = o => ({ done: {}, secs: {}, cuenta: { uid: 'u1' }, ...o });

test('la app junta lo que guardó otra pestaña, y solo lo de su clave', () => {
  const v = conVentana();
  v.emite('otra-clave', otra({ done: { z: true }, xp: 99 }));
  v.emite('zuka-v1', null);
  assert.equal(v.lee('JSON.stringify(S.done)'), '{"a":true}');
  v.emite('zuka-v1', otra({ done: { b: true }, xp: 50 }));
  assert.equal(v.lee('JSON.stringify(S.done)'), '{"a":true,"b":true}');
  assert.equal(v.lee('S.xp'), 50);
});

test('lo respondido en la otra pestaña no se reporta otra vez como uso de esta', () => {
  const v = conVentana();
  v.emite('zuka-v1', otra({ answered: 105, correct: 84 }));
  assert.equal(v.lee('S.answered - uso.ans'), 0);
  assert.equal(v.lee('S.correct - uso.ok'), 0);
});

test('una copia opaca vieja del CDN no pasa a la caché nueva', async () => {
  const base = loadSW();
  const sw = loadSW({ 'zuka-v1': Object.fromEntries(base.cdn.map(u => [u, { type: 'opaque' }])) }, async () => { throw new Error('CDN caído'); });
  await sw.corre('install');
  for (const u of sw.cdn) assert.ok(!sw.tiendas.get(sw.nombre).has(u), u);
});
