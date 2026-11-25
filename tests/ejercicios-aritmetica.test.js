// Aritmética y promedios (pu-ar-1 a pu-ar-4) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-aritmetica');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-ar-1': 'fraccion-de-que,corta-barra,queda-producto,desde-el-final,dejan-lo-mismo,tres-tandas,porciento-resto,sube-resto',
  'pu-ar-2': 'misma-suma,sube-baja-igual,cambia-uno,reparte-sobra,parte-pesos,cuantos-llegan,aportes-nota,sube-promedio',
  'pu-ar-3': 'bloques-volteo,valor-letras,suma-con-letras,resta-con-letras,siempre-once,siete-veces,producto-con-letras,sube-cifras',
  'pu-ar-4': 'peor-suerte,color-pedido,seguro-o-suerte,corral-pared,menor-cerca,reparto-distinto,techo-piso,sube-extremo',
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
      if (i < ms.length) { for (let x = ms[i].min; x <= ms[i].max; x += ms[i].paso) prueba({ ...v, [ms[i].k]: x }, i + 1); return; }
      for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(v, K, p, f)));
      if (G.grade(v, p).ok) { (ok[e.game] ||= []).push(Object.values(v).join()); assert.ok(!malo(G.bien(v, p))); } else assert.ok(!malo(G.aviso(v, p)) && G.aviso(v, p).length > 10);
    };
    prueba({}, 0);
  }
  assert.equal(JSON.stringify(ok), JSON.stringify({ 'corta-barra': ['15,25'], 'misma-suma': ['6'], 'parte-pesos': ['40'], 'cuantos-llegan': ['8'], 'bloques-volteo': ['9,4'], 'corral-pared': ['5'], 'menor-cerca': ['3'] }));
  for (const { e, G, p } of J.filter(j => j.G.figura)) for (const m of G.manijas(p)) if (m.en) for (const v of [m.min, m.max]) { const s = { ...G.ini(p), [m.k]: v }, [x, y] = m.en(s); assert.ok(x >= 8 && x <= 332 && y >= 10 && y <= G.alto(p) - 10, `${e.game}: ${x}, ${y}`); assert.equal(Math.round(m.de(x, y) * 1e6) / 1e6, v); }
});

test('cuentas: los números salen del enunciado', () => {
  const M = g => P(g).metas.join();
  assert.equal(M('fraccion-de-que'), [120 / 6, 100, 100 * 2 / 5, 120 * 2 / 5].join());
  assert.equal(M('tres-tandas'), [240 * 5 / 6, 200 * 3 / 4, 150 * 3 / 5].join());
  assert.equal(M('porciento-resto'), [500 * 0.8, 400 * 0.75, 100].join());
  const [ini, mit] = M('desde-el-final').split(',').map(Number); assert.equal(ini * 3 / 4, mit); assert.equal(mit * 3 / 5, 36);
  const G = GAMES['desde-el-final']; assert.match(G.aviso({ q: [['240'], ['90']] }, P('desde-el-final')), /tres|quedaron/);
  assert.equal(M('cambia-uno'), [70, 85, 85 / 5].join()); assert.equal(M('reparte-sobra'), [30, 10, (9 * 20 + 50) / 10].join());
  assert.ok(Math.abs(0.2 * 4 + 0.3 * 3 + 0.5 * 4 - 3.7) < 1e-9);
  // Letras: una sola solución con cifras distintas.
  const busca = f => { const r = []; for (let A = 0; A < 10; A++) for (let B = 0; B < 10; B++) if (f(A, B)) r.push(`${A}${B}`); return r.join(); };
  assert.equal(busca((A, B) => 10 * A + 8 + 40 + B === 95), '47'); assert.equal(busca((A, B) => 70 + A - 10 * B - 8 === 36), '43');
  assert.equal(busca((A, B) => A !== B && (10 * A + 4) * 9 === 406 + 10 * B), '58');
  const once = [(A, B) => 11 * A + 11 * B, (A, B) => 9 * (A - B), A => 110 * A, A => 101 * A, (A, B) => 1001 * A + 110 * B];
  P('siempre-once').casos.forEach((c, i) => { let s = true; for (let A = 1; A < 10; A++) for (let B = 1; B < 10; B++) if (A !== B && once[i](A, B) % 11) s = false; assert.equal(!!c.si, s, c.t); });
  const deja = [4 / 5 * 3 / 4, 16 / 25, 3 / 4 * 4 / 5, 3 / 5, 11 / 20]; P('dejan-lo-mismo').casos.forEach((c, i) => assert.equal(!!c.si, Math.abs(deja[i] - 0.6) < 1e-9, c.t));
  // Reparto de 40 entre 6 distintos, por fuerza bruta.
  let mx = 0, mn = 99; const rep = (k, desde, resto, u) => { if (!k) { if (!resto) { mx = Math.max(mx, u); mn = Math.min(mn, u); } return; } for (let x = desde; x <= resto; x++) rep(k - 1, x + 1, resto - x, x); }; rep(6, 1, 40, 0);
  assert.equal(M('reparto-distinto'), [15, mx, mn].join());
  assert.equal(M('techo-piso'), [Math.ceil(75 / 9), Math.floor(75 / 9), 75 % 9, 9 - 75 % 9].join());
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'dejan-lo-mismo': '0,2,3', 'siempre-once': '0,2,4', 'siete-veces': '0,2,5', 'seguro-o-suerte': '0,2,4' };
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
  assert.equal(l.length, 4);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.cara(o.max) && +x % o.cara(1) === 0, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'aritmetica-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
