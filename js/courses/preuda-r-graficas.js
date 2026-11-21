// Preuniversitario · mundo 9 «Tablas y gráficas»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  setLesson('pu-gr-1', [
    play('lee-barras', 'Lee la gráfica con su escala', { rounds: [
      { bars: [['lun', 35], ['mar', 50], ['mié', 20], ['jue', 45]], hi: 60, step: 10, q: 'diff', a: 1, b: 2, max: 60, tstep: 5 },
      { bars: [['A', 120], ['B', 90], ['C', 150]], hi: 160, step: 40, q: 'sum', max: 400, tstep: 20 },
    ] }, 'Martes llega a 50 y miércoles a 20: 30 más. Con rayas de 40 en 40, B queda a un cuarto del camino entre 80 y 120 (90) y C a tres cuartos entre 120 y 160 (150): $120 + 90 + 150 = 360$.',
      { hint: 'Mira cuánto vale cada raya de la escala antes de leer una barra.' }),
    play('arma-barras', 'Pasa la tabla a la gráfica', { rounds: [
      { rows: [['fútbol', 12], ['baloncesto', 7], ['voleibol', 4], ['tenis', 9]], hi: 14, step: 2, snap: 1 },
      { rows: [['2022', 150], ['2023', 225], ['2024', 300]], hi: 350, step: 50, snap: 25 },
    ] }, 'Cada barra llega a su dato: con rayas de 2 en 2, el 7 y el 9 quedan entre dos rayas; con rayas de 50, el 225 queda en la mitad entre 200 y 250.',
      { hint: 'Cuenta cuánto vale cada raya y cuántas necesitas para llegar al dato.' }),
    play('mayor-subida', 'El tramo que más cambia', { rounds: [
      { pts: [['ene', 20], ['feb', 26], ['mar', 24], ['abr', 33], ['may', 35]], hi: 40, step: 10, q: 'up' },
      { pts: [['L', 4], ['M', 10], ['X', 20], ['J', 34]], hi: 40, step: 10, q: 'pct' },
      { pts: [['1', 50], ['2', 44], ['3', 30], ['4', 28], ['5', 20]], hi: 60, step: 10, q: 'down' },
    ] }, 'De marzo a abril sube 9, lo que más. En porcentaje gana el primer tramo: de 4 a 10 es +150 %, aunque de 20 a 34 suba más unidades (+70 %). La mayor bajada es de 44 a 30: −14.',
      { hint: 'Para el porcentaje, compara lo que cambió con el valor de partida de ese tramo.' }),
    play('variacion-barras', 'La variación porcentual', { rounds: [{ from: 40, to: 50, what: 'Visitas' }, { from: 80, to: 60, what: 'Precio' }, { from: 30, to: 75, what: 'Seguidores' }] },
      'El cambio se mide sobre lo de antes: $\\tfrac{10}{40} = 25\\%$ de aumento; $\\tfrac{-20}{80} = -25\\%$; $\\tfrac{45}{30} = 150\\%$ de aumento.',
      { hint: 'La barra de antes es el 100 %: ¿cuántas rayas de 10 % hay que agregar o quitar?' }),
    play('rueda-porcentaje', 'La gráfica circular', { rounds: [{ part: 18, whole: 120 }, { part: 63, whole: 90 }], tol: 1 },
      'Cada sector es su parte del total: $\\tfrac{18}{120} = 15\\%$ y $\\tfrac{63}{90} = 70\\%$.',
      { hint: 'Divide la parte entre el total y multiplica por 100.' }),
    play('cruz-porcentaje', 'De la gráfica a la cantidad', { problems: [
      { text: 'El 30 % de 120 encuestados prefiere rock. ¿Cuántos son?', chips: [{ label: '30', cell: 'p' }, { label: '120', cell: 'C' }, { label: '?', cell: 'B' }, { label: '90', cell: null }] },
      { text: '18 de los 60 estudiantes llegan a pie. ¿Qué porcentaje es?', chips: [{ label: '?', cell: 'p' }, { label: '60', cell: 'C' }, { label: '18', cell: 'B' }, { label: '42', cell: null }] },
    ] }, 'El total va con el 100 % y la parte con su porcentaje: $120 \\cdot 0.30 = 36$ y $\\tfrac{18}{60} = 30\\%$.',
      { hint: 'El total de encuestados es el 100 %; la parte que se pregunta va enfrente de su porcentaje.' }),
    play('vuela-precios', 'Vuela a la lectura correcta', { rounds: [{ title: 'Gráficas', items: [
      { ask: 'En una torta, un sector de 90° es…', options: ['25 %', '90 %', '9 %'], answer: 0 },
      { ask: 'De 200 a 150, el cambio es…', options: ['−25 %', '−50 %', '+25 %'], answer: 0 },
      { ask: 'Barras de 30 y 45: la segunda tiene…', options: ['15 más', '45 más', '75 más'], answer: 0 },
    ] }] }, '$\\tfrac{90}{360} = 25\\%$. $\\tfrac{-50}{200} = -25\\%$. $45 - 30 = 15$.',
      { hint: 'Torta: compara con 360°. Cambio: divide entre lo de antes.' }),
  ]);

  setLesson('pu-gr-2', [
    play('nivela-datos', 'El promedio es nivelar', { rounds: [{ data: [4, 9, 6, 3, 8], hi: 10, step: 2 }, { data: [12, 5, 9, 10], hi: 14, step: 2 }, { data: [7, 2, 5, 4], hi: 8, step: 2 }] },
      'El promedio deja todo parejo: $\\tfrac{30}{5} = 6$, $\\tfrac{36}{4} = 9$ y $\\tfrac{18}{4} = 4.5$. Ahí lo que sobra arriba llena justo lo que falta abajo.',
      { hint: 'Si sobra más de lo que falta, la línea está muy baja.' }),
    play('ordena-mediana', 'La mediana pide orden', { rounds: [{ data: [8, 3, 5, 8, 1, 6, 4] }, { data: [12, 7, 9, 15, 7, 10] }] },
      'Ordenados: 1, 3, 4, **5**, 6, 8, 8 (mediana 5). Con seis datos, 7, 7, **9, 10**, 12, 15: se promedian los dos del medio, 9.5.',
      { hint: 'Escribe cada dato tantas veces como aparece, de menor a mayor.' }),
    play('tres-centros', 'Media, mediana y moda', { rounds: [{ data: [2, 3, 3, 3, 4, 5, 8, 12], lo: 0, hi: 12 }, { data: [1, 5, 6, 6, 7], lo: 0, hi: 8 }] },
      'En la primera: media $\\tfrac{40}{8} = 5$, mediana $\\tfrac{3 + 4}{2} = 3.5$ y moda 3: el 12 jala la media hacia la derecha. En la segunda: media 5, mediana 6, moda 6: el 1 la jala a la izquierda.',
      { hint: 'La moda es la pila más alta; la mediana, el dato del medio; la media, la suma entre la cantidad.' }),
    play('dato-faltante', 'El dato que falta', { rounds: [{ data: [6, 8, null, 7], mean: 8, hi: 12, step: 1 }, { data: [40, null, 55, 45, 50], mean: 50, hi: 80, step: 5 }] },
      'La suma tiene que ser promedio por cantidad: $8 \\cdot 4 = 32$ y faltan $32 - 21 = 11$; $50 \\cdot 5 = 250$ y faltan $250 - 190 = 60$.',
      { hint: 'Multiplica el promedio por la cantidad de datos y resta lo que ya tienes.' }),
    play('balanza-promedio', 'El promedio de todos juntos', { rounds: [
      { groups: [{ lab: 'A', n: 6, mean: 3 }, { lab: 'B', n: 2, mean: 7 }], lo: 0, hi: 10 },
      { groups: [{ lab: 'mañana', n: 2, mean: 9 }, { lab: 'tarde', n: 5, mean: 3 }, { lab: 'noche', n: 1, mean: 7 }], lo: 0, hi: 10 },
    ] }, 'Cada grupo pesa según cuántos son: $\\tfrac{6 \\cdot 3 + 2 \\cdot 7}{8} = 4$, no 5 (el promedio de los promedios). Y $\\tfrac{18 + 15 + 7}{8} = 5$.',
      { hint: 'El grupo con más personas jala más el apoyo hacia su lado.' }),
    play('nivela-barras', 'Nivela una escalera de datos', { rounds: [{ a1: 2, d: 3, n: 5 }] },
      'Datos que suben parejo tienen el promedio en el medio: $\\tfrac{2 + 14}{2} = 8$, y suman $5 \\cdot 8 = 40$.',
      { hint: 'Lo que sobra en la barra más alta llena lo que falta en la más baja.' }),
    play('rompe-cambios', 'Manda la pelota al centro correcto', { miss: 'ordena los datos antes de buscar la mediana', rounds: [{ title: 'Centros', items: [
      { ask: 'Promedio de 4, 6 y 11', options: ['7', '6', '21'], answer: 0 },
      { ask: 'Mediana de 9, 2, 7, 4, 10', options: ['7', '4', '6.4'], answer: 0 },
      { ask: 'Moda de 3, 5, 5, 2, 3, 5', options: ['5', '3', '4'], answer: 0 },
    ] }] }, '$\\tfrac{21}{3} = 7$. Ordenados 2, 4, 7, 9, 10: mediana 7. El 5 aparece tres veces: moda 5.',
      { hint: 'Promedio: suma y divide. Mediana: ordena. Moda: el que más se repite.' }),
  ]);

  const G1 = ['1111110000', '1111100000', '1111110000', '1111000000', '1111100000', '1111110000', '1111100000', '1111000000', '1111100000', '1111110000'];
  const G2 = ['1111111111', '1111111111', '1111111111', '1111111111', '1111100000', '0000000000', '0010000100', '0000000000', '0000010000', '0000000000'];
  setLesson('pu-gr-3', [
    play('muestra-sesgo', 'La muestra que representa', { rounds: [{ grid: G1, w: 4, h: 5, tol: 5 }, { grid: G2, w: 5, h: 4, tol: 5 }] },
      'Una muestra tomada en un solo rincón engaña: en la primera cuadrícula el «sí» está a la izquierda y en la segunda arriba. La muestra se parece al pueblo cuando toma de las dos zonas.',
      { hint: 'Pon el marco donde quede gente de los dos lados de la frontera.' }),
    play('eje-engano', 'El eje que engaña', { rounds: [{ a: ['marca A', 55], b: ['marca B', 50], floor: 45 }, { a: ['2024', 84], b: ['2023', 70], floor: 60 }] },
      'Con el eje cortado, A parece el doble de B, pero $\\tfrac{55 - 50}{50} = 10\\%$ más. Y 84 frente a 70 es $\\tfrac{14}{70} = 20\\%$ más.',
      { hint: 'Baja el piso a 0 para ver las barras de verdad; el porcentaje se calcula con los números, no con el dibujo.' }),
    play('tabla-doble', 'Más gente no es más proporción', { rounds: [
      { rows: [['colegio A', 18, 30], ['colegio B', 28, 70]], what: 'usa bicicleta' },
      { rows: [['barrio norte', 45, 60], ['barrio sur', 33, 55]], what: 'recicla' },
    ] }, 'En B son más (28 frente a 18), pero en proporción gana A: 60 % frente a 40 %. Y en el norte, 75 % frente a 60 % en el sur.',
      { hint: 'Divide cada «sí» entre el total de su grupo, no entre el total de todos.' }),
    play('lee-barras', 'Lee con el eje cortado', { rounds: [{ bars: [['Ana', 82], ['Beto', 78], ['Caro', 86]], lo: 70, hi: 90, step: 5, q: 'diff', a: 2, b: 1, max: 20, tstep: 1 }] },
      'La barra de Caro parece el doble de la de Beto, pero el eje empieza en 70: la diferencia real es $86 - 78 = 8$.',
      { hint: 'Lee los números del eje, no la altura del dibujo.' }),
    play('variacion-barras', '¿Se duplicó o no?', { rounds: [{ from: 120, to: 180, what: 'Ventas' }, { from: 200, to: 50, what: 'Llamadas' }] },
      'De 120 a 180 es +50 %, no el doble (eso sería +100 %). De 200 a 50 es −75 %: quedó la cuarta parte.',
      { hint: 'Duplicar es +100 %; quedar en la mitad es −50 %.' }),
    play('pinta-personas', 'La muestra en porcentaje', { rounds: [{ total: 40, pct: 35, what: 'prefieren la radio' }, { total: 25, pct: 44, what: 'llegan en bus' }] },
      'El porcentaje es de cada 100: $40 \\cdot 0.35 = 14$ y $25 \\cdot 0.44 = 11$.',
      { hint: 'Halla cuánto por ciento vale cada persona del grupo.' }),
    play('tanque-porcentaje', 'Llena el tanque al porcentaje', { rounds: [{ title: 'Litros', items: [{ cap: 120, pct: 25, step: 5 }, { cap: 60, pct: 40, step: 3 }] }] },
      'El 25 % de 120 es 30 litros y el 40 % de 60 es 24.',
      { hint: 'El tanque lleno es el 100 %: parte la capacidad en cien y toma las que pide.' }),
  ]);

  setExam('pu-graficas', 'Tablas y gráficas', [
    ['pu-gr-1', 'Antes de leer una barra, mira cuánto vale cada raya de la escala.',
      play('lee-barras', 'Escala', { rounds: [{ bars: [['X', 60], ['Y', 25], ['Z', 40]], hi: 80, step: 20, q: 'diff', a: 0, b: 1, max: 60, tstep: 5 }] }, '$60 - 25 = 35$.', { hint: 'Rayas.' })],
    ['pu-gr-1', 'El cambio porcentual se mide sobre el valor de partida.',
      play('mayor-subida', 'Tramo', { rounds: [{ pts: [['1', 5], ['2', 12], ['3', 25], ['4', 36]], hi: 40, step: 10, q: 'pct' }] }, 'De 5 a 12 es +140 %, el mayor.', { hint: 'Porcentaje.' })],
    ['pu-gr-2', 'El promedio es el nivel donde sobra lo mismo que falta.',
      play('nivela-datos', 'Promedio', { rounds: [{ data: [3, 10, 7, 4], hi: 12, step: 2 }] }, '$\\tfrac{24}{4} = 6$.', { hint: 'Nivela.' })],
    ['pu-gr-2', 'Con datos cargados a un lado, media, mediana y moda no coinciden.',
      play('tres-centros', 'Centros', { rounds: [{ data: [1, 2, 2, 2, 3, 8], lo: 0, hi: 8 }] }, 'Media 3, mediana 2, moda 2.', { hint: 'Tres.' })],
    ['pu-gr-2', 'La suma de los datos es promedio por cantidad.',
      play('dato-faltante', 'Falta', { rounds: [{ data: [9, null, 6], mean: 7, hi: 12, step: 1 }] }, '$21 - 15 = 6$.', { hint: 'Suma.' })],
    ['pu-gr-3', 'Para comparar grupos de distinto tamaño se usan porcentajes.',
      play('tabla-doble', 'Grupos', { rounds: [{ rows: [['grupo 1', 12, 40], ['grupo 2', 9, 20]], what: 'aprobó' }] }, '30 % frente a 45 %.', { hint: 'Proporción.' })],
    ['pu-gr-3', 'Un eje que no empieza en cero exagera las diferencias.',
      play('eje-engano', 'Eje', { rounds: [{ a: ['A', 63], b: ['B', 60], floor: 55 }] }, '$\\tfrac{3}{60} = 5\\%$.', { hint: 'Números.' })],
  ]);
});

// Mundo 9 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-gr-1', [
    ['lee-barras', 0, 'La gráfica muestra los almuerzos vendidos de lunes a jueves. ¿Cuántos más se vendieron el martes que el miércoles?', 'El eje sube de 10 en 10: martes 50 y miércoles 20. La diferencia es 30.'],
    ['arma-barras', 0, 'Una encuesta de deportes llegó en una tabla. Pásala a la gráfica de barras', 'Cada barra sube hasta el número de su fila: 12, 7, 4 y 9. La escala va de 2 en 2, así que 7 y 9 quedan entre dos líneas.'],
    ['mayor-subida', 1, 'Las visitas a una página crecen cada día. ¿En qué tramo fue mayor el aumento en porcentaje?', 'En visitas, el salto más grande es el último (14). En porcentaje gana el primero: pasar de 4 a 10 es crecer un 150 %.'],
    ['variacion-barras', 1, 'Un precio pasó de 80 a 60. Halla la variación porcentual', 'Bajó 20 sobre los 80 de antes: $20 \\div 80 = 0.25$, una caída del 25 %. Para comparar dos variaciones muy parecidas sin calculadora, compara las fracciones con una que conozcas: bajar 18 sobre 75 es un poco menos que $\\tfrac14$, porque $18 \\cdot 4 = 72$ y 72 no llega a 75. Así que bajar de 75 a 57 es caer menos que el 25 %.'],
    ['rueda-porcentaje', 0, 'En una gráfica circular de 120 encuestados, 18 eligieron teatro. Gira hasta esa parte', '$18 \\div 120 = 0.15$: el 15 % del círculo.'],
    ['cruz-porcentaje', { problems: [{ text: 'El 30 % de 120 encuestados prefiere rock. ¿Cuántos son?', chips: [{ label: '30', cell: 'p' }, { label: '120', cell: 'C' }, { label: '?', cell: 'B' }] }] }, 'De la gráfica a la cantidad: arma la cruz del porcentaje', 'La cruz es $\\tfrac{100}{120} = \\tfrac{30}{B}$: prefieren rock 36 personas.'],
    ['vuela-precios', 0, 'Vuela a la lectura correcta', 'Un sector de 90° es la cuarta parte: 25 %. De 200 a 150 se pierden 50 sobre 200: $-25\\,\\%$. Entre barras de 30 y 45 hay 15 de diferencia.'],
  ], [
    sol('Una papelería vendió 120 cuadernos en la semana 1, 150 en la semana 2, 90 en la semana 3 y 180 en la semana 4. ¿En qué porcentaje aumentaron las ventas de la semana 3 a la 4? ¿Cuál fue el promedio de ventas por semana?',
      ['De la semana 3 a la 4 las ventas subieron $180 - 90 =$ [[90]] cuadernos', 'El cambio se mide sobre el valor de antes: $90 \\div 90 = 1$, es decir, el [[100 %]]', 'En las cuatro semanas se vendieron $120 + 150 + 90 + 180 =$ [[540]] cuadernos', 'Promedio por semana: $540 \\div 4 =$ [[135]] cuadernos'],
      ['50 %', '200 %', '180'],
      'Duplicarse es aumentar un 100 %, no un 200 %: el aumento (90) es igual al valor de antes (90). El promedio reparte el total entre las cuatro semanas.',
      'Para el porcentaje, compara lo que subió con lo que había antes, no con lo que hay ahora.'),
    err('Una gráfica circular muestra cómo llegan al trabajo los 240 empleados de una empresa. El sector «moto» tiene un ángulo de $60^\\circ$. ¿Cuántos empleados llegan en moto?',
      ['El círculo completo son $360^\\circ$ y representa a los 240 empleados', 'El sector de $60^\\circ$ es $\\tfrac{60}{360} = \\tfrac16$ del círculo', 'Llegan en moto el 60 % de los empleados: $0.60 \\cdot 240 = 144$'], 2,
      ['Llega en moto $\\tfrac16$ de los empleados: $240 \\div 6 = 40$', 'Llegan en moto 60 empleados: uno por cada grado', 'Llegan en moto $240 - 60 = 180$ empleados'],
      'Grados no son porcentajes: $60^\\circ$ es la sexta parte del círculo (cerca del 16.7 %), y la sexta parte de 240 es 40.',
      'El 100 % del círculo son $360^\\circ$, no 100. ¿Qué fracción del círculo ocupa el sector?'),
    opc('Una gráfica de líneas registra la temperatura de una ciudad cada tres horas: a las 6 h, 12 °C; a las 9 h, 16 °C; a las 12 h, 23 °C; a las 15 h, 25 °C; a las 18 h, 19 °C, y a las 21 h, 14 °C. El intervalo de tres horas en el que la temperatura tuvo el mayor cambio fue:',
      ['de 6 a 9 horas', 'de 15 a 18 horas', 'de 9 a 12 horas', 'de 18 a 21 horas'], 2,
      'Los cambios son $+4$, $+7$, $+2$, $-6$ y $-5$ grados. El mayor, sin importar el signo, es el de 9 a 12 horas.',
      'Calcula la diferencia en cada tramo. Un cambio puede ser una subida o una bajada.'),
  ]);

  diezLesson('pu-gr-2', [
    ['nivela-datos', 0, 'Cinco amigos llevan 4, 9, 6, 3 y 8 dulces. Nivela las barras para repartirlos por igual', 'Entre todos tienen 30 dulces: nivelados, cada uno queda con $30 \\div 5 = 6$. Ese es el promedio.'],
    ['ordena-mediana', 1, 'Seis atletas marcaron estos tiempos. Ordénalos y halla la mediana', 'Ordenados: 7, 7, 9, 10, 12, 15. Con un número par de datos, la mediana es el promedio de los dos del centro: 9.5.'],
    ['tres-centros', 0, 'Los salarios de una empresa pequeña: ubica la media, la mediana y la moda', 'Moda 3 (el que más se repite), mediana 3.5 (entre 3 y 4) y media 5: los dos datos grandes jalan la media hacia arriba.'],
    ['dato-faltante', 1, 'Un vendedor necesita promediar 50 en cinco días y ya lleva 40, 55, 45 y 50. Halla el dato que falta', 'Para promediar 50 en cinco días debe sumar 250. Lleva 190: le faltan 60.'],
    ['balanza-promedio', 0, 'Seis estudiantes promediaron 3 y otros dos promediaron 7. Ubica el promedio de todos', 'El grupo grande pesa más: $\\tfrac{6 \\cdot 3 + 2 \\cdot 7}{8} = \\tfrac{32}{8} = 4$, más cerca del 3 que del 7.'],
    ['nivela-barras', 0, 'Los datos suben como una escalera. Nivélala', 'En una escalera pareja (2, 5, 8, 11, 14) el promedio es el dato del centro: 8.'],
    ['rompe-cambios', 0, 'Manda la pelota al centro correcto', 'Promedio: $21 \\div 3 = 7$. Mediana de 2, 4, 7, 9, 10: el del centro, 7. Moda: el 5, que sale tres veces.'],
  ], [
    sol('En un curso, la nota definitiva se calcula así: el examen parcial vale el 40 % y el examen final vale el 60 %. Andrea obtuvo 3.0 en el parcial. ¿Qué nota necesita en el final para que su definitiva sea 3.6?',
      ['El parcial aporta $0.40 \\cdot 3.0 =$ [[1.2]]', 'Para llegar a 3.6, el final debe aportar $3.6 - 1.2 =$ [[2.4]]', 'El final pesa 0.60: la nota debe ser $2.4 \\div 0.60 =$ [[4.0]]'],
      ['4.2', '3.6', '1.8'],
      'Un promedio ponderado suma los aportes de cada nota por su peso. No es el promedio simple: con 4.2 en el final, la definitiva sería 3.72.',
      'Cada examen aporta su nota multiplicada por su peso. ¿Cuánto aporta ya el parcial?'),
    err('En un curso hay 20 mujeres y 10 hombres. En un examen, el promedio de las mujeres fue 4.0 y el de los hombres, 3.1. ¿Cuál fue el promedio de todo el curso?',
      ['Puntos de las mujeres: $20 \\cdot 4.0 = 80$', 'Puntos de los hombres: $10 \\cdot 3.1 = 31$', 'Promedio del curso: $(4.0 + 3.1) \\div 2 = 3.55$'], 2,
      ['Promedio del curso: $(80 + 31) \\div 30 = 3.7$', 'Promedio del curso: $(80 + 31) \\div 2 = 55.5$', 'Promedio del curso: $(80 + 31) \\div 20 = 5.55$'],
      'Los grupos no tienen el mismo tamaño: se suman los puntos de todos y se divide entre las 30 personas. Da 3.7, más cerca del promedio del grupo grande.',
      'Los dos primeros pasos ya calcularon los puntos de cada grupo. ¿Los usó el último paso?'),
    opc('Las edades de cinco primos son 8, 11, 11, 14 y 21 años. De las siguientes afirmaciones, la única verdadera es:',
      ['El promedio es igual a la mediana', 'La mediana es mayor que el promedio', 'La moda es mayor que la mediana', 'El promedio es mayor que la mediana'], 3,
      'El promedio es $65 \\div 5 = 13$; la mediana y la moda son 11. El dato grande (21) sube el promedio por encima de la mediana.',
      'Calcula los tres: el promedio, el dato del centro y el que más se repite.'),
  ]);

  diezLesson('pu-gr-3', [
    ['muestra-sesgo', 0, 'Un periodista quiere saber qué opina toda la ciudad. Ubica la muestra donde mejor la represente', 'Una buena muestra se parece al total: debe tener la misma mezcla de opiniones, no solo las del lado donde es más fácil preguntar.'],
    ['eje-engano', 0, 'Un anuncio compara dos marcas con el eje cortado. Baja el eje hasta el 0 para ver la diferencia real', 'Con el eje desde 45, la barra de 55 parece el doble de la de 50. Desde 0 se ve la verdad: solo es un 10 % más alta.'],
    ['tabla-doble', 0, 'En el colegio A usan bicicleta 18 de 30 estudiantes y en el B, 28 de 70. ¿Dónde es mayor la proporción?', 'En B hay más ciclistas, pero A gana en proporción: $18 \\div 30 = 60\\,\\%$ contra $28 \\div 70 = 40\\,\\%$.'],
    ['lee-barras', 0, 'El eje de esta gráfica de puntajes no empieza en 0. ¿Cuánto más sacó Caro que Beto?', 'Se leen los valores, no los tamaños: $86 - 78 = 8$ puntos, aunque la barra de Caro parezca el doble.'],
    ['variacion-barras', 0, 'Un titular dice que las ventas «se duplicaron» al pasar de 120 a 180. Mide la variación real', 'Subieron 60 sobre 120: un 50 %. Duplicarse sería un 100 %, llegar a 240.'],
    ['pinta-personas', 0, 'En una muestra de 40 personas, el 35 % prefiere la radio. Píntalas', 'El 10 % de 40 es 4: el 35 % son $12 + 2 = 14$ personas.'],
    ['tanque-porcentaje', 0, 'Llena cada tanque al porcentaje pedido'],
  ], [
    sol('Una encuesta preguntó en dos ciudades si las personas usan transporte público. En la ciudad A respondieron 80 personas y 60 dijeron que sí. En la ciudad B respondieron 120 personas y 72 dijeron que sí. ¿En cuál ciudad es mayor la proporción de usuarios?',
      ['Ciudad A: $60 \\div 80 =$ [[75 %]]', 'Ciudad B: $72 \\div 120 =$ [[60 %]]', 'En B hay más usuarios (72 contra 60), pero la proporción es mayor en la ciudad [[A]]', 'La diferencia es de [[15]] puntos porcentuales'],
      ['B', '12', '66 %'],
      'Para comparar grupos de distinto tamaño no sirven las cantidades: se comparan las proporciones. Tener más usuarios no es tener mayor proporción.',
      'Cada ciudad tiene su propio total. Divide los que dijeron que sí entre los que respondieron en esa ciudad.'),
    err('Una tienda vendió 40 camisetas en enero, 60 en febrero y 90 en marzo. El dueño afirma: «las ventas crecieron en el mismo porcentaje en febrero y en marzo». ¿Tiene razón?',
      ['De enero a febrero: $60 - 40 = 20$ camisetas más', 'De febrero a marzo: $90 - 60 = 30$ camisetas más', 'Como 30 es más que 20, el porcentaje de crecimiento fue mayor en marzo'], 2,
      ['En porcentaje: $20 \\div 40 = 50\\,\\%$ y $30 \\div 60 = 50\\,\\%$. Creció lo mismo', 'En porcentaje: $20 \\div 60$ y $30 \\div 90$. Creció el 33 % cada mes', 'Como 20 es menos que 30, el porcentaje fue mayor en febrero'],
      'Cada aumento se compara con las ventas del mes anterior: 20 sobre 40 y 30 sobre 60 son el 50 % las dos veces. El dueño tiene razón.',
      'Un porcentaje de crecimiento no es la cantidad que se sumó: depende de cuánto había antes.'),
    opc('En una gráfica de barras, el eje vertical empieza en 90 en lugar de 0. La barra del producto A llega a 100 y la del producto B llega a 110, de modo que la barra de B se ve el doble de alta que la de A. De las siguientes afirmaciones, la única correcta es:',
      ['B vendió el doble que A', 'B vendió un 10 % más que A', 'B vendió un 100 % más que A', 'No se puede comparar a A con B'], 1,
      'Los valores son 100 y 110: B vendió 10 más sobre 100, un 10 % más. El eje cortado exagera la diferencia.',
      'Lee los números del eje, no el tamaño de las barras.'),
  ]);

  addExam('pu-graficas', [
    ['pu-gr-1', 'En una gráfica circular, el sector es la misma fracción del total que su ángulo de 360°.',
      opc('Una gráfica circular representa a 600 estudiantes. El sector de quienes prefieren ciencias mide $120^\\circ$. La cantidad de estudiantes que prefiere ciencias es:', ['200', '120', '72', '300'], 0,
        '$120^\\circ$ es la tercera parte del círculo: $600 \\div 3 = 200$.', 'Halla qué fracción de la vuelta completa ocupa el sector.')],
    ['pu-gr-2', 'El promedio por el número de datos da la suma.',
      opc('El promedio de cuatro números es 15. Si se agrega un quinto número, el promedio pasa a ser 16. El quinto número es:', ['16', '20', '17', '31'], 1,
        'Los cuatro suman 60 y los cinco deben sumar 80: el quinto es 20.', 'Convierte cada promedio en una suma.')],
    ['pu-gr-3', 'Una muestra solo permite concluir sobre un grupo que se le parezca.',
      opc('A la salida de un gimnasio se encuestó a 50 personas, y 45 dijeron que hacen ejercicio todas las semanas. De esa encuesta se puede concluir que:', ['El 90 % de la población hace ejercicio', 'La mayoría de la ciudad va al gimnasio', 'Hacer ejercicio está de moda', 'La muestra no representa a toda la población'], 3,
        'Quienes salen de un gimnasio no se parecen al resto de la población: la muestra está sesgada.', 'Pregúntate a quiénes se les preguntó y si se parecen a todos los demás.')],
  ]);
});
