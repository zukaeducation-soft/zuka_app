// Preuniversitario · pu-pr-3 «Velocidad y trabajo conjunto» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const carro = (K, x, y, cls) => K.r(x - 15, y - 13, 30, 10, cls, 4) + K.r(x - 8, y - 20, 16, 9, cls, 3) + K.c(x - 8, y - 2, 4, 'fk') + K.c(x + 8, y - 2, 4, 'fk');
  // Dos móviles en una vía de D km: uno desde la izquierda (va, sale en t = ta) y otro (vb) desde la derecha o detrás.
  const via = (v, K) => {
    const X = k => 24 + k / v.D * 292, a = v.va * v.t, b = v.modo === 'caza' ? v.vent + v.vb * v.t : v.D - v.vb * v.t;
    let h = K.l(20, 100, 320, 100, 'lm') + K.l(X(0), 96, X(0), 104, 'lm') + K.l(X(v.D), 96, X(v.D), 104, 'lm') + K.t(X(v.D), 120, `${v.D} km`, 's tm', 'end') + K.t(X(0), 120, '0', 's tm');
    h += K.l(X(0), 96, X(a), 96, 'la gr') + carro(K, X(a), 94, 'fa') + K.t(Math.max(30, X(a)), 64, `${N(a)} km`, 'ta');
    if (v.vb) h += (v.modo === 'caza' ? K.l(X(0), 106, X(b), 106, 'lg gr') : K.l(X(v.D), 106, X(b), 106, 'lg gr')) + carro(K, X(b), 94, 'fg') + K.t(Math.min(300, X(b)), v.modo === 'caza' || Math.abs(X(a) - X(b)) < 70 ? 44 : 64, `${N(v.modo === 'caza' ? b : v.vb * v.t)} km`, 'tg');
    return h + K.t(170, 26, `${N(v.t)} h`, 'b');
  };
  const media = (v, K) => {
    const u = 300 / 260, w1 = 120 * u, w2 = 120 * u, f = v.f;
    return K.t(170, 22, 'ida: 120 km a 60 km/h', 'ta') + K.r(32, 32, w1 * Math.min(1, f), 26, 'fa') + K.f(f > 0.9 ? 1 : 0, K.t(32 + w1 + 10, 50, '2 h', 'ta', 'start')) + K.t(170, 88, 'regreso: 120 km a 40 km/h', 'tg') + K.r(32, 98, w2 * Math.min(1, v.g), 26, 'fg') + K.f(v.g > 0.9 ? 1 : 0, K.t(32 + w2 + 10, 116, '3 h', 'tg', 'start')) + K.f(v.tot, K.t(170, 152, '240 km en 5 h', 'b'));
  };
  // Tanque que se llena con dos llaves: en t horas, t/A y t/B.
  const tanque = (v, K) => {
    const H = 140, y = 175, a = Math.min(1, v.t / v.A), b = v.dos ? Math.min(1 - a, v.t / v.B) : 0;
    return K.r(115, y - H * a, 110, H * a, 'fa') + K.r(115, y - H * a - H * b, 110, H * b, 'fg') + K.r(115, y - H, 110, H, 'fn') + (v.marcas ? Array.from({ length: v.marcas - 1 }, (_, i) => K.l(225, y - H * (i + 1) / v.marcas, 233, y - H * (i + 1) / v.marcas, 'lm')).join('') : '')
      + K.t(105, y - H * a / 2 + 5, a > 0.04 ? v.ta ?? '' : '', 'ta', 'end') + K.t(242, y - H * a - H * b / 2 + 5, b > 0.04 ? v.tb ?? '' : '', 'tg', 'start') + K.t(170, 24, `${N(v.t)} h`, 'b');
  };

  xpLec('pu-pr-3', [
    ['Distancia, velocidad y tiempo',
      xpMira('dibujo', 'Empecemos por la idea: la velocidad dice **cuánto avanzas en cada hora**.', { dib: via, v: { D: 300, va: 60, vb: 0, t: 0, modo: 'x', vent: 0 }, alto: 135 }, [
        ['Un carro va a 60 km/h: cada hora avanza 60 km.', { t: 1 }, '$60 \\cdot 1 = 60$'],
        ['En 3 horas avanza 60 tres veces: 180 km. Distancia es velocidad por tiempo.', { t: 3 }, '$d = v \\cdot t = 180$'],
        ['Ahora otro carro sale al tiempo desde el otro extremo, a 40 km/h.', { t: 0, vb: 40 }],
        ['Cada hora se acercan 60 más 40: 100 km. Las velocidades se suman.', { t: 1 }, '$60 + 40 = 100$'],
        ['Los separan 300 km: se encuentran en 3 horas.', { t: 3 }, '$300 \\div 100 = 3$'],
      ], '$d = v \\cdot t$. Si dos se acercan, sus velocidades se suman; si uno persigue a otro, se restan.'),
      xpHaz('dibujo', 'Dos ciclistas salen al tiempo desde pueblos a 105 km, a 20 y a 15 km/h. Mueve el reloj hasta que se encuentren.', { dib: via, v: { D: 105, va: 20, vb: 15, t: 0.5, modo: 'x', vent: 0 }, metas: { t: 3 }, alto: 190, manijas: [{ k: 't', min: 0, max: 5, paso: 0.5, et: 'horas', rot: v => N(v.t) }],
        lee: v => `$20 \\cdot ${N(v.t)} + 15 \\cdot ${N(v.t)} = ${N(35 * v.t)}$`, dice: v => (35 * v.t > 105 ? 'Ya se cruzaron: pasaron de largo.' : `Entre los dos llevan ${N(35 * v.t)} de 105 km.`) }, 'Se acercan 35 km cada hora: $105 \\div 35 = 3$ horas.')],
    ['Velocidad media: no es el promedio',
      xpMira('dibujo', 'Segunda idea: la velocidad **media** es toda la distancia entre todo el tiempo.', { dib: media, v: { f: 0, g: 0, tot: 0 }, alto: 165 }, [
        ['De ida, 120 km a 60 km/h: se gastan 2 horas.', { f: 1 }, '$120 \\div 60 = 2$'],
        ['De regreso, los mismos 120 km a 40 km/h: se gastan 3 horas.', { g: 1 }, '$120 \\div 40 = 3$'],
        ['En total, 240 km en 5 horas.', { tot: 1 }, '$\\tfrac{240}{5} = 48$'],
        ['La media es 48 km/h, no 50. Se pasa más tiempo yendo despacio, y eso pesa más.', {}, '$48 \\neq \\tfrac{60 + 40}{2}$'],
      ], 'Velocidad media = distancia total ÷ tiempo total. No se promedian las velocidades.'),
      xpHaz('fichas', 'Un bus hace 90 km a 90 km/h y otros 90 km a 45 km/h. Pon las horas de cada tramo y la velocidad media.', { slots: [{ x: 70, y: 70, w: 84, et: 'horas, tramo 1' }, { x: 170, y: 70, w: 84, et: 'horas, tramo 2' }, { x: 270, y: 70, w: 84, et: 'media (km/h)' }], fichas: ['1', '2', '3', '60', '67.5'], meta: ['1', '2', '60'], alto: 120, fondo: K => K.r(20, 14, 150, 22, 'fa') + K.r(170, 14, 150, 22, 'fg') + K.t(95, 30, '90 km', 's') + K.t(245, 30, '90 km', 's'), pista: 'La media es 180 km entre todas las horas.' }, '1 h y 2 h: $180 \\div 3 = 60$ km/h, y no 67.5.')],
    ['Trabajar juntos: se suman las rapideces',
      xpMira('dibujo', 'Tercera idea: juntos se suma lo que cada uno hace **en una hora**.', { dib: tanque, v: { t: 0, A: 4, B: 12, dos: 0, ta: '', tb: '' }, alto: 195 }, [
        ['Una llave llena el tanque en 4 horas. En una hora llena un cuarto.', { t: 1, ta: '1/4' }, '$\\tfrac14$'],
        ['Otra llave lo llena en 12 horas: en una hora, un doceavo.', { dos: 1, tb: '1/12' }, '$\\tfrac{1}{12}$'],
        ['Abiertas las dos, en una hora llenan un cuarto más un doceavo: la tercera parte.', {}, '$\\tfrac14 + \\tfrac{1}{12} = \\tfrac13$'],
        ['Entonces en 3 horas el tanque está lleno.', { t: 3, ta: '3/4', tb: '3/12' }, '$3 \\cdot \\tfrac13 = 1$'],
        ['No se promedian ni se suman las horas: juntas tardan menos que la más rápida sola.', {}, '$3 < 4$'],
      ], 'Suma lo que cada uno hace por hora. Juntos siempre tardan menos que el más rápido.'),
      xpHaz('dibujo', 'Una bomba llena un pozo en 5 h y otra en 20 h. Mueve el reloj hasta que juntas lo llenen justo.', { dib: tanque, v: { t: 1, A: 5, B: 20, dos: 1, marcas: 4 }, metas: { t: 4 }, alto: 245, manijas: [{ k: 't', min: 0, max: 8, paso: 1, et: 'horas' }],
        lee: v => `$\\tfrac{${v.t}}{5} + \\tfrac{${v.t}}{20} = \\tfrac{${5 * v.t}}{20}$`, dice: v => (v.t > 4 ? 'El pozo ya está lleno y se riega: menos horas.' : `Llevan ${5 * v.t} de 20 partes del pozo.`) }, '$\\tfrac15 + \\tfrac{1}{20} = \\tfrac{5}{20} = \\tfrac14$ por hora: 4 horas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un camión le lleva 160 km a un carro. El camión va a 50 km/h y el carro a 90 km/h. ¿En cuántas horas lo alcanza?', { dib: via, v: { D: 480, va: 90, vb: 50, t: 0, modo: 'caza', vent: 160 }, metas: { t: 4 }, alto: 190, manijas: [{ k: 't', min: 0, max: 5, paso: 0.5, et: 'horas', rot: v => N(v.t) }],
        lee: v => `$\\text{ventaja: } 160 - 40 \\cdot ${N(v.t)} = ${N(160 - 40 * v.t)}$`, dice: v => (v.t > 4 ? 'El carro ya lo pasó.' : `El carro descuenta 40 km cada hora: faltan ${N(160 - 40 * v.t)}.`) }, 'Cada hora descuenta $90 - 50 = 40$ km: $160 \\div 40 = 4$ horas.')],
  ], '$d = v \\cdot t$, velocidades que se suman o se restan, media como total entre total, y rapideces que se suman.');
}
