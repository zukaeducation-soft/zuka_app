// En una evaluación el juego no avisa, mientras se responde, que la respuesta ya está bien (kit.js: VELO y velo).
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('velo: calla solo mientras está prendido', () => {
  const ctx = loadScripts(['js/games/kit.js']), VELO = get(ctx, 'VELO'), f = get(ctx, 'velo')(x => x === 3);
  assert.equal(f(3), true); VELO.on = true; assert.equal(f(3), false); VELO.on = false; assert.equal(f(3), true); assert.equal(f(4), false);
});

test('el velo se prende al dibujar en evaluación y se apaga siempre', () => {
  assert.match(read('js/exercises.js'), /ex\.exam \|\| box\.closest\('\.exam'\)\) stage\.dataset\.examen = '1'/);
  assert.match(read('js/games/kit.js'), /dataset\?\.examen\) \{[^\n]*VELO\.on = true;[^\n]*finally \{ VELO\.on = false;/);
});

test('la demostración se dibuja sin velo, el pie y el rótulo no comentan la respuesta y los armazones también callan', () => {
  const kit = read('js/games/kit.js');
  assert.match(kit, /VELO\.on = false; const d = def\.demo\(G\); VELO\.on = v;/);
  assert.match(kit, /def\.foot\?\.\(G\.r, VELO\.on \?/);
  assert.match(read('js/games/recta-kit.js'), /if \(VELO\.on\) o = \{ \.\.\.o, kicker: '' \}/);
  for (const k of ['sucesion-kit', 'codigo-kit', 'orden-kit']) assert.match(read(`js/games/${k}.js`), /const ok = velo\(/, k);
});

test('los juegos por rondas de las evaluaciones tapan su comprobación y la calificación no cambia', () => {
  const html = read('index.html');
  const all = [...new Set(require('./load').enRepo(html))].filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|conceptos|gimnasio|explora(?!-voces)/.test(f) && fs.existsSync(path.join(ROOT, f)));
  const ctx = loadScripts(['js/art.js', ...all]), GAMES = get(ctx, 'GAMES'), VELO = get(ctx, 'VELO');
  assert.equal(VELO.on, false);
  const usados = new Set(get(ctx, 'COURSES').flatMap(c => c.units.flatMap(u => (u.exam?.items || []).map(i => i.ex.game))).filter(Boolean));
  let n = 0;
  for (const g of usados) {
    const f = `js/games/${g}.js`; if (!fs.existsSync(path.join(ROOT, f))) continue;
    const s = read(f);
    if (!/roundsGame\(/.test(s) || !/^  (const|let|function) ok\b/m.test(s)) continue;
    n++;
    assert.match(s, /^  ok = velo\(ok\);/m, `${g}: su ok no está tapado en evaluación`);
  }
  assert.ok(n > 150, n);
});
