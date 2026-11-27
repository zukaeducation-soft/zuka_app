// Proporcionalidad y porcentajes (pu-pr-1 a pu-pr-5) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-proporcion');
const L = id => U.lessons.find(l => l.id === id);
const LISTA = {
  'pu-pr-1': 'mismo-sabor,mezcla-total,corta-reparto,una-parte,escala-real,escala-plano,arregla-razon,sirve-partes',
  'pu-pr-2': 'precio-unidad,crece-o-baja,rectangulo-trabajo,tabla-directa,cuadros-trabajo,maquinas-justas,raciones-dias,lanza-regla',
  'pu-pr-3': 'tres-viajes,reloj-encuentro,reloj-caza,sale-despues,media-viaje,juntos-llenan,segunda-llave,lanza-viaje',
  'pu-pr-4': 'parte-barra,piezas-diez,porcentaje-barra,compara-porciento,total-barra,parte-de-la-parte,mezcla-agua,tiro-porciento',
  'pu-pr-5': 'factor-cada,precio-nuevo,dos-cambios,cambio-unico,mismo-final,vuelta-atras,sin-iva,tiro-precio',
};
const J = Object.keys(LISTA).flatMap(id => L(id).ex.slice(0, 8).map(e => ({ e, G: GAMES[e.game], p: e.params })));
const arr = x => (Array.isArray(x) ? x : [x]);
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
function estados(G, p) {
  let out = [{ ...G.ini(p) }];
  for (const m of G.manijas(p)) arr(m.k).forEach(k => {
    const vs = []; for (let v = m.min; v <= m.max + 1e-9; v += m.paso) vs.push(Math.round(v * 1000) / 1000);
    out = out.flatMap(s => vs.map(v => ({ ...s, [k]: v })));
  });
  return out.filter(s => G.manijas(p).every(m => !m.limita || m.limita(s)));
}

test('cada lección: ocho juegos en orden y la zona de examen', () => {
  for (const id in LISTA) assert.equal(L(id).ex.map(e => e.game).join(), `${LISTA[id]},completa-solucion,caza-error,opcion-examen`, id);
});

test('la solución gana, el inicio no, no nace listo, y hay guía y pista', () => {
  for (const { e, G, p } of J) {
    assert.equal(G.xp, true, e.game);
    assert.equal(G.grade(G.solve(p), p).ok, true, `${e.game}: solve ${JSON.stringify(G.solve(p))}`);
    assert.equal(G.grade(G.ini(p), p).ok, false, e.game); assert.equal(G.grade(undefined, p).ok, false, e.game);
    assert.equal(G.listo(G.ini(p), p), false, e.game); assert.equal(G.listo(G.solve(p), p), true, e.game);
    assert.ok(!malo(G.texto(p)) && (G.texto(p).match(/\$/g) || []).length % 2 === 0, `${e.game}: ${G.texto(p)}`);
    assert.ok(GUIDES[e.game], e.game); assert.ok(e.hint.length > 40, e.game);
  }
});

const ACEPTA = { 'mezcla-total': '20/16', 'corta-reparto': '16/40', 'escala-real': '2.4', 'escala-plano': '5', 'arregla-razon': '6', 'precio-unidad': '45', 'rectangulo-trabajo': '16', 'cuadros-trabajo': '6', 'maquinas-justas': '6', 'raciones-dias': '4.5',
  'reloj-encuentro': '2', 'reloj-caza': '3', 'sale-despues': '4', 'media-viaje': '60', 'juntos-llenan': '12', 'segunda-llave': '15', 'parte-barra': '54', 'porcentaje-barra': '75', 'total-barra': '80', 'mezcla-agua': '120',
  'precio-nuevo': '138', 'dos-cambios': '150', 'cambio-unico': '-10', 'vuelta-atras': '90', 'sin-iva': '300' };
test('figuras: se acepta exactamente la respuesta que debe y todo se dibuja', () => {
  const l = J.filter(j => j.G.figura);
  assert.equal(l.length, Object.keys(ACEPTA).length);
  for (const { e, G, p } of l) {
    const ok = [];
    for (const s of estados(G, p)) {
      if (G.grade(s, p).ok) { ok.push(Object.values(s).join('/')); assert.ok(G.bien(s, p).length > 8 && !malo(G.bien(s, p)), e.game); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${JSON.stringify(s)}: «${a}»`); }
      for (const f of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, f)), `${e.game} ${JSON.stringify(s)} f=${f}`);
      const t = G.lee(s, p); assert.ok(t && !malo(t) && (t.match(/\$/g) || []).length % 2 === 0, `${e.game}: ${t}`);
    }
    assert.equal(ok.join(), ACEPTA[e.game], e.game);
    for (const m of G.manijas(p)) if (m.en) for (const s of estados(G, p)) {
      const [x, y] = m.en(s, p);
      assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${e.game} ${JSON.stringify(s)}: ${x}, ${y}`);
      assert.ok(Math.abs(m.de(x, y, s, p) - s[m.k]) < 1e-6, `${e.game}: ${m.de(x, y, s, p)}`);
    }
  }
});

test('figuras: mientras se responde no se ve el resultado', () => {
  const h = { 'mezcla-total': 'total: 36', 'reloj-encuentro': 'la gr', 'media-viaje': '>3 h<', 'mezcla-agua': '>25 %<', 'cambio-unico': '>90<', 'vuelta-atras': 'el tuyo', 'dos-cambios': 'tf', 'cuadros-trabajo': '>5<' };
  for (const { e, G, p } of J.filter(j => h[j.e.game])) { const s = G.solve(p); assert.ok(!G.dib(s, K, p, 0).includes(h[e.game]), `${e.game} regala`); assert.ok(G.dib(s, K, p, 1).includes(h[e.game]), `${e.game} no lo muestra`); }
});

test('rótulos y marcas: una sola respuesta, sin pisarse, y con aviso', () => {
  for (const { e, G, p } of J.filter(j => j.G.rotula)) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 2, e.game);
    sl.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game} se pisan`)); for (const t of G.fichas(p)) assert.ok(Math.max(36, t.length * 8 + 16) <= a.w + 2, `${e.game}: «${t}» no cabe`); });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)));
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); assert.ok(G.aviso(s, p).length > 10 && !malo(G.aviso(s, p)), e.game); } });
  }
  const S = g => { const { G, p } = J.find(j => j.e.game === g); return G.solve(p).on.map((x, i) => (x ? i : -1)).filter(i => i >= 0).join(); };
  assert.equal(S('mismo-sabor'), '0,2,4'); assert.equal(S('crece-o-baja'), '0,2,4'); assert.equal(S('compara-porciento'), '0,2,4'); assert.equal(S('mismo-final'), '0,1,3');
  for (const { e, G, p } of J.filter(j => j.G.marca)) {
    const st = G.sitios(p), n = st.length;
    st.forEach((a, i) => { assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 0 && a.y + a.h / 2 <= G.alto(p), `${e.game} ${i}`); st.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, e.game)); });
    for (let m = 1; m < 2 ** n; m++) { const on = Array.from({ length: n }, (_, i) => !!(m >> i & 1)); if (!G.grade({ on }, p).ok) assert.ok(G.aviso({ on }, p).length > 10 && !malo(G.aviso({ on }, p)), e.game); }
  }
});

test('tiros: la respuesta cabe, los errores también, y fallar no la enseña', () => {
  const l = J.filter(j => j.G.tiros);
  assert.equal(l.length, 5);
  for (const { e, G, p } of l) for (const t of p.tiros) {
    const o = G.perilla(t, p), m = G.meta(t, p), k = e.game === 'tiro-precio' ? 5 : 1;
    assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, e.game);
    for (let v = 1; v <= o.max; v++) { for (const f of [0, 0.5, 1]) assert.ok(!malo(G.dib(t, v, K, p, f)), `${e.game} ${v}`); if (v !== m) assert.ok(G.falla(t, v, p).length > 8); }
    for (const x of Object.keys(t.e || {})) assert.ok(+x !== t.r && +x % k === 0 && +x / k <= o.max, `${e.game}: ${x}`);
  }
});

test('ningún juego pisa el nombre de otro', () => {
  const dir = path.join(ROOT, 'js/games'), src = Object.fromEntries(fs.readdirSync(dir).map(f => [f, fs.readFileSync(path.join(dir, f), 'utf8')]));
  for (const { e } of J) for (const f in src) if (f !== 'proporcion-escena.js') assert.ok(!src[f].includes(`GAMES['${e.game}'] =`) && !new RegExp(`XG\\.\\w+\\('${e.game}'`).test(src[f]), `${e.game} ya existe en ${f}`);
});
