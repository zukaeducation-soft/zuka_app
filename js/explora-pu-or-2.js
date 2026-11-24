// Preuniversitario · pu-or-2 «Orden circular» (Explora, escenas «fichas» y «dibujo»). Los ejemplos no son los de los ejercicios.
{
  // n sillas en el sentido del reloj, la 1 arriba.
  const mesa = (n, cy = 108, r = 78, w = 62) => Array.from({ length: n }, (_, i) => { const [x, y] = XPK.at(170, cy, r * 1.0, 90 - i * 360 / n); return { x: 170 + (x - 170) * 1.35, y, w, h: 38 }; });
  const tabla = (n, cy = 108) => (K, v) => K.c(170, cy, 42, 'fc') + K.arc(170, cy, 30, 60, -60, 'lm') + K.ar(...K.at(170, cy, 30, -50), ...K.at(170, cy, 30, -62), 'lm') + (v.p ? K.t(170, cy + 5, v.p, 's ta') : '');
  // Anillo numerado con un señalador.
  const anillo = (v, K) => {
    const n = v.n, cy = 110; let h = K.c(170, cy, 92, 'fn');
    const c = ((Math.round(v.k) - 1) % n + n) % n + 1;
    for (let i = 1; i <= n; i++) { const [x, y] = K.at(170, cy, 92, 90 - (i - 1) * 360 / n); h += K.c(x, y, 15, i === c ? 'fA' : i === v.de ? 'fg' : 'fc') + K.t(x, y + 5, i, i === c ? 'tc' : ''); }
    const a0 = 90 - (v.de - 1) * 360 / n, a1 = 90 - (v.k - 1) * 360 / n;
    if (Math.abs(v.k - v.de) > 0.05) { const t = Math.max(a1, a0 - 359); h += K.arc(170, cy, 60, a0, t, 'la gr') + K.ar(...K.at(170, cy, 60, t + 4), ...K.at(170, cy, 60, t), 'la gr'); }
    return h + K.t(170, cy + 6, `${Math.round(v.k - v.de)} ${Math.round(v.k - v.de) === 1 ? 'paso' : 'pasos'}`, 'ta');
  };
  const pie = (...l) => (K, y) => l.map((t, i) => K.t(170, y + i * 17, t, 's')).join('');

  xpLec('pu-or-2', [
    ['Fija a uno',
      xpMira('fichas', 'Empecemos por la idea: en una mesa redonda, **girar a todos** no cambia nada.', { slots: mesa(4), fichas: ['Ana', 'Beto', 'Caro', 'Dani'], alto: 220, fondo: tabla(4) }, [
        ['Cuatro amigos en una mesa redonda. Se leen en el sentido del reloj: Ana, Beto, Caro, Dani.', { pon: { 0: 'Ana', 1: 'Beto', 2: 'Caro', 3: 'Dani' } }],
        ['Si todos corren un puesto, cada uno conserva sus vecinos: es la misma mesa.', { saca: [0, 1, 2, 3], pon: { 1: 'Ana', 2: 'Beto', 3: 'Caro', 0: 'Dani' } }],
        ['Por eso se fija a uno, el que quieras, y los demás se ubican respecto a él.', { saca: [0, 1, 2, 3], pon: { 0: 'Ana' }, marca: [0] }],
        ['Beto sigue a Ana en el sentido del reloj: su puesto queda decidido.', { pon: { 1: 'Beto' } }],
        ['Caro frente a Ana: al otro lado de la mesa. Dani va en el puesto que queda.', { pon: { 2: 'Caro', 3: 'Dani' } }],
      ], 'En círculo, fija a una persona: girar la mesa no crea un acomodo nuevo.'),
      xpHaz('fichas', 'Lía ya está sentada. Sienta a los demás; «sigue» es en el sentido del reloj.', { slots: mesa(4), fijas: { 0: 'Lía' }, fichas: ['Marta', 'Nico', 'Pol'], meta: ['Lía', 'Marta', 'Nico', 'Pol'], alto: 250,
        fondo: (K, v) => tabla(4)(K, v) + pie('Nico está frente a Lía.', 'Marta sigue a Lía.')(K, 226), pista: 'Frente a Lía es el puesto de abajo.' }, 'Con Lía fija: Nico enfrente, Marta le sigue y Pol toma el otro lado.')],
    ['Frente a frente',
      xpMira('fichas', 'Segunda idea: «frente a» es **media mesa** de distancia.', { slots: mesa(6, 112, 84, 58), fichas: ['Eva', 'Flor', 'Gus', 'Hugo', 'Inés', 'Juan'], alto: 222, fondo: tabla(6, 112) }, [
        ['Seis sillas. Fijamos a Eva arriba.', { pon: { 0: 'Eva' } }],
        ['Frente a Eva está Hugo: se cuentan tres sillas, la mitad de seis. Da igual por qué lado.', { pon: { 3: 'Hugo' }, marca: [0, 3] }],
        ['«Gus está entre Flor y Hugo»: Gus es vecino de Hugo, y Flor sigue después.', {}],
        ['Puede ser por un lado o por el otro. Si además Flor sigue a Eva en el reloj, es por la derecha.', { pon: { 1: 'Flor', 2: 'Gus' } }],
        ['Quedan dos sillas. Con «Inés junto a Hugo», todos tienen lugar.', { pon: { 4: 'Inés', 5: 'Juan' } }],
      ], 'Con un número par de sillas, «frente a» es avanzar la mitad de ellas.'),
      xpHaz('fichas', 'Sienta a los cinco que faltan; «sigue» es en el sentido del reloj.', { slots: mesa(6, 108, 84, 58), fijas: { 0: 'Paz' }, fichas: ['Raúl', 'Inés', 'Toño', 'Vera', 'Beto'], meta: ['Paz', 'Inés', 'Beto', 'Raúl', 'Toño', 'Vera'], alto: 282,
        fondo: (K, v) => tabla(6, 108)(K, v) + pie('Raúl está frente a Paz. Inés sigue a Paz.', 'Beto está entre Inés y Raúl.', 'Toño es vecino de Raúl.')(K, 236), pista: 'Empieza por Raúl, frente a Paz: a tres sillas.' }, 'Raúl a media mesa, Inés después de Paz, Beto entre ellos, Toño al otro lado de Raúl y Vera donde queda.')],
    ['Dar la vuelta contando',
      xpMira('dibujo', 'Tercera idea: al contar en ronda, después del último **vuelve** el primero.', { dib: anillo, v: { n: 7, de: 5, k: 5 }, alto: 222 }, [
        ['Siete sillas numeradas en el sentido del reloj. Estamos en la 5.', {}],
        ['Avanzamos dos: llegamos a la 7, la última.', { k: 7 }, '$5 + 2 = 7$'],
        ['Un paso más y no hay silla 8: volvemos a la 1.', { k: 8 }, '$5 + 3 = 8 \\to 8 - 7 = 1$'],
        ['Avanzar 4 desde la 5 da 9, que se pasa por 2: es la silla 2.', { k: 9 }, '$5 + 4 = 9 \\to 9 - 7 = 2$'],
        ['Atajo: suma y, si te pasas, réstale el número de sillas.', {}, '$9 - 7 = 2$'],
      ], 'Contando en ronda: suma los pasos y, si te pasas, resta el número de sillas.'),
      xpHaz('dibujo', 'Hay 9 sillas. Desde la 7, arrastra el señalador 5 pasos en el sentido del reloj.', { dib: anillo, v: { n: 9, de: 7, k: 7 }, metas: { k: 12 }, alto: 225,
        manijas: [{ k: 'k', min: 7, max: 15, paso: 1, r: 13, rot: v => String((v.k - 1) % 9 + 1), en: v => XPK.at(170, 110, 92, 90 - (v.k - 1) * 40), de: (x, y, v) => { const a = 90 - Math.atan2(110 - y, x - 170) * 180 / Math.PI, k = (a / 40 + 1); return v.k + ((((k - v.k) % 9) + 13.5) % 9) - 4.5; } }],
        lee: v => `$7 + ${v.k - 7} = ${v.k}${v.k > 9 ? ` \\to ${v.k} - 9 = ${v.k - 9}` : ''}$`, dice: v => (v.k > 9 ? 'Pasaste la 9: se vuelve a contar desde la 1.' : 'Aún no das la vuelta.') }, '$7 + 5 = 12$ y $12 - 9 = 3$: la silla 3.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Cinco materas rodean una fuente. La rosa ya está. Ubica las demás; «sigue» es en el sentido del reloj.', { slots: mesa(5, 108, 84, 66), fijas: { 0: 'rosa' }, fichas: ['lirio', 'clavel', 'dalia', 'girasol'], meta: ['rosa', 'clavel', 'dalia', 'lirio', 'girasol'], alto: 280,
        fondo: (K, v) => tabla(5, 108)(K, v) + pie('El clavel sigue a la rosa.', 'La dalia es vecina del clavel.', 'El lirio no es vecino de la rosa.')(K, 232), pista: 'La rosa tiene dos vecinos: uno es el clavel. El lirio no puede ser el otro.' }, 'Clavel tras la rosa, dalia tras el clavel; el lirio no toca a la rosa, así que el girasol queda a su lado.')],
  ], 'Fijar a uno, «frente a» como media mesa, y dar la vuelta cuando se acaban las sillas.');
}
