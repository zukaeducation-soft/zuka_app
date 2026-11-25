// Preicfes · Inglés · mundo 6 «Palabras en Contexto» (spec 2026-11-25-preicfes-estructura): textos de nivel A2 y B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BAKERY = {
    id: 'icf-en-bakery', title: 'A bakery without a door',
    ficha: { autor: 'Written by Iris Vélez', fuente: 'Travel blog «Slow Streets»', fecha: 'April 2026' },
    paras: [
      'There is a bakery in the old part of Popayán that has no door. It has a small window, a bell, and a basket that goes down on a rope from the second floor. You ring the bell, put your money in the basket and shout what you want. A minute later, the basket comes back with warm bread. In eleven years, nobody has ever stolen it.',
      'The owner, Fermín Ruiz, opened the place after an accident at work. He was told that he would hardly walk again, and his flat had thirty-two stairs. Moving was too expensive, so he decided to stay at home and let the bread travel instead of him. At first his neighbours laughed at the idea. Then they tried the bread.',
      'He gets up at three. He does not use any machines, except for an old radio. While the dough is resting, he reads the notes that people leave in the basket. Some are orders for the following day. Others are jokes, recipes, or questions such as "How do you get rid of mice?" He answers every one of them, usually with a piece of cake.',
      'Business has grown so quickly that a supermarket offered to sell his bread. He turned it down. "They wanted two thousand rolls a day, all the same size," he explains. "I make two hundred, and each one looks like the person I am thinking of." He did accept, however, a smaller offer: the hospital now sends a nurse with a long list every Friday.',
      'Last month the rope broke. The basket fell on the street with forty rolls in it. Before Fermín could reach the window, the children of the block had already picked everything up, and someone had climbed a ladder with a new rope. There was one roll missing. The next morning he found a coin in the basket, with a note: "Sorry. I was hungry."',
    ],
  };
  const l1 = leccion('icf-en-vocabulario-1', 'Choosing the right word', guion(
    ['Mira alrededor', 'La palabra correcta encaja en sentido y en gramática.'],
    ['Palabras parecidas', 'say / tell, make / do, look / watch: cada una tiene su compañía.'],
    ['Verbos con partícula', 'get up, give up, turn down, look after: el sentido cambia.'],
    ['Cantidad', 'much, many, few, any, every.']), [
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: BAKERY, frases: [[2, 'he would ', 'hardly', ' walk again'], [3, 'How do you ', 'get rid of', ' mice?'], [4, 'He ', 'turned it down', '.']],
      ...F(['only with difficulty', 0, 'After the accident, could he walk easily?'], ['remove', 1, 'Who wants mice at home?'], ['said no to it', 2, 'Did the supermarket sell his bread?'], ['very fast', null, 'He had an accident: think about it.'], ['accepted it', null, 'It is the opposite.']), bien: 'The sentence gives the meaning.' },
      '«Hardly» es apenas, «get rid of» es deshacerse de y «turn down» es rechazar.', 'Lee lo que pasa antes y después de cada palabra.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: BAKERY, pares: [['He uses no machines,', 'an old radio.'], ['Moving was too expensive,', 'he stayed at home.'], ['He reads the notes', 'the dough is resting.']],
      ...F(['except for', 0, 'One thing is different: which pair has an exception?'], ['so', 1, 'The second idea is the result of the first one.'], ['while', 2, 'Two things happen at the same time.'], ['because of', null, 'It gives a cause before a noun.'], ['unless', null, 'It is a condition: no pair has one.']), bien: 'Exception, result and time.' },
      '«Except for» exceptúa, «so» da el resultado y «while» indica a la vez.', 'Di qué hace la segunda idea con la primera.'),
    x('genero-o-cita', 'Which verb goes with it: **make** or **do**?', { doc: BAKERY, rot: ['make', 'do'],
      ...F(['a cake', 0, '¿Se fabrica algo?'], ['your homework', 1, '¿Es una tarea?'], ['a mistake', 0, '¿Con qué verbo se dice «cometer un error»?'], ['the shopping', 1, '¿Es una actividad?'], ['a decision', 0, '¿Con qué verbo se dice «tomar una decisión»?']), bien: 'Make a cake, do a task.' },
      '«Make» crea algo (cake, mistake, decision); «do» es para tareas (homework, shopping).', 'Piensa si se crea algo nuevo o se realiza una tarea.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: BAKERY, nums: [1, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The bakery has no door.', 0, 'Búscala al comienzo.'], ['The neighbours care about Fermín.', 1, '¿Qué hicieron cuando se rompió la cuerda?'], ['The person with the coin felt bad.', 1, '¿Qué dice la nota?'], ['The rope was made in China.', 2, '¿Se dice de dónde es?']),
      luz: [[1, 'has no door'], [5, 'picked everything up'], [5, 'Sorry. I was hungry']], bien: 'A coin and a note say a lot.' },
      'La puerta está escrita; el cariño y la pena se deducen; el origen de la cuerda no.', 'Mira lo que hace la gente en el último párrafo.'),
    x('pista-tipo', 'Match each word with its opposite.', { doc: BAKERY, lineas: ['expensive', 'accept', 'warm', 'following'],
      ...T(['cheap', 0, '¿Cuál habla de precio?'], ['turn down', 1, '¿Cuál es decir sí?'], ['cold', 2, '¿Cuál habla de temperatura?'], ['previous', 3, '¿Cuál habla de lo que viene después?']), bien: 'Price, answer, heat and time.' },
      'Caro y barato, aceptar y rechazar, tibio y frío, siguiente y anterior.', 'Di primero de qué habla cada palabra de la lista.'),
    x('tira-referente', 'What do these words refer to?', { doc: BAKERY, texto: '|The supermarket| wanted |the rolls|, but it wanted them all the same size.',
      ...T(['«it»', 0, 'Put it in the sentence: who wanted?'], ['«them»', 1, 'Put it in the sentence: what was the same size?']), bien: 'One place, many things.' },
      '«It» es el supermercado, uno solo; «them», los panes, varios.', '«It» es para uno solo y «them» es para varios.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BAKERY, nums: [1, 2, 4], pregunta: 'It is true', queda: 'The hospital buys his bread.',
      ...T(['People often steal the basket.', 4, 'Busca qué ha pasado en once años.'], ['The neighbours loved the idea from the beginning.', 8, 'Busca qué hicieron al comienzo.'], ['He makes two thousand rolls a day.', 13, 'Busca cuántos hace él.']), bien: 'One sentence says no.' },
      'Nadie la ha robado, al comienzo se rieron y él hace doscientos.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BAKERY, lineas: ['A man sells bread with a basket on a rope.', 'He has an old radio.', 'He started after an accident.', 'He keeps his business small.', 'A nurse comes on Fridays.', 'His neighbours help him.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is his decision.', 5: 'It is the end.' }), bien: 'Idea, start, decision and end.' },
      'La radio y la enfermera son detalles; lo demás es la historia.', 'Deja lo que contarías de la historia en cuatro frases.'),
  ]);

  const RIVER = {
    id: 'icf-en-river', title: 'The beautiful art of being bored',
    ficha: { autor: 'Dr Marcos Lema', fuente: 'Science page for students', fecha: 'May 2026' },
    paras: [
      'When did you last feel bored? For many people the answer is surprising: they cannot remember. A bus is late, and we look at our phones. A film becomes slow, and we look at our phones. We have almost completely lost the ability to do nothing, and some scientists are worried about it.',
      'Boredom is unpleasant, of course. Nevertheless, it seems to be useful. In one study, people were asked to copy numbers from a telephone book for fifteen minutes, which is a terribly boring task. Afterwards they had to think of different uses for a plastic cup. They had more original ideas than another group, who had not copied anything.',
      'The explanation may be simple. When nothing interesting happens outside, the mind starts looking for something inside. It remembers, imagines and makes unexpected connections. In addition, boredom tells us that what we are doing is not meaningful enough, so it pushes us to change. Without it, we would probably stay in front of the same wall for ever.',
      'This does not mean that every kind of boredom is good. A person who is bored at work for years can become unhappy or even ill. Moreover, people who get bored easily sometimes look for dangerous ways of feeling alive. As with salt, the right amount makes the difference.',
      'So what can we do? I am not going to suggest that you throw your phone into the river. Instead, try a small experiment. The next time you are waiting for something, keep your hands in your pockets. At first you will feel uncomfortable. Then, if you are lucky, you will have an idea. And if you have no idea at all, at least you will have seen what the sky looks like on a Tuesday.',
    ],
  };
  const l2 = leccion('icf-en-vocabulario-2', 'Word families and connectors', guion(
    ['Familias', 'bore, bored, boring, boredom: el final dice qué clase de palabra es.'],
    ['Prefijos', 'un-, dis-, in- dan lo contrario: unpleasant, unexpected.'],
    ['Conectores', 'However y nevertheless contrastan; moreover agrega; therefore concluye.'],
    ['-ed y -ing', 'bored es cómo te sientes; boring es lo que lo causa.']), [
    x('genero-o-cita', 'Which one completes the idea: **bored** or **boring**?', { doc: RIVER, rot: ['bored', 'boring'],
      ...F(['I am ___ today.', 0, '¿Habla de cómo se siente alguien?'], ['This film is ___.', 1, '¿Habla de la cosa que lo causa?'], ['The children look ___.', 0, '¿Habla de cómo se siente alguien?'], ['What a ___ task!', 1, '¿Habla de la cosa que lo causa?']), bien: 'People are bored; things are boring.' },
      '«Bored» es cómo se siente alguien; «boring», lo que aburre.', 'Pregunta si la palabra habla de quien siente o de lo que causa.'),
    x('pinta-tipos', 'Paint each word with its type.', { doc: RIVER, plumas: ['noun', 'adjective', 'adverb'],
      ...P(['boredom', 0, 'Look at the end of the word.'], ['useful', 1, 'Look at the end of the word.'], ['completely', 2, 'Look at the end of the word.'], ['explanation', 0, 'Look at the end of the word.'], ['dangerous', 1, 'Look at the end of the word.']), bien: '-dom, -tion; -ful, -ous; -ly.' },
      '«-dom» y «-tion» forman sustantivos, «-ful» y «-ous» adjetivos y «-ly» adverbios.', 'Compara las terminaciones: algunas se repiten.'),
    x('bisagras', 'Put the connector. Sobran dos.', { doc: RIVER, pares: [['Boredom is unpleasant.', 'it seems to be useful.'], ['It helps the mind.', 'it pushes us to change.'], ['I had nothing to do,', 'I looked at the sky.']],
      ...F(['Nevertheless,', 0, 'One idea is bad and the other one is good.'], ['In addition,', 1, 'It adds another good thing.'], ['so', 2, 'The second idea is the result.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, addition and result.' },
      '«Nevertheless» contrasta, «in addition» agrega y «so» da el resultado.', 'Di si la segunda idea se opone, se suma o resulta.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: RIVER, frases: [[1, 'lost the ', 'ability', ' to do nothing'], [3, 'makes ', 'unexpected', ' connections'], [2, '', 'Afterwards', ' they had to think']],
      ...F(['power', 0, 'It is something that we can do.'], ['surprising', 1, 'The prefix «un-» says «not».'], ['Later', 2, 'When did they do the second task?'], ['usual', null, 'It is the opposite of one of them.'], ['Before', null, 'It is the opposite of one of them.']), bien: 'Context and prefixes help.' },
      '«Ability» es la capacidad, «unexpected» lo que sorprende y «afterwards» después.', 'Mira el prefijo de la palabra o la oración completa.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: RIVER, filas: [{ antes: 'Boredom', topes: ['is useless', 'is always good', 'seems to be useful'], va: 2 }, { antes: 'The writer wants you to', topes: ['sell your phone', 'try an experiment', 'stop working'], va: 1 }, { antes: 'The bored group had', topes: ['more original ideas', 'no ideas', 'the same ideas'], va: 0 }], mira: ['Busca la palabra que suaviza la idea.', 'Relee el párrafo 5.', 'Relee el resultado del estudio.'], luz: [[2, 'it seems to be useful'], [5, 'try a small experiment'], [2, 'more original ideas']], bien: 'Seems, try and more.' },
      'Parece útil, propone un experimento y el grupo aburrido tuvo más ideas.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: RIVER,
      ...F(['presents the problem', 0, 'Look for what we have lost.'], ['describes a study', 1, 'Look for a telephone book.'], ['gives an explanation', 2, 'Look for the mind.'], ['shows the other side', 3, 'Look for salt.'], ['suggests something to do', 4, 'Look for pockets.'], ['sells a phone', null, 'Nobody sells anything.']),
      luz: [[1, 'lost the ability'], [2, 'In one study'], [3, 'The explanation'], [4, 'This does not mean'], [5, 'try a small experiment']], bien: 'Problem, study, why, but, so.' },
      'Presenta el problema, un estudio, la explicación, un límite y una sugerencia.', 'Lee el comienzo de cada párrafo y dile un nombre.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: RIVER, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['Salt is in the text.', 0, 'It is true, but what does it compare?'], ['Some boredom helps, but too much can be bad.', 1, 'Compare it with the last sentence.'], ['Boredom always makes people ill.', 2, 'Does the text say «always»?']),
      luz: [[4, 'the right amount'], [4, 'This does not mean']], bien: 'The right amount.' },
      'La sal es una comparación, «always» dice de más y la idea justa es la cantidad adecuada.', 'Mira la palabra «every» y la última oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RIVER, lineas: ['We have forgotten how to be bored.', 'The cup is plastic.', 'A little boredom can help us to have ideas.', 'Too much boredom can be bad.', 'It was a telephone book.', 'The writer suggests waiting without a phone.'], ...S([1, 4], { 0: 'It is the problem.', 2: 'It is the main idea.', 3: 'It is the limit.', 5: 'It is the suggestion.' }), bien: 'Problem, idea, limit and suggestion.' },
      'El vaso y el directorio son detalles del estudio; lo demás es el argumento.', 'Deja lo que usarías para explicarle el texto a alguien.'),
  ]);

  const LIGHT = {
    id: 'icf-en-light', title: 'The lighthouse keeper\'s cat',
    paras: [
      'Sergio Paz had lived alone in the lighthouse for nine years when a cat arrived. Nobody knows how it crossed the water. It was thin, wet and extremely angry, and it immediately chose the only comfortable chair.',
      'At first, Sergio was not pleased. He was used to silence, and the cat complained about everything: the food, the wind and, above all, the radio. However, he soon noticed something strange. Every time that the cat hid under the bed, a storm came within two hours. The official weather service was often wrong. The cat was not.',
      'Sergio began to write it down. He also told the fishermen, who laughed at him until one of them decided not to go out one morning because the cat was hiding. That day three boats were damaged. Since then, the fishermen have called the lighthouse before every trip. They do not ask for the weather forecast. They ask: "Where is she?"',
      'A scientist who visited the island last year was careful. Cats, she explained, may feel changes in air pressure, so there is probably no magic in it. Nevertheless, before she left, she asked Sergio to phone her if the cat went under the bed.',
      'Sergio has been offered a modern station with sensors and a screen. He has accepted it, although he keeps it in the kitchen, next to the fish. "The machine tells me what is happening," he says. "She tells me whether I should worry."',
    ],
  };
  const Q = preg(LIGHT, 'ingles');
  return mundo('icf-en-vocabulario', 'Palabras en Contexto', 'ingles', [l1, l2], [
    ['icf-en-vocabulario-1', 'Mira lo que hace el personaje para entender la palabra.', Q('«At first, Sergio was not pleased» means that he was:', ['Unhappy about the cat', 'Asleep', 'Very tired of fishing', 'Glad to have a cat'], 0, '«Pleased» es contento; con «not», no le gustó.', 'Mira lo que hacía el gato y cómo vivía Sergio.')],
    ['icf-en-vocabulario-1', '«Be used to» es estar acostumbrado.', Q('«He was used to silence» means that silence was:', ['Something he hated', 'Something new for him', 'Something normal for him', 'Something he needed to buy'], 2, 'Después de nueve años solo, el silencio era lo normal.', 'Piensa cuántos años había vivido solo.')],
    ['icf-en-vocabulario-1', 'Escoge la palabra que encaja en sentido y gramática.', Q('Which word could replace «damaged» in paragraph 3?', ['Painted', 'Sold', 'Broken', 'Built'], 2, 'Después de una tormenta, las barcas quedaron dañadas.', 'Piensa qué hace una tormenta con una barca.')],
    ['icf-en-vocabulario-2', 'Nevertheless contrasta.', Q('In paragraph 4, «Nevertheless» shows that the scientist:', ['Believed in magic', 'Was angry', 'Didn\'t like cats', 'Trusted the cat a little, although she had an explanation'], 3, 'Explica que no es magia y, aun así, pide que la llamen.', 'Compara lo que explicó con lo que pidió.')],
    ['icf-en-vocabulario-2', '-ly forma adverbios: cómo o cuándo ocurre algo.', Q('In «it immediately chose the only comfortable chair», «immediately» tells us:', ['When it chose the chair', 'Which chair it was', 'Why it chose the chair', 'Whose chair it was'], 0, '«Immediately» es de inmediato: dice cuándo.', 'Pregunta qué información agrega la palabra.')],
    ['icf-en-vocabulario-2', 'Although: aunque.', Q('What does Sergio mean in the last paragraph?', ['The machine is useless', 'The cat should use the machine', 'He will sell the cat', 'Both help him, but in different ways'], 3, 'La máquina informa y la gata le dice si preocuparse.', 'Compara lo que dice de la máquina con lo que dice de ella.')],
  ]);
})());
