// Preicfes · Sociales y Ciudadanas · mundo 1 «Constitución y Estado» (spec 2026-11-20-curso-preicfes): lo que más pregunta la
// prueba de ciudadanía: el Estado social de derecho, las ramas del poder y los órganos de control, y los mecanismos para proteger
// los derechos. Cada lección es un caso original en 7 juegos LEC distintos y un juego en movimiento; la evaluación, otro caso con
// preguntas A–D. Casos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, mueve, preg } = ICF;

  const PUENTE = {
    id: 'icf-puente', title: 'El puente que pidió la vereda',
    ficha: { autor: 'Profesora de ciencias sociales', fuente: 'Guía de ciudadanía para grado once', fecha: 'Abril de 2026' },
    paras: [
      'Cada vez que llueve, los niños de la vereda La Esperanza dejan de ir a la escuela. Para llegar tienen que cruzar una quebrada que en invierno crece tanto que arrastra piedras y troncos. Los padres llevan años pidiendo un puente. Seguir su solicitud paso a paso es una buena manera de entender cómo funciona el Estado colombiano.',
      'La Constitución de 1991 dice en su primer artículo que Colombia es un Estado social de derecho. «De derecho» significa que todas las autoridades, desde el presidente hasta el alcalde, deben actuar según las leyes y no según su voluntad. «Social» significa que el Estado no solo pone reglas: también tiene el deber de garantizar condiciones de vida dignas, como la educación de esos niños.',
      'Para que nadie concentre todo el poder, este se divide en tres ramas. La legislativa hace las normas: en el país, el Congreso expide las leyes; en el municipio, el concejo aprueba los acuerdos y el presupuesto. La ejecutiva gobierna y ejecuta: el presidente a nivel nacional, los gobernadores en los departamentos y los alcaldes en los municipios. La judicial resuelve los conflictos y protege los derechos por medio de los jueces y las altas cortes.',
      'En el caso del puente, la junta de acción comunal llevó la petición a la alcaldía. El alcalde incluyó la obra en su proyecto de presupuesto, pero no podía gastar el dinero por su cuenta: primero el concejo municipal tuvo que aprobarlo. Solo entonces la alcaldía pudo contratar a la empresa que construiría el puente.',
      'Además de las tres ramas, existen órganos de control que vigilan a los demás. La Contraloría revisa que el dinero público se gaste bien; la Procuraduría investiga a los funcionarios que incumplen sus deberes; y la Defensoría del Pueblo y las personerías ayudan a los ciudadanos a defender sus derechos. Cuando la obra se retrasó, la Contraloría pidió explicaciones sobre los pagos que ya se habían hecho.',
      'El puente se terminó dos años después de la primera solicitud. Para los habitantes de La Esperanza, la espera fue larga; para el Estado, la división del poder hizo más lento el proceso, pero también más difícil que el dinero se perdiera. Esa es la tensión de siempre: los controles cuestan tiempo, y sin ellos el poder no le rinde cuentas a nadie.',
    ],
  };

  const TUTELA = {
    id: 'icf-tutela', title: 'Las herramientas de Valentina',
    ficha: { autor: 'Personería estudiantil de un colegio público', fuente: 'Cartilla de derechos', fecha: 'Mayo de 2026' },
    paras: [
      'Valentina tiene quince años y usa silla de ruedas. Cuando su familia se mudó, el colegio más cercano le negó el cupo con el argumento de que sus salones quedan en el segundo piso y no hay rampa. Su mamá no sabía qué hacer. La personera estudiantil le explicó que la Constitución no solo enumera derechos: también da herramientas concretas para reclamarlos.',
      'La primera es el derecho de petición. Cualquier persona puede presentar una solicitud respetuosa ante una autoridad, de forma verbal o escrita, y esta debe responder de fondo, por regla general, en un plazo de quince días hábiles. La mamá de Valentina escribió a la secretaría de educación pidiendo una explicación y una solución. La respuesta llegó a tiempo, pero solo decía que el caso «se estaba estudiando».',
      'Entonces acudieron a la acción de tutela, quizá el mecanismo más conocido de la Constitución de 1991. La tutela sirve para proteger los derechos fundamentales, como la vida, la igualdad o la educación de los niños, cuando una autoridad o un particular los vulnera o los amenaza. No necesita abogado y el juez debe decidir en un máximo de diez días. Sin embargo, por regla general procede solo cuando no existe otro medio eficaz para defender el derecho.',
      'El juez le dio la razón a Valentina: negarle el cupo por la falta de una rampa era discriminarla. Ordenó al colegio recibirla y a la secretaría construir la rampa en un plazo de tres meses. La decisión no regaló nada: obligó al Estado a cumplir lo que la Constitución ya le exigía.',
      'Existen otras herramientas para otros problemas. La acción popular protege derechos colectivos, que son de todos a la vez, como un ambiente sano o el espacio público: sirve, por ejemplo, si una fábrica contamina el río de un pueblo. La acción de cumplimiento se usa para exigir que una autoridad cumpla una ley o un decreto que está ignorando. Y el habeas corpus protege a quien ha sido privado de su libertad de manera ilegal.',
      'Conocer estas herramientas cambia la relación de un ciudadano con el Estado. Quien sabe que puede reclamar deja de pedir favores y empieza a exigir derechos.',
    ],
  };

  const l1 = leccion('icf-sc-constitucion-1', 'Estado social de derecho y ramas del poder', [
    sc(6, 'La prueba de Sociales pregunta casi siempre por **casos**: una comunidad, una autoridad y una decisión. Para resolverlos hay que saber quién hace qué en el Estado.', { title: 'Casos, no fechas' }),
    sc(7, 'Colombia es un **Estado social de derecho**: las autoridades obedecen las leyes, y además el Estado debe garantizar condiciones de vida dignas.', { title: 'De derecho y social' }),
    sc(7, 'El poder se divide en **tres ramas**: la legislativa hace las normas, la ejecutiva gobierna y ejecuta, y la judicial resuelve conflictos. Es como un equipo en el que nadie es a la vez jugador, árbitro y dueño del reglamento.', { title: 'Tres ramas' }),
    sc(7, 'Ejemplo en un municipio: el concejo aprueba la norma que prohíbe parquear en el andén, la alcaldía pone las señales y multa, y un juez decide si una multa fue injusta.', { title: 'Concejo, alcaldía y juez' }),
    sc(6, 'Los **órganos de control** vigilan: la Contraloría cuida el dinero público, la Procuraduría a los funcionarios y la Defensoría los derechos humanos.', { title: 'Quién vigila' }),
  ], [
    play('anticipa-texto', 'Antes de leer, anticipa con la ficha', { doc: PUENTE, slots: [
      ['Tema', ['cómo funciona el Estado a partir de un caso', 'la geografía de las veredas', 'la historia de los puentes del país'], 0],
      ['Propósito', ['explicar con un ejemplo cercano', 'denunciar a un alcalde', 'vender un proyecto de construcción'], 0],
      ['Tipo de texto', ['expositivo, que explica', 'cuento, que narra por narrar', 'noticia de última hora'], 0],
    ] }, 'Es una guía de ciudadanía escrita por una profesora: usa el caso del puente para explicar el Estado. Narra un caso, pero su propósito es explicar.',
      { hint: 'La fuente es una guía escolar de ciudadanía: piensa para qué usaría una profesora la historia de un puente.' }),
    play('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { doc: PUENTE, labels: ['presenta el caso', 'define el Estado social de derecho', 'explica las tres ramas del poder', 'sigue el caso por las ramas', 'presenta los órganos de control', 'concluye con una tensión', 'critica la Constitución'], key: [0, 1, 2, 3, 4, 5] },
      'Empieza con el problema de la vereda, define el Estado social de derecho, explica las tres ramas, sigue la petición por la alcaldía y el concejo, presenta los órganos de control y cierra con la tensión entre controles y rapidez. No critica la Constitución.',
      { hint: 'Pregúntate en cada párrafo si cuenta el caso, define, explica, aplica o concluye.' }),
    play('quien-lo-dice', '¿A quién le toca cada tarea?', { doc: PUENTE, ask: 'Lleva cada tarea a la parte del Estado que la cumple, según el texto.', voices: ['Rama legislativa', 'Rama ejecutiva', 'Rama judicial', 'Órganos de control'], cards: [
      ['El concejo aprueba el presupuesto de la obra.', 0],
      ['La alcaldía contrata a la empresa del puente.', 1],
      ['Los jueces resuelven conflictos y protegen derechos.', 2],
      ['La Contraloría pide explicaciones por los pagos.', 3],
      ['El Congreso expide las leyes.', 0],
      ['El gobernador gobierna el departamento.', 1],
    ] }, 'El concejo y el Congreso hacen normas (legislativa); la alcaldía y el gobernador ejecutan (ejecutiva); los jueces deciden (judicial); la Contraloría vigila el dinero (control).',
      { hint: 'Pregunta por el verbo de cada tarea: ¿hace normas, ejecuta, decide un conflicto o vigila a otros?' }),
    play('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { doc: PUENTE, cards: [
      ['El alcalde no podía gastar el dinero sin la aprobación del concejo.', 0],
      ['La Procuraduría investiga a los funcionarios que incumplen sus deberes.', 0],
      ['Sin puente, los niños de la vereda pierden días de clase.', 1],
      ['Si el poder no estuviera dividido, la obra quizá se habría hecho más rápido.', 1],
      ['La empresa constructora robó parte del dinero.', 2],
      ['El alcalde pertenece a la rama legislativa.', 2],
    ] }, 'Lo del concejo y la Procuraduría está escrito (párrafos 4 y 5). Que los niños pierdan clases y que la división del poder haga más lento el proceso se deducen de los párrafos 1 y 6. Nada dice que la empresa robara, y el alcalde es de la rama ejecutiva.',
      { hint: 'Cuidado con lo que «suena» a noticia: si el texto no da ningún dato para afirmarlo, no lo dice.' }),
    play('caso-nuevo', 'La idea del texto, en otros casos', { doc: PUENTE, principle: 'En un Estado de derecho cada autoridad actúa según la ley y dentro de su función, sin hacer lo que le corresponde a otra.', cards: [
      ['Un alcalde espera a que el concejo apruebe el presupuesto antes de contratar una obra.', true],
      ['Un juez decide si una multa de tránsito fue impuesta conforme a la norma.', true],
      ['Un gobernador declara culpable de un delito a un comerciante y lo manda a la cárcel.', false],
      ['Un concejal contrata por su cuenta a la empresa que pavimentará una calle.', false],
    ] }, 'Esperar el presupuesto y decidir sobre una multa respetan las funciones. Condenar por un delito les corresponde a los jueces, no a un gobernador; y contratar es tarea de la administración, no de un concejal.',
      { hint: 'En cada caso pregúntate si quien actúa está haciendo la tarea de su rama o la de otra.' }),
    play('donde-buscar', '¿A qué párrafo vuelves?', { doc: PUENTE, cards: [
      ['¿Qué significa «de derecho»?', [2]], ['¿Quién aprueba el presupuesto municipal?', [3, 4]], ['¿Qué hace la Contraloría?', [5]],
      ['¿Cuánto tardó el puente?', [6]], ['¿Por qué los niños no van a la escuela cuando llueve?', [1]],
    ] }, 'La definición está en el 2; el concejo aparece en el 3 y en el caso del 4; la Contraloría en el 5; el tiempo de la obra en el 6; y la quebrada en el 1.',
      { hint: 'Algunas preguntas tienen respuesta en dos párrafos: en el que explica la idea y en el que la aplica al caso.' }),
    play('balanza-argumento', '¿Qué apoya y qué debilita la idea?', { doc: PUENTE, thesis: 'Dividir el poder en ramas y vigilarlo protege a los ciudadanos.', cards: [
      ['La Contraloría pidió cuentas cuando la obra se retrasó.', 0],
      ['El alcalde no pudo gastar sin la aprobación del concejo.', 0],
      ['Los controles hicieron que la obra tardara dos años.', 1],
      ['La quebrada crece en invierno.', null],
    ] }, 'Que alguien vigile los pagos y que el alcalde dependa del concejo apoyan la idea. La demora de dos años la debilita: es el costo de los controles. Que la quebrada crezca no tiene que ver con la división del poder.',
      { hint: 'Una oración puede ser cierta y no tener nada que ver con la idea: esa se queda en la bandeja.' }),
    mueve('rompe-cambios', 'Manda la pelota a quien le toca', 'Quién hace qué', [
      ['Quien aprueba el presupuesto del municipio es…', ['el concejo', 'el alcalde', 'un juez'], 0],
      ['Quien vigila que el dinero público se gaste bien…', ['la Contraloría', 'el Congreso', 'la alcaldía'], 0],
      ['La rama que resuelve conflictos es la…', ['judicial', 'ejecutiva', 'legislativa'], 0],
    ], 'El concejo es la parte normativa del municipio; la Contraloría hace el control fiscal; y los jueces, de la rama judicial, resuelven los conflictos.',
      'Pregúntate por el verbo: aprobar normas, vigilar el dinero o resolver conflictos.'),
  ]);

  const l2 = leccion('icf-sc-constitucion-2', 'Derechos y mecanismos de protección', [
    sc(6, 'La Constitución no es solo una lista de derechos: trae **herramientas** para reclamarlos. La prueba pregunta cuál sirve en cada situación.', { title: 'Derechos con herramientas' }),
    sc(7, 'El **derecho de petición** es pedir a una autoridad que responda; la **tutela**, pedirle a un juez que proteja ya un derecho fundamental vulnerado.', { title: 'Pedir y exigir' }),
    sc(7, 'Ejemplo: si un hospital niega una cirugía urgente a un niño, sirve la tutela, porque está en juego su salud y su vida. Si se quiere saber por qué subió un impuesto, basta un derecho de petición.', { title: 'Dos casos, dos herramientas' }),
    sc(7, 'Para lo que es de todos, como un río o un parque, está la **acción popular**; para que una autoridad cumpla una ley, la **acción de cumplimiento**; y para una detención ilegal, el **habeas corpus**.', { title: 'Lo colectivo y la libertad' }),
    sc(6, 'Pregunta clave en cada caso: ¿el derecho es de una persona o de todos?, ¿es fundamental?, ¿se quiere información, protección o que se cumpla una norma?', { title: 'Tres preguntas' }),
  ], [
    play('quien-lo-dice', '¿Qué herramienta sirve en cada caso?', { doc: TUTELA, ask: 'Lleva cada situación a la herramienta que, según el texto, sirve para ella.', voices: ['Derecho de petición', 'Acción de tutela', 'Acción popular', 'Acción de cumplimiento'], cards: [
      ['Un colegio le niega el cupo a una niña por su discapacidad.', 1],
      ['Una fábrica vierte residuos en el río del pueblo.', 2],
      ['Una familia quiere saber por qué no le han asignado el subsidio.', 0],
      ['La alcaldía ignora una ley que la obliga a señalizar las vías.', 3],
    ] }, 'Negar el cupo afecta un derecho fundamental de una persona: tutela. El río es de todos: acción popular. Pedir información a una autoridad: derecho de petición. Exigir que se cumpla una ley: acción de cumplimiento.',
      { hint: 'Pregúntate si el derecho es de una persona o de todos, y si se pide información, protección inmediata o que se cumpla una norma.' }),
    play('caso-nuevo', '¿Procede la tutela?', { doc: TUTELA, principle: 'La tutela protege derechos fundamentales vulnerados o amenazados cuando no hay otro medio eficaz para defenderlos.', cards: [
      ['Una EPS niega a un niño un medicamento que necesita para vivir.', true],
      ['Un estudiante es expulsado sin que lo escuchen ni le expliquen la razón.', true],
      ['Un vecino quiere que la alcaldía le cambie el color de la fachada del parque.', false],
      ['Un comerciante quiere cobrar una deuda a un cliente que no le pagó.', false],
    ] }, 'La vida y la salud del niño, y el debido proceso del estudiante, son derechos fundamentales en riesgo. El color de una fachada no afecta un derecho fundamental, y cobrar una deuda tiene su propio proceso ante un juez.',
      { hint: 'Busca en cada caso si hay un derecho fundamental en juego (vida, salud, educación, igualdad, debido proceso) y si existe otra vía para reclamar.' }),
    play('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { doc: TUTELA, cards: [
      ['La tutela no necesita abogado.', 0],
      ['El juez debe decidir una tutela en un máximo de diez días.', 0],
      ['La respuesta de la secretaría no resolvió el problema de Valentina.', 1],
      ['Sin rampa, Valentina no podía llegar a los salones del segundo piso.', 1],
      ['El colegio fue multado por discriminar a Valentina.', 2],
      ['La tutela sirve para cualquier problema con el Estado.', 2],
    ] }, 'Lo del abogado y los diez días está en el párrafo 3. Que la respuesta no resolvió nada y que la falta de rampa le impedía llegar se deducen de los párrafos 2 y 1. Nadie habla de una multa, y el texto dice que la tutela procede, por regla general, solo si no hay otro medio eficaz.',
      { hint: 'Desconfía de las afirmaciones con «cualquier», «siempre» o «todos»: compáralas con lo que el texto limita.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: TUTELA, ask: 'Según el texto, son características de la acción de tutela, EXCEPTO:', cards: [
      ['Protege derechos fundamentales', [3]], ['No requiere abogado', [3]], ['El juez decide en máximo diez días', [3]], ['Protege los derechos colectivos como el ambiente', null],
    ] }, 'Las tres primeras están en el párrafo 3. Los derechos colectivos aparecen en el párrafo 5, pero los protege la acción popular, no la tutela.',
      { hint: 'Algunas opciones nombran algo que sí sale en el texto, pero atribuido a otra herramienta: revisa a cuál.' }),
    play('resume-parrafo', 'Cada párrafo en una frase', { doc: TUTELA, paras: [2, 4, 5], options: [
      'El derecho de petición obliga a responder, pero la respuesta puede no resolver el problema.',
      'La decisión del juez obligó al Estado a cumplir lo que la Constitución ya exigía.',
      'Hay otras herramientas para derechos colectivos, leyes incumplidas y detenciones ilegales.',
      'El juez le regaló a Valentina un cupo que no le correspondía.',
      'La tutela reemplaza a todas las demás acciones.',
    ], key: [0, 1, 2] },
      'El párrafo 2 muestra que la petición tuvo respuesta, aunque vacía; el 4, que el juez hizo cumplir la Constitución («no regaló nada»); el 5 presenta las otras acciones. Las dos frases que sobran contradicen el texto.',
      { hint: 'Desconfía de los resúmenes que dicen lo contrario de una frase del párrafo: el 4 dice que la decisión «no regaló nada».' }),
    play('hilo-referente', '¿A qué apunta cada expresión?', { doc: TUTELA, rounds: [
      { p: 2, text: 'Cualquier persona puede presentar |una solicitud respetuosa| ante |una autoridad|, de forma verbal o escrita, y |esta| debe responder de fondo', from: 5, answer: 3 },
      { p: 1, text: 'La personera estudiantil le explicó que |la Constitución| no solo enumera |derechos|: también da herramientas concretas para |reclamarlos|.', from: 5, answer: 3 },
    ] }, '«Esta» es la autoridad, la que debe responder (no la solicitud). En «reclamarlos», «los» son los derechos que enumera la Constitución.',
      { hint: 'Fíjate en el género y el número: «esta» es femenino singular y «los» es masculino plural. Luego prueba si la oración tiene sentido.' }),
    play('palabra-a-la-medida', 'La palabra en su oración', { doc: TUTELA, rounds: [
      { p: 3, before: 'cuando una autoridad o un particular los ', word: 'vulnera', after: ' o los amenaza', options: ['viola', 'consulta', 'protege', 'enumera'], answer: 0 },
      { p: 6, before: 'Quien sabe que puede reclamar deja de pedir favores y empieza a ', word: 'exigir', after: ' derechos', options: ['reclamar con firmeza', 'regalar', 'imaginar', 'olvidar'], answer: 0 },
    ] }, 'Vulnerar un derecho es violarlo, irrespetarlo. Y exigir derechos es reclamarlos con firmeza, porque se tienen, en lugar de pedirlos como un favor.',
      { hint: 'Pon cada opción en la oración y fíjate cuál conserva el contraste entre pedir un favor y reclamar algo que se tiene.' }),
    mueve('vuela-precios', 'Vuela a la herramienta que sirve', 'Mecanismos', [
      ['Una EPS niega una cirugía urgente:', ['tutela', 'acción popular', 'habeas corpus'], 0],
      ['Una mina contamina el agua de todo un pueblo:', ['acción popular', 'tutela', 'derecho de petición'], 0],
      ['Detienen a alguien sin orden de un juez:', ['habeas corpus', 'acción de cumplimiento', 'acción popular'], 0],
    ], 'La salud y la vida son derechos fundamentales: tutela. El agua de todo un pueblo es un derecho colectivo: acción popular. Una privación ilegal de la libertad: habeas corpus.',
      'Pregúntate si el derecho es de una persona, de todos o si se trata de la libertad.'),
  ]);

  const PARQUE = {
    id: 'icf-parque', title: 'El parque que el concejo quería vender',
    paras: [
      'En un municipio de la sabana, la alcaldía presentó al concejo un proyecto para vender el lote del parque El Recreo a una constructora. Con ese dinero, explicó el alcalde, se terminaría el hospital, cuya obra está detenida hace dos años por falta de recursos. El concejo debía decidir en tres semanas.',
      'Los vecinos del parque reaccionaron de inmediato. Para ellos, El Recreo es el único espacio verde del barrio, el lugar donde juegan los niños y se reúnen los adultos mayores. «Nos están pidiendo escoger entre la salud y el aire», dijo la presidenta de la junta de acción comunal en una sesión abierta del concejo. Al día siguiente, más de dos mil vecinos firmaron una carta para pedir que el lote siguiera siendo un parque y que el hospital se financiara de otra manera.',
      'Los comerciantes de la zona, en cambio, apoyaron la venta: el nuevo conjunto de vivienda traería clientes y empleo. Y los médicos del municipio recordaron que, mientras el hospital siga cerrado, los pacientes graves deben viajar dos horas hasta la capital del departamento, y que algunos no alcanzan a llegar a tiempo.',
      'Un grupo de vecinos presentó una acción popular ante un juez. Argumentaron que el espacio público es un derecho colectivo y que la ley exige que un parque no pierda su destino sin ser reemplazado por otro de igual área en la misma zona. El juez ordenó suspender la venta mientras estudiaba el caso. La alcaldía respondió que respetaría la decisión, pero insistió en que el hospital no podía esperar mucho más.',
      'Mientras tanto, varios concejales propusieron otra salida: buscar recursos del departamento para el hospital y declarar el parque como zona protegida. La discusión sigue abierta, pero el caso dejó una lección: en una democracia, los conflictos entre intereses legítimos se resuelven con reglas, y cada parte tiene herramientas para hacerse oír.',
    ],
  };
  const Q = preg(PARQUE, 'sociales');
  return mundo('icf-sc-constitucion', 'Constitución y Estado', 'sociales', [l1, l2], [
    ['icf-sc-constitucion-1', 'El concejo hace las normas del municipio y aprueba lo que propone el alcalde.',
      Q('En el caso, la decisión de vender o no el parque le corresponde, en primer lugar, al concejo municipal porque:', ['Es la autoridad judicial del municipio', 'Es el órgano que aprueba las normas y decisiones que presenta la alcaldía', 'Es el órgano de control que vigila al alcalde', 'Representa a los comerciantes de la zona'], 1,
        'El concejo es la corporación normativa del municipio, de la rama legislativa en lo local: aprueba o rechaza los proyectos del alcalde. No es un juez ni un órgano de control.',
        'Recuerda qué hace cada parte del Estado: hacer normas, ejecutar, juzgar o vigilar.')],
    ['icf-sc-constitucion-1', 'Cada rama cumple su función: el juez decide sobre los conflictos y los derechos.',
      Q('Cuando el juez ordena suspender la venta, actúa como parte de:', ['La rama ejecutiva, porque gobierna el municipio', 'La rama legislativa, porque cambia una norma', 'Los órganos de control, porque vigila el dinero', 'La rama judicial, porque resuelve un conflicto sobre derechos'], 3,
        'El juez no gobierna ni hace leyes: decide un conflicto y protege un derecho colectivo. Eso es propio de la rama judicial.',
        'Pregúntate qué está haciendo el juez: ¿gobierna, hace normas, vigila o decide un conflicto?')],
    ['icf-sc-constitucion-1', 'En los casos de la prueba cada actor defiende un interés distinto, a veces legítimo.',
      Q('De acuerdo con el texto, los comerciantes y los vecinos del parque tienen posiciones opuestas porque:', ['Los comerciantes valoran el empleo y los clientes que traería la venta, y los vecinos el espacio verde del barrio', 'Los vecinos quieren el hospital y los comerciantes no', 'Los comerciantes quieren vender el parque para hacer un hospital privado', 'Los vecinos son propietarios del lote y no lo quieren vender'], 0,
        'El párrafo 3 dice que los comerciantes esperan clientes y empleo; el párrafo 2, que para los vecinos es el único espacio verde. Nadie dice que los vecinos sean dueños del lote.',
        'Busca en el texto qué gana o pierde cada grupo con la venta.')],
    ['icf-sc-constitucion-2', 'La acción popular protege derechos colectivos, como el espacio público.',
      Q('Los vecinos usaron una acción popular, y no una tutela, porque:', ['La tutela solo la puede presentar un abogado', 'La acción popular es más rápida que cualquier otro mecanismo', 'El espacio público es un derecho colectivo, que pertenece a toda la comunidad', 'El concejo no puede ser demandado con una tutela'], 2,
        'El parque es de todos: el espacio público es un derecho colectivo, y para eso está la acción popular. La tutela no exige abogado y protege derechos fundamentales.',
        'Pregúntate de quién es el derecho en juego: de una persona o de la comunidad entera.')],
    ['icf-sc-constitucion-2', 'Un derecho de petición obliga a la autoridad a responder.',
      Q('Si la junta de acción comunal quisiera conocer el avalúo del lote y los estudios de la venta, la herramienta más adecuada sería:', ['Un derecho de petición ante la alcaldía', 'Un habeas corpus', 'Una acción de cumplimiento contra los comerciantes', 'Una tutela contra los médicos'], 0,
        'Pedir información a una autoridad es un derecho de petición, que debe responderse de fondo. El habeas corpus es para detenciones ilegales y las otras opciones se dirigen a quien no tiene la información.',
        'Lo que se quiere es información que tiene una autoridad: ¿qué herramienta obliga a responder?')],
    ['icf-sc-constitucion-2', 'La ley y los mecanismos sirven para resolver conflictos entre intereses legítimos.',
      Q('La idea con la que concluye el texto es que:', ['El hospital es más importante que el parque', 'Los conflictos entre intereses legítimos se resuelven con reglas y con herramientas para que cada parte se haga oír', 'Los jueces deben decidir todos los asuntos del municipio', 'Los concejales deben obedecer siempre a los vecinos'], 1,
        'El último párrafo lo dice: en una democracia los conflictos se resuelven con reglas y cada parte tiene herramientas. El texto no decide entre el hospital y el parque.',
        'Lee la última oración del texto y descarta las opciones que toman partido por uno de los grupos.')],
  ]);
})());
