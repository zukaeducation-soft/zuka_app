// Preicfes · Inglés · mundo 3 «Gramática en Contexto» (spec 2026-11-25-preicfes-estructura): textos escritos para Zuka; se explica en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const RADIO = {
    id: 'icf-en-abuelo', title: 'My grandfather\'s bicycle',
    ficha: { autor: 'Valentina, 16', fuente: 'School story contest', fecha: 'March 2026' },
    paras: [
      'My grandfather bought his bicycle in 1971. It was green, and it cost him three months of work. He rode it to the factory every morning, and on Sundays he took my grandmother to the river on it. When he was seventy, he stopped riding because his knees hurt.',
      'For ten years the bicycle has been in our garage, under an old blanket. Nobody has used it, and spiders have made their houses in the wheels. Last month, while I was looking for a box, I found it. I asked my grandfather if I could repair it. He was watching television. He turned it off and smiled.',
      'We have worked on it every Saturday since then. He knows the name of every piece, but his hands are weak, so he tells me what to do and I do it. I have learned more words than in any class: chain, brake, pedal, spoke. When something is difficult, he says the same thing: "Slowly. It isn\'t running away."',
      'Yesterday we finished. I was going to paint it blue, but he looked so sad that I chose green. This afternoon I am riding it to the river for the first time. He is coming too, in my uncle\'s car, and he is bringing a sandwich, because he says that nobody rides well on an empty stomach.',
      'One day I will give this bicycle to someone younger than me. I will tell them who bought it, how much it cost and why it must always be green. And if something breaks, I won\'t be afraid. I know that it isn\'t running away.',
    ],
  };
  const l1 = leccion('icf-en-gramatica-1', 'Verbs and tenses', guion(
    ['Pasado simple', 'Bought, rode, took: algo que terminó. Va con yesterday, last month, in 1971.'],
    ['Presente perfecto', 'Has been, have worked… since: empezó antes y sigue o importa hoy.'],
    ['Pasado continuo', 'Was looking: lo que estaba pasando cuando ocurrió otra cosa.'],
    ['Futuro', 'Will para promesas; am riding this afternoon para planes ya hechos.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: RADIO, rot: ['before', 'now', 'the future'],
      ...F(['He rode it to the factory', 0, 'Mira el verbo: ¿«rode» ya pasó?'], ['He knows the name of every piece', 1, 'Mira el verbo: ¿es así hoy?'], ['She will give it to someone younger', 2, 'Busca «will».'], ['It cost three months of work', 0, 'Mira de qué año se habla.']),
      luz: [[1, 'He rode it'], [3, 'He knows'], [5, 'I will give']], bien: 'Rode, knows, will give.' },
      '«Rode» y «cost» están en pasado, «knows» en presente y «will» es futuro.', 'Mira la forma del verbo antes de mirar la historia.'),
    x('genero-o-cita', 'Is it **finished** or does it **continue until now**?', { doc: RADIO, rot: ['finished', 'until now'],
      ...F(['He bought it in 1971', 0, '¿Hay una fecha cerrada?'], ['It has been in our garage for ten years', 1, '¿Dice «for» con «has»?'], ['We have worked every Saturday since then', 1, '¿Dice «since»?'], ['Yesterday we finished', 0, '¿Hay una fecha cerrada?']), bien: 'In 1971, yesterday: finished. For, since: until now.' },
      'Con «in 1971» y «yesterday» terminó; con «has… for» y «have… since» llega hasta hoy.', 'Busca las palabras de tiempo: in, yesterday, for, since.'),
    x('cambia-palabra', 'Put the verb that means the same. Sobran dos.', { doc: RADIO, frases: [[1, 'he ', 'stopped riding', ' because his knees hurt'], [2, 'I ', 'found', ' it'], [4, 'Yesterday we ', 'finished', '']],
      ...F(['did not ride any more', 0, 'He was seventy and it hurt: what happened?'], ['discovered', 1, 'She was looking for a box and saw it.'], ['completed the work', 2, 'The bicycle is ready.'], ['started to ride', null, 'It is the opposite idea.'], ['lost', null, 'She did not lose it: she saw it.']), bien: 'Same tense, same idea.' },
      '«Stopped riding» es dejó de montar, «found» encontró y «finished» terminó el trabajo.', 'Pon cada opción en la oración y mira si cuenta lo mismo.'),
    x('tira-referente', 'What do these words refer to?', { doc: RADIO, texto: '|My grandfather| was watching |television| when I asked him about |the bicycle|. He turned it off and smiled.',
      ...T(['«He»', 0, 'Put it in the sentence: who was there?'], ['«it»', 1, 'Put it in the sentence: what can you turn off?']), bien: 'A man, and something you turn off.' },
      '«He» es el abuelo y «it» es el televisor, lo único que se apaga.', 'Pregunta qué cosa se puede apagar, es decir, «turn off».'),
    x('pasos-del-proceso', 'Put the story in order. The first step is in its place.', { doc: RADIO, que: 'the story', de: 'The green bicycle', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['He buys the bicycle.', 'He stops riding it.', 'She finds it in the garage.', 'They repair it together.', 'She rides it to the river.'], mira: ['', 'It happens when he is seventy.', 'It happens after ten years in the garage.', 'It happens every Saturday.', 'It is the plan for this afternoon.'], bien: 'Buy, stop, find, repair, ride.' },
      'Primero la compra, luego la deja, años después ella la encuentra, la reparan y por fin sale.', 'Busca las edades, los años y los días de la historia.'),
    x('pista-tipo', 'Match each tense with its sentence.', { doc: RADIO, lineas: ['He took my grandmother to the river.', 'I was looking for a box.', 'Nobody has used it.', 'I won\'t be afraid.'],
      ...T(['a finished action', 0, 'Busca un pasado simple.'], ['an action in progress in the past', 1, 'Busca «was» y «-ing».'], ['something until now', 2, 'Busca el auxiliar «has».'], ['something about the future', 3, 'Busca «will» o «won\'t».']), bien: 'Four tenses.' },
      '«Took» terminó, «was looking» estaba en curso, «has used» llega hasta hoy y «won’t» habla del futuro.', 'Mira el auxiliar de cada oración: was, has o will.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: RADIO, nums: [1, 4], pregunta: 'It is true', queda: 'The bicycle is green again.',
      ...T(['He stopped because of the rain.', 3, 'Busca por qué dejó de montar.'], ['They are still repairing it.', [4, 6], 'Busca qué pasó ayer.'], ['The grandfather stays at home today.', 7, 'Busca qué hará él.']), bien: 'One sentence says no.' },
      'Le dolían las rodillas, ayer terminaron y el abuelo también va.', 'Busca la razón, el día y quién va al paseo.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RADIO, lineas: ['A grandfather had a bicycle.', 'The blanket was old.', 'It stayed in a garage for years.', 'He and his granddaughter repaired it.', 'There is a sandwich.', 'She will give it to someone one day.'], ...S([1, 4], { 0: 'It is the beginning.', 2: 'It is the problem.', 3: 'It is the main event.', 5: 'It is the end.' }), bien: 'Beginning, problem, event and end.' },
      'La manta y el sándwich son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si se entiende.'),
  ]);

  const FARM = {
    id: 'icf-en-cafe-farm', title: 'Where your coffee comes from',
    ficha: { autor: 'Tourism students', fuente: 'Guide for visitors', fecha: 'April 2026' },
    paras: [
      'Most of the coffee in this region grows on small farms in the mountains, between 1,200 and 1,800 metres above sea level. The plants need a lot of water, but they do not like too much sun, so farmers often put banana trees among them to give shade.',
      'From September to December, many people come to pick the coffee. It is hard work because every fruit must be picked by hand. Only the red ones are ready. If you pick the green ones, the coffee tastes bitter. A good worker can fill a basket in less than an hour, although most visitors cannot fill even half of it in a morning.',
      'After that, the beans are washed and dried in the sun for about ten days. Someone has to move them every few hours, and if it rains, they must be covered at once. Finally they are put into bags and sold. A farmer gets only a little of the money that you pay for a cup in a big city.',
      'That is why some families have opened their farms to visitors. During the tour, you can walk between the plants, learn how to choose the best fruits and drink a cup at the end. The money from the tours helps them in the months without harvest. There are also a few houses where you can sleep, but there isn\'t much space, so you should book before you come.',
      'Bring good shoes and a hat, and do not wear anything white. You don\'t need much money, because lunch is included. And please ask before you take a photo of anybody. They are at work, and nobody likes to be a postcard.',
    ],
  };
  const l2 = leccion('icf-en-gramatica-2', 'Small words that matter', guion(
    ['Preposiciones', 'In un mes o un lugar cerrado, on un día o una superficie, at una hora o un punto, from… to un tramo.'],
    ['Cantidades', 'Much con lo que no se cuenta; many y a few con lo que sí; a little con lo que no.'],
    ['Conectores', 'So trae el resultado; because, la causa; although, un obstáculo; but, un contraste.'],
    ['Somebody, anybody, nobody', 'Nobody ya niega; anybody va en preguntas y negaciones.']), [
    x('bisagras', 'Put the word that joins the two ideas. Sobran dos.', { doc: FARM, pares: [['They do not like too much sun,', 'farmers put banana trees among them.'], ['It is hard work', 'every fruit must be picked by hand.'], ['A good worker can fill a basket in an hour,', 'most visitors cannot fill even half.']],
      ...F(['so', 0, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['because', 1, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['although', 2, 'Pone un contraste: ¿dónde lo segundo no es lo esperado?'], ['before', null, 'It is about time: no pair is about what is first.'], ['or', null, 'It gives a choice: no pair gives two options.']), bien: 'Result, cause and contrast.' },
      'La sombra es resultado del sol, la mano es la causa del trabajo duro y los visitantes contrastan.', 'Di qué hace la segunda idea: ¿resulta, explica o contrasta?'),
    x('genero-o-cita', 'Can you count it? **many / a few** or **much / a little**', { doc: FARM, rot: ['many / a few', 'much / a little'],
      ...F(['houses', 0, '¿Se puede decir «two houses»?'], ['water', 1, '¿Se puede decir «two waters» para contar litros?'], ['money', 1, '¿Se puede decir «three moneys»?'], ['visitors', 0, '¿Se puede decir «ten visitors»?'], ['space', 1, '¿Se puede decir «four spaces» para un cuarto?']), bien: 'Count it: many. Not: much.' },
      'Casas y visitantes se cuentan; agua, dinero y espacio, no.', 'Prueba con un número delante de la palabra.'),
    x('pista-tipo', 'Match each time word with the part of the text it completes.', { doc: FARM, lineas: ['___ September to December', '___ about ten days', '___ the tour', 'book ___ you come'],
      ...T(['From', 0, 'Busca dos meses, de uno a otro.'], ['For', 1, 'Busca cuánto dura algo.'], ['During', 2, 'Busca un evento en el que pasan cosas.'], ['before', 3, 'Busca qué se hace primero.']), bien: 'From… to, for, during, before.' },
      '«From… to» une dos meses, «for» mide duración, «during» va con un evento y «before» pone algo antes.', 'Mira lo que sigue: meses, días, un evento o una acción.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: FARM,
      ...F(['What do the plants need?', 0, 'Busca el comienzo que habla de dónde crece.'], ['What happens if it rains on the beans?', 2, 'Busca el comienzo «After that».'], ['What should you wear?', 4, 'Busca el comienzo que pide llevar cosas.']),
      luz: [[1, 'a lot of water'], [3, 'they must be covered'], [5, 'good shoes and a hat']], bien: 'Growing, drying and visiting.' },
      'El 1 habla de dónde crece, el 3 de lo que pasa después y el 5 de lo que hay que llevar.', 'Lee los comienzos y busca la palabra más cercana.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: FARM, frases: [[2, 'It is ', 'hard', ' work'], [3, 'they must be covered ', 'at once', ''], [4, 'learn how to ', 'choose', ' the best fruits']],
      ...F(['difficult', 0, 'You do it by hand all day: how is it?'], ['immediately', 1, 'It starts to rain: when do you cover them?'], ['select', 2, 'You want the red ones: what do you do?'], ['easy', null, 'It is the opposite idea.'], ['throw away', null, 'You want to keep the best fruits.']), bien: 'Small changes, same idea.' },
      '«Hard» es difícil, «at once» es de inmediato y «choose» es seleccionar.', 'Lee la oración completa con cada ficha en el hueco.'),
    x('tira-referente', 'What do these words refer to?', { doc: FARM, texto: '|The beans| are dried in |the sun|. |Someone| has to move them every few hours, and it must shine for ten days.',
      ...T(['«them»', 0, 'Put it in the sentence: what is moved?'], ['«it»', 1, 'Put it in the sentence: what can shine?']), bien: 'Many beans, one sun.' },
      '«Them» es plural: los granos; «it» es singular y brilla: el sol.', '«Them» es para varias cosas; «it», para una.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: FARM, nums: [2, 4], pregunta: 'It is true', queda: 'The money from tours helps the families.',
      ...T(['You can pick the fruits with a machine.', 1, 'Busca cómo se recoge cada fruto.'], ['Green fruits taste better.', 3, 'Busca qué pasa con los verdes.'], ['You do not need to book a house.', 8, 'Busca qué debes hacer antes de ir.']), bien: 'One sentence says no.' },
      'Se recoge a mano, los verdes amargan y hay que reservar porque hay poco espacio.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: FARM, lineas: ['Coffee grows on small farms in the mountains.', 'Bags are used at the end.', 'It is picked by hand and dried in the sun.', 'Farmers get little money.', 'A hat is a good idea.', 'Tours help the families.'], ...S([1, 4], { 0: 'It says where it grows.', 2: 'It is how it is made.', 3: 'It is the problem.', 5: 'It is the solution.' }), bien: 'Place, process, problem and solution.' },
      'Las bolsas y el sombrero son detalles; lo demás es lugar, proceso, problema y ayuda.', 'Deja lo que explica por qué reciben visitantes.'),
  ]);

  const CITY = {
    id: 'icf-en-ciudades', title: 'Two sisters, two cities',
    ficha: { autor: 'Daniela Prieto', fuente: 'Travel magazine', fecha: 'May 2026' },
    paras: [
      'My sister Ana lives in Bogotá and I live in Santa Marta. We grew up in the same house, but our lives are very different now. Her city is bigger than mine, and it is also higher and colder. When I visit her, I wear two jackets, and she laughs at me.',
      'Bogotá has the best museums in the country, and I have never been bored there. There are more concerts in one week than in a whole year in my city. However, it isn\'t as relaxed as Santa Marta. The traffic is terrible. Ana\'s trip to work is longer than my whole morning: she leaves home at five to arrive at seven.',
      'Santa Marta is not as exciting, but the sea is the most beautiful thing I know. Everything is closer. I go to work on foot, and I have lunch at home. Food is cheaper too, especially fish. On the other hand, it is so hot in February that it is impossible to walk at noon, and some services, like the internet, are worse than in the capital.',
      'We often argue about who is happier. She says that I am lazier than her, and I say that she is more tired than me. Last Christmas our mother, who lives in a tiny town, listened to us for an hour. "You are both as stubborn as your father," she said. "The best city is the one where somebody waits for you."',
      'This year Ana is going to spend a month with me. She says it will be the quietest month of her life. I think it will be the loudest of mine, because she never stops talking. I can\'t wait.',
    ],
  };
  const l3 = leccion('icf-en-gramatica-3', 'Comparing things', guion(
    ['Más que', 'Cortas: bigger than, colder than. Largas: more tired than.'],
    ['Menos o igual', 'As… as: tan como. Not as… as: no tan como.'],
    ['El más', 'The biggest, the most beautiful, the best, the worst.'],
    ['Irregulares', 'Good, better, the best. Bad, worse, the worst.']), [
    x('pinta-tipos', 'Paint each sentence: which city does it describe?', { doc: CITY, plumas: ['Bogotá', 'Santa Marta', 'both'],
      ...P(['It is colder.', 0, 'Busca dónde se usan dos chaquetas.'], ['Food is cheaper.', 1, 'Busca dónde hay pescado.'], ['It has the best museums.', 0, 'Busca quién tiene conciertos.'], ['A sister lives there.', 2, '¿En cuál de las dos no vive ninguna hermana?'], ['Everything is closer.', 1, 'Busca dónde se va a pie.']), bien: 'Compare, then decide.' },
      'El frío y los museos son de Bogotá, la comida barata y lo cercano de Santa Marta, y en ambas vive una hermana.', 'Busca la oración del texto que compara cada cosa.'),
    x('genero-o-cita', 'Is it **comparing two** or **choosing the top one**?', { doc: CITY, rot: ['comparing two', 'the top one'],
      ...F(['bigger than mine', 0, '¿Lleva «than» o «the…-est / the most»?'], ['the most beautiful thing', 1, '¿Lleva «than» o «the…-est / the most»?'], ['as stubborn as your father', 0, '¿Compara con alguien o escoge entre todos?'], ['the quietest month of her life', 1, '¿Compara con alguien o escoge entre todos?'], ['worse than in the capital', 0, '¿Lleva «than» o «the…-est / the most»?']), bien: 'Than, as… as: two. The…-est, the most: top.' },
      '«Than» y «as… as» comparan; «the most» y «the quietest» escogen el mayor de todos.', 'Busca «than» o «the» con «-est» o «most».'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: CITY, frases: [[2, 'it ', 'isn\'t as relaxed as', ' Santa Marta'], [3, 'Everything is ', 'closer', ''], [2, 'The traffic is ', 'terrible', '']],
      ...F(['is less relaxed than', 0, 'Which city is calmer?'], ['nearer', 1, 'She goes on foot: how far are things?'], ['very bad', 2, 'Two hours to get to work: how is it?'], ['is more relaxed than', null, 'It says the opposite.'], ['very good', null, 'Nobody is happy with two hours.']), bien: 'Not as… as = less… than.' },
      '«Isn’t as relaxed as» es «less relaxed than», «closer» es «nearer» y «terrible», «very bad».', 'Cuidado: «not as… as» quiere decir menos.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: CITY, filas: [{ antes: 'Santa Marta is', topes: ['colder than Bogotá', 'as cold as Bogotá', 'hotter than Bogotá'], va: 2 }, { antes: 'The number of concerts in Bogotá is', topes: ['higher', 'lower', 'the same'], va: 0 }, { antes: 'The internet in Santa Marta is', topes: ['better', 'worse', 'the same'], va: 1 }], mira: ['Read paragraph 1 again: where is it colder?', 'Read paragraph 2 again: concerts in one week.', 'Read the end of paragraph 3 again.'], luz: [[1, 'higher and colder'], [2, 'more concerts'], [3, 'are worse than in the capital']], bien: 'Hotter, higher and worse.' },
      'Bogotá es más fría, tiene más conciertos y en Santa Marta el internet es peor.', 'Busca la palabra que compara en cada párrafo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: CITY, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Ana needs two hours to get to work.', 1, 'Leave at five, arrive at seven.'], ['Fish is cheaper in Santa Marta.', 0, 'Read the part about food.'], ['The writer works near her home.', 1, 'How does she go to work?'], ['Ana earns more money.', 2, 'Is there a sentence about what they earn?']),
      luz: [[2, 'leaves home at five'], [3, 'especially fish'], [3, 'on foot']], bien: 'Five to seven is two hours.' },
      'El pescado está escrito; las dos horas y la cercanía se deducen; lo que ganan no aparece.', 'Haz la cuenta de las horas y fíjate en cómo va al trabajo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: CITY, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Ana will visit her sister.',
      ...T(['The writer is always bored in Bogotá.', 0, 'Busca qué dice de aburrirse.'], ['Their mother lives in a big city.', 7, 'Busca dónde vive la mamá.'], ['Ana will stay for a weekend.', 10, 'Busca cuánto tiempo se queda.']), bien: 'One sentence says no.' },
      'Nunca se aburre, la mamá vive en un pueblo diminuto y Ana se queda un mes.', 'Busca en el texto el dato exacto de cada frase.'),
    x('pinta-voces', 'Paint each idea with the person who says it.', { doc: CITY, plumas: ['Ana', 'the writer', 'the mother'],
      ...P(['You are lazier than me.', 0, 'Busca quién critica a la escritora.'], ['You are more tired than me.', 1, 'Busca quién le contesta.'], ['The best city is where somebody waits for you.', 2, 'Busca quién escuchó una hora.'], ['It will be the loudest month.', 1, 'Busca «I think».'], ['It will be the quietest month.', 0, 'Busca «She says».']), bien: 'She says, I say, our mother said.' },
      '«She says» es de Ana, «I think» de la escritora y las comillas, de la mamá.', 'Busca el verbo de decir y mira quién es su sujeto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: CITY, lineas: ['Two sisters live in different cities.', 'The writer wears two jackets.', 'Bogotá is more exciting but less relaxed.', 'Santa Marta is cheaper and closer.', 'Ana leaves at five.', 'Their mother says people matter more than places.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is one side of the comparison.', 3: 'It is the other side.', 5: 'It is the message.' }), bien: 'Situation, two sides and message.' },
      'Las chaquetas y la hora son detalles; lo demás es la comparación y el mensaje.', 'Deja las dos ciudades y lo que dice la mamá.'),
  ]);

  const MUSEO = {
    id: 'icf-en-museo', title: 'The smallest museum in the valley',
    paras: [
      'In 2012, Teresa Gómez opened a museum in her own kitchen. She had only eleven objects: old radios that her neighbours did not want any more. Today there are more than three hundred, and the kitchen has become the smallest but the most visited museum in the valley.',
      'Teresa has never asked anybody for money. People bring radios because they have a story. A taxi driver brought the one that his father was listening to when he was born. A nurse gave her a tiny radio that is smaller than a matchbox.',
      'Although many of them do not work, Teresa repairs at least one every month. She learned by herself, from books, and she is better than most of the technicians in the city. While she works, she tells visitors who owned each radio.',
      'Next year she will move the museum to a bigger house, because there isn\'t much space. "The new place is as old as the radios," she says. "They will feel at home."',
    ],
  };
  const Q = preg(MUSEO, 'ingles');
  return mundo('icf-en-gramatica', 'Gramática en Contexto', 'ingles', [l1, l2, l3], [
    ['icf-en-gramatica-1', '«Has become» llega hasta hoy; «In 2012, … opened» cierra el pasado.', Q('According to the text, the museum started:', ['Last year', 'In 2012', 'Next year', 'When Teresa was born'], 1, '«In 2012, Teresa Gómez opened»: un pasado con fecha.', 'Busca el verbo «opened».')],
    ['icf-en-gramatica-1', '«Will» habla del futuro.', Q('According to Teresa, what will happen next year?', ['The museum will close', 'Teresa will learn English', 'The museum will be in a bigger house', 'Teresa will sell the radios'], 2, '«Next year she will move the museum to a bigger house».', 'Busca «will» en el último párrafo.')],
    ['icf-en-gramatica-2', '«Although» une una idea con lo que no se esperaba.', Q('"Although many of them do not work" means that:', ['All the radios work', 'A lot of radios are broken, but she repairs some', 'Teresa does not work', 'Nobody visits the museum'], 1, 'Muchas no funcionan; aun así, ella repara al menos una al mes.', '¿Qué hace Teresa a pesar de eso?')],
    ['icf-en-gramatica-2', '«Much» va con lo que no se cuenta: much space.', Q('Teresa needs a new house because:', ['The kitchen is too small now', 'The kitchen is too old', 'Her neighbours want the kitchen', 'She has a lot of money'], 0, '«There isn’t much space»: hay poco espacio para más de trescientas radios.', 'Busca lo que va después de «because».')],
    ['icf-en-gramatica-3', '«Smaller than» compara dos cosas.', Q('In the text, the nurse\'s radio is:', ['As big as a matchbox', 'Bigger than a matchbox', 'The biggest radio', 'Not as big as a matchbox'], 3, '«Smaller than a matchbox» es lo mismo que «not as big as a matchbox».', '«Not as… as» quiere decir menos.')],
    ['icf-en-gramatica-3', '«Better than most» no es lo mismo que «the best».', Q('According to the text, Teresa is:', ['A better technician than most in the city', 'The worst technician in the city', 'As good as her neighbours', 'The youngest technician'], 0, '«She is better than most of the technicians in the city».', 'Busca «better than» y mira con quién la comparan.')],
  ]);
})());
