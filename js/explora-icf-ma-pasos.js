// Preicfes · Matemáticas, mundo 1 «Datos y Gráficas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero (tabla de doble entrada, qué es un porcentaje, sumar y repartir, población y muestra), sube hasta lo más
// difícil y termina mostrando cómo lo pregunta el examen, con sus trampas. Ejemplos propios, distintos de los ejercicios.
{
  // Cuadrícula de 100: las primeras k casillas pintadas.
  const cien = (v, K) => {
    let h = '';
    for (let i = 0; i < 100; i++) h += K.r(96 + (i % 10) * 14, 8 + Math.floor(i / 10) * 14, 12, 12, i < Math.round(v.k) ? 'fA' : 'fc', 2);
    return h + K.t(252, 74, `${Math.round(v.k)} %`, 'b ta', 'start') + K.t(252, 96, v.t || '', 's tm', 'start');
  };
  // Línea de tres meses, de 0 a 40.
  const LX = i => 100 + i * 90, LY = y => 170 - y / 40 * 136;
  const linea = (v, K) => {
    let h = '';
    for (let k = 0; k <= 40; k += 10) h += K.l(60, LY(k), 320, LY(k), 'ls') + K.t(52, LY(k) + 4, k, 's tm', 'end');
    const P = [v.a, v.b, v.c].map((y, i) => [LX(i), LY(y)]);
    h += K.pl(P, 'la gr') + P.map((q, i) => K.c(q[0], q[1], i ? 5 : 7, i ? 'fA' : 'fG')).join('');
    return h + ['ene', 'feb', 'mar'].map((m, i) => K.t(LX(i), 190, m, 's tm')).join('') + (v.nota ? K.t(190, 20, v.nota, 'tg') : '');
  };
  // Panes de cada amigo, en pilas; `lin` marca el nivel parejo.
  const pilas = (v, K) => {
    let h = '';
    v.vals.forEach((n, i) => {
      const x = 100 + i * 70;
      for (let j = 0; j < n; j++) h += K.c(x, 150 - j * 22, 9, 'fA');
      h += K.t(x, 176, v.rot[i], 's tm');
    });
    return h + (v.lin ? K.l(70, 150 - (v.lin - 0.5) * 22, 270, 150 - (v.lin - 0.5) * 22, 'lg d') : '') + K.t(170, 22, v.t || '', 'ta');
  };
  // La olla (población) y la cucharada (muestra): m = 1 revuelta, m = 2 solo el fondo.
  const MUESTRA = { 1: [2, 9, 15, 21, 27, 34, 38], 2: [30, 31, 32, 33, 34, 35, 36] };
  const olla = (v, K) => {
    let h = K.r(36, 34, 268, 112, 'fc', 14);
    for (let i = 0; i < 40; i++) {
      const x = 56 + (i % 10) * 25.5, y = 54 + Math.floor(i / 10) * 25;
      h += K.c(x, y, 7, i >= 30 || i % 3 === 0 ? 'fG' : 'fA');
      if ((MUESTRA[v.m] || []).includes(i)) h += K.c(x, y, 11, 'fn');
    }
    return h + K.t(170, 24, v.t || 'la olla entera', 's tm') + K.t(170, 168, v.lab || '', 'ta');
  };

  xpAmplia('icf-ma-datos-1', {
    conecta: null,
    desde: [
      ['Desde cero: leer una tabla',
        xpMira('rejilla', 'Antes de las gráficas, la **tabla**. Una tabla de doble entrada guarda cada dato donde se cruzan una **fila** y una **columna**.', { f: 2, c: 3, filas: ['lunes', 'martes'], cols: ['mango', 'piña', 'uva'], celda: i => String([12, 8, 5, 9, 14, 6][i]) }, [
          ['Una tabla es como un casillero: cada dato vive en su fila y en su columna.', {}],
          ['Las filas van de lado a lado. Aquí cada fila es un día de ventas.', { luz: [0, 1, 2] }],
          ['Las columnas van de arriba abajo. Aquí cada columna es una fruta.', { luz: [1, 4] }],
          ['¿Cuánta piña se vendió el martes? Se cruza la fila martes con la columna piña: 14.', { luz: [4] }],
          ['Para el total de mango se suma toda su columna.', { luz: [0, 3] }, '$12 + 9 = 21$'],
        ], 'Un dato de la tabla está donde se cruzan su fila y su columna.'),
        xpHaz('rejilla', 'Esta tabla dice qué deporte prefiere cada grado. Toca la casilla de los estudiantes de **7.°** que prefieren **voleibol**.', { f: 2, c: 3, filas: ['6.°', '7.°'], cols: ['fútbol', 'básquet', 'voleibol'], celda: i => String([15, 9, 6, 11, 7, 12][i]), unoAUno: true, meta: [5] }, 'Fila 7.°, columna voleibol: son 12.')],
      ['Desde cero: qué es un porcentaje',
        xpMira('dibujo', '«Por ciento» quiere decir **de cada cien**. Piensa en una cuadrícula de 100 casillas: el porcentaje dice cuántas están pintadas.', { dib: cien, v: { k: 0, t: '' }, alto: 160 }, [
          ['Aquí hay 100 casillas, y ninguna está pintada todavía: el 0 %.', {}],
          ['Si pintas 25 de las 100, pintaste el 25 %.', { k: 25 }],
          ['La mitad de la cuadrícula son 50 casillas: el 50 %.', { k: 50 }],
          ['Todo pintado es el 100 %: el total completo, sin que falte nada.', { k: 100, t: 'el total' }],
          ['Si el total no es 100, se compara igual: 10 de 20 también es la mitad.', { k: 50, t: '10 de 20' }, '$\\tfrac{10}{20} = \\tfrac{50}{100} = 50\\,\\%$'],
        ], 'Un porcentaje dice cuántos hay de cada 100.'),
        xpHaz('dibujo', 'En un salón de **20** estudiantes, **6** usan gafas. Pinta en la cuadrícula el porcentaje que representan.', { dib: cien, v: { k: 0 }, metas: { k: 30 }, alto: 210, manijas: [{ k: 'k', min: 0, max: 100, paso: 5, et: 'casillas pintadas' }],
          lee: v => `$${v.k}\\,\\%$`, dice: () => '20 estudiantes son el total: ¿cuántos serían de cada 100?' }, '6 de 20 es lo mismo que 30 de 100: el 30 %.')],
    ],
    despues: [
      ['Más difícil: la forma y el punto de partida',
        xpMira('dibujo', 'En el examen te dan una tabla y varias gráficas. Varias tienen la **forma** correcta; solo una **arranca** donde debe.', { dib: linea, v: { a: 20, b: 35, c: 30, nota: '' }, alto: 200 }, [
          ['La tabla dice: 20 en enero, 35 en febrero y 30 en marzo.', { nota: '20, 35, 30' }],
          ['Esta otra gráfica también sube y luego baja, como la tabla. Pero empieza en 30.', { a: 30, nota: 'empieza en 30' }],
          ['La forma engaña: siempre se revisa el primer punto contra la tabla.', {}],
          ['Luego se mira el tipo de cambio: sube 15 y después baja 5.', { a: 20, nota: '+15 y −5' }],
          ['Y al final, el valor de llegada: 30 en marzo. Ahora sí coincide todo.', { nota: 'coincide' }],
        ], 'Revisa punto de partida, tipo de cambio y valor final.'),
        xpHaz('dibujo', 'La tabla dice **15**, **30** y **25**. La gráfica ya tiene la forma, pero el punto de enero está mal. Arrástralo.', { dib: linea, v: { a: 25, b: 30, c: 25 }, metas: { a: 15 }, alto: 200,
          manijas: [{ k: 'a', min: 0, max: 40, paso: 5, r: 10, en: v => [LX(0), LY(v.a)], de: (x, y) => (170 - y) / 136 * 40 }],
          lee: v => `$\\text{enero} = ${v.a}$`, dice: v => (v.a === 15 ? 'Ahora arranca donde dice la tabla.' : `Enero está en ${v.a}; mira la tabla.`) }, 'Enero en 15: sube 15 y baja 5, como la tabla.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se vendieron 30 helados en abril, 45 en mayo y 36 en junio. ¿Cuál afirmación es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['De abril a mayo las ventas subieron el 15 %.'], ['De abril a mayo las ventas subieron el 50 %.'], ['De mayo a junio bajaron el 25 %, porque 9 es la cuarta parte de 36.'], ['Junio fue el mes de más ventas.']] }, [
        ['Primero se lee qué pide: un cambio en porcentaje, comparado con lo de antes.', {}],
        ['A confunde unidades con porcentaje: subieron 15 helados, no el 15 %.', { luz: [0], nota: { 0: 'unidades' } }],
        ['C divide entre 36, lo de después. Lo de antes era 45: bajó el 20 %.', { luz: [2], nota: { 2: 'base mala' } }],
        ['D no cuadra con la tabla: mayo, con 45, vendió más que junio.', { luz: [3], nota: { 3: 'mal leída' } }],
        ['B: subieron 15 sobre 30, la mitad. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$\\tfrac{15}{30} = 50\\,\\%$'],
      ], 'Haz tu propia cuenta y compara cada opción con ella.'),
      xpHaz('hoja', 'Un parque recibió 80 visitantes el sábado y 60 el domingo. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El domingo llegaron un 20 % menos.'], ['Bajaron un 33 %, porque 20 es la tercera parte de 60.'], ['Bajaron un 25 %.'], ['El domingo llegaron más visitantes.']], pista: 'Compara lo que bajó con lo que había antes del cambio, no con lo de después.' }, 'Bajaron 20 sobre 80: el 25 %.')],
    cierre: 'Fila y columna para leer, escala para medir y el cambio siempre sobre lo de antes.',
  });

  xpAmplia('icf-ma-datos-2', {
    conecta: 'icf-ma-datos-1',
    desde: [
      ['Desde cero: juntar y repartir',
        xpMira('dibujo', 'Para el promedio solo hacen falta dos acciones de todos los días: **juntar** (sumar) y **repartir parejo** (dividir).', { dib: pilas, v: { vals: [5, 1, 3], rot: ['Ana', 'Bo', 'Cata'], lin: 0, t: '' }, alto: 190 }, [
          ['En la lección de tablas y gráficas viste que cada barra guarda un número.', {}],
          ['Cada número de una lista se llama dato. Aquí hay tres: 5, 1 y 3 panes.', { t: '5, 1 y 3' }],
          ['Juntar es sumar: entre los tres tienen 9 panes.', { t: '9 panes' }, '$5 + 1 + 3 = 9$'],
          ['Repartir parejo es dividir entre cuántos son: 9 entre 3 da 3.', { lin: 3 }, '$9 \\div 3 = 3$'],
          ['Ana le pasa dos panes a Bo, y los tres quedan con 3.', { vals: [3, 3, 3], lin: 3, t: 'promedio: 3' }],
        ], 'El promedio es lo que tendría cada uno si todo se repartiera parejo.'),
        xpHaz('fichas', 'Cuatro hermanos tienen 2, 6, 3 y 5 dulces. Pon cuánto **suman** y lo que le toca a **cada uno** si se reparten parejo.', { slots: [{ x: 110, y: 46, w: 90, et: 'suman' }, { x: 230, y: 46, w: 90, et: 'a cada uno' }], fichas: ['16', '4', '12', '3', '8'], meta: ['16', '4'], alto: 96, pista: 'Primero junta todo; después divide entre los cuatro hermanos.' }, '$2 + 6 + 3 + 5 = 16$ y $16 \\div 4 = 4$.')],
    ],
    despues: [
      ['Más difícil: juntar dos grupos',
        xpMira('fichas', 'Cuando se juntan dos grupos de distinto tamaño, el promedio de los dos **no** es el punto medio de sus promedios.', { slots: [{ x: 50, y: 50, w: 62, et: 'puntos A' }, { x: 130, y: 50, w: 62, et: 'puntos B' }, { x: 210, y: 50, w: 62, et: 'total' }, { x: 290, y: 50, w: 62, et: 'promedio' }], fichas: ['40', '90', '130', '3.25'], alto: 100 }, [
          ['Un curso de 10 estudiantes promedia 4.0 y otro de 30 promedia 3.0.', {}],
          ['La tentación es promediar 4.0 y 3.0 y decir 3.5. Es una trampa.', {}],
          ['Primero los puntos de cada curso: 10 por 4.0 son 40.', { pon: { 0: '40' } }, '$10 \\cdot 4.0 = 40$'],
          ['Y 30 por 3.0 son 90. Entre los dos cursos suman 130.', { pon: { 1: '90', 2: '130' } }, '$40 + 90 = 130$'],
          ['Ahora se reparte entre los 40 estudiantes: 3.25.', { pon: { 3: '3.25' } }, '$130 \\div 40 = 3.25$'],
          ['El curso grande pesa más; por eso el promedio queda cerca de su 3.0.', { marca: [1] }],
        ], 'Para juntar grupos, suma los totales y divide entre todas las personas.'),
        xpHaz('fichas', 'Un grupo de 20 personas promedia 60 kg y otro de 5 promedia 80 kg. Pon el total de kilos y el promedio de las 25.', { slots: [{ x: 110, y: 46, w: 90, et: 'total (kg)' }, { x: 230, y: 46, w: 90, et: 'promedio' }], fichas: ['1600', '64', '70', '140', '320'], meta: ['1600', '64'], alto: 96, pista: 'No promedies 60 y 80: los grupos tienen distinta cantidad de personas.' }, '$1\\,200 + 400 = 1\\,600$ y $1\\,600 \\div 25 = 64$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un equipo hizo 2, 0, 3, 0 y 5 goles en cinco partidos. Luis afirma que su promedio es **más de 3** goles por partido. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 2 + 3 + 5 = 10, y 10 entre los 3 partidos con gol da más de 3.'], ['Sí, porque el dato mayor es 5 y el promedio se acerca al mayor.'], ['No, porque los 10 goles se reparten entre los 5 partidos: 2 por partido.'], ['No, porque la moda es 0, y ese es el promedio.']] }, [
        ['Antes de leer los porqués, haz tu cuenta: 10 goles entre 5 partidos.', {}, '$10 \\div 5 = 2$'],
        ['Con 2 ya sabes que Luis no tiene razón: las dos del Sí caen.', { luz: [0, 1], nota: { 0: 'es No', 1: 'es No' } }],
        ['A divide entre 3, pero los partidos en cero también cuentan. Promedio mal dividido.', { luz: [0], nota: { 0: 'mal dividido' } }],
        ['D dice No, pero con otra medida: la moda es el dato que más se repite.', { luz: [3], nota: { 3: 'otra medida' } }],
        ['C dice No y además hace la cuenta completa. Es la correcta.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Decide el Sí o el No con tu cuenta y luego revisa los porqués.'),
      xpHaz('hoja', 'Cuatro primos tienen 8, 9, 9 y 30 años. Ana dice que la mediana los describe mejor que el promedio. ¿Tiene razón? Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['No, porque el promedio siempre es la mejor medida.'], ['Sí: la mediana es 9 y casi todos están cerca de 9; el 30 jala el promedio a 14.'], ['Sí, porque la mediana es 14.'], ['No, porque el promedio es 9.']], pista: 'Calcula las dos medidas y mira cuál queda cerca de la mayoría de los primos.' }, 'Mediana 9, promedio $56 \\div 4 = 14$: el 30 jala el promedio.')],
    cierre: 'Promedio: todo entre cuántos son, contando los ceros. Mediana: el centro. Grupos: se juntan los totales.',
  });

  xpAmplia('icf-ma-datos-3', {
    conecta: 'icf-ma-datos-2',
    desde: [
      ['Desde cero: población y muestra',
        xpMira('dibujo', 'Para saber algo de muchos no hace falta preguntarles a todos. Piensa en cómo pruebas una **sopa**.', { dib: olla, v: { m: 0, lab: '' }, alto: 180 }, [
          ['En la lección de promedios viste que un dato extremo puede jalar el resultado.', {}],
          ['Para probar una sopa no te la tomas toda: pruebas una cucharada.', {}],
          ['La olla entera es la población: todos aquellos sobre los que quieres saber algo.', { lab: 'población: la olla' }],
          ['La cucharada es la muestra: los pocos que sí se miran.', { m: 1, lab: 'muestra: la cucharada' }],
          ['Si la sopa está revuelta, la cucharada sabe como toda la olla.', { m: 1, lab: 'revuelta: representa' }],
          ['Si solo pruebas el fondo, donde quedó la sal, la cucharada engaña: muestra sesgada.', { m: 2, lab: 'solo el fondo: sesgada' }],
        ], 'Población: todos. Muestra: los que se miran. Sirve si se parece a todos.'),
        xpHaz('hoja', 'Se quiere saber cuántas horas duermen los estudiantes de un colegio, y se encuesta a 30. Subraya cuál es la **población**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los 30 estudiantes encuestados.'], ['Todos los estudiantes del colegio.'], ['Las horas que duerme cada uno.']], pista: 'Los encuestados son la cucharada. ¿Cuál es la olla entera?' }, 'La población es todo el colegio; los 30 son la muestra.')],
    ],
    despues: [
      ['Más difícil: lo que sí se concluye',
        xpMira('fichas', 'De una buena muestra se puede **estimar** cuántos hay en toda la población, pasando el porcentaje.', { slots: [{ x: 66, y: 50, w: 86, et: 'en la muestra' }, { x: 170, y: 50, w: 86, et: 'porcentaje' }, { x: 274, y: 50, w: 86, et: 'en el pueblo' }], fichas: ['15 de 50', '30 %', '600'], alto: 100 }, [
          ['Un pueblo tiene 2 000 hogares. Por sorteo se visitan 50, y 15 tienen perro.', {}],
          ['En la muestra, 15 de 50 son el 30 %.', { pon: { 0: '15 de 50', 1: '30 %' } }, '$\\tfrac{15}{50} = 30\\,\\%$'],
          ['Como la muestra fue por sorteo, se espera algo parecido en todo el pueblo.', {}],
          ['El 30 % de 2 000 son unos 600 hogares con perro.', { pon: { 2: '600' } }, '$0.3 \\cdot 2\\,000 = 600$'],
          ['Es una estimación: dice cerca de 600, no exactamente 600.', { marca: [2] }],
          ['Y no dice por qué tienen perro: eso nadie lo preguntó.', { marca: [] }],
        ], 'De una buena muestra se pasa el porcentaje a la población, como estimación.'),
        xpHaz('fichas', 'Una ciudad tiene 30 000 jóvenes. Se sortean 200 y 50 montan bicicleta a diario. Pon el porcentaje y cuántos jóvenes se estiman.', { slots: [{ x: 110, y: 46, w: 90, et: 'porcentaje' }, { x: 230, y: 46, w: 90, et: 'en la ciudad' }], fichas: ['25 %', '7 500', '50 %', '15 000', '250'], meta: ['25 %', '7 500'], alto: 96, pista: 'Halla qué parte de los 200 son los 50 y saca esa misma parte de 30 000.' }, '$\\tfrac{50}{200} = 25\\,\\%$ y el 25 % de 30 000 es 7 500.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', '¿La gente de un municipio quiere una ciclovía? Se preguntó a 120 personas en una tienda de bicicletas. ¿Por qué eso no sirve para todo el municipio?', { letras: ['A', 'B', 'C', 'D'], paras: [['Porque 120 personas son muy pocas para cualquier encuesta.'], ['Porque en esa tienda casi todos usan bicicleta y es de esperar que quieran la ciclovía.'], ['Porque debieron preguntar solo a quienes no tienen bicicleta.'], ['Porque una ciclovía cuesta mucho dinero.']] }, [
        ['La pregunta no es si la ciclovía es buena: es por qué falla la muestra.', {}],
        ['D puede ser cierto, pero no habla de la muestra. Queda fuera de la pregunta.', { luz: [3], nota: { 3: 'fuera' } }],
        ['A culpa al tamaño. Pocas personas bien sorteadas sí pueden servir.', { luz: [0], nota: { 0: 'tamaño' } }],
        ['C propone otro grupo cargado: cambia un sesgo por otro.', { luz: [2], nota: { 2: 'otro sesgo' } }],
        ['B señala quiénes quedaron dentro: gente que ya usa bicicleta. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Una muestra falla cuando solo deja entrar a un tipo de personas.'),
      xpHaz('hoja', 'Para saber cuánto gastan en almuerzo los trabajadores de una ciudad, se preguntó a 300 empleados de un banco. ¿Por qué no representa? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Porque se debió preguntar a 3 000 personas.'], ['Porque los empleados de un banco no se parecen a todos los trabajadores en lo que ganan y gastan.'], ['Porque el almuerzo cambia de precio cada día.'], ['Porque solo se debía preguntar a quienes almuerzan en casa.']], pista: 'Pregúntate quiénes podían salir en esa muestra y quiénes nunca.' }, 'Solo entraron empleados de un banco: la muestra está cargada.')],
    cierre: 'La muestra sirve si todos podían salir; de ella se estima un porcentaje, nunca una causa.',
  });
}
