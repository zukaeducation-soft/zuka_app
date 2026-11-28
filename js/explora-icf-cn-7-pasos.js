// Preicfes · Ciencias Naturales, mundo 7 «Átomo y Enlaces», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  // Un lápiz en la mesa, la lupa y un círculo que se acerca: z = 1 grafito, 2 átomos, 3 un átomo por dentro.
  const zoom = (v, K) => {
    const z = v.z || 0, cx = 255, cy = 88, R = 60;
    let s = `<path d="M40 146 H170 V158 H40Z" fill="#e7b56a" stroke="#9c6b2c"/><path d="M40 146 L18 152 L40 158Z" fill="#e9cfa1" stroke="#9c6b2c"/><path d="M24 150.4 L18 152 L24 153.6Z" fill="#3a3a3a"/>` +
      `<path d="M170 146 H182 V158 H170Z" fill="#d66a8a"/><path d="M40 149 H170" stroke="#fff" stroke-opacity=".35"/>`;
    if (z >= 1) {
      s += X.lupa(58, 120, 20) + `<path d="M74 110 L${cx - R + 4} ${cy}" stroke="#fff" stroke-opacity=".7" stroke-dasharray="4 4"/>` +
        `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#f4f6f8" stroke="#3b4247" stroke-width="3"/>`;
      if (z < 2) for (let i = 0; i < 16; i++) s += `<rect x="${cx - 40 + (i * 37) % 80}" y="${cy - 34 + (i * 23) % 68}" width="${8 + (i % 3) * 4}" height="5" rx="2" fill="#4a4f55" opacity=".7"/>`;
      else if (z < 3) for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) { if (Math.hypot(c * 20 + (r % 2 ? 10 : 0), r * 18) > 46) continue; s += `<circle cx="${cx + c * 20 + (r % 2 ? 10 : 0)}" cy="${cy + r * 18}" r="9" fill="url(#xlb-metal)" stroke="#4d565c" stroke-width=".8"/>`; }
      else {
        s += `<ellipse cx="${cx}" cy="${cy}" rx="24" ry="24" fill="none" stroke="#8a969c" stroke-dasharray="3 3"/><ellipse cx="${cx}" cy="${cy}" rx="46" ry="46" fill="none" stroke="#8a969c" stroke-dasharray="3 3"/>`;
        for (let i = 0; i < 12; i++) s += `<circle cx="${(cx + 5 * Math.sqrt(i) * Math.cos(i * 2.4)).toFixed(1)}" cy="${(cy + 5 * Math.sqrt(i) * Math.sin(i * 2.4)).toFixed(1)}" r="4.4" fill="${i % 2 ? '#9aa3a8' : '#e0524f'}" stroke="#333" stroke-width=".5"/>`;
        [[24, 90], [24, 270], [46, 30], [46, 120], [46, 210], [46, 300]].forEach(([r, g]) => { s += `<circle cx="${(cx + r * Math.cos(g * Math.PI / 180)).toFixed(1)}" cy="${(cy - r * Math.sin(g * Math.PI / 180)).toFixed(1)}" r="4" fill="#3a6fd6" stroke="#fff" stroke-width=".8"/>`; });
      }
    }
    return X.foto(s + (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };
  // Casilla de la tabla periódica (potasio) con el dato que se mira (h: 1 número atómico, 2 masa, 3 ion).
  const casilla = (v, K) => {
    const h = Math.round(v.h || 0);
    return K.r(110, 18, 120, 128, 'fc', 8) + (h === 1 ? K.r(116, 26, 40, 26, 'fg', 5) : '') + (h === 2 ? K.r(182, 26, 44, 26, 'fg', 5) : '') + (h === 3 ? K.r(140, 70, 60, 40, 'fg', 6) : '') +
      K.t(122, 45, '19', 'b', 'start') + K.t(220, 45, '39.1', 's', 'end') + K.t(170, 102, h === 3 ? 'K⁺' : 'K', 'b') + K.t(170, 132, 'potasio', 's tm') +
      K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-atomo-1', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: de qué está hecha la materia',
        xpMira('dibujo', 'Antes de contar partículas: todo lo que tocas está hecho de **átomos**, piezas tan pequeñas que no se ven ni con lupa.', { dib: zoom, v: { z: 0, r: '' }, alto: 200 }, [
          ['En la lección de estados viste que la materia está hecha de partículas.', { z: 0 }],
          ['Mira la punta de un lápiz: es grafito, una forma del carbono.', { z: 1, r: 'grafito' }],
          ['Si pudieras acercarte millones de veces, verías bolitas: los átomos.', { z: 2, r: 'átomos' }],
          ['Cada átomo tiene un centro, el núcleo, y electrones alrededor.', { z: 3, r: 'núcleo y electrones' }],
          ['El protón es positivo, el electrón negativo y el neutrón no tiene carga.', { z: 3, r: 'protón +, electrón −' }],
          ['Un elemento es una clase de átomo: carbono, oxígeno, hierro…', { z: 3, r: 'elemento: una clase de átomo' }],
        ], 'La materia está hecha de átomos: un núcleo con protones y neutrones, y electrones alrededor.'),
        xpHaz('hoja', 'Subraya la frase **correcta** sobre las cargas del átomo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El protón es negativo.'], ['El electrón es negativo.'], ['El neutrón es positivo.']], pista: 'El núcleo es positivo por los protones, y el neutrón no tiene carga.' }, 'Protón positivo, electrón negativo, neutrón sin carga.')],
    ],
    despues: [
      ['Más difícil: leer una casilla de la tabla',
        xpMira('dibujo', 'Un paso más: te dan una **casilla** de la tabla y piden contar partículas. Cada número dice algo distinto.', { dib: casilla, v: { h: 0, t: '' }, alto: 184 }, [
          ['Cada casilla trae el símbolo, el número atómico y la masa atómica.', { h: 0, t: '' }],
          ['El número atómico, 19, son los protones: es potasio.', { h: 1, t: '19 protones' }],
          ['La masa, casi 39, suma protones y neutrones.', { h: 2, t: '39 − 19 = 20 neutrones' }, '$39 - 19 = 20$'],
          ['Neutro tiene 19 electrones; el ion K⁺ perdió uno.', { h: 3, t: 'K⁺: 18 electrones' }, '$19 - 1 = 18$'],
          ['La masa trae decimales porque promedia isótopos: se redondea.', { h: 2, t: 'masa promedio: 39.1' }],
        ], 'Número atómico: protones. Masa menos protones: neutrones. La carga dice cuántos electrones sobran o faltan.'),
        xpHaz('fichas', 'Una casilla dice: calcio, número atómico 20, masa 40. Pon los neutrones y los electrones del ion Ca²⁺.', { slots: fila('neutrones', 'electrones'), fichas: ['20', '18', '22', '40', '60'], meta: ['20', '18'], alto: 96, pista: 'Resta los protones a la masa; el ion +2 perdió dos electrones.' }, '$40 - 20 = 20$ neutrones y $20 - 2 = 18$ electrones.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Tres átomos: W (10 p, 10 n), X (10 p, 12 n) y Y (11 p, 11 n). Te preguntan cuáles son del **mismo elemento**.', { letras: ['A', 'B', 'C', 'D'], paras: [['W y Y, porque cada uno tiene tantos neutrones como protones.'], ['X y Y, porque los dos tienen masa 22.'], ['W y X, porque tienen el mismo número de protones.'], ['Los tres, porque todos son átomos neutros.']] }, [
        ['Decide tú primero: el elemento lo dicen los protones.', {}],
        ['La A usa un dato cierto, pero no es el que decide.', { luz: [0], nota: { 0: 'criterio falso' } }],
        ['La B compara masas: misma masa no es mismo elemento.', { luz: [1], nota: { 1: 'masa' } }],
        ['La D generaliza: ser neutro no dice qué elemento es.', { luz: [3], nota: { 3: 'generaliza' } }],
        ['La C cuenta protones: 10 y 10. Son isótopos.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Busca el dato que decide, los protones, y desconfía de razones ciertas que no responden.'),
      xpHaz('hoja', 'Un ion de bario tiene 56 protones y 54 electrones. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Es otro elemento, porque perdió electrones.'], ['Tiene carga −2, porque le faltan electrones.'], ['Tiene carga +2 y sigue siendo bario.'], ['Tiene carga +2, porque ganó dos protones.']], pista: 'Compara protones con electrones y pregúntate qué partícula cambió de verdad.' }, 'Faltan dos electrones: carga +2. El núcleo no cambió: sigue siendo bario.')],
    cierre: 'Los protones dicen el elemento; neutrones y electrones pueden variar; la tabla lo ordena todo.',
  });

  // Tres cosas de la cocina: sal en un plato, un vaso de agua y un alambre de cobre; k muestra sus rótulos.
  const cocina = (v, K) => {
    const k = v.k || 0;
    let s = `<ellipse cx="70" cy="160" rx="44" ry="9" fill="#f4f4f4" stroke="#b9b9b9"/>`;
    for (let i = 0; i < 18; i++) { const x = 46 + (i * 29) % 48, y = 152 - Math.floor(i / 6) * 6 - (i % 3); s += `<rect x="${x}" y="${y}" width="5" height="5" fill="#ffffff" stroke="#9aa3a8" stroke-width=".6" transform="rotate(${(i * 17) % 40 - 20} ${x + 2.5} ${y + 2.5})"/>`; }
    s += X.vaso(170, 166, 56, 76, 0.7, 'agua');
    const bob = [[230, 160]]; for (let i = 0; i < 14; i++) bob.push([250 + i * 4, 150 + (i % 2 ? -18 : 6)]);
    s += X.cable(bob, '#c87533') + X.cable([[306, 156], [320, 140]], '#c87533');
    if (k >= 1) s += X.rot(68, 132, 'sal: regala');
    if (k >= 2) s += X.rot(170, 78, 'agua: comparte');
    if (k >= 3) s += X.rot(270, 116, 'cobre: fondo común');
    return X.foto(s, 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-atomo-2', {
    conecta: 'icf-cn-atomo-1',
    desde: [
      ['Desde cero: por qué se pegan los átomos',
        xpMira('dibujo', 'Antes de los nombres: un **enlace** es la forma en que dos o más átomos quedan pegados. Todo depende de qué hacen con sus electrones.', { dib: cocina, v: { k: 0 }, alto: 200 }, [
          ['En la lección del átomo viste que los metales pierden electrones y los no metales los ganan.', { k: 0 }],
          ['Los átomos se unen formando enlaces, como piezas que se enganchan.', { k: 0 }],
          ['En la sal, un átomo le regala un electrón al otro.', { k: 1 }],
          ['En el agua, los átomos comparten electrones, como dos bajo una misma sombrilla.', { k: 2 }],
          ['En el cobre, todos ponen electrones en un fondo común, como cuando se hace una vaca.', { k: 3 }],
          ['Regalar, compartir o juntar: así se unen casi todas las sustancias.', { k: 3 }],
        ], 'Enlace: cómo se pegan los átomos. Regalan (iónico), comparten (covalente) o juntan (metálico).'),
        xpHaz('hoja', 'Pon al margen qué hacen los átomos con sus electrones en cada sustancia.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['regalan', 'comparten', 'fondo común'], meta: [2, 0, 1], paras: [['Un alambre de cobre'], ['La sal de cocina'], ['El agua']], pista: 'Alguna no va ahí: ¿es un metal, un metal con un no metal, o dos no metales?' }, 'Metal: fondo común. Sal: regalan. Agua: comparten.')],
    ],
    despues: [
      ['Más difícil: el enlace por sus propiedades',
        xpMira('hoja', 'Casi nunca te nombran el enlace: te dan una **tabla de propiedades** y tú lo deduces. Hay que usar dos pistas, no una.', { paras: [['P: funde a 1 000 °C; sólida no conduce; disuelta, sí.'], ['Q: funde a 1 080 °C; sólida conduce.'], ['R: funde a 5 °C; no conduce nunca.'], ['«Funde muy caliente: es iónica»']] }, [
          ['P y Q funden muy calientes: con eso solo no basta.', { luz: [0, 1] }],
          ['Q conduce sólida: sus electrones se mueven. Es metálica.', { luz: [1], nota: { 1: 'metálico' } }],
          ['P solo conduce disuelta: sus iones se sueltan. Es iónica.', { luz: [0], nota: { 0: 'iónico' } }],
          ['R funde fácil y no conduce: es covalente.', { luz: [2], nota: { 2: 'covalente' } }],
          ['Una sola pista engaña: un metal también funde muy caliente.', { luz: [3], tacha: [3] }],
        ], 'Conduce sólido: metálico. Solo disuelto: iónico. Funde fácil y no conduce: covalente.'),
        xpHaz('hoja', 'Una sustancia dura funde a 900 °C y sólida no conduce. Subraya la prueba que **falta** para saber si es iónica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Ver si conduce disuelta en agua.'], ['Pesarla en una balanza.'], ['Mirar su color.']], pista: 'Piensa en qué propiedad separa lo iónico de lo covalente.' }, 'Si disuelta conduce, tiene iones: es iónica.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Con un bombillo se prueban tres líquidos: agua con bicarbonato prende; agua con alcohol y aceite no. ¿Qué conclusión tiene **evidencia**?', { letras: ['A', 'B', 'C', 'D'], paras: [['El bicarbonato es un metal, porque prendió el bombillo.'], ['El bicarbonato disuelto suelta iones que se mueven; el alcohol no.'], ['El agua sola hace prender el bombillo.'], ['El alcohol es iónico, porque se mezcla con el agua.']] }, [
        ['Fíjate en qué se probó y qué no se probó.', {}],
        ['La A confunde: conducir disuelto no es ser metal.', { luz: [0], nota: { 0: 'confunde' } }],
        ['La C habla del agua sola, que nadie probó.', { luz: [2], nota: { 2: 'sin dato' } }],
        ['La D suena científica, pero mezclarse no es tener iones.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La B explica justo lo que se vio: hay iones sueltos.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'La conclusión buena sale de los datos del experimento, no de lo que suena científico.'),
      xpHaz('hoja', 'Dos sólidos grises: X conduce y se dobla; Y no conduce sólido y se parte al golpearlo. Subraya lo que se **concluye**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Los dos son metales, porque son grises.'], ['Y es metálico, porque es muy duro.'], ['X es iónico, porque conduce.'], ['X es metálico y Y puede ser iónico.']], pista: 'El color no dice el enlace. Mira quién conduce sólido y quién se parte.' }, 'Conducir sólido y doblarse: metálico. Partirse sin conducir: puede ser iónico.')],
    cierre: 'Regalar, compartir o juntar electrones: se descubre mirando si conduce, cuándo, y cómo se funde.',
  });
}
