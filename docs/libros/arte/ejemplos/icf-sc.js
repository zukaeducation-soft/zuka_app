// Ejemplos resueltos y marcados de Sociales y Ciudadanas del Preicfes (libro 7). Casos y fuentes originales; los hechos
// históricos y los artículos citados son reales. H(título, pregunta, párrafos [[trozos]], opciones, pasos [lo que se explica,
// { luz: trozos u opciones, x: opciones que se tachan, n: { párrafo u opción: rótulo } }], respuesta). Trozos desde 0.
const H = (t, q, T, O, m, r) => {
  const nT = T.flat().length, id = k => (typeof k === 'string' ? nT + 'ABCD'.indexOf(k) : k), pa = k => (/[A-D]/.test(k) ? T.length + 'ABCD'.indexOf(k) : +k);
  return [{ t, q, escena: 'hoja', en: { letras: [...T.map((_, i) => `${i + 1}`), ...'ABCD'.slice(0, O.length)], paras: [...T, ...O.map(o => [o])] },
    m: m.map(([d, v = {}]) => [d, { ...(v.luz ? { luz: v.luz.map(id) } : {}), ...(v.x ? { tacha: v.x.map(id) } : {}), ...(v.n ? { nota: Object.fromEntries(Object.entries(v.n).map(([k, s]) => [pa(k), s])) } : {}) }]), r }];
};
Object.assign(EJ, {
  // --------------------------------------------------------------------------------------- Constitución y Estado
  'icf-sc-constitucion-1': H('Una rama frena a otra', '¿Qué rasgo del Estado colombiano muestra mejor el caso?', [
    ['En una emergencia, el Gobierno expidió un decreto', 'que prohibía en todo el país las reuniones de más de diez personas durante un año.'],
    ['La Corte Constitucional lo revisó', 'y lo declaró contrario a la Constitución:', 'la medida iba más allá de lo que la emergencia exigía.'],
    ['El Gobierno acató el fallo y levantó la prohibición.']],
  ['Que el presidente puede gobernar solo en una emergencia.', 'Que una rama del poder puede frenar las decisiones de otra.', 'Que el Estado debe garantizar a todos una vida digna.', 'Que las leyes las hacen los jueces.'], [
    ['La pregunta pide el rasgo que se **ve** en el caso, no uno cualquiera que sea cierto.', {}],
    ['Quien decide primero es el Gobierno: la rama ejecutiva.', { luz: [0, 1], n: { 0: 'ejecutiva' } }],
    ['Quien lo frena es la Corte, de la rama judicial. Y el Gobierno obedece.', { luz: [2, 3, 5], n: { 1: 'judicial', 2: 'acata' } }],
    ['A dice lo contrario de lo que pasó. C es cierto, pero el caso no habla de necesidades. D confunde revisar un decreto con hacer leyes.', { x: ['A', 'C', 'D'], n: { A: 'al revés', C: 'otro rasgo', D: 'confunde' } }],
    ['Queda B: el control entre ramas.', { luz: ['B'] }],
  ], 'B. Una rama decide y otra la controla: así nadie concentra el poder.'),
  'icf-sc-constitucion-2': H('El derecho a que respondan', '¿Qué puede hacer Gloria para que un juez obligue al colegio a responder?', [
    ['En marzo, Gloria pidió por escrito al colegio público de su hija', 'una copia de las notas del año anterior, para matricularla en otro colegio.'],
    ['Pasaron cuatro meses y nadie le respondió.'],
    ['El artículo 23 de la Constitución dice que toda persona tiene derecho a presentar peticiones respetuosas a las autoridades', 'y a obtener pronta resolución.']],
  ['Una acción popular, porque la educación es de todos.', 'Una acción de tutela, porque se le vulnera un derecho fundamental.', 'Un hábeas corpus, porque su hija no puede estudiar.', 'Una revocatoria del mandato contra el rector.'], [
    ['Primero, ¿qué derecho está en juego? El de pedir y recibir respuesta: el artículo 23.', { luz: [3, 4], n: { 2: 'derecho de petición' } }],
    ['La autoridad calló cuatro meses: la «pronta resolución» no llegó.', { luz: [2], n: { 1: 'vulnerado' } }],
    ['Es un derecho de Gloria, no de una comunidad: la acción popular no sirve. El hábeas corpus protege a quien está detenido.', { x: ['A', 'C'], n: { A: 'colectivos', C: 'libertad' } }],
    ['La revocatoria retira a alcaldes y gobernadores elegidos, no a un rector.', { x: ['D'], n: { D: 'elegidos' } }],
    ['El derecho de petición es fundamental: se protege con tutela.', { luz: ['B'] }],
  ], 'B. Primero se identifica el derecho; luego, la herramienta que lo protege.'),

  // --------------------------------------------------------------------------------------- Participación
  'icf-sc-participacion-1': H('Sí o no a una pregunta', '¿Qué mecanismo de participación se usó?', [
    ['La alcaldesa de un municipio, con el visto bueno del concejo,', 'convocó a los habitantes a una votación.'],
    ['La pregunta era una sola:', '«¿Está de acuerdo con que el centro histórico se cierre a los carros?».'],
    ['Cada votante debía marcar sí o no.', 'Nadie votaba el texto de una norma ni elegía o retiraba a una persona.']],
  ['Un referendo', 'Un cabildo abierto', 'Una consulta popular', 'Una revocatoria del mandato'], [
    ['Lo que se vota es una pregunta sobre un asunto del municipio.', { luz: [2, 3], n: { 1: 'asunto público' } }],
    ['No se vota una norma: el referendo cae.', { luz: [5], x: ['A'], n: { A: 'una norma' } }],
    ['Tampoco se retira a un elegido. Y en un cabildo se delibera en el concejo; no se marca sí o no.', { luz: [4], x: ['B', 'D'], n: { B: 'deliberar', D: 'un cargo' } }],
    ['Una pregunta de interés del municipio que la gente responde: consulta popular.', { luz: ['C'] }],
  ], 'C. Lo que se vota (una pregunta, una norma o un cargo) decide el mecanismo.'),
  'icf-sc-participacion-2': H('Dos problemas, una pregunta', '¿A qué órgano le corresponde lo que pide la veeduría?', [
    ['Durante dos meses, un funcionario de la alcaldía no fue a trabajar', 'y aun así cobró su sueldo completo.'],
    ['El parque que tenía a su cargo, pagado con dinero público,', 'quedó a medias.'],
    ['Una veeduría quiere que se investigue', 'si el funcionario faltó a sus deberes', 'y que se le sancione si es así.']],
  ['A la Contraloría', 'A la Procuraduría', 'A la Defensoría del Pueblo', 'A la Registraduría'], [
    ['El texto trae dos problemas: la conducta del funcionario y el dinero del parque.', { luz: [0, 2], n: { 0: 'conducta', 1: 'dinero' } }],
    ['Pero la pregunta pide solo lo de la veeduría: investigar si faltó a sus deberes.', { luz: [5, 6], n: { 2: 'lo que se pide' } }],
    ['La Contraloría sigue el dinero: serviría para el parque, no para esto. La trampa es que el dinero sí aparece.', { x: ['A'], n: { A: 'el dinero' } }],
    ['La Defensoría acompaña a quien reclama sus derechos; la Registraduría organiza elecciones.', { x: ['C', 'D'], n: { C: 'derechos', D: 'elecciones' } }],
    ['La conducta de los funcionarios la investiga y sanciona la Procuraduría.', { luz: ['B'] }],
  ], 'B. Se responde lo que se pregunta, aunque el texto traiga más.'),
  'icf-sc-participacion-3': H('La trampa del plebiscito', '¿Con qué mecanismo se reformaría la Constitución en el caso?', [
    ['El artículo 374 dice que la Constitución podrá ser reformada por el Congreso,', 'por una Asamblea Constituyente', 'o por el pueblo mediante referendo.'],
    ['En un caso imaginario, un comité de ciudadanos reúne firmas', 'para que una reforma sobre el periodo de los alcaldes se someta al voto.'],
    ['El Congreso aprueba la ley que convoca la votación', 'y cada ciudadano marcará sí o no a ese texto.']],
  ['Un acto legislativo', 'Una asamblea constituyente', 'Un plebiscito', 'Un referendo'], [
    ['La regla da tres caminos. Hay que ver cuál se recorre en el caso.', { luz: [0, 1, 2], n: { 0: 'tres caminos' } }],
    ['El Congreso aparece, pero solo convoca: no es él quien aprueba la reforma.', { luz: [5], x: ['A'], n: { A: 'solo convoca' } }],
    ['Nadie elige delegados para escribir una constitución.', { x: ['B'], n: { B: 'no hay elección' } }],
    ['El plebiscito suena parecido, pero no está en el artículo: con él no se reforma la Constitución.', { x: ['C'], n: { C: 'no reforma' } }],
    ['Decide la gente, votando sí o no a un texto: referendo.', { luz: [6, 'D'], n: { 2: 'decide el pueblo' } }],
  ], 'D. Se busca quién decide al final y sobre qué vota.'),

  // --------------------------------------------------------------------------------------- Perspectivas
  'icf-sc-perspectivas-1': H('¿A quién responde la alcaldía?', 'El anuncio del bus gratis atiende, sobre todo, la preocupación de', [
    ['La alcaldía propone trasladar la plaza de mercado del centro a un lote en las afueras.'],
    ['Los vendedores temen perder a los clientes que hoy pasan a pie por el centro.', 'Los vecinos del centro celebran: habrá menos basura y menos trancones.'],
    ['Los camioneros que surten la plaza dicen que la vía al lote nuevo es destapada.', 'La alcaldía anuncia un bus gratis desde el centro hasta la plaza nueva.']],
  ['los vecinos del centro.', 'los vendedores.', 'los camioneros.', 'la propia alcaldía.'], [
    ['Primero, cada actor con su interés.', { luz: [1, 2, 3], n: { 1: 'vendedores y vecinos', 2: 'camioneros' } }],
    ['El bus lleva gente del centro a la plaza: resuelve que los clientes lleguen.', { luz: [4, 1] }],
    ['Los vecinos no tenían queja: ya celebraban el traslado.', { x: ['A'], n: { A: 'sin queja' } }],
    ['Un bus de pasajeros no arregla una vía para camiones. Y la alcaldía es quien propone, no quien se queja.', { x: ['C', 'D'], n: { C: 'otra queja', D: 'propone' } }],
    ['Queda B: los vendedores temían perder a sus clientes.', { luz: ['B'] }],
  ], 'B. Se une la solución con la queja que responde.'),
  'icf-sc-perspectivas-2': H('Culpar a un grupo', '¿Cuál es el problema principal en lo que dijo el primer vecino?', [
    ['En la junta del barrio, un vecino dijo:', '«Los que llegaron del campo dañaron las bancas del parque.', 'Allá no hay parques y no saben cuidarlos».'],
    ['Una vecina respondió que ella llegó del campo', 'y es quien siembra los jardines del barrio.'],
    ['La presidenta de la junta pidió averiguar quién dañó las bancas', 'antes de culpar a nadie.']],
  ['Le atribuye a todo un grupo una conducta, sin pruebas.', 'Propone una solución demasiado cara.', 'Defiende la vida en el campo.', 'Habla de un parque que no existe.'], [
    ['El vecino no señala a una persona: habla de «los que llegaron del campo», todos.', { luz: [1], n: { 0: 'todo un grupo' } }],
    ['Y su razón es otra generalización: «allá no hay parques».', { luz: [2] }],
    ['La vecina es un caso que lo contradice; la presidenta pide pruebas.', { luz: [3, 4, 5, 6], n: { 1: 'contraejemplo', 2: 'pide pruebas' } }],
    ['Él no propone nada, no defiende el campo, y el parque sí existe.', { x: ['B', 'C', 'D'], n: { B: 'no propone', C: 'al revés', D: 'sí existe' } }],
    ['Juzgar a alguien por el grupo al que pertenece, sin pruebas, es un prejuicio.', { luz: ['A'] }],
  ], 'A.'),
  'icf-sc-perspectivas-3': H('Una salida para los dos', '¿Qué propuesta atiende el interés de las dos partes?', [
    ['La banda del colegio ensaya a las seis de la mañana en el patio,', 'porque en dos meses tiene un concurso.'],
    ['Doña Rubiela, la vecina, trabaja de noche en un hospital', 'y duerme hasta el mediodía.', 'Pide que no se ensaye más.'],
    ['El coliseo cubierto del colegio, que apaga casi todo el sonido,', 'está libre entre semana después de las cuatro de la tarde.']],
  ['Suspender la banda hasta después del concurso.', 'Ensayar en el coliseo después de las cuatro.', 'Pedirle a doña Rubiela que cambie de turno.', 'Seguir en el patio, con menos instrumentos.'], [
    ['Se separa lo que cada uno pide de lo que necesita: la banda, ensayar; doña Rubiela, dormir en la mañana.', { luz: [1, 3], n: { 0: 'ensayar', 1: 'dormir' } }],
    ['A solo le sirve a ella; C, solo al colegio.', { x: ['A', 'C'], n: { A: 'pierde la banda', C: 'pierde ella' } }],
    ['D sigue haciendo ruido a la misma hora.', { x: ['D'], n: { D: 'mismo ruido' } }],
    ['El texto trae la pieza que falta: un lugar sin ruido, a otra hora.', { luz: [5, 6, 'B'], n: { 2: 'la salida' } }],
  ], 'B. Una buena solución cuida lo que necesita cada parte, no solo lo que pide.'),

  // --------------------------------------------------------------------------------------- Fuentes
  'icf-sc-fuentes-1': H('Quién tomó la foto', 'Para usar la foto como prueba de cómo eran las escuelas del departamento en 1938, conviene', [
    ['Ficha: fotografía de 1938, tomada por el fotógrafo de la gobernación', 'para el informe anual de obras públicas (fuente imaginada).'],
    ['Se ve una escuela recién pintada,', 'treinta niños con uniforme', 'y al gobernador cortando una cinta.'],
    ['Pie de foto original: «Así educa el departamento a su niñez».']],
  ['creerle por completo, porque una foto muestra lo que hubo.', 'tener en cuenta que se hizo para mostrar los logros del gobierno.', 'descartarla, porque es muy vieja.', 'creerle, porque es un documento oficial.'], [
    ['Antes de mirar la imagen se mira la ficha: quién la hizo y para qué.', { luz: [0, 1], n: { 0: 'autor y propósito' } }],
    ['La hizo el propio gobierno, para un informe de obras: quería mostrar lo logrado.', { luz: [1] }],
    ['Lo que se ve encaja: escuela nueva, inauguración y un pie de foto que elogia.', { luz: [2, 4, 5], n: { 1: 'lo mejor', 2: 'elogio' } }],
    ['A y D olvidan el propósito: una foto se encuadra y se escoge. C bota una fuente útil solo por su edad.', { x: ['A', 'C', 'D'], n: { A: 'ingenua', C: 'exagera', D: 'ingenua' } }],
    ['B no la desecha: la lee sabiendo que pudo escoger la mejor escuela.', { luz: ['B'] }],
  ], 'B. El contexto no anula la fuente: dice cómo leerla.'),
  'icf-sc-fuentes-2': H('Lo que prueba una carta', '¿Qué permite afirmar la carta, por sí sola?', [
    ['Carta de un comerciante de un puerto sobre el río, 1880 (fuente imaginada):'],
    ['«Este año el río creció como nunca', 'y perdí toda la carga de tabaco.'],
    ['Todos en el puerto estamos arruinados.', 'El país entero se hunde».']],
  ['Que en 1880 el país vivió una crisis económica.', 'Que todos los comerciantes del puerto quebraron.', 'Que el autor perdió su carga y veía ruina a su alrededor.', 'Que el gobierno no ayudó a los comerciantes.'], [
    ['Una carta prueba bien lo que vivió y sintió quien la escribe.', { luz: [1, 2], n: { 1: 'lo vivido' } }],
    ['«Todos» y «el país entero» van más allá de lo que él pudo ver: son su impresión.', { luz: [3, 4], n: { 2: 'lo que cree' } }],
    ['A y B toman esa impresión como un hecho comprobado.', { x: ['A', 'B'], n: { A: 'generaliza', B: 'generaliza' } }],
    ['Del gobierno, la carta no dice nada.', { x: ['D'], n: { D: 'no está' } }],
    ['C se queda dentro de lo que la carta puede probar.', { luz: ['C'] }],
  ], 'C. Para lo demás harían falta otras fuentes: cifras, otros testimonios.'),
  'icf-sc-fuentes-3': H('Leer una caricatura', '¿Qué crítica hace la caricatura?', [
    ['Caricatura (descripción): un hombre de corbata riega con una manguera', 'un edificio enorme con el letrero «CIUDAD».'],
    ['La manguera sale de un tanque rotulado «CAMPO»,', 'que está casi vacío.'],
    ['Junto al tanque hay unas matas secas', 'y un campesino con un balde sin agua.']],
  ['Que en las ciudades se ahorra demasiada agua.', 'Que se favorece a la ciudad con lo que se le quita al campo.', 'Que los campesinos no saben regar sus cultivos.', 'Que los funcionarios trabajan poco.'], [
    ['En una caricatura cada objeto representa algo: aquí, el agua son los recursos.', {}],
    ['Quien riega lleva corbata: decide. Y lo que riega es la ciudad.', { luz: [0, 1], n: { 0: 'quién recibe' } }],
    ['El agua sale del campo, que queda vacío y seco.', { luz: [2, 3, 4, 5], n: { 1: 'de dónde sale', 2: 'quién paga' } }],
    ['A dice lo contrario: la ciudad recibe de más. C culpa al campesino, que no tiene agua. D no tiene que ver: el hombre sí trabaja.', { x: ['A', 'C', 'D'], n: { A: 'al revés', C: 'culpa a otro', D: 'otro tema' } }],
    ['Queda B: lo que gana uno lo pierde el otro.', { luz: ['B'] }],
  ], 'B. Se lee quién da, quién recibe y quién paga.'),

  // --------------------------------------------------------------------------------------- Pensamiento sistémico
  'icf-sc-sistemico-1': H('Efectos en cadena', '¿Cuál es una consecuencia indirecta de la carretera, que llega por una cadena de efectos?', [
    ['La gobernación pavimentó la carretera de una vereda de cuarenta familias.'],
    ['El viaje al pueblo pasó de tres horas a una.', 'Los campesinos empezaron a vender su cosecha en la ciudad, a mejor precio.'],
    ['Llegaron compradores de la ciudad buscando fincas de descanso', 'y el precio de la tierra subió.', 'Algunas familias vendieron sus fincas y se fueron.']],
  ['El viaje al pueblo se acortó a una hora.', 'La gobernación pagó la obra.', 'Algunas familias vendieron sus fincas.', 'La vereda tiene cuarenta familias.'], [
    ['Se arma la cadena: carretera, viaje corto, compradores nuevos, tierra más cara, ventas.', { luz: [0, 1, 3, 4, 5] }],
    ['A es el efecto directo: pasa apenas se pavimenta.', { luz: [1], x: ['A'], n: { 1: 'directa', A: 'directa' } }],
    ['B es quien hizo la obra, y D un dato del lugar: ninguno es consecuencia.', { x: ['B', 'D'], n: { B: 'actor', D: 'dato' } }],
    ['Las ventas llegan después de varios eslabones: compradores y precio de la tierra.', { luz: [5, 'C'], n: { 2: 'indirecta' } }],
  ], 'C. Una consecuencia indirecta necesita otros efectos en el medio.'),
  'icf-sc-sistemico-2': H('Dos argumentos que chocan', 'Entre lo que dicen el gobernador y la autoridad del resguardo chocan, sobre todo, las dimensiones', [
    ['Una empresa quiere instalar torres de energía eólica en un cerro de un resguardo indígena.'],
    ['El gobernador: «Traerán trabajo e impuestos para el departamento».'],
    ['Una autoridad del resguardo: «En ese cerro se hacen nuestras ceremonias:', 'es parte de lo que somos».'],
    ['Un biólogo advierte que las aspas podrían matar aves migratorias.']],
  ['económica y cultural.', 'ambiental y política.', 'económica y ambiental.', 'política y cultural.'], [
    ['La pregunta nombra a dos actores: el biólogo queda fuera, aunque hable.', { luz: [1, 2, 3] }],
    ['Trabajo e impuestos: dimensión económica.', { luz: [1], n: { 1: 'económica' } }],
    ['Ceremonias e identidad: dimensión cultural.', { luz: [2, 3], n: { 2: 'cultural' } }],
    ['Las aves son lo ambiental, pero las trae el biólogo. Y ninguno de los dos discute quién manda.', { luz: [4], x: ['B', 'C', 'D'], n: { 3: 'ambiental', B: 'no son esas', C: 'sin la cultural', D: 'sin la económica' } }],
    ['Queda A.', { luz: ['A'] }],
  ], 'A. La dimensión la da el argumento, no el cargo de quien habla.'),
  'icf-sc-sistemico-3': H('El riesgo se muda', '¿Qué efecto no buscado tuvo la medida?', [
    ['Para proteger a los peatones, una alcaldía puso reductores de velocidad en una avenida.'],
    ['En la avenida, los atropellos bajaron a la mitad.'],
    ['Pero muchos conductores, para no frenar, empezaron a pasar por las calles del barrio vecino,', 'más estrechas y sin andenes,', 'donde los niños juegan en la calle.']],
  ['Bajaron los atropellos en la avenida.', 'El tráfico y el riesgo se pasaron a las calles del barrio.', 'Los conductores dejaron de usar el carro.', 'La alcaldía quitó los reductores.'], [
    ['Primero, lo que la medida buscaba: proteger a los peatones de la avenida. Y lo logró.', { luz: [0, 1], n: { 0: 'objetivo', 1: 'logrado' } }],
    ['A es el efecto buscado, no el que nadie planeó.', { x: ['A'], n: { A: 'buscado' } }],
    ['Lo que nadie planeó: los carros se fueron a calles más peligrosas.', { luz: [2, 3, 4], n: { 2: 'no buscado' } }],
    ['C y D no están en el texto: siguen manejando, por otro lado.', { x: ['C', 'D'], n: { C: 'no está', D: 'no está' } }],
    ['B: el riesgo no desapareció, se mudó.', { luz: ['B'] }],
  ], 'B. Al evaluar una medida se mira también lo que pasa fuera de donde se aplicó.'),

  // --------------------------------------------------------------------------------------- Historia de Colombia
  'icf-sc-historia-1': H('Todavía con rey', 'Según el texto, ¿por qué no puede decirse que en 1810 la independencia ya estaba lograda?', [
    ['El 20 de julio de 1810, en Santafé, se formó una junta de gobierno.', 'Su acta todavía reconocía a Fernando VII como rey.'],
    ['Entre 1815 y 1816, tropas enviadas desde España al mando de Pablo Morillo', 'retomaron el control del territorio.'],
    ['La independencia se consolidó tras la batalla de Boyacá, el 7 de agosto de 1819.']],
  ['Porque la junta se formó en Cartagena y no en Santafé.', 'Porque la junta aún reconocía al rey y después España recuperó el control.', 'Porque la batalla de Boyacá fue antes de 1810.', 'Porque en 1810 no se formó ninguna junta.'], [
    ['Se pide una razón que esté en el texto, no la fecha que se celebra.', {}],
    ['Primera pista: en 1810 la junta seguía reconociendo al rey.', { luz: [1], n: { 0: 'aún con rey' } }],
    ['Segunda: entre 1815 y 1816, España recuperó el territorio.', { luz: [2, 3], n: { 1: 'Reconquista' } }],
    ['A y D contradicen el texto; C confunde el orden: Boyacá fue en 1819.', { luz: [4], x: ['A', 'C', 'D'], n: { A: 'otro lugar', C: 'otro orden', D: 'sí la hubo' } }],
    ['B junta las dos pistas.', { luz: ['B'] }],
  ], 'B. La independencia fue un proceso de años, no un solo día.'),
  'icf-sc-historia-2': H('A quién se le pagó', '¿Qué permite inferir la forma en que se hizo la abolición?', [
    ['La ley del 21 de mayo de 1851 declaró libres a todas las personas esclavizadas', 'a partir del 1 de enero de 1852.'],
    ['El Estado se comprometió a pagarles a los dueños el valor de las personas liberadas,', 'con bonos de deuda pública.'],
    ['A los libertos no se les dio tierra ni dinero.']],
  ['Que la ley trataba a los esclavizados como una propiedad cuya pérdida había que pagar.', 'Que los libertos recibieron lo necesario para empezar una vida nueva.', 'Que la esclavitud terminó antes de 1851.', 'Que los dueños se negaron a recibir dinero.'], [
    ['Inferir es sacar lo que no está escrito, pero apoyado en lo que sí.', {}],
    ['A quién se paga: a los dueños, por el «valor» de las personas.', { luz: [2, 3], n: { 1: 'pago a dueños' } }],
    ['A quién no: a los libertos, nada.', { luz: [4], n: { 2: 'nada a libertos' } }],
    ['B contradice el último párrafo; C, las fechas; de lo que pensaban los dueños el texto no dice nada.', { x: ['B', 'C', 'D'], n: { B: 'contradice', C: 'otra fecha', D: 'no está' } }],
    ['Si se paga por perder algo, ese algo se considera propiedad.', { luz: ['A'] }],
  ], 'A. La ley dio la libertad, pero con la lógica de la propiedad.'),
  'icf-sc-historia-3': H('Una papeleta de más', '¿Qué muestra el texto sobre el origen de la Constitución de 1991?', [
    ['En las elecciones de marzo de 1990, un movimiento de estudiantes', 'invitó a depositar una «séptima papeleta» que pedía una Asamblea Constituyente.'],
    ['Esa papeleta no se contó de forma oficial,', 'pero en mayo de ese año la pregunta sí entró en el conteo, y ganó el sí.'],
    ['La Asamblea, elegida en diciembre de 1990,', 'expidió la nueva Constitución el 4 de julio de 1991.']],
  ['Que la escribió el Congreso como una ley más.', 'Que nació de una iniciativa ciudadana que luego reconocieron las instituciones.', 'Que fue un pacto entre los dos partidos tradicionales.', 'Que se aprobó en el plebiscito de 1957.'], [
    ['Se sigue el orden: quién empezó, quién lo reconoció, quién la escribió.', {}],
    ['Empezaron unos estudiantes, por fuera de los canales oficiales.', { luz: [0, 1, 2], n: { 0: 'ciudadanos' } }],
    ['Luego vinieron la votación oficial y una Asamblea elegida.', { luz: [3, 4, 5], n: { 1: 'instituciones', 2: 'Asamblea' } }],
    ['A y C nombran actores que el texto no pone a decidir. D mezcla otra época: en 1957 se votó el Frente Nacional.', { x: ['A', 'C', 'D'], n: { A: 'otro actor', C: 'no está', D: 'otra época' } }],
    ['Queda B.', { luz: ['B'] }],
  ], 'B. Una idea nacida en la calle terminó en una Constitución.'),

  // --------------------------------------------------------------------------------------- Historia del mundo
  'icf-sc-mundo-1': H('Qué es tener constitución', 'Según el artículo 16, ¿cuál de estos países «carece de Constitución»?', [
    ['La Declaración de los Derechos del Hombre y del Ciudadano se aprobó en Francia en agosto de 1789,', 'semanas después de la toma de la Bastilla.'],
    ['Su artículo 16 dice:', '«Toda sociedad en la cual no esté establecida la garantía de los derechos,', 'ni determinada la separación de los poderes, carece de Constitución».']],
  ['Uno con un documento llamado Constitución, donde el rey hace las leyes, gobierna y nombra y destituye a los jueces.', 'Uno donde un congreso elegido hace las leyes y jueces independientes las aplican.', 'Uno sin constitución escrita, con parlamento y jueces independientes que protegen los derechos.', 'Uno donde un parlamento hace las leyes y los jueces protegen los derechos frente al gobierno.'], [
    ['El artículo pone dos condiciones: derechos garantizados y poderes separados.', { luz: [3, 4], n: { 1: 'dos condiciones' } }],
    ['Si falta una, «carece de Constitución», aunque tenga un papel con ese nombre.', { luz: [4] }],
    ['B, C y D cumplen: hay quien hace las leyes, quien juzga y jueces que protegen derechos.', { x: ['B', 'C', 'D'], n: { B: 'cumple', C: 'cumple sin papel', D: 'cumple' } }],
    ['En A, el rey hace las leyes, gobierna y controla a los jueces: no hay separación.', { luz: ['A'], n: { A: 'sin separación' } }],
  ], 'A. Para la Declaración, constitución es poder limitado, no un nombre.'),
  'icf-sc-mundo-2': H('Trece días', '¿Por qué la crisis de 1962 es un ejemplo de la lógica de la Guerra Fría?', [
    ['Durante la Guerra Fría, Estados Unidos y la Unión Soviética compitieron por el poder mundial', 'sin enfrentarse nunca en una guerra directa entre ellos.'],
    ['En octubre de 1962, Estados Unidos descubrió misiles soviéticos instalados en Cuba', 'y rodeó la isla con barcos de guerra.'],
    ['Tras trece días de tensión, la Unión Soviética retiró los misiles', 'y Estados Unidos se comprometió a no invadir Cuba.']],
  ['Porque las dos potencias se enfrentaron en una guerra directa.', 'Porque llegaron al borde de la guerra, pero negociaron para no chocar de frente.', 'Porque Cuba atacó a Estados Unidos.', 'Porque con ella terminó la Guerra Fría.'], [
    ['Primero, la regla del periodo: competir sin guerra directa.', { luz: [0, 1], n: { 0: 'la regla' } }],
    ['Luego, el caso: amenaza y presión militar.', { luz: [2, 3], n: { 1: 'amenaza' } }],
    ['Y el final: cada uno cede algo y no hay disparos entre ellos.', { luz: [4, 5], n: { 2: 'negocian' } }],
    ['A contradice la regla; C invierte quién presionaba; D es falso: la Guerra Fría siguió hasta 1991.', { x: ['A', 'C', 'D'], n: { A: 'contradice', C: 'al revés', D: 'siguió' } }],
    ['B une la regla con el caso.', { luz: ['B'] }],
  ], 'B. Un caso se explica con la regla de su época.'),
  'icf-sc-mundo-3': H('Ni con uno ni con otro', '¿Qué buscaban esos países, según el texto?', [
    ['En abril de 1955, representantes de 29 países de Asia y África,', 'muchos recién independizados, se reunieron en Bandung, Indonesia.'],
    ['Condenaron el colonialismo', 'y defendieron la idea de no tener que alinearse', 'ni con Estados Unidos ni con la Unión Soviética.'],
    ['Esa reunión fue un antecedente del Movimiento de Países No Alineados, fundado en 1961.']],
  ['Unirse al bloque que les diera más ayuda.', 'Decidir por sí mismos, sin depender de las viejas ni de las nuevas potencias.', 'Volver a ser colonias de Europa.', 'Formar un solo país entre Asia y África.'], [
    ['Hay dos rechazos en el texto: uno mira al pasado y otro al presente.', { luz: [1] }],
    ['Al pasado: el colonialismo del que muchos acababan de salir.', { luz: [2], n: { 0: 'recién libres' } }],
    ['Al presente: los dos bloques de la Guerra Fría.', { luz: [3, 4], n: { 1: 'dos rechazos' } }],
    ['A y C van contra lo que defendían; D no aparece.', { x: ['A', 'C', 'D'], n: { A: 'contradice', C: 'contradice', D: 'no está' } }],
    ['B reúne los dos rechazos: autonomía.', { luz: ['B'] }],
  ], 'B. La descolonización se cruzó con la Guerra Fría.'),

  // --------------------------------------------------------------------------------------- Geografía
  'icf-sc-geografia-1': H('Subir la cordillera', '¿Qué explica mejor que cambien los cultivos en tan poco trayecto?', [
    ['Un viajero sale de un pueblo a 400 metros sobre el nivel del mar, con 28 °C y cultivos de caña.'],
    ['Sube por la cordillera: a 1 600 metros encuentra cafetales y 20 °C.', 'A 2 900 metros, en un pueblo con 12 °C, se siembra papa.'],
    ['Todo el recorrido está en el mismo departamento', 'y dura menos de tres horas.']],
  ['La latitud: el viajero se aleja del ecuador.', 'La altitud: al subir baja la temperatura y cambia lo que se puede sembrar.', 'Las cuatro estaciones del año.', 'La cercanía al mar.'], [
    ['Lo que cambia en cada parada: la altura, la temperatura y el cultivo.', { luz: [0, 1, 2], n: { 0: '400 m', 1: '1 600 y 2 900 m' } }],
    ['A más altura, menos temperatura: son los pisos térmicos.', { luz: [1, 2] }],
    ['Tres horas en un departamento no cambian la latitud. Y en Colombia no hay cuatro estaciones.', { luz: [3, 4], x: ['A', 'C'], n: { 2: 'mismo lugar', A: 'casi igual', C: 'no hay' } }],
    ['Nada indica que el pueblo de abajo esté junto al mar.', { x: ['D'], n: { D: 'no está' } }],
    ['Queda B.', { luz: ['B'] }],
  ], 'B. En las montañas, la altura hace el papel que en otros países hacen las estaciones.'),
  'icf-sc-geografia-2': H('Peces para mañana', '¿Qué medida se ajusta mejor a la idea de desarrollo sostenible?', [
    ['Un pueblo vive de pescar en una ciénaga.', 'En diez años, la pesca cayó a la mitad.'],
    ['Los pescadores usan redes de malla muy fina,', 'que atrapan también los peces pequeños que aún no se han reproducido.'],
    ['El pescado es casi el único ingreso de las familias.']],
  ['Prohibir para siempre la pesca en la ciénaga.', 'Pescar más horas para compensar lo perdido.', 'Usar mallas más grandes y no pescar cuando los peces se reproducen.', 'Traer pescado de otra región y cerrar la ciénaga.'], [
    ['Sostenible: usar hoy sin quitarle a mañana, cuidando a la vez el recurso y el sustento.', {}],
    ['La causa del problema está en el texto: la malla fina se lleva a los que aún no se reproducen.', { luz: [2, 3], n: { 1: 'la causa' } }],
    ['A y D cuidan los peces, pero dejan sin ingreso a las familias.', { luz: [4], x: ['A', 'D'], n: { 2: 'el sustento', A: 'sin ingreso', D: 'sin ingreso' } }],
    ['B acelera el problema.', { x: ['B'], n: { B: 'empeora' } }],
    ['C ataca la causa y deja seguir pescando.', { luz: ['C'] }],
  ], 'C. Lo sostenible atiende a la vez el recurso y a la gente que vive de él.'),

  // --------------------------------------------------------------------------------------- Economía
  'icf-sc-economia-1': H('Un impuesto que recauda poco', '¿Por qué el gobierno puede llamar éxito a un impuesto que recaudó poco?', [
    ['Un país puso un impuesto pequeño a cada bolsa plástica que entregan los supermercados.'],
    ['En los meses siguientes, las tiendas entregaron muchas menos bolsas', 'y se vendieron más bolsas de tela.'],
    ['El recaudo fue bajo,', 'pero el gobierno lo presentó como un éxito.']],
  ['Porque su fin principal era reducir el uso de bolsas, no recaudar.', 'Porque las bolsas de tela pagan más impuesto.', 'Porque recaudar poco siempre es bueno para un país.', 'Porque los supermercados pagaron el impuesto de su bolsillo.'], [
    ['Un impuesto sube el precio de algo, y con un precio más alto se compra menos.', { luz: [0] }],
    ['Eso pasó: menos bolsas plásticas, más de tela.', { luz: [1, 2], n: { 1: 'cambió la conducta' } }],
    ['Si casi nadie compra la bolsa, casi nadie paga el impuesto: por eso el recaudo es bajo.', { luz: [3], n: { 2: 'recaudo bajo' } }],
    ['B y D no salen del texto; C convierte un caso en una regla para todo.', { x: ['B', 'C', 'D'], n: { B: 'no está', C: 'exagera', D: 'no está' } }],
    ['A: el recaudo bajo es la señal de que se logró el fin.', { luz: ['A'] }],
  ], 'A. Algunos impuestos buscan cambiar conductas más que recaudar.'),
  'icf-sc-economia-2': H('Dos maneras de medir la pobreza', '¿Qué conclusión se apoya en el texto?', [
    ['La familia Rojas gana un poco más de lo que cuesta la canasta básica.', 'Pero su casa no tiene agua potable', 'y los dos hijos dejaron el colegio para trabajar.'],
    ['La familia Pérez gana un poco menos que esa canasta.', 'Tiene agua, los hijos estudian', 'y todos están afiliados a salud.']],
  ['Los Rojas no son pobres por ninguna medida.', 'Por ingreso solo los Pérez son pobres, pero los Rojas tienen carencias graves en sus condiciones de vida.', 'Las dos medidas de pobreza siempre coinciden.', 'Los Pérez son ricos porque tienen salud.'], [
    ['Hay dos reglas: comparar el ingreso con la canasta, o mirar las condiciones de vida.', {}],
    ['Por ingreso: los Rojas pasan la línea; los Pérez quedan debajo.', { luz: [0, 3], n: { 0: 'arriba', 1: 'debajo' } }],
    ['Por condiciones: los Rojas no tienen agua y sus hijos no estudian; los Pérez sí tienen todo eso.', { luz: [1, 2, 4, 5] }],
    ['A olvida la segunda medida; C, el caso la desmiente; D confunde condiciones con riqueza.', { x: ['A', 'C', 'D'], n: { A: 'una medida', C: 'contradice', D: 'confunde' } }],
    ['B usa las dos medidas y dice dónde no coinciden.', { luz: ['B'] }],
  ], 'B. Cada medida ilumina una parte: se necesitan las dos.'),
  'icf-sc-economia-3': H('Una cadena de cadenas', '¿Qué rasgo de la globalización muestra el caso?', [
    ['Una ensambladora de bicicletas de Medellín usa marcos hechos en el país,', 'frenos de Japón y cadenas de Taiwán.'],
    ['Cuando un puerto de Asia cerró tres semanas por una tormenta,', 'la planta se quedó sin cadenas y paró.'],
    ['Veinte empleados salieron a vacaciones forzadas', 'y las tiendas de la ciudad se quedaron sin bicicletas.']],
  ['Que cada país produce todo lo que necesita.', 'Que un hecho lejano puede frenar la producción y el empleo locales.', 'Que el comercio internacional solo afecta a las grandes empresas.', 'Que las tormentas son más fuertes en Asia.'], [
    ['Las piezas vienen de tres países: la producción está repartida por el mundo.', { luz: [0, 1], n: { 0: 'piezas de afuera' } }],
    ['Un cierre lejano detiene una planta local.', { luz: [2, 3], n: { 1: 'efecto lejano' } }],
    ['Y el golpe llega hasta los empleados y las tiendas.', { luz: [4, 5], n: { 2: 'efecto local' } }],
    ['A es lo contrario; C olvida a empleados y tiendas; D no es de lo que trata el caso.', { x: ['A', 'C', 'D'], n: { A: 'al revés', C: 'contradice', D: 'otro tema' } }],
    ['B: la interdependencia.', { luz: ['B'] }],
  ], 'B. En un mundo conectado, lo de lejos también es local.'),

  // --------------------------------------------------------------------------------------- Modelos y conceptos
  'icf-sc-modelos-1': H('Entender no es aprobarlo todo', '¿Qué error señala la profesora en el razonamiento de Tomás?', [
    ['En clase se habla de una comunidad imaginaria donde las niñas no pueden ir a la escuela.'],
    ['Tomás opina: «Es su cultura.', 'Juzgarla desde aquí sería etnocentrismo».'],
    ['La profesora responde: «Entender por qué lo hacen es necesario.', 'Pero que algo sea costumbre no lo vuelve aceptable', 'cuando niega un derecho humano, como la educación».']],
  ['Confundir entender una cultura con aprobar todo lo que hace.', 'Creer que su propia cultura es superior.', 'Decir que las niñas no deben estudiar.', 'Negar que esa comunidad tenga cultura.'], [
    ['Tomás usa bien una idea: no juzgar con la medida propia.', { luz: [1, 2], n: { 1: 'relativismo' } }],
    ['La profesora acepta esa parte: entender es necesario.', { luz: [3] }],
    ['Y pone el límite: un derecho humano no se negocia por costumbre.', { luz: [4, 5], n: { 2: 'el límite' } }],
    ['B describe el etnocentrismo, que Tomás no tiene. C y D le atribuyen ideas que no dijo.', { x: ['B', 'C', 'D'], n: { B: 'lo contrario', C: 'no lo dijo', D: 'no lo dijo' } }],
    ['A: su error es pasar de «entender» a «aceptarlo todo».', { luz: ['A'] }],
  ], 'A. El relativismo cultural tiene como límite los derechos humanos.'),
  'icf-sc-modelos-2': H('Quién es dueño y quién paga', '¿Qué lógica sigue la propuesta 2?', [
    ['Los estudiantes de una isla cruzan cada día en lancha hasta el colegio.'],
    ['Propuesta 1: que cada familia pague el pasaje', 'al lanchero que cobre menos.'],
    ['Propuesta 2: el lanchero sigue siendo dueño de su lancha,', 'pero la alcaldía paga con impuestos el pasaje de todos los estudiantes,', 'porque estudiar es un derecho.']],
  ['Liberal: mercado y Estado pequeño.', 'Del bienestar: mercado, impuestos y derechos para todos.', 'Socialista: la lancha pasa a ser de todos.', 'Comunitaria: la comunidad decide en asamblea.'], [
    ['Se usan las preguntas del modelo: quién es dueño y quién paga.', {}],
    ['Dueño: sigue siendo un particular. No es socialista.', { luz: [3], x: ['C'], n: { 2: 'dueño privado', C: 'sin dueño común' } }],
    ['Paga la alcaldía, con impuestos, para garantizar un derecho. Lo liberal es la propuesta 1.', { luz: [4, 5, 1, 2], x: ['A'], n: { 1: 'liberal', A: 'es la 1' } }],
    ['Nadie habla de asambleas.', { x: ['D'], n: { D: 'no está' } }],
    ['Mercado más impuestos al servicio de un derecho: bienestar.', { luz: ['B'] }],
  ], 'B. Dueño privado y pasaje pagado con impuestos: la mezcla del bienestar.'),
});
