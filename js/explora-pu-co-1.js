// Preuniversitario · pu-co-1 «Principio multiplicativo y árboles» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Árbol de dos niveles: a ramas y, en cada una, b.
  const arbol = (v, K) => {
    const a = v.A, b = Math.round(v.b), y0 = 24, H = 170, cls = ['fa', 'fg', 'ff', 'fo']; let h = K.c(34, 110, 6, 'fk');
    for (let i = 0; i < a; i++) {
      const y = y0 + (i + 0.5) * H / a;
      h += K.f(v.n1, K.l(34, 110, 96, y, 'lm') + K.r(96, y - 12, 62, 24, cls[i], 8) + K.t(127, y + 5, v.e1[i], 's'));
      for (let j = 0; j < b; j++) { const yy = y + (j - (b - 1) / 2) * (H / a / b); h += K.f(v.n2, K.l(158, y, 218, yy, 'lm') + K.r(218, yy - 11, 84, 22, cls[i], 8) + K.t(260, yy + 4, v.e2[j], 's')); }
    }
    return h + K.f(v.n2, K.t(322, 114, a * b, 'b ta'));
  };
  const casa = (xs, y, et) => xs.map((x, i) => ({ x, y, w: 64, et: et[i] }));
  // Cuadrícula a × n: cada casilla, una combinación.
  const cuad = (v, K) => {
    const n = Math.round(v.n), u = Math.min(30, 240 / Math.max(n, 1)); let h = '';
    for (let i = 0; i < 4; i++) for (let j = 0; j < n; j++) h += K.r(70 + j * u + 1, 30 + i * 30 + 1, u - 2, 28, ['fa', 'fg', 'ff', 'fo'][i]);
    return h + ['coco', 'mora', 'uva', 'café'].map((t, i) => K.t(60, 50 + i * 30, t, 's', 'end')).join('') + K.t(70 + n * u / 2, 22, `${n} ${n === 1 ? 'salsa' : 'salsas'}`, 'tg');
  };

  xpLec('pu-co-1', [
    ['El árbol de opciones',
      xpMira('dibujo', 'Empecemos por la idea: cada decisión **abre ramas**.', { dib: arbol, v: { A: 3, b: 2, n1: 0, n2: 0, e1: ['trigo', 'maíz', 'avena'], e2: ['queso', 'huevo'] }, alto: 215 }, [
        ['Vas a pedir un sánduche. Primero eliges el pan.', {}],
        ['Hay tres panes: tres ramas.', { n1: 1 }, '$3$'],
        ['Luego el relleno: queso o huevo. Cada pan se abre en dos.', { n2: 1 }],
        ['Cuenta las puntas: tres panes con dos rellenos cada uno, seis sánduches.', {}, '$3 \\cdot 2 = 6$'],
        ['No hace falta dibujarlo siempre: si se elige esto **y** aquello, se multiplica.', {}, '$m \\cdot n$'],
      ], 'Si una decisión tiene m opciones y la otra n, juntas tienen $m \\cdot n$.'),
      xpHaz('dibujo', 'Una heladería tiene 4 sabores. ¿Cuántas salsas debe haber para que existan 20 helados de un sabor con una salsa?', { dib: cuad, v: { n: 1 }, metas: { n: 5 }, alto: 225, manijas: [{ k: 'n', min: 1, max: 8, paso: 1, et: 'salsas' }],
        lee: v => `$4 \\cdot ${v.n} = ${4 * v.n}$`, dice: v => `Cada casilla es un helado: van ${4 * v.n}.` }, '$4 \\cdot 5 = 20$: con cinco salsas.')],
    ['¿Se suma o se multiplica?',
      xpMira('dibujo', 'Segunda idea: «**y**» multiplica; «**o**» suma.', { dib: (v, K) => {
        const p = (x, y, n, cls) => Array.from({ length: n }, (_, i) => K.c(x + i * 30, y, 11, cls)).join('');
        if (v.m < 0.5) return K.t(40, 40, 'novelas', 's tm', 'start') + p(50, 66, 4, 'fa') + K.t(40, 112, 'cuentos', 's tm', 'start') + p(50, 138, 3, 'fg') + K.f(v.f, K.t(220, 106, '4 + 3 = 7', 'b ta'));
        let h = ''; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) h += K.c(60 + i * 52, 50 + j * 42, 11, 'fa') + K.c(78 + i * 52, 50 + j * 42, 11, 'fg');
        return h + K.f(v.f, K.t(290, 98, '4 · 3 = 12', 'ta'));
      }, v: { m: 0, f: 0 }, alto: 175 }, [
        ['En un estante hay 4 novelas y 3 libros de cuentos.', {}],
        ['Si te llevas **uno**, novela o cuento, hay 4 más 3: siete maneras.', { f: 1 }, '$4 + 3 = 7$'],
        ['Si te llevas una novela **y** un libro de cuentos, cada novela va con cada uno de los 3.', { m: 1, f: 0 }],
        ['Son 4 por 3: doce parejas.', { f: 1 }, '$4 \\cdot 3 = 12$'],
        ['Pregúntate: ¿hago las dos cosas, o solo una de ellas?', {}],
      ], 'Una cosa **o** la otra: se suma. Una cosa **y** después la otra: se multiplica.'),
      xpHaz('fichas', 'Lleva cada situación a su cuenta. Hay 5 camisetas, 3 gorras y 2 lápices.', { slots: [{ x: 88, y: 72, w: 156, h: 100, n: 3, et: 'se suma', ey: -56 }, { x: 252, y: 72, w: 156, h: 100, n: 3, et: 'se multiplica', ey: -56 }], fichas: ['gorra o lápiz', 'gorra y lápiz', 'una sola cosa', 'de cada una'], meta: [['gorra o lápiz', 'una sola cosa'], ['gorra y lápiz', 'de cada una']], alto: 126, pista: '¿Se hacen las dos cosas o solo una?' }, 'Elegir una sola: $3 + 2$ o $5 + 3 + 2$. Elegir de cada una: $3 \\cdot 2$ o $5 \\cdot 3 \\cdot 2$.')],
    ['Casilla por casilla',
      xpMira('fichas', 'Tercera idea: dibuja **casillas** y escribe en cada una cuántas opciones quedan.', { slots: casa([130, 210], 100, ['decenas', 'unidades']), fichas: ['9', '9', '10'], alto: 150, fondo: (K, v) => K.t(170, 34, v.p || '', 'ta') }, [
        ['¿Cuántos números de dos cifras distintas hay? Dos casillas: decenas y unidades.', {}],
        ['Se empieza por la casilla más exigente: las decenas no pueden ser 0. Quedan 9 opciones.', { pon: { 0: '9' }, v: { p: '1, 2, 3, 4, 5, 6, 7, 8, 9' } }],
        ['Para las unidades sí sirve el 0, pero no la cifra ya usada: 10 menos 1 son 9.', { pon: { 1: '9' }, v: { p: '0 sí; la repetida no' } }],
        ['Se multiplican: 9 por 9, ochenta y un números.', { v: { p: '9 · 9 = 81' } }, '$9 \\cdot 9 = 81$'],
      ], 'Una casilla por decisión, primero la más exigente, y se multiplican.'),
      xpHaz('fichas', 'Una clave lleva dos vocales distintas y después un dígito. Pon cuántas opciones hay en cada casilla y el total.', { slots: casa([46, 126, 206], 60, ['vocal 1', 'vocal 2', 'dígito']).concat([{ x: 296, y: 60, w: 72, et: 'total' }]), fichas: ['5', '4', '10', '200', '250', '9'], meta: ['5', '4', '10', '200'], alto: 106, fondo: K => K.t(86, 65, '·', 'b') + K.t(166, 65, '·', 'b') + K.t(248, 65, '=', 'b'), pista: 'La segunda vocal no puede ser la primera. Los dígitos van del 0 al 9.' }, '$5 \\cdot 4 \\cdot 10 = 200$ claves.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una bandera de 3 franjas se pinta con 4 colores. Franjas vecinas no llevan el mismo color. ¿Cuántas banderas hay?', { slots: [40, 92, 144].map((y, i) => ({ x: 120, y, w: 150, h: 42, et: ['franja 1', 'franja 2', 'franja 3'][i], ex: 112, ey: 5 })).concat([{ x: 120, y: 206, w: 110, et: 'banderas', ex: 96, ey: 5 }]), fichas: ['4', '3', '3', '2', '36', '24', '64'], meta: ['4', '3', '3', '36'], alto: 236, pista: 'La tercera solo debe ser distinta de la segunda: puede repetir el color de la primera.' }, '$4 \\cdot 3 \\cdot 3 = 36$: la tercera solo cuida a su vecina.')],
  ], 'Árboles, «y» que multiplica, «o» que suma, y una casilla por cada decisión.');
}
