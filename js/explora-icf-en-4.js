// Preicfes · Inglés, mundo 4 «Textos Cortos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-corto-1', [
  ['¿Quién le escribe a quién?',
    xpMira('hoja', 'Empecemos por la idea: mira el **saludo** y la **firma** antes de leer.', { paras: [['Dear Ms Gil,', 'thank you for the books.', 'Regards, Omar'], ['Hi Tina!', 'See you at six.', 'Love, Dad']] }, [
      ['«Dear Ms Gil»: se le escribe a ella, con respeto.', { luz: [0], nota: { 0: 'formal' } }],
      ['«Regards, Omar»: escribe Omar.', { luz: [2] }],
      ['«Hi Tina!» y «Love, Dad» son de familia.', { luz: [3, 5], nota: { 1: 'informal' } }],
      ['El del saludo recibe; el de la firma escribe.', { luz: [0, 2] }],
      ['Con eso ya sabes quién es «I» y quién es «you».', {}],
    ], 'Saludo: quien recibe. Firma: quien escribe.'),
    xpHaz('hoja', '«Dear Coach, I can\'t come tomorrow. Regards, Nina.» Subraya quién **no puede ir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The coach'], ['Nina'], ['Both']], pista: 'Quien firma es «I».' }, '«I» es Nina, que firma.')],
  ['¿Para qué?',
    xpMira('hoja', 'Segunda idea: un mensaje corto siempre **quiere algo**.', { paras: [['Could you bring a chair?'], ['The shop is closed today.'], ['Would you like to come?'], ['Thanks for the cake!']] }, [
      ['«Could you…?» pide un favor.', { luz: [0], nota: { 0: 'pide' } }],
      ['Decir que está cerrado es avisar.', { luz: [1], nota: { 1: 'avisa' } }],
      ['«Would you like…?» invita a alguien.', { luz: [2], nota: { 2: 'invita' } }],
      ['«Thanks for» agradece algo que ya pasó.', { luz: [3], nota: { 3: 'agradece' } }],
      ['Con el propósito claro, lo demás son detalles.', {}],
    ], 'Pide, avisa, invita o agradece.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['invita', 'avisa', 'pide'], meta: [2, 0, 1], paras: [['Can you feed the cat, please?'], ['Would you like to have dinner with us?'], ['The meeting is now at four.']], pista: 'Alguna no va ahí: busca «can you», «would you like» y un dato nuevo.' }, 'Pide, invita y avisa.')],
  ['Los datos y lo que se entiende',
    xpMira('hoja', 'Tercera idea: subraya **qué hacer y cuándo**, y une dos datos.', { paras: [['Grandma doesn\'t eat sugar.'], ['Please buy her cake', 'at the new bakery,', 'not at Luigi\'s.']] }, [
      ['Qué hay que comprar: un pastel.', { luz: [1] }],
      ['Dónde: en la panadería nueva.', { luz: [2], nota: { 1: 'dónde' } }],
      ['Y dónde no: «not at Luigi\'s».', { luz: [3] }],
      ['Une los datos: ella no come azúcar.', { luz: [0, 2] }],
      ['Se entiende que la nueva vende pastel sin azúcar.', {}],
    ], 'Qué, dónde, cuándo; y une dos datos para entender más.'),
    xpHaz('hoja', '«Wear your boots. It rained all night and we are walking to the farm.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The road is muddy.'], ['The farm is closed.'], ['They are going by car.']], pista: 'Une la lluvia, las botas y que van a pie.' }, 'Llovió, van a pie y piden botas: hay barro.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Hi Leo, the film starts at 7, not 8. Don\'t eat before: we are having pizza after. Ana». Subraya lo que Leo **debe hacer**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Eat at home'], ['Arrive at eight'], ['Arrive before seven']], pista: 'Cambió la hora y hay comida después.' }, 'La película empieza a las siete y comerán después.')],
], 'Quién, para qué, qué hacer y cuándo.');

xpLec('icf-en-corto-2', [
  ['La idea de todo el texto',
    xpMira('hoja', 'Empecemos por la idea: la **idea principal** sirve para todo el texto.', { letras: ['1', '2', '3'], paras: [['Rosa makes toys from old bottles.'], ['Children bring her the bottles on Fridays.'], ['Last year she made 300 toys.']] }, [
      ['El primer renglón presenta a Rosa y sus juguetes.', { luz: [0] }],
      ['El segundo dice de dónde salen las botellas.', { luz: [1], nota: { 1: 'detalle' } }],
      ['El tercero dice cuántos hizo.', { luz: [2], nota: { 2: 'detalle' } }],
      ['Lo común: una mujer convierte botellas en juguetes.', { luz: [0], nota: { 0: 'idea' } }],
      ['«300 toys» es cierto, pero no es la idea.', { luz: [2] }],
    ], 'La idea principal cubre todo; un detalle, solo una parte.'),
    xpHaz('hoja', '«The old cinema is a school now. Students paint where the seats were. The screen is a map.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The screen is a map.'], ['A cinema became a school.'], ['Students like painting.']], pista: 'Debe servir para las tres oraciones.' }, 'Todo el texto habla de un cine que hoy es escuela.')],
  ['Correct, wrong, doesn\'t say',
    xpMira('hoja', 'Segunda idea: **wrong** es que el texto dice lo contrario; **doesn\'t say**, que no lo menciona.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Tom has a small boat. He fishes every morning.'], ['Tom fishes every day.'], ['Tom\'s boat is big.'], ['Tom has a brother.']] }, [
      ['«Every morning» es todos los días: correcto.', { luz: [0, 1, 2], nota: { 1: 'correct' } }],
      ['Dice «small» y aquí «big»: lo contrario.', { luz: [0, 2], nota: { 2: 'wrong' } }],
      ['Del hermano no dice nada.', { luz: [3], nota: { 3: 'doesn\'t say' } }],
      ['Aunque pueda ser verdad, no está en el texto.', { luz: [3] }],
      ['Señala la oración; si no puedes, no lo dice.', {}],
    ], 'Correct: está. Wrong: dice lo contrario. Doesn\'t say: no está.'),
    xpHaz('hoja', 'Texto: «Lia works at night and sleeps in the morning. She has two cats». Pon al margen.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['doesn\'t say', 'correct', 'wrong'], meta: [2, 0, 1], paras: [['Lia works in the morning.'], ['Lia is a nurse.'], ['Lia has pets.']], pista: 'Alguna no va ahí: busca la oración que lo dice o lo niega.' }, 'De día duerme, no dice el oficio y los gatos son mascotas.')],
  ['La palabra por el contexto',
    xpMira('hoja', 'Tercera idea: si no conoces una palabra, **mira lo que la rodea**.', { paras: [['The bag was so heavy', 'that two men', 'could not lift it.'], ['She was exhausted:', 'she slept for ten hours.']] }, [
      ['¿«Heavy»? Dos hombres no pudieron con la bolsa.', { luz: [0, 1] }],
      ['Entonces «heavy» es pesada.', { luz: [0], nota: { 0: 'pesada' } }],
      ['¿«Exhausted»? Durmió diez horas.', { luz: [3, 4] }],
      ['Entonces es muy cansada.', { luz: [3], nota: { 1: 'muy cansada' } }],
      ['Cambia la palabra por la tuya y mira si suena.', {}],
    ], 'Lee antes y después: el contexto la explica.'),
    xpHaz('hoja', '«The soup was tasteless, so he added salt and lemon.» Subraya lo que significa «tasteless».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['sin sabor'], ['muy caliente'], ['deliciosa']], pista: '¿Por qué alguien agrega sal y limón?' }, 'Le agrega sal y limón porque no sabe a nada.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«They thought nobody would come, so they brought ten chairs. People sat on the floor.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Nobody came.'], ['More than ten people came.'], ['The chairs were broken.']], pista: '¿Por qué se sentarían en el piso?' }, 'Faltaron sillas: llegaron más de diez.')],
], 'La idea de todo, lo que se puede señalar y la palabra por su contexto.');
