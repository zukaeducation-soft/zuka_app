// Probabilidad (pu-pb-1 y pu-pb-2) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-probabilidad');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-pb-1': 'ruleta-favorables,iguala-urnas,tabla-diferencia,cuantas-parejas,cero-a-uno,punto-escala,grupo-gafas,sube-favorables',
  'pu-pb-2': 'lo-que-falta,cruce-sin-b,fallan-todos,no-se-afectan,arbol-bolsa,devuelve-o-no,falla-cuadrado,sube-por-ciento',
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

test('figuras: una sola respuesta, aviso en todas las demás', () => {
  const ok = {};
  for (const { e, G, p } of J.filter(j => j.G.figura)) {
    const ejes = G.manijas(p).flatMap(m => [].concat(m.k).map((k, i) => [k, [].concat(m.min)[i], [].concat(m.max)[i], m.paso]));
    const prueba = (v, i) => {
      if (i < ejes.length) { const [k, a, b, q] = ejes[i]; for (let j = 0; a + j * q <= b + 1e-9; j++) prueba({ ...v, [k]: Math.round((a + j * q) * 1000) / 1000 }, i + 1); return; }
      for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(v, K, p, f)), e.game);
      if (G.grade(v, p).ok) { (ok[e.game] ||= []).push(Object.values(v).join()); assert.ok(!malo(G.bien(v, p))); } else assert.ok(!malo(G.aviso(v, p)) && G.aviso(v, p).length > 10, e.game);
    };
    prueba({}, 0);
  }
  assert.equal(JSON.stringify(ok), JSON.stringify({ 'iguala-urnas': ['9'], 'punto-escala': ['0.2'], 'falla-cuadrado': ['0.4'] }));
});

test('cuentas: las probabilidades salen del enunciado', () => {
  const val = s => (s.includes('%') ? parseFloat(s) / 100 : s.includes('/') ? s.split('/')[0] / s.split('/')[1] : +s), M = g => P(g).metas.map(val);
  const igual = (g, l) => M(g).forEach((x, i) => assert.ok(Math.abs(x - l[i]) < 1e-9, `${g} ${i}: ${x} ≠ ${l[i]}`));
  // Cada meta es la única ficha que vale eso.
  for (const { e, G, p } of J.filter(j => j.G.rotula)) for (const m of p.metas) for (const f of G.fichas(p)) if (f !== m) assert.notEqual(val(f), val(m), `${e.game}: ${f} y ${m}`);
  const par = f => { let n = 0; for (let a = 1; a < 7; a++) for (let b = 1; b < 7; b++) if (f(a, b)) n++; return n; };
  igual('cuantas-parejas', [par((a, b) => a + b === 4), par((a, b) => a + b === 9), 1, par((a, b) => a + b >= 11)].map(n => n / 36));
  igual('cero-a-uno', [0, 1, 1 / 2, 4 / 20]); igual('grupo-gafas', [18 / 30, 10 / 30, 8 / 30]);
  igual('lo-que-falta', [5 / 8, 0.92, 0.9, 0.75]); igual('fallan-todos', [3 / 4, 4 / 5, 3 / 5, 2 / 5]);
  igual('arbol-bolsa', [3 / 5, 2 / 5, 4 / 5, 1 / 5]); igual('devuelve-o-no', [3 / 7, 2 / 6, 9 / 49, 3 / 7 * 2 / 6]);
  assert.equal(par((a, b) => a * b < 5), 8); assert.equal(20 * 3 / 5, 12); assert.equal(9 / 24, 3 / 8);
  assert.ok(Math.abs(1 - 0.2 * 0.3 - 0.94) < 1e-9); assert.ok(Math.abs(4 / 5 * 3 / 4 - 0.6) < 1e-9);
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'ruleta-favorables': '0,1,2,3,5,7', 'tabla-diferencia': '4,11,24,31', 'cruce-sin-b': '5,6,7,10,11,12,15,16,17', 'no-se-afectan': '0,2,4' };
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
  for (const { e } of J) for (const f in src) if (f !== 'probabilidad-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
