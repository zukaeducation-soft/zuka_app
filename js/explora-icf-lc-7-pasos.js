// Preicfes · Lectura Crítica, mundo 7 «Evaluar un Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): supuesto, enunciado
// válido, muestra, valor y visión del mundo desde cero; luego supuesto frente a premisa, la muestra que no representa, la palabra que
// delata una mirada y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-evalua-1', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: lo que se da por hecho',
        xpMira('hoja', 'Antes de las palabras difíciles: al hablar damos cosas **por hecho**. Si digo «lleva sombrilla», doy por hecho que va a llover.', { paras: [['«Lleva sombrilla».'], ['Lo que se da por hecho: va a llover.'], ['«Apúrate, que cierran».'], ['Lo que se da por hecho: el lugar cierra pronto.']] }, [
          ['En la lección de tesis viste que una tesis se apoya en razones.', {}],
          ['Algunas razones no se escriben: se dan por hechas.', {}],
          ['Nadie dijo «va a llover», pero el consejo lo necesita.', { luz: [0, 1], nota: { 1: 'supuesto' } }],
          ['Aquí tampoco se dice la hora, pero se supone que es pronto.', { luz: [2, 3], nota: { 3: 'supuesto' } }],
          ['Eso que se da por hecho y no se escribe es un supuesto.', {}],
        ], 'Supuesto: una idea que no se escribe, pero que la frase necesita para tener sentido.'),
        xpHaz('hoja', '«Ponte la chaqueta, que vamos a la finca de la abuela en el páramo». Subraya lo que se **supone**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La finca es grande.'], ['Allá hace frío.'], ['La chaqueta es azul.']], pista: 'Pregunta por qué alguien diría eso: ¿qué tiene que ser cierto?' }, 'Sin frío, el consejo de la chaqueta no tendría sentido.')],
    ],
    despues: [
      ['Más difícil: supuesto frente a premisa',
        xpMira('hoja', 'Un paso más: el supuesto **no está escrito**. Si la opción ya aparece en el texto, no es el supuesto: es una premisa.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El colegio debe tener psicóloga, porque muchos estudiantes están tristes.'], ['Muchos estudiantes están tristes.'], ['Una psicóloga puede ayudar a quien está triste.'], ['Las psicólogas ganan poco.']] }, [
          ['Arriba está el argumento completo.', { luz: [0] }],
          ['La a ya está escrita: es la premisa, no el supuesto.', { luz: [1], nota: { 1: 'premisa' } }],
          ['La b no está escrita, y sin ella la idea no tiene sentido.', { luz: [2], nota: { 2: 'supuesto' } }],
          ['Niégala: si no ayudara, ¿para qué pedirla?', { luz: [2] }],
          ['La c no hace falta para que la idea funcione.', { luz: [3], tacha: [3], nota: { 3: 'no hace falta' } }],
        ], 'El supuesto no está escrito; la premisa sí. Niega la opción: si la idea se cae, era el supuesto.'),
        xpHaz('hoja', '«Hay que poner más policías en la plaza, porque ahí roban mucho». Subraya el **supuesto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['En la plaza roban mucho.'], ['Con más policías robarían menos.'], ['La plaza es bonita.']], pista: 'Esa ya está escrita o no hace falta. Niega cada una y mira cuál tumba la idea.' }, 'Si más policías no cambiaran nada, la propuesta se caería.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «El autor da por sentado que…». La trampa es la opción que **ya está escrita** o la que es cierta pero no hace falta.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Para que los jóvenes lean más, la biblioteca debe prestar libros por celular».'], ['La biblioteca tiene libros.'], ['Los jóvenes usan el celular y leerían en él.'], ['Los jóvenes deben leer más.'], ['Todos los jóvenes odian los libros de papel.']] }, [
        ['La pregunta: ¿qué da por sentado el autor?', { luz: [0] }],
        ['A es cierta, pero no es lo que la propuesta necesita.', { luz: [1], nota: { 1: 'no hace falta' } }],
        ['C ya está escrita: es la meta del texto.', { luz: [3], nota: { 3: 'ya está' } }],
        ['D exagera con «todos» y «odian».', { luz: [4], nota: { 4: 'absoluto' } }],
        ['B: si no leyeran en el celular, la propuesta se cae.', { luz: [2], nota: { 2: 'supuesto' } }],
      ], 'Niega cada opción: la que tumba la idea es el supuesto.'),
      xpHaz('hoja', '«Si el colegio vende fruta en la tienda, los estudiantes comerán más sano». ¿Qué da por sentado el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['La tienda del colegio es pequeña.'], ['Todos los estudiantes odian la fruta.'], ['El colegio tiene tienda.'], ['Si hay fruta a la venta, los estudiantes la comprarán.']], pista: 'Esa opción no hace falta, exagera o ya está escrita. Niega cada una: ¿cuál tumba la idea?' }, 'Si nadie la comprara, vender fruta no cambiaría nada.')],
    cierre: 'Busca lo que el texto da por hecho, para qué escribe y con qué recursos convence.',
  });

  xpAmplia('icf-lc-evalua-2', {
    conecta: 'icf-lc-argumento-2',
    desde: [
      ['Desde cero: qué es un enunciado válido',
        xpMira('hoja', 'Antes de las palabras difíciles: un **enunciado** es una frase que afirma algo. Es **válido** si lo que lo sostiene alcanza.', { paras: [['Enunciado: «Esta panadería hace el mejor pan del barrio».'], ['Respaldo 1: «Me gusta».'], ['Respaldo 2: «Diez vecinos probaron el pan de las cinco panaderías del barrio y ganó esta».']] }, [
          ['En la lección de fortalecer y debilitar viste que unas razones pesan más.', {}],
          ['Este es el enunciado: afirma algo.', { luz: [0], nota: { 0: 'enunciado' } }],
          ['«Me gusta» es un gusto: no alcanza para decir «el mejor».', { luz: [1], nota: { 1: 'no alcanza' } }],
          ['Comparar todas con varios vecinos sí se acerca.', { luz: [2], nota: { 2: 'alcanza más' } }],
          ['Válido no es lo mismo que cierto: es bien sostenido.', {}],
        ], 'Un enunciado es válido cuando su respaldo alcanza para lo que afirma.'),
        xpHaz('hoja', 'Enunciado: «El río más largo del país es el Magdalena». Subraya el respaldo que **alcanza**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo dijo un amigo.'], ['Un mapa oficial compara el largo de todos los ríos del país.'], ['Es un río muy famoso.']], pista: 'Ese respaldo es un rumor o una fama. Busca el que compara.' }, 'Para decir «el más largo» hay que comparar con todos.')],
    ],
    despues: [
      ['Más difícil: la muestra que no representa',
        xpMira('hoja', 'Un paso más: para hablar de **todos**, los que se preguntan deben parecerse a todos. Si no, la **muestra** no representa.', { paras: [['Se preguntó a 200 personas a la salida de un gimnasio.'], ['El 90 % dijo hacer ejercicio cada semana.'], ['Titular: «Casi todo el país hace ejercicio».']] }, [
          ['Muestra: el grupo al que se le pregunta.', { luz: [0], nota: { 0: 'muestra' } }],
          ['¿Dónde se preguntó? A la salida de un gimnasio.', { luz: [0] }],
          ['Ahí casi todos hacen ejercicio: el resultado era de esperar.', { luz: [1] }],
          ['El titular salta de ese grupo a todo el país.', { luz: [2], tacha: [2], nota: { 2: 'no representa' } }],
          ['Pregunta siempre a quién se preguntó y dónde.', {}],
        ], 'Una muestra representa si se parece al grupo completo; si no, la conclusión dice de más.'),
        xpHaz('hoja', 'Una encuesta hecha en un concierto de rock concluye que el rock es la música favorita de la ciudad. Subraya el problema.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hubo muchas preguntas.'], ['Solo se preguntó a gente que ya escogió ir al rock.'], ['El rock es ruidoso.']], pista: '¿A quién le preguntaron, y se parece a toda la ciudad?' }, 'Quien va a un concierto de rock no representa a toda la ciudad.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Por qué el enunciado no es válido?». Mira **cuántos**, **quiénes** y con qué se comparó.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Un estudiante usó una aplicación de inglés un mes y subió su nota. Concluye: «La aplicación mejora el inglés de cualquiera».'], ['Porque las aplicaciones son caras.'], ['Porque un solo caso no alcanza para hablar de cualquiera.'], ['Porque el inglés es difícil.'], ['Porque el estudiante mintió.']] }, [
        ['La pregunta: ¿por qué la conclusión no es válida?', { luz: [0] }],
        ['A habla del precio: no toca el respaldo.', { luz: [1], nota: { 1: 'no pesa' } }],
        ['C es una opinión sobre el inglés, no sobre la prueba.', { luz: [3], nota: { 3: 'no pesa' } }],
        ['D acusa sin pruebas: el texto no dice que mintiera.', { luz: [4], nota: { 4: 'no está' } }],
        ['B: de un solo caso no se salta a cualquiera.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Un enunciado no es válido si dice de más: pocos casos, muestra rara o sin comparar.'),
      xpHaz('hoja', '«En mi cuadra, tres familias compraron perro y están más felices. Tener perro hace feliz a toda familia». ¿Por qué no es válido?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Porque los perros comen mucho.'], ['Porque tres familias de una cuadra no alcanzan para toda familia.'], ['Porque las familias mienten.'], ['Porque los gatos son mejores.']], pista: 'Esa razón no toca el respaldo. Mira cuántos casos hay y a quiénes se aplica la conclusión.' }, 'Tres casos de una cuadra no sostienen un «toda familia».')],
    cierre: 'Mide el respaldo: cuántos, quiénes y comparados con qué. Si no alcanza, el enunciado dice de más.',
  });

  xpAmplia('icf-lc-evalua-3', {
    conecta: 'icf-lc-evalua-1',
    desde: [
      ['Desde cero: qué es un valor',
        xpMira('hoja', 'Antes de las palabras difíciles: un **valor** es algo que una persona considera importante: la salud, la familia, la libertad, el dinero.', { paras: [['Ana rechazó un trabajo mejor pagado para cuidar a su mamá.'], ['Pedro cambió de trabajo porque le pagaban el doble.']] }, [
          ['En la lección de supuestos viste que no todo se escribe.', {}],
          ['Los valores casi nunca se escriben: se notan en lo que se elige.', {}],
          ['Ana pone primero a su familia.', { luz: [0], nota: { 0: 'la familia' } }],
          ['Pedro pone primero el ingreso.', { luz: [1], nota: { 1: 'el dinero' } }],
          ['Ninguno miente: valoran cosas distintas.', { luz: [0, 1] }],
        ], 'Valor: lo que alguien pone primero. Se descubre mirando lo que elige.'),
        xpHaz('hoja', '«Prefiero un barrio con árboles, aunque quede lejos del trabajo». Subraya el valor que pone primero.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La cercanía'], ['La naturaleza'], ['El ahorro']], pista: '¿Qué escoge, aunque le cueste otra cosa?' }, 'Acepta quedar lejos con tal de tener árboles.')],
    ],
    despues: [
      ['Más difícil: la palabra que delata una mirada',
        xpMira('hoja', 'Un paso más: una sola palabra puede delatar cómo ve el mundo el autor: su **visión del mundo**.', { paras: [['Uno: «El gasto en bibliotecas es muy alto».'], ['Otro: «La inversión en bibliotecas es muy alta».']] }, [
          ['Los dos hablan de la misma plata.', { luz: [0, 1] }],
          ['«Gasto» hace pensar en plata que se va.', { luz: [0], nota: { 0: 'se pierde' } }],
          ['«Inversión» hace pensar en plata que vuelve con ganancia.', { luz: [1], nota: { 1: 'da fruto' } }],
          ['El primero ve las bibliotecas como una carga.', { luz: [0] }],
          ['El segundo, como algo que deja beneficios.', { luz: [1] }],
        ], 'La palabra escogida delata la visión del mundo: qué ve el autor como carga y qué como valor.'),
        xpHaz('hoja', 'Pon al margen cómo ve cada uno a los vendedores del andén.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['como un problema', 'como trabajadores'], meta: [0, 1], paras: [['«Los invasores del andén volvieron».'], ['«Los vendedores volvieron a su sitio de trabajo».']], pista: 'Alguno no va ahí: mira qué palabra usa cada uno para nombrarlos.' }, '«Invasores» los ve como problema; «sitio de trabajo», como trabajadores.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué valor defiende el autor?». La trampa es un valor bonito que el texto **no** pone primero.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Construir el estadio en el humedal sería un error. Las aves y el agua que guarda ese lugar no se reponen con ninguna obra».'], ['La diversión de los hinchas.'], ['La protección de la naturaleza.'], ['El progreso económico de la ciudad.'], ['La justicia entre ricos y pobres.']] }, [
        ['La pregunta: ¿qué valor defiende el autor?', { luz: [0] }],
        ['A habla del estadio, pero el autor no la defiende.', { luz: [1], nota: { 1: 'no la pone primero' } }],
        ['C es lo que el autor está dispuesto a dejar de lado.', { luz: [3], nota: { 3: 'lo deja de lado' } }],
        ['D es un valor importante, pero el texto no habla de eso.', { luz: [4], nota: { 4: 'no está' } }],
        ['B: lo que no se repone es lo que más le importa.', { luz: [2], nota: { 2: 'su valor' } }],
      ], 'El valor del autor es lo que prefiere cuando hay que escoger. Un valor bonito ajeno al texto es trampa.'),
      xpHaz('hoja', '«No quiero que mi hijo sea el mejor del salón; quiero que ayude al que se queda atrás». ¿Qué valor defiende el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La competencia'], ['La solidaridad'], ['La obediencia'], ['La riqueza']], pista: 'Esa opción es lo que el autor deja en segundo lugar o algo que no menciona.' }, 'Ayudar al que se queda atrás vale más que ganar.')],
    cierre: 'Mira qué pone primero el autor, qué palabras escoge y en qué coincide o choca con otros.',
  });
}
