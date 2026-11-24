// Sube a Bunny Storage la narración de una explicación Explora (spec 2026-11-24-voz-en-bunny).
//   node tools/subir-voz.js pu-cm-1 [otra …]    sube, comprueba en el CDN y apunta la app a lo nuevo
//   node tools/subir-voz.js --todas             todas las carpetas de media/voz que estén completas
//   node tools/subir-voz.js --revisa [id …]     solo comprueba lo publicado (no sube nada)
// Opciones: --parcial (aceptar frases sin audio).
//
// Todo lo que se sube es inmutable: el nombre de cada audio y de cada lista sale de su contenido, así ninguna caché (CDN o
// celular) puede mostrar una mezcla de voces. Orden: audios → lista → comprobación en el CDN (huella y CORS) → y solo entonces
// js/explora-voces.js, que es lo que la app lee. Lo ya subido no se vuelve a subir; si se corta, se corre otra vez.
// Nada se borra en Bunny: los celulares que aún no se actualizan siguen usando la lista anterior.
// Llave: ~/.zuka/bunny_storage_key.txt (la Password de la zona). Nunca en el repositorio ni en pantalla.
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const ZONA = 'https://ny.storage.bunnycdn.com/zukavoz/';
const CDN = 'https://zukavoz.b-cdn.net/';
const VOCES = path.join(ROOT, 'js', 'explora-voces.js');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const espera = ms => new Promise(r => setTimeout(r, ms));

// De los audios locales a lo que se publica: { archivos: [{ nombre, datos, tipo }], lista: { nombre, datos } }. Pura.
function paquete(man, lee) {
  const archivos = new Map(), nueva = {};
  for (const [t, v] of Object.entries(man)) {
    const datos = lee(v.f);
    if (!datos || !datos.length) throw new Error(`audio vacío o perdido: ${v.f}`);
    if (!(v.d > 0)) throw new Error(`sin duración: ${v.f}`);
    const nombre = sha(datos).slice(0, 16) + '.m4a';
    archivos.set(nombre, { nombre, datos, tipo: 'audio/mp4' });
    nueva[t] = { f: nombre, d: v.d };
  }
  if (!archivos.size) throw new Error('la lista está vacía');
  const datos = Buffer.from(JSON.stringify(nueva), 'utf8');
  return { archivos: [...archivos.values()], lista: { nombre: `voz-${sha(datos).slice(0, 12)}.json`, datos, tipo: 'application/json' } };
}

const leeVoces = src => JSON.parse(src.match(/const EXPLORA_VOCES = (\{[\s\S]*?\});/)[1]);
const escribeVoces = v => `// GENERADO por tools/subir-voz.js: no editar a mano. Lecciones narradas → su lista de audios en Bunny (EXPLORA_VOZ).
const EXPLORA_VOCES = ${JSON.stringify(Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : 1))), null, 2)};
`;

async function pide(url, opts, intentos = 4) {
  for (let k = 1; ; k++) {
    try {
      const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(60000) });
      if (r.status < 500 && r.status !== 429) return r;
      if (k >= intentos) return r;
    } catch (e) { if (k >= intentos) throw new Error(`${url}: ${e.message}`); }
    await espera(1500 * k);
  }
}
async function porTandas(xs, n, f) {
  const cola = [...xs];
  await Promise.all(Array.from({ length: n }, async () => { while (cola.length) await f(cola.shift()); }));
}

function llave() {
  const f = path.join(os.homedir(), '.zuka', 'bunny_storage_key.txt');
  const k = fs.existsSync(f) ? fs.readFileSync(f, 'utf8').replace(/^﻿/, '').trim() : '';
  if (!k) throw new Error(`Falta la llave en ${f}`);
  if (!/^[\w-]+$/.test(k)) throw new Error(`La llave de ${f} tiene algo más que la contraseña: deja solo la Password de la zona`);
  return k;
}

// El CDN debe entregar exactamente lo subido y permitir que la app lo lea (CORS).
async function comprueba(id, nombre, huella) {
  let por = '';
  for (let k = 1; k <= 5; k++) {
    let r, datos;
    try { r = await pide(CDN + id + '/' + nombre, { headers: { Origin: 'https://zuka.example' } }); datos = Buffer.from(await r.arrayBuffer()); }
    catch (e) { por = e.message; await espera(1500 * k); continue; }
    const cors = r.headers.get('access-control-allow-origin');
    if (!r.ok) por = `responde ${r.status}`;
    else if (cors !== '*') por = `sin CORS (añade ${path.extname(nombre).slice(1)} en CDN → zukavoz → Headers)`;
    else if (huella && sha(datos) !== huella) por = 'contenido distinto';
    else return datos;
    await espera(1500 * k);
  }
  throw new Error(`${id}/${nombre}: ${por}`);
}

async function sube(id, parcial) {
  const dir = path.join(ROOT, 'media', 'voz', id);
  const man = JSON.parse(fs.readFileSync(path.join(dir, 'voz.json'), 'utf8'));
  const faltan = require('./explora-frases').frases(id).filter(f => !man[f.t]).length;
  if (faltan && !parcial) throw new Error(`${id}: ${faltan} frases sin audio (--parcial para subir así)`);
  const { archivos, lista } = paquete(man, f => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f)) : null));
  const AccessKey = llave();
  const antes = leeVoces(fs.readFileSync(VOCES, 'utf8'))[id];
  if (antes && faltan) {   // con --parcial, nunca menos frases que las ya publicadas
    const pub = JSON.parse(await comprueba(id, antes));
    const pierde = require('./explora-frases').frases(id).filter(f => pub[f.t] && !man[f.t]).length;
    if (pierde) throw new Error(`${id}: se perderían ${pierde} frases que ya están publicadas`);
  }
  const r = await pide(`${ZONA}${id}/`, { headers: { AccessKey, accept: 'application/json' } });
  if (!r.ok) throw new Error(`Bunny no deja listar la carpeta: ${r.status}`);
  const ya = new Map((await r.json()).map(o => [o.ObjectName, (o.Checksum || '').toLowerCase()]));
  let subidos = 0;
  const pon = async a => {
    if (ya.get(a.nombre) === sha(a.datos)) return;
    const p = await pide(`${ZONA}${id}/${a.nombre}`, { method: 'PUT', headers: { AccessKey, Checksum: sha(a.datos).toUpperCase(), 'Content-Type': a.tipo }, body: a.datos });
    if (p.status !== 201) throw new Error(`no se pudo subir ${a.nombre}: ${p.status}`);
    subidos++;
  };
  await porTandas(archivos, 4, pon);
  await pon(lista);
  await porTandas([...archivos, lista], 4, a => comprueba(id, a.nombre, sha(a.datos)));
  const voces = leeVoces(fs.readFileSync(VOCES, 'utf8'));
  const cambio = voces[id] !== lista.nombre;
  if (cambio) { voces[id] = lista.nombre; fs.writeFileSync(VOCES, escribeVoces(voces)); }
  console.log(`${id}: ${archivos.length} audios (${subidos} archivos subidos), comprobados en el CDN → ${lista.nombre}${cambio ? '' : ' (sin cambios)'}`);
  return cambio;
}

async function revisa(id) {
  const nombre = leeVoces(fs.readFileSync(VOCES, 'utf8'))[id];
  if (!nombre) throw new Error(`${id} no está publicada`);
  const j = JSON.parse(await comprueba(id, nombre));
  const fs_ = [...new Set(Object.values(j).map(v => v.f))];
  await porTandas(fs_, 4, async f => {
    const d = await comprueba(id, f);
    if (!f.startsWith(sha(d).slice(0, 16))) throw new Error(`${id}/${f}: contenido distinto`);
  });
  const faltan = require('./explora-frases').frases(id).filter(f => !j[f.t]).length;
  if (faltan) process.exitCode = 1;
  console.log(`${id}: ${fs_.length} audios bien${faltan ? `; ✗ ${faltan} frases de la lección sin audio` : ''}`);
}

async function main(args) {
  const op = new Set(args.filter(a => a.startsWith('--')));
  let ids = args.filter(a => !a.startsWith('--'));
  if (op.has('--revisa')) {
    if (!ids.length) ids = Object.keys(leeVoces(fs.readFileSync(VOCES, 'utf8')));
    for (const id of ids) try { await revisa(id); } catch (e) { console.error(`✗ ${e.message}`); process.exitCode = 1; }
    return;
  }
  if (op.has('--todas')) ids = fs.readdirSync(path.join(ROOT, 'media', 'voz')).filter(d => fs.existsSync(path.join(ROOT, 'media', 'voz', d, 'voz.json')));
  if (!ids.length) throw new Error('Di qué lección subir: node tools/subir-voz.js pu-cm-1');
  let cambios = 0;
  for (const id of ids) {
    try { if (await sube(id, op.has('--parcial'))) cambios++; }
    catch (e) { console.error(`✗ ${e.message}`); process.exitCode = 1; }
  }
  if (cambios) console.log('Ahora: sube VERSION en sw.js, node --test tests/, commit de js/explora-voces.js y sw.js, y push.');
}

if (require.main === module) main(process.argv.slice(2)).catch(e => { console.error(`✗ ${e.message}`); process.exitCode = 1; });
module.exports = { paquete, leeVoces, escribeVoces, CDN };
