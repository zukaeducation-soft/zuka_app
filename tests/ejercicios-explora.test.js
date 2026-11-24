// Ejercicios con las escenas de la explicación (spec 2026-11-24-ejercicios-explora): la respuesta se arma sin que la escena
// la diga, se califica con una función pura, y los datos de pu-cm-1 tienen la solución que deben y no otra.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES');
const L = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.flatMap(u => u.lessons).find(l => l.id === 'pu-cm-1');
const P = g => L.ex.find(e => e.game === g).params;
const G = g => GAMES[g];
const NEW = ['recta-muda', 'dos-radares', 'arma-viaje', 'taller-saltos', 'signos-condiciones', 'potencia-signo', 'parentesis-justo', 'lanza-ficha'];
const span = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

test('pu-cm-1: los ocho juegos de la escena y la zona de examen, en el orden de la explicación', () => {
  assert.equal(L.ex.map(e => e.game).join(), [...NEW, 'completa-solucion', 'caza-error', 'opcion-examen'].join());
});

test('cada juego: la solución gana, el estado inicial no, y no nace listo para comprobar', () => {
  for (const g of NEW) {
    assert.equal(G(g).xp, true, g);
    assert.equal(G(g).grade(G(g).solve(P(g)), P(g)).ok, true, `${g}: solve`);
    assert.equal(G(g).grade(G(g).ini(P(g)), P(g)).ok, false, `${g}: ini`);
    assert.equal(G(g).grade(undefined, P(g)).ok, false, `${g}: sin estado`);
    assert.equal(G(g).listo(G(g).ini(P(g)), P(g)), false, `${g}: nace listo`);
    assert.equal(G(g).listo(G(g).solve(P(g)), P(g)), true, `${g}: la solución se puede comprobar`);
    assert.ok(G(g).texto(P(g)).length > 5, g);
    assert.equal((G(g).texto(P(g)).match(/\$/g) || []).length % 2, 0, `${g}: $ sin cerrar`);
  }
});

test('recta-muda: cuatro lugares distintos dentro de la recta', () => {
  const p = P('recta-muda'), v = p.fichas.map(f => f.v);
  assert.ok(v.length === 4 && new Set(v).size === 4 && v.every(x => x >= p.min && x <= p.max));
  assert.ok(v.some(x => x < 0) && v.some(x => x > 0));
  assert.ok(!v.some(x => p.rotulos.includes(x)), 'ninguna cae sobre un número ya escrito');
});

test('dos-radares: un solo lugar cumple las dos distancias, y cada radar solo tendría dos dentro de la recta', () => {
  const p = P('dos-radares'), xs = span(p.min, p.max);
  assert.equal(xs.filter(x => G('dos-radares').grade({ v: x }, p).ok).length, 1);
  for (const r of p.radares) assert.equal(xs.filter(x => Math.abs(x - r.v) === r.d).length, 2, `radar en ${r.v}`);
});

test('arma-viaje: una sola pareja de cartas llega, incluye restar un negativo, y ningún orden se sale de la recta', () => {
  const p = P('arma-viaje'), n = p.cartas.length, ok = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j && G('arma-viaje').grade({ en: [i, j] }, p).ok) ok.push([i, j]);
  assert.equal(ok.length, 2, 'la misma pareja en los dos órdenes');
  assert.equal([...ok[0]].sort().join(), [...ok[1]].sort().join());
  for (const [i, j] of ok) { const m = p.desde + p.cartas[i].d; assert.ok(m >= p.min && m <= p.max); assert.equal(m + p.cartas[j].d, p.meta); }
  assert.ok(ok[0].some(i => /- \(-/.test(p.cartas[i].t)));
  for (const c of p.cartas) assert.equal(Function(`return 0 ${c.t}`)(), c.d, c.t);
});

test('taller-saltos: hay que usar dos negativos', () => {
  const p = P('taller-saltos'), xs = span(-p.tope, p.tope), ok = [];
  for (const a of xs) for (const b of xs) if (G('taller-saltos').grade({ a, b }, p).ok) ok.push([a, b]);
  assert.ok(ok.length >= 1 && ok.every(([a, b]) => a < 0 && b < 0 && a * b === p.meta), JSON.stringify(ok));
  assert.equal(G('taller-saltos').grade({ a: 3, b: 5 }, p).ok, false, 'sin voltear no vale');
  assert.ok(p.meta <= p.max && p.tope <= p.max);
});

test('signos-condiciones: producto y suma se piden a la vez; ni «todos» ni «uno» sirven', () => {
  const p = P('signos-condiciones'), n = p.factores.length;
  let hay = 0;
  for (let m = 0; m < 1 << n; m++) {
    const neg = p.factores.map((_, i) => !!(m >> i & 1)), r = G('signos-condiciones').grade({ neg }, p).ok;
    const vals = p.factores.map((f, i) => (neg[i] ? -f : f)), c = neg.filter(Boolean).length;
    assert.equal(r, vals.reduce((a, b) => a * b, 1) > 0 && vals.reduce((a, b) => a + b, 0) < 0 && c < n, JSON.stringify(vals));
    hay += r;
  }
  assert.ok(hay >= 1 && hay <= 4, String(hay));
});

test('potencia-signo: solo una combinación vale lo pedido con el menos adentro', () => {
  const p = P('potencia-signo'), ok = [];
  for (const fuera of [false, true]) for (const dentro of [false, true]) for (const e of span(1, p.max)) if (G('potencia-signo').grade({ fuera, dentro, e }, p).ok) ok.push([fuera, dentro, e]);
  assert.equal(JSON.stringify(ok), JSON.stringify([[true, true, 4]]));
  assert.equal(-((-2) ** 4), p.meta);
});

test('parentesis-justo: el valor se calcula bien y un solo paréntesis da la meta', () => {
  const g = G('parentesis-justo'), p = P('parentesis-justo'), nums = p.expr.split(' ').filter(t => /\d/.test(t)), vals = [];
  for (let a = 0; a < nums.length; a++) for (let b = a + 1; b < nums.length; b++) {
    const toks = g.toks({ a, b }, p), v = Function(`return (${toks.join(' ')})`)();
    assert.equal(g.valor(toks), v, toks.join(' '));
    vals.push([a, b, v]);
  }
  assert.equal(vals.filter(x => x[2] === p.meta).length, 1);
  assert.ok(new Set(vals.map(x => x[2])).size >= 4, 'los demás paréntesis dan otros resultados');
  assert.notEqual(g.valor(p.expr.split(' ')), p.meta, 'sin paréntesis no da');
});

test('lanza-ficha: tres tiros que caben en la recta; se perdona un fallo y con dos se pierde', () => {
  const g = G('lanza-ficha'), p = P('lanza-ficha');
  assert.equal(p.tiros.length, 3);
  for (const t of p.tiros) {
    const v = t.desde + t.d;
    assert.ok(v >= p.min && v <= p.max && t.d !== 0 && Math.abs(t.d) <= p.tope, JSON.stringify(t));
    assert.equal(Function(`return ${t.t}`)(), v, t.t);
  }
  assert.ok(p.tiros.some(t => /- \(-/.test(t.t)) && p.tiros.some(t => t.d < 0));
  let s = g.ini(p);
  s = g.tira(s, p.tiros[0].d + 1, p);
  assert.equal(s.n, 0); assert.equal(s.fallos, 1); assert.equal(g.listo(s, p), false);
  for (const t of p.tiros) s = g.tira(s, t.d, p);
  assert.equal(g.grade(s, p).ok, true, 'un fallo se perdona');
  s = g.ini(p);
  for (let k = 0; k < 2; k++) s = g.tira(s, p.tiros[0].d - 1, p);
  assert.equal(g.listo(s, p), true); assert.equal(g.grade(s, p).ok, false);
  assert.equal(g.tira(s, p.tiros[0].d, p), s, 'terminado no se tira más');
});

test('consistencia: ningún juego nuevo pinta en lienzo ni usa colores propios; la zona de examen se viste igual', () => {
  for (const f of ['explora-kit', ...NEW]) {
    const src = read(`js/games/${f}.js`);
    assert.ok(!/mountSketch|#[0-9a-fA-F]{6}\b/.test(src), f);
  }
  const css = read('css/explora.css'), bloque = css.slice(css.indexOf('/* ---- juegos con las escenas'));
  assert.ok(bloque.length > 500 && !/#[0-9a-fA-F]{3,6}\b/.test(bloque));
  assert.match(bloque, /prefers-reduced-motion/);
  assert.match(bloque, /\.lesson\.xp-lesson \.exq/);
});

test('lo que se pide no son los ejemplos de la explicación', () => {
  const t = read('js/explora-pu-cm-1.js');
  assert.ok(!t.includes(P('parentesis-justo').expr));
  for (const c of P('lanza-ficha').tiros) assert.ok(!t.includes(`$${c.t}`), c.t);
  assert.ok(!t.includes(`meta: ${P('taller-saltos').meta},`));
});

test('revisión: lo calificado no cambia después, las teclas no se escapan, y una ficha colgada se puede correr', () => {
  const kit = read('js/games/explora-kit.js'), muda = read('js/games/recta-muda.js'), ekit = read('js/games/examen-kit.js');
  assert.match(kit, /set\(n\) \{ if \(locked\) return;/);
  assert.match(kit, /root\.addEventListener\('keydown'/);
  assert.match(kit, /onpointercancel = e => \{ if \(deja\(e\) && o\.suelta\) pon\(0\)/);
  assert.match(muda, /class="xg-muda" data-drop/);
  assert.match(ekit, /\|\| d\) return/);
  assert.match(ekit, /d\?\.ghost\?\.remove\(\)/);
  for (const g of NEW) assert.ok(!/const fin|return ok => \{[\s\S]*ui\.set\(/.test(read(`js/games/${g}.js`).split('return ok =>')[1] || ''), `${g}: al terminar usa ui.muestra`);
  const ex = g => L.ex.find(e => e.game === g).q;
  assert.match(ex('signos-condiciones'), /al menos uno/);
  assert.match(ex('lanza-ficha'), /fallar \*\*una\*\*/);
});

// ---- pu-cm-2 «Fracciones» ----
const L2 = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.flatMap(u => u.lessons).find(l => l.id === 'pu-cm-2');
const P2 = g => L2.ex.find(e => e.game === g).params;
const FR = ['corta-iguales', 'fraccion-gemela', 'entre-fracciones', 'piezas-exactas', 'resta-falta', 'parte-de-parte', 'total-escondido', 'lanza-fraccion'];

test('pu-cm-2: ocho juegos de la escena; la solución gana, el inicio no y no nace listo', () => {
  assert.equal(L2.ex.slice(0, 8).map(e => e.game).join(), FR.join());
  for (const g of FR) {
    const p = P2(g);
    assert.equal(G(g).xp, true, g);
    assert.equal(G(g).grade(G(g).solve(p), p).ok, true, `${g}: solve`);
    assert.equal(G(g).grade(G(g).ini(p), p).ok, false, `${g}: ini`);
    assert.equal(G(g).grade(undefined, p).ok, false, g);
    assert.equal(G(g).listo(G(g).ini(p), p), false, `${g}: nace listo`);
    assert.equal(G(g).listo(G(g).solve(p), p), true, g);
    assert.equal((G(g).texto(p).match(/\$/g) || []).length % 2, 0, g);
  }
});

test('pu-cm-2: las respuestas aceptadas son exactamente las que deben', () => {
  const todas = (g, max) => span(1, max).flatMap(d => span(1, max).map(n => [n, d])).filter(([n, d]) => G(g).grade({ n, d }, P2(g)).ok).map(x => x.join('/')).join();
  assert.equal(todas('fraccion-gemela', 15), '8/12,10/15');
  assert.equal(todas('entre-fracciones', 12), '4/7,5/9,6/11,7/12');
  assert.equal(todas('resta-falta', 12), '3/8');
  const p = P2('piezas-exactas'), n = p.piezas.length, ok = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) if (G('piezas-exactas').grade({ en: [a, b, c] }, p).ok) ok.push([a, b, c].map(i => p.piezas[i].join('/')).sort().join());
  assert.equal(ok.join(' · '), '1/2,1/4,1/6');
  assert.ok(p.piezas.every(x => p.den % x[1] === 0));
  const tot = P2('total-escondido');
  assert.equal(span(1, 12).flatMap(parte => span(1, 10).map(k => [parte, k])).filter(([parte, k]) => G('total-escondido').grade({ parte, n: k }, tot).ok).join(), '7,5');
  const pp = P2('parte-de-parte');
  for (const [w, h, b] of [[6, 1, true], [3, 2, true], [2, 3, true], [8, 1, false], [4, 2, false]]) assert.equal(G('parte-de-parte').grade({ w, h }, pp).ok, b, `${w}x${h}`);
  const c = P2('corta-iguales');
  assert.equal(G('corta-iguales').grade({ c: [4, 8, 12, 16], t: [true, false, true, true, false] }, c).ok, true, 'valen tres partes cualesquiera');
  assert.equal(G('corta-iguales').grade({ c: [4, 8, 12, 15], t: [true, true, true, false, false] }, c).ok, false);
});

test('pu-cm-2: los tiros en doceavos son la cuenta que dicen y caben en la recta', () => {
  const p = P2('lanza-fraccion');
  for (const t of p.tiros) {
    const s = t.t.replace(/\\tfrac(\d)(\d)/g, '($1/$2)');
    assert.ok(Math.abs(Function(`return ${s}`)() - (t.desde + t.d) / p.den) < 1e-9, t.t);
    assert.ok(t.desde + t.d >= p.min && t.desde + t.d <= p.max && Math.abs(t.d) <= p.tope);
  }
  assert.match(G('lanza-fraccion').texto(p), /\\tfrac\{11\}\{12\}.*\\tfrac\{5\}\{12\}.*\\tfrac\{4\}\{3\}/);
});

test('pu-cm-2: no repite los ejemplos de la explicación', () => {
  const t = read('js/explora-pu-cm-2.js');
  for (const x of [P2('resta-falta').de, P2('fraccion-gemela').a]) assert.ok(!t.includes(`meta: [${x.join(', ')}]`));
  assert.ok(!/21|35 boletas/.test((t.match(/total: \d+/g) || []).join()));
});
