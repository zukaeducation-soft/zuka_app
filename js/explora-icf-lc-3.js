// Preicfes · Lectura Crítica, mundo 3 «Tesis y Argumentos» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-argumento-1', [
  ['Tema y tesis',
    xpMira('hoja', 'Empecemos por la idea: el **tema** es de qué se habla; la **tesis**, lo que se quiere que aceptes.', { letras: ['A', 'B', 'C', 'D'], paras: [['Los perros en los parques'], ['Hay doce perros en el parque.'], ['Los perros deberían ir con correa.'], ['¿Van con correa?']] }, [
      ['Esto es un tema: no afirma nada.', { luz: [0], nota: { 0: 'tema' } }],
      ['Esto es un dato: se cuenta.', { luz: [1], nota: { 1: 'dato' } }],
      ['Esto se puede discutir: es la tesis.', { luz: [2], nota: { 2: 'tesis' } }],
      ['Y esto pregunta, no defiende.', { luz: [3], nota: { 3: 'pregunta' } }],
      ['La prueba: ¿alguien podría decir que no está de acuerdo?', { luz: [2] }],
    ], 'Tesis: una afirmación que se defiende y se puede discutir.'),
    xpHaz('hoja', 'Subraya la **tesis**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Las tareas de vacaciones'], ['Duran tres semanas.'], ['¿Quién las revisa?'], ['Las tareas de vacaciones no enseñan.']], pista: 'Esa no se puede discutir: es un tema, un dato o una pregunta.' }, 'Con esa alguien podría no estar de acuerdo.')],
  ['Razones y adornos',
    xpMira('hoja', 'Segunda idea: una **razón** responde «¿por qué?».', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Hay que cerrar esa calle los domingos.'], ['Los niños no tienen dónde jugar.'], ['Es la calle novena.'], ['En otro barrio bajaron los accidentes.']] }, [
      ['La tesis: cerrar la calle.', { luz: [0] }],
      ['¿Por qué? No hay dónde jugar.', { luz: [1], nota: { 1: 'razón' } }],
      ['El número de la calle no responde por qué.', { luz: [2], tacha: [2], nota: { 2: 'adorno' } }],
      ['¿Por qué? Porque funcionó en otra parte.', { luz: [3], nota: { 3: 'razón con prueba' } }],
      ['Une la razón y la tesis con «porque»: si suena, sirve.', {}],
    ], 'Prueba: tesis + porque + razón. Si no une, no es una razón.'),
    xpHaz('hoja', 'Tesis: «El colegio debe abrir la biblioteca el sábado». **Tacha** las dos que no son razones.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Tiene puertas azules.'], ['Muchos no tienen dónde estudiar.'], ['El sábado va después del viernes.'], ['En semana está llena.']], pista: 'Alguna de las tachadas sí responde por qué.' }, 'Las puertas y el calendario no responden por qué.')],
  ['El otro lado',
    xpMira('hoja', 'Tercera idea: un buen argumento trae **lo que dirían otros** y lo contesta.', { paras: [['Propongo huertas en los techos.'], ['Se dirá que pesan mucho.'], ['Es cierto en techos de zinc.'], ['Pero en placas de cemento resisten.']] }, [
      ['Primero, lo que se propone: la tesis.', { luz: [0], nota: { 0: 'se propone algo' } }],
      ['«Se dirá» trae la objeción.', { luz: [1], nota: { 1: 'contraargumento' } }],
      ['«Es cierto» le reconoce una parte.', { luz: [2], nota: { 2: 'concesión' } }],
      ['Y «pero» responde a la objeción.', { luz: [3], nota: { 3: 'respuesta' } }],
      ['Nombrar una objeción no es estar de acuerdo con ella.', { luz: [1] }],
    ], '«Se dirá» objeta, «es cierto» concede y «pero» responde.'),
    xpHaz('hoja', 'Pon al margen el papel de cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['respuesta', 'tesis', 'contraargumento'], meta: [1, 2, 0], paras: [['Conviene reducir el uniforme.'], ['Algunos dirán que así habrá burlas por la ropa.'], ['Sin embargo, donde se hizo no aumentaron.']], pista: 'Alguna no va ahí: busca «conviene», «dirán» y «sin embargo».' }, 'Se propone, se objeta y se responde.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«El puente está viejo. Hay que cerrarlo: tiene grietas, aunque sea bonito». Subraya la **tesis**.', { modo: 'toca', meta: [1], paras: [['El puente está viejo.', 'Hay que cerrarlo:', 'tiene grietas,', 'aunque sea bonito.']], pista: 'Esa es un dato, una razón o una concesión.' }, '«Hay que» pide algo que otros pueden discutir.')],
], 'Tema no es tesis; la razón responde por qué; y la objeción se contesta.');

xpLec('icf-lc-argumento-2', [
  ['Más firme o más débil',
    xpMira('hoja', 'Empecemos por la idea: un dato nuevo **fortalece** o **debilita** si cambia lo que crees.', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Leer de noche ayuda a dormir.'], ['Quienes leyeron se durmieron antes.'], ['Quienes leyeron también apagaron el celular.'], ['Los libros eran de pasta dura.']] }, [
      ['Arriba está la tesis que se defiende.', { luz: [0] }],
      ['Se durmieron antes: la hace más creíble.', { luz: [1], nota: { 1: 'fortalece' } }],
      ['Apagaron el celular: quizá fue eso.', { luz: [2], nota: { 2: 'debilita' } }],
      ['La pasta no cambia nada.', { luz: [3], nota: { 3: 'no pesa' } }],
      ['Pregunta: con este dato, ¿creo más, menos o igual?', {}],
    ], 'Otra causa posible es una de las maneras más fuertes de debilitar.'),
    xpHaz('hoja', 'Tesis: «El nuevo semáforo redujo los choques». Subraya el dato que la **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hubo la mitad de choques.'], ['Ese mes cerraron la avenida por obras.'], ['El semáforo tiene tres luces.']], pista: 'Ese la apoya o no pesa. Busca otra causa posible.' }, 'Con la avenida cerrada habría menos choques de todos modos.')],
  ['De pocos a todos',
    xpMira('hoja', 'Segunda idea: de **pocos casos** no se concluye sobre **todos**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Tres vecinos míos madrugan y son alegres.'], ['Esos tres madrugan y son alegres.'], ['Todo el que madruga es alegre.'], ['Madrugar da alegría.']] }, [
      ['Esto es lo que se vio.', { luz: [0] }],
      ['Esta dice justo lo visto.', { luz: [1], nota: { 1: 'alcance justo' } }],
      ['Esta salta a todos.', { luz: [2], nota: { 2: 'generaliza' } }],
      ['Esta además inventa una causa.', { luz: [3], nota: { 3: 'inventa causa' } }],
      ['Cuidado con todos, siempre, nunca y porque.', {}],
    ], 'La conclusión no puede ser más grande que la prueba.'),
    xpHaz('hoja', 'En dos colegios visitados la huerta bajó la basura. **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['La huerta baja la basura en todos los colegios.'], ['En esos dos, bajó la basura.'], ['Sin huerta, la basura siempre sube.']], pista: 'Alguna de las tachadas dice justo lo que se vio.' }, '«Todos» y «siempre» van más allá de dos colegios.')],
  ['Dato, ejemplo o imagen',
    xpMira('hoja', 'Tercera idea: no todo lo que **convence** prueba.', { paras: [['De 50 casas, 30 ahorraron agua.'], ['Mi tía ahorró agua.'], ['El agua es como la paciencia: se acaba.'], ['Un experto lo recomienda.']] }, [
      ['Un conteo prueba bastante.', { luz: [0], nota: { 0: 'dato' } }],
      ['Un caso muestra, pero es uno solo.', { luz: [1], nota: { 1: 'ejemplo' } }],
      ['Una comparación hace ver, no prueba.', { luz: [2], nota: { 2: 'imagen' } }],
      ['Una autoridad pesa si sabe de eso.', { luz: [3], nota: { 3: 'autoridad' } }],
      ['Un texto los mezcla; tú debes separarlos.', {}],
    ], 'Dato, ejemplo, imagen y autoridad no pesan lo mismo.'),
    xpHaz('hoja', 'Pon al margen con qué convence cada una.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['imagen', 'dato', 'ejemplo'], meta: [1, 2, 0], paras: [['Ocho de cada diez lo usan.'], ['En mi cuadra, don Luis lo usa.'], ['Es un paraguas para el alma.']], pista: 'Alguna no va ahí: ¿cuenta, muestra un caso o compara?' }, 'Contar, mostrar un caso y comparar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Tesis: «Los grupos pequeños aprenden más». Subraya el dato que la **fortalece**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los salones son verdes.'], ['Un grupo grande sacó la mejor nota.'], ['Con los mismos profesores, los grupos pequeños subieron más.']], pista: 'Ese no pesa o va en contra.' }, 'Con todo lo demás igual, subieron más.')],
], 'Pesa cada dato, cuida el alcance y separa lo que prueba de lo que adorna.');
