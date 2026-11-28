// Preicfes · Lectura Crítica, mundo 1 «Lo que Dice el Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero (dato, oración, párrafo, contexto, referente), sube al caso que despista y termina mostrando cómo
// lo pregunta el examen, con las trampas de cada opción. Textos breves propios.
{
  xpAmplia('icf-lc-literal-1', {
    conecta: null,
    desde: [
      ['Desde cero: qué es un dato',
        xpMira('hoja', 'Antes de las palabras difíciles: un **texto** es un grupo de oraciones sobre algo. Cada **dato** es una cosa que el texto afirma.', { paras: [['La tienda de doña Rosa abre a las seis.'], ['Vende pan, leche y huevos.'], ['Los sábados les fía a los vecinos.']] }, [
          ['Un texto puede ser corto: aquí hay tres oraciones.', { luz: [0, 1, 2] }],
          ['Cada oración afirma algo: eso es un dato.', { luz: [0], nota: { 0: 'dato' } }],
          ['Este dato dice qué vende la tienda.', { luz: [1], nota: { 1: 'dato' } }],
          ['Y este dice cuándo fía y a quién.', { luz: [2], nota: { 2: 'dato' } }],
          ['Una pregunta literal pide un dato que está escrito.', {}],
          ['Leer con lupa es buscar ese dato, palabra por palabra.', {}],
        ], 'Un dato es lo que el texto afirma; la pregunta literal lo pide tal cual.'),
        xpHaz('hoja', 'Pregunta: **¿quién** viaja gratis? Subraya la oración que lo responde.', { modo: 'toca', meta: [2], paras: [['El bus a Girardot sale cada hora.'], ['El pasaje cuesta 35 000 pesos.'], ['Los niños menores de cinco años no pagan.']], pista: 'Esa oración habla del horario o del precio. Busca la que dice quién no paga.' }, 'La respuesta está escrita: los niños menores de cinco años.')],
      ['Desde cero: oración y párrafo',
        xpMira('hoja', 'Otra pieza básica: la **oración** y el **párrafo**. Con ellas se arma todo texto.', { paras: [['Mi barrio tiene una cancha.', 'Allí juegan los niños por la tarde.'], ['El año pasado se dañó la malla.', 'Los vecinos hicieron una rifa para arreglarla.']] }, [
          ['Una oración empieza con mayúscula y termina en punto.', { luz: [0] }],
          ['Esta es otra oración: dice algo más.', { luz: [1] }],
          ['Juntas forman un párrafo: las dos hablan de la cancha.', { luz: [0, 1], nota: { 0: 'párrafo 1' } }],
          ['Con el punto aparte empieza otro párrafo.', { luz: [2], nota: { 1: 'párrafo 2' } }],
          ['Este segundo párrafo cuenta un problema y su arreglo.', { luz: [2, 3] }],
        ], 'Oración: una idea con su punto. Párrafo: varias oraciones sobre lo mismo.'),
        xpHaz('hoja', 'Pon al margen de qué habla cada párrafo.', { modo: 'margen', rotulos: ['lo que cambió', 'cómo es el lugar'], meta: [1, 0], paras: [['La biblioteca queda junto al parque.', 'Tiene dos pisos.'], ['En enero pintaron las paredes.', 'También cambiaron las sillas.']], pista: 'Alguno no va ahí: uno describe el lugar y otro cuenta lo que se hizo.' }, 'Uno describe y el otro cuenta un cambio.')],
    ],
    despues: [
      ['Más difícil: cierto, pero no está',
        xpMira('hoja', 'Un paso más: la opción más peligrosa es la que **es verdad en el mundo**, pero el texto no la dice.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El café crece mejor a la sombra de árboles altos, que lo protegen del sol fuerte.'], ['La sombra protege al café del sol fuerte.'], ['Colombia vende mucho café a otros países.'], ['El café nunca crece al sol.']] }, [
          ['Arriba, el texto. Abajo, tres opciones.', { luz: [0] }],
          ['La primera dice lo mismo con otras palabras.', { luz: [1], nota: { 1: 'lo dice' } }],
          ['La segunda es cierta en el mundo, pero el texto no la dice.', { luz: [2], tacha: [2], nota: { 2: 'no está' } }],
          ['La tercera usa «nunca»: el texto dice «mejor», no «solo».', { luz: [3], tacha: [3], nota: { 3: 'exagera' } }],
          ['Palabras como nunca, siempre y todos piden una prueba igual de fuerte.', {}],
        ], 'Que algo sea verdad en el mundo no basta: tiene que estar en el texto.'),
        xpHaz('hoja', 'Texto: «La guadua crece rápido y se usa para construir casas en el Eje Cafetero». **Tacha** las dos que el texto no dice.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [1, 2], paras: [['La guadua sirve para construir.'], ['La guadua es la planta más rápida del mundo.'], ['La guadua es más barata que el ladrillo.']], pista: 'Una de las tachadas sí está en el texto, dicha de otra forma.' }, 'Lo del mundo entero y lo del ladrillo nadie lo escribió.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la pregunta literal empieza con «Según el texto…». Las opciones falsas casi siempre **suenan bien**.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['En la vereda, la escuela tiene una sola maestra. Ella enseña a los cinco grados en el mismo salón, por turnos.'], ['La maestra enseña a varios grados en un salón.'], ['La escuela necesita más maestras.'], ['Todos los niños de la vereda estudian allí.'], ['Los cinco grados tienen salones distintos.']] }, [
        ['La pregunta: según el texto, ¿qué es cierto de la escuela?', { luz: [0] }],
        ['B puede ser verdad, pero el texto no lo dice: es una opinión.', { luz: [2], nota: { 2: 'no está' } }],
        ['C usa «todos»: el texto no habla de todos los niños.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['D usa las palabras del texto, pero dice lo contrario.', { luz: [4], nota: { 4: 'lo cambia' } }],
        ['A dice lo mismo con otras palabras: esa es.', { luz: [1], nota: { 1: 'lo dice' } }],
        ['Antes de elegir, señala en el texto la frase que la respalda.', { luz: [0, 1] }],
      ], 'La correcta se puede señalar en el texto; las trampas suenan bien, pero no.'),
      xpHaz('hoja', 'Texto: «El mercado campesino llega a la plaza cada quince días, con frutas de seis veredas». Según el texto, ¿qué es cierto?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El mercado es más barato que el supermercado.'], ['Llega todas las semanas.'], ['Trae frutas de varias veredas.'], ['Todas las frutas del pueblo vienen de ahí.']], pista: 'Esa opción suena posible, pero no la puedes señalar en el texto. Busca la que repite el dato con otras palabras.' }, 'Seis veredas son varias: el dato está escrito.')],
    cierre: 'Señala el dato en el texto, mira qué hace cada párrafo y desconfía de lo que suena bien pero no está.',
  });

  xpAmplia('icf-lc-literal-2', {
    conecta: 'icf-lc-literal-1',
    desde: [
      ['Desde cero: contexto y referente',
        xpMira('hoja', 'Antes de las palabras difíciles: una palabra puede tener **varios sentidos**, y algunas palabras solo **apuntan** a otras.', { paras: [['Juan', 'tomó', 'el bus.'], ['Juan', 'tomó', 'una decisión.'], ['Juan', 'lo', 'perdió por llegar tarde.']] }, [
          ['En la lección de datos del texto viste que la respuesta se señala, no se recuerda.', {}],
          ['Aquí «tomó» significa subirse al bus.', { luz: [1, 2], nota: { 0: 'se subió' } }],
          ['Aquí la misma palabra significa decidir.', { luz: [4, 5], nota: { 1: 'decidió' } }],
          ['El sentido depende de las palabras vecinas: eso es el contexto.', { luz: [1, 4] }],
          ['«Lo» no dice nada solo: apunta al bus, su referente.', { luz: [7], sello: { 7: 'el bus' } }],
          ['Contexto para el sentido; referente para lo que se apunta.', {}],
        ], 'Contexto: las palabras vecinas dan el sentido. Referente: aquello a lo que apunta un «lo» o un «ella».'),
        xpHaz('hoja', '«Marta compró una mesa y la pintó de verde». Subraya el **referente** de «la».', { modo: 'toca', meta: [2], paras: [['Marta', 'compró', 'una mesa', 'y la pintó de verde.']], pista: 'Pon cada opción en lugar de «la»: ¿qué se pinta de verde?' }, 'Lo que se pinta de verde es la mesa.')],
    ],
    despues: [
      ['Más difícil: el sinónimo que no encaja',
        xpMira('hoja', 'Un paso más: un sinónimo de diccionario puede **romper** la oración. Siempre se prueba en el texto.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El equipo', 'sufrió', 'una dura', 'derrota.'], ['El equipo sufrió una rígida derrota.'], ['El equipo sufrió una lenta derrota.'], ['El equipo sufrió una dolorosa derrota.']] }, [
          ['Te piden cambiar «dura» sin cambiar el sentido.', { luz: [2] }],
          ['«Rígida» es sinónimo de dura, pero de una piedra.', { luz: [4], tacha: [4], nota: { 1: 'otro sentido' } }],
          ['«Lenta» cabe en la oración, pero dice otra cosa.', { luz: [5], tacha: [5], nota: { 2: 'cambia' } }],
          ['En una derrota, «dura» habla de dolor, no de algo sólido.', { luz: [2] }],
          ['«Dolorosa» conserva lo que la oración quería decir.', { luz: [6], nota: { 3: 'encaja' } }],
        ], 'El sinónimo correcto es el que sirve en esa oración, no en el diccionario.'),
        xpHaz('hoja', '«La empresa **despidió** a veinte trabajadores». Subraya lo que significa en esta oración.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Les dijo adiós.'], ['Los sacó del empleo.'], ['Los acompañó a la puerta.']], pista: 'Esa opción es otro sentido de «despedir», el de las visitas. Piensa en un trabajo.' }, 'Con «trabajadores» al lado, despedir es quitar el empleo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el texto, la palabra X puede reemplazarse por…» o «la expresión Y se refiere a…».', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['La junta pidió arreglar la vía. El municipio aceptó, pero la obra se frenó por falta de plata.'], ['se detuvo'], ['se calmó'], ['se aceleró'], ['se canceló para siempre']] }, [
        ['La pregunta: ¿qué palabra puede reemplazar a «frenó»?', { luz: [0] }],
        ['B sirve para calmar a una persona brava, no para una obra.', { luz: [2], nota: { 2: 'otro sentido' } }],
        ['C dice lo contrario: sentido opuesto en la misma oración.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D exagera: el texto no dice que no vuelva a empezar.', { luz: [4], nota: { 4: 'absoluto' } }],
        ['A conserva el sentido: la obra se detuvo.', { luz: [1], nota: { 1: 'encaja' } }],
        ['Método: lee la oración con cada opción y escucha si cambia.', {}],
      ], 'Pon cada opción en la oración: la que no cambia el sentido es la buena.'),
      xpHaz('hoja', '«La rectora habló con los padres. Ellos le contaron que el bus llega tarde». Subraya a quién se refiere «ellos».', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['A la rectora'], ['A los padres'], ['Al bus'], ['A los niños del bus']], pista: '«Ellos» es masculino y plural: busca quién se nombró antes y cabe en esa forma.' }, 'Los padres son los únicos nombrados en masculino plural.')],
    cierre: 'Prueba cada palabra en su oración, busca el referente hacia atrás y no te fíes del sinónimo del diccionario.',
  });
}
