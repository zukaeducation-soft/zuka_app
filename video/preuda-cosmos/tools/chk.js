// node video/preuda-cosmos/tools/chk.js <película…>: lista todo lo que la prueba rechazaría en el guion.
for (const f of process.argv.slice(2)) {
  const D = require(require('path').join(__dirname, '..', 'films', f + '.data.js'));
  if (D.DUR < 240 || D.DUR > 300) console.log(f, 'DUR', D.DUR);
  for (const s of D.SCENES) {
    if (s.name.length > 30) console.log(f, s.id, 'NAME', s.name.length);
    s.caps.forEach(([a, b, ti, su], i) => { if (ti.length > 36) console.log(f, s.id, 'TITLE', ti.length, ti); if (su.length > 58) console.log(f, s.id, 'SUB', su.length, su); if (a < .5 || b > s.dur - .4 || b - a < 5) console.log(f, s.id, 'TIME', a, b); });
    for (const [a, b, x] of s.narr) { const r = x.split(/\s+/).length / (b - a); if (r > 3.4) console.log(f, s.id, 'RATE', r.toFixed(2), x.split(/\s+/).length, 'palabras; máx', Math.floor(3.4 * (b - a)), '·', x.slice(0, 60)); }
    if (/[¿?]/.test(JSON.stringify([s.caps, s.narr]))) console.log(f, s.id, 'PREGUNTA');
  }
}
