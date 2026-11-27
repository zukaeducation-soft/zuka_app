// Operadores definidos (pu-op-1 y pu-op-2) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-operadores');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-op-1': 'arma-receta,maquina-ida-vuelta,cuales-conmutan,entran-negativos,lee-operacion,tabla-desigual,neutro-de-cada,sube-operador',
  'pu-op-2': 'dos-parentesis,arbol-operador,lugar-x,iguala-lados,cadena-en-tabla,x-consigo,deshace-operador,sube-anidado',
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

test('figuras: una sola respuesta, y mientras se responde no se ve el resultado', () => {
  const ok = {};
  for (const { e, G, p } of J.filter(j => j.G.figura)) {
    const ms = G.manijas(p), prueba = (v, i) => {
      if (i < ms.length) { for (let x = ms[i].min; x <= ms[i].max; x++) prueba({ ...v, [ms[i].k]: x }, i + 1); return; }
      for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(v, K, p, f)));
      if (G.grade(v, p).ok) { (ok[e.game] ||= []).push(Object.values(v).join()); assert.ok(!malo(G.bien(v, p))); } else assert.ok(!malo(G.aviso(v, p)) && G.aviso(v, p).length > 10);
    };
    prueba({}, 0);
  }
  assert.equal(JSON.stringify(ok), '{"maquina-ida-vuelta":["3,5"],"iguala-lados":["6"]}');
  const G = GAMES['iguala-lados'], q = P('iguala-lados'), y = x => G.dib({ x }, K, q, 0);
  assert.equal(y(0), y(6), 'la balanza no se mueve mientras se responde');
});

test('cuentas: los resultados salen de la receta del enunciado', () => {
  const M = g => P(g).metas.map(x => x.replace('−', '-')).join();
  const r = (a, b) => 4 * a - b * b; assert.equal(M('arma-receta'), [3, 2, r(3, 2), 2, 3, r(2, 3)].join());
  assert.equal(M('entran-negativos'), [6, 9, -2 * -3 - 9].join());
  for (const a of [-3, 0, 7]) { const [e1, e2, e3, e4] = M('neutro-de-cada').split(',').map(Number); assert.deepEqual([a + e1 - 4, a + e2 + 9, a * e3, a * e4 / 3], [a, a, a, a]); }
  const s = (a, b) => a * b + 1; assert.equal(M('dos-parentesis'), [s(2, 3), s(s(2, 3), 4), s(3, 4), s(2, s(3, 4))].join());
  const m = (a, b) => a + 4 * b, d = (a, b) => a * a - b; assert.equal(M('arbol-operador'), [m(4, 1), d(2, 3), d(m(4, 1), d(2, 3))].join());
  const h = (a, b) => a * b + 3; assert.equal(h(h(5, 2), 4), 55); assert.equal(M('deshace-operador'), [5, h(5, 2)].join());
  const T = (g, a, b) => { const p = P(g); return p.tab[p.letras.indexOf(a)][p.letras.indexOf(b)]; };
  const A = (a, b) => T('lee-operacion', a, b), B = (a, b) => T('cadena-en-tabla', a, b);
  assert.equal(M('lee-operacion'), [A('q', 's'), A('s', 'q'), ['p', 'q', 'r', 's'].filter(x => A('r', x) === 'p').join('')].join());
  assert.equal(M('cadena-en-tabla'), [B(B('t', 'u'), 'v'), B('t', B('u', 'v')), ['t', 'u', 'v'].filter(x => B(x, 'u') === 'u').join('')].join());
  assert.match(GAMES['deshace-operador'].aviso({ q: [['8'], ['52']] }, P('deshace-operador')), /dividir entre 4/);   // el primer error es el del final
  const c = [(a, b) => a * b + 5, (a, b) => a + 5 * b, (a, b) => (a - b) ** 2, (a, b) => a * b - b, (a, b) => a * a + b * b];
  P('cuales-conmutan').casos.forEach((x, i) => assert.equal(!!x.si, c[i](1, 2) === c[i](2, 1), x.t));
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'cuales-conmutan': '0,2,4', 'tabla-desigual': '3,7,12,13', 'x-consigo': '1,3' };
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
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.max, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'operadores-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
