// Ejemplos resueltos y marcados de Inglés del Preicfes (libro 9). Textos originales.
// H(título, pregunta, párrafos [[trozos]], opciones, pasos [lo que se explica, { luz: trozos u opciones, x: opciones que se tachan,
// n: { párrafo u opción: rótulo } }], respuesta). Los trozos del texto se cuentan desde 0.
const H = (t, q, T, O, m, r) => {
  const nT = T.flat().length, id = k => (typeof k === 'string' ? nT + 'ABCD'.indexOf(k) : k), pa = k => (/[A-D]/.test(k) ? T.length + 'ABCD'.indexOf(k) : +k);
  return [{ t, q, escena: 'hoja', en: { letras: [...T.map((_, i) => `${i + 1}`), ...'ABCD'.slice(0, O.length)], paras: [...T, ...O.map(o => [o])] },
    m: m.map(([d, v = {}]) => [d, { ...(v.luz ? { luz: v.luz.map(id) } : {}), ...(v.x ? { tacha: v.x.map(id) } : {}), ...(v.n ? { nota: Object.fromEntries(Object.entries(v.n).map(([k, s]) => [pa(k), s])) } : {}) }]), r }];
};
Object.assign(EJ, {
  // ------------------------------------------------------------------------------------ Avisos y Vocabulario
  'icf-en-avisos-1': H('Lo que dice el aviso', 'What does the notice tell you?', [['SWIMMING POOL'], ['Children under 12', 'must be with an adult.'], ['Please shower before you swim.'], ['No food or drinks', 'near the water.']], ['Adults cannot swim with children.', 'A child of ten cannot swim alone.', 'You can eat near the pool after a shower.'], [
    ['Primero el lugar: «swimming pool» es una piscina. Ahora, ¿qué pide cada línea?', { luz: [0], n: { 0: 'piscina' } }],
    ['«Must» obliga: un niño de menos de 12 tiene que estar con un adulto. Diez es menos que doce.', { luz: [1, 2], n: { 1: 'obliga' } }],
    ['A le da la vuelta: el aviso no prohíbe a los adultos, los pide.', { x: ['A'], n: { A: 'al revés' } }],
    ['C mezcla dos líneas: ducharse no da permiso, y «No food» prohíbe comer junto al agua.', { luz: [3, 4], x: ['C'], n: { 3: 'prohíbe', C: 'mezcla' } }],
    ['B no copia las palabras del aviso, pero dice lo mismo: no puede nadar solo.', { luz: ['B'] }],
  ], 'B. «Must be with an adult» = no puede nadar solo.'),
  'icf-en-avisos-2': H('¿A qué apunta «they»?', 'In the notice, “They” refers to:', [['BOOK SALE'], ['The library is getting new books,', 'so it is selling the old ones.'], ['They cost 2,000 pesos each.', 'All the money goes to buy more.']], ['the new books', 'the old books', 'the library'], [
    ['«They» es plural: apunta a varias cosas que se nombraron antes.', { luz: [3], n: { 2: '¿quiénes?' } }],
    ['La biblioteca es una sola: para ella el aviso usa «it».', { luz: [2], x: ['C'], n: { C: 'es singular' } }],
    ['Hay dos grupos de libros: los nuevos llegan y lo que se vende son «the old ones».', { luz: [1, 2] }],
    ['Se reemplaza y se lee: «The old books cost 2,000 pesos each». Los nuevos no están en venta.', { x: ['A'], luz: ['B'], n: { A: 'no se venden' } }],
  ], 'B. «They» = the old books (los libros viejos).'),
  // ------------------------------------------------------------------------------------ Diálogos
  'icf-en-dialogos-1': H('La palabra que pregunta', 'Complete the conversation.', [['Lucía: How often do you go to the gym?'], ['Pedro: ______']], ['I go with my brother.', 'Twice a week.', 'Yes, I often go.'], [
    ['«How often» pregunta cada cuánto: la respuesta tiene que ser una frecuencia.', { luz: [0], n: { 0: '¿cada cuánto?' } }],
    ['A dice con quién va: respondería «Who do you go with?».', { x: ['A'], n: { A: '¿con quién?' } }],
    ['C repite «often», pero empieza con «Yes»: eso responde una pregunta de sí o no.', { x: ['C'], n: { C: 'palabra repetida' } }],
    ['B da la frecuencia: dos veces por semana.', { luz: ['B'] }],
  ], 'B. How often → twice a week (dos veces por semana).'),
  'icf-en-dialogos-2': H('Responder a una disculpa', 'Complete the conversation.', [['Marta: Sorry I\'m late.', 'The bus didn\'t stop.'], ['Camilo: ______']], ['You\'re welcome.', 'Don\'t worry. The film hasn\'t started.', 'Yes, please.'], [
    ['Primero se nombra la situación: Marta pide disculpas por llegar tarde.', { luz: [0], n: { 0: 'disculpa' } }],
    ['«You\'re welcome» responde a «Thank you», no a «Sorry».', { x: ['A'], n: { A: 'responde gracias' } }],
    ['«Yes, please» acepta algo que le ofrecen: «Would you like…?».', { x: ['C'], n: { C: 'acepta una oferta' } }],
    ['A una disculpa se responde quitándole peso: «Don\'t worry», y una razón para tranquilizarla.', { luz: ['B'] }],
  ], 'B. Sorry → Don\'t worry (no te preocupes).'),
  'icf-en-dialogos-3': H('¿De acuerdo o no?', 'Complete the conversation.', [['Ana: I don\'t like horror films.', 'They give me bad dreams.'], ['Luis: ______', 'I always watch comedies.']], ['So do I.', 'Neither do I.', 'Yes, I do.'], [
    ['Ana dice algo en negativo: «don\'t like».', { luz: [0], n: { 0: 'negativa' } }],
    ['Lo que dice Luis después delata su postura: solo ve comedias. Está de acuerdo con ella.', { luz: [3], n: { 1: 'de acuerdo' } }],
    ['«So do I» sirve para estar de acuerdo con una afirmativa, no con una negativa.', { x: ['A'], n: { A: 'para afirmativas' } }],
    ['«Yes, I do» diría que a él sí le gustan, y eso choca con las comedias.', { x: ['C'], n: { C: 'desacuerdo' } }],
    ['Con una negativa, el acuerdo es «Neither do I».', { luz: ['B'] }],
  ], 'B. Neither do I = yo tampoco.'),
  // ------------------------------------------------------------------------------------ Gramática
  'icf-en-gramatica-1': H('Hasta hoy', 'Choose the word that completes the text.', [['My aunt moved to Medellín in 2019.', 'She ______ there since then,', 'and she loves the city.']], ['lives', 'has lived', 'lived'], [
    ['La palabra de tiempo manda: «since» cuenta desde un punto del pasado hasta hoy.', { luz: [1], n: { 0: 'since' } }],
    ['«Moved… in 2019» es un hecho cerrado, con fecha: ahí sí va el pasado simple. El hueco, en cambio, va con «since».', { luz: [0] }],
    ['«Lived» diría que ya no vive allá, y el texto dice que ama la ciudad.', { luz: [2], x: ['C'], n: { C: 'ya terminó' } }],
    ['«Lives» no va con «since»: el inglés pide have o has + participio.', { x: ['A'], n: { A: 'no va con since' } }],
    ['Queda «has lived»: empezó en 2019 y sigue hoy.', { luz: ['B'] }],
  ], 'B. Since + presente perfecto: has lived.'),
  'icf-en-gramatica-2': H('In, on, at', 'Choose the word that completes the text.', [['The museum is closed on Mondays.', 'On other days it opens', '______ 9 a.m.', 'and closes in the evening.']], ['in', 'on', 'at'], [
    ['Lo que sigue al hueco es una hora exacta: 9 a.m.', { luz: [2], n: { 0: 'hora' } }],
    ['«On» va con días: on Mondays. Por eso está en el texto, de anzuelo.', { luz: [0], x: ['B'], n: { B: 'días' } }],
    ['«In» va con partes del día, meses y años: in the evening.', { luz: [3], x: ['A'], n: { A: 'partes del día' } }],
    ['Con una hora exacta va «at».', { luz: ['C'] }],
  ], 'C. at 9 a.m.: at + hora.'),
  'icf-en-gramatica-3': H('Comparar dos', 'Choose the word that completes the text.', [['Bogotá is cold, but Tunja is', '______ than Bogotá.', 'In fact, it is one of the coldest cities in the country.']], ['colder', 'more cold', 'the coldest'], [
    ['Se comparan dos ciudades y después del hueco viene «than»: es un comparativo.', { luz: [1], n: { 0: 'dos y than' } }],
    ['«The coldest» es para el primero de todos. Sí aparece en el texto, pero en otra oración.', { luz: [2], x: ['C'], n: { C: 'el de todos' } }],
    ['«Cold» es corta: se le pega -er. «More» es para palabras largas, como «more expensive».', { x: ['B'], n: { B: 'palabra corta' } }],
    ['Queda «colder than».', { luz: ['A'] }],
  ], 'A. Palabra corta + -er + than.'),
  // ------------------------------------------------------------------------------------ Textos cortos
  'icf-en-corto-1': H('¿Para qué escribe?', 'Why did Sofi write the note?', [['Hi Dani,'], ['Mum asked me to tell you:', 'the dentist called.', 'Your appointment is now on Thursday at 4,', 'not Wednesday.'], ['Don\'t forget your card!', '– Sofi']], ['To invite Dani to the dentist.', 'To tell Dani about a change of day.', 'To ask Mum for help.', 'To remind Dani to call the dentist.'], [
    ['Quién a quién: Sofi le escribe a Dani y le pasa un recado de mamá.', { luz: [0, 1, 6], n: { 0: 'para', 2: 'de' } }],
    ['El centro del mensaje es el cambio: jueves, no miércoles.', { luz: [3, 4], n: { 1: 'el cambio' } }],
    ['D usa «dentist» y «call», pero quien llamó fue el dentista.', { luz: [2], x: ['D'], n: { D: 'al revés' } }],
    ['Nadie invita a nadie ni le pide ayuda a mamá.', { x: ['A', 'C'], n: { A: 'no está', C: 'no está' } }],
    ['Queda B: avisar que la cita cambió de día.', { luz: ['B'] }],
  ], 'B. appointment = cita; el mensaje avisa el cambio.'),
  'icf-en-corto-2': H('La palabra por el contexto', 'In the text, “hatch” means that the eggs:', [['Every year, sea turtles come to the beaches of La Guajira', 'to lay their eggs.'], ['At night, volunteers move the eggs', 'to safe places, far from dogs and cars.'], ['About two months later, the eggs hatch', 'and the babies run to the sea.']], ['break and the babies come out.', 'get lost.', 'are sold.', 'get cold.'], [
    ['No hace falta saber la palabra: se lee lo que pasa antes y después.', { luz: [4], n: { 2: 'hatch' } }],
    ['Antes hay huevos; después hay crías que corren al mar. Entre las dos cosas, el huevo se abre.', { luz: [1, 5] }],
    ['Con huevos perdidos o fríos no habría crías corriendo.', { x: ['B', 'D'], n: { B: 'no encaja', D: 'no encaja' } }],
    ['Nadie vende nada: los voluntarios cuidan los huevos.', { luz: [2], x: ['C'], n: { C: 'no está' } }],
    ['Queda A.', { luz: ['A'] }],
  ], 'A. hatch = romperse el huevo y salir la cría.'),
  // ------------------------------------------------------------------------------------ Textos largos
  'icf-en-largo-1': H('La misma idea, otras palabras', 'According to the text, Laura', [['In 2018, a small town in Boyacá chose a “bicycle mayor”.', 'Her job is not to rule the town, but to make cycling easier.'], ['Laura, 24, started by painting bike lanes on two streets.', 'She also got shops to put bike racks at their doors.'], ['At first, many drivers complained.', 'Now, twice as many children ride to school.']], ['governs the town instead of the mayor.', 'made it easier to park bicycles near shops.', 'stopped drivers from complaining.', 'teaches children to ride.'], [
    ['Mapa rápido: el primer párrafo dice quién es, el segundo qué hizo y el tercero qué cambió.', { n: { 0: 'quién', 1: 'qué hizo', 2: 'qué cambió' } }],
    ['A contradice el texto: «not to rule the town».', { luz: [1], x: ['A'], n: { A: 'al revés' } }],
    ['C dice más de lo que hay: los conductores se quejaron «at first», y nadie dice que ella los callara.', { luz: [4], x: ['C'], n: { C: 'no está' } }],
    ['D toma «children» y «ride», pero los niños van solos en bici al colegio: nadie les enseña.', { luz: [5], x: ['D'], n: { D: 'palabras sueltas' } }],
    ['B no repite «bike racks», pero dice lo mismo: hay dónde dejar la bici frente a las tiendas.', { luz: [3, 'B'] }],
  ], 'B. bike racks = soportes para dejar la bicicleta.'),
  'icf-en-largo-2': H('Aceptar y limitar', 'The writer thinks that phones in class should be', [['Many schools want to ban phones in class.', 'It is true that phones can distract students.'], ['However, a total ban is not the answer.', 'Phones have dictionaries, calculators and maps.'], ['I believe teachers should decide when students can use them.']], ['completely banned.', 'used only when the teacher allows it.', 'used all the time.', 'kept by the teachers.'], [
    ['El primer párrafo trae la idea de otros y el autor la acepta en parte: «It is true that».', { luz: [0, 1], n: { 0: 'acepta' } }],
    ['«However» pone el límite: prohibirlos del todo, no.', { luz: [2], x: ['A'], n: { 1: 'limita', A: 'lo que niega' } }],
    ['Su opinión va con «I believe»: que decida el profesor.', { luz: [4], n: { 2: 'opina' } }],
    ['C se va al otro extremo, y que los guarden los profesores no aparece.', { x: ['C', 'D'], n: { C: 'exagera', D: 'no está' } }],
    ['Queda B: ni todo el tiempo ni nunca.', { luz: ['B'] }],
  ], 'B. Acepta que distraen, pero pide que decida el profesor.'),
  // ------------------------------------------------------------------------------------ Vocabulario en contexto
  'icf-en-vocabulario-1': H('El verbo con partícula', 'Choose the words that complete the text.', [['The floor of the temple is very old.', 'Please ______ your shoes', 'and leave them at the door.']], ['take off', 'put on', 'turn off'], [
    ['Mira alrededor: los zapatos se dejan en la puerta para cuidar el piso viejo.', { luz: [0, 2], n: { 0: 'pista' } }],
    ['Si se dejan en la puerta, no se llevan puestos: hay que quitárselos.', { luz: [1] }],
    ['«Put on» es ponérselos: lo contrario.', { x: ['B'], n: { B: 'ponerse' } }],
    ['«Turn off» va con aparatos: la luz, el radio.', { x: ['C'], n: { C: 'aparatos' } }],
    ['Queda «take off».', { luz: ['A'] }],
  ], 'A. take off = quitarse (la ropa, los zapatos).'),
  'icf-en-vocabulario-2': H('¿-ed o -ing?', 'Choose the word that completes the text.', [['The last page of the book', 'changed everything.'], ['Nobody expected it.', 'It was a really ______ ending.']], ['surprised', 'surprising', 'surprise'], [
    ['El hueco va antes de «ending»: describe el final, una cosa.', { luz: [3], n: { 1: 'una cosa' } }],
    ['Con -ing se dice cómo es lo que causa el sentimiento; con -ed, cómo se siente la persona.', {}],
    ['Nadie lo esperaba: el final causa la sorpresa. Los sorprendidos son los lectores, no el final.', { luz: [1, 2], x: ['A'], n: { A: 'es de personas' } }],
    ['«Surprise» es sustantivo: con «really» delante hace falta un adjetivo.', { x: ['C'], n: { C: 'sustantivo' } }],
    ['Queda «surprising».', { luz: ['B'] }],
  ], 'B. surprising = sorprendente (el final que sorprende).'),
  // ------------------------------------------------------------------------------------ Inferencia y opinión
  'icf-en-inferencia-1': H('Unir los datos', 'What can we infer from the text?', [['When Mr. Ríos opened the door,', 'the kitchen was full of smoke.'], ['His daughter was standing next to the oven,', 'holding a black cake.'], ['She looked down and said:', '“It was supposed to be a surprise.”']], ['His daughter burned a cake she made for him.', 'Mr. Ríos burned the cake.', 'There was a big fire in the house.', 'His daughter does not like cakes.'], [
    ['Dato 1: humo en la cocina. Dato 2: un pastel negro. Juntos dicen que se quemó.', { luz: [1, 3], n: { 0: 'humo', 1: 'pastel negro' } }],
    ['Dato 3: «iba a ser una sorpresa». Lo hizo ella, y era para él.', { luz: [5], n: { 2: 'para él' } }],
    ['Mira el gesto: baja la mirada. Le da pena que saliera mal.', { luz: [4] }],
    ['B cambia quién lo hizo. C dice demasiado: hay humo, no un incendio.', { x: ['B', 'C'], n: { B: 'otra persona', C: 'exagera' } }],
    ['D no tiene apoyo en el texto. Queda A.', { x: ['D'], luz: ['A'], n: { D: 'no está' } }],
  ], 'A. Humo + pastel negro + sorpresa: se le quemó.'),
  'icf-en-inferencia-2': H('Qué le cambió la idea', 'What made Pablo change his opinion?', [['Pablo: Last year I thought', 'video games were a waste of time.'], ['Then my grandfather started playing chess online.', 'He made new friends from three countries.'], ['Now I think some games can bring people together.']], ['He played chess with new friends.', 'He saw his grandfather meet people through a game.', 'His grandfather told him games are bad.', 'He stopped playing video games.'], [
    ['Antes: «Last year I thought…». Ahora: «Now I think…». Hay un cambio de opinión.', { luz: [0, 4], n: { 0: 'antes', 2: 'ahora' } }],
    ['Lo que está en medio es la razón: el abuelo hizo amigos jugando ajedrez en línea.', { luz: [2, 3], n: { 1: 'la razón' } }],
    ['A cambia quién juega: es el abuelo, no Pablo.', { x: ['A'], n: { A: 'otra persona' } }],
    ['C dice lo contrario, y D no aparece en el texto.', { x: ['C', 'D'], n: { C: 'al revés', D: 'no está' } }],
    ['Queda B.', { luz: ['B'] }],
  ], 'B. Ver al abuelo hacer amigos le cambió la idea.'),
});
