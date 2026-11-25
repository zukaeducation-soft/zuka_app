// Preicfes · Ciencias Naturales, mundo 13 «Ciencia y Sociedad» (Explora, escenas «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  xpLec('icf-cn-cts-1', [
    ['Prevenir y curar',
      xpMira('hoja', 'Empecemos por la idea: **vacuna** previene, **antibiótico** mata **bacterias**; contra virus, no.', { paras: [['Vacuna: enseña a las defensas'], ['Antibiótico: contra bacterias'], ['Antibiótico para la gripa'], ['Muchos vacunados protegen a otros']] }, [
        ['Deja memoria para reconocer al virus.', { luz: [0] }],
        ['Este solo sirve contra bacterias.', { luz: [1] }],
        ['La gripa es un virus: no sirve.', { luz: [2], tacha: [2] }],
        ['Y crea bacterias resistentes.', { luz: [1] }],
        ['Si casi todos están protegidos, no circula.', { luz: [3] }],
      ], 'Prevenir no es curar.'),
      xpHaz('hoja', 'Un niño tiene varicela, causada por un virus. Subraya lo que **no** sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Reposo y líquidos'], ['Un antibiótico contra el virus'], ['No contagiar a otros']], pista: '¿Contra qué actúa el antibiótico?' }, 'Los antibióticos no actúan contra virus.')],
    ['Comparar riesgos',
      xpMira('fichas', 'Segunda idea: los riesgos se comparan en **proporción**.', { slots: fila('con', 'sin'), fichas: ['1 %', '15 %'], alto: 96 }, [
        ['Con cinturón, 5 heridos de 500.', { pon: { 0: '1 %' } }, '$5 \\div 500$'],
        ['Sin cinturón, 3 heridos de 20.', { pon: { 1: '15 %' } }, '$3 \\div 20$'],
        ['Cinco es más que tres…', {}],
        ['…pero el riesgo fue quince veces menor.', {}, '$15 \\div 1 = 15$'],
        ['Los grupos no eran del mismo tamaño.', {}],
      ], 'Divide cada caso entre su grupo.'),
      xpHaz('fichas', 'Con vacuna enfermaron 6 de 300; sin ella, 9 de 90. Pon los dos riesgos.', { slots: fila('con', 'sin'), fichas: ['2 %', '10 %', '6 %', '9 %', '3 %'], meta: ['2 %', '10 %'], alto: 96, pista: 'Divide cada uno entre su grupo.' }, '$6 \\div 300$ y $9 \\div 90$.')],
    ['Ver por dentro',
      xpMira('hoja', 'Tercera idea: cada tecnología **ve** algo y tiene su **cuidado**.', { paras: [['Rayos X: huesos'], ['Ecografía: sonido'], ['Resonancia: imanes'], ['Rayos X: lo necesario']] }, [
        ['Atraviesan la carne y paran en el hueso.', { luz: [0] }],
        ['Sirve para ver a un bebé.', { luz: [1] }],
        ['Muestra tejidos blandos; sin metales.', { luz: [2] }],
        ['Su energía puede dañar el ADN.', { luz: [3] }],
        ['Se compara el beneficio con el riesgo.', {}],
      ], 'Beneficio frente a riesgo.'),
      xpHaz('hoja', 'Pon al margen la técnica más adecuada.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['ecografía', 'rayos X'], meta: [1, 0], paras: [['Ver si un brazo se quebró'], ['Ver el corazón de un bebé por nacer']], pista: 'Alguna no va ahí: ¿hueso o bebé?' }, 'El hueso detiene los rayos X; el sonido no daña el ADN.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Se enfermaron 40 vacunados y 30 sin vacunar». Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El color de la vacuna'], ['El nombre del médico'], ['Cuántos había en cada grupo']], pista: '¿Con qué se divide?' }, 'Sin el tamaño de los grupos no hay riesgo que comparar.')],
  ], 'Prevenir, comparar y ver por dentro.');

  xpLec('icf-cn-cts-2', [
    ['Energía',
      xpMira('hoja', 'Empecemos por la idea: toda fuente de energía tiene **ventajas** y **costos**.', { paras: [['Sol y viento: se reponen'], ['No soplan ni brillan siempre'], ['Carbón y petróleo: se acaban'], ['Todas cuestan al fabricarse']] }, [
        ['Estas fuentes son renovables.', { luz: [0], nota: { 0: 'renovables' } }],
        ['Por eso hacen falta baterías.', { luz: [1] }],
        ['Sueltan gases al quemarse.', { luz: [2], nota: { 2: 'no renovables' } }],
        ['Paneles y baterías exigen minerales.', { luz: [3] }],
        ['Se decide mirando todo el ciclo.', {}],
      ], 'Ventajas y costos de principio a fin.'),
      xpHaz('hoja', 'Subraya la **desventaja** de los paneles solares.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Se repone cada día'], ['De noche no producen'], ['No sueltan humo al funcionar']], pista: 'Las otras son ventajas.' }, 'De noche hace falta guardar energía.')],
    ['Efecto invernadero',
      xpMira('hoja', 'Segunda idea: el efecto invernadero es **necesario**; el problema es su **aumento**.', { paras: [['Entra la luz del sol'], ['La Tierra devuelve calor'], ['Los gases retienen una parte'], ['Más gases, más calor']] }, [
        ['La luz pasa y calienta el suelo.', { luz: [0] }],
        ['El suelo devuelve calor.', { luz: [1] }],
        ['Una parte no se escapa.', { luz: [2] }],
        ['Sin eso, el planeta sería helado.', { luz: [2] }],
        ['Al quemar y talar, los gases aumentan.', { luz: [3] }],
      ], 'Necesario, pero sin exceso.'),
      xpHaz('fichas', 'Un carro suelta 2 kg de CO₂ por cada 10 km. Pon los kg en 150 km y en un mes de 900 km.', { slots: fila('150 km', '900 km'), fichas: ['30', '180', '75', '300', '90'], meta: ['30', '180'], alto: 96, pista: 'Cuenta cuántos tramos de 10 km hay.' }, '$15 \\cdot 2 = 30$ y $90 \\cdot 2 = 180$.')],
    ['Residuos',
      xpMira('hoja', 'Tercera idea: primero **reducir**, después **reutilizar** y al final **reciclar**.', { paras: [['Reducir: no usar la bolsa'], ['Reutilizar: usarla otra vez'], ['Reciclar: fundirla'], ['Pilas: aparte']] }, [
        ['Lo que no se produce no contamina.', { luz: [0] }],
        ['Usar otra vez casi no gasta.', { luz: [1] }],
        ['Reciclar también gasta energía.', { luz: [2] }],
        ['Sus metales ensucian agua y suelo.', { luz: [3] }],
        ['Lo orgánico sirve de compost.', {}],
      ], 'En ese orden.'),
      xpHaz('hoja', 'Subraya la acción que es **reducir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Fundir botellas'], ['Sembrar en una lata vieja'], ['Llevar vaso propio y no pedir uno']], pista: 'Evita que el residuo aparezca.' }, 'No se produce el vaso desechable.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se quiere saber si una turbina afecta a los murciélagos. Subraya lo mejor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Contarlos antes y después, y en un lugar sin turbina'], ['Preguntar si les gustan'], ['Suponer que no']], pista: 'Mide y compara.' }, 'Comparar permite corregir.')],
  ], 'Costos, aumento y reducir primero.');

  xpLec('icf-cn-cts-3', [
    ['Testimonio y prueba',
      xpMira('hoja', 'Empecemos por la idea: un **testimonio** no es una **prueba**.', { paras: [['«A mí me sirvió»'], ['El dolor sube y baja solo'], ['Esperar mejorar ayuda: placebo'], ['Los que no mejoraron no aparecen']] }, [
        ['Un testimonio puede ser sincero.', { luz: [0] }],
        ['Pero quizá habría mejorado igual.', { luz: [1] }],
        ['O fue el efecto de esperarlo.', { luz: [2], nota: { 2: 'placebo' } }],
        ['Y solo se muestran los casos buenos.', { luz: [3] }],
        ['Por eso hace falta comparar.', {}],
      ], 'Sincero no es lo mismo que probado.'),
      xpHaz('hoja', 'Subraya la evidencia **más sólida** de que un jarabe sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Mil comentarios'], ['Lo toma una cantante'], ['Mejoró más que uno falso, al azar']], pista: 'Busca una comparación.' }, 'Hay grupo de control y azar.')],
    ['Un buen experimento',
      xpMira('hoja', 'Segunda idea: **azar**, **control** y **doble ciego** dejan **un solo** cambio.', { paras: [['Al azar: grupos parecidos'], ['Control: uno falso, igual'], ['Doble ciego: nadie sabe'], ['Lo único distinto: el remedio']] }, [
        ['Así no quedan los sanos a un lado.', { luz: [0] }],
        ['Todos creen recibir lo mismo.', { luz: [1] }],
        ['Ni el paciente ni quien mide lo sabe.', { luz: [2] }],
        ['Si hay diferencia, se sabe de qué es.', { luz: [3] }],
        ['Con pocos casos, puede ser el azar.', {}],
      ], 'Cambiar una sola cosa.'),
      xpHaz('hoja', 'Pon al margen qué regla se **incumplió**.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['control', 'azar'], meta: [1, 0], paras: [['Los jóvenes tomaron el remedio y los viejos, el falso'], ['Todos tomaron el remedio']], pista: 'Alguna no va ahí: ¿cómo se repartieron o con quién se comparó?' }, 'Se repartió por edad; y no hubo con quién comparar.')],
    ['Datos y valores',
      xpMira('hoja', 'Tercera idea: la ciencia **mide**; la sociedad **decide** con datos y valores.', { paras: [['¿Cuánto contamina?'], ['¿Se permite?'], ['¿Quién pagó el estudio?'], ['¿Lo repitieron otros?']] }, [
        ['Esta se responde midiendo.', { luz: [0], nota: { 0: 'datos' } }],
        ['Esta también mira lo que importa.', { luz: [1], nota: { 1: 'valores' } }],
        ['Si lo pagó el vendedor, con cuidado.', { luz: [2] }],
        ['Un estudio solo casi nunca basta.', { luz: [3] }],
        ['Decidir sin datos sale caro.', {}],
      ], 'Datos primero, y después valores.'),
      xpHaz('hoja', 'Subraya la pregunta que la ciencia **sola** puede responder.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Cuántos decibeles hay en la plaza?'], ['¿Debe cerrarse la discoteca?'], ['¿Es justo el cobro?']], pista: '¿Cuál basta con medir?' }, 'Los decibeles se miden; lo demás también se valora.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Con remedio mejoran 45 de 60; con placebo, 30 de 60. Pon los puntos de diferencia y cuántos de más mejoraron.', { slots: fila('puntos', 'de más'), fichas: ['25', '15', '75', '50', '45'], meta: ['25', '15'], alto: 96, pista: 'Pasa cada grupo a porcentaje.' }, '$75\\% - 50\\% = 25$ puntos y $45 - 30 = 15$.')],
  ], 'Comparar, un solo cambio y decidir.');
}
