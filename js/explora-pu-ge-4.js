// Preuniversitario · pu-ge-4 «Perímetros, áreas y círculos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Paralelogramo de base b y altura h inclinado s; c = 0..1 mueve el triángulo cortado al otro lado. tri: se ve medio.
  const U = 22;
  const para = (v, K) => {
    const x = 60, y = 180, b = v.b * U, h = v.h * U, s = v.s * U, d = (v.c ?? 0) * b;
    const T = [[x + d, y], [x + s + d, y - h], [x + s + d, y]];
    return K.p([[x + s, y], [x + b, y], [x + b + s, y - h], [x + s, y - h]], 'fa') + (v.s > 0.05 ? K.p(T, v.c > 0.02 ? 'fg' : 'fa') : '')
      + K.f(v.tri ?? 0, K.p([[x + s, y - h], [x + b + s, y - h], [x + b, y]], 'fc')) + K.cota(x + s * Math.min(1, v.c ?? 0), y + 8, x + s * Math.min(1, v.c ?? 0) + b, y + 8, N(v.b))
      + K.l(x + s, y, x + s, y - h, 'lf d') + K.t(x + s - 8, y - h / 2 + 5, N(v.h), 'tf', 'end');
  };
  const triang = (v, K) => {
    const x = 60, y = 185, b = 8 * 26, h = v.h * 26, ap = x + 130;
    return K.r(x, y - h, b, h, 'fc d') + K.p([[x, y], [x + b, y], [ap, y - h]], 'fa') + K.l(ap, y, ap, y - h, 'lf d') + K.cota(x, y + 8, x + b, y + 8, '8') + K.t(ap + 9, y - h / 2 + 5, N(v.h), 'tf', 'start');
  };
  const rombo = (v, K) => {
    const [x, y] = [170, 105], a = 120, b = v.D * 10, L = [x - a, y], R = [x + a, y], T = [x, y - b], B = [x, y + b];
    return K.f(v.caja, K.r(x - a, y - b, 2 * a, 2 * b, 'fn d', 0)) + K.p([L, T, R, B], 'fa') + K.f(v.dob, [[L, T, -1, -1], [T, R, 1, -1], [R, B, 1, 1], [B, L, -1, 1]].map(([P, Q, i, j]) => K.p([P, Q, [x + i * a, y + j * b]], 'fg')).join('')) + K.l(...L, ...R, 'lg') + K.l(...T, ...B, 'lf') + K.t(x + 60, y - 6, '12', 'tg') + K.t(x + 10, y + 50, N(v.D), 'tf', 'start');
  };
  const contorno = (v, K) => {
    const r = v.w * 10, x = 170 - r, y = 180, h = 80, yo = y - h;
    return K.r(x, yo, 2 * r, h, 'fa', 0) + K.sec(170, yo, r, 0, 180, 'fg') + K.f(v.r, K.pl([[x, yo], [x, y], [x + 2 * r, y], [x + 2 * r, yo]], 'la gr')) + K.f(v.t, K.l(x, yo, x + 2 * r, yo, 'lf d')) + K.f(v.c, K.arc(170, yo, r, 0, 180, 'lg gr')) + K.t(170, y + 18, N(v.w), 'ta') + K.t(x - 8, y - h / 2 + 5, '5', 'ta', 'end');
  };
  const trap = (v, K) => {
    const u = 15, y = 170, x = 22, B = v.B * u, b = v.b * u, h = v.h * u, o = 20, g = v.g ?? 0;
    const P = [[x, y], [x + B, y], [x + o + b, y - h], [x + o, y - h]], d = (1 - g) * 70;
    // Copia girada media vuelta alrededor del medio del lado derecho.
    const M = [(P[1][0] + P[2][0]) / 2, (P[1][1] + P[2][1]) / 2], R = P.map(p => [2 * M[0] - p[0] + d, 2 * M[1] - p[1]]);
    return K.f(v.dos ?? 0, K.p(R, 'fg')) + K.p(P, 'fa') + K.t(x + B / 2, y + 18, N(v.B), 'ta') + K.t(x + o + b / 2, y - h - 7, N(v.b), 'ta') + K.l(x + o, y, x + o, y - h, 'lf d') + K.t(x + o + 8, y - h / 2 + 5, N(v.h), 'tf', 'start')
      + K.f((v.dos ?? 0) * g, K.t(x + B + b / 2 + d, y + 18, N(v.b), 'tg'));
  };
  // Rueda que rueda: el perímetro se marca en el suelo.
  const rueda = (v, K) => {
    const r = 34, y = 130, x0 = 50, L = 2 * Math.PI * r * v.t, cx = x0 + L;
    return K.l(20, y, 330, y, 'lm') + K.l(x0, y, cx, y, 'la gr') + K.c(cx, y - r, r, 'fc') + K.arc(cx, y - r, r, -90, -90 + 360 * (1 - v.t) + 0.01, 'la gr') + K.l(cx, y - r, ...K.at(cx, y - r, r, -90 - 360 * v.t), 'lf')
      + K.f(v.d ?? 0, [0, 1, 2].map(i => K.l(x0 + i * 2 * r + 1, y + 18, x0 + (i + 1) * 2 * r - 1, y + 18, 'lg gr') + K.t(x0 + (i + 0.5) * 2 * r, y + 36, 'd', 'tg')).join(''));
  };
  // Círculo partido en gajos que se acomodan casi como un rectángulo.
  const gajos = (v, K) => {
    const n = 16, r = 58, t = v.t; let h = '';
    for (let i = 0; i < n; i++) {
      const a = 90 + i * 360 / n, up = i % 2 === 0, w = Math.PI * r / (n / 2), X = 78 + (Math.floor(i / 2)) * w + (up ? 0 : w / 2), Y = up ? 130 : 130 - r;
      const cx = K.lerp(170, X, t), cy = K.lerp(100, Y, t), rot = K.lerp(a + 180 / n, up ? 90 : 270, t);
      h += K.sec(cx, cy, r, rot - 180 / n, rot + 180 / n, up ? 'fa' : 'fg');
    }
    return h + K.f(t > 0.98 ? 1 : 0, K.cota(72, 144, 72 + Math.PI * r, 144, 'π r') + K.t(58, 106, 'r', 'tf', 'end'));
  };
  const sec = (v, K) => K.c(170, 105, 82, 'fc') + K.sec(170, 105, 82, 0, v.g, 'fa') + K.arc(170, 105, 82, 0, v.g, 'lf gr') + K.t(270, 190, `r = ${v.r}`, 'tm', 'start') + K.t(...K.at(170, 110, 40, Math.max(14, v.g / 2)), `${Math.round(v.g)}°`, 'ta');

  xpLec('pu-ge-4', [
    ['Base por altura',
      xpMira('dibujo', 'Empecemos por la idea: casi todas las áreas salen del **rectángulo**.', { dib: para, v: { b: 7, h: 5, s: 0, c: 0, tri: 0 }, alto: 225 }, [
        ['Un rectángulo de 7 por 5 tiene 5 filas de 7 cuadros: 35.', {}, '$7 \\cdot 5 = 35$'],
        ['Lo inclinamos: es un paralelogramo. La base y la altura no cambiaron.', { s: 2 }],
        ['Cortamos el triángulo de un lado y lo pasamos al otro: vuelve a ser un rectángulo.', { c: 1 }, '$b \\cdot h = 35$'],
        ['Por eso su área también es base por altura. La altura es la recta, no el lado inclinado.', { c: 0 }],
        ['Y un triángulo es la mitad: base por altura, partido en dos.', { tri: 1 }, '$\\tfrac{7 \\cdot 5}{2} = 17.5$'],
      ], 'Rectángulo y paralelogramo: $b \\cdot h$. Triángulo: la mitad. La altura siempre es perpendicular a la base.'),
      xpHaz('dibujo', 'La base del triángulo mide 8. Sube el vértice hasta que el área sea 20.', { dib: triang, v: { h: 2 }, metas: { h: 5 }, alto: 220,
        manijas: [{ k: 'h', min: 1, max: 6.5, paso: 0.5, en: v => [190, 185 - v.h * 26], de: (x, y) => (185 - y) / 26 }],
        lee: v => `$\\tfrac{8 \\cdot ${N(v.h)}}{2} = ${N(4 * v.h)}$`, dice: v => `El rectángulo punteado vale ${N(8 * v.h)} y el triángulo es la mitad.` }, '$\\tfrac{8 \\cdot 5}{2} = 20$: el rectángulo entero vale 40.')],
    ['El rombo: media caja',
      xpMira('dibujo', 'Otra mitad: un **rombo** es la mitad de la caja de sus diagonales.', { dib: rombo, v: { D: 9, caja: 0, dob: 0 }, alto: 215 }, [
        ['Un rombo tiene cuatro lados iguales. Sus diagonales, aquí 12 y 9, se cruzan en ángulo recto.', {}],
        ['Lo metemos en una caja: sus lados miden lo mismo que las diagonales, 12 y 9.', { caja: 1 }, '$12 \\cdot 9 = 108$'],
        ['Las diagonales parten el rombo en cuatro triángulos, y en las esquinas sobran otros cuatro iguales.', { dob: 1 }],
        ['Por eso el rombo es la mitad de la caja: 54.', {}, '$\\tfrac{12 \\cdot 9}{2} = 54$'],
      ], 'Rombo: la mitad del producto de las diagonales, $\\tfrac{D \\cdot d}{2}$.'),
      xpHaz('dibujo', 'Una diagonal mide 12. Estira la otra hasta que el área del rombo sea 42.', { dib: rombo, v: { D: 4, caja: 1, dob: 0 }, metas: { D: 7 }, alto: 215, manijas: [{ k: 'D', min: 2, max: 10, paso: 1, en: v => [170, 105 - v.D * 10], de: (x, y) => (105 - y) / 10 }],
        lee: v => `$\\tfrac{12 \\cdot ${v.D}}{2} = ${6 * v.D}$`, dice: v => `La caja vale ${12 * v.D} y el rombo es la mitad.` }, 'La caja debe valer 84: $\\tfrac{12 \\cdot 7}{2} = 42$.')],
    ['El trapecio: dos juntos',
      xpMira('dibujo', 'Segunda idea: un **trapecio** se entiende pegándole una copia.', { dib: trap, v: { B: 9, b: 5, h: 6, dos: 0, g: 0 }, alto: 200 }, [
        ['Un trapecio tiene dos bases paralelas: aquí 9 y 5. La altura es 6.', {}],
        ['Le ponemos al lado una copia girada media vuelta.', { dos: 1 }],
        ['Encajan: forman un paralelogramo de base 9 más 5, que es 14.', { g: 1 }, '$9 + 5 = 14$'],
        ['Ese paralelogramo vale 14 por 6, o sea 84. El trapecio es la mitad: 42.', {}, '$\\tfrac{(9 + 5) \\cdot 6}{2} = 42$'],
        ['Es lo mismo que usar el promedio de las bases, 7, por la altura.', {}, '$7 \\cdot 6 = 42$'],
      ], 'Área del trapecio: promedio de las bases por la altura, $\\tfrac{(B + b)\\,h}{2}$.'),
      xpHaz('dibujo', 'Las bases miden 10 y 4. Ajusta la altura hasta que el área sea 35.', { dib: trap, v: { B: 10, b: 4, h: 2 }, metas: { h: 5 }, alto: 190,
        manijas: [{ k: 'h', min: 1, max: 9, paso: 1, en: v => [102, 170 - v.h * 15], de: (x, y) => (170 - y) / 15, r: 10 }],
        lee: v => `$\\tfrac{(10 + 4) \\cdot ${v.h}}{2} = ${7 * v.h}$`, dice: v => `El promedio de las bases es 7, y la altura va en ${v.h}.` }, 'Promedio 7 por altura 5: $7 \\cdot 5 = 35$.')],
    ['El círculo',
      xpMira('dibujo', 'Tercera idea: de dónde salen $2\\pi r$ y $\\pi r^2$.', { dib: (v, K) => (v.m < 0.5 ? rueda(v, K) : gajos({ t: v.w }, K)), v: { m: 0, t: 0, d: 0, w: 0 }, alto: 190 }, [
        ['Una rueda da una vuelta completa y deja marcado su borde en el piso.', { t: 1 }],
        ['Ese largo son tres diámetros y un poquito más: π diámetros, unos 3.14.', { d: 1 }, '$L = \\pi d = 2\\pi r$'],
        ['Para el área, cortamos el círculo en gajos, como una naranja.', { m: 1 }],
        ['Los acomodamos punta arriba, punta abajo: casi un rectángulo.', { w: 1 }],
        ['Su largo es medio borde, π r, y su alto es r. El área es π r por r.', {}, '$A = \\pi r \\cdot r = \\pi r^2$'],
      ], 'El borde mide $2\\pi r$ y el círculo ocupa $\\pi r^2$. Cuidado con usar el diámetro donde va el radio.'),
      xpHaz('dibujo', 'Arrastra el borde hasta que la circunferencia mida 14π.', { dib: (v, K) => K.c(170, 105, v.r * 12, 'fa') + K.l(170, 105, 170 + v.r * 12, 105, 'lf') + K.c(170, 105, 3, 'fk') + K.t(40, 30, `r = ${v.r}`, 'tf'), v: { r: 2 }, metas: { r: 7 }, alto: 215,
        manijas: [{ k: 'r', min: 1, max: 8, paso: 1, en: v => [170 + v.r * 12, 105], de: (x, y) => Math.hypot(x - 170, y - 105) / 12, r: 10 }],
        lee: v => `$2\\pi \\cdot ${v.r} = ${2 * v.r}\\pi$`, dice: v => `Con radio ${v.r}, el diámetro es ${2 * v.r}.` }, '$2\\pi r = 14\\pi$, así que el radio es 7.')],
    ['El sector: una tajada',
      xpMira('dibujo', 'Cuarta idea: un **sector** es una fracción del círculo, como una tajada.', { dib: sec, v: { g: 360, r: 8 }, alto: 205 }, [
        ['El círculo entero de radio 8 vale 64π y su borde mide 16π.', {}, '$\\pi \\cdot 8^2 = 64\\pi \\quad 2\\pi \\cdot 8 = 16\\pi$'],
        ['Media vuelta, 180°, es la mitad: 32π de área y 8π de borde.', { g: 180 }, '$\\tfrac12 \\cdot 64\\pi = 32\\pi$'],
        ['Un cuarto de vuelta es la cuarta parte: 16π de área y 4π de borde.', { g: 90 }, '$\\tfrac14 \\cdot 64\\pi = 16\\pi$'],
        ['En general, la fracción es el ángulo sobre 360: 45° es la octava parte, 8π.', { g: 45 }, '$\\tfrac{45}{360} \\cdot 64\\pi = 8\\pi$'],
      ], 'Sector y arco: la fracción $\\tfrac{\\theta}{360^\\circ}$ del área y del borde del círculo.'),
      xpHaz('dibujo', 'El radio mide 4. Abre el sector hasta que su área sea 6π.', { dib: sec, v: { g: 30, r: 4 }, metas: { g: 135 }, alto: 205,
        manijas: [{ k: 'g', min: 15, max: 345, paso: 15, en: v => XPK.at(170, 105, 82, v.g), de: (x, y, v) => { const g = (Math.atan2(105 - y, x - 170) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 345 : 15) : g; }, r: 10 }],
        lee: v => `$\\tfrac{${v.g}}{360} \\cdot 16\\pi = ${N(v.g / 360 * 16)}\\pi$`, dice: v => `${v.g}° de 360°: ${N(v.g / 3.6)} de cada 100 partes del círculo.` }, '6 de 16 son tres octavos: $\\tfrac38 \\cdot 360^\\circ = 135^\\circ$.')],
    ['Por el borde',
      xpMira('dibujo', 'Quinta idea: el **perímetro** es lo que se recorre por fuera.', { dib: contorno, v: { w: 8, r: 0, c: 0, t: 0 }, alto: 205 }, [
        ['Un rectángulo de 8 por 5 con medio círculo encima. ¿Cuánto mide su borde?', {}],
        ['Los tramos rectos de afuera son tres: 5, 8 y 5. Suman 18.', { r: 1 }, '$5 + 8 + 5 = 18$'],
        ['El lado de arriba quedó adentro: lo tapa el medio círculo, y por ahí no se camina.', { t: 1 }],
        ['La curva es media circunferencia de diámetro 8: la mitad de 8π.', { c: 1 }, '$\\tfrac12 \\cdot 8\\pi = 4\\pi$'],
        ['El borde mide 18 más 4π.', {}, '$18 + 4\\pi$'],
      ], 'Para el borde de una figura armada, recórrela por fuera: los lados que comparten las piezas no cuentan.'),
      xpHaz('dibujo', 'Ensancha la figura hasta que los tramos **rectos** del borde sumen 20. Los costados miden 5.', { dib: contorno, v: { w: 4, r: 1, c: 0, t: 0 }, metas: { w: 10 }, alto: 205, manijas: [{ k: 'w', min: 3, max: 12, paso: 1, en: v => [170 + v.w * 10, 140], de: x => (x - 170) / 10 }],
        lee: v => `$5 + ${v.w} + 5 = ${v.w + 10}$`, dice: () => 'Cuenta los dos costados y el piso; el lado de arriba quedó adentro.' }, 'Dos costados de 5 y un piso de 10: $5 + 10 + 5 = 20$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una ventana es un rectángulo de 4 por 3 con medio círculo encima. Pon el área de cada parte y la total.', {
        fondo: (K, v) => K.r(60, 78, 104, 78, 'fa') + K.sec(112, 78, 52, 0, 180, 'fg') + K.t(112, 174, '4', 'tm') + K.t(52, 122, '3', 'tm', 'end') + K.t(205, 62, 'medio círculo', 's tg', 'start') + K.t(205, 112, 'rectángulo', 's ta', 'start') + K.t(205, 162, 'en total', 's', 'start'),
        slots: [{ x: 245, y: 36, w: 92, h: 36 }, { x: 245, y: 86, w: 92, h: 36 }, { x: 245, y: 136, w: 92, h: 36 }], fichas: ['12', '2π', '4π', '12 + 2π', '7'], meta: ['2π', '12', '12 + 2π'], alto: 185,
        pista: 'El radio es la mitad del ancho, 2, y solo hay medio círculo.' }, 'Radio 2: medio círculo vale $\\tfrac12 \\pi 2^2 = 2\\pi$. Con el rectángulo, $12 + 2\\pi$.')],
  ], 'Base por altura, medios y promedios, $2\\pi r$ y $\\pi r^2$, y los sectores como tajadas del círculo.');
}
