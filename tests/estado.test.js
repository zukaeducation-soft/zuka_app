// Avance completo en la nube (js/estado.js): juntar dos dispositivos nunca borra lo ganado.
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScripts, get } = require('./load');
const ctx = loadScripts(['js/estado.js']);
const mezcla = get(ctx, 'estadoMezcla'), toma = get(ctx, 'estadoToma');

test('XP, racha, días, evaluaciones y gimnasio: queda lo mejor de los dos', () => {
  const r = mezcla({ xp: 10, answered: 5, correct: 4, streak: 1, lastDay: '2026-11-20', days: { a: 1, b: 9 }, exams: { e: { best: 50, at: 1 } }, gym: {}, saved: { x: true }, misCursos: ['trig'] },
    { xp: 40, answered: 9, correct: 3, streak: 4, lastDay: '2026-11-22', days: { a: 5 }, exams: { e: { best: 80, last: 20, at: 9 }, f: { best: 1 } }, gym: { g: { best: 2 } }, saved: { y: true }, misCursos: ['preuda'] });
  assert.equal(r.xp, 40); assert.equal(r.answered, 9); assert.equal(r.correct, 3);
  assert.equal(r.streak, 4); assert.equal(r.lastDay, '2026-11-22');
  assert.equal(JSON.stringify(r.days), '{"a":5,"b":9}');
  assert.equal(r.exams.e.best, 80); assert.equal(r.exams.e.last, 20); assert.ok(r.exams.f && r.gym.g && r.saved.x && r.saved.y);
  assert.equal(r.misCursos.join(), 'trig,preuda');
});
test('un dispositivo nuevo recibe todo y uno con datos no pierde nada contra una nube vacía', () => {
  const nube = { name: 'Ana', xp: 7, course: 'preuda', lastLesson: 'pu-cm-1', goal: 50, answered: 3, correct: 2, tourDone: true };
  const nuevo = mezcla({ name: '', xp: 0, course: 'algebra', goal: 30, answered: 0, correct: 0, tourDone: false }, nube);
  for (const k of Object.keys(nube)) assert.equal(nuevo[k], nube[k], k);
  assert.equal(mezcla(nube, {}).xp, 7);
  assert.equal(mezcla(nube, null).name, 'Ana');
});
test('mezclar es estable: repetirlo no cambia nada', () => {
  const a = { xp: 5, days: { a: 1 }, exams: { e: { best: 3, at: 2 } } }, b = { xp: 9, days: { b: 2 } };
  const r = mezcla(a, b);
  assert.deepEqual(JSON.parse(JSON.stringify(mezcla(r, r))), JSON.parse(JSON.stringify(r)));
});
test('no suben el tema, el sonido ni la cuenta', () => {
  const t = toma({ xp: 1, theme: 'dark', cuenta: {}, sfx: true, unlockAll: true });
  assert.equal(Object.keys(t).join(), 'xp');
});
test('la racha de dos dispositivos es una sola si los días se tocan', () => {
  assert.equal(mezcla({ streak: 1, lastDay: '2026-11-24' }, { streak: 10, lastDay: '2026-11-23' }).streak, 11);
  assert.equal(mezcla({ streak: 3, lastDay: '2026-11-24' }, { streak: 10, lastDay: '2026-11-23' }).streak, 11);
  assert.equal(mezcla({ streak: 1, lastDay: '2026-11-24' }, { streak: 10, lastDay: '2026-11-20' }).streak, 1);
});
test('reiniciar el progreso vale en todos los dispositivos', () => {
  assert.equal(mezcla({ xp: 0, reinicio: 9 }, { xp: 80 }).xp, 0);
  assert.equal(mezcla({ xp: 80 }, { xp: 0, reinicio: 9 }).xp, 0);
  assert.equal(mezcla({ xp: 5, reinicio: 9 }, { xp: 7, reinicio: 9 }).xp, 7);
  assert.equal(mezcla({ xp: 1 }, { xp: 2, _unir: [{}] })._unir, undefined);
  assert.equal(mezcla({ xp: 1 }, { xp: 2, tutorias: [1] }).tutorias, undefined);
  assert.equal(mezcla({ xp: 1 }, { xp: 2, tutorias: [1], reinicio: 9 }).tutorias, undefined);
});
