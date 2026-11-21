// Preuniversitario UdeA · razonamiento lógico: las lecciones que aún no tienen video en Bunny cuentan la lección completa en sus
// escenas de respaldo (un problema al inicio que se resuelve al final, intuición, método, ejemplos con el error típico y cómo lo
// pregunta el examen). Sin preguntas al espectador y sin decir de dónde salen los problemas.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const all = [...html.matchAll(/src="(js\/[^"]+)"/g)].map(m => m[1]).filter(f => /content|games\/|courses\/|data\.js|worlds|guia|acceso/.test(f));
const ctx = loadScripts(all);
const C = get(ctx, 'COURSES').find(c => c.id === 'preuda');
// El mundo 1 (Cálculo mental) tiene su propio formato y su prueba (preuda-videos-mundo-1.test.js).
const sinVideo = C.units.filter(u => u.block === 'razonamiento' && u.world !== 'pu-calculo').flatMap(u => u.lessons).filter(l => !l.clip.bunny);

test('las lecciones de razonamiento sin video tienen de 8 a 10 escenas que cuentan la lección', () => {
  for (const l of sinVideo) {
    const s = l.clip.scenes;
    assert.ok(s.length >= 8 && s.length <= 10, `${l.id}: ${s.length} escenas`);
    assert.match(s[0].text, /^Un problema para empezar/, `${l.id}: abre con el problema`);
    assert.match(s[0].text, /Al final se sabe/, `${l.id}: el problema se anuncia como afirmación`);
    assert.ok(s.some(x => /error típico/i.test(x.text)), `${l.id}: falta el error típico`);
    assert.ok(s.some(x => /examen/i.test(x.text)), `${l.id}: falta cómo lo pregunta el examen`);
    for (const x of s) {
      assert.ok(x.title, `${l.id}: escena sin título`);
      assert.ok(!/[¿?]/.test(x.text + x.title), `${l.id}: pregunta en «${x.text.slice(0, 40)}»`);
      assert.ok(!/UdeA|admisi|taller del/i.test(x.text + x.title), `${l.id}: dice de dónde sale el problema`);
    }
  }
});
