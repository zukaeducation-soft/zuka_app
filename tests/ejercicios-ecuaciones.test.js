// Ecuaciones y planteamiento (pu-ec-1 a pu-ec-3) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-ecuaciones');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-ec-1': 'traduce-frases,sigue-equilibrada,pasos-despeje,misma-x,ancho-del-marco,cinco-seguidos,dos-cuerdas,sube-ecuacion',
  'pu-ec-2': 'hace-cuantos,tabla-edades,todos-iguales,aranas-hormigas,aguado,precio-posible,se-llevan-igual,sube-edades',
  'pu-ec-3': 'resta-recibos,iguala-recibos,lleva-ventaja,punto-comun,voltea-o-sigue,pinta-intervalo,enteros-entre,sube-sistema',
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
      if (i < ejes.length) { const [k, a, b, q] = ejes[i]; for (let x = a; x <= b; x += q) prueba({ ...v, [k]: x }, i + 1); return; }
      for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(v, K, p, f)), e.game);
      if (G.grade(v, p).ok) { (ok[e.game] ||= []).push(Object.values(v).join()); assert.ok(!malo(G.bien(v, p))); } else assert.ok(!malo(G.aviso(v, p)) && G.aviso(v, p).length > 10, e.game);
    };
    prueba({}, 0);
  }
  assert.equal(JSON.stringify(ok), JSON.stringify({ 'ancho-del-marco': ['6'], 'hace-cuantos': ['7'], 'aranas-hormigas': ['5'], aguado: ['3'], 'lleva-ventaja': ['14'], 'punto-comun': ['3,4'], 'pinta-intervalo': ['2,-1,1'] }));
  // pinta-intervalo: lo que dice el aviso es cierto.
  const G = GAMES['pinta-intervalo'], p = P('pinta-intervalo'), si = x => 4 - 3 * x > -2;
  for (let b = -6; b <= 6; b++) for (const dir of [-1, 1]) for (const ab of [0, 1]) {
    const a = G.aviso({ b, dir, ab }, p), x = /incluye el (−?\d+)/.exec(a); if (!x) continue;
    const n = +x[1].replace('−', '-'); assert.ok(!si(n) && (dir > 0 ? n > b : n < b || (n === b && !ab)) || (n === b && !ab && !si(n)), a);
    assert.ok(a.includes(`da ${String(4 - 3 * n).replace('-', '−')}`), a);
  }
  const q = P('punto-comun'); q.l.forEach(([a, b, c, d], i) => { const [m, n, k] = q.e[i]; assert.equal(m * a + n * b, k); assert.equal(m * c + n * d, k); });
});

test('cuentas: los números salen del enunciado', () => {
  const M = g => P(g).metas.join();
  const T = { 'traduce-frases': [x => 2 * x + 7, x => 2 * (x + 7), x => x - 7, x => x / 2 - 7], 'misma-x': [x => x + 6, x => 2 * (x + 6), x => 2 * (x + 6) - 5] };
  const vale = (s, x) => Function('x', `return ${s.replace(/−/g, '-').replace(/(\d)([x(])/g, '$1*$2')}`)(x);
  for (const g in T) P(g).metas.forEach((s, i) => { for (const x of [4, 10, 23]) assert.equal(vale(s, x), T[g][i](x), s); for (const f of P(g).fichas) if (f !== s) assert.ok([4, 10, 23].some(x => vale(f, x) !== T[g][i](x)), `${f} vale lo mismo que ${s}`); });
  for (const s of ['x*5+3-2*x-18', '3*x+3-18', '3*x-15']) assert.equal(Function('x', `return ${s}`)(5), 0);
  assert.equal(17 + 18 + 19 + 20 + 21, 95); assert.equal(M('dos-cuerdas'), [13, 2 * 13 + 5, 18].join()); assert.equal(13 + 31, 44);
  assert.equal(M('todos-iguales'), [18 * 4, 96 - 72, 24 / 3, 10].join()); assert.equal(8 * 7 + 10 * 4, 96);
  assert.equal(50 + 14, 2 * (18 + 14)); assert.equal(M('se-llevan-igual'), '32,32,32,14');
  for (const [j, n, t] of P('resta-recibos').f) assert.equal(5 * j + 3 * n, t); assert.equal(3 * 4 + 5, 17); assert.equal(2 * 4 + 3 * 5, 23); assert.equal(M('iguala-recibos'), [9, 51, 7, (51 - 23) / 7].join());
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'sigue-equilibrada': '0,2,4', 'precio-posible': '1,2', 'enteros-entre': '2,3,4,5,6,7' };
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
  assert.equal(l.length, 3);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.cara(o.max) && +x % o.cara(1) === 0, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'ecuaciones-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
