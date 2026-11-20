// Gimnasio cerebral por niveles (spec 2026-11-19-gimnasio-niveles): Calentamiento, Fuerza y Élite, tu nivel y la página.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = read('index.html'), css = read('css/styles.css'), gymSrc = read('js/gimnasio.js'), ini = read('js/inicio.js');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso|gimnasio/.test(f));
const ctx = loadScripts(all);
const COURSES = get(ctx, 'COURSES');
const GYM_LEVELS = get(ctx, 'GYM_LEVELS'), gymWarmup = get(ctx, 'gymWarmup'), gymRecommend = get(ctx, 'gymRecommend');
const gymPlates = get(ctx, 'gymPlates'), gymFind = get(ctx, 'gymFind'), gymRetos = get(ctx, 'gymRetos');
const PU = COURSES.find(c => c.id === 'preuda'), ALG = COURSES.find(c => c.id === 'algebra');
const uiOf = (c, id) => c.units.findIndex(u => u.lessons.some(l => l.id === id));
const allDone = c => Object.fromEntries(c.units.flatMap(u => u.lessons.map(l => [l.id, true])));

test('tres niveles con nombre y su dibujo de discos', () => {
  assert.equal(GYM_LEVELS.map(l => l.name).join(), 'Calentamiento,Fuerza,Élite');
  for (const n of [1, 2, 3]) {
    const s = gymPlates(n);
    assert.match(s, /^<svg/);
    assert.equal((s.match(/class="gp-plate/g) || []).length, 2 * n, `nivel ${n}: ${n} discos por lado`);
  }
});

test('calentamiento: tres juegos de las lecciones hechas del mundo, cerrado sin lecciones y distinto al repetir', () => {
  const ui = uiOf(PU, 'pu-cm-1');
  assert.equal(gymWarmup(PU, ui, {}, false, 0).open, false, 'sin lecciones hechas, cerrado');
  const w = gymWarmup(PU, ui, { 'pu-cm-1': true, 'pu-cm-2': true }, false, 0);
  assert.equal(w.open, true);
  assert.equal(w.level, 1);
  assert.equal(w.id, `cal-preuda-${ui}`);
  assert.equal(w.steps.length, 3);
  const lessonEx = new Map(['pu-cm-1', 'pu-cm-2'].map(id => [id, PU.units[ui].lessons.find(l => l.id === id).ex]));
  for (const s of w.steps) {
    assert.equal(s.ex.type, 'play');
    assert.ok([...lessonEx.values()].some(ex => ex.includes(s.ex)), 'sale de una lección hecha');
    assert.ok(s.coach && s.title && s.note && s.hints.length === 2);
  }
  const w2 = gymWarmup(PU, ui, { 'pu-cm-1': true, 'pu-cm-2': true }, false, 1);
  assert.notEqual(w2.steps.map(s => s.ex.game).join(), w.steps.map(s => s.ex.game).join(), 'al repetirlo cambia');
  assert.equal(gymWarmup(PU, ui, {}, true, 0).open, true, 'modo revisión: abierto');
});

test('el calentamiento sirve en todos los cursos', () => {
  for (const c of COURSES) {
    const w = gymWarmup(c, 0, allDone(c), false, 0);
    assert.ok(w.steps.length >= 1, c.id);
    assert.ok(w.steps.every(s => s.ex.type === 'play'), c.id);
  }
});

test('gymFind encuentra retos guiados y calentamientos', () => {
  assert.equal(gymFind(PU, 'gym-obra').id, 'gym-obra');
  assert.equal(gymFind(PU, `cal-preuda-0`, { 'pu-cm-1': true }, false, {}).level, 1);
  assert.equal(gymFind(PU, 'no-existe'), undefined);
});

test('tu nivel: calentar primero, luego Fuerza, luego Élite', () => {
  const ui = uiOf(PU, 'pu-pr-1');
  const done = { 'pu-pr-1': true, 'pu-pr-2': true, 'pu-pr-3': true, 'pu-pr-5': true };
  const cal = `cal-preuda-${ui}`;
  let r = gymRecommend(PU, ui, done, false, {});
  assert.equal(r.level, 1); assert.equal(r.item.id, cal);
  const mine = { [cal]: { best: 3 } };
  r = gymRecommend(PU, ui, done, false, mine);
  assert.equal(r.level, 2); assert.equal(r.item.level, 2);
  const lvl2 = gymRetos(PU).filter(g => g.ui <= ui).flatMap(g => g.retos).filter(x => x.level === 2);
  lvl2.forEach(x => { mine[x.id] = { best: 2 }; });
  r = gymRecommend(PU, ui, done, false, mine);
  assert.equal(r.level, 3); assert.equal(r.item.level, 3);
  gymRetos(PU).flatMap(g => g.retos).forEach(x => { mine[x.id] = { best: 3 }; });
  r = gymRecommend(PU, ui, done, false, mine);
  assert.equal(r.item.id, cal, 'todo superado: calentar para mantenerse');
  // un curso sin retos guiados recomienda el calentamiento
  const trig = COURSES.find(c => c.id === 'trig');
  assert.equal(gymRecommend(trig, 0, { [trig.units[0].lessons[0].id]: true }, false, {}).level, 1);
});

test('la página del gimnasio: portada, entrenamiento de hoy, selector de niveles y lista', () => {
  const body = gymSrc.slice(gymSrc.indexOf('function renderGym'), gymSrc.indexOf('function startReto'));
  for (const k of ['Gimnasio cerebral', 'Tu entrenamiento de hoy', 'gym-levels', 'Tu nivel', 'Tu mundo', 'Volver al curso', 'GYM_3D', 'Pronto llegan retos de este nivel'])
    assert.ok(body.includes(k), k);
  for (const sel of ['.gym-hero', '.gym-today', '.gym-levels', '.gym-lv', '.gym-item']) assert.ok(css.includes(`${sel} {`), sel);
});

test('las pesas abren la página del gimnasio en el mundo del estudiante (sin hoja)', () => {
  assert.doesNotMatch(ini, /function openGymSheet/);
  assert.match(ini, /gymFocus = \{ course: c\.id, ui: \+b\.dataset\.ui \}/);
  assert.match(ini, /go\('gym'\)/);
});

test('el final del calentamiento no muestra una respuesta única', () => {
  assert.match(gymSrc, /\$\{r\.answer \? `<div class="gym-answer">/);
});

test('si se adelantó, el gimnasio cuenta los mundos donde ya hizo lecciones', () => {
  const ui0 = uiOf(PU, 'pu-cm-1'), ui4 = uiOf(PU, 'pu-pr-1');
  const done = { 'pu-cm-1': true, 'pu-pr-1': true };
  const r = gymRecommend(PU, ui0, { ...done }, false, { [`cal-preuda-${ui0}`]: { best: 3 } });
  assert.equal(r.level, 2, 'los retos de Fuerza del mundo al que se adelantó cuentan');
  assert.ok(gymRetos(PU).find(g => g.ui === ui4).retos.includes(r.item));
});

test('con el calentamiento de su mundo pendiente, ese es su nivel aunque se haya adelantado', () => {
  const ui0 = uiOf(PU, 'pu-cm-1');
  const r = gymRecommend(PU, ui0, { 'pu-cm-1': true, 'pu-pr-1': true, 'pu-pr-2': true }, false, {});
  assert.equal(r.level, 1);
  assert.equal(r.item.id, `cal-preuda-${ui0}`);
});

test('revisión: el calentamiento no repite juegos ni usa los aburridos si hay otros, y no se abre sin juegos', () => {
  const DULL = ['arma-la-cuenta', 'escala-solucion', 'une-parejas', 'clasifica-cartas', 'ordena-terminos'];
  for (const c of COURSES) {
    const done = allDone(c);
    c.units.forEach((u, ui) => {
      for (const n of [0, 1, 2]) {
        const w = gymWarmup(c, ui, done, false, n), g = w.steps.map(s => s.ex.game);
        assert.equal(new Set(g).size, g.length, `${c.id} ${ui}: juegos repetidos ${g}`);
        const hasOther = u.lessons.some(l => l.ex.some(e => e.type === 'play' && !DULL.includes(e.game) && e.game !== 'pregunta-examen'));
        if (hasOther) assert.ok(g.every(x => !DULL.includes(x)), `${c.id} ${ui}: ${g}`);
        assert.equal(w.open, w.steps.length > 0);
        for (const s of w.steps) assert.equal((s.note.match(/\$/g) || []).length % 2, 0, 'TeX cerrado en el cuaderno');
      }
    });
  }
  assert.equal(gymWarmup(PU, 0, {}, true, 0).open, true);
});

test('revisión: repetir un calentamiento no da XP; los pasos con la misma lección se numeran', () => {
  assert.match(gymSrc, /stars > prev \? \(r\.warm \? 5 : stars === 3 \? 15 : 10\) : r\.warm \? 0 : 5/);
  assert.match(gymSrc, /if \(xp\) \{ addXP\(xp\); newStreak = markStreak\(\); \}/);
  assert.match(gymSrc, /aria-pressed="\$\{x\.n === lvl\}"/);
  const ui = uiOf(PU, 'pu-cm-1'), w = gymWarmup(PU, ui, { 'pu-cm-1': true }, false, 0);
  assert.equal(new Set(w.steps.map(s => s.title)).size, w.steps.length);
});
