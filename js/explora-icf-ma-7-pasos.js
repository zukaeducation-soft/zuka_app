// Preicfes · Matemáticas, mundo 7 «Ecuaciones en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero (qué es una letra, despejar, el plano), sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Balanza de dulces: una caja (x o su valor) con n dulces sueltos a la izquierda y r dulces a la derecha.
  const caja = (v, K) => {
    let h = K.l(20, 118, 320, 118, 'lm') + K.r(24, 62, 52, 52, 'fa', 6) + K.t(50, 96, v.k ? String(Math.round(v.k)) : 'x', 'b') + K.t(170, 98, '=', 'b');
    for (let i = 0; i < Math.round(v.n); i++) h += K.c(96 + i * 22, 102, 9, 'fg');
    for (let i = 0; i < Math.round(v.r); i++) h += K.c(196 + (i % 6) * 22, 102 - Math.floor(i / 6) * 22, 9, 'fg');
    return h + K.t(170, 150, v.t || '', 'ta');
  };
  // Piezas de álgebra: a cuadrados grandes (x²), b barras (x) y c cuadraditos (1).
  const piezas = (v, K) => {
    let h = '', x = 20;
    for (let i = 0; i < Math.round(v.a); i++) { h += K.r(x, 30, 48, 48, 'fa', 3); x += 54; }
    for (let i = 0; i < Math.round(v.b); i++) { h += K.r(x, 30, 14, 48, 'fg', 2); x += 20; }
    for (let i = 0; i < Math.round(v.c); i++) h += K.r(x + (i % 2) * 18, 30 + Math.floor(i / 2) * 18, 14, 14, 'ff', 2);
    return h + K.t(170, 118, v.t || '', 'ta');
  };
  // Plano de 0 a 10: la recta x + y = 10 (a), la recta y = x − 4 (b) y su cruce (p).
  const cruce = (v, K) => {
    const X = x => 40 + x * 24, Y = y => 170 - y * 15;
    let h = K.l(X(0), Y(0), X(10.5), Y(0), 'lm') + K.l(X(0), Y(0), X(0), Y(10.5), 'lm');
    for (let i = 2; i <= 10; i += 2) h += K.t(X(i), Y(0) + 15, i, 's tm') + K.t(X(0) - 6, Y(i) + 4, i, 's tm', 'end');
    h += K.f(v.a, K.l(X(0), Y(10), X(10), Y(0), 'la gr') + K.t(X(1.2), Y(9.6), 'suman 10', 's ta', 'start'));
    h += K.f(v.b, K.l(X(4), Y(0), X(10), Y(6), 'lg gr') + K.t(X(9.6), Y(6.4), 'uno 4 más', 's tg', 'end'));
    return h + K.f(v.p, K.l(X(7), Y(3), X(7), Y(0), 'lg d') + K.l(X(0), Y(3), X(7), Y(3), 'lg d') + K.c(X(7), Y(3), 7, 'fF') + K.t(318, 40, v.t || '', 'b', 'end'));
  };
  // Recta de −6 a 6 con dos puntos a y b y el letrero s arriba.
  const recta = (v, K) => {
    const X = n => 170 + n * 24;
    let h = K.l(20, 70, 320, 70, 'lm');
    for (let i = -6; i <= 6; i++) h += K.l(X(i), 65, X(i), 75, 'lm') + K.t(X(i), 94, String(i).replace('-', '−'), 's tm');
    return h + K.c(X(v.a), 70, 7, 'fa') + K.c(X(v.b), 70, 7, 'fg') + K.t(170, 34, v.s || '', 'ta');
  };

  xpAmplia('icf-ma-ecuaciones-1', {
    conecta: 'icf-ma-lineal-2',
    desde: [
      ['Desde cero: la letra y despejar',
        xpMira('dibujo', 'Antes de plantear: una **letra** es una caja cerrada que guarda un número que todavía no sabemos.', { dib: caja, v: { n: 0, r: 0, k: 0, t: '' }, alto: 160 }, [
          ['En «De la situación a la ecuación» viste que una letra representa lo que no se sabe.', {}],
          ['Aquí la letra es una caja cerrada: adentro hay dulces que no vemos.', { t: 'x = ¿cuántos hay?' }],
          ['La caja y tres dulces sueltos pesan como once dulces.', { n: 3, r: 11, t: 'x + 3 = 11' }],
          ['Despejar es dejar sola la caja: se quitan tres dulces de cada lado.', { n: 0, r: 8, t: 'x = 11 − 3' }],
          ['En la caja hay ocho. Se comprueba: ocho más tres da once.', { k: 8, t: 'x = 8' }, '$8 + 3 = 11$'],
        ], 'Despejar es dejar la letra sola haciendo lo mismo en los dos lados.'),
        xpHaz('fichas', 'Una caja y 5 dulces pesan como 12 dulces. Pon lo que se quita de cada lado y lo que hay en la caja.', { slots: fila('se quita', 'en la caja'), fichas: ['5', '7', '12', '17', '6'], meta: ['5', '7'], alto: 96, pista: 'Para dejar la caja sola, quita lo que la acompaña, en los dos lados.' }, '$x + 5 = 12$, así que $x = 7$.')],
    ],
    despues: [
      ['Más difícil: una vez o por persona',
        xpMira('fichas', 'El dato que más despista: lo que se paga **una vez** y lo que se paga **por persona**.', { slots: fila('una vez', 'por persona', 'personas'), fichas: ['120', '45x', '9'], alto: 96 }, [
          ['Un paseo cobra un bus de 120 mil para todos y 45 mil por persona.', {}],
          ['El bus se paga una sola vez: va suelto.', { pon: { 0: '120' } }],
          ['Lo de cada persona se repite: va con la letra.', { pon: { 1: '45x' } }, '$45x + 120 = 525$'],
          ['Pagaron 525 mil: se quita el bus y se reparte. Fueron nueve.', { pon: { 2: '9' } }, '$405 \\div 45 = 9$'],
          ['Error típico: repartir 525 entre 45 sin quitar el bus.', { marca: [2] }, '$525 \\div 45 \\approx 11.7$'],
        ], 'Lo que se repite va con la letra; lo que se paga una vez va suelto.'),
        xpHaz('fichas', 'Una cancha cobra 60 mil de alquiler y 8 mil por jugador. Pagaron 172 mil. Pon lo que pagaron los jugadores y cuántos eran.', { slots: fila('jugadores', 'cuántos'), fichas: ['112', '14', '21', '172', '8'], meta: ['112', '14'], alto: 96, pista: 'Primero quita lo que se paga una sola vez.' }, '$172 - 60 = 112$ y $112 \\div 8 = 14$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Lina pagó 30 mil por **un** estuche de 6 mil y varios cuadernos de 4 mil. ¿Qué ecuación da los cuadernos c?', { letras: ['A', 'B', 'C', 'D'], paras: [['4c + 6 = 30'], ['6c + 4 = 30'], ['10c = 30'], ['4c = 30 + 6']] }, [
        ['Antes de mirar opciones: qué se repite y qué se paga una vez.', {}],
        ['Esta pone el precio del estuche con la c: cambia los papeles.', { luz: [1], nota: { 1: 'papeles cambiados' } }],
        ['Esta cobra el estuche con cada cuaderno: confunde total y unidad.', { luz: [2], nota: { 2: 'estuche repetido' } }],
        ['Esta suma el estuche al total en vez de quitarlo.', { luz: [3], nota: { 3: 'signo al revés' } }],
        ['Cuatro por cada cuaderno y un estuche suelto: esta sí.', { luz: [0], nota: { 0: 'sirve' } }],
        ['Comprueba: con seis cuadernos, 24 más 6 da 30.', { luz: [0] }, '$4 \\cdot 6 + 6 = 30$'],
      ], 'Busca la ecuación que respeta qué se repite y qué va una vez, y compruébala.'),
      xpHaz('hoja', 'Un taller cobra 15 mil por revisar la moto y 9 mil por cada repuesto. La cuenta fue de 51 mil. Subraya la ecuación de los repuestos r.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['15r + 9 = 51'], ['9r = 51 + 15'], ['9r + 15 = 51'], ['24r = 51']], pista: 'La revisión se cobra una sola vez; ¿cuál número va con la r?' }, '$9r + 15 = 51$: fueron cuatro repuestos.')],
    cierre: 'Letra para lo que no sabes, lo repetido con la letra, lo de una vez suelto, y siempre comprobar.',
  });

  xpAmplia('icf-ma-ecuaciones-2', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: piezas, potencias y coeficientes',
        xpMira('dibujo', 'Una **expresión** es una cuenta con letras. Se puede armar con piezas, como un rompecabezas.', { dib: piezas, v: { a: 0, b: 0, c: 0, t: '' }, alto: 130 }, [
          ['En la lección anterior viste que la letra guarda un número que no sabemos.', {}],
          ['Una barra de largo x y ancho 1 vale x.', { b: 1, t: 'x' }],
          ['Un cuadrado de lado x vale x por x: se escribe x².', { a: 1, b: 0, t: 'x² = x · x' }],
          ['Cada cuadradito suelto vale uno: son los números.', { b: 1, c: 3, t: 'x² + x + 3' }],
          ['El número delante de la letra cuenta piezas iguales: es el coeficiente.', { b: 4, t: 'x² + 4x + 3' }],
        ], 'x² es x por x; el coeficiente cuenta cuántas piezas iguales hay.'),
        xpHaz('fichas', 'Hay 2 cuadrados grandes, 5 barras y 1 cuadradito. Pon el coeficiente de x² y el de x.', { slots: fila('de x²', 'de x'), fichas: ['2', '5', '1', '7', '10'], meta: ['2', '5'], alto: 96, pista: 'El coeficiente cuenta las piezas de una misma clase.' }, 'Se escribe $2x^2 + 5x + 1$.')],
    ],
    despues: [
      ['Más difícil: reemplazar con negativos',
        xpMira('hoja', 'Al **reemplazar** un negativo, el paréntesis decide el resultado. Mira $3x^2$ con $x = -2$.', { paras: [['3x² con x = −2'], ['= 3 · (−2)²'], ['= 3 · 4 = 12'], ['En cambio, (3x)² = (−6)² = 36']] }, [
          ['Reemplazar es poner el número donde está la letra, entre paréntesis.', { luz: [0] }],
          ['El paréntesis protege el signo: menos dos al cuadrado.', { luz: [1] }],
          ['Primero la potencia y después el producto: da doce.', { luz: [2] }, '$(-2)^2 = 4$'],
          ['Si el tres también está adentro del paréntesis, todo se eleva: treinta y seis.', { luz: [3] }],
          ['Sin paréntesis saldría menos doce: es el error típico.', { luz: [1], nota: { 1: 'cuida el signo' } }],
        ], 'Reemplaza con paréntesis y haz primero la potencia.'),
        xpHaz('fichas', 'Con $x = -3$, pon el valor de $2x^2$ y el de $5 - x$.', { slots: fila('2x²', '5 − x'), fichas: ['18', '8', '−18', '2', '36'], meta: ['18', '8'], alto: 96, pista: 'Pon −3 entre paréntesis; menos por menos da más.' }, '$2 \\cdot 9 = 18$ y $5 - (-3) = 8$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un rectángulo mide x de ancho; el largo es el doble del ancho más 4. ¿Qué expresión da su **perímetro**?', { letras: ['A', 'B', 'C', 'D'], paras: [['6x + 8'], ['3x + 4'], ['2x² + 4x'], ['4x + 8']] }, [
        ['Primero se escribe el largo con la letra: dos x más cuatro.', {}, '$2x + 4$'],
        ['Esta suma un ancho y un largo: es medio perímetro.', { luz: [1], nota: { 1: 'medio borde' } }],
        ['Esta multiplica ancho por largo: es el área, no el borde.', { luz: [2], nota: { 2: 'es el área' } }],
        ['Esta cuenta solo los dos largos y olvida los anchos.', { luz: [3], nota: { 3: 'faltan anchos' } }],
        ['Dos anchos y dos largos dan seis x más ocho: sirve.', { luz: [0], nota: { 0: 'sirve' } }, '$2x + 2(2x + 4)$'],
        ['Prueba con x = 1: lados 1 y 6, borde 14.', { luz: [0] }, '$6 + 8 = 14$'],
      ], 'Escribe cada parte con la letra y prueba con un número pequeño.'),
      xpHaz('hoja', 'Una huerta mide x de ancho y su largo es el triple del ancho menos 2. Subraya la expresión de su **área**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['8x − 4'], ['3x² − 2x'], ['4x − 2'], ['3x − 2x²']], pista: 'El área multiplica ancho por largo; el perímetro los suma.' }, '$x(3x - 2) = 3x^2 - 2x$.')],
    cierre: 'Las piezas iguales se cuentan, el paréntesis cuida el signo y cada expresión dice qué mide.',
  });

  xpAmplia('icf-ma-ecuaciones-3', {
    conecta: 'icf-ma-lineal-3',
    desde: [
      ['Desde cero: dos pistas a la vez',
        xpMira('dibujo', 'Un **sistema** son dos pistas que deben cumplirse al mismo tiempo. Cada pista es una recta.', { dib: cruce, v: { a: 0, b: 0, p: 0, t: '' }, alto: 190 }, [
          ['En «Comparar planes» viste que dos rectas se cruzan donde los planes cuestan igual.', {}],
          ['Pista uno: dos números suman diez. Hay muchas parejas.', { a: 1 }],
          ['Pista dos: el primero tiene cuatro más. También hay muchas.', { b: 1 }],
          ['Solo una pareja cumple las dos: donde se cruzan.', { p: 1, t: '(7, 3)' }],
          ['Siete más tres da diez y siete menos tres da cuatro.', {}, '$7 + 3 = 10, \\; 7 - 3 = 4$'],
        ], 'La solución de un sistema cumple todas las pistas a la vez.'),
        xpHaz('fichas', 'Dos números suman 12 y el primero es el doble del segundo. Pon la pareja que cumple las dos pistas.', { slots: fila('primero', 'segundo'), fichas: ['8', '4', '6', '10', '2'], meta: ['8', '4'], alto: 96, pista: 'Prueba parejas que sumen 12 y mira en cuál uno es el doble del otro.' }, '$8 + 4 = 12$ y 8 es el doble de 4.')],
    ],
    despues: [
      ['Más difícil: cuántas y cuánto dinero',
        xpMira('hoja', 'En un concierto se vendieron 100 boletas, generales de 20 mil y VIP de 50 mil, por 2 600 mil. ¿Cuántas de cada una?', { paras: [['g + v = 100 (cuenta boletas)'], ['20g + 50v = 2 600 (cuenta dinero)'], ['Todas generales: 2 000; faltan 600'], ['Cada VIP suma 30 más: 600 ÷ 30 = 20']] }, [
          ['El examen da dos totales: cuántas cosas y cuánto dinero.', {}],
          ['Las boletas, sin importar el precio, suman cien.', { luz: [0] }],
          ['El dinero usa el precio de cada clase.', { luz: [1] }],
          ['Si todas fueran generales serían dos mil: faltan seiscientos.', { luz: [2] }, '$2\\,600 - 2\\,000 = 600$'],
          ['Cada VIP suma treinta más: veinte VIP y ochenta generales.', { luz: [3] }, '$20 \\cdot 50 + 80 \\cdot 20 = 2\\,600$'],
          ['Trampa: mezclar boletas con pesos en la misma ecuación.', { nota: { 0: 'boletas', 1: 'pesos' } }],
        ], 'Una ecuación cuenta las cosas y la otra cuenta el dinero.'),
        xpHaz('fichas', 'Una papelería vendió 40 cuadernos, unos de 8 mil y otros de 4 mil, por 248 mil. Pon cuántos de cada precio vendió.', { slots: fila('de 8 mil', 'de 4 mil'), fichas: ['22', '18', '20', '31', '9'], meta: ['22', '18'], alto: 96, pista: 'Supón que todos son de 4 mil y mira cuánto falta; cada uno de 8 suma 4 más.' }, '$40 \\cdot 4 = 160$; faltan 88 y $88 \\div 4 = 22$ de 8 mil.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos arepas y tres gaseosas valen 13 mil; una arepa y dos gaseosas, 8 mil. Con a el precio de la arepa y g el de la gaseosa, ¿qué sistema sirve?', { letras: ['A', 'B', 'C', 'D'], paras: [['2a + 3g = 13 y a + 2g = 8'], ['2a + 3a = 13 y g + 2g = 8'], ['5(a + g) = 13 y 3(a + g) = 8'], ['2a + 3g = 8 y a + 2g = 13']] }, [
        ['Cada compra da una ecuación: cantidad por precio, igual a su total.', {}],
        ['Esta cruza los totales: cada compra quedó con el de la otra.', { luz: [3], nota: { 3: 'totales cruzados' } }],
        ['Esta junta arepas con arepas y gaseosas con gaseosas: mezcla.', { luz: [1], nota: { 1: 'mezcla' } }],
        ['Esta suma las cantidades como si todo costara lo mismo.', { luz: [2], nota: { 2: 'un solo precio' } }],
        ['Esta respeta cada compra con su total: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
        ['Comprueba con a = 2 y g = 3: dan 13 y 8.', { luz: [0] }, '$4 + 9 = 13, \\; 2 + 6 = 8$'],
      ], 'Una ecuación por compra, cada una con su propio total.'),
      xpHaz('hoja', 'Se compraron 9 cosas entre manillas (m) de 2 mil y llaveros (l) de 1 mil, por 14 mil. Subraya el sistema que sirve.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['m + l = 14 y 2m + l = 9'], ['m + l = 9 y 2m + l = 14'], ['m + 2l = 14 y m + l = 9'], ['3(m + l) = 14 y m + l = 9']], pista: 'Una ecuación cuenta las cosas y la otra el dinero, cada una con su precio.' }, 'Con 5 manillas y 4 llaveros: $10 + 4 = 14$.')],
    cierre: 'Dos pistas a la vez: una ecuación por cada total y la pareja que cumple las dos.',
  });

  xpAmplia('icf-ma-ecuaciones-4', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: mayor y menor',
        xpMira('dibujo', 'Una **desigualdad** no iguala: compara. Dice cuál número es mayor, y eso se ve en la recta.', { dib: recta, v: { a: 3, b: 5, s: '' }, alto: 112 }, [
          ['En «Plantear ecuaciones» un solo valor equilibraba la balanza.', {}],
          ['En la recta, el número mayor siempre queda a la derecha.', { s: 'el 5 está a la derecha del 3' }],
          ['Tres es menor que cinco: el pico del signo apunta al menor.', { s: '3 < 5' }],
          ['Con negativos, menos cinco queda a la izquierda de menos tres.', { a: -5, b: -3, s: '−5 < −3' }],
          ['Por eso menos cinco es menor, aunque el cinco parezca grande.', {}],
        ], 'El mayor queda a la derecha; el pico del signo apunta al menor.'),
        xpHaz('fichas', 'Pon el signo que va entre cada pareja de números.', { slots: fila('−2 ? 1', '0.5 ? 0.25', '−7 ? −9'), fichas: ['<', '>', '>', '='], meta: ['<', '>', '>'], alto: 96, pista: 'Imagina la recta: el que queda más a la derecha es el mayor.' }, '$-2 < 1$, $0.5 > 0.25$ y $-7 > -9$.')],
    ],
    despues: [
      ['Más difícil: redondear hacia arriba',
        xpMira('fichas', 'Con «como máximo» se redondea hacia abajo. Con «**al menos**», hacia **arriba**.', { slots: fila('división', 'al menos'), fichas: ['12.5', '13'], alto: 96 }, [
          ['Un vendedor gana 12 mil por venta y quiere al menos 150 mil.', {}, '$12v \\ge 150$'],
          ['Se divide: da doce y medio.', { pon: { 0: '12.5' } }, '$150 \\div 12 = 12.5$'],
          ['Doce ventas dan 144 mil: no alcanzan.', {}, '$12 \\cdot 12 = 144$'],
          ['Necesita trece ventas como mínimo.', { pon: { 1: '13' } }, '$12 \\cdot 13 = 156$'],
          ['Redondear a doce es la trampa más común.', { marca: [1] }],
        ], '«Al menos» redondea hacia arriba: con menos no alcanza.'),
        xpHaz('fichas', 'Un bus lleva 45 personas. Van 200 al paseo. Pon el resultado de la división y los buses que hacen falta como mínimo.', { slots: fila('división', 'buses'), fichas: ['4.44', '5', '4', '45', '6'], meta: ['4.44', '5'], alto: 96, pista: 'Con cuatro buses, ¿caben todos?' }, '$200 \\div 45 \\approx 4.44$: con 4 quedan 20 por fuera, hacen falta 5.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Para subir a un juego hay que medir **al menos** 120 cm y **menos de** 190 cm. ¿Qué intervalo muestra quién puede subir?', { letras: ['A', 'B', 'C', 'D'], paras: [['120 ≤ h < 190'], ['120 < h ≤ 190'], ['120 ≤ h ≤ 190'], ['h < 120 o h ≥ 190']] }, [
        ['Se traduce cada frase a un signo, borde por borde.', {}],
        ['«Al menos 120» deja entrar al 120. «Menos de 190» no deja entrar al 190.', {}],
        ['Esta cambia los dos bordes: deja fuera a quien mide 120 justos.', { luz: [1], nota: { 1: 'bordes cambiados' } }],
        ['Esta deja subir a quien mide 190 justos.', { luz: [2], nota: { 2: 'sobra el 190' } }],
        ['Esta muestra a los que no pueden subir.', { luz: [3], nota: { 3: 'lo contrario' } }],
        ['Esta respeta los dos bordes: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Decide cada borde por separado: ¿entra o no entra?'),
      xpHaz('hoja', 'Una tarifa es para quienes tienen **más de** 12 años y **como máximo** 17. Subraya el intervalo de la edad e.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['12 ≤ e ≤ 17'], ['12 < e ≤ 17'], ['12 < e < 17'], ['e > 17']], pista: 'Lee cada borde aparte: ¿entra el 12? ¿entra el 17?' }, 'El 12 no entra y el 17 sí.')],
    cierre: 'El mayor va a la derecha, un negativo voltea el signo y cada palabra decide si el borde entra.',
  });
}
