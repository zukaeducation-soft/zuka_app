// Razonamiento espacial (pu-es-1 a pu-es-4) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES'), XG = get(ctx, 'XG');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-espacial');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-es-1': 'esquina-dos,rombo-cuadras,termina-ruta,mismo-destino,vuelve-corto,atajo-recto,regresa-ya,taxi-cuadras',
  'pu-es-2': 'torres-suma,vista-frente,vista-izquierda,plano-maximo,pintura-lugar,donde-pintura,bloque-adentro,sube-cubos',
  'pu-es-3': 'opuestas-molde,cierra-cubo,vecinas-cara,dado-escondidas,vuelca-dado,rueda-dado,dados-imposibles,sube-dado',
  'pu-es-4': 'espejo-vertical,letras-espejo,gira-ele,giro-o-espejo,hora-espejo,papel-abierto,dobla-y-cuenta,sube-dobleces',
};
const J = Object.keys(LISTA).flatMap(id => L(id).ex.slice(0, 8).map(e => ({ e, G: GAMES[e.game], p: e.params })));
const P = g => J.find(j => j.e.game === g).p;
const arr = x => (Array.isArray(x) ? x : [x]);
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
function estados(G, p) {
  let out = [{ ...G.ini(p) }];
  for (const m of G.manijas(p)) arr(m.k).forEach((k, i) => { const g = q => arr(m[q])[i] ?? arr(m[q])[0], vs = []; for (let v = g('min'); v <= g('max'); v += g('paso')) vs.push(v); out = out.flatMap(s => vs.map(v => ({ ...s, [k]: v }))); });
  return out;
}

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

test('figuras: se acepta exactamente la respuesta que debe, la manija está en el lienzo y todo se dibuja', () => {
  const A = { 'esquina-dos': '5/3,6/2,7/1', 'termina-ruta': '3/2', 'atajo-recto': '15', 'bloque-adentro': '5', 'gira-ele': '270', 'hora-espejo': '7' };
  const l = J.filter(j => j.G.figura);
  assert.equal(l.length, 6);
  for (const { e, G, p } of l) {
    const ok = [];
    for (const s of estados(G, p)) {
      if (G.grade(s, p).ok) { ok.push(Object.values(s).join('/')); assert.ok(G.bien(s, p).length > 8); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${JSON.stringify(s)}: ${a}`); }
      for (const f of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, f)), `${e.game} ${JSON.stringify(s)} ${f}`);
      assert.ok(!malo(G.lee(s, p)) && (G.lee(s, p).match(/\$/g) || []).length % 2 === 0);
      for (const m of G.manijas(p)) if (m.en) { const [x, y] = m.en(s, p); assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${e.game}: ${x}, ${y}`); arr(m.de(x, y, s, p)).forEach((v, i) => assert.ok(Math.abs(v - s[arr(m.k)[i]]) < 0.3, `${e.game} ${JSON.stringify(s)}: ${v}`)); }
    }
    assert.equal(ok.join(), A[e.game], e.game);
  }
});

test('moldes: los seis del juego se doblan como deben y los cubos posibles lo son de verdad', () => {
  const { dobla, opuesta, posible } = XG.espacial;
  // Los 11 desarrollos del cubo cierran, sin importar por dónde se empiece.
  for (const m of P('cierra-cubo').moldes) { const r = !!dobla(m); for (let k = 1; k < 6; k++) assert.equal(!!dobla([...m.slice(k), ...m.slice(0, k)]), r); }
  assert.equal(P('cierra-cubo').moldes.map(m => (dobla(m) ? 1 : 0)).join(''), '101010');
  assert.equal(GAMES['opuestas-molde'].metas(P('opuestas-molde')).join(), 'J,K,M');
  const p = P('dados-imposibles'); // cruz: A B C D en fila, E arriba de B, F abajo
  assert.equal([0, 1, 4].map(i => p.letras[opuesta(p.cel, i)]).join(), 'C,D,F');
  p.dados.forEach((d, i) => { const mal = d.some(a => d.some(b => p.letras.indexOf(b) === opuesta(p.cel, p.letras.indexOf(a)))); if (!mal) assert.ok(posible(p.cel, p.letras, d), `el cubo ${i + 1} no se puede ver así`); });
  // La cruz: con E arriba y B al frente, C queda a la derecha.
  assert.ok(posible(p.cel, p.letras, ['E', 'B', 'C'])); assert.ok(!posible(p.cel, p.letras, ['E', 'C', 'B']));
});

test('marcas: la respuesta es la que es, sin pisarse y con aviso', () => {
  const S = g => GAMES[g].solve(P(g)).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join();
  assert.equal(S('rombo-cuadras').split(',').length, 10); assert.equal(S('mismo-destino'), '0,2,4'); assert.equal(S('vista-frente'), '3,6,7,9,10,11');
  assert.equal(S('vista-izquierda'), '2,3,5,6,7,8,9,10,11'); assert.equal(S('donde-pintura').split(',').length, 24); assert.equal(S('cierra-cubo'), '0,2,4'); assert.equal(S('vecinas-cara'), '1,3,4,5');
  assert.equal(S('dados-imposibles'), '1,3,5'); assert.equal(S('letras-espejo'), '0,2,4,6'); assert.equal(S('giro-o-espejo'), '0,2,4'); assert.equal(S('papel-abierto'), '1,2,13,14'); assert.equal(S('espejo-vertical'), '2,3,4,6,8,9,14');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length, sol = G.solve(p).on;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 1 && a.x + a.w / 2 <= 339 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); assert.ok(!malo(G.cara(K, p, i, true) + G.cara(K, p, i, false)), e.game); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    assert.ok(!malo(G.fondo(K, p)), e.game);
    for (let i = 0; i < n; i++) { const on = sol.map((x, k) => (k === i ? !x : x)); assert.equal(G.grade({ on }, p).ok, false); const a = G.aviso({ on }, p); assert.ok(a.length > 10 && !malo(a), `${e.game} ${i}: ${a}`); }
  }
  // La figura de los giros no es igual a su espejo girado.
  const cel = P('giro-o-espejo').cel, gira = c => c.map(([x, y]) => [2 - y, x]), k = c => c.map(q => q.join()).sort().join(';'); let g = cel; const giros = []; for (let i = 0; i < 4; i++) { giros.push(k(g)); g = gira(g); }
  assert.ok(!giros.includes(k(cel.map(([x, y]) => [2 - x, y]))), 'la figura es simétrica'); assert.equal(new Set(giros).size, 4);
});

test('rótulos: las fichas alcanzan, caben, no se pisan, y cada error tiene aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2, e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 4, `${e.game}: «${t}» no cabe en ${a.w}`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a?.length > 10 && !malo(a), `${e.game} ${i}:${y}`); } });
    for (const k of Object.keys(p.trampas || {})) { const [i, t] = k.split(':'), r = [...p.fichas]; m.slice(0, +i).forEach(x => r.splice(r.indexOf(x), 1)); assert.ok(r.includes(t) && m[+i] !== t, `${e.game}: trampa ${k}`); }
  }
  const H = P('torres-suma').h; H.forEach((f, r) => f.forEach((n, c) => assert.ok((!r || n >= H[r - 1][c]) && (!c || n >= f[c - 1]), 'una torre tapa el número de otra')));
  const h = P('torres-suma').h.map(f => f.reduce((a, b) => a + b)); assert.equal(P('torres-suma').metas.join(), [...h, h.reduce((a, b) => a + b)].join());
  let c = [0, 0, 0, 0]; for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) for (let z = 0; z < 10; z++) c[[x, y, z].filter(k => k === 0 || k === 9).length]++;
  assert.equal(P('pintura-lugar').metas.join(), c.reverse().join());
});

test('tiros: la respuesta cabe, los errores también, y fallar no la enseña', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 4);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p);
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${t.q}`);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f))); if (v !== m) { assert.ok(G.falla(t, v, p).length > 8); assert.ok(!/xf fo/.test(G.dib(t, v, K, p, 1))); } }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x <= o.max, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'espacial-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
