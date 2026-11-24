// Preuniversitario · pu-ge-6 «Volúmenes y superficies» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const capas = (v, K) => K.caja([170 - (v.a - v.b) * 10, 200], v.u ?? 24, v.a, v.b, Math.max(0, Math.round(v.c)), 'fa');
  // Cilindro con agua hasta la fracción n y un cono al lado.
  const eli = (K, x, y, rx, cls) => `<ellipse class="xf ${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.28}"/>`;
  const cil = (K, x, y, r, h, f, cls = 'fa') => {
    const ya = y - h * f;
    return (f > 0.01 ? `<path class="xf ${cls}" d="M${x - r} ${K.n(ya)} V${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} V${K.n(ya)}"/>` + eli(K, x, K.n(ya), r, cls) : '')
      + `<path class="xl" d="M${x - r} ${y - h} V${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} V${y - h}"/>` + eli(K, x, y - h, r, 'fn');
  };
  const cono = (K, x, y, r, h, cls) => `<path class="xf ${cls}" d="M${x - r} ${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} L${x} ${K.n(y - h)} Z"/>` + `<path class="xl lm d" d="M${x - r} ${y} A${r} ${r * 0.28} 0 0 1 ${x + r} ${y}"/>`;
  const tercio = (v, K) => cil(K, 230, 180, 60, 130, v.n / 3) + [0, 1, 2].map(i => K.l(296, 180 - 130 * (i + 1) / 3, 304, 180 - 130 * (i + 1) / 3, 'lm')).join('') + cono(K, 85, 180, 60, 130, 'fg') + K.t(85, 205, 'cono', 'tg') + K.t(230, 205, 'cilindro', 'ta');
  // Caja a × b × h y su desarrollo: las seis caras.
  const des = (v, K) => {
    const u = v.u ?? 17, a = v.a * u, b = v.b * u, h = v.h * u, x = 170 - a / 2, y0 = 14, s = v.s ?? 1;
    // Cruz: arriba tapa, luego frente, base y atrás; costados a los lados del frente.
    const q = (X, Y, W, H, t, cls, f = 1) => K.f(f, K.r(X, Y, W, H, cls, 1) + (t ? K.t(X + W / 2, Y + H / 2 + 5, t, 's') : ''));
    return q(x, y0, a, b, N(v.a * v.b), 'fa') + q(x, y0 + b, a, h, N(v.a * v.h), 'fg') + q(x, y0 + b + h, a, b, N(v.a * v.b), 'fa', s) + q(x, y0 + 2 * b + h, a, h, N(v.a * v.h), 'fg', s)
      + q(x - b, y0 + b, b, h, N(v.b * v.h), 'ff', s) + q(x + a, y0 + b, b, h, N(v.b * v.h), 'ff', s);
  };
  const pileta = (v, K) => {
    const o = [160, 178], u = 26, I = (x, y, z) => K.iso(o, u, x, y, z), z = 2.5, w = v.h / 2 * z;
    return K.caja(o, u, 5, 4, w, 'fa', false) + K.pl([I(0, 0, w), I(0, 0, z), I(5, 0, z), I(5, 4, z), I(0, 4, z), I(0, 0, z)], 'lm') + K.l(...I(5, 0, 0), ...I(5, 0, z), 'lm') + K.l(...I(0, 4, 0), ...I(0, 4, z), 'lm') + K.t(I(2.5, 0, 0)[0] + 14, I(2.5, 0, 0)[1] + 22, '5 m', 'tm') + K.t(I(0, 2, 0)[0] - 14, I(0, 2, 0)[1] + 22, '4 m', 'tm');
  };

  xpLec('pu-ge-6', [
    ['Capas que se apilan',
      xpMira('dibujo', 'Empecemos por la idea: el volumen de una caja se cuenta **por capas**.', { dib: capas, v: { a: 4, b: 3, c: 0 }, alto: 220 }, [
        ['La base de 4 por 3 es un piso de 12 baldosas.', {}, '$4 \\cdot 3 = 12$'],
        ['Ponemos una capa de cubitos: 12 cubitos.', { c: 1 }, '$12 \\cdot 1 = 12$'],
        ['Con tres capas iguales son 12 por 3: 36 cubitos.', { c: 3 }, '$12 \\cdot 3 = 36$'],
        ['Con cinco capas, 60. Cada capa agrega lo mismo.', { c: 5 }, '$12 \\cdot 5 = 60$'],
        ['Vale para cualquier columna recta: prismas y cilindros. Área de la base por altura.', {}, '$V = A_{\\text{base}} \\cdot h$'],
      ], 'Prismas y cilindros: volumen = área de la base × altura, porque son capas iguales.'),
      xpHaz('dibujo', 'La base es de 5 por 3. Apila capas hasta tener 90 cubitos.', { dib: capas, v: { a: 5, b: 3, c: 1, u: 21 }, metas: { c: 6 }, alto: 270, manijas: [{ k: 'c', min: 0, max: 7, paso: 1, et: 'capas' }],
        lee: v => `$5 \\cdot 3 \\cdot ${v.c} = ${15 * v.c}$`, dice: v => `${v.c} ${v.c === 1 ? 'capa' : 'capas'} de 15 cubitos.` }, '$15 \\cdot 6 = 90$: seis capas.')],
    ['Conos y pirámides: un tercio',
      xpMira('dibujo', 'Segunda idea: un cono llena **un tercio** del cilindro que lo envuelve.', { dib: tercio, v: { n: 0 }, alto: 215 }, [
        ['Un cono y un cilindro con la misma base y la misma altura.', {}],
        ['Echamos en el cilindro el agua que cabe en el cono: sube hasta la tercera parte.', { n: 1 }, '$\\tfrac13$'],
        ['Otro cono lleno: dos terceras partes.', { n: 2 }, '$\\tfrac23$'],
        ['Con el tercero se llena justo. Un cono es la tercera parte del cilindro.', { n: 3 }, '$V_{\\text{cono}} = \\tfrac13 \\pi r^2 h$'],
        ['Igual pasa con una pirámide y el prisma de su misma base y altura.', {}, '$V = \\tfrac13 A_{\\text{base}} \\cdot h$'],
        ['Y una esfera que cabe justa en un cilindro llena dos tercios de él. De ahí sale su fórmula.', { n: 2 }, '$V = \\tfrac43 \\pi r^3$'],
      ], 'Cono y pirámide: un tercio de base por altura, porque tres llenan el cilindro o el prisma.'),
      xpHaz('dibujo', 'Un cono tiene radio 2. Sube la punta hasta que su volumen sea 8π.', { dib: (v, K) => cono(K, 170, 185, 46, v.h * 18, 'fg') + K.l(170, 185, 170, 185 - v.h * 18, 'lf d') + K.l(170, 185, 216, 185, 'la') + K.t(240, 190, 'r = 2', 'ta', 'start') + K.t(112, 185 - v.h * 9, `h = ${v.h}`, 'tf', 'end'), v: { h: 2 }, metas: { h: 6 }, alto: 215,
        manijas: [{ k: 'h', min: 1, max: 9, paso: 1, en: v => [170, 185 - v.h * 18], de: (x, y) => (185 - y) / 18, r: 10 }],
        lee: v => `$\\tfrac13 \\cdot 4\\pi \\cdot ${v.h} = ${v.h % 3 ? `\\tfrac{${4 * v.h}}{3}` : 4 * v.h / 3}\\pi$`, dice: v => `La base vale 4π. El cilindro de esa altura valdría ${4 * v.h}π.` }, '$\\tfrac13 \\cdot 4\\pi \\cdot 6 = 8\\pi$.')],
    ['La piel: desarrollar la caja',
      xpMira('dibujo', 'Tercera idea: la **superficie** es la piel. Se abre la caja y se suman las caras.', { dib: des, v: { a: 5, b: 2, h: 4, s: 0 }, alto: 220 }, [
        ['Una caja de 5 por 2 de base y 4 de alto. Primero vemos la tapa y el frente.', {}, '$5 \\cdot 2 = 10 \\quad 5 \\cdot 4 = 20$'],
        ['Al abrirla aparecen todas: seis rectángulos, que van en parejas iguales.', { s: 1 }],
        ['Tapa y base: 10 cada una. Frente y atrás: 20 cada una. Costados: 8 cada uno.', {}, '$10 + 20 + 8 = 38$'],
        ['Como hay dos de cada una, la piel mide el doble: 76.', {}, '$2 \\cdot 38 = 76$'],
        ['Un cubo de arista 2 tiene seis caras iguales de 4: son 24.', { a: 2, b: 2, h: 2 }, '$6 \\cdot 4 = 24$'],
      ], 'Superficie = suma de las caras. En una caja van por parejas; en un cubo son $6a^2$.'),
      xpHaz('dibujo', 'La base mide 4 por 2. Ajusta la altura hasta que las seis caras sumen 52.', { dib: des, v: { a: 4, b: 2, h: 1 }, metas: { h: 3 }, alto: 285, manijas: [{ k: 'h', min: 1, max: 5, paso: 1, et: 'altura' }],
        lee: v => `$2 \\cdot (8 + ${4 * v.h} + ${2 * v.h}) = ${16 + 12 * v.h}$`, dice: v => `Con altura ${v.h}: caras de 8, ${4 * v.h} y ${2 * v.h}, dos de cada una.` }, '$2 \\cdot (8 + 12 + 6) = 52$: la altura es 3.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una piscina tiene fondo de 5 m por 4 m. Se le echan 24 m³ de agua. Sube el nivel: ¿hasta qué altura llega?', { dib: pileta, v: { h: 0.2 }, metas: { h: 1.2 }, alto: 240, manijas: [{ k: 'h', min: 0.2, max: 2, paso: 0.1, et: 'altura del agua (m)', rot: v => N(v.h) }],
        lee: v => `$5 \\cdot 4 \\cdot ${N(v.h)} = ${N(20 * v.h)} \\text{ m}^3$`, dice: v => `Cada metro de altura son 20 m³. Van ${N(20 * v.h)}.` }, '$24 \\div 20 = 1.2$ m. Y como 1 m³ son 1 000 litros, hay 24 000 litros.')],
  ], 'Capas para prismas y cilindros, un tercio para conos y pirámides, y la piel como suma de las caras.');
}
