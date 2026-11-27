// Al comprobar, los ejercicios de tocar se mueven (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all), GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), XG = get(ctx, 'XG');
const EX = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.flatMap(u => u.lessons).flatMap(l => l.ex.map(e => ({ l, e }))).filter(x => GAMES[x.e.game]?.marca);
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
const P = g => EX.find(x => x.e.game === g).e.params;

test('hay ejercicios de tocar y las dos tablas nombran solo a ellos', () => {
  assert.ok(EX.length >= 90);
  for (const t of ['MUEVE', 'PRUEBA']) for (const g in XG[t]) assert.ok(EX.some(x => x.e.game === g), `${t}: ${g}`);
  assert.ok(html.indexOf('marca-mueve.js') > html.lastIndexOf('-escena.js'), 'va después de las escenas');
});

test('la escena corre con cualquier respuesta, sin errores, y de verdad se mueve', () => {
  for (const { e } of EX) {
    const G = GAMES[e.game], p = e.params, M = XG.MUEVE[e.game]; if (!M) continue;
    const st = G.sitios(p), sol = G.solve(p).on;
    const ons = [sol, sol.map(x => !x), ...sol.map((_, i) => sol.map((x, k) => (k === i ? !x : x))), ...sol.map((_, i) => sol.map((_, k) => k === i))].filter(o => o.some(Boolean));
    for (const on of ons) for (const f of [0, 0.01, 0.3, 0.5, 0.77, 0.99, 1]) assert.ok(!malo(M(K, p, on, f, st)), `${e.game} ${on} ${f}`);
    assert.ok(new Set([0, 0.23, 0.51, 0.83].map(f => M(K, p, sol, f, st))).size > 1, `${e.game}: no se mueve`);
  }
});

test('la cuenta de cada tarjeta cabe, se lee y no rompe el dibujo', () => {
  for (const { e } of EX) {
    const G = GAMES[e.game], p = e.params, Q = XG.PRUEBA[e.game]; if (!Q) continue;
    G.sitios(p).forEach((t, i) => { const s = Q(p, i); assert.ok(typeof s === 'string' && s.length && !malo(s) && !/[<&]/.test(s), `${e.game} ${i}: ${s}`); assert.ok(!t.red, `${e.game}: la cuenta borraría el dato`); assert.ok(t.h >= 36 || ['tabla-diferencia', 'donde-pintura'].includes(e.game), `${e.game}: no cabe el dato con la cuenta`); assert.ok((t.w - 10) / (s.length * 0.56) >= 9, `${e.game}: «${s}» no cabe en ${t.w}`); });
  }
});

test('las cuentas dicen lo mismo que la respuesta', () => {
  const dice = (g, re) => { const p = P(g), sol = GAMES[g].solve(p).on; sol.forEach((x, i) => assert.equal(re.test(XG.PRUEBA[g](p, i)), x, `${g} ${i}: ${XG.PRUEBA[g](p, i)}`)); };
  dice('toca-primos', /^1 · /); dice('x-consigo', /^da 8$/); dice('tumba-todos', /: sí · .*: no$/); dice('precio-posible', /^más del barato$/); dice('cifra-que-falta', /^exacta$/); dice('tabla-criterios', /^da /);
  dice('tabla-desigual', /≠/); dice('tabla-diferencia', /^4$/); dice('mismo-sabor', / = /); dice('mismo-final', / 120$/);
  for (const g of ['palabras-distintas', 'mismo-grupo']) { const p = P(g), sol = GAMES[g].solve(p).on, s = new Set(sol.map((x, i) => x && XG.PRUEBA[g](p, i)).filter(Boolean)); assert.equal(s.size, 1, g); sol.forEach((x, i) => assert.equal(s.has(XG.PRUEBA[g](p, i)), x, g)); }
  const p = P('siete-veces'); GAMES['siete-veces'].solve(p).on.forEach((x, i) => assert.equal(XG.PRUEBA['siete-veces'](p, i).endsWith(`= ${p.nums[i]}`), x));
  const d = P('mismo-destino'), s = GAMES['mismo-destino'].solve(d).on, r = new Set(s.map((x, i) => x && XG.PRUEBA['mismo-destino'](d, i)).filter(Boolean)); assert.equal(r.size, 1); s.forEach((x, i) => assert.equal(r.has(XG.PRUEBA['mismo-destino'](d, i)), x));
  const t = P('regla-todos'); GAMES['regla-todos'].solve(t).on.forEach((x, i) => assert.equal(t.e.every(([a, b]) => XG.PRUEBA['regla-todos'](t, i).includes(`${a} → ${b}`)), x));
  const ex = P('dato-exagerado'); GAMES['dato-exagerado'].solve(ex).on.forEach((x, i) => { const [a, b] = XG.PRUEBA['dato-exagerado'](ex, i).split(' → '); assert.equal(a !== b, x, ex.fichas[i]); });
});

test('lo que se ejecuta coincide con lo que se califica', () => {
  const p = P('prende-circuito'), M = XG.MUEVE['prende-circuito'], G = GAMES['prende-circuito'], st = G.sitios(p);
  for (let m = 1; m < 8; m++) { const on = [0, 1, 2].map(i => !!(m >> i & 1)); assert.equal(/xf fo/.test(M(K, p, on, 1, st)), (on[0] || on[1]) && on[2], on.join()); }
  for (const g of ['cierra-cubo', 'giro-o-espejo']) { const q = P(g), sol = GAMES[g].solve(q).on, s2 = GAMES[g].sitios(q); sol.forEach((x, i) => { const h = XG.MUEVE[g](K, q, sol.map((_, k) => k === i), 1, s2); assert.equal(/xf ff/.test(h), !x, `${g} ${i}`); }); }
  const m = P('misma-mesa'), sm = GAMES['misma-mesa'].solve(m).on; sm.forEach((x, i) => assert.equal(!/s tf/.test(XG.MUEVE['misma-mesa'](K, m, sm.map((_, k) => k === i), 1, GAMES['misma-mesa'].sitios(m))), x, `mesa ${i}`));
  const c = P('palabra-camino'), sc = GAMES['palabra-camino'].solve(c).on; sc.forEach((x, i) => assert.equal(/xf fo/.test(XG.MUEVE['palabra-camino'](K, c, sc.map((_, k) => k === i), 1, GAMES['palabra-camino'].sitios(c))), x, c.fichas[i]));
});
