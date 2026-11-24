// Preuniversitario · pu-pb-1 «Espacio muestral y Laplace» (Explora). Los ejemplos no son los de los ejercicios.
{
  const caras = (v, K) => [1, 2, 3, 4, 5, 6].map(n => K.r(26 + (n - 1) * 49, 60, 42, 42, v.s.includes(n) ? 'fA' : 'fc', 9) + K.t(47 + (n - 1) * 49, 88, n, v.s.includes(n) ? 'b tc' : 'b')).join('') + K.t(170, 32, v.p || '', 'ta');
  // Urna con r rojas (naranja) y a azules (verde).
  const urna = (v, K) => { const r = v.r, a = Math.round(v.a), n = r + a; let h = K.r(50, 20, 240, 130, 'fn', 18); for (let i = 0; i < n; i++) h += K.c(78 + (i % 7) * 31, 134 - Math.floor(i / 7) * 32, 13, i < r ? 'fF' : 'fA'); return h; };
  const escala = (v, K) => K.l(30, 90, 310, 90, 'gr') + [['0', 30], ['1/2', 170], ['1', 310]].map(([t, x]) => K.l(x, 84, x, 96) + K.t(x, 116, t, '')).join('') + K.t(30, 60, 'imposible', 's tm') + K.t(310, 60, 'seguro', 's tm') + K.f(v.f, K.c(30 + v.x * 280, 90, 9, 'fA') + K.t(Math.max(60, Math.min(285, 30 + v.x * 280)), 40, v.t || '', 'ta'));
  const D = { f: 6, c: 6, filas: ['1', '2', '3', '4', '5', '6'], cols: ['1', '2', '3', '4', '5', '6'], izq: 30, cw: 42, ch: 32 }, sum = { ...D, celda: (i, r, c) => String(r + c + 2) };
  const con = f => Array.from({ length: 36 }, (_, i) => i).filter(i => f(Math.floor(i / 6) + 1, i % 6 + 1));

  xpLec('pu-pb-1', [
    ['Favorables sobre posibles',
      xpMira('dibujo', 'Empecemos por la idea: la probabilidad es una **fracción** de los casos.', { dib: caras, v: { s: [], p: '' }, alto: 125 }, [
        ['Un dado tiene seis resultados posibles, todos igual de fáciles.', {}, '$6 \\text{ posibles}$'],
        ['¿Probabilidad de sacar más de 2? Sirven 3, 4, 5 y 6: cuatro casos.', { s: [3, 4, 5, 6], p: 'más de 2' }],
        ['Cuatro de seis: dos tercios.', {}, '$P = \\tfrac46 = \\tfrac23$'],
        ['¿Y de sacar un 5? Un caso de seis.', { s: [5], p: 'un 5' }, '$P = \\tfrac16$'],
        ['Favorables arriba, posibles abajo. Vale si todos los casos son igual de fáciles.', {}],
      ], '$P = \\tfrac{\\text{casos favorables}}{\\text{casos posibles}}$, con casos igual de fáciles.'),
      xpHaz('dibujo', 'Una urna tiene 5 bolas naranjas. Echa verdes hasta que sacar naranja tenga probabilidad un tercio.', { dib: urna, v: { r: 5, a: 2 }, metas: { a: 10 }, alto: 205, manijas: [{ k: 'a', min: 0, max: 16, paso: 1, et: 'verdes' }],
        lee: v => `$P(\\text{naranja}) = \\tfrac{5}{${5 + v.a}}$`, dice: v => `Hay ${5 + v.a} bolas y 5 son naranjas.` }, 'Un tercio: 5 de 15, así que hacen falta 10 verdes.')],
    ['Dos dados: la tabla',
      xpMira('rejilla', 'Segunda idea: con dos dados los casos son **36 parejas**.', sum, [
        ['La fila es un dado y la columna, el otro. Cada casilla dice la suma.', {}, '$6 \\cdot 6 = 36$'],
        ['La suma 7 sale en seis casillas.', { on: con((a, b) => a + b === 7) }, '$P(7) = \\tfrac{6}{36} = \\tfrac16$'],
        ['La suma 12 sale en una sola: 6 y 6.', { luz: con((a, b) => a + b === 12) }, '$P(12) = \\tfrac{1}{36}$'],
        ['Por eso 7 es la suma más fácil: hay más maneras de lograrla.', {}],
        ['Ojo: 3 y 4 no es la misma casilla que 4 y 3. Son dos casos.', { luz: [15, 20] }],
      ], 'Dos dados: 36 parejas ordenadas. No todas las sumas son igual de probables.'),
      xpHaz('rejilla', 'Pinta los resultados en que la suma es 5.', { ...D, meta: con((a, b) => a + b === 5), lee: c => `$\\tfrac{${c.filter(x => x).length}}{36}$`, dice: () => 'La fila es el primer dado; la columna, el segundo.' }, '1+4, 2+3, 3+2 y 4+1: $\\tfrac{4}{36} = \\tfrac19$.')],
    ['De imposible a seguro',
      xpMira('dibujo', 'Tercera idea: toda probabilidad está **entre 0 y 1**.', { dib: escala, v: { x: 0, f: 0, t: '' }, alto: 130 }, [
        ['Cero es imposible: sacar un 7 con un dado corriente.', { f: 1, t: 'un 7' }, '$P = \\tfrac06 = 0$'],
        ['Uno es seguro: sacar un número menor que 7.', { x: 1, t: 'menor que 7' }, '$P = \\tfrac66 = 1$'],
        ['Un medio es tan fácil como difícil: sacar par.', { x: 0.5, t: 'par' }, '$P = \\tfrac36 = \\tfrac12$'],
        ['Sacar más de 1 está muy cerca de lo seguro.', { x: 5 / 6, t: 'más de 1' }, '$P = \\tfrac56$'],
        ['Si al hacer la cuenta te da más de 1, algo quedó mal.', {}],
      ], '0 es imposible, 1 es seguro, y ninguna probabilidad pasa de 1.'),
      xpHaz('fichas', 'Se saca una ficha al azar de A, B, C, D. Pon la probabilidad de cada cosa.', { slots: [{ x: 66, y: 58, w: 90, et: 'que sea Z' }, { x: 170, y: 58, w: 90, et: 'que sea B' }, { x: 274, y: 58, w: 90, et: 'una letra' }], fichas: ['0', '1/4', '1', '1/2', '4'], meta: ['0', '1/4', '1'], alto: 106, pista: 'No hay Z; hay una B entre cuatro; todas son letras.' }, 'Imposible 0, una de cuatro $\\tfrac14$, y seguro 1.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Se saca una tarjeta del 1 al 12. Pinta las favorables a «sale un número **primo**».', { f: 3, c: 4, cw: 56, ch: 44, celda: i => String(i + 1), meta: [1, 2, 4, 6, 10], lee: c => `$P = \\tfrac{${c.filter(x => x).length}}{12}$`, dice: c => (c[0] ? 'El 1 no es primo.' : c[8] ? 'El 9 es 3 por 3.' : 'Primo: solo lo dividen 1 y él mismo.') }, '2, 3, 5, 7 y 11: $\\tfrac{5}{12}$.')],
  ], 'Favorables sobre posibles, 36 parejas con dos dados, y siempre entre 0 y 1.');
}
