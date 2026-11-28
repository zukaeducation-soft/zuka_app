// Preicfes · Sociales y Ciudadanas, mundo 3 «Perspectivas e Intereses», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un lote con árboles que unos quieren de parque y otros de parqueadero; la alcaldía decide.
  const lote = v => X.foto((v.arb ? X.arbol(150, 168, 0.9) + X.arbol(196, 170, 0.75) : '') +
    (v.a ? X.persona(60, 180, 0.85, '#3f9b6a', { cartel: 'Parque sí' }) : '') + (v.b ? X.persona(250, 180, 0.85, '#b5493f', { cartel: 'Parqueo' }) : '') +
    (v.al ? X.edificio(306, 166, 60, 'capitolio', { bandera: false }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');
  // Un río visto por dos personas distintas.
  const lente = v => X.foto((v.rio ? X.rio(188, 16) : '') + (v.arb ? X.arbol(40, 168, 0.8) + X.arbol(300, 166, 0.9) : '') +
    (v.a ? X.persona(110, 172, 0.85, '#d08a2c', { cartel: 'Represa' }) : '') + (v.b ? X.persona(226, 172, 0.85, '#6b4fa0', { cartel: 'Sagrado' }) : '') +
    (v.r ? X.rot(170, 26, v.r, 'oscuro') : ''), 206, 'campo');
  // Un acuerdo entre vecinos, escrito en un acta.
  const acuerdo = v => X.foto((v.cole ? X.edificio(256, 166, 120, 'colegio') : '') +
    (v.gente ? X.persona(110, 180, 0.82, '#3f6fb5') + X.persona(150, 182, 0.84, '#b5493f', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.doc ? X.documento(12, 14, 112, 84, ['1. Turnos', '2. Revisión'], { titulo: 'Acta' }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-perspectivas-1', {
    conecta: 'icf-sc-participacion-3',
    desde: [
      ['Desde cero: conflicto y actores',
        xpMira('dibujo', 'Desde el principio: un **conflicto** no es una pelea a golpes. Es cuando lo que unos quieren no cabe con lo que quieren otros.', { dib: lote, v: { arb: 1 }, alto: 208 }, [
          ['En la lección de reformas viste que las reglas protegen a quien hoy es minoría.', { arb: 1 }],
          ['Un conflicto aparece cuando dos o más quieren cosas que no caben a la vez.', { arb: 1, a: 1 }],
          ['Aquí, unos quieren el lote como parque y otros, como parqueadero.', { arb: 1, a: 1, b: 1 }],
          ['Actor es todo el que gana, pierde o decide algo en el caso, como la alcaldía.', { arb: 1, a: 1, b: 1, al: 1 }],
          ['Truco: arma en tu cabeza una tabla con tres columnas.', { arb: 1, a: 1, b: 1, al: 1, r: 'actor · qué quiere · por qué' }],
        ], 'Conflicto: deseos que no caben a la vez. Actor: quien gana, pierde o decide. Tabla: actor, qué quiere, por qué.'),
        xpHaz('hoja', 'En el caso del lote, subraya un **actor** que cuenta aunque no hable en la reunión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los niños que juegan allí cada tarde.'], ['La marca del cemento del andén.'], ['Un turista que pasó una vez.']], pista: 'Actor es quien gana o pierde algo con la decisión. ¿Quién pierde si no hay parque?' }, 'Los niños pierden su lugar de juego: son actores.')],
    ],
    despues: [
      ['Más difícil: la tabla con un actor escondido',
        xpMira('hoja', 'Un paso más: llena la tabla con un caso de **cuatro** actores y busca al que nadie nombra.', { paras: [['Pescadores: quieren el río limpio, porque viven de la pesca.'], ['Empresa minera: quiere sacar oro, porque es su negocio.'], ['Alcaldía: quiere regalías, porque con ellas hace obras.'], ['Familias río abajo: nadie las invitó a la reunión.']] }, [
          ['Cada fila responde lo mismo: actor, qué quiere y por qué.', { luz: [0, 1, 2] }],
          ['Pescadores y minera chocan: unos necesitan el río limpio y la otra lo puede ensuciar.', { luz: [0, 1], nota: { 0: 'choca', 1: 'choca' } }],
          ['La alcaldía parece neutral, pero también gana con la mina.', { luz: [2], nota: { 2: 'interesada' } }],
          ['El más fácil de olvidar: quien sufre el efecto y no está en la mesa.', { luz: [3], nota: { 3: 'ausente' } }],
          ['Trampa común: confundir lo que alguien pide con la razón que lo mueve.', {}],
        ], 'Con la tabla ves los choques, los intereses escondidos y a quien no está en la mesa.'),
        xpHaz('hoja', 'Un colegio pasará su jornada a la tarde; solo se reúnen profesores y directivos. Subraya al actor **ausente**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El rector, que convocó la reunión.'], ['Los profesores, que votaron el cambio.'], ['Las familias que trabajan de tarde y recogen a los niños.']], pista: 'Busca a quien le cambia la vida con la decisión y no estaba sentado allí.' }, 'Las familias cargan el cambio y nadie las oyó.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pregunta típica: **¿qué actor tendría más razones para oponerse?** Usa la tabla, no tu gusto.', { letras: ['A', 'B', 'C', 'D'], paras: [['Las agencias de turismo, porque ganarían clientes.'], ['Los campesinos que siembran café allí, porque perderían dónde cultivar.'], ['Los turistas, porque les gusta el café.'], ['Todos los habitantes, porque nadie quiere cambios.']] }, [
          ['El caso: convertir una vereda cafetera en zona de turismo de aventura.', {}],
          ['Esta invierte el lado: las agencias ganan, así que estarían a favor.', { luz: [0], nota: { 0: 'invertida' } }],
          ['Esta da una razón que no sale del caso.', { luz: [2], nota: { 2: 'sin razón' } }],
          ['Esta generaliza con «todos» y «nadie».', { luz: [3], nota: { 3: 'generaliza' } }],
          ['En la tabla, los cafeteros pierden su tierra de trabajo: ellos se oponen.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Pregunta quién pierde y por qué; descarta lados invertidos y generalizaciones.'),
      xpHaz('hoja', 'Una ciudad prohíbe las ventas ambulantes en el centro para despejar andenes. Subraya el **conflicto** más probable.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Entre peatones y turistas, porque caminan distinto.'], ['Ninguno, porque la norma ya se aprobó.'], ['Entre vendedores, que pierden su ingreso, y quienes quieren andenes libres.'], ['Entre vendedores y bancos, porque cobran intereses.']], pista: 'Arma la tabla: ¿quién pierde con la norma y quién gana con ella?' }, 'Pierden los vendedores y ganan los que caminan: ahí choca.')],
    cierre: 'Actor, qué quiere y por qué: así ves quién choca, quién gana escondido y quién falta en la mesa.',
  });

  xpAmplia('icf-sc-perspectivas-2', {
    conecta: 'icf-sc-perspectivas-1',
    desde: [
      ['Desde cero: el lente de cada uno',
        xpMira('dibujo', 'Desde el principio: dos personas pueden mirar **el mismo río** y ver cosas distintas.', { dib: lente, v: { rio: 1 }, alto: 206 }, [
          ['En la lección de actores viste que cada uno quiere algo por una razón.', { rio: 1 }],
          ['Esa razón sale muchas veces de cómo ve el mundo: su cosmovisión.', { rio: 1, arb: 1 }],
          ['Para una ingeniera, el río puede ser agua para una represa.', { rio: 1, arb: 1, a: 1 }],
          ['Para un pueblo indígena, puede ser parte sagrada de su territorio.', { rio: 1, arb: 1, a: 1, b: 1 }],
          ['Es como unas gafas de color: todos llevamos unas, aunque no las notemos.', { rio: 1, arb: 1, a: 1, b: 1, r: 'cada quien, su lente' }],
        ], 'Cosmovisión: el lente desde el que alguien ve el mundo y decide qué vale.'),
        xpHaz('hoja', 'Subraya la frase que muestra una **cosmovisión** sobre la tierra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El lote mide 300 metros cuadrados.'], ['La tierra es nuestra madre: no se vende.'], ['El bus a la vereda pasa a las seis.']], pista: 'Dos frases solo dan datos. Busca la que dice qué vale la tierra para alguien.' }, 'Ver la tierra como madre es una manera de mirar el mundo.')],
    ],
    despues: [
      ['Más difícil: el prejuicio disfrazado de dato',
        xpMira('hoja', 'Un paso más: a veces el prejuicio **trae un caso real** para parecer razonable.', { paras: [['«Los del barrio Alto no pagan: no les fíe».'], ['«Tres del barrio Alto me quedaron debiendo».'], ['«El registro dice que el 5 % de los clientes del barrio no pagó».'], ['«Hay que mirar el historial de cada cliente».']] }, [
          ['Esta juzga a todo un barrio: prejuicio de los clásicos.', { luz: [0], nota: { 0: 'prejuicio' } }],
          ['Esta trae casos reales, pero tres no hablan por todo un barrio.', { luz: [1], nota: { 1: 'pocos casos' } }],
          ['Esta mira todo el grupo y muestra lo contrario: casi todos pagan.', { luz: [2], nota: { 2: 'dato' } }],
          ['Esta juzga a cada persona por lo que hizo, no por su grupo.', { luz: [3], nota: { 3: 'sin prejuicio' } }],
          ['Trampa: un caso cierto no vuelve justa una generalización.', {}],
        ], 'El prejuicio se delata cuando salta de unos pocos a todos.'),
        xpHaz('hoja', 'Subraya la frase que **generaliza** a partir de pocos casos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['En la encuesta, 8 de cada 10 usuarios calificaron bien el servicio.'], ['Este conductor tiene tres multas por exceso de velocidad.'], ['Dos turistas extranjeros me robaron: los extranjeros son ladrones.']], pista: 'Busca el salto: unos pocos casos y después una frase sobre todo un grupo.' }, 'De dos turistas pasa a «los extranjeros»: generaliza.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pregunta típica: **¿qué supuesto o prejuicio hay en la frase?** Busca lo que da por cierto sin decirlo.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que los campesinos, como grupo, no valoran el estudio.'], ['Que el colegio cuesta demasiado dinero.'], ['Que el funcionario también es campesino.'], ['Que la vereda queda lejos de la ciudad.']] }, [
          ['La frase: «Para qué un colegio en la vereda, si los campesinos no quieren estudiar».', {}],
          ['Esta puede ser cierta en el mundo, pero la frase no lo supone.', { luz: [1], nota: { 1: 'no está' } }],
          ['Esta inventa un dato que la frase no da.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta es otra idea razonable que no explica la frase.', { luz: [3], nota: { 3: 'otra idea' } }],
          ['La frase supone algo de todo un grupo, sin preguntarle: ese es el prejuicio.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'El supuesto es lo que la frase necesita creer para sonar lógica.'),
      xpHaz('hoja', 'Una empresa no contrata mujeres para manejar camiones: «no tienen la fuerza». Subraya la mejor **crítica**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Las mujeres manejan mejor que los hombres.'], ['Juzga a todas por su grupo y no mide la capacidad de cada aspirante.'], ['La empresa debería vender los camiones.'], ['Manejar camiones es un trabajo aburrido.']], pista: 'Una opción responde con otro prejuicio. Busca la que señala el error de juzgar al grupo.' }, 'Señala el prejuicio sin crear otro.')],
    cierre: 'Todos miramos con un lente; el prejuicio salta de pocos casos a todo un grupo y se ve en lo que da por cierto.',
  });

  xpAmplia('icf-sc-perspectivas-3', {
    conecta: 'icf-sc-perspectivas-1',
    desde: [
      ['Desde cero: qué es una salida',
        xpMira('dibujo', 'Desde el principio: una **solución** es una salida que termina o baja un conflicto. Casi nunca deja a todos felices.', { dib: acuerdo, v: { cole: 1 }, alto: 208 }, [
          ['En la lección de actores viste que cada uno quiere algo por una razón.', { cole: 1 }],
          ['Una solución es una salida que termina o baja el conflicto.', { cole: 1, gente: 1 }],
          ['Casi nunca todos ganan todo: cada uno cede algo.', { cole: 1, gente: 1, r: 'cada uno cede algo' }],
          ['Se cumple más si los actores la discuten y queda por escrito.', { cole: 1, gente: 1, doc: 1 }],
          ['Como el control del televisor: turnos acordados antes de que empiece la pelea.', { cole: 1, gente: 1, doc: 1, cartel: 'Acuerdo' }],
        ], 'Solución: salida que baja el conflicto; se cumple más si se acuerda y cada uno cede.'),
        xpHaz('hoja', 'Dos hermanos pelean por el único computador de la casa. Subraya la salida **acordada**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El papá lo esconde para siempre.'], ['Hacen juntos un horario por turnos y lo pegan en la nevera.'], ['El mayor lo usa porque es el mayor.']], pista: 'Dos salidas las impone alguien. Busca la que hicieron los dos.' }, 'La hicieron los dos y quedó a la vista.')],
    ],
    despues: [
      ['Más difícil: lo que no se negocia',
        xpMira('hoja', 'Un paso más: una salida es **incompatible** con un grupo si choca con algo que para él no se negocia.', { paras: [['Que la carretera pase por el sitio sagrado, con un pago al resguardo.'], ['Hacer la consulta previa con el resguardo para decidir el trazado.'], ['Que la empresa decida sola, porque es la que paga.'], ['Que no haya carretera ni otro arreglo, sin oír a nadie.']] }, [
          ['Para el resguardo, el sitio sagrado no tiene precio: pagar no lo arregla.', { luz: [0], nota: { 0: 'incompatible' } }],
          ['Decidir sin ellos choca con la consulta previa, que es su derecho.', { luz: [2], nota: { 2: 'excluye' } }],
          ['Cerrarlo todo sin oír a nadie deja sin vía a quienes la necesitan.', { luz: [3], nota: { 3: 'no oye' } }],
          ['La consulta previa busca un trazado que los dos puedan aceptar.', { luz: [1], nota: { 1: 'compatible' } }],
          ['Trampa: creer que todo se arregla con dinero. Hay valores que no se venden.', {}],
        ], 'Una salida es incompatible si choca con lo que un grupo considera innegociable.'),
        xpHaz('hoja', 'Una comunidad religiosa no trabaja los sábados. Subraya la salida **incompatible** con ella.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Dejar que cambien el turno del sábado por uno del domingo.'], ['Repartir los turnos según lo que cada empleado pueda.'], ['Obligar a todos los empleados a trabajar todos los sábados.']], pista: 'Busca la salida que no le deja ningún espacio a lo que para ellos no se negocia.' }, 'Obligar el sábado choca de frente con su creencia.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué propuesta tiene más probabilidad de ser aceptada por los dos grupos?**', { letras: ['A', 'B', 'C', 'D'], paras: [['Cerrar la cancha, porque el descanso es un derecho.'], ['Jugar hasta las 9 p. m., en un horario acordado entre vecinos y jugadores y revisado cada mes.'], ['Dejar todo igual, porque el deporte es sano.'], ['Que los vecinos se muden a otro barrio.']] }, [
          ['El caso: los vecinos quieren dormir y unos jugadores usan de noche una cancha iluminada.', {}],
          ['Esta suena justa, pero solo atiende a los vecinos.', { luz: [0], nota: { 0: 'un lado' } }],
          ['Esta también suena bien, pero solo atiende a los jugadores.', { luz: [2], nota: { 2: 'un lado' } }],
          ['Esta no se puede cumplir: no es viable.', { luz: [3], nota: { 3: 'inviable' } }],
          ['Acordada por los dos, con límite y revisión: atiende a ambos.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'La salida que dura atiende a los dos lados, se puede cumplir y se revisa.'),
      xpHaz('hoja', 'En un pueblo turístico falta agua en verano; hoteles y campesinos la necesitan. Subraya la salida que atiende **a los dos**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Darles toda el agua a los hoteles, que traen dinero.'], ['Prohibir el turismo para siempre.'], ['Que cada uno saque lo que pueda.'], ['Cupos y turnos acordados en un comité de hoteles y campesinos.']], pista: 'Descarta las que dejan a un grupo sin nada o que nadie controla.' }, 'Cupos acordados entre los dos grupos.')],
    cierre: 'A quién atiende, si choca con algo innegociable, si se puede cumplir y si la acordaron todos.',
  });
}
