// Arranque rápido (spec 2026-11-24-arranque-rapido): la app publicada carga sus scripts en cuatro paquetes y no en
// 750 archivos sueltos. index.html conserva la lista (dentro de <template id="fuentes">, que no se carga sola) y en
// localhost se cargan sueltos. Los paquetes se arman con «node tools/empaquetar.js» y tienen que estar al día.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT } = require('./load');
const { fuentes, empaqueta, PARTES, nombre } = require('../tools/empaquetar');

const lee = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n?/g, '\n');
const html = lee('index.html');
const plantilla = html.match(/<template id="fuentes">([\s\S]*?)<\/template>/);
const PAQUETES = Array.from({ length: PARTES }, (_, i) => nombre(i));

test('los paquetes están al día con los archivos de js/ (si falla: node tools/empaquetar.js)', () => {
  for (const [f, txt] of Object.entries(empaqueta())) {
    assert.ok(fs.existsSync(path.join(ROOT, f)), `falta ${f}: corre node tools/empaquetar.js`);
    assert.ok(lee(f) === txt, `${f} quedó viejo: corre node tools/empaquetar.js`);
  }
});

test('cada script propio de index.html va en un paquete, una sola vez y en el mismo orden', () => {
  const dentro = Object.keys(empaqueta()).flatMap(f => [...lee(f).matchAll(/^\/\/#archivo (\S+)/gm)].map(m => m[1]));
  assert.equal(dentro.join('\n'), fuentes().join('\n'));
  assert.equal(new Set(dentro).size, dentro.length, 'un archivo repetido');
  assert.ok(dentro.length > 600);
});

test('cada paquete es JavaScript válido', () => {
  for (const f of Object.keys(empaqueta())) assert.doesNotThrow(() => new vm.Script(lee(f), { filename: f }));
});

test('ningún archivo empieza con «use strict» (en un paquete cambiaría el modo de los que le siguen)', () => {
  for (const f of fuentes()) assert.ok(!/^\s*(\/\/[^\n]*\n\s*)*['"]use strict['"]/.test(lee(f)), f);
});

test('ningún script se carga solo: todos están dentro de la plantilla', () => {
  assert.ok(plantilla, 'falta <template id="fuentes">');
  const fuera = html.replace(plantilla[0], '');
  assert.ok(!/<script[^>]*\ssrc=/.test(fuera), 'hay un <script src> fuera de la plantilla: se cargaría además del paquete');
  assert.ok([...plantilla[1].matchAll(/<script/g)].length === fuentes().length + 3, 'en la plantilla van los scripts propios y las tres librerías');
});

test('el service worker guarda los paquetes y ya no los archivos sueltos', () => {
  const ctx = vm.createContext({ self: { addEventListener() {}, location: { origin: 'https://zuka.example', search: '' } }, URL, caches: {} });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx);
  const shell = vm.runInContext('SHELL', ctx);
  for (const f of PAQUETES) assert.ok(shell.includes(f), f);
  assert.ok(shell.length < 60, `el shell tiene ${shell.length} archivos: debe ser corto para instalarse rápido`);
  assert.ok(!shell.some(f => /^js\/(?!paquetes\/)/.test(f)), 'un script suelto en el shell');
});

// Los dos scripts de arranque de index.html (el de <head> y el cargador del final), corridos con una página de mentira.
function carga({ hostname, search = '' }) {
  const puestos = [];
  const scripts = [...plantilla[1].matchAll(/<script defer src="([^"]+)"(?: integrity="([^"]+)")?/g)]
    .map(m => ({ getAttribute: a => (a === 'src' ? m[1] : a === 'integrity' ? m[2] || null : null) }));
  const document = {
    documentElement: { dataset: {} },
    getElementById: () => ({ content: { querySelectorAll: () => scripts } }),
    createElement: tag => ({ tag, style: {}, setAttribute() {}, addEventListener() {}, appendChild() {} }),
    head: { appendChild: s => puestos.push(s) }, body: { appendChild: d => { document.aviso = d; } },
  };
  const window = {}, guarda = { getItem: () => null, setItem() {} };
  const ctx = vm.createContext({
    document, window, location: { hostname, search, reload() {} }, localStorage: guarda, sessionStorage: guarda,
    matchMedia: () => ({ matches: false }), JSON,
  });
  const enLinea = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  vm.runInContext(enLinea[0], ctx);
  vm.runInContext(enLinea[enLinea.length - 1], ctx);
  return { scripts: puestos.filter(e => e.tag === 'script'), enlaces: puestos.filter(e => e.tag === 'link'), document, window };
}

test('publicada: tres librerías con su huella y los cuatro paquetes, en orden y sin async', () => {
  const { scripts } = carga({ hostname: 'zuka.example' });
  assert.equal(scripts.length, 3 + PARTES);
  assert.ok(scripts.slice(0, 3).every(s => /^https:/.test(s.src) && /^sha384-/.test(s.integrity) && s.crossOrigin === 'anonymous'));
  assert.equal(scripts.slice(3).map(s => s.src).join(' '), PAQUETES.join(' '));
  assert.ok(scripts.every(s => s.async === false), 'async = false: se ejecutan en el orden de la lista');
});

test('publicada: los paquetes se piden desde el <head> (preload), sin esperar a las hojas de estilo', () => {
  const { enlaces } = carga({ hostname: 'zuka.example' });
  assert.equal(enlaces.filter(l => l.rel === 'preload' && l.as === 'script').map(l => l.href).join(' '), PAQUETES.join(' '));
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

test('si un paquete no llega, la app lo dice y ofrece reintentar (una librería externa que falla no la detiene)', () => {
  const { scripts, document, window } = carga({ hostname: 'zuka.example' });
  assert.equal(scripts[0].onerror, undefined);
  scripts[4].onerror();
  assert.equal(document.aviso.id, 'sin-cargar');
  assert.equal(window.zukaSinCargar, true);
});
