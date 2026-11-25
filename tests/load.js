// Carga scripts del navegador (sin módulos) en un contexto aislado de Node para probar su lógica.
// Las constantes de nivel superior de cada script quedan visibles con get(ctx, 'NOMBRE').
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function loadScripts(files) {
  const doc = { createElement: () => ({}), head: { appendChild() {} } };
  const ctx = vm.createContext({ document: doc, console, Math, setTimeout, clearTimeout });
  ctx.window = ctx;
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  return ctx;
}

const get = (ctx, name) => vm.runInContext(name, ctx);

// Carga el kit y un juego, y devuelve el registro GAMES.
function loadGame(file) {
  return get(loadScripts(['js/games/kit.js', file]), 'GAMES');
}

// Lo que el service worker guarda al instalarse, como texto: sw.js más la ruta de cada script que va dentro de los
// paquetes de js/paquetes (entre comillas, como estaban antes en el SHELL). Sirve para comprobar que un archivo viene
// con la app: assert.ok(shell().includes("'js/x.js'")).
function shell() {
  const dir = path.join(ROOT, 'js/paquetes');
  const dentro = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
    .flatMap(f => [...fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/^\/\/#archivo (\S+)/gm)].map(m => `'${m[1]}'`));
  return fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8') + '\n' + dentro.join('\n');
}

module.exports = { loadScripts, loadGame, get, ROOT, shell };
