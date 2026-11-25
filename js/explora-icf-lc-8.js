// Preicfes · Lectura Crítica, mundo 8 «Comparar Textos» (Explora, escena «hoja»). Parejas cortas propias.
xpLec('icf-lc-comparar-1', [
  ['Lo que comparten',
    xpMira('hoja', 'Empecemos por la idea: primero busca qué **comparten** dos textos.', { letras: ['1', '2', 'sí', 'no'], paras: [['Las bicicletas reducen el ruido y el humo.'], ['Mi bicicleta cruje, pero me lleva.'], ['Los dos hablan de bicicletas.'], ['Los dos hablan del humo.']] }, [
      ['El primero informa un efecto.', { luz: [0] }],
      ['El segundo cuenta algo personal.', { luz: [1] }],
      ['El tema es común.', { luz: [0, 1, 2], nota: { 2: 'vale en los dos' } }],
      ['El humo solo está en uno.', { luz: [3], tacha: [3] }],
      ['Para decir «los dos», debe estar en los dos.', {}],
    ], '«Los dos» exige encontrarlo en cada uno.'),
    xpHaz('hoja', 'T1: «Leer en voz alta une a la familia». T2: «Mi papá leía y todos callábamos». Subraya lo que vale en **los dos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Leer es obligatorio.'], ['Leer en voz alta reúne a la gente.'], ['El papá lee mal.']], pista: 'Busca la idea que puedas señalar en ambos.' }, 'Uno lo afirma y el otro lo muestra.')],
  ['Propósito y tono',
    xpMira('hoja', 'Segunda idea: el mismo tema puede tener **otro propósito** y **otro tono**.', { paras: [['«Hierva el agua cinco minutos».'], ['«Esa agua, dice mi tía, tiene más bichos que el circo».'], ['«El 30 % de los pozos no es potable».']] }, [
      ['Aquí se dan instrucciones.', { luz: [0], nota: { 0: 'instruir' } }],
      ['Aquí, en cambio, se bromea.', { luz: [1], nota: { 1: 'humor' } }],
      ['Aquí se informa con un dato.', { luz: [2], nota: { 2: 'informar' } }],
      ['Las tres hablan del agua.', { luz: [0, 1, 2] }],
      ['Pregunta qué busca cada uno en ti.', {}],
    ], 'Instruir, informar, divertir, convencer, conmover.'),
    xpHaz('hoja', 'Pon al margen el propósito de cada texto sobre un volcán.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['advertir', 'informar', 'conmover'], meta: [1, 2, 0], paras: [['Mide 5 321 metros y está activo.'], ['Abuela, tu casa quedó debajo de la ceniza.'], ['Si oye la sirena, salga de inmediato.']], pista: 'Alguna no va ahí: ¿da datos, hace sentir o avisa?' }, 'Datos, emoción y aviso.')],
  ['Cómo se relacionan',
    xpMira('hoja', 'Tercera idea: un texto puede **ejemplificar**, **ampliar**, **matizar** o **contradecir** a otro.', { letras: ['T1', 'a', 'b', 'c'], paras: [['Caminar hace bien.'], ['Doña Inés camina y ya no usa bastón.'], ['Caminar hace bien, salvo con calor extremo.'], ['Caminar no sirve para nada.']] }, [
      ['Esta es la idea del primero.', { luz: [0] }],
      ['Un caso la muestra.', { luz: [1], nota: { 1: 'ejemplifica' } }],
      ['Una condición la limita.', { luz: [2], nota: { 2: 'matiza' } }],
      ['Y esta la niega.', { luz: [3], nota: { 3: 'contradice' } }],
      ['Matizar no es contradecir: pone un límite.', { luz: [2] }],
    ], 'Ejemplifica, amplía, matiza o contradice.'),
    xpHaz('hoja', 'T1: «Las redes informan rápido». T2: «Rápido no siempre es cierto: verifique». Subraya la relación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['T2 ejemplifica a T1.'], ['T2 matiza a T1.'], ['T2 repite a T1.']], pista: '¿Niega que informen rápido o le pone un límite?' }, 'No lo niega: agrega una condición.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'T1: «El mural cubre una pared rota». T2: «Pintar no arregla grietas». Subraya lo que T2 le **objetaría** a T1.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que taparla no resuelve el daño'], ['Que los murales son feos'], ['Que no hay paredes rotas']], pista: 'Usa la idea de T2 sobre lo que cuenta T1.' }, 'Cubrir no es reparar.')],
], 'Qué comparten, qué busca cada uno y cómo se relacionan.');

xpLec('icf-lc-comparar-2', [
  ['La tesis de cada uno',
    xpMira('hoja', 'Empecemos por la idea: di en una frase **qué propone** cada uno.', { letras: ['T1', 'T2', 'mal', 'bien'], paras: [['Cierren la pista: hace ruido.'], ['No la cierren: pónganle horario.'], ['T1 habla de ruido y T2 de horas.'], ['T1 pide cerrar; T2, regular.']] }, [
      ['El primero propone cerrar.', { luz: [0], nota: { 0: 'cerrar' } }],
      ['El segundo, poner horario.', { luz: [1], nota: { 1: 'regular' } }],
      ['Esto nombra temas, no tesis.', { luz: [2], tacha: [2] }],
      ['Esto sí compara lo que proponen.', { luz: [3], nota: { 3: 'compara tesis' } }],
      ['El ruido lo reconocen los dos.', { luz: [0, 1] }],
    ], 'Tesis contra tesis, no tema contra tema.'),
    xpHaz('hoja', 'T1: «Más tareas, más disciplina». T2: «Más juego, más curiosidad». Subraya la mejor comparación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los dos hablan de niños.'], ['T1 es largo y T2 corto.'], ['T1 valora la disciplina y T2, la curiosidad.']], pista: 'Busca la que dice qué defiende cada uno.' }, 'Compara lo que cada uno pone primero.')],
  ['Cómo responde',
    xpMira('hoja', 'Segunda idea: un texto puede **conceder**, **refutar** o **atacar**.', { paras: [['«Es cierto que cuesta».'], ['«Pero ahorra en dos años».'], ['«Usted qué va a saber».'], ['«Su propio dato dice seis años».']] }, [
      ['Reconoce algo del otro.', { luz: [0], nota: { 0: 'concede' } }],
      ['Y responde con una razón.', { luz: [1], nota: { 1: 'refuta' } }],
      ['Esto habla de la persona.', { luz: [2], tacha: [2], nota: { 2: 'ataca' } }],
      ['Esto usa el dato del otro.', { luz: [3], nota: { 3: 'usa su dato' } }],
      ['Usar el dato del otro suele ser lo más fuerte.', { luz: [3] }],
    ], 'Conceder, refutar, atacar o usar su propio dato.'),
    xpHaz('hoja', 'Pon al margen qué hace cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['refuta', 'ataca', 'concede'], meta: [2, 0, 1], paras: [['Tiene razón en que es lejos.'], ['Pero el bus llega en diez minutos.'], ['Usted siempre se queja.']], pista: 'Alguna no va ahí: ¿acepta, responde o habla de la persona?' }, 'Acepta, responde y habla de la persona.')],
  ['Lo que nadie contestó',
    xpMira('hoja', 'Tercera idea: mira qué argumento **quedó sin respuesta**.', { letras: ['A1', 'A2', 'B'], paras: [['A: la obra da empleo.'], ['A: y acorta el viaje.'], ['B: el viaje se acorta solo seis años.']] }, [
      ['A dio dos razones.', { luz: [0, 1] }],
      ['B respondió la del viaje.', { luz: [2, 1], nota: { 1: 'respondida' } }],
      ['La del empleo sigue en pie.', { luz: [0], nota: { 0: 'sin respuesta' } }],
      ['Eso no prueba que A tenga razón en todo.', {}],
      ['Pero señala qué le falta a B.', { luz: [0] }],
    ], 'Pon cada razón con su respuesta: mira cuál quedó sola.'),
    xpHaz('hoja', 'A: «El perro cuida y acompaña». B: «Una alarma cuida igual». Subraya lo que B **no** respondió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que cuida'], ['Que acompaña'], ['Que ladra']], pista: 'Empareja cada razón con su respuesta.' }, 'La alarma no acompaña: esa razón quedó en pie.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'T1: «El zoológico educa: vienen mil niños». T2: «Vienen, comen helado y se van». Subraya qué hace T2.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Acepta el dato y niega lo que T1 concluye.'], ['Niega que vengan niños.'], ['Apoya la conclusión de T1.']], pista: '¿Discute que vengan o que aprendan?' }, 'Reconoce que vienen, pero no que eso eduque.')],
], 'Tesis, respuesta y lo que quedó sin contestar.');
