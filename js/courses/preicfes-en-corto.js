// Preicfes · Inglés · mundo 4 «Textos Cortos» (spec 2026-11-25-preicfes-estructura): mensajes y textos de nivel básico, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const MAILS = {
    id: 'icf-en-mails', title: 'Messages on the fridge',
    ficha: { autor: 'The Suárez family', fuente: 'Notes, emails and chats', fecha: 'One week in April 2026' },
    paras: [
      'NOTE ON THE FRIDGE. Monday, 6 a.m. Kids, I have an early meeting. There are eggs and bread. Lucas, please walk the dog before school, not after, because the neighbours don\'t like the noise at noon. Sofía, your blue shirt is in the washing machine, so wear the white one. Love, Mum.',
      'CHAT. Monday, 3 p.m. Sofía: Mum, I have a problem. I\'m sleeping at Ana\'s house tonight and I left my project at home. It is for tomorrow morning. Can Grandpa bring it? Mum: He doesn\'t drive at night any more. Ask your teacher if you can send a photo today and bring it on Wednesday. Sofía: Good idea. She said yes!',
      'EMAIL TO THE COACH. Tuesday. Dear Mr Ramos, Lucas hurt his foot this morning while he was walking the dog. The doctor says it isn\'t broken, but he can\'t run for two weeks. He would like to come to training to watch and help with the water. Is that all right? Best wishes, Clara Suárez.',
      'ANSWER. Wednesday. Dear Ms Suárez, I\'m sorry to hear that. Of course he can come. In fact, I need someone to write down the points on Saturday, and Lucas is very good at maths. Tell him to bring a pencil and a hat. Regards, Andrés Ramos.',
      'NOTE ON THE FRIDGE. Saturday. Mum, Dad: we have gone to the game. Lucas is the new "assistant". He has told everybody. There is pizza in the oven for you; we made it, so don\'t worry if it looks strange. Back at six. Grandpa is coming with us, because it is in the afternoon. Sofía.',
    ],
  };
  const l1 = leccion('icf-en-corto-1', 'Short messages', guion(
    ['¿Quién a quién?', 'Mira quién firma y a quién saluda: Dear Mr Ramos… Best wishes, Clara.'],
    ['¿Para qué?', 'Un mensaje pide, avisa, responde, invita o agradece.'],
    ['Datos', 'Subraya día, hora, lugar y lo que hay que hacer.'],
    ['Lo que no se dice', 'Si el abuelo no maneja de noche y va por la tarde, se entiende por qué puede ir.']), [
    x('donde-mirar', 'Lleva cada pregunta al mensaje donde la buscarías.', { doc: MAILS,
      ...F(['What should Sofía wear?', 0, 'Busca la nota de la mañana.'], ['Why can\'t Lucas run?', 2, 'Busca el mensaje al entrenador.'], ['What is there to eat on Saturday?', 4, 'Busca la nota del sábado.']),
      luz: [[1, 'wear the white one'], [3, 'hurt his foot'], [5, 'There is pizza']], bien: 'Read the heading first.' },
      'La ropa está en la nota del lunes, el pie en el correo y la comida en la nota del sábado.', 'Lee solo los encabezados y decide dónde está.'),
    x('pinta-voces', 'Paint each message with its writer.', { doc: MAILS, plumas: ['Mum', 'Sofía', 'Mr Ramos'],
      ...P(['Please walk the dog before school.', 0, 'Busca quién firma la nota del lunes.'], ['I left my project at home.', 1, 'Busca quién tiene un problema.'], ['Tell him to bring a pencil.', 2, 'Busca quién responde el correo.'], ['He would like to come and watch.', 0, 'Busca quién escribe al entrenador.'], ['We made it, so don\'t worry.', 1, 'Busca quién firma el sábado.']), bien: 'The name at the end tells you.' },
      'Mum firma la nota del lunes y el correo (Clara), Sofía escribe el chat y la nota del sábado, y Mr Ramos responde.', 'Mira el nombre o la firma de cada mensaje.'),
    x('voz-de-la-fuente', 'Match each purpose with its message.', { ayuda: 'Tira un hilo desde cada propósito hasta su mensaje.', doc: MAILS, portadas: [['Monday note', 'message'], ['The chat', 'message'], ['Email to the coach', 'message'], ['Saturday note', 'message']],
      ...T(['to tell the kids what to do', 0, '¿Cuál da instrucciones?'], ['to ask for help with homework', 1, '¿Cuál empieza con un problema?'], ['to explain an injury and ask permission', 2, '¿Cuál le escribe a alguien de fuera?'], ['to say where they are', 3, '¿Cuál avisa que salieron?']), bien: 'Tell, ask, explain, inform.' },
      'La nota del lunes da instrucciones, el chat pide ayuda, el correo explica y la del sábado avisa.', 'Pregunta qué quiere lograr quien escribe.'),
    x('genero-o-cita', 'Is it **formal** or **informal**?', { doc: MAILS, rot: ['formal', 'informal'],
      ...F(['Dear Mr Ramos', 0, '¿Se le escribe así a un amigo?'], ['Love, Mum', 1, '¿Se le escribe así a un jefe?'], ['Regards', 0, '¿Se usa con alguien que no es de la familia?'], ['Good idea. She said yes!', 1, '¿Suena a chat o a carta?']), bien: 'Dear and Regards; Love and chat.' },
      '«Dear Mr» y «Regards» son formales; «Love, Mum» y la frase del chat, informales.', 'Piensa a quién le escribirías de esa manera.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: MAILS, nums: [3, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Lucas\'s foot is not broken.', 0, 'Léela junto a lo que dice el doctor.'], ['Grandpa drives them to the game.', 1, '¿Por qué importa que sea por la tarde?'], ['Lucas is proud of his new job.', 1, '¿A quién se lo ha contado?'], ['Lucas\'s team wins.', 2, '¿Se dice el resultado?']),
      luz: [[3, 'it isn\'t broken'], [5, 'because it is in the afternoon'], [5, 'He has told everybody']], bien: 'He does not drive at night.' },
      'El pie está escrito; que el abuelo maneje y que Lucas esté orgulloso se deducen; el resultado no.', 'Junta la nota del sábado con lo que se dijo en el chat.'),
    x('pasos-del-proceso', 'Put the week in order. The first step is in its place.', { doc: MAILS, que: 'the week', de: 'The Suárez family', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Mum leaves a note.', 'Sofía forgets her project.', 'Lucas hurts his foot.', 'The coach answers.', 'They go to the game.'], mira: ['', 'It happens on Monday afternoon.', 'It happens on Tuesday morning.', 'It happens on Wednesday.', 'It happens on Saturday.'], bien: 'Monday, Monday, Tuesday, Wednesday, Saturday.' },
      'La nota y el proyecto son del lunes, el pie del martes, la respuesta del miércoles y el juego del sábado.', 'Mira el día que aparece en cada encabezado.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: MAILS, nums: [1, 4], pregunta: 'It is true', queda: 'Lucas will write down the points.',
      ...T(['Lucas must walk the dog after school.', 4, 'Busca cuándo debe pasear al perro.'], ['Sofía wears the blue shirt on Monday.', 5, 'Busca dónde está la camisa azul.'], ['Lucas is bad at maths.', 11, 'Busca en qué es muy bueno.']), bien: 'One sentence says no.' },
      'El perro va antes del colegio, la camisa azul está lavándose y Lucas es muy bueno en matemáticas.', 'Busca en cada frase la palabra que cambia la verdad.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MAILS, lineas: ['A family leaves messages for a week.', 'There are eggs and bread.', 'Sofía forgets a project and solves it.', 'Lucas hurts his foot and gets a new job.', 'The pizza is in the oven.', 'The kids and Grandpa go to the game.'], ...S([1, 4], { 0: 'It says what the text is.', 2: 'It is the first problem.', 3: 'It is the second problem and its solution.', 5: 'It is the end.' }), bien: 'Problems and solutions stay.' },
      'Los huevos y la pizza son detalles; los problemas y sus soluciones son la historia.', 'Deja lo que le pasa a cada hijo y cómo acaba.'),
  ]);

  const LIBRARY = {
    id: 'icf-en-burro', title: 'The library with four legs',
    ficha: { autor: 'Young readers\' magazine', fuente: 'Section «People like us»', fecha: 'May 2026' },
    paras: [
      'When Nelson Bravo was a young teacher, he noticed that many of his students had no books at home. The school was two hours from the nearest town, and there was no road. One morning he put forty books on his donkey and went from farm to farm. He thought that nobody would open the door. He came back with an empty bag.',
      'Now he is fifty-three, and he has two donkeys, Comma and Period, and almost two thousand books. Every weekend he visits eight villages. Children wait for him under a tree. They can keep a book for two weeks and, if they tell the story to someone else, they get an extra week. "A book is not finished until you tell it," he says.',
      'At first, some parents were not happy. They thought that reading was a waste of time when there was so much work on the farm. Nelson did not argue. He started to bring books about cows, corn and water. Soon the parents were asking for them, and two of them have learned to read with their children.',
      'It isn\'t always easy. Once, thieves took his bag and found only fairy tales, so they gave it back. Another time, Period fell into the river. He was fine, but sixty books were wet. The children put them in the sun, page by page. Some of those books look terrible now. They are everybody\'s favourites.',
      'People often ask Nelson why he does not use a motorbike. He says that a motorbike cannot cross the river, and that nobody runs out of the house to see a motorbike. When he arrives, the first thing that children do is hug the donkeys. The second is to ask: "What did you bring today?"',
    ],
  };
  const l2 = leccion('icf-en-corto-2', 'What the text says', guion(
    ['Idea principal', 'De qué trata todo el texto, no un párrafo.'],
    ['Detalles', 'Quién, dónde, cuándo, cuánto: están escritos.'],
    ['Palabra por el contexto', 'Si no conoces una palabra, mira lo que la rodea.'],
    ['Correct, wrong, doesn’t say', 'Una opción puede sonar bien y no estar en el texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: LIBRARY, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['an unusual library', 0, 'Read the title again: what has four legs there?'], ['tell a person\'s story', 1, 'Read the name of the section.'], ['a magazine article', 2, 'Look at the source.'], ['a horse race', null, 'The title names another thing with the legs.'], ['sell furniture', null, 'A magazine for young readers is not a shop.'], ['a letter to a friend', null, 'A magazine section is not a private message.']),
      luz: [[1, 'forty books on his donkey'], [2, 'two thousand books']], bien: 'Title, author and section gave it away.' },
      'El título habla de una biblioteca rara y la sección, de personas: un artículo que cuenta una historia.', 'Lee por separado el título, quién escribe y la sección.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: LIBRARY,
      ...F(['tells how it started', 0, 'Look for a young teacher.'], ['tells how it works now', 1, 'Look for his age today.'], ['tells how parents changed', 2, 'Look for the parents.'], ['tells two difficult moments', 3, 'Look for thieves and a river.'], ['explains why donkeys', 4, 'Look for another kind of transport.'], ['explains how to build a road', null, 'Nobody builds a road here.']),
      luz: [[1, 'a young teacher'], [2, 'Now he is fifty-three'], [3, 'some parents were not happy'], [4, 'It isn\'t always easy'], [5, 'a motorbike']], bien: 'Start, now, parents, problems and donkeys.' },
      'El texto cuenta el comienzo, cómo funciona hoy, el cambio de los padres, dos problemas y por qué burros.', 'Lee la primera oración de cada párrafo y nómbrala.'),
    x('genero-o-cita', 'Is it **correct** or does the text **not say** it?', { doc: LIBRARY, rot: ['correct', 'doesn\'t say'],
      ...F(['Children can keep a book for two weeks.', 0, '¿Encuentras la oración que lo dice?'], ['Nelson is married.', 1, '¿Encuentras la oración que lo dice?'], ['He has two donkeys.', 0, '¿Encuentras la oración que lo dice?'], ['The government gives him money.', 1, '¿Encuentras la oración que lo dice?'], ['Thieves gave his bag back.', 0, '¿Encuentras la oración que lo dice?']), bien: 'If you can\'t find it, it doesn\'t say.' },
      'Las dos semanas, los dos burros y los ladrones están escritos; el matrimonio y el dinero no aparecen.', 'Busca la oración; si no la encuentras, no lo dice.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LIBRARY, frases: [[1, 'he ', 'noticed', ' that many of his students had no books'], [3, 'reading was ', 'a waste of time', ''], [4, 'Some of those books ', 'look terrible', ' now']],
      ...F(['saw', 0, 'He was their teacher: what did he do?'], ['not useful', 1, 'There was a lot of work: what did parents think?'], ['are in bad condition', 2, 'They were wet and dried in the sun.'], ['very important', null, 'Parents thought the opposite at first.'], ['are more expensive', null, 'Nobody talks about the price of the books.']), bien: 'The sentence gives the meaning.' },
      '«Noticed» es vio, «a waste of time» es inútil y «look terrible» es que están en mal estado.', 'Mira lo que pasa antes y después de la palabra.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LIBRARY, rot: ['when he was young', 'at first with parents', 'now'],
      ...F(['He took forty books to the farms', 0, 'Busca «a young teacher».'], ['They thought reading was not useful', 1, 'Busca «At first».'], ['He visits eight villages', 2, 'Busca «Every weekend».'], ['He has almost two thousand books', 2, 'Busca la palabra «Now».']), luz: [[1, 'One morning'], [3, 'At first'], [2, 'Every weekend']], bien: 'Was, thought, visits.' },
      'Los cuarenta libros son del comienzo, la duda de los padres vino al principio y lo demás es de hoy.', 'Mira el tiempo del verbo y las palabras de tiempo.'),
    x('tira-referente', 'What do these words refer to?', { doc: LIBRARY, texto: '|Thieves| took |his bag| and found only |fairy tales|, so they gave it back.',
      ...T(['«they»', 0, 'Put it in the sentence: who gave something back?'], ['«it»', 1, 'Put it in the sentence: what did they take?']), bien: 'People, and one thing.' },
      '«They» son los ladrones y «it» es la bolsa, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LIBRARY, nums: [1, 4, 5], pregunta: 'It is true', queda: 'Parents changed their minds.',
      ...T(['There was a good road to the school.', 1, 'Busca cómo se llegaba a la escuela.'], ['The wet books were thrown away.', [9, 10, 11], 'Busca qué hicieron con los libros mojados.'], ['A motorbike would be better, Nelson says.', 13, 'Busca por qué no la usa.']), bien: 'One sentence says no.' },
      'No había carretera, los libros mojados se secaron y siguen siendo favoritos, y la moto no cruza el río.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LIBRARY, lineas: ['A teacher takes books to farms on donkeys.', 'One donkey is called Comma.', 'Children borrow books and tell the stories.', 'Parents became interested too.', 'It takes two hours to get to town.', 'He does not change the donkeys for a motorbike.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it works.', 3: 'It is an important change.', 5: 'It is the end and the reason.' }), bien: 'Idea, system, change and reason.' },
      'El nombre del burro y las dos horas son detalles; lo demás es la historia.', 'Deja lo que contarías en una frase a un amigo.'),
  ]);

  const PIANO = {
    id: 'icf-en-piano', title: 'The piano at the station',
    paras: [
      'Last year, somebody left an old piano at the train station in our town. There was a note on it: "Play me. I am free." At first, people only looked at it. Then a cleaner called Marta sat down one night, after work, and played a song that she had learned when she was six.',
      'Someone made a video, and soon the station was full of music. Students played before class, and an old man came every day at five to play the same waltz. The trains were still late, but nobody complained as much as before.',
      'In December, the company wanted to take the piano away because some passengers could not hear the announcements. People signed a letter, and the company had a better idea: now there is a small red light on the piano. When it turns on, you stop playing for a minute.',
      'Marta still cleans the station. On Fridays she gives lessons there for free. Her oldest student is the man of the waltz. He is learning a second song.',
    ],
  };
  const Q = preg(PIANO, 'ingles');
  return mundo('icf-en-corto', 'Textos Cortos', 'ingles', [l1, l2], [
    ['icf-en-corto-1', 'Un mensaje tiene un propósito: pedir, avisar, invitar.', Q('The note on the piano invited people to:', ['Buy the piano', 'Play the piano', 'Clean the piano', 'Move the piano'], 1, '«Play me. I am free» invita a tocarlo; «free» es que no cuesta.', 'Lee la nota que está entre comillas.')],
    ['icf-en-corto-1', 'Busca qué hay que hacer y cuándo.', Q('When the red light turns on, people must:', ['Leave the station', 'Play louder', 'Wait for a minute without playing', 'Buy a ticket'], 2, '«You stop playing for a minute»: hay que parar un minuto.', 'Lee la última oración del párrafo 3.')],
    ['icf-en-corto-2', 'La idea principal vale para todo el texto.', Q('What is the text mainly about?', ['A train company that loses money', 'An old man who can\'t play', 'A cleaner who leaves her job', 'How a piano changed life at a station'], 3, 'Todo el texto cuenta lo que pasó en la estación desde que apareció el piano.', 'Busca la opción que sirve para los cuatro párrafos.')],
    ['icf-en-corto-2', 'La razón está junto a «because».', Q('The company wanted to take the piano away because:', ['Some passengers could not hear the announcements', 'The piano was too old', 'Marta played every night', 'The trains were late'], 0, '«Because some passengers could not hear the announcements».', 'Busca «because» en el párrafo 3.')],
    ['icf-en-corto-2', 'Lo que no se puede señalar, el texto no lo dice.', Q('Which of these does the text NOT say?', ['Marta gives free lessons', 'The old man plays a waltz', 'Students played before class', 'The piano was made in France'], 3, 'Las clases, el vals y los estudiantes están; de dónde es el piano no se dice.', 'Busca cada opción: una no aparece.')],
  ]);
})());
