// Preicfes · Inglés, mundo 4 «Textos Cortos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde
// cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (lectura literal, A–D). Nota dibujada con XLAB.
{
  const X = XLAB;
  // Una nota pegada sobre la mesa; v.s, v.m y v.f ponen los rótulos del saludo, el mensaje y la firma.
  const nota = v => X.foto(X.aviso(70, 26, 170, 124, ['Hi Carla,', 'I\'m at the bank.', 'Back in ten minutes.', 'Pedro'], 'papel') +
    (v.s ? X.rot(292, 54, 'saludo', 'oscuro') : '') + (v.m ? X.rot(292, 92, 'mensaje', 'oscuro') : '') + (v.f ? X.rot(292, 128, 'firma', 'oscuro') : ''), 200, 'mesa');

  xpAmplia('icf-en-corto-1', {
    conecta: 'icf-en-dialogos-2',
    desde: [
      ['Desde cero: qué es un mensaje corto',
        xpMira('dibujo', 'Antes de todo: un **mensaje corto** es una nota, un chat o un correo de pocas líneas.', { dib: nota, v: {}, alto: 200 }, [
          ['En la lección de cortesía viste que «could you» pide un favor.', {}],
          ['Un mensaje corto es una nota, un chat o un correo de pocas líneas.', {}],
          ['Arriba va el saludo: a quién se le escribe.', { s: 1 }],
          ['En el medio, el mensaje: qué pasa o qué se pide.', { s: 1, m: 1 }],
          ['Abajo va la firma: quién escribe.', { s: 1, m: 1, f: 1 }],
          ['Pedro avisa que vuelve pronto: esta vez no pide nada.', { s: 1, m: 1, f: 1 }],
        ], 'Saludo, mensaje y firma: tres partes que se leen en segundos.'),
        xpHaz('hoja', 'En esa nota, subraya **quién** vuelve en diez minutos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Carla'], ['Pedro'], ['The bank']], pista: 'Mira quién habla en primera persona, con «I».' }, '«I» es quien firma: Pedro.')],
    ],
    despues: [
      ['Más difícil: el dato que cambia',
        xpMira('hoja', 'Un paso más: muchos mensajes **corrigen** algo. Hay un dato viejo y uno nuevo.', { paras: [['The meeting is on Tuesday,', 'not Monday.'], ['Bring juice', 'instead of soda.'], ['Room 5 is closed;', 'we\'ll use Room 8.']] }, [
          ['Muchos mensajes corrigen algo: hay un dato viejo y uno nuevo.', {}],
          ['«Not Monday» tacha el dato viejo: la reunión es el martes.', { luz: [0], tacha: [1], nota: { 0: 'martes' } }],
          ['«Instead of» es en vez de: jugo, no gaseosa.', { luz: [2], tacha: [3], nota: { 1: 'jugo' } }],
          ['Un salón cerrado y otro que lo reemplaza: el 8.', { luz: [5], tacha: [4], nota: { 2: 'salón 8' } }],
          ['La pregunta casi siempre busca el dato nuevo.', {}],
        ], 'Not, instead of y closed marcan el dato viejo: responde con el nuevo.'),
        xpHaz('hoja', '«Dinner is at Grandma\'s, not at our house. Come at 7 instead of 6.» Subraya lo que es **cierto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Dinner is at home at 6.'], ['Dinner is at Grandma\'s at 7.'], ['Dinner is at Grandma\'s at 6.']], pista: 'Quédate con el dato nuevo en los dos casos.' }, 'Donde la abuela y a las siete: los datos nuevos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen lees un mensaje corto y escoges la frase que **coincide** con él.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Hi Sam, the pool is closed today. Let\'s play tennis at 4. Bring your racket. Kim'], ['Kim wants to swim today.'], ['Kim invites Sam to play tennis.'], ['Sam must buy a racket.'], ['The tennis court is closed.']] }, [
        ['Pregunta: ¿para qué escribe Kim? La respuesta está en el texto.', { luz: [0] }],
        ['La A dice nadar, pero la piscina está cerrada: al revés.', { luz: [1], nota: { 1: 'al revés' } }],
        ['La C cambia «bring» por «buy»: traer no es comprar.', { luz: [3], nota: { 3: 'cambia' } }],
        ['La D pone «closed» en otro lugar: lo cerrado es la piscina.', { luz: [4], nota: { 4: 'cambia' } }],
        ['La B: invita a jugar tenis a las cuatro.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Compara cada opción con el texto: una palabra cambiada la vuelve falsa.'),
      xpHaz('hoja', '«Mum, I\'m at Lina\'s to study. Her dad will drive me home at 9. Don\'t wait for dinner. Eva» Subraya lo cierto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Eva will eat at home.'], ['Lina\'s dad will take Eva home.'], ['Eva will walk home at 9.'], ['Mum must pick Eva up.']], pista: 'Busca quién maneja y si Eva come en casa.' }, 'El papá de Lina la lleva a las nueve.')],
    cierre: 'Quién escribe, para qué, el dato nuevo y cada opción comparada con el texto.',
  });

  xpAmplia('icf-en-corto-2', {
    conecta: 'icf-en-corto-1',
    desde: [
      ['Desde cero: tema, idea y detalle',
        xpMira('hoja', 'Antes de todo: tres palabras para hablar de un texto: **tema**, **detalle** e **idea principal**.', { paras: [['My street has a new garden.'], ['Neighbours planted tomatoes.'], ['Kids water them after school.']] }, [
          ['En la lección anterior viste que un mensaje corto quiere algo.', {}],
          ['Un texto tiene un tema: de qué habla, en dos o tres palabras.', {}],
          ['Aquí el tema es un jardín nuevo en la calle.', { luz: [0], nota: { 0: 'tema' } }],
          ['Las demás oraciones dan detalles: quién siembra y quién riega.', { luz: [1, 2], nota: { 1: 'detalle', 2: 'detalle' } }],
          ['La idea principal junta todo: los vecinos cuidan un jardín nuevo.', { luz: [0, 1, 2] }],
        ], 'Tema: de qué habla. Detalle: un dato. Idea principal: todo junto.'),
        xpHaz('hoja', 'En ese texto, subraya un **detalle**, no la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The neighbours look after a new garden.'], ['Kids water the plants after school.'], ['The street has a garden now.']], pista: 'Un detalle es un solo dato: quién, cuándo o cuánto.' }, 'Regar después del colegio es solo un dato.')],
    ],
    despues: [
      ['Más difícil: lo cierto que el texto no dice',
        xpMira('hoja', 'Un paso más: una opción puede ser **verdad en la vida** y no estar en el texto.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Coffee grows well in the mountains of Caldas.'], ['Colombia sells coffee to other countries.'], ['Caldas has mountains.'], ['Coffee only grows in Caldas.']] }, [
          ['Trampa frecuente: una opción cierta en la vida, pero ausente del texto.', { luz: [0] }],
          ['La a es verdad, pero aquí nadie habla de vender afuera.', { luz: [1], nota: { 1: 'doesn\'t say' } }],
          ['La b sale de «the mountains of Caldas».', { luz: [2], nota: { 2: 'correct' } }],
          ['La c exagera: «grows well» no es «solo crece ahí».', { luz: [3], nota: { 3: 'exagera' } }],
          ['Responde con el texto en la mano, no con lo que sabes.', {}],
        ], 'Si no lo puedes señalar en el texto, no lo dice, aunque sea cierto.'),
        xpHaz('hoja', 'Texto: «Owls hunt at night and sleep during the day.» Subraya lo que el texto **sí** dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Owls are birds.'], ['Owls are awake at night.'], ['Owls eat mice.']], pista: 'Dos son ciertas en la vida, pero el texto no las menciona.' }, '«Hunt at night» dice que de noche están despiertos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **de qué trata** el texto: una sola opción lo cubre entero.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Diana teaches dance in her garage. At first, two girls came. Now forty children learn salsa there every week.'], ['Forty children.'], ['A garage that Diana built.'], ['A dance class that grew.'], ['Salsa music in Colombia.']] }, [
        ['Pregunta: ¿de qué trata el texto? Una opción cubre todo.', { luz: [0] }],
        ['La A es un número cierto, pero es solo un detalle.', { luz: [1], nota: { 1: 'detalle' } }],
        ['La B inventa: el texto no dice que ella construyó el garaje.', { luz: [2], nota: { 2: 'no lo dice' } }],
        ['La D es demasiado amplia: habla de todo un país.', { luz: [4], nota: { 4: 'muy amplia' } }],
        ['La C junta el inicio y el ahora: una clase que creció.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'La idea principal no es un detalle, no inventa y no es más amplia que el texto.'),
      xpHaz('hoja', '«Mateo found an old bike in the street. He fixed it and gave it to his neighbour.» ¿De qué trata? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Old bikes in the city.'], ['A boy who repairs a bike and gives it away.'], ['Mateo\'s neighbour.'], ['How to fix a bike.']], pista: 'Busca la que cubre todo el texto: ni más amplia ni solo un detalle.' }, 'La B junta encontrar, arreglar y regalar.')],
    cierre: 'La idea cubre todo, el detalle es una parte y lo que no se señala, el texto no lo dice.',
  });
}
