// Conceptos animados del gimnasio (spec 2026-11-20-preuda-razonamiento-diez): todo `concept` de un paso existe, cada concepto
// trae título, una escena que se dibuja y un rótulo por tiempo, y en los mundos rehechos cada reto lleva concepto.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|conceptos|gimnasio/.test(f));
const ctx = loadScripts(all);
const CONCEPTOS = get(ctx, 'CONCEPTOS'), CON = get(ctx, 'CON'), RETOS = get(ctx, 'GYM_RETOS'), DIEZ = get(ctx, 'PU_DIEZ');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'razonamiento');

test('el motor está registrado antes del gimnasio y la tarjeta se abre desde el paso', () => {
  assert.ok(html.indexOf('js/conceptos.js') < html.indexOf('js/gimnasio.js') && html.indexOf('js/conceptos.js') > 0);
  assert.ok(sw.includes("'js/conceptos.js'"));
  const gym = read('js/gimnasio.js');
  assert.match(gym, /data-concept/);
  assert.match(gym, /CON\.open\(root, s\.concept\)/);
  assert.match(gym, /classList\.add\('pulse'\)/, 'al fallar, el botón del concepto late');
  assert.match(read('js/conceptos.js'), /prefers-reduced-motion/);
});

test('cada concepto: título, escena de un tipo conocido que se dibuja y un rótulo por tiempo', () => {
  const ids = Object.keys(CONCEPTOS);
  assert.ok(ids.length >= 1);
  for (const id of ids) {
    const c = CONCEPTOS[id];
    assert.ok(c.title?.length >= 6 && c.title.length <= 40, `${id}: título`);
    assert.ok(CON.types.includes(c.scene?.type), `${id}: tipo ${c.scene?.type}`);
    assert.ok(c.beats.length >= 2 && c.beats.length <= 5, `${id}: ${c.beats.length} tiempos`);
    for (const b of c.beats) { assert.ok(b.length >= 15 && b.length <= 130, `${id}: rótulo «${b}»`); assert.equal((b.match(/\$/g) || []).length % 2, 0, id); }
    const svg = CON.svg(id);
    assert.match(svg, /^<svg viewBox="0 0 320 170"/, id);
    assert.ok(!/undefined|NaN/.test(svg), `${id}: el dibujo tiene datos sin definir`);
    assert.equal(CON.maxBeat(id), c.beats.length - 1, `${id}: el dibujo usa ${CON.maxBeat(id) + 1} tiempos y hay ${c.beats.length} rótulos`);
  }
});

test('retos: todo concepto citado existe, y en los mundos rehechos cada reto lleva concepto en algún paso', () => {
  for (const r of RETOS) for (const s of r.steps) if (s.concept) assert.ok(CONCEPTOS[s.concept], `${r.id}: no existe el concepto ${s.concept}`);
  for (const u of units.filter(u => DIEZ.includes(u.world))) {
    const ids = u.lessons.map(l => l.id), mine = RETOS.filter(r => r.after.some(a => ids.includes(a)));
    assert.ok(mine.length >= 1, `${u.world}: sin reto en el gimnasio`);
    for (const r of mine) assert.ok(r.steps.some(s => s.concept), `${r.id}: ningún paso con concepto`);
  }
});

test('el concepto de un paso no trae la respuesta de ese mismo paso (se abre con un toque)', () => {
  for (const r of RETOS) r.steps.forEach((s, i) => {
    if (!s.concept || !s.note) return;
    const c = CONCEPTOS[s.concept], text = c.beats.join(' ') + ' ' + JSON.stringify(c.scene);
    for (const [, a, b] of s.note.matchAll(/(\d+)\s*\/\s*(\d+)/g)) for (const f of [`${a}/${b}`, `{${a}}{${b}}`])
      assert.ok(!text.includes(f), `${r.id} paso ${i + 1}: el concepto ${s.concept} trae ${a}/${b}`);
  });
});
