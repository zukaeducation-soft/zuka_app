// Preicfes · Inglés · mundo 2 «Conversaciones Cortas» (spec 2026-11-25-preicfes-estructura): completar una conversación con la respuesta
// que encaja. Diálogos escritos para Zuka; las explicaciones van en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BUS = {
    id: 'icf-en-bus', title: 'On the way to school',
    ficha: { autor: 'English club', fuente: 'School podcast script', fecha: 'March 2026' },
    paras: [
      'Laura is at the bus stop. It is half past six and it is raining. Diego arrives with a big green umbrella. "Good morning! How are you?" he asks. "Not very well," says Laura. "I forgot my umbrella and my shoes are wet." Diego laughs and opens his. "Don\'t worry. There is room for two."',
      'While they wait, they talk about the English test. "What time does it start?" asks Diego. "At eight," answers Laura, "in room twelve." Diego looks nervous. He studied for two hours last night, but he does not remember the past tense. "Can you help me?" he asks. "Of course," she says, and she takes out her notebook.',
      'The bus is late. At ten to seven a woman asks them a question. "Excuse me, does this bus go to the hospital?" "No, it doesn\'t," says Diego. "You need number forty. It stops across the street." The woman thanks them and runs, because the forty is already coming.',
      'Finally their bus arrives. It is full, so they have to stand. "How long does it take?" asks a new student next to them. His name is Samuel and it is his first week. "About twenty minutes," says Laura. "Which class are you in?" "I\'m in 11B," he says. "So are we!" answer Laura and Diego at the same time.',
      'When they get off, the rain has stopped. Samuel does not know where room twelve is. "Why don\'t you come with us?" says Laura. "That would be great," he says. They are five minutes late, but the teacher is still looking for her keys.',
    ],
  };
  const l1 = leccion('icf-en-dialogos-1', 'Everyday replies', guion(
    ['La palabra que pregunta', 'What time pide una hora; where, un lugar; who, una persona; how long, una duración; why, una razón.'],
    ['Do, does, is', 'Does it go…? se responde Yes, it does o No, it doesn’t. Is it…? se responde Yes, it is.'],
    ['Dar y aceptar', 'Why don’t you come? invita; That would be great acepta.'],
    ['La trampa', 'Una opción puede repetir una palabra de la pregunta y no responderla.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: BUS,
      ...F(['What does Laura forget?', 0, 'Busca el comienzo en la parada.'], ['What subject is the test?', 1, 'Busca el comienzo en el que hablan de una prueba.'], ['Why do they stand on the bus?', 3, 'Busca el comienzo en que llega el bus.']),
      luz: [[1, 'I forgot my umbrella'], [2, 'the English test'], [4, 'It is full']], bien: 'The beginning of each paragraph helps.' },
      'La parada abre el 1, la prueba el 2 y la llegada del bus el 4.', 'Lee solo el comienzo de cada párrafo y busca la palabra clave.'),
    x('voz-de-la-fuente', 'Match each question with its answer.', { ayuda: 'Tira un hilo desde cada respuesta hasta su pregunta.', doc: BUS, portadas: [['What time?', 'question'], ['How long?', 'question'], ['Which class?', 'question'], ['Does it go there?', 'question']],
      ...T(['At eight.', 0, '¿Es una hora, una duración, un grupo o un sí/no?'], ['About twenty minutes.', 1, '¿Es una hora, una duración, un grupo o un sí/no?'], ['I\'m in 11B.', 2, '¿Es una hora, una duración, un grupo o un sí/no?'], ['No, it doesn\'t.', 3, '¿Es una hora, una duración, un grupo o un sí/no?']), bien: 'The question word asks for the answer.' },
      '«What time» pide hora, «how long» duración, «which class» un grupo y «does» se contesta con «does».', 'Mira qué clase de dato pide cada palabra de pregunta.'),
    x('genero-o-cita', 'Is it an **invitation** or a **request for help**?', { doc: BUS, rot: ['invitation', 'request for help'],
      ...F(['Why don\'t you come with us?', 0, '¿Ofrece un plan o pide algo?'], ['Can you help me?', 1, '¿Ofrece un plan o pide algo?'], ['Could you open the door, please?', 1, '¿Ofrece un plan o pide algo?'], ['Would you like to have lunch?', 0, '¿Ofrece un plan o pide algo?'], ['Let\'s go to the park.', 0, '¿Ofrece un plan o pide algo?']), bien: 'Why don\'t you, would you like, let\'s: plans.' },
      '«Why don’t you», «would you like» y «let’s» invitan; «can you» y «could you» piden un favor.', 'Pregunta si quien habla ofrece hacer algo juntos o necesita un favor.'),
    x('pinta-voces', 'Paint each sentence with its speaker.', { doc: BUS, plumas: ['Laura', 'Diego', 'Samuel'],
      ...P(['My shoes are wet.', 0, 'Busca quién no tiene paraguas.'], ['There is room for two.', 1, 'Busca quién abre el paraguas.'], ['That would be great.', 2, 'Busca quién recibe la invitación.'], ['At eight, in room twelve.', 0, 'Busca quién «answers».'], ['You need number forty.', 1, 'Busca quién le responde a la mujer.']), bien: 'Says, asks and answers show the speaker.' },
      'Los verbos «says», «asks» y «answers» muestran quién habla en cada caso.', 'Busca el verbo de decir que está después de las comillas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: BUS, frases: [[3, 'The bus is ', 'late', '.'], [5, 'When they ', 'get off', ', the rain has stopped'], [4, '', 'Finally', ' their bus arrives']],
      ...F(['not on time', 0, 'They wait and wait: how is the bus?'], ['leave the bus', 1, 'They arrive at school: what do they do?'], ['at last', 2, 'After a long time, the bus arrives.'], ['very fast', null, 'It is slow today, not quick.'], ['never', null, 'The bus does arrive.']), bien: 'Same idea.' },
      '«Late» es «not on time», «get off» es «leave the bus» y «finally» es «at last».', 'Pon la ficha en la oración y mira si cuenta lo mismo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BUS, nums: [3, 4], pregunta: 'It is true', queda: 'Samuel is in the same class.',
      ...T(['The bus is early.', 0, 'Busca «late».'], ['Number forty stops far away.', 5, 'Busca dónde para el cuarenta.'], ['They sit on the bus.', 8, 'Busca «stand».']), bien: 'One sentence says no.' },
      'El bus llega tarde, el cuarenta para al frente y en el bus van de pie.', 'Busca la palabra contraria a la de cada frase.'),
    x('tira-referente', 'What do these words refer to?', { doc: BUS, texto: '|Diego| has |a green umbrella| and |Laura| forgot hers. He opens it and they wait.',
      ...T(['«He»', 0, 'Put it in the sentence: who opens?'], ['«it»', 1, 'Put it in the sentence: what can you open?']), bien: 'He is a boy; it is a thing.' },
      '«He» es Diego, el único hombre; «it» es la cosa que se abre: el paraguas.', '«He» es para un hombre; «it», para una sola cosa.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BUS, lineas: ['Laura and Diego wait for the bus.', 'The umbrella is green.', 'They talk about the test.', 'They help a woman and meet Samuel.', 'It is bus number forty.', 'They go to class together.'], ...S([1, 4], { 0: 'It is where the story begins.', 2: 'It is what worries Diego.', 3: 'It is what happens while they wait.', 5: 'It is how the story ends.' }), bien: 'Main events stay.' },
      'El color del paraguas y el número del otro bus son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si todavía se entiende la historia.'),
  ]);

  const TIENDA = {
    id: 'icf-en-tienda', title: 'A day at the clothes shop',
    ficha: { autor: 'Students of tourism', fuente: 'Customer service handbook', fecha: 'April 2026' },
    paras: [
      'Paula works at a clothes shop on Saturdays. Her boss, Mr. Reyes, has one rule: polite words cost nothing. He says that customers forget the price, but they do not forget how you speak to them.',
      'The first customer is a man who looks angry. "This shirt has a hole in it," he says. "I\'m very sorry about that," answers Paula. "Would you like a new one or your money back?" The man did not expect it. "A new one, please," he says, and his voice is softer.',
      'Later, a tourist comes in. She does not speak Spanish. "Could you tell me how much these boots are?" "They\'re eighty dollars," says Paula. "Oh, that\'s a bit too expensive for me." "I see. May I show you another pair?" The tourist smiles. "Yes, please. That\'s very kind of you."',
      'In the afternoon a boy asks, "Do you mind if I take a photo of this jacket? I want to show it to my mother." Paula knows that Do you mind is a strange question, because the polite answer is no. "Not at all," she says. "Go ahead." Ten minutes later the mother arrives and buys two jackets.',
      'At six, Mr. Reyes closes the door. "How was your day?" he asks. "Tiring, but nice," says Paula. "Would you mind working next Saturday too?" he asks. She thinks for a second. "I\'d love to, but I have an exam." "No problem," he says. "Good luck with it." Paula goes home thinking that her boss follows his own rule.',
    ],
  };
  const l2 = leccion('icf-en-dialogos-2', 'Polite answers', guion(
    ['Pedir con cortesía', 'Could you…?, May I…? y Would you like…? son más corteses que una orden.'],
    ['Do you mind', 'Do you mind if…? pregunta si molesta: para decir que sí se puede, se responde No o Not at all.'],
    ['Rechazar sin ofender', 'I’d love to, but… dice que no con amabilidad y da la razón.'],
    ['Disculpas y suerte', 'A una queja: I’m sorry. A un examen: Good luck. A un favor: That’s very kind of you.']), [
    x('voz-de-la-fuente', 'Match each situation with the polite answer.', { ayuda: 'Tira un hilo desde cada situación hasta su respuesta.', doc: TIENDA, portadas: [['I\'m so sorry', 'answer'], ['Good luck!', 'answer'], ['Not at all', 'answer'], ['You\'re welcome', 'answer']],
      ...T(['This phone is broken!', 0, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['I have an exam today.', 1, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Do you mind if I sit here?', 2, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Thank you for your help.', 3, '¿La persona se queja, agradece, pide permiso o va a hacer algo?']), bien: 'Complaint, exam, permission, thanks.' },
      'A una queja se pide disculpa, a un examen se desea suerte, al permiso «not at all» y a las gracias «you’re welcome».', 'Di primero qué hace la persona: se queja, agradece, pide o cuenta.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: TIENDA,
      ...F(['presents the rule', 0, 'Look for the boss and his idea.'], ['an angry customer', 1, 'Look for a hole.'], ['a foreign customer', 2, 'Look for the boots.'], ['a question about a photo', 3, 'Look for «Do you mind».'], ['the end of the day', 4, 'Look for the hour.'], ['a robbery', null, 'Nobody takes anything without paying.']),
      luz: [[1, 'one rule'], [2, 'angry'], [3, 'a tourist'], [4, 'a photo'], [5, 'At six']], bien: 'Rule, three customers and the end.' },
      'El texto da la regla, muestra tres clientes y termina con el día.', 'Busca en cada párrafo quién entra o qué hora es.'),
    x('genero-o-cita', 'Does it say **yes** or **no**?', { doc: TIENDA, rot: ['says yes', 'says no'],
      ...F(['Do you mind if I open it? Not at all.', 0, 'Si no le molesta, ¿se puede?'], ['Would you like to come? I\'d love to, but I can\'t.', 1, 'Lee lo que va después de «but».'], ['May I come in? Go ahead.', 0, '¿Le da permiso o no?'], ['Can I smoke here? I\'m afraid not.', 1, '¿Le da permiso o no?']), bien: 'Not at all means yes, you can.' },
      '«Not at all» y «go ahead» dan permiso; «but I can’t» y «I’m afraid not» lo niegan con cortesía.', 'Con «Do you mind», decir «no» es dar permiso.'),
    x('pinta-tipos', 'Paint each sentence: does it **offer**, **ask permission** or **refuse**?', { doc: TIENDA, plumas: ['offers', 'asks permission', 'refuses'],
      ...P(['Would you like a new one?', 0, '¿Da algo, pide permiso o dice que no?'], ['Do you mind if I take a photo?', 1, '¿Da algo, pide permiso o dice que no?'], ['I\'d love to, but I have an exam.', 2, '¿Da algo, pide permiso o dice que no?'], ['May I use your pen?', 1, '¿Da algo, pide permiso o dice que no?'], ['Can I get you some water?', 0, '¿Da algo, pide permiso o dice que no?']), bien: 'Three ways of being polite.' },
      '«Would you like» y «can I get you» ofrecen; «do you mind» y «may I» piden permiso; «I’d love to, but» rechaza.', 'Pregunta quién hará la acción y si la acepta.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: TIENDA, nums: [2, 4], pregunta: 'It is true', queda: 'Paula is polite with everybody.',
      ...T(['The man wants his money back.', 5, 'Busca lo que pide al final.'], ['The man waited for that answer.', 4, 'Busca «expect».'], ['The mother buys one jacket.', 11, 'Busca cuántas compra.']), bien: 'One sentence is enough.' },
      'Pide una camisa nueva, no esperaba esa respuesta y la madre compra dos chaquetas.', 'Busca el dato exacto que cambia cada frase.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: TIENDA, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The boots are eighty dollars.', 0, 'Léela junto a la respuesta de Paula.'], ['The man feels better.', 1, '¿Cómo es su voz al final?'], ['The tourist does not speak Spanish.', 0, 'Léela junto a la segunda oración del párrafo 3.'], ['The tourist is from Canada.', 2, '¿Alguna oración dice su país?']),
      luz: [[3, 'eighty dollars'], [2, 'his voice is softer'], [3, 'She does not speak Spanish']], bien: 'A softer voice shows a feeling.' },
      'El precio y el idioma están escritos; que se siente mejor se deduce de su voz; el país no aparece.', 'Busca pistas en cómo hablan las personas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: TIENDA, frases: [[2, 'a man who looks ', 'angry', ''], [3, 'a bit too ', 'expensive', ' for me'], [5, '"', 'Tiring', ', but nice," says Paula']],
      ...F(['not happy at all', 0, 'His shirt has a hole: how does he feel?'], ['high in price', 1, 'She cannot pay eighty dollars.'], ['hard', 2, 'She worked all day: how was it?'], ['cheap', null, 'It is the opposite.'], ['hungry', null, 'It looks similar, but it is about food.']), bien: 'Angry is not hungry.' },
      '«Angry» es enojado (no «hungry»), «expensive» es caro y «tiring» es cansado.', 'Cuidado con palabras que se parecen: prueba en la oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: TIENDA, lineas: ['Paula\'s boss believes in polite words.', 'She works on Saturdays.', 'She calms an angry customer.', 'She helps a tourist and a boy.', 'The shop closes at six.', 'Her boss is polite with her too.'], ...S([1, 4], { 0: 'It is the rule of the story.', 2: 'It is the first example.', 3: 'They are the other examples.', 5: 'It is the end of the idea.' }), bien: 'The rule and its examples stay.' },
      'El día y la hora de cierre son detalles; la regla y sus ejemplos son la historia.', 'Busca lo que tiene que ver con hablar con cortesía.'),
  ]);

  const PLAN = {
    id: 'icf-en-plan', title: 'The trip that almost did not happen',
    ficha: { autor: 'Eleventh grade', fuente: 'Class blog', fecha: 'May 2026' },
    paras: [
      'Our class is going to visit the desert next month. We have dreamed about it for two years, and last Friday we had a meeting to decide everything. It was not easy. Everybody had a different idea and, at the beginning, nobody was listening.',
      '"I think we should go by bus," said Manuela. "It\'s cheaper." "I don\'t agree," answered Nico. "It takes fourteen hours. I\'d rather fly." Then Tatiana said quietly, "I\'m worried about the money. My family can\'t pay for a plane." There was a long silence.',
      'Nico looked at the floor. "I\'m sorry. I didn\'t think about that," he said. "What if we sell food at the school fair?" suggested Manuela. "That\'s a brilliant idea!" said almost everybody. "I\'m going to make empanadas," said Tatiana, and for the first time she looked happy.',
      'We sold three hundred empanadas and two hundred juices. We were exhausted, but we were also proud. On Monday we counted the money: it was enough for a comfortable bus, but not for a plane. "I\'m a little disappointed," said Nico, "but I\'m excited too. We can sing for fourteen hours." "Oh no," said the teacher, and we all laughed.',
      'Now everything is ready. We will leave on the tenth of June at five in the morning. If it rains, we will visit the museum first. Tatiana is bringing a speaker, Manuela is bringing the tickets, and Nico, who wanted to fly, is bringing a pillow.',
    ],
  };
  const l3 = leccion('icf-en-dialogos-3', 'Feelings and plans', guion(
    ['Cómo se siente', 'Worried, proud, exhausted, excited: la respuesta debe ir con el sentimiento.'],
    ['Planes', 'Be going to: lo que ya se decidió. Will: lo que se promete o se calcula. What if…?: se sugiere.'],
    ['De acuerdo o no', 'I agree, So do I aceptan; I don’t agree, I’d rather… prefieren otra cosa.'],
    ['Reaccionar', 'A una buena noticia: That’s great! A una mala: I’m sorry to hear that.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: PLAN, rot: ['at the meeting', 'the fair and Monday', 'the trip'],
      ...F(['Nobody was listening', 0, 'Busca cuándo tenían que decidir.'], ['They sold empanadas', 1, 'Busca el verbo «sold».'], ['They counted the money', 1, 'Busca el día.'], ['They will leave at five', 2, 'Busca «will».']), luz: [[1, 'we had a meeting'], [4, 'On Monday we counted the money'], [5, 'We will leave']], bien: 'Past, past and future.' },
      'La reunión va primero, luego la venta y el conteo, y el viaje está en futuro con «will».', 'Mira el tiempo del verbo y los días que nombra el texto.'),
    x('voz-de-la-fuente', 'Match each news with the best reaction.', { ayuda: 'Tira un hilo desde cada noticia hasta la reacción.', doc: PLAN, portadas: [['I\'m sorry to hear that', 'reaction'], ['Congratulations!', 'reaction'], ['Don\'t worry, I\'ll help you', 'reaction'], ['Have a nice trip!', 'reaction']],
      ...T(['My dog is very ill.', 0, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I won the race!', 1, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I can\'t do this homework.', 2, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['We leave for the desert now.', 3, '¿Es una noticia triste, un logro, un problema o una despedida?']), bien: 'Each feeling has its answer.' },
      'A lo triste se lamenta, al logro se felicita, al problema se ofrece ayuda y al viaje se desea suerte.', 'Nombra primero el sentimiento de quien habla.'),
    x('genero-o-cita', 'Does the speaker **agree** or **disagree**?', { doc: PLAN, rot: ['agrees', 'disagrees'],
      ...F(['That\'s a brilliant idea!', 0, '¿Le gusta la propuesta o prefiere otra?'], ['I\'d rather fly.', 1, '¿Le gusta la propuesta o prefiere otra?'], ['So do I.', 0, '¿Piensa lo mismo o distinto?'], ['I don\'t think so.', 1, '¿Piensa lo mismo o distinto?'], ['You\'re right.', 0, '¿Piensa lo mismo o distinto?']), bien: 'I\'d rather means another choice.' },
      '«Brilliant», «so do I» y «you’re right» aceptan; «I’d rather» y «I don’t think so» prefieren otra cosa.', 'Pregunta si quien habla seguiría con la misma idea.'),
    x('pinta-voces', 'Paint each idea with its speaker.', { doc: PLAN, plumas: ['Manuela', 'Nico', 'Tatiana'],
      ...P(['A bus is cheaper.', 0, 'Busca quién habla primero en la reunión.'], ['I\'d rather fly.', 1, 'Busca quién «answered».'], ['I\'m worried about the money.', 2, 'Busca quién habló «quietly».'], ['What if we sell food?', 0, 'Busca quién «suggested».'], ['We can sing for fourteen hours.', 1, 'Busca quién está un poco decepcionado.']), bien: 'Said, answered and suggested.' },
      'Manuela propone el bus y la venta, Nico prefiere volar y canta, Tatiana se preocupa por el dinero.', 'Busca el nombre que está junto a cada cita.'),
    x('comprueba-apuesta', 'Underline the sentence in paragraph 3 that shows Tatiana **changes** her feelings.', { doc: PLAN, nums: [3], apuesta: 'Tatiana is not worried any more.', ...S(['3.5'], { '3.0': 'It is about another person.', '3.1': 'Somebody says sorry here.', '3.2': 'Somebody explains why he is sorry.', '3.3': 'It is a suggestion.', '3.4': 'It is the reaction of the group.' }), bien: 'For the first time she looked happy.' },
      'La última oración dice que por primera vez se vio feliz: antes estaba preocupada.', 'Busca la oración con el nombre de Tatiana y un adjetivo de sentimiento.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: PLAN, frases: [[4, 'We were ', 'exhausted', ', but we were also proud'], [3, 'That\'s a ', 'brilliant', ' idea'], [2, 'I\'m ', 'worried', ' about the money']],
      ...F(['very tired', 0, 'They worked a lot: how did they feel?'], ['very good', 1, 'Almost everybody liked it.'], ['not calm', 2, 'She thinks her family cannot pay.'], ['very angry', null, 'Nobody is fighting here.'], ['bored', null, 'They were working, not waiting.']), bien: 'Feelings in context.' },
      '«Exhausted» es muy cansado, «brilliant» muy bueno y «worried» preocupado.', 'Piensa qué pasó antes para que se sintieran de esa manera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: PLAN, nums: [4, 5], pregunta: 'It is true', queda: 'They are going to the desert by bus.',
      ...T(['They got money for a plane.', 2, 'Busca para qué alcanzó.'], ['They leave at night.', 7, 'Busca la hora de salida.'], ['If it rains, they will not go out.', 8, 'Busca la palabra «If».']), bien: 'One sentence says no.' },
      'Alcanzó para un bus, salen a las cinco de la mañana y si llueve van al museo.', 'Busca el dato de dinero, de hora y de lluvia.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: PLAN, lineas: ['The class plans a trip.', 'They sold two hundred juices.', 'They disagree about the bus and the plane.', 'They sell food to get money.', 'Nico brings a pillow.', 'They go by bus and they are happy.'], ...S([1, 4], { 0: 'It is the beginning of the story.', 2: 'It is the problem.', 3: 'It is the solution.', 5: 'It is the end.' }), bien: 'Plan, problem, solution and end.' },
      'La cantidad de jugos y la almohada son detalles; lo demás es plan, problema, solución y final.', 'Deja el plan, el problema, la solución y el final.'),
  ]);

  const CAFE = {
    id: 'icf-en-cafe', title: 'Two friends and a new job',
    paras: [
      'Sara meets her friend Julio at a café on Sunday morning. "You look happy," she says. "I am," he answers. "I got the job at the animal hospital!" "Congratulations!" says Sara. "When do you start?" "Tomorrow at seven. I\'m a little nervous."',
      'The waiter comes. "Are you ready to order?" "Could I have a coffee, please?" says Julio. "I\'m sorry, the machine is broken," says the waiter. "Would you like some tea?" Julio does not like tea very much, but he smiles. "Tea is fine, thank you."',
      '"How are you going to get there?" asks Sara. "By bike. It takes half an hour." "Do you mind if I go with you? My school is on the same street." "Not at all," says Julio. "We can talk on the way."',
      'Sara looks at her watch. Her grandmother is waiting for her. "I\'d love to stay longer, but I have to go," she says. "What about lunch on Friday? You can tell me about your first week." "That sounds great," he says. "And Sara… thanks for coming."',
    ],
  };
  const Q = preg(CAFE, 'ingles');
  return mundo('icf-en-dialogos', 'Conversaciones Cortas', 'ingles', [l1, l2, l3], [
    ['icf-en-dialogos-1', '«When» pide un momento y «how» con un viaje pide el medio.', Q('When Sara asks "How are you going to get there?", she wants to know:', ['The time Julio starts', 'The place of the hospital', 'The way Julio will travel', 'The price of the bike'], 2, 'Julio responde «By bike»: la pregunta es por el medio de transporte.', 'Mira qué responde Julio a esa pregunta.')],
    ['icf-en-dialogos-1', 'La respuesta debe dar el dato que pide la palabra de pregunta.', Q('Which answer is correct for "When do you start?"', ['By bike', 'Tomorrow at seven', 'At the animal hospital', 'A little nervous'], 1, '«When» pide un momento: mañana a las siete.', '¿Cuál opción es un momento?')],
    ['icf-en-dialogos-2', 'A «Do you mind if…?» se responde «Not at all» para dar permiso.', Q('When Julio says "Not at all", he means that:', ['He prefers to go alone', 'He does not like Sara', 'He does not have a bike', 'Sara can go with him'], 3, 'No le molesta: ella puede ir con él. Después dice que pueden hablar en el camino.', 'Lee lo que Julio agrega después.')],
    ['icf-en-dialogos-2', '«I’d love to, but…» rechaza con cortesía.', Q('Sara says "I\'d love to stay longer, but I have to go" to:', ['Leave politely', 'Order more tea', 'Invite the waiter', 'Say she is bored'], 0, 'Dice con cortesía que no puede quedarse, porque la esperan.', 'Fíjate en lo que va después de «but».')],
    ['icf-en-dialogos-3', 'La reacción va con la noticia: a un logro se felicita.', Q('Sara says "Congratulations!" because Julio:', ['Has a new job', 'Drinks tea', 'Has a new bike', 'Is nervous'], 0, 'Acaba de contar que consiguió el trabajo en el hospital de animales.', 'Lee lo que Julio dijo justo antes.')],
    ['icf-en-dialogos-3', '«What about…?» sugiere un plan.', Q('At the end, Sara and Julio decide to:', ['Work together', 'Go to see her grandmother', 'Have lunch on Friday', 'Drink coffee every Sunday'], 2, 'Sara sugiere almorzar el viernes y Julio responde que suena muy bien.', 'Busca la sugerencia que empieza con «What about».')],
  ]);
})());
