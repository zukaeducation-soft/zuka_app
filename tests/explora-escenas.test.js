// Escenas por datos de Explora (js/explora-escenas.js: dibujo, fichas y rejilla): en todas las lecciones, cada cuadro se dibuja sin
// NaN, los rótulos caben en el lienzo, las manijas se alcanzan y llegan a la meta, y las fichas alcanzan para la solución.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const MOTOR = ['js/explora.js', 'js/explora-angulo.js', 'js/explora-numeros.js', 'js/explora-escenas.js', 'js/explora-mate.js'];
const contenido = fs.readdirSync(path.join(ROOT, 'js')).filter(f => /^explora-.+\.js$/.test(f) && !MOTOR.includes(`js/${f}`)).map(f => `js/${f}`);
const ctx = loadScripts([...MOTOR, ...contenido]);
const XP = get(ctx, 'XP'), EXPLORA = get(ctx, 'EXPLORA'), K = get(ctx, 'XPK'), manijas = get(ctx, 'xpManijas'), paso = get(ctx, 'xpPaso');

const TAM = { s: 12, b: 18, B: 26 };
function textos(svg, H, w = 340) {
  const out = [];
  for (const m of svg.matchAll(/<text class="xt ([^"]*)" x="([-\d.]+)" y="([-\d.]+)" style="text-anchor:(\w+)">([^<]*)<\/text>/g)) {
    const fs2 = TAM[m[1].split(' ').find(c => TAM[c])] || 14, an = m[5].length * fs2 * 0.5, x = +m[2], y = +m[3];
    const x0 = m[4] === 'middle' ? x - an / 2 : m[4] === 'end' ? x - an : x;
    if (x0 < -4 || x0 + an > w + 4 || y < 8 || y > H + 2) out.push(`«${m[5]}» se sale (${Math.round(x0)}..${Math.round(x0 + an)}, y ${Math.round(y)} de ${H})`);
  }
  return out;
}
const bien = (svg, H, donde) => {
  assert.ok(!/NaN|undefined|Infinity/.test(svg), `${donde}: ${svg.match(/.{60}(NaN|undefined|Infinity).{30}/)?.[0]}`);
  assert.deepEqual(textos(svg, H).join('; '), '', donde);
};
const texOk = (t, donde) => {
  const d = (t.match(/(?<!\\)\$/g) || []).length;
  assert.equal(d % 2, 0, `${donde}: $ sin cerrar en ${t}`);
  let n = 0; for (const c of t.replace(/\\[{}]/g, '')) { if (c === '{') n++; if (c === '}') n--; assert.ok(n >= 0, `${donde}: llaves en ${t}`); }
  assert.equal(n, 0, `${donde}: llaves en ${t}`);
};

for (const [id, L] of Object.entries(EXPLORA)) {
  test(`${id}: cada cuadro se dibuja y cabe; la práctica se alcanza`, () => {
    L.pasos.forEach((p, i) => {
      const t = p.tipo === 'muestra' ? p.escena : p.tipo, e = p.tipo === 'muestra' ? p.en : p, donde = `paso ${i} (${t})`;
      for (const x of [p.texto, p.idea, ...(p.momentos || []).map(m => m.cuenta || '')]) texOk(x, donde);
      if (t === 'dibujo') {
        const H = e.alto || 200;
        if (p.momentos) {
          let v = { ...e.v };
          p.momentos.forEach((m, k) => {
            const a = { ...v }; v = { ...v, ...m.v };
            for (const k2 in m.v) assert.ok(k2 in e.v || m.v[k2] === null || typeof m.v[k2] === 'string', `${donde}: v.${k2} sin valor inicial`);
            const mid = { ...v }; for (const q in mid) if (typeof mid[q] === 'number' && typeof a[q] === 'number') mid[q] = a[q] + (mid[q] - a[q]) * 0.5137;
            bien(e.dib(v, K), H, `${donde} momento ${k}`);
            const md = e.dib(mid, K);
            assert.ok(!/NaN|undefined/.test(md), `${donde} a mitad de ${k}`);
            assert.ok(!/>[^<]*\d\.\d{3,}[^<]*<\/text>/.test(md), `${donde} a mitad de ${k}: decimales sueltos ${md.match(/>[^<]*\d\.\d{3,}[^<]*</)?.[0]}`);
          });
        } else {
          const s0 = XP.dibujo.ini(p).v, s1 = XP.dibujo.sol(p).v;
          for (const v of [s0, s1]) {
            bien(p.dib(v, K), H, donde); texOk(XP.dibujo.lee({ v }, p), donde);
            assert.ok(!/NaN|undefined/.test(XP.dibujo.lee({ v }, p) + XP.dibujo.dice({ v }, p)), donde);
            assert.ok(XP.dibujo.dice({ v }, p).length <= 110, donde);
            for (const m of manijas(p)) { const [x, y] = m.en(v); assert.ok(x >= 4 && x <= 336 && y >= 4 && y <= H - 4, `${donde}: manija ${m.k} en ${x}, ${y} de ${H}`); }
          }
          // Se llega a la meta arrastrando cada manija hasta su sitio, y de() deshace en().
          let v = { ...s0 };
          for (const m of manijas(p)) {
            const ini = { ...v };
            for (let n = 1; n <= 8; n++) {   // el dedo va de a poco
              const ida = { ...v }; m.ks.forEach(k => { ida[k] = ini[k] + (s1[k] - ini[k]) * n / 8; });
              const r = [].concat(m.de(...m.en(ida), v));
              m.ks.forEach((k, j) => { v[k] = paso(r[j], m.mn[j], m.mx[j], m.ps[j]); });
            }
            m.ks.forEach(k => assert.ok(Math.abs(v[k] - s1[k]) < 1e-6, `${donde}: ${k} llega a ${v[k]}, no a ${s1[k]}`));
          }
          assert.ok(XP.dibujo.ok({ v }, p), donde);
        }
      } else if (t === 'fichas') {
        const H = e.alto || 130, N = e.slots.length;
        for (const sl of e.slots) assert.ok(sl.x - (sl.w || 56) / 2 >= -2 && sl.x + (sl.w || 56) / 2 <= 342 && sl.y - (sl.h || 42) / 2 >= -2 && sl.y + (sl.h || 42) / 2 <= H + 2, `${donde}: casillero fuera`);
        const rot = e.slots.map(sl => (sl.et ? K.t(sl.x + (sl.ex || 0), sl.y + (sl.ey ?? (sl.h || 42) / 2 + 16), sl.et, 's') : '')).join('');
        bien(rot, H, donde);
        for (const f of e.fichas) assert.ok(String(f).length * 8.6 + 18 <= 336, `${donde}: ficha ancha ${f}`);
        const caben = q => q.forEach((l, j) => { const usadas = l.filter(() => e.fijas?.[j] == null); assert.ok(l.length <= (e.slots[j].n || 1), `${donde}: casillero ${j} lleno`); usadas.forEach(f => assert.ok(e.fichas.includes(f), `${donde}: no hay ficha ${f}`)); });
        if (p.momentos) {
          let v = { ...e.v }; const q = e.slots.map((_, j) => [].concat(e.fijas?.[j] ?? []));
          for (const m of p.momentos) {
            v = { ...v, ...m.v };
            for (const j of m.saca || []) { assert.ok(j < N, donde); q[j] = []; }
            for (const [j, l] of Object.entries(m.pon || {})) { assert.ok(+j < N, `${donde}: slot ${j}`); for (const f of [].concat(l)) (e.slots[j].n || 1) === 1 ? (q[j] = [f]) : q[j].push(f); }
            caben(q);
            if (!e.repite) { const todo = q.flatMap((l, j) => (e.fijas?.[j] != null ? [] : l)), disp = [...e.fichas]; for (const f of todo) { const k = disp.indexOf(f); assert.ok(k >= 0, `${donde}: se gasta dos veces ${f}`); disp.splice(k, 1); } }
            if (e.fondo) bien(e.fondo(K, v, q), H, donde);
          }
        } else {
          const s = XP.fichas.sol(p); caben(s.q);
          if (!p.repite) { const disp = [...p.fichas]; for (const f of s.q.flatMap((l, j) => (p.fijas?.[j] != null ? [] : l))) { const k = disp.indexOf(f); assert.ok(k >= 0, `${donde}: falta ${f}`); disp.splice(k, 1); } }
          if (p.fondo) for (const q of [XP.fichas.ini(p).q, s.q]) bien(p.fondo(K, { ...p.v }, q), H, donde);
          assert.ok(XP.fichas.dice(s, p).length <= 110 && !/undefined|NaN/.test(XP.fichas.dice(s, p) + XP.fichas.lee(s, p) + XP.fichas.lee(XP.fichas.ini(p), p)), donde);
        }
      } else if (t === 'rejilla') {
        const N = e.f * e.c;
        for (let k = 0; k < N; k++) if (e.celda) assert.ok(!/undefined|NaN/.test(String(e.celda(k, Math.floor(k / e.c), k % e.c))), donde);
        if (p.momentos) for (const m of p.momentos) for (const k of [...(m.on || []), ...(m.x || []), ...(m.off || []), ...(m.luz || []), ...Object.keys(m.txt || {})]) assert.ok(+k >= 0 && +k < N, `${donde}: celda ${k}`);
        else { const s = XP.rejilla.sol(p); assert.ok(s.c.every(x => x < (p.estados || 2)), `${donde}: estado`); for (const q of [s, XP.rejilla.ini(p)]) { const d = XP.rejilla.dice(q, p); assert.ok(d.length <= 110 && !/undefined|NaN/.test(d + XP.rejilla.lee(q, p)), donde); texOk(XP.rejilla.lee(q, p), donde); } }
      } else if (t === 'casillas') {
        for (const f of p.filas) assert.ok(p.fichas.includes(f.r), `${donde}: falta ${f.r}`);
      }
    });
  });
}

test('el motor: escalones, fichas repetidas y rejilla con varios estados', () => {
  assert.equal(paso(7.4, 0, 10, 0.5), 7.5);
  assert.equal(paso(99, 0, 10, 1), 10);
  const p = { slots: [{ n: 3 }, { n: 3 }], fichas: ['A', 'A', 'B'], meta: [['A', 'B'], 'A'] };
  assert.equal(XP.fichas.ok({ q: [['B', 'A'], ['A']] }, p), true, 'el orden no importa');
  assert.equal(XP.fichas.ok({ q: [['A'], ['A']] }, p), false);
  assert.equal(XP.fichas.bandeja({ q: [['A'], []] }, p).join(), ',A,B');
  const r = { f: 2, c: 2, estados: 3, meta: { 0: 1, 3: 2 }, dados: { 1: 2 } };
  assert.equal(XP.rejilla.ok(XP.rejilla.sol(r), r), true);
  assert.equal(XP.rejilla.ini(r).c.join(), '0,2,0,0');
});
