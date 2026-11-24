// Voz de las explicaciones Explora (spec 2026-11-23-explora-leccion-interactiva, sección «Voz»): el texto hablado de cada frase
// (sin símbolos que la voz leería mal) y que el reproductor use la voz cuando existe y siga igual cuando no.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./load');
const { hablar } = require('../tools/explora-habla');
const { frases } = require('../tools/explora-frases');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

test('las fórmulas y los símbolos se dicen con palabras', () => {
  assert.equal(hablar('Salimos de −4: llegamos a 1.'), 'Salimos de menos 4: llegamos a 1.');
  assert.equal(hablar('$-4 + 5 = 1$'), 'menos 4 más 5 igual a 1');
  assert.equal(hablar('$(-3) \\cdot (-4) = 12$'), 'menos 3 por menos 4 igual a 12');
  assert.equal(hablar('(−3)(−4) = 12'), 'menos 3 por menos 4 igual a 12');
  assert.equal(hablar('un cuarto de vuelta es π/2.'), 'un cuarto de vuelta es pi medios.');
  assert.equal(hablar('$90^\\circ$'), '90 grados');
  assert.equal(hablar('$e \\in V$'), 'e pertenece a V');
  assert.equal(hablar('Sumar **es caminar**.'), 'Sumar es caminar.');
  assert.match(hablar('$-3^2$'), /menos 3 al cuadrado/);
});

test('pu-cm-1: ninguna frase hablada lleva símbolos que la voz leería mal', () => {
  const f = frases('pu-cm-1');
  assert.ok(f.length >= 40);
  for (const { t, h } of f) {
    assert.ok(!/[$\\|{}−×÷·∈∉π°]/.test(h), `«${t}» se diría «${h}»`);
    assert.ok(!/(^|\s)-(\s|\d)/.test(h), `guion suelto en «${h}»`);
  }
  // −3² y (−3)² no pueden sonar igual.
  const det = f.find(x => /Un detalle/.test(x.t)).h;
  assert.match(det, /sin paréntesis/);
});

test('el reproductor dice cada frase si hay audio y, si no, sigue con el tiempo de lectura', () => {
  const src = read('js/explora.js');
  assert.match(src, /xpVozFuentes\(lesson\.id, location\.hostname\)/);   // de dónde sale la voz: tests/voz-bunny.test.js
  const m = src.slice(src.indexOf('XPD.muestra ='), src.indexOf('XPD.signos ='));
  assert.match(m, /api\.decir\(m\.dice/, 'cada momento dice su frase');
  assert.match(m, /habla \? 450 : XP\.muestra\.pausa\(m\)/, 'con voz manda la voz; sin voz, el tiempo de lectura');
  assert.match(src, /S\.sfx === false\)\) return false/,'el botón de sonido también calla la voz');
  assert.match(src, /destroy\(\) \{ muerto = true; clean\?\.\(\); clean = null; silencio\(\);/, 'al salir no sigue hablando');
  assert.match(src, /lista\.then\(va\); setTimeout\(va, 800\)/, 'espera la lista de voces para decir el primer enunciado');
});

test('los archivos de trabajo no van a GitHub, la lección 1 queda de respaldo y el generador usa la voz pedida', () => {
  const gi = read('.gitignore');
  assert.match(gi, /^media\/voz\/\*\/frases\.json$/m);
  assert.ok(fs.existsSync(path.join(ROOT, 'media/voz/pu-cm-1/voz.json')), 'la lista de voces de pu-cm-1 está en el repositorio');
  const py = read('tools/explora-voz.py');
  assert.match(py, /MODEL, VOICE, TEMP = 'gemini-3\.8-flash-tts', 'Cruz', 1\.45/);
  assert.match(py, /'api_version': 'v1beta'/);
  assert.ok(!/AIza[0-9A-Za-z_-]{20,}/.test(py), 'ninguna llave en el repositorio');
});
