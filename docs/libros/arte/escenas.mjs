// Dibuja las escenas de los libros con las piezas de la app (Explora): cada momento de una explicación, cada «Tu turno» y
// cada ejemplo de arte/ejemplos/*.js queda como una página vectorial de tex/salida/escenas-N.pdf. arte/pasos.js arma con eso
// los capítulos. Uso: node escenas.mjs N [lecciones]   (N = 1..4). Usa playwright-core de ~/lemo-opuscar.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const AQ = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(AQ, '../../..'), OUT = path.join(AQ, '../tex/salida');
const { chromium } = createRequire(path.join(os.homedir(), 'lemo-opuscar/x.js'))('playwright-core');
const { lecciones } = createRequire(import.meta.url)('./lecciones.js');
const N = process.argv[2], solo = process.argv.slice(3), ids = solo.length ? solo : lecciones(N);
const js = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const pu = fs.readdirSync(path.join(ROOT, 'js')).filter(f => /^explora-pu-/.test(f)).map(f => 'js/' + f);
const EJD = path.join(AQ, 'ejemplos');
const ejs = fs.existsSync(EJD) ? fs.readdirSync(EJD).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(EJD, f), 'utf8')) : [];

const b = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
const pg = await b.newPage({ viewport: { width: 400, height: 900 }, reducedMotion: 'reduce' });
pg.on('pageerror', e => console.log('ERROR', e.message));
await pg.route('http://zuka.test/**', r => {
  const u = new URL(r.request().url()), f = path.join(ROOT, decodeURIComponent(u.pathname));
  return fs.existsSync(f) && fs.statSync(f).isFile() ? r.fulfill({ path: f }) : r.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset=utf8>' });
});
await pg.goto('http://zuka.test/nada');
await pg.setContent(`<!doctype html><html data-theme="light"><head><meta charset="utf8"><base href="http://zuka.test/">
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=block" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script><link rel="stylesheet" href="css/styles.css"><link rel="stylesheet" href="css/lectura.css"><link rel="stylesheet" href="css/explora.css"><style>
:root[data-theme="light"]{--c:${+N > 4 ? '#e879f9' : '#a3e635'};--c-on:#0b1424;--c-ink:#1b5aa8;--ink:#0b1424;--mute:#56637a;--line:#c3ccd9;--card:#fff;--card2:#f1f5fa;--bg:#fff;--bg2:#fff;--ok:#128a52;--fire:#d9541e;--gold:#b7791f;--bad:#c92a45;--halo:0%;--font:'Fira Sans',sans-serif;--display:'Fira Sans',sans-serif}
*{transition:none!important;animation:none!important;-webkit-print-color-adjust:exact;box-shadow:none!important;filter:none!important}
html,body{background:#fff!important;overflow:visible!important;height:auto!important;min-height:0!important;display:block!important;padding:0!important;margin:0!important;position:static!important;width:auto!important;max-width:none!important}
body>*{display:none} body>.pn{display:block}
.hj-mira.foco .hj-t:not(.on),.hj-mira.foco .hj-p{color:#66738a;opacity:1!important} .hj-mira.foco .hj-t.on{color:#0b1424!important} .hj-hoja{max-width:none!important}
.pn{width:348px;padding:4px;overflow:hidden;break-after:page;break-inside:avoid}
.xp-svg,.xd{width:340px!important;max-width:none!important;max-height:none!important;height:auto;display:block}
.pn .explora{display:block;height:auto;min-height:0;overflow:visible;width:340px;font-family:var(--font);color:var(--ink)}
.pn .xp-stage{margin:0;min-height:0;width:340px}
</style></head><body></body></html>`);
// todas las escenas de Explora (y sus kits), en el orden de la app
const orden = [...js('index.html').matchAll(/src="(js\/[^"]*)"/g)].map(m => m[1]).filter(f => (/\/explora[^/]*\.js$/.test(f) && !/voces/.test(f)) || /\/(lectura|hoja)-kit\.js$/.test(f));
const tex = (s => s.slice(s.indexOf('function tex('), s.indexOf('const svg = ')))(js('js/ui.js'));
const errs = await pg.evaluate(({ src, ejs, tex }) => {
  const out = [], add = t => { const s = document.createElement('script'); s.textContent = t; document.head.append(s); };
  window.onerror = m => { out.push(m); };
  add(`window.S={theme:'light',sound:false};var $=(s,h=document)=>h.querySelector(s);var GAMES={};var EJ={};var zk=()=>1;var esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');${tex}`);
  src.forEach(add); ejs.forEach(t => add(`{${t}}`));
  add(`window.__X=EXPLORA;window.__D=XPD;window.__P=XP;window.xpTween=(a,b,m,f,d)=>{f(b);d&&d();return()=>{}};window.xpStill=()=>true;
   for(const k in XS) if(typeof XS[k]==='function') XS[k]=()=>{};window.xpTick=()=>{};`);
  return out;
}, { tex, src: [...orden, ...pu.filter(f => !orden.includes(f))].map(f => `;${js(f)}\n`), ejs });
if (errs.length) console.log(errs.slice(0, 5));

await pg.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
const man = await pg.evaluate(async ({ ids }) => {
  const X = __X, XPD = __D, XP = __P, man = [], api = { set() {}, nota() {}, memo: {}, decir() {} };
  const st = window.setTimeout; window.setTimeout = (f, t, ...a) => st(f, Math.min(t || 0, 5), ...a);
  const caja = () => { const d = document.createElement('div'); d.className = 'pn'; d.innerHTML = '<div class="explora"><div class="xp-stage"></div></div>'; document.body.append(d); return d; };
  const espera = () => new Promise(r => st(r, 30));
  const guarda = (box, key) => {   // copia quieta de la escena en su propia página
    const d = document.createElement('div'); d.className = 'pn'; d.innerHTML = box.innerHTML;
    d.querySelectorAll('.xp-halo,.hj-band:empty').forEach(e => e.remove()); document.body.append(d);
    man.push({ key, html: d.innerHTML }); d.__k = key;
  };
  const cierra = e => { if (typeof e === 'function') try { e(); } catch (er) { /* sin importancia */ } };
  async function mira(key, p) {
    const en = { ...p.en, momentos: p.momentos };
    for (let i = 0; i < p.momentos.length; i++) {
      const d = caja();
      try {
        const e = XPD[p.escena](d.querySelector('.xp-stage'), en, XP[p.escena].ini(en), api);
        for (let k = 0; k <= i; k++) {
          const m = p.momentos[k];
          if (e.anima) await new Promise(r => { e.anima(m, r); st(r, 700); }); else e.mover(m.a ?? m.de, m);
        }
        await espera(); guarda(d, `${key}-${i}`); cierra(e);
      } catch (er) { man.push({ key: `${key}-${i}`, err: String(er) }); }
      d.remove();
    }
    if (p.escena === 'hoja') {   // la hoja con todas las marcas de la explicación
      const d = caja(), ms = p.momentos, tach = ms.flatMap(m => m.tacha || []).map(String);
      try {
        const e = XPD.hoja(d.querySelector('.xp-stage'), en, XP.hoja.ini(en), api);
        const uno = { luz: [...new Set(ms.flatMap(m => m.luz || []).map(String))].filter(x => !tach.includes(x)), tacha: ms.flatMap(m => m.tacha || []), nota: Object.assign({}, ...ms.map(m => m.nota || {})), sello: Object.assign({}, ...ms.map(m => m.sello || {})), tapa: false };
        await new Promise(r => { e.anima(uno, r); st(r, 300); }); d.querySelector('.hj').classList.remove('foco');
        guarda(d, `${key}-z`); cierra(e);
      } catch (er) { man.push({ key: `${key}-z`, err: String(er) }); }
      d.remove();
    }
  }
  async function haz(key, p) {
    for (const [suf, s] of [['i', XP[p.tipo].ini(p)], ['s', XP[p.tipo].sol(p)]]) {
      const d = caja();
      try { const e = XPD[p.tipo](d.querySelector('.xp-stage'), p, s, api); await espera(); guarda(d, `${key}-${suf}`); cierra(e); } catch (er) { man.push({ key: `${key}-${suf}`, err: String(er) }); }
      d.remove();
    }
  }
  for (const id of ids) {
    if (!X[id]) { man.push({ key: id, err: 'sin explora' }); continue; }
    for (let k = 0; k < X[id].pasos.length; k++) {
      const p = X[id].pasos[k];
      if (p.tipo === 'muestra') await mira(`${id}/${k}`, p); else if (p.tipo !== 'cierre') await haz(`${id}/${k}`, p);
    }
    for (let k = 0; k < (EJ[id] || []).length; k++) {
      const x = EJ[id][k], base = x.de != null ? X[id].pasos[x.de] : null;
      if (x.de != null && !base) { man.push({ key: `${id}/e${k}`, err: 'paso ' + x.de }); continue; }
      const escena = x.escena || (base.tipo === 'muestra' ? base.escena : base.tipo), en0 = base ? (base.en || base) : {};
      const en = { ...en0, ...x.en, ...(escena === 'dibujo' ? { v: { ...en0.v, ...(x.en && x.en.v), ...x.v } } : {}) };
      await mira(`${id}/e${k}`, { escena, en, momentos: x.m.map(([dice, d = {}]) => ({ dice, ...(escena === 'dibujo' ? { v: d } : d) })) });
    }
  }
  await document.fonts.ready; await Promise.all([...document.fonts].map(f => f.load().catch(() => 0)));
  // recorte: cada grupo de cuadros pierde el aire de arriba y de abajo, igual en todos para que se puedan comparar
  const gr = {};
  document.querySelectorAll('body>.pn').forEach(d => { const v = d.querySelector('.xp-stage>svg:only-child'); if (v) (gr[d.__k.replace(/-[0-9is]+$/, '')] ||= []).push([v, v.getBBox(), v.viewBox.baseVal]); });
  for (const l of Object.values(gr)) {
    const H = l[0][2].height; if (l.some(q => q[2].height !== H)) continue;
    const bb = l.filter(q => q[1].height > 0); if (!bb.length) continue;
    const a = Math.max(0, Math.min(...bb.map(q => q[1].y)) - 5), z = Math.min(H, Math.max(...bb.map(q => q[1].y + q[1].height)) + 5);
    l.forEach(q => { q[0].setAttribute('viewBox', `0 ${a} 340 ${z - a}`); q[0].style.height = `${z - a}px`; });
  }
  const css = []; let i = 0, last = null;
  document.querySelectorAll('body>.pn').forEach(d => {
    const h = Math.ceil(d.getBoundingClientRect().height + 1), m = man.find(q => q.key === d.__k && !q.err);
    m.h = h; m.hj = !!d.querySelector('.hj'); m.pag = ++i; d.style.page = 'q' + i; css.push(`@page q${i}{size:348px ${m.hj ? Math.ceil(h * 1.7 + 60) : h + 1}px;margin:0}`); last = d;
  });
  if (last) last.style.breakAfter = 'auto';
  const s = document.createElement('style'); s.textContent = css.join('\n'); document.head.append(s);
  const plano = x => (typeof x === 'function' ? undefined : x);
  const datos = Object.fromEntries(ids.filter(i => X[i]).map(i => [i, { x: JSON.parse(JSON.stringify(X[i], (k, v) => plano(v))), e: JSON.parse(JSON.stringify(EJ[i] || [], (k, v) => plano(v))) }]));
  return { man, datos };
}, { ids });
const E = man.man.filter(m => m.err);
E.slice(0, 20).forEach(m => console.log(m.key, m.err));
console.log(`libro ${N}: ${man.man.length} escenas, ${E.length} errores`);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, `escenas-${N}.json`), JSON.stringify(man));
await pg.pdf({ path: path.join(OUT, `escenas-${N}.pdf`), preferCSSPageSize: true, printBackground: true });
await b.close();
// las hojas de lectura se recortan a lo que ocupan
execFileSync('python', ['-X', 'utf8', path.join(AQ, 'recorta.py'), path.join(OUT, `escenas-${N}`)], { stdio: 'inherit' });
