// Preuniversitario UdeA · razonamiento lógico, mundos 2 a 16: un video por lección (spec 2026-11-19-preuda-videos-razonamiento).
// Proyecto video/preuda-cosmos: cada película es films/<nombre>.data.js (guion) + films/<nombre>.js (escenas). Mismo formato que
// el mundo 1 (tests/preuda-videos-mundo-1.test.js): 4 a 5 minutos, diez escenas, un reto al inicio que se resuelve al final y al
// menos otro problema en medio, con tarjetas que solo muestran el enunciado (sin decir que viene del examen o de un taller).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const dir = 'video/preuda-cosmos';
const html = read('index.html');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const C = get(ctx, 'COURSES').find(c => c.id === 'preuda');
const lessons = C.units.flatMap(u => u.lessons.map(l => ({ ...l, unit: u })));
const lesson = id => lessons.find(l => l.id === id);
const MUNDO1 = ['enteros', 'fracciones', 'porcentajes', 'potencias'];
const films = fs.readdirSync(path.join(ROOT, dir, 'films')).filter(f => f.endsWith('.data.js')).map(f => f.replace('.data.js', '')).filter(f => !MUNDO1.includes(f));
const data = Object.fromEntries(films.map(f => [f, require(`../${dir}/films/${f}.data.js`)]));
// Mundos terminados: cada lección tiene su película (se amplía a medida que se hacen los mundos).
const HECHOS = ['pu-calculo', 'pu-geometria'];

test('cada lección de los mundos terminados tiene su película, y ninguna lección tiene dos', () => {
  const byLesson = {};
  for (const f of [...films, ...MUNDO1]) { const L = require(`../${dir}/films/${f}.data.js`).LESSON; assert.ok(!byLesson[L], `${L}: ${byLesson[L]} y ${f}`); byLesson[L] = f; }
  for (const u of C.units.filter(u => HECHOS.includes(u.world))) for (const l of u.lessons) assert.ok(byLesson[l.id], `${l.id} (${l.title}) no tiene película`);
});

for (const name of films) {
  test(`${name}: formato del curso`, () => {
    const D = data[name], film = read(`${dir}/films/${name}.js`), L = lesson(D.LESSON);
    assert.ok(L, D.LESSON); assert.equal(L.unit.block, 'razonamiento');
    assert.ok(D.DUR >= 240 && D.DUR <= 300, String(D.DUR));
    assert.equal(D.SCENES.length, 10);
    assert.equal(D.SCENES[0].id, 'reto'); assert.equal(D.SCENES.at(-1).id, 'cierre');
    const n = C.units.filter(u => u.block === 'razonamiento').indexOf(L.unit) + 1;
    assert.equal(D.WORLD, `RAZONAMIENTO LÓGICO · MUNDO ${n}`);
    for (const s of D.SCENES) {
      assert.ok(film.includes(`\n  ${s.id}(t) {`), `falta la escena ${s.id}`);
      assert.ok(s.name.length <= 30 && !/[¿?]/.test(s.name), s.name);
      s.caps.forEach(([a, b, title, sub], i) => {
        assert.ok(a >= 0.5 && b <= s.dur - 0.4 && b - a >= 5 && title.length <= 36 && sub.length <= 58, `${s.id}: ${title} / ${sub}`);
        if (i) assert.ok(a >= s.caps[i - 1][1] + 0.3);
      });
      for (const [a, b, txt] of s.narr) assert.ok(txt.split(/\s+/).length / (b - a) <= 3.4, `${s.id}: ${txt.slice(0, 50)}`);
    }
    const txt = D.SCENES.flatMap(s => [...s.caps.flatMap(c => c.slice(2)), ...s.narr.map(n => n[2])]).join(' ');
    assert.ok(!/[¿?]/.test(txt), 'sin preguntas al espectador');
    assert.doesNotThrow(() => new (require('vm').Script)(film));
    assert.ok((film.match(/examCard\(t,/g) || []).length >= 2, 'el reto y al menos otro problema con tarjeta');
    assert.match(film, /examCard\(t, \{ tag: 'RETO'/);
    const names = D.SCENES.map(s => s.name).join(' ');
    assert.ok(!/examen|taller|admisi|universidad|udea|simulacro|pregunta real/i.test(txt + ' ' + names), `${name}: menciona el examen o el taller`);
    assert.ok(!/UdeA|year:|simulacro/i.test(film.replace(/\/\/.*$/gm, '')), `${name}: la tarjeta no dice de dónde sale`);
    assert.ok(D.TITLE.length <= 34 && D.LINE.length <= 48, D.TITLE);
  });
}

test('los ejemplos de los videos no salen en los ejercicios de su lección', () => {
  for (const name of films) {
    const D = data[name], ex = JSON.stringify(lesson(D.LESSON).ex), nums = new Set(ex.match(/\d+(?:\.\d+)?/g) || []);
    assert.ok(Array.isArray(D.KEYS) && D.KEYS.length >= 2, `${name}: KEYS`);
    for (const k of D.KEYS) assert.ok(/^\d+(\.\d+)?$/.test(k) ? !nums.has(k) : !ex.includes(k), `${name}: «${k}» sale en los ejercicios de ${D.LESSON}`);
  }
});

test('la matemática de los videos: Geometría', () => {
  const r = Math.PI / 180;
  // Ángulos: la cadena de isósceles AB = BC = CD = DE con A = 17° (UdeA 2025-2), el polígono de 150° y el reloj de las 3:30.
  let a = 17, b = 2 * a, c = a + b; assert.deepEqual([b, c], [34, 51]);
  assert.equal(360 / (180 - 150), 12); assert.equal((12 - 2) * 180 / 12, 150);
  assert.equal(Math.abs(180 - (90 + 30 * 0.5)), 75);
  assert.equal(180 - 50 - 60, 70); assert.equal((5 - 2) * 180, 540); assert.equal((6 - 2) * 180, 720);
  // Pitágoras: la escalera (13, base 5 → 12; base 12 → 5), 5 y 9 → 9 valores, el rombo 10 y 24 → 52, 45° y 30°-60°.
  assert.equal(Math.sqrt(13 ** 2 - 5 ** 2), 12); assert.equal(Math.sqrt(13 ** 2 - 12 ** 2), 5);
  assert.equal([...Array(30).keys()].filter(x => x > 9 - 5 && x < 9 + 5).length, 9);
  assert.equal(4 * Math.hypot(5, 12), 52);
  assert.ok(Math.abs(7 * Math.SQRT2 - 9.9) < 0.01 && Math.abs(4 * Math.sqrt(3) - 6.93) < 0.01);
  // Semejanza: el vaso (1/2)³, el poste 3/4 = h/28, el lado + 30 %, el corte 4:6 = 6:9.
  assert.equal(0.5 ** 3, 1 / 8); assert.equal(28 * 3 / 4, 21); assert.ok(Math.abs(1.3 ** 2 - 1.69) < 1e-12); assert.equal(6 / 4, 9 / 6);
  // Áreas: la pista 2 · 100 + π · 60, la ventana 2 + π/2, el patio 7 × 4, paralelogramo, triángulo y trapecio.
  assert.ok(Math.abs(2 * 100 + Math.PI * 60 - 388.5) < 0.1);
  assert.ok(Math.abs(2 * 1 + Math.PI * 1 ** 2 / 2 - (2 + Math.PI / 2)) < 1e-12);
  assert.ok(2 * (6 + 4) === 20 && 6 * 4 === 24 && 7 * 5 === 35 && 9 * 4 / 2 === 18 && (11 + 5) * 4 / 2 === 32);
  // Sombreadas: 64 − 16π, el pentágono 21, el triángulo torcido 13, la ele 43, el octágono 28 y 16 − 4π.
  const shoelace = p => Math.abs(p.reduce((s, [x, y], i) => { const [u, v] = p[(i + 1) % p.length]; return s + x * v - u * y; }, 0)) / 2;
  assert.equal(shoelace([[0, 0], [4, 0], [6, 3], [2, 5], [0, 3]]), 21);
  assert.equal(shoelace([[0, 0], [6, 2], [2, 5]]), 13);
  assert.equal(shoelace([[0, 0], [9, 0], [9, 3], [4, 3], [4, 7], [0, 7]]), 43);
  assert.equal(shoelace([[2, 0], [4, 0], [6, 2], [6, 4], [4, 6], [2, 6], [0, 4], [0, 2]]), 28);
  assert.ok(Math.abs(64 - 16 * Math.PI - 13.73) < 0.01 && Math.abs(16 - 4 * Math.PI - 3.43) < 0.01);
  // Volúmenes: la vela (72π ÷ 2π/3 = 108), la caja (14 · 8 · 3), el cubo de 150 cm², la piedra y la esfera.
  assert.equal(Math.round((Math.PI * 9 * 8) / (Math.PI * 1 * 2 / 3)), 108);
  assert.equal((20 - 6) * (14 - 6) * 3, 336);
  assert.equal(Math.cbrt((150 / 6) ** 1.5) ** 2, 25); assert.equal(Math.sqrt(150 / 6) ** 3, 125);
  assert.equal(10 ** 2 * 2, 200); assert.equal(4 / 3 * 216, 288); assert.equal(16 * 3, 48);
  assert.ok(Math.abs(Math.sin(17 * r)) > 0);
});
