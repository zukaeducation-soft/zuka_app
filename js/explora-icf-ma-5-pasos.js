// Preicfes · Matemáticas, mundo 5 «Funciones Lineales», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde el plano
// cartesiano, la letra que guarda un número y la tabla para comparar, hasta las trampas que más salen (lo empinado que depende de la
// escala, el fijo cambiado por la pendiente, el empate que no es entero, el «siempre» que no se cumple).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Plano de 0 a 8 y de 0 a h. Punto (px, py) con sus guías; recta de (0, b) con pendiente m si `lin`.
  const X = x => 52 + x * 32, Y = (y, h) => 176 - y / h * 144;
  const plano = (v, K) => {
    const h = v.h || 24; let s = '';
    for (let i = 0; i <= 8; i += 2) s += K.l(X(i), 32, X(i), 176, i ? 'ls' : 'lm') + K.t(X(i), 192, i, 's tm');
    for (let k = 0; k <= 4; k++) s += K.l(52, Y(k * h / 4, h), 308, Y(k * h / 4, h), k ? 'ls' : 'lm') + (k ? K.t(46, Y(k * h / 4, h) + 4, Math.round(k * h / 4), 's tm', 'end') : '');
    if (v.ex) s += K.t(308, 170, v.ex, 's tg', 'end');
    if (v.ey) s += K.t(58, 26, v.ey, 's ta', 'start');
    if (v.lin) s += K.pl([[X(0), Y(v.b, h)], [X(8), Y(v.b + v.m * 8, h)]], 'la gr');
    if (v.pt) s += K.l(X(v.px), 176, X(v.px), Y(v.py, h), 'lg d') + K.l(52, Y(v.py, h), X(v.px), Y(v.py, h), 'lg d') + K.c(X(v.px), Y(v.py, h), 6, 'fG');
    return s + K.t(190, 20, v.t || '', 'ta');
  };
  const P0 = { h: 24, b: 0, m: 0, lin: 0, pt: 0, px: 0, py: 0, ex: '', ey: '', t: '' };

  xpAmplia('icf-ma-lineal-1', {
    conecta: 'icf-ma-proporcion-4',
    desde: [
      ['Desde cero: el plano cartesiano',
        xpMira('dibujo', 'Una gráfica se dibuja en un **plano**: dos reglas que se cruzan. Cada punto guarda **dos** números a la vez.', { dib: plano, v: { ...P0 }, alto: 200 }, [
          ['En la lección de tasas viste que una tasa dice cuánto cambia algo por cada unidad.', {}],
          ['Un plano tiene dos reglas. La horizontal es para lo que avanza, como el tiempo.', { ex: 'minutos →' }],
          ['La vertical es para lo que se mide, como los litros de un tanque.', { ey: '↑ litros' }],
          ['Un punto junta las dos: (2, 10) es «a los 2 minutos hay 10 litros».', { pt: 1, px: 2, py: 10, t: '(2, 10)' }],
          ['Primero se camina a la derecha y después se sube: el orden importa.', { pt: 1, px: 2, py: 10, t: '(x, y)' }],
          ['Si unes los puntos de una misma situación, sale su gráfica.', { lin: 1, b: 6, m: 2, t: 'la gráfica' }],
        ], 'Un punto (x, y): primero lo que avanza, después lo que se mide.'),
        xpHaz('dibujo', 'Ubica el punto **(5, 16)**: a los 5 minutos hay 16 litros.', { dib: plano, v: { ...P0, ex: 'minutos →', ey: '↑ litros', pt: 1, px: 1, py: 4 }, metas: { px: 5, py: 16 }, alto: 200,
          manijas: [{ k: ['px', 'py'], min: [0, 0], max: [8, 24], paso: [1, 2], r: 10, en: v => [X(v.px), Y(v.py, 24)], de: (x, y) => [(x - 52) / 32, (176 - y) / 144 * 24] }],
          lee: v => `$(${v.px}, ${v.py})$`, dice: () => 'Primero a la derecha, después hacia arriba.' }, 'Cinco a la derecha y dieciséis hacia arriba.')],
    ],
    despues: [
      ['Más difícil: lo empinado engaña',
        xpMira('dibujo', 'Dos gráficas pueden **verse** igual de empinadas y tener pendientes muy distintas. Manda la **escala** del eje.', { dib: plano, v: { ...P0, lin: 1, b: 0, m: 3, h: 24 }, alto: 200 }, [
          ['Dos gráficas pueden verse igual de empinadas y tener pendientes distintas.', {}],
          ['En esta, el eje vertical llega a 24: de 0 a 8 sube 24. La pendiente es 3.', { t: '24 ÷ 8 = 3' }, '$24 \\div 8 = 3$'],
          ['Ahora el eje llega a 240, y la recta se ve idéntica.', { h: 240, m: 30, t: '' }],
          ['Pero sube 240 en 8: la pendiente es 30, diez veces más.', { t: '240 ÷ 8 = 30' }, '$240 \\div 8 = 30$'],
          ['Lo empinado depende de la escala; la pendiente sale de los números.', {}],
        ], 'No compares pendientes a ojo: lee los números de los ejes.'),
        xpHaz('fichas', 'Una gráfica pasa por (2, 150) y (6, 350). Pon lo que **sube**, lo que **avanza** y la **pendiente**.', { slots: fila('sube', 'avanza', 'pendiente'), fichas: ['200', '4', '50', '100', '25'], meta: ['200', '4', '50'], alto: 96, pista: 'Resta las y, resta las x, y divide lo que sube entre lo que avanza.' }, '$350 - 150 = 200$, $6 - 2 = 4$ y $200 \\div 4 = 50$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tanque tiene 50 litros y pierde 5 litros por minuto. ¿Cuál tabla representa la situación en los minutos 0, 1 y 2?', { letras: ['A', 'B', 'C', 'D'], paras: [['50, 45, 40'], ['50, 55, 60'], ['45, 40, 35'], ['50, 45, 35']] }, [
        ['Revisa tres cosas: dónde empieza, si sube o baja y cuánto cambia cada vez.', {}],
        ['B sube 5 cada minuto, pero el tanque pierde agua: signo equivocado.', { luz: [1], nota: { 1: 'signo' } }],
        ['C baja bien, pero empieza en 45: el punto de partida es 50.', { luz: [2], nota: { 2: 'partida' } }],
        ['D empieza bien, pero baja 5 y luego 10: el cambio no es parejo.', { luz: [3], nota: { 3: 'no es parejo' } }],
        ['A empieza en 50 y baja 5 cada minuto. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Revisa punto de partida, signo del cambio y que el cambio sea parejo.'),
      xpHaz('hoja', 'Un celular tiene 90 % de batería y pierde 4 % por hora. Subraya la tabla que lo representa en las horas 0, 1 y 2.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['90, 94, 98'], ['86, 82, 78'], ['90, 86, 82'], ['90, 86, 78']], pista: 'Mira el primer número, si sube o baja y si cambia siempre lo mismo.' }, 'Empieza en 90 y baja 4 cada hora.')],
    cierre: 'Lee los ejes, calcula sube entre avanza con números y revisa partida, signo y cambio parejo.',
  });

  xpAmplia('icf-ma-lineal-2', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: la letra que guarda un número',
        xpMira('fichas', 'En álgebra, una **letra** es una caja donde va un número que todavía no sabemos. Las palabras dicen qué se le hace.', { slots: fila('el doble', 'aumentado en 5', 'triple menos 1'), fichas: ['2x', 'x + 5', '3x − 1'], alto: 96 }, [
          ['En la lección de pendiente viste lo que cambia por cada unidad.', {}],
          ['Una letra, como x, es una caja con un número que todavía no conocemos.', {}],
          ['«El doble de un número» se escribe 2x: dos veces lo que haya en la caja.', { pon: { 0: '2x' } }],
          ['«Un número aumentado en 5» es x + 5.', { pon: { 1: 'x + 5' } }],
          ['«El triple de un número, menos 1» es 3x − 1: primero el triple, luego se resta.', { pon: { 2: '3x − 1' } }],
          ['Si x vale 4, la caja se llena: 2x es 8, x + 5 es 9 y 3x − 1 es 11.', { marca: [0, 1, 2] }],
        ], 'Una letra guarda un número; las palabras dicen qué operaciones se le hacen.'),
        xpHaz('fichas', 'Traduce: «la **mitad** de un número» y «un número **disminuido en 7**».', { slots: fila('la mitad', 'disminuido en 7'), fichas: ['x/2', 'x − 7', '2x', '7 − x', 'x + 7'], meta: ['x/2', 'x − 7'], alto: 96, pista: 'Disminuir es quitarle al número, así que él va primero.' }, 'La mitad es $\\tfrac{x}{2}$ y disminuido en 7 es $x - 7$.')],
    ],
    despues: [
      ['Más difícil: leer la expresión',
        xpMira('fichas', 'El examen también va al revés: te da la expresión y pregunta qué **significa** cada número.', { slots: fila('fijo', 'por cada mes', 'con 5 meses'), fichas: ['50', '20', '150'], alto: 96 }, [
          ['Un gimnasio cobra C = 50 + 20m, en miles, donde m son los meses.', {}, '$C = 50 + 20m$'],
          ['El número solo, 50, no depende de m: se paga una vez. Es el fijo.', { pon: { 0: '50' } }],
          ['El 20 va pegado a m: se paga 20 por cada mes. Es la pendiente.', { pon: { 1: '20' } }],
          ['Con 5 meses: 50 más 20 por 5, son 150 mil.', { pon: { 2: '150' } }, '$50 + 20 \\cdot 5 = 150$'],
          ['Si el número pegado a la letra es negativo, cada unidad resta en vez de sumar.', {}],
        ], 'Número solo: fijo. Número pegado a la letra: lo que cambia por cada unidad.'),
        xpHaz('hoja', 'Una tarjeta de bus tiene un saldo S = 40 000 − 2 500v, con v los viajes. Subraya qué significa el **2 500**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo que había en la tarjeta al comienzo.'], ['Lo que se descuenta en cada viaje.'], ['Los viajes que se pueden hacer.']], pista: 'Mira a qué está pegado ese número y si suma o resta.' }, 'Va pegado a v con signo menos: se resta en cada viaje.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lavandería cobra 6 000 por el servicio y 2 500 por cada kilo de ropa. ¿Cuál expresión da el cobro C por k kilos?', { letras: ['A', 'B', 'C', 'D'], paras: [['C = 6 000k + 2 500'], ['C = 6 000 + 2 500k'], ['C = 8 500k'], ['C = 6 000 + 2 500']] }, [
        ['Separa lo que se paga una vez de lo que se paga por cada kilo.', {}],
        ['El 6 000 se paga una vez: va solo. El 2 500 va pegado a k.', {}],
        ['A los cambia: cobraría 6 000 por cada kilo.', { luz: [0], nota: { 0: 'cambiados' } }],
        ['C multiplica todo por k: el fijo terminaría cobrándose por kilo.', { luz: [2], nota: { 2: 'fijo por kilo' } }],
        ['D no tiene letra: daría lo mismo con 1 kilo que con 10.', { luz: [3], nota: { 3: 'sin letra' } }],
        ['B es fijo más 2 500 por kilo. Con 2 kilos da 11 000.', { luz: [1], nota: { 1: 'correcta' } }, '$6\\,000 + 2\\,500 \\cdot 2 = 11\\,000$'],
      ], 'Lo fijo va solo y lo que se cobra por cada uno va pegado a la letra.'),
      xpHaz('hoja', 'Un tanque tiene 800 litros y se le sacan 25 por día. Subraya la expresión de los litros L que quedan después de d días.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['L = 800d − 25'], ['L = 25d − 800'], ['L = 800 − 25d'], ['L = 800 + 25d']], pista: 'Pruébala con d = 0 y con d = 1: ¿cuánta agua debería haber?' }, 'Empieza en 800 y cada día resta 25.')],
    cierre: 'Lo fijo va solo, lo que cambia va pegado a la letra, y la expresión se prueba con un número.',
  });

  const TA = i => String(i < 5 ? 10 + 2 * (i + 1) : 4 * (i - 4));
  const TB = i => String(i < 5 ? 6 + 3 * (i + 1) : 5 * (i - 4));
  xpAmplia('icf-ma-lineal-3', {
    conecta: 'icf-ma-lineal-2',
    desde: [
      ['Desde cero: comparar con una tabla',
        xpMira('rejilla', 'Para comparar dos planes no hace falta nada raro: una **tabla** con los dos, lado a lado, uso por uso.', { f: 2, c: 5, filas: ['plan A', 'plan B'], cols: ['1', '2', '3', '4', '5'], izq: 64, celda: TA }, [
          ['En la lección anterior escribiste cobros como fijo más algo por cada unidad.', {}],
          ['Para comparar dos planes, lo más sencillo es hacer una tabla.', {}],
          ['A cobra 10 fijos y 2 por cada uso. B no tiene fijo y cobra 4 por uso.', { luz: [0, 5] }],
          ['Con pocos usos, B es más barato: con 2 usos, 8 contra 14.', { luz: [1, 6] }],
          ['Con 5 usos cuestan lo mismo: 20 cada uno. Ahí empatan.', { luz: [4, 9] }],
          ['Después del empate, el que sube más rápido, B, se vuelve el más caro.', {}],
        ], 'Con los dos planes lado a lado se ve cuál conviene y dónde empatan.'),
        xpHaz('rejilla', 'Plan A: 6 fijos y 3 por uso. Plan B: 5 por uso. Toca las **dos** casillas donde cuestan **lo mismo**.', { f: 2, c: 5, filas: ['plan A', 'plan B'], cols: ['1', '2', '3', '4', '5'], izq: 64, celda: TB, unoAUno: true, meta: [2, 7] }, 'Con 3 usos los dos cobran 15.')],
    ],
    despues: [
      ['Más difícil: el empate que no es entero',
        xpMira('fichas', 'A veces el empate cae en un número que **no existe** en la vida real, como 3.5 copias. Entonces se prueban los enteros.', { slots: fila('B empieza', 'se acerca', 'empate', 'desde').map(s => ({ ...s, w: 66 })), fichas: ['7 000', '2 000', '3.5', '4'], alto: 96 }, [
          ['A cobra 3 000 por copia. B cobra 7 000 fijos y 1 000 por copia.', {}],
          ['Al comienzo, B va 7 000 más caro.', { pon: { 0: '7 000' } }],
          ['Pero en cada copia B se acerca 2 000.', { pon: { 1: '2 000' } }, '$3\\,000 - 1\\,000 = 2\\,000$'],
          ['Empatarían en 3.5 copias, que no existen.', { pon: { 2: '3.5' } }, '$7\\,000 \\div 2\\,000 = 3.5$'],
          ['Con 4 copias, A cobra 12 000 y B, 11 000: conviene B desde 4.', { pon: { 3: '4' } }, '$4 \\cdot 3\\,000 = 12\\,000 \\quad 7\\,000 + 4\\,000 = 11\\,000$'],
          ['Si el empate no es entero, prueba los enteros de cada lado.', { marca: [3] }],
        ], 'Si el empate no es entero, prueba el entero de antes y el de después.'),
        xpHaz('fichas', 'Un plan cobra 2 500 por hora. Otro cobra 7 000 fijos más 1 000 por hora. Pon el empate, redondeado, y desde qué hora entera conviene el de fijo.', { slots: fila('empate (≈ h)', 'conviene desde'), fichas: ['4.7', '5', '4', '2.8', '7'], meta: ['4.7', '5'], alto: 96, pista: 'Divide la diferencia de fijos entre lo que se acerca por hora, y prueba los enteros vecinos.' }, '$7\\,000 \\div 1\\,500 \\approx 4.7$: desde la hora 5.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Plan A: 20 000 fijos y 500 por minuto. Plan B: 1 000 por minuto, sin fijo. Ana habla 30 minutos y dice que le conviene B. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['No, porque A cobra menos por minuto.'], ['Sí, porque con 30 minutos B cuesta 30 000 y A, 35 000.'], ['Sí, porque B no tiene fijo y siempre es más barato.'], ['No, porque los planes empatan en 40 minutos.']] }, [
        ['Haz tu cuenta con los 30 minutos de Ana antes de leer los porqués.', {}],
        ['A cuesta 20 000 más 500 por 30: 35 000. B cuesta 30 000.', {}, '$20\\,000 + 15\\,000 = 35\\,000$'],
        ['B sale más barato: la respuesta es Sí, y las del No caen.', { luz: [0, 3], nota: { 0: 'es Sí', 3: 'es Sí' } }],
        ['A y D dicen datos ciertos, pero no deciden para 30 minutos.', { luz: [0, 3] }],
        ['C dice «siempre», y después de 40 minutos B sale más caro.', { luz: [2], nota: { 2: 'siempre' } }],
        ['B da la cuenta para la cantidad de Ana. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Calcula con la cantidad que se usa y desconfía del «siempre».'),
      xpHaz('hoja', 'Taller X: 30 000 fijos y 10 000 por hora. Taller Y: 18 000 por hora. Luis necesita 5 horas y dice que le conviene Y. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque Y no cobra fijo.'], ['No: con 5 horas X cobra 80 000 y Y, 90 000.'], ['Sí, porque Y siempre es más barato.'], ['No, porque X cobra más por hora.']], pista: 'Calcula lo que cobra cada taller por 5 horas antes de leer los porqués.' }, 'X: $30\\,000 + 50\\,000 = 80\\,000$; Y: $90\\,000$.')],
    cierre: 'Tabla o cruce para ver el empate; a cada lado gana uno distinto; decide con tu cantidad.',
  });
}
