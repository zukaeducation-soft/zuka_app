// Preicfes · Lectura Crítica, mundo 5 «Textos Filosóficos» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-filosofico-1', [
  ['Una pregunta distinta',
    xpMira('hoja', 'Empecemos por la idea: una pregunta **filosófica** no se cierra con más datos.', { letras: ['A', 'B', 'C', 'D'], paras: [['¿Cuánto mide esta mesa?'], ['¿Qué hace que algo sea una mesa?'], ['¿Quién ganó el partido?'], ['¿Qué es ganar justamente?']] }, [
      ['Esta se contesta con un metro.', { luz: [0], nota: { 0: 'con datos' } }],
      ['Esta no: hay que pensar qué entendemos por mesa.', { luz: [1], nota: { 1: 'filosófica' } }],
      ['Esta se contesta mirando el marcador.', { luz: [2], nota: { 2: 'con datos' } }],
      ['Esta pregunta qué significa una idea.', { luz: [3], nota: { 3: 'filosófica' } }],
      ['La prueba: ¿un dato nuevo cerraría la discusión?', { luz: [1, 3] }],
    ], 'Si un dato la cierra, no es filosófica.'),
    xpHaz('hoja', 'Subraya la pregunta **filosófica**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['¿Cuántos años vive un perro?'], ['¿Dónde se inventó el ajedrez?'], ['¿Tienen derechos los animales?']], pista: 'Busca la que no se cierra averiguando un dato.' }, 'Hay que pensar qué es un derecho y quién lo tiene.')],
  ['Probar y objetar',
    xpMira('hoja', 'Segunda idea: el filósofo **prueba** una respuesta y le **busca problemas**.', { paras: [['¿Qué es un amigo?'], ['Alguien que siempre está de acuerdo conmigo.'], ['Pero entonces un adulador sería el mejor amigo.'], ['Un amigo es quien quiere mi bien, aunque me contradiga.']] }, [
      ['Primero, se hace la pregunta.', { luz: [0], nota: { 0: 'pregunta' } }],
      ['Después, una respuesta que suena bien.', { luz: [1], nota: { 1: 'se prueba' } }],
      ['Y un caso que la pone en problemas.', { luz: [2], nota: { 2: 'objeción' } }],
      ['Por eso la cambia por una mejor.', { luz: [3], tacha: [1], nota: { 3: 'nueva respuesta' } }],
      ['Lo que se descarta no es lo que el autor defiende.', { luz: [1], tacha: [1] }],
    ], 'Pregunta, intento, objeción y nueva respuesta.'),
    xpHaz('hoja', 'Pon al margen el papel de cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['objeción', 'lo que defiende', 'se prueba'], meta: [2, 0, 1], paras: [['Ser valiente sería no sentir miedo.'], ['Pero quien no conoce el peligro no es valiente: es imprudente.'], ['Ser valiente es actuar bien a pesar del miedo.']], pista: 'Alguna no va ahí: busca «sería», «pero» y la que queda al final.' }, 'Se prueba, se objeta y se defiende otra.')],
  ['Imaginar para pensar',
    xpMira('hoja', 'Tercera idea: un **experimento mental** imagina un caso para probar una idea.', { paras: [['Idea: ser feliz es sentir placer.'], ['Supongamos una máquina que da placer para siempre.'], ['Habría que vivir conectado, sin amigos ni proyectos.'], ['¿Aceptarías? Si no, la felicidad es más que placer.']] }, [
      ['Esta es la idea que se quiere probar.', { luz: [0], nota: { 0: 'idea' } }],
      ['«Supongamos» abre un caso imaginado.', { luz: [1], nota: { 1: 'caso imaginado' } }],
      ['El caso se lleva hasta el final.', { luz: [2] }],
      ['Y se pregunta si aceptamos el resultado.', { luz: [3], nota: { 3: 'prueba' } }],
      ['No importa si la máquina existe: prueba la idea.', { luz: [1] }],
    ], '«Supongamos que…»: un caso para poner a prueba una idea.'),
    xpHaz('hoja', '«Supongamos que un anillo te hace invisible. ¿Seguirías siendo honesto?». Subraya para qué sirve el caso.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Para pensar si somos honestos solo porque nos ven.'], ['Para probar que hay anillos mágicos.'], ['Para contar un cuento de fantasía.']], pista: 'Pregunta qué idea se pone a prueba.' }, 'Prueba si la honestidad depende de que nos vean.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Dicen que toda ley es justa. Pero hubo leyes que permitían esclavos. Sostengo que la justicia es la medida de la ley». Subraya lo que **defiende** el autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Que toda ley es justa.'], ['Que hubo esclavitud.'], ['Que las leyes se juzgan según la justicia.']], pista: 'Busca lo que viene después de «sostengo».' }, 'La primera se descarta, la segunda es el ejemplo y la tercera es la tesis.')],
], 'Reconoce la pregunta, sigue los intentos y encuentra lo que queda en pie.');

xpLec('icf-lc-filosofico-2', [
  ['Definir y distinguir',
    xpMira('hoja', 'Empecemos por la idea: el autor le pone **nombre** a una idea y la **separa** de otra.', { paras: [['Llamaré «información» a un dato suelto.'], ['Llamaré «saber» a un dato que sé usar.'], ['Tener mil datos no es saber.']] }, [
      ['«Llamaré» anuncia una definición.', { luz: [0], nota: { 0: 'definición' } }],
      ['Y otra: son dos ideas distintas.', { luz: [1], nota: { 1: 'definición' } }],
      ['La diferencia: una se usa y la otra no.', { luz: [0, 1] }],
      ['Con la distinción saca una consecuencia.', { luz: [2], nota: { 2: 'consecuencia' } }],
      ['Usa sus palabras como él las definió, no como siempre.', {}],
    ], 'Busca «llamaré», «entiendo por» y qué separa una idea de otra.'),
    xpHaz('hoja', 'Según esas definiciones, subraya un caso de **saber**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Recitar la fórmula sin entenderla'], ['Usar la fórmula para arreglar una bomba'], ['Guardar la fórmula en el celular']], pista: 'Saber, aquí, es poder usar el dato.' }, 'Usarla para algo es saber; tenerla, información.')],
  ['Ejemplo y analogía',
    xpMira('hoja', 'Segunda idea: un **ejemplo** es un caso; una **analogía** compara con otra cosa.', { paras: [['La costumbre nos vuelve ciegos.'], ['Por ejemplo, ya no oigo el tren que pasa por mi casa.'], ['Es como unas gafas: terminas por no verlas.']] }, [
      ['Esta es la idea general.', { luz: [0], nota: { 0: 'idea' } }],
      ['El tren es un caso de esa idea: ejemplo.', { luz: [1], nota: { 1: 'ejemplo' } }],
      ['Las gafas no son una costumbre: se comparan.', { luz: [2], nota: { 2: 'analogía' } }],
      ['El ejemplo muestra; la analogía ayuda a imaginar.', { luz: [1, 2] }],
      ['Pregunta en qué se parecen las dos cosas.', { luz: [0, 2] }],
    ], 'Ejemplo: un caso. Analogía: otra cosa que se le parece.'),
    xpHaz('hoja', 'Idea: «Una promesa nos ata». Pon al margen qué es cada oración.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['analogía', 'ejemplo'], meta: [1, 0], paras: [['Dije que iría y fui, aunque llovía.'], ['Es un nudo que uno mismo aprieta.']], pista: 'Mira cuál es un caso de prometer y cuál es otra cosa.' }, 'Ir aunque llueva es un caso; el nudo es una comparación.')],
  ['Objetar y precisar',
    xpMira('hoja', 'Tercera idea: una buena objeción **obliga a precisar**.', { paras: [['Mentir siempre está mal.'], ['Se objetará: ¿y una fiesta sorpresa?'], ['Es cierto.'], ['Preciso: está mal engañar para aprovecharse.']] }, [
      ['Esta es la primera versión: muy amplia.', { luz: [0], nota: { 0: 'primera versión' } }],
      ['La objeción trae un caso que no encaja.', { luz: [1], nota: { 1: 'objeción' } }],
      ['El autor la acepta: es honesto.', { luz: [2], nota: { 2: 'acepta' } }],
      ['Y ajusta su idea para que resista.', { luz: [3], nota: { 3: 'precisa' } }],
      ['Aceptar una objeción no es abandonar la idea.', { luz: [0, 3] }],
    ], 'Objeción, reconocimiento y una idea más precisa.'),
    xpHaz('hoja', '«Todo el que trabaja merece pago. Dirán: ¿y quien ayuda a su madre? Preciso: hablo del trabajo hecho para un desconocido». Subraya lo que cambió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Ya no cree que haya que pagar.'], ['Cree que la madre debe pagar.'], ['Redujo los casos a los que se aplica su idea.']], pista: 'Compara la idea antes y después de «preciso».' }, 'Sigue siendo su idea, pero para menos casos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un autor dice: «Respeto es tomar en serio al otro; miedo, evitarlo». Subraya el caso de **respeto**, según el autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Callar para que no se enoje'], ['Discutirle con razones lo que dijo'], ['Cruzar la calle para no verlo']], pista: 'Usa la definición del autor, no la de siempre.' }, 'Discutir con razones es tomarlo en serio; lo demás es evitarlo.')],
], 'Usa las palabras como el autor las define y sigue cómo las ajusta.');
