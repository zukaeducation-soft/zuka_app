// Preicfes · Sociales y Ciudadanas, mundo 2 «Participación y Control», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const gente = (x, s = 0.8) => X.persona(x, 178, s, '#3f6fb5') + X.persona(x + 32, 180, s + 0.02, '#b5493f') + X.persona(x + 64, 178, s, '#3f9b6a');
  // Puesto de votación en un colegio, con la fila y la urna (v.e: el voto entra de 0 a 1).
  const votacion = v => X.foto((v.cole ? X.edificio(80, 166, 120, 'colegio') : '') + (v.gente ? gente(178) : '') +
    (v.urna ? X.urna(298, 176, 0.75, v.e || 0) : '') + (v.r ? X.rot(170, 196, v.r, 'oscuro') : ''), 206, 'ciudad');
  // Una obra pública con su contrato, el dinero de todos y una veedora que mira.
  const vigila = v => X.foto((v.cole ? X.edificio(262, 166, 120, 'colegio') : '') +
    (v.doc ? X.documento(12, 14, 112, 84, ['Obra: colegio', 'Valor pagado'], { titulo: 'Contrato' }) : '') +
    (v.plata ? X.billete(132, 24, 78, '$ 10 000') + X.moneda(226, 36, 12, '$') + X.moneda(254, 46, 12, '$') : '') +
    (v.gente ? X.persona(150, 182, 0.85, '#7a4fb5', { cartel: 'Veeduría' }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');
  // Un conjunto de casas que quiere cambiar su reglamento.
  const reforma = v => X.foto((v.casa ? X.edificio(70, 166, 100, 'casa') : '') +
    (v.doc ? X.documento(200, 14, 126, 88, ['Art. 1: horarios', 'Art. 2: mascotas'], { titulo: 'Reglamento' }) : '') +
    (v.gente ? X.persona(150, 180, 0.8, '#3f6fb5') + X.persona(186, 182, 0.82, '#b5493f') : '') + (v.urna ? X.urna(282, 178, 0.68, v.e || 0) : '') +
    (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-participacion-1', {
    conecta: 'icf-sc-constitucion-2',
    desde: [
      ['Desde cero: qué es participar',
        xpMira('dibujo', 'Desde el principio: **participar** es tomar parte en las decisiones que te afectan. Votar es la forma más conocida.', { dib: votacion, v: { cole: 1 }, alto: 206 }, [
          ['En la lección de derechos viste herramientas para reclamar; participar también es un derecho.', { cole: 1 }],
          ['Participar es tomar parte en lo que se decide sobre tu barrio o tu país.', { cole: 1, gente: 1 }],
          ['Votar es lo más conocido: en el colegio del barrio se arma la fila y la urna.', { cole: 1, gente: 1, urna: 1, e: 0.2 }],
          ['Si eliges a quien decide por ti, es democracia representativa.', { cole: 1, gente: 1, urna: 1, e: 1, r: 'representativa' }],
          ['Si la gente vota el asunto mismo, es participación directa.', { cole: 1, gente: 1, urna: 1, e: 1, r: 'directa' }],
        ], 'Representativa: eliges quién decide. Directa: la gente decide el asunto; la Constitución combina las dos.'),
        xpHaz('hoja', 'Subraya el caso en que la gente **decide directamente** el asunto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los vecinos eligen a su concejal.'], ['Los habitantes votan Sí o No a cambiar el nombre del municipio.'], ['El concejo aprueba los impuestos del año.']], pista: 'En dos de ellas decide alguien elegido. Busca dónde la gente vota el tema mismo.' }, 'Votar el nombre del pueblo es decidir el asunto directamente.')],
    ],
    despues: [
      ['Más difícil: ganar no siempre basta',
        xpMira('hoja', 'Un paso más: una consulta popular obliga solo si gana la mitad más uno **y** vota suficiente gente.', { paras: [['En un municipio hay 30 000 inscritos para votar.'], ['A la consulta van 8 000 personas.'], ['7 500 votan Sí y 500 votan No.'], ['Se pide que vote al menos un tercio de los inscritos.']] }, [
          ['Ganar no basta: también se necesita que vote bastante gente.', { luz: [3], nota: { 3: 'la regla' } }],
          ['Un tercio de 30 000 inscritos son 10 000 votantes.', { luz: [0, 3], nota: { 0: 'mínimo 10 000' } }],
          ['Votaron 8 000: no se llegó al mínimo.', { luz: [1], nota: { 1: 'faltan 2 000' } }],
          ['Aunque el Sí arrasó, la consulta no obliga.', { luz: [2], nota: { 2: 'no obliga' } }],
          ['Trampa común: mirar solo quién ganó y olvidar cuántos votaron.', {}],
        ], 'Una consulta obliga si gana la mitad más uno y vota al menos un tercio de los inscritos.'),
        xpHaz('hoja', 'Un pueblo tiene 12 000 inscritos. En su consulta votan 4 500 y el Sí saca 3 000. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['No obliga, porque el Sí no llegó a 4 500 votos.'], ['Obliga: votó más de un tercio (4 000) y el Sí pasó de la mitad.'], ['No obliga, porque votó menos de la mitad del pueblo.']], pista: 'Saca primero el tercio de 12 000. Luego mira si el Sí pasó de la mitad de los que votaron.' }, 'Votaron 4 500 de un mínimo de 4 000, y 3 000 es más de la mitad.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen da un **objetivo** de un grupo y pregunta qué mecanismo le sirve, con su razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Revocatoria, porque el alcalde no ha hecho parques.'], ['Cabildo abierto, porque permite discutir un tema con el concejo en público.'], ['Plebiscito, porque los jóvenes pueden convocarlo.'], ['Tutela, porque los parques son un derecho fundamental.']] }, [
          ['El objetivo: unos jóvenes quieren que el concejo discuta en público la falta de parques.', {}],
          ['Esta castiga al alcalde, pero ellos quieren discutir, no sacarlo. Fuera de la pregunta.', { luz: [0], nota: { 0: 'otro objetivo' } }],
          ['Esta invierte quién convoca: el plebiscito lo convoca el presidente.', { luz: [2], nota: { 2: 'invertido' } }],
          ['Esta usa una herramienta de reclamo, no de participación.', { luz: [3], nota: { 3: 'otra herramienta' } }],
          ['Hablar con el concejo en público: eso es el cabildo abierto.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Lee el objetivo exacto del grupo: discutir, decidir, proponer o retirar a alguien.'),
      xpHaz('hoja', 'Un municipio quiere que sus habitantes decidan si cambian el horario de la feria anual. Subraya el mecanismo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Plebiscito, porque lo convoca el alcalde.'], ['Revocatoria, porque cambia algo del pueblo.'], ['Cabildo abierto, porque allí la gente vota.'], ['Consulta popular, porque se pregunta un asunto del municipio.']], pista: 'Una opción cambia quién convoca y otra dice que en el cabildo se vota. Busca la que pregunta un asunto.' }, 'Preguntar un asunto del municipio es una consulta popular.')],
    cierre: 'Eliges quién decide o decides tú; cada mecanismo tiene su asunto, y una consulta obliga solo si vota bastante gente.',
  });

  xpAmplia('icf-sc-participacion-2', {
    conecta: 'icf-sc-constitucion-1',
    desde: [
      ['Desde cero: por qué alguien vigila',
        xpMira('dibujo', 'Desde el principio: lo **público** es de todos, y por eso alguien tiene que mirar cómo se usa.', { dib: vigila, v: { cole: 1 }, alto: 208 }, [
          ['En la lección del Estado conociste a la Contraloría, la Procuraduría y la Defensoría.', { cole: 1 }],
          ['El dinero del Estado sale sobre todo de los impuestos que pagamos.', { cole: 1, plata: 1 }],
          ['Ese dinero se gasta con contratos: papeles que dicen qué se hace y a qué precio.', { cole: 1, plata: 1, doc: 1 }],
          ['Si nadie revisa, la obra puede quedar a medias o el dinero irse para amigos.', { cole: 1, plata: 1, doc: 1, r: '¿quién revisa?' }],
          ['Es como la vaca de un paseo: todos quieren ver en qué se gastó.', { cole: 1, plata: 1, doc: 1, gente: 1 }],
        ], 'Lo público es de todos: por eso se revisa el dinero y la conducta de quienes lo manejan.'),
        xpHaz('hoja', 'Subraya de dónde sale, **sobre todo**, el dinero público.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Del bolsillo del alcalde de turno.'], ['De los impuestos que pagan personas y empresas.'], ['De los bancos, que se lo regalan al Estado.']], pista: 'Piensa en la vaca del paseo: ¿quién pone la plata?' }, 'Los impuestos de todos sostienen lo público.')],
    ],
    despues: [
      ['Más difícil: una falta, tres sanciones',
        xpMira('hoja', 'Un paso más: una sola falta puede traer **varias** sanciones, una por cada pregunta.', { paras: [['Una veeduría ve que un comedor escolar pagado no existe.'], ['Lleva las pruebas a los organismos de control y a la Fiscalía.'], ['La Procuraduría destituye al funcionario.'], ['Luego la Fiscalía lo acusa y la Contraloría le cobra el dinero.']] }, [
          ['La veeduría mira y denuncia; no castiga a nadie.', { luz: [0], nota: { 0: 'veeduría' } }],
          ['Con la denuncia, cada entidad abre su propia investigación.', { luz: [1] }],
          ['La Procuraduría juzga la conducta del funcionario y lo puede destituir.', { luz: [2], nota: { 2: 'disciplinaria' } }],
          ['La Fiscalía persigue el delito y la Contraloría busca recuperar el dinero.', { luz: [3], nota: { 3: 'penal y fiscal' } }],
          ['Trampa común: creer que una sanción impide las otras. Responden preguntas distintas.', {}],
        ], 'Una falta puede tener sanción disciplinaria, penal y fiscal: cada una responde algo distinto.'),
        xpHaz('hoja', 'A un funcionario ya lo destituyó la Procuraduría por un contrato amañado. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ya no lo pueden investigar por nada más.'], ['La Fiscalía todavía puede acusarlo si hubo delito.'], ['La veeduría debe ponerle una multa.']], pista: 'La destitución responde a su conducta. ¿Quién responde si hubo delito?' }, 'Conducta y delito son preguntas distintas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen cuenta un caso y pregunta **qué entidad** actúa y por qué. Cada opción falsa tiene su trampa.', { letras: ['A', 'B', 'C', 'D'], paras: [['La Fiscalía, porque toda pérdida de dinero es un delito.'], ['La Defensoría, porque la salud es un derecho.'], ['La Contraloría, porque vigila cómo se gasta el dinero público.'], ['El Congreso, porque aprueba las leyes de salud.']] }, [
          ['El caso: un hospital público pagó ambulancias que nunca llegaron. ¿Quién revisa el gasto?', {}],
          ['Esta generaliza: no toda pérdida es delito, y la pregunta es por el gasto.', { luz: [0], nota: { 0: 'generaliza' } }],
          ['Esta suena noble, pero responde otra pregunta: la de los derechos.', { luz: [1], nota: { 1: 'atractiva' } }],
          ['Esta trae una rama que hace leyes, no que revisa este contrato.', { luz: [3], nota: { 3: 'otra rama' } }],
          ['El rastro del dinero público lo sigue la Contraloría.', { luz: [2], nota: { 2: 'sirve' } }],
        ], 'Pregunta qué se investiga: dinero, conducta, delito o derechos. La palabra clave elige la entidad.'),
      xpHaz('hoja', 'A una señora su EPS le niega una cita y no sabe a quién acudir en su municipio. Subraya quién la **orienta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La Contraloría municipal, porque la EPS maneja dinero.'], ['La Personería, porque defiende los derechos de la gente del municipio.'], ['La Fiscalía, porque negar una cita siempre es delito.'], ['El concejo, porque aprobó el presupuesto.']], pista: 'Ella no pregunta por dinero ni por delitos: necesita que la ayuden con un derecho.' }, 'La Personería acompaña a las personas en su municipio.')],
    cierre: 'Lo público se vigila: dinero, conducta y delito tienen su entidad, y la gente mira y denuncia.',
  });

  xpAmplia('icf-sc-participacion-3', {
    conecta: 'icf-sc-participacion-1',
    desde: [
      ['Desde cero: por qué cuesta cambiar las reglas',
        xpMira('dibujo', 'Desde el principio: **reformar** es cambiar una regla que ya existe. Las reglas más importantes piden más.', { dib: reforma, v: { casa: 1 }, alto: 208 }, [
          ['En la lección de participación viste el referendo: la gente vota una norma.', { casa: 1, urna: 1 }],
          ['Reformar es cambiar o añadir algo a una regla que ya existe.', { casa: 1, doc: 1 }],
          ['En un conjunto de casas, el reglamento no lo cambia un solo vecino.', { casa: 1, doc: 1, gente: 1 }],
          ['Se necesita una asamblea y más votos que de costumbre.', { casa: 1, doc: 1, gente: 1, urna: 1, e: 1 }],
          ['Con la Constitución pasa igual, pero con pasos aún más exigentes.', { casa: 1, doc: 1, gente: 1, urna: 1, e: 1, r: 'más pasos, más votos' }],
        ], 'Reformar es cambiar una regla existente; las más importantes piden más pasos y más votos.'),
        xpHaz('hoja', 'Subraya qué es **reformar** la Constitución.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cumplirla al pie de la letra.'], ['Cambiar o añadir algo a su texto por un camino permitido.'], ['Desobedecerla cuando no gusta.']], pista: 'Reformar no es obedecer ni desobedecer: es tocar el texto mismo.' }, 'Se cambia el texto, por el camino que ella misma fija.')],
    ],
    despues: [
      ['Más difícil: los pasos y el límite',
        xpMira('hoja', 'Un paso más: el **acto legislativo** del Congreso tiene muchos pasos, y la Corte revisa que se cumplan.', { paras: [['Un acto legislativo pasa por ocho debates en el Congreso.'], ['Se reparten en dos periodos de sesiones seguidos.'], ['La Corte Constitucional revisa que se cumplieran los pasos.'], ['El Congreso puede reformar, pero no reemplazar los pilares de la Constitución.']] }, [
          ['Ocho debates: no basta una votación rápida.', { luz: [0], nota: { 0: '8 debates' } }],
          ['Y en dos periodos, para que haya tiempo de pensarlo.', { luz: [1], nota: { 1: 'tiempo' } }],
          ['Después, la Corte mira si el camino se respetó.', { luz: [2], nota: { 2: 'Corte' } }],
          ['Ha dicho que reformar no es sustituir: no se puede borrar, por ejemplo, la división del poder.', { luz: [3], nota: { 3: 'límite' } }],
          ['Trampa común: pensar que con muchos votos se puede cambiar cualquier cosa.', {}],
        ], 'Ocho debates, la Corte revisa el camino y reformar no es reemplazar los pilares.'),
        xpHaz('hoja', 'Un acto legislativo se aprobó en un solo debate «porque era urgente». Subraya lo más **probable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La Corte lo puede declarar inválido por saltarse los pasos.'], ['Vale, porque la urgencia permite saltar pasos.'], ['Vale, porque el presidente estaba de acuerdo.']], pista: 'Recuerda quién revisa el camino de una reforma y cuántos debates pide.' }, 'Sin los ocho debates, el camino no se respetó.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen pide el **argumento que apoya** una idea. Aquí: que reformar la Constitución sea difícil.', { letras: ['A', 'B', 'C', 'D'], paras: [['Un cambio tan grande debe contar con muchos, para no quitarles derechos a las minorías.'], ['La Constitución de 1991 no se puede cambiar nunca.'], ['Los congresistas ganan más si nadie la cambia.'], ['Todo cambio a las reglas es malo para el país.']] }, [
          ['Se pide una razón que sostenga la idea, no cualquier frase a favor.', {}],
          ['Esta es falsa: hay tres caminos para cambiarla.', { luz: [1], nota: { 1: 'falsa' } }],
          ['Esta inventa un motivo que nada en el caso muestra.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta generaliza con «todo»: sin datos, no sostiene nada.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['Proteger a quien hoy es minoría sí explica por qué debe costar.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Un buen argumento explica el porqué sin absolutos ni motivos inventados.'),
      xpHaz('hoja', 'Se quiere cambiar un artículo por **referendo**. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El presidente lo decide solo, sin votación.'], ['El Congreso lo aprueba por ley y luego la gente vota el texto.'], ['Lo aprueba un juez en diez días.'], ['Basta con reunir firmas, sin votación.']], pista: 'En un referendo siempre vota la gente. Antes, alguien tiene que aprobar llevarlo a las urnas.' }, 'Ley del Congreso y voto de la gente.')],
    cierre: 'La Constitución manda; se reforma por tres caminos exigentes, y reformar no es reemplazar.',
  });
}
