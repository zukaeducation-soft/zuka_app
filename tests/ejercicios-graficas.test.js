// Tablas y gráficas (pu-gr-1 a pu-gr-3) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-graficas');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-gr-1': 'lee-escala,pasa-tabla,mayor-tramo,barra-baja,ida-vuelta-porciento,abre-sector,sector-cantidad,sube-grafica',
  'pu-gr-2': 'nivela-linea,dato-para-promedio,ordena-centro,centros-par,dato-exagerado,apoyo-grupos,meses-mas,sube-centro',
  'pu-gr-3': 'sube-piso,diferencia-real,pasan-porciento,misma-proporcion,muestra-parecida,muestras-sirven,se-concluye,sube-dato-real',
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

test('figuras: se acepta exactamente la respuesta que debe y todo se dibuja', () => {
  const A = { 'barra-baja': '42', 'abre-sector': '162', 'nivela-linea': '7', 'dato-para-promedio': '12', 'apoyo-grupos': '3', 'sube-piso': '35', 'misma-proporcion': '24' };
  const l = J.filter(j => j.G.figura);
  assert.equal(l.length, 8);
  for (const { e, G, p } of l) {
    if (e.game === 'pasa-tabla') { for (const k of 'abc') { const s = { ...G.solve(p), [k]: 100 }; assert.equal(G.grade(s, p).ok, false); assert.ok(/quedó en 100/.test(G.aviso(s, p))); for (const f of [0, 1]) assert.ok(!malo(G.dib(s, K, p, f))); } continue; }
    const ok = [], m = G.manijas(p)[0];
    for (let v = m.min; v <= m.max; v += m.paso) {
      const s = { [m.k]: v };
      if (G.grade(s, p).ok) { ok.push(v); assert.ok(G.bien(s, p).length > 8 && !malo(G.bien(s, p))); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${v}: ${a}`); }
      for (const f of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, f)), `${e.game} ${v} ${f}`);
      assert.ok(!malo(G.lee(s, p)) && (G.lee(s, p).match(/\$/g) || []).length % 2 === 0);
      if (m.en) { const [x, y] = m.en(s, p); assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${e.game}: ${x}, ${y}`); assert.equal(Math.round(m.de(x, y, s, p) * 1e6) / 1e6, v, `${e.game} ${v}`); }
    }
    assert.equal(ok.join(), A[e.game], e.game);
  }
});

test('datos: las cuentas son lo que dicen', () => {
  const M = g => P(g).metas.join();
  assert.equal(P('lee-escala').vals.join() + ',' + P('lee-escala').vals.reduce((a, b) => a + b), M('lee-escala'));
  const orden = [...P('ordena-centro').d].sort((a, b) => a - b); assert.equal([...orden, orden[3]].join(), M('ordena-centro'));
  const c = [...P('centros-par').d].sort((a, b) => a - b); assert.equal([c.reduce((a, b) => a + b) / 6, (c[2] + c[3]) / 2, c[0]].join(), M('centros-par'));
  { const d = P('centros-par').d; assert.notEqual((d[2] + d[3]) / 2, (c[2] + c[3]) / 2, 'sin ordenar no se acierta'); }
  assert.ok(GAMES['nivela-linea'].manijas(P('nivela-linea'))[0].rot({ y: 6.5 }) === '6.5');
  assert.equal([6 * 3, 8 * 4, 8 * 4 - 6 * 3].join(), M('meses-mas')); assert.equal(P('muestra-parecida').tot.map(n => n / 5).join(), M('muestra-parecida'));
  for (const [g, v] of [['sube-piso', { f: 20 }], ['apoyo-grupos', { x: 3 }]]) { const G = GAMES[g], p = P(g); assert.equal(G.dib(v, K, p, 0).match(/rotate\(([^ ]+)/)?.[1] ?? '0', '0', 'no se responde a ojo'); }
  assert.equal(GAMES['sube-piso'].dib({ f: 20 }, K, P('sube-piso'), 0), GAMES['sube-piso'].dib({ f: 0 }, K, P('sube-piso'), 0));
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  assert.equal(S('mayor-tramo'), '1'); assert.equal(S('dato-exagerado'), '0,3'); assert.equal(S('pasan-porciento'), '0,2,4'); assert.equal(S('muestras-sirven'), '0,3'); assert.equal(S('se-concluye'), '0,2,4');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length, sol = G.solve(p).on;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true))); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    assert.ok(!malo(G.fondo?.(K, p) ?? ''), e.game);
    for (let i = 0; i < n; i++) { const on = sol.map((x, k) => (k === i ? !x : x)); if (!on.some(Boolean)) continue; assert.equal(G.grade({ on }, p).ok, false); const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game} ${i}: ${a}`); }
  }
});

test('rótulos: las fichas alcanzan, caben, no se pisan, y cada error tiene aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    assert.equal(sl.length, m.length, e.game);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2, e.game);
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
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.max * t.r / m, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'graficas-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
