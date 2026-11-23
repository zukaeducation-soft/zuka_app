// Ejercicios con el mismo lenguaje que la explicación (spec 2026-11-23-explora-leccion-interactiva, sección «Ejercicios»):
// en una lección con explicación Explora, los juegos que vienen después usan el fondo, las superficies, la tinta, los
// sonidos y la tipografía de la explicación. Las demás lecciones no cambian.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const css = read('css/styles.css'), xcss = read('css/explora.css');
const kit = loadScripts(['js/games/kit.js']);
const T = get(kit, 'EXPLORA_TOKENS'), P = get(kit, 'PALETTE');
const setCourse = (id, o) => get(kit, 'setGameCourse')(id, o), setTheme = t => get(kit, 'setGameTheme')(t);

const lum = hex => {
  const v = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

test('los colores de los juegos en una lección Explora son los mismos de la interfaz (css/styles.css)', () => {
  const bloque = sel => css.slice(css.indexOf(sel), css.indexOf('}', css.indexOf(sel)));
  const oscuro = bloque(':root {'), claro = bloque(':root[data-theme="light"] {');
  for (const [tema, b] of [['dark', oscuro], ['light', claro]]) {
    for (const k of ['bg', 'card', 'line', 'ink', 'mute', 'ok', 'bad']) {
      const m = new RegExp(`--${k}: (#[0-9a-fA-F]{6})`).exec(b);
      assert.ok(m, `--${k} en ${tema}`);
      assert.equal(T[tema][k].toLowerCase(), m[1].toLowerCase(), `${k} en ${tema}`);
    }
  }
});

test('con explicación, el juego toma esos colores y conserva el acento del curso; sin ella, no cambia nada', () => {
  setTheme('dark');
  setCourse('trig');
  const bgCurso = P.bg, brand = P.brand;
  setCourse('trig', { explora: true });
  assert.equal(P.bg, T.dark.bg);
  assert.equal(P.card, T.dark.card);
  assert.equal(P.brand, brand, 'el acento sigue siendo el del curso');
  setCourse('trig');
  assert.equal(P.bg, bgCurso, 'otra lección del mismo curso vuelve a su paleta');
  setTheme('light'); setCourse('algebra', { explora: true });
  assert.equal(P.bg, T.light.bg);
  setTheme('dark'); setCourse(null);
});

test('se lee bien: tinta, tinta tenue y acento contra el fondo en los dos temas', () => {
  for (const tema of ['dark', 'light']) {
    setTheme(tema);
    for (const curso of ['preuda', 'algebra', 'trig']) {
      setCourse(curso, { explora: true });
      assert.ok(contraste(P.ink, P.bg) >= 7, `${curso} ${tema}: tinta`);
      assert.ok(contraste(P.mute, P.bg) >= 4.5, `${curso} ${tema}: tinta tenue`);
      assert.ok(contraste(P.brand, P.bg) >= 3, `${curso} ${tema}: acento ${P.brand}`);
    }
  }
  setTheme('dark'); setCourse(null);
});

test('la lección marca sus ejercicios, usa los sonidos de la explicación y escribe el enunciado palabra a palabra', () => {
  const app = read('js/app.js');
  assert.match(app, /setGameCourse\(c\.id, \{ explora: conExplora \}\)/);
  assert.match(app, /xp-lesson/);
  assert.match(app, /xpPalabras\(ex\.q/);
  assert.match(app, /conExplora \? XS\.idea\(\) : Sfx\.ok\(\)/);
  assert.match(read('js/exercises.js'), /closest\('\.xp-lesson'\) \? XP_SFX : Sfx/);
  const xp = read('js/explora.js');
  assert.match(xp, /const XP_SFX = \{ tap: .*ok: .*bad: .*win: /);
  assert.match(read('js/games/kit.js'), /gameExplora && typeof XS !== 'undefined'/, 'tocar el juego suena como tocar la escena');
});

test('revisión: un toque suena una vez, solo dentro del juego, y las fórmulas pegadas a un signo no se parten', () => {
  const xp = read('js/explora.js'), k = read('js/games/kit.js');
  assert.match(xp, /if \(t - lastPop < 45\) return/);
  const rama = k.slice(k.indexOf('if (r === false && p.mouseX >= 0'), k.indexOf('ripples.push(rp)'));
  assert.match(rama, /XS\.pop\(\)/, 'el sonido va dentro de la condición del lienzo');
  const ctx = loadScripts(['js/explora.js']); ctx.tex = s => s;
  const piezas = t => [...get(ctx, 'xpPalabras')(t).matchAll(/<span class="xp-w"[^>]*>(.*?)<\/span>/g)].map(m => m[1]);
  for (const t of ['Si ($x = 1$), entonces ¿$a + b$?', '«$-(-6) = 6$» y (**dos palabras**) al final.', 'Mide $\\tfrac{\\pi}{2}$: un cuarto.']) {
    for (const p of piezas(t)) {
      assert.equal((p.match(/\$/g) || []).length % 2, 0, `fórmula partida en «${p}»`);
      assert.equal((p.match(/\*\*/g) || []).length % 2, 0, `negrita partida en «${p}»`);
    }
  }
  assert.deepEqual(piezas('Si ($x = 1$), ya'), ['Si', '($x = 1$),', 'ya']);
});

test('el marco del ejercicio se viste como la explicación, en los dos temas y sin movimiento si se pide', () => {
  for (const sel of ['.lesson.xp-lesson .ex-q', '.lesson.xp-lesson .play', '.lesson.xp-lesson .hint-btn', '.lesson.xp-lesson .hint-text',
    '.lesson.xp-lesson .feedback', '.lesson.xp-lesson .pbar']) assert.ok(xcss.includes(sel), sel);
  const bloque = xcss.slice(xcss.indexOf('/* ---- ejercicios'));
  assert.ok(!/#[0-9a-fA-F]{3,6}\b/.test(bloque.replace(/rgba?\([^)]*\)/g, '')), 'sin colores fijos: todo sale de las variables del tema');
  assert.match(bloque, /prefers-reduced-motion/);
});
