// Conjuntos (pu-cj-1 y pu-cj-2) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-conjuntos');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-cj-1': 'ubica-cada,pinta-operacion,nombra-dibujo,zonas-y-total,ciertas-siempre,elementos-de,misma-zona,sube-union',
  'pu-cj-2': 'llena-encuesta,corre-solape,tres-circulos,pinta-tres,lee-encuesta,desde-los-totales,porciento-comun,sube-encuesta',
};
const J = Object.keys(LISTA).flatMap(id => L(id).ex.slice(0, 8).map(e => ({ e, G: GAMES[e.game], p: e.params })));
const P = g => J.find(j => j.e.game === g).p;
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);

test('cada lección: ocho juegos en orden y la zona de examen', () => {
  for (const id in LISTA) assert.equal(L(id).ex.map(e => e.game).join(), `${LISTA[id]},completa-solucion,caza-error,opcion-examen`, id);
});

test('la solución gana, el inicio no, no nace listo, y hay guía y pista', () => {
  for (const { e, G, p } of J) {
    assert.equal(G.xp, true, e.game);
    assert.equal(G.grade(G.solve(p), p).ok, true, `${e.game}: solve`);
    assert.equal(G.grade(G.ini(p), p).ok, false, e.game); assert.equal(G.grade(undefined, p).ok, false, e.game);
    assert.equal(G.listo(G.ini(p), p), false, e.game); assert.equal(G.listo(G.solve(p), p), true, e.game);
    assert.ok(!malo(G.texto(p)) && (G.texto(p).match(/\$/g) || []).length % 2 === 0, e.game);
    assert.ok(GUIDES[e.game], e.game); assert.ok(e.hint.length > 40, e.game);
  }
});

test('ubica-cada: cada número solo se acepta en su zona', () => {
  const G = GAMES['ubica-cada'], p = P('ubica-cada'), s = G.solve(p);
  const A = [130, 92], B = [210, 92], zona = (x, y) => (x < 16 || x > 324 || y < 8 || y > 176 ? -1 : (a => b => (a && b ? 1 : a ? 0 : b ? 2 : 3))(Math.hypot(x - A[0], y - A[1]) <= 66)(Math.hypot(x - B[0], y - B[1]) <= 66));
  p.els.forEach((e, i) => { const n = +e.t; assert.equal(e.z, n % 3 === 0 && n % 4 === 0 ? 1 : n % 3 === 0 ? 0 : n % 4 === 0 ? 2 : 3);
    for (let x = 20; x <= 320; x += 6) for (let y = 16; y <= 206; y += 6) { const v = { ...s, [`x${i}`]: x, [`y${i}`]: y }, ok = zona(x, y) === e.z; assert.equal(G.grade(v, p).ok, ok, `${e.t} ${x},${y}`); if (!ok) assert.ok(G.aviso(v, p).length > 10 && !malo(G.aviso(v, p))); } });
  for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(s, K, p, f)));
  assert.ok(G.aviso(G.ini(p), p).length > 10);
});

test('corre-solape: una sola respuesta y la línea no se ve mientras se responde', () => {
  const G = GAMES['corre-solape'], p = P('corre-solape'), ok = [];
  for (let s = 0; s <= p.b; s++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib({ s }, K, p, f))); if (G.grade({ s }, p).ok) ok.push(s); else assert.ok(!malo(G.aviso({ s }, p))); const m = G.manijas(p)[0], [x, y] = m.en({ s }); assert.ok(x >= 16 && x <= 326); assert.equal(Math.round(m.de(x, y)), s); }
  assert.equal(ok.join(), '16'); assert.ok(!/lo gr/.test(G.dib({ s: 16 }, K, p, 0)));
});

test('cuentas y zonas, por fuerza bruta', () => {
  const M = g => P(g).metas.join();
  assert.equal(M('zonas-y-total'), [17 - 6, 25 - 17, 25 - 17 + 6].join());
  assert.equal(M('llena-encuesta'), [38 - 12, 12, 29 - 12, 70 - (38 + 29 - 12)].join());
  assert.equal(M('tres-circulos'), [9 - 3, 7 - 3, 8 - 3, 22 - 6 - 4 - 3, 24 - 6 - 5 - 3, 20 - 4 - 5 - 3].join());
  const [sa, d, sb, o] = P('lee-encuesta').z.map(Number); assert.equal(M('lee-encuesta'), [sa + d + sb, sa + sb, sb + o, sa + d + sb + o].join());
  assert.equal(M('desde-los-totales'), [65 - 7, 58 - 38, 38 + 33 - 58, 58 - 33].join());
  assert.equal(M('porciento-comun'), [85, 65 + 55 - 85, 65 - 35, 30 + 20].join());
  // Zonas como (¿en A?, ¿en B?).
  const Z = { a: [1, 0], i: [1, 1], b: [0, 1], o: [0, 0] }, pinta = f => Object.keys(Z).filter(k => f(...Z[k])).sort().join('');
  assert.equal([...P('pinta-operacion').zonas].sort().join(''), pinta((x, y) => !x || y));
  const op = { 'A − B': (x, y) => x && !y, 'Aᶜ': x => !x, '(A ∪ B)ᶜ': (x, y) => !(x || y), '(A ∩ B)ᶜ': (x, y) => !(x && y), 'B − A': (x, y) => y && !x, 'A ∪ Bᶜ': (x, y) => x || !y, 'Bᶜ': (x, y) => !y, 'A ∩ Bᶜ': (x, y) => x && !y, 'A − (A ∩ B)': (x, y) => x && !(x && y), '(A ∪ B) − B': (x, y) => (x || y) && !y };
  const n = P('nombra-dibujo'); n.ks.forEach((ks, i) => assert.equal([...ks].sort().join(''), pinta(op[n.metas[i]])));
  P('misma-zona').casos.forEach(c => assert.equal(!!c.si, pinta(op[c.t]) === 'a', c.t));
  const t3 = [[1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]; assert.equal(P('pinta-tres').zonas.join(), t3.map(([x, y, z], i) => (z && (x || y) ? i : -1)).filter(i => i >= 0).join());
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'pinta-operacion': '0,2,3', 'ciertas-siempre': '0,2,4', 'elementos-de': '1,3,5', 'misma-zona': '0,2,4', 'pinta-tres': '1,2,6' };
  for (const g in E) assert.equal(S(g), E[g], g);
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length, sol = G.solve(p).on;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true))); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    assert.ok(!malo(G.fondo?.(K, p) ?? ''), e.game);
    if (n <= 8) for (let m = 1; m < 2 ** n; m++) { const on = sol.map((_, k) => !!(m >> k & 1)); if (!G.grade({ on }, p).ok) { const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game}: ${on}`); } }
    for (let i = 0; i < n; i++) { const on = sol.map((x, k) => (k === i ? !x : x)); if (!on.some(Boolean)) continue; assert.equal(G.grade({ on }, p).ok, false); const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game} ${i}: ${a}`); }
  }
});

test('rótulos: las fichas alcanzan, caben, no se pisan, y cada error tiene aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    assert.equal(sl.length, m.length, e.game);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2 || e.game === 'x', e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 - 8 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 4, `${e.game}: «${t}» no cabe en ${a.w}`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a?.length > 10 && !malo(a), `${e.game} ${i}:${y}`); } });
    for (const k of Object.keys(p.trampas || {})) { const [i, t] = k.split(':'), r = [...p.fichas]; m.slice(0, +i).forEach(x => r.splice(r.indexOf(x), 1)); assert.ok(r.includes(t) && m[+i] !== t, `${e.game}: trampa ${k}`); }
  }
});

test('tiros: la respuesta cabe, los errores también, y fallar no la enseña', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 2);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.cara(o.max) && +x % o.cara(1) === 0, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'conjuntos-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
