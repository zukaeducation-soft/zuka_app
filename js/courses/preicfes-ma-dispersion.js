// Preicfes · Matemáticas · mundo 12 «Dispersión y Comparación» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-dispersion-1', 'Rango, varianza y desviación', guion(
    ['Qué tan regados', 'Dos grupos pueden tener el mismo promedio y estar muy distintos.'],
    ['Rango', 'El mayor menos el menor: solo mira los extremos.'],
    ['Varianza', 'El promedio de los cuadrados de las desviaciones.'],
    ['Desviación estándar', 'La raíz de la varianza: vuelve a la unidad de los datos.']), [
    x('desvios-cero', 'Mueve el apoyo hasta que las **desviaciones** sumen **0** y la regla quede en equilibrio.', { d: [1, 3, 4, 8, 9], hi: 10 },
      'El equilibrio está en el promedio: $25 \\div 5 = 5$.', 'Reparte la suma de los datos entre todos por igual.'),
    x('mueve-rango', 'Mueve el dato **mayor** hasta que el **rango** de los datos sea **8**.', { d: [3, 5, 5, 6], rango: 8, hi: 14 },
      'El menor es 3: el mayor debe ser $3 + 8 = 11$.', 'El rango se cuenta siempre desde el dato menor.'),
    x('varianza-pasos', 'Para los datos **2, 4, 6** y **8**, completa.', { et: ['promedio', 'suma de los cuadrados', 'varianza', 'rango'], metas: ['5', '20', '5', '6'], fichas: ['5', '20', '5', '6', '10', '4', '0'], mira: ['Suma y reparte entre 4.', 'Las desviaciones son −3, −1, 1 y 3.', 'Promedia los cuadrados.', 'El mayor menos el menor.'], trampas: { '1:0': 'Esa es la suma sin elevar al cuadrado.', '2:20': 'Falta dividir entre los 4 datos.' }, ok: 'Promedio, cuadrados y otra vez promedio.' },
      '$9 + 1 + 1 + 9 = 20$ y $20 \\div 4 = 5$; el rango es $8 - 2 = 6$.', 'Resta el promedio a cada dato y eleva al cuadrado.'),
    x('mas-disperso', 'El grupo modelo es **4, 5, 6**. Toca **todos** los grupos con **mayor** desviación estándar.', { casos: [{ t: '1, 5, 9', si: true }, { t: '14, 15, 16', no: 'Está igual de regado, solo que corrido.' }, { t: '0, 5, 10', si: true }, { t: '5, 5, 5', no: 'No se aparta nada del promedio.' }, { t: '40, 50, 60', si: true }], falta: 'Falta otro: mira cuánto se apartan del promedio, no qué tan grandes son.', ok: 'Importa cuánto se apartan.' },
      'Se apartan 4, 5 y 10 del promedio; 14, 15, 16 se aparta 1, igual que el modelo.', 'Compara las distancias al promedio de cada grupo.'),
    x('suma-igual', 'Un grupo tiene promedio **10** y desviación estándar **2**. ¿Cómo quedan?', { et: ['promedio, si se suma 5 a todos', 'desviación, si se suma 5', 'promedio, si se duplican', 'desviación, si se duplican'], metas: ['15', '2', '20', '4'], fichas: ['15', '2', '20', '4', '7', '10'], mira: ['Todos se corren 5.', 'Al correrse juntos no se separan.', 'Todos se duplican.', 'Las distancias también se duplican.'], trampas: { '1:7': 'Correr los datos no los separa más.' }, ok: 'Correr no separa; multiplicar sí.' },
      'Sumar corre el promedio y no cambia la desviación; duplicar duplica los dos.', 'Piensa si los datos quedan más separados entre sí.'),
    x('elige-regular', 'Dos buses tardan en promedio **30** min. Desviación: **A, 2** y **B, 9**. ¿Cuál conviene?', { et: ['llegar casi siempre a tiempo', 'jugársela por llegar en 20', 'tiempos más parejos', 'a veces tarda más de 40'], metas: ['A', 'B', 'A', 'B'], fichas: ['A', 'B', 'A', 'B', 'A', 'B'], mira: ['Busca el más regular.', 'Busca el que varía más.', 'Menor desviación.', 'Mayor desviación.'], ok: 'Menor desviación, más regular.' },
      'A es más regular; B varía tanto que a veces llega muy pronto o muy tarde.', 'La desviación dice cuánto se aparta del promedio.'),
    x('sube-varianza', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Varianza de **1**, **1**, **7** y **7**.', r: 9, c: '(9 + 9 + 9 + 9) \\div 4', e: { 3: 'Esa es la desviación estándar.', 36: 'Falta dividir entre 4.' } },
      { q: 'La varianza es **49**. ¿Cuál es la **desviación estándar**?', r: 7, c: '\\sqrt{49}', e: { 25: 'Se saca la raíz, no la mitad.' } },
      { q: 'Rango de **−4**, **3**, **11** y **8**.', r: 15, c: '11 - (-4)', e: { 7: 'El menor es −4: se le resta.' } }] },
      'Promedio 4 y cuadrados de 9: varianza 9; $\\sqrt{49} = 7$; y $11 + 4 = 15$.', 'La desviación estándar es la raíz de la varianza.'),
    sol('Halla la desviación estándar de 3, 7, 7 y 11.', ['El promedio es [[7]]', 'Los cuadrados de las desviaciones suman [[32]]', 'La varianza es [[8]]: la desviación es cerca de 2.83'], ['28', '16', '4'], '$16 + 0 + 0 + 16 = 32$ y $32 \\div 4 = 8$.', 'Resta el promedio a cada dato.'),
    err('Alguien halla la varianza de 1, 5 y 6.', ['El promedio es 4', 'Las desviaciones son $-3$, 1 y 2', 'Suman 0: la varianza es 0'], 2, ['Los cuadrados suman 14: la varianza es $14 \\div 3$', 'La varianza es 5, el rango', 'La varianza es 4, el promedio'], 'Las desviaciones siempre suman 0; por eso se elevan al cuadrado.', '¿Qué se hace con las desviaciones antes de sumarlas?'),
    opc('Los puntajes de A son 40, 50 y 60; los de B, 49, 50 y 51. Es correcto que:', ['Tienen igual promedio y A está más disperso', 'Tienen igual promedio e igual dispersión', 'A tiene mayor promedio', 'B está más disperso'], 0, 'Los dos promedian 50; los de A se apartan 10 y los de B, 1.', 'Calcula el promedio y mira cuánto se apartan.'),
  ]);

  const l2 = leccion('icf-ma-dispersion-2', 'Percentiles y cajas', guion(
    ['Percentil', 'El percentil 80 deja por debajo al 80 % de los datos.'],
    ['Cuartiles', 'Parten los datos ordenados en cuatro grupos iguales.'],
    ['La caja', 'Va del primer al tercer cuartil y guarda la mitad central.'],
    ['Comparar', 'Una caja corta es un grupo parejo.']), [
    x('arma-caja', 'Los datos, en orden, son 1, 3, 3, 5, 6, 6, 8, 9, 9, 10 y 12. Pon los tres **cortes** de su caja.', { d: [1, 3, 3, 5, 6, 6, 8, 9, 9, 10, 12], hi: 12 },
      'La mediana es 6; la mitad de abajo (1, 3, 3, 5, 6) tiene mediana 3 y la de arriba, 9.', 'Primero el dato del medio; después, el medio de cada mitad.'),
    x('lee-caja', 'Lee la caja de los puntajes de un grupo.', { q: [10, 25, 40, 55, 80], hi: 100, paso: 10, et: ['mediana', 'largo de la caja', 'rango', 'por debajo de 25'], metas: ['40', '30', '70', '25 %'], fichas: ['40', '30', '70', '25 %', '45', '50 %', '55'], mira: ['Es la línea dentro de la caja.', 'Del primer al tercer cuartil.', 'De un bigote al otro.', 'El primer cuartil deja una cuarta parte.'], trampas: { '0:45': 'No es la mitad entre los extremos: es la línea de la caja.', '3:50 %': 'La mitad queda por debajo de la mediana.' }, ok: 'Línea, caja y bigotes.' },
      'La mediana es 40; la caja mide $55 - 25 = 30$; el rango, $80 - 10 = 70$; y queda el 25 %.', 'Cada tramo de la gráfica guarda una cuarta parte de los datos.'),
    x('percentil-puesto', 'En un examen de **600** personas, Lía quedó en el percentil **85**. Mueve cuántas quedaron **por debajo**.', { n: 600, pc: 85, paso: 10 },
      'Por debajo queda el 85 % de 600: son 510 personas.', 'El percentil es el porcentaje de personas que queda por debajo.'),
    x('compara-cajas', 'A y B son los tiempos de dos equipos. ¿Cuál cumple?', { A: [10, 20, 30, 50, 70], B: [20, 35, 40, 45, 60], hi: 80, paso: 10, et: ['mayor mediana', 'mitad central más pareja', 'mayor rango', 'la cuarta parte tarda 20 o menos'], metas: ['B', 'B', 'A', 'A'], fichas: ['B', 'B', 'A', 'A', 'A', 'B'], mira: ['Compara las líneas de adentro.', 'Compara el largo de las cajas.', 'Compara de bigote a bigote.', 'Mira dónde empieza cada caja.'], ok: 'Línea, caja, bigotes y cuartil.' },
      'Las medianas son 30 y 40; las cajas, 30 y 10; los rangos, 60 y 40; y el primer cuartil de A es 20.', 'Lee los cinco números de cada gráfica y compáralos.'),
    x('dice-la-caja', 'Una caja va de **12** a **20**, con mediana **18**; bigotes en **5** y **26**. Toca **todo** lo que se puede **asegurar**.', { casos: [{ t: 'la mitad de los datos es de 18 o menos', si: true }, { t: 'el promedio es 18', no: 'La caja muestra la mediana, no el promedio.' }, { t: 'la cuarta parte está entre 20 y 26', si: true }, { t: 'hay más datos entre 12 y 18 que entre 18 y 20', no: 'Cada tramo guarda la cuarta parte: el corto está más apretado.' }, { t: 'el rango es 21', si: true }], falta: 'Falta otra que sale de los cinco números.', ok: 'Cuartas partes y extremos.' },
      'Cada tramo guarda la cuarta parte; el rango es $26 - 5 = 21$; del promedio no se sabe.', 'Un tramo largo no tiene más datos: los tiene más regados.'),
    x('sube-percentil', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'De **250** atletas, **190** tardaron más que Rut. ¿Qué **porcentaje** tardó **más**?', r: 76, c: '190 \\div 250 \\cdot 100', e: { 24: 'Ese es el resto.' } },
      { q: 'Mediana de **4**, **10**, **12**, **20**, **31** y **50**.', r: 16, c: '(12 + 20) \\div 2', e: { 12: 'Hay dos datos en el medio.', 20: 'Hay dos datos en el medio.' } },
      { q: 'Los cuartiles son **14**, **22** y **40**. ¿Cuánto mide la **caja**?', r: 26, c: '40 - 14', e: { 18: 'Se va del primero al tercero.' } }] },
      '$190 \\div 250 = 76\\%$; $\\tfrac{12 + 20}{2} = 16$; y $40 - 14 = 26$.', 'Con una cantidad par de datos, la mediana promedia los dos del medio.'),
    sol('En un colegio de 400 estudiantes, 320 tienen menos puntaje que Iván. ¿En qué percentil está?', ['Se divide $320 \\div 400 =$ [[0.8]]', 'Está en el percentil [[80]]', 'Por encima o igual quedan [[80 estudiantes]]'], ['32', '0.32', '20 estudiantes'], 'El 80 % quedó por debajo; $400 - 320 = 80$.', 'Compara los de abajo con el total.'),
    err('Alguien lee una caja con cuartiles 10, 30 y 35.', ['La mitad de los datos está entre 10 y 35', 'La mediana es 30', 'Entre 10 y 30 hay más datos que entre 30 y 35'], 2, ['Hay igual cantidad: los de 30 a 35 están más apretados', 'Entre 30 y 35 hay el doble de datos', 'Entre 10 y 30 no hay datos'], 'Cada tramo guarda la cuarta parte de los datos.', '¿Qué parte de los datos guarda cada tramo?'),
    opc('Un bebé está en el percentil 30 de peso. Esto significa que:', ['Pesa 30 libras', 'El 30 % de los bebés de su edad pesa menos que él', 'El 30 % de los bebés pesa más que él', 'Pesa el 30 % de lo normal'], 1, 'El percentil dice qué porcentaje queda por debajo.', 'Pregunta qué parte queda por debajo.'),
  ]);

  const l3 = leccion('icf-ma-dispersion-3', 'Correlación', guion(
    ['La nube', 'Cada punto es un caso con dos datos.'],
    ['Positiva o negativa', 'Suben juntas, o una sube y la otra baja.'],
    ['Qué tan fuerte', 'De −1 a 1: cerca de 0 no hay relación de línea.'],
    ['No es causa', 'Dos cosas pueden ir juntas por una tercera o por azar.']), [
    x('predice-nube', 'La nube muestra horas de práctica y puntos. Mueve la **predicción** para **6** horas según la tendencia.', { pts: [[1, 13], [1, 17], [2, 19], [3, 24], [3, 26], [4, 31], [5, 34], [5, 36]], m: 5, b: 10, x: 6, tol: 2, hx: 8, hy: 60 },
      'Por cada hora hay unos 5 puntos más: cerca de 40.', 'Imagina la línea que pasa por la mitad de la nube y alárgala.'),
    x('punto-raro', 'Toca el punto que **se sale** de la tendencia.', { pts: [[1, 18], [2, 16], [3, 13], [4, 12], [5, 4], [6, 8], [7, 6], [8, 3]], raro: 4, hx: 9, hy: 20, ok: 'Ese queda muy por debajo.' },
      'Todos bajan poco a poco; el de (5, 4) queda muy por debajo.', 'Sigue con la vista la línea de los demás puntos.'),
    x('signo-correlacion', '¿La correlación esperable es **positiva**, **negativa** o **ninguna**?', { et: ['edad del carro y su precio', 'área y precio de una casa', 'altura y letras del nombre', 'temperatura y venta de abrigos'], metas: ['negativa', 'positiva', 'ninguna', 'negativa'], fichas: ['negativa', 'positiva', 'ninguna', 'negativa', 'positiva', 'ninguna'], mira: ['Al envejecer, ¿vale más o menos?', 'Más grande, ¿más o menos cara?', '¿Tiene algo que ver una con otra?', 'Con más calor, ¿más o menos abrigos?'], ok: 'Juntas, al contrario o sin relación.' },
      'El carro viejo y el calor van al contrario; el área sube con el precio; el nombre no se relaciona.', 'Piensa qué hace la segunda cuando la primera aumenta.'),
    x('fuerza-r', '¿Qué indica cada coeficiente de correlación?', { et: ['r = 0.95', 'r = −0.9', 'r = 0.05', 'r = −0.4'], metas: ['fuerte, sube', 'fuerte, baja', 'casi nula', 'débil, baja'], fichas: ['fuerte, sube', 'fuerte, baja', 'casi nula', 'débil, baja', 'débil, sube'], mira: ['Está cerca de 1.', 'Está cerca de −1.', 'Está cerca de 0.', 'Es negativo y está lejos de −1.'], trampas: { '1:débil, baja': 'Está muy cerca de −1: es fuerte.' }, ok: 'El signo dice el sentido; la cercanía a 1 o −1, la fuerza.' },
      'Cerca de 1 o de $-1$ es fuerte; cerca de 0, casi nula; el signo da el sentido.', 'Mira por separado el signo y qué tan lejos está de 0.'),
    x('tercer-factor', 'Estas cosas van juntas sin que una cause la otra. Pon lo que **explica** las dos.', { et: ['helados y ahogados', 'zapato y lectura (niños)', 'bomberos y daños'], metas: ['el calor', 'la edad', 'el tamaño del fuego'], fichas: ['el calor', 'la edad', 'el tamaño del fuego', 'la lluvia', 'el dinero'], mira: ['¿Cuándo se come más helado y se nada más?', '¿Qué hace crecer el pie y leer mejor?', '¿Cuándo van más bomberos?'], ok: 'Una tercera cosa mueve a las dos.' },
      'El calor, la edad y el tamaño del fuego hacen subir las dos a la vez.', 'Busca algo que, al aumentar, haga aumentar las dos.'),
    x('causa-o-no', 'En una ciudad, los barrios con **más árboles** tienen **menos asma**. Toca **todo** lo que se puede decir **solo con eso**.', { casos: [{ t: 'van juntas: correlación negativa', si: true }, { t: 'los árboles curan el asma', no: 'Eso es afirmar una causa; puede haber otra.' }, { t: 'otra cosa podría explicar las dos', si: true }, { t: 'si se siembra, el asma bajará seguro', no: 'Para saberlo hace falta un experimento.' }, { t: 'haría falta un estudio para hablar de causa', si: true }], falta: 'Falta otra que no afirma una causa.', ok: 'Ir juntas no es causar.' },
      'Se ve una correlación negativa; para hablar de causa hace falta más.', 'Separa lo que se observa de lo que se supone.'),
    x('sube-nube', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'La tendencia es $y = 3x + 8$. ¿Cuánto predice para $x = 12$?', r: 44, c: '3 \\cdot 12 + 8', e: { 36: 'Falta sumar 8.' } },
      { q: 'Con **2** horas hay **14** puntos y con **7** horas, **39**, en línea. ¿Cuántos puntos **por hora**?', r: 5, c: '25 \\div 5', e: { 25: 'Esa es la subida total.' } },
      { q: 'La tendencia $y = 50 - 4x$ predice **22**. ¿Cuánto vale $x$?', r: 7, c: '(50 - 22) \\div 4', e: { 28: 'Falta dividir entre 4.' } }] },
      '$36 + 8 = 44$; $25 \\div 5 = 5$; y $28 \\div 4 = 7$.', 'Reemplaza lo que conoces en la tendencia.'),
    sol('La tendencia entre edad $x$ (años) y precio $y$ (millones) de una moto es $y = 12 - 1.5x$.', ['Cada año pierde [[1.5]] millones', 'A los 4 años valdría [[6]] millones', 'La correlación es [[negativa]]'], ['12', '10.5', 'positiva'], '$12 - 6 = 6$; al aumentar la edad baja el precio.', 'Reemplaza $x = 4$ y mira el signo.'),
    err('Un informe dice que en los países con más televisores la gente vive más.', ['La correlación es positiva', 'Puede deberse a que son países más ricos', 'Regalar televisores alargaría la vida'], 2, ['Con eso no se puede decir que los televisores alarguen la vida', 'Quitar televisores alargaría la vida', 'La correlación es negativa'], 'La riqueza explica las dos: ir juntas no es causar.', '¿Hay algo que explique las dos cosas?'),
    opc('En una nube de puntos, cuando $x$ aumenta, $y$ disminuye casi en línea recta. Un coeficiente de correlación posible es:', ['$0.97$', '$0.1$', '$-0.1$', '$-0.96$'], 3, 'Baja y casi en línea: negativo y cerca de $-1$.', 'Mira el sentido y qué tan en línea están.'),
  ]);

  return mundo('icf-ma-dispersion', 'Dispersión y Comparación', 'matematicas', [l1, l2, l3], [
    ['icf-ma-dispersion-1', 'El promedio equilibra las desviaciones.', play('balanza-promedio', 'Pon el apoyo en el promedio de todo el grupo', { rounds: [{ groups: [{ lab: '3 notas', n: 3, mean: 4 }, { lab: '1 nota', n: 1, mean: 8 }], lo: 0, hi: 10 }] }, '$(3 \\cdot 4 + 8) \\div 4 = 5$.', { hint: 'El grupo más grande pesa más en el promedio.' })],
    ['icf-ma-dispersion-1', 'Con el promedio se recupera un dato.', play('dato-faltante', 'Mueve el dato que falta hasta el promedio pedido', { rounds: [{ data: [5, 12, null, 9], mean: 8, hi: 15, step: 1 }] }, 'Los cuatro suman 32 y los que hay, 26: falta 6.', { hint: 'Multiplica el promedio por la cantidad de datos.' })],
    ['icf-ma-dispersion-1', 'La dispersión mira cuánto se apartan.', opc('El grupo de datos con menor desviación estándar es:', ['2, 8, 14', '0, 8, 16', '7, 8, 9', '5, 8, 11'], 2, 'Todos promedian 8; 7, 8, 9 se aparta menos.', 'Compara cuánto se aparta cada dato del promedio.')],
    ['icf-ma-dispersion-2', 'La mediana es el dato del medio, en orden.', play('ordena-mediana', 'Ordena los datos y encuentra la mediana', { rounds: [{ data: [9, 4, 15, 7, 12] }] }, 'En orden: 4, 7, 9, 12, 15. La mediana es 9.', { hint: 'Ordena de menor a mayor antes de buscar el medio.' })],
    ['icf-ma-dispersion-2', 'Cada medida de centro responde otra pregunta.', play('tres-centros', 'Ubica el promedio, la mediana y la moda', { rounds: [{ data: [1, 3, 3, 4, 9], lo: 0, hi: 10 }] }, 'Promedio 4, mediana 3 y moda 3.', { hint: 'El dato grande corre el promedio, no la mediana.' })],
    ['icf-ma-dispersion-2', 'La caja guarda la mitad central.', opc('En una caja, el primer cuartil es 20 y el tercero, 50. Se puede asegurar que:', ['El promedio es 35', 'La mitad de los datos está entre 20 y 50', 'La mediana es 35', 'Ningún dato pasa de 50'], 1, 'Entre el primer y el tercer cuartil está la mitad de los datos.', 'Cada cuartil separa una cuarta parte.')],
    ['icf-ma-dispersion-3', 'La tendencia es una línea: pendiente y arranque.', play('laser-recta', 'Ajusta la línea de tendencia para que pase por **los dos puntos**', { rounds: [{ P: [-1, 4], Q: [3, -4] }] }, 'Baja 8 en 4: pendiente $-2$; en cero vale 2.', { hint: 'Cuenta cuánto baja de un punto al otro y cuánto avanza.' })],
    ['icf-ma-dispersion-3', 'Un porcentaje cambia en puntos o en proporción.', play('puntos-o-porciento', 'Fija el cambio en **porcentaje** de la tasa', { rounds: [{ what: 'El asma en el barrio', from: 40, to: 50 }] }, 'Subió 10 puntos, que son el 25 % de 40.', { hint: 'Compara la diferencia con el valor de antes.' })],
    ['icf-ma-dispersion-3', 'Ir juntas no es causar.', opc('En un colegio, quienes desayunan tienen mejores notas. Con solo este dato se puede concluir que:', ['Desayunar mejora las notas', 'Las buenas notas dan hambre', 'Quien no desayuna pierde el año', 'Desayuno y notas están relacionados, pero no se sabe la causa'], 3, 'Es una correlación; otra cosa puede explicar las dos.', 'Pregunta si hubo un experimento.')],
  ]);
})());
