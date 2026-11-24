// Acertijos de orden (pu-or-1 a pu-or-4) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora): cada acertijo
// tiene las soluciones que debe, la respuesta la decide una regla y no una lista escrita a mano.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES'), XG = get(ctx, 'XG');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-orden');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-or-1': 'fila-cine,pisos-edificio,puestos-posibles,tacha-filas,un-cambio,pistas-justas,llegada-carrera,corre-puesto',
  'pu-or-2': 'mesa-amigos,misma-mesa,frente-silla,vuelta-silla,dos-lados,collar-cerrado,cambia-mesa,gira-ruleta',
  'pu-or-3': 'tacha-cruz,hueco-unico,tabla-oficios,tabla-ajena,pista-falta,tabla-dos-datos,casas-datos,cae-caja',
  'pu-or-4': 'casos-si,misma-regla,equipo-justo,quien-seguro,tres-zonas,rompe-regla,maximo-grupo,cae-zona',
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
    const s = G.solve(p);
    assert.equal(G.grade(s, p).ok, true, `${e.game}: solve`);
    assert.equal(G.grade(G.ini(p), p).ok, false, `${e.game}: ini`);
    assert.equal(G.grade(undefined, p).ok, false, e.game);
    assert.equal(G.listo(G.ini(p), p), false, `${e.game}: nace listo`);
    assert.equal(G.listo(s, p), true, `${e.game}: solución lista`);
    assert.ok(!malo(G.texto(p)) && G.texto(p).length > 0 && (G.texto(p).match(/\$/g) || []).length % 2 === 0, e.game);
    assert.ok(GUIDES[e.game], e.game); assert.ok(e.hint.length > 40, e.game);
  }
});

test('puestos: una sola solución, cada pista hace falta o aclara, y los lugares no se pisan', () => {
  const l = J.filter(j => j.G.puestos);
  assert.equal(l.length, 8);
  for (const { e, G, p } of l) {
    assert.equal(G.todas(p).length, 1, `${e.game}: ${G.todas(p).length} soluciones`);
    for (const x of p.pistas) assert.ok(e.game === 'casas-datos' || G.todas({ ...p, pistas: p.pistas.filter(y => y !== x) }).length > 1 || p.ini, `${e.game}: sobra «${x.t}»`);
    const sl = G.slots(p);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 1 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 - 1 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game}: se pisan`)); });
    for (const f of p.fichas) assert.ok(Math.max(36, f.length * 8 + 16) <= sl[0].w + 8, `${e.game}: «${f}» no cabe`);
    assert.ok(!malo(G.fondo(K, p)));
  }
});

test('marcas: la respuesta es la que es, y siempre hay aviso para una equivocada', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  assert.equal(S('puestos-posibles'), '1,4'); assert.equal(S('tacha-filas'), '1,3,4'); assert.equal(S('misma-mesa'), '0,3');
  assert.equal(S('dos-lados'), '1,3'); assert.equal(S('tacha-cruz'), '2,4,5,7,10,14'); assert.equal(S('hueco-unico'), '2,15');
  assert.equal(S('tabla-ajena'), '11,13'); assert.equal(S('casos-si'), '0,1,2'); assert.equal(S('misma-regla'), '0,2');
  assert.equal(S('quien-seguro'), '1'); assert.equal(S('equipo-justo'), '1,2,4'); assert.equal(S('maximo-grupo'), '1,2,3,5');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true) + G.cara(K, p, i, false))); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2 || (a.red && Math.hypot(a.x - b.x, a.y - b.y) >= a.w), `${e.game} se pisan`)); });
    const prueba = n <= 8 ? Array.from({ length: 2 ** n }, (_, m) => Array.from({ length: n }, (_, i) => !!(m >> i & 1))) : Array.from({ length: n }, (_, i) => G.solve(p).on.map((x, k) => (k === i ? !x : x)));
    for (const on of prueba) if (!G.grade({ on }, p).ok) { const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), e.game); }
  }
  const acepta = g => Array.from({ length: 32 }, (_, m) => Array.from({ length: 5 }, (_, i) => !!(m >> i & 1))).filter(on => GAMES[g].grade({ on }, P(g)).ok).map(on => P(g).gente.filter((_, i) => on[i]).join('-')).sort().join();
  assert.equal(acepta('rompe-regla'), 'Iva-Kai-Lea,Iva-Lea-Moe');
});

test('cartas: hay parejas que bastan, otras que no, y ninguna sola', () => {
  for (const { e, G, p } of J.filter(j => j.G.cartas)) {
    const c = G.combos(p);
    assert.ok(c.length >= 1 && c.length <= 5, `${e.game}: ${c.length}`);
    if (p.k > 1) p.cartas.forEach((x, i) => assert.ok(G.quedan([i], p).length > 1, `${e.game}: sola basta «${x.t}»`));
  }
  assert.equal(GAMES['pista-falta'].combos(P('pista-falta')).map(c => c.en.join()).join(';'), '1');
});

test('tablas: una sola solución y cada pista hace falta', () => {
  for (const { e, G, p } of J.filter(j => j.G.tabla)) {
    assert.equal(G.todas(p).length, 1, e.game);
    for (const x of p.pistas) assert.ok(G.todas({ ...p, pistas: p.pistas.filter(y => y !== x) }).length > 1, `${e.game}: sobra «${x.t}»`);
    const c = [...G.solve(p).c]; assert.ok(G.grade({ c: c.map(x => x || 2) }, p).ok, 'las ✗ no estorban');
    c[c.indexOf(1)] = 0; assert.equal(G.grade({ c }, p).ok, false);
  }
});

test('anillo, sillas de enfrente y zonas', () => {
  const g = GAMES['vuelta-silla'], p = P('vuelta-silla');
  assert.equal(g.solve(p).k, 2);
  for (let k = 1; k <= 9; k++) { const m = g.manijas(p)[0], [x, y] = m.en({ k }); assert.equal(m.de(x, y), k); for (const f of [0, 0.5, 1]) assert.ok(!malo(g.dib({ k }, K, p, f))); assert.ok(g.lee({ k }, p) && g.aviso({ k }, p).length > 10); }
  assert.equal(GAMES['frente-silla'].metas(P('frente-silla')).join(), '10,2,5');
  assert.equal(GAMES['tres-zonas'].metasZ(P('tres-zonas')).map(z => z.join('+')).join(), 'van A y D,va B+van C y D+va E,van B y C');
});

test('tiros: la respuesta cabe, los avisos no son de la respuesta y todo se dibuja', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 4);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(m > o.min && m <= o.max, e.game);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f)), `${e.game} ${v}`); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1)), `${e.game}: regala`); } assert.ok(!malo(o.lee(v))); }
    for (const k of Object.keys(t.e || {})) assert.ok(+k !== m && +k <= o.max);
  }
  for (const t of P('gira-ruleta').tiros.slice(1)) { const [, b] = t.q.match(/a la (\d)/); assert.equal((t.de - 1 + t.r) % t.n + 1, +b); }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  const mios = [...src['orden-escena.js'].matchAll(/XG\.\w+\('([\w-]+)'/g)].map(m => m[1]);
  for (const n of mios) for (const f in src) assert.ok(f === 'orden-escena.js' || !src[f].includes(`GAMES['${n}'] =`) && !new RegExp(`XG\\.\\w+\\('${n}'`).test(src[f]), `${n} ya existe en ${f}`);
});
