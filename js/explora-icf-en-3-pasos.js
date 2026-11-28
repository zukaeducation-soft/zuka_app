// Preicfes · Inglés, mundo 3 «Gramática en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (un texto con huecos, A–D).
{
  xpAmplia('icf-en-gramatica-1', {
    conecta: 'icf-en-avisos-2',
    desde: [
      ['Desde cero: el verbo cambia con el tiempo',
        xpMira('hoja', 'Antes de todo: en inglés el **mismo verbo** cambia un poquito según el día del que hablas.', { paras: [['Today', 'I walk', 'to school.'], ['Yesterday', 'I walked', 'to school.'], ['Tomorrow', 'I will walk', 'to school.']] }, [
          ['En la lección de palabras viste que «-ed» dice que algo ya pasó.', {}],
          ['Aquí se arma la idea completa: el verbo cambia según el día.', {}],
          ['Hoy: «walk», el verbo tal cual.', { luz: [0, 1], nota: { 0: 'presente' } }],
          ['Ayer: se le pega «-ed» y queda «walked».', { luz: [3, 4], nota: { 1: 'pasado' } }],
          ['Mañana: «will» adelante y el verbo tal cual.', { luz: [6, 7], nota: { 2: 'futuro' } }],
          ['Algunos verbos son irregulares: go se vuelve went; buy, bought.', {}],
        ], 'Presente tal cual, pasado con -ed o irregular, futuro con will.'),
        xpHaz('hoja', '«Last Saturday we ___ to the river.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['go'], ['went'], ['will go']], pista: '«Last Saturday» ya pasó, y «go» es irregular.' }, '«Went» es el pasado de go.')],
    ],
    despues: [
      ['Más difícil: became o become, still o already',
        xpMira('hoja', 'Un paso más: formas **casi iguales** que se ponen juntas para confundir.', { paras: [['She became a doctor in May.'], ['She has become a doctor.'], ['He is still sleeping.'], ['He has already left.']] }, [
          ['Formas casi iguales: por eso aparecen juntas en las opciones.', {}],
          ['«Became» es pasado, con un momento cerrado como «in May».', { luz: [0], nota: { 0: 'pasado' } }],
          ['Con «has» va «become», la tercera forma, que no cambia.', { luz: [1], nota: { 1: 'has + become' } }],
          ['«Still» es todavía: la acción sigue pasando.', { luz: [2], nota: { 2: 'todavía' } }],
          ['«Already» es ya: pasó antes de lo que se esperaba.', { luz: [3], nota: { 3: 'ya' } }],
        ], 'Became con fecha; has become con has. Still: todavía. Already: ya.'),
        xpHaz('hoja', '«It\'s noon and my brother is ___ in bed.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['already'], ['still'], ['became']], pista: 'A mediodía sigue en la cama: ¿ya o todavía?' }, '«Still» dice que sigue en la cama.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen hay un **texto con huecos** y cuatro formas del mismo verbo.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['My grandfather ___ a farmer when he was twenty.'], ['become'], ['became'], ['has become'], ['becoming']] }, [
        ['Un hueco y cuatro formas del verbo «become», volverse.', { luz: [0] }],
        ['«When he was twenty» es un momento cerrado del pasado.', { luz: [0] }],
        ['«Become» y «becoming» no están en pasado.', { luz: [1, 4], nota: { 1: 'no', 4: 'no' } }],
        ['«Has become» llega hasta hoy: no va con «when he was».', { luz: [3], nota: { 3: 'trampa' } }],
        ['«Became» es el pasado simple: esa completa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Busca la palabra de tiempo y escoge la forma que va con ella.'),
      xpHaz('hoja', '«I ___ my homework. Can I watch TV now?» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['still do'], ['have already done'], ['will do yesterday'], ['am doing last week']], pista: 'Ya terminó: por eso pide ver televisión. Mira «already».' }, '«Have already done»: ya la terminó.')],
    cierre: 'Mira la palabra de tiempo, la forma del verbo y cuidado con became, still y already.',
  });

  xpAmplia('icf-en-gramatica-2', {
    conecta: 'icf-en-gramatica-1',
    desde: [
      ['Desde cero: las palabras pequeñas de lugar',
        xpMira('hoja', 'Antes de todo: unas **palabras pequeñas** dicen dónde está algo.', { paras: [['in', 'dentro'], ['on', 'encima'], ['under', 'debajo'], ['next to', 'al lado']] }, [
          ['En la lección anterior viste que la palabra de tiempo escoge el verbo.', {}],
          ['Ahora, palabras pequeñas que dicen dónde está algo.', {}],
          ['«In» es dentro: el celular está in the bag.', { luz: [0], nota: { 0: 'dentro' } }],
          ['«On» es encima: el libro está on the table.', { luz: [2], nota: { 1: 'encima' } }],
          ['«Under» es debajo y «next to», al lado.', { luz: [4, 6] }],
          ['Se llaman preposiciones y casi nunca se traducen palabra por palabra.', {}],
        ], 'In dentro, on encima, under debajo, next to al lado.'),
        xpHaz('hoja', '«My phone is ___ my bag. I have to open it to get it.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['on'], ['in'], ['next to']], pista: 'Para sacarlo tiene que abrir el bolso.' }, 'Si hay que abrirlo, está dentro: in.')],
    ],
    despues: [
      ['Más difícil: few o little, who, where o which',
        xpMira('hoja', 'Un paso más: parejas que el examen pone juntas para **confundir**.', { paras: [['few', 'friends'], ['little', 'money'], ['the man', 'who', 'cooks'], ['the town', 'where', 'I live'], ['the bike', 'which', 'I bought']] }, [
          ['«Few» va con lo que se cuenta: pocos amigos.', { luz: [0, 1], nota: { 0: 'se cuenta' } }],
          ['«Little» va con lo que no se cuenta: poca plata.', { luz: [2, 3], nota: { 1: 'no se cuenta' } }],
          ['Para unir ideas, «who» se usa con personas.', { luz: [5], nota: { 2: 'persona' } }],
          ['«Where» se usa con lugares.', { luz: [8], nota: { 3: 'lugar' } }],
          ['Y «which» se usa con cosas.', { luz: [11], nota: { 4: 'cosa' } }],
        ], 'Few cuenta y little no. Who persona, where lugar, which cosa.'),
        xpHaz('hoja', '«This is the café ___ we met.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['who'], ['where'], ['which']], pista: 'El café es un lugar donde pasó algo.' }, 'Un lugar donde pasó algo: where.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen el hueco se decide con **toda la oración**: gramática y sentido.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['There were ___ people at the concert, so we got good seats.'], ['few'], ['little'], ['much'], ['a lot of']] }, [
        ['El texto tiene un hueco; la pista está en el resto de la oración.', { luz: [0] }],
        ['«People» se cuenta: «little» y «much» quedan fuera.', { luz: [2, 3], nota: { 2: 'no cuenta', 3: 'no cuenta' } }],
        ['«A lot of» encaja en gramática, pero con mucha gente no hay buenos puestos.', { luz: [4], nota: { 4: 'sin sentido' } }],
        ['«Few»: poca gente, por eso hubo buenos puestos.', { luz: [1], nota: { 1: 'sirve' } }],
        ['Revisa dos cosas: la gramática y el sentido de toda la oración.', {}],
      ], 'Gramática y sentido: la opción correcta cumple las dos.'),
      xpHaz('hoja', '«My aunt, ___ lives in Pasto, sends us coffee every month.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['where'], ['which'], ['who'], ['when']], pista: '¿El hueco habla de una persona, de un lugar o de una cosa?' }, '«My aunt» es una persona: who.')],
    cierre: 'Preposiciones de lugar y tiempo, few o little, who, where o which y el conector justo.',
  });

  xpAmplia('icf-en-gramatica-3', {
    conecta: 'icf-en-gramatica-2',
    desde: [
      ['Desde cero: palabras que describen',
        xpMira('hoja', 'Antes de comparar hace falta un **adjetivo**: la palabra que dice cómo es algo.', { paras: [['a', 'big', 'house'], ['a', 'fast', 'car'], ['an', 'old', 'man']] }, [
          ['En la lección anterior viste palabras pequeñas como in, few y who.', {}],
          ['Para comparar hace falta primero un adjetivo: dice cómo es algo.', {}],
          ['«Big» es grande y va antes de la cosa: a big house.', { luz: [1] }],
          ['Al revés del español: no se dice «a house big».', { luz: [0, 1, 2] }],
          ['«Fast» es rápido y «old» es viejo.', { luz: [4, 7] }],
          ['Los adjetivos no cambian en plural: two big houses.', {}],
        ], 'El adjetivo dice cómo es algo y va antes de la cosa, sin plural.'),
        xpHaz('hoja', 'Subraya la frase bien escrita.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['a dog black'], ['a black dog'], ['a blacks dogs']], pista: 'El adjetivo va antes y no lleva s.' }, '«Black» va antes de «dog»: a black dog.')],
    ],
    despues: [
      ['Más difícil: el doble y la mitad',
        xpMira('hoja', 'Un paso más: comparaciones con **números** que se dicen de varias maneras.', { paras: [['Juice A: 2 000 pesos'], ['Juice B: 4 000 pesos'], ['B is twice as expensive as A.'], ['A is cheaper than B.'], ['A is half the price of B.']] }, [
          ['Dos jugos: A cuesta 2 000 pesos y B cuesta 4 000.', { luz: [0, 1] }],
          ['«Twice as expensive as»: B cuesta el doble.', { luz: [2], nota: { 2: 'el doble' } }],
          ['«Cheaper than» dice lo mismo, mirado desde el otro jugo.', { luz: [3], nota: { 3: 'más barato' } }],
          ['«Half the price»: A cuesta la mitad.', { luz: [4], nota: { 4: 'la mitad' } }],
          ['Tres frases distintas y una comparación: mira quién es el sujeto.', {}],
        ], 'Twice as… as: el doble. Half: la mitad. Cambiar el sujeto voltea la palabra.'),
        xpHaz('hoja', 'Sara tiene 16 años y Tomás, 8. Subraya la que es **cierta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tomás is older than Sara.'], ['Sara is twice as old as Tomás.'], ['Sara is as old as Tomás.']], pista: '16 es el doble de 8.' }, 'Sara tiene el doble de años que Tomás.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen aparecen **cuatro formas** del mismo adjetivo y un solo hueco.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Bogotá is ___ than Cartagena in December.'], ['cold'], ['colder'], ['more cold'], ['the coldest']] }, [
        ['Un hueco y cuatro formas del mismo adjetivo: típico de esta parte.', { luz: [0] }],
        ['«Than» avisa que se comparan dos ciudades.', { luz: [0] }],
        ['«Cold» sola no compara nada.', { luz: [1], nota: { 1: 'no compara' } }],
        ['«More cold» mezcla dos reglas, y «cold» es corta.', { luz: [3], nota: { 3: 'trampa' } }],
        ['«The coldest» es para el primero de todos, no para dos.', { luz: [4], nota: { 4: 'de todos' } }],
        ['«Colder than» es la que completa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Than pide -er o more; the pide -est o most; nunca las dos.'),
      xpHaz('hoja', '«Of all my friends, Juan is ___ person.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['the funniest'], ['funnier'], ['more funny'], ['the most funniest']], pista: '«Of all» escoge entre todos, y «funny» termina en -y.' }, 'Entre todos: the funniest.')],
    cierre: 'Adjetivo antes de la cosa; -er o more con than; the -est o the most entre todos.',
  });
}
