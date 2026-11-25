// Preicfes · Inglés, mundo 5 «Textos Largos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-largo-1', [
  ['Primero, de qué trata',
    xpMira('hoja', 'Empecemos por la idea: no leas todo de una vez; mira **título y primeras oraciones**.', { letras: ['título', '1', '2', '3'], paras: [['The doctor who travels by canoe'], ['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']] }, [
      ['El título: una doctora que viaja en canoa.', { luz: [0] }],
      ['Párrafo 1: adónde va.', { luz: [1], nota: { 1: 'where' } }],
      ['Párrafo 2: con qué trabaja.', { luz: [2], nota: { 2: 'what with' } }],
      ['Párrafo 3: qué hizo después.', { luz: [3], nota: { 3: 'what next' } }],
      ['Ya tienes un mapa: sabes dónde buscar.', {}],
    ], 'Título y primeras oraciones: un mapa del texto.'),
    xpHaz('hoja', '«How does she talk to the villages?». Subraya dónde buscarías.', { modo: 'toca', letras: ['1', '2', '3'], meta: [2], paras: [['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']], pista: '¿Cuál habla de un aparato para comunicarse?' }, 'La radio sirve para hablar con las veredas.')],
  ['La misma idea, otras palabras',
    xpMira('hoja', 'Segunda idea: la pregunta usa **otras palabras** que el texto.', { paras: [['She used to live in Cali.'], ['In the past, her home was Cali.'], ['The bus no longer stops here.'], ['The bus doesn\'t stop here any more.']] }, [
      ['«Used to live»: antes vivía, ya no.', { luz: [0], nota: { 0: 'antes' } }],
      ['«In the past» dice lo mismo.', { luz: [1], nota: { 1: 'igual' } }],
      ['«No longer»: ya no.', { luz: [2], nota: { 2: 'ya no' } }],
      ['«Any more», con «doesn\'t», también es ya no.', { luz: [3], nota: { 3: 'igual' } }],
      ['Busca la idea, no la misma palabra.', {}],
    ], 'Used to: antes. No longer y not any more: ya no.'),
    xpHaz('hoja', '«Tim gave up coffee in May.» Subraya la que dice lo mismo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tim started to drink coffee in May.'], ['Tim stopped drinking coffee in May.'], ['Tim sold coffee in May.']], pista: '«Give up» es dejar de hacer algo.' }, '«Gave up» es dejó: «stopped».')],
  ['Detalle o idea',
    xpMira('hoja', 'Tercera idea: una opción puede ser **cierta** y no ser la **idea principal**.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Ema repairs toys. She mends forty a week and gives them to schools.'], ['Ema gives repaired toys to schools.'], ['Ema mends forty toys.'], ['Ema sells toys.']] }, [
      ['Esto cuenta el texto.', { luz: [0] }],
      ['Esta lo cubre todo: idea principal.', { luz: [0, 1], nota: { 1: 'main idea' } }],
      ['Esta es cierta, pero es una parte.', { luz: [2], nota: { 2: 'detail' } }],
      ['Esta cambia la verdad.', { luz: [3], tacha: [3], nota: { 3: 'wrong' } }],
      ['Cierta no es lo mismo que principal.', {}],
    ], 'La principal cubre todo; el detalle, una parte.'),
    xpHaz('hoja', '«The lake was dirty. Neighbours cleaned it in two years. Now there are fish.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['There are fish.'], ['It took two years.'], ['Neighbours brought a lake back to life.']], pista: 'Debe cubrir el antes, el cómo y el ahora.' }, 'Las otras dos son detalles ciertos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Few people finished the race, although hundreds had started.» Subraya lo que dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Most runners didn\'t finish.'], ['Everybody finished.'], ['Nobody started.']], pista: '«Few» es pocos; «although», aunque.' }, 'Empezaron cientos y terminaron pocos.')],
], 'Haz el mapa, busca la idea con otras palabras y separa lo principal.');

xpLec('icf-en-largo-2', [
  ['¿Para qué escribe?',
    xpMira('hoja', 'Empecemos por la idea: pregunta **qué quiere** quien escribe.', { letras: ['A', 'B', 'C', 'D'], paras: [['You should try it at home.'], ['The bus was late again. This can\'t continue.'], ['This is how the machine works.'], ['When I was six, I met a bear.']] }, [
      ['«You should» quiere convencer o aconsejar.', { luz: [0], nota: { 0: 'to advise' } }],
      ['«This can\'t continue»: se queja.', { luz: [1], nota: { 1: 'to complain' } }],
      ['«This is how» explica algo.', { luz: [2], nota: { 2: 'to explain' } }],
      ['«When I was six» cuenta una historia.', { luz: [3], nota: { 3: 'to tell a story' } }],
      ['El propósito está en todo el texto, no en una palabra.', {}],
    ], 'To advise, to complain, to explain, to tell.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['to complain', 'to thank', 'to explain'], meta: [2, 0, 1], paras: [['First, you open the box.'], ['The soup was cold and nobody apologised.'], ['You have helped us so much.']], pista: 'Alguna no va ahí: ¿enseña pasos, se queja o agradece?' }, 'Explica, se queja y agradece.')],
  ['Hecho u opinión',
    xpMira('hoja', 'Segunda idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The film lasts two hours.'], ['The film is too long.'], ['I think it needs music.'], ['It was made in Pasto.']] }, [
      ['Dos horas se miden: hecho.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Too long» depende de quien mira.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«I think» anuncia una opinión.', { luz: [2], nota: { 2: 'opinion' } }],
      ['El lugar se comprueba: hecho.', { luz: [3], nota: { 3: 'fact' } }],
      ['Adjetivos como «best» o «terrible» suelen opinar.', {}],
    ], 'Fact: se comprueba. Opinion: alguien puede no estar de acuerdo.'),
    xpHaz('hoja', 'Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['The museum opens at nine.'], ['Entrance is free on Sundays.'], ['Nobody should miss it.']], pista: 'Busca la que alguien podría discutir.' }, '«Nobody should miss it» es lo que piensa quien escribe.')],
  ['Aceptar y limitar',
    xpMira('hoja', 'Tercera idea: el autor puede **reconocer** algo y luego decir **lo suyo**.', { paras: [['I understand why people use phones.'], ['They are useful.'], ['However,', 'I don\'t want them at dinner.'], ['I am asking for one hour.']] }, [
      ['«I understand» reconoce al otro.', { luz: [0, 1], nota: { 0: 'reconoce' } }],
      ['«However» avisa un cambio.', { luz: [2] }],
      ['Lo que viene es su opinión.', { luz: [3], nota: { 2: 'su opinión' } }],
      ['Y al final, lo que pide.', { luz: [4], nota: { 3: 'lo que pide' } }],
      ['No está contra los teléfonos: pide una hora.', { luz: [0, 4] }],
    ], '«I understand… However… I am asking for…».'),
    xpHaz('hoja', '«I love dogs. However, the beach isn\'t a good place for them.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He hates dogs.'], ['He doesn\'t want dogs on the beach.'], ['He wants more dogs on the beach.']], pista: 'Lo suyo viene después de «however».' }, 'Le gustan, pero no en la playa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Thank you for your three letters. I have read them all, twice, and I still won\'t sell my house.» Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Polite but firm'], ['Afraid'], ['Very happy to sell']], pista: 'Agradece, pero ¿cambia de idea?' }, 'Es amable y no cede.')],
], 'Para qué escribe, qué opina y qué pide.');
