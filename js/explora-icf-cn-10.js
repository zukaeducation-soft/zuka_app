// Preicfes · Ciencias Naturales, mundo 10 «Ondas, Luz y Sonido» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Onda con n vueltas, amplitud A y fase g; un corcho en x = 170.
  const onda = (v, K) => { const y = x => 80 - v.A * Math.sin(2 * Math.PI * (v.n * (x - 24) / 292 - v.g)); return K.l(24, 80, 316, 80, 'lm') + K.pl(Array.from({ length: 121 }, (_, i) => { const x = 24 + 292 * i / 120; return [x, y(x)]; }), 'la gr') + K.f(v.k, K.c(170, y(170), 8, 'ff')) + K.t(170, 160, v.t, 'ta'); };
  // Espejo: llega a g de la normal y sale a s.
  const espejo = (v, K) => { const c = [170, 140]; return K.l(40, 140, 300, 140, 'gr') + K.f(v.nn, K.l(170, 20, 170, 140, 'lm d') + K.t(178, 26, 'normal', 's tm', 'start')) + K.l(...K.at(...c, 110, 90 + v.g), ...c, 'la gr') + K.f(v.s, K.l(...c, ...K.at(...c, 110, 90 - v.g), 'lg gr')) + K.t(170, 170, v.t, 'ta'); };
  // Aire arriba, agua abajo: entra a g, sale a r.
  const agua = (v, K) => { const c = [170, 90]; return K.r(20, 90, 300, 86, 'fa', 0) + K.l(170, 14, 170, 172, 'lm d') + K.l(...K.at(...c, 84, 90 + v.g), ...c, 'gr') + K.f(v.s, K.l(...c, ...K.at(...c, 84, 270 + v.r), 'lg gr')) + K.t(30, 24, 'aire', 's tm', 'start') + K.t(30, 168, 'agua', 's tm', 'start') + K.t(170, 196, v.t, 'ta'); };

  xpLec('icf-cn-ondas-1', [
    ['Viaja la energía',
      xpMira('dibujo', 'Empecemos por la idea: la onda **viaja**; la materia **vibra** y se queda.', { dib: onda, v: { n: 3, A: 34, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['Una onda avanza por el agua.', { g: 1 }],
        ['Hay un corcho flotando.', { k: 1 }],
        ['Cuando pasa la cresta, sube.', { g: 1.25, t: 'sube y baja' }],
        ['Después baja, en el mismo sitio.', { g: 1.75 }],
        ['Lo que avanzó fue la energía.', { t: 'viaja la energía' }],
      ], 'Viaja la energía, no la materia.'),
      xpHaz('hoja', 'En un estadio, la gente hace «la ola» sin moverse de su puesto. Subraya lo que viaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las personas'], ['El movimiento que pasa de uno a otro'], ['Las sillas']], pista: '¿Alguien cambia de puesto?' }, 'La perturbación pasa; cada quien se queda.')],
    ['Medir una onda',
      xpMira('dibujo', 'Segunda idea: **amplitud**, **longitud** y **frecuencia** son medidas distintas.', { dib: onda, v: { n: 2, A: 20, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['De cresta a cresta: la longitud de onda.', { t: 'longitud: cresta a cresta' }],
        ['Si crece la altura, crece la amplitud.', { A: 46, t: 'más amplitud: más fuerte' }],
        ['Si hay más crestas, la longitud es menor.', { A: 30, n: 5, t: 'menos longitud' }],
        ['La frecuencia cuenta vibraciones por segundo.', { t: 'frecuencia en hertz' }],
        ['El periodo es lo que tarda una.', {}, '$T = \\tfrac{1}{f}$'],
      ], 'Altura, distancia y cuántas por segundo.'),
      xpHaz('fichas', 'Un punto vibra 30 veces en 6 s. Pon la frecuencia (Hz) y el periodo (s).', { slots: fila('frecuencia', 'periodo'), fichas: ['5', '0.2', '6', '30', '2'], meta: ['5', '0.2'], alto: 96, pista: 'Divide las vibraciones entre los segundos.' }, '$30 \\div 6 = 5$ Hz y $1 \\div 5 = 0.2$ s.')],
    ['La rapidez',
      xpMira('fichas', 'Tercera idea: **rapidez = longitud por frecuencia**, y la pone el **medio**.', { slots: fila('longitud', 'frecuencia', 'rapidez'), fichas: ['2 m', '170 Hz', '340 m/s'], alto: 96 }, [
        ['En el aire el sonido va a 340.', { pon: { 2: '340 m/s' } }],
        ['Con 170 vibraciones por segundo…', { pon: { 1: '170 Hz' } }],
        ['…cada onda mide dos metros.', { pon: { 0: '2 m' } }, '$2 \\cdot 170 = 340$'],
        ['Con el doble de frecuencia mediría uno.', {}, '$1 \\cdot 340 = 340$'],
        ['La rapidez no cambió: el medio es el mismo.', {}],
      ], 'Si una sube, la otra baja.'),
      xpHaz('fichas', 'Una ola viaja a 6 m/s con longitud de 3 m. Pon la frecuencia, y la longitud si la frecuencia sube a 6 Hz.', { slots: fila('frecuencia', 'nueva longitud'), fichas: ['2', '1', '18', '3', '6'], meta: ['2', '1'], alto: 96, pista: 'El producto debe dar 6.' }, '$3 \\cdot 2 = 6$ y $1 \\cdot 6 = 6$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En el mismo aire, un pito agudo y un tambor grave. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El pito llega primero'], ['El tambor llega primero'], ['Llegan a la vez, si suenan juntos y a igual distancia']], pista: '¿Quién pone la rapidez?' }, 'El medio pone la rapidez: es la misma.')],
  ], 'Energía, medidas y rapidez.');

  xpLec('icf-cn-ondas-2', [
    ['Rebotar',
      xpMira('dibujo', 'Empecemos por la idea: en la **reflexión** sale con el **mismo ángulo**.', { dib: espejo, v: { g: 30, nn: 0, s: 0, t: '' }, alto: 180 }, [
        ['Un rayo llega a un espejo.', {}],
        ['La normal es perpendicular al espejo.', { nn: 1 }],
        ['Sale al otro lado, con el mismo ángulo.', { s: 1, t: '30° y 30°' }],
        ['Si llega más inclinado, sale más inclinado.', { g: 60, t: '60° y 60°' }],
        ['Los ángulos se miden desde la normal.', {}],
      ], 'El ángulo que llega es igual al que sale.'),
      xpHaz('fichas', 'Un rayo llega a 25° de la normal. Pon el ángulo de salida y el que hay entre los dos rayos.', { slots: fila('sale', 'entre los dos'), fichas: ['25', '50', '65', '90', '130'], meta: ['25', '50'], alto: 96, pista: 'La normal está en medio de los dos.' }, '25° a cada lado: 50°.')],
    ['El eco',
      xpMira('fichas', 'Segunda idea: el **eco** recorre **ida y vuelta**.', { slots: fila('tiempo', 'recorrido', 'distancia'), fichas: ['1 s', '340 m', '170 m'], alto: 96 }, [
        ['El eco vuelve en un segundo.', { pon: { 0: '1 s' } }],
        ['El sonido recorrió 340 metros.', { pon: { 1: '340 m' } }],
        ['Pero fue y volvió.', {}],
        ['La pared está a la mitad.', { pon: { 2: '170 m' } }, '$340 \\div 2 = 170$'],
        ['Así miden los barcos y los murciélagos.', {}],
      ], 'Recorrido entre dos.'),
      xpHaz('fichas', 'En el agua (1 500 m/s) el eco vuelve en 2 s. Pon el recorrido y la profundidad, en metros.', { slots: fila('recorrido', 'profundidad'), fichas: ['3 000', '1 500', '750', '6 000', '2'], meta: ['3 000', '1 500'], alto: 96, pista: 'Multiplica y después parte en dos.' }, '$1\\,500 \\cdot 2 = 3\\,000$; la mitad, 1 500.')],
    ['Doblarse',
      xpMira('dibujo', 'Tercera idea: en la **refracción** cambia la rapidez y, si entra inclinada, la **dirección**.', { dib: agua, v: { g: 50, r: 35, s: 0, t: '' }, alto: 206 }, [
        ['Un rayo llega inclinado al agua.', {}],
        ['En el agua va más despacio.', { t: 'más despacio' }],
        ['Por eso se acerca a la normal.', { s: 1, t: 'se acerca a la normal' }],
        ['Si llega derecho, no se desvía.', { g: 0, r: 0, t: 'derecho: sin desvío' }],
        ['Al salir al aire ocurre lo contrario.', { g: 50, r: 35, t: 'al salir, se aleja' }],
      ], 'Más despacio, se acerca; más rápido, se aleja.'),
      xpHaz('hoja', 'La luz sale inclinada de un diamante al aire, donde va más rápido. Subraya lo que hace.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Se aleja de la normal'], ['Se acerca a la normal'], ['Cambia de color']], pista: '¿Va más rápido o más despacio al salir?' }, 'Al ir más rápido se aleja de la normal.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Pon al margen qué fenómeno hace posible cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['reflexión total', 'refracción', 'absorción'], meta: [1, 0, 2], paras: [['Una lupa que agranda'], ['La luz que viaja por una fibra óptica'], ['Un estudio de grabación con espumas, sin eco']], pista: 'Alguna no va ahí: ¿se dobla, rebota adentro o se queda?' }, 'Se dobla, rebota toda adentro y se queda en la espuma.')],
  ], 'Rebotar, volver y doblarse.');
}
