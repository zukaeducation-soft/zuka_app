// Ejercicios de lectura en los que el texto es la escena (spec 2026-11-24-lectura-explora). Mundo 1, «Estrategias de lectura».
// Van por datos: cada lección pone su texto (`doc`), así que sirven para los demás mundos. Piezas en hoja-kit.js.
{
  const { esc, fmt, hoja, completo, cabeza, zona, zonas, toca, hilos, ordena, oraciones } = HOJA;
  const primera = (p, n) => oraciones(p, n)[0];
  const hueco = (t, rot) => esc(t).replace(/\[(\d)\]/g, (_, i) => zona(+i, rot?.[+i] || '', 'en-linea'));
  const tarjeta = (t, i, attr, dentro = '') => `<section class="hj-portada" ${attr}><h5>${esc(t[0])}</h5><p>${esc(t[1])}</p>${dentro}</section>`;

  // --------------------------------------------------------------------------------------------------------- prelectura
  // Se apuesta con los bordes; al comprobar se levanta la cortina y se enciende lo que lo prueba.
  zonas('antes-de-leer', {
    rot: (p, i) => p.rot[i],
    escena: p => `${hoja({ ...p, trozos: null }, { cls: 'cortina' })}<p class="hj-frase">${hueco(p.frase, p.rot)}</p>`,
    final: root => root.querySelector('.hj-hoja').classList.remove('cortina'),
  });
  // De cada pregunta, un hilo al borde que la responde.
  hilos('hilo-bordes', {
    destinos: () => 4, rot: (p, i) => ['título', 'autor', 'fuente', 'fecha'][i],
    escena: p => `<article class="hj-hoja hj-bordes"><h4 data-t="0" tabindex="0" role="button">${esc(p.doc.title)}</h4>${['autor', 'fuente', 'fecha'].map((k, i) => `<p data-t="${i + 1}" tabindex="0" role="button"><small>${k}</small>${esc(p.doc.ficha[k])}</p>`).join('')}</article>`,
    ayuda: 'Tira un hilo desde cada pregunta hasta el borde que la responde, o toca la pregunta y luego el borde.',
  });
  // Solo se ve el comienzo de cada párrafo; al comprobar se abren los párrafos.
  zonas('donde-mirar', {
    rot: (p, i) => `párrafo ${i + 1}`,
    escena: p => `<article class="hj-hoja velada">${cabeza(p.doc)}${p.doc.paras.map((t, i) => { const a = primera(p, i + 1), l = p.luz.find(x => x[0] === i + 1); return HOJA.parr(i + 1, `${fmt(a)} <span class="hj-velo">${HOJA.luzDe(t.slice(a.length).trim(), i + 1, l ? [l] : [])}</span>`, { antes: `<span class="hj-marg">${zona(i, '', '', `párrafo ${i + 1}`)}</span>` }); }).join('')}</article>`,
    ayuda: 'Solo se ven los comienzos. Lleva cada pregunta al margen del párrafo donde la buscarías.',
    final: root => root.querySelector('.hj-hoja').classList.remove('velada'),
  });
  // Cuatro portadas sin abrir: para qué se escribió cada texto.
  zonas('portadas', {
    rot: (p, i) => p.portadas[i][0],
    escena: p => `<div class="hj-estante">${p.portadas.map((t, i) => tarjeta(t, i, '', zona(i, 'va a…'))).join('')}</div>`,
  });
  // Una frase suelta de cada texto: de qué fuente salió.
  hilos('voz-de-la-fuente', {
    destinos: p => p.portadas.length, rot: (p, i) => p.portadas[i][0],
    escena: p => `<div class="hj-estante">${p.portadas.map((t, i) => tarjeta(t, i, `data-t="${i}" tabindex="0" role="button"`)).join('')}</div>`,
    ayuda: 'Tira un hilo desde cada frase hasta la fuente de donde salió, o toca la frase y luego la fuente.',
  });
  const suya = (p, n, T) => hoja(p, { nums: n, trozo: (k, i, t) => T(`${k}.${i}`, t) });
  const claves = p => p.nums.flatMap(n => oraciones(p, n).map((_, i) => `${n}.${i}`));
  const dicho = p => p.va.map(k => { const [n, i] = k.split('.'); return `«${oraciones(p, +n)[+i]}»`; }).join(' · ');
  toca('comprueba-apuesta', { modo: 'subraya', claves, texto: dicho, escena: (p, T) => `<p class="hj-apuesta"><small>la apuesta</small>${esc(p.apuesta)}</p>${suya(p, p.nums, T)}${completo(p.doc)}` });
  const lista = (p, T) => `<ul class="hj-lista">${p.lineas.map((t, i) => `<li>${T(i, t)}</li>`).join('')}</ul>`;
  const encoge = root => { const l = root.querySelector('.hj-lista'); l.classList.add('corta'); };
  toca('preguntas-previas', { modo: 'tacha', claves: p => p.lineas.map((_, i) => i), texto: p => `Se tachan: ${p.va.map(i => p.lineas[i]).join(' · ')}`, final: encoge,
    ayuda: 'Toca una pregunta para tacharla; otro toque la devuelve.', escena: (p, T) => `<article class="hj-hoja">${cabeza(p.doc)}</article>${lista(p, T)}` });
  ordena('orden-fuentes', { tiras: p => p.tiras, cabeza: p => `<p class="hj-apuesta"><small>lo que necesitas saber</small>${esc(p.busca)}</p>` });

  // ---------------------------------------------------------------------------------------------- idea central y mapa
  ordena('ordena-texto', { tiras: p => p.tiras, cabeza: p => `<article class="hj-hoja">${cabeza(p.doc)}</article>` });
  zonas('mapa-margen', {
    rot: (p, i) => `párrafo ${i + 1}`,
    escena: p => hoja(p, { parr: n => ({ antes: `<span class="hj-marg">${zona(n - 1, '¿qué hace?')}</span>` }) }),
    ayuda: 'Lleva cada nota al margen de su párrafo. Sobra una.',
  });
  zonas('talla-idea', {
    rot: (p, i) => p.rot[i],
    escena: p => `${hoja(p, { nums: [p.p] })}<div class="hj-tallas">${p.rot.map((t, i) => `<div class="t${i}"><small>${esc(t)}</small>${zona(i)}</div>`).join('')}</div>${completo(p.doc)}`,
  });
  toca('tacha-resumen', { modo: 'tacha', claves: p => p.lineas.map((_, i) => i), texto: p => `Queda: ${p.lineas.filter((_, i) => !p.va.includes(i)).join(' ')}`, final: encoge,
    ayuda: 'Toca una oración para tacharla; otro toque la devuelve.', escena: (p, T) => `${lista(p, T)}${completo(p.doc)}` });
  toca('subraya-tesis', { modo: 'subraya', claves, texto: dicho, escena: (p, T) => `${suya(p, p.nums, T)}${completo(p.doc)}` });
  zonas('bisagras', {
    rot: (p, i) => p.pares[i][1].slice(0, 28) + '…',
    escena: p => `<div class="hj-pares">${p.pares.map(([a, b], i) => `<p>${esc(a)} ${zona(i, '¿…?', 'en-linea')} ${esc(b)}</p>`).join('')}</div>${completo(p.doc)}`,
    ayuda: 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.',
  });
  zonas('arma-titulo', {
    rot: (p, i) => p.rot[i],
    escena: p => `<h4 class="hj-titulo">${p.rot.map((r, i) => zona(i, r, 'en-linea')).join(' ')}</h4>${hoja(p, { nums: [1, 2], cab: '' })}${completo(p.doc)}`,
    ayuda: 'Arma el título que diga la idea central. Sobran fichas.',
  });
  // El techo es la idea central: lo que la sostiene son columnas; lo demás, adornos que se caen al final.
  zonas('pilares', {
    varias: true, rot: (p, i) => ['sostiene', 'adorna'][i],
    escena: p => `<div class="hj-casa"><div class="hj-techo">${esc(p.idea)}</div><div class="hj-cols">${zona(0, 'lo que la sostiene')}</div></div><div class="hj-patio">${zona(1, 'lo que solo adorna')}</div>${completo(p.doc)}`,
    vivo: (root, p, s) => root.querySelector('.hj-casa').style.setProperty('--falta', Math.max(0, 1 - s.en.filter(z => z === 0).length / p.va.filter(z => z === 0).length)),
    final: root => root.querySelector('.hj-patio').classList.add('cae'),
    ayuda: 'Lleva cada oración: ¿sostiene la idea o solo la adorna?',
  });

  // ------------------------------------------------------------------------------------------------- tiempo y EXCEPTO
  toca('lee-la-orden', { modo: 'subraya', claves: p => p.orden.split('|').map((_, i) => i).filter(i => i % 2), texto: p => p.va.map(i => p.orden.split('|')[i]).join(' · '),
    ayuda: 'Toca un trozo para subrayarlo; otro toque lo suelta.',
    escena: (p, T) => `<article class="hj-hoja hj-orden"><p>${p.orden.split('|').map((t, i) => (i % 2 ? T(i, t) : esc(t))).join('')}</p></article>${completo(p.doc)}` });
  // EXCEPTO: cada opción busca su párrafo; la que no lo encuentra va a «no está».
  hilos('sella-parrafo', {
    destinos: p => p.doc.paras.length + 1, rot: (p, i) => (i === p.doc.paras.length ? 'no está' : `párrafo ${i + 1}`),
    escena: p => hoja(p, { parr: n => ({ attr: `data-t="${n - 1}" tabindex="0" role="button"` }) }) + `<p class="hj-no" data-t="${p.doc.paras.length}" tabindex="0" role="button">No está en el texto</p>`,
    ayuda: 'Tira un hilo desde cada opción hasta el párrafo que la prueba, o hasta «No está en el texto».',
  });
  zonas('dentro-fuera', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `<div class="hj-marco"><small>${esc(p.rot[0])}</small>${hoja(p, { nums: [p.p], cab: '' })}${zona(0, 'sí está aquí')}</div><div class="hj-dos"><div><small>${esc(p.rot[1])}</small>${zona(1)}</div><div><small>${esc(p.rot[2])}</small>${zona(2)}</div></div>${completo(p.doc)}`,
  });
  zonas('dice-deduce', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `${hoja(p, { nums: p.nums })}<div class="hj-escalera">${p.rot.map((t, i) => `<div class="e${i}"><small>${esc(t)}</small>${zona(i)}</div>`).join('')}</div>${completo(p.doc)}`,
  });
  // Cada opción falsa cae cuando se ata a la oración que la desmiente; queda en pie la respuesta.
  hilos('descarta-prueba', {
    destinos: p => p.nums.reduce((n, k) => n + oraciones(p, k).length, 0), rot: (p, i) => `«${p.nums.flatMap(n => oraciones(p, n))[i].split(' ').slice(0, 7).join(' ')}…»`,
    escena: p => { let k = 0; return `${hoja(p, { nums: p.nums, trozo: (n, i, t) => `<span class="hj-t2" data-t="${k++}" tabindex="0" role="button">${fmt(t)}</span>` })}<p class="hj-queda"><small>${esc(p.pregunta)}</small><span>${esc(p.queda)}</span></p>`; },
    ayuda: 'Tira un hilo desde cada opción falsa hasta la oración que la desmiente.',
    final: root => root.querySelector('.hj-queda').classList.add('on'),
  });
  XG.conPerillas('reparte-tiempo', {
    campos: p => [{ k: 'l', et: 'leer', min: 0, max: 12, ini: 1, lee: v => `${v} min` }, { k: 'q', et: 'responder', min: 0, max: 18, ini: 4, lee: v => `${v} min` }],
    listo: s => s.l !== 1 || s.q !== 4, ok: (s, p) => s.l >= p.leer && s.q >= p.resp && s.l + s.q <= p.total - p.rep,
    sol: p => ({ l: p.leer, q: p.total - p.rep - p.leer }), texto: p => `leer ${p.leer}, responder ${p.total - p.rep - p.leer} y repasar ${p.rep} (minutos)`, alto: 150, ms: 1500,
    quieta: p => XPK.r(24, 60, 292, 44, 'fn', 8) + XPK.t(170, 40, `${p.total} minutos`, 's ta') + Array.from({ length: p.total + 1 }, (_, k) => XPK.l(24 + 292 * k / p.total, 108, 24 + 292 * k / p.total, k % 5 ? 113 : 118, 'lm') + (k % 5 ? '' : XPK.t(24 + 292 * k / p.total, 134, k, 's tm'))).join(''),
    cuadro(s, p, f) {
      const X = m => 24 + 292 * Math.min(p.total * 1.06, m) / p.total, t = f * p.total, tr = (a, b, cls, et) => (t > a && b > a ? XPK.r(X(a), 60, X(Math.min(b, t)) - X(a), 44, cls, 6) + (t >= b && X(b) - X(a) > 46 ? XPK.t((X(a) + X(b)) / 2, 87, et, 's') : '') : '');
      return GAMES['reparte-tiempo'].quieta(p) + tr(0, s.l, 'fa', 'leer') + tr(s.l, s.l + s.q, 'fg', 'responder') + tr(s.l + s.q, p.total, 'fA', 'repasar') + (s.l + s.q > p.total && f === 1 ? XPK.t(316, 50, 'no cabe', 's ta', 'end') : '');
    },
    aviso: (s, p) => (s.l + s.q > p.total - p.rep ? `Minutos que sobran para repasar: ${Math.max(0, p.total - s.l - s.q)}. No alcanza para volver a las marcadas.` : s.l < p.leer ? 'Con tan poca lectura tocaría releer en cada pregunta.' : 'A las preguntas les falta tiempo: se responderían sin volver al texto.'),
    bien: (s, p) => `Quedan ${p.total - s.l - s.q} min para volver a las marcadas.`,
  });
  ordena('ruta-preguntas', { tiras: p => p.tiras });
}
