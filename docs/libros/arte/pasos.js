// Arma los capítulos dibujados de cada lección (tex/salida/pasos/*.tex) con las escenas de escenas.mjs:
//   <id>.tex        capítulos completos: explicación cuadro por cuadro, la idea y «Tu turno» con su dibujo
//   <id>-k.tex      solo la explicación del capítulo k (mundo 1, que tiene su texto y sus «Tu turno» escritos)
//   <id>-e.tex      ejemplos resueltos y dibujados (arte/ejemplos/*.js)
//   sol-N.tex       las soluciones dibujadas de «Tu turno», para el final del libro
// Uso: node pasos.js N
const fs = require('fs'), path = require('path');
const { lecciones } = require('./lecciones');
const { tex, cuenta, entrada } = require('./texto');
const N = process.argv[2], S = path.join(__dirname, '../tex/salida'), P = path.join(S, 'pasos');
const { man, datos } = JSON.parse(fs.readFileSync(path.join(S, `escenas-${N}.json`), 'utf8'));
const M = Object.fromEntries(man.filter(m => !m.err).map(m => [m.key, m]));
fs.mkdirSync(P, { recursive: true });
const PDF = `salida/escenas-${N}.pdf`;
const ancho = (m, w) => Math.min(w, (m.hj && w > 70 ? 92 : w === 74 ? 62 : 46) * m.w / m.h);   // los dibujos altos se achican
const fig = (m, w) => `\\zesc{${PDF}}{${m.pag}}{${ancho(m, w).toFixed(1)}}`;
const alto = (m, w) => m.h * ancho(m, w) / m.w;

// En papel no se arrastra: se marca con lápiz.
const papel = s => s.replace(/\*\*Tu turno\.\*\*\s*/, '')
  .replace(/\bArrastra el (\S+) hasta que/g, 'Decide dónde queda el $1 para que').replace(/\bArrastra\b/g, 'Ubica').replace(/\barrastra\b/g, 'ubica')
  .replace(/\bToca en orden\b/g, 'Numera en orden').replace(/\bToca\b/g, 'Encierra').replace(/([,.;:] (?:y )?)toca (la|el|los|las) (casilla|factor|ficha|operación)/g, '$1encierra $2 $3')
  .replace(/\bVoltea\b/g, 'Cambia').replace(/\bMueve\b/g, 'Cambia de lugar').replace(/Cambia de lugar (los años|el reloj|la aguja|las agujas)/g, 'Mueve $1');

function cuadros(key, momentos) {   // junta los momentos que no cambian el dibujo
  const out = [];
  momentos.forEach((m, i) => {
    const q = M[`${key}-${i}`], u = out[out.length - 1], linea = { dice: m.dice, cuenta: m.cuenta };
    if (u && (!q || q.html === u.m.html)) u.l.push(linea); else if (q) out.push({ m: q, l: [linea] });
  });
  return out;
}
const lineas = l => l.map(x => `${tex(x.dice)}${x.cuenta ? `\\zcuenta{${cuenta(x.cuenta)}}` : ''}`).join('\\par\\vspace{2.5pt} ');

function tira(key, momentos, hoja) {
  if (hoja) {   // lectura: una hoja con todas las marcas y los pasos al lado
    const z = M[`${key}-z`] || M[`${key}-${momentos.length - 1}`];
    return `\\zlado{${fig(z, 78)}}{${momentos.map((m, i) => `\\zcuadrotexto{${i + 1}}{${lineas([m])}}`).join('\\vspace{4pt}\n')}}\n`;
  }
  const c = cuadros(key, momentos), out = [];
  // Un dibujo muy bajo cabe con su texto al lado; los demás van de a dos.
  if (c.length === 1) return `\\zlado{${fig(c[0].m, 78)}}{\\zcuadrotexto{1}{${lineas(c[0].l)}}}\n`;
  let i = 0;
  while (i < c.length) {
    if (i === c.length - 1) { out.push(`\\zlado{${fig(c[i].m, 78)}}{\\zcuadrotexto{${i + 1}}{${lineas(c[i].l)}}}`); i++; continue; }
    const [a, b] = [c[i], c[i + 1]], h = Math.max(alto(a.m, 78), alto(b.m, 78));
    out.push(`\\zpar{${h.toFixed(1)}}{${fig(a.m, 78)}}{\\zcuadrotexto{${i + 1}}{${lineas(a.l)}}}{${fig(b.m, 78)}}{\\zcuadrotexto{${i + 2}}{${lineas(b.l)}}}`);
    i += 2;
  }
  return out.join('\n') + '\n';
}

// de a tres, con el alto del más alto de la fila
const filas = l => l.reduce((o, c, i) => { if (i % 3) o[o.length - 1].push(c); else o.push([c]); return o; }, []).map(f => {
  const h = Math.max(...f.map(c => alto(c.z, 52))).toFixed(1);
  return f.map(c => `\\zsol{${c.nt}}{${fig(c.z, 52)}}{${c.t}}{${h}}`).join('\n') + '\\par';
}).join('\n');

const sol = [`% GENERADO por docs/libros/arte/pasos.js`];
for (const id of lecciones(N)) {
  const X = datos[id]; if (!X) { console.log('sin datos', id); continue; }
  const L = X.x, cm = id.startsWith('pu-cm-'), todo = [], solo = {}, celdas = [];
  let nt = 0;
  L.caps.forEach((cap, c) => {
    const ps = L.pasos.map((p, k) => ({ p, k })).filter(q => q.p.cap === c && q.p.tipo !== 'cierre'), parte = [];
    ps.filter(q => q.p.tipo === 'muestra').forEach(({ p, k }) => {
      parte.push(`${tex(entrada(p.texto))}\\par\n${tira(`${id}/${k}`, p.momentos, p.escena === 'hoja')}\\zidea{${tex(p.idea)}}\n`);
    });
    solo[c] = parte.join('\n');
    const turnos = ps.filter(q => q.p.tipo !== 'muestra').map(({ p, k }) => {
      const a = M[`${id}/${k}-i`], z = M[`${id}/${k}-s`], ult = c === L.caps.length - 1; nt++;
      if (z) celdas.push({ nt, z, t: tex(p.idea) });
      return `\\zturno{${nt}}{${tex(papel(p.texto))}${p.pista ? `\\par\\vspace{3pt}{\\footnotesize\\color{zmute}\\textbf{Pista.} ${tex(p.pista)}}` : ''}}{${a ? fig(a, 74) : ''}}${ult ? '' : ''}`;
    });
    todo.push(`\\capitulo{${tex(cap)}}\n${solo[c]}\n${turnos.join('\n')}`);
  });
  const ej = (X.e || []).map((e, k) => {
    const mm = e.m.map(([dice, , q]) => ({ dice, cuenta: q })), hoja = e.escena === 'hoja' || (e.de != null && (L.pasos[e.de].escena === 'hoja'));
    return `\\zejemplo{${tex(e.t)}}{${tex(e.q)}}\n${tira(`${id}/e${k}`, mm, hoja)}\\zrespuesta{${tex(e.r)}}\n`;
  }).join('\n');
  fs.writeFileSync(path.join(P, `${id}.tex`), cm ? '' : todo.join('\n\n') + '\n');
  if (cm) L.caps.forEach((_, c) => fs.writeFileSync(path.join(P, `${id}-${c + 1}.tex`), solo[c] || '%\n'));
  fs.writeFileSync(path.join(P, `${id}-e.tex`), ej || '%\n');
  if (!cm && celdas.length) sol.push(`\\zsolucionesde{${id}}\n${filas(celdas)}\n\\zsolfin`);
}
fs.writeFileSync(path.join(P, `sol-${N}.tex`), sol.join('\n') + '\n');
const nej = Object.values(datos).reduce((a, d) => a + (d.e || []).length, 0);
console.log(`libro ${N}: capítulos dibujados de ${Object.keys(datos).length} lecciones, ${nej} ejemplos dibujados`);
