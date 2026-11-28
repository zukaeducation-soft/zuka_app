// Preicfes · Ciencias Naturales, mundo 8 «Herencia y Evolución», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Cromosoma en forma de X, con su letra (alelo) opcional.
  const crom = (x, y, c, et = '') => `<g transform="rotate(-14 ${x} ${y})"><rect x="${x - 4}" y="${y - 15}" width="8" height="30" rx="4" fill="${c}" stroke="#00000055"/></g>` +
    `<g transform="rotate(14 ${x} ${y})"><rect x="${x - 4}" y="${y - 15}" width="8" height="30" rx="4" fill="${c}" stroke="#00000055"/></g><circle cx="${x}" cy="${y}" r="3" fill="#ffffffaa"/>` +
    (et ? `<text x="${x}" y="${y + 30}" fill="#1d2328" font-size="11" font-weight="700" style="text-anchor:middle;font-family:Jost,sans-serif">${et}</text>` : '');
  // Papá, mamá e hija con sus pares de cromosomas; k: 1 pares, 3 la hija recibe uno de cada uno, 4 letras.
  const familia = (v, K) => {
    const k = v.k || 0, L = k >= 4;
    let s = X.persona(70, 166, 1, '#3f6fb5') + X.persona(140, 166, 1, '#b5517a') + X.persona(262, 166, 0.82, '#4f9a55');
    if (k >= 1) s += crom(60, 36, '#3d73c9', L ? 'A' : '') + crom(80, 36, '#8db8f2', L ? 'a' : '') + crom(130, 36, '#c9497a', L ? 'a' : '') + crom(150, 36, '#f2a3c0', L ? 'a' : '');
    if (k >= 2) s += X.flecha(60, 14, 246, 14) + X.flecha(160, 58, 268, 58);
    if (k >= 3) s += crom(252, 36, '#3d73c9', L ? 'A' : '') + crom(272, 36, '#c9497a', L ? 'a' : '');
    return X.foto(s + (v.r ? X.rot(170, 190, v.r, 'oscuro') : ''), 200, 'campo', 170);
  };
  // Cruce de prueba: un negro (NN si g = 0, Nn si g = 1) con un blanco nn; n casillas llenas.
  const prueba = (v, K) => {
    const P = v.g > 0.5 ? ['N', 'n'] : ['N', 'N'], u = 52, x = 118, y = 40;
    let h = '';
    for (let i = 0; i < 2; i++) {
      h += K.t(x + u * (i + 0.5), 32, P[i], 'b ta') + K.t(x - 14, y + u * (i + 0.5) + 5, 'n', 'b tg');
      for (let j = 0; j < 2; j++) { const k = i * 2 + j, g = P[j] + 'n'; h += K.r(x + u * j, y + u * i, u - 3, u - 3, v.n > k ? (g.includes('N') ? 'fa' : 'ff') : 'fn', 3) + K.f(v.n - k, K.t(x + u * (j + 0.5) - 2, y + u * (i + 0.5) + 4, g, 'b')); }
    }
    return h + K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-herencia-1', {
    conecta: 'icf-cn-celula-3',
    desde: [
      ['Desde cero: qué se hereda',
        xpMira('dibujo', 'Antes de las letras: **heredar** es recibir de tus papás las instrucciones que arman tu cuerpo. Mira dónde están y cómo llegan.', { dib: familia, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección del ADN viste que el ADN guarda las recetas para hacer proteínas.', { k: 0 }],
          ['Cada receta se llama gen: por ejemplo, la del color de los ojos.', { k: 1, r: 'gen: una receta' }],
          ['Los genes van en cromosomas, que vienen en pares.', { k: 1, r: 'cromosomas en pares' }],
          ['De cada par, la hija recibe uno del papá y uno de la mamá.', { k: 3, r: 'uno de cada uno' }],
          ['Las dos copias pueden ser versiones distintas: se llaman alelos.', { k: 4, r: 'alelos: A y a' }],
          ['Es como un recetario con dos copias de cada receta, una de cada familia.', { k: 4, r: 'dos copias' }],
        ], 'Gen: una receta. Alelo: una versión de esa receta. Recibes un alelo de cada progenitor.'),
        xpHaz('hoja', 'Subraya lo que es un **alelo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Una versión de un gen, como ojos café u ojos azules.'], ['Un cromosoma entero.'], ['Una célula del cuerpo.']], pista: 'El alelo es más pequeño que un cromosoma: es una de las formas de un mismo gen.' }, 'Un gen puede venir en versiones: esas son los alelos.')],
    ],
    despues: [
      ['Más difícil: el cruce de prueba',
        xpMira('dibujo', 'Un paso más: lo dominante **esconde** a lo recesivo. ¿Cómo saber qué letras tiene un animal que se ve dominante?', { dib: prueba, v: { g: 0, n: 0, t: '' }, alto: 184 }, [
          ['Un conejo negro puede ser NN o Nn: por fuera se ven iguales.', { t: '¿NN o Nn?' }],
          ['El truco: cruzarlo con uno blanco, nn, que solo puede dar n.', { t: 'cruce con nn' }],
          ['Si era NN, todas las crías salen Nn: negras.', { n: 4, t: 'NN: todas negras' }],
          ['Si era Nn, la mitad sale nn: blanca.', { g: 1, n: 4, t: 'Nn: la mitad blancas' }],
          ['Basta una cría blanca para saber que tenía una n escondida.', { g: 1, n: 4, t: 'una blanca lo delata' }],
        ], 'Para destapar el genotipo se cruza con un recesivo: si aparece lo recesivo, había una letra escondida.'),
        xpHaz('hoja', 'Una planta alta (T domina) se cruza con una enana (tt). Salen 50 altas y 48 enanas. Subraya el genotipo de la alta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['TT'], ['Tt'], ['tt']], pista: 'Las enanas recibieron una t de cada planta. ¿Pudo darla la alta?' }, 'Salen mitad y mitad: la alta era Tt.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se cruzan dos moscas de alas largas y nacen 300 de alas largas y 100 de alas cortas. ¿Qué se **concluye**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Alas cortas es dominante, porque volvió a aparecer.'], ['Los dos padres son Aa: sale una corta de cada cuatro.'], ['Un padre es AA y el otro es aa.'], ['Es puro azar: con otros 400 hijos podría salir cualquier cosa.']] }, [
        ['Antes de leer opciones, saca tu cuenta: 300 a 100 es 3 a 1.', {}, '$300 \\div 100 = 3$'],
        ['La A invierte: lo que reaparece es lo recesivo que estaba escondido.', { luz: [0], nota: { 0: 'invierte' } }],
        ['La C no da cortas: AA con aa da todas Aa.', { luz: [2], nota: { 2: 'no cuadra' } }],
        ['La D olvida que con 400 hijos la proporción ya se cumple.', { luz: [3], nota: { 3: 'azar' } }],
        ['La B explica el 3 a 1: Aa con Aa.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Saca tu cuenta antes de leer: 3 a 1 dice que los dos padres esconden un recesivo.'),
      xpHaz('hoja', 'En el ganado, sin cuernos (S) domina. Un toro sin cuernos y una vaca con cuernos tienen 6 terneros sin cuernos. Subraya lo que tiene más apoyo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El toro es SS con total seguridad.'], ['El toro es ss.'], ['El toro quizá es SS, pero con 6 terneros no es seguro.'], ['La vaca es SS.']], pista: 'Con pocos terneros, una cría con cuernos pudo no salir por azar. Desconfía de «total seguridad».' }, 'Seis crías apuntan a SS, pero no lo prueban: con Ss, cada cría tenía 1 de 2 de salir sin cuernos.')],
    cierre: 'Dos alelos por gen, uno de cada padre; lo dominante esconde, y la proporción se lee en muchas crías.',
  });

  // Sábila con hijuelo a la izquierda; a la derecha dos flores y una abeja que lleva polen (a de 0 a 1).
  const abeja = (x, y) => `<ellipse cx="${x - 3}" cy="${y - 7}" rx="6" ry="4" fill="#e8f4fb" opacity=".85"/><ellipse cx="${x + 4}" cy="${y - 8}" rx="6" ry="4" fill="#e8f4fb" opacity=".85"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="10" ry="6.5" fill="#f2c230" stroke="#6b4f12" stroke-width=".8"/><path d="M${x - 3} ${y - 6} V${y + 6} M${x + 3} ${y - 6} V${y + 6}" stroke="#2b2b2b" stroke-width="2.2"/><circle cx="${x + 10}" cy="${y - 1}" r="3.2" fill="#2b2b2b"/>`;
  const sabila = (x, y, s) => { let q = `<path d="M${x - 16 * s} ${y} H${x + 16 * s} L${x + 12 * s} ${y - 24 * s} H${x - 12 * s}Z" fill="url(#xlb-barro)"/>`; [-40, -20, 0, 20, 40].forEach((a, i) => { q += `<path d="M${x} ${y - 22 * s} Q${x + a * 0.9 * s} ${y - 50 * s} ${x + a * 1.1 * s} ${y - (66 - Math.abs(a) * 0.4) * s} Q${x + a * 0.5 * s} ${y - 40 * s} ${x + 4 * s} ${y - 22 * s}Z" fill="${i % 2 ? '#5f9a6a' : '#78b27f'}" stroke="#3d6b45" stroke-width=".7"/>`; }); return q; };
  const dosCaminos = (v, K) => {
    const k = v.k || 0, a = v.a || 0;
    let s = sabila(70, 168, 1) + (k >= 1 ? sabila(122, 168, 0.55) : '') + X.planta(232, 168, 58, 1, { flor: 1 }) + X.planta(306, 168, 50, 1, { flor: 1 });
    if (a > 0.01) { const bx = 238 + a * 64, by = 88 - Math.sin(a * Math.PI) * 30; s += abeja(bx, by) + `<circle cx="${bx - 6}" cy="${by + 8}" r="1.6" fill="#ffd23f"/><circle cx="${bx - 1}" cy="${by + 9}" r="1.6" fill="#ffd23f"/>`; }
    return X.foto(s + (v.r1 ? X.rot(90, 190, v.r1, 'oscuro') : '') + (v.r2 ? X.rot(262, 190, v.r2, 'oscuro') : ''), 200, 'campo', 172);
  };

  xpAmplia('icf-cn-herencia-2', {
    conecta: 'icf-cn-herencia-1',
    desde: [
      ['Desde cero: copiar o mezclar',
        xpMira('dibujo', 'Antes de las divisiones: todo ser vivo viene de otro. La pregunta es si viene de **uno** o de **dos**.', { dib: dosCaminos, v: { k: 0, a: 0, r1: '', r2: '' }, alto: 200 }, [
          ['En la lección anterior viste que recibes un alelo de cada progenitor.', { k: 0 }],
          ['Un progenitor es el ser vivo que da origen a otro.', { k: 0 }],
          ['La sábila saca hijuelos: una sola planta, hijas iguales a ella.', { k: 1, r1: 'un progenitor' }],
          ['Es como sacar fotocopias: reproducción asexual.', { k: 1, r1: 'asexual: copias' }],
          ['La abeja lleva polen de una flor a otra: hay dos progenitores.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'dos progenitores' }],
          ['El polen lleva la célula sexual masculina; el óvulo es la femenina: son gametos.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'gametos' }],
          ['Es como barajar dos mazos: reproducción sexual, hijos variados.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'sexual: mezcla' }],
        ], 'Asexual: un progenitor, copias. Sexual: dos progenitores que aportan gametos, hijos variados.'),
        xpHaz('hoja', 'Subraya qué es un **gameto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Una célula sexual con la mitad de los cromosomas, como el óvulo.'], ['Un hijo recién nacido.'], ['Una célula cualquiera de la piel.']], pista: 'El gameto es la célula que se une con otra para formar un hijo.' }, 'Óvulo y espermatozoide: gametos con la mitad.')],
    ],
    despues: [
      ['Más difícil: contar cromosomas en cada paso',
        xpMira('fichas', 'Un paso más: te preguntan cuántos cromosomas hay en **cada célula** del ciclo. La trampa es duplicar o dividir donde no toca.', { slots: [{ x: 70, y: 46, w: 84, et: 'piel' }, { x: 170, y: 46, w: 84, et: 'gameto' }, { x: 270, y: 46, w: 84, et: 'cigoto' }], fichas: ['38', '19', '38'], alto: 96 }, [
          ['Una célula de la piel de un gato tiene 38 cromosomas.', { pon: { 0: '38' } }],
          ['La mitosis copia: cada célula nueva de piel también tiene 38.', {}],
          ['La meiosis reparte: cada gameto lleva 19.', { pon: { 1: '19' } }, '$38 \\div 2 = 19$'],
          ['Dos gametos se unen: el cigoto vuelve a 38.', { pon: { 2: '38' } }, '$19 + 19 = 38$'],
          ['Así el número no se duplica en cada generación.', {}],
        ], 'Mitosis: el mismo número. Meiosis: la mitad. Fecundación: se suman dos mitades.'),
        xpHaz('hoja', 'Por un error en la meiosis, un óvulo humano lleva 24 cromosomas. Lo fecunda un espermatozoide normal, de 23. Subraya los del cigoto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['46'], ['47'], ['48']], pista: 'Suma lo que trae cada gameto, sin suponer que todo salió normal.' }, '$24 + 23 = 47$: un cromosoma de más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un vivero propaga rosas solo por esquejes, pedazos de tallo. ¿Las hijas tendrán flores de otro color que la madre? Mira las opciones «Sí/No, porque…».', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque cada esqueje mezcla genes de dos plantas.'], ['Sí, porque el ambiente del vivero cambia sus genes.'], ['No, porque vienen de un solo progenitor y copian sus genes por mitosis.'], ['No, porque las rosas no tienen genes del color.']] }, [
        ['Decide primero el Sí o el No con lo que sabes: es asexual.', {}],
        ['La A describe la reproducción sexual, no el esqueje.', { luz: [0], nota: { 0: 'otra cosa' } }],
        ['La B suena científica, pero el ambiente no reescribe genes así.', { luz: [1], nota: { 1: 'suena bien' } }],
        ['La D dice No, pero con una razón falsa.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['La C tiene el No y también la razón buena.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'En «Sí/No, porque…» decide primero con tu cuenta y luego revisa que la razón también sea cierta.'),
      xpHaz('hoja', 'Las bacterias se reproducen partiéndose en dos. Aun así aparecen bacterias distintas. Subraya **por qué**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Porque se aparean de dos en dos.'], ['Porque a veces hay errores al copiar el ADN: mutaciones.'], ['Porque la meiosis las mezcla.'], ['Porque crecen muy rápido.']], pista: 'Sin pareja no hay mezcla. Piensa qué puede cambiar al copiar.' }, 'Las mutaciones dan variedad aunque haya un solo progenitor.')],
    cierre: 'Uno o dos progenitores; la mitosis copia, la meiosis reduce a la mitad, y la variedad protege.',
  });

  // Peces variados en un río; una red (red de 0 a 1) se lleva los grandes (q de 0 a 1); g = 1 la generación siguiente.
  const PECES = [[50, 60, 1.3, '#f39c32'], [120, 92, 0.7, '#e8d44d'], [200, 52, 1.1, '#d9643a'], [272, 100, 0.6, '#f0b35a'], [80, 140, 0.65, '#c9a23a'], [176, 132, 1.25, '#f39c32'], [252, 150, 0.75, '#e07b39'], [300, 58, 0.9, '#f2c14e']];
  const HIJOS = [[50, 64, 0.62, '#e8d44d'], [112, 100, 0.7, '#f0b35a'], [196, 56, 0.66, '#c9a23a'], [276, 96, 0.6, '#e07b39'], [80, 140, 0.72, '#f2c14e'], [170, 134, 0.95, '#d9643a'], [250, 150, 0.64, '#e8d44d'], [302, 60, 0.68, '#f0b35a']];
  const rio = (v, K) => {
    let s = '';
    if ((v.g || 0) < 0.5) PECES.forEach(([x, y, e, c]) => { const op = e >= 0.9 ? 1 - (v.q || 0) : 1; if (op > 0.02) s += `<g opacity="${op.toFixed(2)}">${X.pez(x, y, e, c)}</g>`; });
    else HIJOS.forEach(([x, y, e, c]) => { s += X.pez(x, y, e, c); });
    if ((v.red || 0) > 0.01) { let m = ''; for (let x = 150; x <= 340; x += 22) m += `<path d="M${x} 0 V200" stroke="#7a5230" stroke-width="1.6"/>`; for (let y = 10; y <= 200; y += 22) m += `<path d="M150 ${y} H340" stroke="#7a5230" stroke-width="1.6"/>`; s += `<g opacity="${(0.8 * v.red).toFixed(2)}">${m}</g>`; }
    return X.foto(s + (v.r ? X.rot(170, 188, v.r) : ''), 200, 'agua');
  };
  // Porcentaje de peces pequeños por generación, dibujado hasta la generación x.
  const PCT = [20, 35, 55, 70, 78, 80];
  const curva = (v, K) => {
    const X0 = 50, Y0 = 150, gx = i => X0 + i * 50, gy = p => Y0 - p * 1.2, x = Math.max(0, Math.min(5, v.x || 0));
    let h = K.l(X0, Y0, 310, Y0, 'lm') + K.l(X0, Y0, X0, 20, 'lm') + K.t(X0 - 6, gy(100) + 4, '100', 's tm', 'end') + K.t(X0 - 6, gy(50) + 4, '50', 's tm', 'end') + K.t(X0 - 6, Y0 + 4, '0', 's tm', 'end') +
      K.l(X0, gy(50), 310, gy(50), 'ls d') + K.t(180, Y0 + 18, 'generación', 's tm') + K.t(X0 + 4, 16, '% de peces pequeños', 's tm', 'start');
    const pts = []; for (let i = 0; i <= Math.floor(x); i++) pts.push([gx(i), gy(PCT[i])]);
    const f = x - Math.floor(x); if (f > 0.01 && x < 5) { const i = Math.floor(x); pts.push([gx(i + f), gy(PCT[i] + (PCT[i + 1] - PCT[i]) * f)]); }
    if (pts.length > 1) h += K.pl(pts, 'la gr');
    pts.forEach(p => { h += K.c(p[0], p[1], 4, 'fA'); });
    return h + K.t(180, 188, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-herencia-3', {
    conecta: 'icf-cn-herencia-2',
    desde: [
      ['Desde cero: una población que cambia',
        xpMira('dibujo', 'Antes de Darwin: una **población** cambia cuando algo hace que unos tengan más crías que otros. Mira un río.', { dib: rio, v: { red: 0, q: 0, g: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la reproducción sexual da hijos variados.', {}],
          ['Una población son todos los de una especie que viven en un lugar.', { r: 'población' }],
          ['Estos peces no son iguales: unos grandes, otros pequeños. Es la variación.', { r: 'variación' }],
          ['Llega una red con huecos grandes: atrapa a los grandes.', { red: 1, r: 'la red escoge' }],
          ['Los pequeños escapan y tienen más crías.', { red: 1, q: 1, r: 'sobreviven los pequeños' }],
          ['Años después la población tiene más peces pequeños.', { red: 0, q: 1, g: 1, r: 'cambió la población' }],
          ['Ningún pez se encogió: cambió cuántos hay de cada tipo.', { red: 0, q: 1, g: 1, r: 'selección' }],
        ], 'Variación, algo que escoge y herencia: cambia la población, no cada individuo.'),
        xpHaz('hoja', 'Subraya lo que es una **población**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Todos los peces de una misma especie que viven en un río.'], ['Un solo pez muy grande.'], ['Todos los animales del planeta.']], pista: 'Población: una especie, un lugar, muchos individuos.' }, 'Misma especie y mismo lugar: una población.')],
    ],
    despues: [
      ['Más difícil: leer la gráfica del cambio',
        xpMira('dibujo', 'Un paso más: el cambio se muestra en una **gráfica**. Mira el punto de partida, cómo sube y dónde se aplana.', { dib: curva, v: { x: 0, t: '' }, alto: 198 }, [
          ['La gráfica cuenta el porcentaje de peces pequeños en cada generación.', { x: 0, t: 'empieza en 20 %' }],
          ['Primero sube rápido: la red sigue escogiendo.', { x: 3, t: 'sube' }],
          ['Después casi no cambia: ya casi todos son pequeños.', { x: 5, t: 'se aplana cerca de 80 %' }],
          ['Mira dónde empieza: no arranca en cero, ya había pequeños.', { x: 5, t: 'la variación ya existía' }],
          ['Si se deja de pescar así, la ventaja desaparece y puede bajar.', { x: 5, t: 'sin red, sin ventaja' }],
        ], 'En la gráfica: punto de partida, subida y meseta. Lo que se favorece depende de lo que escoge.'),
        xpHaz('hoja', 'Si se prohíbe pescar con esa red, subraya lo que se espera con **más sentido**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que el porcentaje de pequeños siga subiendo siempre.'], ['Que ser pequeño deje de dar ventaja y el porcentaje pueda bajar.'], ['Que los peces pequeños crezcan de golpe.']], pista: 'Sin la red, ¿qué escoge ahora a unos más que a otros?' }, 'Sin la presión que escogía, el rasgo ya no tiene ventaja.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Hoy casi todos los colibríes de una isla tienen pico largo, que alcanza el néctar de flores hondas. ¿Qué **explica** mejor el cambio?', { letras: ['A', 'B', 'C', 'D'], paras: [['Estiraron el pico al comer y se lo heredaron a sus crías.'], ['Los de pico largo comían mejor, tenían más crías y les heredaban el rasgo.'], ['Las flores cambiaron los genes de todos para que comieran mejor.'], ['Los colibríes decidieron tener crías de pico largo.']] }, [
        ['Busca la opción con variación, ventaja y herencia.', {}],
        ['La A: lo que se estira en vida no pasa a los genes.', { luz: [0], nota: { 0: 'no se hereda' } }],
        ['La C: el ambiente escoge, pero no fabrica mutaciones a la medida.', { luz: [2], nota: { 2: 'suena bien' } }],
        ['La D le pone intención: nadie decide sus genes.', { luz: [3], nota: { 3: 'intención' } }],
        ['La B tiene las tres piezas: esa es la selección natural.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Desconfía de «se estiró», «lo necesitaba» o «decidió»: la selección escoge entre lo que ya varía.'),
      xpHaz('hoja', 'Un herbicida mataba casi toda la maleza de una finca; años después casi no hace efecto. Subraya la **mejor** explicación.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['El herbicida le enseñó a la maleza a resistir.'], ['La maleza se volvió resistente porque lo necesitaba.'], ['Todas las plantas mutaron a la vez el mismo día.'], ['Las pocas que ya resistían sobrevivieron y se multiplicaron.']], pista: 'La resistencia tuvo que existir antes del herbicida, en unas pocas.' }, 'El herbicida no crea la resistencia: deja vivas a las que ya la tenían.')],
    cierre: 'Hay variación, el ambiente escoge y se hereda: así cambia la población, y fósiles, huesos y ADN lo muestran.',
  });
}
