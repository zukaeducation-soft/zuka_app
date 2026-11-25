// Ejercicios de lectura sobre la hoja · mundo 3, «Información explícita» (spec 2026-11-24-lectura-explora). Van por datos.
{
  const { esc, completo, zona, zonas, regla } = HOJA;
  // Paráfrasis: la perilla recorre palabras que miden hasta que la oración dice lo mismo que el texto.
  regla('ajusta-alcance', { tras: p => completo(p.docs || p.doc, p.luz) });
  // La palabra tachada se cambia por otra que dice lo mismo en esa oración.
  zonas('cambia-palabra', {
    rot: (p, i) => `«${p.frases[i][2]}»`,
    escena: p => `<div class="hj-pares">${p.frases.map(([n, a, w, b], i) => `<p><small>párrafo ${n}</small>${esc(a)}<s>${esc(w)}</s> ${zona(i, '¿…?', 'en-linea', `en vez de ${w}`)}${esc(b)}</p>`).join('')}</div>${completo(p.docs || p.doc)}`,
    ayuda: 'Pon cada ficha en vez de la palabra tachada.',
  });
}
