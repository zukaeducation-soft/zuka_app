// Preicfes · Matemáticas, mundo 2 «Proporciones y Porcentajes», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde
// comparar restando o dividiendo, las unidades de medida, el porcentaje como razón con 100, lo que vale uno y las horas en
// decimales, hasta las trampas que más salen (parte frente a total, porcentaje de un porcentaje, directa o inversa, unidades).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Dos filas de puntos: a de un color, b de otro.
  const filas = (v, K) => {
    const f = (n, y, cls) => Array.from({ length: Math.round(n) }, (_, i) => K.c(40 + (i % 12) * 23, y + Math.floor(i / 12) * 22, 9, cls)).join('');
    return f(v.a, 46, 'fA') + f(v.b, 118, 'fG') + K.t(24, 24, `${Math.round(v.a)} ${v.ea}`, 's ta', 'start') + K.t(24, 96, `${Math.round(v.b)} ${v.eb}`, 's tg', 'start') + K.t(316, 24, v.t || '', 's tm', 'end');
  };
  // Cuadrícula de 100.
  const cien = (v, K) => {
    let h = '';
    for (let i = 0; i < 100; i++) h += K.r(96 + (i % 10) * 14, 8 + Math.floor(i / 10) * 14, 12, 12, i < Math.round(v.k) ? 'fA' : 'fc', 2);
    return h + K.t(252, 74, `${Math.round(v.k)} %`, 'b ta', 'start') + K.t(252, 96, v.t || '', 's tm', 'start');
  };
  // Reloj: el minutero en m minutos y la parte de la hora pintada.
  const reloj = (v, K) => {
    const g = 90 - v.m * 6, [x, y] = K.at(150, 92, 64, g);
    let h = K.c(150, 92, 74, 'fc') + (v.m >= 60 ? K.c(150, 92, 70, 'fa') : K.sec(150, 92, 70, g, 90, 'fa'));
    for (let k = 0; k < 12; k++) { const [a, b] = K.at(150, 92, 66, 90 - k * 30), [c, d] = K.at(150, 92, 74, 90 - k * 30); h += K.l(a, b, c, d, 'lm'); }
    return h + K.l(150, 92, x, y, 'la gr') + K.c(150, 92, 4, 'fk') + K.t(246, 80, `${Math.round(v.m)} min`, 'b', 'start') + K.t(246, 104, `${String(Math.round(v.m / 60 * 100) / 100)} h`, 'ta', 'start');
  };

  xpAmplia('icf-ma-proporcion-1', {
    conecta: 'icf-ma-datos-3',
    desde: [
      ['Desde cero: comparar restando o dividiendo',
        xpMira('dibujo', 'Hay dos maneras de comparar dos cantidades: **restando** (cuánto más) y **dividiendo** (cuántas veces).', { dib: filas, v: { a: 6, b: 2, ea: 'canicas de Juan', eb: 'canicas de Leo', t: '' }, alto: 150 }, [
          ['En la lección de muestras viste que para comparar grupos se divide entre su total.', {}],
          ['Juan tiene 6 canicas y Leo tiene 2. Restando, Juan tiene 4 más.', { t: '6 − 2 = 4' }, '$6 - 2 = 4$'],
          ['Dividiendo, Juan tiene 3 veces las de Leo. Esa comparación es una razón.', { t: '6 ÷ 2 = 3' }, '$6 \\div 2 = 3$'],
          ['Se escribe 6 : 2 y se lee «6 a 2». Vale lo mismo que 3 : 1.', { t: '6 : 2 = 3 : 1' }, '$6 : 2 = 3 : 1$'],
          ['El orden importa: Leo frente a Juan es 2 : 6, o sea 1 : 3.', { t: '2 : 6 = 1 : 3' }],
        ], 'Una razón compara dividiendo: cuántas veces cabe una cantidad en la otra.'),
        xpHaz('fichas', 'En un salón hay 12 niñas y 8 niños. Pon cuántas niñas **más** hay y la **razón** de niñas a niños, simplificada.', { slots: fila('cuántas más', 'razón'), fichas: ['4', '3 : 2', '2 : 3', '12 : 20', '20'], meta: ['4', '3 : 2'], alto: 96, pista: 'La primera se resta. La segunda se divide y se simplifica, con las niñas primero.' }, '$12 - 8 = 4$ y $12 : 8 = 3 : 2$.')],
      ['Desde cero: unidades de medida',
        xpMira('fichas', 'Las escalas mezclan **centímetros**, **metros** y **kilómetros**. Antes de usarlas hay que saber pasar de una a otra.', { slots: fila('cm en 1 m', 'm en 1 km', 'cm en 1 km'), fichas: ['100', '1 000', '100 000'], alto: 96 }, [
          ['Para usar un mapa hay que pasar de una unidad de medida a otra.', {}],
          ['Un metro, más o menos un paso largo, tiene 100 centímetros.', { pon: { 0: '100' } }],
          ['Un kilómetro, unas diez cuadras, tiene 1 000 metros.', { pon: { 1: '1 000' } }],
          ['Entonces un kilómetro tiene 1 000 veces 100 centímetros.', { pon: { 2: '100 000' } }, '$1\\,000 \\cdot 100 = 100\\,000$'],
          ['De una unidad grande a una pequeña se multiplica; de pequeña a grande, se divide.', { marca: [2] }],
        ], '1 m = 100 cm y 1 km = 1 000 m: de grande a pequeña se multiplica.'),
        xpHaz('fichas', 'Pasa **3.5 m** a centímetros y **2 500 m** a kilómetros.', { slots: fila('3.5 m en cm', '2 500 m en km'), fichas: ['350', '2.5', '35', '25', '0.35'], meta: ['350', '2.5'], alto: 96, pista: 'Metros a centímetros: la unidad se achica. Metros a kilómetros: la unidad crece.' }, '$3.5 \\cdot 100 = 350$ y $2\\,500 \\div 1\\,000 = 2.5$.')],
    ],
    despues: [
      ['Más difícil: la parte y el total',
        xpMira('dibujo', 'Una razón 2 : 3 compara **parte con parte**. Para saber qué fracción del **total** es cada una, hay que sumar.', { dib: filas, v: { a: 2, b: 3, ea: 'de azul', eb: 'de blanco', t: '' }, alto: 150 }, [
          ['Una pintura lleva azul y blanco en razón 2 : 3: dos de azul por cada tres de blanco.', {}],
          ['Un grupo completo tiene 2 más 3: cinco tarros.', { t: 'grupo de 5' }, '$2 + 3 = 5$'],
          ['El azul es 2 de cada 5, no 2 de cada 3.', { t: 'azul: 2 de 5' }, '$\\tfrac{2}{5} = 40\\,\\%$'],
          ['Con 20 tarros hay 4 grupos: 8 de azul y 12 de blanco.', { a: 8, b: 12, t: '4 grupos' }, '$4 \\cdot 2 = 8 \\quad 4 \\cdot 3 = 12$'],
          ['Parte a parte es 2 : 3; parte al total es 2 de 5. No las cruces.', {}],
        ], 'Para la parte del total, suma los números de la razón.'),
        xpHaz('hoja', 'En un barrio, los perros y los gatos están en razón **3 : 1**. Subraya qué parte de **todas** las mascotas son gatos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un tercio.'], ['Un cuarto.'], ['Tres cuartos.']], pista: 'Un grupo completo tiene los perros y los gatos juntos. ¿Cuántas mascotas son?' }, 'Cada grupo tiene 4 mascotas y 1 es gato: un cuarto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un mapa está a escala 1 : 20 000 y dos parques quedan a 6 cm en el mapa. ¿Cuál procedimiento da bien la distancia real?', { letras: ['A', 'B', 'C', 'D'], paras: [['6 · 20 000 = 120 000 cm, que son 12 km.'], ['6 · 20 000 = 120 000 cm, que son 1.2 km.'], ['20 000 ÷ 6 ≈ 3 333 cm.'], ['6 + 20 000 = 20 006 cm.']] }, [
        ['La escala dice: 1 cm del mapa son 20 000 cm de verdad.', {}],
        ['Del mapa a la realidad se multiplica. C divide: va al revés.', { luz: [2], nota: { 2: 'al revés' } }],
        ['D suma. Una escala nunca se suma: es una razón.', { luz: [3], nota: { 3: 'suma' } }],
        ['A multiplica bien, pero se equivoca al pasar a kilómetros. Unidades mezcladas.', { luz: [0], nota: { 0: 'unidades' } }],
        ['120 000 cm son 1 200 m, o sea 1.2 km. B es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$120\\,000 \\div 100\\,000 = 1.2$'],
      ], 'Multiplica por la escala y revisa con cuidado el cambio de unidad.'),
      xpHaz('hoja', 'En un plano a escala 1 : 200, una pared mide 4.5 cm. Subraya cuánto mide de verdad.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['900 m'], ['9 m'], ['44.4 cm'], ['204.5 cm']], pista: 'Multiplica por la escala y fíjate en qué unidad queda el resultado antes de pasarlo.' }, '$4.5 \\cdot 200 = 900$ cm, que son 9 m.')],
    cierre: 'Una razón compara dividiendo; la escala multiplica, y al final se revisa la unidad.',
  });

  xpAmplia('icf-ma-proporcion-2', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: el porcentaje es una razón',
        xpMira('dibujo', 'Un **porcentaje** es una razón contra 100. Por eso se puede escribir como fracción o como decimal.', { dib: cien, v: { k: 0, t: '' }, alto: 160 }, [
          ['En la lección de razones viste que una razón compara dividiendo.', {}],
          ['Un porcentaje es una razón contra 100: el 25 % es 25 de cada 100.', { k: 25 }, '$25\\,\\% = \\tfrac{25}{100}$'],
          ['Como decimal, la coma se corre dos lugares: el 25 % es 0.25.', { t: '0.25' }, '$\\tfrac{25}{100} = 0.25$'],
          ['25 de 100 es la cuarta parte de la cuadrícula: un cuarto.', { t: 'un cuarto' }, '$\\tfrac{25}{100} = \\tfrac14$'],
          ['El 10 % es una fila de diez: la décima parte del total.', { k: 10, t: 'un décimo' }],
          ['Por eso sacar el 10 % de algo es dividirlo entre 10.', {}, '$10\\,\\% \\text{ de } 350 = 35$'],
        ], 'El p % es p de cada 100: sirve como fracción o como decimal.'),
        xpHaz('fichas', 'Escribe el **40 %** como decimal y como fracción simplificada.', { slots: fila('decimal', 'fracción'), fichas: ['0.4', '2/5', '4.0', '40/10', '0.04'], meta: ['0.4', '2/5'], alto: 96, pista: 'El 40 % es 40 de cada 100. Corre la coma y simplifica la fracción.' }, '$\\tfrac{40}{100} = 0.4 = \\tfrac25$.')],
    ],
    despues: [
      ['Más difícil: el porcentaje de un porcentaje',
        xpMira('fichas', 'Cuando un porcentaje se saca de **otro grupo**, ya no es del total: los porcentajes se **multiplican**.', { slots: fila('en público', 'van en metro', 'del total'), fichas: ['100', '30', '15 %'], alto: 96 }, [
          ['De 200 personas, el 50 % usa transporte público, y de esas, el 30 % va en metro.', {}],
          ['El primer porcentaje es de todos: el 50 % de 200 son 100.', { pon: { 0: '100' } }],
          ['El segundo es de esos 100, no de los 200: el 30 % de 100 son 30.', { pon: { 1: '30' } }],
          ['Del total, 30 de 200 son el 15 %.', { pon: { 2: '15 %' } }, '$\\tfrac{30}{200} = 15\\,\\%$'],
          ['Atajo: se multiplican los porcentajes como decimales.', {}, '$0.5 \\cdot 0.3 = 0.15$'],
          ['Sumar el 50 % y el 30 % sería mezclar totales distintos.', { marca: [2] }],
        ], 'Un porcentaje de otro porcentaje se multiplica, no se suma.'),
        xpHaz('fichas', 'En un colegio de 400, el 25 % juega fútbol y, de esos, el 40 % es de once. Pon cuántos juegan fútbol y cuántos de ellos son de once.', { slots: fila('fútbol', 'de once'), fichas: ['100', '40', '160', '65', '260'], meta: ['100', '40'], alto: 96, pista: 'El 40 % se saca de los que juegan fútbol, no de todo el colegio.' }, 'El 25 % de 400 es 100, y el 40 % de 100 es 40.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tienda rebaja un 30 % y luego otro 20 % sobre el precio rebajado. Pedro dice que en total rebajaron el 50 %. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 30 % + 20 % = 50 %.'], ['No, porque el 20 % se saca del precio ya rebajado: la rebaja total es del 44 %.'], ['Sí, porque las dos rebajas se hacen sobre el mismo precio.'], ['No, porque la rebaja total es del 10 %.']] }, [
        ['Haz tu cuenta con un precio fácil: 100 000 pesos.', {}],
        ['Baja 30 %: quedan 70 000. Luego baja 20 % de 70 000: quedan 56 000.', {}, '$100\\,000 \\cdot 0.7 \\cdot 0.8 = 56\\,000$'],
        ['Rebajaron 44 000 de 100 000: el 44 %. Pedro no tiene razón.', {}],
        ['A y C suman los porcentajes como si fueran del mismo precio. Trampa.', { luz: [0, 2], nota: { 0: 'suma', 2: 'premisa falsa' } }],
        ['D resta los porcentajes: no sale de ninguna cuenta del problema.', { luz: [3], nota: { 3: 'resta' } }],
        ['B dice No y da la cuenta correcta. Esa es.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Prueba con 100 y aplica los cambios uno después del otro.'),
      xpHaz('hoja', 'Un salario sube el 10 % un año y el 10 % el siguiente. Juan dice que en total subió el 21 %. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['No, subió el 20 %, porque 10 + 10 = 20.'], ['Sí, porque el segundo 10 % se saca del salario ya subido: 1.1 · 1.1 = 1.21.'], ['No, subió el 11 %.'], ['Sí, porque al subir dos veces siempre se suma un 1 % de más.']], pista: 'Prueba con un salario de 100 y aplica las dos subidas, una después de la otra.' }, '$100 \\to 110 \\to 121$: subió el 21 %.')],
    cierre: 'El porcentaje es una razón con 100; un porcentaje de otro y los cambios seguidos se multiplican.',
  });

  xpAmplia('icf-ma-proporcion-3', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: lo que vale uno',
        xpMira('fichas', 'Casi todas las cuentas de proporción se resuelven con una pregunta: **¿cuánto vale uno solo?** A eso se le llama valor unitario.', { slots: fila('1 pan', '5 panes', '8 panes'), fichas: ['400', '2 000', '3 200'], alto: 96 }, [
          ['En la lección de razones viste que una razón se conserva al multiplicar las dos cantidades.', {}],
          ['Si 5 panes cuestan 2 000 pesos, ¿cuánto cuestan 8? Primero, uno solo.', {}],
          ['Un pan vale 2 000 entre 5: 400 pesos. Ese es el valor unitario.', { pon: { 0: '400' } }, '$2\\,000 \\div 5 = 400$'],
          ['Con el unitario, cualquier cantidad sale multiplicando: 8 panes son 3 200.', { pon: { 2: '3 200' } }, '$8 \\cdot 400 = 3\\,200$'],
          ['Y se comprueba: 5 panes por 400 dan los 2 000 del comienzo.', { pon: { 1: '2 000' } }],
          ['El error típico es hallar el unitario y olvidar multiplicar.', { marca: [0] }],
        ], 'Halla lo que vale uno y multiplica por lo que pides.'),
        xpHaz('fichas', '6 cuadernos cuestan 21 000 pesos. Pon lo que vale **uno** y lo que valen **10**.', { slots: fila('uno', 'diez'), fichas: ['3 500', '35 000', '2 100', '210 000', '3 000'], meta: ['3 500', '35 000'], alto: 96, pista: 'Reparte el precio entre los 6 cuadernos y después multiplica.' }, '$21\\,000 \\div 6 = 3\\,500$ y $10 \\cdot 3\\,500 = 35\\,000$.')],
    ],
    despues: [
      ['Más difícil: ¿directa o inversa?',
        xpMira('hoja', 'Antes de hacer una regla de tres hay que saber de qué tipo es. Una prueba sencilla: **duplica** una cantidad y mira la otra.', { paras: [['Metros de tela y precio.'], ['Grifos abiertos y tiempo para llenar un tanque.'], ['Velocidad y tiempo en el mismo camino.'], ['Edad y estatura de una persona.']] }, [
          ['Pregunta clave: si una cantidad se duplica, ¿qué le pasa a la otra?', {}],
          ['El doble de tela cuesta el doble: directa.', { luz: [0], nota: { 0: 'directa' } }],
          ['El doble de grifos llena el tanque en la mitad del tiempo: inversa.', { luz: [1], nota: { 1: 'inversa' } }],
          ['Al doble de velocidad se tarda la mitad: inversa.', { luz: [2], nota: { 2: 'inversa' } }],
          ['A los 20 años no se mide el doble que a los 10: no es proporcional.', { luz: [3], nota: { 3: 'ninguna' } }],
          ['Usa la regla de tres solo si la relación es proporcional de verdad.', {}],
        ], 'Duplica una: si la otra se duplica es directa; si queda a la mitad, inversa.'),
        xpHaz('hoja', 'Subraya la situación de proporción **inversa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Galones de gasolina y kilómetros recorridos.'], ['Pintores y días para pintar una casa.'], ['Horas trabajadas y pago, a 8 000 la hora.']], pista: 'Duplica la primera cantidad de cada una y mira si la otra crece o se achica.' }, 'El doble de pintores tarda la mitad de días.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', '4 pintores pintan un muro en 6 horas. Sofía calcula para 8 así: 1) es directa; 2) 4/8 = 6/x; 3) x = 12 horas. ¿Dónde está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['En el paso 1: más pintores tardan menos, es inversa.'], ['En el paso 2: debió escribir 4/6 = 8/x.'], ['En el paso 3: de 4/8 = 6/x sale x = 3.'], ['No hay error: tardan 12 horas.']] }, [
        ['Antes de mirar los pasos piensa: con más pintores, ¿tardan más o menos?', {}],
        ['Tardan menos. Así que 12 horas, el doble, no puede ser.', { luz: [3], nota: { 3: 'no cuadra' } }],
        ['El paso 3 está bien hecho para su ecuación: de 4x = 48 sale x = 12.', { luz: [2], nota: { 2: 'cuenta bien' } }],
        ['B cambia la ecuación, pero sigue tratándola como directa.', { luz: [1], nota: { 1: 'sigue directa' } }],
        ['El error nace en el paso 1: es inversa. El trabajo es 24, y entre 8 da 3 horas.', { luz: [0], nota: { 0: 'correcta' } }, '$4 \\cdot 6 = 24 \\quad 24 \\div 8 = 3$'],
      ], 'Antes de seguir los pasos, decide tú si es directa o inversa.'),
      xpHaz('hoja', 'Un carro a 60 km/h tarda 3 h. Leo calcula a 90 km/h: 1) más velocidad, menos tiempo; 2) 60 · 3 = 180 km; 3) 180 · 90 = 16 200 h. ¿Dónde falla?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En el paso 1.'], ['En el paso 2.'], ['En el paso 3: debió dividir, 180 ÷ 90 = 2 horas.'], ['En ninguno.']], pista: 'Revisa si el resultado final cuadra con lo que el mismo Leo dijo en el paso 1.' }, 'El camino mide 180 km: a 90 km/h tarda 2 horas.')],
    cierre: 'Unitario y multiplicar en la directa; producto fijo en la inversa; y antes, decide cuál es.',
  });

  xpAmplia('icf-ma-proporcion-4', {
    conecta: 'icf-ma-proporcion-3',
    desde: [
      ['Desde cero: qué es una tasa',
        xpMira('fichas', 'Una **tasa** es un valor unitario con nombre propio: cuánto de algo hay **por cada** unidad de otra cosa.', { slots: fila('km por hora', 'pesos por kilo', 'litros por minuto'), fichas: ['50', '4 500', '12'], alto: 96 }, [
          ['En la lección de regla de tres viste que todo empieza por lo que vale uno.', {}],
          ['Una tasa dice cuánto de algo hay por cada unidad de otra cosa.', {}],
          ['Una moto recorre 150 km en 3 horas: 50 km por cada hora.', { pon: { 0: '50' } }, '$150 \\div 3 = 50$'],
          ['Un bulto de 4 kilos cuesta 18 000: 4 500 pesos por kilo.', { pon: { 1: '4 500' } }, '$18\\,000 \\div 4 = 4\\,500$'],
          ['Una llave echa 60 litros en 5 minutos: 12 litros por minuto.', { pon: { 2: '12' } }, '$60 \\div 5 = 12$'],
          ['La palabra «por» te dice qué va abajo al dividir.', {}],
        ], 'Tasa: lo de arriba dividido entre lo que va después del «por».'),
        xpHaz('fichas', 'Un ciclista hace 36 km en 2 horas y una bomba saca 90 litros en 6 minutos. Pon las dos tasas.', { slots: fila('km por hora', 'litros por minuto'), fichas: ['18', '15', '72', '540', '34'], meta: ['18', '15'], alto: 96, pista: 'Divide lo que se recorre o se saca entre el tiempo que tarda.' }, '$36 \\div 2 = 18$ y $90 \\div 6 = 15$.')],
      ['Desde cero: horas y minutos',
        xpMira('dibujo', 'Las velocidades van en horas, pero los relojes cuentan minutos. Un minuto es la **sexagésima** parte de una hora.', { dib: reloj, v: { m: 60 }, alto: 190 }, [
          ['Una hora tiene 60 minutos: es la vuelta completa del minutero.', {}],
          ['Media hora son 30 minutos: la mitad de la vuelta, 0.5 horas.', { m: 30 }, '$\\tfrac{30}{60} = 0.5$'],
          ['Un cuarto de hora son 15 minutos: 0.25 horas.', { m: 15 }, '$\\tfrac{15}{60} = 0.25$'],
          ['45 minutos son tres cuartos de hora: 0.75 horas, no 0.45.', { m: 45 }, '$\\tfrac{45}{60} = 0.75$'],
          ['Para pasar minutos a horas siempre se divide entre 60.', { m: 20 }, '$\\tfrac{20}{60} = \\tfrac13$'],
        ], 'Minutos a horas: divide entre 60. Media hora es 0.5, no 0.30.'),
        xpHaz('dibujo', 'Mueve el minutero hasta marcar **0.75** horas.', { dib: reloj, v: { m: 10 }, metas: { m: 45 }, alto: 240, manijas: [{ k: 'm', min: 0, max: 60, paso: 5, et: 'minutos' }],
          lee: v => `$\\tfrac{${v.m}}{60} = ${Math.round(v.m / 60 * 100) / 100} \\text{ h}$`, dice: () => 'Cada hora tiene 60 minutos.' }, '0.75 de 60 minutos son 45 minutos.')],
    ],
    despues: [
      ['Más difícil: cambiar las dos unidades',
        xpMira('fichas', 'En una tasa hay **dos** unidades. Si te la piden en otras, hay que cambiar **las dos**: la de arriba y la de abajo.', { slots: fila('metros por hora', 'metros por minuto'), fichas: ['90 000', '1 500'], alto: 96 }, [
          ['Un tren va a 90 km/h. ¿Cuántos metros avanza en un minuto?', {}],
          ['Cambian las dos unidades: kilómetros a metros y horas a minutos.', {}],
          ['Primero arriba: 90 km son 90 000 metros en una hora.', { pon: { 0: '90 000' } }, '$90 \\cdot 1\\,000 = 90\\,000$'],
          ['Después abajo: una hora tiene 60 minutos, así que se divide entre 60.', {}],
          ['Son 1 500 metros por cada minuto.', { pon: { 1: '1 500' } }, '$90\\,000 \\div 60 = 1\\,500$'],
          ['Si solo cambias una unidad, el resultado queda mezclado y falla.', { marca: [1] }],
        ], 'Para cambiar una tasa, cambia la unidad de arriba y la de abajo.'),
        xpHaz('fichas', 'Una llave echa 12 litros por minuto. Pon cuántos litros echa en **una hora** y en **media hora**.', { slots: fila('una hora', 'media hora'), fichas: ['720', '360', '72', '12', '6'], meta: ['720', '360'], alto: 96, pista: 'Una hora son 60 minutos y media hora, 30.' }, '$12 \\cdot 60 = 720$ y $12 \\cdot 30 = 360$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se quiere saber cuánto tarda un bus de A a B. Se sabe que sale a las 6:00 y que va a 60 km/h. ¿Qué dato **falta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['La hora de llegada de otro bus.'], ['La distancia entre A y B.'], ['El precio del pasaje.'], ['Ninguno: con la velocidad basta.']] }, [
        ['Para el tiempo se usa distancia entre velocidad. Revisa cuál de las dos tienes.', {}, '$t = d \\div v$'],
        ['La velocidad está: 60 km/h. Falta la distancia.', {}],
        ['D dice que basta la velocidad: sin distancia no hay qué dividir.', { luz: [3], nota: { 3: 'no basta' } }],
        ['C es un dato real de un viaje, pero no entra en la cuenta.', { luz: [2], nota: { 2: 'no sirve' } }],
        ['A habla de otro bus: no dice nada de este viaje.', { luz: [0], nota: { 0: 'otro viaje' } }],
        ['B es lo que falta: con ella, el tiempo es la distancia entre 60.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Escribe la cuenta que harías y mira qué número te falta para hacerla.'),
      xpHaz('hoja', 'Se quiere saber cuántos dólares se reciben por 500 000 pesos. Subraya el dato que hace falta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Cuántos pesos vale un dólar ese día.'], ['Cuánto costaba el dólar hace un año.'], ['El precio de lo que se va a comprar.'], ['Ninguno: un dólar siempre vale lo mismo.']], pista: 'Piensa en la tasa que une los pesos con los dólares y en qué momento se usa.' }, 'Con la tasa del día: dólares = pesos ÷ pesos por dólar.')],
    cierre: 'Tasa es tanto por cada uno; los minutos se pasan a horas y se cambian las dos unidades a la vez.',
  });
}
