// Preicfes · Ciencias Naturales, mundos 11 «Gases y Disoluciones» y 12 «Electricidad y Magnetismo», paso a paso (spec
// 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo
// pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Balón con partículas adentro (n: más partículas, p: más inflado, c: choques marcados) y un inflador.
  const balon = (v, K) => {
    const p = v.p || 0, R = 34 + p * 10, cx = 210, cy = 128 - p * 6, n = 8 + Math.round((v.n || 0) * 10);
    let s = `<rect x="58" y="96" width="22" height="70" rx="4" fill="url(#xlb-metal)" stroke="#4d565c"/><rect x="66" y="70" width="6" height="28" fill="#5b646a"/><rect x="50" y="64" width="38" height="8" rx="3" fill="#2f3539"/><rect x="50" y="162" width="38" height="6" rx="2" fill="#2f3539"/>` +
      `<path d="M80 150 C120 160 140 150 ${cx - R + 2} ${r2(cy + 10)}" stroke="#2f3539" stroke-width="3" fill="none"/>` +
      `<circle cx="${cx}" cy="${r2(cy)}" r="${r2(R)}" fill="#f7f7f5" stroke="#5b646a" stroke-width="1.5"/>`;
    [[0, 0], [-0.55, -0.45], [0.55, -0.45], [-0.6, 0.5], [0.6, 0.5]].forEach(([a, b]) => { const x = cx + a * R, y = cy + b * R, q = R * 0.2; s += `<path d="M${r2(x)} ${r2(y - q)} L${r2(x + q)} ${r2(y - q * 0.3)} L${r2(x + q * 0.6)} ${r2(y + q * 0.8)} L${r2(x - q * 0.6)} ${r2(y + q * 0.8)} L${r2(x - q)} ${r2(y - q * 0.3)}Z" fill="#2b2f33" opacity=".85"/>`; });
    for (let i = 0; i < n; i++) { const a = i * 2.4, d = R * 0.78 * Math.sqrt((i + 0.5) / n); s += `<circle cx="${r2(cx + d * Math.cos(a))}" cy="${r2(cy + d * Math.sin(a))}" r="3.4" fill="#3a6fd6" stroke="#fff" stroke-width=".8"/>`; }
    if ((v.c || 0) > 0.5) [30, 110, 200, 290].forEach(g => { const a = g * Math.PI / 180, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="5" fill="none" stroke="#ff9b1a" stroke-width="2"/>`; });
    return X.foto(s + (v.r ? X.rot(190, 30, v.r, 'oscuro') : ''), 200, 'campo', 172);
  };
  // Presión contra volumen a temperatura fija: n puntos, c la curva P = 12 / V, mal la recta que no sirve.
  const PV = [[12, 1], [6, 2], [3, 4], [2, 6]];
  const hiper = (v, K) => {
    const X0 = 50, Y0 = 156, gx = V => X0 + V * 20, gy = P => Y0 - P * 20;
    let h = K.l(X0, Y0, 320, Y0, 'lm') + K.l(X0, Y0, X0, 14, 'lm') + K.t(X0 + 8, Y0 - 6, 'volumen (L)', 's tm', 'start') + K.t(X0 + 4, 16, 'presión (atm)', 's tm', 'start');
    [2, 6, 12].forEach(V => { h += K.t(gx(V), Y0 + 14, V, 's tm'); }); [1, 2, 4, 6].forEach(P => { h += K.t(X0 - 6, gy(P) + 4, P, 's tm', 'end'); });
    if ((v.c || 0) > 0.01) h += K.f(v.c, K.pl(Array.from({ length: 41 }, (_, i) => { const V = 1.8 + i * 11.2 / 40; return [gx(V), gy(12 / V)]; }), 'la gr'));
    if ((v.mal || 0) > 0.01) h += K.f(v.mal, K.l(gx(2), gy(6), gx(12), gy(1), 'lf d'));
    PV.slice(0, Math.round(v.n || 0)).forEach(([V, P]) => { h += K.c(gx(V), gy(P), 5, 'fA'); });
    return h + K.t(185, 192, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-gases-1', {
    conecta: 'icf-cn-energia-2',
    desde: [
      ['Desde cero: qué es un gas',
        xpMira('dibujo', 'Antes de las leyes: un **gas** es un montón de partículas sueltas. Tres medidas lo describen: presión, volumen y temperatura.', { dib: balon, v: { p: 0, n: 0, c: 0, r: '' }, alto: 200 }, [
          ['En la lección de calor viste que el calor pasa de lo caliente a lo frío.', {}],
          ['Un gas son partículas sueltas que vuelan y chocan sin parar.', { r: 'partículas sueltas' }],
          ['Al chocar con la pared del balón la empujan: eso es la presión.', { c: 1, r: 'presión: empuje de los choques' }],
          ['Con el inflador entran más partículas: más choques, más presión.', { c: 1, n: 1, p: 1, r: 'más partículas, más presión' }],
          ['El volumen es el espacio que ocupa el gas: se mide en litros.', { c: 1, n: 1, p: 1, r: 'volumen: litros' }],
          ['Calentar las hace ir más rápido; en gases se usa kelvin: 0 °C son 273 K.', { c: 1, n: 1, p: 1, r: 'temperatura: kelvin' }],
        ], 'Presión: empuje de los choques. Volumen: espacio que ocupa. Temperatura: qué tan rápido se mueven, en kelvin.'),
        xpHaz('hoja', 'Subraya qué es la **presión** de un gas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El empuje de sus partículas al chocar con las paredes.'], ['El color del gas.'], ['Lo que pesa el recipiente.']], pista: 'Piensa en lo que hacen las partículas contra la pared del balón.' }, 'Choques contra la pared: presión.')],
    ],
    despues: [
      ['Más difícil: la gráfica de Boyle',
        xpMira('dibujo', 'Un paso más: te preguntan **cuál gráfica** representa la ley de Boyle. Mira la forma, no solo si sube o baja.', { dib: hiper, v: { n: 0, c: 0, mal: 0, t: '' }, alto: 198 }, [
          ['Con la temperatura fija, se mide la presión para varios volúmenes.', { n: 1, t: '12 L: 1 atm' }],
          ['Con la mitad del volumen, el doble de presión.', { n: 2, t: '6 L: 2 atm' }],
          ['Con 3 L, 4 atm; con 2 L, 6 atm.', { n: 4, t: 'P · V = 12 siempre' }],
          ['Los puntos no forman una recta: forman una curva que baja cada vez más despacio.', { n: 4, c: 1, t: 'curva, no recta' }],
          ['La recta es la trampa: no pasa por todos los puntos.', { n: 4, c: 1, mal: 1, t: 'la recta no sirve' }],
        ], 'Presión contra volumen da una curva que baja cada vez más despacio: el producto siempre es el mismo.'),
        xpHaz('hoja', 'Con la temperatura fija, subraya la forma de la gráfica de presión contra volumen.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Una recta que sube.'], ['Una recta horizontal.'], ['Una curva que baja cada vez más despacio.']], pista: 'Si el volumen se duplica, la presión se va a la mitad: ¿eso es una recta?' }, 'Curva que baja: es una relación inversa.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lata cerrada de aerosol está a 27 °C y 3 atm. Se calienta a 54 °C. ¿Su presión se duplica? Mira las opciones «Sí/No, porque…».', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque la temperatura se duplicó.'], ['Sí, porque el gas se expande el doble.'], ['No, porque la lata impide que cambie la presión.'], ['No: de 300 K a 327 K sube solo un 9 %, a unos 3.27 atm.']] }, [
        ['Decide primero con tu cuenta, en kelvin: 300 K y 327 K.', {}, '$27 + 273 = 300$'],
        ['La A usa Celsius: 54 no es el doble en kelvin.', { luz: [0], nota: { 0: 'en Celsius' } }],
        ['La B habla de expandirse, pero la lata es rígida.', { luz: [1], nota: { 1: 'no crece' } }],
        ['La C dice No con una razón falsa: la presión sí cambia.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['La D: la presión sigue a los kelvin, un 9 % más.', { luz: [3], nota: { 3: 'sirve' } }, '$3 \\cdot 1.09 \\approx 3.27$'],
      ], 'Con gases, pasa siempre a kelvin antes de comparar; luego revisa que la razón también sea cierta.'),
      xpHaz('hoja', 'Una bomba de bicicleta tapada tiene 300 mL de aire a 1 atm. Se empuja hasta 75 mL sin cambiar la temperatura. Subraya su presión.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['0.25 atm, porque el volumen bajó.'], ['225 atm, porque 300 − 75.'], ['1 atm, porque el aire es el mismo.'], ['4 atm, porque el volumen bajó a la cuarta parte.']], pista: 'Presión por volumen no cambia: ¿cuántas veces más pequeño quedó?' }, '$300 \\div 75 = 4$: cuatro veces la presión.')],
    cierre: 'Presión, volumen y temperatura en kelvin: mira qué queda fijo y cómo se mueven los otros dos.',
  });

  // Dos vasos de agua y panela: k 1 los bloques arriba (1 y 3), k 2 ya disueltos (claro y oscuro).
  const bloque = (x, y) => `<path d="M${x - 11} ${y - 7} H${x + 11} L${x + 13} ${y + 7} H${x - 13}Z" fill="#8a5a22" stroke="#5a3712" stroke-width=".8"/><path d="M${x - 11} ${y - 7} H${x + 11} L${x + 9} ${y - 3} H${x - 9}Z" fill="#b07a3a"/>`;
  const panela = (v, K) => {
    const k = v.k || 0;
    let s = X.vaso(110, 168, 74, 96, 0.72, k >= 2 ? 'te' : 'agua') + X.vaso(240, 168, 74, 96, 0.72, k >= 2 ? 'cafe' : 'agua');
    if (k >= 1 && k < 2) s += bloque(110, 58) + bloque(226, 58) + bloque(254, 58) + bloque(240, 43);
    if (k >= 1) s += X.rot(110, 188, '1 bloque') + X.rot(240, 188, '3 bloques');
    return X.foto(s + (v.r ? X.rot(175, 20, v.r, 'oscuro') : ''), 200, 'mesa', 170);
  };

  xpAmplia('icf-cn-gases-2', {
    conecta: 'icf-cn-materia-3',
    desde: [
      ['Desde cero: soluto, solvente y disolución',
        xpMira('dibujo', 'Antes de las cuentas: una **disolución** es una mezcla pareja, como el agua de panela. Tiene dos partes con nombre propio.', { dib: panela, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de solubilidad viste que en el agua solo cabe hasta cierta cantidad.', {}],
          ['El agua es el solvente: lo que disuelve.', { r: 'solvente: el agua' }],
          ['La panela es el soluto: lo que se disuelve.', { k: 1, r: 'soluto: la panela' }],
          ['Al revolver queda una sola mezcla pareja: la disolución.', { k: 2, r: 'disolución' }],
          ['Con más panela en la misma agua, queda más concentrada.', { k: 2, r: 'más soluto, más concentrada' }],
          ['Concentración: cuánto soluto hay en cada porción de disolución.', { k: 2, r: 'soluto por porción' }],
        ], 'Solvente: el que disuelve. Soluto: lo disuelto. Concentración: cuánto soluto hay por cada porción.'),
        xpHaz('hoja', 'Pon al margen qué es cada cosa en un tinto con azúcar.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['soluto', 'solvente'], meta: [1, 0], paras: [['El agua del tinto'], ['El azúcar que se disuelve']], pista: 'Alguna no va ahí: ¿cuál disuelve y cuál se disuelve?' }, 'El agua disuelve; el azúcar se disuelve.')],
    ],
    despues: [
      ['Más difícil: mezclar dos disoluciones',
        xpMira('fichas', 'Un paso más: si se juntan dos disoluciones, las concentraciones **no se suman**. Se suman los gramos y los litros.', { slots: fila('gramos', 'litros', 'g/L'), fichas: ['14', '2', '7'], alto: 96 }, [
          ['Un litro a 10 g/L tiene 10 gramos; otro a 4 g/L, 4 gramos.', {}],
          ['Juntos tienen 14 gramos de soluto.', { pon: { 0: '14' } }, '$10 + 4 = 14$'],
          ['Y entre los dos ocupan 2 litros.', { pon: { 1: '2' } }],
          ['La mezcla queda a 7 g/L, entre las dos.', { pon: { 2: '7' } }, '$14 \\div 2 = 7$'],
          ['La trampa es sumar: 14 g/L sería más que las dos.', {}],
        ], 'Al mezclar: gramos con gramos, litros con litros. La concentración queda entre las dos.'),
        xpHaz('fichas', 'Se mezclan 2 L a 6 g/L con 2 L a 10 g/L. Pon los gramos totales y la concentración final.', { slots: fila('gramos', 'g/L'), fichas: ['32', '8', '16', '4', '12'], meta: ['32', '8'], alto: 96, pista: 'Cada una: concentración por litros. Luego divide entre los 4 L.' }, '$12 + 20 = 32$ g y $32 \\div 4 = 8$ g/L.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Tres vasos de jugo en polvo: P, 10 g en 200 mL; Q, 10 g en 500 mL; R, 30 g en 1 000 mL. ¿Cuál quedó **más concentrado**?', { letras: ['A', 'B', 'C', 'D'], paras: [['R, porque tiene más soluto.'], ['Q, porque tiene más agua que P.'], ['P y Q quedaron iguales, porque tienen 10 g.'], ['P, porque tiene más soluto en cada litro.']] }, [
        ['Pasa todo a la misma unidad: gramos por litro.', {}],
        ['P: 50 g/L. Q: 20 g/L. R: 30 g/L.', {}, '$10 \\div 0.2 = 50$'],
        ['La A mira el total, no la proporción.', { luz: [0], nota: { 0: 'total' } }],
        ['La C olvida que el agua es distinta.', { luz: [2], nota: { 2: 'falta el agua' } }],
        ['La B confunde más agua con más concentrado: es al revés.', { luz: [1], nota: { 1: 'invierte' } }],
        ['La D compara bien: 50 es lo más alto.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Para comparar concentraciones, divide cada soluto entre su volumen, en la misma unidad.'),
      xpHaz('hoja', 'Un suero tiene 9 g de sal por litro. Se sirven 250 mL. Subraya la concentración de lo servido.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['2.25 g/L, porque es la cuarta parte.'], ['36 g/L, porque 9 · 4.'], ['9 g/L, porque servir no cambia la concentración.'], ['0.25 g/L, porque son 250 mL.']], pista: 'Sale soluto y agua en la misma proporción. ¿Qué cambia: los gramos o los gramos por litro?' }, 'Hay 2.25 g en 0.25 L: siguen siendo 9 g/L.')],
    cierre: 'Concentración es soluto entre disolución; al diluir o mezclar, cuenta gramos y litros por aparte.',
  });

  // Pila, interruptor (c: 1 cerrado) y bombillo sobre la mesa.
  const circuito = (v, K) => {
    const c = v.c || 0, on = c > 0.5;
    let s = X.cable([[124, 150], [160, 150]]) + X.cable([[186, 150], [300, 150], [300, 100], [259, 100]]) + X.cable([[241, 100], [36, 100], [36, 150], [60, 150]], '#2b2f33');
    s += `<rect x="154" y="152" width="40" height="8" rx="2" fill="#3b4247"/><circle cx="162" cy="150" r="3" fill="url(#xlb-metal)" stroke="#4d565c"/><circle cx="186" cy="150" r="3" fill="url(#xlb-metal)" stroke="#4d565c"/>` +
      `<line x1="162" y1="150" x2="${r2(162 + 24 * Math.cos((1 - c) * 0.6))}" y2="${r2(150 - 24 * Math.sin((1 - c) * 0.6))}" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>`;
    s += X.pila(92, 150, '9 V') + X.bombillo(250, 76, on ? 1 : 0);
    if (on && (v.e || 0) > 0.5) [[140, 150], [240, 150], [300, 126], [150, 100], [60, 100], [36, 128]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffd23f" stroke="#7a5b00" stroke-width=".5"/>`; });
    return X.foto(s + (v.r ? X.rot(150, 30, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-electrico-1', {
    conecta: 'icf-cn-atomo-2',
    desde: [
      ['Desde cero: qué es un circuito',
        xpMira('dibujo', 'Antes de las fórmulas: un **circuito** es un camino cerrado por donde la pila empuja electrones. Si el camino se abre, no pasa nada.', { dib: circuito, v: { c: 0, e: 0, r: '' }, alto: 200 }, [
          ['En la lección de enlaces viste que en un metal los electrones se mueven libres.', {}],
          ['La pila empuja esos electrones: ese empuje es el voltaje.', { r: 'voltaje: el empuje (V)' }],
          ['Los cables de cobre son el camino de los electrones.', { r: 'cables: el camino' }],
          ['Con el interruptor cerrado, el camino da la vuelta y el bombillo prende.', { c: 1, e: 1, r: 'circuito cerrado' }],
          ['Lo que pasa por segundo es la corriente; lo que estorba, la resistencia.', { c: 1, e: 1, r: 'corriente (A), resistencia (Ω)' }],
          ['Como una manguera: la presión, el agua que pasa y la parte estrecha.', { c: 1, e: 1, r: 'como una manguera' }],
          ['Si se abre el interruptor, se corta el camino y se apaga.', { c: 0, e: 0, r: 'circuito abierto' }],
        ], 'Voltaje empuja, corriente es lo que pasa, resistencia estorba. Sin camino cerrado no hay corriente.'),
        xpHaz('hoja', 'Subraya en qué caso **prende** el bombillo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un solo cable de un polo de la pila al bombillo, sin volver al otro polo.'], ['Dos cables que forman un camino cerrado.'], ['El circuito con el interruptor abierto.']], pista: 'La corriente tiene que salir de la pila y volver a ella.' }, 'Sin vuelta a la pila no hay corriente.')],
    ],
    despues: [
      ['Más difícil: agregar bombillos',
        xpMira('hoja', 'Un paso más: ¿qué pasa con el brillo al **agregar** bombillos iguales? Depende de si van en serie o en paralelo.', { paras: [['Serie, 1 bombillo: brillo normal'], ['Serie, 2 bombillos: los dos brillan menos'], ['Paralelo, 2 bombillos: cada uno brilla normal'], ['Paralelo: la pila entrega más corriente y dura menos']] }, [
          ['Con un bombillo, el brillo es el de siempre.', { luz: [0] }],
          ['En serie, dos bombillos suman resistencia: pasa menos corriente.', { luz: [1], nota: { 1: 'menos brillo' } }],
          ['En paralelo, cada uno recibe todo el voltaje de la pila.', { luz: [2], nota: { 2: 'igual brillo' } }],
          ['Pero la pila alimenta dos caminos: entrega el doble de corriente.', { luz: [3] }],
          ['Por eso en las casas todo va en paralelo.', { luz: [2, 3] }],
        ], 'En serie, más bombillos brillan menos. En paralelo brillan igual, pero la pila se gasta más rápido.'),
        xpHaz('hoja', 'Tres bombillos iguales están en serie con una pila. Se agrega un cuarto en la misma fila. Subraya lo que pasa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Todos brillan más.'], ['Solo el nuevo brilla.'], ['Todos brillan menos.']], pista: 'En serie, cada bombillo nuevo agrega resistencia al único camino.' }, 'Más resistencia en serie: menos corriente para todos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos bombillos iguales están en paralelo con una pila. Se desenrosca uno. ¿Qué pasa con el otro?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se apaga, porque se rompe el circuito.'], ['Brilla el doble, porque recibe la corriente del otro.'], ['Sigue igual, porque su rama sigue cerrada con el mismo voltaje.'], ['Brilla menos, porque la pila se cansa.']] }, [
        ['Primero imagina el dibujo: dos caminos separados.', {}],
        ['La A piensa en serie: allá sí se apagaría.', { luz: [0], nota: { 0: 'es serie' } }],
        ['La B supone que la corriente se pasa de rama.', { luz: [1], nota: { 1: 'no se pasa' } }],
        ['La D inventa un cansancio que nada en el dibujo muestra.', { luz: [3], nota: { 3: 'sin dato' } }],
        ['La C: su camino sigue cerrado y recibe el mismo voltaje.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Primero identifica si es serie o paralelo: muchas opciones falsas responden por el otro circuito.'),
      xpHaz('hoja', 'Un horno de 1 000 W y un cargador de 10 W se usan 1 hora cada uno. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Gastan lo mismo, porque fue el mismo tiempo.'], ['El cargador gasta más, porque se calienta.'], ['Ninguno gasta: la energía se conserva.'], ['El horno gasta 100 veces más energía.']], pista: 'Energía es potencia por tiempo. El tiempo es igual: compara las potencias.' }, '$1\\,000 \\div 10 = 100$: cien veces más energía.')],
    cierre: 'Camino cerrado, voltaje igual a corriente por resistencia, serie o paralelo, y energía es potencia por tiempo.',
  });

  // Peinilla frotada (q) que baja (b) hacia papelitos que saltan (a).
  const PAPEL = [[96, 2], [118, 6], [140, 1], [160, 5], [182, 3], [204, 7], [226, 2], [248, 4]];
  const peinilla = (v, K) => {
    const b = v.b || 0, a = v.a || 0, py = 36 + b * 52;
    let s = `<rect x="100" y="${r2(py)}" width="140" height="14" rx="4" fill="#2d6cdf"/>`;
    for (let i = 0; i < 26; i++) s += `<rect x="${103 + i * 5.2}" y="${r2(py + 13)}" width="2.6" height="16" rx="1" fill="#2d6cdf"/>`;
    if ((v.q || 0) > 0.5) for (let i = 0; i < 6; i++) s += `<text x="${118 + i * 21}" y="${r2(py + 11)}" fill="#fff" font-size="12" font-weight="700" style="text-anchor:middle">−</text>`;
    PAPEL.forEach(([x, g], i) => { const near = Math.abs(x - 170) < 70, y = 160 - (near ? a * (160 - (py + 34)) * (0.6 + (i % 3) * 0.2) : 0); s += `<rect x="${x - 5}" y="${r2(y - 3)}" width="10" height="6" rx="1" fill="#ffffff" stroke="#b9b6aa" stroke-width=".6" transform="rotate(${g * 12 - 40} ${x} ${r2(y)})"/>`; });
    return X.foto(s + (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'mesa', 166);
  };

  xpAmplia('icf-cn-electrico-2', {
    conecta: 'icf-cn-electrico-1',
    desde: [
      ['Desde cero: la carga eléctrica',
        xpMira('dibujo', 'Antes de las fuerzas: frota una peinilla en tu pelo y acércala a unos papelitos. Así se ve la **carga eléctrica**.', { dib: peinilla, v: { b: 0, q: 0, a: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la corriente es carga eléctrica que se mueve.', {}],
          ['Toda la materia tiene cargas positivas y negativas, en igual cantidad.', { r: 'neutra: iguales cargas' }],
          ['Al peinarte, la peinilla le quita electrones al pelo.', { q: 1, r: 'gana electrones' }],
          ['Queda con carga negativa de más: está cargada.', { q: 1, r: 'carga negativa' }],
          ['Al acercarla, los papelitos saltan hacia ella: se atraen.', { q: 1, b: 1, a: 1, r: 'atracción' }],
          ['Cargas iguales se repelen; distintas se atraen.', { q: 1, b: 1, a: 1, r: 'iguales se repelen' }],
        ], 'Frotar pasa electrones de un cuerpo a otro y deja carga. Iguales se repelen y distintas se atraen.'),
        xpHaz('hoja', 'Dos peinillas se frotan con el mismo pelo y quedan negativas. Subraya qué hacen al acercarlas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Se repelen.'], ['Se atraen.'], ['Nada, porque son de plástico.']], pista: 'Las dos tienen la misma carga.' }, 'Iguales se repelen.')],
    ],
    despues: [
      ['Más difícil: la brújula y la Tierra',
        xpMira('hoja', 'Un paso más: la **brújula** es un imán pequeño que gira libre. Se alinea con el imán gigante que es la Tierra.', { paras: [['La aguja es un imán con polo N y polo S'], ['Su polo N apunta al norte geográfico'], ['Polos distintos se atraen'], ['Cerca del norte geográfico hay un polo S magnético']] }, [
          ['La aguja de la brújula es un imán que gira libre.', { luz: [0] }],
          ['Su polo norte apunta hacia el norte de la Tierra.', { luz: [1] }],
          ['Pero recuerda: lo que atrae a un polo N es un polo S.', { luz: [2] }],
          ['Entonces, cerca del norte geográfico hay un polo sur magnético.', { luz: [3], nota: { 3: 'sorpresa' } }],
          ['Si acercas un imán, la aguja le hace caso a él.', {}],
        ], 'La brújula es un imán: su polo N apunta al norte porque allá hay un polo S magnético.'),
        xpHaz('hoja', 'Se acerca el polo N de un imán a una brújula. Subraya hacia dónde apunta el extremo N de la aguja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hacia el imán.'], ['Lejos del imán.'], ['Sigue al norte, sin cambio.']], pista: 'Dos polos iguales se rechazan.' }, 'N con N se repelen: la aguja se voltea.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se frota una peinilla y se cuentan los papelitos que levanta: 5 frotes, 2; 10 frotes, 4; 20 frotes, 8. ¿Qué conclusión tiene **evidencia**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Con 100 frotes levantará justo 40 papelitos.'], ['En este rango, más frotes levantan más papelitos.'], ['Una peinilla de metal levantaría los mismos.'], ['Los papelitos ya tenían carga antes de empezar.']] }, [
        ['Mira qué cambió (los frotes) y qué se midió (los papelitos).', {}],
        ['La A va mucho más allá de lo medido.', { luz: [0], nota: { 0: 'extrapola' } }],
        ['La C habla de un material que nadie probó.', { luz: [2], nota: { 2: 'sin dato' } }],
        ['La D afirma algo que el experimento no midió.', { luz: [3], nota: { 3: 'sin dato' } }],
        ['La B dice lo que muestran los datos, y solo eso.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Una conclusión con evidencia se queda dentro de lo que se midió.'),
      xpHaz('hoja', 'Se quiere saber si la humedad del aire cambia cuántos papelitos levanta la peinilla. Subraya el **mejor** diseño.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Peinillas distintas, en días distintos.'], ['Una sola prueba en un día seco.'], ['Misma peinilla y mismos frotes, en aire seco y en aire húmedo.'], ['Aire húmedo, pero con más frotes.']], pista: 'Solo debe cambiar la humedad; lo demás queda igual.' }, 'Una sola cosa cambia: la humedad.')],
    cierre: 'Cargas iguales se repelen y distintas se atraen; los imanes tienen dos polos, y corriente e imán se crean el uno al otro.',
  });
}
