// Preicfes · Inglés, mundo 7 «Inferir y Opinar» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-inferencia-1', [
  ['Unir dos datos',
    xpMira('hoja', 'Empecemos por la idea: **inferir** es unir dos datos del texto.', { letras: ['1', '2', 'idea', 'no'], paras: [['Her umbrella is wet.'], ['She is taking off her coat.'], ['It is raining outside.'], ['She is late for work.']] }, [
      ['Primer dato: la sombrilla está mojada.', { luz: [0] }],
      ['Segundo: se quita el abrigo, acaba de llegar.', { luz: [1] }],
      ['Juntos dicen que afuera llueve.', { luz: [0, 1, 2], nota: { 2: 'se deduce' } }],
      ['Esto no tiene ningún dato.', { luz: [3], tacha: [3] }],
      ['Si no puedes señalar el dato, es imaginación.', {}],
    ], 'Dos datos señalados, una idea.'),
    xpHaz('hoja', '«Tom\'s plate is empty and he is asking for more.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['He cooked it.'], ['He is ill.'], ['He liked the food.']], pista: '¿Por qué pediría más?' }, 'Plato vacío y pedir más: le gustó.')],
  ['Los gestos',
    xpMira('hoja', 'Segunda idea: lo que alguien **hace** dice lo que siente.', { paras: [['She read the letter three times.'], ['He looked at the floor.'], ['They closed the door quietly.']] }, [
      ['Leerla tres veces: le importa mucho.', { luz: [0], nota: { 0: 'it matters' } }],
      ['Mirar al piso: siente pena o culpa.', { luz: [1], nota: { 1: 'ashamed' } }],
      ['Cerrar sin ruido: no quieren molestar.', { luz: [2], nota: { 2: 'careful' } }],
      ['Nadie escribió la emoción.', {}],
      ['Pregúntate por qué harías tú ese gesto.', { luz: [0, 1, 2] }],
    ], 'Gesto, razón, emoción.'),
    xpHaz('hoja', '«He kept looking at his watch.» Subraya lo que muestra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He loves his watch.'], ['He is impatient.'], ['He is asleep.']], pista: '¿Por qué alguien mira la hora muchas veces?' }, 'Mirar la hora muestra impaciencia.')],
  ['Must, might, can\'t',
    xpMira('hoja', 'Tercera idea: **must** es casi seguro, **might** es quizá, **can\'t** es imposible.', { paras: [['The lights are off and the car isn\'t there.'], ['They must be out.'], ['They might be at the cinema.'], ['They can\'t be at home.']] }, [
      ['Los datos: sin luz y sin carro.', { luz: [0] }],
      ['«Must be out»: casi seguro que salieron.', { luz: [1], nota: { 1: 'casi seguro' } }],
      ['«Might be at the cinema»: puede ser, no se sabe.', { luz: [2], nota: { 2: 'quizá' } }],
      ['«Can\'t be at home»: no puede ser.', { luz: [3], nota: { 3: 'imposible' } }],
      ['Escoge según la fuerza de la pista.', {}],
    ], 'Must: casi seguro. Might: quizá. Can\'t: imposible.'),
    xpHaz('hoja', '«He is eating a huge lunch. He ___ be hungry.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['must'], ['can\'t'], ['mustn\'t']], pista: 'La pista es fuerte: se come un almuerzo enorme.' }, 'Casi seguro: «must».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nina put the photo back in the drawer before her brother came in.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Her brother took the photo.'], ['She didn\'t want him to see it.'], ['The drawer was broken.']], pista: '¿Por qué la guardó antes de que entrara?' }, 'La guarda a tiempo: no quería que la viera.')],
], 'Señala los datos, mira los gestos y mide la fuerza.');

xpLec('icf-en-inferencia-2', [
  ['Fact or opinion',
    xpMira('hoja', 'Empecemos por la idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The park has 300 trees.'], ['The park should be bigger.'], ['In my opinion, it is dirty.'], ['It opens at six.']] }, [
      ['Los árboles se cuentan.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Should» dice lo que alguien cree mejor.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«In my opinion» lo anuncia.', { luz: [2], nota: { 2: 'opinion' } }],
      ['La hora se comprueba.', { luz: [3], nota: { 3: 'fact' } }],
      ['Busca should, I think, best, terrible.', {}],
    ], 'Contar o comprobar: fact. Should, I think: opinion.'),
    xpHaz('hoja', 'Subraya el **hecho**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The bridge is 90 metres long.'], ['The bridge is ugly.'], ['They should paint it.']], pista: '¿Cuál se puede medir?' }, 'La longitud se mide.')],
  ['Opinion + reason',
    xpMira('hoja', 'Segunda idea: una opinión vale más con **razones**.', { letras: ['opinion', 'a', 'b', 'c'], paras: [['The library should open on Sundays.'], ['Many people only have free time then.'], ['The door is blue.'], ['In the next town, it is full on Sundays.']] }, [
      ['Esto es lo que opina.', { luz: [0] }],
      ['Esto responde por qué.', { luz: [1], nota: { 1: 'reason' } }],
      ['Esto no responde nada.', { luz: [2], tacha: [2] }],
      ['Esto es un hecho que la apoya.', { luz: [3], nota: { 3: 'evidence' } }],
      ['Únelas con «because»: si suena, sirve.', { luz: [0, 1] }],
    ], 'Opinion + because + reason.'),
    xpHaz('hoja', 'Opinion: «We shouldn\'t use plastic bags». Subraya la **razón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['They are white.'], ['I have two bags.'], ['They stay in the sea for years.']], pista: 'Une con «because».' }, 'Solo esa responde por qué.')],
  ['Agree, disagree, change',
    xpMira('hoja', 'Tercera idea: alguien puede **aceptar** una parte y **cambiar** de idea.', { paras: [['You are right about the noise.'], ['But I don\'t agree with closing the bar.'], ['After the meeting, I changed my mind.']] }, [
      ['«You are right»: acepta una parte.', { luz: [0], nota: { 0: 'agrees' } }],
      ['«But I don\'t agree»: rechaza otra.', { luz: [1], nota: { 1: 'disagrees' } }],
      ['«Changed my mind»: ya piensa distinto.', { luz: [2], nota: { 2: 'change' } }],
      ['Aceptar algo no es aceptar todo.', { luz: [0, 1] }],
      ['Mira qué viene después de «but».', { luz: [1] }],
    ], 'You are right… but… changed my mind.'),
    xpHaz('hoja', '«I see your point, but I still think we need the road.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He doesn\'t want the road.'], ['He wants the road.'], ['He has no opinion.']], pista: '«Still» dice que sigue pensando lo mismo.' }, 'Entiende al otro, pero mantiene su idea.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«The film lasts three hours. I enjoyed every minute, although my brother fell asleep.» Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['It lasts three hours.'], ['It is enjoyable.'], ['Her brother fell asleep.']], pista: '¿En cuál podrían no estar de acuerdo?' }, 'La duración y el sueño son hechos.')],
], 'Comprueba hechos, pide razones y mira qué cambia.');
