// Preicfes · Inglés, mundo 1 «Avisos y Vocabulario» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-avisos-1', [
  ['¿Dónde está el aviso?',
    xpMira('hoja', 'Empecemos por la idea: un aviso tiene una palabra que **delata el lugar**.', { paras: [['Fasten your', 'seat belt.'], ['Do not feed the', 'animals.'], ['Try on', 'clothes', 'here.']] }, [
      ['Tres avisos sin lugar. ¿Dónde los verías?', {}],
      ['«Seat belt» es cinturón: un carro o un avión.', { luz: [1], nota: { 0: 'on a plane' } }],
      ['Y «animals» lleva a un zoológico.', { luz: [3], nota: { 1: 'at the zoo' } }],
      ['«Clothes» es ropa: una tienda para probarse.', { luz: [5], nota: { 2: 'in a shop' } }],
      ['No hace falta entender todo: basta la palabra clave.', { luz: [1, 3, 5] }],
    ], 'Busca la palabra que solo tiene sentido en un lugar.'),
    xpHaz('hoja', 'Pon al margen dónde se ve cada aviso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['in a hotel', 'at the beach', 'in a cinema'], meta: [2, 0, 1], paras: [['The film starts at 8.'], ['Leave your room key here.'], ['Do not swim after 5.']], pista: 'Alguno no va ahí: busca film, room y swim.' }, '«Film», «room» y «swim» delatan el lugar.')],
  ['¿Ordena o informa?',
    xpMira('hoja', 'Segunda idea: el verbo dice si el aviso **te pide algo** o solo **informa**.', { paras: [['You must wear a helmet.'], ['No smoking.'], ['Please wait here.'], ['The shop opens at nine.']] }, [
      ['«Must» obliga: hay que usar casco.', { luz: [0], nota: { 0: 'obliga' } }],
      ['«No» y un verbo en «-ing»: prohíbe.', { luz: [1], nota: { 1: 'prohíbe' } }],
      ['«Please» y un verbo: pide.', { luz: [2], nota: { 2: 'pide' } }],
      ['«Opens» solo cuenta a qué hora.', { luz: [3], nota: { 3: 'informa' } }],
      ['«Can» permite y «cannot» no deja.', {}],
    ], 'Must obliga, no -ing prohíbe, please pide; lo demás informa.'),
    xpHaz('hoja', 'Subraya los **dos** avisos que **prohíben**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Open until six.'], ['No parking.'], ['You can pay by card.'], ['You cannot take photos.']], pista: 'Alguno informa o permite. Busca «no -ing» o «cannot».' }, '«No parking» y «cannot» prohíben.')],
  ['Decirlo con otras palabras',
    xpMira('hoja', 'Tercera idea: la opción correcta casi nunca **repite** las palabras del aviso.', { letras: ['1', 'a', 'b', 'c'], paras: [['Children under five travel free.'], ['Children of five pay nothing.'], ['A child of three does not pay.'], ['Children cannot travel.']] }, [
      ['El aviso: los menores de cinco viajan gratis.', { luz: [0] }],
      ['La a repite «children» y «five», pero «under five» no incluye cinco.', { luz: [1], nota: { 1: 'falsa' } }],
      ['La b no repite casi nada y dice lo mismo: tres es menor que cinco.', { luz: [2], nota: { 2: 'igual' } }],
      ['La c cambia «free» por «cannot»: es otra cosa.', { luz: [3], nota: { 3: 'falsa' } }],
      ['Compara ideas, no palabras iguales.', {}],
    ], 'Desconfía de la opción que copia palabras: compara la idea.'),
    xpHaz('hoja', '«Cash only.» Subraya la opción que dice **lo mismo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['You can only buy cash.'], ['Only one person can pay.'], ['You cannot use a card.']], pista: 'Esa copia una palabra, pero cambia la idea.' }, 'Solo efectivo es lo mismo que no se puede usar tarjeta.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Keep this door closed. Baby sleeping.» Subraya dónde lo verías.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In a car park'], ['In a house'], ['In a football stadium']], pista: '¿Dónde hay una puerta y un bebé dormido?' }, '«Baby sleeping» delata el lugar.')],
], 'Palabra que delata, verbo que ordena o informa y la misma idea con otras palabras.');

xpLec('icf-en-avisos-2', [
  ['¿Persona, lugar o cosa?',
    xpMira('hoja', 'Empecemos por la idea: la descripción dice primero **qué clase** de palabra es.', { paras: [['This person', 'drives a bus.'], ['A place', 'where you see paintings.'], ['You use it', 'to cut bread.']] }, [
      ['«This person»: buscas una persona.', { luz: [0], nota: { 0: 'person' } }],
      ['Maneja un bus: «driver».', { luz: [1] }],
      ['«A place»: buscas un lugar. Pinturas: «museum».', { luz: [2, 3], nota: { 1: 'place' } }],
      ['«You use it»: buscas una cosa. Cortar pan: «knife».', { luz: [4, 5], nota: { 2: 'thing' } }],
      ['Con la clase ya descartas la mitad de las opciones.', {}],
    ], 'Primero la clase de palabra, después el significado.'),
    xpHaz('hoja', 'Pon al margen la palabra de cada descripción.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['kitchen', 'nurse', 'umbrella'], meta: [1, 2, 0], paras: [['This person helps sick people.'], ['You need it when it rains.'], ['You cook in this room.']], pista: 'Mira si pide persona, cosa o lugar.' }, '«Person», «it» y «room» ya dicen la clase.')],
  ['Las pistas del verbo',
    xpMira('hoja', 'Segunda idea: el verbo dice **cuándo** pasa algo.', { paras: [['She lived in Cali.'], ['She lives in Cali.'], ['She will live in Cali.'], ['She has lived here for years.']] }, [
      ['«Lived» termina en «-ed»: eso ya pasó.', { luz: [0], nota: { 0: 'past' } }],
      ['«Lives» está en presente: es así ahora.', { luz: [1], nota: { 1: 'present' } }],
      ['«Will live» habla del futuro: pasará.', { luz: [2], nota: { 2: 'future' } }],
      ['«Has lived… for years»: empezó antes y sigue.', { luz: [3], nota: { 3: 'until now' } }],
      ['«Ago» va con el pasado; «now», con el presente.', {}],
    ], '-ed ya pasó, will pasará, has… for sigue hasta hoy.'),
    xpHaz('hoja', 'Subraya la oración que dice que **todavía** enseña.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He taught here ten years ago.'], ['He has taught here for ten years.'], ['He will teach here in ten years.']], pista: 'Esa ya terminó o no ha empezado. Busca «has… for».' }, '«Has taught for ten years»: empezó y sigue.')],
  ['Palabras que apuntan',
    xpMira('hoja', 'Tercera idea: «he», «she», «it» y «they» **apuntan** a algo ya dicho.', { paras: [['Laura', 'gave', 'the keys', 'to', 'her brother.'], ['He', 'lost', 'them', 'that night.']] }, [
      ['«He» es un hombre: ¿quién?', { luz: [5] }],
      ['En la oración hay un hombre: su hermano, «her brother».', { luz: [4, 5], sello: { 5: 'brother' } }],
      ['«Them» son varias cosas: ¿cuáles?', { luz: [7] }],
      ['Varias cosas hay una sola vez: las llaves, «the keys».', { luz: [2, 7], sello: { 7: 'keys' } }],
      ['«It» es una sola cosa; «they» y «them», varias.', {}],
    ], 'He, she: personas. It: una cosa. They, them: varias.'),
    xpHaz('hoja', 'Subraya a qué apunta «it»: «She read it in one day».', { modo: 'toca', meta: [2], paras: [['Marta', 'took two pens', 'and a book', 'to her friends.', 'She read it in one day.']], pista: '«It» es una sola cosa y se puede leer.' }, 'Solo el libro es una cosa que se lee.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«You wear it on your head when it is sunny.» Subraya la palabra.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['sunglasses'], ['beach'], ['shoes'], ['hat']], pista: 'Debe ser una cosa y va en la cabeza, no en los ojos.' }, '«Wear it on your head»: una cosa para la cabeza.')],
], 'Clase de palabra, tiempo del verbo y a qué apunta cada pronombre.');
