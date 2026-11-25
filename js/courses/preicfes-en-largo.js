// Preicfes · Inglés · mundo 5 «Textos Largos» (spec 2026-11-25-preicfes-estructura): artículos de nivel intermedio, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const NIGHT = {
    id: 'icf-en-night', title: 'The school that opens at night',
    ficha: { autor: 'Interview by Laura Peña', fuente: 'Magazine «Second Chances»', fecha: 'June 2026' },
    paras: [
      'Every evening, when most schools are dark, the lights of the San Roque school come on. The students are not children. Some of them are builders who still have paint on their hands; others are grandmothers who have already cooked dinner for six. The youngest is nineteen and the oldest is seventy-four. They are all here to finish the studies that they once had to leave.',
      'The night school was the idea of Teresa Lozano, who used to clean the building in the afternoons. She could not read the notes that the teachers left for her, and she was too embarrassed to say so. One day she threw away a box of exams by mistake. Instead of shouting at her, the maths teacher, Mr Ibarra, asked her a simple question: "Would you like to learn?"',
      'At first there were only two of them, sitting in an empty classroom. Then Teresa brought her sister, and her sister brought three neighbours. After a year there were forty students, and the headteacher had to ask the town for money to pay the electricity. Today there are two hundred and ten, as well as a waiting list.',
      'The biggest problem is not the maths, Mr Ibarra says, but tiredness. Many students work for ten hours before they come. For that reason, classes last only forty minutes, and the first five are always for coffee. "You cannot teach a person who is asleep," he explains. The school also looks after the students\' children in a room next door, because otherwise half of the mothers would stay at home.',
      'Not everybody finishes. About a third of the students leave during the first three months, often because they have found a job with a different timetable. The school does not see this as a failure. It keeps their notebooks in a cupboard with their names on them, and almost half of those who leave come back one day to ask for them.',
      'Teresa finished secondary school last December, at the age of sixty-one. She no longer cleans the building: she works in the office, where she writes the notes that other people read. On the wall behind her desk there is an old box. It still says "Exams".',
    ],
  };
  const l1 = leccion('icf-en-largo-1', 'Main idea and details', guion(
    ['Primero, de qué trata', 'Lee el título y la primera oración de cada párrafo.'],
    ['La idea de un párrafo', 'Lo que tienen en común sus oraciones.'],
    ['Detalles', 'La pregunta usa otras palabras: «at the age of sixty-one» es «when she was 61».'],
    ['Orden', 'Las preguntas suelen seguir el orden del texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: NIGHT, frase: 'It is about [0], from [1], and it wants [2].', rot: ['what topic?', 'where does it appear?', 'what for?'],
      ...F(['a school for adults', 0, 'Read the title: at what time does it open?'], ['a magazine', 1, 'Look at the source.'], ['to tell real stories', 2, 'Look at the source and the kind of text.'], ['a school for musicians', null, 'Nothing in the title talks about music.'], ['a text message', null, 'It has an interviewer and a source.'], ['to sell coffee', null, 'A magazine about second chances is not a shop.']),
      luz: [[1, 'The students are not children'], [1, 'finish the studies']], bien: 'Title and source gave it away.' },
      'El título habla de una escuela nocturna y la fuente es una revista de segundas oportunidades.', 'Lee por separado el título, quién escribe y la fuente.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: NIGHT,
      ...F(['presents the students', 0, 'Look for the people in the first lines.'], ['tells how the idea started', 1, 'Look for a mistake with a box.'], ['tells how it grew', 2, 'Look for the numbers of students.'], ['explains a problem and its solutions', 3, 'Look for tired people.'], ['talks about those who leave', 4, 'Look for a cupboard.'], ['tells where Teresa is now', 5, 'Look for December.'], ['explains how to open a bank', null, 'Nobody talks about a bank.']),
      luz: [[1, 'The students are not children'], [2, 'was the idea of Teresa'], [3, 'After a year there were forty'], [4, 'The biggest problem'], [5, 'Not everybody finishes'], [6, 'Teresa finished']], bien: 'Students, idea, growth, problem, leaving, today.' },
      'El texto presenta a los estudiantes, cuenta el origen, el crecimiento, un problema, quiénes se van y el hoy.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: NIGHT,
      ...F(['Why are classes so short?', 3, 'Busca el párrafo que habla de un problema.'], ['How many people study there today?', 2, 'Busca el párrafo que cuenta cómo creció.'], ['What happens to the notebooks?', 4, 'Busca el párrafo de los que no terminan.']),
      luz: [[4, 'classes last only forty minutes'], [3, 'two hundred and ten'], [5, 'It keeps their notebooks']], bien: 'Each question has its paragraph.' },
      'La duración está en el 4, el número en el 3 y los cuadernos en el 5.', 'Di primero de qué habla cada párrafo del texto.'),
    x('linea-vida', 'Put each fact about Teresa in its moment.', { doc: NIGHT, rot: ['before the school', 'at the beginning', 'now'],
      ...F(['She could not read the notes', 0, 'Busca lo que no podía hacer.'], ['She cleaned the building', 0, 'Busca «used to».'], ['She brought her sister', 1, 'Busca «Then».'], ['She works in the office', 2, 'Busca «no longer».']), luz: [[2, 'used to clean'], [3, 'Teresa brought her sister'], [6, 'she works in the office']], bien: 'Used to, then and now.' },
      'No podía leer y limpiaba antes, trajo a su hermana al comienzo y hoy trabaja en la oficina.', '«Used to» es antes; «no longer» marca un cambio.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: NIGHT, nums: [2, 4], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Teresa was embarrassed.', 0, 'Léela junto al párrafo 2.'], ['Mr Ibarra understood why she made the mistake.', 1, '¿Qué le preguntó en vez de gritar?'], ['Without the children\'s room, fewer mothers would come.', 1, '¿Qué harían las madres de otro modo?'], ['Mr Ibarra has three children.', 2, '¿Se habla de su familia?']),
      luz: [[2, 'too embarrassed to say so'], [2, 'Would you like to learn?'], [4, 'otherwise half of the mothers']], bien: 'His question shows that he understood.' },
      'La pena está escrita; que él entendió y lo de las madres se deducen; sus hijos no se nombran.', 'Mira qué hace cada persona, no solo lo que dice.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: NIGHT, nums: [1, 4, 5], pregunta: 'It is true', queda: 'The oldest student is seventy-four.',
      ...T(['The students are children.', 1, 'Busca quiénes no son.'], ['The biggest problem is maths.', 5, 'Busca cuál es el problema.'], ['The school thinks that leaving is a failure.', 12, 'Busca qué piensa la escuela.']), bien: 'One sentence says no.' },
      'No son niños, el problema es el cansancio y la escuela no lo ve como un fracaso.', 'Busca en el texto la palabra clave de cada frase.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: NIGHT, frases: [[2, 'she was too ', 'embarrassed', ' to say so'], [4, 'The school also ', 'looks after', ' the students\' children'], [6, 'She ', 'no longer cleans', ' the building']],
      ...F(['ashamed', 0, 'She could not read: how did she feel?'], ['takes care of', 1, 'What does the school do with them in the room?'], ['doesn\'t clean any more', 2, 'Does she clean now?'], ['proud', null, 'It is the opposite of how she felt.'], ['searches for', null, 'The children are not lost.']), bien: 'The sentence gives the meaning.' },
      '«Embarrassed» es con vergüenza, «looks after» es cuidar y «no longer» es ya no.', 'Mira lo que pasa antes y después de la palabra.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: NIGHT, lineas: ['Adults finish school at night.', 'There is a cupboard.', 'A cleaner and a teacher started it.', 'The school adapts to tired students.', 'Classes begin with coffee.', 'Today Teresa works in the office.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is how it works.', 5: 'It closes the story.' }), bien: 'Idea, start, system and end.' },
      'El mueble y el café son detalles; lo demás es la historia.', 'Deja lo que contarías a alguien en un minuto.'),
  ]);

  const SILENCE = {
    id: 'icf-en-noise', title: 'Please don\'t help me with my silence',
    ficha: { autor: 'Daniela Rueda', fuente: 'Opinion page, «Campus News»', fecha: 'May 2026' },
    paras: [
      'I have been quiet since I was born. My mother says that I did not cry: I looked around. At school, my teachers wrote the same sentence every year: "Daniela is an excellent student, but she should participate more." I am twenty now, and I would like to answer them, in writing, of course.',
      'People usually think that quiet people are sad, rude or afraid. Some are, just as some noisy people are. But silence can also be a way of listening. In a group of five, if four are talking, somebody has to notice that the fifth idea was the best one. Very often, that somebody is me.',
      'I understand why teachers ask us to speak. It is difficult to know what a student is thinking if she never opens her mouth, and in many jobs you have to explain your ideas aloud. I have worked on it, and I can do it. What I do not accept is the word "but" in that sentence, as if being quiet were a hole in an otherwise good person.',
      'Last month, a professor tried something different. Before each discussion, she gave us three minutes to write. Then everybody read one idea. The result surprised her: the students who usually talked the most had the shortest papers, and some of the best questions came from the back of the room. She has used the method ever since, and nobody calls it a favour for shy people any more.',
      'I am not asking noisy people to be quiet. I love my noisy friends; they order the pizza, and I hate the telephone. I am asking for something smaller: a pause. Count to five before you fill the silence. You may discover that it was not empty.',
      'So, dear teachers, thank you for those twelve reports. If you ever write one about a student like me again, please take out three letters. "Daniela is an excellent student, and she listens." You will not need the rest.',
    ],
  };
  const l2 = leccion('icf-en-largo-2', 'The writer and the reader', guion(
    ['¿Para qué escribe?', 'To tell, to explain, to complain, to persuade, to thank…'],
    ['¿Qué siente u opina?', 'Busca adjetivos, «I think», «what I do not accept».'],
    ['¿Qué quiere del lector?', 'Pide, invita o advierte: «I am asking for…».'],
    ['El tono', 'Puede ser serio, divertido, molesto o agradecido.']), [
    x('pinta-tipos', 'Paint each sentence: is it a fact or an opinion?', { doc: SILENCE, plumas: ['fact', 'opinion'],
      ...P(['I am twenty now.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Silence can be a way of listening.', 1, '¿Se puede comprobar o es lo que ella piensa?'], ['A professor gave us three minutes to write.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Being quiet is not a hole in a person.', 1, '¿Se puede comprobar o es lo que ella piensa?']), bien: 'You can check a fact.' },
      'La edad y los tres minutos se comprueban; lo demás es lo que ella piensa del silencio.', 'Pregunta si alguien podría no estar de acuerdo.'),
    x('voz-de-la-fuente', 'Match each purpose with its paragraph.', { ayuda: 'Tira un hilo desde cada propósito hasta su párrafo.', doc: SILENCE, portadas: [['Paragraph 2', 'text'], ['Paragraph 3', 'text'], ['Paragraph 4', 'text'], ['Paragraph 5', 'text']],
      ...T(['to correct a wrong idea', 0, '¿Cuál empieza con lo que la gente piensa?'], ['to accept a reason and set a limit', 1, '¿Cuál empieza con «I understand»?'], ['to give an example', 2, '¿Cuál cuenta lo que hizo alguien?'], ['to ask the reader for something', 3, '¿Cuál dice lo que pide?']), bien: 'Correct, accept, show, ask.' },
      'El 2 corrige una idea, el 3 reconoce y pone un límite, el 4 da un ejemplo y el 5 pide algo.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('genero-o-cita', 'Would the writer **agree** or **disagree**?', { doc: SILENCE, rot: ['she agrees', 'she disagrees'],
      ...F(['Quiet students can have great ideas.', 0, '¿Qué mostró el método de la profesora?'], ['Noisy people should stop talking.', 1, '¿Qué dice que no está pidiendo?'], ['Speaking aloud is useful in many jobs.', 0, '¿Qué reconoce en el párrafo 3?'], ['A quiet person always feels sad.', 1, '¿Qué piensa de esa idea?']), bien: 'She asks for a pause, not for silence.' },
      'Reconoce que hablar sirve y que los callados tienen ideas; no pide callar a nadie ni cree que estén tristes.', 'Busca en el texto qué dice ella de cada idea.'),
    x('subraya-tesis', 'Underline in paragraph 5 the sentence that says **what she is asking for**.', { doc: SILENCE, nums: [5], n: 1, va: ['5.2'], mira: { '5.0': 'She says what she is not asking.', '5.1': 'She talks about her friends.', '5.3': 'It is how to do it, not the request itself.', '5.4': 'It is what may happen after.' }, bien: 'She asks for something small.' },
      '«I am asking for something smaller: a pause» dice lo que pide.', 'Una oración dice lo que no pide; busca la que dice lo que sí.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: SILENCE, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['They had three minutes.', 0, 'It is true, but what happened after that?'], ['Writing first helped quiet students to share good ideas.', 1, 'Does it cover the whole paragraph?'], ['Students who talk a lot never think.', 2, 'Does the text say «never»?']),
      luz: [[4, 'she gave us three minutes to write'], [4, 'some of the best questions']], bien: 'The method gave everybody a chance.' },
      'Los tres minutos son un detalle; «never» dice de más; la idea justa es que escribir antes ayudó.', 'La idea justa explica para qué sirvió el método.'),
    x('tira-referente', 'What do these words refer to?', { doc: SILENCE, texto: 'I love |my noisy friends|; they order |the pizza|, and it is always good.',
      ...T(['«they»', 0, 'Put it in the sentence: who orders?'], ['«it»', 1, 'Put it in the sentence: what is good?']), bien: 'People, and one thing.' },
      '«They» son los amigos que piden y «it», la pizza, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: SILENCE, nums: [5, 6], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['She hates the telephone.', 0, 'Busca lo que odia.'], ['The three letters are the word "but".', 1, 'Compara la frase de los reportes con la nueva.'], ['She writes with humour.', 1, '¿Cómo suena lo de la pizza y los reportes?'], ['Her teachers have read this text.', 2, '¿Se dice si lo leyeron?']),
      luz: [[5, 'I hate the telephone'], [6, 'take out three letters']], bien: 'But becomes and.' },
      'Lo del teléfono está escrito; la palabra y el humor se deducen; si la leyeron no se sabe.', 'Compara las dos frases sobre Daniela, al comienzo y al final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: SILENCE, lineas: ['A quiet student answers her teachers.', 'She did not cry when she was born.', 'Silence can be a way of listening.', 'Writing first gave everybody a chance.', 'Her friends order pizza.', 'She asks people for a pause.'], ...S([1, 4], { 0: 'It is who writes and why.', 2: 'It is her main opinion.', 3: 'It is her example.', 5: 'It is her request.' }), bien: 'Purpose, opinion, example and request.' },
      'El nacimiento y la pizza son detalles; lo demás es su argumento.', 'Deja lo que ella quiere que entiendas al leerla.'),
  ]);

  const MAP = {
    id: 'icf-en-map', title: 'The man who draws wrong maps',
    paras: [
      'If you get lost in the old part of our city, there is a good chance that it is Fabio Serna\'s fault. For eleven years he has been drawing maps for tourists, and every one of them has a mistake. He makes the mistakes on purpose.',
      'It started when he worked in a hotel. Guests used to arrive with a perfect map on their phones, walk straight to the cathedral, take the same photo and walk straight back. "They had seen everything and met nobody," he says. So he drew a map in which one street was missing. The first couple who used it came back three hours late, with a bag of bread and the telephone number of a baker who had walked with them.',
      'His maps are free, and at the bottom they say, in very small letters: "This map has one mistake. Ask somebody." He never puts the mistake near a dangerous street, and he changes it every month, because the neighbours enjoy being asked but not always by the same people at the same corner.',
      'Not everyone is amused. A tour company complained to the mayor that the maps made visitors miss their buses. The mayor\'s answer was to order two thousand copies. Since then, a university has studied the effect: visitors with Fabio\'s map talk to six local people on average, while those with a phone talk to one, and that one is usually the waiter.',
      'I asked Fabio if he was not tired of drawing the same streets. He gave me a map of my own neighbourhood, where I have lived for twenty years. I looked for the mistake all afternoon. In the end I had to ask a neighbour. We had never spoken before.',
    ],
  };
  const Q = preg(MAP, 'ingles');
  return mundo('icf-en-largo', 'Textos Largos', 'ingles', [l1, l2], [
    ['icf-en-largo-1', 'La idea principal sirve para todo el texto.', Q('What is the text mainly about?', ['A hotel that loses its guests', 'A tour company with late buses', 'Maps with a mistake that make people talk to each other', 'A baker who helps tourists'], 2, 'Todo el texto habla de los mapas con un error y de lo que producen.', 'Busca la opción que sirve para los cinco párrafos.')],
    ['icf-en-largo-1', 'La pregunta usa otras palabras que el texto.', Q('Why does Fabio change the mistake every month?', ['Because the streets are dangerous', 'So that the same neighbours are not always asked', 'Because the mayor told him to', 'To sell more maps'], 1, 'Los vecinos disfrutan que les pregunten, pero no siempre los mismos en la misma esquina.', 'Lee el final del párrafo 3.')],
    ['icf-en-largo-1', 'Los números: mira de quién es cada uno.', Q('According to the university, people who use a phone usually talk to:', ['One person, often a waiter', 'Six local people', 'Nobody', 'Two thousand people'], 0, '«Those with a phone talk to one, and that one is usually the waiter».', 'Hay dos números en el párrafo 4: mira cuál es el del teléfono.')],
    ['icf-en-largo-2', 'Pregunta para qué escribe el autor.', Q('The writer\'s main purpose is to:', ['Complain about tourists', 'Sell a map', 'Teach people to draw', 'Tell the story of an unusual project'], 3, 'Cuenta la historia de Fabio y de sus mapas, sin vender ni quejarse.', 'Piensa qué hace el autor en casi todos los párrafos.')],
    ['icf-en-largo-2', 'El final muestra lo que el autor aprendió.', Q('At the end, the writer realises that:', ['The map was perfect', 'Fabio is tired of his work', 'He should buy a phone', 'He didn\'t know the people who live near him'], 3, 'Después de veinte años nunca había hablado con su vecino.', 'Lee las dos últimas oraciones.')],
    ['icf-en-largo-2', 'El tono se nota en los gestos y las palabras.', Q('How does the mayor feel about the maps?', ['He likes them', 'He is afraid of them', 'He hasn\'t seen them', 'He wants to stop them'], 0, 'Ante la queja, mandó pedir dos mil copias: le gustan.', 'Mira qué hizo cuando recibió la queja.')],
  ]);
})());
