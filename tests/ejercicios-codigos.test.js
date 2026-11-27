// Codificación (pu-cd-1 y pu-cd-2) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-codigos');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-cd-1': 'avanza-clave,cifra-palabra,descifra-mensaje,suma-letras,letra-falta,prende-focos,lee-tablero,sube-codigo',
  'pu-cd-2': 'regla-todos,maquina-cifras,maquina-dos-pasos,puestos-cambian,devuelve-puestos,avances-crecen,clave-comparada,sube-regla',
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
  const A = { 'avanza-clave': '7', 'letra-falta': '8' };
  const l = J.filter(j => j.G.figura);
  assert.equal(l.length, 2);
  for (const { e, G, p } of l) {
    const ok = [], m = G.manijas(p)[0];
    for (let v = m.min; v <= m.max; v++) {
      const s = { [m.k]: v };
      if (G.grade(s, p).ok) { ok.push(v); assert.ok(G.bien(s, p).length > 8 && !malo(G.bien(s, p))); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${v}: ${a}`); }
      for (const f of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, f)), `${e.game} ${v} ${f}`);
      assert.ok(!malo(G.lee(s, p)) && (G.lee(s, p).match(/\$/g) || []).length % 2 === 0);
      if (m.en) { const [x, y] = m.en(s, p); assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${e.game}: ${x}, ${y}`); assert.equal(m.de(x, y, s, p), v, `${e.game} ${v}`); }
    }
    assert.equal(ok.join(), A[e.game], e.game);
  }
});

test('datos: los códigos son lo que dicen', () => {
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', cor = (w, f) => [...w].map((l, i) => ABC[(ABC.indexOf(l) + f(i) + 26) % 26]).join(''), val = w => [...w].reduce((s, l) => s + ABC.indexOf(l) + 1, 0), M = g => P(g).metas.join('');
  assert.equal(cor('ZUMO', () => 4), M('cifra-palabra')); assert.equal(cor('IGLK', () => -6), M('descifra-mensaje'));
  assert.equal(val('TREN'), 57); assert.equal(P('suma-letras').metas.slice(0, 4).join(), [...'TREN'].map(val).join()); assert.equal(val('RIO'), 42); assert.equal(val('MIL'), 34);
  assert.equal(parseInt('11100', 2), 28); assert.equal((29).toString(2), '11101');
  assert.equal(cor('RED', i => 2 * i + 2), 'TIJ'); assert.equal(cor('MAL', i => 2 * i + 2), 'OER');
  const pasa = (a, b, w) => [...b].map(l => w[a.indexOf(l)]).join(''); assert.equal(pasa('CAMPO', 'OCAMP', 'TIGRE'), M('puestos-cambian')); assert.equal(pasa('RUBIA', 'UBIAR', 'COLAR'), 'OLARC');
  P('maquina-dos-pasos').e.forEach(([a, b]) => assert.equal(4 * a + 1, +b)); P('maquina-cifras').e.forEach(([a, b]) => assert.equal(Math.abs(a[0] - a[1]), +b));
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  assert.equal(S('prende-focos'), '0,1,3,4'); assert.equal(S('regla-todos'), '1,3');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length, sol = G.solve(p).on;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true))); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    assert.ok(!malo(G.fondo(K, p)), e.game);
    for (let i = 0; i < n; i++) { const on = sol.map((x, k) => (k === i ? !x : x)); assert.equal(G.grade({ on }, p).ok, false); const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game} ${i}: ${a}`); }
  }
});

test('rótulos: las fichas alcanzan, caben, no se pisan, y cada error tiene aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    assert.equal(sl.length, m.length, e.game);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2 || /puestos/.test(e.game), e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 - 8 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 4, `${e.game}: «${t}» no cabe en ${a.w}`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a?.length > 10 && !malo(a), `${e.game} ${i}:${y}`); } });
    for (const k of Object.keys(p.trampas || {})) { const [i, t] = k.split(':'), r = [...p.fichas]; m.slice(0, +i).forEach(x => r.splice(r.indexOf(x), 1)); assert.ok(r.includes(t) && m[+i] !== t, `${e.game}: trampa ${k}`); }
  }
});

test('en todo el Preuniversitario la bandeja no trae la respuesta en orden', () => {
  let n = 0;
  for (const u of get(ctx, 'COURSES').find(c => c.id === 'preuda').units) for (const l of u.lessons) for (const e of l.ex) {
    const G = GAMES[e.game]; if (!G?.rotula) continue;
    const m = G.metas(e.params), f = G.fichas(e.params); n++;
    assert.ok(m.filter((x, i) => f[i] === x).length <= Math.max(1, m.length - 3), `${l.id} ${e.game}: ${f.join()} / ${m.join()}`);
    assert.notEqual(f.slice(0, m.length).join(), m.join(), `${l.id} ${e.game}`);
  }
  assert.ok(n > 30);
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
  for (const { e } of J) for (const f in src) if (f !== 'codigos-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
