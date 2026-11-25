// Preicfes · Inglés · mundo 7 «Inferir y Opinar» (spec 2026-11-25-preicfes-estructura): textos de nivel B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const LETTER = {
    id: 'icf-en-postman', title: 'The postman\'s last street',
    ficha: { autor: 'Short story by Omar Díaz', fuente: 'Magazine «Small Towns»', fecha: 'March 2026' },
    paras: [
      'On his last working day, Mr Beltrán polished his shoes twice. He had carried letters along the same eleven streets for thirty-eight years, and he knew which dogs were only pretending. There were just nine envelopes in his bag. When he started, there used to be two hundred.',
      'At number four, Mrs Pinto was waiting behind the curtain, as usual. She always opened the door before he could ring. "Anything for me?" she asked. There was nothing; there had been nothing since her son stopped writing. Mr Beltrán put his hand in the bag, took out a supermarket leaflet and gave it to her with great care, as if it were made of glass. She thanked him and said she would read it after lunch.',
      'The baker gave him a warm roll without saying a word. He had never done that before. The children of the corner house had drawn a stamp on the pavement with chalk, so big that three of them could lie inside it. Mr Beltrán walked around it, even though it was raining and his shoes were already wet.',
      'In the last street lived a man who had not spoken to him since 1997, because of a parcel that arrived broken. Mr Beltrán had a letter for him. He could have left it in the box. Instead, he rang the bell. The man opened the door, looked at the letter, looked at the shoes, and then, for some reason, looked at his own hands. "You had better come in," he said. "The coffee is on."',
      'The next morning, at exactly eight, Mrs Pinto looked through the curtain. A young woman with a yellow helmet was riding past on a motorbike, and she did not stop. Mrs Pinto waited a little longer. Then she heard somebody whistling. Mr Beltrán was coming up the street, in old shoes, without a bag. He had a leaflet in his hand.',
    ],
  };
  const l1 = leccion('icf-en-inferencia-1', 'Reading between the lines', guion(
    ['Inferir', 'Unir dos datos del texto para entender algo que no está escrito.'],
    ['Gestos', 'Lo que un personaje hace dice lo que siente.'],
    ['Pistas, no imaginación', 'Debes poder señalar el dato que te hace pensarlo.'],
    ['Must, might, can’t', 'must be: seguro; might be: quizá; can’t be: imposible.']), [
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: LETTER, nums: [1, 2], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['There were nine envelopes in the bag.', 0, 'Busca el número de sobres.'], ['People write fewer letters now.', 1, 'Compara nueve con doscientos.'], ['Mrs Pinto misses her son.', 1, '¿Qué pregunta siempre y quién dejó de escribir?'], ['Her son lives in Spain.', 2, '¿Se dice dónde vive?']),
      luz: [[1, 'nine envelopes'], [1, 'two hundred'], [2, 'her son stopped writing']], bien: 'Two facts make one idea.' },
      'Nueve está escrito; que hoy se escribe menos y que ella extraña a su hijo se deducen; España no.', 'Une dos datos: si no puedes señalarlos, no está.'),
    x('pista-tipo', 'Match each action with the feeling it shows.', { doc: LETTER, lineas: ['He polished his shoes twice.', 'He gave the leaflet with great care.', 'He walked around the drawing.', 'The man looked at his own hands.'],
      ...T(['it is a special day for him', 0, '¿Cuál es de su último día?'], ['kindness to a lonely person', 1, '¿A quién le dio algo sin importancia?'], ['respect for what children made', 2, '¿Qué evitó pisar?'], ['he feels ashamed', 3, '¿Quién llevaba años sin hablar?']), bien: 'Actions speak.' },
      'Lustrar es por el día especial, el cuidado por bondad, rodear el dibujo por respeto y mirarse las manos por vergüenza.', 'Pregunta por qué una persona haría eso.'),
    x('genero-o-cita', 'From the clues: **it must be true** or **it might be true**?', { doc: LETTER, rot: ['must be true', 'might be true'],
      ...F(['He worked for more than thirty years', 0, '¿Hay un dato que lo asegura?'], ['The letter was from the man\'s family', 1, '¿Se dice de quién era?'], ['The new post person uses a motorbike', 0, '¿Hay un dato que lo asegura?'], ['The baker felt sad', 1, '¿Es seguro o solo posible?']), bien: 'Must needs proof; might is possible.' },
      'Los 38 años y la moto están seguros; la familia y la tristeza son posibles.', '«Must» pide una prueba; «might» solo una posibilidad.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LETTER, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Mr Beltrán visits Mrs Pinto the next day.',
      ...T(['Mrs Pinto got a letter that day.', 3, 'Busca lo que había para ella.'], ['Mr Beltrán left the letter in the box.', 9, 'Busca qué hizo en su lugar.'], ['The woman on the motorbike stopped.', 14, 'Busca qué hizo al pasar.']), bien: 'One sentence says no.' },
      'No había nada para ella, él tocó el timbre y la moto no paró.', 'Busca en el texto la palabra clave de cada frase.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LETTER, rot: ['years before', 'the last day', 'the next morning'],
      ...F(['A parcel arrived broken', 0, 'Busca el año 1997.'], ['The baker gave him a roll', 1, 'Busca al panadero.'], ['He came with old shoes', 2, 'Busca cómo venía vestido al final.'], ['He had two hundred letters', 0, 'Busca «used to be».']), luz: [[4, 'since 1997'], [3, 'a warm roll'], [5, 'in old shoes']], bien: 'Used to, that day, next morning.' },
      'El paquete y las doscientas cartas son de antes, el pan del último día y los zapatos viejos del siguiente.', 'Busca la expresión de tiempo de cada hecho.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LETTER, frases: [[1, 'which dogs were only ', 'pretending', ''], [4, 'You ', 'had better', ' come in'], [3, '', 'even though', ' it was raining']],
      ...F(['acting', 0, 'Were those dogs really dangerous?'], ['should', 1, 'Is it an order, a wish or advice?'], ['although', 2, 'Does the rain agree with what he did?'], ['because', null, 'The rain is not the reason.'], ['can\'t', null, 'The man opened the door.']), bien: 'Context gives the meaning.' },
      '«Pretending» es fingir, «had better» es deberías y «even though» es aunque.', 'Lee toda la oración y piensa qué ocurre de verdad.'),
    x('talla-idea', 'Why did he come back? Put each idea in its size.', { doc: LETTER, p: 5, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['He was whistling.', 0, 'It is true, but why did he come?'], ['He knows that Mrs Pinto waits for someone every day.', 1, 'Join paragraph 2 and paragraph 5.'], ['He is going to live with Mrs Pinto.', 2, 'Does the text say that?']),
      luz: [[5, 'Mrs Pinto looked through the curtain'], [5, 'He had a leaflet in his hand']], bien: 'He keeps the visit, not the job.' },
      'Silbar es un detalle, vivir con ella dice de más; vuelve porque sabe que lo esperan.', 'Une el folleto del párrafo 2 con el del final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LETTER, lineas: ['A postman works for the last time.', 'The helmet is yellow.', 'He is kind to a lonely woman.', 'He makes peace with an old enemy.', 'It is raining.', 'The next day he visits the woman again.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is what we learn about him.', 3: 'It is an important change.', 5: 'It is the end of the story.' }), bien: 'Situation, kindness, peace and end.' },
      'El casco y la lluvia son detalles; lo demás es la historia.', 'Deja lo que muestra quién es él y qué cambia.'),
  ]);

  const ZOO = {
    id: 'icf-en-zoo', title: 'Should our zoo close?',
    ficha: { autor: 'Two letters to the editor', fuente: 'City newspaper', fecha: 'April 2026' },
    paras: [
      'FIRST LETTER, from Paula Henao. I went to the zoo last Sunday for the first time in twenty years. The same bear was walking the same eight steps, forwards and backwards, next to the same wall. I counted. My daughter asked me what he had done wrong. I could not answer her. I believe that the zoo should close.',
      'I know that zoos say they protect animals. Some really do. According to its own website, however, our zoo has 340 animals, and only six of them belong to species that are in danger. Nor has it returned a single one to nature since 2010. A place that locks up 334 animals so that we can eat ice cream in front of them is not a hospital. It is a shop window.',
      'SECOND LETTER, from Julián Marín, vet. Ms Henao is right about the bear, and I have said so for years. But she is wrong about the solution. Most of our animals were taken from people who kept them illegally: a monkey that lived in a bathroom, parrots without feathers. They cannot survive in the forest. If we close the zoo, where will they go?',
      'In my opinion, what we need is a different kind of zoo: no new animals, more space and fewer visitors. Last year 80,000 children came. Perhaps many of them only remember the ice cream. But one of them might become the person who protects the forest, and nobody protects what they have never seen.',
      'A week later the newspaper published a note from Ms Henao. "I visited Dr Marín. I still think that nobody needs to see a bear in order to love one. But I met the monkey from the bathroom, and I have changed my mind about closing. I would now say: stop buying, stop selling tickets at weekends, and move the bear first." Dr Marín\'s answer was even shorter: "The bear moves on Monday. Bring your daughter."',
    ],
  };
  const l2 = leccion('icf-en-inferencia-2', 'Opinions and facts', guion(
    ['Fact', 'Se puede comprobar: 340 animals.'],
    ['Opinion', 'I believe, in my opinion, should: alguien puede no estar de acuerdo.'],
    ['Reason', 'Una opinión vale más con razones y datos.'],
    ['Change of mind', 'Un buen argumento puede hacer cambiar de idea.']), [
    x('genero-o-cita', 'Is it a **fact** or an **opinion**?', { doc: ZOO, rot: ['fact', 'opinion'],
      ...F(['The zoo has 340 animals', 0, '¿Se puede contar?'], ['The zoo should close', 1, '¿Alguien puede no estar de acuerdo?'], ['80,000 children came last year', 0, '¿Se puede contar?'], ['It is a shop window', 1, '¿Es un dato o una comparación de quien opina?']), bien: 'Count it or discuss it.' },
      'Los animales y los niños se cuentan; cerrar y la vitrina son opiniones.', 'Pregunta si podrías comprobarlo con números.'),
    x('pinta-voces', 'Paint each idea with its writer.', { doc: ZOO, plumas: ['Paula Henao', 'Julián Marín'],
      ...P(['It is not a hospital.', 0, 'Busca la primera carta.'], ['They cannot survive in the forest.', 1, 'Busca quién es veterinario.'], ['No new animals and more space.', 1, 'Busca quién propone otra clase de zoo.'], ['Nobody needs to see a bear to love one.', 0, 'Busca quién escribió la nota final.']), bien: 'Two voices, two ideas.' },
      'Paula critica la vitrina y escribe la nota; Julián explica y propone otro zoo.', 'Busca la firma o el nombre antes de cada carta.'),
    x('balanza-tesis', 'Opinion: "our zoo does not protect animals". What does each fact do?', { doc: ZOO, tesis: 'Our zoo does not protect animals',
      ...F(['Only six animals are in danger.', 0, '¿La apoya o la debilita?'], ['Most animals were taken from illegal owners.', 1, '¿Los protegió de algo?'], ['It has not returned any animal to nature.', 0, '¿La apoya o la debilita?'], ['The ice cream is good.', 2, '¿Habla de proteger?']), bien: 'For, against, or nothing.' },
      'Seis en peligro y ninguno devuelto la apoyan; haberlos rescatado la debilita; el helado no pesa.', 'Pregunta si el dato muestra que protege o que no.'),
    x('pilares', 'What supports Dr Marín\'s idea: "We should not close the zoo"?', { doc: ZOO, idea: 'We should not close the zoo',
      ...F(['The animals cannot survive in the forest.', 0, '¿Explica por qué no cerrar?'], ['Children may learn to protect nature.', 0, '¿Explica por qué no cerrar?'], ['The bear walks eight steps.', 1, '¿Es una razón para no cerrar?'], ['The note was published a week later.', 1, '¿Es una razón para no cerrar?']), bien: 'Reasons answer why.' },
      'Que no sobrevivan y que los niños aprendan son razones; los pasos y la fecha no.', 'Une la idea y la frase con «because» y mira si tiene sentido.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: ZOO, pares: [['Ms Henao is right about the bear.', 'she is wrong about the solution.'], ['They can\'t survive in the forest,', 'the zoo can\'t close.'], ['We need a different zoo', 'the animals have nowhere to go.']],
      ...F(['However,', 0, 'One idea agrees and the other one does not.'], ['so', 1, 'The second idea is the result.'], ['because', 2, 'The second idea gives the reason.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, result and reason.' },
      '«However» contrasta, «so» da el resultado y «because» la razón.', 'Di qué hace la segunda idea con la primera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: ZOO, nums: [2, 3, 5], pregunta: 'It is true', queda: 'Ms Henao changed her mind.',
      ...T(['Most animals in the zoo are in danger.', 2, 'Busca cuántos están en peligro.'], ['Dr Marín thinks that the bear is fine.', 7, 'Busca en qué le da la razón.'], ['Ms Henao still wants to close the zoo.', 15, 'Busca en qué cambió de idea.']), bien: 'One sentence says no.' },
      'Solo seis están en peligro, él le da la razón sobre el oso y ella cambió de idea.', 'Busca en el texto la palabra clave de cada frase.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: ZOO, filas: [{ antes: 'The zoo has returned to nature', topes: ['many animals', 'six animals', 'no animals since 2010'], va: 2 }, { antes: 'One child', topes: ['will certainly', 'might', 'cannot'], va: 1 }, { antes: 'At the end they', topes: ['agree on some things', 'agree on nothing', 'never meet'], va: 0 }], mira: ['Busca lo que dice desde 2010.', 'Busca la palabra de posibilidad.', 'Relee la nota final.'], luz: [[2, 'Nor has it returned a single one'], [4, 'might become'], [5, 'I have changed my mind']], bien: 'None, might and some.' },
      'Ninguno desde 2010, «might» es posibilidad y al final coinciden en parte.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: ZOO, lineas: ['Two people write about closing a zoo.', 'The bear takes eight steps.', 'One says that it does not protect animals.', 'The other says that the animals have nowhere to go.', 'There are parrots.', 'They meet and find a middle way.'], ...S([1, 4], { 0: 'It is the topic.', 2: 'It is one opinion.', 3: 'It is the other opinion.', 5: 'It is the end.' }), bien: 'Topic, two opinions and end.' },
      'Los pasos y los loros son detalles; lo demás es la discusión.', 'Deja lo que explica en qué piensan distinto.'),
  ]);

  const TRAIN = {
    id: 'icf-en-shoes', title: 'The shoe museum',
    paras: [
      'There is a museum in our town with only one room and no famous object in it. It belongs to Alba Ríos, who used to repair shoes. For forty years, people left shoes in her shop and some of them never came back. She did not sell them. "Somebody might need to remember," she says.',
      'Each pair has a card. "Size 37, red. She said she would dance in them on Saturday. She never collected them, and that was the year of the flood." "Boots, very old. He came every month for twelve years to ask if they were ready. They were ready. He liked to talk."',
      'The council wanted to move the museum to a bigger building, with lights and a café. Alba thanked them and said no. A shoe, she explained, is the only thing that keeps the shape of a person, and shapes need quiet. Some people think that she is being difficult. I think she is right, although I would have liked the coffee.',
      'Last month a woman of about seventy came in, walked slowly along the wall and stopped in front of the red shoes. She did not say anything. She took off her own shoes, which were grey and comfortable, and she tried the red ones on. They still fitted. Alba turned up the radio.',
      'There is now an empty space on the wall. Alba has not taken away the card, but she has written one more line on it. I will not tell you what it says. You should go and read it.',
    ],
  };
  const Q = preg(TRAIN, 'ingles');
  return mundo('icf-en-inferencia', 'Inferir y Opinar', 'ingles', [l1, l2], [
    ['icf-en-inferencia-1', 'Une dos datos para deducir.', Q('What can we deduce about the woman of about seventy?', ['She wanted to steal the shoes', 'She worked in the museum', 'She was probably the owner of the red shoes', 'She had never seen them before'], 2, 'Se detiene ante ellos, se los prueba y todavía le quedan.', 'Une lo que hizo con que todavía le quedaban.')],
    ['icf-en-inferencia-1', 'Un gesto dice lo que no se dice.', Q('Why does Alba turn up the radio?', ['So that the woman can dance', 'Because she cannot hear', 'To make the woman leave', 'Because it is late'], 0, 'La tarjeta decía que iba a bailar con esos zapatos.', 'Recuerda lo que decía la tarjeta de los zapatos rojos.')],
    ['icf-en-inferencia-1', 'Los gestos muestran intenciones.', Q('Why did the man with the boots come every month?', ['They were never ready', 'He wanted his money', 'He had forgotten the shop', 'He enjoyed talking with Alba'], 3, '«They were ready. He liked to talk».', 'Lee las dos últimas frases de su tarjeta.')],
    ['icf-en-inferencia-2', 'Opinion: alguien puede no estar de acuerdo.', Q('Which sentence is an opinion of the writer?', ['The museum has one room', 'I think she is right', 'Each pair has a card', 'The council wanted to move it'], 1, '«I think» anuncia una opinión.', 'Busca la frase que alguien podría discutir.')],
    ['icf-en-inferencia-2', 'Una razón responde por qué.', Q('Why doesn\'t Alba want a bigger building?', ['It is too expensive', 'She doesn\'t like coffee', 'She thinks that the shoes need a quiet place', 'She wants to sell the shoes'], 2, '«Shapes need quiet»: necesitan silencio.', 'Lee lo que explica sobre los zapatos.')],
    ['icf-en-inferencia-2', 'El final puede invitar al lector.', Q('What does the writer want the reader to do?', ['Visit the museum', 'Buy red shoes', 'Write a card', 'Open a café'], 0, '«You should go and read it» invita a visitarlo.', 'Lee la última oración.')],
  ]);
})());
