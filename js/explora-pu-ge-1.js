// Preuniversitario · pu-ge-1 «Ángulos y paralelas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const O = [170, 150];
  // Media vuelta partida por un rayo en el ángulo a.
  const media = (v, K) => {
    const R = K.at(...O, 115, v.a), D = [300, O[1]], I = [40, O[1]];
    return K.ang(O, D, R, 42, `${Math.round(v.a)}°`, 'fa', 'ta') + K.f(v.ver ?? 1, K.ang(O, R, I, 34, v.ver === 0 ? '' : `${180 - Math.round(v.a)}°`, 'fg', 'tg'))
      + K.l(...I, ...D) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
  };
  // Dos rectas que se cruzan.
  const cruce = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 92, g), r = v.rot ?? 0, a = v.a;
    const A = P(r), B = P(r + a), A2 = P(r + 180), B2 = P(r + 180 + a), n = Math.round(a);
    return K.f(v.f1 ?? 1, K.ang(C, A, B, 40, `${n}°`, 'fa', 'ta')) + K.f(v.f2 ?? 0, K.ang(C, A2, B2, 40, `${n}°`, 'fa', 'ta'))
      + K.f(v.f3 ?? 0, K.ang(C, B, A2, 30, `${180 - n}°`, 'fg', 'tg')) + K.f(v.f4 ?? 0, K.ang(C, B2, A, 30, `${180 - n}°`, 'fg', 'tg'))
      + K.l(...A, ...A2) + K.l(...B, ...B2) + K.c(...C, 4, 'fk');
  };
  // Complemento: un cuarto de vuelta partido en dos.
  const recto = (v, K) => {
    const V = [110, 170], R = K.at(...V, 135, v.a), D = [265, 170], U = [110, 20], n = Math.round(v.a);
    return K.ang(V, D, R, 46, `${n}°`, 'fa', 'ta') + K.ang(V, R, U, 38, `${90 - n}°`, 'fg', 'tg') + K.l(...V, ...D) + K.l(...V, ...U) + K.l(...V, ...R, 'la gr') + K.c(...V, 4, 'fk');
  };
  // Paralelas en y = 60 e y = 150 con una transversal de ángulo a.
  const Y1 = 62, Y2 = 152;
  const par = (v, K) => {
    const t = Math.tan(v.a * Math.PI / 180), X = y => 170 + (107 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], n = Math.round(v.a);
    const d = (W, s) => [W[0] + s * 100, W[1]], up = [X(Y1 - 40), Y1 - 40], dn = [X(Y2 + 40), Y2 + 40];
    return K.f(v.cor ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.alt ?? 0, K.ang(P, d(P, -1), Q, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.con ?? 0, K.ang(P, d(P, 1), Q, 26, v.oculta ? '?' : `${180 - n}°`, 'fg', 'tg') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.l(20, Y1, 320, Y1) + K.l(20, Y2, 320, Y2) + K.l(...up, ...dn, 'la gr') + K.t(312, Y1 - 8, 'ℓ₁', 'tm') + K.t(312, Y2 - 8, 'ℓ₂', 'tm');
  };
  const TX = v => { // triángulo de base 70..270 con ángulos a y b
    const A = [85, 170], B = [255, 170], ta = Math.tan(v.a * Math.PI / 180), tb = Math.tan(v.b * Math.PI / 180), x = 170 * tb / (ta + tb);
    return [A, B, [85 + x, 170 - x * ta]];
  };
  const tri = (v, K) => {
    const [A, B, C] = TX(v), a = Math.round(v.a), b = Math.round(v.b);
    const cA = v.une ?? 0, L = [C[0] - 120, C[1]], R = [C[0] + 120, C[1]];
    return K.ang(A, B, C, 32, `${a}°`, 'fa', 'ta') + K.ang(B, C, A, 32, `${b}°`, 'fg', 'tg') + (v.ext == null || v.ext < 0.5 ? K.ang(C, A, B, 26, v.oc ? '?' : `${180 - a - b}°`, 'ff', 'tf') : '')
      + K.f(cA, K.l(Math.max(6, L[0]), L[1], Math.min(334, R[0]), R[1], 'lm d') + K.ang(C, L, A, 20, '', 'fa') + K.ang(C, B, R, 20, '', 'fg'))
      + K.f(v.ext ?? 0, K.l(B[0], B[1], 330, 170, 'lm') + K.ang(B, [330, 170], C, 24, `${a + (180 - a - b)}°`, 'fo', 'to') + K.ang(C, A, B, 26, `${180 - a - b}°`, 'ff', 'tf'))
      + K.pl([A, B, C, A]);
  };
  const pol = (v, K) => {
    const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 88, 90 + i * 360 / n));
    let h = '';
    for (let i = 1; i < n - 1; i++) h += K.f(v.f ?? 1, K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]));
    return h + K.p(P, 'fn') + K.t(40, 190, `${n} lados`, 'tm');
  };

  xpLec('pu-ge-1', [
    ['Ángulos que se completan',
      xpMira('dibujo', 'Empecemos por lo básico: ángulos que **juntos** forman algo conocido.', { dib: (v, K) => (v.cual < 0.5 ? media(v, K) : v.cual < 1.5 ? recto(v, K) : cruce(v, K)), v: { cual: 0, a: 60, ver: 1, rot: 12, f1: 1, f2: 0, f3: 0, f4: 0 }, alto: 200 }, [
        ['Un rayo parte la media vuelta en dos ángulos. Juntos siempre dan 180°: son suplementarios.', {}, '$60^\\circ + 120^\\circ = 180^\\circ$'],
        ['Si uno crece, el otro se achica lo mismo. La suma no cambia.', { a: 140 }, '$140^\\circ + 40^\\circ = 180^\\circ$'],
        ['En una esquina recta pasa igual, pero juntos dan 90°: son complementarios.', { cual: 1, a: 35 }, '$35^\\circ + 55^\\circ = 90^\\circ$'],
        ['Ahora dos rectas que se cruzan, como una tijera abierta.', { cual: 2, a: 80 }],
        ['Los ángulos de enfrente abren lo mismo: son opuestos por el vértice, y son iguales.', { f2: 1 }],
        ['Y los de al lado completan la media vuelta: 100° cada uno.', { f3: 1, f4: 1 }, '$80^\\circ + 100^\\circ = 180^\\circ$'],
      ], 'Vecinos sobre una recta suman 180°; en una esquina recta, 90°; los opuestos por el vértice son iguales.'),
      xpHaz('dibujo', 'Arrastra el rayo hasta que el ángulo dorado, el vecino, mida 115°.', { dib: media, v: { a: 120 }, metas: { a: 65 }, alto: 190,
        manijas: [{ k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(...O, 115, v.a), de: (x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * 180 / Math.PI) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `El tuyo mide ${v.a}° y al dorado le queda lo que falta para 180°.` }, 'Al vecino le toca lo que falta: $180^\\circ - 115^\\circ = 65^\\circ$.')],
    ['Paralelas y transversal',
      xpMira('dibujo', 'Segunda idea: una recta que corta a **dos paralelas** repite sus ángulos.', { dib: par, v: { a: 60, cor: 0, alt: 0, con: 0 }, alto: 200 }, [
        ['Dos paralelas y una recta que las atraviesa: la transversal. Se forman dos cruces idénticos.', {}],
        ['Los que están en la misma esquina de cada cruce son iguales: se llaman correspondientes.', { cor: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Entre las paralelas, a lados distintos de la transversal, forman una Z: alternos internos, iguales.', { cor: 0, alt: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Entre las paralelas y del mismo lado están los conjugados: esos suman 180°.', { alt: 0, con: 1 }, '$120^\\circ + 60^\\circ = 180^\\circ$'],
        ['Si la transversal se inclina cambian los números, pero no las relaciones.', { a: 105 }, '$75^\\circ + 105^\\circ = 180^\\circ$'],
      ], 'Con paralelas: correspondientes y alternos internos son iguales; conjugados internos suman 180°.'),
      xpHaz('dibujo', 'Inclina la transversal hasta que el conjugado dorado, el que no se ve, mida 125°.', { dib: par, v: { a: 90, con: 1, oculta: 1 }, metas: { a: 55 }, alto: 200,
        manijas: [{ k: 'a', min: 40, max: 140, paso: 5, en: v => [170 + 85 / Math.tan(v.a * Math.PI / 180), 22], de: x => Math.atan2(85, x - 170) * 180 / Math.PI }],
        lee: v => `$? + ${v.a}^\\circ = 180^\\circ$`, dice: v => `El ángulo de abajo mide ${v.a}°. El dorado es su conjugado.` }, 'Conjugados suman 180°: $180^\\circ - 125^\\circ = 55^\\circ$.')],
    ['Los ángulos de un triángulo',
      xpMira('dibujo', 'Tercera idea: por qué los ángulos de **cualquier** triángulo suman 180°.', { dib: tri, v: { a: 55, b: 65, une: 0, ext: 0 }, alto: 200 }, [
        ['Este triángulo tiene tres ángulos distintos. ¿Cuánto suman?', {}],
        ['Trazamos arriba una paralela a la base. Los ángulos de abajo reaparecen arriba: son alternos internos.', { une: 1 }],
        ['Arriba, los tres juntos forman media vuelta. Por eso suman 180°.', {}, '$55^\\circ + 60^\\circ + 65^\\circ = 180^\\circ$'],
        ['Cambia el triángulo y la suma sigue igual.', { a: 80, b: 35 }, '$80^\\circ + 65^\\circ + 35^\\circ = 180^\\circ$'],
        ['Si alargamos un lado aparece un ángulo exterior: mide lo mismo que los otros dos interiores juntos.', { une: 0, ext: 1 }, '$80^\\circ + 65^\\circ = 145^\\circ$'],
      ], 'Los tres ángulos de un triángulo suman 180°, y un exterior es la suma de los dos interiores lejanos.'),
      xpHaz('dibujo', 'El ángulo dorado mide 45°. Mueve el de la izquierda hasta que el de arriba, oculto, mida 70°.', { dib: tri, v: { a: 40, b: 45, oc: 1 }, metas: { a: 65 }, alto: 200,
        manijas: [{ k: 'a', min: 25, max: 75, paso: 5, en: v => TX(v)[2], de: (x, y) => Math.atan2(170 - y, x - 85) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + 45^\\circ + ? = 180^\\circ$`, dice: v => `Los dos de abajo suman ${v.a + 45}°. Arriba queda lo que falta para 180°.` }, 'Falta lo que queda de 180°: $180^\\circ - 45^\\circ - 70^\\circ = 65^\\circ$.')],
    ['Polígonos: cortar en triángulos',
      xpMira('dibujo', 'Cuarta idea: cualquier polígono se **corta en triángulos**.', { dib: pol, v: { n: 4, f: 0 }, alto: 200 }, [
        ['Un cuadrilátero no es un triángulo, pero podemos cortarlo desde una esquina.', {}],
        ['Salen dos triángulos, cada uno con 180°: los cuatro ángulos suman 360°.', { f: 1 }, '$2 \\cdot 180^\\circ = 360^\\circ$'],
        ['Con cinco lados salen tres triángulos: 540°.', { n: 5 }, '$3 \\cdot 180^\\circ = 540^\\circ$'],
        ['Siempre salen dos triángulos menos que lados: con ocho lados, seis triángulos.', { n: 8 }, '$(n - 2) \\cdot 180^\\circ$'],
        ['Si el polígono es regular, la suma se reparte por igual entre sus ángulos: 1 080 entre 8 son 135°.', {}, '$1080^\\circ \\div 8 = 135^\\circ$'],
      ], 'Un polígono de n lados se corta en n − 2 triángulos: sus ángulos suman $(n - 2) \\cdot 180^\\circ$.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que los ángulos sumen 720°.', { dib: pol, v: { n: 3, f: 1 }, metas: { n: 6 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 10, paso: 1 }],
        lee: v => `$${v.n - 2} \\cdot 180^\\circ = ${(v.n - 2) * 180}^\\circ$`, dice: v => `${v.n} lados: ${v.n - 2} ${v.n === 3 ? 'triángulo' : 'triángulos'}.` }, 'Cuatro triángulos, seis lados: $4 \\cdot 180^\\circ = 720^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una escalera de tijera tiene dos patas iguales y arriba debe abrir 40°. Inclínala: ¿qué ángulo hace cada pata con el piso?', {
        dib: (v, K) => { const h = 130, d = h / Math.tan(v.a * Math.PI / 180), A = [170 - d, 170], B = [170 + d, 170], C = [170, 40]; return K.ang(A, B, C, 28, `${v.a}°`, 'fa', 'ta') + K.ang(B, C, A, 28, `${v.a}°`, 'fa', 'ta') + K.ang(C, A, B, 26, '?', 'ff', 'tf') + K.l(20, 170, 320, 170, 'lm') + K.pl([A, C, B], 'gr'); },
        v: { a: 50 }, metas: { a: 70 }, alto: 200, manijas: [{ k: 'a', min: 45, max: 85, paso: 5, en: v => [170 + 130 / Math.tan(v.a * Math.PI / 180), 170], de: x => Math.atan2(130, Math.max(1, x - 170)) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${v.a}^\\circ + ? = 180^\\circ$`, dice: v => `Las patas iguales hacen ángulos iguales con el piso: ${v.a}° cada una.` }, 'Los dos de abajo son iguales y suman $180^\\circ - 40^\\circ = 140^\\circ$: 70° cada uno.')],
  ], 'Vecinos que completan 180°, paralelas que repiten ángulos, triángulos de 180° y polígonos hechos de triángulos.');
}
