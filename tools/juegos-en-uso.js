// Dice qué juegos de js/games/ usa de verdad la app y cuáles no (auditoría 2026-11-26, hallazgo 8).
// No busca texto (hay nombres armados al vuelo): carga los scripts de la app en un contexto de Node, como las pruebas,
// y recorre todos los datos que quedan (cursos, evaluaciones, gimnasio, simulacros, tablas) buscando ejercicios
// { type: 'play', game }. Un archivo de js/games/ se usa si registra un juego usado, o si otro archivo que se usa
// nombra algo que él declara (los kits de dibujo).
// Uso: node tools/juegos-en-uso.js            lista los archivos de js/games/ sin uso
//      node tools/juegos-en-uso.js --quita    los saca además de la plantilla «fuentes» de index.html
// Prueba: tests/juegos-en-uso.test.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const lee = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^\uFEFF/, '');

// Todos los scripts de la app que hay en el repositorio, en un orden que carga: primero los de la plantilla (su orden) y
// cada juego que no esté en ella, justo después del último juego registrado.
function todos() {
  const { fuentes } = require('./empaquetar');
  const lista = fuentes(), puestos = new Set(lista);
  const primero = f => (/-kit.js$|algebra-taller.js$/.test(f) ? 0 : 1);   // un kit va antes que quien lo usa
  const fuera = fs.readdirSync(path.join(ROOT, 'js/games')).filter(f => f.endsWith('.js')).map(f => `js/games/${f}`).filter(f => !puestos.has(f))
    .sort((a, b) => primero(a) - primero(b) || (a < b ? -1 : 1));
  const ultimo = lista.reduce((n, f, i) => (f.startsWith('js/games/') ? i : n), -1);
  lista.splice(ultimo + 1, 0, ...fuera);
  return lista;
}

// Un objeto que aguanta cualquier uso (document, localStorage…): al cargar, los scripts solo deben declarar cosas.
function comodin() {
  const f = function () {};
  const p = new Proxy(f, {
    get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : k === Symbol.iterator ? function* () {} : p),
    set: () => true, apply: () => p, construct: () => p, has: () => true,
  });
  return p;
}

// Carga la lista y devuelve { ctx, registra: { archivo: [juegos que añadió a GAMES] }, fallos }.
function carga(lista) {
  const c = comodin();
  const ctx = vm.createContext({
    console: { log() {}, warn() {}, error() {}, info() {} }, Math, JSON, Date, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    requestAnimationFrame: () => 0, cancelAnimationFrame() {}, document: c, navigator: c, localStorage: c, sessionStorage: c, location: { hostname: 'localhost', search: '', href: 'http://localhost/', origin: 'http://localhost', pathname: '/' },
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }), addEventListener() {}, removeEventListener() {}, fetch: () => new Promise(() => {}),
    Image: c, Audio: c, AudioContext: c, IntersectionObserver: c, ResizeObserver: c, MutationObserver: c, URL, URLSearchParams, history: c, screen: c, caches: c, performance: { now: () => 0 }, getComputedStyle: () => c, CSS: c,
    innerWidth: 400, innerHeight: 800, devicePixelRatio: 1, scrollTo() {}, alert() {}, confirm: () => false, crypto: c, indexedDB: c, speechSynthesis: c, customElements: c, HTMLElement: function () {}, Event: function () {}, CustomEvent: function () {},
  });
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  const registra = {}, aporta = {}, fallos = [];
  // Lo que cada archivo añade a los objetos compartidos (XG.figura, TK.glide…): así se reconoce un kit que no declara nada.
  const globales = [...new Set(lista.flatMap(f => declara(lee(f))))];
  const foto = () => {
    const m = new Map();
    for (const n of globales) {
      let v; try { v = vm.runInContext(`typeof ${n} === 'undefined' ? undefined : ${n}`, ctx); } catch (e) { continue; }
      if (v && (typeof v === 'object' || typeof v === 'function') && n !== 'GAMES') { try { m.set(n, new Set(Object.keys(v))); } catch (e) {} }
    }
    return m;
  };
  let antesObj = foto();
  const llaves = () => { try { return vm.runInContext("typeof GAMES === 'undefined' ? [] : Object.keys(GAMES)", ctx); } catch (e) { return []; } };
  for (const f of lista) {
    const antes = new Set(llaves());
    try { vm.runInContext(lee(f), ctx, { filename: f }); } catch (e) { fallos.push(`${f}: ${e.message}`); }
    registra[f] = llaves().filter(k => !antes.has(k));
    if (f.startsWith('js/games/')) {
      const ahora = foto();
      aporta[f] = [...ahora].flatMap(([n, ks]) => (antesObj.has(n) ? [...ks].filter(k => !antesObj.get(n).has(k)).map(k => `${n}.${k}`) : []));
      antesObj = ahora;
    }
  }
  return { ctx, registra, aporta, fallos };
}

// Nombres que un archivo declara arriba del todo (function, const, let, var, class en la columna 0).
const declara = txt => [...txt.matchAll(/^(?:async\s+)?(?:function\*?|const|let|var|class)\s+([A-Za-z_$][\w$]*)/gm)].map(m => m[1]);

// Los juegos que nombra algún ejercicio: se recorren todos los datos que quedaron declarados, sin llamar funciones.
function juegosUsados(ctx, lista) {
  const nombres = new Set(lista.flatMap(f => declara(lee(f))));
  const usados = new Set(), vistos = new Set();
  const anda = v => {
    if (!v || (typeof v !== 'object' && typeof v !== 'function') || vistos.has(v)) return;
    vistos.add(v);
    if (typeof v.game === 'string' && (v.type === 'play' || 'params' in v)) usados.add(v.game);
    if (v instanceof vm.runInContext('Map', ctx)) { for (const [k, x] of v) { anda(k); anda(x); } return; }
    if (v instanceof vm.runInContext('Set', ctx)) { for (const x of v) anda(x); return; }
    for (const k of Object.keys(v)) { let x; try { x = v[k]; } catch (e) { continue; } anda(x); }
  };
  for (const n of nombres) {
    if (n === 'GAMES') continue;
    let v; try { v = vm.runInContext(`typeof ${n} === 'undefined' ? undefined : ${n}`, ctx); } catch (e) { continue; }
    anda(v);
  }
  return usados;
}

// { usados: Set de juegos, sinUso: [archivos de js/games sin uso], porArchivo, fallos }
function analiza() {
  const lista = todos();
  const { ctx, registra, aporta, fallos } = carga(lista);
  const usados = juegosUsados(ctx, lista);
  const texto = Object.fromEntries(lista.map(f => [f, lee(f)]));
  const juegos = lista.filter(f => f.startsWith('js/games/'));
  // Un juego que llama a otro por su nombre: GAMES['otro'] dentro de un archivo que se usa.
  const vivos = new Set(lista.filter(f => !f.startsWith('js/games/')));
  for (const f of juegos) if (registra[f].some(g => usados.has(g))) vivos.add(f);
  const decl = Object.fromEntries(juegos.map(f => [f, declara(texto[f]).filter(n => n.length > 1)]));
  const nombra = (f, n) => new RegExp(`(^|[^\\w$.])${n.replace(/\$/g, '\\$')}(?![\\w$])`).test(texto[f]);
  let cambio = true;
  while (cambio) {
    cambio = false;
    for (const f of juegos) {
      if (vivos.has(f)) continue;
      const porNombre = registra[f].some(g => [...vivos].some(v => v.startsWith('js/games/') && v !== f && new RegExp(`GAMES\\[['"]${g}['"]\\]|GAMES\\.${g}\\b`).test(texto[v])));
      // Un archivo que no registra juegos es un kit: vive si alguien vivo nombra algo suyo.
      const porKit = decl[f].concat(aporta[f].filter(n => /^[\w$]+\.[A-Za-z_$][\w$]*$/.test(n))).some(n => [...vivos].some(v => v !== f && nombra(v, n)));
      if (porNombre || porKit) { vivos.add(f); cambio = true; }
    }
  }
  return { usados, sinUso: juegos.filter(f => !vivos.has(f)), registra, aporta, fallos, lista };
}

if (require.main === module) {
  const r = analiza();
  if (r.fallos.length) console.error(`Al cargar fallaron ${r.fallos.length}:\n  ${r.fallos.join('\n  ')}`);
  const peso = r.sinUso.reduce((n, f) => n + fs.statSync(path.join(ROOT, f)).size, 0);
  console.log(r.sinUso.join('\n'));
  console.log(`\n${r.usados.size} juegos en uso; ${r.sinUso.length} archivos sin uso, ${(peso / 1024).toFixed(0)} KB`);
  if (process.argv.includes('--quita')) {
    let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    for (const f of r.sinUso) html = html.replace(new RegExp(`[ \\t]*<script defer src="${f.replace(/[.]/g, '\\.')}"></script>\\r?\\n`), '');
    fs.writeFileSync(path.join(ROOT, 'index.html'), html);
    console.log('Quitados de index.html. Ahora: node tools/empaquetar.js');
  }
}

module.exports = { analiza, todos, carga, juegosUsados, declara };
