// Geometría Euclidiana · mundo 1 «euc-demostrar»: explicaciones Explora (spec 2026-11-26-curso-euclidiana). Los ejemplos no son los de los ejercicios.
{
  const k = v => Math.round(v.k);
  const izq = (K, l, y0, dy = 40) => l.map((t, i) => K.t(10, y0 + i * dy + 5, t, 's', 'start')).join('');
  const col = (n, y0, x, w, dy = 40) => Array.from({ length: n }, (_, i) => ({ x, y: y0 + i * dy, w, h: 34 }));
  const pol = (K, P, cx, cy, cls = 'fa') => K.p(P.map(([x, y]) => [cx + x, cy + y]), cls);
  const CUAD = [[-24, -24], [24, -24], [24, 24], [-24, 24]], ROMBO = [[-36, 0], [0, -22], [36, 0], [0, 22]], RECT = [[-38, -20], [38, -20], [38, 20], [-38, 20]];
  // Dos rectas que se cruzan: con medidas (num) o con nombres.
  const cruce = (v, K) => {
    const C = [170, 108], P = g => K.at(...C, 88, g), a = v.a, n = Math.round(a), med = v.num > 0.5;
    return K.ang(C, P(0), P(a), 40, med ? `${n}°` : '1', 'fa', 'ta') + K.ang(C, P(180), P(180 + a), 40, med ? `${n}°` : '3', 'fa', 'ta')
      + K.l(...P(0), ...P(180)) + K.l(...P(a), ...P(a + 180)) + K.c(...C, 4, 'fk') + K.t(332, 16, med ? 'medir: un caso' : 'razonar: todos los casos', 's tm', 'end');
  };
  // Los ladrillos: primitivos, definición, postulado, teorema y corolario.
  const ladrillos = (v, K) => {
    const q = k(v), T = ['términos primitivos', 'definición', 'postulado', 'teorema', 'corolario'][q];
    let h = K.t(170, 22, T, 'ta');
    if (q === 0) h += K.c(64, 104, 5, 'fk') + K.t(64, 150, 'punto', 's') + K.l(118, 128, 218, 80) + K.t(168, 150, 'recta', 's') + K.p([[236, 128], [264, 80], [326, 80], [298, 128]], 'fa') + K.t(282, 150, 'plano', 's');
    else if (q === 1) h += K.l(60, 104, 280, 104, 'gr') + K.c(60, 104, 4, 'fk') + K.c(280, 104, 4, 'fk') + K.c(170, 104, 5, 'fA') + K.l(115, 96, 115, 112, 'la') + K.l(225, 96, 225, 112, 'la') + K.t(60, 86, 'A') + K.t(170, 86, 'M', 'ta') + K.t(280, 86, 'B') + K.t(170, 150, 'punto medio: AM ≅ MB', 's');
    else if (q === 2) h += K.l(40, 140, 300, 66) + K.c(100, 123, 5, 'fA') + K.c(240, 83, 5, 'fA') + K.t(100, 108, 'P') + K.t(240, 68, 'Q') + K.t(170, 168, 'por P y Q, una sola recta', 's');
    else { const C = [170, 100], a = q === 3 ? 60 : 90, P = g => K.at(...C, 76, g);
      h += K.ang(C, P(0), P(a), 34, '', 'fa') + K.ang(C, P(180), P(180 + a), 34, '', 'fa') + (q === 4 ? K.ang(C, P(90), P(180), 34, '', 'fa') + K.ang(C, P(270), P(360), 34, '', 'fa') : '') + K.l(...P(0), ...P(180)) + K.l(...P(a), ...P(a + 180)) + K.c(...C, 4, 'fk')
        + K.t(170, 194, q === 3 ? 'opuestos por el vértice: congruentes' : 'si uno es recto, los cuatro lo son', 's'); }
    return h;
  };
  const minis = K => K.t(88, 16, '«plano»', 's') + K.p([[58, 54], [76, 26], [120, 26], [102, 54]], 'fa')
    + K.t(252, 16, 'ángulo recto: mide 90°', 's') + K.pl([[232, 26], [232, 54], [272, 54]]) + K.pl([[232, 46], [240, 46], [240, 54]], 'lm')
    + K.t(88, 116, 'por 2 puntos, 1 recta', 's') + K.l(48, 152, 128, 128) + K.c(64, 147, 4, 'fA') + K.c(112, 133, 4, 'fA')
    + K.t(252, 116, 'opuestos por el vértice', 's') + K.l(214, 140, 290, 140) + K.l(228, 156, 276, 124);
  const tabla = (K, filas, y0 = 36) => K.t(10, 16, 'afirmación', 's tm', 'start') + K.t(262, 16, 'razón', 's tm') + izq(K, filas, y0);
  // Una viga con dos soportes.
  const viga = (v, K) => {
    const X = u => 30 + u * 17.5;
    let h = K.l(30, 100, 310, 100, 'gr') + K.l(X(v.m), 100, X(v.m), 78, 'la') + K.l(X(v.n), 100, X(v.n), 122, 'lg');
    for (let u = 0; u <= 16; u++) h += K.l(X(u), 95, X(u), 105, 'lm');
    return h + K.c(30, 100, 4, 'fk') + K.c(310, 100, 4, 'fk') + K.t(18, 105, 'A') + K.t(323, 105, 'B') + K.t(170, 20, 'cada rayita es 1 m', 's tm');
  };

  xpLec('euc-demostrar-1', [
    ['Medir o demostrar',
      xpMira('dibujo', 'En geometría hay dos maneras de saber algo: **medirlo** o **demostrarlo**.', { dib: cruce, v: { a: 50, num: 1 }, alto: 204 }, [
        ['Dos rectas se cruzan. Mides los ángulos de enfrente: 50° y 50°. Iguales.', {}],
        ['Otro cruce: 72° y 72°. Otra vez iguales. Eso es geometría experimental: mirar y medir.', { a: 72 }],
        ['Pero hay infinitos cruces. Medir muchos no prueba que pase en todos.', { a: 120 }],
        ['La geometría deductiva no mide: razona. De unas pocas verdades saca todas las demás.', { num: 0 }],
        ['Lo que así se demuestra vale para todos los cruces a la vez.', { a: 95 }],
      ], 'Medir deja sospechar; demostrar asegura. La geometría deductiva razona una vez para todos los casos.'),
      xpHaz('fichas', 'Pon cada manera de trabajar en su caja: ¿es de la geometría experimental o de la deductiva?', {
        slots: [{ x: 88, y: 60, w: 164, h: 92, n: 2, et: 'experimental' }, { x: 252, y: 60, w: 164, h: 92, n: 2, et: 'deductiva' }], alto: 130,
        fichas: ['usar postulados', 'medir casos', 'usar teoremas', 'probar ejemplos'], meta: [['medir casos', 'probar ejemplos'], ['usar postulados', 'usar teoremas']], pista: 'Medir y probar casos es experimentar; razonar desde verdades aceptadas es deducir.' },
      'Experimental: medir y probar casos. Deductiva: razonar desde postulados y teoremas.')],
    ['Los ladrillos de la geometría',
      xpMira('dibujo', 'Para razonar hacen falta **ladrillos**: palabras claras y verdades de partida.', { dib: ladrillos, v: { k: 0 }, alto: 204 }, [
        ['Punto, recta y plano no se definen: son los términos primitivos. Todos sabemos qué son.', {}],
        ['Con ellos se escriben las definiciones. Punto medio: el que parte un segmento en dos congruentes.', { k: 1 }],
        ['Un postulado se acepta sin demostrar. Ejemplo: por dos puntos pasa una sola recta.', { k: 2 }],
        ['Un teorema sí se demuestra. Ejemplo: los ángulos opuestos por el vértice son congruentes.', { k: 3 }],
        ['Un corolario sale enseguida de un teorema: si un ángulo del cruce es recto, los cuatro lo son.', { k: 4 }],
      ], 'Primitivos y definiciones dan las palabras; los postulados se aceptan; teoremas y corolarios se demuestran.'),
      xpHaz('fichas', 'Ponle a cada ladrillo su nombre: término primitivo, definición, postulado o teorema.', {
        slots: [{ x: 88, y: 82, w: 112, h: 36 }, { x: 252, y: 82, w: 112, h: 36 }, { x: 88, y: 182, w: 112, h: 36 }, { x: 252, y: 182, w: 112, h: 36 }], alto: 206, fondo: minis,
        fichas: ['teorema', 'postulado', 'corolario', 'definición', 'primitivo'], meta: ['primitivo', 'definición', 'postulado', 'teorema'], pista: 'Uno no se define, otro explica una palabra, otro se acepta y otro se demuestra.' },
      'Plano: primitivo. Ángulo recto: definición. Dos puntos y una recta: postulado. Opuestos por el vértice: teorema.')],
    ['Hipótesis, tesis y razones',
      xpMira('fichas', 'Un teorema dice «si pasa esto, **entonces** pasa aquello». Míralo demostrado.', { slots: col(5, 34, 262, 140, 37), alto: 204, fichas: ['hipótesis', 'definición', 'hipótesis', 'sustitución', 'resta'],
        fondo: K => K.t(10, 16, 'afirmación', 's tm', 'start') + K.t(262, 16, 'razón', 's tm') + izq(K, ['1. ∠1 y ∠2 complementarios', '2. ∠1 + ∠2 = 90°', '3. ∠2 = 30°', '4. ∠1 + 30° = 90°', '5. ∠1 = 60°'], 34, 37) }, [
        ['Lo que va después del «si» es la hipótesis: lo que nos dan. Lo que sigue al «entonces» es la tesis.', {}],
        ['Cada afirmación lleva al lado su razón. La primera es un dato: su razón es «hipótesis».', { pon: { 0: 'hipótesis' } }],
        ['Complementarios quiere decir que suman 90°. Esa razón es una definición.', { pon: { 1: 'definición' } }],
        ['El otro dato, 30°, se mete en la suma. Eso se llama sustituir.', { pon: { 2: 'hipótesis', 3: 'sustitución' } }],
        ['Se resta 30° a los dos lados y aparece la tesis. Ahí termina la demostración.', { pon: { 4: 'resta' } }],
        ['Regla de oro: ninguna afirmación va sin razón, y «se ve en el dibujo» no es una razón.', {}],
      ], 'Hipótesis: lo que se da. Tesis: lo que se demuestra. Cada afirmación lleva su razón.'),
      xpHaz('fichas', '∠1 y ∠2 forman par lineal (vecinos sobre una recta: suman 180°) y ∠1 mide 110°. Pon la razón de cada paso.', { slots: col(4, 36, 262, 140), alto: 180,
        fondo: K => tabla(K, ['1. ∠1 + ∠2 = 180°', '2. ∠1 = 110°', '3. 110° + ∠2 = 180°', '4. ∠2 = 70°']),
        fichas: ['sustitución', 'tesis', 'par lineal', 'resta', 'se ve', 'hipótesis'], meta: ['par lineal', 'hipótesis', 'sustitución', 'resta'], pista: 'El 110° es un dato; meterlo en la suma es sustituir.' },
      'Par lineal, hipótesis, sustitución y resta: cuatro afirmaciones, cuatro razones.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una viga AB de 16 m lleva un soporte M en su punto medio y otro, N, en el punto medio de MB. Ubícalos.', { dib: viga, v: { m: 3, n: 6 }, metas: { m: 8, n: 12 }, alto: 180,
        manijas: [{ k: 'm', min: 1, max: 15, paso: 1, rot: () => 'M', en: v => [30 + v.m * 17.5, 62], de: x => (x - 30) / 17.5 }, { k: 'n', min: 1, max: 15, paso: 1, rot: () => 'N', en: v => [30 + v.n * 17.5, 138], de: x => (x - 30) / 17.5 }],
        lee: v => `$AM = ${v.m}$, $AN = ${v.n}$`, dice: () => 'M parte la viga en dos trozos iguales; N parte el trozo MB en dos.' },
      'M queda a 8 m de A. N parte a MB por la mitad: a 12 m de A y a 4 m de B.')],
  ], 'Medir no es demostrar; hay primitivos, definiciones, postulados y teoremas; y cada afirmación lleva su razón.');

  // ------------------------------------------------------------------------------------------------ lección 2
  const barras = (v, K) => {
    const q = k(v), bar = (y, n, w = 120, cls = 'fa') => K.r(90, y, w, 16, cls) + K.t(74, y + 13, n, 's', 'end');
    const T = ['propiedades de la igualdad', 'reflexiva', 'simétrica', 'transitiva', 'aditiva', 'sustitución'][q];
    const F = ['', 'AB = AB', 'AB = CD  ⇒  CD = AB', 'AB = CD y CD = EF  ⇒  AB = EF', 'AB = CD  ⇒  AB + 2 = CD + 2', 'AB + CD = 10 y CD = AB  ⇒  AB + AB = 10'][q];
    let h = K.t(170, 22, T, 'ta') + bar(50, 'AB');
    if (q >= 2) h += bar(86, 'CD');
    if (q === 3) h += bar(122, 'EF');
    if (q === 4) h += K.r(210, 50, 40, 16, 'fg') + K.r(210, 86, 40, 16, 'fg');
    return h + K.t(170, 180, F, q === 5 ? 's' : '');
  };
  const reglas = (v, K) => {
    const q = k(v);
    let h = K.t(170, 22, q === 4 ? 'cuadrado → rectángulo → 4 rectos' : 'si es cuadrado → tiene 4 rectos', 'ta');
    if (q >= 1 && q <= 3) h += pol(K, [CUAD, ROMBO, RECT][q - 1], 76, 100, q === 3 ? 'fg' : 'fa') + K.t(76, 156, ['es cuadrado', 'no tiene 4 rectos', 'tiene 4 rectos'][q - 1], 's') + K.ar(140, 100, 184, 100, q === 3 ? 'lf d' : 'la')
      + K.t(258, 105, ['tiene 4 rectos', 'no es cuadrado', '¿es cuadrado?'][q - 1], q === 3 ? 'tf' : '');
    if (q === 4) h += pol(K, CUAD, 170, 100) + K.t(170, 156, 'luego: cuadrado → 4 rectos', 's');
    return h + K.t(170, 190, ['', 'modus ponens', 'modus tollens', 'no vale: no se sabe', 'silogismo'][q], 'tm');
  };
  const recta4 = K => K.l(40, 30, 300, 30) + [['A', 60], ['B', 130], ['C', 210], ['D', 280]].map(([n, x]) => K.c(x, 30, 4, 'fk') + K.t(x, 18, n, 's')).join('') + K.l(95, 24, 95, 36, 'la') + K.l(245, 24, 245, 36, 'la');
  const absurdo = (v, K) => {
    const V = [110, 170], a = v.a, n = Math.round(a), P = g => K.at(...V, 120, g), mal = a > 90.5;
    return K.ang(V, P(0), P(a), 46, `${n}°`, mal ? 'ff' : 'fa', mal ? 'tf' : 'ta') + (mal ? '' : K.ang(V, P(a), P(90), 36, `${90 - n}°`, 'fg', 'tg'))
      + K.l(...V, 290, 170) + K.l(...V, 110, 30) + K.pl([[120, 170], [120, 160], [110, 160]], 'lm') + K.l(...V, ...P(a), 'la gr') + K.c(...V, 4, 'fk')
      + K.f(v.m, K.t(250, 60, 'más de 90°', 'tf')) + K.f(v.x, K.t(250, 86, '¡contradicción!', 'tf'));
  };
  const par = (v, K) => {
    const O = [170, 150], R = K.at(...O, 112, v.a), n = Math.round(v.a);
    return K.ang(O, [300, 150], R, 42, `${n}°`, 'fa', 'ta') + K.ang(O, R, [40, 150], 34, `${180 - n}°`, 'fg', 'tg') + K.l(40, 150, 300, 150) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
  };
  const giro = { k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(170, 150, 112, v.a), de: (x, y) => (y > 150 ? (x < 170 ? 180 : 0) : Math.atan2(150 - y, x - 170) * 180 / Math.PI) };

  xpLec('euc-demostrar-2', [
    ['Las razones de la igualdad',
      xpMira('dibujo', 'Para demostrar con medidas hay **razones que siempre valen**: las propiedades de la igualdad.', { dib: barras, v: { k: 0 }, alto: 196 }, [
        ['Cuando una demostración compara medidas, usa las propiedades de la igualdad. Son cinco.', {}],
        ['Reflexiva: toda medida es igual a sí misma. AB = AB.', { k: 1 }],
        ['Simétrica: si AB = CD, entonces CD = AB. Se puede leer al revés.', { k: 2 }],
        ['Transitiva: si AB = CD y CD = EF, entonces AB = EF. Se encadenan.', { k: 3 }],
        ['Aditiva: a dos medidas iguales les sumas lo mismo y siguen iguales.', { k: 4 }],
        ['Sustitución: una medida se puede cambiar por otra igual dentro de cualquier cuenta.', { k: 5 }],
      ], 'Reflexiva, simétrica, transitiva, aditiva y sustitución: razones que valen para cualquier medida.'),
      xpHaz('fichas', 'Ponle a cada paso la propiedad de la igualdad que lo justifica.', { slots: col(3, 28, 284, 104), alto: 130,
        fondo: K => izq(K, ['∠1 = ∠2 y ∠2 = ∠3: luego ∠1 = ∠3', 'AB = CD: luego AB + 2 = CD + 2', '∠5 = ∠5'], 28),
        fichas: ['aditiva', 'reflexiva', 'simétrica', 'transitiva'], meta: ['transitiva', 'aditiva', 'reflexiva'], pista: 'Mira qué pasó: se encadenó, se sumó lo mismo o se comparó consigo mismo.' },
      'Encadenar es transitiva; sumar lo mismo, aditiva; igual a sí mismo, reflexiva.')],
    ['Reglas para sacar conclusiones',
      xpMira('dibujo', 'Una **regla de inferencia** dice cuándo una conclusión sale segura.', { dib: reglas, v: { k: 0 }, alto: 200 }, [
        ['Partimos de una verdad con forma de «si p, entonces q».', {}],
        ['Modus ponens: se sabe que pasa p. Entonces, seguro, pasa q.', { k: 1 }],
        ['Modus tollens: se sabe que q no pasa. Entonces p tampoco puede pasar.', { k: 2 }],
        ['Ojo: si pasa q, no se sabe nada de p. Un rectángulo tiene 4 rectos y no es cuadrado.', { k: 3 }],
        ['Silogismo: si p da q, y q da r, entonces p da r. Las flechas se encadenan.', { k: 4 }],
      ], 'Ponens: de p sale q. Tollens: sin q no hay p. Silogismo: se encadena. De q no se saca p.'),
      xpHaz('fichas', 'Regla: «si dos ángulos son rectos, entonces son congruentes». Pon lo que se concluye en cada caso.', { slots: col(3, 52, 242, 188), alto: 152,
        fondo: K => K.t(170, 18, 'si son rectos → son congruentes', 's ta') + izq(K, ['∠1 y ∠2 son rectos:', '∠3 y ∠4 no congruentes:', '∠5 y ∠6 congruentes:'], 52),
        fichas: ['no se sabe', 'son rectos', 'son congruentes', 'no son rectos los dos'], meta: ['son congruentes', 'no son rectos los dos', 'no se sabe'], pista: 'Dos ángulos de 40° son congruentes y no son rectos.' },
      'Ponens da «son congruentes»; tollens, «no son rectos los dos»; del tercero no sale nada.')],
    ['Directa: de la hipótesis a la tesis',
      xpMira('fichas', 'La **demostración directa** camina de la hipótesis a la tesis, paso a paso.', { slots: col(4, 72, 262, 140, 37), alto: 204, fichas: ['hipótesis', 'reflexiva', 'aditiva', 'suma de segm.'],
        fondo: K => recta4(K) + K.t(262, 52, 'razón', 's tm') + izq(K, ['1. AB = CD', '2. BC = BC', '3. AB + BC = CD + BC', '4. AC = BD'], 72, 37) }, [
        ['Cuatro puntos en una recta, con AB = CD. Queremos demostrar que AC = BD.', {}],
        ['Se empieza por lo que nos dan. Primera línea: AB = CD, razón «hipótesis».', { pon: { 0: 'hipótesis' } }],
        ['El trozo BC es igual a sí mismo. Parece poco, pero es una razón: reflexiva.', { pon: { 1: 'reflexiva' } }],
        ['A los dos iguales se les suma el mismo trozo BC. Razón: aditiva.', { pon: { 2: 'aditiva' } }],
        ['AB + BC es AC, y CD + BC es BD: lo dice la suma de segmentos. Llegamos a la tesis.', { pon: { 3: 'suma de segm.' } }],
      ], 'Directa: se parte de la hipótesis y cada paso, con su razón, acerca a la tesis.'),
      xpHaz('fichas', 'Ordena esta demostración directa de arriba abajo: primero la hipótesis, al final la tesis.', { slots: [0, 1, 2].map(i => ({ x: 170, y: 24 + i * 44, w: 220, h: 34 })), alto: 136,
        fondo: K => K.ar(170, 42, 170, 50, 'la') + K.ar(170, 86, 170, 94, 'la'),
        fichas: ['∠AOC = 2 · ∠AOB', 'OB biseca al ∠AOC', '∠AOB = ∠BOC'], meta: ['OB biseca al ∠AOC', '∠AOB = ∠BOC', '∠AOC = 2 · ∠AOB'], pista: 'La bisectriz es el dato; de su definición salen dos ángulos iguales.' },
      'Dato, lo que dice la definición de bisectriz y, al final, la tesis.')],
    ['Indirecta: suponer lo contrario',
      xpMira('dibujo', 'Cuando el camino directo no sale, se usa la **demostración indirecta**.', { dib: absurdo, v: { a: 35, m: 0, x: 0 }, alto: 200 }, [
        ['Tesis: si dos ángulos son complementarios, ninguno de los dos es obtuso.', {}],
        ['Primer paso: suponer lo contrario de la tesis. Digamos que uno sí es obtuso.', { a: 115 }],
        ['Entonces él solo ya pasa de 90°, y con el otro suman todavía más.', { m: 1 }],
        ['Pero eran complementarios: suman 90° justos. Eso es una contradicción, un absurdo.', { x: 1 }],
        ['Lo supuesto no puede ser. Queda demostrada la tesis: es la reducción al absurdo.', { a: 35, m: 0, x: 0 }],
      ], 'Indirecta: se niega la tesis, se llega a una contradicción y por eso la tesis es cierta.'),
      xpHaz('fichas', 'M está entre A y B, y AB mide 10. Arma el absurdo que demuestra que AM mide menos de 10.', { slots: col(4, 28, 226, 212), alto: 172,
        fondo: K => izq(K, ['Supongo:', 'Entonces:', 'Pero:', 'Luego:'], 28),
        fichas: ['AM + MB = AB = 10', 'AM < 10', 'M no está entre A y B', 'AM ≥ 10', 'AM + MB > 10'], meta: ['AM ≥ 10', 'AM + MB > 10', 'AM + MB = AB = 10', 'AM < 10'], pista: 'Se niega la tesis, no el dato: empieza suponiendo que AM no es menor que 10.' },
      'Suponer AM ≥ 10 lleva a AM + MB > 10, que choca con AM + MB = 10.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Dos calles rectas se cruzan. La esquina del parque (a la derecha) abre 40° más que su vecina. Gira la calle hasta que se cumpla.', { dib: par, v: { a: 60 }, metas: { a: 110 }, alto: 190, manijas: [giro],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `La del parque mide ${v.a}° y su vecina ${180 - v.a}°: forman par lineal.` },
      'Par lineal y sustitución: $x + (x + 40^\\circ) = 180^\\circ$, así que miden 70° y 110°.')],
  ], 'Propiedades de la igualdad, reglas de inferencia, el camino directo y la reducción al absurdo.');

  // ------------------------------------------------------------------------------------------------ lección 3
  const anidados = (v, K) => {
    const q = k(v), T = ['', 'ser cuadrado basta: suficiente', 'sin ser rectángulo no hay cuadrado: necesaria', 'ser rectángulo no basta', 'si p, entonces q: p suficiente, q necesaria', 'si y solo si: necesaria y suficiente'][q];
    return K.c(170, 100, 86, 'fg') + K.c(140, 116, 44, 'fa') + K.t(170, 34, 'rectángulos', 's tg') + K.t(140, 92, 'cuadrados', 's ta') + pol(K, CUAD.map(([x, y]) => [x * 0.55, y * 0.55]), 140, 124, q === 1 || q === 2 ? 'fA' : 'fa')
      + (q >= 3 ? pol(K, RECT.map(([x, y]) => [x * 0.6, y * 0.6]), 216, 112, 'fg') : '') + K.t(170, 206, T, 's');
  };
  const FR = [['la frase', 'si es cuadrado, es rectángulo', 'V'], ['recíproco', 'si es rectángulo, es cuadrado', 'F'], ['contrario', 'si no es cuadrado, no es rectángulo', 'F'], ['contrarrecíproco', 'si no es rectángulo, no es cuadrado', 'V']];
  const parientes = (v, K) => FR.map(([n, t, b], i) => K.f(v.k - i + 1, K.t(10, 22 + i * 46, n, 's tm', 'start') + K.t(10, 40 + i * 46, t, '', 'start') + K.t(306, 38 + i * 46, b, b === 'V' ? 'b to' : 'b tf'))).join('')
    + K.f(v.k - 3, K.pl([[322, 30], [332, 30], [332, 172], [322, 172]], 'lo'));
  const TRI = [[[-34, 28], [34, 28], [0, -31]], [[-40, 28], [36, 28], [14, -26]], [[-44, 16], [44, 16], [0, -17]]];
  const triangulos = (v, K) => K.f(1 - v.k, K.t(170, 92, 'demostrar: razonar', 'tm') + K.t(170, 120, 'refutar: basta un caso', 'ta')) + K.f(v.k, K.t(170, 22, 'si es isósceles → es equilátero', 'ta')) + TRI.map((P, i) => K.f(v.k - i - 1, pol(K, P, 62 + i * 108, 100, ['fa', 'fg', 'ff'][i]) + K.t(62 + i * 108, 150, ['equilátero', 'escaleno', 'isósceles'][i], 's') + K.t(62 + i * 108, 168, ['la cumple', 'no aplica', 'la tumba'][i], 's tm'))).join('')
    + K.f(v.k - 4, K.t(278, 188, 'contraejemplo', 'tf'));
  const lotes = (v, K) => {
    const w = v.w * 16, h = v.h * 16;
    return K.r(10, 86, 96, 64, 'fg') + K.t(58, 123, '6 × 4', 's tg') + K.t(58, 170, 'perímetro 20', 's tm') + K.r(124, 150 - h, w, h, 'fa') + K.t(196, 170, `perímetro ${Math.round(2 * (v.w + v.h))}`, 's ta') + K.l(8, 150, 280, 150, 'lm');
  };

  xpLec('euc-demostrar-3', [
    ['Basta o hace falta',
      xpMira('dibujo', 'En «si p, entonces q», las dos partes **no juegan el mismo papel**.', { dib: anidados, v: { k: 0 }, alto: 214 }, [
        ['Míralo con figuras: todos los cuadrados viven dentro de los rectángulos.', {}],
        ['Con saber que es cuadrado ya basta para saber que es rectángulo: condición suficiente.', { k: 1 }],
        ['Para ser cuadrado hace falta ser rectángulo. Sin eso, imposible: condición necesaria.', { k: 2 }],
        ['Pero necesaria no quiere decir suficiente: este rectángulo largo no es cuadrado.', { k: 3 }],
        ['En «si p, entonces q»: p es suficiente para q, y q es necesaria para p.', { k: 4 }],
        ['Si la frase vale en los dos sentidos, la condición es necesaria y suficiente.', { k: 5 }],
      ], 'En «si p, entonces q», p es suficiente para q (basta) y q es necesaria para p (hace falta).'),
      xpHaz('fichas', 'En cada renglón, la primera condición ¿es suficiente, necesaria o las dos cosas para la segunda?', { slots: col(3, 28, 288, 96), alto: 130,
        fondo: K => izq(K, ['Ser equilátero, para ser isósceles', 'Tener tres lados, para ser equilátero', 'Tener tres lados, para ser triángulo'], 28),
        fichas: ['necesaria', 'ninguna', 'las dos', 'suficiente'], meta: ['suficiente', 'necesaria', 'las dos'], pista: 'Pregunta dos cosas: ¿con eso basta? ¿Sin eso se puede?' },
      'Ser equilátero basta; tener tres lados hace falta; y para ser triángulo es las dos cosas.')],
    ['Cuatro frases parientes',
      xpMira('dibujo', 'De cada condicional salen **tres parientes**. No todos dicen lo mismo.', { dib: parientes, v: { k: 0 }, alto: 190 }, [
        ['Partimos de una frase verdadera: si es cuadrado, entonces es rectángulo.', {}],
        ['Recíproco: se voltea. Si es rectángulo, es cuadrado. ¡Falso!', { k: 1 }],
        ['Contrario: se niegan las dos partes. Si no es cuadrado, no es rectángulo. También falso.', { k: 2 }],
        ['Contrarrecíproco: se voltea y se niega. Si no es rectángulo, no es cuadrado. Verdadero.', { k: 3 }],
        ['El contrarrecíproco siempre vale lo mismo que la frase original: son equivalentes.', { k: 4 }],
        ['Por eso, para demostrar un condicional se puede demostrar su contrarrecíproco.', { k: 5 }],
      ], 'El contrarrecíproco (voltear y negar) equivale a la frase; el recíproco y el contrario, no.'),
      xpHaz('fichas', 'Arma el contrarrecíproco de «si dos ángulos son complementarios, entonces los dos son agudos».', { slots: [{ x: 206, y: 60, w: 200, h: 36 }, { x: 206, y: 108, w: 200, h: 36 }], alto: 136,
        fondo: K => K.t(170, 20, '«si son complementarios, los dos son agudos»', 's ta') + K.t(48, 65, 'si', 's tm') + K.t(48, 113, 'entonces', 's tm'),
        fichas: ['son complementarios', 'no son agudos los dos', 'los dos son agudos', 'no son complementarios'], meta: ['no son agudos los dos', 'no son complementarios'], pista: 'Voltea las dos partes y niega las dos.' },
      'Voltear y negar: «si no son agudos los dos, entonces no son complementarios».')],
    ['Un solo caso tumba la frase',
      xpMira('dibujo', 'Para demostrar hace falta razonar. Para **refutar** basta un caso.', { dib: triangulos, v: { k: 0 }, alto: 200 }, [
        ['Demostrar que algo vale siempre pide una demostración. Tumbarlo es más barato.', {}],
        ['Frase: si un triángulo es isósceles, entonces es equilátero. ¿Será verdad?', { k: 1 }],
        ['Este equilátero la cumple. Pero un caso a favor no demuestra nada.', { k: 2 }],
        ['Este escaleno no es isósceles: la frase no habla de él. Ni la apoya ni la tumba.', { k: 3 }],
        ['Este sí es isósceles y no es equilátero. Cumple la hipótesis y falla la tesis.', { k: 4 }],
        ['Eso es un contraejemplo. Con uno solo, la frase queda refutada.', { k: 5 }],
      ], 'Un contraejemplo cumple la hipótesis y falla la tesis. Con uno basta para refutar.'),
      xpHaz('dibujo', 'Refuta: «si dos ángulos son suplementarios, uno es agudo y el otro obtuso». Gira el rayo hasta un contraejemplo.', { dib: par, v: { a: 60 }, metas: { a: 90 }, alto: 190, manijas: [giro],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => (v.a === 90 ? 'Dos rectos: suplementarios, y ninguno es agudo ni obtuso.' : `${v.a}° y ${180 - v.a}°: uno agudo y otro obtuso. Este caso cumple la frase.`) },
      'Dos ángulos rectos son suplementarios y ninguno es agudo ni obtuso: contraejemplo.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una vecina dice: «si dos lotes rectangulares tienen el mismo perímetro, tienen la misma área». El suyo mide 6 por 4. Arma un lote que la contradiga.', { dib: lotes, v: { w: 6, h: 4 }, cumple: v => v.w + v.h === 10 && v.w * v.h !== 24, sol: { w: 7, h: 3 }, alto: 190,
        manijas: [{ k: ['w', 'h'], min: [1, 1], max: [9, 7], paso: 1, en: v => [124 + v.w * 16, 150 - v.h * 16], de: (x, y) => [(x - 124) / 16, (150 - y) / 16] }],
        lee: v => `$${v.w} \\cdot ${v.h} = ${v.w * v.h}$`, dice: v => `Tu lote tiene perímetro ${2 * (v.w + v.h)}. El de la vecina: perímetro 20 y área 24.` },
      'Un lote de 7 por 3 tiene perímetro 20 y área 21, no 24: cumple la hipótesis y falla la tesis.')],
  ], 'Suficiente y necesaria, los parientes de un condicional, y el contraejemplo que refuta.');
}
