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
function shell(conRetirados = false) {
  const dir = path.join(ROOT, 'js/paquetes');
  const dentro = fs.readdirSync(dir).filter(f => f.endsWith('.js'))
    .flatMap(f => [...fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/^\/\/#archivo (\S+)/gm)].map(m => `'${m[1]}'`));
  if (conRetirados) dentro.push(...retirados().map(f => `'${f}'`));
  return fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8') + '\n' + dentro.join('\n');
}

// Juegos que siguen en el repositorio pero ya no van en la app (ningún ejercicio los usa: tools/juegos-en-uso.js).
// Sus pruebas los siguen cargando: «registrado en la app» es estar en index.html; «existe en el repositorio», estar aquí.
function retirados(html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')) {
  const primero = f => (/-kit\.js$|algebra-taller\.js$/.test(f) ? 0 : 1);
  return fs.readdirSync(path.join(ROOT, 'js/games')).filter(f => f.endsWith('.js') && !html.includes(`src="js/games/${f}"`))
    .sort((a, b) => primero(a) - primero(b) || (a < b ? -1 : 1)).map(f => `js/games/${f}`);
}

// Los scripts js/ de index.html, en su orden, más los juegos retirados (justo después del último juego de la app).
function enRepo(html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')) {
  const lista = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]);
  const ultimo = lista.reduce((n, f, i) => (f.startsWith('js/games/') ? i : n), -1);
  lista.splice(ultimo + 1, 0, ...retirados(html));
  return lista;
}

// index.html como estaría con los juegos retirados todavía en su lista: para las pruebas de juegos viejos, que miran
// que el archivo exista y vaya después de su kit. Lo que de verdad carga la app lo vigila tests/registro.test.js.
function htmlRepo() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const juegos = [...html.matchAll(/[ \t]*<script defer src="js\/games\/[^"]+"><\/script>\r?\n/g)];
  const fin = juegos[juegos.length - 1], corte = fin.index + fin[0].length;
  return html.slice(0, corte) + retirados(html).map(f => `  <script defer src="${f}"></script>\n`).join('') + html.slice(corte);
}

module.exports = { loadScripts, loadGame, get, ROOT, shell, retirados, enRepo, htmlRepo };
