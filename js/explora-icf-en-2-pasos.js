// Preicfes · Inglés, mundo 2 «Conversaciones Cortas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (diálogos A–D con sus trampas).
{
  xpAmplia('icf-en-dialogos-1', {
    conecta: 'icf-en-avisos-2',
    desde: [
      ['Desde cero: cómo se pregunta en inglés',
        xpMira('hoja', 'Antes de todo: en inglés, una pregunta **empieza** con un verbo pequeño que ayuda.', { paras: [['You', 'are', 'happy.'], ['Are', 'you', 'happy?'], ['You', 'like', 'rice.'], ['Do', 'you', 'like', 'rice?']] }, [
          ['En la lección de palabras viste que el verbo dice cuándo pasa algo.', {}],
          ['Para preguntar, el inglés pone un verbo pequeño adelante.', {}],
          ['Con «are» basta cambiarlo de puesto: «Are you happy?».', { luz: [3, 4], nota: { 1: 'se voltea' } }],
          ['Con otros verbos entra un ayudante nuevo: «do».', { luz: [9], nota: { 3: 'entra do' } }],
          ['A ese verbo pequeño se le llama auxiliar: is, are, do, does, did, can.', {}],
        ], 'Una pregunta de sí o no empieza con un auxiliar: is, are, do, does, did o can.'),
        xpHaz('hoja', 'Subraya la pregunta bien formada.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['You speak English?'], ['Do you speak English?'], ['Speak you English?']], pista: 'Busca la que empieza con un auxiliar antes de «you».' }, '«Do» va primero y luego la persona.')],
    ],
    despues: [
      ['Más difícil: preguntas que engañan',
        xpMira('hoja', 'Un paso más: algunas preguntas **no se traducen** palabra por palabra.', { paras: [['What do you do?', 'I\'m a mechanic.'], ['What are you doing?', 'I\'m cooking.'], ['How often do you swim?', 'Twice a week.']] }, [
          ['Algunas preguntas no se entienden traduciendo cada palabra.', {}],
          ['«What do you do?» pregunta tu trabajo, no lo que haces ahora.', { luz: [0, 1], nota: { 0: 'trabajo' } }],
          ['«What are you doing?» sí es lo que haces en este momento.', { luz: [2, 3], nota: { 1: 'ahora' } }],
          ['«How often» pide cada cuánto: twice a week, dos veces por semana.', { luz: [4, 5], nota: { 2: 'frecuencia' } }],
          ['Lee la pregunta entera, no solo la primera palabra.', {}],
        ], 'What do you do pide el oficio; how often, cada cuánto.'),
        xpHaz('hoja', '«How often do you visit your grandparents?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In Medellín.'], ['Every Sunday.'], ['They are fine.']], pista: 'Pide cada cuánto: busca una frecuencia.' }, '«Every Sunday» dice cada cuánto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen alguien dice una frase y tú escoges la **respuesta natural** entre cuatro.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['Is this seat free?'], ['Yes, it is free of charge.'], ['Sure, sit down.'], ['I\'m free tomorrow.'], ['It is a seat.']] }, [
        ['Alguien pregunta si el puesto está libre. ¿Qué dirías tú?', { luz: [0] }],
        ['La A repite «free», pero habla de no pagar: no tiene sentido aquí.', { luz: [1], nota: { 1: 'repite' } }],
        ['La C también usa «free» y habla de su tiempo libre.', { luz: [3], nota: { 3: 'repite' } }],
        ['La D repite «seat» y no responde nada.', { luz: [4], nota: { 4: 'repite' } }],
        ['La B no repite y es lo que dirías: siéntate.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Escoge lo que una persona diría de verdad, no lo que repite palabras.'),
      xpHaz('hoja', '«Can I borrow your pen?» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Yes, I can borrow it.'], ['Here you are.'], ['It\'s a blue pen.'], ['No, I don\'t borrow.']], pista: 'Tres opciones repiten palabras de la pregunta. ¿Qué dices al prestar algo?' }, '«Here you are» se dice al entregar algo.')],
    cierre: 'Auxiliar adelante, el dato que se pide y la respuesta natural, no la que repite.',
  });

  xpAmplia('icf-en-dialogos-2', {
    conecta: 'icf-en-dialogos-1',
    desde: [
      ['Desde cero: ser amable en inglés',
        xpMira('hoja', 'Antes de todo: cuatro palabras de cortesía que se usan **todo el día**.', { paras: [['please', 'por favor'], ['thank you', 'gracias'], ['sorry', 'perdón'], ['excuse me', 'disculpe']] }, [
          ['En la lección anterior viste que una pregunta empieza con un auxiliar.', {}],
          ['Las preguntas amables usan auxiliares suaves: could, would, may.', {}],
          ['«Please» suaviza un pedido, como el «por fa» de la casa.', { luz: [0], nota: { 0: 'pide' } }],
          ['«Thank you» agradece, y se responde «you’re welcome».', { luz: [2], nota: { 1: 'agradece' } }],
          ['«Sorry» pide perdón después; «excuse me» llama la atención antes.', { luz: [4, 6], nota: { 2: 'después', 3: 'antes' } }],
        ], 'Please pide, thank you agradece, sorry perdona y excuse me llama.'),
        xpHaz('hoja', 'Quieres pasar entre dos personas en el bus. Subraya lo que dices **antes**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Thank you.'], ['Excuse me.'], ['You\'re welcome.']], pista: 'Una agradece y otra responde a las gracias. ¿Cuál pide paso?' }, '«Excuse me» pide paso antes de molestar.')],
    ],
    despues: [
      ['Más difícil: quién hace la acción',
        xpMira('hoja', 'Un paso más: la misma puerta, tres preguntas, y en cada una la **hace alguien distinto**.', { paras: [['Could you close the door?'], ['Can I close the door?'], ['Shall I close the door?']] }, [
          ['Las tres hablan de la misma puerta, pero no de la misma persona.', {}],
          ['«Could you» pide que la otra persona lo haga.', { luz: [0], nota: { 0: 'tú lo haces' } }],
          ['«Can I» pide permiso para hacerlo yo.', { luz: [1], nota: { 1: 'yo, con permiso' } }],
          ['«Shall I» ofrece ayuda: ¿quieres que yo la cierre?', { luz: [2], nota: { 2: 'yo, ofrezco' } }],
          ['A una oferta se responde «yes, please» o «no, thanks, I’m fine».', {}],
        ], 'Could you pide un favor; can I pide permiso; shall I ofrece ayuda.'),
        xpHaz('hoja', '«Shall I carry your bag?» Subraya la respuesta que encaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Yes, please. It\'s heavy.'], ['Yes, I shall.'], ['Sorry, I can\'t carry it.']], pista: 'Te ofrecen ayuda a ti: acepta o agradece.' }, 'A una oferta se responde «yes, please» o «no, thanks».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la trampa suele ser una **fórmula de otra situación**.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['I\'m sorry, I broke your glass.'], ['You\'re welcome.'], ['Don\'t worry, it was old.'], ['Yes, it is broken.'], ['I\'d love to.']] }, [
        ['Alguien se disculpa: rompió un vaso tuyo.', { luz: [0] }],
        ['La A responde a unas gracias, no a una disculpa.', { luz: [1], nota: { 1: 'otra fórmula' } }],
        ['La C repite «broke» y no calma a nadie.', { luz: [3], nota: { 3: 'repite' } }],
        ['La D acepta una invitación, y aquí nadie invita.', { luz: [4], nota: { 4: 'otra fórmula' } }],
        ['La B tranquiliza: así se responde una disculpa.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Nombra la situación y escoge su fórmula; descarta las de otra situación.'),
      xpHaz('hoja', '«Would you like to come to my birthday party?» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Yes, I like birthdays.'], ['You\'re welcome.'], ['I\'d love to. What time?'], ['It\'s my birthday.']], pista: 'Te invitan: acepta o rechaza con amabilidad.' }, '«I’d love to» acepta y pregunta la hora.')],
    cierre: 'Please, could you, can I y shall I: cada situación tiene su fórmula amable.',
  });

  xpAmplia('icf-en-dialogos-3', {
    conecta: 'icf-en-dialogos-2',
    desde: [
      ['Desde cero: palabras para sentir',
        xpMira('hoja', 'Antes de todo: para responder bien hay que **nombrar** lo que el otro siente.', { paras: [['happy', 'feliz'], ['sad', 'triste'], ['tired', 'cansado'], ['worried', 'preocupado'], ['angry', 'bravo']] }, [
          ['En la lección anterior viste que la cortesía tiene fórmulas fijas.', {}],
          ['Para reaccionar bien, primero hay que nombrar lo que el otro siente.', {}],
          ['«Happy» es feliz y «sad», triste: las más fáciles.', { luz: [0, 2] }],
          ['«Tired» es cansado; «worried», preocupado.', { luz: [4, 6] }],
          ['«Angry» es bravo, como cuando alguien está de mal genio.', { luz: [8] }],
          ['Con «I feel» o «I am», la persona te cuenta cómo está.', {}],
        ], 'Happy, sad, tired, worried, angry: nombra la emoción antes de responder.'),
        xpHaz('hoja', '«I didn\'t sleep at all last night.» Subraya cómo se siente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['happy'], ['tired'], ['angry']], pista: '¿Cómo queda alguien que no durmió nada?' }, 'Sin dormir se queda cansado: tired.')],
    ],
    despues: [
      ['Más difícil: yo también, con el auxiliar justo',
        xpMira('hoja', 'Un paso más: «yo también» **cambia** según el verbo que usó la otra persona.', { paras: [['I\'m hungry.', 'So am I.'], ['I can dance.', 'So can I.'], ['I went to Cali.', 'So did I.'], ['I didn\'t go.', 'Neither did I.']] }, [
          ['«Yo también» cambia según el auxiliar de la frase.', {}],
          ['Con «am», va «so am I».', { luz: [0, 1], nota: { 0: 'am' } }],
          ['Con «can», va «so can I».', { luz: [2, 3], nota: { 1: 'can' } }],
          ['Con un pasado como «went», va «so did I».', { luz: [4, 5], nota: { 2: 'did' } }],
          ['Si la frase niega, «yo tampoco» es «neither did I».', { luz: [6, 7], nota: { 3: 'tampoco' } }],
        ], 'So + el mismo auxiliar + I; si la frase niega, neither.'),
        xpHaz('hoja', '«I\'m from Cartagena.» Subraya «yo también».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['So do I.'], ['So am I.'], ['Neither am I.']], pista: 'La frase usa «am» y no niega.' }, '«I’m» pide «so am I».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la respuesta buena va con la **emoción** de quien habla.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['I lost my job yesterday.'], ['Congratulations!'], ['Oh no, I\'m so sorry.'], ['Yes, you lost it.'], ['Sounds great!']] }, [
        ['Una mala noticia: perdió el trabajo.', { luz: [0] }],
        ['«Congratulations» felicita: va con logros, no con pérdidas.', { luz: [1], nota: { 1: 'otra emoción' } }],
        ['La C repite «lost» y suena frío.', { luz: [3], nota: { 3: 'repite' } }],
        ['«Sounds great» acepta un plan, y aquí no hay plan.', { luz: [4], nota: { 4: 'otra fórmula' } }],
        ['La B lamenta la noticia: es lo natural.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Primero la emoción del otro; luego la fórmula que va con ella.'),
      xpHaz('hoja', '«I won the school chess tournament!» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['I\'m sorry to hear that.'], ['Well done! You must be happy.'], ['Yes, I won it.'], ['Neither did I.']], pista: 'Es una buena noticia: descarta lo que lamenta o repite.' }, 'Un logro se felicita: well done.')],
    cierre: 'Nombra la emoción, mira el auxiliar y responde como lo haría una persona.',
  });
}
