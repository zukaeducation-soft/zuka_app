// Capturas reales de la app para el reel (video-shotcraft, etapa 4). App servida en http://localhost:5198.
// Uso: node tools/capture.mjs [parte…]   partes: home juegos balanza preu clips leccion escritorio
// Deja public/tex/*.jpg|png y public/tex/layout.json (cajas en px CSS del celular 390 × 844).
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire('C:/Users/User Acer/lemo-opuscar/package.json');
const { chromium } = require('playwright-core');

const BASE = process.env.BASE || 'http://localhost:5198/';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'tex');
fs.mkdirSync(OUT, { recursive: true });
const LAY = path.join(OUT, 'layout.json');
const layout = fs.existsSync(LAY) ? JSON.parse(fs.readFileSync(LAY, 'utf8')) : {};
const save = () => fs.writeFileSync(LAY, JSON.stringify(layout, null, 1));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const want = process.argv.slice(2);
const doIt = (k) => !want.length || want.includes(k);
// Estudiante nuevo, sin datos personales (invitado), modo revisión para abrir cualquier lección.
const STATE = { tourDone: true, guest: true, theme: 'dark', guideAuto: false, unlockAll: true, sfx: false, name: 'Estudiante' };

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
async function page({ w = 390, h = 844, dpr = 3, query = '?app', state = STATE } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr, colorScheme: 'dark', serviceWorkers: 'block' });
  await ctx.addInitScript((s) => { sessionStorage.setItem('zuka-intro', '1'); localStorage.setItem('zuka-v1', s); }, JSON.stringify(state));
  const p = await ctx.newPage();
  p.on('pageerror', (e) => console.log('  error en la página:', String(e).slice(0, 160)));
  await p.goto(BASE + query + (query.includes('?') ? '&' : '?') + 'cap=' + Date.now(), { waitUntil: 'load', timeout: 120000 });
  await p.waitForSelector('#view > *', { timeout: 60000 }).catch(() => {});
  await p.evaluate(() => document.fonts.ready); await wait(1000);
  return p;
}
const box = (p, sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, sel);
const shot = async (p, name, type = 'jpeg') => { await p.screenshot({ path: path.join(OUT, `${name}.${type === 'jpeg' ? 'jpg' : 'png'}`), type, ...(type === 'jpeg' ? { quality: 92 } : {}) }); console.log('·', name); };
// Abre un ejercicio suelto (sin video) y espera a que el juego esté montado.
async function exercise(p, course, lid, i) {
  await p.evaluate(([course, lid, i]) => {
    const c = COURSES.find((x) => x.id === course); const l = c.units.flatMap((u) => u.lessons).find((x) => x.id === lid);
    startLesson(c, { ...l, clip: { scenes: [{ d: 1, text: '' }] }, ex: [l.ex[i]], more: [] });
    document.querySelector('.clip-skip')?.click();
  }, [course, lid, i]);
  await p.waitForFunction(() => document.querySelector('.ex-area canvas') || document.querySelector('.ex-area')?.children.length, null, { timeout: 10000 }).catch(() => {});
  await wait(1600);
}

if (doIt('home')) {
  const p = await page();
  await shot(p, 'home');
  // en el reel no se muestran los conteos de cada curso (los cursos nuevos aún tienen pocas lecciones)
  await p.addStyleTag({ content: '.hc-stats{display:none !important}' }); await wait(300);
  const n = await p.evaluate(() => document.querySelectorAll('.hc-card').length);
  layout.courses = [];
  for (let i = 0; i < n; i++) {
    const h = (await p.$$('.hc-card'))[i]; await h.scrollIntoViewIfNeeded(); await wait(250);
    await h.screenshot({ path: path.join(OUT, `course-${i}.png`), omitBackground: true });
    layout.courses.push(await h.evaluate((e) => ({ name: e.querySelector('h3, .hc-body b, .hc-body strong')?.textContent || e.textContent.trim().slice(0, 40), w: e.getBoundingClientRect().width, h: e.getBoundingClientRect().height })));
  }
  console.log('· cursos', n); save();
  await p.context().close();
}

// Pantallas de juegos de varios cursos para el muro (celular a 2x).
if (doIt('juegos')) {
  const p = await page({ dpr: 2 });
  const picks = await p.evaluate(() => {
    const out = [], seen = new Set();
    const pref = ['preuda', 'algebra', 'trig', 'calc', 'geo'];
    for (const cid of pref) {
      const c = COURSES.find((x) => x.id === cid); let k = 0;
      for (const u of c.units) for (const l of u.lessons) (l.ex || []).forEach((e, i) => {
        if (e.type !== 'play' && !e.game) return; const g = e.game; if (!g || seen.has(g) || (typeof GUIDE_ARCADE !== 'undefined' && GUIDE_ARCADE.has(g)) || /examen|solucion|caza|lec|texto|anticipa|mapa|donde|lupa|palabra|hilo|termometro/.test(g)) return;
        if ((k++ % 7) !== 3) return; seen.add(g); out.push([cid, l.id, i, g]);
      });
    }
    return out.slice(0, 24);
  });
  layout.games = [];
  for (const [cid, lid, i, g] of picks) {
    await exercise(p, cid, lid, i);
    const name = `game-${layout.games.length}`;
    await shot(p, name); layout.games.push({ name, course: cid, lesson: lid, game: g });
    await p.evaluate(() => { document.querySelector('#overlay')?.classList.remove('open'); window.lessonClose = null; document.body.classList.remove('in-lesson'); });
  }
  save(); await p.context().close();
}

// La balanza de la proporción en vivo: se arrastra x hasta equilibrarla, cuadro a cuadro, y se comprueba.
if (doIt('balanza')) {
  const p = await page();
  await exercise(p, 'algebra', 'alg-12e', 0);
  const info = await p.evaluate(() => {
    const l = COURSES.find((x) => x.id === 'algebra').units.flatMap((u) => u.lessons).find((x) => x.id === 'alg-12e');
    const cv = document.querySelector('.ex-area canvas'), r = cv.getBoundingClientRect();
    return { params: l.ex[0].params, q: l.ex[0].q, r: { x: r.x, y: r.y, w: r.width, h: r.height } };
  });
  const { params, r } = info, sol = (params.a * params.d) / params.b;
  const W = r.w, X = (x) => r.x + (30 + ((x - params.min) / (params.max - params.min)) * (W - 60)) * (r.w / W), Y = r.y + r.h * 0.86;
  let x0 = Math.round((params.min + params.max) / 2);
  const frames = [];
  const grab = async (cx, cy, down) => { const name = `bal-${frames.length}`; await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 92 }); frames.push({ name, cx, cy, down }); };
  await grab(X(x0), Y, false); await wait(300); await grab(X(x0), Y, false);
  await p.mouse.move(X(x0), Y); await p.mouse.down(); await wait(120); await grab(X(x0), Y, true);
  // pasa de largo, vuelve y se queda en la solución (como lo haría una persona)
  const over = Math.min(params.max, sol + Math.max(2, Math.round((params.max - params.min) * 0.12)));
  const path1 = [];
  for (let k = 1; k <= 12; k++) path1.push(x0 + ((over - x0) * k) / 12);
  for (let k = 1; k <= 6; k++) path1.push(over + ((sol - over) * k) / 6);
  for (const x of path1) { await p.mouse.move(X(x), Y, { steps: 2 }); await wait(70); await grab(X(x), Y, true); }
  await p.mouse.up(); for (let k = 0; k < 8; k++) { await wait(90); await grab(X(sol), Y, false); }
  layout.balanza = { params, sol, frames, canvas: r };
  await p.evaluate(() => [...document.querySelectorAll('button')].find((b) => /comprobar/i.test(b.textContent))?.click());
  await wait(900); await shot(p, 'bal-ok');
  layout.balanza.check = await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find((b) => /continuar|siguiente/i.test(b.textContent)); return null; });
  save(); await p.context().close();
}

// Preuniversitario: zona de examen y lectura (celular).
if (doIt('preu')) {
  const p = await page();
  const list = [['preu-sol', 'preuda', 'pu-cm-1', 8], ['preu-opc', 'preuda', 'pu-cm-1', 10], ['preu-lec', 'preuda', 'pu-el-1', 0], ['preu-geo', 'preuda', 'pu-ge-1', 6], ['preu-pita', 'preuda', 'pu-ge-2', 1]];
  for (const [name, c, l, i] of list) {
    await exercise(p, c, l, i); await shot(p, name);
    await p.evaluate(() => { document.querySelector('#overlay')?.classList.remove('open'); window.lessonClose = null; document.body.classList.remove('in-lesson'); });
  }
  // el componente elegido: tarjetas de Razonamiento lógico y Comprensión lectora
  await p.evaluate(() => { S.course = 'preuda'; go('learn'); }); await wait(1200); await shot(p, 'preu-comp');
  await p.context().close();
}

if (doIt('clips')) {
  const p = await page();
  await p.evaluate(() => go('clips')); await wait(2500); await shot(p, 'clips');
  await p.context().close();
}

// Una lección: el video vertical (escenas de respaldo si el video de Bunny no carga).
if (doIt('leccion')) {
  const p = await page();
  await p.evaluate(() => { const c = COURSES.find((x) => x.id === 'algebra'); const l = c.units.flatMap((u) => u.lessons).find((x) => x.id === 'alg-12e'); startLesson(c, l); });
  await wait(4500); await shot(p, 'leccion-video');
  await p.context().close();
}

// Portátil: presentación y una lección con juego (1440 × 900 a 2x).
if (doIt('escritorio')) {
  let p = await page({ w: 1440, h: 900, dpr: 2, query: '?presentacion', state: { tourDone: true, theme: 'dark' } });
  await p.waitForSelector('#landing .pz-hero', { timeout: 60000 });
  await p.evaluate(() => document.querySelectorAll('.pz-rev').forEach((r) => r.classList.add('in'))); await wait(900);
  await shot(p, 'desk-landing'); await p.context().close();
  p = await page({ w: 1440, h: 900, dpr: 2 });
  await exercise(p, 'algebra', 'alg-12e', 0); await wait(800); await shot(p, 'desk-juego');
  await p.evaluate(() => { document.querySelector('#overlay')?.classList.remove('open'); window.lessonClose = null; document.body.classList.remove('in-lesson'); });
  await exercise(p, 'preuda', 'pu-el-1', 2); await wait(800); await shot(p, 'desk-lectura');
  await p.context().close();
}
await browser.close();
console.log('listo');
