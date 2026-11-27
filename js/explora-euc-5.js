// Geometría Euclidiana · mundo 5 «euc-circunferencia»: explicaciones Explora (spec 2026-11-26-curso-euclidiana).
// Escena «dibujo». Los ejemplos no son los de los ejercicios (js/courses/euclidiana-circunferencia.js).
{
  const R = Math.round, rad = g => g * Math.PI / 180, gr = n => `${R(n)}°`, n1 = x => String(R(x * 10) / 10);
  const at = (c, r, g) => [c[0] + r * Math.cos(rad(g)), c[1] - r * Math.sin(rad(g))];
  const gra = (c, x, y) => (Math.atan2(c[1] - y, x - c[0]) * 180 / Math.PI + 360) % 360;
  const vuelta = a => { const b = (a % 360 + 360) % 360; return b > 280 ? b - 360 : b; };
  const seg = (K, a, b, cls = '') => K.l(a[0], a[1], b[0], b[1], cls);
  const aro = (K, c, r, cls = '') => K.arc(c[0], c[1], r, 0, 360, cls);
  const arco = (K, c, r, a, b, cls = '') => K.arc(c[0], c[1], r, a, b, cls);
  const uni = (a, b) => { const m = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / m, (b[1] - a[1]) / m]; };
  const medio = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const pt = (K, q, t, c, d = 13) => { const u = uni(c, q); return K.c(q[0], q[1], 3.5, 'fk') + (t ? K.t(q[0] + u[0] * d, q[1] + u[1] * d + 4, t, 's') : ''); };
  const tx = (K, q, s, cls = '', a = 'middle') => K.t(q[0], q[1] + 4, s, cls, a);
  const recto = (K, T, a, b, s = 8) => { const u = uni(T, a), w = uni(T, b); return K.pl([[T[0] + u[0] * s, T[1] + u[1] * s], [T[0] + (u[0] + w[0]) * s, T[1] + (u[1] + w[1]) * s], [T[0] + w[0] * s, T[1] + w[1] * s]], 'lm'); };
  const corta = (P, Q, U, V) => { const d = (Q[0] - P[0]) * (V[1] - U[1]) - (Q[1] - P[1]) * (V[0] - U[0]), t = ((U[0] - P[0]) * (V[1] - U[1]) - (U[1] - P[1]) * (V[0] - U[0])) / (d || 1e-9); return medio(P, Q, t); };

  // ------------------------------------------------------------------------------------------------ lección 1
  // Radio, cuerda que sube hasta ser diámetro, y arco con su ángulo central.  v { cu, h, ar, a, su }
  const C1 = [170, 106], R1 = 80;
  const partes = (v, K) => {
    const y = C1[1] - v.h * R1, w = Math.sqrt(Math.max(0, 1 - v.h * v.h)) * R1, A = at(C1, R1, 0), B = at(C1, R1, v.a), m = at(C1, 44, 200);
    return aro(K, C1, R1) + seg(K, C1, at(C1, R1, 200), 'lg') + K.t(m[0], m[1] + 17, 'radio', 's tg')
      + K.f(v.cu, K.l(170 - w, y, 170 + w, y, 'la gr') + K.t(170, y - 9, v.h < 0.03 ? 'diámetro' : 'cuerda', 's ta'))
      + K.f(v.ar, K.sec(C1[0], C1[1], 26, 0, v.a, 'fg') + arco(K, C1, R1, 0, v.a, 'lf gr') + seg(K, C1, A) + seg(K, C1, B) + tx(K, at(C1, 46, v.a / 2), gr(v.a), 's tg') + tx(K, at(C1, R1 + 9, Math.min(v.a / 2, 80)), `arco de ${R(v.a)}°`, 's tf', 'start') + pt(K, A, 'A', C1, 11) + K.c(B[0], B[1], 3.5, 'fk'))
      + K.f(v.su, seg(K, C1, at(C1, R1, 60), 'lm d') + K.c(...at(C1, R1, 60), 3, 'fk')) + K.c(C1[0], C1[1], 3.5, 'fk');
  };
  // Cuerda a distancia d del centro, con el triángulo rectángulo.  v { r, d, per, tri, tw, oc }
  const cuerda = (v, K) => {
    const u = 80 / v.r, y = 100 + v.d * u, hc = Math.sqrt(Math.max(0, v.r * v.r - v.d * v.d)), w = hc * u, E = [170 + w, y], m = medio([170, 100], E);
    return aro(K, [170, 100], 80) + K.t(10, 20, v.oc ? 'cuerda: ?' : `cuerda: ${n1(2 * hc)}`, 'ta', 'start') + K.t(330, 20, `radio: ${v.r}`, 's tg', 'end')
      + K.f(v.tw, K.l(170 - w, 200 - y, 170 + w, 200 - y, 'la gr') + K.l(170, 100, 170, 200 - y, 'lf d'))
      + K.f(v.per, (v.d > 0.2 ? K.l(170, 100, 170, y, 'lf d') + K.t(162, 100 + v.d * u / 2 + 4, n1(v.d), 's tf', 'end') + recto(K, [170, y], [170, 100], E, 7) : ''))
      + K.f(v.tri, seg(K, [170, 100], E, 'lg') + K.t(m[0] + 8, m[1] - 6, v.r, 's tg', 'start') + (v.oc ? '' : K.t(170 + w / 2, y + 16, n1(hc), 's ta')))
      + K.l(170 - w, y, 170 + w, y, 'la gr') + K.c(170, 100, 3.5, 'fk');
  };
  // Una recta que se acerca: exterior, tangente, secante; y las dos tangentes desde P.  v { y, rad, pt }
  const C3 = [120, 100], R3 = 56;
  const recta = (v, K) => {
    const Y = 100 + v.y * R3, T = [120, 156], P = [266, 156], d = uni(C3, P), q = [T[0] - C3[0], T[1] - C3[1]], k = q[0] * d[0] + q[1] * d[1], T2 = [C3[0] + 2 * k * d[0] - q[0], C3[1] + 2 * k * d[1] - q[1]];
    const w = Math.sqrt(Math.max(0, 1 - v.y * v.y)) * R3;
    return K.t(10, 20, v.y > 1.02 ? 'recta exterior' : v.y > 0.98 ? 'recta tangente' : 'recta secante', 'ta', 'start') + K.t(330, 20, `radio 4 · distancia ${n1(v.y * 4)}`, 's tm', 'end')
      + aro(K, C3, R3) + K.l(20, Y, 320, Y, 'la gr') + (v.y < 0.98 ? K.c(120 - w, Y, 3.5, 'fk') + K.c(120 + w, Y, 3.5, 'fk') : v.y < 1.02 ? K.c(120, Y, 3.5, 'fk') : '')
      + K.f(v.rad, seg(K, C3, [120, Y], 'lg') + recto(K, [120, Y], C3, [160, Y]))
      + K.f(v.pt, seg(K, P, T2, 'lf gr') + seg(K, P, T, 'lf gr') + seg(K, C3, T2, 'lg') + recto(K, T2, C3, P) + K.c(T2[0], T2[1], 3.5, 'fk') + K.c(P[0], P[1], 4, 'fk') + K.t(P[0] + 4, P[1] + 20, 'P', 's'))
      + K.c(C3[0], C3[1], 3.5, 'fk');
  };
  // Segmento tangente desde un punto a distancia d (radio 6).  v { d, oc }
  const C4 = [80, 100];
  const desde = (v, K) => {
    const P = [80 + v.d * 10, 100], fi = Math.acos(Math.min(1, 6 / v.d)) * 180 / Math.PI, T = at(C4, 60, fi), m = medio(C4, T), n = medio(P, T);
    return aro(K, C4, 60) + seg(K, C4, P, 'lm d') + seg(K, P, at(C4, 60, -fi), 'lm') + seg(K, C4, T, 'lg') + recto(K, T, C4, P) + seg(K, P, T, 'la gr')
      + K.t(m[0] - 7, m[1] + 2, '6', 's tg', 'end') + K.t((80 + P[0]) / 2, 117, n1(v.d), 's tf') + K.t(n[0] + 6, n[1] - 8, v.oc ? '?' : n1(Math.sqrt(Math.max(0, v.d * v.d - 36))), 'ta', 'start') + pt(K, T, 'T', C4) + K.c(80, 100, 3.5, 'fk') + K.t(P[0] + 4, 84, 'P', 's');
  };
  // Dos circunferencias con los centros a distancia d.  v { R, r, u, x0, d }
  const nombre = v => (v.d > v.R + v.r + 0.03 ? 'exteriores' : v.d > v.R + v.r - 0.03 ? 'tangentes exteriores' : v.d > v.R - v.r + 0.03 ? 'secantes' : v.d > v.R - v.r - 0.03 ? 'tangentes interiores' : v.d > 0.03 ? 'interiores' : 'concéntricas');
  const dos = (v, K) => {
    const O = [v.x0, 104], Q = [v.x0 + v.d * v.u, 104];
    return K.t(10, 20, nombre(v), 'ta', 'start') + K.t(330, 20, `radios ${v.R} y ${v.r} · centros a ${n1(v.d)}`, 's tm', 'end') + aro(K, O, v.R * v.u) + aro(K, Q, v.r * v.u, 'la gr') + seg(K, O, Q, 'lf d') + K.c(O[0], O[1], 3.5, 'fk') + K.c(Q[0], Q[1], 3.5, 'fk');
  };

  xpLec('euc-circunferencia-1', [
    ['Radio, cuerda y arco',
      xpMira('dibujo', 'Empecemos por los nombres: qué es un **radio**, una **cuerda** y un **arco**.', { dib: partes, v: { cu: 0, h: 0.6, ar: 0, a: 70, su: 0 }, alto: 204 }, [
        ['Los puntos que están a una misma distancia del centro forman la circunferencia. Esa distancia es el radio.', {}],
        ['Un segmento que une dos puntos de la circunferencia se llama cuerda.', { cu: 1 }],
        ['Cuanto más cerca del centro, más larga. La que pasa por el centro es la mayor: el diámetro.', { h: 0 }, '$d = 2r$'],
        ['El trozo de circunferencia entre dos puntos es un arco. Lo abre un ángulo con el vértice en el centro.', { cu: 0, ar: 1 }],
        ['El arco mide lo mismo que su ángulo central. Si el ángulo crece a 130°, el arco también.', { a: 130 }, '$130^\\circ$'],
        ['Dos arcos seguidos se suman, igual que sus ángulos: uno de 60° y otro de 70° hacen 130°.', { su: 1 }, '$60^\\circ + 70^\\circ = 130^\\circ$'],
      ], 'Una cuerda une dos puntos; la mayor es el diámetro. Un arco mide lo mismo que su ángulo central.'),
      xpHaz('dibujo', 'El primer arco mide 60°. Abre el ángulo central hasta que el arco completo, desde A, mida 150°.', { dib: partes, v: { cu: 0, h: 0.6, ar: 1, a: 90, su: 1 }, metas: { a: 150 }, alto: 204,
        manijas: [{ k: 'a', min: 70, max: 170, paso: 10, en: v => at(C1, R1, v.a), de: (x, y) => gra(C1, x, y) }],
        lee: v => `$60^\\circ + ${v.a - 60}^\\circ = ${v.a}^\\circ$`, dice: v => `El segundo arco mide ${v.a - 60}°. Con el primero, ${v.a}°.` }, 'Los arcos seguidos se suman: $60^\\circ + 90^\\circ = 150^\\circ$.')],
    ['La cuerda y el centro',
      xpMira('dibujo', 'Segunda idea: qué tiene que ver una **cuerda** con el **centro**.', { dib: cuerda, v: { r: 5, d: 3, per: 0, tri: 0, tw: 0, oc: 0 }, alto: 200 }, [
        ['Una cuerda en una circunferencia de radio 5. Tracemos desde el centro la perpendicular a la cuerda.', {}],
        ['La perpendicular cae justo en el punto medio: el radio perpendicular a una cuerda la biseca.', { per: 1 }],
        ['Con un radio hasta el extremo aparece un triángulo rectángulo: radio, media cuerda y distancia.', { tri: 1 }],
        ['Radio 5 y distancia 3: por Pitágoras la media cuerda mide 4, y la cuerda entera, 8.', {}, '$\\sqrt{5^2 - 3^2} = 4$'],
        ['Si la cuerda se aleja del centro, se acorta: a distancia 4, la mitad mide 3 y la cuerda 6.', { d: 4 }, '$\\sqrt{5^2 - 4^2} = 3$'],
        ['Y dos cuerdas congruentes quedan a la misma distancia del centro: equidistan.', { tw: 1 }],
      ], 'El radio perpendicular a una cuerda la biseca: radio, media cuerda y distancia forman un triángulo rectángulo.'),
      xpHaz('dibujo', 'El radio mide 10. Mueve la cuerda hasta que mida 12.', { dib: cuerda, v: { r: 10, d: 2, per: 1, tri: 1, tw: 0, oc: 1 }, metas: { d: 8 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 9, paso: 1, en: v => [170, 100 + v.d * 8], de: (x, y) => (y - 100) / 8 }],
        lee: v => `$10^2 - ${v.d}^2 = ${100 - v.d * v.d}$`, dice: v => `A distancia ${v.d}, la media cuerda al cuadrado vale ${100 - v.d * v.d}.` }, 'Media cuerda 6 y radio 10: la distancia es $\\sqrt{10^2 - 6^2} = 8$.')],
    ['Rectas tangentes',
      xpMira('dibujo', 'Tercera idea: cómo puede quedar una **recta** frente a una circunferencia.', { dib: recta, v: { y: 1.4, rad: 0, pt: 0 }, alto: 200 }, [
        ['Una recta puede no tocar la circunferencia: es exterior. Está más lejos del centro que el radio.', {}],
        ['Si se acerca hasta tocarla en un solo punto es tangente: su distancia al centro es justo el radio.', { y: 1 }],
        ['El radio que llega al punto de tangencia es perpendicular a la tangente. Siempre.', { rad: 1 }],
        ['Más cerca todavía, la recta corta la circunferencia en dos puntos: es secante.', { y: 0.5, rad: 0 }],
        ['Volvamos a la tangente. Desde un punto exterior P se pueden trazar dos tangentes.', { y: 1, pt: 1 }],
        ['Los dos segmentos tangentes, de P a cada punto de tangencia, son congruentes.', { rad: 1 }],
      ], 'La tangente es perpendicular al radio en el punto de tangencia; dos tangentes desde un punto son congruentes.'),
      xpHaz('dibujo', 'El radio mide 6. Aleja o acerca P hasta que el segmento tangente PT mida 8.', { dib: desde, v: { d: 14, oc: 1 }, metas: { d: 10 }, alto: 200,
        manijas: [{ k: 'd', min: 7, max: 22, paso: 1, en: v => [80 + v.d * 10, 100], de: x => (x - 80) / 10 }],
        lee: v => `$${v.d}^2 - 6^2 = ${v.d * v.d - 36}$`, dice: v => `P está a ${v.d} del centro: la tangente al cuadrado vale ${v.d * v.d - 36}.` }, 'Radio y tangente son perpendiculares: $OP = \\sqrt{6^2 + 8^2} = 10$.')],
    ['Dos circunferencias',
      xpMira('dibujo', 'Cuarta idea: cómo pueden quedar **dos circunferencias**, una frente a otra.', { dib: dos, v: { R: 5, r: 3, u: 10, x0: 100, d: 10 }, alto: 200 }, [
        ['Dos circunferencias de radios 5 y 3. Con los centros a 10, ni se tocan: son exteriores.', {}],
        ['A distancia 8, que es la suma de los radios, se tocan por fuera en un punto: tangentes exteriores.', { d: 8 }, '$5 + 3 = 8$'],
        ['Entre la suma y la resta de los radios se cortan en dos puntos: son secantes.', { d: 5 }],
        ['A distancia 2, que es la resta de los radios, se tocan por dentro: tangentes interiores.', { d: 2 }, '$5 - 3 = 2$'],
        ['Más cerca, una queda dentro de la otra sin tocarla: son interiores.', { d: 1 }],
        ['Y cuando los centros coinciden, son concéntricas.', { d: 0 }],
      ], 'Tangentes exteriores: los centros distan la suma de los radios. Tangentes interiores: distan la resta.'),
      xpHaz('dibujo', 'Los radios miden 6 y 2. Arrastra el centro pequeño hasta que queden tangentes exteriores.', { dib: dos, v: { R: 6, r: 2, u: 12, x0: 90, d: 11 }, metas: { d: 8 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 12, paso: 1, en: v => [90 + v.d * 12, 104], de: x => (x - 90) / 12 }],
        lee: v => `$d = ${v.d}$`, dice: v => `Con los centros a ${v.d} quedan ${nombre(v)}.` }, 'Se tocan por fuera cuando los centros distan la suma de los radios: $6 + 2 = 8$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un túnel de sección circular tiene radio 13 m. Su piso, plano, debe medir 24 m de ancho. Bájalo a la distancia del centro que lo logra.', { dib: cuerda, v: { r: 13, d: 2, per: 1, tri: 1, tw: 0, oc: 1 }, metas: { d: 5 }, alto: 200,
        manijas: [{ k: 'd', min: 0, max: 12, paso: 1, en: v => [170, 100 + v.d * 80 / 13], de: (x, y) => (y - 100) * 13 / 80 }],
        lee: v => `$13^2 - ${v.d}^2 = ${169 - v.d * v.d}$`, dice: v => `A ${v.d} m del centro, medio piso al cuadrado vale ${169 - v.d * v.d}.` }, 'Medio piso mide 12 m: la distancia al centro es $\\sqrt{13^2 - 12^2} = 5$ m.')],
  ], 'Cuerdas que el radio perpendicular biseca, tangentes perpendiculares al radio y circunferencias que se comparan por sus centros.');

  // ------------------------------------------------------------------------------------------------ lección 2
  // Arco AB con su central y un inscrito desde P.  v { a, p, ce, ins, oc }
  const C5 = [170, 108], R5 = 80;
  const inscrito = (v, K) => {
    const A = at(C5, R5, 160), B = at(C5, R5, 160 - v.a), P = at(C5, R5, v.p);
    return aro(K, C5, R5) + arco(K, C5, R5, 160 - v.a, 160, 'lg gr')
      + K.f(v.ce, K.sec(C5[0], C5[1], 22, 160 - v.a, 160, 'fg') + tx(K, at(C5, 38, 160 - v.a / 2), gr(v.a), 's tg') + seg(K, C5, A, 'lg') + seg(K, C5, B, 'lg'))
      + K.f(v.ins, K.ang(P, A, B, 26, v.oc ? '?' : gr(v.a / 2), 'fa', 'ta') + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr') + pt(K, P, 'P', C5))
      + pt(K, A, 'A', C5) + K.c(C5[0], C5[1], 3.5, 'fk') + K.t(B[0] + uni(C5, B)[0] * 20, B[1] + uni(C5, B)[1] * 20 + 4, 'B', 's');
  };
  // Cuadrilátero inscrito con D móvil.  v { d, fb, fd, ac, oc }
  const cuadri = (v, K) => {
    const A = at(C5, R5, 150), B = at(C5, R5, 40), C = at(C5, R5, 310), D = at(C5, R5, v.d);
    return aro(K, C5, R5) + K.f(v.fb, arco(K, C5, R5, 150, 310, 'la gr') + K.ang(B, A, C, 22, '80°', 'fa', 'ta')) + K.f(v.fd, arco(K, C5, R5, -50, 150, 'lg gr') + K.ang(D, C, A, 22, '100°', 'fg', 'tg'))
      + K.f(v.ac, K.ang(A, D, B, 20, v.oc ? '?' : gr((400 - v.d) / 2), 'ff', 'tf') + K.ang(C, B, D, 20, gr((v.d - 40) / 2), 'fo', 'to'))
      + K.p([A, B, C, D], 'fn') + pt(K, A, 'A', C5) + pt(K, B, 'B', C5) + pt(K, C, 'C', C5) + K.c(D[0], D[1], 3.5, 'fk') + K.t(D[0] + uni(C5, D)[0] * 20, D[1] + uni(C5, D)[1] * 20 + 4, 'D', 's');
  };
  const mueveB = { k: 'a', min: 20, max: 200, paso: 10, en: v => at(C5, R5, 160 - v.a), de: (x, y) => vuelta(160 - gra(C5, x, y)) };

  xpLec('euc-circunferencia-2', [
    ['Central e inscrito',
      xpMira('dibujo', 'Dos ángulos miran el mismo arco: uno desde el **centro** y otro desde la **circunferencia**.', { dib: inscrito, v: { a: 80, p: 255, ce: 1, ins: 0, oc: 0 }, alto: 212 }, [
        ['Un ángulo con el vértice en el centro es central. Mide exactamente lo que su arco: aquí, 80°.', {}],
        ['Si el vértice está sobre la circunferencia y los lados son cuerdas, el ángulo es inscrito.', { ins: 1 }],
        ['El inscrito mira el mismo arco, pero desde más lejos: abre la mitad. Mide 40°.', {}, '$80^\\circ \\div 2 = 40^\\circ$'],
        ['Si el arco crece a 120°, el central lo sigue y el inscrito vuelve a ser la mitad: 60°.', { a: 120 }, '$120^\\circ \\div 2 = 60^\\circ$'],
        ['Ahora se mueve el vértice. Mientras abarque el mismo arco, el inscrito no cambia.', { p: 320 }],
        ['En cualquier punto sigue midiendo 60°: los inscritos en el mismo arco son congruentes.', { p: 200 }],
      ], 'El central mide lo que su arco; el inscrito, la mitad. Inscritos que abarcan el mismo arco son congruentes.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo inscrito, el de P, mida 35°.', { dib: inscrito, v: { a: 110, p: 255, ce: 1, ins: 1, oc: 1 }, metas: { a: 70 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco y el central miden ${v.a}°. El inscrito es la mitad.` }, 'El inscrito es la mitad del arco: para 35° hace falta un arco de 70°.')],
    ['La semicircunferencia',
      xpMira('dibujo', 'Un caso especial: cuando el arco es **media circunferencia**.', { dib: inscrito, v: { a: 100, p: 250, ce: 1, ins: 1, oc: 0 }, alto: 212 }, [
        ['Volvamos al inscrito: con un arco de 100°, mide 50°.', {}, '$100^\\circ \\div 2 = 50^\\circ$'],
        ['Abramos el arco hasta media circunferencia. La cuerda AB pasa por el centro: es un diámetro.', { a: 180 }],
        ['El inscrito es la mitad de 180°: un ángulo recto.', {}, '$180^\\circ \\div 2 = 90^\\circ$'],
        ['Y no importa dónde esté el vértice: todo ángulo inscrito en una semicircunferencia es recto.', { p: 300 }],
        ['Por eso un triángulo con un lado que es diámetro y el otro vértice en la circunferencia es rectángulo.', { p: 215 }],
      ], 'Todo ángulo inscrito en una semicircunferencia es recto: abarca 180° y mide la mitad.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo en P sea recto.', { dib: inscrito, v: { a: 120, p: 255, ce: 0, ins: 1, oc: 1 }, metas: { a: 180 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco AB mide ${v.a}°. ${v.a === 180 ? 'AB es un diámetro.' : 'AB todavía no pasa por el centro.'}` }, 'Recto es la mitad de 180°: AB tiene que ser un diámetro.')],
    ['Cuadrilátero inscrito',
      xpMira('dibujo', 'Ahora cuatro puntos: un **cuadrilátero** con los vértices en la circunferencia.', { dib: cuadri, v: { d: 230, fb: 0, fd: 0, ac: 0, oc: 0 }, alto: 212 }, [
        ['Un cuadrilátero con sus cuatro vértices en la circunferencia está inscrito en ella.', {}],
        ['El ángulo en B es inscrito: abarca el arco ADC, de 160°, y mide 80°.', { fb: 1 }, '$160^\\circ \\div 2 = 80^\\circ$'],
        ['El de enfrente, en D, abarca el resto de la circunferencia: 200°. Mide 100°.', { fd: 1 }, '$200^\\circ \\div 2 = 100^\\circ$'],
        ['Los dos arcos completan los 360°, así que los dos ángulos suman 180°: son suplementarios.', {}, '$80^\\circ + 100^\\circ = 180^\\circ$'],
        ['Aunque D se mueva, sigue abarcando el mismo arco: la suma no cambia.', { d: 250 }],
        ['Con la otra pareja, A y C, pasa lo mismo: los opuestos siempre son suplementarios.', { ac: 1 }, '$75^\\circ + 105^\\circ = 180^\\circ$'],
      ], 'En un cuadrilátero inscrito, los ángulos opuestos son suplementarios: sus arcos completan la circunferencia.'),
      xpHaz('dibujo', 'Mueve D hasta que el ángulo en A, el que no se ve, mida 70°. Fíjate en su opuesto.', { dib: cuadri, v: { d: 220, fb: 0, fd: 0, ac: 1, oc: 1 }, metas: { d: 260 }, alto: 212,
        manijas: [{ k: 'd', min: 200, max: 280, paso: 10, en: v => at(C5, R5, v.d), de: (x, y) => gra(C5, x, y) }],
        lee: v => `$? + ${(v.d - 40) / 2}^\\circ = 180^\\circ$`, dice: v => `El ángulo en C mide ${(v.d - 40) / 2}°. El de A es su opuesto.` }, 'El opuesto debe medir $180^\\circ - 70^\\circ = 110^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una cámara en el borde de una plaza circular, en P, abarca 45°. Abre el arco del escenario AB hasta que quepa justo en la toma.', { dib: inscrito, v: { a: 40, p: 255, ce: 1, ins: 1, oc: 1 }, metas: { a: 90 }, alto: 212, manijas: [mueveB],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El escenario ocupa un arco de ${v.a}°. La cámara lo ve con la mitad.` }, 'La cámara es un ángulo inscrito: ve un arco del doble, $2 \\cdot 45^\\circ = 90^\\circ$.')],
  ], 'El central mide su arco y el inscrito, la mitad: recto en media circunferencia, y opuestos suplementarios en un cuadrilátero.');

  // ------------------------------------------------------------------------------------------------ lección 3
  // Tangente en A y cuerda AB.  v { a, ins, oc }
  const C6 = [170, 100], R6 = 76, A6 = [170, 176];
  const semi = (v, K) => {
    const B = at(C6, R6, 270 + v.a), Q = at(C6, R6, 150);
    return aro(K, C6, R6) + K.l(24, 176, 316, 176) + arco(K, C6, R6, 270, 270 + v.a, 'lg gr') + tx(K, at(C6, R6 + 17, 270 + v.a / 2), gr(v.a), 's tg')
      + K.f(v.ins, K.ang(Q, A6, B, 22, gr(v.a / 2), 'ff', 'tf') + seg(K, Q, A6, 'lf') + seg(K, Q, B, 'lf') + K.c(Q[0], Q[1], 3.5, 'fk'))
      + K.ang(A6, [240, 176], B, 28, v.oc ? '?' : gr(v.a / 2), 'fa', 'ta') + seg(K, A6, B, 'la gr') + K.c(170, 176, 3.5, 'fk') + K.t(156, 193, 'A', 's') + K.c(C6[0], C6[1], 3, 'fk') + K.t(B[0] - uni(C6, B)[0] * 18, B[1] - uni(C6, B)[1] * 18 + 4, 'B', 's');
  };
  // Dos cuerdas que se cortan.  v { ab, cd, oc }
  const C7 = [170, 106], R7 = 80;
  const cruce = (v, K) => {
    const A = at(C7, R7, 90 + v.ab / 2), B = at(C7, R7, 90 - v.ab / 2), C = at(C7, R7, 300), D = at(C7, R7, 300 - v.cd), X = corta(A, C, B, D);
    return aro(K, C7, R7) + arco(K, C7, R7, 90 - v.ab / 2, 90 + v.ab / 2, 'lg gr') + arco(K, C7, R7, 300 - v.cd, 300, 'lf gr') + tx(K, at(C7, R7 + 15, 90), gr(v.ab), 's tg') + tx(K, at(C7, R7 + 17, 300 - v.cd / 2), gr(v.cd), 's tf')
      + K.ang(X, A, B, 20, '', 'fa') + K.t(10, 20, `ángulo: ${v.oc ? '?' : gr((v.ab + v.cd) / 2)}`, 'ta', 'start') + seg(K, A, C, 'la') + seg(K, B, D, 'la') + pt(K, A, 'A', C7) + pt(K, B, 'B', C7) + pt(K, C, 'C', C7) + K.c(X[0], X[1], 3, 'fk') + K.t(D[0] - uni(C7, D)[0] * 18, D[1] - uni(C7, D)[1] * 18 + 4, 'D', 's');
  };
  // Vértice afuera: dos secantes (cual 0) o dos tangentes (cual 1).  v { cual, m, n, a, oc }
  const C8 = [100, 104], R8 = 72, C9 = [92, 104], R9 = 52;
  const afuera = (v, K) => {
    if (v.cual < 0.5) {
      const P = [C8[0] + R8 * Math.cos(rad(v.n / 2)) + R8 * Math.sin(rad(v.n / 2)) / Math.tan(rad(Math.max(4, v.m - v.n) / 4)), 104], F1 = at(C8, R8, 180 - v.m / 2), F2 = at(C8, R8, 180 + v.m / 2);
      return aro(K, C8, R8) + arco(K, C8, R8, 180 - v.m / 2, 180 + v.m / 2, 'lf gr') + arco(K, C8, R8, -v.n / 2, v.n / 2, 'lg gr') + tx(K, at(C8, R8 - 22, 180), gr(v.m), 's tf') + tx(K, at(C8, R8 - 18, 0), gr(v.n), 's tg')
        + K.ang(P, F1, F2, 30, '', 'fa') + seg(K, F1, P, 'la') + seg(K, F2, P, 'la') + K.c(F1[0], F1[1], 3, 'fk') + K.c(P[0], P[1], 3.5, 'fk') + K.t(Math.min(318, P[0] + 2), 84, v.oc ? '?' : gr((v.m - v.n) / 2), 'ta') + K.t(Math.min(322, P[0] + 4), 124, 'P', 's');
    }
    const h = 90 - v.a / 2, P = [C9[0] + R9 / Math.sin(rad(v.a / 2)), 104], T1 = at(C9, R9, h), T2 = at(C9, R9, -h);
    return aro(K, C9, R9) + arco(K, C9, R9, -h, h, 'lg gr') + arco(K, C9, R9, h, 360 - h, 'lf gr') + K.t(C9[0] + R9 - 20, 108, gr(180 - v.a), 's tg') + K.t(C9[0] - R9 - 5, 108, gr(180 + v.a), 's tf', 'end')
      + seg(K, C9, T1, 'lm') + seg(K, C9, T2, 'lm') + recto(K, T1, C9, P, 7) + recto(K, T2, C9, P, 7) + K.ang(P, T1, T2, 26, '', 'fa') + seg(K, P, T1, 'la gr') + seg(K, P, T2, 'la gr')
      + K.c(T1[0], T1[1], 3, 'fk') + K.c(T2[0], T2[1], 3, 'fk') + K.c(C9[0], C9[1], 3, 'fk') + K.t(330, 20, `ángulo en P: ${v.oc ? '?' : gr(v.a)}`, 'ta', 'end') + K.t(Math.min(322, P[0]), 128, 'P', 's');
  };

  xpLec('euc-circunferencia-3', [
    ['Semiinscrito: tangente y cuerda',
      xpMira('dibujo', 'Un ángulo nuevo: entre una **tangente** y una **cuerda** que sale del punto de tangencia.', { dib: semi, v: { a: 100, ins: 0, oc: 0 }, alto: 206 }, [
        ['Un lado es tangente y el otro una cuerda que sale del punto de tangencia: es un ángulo semiinscrito.', {}],
        ['Abarca el arco que queda dentro de él. Y mide la mitad de ese arco, igual que un inscrito.', {}, '$100^\\circ \\div 2 = 50^\\circ$'],
        ['De hecho, un inscrito que abarca ese mismo arco mide lo mismo: 50°.', { ins: 1 }],
        ['Si la cuerda pasa por el centro, el arco mide 180° y el ángulo es recto: tangente y radio.', { a: 180, ins: 0 }, '$180^\\circ \\div 2 = 90^\\circ$'],
        ['Con un arco pequeño, de 60°, la cuerda se acuesta sobre la tangente: 30°.', { a: 60 }, '$60^\\circ \\div 2 = 30^\\circ$'],
      ], 'El ángulo semiinscrito, entre una tangente y una cuerda, mide la mitad del arco que abarca.'),
      xpHaz('dibujo', 'Mueve B hasta que el ángulo semiinscrito mida 65°.', { dib: semi, v: { a: 60, ins: 0, oc: 1 }, metas: { a: 130 }, alto: 206,
        manijas: [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(C6, R6, 270 + v.a), de: (x, y) => vuelta(gra(C6, x, y) - 270) }],
        lee: v => `$${v.a}^\\circ \\div 2$`, dice: v => `El arco entre la tangente y la cuerda mide ${v.a}°.` }, 'La mitad del arco: para 65° hace falta un arco de 130°.')],
    ['Vértice adentro',
      xpMira('dibujo', 'Ahora el vértice se mete **dentro** del círculo: dos cuerdas que se cortan.', { dib: cruce, v: { ab: 60, cd: 100, oc: 0 }, alto: 214 }, [
        ['Dos cuerdas que se cortan dentro del círculo forman un ángulo interior. No es central ni inscrito.', {}],
        ['Abarca dos arcos: el que tiene enfrente y el que abarca su opuesto por el vértice.', {}],
        ['Mide la semisuma de esos dos arcos, es decir, su promedio.', {}, '$\\tfrac{60^\\circ + 100^\\circ}{2} = 80^\\circ$'],
        ['Si uno de los arcos crece, el ángulo crece la mitad de eso.', { cd: 140 }, '$\\tfrac{60^\\circ + 140^\\circ}{2} = 100^\\circ$'],
        ['Y si los dos arcos son iguales, el promedio es ese valor: las cuerdas se cortan en el centro.', { cd: 60 }, '$\\tfrac{60^\\circ + 60^\\circ}{2} = 60^\\circ$'],
      ], 'Un ángulo interior, formado por dos cuerdas que se cortan, mide la semisuma de los arcos que abarca.'),
      xpHaz('dibujo', 'El arco de arriba mide 60°. Mueve D hasta que el ángulo interior mida 75°.', { dib: cruce, v: { ab: 60, cd: 40, oc: 1 }, metas: { cd: 90 }, alto: 214,
        manijas: [{ k: 'cd', min: 20, max: 160, paso: 10, en: v => at(C7, R7, 300 - v.cd), de: (x, y) => vuelta(300 - gra(C7, x, y)) }],
        lee: v => `$\\tfrac{60^\\circ + ${v.cd}^\\circ}{2}$`, dice: v => `Los dos arcos suman ${60 + v.cd}°. El ángulo es la mitad de esa suma.` }, 'Los arcos deben sumar 150°: $150^\\circ - 60^\\circ = 90^\\circ$.')],
    ['Vértice afuera',
      xpMira('dibujo', 'Por último, el vértice sale **fuera** del círculo: secantes y tangentes.', { dib: afuera, v: { cual: 0, m: 140, n: 40, a: 60, oc: 0 }, alto: 208 }, [
        ['Dos secantes que salen de un punto exterior forman un ángulo exterior. Abarca un arco lejano y uno cercano.', {}],
        ['Mide la semidiferencia: la mitad de lo que el arco lejano le lleva al cercano.', {}, '$\\tfrac{140^\\circ - 40^\\circ}{2} = 50^\\circ$'],
        ['Si el arco lejano crece, el punto se acerca y el ángulo se abre.', { m: 200 }, '$\\tfrac{200^\\circ - 40^\\circ}{2} = 80^\\circ$'],
        ['Con dos tangentes pasa igual: los arcos son el mayor y el menor entre los puntos de tangencia.', { cual: 1 }],
        ['Aquí los arcos miden 240° y 120°: el ángulo entre las tangentes es de 60°.', {}, '$\\tfrac{240^\\circ - 120^\\circ}{2} = 60^\\circ$'],
        ['Si el punto se acerca, el ángulo se abre: con arcos de 270° y 90° es recto.', { a: 90 }, '$\\tfrac{270^\\circ - 90^\\circ}{2} = 90^\\circ$'],
      ], 'Un ángulo exterior (dos secantes, secante y tangente o dos tangentes) mide la semidiferencia de sus arcos.'),
      xpHaz('dibujo', 'El arco cercano mide 40°. Abre las secantes hasta que el ángulo en P mida 60°.', { dib: afuera, v: { cual: 0, m: 100, n: 40, a: 60, oc: 1 }, metas: { m: 160 }, alto: 208,
        manijas: [{ k: 'm', min: 80, max: 240, paso: 10, en: v => at(C8, R8, 180 + v.m / 2), de: (x, y) => 2 * (gra(C8, x, y) - 180) }],
        lee: v => `$\\tfrac{${v.m}^\\circ - 40^\\circ}{2}$`, dice: v => `El arco lejano le lleva ${v.m - 40}° al cercano. El ángulo es la mitad.` }, 'La resta debe ser 120°: el arco lejano mide $120^\\circ + 40^\\circ = 160^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Desde un mirador P, las dos visuales tangentes a un lago circular deben formar 40°. Aleja o acerca el mirador hasta lograrlo.', { dib: afuera, v: { cual: 1, m: 140, n: 40, a: 80, oc: 1 }, metas: { a: 40 }, alto: 208,
        manijas: [{ k: 'a', min: 30, max: 130, paso: 10, en: v => [C9[0] + R9 / Math.sin(rad(v.a / 2)), 104], de: x => (x - C9[0] <= R9 ? 180 : 2 * Math.asin(R9 / (x - C9[0])) * 180 / Math.PI) }],
        lee: v => `$\\tfrac{${180 + v.a}^\\circ - ${180 - v.a}^\\circ}{2}$`, dice: v => `Orilla a la vista: ${180 - v.a}°. Orilla oculta: ${180 + v.a}°.` }, 'Los arcos deben restar 80° y sumar 360°: miden 220° y 140°.')],
  ], 'Sobre la circunferencia, la mitad del arco; adentro, la semisuma de los arcos; afuera, la semidiferencia.');
}
