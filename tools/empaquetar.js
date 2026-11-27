// Junta los scripts de la app en pocos archivos (js/paquetes/) para que abra rápido.
//   · ARRANQUE: el núcleo y los datos de los cursos, en PARTES trozos. Es lo único que la página pide al abrir.
//   · DIFERIDOS: juegos y explicaciones. Un paquete por curso y uno «comun» (lo que usan dos cursos o más); se piden al
//     abrir la primera lección, evaluación o reto de ese curso (js/carga.js). La portada, la Tienda y el inicio no los
//     necesitan. El reparto no se escribe a mano: se cargan los cursos en Node y se mira qué juego usa cada uno.
//   · HUELLA: el nombre de cada paquete lleva la huella de su contenido (zuka-a1.3f9c2b7d10.js). Una versión nueva solo
//     baja los paquetes que cambiaron; el service worker conserva los demás.
// La lista y el orden salen de index.html (las etiquetas <script defer src="js/…"> de su <template id="fuentes">).
// En localhost la página carga los archivos sueltos (se ven los cambios sin empaquetar); publicada, los paquetes.
// Uso: node tools/empaquetar.js   (después de cambiar cualquier archivo de js/, antes de subir)
//   Escribe los paquetes, borra los viejos, y deja la lista en js/paquetes/lista.js (para la página) y en sw.js (entre
//   las marcas <paquetes>, para el service worker).
// Prueba: tests/paquetes.test.js avisa si algo quedó viejo.
// Specs: docs/superpowers/specs/2026-11-24-arranque-rapido.md y 2026-11-26-arranque-liviano.md
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const PARTES = 6;
const DIR = 'js/paquetes';
const LISTA = `${DIR}/lista.js`;

// Juegos y explicaciones que el arranque sí necesita: los datos de los cursos los usan al cargarse (Álgebra arma sus
// ejercicios con el kit de escenas y calcula respuestas con «arma-la-cuenta») y la app pinta con la paleta del kit.
// Si falta uno, tests/paquetes.test.js lo dice: los datos de los cursos dejarían de ser los mismos.
const EN_ARRANQUE = new Set(['js/games/kit.js', 'js/games/formula.js', 'js/games/arma-la-cuenta.js', 'js/games/explora-kit.js',
  'js/games/logica-kit.js', 'js/games/figura-kit.js', 'js/explora.js', 'js/explora-mate.js', 'js/explora-escenas.js']);
const esDiferido = f => (f.startsWith('js/games/') || /^js\/explora/.test(f)) && !EN_ARRANQUE.has(f);

const lee = (f, root = ROOT) => fs.readFileSync(path.join(root, f), 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
const huella = txt => crypto.createHash('sha256').update(txt).digest('hex').slice(0, 10);

// Los scripts propios de index.html, en su orden.
function fuentes(root = ROOT) {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  return [...html.matchAll(/<script defer src="((?!https?:)[^"]+)"><\/script>/g)].map(m => m[1]);
}

// El reparto: { arranque: [archivos], grupos: { comun: [...], algebra: [...], … }, explora: [lecciones con explicación] }.
// Un archivo diferido es de un curso si solo ese curso lo usa (sus lecciones, evaluaciones y retos de gimnasio nombran un
// juego suyo, o trae la explicación de una lección suya), contando lo que usan los archivos que dependen de él. Lo que
// usan dos cursos o más, o ninguno a la vista (los kits que retocan a otros), va en «comun», que se carga primero.
let memo = null;
function plan() {
  if (memo) return memo;
  const { carga, declara } = require('./juegos-en-uso');
  const lista = fuentes(), dif = lista.filter(esDiferido);
  const { ctx, registra, aporta } = carga(lista, esDiferido);
  const corre = js => vm.runInContext(js, ctx);
  const txt = Object.fromEntries(dif.map(f => [f, lee(f)]));
  const dueño = {};
  for (const f of lista) for (const g of registra[f] || []) dueño[g] = f;
  const de = Object.fromEntries(dif.map(f => [f, new Set()]));
  const cursos = corre('COURSES.map(c => c.id)'), leccion = {};
  const juegosDe = expr => {
    const s = new Set(), v = new Set();
    const anda = x => {
      if (!x || typeof x !== 'object' || v.has(x)) return;
      v.add(x);
      if (typeof x.game === 'string') s.add(x.game);
      for (const k of Object.keys(x)) anda(x[k]);
    };
    anda(corre(expr));
    return s;
  };
  cursos.forEach((c, i) => {
    for (const g of juegosDe(`COURSES[${i}]`)) if (de[dueño[g]]) de[dueño[g]].add(c);
    for (const id of corre(`COURSES[${i}].units.flatMap(u => u.lessons.map(l => l.id))`)) leccion[id] = c;
  });
  const explora = corre("typeof EXPLORA === 'undefined' ? [] : Object.keys(EXPLORA)").filter(id => leccion[id]);
  for (const f of dif) for (const a of aporta[f] || []) { const m = a.match(/^EXPLORA\.(.+)$/); if (m && leccion[m[1]]) de[f].add(leccion[m[1]]); }
  for (const [after, juegos] of corre("typeof GYM_RETOS === 'undefined' ? [] : GYM_RETOS.map(r => [r.after, r.steps.map(s => s.ex && s.ex.game).filter(Boolean)])")) {
    for (const id of after) for (const g of juegos) if (leccion[id] && de[dueño[g]]) de[dueño[g]].add(leccion[id]);
  }
  // f depende de g si nombra algo que g declara (un kit), algo que g añade a un objeto común (XG.figura, o el tipo de
  // escena 'figura' entre comillas) o un juego que g registra. Sobran dependencias (palabras iguales); no faltan.
  const decl = {}, apo = {};
  for (const f of dif) {
    for (const n of declara(txt[f])) if (n.length > 1) decl[n] = f;
    for (const a of aporta[f] || []) apo[a] = f;
  }
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const deps = Object.fromEntries(dif.map(f => [f, new Set()]));
  for (const f of dif) {
    const t = txt[f];
    for (const n in decl) if (decl[n] !== f && new RegExp(`(^|[^\\w$.])${esc(n)}(?![\\w$])`).test(t)) deps[f].add(decl[n]);
    for (const a in apo) {
      if (apo[a] === f) continue;
      const k = a.slice(a.indexOf('.') + 1);
      if (t.includes(a) || (k.length >= 4 && (t.includes(`'${k}'`) || t.includes(`"${k}"`)))) deps[f].add(apo[a]);
    }
    for (const g in dueño) if (dueño[g] !== f && de[dueño[g]] && t.includes(`'${g}'`)) deps[f].add(dueño[g]);
  }
  const propaga = () => {
    for (let cambio = true; cambio;) {
      cambio = false;
      for (const f of dif) for (const g of deps[f]) for (const c of de[f]) if (!de[g].has(c)) { de[g].add(c); cambio = true; }
    }
  };
  propaga();
  for (const f of dif) if (!de[f].size) cursos.forEach(c => de[f].add(c));
  propaga();
  const grupos = { comun: [] };
  for (const f of dif) {
    const g = de[f].size === 1 ? [...de[f]][0] : 'comun';
    (grupos[g] = grupos[g] || []).push(f);
  }
  return (memo = { arranque: lista.filter(f => !esDiferido(f)), grupos, explora, cursos });
}

// Cada archivo va tras un «;» y un rótulo con su ruta: así un archivo sin punto y coma final no se pega al siguiente.
const junta = archivos => `// Generado por tools/empaquetar.js: no editar a mano.\n` +
  archivos.map(f => { const t = lee(f); return `;\n//#archivo ${f}\n${t}${t.endsWith('\n') ? '' : '\n'}`; }).join('');

// { archivos: { 'js/paquetes/zuka-a1.<huella>.js': texto, … }, lista: { arranque: [nombres], comun, cursos: { id: nombre }, explora: [ids] } }
// El arranque va en PARTES trozos seguidos de peso parecido.
function empaqueta() {
  const p = plan(), archivos = {};
  const pon = (clave, lista) => { const txt = junta(lista), nombre = `${DIR}/zuka-${clave}.${huella(txt)}.js`; archivos[nombre] = txt; return nombre; };
  const peso = Object.fromEntries(p.arranque.map(f => [f, lee(f).length]));
  const total = p.arranque.reduce((n, f) => n + peso[f], 0);
  const partes = Array.from({ length: PARTES }, () => []);
  let suma = 0;
  for (const f of p.arranque) {
    partes[Math.min(PARTES - 1, Math.floor(suma / (total / PARTES)))].push(f);
    suma += peso[f];
  }
  const lista = { arranque: partes.map((x, i) => pon(`a${i + 1}`, x)), comun: pon('comun', p.grupos.comun), cursos: {}, explora: p.explora };
  for (const c of p.cursos) if (p.grupos[c]) lista.cursos[c] = pon(c, p.grupos[c]);
  return { archivos, lista };
}

// La lista para la página (un script aparte: el de index.html va en línea y su huella está en la política de vercel.json).
const textoLista = lista => `// Generado por tools/empaquetar.js: no editar a mano. Los paquetes de la app y las lecciones con explicación interactiva.\nself.ZUKA_PAQUETES = ${JSON.stringify(lista)};\n`;

// La lista para el service worker, dentro de sw.js: así el propio sw.js cambia cuando cambia un paquete.
const MARCAS = /\/\/ <paquetes>[\s\S]*?\/\/ <\/paquetes>/;
function textoSW(sw, lista) {
  const dif = [lista.comun, ...Object.values(lista.cursos)];
  return sw.replace(MARCAS, `// <paquetes> Generado por tools/empaquetar.js: no editar a mano.\nconst ARRANQUE = ${JSON.stringify(lista.arranque)};\nconst DIFERIDOS = ${JSON.stringify(dif)};\n// </paquetes>`);
}

if (require.main === module) {
  const { archivos, lista } = empaqueta();
  fs.mkdirSync(path.join(ROOT, DIR), { recursive: true });
  const escribe = (f, txt) => {
    const destino = path.join(ROOT, f);
    const antes = fs.existsSync(destino) ? fs.readFileSync(destino, 'utf8').replace(/\r\n?/g, '\n') : null;
    if (antes !== txt) fs.writeFileSync(destino, txt);
    return antes === txt;
  };
  for (const [f, txt] of Object.entries(archivos)) console.log(`${escribe(f, txt) ? 'igual  ' : 'escrito'} ${f}  ${(txt.length / 1024).toFixed(0)} KB`);
  for (const f of fs.readdirSync(path.join(ROOT, DIR))) {
    if (f !== 'lista.js' && !archivos[`${DIR}/${f}`]) { fs.unlinkSync(path.join(ROOT, DIR, f)); console.log(`borrado ${DIR}/${f}`); }
  }
  escribe(LISTA, textoLista(lista));
  escribe('sw.js', textoSW(lee('sw.js'), lista));
  const kb = l => (l.reduce((n, f) => n + archivos[f].length, 0) / 1024).toFixed(0);
  console.log(`arranque ${kb(lista.arranque)} KB; diferido ${kb([lista.comun, ...Object.values(lista.cursos)])} KB`);
}

module.exports = { fuentes, plan, empaqueta, textoLista, textoSW, esDiferido, EN_ARRANQUE, PARTES, DIR, LISTA, huella };

// El portal de instituciones no pasa por la caché de la app: carga su propia copia (si no, portal nuevo con cuentas viejas).
// Solo al correr la herramienta: importarla (las pruebas lo hacen) no escribe nada.
if (require.main === module) {
  const f = require('fs'), q = require('path'), de = f.readFileSync(q.join(__dirname, '../js/instituciones.js'), 'utf8').replace(/\r\n/g, '\n');
  f.writeFileSync(q.join(__dirname, '../instituciones/cuentas.js'), `// Copia de js/instituciones.js (tools/empaquetar.js): no editar.\n${de}`);
  f.writeFileSync(q.join(__dirname, '../instituciones/banco.json'), require('./banco').banco());   // preguntas de los simulacros
}
