// Arranque rápido (specs 2026-11-24-arranque-rapido y 2026-11-26-arranque-liviano): la app publicada no carga sus
// scripts sueltos sino en paquetes. Al abrir pide solo el ARRANQUE (núcleo y datos de los cursos); los juegos y las
// explicaciones van en un paquete por curso y uno común, que js/carga.js pide al abrir la primera lección. El nombre de
// cada paquete lleva la huella de su contenido y el service worker conserva los que no cambian entre versiones.
// index.html conserva la lista (dentro de <template id="fuentes">, que no se carga sola) y en localhost se cargan sueltos.
// Los paquetes se arman con «node tools/empaquetar.js» y tienen que estar al día.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT } = require('./load');
const { fuentes, plan, empaqueta, textoLista, textoSW, esDiferido, EN_ARRANQUE, PARTES, DIR, LISTA, huella } = require('../tools/empaquetar');
const { carga: cargaEnNode, declara } = require('../tools/juegos-en-uso');

const lee = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n?/g, '\n');
const html = lee('index.html');
const plantilla = html.match(/<template id="fuentes">([\s\S]*?)<\/template>/);
const { archivos, lista } = empaqueta();
const P = plan();
const DIFERIDOS = [lista.comun, ...Object.values(lista.cursos)];
const dentroDe = f => [...lee(f).matchAll(/^\/\/#archivo (\S+)/gm)].map(m => m[1]);

test('los paquetes están al día con los archivos de js/ (si falla: node tools/empaquetar.js)', () => {
  for (const [f, txt] of Object.entries(archivos)) {
    assert.ok(fs.existsSync(path.join(ROOT, f)), `falta ${f}: corre node tools/empaquetar.js`);
    assert.ok(lee(f) === txt, `${f} quedó viejo: corre node tools/empaquetar.js`);
  }
  assert.ok(lee(LISTA) === textoLista(lista), `${LISTA} quedó vieja: corre node tools/empaquetar.js`);
  assert.ok(lee('sw.js') === textoSW(lee('sw.js'), lista), 'la lista de paquetes de sw.js quedó vieja: corre node tools/empaquetar.js');
  const sobran = fs.readdirSync(path.join(ROOT, DIR)).filter(f => f !== 'lista.js' && !archivos[`${DIR}/${f}`]);
  assert.deepEqual(sobran, [], 'paquetes viejos en js/paquetes: corre node tools/empaquetar.js');
});

test('cada script propio de index.html va en un paquete, una sola vez; el arranque, en el mismo orden', () => {
  const todos = Object.keys(archivos).flatMap(dentroDe);
  assert.equal(new Set(todos).size, todos.length, 'un archivo repetido');
  assert.equal([...todos].sort().join('\n'), [...fuentes()].sort().join('\n'));
  assert.equal(lista.arranque.flatMap(dentroDe).join('\n'), fuentes().filter(f => !esDiferido(f)).join('\n'));
  assert.equal(lista.arranque.length, PARTES);
  assert.ok(todos.length > 600);
  // Dentro de cada paquete diferido se conserva el orden de index.html (un kit va antes que quien lo usa).
  const pos = Object.fromEntries(fuentes().map((f, i) => [f, i]));
  for (const f of DIFERIDOS) { const d = dentroDe(f).map(x => pos[x]); assert.deepEqual(d, [...d].sort((a, b) => a - b), f); }
});

test('el nombre de cada paquete lleva la huella de su contenido: si nada cambia, el nombre no cambia', () => {
  for (const [f, txt] of Object.entries(archivos)) {
    assert.match(f, /^js\/paquetes\/zuka-[a-z0-9]+\.[0-9a-f]{10}\.js$/);
    assert.ok(f.endsWith(`.${huella(txt)}.js`), f);
  }
  assert.notEqual(huella('a'), huella('b'));
  assert.equal(Object.keys(empaqueta().archivos).join(), Object.keys(archivos).join(), 'empaquetar dos veces da los mismos nombres');
});

test('cada paquete es JavaScript válido', () => {
  for (const f of Object.keys(archivos)) assert.doesNotThrow(() => new vm.Script(lee(f), { filename: f }));
});

test('ningún archivo empieza con «use strict» (en un paquete cambiaría el modo de los que le siguen)', () => {
  for (const f of fuentes()) assert.ok(!/^\s*(\/\/[^\n]*\n\s*)*['"]use strict['"]/.test(lee(f)), f);
});

test('ningún script de la app se carga solo: todos están dentro de la plantilla; fuera, solo la lista de paquetes', () => {
  assert.ok(plantilla, 'falta <template id="fuentes">');
  const fuera = html.replace(plantilla[0], '');
  assert.deepEqual([...fuera.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(m => m[1]), [LISTA]);
  assert.ok(fuera.indexOf(`<script src="${LISTA}">`) < fuera.indexOf('<script>'), 'la lista va antes del script que la lee');
  assert.ok([...plantilla[1].matchAll(/<script/g)].length === fuentes().length + 3, 'en la plantilla van los scripts propios y las tres librerías');
  assert.equal(fuentes()[fuentes().length - 1], 'js/carga.js', 'js/carga.js va de último: envuelve funciones que ya existen');
});

// ---- service worker ----
function sw({ guardado = {}, falla = () => false } = {}) {
  const listeners = {}, pedidos = [], borrados = [], borradas = [];
  const cacheDe = nombre => ({
    addAll: async l => { pedidos.push(...l.map(u => [nombre, u])); },
    add: async u => { if (falla(u)) throw new Error('sin red'); pedidos.push([nombre, u]); },
    match: async req => ((guardado[nombre] || []).includes(typeof req === 'string' ? req : new URL(req.url).pathname.slice(1)) ? 'COPIA' : undefined),
    put: async req => { pedidos.push([nombre, new URL(req.url).pathname.slice(1)]); },
    keys: async () => (guardado[nombre] || []).map(u => ({ url: `https://zuka.example/${u}` })),
    delete: async k => { borrados.push([nombre, new URL(k.url).pathname.slice(1)]); },
  });
  const self = { addEventListener: (t, fn) => { listeners[t] = fn; }, location: { origin: 'https://zuka.example', search: '' }, clients: { claim: async () => {} } };
  const ctx = vm.createContext({
    self, URL, console, setTimeout, clearTimeout, Response: { error: () => 'ERROR' },
    caches: { open: async n => cacheDe(n), match: async () => undefined, keys: async () => Object.keys(guardado), delete: async k => { borradas.push(k); } },
    fetch: async () => ({ ok: true, clone: () => ({}), red: true }),
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx, { filename: 'sw.js' });
  const corre = async (tipo, ev = {}) => { let p; listeners[tipo]({ ...ev, waitUntil: x => { p = x; } }); await p; };
  return { ctx, listeners, pedidos, borrados, borradas, corre, v: n => vm.runInContext(n, ctx) };
}

test('SW: la lista de paquetes de sw.js es la de la página, y el shell ya no lleva scripts sueltos', () => {
  const s = sw();
  assert.deepEqual([...s.v('ARRANQUE')], lista.arranque);
  assert.deepEqual([...s.v('DIFERIDOS')], DIFERIDOS);
  const shell = s.v('SHELL');
  assert.ok(shell.includes(LISTA), 'la lista de paquetes va con cada versión');
  assert.ok(shell.length < 60, `el shell tiene ${shell.length} archivos: debe ser corto para instalarse rápido`);
  assert.ok(!shell.some(f => /^js\/(?!paquetes\/lista\.js$)/.test(f)), 'un script suelto o un paquete en el shell: los paquetes van en su caché');
});

test('SW: al instalar guarda todos los paquetes en su propia caché; de una versión a otra solo baja los que cambiaron', async () => {
  const nuevo = sw();
  await nuevo.corre('install');
  const enPaq = nuevo.pedidos.filter(([c]) => c === nuevo.v('PAQUETES')).map(x => x[1]);
  assert.deepEqual(enPaq.sort(), [...lista.arranque, ...DIFERIDOS].sort());
  // Segunda versión: ya estaban todos menos uno.
  const quedan = [...lista.arranque, ...DIFERIDOS].filter(f => f !== lista.cursos.trig);
  const otra = sw({ guardado: { 'zuka-paquetes-v1': quedan } });
  await otra.corre('install');
  assert.deepEqual(otra.pedidos.filter(([c]) => c === 'zuka-paquetes-v1').map(x => x[1]), [lista.cursos.trig]);
});

test('SW: un paquete diferido que no llega no detiene la instalación; uno del arranque, sí', async () => {
  await assert.doesNotReject(sw({ falla: u => u === lista.cursos.preuda }).corre('install'));
  await assert.rejects(sw({ falla: u => u === lista.arranque[2] }).corre('install'));
});

test('SW: al activarse borra las cachés de versiones viejas, conserva la de paquetes y suelta solo los paquetes que ya no usa', async () => {
  const viejo = 'js/paquetes/zuka-comun.0123456789.js';
  const s = sw({ guardado: { 'zuka-v1': [], 'zuka-paquetes-v1': [lista.arranque[0], lista.comun, viejo], 'zuka-voz-v2': [], 'zuka-cdn-v1': [] } });
  await s.corre('activate');
  assert.deepEqual(s.borradas, ['zuka-v1']);
  assert.deepEqual(s.borrados, [['zuka-paquetes-v1', viejo]]);
});

test('SW: un paquete se sirve de su caché sin tocar la red, y si no está se pide y se guarda ahí', async () => {
  const pide = async (s, url) => { let r; s.listeners.fetch({ request: { url, method: 'GET', mode: 'no-cors', headers: { has: () => false } }, respondWith: p => { r = p; }, waitUntil() {} }); return r; };
  const con = sw({ guardado: { 'zuka-paquetes-v1': [lista.comun] } });
  assert.equal(await pide(con, `https://zuka.example/${lista.comun}`), 'COPIA');
  const sin = sw();
  assert.equal((await pide(sin, `https://zuka.example/${lista.cursos.algebra}`)).red, true);
  assert.deepEqual(sin.pedidos, [['zuka-paquetes-v1', lista.cursos.algebra]]);
  assert.equal(sin.v('esPaquete')('/js/paquetes/lista.js'), false, 'la lista no lleva huella: va con la versión');
});

test('Vercel: los paquetes con huella se guardan para siempre en el navegador; la lista, no', () => {
  const reglas = JSON.parse(lee('vercel.json')).headers.map(h => ({ re: new RegExp('^' + h.source + '$'), h: h.headers }));
  const cache = ruta => reglas.filter(r => r.re.test(ruta)).flatMap(r => r.h).filter(h => h.key === 'Cache-Control').map(h => h.value).pop();
  for (const f of Object.keys(archivos)) assert.match(cache('/' + f) || '', /immutable/, f);
  assert.equal(cache('/' + LISTA), 'no-cache', 'la lista se revalida siempre: no puede quedar una vieja con un index.html nuevo');
});

// ---- la página ----
// Los dos scripts de arranque de index.html (el de <head> y el cargador del final), corridos con una página de mentira.
function carga({ hostname, search = '', paquetes = lista }) {
  const puestos = [];
  const scripts = [...plantilla[1].matchAll(/<script defer src="([^"]+)"(?: integrity="([^"]+)")?/g)]
    .map(m => ({ getAttribute: a => (a === 'src' ? m[1] : a === 'integrity' ? m[2] || null : null) }));
  const document = {
    documentElement: { dataset: {} },
    getElementById: () => ({ content: { querySelectorAll: () => scripts } }),
    createElement: tag => ({ tag, style: {}, setAttribute() {}, addEventListener() {}, appendChild() {} }),
    head: { appendChild: s => puestos.push(s) }, body: { appendChild: d => { document.aviso = d; } },
  };
  const window = paquetes ? { ZUKA_PAQUETES: paquetes } : {}, guarda = { getItem: () => null, setItem() {} };
  const ctx = vm.createContext({
    document, window, location: { hostname, search, reload() {} }, localStorage: guarda, sessionStorage: guarda,
    matchMedia: () => ({ matches: false }), JSON,
  });
  const enLinea = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  vm.runInContext(enLinea[0], ctx);
  vm.runInContext(enLinea[enLinea.length - 1], ctx);
  return { scripts: puestos.filter(e => e.tag === 'script'), enlaces: puestos.filter(e => e.tag === 'link'), document, window };
}

test('publicada: tres librerías con su huella y los paquetes del arranque, en orden y sin async; ningún paquete de juegos', () => {
  const { scripts } = carga({ hostname: 'zuka.example' });
  assert.equal(scripts.length, 3 + PARTES);
  assert.ok(scripts.slice(0, 3).every(s => /^https:/.test(s.src) && /^sha384-/.test(s.integrity) && s.crossOrigin === 'anonymous'));
  assert.equal(scripts.slice(3).map(s => s.src).join(' '), lista.arranque.join(' '));
  assert.ok(scripts.every(s => s.async === false), 'async = false: se ejecutan en el orden de la lista');
  assert.ok(!scripts.some(s => DIFERIDOS.includes(s.src)));
});

test('publicada: los paquetes del arranque se piden desde el <head> (preload), sin esperar a las hojas de estilo', () => {
  const { enlaces } = carga({ hostname: 'zuka.example' });
  assert.equal(enlaces.filter(l => l.rel === 'preload' && l.as === 'script').map(l => l.href).join(' '), lista.arranque.join(' '));
  assert.equal(carga({ hostname: 'localhost' }).enlaces.filter(l => l.rel === 'preload').length, 0, 'en localhost no se piden');
});

test('la letra de Google no frena el primer pintado: la pide el script, no una etiqueta <link>', () => {
  assert.ok(!/<link rel="stylesheet" href="https:\/\/fonts\.googleapis/.test(html));
  const hoja = carga({ hostname: 'zuka.example' }).enlaces.filter(l => l.rel === 'stylesheet');
  assert.equal(hoja.length, 1);
  assert.match(hoja[0].href, /^https:\/\/fonts\.googleapis\.com\/css2\?family=Plus\+Jakarta\+Sans.*Jost.*display=swap$/);
});

test('en localhost se cargan los archivos sueltos; con «?paquetes», los paquetes', () => {
  const sueltos = carga({ hostname: 'localhost' }).scripts;
  assert.equal(sueltos.length, fuentes().length + 3);
  assert.equal(sueltos.slice(3).map(s => s.src).join('\n'), fuentes().join('\n'));
  assert.equal(carga({ hostname: 'localhost', search: '?paquetes' }).scripts.length, 3 + PARTES);
  assert.equal(carga({ hostname: 'localhost', search: '?v=2&paquetes' }).scripts.length, 3 + PARTES);
  assert.equal(carga({ hostname: 'zuka.localhost' }).scripts.length, 3 + PARTES, 'zuka.localhost prueba lo publicado');
  assert.equal(carga({ hostname: '[::1]' }).scripts.length, fuentes().length + 3);
});

test('si un paquete no llega, o no llega la lista, la app lo dice y ofrece reintentar (una librería externa que falla no la detiene)', () => {
  const { scripts, document, window } = carga({ hostname: 'zuka.example' });
  assert.equal(scripts[0].onerror, undefined);
  assert.equal(document.aviso, undefined);
  scripts[4].onerror();
  assert.equal(document.aviso.id, 'sin-cargar');
  assert.equal(window.zukaSinCargar, true);
  const sinLista = carga({ hostname: 'zuka.example', paquetes: null });
  assert.equal(sinLista.document.aviso.id, 'sin-cargar');
  assert.equal(carga({ hostname: 'localhost', paquetes: null }).document.aviso, undefined, 'en localhost la lista no hace falta');
});

// ---- el reparto ----
const KB = l => l.reduce((n, f) => n + archivos[f].length, 0) / 1024;

test('el arranque pesa la mitad que antes (9.75 MB) y no lleva juegos ni explicaciones, salvo los kits que usan los datos', () => {
  assert.ok(KB(lista.arranque) < 5300, `el arranque pesa ${KB(lista.arranque).toFixed(0)} KB`);
  const dentro = lista.arranque.flatMap(dentroDe).filter(f => f.startsWith('js/games/') || /^js\/explora/.test(f));
  assert.deepEqual(dentro.sort(), [...EN_ARRANQUE].sort());
  assert.ok(dentro.reduce((n, f) => n + lee(f).length, 0) < 300 * 1024, 'los kits del arranque pasan de 300 KB');
  assert.ok(KB(DIFERIDOS) > 2500, 'casi no quedó nada diferido');
});

test('hay un paquete por curso con juegos propios y uno común; ninguno pasa de 1 MB', () => {
  for (const c of ['algebra', 'trig', 'calc', 'preuda', 'preicfes']) assert.ok(lista.cursos[c], c);
  assert.ok(lista.comun);
  for (const f of DIFERIDOS) assert.ok(archivos[f].length < 1024 * 1024, `${f}: ${(archivos[f].length / 1024).toFixed(0)} KB`);
  assert.ok(KB([lista.comun]) < KB(DIFERIDOS) / 3, 'casi todo cayó en el común: el reparto por curso no está sirviendo');
});

// Carga en Node, archivo por archivo, lo que la página tendría con esos paquetes.
const enNode = grupos => cargaEnNode(grupos.flat(), () => false);
const corre = (c, js) => vm.runInContext(js, c.ctx);
const FOTO = n => `(() => { const v = typeof ${n} === 'undefined' ? undefined : ${n}, s = new Set(); return JSON.stringify(v, (k, x) => { if (x && typeof x === 'object') { if (s.has(x)) return '[rep]'; s.add(x); } return typeof x === 'function' ? 'fn' : x; }); })()`;
const completa = enNode([fuentes()]);
const soloArranque = enNode([P.arranque]);
const sinBoot = f => f.filter(x => !x.startsWith('js/app.js:'));   // app.js arranca la interfaz: en Node no hay página

test('el arranque solo, sin juegos ni explicaciones, carga sin errores y deja los mismos datos de los cursos', () => {
  assert.deepEqual(sinBoot(soloArranque.fallos), []);
  const datos = [...new Set(P.arranque.flatMap(f => declara(lee(f))))].filter(n => /^(COURSES|WORLDS|GUIDES|CURIOS|RESUMENES|CONCEPTOS|SIN_ESCRIBIR|(COURSE|GYM|PI|PU|TRIG|ALG|ICF|SIM)_\w+)$/.test(n));
  assert.ok(datos.length > 15 && datos.includes('COURSES') && datos.includes('GYM_RETOS'), datos.join(' '));
  for (const n of datos) assert.ok(corre(soloArranque, FOTO(n)) === corre(completa, FOTO(n)), `${n} cambia si faltan los juegos: su archivo necesita algo diferido al cargarse (EN_ARRANQUE, tools/empaquetar.js)`);
});

test('con el paquete común y el de su curso, cada curso tiene todos sus juegos y explicaciones, iguales a los de la app completa', () => {
  const firma = "g => { const G = GAMES[g]; return G ? Object.keys(G).sort().map(k => k + ':' + (typeof G[k] === 'function' ? String(G[k]).length : typeof G[k])).join() : 'FALTA'; }";
  const cursos = [...corre(completa, 'COURSES.map(c => c.id)')];
  let vistos = 0, explicadas = 0;
  assert.deepEqual(Object.keys(lista.cursos).filter(c => !cursos.includes(c)), []);
  for (const [i, c] of cursos.entries()) {
    const n = enNode([P.arranque, P.grupos.comun, P.grupos[c] || []]);
    assert.deepEqual(sinBoot(n.fallos), [], c);
    for (const a of P.paraArranque) assert.equal(corre(n, `typeof ${a}`), corre(completa, `typeof ${a}`), `${c}: falta ${a}, que el arranque usa`);
    // Lo que el curso usa: los juegos de sus lecciones, jefes, evaluaciones y retos de gimnasio, y sus explicaciones.
    const usa = `(() => { const c = COURSES[${i}], s = new Set(), v = new Set(), ids = new Set(c.units.flatMap(u => u.lessons.map(l => l.id)));
      const anda = x => { if (!x || typeof x !== 'object' || v.has(x)) return; v.add(x); if (typeof x.game === 'string') s.add(x.game); for (const k of Object.keys(x)) anda(x[k]); };
      anda(c); for (const r of GYM_RETOS) if (r.after.some(id => ids.has(id))) anda(r.steps);
      return JSON.stringify({ juegos: [...s], lecciones: [...ids] }); })()`;
    const { juegos, lecciones } = JSON.parse(corre(completa, usa));
    for (const g of juegos) assert.equal(corre(n, `(${firma})(${JSON.stringify(g)})`), corre(completa, `(${firma})(${JSON.stringify(g)})`), `${c}: el juego «${g}» falta o no es el mismo`);
    vistos += juegos.length;
    const expl = id => `(() => { const e = EXPLORA[${JSON.stringify(id)}]; if (!e) return 'no'; return JSON.stringify(e).length + ' ' + [...new Set(e.pasos.map(p => p.tipo))].sort().map(t => t + (XP[t] ? 1 : 0) + (XPD[t] ? 1 : 0)).join(); })()`;
    for (const id of lecciones) assert.equal(corre(n, expl(id)), corre(completa, expl(id)), `${c}: la explicación de ${id} falta o le falta una escena`);
    explicadas += lecciones.filter(id => corre(n, expl(id)) !== 'no').length;
  }
  assert.ok(vistos > 1300 && explicadas > 150, `solo se comprobaron ${vistos} juegos y ${explicadas} explicaciones`);
});

test('lo que el arranque usa de un archivo diferido (las tablas de «Comprobar» de rotula-mueve y marca-mueve) va en el común', () => {
  for (const a of ['XG.ROTULA', 'XG.ORDEN', 'XG.cadena']) assert.ok(P.paraArranque.includes(a), a);
  for (const f of ['js/games/rotula-mueve.js', 'js/games/marca-mueve.js']) assert.ok(P.grupos.comun.includes(f), f);
});

test('la lista dice qué lecciones tienen explicación interactiva (la app lo muestra antes de cargarlas)', () => {
  const ids = new Set(JSON.parse(corre(completa, 'JSON.stringify(COURSES.flatMap(c => c.units.flatMap(u => u.lessons.map(l => l.id))))')));
  assert.equal([...lista.explora].sort().join(), [...corre(completa, 'Object.keys(EXPLORA)')].filter(id => ids.has(id)).sort().join());
  assert.ok(lista.explora.length > 150);
  assert.match(lee('js/escritorio.js'), /ZUKA_PAQUETES[\s\S]{0,200}explora\.includes\(l\.id\)/, 'el primer pintado ya lo sabe, sin esperar a js/carga.js');
});

// ---- js/carga.js ----
function cargador({ paquetes = { arranque: ['a.js'], comun: 'comun.js', cursos: { algebra: 'alg.js', trig: 'trig.js' }, explora: ['alg-1'] } } = {}) {
  const puestos = [], avisos = [], abiertas = [], relojes = [];
  let listaEnRed = () => JSON.stringify(paquetes);
  const ctx = vm.createContext({
    document: { createElement: () => ({ remove() {} }), head: { appendChild: s => puestos.push(s) } },
    setTimeout: (fn, ms) => { relojes.push({ fn, ms }); return relojes.length; }, clearTimeout: i => { if (relojes[i - 1]) relojes[i - 1].fn = () => {}; },
    toast: m => avisos.push(m), console, location: { reload: () => { avisos.push('RECARGA'); } },
    fetch: async () => ({ ok: true, text: async () => listaEnRed() }),
  });
  ctx.window = paquetes ? { zukaPaquetes: paquetes.arranque, ZUKA_PAQUETES: paquetes } : {};
  ctx.abiertas = abiertas;
  vm.runInContext(`const GAMES = { uno: {} }, EXPLORA = {};
    function startLesson(c, l) { abiertas.push('leccion ' + l.id); return 'L'; }
    function startExam(c, u) { abiertas.push('examen ' + u.id); }
    function startReto(c, r) { abiertas.push('reto ' + r.id); }`, ctx);
  vm.runInContext(lee('js/carga.js'), ctx, { filename: 'js/carga.js' });
  const llega = async src => { const s = puestos.find(x => x.src === src && !x.hecho); s.hecho = true; s.onload(); await new Promise(r => setImmediate(r)); };
  const pasan = ms => relojes.filter(t => t.ms === ms).forEach(t => t.fn());
  return { ctx, puestos, avisos, abiertas, llega, pasan, publica: t => { listaEnRed = () => t; }, corre: js => vm.runInContext(js, ctx) };
}
const tick = () => new Promise(r => setImmediate(r));
const PLAY = g => `{ type: 'play', game: '${g}' }`;

test('carga.js: con archivos sueltos (localhost) no pide nada y la lección abre en el acto', () => {
  const k = cargador({ paquetes: null });
  assert.equal(k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-1', ex: [${PLAY('otro')}] })`), 'L');
  assert.deepEqual(k.abiertas, ['leccion alg-1']);
  assert.equal(k.puestos.length, 0);
  assert.equal(k.corre("hayExplora('alg-1')"), false);
});

test('carga.js: la primera lección de un curso pide el paquete común y el del curso, en ese orden, y abre al llegar', async () => {
  const k = cargador();
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [${PLAY('uno')}] })`);
  assert.deepEqual(k.puestos.map(s => s.src), ['comun.js'], 'el del curso espera al común');
  assert.deepEqual(k.abiertas, []);
  await k.llega('comun.js');
  assert.deepEqual(k.puestos.map(s => s.src), ['comun.js', 'alg.js']);
  assert.deepEqual(k.abiertas, []);
  await k.llega('alg.js');
  assert.deepEqual(k.abiertas, ['leccion alg-2']);
  // La siguiente ya no pide nada y abre de inmediato; otro curso solo pide lo suyo.
  assert.equal(k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-3', ex: [${PLAY('uno')}] })`), 'L');
  k.corre(`startExam({ id: 'trig' }, { id: 'u1', exam: { items: [{ ex: ${PLAY('uno')} }] } })`);
  assert.deepEqual(k.puestos.map(s => s.src), ['comun.js', 'alg.js', 'trig.js']);
  await k.llega('trig.js');
  assert.deepEqual(k.abiertas, ['leccion alg-2', 'leccion alg-3', 'examen u1']);
});

test('carga.js: un segundo toque mientras llegan los juegos no abre dos lecciones', async () => {
  const k = cargador();
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] }); startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  await k.llega('comun.js'); await k.llega('alg.js');
  assert.deepEqual(k.abiertas, ['leccion alg-2']);
});

test('carga.js: red de seguridad: si tras cargar el curso falta un juego o la explicación, pide los demás paquetes', async () => {
  const k = cargador();
  k.corre(`startReto({ id: 'algebra' }, { id: 'r1', steps: [{ ex: ${PLAY('de-otro-curso')} }] })`);
  await k.llega('comun.js'); await k.llega('alg.js'); await tick();
  assert.deepEqual(k.puestos.map(s => s.src), ['comun.js', 'alg.js', 'trig.js']);
  assert.deepEqual(k.abiertas, []);
  k.corre("GAMES['de-otro-curso'] = {}");
  await k.llega('trig.js');
  assert.deepEqual(k.abiertas, ['reto r1']);
  // Una lección con explicación en la lista que aún no está cargada también espera.
  const j = cargador();
  j.corre(`startLesson({ id: 'fis' }, { id: 'alg-1', ex: [] })`);
  assert.deepEqual(j.puestos.map(s => s.src), ['comun.js']);
  assert.equal(j.corre("hayExplora('alg-1')"), true);
  assert.equal(j.corre("hayExplora('alg-9')"), false);
});

test('carga.js: sin conexión avisa, no abre la lección a medias y deja reintentar', async () => {
  const k = cargador();
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  await k.llega('comun.js');
  k.puestos[1].onerror(); await tick(); await tick();
  assert.deepEqual(k.abiertas, []);
  assert.match(k.avisos[0], /No se pudieron cargar los juegos/);
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  assert.equal(k.puestos.filter(s => s.src === 'alg.js').length, 2, 'el paquete que falló se vuelve a pedir');
});

test('carga.js: si el paquete común no llega, el del curso no se pide (se ejecutaría a medias y quedaría como cargado)', async () => {
  const k = cargador();
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  k.puestos[0].hecho = true; k.puestos[0].onerror(); await tick(); await tick(); await tick();
  assert.deepEqual(k.puestos.map(s => s.src), ['comun.js']);
  assert.equal(k.corre('CARGA.listos.size'), 0);
  assert.deepEqual(k.abiertas, []);
  // Al reintentar se piden los dos, otra vez en fila.
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  await k.llega('comun.js'); await k.llega('alg.js');
  assert.deepEqual(k.abiertas, ['leccion alg-2']);
});

test('carga.js: un paquete que ya no existe porque hay versión nueva (otra pestaña actualizó) recarga la app en vez de culpar a la conexión', async () => {
  const k = cargador();
  k.publica('self.ZUKA_PAQUETES = {"comun":"comun-nuevo.js","cursos":{"algebra":"alg-nuevo.js"}}');
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  k.puestos[0].onerror(); await tick(); await tick(); await tick();
  assert.match(k.avisos[0], /versión nueva/);
  k.pasan(1200);
  assert.equal(k.avisos[1], 'RECARGA');
});

test('carga.js: una red colgada no deja la app sin poder abrir lecciones: a los 20 s se suelta y avisa', async () => {
  const k = cargador();
  k.corre(`startLesson({ id: 'algebra' }, { id: 'alg-2', ex: [] })`);
  k.pasan(20000);
  assert.match(k.avisos[0], /tardando/);
  k.corre(`startLesson({ id: 'trig' }, { id: 'trig-1', ex: [] })`);   // ya se puede tocar otra
  await k.llega('comun.js'); await k.llega('trig.js');
  assert.deepEqual(k.abiertas, ['leccion trig-1'], 'la que venció no se abre sola después');
});
