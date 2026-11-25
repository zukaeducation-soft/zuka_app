// Preicfes · Ciencias Naturales · mundo 13 «Ciencia y Sociedad» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const VACUNA = {
    id: 'icf-vacuna-pueblo', title: 'El brote de San Roque',
    ficha: { autor: 'Puesto de salud', fuente: 'Boletín escolar', fecha: 'Marzo de 2026' },
    paras: [
      'En San Roque hubo un brote de sarampión. La enfermedad la causa un virus, que se multiplica dentro de las células. Los antibióticos matan bacterias, así que no sirven contra él. Tomarlos por si acaso solo ayuda a que aparezcan bacterias resistentes.',
      'Una vacuna le muestra al cuerpo una parte del virus, o un virus debilitado, para que las defensas aprendan a reconocerlo. Quien se vacuna queda con células de memoria: si el virus llega después, la respuesta es rápida. La vacuna no cura a quien ya está enfermo; previene.',
      'En la escuela había 200 niños vacunados y 50 sin vacunar. Se enfermaron 4 de los vacunados y 20 de los otros. Alguien dijo: «¿Ven? También se enferman los vacunados». Es cierto, pero el riesgo fue muy distinto: 2 de cada 100 frente a 40 de cada 100.',
      'Cuando casi todos están protegidos, el virus no encuentra a quién pasar y se protegen también los que no pueden vacunarse, como los recién nacidos. A eso se le llama inmunidad de grupo. Para el sarampión, que se contagia muchísimo, hace falta que cerca del 95 % esté protegido.',
      'Ninguna medicina es perfecta. La vacuna puede dar fiebre o dolor en el brazo y, muy rara vez, una reacción grave. Antes de usarse se prueba en miles de voluntarios y después se sigue vigilando. Decidir es comparar el riesgo de usarla con el de no usarla: tampoco hacer nada es gratis.',
      'La tecnología también diagnostica. Los rayos X atraviesan la carne y se detienen en el hueso; la ecografía usa sonido; la resonancia, imanes. Cada una sirve para algo distinto y tiene su cuidado: los rayos X, por ejemplo, llevan energía que puede dañar el ADN, y por eso se usan solo lo necesario. Un buen diagnóstico ahorra remedios, tiempo y miedo, pero ninguna imagen reemplaza la conversación con quien atiende.',
    ],
  };
  const l1 = leccion('icf-cn-cts-1', 'Salud y tecnología', guion(
    ['Virus y bacterias', 'El antibiótico mata bacterias, no virus.'],
    ['Vacunas', 'Enseñan a las defensas: previenen, no curan.'],
    ['Riesgo', 'Se compara en proporción, no en cantidad.'],
    ['Tecnología', 'Rayos X, ecografía y resonancia sirven para cosas distintas.']), [
    x('riesgo-grupos', 'De **400** con casco se golpearon **8**; de **50** sin casco, **10**. Completa.', { et: ['riesgo con casco', 'riesgo sin casco', 'veces mayor sin casco', 'con casco, en 1 000'], metas: ['2 %', '20 %', '10', '20'], fichas: ['2 %', '20 %', '10', '20', '8 %', '80', '12'], mira: ['Divide 8 entre 400.', 'Divide 10 entre 50.', 'Compara los dos porcentajes.', 'Saca el 2 % de 1 000.'], trampas: { '0:8 %': 'Son 8 de 400, no de 100.', '2:12': 'Compara dividiendo, no restando otras cantidades.' }, ok: 'Proporción, no cantidad.' },
      '$8 \\div 400 = 2\\%$; $10 \\div 50 = 20\\%$; diez veces; y 20 de cada 1 000.', 'Divide cada caso entre el tamaño de su grupo.'),
    x('genero-o-cita', '¿Serviría un **antibiótico**?', { doc: VACUNA, rot: ['sí serviría', 'no serviría'],
      ...F(['Sarampión', 1, '¿La causa un virus o una bacteria?'], ['Una herida con estafilococos', 0, '¿Es un virus o una bacteria?'], ['Gripa', 1, '¿La causa un virus o una bacteria?'], ['Tuberculosis (bacilo de Koch)', 0, '¿Es un virus o una bacteria?']), bien: 'Solo contra bacterias.' },
      'Sarampión y gripa son virus; la herida y la tuberculosis, bacterias.', 'El antibiótico actúa contra un solo tipo de microbio.'),
    x('pista-tipo', 'Ata cada tecnología a lo que conviene mirar.', { doc: VACUNA, lineas: ['un hueso que pudo romperse', 'un bebé antes de nacer', 'prevenir el sarampión', 'una infección por bacterias'],
      ...T(['rayos X', 0, '¿Qué se detiene en el hueso?'], ['ecografía', 1, '¿Cuál usa sonido y no daña el ADN?'], ['vacuna', 2, '¿Cuál prepara las defensas?'], ['antibiótico', 3, '¿Cuál mata bacterias?']), bien: 'Cada una para lo suyo.' },
      'Rayos X para el hueso, sonido para el bebé, vacuna para prevenir y antibiótico para bacterias.', 'Busca cómo funciona cada una en el texto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: VACUNA, nums: [1, 2, 4], pregunta: 'Queda en pie', queda: 'Vacunarse protege también a otros.',
      ...T(['El antibiótico mata el virus del sarampión.', 2, 'Busca contra qué sirven.'], ['La vacuna cura a quien ya está enfermo.', 6, 'Busca qué hace y qué no.'], ['Para frenar el sarampión basta vacunar a la mitad.', 9, 'Busca el porcentaje.']), bien: 'Bacterias, previene y 95 %.' },
      'Los antibióticos matan bacterias, la vacuna previene y hace falta cerca del 95 %.', 'Saca la palabra clave: virus, cura, mitad.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: VACUNA, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Se enfermaron 20 de los no vacunados.', 0, 'Léela junto a los datos de la escuela.'], ['El riesgo sin vacuna fue veinte veces mayor.', 1, 'Compara 2 y 40 de cada cien.'], ['Con 80 % de vacunados, el sarampión podría seguir pasando.', 1, 'Compara con lo que hace falta.'], ['La escuela tenía doce salones.', 2, '¿Se dice cuántos salones?']),
      luz: [[3, '20 de los otros'], [3, '2 de cada 100 frente a 40 de cada 100'], [4, 'cerca del 95 %']], bien: 'Dividir y comparar.' },
      'Los 20 están escritos; las veinte veces y el 80 % se deducen; los salones no aparecen.', 'Compara entre sí los números que da el texto.'),
    x('balanza-tesis', 'Afirmación: «esta vacuna protege». ¿Qué hace cada dato?', { doc: VACUNA, tesis: 'Esta vacuna protege',
      ...F(['Enfermaron 3 de 1 000 vacunados y 60 de 1 000 sin vacunar.', 0, '¿En qué grupo hubo más riesgo?'], ['Enfermaron 50 de 1 000 en cada grupo.', 1, '¿Hubo diferencia?'], ['El frasco es de vidrio.', 2, '¿Habla de protección?']), bien: 'Comparar grupos iguales.' },
      'La diferencia la apoya; el empate la debilita; el frasco no pesa.', 'Compara el riesgo que hubo en los dos grupos.'),
    sol('De 250 personas con un remedio mejoraron 200; de 250 con un placebo, 120. ¿Cuánto más mejoró el grupo del remedio?', ['Con remedio mejoró el [[80]] %', 'Con placebo, el [[48]] %', 'La diferencia son [[32]] puntos'], ['200', '120', '128'], '$200 \\div 250 = 80\\%$ y $120 \\div 250 = 48\\%$.', 'Divide cada cantidad entre 250.'),
    err('«Se enfermaron 30 vacunados y 20 no vacunados: la vacuna empeora». Había 3 000 vacunados y 100 sin vacunar.', ['Con vacuna: 30 de 3 000, el 1 %', 'Sin vacuna: 20 de 100, el 20 %', 'Como 30 es más que 20, la vacuna empeora'], 2, ['Como 1 % es menos que 20 %, la vacuna protege', 'Como hay más vacunados, no se puede comparar', 'Como 20 es menos que 30, conviene no vacunarse'], 'Los grupos son de distinto tamaño: se comparan los porcentajes.', '¿Se comparan cantidades o proporciones?'),
    opc('A una mujer embarazada le duele el tobillo y el médico prefiere evitar los rayos X. La razón es que:', ['No muestran los huesos', 'Son un sonido muy fuerte', 'Llevan energía que puede dañar el ADN', 'Producen campos magnéticos'], 2, 'Los rayos X pueden dañar el ADN; por eso se usan lo necesario.', 'Relaciona la técnica con su cuidado.'),
  ]);

  const RECURSO = {
    id: 'icf-energia-isla', title: 'La isla que apagó su planta',
    ficha: { autor: 'Grupo de energía', fuente: 'Boletín escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una isla producía su electricidad con una planta de diésel. Cada litro quemado soltaba unos 2.7 kilogramos de dióxido de carbono, además de hollín. El combustible llegaba en barco y, si había mal tiempo, la isla se quedaba a oscuras. Los ancianos contaban que, en las noches de tormenta, el puesto de salud guardaba las vacunas en neveras con hielo.',
      'Los habitantes estudiaron otras fuentes. El sol alcanza, pero de noche no hay; el viento sopla más en la tarde y algunos días falta. Las dos son renovables y no sueltan gases mientras funcionan, aunque fabricar los paneles y las baterías sí tiene un costo ambiental: hay que sacar minerales y, al final, reciclarlos.',
      'Decidieron instalar paneles y turbinas, guardar energía en baterías y dejar el diésel para emergencias. Al primer año, el consumo de combustible bajó de 900 a 300 mil litros. En el segundo, a 180 mil. La factura bajó, pero la inversión tardará nueve años en pagarse.',
      'El dióxido de carbono y el metano dejan pasar la luz del sol y retienen parte del calor que sale de la Tierra. Es el efecto invernadero, y sin él el planeta sería helado. El problema es que hoy hay más gases de los que había y el calor retenido aumenta.',
      'También revisaron la basura. La mitad era materia orgánica, que hicieron compost. El plástico se redujo con envases que se devuelven: reducir y reutilizar ahorra más que reciclar, porque reciclar también gasta energía. Las pilas se guardan aparte: tienen metales que contaminan el agua y el suelo.',
      'Un grupo se opuso a las turbinas: temía por las aves. En vez de discutir a ciegas, contaron aves durante un año y cambiaron de lugar dos turbinas. Murieron muchas menos. La solución no fue parar ni seguir igual, fue medir y corregir. Hoy publican cada mes el conteo en la puerta de la escuela.',
    ],
  };
  const l2 = leccion('icf-cn-cts-2', 'Recursos y ambiente', guion(
    ['Fuentes de energía', 'Renovables o no; todas tienen costos.'],
    ['Efecto invernadero', 'Es necesario; el problema es que aumenta.'],
    ['Residuos', 'Reducir y reutilizar antes que reciclar.'],
    ['Medir y corregir', 'Las decisiones mejoran con datos.']), [
    x('compensa-justo', 'Una familia suelta **1 200 kg** de CO₂ al año con su moto. Cada árbol adulto absorbe **20 kg** al año. Mueve cuántos árboles la **compensan**.', { gasta: 1200, cada: 20, max: 100, et: 'árboles', u: 'kg' },
      'Lo que suelta entre lo que absorbe cada uno: $1\\,200 \\div 20 = 60$.', 'Divide lo que se suelta entre lo que absorbe cada uno.'),
    x('genero-o-cita', '¿La fuente es **renovable** o **no renovable**?', { doc: RECURSO, rot: ['renovable', 'no renovable'],
      ...F(['Viento', 0, '¿Se repone pronto?'], ['Diésel', 1, '¿Se repone pronto?'], ['Sol', 0, '¿Se repone pronto?'], ['Carbón', 1, '¿Se repone pronto?'], ['Corriente de un río', 0, '¿Se repone pronto?']), bien: 'Cada día o en millones de años.' },
      'Viento, sol y ríos se reponen; diésel y carbón tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('lee-escala', 'La gráfica muestra el diésel (en miles de litros) antes, al primer año y al segundo. Pon cada valor y cuánto **bajó** en total.', { vals: [900, 300, 180], rot: ['antes', 'año 1', 'año 2'], hi: 960, st: 120, et: ['antes', 'año 1', 'año 2', 'bajó'], ops: ['', '', ''], metas: ['900', '300', '180', '720'], fichas: ['900', '300', '180', '720', '880', '250', '1080'],
      mira: ['Está a mitad de camino entre 840 y 960.', 'Está a mitad de camino entre 240 y 360.', 'Está a mitad de camino entre 120 y 240.', 'Resta el último al primero.'], trampas: { '1:250': 'Cada línea vale 120: la mitad son 60.', '3:1080': 'Eso es la suma.' }, ok: 'De 900 a 180.' },
      'Las líneas van de 120 en 120: 900, 300 y 180. Bajó 720 mil litros.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pinta-tipos', 'Pinta cada dato con lo que muestra de la decisión.', { doc: RECURSO, plumas: ['ventaja', 'costo', 'corrección'],
      ...P(['El diésel bajó a 180 mil litros.', 0, '¿Mejora, cuesta o ajusta?'], ['La inversión tardará nueve años en pagarse.', 1, '¿Mejora, cuesta o ajusta?'], ['Cambiaron de lugar dos turbinas.', 2, '¿Mejora, cuesta o ajusta?'], ['Fabricar baterías exige sacar minerales.', 1, '¿Mejora, cuesta o ajusta?']), bien: 'Mejora, cuesta y ajusta.' },
      'Menos diésel es ventaja; pagar y sacar minerales, costos; mover turbinas, corrección.', 'Pregunta qué se gana, qué se paga y qué se arregló.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: RECURSO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Medir ayudó a cuidar las aves.',
      ...T(['Los paneles no tienen ningún costo ambiental.', 2, 'Busca qué pasa al fabricarlos.'], ['Sin efecto invernadero estaríamos mejor.', 4, 'Busca cómo sería el planeta.'], ['Reciclar es siempre lo primero que hay que hacer.', 8, 'Busca qué ahorra más.']), bien: 'Fabricar, helado y reducir.' },
      'Fabricar paneles cuesta, sin efecto invernadero sería helado y reducir ahorra más que reciclar.', 'Saca la palabra clave: ningún, sin, primero.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECURSO, filas: [{ antes: 'El diésel quedó para', topes: ['uso diario', 'vender', 'emergencias'], va: 2 }, { antes: 'Las pilas se guardan aparte porque', topes: ['pesan mucho', 'tienen metales que contaminan', 'son caras'], va: 1 }, { antes: 'De la basura, la materia orgánica era', topes: ['la mitad', 'la décima parte', 'toda'], va: 0 }], mira: ['Relee qué decidieron.', 'Relee el final del párrafo 5.', 'Relee el comienzo del párrafo 5.'], luz: [[3, 'para emergencias'], [5, 'metales que contaminan'], [5, 'La mitad era materia orgánica']], bien: 'Emergencias, metales y la mitad.' },
      'El diésel quedó para emergencias, las pilas tienen metales y la mitad era orgánica.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Propuesta: «cambiar todos los buses por eléctricos». ¿Qué hace cada dato?', { doc: RECURSO, tesis: 'Cambiar todos los buses por eléctricos',
      ...F(['La ciudad respiraría 40 % menos hollín.', 0, '¿Es una razón a favor?'], ['Su electricidad viene casi toda de quemar carbón.', 1, '¿Cuánto bajarían de verdad los gases?'], ['Los buses son azules.', 2, '¿Cambia la decisión?']), bien: 'Mirar también de dónde sale la energía.' },
      'Menos hollín la apoya; el carbón la debilita; el color no pesa.', 'Pregunta qué se gana y de dónde sale la energía.'),
    sol('La isla bajó de 900 a 300 mil litros de diésel y cada litro suelta 2.7 kg de CO₂.', ['Dejó de quemar [[600]] mil litros', 'Evitó $600 \\cdot 2.7 =$ [[1620]] mil kg', 'Son [[1620 toneladas]]'], ['300', '810', '16.2 toneladas'], '1 620 mil kilogramos son 1 620 toneladas.', 'Multiplica los litros que dejó de quemar.'),
    err('Alguien explica el calentamiento global.', ['El CO₂ deja pasar la luz del sol', 'Retiene parte del calor que sale de la Tierra', 'Por eso el efecto invernadero es un invento dañino que no debería existir'], 2, ['Por eso, si los gases aumentan, aumenta el calor retenido', 'Por eso, si los gases aumentan, la Tierra se enfría', 'Por eso, sin gases la Tierra estaría más caliente'], 'El efecto invernadero es natural y necesario; el problema es su aumento.', '¿Cómo sería el planeta sin él?'),
    opc('Una familia quiere reducir al máximo su basura plástica. Lo más efectivo es:', ['Comprar más plástico reciclable', 'Usar envases que se devuelven y comprar a granel', 'Quemar el plástico', 'Mezclarlo con lo orgánico'], 1, 'Reducir y reutilizar ahorra más que reciclar.', 'Piensa qué evita que el residuo aparezca.'),
  ]);

  const EVID = {
    id: 'icf-pulsera', title: 'La pulsera milagrosa',
    ficha: { autor: 'Club de ciencias', fuente: 'Boletín escolar', fecha: 'Mayo de 2026' },
    paras: [
      'Una página vendía una pulsera de cobre «con energía» que quitaba el dolor de rodilla. Mostraba a un deportista famoso, treinta testimonios y una frase: «probado científicamente». No decía dónde ni cómo. El club decidió revisar la afirmación. No querían burlarse de nadie: querían saber si era cierto.',
      'Un testimonio cuenta lo que le pasó a una persona. Puede ser sincero y no probar nada: el dolor sube y baja solo, y quien espera mejorar suele sentirse mejor. Eso último se llama efecto placebo. Además, la página mostraba a los que mejoraron, no a los que siguieron igual.',
      'Para saberlo hicieron un experimento con 60 voluntarios. A 30, escogidos al azar, les dieron la pulsera; a los otros 30, una idéntica de plástico pintado. Ni ellos ni quien les preguntaba por el dolor sabían cuál tenían: eso es doble ciego. Después de un mes mejoraron 17 con la de cobre y 16 con la de plástico.',
      'La diferencia es tan pequeña que puede deberse al azar. Los dos grupos mejoraron, pero por igual. El club no dijo «está demostrado que no sirve jamás»; dijo que, con ese experimento, no hay evidencia de que la pulsera funcione mejor que una falsa.',
      'En ciencia, un solo estudio casi nunca cierra un tema. Se repite, lo revisan otros expertos, se juntan muchos estudios. También importa quién paga: si lo paga quien vende el producto, hay que mirar con más cuidado. No significa que sea falso, significa que hay que pedir los datos.',
      'Decidir con evidencia no es dejar de lado los valores. La ciencia puede decir cuánto contamina una mina o cuánto protege un casco; si se permite la mina o se exige el casco lo decide la sociedad, mirando también quién gana, quién pierde y qué le importa. Pero decidir contra los datos, o sin ellos, sale caro.',
    ],
  };
  const l3 = leccion('icf-cn-cts-3', 'Decisiones con evidencia', guion(
    ['Testimonio no es prueba', 'El dolor varía solo y existe el placebo.'],
    ['Buen experimento', 'Grupos al azar, control y doble ciego.'],
    ['Más de un estudio', 'Se repite y lo revisan otros.'],
    ['Datos y valores', 'La ciencia informa; la sociedad decide.']), [
    x('solida-o-no', '¿La evidencia es **más sólida** o **más débil**?', { et: ['treinta testimonios', 'experimento con control', 'veinte estudios juntos', '«lo dijo un famoso»'], metas: ['más débil', 'más sólida', 'más sólida', 'más débil'], fichas: ['más débil', 'más sólida', 'más sólida', 'más débil', 'más débil', 'más sólida'], mira: ['¿Con qué se comparan?', '¿Se compara con otro grupo?', '¿Coinciden muchos estudios?', '¿La fama es una prueba?'], ok: 'Comparar y repetir.' },
      'Comparar con un control y juntar estudios es sólido; testimonios y fama, no.', 'Pregunta si hubo comparación y si se repitió.'),
    x('buena-evidencia', 'Se quiere probar si un té ayuda a dormir. Toca **todo** lo que hace **mejor** el experimento.', { casos: [{ t: 'repartir los grupos al azar', si: true }, { t: 'que cada quien escoja su grupo', no: 'Así los grupos quedan distintos desde el comienzo.' }, { t: 'dar al otro grupo un té parecido, falso', si: true }, { t: 'contar solo a los que mejoraron', no: 'Así se esconde a quienes siguieron igual.' }, { t: 'que nadie sepa quién toma cuál', si: true }], falta: 'Falta otra que evita que los grupos se distingan.', ok: 'Azar, control y doble ciego.' },
      'Azar, control y doble ciego dejan que solo cambie el té.', 'Busca lo que hace que los grupos sean iguales en lo demás.'),
    x('pasos-del-proceso', 'Ordena cómo el club revisó la afirmación. El primer paso está en su puesto.', { doc: EVID, que: 'la revisión', de: 'La pulsera milagrosa', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Leen la afirmación de la página.', 'Reparten a los voluntarios al azar.', 'Dan pulseras iguales, una falsa.', 'Cuentan cuántos mejoran.', 'Comparan los dos grupos.'], mira: ['', 'Va antes de dar las pulseras.', 'Va después de repartir.', 'Va después del mes.', 'Es lo último: con los dos conteos.'], bien: 'Leer, repartir, dar, contar y comparar.' },
      'Leen, reparten al azar, dan las pulseras, cuentan y comparan.', 'Pregunta qué necesitaban tener antes de cada paso.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVID, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Quien espera mejorar suele sentirse mejor.',
      ...T(['Un testimonio sincero es una prueba.', 1, 'Busca la palabra sincero.'], ['El club demostró que la pulsera no sirve jamás.', 6, 'Busca qué no dijo el club.'], ['Un solo estudio basta para cerrar un tema.', 7, 'Busca cuánto vale un solo estudio.']), bien: 'No prueba, no dijo y casi nunca.' },
      'Un testimonio puede ser sincero y no probar, el club no dijo «jamás» y un estudio casi nunca cierra un tema.', 'Saca la palabra clave: sincero, jamás, solo.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica el **doble ciego**.', { doc: EVID, nums: [3], apuesta: 'Nadie sabía cuál pulsera era cuál.', ...S(['3.2'], { '3.0': 'Dice cuántas personas participaron.', '3.1': 'Dice cómo se repartieron las pulseras.', '3.3': 'Da el resultado.' }), bien: 'Ni ellos ni quien preguntaba.' },
      'La tercera oración: ni ellos ni quien les preguntaba sabían cuál tenían.', 'Busca la oración que dice quién no sabía.'),
    x('genero-o-cita', '¿Es una pregunta para **la ciencia** (datos) o para **la sociedad** (valores)?', { doc: EVID, rot: ['la ciencia', 'la sociedad'],
      ...F(['¿Cuánto mercurio hay en el río?', 0, '¿Se responde midiendo?'], ['¿Debe permitirse la mina?', 1, '¿Se responde solo midiendo?'], ['¿Cuánto baja el casco las lesiones?', 0, '¿Se responde midiendo?'], ['¿Es justo cobrar por entrar al parque?', 1, '¿Se responde solo midiendo?']), bien: 'Medir o decidir.' },
      'El mercurio y las lesiones se miden; permitir y cobrar también dependen de valores.', 'Pregunta si bastaría con medir para responder.'),
    x('sube-evidencia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Mejoraron **33** de **50** voluntarios. ¿Qué **porcentaje** es?', r: 66, c: '33 \\div 50 \\cdot 100', e: { 34: 'Ese es el que no mejoró.' } },
      { q: 'En **5** estudios de **80** personas cada uno, mejoró el **25 %**. ¿Cuántas personas **mejoraron**?', r: 100, c: '400 \\cdot 0.25', e: { 20: 'Esas son las de un solo estudio.' } },
      { q: 'Con remedio mejoró el **70 %** y con placebo, el **42 %**. ¿Cuántos **puntos** de diferencia?', r: 28, c: '70 - 42', e: { 70: 'También mejoró el grupo del placebo.' } }] },
      '$33 \\div 50 = 66\\%$; el 25 % de 400 son 100; y $70 - 42 = 28$.', 'El efecto del remedio es lo que supera al placebo.'),
    sol('Con la pulsera de cobre mejoraron 17 de 30 y con la falsa, 16 de 30. ¿Qué se concluye?', ['La diferencia es de [[1]] persona', 'En porcentaje son unos [[3]] puntos', 'La diferencia puede deberse [[al azar]]'], ['17', '33', 'a la pulsera'], '$1 \\div 30$ es cerca del 3 %: muy poco para 60 personas.', 'Resta y compara con los 30 de cada grupo.'),
    err('Un anuncio dice que una crema «funciona» porque 8 de cada 10 clientas que la siguen comprando la recomiendan.', ['8 de cada 10 la recomiendan', 'Se preguntó solo a quienes siguieron comprándola', 'Entonces funciona para cualquier persona'], 2, ['Entonces no se sabe: faltan quienes la dejaron y un grupo de control', 'Entonces funciona para 2 de cada 10', 'Entonces no funciona para nadie'], 'Solo se oyó a quienes siguieron: la muestra está sesgada y no hay control.', '¿A quién no se le preguntó?'),
    opc('Un estudio pagado por una fábrica de gaseosas concluye que el azúcar no afecta el peso. Lo más razonable es:', ['Aceptarlo, porque es un estudio', 'Decir que es falso, porque lo pagó la fábrica', 'Creerle solo si lo dice un famoso', 'Revisar los datos y compararlo con otros estudios'], 3, 'El interés no prueba que sea falso, pero obliga a pedir los datos y comparar.', 'Evita aceptar o rechazar sin mirar.'),
  ]);

  const AGUA = {
    id: 'icf-filtro', title: 'El filtro de barro',
    paras: [
      'En la vereda El Cedro muchos niños tenían diarrea. Un análisis encontró bacterias en el agua del pozo. Un grupo propuso filtros de barro con una capa de plata, que detienen y matan bacterias.',
      'Antes de comprarlos para todos hicieron una prueba. De 100 casas, 50 escogidas al azar recibieron el filtro. A los tres meses hubo diarrea en 6 de esas casas y en 21 de las otras.',
      'También midieron el agua: antes tenía 80 colonias de bacterias por cada 100 mililitros; filtrada, 2. El filtro no quita sales ni metales, así que no sirve para un agua contaminada por una mina.',
      'Cada filtro cuesta 60 mil pesos y dura tres años si se lava cada mes. Hervir el agua también mata las bacterias, pero gasta leña, y la leña se saca del bosque que protege el pozo.',
      'La vereda decidió comprar filtros para todos y cercar el pozo, porque por ahí entraban los animales. «El filtro limpia el agua», dijo la promotora, «la cerca evita que se ensucie».',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: AGUA, ...p }, e, { hint: h });
  return mundo('icf-cn-cts', 'Ciencia y Sociedad', 'ciencias', [l1, l2, l3], [
    ['icf-cn-cts-1', 'Las bacterias del agua enferman.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuántas casas enfermaron?', [2]], ['¿Qué no quita el filtro?', [3]], ['¿Para qué la cerca?', [5]]] }, 'Las casas están en el 2, lo que no quita en el 3 y la cerca en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-cts-1', 'El riesgo se compara en proporción.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Hubo diarrea en 21 de las casas sin filtro.', 0], ['El riesgo con filtro fue del 12 %.', 1], ['Si el agua tuviera mercurio, el filtro no bastaría.', 1], ['El pozo tiene diez metros.', 2]] }, 'Las 21 están escritas; el 12 % y el mercurio se deducen; la hondura no aparece.', 'Divide y usa lo que el filtro no quita.')],
    ['icf-cn-cts-1', 'Comparar dos grupos.', opc('Hubo diarrea en 6 de 50 casas con filtro y en 21 de 50 sin filtro. El riesgo con filtro, frente al de sin filtro, fue:', ['3.5 veces menor', '15 veces menor', 'Igual', '3.5 veces mayor'], 0, '$21 \\div 6 = 3.5$, y los grupos son iguales.', 'Compara 6 de 50 con 21 de 50.')],
    ['icf-cn-cts-2', 'Evitar la contaminación es mejor que limpiarla.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Es mejor evitar un daño que arreglarlo después.', cards: [['Cercar el nacimiento de un río', true], ['Usar menos bolsas en vez de recogerlas del mar', true], ['Limpiar el derrame cuando ya ocurrió', false], ['Medir el largo de un puente', false]] }, 'Cercar y usar menos evitan; limpiar llega después y medir no tiene que ver.', 'Busca lo que actúa antes de que aparezca el daño.')],
    ['icf-cn-cts-2', 'Toda solución tiene costos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del filtro se dice todo esto, EXCEPTO:', cards: [['Lleva una capa de plata', [1]], ['No quita sales', [3]], ['Dura tres años si se lava', [4]], ['Funciona con electricidad', null]] }, 'Las tres primeras están en el 1, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-cts-2', 'Lo que pasa en un lugar afecta a otro.', opc('En una vereda, la leña se corta en el bosque que rodea el pozo. Hervir el agua con leña puede ser un problema a largo plazo porque:', ['No mata las bacterias', 'Agrega metales al agua', 'Acaba el bosque que protege el pozo', 'Enfría el agua'], 2, 'La leña se saca del bosque que protege el pozo.', 'Sigue de dónde sale la leña.')],
    ['icf-cn-cts-3', 'Grupos al azar y control.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 5], options: ['Probaron el filtro en la mitad de las casas, al azar.', 'Decidieron limpiar y también prevenir.', 'Dieron el filtro a quien lo pidió primero.', 'Decidieron no hacer nada.'], key: [0, 1] }, 'El 2 cuenta la prueba; el 5, la decisión; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-cts-3', 'Del problema a la decisión.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['plantea el problema y una salida', 'describe la prueba', 'muestra alcances y límites', 'compara costos', 'cuenta la decisión', 'enseña a nadar'], key: [0, 1, 2, 3, 4] }, 'Problema, prueba, límites, costos y decisión; nadar no aparece.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-cts-3', 'Al azar, para que los grupos sean iguales.', opc('Escoger al azar las casas que recibieron el filtro sirvió para:', ['Gastar menos', 'Que todos quedaran contentos', 'Usar menos plata', 'Que los dos grupos se parecieran en lo demás'], 3, 'Al azar, lo único distinto entre los grupos es el filtro.', 'Piensa qué pasaría si cada quien escogiera.')],
  ]);
})());
