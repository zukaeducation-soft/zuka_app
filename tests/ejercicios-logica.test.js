// Lógica proposicional (pu-lo-1 a pu-lo-5) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-logica');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-lo-1': 'prende-circuito,valor-frases,tabla-disyuncion,promesa-sigue,cuenta-filas,nombra-columna,frase-larga,sube-filas',
  'pu-lo-2': 'niega-y,niega-mezclada,tabla-negada,casos-tumban,parejas-negacion,pinta-negacion,niega-cartel,sube-niega',
  'pu-lo-3': 'zonas-posibles,voltea-niega,mismo-condicional,basta-falta,revisa-regla,deduce-seguro,cadena-si,sube-regla-si',
  'pu-lo-4': 'dibujo-contra,frase-dibujo,se-voltea,donde-alguien,seguro-tres,cadena-todos,tumba-todos,sube-circulos',
  'pu-lo-5': 'quien-miente-tres,tabla-sospechosos,cadena-acusan,frases-opuestas,supone-choca,tres-cofres,culpable-una-verdad,sube-mentira',
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

test('dibujo-contra: las dos frases se cumplen y la conclusión no', () => {
  const G = GAMES['dibujo-contra'], p = P('dibujo-contra'); let n = 0, todos = 0;
  for (let x = 40; x <= 300; x += 2) for (let y = 46; y <= 176; y += 2) {
    const v = { x, y }, dB = Math.hypot(x - 130, y - 112), dA = Math.hypot(x - 108, y - 126), ok = dB < 124 && dA >= 76;
    todos++; n += ok; assert.equal(G.grade(v, p).ok, ok, `${x}, ${y}`); if (!ok) assert.ok(G.aviso(v, p).length > 10);
  }
  assert.ok(n / todos > 0.08 && n / todos < 0.5, `${n} de ${todos}`);
  for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(G.solve(p), K, p, f)));
});

test('mentirosos y culpables: una sola solución, por fuerza bruta', () => {
  for (const g of ['quien-miente-tres', 'cadena-acusan']) {
    const { gente } = P(g), n = gente.length, r = [];
    for (let m = 0; m < 2 ** n; m++) { const v = Array.from({ length: n }, (_, i) => !!(m >> i & 1)); if (gente.every((x, i) => x.f(v) === v[i])) r.push(v.map(x => (x ? 'V' : 'M')).join('')); }
    assert.equal(r.join(), g === 'cadena-acusan' ? 'VMMM' : 'VMV', g);
  }
  for (const [g, quien] of [['tres-cofres', 1], ['culpable-una-verdad', 0], ['tabla-sospechosos', 2]]) { const p = P(g); assert.equal(p.gente.map((_, c) => p.gente.filter(x => x.f(c)).length === p.v).join(), p.gente.map((_, c) => c === quien).join(), g); }
  const o = P('frases-opuestas').gente, op = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if ([0, 1, 2, 3].every(c => o[i].f(c) !== o[j].f(c))) op.push(`${i}${j}`); assert.equal(op.join(), '01');
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  const E = { 'prende-circuito': '0,2', 'tabla-disyuncion': '1,2,3', 'promesa-sigue': '0,2,3', 'tabla-negada': '0', 'casos-tumban': '1,3', 'pinta-negacion': '0,2,3', 'zonas-posibles': '0,1', 'mismo-condicional': '0,3,4', 'revisa-regla': '0,3', 'se-voltea': '0,2', 'donde-alguien': '1,2', 'seguro-tres': '0,2', 'tumba-todos': '1,4', 'quien-miente-tres': '1', 'cadena-acusan': '1,2,3', 'frases-opuestas': '0,1', 'tres-cofres': '1', 'culpable-una-verdad': '0' };
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
    assert.ok(f.length >= 2 || e.game === 'cadena-todos', e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 - 8 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 4, `${e.game}: «${t}» no cabe en ${a.w}`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a?.length > 10 && !malo(a), `${e.game} ${i}:${y}`); } });
    for (const k of Object.keys(p.trampas || {})) { const [i, t] = k.split(':'), r = [...p.fichas]; m.slice(0, +i).forEach(x => r.splice(r.indexOf(x), 1)); assert.ok(r.includes(t) && m[+i] !== t, `${e.game}: trampa ${k}`); }
  }
});

test('tiros: la respuesta cabe, los errores también, y fallar no la enseña', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 5);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.max, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'proposiciones-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
