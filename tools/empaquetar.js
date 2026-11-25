// Junta los scripts de la app en pocos archivos (js/paquetes/zuka-N.js) para que abra rápido: pedir 750 archivos
// sueltos, aunque estén guardados, tarda segundos; pedir cuatro, no.
// La lista y el orden salen de index.html (las etiquetas <script defer src="js/…"> de su <template id="fuentes">).
// En localhost la página carga los archivos sueltos (se ven los cambios sin empaquetar); publicada, los paquetes.
// Uso: node tools/empaquetar.js   (después de cambiar cualquier archivo de js/, antes de subir)
// Prueba: tests/paquetes.test.js avisa si los paquetes quedaron viejos.
// Spec: docs/superpowers/specs/2026-11-24-arranque-rapido.md
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARTES = 4;
const DIR = 'js/paquetes';
const nombre = i => `${DIR}/zuka-${i + 1}.js`;

// Los scripts propios de index.html, en su orden.
function fuentes(root = ROOT) {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  return [...html.matchAll(/<script defer src="((?!https?:)[^"]+)"><\/script>/g)].map(m => m[1]);
}

// { 'js/paquetes/zuka-1.js': texto, … }: los archivos en orden, repartidos en PARTES trozos seguidos de peso parecido.
// Cada archivo va tras un «;» y un rótulo con su ruta: así un archivo sin punto y coma final no se pega al siguiente.
function empaqueta(root = ROOT) {
  const lista = fuentes(root).map(f => ({ f, txt: fs.readFileSync(path.join(root, f), 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n') }));
  const total = lista.reduce((n, x) => n + x.txt.length, 0);
  const partes = Array.from({ length: PARTES }, () => []);
  let suma = 0;
  for (const x of lista) {
    partes[Math.min(PARTES - 1, Math.floor(suma / (total / PARTES)))].push(x);
    suma += x.txt.length;
  }
  const out = {};
  partes.forEach((p, i) => {
    out[nombre(i)] = `// Generado por tools/empaquetar.js: no editar a mano.\n` +
      p.map(x => `;\n//#archivo ${x.f}\n${x.txt}${x.txt.endsWith('\n') ? '' : '\n'}`).join('');
  });
  return out;
}

if (require.main === module) {
  const out = empaqueta();
  fs.mkdirSync(path.join(ROOT, DIR), { recursive: true });
  for (const [f, txt] of Object.entries(out)) {
    const destino = path.join(ROOT, f);
    const antes = fs.existsSync(destino) ? fs.readFileSync(destino, 'utf8').replace(/\r\n?/g, '\n') : null;
    if (antes !== txt) fs.writeFileSync(destino, txt);
    console.log(`${antes === txt ? 'igual  ' : 'escrito'} ${f}  ${(txt.length / 1024).toFixed(0)} KB`);
  }
}

module.exports = { fuentes, empaqueta, PARTES, DIR, nombre };

// El portal de instituciones no pasa por la caché de la app: carga su propia copia (si no, portal nuevo con cuentas viejas).
{
  const f = require('fs'), q = require('path'), de = f.readFileSync(q.join(__dirname, '../js/instituciones.js'), 'utf8').replace(/\r\n/g, '\n');
  f.writeFileSync(q.join(__dirname, '../instituciones/cuentas.js'), `// Copia de js/instituciones.js (tools/empaquetar.js): no editar.\n${de}`);
  f.writeFileSync(q.join(__dirname, '../instituciones/banco.json'), require('./banco').banco());   // preguntas de los simulacros
}
