// Preicfes · Ciencias Naturales, mundo 10 «Ondas, Luz y Sonido», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const r2 = x => Math.round(x * 100) / 100;

  // Una persona sacude una cuerda atada a un poste: la onda llega hasta f (0 a 1), amplitud A, fase g; una cinta roja en x = 200.
  const cuerda = (v, K) => {
    const A = v.A || 0, f = v.f || 0, g = v.g || 0, x0 = 50, x1 = 306, fr = x0 + f * (x1 - x0);
    const y = x => (x > fr ? 120 : 120 - A * Math.sin(2 * Math.PI * ((x - x0) / 86 - g)) * Math.min(1, (fr - x) / 30 + 0.2));
    const pts = Array.from({ length: 97 }, (_, i) => { const x = x0 + (x1 - x0) * i / 96; return `${r2(x)},${r2(y(x))}`; }).join(' ');
    const s = `<rect x="304" y="52" width="10" height="118" rx="2" fill="#7a5230"/><rect x="304" y="52" width="3" height="118" fill="#a5764a"/>` + X.persona(38, 170, 1, '#3f6fb5') +
      `<polyline points="${pts}" stroke="#000" stroke-opacity=".25" stroke-width="5" fill="none"/><polyline points="${pts}" stroke="#c9934f" stroke-width="3" fill="none"/>` +
      `<rect x="196" y="${r2(y(200) - 7)}" width="8" height="14" rx="2" fill="#e8434f" stroke="#a51f2a" stroke-width=".7"/>`;
    return X.foto(s + (v.r ? X.rot(170, 30, v.r, 'oscuro') : ''), 200, 'campo', 170);
  };

  xpAmplia('icf-cn-ondas-1', {
    conecta: 'icf-cn-energia-1',
    desde: [
      ['Desde cero: qué es una onda',
        xpMira('dibujo', 'Antes de medir: una **onda** es una perturbación que viaja y lleva energía de un lugar a otro. Mírala en una cuerda.', { dib: cuerda, v: { f: 0, A: 0, g: 0, r: '' }, alto: 200 }, [
          ['En la lección de energía viste que la energía pasa de una forma a otra.', {}],
          ['Sacude una cuerda atada a un poste: la mano sube y baja.', { f: 0.3, A: 22, g: 0.5, r: 'la mano vibra' }],
          ['La forma avanza hacia el poste: eso es una onda.', { f: 1, A: 22, g: 1.5, r: 'avanza la onda' }],
          ['La cinta roja solo sube y baja: no viaja con la onda.', { f: 1, A: 22, g: 2.5, r: 'la cuerda se queda' }],
          ['Lo más alto es la cresta y lo más bajo, el valle.', { f: 1, A: 22, g: 3, r: 'cresta y valle' }],
          ['La cuerda es el medio: el material por donde pasa la onda.', { f: 1, A: 22, g: 3.5, r: 'el medio: la cuerda' }],
        ], 'Onda: viaja la perturbación con su energía; el medio solo vibra en su sitio.'),
        xpHaz('hoja', 'Subraya qué es el **medio** de una onda.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El material por donde pasa, como la cuerda o el aire.'], ['El punto más alto de la onda.'], ['La mitad de la cuerda.']], pista: 'El medio es lo que vibra para que la onda pueda pasar.' }, 'Cuerda, agua o aire: el medio.')],
    ],
    despues: [
      ['Más difícil: cuando la onda cambia de medio',
        xpMira('hoja', 'Un paso más: si una onda pasa del aire al agua, algo se queda y algo cambia. Eso es justo lo que suelen preguntar.', { paras: [['Aire: 500 Hz, 340 m/s, 0.68 m'], ['Agua: 500 Hz, 1 500 m/s, 3 m'], ['La frecuencia la pone lo que vibra'], ['La rapidez la pone el medio']] }, [
          ['Un parlante vibra 500 veces por segundo en el aire.', { luz: [0] }],
          ['El sonido entra al agua y sigue con 500 Hz.', { luz: [1], nota: { 1: 'misma frecuencia' } }],
          ['La frecuencia no cambia: la decide quien vibra.', { luz: [2] }],
          ['En el agua va más rápido, así que cada onda es más larga.', { luz: [1, 3] }, '$3 \\cdot 500 = 1\\,500$'],
          ['Rapidez y longitud cambian juntas; la frecuencia se queda.', { luz: [3], nota: { 3: 'cambia' } }],
        ], 'Al cambiar de medio, la frecuencia se queda; cambian la rapidez y la longitud de onda.'),
        xpHaz('hoja', 'Una onda de 10 Hz pasa de una cuerda gruesa (2 m/s) a una delgada (6 m/s). Subraya su frecuencia en la delgada.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['10 Hz'], ['30 Hz'], ['3.3 Hz']], pista: 'La mano que vibra no cambió.' }, 'Sigue en 10 Hz; su longitud pasa de 0.2 m a 0.6 m.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el mismo aire, se duplica la frecuencia de un parlante. ¿Qué pasa con su sonido? Mira por qué cada opción falsa engaña.', { letras: ['A', 'B', 'C', 'D'], paras: [['La rapidez se duplica, porque vibra más rápido.'], ['La amplitud se duplica y suena más fuerte.'], ['La longitud se duplica, porque van juntas.'], ['La longitud de onda baja a la mitad y la rapidez no cambia.']] }, [
        ['Primero: el medio es el mismo, así que la rapidez es la misma.', {}],
        ['La A confunde vibrar más seguido con viajar más rápido.', { luz: [0], nota: { 0: 'confunde' } }],
        ['La B mezcla frecuencia con amplitud: el tono no es el volumen.', { luz: [1], nota: { 1: 'otra medida' } }],
        ['La C invierte: si una sube, la otra baja.', { luz: [2], nota: { 2: 'invierte' } }],
        ['La D: rapidez fija, frecuencia doble, longitud a la mitad.', { luz: [3], nota: { 3: 'sirve' } }, '$v = \\lambda \\cdot f$'],
      ], 'Con el mismo medio la rapidez no cambia: si la frecuencia sube, la longitud de onda baja.'),
      xpHaz('hoja', 'Un sonido se oye más fuerte, pero con el mismo tono. Subraya lo que **cambió**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La frecuencia.'], ['La rapidez en el aire.'], ['La amplitud.'], ['La longitud de onda.']], pista: 'El tono, agudo o grave, depende de la frecuencia. ¿Qué medida es el volumen?' }, 'Más fuerte es más amplitud; el tono sigue igual.')],
    cierre: 'La onda lleva energía; la frecuencia la pone quien vibra, la rapidez el medio, y $v = \\lambda f$.',
  });

  // Pecera con agua (superficie en y = 90). Un rayo de linterna llega a (150, 90): s lo dibuja, re rebota, w entra doblado,
  // nn la normal, d el camino que habría seguido sin doblarse.
  const pecera = (v, K) => {
    const rayo = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="#ff4b4b" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="#ff3030" stroke-width="2.2" stroke-linecap="round"/>`;
    const s0 = v.s || 0;
    let s = `<rect x="86" y="90" width="208" height="76" fill="url(#xlb-l-agua)" opacity=".75"/><rect x="86" y="60" width="208" height="106" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.6"/>` + X.pez(250, 136, 0.8);
    s += `<g transform="rotate(30 34 26)"><rect x="14" y="18" width="40" height="16" rx="4" fill="#2f3539"/><rect x="50" y="15" width="8" height="22" rx="2" fill="url(#xlb-metal)"/></g>`;
    if ((v.d || 0) > 0.01) s += `<line x1="150" y1="90" x2="278" y2="150" stroke="#9aa3a8" stroke-width="1.6" stroke-dasharray="4 4" opacity="${r2(v.d)}"/>`;
    if ((v.nn || 0) > 0.01) s += `<line x1="150" y1="40" x2="150" y2="164" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="5 4" opacity="${r2(v.nn)}"/>`;
    if (s0 > 0.01) s += rayo(52, 44, 52 + 98 * s0, 44 + 46 * s0);
    if ((v.re || 0) > 0.01) s += rayo(150, 90, 150 + 98 * v.re, 90 - 46 * v.re);
    if ((v.w || 0) > 0.01) s += rayo(150, 90, 150 + 63 * v.w, 90 + 68 * v.w);
    return X.foto(s + (v.r ? X.rot(246, 30, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Del agua (abajo) al aire (arriba): un rayo sale de (60, 168) con ángulo g desde la normal; pasado el límite, rebota.
  const atrapa = (v, K) => {
    const g = v.g * Math.PI / 180, hx = 60 + 78 * Math.tan(g), hy = 90, sn = 1.33 * Math.sin(g), sale = sn < 1;
    let h = K.r(10, 90, 320, 86, 'fa', 0) + K.t(18, 22, 'aire', 's tm', 'start') + K.t(18, 166, 'agua', 's tm', 'start') + K.l(hx, 26, hx, 170, 'lm d') +
      K.l(60, 168, hx, hy, 'la gr');
    if (sale) { const r = Math.asin(sn); h += K.l(hx, hy, hx + 70 * Math.sin(r), hy - 70 * Math.cos(r), 'lg gr'); }
    else h += K.l(hx, hy, hx + 70 * Math.sin(g), hy + 70 * Math.cos(g), 'lg gr');
    return h + K.t(170, 190, v.t || (sale ? 'sale al aire' : 'no sale: rebota toda'), 'ta');
  };

  xpAmplia('icf-cn-ondas-2', {
    conecta: 'icf-cn-ondas-1',
    desde: [
      ['Desde cero: la luz cambia de camino',
        xpMira('dibujo', 'Antes de los ángulos: la luz va en línea recta hasta que llega a otro material. Ahí puede **rebotar**, **doblarse** o las dos.', { dib: pecera, v: { s: 0, re: 0, w: 0, nn: 0, d: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la rapidez de una onda la pone el medio.', {}],
          ['La luz también es una onda, y viaja en línea recta.', { s: 1 }],
          ['Al llegar al agua, una parte rebota: es la reflexión.', { s: 1, re: 1, r: 'reflexión: rebota' }],
          ['Otra parte entra y se dobla: es la refracción.', { s: 1, re: 1, w: 1, r: 'refracción: se dobla' }],
          ['La normal es una línea imaginaria, perpendicular a la superficie.', { s: 1, re: 1, w: 1, nn: 1, r: 'la normal' }],
          ['Sin doblarse, la luz habría seguido la línea gris.', { s: 1, re: 1, w: 1, nn: 1, d: 1, r: 'se acercó a la normal' }],
        ], 'Reflexión: rebota. Refracción: entra a otro medio y se dobla. Los ángulos se miden desde la normal.'),
        xpHaz('hoja', 'Pon al margen qué le pasa a la luz en cada caso.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['reflexión', 'refracción'], meta: [1, 0], paras: [['El fondo de una piscina parece menos hondo.'], ['Ves tu cara en una vitrina oscura.']], pista: 'Alguna no va ahí: ¿la luz cambia de medio o se devuelve?' }, 'La piscina: refracción. La vitrina: reflexión.')],
    ],
    despues: [
      ['Más difícil: la luz atrapada',
        xpMira('dibujo', 'Un paso más: cuando la luz va del agua al aire, se aleja de la normal. Si está muy inclinada, pasa algo curioso: no sale.', { dib: atrapa, v: { g: 20, t: '' }, alto: 204 }, [
          ['Ahora la luz sale del agua hacia el aire, al revés que antes.', { g: 20, t: 'sale y se aleja de la normal' }],
          ['Con más inclinación, sale más tendida.', { g: 40, t: 'sale más tendida' }],
          ['Hay un ángulo límite, cerca de 49° en el agua: sale casi rasante.', { g: 48, t: 'casi rasante' }],
          ['Más inclinada que eso, no sale: rebota toda adentro.', { g: 60, t: 'reflexión total' }],
          ['Así viaja la luz por una fibra óptica, rebotando sin escaparse.', { g: 65, t: 'fibra óptica' }],
        ], 'Del agua al aire, pasado el ángulo límite, la luz no sale: se refleja toda. Así funciona la fibra óptica.'),
        xpHaz('dibujo', 'Arrastra el ángulo hasta que la luz quede **atrapada** en el agua.', { dib: atrapa, v: { g: 20, t: '' }, manijas: [{ k: 'g', min: 10, max: 70, paso: 5, et: 'ángulo con la normal' }], cumple: v => v.g >= 50, sol: { g: 60 }, alto: 250, pista: 'Inclínala más allá del ángulo límite, unos 49°.' }, 'Pasado el ángulo límite, rebota toda adentro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante mide en un espejo el ángulo con que llega la luz y con el que sale: 20° y 20°, 35° y 35°, 50° y 50°. ¿Qué concluye bien?', { letras: ['A', 'B', 'C', 'D'], paras: [['La luz se vuelve más lenta al tocar el espejo.'], ['Con más ángulo, la luz rebota con más fuerza.'], ['Pasa igual en el agua y en cualquier material.'], ['El ángulo de salida es igual al de llegada.']] }, [
        ['Mira solo lo que midió: dos ángulos en cada intento.', {}],
        ['La A habla de rapidez, que nadie midió.', { luz: [0], nota: { 0: 'sin dato' } }],
        ['La B inventa una «fuerza» del rebote.', { luz: [1], nota: { 1: 'sin dato' } }],
        ['La C generaliza a materiales que no se probaron.', { luz: [2], nota: { 2: 'generaliza' } }],
        ['La D dice justo lo que muestran los tres pares.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Una conclusión válida no va más allá de lo que se midió.'),
      xpHaz('hoja', 'Un delfín oye el eco de un pez 0.04 s después de chillar. En el agua el sonido va a 1 500 m/s. Subraya a qué distancia está el pez.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['60 m, porque 1 500 · 0.04.'], ['30 m, porque el sonido fue y volvió.'], ['37 500 m, porque 1 500 ÷ 0.04.'], ['15 m, porque es la cuarta parte.']], pista: 'El tiempo del eco cuenta la ida y la vuelta.' }, '$1\\,500 \\cdot 0.04 = 60$ m de recorrido: el pez está a 30 m.')],
    cierre: 'La luz rebota con el mismo ángulo, se dobla al cambiar de rapidez y, muy inclinada, queda atrapada.',
  });
}
