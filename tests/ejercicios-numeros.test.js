// Teoría de números (pu-nu-1 a pu-nu-3) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-numeros');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-nu-1': 'toca-primos,arbol-primos,opciones-divisor,cifra-que-falta,tabla-criterios,siempre-multiplo,basta-con,sube-divisores',
  'pu-nu-2': 'saltos-cada-una,paquetes-iguales,exponentes-mcd,cual-de-los-dos,baldosa-mayor,producto-mcd,hora-del-cruce,sube-mcm',
  'pu-nu-3': 'siempre-par,dos-residuos,opera-residuos,ciclo-ultima,rueda-semana,ultima-por-partes,arma-dividendo,sube-sobrante',
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
  assert.equal(JSON.stringify(ok), JSON.stringify({ 'saltos-cada-una': ['7,5'], 'baldosa-mayor': ['6'], 'dos-residuos': ['33'], 'rueda-semana': ['4'] }));
  const G = GAMES['rueda-semana'], m = G.manijas(P('rueda-semana'))[0];
  for (let k = 0; k < 7; k++) assert.equal(m.de(...m.en({ k })), k);
  assert.equal(m.de(165, 40), 0, 'un poco a la izquierda de lunes sigue siendo lunes');
});

test('cuentas: los números salen del enunciado', () => {
  const M = g => P(g).metas.join(), mcd = (a, b) => (b ? mcd(b, a % b) : a), mcm = (a, b) => a * b / mcd(a, b);
  const [p1, r1, p2, r2, p3, r3] = P('arbol-primos').metas.map(Number); assert.equal(p1 * r1, 132); assert.equal(p2 * r2, r1); assert.equal(p3 * r3, r2);
  const div = n => { let k = 0; for (let d = 1; d <= n; d++) if (n % d === 0) k++; return k; }; assert.equal(div(144), 15); assert.equal(div(280), 16); assert.equal(138 % 23, 0);
  P('siempre-multiplo').casos.forEach(c => { const d = +/\d+/.exec(c.t)[0]; assert.equal(!!c.si, 12 % d === 0); });
  P('basta-con').casos.forEach(c => { const [n, a, b] = c.t.match(/\d+/g).map(Number); let s = true; for (let k = 1; k < 400; k++) if (k % a === 0 && k % b === 0 && k % n) s = false; assert.equal(!!c.si, s, c.t); });
  assert.equal(M('paquetes-iguales'), [mcd(54, 72), 54 / 18, 72 / 18].join());
  const A = 4 * 27 * 5, B = 16 * 3 * 7; assert.equal(mcd(A, B), 2 ** 2 * 3); assert.equal(mcm(A, B), 2 ** 4 * 3 ** 3 * 35); assert.equal(M('exponentes-mcd'), '2,1,4,3');
  assert.equal(mcd(18, 30), 6); assert.equal(mcm(18, 30), 90); assert.equal(18 * 30, 540); assert.equal(mcm(15, 25), 75);
  assert.equal(mcm(16, 40), 80); assert.equal(mcd(32, 48), 16); assert.equal(mcm(mcm(4, 6), 10), 60);
  assert.equal(M('opera-residuos'), [52 % 7, 39 % 7, 52 * 39 % 7].join());
  assert.equal(M('ciclo-ultima'), [2, 3, 4, 5, 22].map(n => 2 ** n % 10).join());
  assert.equal((238 * 57 + 64) % 10, 0); assert.equal(238 * 57 % 10, 6); assert.equal(238 * 57 + 64, 13630);
  assert.equal(M('arma-dividendo'), [131, (131 + 6) % 9, 262 % 9].join()); assert.equal(200 % 7, 4); assert.equal(27 % 8, 3);
  const e = [n => n + 1, n => n * n, n => 3 * n + 1, n => 2 * n + 1, n => n * (n + 1)]; P('siempre-par').casos.forEach((c, i) => assert.equal(!!c.si, [1, 3, 5, 7, 9].every(n => e[i](n) % 2 === 0), c.t));
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'toca-primos': '1,2,5', 'cifra-que-falta': '0,6', 'tabla-criterios': '0,1,3,4,6,8,9,11', 'siempre-multiplo': '0,2,4', 'basta-con': '0,2,4', 'siempre-par': '0,2,4' };
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
  for (const { e } of J) for (const f in src) if (f !== 'numeros-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
