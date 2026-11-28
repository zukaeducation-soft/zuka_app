// Preicfes · Ciencias Naturales, mundo 3 «Movimiento y Fuerzas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  const txt = (x, y, s, c = '#1d2328', t = 10) => `<text x="${n(x)}" y="${n(y)}" fill="${c}" font-size="${t}" font-weight="600" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${s}</text>`;

  // Una calle con marcas cada 10 m, una persona en la posición p (m) y un cronómetro.
  const calle = (v, K) => {
    const xm = m => 34 + m * 5.4, p = v.p || 0;
    let s = `<rect x="0" y="150" width="340" height="16" fill="#8d8f8f"/><path d="M0 158 H340" stroke="#f4f4f4" stroke-width="1.5" stroke-dasharray="10 8"/>` +
      `<rect x="${xm(0) - 2}" y="70" width="4" height="80" fill="#5b646a"/><rect x="${xm(0) - 18}" y="62" width="36" height="14" rx="2" fill="#2f7d4a"/>` + txt(xm(0), 72, 'esquina', '#ffffff', 8);
    for (let m = 0; m <= 50; m += 10) s += `<rect x="${n(xm(m) - 1)}" y="166" width="2" height="8" fill="#ffffff"/>` + txt(xm(m), 186, `${m} m`, '#ffffff', 9);
    s += X.persona(xm(p), 150, 0.95, '#c0392b') + X.cronometro(296, 46, 22, v.c || '00:00');
    if (v.r) s += X.rot(Math.max(76, xm(p)), 40, v.r, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };
  // Gráfica de velocidad contra tiempo: m = 1 horizontal en 10, 2 sube, 3 pegada al cero.
  const vel = (v, K) => {
    const Xs = t => 56 + t * 62, Y = q => 160 - q * 5;
    let h = K.l(56, 160, 318, 160, 'lm') + K.l(56, 160, 56, 30, 'lm') + [0, 10, 20].map(q => K.l(56, Y(q), 314, Y(q), 'ls') + K.t(48, Y(q) + 4, q, 's tm', 'end')).join('') +
      [0, 1, 2, 3, 4].map(t => K.t(Xs(t), 176, t, 's tm')).join('') + K.t(318, 194, 'segundos', 's tm', 'end') + K.t(60, 22, 'velocidad (m/s)', 's tm', 'start');
    const L = { 1: [10, 10, 10, 10, 10], 2: [0, 5, 10, 15, 20], 3: [0, 0, 0, 0, 0] }[v.m];
    if (L) h += K.pl(L.map((q, t) => [Xs(t), Y(q)]), 'la gr');
    if (v.t) h += K.t(200, 50, v.t, 'ta');
    return h;
  };

  xpAmplia('icf-cn-movimiento-1', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: dónde estás y cuánto tardas',
        xpMira('dibujo', 'Para describir un viaje bastan dos medidas: **dónde** está algo y **cuándo**. Con ellas sale la velocidad.', { dib: calle, v: { p: 0 }, alto: 200 }, [
          ['En la lección de datos viste que una tabla junta lo que cambia con lo que se mide.', {}],
          ['Posición: dónde está algo, contado desde un punto cero, aquí la esquina.', { r: 'posición: 0 m' }],
          ['Como cuando dices «estoy a 20 metros de la esquina».', { p: 20, r: 'posición: 20 m' }],
          ['El tiempo se mide con un cronómetro: llegó ahí a los 10 segundos.', { p: 20, c: '00:10', r: '20 m a los 10 s' }],
          ['Velocidad: cuántos metros avanza en cada segundo.', { p: 20, c: '00:10', r: '2 m cada segundo' }, '$20 \\div 10 = 2$'],
          ['Si cada segundo avanza lo mismo, la velocidad es constante.', { p: 40, c: '00:20', r: '40 m a los 20 s' }],
        ], 'Posición: dónde está. Tiempo: cuándo. Velocidad: cuánto avanza en cada segundo.'),
        xpHaz('hoja', 'Cada medida tiene su unidad. Subraya la que es una **velocidad**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['30 metros'], ['5 segundos'], ['3 metros cada segundo']], pista: 'Esa es solo una distancia o solo un tiempo. La velocidad junta las dos.' }, 'Metros por cada segundo: distancia repartida en el tiempo.')],
    ],
    despues: [
      ['Más difícil: la gráfica de velocidad',
        xpMira('dibujo', 'La trampa más común: confundir la gráfica de **posición** con la de **velocidad**. Mira qué dice el eje vertical.', { dib: vel, v: { m: 0 }, alto: 200 }, [
          ['Ahora el eje vertical no dice dónde está, sino qué tan rápido va.', {}],
          ['Una línea horizontal aquí no es quieto: va siempre a 10 m/s.', { m: 1, t: 'velocidad constante' }],
          ['Una línea que sube es acelerar: cada segundo va más rápido.', { m: 2, t: 'acelera' }],
          ['Quieto, en esta gráfica, es estar pegado al cero.', { m: 3, t: 'quieto' }],
          ['Antes de leer cualquier gráfica, mira qué dice cada eje.', {}],
        ], 'En velocidad contra tiempo, horizontal es rapidez constante; quieto es estar en cero.'),
        xpHaz('hoja', 'En una gráfica de **velocidad** contra tiempo, la línea es horizontal en 15 m/s. Subraya lo que pasa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Está quieto.'], ['Va siempre a 15 m/s.'], ['Está frenando.']], pista: 'Esa sería la lectura de una gráfica de posición. Aquí el eje dice velocidad.' }, 'La velocidad no cambia: va parejo a 15 m/s.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un bus sale del paradero, avanza parejo 3 minutos, se detiene 2 en un semáforo y sigue. ¿Qué tabla de **posiciones** (m, cada minuto) lo representa?', { letras: ['A', 'B', 'C', 'D'], paras: [['0, 400, 800, 1200, 1200, 1200, 1600'], ['0, 400, 800, 1200, 0, 0, 400'], ['0, 400, 800, 1200, 1600, 2000, 2400'], ['200, 600, 1000, 1400, 1400, 1400, 1800']] }, [
        ['Revisa tres cosas: dónde empieza, cómo cambia y dónde se repite.', {}],
        ['Esta vuelve al cero: confunde detenerse con regresar.', { luz: [1], nota: { 1: 'regresa' } }],
        ['Esta nunca se detiene: le falta el semáforo.', { luz: [2], nota: { 2: 'no para' } }],
        ['Esta tiene la forma buena, pero no sale del paradero, sale de 200.', { luz: [3], nota: { 3: 'mal comienzo' } }],
        ['Sale de 0, avanza parejo, repite 1200 dos veces y sigue.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'En las tablas de posición, quieto es repetir el número; volver es que baje.'),
      xpHaz('hoja', 'Una ciclista arranca quieta y cada segundo va más rápido. ¿Qué tabla de posiciones (m, cada segundo) la representa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['0, 3, 6, 9, 12'], ['0, 1, 4, 9, 16'], ['0, 5, 5, 5, 5'], ['16, 9, 4, 1, 0']], pista: 'Calcula cuánto avanza en cada segundo. Si va más rápido, cada salto debe ser mayor que el anterior.' }, 'Avanza 1, 3, 5 y 7: cada segundo más que el anterior.')],
    cierre: 'Lee qué dice cada eje: en posición, horizontal es quieto; en velocidad, horizontal es ir parejo.',
  });

  // Soporte con resorte (l = 0 suelto, 1 estirado con la pesa) y una caja que se empuja (e).
  const fuerza = (v, K) => {
    let s = X.soporte(40, 166, 150, 140) + X.resorte(96, 34, v.l ? 76 : 44, v.pesa ? '1 kg' : '');
    s += `<rect x="200" y="122" width="76" height="44" rx="3" fill="#b8844f" stroke="#6b4423"/><path d="M204 136 H272 M204 150 H272" stroke="#6b4423" stroke-width=".8" opacity=".6"/>`;
    if (v.e) s += X.flecha(146, 144, 196, 144) + X.rot(168, 118, v.re || '', 'oscuro');
    if (v.rr) s += X.rot(150, 66, v.rr);
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-movimiento-2', {
    conecta: 'icf-cn-movimiento-1',
    desde: [
      ['Desde cero: qué es una fuerza',
        xpMira('dibujo', 'Para cambiar un movimiento hace falta una **fuerza**. Veamos qué es y cómo se mide.', { dib: fuerza, v: {}, alto: 200 }, [
          ['En la lección de movimiento viste que acelerar es cambiar la velocidad.', {}],
          ['Una fuerza es un empujón o un jalón: lo que puede cambiar un movimiento.', { e: 1, re: 'empujón' }],
          ['Tiene tamaño y dirección: no es igual empujar de lado que hacia arriba.', { e: 1, re: 'tamaño y dirección' }],
          ['Se mide en newtons. Un resorte la mide: entre más se estira, más fuerza.', { e: 1, re: 'empujón', rr: 'dinamómetro' }],
          ['Una bolsa de un kilo lo estira con unos 10 newtons: su peso.', { e: 1, re: 'empujón', l: 1, pesa: 1, rr: '1 kg ≈ 10 N' }],
        ], 'Una fuerza empuja o hala, tiene tamaño y dirección y se mide en newtons.'),
        xpHaz('hoja', 'Subraya lo que **sí** es una fuerza.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La rapidez de un bus'], ['El jalón de una cuerda sobre un balde'], ['La masa de una piedra']], pista: 'Esa describe qué tan rápido va algo o cuánta materia tiene. Busca un empujón o un jalón.' }, 'El jalón de la cuerda tiene tamaño y dirección: es una fuerza.')],
    ],
    despues: [
      ['Más difícil: equilibrio no es acción y reacción',
        xpMira('hoja', 'Una confusión que el examen aprovecha: dos fuerzas iguales y contrarias **no siempre** son un par de acción y reacción.', { paras: [['Un libro está quieto sobre la mesa.'], ['La Tierra lo hala hacia abajo: su peso.'], ['La mesa lo empuja hacia arriba con la misma fuerza.'], ['Las dos actúan sobre el libro: es equilibrio.'], ['La pareja del peso es el libro halando a la Tierra.']] }, [
          ['Sobre el libro hay dos fuerzas: peso y empuje de la mesa.', { luz: [1, 2] }],
          ['Son iguales y contrarias, y el libro sigue quieto.', { luz: [2], nota: { 2: 'iguales' } }],
          ['Pero las dos están sobre el mismo cuerpo: eso es equilibrio.', { luz: [3], nota: { 3: 'equilibrio' } }],
          ['Un par de acción y reacción actúa sobre cuerpos distintos.', { luz: [4] }],
          ['La Tierra hala al libro y el libro hala a la Tierra: ese es el par.', { luz: [4], nota: { 4: 'par' } }],
        ], 'Equilibrio: fuerzas sobre el mismo cuerpo. Par: entre dos cuerpos, una sobre cada uno.'),
        xpHaz('hoja', 'Una lámpara cuelga quieta de un cable. Subraya la pareja de acción y reacción del **peso** de la lámpara.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El cable hala la lámpara hacia arriba.'], ['La lámpara hala a la Tierra hacia arriba.'], ['El techo sostiene el cable.']], pista: 'El peso es entre la Tierra y la lámpara. Su pareja debe ser entre esos mismos dos.' }, 'Si la Tierra hala la lámpara, la lámpara hala a la Tierra.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un ascensor sube con velocidad constante. Alguien afirma que el cable hala **más** de lo que pesa el ascensor. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque si sube, la fuerza hacia arriba debe ganar.'], ['Sí, porque un cable siempre hala más que el peso.'], ['No, porque con velocidad constante la neta es cero: hala igual al peso.'], ['No, porque sobre el ascensor no actúa ninguna fuerza.']] }, [
        ['Decide primero: velocidad constante, nada cambia. Neta cero.', {}],
        ['Esta es la intuición de todos los días, y es falsa.', { luz: [0], nota: { 0: 'intuición' } }],
        ['Esta dice «siempre»: al arrancar sí gana, pero ya no.', { luz: [1], nota: { 1: 'absoluto' } }],
        ['Buen «No», mala razón: hay peso y hay jalón del cable.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['Esta tiene la conclusión y el porqué correctos.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Velocidad constante, en cualquier dirección, quiere decir fuerza neta cero.'),
      xpHaz('hoja', 'Una caja de 20 kg recibe 100 N hacia la derecha y 40 N hacia la izquierda. ¿Qué le pasa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Acelera hacia la derecha, 3 m/s más cada segundo.'], ['Acelera 7 m/s más cada segundo, sumando las fuerzas.'], ['Acelera 5 m/s más cada segundo, sin restar la de 40 N.'], ['Se queda quieta porque hay fuerzas contrarias.']], pista: 'Primero la neta: las contrarias se restan. Después reparte entre la masa.' }, 'Neta $100 - 40 = 60$ N y $60 \\div 20 = 3$.')],
    cierre: 'Fuerza neta: se suman o se restan; se reparte en la masa; equilibrio y par de acción no son lo mismo.',
  });

  // La Tierra con personas paradas alrededor y objetos que caen hacia el centro.
  const tierra = (v, K) => {
    const cx = 170, cy = 110, R = 50, k = v.k || 0;
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#7fb8e6" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#xlb-l-azul)"/>` +
      `<path d="M${cx - 30} ${cy - 30} q18 -14 30 -2 q10 12 -4 22 q-16 6 -26 -6z M${cx + 8} ${cy + 6} q22 -8 30 8 q2 20 -18 24 q-18 -6 -12 -32z M${cx - 40} ${cy + 12} q10 -4 14 8 q-4 12 -14 6z" fill="url(#xlb-hoja)" opacity=".9"/>` +
      `<circle cx="${cx - 18}" cy="${cy - 22}" r="16" fill="#fff" opacity=".12"/>`;
    if (k >= 3) [0, 90, 180, 270].forEach(a => { s += `<g transform="rotate(${a} ${cx} ${cy})">${X.persona(cx, cy - R, 0.7, ['#c0392b', '#3f6fb5', '#2f7d4a', '#8e44ad'][a / 90])}</g>`; });
    if (k >= 2) (k >= 3 ? [45, 135, 225, 315] : [45]).forEach(a => {
      const r = Math.PI * (a - 90) / 180, P = d => [cx + d * Math.cos(r), cy + d * Math.sin(r)];
      s += `<circle cx="${n(P(100)[0])}" cy="${n(P(100)[1])}" r="7" fill="url(#xlb-l-rojo)" stroke="#8b1222"/>` + X.flecha(...P(90), ...P(64), '#ffe25a');
    });
    if (k >= 4) s += X.rot(cx, 218, 'el jalón de la Tierra sobre ti: tu peso', 'oscuro');
    if (v.t) s += X.rot(cx, 16, v.t);
    return X.foto(s, 228, 'noche');
  };
  // Dos hojas que caen: a (bola) y b (plana), de 0 (arriba) a 1 (piso).
  const hojas = (v, K) => {
    const y = f => 40 + f * 112, ya = y(v.a || 0), yb = y(v.b || 0);
    let s = `<circle cx="110" cy="${n(ya)}" r="13" fill="#f4f6f7" stroke="#9aa5ab"/><path d="M100 ${n(ya - 4)} l8 6 l6 -9 M104 ${n(ya + 7)} l9 -3 l5 6" stroke="#9aa5ab" fill="none"/>` +
      `<g transform="rotate(-8 230 ${n(yb)})"><rect x="200" y="${n(yb - 2)}" width="62" height="4" fill="#f4f6f7" stroke="#9aa5ab"/></g>`;
    if (v.aire) s += [210, 230, 250].map(x => X.flecha(x, yb + 30, x, yb + 10, '#7fd3ff')).join('') + X.rot(300, yb + 24, 'aire');
    if (v.r) s += X.rot(110, 190, 'hoja en bola') + X.rot(230, 190, 'hoja plana');
    if (v.t) s += X.rot(170, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-movimiento-3', {
    conecta: 'icf-cn-movimiento-2',
    desde: [
      ['Desde cero: qué es la gravedad',
        xpMira('dibujo', 'Si sueltas algo, cae. La fuerza que lo hala se llama **gravedad**, y funciona igual en cualquier lugar del planeta.', { dib: tierra, v: { k: 1 }, alto: 228 }, [
          ['En la lección de fuerzas viste que una fuerza cambia el movimiento y se mide en newtons.', {}],
          ['La gravedad es una fuerza de atracción: todo lo que tiene masa atrae a lo demás.', { k: 1, t: 'todo lo que tiene masa atrae' }],
          ['La Tierra tiene muchísima masa: por eso su jalón se nota tanto.', { k: 2 }],
          ['Todo cae hacia su centro: «abajo» es hacia el centro, también al otro lado.', { k: 3 }],
          ['Ese jalón de la Tierra sobre ti es tu peso.', { k: 4 }],
        ], 'La gravedad atrae todo hacia el centro de la Tierra; ese jalón es el peso.'),
        xpHaz('hoja', 'Subraya hacia dónde cae una piedra que se suelta en la Antártida.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hacia el espacio, porque allá está «abajo» en el mapa.'], ['Hacia el centro de la Tierra, como en todas partes.'], ['Hacia el norte, donde hay más tierra.']], pista: 'El mapa no decide para dónde se cae. ¿Hacia dónde hala la Tierra?' }, 'En todo el planeta, abajo es hacia el centro de la Tierra.')],
    ],
    despues: [
      ['Más difícil: con aire, la forma importa',
        xpMira('dibujo', 'En el vacío todo cae igual. Pero aquí hay aire, y el aire **frena** según la forma. Mira dos hojas de papel idénticas.', { dib: hojas, v: { a: 0, b: 0 }, alto: 200 }, [
          ['Dos hojas iguales: una arrugada en bola y otra plana.', { r: 1 }],
          ['Tienen la misma masa, así que pesan lo mismo.', { r: 1, t: 'mismo peso' }],
          ['Se sueltan juntas: la bola llega primero.', { a: 1, b: 0.4 }],
          ['La hoja plana empuja más aire y el aire la frena más.', { a: 1, b: 0.45, aire: 1 }],
          ['No es el peso: es cuánta superficie choca con el aire.', { a: 1, b: 1 }],
          ['Por eso un paracaídas grande baja despacio.', { a: 1, b: 1, t: 'más superficie, más freno' }],
        ], 'Con aire, la forma cambia la caída: más superficie, más freno, aunque el peso sea igual.'),
        xpHaz('hoja', 'Un paracaidista abre el paracaídas y baja más despacio. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Pierde masa al abrirlo.'], ['El paracaídas empuja mucho aire y el aire lo frena.'], ['Allá arriba se acaba la gravedad.']], pista: 'Su masa y la gravedad siguen iguales. ¿Qué cambió al abrir la tela?' }, 'Más superficie empuja más aire: más freno.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se suelta una llave desde un balcón, sin contar el aire. ¿Qué tabla muestra su **velocidad** (m/s) cada segundo?', { letras: ['A', 'B', 'C', 'D'], paras: [['0, 10, 20, 30'], ['0, 10, 10, 10'], ['0, 5, 20, 45'], ['10, 20, 30, 40']] }, [
        ['Recuerda: parte quieta y gana unos 10 m/s cada segundo.', {}],
        ['Esta deja de ganar velocidad: la gravedad no se apaga.', { luz: [1], nota: { 1: 'no acelera' } }],
        ['Esos son los metros que baja, no su velocidad: otro eje.', { luz: [2], nota: { 2: 'es la distancia' } }],
        ['Esta tiene buen ritmo, pero no parte de cero: se soltó quieta.', { luz: [3], nota: { 3: 'mal comienzo' } }],
        ['Parte de 0 y suma 10 cada segundo: es la respuesta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Fíjate qué mide la tabla: velocidad suma 10 cada segundo; distancia crece cada vez más.'),
      xpHaz('hoja', 'En el vacío se sueltan juntas una bola de 2 kg y otra de 6 kg. ¿Qué afirmación es correcta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La de 6 kg cae tres veces más rápido.'], ['Caen igual, pero la de 6 kg pesa tres veces más.'], ['Caen igual porque pesan lo mismo.'], ['La de 2 kg llega primero por ser liviana.']], pista: 'Separa dos ideas: cómo caen y cuánto pesan. Una opción acierta en lo primero con una razón falsa.' }, 'Caen igual; el peso sí depende de la masa.')],
    cierre: 'Todo cae hacia el centro de la Tierra; sin aire caen igual, pero el peso depende de la masa.',
  });
}
