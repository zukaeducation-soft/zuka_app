// Preicfes · Inglés, mundo 6 «Palabras en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza
// desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (un texto con huecos de vocabulario, A–D).
{
  xpAmplia('icf-en-vocabulario-1', {
    conecta: 'icf-en-corto-2',
    desde: [
      ['Desde cero: una palabra, dos sentidos',
        xpMira('hoja', 'Antes de todo: el **contexto** son las palabras de alrededor, y ellas escogen el sentido.', { paras: [['I drink a', 'glass', 'of milk every morning.'], ['The window is made of', 'glass.']] }, [
          ['En la lección de textos cortos viste que el contexto explica una palabra.', {}],
          ['El contexto son las palabras que rodean el hueco o la palabra rara.', {}],
          ['Aquí «glass» es un vaso: en él se toma leche.', { luz: [1], nota: { 0: 'vaso' } }],
          ['Aquí «glass» es vidrio: de eso está hecha la ventana.', { luz: [4], nota: { 1: 'vidrio' } }],
          ['La misma palabra cambia de sentido según lo que la rodea.', { luz: [1, 4] }],
        ], 'El contexto escoge el sentido: la misma palabra puede decir dos cosas.'),
        xpHaz('hoja', '«Turn on the light, please. It\'s very dark in here.» Subraya lo que significa «light».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['liviano'], ['luz'], ['claro de color']], pista: '¿Qué se prende cuando está oscuro?' }, '«Turn on the light»: prender la luz.')],
    ],
    despues: [
      ['Más difícil: las palabras que se disfrazan',
        xpMira('hoja', 'Un paso más: algunas palabras **se parecen** al español y significan otra cosa.', { paras: [['library', 'biblioteca, no librería'], ['actually', 'en realidad, no actualmente'], ['carpet', 'alfombra, no carpeta'], ['embarrassed', 'con vergüenza, no embarazada']] }, [
          ['Algunas palabras se parecen al español y significan otra cosa.', {}],
          ['«Library» es biblioteca: allí los libros se prestan.', { luz: [0, 1] }],
          ['«Actually» es en realidad, no actualmente.', { luz: [2, 3] }],
          ['«Carpet» es alfombra, no la carpeta del colegio.', { luz: [4, 5] }],
          ['«Embarrassed» es con vergüenza: un clásico para confundir.', { luz: [6, 7] }],
          ['Si el sentido no encaja, desconfía del parecido.', {}],
        ], 'Library, actually, carpet, embarrassed: se parecen, pero dicen otra cosa.'),
        xpHaz('hoja', '«I forgot his name. I was so embarrassed!» Subraya cómo se sintió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Con vergüenza'], ['Embarazada'], ['Muy feliz']], pista: 'Olvidar el nombre de alguien da… ¿qué sientes?' }, 'Olvidar un nombre da vergüenza: embarrassed.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen el texto tiene huecos y escoges la palabra que **encaja** en sentido y en pareja.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['We missed the bus, so we ___ a taxi.'], ['took'], ['made'], ['missed'], ['said']] }, [
        ['Un hueco y cuatro verbos: hay que escoger el que encaja.', { luz: [0] }],
        ['«Missed» repite el verbo de antes: copiar no es responder.', { luz: [3], nota: { 3: 'repite' } }],
        ['«Made» y «said» son verbos, pero no se dice «make a taxi».', { luz: [2, 4], nota: { 2: 'no encaja', 4: 'no encaja' } }],
        ['«Take a taxi» es la pareja natural: tomar un taxi.', { luz: [1], nota: { 1: 'sirve' } }],
        ['Prueba cada opción en voz baja dentro de la oración.', {}],
      ], 'Gana la palabra que encaja en sentido y en su pareja natural.'),
      xpHaz('hoja', '«It\'s cold in here. Please ___ the window.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['close'], ['open'], ['cold'], ['look']], pista: 'Hace frío: ¿qué haces con la ventana?' }, 'Con frío se cierra la ventana: close.')],
    cierre: 'Contexto, falsos amigos, parejas de palabras y partículas: así se escoge la palabra.',
  });

  xpAmplia('icf-en-vocabulario-2', {
    conecta: 'icf-en-gramatica-2',
    desde: [
      ['Desde cero: las cuatro clases de palabras',
        xpMira('hoja', 'Antes de las familias de palabras, conoce las **cuatro clases** que más se usan.', { paras: [['noun', 'una cosa: music'], ['verb', 'una acción: play'], ['adjective', 'cómo es: loud'], ['adverb', 'cómo se hace: loudly']] }, [
          ['En la lección de palabras pequeñas viste que «so» y «because» unen ideas.', {}],
          ['Un sustantivo nombra una cosa: music, la música.', { luz: [0, 1] }],
          ['Un verbo es una acción: play, tocar.', { luz: [2, 3] }],
          ['Un adjetivo dice cómo es algo: loud, ruidosa.', { luz: [4, 5] }],
          ['Un adverbio dice cómo se hace: loudly, con mucho ruido.', { luz: [6, 7] }],
        ], 'Sustantivo cosa, verbo acción, adjetivo cómo es, adverbio cómo se hace.'),
        xpHaz('hoja', '«She sings beautifully.» Subraya la palabra que dice **cómo** canta.', { modo: 'toca', meta: [2], paras: [['She', 'sings', 'beautifully.']], pista: 'Busca la que termina en -ly.' }, '«Beautifully» es un adverbio: dice cómo canta.')],
    ],
    despues: [
      ['Más difícil: el conector que suena bien y no cuadra',
        xpMira('hoja', 'Un paso más: un conector equivocado **suena bien**, pero cambia la lógica.', { paras: [['I studied a lot.', 'However,', 'I passed.'], ['I studied a lot.', 'Therefore,', 'I passed.'], ['I didn\'t study.', 'However,', 'I passed.']] }, [
          ['Las tres oraciones se parecen; solo cambia el conector o el dato.', {}],
          ['Estudiar mucho y pasar no sorprende: «however» no cuadra.', { luz: [1], nota: { 0: 'no cuadra' } }],
          ['Aquí sí: estudió, por eso pasó. «Therefore».', { luz: [4], nota: { 1: 'resultado' } }],
          ['No estudió y pasó: eso sí sorprende. «However».', { luz: [7], nota: { 2: 'sorpresa' } }],
          ['Pregunta siempre: ¿lo segundo se esperaba o no?', {}],
        ], 'Si lo segundo se esperaba, therefore; si sorprende, however.'),
        xpHaz('hoja', '«The bus was late. ___, we missed the start of the film.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['However'], ['Therefore'], ['Although']], pista: '¿Perderse el comienzo es una sorpresa o un resultado?' }, 'Perderse el comienzo es el resultado: therefore.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen las opciones son de la **misma familia**: decide la clase y luego el sentido.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['The guide was very ___ and smiled at everybody.'], ['friend'], ['friendly'], ['friendship'], ['unfriendly']] }, [
        ['Cuatro palabras de la misma familia: hay que escoger la clase correcta.', { luz: [0] }],
        ['Después de «very» va un adjetivo: «friend» y «friendship» son cosas.', { luz: [1, 3], nota: { 1: 'cosa', 3: 'cosa' } }],
        ['«Unfriendly» es adjetivo, pero dice lo contrario de sonreír.', { luz: [4], nota: { 4: 'al revés' } }],
        ['«Friendly», amable, encaja en clase y en sentido.', { luz: [2], nota: { 2: 'sirve' } }],
        ['Primero la clase de palabra; después, el sentido.', {}],
      ], 'Mira qué clase pide el hueco y luego el sentido de la oración.'),
      xpHaz('hoja', '«The test was easy. Everybody finished it ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['easy'], ['easily'], ['ease'], ['uneasy']], pista: 'Dice cómo lo terminaron: hace falta un adverbio.' }, '«Easily» dice cómo: sin problema.')],
    cierre: 'Clase de palabra, prefijo, final y conector: cada pista dice qué va en el hueco.',
  });
}
