// Fotos reales de Wikimedia Commons para las explicaciones (spec 2026-11-28-preicfes-paso-a-paso, «Fotos reales»).
//   node tools/fotos-commons.js busca "consulta"            candidatas con licencia libre (título, tamaño, licencia, autor)
//   node tools/fotos-commons.js toma <id> "File:Título.jpg"  la baja, la deja en media/fotos/<id>.webp (960 px, ~70 KB) con su
//                                                            crédito en media/fotos/creditos.json y rehace js/explora-fotos-datos.js
//   node tools/fotos-commons.js mira <id>                    copia .jpg en la carpeta temporal para mirarla
// Solo licencias que permiten usarla y cambiarle el tamaño: dominio público, CC0, CC BY y CC BY-SA (con autor y licencia).
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), DIR = path.join(ROOT, 'media/fotos'), CRED = path.join(DIR, 'creditos.json');
const DATOS = path.join(ROOT, 'js/explora-fotos-datos.js');
const UA = 'ZukaEducacion/1.0 (app educativa; https://github.com/zukaeducation-soft/zuka_app)';
const API = 'https://commons.wikimedia.org/w/api.php';
const LIBRE = /^(public domain|pd|cc0|cc by(-sa)? \d(\.\d)?( [a-z]+)?|cc by(-sa)?|attribution)/i;
const limpia = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ffmpeg = () => {
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return 'ffmpeg'; } catch (e) { /* busca la de winget */ }
  const base = path.join(process.env.LOCALAPPDATA || '', 'Microsoft/WinGet/Packages');
  for (const d of fs.existsSync(base) ? fs.readdirSync(base) : []) if (/FFmpeg/i.test(d)) {
    for (const s of fs.readdirSync(path.join(base, d))) { const f = path.join(base, d, s, 'bin', 'ffmpeg.exe'); if (fs.existsSync(f)) return f; }
  }
  throw new Error('no encuentro ffmpeg');
};
async function json(params) {
  const r = await fetch(`${API}?${new URLSearchParams({ format: 'json', ...params })}`, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`Commons respondió ${r.status}`);
  return r.json();
}
const info = p => {
  const ii = (p.imageinfo || [])[0] || {}, m = ii.extmetadata || {};
  return { titulo: p.title, ancho: ii.width, alto: ii.height, url: ii.thumburl || ii.url, pagina: ii.descriptionurl,
    licencia: limpia(m.LicenseShortName && m.LicenseShortName.value), autor: limpia(m.Artist && m.Artist.value) || 'autor desconocido' };
};
async function busca(q) {
  const d = await json({ action: 'query', generator: 'search', gsrsearch: `filetype:bitmap ${q}`, gsrnamespace: 6, gsrlimit: 20, prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: 960 });
  const ps = Object.values((d.query || {}).pages || {}).sort((a, b) => a.index - b.index).map(info).filter(x => LIBRE.test(x.licencia) && x.ancho >= 800);
  for (const x of ps.slice(0, 10)) console.log(`${x.titulo}\n   ${x.ancho}×${x.alto} · ${x.licencia} · ${x.autor.slice(0, 60)}`);
  if (!ps.length) console.log('(nada con licencia libre)');
}
const credito = c => `Foto: ${c.autor.length > 40 ? c.autor.slice(0, 39) + '…' : c.autor} · ${c.licencia} · Commons`;
function rehaceDatos(cred) {
  const datos = Object.fromEntries(Object.entries(cred).map(([id, c]) => [id, { src: `media/fotos/${id}.webp`, w: c.w, h: c.h, cred: credito(c) }]));
  fs.writeFileSync(DATOS, `// Generado por tools/fotos-commons.js: no editar a mano. Fotos de Wikimedia Commons (licencias en media/fotos/creditos.json).\nconst XFOTO = ${JSON.stringify(datos, null, 1)};\n`);
}
async function toma(id, titulo) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('id con letras, números y guiones');
  const d = await json({ action: 'query', titles: titulo, prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: 960 });
  const p = Object.values(d.query.pages)[0];
  if (!p.imageinfo) throw new Error(`no existe ${titulo}`);
  const x = info(p);
  if (!LIBRE.test(x.licencia)) throw new Error(`licencia no libre: ${x.licencia}`);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'commons-')), crudo = path.join(tmp, 'crudo');
  const r = await fetch(x.url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`no bajó: ${r.status}`);
  fs.writeFileSync(crudo, Buffer.from(await r.arrayBuffer()));
  fs.mkdirSync(DIR, { recursive: true });
  const out = path.join(DIR, `${id}.webp`);
  // Calidad 68; si pasa de 130 KB (fotos con mucho detalle), baja la calidad y, de último, el ancho a 800.
  for (const [q, an] of [[68, 960], [55, 960], [45, 960], [55, 800], [42, 800]]) {
    execFileSync(ffmpeg(), ['-y', '-loglevel', 'error', '-i', crudo, '-vf', `scale=${an}:-2`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', String(q), out]);
    if (fs.statSync(out).size < 130 * 1024) break;
  }
  const w = 960, h = Math.round(960 * x.alto / x.ancho / 2) * 2;
  fs.rmSync(tmp, { recursive: true, force: true });
  // Varias personas (o agentes) pueden tomar fotos a la vez: el crédito se escribe con candado.
  const candado = CRED + '.candado';
  for (let i = 0; ; i++) { try { fs.mkdirSync(candado); break; } catch (e) { if (i > 200) throw new Error('candado ocupado: ' + candado); await new Promise(r => setTimeout(r, 50)); } }
  try {
    const cred = fs.existsSync(CRED) ? JSON.parse(fs.readFileSync(CRED, 'utf8')) : {};
    cred[id] = { titulo: x.titulo, autor: x.autor, licencia: x.licencia, pagina: x.pagina, w, h };
    fs.writeFileSync(CRED, JSON.stringify(cred, null, 1) + '\n');
    rehaceDatos(cred);
  } finally { fs.rmdirSync(candado); }
  console.log(`listo media/fotos/${id}.webp ${(fs.statSync(out).size / 1024).toFixed(0)} KB, ${w}×${h} · ${x.licencia} · ${x.autor.slice(0, 60)}`);
}
function mira(id) {
  const out = path.join(os.tmpdir(), `foto-${id}.jpg`);
  execFileSync(ffmpeg(), ['-y', '-loglevel', 'error', '-i', path.join(DIR, `${id}.webp`), '-vf', 'scale=640:-2', out]);
  console.log(out);
}
const [cmd, a, b] = process.argv.slice(2);
(cmd === 'busca' ? busca(a) : cmd === 'toma' ? toma(a, b) : cmd === 'mira' ? Promise.resolve(mira(a)) : Promise.reject(new Error('uso: busca | toma | mira')))
  .catch(e => { console.error(e.message); process.exit(1); });
module.exports = { credito };
