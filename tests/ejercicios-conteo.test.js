// Conteo y combinatoria (pu-co-1 a pu-co-5) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora). Las respuestas de
// cada cuenta se comprueban contando de verdad.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-conteo');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-co-1': 'arbol-ramas,se-multiplica,placa-casillas,rejilla-permitida,tira-colores,interruptores,rutas-tramos,sube-arbol',
  'pu-co-2': 'fila-factorial,podio-puestos,cuantos-candidatos,palabras-distintas,repetidas-divide,paquete-juntos,casilla-exigente,sube-orden',
  'pu-co-3': 'mismo-grupo,orden-no-importa,divide-ordenes,elige-deja,comite-mixto,con-o-sin,cuantos-saludos,sube-grupo',
  'pu-co-4': 'cruce-numeros,suma-y-resta,cruce-barras,ruletas-alguno,lo-contrario,todos-ninguno,parte-casos,sube-casos',
  'pu-co-5': 'cuadrados-tamano,donde-cabe,lados-diagonales,esquina-cerrada,palabra-camino,tira-larga,triangulos-abanico,sube-figuras',
};
const J = Object.keys(LISTA).flatMap(id => L(id).ex.slice(0, 8).map(e => ({ e, G: GAMES[e.game], p: e.params })));
const P = g => J.find(j => j.e.game === g).p;
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
const todas = (n, k) => (k ? todas(n, k - 1).flatMap(a => Array.from({ length: n }, (_, i) => [...a, i])) : [[]]);
const dist = a => new Set(a).size === a.length;
const combos = (n, k) => todas(n, k).filter(a => a.every((x, i) => !i || a[i - 1] < x));
const orden = w => { const s = new Set(), f = (a, r) => (r.length ? r.forEach((x, i) => f(a + x, [...r.slice(0, i), ...r.slice(i + 1)])) : s.add(a)); f('', [...w]); return s.size; };

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

test('figuras: se acepta exactamente la respuesta que debe y todo se dibuja', () => {
  const A = { 'arbol-ramas': '3', interruptores: '4', 'cuantos-candidatos': '5', 'cuantos-saludos': '12', 'cruce-barras': '7', 'lados-diagonales': '12', 'triangulos-abanico': '4' };
  const l = J.filter(j => j.G.figura);
  assert.equal(l.length, 7);
  for (const { e, G, p } of l) {
    const ok = [], m = G.manijas(p)[0];
    for (let v = m.min; v <= m.max; v++) {
      const s = { [m.k]: v };
      if (G.grade(s, p).ok) { ok.push(v); assert.ok(G.bien(s, p).length > 8 && !malo(G.bien(s, p))); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${v}: ${a}`); }
      for (const f of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, f)), `${e.game} ${v} ${f}`);
      assert.ok(!malo(G.lee(s, p)) && (G.lee(s, p).match(/\$/g) || []).length % 2 === 0);
    }
    assert.equal(ok.join(), A[e.game], e.game);
  }
});

test('cuentas: las metas son las de contar de verdad', () => {
  const M = g => P(g).metas.map(Number);
  assert.equal(M('placa-casillas').at(-1), todas(6, 2).filter(dist).length * 5);
  assert.equal(M('tira-colores').at(-1), todas(3, 4).filter(a => a.every((x, i) => !i || x !== a[i - 1])).length);
  assert.equal(M('rutas-tramos').at(-1), P('rutas-tramos').ab * P('rutas-tramos').bz + P('rutas-tramos').az);
  assert.equal(M('fila-factorial').at(-1), todas(5, 5).filter(dist).length);
  assert.equal(M('podio-puestos').at(-1), todas(9, 3).filter(dist).length);
  assert.equal(M('repetidas-divide').at(-1), orden('TATUAR'));
  assert.equal(M('paquete-juntos').at(-1), todas(6, 6).filter(dist).filter(a => { const q = [0, 1, 2].map(x => a.indexOf(x)); return Math.max(...q) - Math.min(...q) === 2; }).length);
  assert.equal(M('casilla-exigente').at(-1), todas(6, 3).filter(dist).map(a => +a.map(i => P('casilla-exigente').digitos[i]).join('')).filter(n => n > 500).length);
  assert.equal(M('divide-ordenes').at(-1), combos(9, 3).length);
  assert.equal(M('elige-deja').at(-1), combos(11, 2).length);
  assert.equal(M('comite-mixto').at(-1), combos(6, 2).length * combos(5, 2).length);
  assert.equal(M('con-o-sin').join(), [combos(7, 3).filter(a => a[0] === 0).length, combos(7, 3).filter(a => a[0] !== 0).length, combos(7, 3).length].join());
  const n60 = Array.from({ length: 60 }, (_, i) => i + 1), c = f => n60.filter(f).length;
  assert.equal(M('suma-y-resta').join(), [c(n => n % 4 === 0), c(n => n % 6 === 0), c(n => n % 12 === 0), c(n => n % 4 === 0 || n % 6 === 0)].join());
  const mil = Array.from({ length: 1000 }, (_, i) => String(i).padStart(3, '0'));
  assert.equal(M('todos-ninguno').join(), [1000, mil.filter(s => !s.includes('4')).length, mil.filter(s => s.includes('4')).length].join());
  const d2 = todas(5, 2).filter(dist).map(a => a.map(i => P('parte-casos').digitos[i])).filter(a => a[0]);
  assert.equal(M('parte-casos').join(), [d2.filter(a => a[1] === 0).length, d2.filter(a => a[1] === 5).length, d2.filter(a => a[1] % 5 === 0).length].join());
  assert.equal(M('cuadrados-tamano').join(), [15, 2 * 4, 3, 26].join());
  assert.equal(M('tira-larga').join(), [6, 5, 4, combos(7, 2).length].join());
  assert.equal(GAMES['esquina-cerrada'].metas(P('esquina-cerrada')).join(), '1,2,4');
});

test('rótulos: las fichas alcanzan, caben, no se pisan, y cada error tiene aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2, e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 4, `${e.game}: «${t}» no cabe en ${a.w}`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a?.length > 10 && !malo(a), `${e.game} ${i}:${y}`); } });
    for (const k of Object.keys(p.trampas || {})) { const [i, t] = k.split(':'); const r = [...p.fichas]; p.metas.slice(0, +i).forEach(x => r.splice(r.indexOf(x), 1)); assert.ok(r.includes(t) && p.metas[+i] !== t, `${e.game}: trampa ${k}`); }
    if (p.mira) assert.equal(p.mira.length, p.metas.length, e.game);
  }
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  assert.equal(S('se-multiplica'), '0,2,4'); assert.equal(S('orden-no-importa'), '0,2,4'); assert.equal(S('lo-contrario'), '0,2');
  assert.equal(S('rejilla-permitida'), '0,3,4,5,6,7,8,9,10,11'); assert.equal(S('palabras-distintas'), '0,2,4'); assert.equal(S('mismo-grupo'), '0,2,3');
  assert.equal(S('cruce-numeros'), '3,5,7,11,15,17,19,23'); assert.equal(S('ruletas-alguno'), '2,6,8,9,10,11,14'); assert.equal(S('donde-cabe'), '0,1,2,4,5,6'); assert.equal(S('palabra-camino'), '0,2,4');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length, sol = G.solve(p).on;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true))); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    assert.ok(!malo(G.fondo(K, p)), e.game);
    for (let i = 0; i < n; i++) { const on = sol.map((x, k) => (k === i ? !x : x)); assert.equal(G.grade({ on }, p).ok, false); const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game} ${i}`); }
  }
});

test('tiros: la respuesta cabe, los errores también, y fallar no la enseña', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 5);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p), paso = t.r / m;
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x % paso === 0 && +x / paso <= o.max, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'conteo-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
