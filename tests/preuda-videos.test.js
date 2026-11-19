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
const HECHOS = ['pu-calculo', 'pu-geometria', 'pu-orden', 'pu-proporcion', 'pu-conteo', 'pu-espacial', 'pu-secuencias', 'pu-codigos', 'pu-graficas'];

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

test('la matemática de los videos: Acertijos de orden (se prueban todos los acomodos)', () => {
  const perms = a => (a.length < 2 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
  // Cinco sillas: Ana no en extremo; Beto justo a la derecha de Carla; Diego antes que Elsa; Elsa no junto a Ana.
  const sillas = perms([...'ABCDE']).map(p => p.join('')).filter(s => { const i = c => s.indexOf(c); return i('A') > 0 && i('A') < 4 && i('B') === i('C') + 1 && i('D') < i('E') && Math.abs(i('E') - i('A')) > 1; });
  assert.deepEqual(sillas.sort(), ['CBADE', 'DACBE']);
  // Estaturas: Diana < Carlos < Esteban y Carlos < Fabio < Esteban.
  const alt = perms([...'CDEF']).map(p => p.join('')).filter(s => { const h = c => s.indexOf(c); return h('C') > h('D') && h('C') < h('E') && h('F') > h('C') && h('F') < h('E'); });
  assert.deepEqual(alt, ['DCFE']);
  // Carrera de cinco: Andrés dos antes que Bruno, Camilo justo después de Daniel, Esteban ni primero ni último.
  const car = perms([...'ABCDE']).map(p => p.join('')).filter(s => { const i = c => s.indexOf(c); return i('B') === i('A') + 2 && i('C') === i('D') + 1 && i('E') > 0 && i('E') < 4; });
  assert.deepEqual(car.sort(), ['AEBDC', 'DCAEB']); assert.ok(car.every(s => s.indexOf('B') === s.indexOf('E') + 1));
  // Tres parejas en una mesa de 6 (puesto k + 1 a la derecha de k, mirando al centro); con la convención contraria, igual.
  for (const dir of [1, -1]) {
    const ok = perms(['K', 'S', 'T', 'R', 'N']).map(p => ['J', ...p]).filter(m => { const at = n => m.indexOf(n), opp = (a, b) => (at(a) + 3) % 6 === at(b), nb = (a, b) => [1, 5].includes((at(a) - at(b) + 6) % 6);
      return opp('J', 'K') && opp('S', 'T') && opp('R', 'N') && nb('T', 'R') && at('N') === (at('J') + dir + 6) % 6; });
    assert.equal(ok.length, 1); const m = ok[0]; assert.equal(m[(m.indexOf('S') - dir + 6) % 6], 'N');
  }
  // Mesa cuadrada: la guitarra es de Tomás en todos los acomodos.
  const ins = perms(['guitarra', 'piano', 'violín', 'flauta']);
  const gu = new Set();
  for (const m of perms([...'STVN'])) for (const s of ins) {
    const at = n => m.indexOf(n), opp = (a, b) => (at(a) + 2) % 4 === at(b), nb = (a, b) => (at(a) - at(b) + 4) % 2 === 1, who = x => m[s.indexOf(x)];
    if (opp(who('piano'), 'T') && nb('S', 'N') && nb(who('guitarra'), 'V') && who('flauta') !== 'T') gu.add(who('guitarra'));
  }
  assert.deepEqual([...gu], ['T']);
  // Tablas: Natalia ingeniera en Medellín; las cajas roja 12 y verde 5.
  const sol = [];
  for (const pr of perms(['med', 'abo', 'ing'])) for (const ci of perms(['Bog', 'Cal', 'Med'])) {
    const P = { L: pr[0], M: pr[1], N: pr[2] }, Q = { L: ci[0], M: ci[1], N: ci[2] }, abo = Object.keys(P).find(k => P[k] === 'abo'), ing = Object.keys(P).find(k => P[k] === 'ing');
    if (Q[abo] === 'Cal' && Q.M === 'Bog' && Q.N !== 'Cal' && Q[ing] !== 'Bog') sol.push(P.N + Q.N);
  }
  assert.deepEqual(sol, ['ingMed']);
  const cajas = perms([3, 5, 8, 12]).filter(([r, a, v, n]) => r > a && v + a === n && v !== 3);
  assert.deepEqual(cajas, [[12, 3, 5, 8]]);
  // Condiciones: la bibliotecaria (30 acomodos; con C en 1 y F en 2 quedan 6, todos con E en el 3), el equipo y la carrera.
  let base = 0; const con = [];
  for (let m = 0; m < 729; m++) {
    const e = [...'ABCDEF'].map((_, i) => Math.floor(m / 3 ** i) % 3 + 1), d = Object.fromEntries([...'ABCDEF'].map((l, i) => [l, e[i]])), cnt = [1, 2, 3].map(k => e.filter(x => x === k).length);
    if (Math.min(...cnt) < 1 || Math.max(...cnt) > 3 || d.A === d.B || d.C !== d.D || !(d.E > d.F)) continue;
    base++; if (d.C === 1 && d.F === 2) con.push(d);
  }
  assert.equal(base, 30); assert.equal(con.length, 6); assert.ok(con.every(d => d.E === 3)); assert.ok(con.some(d => d.A !== 1));
  const eq = []; for (let m = 0; m < 64; m++) { const s = [...'ABCDEF'].filter((_, i) => m >> i & 1); if (s.length === 4 && !(s.includes('A') && s.includes('B')) && (!s.includes('C') || s.includes('D')) && (s.includes('E') !== s.includes('F'))) eq.push(s.join('')); }
  assert.deepEqual(eq.sort(), ['ACDE', 'ACDF', 'BCDE', 'BCDF']);
  const ca = perms([...'PJCL']).map(p => p.join('')).filter(s => { const i = c => s.indexOf(c); return i('P') < i('J') && i('C') < i('J') && i('L') < i('P'); });
  assert.deepEqual(ca.sort(), ['CLPJ', 'LCPJ', 'LPCJ']); assert.ok(ca.filter(s => s.indexOf('C') > s.indexOf('P')).every(s => s.indexOf('C') === 2));
});

test('la matemática de los videos: Proporcionalidad y porcentajes', () => {
  const near = (a, b) => Math.abs(a - b) < 1e-6;
  // Razones: el salón 3k : 5k → (3k + 6) : 5k = 3 : 4; la herencia 2 : 3 : 5; la escala; el producto cruzado; a/c.
  const k = [...Array(50).keys()].find(k => k && 4 * (3 * k + 6) === 3 * 5 * k); assert.equal(k, 8); assert.equal(5 * k, 40);
  assert.equal(18 / (5 - 2) * 10, 60); assert.equal(6 * 50000 / 100 / 1000, 3); assert.equal(60 / 4, 15); assert.ok(near(2 / 3 * 4 / 5, 8 / 15));
  assert.ok(840000 / 7 * 3 === 360000 && 840000 / 7 * 4 === 480000);
  // Regla de tres: los obreros (16 días), las llaves (10 h), la compuesta (1 440), la receta y los pintores.
  assert.equal(4 + (6 * 12 - 6 * 4) / 4, 16); assert.equal(8 * 15 / 12, 10); assert.equal(600 / 4 / 5 * 6 * 8, 1440);
  assert.equal(200 * 30 / 12, 500); assert.equal(3 * 8 / 4, 6);
  // Velocidad y trabajo: el tanque (1/6 + 1/3 − 1/4 = 1/4 → 4 h), los trenes, el alcance, el bus y las obreras.
  assert.ok(near(1 / (1 / 6 + 1 / 3 - 1 / 4), 4)); assert.equal(70 * 360 / (70 + 50), 210); assert.equal(15 * 2 / (45 - 15), 1);
  assert.equal(240 / (120 / 60 + 120 / 40), 48); assert.ok(near(1 / (1 / 10 + 1 / 15), 6)); assert.equal(80 * 3, 240);
  // Porcentajes: la elección (20 000), el tanque (120 L), lo que queda (40 L), el grupo (16 %), 18 de 24.
  assert.ok(near(6600 / 0.55 / 0.6, 20000)); assert.ok(near(30 / (0.65 - 0.40), 120)); assert.ok(near(26 / 0.65, 40));
  assert.ok(near(0.4 * 25 + 0.6 * 10, 16)); assert.equal(18 / 24 * 100, 75); assert.ok(near(0.25 * 0.40, 0.10)); assert.equal(45 / 0.3, 150);
  // Aumentos: el salario (1 500 000 y la trampa 1 490 400), el IVA, ±20 %, +10 % +20 %, el comerciante y el interés compuesto.
  assert.ok(near(1620000 / 1.08, 1500000)); assert.ok(near(1620000 * 0.92, 1490400)); assert.ok(near(595000 / 1.19, 500000));
  assert.ok(near(1.2 * 0.8, 0.96) && near(1.1 * 1.2, 1.32)); assert.ok(near((80000 * 1.25 * 0.9 - 80000) / 80000, 0.125)); assert.ok(near(1.1 ** 3, 1.331));
});

test('la matemática de los videos: Conteo (se cuentan los casos uno por uno)', () => {
  const range = n => [...Array(n).keys()];
  const C = (n, r) => { let v = 1; for (let i = 0; i < r; i++) v = v * (n - i) / (i + 1); return Math.round(v); };
  // Multiplicativo: la bandera, el código, la clave, sin 5, capicúas, caminos A–C.
  let fl = 0; for (const a of range(4)) for (const b of range(4)) for (const c of range(4)) if (a !== b && b !== c) fl++; assert.equal(fl, 36);
  assert.equal(3 ** 3 * 5 * 4, 540);
  let cl = 0; for (let m = 0; m < 81; m++) { const d = [m % 3, Math.floor(m / 3) % 3, Math.floor(m / 9) % 3, Math.floor(m / 27)]; if (d.every((x, i) => !i || x !== d[i - 1])) cl++; } assert.equal(cl, 24);
  assert.equal(range(900).map(i => String(i + 100)).filter(s => !s.includes('5')).length, 648);
  assert.equal(range(9000).map(i => String(i + 1000)).filter(s => s === [...s].reverse().join('')).length, 90);
  assert.equal(3 * 2 + 2, 8);
  // Permutaciones: LIBRO con vocales juntas, cargos, podio, PAPA.
  const perms = a => (a.length < 2 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
  assert.equal(perms([...'LIBRO']).map(p => p.join('')).filter(s => Math.abs(s.indexOf('I') - s.indexOf('O')) === 1).length, 48);
  assert.equal(6 * 5 * 4, 120); assert.equal(8 * 7 * 6, 336); assert.equal(new Set(perms([...'PAPA']).map(p => p.join(''))).size, 6);
  assert.equal(perms([...'ABCD']).map(p => p.join('')).filter(s => Math.abs(s.indexOf('A') - s.indexOf('B')) === 1).length, 12);
  // Combinaciones: el comité, los triángulos, los saludos, crecientes, diagonales, helados.
  assert.equal(C(4, 2) * C(5, 1), 30); assert.equal(C(6, 3), 20); assert.equal(range(30).find(n => n * (n - 1) / 2 === 45), 10);
  assert.equal(C(6, 4), 15); assert.equal(C(10, 2) - 10, 35); assert.equal(C(5, 3), 10); assert.equal(C(7, 2), 21);
  // Casos y complemento: múltiplos de 3 o 5, cifras que suman 4, al menos un 7, pares con 1–5.
  assert.equal(range(100).map(i => i + 1).filter(n => n % 3 === 0 || n % 5 === 0).length, 47);
  assert.equal(range(900).map(i => i + 100).filter(n => [...String(n)].reduce((a, d) => a + +d, 0) === 4).length, 10);
  assert.equal(range(90).map(i => String(i + 10)).filter(s => s.includes('7')).length, 18);
  assert.equal(perms([1, 2, 3, 4, 5]).map(p => p.slice(0, 3).join('')).filter((s, i, a) => a.indexOf(s) === i && +s % 2 === 0).length, 24);
  // Figuras y caminos: el mensajero, 3 × 2, cuadrados, rectángulos, triángulos, escalera.
  const paths = (nx, ny, block) => { const v = []; for (let i = 0; i <= nx; i++) { v[i] = []; for (let j = 0; j <= ny; j++) v[i][j] = block && i === block[0] && j === block[1] ? 0 : !i && !j ? 1 : (i ? v[i - 1][j] : 0) + (j ? v[i][j - 1] : 0); } return v[nx][ny]; };
  assert.equal(paths(3, 3, [1, 1]), 8); assert.equal(paths(3, 3), 20); assert.equal(paths(3, 2), 10);
  assert.equal([1, 2, 3].reduce((a, s) => a + (4 - s) ** 2, 0), 14); assert.equal(C(3, 2) * C(4, 2), 18); assert.equal(C(5, 2), 10);
  const st = [1, 2]; while (st.length < 5) st.push(st.at(-1) + st.at(-2)); assert.equal(st[4], 8);
});

test('la matemática de los videos: Razonamiento espacial', () => {
  // El robot: AADAIA → (1, 3) y solo ADADADA vuelve al inicio.
  const robot = s => { let x = 0, y = 0, d = 0; for (const c of s) { if (c === 'A') { x += [0, 1, 0, -1][d]; y += [1, 0, -1, 0][d]; } else d = (d + (c === 'D' ? 1 : 3)) % 4; } return `${x},${y}`; };
  assert.equal(robot('AADAIA'), '1,3'); assert.deepEqual(['ADADADA', 'ADAIADA', 'AIAIADA', 'ADADAIA'].filter(s => robot(s) === '0,0'), ['ADADADA']);
  // Colorear 3 × 3 sin vecinas: máximo 5. Dominós en 2 × 4: 5.
  let best = 0; for (let m = 0; m < 512; m++) { const on = i => m >> i & 1; let ok = true; for (let i = 0; i < 9; i++) if (on(i) && ((i % 3 < 2 && on(i + 1)) || (i < 6 && on(i + 3)))) ok = false; if (ok) best = Math.max(best, [...Array(9).keys()].filter(on).length); } assert.equal(best, 5);
  const dom = n => (n < 2 ? 1 : dom(n - 1) + dom(n - 2)); assert.equal(dom(4), 5);
  // Vistas: frente 3, 1, 2 y lado 2, 3, 1 sobre una base llena de 3 × 3: máximo 14 y mínimo 12 (por fuerza bruta).
  const f = [3, 1, 2], sd = [2, 3, 1]; let mx = 0, mn = 99;
  for (let m = 0; m < 3 ** 9; m++) { const h = [...Array(9).keys()].map(i => Math.floor(m / 3 ** i) % 3 + 1), H = (r, c) => h[r * 3 + c];
    if ([0, 1, 2].every(c => Math.max(H(0, c), H(1, c), H(2, c)) === f[c]) && [0, 1, 2].every(r => Math.max(H(r, 0), H(r, 1), H(r, 2)) === sd[r])) { const s = h.reduce((a, b) => a + b, 0); mx = Math.max(mx, s); mn = Math.min(mn, s); } }
  assert.deepEqual([mx, mn], [14, 12]);
  // El cubo de 6 pintado (48 con dos caras), el ladrillo de 3 × 3 × 2 y la pirámide de 14.
  const paint = (a, b, c) => { const k = [0, 0, 0, 0]; for (let x = 0; x < a; x++) for (let y = 0; y < b; y++) for (let z = 0; z < c; z++) k[(x === 0 || x === a - 1) + (y === 0 || y === b - 1) + (z === 0 || z === c - 1)]++; return k; };
  assert.deepEqual(paint(6, 6, 6), [64, 96, 48, 8]); assert.deepEqual(paint(3, 3, 2), [0, 2, 8, 8]); assert.equal(9 + 4 + 1, 14);
  // Desarrollos: rodando un cubo sobre la fila de cuatro con una cara arriba y otra abajo, el 1 queda frente al 6.
  const fold = cells => { const key = c => c.join(','), set = new Set(cells.map(key)), res = { [key(cells[0])]: 'D' }, q = [[...cells[0], { down: 'D', up: 'U', n: 'N', s: 'S', e: 'E', w: 'W' }]];
    const roll = (o, d) => { const r = { ...o }; if (d === 'e') Object.assign(r, { down: o.e, e: o.up, up: o.w, w: o.down }); if (d === 'w') Object.assign(r, { down: o.w, w: o.up, up: o.e, e: o.down }); if (d === 's') Object.assign(r, { down: o.s, s: o.up, up: o.n, n: o.down }); if (d === 'n') Object.assign(r, { down: o.n, n: o.up, up: o.s, s: o.down }); return r; };
    while (q.length) { const [x, y, o] = q.shift(); for (const [d, dx, dy] of [['e', 1, 0], ['w', -1, 0], ['s', 0, 1], ['n', 0, -1]]) { const k = key([x + dx, y + dy]); if (set.has(k) && !(k in res)) { const r = roll(o, d); res[k] = r.down; q.push([x + dx, y + dy, r]); } } } return cells.map(c => res[key(c)]); };
  const net = fold([[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]]), opp = { D: 'U', U: 'D', N: 'S', S: 'N', E: 'W', W: 'E' };
  assert.equal(net.indexOf(opp[net[0]]) + 1, 6); assert.equal(net.indexOf(opp[net[1]]) + 1, 4); assert.equal(net.indexOf(opp[net[2]]) + 1, 5);
  // La torre de dados (3 + 7 + 7), el reloj en el espejo (12:00 − 8:25) y la tira doblada cuatro veces.
  assert.equal((7 - 4) + 7 + 7, 17); const mins = 12 * 60 - (8 * 60 + 25); assert.equal(`${Math.floor(mins / 60)}:${mins % 60}`, '3:35'); assert.equal(2 ** 4, 16);
});

test('la matemática de los videos: Secuencias y patrones', () => {
  // Sucesiones: n² + 4 (término 12: 148), la aritmética (79), la alternada (66) y 2ⁿ − 1 (1 023).
  assert.deepEqual([1, 2, 3, 4, 5].map(n => n * n + 4), [5, 8, 13, 20, 29]); assert.equal(12 * 12 + 4, 148);
  const d = (27 - 11) / 4; assert.equal(11 + 17 * d, 79);
  const alt = [3]; while (alt.length < 10) alt.push(alt.length % 2 ? alt.at(-1) * 2 : alt.at(-1) - 1); assert.deepEqual(alt.slice(0, 7), [3, 6, 5, 10, 9, 18, 17]); assert.equal(alt[9], 66);
  assert.equal(2 ** 10 - 1, 1023);
  // Letras: A, C, F, J, O → U (posiciones triangulares), 3C 6F 9I 12L → 15O, palitos (3n + 1 ≤ 100 → 33), marcos (4n + 4).
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; assert.equal([1, 3, 6, 10, 15, 21].map(p => ABC[p - 1]).join(''), 'ACFJOU');
  assert.equal(15 + ABC[14], '15O'); assert.equal(Math.floor((100 - 1) / 3), 33); assert.equal((15 + 2) ** 2 - 15 ** 2, 64);
  // Ciclos: ABBCCCD en la 150 (B), los días, el horno y la última cifra de 2⁹⁹.
  assert.equal('ABBCCCD'[(150 - 1) % 7], 'B'); assert.equal('ABBCCCD'[(147 - 1) % 7], 'D');
  const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  assert.equal(dias[(2 + 15) % 7], 'jueves'); assert.equal(dias[(4 + 31 + 30 + 31) % 7], 'sábado');
  assert.equal(dias[Math.floor((8 + 100) / 24) % 7], 'viernes'); assert.equal((8 + 100) % 24, 12);
  assert.equal(String(2n ** 99n).slice(-1), '8');
});

test('la matemática de los videos: Codificación', () => {
  // SOL, LUZ y SUR: cada letra es el símbolo común de sus dos palabras; LOROS = ○ □ ● □ △.
  const W = { SOL: '□○△', LUZ: '★○◇', SUR: '◇●△' }, key = {};
  for (const L of 'LSU') { const ws = Object.keys(W).filter(w => w.includes(L)); key[L] = [...W[ws[0]]].find(s => W[ws[1]].includes(s)); }
  for (const w of Object.keys(W)) { const free = [...W[w]].filter(s => !Object.values(key).includes(s)); const L = [...w].find(c => !key[c]); if (free.length === 1 && L) key[L] = free[0]; }
  assert.equal([...'LOROS'].map(c => key[c]).join(''), '○□●□△');
  // César +3, la tabla de fila y columna y el dígito de control.
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', sh = (w, k) => [...w].map(c => ABC[(ABC.indexOf(c) + k + 26) % 26]).join('');
  assert.equal(sh('ZUKA', 3), 'CXND'); assert.equal(sh('OLEUR', -3), 'LIBRO');
  const tab = ['ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVXYZ'], at = n => tab[Math.floor(n / 10) - 1][n % 10 - 1];
  assert.equal(at(23), 'H'); assert.equal(at(32), 'L'); assert.equal([33, 11, 43].map(at).join(''), 'MAR');
  assert.equal((2 + 5 + 1 + 3) % 7, 4); assert.equal((3 + 4 + 6 + 2) % 7, 1);
  assert.deepEqual([...Array(10).keys()].filter(x => (5 + x + 2 + 8) % 7 === 4), [3]);
  // Máquinas, la numeración antigua (197 y 318 con 10 símbolos) y las tres luces.
  assert.equal(((5 * 2) - 3) ** 2, 49); assert.equal((5 ** 2) * 2 - 3, 47); assert.equal(Math.sqrt((47 + 3) / 2), 5);
  assert.equal(125 + 2 * 25 + 4 * 5 + 2, 197);
  let n = 318, cnt = 0; for (const v of [125, 25, 5, 1]) { cnt += Math.floor(n / v); n %= v; } assert.equal(cnt, 10);
  assert.equal(2 * 9 + 0 * 3 + 1, 19); assert.equal(2 * 9 + 2 * 3 + 2, 26);
});

test('la matemática de los videos: Tablas y gráficas', () => {
  const pct = (a, b) => (b - a) / a;
  // Lluvia 40, 50, 90, 120, 80, 40: el mayor aumento porcentual es marzo; café 30, 45, 36, 45, 60: 2020; baloncesto 90° de 180.
  const R = [40, 50, 90, 120, 80, 40], best = a => a.slice(1).map((v, i) => pct(a[i], v)).reduce((m, v, i, s) => (v > s[m] ? i : m), 0) + 1;
  assert.equal(best(R), 2); assert.equal(pct(50, 90), .8); assert.equal(best([30, 45, 36, 45, 60]), 1); assert.equal(90 / 360 * 180, 45);
  // Promedios: las notas (96 / 30 = 3.2), los goles (33 y mediana 1.5), el celular (promedio 5, dos días encima, mediana 4).
  const exp = f => f.flatMap((n, v) => Array(n).fill(v)), mean = a => a.reduce((s, v) => s + v, 0) / a.length;
  const med = a => { const s = [...a].sort((x, y) => x - y), m = s.length / 2; return s.length % 2 ? s[Math.floor(m)] : (s[m - 1] + s[m]) / 2; };
  const notas = exp([0, 3, 3, 12, 9, 3]); assert.equal(notas.length, 30); assert.equal(mean(notas), 3.2);
  const goles = exp([4, 6, 5, 3, 2]); assert.equal(goles.reduce((s, v) => s + v, 0), 33); assert.equal(med(goles), 1.5);
  const cel = [3, 4, 2, 5, 4, 7, 10]; assert.equal(mean(cel), 5); assert.equal(cel.filter(v => v > 5).length, 2); assert.equal(med(cel), 4);
  assert.equal(mean([6, 2, 9, 3]), 5); assert.equal(mean(exp([2, 5, 3])), 1.1); assert.equal(med([6, 2, 9, 4, 7]), 6); assert.equal(med([6, 2, 9, 4, 7, 11]), 6.5);
  assert.deepEqual([mean([3, 4, 4, 5, 34]), med([3, 4, 4, 5, 34])], [10, 4]);
  // Concluir: la librería (la falsa es la del 40 %), los planes (250 min → A; cruces en 300 y 500) y el torneo (19 puntos; 2 perdidos).
  const L = { nov: [120, 90, 150, 140], poe: [30, 45, 25, 50], ens: [50, 65, 75, 60], inf: [100, 100, 50, 50] };
  const sum = a => a.reduce((s, v) => s + v, 0), all = sum(Object.values(L).flat()), t3 = sum(Object.values(L).map(r => r[2]));
  assert.equal(all, 1200); assert.equal(L.nov[2] / t3, .5); assert.equal(sum(L.poe) / all, .125); assert.ok(L.ens[3] > L.inf[3]);
  assert.notEqual((L.inf[2] + L.inf[3]) / sum(L.inf), .4); assert.equal(sum(L.inf) / all, .25);
  const A = m => 20000 + 100 * m, B = m => 35000 + 50 * m, Cc = () => 60000;
  assert.deepEqual([A(250), B(250), Cc(250)], [45000, 47500, 60000]); assert.equal(A(300), B(300)); assert.equal(B(500), Cc(500));
  assert.equal(5 * 3 + (10 - 5 - 1), 19); const G = (18 - 3) / 3; assert.equal(G, 5); assert.equal(10 - G - 3, 2);
  assert.deepEqual([40 / 100, 40 / 50, 40 / 200], [.4, .8, .2]);
});
