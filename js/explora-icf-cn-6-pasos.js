// Preicfes · Ciencias Naturales, mundo 6 «Energía y Calor», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;

  // Tres caras de la energía: pila y bombillo (k ≥ 1), llama que calienta agua (k ≥ 2) y una bolsa que se sube un metro (k ≥ 3).
  const formas = (v, K) => {
    const k = v.k || 0, sube = k >= 3 ? 1 : 0, yb = 150 - 64 * sube;
    let s = X.cable([[46, 140], [30, 140], [30, 76], [50, 76]]) + X.cable([[90, 140], [104, 140], [104, 76], [70, 76]], '#2b2f33') + X.pila(68, 140, '1.5 V') + X.bombillo(60, 66, k >= 1 ? 1 : 0);
    s += X.vaso(176, 120, 56, 64, 0.6, 'agua', { burbujas: k >= 2 ? 6 : 0 }) + `<rect x="146" y="120" width="60" height="4" fill="#59626a"/><path d="M152 124 L148 166 M200 124 L204 166" stroke="#59626a" stroke-width="2.5"/>` + X.mechero(176, 166, k >= 2 ? 0.75 : 0);
    s += `<rect x="252" y="${n(yb - 4)}" width="64" height="4" fill="#8a5a30"/>` +
      `<path d="M266 ${n(yb - 4)} L262 ${n(yb - 40)} Q284 ${n(yb - 48)} 306 ${n(yb - 40)} L302 ${n(yb - 4)} Z" fill="#f4f1ea" stroke="#bdb6a6"/>` +
      `<text x="284" y="${n(yb - 18)}" fill="#c0392b" font-size="10" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">ARROZ 1 kg</text>`;
    if (sube) s += X.flecha(326, 150, 326, 92) + X.rot(268, 122, '1 m más arriba');
    if (v.t) s += X.rot(170, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-energia-1', {
    conecta: 'icf-cn-movimiento-3',
    desde: [
      ['Desde cero: qué es la energía',
        xpMira('dibujo', 'Todos hablamos de **energía**, pero ¿qué es? Antes de las fórmulas, mira lo que hace en tres situaciones de la casa.', { dib: formas, v: { k: 0 }, alto: 200 }, [
          ['En la lección de gravedad viste que todo cae hacia la Tierra, cada vez más rápido.', {}],
          ['La energía es lo que permite causar un cambio: mover, calentar o iluminar.', { t: 'energía: lo que causa cambios' }],
          ['No se ve, pero se nota en lo que hace: la pila enciende el bombillo.', { k: 1 }],
          ['La llama le pasa energía al agua y la calienta.', { k: 2 }],
          ['Se mide en julios: subir un kilo de arroz un metro pide unos 10 julios.', { k: 3 }, '$1 \\text{ kg} \\cdot 10 \\cdot 1 \\text{ m} = 10 \\text{ J}$'],
          ['No se crea ni se destruye: pasa de una forma a otra.', { k: 3, t: 'se transforma' }],
        ], 'Energía: lo que permite causar cambios. Se mide en julios y solo cambia de forma.'),
        xpHaz('hoja', 'Subraya la frase correcta sobre la energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Se gasta y desaparece.'], ['Pasa de una forma a otra, como de la pila a la luz.'], ['Solo la tienen los seres vivos.']], pista: 'Cuando el bombillo apaga la pila, ¿la energía se acabó o se fue a otra parte?' }, 'La de la pila se vuelve luz y calor: cambia de forma.')],
    ],
    despues: [
      ['Más difícil: dónde va más rápido',
        xpMira('hoja', 'Un caso que mezcla las ideas: una patinadora en una rampa en forma de **U**, sin roce. ¿Dónde va más rápido?', { paras: [['Se suelta quieta desde lo alto de un lado.'], ['Abajo, donde la altura es mínima, va más rápido.'], ['Sube al otro lado hasta la misma altura de donde salió.'], ['Por una rampa larga o corta, llega abajo con la misma rapidez.']] }, [
          ['Arriba y quieta: toda su energía es potencial.', { luz: [0], nota: { 0: 'potencial' } }],
          ['Abajo la potencial es mínima: toda pasó a cinética.', { luz: [1], nota: { 1: 'más rápido' } }],
          ['Sin roce, vuelve a la misma altura: no perdió nada.', { luz: [2] }],
          ['La rapidez abajo depende de cuánto bajó, no del camino.', { luz: [3], nota: { 3: 'solo la altura' } }],
          ['Con roce, en cambio, cada subida es un poco más baja.', {}],
        ], 'Sin roce, la rapidez en un punto depende solo de cuánto ha bajado desde donde se soltó.'),
        xpHaz('hoja', 'Una niña se lanza quieta por un rodadero desde 3 m, sin roce. Subraya dónde lleva la **mayor** rapidez.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Arriba, al soltarse.'], ['Abajo, al final del rodadero.'], ['A la mitad de la bajada.']], pista: 'La cinética crece mientras baja. ¿Dónde ha bajado más?' }, 'Abajo toda la potencial se volvió cinética.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pelota de 0.5 kg se suelta desde 4 m, sin roce: arriba tiene 20 J. ¿Qué tabla de energía (J) **arriba, a la mitad y abajo** es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Potencial 20, 10, 0 · cinética 0, 10, 20'], ['Potencial 20, 10, 0 · cinética 0, 5, 10'], ['Potencial 20, 10, 0 · cinética 20, 10, 0'], ['Potencial 0, 10, 20 · cinética 20, 10, 0']] }, [
        ['La regla: sin roce, potencial más cinética da siempre 20.', {}, '$0.5 \\cdot 10 \\cdot 4 = 20$'],
        ['Aquí la suma baja a 15 y a 10: se perdió energía.', { luz: [1], nota: { 1: 'no se conserva' } }],
        ['Aquí las dos bajan juntas: arriba sumaría 40.', { luz: [2], nota: { 2: 'suma 40' } }],
        ['Aquí la potencial crece al bajar: está al revés.', { luz: [3], nota: { 3: 'al revés' } }],
        ['Lo que pierde la potencial lo gana la cinética: suma 20.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Suma cada fila: sin roce, potencial más cinética debe dar lo mismo en todos los puntos.'),
      xpHaz('hoja', 'Un carro duplica su velocidad. Alguien dice que su energía cinética también se duplica. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque energía y velocidad crecen igual.'], ['No: se multiplica por cuatro, porque va con el cuadrado de la velocidad.'], ['No, se queda igual porque la masa no cambia.'], ['Sí, porque doble masa da doble energía.']], pista: 'Recuerda cómo pesa la velocidad en la cinética. Una opción habla de la masa, que aquí no cambió.' }, 'Doble velocidad: $2^2 = 4$ veces la energía.')],
    cierre: 'La energía causa cambios y se transforma; sin roce, potencial más cinética da siempre lo mismo.',
  });

  // Un tinto caliente y un vaso de agua con hielo, con sus termómetros y partículas (h: se ven).
  const pts = (x, y, rapido) => Array.from({ length: 7 }, (_, i) => {
    const a = x - 18 + (i * 13) % 36, b = y + (i * 11) % 26, L = rapido ? 7 : 2;
    return `<circle cx="${n(a)}" cy="${n(b)}" r="2.2" fill="#ffffff"/><path d="M${n(a - L)} ${n(b + (i % 2 ? 2 : -2))} L${n(a - 2)} ${n(b)}" stroke="#ffffff" stroke-width="1" opacity=".7"/>`;
  }).join('');
  const temperatura = (v, K) => {
    let s = X.vaso(96, 166, 70, 84, 0.7, 'cafe') + X.termometro(118, 160, 104, 0.82, v.m ? '80 °C' : '') + X.vaso(236, 166, 70, 84, 0.7, 'agua', { hielo: 2 }) + X.termometro(258, 160, 104, 0.12, v.m ? '5 °C' : '');
    if (v.h) s += pts(92, 116, 1) + pts(232, 124, 0);
    if (v.c) s += [80, 96, 112].map((x, i) => `<path d="M${x} 74 q-6 -10 0 -20 q6 -10 0 -20" stroke="#ffffff" stroke-width="2" fill="none" opacity="${0.8 - i * 0.15}"/>`).join('') + X.rot(96, 20, 'calor hacia el aire');
    s += X.rot(96, 188, 'tinto') + X.rot(236, 188, 'agua con hielo');
    if (v.t) s += X.rot(236, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'mesa');
  };

  xpAmplia('icf-cn-energia-2', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: qué mide un termómetro',
        xpMira('dibujo', 'En la casa decimos «hace calor» para todo. En ciencias, **temperatura** y **calor** son cosas distintas. Empecemos por las partículas.', { dib: temperatura, v: {}, alto: 200 }, [
          ['En la lección de estados viste que las partículas se mueven más cuando se calientan.', { h: 1 }],
          ['La temperatura mide qué tan agitadas están, en promedio.', { h: 1, t: 'más agitadas, más temperatura' }],
          ['Se mide con termómetro, en grados Celsius.', { h: 1, m: 1 }],
          ['A nivel del mar, el agua se congela a 0 °C y hierve a 100 °C.', { m: 1 }],
          ['El calor es la energía que pasa de lo caliente a lo frío.', { m: 1, c: 1 }],
          ['Por eso el tinto se enfría en la mesa: le da calor al aire.', { m: 1, c: 1 }],
        ], 'Temperatura: qué tan agitadas están las partículas. Calor: energía que pasa de lo caliente a lo frío.'),
        xpHaz('hoja', 'Subraya la frase correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo frío tiene «frío» adentro que se pasa a lo demás.'], ['El calor pasa del objeto caliente al frío.'], ['Calor y temperatura son lo mismo.']], pista: 'El frío no viaja. ¿Qué es lo que pasa de un objeto al otro?' }, 'Solo viaja el calor, y siempre de lo caliente a lo frío.')],
    ],
    despues: [
      ['Más difícil: mezclar cantidades distintas',
        xpMira('hoja', 'Con masas iguales, el equilibrio queda en el punto medio. ¿Y si una cantidad es **mayor**? Se mezcla 1 kg de agua a 70 °C con 3 kg a 10 °C, sin perder calor.', { paras: [['1 kg de agua a 70 °C'], ['3 kg de agua a 10 °C'], ['Se mezclan en un termo.']] }, [
          ['Si fueran iguales, quedaría en el punto medio: 40 °C.', { luz: [0, 1] }],
          ['Pero hay el triple de agua fría: tira más hacia 10.', { luz: [1], nota: { 1: 'pesa más' } }],
          ['Cada kilo cuenta en el promedio.', { luz: [2] }, '$(1 \\cdot 70 + 3 \\cdot 10) \\div 4 = 25$'],
          ['Queda en 25 °C, más cerca de la temperatura de la mayor cantidad.', { luz: [2], nota: { 2: '25 °C' } }],
          ['El kilo caliente bajó 45 grados; cada kilo frío subió 15.', {}, '$1 \\cdot 45 = 3 \\cdot 15$'],
        ], 'Al mezclar la misma sustancia, el equilibrio queda más cerca de la temperatura de la mayor masa.'),
        xpHaz('hoja', 'Se mezclan 2 kg de agua a 76 °C con 1 kg a 16 °C, sin perder calor. Subraya la temperatura final.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['46 °C, el punto medio.'], ['56 °C, más cerca de la de los 2 kg.'], ['92 °C, la suma.']], pista: 'Hay más agua caliente que fría. ¿Hacia cuál temperatura se corre el resultado?' }, '$(2 \\cdot 76 + 1 \\cdot 16) \\div 3 = 56$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lata de gaseosa sale de la nevera y se sostiene en la mano. Alguien dice que la lata le **pasa frío** a la mano. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque el frío viaja de la lata a la mano.'], ['No: el calor pasa de la mano a la lata, y la mano lo siente como frío.'], ['No, porque entre ellas no pasa nada.'], ['Sí, porque la lata tiene más temperatura.']] }, [
        ['Decide el sentido: siempre de lo caliente a lo frío.', {}],
        ['Esta pone a viajar el frío: lo que viaja es calor.', { luz: [0], nota: { 0: 'sentido falso' } }],
        ['Buen «No», mala razón: sí pasa energía, por eso la mano se enfría.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['Esta invierte las temperaturas: la lata está más fría.', { luz: [3], nota: { 3: 'al revés' } }],
        ['La mano pierde calor y por eso la sentimos fría.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'El calor siempre va de lo caliente a lo frío; sentir frío es perder calor.'),
      xpHaz('hoja', 'Un tinto a 80 °C se deja en un cuarto a 20 °C. ¿Qué serie de temperaturas (cada 10 minutos) es la más probable?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['80, 62, 48, 38, 31'], ['80, 60, 40, 20, 0'], ['80, 80, 80, 80, 80'], ['80, 85, 90, 95, 100']], pista: 'El tinto se enfría hacia la temperatura del cuarto. ¿Puede bajar de 20 sin algo más frío al lado?' }, 'Baja cada vez más despacio y se acerca a 20 °C sin pasarse.')],
    cierre: 'Temperatura es agitación; el calor va de lo caliente a lo frío hasta igualarse, y la mayor masa pesa más en el equilibrio.',
  });
}
