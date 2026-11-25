// Preicfes · Matemáticas, mundo 4 «Áreas y Volúmenes» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rectángulo de b × h en cuadros de 20, con su triángulo (f) y la punta en x.
  const rect = (v, K) => { const u = 18, x0 = 60, y0 = 160, b = v.b * u, h = v.h * u; let s = K.r(x0, y0 - h, b, h, 'fn', 2);
    for (let i = 1; i < v.b - 0.01; i++) s += K.l(x0 + i * u, y0 - h, x0 + i * u, y0, 'ls'); for (let j = 1; j < v.h - 0.01; j++) s += K.l(x0, y0 - j * u, x0 + b, y0 - j * u, 'ls');
    return s + K.f(v.f, K.p([[x0, y0], [x0 + b, y0], [x0 + v.x * u, y0 - h]], 'fa')) + K.t(x0 + b / 2, 182, Math.round(v.b), 's tm') + K.t(x0 - 14, y0 - h / 2, Math.round(v.h), 's tm') + K.t(190, 16, v.t || '', 'ta'); };
  // Trapecio de bases B y b y el rectángulo del promedio (f).
  const trap = (v, K) => { const u = 16, c = 170, B = v.B * u / 2, b = v.k * u / 2, m = (v.B + v.k) * u / 4; return K.p([[c - B, 150], [c + B, 150], [c + b, 70], [c - b, 70]], 'fa') + K.f(v.f, K.r(c - m, 70, 2 * m, 80, 'fg', 0)) + K.t(c, 168, Math.round(v.B), 's tm') + K.t(c, 60, Math.round(v.k), 's tm') + K.t(c, 24, v.t || '', 'ta'); };
  // Círculo de radio r (u = 12) con sector a grados.
  const circ = (v, K) => K.c(170, 92, v.r * 12, 'fn') + K.sec(170, 92, v.r * 12, 0, v.a, 'fa') + K.c(170, 92, v.q * 12, 'fF') + K.l(170, 92, 170 + v.r * 12, 92, 'lg') + K.t(170 + v.r * 6, 84, `r = ${Math.round(v.r)}`, 's') + K.t(170, 186, v.t || '', 'ta');
  // Figura compuesta: casa.
  const casa = (v, K) => K.r(110, 90, 120, 70, 'fa', 0) + K.p([[110, 90], [230, 90], [170, 90 - v.t0]], 'fg') + K.f(v.f, K.r(110, 30, 120, 130, '', 0) + K.p([[110, 30], [170, 30], [110, 90]], 'fF') + K.p([[230, 30], [170, 30], [230, 90]], 'fF')) + K.t(170, 182, v.t || '', 'ta');
  const pila = (v, K) => K.caja([170, 170], 20, 4, 3, v.c, 'fa') + K.t(60, 40, v.t || '', 'ta', 'start');
  // Cilindro y cono de igual base; n: tercios llenos.
  const cono = (v, K) => K.p([[60, 40], [140, 40], [100, 160]], 'fg') + K.r(200, 40, 80, 120, 'fn', 4) + K.r(200, 160 - v.n * 40, 80, v.n * 40, 'fa', 2) + K.t(100, 180, 'cono', 's tm') + K.t(240, 180, 'cilindro', 's tm') + K.t(170, 20, v.t || '', 'ta');

  xpLec('icf-ma-medida-1', [
    ['Borde y superficie',
      xpMira('dibujo', 'Empecemos por la idea: **rodear** no es lo mismo que **cubrir**.', { dib: rect, v: { b: 8, h: 5, f: 0, x: 4, t: '' }, alto: 196 }, [
        ['Cubrir: ocho cuadros por fila, cinco filas.', { t: 'área: 40' }, '$8 \\cdot 5 = 40$'],
        ['Rodear: se suman los cuatro lados.', { t: 'perímetro: 26' }, '$2 \\cdot (8 + 5) = 26$'],
        ['Con el mismo borde, otro rectángulo: 10 por 3.', { b: 10, h: 3, t: 'perímetro: 26' }],
        ['Y su área es otra, aunque el borde no cambió.', { t: 'área: 30' }, '$10 \\cdot 3 = 30$'],
        ['El borde no decide la superficie.', {}],
      ], 'Perímetro: se rodea, en metros. Área: se cubre, en metros cuadrados.'),
      xpHaz('fichas', 'Una cancha mide 12 m por 7 m. Pon su borde y su superficie.', { slots: fila('borde (m)', 'superficie (m²)'), fichas: ['38', '84', '19', '48', '24'], meta: ['38', '84'], alto: 96, pista: 'El borde suma los cuatro lados; la superficie multiplica.' }, '$2 \\cdot 19 = 38$ y $12 \\cdot 7 = 84$.')],
    ['Medio rectángulo',
      xpMira('dibujo', 'Segunda idea: el triángulo es **la mitad** de su rectángulo.', { dib: rect, v: { b: 8, h: 6, f: 0, x: 3, t: '' }, alto: 196 }, [
        ['El rectángulo tiene 48 cuadros.', { t: '48' }],
        ['El triángulo ocupa la mitad: 24.', { f: 1, t: '24' }, '$\\tfrac{8 \\cdot 6}{2} = 24$'],
        ['Si la punta se corre a un lado, sigue valiendo 24.', { x: 7 }],
        ['Solo importan la base y la altura.', { x: 1 }],
        ['La altura va derecha, nunca por el lado inclinado.', {}],
      ], 'Triángulo: base por altura entre 2.'),
      xpHaz('dibujo', 'La base mide 10. Mueve la altura hasta que el triángulo tenga área **25**.', { dib: (v, K) => rect({ b: 10, h: v.h, f: 1, x: 4 }, K), v: { h: 2 }, metas: { h: 5 }, alto: 250, manijas: [{ k: 'h', min: 1, max: 7, paso: 1, et: 'altura' }], lee: v => `$10 \\cdot ${v.h} \\div 2 = ${5 * v.h}$`, dice: () => 'Es la mitad del rectángulo.' }, '$10 \\cdot 5 \\div 2 = 25$.')],
    ['El promedio de las bases',
      xpMira('dibujo', 'Tercera idea: un trapecio vale lo mismo que un rectángulo con el **promedio** de sus bases.', { dib: trap, v: { B: 14, k: 6, f: 0, t: '' }, alto: 180 }, [
        ['Una base mide 14 y la otra, 6.', {}],
        ['A mitad de camino está el 10.', { t: 'promedio: 10' }, '$(14 + 6) \\div 2 = 10$'],
        ['Las puntas que sobran llenan los huecos.', { f: 1 }],
        ['Con altura 5, el área es 50.', { t: 'área: 50' }, '$10 \\cdot 5 = 50$'],
        ['Y un rombo: la mitad del rectángulo de sus diagonales.', {}],
      ], 'Trapecio: promedio de bases por altura. Rombo: diagonales entre 2.'),
      xpHaz('fichas', 'Un trapecio tiene bases 11 y 5 y altura 4. Pon el promedio de las bases y el área.', { slots: fila('promedio', 'área'), fichas: ['8', '32', '16', '64', '220'], meta: ['8', '32'], alto: 96, pista: 'Suma las bases, parte en dos y multiplica por la altura.' }, '$(11 + 5) \\div 2 = 8$ y $8 \\cdot 4 = 32$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A un cuadrado de lado 3 se le triplican los lados. Pon por cuánto se multiplican su borde y su área.', { slots: fila('borde', 'área'), fichas: ['3', '9', '6', '27', '12'], meta: ['3', '9'], alto: 96, pista: 'Calcula el borde y el área antes y después.' }, 'Borde: 12 a 36, por 3. Área: 9 a 81, por 9.')],
  ], 'Rodear suma lados; cubrir cuenta cuadros; y si los lados crecen, el área crece más.');

  xpLec('icf-ma-medida-2', [
    ['El círculo',
      xpMira('dibujo', 'Empecemos por la idea: el borde mide $2\\pi r$ y la superficie, $\\pi r^2$.', { dib: circ, v: { r: 3, a: 0, q: 0, t: '' }, alto: 200 }, [
        ['Radio 3: el borde mide seis veces π.', { t: 'borde: 6π' }, '$2 \\cdot 3 = 6$'],
        ['La superficie mide nueve veces π.', { a: 360, t: 'área: 9π' }, '$3 \\cdot 3 = 9$'],
        ['Con radio 6, el borde se duplica.', { r: 6, t: 'borde: 12π' }, '$2 \\cdot 6 = 12$'],
        ['Pero la superficie se hace cuatro veces mayor.', { t: 'área: 36π' }, '$6 \\cdot 6 = 36$'],
        ['Una rueda que da una vuelta avanza su borde.', { t: '1 vuelta = 12π' }],
      ], 'Borde 2πr, superficie πr². Una vuelta avanza el borde.'),
      xpHaz('fichas', 'Un disco tiene **diámetro** 10. Pon su borde y su superficie, contados en π.', { slots: fila('borde', 'superficie'), fichas: ['10', '25', '20', '100', '5'], meta: ['10', '25'], alto: 96, pista: 'El radio es la mitad del diámetro.' }, 'Radio 5: borde $10\\pi$ y superficie $25\\pi$.')],
    ['Partes y anillos',
      xpMira('dibujo', 'Segunda idea: un sector es **una fracción**; un anillo, **una resta**.', { dib: circ, v: { r: 6, a: 90, q: 0, t: '' }, alto: 200 }, [
        ['Noventa grados son un cuarto de la vuelta.', { t: '90 de 360 = un cuarto' }, '$90 \\div 360 = \\tfrac14$'],
        ['Un cuarto de 36π son 9π.', { t: '9π' }, '$36 \\div 4 = 9$'],
        ['Con 180 grados es la mitad: 18π.', { a: 180, t: '18π' }],
        ['Ahora un anillo: se quita un círculo de radio 3.', { a: 360, q: 3, t: '36π − 9π' }, '$36 - 9 = 27$'],
        ['Se restan las superficies, nunca los radios.', { t: '27π' }],
      ], 'Sector: fracción del círculo. Anillo: afuera menos adentro.'),
      xpHaz('dibujo', 'El círculo mide $36\\pi$. Abre el sector hasta que mida **15π**.', { dib: (v, K) => circ({ r: 6, a: v.a, q: 0 }, K), v: { a: 60 }, metas: { a: 150 }, alto: 260, manijas: [{ k: 'a', min: 30, max: 330, paso: 30, et: 'grados' }], lee: v => `$36 \\cdot ${v.a} \\div 360 = ${v.a / 10}$`, dice: () => '¿Qué fracción del círculo es?' }, '15 de 36 son cinco de cada doce partes: 150°.')],
    ['Sumar piezas o quitar sobras',
      xpMira('dibujo', 'Tercera idea: una figura rara se **corta** en piezas o se **completa**.', { dib: casa, v: { t0: 60, f: 0, t: '' }, alto: 200 }, [
        ['La pared mide 12 por 7: son 84.', { t: 'pared: 84' }, '$12 \\cdot 7 = 84$'],
        ['El techo es un triángulo de base 12 y altura 6.', { t: 'techo: 36' }, '$\\tfrac{12 \\cdot 6}{2} = 36$'],
        ['Sumando las dos piezas: 120.', { t: '84 + 36 = 120' }],
        ['También: la caja completa mide 12 por 13.', { f: 1, t: 'caja: 156' }, '$12 \\cdot 13 = 156$'],
        ['Y sobran dos esquinas de 18: quedan 120.', { t: '156 − 36 = 120' }],
      ], 'Suma las piezas o quita lo que sobra: da igual.'),
      xpHaz('fichas', 'A una placa de 9 por 6 se le quita un cuadrado de lado 3 en una esquina. Pon lo que se quita y lo que queda.', { slots: fila('se quita', 'queda'), fichas: ['9', '45', '12', '42', '54'], meta: ['9', '45'], alto: 96, pista: 'El cuadrado mide lado por lado.' }, '$3 \\cdot 3 = 9$ y $54 - 9 = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un jardín redondo de radio 4 m lleva alrededor un camino de 1 m de ancho. Pon, en π, el área del jardín y la del camino.', { slots: fila('jardín', 'camino'), fichas: ['16', '9', '25', '1', '8'], meta: ['16', '9'], alto: 96, pista: 'El borde de afuera del camino tiene radio 5.' }, '$16\\pi$ y $25\\pi - 16\\pi = 9\\pi$.')],
  ], 'Borde, superficie, fracción de la vuelta y afuera menos adentro.');

  xpLec('icf-ma-medida-3', [
    ['Por capas',
      xpMira('dibujo', 'Empecemos por la idea: el volumen es **una capa repetida**.', { dib: pila, v: { c: 1, t: '' }, alto: 190 }, [
        ['Una capa de 4 por 3 tiene doce cubos.', { t: '12' }, '$4 \\cdot 3 = 12$'],
        ['Con tres capas ya hay treinta y seis.', { c: 3, t: '36' }, '$12 \\cdot 3 = 36$'],
        ['Con cinco capas hay sesenta cubos.', { c: 5, t: '60' }, '$12 \\cdot 5 = 60$'],
        ['Con un cilindro es igual: base redonda por altura.', {}, '$\\pi r^2 \\cdot h$'],
        ['Radio 2 y altura 5: veinte veces π.', {}, '$4 \\cdot 5 = 20$'],
      ], 'Prisma o cilindro: área de la base por altura.'),
      xpHaz('dibujo', 'Cada capa es de 4 por 3. Apila hasta tener **48** cubos.', { dib: pila, v: { c: 1 }, metas: { c: 4 }, alto: 250, manijas: [{ k: 'c', min: 1, max: 6, paso: 1, et: 'capas' }], lee: v => `$12 \\cdot ${v.c} = ${12 * v.c}$`, dice: () => 'Cada capa tiene doce.' }, '$48 \\div 12 = 4$.')],
    ['La tercera parte',
      xpMira('dibujo', 'Segunda idea: un cono llena **un tercio** del cilindro de igual base y altura.', { dib: cono, v: { n: 0, t: '' }, alto: 192 }, [
        ['Tienen la misma base y la misma altura.', {}],
        ['Se vacía un cono: un tercio del cilindro.', { n: 1, t: 'un tercio' }],
        ['Se vacía otro cono: ya van dos tercios.', { n: 2, t: 'dos tercios' }],
        ['Con el tercero el cilindro queda lleno.', { n: 3, t: 'lleno' }],
        ['Igual pasa con la pirámide y su prisma.', {}, '$\\tfrac13 \\cdot base \\cdot h$'],
        ['Y una esfera justa llena dos tercios de su cilindro.', { n: 2, t: 'esfera: dos tercios' }],
      ], 'Cono y pirámide: un tercio. Esfera: dos tercios de su cilindro.'),
      xpHaz('fichas', 'Un cilindro mide $30\\pi$. Pon, en π, el cono y la esfera justa de igual base y altura.', { slots: fila('cono', 'esfera'), fichas: ['10', '20', '15', '30', '60'], meta: ['10', '20'], alto: 96, pista: 'Un tercio y dos tercios.' }, '$30 \\div 3 = 10$ y el doble, 20.')],
    ['Piel y litros',
      xpMira('fichas', 'Tercera idea: la **piel** suma caras y la **capacidad** se pasa a litros.', { slots: fila('una cara', 'piel', 'litros'), fichas: ['4', '24', '8000'], alto: 96 }, [
        ['Un cubo de 2 metros: cada cara mide 4.', { pon: { 0: '4' } }, '$2 \\cdot 2 = 4$'],
        ['Tiene seis caras: su piel mide 24.', { pon: { 1: '24' } }, '$6 \\cdot 4 = 24$'],
        ['Su volumen es de ocho metros cúbicos.', {}, '$2 \\cdot 2 \\cdot 2 = 8$'],
        ['Cada metro cúbico tiene mil litros.', { pon: { 2: '8000' } }, '$8 \\cdot 1\\,000 = 8\\,000$'],
        ['Y un litro son mil centímetros cúbicos.', {}],
      ], 'Piel: suma de caras. 1 m³ = 1 000 L; 1 L = 1 000 cm³.'),
      xpHaz('fichas', 'Una caja mide 3 por 2 de base y 4 de alto, en metros. Pon su piel y los litros que caben.', { slots: fila('piel (m²)', 'litros'), fichas: ['52', '24000', '26', '2400', '24'], meta: ['52', '24000'], alto: 96, pista: 'Las caras son 6, 12 y 8, cada una dos veces.' }, '$2 \\cdot 26 = 52$ y $24 \\cdot 1\\,000 = 24\\,000$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A una caja de 2 por 3 por 5 se le duplican las tres medidas. Pon el volumen de antes y por cuánto se multiplica.', { slots: fila('antes', 'se multiplica por'), fichas: ['30', '8', '2', '6', '4'], meta: ['30', '8'], alto: 96, pista: 'Se duplica tres veces: largo, ancho y alto.' }, '$2 \\cdot 3 \\cdot 5 = 30$ y $2 \\cdot 2 \\cdot 2 = 8$.')],
  ], 'Capas, tercios, caras y litros: con eso se mide cualquier recipiente.');
}
