// Al comprobar, las fichas se mueven (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all), GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), XG = get(ctx, 'XG');
const EX = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.flatMap(u => u.lessons).flatMap(l => l.ex).filter(e => GAMES[e.game]?.rotula);
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
const P = g => EX.find(e => e.game === g).params;

test('cada uno tiene su cierre y su aviso', () => { for (const e of EX) { const b = GAMES[e.game].bien(e.params); assert.ok(typeof b === 'string' && b.length > 4 && !malo(b), e.game); } });

test('las tablas nombran solo ejercicios de arrastrar y el orden no se salta lugares', () => {
  assert.ok(EX.length >= 140);
  for (const g in XG.ROTULA) assert.ok(EX.some(e => e.game === g), g);
  for (const g in XG.ORDEN) assert.equal([...XG.ORDEN[g]].sort().join(), GAMES[g].metas(P(g)).map((_, i) => i).join(), g);
});

test('la escena corre con cualquier ficha en cualquier lugar, y se mueve', () => {
  for (const g in XG.ROTULA) {
    const p = P(g), M = XG.ROTULA[g], sol = [...GAMES[g].metas(p)], fs = [...new Set(GAMES[g].fichas(p))];
    const vs = [sol, ...sol.flatMap((_, i) => fs.map(x => sol.map((y, k) => (k === i ? x : y)))), fs.slice(0, sol.length), [...fs].reverse().slice(0, sol.length)].filter(v => v.length === sol.length);
    for (const v of vs) for (const f of [0, 0.01, 0.3, 0.5, 0.77, 0.99, 1]) assert.ok(!malo(M(K, p, v, f)), `${g} ${v} ${f}`);
    assert.ok(new Set([0, 0.23, 0.51, 0.83].map(f => M(K, p, sol, f))).size > 2, `${g}: no se mueve`);
  }
});

test('la cuenta con las fichas buenas da la ficha buena, y con otras no miente', () => {
  let n = 0;
  for (const e of EX) { const v = [...GAMES[e.game].metas(e.params)], c = XG.cadena(e.params.ops, v); if (!c) continue; n++; assert.equal(c.t, v[c.en], `${e.game}: ${v} da ${c.t}`); }
  assert.ok(n >= 18, `${n} cuentas`);
  assert.equal(XG.cadena(['·', '='], ['2/3', '3/4', '1']).t, '1/2'); assert.equal(XG.cadena(['−', '='], ['6', '9', '−3']).t, '−3'); assert.equal(XG.cadena(['+', '+', '='], ['1', '2', '3', '7']).t, '6');
  assert.equal(XG.cadena(['·', '='], ['2/3', '−3', '1']).tex, '$\\tfrac{2}{3} \\cdot (-3) = -2$'); assert.equal(XG.cadena(['+', '·', '='], ['1', '2', '3', '9']), null);
  assert.equal(XG.cadena(['÷', '='], ['5', '0', '1']), null); assert.equal(XG.cadena(['→', '→'], ['1', '2', '3']), null); assert.equal(XG.cadena(undefined, ['1']), null); assert.equal(XG.cadena(['·', '='], ['a', '2', '3']), null);
});

test('lo que se ejecuta coincide con lo que se califica', () => {
  const M = (g, v) => XG.ROTULA[g](K, P(g), v, 1);
  assert.match(M('tres-circulos', P('tres-circulos').metas), /suma 22.*suma 24.*suma 20/s);
  assert.match(M('llena-encuesta', P('llena-encuesta').metas), /van 70/); assert.match(M('suma-letras', P('suma-letras').metas), /van 57/);
  assert.match(M('suma-con-letras', P('suma-con-letras').metas), /da 95/); assert.match(M('resta-con-letras', P('resta-con-letras').metas), /da 36/); assert.match(M('producto-con-letras', P('producto-con-letras').metas), /= 486/);
  for (const g of ['desde-el-final', 'deshace-operador', 'arbol-primos']) {
    const p = P(g); assert.ok(!/s tf/.test(M(g, p.metas)), g);
    p.metas.forEach((m, i) => { const x = p.fichas.find(y => y !== m); assert.match(M(g, p.metas.map((y, k) => (k === i ? x : y))), /s tf/, `${g} ${i}`); });
  }
});
