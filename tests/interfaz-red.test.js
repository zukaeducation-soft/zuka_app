// Interfaz «red» (spec 2026-11-27-interfaz-red): neón sobrio, sin relieve de juguete, y la marca del cerebro en malla.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const css = read('css/styles.css'), index = read('index.html'), app = read('js/app.js'), sw = require('./load').shell();
const manifest = JSON.parse(read('manifest.json'));
const block = sel => (css.match(new RegExp(sel.replace(/[.#[\]=":*()]/g, '\\$&') + '\\s*\\{([^}]*)\\}')) || [])[1] || '';
const dark = block(':root'), light = block(':root[data-theme="light"]');
const v = (b, name) => (b.match(new RegExp(`${name}:\\s*([^;]+);`)) || [])[1];
// Reglas sueltas «selector { cuerpo }» (el archivo no anida reglas salvo @media, que aquí da igual).
const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({ sel: m[1].trim(), body: m[2] }));

test('los dos temas traen el fondo negro azulado, el acento hielo y las variables nuevas', () => {
  assert.equal(v(dark, '--bg'), '#07080f');
  assert.equal(v(dark, '--brand'), '#6fd3ff');
  assert.equal(v(dark, '--on-brand'), '#04121d');
  assert.equal(v(light, '--on-brand'), '#ffffff');
  for (const b of [dark, light]) for (const k of ['--halo', '--ink-mix']) assert.match(v(b, k) || '', /^\d+%$/, k);
  assert.match(v(dark, '--display') || '', /Jost/);
});

test('el documento, la portada, theme-color y el manifiesto usan el --bg de cada tema', () => {
  const d = v(dark, '--bg'), l = v(light, '--bg');
  assert.ok(index.includes(`<meta name="theme-color" content="${d}">`));
  assert.ok(app.includes(`t === 'dark' ? '${d}' : '${l}'`), 'applyTheme');
  assert.equal(manifest.theme_color, d);
  assert.equal(manifest.background_color, d, 'la pantalla de inicio de Android es el fondo del icono');
});

test('ninguna sombra dura: el relieve de juguete se fue', () => {
  const hard = /box-shadow:[^;}]*(?:^|[\s,])0 [1-9]\d*px 0 (?:var|color-mix|#|rgb)/;
  const bad = rules.filter(r => hard.test(r.body)).map(r => r.sel);
  assert.deepEqual(bad, []);
});

test('bordes finos y sin peso 800', () => {
  assert.doesNotMatch(css, /2px solid var\(--line\)/);
  assert.doesNotMatch(css, /font-weight:\s*800/);
  assert.doesNotMatch(read('admin/admin.css'), /font-weight:\s*800/);
  assert.doesNotMatch(app, /'800'/, 'la app ya no pide el peso 800');
  const fonts = (index.match(/fonts\.googleapis\.com\/css2\?[^"]+/) || [''])[0];
  assert.match(fonts, /Plus\+Jakarta\+Sans:wght@400;500;600;700&/);
  assert.match(fonts, /Jost:wght@[\d;]*600/);
});

test('sobre el color de marca la tinta es --on-brand, no blanco fijo', () => {
  const onBrand = r => /background:\s*var\(--brand\)|--c:\s*var\(--brand\)/.test(r.body);
  const bad = rules.filter(r => onBrand(r) && /(?:^|[;\s])color:\s*#fff\b/.test(r.body)).map(r => r.sel);
  assert.deepEqual(bad, []);
  assert.match(block('.btn.brand'), /color:\s*var\(--on-brand\)/);
});

test('el camino es una red: nodo con aro, hecho encendido, cerrado apagado y aristas finas', () => {
  assert.match(block('.node'), /border:\s*1\.5px solid var\(--c\)/);
  assert.match(block('.node'), /border-radius:\s*50%/);
  assert.match(block('.node.done'), /background:\s*var\(--gold\)/);
  assert.match(block('.node.locked'), /border-color:\s*var\(--line\)/);
  assert.match(block('.node.locked'), /box-shadow:\s*none/);
  const w = Number((block('.trail path').match(/stroke-width:\s*([\d.]+)/) || [])[1]);
  assert.ok(w > 0 && w <= 2, `arista de ${w}px`);
  assert.doesNotMatch(block('.trail path') + block('.world-map .trail path'), /stroke-dasharray:\s*2 1\d/, 'sin puntos gordos');
});

// ---- la marca ----
const marca = require('../tools/marca.js');
const built = marca.build();

test('js/marca.js sale de tools/marca.js y está registrado', () => {
  assert.equal(read('js/marca.js'), built.files['js/marca.js'].replace(/\r\n/g, '\n'), 'correr: node tools/marca.js');
  for (const f of ['brand/logo-dark.svg', 'brand/logo-light.svg', 'brand/cerebro.svg']) {
    assert.equal(read(f), built.files[f].replace(/\r\n/g, '\n'), f);
    assert.ok(sw.includes(`'${f}'`), `${f} en el SHELL`);
  }
  assert.ok(index.includes('<script defer src="js/marca.js"></script>'));
  assert.ok(index.indexOf('js/marca.js') < index.indexOf('js/ui.js'), 'antes de ui.js, que la usa en el diálogo');
  assert.ok(sw.includes("'js/marca.js'"));
});

test('la marca: un solo color, dentro del cuadro y con nombre accesible (spec 2026-11-24-logo-nuevo)', () => {
  const ctx = loadScripts(['js/marca.js']);
  const brainSVG = get(ctx, 'brainSVG'), brainTile = get(ctx, 'brainTile'), logoHTML = get(ctx, 'logoHTML');
  assert.match(brainSVG(), /^<svg class="brain" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"/);
  assert.match(brainSVG(), /class="rays"/, 'los destellos van aparte: la entrada los enciende');
  const [, tx, ty, k] = brainSVG().match(/translate\(([-\d.]+) ([-\d.]+)\) scale\(([\d.]+)\)/).map(Number);
  for (const d of brainSVG().match(/ d="[^"]+"/g)) {
    const n = d.match(/-?\d+\.?\d*/g).map(Number);
    n.forEach((v, i) => { const q = v * k + (i % 2 ? ty : tx); assert.ok(q >= 0 && q <= 100, `${q} fuera`); });
  }
  assert.match(brainTile(), /class="brain-tile"/);
  assert.match(brainTile('dialog-art'), /class="brain-tile dialog-art"/);
  assert.match(logoHTML(), /role="img" aria-label="Zuka"/);
  assert.match(logoHTML(), /class="wordmark"/);
  assert.match(read('js/presentacion.js'), /zukaWord = \(\) => logoHTML\(\)/, 'la barra, la cuenta y la presentación llevan el logo');
});

test('animación de entrada: vive en la portada; cerebro, nombre y eslogan (spec 2026-11-24-logo-nuevo)', () => {
  // El bloque de index.html es el que genera tools/marca.js y va dentro de #boot: se ve sin esperar a ningún script.
  assert.equal(index, built.withIntro(index), 'correr: node tools/marca.js');
  const boot = index.slice(index.indexOf('<div id="boot"'), index.indexOf('<div id="app"'));
  assert.ok(boot.includes(built.intro), 'la animación va dentro de la portada');
  const html = built.intro;
  assert.match(html, /<div class="intro-hero"><svg class="brain"/);
  assert.match(html, /<div class="intro-name"><svg class="wordmark"/);
  assert.match(html, /<p class="intro-say"><i style="--k:0">potencia<\/i> <i style="--k:1">tu<\/i> <i style="--k:2">mente<\/i><\/p>/);
  // El orden: aparece el cerebro, luego el nombre, luego las palabras; y la app espera a que termine.
  const hero = Number(block('.intro-hero').match(/intro-pop [\d.]+s [^;]* ([\d.]+)s both/)[1]);
  const say = Number(block('.intro-name').match(/intro-pop [\d.]+s [^;]* ([\d.]+)s both/)[1]);
  const words = Number(block('.intro-say i').match(/animation-delay: calc\(([\d.]+)s/)[1]);
  assert.ok(hero < say && say < words, `${hero} ${say} ${words}`);
  const ms = Number((app.match(/const INTRO_MS = (\d+)/) || [])[1]);
  assert.ok(ms >= (words + 2 * .3 + .3) * 1000 && ms <= 3500, `la portada espera ${ms} ms`);
  assert.match(css, /@keyframes intro-in \{ to \{ opacity: 1; \} \}/);
});

test('el icono de la app es el cerebro azul noche sobre blanco', () => {
  assert.match(read('tools/marca.js'), /brain\(\{ ink: NAVY \}\)/);
  for (const f of ['icons/zuka-claro-192.png', 'icons/zuka-claro-512.png', 'icons/zuka-claro-maskable-512.png', 'icons/zuka-claro-apple-180.png', 'icons/zuka-claro-favicon-48.png'])
    assert.ok(fs.statSync(path.join(ROOT, f)).size > 500, f);
});

test('la entrada no deja bordes claros: documento, portada y barra del celular oscuros mientras dura', () => {
  const inline = (index.match(/<style>([^<]*)<\/style>/) || [])[1] || '';
  assert.ok(inline.includes('html[data-intro],html[data-intro] body,html[data-intro] #boot{background:#07080f}'));
  assert.ok(inline.indexOf('html[data-intro]') > inline.indexOf('html[data-theme="light"] #boot'), 'gana al tema claro');
  assert.ok(inline.includes('html:not([data-intro]) .intro{display:none}'), 'sin entrada, la portada va vacía');
  // Una vez por sesión y no con «reducir movimiento»; lo decide el script del <head>, antes de pintar.
  const head = index.slice(0, index.indexOf('<style>'));
  assert.match(head, /!sessionStorage\.getItem\('zuka-intro'\) && !matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/);
  assert.match(head, /document\.documentElement\.dataset\.intro = '1'/);
  // La barra del celular (theme-color) sigue oscura durante la entrada y vuelve al tema al quitar la portada.
  assert.match(app, /content = document\.documentElement\.dataset\.intro \? '#07080f' : t === 'dark'/);
  const hide = app.slice(app.indexOf('function hideBoot('), app.indexOf('const INTRO_MS'));
  assert.match(hide, /delete document\.documentElement\.dataset\.intro; applyTheme\(\);/);
  // Sin entrada no se espera nada; con entrada, un toque la salta; y el respaldo en línea también limpia data-intro.
  const wait = app.slice(app.indexOf('function introWait('), app.indexOf('const fontsReady'));
  assert.match(wait, /if \(!document\.documentElement\.dataset\.intro \|\| !b\) return Promise\.resolve\(\);/);
  assert.match(wait, /b\.addEventListener\('click'/);
  assert.match(index, /setTimeout\(function \(\) \{[^}]*removeAttribute\('data-intro'\)/);
  assert.doesNotMatch(read('js/marca.js'), /intro/i, 'la entrada ya no viaja en js/marca.js');
});

test('la mascota y los logos viejos ya no se usan', () => {
  const files = ['index.html', 'sw.js', 'js/app.js', 'js/ui.js', 'js/tour.js', 'js/cuenta.js', 'admin/index.html', 'css/styles.css'];
  for (const f of files) assert.doesNotMatch(read(f), /mascota\.png|logo-(light|dark)\.png/, f);
  assert.doesNotMatch(read('js/tour.js'), /Soy Zuka/);
  assert.match(read('js/ui.js'), /brainTile\(/, 'el diálogo lleva la ficha del cerebro');
  // desde el 2026-11-20 al terminar la lección celebra el personaje nuevo (js/mascota.js, spec 2026-11-20-personaje)
  assert.match(app, /mascotSVG\('cheer', 'm-win'\)/, 'al terminar la lección celebra el personaje');
  // desde el 2026-11-20 la entrada lleva el nombre en letra, sin el cerebro de puntos (spec 2026-11-20-escritorio)
  assert.match(read('js/cuenta.js'), /zukaWord\(\)/);
});

test('la app se llama solo Zuka y sus iconos tienen nombre propio (los viejos quedaron guardados en los dispositivos)', () => {
  const m = JSON.parse(read('manifest.json'));
  assert.equal(m.name, 'Zuka');
  assert.equal(m.short_name, 'Zuka');
  assert.match(index, /<title>Zuka<\/title>/);
  assert.doesNotMatch(index + read('manifest.json'), /en clips/i);
  for (const i of [...m.icons, ...m.shortcuts.flatMap(s => s.icons || [])]) {
    assert.match(i.src, /^icons\/zuka-/);
    assert.ok(fs.existsSync(path.join(ROOT, i.src)), i.src);
  }
});
