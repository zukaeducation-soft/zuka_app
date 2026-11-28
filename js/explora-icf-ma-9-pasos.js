// Preicfes · Matemáticas, mundo 9 «Dinero y Créditos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es el capital,
// la tasa y un multiplicador hasta las tablas de saldo y los pasos con error que pide el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Capital (barra larga), interés i (pedazo que se suma) y el total s.
  const plata = (v, K) => K.r(40, 60, 240, 40, 'fa', 3) + K.t(160, 86, 'capital', 'b') +
    K.f(v.i, K.r(284, 60, 24, 40, 'fg', 3) + K.t(296, 50, 'interés', 's tg')) +
    K.f(v.s, K.cota(40, 118, 308, 118, 'capital + interés')) + K.t(170, 30, v.t || '', 'ta');
  // Precio: el 100 % es la barra punteada; q es el porcentaje que se paga (más de 100 si hay impuesto).
  const precio = (v, K) => {
    const q = v.q, w = Math.min(q, 100) * 2.2;
    return K.r(30, 60, 220, 40, 'fn', 3) + K.r(30, 60, w, 40, 'fa', 3) + K.f(q > 100.5 ? 1 : 0, K.r(252, 60, (q - 100) * 2.2, 40, 'fg', 3)) +
      K.t(30 + w / 2, 86, `${Math.round(q)} %`, 'b') + K.t(170, 132, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-finanzas-1', {
    conecta: 'icf-ma-proporcion-2',
    desde: [
      ['Desde cero: capital, interés y tasa',
        xpMira('dibujo', 'Antes de las fórmulas: el **interés** es lo que se paga por usar plata ajena, y es un **porcentaje** de esa plata.', { dib: plata, v: { i: 0, s: 0, t: '' }, alto: 150 }, [
          ['En «Porcentajes y cambios» viste que el 10 % es la décima parte.', {}],
          ['El capital es la plata que se presta o se ahorra.', { t: 'capital: 200 mil' }],
          ['El interés es lo que se paga por usar esa plata.', { i: 1, t: 'interés' }],
          ['La tasa dice qué porcentaje del capital es el interés.', { t: 'tasa: 10 % al año' }],
          ['El 10 % de 200 mil son 20 mil en un año.', { t: '10 % de 200 = 20' }, '$0.10 \\cdot 200 = 20$'],
          ['Al final se devuelve el capital más el interés.', { s: 1, t: '200 + 20 = 220 mil' }],
        ], 'Interés = tasa por capital; al final se paga capital más interés.'),
        xpHaz('fichas', 'Se ahorran 300 mil al 5 % anual. Pon el interés de un año y lo que hay al final de ese año.', { slots: fila('interés', 'al final'), fichas: ['15', '315', '5', '305', '350'], meta: ['15', '315'], alto: 96, pista: 'El 1 % de 300 es 3; el 5 % son cinco veces eso.' }, '$0.05 \\cdot 300 = 15$ y $300 + 15 = 315$.')],
    ],
    despues: [
      ['Más difícil: ¿cuándo se duplica?',
        xpMira('fichas', 'Una pregunta típica: cuánto tarda la plata en **duplicarse**, con simple y con compuesto, al 10 % anual.', { slots: fila('simple', 'compuesto'), fichas: ['10 años', '8 años'], alto: 96 }, [
          ['Al 10 % simple, cada año suma la décima parte del inicio.', {}],
          ['Para sumar otro capital completo hacen falta diez años.', { pon: { 0: '10 años' } }, '$10 \\cdot 10\\,\\% = 100\\,\\%$'],
          ['En compuesto, se multiplica por 1.1 año tras año.', {}, '$1.1^7 \\approx 1.95$'],
          ['En el año ocho ya pasa del doble.', { pon: { 1: '8 años' } }, '$1.1^8 \\approx 2.14$'],
          ['El compuesto llega antes porque el interés también gana interés.', { marca: [1] }],
        ], 'El compuesto se duplica antes: el interés gana interés.'),
        xpHaz('fichas', 'Al 15 % anual, pon el primer año en que el capital se duplica con interés simple y con compuesto.', { slots: fila('simple', 'compuesto'), fichas: ['7', '5', '6', '4', '15'], meta: ['7', '5'], alto: 96, pista: 'En simple cuenta cuántos 15 % hacen 100 %; en compuesto multiplica por 1.15 hasta pasar de 2.' }, 'Simple: 7 años (105 %). Compuesto: $1.15^5 \\approx 2.01$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se ahorran 100 mil al 10 % anual **compuesto**. ¿Qué tabla muestra el saldo, en miles, en los años 0, 1, 2 y 3?', { letras: ['A', 'B', 'C', 'D'], paras: [['100, 110, 121, 133.1'], ['100, 110, 120, 130'], ['110, 121, 133.1, 146.41'], ['0, 10, 21, 33.1']] }, [
        ['Mira primero el punto de partida: en el año cero hay cien.', {}],
        ['Esta empieza en 110: tiene la forma buena y el arranque malo.', { luz: [2], nota: { 2: 'arranque malo' } }],
        ['Esta muestra solo el interés ganado, no el saldo.', { luz: [3], nota: { 3: 'solo interés' } }],
        ['Esta sube siempre diez: es interés simple.', { luz: [1], nota: { 1: 'simple' } }],
        ['Esta multiplica por 1.1 desde cien: sirve.', { luz: [0], nota: { 0: 'sirve' } }, '$121 \\cdot 1.1 = 133.1$'],
      ], 'Revisa el punto de partida y si cada paso suma o multiplica.'),
      xpHaz('hoja', 'Una deuda de 50 mil crece al 20 % mensual compuesto. Subraya la tabla de los meses 0, 1, 2 y 3, en miles.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['50, 60, 70, 80'], ['60, 72, 86.4, 103.68'], ['50, 60, 72, 86.4'], ['0, 10, 22, 36.4']], pista: 'Revisa el mes 0 y si cada paso suma lo mismo o multiplica por lo mismo.' }, '$50 \\cdot 1.2 = 60$, $60 \\cdot 1.2 = 72$ y $72 \\cdot 1.2 = 86.4$.')],
    cierre: 'El interés es un porcentaje del dinero: simple suma lo mismo, compuesto multiplica; revisa siempre el arranque.',
  });

  xpAmplia('icf-ma-finanzas-2', {
    conecta: 'icf-ma-finanzas-1',
    desde: [
      ['Desde cero: el multiplicador',
        xpMira('dibujo', 'Un descuento quita un pedazo del precio y un impuesto lo agrega. Todo se resume en un **multiplicador**.', { dib: precio, v: { q: 100, t: '' }, alto: 145 }, [
          ['En la lección anterior viste que el interés es un porcentaje que se suma.', {}],
          ['El precio completo es el cien por ciento.', { t: 'precio completo' }],
          ['Un descuento del 30 % quita un pedazo: queda el 70 %.', { q: 70, t: 'descuento del 30 %' }, '$1 - 0.30 = 0.70$'],
          ['Por eso lo que se paga es el precio por 0.7.', { t: 'se multiplica por 0.7' }],
          ['Un impuesto del 19 % agrega un pedazo: queda el 119 %.', { q: 119, t: 'impuesto del 19 %' }],
          ['Ese precio es el de antes por 1.19.', { t: 'se multiplica por 1.19' }, '$1 + 0.19 = 1.19$'],
        ], 'Descuento: 1 menos el porcentaje. Aumento: 1 más el porcentaje.'),
        xpHaz('fichas', 'Pon el multiplicador de un descuento del 15 % y el de un aumento del 8 %.', { slots: fila('descuento', 'aumento'), fichas: ['0.85', '1.08', '0.15', '1.8', '0.92'], meta: ['0.85', '1.08'], alto: 96, pista: 'Al 1 réstale o súmale el porcentaje escrito como decimal.' }, '$1 - 0.15 = 0.85$ y $1 + 0.08 = 1.08$.')],
    ],
    despues: [
      ['Más difícil: descuento e IVA juntos',
        xpMira('fichas', 'Un televisor de 1 000 mil tiene 10 % de descuento y paga IVA del 19 %. ¿Importa el orden?', { slots: fila('primero IVA', 'primero descuento'), fichas: ['1 071', '1 071'], alto: 96 }, [
          ['Con el IVA primero son 1 190; con el descuento después, 1 071.', { pon: { 0: '1 071' } }, '$1\\,000 \\cdot 1.19 \\cdot 0.9$'],
          ['Con el descuento primero son 900; con el IVA después, 1 071.', { pon: { 1: '1 071' } }, '$1\\,000 \\cdot 0.9 \\cdot 1.19$'],
          ['Da lo mismo: son multiplicaciones y el orden no importa.', { marca: [0, 1] }],
          ['Trampa: restar 10 y sumar 19 como si fuera un 9 % más.', {}, '$1\\,000 \\cdot 1.09 = 1\\,090$'],
          ['El cambio real es por 1.071: un 7.1 % más.', {}, '$1.19 \\cdot 0.9 = 1.071$'],
        ], 'Los porcentajes seguidos se multiplican, no se suman.'),
        xpHaz('fichas', 'Unos tenis de 200 mil tienen 25 % de descuento y luego IVA del 19 %. Pon el precio con descuento y el precio final.', { slots: fila('con descuento', 'final'), fichas: ['150', '178.5', '188', '169', '238'], meta: ['150', '178.5'], alto: 96, pista: 'Multiplica por 0.75 y después por 1.19.' }, '$200 \\cdot 0.75 = 150$ y $150 \\cdot 1.19 = 178.5$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un celular cuesta 595 mil **con** IVA del 19 %. Para hallar el precio sin IVA, Laura hizo estos pasos. ¿En cuál está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['Paso 1: el IVA es del 19 %.'], ['Paso 2: el 19 % de 595 es 113.05.'], ['Paso 3: 595 − 113.05 = 481.95.'], ['Paso 4: sin IVA cuesta 481.95.']] }, [
        ['Haz tu cuenta primero: sin IVA es 595 entre 1.19.', {}, '$595 \\div 1.19 = 500$'],
        ['El primer paso es cierto: el IVA es del 19 %.', { luz: [0], nota: { 0: 'bien' } }],
        ['Aquí saca el 19 % de 595, que ya trae IVA: la base está mal.', { luz: [1], nota: { 1: 'error' } }],
        ['Los pasos tres y cuatro hacen bien su cuenta, pero arrastran el error.', { luz: [2, 3], nota: { 2: 'arrastra', 3: 'arrastra' } }],
        ['El error está donde nace, no donde se nota.', { luz: [1] }],
      ], 'Busca el primer paso que falla: los siguientes solo lo arrastran.'),
      xpHaz('hoja', 'Se deben 500 mil al 2 % mensual y se paga una cuota de 80 mil. Subraya el paso **equivocado**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Interés del mes: 2 % de 500 = 10.'], ['Abono a la deuda: 80 − 10 = 70.'], ['Deuda nueva: 500 − 80 = 420.'], ['El mes siguiente el interés será menor.']], pista: 'Solo el abono baja la deuda; el interés no.' }, 'La deuda nueva es $500 - 70 = 430$.')],
    cierre: 'Cada porcentaje es un multiplicador; para quitar el IVA se divide, y solo el abono baja la deuda.',
  });
}
