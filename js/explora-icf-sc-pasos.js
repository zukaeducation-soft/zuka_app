// Preicfes · Sociales y Ciudadanas, mundo 1 «Constitución y Estado», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Plaza de una ciudad: capitolio, la Constitución en papel viejo y gente; v elige qué aparece.
  const plaza = v => X.foto((v.cap ? X.edificio(262, 166, 120, 'capitolio') : '') +
    (v.doc ? X.documento(14, 14, 132, 92, ['Art. 1: Estado social', 'Art. 113: ramas'], { titulo: 'Constitución', sello: '1991' }) : '') +
    (v.gente ? X.persona(56, 178, 0.8, '#3f6fb5') + X.persona(96, 180, 0.85, '#3f9b6a') + X.persona(172, 178, 0.82, '#b5493f', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.r ? X.rot(170, 194, v.r, 'oscuro') : ''), 204, 'ciudad');
  // Un hospital, una persona que reclama y la carta con que reclama.
  const reclamo = v => X.foto((v.hosp ? X.edificio(250, 166, 130, 'hospital') : '') +
    (v.pers ? X.persona(120, 180, 0.9, '#7a4fb5', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.doc ? X.documento(12, 18, 96, 84, ['Señores:', 'pido mi', 'medicina.'], { titulo: 'Carta' }) : '') +
    (v.r ? X.rot(170, 194, v.r, 'oscuro') : ''), 204, 'ciudad');

  xpAmplia('icf-sc-constitucion-1', {
    conecta: null,
    desde: [
      ['Desde cero: el Estado y su Constitución',
        xpMira('dibujo', 'Antes de las palabras difíciles: un **Estado** es un país organizado, y la **Constitución**, su reglamento más alto.', { dib: plaza, v: {}, alto: 204 }, [
          ['Un Estado junta tres cosas: un territorio, su gente y unas autoridades.', { cap: 1 }],
          ['La gente vive en el territorio y elige a muchas de esas autoridades.', { cap: 1, gente: 1 }],
          ['Las reglas más altas del país están escritas en un papel: la Constitución.', { cap: 1, gente: 1, doc: 1 }],
          ['La de Colombia es de 1991 y reemplazó a la de 1886.', { cap: 1, gente: 1, doc: 1, r: 'Constitución de 1991' }],
          ['Es como el reglamento de un torneo: obliga a jugadores y también a árbitros.', { cap: 1, gente: 1, doc: 1, cartel: 'Reglas' }],
        ], 'Estado: territorio, gente y autoridades. Constitución: las reglas más altas, que obligan a todos.'),
        xpHaz('hoja', 'Subraya lo que la **Constitución** sí hace.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fija reglas que obligan a todos, también a los gobernantes.'], ['Dice cuál es el mejor equipo de fútbol del país.'], ['Cambia sola cada vez que llega un presidente nuevo.']], pista: 'Piensa en el reglamento del torneo: ¿a quién obliga y quién lo cambia a su antojo?' }, 'Las reglas más altas obligan a todos y no cambian al gusto de nadie.')],
    ],
    despues: [
      ['Más difícil: ramas y control en un mismo caso',
        xpMira('hoja', 'Un paso más: en un caso real aparecen **varios** actores a la vez, y cada uno hace solo su parte.', { paras: [['El Congreso aprueba dinero para computadores de colegios.'], ['El Ministerio firma el contrato y los reparte.'], ['La Contraloría encuentra que se pagaron caros.'], ['Un juez condena al contratista por fraude.']] }, [
          ['Primero se aprueba el gasto: eso lo hace la rama legislativa.', { luz: [0], nota: { 0: 'legislativa' } }],
          ['Firmar y repartir es gobernar: rama ejecutiva.', { luz: [1], nota: { 1: 'ejecutiva' } }],
          ['Revisar si el dinero rindió es del órgano de control.', { luz: [2], nota: { 2: 'control' } }],
          ['Castigar un delito lo decide un juez: rama judicial.', { luz: [3], nota: { 3: 'judicial' } }],
          ['Trampa común: creer que la Contraloría castiga delitos. Ella revisa el dinero.', { luz: [2] }],
        ], 'En un mismo caso, cada actor hace solo su parte: aprobar, ejecutar, vigilar o juzgar.'),
        xpHaz('hoja', 'Un gobernador firma un decreto que choca con una ley. Subraya quién puede **anularlo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La Contraloría, porque vigila el dinero.'], ['Un juez, porque decide si el decreto respeta las normas de arriba.'], ['Otro gobernador, porque tiene el mismo cargo.']], pista: 'Anular por chocar con una norma es resolver un conflicto según la ley. ¿Qué rama hace eso?' }, 'Decidir si una norma choca con otra es tarea de los jueces.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen no pide recitar el artículo: te da una **propuesta** y pregunta qué principio se afecta.', { letras: ['A', 'B', 'C', 'D'], paras: [['La separación de poderes, porque el gobierno controlaría a los jueces.'], ['El Estado social, porque los jueces ganarían menos.'], ['La descentralización, porque hay jueces en las regiones.'], ['Ninguno, porque el presidente fue elegido por la mayoría.']] }, [
          ['La propuesta: el presidente nombra y retira jueces cuando quiera.', {}],
          ['Esta usa una palabra real, pero el sueldo no es lo que cambia. Trampa.', { luz: [1], nota: { 1: 'no responde' } }],
          ['Esta suena técnica y no tiene nada que ver con el caso.', { luz: [2], nota: { 2: 'fuera de tema' } }],
          ['Esta acepta todo por venir de la mayoría: ni ella está sobre la Constitución.', { luz: [3], nota: { 3: 'autoridad' } }],
          ['Si el que gobierna también manda a los jueces, nadie lo frena.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Busca qué cambia de verdad en la propuesta y descarta lo que solo suena bien.'),
      xpHaz('hoja', 'Un concejo aprueba que el alcalde gaste sin rendir cuentas a nadie. Subraya lo que más se **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La rama judicial, porque los jueces trabajarían menos.'], ['La democracia, porque el concejo fue elegido.'], ['El control, porque nadie revisaría el gasto público.'], ['El Estado social, porque el alcalde ayuda a los pobres.']], pista: 'Pregunta qué deja de pasar si nadie pide cuentas del dinero. Una opción dice algo cierto que no responde.' }, 'Sin rendir cuentas, nadie vigila el dinero público.')],
    cierre: 'Estado bajo la ley y con deberes sociales; tres ramas que se reparten el poder y órganos que vigilan.',
  });

  xpAmplia('icf-sc-constitucion-2', {
    conecta: 'icf-sc-constitucion-1',
    desde: [
      ['Desde cero: qué es un derecho',
        xpMira('dibujo', 'Desde el principio: un **derecho** no es un favor. Es algo que te deben respetar o garantizar.', { dib: reclamo, v: {}, alto: 204 }, [
          ['En la lección de las ramas viste que todos, también el Estado, están bajo la ley.', { hosp: 1 }],
          ['Esa ley te reconoce derechos: cosas que te deben dar o respetar.', { hosp: 1 }],
          ['Si no te entregan la medicina que necesitas, se afecta tu derecho a la salud.', { hosp: 1, pers: 1 }],
          ['Un mecanismo es la herramienta para reclamarlo, como una carta o una demanda corta.', { hosp: 1, pers: 1, doc: 1 }],
          ['Es como la garantía de un celular: dice a dónde ir si algo falla.', { hosp: 1, pers: 1, doc: 1, cartel: 'Mi salud', r: 'derecho + mecanismo' }],
        ], 'Derecho: lo que te deben respetar o dar. Mecanismo: la herramienta para reclamarlo.'),
        xpHaz('hoja', 'Subraya lo que es un **derecho**, no un favor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que el alcalde te salude en la calle.'], ['Estudiar la primaria gratis en un colegio del Estado.'], ['Que te inviten a la fiesta de la cuadra.']], pista: 'Un favor depende del gusto de otro. Busca lo que el Estado te debe aunque no le caigas bien.' }, 'La educación básica en colegios del Estado es un derecho, no un regalo.')],
    ],
    despues: [
      ['Más difícil: una herramienta lleva a otra',
        xpMira('hoja', 'Un paso más: a veces una herramienta **no funciona** y se pasa a otra.', { paras: [['Ana pide por escrito copia de su historia clínica.'], ['Pasan tres semanas y nadie le responde.'], ['Sin esa copia no le programan una cirugía.'], ['Pone una tutela por su derecho de petición y su salud.']] }, [
          ['Primero usa el derecho de petición: pide algo por escrito.', { luz: [0], nota: { 0: 'petición' } }],
          ['La ley da un plazo corto para responder, y ese plazo ya pasó.', { luz: [1], nota: { 1: 'sin respuesta' } }],
          ['Ahora, además, su salud está en riesgo.', { luz: [2] }],
          ['Que no respondan una petición viola un derecho fundamental: cabe la tutela.', { luz: [3], nota: { 3: 'tutela' } }],
          ['Trampa común: pensar que la petición y la tutela son lo mismo. Una pide; la otra protege.', {}],
        ], 'Si una petición no recibe respuesta, se puede pedir protección con una tutela.'),
        xpHaz('hoja', 'El ruido de una discoteca afecta a todo un barrio, y un bebé enfermo no puede dormir. Subraya la lectura **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Solo cabe el habeas corpus, porque nadie descansa.'], ['No hay mecanismo: el ruido no afecta ningún derecho.'], ['El ruido de todos va por acción popular; si la salud del bebé corre riesgo grave, cabe la tutela.']], pista: 'Hay dos problemas a la vez: uno es de todos y otro de una persona. ¿Cuál opción los separa?' }, 'Lo colectivo va por acción popular; el riesgo grave de una persona, por tutela.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Formato que sale mucho: **«Sí/No, porque…»**. Decide primero tú y luego mira la razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque están en juego su educación y su igualdad, y no hay otro medio tan rápido.'], ['Sí, porque la tutela sirve para cualquier problema.'], ['No, porque solo los colombianos tienen derechos.'], ['No, porque primero debe poner una acción popular.']] }, [
          ['El caso: a Pedro le niegan un cupo escolar por ser extranjero. ¿Procede la tutela?', {}],
          ['Esta dice Sí, pero con una razón absoluta: la tutela no sirve para todo.', { luz: [1], nota: { 1: 'absoluto' } }],
          ['Esta es falsa: los extranjeros también tienen derechos en Colombia.', { luz: [2], nota: { 2: 'prejuicio' } }],
          ['Esta cambia la herramienta: la acción popular es para lo de todos.', { luz: [3], nota: { 3: 'herramienta' } }],
          ['Derecho fundamental en juego y sin otro camino eficaz: esa es la razón.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En el Sí/No, la conclusión puede ser buena y la razón falsa: revisa las dos.'),
      xpHaz('hoja', 'Una empresa rellena el humedal de un barrio. Un vecino quiere frenarlo. Subraya el mecanismo y su razón.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Tutela, porque el humedal es propiedad del vecino.'], ['Habeas corpus, porque se están llevando algo.'], ['Acción popular, porque el humedal es un derecho colectivo.'], ['Derecho de petición, porque obliga a la empresa a parar.']], pista: 'Pregunta de quién es el humedal. Ojo: pedir información no obliga a nadie a detener una obra.' }, 'El ambiente es de todos: acción popular.')],
    cierre: 'Mira de quién es el derecho, qué se reclama y si hay otro camino: ahí sale la herramienta.',
  });
}
