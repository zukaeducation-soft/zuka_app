// Preuniversitario UdeA · razonamiento lógico, ronda 2 del estudiante simulado (docs/evaluacion-curso/respuestas/ronda2-rl*.json y
// ronda2-rl-notas.md): el error de la evaluación de dobleces y los vacíos que encontró quedan enseñados, con otros números.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES');
const units = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'razonamiento');
const lessons = units.flatMap(u => u.lessons);
const L = id => lessons.find(l => l.id === id);
const zona = (l, g) => l.ex.find(e => e.game === g);
const fill = e => GAMES['completa-solucion'].solve(e.params).fill;
const close = (a, b) => Math.abs(a - b) < 1e-9;

// Hoja cuadrada [-1, 1]² doblada dos veces hasta el cuarto [0, 1]²: un corte en (x, y) del cuadrito aparece en (±x, ±y).
// Los pedazos que caen sobre un doblez (x = 0 o y = 0) se juntan en uno solo.
const cortes = (x, y) => new Set([[x, y], [-x, y], [x, -y], [-x, -y]].map(([a, b]) => `${Math.abs(a) < 1e-9 ? 0 : a},${Math.abs(b) < 1e-9 ? 0 : b}`)).size;

test('pu-es-4: lo que sale de un corte depende de cuántos dobleces toca', () => {
  assert.equal(cortes(0.5, 0.5), 4); assert.equal(cortes(0, 0.5), 2); assert.equal(cortes(0, 0), 1);
  const s = zona(L('pu-es-4'), 'completa-solucion');
  assert.match(s.params.q, /esquina donde se juntan los dos dobleces/);
  assert.equal(fill(s).join(), ['4', '2', 'centro', '1', String(cortes(0.5, 0.5) + cortes(0, 0.5) + cortes(0, 0))].join());
  assert.match(s.explain, /muescas/);
  assert.match(zona(L('pu-es-4'), 'dobla-papel').explain, /un solo agujero/);
  // La evaluación nombra la esquina: un doblez y un borde suelto → 2 muescas en la mitad de dos lados opuestos.
  const ev = units.find(u => u.world === 'pu-espacial').exam.items.find(it => it.lesson === 'pu-es-4' && it.ex.game === 'opcion-examen').ex;
  assert.match(ev.params.q, /un doblez y un borde suelto/);
  assert.equal(cortes(0, 1), 2);
  assert.match(ev.params.options[ev.params.answer], /dos muescas/);
  assert.doesNotMatch(ev.explain, /repetido 4 veces/);
});

test('pu-ar-4: dos de un color dado se cuentan agotando los otros colores', () => {
  const e = zona(L('pu-ar-4'), 'caza-error'), p = e.params;
  assert.match(p.q, /dos medias grises/);
  const [negras, azules] = [7, 9];
  assert.match(p.fixes[0], new RegExp(`${negras} \\+ ${azules} = ${negras + azules}`));
  assert.match(e.explain, new RegExp(`= ${negras + azules + 2}\\$ medias`));
  assert.doesNotMatch(e.explain, /Las cantidades de cada color no importan aquí/);
  assert.match(e.explain, /Con un color dado sí importan/);
  assert.match(zona(L('pu-ar-4'), 'peor-caso-bolsa').explain, /color dado/);
});

test('pu-cm-4: potencias y raíces de decimales, contando las cifras decimales', () => {
  const l = L('pu-cm-4'), e = zona(l, 'cuelga-decimales');
  const val = { '0.5^2': 0.5 ** 2, '\\sqrt{0.49}': Math.sqrt(0.49), '\\sqrt{0.16}': Math.sqrt(0.16), '\\sqrt{0.81}': Math.sqrt(0.81) };
  for (const f of e.params.fichas) assert.ok(close(f.v / e.params.den, val[f.t]), f.t);
  assert.match(e.explain, /0\.25/);
});

test('pu-pb-2: «al menos una» con tres intentos', () => {
  const s = zona(L('pu-pb-2'), 'completa-solucion'), f = fill(s);
  assert.match(s.params.q, /tres alarmas/);
  assert.equal(f[1], '0.3'); assert.ok(close(+f[2], 0.3 ** 3)); assert.ok(close(+f[3], 1 - 0.3 ** 3));
  assert.ok(s.params.extra.includes(String(+(0.7 ** 3).toFixed(3))));
});

test('pu-gr-1: de la cantidad al ángulo del sector', () => {
  const e = zona(L('pu-gr-1'), 'caza-error');
  assert.match(e.params.q, /Qué ángulo/);
  assert.match(e.params.fixes[0], new RegExp(`${30 / 180 * 360}\\^\\\\circ`));
  assert.match(zona(L('pu-gr-1'), 'rueda-porcentaje').explain, new RegExp(`${18 / 120 * 360}\\^\\\\circ`));
});

test('pu-se-1: los dos sentidos de «alternada»', () => {
  const e = zona(L('pu-se-1'), 'caza-error'), seq = [1, 20, 3, 17, 9, 14, 27];
  for (let i = 2; i < seq.length; i++) assert.equal(seq[i], i % 2 === 0 ? seq[i - 2] * 3 : seq[i - 2] - 3);
  const next = seq.length % 2 === 0 ? seq.at(-2) * 3 : seq.at(-2) - 3;
  assert.match(e.params.fixes[0], new RegExp(`= ${next}\\$$`));
  assert.match(e.explain, /operaciones que se turnan/); assert.match(e.explain, /intercaladas/);
  assert.match(zona(L('pu-se-1'), 'alterna-dos').explain, /intercaladas/);
});

test('pu-es-2: contar los cuadrados que se ven en la vista de frente', () => {
  const o = zona(L('pu-es-2'), 'opcion-examen').params;
  const h = [[1, 3, 1], [2, 1, 1], [1, 2, 1]];     // atrás, medio, adelante
  const frente = [0, 1, 2].reduce((s, c) => s + Math.max(...h.map(f => f[c])), 0);
  assert.equal(o.options[o.answer], String(frente));
  assert.ok(o.options.includes(String(h[2].reduce((a, b) => a + b))) && o.options.includes(String(h.flat().reduce((a, b) => a + b))));
});

test('pu-op-2: las dos operaciones de la zona de examen no se parecen', () => {
  const l = L('pu-op-2'), e = zona(l, 'caza-error');
  assert.doesNotMatch(e.params.q, /ab|a \+ b/);
  const op = (a, b) => 4 * a - 3 * b;
  assert.equal(op(2, 5), -7); assert.match(e.params.fixes[0], /-15/);
  assert.match(e.explain, /propia regla/);
});
