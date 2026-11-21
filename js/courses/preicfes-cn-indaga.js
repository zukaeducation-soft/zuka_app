// Preicfes · Ciencias Naturales · mundo 1 «Indagación Científica» (spec 2026-11-20-curso-preicfes): la competencia que más
// pregunta la prueba de ciencias: la pregunta de un experimento, sus variables, el control, los datos y qué se puede concluir.
// Estándar de diez: el experimento se lee con juegos LEC y sus datos se manejan con juegos de lienzo; un juego en movimiento y la
// zona de examen al final. Experimentos escritos para Zuka (los resultados siguen lo que pasa de verdad).
PI_MUNDOS.push((() => {
  const { leccion, mundo, sol, err, opc } = ICF;

  const FRIJOL = {
    id: 'icf-frijol', title: 'Frijoles a oscuras',
    ficha: { autor: 'Grupo de ciencias de un colegio público', fuente: 'Informe de laboratorio de grado once', fecha: 'Abril de 2026' },
    paras: [
      'Un grupo de grado once se preguntó si la cantidad de luz que recibe una planta de frijol cambia lo que crece en sus primeras dos semanas de vida.',
      'Antes de empezar escribieron su hipótesis: «Las plantas que reciben más horas de luz crecerán más altas». Les parecía evidente, porque las plantas necesitan luz para fabricar su alimento.',
      'Sembraron 40 semillas del mismo paquete en 40 vasos con la misma tierra y las repartieron en cuatro grupos de diez. Cada grupo recibió 0, 4, 8 o 12 horas diarias de luz de una lámpara, dentro de cajas que se mantuvieron a la misma temperatura. Todas recibieron 20 mililitros de agua al día. Lo único que cambiaba de un grupo a otro era la luz.',
      'A los 14 días midieron la altura de cada plántula y contaron sus hojas. Germinaron casi todas las semillas en los cuatro grupos. La altura promedio fue de 12 cm en el grupo sin luz, 10 cm con 4 horas, 8 cm con 8 horas y 7 cm con 12 horas. Las plántulas que crecieron a oscuras eran amarillas, delgadas y casi no tenían hojas; las de 12 horas eran verdes, gruesas y tenían en promedio seis hojas.',
      'El resultado contradijo la hipótesis. La profesora les explicó que una plántula a oscuras se estira buscando la luz, con la energía que tenía guardada en la semilla: es más alta, pero no más sana. El grupo concluyó que la altura no era una buena medida de lo que querían saber.',
      'Para mejorar el estudio propusieron medir también la masa de las plantas secas y repetir el experimento con otra variedad de frijol, para saber si el resultado se mantiene.',
    ],
  };

  const PENDULO = {
    id: 'icf-pendulo', title: 'El péndulo de la clase',
    ficha: { autor: 'Profesora de física', fuente: 'Bitácora de laboratorio', fecha: 'Mayo de 2026' },
    paras: [
      'En una clase de física, dos equipos se preguntaron de qué depende el tiempo que tarda un péndulo en ir y volver, lo que se llama su período. El equipo de Samuel pensaba que dependía de la masa: una pesa más pesada debería oscilar más rápido. El equipo de Lucía creía que dependía de la longitud de la cuerda.',
      'Para probar la primera idea, ataron a una cuerda de un metro pesas de 50, 100 y 200 gramos. Soltaron cada una desde el mismo ángulo pequeño y midieron con un cronómetro el tiempo de diez oscilaciones completas, para dividirlo después entre diez. El período fue de 2.0 segundos en los tres casos.',
      'Para probar la segunda, usaron siempre la pesa de 100 gramos y cambiaron la longitud: 25, 50, 100 y 200 centímetros. Los períodos fueron 1.0, 1.4, 2.0 y 2.8 segundos. Al cuadruplicar la longitud, de 25 a 100 centímetros, el período se duplicó.',
      'Samuel propuso una conclusión: «Ninguna variable importa mucho, porque el período casi no cambió». Lucía le mostró la tabla: con la masa el período no cambió nada, pero con la longitud sí, y siempre en la misma dirección: a mayor longitud, mayor período. Además, la relación no es proporcional, porque duplicar la longitud no duplica el período.',
      'La profesora agregó dos advertencias. Primero, medir diez oscilaciones y dividir reduce el error del cronómetro, que depende de los reflejos de quien lo maneja. Segundo, los resultados valen para ángulos pequeños; con oscilaciones muy amplias el período cambia un poco.',
      'Al final, los dos equipos escribieron una conclusión común: en sus mediciones, el período depende de la longitud de la cuerda y no de la masa de la pesa.',
    ],
  };

  const l1 = leccion('icf-cn-indaga-1', 'Preguntas, variables y control', [
    sc(6, 'Casi un tercio de la prueba de Ciencias es **indagación**: no pregunta un dato de memoria, sino cómo se averigua algo con un experimento.', { title: 'Cómo se averigua' }),
    sc(7, 'Todo experimento empieza con una **pregunta** y una **hipótesis**, una respuesta posible que se puede poner a prueba.', { title: 'Pregunta e hipótesis' }),
    sc(7, 'La **variable independiente** es la que el investigador cambia; la **dependiente**, la que mide para ver el efecto; las **controladas** se mantienen iguales para que no confundan el resultado.', { title: 'Tres clases de variables' }),
    sc(7, 'Ejemplo: para saber si el abono hace crecer más el pasto, se abonan unas macetas y otras no, con la misma semilla, la misma agua y la misma luz. Si se riega más a las abonadas, ya no se sabe qué causó la diferencia.', { title: 'Cambiar una sola cosa' }),
    sc(6, 'Un resultado que contradice la hipótesis no es un fracaso: es información. La hipótesis se corrige y el experimento se mejora.', { title: 'Cuando la hipótesis falla' }),
  ], [
    play('mapa-del-texto', 'Las partes del informe de laboratorio', { doc: FRIJOL, labels: ['plantea la pregunta', 'presenta la hipótesis', 'describe el procedimiento', 'presenta los resultados', 'interpreta y concluye', 'propone cómo mejorar el estudio', 'cuenta la historia del frijol'], key: [0, 1, 2, 3, 4, 5] },
      'El informe sigue el orden de una indagación: pregunta, hipótesis, procedimiento, resultados, interpretación y mejoras. Ningún párrafo cuenta la historia del frijol.',
      { hint: 'Piensa en el orden en que se hace un experimento: qué se quiere saber, qué se espera, cómo se hace, qué salió y qué significa.' }),
    play('quien-lo-dice', 'Clasifica las variables del experimento', { doc: FRIJOL, ask: 'Lleva cada cosa del experimento a la clase de variable que es.', voices: ['Variable independiente', 'Variable dependiente', 'Variable controlada'], cards: [
      ['Las horas diarias de luz', 0], ['La altura de las plántulas', 1], ['El número de hojas', 1],
      ['Los 20 mL de agua al día', 2], ['El tipo de tierra', 2], ['La temperatura de las cajas', 2],
    ] }, 'Los estudiantes cambiaron la luz (independiente), midieron la altura y las hojas (dependientes) y dejaron iguales el agua, la tierra y la temperatura (controladas).',
      { hint: 'Pregúntate de cada cosa: ¿la cambiaron a propósito, la midieron al final o la dejaron igual en todos los grupos?' }),
    play('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { doc: FRIJOL, cards: [
      ['El grupo sin luz tuvo la mayor altura promedio.', 0],
      ['Todas las plantas recibieron la misma cantidad de agua.', 0],
      ['Si el grupo sin luz hubiera recibido más agua, no se sabría qué causó su altura.', 1],
      ['Las plantas con 12 horas de luz estaban más sanas que las de cero horas.', 1],
      ['Con 16 horas de luz las plantas medirían 5 cm.', 2],
      ['La lámpara era de luz solar artificial de 100 vatios.', 2],
    ] }, 'Las dos primeras están en los párrafos 3 y 4. Que otra diferencia confundiría el resultado se deduce del párrafo 3, y que las de 12 horas estaban más sanas, de su color, su grosor y sus hojas (párrafos 4 y 5). Nada se midió con 16 horas ni se describe la lámpara.',
      { hint: 'Cuidado con extender los datos a casos que nadie midió: eso no lo dice el informe.' }),
    play('caso-nuevo', '¿Está bien diseñado el experimento?', { doc: FRIJOL, principle: 'Para saber si un factor influye, se cambia solo ese factor y todo lo demás se mantiene igual en los grupos que se comparan.', cards: [
      ['Para probar un abono, dos grupos de matas iguales reciben la misma agua y la misma luz; solo uno recibe abono.', true],
      ['Para probar si la música ayuda a memorizar, dos grupos estudian la misma lista el mismo tiempo; solo uno oye música.', true],
      ['Para probar un jabón, se lava una camisa con él en agua caliente y otra con un jabón distinto en agua fría.', false],
      ['Para probar si la sal acelera la cocción, se cocina una olla con sal en la estufa y otra sin sal en una fogata.', false],
    ] }, 'Los dos primeros cambian una sola cosa. En los dos últimos cambian dos a la vez (jabón y temperatura; sal y fuego): si hay diferencia, no se sabe a cuál de las dos se debe.',
      { hint: 'Cuenta cuántas cosas son distintas entre los grupos que se comparan: debe ser una sola.' }),
    play('lee-barras', 'Los resultados del experimento a los 14 días. ¿Cuántos centímetros más midió el grupo sin luz que el de 12 horas?', { rounds: [
      { bars: [['0 h', 12], ['4 h', 10], ['8 h', 8], ['12 h', 7]], hi: 14, step: 2, q: 'diff', a: 0, b: 3, max: 14, tstep: 1 }] },
      'Con rayas de 2 en 2 cm: el grupo sin luz llega a 12 y el de 12 horas a 7, entre 6 y 8. La diferencia es $12 - 7 = 5$ cm.',
      { hint: 'Lee la escala antes que las barras: cada raya vale 2 cm, así que algunas barras quedan entre dos rayas.' }),
    play('grafica-relacion', 'En otro experimento, un resorte se estira 3 cm al colgarle un peso de 2 N. Si estiramiento y peso son directamente proporcionales, mueve los puntos', { kind: 'directa', k: 1.5, given: [[2, 3]], xs: [4, 6, 8], tol: 0.25, xmax: 10, ymax: 14 },
      'Si es directa, el cociente se mantiene: 1.5 cm por cada newton. Con 4 N se estira 6 cm, con 6 N, 9 cm y con 8 N, 12 cm: los puntos quedan en una recta que pasa por el origen.',
      { hint: 'Halla cuánto se estira por cada newton con el punto que ya está, y úsalo para los demás.' }),
    play('balanza-argumento', '¿Qué apoya y qué debilita la hipótesis?', { doc: FRIJOL, thesis: 'Las plantas que reciben más horas de luz crecen más altas.', cards: [
      ['Sin luz, las plántulas midieron 12 cm en promedio.', 1],
      ['Con 12 horas de luz, las plántulas midieron 7 cm.', 1],
      ['En otro estudio, al cabo de dos meses, las plantas con más luz fueron las más altas.', 0],
      ['Germinaron casi todas las semillas en los cuatro grupos.', null],
    ] }, 'Los dos datos de altura debilitan la hipótesis: a más luz, menos altura en dos semanas. Un estudio más largo con el resultado contrario la apoyaría. La germinación no dice nada sobre la altura.',
      { hint: 'Un dato apoya la hipótesis si coincide con lo que ella predice; la debilita si muestra lo contrario.' }),
    play('resortera-tres', 'En la resortera, el estirón (lo que cambias) y la distancia (lo que mides) son proporcionales. Estira lo justo para la bandera', { rounds: [
      { title: 'Variable y efecto', ref: [2, 6], items: [{ target: 9 }, { target: 15 }, { target: 12 }] }] },
      'Con 2 de estirón la piedra llega a 6 m: 3 m por cada unidad de estirón. Para 9 m hacen falta 3; para 15 m, 5; y para 12 m, 4.',
      { hint: 'Calcula cuántos metros avanza la piedra por cada unidad de estirón con el tiro de muestra.' }),
    sol('Una estudiante quiere saber si la temperatura del agua cambia el tiempo que tarda en disolverse una pastilla efervescente. ¿Cómo debe organizar su experimento?',
      ['La variable que ella cambia es [[la temperatura del agua]]', 'La variable que mide es [[el tiempo de disolución]]', 'Debe mantener igual [[la cantidad de agua]] y el tipo de pastilla', 'Para confiar en el resultado, cada temperatura se prueba [[varias veces]]'],
      ['una sola vez', 'la opinión de sus compañeros', 'el color de la pastilla al final'],
      'La temperatura es la independiente y el tiempo la dependiente. Si cambiara también la cantidad de agua, no sabría qué causó la diferencia; y repetir cada prueba reduce el efecto de los errores al medir.',
      'Pregúntate qué cambia ella a propósito, qué mide con el cronómetro y qué podría confundir el resultado si no lo deja igual.'),
    err('Para saber si un fertilizante hace crecer más el maíz, un agricultor diseña este experimento.',
      ['Siembra dos parcelas iguales con la misma semilla', 'A la parcela A le pone fertilizante y a la B no', 'Riega la parcela A todos los días y la B una vez por semana', 'Al mes compara la altura de las plantas de las dos parcelas'], 2,
      ['Riega las dos parcelas con la misma cantidad y frecuencia', 'Riega la parcela B todos los días y la A una vez por semana', 'Riega más la parcela que vaya creciendo menos'],
      'El riego distinto agrega una segunda diferencia: si A crece más, no se sabría si fue el fertilizante o el agua. El agua debe ser una variable controlada, igual en las dos parcelas.',
      'Busca el paso en que las dos parcelas dejan de ser iguales en algo distinto del fertilizante.'),
    opc('Una investigadora quiere saber si la cantidad de sal en el agua afecta la germinación de semillas de rábano. Pone 20 semillas en cada uno de cuatro platos con agua que tiene 0, 1, 2 y 4 gramos de sal por litro. ¿Cuál de las siguientes condiciones debe ser igual en los cuatro platos?',
      ['La cantidad de sal del agua', 'El número de semillas que germinan', 'La temperatura y la luz que reciben', 'El tiempo que tarda cada semilla en germinar'], 2,
      'La sal es la variable que ella cambia y las semillas que germinan (y cuándo) son lo que mide. La temperatura y la luz deben ser iguales para que no confundan el resultado.',
      'Separa lo que se cambia a propósito, lo que se mide y lo que hay que dejar fijo.'),
  ]);

  const l2 = leccion('icf-cn-indaga-2', 'Datos y conclusiones', [
    sc(6, 'Una conclusión vale si los datos la respaldan. La prueba pregunta mucho: «¿cuál conclusión es válida según la tabla?».', { title: 'Lo que dicen los datos' }),
    sc(7, 'Una variable **no influye** si al cambiarla el resultado no cambia; **influye** si el resultado cambia siempre en la misma dirección.', { title: 'Influye o no influye' }),
    sc(7, 'Ejemplo: si al duplicar la carga de una bicicleta el frenado pasa de 4 a 8 metros, la relación parece **proporcional**. Si pasa de 4 a 6, aumenta, pero no es proporcional.', { title: 'Proporcional o solo creciente' }),
    sc(7, 'Repetir una medición y promediar reduce el error. Y una conclusión solo vale para las condiciones medidas: no se puede extender a lo que nadie probó.', { title: 'Errores y límites' }),
    sc(6, 'Muchos fenómenos crecen o decrecen por multiplicación: las bacterias se duplican y los medicamentos se reducen a la mitad. Se reconocen porque cada paso multiplica por lo mismo.', { title: 'Patrones que multiplican' }),
  ], [
    play('donde-buscar', '¿A qué parte de la bitácora vuelves?', { doc: PENDULO, cards: [
      ['¿Qué es el período de un péndulo?', [1]], ['¿Qué pasó al cambiar la masa?', [2]], ['¿Qué pasó al cambiar la longitud?', [3]],
      ['¿Por qué se midieron diez oscilaciones?', [5]], ['¿Cuál fue la conclusión final?', [6]],
    ] }, 'La definición está en el 1; los resultados con la masa, en el 2; con la longitud, en el 3; la razón de medir diez oscilaciones, en el 5; y la conclusión común, en el 6.',
      { hint: 'Ubica la palabra clave de cada pregunta: período, masa, longitud, diez oscilaciones, conclusión.' }),
    play('resume-parrafo', 'Cada parte en una frase', { doc: PENDULO, paras: [2, 3, 5], options: [
      'Con distintas masas y la misma cuerda, el período no cambió.',
      'Al alargar la cuerda, el período aumentó, aunque no en proporción.',
      'Medir varias oscilaciones reduce el error, y los resultados valen para ángulos pequeños.',
      'Las pesas más pesadas oscilaron más rápido.',
      'El período es proporcional a la longitud de la cuerda.',
    ], key: [0, 1, 2] },
      'El párrafo 2 muestra el mismo período con las tres masas; el 3, que el período crece con la longitud (cuadruplicarla lo duplica); el 5, las advertencias de la profesora. Las dos frases que sobran contradicen los datos.',
      { hint: 'Compara cada frase con los números del párrafo: algunas dicen lo que se esperaba, no lo que se midió.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: PENDULO, ask: 'Según la bitácora, son cuidados que se tuvieron para obtener datos confiables, EXCEPTO:', cards: [
      ['Soltar cada pesa desde el mismo ángulo', [2]], ['Medir diez oscilaciones y dividir entre diez', [2, 5]], ['Usar la misma pesa al cambiar la longitud', [3]], ['Hacer las mediciones en una cámara sin aire', null],
    ] }, 'El mismo ángulo y las diez oscilaciones están en el párrafo 2 (y se explican en el 5); usar la misma pesa, en el 3. Nadie habla de una cámara sin aire.',
      { hint: 'Busca cada cuidado en los párrafos del procedimiento; el que no encuentres es la respuesta.' }),
    play('balanza-argumento', '¿Qué apoya y qué debilita la idea de Samuel?', { doc: PENDULO, thesis: 'El período de un péndulo depende de la masa de la pesa.', cards: [
      ['Con pesas de 50, 100 y 200 g, el período fue de 2.0 s.', 1],
      ['Otro equipo halla que, con la misma cuerda y el mismo ángulo, una pesa de hierro tarda menos que una de corcho.', 0],
      ['El período pasó de 1.0 s a 2.0 s al cambiar la cuerda de 25 a 100 cm.', null],
      ['Las mediciones se hicieron con ángulos pequeños.', null],
    ] }, 'El período igual con las tres masas debilita la idea de Samuel. Un resultado distinto con dos materiales, en las mismas condiciones, la apoyaría. Los datos de la longitud y el ángulo no dicen nada sobre la masa.',
      { hint: 'Fíjate si cada dato habla de la masa: los que hablan de otra variable no pesan en esta balanza.' }),
    play('cultivo-celulas', 'Un cultivo empieza con 3 bacterias y se duplica cada generación. ¿En qué generación hay 96?', { rounds: [{ a1: 3, r: 2, target: 96 }] },
      'Cada generación multiplica por 2: 3, 6, 12, 24, 48, 96. Hay 96 bacterias en la generación 6, porque $3 \\cdot 2^5 = 96$.',
      { hint: 'Divide 96 entre 3 y busca cuántas veces hay que multiplicar por 2 para llegar a ese número.' }),
    play('media-vida', 'Un paciente recibe 400 mg de un medicamento que su cuerpo reduce a la mitad cada 6 horas. ¿Cuándo le quedan 50 mg?', { rounds: [{ A0: 400, T: 6, target: 50, thing: 'medicamento', unit: 'mg' }] },
      'Cada 6 horas queda la mitad: 400, 200, 100 y 50 mg. Son tres medias vidas: 18 horas.',
      { hint: 'Cuenta cuántas veces hay que partir 400 por la mitad para llegar a 50; cada vez son 6 horas.' }),
    play('mezcla', 'Para un experimento de densidad se necesita una solución con 20 % de alcohol. Hay 30 g de alcohol: añade el agua justa', { solute: 30, target: 20, step: 10, max: 300 },
      'Si 30 g son el 20 % de la mezcla, la mezcla completa pesa $30 \\div 0.2 = 150$ g: hay que añadir 120 g de agua. Al agregar agua, el porcentaje baja.',
      { hint: 'Piensa primero cuánto debe pesar toda la mezcla para que 30 g sean la quinta parte.' }),
    play('lirios-laguna', 'Una planta acuática cubre la laguna duplicándose cada día. Retrocede en el calendario hasta el día que te piden', { rounds: [
      { title: 'Crecimiento que se duplica', items: [{ full: 10, ask: 'half' }, { full: 8, ask: 'quarter' }] }] },
      'Si cada día hay el doble, el día anterior había la mitad: si la laguna se llena el día 10, estaba medio llena el día 9. Si se llena el 8, estaba a la cuarta parte el día 6.',
      { hint: 'No busques a mitad del calendario: piensa cuántas veces hay que dividir entre 2 para llegar a lo que te piden.' }),
    sol('Una estudiante calienta agua y registra la temperatura cada minuto: 20, 26, 32, 38 y 44 °C en los minutos 0 a 4. Si la tendencia sigue igual, ¿qué temperatura tendrá a los 7 minutos y hasta cuándo vale la predicción?',
      ['Cada minuto la temperatura sube [[6]] °C', 'A los 7 minutos: 20 °C más 7 veces lo que sube por minuto, [[62]] °C', 'La temperatura cambia de forma [[constante]] mientras se calienta', 'La predicción vale solo hasta que el agua llegue a unos [[100]] °C, donde hierve'],
      ['44', 'variable', '50'],
      'Los datos suben 6 °C por minuto, así que a los 7 minutos el agua estaría a 62 °C. La tendencia no sigue para siempre: al hervir, la temperatura deja de subir aunque se siga calentando.',
      'Halla cuánto sube por minuto restando dos datos seguidos, y piensa qué le pasa al agua cuando hierve.'),
    err('Un estudiante cuelga masas de un resorte y mide cuánto se estira: 100 g, 2 cm; 200 g, 4 cm; 300 g, 6 cm. Este es su análisis.',
      ['Cada 100 g, el resorte se estira 2 cm más', 'El estiramiento es directamente proporcional a la masa', 'Con 500 g el resorte se estirará 8 cm', 'Con 50 g se estirará 1 cm'], 2,
      ['Con 500 g el resorte se estirará 10 cm', 'Con 500 g el resorte se estirará 5 cm', 'Con 500 g el resorte ya no se estirará más'],
      'Si son proporcionales, 500 g son 5 veces 100 g: $5 \\cdot 2 = 10$ cm. El 8 sale de sumar 2 cm a los 6 que había con 300 g, como si 500 g fueran solo 100 g más.',
      'Revisa la predicción con 500 g: ¿cuántas veces cabe 100 g en 500 g?'),
    opc('Una investigadora mide el oxígeno disuelto en un río en cinco puntos, desde su nacimiento hasta la salida de una ciudad: 9, 9, 8, 5 y 3 mg/L. Los dos últimos puntos están después de una descarga de aguas residuales. La conclusión mejor respaldada por estos datos es:',
      ['Las aguas residuales son la única causa de la falta de oxígeno en todos los ríos', 'El oxígeno del río aumenta a medida que se acerca a la ciudad', 'En el nacimiento del río no hay peces', 'En este río hay menos oxígeno después de la descarga de aguas residuales'], 3,
      'Los datos muestran que el oxígeno baja a 5 y 3 mg/L justo después de la descarga. No permiten hablar de todos los ríos ni de los peces, y el oxígeno disminuye, no aumenta.',
      'Descarta las conclusiones que hablan de algo que no se midió o que van más allá de este río.'),
  ]);

  return mundo('icf-cn-indaga', 'Indagación Científica', 'ciencias', [l1, l2], [
    ['icf-cn-indaga-1', 'Dos variables son inversamente proporcionales cuando su producto se mantiene.',
      play('grafica-relacion', 'A temperatura constante, un gas ocupa 6 L con una presión de 2 atm. Si presión y volumen son inversamente proporcionales, mueve los puntos', { kind: 'inversa', k: 12, given: [[2, 6]], xs: [3, 4, 6], tol: 0.25, xmax: 8, ymax: 8 },
        'El producto presión por volumen se mantiene en 12: con 3 atm, 4 L; con 4 atm, 3 L; con 6 atm, 2 L.', { hint: 'Multiplica las coordenadas del punto dado: ese producto debe ser igual en todos los puntos.' })],
    ['icf-cn-indaga-1', 'Antes de leer una barra, mira cuánto vale cada raya de la escala.',
      play('lee-barras', 'Plantas de tomate con distintas dosis de abono: altura a las tres semanas, en cm. ¿Cuánto mide el grupo C?', { rounds: [{ bars: [['A', 18], ['B', 24], ['C', 27], ['D', 21]], hi: 30, step: 6, q: 'val', a: 2, max: 30, tstep: 1 }] },
        'Las rayas van de 6 en 6: la barra C llega a la mitad entre 24 y 30, es decir, 27 cm.', { hint: 'Calcula cuánto vale cada raya del eje y ubica la barra entre dos de ellas.' })],
    ['icf-cn-indaga-1', 'La variable dependiente es la que se mide para ver el efecto de la que se cambia.',
      opc('Un estudiante quiere saber si la cantidad de sal disuelta cambia la temperatura a la que se congela el agua. Prepara vasos con 0, 5, 10 y 15 g de sal en 100 mL de agua y los pone en el mismo congelador. La variable dependiente de su experimento es:',
        ['La cantidad de sal de cada vaso', 'La cantidad de agua de cada vaso', 'La temperatura a la que se congela el agua', 'El congelador que usa'], 2,
        'Él cambia la sal (independiente) y mide la temperatura de congelación (dependiente). El agua y el congelador son iguales en todos los vasos: son variables controladas.', 'Pregúntate qué mide el estudiante al final para saber si la sal tuvo efecto.')],
    ['icf-cn-indaga-2', 'Cuando una cantidad se reduce a la mitad cada cierto tiempo, se cuentan las mitades.',
      play('media-vida', 'Una muestra de 160 g de una sustancia radiactiva se reduce a la mitad cada 5 horas. ¿Cuándo quedan 20 g?', { rounds: [{ A0: 160, T: 5, target: 20, thing: 'sustancia', unit: 'g' }] },
        '160, 80, 40 y 20 g: tres medias vidas, 15 horas.', { hint: 'Parte 160 por la mitad hasta llegar a 20 y cuenta cuántas veces lo hiciste.' })],
    ['icf-cn-indaga-2', 'En una mezcla, el porcentaje compara una parte con el total.',
      play('mezcla', 'Hay 40 g de alcohol. Añade agua hasta que la solución tenga 25 % de alcohol', { solute: 40, target: 25, step: 10, max: 300 },
        'Si 40 g son el 25 %, la mezcla pesa 160 g: se añaden 120 g de agua.', { hint: 'El alcohol tiene que ser la cuarta parte de toda la mezcla.' })],
    ['icf-cn-indaga-2', 'Una conclusión válida describe lo que muestran los datos medidos, sin ir más allá.',
      opc('En el experimento de la sal, los vasos con 0, 5, 10 y 15 g de sal se congelaron a 0, −3, −6 y −9 °C. La conclusión que mejor se apoya en estos datos es:',
        ['La sal hace que el agua hierva a menor temperatura', 'A más sal disuelta, más baja es la temperatura a la que se congela el agua', 'Con 20 g de sal el agua ya no se congela nunca', 'La sal no tiene ningún efecto sobre el agua'], 1,
        'Cada 5 g de sal bajan 3 °C la temperatura de congelación. Nadie midió la ebullición ni 20 g de sal, y los datos sí muestran un efecto.', 'Quédate con la opción que describe la tendencia de la tabla sin hablar de lo que no se midió.')],
  ]);
})());
