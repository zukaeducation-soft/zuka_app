// Preicfes paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde cero, recuerda la lección anterior
// del componente, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (A–D con sus trampas). En Ciencias y
// Sociales hay al menos una ilustración realista (XLAB) por lección.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const exp = [...html.matchAll(/src="(js\/explora[^"]*)"/g)].map(m => m[1]).filter(f => !/voces/.test(f));
const ctx = loadScripts(['js/courses/preicfes-temario.js', ...exp]);
const EXPLORA = get(ctx, 'EXPLORA'), T = get(ctx, 'PI_TEMARIO'), XPK = get(ctx, 'XPK'), XLAB = get(ctx, 'XLAB'), XP = get(ctx, 'XP');
const ids = b => T[b].flatMap(w => w[2].map((_, k) => `${w[0]}-${k + 1}`));
const FOTO = ['ciencias', 'sociales'];
const D = p => p.dib || p.en.dib, V = p => p.v || (p.en && p.en.v) || {};
const SOURCE = /icfes|saber 11|saber11|cuadernillo|simulacro|examen de (estado|admisi)|\b20(19|21|22|24|25)\b/i;

test('el kit de fotos dibujadas no deja huecos y va antes de las explicaciones del Preicfes', () => {
  assert.ok(html.indexOf('js/explora-lab.js') < html.indexOf('js/explora-icf-ma.js'));
  const X = XLAB;
  const s = X.foto(X.vaso(80, 160, 60, 80, 0.6, 'agua', { hielo: 2, burbujas: 3 }) + X.matraz(200, 160, 1, 0.4, 'rojo', { globo: 0.5 }) + X.planta(280, 160, 40, 0.3) +
    X.documento(10, 10, 120, 90, ['línea'], { titulo: 'Acta', sello: 'S' }) + X.aviso(10, 10, 120, 60, ['NO SMOKING'], 'peligro') + X.edificio(170, 160, 100, 'capitolio'), 200, 'lab');
  assert.ok(!/NaN|undefined/.test(s));
  for (const f of ['lab', 'campo', 'ciudad', 'papel', 'noche', 'agua', 'mesa']) assert.ok(!/NaN|undefined/.test(X.foto('', 180, f)), f);
});

for (const b of Object.keys(T)) {
  const lista = ids(b);
  for (const [i, id] of lista.entries()) {
    test(`${id}: paso a paso, de lo básico a lo complejo`, () => {
      const L = EXPLORA[id];
      assert.ok(L && L.amplia, `${id} sin ampliar`);
      assert.match(L.caps[0], /^Desde cero/, 'empieza desde cero');
      assert.ok(L.caps.some(c => /^Más difícil/.test(c)), 'sube a un caso más difícil');
      assert.equal(L.caps.at(-2), 'Así lo pregunta el examen');
      assert.ok(L.caps.length >= 7, `solo ${L.caps.length} capítulos`);
      assert.ok(L.pasos.filter(p => p.tipo === 'muestra').length >= 5, 'pocas explicaciones');
      const ex = L.pasos.filter(p => p.cap === L.caps.length - 2);
      assert.equal(ex[0].tipo, 'muestra', 'el examen se explica antes de practicarlo');
      const prac = ex.find(p => p.tipo !== 'muestra');
      assert.ok(prac && (prac.letras || []).join('') === 'ABCD', 'la práctica del examen es A–D');
      assert.ok(!SOURCE.test(JSON.stringify(L.pasos.map(p => [p.texto, p.idea, p.momentos, p.paras]))), 'no dice de qué examen sale');
      if (i === 0) assert.equal(L.amplia.conecta, null);
      else assert.ok(lista.indexOf(L.amplia.conecta) >= 0 && lista.indexOf(L.amplia.conecta) < i, `conecta con una lección anterior del componente: ${L.amplia.conecta}`);
      const dibs = L.pasos.filter(q => q.tipo === 'dibujo' || q.escena === 'dibujo');
      if (FOTO.includes(b)) {
        const fotos = dibs.filter(p => /class="xlab"/.test(D(p)({ ...V(p), ...((p.momentos || [])[0] || {}).v }, XPK)));
        assert.ok(fotos.length >= 1, 'sin ilustración realista');
      }
      for (const p of dibs) {
        for (const m of p.momentos || [{ v: {} }]) assert.ok(!/NaN|undefined/.test(D(p)({ ...V(p), ...m.v }, XPK)), `dibujo con huecos: ${p.texto}`);
      }
      const t = XP.cierre;
      assert.ok(t && L.pasos.at(-1).tipo === 'cierre');
    });
  }
}

// Fotos reales (Wikimedia Commons, con licencia libre): cada lección de Ciencias y Sociales abre su primer capítulo con una.
const XP_FOTOS = get(ctx, 'XP_FOTOS'), XFOTO = get(ctx, 'XFOTO');
const CRED = JSON.parse(fs.readFileSync(path.join(ROOT, 'media/fotos/creditos.json'), 'utf8'));
const LIBRE = /^(public domain|pd|cc0|cc by(-sa)? \d(\.\d)?|cc by(-sa)?$)/i;

test('cada foto real tiene su archivo liviano, su crédito con autor y una licencia libre', () => {
  assert.deepEqual(Object.keys(XFOTO).sort(), Object.keys(CRED).sort(), 'js/explora-fotos-datos.js está al día');
  for (const [id, c] of Object.entries(CRED)) {
    const f = path.join(ROOT, 'media/fotos', `${id}.webp`);
    assert.ok(fs.existsSync(f), `falta ${f}`);
    assert.ok(fs.statSync(f).size < 140 * 1024, `${id} pesa mucho`);
    assert.match(c.licencia, LIBRE, `${id}: ${c.licencia}`);
    assert.ok(c.autor && c.pagina && /commons\.wikimedia\.org/.test(c.pagina), id);
    assert.ok(XFOTO[id].cred.length <= 78 && XFOTO[id].cred.includes(c.licencia), `${id}: crédito`);
  }
  assert.ok(html.indexOf('js/explora-fotos-datos.js') < html.indexOf('js/explora-icf-ma.js'));
});

for (const b of FOTO) for (const id of ids(b)) {
  test(`${id}: abre con una foto real`, () => {
    const foto = XP_FOTOS[id];
    assert.ok(foto && CRED[foto], `${id} sin foto real`);
    const p = EXPLORA[id].pasos[0];
    assert.equal(p.en.foto, foto, 'la foto va primero');
    for (const m of p.momentos) assert.ok(!/NaN|undefined/.test(D(p)({ ...V(p), ...m.v }, XPK)));
    assert.match(D(p)(V(p), XPK), new RegExp(`media/fotos/${foto}\.webp`));
  });
}
