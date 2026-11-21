// Preicfes · Inglés · mundo 1 «Avisos y Vocabulario» (spec 2026-11-20-curso-preicfes): las primeras partes de la prueba de inglés:
// qué dice un aviso, dónde se vería y qué palabra corresponde a una descripción. Las instrucciones van en español, como en el
// examen; los textos, en inglés. Cada lección trabaja un texto original en 7 juegos LEC y un juego en movimiento; la evaluación,
// otros avisos con preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, mueve, preg } = ICF;

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
    sc(7, 'Las palabras que mandan: **No** + verbo en -ing prohíbe (*No smoking*); **must** obliga (*You must wear a helmet*); **Please** pide con cortesía (*Please close the door*).', { title: 'Prohibir, obligar, pedir' }),
    sc(7, 'Ejemplo: *Staff only* quiere decir «solo empleados»: no se puede entrar si no trabajas allí. *Out of order* quiere decir «no funciona».', { title: 'Avisos que se repiten' }),
    sc(7, 'Las palabras de tiempo cambian todo: *until* (hasta), *before* (antes de), *after* (después de), *from … to …* (de … a …).', { title: 'Hasta, antes, después' }),
    sc(6, 'Truco del examen: lee la opción y vuelve al aviso. Una opción que agrega algo que el aviso no dice es incorrecta, aunque suene lógica.', { title: 'Volver al aviso' }),
  ], [
    play('mapa-del-texto', '¿Qué hace cada aviso?', { doc: AVISOS, labels: ['da un plazo y una regla', 'prohíbe y pone condiciones', 'advierte un peligro', 'ofrece algo gratis con condiciones', 'informa un cambio de horario', 'pide al dueño reclamar algo', 'vende un producto en oferta'], key: [0, 1, 2, 3, 4, 5] },
      'La biblioteca pone un plazo (*by Friday*); el parque prohíbe (*No cycling*) y obliga (*must*); el piso mojado advierte (*Danger*); el museo ofrece entrada gratis los miércoles; la terminal informa un bus cancelado; y objetos perdidos pide reclamar una chaqueta. Ningún aviso vende algo.',
      { hint: 'Busca la palabra que manda en cada aviso: *Please*, *No*, *must*, *Danger*, *Free*, *cancelled*…' }),
    play('donde-buscar', '¿Qué aviso te sirve en cada situación?', { doc: AVISOS, ask: 'Lleva cada situación al aviso que la responde.', cards: [
      ['You want to visit the museum and pay nothing.', [4]], ['Your morning bus to the airport did not come.', [5]], ['You lost your jacket after a basketball game.', [6]],
      ['You want to ride your bike near the trees.', [2]], ['You need to go upstairs but the floor is wet.', [3]], ['Your book is late and you want a new one.', [1]],
    ] }, 'Museo gratis: aviso 4. Bus cancelado: aviso 5. Chaqueta en el gimnasio: aviso 6. Bicicleta en el parque: aviso 2. Piso mojado: aviso 3. Libro atrasado: aviso 1.',
      { hint: 'Busca en cada situación una palabra clave (*museum*, *bus*, *jacket*, *bike*, *floor*, *book*) y el aviso donde aparece.' }),
    play('resume-parrafo', '¿Qué dice el aviso? Elige la frase que lo explica', { doc: AVISOS, paras: [1, 3, 5], options: [
      'If your books are late, you cannot borrow more for a while.',
      'Do not walk on this floor now; there is another way up.',
      'There is a later bus you can take with your ticket.',
      'The library is closed on Fridays.',
      'The airport is closed because of the storm.',
    ], key: [0, 1, 2] },
      'El aviso 1 castiga la demora: dos semanas sin préstamos. El 3 pide usar las escaleras hasta que el piso seque. El 5 ofrece el bus de las 9:00 con el mismo tiquete. La biblioteca no cierra los viernes y el aeropuerto no está cerrado.',
      { hint: 'Compara cada frase con el aviso: la correcta dice lo mismo con otras palabras; las otras agregan o cambian un dato.' }),
    play('lupa-evidencia', '¿El aviso lo dice, se deduce o no lo dice?', { doc: AVISOS, cards: [
      ['Dogs must be on a lead in the park.', 0],
      ['Students can enter the museum free on Wednesdays.', 0],
      ['You will not pay again if you take the 9:00 bus.', 1],
      ['If you ask before the date, you may keep a book longer.', 1],
      ['The museum is closed on Mondays.', 2],
      ['The blue jacket belongs to a teacher.', 2],
    ] }, 'Lo de los perros y el museo está escrito. Que no se paga otra vez por el bus de las 9:00 se deduce de *with the same ticket*, y que se puede tener un libro más tiempo, de *ask the librarian before the date*. Ningún aviso dice qué día cierra el museo ni de quién es la chaqueta.',
      { hint: 'Si la frase está casi igual en el aviso, lo dice; si sale de entender una palabra (como *cancelled*), se deduce; si no hay de dónde sacarla, no lo dice.' }),
    play('palabra-a-la-medida', 'La palabra que dice lo mismo en el aviso', { doc: AVISOS, rounds: [
      { p: 1, before: 'Students who return books ', word: 'late', after: ' cannot borrow', options: ['after the date', 'early', 'quickly', 'together'], answer: 0 },
      { p: 2, before: 'dogs must be on a ', word: 'lead', after: ' at all times', options: ['rope held by the owner', 'special diet', 'small bed', 'long walk'], answer: 0 },
      { p: 5, before: 'The 8:15 bus to the airport is ', word: 'cancelled', after: ' today', options: ['not running', 'full', 'early', 'free'], answer: 0 },
    ] }, '*Late* es después de la fecha; *lead* es la cuerda o correa que sostiene el dueño; *cancelled* quiere decir que el bus no sale.',
      { hint: 'Lee el aviso con cada opción puesta en lugar de la palabra: la buena no cambia lo que el aviso quiere decir.' }),
    play('caso-nuevo', '¿Quién entra gratis al museo?', { doc: AVISOS, principle: 'Según el aviso 4, entran gratis los estudiantes que van un miércoles y muestran su carné.', cards: [
      ['Ana is a student. She goes on Wednesday and shows her student card.', true],
      ['Luis is a student. He goes on Wednesday with his card and two friends from his class, who also show their cards.', true],
      ['Marta is a student, but she goes on Saturday.', false],
      ['Pedro goes on Wednesday, but he forgot his student card at home.', false],
    ] }, 'Ana y Luis cumplen las dos condiciones (miércoles y carné). Marta no va un miércoles y Pedro no tiene su carné: a ellos el aviso no les da la entrada gratis.',
      { hint: 'El aviso pone dos condiciones: revisa en cada caso si se cumplen las dos.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: AVISOS, ask: 'El aviso del parque dice todas estas cosas, EXCEPTO:', cards: [
      ['You cannot cycle on the grass', [2]], ['Dogs must be on a lead', [2]], ['The park closes at 7 p.m. in some months', [2]], ['You cannot eat in the park', null],
    ] }, 'El aviso 2 prohíbe montar en bicicleta sobre el pasto, obliga a llevar los perros con correa y da la hora de cierre de noviembre a febrero. No dice nada sobre comer.',
      { hint: 'Lee el aviso 2 y marca cada opción que encuentres en él.' }),
    mueve('vuela-precios', 'Vuela al significado del aviso', 'Avisos', [
      ['NO PARKING means you cannot…', ['leave your car', 'walk here', 'eat here'], 0],
      ['WET FLOOR is a…', ['warning', 'gift', 'question'], 0],
      ['FREE ENTRY means you…', ['pay nothing', 'pay double', 'cannot enter'], 0],
    ], '*No parking*: no se puede dejar el carro. *Wet floor* es una advertencia. *Free entry*: la entrada no cuesta.',
      'Piensa dónde verías cada aviso y qué te pide hacer o no hacer.'),
  ]);

  const l2 = leccion('icf-en-avisos-2', 'Words and meanings', [
    sc(6, 'Otra parte del examen da una **descripción** en inglés y pide la palabra: *This person makes bread* → *baker*.', { title: 'De la descripción a la palabra' }),
    sc(7, 'Las profesiones se reconocen por lo que la persona **hace**: *a farmer grows food*, *a nurse helps doctors*, *a driver takes you from one place to another*.', { title: 'Lo que hace cada uno' }),
    sc(7, 'En un texto, *he*, *she*, *it* y *they* apuntan a algo dicho antes. Ejemplo: *My aunt has a dog. She walks it every day*: *she* es la tía y *it* el perro.', { title: 'He, she, it, they' }),
    sc(7, 'Una palabra se entiende por su oración: en *the roads become dangerous*, *dangerous* tiene que ser algo malo que causa la lluvia.', { title: 'El contexto ayuda' }),
    sc(6, 'Palabras que cambian el sentido: *however* (sin embargo), *because* (porque), *so* (así que), *but* (pero).', { title: 'Bisagras en inglés' }),
  ], [
    play('anticipa-texto', 'Antes de leer, mira la ficha', { doc: MERCADO, slots: [
      ['Tema', ['un mercado de campesinos', 'un viaje en avión', 'una receta de pan'], 0],
      ['Propósito', ['describir un lugar y a su gente', 'vender boletas para un concierto', 'dar instrucciones de un juego'], 0],
      ['Tipo de texto', ['artículo de revista escolar', 'aviso de seguridad', 'carta de queja'], 0],
    ] }, 'El título habla de un sábado en el mercado y sale en una revista escolar: se espera un artículo que describa el lugar y a las personas.',
      { hint: 'Mira el título (*Saturday at the market*) y la fuente (*School magazine*).' }),
    play('quien-lo-dice', 'Cada descripción con su palabra', { doc: MERCADO, ask: 'Lleva cada descripción a la palabra que le corresponde, como en la primera parte del examen.', voices: ['farmer', 'baker', 'customer', 'band'], cards: [
      ['A person who grows food on a farm.', 0], ['A person who makes bread to sell.', 1], ['A person who buys things in a shop or market.', 2], ['A group of people who play music together.', 3],
    ] }, '*Farmer*: Doña Rosa cultiva en su finca. *Baker*: Julián hace pan. *Customer*: quien compra. *Band*: el grupo que toca el primer sábado del mes.',
      { hint: 'Busca el verbo de cada descripción (*grows*, *makes bread*, *buys*, *play music*) y piensa en quién lo hace en el texto.' }),
    play('palabra-a-la-medida', 'La palabra en su oración', { doc: MERCADO, rounds: [
      { p: 1, before: 'farmers from the mountains ', word: 'arrive', after: ' in old trucks', options: ['come', 'leave', 'sleep', 'cook'], answer: 0 },
      { p: 3, before: 'and he usually sells ', word: 'everything', after: ' before ten', options: ['all of it', 'nothing', 'a little', 'only cheese'], answer: 0 },
      { p: 5, before: 'when it rains the roads become ', word: 'dangerous', after: '.', options: ['unsafe', 'dry', 'cheap', 'quiet'], answer: 0 },
    ] }, 'Los campesinos llegan (*come*) en camiones; Julián vende todo (*all of it*) antes de las diez; y con la lluvia las vías se vuelven peligrosas (*unsafe*).',
      { hint: 'Pon cada opción en lugar de la palabra subrayada y mira si la oración sigue diciendo lo mismo.' }),
    play('hilo-referente', '¿A quién se refiere?', { doc: MERCADO, rounds: [
      { p: 2, text: '|Doña Rosa| has sold vegetables here for thirty years. |She| grows everything on |her small farm|, two hours away', from: 3, answer: 1 },
      { p: 3, text: 'Next to them, a young baker called |Julián| sells |bread made with corn and cheese|. |He| started with one basket', from: 5, answer: 1 },
    ] }, '*She* es Doña Rosa, la persona nombrada antes; *he* es Julián, el panadero.',
      { hint: '*She* es una mujer y *he* un hombre: busca hacia atrás la persona que concuerda.' }),
    play('donde-buscar', '¿En qué párrafo está la respuesta?', { doc: MERCADO, cards: [
      ['What time do the farmers arrive?', [1]], ['How do customers pay Camila?', [2]], ['When does Julián bake?', [3]],
      ['When does the band play?', [4]], ['What does the town council give the farmers?', [5]],
    ] }, 'La hora de llegada está en el 1; el pago con el celular, en el 2; el horario de Julián, en el 3; la banda, en el 4; y los puestos gratis, en el 5.',
      { hint: 'Busca las palabras de la pregunta (*arrive*, *pay*, *bake*, *band*, *council*) en el texto.' }),
    play('lupa-evidencia', '¿El texto lo dice, se deduce o no lo dice?', { doc: MERCADO, cards: [
      ['Doña Rosa has sold vegetables for thirty years.', 0],
      ['Julián sells more bread now than when he started.', 1],
      ['Rain makes it harder for farmers to come to the market.', 1],
      ['Julián is Doña Rosa\'s son.', 2],
      ['The market is open every day of the week.', 2],
    ] }, 'Los treinta años están escritos (párrafo 2). Que Julián vende más se deduce de pasar de una canasta a trescientos panes, y lo de la lluvia, de las vías peligrosas. Nada dice que sea hijo de Doña Rosa, y el mercado es los sábados.',
      { hint: 'Si la frase agrega una relación o un día que el texto no menciona, no lo dice.' }),
    play('termometro-tono', 'La actitud de quien habla', { doc: MERCADO, rounds: [
      { frag: '"If nobody buys from us, the farms will disappear," Doña Rosa explains.', scale: ['preocupado', 'alegre', 'aburrido', 'burlón'], answer: 0 },
      { frag: 'For many families, it is the most important day of the week.', scale: ['entusiasta', 'triste', 'irónico'], answer: 0 },
    ] }, 'Doña Rosa teme que las fincas desaparezcan: está preocupada. La frase sobre las familias muestra entusiasmo por el mercado.',
      { hint: 'Busca la palabra que delata la emoción: *disappear* en la primera, *most important* en la segunda.' }),
    mueve('rompe-cambios', 'Manda la pelota a lo que dice el texto', 'In the text', [
      ['Doña Rosa sells…', ['vegetables', 'bread', 'music'], 0],
      ['Julián is a…', ['baker', 'farmer', 'driver'], 0],
      ['The council gives farmers…', ['free stalls', 'new trucks', 'phones'], 0],
    ], 'Doña Rosa vende verduras (párrafo 2), Julián es panadero (párrafo 3) y el concejo da puestos gratis (párrafo 5).',
      'Ubica a cada persona en el texto antes de lanzar la pelota.'),
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
    ['icf-en-avisos-1', '*Please keep* pide algo y *will be removed* dice lo que pasa si no se cumple.',
      Q('What does the WAITING ROOM notice ask you to do?', ['Give your bags to the driver', 'Leave your bags with security', 'Eat only in the café', 'Keep your bags with you'], 3,
        'El aviso pide tener las maletas con uno todo el tiempo; las que se dejan solas se las lleva seguridad. No obliga a comer en la cafetería.', 'Mira qué pasa con las maletas que se dejan solas.')],
    ['icf-en-avisos-1', 'Las condiciones de un aviso deben cumplirse todas.',
      Q('The TICKETS notice says that students:', ['Always travel free', 'Pay half price on weekdays if they show their card', 'Can buy tickets from the driver', 'Pay half price only on Sundays'], 1,
        'Pagan la mitad de lunes a viernes mostrando el carné. Los conductores no venden tiquetes y nadie viaja gratis.', 'Busca dos condiciones en el aviso: qué días y qué deben mostrar.')],
    ['icf-en-avisos-2', 'Una palabra se entiende por lo que la rodea en el aviso.',
      Q('In the CAFÉ notice, "discount" means:', ['Less money to pay', 'A bigger cup', 'A free sandwich', 'A later closing time'], 0,
        'Si traes tu propio vaso te cobran un 10 % menos por las bebidas calientes: *discount* es pagar menos.', 'Fíjate en el «10 %»: ¿qué le pasa al precio si traes tu vaso?')],
    ['icf-en-avisos-2', '*It* apunta a algo dicho antes que concuerda con él.',
      Q('In the LOST TICKETS notice, the word "it" in "without it" refers to:', ['Your ticket', 'Your ID', 'Window 2', 'The bus'], 1,
        'Para dar un tiquete nuevo hace falta el documento: *without it* es sin tu ID. Por eso dicen que lo lleves siempre.', 'Pregúntate qué hay que llevar a la ventanilla 2 para recibir un tiquete nuevo.')],
    ['icf-en-avisos-2', 'Muchas palabras del examen describen el estado de un lugar.',
      Q('"Closed for repairs" means that Platform 4:', ['Is very busy', 'Is only for students', 'Is being fixed', 'Is a new platform'], 2,
        '*Repairs* son arreglos: el andén está cerrado mientras lo arreglan.', 'Piensa por qué cerrarían un andén hasta una fecha.')],
  ]);
})());
