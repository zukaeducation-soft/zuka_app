// Preicfes · Inglés · mundo 1 «Avisos y Vocabulario» (spec 2026-11-20-curso-preicfes): las primeras partes de la prueba de inglés:
// qué dice un aviso, dónde se vería y qué palabra corresponde a una descripción. Las instrucciones van en español, como en el
// examen; los textos, en inglés. Cada lección trabaja un texto original en 7 juegos LEC y un juego en movimiento; la evaluación,
// otros avisos con preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg } = ICF;

  const AVISOS = {
    id: 'icf-avisos', title: 'Notices around town',
    paras: [
      'SCHOOL LIBRARY. Please return books by Friday. Students who return books late cannot borrow new ones for two weeks. If you need more time, ask the librarian before the date on your card.',
      'CITY PARK. No cycling on the grass. Bicycles must stay on the path, and dogs must be on a lead at all times. The park closes at 7 p.m. from November to February.',
      'DANGER: WET FLOOR. The cleaning team is working in this area. Please use the stairs on the left until the floor is dry. Thank you for your patience.',
      'SCIENCE MUSEUM. Free entry for students on Wednesdays. Show your student card at the ticket office. Groups of more than ten people must book their visit one week before.',
      'BUS STATION. The 8:15 bus to the airport is cancelled today because of the storm. Passengers can take the 9:00 bus with the same ticket. We are sorry for any problems this may cause.',
      'LOST AND FOUND. Did you lose a blue jacket in the gym on Monday? Come to the main office before 3 p.m. and describe it to collect it. Things that nobody collects go to charity after one month.',
    ],
  };

  const MERCADO = {
    id: 'icf-mercado', title: 'Saturday at the market',
    ficha: { autor: 'Students of an English class', fuente: 'School magazine', fecha: 'June 2026' },
    paras: [
      'Every Saturday morning, the main square of San Rafael changes. At six o\'clock, farmers from the mountains arrive in old trucks full of potatoes, oranges, cheese and fresh flowers. By seven, the square is full of tables, voices and the smell of coffee.',
      'Doña Rosa has sold vegetables here for thirty years. She grows everything on her small farm, two hours away, without chemicals. "People come back because they know where their food comes from," she says. Her daughter Camila helps her now, and she uses a phone to take payments, so customers do not need cash.',
      'Next to them, a young baker called Julián sells bread made with corn and cheese. He started with one basket two years ago. Now he bakes three hundred pieces every Friday night, and he usually sells everything before ten o\'clock.',
      'The market is not only a place to shop. Children run between the tables, old friends meet for breakfast, and on the first Saturday of the month a band plays music in the square. For many families, it is the most important day of the week.',
      'However, life is not easy for the farmers. Transport is expensive, and when it rains the roads become dangerous. Some young people prefer to move to the city. "If nobody buys from us, the farms will disappear," Doña Rosa explains. That is why the town council now gives free stalls to farmers who come every week.',
    ],
  };

  const l1 = leccion('icf-en-avisos-1', 'Signs and notices', [
    sc(6, 'La prueba de inglés empieza con avisos cortos: hay que saber **qué dicen** y **dónde se verían**. No hace falta entender cada palabra, sino la idea.', { title: 'Avisos cortos' }),
    sc(7, 'Las palabras que mandan: **No** + verbo en -ing prohíbe («No smoking»); **must** obliga («You must wear a helmet»); **Please** pide con cortesía («Please close the door»).', { title: 'Prohibir, obligar, pedir' }),
    sc(7, 'Ejemplo: «Staff only» quiere decir «solo empleados»: no se puede entrar si no trabajas allí. «Out of order» quiere decir «no funciona».', { title: 'Avisos que se repiten' }),
    sc(7, 'Las palabras de tiempo cambian todo: «until» (hasta), «before» (antes de), «after» (después de), «from … to …» (de … a …).', { title: 'Hasta, antes, después' }),
    sc(6, 'Truco del examen: lee la opción y vuelve al aviso. Una opción que agrega algo que el aviso no dice es incorrecta, aunque suene lógica.', { title: 'Volver al aviso' }),
  ], [
    x('donde-mirar', 'Where can you read this? Lleva cada pregunta al aviso donde la buscarías.', { doc: AVISOS,
      ...F(['When can a student go in for free?', 3, 'Busca el lugar que cobra entrada.'], ['Where can I ride my bike?', 1, 'Busca un lugar al aire libre.'], ['What can I do if my bus does not leave?', 4, 'Busca el lugar de donde salen los viajes.']),
      luz: [[2, 'Bicycles must stay on the path'], [4, 'Free entry for students on Wednesdays'], [5, 'Passengers can take the 9:00 bus']], bien: 'The first words say the place.' },
      'Las primeras palabras de cada aviso dicen el lugar: museo (free entry), parque (bike) y estación (bus).', 'Lee solo el lugar con el que empieza cada aviso y piensa qué se hace ahí.'),
    x('genero-o-cita', 'Is it a **rule** you must follow or just **information**?', { doc: AVISOS, rot: ['a rule', 'information'],
      ...F(['Dogs must be on a lead', 0, 'Mira el verbo: «must», ¿cuenta u obliga?'], ['The park closes at 7 p.m.', 1, '¿Te pide hacer algo o te dice una hora?'], ['No cycling on the grass', 0, '«No» + «-ing», ¿informa o prohíbe?'], ['The 8:15 bus is cancelled', 1, '¿Te pide hacer algo o te cuenta lo que pasa?'], ['Please return books by Friday', 0, '«Please» + verbo, ¿cuenta algo o pide algo?']), bien: '«Must», «no -ing» and «please» tell you what to do.' },
      '«Must», «No cycling» y «Please return» piden u obligan; «closes» y «is cancelled» solo dan información.', 'Fíjate en el verbo: ¿le dice al lector qué hacer o le cuenta algo?'),
    x('sella-parrafo', 'All these things are in the notices, **EXCEPT**: Ata cada opción a su aviso.', { doc: AVISOS,
      ...T(['Use a different way because the floor is wet', 2, 'Busca «stairs» y «dry».'], ['Describe a jacket to get it back', 5, 'Busca «lost» y «collect».'], ['Book early if your group is big', 3, 'Busca «groups» y «ten people».'], ['Buy food at the museum', 6, 'El museo está. ¿Dice algo de comida?']),
      luz: [[3, 'use the stairs on the left'], [4, 'Groups of more than ten people'], [6, 'describe it to collect it']], bien: 'The option with no notice is the answer.' },
      'El piso mojado está en el aviso 3, la chaqueta en el 6 y los grupos en el 4; de comida no hay nada.', 'Busca la acción de cada opción, no solo el lugar que nombra.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: AVISOS, frases: [[1, 'Please ', 'return', ' books by Friday'], [2, 'The park ', 'closes', ' at 7 p.m.'], [6, 'Things that nobody ', 'collects', ' go to charity']],
      ...F(['give back', 0, 'What do you do with a library book at the end?'], ['shuts', 1, 'At 7 p.m. you cannot go in any more: what happens?'], ['picks up', 2, 'What does the owner do with a lost thing?'], ['buy', null, 'In a library you do not pay for the books.'], ['starts', null, 'It is the end of the day, not the beginning.']), bien: 'Same meaning, different word.' },
      '«Return» es «give back», «close» es «shut» y «collect» es «pick up»: la oración dice lo mismo.', 'Pon cada palabra en la oración y mira si el aviso sigue pidiendo lo mismo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: AVISOS, nums: [4, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Students need a card for free entry.', 0, 'Léela junto a «Show your student card».'], ['On Mondays students pay to enter.', 1, 'Si es gratis los miércoles, ¿qué pasa otro día?'], ['The old ticket is good for the 9:00 bus.', 0, 'Léela junto a «with the same ticket».'], ['The 9:00 bus is more expensive.', 2, 'Busca si el aviso habla de precios.']),
      luz: [[4, 'Show your student card'], [4, 'on Wednesdays'], [5, 'with the same ticket']], bien: 'Written, deduced or not there.' },
      'La tarjeta y el tiquete están escritos; lo del lunes se deduce; el precio del bus de las 9 no aparece.', 'Busca primero si está escrito. Si no, pregunta qué frase del aviso te lleva a esa idea.'),
    x('voz-de-la-fuente', 'Where can you see these notices? Átalos.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: AVISOS, portadas: [['In a hospital', 'place'], ['In a swimming pool', 'place'], ['In a restaurant', 'place'], ['In a classroom', 'place']],
      ...T(['Please turn off your phone near the patients', 0, 'Busca a quién hay que cuidar.'], ['Shower before you get in the water', 1, 'Busca dónde te mojas.'], ['Ask the waiter for the menu', 2, 'Busca quién trabaja ahí.'], ['Clean the board after the lesson', 3, 'Busca qué objeto se limpia.']), bien: 'One word shows the place.' },
      '«Patients», «water», «waiter» y «board» delatan el lugar: hospital, piscina, restaurante y salón.', 'En cada aviso hay una palabra que solo tiene sentido en un lugar. Encuéntrala.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: AVISOS, nums: [1, 2, 6], pregunta: 'It is true', queda: 'The library, the park and the office have rules about time.',
      ...T(['If you are late, you can borrow more books.', 2, 'Busca «late» y «borrow».'], ['You can ride on the grass.', [5, 6], 'Busca «cycling» o «bicycles».'], ['Lost things stay in the office for ever.', 11, 'Busca «one month».']), bien: 'One sentence is enough to say no.' },
      'Quien devuelve tarde no puede prestar, no se puede montar en el pasto y lo no reclamado se dona al mes.', 'Busca la palabra clave de cada frase y lee completa la oración donde está.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are not important to understand the notices.', { doc: AVISOS, lineas: ['Return books on time.', 'The jacket is blue.', 'Keep bikes on the path.', 'Students enter the museum free on Wednesdays.', 'There is a storm today.', 'Lost things are in the main office.'], ...S([1, 4], { 0: 'It is the rule of the library.', 2: 'It is the rule of the park.', 3: 'It is the offer of the museum.', 5: 'It says where to go.' }), bien: 'Rules and places stay; details go.' },
      'El color de la chaqueta y la tormenta son detalles; las reglas y los lugares son el mensaje del aviso.', 'Pregunta qué necesita saber quien lee el aviso para saber qué hacer.'),
  ]);

  const l2 = leccion('icf-en-avisos-2', 'Words and meanings', [
    sc(6, 'Otra parte del examen da una **descripción** en inglés y pide la palabra: «This person makes bread» → «baker».', { title: 'De la descripción a la palabra' }),
    sc(7, 'Las profesiones se reconocen por lo que la persona **hace**: «a farmer grows food», «a nurse helps doctors», «a driver takes you from one place to another».', { title: 'Lo que hace cada uno' }),
    sc(7, 'En un texto, «he», «she», «it» y «they» apuntan a algo dicho antes. Ejemplo: «My aunt has a dog. She walks it every day»: «she» es la tía y «it» el perro.', { title: 'He, she, it, they' }),
    sc(7, 'Una palabra se entiende por su oración: en «the roads become dangerous», «dangerous» tiene que ser algo malo que causa la lluvia.', { title: 'El contexto ayuda' }),
    sc(6, 'Palabras que cambian el sentido: «however» (sin embargo), «because» (porque), «so» (así que), «but» (pero).', { title: 'Bisagras en inglés' }),
  ], [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: MERCADO, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['a market day', 0, 'Read the title again: which word names the topic?'], ['describe a place', 1, 'Who writes it, and why would they write for a school magazine?'], ['a magazine article', 2, 'Look at the source.'], ['a football match', null, 'There is no sport in the title.'], ['sell a car', null, 'A school magazine is not for that.'], ['a poem', null, 'The source and the authors do not say that.']),
      luz: [[1, 'the main square of San Rafael changes'], [4, 'The market is not only a place to shop']], bien: 'Title, author and source gave it away.' },
      'El título habla de un mercado y la fuente es una revista escolar: un artículo que describe un lugar.', 'Lee por separado el título, quién escribe y dónde se publica.'),
    x('voz-de-la-fuente', 'Match each description with its word. Átalas.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: MERCADO, portadas: [['basket', 'a thing'], ['farmer', 'a person'], ['square', 'a place'], ['cash', 'a thing']],
      ...T(['You carry bread or fruit in it', 0, 'Is it a person, a place or a thing?'], ['This person grows food', 1, 'Is it a person, a place or a thing?'], ['An open place in the middle of a town', 2, 'Is it a person, a place or a thing?'], ['Coins and notes', 3, 'You use it to pay: what is it?']), bien: 'First the kind of word, then the meaning.' },
      '«You carry… in it» es un objeto, «this person» una persona, «an open place» un lugar; monedas y billetes, «cash».', 'Decide primero si la descripción es de una persona, un lugar o una cosa.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: MERCADO, frases: [[2, 'so customers do not ', 'need', ' cash'], [3, 'He ', 'started', ' with one basket'], [4, 'old friends ', 'meet', ' for breakfast']],
      ...F(['have to use', 0, 'They can pay with a phone: what is not necessary?'], ['began', 1, 'It was the first thing he did two years ago.'], ['get together', 2, 'What do friends do when they eat with each other?'], ['finished', null, 'He still works: it is not the end.'], ['sell', null, 'Friends are there to eat, not to do business.']), bien: 'Same meaning in the same place.' },
      '«Need» es «have to use», «start» es «begin» y «meet» es «get together»: la oración no cambia.', 'Pon cada opción en la oración y léela entera antes de decidir.'),
    x('tira-referente', 'What do these words refer to? Átalas.', { doc: MERCADO, texto: 'Next to |the farmers|, |a young baker| called Julián sells |bread| made with corn. He started with |one basket|, and now he bakes it every Friday night.',
      ...T(['«He»', 1, 'Put it in the sentence: who started?'], ['«it»', 2, 'Put it in the sentence: what can you bake?']), bien: '«He» is a person; «it» is a thing.' },
      '«He» apunta a una persona, el panadero; «it» apunta a lo que se hornea, el pan.', '«He» es para un hombre y «it» para una cosa. Prueba cada opción en la oración.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: MERCADO,
      ...F(['shows how the day begins', 0, 'Look for the hours of the morning.'], ['presents a farmer', 1, 'Look for a woman and her vegetables.'], ['presents a baker', 2, 'Look for bread and Friday nights.'], ['says why the market is special', 3, 'Look for music and old friends.'], ['explains a problem and a help', 4, 'Look for «However».'], ['gives a recipe', null, 'Nobody explains how to cook something.']),
      luz: [[1, 'At six o\'clock'], [2, 'vegetables'], [5, 'However']], bien: 'Beginning, two people, what makes it special and a problem.' },
      'El texto muestra cómo empieza el día, presenta a dos personas, dice qué lo hace especial y cierra con un problema.', 'Lee la primera oración de cada párrafo y pregunta para qué sirve.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: MERCADO, rot: ['before', 'now', 'the future'],
      ...F(['He had one basket', 0, 'Is the verb in the past or in the present?'], ['He bakes three hundred pieces', 1, 'Look at the word «Now».'], ['He sells everything before ten', 1, 'Look at the word «usually».'], ['Farms will disappear if nobody buys', 2, 'Look at the word «will».']),
      luz: [[3, 'He started with one basket two years ago'], [3, 'Now he bakes'], [5, 'the farms will disappear']], bien: 'The verb tells you when.' },
      '«Started» está en pasado, «bakes» y «sells» en presente y «will disappear» en futuro: el verbo dice cuándo.', 'Mira el verbo y palabras como «ago», «now» o «will».'),
    x('pista-tipo', 'Match each clue with its sentence.', { doc: MERCADO, lineas: ['By seven, the square is full of tables.', 'For many families, it is the most important day.', 'Transport is expensive.', 'The town council now gives free stalls.'],
      ...T(['a time', 0, 'Look for an hour.'], ['an opinion of people', 1, 'Look for what people feel about the day.'], ['a problem', 2, 'Look for something that makes life difficult.'], ['a solution', 3, 'Look for a help that somebody gives.']), bien: 'Time, opinion, problem and solution.' },
      '«By seven» es la hora, «most important» es lo que sienten, «expensive» es un problema y «free stalls» una ayuda.', 'Busca en cada oración una palabra que muestre hora, opinión, dificultad o ayuda.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MERCADO, lineas: ['Every Saturday farmers sell in the square.', 'The trucks are old.', 'People trust the food they buy there.', 'It is also a place to meet.', 'Julián uses cheese.', 'Life is hard for farmers, so the town helps them.'], ...S([1, 4], { 0: 'It says what happens and when.', 2: 'It is why people come back.', 3: 'It is the other reason to go.', 5: 'It is the problem and the help.' }), bien: 'Main ideas stay; details go.' },
      'Los camiones viejos y el queso son detalles: sin ellos se entiende qué es el mercado y qué problema tiene.', 'Quita cada oración y mira si todavía se entiende de qué trata el texto.'),
  ]);

  const TERMINAL = {
    id: 'icf-terminal', title: 'Notices at the bus station',
    paras: [
      'TICKETS. Buy your ticket before you get on the bus. Drivers do not sell tickets. Students pay half price from Monday to Friday if they show their student card at the ticket office.',
      'WAITING ROOM. Please keep your bags with you at all times. Bags left alone will be removed by security. Do not leave food on the seats, and please keep the room clean for other passengers.',
      'PLATFORM 4. Closed for repairs until 15 July. Buses to the coast now leave from Platform 6. Ask at the information desk if you are not sure where to go.',
      'CAFÉ. Open every day from 5 a.m. to 10 p.m. Fresh coffee, fruit and sandwiches. Bring your own cup and get a 10 % discount on hot drinks.',
      'LOST TICKETS. If you lose your ticket, go to Window 2 with your ID. We cannot give you a new ticket without it, so always carry it when you travel.',
    ],
  };
  const Q = preg(TERMINAL, 'ingles');
  return mundo('icf-en-avisos', 'Avisos y Vocabulario', 'ingles', [l1, l2], [
    ['icf-en-avisos-1', 'Un aviso da información concreta: búscala en él antes de elegir.',
      Q('According to the notices, buses to the coast now leave from:', ['Platform 4', 'Window 2', 'Platform 6', 'The café'], 2,
        'El aviso del andén 4 dice que está cerrado por reparaciones y que los buses a la costa salen ahora del andén 6.', 'Lee el aviso PLATFORM 4 completo: dice dónde salen ahora los buses.')],
    ['icf-en-avisos-1', '«Please keep» pide algo y «will be removed» dice lo que pasa si no se cumple.',
      Q('What does the WAITING ROOM notice ask you to do?', ['Give your bags to the driver', 'Leave your bags with security', 'Eat only in the café', 'Keep your bags with you'], 3,
        'El aviso pide tener las maletas con uno todo el tiempo; las que se dejan solas se las lleva seguridad. No obliga a comer en la cafetería.', 'Mira qué pasa con las maletas que se dejan solas.')],
    ['icf-en-avisos-1', 'Las condiciones de un aviso deben cumplirse todas.',
      Q('The TICKETS notice says that students:', ['Always travel free', 'Pay half price on weekdays if they show their card', 'Can buy tickets from the driver', 'Pay half price only on Sundays'], 1,
        'Pagan la mitad de lunes a viernes mostrando el carné. Los conductores no venden tiquetes y nadie viaja gratis.', 'Busca dos condiciones en el aviso: qué días y qué deben mostrar.')],
    ['icf-en-avisos-2', 'Una palabra se entiende por lo que la rodea en el aviso.',
      Q('In the CAFÉ notice, "discount" means:', ['Less money to pay', 'A bigger cup', 'A free sandwich', 'A later closing time'], 0,
        'Si traes tu propio vaso te cobran un 10 % menos por las bebidas calientes: «discount» es pagar menos.', 'Fíjate en el «10 %»: ¿qué le pasa al precio si traes tu vaso?')],
    ['icf-en-avisos-2', '«It» apunta a algo dicho antes que concuerda con él.',
      Q('In the LOST TICKETS notice, the word "it" in "without it" refers to:', ['Your ticket', 'Your ID', 'Window 2', 'The bus'], 1,
        'Para dar un tiquete nuevo hace falta el documento: «without it» es sin tu ID. Por eso dicen que lo lleves siempre.', 'Pregúntate qué hay que llevar a la ventanilla 2 para recibir un tiquete nuevo.')],
    ['icf-en-avisos-2', 'Muchas palabras del examen describen el estado de un lugar.',
      Q('"Closed for repairs" means that Platform 4:', ['Is very busy', 'Is only for students', 'Is being fixed', 'Is a new platform'], 2,
        '«Repairs» son arreglos: el andén está cerrado mientras lo arreglan.', 'Piensa por qué cerrarían un andén hasta una fecha.')],
  ]);
})());
