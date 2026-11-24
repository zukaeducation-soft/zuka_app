// Preuniversitario UdeA · razonamiento lógico, ronda 1 del estudiante simulado (docs/evaluacion-curso/respuestas/ronda1-rl*.json y
// ronda1-rl-notas.md): los vacíos que encontró quedan enseñados en la lección, con otros números que los del examen.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES');
const lessons = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.filter(u => u.block === 'razonamiento').flatMap(u => u.lessons);
const L = id => lessons.find(l => l.id === id);
const text = l => JSON.stringify(l.ex);
const zona = (l, g) => l.ex.find(e => e.game === g);

test('pu-co-4: conteo por casos cuando el 0 puede ir al final y no al comienzo', () => {
  const l = L('pu-co-4'), s = zona(l, 'completa-solucion');
  assert.match(s.params.q, /PARES/); assert.match(s.params.q, /0/);
  assert.match(s.params.lines.join(' '), /termina en 0/);
  // 0, 1, 3, 5, 6, 8 sin repetir, pares de tres cifras: termina en 0 → 5 · 4; termina en 6 u 8 → 2 · 4 · 4.
  const d = [0, 1, 3, 5, 6, 8]; let n = 0;
  for (const a of d) for (const b of d) for (const c of d) if (a && a !== b && b !== c && a !== c && c % 2 === 0) n++;
  assert.equal(n, 52); assert.equal(GAMES['completa-solucion'].solve(s.params).fill.at(-1), '52');
  assert.match(text(l), /partir en dos casos/);
  assert.match(text(L('pu-co-1')), /partir en casos/);
});

test('pu-es-3: qué caras se mueven al volcar un dado', () => {
  const l = L('pu-es-3'), s = zona(l, 'completa-solucion');
  assert.match(s.params.q, /vuelca/);
  // Arriba 1, frente 2, derecha 3. Adelante: sube la de atrás (5). Derecha: sube la de la izquierda (7 − 3 = 4).
  let up = 1, front = 2, right = 3; const opp = x => 7 - x;
  [up, front] = [opp(front), up];
  up = opp(right);
  assert.equal(up, 4); assert.equal(GAMES['completa-solucion'].solve(s.params).fill.at(-1), '4');
  assert.match(zona(l, 'vuelca-dado').q, /[Ss]e vuelca/);
});

test('pu-se-3: dos ciclos a la vez se repiten juntos cada MCM', () => {
  const l = L('pu-se-3'), e = zona(l, 'caza-error');
  assert.match(e.params.fixes[0], /MCM\(5, 3\) = 15/);
  const pos = []; for (let n = 1; pos.length < 4; n++) if ((n - 1) % 5 === 0 && (n - 1) % 3 === 0) pos.push(n);
  assert.equal(pos.at(-1), 46); assert.match(e.explain, /46/);
});

test('pu-pb-2: sacar sin devolver se enseña antes de la pregunta en formato real', () => {
  const l = L('pu-pb-2'), i = l.ex.findIndex(e => /sin devolver/.test(e.params.q || '') && e.game !== 'opcion-examen');
  assert.ok(i >= 0 && i < l.ex.findIndex(e => e.game === 'opcion-examen'));
  assert.match(l.ex[i].explain, /\\tfrac\{3\}\{9\}/);
});

test('fórmulas que se usan quedan enseñadas: rombo, sector, pendientes y reloj', () => {
  const g4 = text(L('pu-ge-4'));
  assert.match(g4, /D \\\\cdot d\}\{2\}/);
  assert.match(zona(L('pu-ge-4'), 'opcion-examen').params.q, /rombo/);
  assert.match(zona(L('pu-ge-5'), 'caza-error').explain, /l\^2 \+ l\^2/);
  assert.match(zona(L('pu-ge-1'), 'caza-error').explain, /medio grado por minuto/);
});

test('juegos que llegaban sin enunciado de contexto ni explicación propia', () => {
  assert.match(zona(L('pu-nu-2'), 'opcion-examen').explain, /instante inicial/);
});
