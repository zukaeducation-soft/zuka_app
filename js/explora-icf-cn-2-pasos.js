// Preicfes · Ciencias Naturales, mundo 2 «Célula y Organismos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;

  // Microscopio y lo que se ve en el ocular: k = 0 nada, 1 célula animal, 2 célula vegetal; r1, r2: rótulos.
  const ocular = (v, K) => {
    const cx = 236, cy = 92;
    let s = X.microscopio(78, 168, 1.05) + `<path d="M96 52 L${cx - 60} ${cy - 30} M96 64 L${cx - 60} ${cy + 30}" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>` +
      `<circle cx="${cx}" cy="${cy}" r="70" fill="#000" opacity=".25" filter="url(#xlb-sombra)"/><circle cx="${cx}" cy="${cy}" r="66" fill="#f6f3e8" stroke="#2f3539" stroke-width="6"/>`;
    if (v.k === 1) s += X.celula(cx - 4, cy, 44, 'animal');
    if (v.k === 2) s += X.celula(cx, cy, 44, 'vegetal');
    if (v.r1) s += X.rot(cx, 182, v.r1, 'oscuro');
    if (v.r2) s += X.rot(cx + 46, 22, v.r2, 'oscuro');
    if (v.r3) s += X.rot(78, 22, v.r3);
    return X.foto(s, 200, 'lab');
  };
  // Dos vasos con sal disuelta: a y b granos, nivel na y nb.
  const granos = (x, y, h, nivel, cant) => {
    const ly = y - 3 - (h - 10) * nivel;
    return Array.from({ length: cant }, (_, i) => `<circle cx="${n(x - 24 + ((i * 29) % 48))}" cy="${n(ly + 8 + ((i * 17) % Math.max(6, y - ly - 14)))}" r="2.6" fill="#ffffff" stroke="#8aa9b8" stroke-width=".7"/>`).join('');
  };
  const concentra = (v, K) => X.foto(X.vaso(96, 166, 74, 96, v.na ?? 0.7, 'agua') + granos(96, 166, 96, v.na ?? 0.7, v.a || 0) +
    X.vaso(244, 166, 74, 96, v.nb ?? 0.7, 'agua') + granos(244, 166, 96, v.nb ?? 0.7, v.b || 0) +
    (v.ra ? X.rot(96, 188, v.ra) : '') + (v.rb ? X.rot(244, 188, v.rb) : '') + (v.t ? X.rot(170, 24, v.t, 'oscuro') : ''), 200, 'lab');

  xpAmplia('icf-cn-celula-1', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: qué es una célula',
        xpMira('dibujo', 'Todo ser vivo está hecho de **células**. Son tan pequeñas que para verlas hace falta un microscopio.', { dib: ocular, v: { k: 0 }, alto: 200 }, [
          ['En la lección de datos viste que se concluye solo con lo que se observa y se mide.', { r3: 'microscopio' }],
          ['Al microscopio, una muestra de mejilla deja ver formas redondeadas: células.', { k: 1 }],
          ['La célula es la pieza más pequeña que está viva, como un ladrillo en una casa.', { k: 1 }],
          ['La envuelve la membrana, una bolsa fina que escoge qué entra y qué sale.', { k: 1, r1: 'membrana' }],
          ['Adentro, el núcleo guarda las instrucciones de la célula.', { k: 1, r1: 'membrana', r2: 'núcleo' }],
          ['Las de las plantas tienen además una pared dura por fuera, como una caja.', { k: 2, r1: 'pared + membrana', r2: 'núcleo' }],
        ], 'La célula es la unidad viva: membrana que escoge, núcleo que manda y, en plantas, pared.'),
        xpHaz('hoja', 'Cada parte tiene su oficio. Subraya la parte que **escoge** qué entra y qué sale de la célula.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El núcleo'], ['La membrana'], ['La pared de las plantas']], pista: 'Esa parte guarda instrucciones o solo da firmeza. Busca la bolsa que deja pasar unas cosas y otras no.' }, 'La membrana es la puerta: deja pasar unas sustancias y otras no.')],
      ['Desde cero: qué es estar concentrado',
        xpMira('dibujo', 'Para entender cómo se mueve el agua hacen falta tres palabras: **soluto**, **solvente** y **concentración**.', { dib: concentra, v: { a: 0, b: 0, na: 0.7, nb: 0.7 }, alto: 200 }, [
          ['Se echa sal en agua: la sal es el soluto y el agua, el solvente.', { a: 8, ra: 'sal en agua' }],
          ['Concentración es cuánta sal hay en cada porción de agua.', { a: 8, ra: '8 granos' }],
          ['Al lado, la misma sal en la mitad del agua.', { a: 8, b: 8, nb: 0.35, ra: '8 granos', rb: '8 granos' }],
          ['Esa está más concentrada, como un jugo cargado.', { a: 8, b: 8, nb: 0.35, ra: 'menos concentrada', rb: 'más concentrada' }],
          ['La de la izquierda es como un jugo aguado.', { a: 8, b: 8, nb: 0.35, ra: 'menos concentrada', rb: 'más concentrada' }],
          ['La membrana deja pasar el agua, casi no la sal: eso decide hacia dónde va.', { a: 8, b: 8, nb: 0.35, t: 'pasa el agua, no la sal' }],
        ], 'Más soluto en la misma agua, o el mismo soluto en menos agua: más concentrado.'),
        xpHaz('hoja', 'Subraya el vaso **más concentrado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['200 mL de agua con 2 cucharadas de sal'], ['100 mL de agua con 2 cucharadas de sal'], ['200 mL de agua con 1 cucharada de sal']], pista: 'Compara cuánta sal le toca a cada porción de agua, no solo cuánta sal hay.' }, 'La misma sal en menos agua: le toca más a cada porción.')],
    ],
    despues: [
      ['Más difícil: el agua no se detiene',
        xpMira('hoja', 'Un paso más: el agua cruza la membrana **en los dos sentidos**. Lo que cuenta es hacia dónde pasa más.', { paras: [['Una persona deshidratada llega al hospital.'], ['Si le ponen agua pura en la vena…'], ['…entra agua a los glóbulos rojos y pueden reventar.'], ['Por eso el suero lleva la misma concentración de sal que la sangre.']] }, [
          ['El agua entra y sale todo el tiempo de cada célula.', {}],
          ['Agua pura en la sangre: afuera queda menos concentrado.', { luz: [1], nota: { 1: 'menos sal afuera' } }],
          ['Entra mucha más agua de la que sale: el glóbulo se hincha.', { luz: [2], nota: { 2: 'peligro' } }],
          ['Con igual concentración, entra tanta como sale.', { luz: [3], nota: { 3: 'equilibrio' } }],
          ['La célula ni se hincha ni se arruga: queda como estaba.', { luz: [3] }],
        ], 'Con igual concentración el agua sigue pasando, pero entra tanta como sale.'),
        xpHaz('hoja', 'Unas fresas picadas se dejan con mucho azúcar encima y sueltan jugo. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El azúcar entra a las fresas y las infla.'], ['Afuera quedó más concentrado: sale agua de sus células.'], ['El azúcar rompe la pared y la derrite.']], pista: '¿Dónde quedó más soluto: dentro de la fresa o en el azúcar de afuera?' }, 'El agua va hacia lo más concentrado: sale de la fresa.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante afirma: «una tajada de zanahoria en agua muy salada gana masa». El examen pregunta si tiene razón y **por qué**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque la sal entra y la hace pesar más.'], ['Sí, porque el agua siempre entra a las células.'], ['No, porque pierde agua: afuera está más concentrado.'], ['No, porque la membrana no deja pasar el agua.']] }, [
        ['Decide tú primero: más sal afuera, el agua sale. Pierde masa.', {}],
        ['Esta suena científica, pero la sal casi no cruza.', { luz: [0], nota: { 0: 'razón falsa' } }],
        ['Esta dice «siempre»: depende de dónde hay más soluto.', { luz: [1], nota: { 1: 'absoluto' } }],
        ['Esta dice «No», pero su razón es falsa: el agua sí pasa.', { luz: [3], nota: { 3: 'buen no, mal porqué' } }],
        ['Esta tiene la conclusión y la razón correctas.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Decide el Sí o el No con tu cuenta y luego revisa que el «porque» sea cierto.'),
      xpHaz('hoja', 'Trozos de mango deshidratado pasan la noche en agua de la llave. Alguien dice que se hinchan. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Sí, porque dentro del mango hay más azúcar y el agua entra.'], ['Sí, porque el agua gasta energía para entrar.'], ['No, porque el agua sale hacia donde hay menos azúcar.'], ['No, porque el mango seco ya no tiene células.']], pista: 'Mira dónde hay más soluto, y si la razón dice algo que no es cierto.' }, 'Adentro está más concentrado: el agua entra sin gastar energía.')],
    cierre: 'Membrana que escoge, agua que va a lo más concentrado, energía para ir en contra y pared que aguanta.',
  });

  // Niveles: célula, tejido, órgano, sistema y organismo (k cuántos se ven).
  const corazon = (x, y, s) => `<path d="M${n(x)} ${n(y + 16 * s)} C${n(x - 22 * s)} ${n(y)} ${n(x - 18 * s)} ${n(y - 18 * s)} ${n(x - 6 * s)} ${n(y - 14 * s)} C${n(x - 2 * s)} ${n(y - 13 * s)} ${n(x)} ${n(y - 10 * s)} ${n(x)} ${n(y - 8 * s)} C${n(x)} ${n(y - 10 * s)} ${n(x + 2 * s)} ${n(y - 13 * s)} ${n(x + 6 * s)} ${n(y - 14 * s)} C${n(x + 18 * s)} ${n(y - 18 * s)} ${n(x + 22 * s)} ${n(y)} ${n(x)} ${n(y + 16 * s)}Z" fill="url(#xlb-l-rojo)" stroke="#8b1222" stroke-width="1.2"/>` +
    `<path d="M${n(x - 8 * s)} ${n(y - 6 * s)} q4 -4 8 -2" stroke="#fff" stroke-opacity=".5" fill="none"/>`;
  const tejido = (x, y) => [0, 1, 2].flatMap(i => [0, 1, 2].map(j => `<rect x="${n(x - 24 + i * 16)}" y="${n(y - 24 + j * 16)}" width="15" height="15" rx="4" fill="url(#xlb-celula)" stroke="#b5527d" stroke-width=".8"/><circle cx="${n(x - 16.5 + i * 16)}" cy="${n(y - 16.5 + j * 16)}" r="2.6" fill="url(#xlb-nucleo)"/>`)).join('');
  const sistema = (x, y) => `<path d="M${x} ${y - 26} C${x + 30} ${y - 26} ${x + 30} ${y + 30} ${x} ${y + 30} C${x - 30} ${y + 30} ${x - 30} ${y - 26} ${x} ${y - 26}" stroke="#c0392b" stroke-width="3" fill="none"/>` +
    `<path d="M${x - 4} ${y - 30} C${x - 36} ${y - 34} ${x - 36} ${y + 36} ${x - 4} ${y + 34}" stroke="#2949b8" stroke-width="2.4" fill="none" opacity=".85"/>` + corazon(x, y, 0.9);
  const niveles = (v, K) => {
    const P = [[36, 'célula'], [102, 'tejido'], [170, 'órgano'], [236, 'sistema'], [302, 'organismo']], k = v.k || 0;
    let s = '';
    if (k >= 1) s += X.celula(36, 100, 18, 'animal');
    if (k >= 2) s += tejido(102, 100);
    if (k >= 3) s += corazon(170, 98, 1.5);
    if (k >= 4) s += sistema(236, 98);
    if (k >= 5) s += X.persona(302, 160, 1.2, '#3f6fb5');
    for (let i = 1; i < Math.min(k, 5); i++) s += X.flecha(P[i - 1][0] + 22, 150, P[i][0] - 22, 150);
    P.slice(0, k).forEach(([x, t]) => { s += X.rot(x, 182, t); });
    if (v.t) s += X.rot(170, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-celula-2', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: de la célula al cuerpo',
        xpMira('dibujo', 'Un cuerpo tiene billones de células, pero no están revueltas: se organizan por **niveles**, de lo más pequeño a lo más grande.', { dib: niveles, v: { k: 0 }, alto: 200 }, [
          ['En la lección de transporte viste que cada célula toma y saca sustancias por su membrana.', { k: 1 }],
          ['Muchas células parecidas juntas forman un tejido, como ladrillos en un muro.', { k: 2 }],
          ['Varios tejidos forman un órgano, como el corazón.', { k: 3 }],
          ['Órganos que trabajan juntos forman un sistema: corazón, venas y arterias.', { k: 4 }],
          ['Todos los sistemas juntos forman el organismo: tú.', { k: 5 }],
          ['Mantener estable el interior de todo eso se llama homeostasis.', { k: 5, t: 'homeostasis = estable por dentro' }],
        ], 'Célula, tejido, órgano, sistema y organismo: cada nivel está hecho del anterior.'),
        xpHaz('hoja', 'Pon al margen el nivel de cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['sistema', 'órgano', 'tejido'], meta: [1, 2, 0], paras: [['El estómago'], ['Una capa de células del músculo'], ['Boca, estómago e intestinos trabajando juntos']], pista: 'Alguno no va ahí: ¿es una capa de células, una pieza o un equipo de piezas?' }, 'Capa de células: tejido. Pieza: órgano. Equipo: sistema.')],
    ],
    despues: [
      ['Más difícil: el riñón y el agua',
        xpMira('hoja', 'Un caso que mezcla esta lección con la anterior: el riñón cuida que la sangre no quede ni muy **aguada** ni muy **concentrada**.', { paras: [['Día de sol sin beber agua: poca orina y oscura.'], ['Tarde de tomar mucha agua: mucha orina y clara.'], ['En los dos casos el riñón ajusta cuánta agua suelta.'], ['La meta: la sangre siempre con la misma concentración.']] }, [
          ['Sin beber, la sangre se concentra.', { luz: [0], nota: { 0: 'guarda agua' } }],
          ['El riñón guarda agua: la orina sale poca y oscura.', { luz: [0] }],
          ['Con mucha agua, la sangre se diluye.', { luz: [1], nota: { 1: 'suelta agua' } }],
          ['El riñón suelta el sobrante: orina abundante y clara.', { luz: [1] }],
          ['Dos respuestas opuestas para una misma meta: eso es homeostasis.', { luz: [2, 3], nota: { 3: 'meta' } }],
        ], 'El riñón guarda o suelta agua para que la sangre quede con la misma concentración.'),
        xpHaz('hoja', 'Un ciclista suda dos litros y no bebe nada. Subraya lo que hace su riñón.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Suelta más agua para limpiar el cuerpo.'], ['Guarda agua: orina poca y concentrada.'], ['Deja de funcionar hasta que beba.']], pista: 'Al sudar, la sangre perdió agua. ¿Qué conviene: soltar más o guardar?' }, 'Perdió agua: el riñón la guarda para no concentrar la sangre.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se mide cada hora la temperatura de una persona que pasa de un cuarto frío a uno caliente. ¿Qué serie muestra que **mantiene el equilibrio**?', { letras: ['A', 'B', 'C', 'D'], paras: [['36.5 → 33.0 → 39.0 °C'], ['36.5 → 36.7 → 36.6 °C'], ['36.5 → 37.5 → 38.5 °C'], ['La misma del cuarto en cada hora']] }, [
        ['Homeostasis no es que nada cambie: es volver cerca del valor normal.', {}],
        ['Esta sigue al cuarto: baja con el frío y sube con el calor.', { luz: [0], nota: { 0: 'sigue al ambiente' } }],
        ['Esta sube y no vuelve: el equilibrio se perdió.', { luz: [2], nota: { 2: 'no vuelve' } }],
        ['Esta confunde el cuerpo con el aire del cuarto.', { luz: [3], nota: { 3: 'otra cosa' } }],
        ['Esta cambia muy poco y se queda cerca de 36.5: es la respuesta.', { luz: [1], nota: { 1: 'equilibrio' } }],
      ], 'En las series busca la que se queda cerca de su valor aunque el ambiente cambie.'),
      xpHaz('hoja', 'La temperatura de un lagarto sube y baja con la del sol; la de un perro casi no cambia. ¿Qué lo explica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['El perro regula su temperatura por dentro; el lagarto depende del ambiente.'], ['El lagarto no tiene células.'], ['El perro no tiene sangre.'], ['Los dos regulan su temperatura de la misma forma.']], pista: 'Hay opciones falsas sobre el cuerpo o que contradicen lo que dice la pregunta. ¿Quién se mantiene estable?' }, 'El perro mantiene su temperatura; el lagarto usa el sol.')],
    cierre: 'Células en niveles, un interior que vuelve a su valor y sistemas que trabajan en equipo.',
  });

  // Célula con núcleo y la doble hélice del ADN al lado (k: 0 hélice, 1 letras, 2 gen, 3 proteína).
  const BASE = 'ATGCGTACCATG', PAR = { A: 'T', T: 'A', G: 'C', C: 'G' }, COL = { A: '#e2544a', T: '#f2c230', G: '#3fb56a', C: '#3f8ee0' };
  const helice = (v, K) => {
    const k = v.k || 0, x0 = 150, dx = 15, yc = 92, A = 34;
    let s = X.celula(66, 96, 44, 'animal') + `<path d="M74 86 L${x0 - 6} 46 M74 108 L${x0 - 6} 140" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 4" opacity=".8"/>` +
      `<rect x="${x0 - 8}" y="40" width="${dx * 12 + 10}" height="106" rx="10" fill="#0d1a2b" opacity=".85"/>`;
    const y1 = i => yc + A * Math.sin(i * 0.55), y2 = i => yc - A * Math.sin(i * 0.55);
    for (let i = 0; i < 12; i++) {
      const x = x0 + 4 + i * dx, a = y1(i), b = y2(i), m = (a + b) / 2, B = BASE[i];
      if (Math.abs(a - b) < 8) continue;
      s += `<line x1="${n(x)}" y1="${n(a)}" x2="${n(x)}" y2="${n(m)}" stroke="${COL[B]}" stroke-width="5"/><line x1="${n(x)}" y1="${n(m)}" x2="${n(x)}" y2="${n(b)}" stroke="${COL[PAR[B]]}" stroke-width="5"/>`;
      const letra = (y, L) => `<text x="${n(x)}" y="${n(y)}" fill="${COL[L]}" font-size="9" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${L}</text>`;
      if (k >= 1) s += letra(Math.max(a, b) + 13, a > b ? B : PAR[B]) + letra(Math.min(a, b) - 6, a > b ? PAR[B] : B);
    }
    const tira = f => `<polyline points="${Array.from({ length: 45 }, (_, j) => { const i = j / 4; return `${n(x0 + 4 + i * dx)},${n(f(i))}`; }).join(' ')}" stroke="url(#xlb-metal)" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += tira(y1) + tira(y2);
    if (k >= 2) s += `<path d="M${x0 + 2} 34 v-6 h${dx * 6} v6" stroke="#ffe25a" stroke-width="2" fill="none"/>` + X.rot(x0 + 2 + dx * 3, 22, 'un gen = una receta', 'oscuro');
    if (k >= 3) s += [0, 1, 2, 3, 4, 5].map(j => `<circle cx="${n(x0 + 10 + j * 22)}" cy="170" r="8" fill="${['#e2544a', '#3fb56a', '#3f8ee0', '#f2c230', '#c79bf0', '#e2544a'][j]}" stroke="#1d2328" stroke-width=".8"/>`).join('') + X.rot(x0 + 64, 192, 'proteína: aminoácidos en fila');
    if (v.r) s += X.rot(66, 168, v.r);
    return X.foto(s, 206, 'lab');
  };

  xpAmplia('icf-cn-celula-3', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: un recetario en cada célula',
        xpMira('dibujo', 'En el núcleo hay una molécula larguísima, el **ADN**. Es como un libro de recetas que dice qué fabricar y cómo.', { dib: helice, v: { k: 0 }, alto: 206 }, [
          ['En la lección de la célula viste que el núcleo guarda las instrucciones.', { r: 'núcleo' }],
          ['Esas instrucciones son el ADN: dos tiras enrolladas como una escalera torcida.', {}],
          ['Está escrito con solo cuatro letras: A, T, G y C.', { k: 1 }],
          ['Las letras van en parejas fijas: A con T y G con C.', { k: 1 }],
          ['Un gen es un tramo del ADN: una receta para una proteína.', { k: 2 }],
          ['Las proteínas son los platos que hacen el trabajo, como la queratina del pelo.', { k: 3 }],
        ], 'ADN: el recetario. Gen: una receta. Proteína: lo que se fabrica con ella.'),
        xpHaz('hoja', 'En el ADN cada letra tiene una pareja fija. Subraya la pareja correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A con G'], ['G con C'], ['T con C']], pista: 'En el ADN la A siempre va con la T. ¿Con quién queda la G?' }, 'A con T y G con C: así se arman los peldaños.')],
    ],
    despues: [
      ['Más difícil: el mismo libro, otras recetas',
        xpMira('hoja', 'Algo que confunde: casi todas tus células tienen **el mismo ADN**. Entonces, ¿por qué una neurona no se parece a una célula de la piel?', { paras: [['Una célula de la piel y una del ojo tienen el mismo ADN.'], ['La de la piel lee los genes de la queratina.'], ['La del ojo lee los genes de los pigmentos de la vista.'], ['Cambia qué recetas se leen, no el libro.']] }, [
          ['Todas vienen de una sola célula: copiaron el mismo libro.', { luz: [0], nota: { 0: 'mismo ADN' } }],
          ['Pero cada una abre el libro en páginas distintas.', { luz: [1, 2] }],
          ['La de la piel fabrica queratina.', { luz: [1], nota: { 1: 'queratina' } }],
          ['La del ojo fabrica las proteínas que captan la luz.', { luz: [2], nota: { 2: 'pigmentos' } }],
          ['Distintas proteínas, distinto trabajo, mismo ADN.', { luz: [3] }],
        ], 'Las células de un cuerpo comparten el ADN y se diferencian por los genes que leen.'),
        xpHaz('hoja', 'Subraya lo cierto sobre una neurona y una célula del hígado de la misma persona.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tienen ADN distinto.'], ['Tienen el mismo ADN, pero leen genes distintos.'], ['La neurona no tiene ADN.']], pista: 'Las dos vienen de la misma primera célula. ¿Qué cambia entonces?' }, 'El libro es el mismo; las recetas que se leen, no.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tramo de ADN dice **TAC CGA**. Se copia a ARN y se lee. El examen pregunta qué afirmación es correcta.', { letras: ['A', 'B', 'C', 'D'], paras: [['El ARN es TAC CGA, igual al ADN.'], ['El ARN es AUG GCU e indica dos aminoácidos.'], ['El ARN es ATG GCT, con T.'], ['El ARN es AUG GCU e indica seis aminoácidos.']] }, [
        ['Haz tú la copia: T da A, A da U, C da G y G da C.', {}, '$\\text{TAC} \\to \\text{AUG} \\qquad \\text{CGA} \\to \\text{GCU}$'],
        ['Esta no copia nada: deja el ADN igual.', { luz: [0], nota: { 0: 'sin copiar' } }],
        ['Esta usa T: el ARN no tiene T, tiene U.', { luz: [2], nota: { 2: 'T en el ARN' } }],
        ['Esta cuenta letras, no codones: son 6 letras y 2 codones.', { luz: [3], nota: { 3: 'letras ≠ codones' } }],
        ['Copia bien y cuenta de tres en tres: es la respuesta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Copia letra por letra, cambia T por U y cuenta aminoácidos de tres en tres.'),
      xpHaz('hoja', 'Un tramo de ADN dice **GGA TTC**. ¿Cuál es su ARN y cuántos aminoácidos indica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['CCT AAG, dos aminoácidos'], ['GGA UUC, dos aminoácidos'], ['CCU AAG, dos aminoácidos'], ['CCU AAG, seis aminoácidos']], pista: 'Revisa tres cosas: que cada letra cambie por su pareja, que no quede T y que cuentes de a tres.' }, 'GGA da CCU y TTC da AAG: dos codones, dos aminoácidos.')],
    cierre: 'ADN en el núcleo, copia en ARN con U, lectura de tres en tres y mismas recetas en todo el cuerpo.',
  });
}
