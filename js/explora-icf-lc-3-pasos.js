// Preicfes · Lectura Crítica, mundo 3 «Tesis y Argumentos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): argumento, tesis,
// premisa y peso de una razón definidos desde cero; luego la tesis que llega al final, lo que fortalece sin parecerlo y las trampas
// del examen (tema frente a tesis, lo que habla del tema pero no pesa). Textos breves propios.
{
  xpAmplia('icf-lc-argumento-1', {
    conecta: 'icf-lc-estructura-1',
    desde: [
      ['Desde cero: qué es argumentar',
        xpMira('hoja', 'Antes de las palabras difíciles: **argumentar** es dar razones para que otro acepte una idea. Lo haces cuando pides permiso para salir.', { paras: [['Ma, déjame ir al paseo.'], ['Ya hice las tareas.'], ['Va la profesora y volvemos a las cinco.']] }, [
          ['En la lección de la función del párrafo viste que cada parte tiene un oficio.', {}],
          ['Aquí hay un oficio nuevo: convencer a alguien.', {}],
          ['Lo que se quiere lograr es la tesis: ir al paseo.', { luz: [0], nota: { 0: 'tesis' } }],
          ['Lo que se da para lograrlo son las razones.', { luz: [1, 2], nota: { 1: 'razón', 2: 'razón' } }],
          ['Tesis más razones forman un argumento.', { luz: [0, 1, 2] }],
          ['Si nadie pudiera estar en desacuerdo, no haría falta argumentar.', {}],
        ], 'Argumento: una tesis (lo que se quiere que aceptes) y las razones que la apoyan.'),
        xpHaz('hoja', 'Subraya la **tesis**: lo que se quiere que aceptes.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El parque necesita canecas.'], ['La gente bota la basura en el pasto.'], ['Los perros riegan las bolsas.']], pista: 'Esa es una razón: responde por qué. Busca lo que se pide.' }, 'Las otras dos responden por qué hacen falta las canecas.')],
    ],
    despues: [
      ['Más difícil: la tesis que llega al final',
        xpMira('hoja', 'Un paso más: las razones también se llaman **premisas**. Y la tesis no siempre va al comienzo: a veces llega de última.', { paras: [['Los buses pasan llenos a las seis.'], ['Muchos estudiantes llegan tarde a primera hora.'], ['A las seis y media pasa un bus vacío.'], ['Por eso, el colegio debería entrar media hora después.']] }, [
          ['Premisa: una afirmación que sirve de base a otra.', {}],
          ['Estas tres son premisas: dan datos.', { luz: [0, 1, 2], nota: { 0: 'premisa', 1: 'premisa', 2: 'premisa' } }],
          ['«Por eso» anuncia lo que se concluye de ellas.', { luz: [3] }],
          ['Esa es la tesis, aunque llegue de última.', { luz: [3], nota: { 3: 'tesis' } }],
          ['Busca lo que se pide; no te fíes del lugar.', {}],
        ], 'Premisa: la base. Tesis: lo que se concluye y se pide, esté donde esté.'),
        xpHaz('hoja', 'Subraya la **tesis** de este texto.', { modo: 'toca', meta: [2], paras: [['En la vereda no hay señal.', 'Los niños no pueden hacer tareas en línea.', 'La alcaldía debería poner una antena.', 'Ya lo hizo el pueblo vecino.']], pista: 'Esa es una premisa: da un dato. Busca la que pide algo que se puede discutir.' }, '«Debería» pide algo: esa es la tesis, aunque no esté al final.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Cuál es la tesis del texto?». La trampa más común es una opción que dice **el tema**.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Las ciclorrutas se llenan de motos. Los ciclistas tienen que bajarse a la calle. La ciudad debe multar a las motos que las usen.'], ['las ciclorrutas de la ciudad'], ['las motos ocupan las ciclorrutas'], ['la ciudad debe multar a las motos que usan las ciclorrutas'], ['las motos deben desaparecer']] }, [
        ['La pregunta: ¿cuál es la tesis del texto?', { luz: [0] }],
        ['A es el tema: de qué se habla, sin afirmar nada.', { luz: [1], nota: { 1: 'tema' } }],
        ['B es una premisa: un dato que sostiene la tesis.', { luz: [2], nota: { 2: 'premisa' } }],
        ['D exagera: el texto no pide eso.', { luz: [4], nota: { 4: 'exagera' } }],
        ['C es lo que se pide y se puede discutir: la tesis.', { luz: [3], nota: { 3: 'tesis' } }],
      ], 'Tesis: lo que el autor defiende. No es el tema ni un dato de apoyo.'),
      xpHaz('hoja', '«En el pueblo no hay dónde reciclar. Las bolsas terminan en la quebrada. El municipio debe poner puntos de reciclaje». ¿Cuál es la tesis?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El reciclaje en el pueblo.'], ['Las bolsas terminan en la quebrada.'], ['El municipio debe poner puntos de reciclaje.'], ['Nadie en el pueblo recicla.']], pista: 'Esa es el tema, un dato o una exageración. Busca lo que se pide.' }, 'Lo que se pide al municipio es la tesis.')],
    cierre: 'La tesis es lo que se defiende; las premisas la sostienen; el tema solo dice de qué se habla.',
  });

  xpAmplia('icf-lc-argumento-2', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: un argumento se puede pesar',
        xpMira('hoja', 'Antes de las palabras difíciles: un argumento es como una mesa. Las razones son las patas, y unas sostienen más que otras.', { letras: ['tesis', 'a', 'b'], paras: [['Esta tienda es la más barata del barrio.'], ['Comparé diez productos y aquí costaban menos.'], ['Me lo dijo el dueño.']] }, [
          ['En la lección de tesis y razones viste que la razón responde «por qué».', {}],
          ['Arriba está la tesis que se defiende.', { luz: [0] }],
          ['Comparar diez productos es una pata firme.', { luz: [1], nota: { 1: 'firme' } }],
          ['Que lo diga el dueño es una pata débil: a él le conviene.', { luz: [2], nota: { 2: 'débil' } }],
          ['Fortalecer es poner una pata más firme; debilitar, aflojar una.', {}],
        ], 'Una razón pesa más si se puede comprobar y si quien la da no gana nada.'),
        xpHaz('hoja', 'Tesis: «La nueva cancha sintética atrae más gente». Subraya la razón más **firme**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El entrenador dice que se ve bonita.'], ['Antes iban 40 personas al mes; ahora van 120.'], ['La cancha es verde.']], pista: 'Esa no se puede comprobar o no responde por qué. Busca algo que se cuente.' }, 'Contar a la gente antes y después es una pata firme.')],
    ],
    despues: [
      ['Más difícil: descartar la otra causa',
        xpMira('hoja', 'Un paso más: también **fortalece** descartar otra causa. Si quitas la duda, la tesis queda más firme.', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Las clases de música subieron las notas de matemáticas.'], ['Los de música también tenían más horas de tutoría.'], ['Los dos grupos tenían las mismas tutorías.'], ['La profesora de música es nueva.']] }, [
          ['Arriba está la tesis.', { luz: [0] }],
          ['La a trae otra causa posible: debilita.', { luz: [1], nota: { 1: 'debilita' } }],
          ['La b quita esa duda: los grupos eran iguales en tutorías.', { luz: [2], nota: { 2: 'fortalece' } }],
          ['Sin otra diferencia, la música queda como explicación.', { luz: [0, 2] }],
          ['La c no cambia nada: no pesa.', { luz: [3], nota: { 3: 'no pesa' } }],
        ], 'Debilita lo que trae otra causa; fortalece lo que la descarta.'),
        xpHaz('hoja', 'Tesis: «El nuevo horario de la ruta bajó las llegadas tarde». Subraya el dato que la **fortalece**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ese mes abrieron un puente que acorta el camino.'], ['En ese tiempo no cambió nada más en el colegio ni en las vías.'], ['La ruta es amarilla.']], pista: 'Ese dato trae otra causa o no pesa. Busca el que descarta otras explicaciones.' }, 'Si nada más cambió, el horario queda como explicación.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Cuál afirmación **debilita** el argumento?». La trampa es la opción que habla del tema pero no pesa.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Desde que el barrio tiene cámaras, bajaron los robos. Las cámaras evitan el delito.'], ['Las cámaras son costosas.'], ['Ese mismo año llegó una patrulla fija al barrio.'], ['Los vecinos están contentos con las cámaras.'], ['Las cámaras nunca fallan.']] }, [
        ['La pregunta: ¿qué debilita la idea de que las cámaras evitan robos?', { luz: [0] }],
        ['A habla de las cámaras, pero el precio no cambia la causa.', { luz: [1], nota: { 1: 'no pesa' } }],
        ['C habla de gusto, no de robos: tampoco pesa.', { luz: [3], nota: { 3: 'no pesa' } }],
        ['D más bien apoya, y además es un absoluto.', { luz: [4], nota: { 4: 'apoya' } }],
        ['B trae otra causa posible: la patrulla. Esa debilita.', { luz: [2], nota: { 2: 'debilita' } }],
      ], 'Para debilitar una causa, busca otra explicación del mismo resultado.'),
      xpHaz('hoja', '«Los que desayunan bien sacan mejores notas. Desayunar mejora el estudio». ¿Qué debilita el argumento?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El desayuno tiene frutas.'], ['Los que desayunan bien también duermen más horas.'], ['Muchos colegios dan desayuno.'], ['Todos los que desayunan ganan el año.']], pista: 'Esa opción habla del desayuno, pero no cambia la causa. Busca otra explicación de las notas.' }, 'Dormir más es otra causa posible de las buenas notas.')],
    cierre: 'Pesa cada razón: lo comprobable sostiene, otra causa debilita y descartarla fortalece.',
  });
}
