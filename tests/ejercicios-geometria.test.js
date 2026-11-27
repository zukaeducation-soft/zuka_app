// Geometría (pu-ge-1 a pu-ge-6) con las escenas de la explicación (spec 2026-11-24-ejercicios-explora): la figura se manipula,
// no dice el resultado mientras se responde, y los datos aceptan exactamente las respuestas que deben.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html');
const all = require('./load').enRepo(html).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|explora\.js|explora-escenas/.test(f));
const ctx = loadScripts(all);
const GAMES = get(ctx, 'GAMES'), K = get(ctx, 'XPK'), GUIDES = get(ctx, 'GUIDES');
const U = get(ctx, 'COURSES').find(c => c.id === 'preuda').units.find(u => u.world === 'pu-geometria');
const L = id => U.lessons.find(l => l.id === id);
const ZONA = 'completa-solucion,caza-error,opcion-examen';
const LISTA = {
  'pu-ge-1': 'vecinos-razon,tres-parientes,cruce-ocho,conjugados-justos,tercer-angulo,exterior-alcanza,poligono-regular,lanza-angulo',
  'pu-ge-2': 'cuadrado-catetos,cateto-falta,lados-familia,diagonal-cuadrado,equilatero-partes,a-diez-pasos,dos-pasos,lanza-cuerda',
  'pu-ge-3': 'foto-fiel,sombra-poste,tales-corte,escala-mapa,papel-factor,tres-crecimientos,achica-area,lanza-escala',
  'pu-ge-4': 'misma-area,inclina-marco,trapecio-gemelo,radio-area,arco-justo,borde-mixto,rombo-diagonales,rueda-lanza',
  'pu-ge-5': 'marco-hueco,anillo-justo,vertice-lejos,caja-torcida,techo-justo,bandera-onda,anden-ancho,llena-lanza',
  'pu-ge-6': 'capas-caja,cilindro-altura,cono-agua,piramide-altura,caras-caja,cubo-arista,litros-nivel,llena-tanque',
};
const juegos = Object.keys(LISTA).flatMap(id => L(id).ex.slice(0, 8).map(e => ({ id, e, G: GAMES[e.game], p: e.params })));
const arr = x => (Array.isArray(x) ? x : [x]);
const malo = s => /NaN|undefined|Infinity|(width|height|r)="-/.test(s);
// Todos los estados que se pueden alcanzar con las manijas.
function estados(G, p) {
  let out = [{ ...G.ini(p) }];
  for (const m of G.manijas(p)) arr(m.k).forEach((k, i) => {
    const mn = arr(m.min)[i] ?? arr(m.min)[0], mx = arr(m.max)[i] ?? arr(m.max)[0], ps = arr(m.paso)[i] ?? arr(m.paso)[0], vs = [];
    for (let v = mn; v <= mx + 1e-9; v += ps) vs.push(Math.round(v * 1000) / 1000);
    out = out.flatMap(s => vs.map(v => ({ ...s, [k]: v })));
  });
  return out;
}

test('cada lección: sus ocho juegos en orden y la zona de examen', () => {
  for (const id in LISTA) assert.equal(L(id).ex.map(e => e.game).join(), `${LISTA[id]},${ZONA}`, id);
  assert.equal(new Set(juegos.map(j => j.e.game)).size, 48);
});

test('la solución gana, el inicio no, no nace listo, y hay guía y pista', () => {
  for (const { e, G, p } of juegos) {
    assert.equal(G.xp, true, e.game);
    assert.equal(G.grade(G.solve(p), p).ok, true, `${e.game}: solve`);
    assert.equal(G.grade(G.ini(p), p).ok, false, `${e.game}: ini`);
    assert.equal(G.grade(undefined, p).ok, false, e.game);
    assert.equal(G.listo(G.ini(p), p), false, `${e.game}: nace listo`);
    assert.equal(G.listo(G.solve(p), p), true, e.game);
    assert.equal((G.texto(p).match(/\$/g) || []).length % 2, 0, e.game);
    assert.ok(GUIDES[e.game], e.game); assert.ok(e.hint.length > 40, e.game);
  }
});

const ACEPTA = { 'vecinos-razon': '144', 'conjugados-justos': '70', 'tercer-angulo': '52/52', 'exterior-alcanza': '55', 'poligono-regular': '15',
  'cuadrado-catetos': '6/7,7/6', 'cateto-falta': '24', 'diagonal-cuadrado': '14', 'a-diez-pasos': '7/9,9/7', 'dos-pasos': '25',
  'foto-fiel': '15/10', 'sombra-poste': '7.5', 'tales-corte': '15', 'escala-mapa': '2', 'papel-factor': '6', 'achica-area': '4/3',
  'misma-area': '10', 'inclina-marco': '6', 'trapecio-gemelo': '8', 'radio-area': '6', 'arco-justo': '100', 'rombo-diagonales': '10',
  'marco-hueco': '5', 'anillo-justo': '3', 'bandera-onda': '9', 'anden-ancho': '2',
  'capas-caja': '7', 'cilindro-altura': '6', 'cono-agua': '10', 'piramide-altura': '6', 'cubo-arista': '3', 'litros-nivel': '2.5' };
test('figuras: se aceptan exactamente las respuestas que deben; la escena se dibuja en todo el recorrido', () => {
  const f = juegos.filter(j => j.G.figura);
  assert.equal(f.length, 34);
  for (const { e, G, p } of f) {
    const ok = [];
    for (const s of estados(G, p)) {
      if (G.grade(s, p).ok) { ok.push(Object.values(s).join('/')); assert.ok(G.bien(s, p).length > 10 && !malo(G.bien(s, p)), e.game); } else { const a = G.aviso(s, p); assert.ok(a.length > 8 && !malo(a), `${e.game} ${JSON.stringify(s)}: «${a}»`); }
      for (const q of [0, 0.4, 1]) assert.ok(!malo(G.dib(s, K, p, q)), `${e.game} ${JSON.stringify(s)} f=${q}`);
      const lee = G.lee(s, p); assert.ok(lee && !malo(lee) && (lee.match(/\$/g) || []).length % 2 === 0, `${e.game}: ${lee}`);
    }
    if (ACEPTA[e.game]) assert.equal(ok.join(), ACEPTA[e.game], e.game);
    else if (e.game === 'vertice-lejos') assert.ok(ok.length === 8 && ok.every(x => x.startsWith('9/')), ok.join());
    else if (e.game === 'techo-justo') assert.ok(ok.length === 12 && ok.every(x => x.endsWith('/6')), ok.join());
    else assert.fail(e.game);
  }
});

test('figuras: la manija está dentro del lienzo, y arrastrarla hasta su sitio da ese mismo valor', () => {
  for (const { e, G, p } of juegos.filter(j => j.G.figura)) for (const m of G.manijas(p)) {
    if (!m.en) continue;
    for (const s of estados(G, p)) {
      const [x, y] = m.en(s, p);
      assert.ok(x >= 8 && x <= 332 && y >= 4 && y <= G.alto(p) - 4, `${e.game} ${JSON.stringify(s)}: ${x}, ${y}`);
      arr(m.de(x, y, s, p)).forEach((v, i) => assert.ok(Math.abs(v - s[arr(m.k)[i]]) < 0.26 * Math.max(1, (arr(m.paso)[i] ?? arr(m.paso)[0])), `${e.game} ${JSON.stringify(s)} → ${v}`));
    }
  }
});

test('figuras: mientras se responde no se ve el resultado', () => {
  const oculto = { 'vecinos-razon': '36°', 'conjugados-justos': '110°', 'tercer-angulo': '76°', 'exterior-alcanza': '130°', 'cuadrado-catetos': '>85<', 'inclina-marco': '>8<', 'papel-factor': '>36<', 'misma-area': '>40<', 'anden-ancho': '>10<', 'dos-pasos': '>15<' };
  for (const { e, G, p } of juegos.filter(j => oculto[j.e.game])) {
    const s = G.solve(p);
    assert.ok(!G.dib(s, K, p, 0).includes(oculto[e.game]), `${e.game} regala`);
    assert.ok(G.dib(s, K, p, 1).includes(oculto[e.game]), `${e.game} no lo muestra al final`);
  }
});

test('rótulos: las fichas alcanzan, sobran errores, los lugares no se pisan y solo hay una respuesta', () => {
  const r = juegos.filter(j => j.G.rotula);
  assert.equal(r.length, 8);
  for (const { e, G, p } of r) {
    const f = [...G.fichas(p)], m = G.metas(p), sl = G.slots(p);
    for (const x of m) { const k = f.indexOf(x); assert.ok(k >= 0, `${e.game}: falta ${x}`); f.splice(k, 1); }
    assert.ok(f.length >= 1, e.game);
    sl.forEach((a, i) => {
      assert.ok(a.x - a.w / 2 >= 2 && a.x + a.w / 2 <= 338 && a.y - a.h / 2 >= 2 && a.y + a.h / 2 <= G.alto(p), `${e.game}: lugar ${i}`);
      sl.slice(i + 1).forEach(b => assert.ok(Math.abs(a.x - b.x) >= (a.w + b.w) / 2 || Math.abs(a.y - b.y) >= (a.h + b.h) / 2, `${e.game}: se pisan`));
    });
    for (const q of [0, 0.5, 1]) assert.ok(!malo(G.fondo(K, p, q)), e.game);
    // Cambiar cualquier ficha por otra distinta falla, y siempre hay algo que decir.
    m.forEach((x, i) => { for (const y of new Set(G.fichas(p))) if (y !== x) { const s = { q: m.map((z, j) => [j === i ? y : z]) }; assert.equal(G.grade(s, p).ok, false); const a = G.aviso(s, p); assert.ok(a.length > 10 && !malo(a), e.game); } });
  }
});

test('tiros: tres por juego, se perdona un fallo, la respuesta cabe en la perilla y el error típico tiene su aviso', () => {
  const t = juegos.filter(j => j.G.tiros);
  assert.equal(t.length, 6);
  for (const { e, G, p } of t) {
    assert.equal(p.tiros.length, 3, e.game);
    for (const x of p.tiros) {
      const o = G.perilla(x, p), m = G.meta(x, p);
      assert.ok(Number.isInteger(m) && m > o.min && m <= o.max, `${e.game}: ${m}`);
      for (let v = o.min; v <= o.max; v++) { for (const q of [0, 0.5, 1]) assert.ok(!malo(G.dib(x, v, K, p, q)), `${e.game} ${v}`); if (v !== m) assert.ok(G.falla(x, v, p).length > 8); assert.ok(!malo(o.lee(v))); }
      assert.ok(!malo(G.dib(x, null, K, p, 0)));
      for (const k of Object.keys(x.e || {})) assert.ok(+k !== x.r && +k <= o.max * (e.game === 'lanza-angulo' ? 5 : 1), `${e.game}: ${k}`);
      assert.equal((x.q.match(/\$/g) || []).length % 2, 0);
    }
    let s = G.ini(p);
    s = G.tira(s, 1, p); s = G.tira(s, G.meta(p.tiros[0], p), p);
    assert.equal(JSON.stringify(s), '{"n":1,"fallos":1}', e.game);
    assert.equal(G.grade({ n: 3, fallos: 1 }, p).ok, true); assert.equal(G.grade({ n: 2, fallos: 2 }, p).ok, false); assert.equal(G.listo({ n: 2, fallos: 2 }, p), true);
    assert.equal(JSON.stringify(G.tira({ n: 3, fallos: 0 }, 1, p)), '{"n":3,"fallos":0}');
  }
  const r = g => t.find(j => j.e.game === g).p.tiros;
  for (const x of r('lanza-cuerda')) assert.equal(x.a != null ? Math.hypot(x.a, x.b) : Math.sqrt(x.h ** 2 - x.b ** 2), x.r);
  for (const x of r('llena-lanza')) { const { w, h, hueco, esq, tri } = x.f; assert.equal(w * h / (tri ? 2 : 1) - (hueco ? hueco[0] * hueco[1] : 0) - (esq ? esq * h : 0), x.r, x.q); }
  for (const x of r('llena-tanque')) assert.equal(x.t === 'cil' ? x.rad ** 2 * x.h : x.t === 'cono' ? x.rad ** 2 * x.h / 3 : x.cilindro * 2 / 3, x.r);
});

test('cada archivo está registrado, en orden, y la explicación enseña el rombo', () => {
  const sw = require('./load').shell();
  for (const f of ['figura-kit', 1, 2, 3, 4, 5, 6].map(x => (x === 'figura-kit' ? x : `geo-escena-${x}`))) { assert.ok(html.includes(`js/games/${f}.js`)); assert.ok(sw.includes(`js/games/${f}.js`)); }
  assert.ok(html.indexOf('explora-kit.js') < html.indexOf('figura-kit.js') && html.indexOf('figura-kit.js') < html.indexOf('geo-escena-1.js'));
  assert.match(read('js/explora-pu-ge-4.js'), /rombo/);
});
