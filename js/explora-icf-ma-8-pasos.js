// Preicfes · Matemáticas, mundo 8 «Validar Procedimientos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es una
// afirmación y una razón hasta los «Sí, porque…» del examen, los contraejemplos y el dato que falta.
{
  // Ocho personas; las primeras g llevan gafas; x marca a la que rompe el «todos».
  const salon = (v, K) => {
    let h = '';
    for (let i = 0; i < 8; i++) {
      const x = 40 + i * 37;
      h += K.c(x, 80, 14, 'fc');
      if (i < Math.round(v.g)) h += K.c(x - 6, 78, 5, 'fa') + K.c(x + 6, 78, 5, 'fa') + K.l(x - 1, 78, x + 1, 78, 'lm');
      if (v.x && i === 7) h += K.arc(x, 80, 20, 0, 360, 'lo gr');
    }
    return h + K.t(170, 134, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-argumenta-1', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: afirmación y razón',
        xpMira('hoja', 'Antes de validar: una **afirmación** es una frase que puede ser verdadera o falsa, y una **razón** dice por qué.', { paras: [['Afirmación: 15 es múltiplo de 5.'], ['Razón: 15 = 5 · 3.'], ['Afirmación: todo número par termina en 2.'], ['Revisión: 14 es par y termina en 4.']] }, [
          ['En «Plantear ecuaciones» comprobaste un valor llevándolo al enunciado.', {}],
          ['Una afirmación se puede revisar: es verdadera o es falsa.', { luz: [0], nota: { 0: 'afirmación' } }],
          ['La razón dice por qué: cinco por tres da quince.', { luz: [1], nota: { 1: 'razón' } }],
          ['Esta otra suena bien, pero hay que revisarla.', { luz: [2] }],
          ['El 14 es par y termina en cuatro: la afirmación es falsa.', { luz: [3], tacha: [2] }],
          ['Razonar es mostrar la razón, no solo decir la respuesta.', {}],
        ], 'Una afirmación se revisa con una razón o con un caso.'),
        xpHaz('hoja', 'Subraya la afirmación **verdadera**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Todo número que termina en 0 es par.'], ['Todo número de dos cifras es mayor que 50.'], ['Todo múltiplo de 3 es impar.']], pista: 'Prueba cada frase con dos o tres números.' }, 'Terminar en 0 es ser múltiplo de 10, y 10 es par.')],
    ],
    despues: [
      ['Más difícil: la razón que suena bien',
        xpMira('hoja', 'Un razonamiento puede **sonar** lógico y tener la conclusión falsa. Camila dice:', { paras: [['«Subió 20 % y bajó 20 %: quedó igual.»'], ['«Porque +20 y −20 se anulan.»'], ['Prueba: 100 sube a 120.'], ['Luego 120 baja a 96.']] }, [
          ['La conclusión: el precio quedó igual.', { luz: [0] }],
          ['La razón parece cierta: más veinte y menos veinte se anulan.', { luz: [1] }],
          ['Se prueba con un precio: cien sube a ciento veinte.', { luz: [2] }, '$100 \\cdot 1.2 = 120$'],
          ['El 20 % que baja se saca de 120, no de 100.', { luz: [3] }, '$120 \\cdot 0.8 = 96$'],
          ['Quedó en 96: la conclusión es falsa.', { tacha: [0], nota: { 0: 'falsa' } }],
          ['Prueba con un número antes de creerle a la razón.', {}],
        ], 'Antes de aceptar una razón, pruébala con un número.'),
        xpHaz('hoja', 'Dani: «Si duplico el lado de un cuadrado, su área se duplica». Subraya lo que sirve para revisarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Lado 3: área 9. Lado 6: área 36.'], ['Un cuadrado tiene 4 lados iguales.'], ['El doble de 3 es 6.']], pista: 'Busca la que calcula el área antes y después.' }, 'De 9 pasa a 36: se multiplica por 4, no por 2.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tienda: «3 camisetas de 20 mil por solo 50 mil: ahorras más del 15 %». ¿Es cierto?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque se ahorran 10 de 60, más del 15 %.'], ['Sí, porque 50 es menos que 60.'], ['No, porque el descuento es de 10 mil, no de 15.'], ['Sí, porque 10 es el 20 % de 50.']] }, [
        ['Primero tu cuenta: sin oferta son 60 y se ahorran 10.', {}, '$10 \\div 60 \\approx 16.7\\,\\%$'],
        ['Pasa del 15 %: se descartan las que dicen «No».', { tacha: [2], nota: { 2: 'dice No' } }],
        ['Esta es cierta, pero no prueba que pase del 15 %.', { luz: [1], nota: { 1: 'no lo prueba' } }],
        ['Esta saca el porcentaje sobre 50: la base es el precio de antes.', { luz: [3], nota: { 3: 'base mala' } }],
        ['Esta compara lo ahorrado con lo que costaba: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Decide Sí o No con tu cuenta y luego elige el «porque» que lo demuestra.'),
      xpHaz('hoja', 'Andrés: «Si gano 2 de cada 5 partidos, gano más de la mitad». Subraya la respuesta correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 2 de 5 es el 40 %.'], ['No, porque 2 de 5 es el 40 %, menos de la mitad.'], ['No, porque 5 es impar.'], ['Sí, porque gana dos partidos.']], pista: 'Decide primero Sí o No con tu cuenta; después mira si el «porque» lo demuestra.' }, '$2 \\div 5 = 0.4$, que es menos que 0.5.')],
    cierre: 'Haz tu propia cuenta, decide Sí o No y elige la razón que de verdad lo demuestra.',
  });

  xpAmplia('icf-ma-argumenta-2', {
    conecta: 'icf-ma-argumenta-1',
    desde: [
      ['Desde cero: todos, algunos y ninguno',
        xpMira('dibujo', 'Tres palabras mandan en una afirmación: **todos**, **algunos** y **ninguno**. Mira este salón de ocho.', { dib: salon, v: { g: 0, x: 0, t: '' }, alto: 150 }, [
          ['En la lección anterior viste que una afirmación puede ser verdadera o falsa.', {}],
          ['Si los ocho usan gafas, «todos usan gafas» es verdad.', { g: 8, t: 'todos' }],
          ['Si uno no usa, ya no son todos: esa persona es el contraejemplo.', { g: 7, x: 1, t: 'uno no: ya no son todos' }],
          ['«Algunos usan gafas» se cumple con que haya uno solo.', { g: 1, x: 0, t: 'algunos' }],
          ['«Ninguno usa gafas» cae si aparece uno con gafas.', { t: 'ninguno: falso' }],
        ], 'Un «todos» cae con un solo caso en contra: el contraejemplo.'),
        xpHaz('hoja', '«Todos los meses tienen 30 días o más». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Enero'], ['Febrero'], ['Abril']], pista: 'Busca un mes que no cumpla la frase.' }, 'Febrero tiene 28 o 29 días.')],
    ],
    despues: [
      ['Más difícil: negativos, ceros y decimales',
        xpMira('hoja', 'Los contraejemplos difíciles se esconden en los **negativos**, el **cero** y los **decimales**.', { paras: [['Si a > b, entonces a² > b².'], ['a = 5, b = 2: 25 > 4'], ['a = 1, b = −3: 1 < 9'], ['Arreglada: si a y b son positivos.']] }, [
          ['La frase compara dos números y sus cuadrados.', { luz: [0] }],
          ['Con cinco y dos, la frase funciona.', { luz: [1], nota: { 1: 'cumple' } }],
          ['Con uno y menos tres: uno es mayor, pero su cuadrado es menor.', { luz: [2], nota: { 2: 'la tumba' } }],
          ['Un solo caso así basta para decir que es falsa.', { tacha: [0] }],
          ['Con positivos sí es cierta: así se arregla.', { luz: [3] }],
        ], 'Si los positivos no la tumban, prueba con negativos, cero o decimales.'),
        xpHaz('hoja', '«Al dividir un número entre 2, el resultado es menor que el número». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['10'], ['−4'], ['3']], pista: 'Prueba con un número negativo.' }, '$-4 \\div 2 = -2$, y $-2$ es mayor que $-4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Afirmación: «La suma de dos números primos siempre es par». ¿Qué pareja muestra que es **falsa**?', { letras: ['A', 'B', 'C', 'D'], paras: [['3 y 5: suman 8'], ['2 y 7: suman 9'], ['4 y 9: suman 13'], ['7 y 7: suman 14']] }, [
        ['Un contraejemplo cumple la condición y falla la conclusión.', {}],
        ['Estos son primos y suman par: apoyan la frase, no la tumban.', { luz: [0], nota: { 0: 'cumple' } }],
        ['Esta tampoco: catorce es par.', { luz: [3], nota: { 3: 'cumple' } }],
        ['Suma impar, pero cuatro y nueve no son primos: no cuenta.', { luz: [2], nota: { 2: 'no son primos' } }],
        ['Dos y siete son primos y suman nueve: la tumba.', { luz: [1], nota: { 1: 'contraejemplo' } }],
        ['El dos, el único primo par, suele ser la clave.', { luz: [1] }],
      ], 'El contraejemplo debe cumplir la condición: si no, no cuenta.'),
      xpHaz('hoja', 'Afirmación: «Todo número que termina en 4 es múltiplo de 4». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['24'], ['44'], ['14'], ['40']], pista: 'Debe terminar en 4 y no dividirse exacto entre 4.' }, '14 termina en 4 y $14 \\div 4 = 3.5$.')],
    cierre: 'Un contraejemplo cumple la condición y falla la conclusión; búscalo en negativos, el cero y el 2.',
  });

  xpAmplia('icf-ma-argumenta-3', {
    conecta: 'icf-ma-ecuaciones-3',
    desde: [
      ['Desde cero: pregunta y datos',
        xpMira('hoja', 'Todo problema tiene una **pregunta** (lo que se quiere saber) y unos **datos** (lo que ya se sabe).', { paras: [['Pregunta: ¿cuánto pagó Sara?'], ['Dato: compró 4 cuadernos.'], ['Dato: cada cuaderno vale 3 mil.'], ['4 · 3 = 12 mil']] }, [
          ['En «Sistemas» viste que con dos cosas desconocidas hacen falta dos pistas.', {}],
          ['La pregunta es lo que se quiere saber.', { luz: [0], nota: { 0: 'pregunta' } }],
          ['Los datos son lo que ya se sabe.', { luz: [1], nota: { 1: 'dato' } }],
          ['Con cuántos cuadernos no basta: falta el precio.', { luz: [1] }],
          ['Con los dos datos sale una sola respuesta: doce mil.', { luz: [2, 3], nota: { 2: 'dato' } }],
        ], 'La información alcanza cuando deja una sola respuesta.'),
        xpHaz('hoja', 'Se quiere el alto de una caja cuyo volumen es 60. Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El color de la caja'], ['El área de la base'], ['El peso de la caja']], pista: 'El volumen es el área de la base por el alto.' }, 'Con el área de la base: alto = 60 ÷ base.')],
    ],
    despues: [
      ['Más difícil: el dato escondido',
        xpMira('hoja', 'A veces el dato no aparece escrito, pero **se puede sacar** de otros. ¿Cuál fue la cuarta nota de Ana?', { paras: [['Promedio de sus 4 notas: 3.5'], ['Tres notas: 3, 4 y 3'], ['Total: 3.5 · 4 = 14'], ['Cuarta: 14 − 10 = 4']] }, [
          ['Parece que falta la cuarta nota.', { luz: [1] }],
          ['Pero el promedio esconde el total de puntos.', { luz: [0, 2] }, '$3.5 \\cdot 4 = 14$'],
          ['Las tres notas conocidas suman diez.', { luz: [1] }, '$3 + 4 + 3 = 10$'],
          ['La que falta es cuatro: la información sí alcanza.', { luz: [3], nota: { 3: 'alcanza' } }],
          ['Antes de decir «falta un dato», mira si se puede calcular.', {}],
        ], 'Un promedio por la cantidad de datos da el total.'),
        xpHaz('hoja', 'Un bus salió a las 7:10 y llegó a las 9:40, siempre a 60 km/h. Subraya lo que **sí** se puede saber.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La distancia recorrida'], ['El número de pasajeros'], ['El precio del pasaje']], pista: 'Del reloj sale el tiempo; con la velocidad, ¿qué más sale?' }, 'Viajó 2.5 h: $2.5 \\cdot 60 = 150$ km.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En grado 11 hay 120 estudiantes y el 30 % de **todo** el colegio usa bus. ¿Qué dato falta para saber cuántos de 11 usan bus?', { letras: ['A', 'B', 'C', 'D'], paras: [['El total de estudiantes del colegio.'], ['El porcentaje de los de 11 que usa bus.'], ['Cuántos buses tiene el colegio.'], ['Ninguno: son 36.']] }, [
        ['Primero, qué se pregunta: los de once que usan bus.', {}],
        ['El 30 % es de todo el colegio, no de once.', {}],
        ['Esta aplica ese 30 % a once: supone lo que no se sabe.', { luz: [3], nota: { 3: 'supone' } }],
        ['Con el total del colegio solo se sabe cuántos usan bus en todo.', { luz: [0], nota: { 0: 'no basta' } }],
        ['Los buses no dicen quién los usa.', { luz: [2], nota: { 2: 'sobra' } }],
        ['El porcentaje propio de once sí da una sola respuesta.', { luz: [1], nota: { 1: 'falta este' } }],
      ], 'El dato que falta es el que deja una sola respuesta a lo que se pregunta.'),
      xpHaz('hoja', 'Se quiere el área de un terreno triangular y se sabe que su base mide 40 m. Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El perímetro del terreno.'], ['La altura sobre esa base.'], ['El precio del metro cuadrado.'], ['Ninguno: el área es 20 m².']], pista: 'El área de un triángulo es base por altura entre dos.' }, 'Con la altura h: área $= 40 \\cdot h \\div 2$.')],
    cierre: 'Lee la pregunta, saca lo que se puede calcular y pide solo el dato que deja una respuesta.',
  });
}
