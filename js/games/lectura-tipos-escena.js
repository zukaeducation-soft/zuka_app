// Ejercicios de lectura sobre la hoja · mundo 2, «Tipos de texto y géneros» (spec 2026-11-24-lectura-explora). Van por datos.
{
  const { esc, fmt, hoja, completo, zona, zonas, toca, hilos, ordena, pinta, oraciones } = HOJA;
  const lineas = (p, T) => `<article class="hj-hoja hj-lineas">${p.lineas.map((t, i) => T(i, t)).join('')}</article>`;
  const cajas = p => `<div class="hj-dos alto">${p.rot.map((t, i) => `<div><small>${esc(t)}</small>${zona(i, '', '', t)}</div>`).join('')}</div>`;
  const doc = p => (p.doc?.paras ? completo(p.docs || p.doc) : '');

  // Marcadores de colores: cada oración se pinta con lo que hace o con quién habla.
  for (const n of ['pinta-tipos', 'pinta-voces', 'pinta-preguntas']) pinta(n, { escena: (p, T) => lineas(p, T) + doc(p) });

  // La pista se ata a la oración que la tiene.
  const atada = p => `<article class="hj-hoja hj-lineas">${p.lineas.map((t, i) => `<p class="hj-linea" data-t="${i}" tabindex="0" role="button">${fmt(t)}</p>`).join('')}</article>${doc(p)}`;
  const corta = t => (t.length > 46 ? `«${t.split(' ').slice(0, 6).join(' ')}…»` : `«${t}»`);
  hilos('pista-tipo', { destinos: p => p.lineas.length, rot: (p, i) => corta(p.lineas[i]), escena: atada, ayuda: 'Tira un hilo desde cada pista hasta la oración donde está.' });
  hilos('pieza-argumento', { destinos: p => p.lineas.length, rot: (p, i) => corta(p.lineas[i]), escena: atada, ayuda: 'Tira un hilo desde cada pieza hasta la oración que cumple ese papel.' });

  // La misma idea, escrita con otro propósito.
  zonas('cambia-tipo', {
    rot: (p, i) => p.rot[i],
    escena: p => `<p class="hj-apuesta"><small>${esc(p.de)}</small>${esc(p.antes)}</p><p class="hj-frase">${esc(p.frase).replace(/\[(\d)\]/g, (_, i) => zona(+i, p.rot[+i], 'en-linea'))}</p>`,
    ayuda: 'Llena los huecos de la oración nueva. Sobran fichas.',
  });
  zonas('todo-o-parte', { varias: true, rot: (p, i) => p.rot[i], escena: p => cajas(p) + doc(p) });
  zonas('genero-o-cita', { varias: true, rot: (p, i) => p.rot[i], escena: p => cajas(p) + doc(p) });
  ordena('pasos-del-proceso', { tiras: p => p.tiras, cabeza: p => `<p class="hj-apuesta"><small>${esc(p.que)}</small>${esc(p.de)}</p>` });

  // Signos y referentes: el hilo llega al lugar exacto del texto. `texto` va en trozos con «|»; los impares se pueden tocar.
  const trozos = p => p.texto.split('|');
  const pieza = p => `<article class="hj-hoja"><p class="hj-frase corta">${trozos(p).map((t, i) => (i % 2 ? `<span class="hj-t2" data-t="${(i - 1) / 2}" tabindex="0" role="button">${esc(t)}</span>` : esc(t))).join('')}</p></article>${doc(p)}`;
  const rotPieza = (p, i) => `«${trozos(p)[2 * i + 1].trim()}»`, cuantas = p => (trozos(p).length - 1) / 2;
  hilos('signo-oficio', { destinos: cuantas, rot: rotPieza, escena: pieza, ayuda: 'Tira un hilo desde cada oficio hasta el signo que lo hace.' });
  hilos('tira-referente', { destinos: cuantas, rot: rotPieza, escena: pieza, ayuda: 'Tira un hilo desde cada palabra hasta aquello a lo que apunta.' });

  // La vida que se cuenta: antes, el momento del cambio y después.
  zonas('linea-vida', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `<div class="hj-vida">${p.rot.map((t, i) => `<div><i></i><small>${esc(t)}</small>${zona(i, '', '', t)}</div>`).join('')}</div>${doc(p)}`,
    ayuda: 'Lleva cada ficha a su lugar de la línea.',
  });
  const suya = (p, T) => hoja(p, { nums: p.nums, trozo: (k, i, t) => T(`${k}.${i}`, t) });
  toca('subraya-rasgo', { modo: 'subraya', claves: p => p.nums.flatMap(n => oraciones(p, n).map((_, i) => `${n}.${i}`)), texto: p => p.va.map(k => { const [n, i] = k.split('.'); return `«${oraciones(p, +n)[+i]}»`; }).join(' · '), escena: (p, T) => suya(p, T) + doc(p) });
}
