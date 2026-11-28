// Preicfes · Lectura Crítica, mundo 5 «Textos Filosóficos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): filosofía, concepto,
// definición y contraejemplo desde cero; luego lo que el autor expone para tumbarlo, la palabra que redefine y las trampas del examen
// (estrategia argumentativa, sinónimo de siempre frente a la definición del autor). Textos breves propios.
{
  xpAmplia('icf-lc-filosofico-1', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: qué es la filosofía',
        xpMira('hoja', 'Antes de las palabras difíciles: la **filosofía** se pregunta por lo que damos por hecho: qué es justo, qué es verdad, qué es un amigo.', { paras: [['¿Cuánto cuesta el pasaje del bus?'], ['¿Es justo que el pasaje cueste igual para todos?']] }, [
          ['En la lección de tesis viste que un argumento defiende una idea con razones.', {}],
          ['La primera pregunta se responde mirando la tarifa.', { luz: [0], nota: { 0: 'con un dato' } }],
          ['La segunda no: hay que pensar qué es justo.', { luz: [1], nota: { 1: 'filosófica' } }],
          ['Un texto filosófico responde esas preguntas con argumentos.', {}],
          ['Por eso tiene tesis, razones y objeciones, como ya viste.', {}],
        ], 'La filosofía pregunta por lo que damos por hecho y responde con argumentos, no con datos.'),
        xpHaz('hoja', '**Tacha** las dos preguntas que se cierran con un dato.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['¿A qué hora abre el banco?'], ['¿Qué hace que una promesa obligue?'], ['¿Cuántos habitantes tiene Neiva?'], ['¿Es bueno decir siempre la verdad?']], pista: 'Alguna de las tachadas no se cierra averiguando un dato.' }, 'La hora y los habitantes se averiguan; las otras se piensan.')],
    ],
    despues: [
      ['Más difícil: lo que el autor expone para tumbarlo',
        xpMira('hoja', 'Un paso más: el filósofo expone ideas **para tumbarlas**. Un **contraejemplo** es el caso que muestra que una idea general falla.', { paras: [['Se dice que lo que hace la mayoría es lo correcto.'], ['Pero una vez la mayoría del salón se burló de un compañero.'], ['Entonces, que muchos lo hagan no lo vuelve correcto.']] }, [
          ['Primero, una idea general que el autor expone.', { luz: [0], nota: { 0: 'se expone' } }],
          ['Luego un caso que no encaja: el contraejemplo.', { luz: [1], nota: { 1: 'contraejemplo' } }],
          ['Con ese caso, la idea general cae.', { luz: [0], tacha: [0] }],
          ['Lo que el autor defiende está al final.', { luz: [2], nota: { 2: 'tesis' } }],
          ['Trampa: elegir la idea expuesta como si fuera del autor.', { luz: [0] }],
        ], 'Un contraejemplo tumba una idea general; lo que se expone para tumbarlo no es la tesis.'),
        xpHaz('hoja', '«Dicen que quien estudia mucho siempre gana. Mi hermano estudió noches enteras y perdió». Subraya el **contraejemplo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Quien estudia mucho siempre gana.'], ['El hermano estudió mucho y perdió.'], ['Estudiar de noche cansa.']], pista: 'Busca el caso que no cumple la idea general.' }, 'Un solo caso que no cumple basta para tumbar un «siempre».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué estrategia usa el autor?». Hay que nombrar **cómo** argumenta: caso imaginado, contraejemplo, definición.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Imagina que pudieras saber todo lo que piensan los demás. ¿Seguirías teniendo amigos? Tal vez la amistad necesita que no lo sepamos todo».'], ['Cita a un experto en amistad.'], ['Plantea un caso imaginado para probar una idea.'], ['Da los datos de una encuesta.'], ['Cuenta una historia real de su vida.']] }, [
        ['La pregunta: ¿qué estrategia usa el autor?', { luz: [0] }],
        ['A falla: no hay ninguna cita de nadie.', { luz: [1], nota: { 1: 'no está' } }],
        ['C falla: no hay ningún número ni encuesta.', { luz: [3], nota: { 3: 'no está' } }],
        ['D falla: «imagina» no cuenta algo que pasó.', { luz: [4], nota: { 4: 'no es real' } }],
        ['B: «imagina que» abre un experimento mental.', { luz: [2], nota: { 2: 'estrategia' } }],
      ], 'Nombra la estrategia por sus marcas: «imagina» es un caso pensado; «por ejemplo», un caso real.'),
      xpHaz('hoja', '«Dicen que mentir siempre daña. Pero si miento para esconder a un amigo de quien lo persigue, lo salvo». ¿Qué estrategia usa el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Usa un contraejemplo.'], ['Cita una autoridad.'], ['Da una estadística.'], ['Define la palabra amigo.']], pista: 'Esa estrategia no aparece en el texto. Mira qué hace el caso del amigo con la idea general.' }, 'El caso del amigo tumba el «siempre»: es un contraejemplo.')],
    cierre: 'Reconoce la pregunta filosófica, sigue lo que se prueba y se descarta, y nombra la estrategia.',
  });

  xpAmplia('icf-lc-filosofico-2', {
    conecta: 'icf-lc-filosofico-1',
    desde: [
      ['Desde cero: qué es un concepto',
        xpMira('hoja', 'Antes de las palabras difíciles: un **concepto** es la idea que hay detrás de una palabra. «Silla» junta a todas las sillas, aunque sean distintas.', { paras: [['Una silla de madera, una de plástico y una de ruedas.'], ['Las tres sirven para que se siente una persona.'], ['Una piedra donde me siento no es una silla.']] }, [
          ['En la lección de la pregunta filosófica viste que se piensa qué es algo.', {}],
          ['Estas cosas se ven muy distintas.', { luz: [0] }],
          ['Pero tienen algo en común: eso es el concepto.', { luz: [1], nota: { 1: 'lo común' } }],
          ['Definir es decir ese algo común en una frase.', {}],
          ['Y la definición sirve para dejar casos por fuera.', { luz: [2], nota: { 2: 'queda por fuera' } }],
        ], 'Concepto: la idea común detrás de una palabra. Definir es decirla y marcar sus límites.'),
        xpHaz('hoja', 'Definición: «Un juego es una actividad con reglas que se hace por gusto». Subraya lo que **no** es un juego, según ella.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Parqués con los primos.'], ['Lavar la loza porque toca.'], ['Fútbol en el recreo.']], pista: 'Mira las dos condiciones: reglas y por gusto.' }, 'Lavar la loza no se hace por gusto: queda por fuera.')],
    ],
    despues: [
      ['Más difícil: la palabra que el autor redefine',
        xpMira('hoja', 'Un paso más: el autor puede usar una palabra común con un sentido **suyo**. Si respondes con el sentido de siempre, caes.', { paras: [['En este ensayo, «pobreza» no es solo falta de dinero.'], ['Llamo pobreza a no poder elegir cómo vivir.'], ['Así, alguien con plata pero sin libertad es pobre.']] }, [
          ['Primero avisa que la palabra no tiene su sentido de siempre.', { luz: [0], nota: { 0: 'aviso' } }],
          ['«Llamo» trae la definición del autor.', { luz: [1], nota: { 1: 'su definición' } }],
          ['Con ella, un rico puede ser pobre.', { luz: [2], nota: { 2: 'consecuencia' } }],
          ['Eso suena raro solo si usas el sentido común de pobreza.', { luz: [2] }],
          ['En filosofía, las palabras significan lo que el autor definió.', {}],
        ], 'Si el autor define una palabra, responde con su definición, no con la de todos los días.'),
        xpHaz('hoja', 'Con esa definición de pobreza, subraya el caso de una persona **pobre**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Gana poco, pero eligió su oficio y su lugar.'], ['Tiene dinero, pero no puede salir ni decidir nada.'], ['Compra lo que quiere y viaja.']], pista: 'Usa la definición del autor: no poder elegir cómo vivir.' }, 'Según el autor, es pobre quien no puede elegir, aunque tenga plata.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Para el autor, X significa…». La trampa es el sentido de diccionario que el autor no usa.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Entiendo por generosidad no dar lo que sobra, sino dar tiempo a quien lo necesita».'], ['dar las cosas que sobran'], ['regalar mucho dinero'], ['dedicar tiempo a quien lo necesita'], ['nunca pensar en uno mismo']] }, [
        ['La pregunta: para el autor, ¿qué es generosidad?', { luz: [0] }],
        ['A es justo lo que el autor dice que no es.', { luz: [1], nota: { 1: 'descartado' } }],
        ['B usa el sentido de siempre, no el del autor.', { luz: [2], nota: { 2: 'sentido común' } }],
        ['D exagera con un absoluto: «nunca».', { luz: [4], nota: { 4: 'absoluto' } }],
        ['C repite la definición con otras palabras.', { luz: [3], nota: { 3: 'su definición' } }],
      ], 'Busca «entiendo por» o «llamo» y responde con esa definición, no con la de siempre.'),
      xpHaz('hoja', '«Llamo disciplina no a obedecer, sino a cumplir lo que uno mismo se propuso». Según el autor, ¿qué caso es disciplina?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Hacer lo que manda el profesor sin pensar.'], ['Terminar el curso que uno decidió hacer.'], ['Hacer lo que todos hacen.'], ['No tener ninguna obligación.']], pista: 'Esa opción usa el sentido de siempre. Aplica la definición: cumplir lo que uno se propuso.' }, 'Terminar lo que uno mismo decidió es disciplina para el autor.')],
    cierre: 'Busca cómo define el autor cada concepto, úsalo así y separa el ejemplo de la analogía.',
  });
}
