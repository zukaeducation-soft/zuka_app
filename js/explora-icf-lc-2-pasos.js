// Preicfes · Lectura Crítica, mundo 2 «Cómo se Arma un Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): función de un
// fragmento, conector y voz definidos desde cero; luego el caso que despista y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-estructura-1', {
    conecta: 'icf-lc-literal-1',
    desde: [
      ['Desde cero: el texto es un equipo',
        xpMira('hoja', 'Antes de las palabras difíciles: un texto es como un equipo de fútbol. Cada **párrafo** juega en una posición distinta.', { paras: [['La cancha del barrio no tiene luz.'], ['Por eso nadie juega después de las seis.'], ['Si se ponen dos lámparas, se podría jugar de noche.']] }, [
          ['En la lección de datos del texto viste que cada párrafo tiene un oficio.', {}],
          ['Como en un equipo: uno defiende, otro arma y otro ataca.', {}],
          ['Este párrafo presenta la situación.', { luz: [0], nota: { 0: 'situación' } }],
          ['Este cuenta lo que pasa por esa situación.', { luz: [1], nota: { 1: 'consecuencia' } }],
          ['Y este propone una salida.', { luz: [2], nota: { 2: 'propuesta' } }],
          ['A ese papel de cada parte se le llama su función.', {}],
        ], 'La función de un párrafo es el papel que cumple dentro del texto.'),
        xpHaz('hoja', 'Pon al margen la función de cada párrafo.', { modo: 'margen', rotulos: ['propuesta', 'situación', 'consecuencia'], meta: [1, 2, 0], paras: [['El puesto de salud abre solo los martes.'], ['Así que muchos enfermos viajan dos horas.'], ['Abrirlo tres días evitaría esos viajes.']], pista: 'Alguno no va ahí: busca «así que» y lo que «evitaría».' }, '«Así que» trae la consecuencia y «evitaría» propone.')],
    ],
    despues: [
      ['Más difícil: función no es tema',
        xpMira('hoja', 'Un paso más: preguntar por la función **no** es preguntar de qué habla, sino **para qué está** ese fragmento.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Las motos deberían pagar menos peaje: ocupan menos vía. Mi primo, por ejemplo, paga lo mismo que un camión.'], ['Habla de un primo y un camión.'], ['Da un caso que apoya la propuesta.'], ['Concluye el texto.']] }, [
          ['Te preguntan por la oración del primo.', { luz: [0] }],
          ['La a dice de qué habla, no qué hace.', { luz: [1], tacha: [1], nota: { 1: 'solo el tema' } }],
          ['La c no sirve: va al final, pero no recoge nada.', { luz: [3], tacha: [3], nota: { 3: 'no cierra' } }],
          ['«Por ejemplo» delata su oficio: muestra un caso.', { luz: [0] }],
          ['Y ese caso apoya lo que se propone.', { luz: [2], nota: { 2: 'su función' } }],
        ], 'Función es para qué está. Se responde con un verbo: muestra, apoya, objeta, concluye.'),
        xpHaz('hoja', '«Hay que proteger a las abejas. Sin ellas, el café daría menos fruto». ¿Qué función cumple la segunda oración?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Habla del café.'], ['Da una razón para la primera.'], ['Cambia de tema.']], pista: 'Esa dice de qué habla o no mira la primera oración. Pregunta para qué está.' }, 'Responde por qué hay que protegerlas: es una razón.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el texto, la oración 3 cumple la función de…». Mira qué hace frente a lo anterior.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['(1) Muchos creen que leer en el celular no es leer. (2) Sin embargo, los mensajes y las noticias también son textos. (3) Claro, un libro pide más atención que un chat.'], ['presentar una idea que el autor comparte'], ['reconocer un límite de lo que el autor defiende'], ['dar un ejemplo de un libro'], ['concluir que los libros sobran']] }, [
        ['La pregunta: ¿qué función cumple la oración 3?', { luz: [0] }],
        ['A falla: el autor no comparte la idea del comienzo, la discute.', { luz: [1], nota: { 1: 'al revés' } }],
        ['C repite la palabra «libro», pero la oración no da un ejemplo.', { luz: [3], nota: { 3: 'misma palabra' } }],
        ['D dice algo que el texto nunca afirma.', { luz: [4], nota: { 4: 'no está' } }],
        ['«Claro» concede: el autor acepta una parte del otro lado.', { luz: [2], nota: { 2: 'concede' } }],
      ], 'La función se ve en la palabra que abre el fragmento y en su relación con lo anterior.'),
      xpHaz('hoja', '«Que el mercado abra de noche: así comprarán los que trabajan. Mi vecina sale a las siete y no alcanza». ¿Qué función cumple la última oración?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Propone abrir de noche.'], ['Muestra un caso que apoya la propuesta.'], ['Presenta una objeción.'], ['Concluye que el mercado debe cerrar.']], pista: 'Esa confunde lo que propone el texto con lo que hace esta oración. Mira si da un caso.' }, 'La vecina es un caso que apoya abrir de noche.')],
    cierre: 'Pregunta para qué está cada parte: dato, problema, propuesta, objeción o ejemplo.',
  });

  xpAmplia('icf-lc-estructura-2', {
    conecta: 'icf-lc-literal-2',
    desde: [
      ['Desde cero: qué es un conector',
        xpMira('hoja', 'Antes de las palabras difíciles: un **conector** es una palabra que une dos ideas, como una bisagra une la puerta y la pared.', { paras: [['Hizo sol', 'y', 'fuimos al río.'], ['Hizo sol,', 'pero', 'no fuimos al río.'], ['Hizo sol,', 'por eso', 'fuimos al río.']] }, [
          ['En la lección de palabras y referencias viste que «sin embargo» opone.', {}],
          ['Las tres oraciones empiezan igual: hizo sol.', { luz: [0, 3, 6] }],
          ['«Y» solo suma: pasó una cosa y otra.', { luz: [1], nota: { 0: 'suma' } }],
          ['«Pero» avisa que pasó algo inesperado.', { luz: [4], nota: { 1: 'opone' } }],
          ['«Por eso» dice que una cosa llevó a la otra.', { luz: [7], nota: { 2: 'consecuencia' } }],
          ['Cambia el conector y cambia la relación entre las ideas.', {}],
        ], 'El conector dice la relación entre dos ideas: suma, opone, causa o resultado.'),
        xpHaz('hoja', 'Pon al margen qué relación hace cada conector.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['opone', 'suma', 'resultado'], meta: [1, 0, 2], paras: [['Llegó temprano y saludó a todos.'], ['Llegó temprano, pero la puerta estaba cerrada.'], ['Llegó temprano, así que consiguió puesto.']], pista: 'Alguno no va ahí: tapa el conector y di qué pasa entre las dos ideas.' }, '«Y» suma, «pero» opone y «así que» trae el resultado.')],
    ],
    despues: [
      ['Más difícil: mismas palabras, otra relación',
        xpMira('hoja', 'Un paso más: la trampa favorita usa **las mismas palabras** del texto y les cambia la relación.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El pueblo creció porque llegó la carretera.'], ['La carretera llegó porque el pueblo creció.'], ['Llegó la carretera y, por eso, el pueblo creció.'], ['El pueblo creció, aunque llegó la carretera.']] }, [
          ['En el texto, la carretera es la causa.', { luz: [0], nota: { 0: 'causa: carretera' } }],
          ['La a usa las mismas palabras, pero voltea causa y efecto.', { luz: [1], tacha: [1], nota: { 1: 'al revés' } }],
          ['La b dice lo mismo con otro conector de la misma familia.', { luz: [2], nota: { 2: 'mismo sentido' } }],
          ['La c pone «aunque»: como si la carretera estorbara.', { luz: [3], tacha: [3], nota: { 3: 'otra relación' } }],
          ['Antes de elegir, di en voz baja qué causa qué.', {}],
        ], 'Revisa la flecha: qué causa qué y qué se opone a qué. Las palabras iguales engañan.'),
        xpHaz('hoja', 'Texto: «Bajaron las ventas, ya que subió el precio». **Tacha** las dos que cambian la relación.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Subió el precio porque bajaron las ventas.'], ['Subió el precio; por eso bajaron las ventas.'], ['Bajaron las ventas, aunque subió el precio.']], pista: 'Alguna de las tachadas dice lo mismo que el texto. Busca cuál pone el precio como causa.' }, 'Solo una deja el precio como causa de las ventas bajas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué conector completa el texto?» o «¿qué relación hay entre las dos oraciones?».', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['La tienda bajó los precios. ___, vendió menos que el mes pasado.'], ['Por lo tanto'], ['Sin embargo'], ['Es decir'], ['Por ejemplo']] }, [
        ['Lee lo que se espera: bajar precios debería subir las ventas.', { luz: [0] }],
        ['Pero vendió menos: pasó lo contrario de lo esperado.', { luz: [0], nota: { 0: 'choque' } }],
        ['A trae un resultado: diría que bajar precios hizo vender menos.', { luz: [1], nota: { 1: 'resultado' } }],
        ['C aclara y D da un caso: ninguna opone.', { luz: [3, 4], nota: { 3: 'aclara', 4: 'un caso' } }],
        ['B opone: es la que marca el choque.', { luz: [2], nota: { 2: 'opone' } }],
      ], 'Primero di qué relación hay entre las ideas; después busca el conector que la nombra.'),
      xpHaz('hoja', '«Ese año llovió muy poco. ___, la cosecha de papa fue pequeña». Subraya el conector que completa el texto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En cambio'], ['Aun así'], ['Por eso'], ['O sea']], pista: 'Ese conector opone o aclara. Aquí la segunda idea resulta de la primera.' }, 'La cosecha pequeña resulta de la poca lluvia.')],
    cierre: 'Di qué relación hay entre las ideas y escoge el conector que la nombra, sin dejarte llevar por palabras iguales.',
  });

  xpAmplia('icf-lc-estructura-3', {
    conecta: 'icf-lc-estructura-2',
    desde: [
      ['Desde cero: qué es una voz',
        xpMira('hoja', 'Antes de las palabras difíciles: la **voz** es quien dice cada idea. No siempre es quien escribe.', { paras: [['Escribo esto desde la tienda de mi papá.'], ['Él dice: «Los clientes ya no fían».'], ['La radio informa que subió el arroz.']] }, [
          ['En la lección de conectores viste que las palabras pequeñas marcan relaciones.', {}],
          ['Ahora la pregunta es otra: ¿quién dice cada cosa?', {}],
          ['«Escribo» es la voz de quien escribe el texto.', { luz: [0], nota: { 0: 'quien escribe' } }],
          ['Las comillas traen la voz del papá, con sus palabras.', { luz: [1], nota: { 1: 'el papá' } }],
          ['«Informa que» trae la voz de la radio, contada por otro.', { luz: [2], nota: { 2: 'la radio' } }],
          ['Un texto puede tener varias voces: hay que separarlas.', {}],
        ], 'Voz: quien dice cada idea. Las comillas y verbos como «dice» o «informa» la marcan.'),
        xpHaz('hoja', 'Subraya la idea que es de **quien escribe**, no de otra voz.', { modo: 'toca', meta: [1], paras: [['El médico dice que caminar ayuda.', 'Yo creo que bailar también ayuda.', 'Mi tía asegura que el café da energía.']], pista: 'Esa idea tiene otro dueño: mira el verbo «dice» o «asegura».' }, '«Yo creo» marca la voz de quien escribe.')],
    ],
    despues: [
      ['Más difícil: para qué se cita a alguien',
        xpMira('hoja', 'Un paso más: el autor cita a alguien **para algo**: apoyarse, discutirle o mostrar otra mirada.', { paras: [['«Las bibliotecas sobran», dijo un concejal.', 'Yo pienso lo contrario.'], ['«Aquí hice mis tareas», cuenta una exalumna.', 'Por eso hay que cuidarla.']] }, [
          ['Aquí cita al concejal para discutirle.', { luz: [0, 1], nota: { 0: 'para discutirle' } }],
          ['Cuidado: la idea de que sobran no es del autor.', { luz: [0], sello: { 0: 'del concejal' } }],
          ['Aquí cita a la exalumna para apoyarse.', { luz: [2, 3], nota: { 1: 'para apoyarse' } }],
          ['La cita da un caso que sostiene lo que el autor pide.', { luz: [3] }],
          ['Pregunta siempre: ¿el autor está de acuerdo con quien cita?', {}],
        ], 'Citar no es estar de acuerdo: mira si el autor se apoya en la cita o la discute.'),
        xpHaz('hoja', '«Un vecino dijo: “El parque es peligroso”. Pero desde que hay luces, juegan ahí cien niños». ¿Para qué se cita al vecino?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Para apoyar que el parque es peligroso.'], ['Para presentar una idea que el autor discute.'], ['Para contar quién cuida el parque.']], pista: 'Mira qué viene después de «pero».' }, 'El «pero» muestra que el autor no está de acuerdo con el vecino.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Según el autor…» en un texto con varias voces. La trampa es darle al autor la idea de otro.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Para algunos padres, el celular en el colegio distrae. La rectora, en cambio, dice que bien usado ayuda a investigar. Yo creo que lo importante es enseñar a usarlo.'], ['el celular distrae'], ['el celular ayuda a investigar'], ['hay que enseñar a usar el celular'], ['hay que prohibir el celular']] }, [
        ['La pregunta: según el autor, ¿qué es lo importante?', { luz: [0] }],
        ['A es la idea de algunos padres, no del autor.', { luz: [1], nota: { 1: 'de los padres' } }],
        ['B es de la rectora: «dice que» se la da a ella.', { luz: [2], nota: { 2: 'de la rectora' } }],
        ['D no la dice nadie en el texto.', { luz: [4], nota: { 4: 'no está' } }],
        ['«Yo creo» marca la voz del autor: es la C.', { luz: [3], nota: { 3: 'del autor' } }],
      ], 'Antes de responder «según el autor», busca la marca de su voz: yo creo, pienso, considero.'),
      xpHaz('hoja', '«El entrenador asegura que el equipo está listo. Los hinchas dudan. Yo pienso que falta un buen arquero». Según el autor, ¿qué pasa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El equipo está listo.'], ['Nadie confía en el equipo.'], ['Al equipo le falta un buen arquero.'], ['El equipo va a perder la final.']], pista: 'Esa idea es de otra voz o no la dice nadie. Busca la marca «yo pienso».' }, '«Yo pienso» es la voz del autor: falta un arquero.')],
    cierre: 'Separa las voces, pregunta para qué se cita a cada una y dale al autor solo lo que él dice.',
  });
}
