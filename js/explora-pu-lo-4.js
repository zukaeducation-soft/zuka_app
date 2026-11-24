// Preuniversitario · pu-lo-4 «Cuantificadores y silogismos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const cir = (K, x, y, r, cls, t, ty) => K.c(x, y, r, cls) + K.t(x, y + (ty ?? 5), t, cls === 'fa' ? 'ta' : cls === 'fg' ? 'tg' : 'tf');
  const dos = (v, K) => cir(K, v.bx, v.by, v.br, 'fg', v.tb, -v.br + 22) + cir(K, v.ax, v.ay, v.ar, 'fa', v.ta, v.arriba ? -v.ar - 7 : v.ar > 40 ? -v.ar + 22 : 5) + K.f(v.x ?? 0, K.c(v.px ?? 170, v.py ?? 100, 7, 'fF')) + K.t(170, 196, v.t || '', '');
  const tres = (v, K) => cir(K, 130, 100, 86, 'fg', v.tb, -62) + cir(K, 118, 116, 42, 'fa', v.ta) + cir(K, v.cx, v.cy, v.cr, 'ff', v.tc, v.arriba ? -v.cr - 7 : 5);
  const rel = (v, ar, bx, by, br) => { const d = Math.hypot(v.x - bx, v.y - by); return d <= br - ar ? 'dentro' : d >= br + ar ? 'fuera' : 'cruza'; };
  const mano = { k: ['x', 'y'], min: [40, 56], max: [300, 160], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] };
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];
  const base = { bx: 210, by: 100, br: 78, ax: 60, ay: 100, ar: 34, ta: 'A', tb: 'B' };

  xpLec('pu-lo-4', [
    ['Todos y ninguno',
      xpMira('dibujo', 'Empecemos por la idea: cada frase con «todos» o «ningún» es un **dibujo de círculos**.', { dib: dos, v: { ...base, ta: 'loros', tb: 'aves', t: '', x: 0, px: 258, py: 110 }, alto: 206 }, [
        ['«Todos los loros son aves»: el círculo de los loros va dentro del de las aves.', { ax: 200, ay: 110 }],
        ['No dice que todas las aves sean loros: hay espacio de sobra.', { x: 1, px: 258, py: 110 }],
        ['«Ningún pez es ave»: los círculos no se tocan.', { x: 0, ta: 'peces', ax: 62, ay: 100 }],
        ['«Ningún» se puede voltear: ningún ave es pez. Con «todos» no se puede.', {}],
      ], '«Todos los A son B»: A dentro de B. «Ningún A es B»: separados.'),
      xpHaz('dibujo', '«**Todas** las guitarras son instrumentos». Lleva el círculo de las guitarras a su sitio.', { dib: (v, K) => dos({ ...base, arriba: 1, ta: 'guitarras', tb: 'instrumentos', ax: v.x, ay: v.y }, K), v: { x: 80, y: 60 }, cumple: v => rel(v, 34, 210, 100, 78) === 'dentro', sol: { x: 210, y: 116 }, alto: 206, manijas: [mano], lee: () => '', dice: v => ({ dentro: 'Ninguna guitarra queda por fuera.', fuera: 'Así, ninguna guitarra sería instrumento.', cruza: 'Así, unas guitarras no serían instrumentos.' }[rel(v, 34, 210, 100, 78)]) }, 'Todas dentro: cada guitarra está en el círculo de los instrumentos.')],
    ['Algunos',
      xpMira('dibujo', 'Segunda idea: «**algunos**» quiere decir al menos uno en los dos.', { dib: dos, v: { ...base, ar: 60, br: 70, ax: 70, ta: 'músicos', tb: 'zurdos', t: '', x: 0, px: 165, py: 104 }, alto: 206 }, [
        ['«Algunos músicos son zurdos»: los círculos se cruzan.', { ax: 130 }],
        ['En la parte común hay al menos uno.', { x: 1, px: 165, py: 104 }],
        ['No dice que haya músicos que no sean zurdos: de esa zona no se sabe nada.', {}],
        ['Y se puede voltear: si algún músico es zurdo, algún zurdo es músico.', {}],
        ['«Algunos músicos no son zurdos» pone el punto en la otra parte.', { px: 100, py: 104 }],
      ], '«Algunos A son B»: hay al menos uno en la parte común. Se puede voltear.'),
      xpHaz('dibujo', '«**Algunos** bailarines son ingenieros, pero **no todos**». Acomoda el círculo.', { dib: (v, K) => dos({ ...base, arriba: 1, ar: 50, ta: 'bailarines', tb: 'ingenieros', ax: v.x, ay: v.y }, K), v: { x: 56, y: 80 }, cumple: v => rel(v, 50, 210, 100, 78) === 'cruza', sol: { x: 134, y: 100 }, alto: 206, manijas: [{ ...mano, min: [56, 72], max: [284, 150] }], lee: () => '', dice: v => ({ dentro: 'Así serían todos.', fuera: 'Así no sería ninguno.', cruza: 'Unos adentro y otros afuera.' }[rel(v, 50, 210, 100, 78)]) }, 'Se cruzan: unos quedan adentro y otros por fuera.')],
    ['Encadenar frases',
      xpMira('dibujo', 'Tercera idea: un **silogismo** une dos frases por el círculo que comparten.', { dib: tres, v: { ta: 'loros', tb: 'aves', tc: '', cx: 276, cy: 110, cr: 0 }, alto: 206 }, [
        ['«Todos los loros son aves» y «ninguna ave es mamífero». El círculo común es el de las aves.', {}],
        ['Los mamíferos quedan afuera de las aves.', { tc: 'mamíf.', cr: 44 }],
        ['Entonces también quedan afuera de los loros: ningún loro es mamífero.', {}],
        ['¿Y si los mamíferos tocaran a los loros? Tendrían que entrar en las aves, y eso no se puede.', { cx: 276 }],
        ['Una conclusión es segura si se cumple en **todos** los dibujos posibles.', {}],
      ], 'Dibuja las premisas. Una conclusión vale si sale en todos los dibujos posibles.'),
      xpHaz('dibujo', '«Todos los gatos son felinos» y «ningún felino es reptil». Pon los reptiles donde deben ir.', { dib: (v, K) => tres({ arriba: 1, ta: 'gatos', tb: 'felinos', tc: 'reptiles', cx: v.x, cy: v.y, cr: 36 }, K), v: { x: 190, y: 70 }, cumple: v => rel(v, 36, 130, 100, 86) === 'fuera', sol: { x: 288, y: 100 }, alto: 206, manijas: [mano], lee: () => '', dice: v => (rel(v, 36, 130, 100, 86) === 'fuera' ? 'Afuera de los felinos, y por eso afuera de los gatos.' : 'Todavía toca a los felinos.') }, 'Afuera de los felinos: entonces ningún gato es reptil.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A: pianistas, M: músicos, Z: zurdos. Todos los A son M. Algunos M son Z. ¿Qué es seguro?', { slots: Z('seguro', 'no es seguro'), fichas: ['algún Z es M', 'algún A es Z', 'todo M es A', 'sin M no hay A'], meta: [['algún Z es M', 'sin M no hay A'], ['algún A es Z', 'todo M es A']], alto: 138, pista: 'Los zurdos pueden cruzarse con los músicos sin tocar a los pianistas.' }, '«Algunos» se voltea y A está dentro de M; pero los zurdos podrían no tocar a los pianistas.')],
  ], 'Círculos dentro, separados o cruzados, y conclusiones que valen en todos los dibujos.');
}
