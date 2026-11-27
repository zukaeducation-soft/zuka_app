// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/courses/preicfes-lc-comparar.js
// Preicfes · Lectura Crítica · mundo 8 «Comparar Textos» (spec 2026-11-25-preicfes-estructura). Parejas de textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const SILENCIO = {
    id: 'icf-dos-siestas', title: 'Dos maneras de mirar la siesta',
    ficha: { autor: 'Texto 1: Dra. Marta Ríos. Texto 2: Julián Pardo', fuente: 'Revista de salud y columna de humor', fecha: 'Marzo de 2026' },
    paras: [
      'TEXTO 1: «La siesta corta: qué se sabe». Dormir entre diez y veinte minutos después del almuerzo mejora, en promedio, la atención y el ánimo durante las dos o tres horas siguientes. Así lo muestran varios estudios con trabajadores por turnos, conductores y estudiantes, en los que se comparó a quienes dormían con quienes solo descansaban sentados.',
      'TEXTO 1: No toda siesta ayuda. Las de más de cuarenta minutos suelen dejar una sensación de aturdimiento, porque la persona despierta en medio del sueño profundo. Además, quien duerme mal en la noche puede empeorar si lo compensa de día. La siesta no reemplaza las horas nocturnas: las acompaña.',
      'TEXTO 1: Por eso, algunas empresas han habilitado cuartos en penumbra para un descanso breve. Los resultados son alentadores, pero todavía no hay datos suficientes para saber si el efecto se mantiene a lo largo de los años.',
      'TEXTO 2: «Elogio del señor que ronca». Mi tío Abelardo duerme la siesta desde antes de que la ciencia le diera permiso. Se sienta en la mecedora, se pone el sombrero en la cara y anuncia: «Vuelvo en un rato». No dice cuánto. Un rato, en mi tío, es una unidad de medida que va de quince minutos a la hora de la comida.',
      'TEXTO 2: Ahora resulta que una oficina del centro tiene un cuarto para dormir. Me parece maravilloso y un poco triste. Maravilloso, porque por fin alguien entendió lo que mi tío sabe. Triste, porque lo hicieron para que la gente rinda más. Mi tío no duerme para rendir. Duerme, dice, «para que el día no se le vaya todo seguido».',
      'TEXTO 2: Temo el día en que le pongan un cronómetro a la mecedora. A los veinte minutos sonará una campana, y mi tío, productivo y despeinado, tendrá que explicarle a un gráfico por qué quiere cinco más. Que sigan estudiando la siesta los que saben. Yo solo pido que, entre tanto dato, dejen una libre, de esas que no sirven para nada.',
    ],
  };
  const l1 = leccion('icf-lc-comparar-1', 'Dos textos, un tema', guion(
    ['¿Qué comparten?', 'El tema, un dato o una preocupación.'],
    ['¿En qué se diferencian?', 'El propósito, el tono, el tipo de texto y las pruebas que usan.'],
    ['Cómo se relacionan', 'Uno puede ampliar, ejemplificar, matizar o discutir al otro.'],
    ['Responder por los dos', 'Una afirmación sobre ambos debe valer en los dos.']), [
    x('pinta-tipos', 'Pinta cada afirmación con el texto al que corresponde.', { doc: SILENCIO, plumas: ['texto 1', 'texto 2', 'los dos'],
      ...P(['Da resultados de estudios.', 0, '¿Cuál cita comparaciones?'], ['Usa el humor y la exageración.', 1, '¿Cuál habla de un cronómetro en la mecedora?'], ['Menciona cuartos para dormir en el trabajo.', 2, '¿Aparece en uno o en ambos?'], ['Advierte que las siestas largas aturden.', 0, '¿Cuál habla del sueño profundo?'], ['Valora descansar sin un fin.', 1, '¿Cuál pide una siesta que no sirva para nada?']), bien: 'Uno, otro o ambos.' },
      'Estudios y aturdimiento son del 1; humor y descanso libre, del 2; los cuartos aparecen en los dos.', 'Busca si la idea aparece en los párrafos 1 a 3, en los 4 a 6 o en ambos.'),
    x('voz-de-la-fuente', 'Ata cada rasgo a su texto.', { ayuda: 'Tira un hilo desde cada rasgo hasta su texto.', doc: SILENCIO, portadas: [['Texto 1', 'revista de salud'], ['Texto 2', 'columna de humor']],
      ...T(['informar con cautela', 0, '¿Cuál dice que aún faltan datos?'], ['defender una costumbre con gracia', 1, '¿Cuál habla de un tío?']), bien: 'Informar y defender.' },
      'El primero informa y reconoce límites; el segundo defiende con humor.', 'Pregunta qué quiere lograr cada autor en su lector.'),
    x('genero-o-cita', '¿Los dos textos **coinciden** o **difieren** en esto?', { doc: SILENCIO, rot: ['coinciden', 'difieren'],
      ...F(['La siesta puede hacer bien', 0, '¿Alguno lo niega?'], ['Para qué sirve dormir de día', 1, '¿Uno habla de rendir y otro no?'], ['Hay oficinas con cuarto para dormir', 0, '¿Está en los dos?'], ['Cuánto debe durar', 1, '¿A los dos les importa medirla?']), bien: 'El hecho los une; el sentido los separa.' },
      'Los dos ven algo bueno y mencionan los cuartos; difieren en el fin y en medir el tiempo.', 'Busca el mismo punto en cada texto y compara.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: SILENCIO,
      ...F(['¿Por qué aturden las siestas largas?', 1, 'Busca el párrafo que dice que no toda siesta ayuda.'], ['¿Qué no se sabe todavía?', 2, 'Busca el párrafo que habla de resultados alentadores.'], ['¿Qué le entristece al columnista?', 4, 'Busca el párrafo que dice «un poco triste».']),
      luz: [[2, 'sueño profundo'], [3, 'todavía no hay datos'], [5, 'Triste, porque']], bien: 'Cada pregunta, su párrafo.' },
      'El aturdimiento está en el 2, lo que falta en el 3 y la tristeza en el 5.', 'Primero decide en cuál de los dos textos estaría.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SILENCIO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Faltan datos sobre el efecto a largo plazo.', 0, 'Búscala en el párrafo 3.'], ['Al columnista le incomoda que todo deba ser útil.', 1, '¿Por qué le parece triste el cuarto?'], ['Los dos autores saben de los cuartos para dormir.', 1, 'Compara los dos párrafos.'], ['El tío Abelardo trabaja en esa oficina.', 2, '¿Se dice dónde trabaja?']),
      luz: [[3, 'todavía no hay datos suficientes'], [5, 'para que la gente rinda más'], [5, 'un cuarto para dormir']], bien: 'Comparar también es deducir.' },
      'Los datos que faltan están escritos; la incomodidad y que ambos los conocen se deducen; el trabajo del tío no.', 'Une una frase de cada texto y compara lo que valoran.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que los textos.', { doc: SILENCIO, filas: [{ antes: 'Según el texto 1, la siesta', topes: ['reemplaza la noche', 'daña siempre', 'acompaña la noche'], va: 2 }, { antes: 'El texto 2 critica', topes: ['la siesta', 'medir la siesta para rendir', 'a los médicos'], va: 1 }, { antes: 'Los efectos a largo plazo', topes: ['no se conocen aún', 'son malos', 'son excelentes'], va: 0 }], mira: ['Relee el final del párrafo 2.', 'Relee los párrafos 5 y 6.', 'Relee el final del párrafo 3.'], luz: [[2, 'las acompaña'], [6, 'un cronómetro'], [3, 'todavía no hay datos']], bien: 'Acompaña, medir y no se sabe.' },
      'La siesta acompaña, el columnista critica medirla y el largo plazo no se conoce.', 'Busca la frase exacta en el texto que corresponde.'),
    x('bisagras', 'Une una idea del texto 1 con una del 2. Sobran dos palabras.', { doc: SILENCIO, pares: [['El texto 1 mide minutos;', 'el texto 2 se burla de medirlos.'], ['Los dos hablan de cuartos para dormir:', 'comparten un ejemplo.'], ['El texto 2 cuenta lo de su tío', 'quiere mostrar otra manera de descansar.']],
      ...F(['en cambio,', 0, 'Contrasta: ¿dónde hacen cosas opuestas?'], ['es decir,', 1, 'Aclara: ¿dónde lo segundo dice lo mismo con otras palabras?'], ['porque', 2, 'Da la razón: ¿dónde lo segundo explica lo primero?'], ['aunque', null, 'Opondría las dos partes sin necesidad.'], ['por ejemplo,', null, 'Anunciaría un caso: ninguna segunda parte lo es.']), bien: 'Contraste, aclaración y razón.' },
      'Medir y burlarse contrastan, compartir un ejemplo aclara y la intención explica lo del tío.', 'Di qué hace la segunda idea con la primera.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran al comparar los textos.', { doc: SILENCIO, lineas: ['Los dos hablan de la siesta y la valoran.', 'El tío usa sombrero.', 'Uno informa con estudios y reconoce límites.', 'El otro defiende con humor descansar sin un fin.', 'Hay conductores en los estudios.', 'Difieren en para qué sirve descansar.'], ...S([1, 4], { 0: 'Es lo que comparten.', 2: 'Es el primer texto.', 3: 'Es el segundo texto.', 5: 'Es la diferencia de fondo.' }), bien: 'Lo común, cada uno y la diferencia.' },
      'El sombrero y los conductores son detalles; lo demás compara.', 'Deja lo que sirve para comparar, no para recordar.'),
  ]);

  const ARBOLES = {
    id: 'icf-arboles-calle', title: 'Los almendros de la avenida',
    ficha: { autor: 'Texto 1: Germán Solano, ingeniero. Texto 2: Lucía Becerra, vecina', fuente: 'Cartas a un concejo municipal', fecha: 'Abril de 2026' },
    paras: [
      'TEXTO 1: Señores concejales: la avenida Los Almendros mueve treinta mil vehículos al día y fue diseñada para doce mil. En las horas pico, un recorrido de tres kilómetros tarda cuarenta minutos, y las ambulancias del hospital San José pierden en ella, según sus propios registros, un cuarto de hora por viaje. Propongo ampliarla a seis carriles. Para hacerlo hay que retirar ciento ocho árboles.',
      'TEXTO 1: No lo propongo con gusto. Pero un trancón también contamina: un motor detenido gasta y no avanza. Según nuestro modelo, la ampliación reduciría el tiempo de viaje a la mitad durante los primeros seis años. Sembraríamos trescientos árboles en el parque del sur, casi tres por cada uno que se quite.',
      'TEXTO 1: Entiendo el cariño por los almendros. Sin embargo, una ciudad no puede quedarse quieta para no incomodar a la memoria. Los que hoy protestan son los mismos que mañana pitarán en el semáforo, y entonces nadie se acordará de las hojas.',
      'TEXTO 2: Señores concejales: en la avenida hay ciento ocho almendros y yo he barrido las hojas de once durante treinta años. No les escribo por nostalgia. A las dos de la tarde, bajo su sombra, el termómetro marca ocho grados menos que en la esquina sin árboles. Por ahí caminan cada día mil setecientos niños hacia tres colegios.',
      'TEXTO 2: El ingeniero dice que sembrará trescientos en el sur. Los niños no caminan por el sur. Un árbol recién sembrado tarda quince años en dar la sombra que hoy tenemos. Y él mismo reconoce que el alivio del tráfico dura seis. Es decir: cuando los arbolitos den sombra, la avenida llevará nueve años trancada otra vez.',
      'TEXTO 2: Tampoco quiero que todo quede igual. Propongo un carril solo para buses en cada sentido, que no exige talar, y entradas escalonadas en los tres colegios. No sé si bastará. Sé que se puede probar por seis meses con pintura, y que la pintura, a diferencia de los almendros, se puede borrar si nos equivocamos.',
    ],
  };
  const l2 = leccion('icf-lc-comparar-2', 'Posturas que se cruzan', guion(
    ['La tesis de cada uno', 'Di en una frase qué propone cada texto.'],
    ['Cómo responde', 'Un texto puede refutar, conceder, matizar o usar un dato del otro.'],
    ['Qué pruebas usa', 'Cifras, experiencia, autoridad, ejemplos.'],
    ['Qué no responde', 'A veces lo más revelador es el argumento que nadie contestó.']), [
    x('pinta-voces', 'Pinta cada idea con su autor.', { doc: ARBOLES, plumas: ['Solano', 'Becerra'],
      ...P(['Ampliar a seis carriles.', 0, '¿Quién propone talar?'], ['Probar un carril de buses con pintura.', 1, '¿Quién propone algo que se pueda borrar?'], ['Un motor detenido también contamina.', 0, '¿Quién habla del trancón como contaminación?'], ['Los niños no caminan por el sur.', 1, '¿Quién responde a la siembra?'], ['El tiempo de viaje bajaría a la mitad.', 0, '¿Quién lo calculó con su modelo?']), bien: 'Dos cartas, dos propuestas.' },
      'Solano amplía, calcula y habla del motor; Becerra prueba con pintura y responde sobre los niños.', 'Busca primero en qué carta aparece cada idea.'),
    x('pista-tipo', 'Ata cada movimiento a la frase que lo hace.', { doc: ARBOLES, lineas: ['«No lo propongo con gusto».', '«son los mismos que mañana pitarán en el semáforo».', '«Los niños no caminan por el sur».', '«Tampoco quiero que todo quede igual».'],
      ...T(['admite un costo', 0, '¿Cuál reconoce algo malo de su idea?'], ['ataca a quien se opone', 1, '¿Cuál habla de las personas y no de los árboles?'], ['refuta la compensación', 2, '¿Cuál responde a los trescientos árboles?'], ['acepta que hay un problema', 3, '¿Cuál concede que el tráfico importa?']), bien: 'Admitir, atacar, refutar y conceder.' },
      'Solano admite un costo y ataca; Becerra refuta la siembra y concede que hay un problema.', 'Pregunta qué hace cada frase con la posición del otro.'),
    x('genero-o-cita', '¿Es una respuesta **a la idea** o un ataque **a la persona**?', { doc: ARBOLES, rot: ['a la idea', 'a la persona'],
      ...F(['Un árbol nuevo tarda quince años en dar sombra', 0, '¿Habla del plan o de alguien?'], ['Los que protestan son los que pitarán', 1, '¿Habla del plan o de alguien?'], ['El alivio dura solo seis años', 0, '¿Habla del plan o de alguien?'], ['Los niños no caminan por el sur', 0, '¿Habla del plan o de alguien?']), bien: 'Solo una ataca.' },
      'Los años y la sombra discuten el plan; pitar en el semáforo ataca a quienes se oponen.', 'Mira si la frase habla de los árboles y el tráfico o de la gente.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ARBOLES, nums: [2, 4, 6], pregunta: 'Queda en pie', queda: 'Los dos reconocen que hay un problema de tráfico.',
      ...T(['Solano quiere talar con gusto.', 0, 'Busca cómo lo propone.'], ['Becerra escribe solo por nostalgia.', 5, 'Busca por qué dice que no escribe.'], ['Becerra quiere que todo siga igual.', 8, 'Busca qué tampoco quiere.']), bien: 'No, no y tampoco.' },
      'Solano no lo propone con gusto, Becerra no escribe por nostalgia y tampoco quiere dejar todo igual.', 'Saca la palabra clave: gusto, nostalgia, igual.'),
    x('balanza-tesis', 'Propuesta de Solano: «ampliar la avenida». ¿Qué hace cada dato?', { doc: ARBOLES, tesis: 'Conviene ampliar la avenida',
      ...F(['Reduce a la mitad el tiempo de viaje.', 0, '¿Es una razón a favor?'], ['El alivio dura seis años.', 1, '¿Qué pasa después?'], ['En otra ciudad, al ampliar llegaron más carros y el trancón volvió antes.', 1, '¿Qué sugiere ese caso?'], ['La avenida mide tres kilómetros.', 2, '¿Es una razón a favor o en contra?']), bien: 'A favor, en contra y nada.' },
      'La mitad del tiempo la apoya; que dure poco y que lleguen más carros la debilita; el largo no pesa.', 'Supón cierto cada dato y mira si la propuesta gana o pierde.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración en que Becerra **usa un dato de Solano contra él**.', { doc: ARBOLES, nums: [5], apuesta: 'Usa los seis años del otro.', ...S(['5.3'], { '5.0': 'Recoge lo que él propone, sin responder aún.', '5.1': 'Responde, pero con un dato suyo.', '5.2': 'Da un dato propio sobre los árboles.', '5.4': 'Saca la conclusión de los dos datos.' }), bien: '«Él mismo reconoce».' },
      '«Y él mismo reconoce que el alivio del tráfico dura seis» toma el dato del otro texto.', 'Busca la oración que nombra lo que el otro admite.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ARBOLES, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Bajo los árboles hay ocho grados menos.', 0, 'Léela junto al termómetro.'], ['Los almendros protegen a los niños del calor.', 1, '¿Quiénes caminan por esa sombra?'], ['Becerra valora las soluciones que se pueden revertir.', 1, '¿Por qué prefiere la pintura?'], ['Becerra es profesora.', 2, '¿Se dice en qué trabaja?']),
      luz: [[4, 'ocho grados menos'], [4, 'mil setecientos niños'], [6, 'se puede borrar']], bien: 'Preferir la pintura muestra un valor.' },
      'Los grados están escritos; la protección y el valor de revertir se deducen; el oficio no.', 'Une el dato con quien se beneficia o con lo que prefiere.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran al comparar las posturas.', { doc: ARBOLES, lineas: ['Solano propone ampliar y compensar en otro lugar.', 'La avenida se llama como los árboles.', 'Becerra muestra que el alivio acaba antes de que llegue la nueva sombra.', 'Ella propone una prueba que se pueda deshacer.', 'Ella barre hojas.', 'Los dos reconocen el problema del tráfico.'], ...S([1, 4], { 0: 'Es la primera postura.', 2: 'Es su mejor argumento.', 3: 'Es la segunda postura.', 5: 'Es lo que comparten.' }), bien: 'Dos posturas, un argumento y lo común.' },
      'El nombre y las hojas son detalles; lo demás compara las posturas.', 'Deja lo que necesitas para decidir entre las dos.'),
  ]);

  const FOTOS = {
    id: 'icf-dos-fotos', title: 'Dos textos sobre las fotos',
    paras: [
      'TEXTO 1: «Treinta mil». Mi teléfono dice que tengo treinta mil fotos. Las revisé anoche y descubrí que no recuerdo casi ninguna. Hay once de un mismo plato de sopa. Hay un atardecer repetido cuarenta veces, como si el sol hubiera tenido tos. De mi abuela, que murió antes de los teléfonos, tengo tres: en las tres la miro y la oigo.',
      'TEXTO 1: No creo que la culpa sea de la máquina. La culpa es de la facilidad. Cuando cada foto costaba, uno miraba antes de disparar. Ahora disparamos para no tener que mirar: ya lo veremos después. Y después nunca llega, porque después está lleno de fotos nuevas.',
      'TEXTO 1: Esta semana borré veintinueve mil novecientas. No fue valentía, fue curiosidad. Quería saber cuáles me dolía perder. Fueron setenta y dos. Las imprimí. Ocupan menos que un libro y por primera vez en años sé dónde están.',
      'TEXTO 2: «Guardar por si acaso». Un grupo de investigadores pidió a cien personas que recorrieran un museo. Unas fotografiaron los objetos; otras solo los miraron. Al día siguiente, quienes habían tomado fotos recordaban menos detalles de lo fotografiado. Pero cuando se les pidió acercar la cámara a una parte del objeto, recordaban tan bien como los demás. No era la cámara lo que hacía olvidar: era usarla sin atención.',
      'TEXTO 2: El estudio tiene límites. Se hizo con estudiantes, en un solo museo, y midió el recuerdo a las veinticuatro horas. No sabemos qué pasa a los diez años, cuando la memoria se gasta y una foto cualquiera, hasta la de un plato de sopa, puede devolvernos una tarde entera.',
      'TEXTO 2: Quizá por eso conviene no elegir entre mirar y fotografiar. Conviene hacer las dos cosas en orden: primero lo uno, después lo otro. Y tener cuidado antes de borrar. La memoria no avisa qué va a necesitar.',
    ],
  };
  const Q = preg(FOTOS, 'lectura');
  return mundo('icf-lc-comparar', 'Comparar Textos', 'lectura', [l1, l2], [
    ['icf-lc-comparar-1', 'Los dos textos comparten una idea de fondo.', Q('Los dos textos coinciden en que:', ['Las cámaras deben prohibirse', 'El problema no es la máquina, sino usarla sin atención', 'Hay que borrar casi todas las fotos', 'Los museos son aburridos'], 1, 'El 1 dice «la culpa es de la facilidad», no de la máquina; el 2, que no era la cámara sino usarla sin atención.', 'Busca qué dice cada uno sobre la culpa de la máquina.')],
    ['icf-lc-comparar-1', 'Mira con qué sostiene cada uno su idea.', Q('La diferencia entre las pruebas que usan los textos es que:', ['El 1 usa un estudio y el 2, una anécdota', 'Los dos usan solo anécdotas', 'El 1 usa su experiencia y el 2, un estudio con sus límites', 'Ninguno da pruebas'], 2, 'El 1 cuenta lo que hizo con sus fotos; el 2 describe una investigación.', 'Pregunta de dónde saca cada uno lo que afirma.')],
    ['icf-lc-comparar-1', 'El propósito distingue a dos textos del mismo tema.', Q('El tono del texto 1, comparado con el del 2, es más:', ['Técnico', 'Autoritario', 'Indiferente', 'Personal y humorístico'], 3, 'Habla de sí mismo y bromea: «como si el sol hubiera tenido tos».', 'Compara cómo habla cada uno de las fotos repetidas o del estudio.')],
    ['icf-lc-comparar-2', 'Un texto puede advertir sobre lo que propone el otro.', Q('La frase «tener cuidado antes de borrar» del texto 2 puede leerse como:', ['Un matiz a lo que hizo el autor del texto 1', 'Una repetición del texto 1', 'Una burla del museo', 'Una orden de no fotografiar'], 0, 'El autor del 1 borró casi todo; el 2 advierte que la memoria no avisa qué va a necesitar.', 'Recuerda qué hizo el autor del texto 1 con sus fotos.')],
    ['icf-lc-comparar-2', 'Busca el mejor argumento de un texto contra el otro.', Q('El autor del texto 2 podría objetarle al del 1 que:', ['Debió tomar más fotos de la sopa', 'Setenta y dos fotos son muchas', 'Una foto que hoy parece inútil puede servir para recordar años después', 'Su abuela no existió'], 2, 'El 2 dice que hasta la de un plato de sopa puede devolver una tarde.', 'Busca en el texto 2 la mención a la sopa.')],
    ['icf-lc-comparar-2', 'Una conclusión sobre los dos debe valer en los dos.', Q('¿Cuál conclusión respeta **ambos** textos?', ['Es mejor no tomar fotos', 'Conviene mirar con atención antes de fotografiar', 'Hay que guardar todo', 'La memoria no falla'], 1, 'El 1 extraña mirar antes de disparar; el 2 propone primero mirar y después fotografiar.', 'Descarta la que contradiga a alguno.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-constitucion.js
// Preicfes · Sociales y Ciudadanas · mundo 1 «Constitución y Estado» (spec 2026-11-20-curso-preicfes): lo que más pregunta la
// prueba de ciudadanía: el Estado social de derecho, las ramas del poder y los órganos de control, y los mecanismos para proteger
// los derechos. Cada lección es un caso original en 7 juegos LEC distintos y un juego en movimiento; la evaluación, otro caso con
// preguntas A–D. Casos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg } = ICF;

  const PUENTE = {
    id: 'icf-puente', title: 'El puente que pidió la vereda',
    ficha: { autor: 'Profesora de ciencias sociales', fuente: 'Guía de ciudadanía para grado once', fecha: 'Abril de 2026' },
    paras: [
      'Cada vez que llueve, los niños de la vereda La Esperanza dejan de ir a la escuela. Para llegar tienen que cruzar una quebrada que en invierno crece tanto que arrastra piedras y troncos. Los padres llevan años pidiendo un puente. Seguir su solicitud paso a paso es una buena manera de entender cómo funciona el Estado colombiano.',
      'La Constitución de 1991 dice en su primer artículo que Colombia es un Estado social de derecho. «De derecho» significa que todas las autoridades, desde el presidente hasta el alcalde, deben actuar según las leyes y no según su voluntad. «Social» significa que el Estado no solo pone reglas: también tiene el deber de garantizar condiciones de vida dignas, como la educación de esos niños.',
      'Para que nadie concentre todo el poder, este se divide en tres ramas. La legislativa hace las leyes: es el Congreso, formado por el Senado y la Cámara. La ejecutiva gobierna y ejecuta: el presidente a nivel nacional, los gobernadores en los departamentos y los alcaldes en los municipios. La judicial resuelve los conflictos y protege los derechos por medio de los jueces y las altas cortes. En el municipio, las normas locales y el presupuesto los aprueba el concejo, una corporación administrativa elegida por voto popular: no es parte del Congreso, pero cumple allí la tarea de decidir las normas.',
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
    sc(7, 'Ejemplo en un municipio: el concejo (una corporación administrativa, no parte del Congreso) aprueba la norma que prohíbe parquear en el andén, la alcaldía pone las señales y multa, y un juez decide si una multa fue injusta.', { title: 'Concejo, alcaldía y juez' }),
    sc(6, 'Los **órganos de control** vigilan: la Contraloría cuida el dinero público, la Procuraduría a los funcionarios y la Defensoría los derechos humanos.', { title: 'Quién vigila' }),
  ], [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: PUENTE,
      ...F(['¿Qué quiere decir «social» en Estado social?', 1, 'Busca el comienzo que nombra la Constitución.'], ['¿Para qué se divide el poder?', 2, 'Busca el comienzo que habla de no concentrarlo.'], ['¿Quién vigila el dinero público?', 4, 'Busca el comienzo que va más allá de las tres ramas.']),
      luz: [[2, '«Social» significa'], [3, 'Para que nadie concentre todo el poder'], [5, 'La Contraloría revisa']], bien: 'Los comienzos ya decían de qué iba cada uno.' },
      'El segundo párrafo abre con el primer artículo, el tercero con la división del poder y el quinto con los órganos de control.', 'Busca en los comienzos la palabra que promete responder cada pregunta.'),
    x('pasos-del-proceso', 'Ordena el camino del puente. El primer paso está en su puesto.', { que: 'lo que pasó', de: 'De la petición al puente', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['La junta lleva la petición a la alcaldía.', 'El alcalde la incluye en su proyecto de presupuesto.', 'El concejo aprueba el gasto.', 'La alcaldía contrata la obra.', 'La Contraloría pide cuentas de los pagos.'], mira: ['', 'Solo se incluye lo que ya se pidió.', 'Se aprueba un proyecto que ya existe.', '«Solo entonces» contrata: antes falta el permiso de gastar.', 'Se piden cuentas de lo que ya se pagó.'], bien: 'Petición, proyecto, aprobación, contrato y control.' },
      'La comunidad pide, la alcaldía proyecta, el concejo aprueba, la alcaldía contrata y la Contraloría vigila.', 'Fíjate en lo que cada paso necesita que ya haya pasado.'),
    x('pinta-tipos', 'Pinta cada acción con la rama del poder a la que corresponde.', { doc: PUENTE, plumas: ['legislativa', 'ejecutiva', 'judicial'],
      ...P(['El Senado vota una ley de educación.', 0, '¿Esta acción crea una norma, gobierna o resuelve un conflicto?'], ['La gobernadora contrata una carretera.', 1, '¿Esta acción crea una norma, gobierna o resuelve un conflicto?'], ['Una jueza ordena devolver un cupo.', 2, '¿Esta acción crea una norma, gobierna o resuelve un conflicto?'], ['El presidente dirige a sus ministros.', 1, '¿Dirigir es hacer leyes, gobernar o juzgar?'], ['La Corte decide si una ley respeta la Constitución.', 2, '¿Quien revisa y decide en derecho hace leyes, gobierna o juzga?']), bien: 'Hacer leyes, gobernar y juzgar: tres tareas separadas.' },
      'El Congreso hace las leyes, los gobernantes las ejecutan y los jueces deciden los conflictos.', 'No mires el tema de la acción, sino su verbo: ¿legisla, gobierna o juzga?'),
    x('genero-o-cita', '¿Es parte de una **rama** del poder o un **órgano de control**?', { doc: PUENTE, rot: ['parte de una rama', 'órgano de control'],
      ...F(['El Congreso', 0, '¿Hace leyes o vigila a quienes gobiernan?'], ['La Contraloría', 1, '¿Gasta el dinero público o revisa cómo se gastó?'], ['La Procuraduría', 1, '¿Gobierna o investiga a quienes incumplen?'], ['Una alcaldía', 0, '¿Ejecuta obras o vigila a quien las ejecuta?'], ['La Corte Constitucional', 0, '¿Decide como juez o investiga funcionarios?']), bien: 'Unos hacen; otros vigilan a los que hacen.' },
      'El Congreso, la alcaldía y la Corte son parte de las ramas; la Contraloría y la Procuraduría vigilan.', 'Pregunta si el organismo legisla, gobierna o juzga. Si no, quizá vigila a quienes lo hacen.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PUENTE, nums: [4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El alcalde no podía gastar por su cuenta.', 0, 'Léela junto a la segunda oración del párrafo 4.'], ['Si el concejo negaba el gasto, no había contrato.', 1, '¿Qué dice «Solo entonces» sobre el orden de los hechos?'], ['La Contraloría revisa el gasto público.', 0, 'Léela junto al párrafo de los órganos de control.'], ['La empresa se robó el dinero.', 2, 'Que pidan explicaciones, ¿prueba una culpa?']),
      luz: [[4, 'no podía gastar el dinero por su cuenta'], [4, 'Solo entonces'], [5, 'pidió explicaciones']], bien: 'Pedir explicaciones no es condenar.' },
      'Dos afirmaciones están escritas, una sale de «solo entonces» y la del robo no tiene apoyo en el texto.', 'Una acusación necesita una prueba escrita; una consecuencia puede salir de juntar dos oraciones.'),
    x('balanza-tesis', 'Tesis: los controles hacen el proceso más lento, pero más seguro. ¿Qué hace cada dato?', { doc: PUENTE, tesis: 'Los controles cuestan tiempo, pero protegen lo público',
      ...F(['El puente tardó dos años.', 0, '¿Muestra que los controles cuestan algo?'], ['Al pedir cuentas, se recuperó un pago de más.', 0, '¿Muestra que el control sirvió para algo?'], ['En otro municipio hubo controles y se robaron todo.', 1, '¿Los controles protegieron ahí el dinero?'], ['La quebrada arrastra troncos.', 2, '¿Qué tiene que ver la corriente con los controles?']), bien: 'Dos apoyan, uno debilita y otro no pesa.' },
      'La demora y el pago recuperado apoyan la tesis; controles que no evitan el robo la debilitan; los troncos no pesan.', 'Pon cada dato como si fuera cierto: ¿la tesis queda más firme, más débil o igual?'),
    x('sella-parrafo', '«Según el texto, todo esto es cierto, **EXCEPTO**:» Ata cada opción al párrafo que la prueba.', { doc: PUENTE,
      ...T(['Las autoridades actúan según las leyes', 1, 'Busca qué significa «de derecho».'], ['El concejo se elige por voto popular', 2, 'Busca dónde se describe el concejo.'], ['Las personerías ayudan a defender derechos', 4, 'Busca el párrafo de los órganos de control.'], ['Los jueces aprueban el presupuesto', 6, 'Busca quién aprueba el presupuesto: ¿son ellos?']),
      luz: [[2, 'deben actuar según las leyes'], [3, 'elegida por voto popular'], [5, 'las personerías ayudan']], bien: 'Ningún párrafo prueba la intrusa.' },
      'El presupuesto del municipio lo aprueba el concejo; los jueces resuelven conflictos y protegen derechos.', 'Busca cada opción con su sujeto y su verbo: no basta que una palabra aparezca.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PUENTE, lineas: ['Un Estado social de derecho cumple la ley y garantiza vida digna.', 'La quebrada arrastra piedras.', 'El poder se divide en tres ramas.', 'Los órganos de control vigilan.', 'Los niños faltan a clase cuando llueve.', 'Los controles cuestan tiempo, pero sirven.'], ...S([1, 4], { 0: 'Es la idea de Estado que explica el texto.', 2: 'Es cómo se organiza el poder.', 3: 'Es quién vigila a los demás.', 5: 'Es la conclusión del caso.' }), bien: 'Quedan el modelo de Estado, las ramas, el control y la conclusión.' },
      'La quebrada y los niños son el caso que ilustra; las otras cuatro son las ideas sobre el Estado.', 'Separa el caso (la vereda) de lo que el caso enseña sobre el Estado.'),
  ]);

  const l2 = leccion('icf-sc-constitucion-2', 'Derechos y mecanismos de protección', [
    sc(6, 'La Constitución no es solo una lista de derechos: trae **herramientas** para reclamarlos. La prueba pregunta cuál sirve en cada situación.', { title: 'Derechos con herramientas' }),
    sc(7, 'El **derecho de petición** es pedir a una autoridad que responda; la **tutela**, pedirle a un juez que proteja ya un derecho fundamental vulnerado.', { title: 'Pedir y exigir' }),
    sc(7, 'Ejemplo: si un hospital niega una cirugía urgente a un niño, sirve la tutela, porque está en juego su salud y su vida. Si se quiere saber por qué subió un impuesto, basta un derecho de petición.', { title: 'Dos casos, dos herramientas' }),
    sc(7, 'Para lo que es de todos, como un río o un parque, está la **acción popular**; para que una autoridad cumpla una ley, la **acción de cumplimiento**; y para una detención ilegal, el **habeas corpus**.', { title: 'Lo colectivo y la libertad' }),
    sc(6, 'Pregunta clave en cada caso: ¿el derecho es de una persona o de todos?, ¿es fundamental?, ¿se quiere información, protección o que se cumpla una norma?', { title: 'Tres preguntas' }),
  ], [
    x('comprueba-apuesta', 'Alguien dice que la tutela sirve **siempre**, aunque haya otro camino. Subraya la oración del párrafo 3 que lo desmiente.', { doc: TUTELA, nums: [3], apuesta: 'La tutela se puede usar siempre.', ...S(['3.3'], { '3.0': 'Presenta la tutela y cuándo acudieron a ella.', '3.1': 'Dice qué derechos protege, no cuándo procede.', '3.2': 'Habla del abogado y del plazo, no de otros caminos.' }), bien: 'Procede cuando no hay otro medio eficaz.' },
      'La oración que empieza con «Sin embargo» pone la condición: solo si no existe otro medio eficaz.', 'Busca el conector que limita lo que se venía diciendo.'),
    x('genero-o-cita', '¿Qué herramienta sirve en cada caso: **tutela** o **acción popular**?', { doc: TUTELA, rot: ['acción de tutela', 'acción popular'],
      ...F(['A un paciente le niegan una cirugía urgente', 0, '¿El derecho es de una persona o de todos a la vez?'], ['Una mina ensucia el río de tres pueblos', 1, '¿El derecho es de una persona o de todos a la vez?'], ['Cierran una playa que es espacio público', 1, '¿A cuántas personas les pertenece el espacio público?'], ['Expulsan a una alumna por estar embarazada', 0, '¿A quién le están negando la educación y la igualdad?']), bien: 'Fundamental y de alguien: tutela. De todos: acción popular.' },
      'La cirugía y la expulsión tocan derechos fundamentales de una persona; el río y la playa son de todos.', 'Pregunta de quién es el derecho que está en juego: ¿de alguien o de la comunidad entera?'),
    x('voz-de-la-fuente', 'Cada caso pide una herramienta. Átalos.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: TUTELA, portadas: [['Derecho de petición', 'para pedir y recibir respuesta'], ['Acción de cumplimiento', 'para que se cumpla una norma'], ['Habeas corpus', 'para la libertad'], ['Acción de tutela', 'para derechos fundamentales']],
      ...T(['Quiero saber por qué no hay luz en mi calle', 0, 'Aquí se busca una explicación de la autoridad.'], ['Una ley ordena publicar los gastos y la alcaldía la ignora', 1, 'Aquí ya existe una norma: ¿qué falta?'], ['Mi hermano está detenido sin orden', 2, 'Aquí está en juego que alguien pueda salir.'], ['El hospital me niega un tratamiento vital', 3, 'Aquí está en juego la vida de alguien.']), bien: 'Cada problema tiene su herramienta.' },
      'Pedir información es derecho de petición; exigir una norma, cumplimiento; la libertad, habeas corpus; la vida, tutela.', 'Di en una palabra qué se reclama: respuesta, cumplimiento, libertad o un derecho fundamental.'),
    x('pasos-del-proceso', 'Ordena lo que hizo la familia. El primer paso está en su puesto.', { que: 'lo que pasó', de: 'El caso de Valentina', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['El colegio negó el cupo.', 'La mamá envió un derecho de petición.', 'La secretaría respondió sin resolver.', 'Presentaron una tutela.', 'El juez ordenó recibirla y construir la rampa.'], mira: ['', 'Se pide explicación antes de demandar.', 'Responde quien ya recibió la petición.', 'Acudieron a ella después de una respuesta que no resolvía.', 'El juez decide cuando alguien acude a él.'], bien: 'Negativa, petición, respuesta vacía, tutela y fallo.' },
      'Primero se pidió una respuesta; como no resolvía nada, se acudió a la tutela y el juez decidió.', 'Cada paso responde a lo que falló en el anterior.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que la oración diga lo mismo que el texto.', { doc: TUTELA, filas: [{ antes: 'Para presentar una tutela el abogado es', topes: ['obligatorio', 'elegido por el juez', 'innecesario'], va: 2 }, { antes: 'En la tutela, el juez decide en un plazo de', topes: ['tres días', 'diez días', 'tres meses'], va: 1 }, { antes: 'La acción popular protege derechos', topes: ['de una persona', 'de toda la comunidad', 'de los funcionarios'], va: 1 }], mira: ['Relee el párrafo 3: ¿qué dice del abogado?', 'Cuidado: en el texto hay otros plazos, para otras cosas.', 'Relee el párrafo 5: ¿de quién son los derechos colectivos?'], luz: [[3, 'No necesita abogado'], [3, 'en un máximo de diez días'], [5, 'que son de todos a la vez']], bien: 'Ni más ni menos de lo que dice el texto.' },
      'La tutela no necesita abogado y se decide en diez días; los quince son de la petición y los tres meses, de la rampa.', 'El texto tiene tres plazos distintos: busca de qué es cada uno.'),
    x('pilares', 'El techo es el fallo del juez. Lleva abajo lo que lo sostiene y al patio lo que solo adorna.', { doc: TUTELA, idea: 'El colegio debe recibir a Valentina',
      ...F(['La educación de los niños es un derecho fundamental.', 0, 'Si no fuera un derecho, ¿podría ordenarlo un juez?'], ['Negar el cupo por la rampa es discriminar.', 0, '¿Qué motivo dio el juez para su decisión?'], ['El Estado ya estaba obligado por la Constitución.', 0, '¿Fue un regalo o un deber?'], ['La familia se había mudado.', 1, 'Si no se hubieran mudado, ¿cambiaría el derecho?'], ['La personera estudiantil le explicó.', 1, '¿Es una razón para decidir o parte de la historia?']), bien: 'Derecho, igualdad y deber sostienen el fallo.' },
      'El fallo se apoya en el derecho a la educación, la igualdad y el deber del Estado; lo demás cuenta el caso.', 'Quita cada oración: si el juez aún podría decidir lo mismo, esa no lo sostenía.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: TUTELA, texto: '|La mamá de Valentina| escribió a |la secretaría| porque |el colegio| no cambió de idea. Esta respondió a tiempo, pero aquella siguió sin |un cupo| para su hija.',
      ...T(['«Esta»', 1, 'Pon en su lugar lo que ataste: ¿quién responde una petición?'], ['«aquella»', 0, 'Pon en su lugar lo que ataste: ¿quién tiene una hija?']), bien: '«Esta» recoge lo cercano; «aquella», lo lejano.' },
      'Quien responde la petición es la secretaría, y quien tiene una hija es la mamá: género y sentido lo confirman.', 'Prueba cada candidata en la oración: solo una puede responder y solo una tiene hija.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: TUTELA, lineas: ['La Constitución da herramientas para reclamar.', 'Valentina tiene quince años.', 'La petición exige respuesta.', 'La tutela protege derechos fundamentales.', 'El colegio tiene dos pisos.', 'Quien conoce sus herramientas exige derechos.'], ...S([1, 4], { 0: 'Es la idea que abre toda la cartilla.', 2: 'Es la primera herramienta.', 3: 'Es la herramienta central del texto.', 5: 'Es la conclusión.' }), bien: 'Queda la idea, dos herramientas y la conclusión.' },
      'La edad y los pisos ayudan a contar el caso, pero no explican las herramientas.', 'Piensa qué necesitaría saber alguien que quiere reclamar un derecho.'),
  ]);

  const PARQUE = {
    id: 'icf-parque', title: 'El parque que la alcaldía quería vender',
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
        'El concejo es la corporación administrativa del municipio, elegida por voto popular: aprueba o rechaza las normas y los proyectos del alcalde. No es un juez ni un órgano de control, y tampoco representa a un gremio.',
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
;
//#archivo js/courses/preicfes-sc-participacion.js
// Preicfes · Sociales y Ciudadanas · mundo 2 «Participación y Control» (spec 2026-11-25-preicfes-estructura). Casos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const VOTO = {
    id: 'icf-relleno', title: 'La consulta del relleno',
    ficha: { autor: 'Profesor de ciencias políticas', fuente: 'Cartilla de participación ciudadana', fecha: 'Marzo de 2026' },
    paras: [
      'En San Pedro del Monte, la alcaldía anunció que el nuevo relleno sanitario quedaría a un kilómetro del acueducto. Muchos vecinos no estaban de acuerdo, pero no sabían si bastaba con quejarse. El profesor de sociales reunió a sus estudiantes y les hizo una pregunta: además de votar cada cuatro años, ¿qué puede hacer un ciudadano?',
      'La Constitución de 1991 dice que Colombia es una democracia representativa y participativa. Representativa, porque elegimos a quienes deciden en nuestro nombre. Participativa, porque también podemos decidir directamente en ciertos casos. El artículo 103 enumera los mecanismos: el voto, el plebiscito, el referendo, la consulta popular, el cabildo abierto, la iniciativa legislativa y la revocatoria del mandato.',
      'Cada uno responde a una necesidad distinta. En un plebiscito, el presidente pide a los ciudadanos apoyar o rechazar una decisión suya. En un referendo se aprueba o se deroga una norma. En una consulta popular se pregunta sobre un asunto de interés nacional, departamental o municipal. En un cabildo abierto, los vecinos discuten un tema con el concejo o la junta administradora, sin votar sobre él.',
      'La iniciativa permite que un grupo de ciudadanos presente un proyecto de ley, de ordenanza o de acuerdo. La revocatoria, en cambio, sirve para retirar del cargo a un gobernador o a un alcalde que no cumple su programa de gobierno; no se aplica al presidente ni a los congresistas, y solo puede pedirse cuando ha pasado al menos un año de mandato.',
      'Los estudiantes propusieron empezar por un cabildo abierto, porque la mayoría de los vecinos aún no conocía el proyecto. Reunieron las firmas necesarias y el concejo citó la sesión. Allí, por primera vez, la alcaldía mostró los estudios y los vecinos expusieron sus dudas sobre el agua.',
      'El alcalde no estaba obligado a cambiar de opinión, pero sí a responder. Dos meses después, el relleno se trasladó a otro predio. No siempre termina así. Lo que sí cambia siempre es la pregunta: participar no garantiza ganar, garantiza que la decisión no se tome en silencio.',
    ],
  };
  const l1 = leccion('icf-sc-participacion-1', 'Voto y mecanismos de participación', guion(
    ['Representar y participar', 'Elegir a alguien es democracia representativa; decidir directamente es participativa. Colombia reconoce las dos.'],
    ['Cada mecanismo, su uso', 'Plebiscito: una decisión del presidente. Referendo: una norma. Consulta: un asunto de interés público. Cabildo: deliberar.'],
    ['Quitar del cargo', 'La revocatoria es solo para gobernadores y alcaldes, después de un año.'],
    ['Firmas', 'La iniciativa popular deja que los ciudadanos presenten una norma.']), [
    x('voz-de-la-fuente', 'Cada situación pide un mecanismo. Átalas.', { ayuda: 'Tira un hilo desde cada situación hasta su mecanismo.', doc: VOTO, portadas: [['Referendo', 'sobre una norma'], ['Plebiscito', 'decisión presidencial'], ['Cabildo abierto', 'deliberar'], ['Revocatoria', 'retirar del cargo']],
      ...T(['El pueblo vota si deroga una ley', 0, '¿Qué se somete a votación: una norma, una decisión o una persona?'], ['El presidente pide apoyo a un acuerdo suyo', 1, '¿Quién pide apoyo y para qué?'], ['Los vecinos discuten una vía con el concejo', 2, '¿Se vota o se conversa?'], ['Quieren retirar a una alcaldesa que no cumple', 3, '¿Se discute una norma o un cargo?']), bien: 'Norma, decisión, discusión y cargo.' },
      'La norma va a referendo, la decisión presidencial a plebiscito, la discusión a cabildo y el cargo a revocatoria.', 'Pregunta qué está en juego en cada caso: una norma, una decisión, una conversación o un cargo.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: VOTO,
      ...F(['¿Por qué se llama participativa?', 1, 'Busca el comienzo que nombra la Constitución.'], ['¿A quién no se le puede revocar?', 3, 'Busca el comienzo que habla de proyectos de ciudadanos.'], ['¿Por qué escogieron el cabildo?', 4, 'Busca el comienzo que nombra a los estudiantes.']),
      luz: [[2, 'también podemos decidir directamente'], [4, 'no se aplica al presidente'], [5, 'aún no conocía el proyecto']], bien: 'Cada comienzo abre su tema.' },
      'La Constitución está en el 2, la revocatoria en el 4 y la elección de los estudiantes en el 5.', 'Busca en los comienzos la palabra más cercana a cada pregunta.'),
    x('genero-o-cita', '¿Es democracia **representativa** o **participativa**?', { doc: VOTO, rot: ['representativa', 'participativa'],
      ...F(['Elegir a una senadora', 0, '¿Decide el ciudadano o elige a quien decide?'], ['Votar una consulta sobre minería', 1, '¿Decide el ciudadano o elige a quien decide?'], ['Firmar un proyecto de ley ciudadano', 1, '¿Actúa el ciudadano o su representante?'], ['El concejo aprueba un acuerdo', 0, '¿Actúa el ciudadano o su representante?']), bien: 'Elegir a otro o decidir uno mismo.' },
      'Elegir y dejar decidir a los elegidos es representativa; votar una consulta o presentar un proyecto, participativa.', 'Mira quién toma la decisión final en cada caso.'),
    x('pasos-del-proceso', 'Ordena lo que hicieron en San Pedro. El primer paso está en su puesto.', { que: 'lo que pasó', de: 'Del anuncio al traslado', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['La alcaldía anunció el relleno.', 'Los estudiantes propusieron un cabildo.', 'Reunieron las firmas.', 'El concejo citó la sesión.', 'El relleno se trasladó.'], mira: ['', 'Se propone algo frente a lo ya anunciado.', 'Se firma lo que ya se propuso.', 'Se cita cuando ya hay respaldo suficiente.', 'Es lo que ocurre después de discutir.'], bien: 'Anuncio, propuesta, firmas, sesión y cambio.' },
      'El anuncio provoca la propuesta; las firmas permiten la sesión; después llega el traslado.', 'Pregunta qué hacía falta para poder dar cada paso.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: VOTO, filas: [{ antes: 'La revocatoria se aplica a', topes: ['presidentes', 'congresistas', 'alcaldes y gobernadores'], va: 2 }, { antes: 'En el cabildo abierto los vecinos', topes: ['discuten', 'votan la norma', 'eligen concejales'], va: 0 }, { antes: 'Participar garantiza', topes: ['ganar', 'que se discuta', 'que nada cambie'], va: 1 }], mira: ['Relee el párrafo 4: ¿a quién no se aplica?', 'Relee el final del párrafo 3.', 'Relee la última oración del texto.'], luz: [[4, 'no se aplica al presidente ni a los congresistas'], [3, 'sin votar sobre él'], [6, 'que la decisión no se tome en silencio']], bien: 'Cada mecanismo con su alcance.' },
      'La revocatoria es para alcaldes y gobernadores, el cabildo es para deliberar y participar no asegura ganar.', 'Busca la oración que pone límites a cada mecanismo.'),
    x('comprueba-apuesta', 'Alguien dice: «participar no sirve, porque el alcalde puede no hacer caso». Subraya en el párrafo 6 la oración que le **concede** una parte y le pone un límite.', { doc: VOTO, nums: [6], apuesta: 'El alcalde puede no hacer caso.', ...S(['6.0'], { '6.1': 'Cuenta qué pasó con el relleno.', '6.2': 'Dice que no siempre sale bien, sin hablar de responder.', '6.3': 'Es la conclusión sobre participar en general.' }), bien: 'No está obligado a cambiar, pero sí a responder.' },
      'La primera oración acepta que no debe cambiar de opinión y agrega su obligación: responder.', 'Busca la oración con «pero» que habla de la obligación del alcalde.'),
    x('balanza-tesis', 'Tesis: el cabildo fue útil en San Pedro. ¿Qué hace cada dato?', { doc: VOTO, tesis: 'El cabildo fue útil en San Pedro',
      ...F(['La alcaldía mostró los estudios por primera vez.', 0, '¿Se logró algo que antes no había?'], ['Los vecinos expusieron sus dudas.', 0, '¿Se logró algo que antes no había?'], ['El traslado ya estaba decidido antes.', 1, 'Si fuera cierto, ¿el cabildo habría cambiado algo?'], ['El profesor enseña sociales.', 2, '¿Cambia lo que logró el cabildo?']), bien: 'Dos apoyan, uno debilita y otro no pesa.' },
      'Estudios a la vista y dudas escuchadas apoyan; un traslado decidido antes debilita; la materia no pesa.', 'Supón cierto cada dato y mira si creerías más o menos en la tesis.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: VOTO, lineas: ['La democracia colombiana es representativa y participativa.', 'El relleno quedaba a un kilómetro.', 'Hay varios mecanismos, cada uno con su uso.', 'La revocatoria es para alcaldes y gobernadores.', 'El profesor reunió a sus estudiantes.', 'Participar hace que se discuta la decisión.'], ...S([1, 4], { 0: 'Es el modelo de democracia.', 2: 'Es la idea que organiza el texto.', 3: 'Es una regla que conviene recordar.', 5: 'Es la conclusión.' }), bien: 'Modelo, mecanismos, regla y conclusión.' },
      'La distancia y la reunión cuentan el caso; las demás enseñan sobre la participación.', 'Separa el caso del relleno de lo que ese caso enseña sobre participar.'),
  ]);

  const CONTROL = {
    id: 'icf-comedor', title: 'Los almuerzos que no llegaban',
    ficha: { autor: 'Equipo de una veeduría ciudadana', fuente: 'Boletín comunitario', fecha: 'Mayo de 2026' },
    paras: [
      'El contrato decía que cada estudiante del colegio Los Almendros recibiría un almuerzo con carne, verdura y fruta. En la mesa solo había arroz y una galleta. Durante tres meses, las familias pensaron que era un error. Después, cansadas de esperar, empezaron a tomar fotos.',
      'Una madre, Rosalba Tique, propuso conformar una veeduría ciudadana: un grupo de vecinos que, según la ley, puede vigilar cómo se gasta el dinero público y pedir información a las entidades. Con un derecho de petición obtuvieron una copia del contrato y compararon lo pagado con lo servido.',
      'La diferencia era grande, y el caso llegó a varios organismos a la vez. La Contraloría revisó las cuentas, porque su tarea es vigilar el uso de los recursos públicos; si comprueba un daño, puede exigir que se devuelva el dinero. La Procuraduría investigó a la funcionaria que firmó los recibos sin verificar los platos, porque vigila la conducta de los servidores públicos y puede sancionarlos.',
      'La personería del municipio, que forma parte del Ministerio Público, acompañó a las familias y recibió sus quejas. Como había indicios de un delito, también intervino la Fiscalía, que investiga los delitos y acusa ante los jueces. La Fiscalía no es un organismo de control: pertenece a la rama judicial. Una misma falta puede tener, entonces, consecuencias fiscales, disciplinarias y penales.',
      'Algunos vecinos preguntaron por qué tantas entidades se ocupaban de unos platos de arroz. La respuesta es que cada una hace una pregunta distinta: si se perdió dinero, si alguien incumplió su deber, si se cometió un delito, si se vulneró un derecho. Responder una no responde las demás.',
      'El contratista fue cambiado y parte del dinero se recuperó. La veeduría no se disolvió. Los lunes, dos madres visitan el comedor con una libreta y anotan qué se sirvió, cuánto y a qué hora. Cada mes publican esos datos en la cartelera del colegio. «Lo público es de todos», dice Rosalba, «y lo que es de todos necesita muchos ojos».',
    ],
  };
  const l2 = leccion('icf-sc-participacion-2', 'Organismos de control', guion(
    ['Contraloría', 'Sigue el dinero público: ¿se perdió?, ¿quién debe devolverlo? Es el control fiscal.'],
    ['Procuraduría', 'Vigila la conducta de los funcionarios y puede sancionarlos. Es el control disciplinario.'],
    ['Fiscalía', 'Investiga delitos y acusa ante los jueces. Es de la rama judicial, no un organismo de control.'],
    ['Veedurías', 'Los ciudadanos también pueden vigilar: piden información y comparan lo pagado con lo hecho.']), [
    x('pinta-tipos', 'Pinta cada pregunta con quien la responde.', { doc: CONTROL, plumas: ['Contraloría', 'Procuraduría', 'Fiscalía'],
      ...P(['¿Cuánto dinero del comedor se perdió?', 0, '¿La pregunta es por dinero, por conducta o por delito?'], ['¿La funcionaria incumplió su deber?', 1, '¿La pregunta es por dinero, por conducta o por delito?'], ['¿Hubo un robo que deba ir a juicio?', 2, '¿La pregunta es por dinero, por conducta o por delito?'], ['¿Un inspector llegó borracho a trabajar?', 1, '¿La pregunta es por dinero, por conducta o por delito?'], ['¿Quién debe devolver lo pagado de más?', 0, '¿La pregunta es por dinero, por conducta o por delito?']), bien: 'Dinero, conducta y delito.' },
      'El dinero es de la Contraloría, la conducta del funcionario de la Procuraduría y el delito de la Fiscalía.', 'Subraya en cada pregunta si habla de plata, de deber o de delito.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: CONTROL,
      ...F(['muestra el incumplimiento', 0, 'Busca lo que decía y lo que había.'], ['cuenta cómo vigilaron los vecinos', 1, 'Busca la veeduría.'], ['explica dos controles', 2, 'Busca Contraloría y Procuraduría.'], ['suma a quien acompaña y a quien acusa', 3, 'Busca personería y Fiscalía.'], ['responde una duda', 4, 'Busca lo que preguntaron los vecinos.'], ['cierra con lo que quedó', 5, 'Busca qué pasó con el contratista.'], ['critica a los maestros', null, 'Ningún párrafo habla de los maestros.']),
      luz: [[1, 'El contrato decía'], [2, 'veeduría ciudadana'], [3, 'La Contraloría'], [4, 'la Fiscalía'], [5, 'preguntaron'], [6, 'La veeduría no se disolvió']], bien: 'Falla, vigilancia, controles, duda y cierre.' },
      'El texto muestra la falla, quién la vigiló, qué hizo cada entidad, por qué son varias y qué quedó.', 'Pregunta qué hace cada párrafo, no solo a quién nombra.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONTROL, nums: [2, 4], pregunta: 'Queda en pie', queda: 'Una falta puede tener varias consecuencias.',
      ...T(['Los vecinos no pueden vigilar el gasto.', [0, 1], 'Busca qué es una veeduría o qué logró.'], ['La Fiscalía es un organismo de control.', 4, 'Busca a qué rama pertenece.'], ['La personería es una rama del poder.', 2, 'Busca de qué forma parte.']), bien: 'Cada opción cae con una oración.' },
      'La ley permite las veedurías, la Fiscalía es de la rama judicial y la personería, del Ministerio Público.', 'Saca la entidad de cada opción y busca qué se dice de ella.'),
    x('genero-o-cita', '¿Puede hacerlo la **veeduría** o le toca a una **entidad del Estado**?', { doc: CONTROL, rot: ['la veeduría', 'una entidad'],
      ...F(['Pedir copia del contrato', 0, '¿Basta con ser ciudadano?'], ['Sancionar a la funcionaria', 1, '¿Un vecino puede castigar?'], ['Comparar lo pagado con lo servido', 0, '¿Basta con ser ciudadano?'], ['Acusar ante un juez penal', 1, '¿Quién acusa en nombre del Estado?'], ['Visitar el comedor y anotar', 0, '¿Basta con ser ciudadano?']), bien: 'Vigilar y pedir; sancionar y acusar.' },
      'La veeduría pide, compara y observa; sancionar es de la Procuraduría y acusar, de la Fiscalía.', 'Distingue entre mirar y pedir, por un lado, y castigar o acusar, por otro.'),
    x('pilares', 'El techo es la respuesta a los vecinos. ¿Qué la sostiene y qué adorna?', { doc: CONTROL, idea: 'Hacen falta varias entidades porque cada una pregunta algo distinto',
      ...F(['La Contraloría pregunta por el dinero.', 0, '¿Muestra una pregunta propia?'], ['La Procuraduría pregunta por el deber.', 0, '¿Muestra una pregunta propia?'], ['La Fiscalía pregunta por el delito.', 0, '¿Muestra una pregunta propia?'], ['Había arroz y una galleta.', 1, 'Si hubiera sopa, ¿cambiaría la idea?'], ['Las visitas son los lunes.', 1, 'Si fueran los martes, ¿cambiaría la idea?']), bien: 'Tres preguntas sostienen; dos detalles adornan.' },
      'Cada entidad con su pregunta sostiene la idea; el menú y el día solo cuentan el caso.', 'Pregunta si cada oración muestra una tarea distinta.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: CONTROL, texto: '|La Contraloría| revisó |las cuentas| y, después, actuó |la Procuraduría|. Esta puede sancionar; aquella, pedir que se devuelva |el dinero|.',
      ...T(['«Esta»', 2, 'Pon en su lugar lo que ataste: ¿quién puede sancionar?'], ['«aquella»', 0, 'Pon en su lugar lo que ataste: ¿quién sigue la plata?']), bien: '«Esta», la cercana; «aquella», la lejana.' },
      'Sancionar es de la Procuraduría, la más cercana; pedir el dinero, de la Contraloría, la más lejana.', 'Comprueba con la tarea de cada entidad, no solo con la distancia.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONTROL, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La funcionaria firmó sin verificar.', 0, 'Léela junto a lo que investigó la Procuraduría.'], ['No todo el dinero volvió.', 1, 'Mira con cuidado cuánto se recuperó.'], ['El contratista fue cambiado.', 0, 'Léela junto al comienzo del párrafo 6.'], ['El contratista está preso.', 2, '¿Alguna oración habla de cárcel?']),
      luz: [[3, 'firmó los recibos sin verificar'], [6, 'parte del dinero se recuperó']], bien: '«Parte» dice más de lo que parece.' },
      'Firmar y cambiar están escritos; si se recuperó una parte, otra no; la cárcel se inventa.', 'Fíjate en palabras como «parte», que dejan algo por fuera.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CONTROL, lineas: ['Una veeduría vigiló un contrato incumplido.', 'Dos madres llevan una libreta.', 'La Contraloría sigue el dinero.', 'La Procuraduría, la conducta.', 'En la mesa había arroz.', 'La Fiscalía investiga delitos y es de la rama judicial.'], ...S([1, 4], { 0: 'Es quién vigiló y qué.', 2: 'Es el control fiscal.', 3: 'Es el control disciplinario.', 5: 'Es una distinción que se pregunta mucho.' }), bien: 'Quién vigila y qué pregunta cada quien.' },
      'La libreta y el arroz son del caso; las demás explican quién controla qué.', 'Piensa qué serviría para otro caso distinto.'),
  ]);

  const REFORMA = {
    id: 'icf-reforma', title: 'Cómo se cambia la regla mayor',
    ficha: { autor: 'Abogada constitucionalista', fuente: 'Columna pedagógica de un diario', fecha: 'Abril de 2026' },
    paras: [
      'Una Constitución es la regla que está por encima de las demás reglas. Si una ley la contradice, la ley pierde. Por eso surge una duda razonable: si el país cambia, ¿cómo se cambia la Constitución sin que cualquiera la acomode a su gusto?',
      'La nuestra, de 1991, prevé tres caminos. El primero es el acto legislativo, que tramita el Congreso. No basta una votación: se exigen en total ocho debates, en dos períodos ordinarios y consecutivos, y en el segundo período debe aprobarlo la mayoría de los miembros de cada cámara. Es lento a propósito. Entre un período y otro, el país alcanza a enterarse y a opinar.',
      'El segundo es el referendo constitucional. El gobierno o un grupo de ciudadanos presenta un texto, el Congreso aprueba una ley que convoca a votar y la Corte Constitucional revisa esa ley antes de que se vote. Después, los ciudadanos dicen sí o no. El tercero es la asamblea constituyente: el pueblo decide, primero, si la convoca y con qué temas; luego elige a sus miembros.',
      'En los tres casos hay un vigilante. La Corte Constitucional revisa que se hayan cumplido los trámites. También ha dicho que reformar no es lo mismo que sustituir: el Congreso puede cambiar partes de la Constitución, pero no reemplazarla por otra distinta, porque quien la puede reemplazar es el pueblo.',
      'Hay quienes ven en estas reglas un obstáculo. Argumentan que una mayoría reciente debería poder cambiarlo todo con rapidez. Otros responden que una mayoría de hoy puede ser minoría mañana, y que las reglas difíciles de cambiar protegen a ambas. Por eso algunas constituciones del mundo exigen aún más pasos que la nuestra, y otras, menos. La discusión es vieja y no tiene una respuesta única.',
      'Lo que sí muestra es para qué sirve la lentitud. Cambiar la regla mayor debe ser posible, o el país quedaría atado para siempre a sus abuelos. Pero debe costar trabajo, o quedaría atado al humor de una semana.',
    ],
  };
  const l3 = leccion('icf-sc-participacion-3', 'Reformar la Constitución', guion(
    ['La regla mayor', 'La Constitución está por encima de las leyes; cambiarla exige un trámite más difícil.'],
    ['Tres caminos', 'Acto legislativo (Congreso, ocho debates en dos períodos), referendo y asamblea constituyente.'],
    ['El vigilante', 'La Corte Constitucional revisa el trámite y que no se reemplace la Constitución disfrazando el cambio de reforma.'],
    ['¿Por qué lento?', 'La dificultad protege a las minorías y da tiempo de discutir.']), [
    x('genero-o-cita', '¿Es **acto legislativo** o **asamblea constituyente**?', { doc: REFORMA, rot: ['acto legislativo', 'asamblea constituyente'],
      ...F(['Ocho debates en el Congreso', 0, '¿Quién discute: congresistas o miembros elegidos para eso?'], ['El pueblo decide si la convoca', 1, '¿Hay una votación para convocarla?'], ['Se eligen miembros especiales', 1, '¿Discuten congresistas u otros elegidos?'], ['Dos períodos consecutivos', 0, '¿De quién son los períodos ordinarios?']), bien: 'Uno en el Congreso, otro con miembros propios.' },
      'Los debates y los períodos son del Congreso; convocarla y elegir miembros es de la constituyente.', 'Busca en el texto quién discute en cada camino.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: REFORMA,
      ...F(['plantea la pregunta', 0, 'Busca los signos de interrogación.'], ['explica el primer camino', 1, 'Busca el acto legislativo.'], ['explica los otros dos', 2, 'Busca «segundo» y «tercero».'], ['presenta al vigilante', 3, 'Busca quién revisa.'], ['muestra dos posturas', 4, 'Busca «Hay quienes» y «Otros».'], ['concluye', 5, 'Busca para qué sirve la lentitud.'], ['cuenta la vida de un senador', null, 'No se narra la vida de nadie.']),
      luz: [[1, '¿cómo se cambia la Constitución'], [2, 'acto legislativo'], [3, 'asamblea constituyente'], [4, 'hay un vigilante'], [5, 'Hay quienes'], [6, 'para qué sirve la lentitud']], bien: 'Pregunta, caminos, vigilante, posturas y cierre.' },
      'El texto pregunta, responde con tres caminos, presenta a la Corte, contrasta posturas y concluye.', 'Guíate por los números y por las palabras que presentan posturas.'),
    x('pasos-del-proceso', 'Ordena el camino de un referendo constitucional. El primer paso está en su puesto.', { que: 'el trámite', de: 'Referendo constitucional', fija: 1, ini: [0, 2, 3, 1], tiras: ['Se presenta un texto.', 'El Congreso aprueba la ley que convoca.', 'La Corte revisa esa ley.', 'Los ciudadanos votan.'], mira: ['', 'Se convoca sobre un texto ya presentado.', 'Se revisa una ley que ya existe.', 'Se vota cuando ya se revisó.'], bien: 'Texto, ley, revisión y voto.' },
      'Primero el texto, después la ley que convoca, la revisión de la Corte y al final la votación.', 'Busca «antes de que se vote» y «Después».'),
    x('pinta-voces', 'Pinta cada idea con quien la sostiene.', { doc: REFORMA, plumas: ['los del cambio rápido', 'los que defienden la dificultad', 'la Corte'],
      ...P(['La mayoría reciente debería poder cambiarlo todo.', 0, 'Busca quiénes ven un obstáculo.'], ['Quien es mayoría hoy puede ser minoría mañana.', 1, 'Busca quiénes «responden».'], ['Reformar no es sustituir.', 2, 'Busca quién «ha dicho» eso.'], ['Las reglas difíciles protegen a todos.', 1, 'Busca quiénes «responden».']), bien: 'Dos posturas y un juez.' },
      'Unos piden rapidez, otros defienden la dificultad y la distinción entre reformar y sustituir es de la Corte.', 'Busca «Argumentan», «responden» y «ha dicho».'),
    x('bisagras', 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.', { doc: REFORMA, pares: [['La Constitución está por encima de las leyes.', 'si una ley la contradice, la ley pierde.'], ['El Congreso puede cambiar partes de ella,', 'no puede reemplazarla.'], ['No puede reemplazarla,', 'eso solo puede hacerlo el pueblo.']],
      ...F(['Por eso,', 0, 'Concluye: ¿dónde lo segundo resulta de lo primero?'], ['pero', 1, 'Limita: ¿dónde se permite algo y se prohíbe otra cosa?'], ['porque', 2, 'Da la razón: ¿dónde lo segundo explica lo primero?'], ['para que', null, 'Anunciaría un propósito: aquí nada se hace con ese fin.'], ['a fin de que', null, 'Anunciaría un propósito: aquí nada se hace con ese fin.']), bien: 'Concluir, limitar y explicar.' },
      'Que la ley pierda es consecuencia; no reemplazar es un límite; que solo el pueblo pueda es la razón.', 'Di qué hace la segunda idea antes de escoger la palabra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: REFORMA, filas: [{ antes: 'El acto legislativo lo tramita', topes: ['el presidente', 'el Congreso', 'la Corte'], va: 1 }, { antes: 'Necesita debates en número de', topes: ['cuatro', 'seis', 'ocho'], va: 2 }, { antes: 'La Corte revisa la ley del referendo', topes: ['antes de votar', 'al contar los votos', 'un año después'], va: 0 }], mira: ['Relee la segunda oración del párrafo 2.', 'Relee lo que se exige en el párrafo 2.', 'Relee el párrafo 3: ¿cuándo revisa?'], luz: [[2, 'que tramita el Congreso'], [2, 'ocho debates'], [3, 'antes de que se vote']], bien: 'Quién, cuántos y cuándo.' },
      'El Congreso lo tramita en ocho debates, y la Corte revisa la ley del referendo antes de la votación.', 'Cada perilla tiene su dato exacto en los párrafos 2 y 3.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REFORMA, nums: [2, 4], pregunta: 'Queda en pie', queda: 'La Constitución se puede reformar, con límites.',
      ...T(['Basta una sola votación del Congreso.', 2, 'Busca cuántos debates se exigen.'], ['Es lento por descuido.', 3, 'Busca si la demora es intencional.'], ['El Congreso puede cambiarla por otra.', 7, 'Busca la diferencia entre reformar y sustituir.']), bien: 'Tres oraciones, tres desmentidos.' },
      'Se exigen ocho debates, la lentitud es intencional y el Congreso no puede reemplazarla.', 'Busca en cada opción la palabra que el texto niega.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REFORMA, lineas: ['La Constitución está sobre las leyes.', 'La discusión es vieja.', 'Se reforma por tres caminos.', 'La Corte vigila el trámite.', 'Otros países exigen más pasos.', 'La dificultad protege y da tiempo.'], ...S([1, 4], { 0: 'Es la razón de que cambiarla sea difícil.', 2: 'Es la respuesta a la pregunta.', 3: 'Es el control sobre la reforma.', 5: 'Es la conclusión.' }), bien: 'Jerarquía, caminos, control y razón.' },
      'Que la discusión sea vieja y que otros países exijan más pasos no explica cómo se reforma aquí.', 'Deja lo que responde a la pregunta del comienzo.'),
  ]);

  const BARRIO = {
    id: 'icf-ciclorruta', title: 'La avenida de los dos carriles',
    paras: [
      'La alcaldía de Puerto Nuevo decidió quitar un carril de la avenida principal para construir una ciclorruta. El alcalde lo había prometido en su programa de gobierno y contaba con el presupuesto aprobado por el concejo. Aun así, el anuncio dividió a la ciudad.',
      'Los transportadores convocaron una marcha y anunciaron que recogerían firmas para revocarle el mandato. El alcalde llevaba cinco meses en el cargo. Un grupo de ciclistas, en cambio, pidió un cabildo abierto para que la comunidad conociera los planos y opinara sobre las paradas de bus.',
      'Mientras tanto, una concejala denunció que el contrato se había firmado con la empresa de un primo del secretario de obras. La denuncia llegó a la Procuraduría y a la Contraloría. El secretario respondió que el precio era el más bajo y que la ley se había cumplido.',
      'En el cabildo hablaron setenta y dos personas. Los comerciantes temían perder clientes; los médicos mostraron cifras de accidentes de ciclistas; las personas con discapacidad recordaron que los andenes también estaban dañados. Nadie votó, pero la alcaldía se comprometió a responder cada propuesta por escrito.',
      'La marcha fue pacífica y numerosa. Un columnista escribió que protestar era irrespetar la decisión de las urnas. Una lectora le contestó al día siguiente que el voto elige gobernantes, no los vuelve dueños de la ciudad, y que la Constitución protege la protesta pacífica.',
      'Al terminar la marcha, los organizadores barrieron la plaza y entregaron un pliego con seis peticiones. La alcaldía aceptó tres y explicó por qué no podía cumplir las otras: dos dependían del gobierno departamental y una iba en contra de una norma sobre andenes. Esa respuesta, escrita y pública, se discutió durante varios días en la emisora. La obra comenzó con tres cambios: dos paradas más, andenes reparados y una veeduría con representantes de los transportadores y de los ciclistas. La investigación sobre el contrato sigue abierta.',
    ],
  };
  const Q = preg(BARRIO, 'sociales');
  return mundo('icf-sc-participacion', 'Participación y Control', 'sociales', [l1, l2, l3], [
    ['icf-sc-participacion-1', 'La revocatoria exige que haya pasado al menos un año de mandato.', Q('La iniciativa de los transportadores de revocar al alcalde no puede prosperar en ese momento porque:', ['Los alcaldes no pueden ser revocados', 'Solo el concejo puede revocar', 'El alcalde aún no cumple un año en el cargo', 'La marcha fue pacífica'], 2, 'La revocatoria sí procede contra alcaldes, pero después de un año; lleva cinco meses.', 'Busca cuánto tiempo lleva en el cargo y recuerda la condición de tiempo.')],
    ['icf-sc-participacion-1', 'En un cabildo abierto se delibera; no se vota la decisión.', Q('El cabildo abierto permitió principalmente que:', ['Los ciudadanos aprobaran la obra por votación', 'La comunidad expusiera sus posturas y recibiera respuesta', 'El alcalde dejara el cargo', 'Se modificara la Constitución'], 1, '«Nadie votó, pero la alcaldía se comprometió a responder»: se deliberó.', 'Lee el final del párrafo 4.')],
    ['icf-sc-participacion-2', 'Contraloría: dinero público. Procuraduría: conducta del funcionario.', Q('Frente a la denuncia sobre el contrato, a la Contraloría le corresponde establecer:', ['Si se causó un daño al dinero público', 'Si el secretario es buen conductor', 'Si el concejo debe cambiar', 'Si la ciclorruta es bonita'], 0, 'La Contraloría vigila los recursos públicos; la conducta del secretario la revisa la Procuraduría.', 'Recuerda qué pregunta hace cada organismo.')],
    ['icf-sc-participacion-2', 'Una investigación abierta no prueba una culpa.', Q('A partir del texto, sobre el secretario de obras se puede afirmar que:', ['Es culpable, porque hay denuncia', 'Es inocente, porque el precio era bajo', 'Fue retirado por la Procuraduría', 'Está siendo investigado y aún no hay decisión'], 3, 'La investigación sigue abierta: no hay condena ni absolución.', 'Lee la última oración del texto.')],
    ['icf-sc-participacion-3', 'La Constitución está por encima de las demás decisiones y protege derechos de todos.', Q('La lectora responde al columnista apoyándose en que:', ['La mayoría siempre tiene la razón', 'Protestar anula las elecciones', 'La Constitución protege la protesta pacífica aun contra decisiones de quien ganó', 'El columnista no votó'], 2, 'El voto elige, pero no quita derechos: la protesta pacífica tiene protección constitucional.', 'Relee lo que dice la lectora después de «que la Constitución».')],
    ['icf-sc-participacion-3', 'Para quitar un derecho de la Constitución habría que reformarla por sus caminos.', Q('Si el concejo quisiera prohibir toda protesta pacífica en la ciudad, la norma:', ['Sería válida, porque el concejo representa a la ciudad', 'Sería contraria a la Constitución, que está por encima de los acuerdos municipales', 'Sería válida si el alcalde la firma', 'Reformaría la Constitución en ese municipio'], 1, 'Un acuerdo municipal no puede contradecir la Constitución ni reformarla.', 'Compara la jerarquía de las dos normas.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-perspectivas.js
// Preicfes · Sociales y Ciudadanas · mundo 3 «Perspectivas e Intereses» (spec 2026-11-25-preicfes-estructura). Casos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const PLAYA = {
    id: 'icf-mangle', title: 'El manglar de Boca Grande',
    ficha: { autor: 'Grupo de sociales de grado once', fuente: 'Estudio de caso escolar', fecha: 'Marzo de 2026' },
    paras: [
      'Boca Grande es un pueblo de pescadores rodeado de manglar. Hace dos años, una empresa propuso construir un muelle turístico en la zona donde los mangles son más viejos. El proyecto prometía doscientos empleos, y la autoridad ambiental debía decidir si lo autorizaba. El pueblo se dividió, pero no en dos bandos, como suele contarse, sino en muchos más.',
      'Los pescadores se opusieron. Entre las raíces del mangle crecen los peces y los camarones de los que viven; sin ellas, la pesca bajaría en pocos años. Las piangüeras, mujeres que recogen conchas en el barro, compartían el temor, aunque agregaban otro: el muelle pasaría justo por donde trabajan, y nadie les había preguntado.',
      'Los jóvenes estaban repartidos. Muchos querían el muelle, porque estaban cansados de tener que irse a la ciudad para conseguir un sueldo. Otros respondían que los empleos serían para gente de afuera, con estudios de hotelería que allí nadie ofrece. Los dueños de las dos tiendas apoyaban el proyecto, pues esperaban más clientes.',
      'La empresa aseguraba que sembraría diez mangles por cada uno que cortara. La alcaldía, interesada en los impuestos que recibiría, pedía una decisión rápida. Una bióloga explicó que un mangle tarda unos veinte años en cumplir la función de los viejos y que, mientras tanto, la costa quedaría más expuesta al oleaje.',
      'En la reunión pública, una piangüera hizo la pregunta que cambió la discusión: «¿Por qué el muelle tiene que ir ahí?». Nadie había pensado en otra respuesta. Dos kilómetros al sur había una playa sin mangle. La empresa la había descartado porque costaba más llegar; los jóvenes, en cambio, vieron que el camino también daría trabajo.',
      'La autoridad negó el primer sitio y aceptó estudiar el segundo. No todos quedaron contentos: los tenderos lamentaron que los turistas no pasarían por el centro. Pero casi todos reconocieron algo. Cuando solo se pregunta «sí o no», cada quien defiende su posición; cuando se pregunta «para qué», aparecen los intereses, y a veces caben juntos.',
    ],
  };
  const l1 = leccion('icf-sc-perspectivas-1', 'Actores de un conflicto', guion(
    ['Actores', 'En un conflicto hay varios actores: personas, grupos, empresas, autoridades.'],
    ['Posición e interés', 'La posición es lo que piden; el interés, para qué lo piden.'],
    ['Coincidir por razones distintas', 'Dos actores pueden pedir lo mismo por motivos diferentes.'],
    ['Dentro de un grupo', 'No todos los jóvenes ni todos los comerciantes piensan igual.']), [
    x('voz-de-la-fuente', 'Ata cada interés al actor que lo tiene.', { ayuda: 'Tira un hilo desde cada interés hasta su actor.', doc: PLAYA, portadas: [['Los pescadores', 'actor'], ['La alcaldía', 'actor'], ['Los tenderos', 'actor'], ['Jóvenes a favor', 'actor']],
      ...T(['Que siga habiendo peces', 0, '¿Quién vive de lo que crece en las raíces?'], ['Recibir impuestos', 1, '¿Quién cobra por lo que se construye?'], ['Tener más clientes', 2, '¿Quién vende en el centro?'], ['Trabajar sin irse del pueblo', 3, '¿Quién está cansado de irse?']), bien: 'Cada quien, con su para qué.' },
      'Los peces son de los pescadores, los impuestos de la alcaldía, los clientes de los tenderos y el empleo cercano, de los jóvenes.', 'Busca en el texto por qué cada actor apoya o rechaza.'),
    x('genero-o-cita', '¿Es una **posición** (lo que piden) o un **interés** (para qué)?', { doc: PLAYA, rot: ['posición', 'interés'],
      ...F(['No al muelle', 0, '¿Dice qué quieren o para qué?'], ['Conservar el lugar donde trabajan', 1, '¿Dice qué quieren o para qué?'], ['Que se autorice ya', 0, '¿Dice qué quieren o para qué?'], ['Conseguir un sueldo en el pueblo', 1, '¿Dice qué quieren o para qué?']), bien: 'La posición se grita; el interés se pregunta.' },
      '«No al muelle» y «que se autorice» son posiciones; el trabajo y el sueldo son los intereses de fondo.', 'Pregunta «¿para qué?»: si ya lo responde, es un interés.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: PLAYA,
      ...F(['¿Qué temían las mujeres que recogen conchas?', 1, 'Busca el comienzo que habla de oponerse.'], ['¿Qué prometía la empresa sobre los árboles?', 3, 'Busca el comienzo que la nombra.'], ['¿Qué pregunta cambió la discusión?', 4, 'Busca el comienzo de la reunión.']),
      luz: [[2, 'nadie les había preguntado'], [4, 'sembraría diez mangles'], [5, '¿Por qué el muelle tiene que ir ahí?']], bien: 'Opositores, empresa y reunión.' },
      'La oposición abre el 2, la empresa el 4 y la reunión el 5.', 'Busca en los comienzos quién o qué momento se nombra.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PLAYA, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los jóvenes no piensan todos igual.', 1, 'No está con esas palabras: ¿qué querían unos y qué respondían otros?'], ['Los tenderos esperaban más clientes.', 0, 'Léela junto al final del párrafo 3.'], ['Sembrar diez no repone enseguida lo perdido.', 1, '¿Cuánto tarda un mangle en cumplir su función?'], ['La empresa es extranjera.', 2, '¿Alguna oración dice de dónde es?']),
      luz: [[3, 'esperaban más clientes'], [4, 'unos veinte años']], bien: 'Dentro de un grupo también hay diferencias.' },
      'Los clientes están escritos; la división de los jóvenes y la demora se deducen; el origen de la empresa no está.', 'Junta dos oraciones antes de decidir que algo no está.'),
    x('pinta-voces', 'Pinta cada razón con quien la da.', { doc: PLAYA, plumas: ['a favor del primer sitio', 'en contra'],
      ...P(['Daría empleos en el pueblo.', 0, '¿Con esa razón se acepta o se rechaza?'], ['Bajaría la pesca.', 1, '¿Con esa razón se acepta o se rechaza?'], ['Se recibirían impuestos.', 0, '¿Con esa razón se acepta o se rechaza?'], ['La costa quedaría expuesta al oleaje.', 1, '¿Con esa razón se acepta o se rechaza?'], ['Los empleos serían para gente de afuera.', 1, '¿Con esa razón se acepta o se rechaza?']), bien: 'Razones de dinero, de ambiente y de justicia.' },
      'Empleos e impuestos apoyan; la pesca, el oleaje y los empleos para otros van en contra.', 'Imagina que esa razón es cierta: ¿aceptarías el muelle ahí?'),
    x('balanza-tesis', 'Tesis: el segundo sitio reúne más intereses. ¿Qué hace cada dato?', { doc: PLAYA, tesis: 'El segundo sitio reúne más intereses',
      ...F(['Allí no hay mangle.', 0, '¿Protege lo que pedían los pescadores?'], ['El camino también daría trabajo.', 0, '¿Atiende lo que pedían los jóvenes?'], ['Los turistas no pasarían por el centro.', 1, '¿A quién deja por fuera?'], ['El pueblo se llama Boca Grande.', 2, '¿Cambia los intereses de alguien?']), bien: 'Reúne más, aunque no todos.' },
      'Sin mangle y con trabajo atiende a pescadores y jóvenes; deja por fuera a los tenderos; el nombre no pesa.', 'Mira a qué actor ayuda o perjudica cada dato.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que dice la **enseñanza** del caso.', { doc: PLAYA, nums: [6], apuesta: 'Preguntar «para qué» ayuda a encontrar salidas.', ...S(['6.3'], { '6.0': 'Cuenta qué decidió la autoridad.', '6.1': 'Cuenta quién quedó inconforme.', '6.2': 'Anuncia que hay algo que reconocer, sin decirlo.' }), bien: 'De las posiciones a los intereses.' },
      'La última oración opone «sí o no» a «para qué» y explica por qué a veces los intereses caben juntos.', 'Busca la oración que valdría para cualquier otro conflicto.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PLAYA, lineas: ['Un muelle dividió a un pueblo en muchos actores.', 'El pueblo tiene dos tiendas.', 'Cada actor tenía su interés.', 'Una pregunta abrió otra salida.', 'El otro sitio queda al sur.', 'Los intereses a veces caben juntos.'], ...S([1, 4], { 0: 'Es el conflicto.', 2: 'Es lo que explica las posturas.', 3: 'Es lo que cambió la discusión.', 5: 'Es la enseñanza.' }), bien: 'Conflicto, intereses, pregunta y enseñanza.' },
      'El número de tiendas y el punto cardinal son detalles del caso.', 'Deja lo que serviría para entender otro conflicto.'),
  ]);

  const MARCHA = {
    id: 'icf-vecinos', title: 'La casa de los recién llegados',
    ficha: { autor: 'Laura Benavides, antropóloga', fuente: 'Revista de divulgación social', fecha: 'Abril de 2026' },
    paras: [
      'En el barrio La Esperanza, la junta alquiló una casa vacía para alojar a doce familias que llegaron de otro país. Al mes, alguien pintó en la pared una frase que pedía que se fueran. Yo hacía allí un trabajo de campo y decidí preguntar, casa por casa y sin prisa, qué pensaban los vecinos.',
      'Don Elías me dijo que desde que llegaron hay más robos. Le pregunté si le habían robado. Respondió que no, pero que «esa gente es así». Busqué los datos de la inspección de policía: en los seis meses anteriores hubo catorce denuncias; en los seis siguientes, trece. La afirmación de don Elías no se apoyaba en un hecho. Era un prejuicio: un juicio hecho antes de conocer y aplicado a todo un grupo.',
      'Su vecina, Teresa, pensaba distinto. Ella misma llegó al barrio hace treinta años, desplazada por la violencia, y recuerda que entonces a su familia también la miraban mal. Su experiencia no prueba que los nuevos sean buenos o malos, pero le permite ponerse en su lugar.',
      'El pastor de la iglesia había organizado una colecta. Para él, ayudar es un mandato: en su manera de ver el mundo, el forastero es un enviado. Un comerciante colaboró por otro motivo; calculaba que doce familias son doce clientes. Ambos hicieron lo mismo, movidos por ideas muy diferentes de lo que está bien.',
      'También hablé con Génesis, una de las recién llegadas. Creía que los vecinos no saludaban porque la odiaban. Al contarle que en ese barrio casi nadie saluda antes de las diez, porque todos salen corriendo a trabajar, se rió. También ella había juzgado antes de conocer.',
      'Nadie ve el mundo desde ninguna parte. La edad, la fe, el oficio y lo que cada quien ha vivido forman una cosmovisión, un lente con el que se miran las cosas. El lente no es un defecto: todos lo llevamos. El problema empieza cuando se olvida que está ahí y se confunde con el paisaje.',
    ],
  };
  const l2 = leccion('icf-sc-perspectivas-2', 'Cosmovisiones y prejuicios', guion(
    ['Cosmovisión', 'Es la manera de ver el mundo: fe, oficio, edad, experiencia.'],
    ['Prejuicio', 'Un juicio hecho antes de conocer y aplicado a todo un grupo.'],
    ['Misma acción, otra razón', 'Dos personas pueden ayudar por motivos muy distintos.'],
    ['Comprobar', 'Un prejuicio se detecta al pedir el hecho que lo sostiene.']), [
    x('genero-o-cita', '¿Es un **prejuicio** o una afirmación que se puede **comprobar**?', { doc: MARCHA, rot: ['prejuicio', 'se puede comprobar'],
      ...F(['Esa gente es así', 0, '¿Habla de un hecho o de todo un grupo sin conocerlo?'], ['Hubo trece denuncias en seis meses', 1, '¿Habría un registro para verlo?'], ['Los jóvenes no respetan nada', 0, '¿Habla de un hecho o de todo un grupo?'], ['Llegaron doce familias', 1, '¿Se podría contar?'], ['Los ricos son tacaños', 0, '¿Habla de un hecho o de todo un grupo?']), bien: 'Todo un grupo, sin conocerlo.' },
      'Los prejuicios juzgan a un grupo entero; las denuncias y las familias se pueden contar.', 'Pregunta qué registro o conteo permitiría saber si es cierto.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: MARCHA,
      ...F(['presenta el caso', 0, 'Busca qué pasó en el barrio.'], ['muestra un prejuicio y lo contrasta con datos', 1, 'Busca las denuncias.'], ['muestra a quien se pone en el lugar del otro', 2, 'Busca a la vecina desplazada.'], ['compara dos motivos para ayudar', 3, 'Busca al pastor.'], ['muestra un prejuicio de quien llega', 4, 'Busca a Génesis.'], ['define y concluye', 5, 'Busca «cosmovisión».'], ['narra un robo', null, 'Ningún párrafo cuenta un robo.']),
      luz: [[1, 'doce familias'], [2, 'catorce denuncias'], [3, 'ponerse en su lugar'], [4, 'movidos por ideas muy diferentes'], [5, 'juzgado antes de conocer'], [6, 'una cosmovisión']], bien: 'Caso, prejuicio, empatía, motivos, otro prejuicio y concepto.' },
      'La autora va de persona en persona y al final nombra el concepto que las une.', 'Busca a quién se entrevista en cada párrafo.'),
    x('voz-de-la-fuente', 'Ata cada razón para actuar a quien la tiene.', { ayuda: 'Tira un hilo desde cada razón hasta su dueño.', doc: MARCHA, portadas: [['El pastor', 'vecino'], ['El comerciante', 'vecino'], ['Teresa', 'vecina'], ['Don Elías', 'vecino']],
      ...T(['Ayudar es un deber de fe', 0, '¿Quién ve al forastero como un enviado?'], ['Más familias, más ventas', 1, '¿Quién piensa en clientes?'], ['A mí también me pasó', 2, '¿Quién llegó hace treinta años?'], ['Los de afuera traen problemas', 3, '¿Quién habló de robos sin datos?']), bien: 'Fe, negocio, memoria y temor.' },
      'La fe es del pastor, el cálculo del comerciante, el recuerdo de Teresa y el temor de don Elías.', 'Busca qué experiencia o idea mueve a cada persona.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MARCHA, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Todos miran con algún lente.',
      ...T(['A don Elías lo habían robado.', 2, 'Busca qué respondió a la pregunta.'], ['El pastor y el comerciante ayudaron por lo mismo.', [8, 9], 'Busca qué los movía.'], ['Solo los vecinos juzgaron antes de conocer.', 13, 'Busca qué se dice de Génesis al final.']), bien: 'Cada opción, su oración.' },
      'A don Elías no lo habían robado, los motivos eran diferentes y Génesis también había juzgado.', 'Lee la oración completa donde aparece cada persona.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MARCHA, filas: [{ antes: 'Después de la llegada, las denuncias', topes: ['se duplicaron', 'casi no cambiaron', 'desaparecieron'], va: 1 }, { antes: 'Tener una cosmovisión es', topes: ['un defecto', 'un delito', 'algo de todos'], va: 2 }, { antes: 'Un prejuicio se forma', topes: ['antes de conocer', 'después de medir', 'por ley'], va: 0 }], mira: ['Compara catorce y trece.', 'Relee la última parte del párrafo 6.', 'Relee cómo se define en el párrafo 2.'], luz: [[2, 'catorce denuncias; en los seis siguientes, trece'], [6, 'todos lo llevamos'], [2, 'un juicio hecho antes de conocer']], bien: 'Dato, lente y definición.' },
      'De 14 a 13 casi no cambia; todos tienen un lente; el prejuicio es anterior a conocer.', 'Cada perilla tiene su frase exacta en el texto.'),
    x('balanza-tesis', 'Afirmación de don Elías: «desde que llegaron hay más robos». ¿Qué hace cada dato?', { doc: MARCHA, tesis: 'Desde que llegaron hay más robos',
      ...F(['Las denuncias pasaron de 14 a 13.', 1, '¿Hay más o menos?'], ['Se descubrió que muchos robos nuevos no se denunciaron.', 0, '¿Podría haber más de los que se ven?'], ['Una encuesta en el barrio halló menos robos que antes.', 1, '¿Apoya que haya más?'], ['La casa estaba vacía.', 2, '¿Dice algo de los robos?']), bien: 'Un dato nuevo puede obligar a revisar.' },
      'Menos denuncias y menos robos en la encuesta debilitan; robos sin denunciar podrían apoyarla; la casa vacía no pesa.', 'Olvida quién lo dijo: mira si el dato la hace más o menos creíble.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: MARCHA, texto: '|El lente| no es |un defecto|: |todos| lo llevamos. El problema empieza cuando se olvida que está ahí y se confunde con |el paisaje|.',
      ...T(['el «lo» de «lo llevamos»', 0, 'Pon en su lugar lo que ataste: ¿qué se lleva puesto?'], ['lo que «se olvida que está ahí»', 0, 'Pon en su lugar lo que ataste: ¿qué se olvida?']), bien: 'El lente, las dos veces.' },
      'Lo que todos llevamos y lo que se olvida es lo mismo: el lente con el que se mira.', 'Comprueba si lo que ataste se puede llevar y olvidar.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MARCHA, lineas: ['Una autora entrevista a un barrio dividido.', 'La frase estaba en la pared.', 'Un prejuicio no se apoya en hechos.', 'La misma acción puede tener motivos distintos.', 'Nadie saluda antes de las diez.', 'Todos miran con un lente y conviene recordarlo.'], ...S([1, 4], { 0: 'Es lo que hace la autora.', 2: 'Es el primer concepto.', 3: 'Es la comparación entre vecinos.', 5: 'Es la conclusión.' }), bien: 'Caso, conceptos y conclusión.' },
      'La pared y la hora del saludo son detalles; lo demás explica prejuicio y cosmovisión.', 'Deja los conceptos y el hilo del caso; quita los detalles.'),
  ]);

  const AGUA = {
    id: 'icf-represa', title: 'El turno del agua',
    ficha: { autor: 'Comité de riego de una vereda', fuente: 'Memoria comunitaria', fecha: 'Mayo de 2026' },
    paras: [
      'Cuando la quebrada baja poca agua, en la vereda El Cedro todos la necesitan al mismo tiempo. Las familias de arriba cultivan fresas; las de abajo crían ganado; en la mitad está la escuela. Durante una sequía, los de arriba cerraron la compuerta para llenar sus tanques, y a los de abajo no les llegó nada en once días.',
      'La primera solución fue de la alcaldía: multar a quien cerrara la compuerta. Nadie la aceptó, ni siquiera quienes pedían mano dura. Los de arriba la sintieron como un castigo por cuidar su cosecha; los de abajo dijeron que una multa no da de beber. Además, no había quién vigilara de noche.',
      'La segunda la propuso un ingeniero: construir un reservorio. Resolvía el problema de fondo, pero costaba más de lo que la vereda reúne en diez años y tardaría dos en estar listo. A los de abajo les pareció bien; a los de arriba, también, siempre que no fuera en sus tierras.',
      'La tercera salió de la escuela. Los estudiantes midieron el caudal durante una semana y dibujaron un horario: de noche, los tanques de arriba; al amanecer, la escuela; de día, los bebederos de abajo. No daba a nadie todo lo que pedía. Daba a cada uno lo que necesitaba en la hora en que lo necesitaba, porque las fresas pueden regarse de noche y las vacas no beben a oscuras.',
      'Aceptaron probarlo quince días. Hubo reclamos: una familia de arriba trabajaba en la ciudad y no podía abrir la llave a las diez. Se cambió con un vecino y todo siguió. El comité, formado por dos personas de cada sector, anotaba los incumplimientos en un cuaderno que cualquiera podía leer.',
      'El reservorio sigue siendo necesario, y la vereda ahorra para él. Pero el turno mostró que una solución no se acepta por ser la mejor en el papel, sino porque quienes deben cumplirla ayudaron a hacerla, ven que es justa y pueden comprobar que los demás también la cumplen.',
    ],
  };
  const l3 = leccion('icf-sc-perspectivas-3', 'Soluciones y quién las acepta', guion(
    ['¿A quién ayuda?', 'Cada solución atiende unos intereses y deja otros por fuera.'],
    ['¿Se puede hacer?', 'Una buena idea puede fallar por costo, por tiempo o porque nadie la vigila.'],
    ['¿La aceptan?', 'Se cumple más lo que se construyó entre todos.'],
    ['Corto y largo plazo', 'Un turno ayuda hoy; un reservorio, dentro de dos años.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: AGUA,
      ...F(['plantea el conflicto', 0, 'Busca lo que pasó en la sequía.'], ['muestra una solución que nadie aceptó', 1, 'Busca la multa.'], ['muestra una buena pero costosa', 2, 'Busca el reservorio.'], ['muestra la que repartió horas', 3, 'Busca a los estudiantes.'], ['cuenta cómo se ajustó', 4, 'Busca los reclamos.'], ['saca la enseñanza', 5, 'Busca por qué se acepta una solución.'], ['describe el sabor de las fresas', null, 'Nadie habla del sabor.']),
      luz: [[1, 'cerraron la compuerta'], [2, 'Nadie la aceptó'], [3, 'costaba más'], [4, 'dibujaron un horario'], [5, 'Hubo reclamos'], [6, 'ayudaron a hacerla']], bien: 'Conflicto, tres soluciones, ajuste y enseñanza.' },
      'El texto presenta el conflicto, prueba tres salidas, cuenta el ajuste y explica por qué una funcionó.', 'Busca «primera», «segunda» y «tercera» en los comienzos.'),
    x('genero-o-cita', '¿La solución se queda corta por **viabilidad** o por **falta de acuerdo**?', { doc: AGUA, rot: ['no es viable aún', 'no hay acuerdo'],
      ...F(['Cuesta lo de diez años', 0, '¿Falta dinero o falta que la acepten?'], ['La sienten como un castigo', 1, '¿Falta dinero o falta que la acepten?'], ['Tardaría dos años', 0, '¿Falta tiempo o falta que la acepten?'], ['No quieren que sea en sus tierras', 1, '¿Falta tiempo o falta que la acepten?']), bien: 'Poder hacerla y querer cumplirla.' },
      'El costo y la demora son de viabilidad; el castigo y las tierras, de acuerdo.', 'Pregunta si con más dinero o tiempo se resolvería.'),
    x('pinta-tipos', 'Pinta cada efecto con la dimensión que toca.', { doc: AGUA, plumas: ['económica', 'ambiental', 'social'],
      ...P(['Se pierde la cosecha de fresas.', 0, '¿Toca el dinero, la naturaleza o la convivencia?'], ['La quebrada se seca aguas abajo.', 1, '¿Toca el dinero, la naturaleza o la convivencia?'], ['Dos sectores dejan de hablarse.', 2, '¿Toca el dinero, la naturaleza o la convivencia?'], ['Construir vale lo de diez años.', 0, '¿Toca el dinero, la naturaleza o la convivencia?'], ['El comité reúne a los dos lados.', 2, '¿Toca el dinero, la naturaleza o la convivencia?']), bien: 'Un conflicto tiene varias dimensiones.' },
      'La cosecha y el costo son económicos, la quebrada es ambiental y el trato entre sectores, social.', 'Di qué se gana o se pierde: plata, naturaleza o relaciones.'),
    x('pasos-del-proceso', 'Ordena lo que pasó en El Cedro. El primer paso está en su puesto.', { que: 'lo que pasó', de: 'Del cierre al turno', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Cerraron la compuerta.', 'La alcaldía propuso multas.', 'Un ingeniero propuso un reservorio.', 'Los estudiantes propusieron turnos.', 'Se ajustaron los turnos tras los reclamos.'], mira: ['', 'Fue la reacción inicial de la autoridad.', 'Llegó después de una idea que nadie aceptó.', 'Salió de la escuela, después de otras dos.', 'Se ajusta lo que ya se está probando.'], bien: 'Cierre, multa, reservorio, turnos y ajuste.' },
      'Tras el cierre vienen tres propuestas en orden y, al probar la última, sus ajustes.', 'Guíate por «primera», «segunda» y «tercera».'),
    x('balanza-tesis', 'Tesis: el horario fue una solución justa. ¿Qué hace cada dato?', { doc: AGUA, tesis: 'El horario fue una solución justa',
      ...F(['Cada sector recibe en la hora que necesita.', 0, '¿Atiende las necesidades de todos?'], ['El cuaderno lo puede leer cualquiera.', 0, '¿Permite comprobar que todos cumplen?'], ['El comité lo formaban solo los de arriba.', 1, 'Si fuera cierto, ¿estarían todos representados?'], ['Se midió durante una semana.', 2, '¿Medir un tiempo lo hace más o menos justo?']), bien: 'Necesidad, control y representación.' },
      'Atender necesidades y poder comprobar apoyan; un comité de un solo lado debilitaría; la semana no decide la justicia.', 'Piensa en lo que haría que un grupo se sintiera excluido.'),
    x('sella-parrafo', '«El horario funcionó por todo esto, **EXCEPTO**:» Ata cada opción.', { doc: AGUA,
      ...T(['Las fresas pueden regarse de noche', 3, 'Busca por qué servía esa hora.'], ['Se permitió cambiar turnos', 4, 'Busca qué hizo la familia de la ciudad.'], ['Quienes lo cumplían ayudaron a hacerlo', 5, 'Busca por qué se acepta una solución.'], ['Había multas altas', 6, 'Las multas se nombran: ¿se aplicaron en el horario?']),
      luz: [[4, 'las fresas pueden regarse de noche'], [5, 'Se cambió con un vecino'], [6, 'ayudaron a hacerla']], bien: 'Las multas fueron de otra propuesta.' },
      'Las multas se propusieron y nadie las aceptó; las otras tres razones están en los párrafos 4, 5 y 6.', 'Mira de qué propuesta habla el texto cuando nombra cada cosa.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: AGUA, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El reservorio tardaría dos años.', 0, 'Léela junto al párrafo 3.'], ['El turno no reemplaza del todo al reservorio.', 1, '¿Por qué la vereda sigue ahorrando?'], ['Cada quien quería la obra lejos de lo suyo.', 2, '¿Eso se dice de todos o solo de los de arriba?'], ['El reservorio sigue siendo necesario.', 0, 'Léela junto al comienzo del párrafo 6.']),
      luz: [[3, 'tardaría dos'], [6, 'sigue siendo necesario']], bien: 'De un sector no se concluye sobre todos.' },
      'Los dos años y la necesidad están escritos; que el turno no baste se deduce; «cada quien» generaliza lo de un sector.', 'Cuidado con palabras como «cada quien» y «todos».'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: AGUA, lineas: ['Una sequía enfrentó a dos sectores.', 'La escuela está en la mitad.', 'La multa no se aceptó y el reservorio costaba mucho.', 'Un horario repartió el agua según la necesidad.', 'Faltó agua once días.', 'Se cumple lo que se construye entre todos.'], ...S([1, 4], { 0: 'Es el conflicto.', 2: 'Son las soluciones que no bastaron.', 3: 'Es la que funcionó.', 5: 'Es la enseñanza.' }), bien: 'Conflicto, intentos, solución y enseñanza.' },
      'La ubicación y los días son detalles; lo demás explica por qué una solución se acepta.', 'Deja lo que ayudaría a resolver otro conflicto.'),
  ]);

  const MERCADO = {
    id: 'icf-plazuela', title: 'La plazuela de las ventas',
    paras: [
      'En la plazuela San Roque trabajan unos noventa vendedores informales. La alcaldía quiere recuperar el espacio para instalar juegos y árboles, y les ofrece trasladarse a un centro comercial popular a ocho cuadras. El anuncio abrió una discusión que ya lleva cuatro meses.',
      'Los vendedores más antiguos rechazan el traslado. Dicen que sus clientes son los pasajeros del paradero y que nadie camina ocho cuadras por un jugo. Los más jóvenes están dispuestos a irse si les garantizan seis meses de arriendo gratis. Las madres del sector quieren los juegos, pero compran a diario en los puestos y temen que los precios suban.',
      'Los comerciantes con local apoyan la recuperación. Argumentan que pagan impuestos y que compiten con quien no los paga. Una líder de los vendedores les respondió que pagar no los hace dueños de la calle y que la informalidad no se escoge por gusto: se cae en ella cuando no hay otro empleo.',
      'Un concejal afirmó en la radio que «los vendedores son los culpables de los atracos». La Policía aclaró que las denuncias han bajado desde que el paradero tiene luz, hace un año, y que no hay registro de vendedores capturados por robo en el sector.',
      'La universidad presentó un estudio con tres alternativas. Trasladar a todos en un mes cuesta menos, pero en otras dos ciudades la mitad volvió a la calle antes del año. Dejar a la mitad, con puestos ordenados y horarios, libera espacio para los juegos. No hacer nada aplaza el problema y aumenta el desorden.',
      'La alcaldía citó una mesa con todos los sectores. La primera sesión terminó en gritos. En la segunda, una moderadora pidió que nadie dijera qué quería, sino para qué lo quería. Escribieron las respuestas en un tablero: trabajar, jugar sin peligro, caminar, vender lo mismo, respetar las reglas. Alguien notó que ninguna era contraria a las otras.',
    ],
  };
  const Q = preg(MERCADO, 'sociales');
  return mundo('icf-sc-perspectivas', 'Perspectivas e Intereses', 'sociales', [l1, l2, l3], [
    ['icf-sc-perspectivas-1', 'Dentro de un mismo grupo puede haber intereses distintos.', Q('Sobre los vendedores, del texto se concluye que:', ['Todos rechazan el traslado', 'Todos quieren irse ya', 'No tienen una sola postura frente al traslado', 'Prefieren pagar impuestos'], 2, 'Los antiguos lo rechazan y los jóvenes lo aceptarían con condiciones.', 'Compara a los antiguos con los jóvenes.')],
    ['icf-sc-perspectivas-1', 'La posición es lo que se pide; el interés, para qué.', Q('La moderadora logró avanzar porque pidió hablar de:', ['Los intereses, en lugar de las posiciones', 'Los precios, en lugar de los juegos', 'La ley, en lugar de la convivencia', 'El pasado, en lugar del futuro'], 0, 'Pidió decir «para qué», no «qué»: los intereses podían convivir.', 'Distingue entre qué se quiere y para qué.')],
    ['icf-sc-perspectivas-2', 'Un prejuicio se detecta al pedir el hecho que lo sostiene.', Q('La frase del concejal expresa un prejuicio porque:', ['La dijo en la radio', 'Culpa a todo un grupo sin un hecho que lo respalde', 'Habla de la plazuela', 'Contradice al alcalde'], 1, 'Generaliza a todos los vendedores, y la Policía no tiene registro que lo apoye.', 'Busca qué datos aclaró la Policía.')],
    ['icf-sc-perspectivas-2', 'La experiencia y el oficio influyen en lo que cada quien considera justo.', Q('Los comerciantes con local y la líder de los vendedores discrepan principalmente sobre:', ['El color de los juegos', 'La cantidad de pasajeros', 'La luz del paradero', 'Qué es justo en el uso de la calle y por qué existe la informalidad'], 3, 'Unos apelan a los impuestos; la otra, a que la calle es de todos y a la falta de empleo.', 'Lee las razones que da cada uno en el párrafo 3.')],
    ['icf-sc-perspectivas-3', 'Una solución se evalúa por sus efectos, no solo por su costo.', Q('Según el estudio, el principal riesgo de trasladar a todos en un mes es que:', ['Cueste más que las otras', 'Muchos vuelvan a la calle', 'No haya árboles', 'Aumente la luz'], 1, 'Cuesta menos, pero en otras ciudades la mitad regresó antes del año.', 'Busca el «pero» del párrafo 5.')],
    ['icf-sc-perspectivas-3', 'Una solución que reúne intereses tiene más probabilidad de aceptarse.', Q('La alternativa que atiende más intereses a la vez es:', ['Trasladar a todos', 'No hacer nada', 'Dejar a la mitad con orden y horarios, y abrir espacio para juegos', 'Cerrar el paradero'], 2, 'Combina venta ordenada y juegos, aunque habría que resolver qué pasa con la otra mitad; trasladar a todos hace que muchos regresen y no hacer nada aplaza el problema.', 'Compara cada alternativa con la lista del tablero.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-fuentes.js
// Preicfes · Sociales y Ciudadanas · mundo 4 «Fuentes y Argumentos» (spec 2026-11-25-preicfes-estructura). Fuentes inventadas para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const CARTA = {
    id: 'icf-carta-tren', title: 'Una carta, un mapa y un recibo',
    ficha: { autor: 'Taller de historia local', fuente: 'Cuaderno de una casa de la cultura', fecha: 'Marzo de 2026' },
    paras: [
      'En el desván de una casa de Puerto Sereno apareció una caja con tres papeles. El primero es una carta de 1926 en la que Clementina Rojas le cuenta a su hermana la llegada del tren: «Trajeron música y discursos. El gobernador dijo que desde hoy seremos ricos. Yo vi bajar a los peones por el lado donde no había música». El segundo es un mapa de la compañía del ferrocarril. El tercero, un recibo por la venta de un lote.',
      'Los tres son fuentes primarias: se hicieron en la época de los hechos, por gente que los vivió. Un libro escrito hoy sobre ese tren sería una fuente secundaria, porque estudia el pasado a partir de otras fuentes. Que una fuente sea primaria no la vuelve verdadera; la vuelve cercana. Clementina estuvo allí, pero miró desde un lugar.',
      'Para leerla hay que ponerla en su contexto. En aquellos años, el país recibió una indemnización por la pérdida de Panamá y muchos préstamos de bancos extranjeros. Con ese dinero se construyeron vías férreas y puertos para sacar el café. Los discursos de riqueza no eran una ocurrencia del gobernador: los repetían los periódicos de medio país.',
      'También hay que preguntar quién escribe, para quién y con qué fin. Clementina le escribe a su hermana, en privado; no tiene que quedar bien con nadie. El mapa, en cambio, lo hizo la compañía para atraer compradores: dibuja calles que nunca existieron. El recibo no opina. Solo dice que un campesino vendió por doce pesos un lote que, según otro papel, la compañía revendió por noventa al año siguiente.',
      'Ninguno de los tres cuenta la historia completa. La carta muestra que no todos celebraron; el mapa, lo que se prometía; el recibo, quién ganó. Juntos dicen más que cada uno por separado, y además se corrigen: los discursos prometen riqueza para todos y el recibo muestra quién se quedó con ella.',
      'La caja no tiene la voz de los peones. No sabían escribir o nadie guardó lo que escribieron. Ese silencio también es un dato. Un buen lector de fuentes no solo pregunta qué dicen los papeles, sino quién falta en ellos.',
    ],
  };
  const l1 = leccion('icf-sc-fuentes-1', 'Leer una fuente en su contexto', guion(
    ['Primaria o secundaria', 'Primaria: de la época, de quien lo vivió. Secundaria: un estudio posterior.'],
    ['Quién, para quién, para qué', 'Una carta privada y un aviso comercial no se leen igual.'],
    ['El contexto', 'Qué pasaba entonces en la economía, la política o la cultura.'],
    ['El silencio', 'También importa quién no aparece.']), [
    x('genero-o-cita', '¿Es fuente **primaria** o **secundaria** sobre el tren de 1926?', { doc: CARTA, rot: ['primaria', 'secundaria'],
      ...F(['La carta de Clementina', 0, '¿Es de la época y de quien lo vivió?'], ['Un libro de historia escrito hoy', 1, '¿Es de la época o la estudia después?'], ['El mapa de la compañía', 0, '¿Es de la época?'], ['Un documental de este año', 1, '¿Es de la época o la estudia después?'], ['El recibo del lote', 0, '¿Es de la época?']), bien: 'De la época o sobre la época.' },
      'La carta, el mapa y el recibo son de entonces; el libro y el documental estudian ese pasado.', 'Pregunta cuándo se hizo y si quien la hizo estuvo allí.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: CARTA,
      ...F(['presenta los tres papeles', 0, 'Busca la caja.'], ['define los tipos de fuente', 1, 'Busca «primarias» y «secundaria».'], ['da el contexto de la época', 2, 'Busca los préstamos.'], ['pregunta quién y para qué', 3, 'Busca con qué fin se hicieron.'], ['compara lo que aporta cada una', 4, 'Busca «juntos dicen más».'], ['señala quién falta', 5, 'Busca el silencio.'], ['describe un viaje en tren', null, 'Nadie cuenta un viaje.']),
      luz: [[1, 'una caja con tres papeles'], [2, 'fuentes primarias'], [3, 'ponerla en su contexto'], [4, 'quién escribe'], [5, 'Juntos dicen más'], [6, 'Ese silencio']], bien: 'Papeles, tipos, contexto, propósito, comparación y silencio.' },
      'El texto enseña a leer una fuente paso a paso, con tres papeles de ejemplo.', 'Lee el comienzo de cada párrafo y di qué pregunta responde.'),
    x('voz-de-la-fuente', 'Ata cada propósito a su fuente.', { ayuda: 'Tira un hilo desde cada propósito hasta su fuente.', doc: CARTA, portadas: [['La carta', 'fuente'], ['El mapa', 'fuente'], ['El recibo', 'fuente'], ['Un libro actual', 'fuente']],
      ...T(['contarle algo a alguien querido', 0, '¿Cuál es privada?'], ['atraer compradores', 1, '¿Cuál dibuja calles que no existieron?'], ['dejar constancia de una venta', 2, '¿Cuál no opina?'], ['explicar el pasado con otras fuentes', 3, '¿Cuál se hace mucho después?']), bien: 'Contar, vender, constar y explicar.' },
      'La carta cuenta en privado, el mapa vende, el recibo deja constancia y el libro explica.', 'Pregunta qué ganaba cada autor con su documento.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CARTA, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Las fuentes se corrigen unas a otras.',
      ...T(['Toda fuente primaria es verdadera.', 2, 'Busca qué la vuelve ser primaria.'], ['El mapa muestra las calles reales.', 6, 'Busca qué dibuja la compañía.'], ['Con la carta basta para saberlo todo.', [9, 11], 'Busca si alguno cuenta la historia completa.']), bien: 'Cercana no es verdadera.' },
      'Ser primaria la vuelve cercana, el mapa dibuja calles que no existieron y ninguno cuenta todo.', 'Saca la palabra clave: verdadera, calles, todo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CARTA, nums: [1, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El lote se vendió por doce pesos.', 0, 'Léela junto a lo que dice el recibo.'], ['La compañía ganó mucho con la reventa.', 1, 'Compara doce con noventa.'], ['Clementina desconfiaba de los discursos.', 1, '¿Qué vio ella mientras sonaba la música?'], ['Los peones hicieron una huelga.', 2, '¿Alguna oración la nombra?']),
      luz: [[4, 'vendió por doce pesos'], [1, 'por el lado donde no había música']], bien: 'Una imagen puede ser una crítica.' },
      'Los doce pesos están escritos; la ganancia y la desconfianza se deducen; la huelga no aparece.', 'Compara los números y piensa qué contrasta la carta.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica que esos discursos eran **propios de la época**, no solo del gobernador.', { doc: CARTA, nums: [3], apuesta: 'La idea de riqueza circulaba en todo el país.', ...S(['3.3'], { '3.0': 'Dice qué hay que hacer con la fuente.', '3.1': 'Da el origen del dinero.', '3.2': 'Dice en qué se gastó el dinero.' }), bien: 'Eso es poner una fuente en contexto.' },
      'La última oración dice que los repetían los periódicos de medio país.', 'Busca la oración que compara al gobernador con otros.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: CARTA, texto: '|La carta| se escribió en privado y |el mapa|, para vender. Este dibuja calles que no existieron; aquella no tiene que quedar bien con |nadie|.',
      ...T(['«Este»', 1, 'Pon en su lugar lo que ataste: ¿qué dibuja calles?'], ['«aquella»', 0, 'Pon en su lugar lo que ataste: ¿cuál es privada?']), bien: 'Este, el cercano; aquella, la lejana.' },
      'El que dibuja es el mapa; la que no tiene que quedar bien es la carta.', 'Comprueba con lo que cada documento hace.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CARTA, lineas: ['Una fuente primaria es cercana, no siempre verdadera.', 'La caja estaba en un desván.', 'Hay que preguntar quién, para quién y para qué.', 'El contexto ayuda a entenderla.', 'La hermana recibió la carta.', 'También importa quién no aparece.'], ...S([1, 4], { 0: 'Es la idea sobre el tipo de fuente.', 2: 'Es la pregunta por el propósito.', 3: 'Es el contexto.', 5: 'Es el silencio.' }), bien: 'Tipo, propósito, contexto y silencio.' },
      'El desván y la hermana son del caso; lo demás sirve para leer cualquier fuente.', 'Deja lo que usarías para leer otro documento.'),
  ]);

  const CIFRA = {
    id: 'icf-cifras-colegio', title: '¿Subió o bajó la violencia?',
    ficha: { autor: 'Equipo de periodismo de datos', fuente: 'Portal de verificación', fecha: 'Abril de 2026' },
    paras: [
      'Dos candidatos a la alcaldía de una misma ciudad publicaron, el mismo día, dos frases opuestas. «Los robos bajaron 20 %», dijo uno. «La inseguridad está peor que nunca», dijo la otra. Ambos citaron una fuente. Ninguno mintió en el dato que citó. ¿Cómo es posible?',
      'El primero usó las denuncias que recibe la Policía: pasaron de 5 000 a 4 000 en un año. Es una fuente oficial, completa y fácil de comparar. Pero solo cuenta lo que se denuncia. Ese año cerraron dos estaciones y denunciar por internet exigía llenar once páginas. Puede que hubiera menos robos; puede que hubiera menos denuncias. Con esa fuente sola es imposible distinguir una cosa de la otra.',
      'La segunda usó una encuesta: siete de cada diez personas dijeron sentirse inseguras. Las encuestas captan lo que no se denuncia, pero preguntan por una sensación, y la sensación cambia con las noticias. Además, esta se hizo por teléfono fijo, un aparato que ya casi solo conservan los mayores. Nadie preguntó a los jóvenes, que usan el transporte de noche, ni a quienes viven en arriendo.',
      'Una tercera fuente, menos citada, ayuda a decidir: las atenciones por heridas en robos en los hospitales. No dependen de que alguien quiera denunciar ni de cómo se sienta. Subieron 4 %. No sirven para contar robos sin heridos, que son la mayoría, pero indican que una caída del 20 % es poco probable.',
      'De esto no se concluye que las cifras no sirvan. Se concluye que cada fuente prueba unas cosas y no otras. Las denuncias prueban cuánto se denuncia; la encuesta, cómo se siente un grupo; los hospitales, los robos con heridos. Usar una para afirmar lo que no mide es un argumento débil, aunque el número sea exacto.',
      'Lo honesto habría sido decir: «Se denuncia menos, la gente se siente insegura y los robos con heridos subieron un poco; no sabemos si hubo más o menos robos». No cabe en un afiche. Pero gobernar no es hacer afiches, y votar bien exige preguntar de dónde sale cada número.',
    ],
  };
  const l2 = leccion('icf-sc-fuentes-2', 'Qué prueba y qué no una fuente', guion(
    ['Cada fuente mide algo', 'Las denuncias miden lo denunciado; una encuesta, lo que la gente dice.'],
    ['Límites', 'Toda fuente deja algo por fuera: hay que decirlo.'],
    ['Comparar', 'Dos fuentes independientes que coinciden pesan más.'],
    ['No decir de más', 'Un dato exacto puede sostener una conclusión equivocada.']), [
    x('voz-de-la-fuente', 'Ata cada cosa a la fuente que la puede probar.', { ayuda: 'Tira un hilo desde cada cosa hasta su fuente.', doc: CIFRA, portadas: [['Denuncias', 'fuente'], ['Encuesta', 'fuente'], ['Hospitales', 'fuente']],
      ...T(['Cuánta gente acudió a la Policía', 0, '¿Cuál cuenta lo que se reporta?'], ['Cuánta gente dice sentirse insegura', 1, '¿Cuál pregunta por una sensación?'], ['Cuántos robos dejaron heridos', 2, '¿Cuál atiende heridas?']), bien: 'Reportar, sentir y atender.' },
      'La Policía cuenta denuncias, la encuesta sensaciones y los hospitales, heridos.', 'Pregunta qué cosas se cuentan en cada lugar.'),
    x('genero-o-cita', '¿La conclusión **sale** de su fuente o **dice de más**?', { doc: CIFRA, rot: ['sale de la fuente', 'dice de más'],
      ...F(['Se recibieron 1 000 denuncias menos', 0, '¿Es justo lo que se contó?'], ['Hubo 20 % menos robos', 1, '¿Las denuncias cuentan todos los robos?'], ['Siete de cada diez encuestados se sienten inseguros', 0, '¿Es justo lo que se preguntó?'], ['La ciudad es más peligrosa que nunca', 1, '¿La encuesta compara con todos los años?']), bien: 'Contar no es lo mismo que concluir.' },
      'Las denuncias y las respuestas se contaron; los robos totales y el «nunca» van más allá.', 'Compara cada conclusión con lo que la fuente mide de verdad.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: CIFRA,
      ...F(['¿Por qué pudo bajar la cifra de denuncias?', 1, 'Busca el comienzo que nombra a la Policía.'], ['¿A quiénes se llamó en la encuesta?', 2, 'Busca el comienzo que nombra la encuesta.'], ['¿Qué habría sido honesto decir?', 5, 'Busca el comienzo que habla de honestidad.']),
      luz: [[2, 'cerraron dos estaciones'], [3, 'por teléfono fijo'], [6, 'Lo honesto habría sido']], bien: 'Policía, encuesta y honestidad.' },
      'Las denuncias están en el 2, la encuesta en el 3 y lo honesto en el 6.', 'Busca en los comienzos la fuente o la palabra clave.'),
    x('balanza-tesis', 'Tesis: «los robos bajaron 20 %». ¿Qué hace cada dato?', { doc: CIFRA, tesis: 'Los robos bajaron 20 %',
      ...F(['Las denuncias bajaron de 5 000 a 4 000.', 0, '¿La apoya o la pone en duda?'], ['Cerraron dos estaciones donde se denunciaba.', 1, '¿Podría explicar la baja de otra manera?'], ['Las heridas por robo subieron 4 %.', 1, '¿Va en la misma dirección que la tesis?'], ['El afiche era amarillo.', 2, '¿Eso mide cuántos robos hubo?']), bien: 'Otra explicación y otra fuente la debilitan.' },
      'Las denuncias la apoyan; el cierre ofrece otra causa y los hospitales van al contrario; el afiche no pesa.', 'Supón cierto cada dato: ¿creerías más o menos en la caída?'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CIFRA, filas: [{ antes: 'Los candidatos, en el dato que citaron,', topes: ['mintieron', 'no mintieron', 'copiaron mal'], va: 1 }, { antes: 'Los hospitales cuentan', topes: ['todos los robos', 'ningún robo', 'robos con heridos'], va: 2 }, { antes: 'De los robos totales', topes: ['no se sabe', 'bajaron', 'subieron'], va: 0 }], mira: ['Relee el final del párrafo 1.', 'Relee para qué no sirven en el párrafo 4.', 'Relee la frase honesta del párrafo 6.'], luz: [[1, 'Ninguno mintió'], [5, 'los robos con heridos'], [6, 'no sabemos si hubo más o menos robos']], bien: 'Dato exacto, conclusión dudosa.' },
      'Ninguno mintió en el dato, los hospitales cuentan robos con heridos y del total no se sabe.', 'Busca la oración exacta que pone el límite.'),
    x('pinta-tipos', 'Pinta cada límite con su fuente.', { doc: CIFRA, plumas: ['denuncias', 'encuesta', 'hospitales'],
      ...P(['Deja por fuera lo que nadie reporta.', 0, '¿A cuál le falta lo que no se cuenta a la Policía?'], ['Depende de cómo se siente la gente.', 1, '¿A cuál la mueven las noticias?'], ['No ve los robos sin golpes.', 2, '¿A cuál llegan solo los lastimados?'], ['Llamó casi solo a personas mayores.', 1, '¿Cuál usó teléfono fijo?'], ['Baja si denunciar se vuelve difícil.', 0, '¿Cuál depende de un trámite?']), bien: 'Toda fuente tiene su límite.' },
      'Lo no reportado y el trámite limitan las denuncias; la sensación y el teléfono, la encuesta; los golpes, los hospitales.', 'Pregunta qué casos se le escapan a cada fuente.'),
    x('bisagras', 'Pon en cada hueco la palabra que une. Sobran dos.', { doc: CIFRA, pares: [['Es una fuente oficial y completa.', 'solo cuenta lo que se denuncia.'], ['No dependen de que alguien denuncie;', 'sirven para comparar.'], ['La sensación cambia', 'las noticias la mueven.']],
      ...F(['Pero', 0, 'Limita: ¿dónde se reconoce algo y luego se le pone un tope?'], ['por eso', 1, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['porque', 2, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['Es decir,', null, 'Repetiría lo mismo: ninguna pareja repite.'], ['para que', null, 'Anunciaría un propósito: aquí nadie lo busca.']), bien: 'Tope, resultado y causa.' },
      'A la fuente se le pone un tope, su independencia trae una utilidad y las noticias explican la sensación.', 'Di qué hace la segunda idea: limita, resulta o explica.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CIFRA, lineas: ['Dos candidatos usan datos ciertos para decir lo contrario.', 'Había once páginas.', 'Cada fuente mide una cosa y deja otra por fuera.', 'Comparar fuentes ayuda a decidir.', 'El teléfono era fijo.', 'Concluir más de lo que se mide es un argumento débil.'], ...S([1, 4], { 0: 'Es el problema.', 2: 'Es la idea central.', 3: 'Es lo que hace la tercera fuente.', 5: 'Es la conclusión.' }), bien: 'Problema, idea, comparación y conclusión.' },
      'Las páginas y el teléfono son detalles; lo demás sirve para evaluar cualquier cifra.', 'Deja lo que ayudaría a revisar otra noticia.'),
  ]);

  const DISCURSO = {
    id: 'icf-dibujo', title: 'El dibujo del balcón',
    ficha: { autor: 'Curso de medios y sociedad', fuente: 'Guía de lectura crítica de imágenes', fecha: 'Mayo de 2026' },
    paras: [
      'La caricatura apareció en un periódico regional el día en que el gobierno anunció que bajaría el precio de la gasolina. En ella, un funcionario sonriente lanza desde un balcón un billete diminuto atado a un globo. Abajo, una multitud salta para alcanzarlo. Detrás del balcón se ve una habitación llena de bolsas marcadas con la palabra «impuestos». Al pie dice: «¡Cójanlo entre todos!».',
      'Una caricatura es un argumento con dibujos. No busca informar, sino hacer ver. Para eso exagera: el billete no es pequeño, es ridículo; la multitud no es grande, es inmensa. Con esa desproporción, el dibujante opina que el alivio es mínimo frente a lo que la gente paga.',
      'También usa símbolos. El balcón es el poder, que está arriba y lejos. El globo recuerda las promesas, que se inflan y se van. La frase es irónica: suena generosa y dice lo contrario. Quien no conozca el anuncio sobre la gasolina verá una escena graciosa, pero no entenderá de qué se ríe: sin contexto no hay caricatura.',
      'Ese mismo día, el funcionario pronunció un discurso. Dijo: «Hoy empieza una nueva era. Los que nos critican son los de siempre, los que nunca han hecho nada por este país. El pueblo sabe quién está con él». El discurso también es un argumento, aunque no tenga dibujos. Promete una era, divide el mundo entre «los de siempre» y «el pueblo», y en lugar de responder a una crítica descalifica a quienes la hacen.',
      'Ni la caricatura ni el discurso son neutrales, y no tienen por qué serlo. La pregunta no es si opinan, sino cómo. El dibujante exagera un dato que se puede revisar: cuánto baja el precio y cuánto se paga en impuestos. El funcionario no da ninguno. Uno invita a comparar; el otro, a escoger un bando.',
      'Leer imágenes y discursos exige las mismas preguntas: ¿qué muestra?, ¿qué exagera?, ¿a quién deja mal parado?, ¿qué tendría que ser cierto para que tenga razón? Quien las hace no deja de reírse ni de emocionarse. Solo lo hace sabiendo por qué.',
    ],
  };
  const l3 = leccion('icf-sc-fuentes-3', 'Caricaturas y discursos', guion(
    ['Exagerar para opinar', 'Una caricatura agranda o encoge lo que quiere criticar.'],
    ['Símbolos', 'Un balcón puede ser el poder; un globo, una promesa.'],
    ['Ironía', 'Dice una cosa para que se entienda la contraria.'],
    ['Discursos', 'Mira qué promete, a quién divide y si responde con razones o ataca a la persona.']), [
    x('voz-de-la-fuente', 'Ata cada idea al elemento que la representa.', { ayuda: 'Tira un hilo desde cada idea hasta el elemento del dibujo.', doc: DISCURSO, portadas: [['El balcón', 'elemento'], ['El globo', 'elemento'], ['El billete diminuto', 'elemento'], ['Las bolsas', 'elemento']],
      ...T(['el poder, lejos de la gente', 0, '¿Qué está arriba?'], ['las promesas que se van', 1, '¿Qué se infla?'], ['un alivio mínimo', 2, '¿Qué es ridículamente pequeño?'], ['lo que la gente paga', 3, '¿Qué está detrás y marcado?']), bien: 'Cada objeto opina.' },
      'El balcón es el poder, el globo la promesa, el billete el alivio y las bolsas, los impuestos.', 'Pregunta qué tiene de particular cada objeto: su lugar, su tamaño o su rótulo.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: DISCURSO,
      ...F(['describe el dibujo', 0, 'Busca lo que se ve.'], ['explica la exageración', 1, 'Busca la desproporción.'], ['explica símbolos e ironía', 2, 'Busca el globo y la frase.'], ['analiza un discurso', 3, 'Busca lo que dijo el funcionario.'], ['compara los dos', 4, 'Busca «Ni… ni…».'], ['deja preguntas para leer', 5, 'Busca los signos de interrogación.'], ['cuenta la vida del dibujante', null, 'No se cuenta su vida.']),
      luz: [[1, 'un funcionario sonriente'], [2, 'exagera'], [3, 'usa símbolos'], [4, 'pronunció un discurso'], [5, 'Ni la caricatura ni el discurso'], [6, '¿qué exagera?']], bien: 'Describir, exagerar, simbolizar, analizar, comparar y preguntar.' },
      'El texto describe el dibujo, explica sus recursos, analiza el discurso, los compara y deja preguntas.', 'Di qué hace cada párrafo con el dibujo o el discurso.'),
    x('genero-o-cita', 'Si un discurso dijera esto, ¿**daría razones** o **descalificaría** a alguien?', { doc: DISCURSO, rot: ['da razones', 'descalifica'],
      ...F(['Los que critican son los de siempre', 1, '¿Responde a la crítica o habla de quien la hace?'], ['El precio baja doscientos pesos por galón', 0, '¿Da un dato o habla de alguien?'], ['Nunca han hecho nada por el país', 1, '¿Responde a la crítica o habla de quien la hace?'], ['El costo se cubrirá con otro ahorro', 0, '¿Explica algo o habla de alguien?']), bien: 'Contestar la idea o atacar a quien la dice.' },
      'El precio y el costo son razones; «los de siempre» y «nunca han hecho nada» atacan a las personas.', 'Pregunta si la frase habla del tema o de quien opina.'),
    x('pinta-tipos', 'Pinta cada parte con el recurso que usa.', { doc: DISCURSO, plumas: ['exageración', 'símbolo', 'ironía'],
      ...P(['Una multitud inmensa tras un billete.', 0, '¿Agranda, representa otra cosa o dice lo contrario?'], ['Un globo que se va por el aire.', 1, '¿Agranda, representa otra cosa o dice lo contrario?'], ['«¡Cójanlo entre todos!»', 2, '¿Agranda, representa otra cosa o dice lo contrario?'], ['Un balcón muy arriba.', 1, '¿Agranda, representa otra cosa o dice lo contrario?']), bien: 'Tamaño, objeto y frase.' },
      'La multitud exagera, el globo y el balcón simbolizan y la frase generosa es irónica.', 'Mira si cambia el tamaño, si el objeto significa algo más o si la frase se burla.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: DISCURSO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Sin contexto no se entiende la caricatura.', 0, 'Léela junto al final del párrafo 3.'], ['El discurso no ayuda a saber si el alivio es suficiente.', 1, '¿Qué datos da, según la comparación?'], ['El dibujante fue despedido.', 2, '¿Se dice qué pasó con él?'], ['Con las cifras de la gasolina se sabría si la caricatura es justa.', 1, '¿Qué se puede revisar de ella?']),
      luz: [[3, 'sin contexto no hay caricatura'], [5, 'un dato que se puede revisar'], [5, 'El funcionario no da ninguno']], bien: 'Opinar con algo que se pueda revisar.' },
      'El contexto está escrito; lo que aclaran las cifras y lo que le falta al discurso se deducen; el despido se inventa.', 'Junta lo que se dice de cada uno en el párrafo 5.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 2 la oración que dice **qué opina** el dibujante.', { doc: DISCURSO, nums: [2], apuesta: 'El alivio es muy poco frente a lo que se paga.', ...S(['2.3'], { '2.0': 'Define qué es una caricatura.', '2.1': 'Dice qué busca una caricatura.', '2.2': 'Muestra cómo exagera.' }), bien: 'La desproporción opina.' },
      'La última oración une la desproporción con la opinión: el alivio es mínimo.', 'Busca la oración que pasa de lo que se ve a lo que piensa el autor.'),
    x('balanza-tesis', 'Lo que opina la caricatura: el alivio es mínimo. ¿Qué hace cada dato?', { doc: DISCURSO, tesis: 'El alivio es mínimo frente a lo que se paga',
      ...F(['La gasolina bajó 1 % y los impuestos son el 30 %.', 0, '¿Es poco o mucho?'], ['Con la baja, el pasaje de bus se redujo a la mitad.', 1, '¿El alivio fue pequeño?'], ['El dibujo es en blanco y negro.', 2, '¿Cambia el alivio?']), bien: 'Se revisa con datos.' },
      'Un 1 % apoya; que el pasaje bajara a la mitad debilita; el color no pesa.', 'Compara el tamaño del alivio con lo que se paga.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: DISCURSO, lineas: ['Una caricatura opina exagerando y con símbolos.', 'El periódico era regional.', 'La ironía dice lo contrario.', 'Un discurso puede descalificar en vez de responder.', 'El funcionario sonríe.', 'Conviene preguntar qué tendría que ser cierto.'], ...S([1, 4], { 0: 'Es la idea sobre la caricatura.', 2: 'Es otro recurso.', 3: 'Es la idea sobre el discurso.', 5: 'Es la pregunta para leerlos.' }), bien: 'Recursos, discurso y pregunta.' },
      'El periódico y la sonrisa son detalles; lo demás sirve para cualquier caricatura o discurso.', 'Deja lo que usarías para leer otra imagen.'),
  ]);

  const PLAZA = {
    id: 'icf-fuentes-mina', title: 'Tres voces sobre una mina',
    paras: [
      'En 1974 abrió una mina de carbón en el municipio de Las Lajas y en 2001 cerró. Un grupo de estudiantes reunió fuentes para contar qué cambió en el pueblo. La primera fue un folleto de la empresa, impreso en 1975: «Llegó el progreso. Cada familia tendrá empleo, escuela y hospital». Lo acompañan fotos a color de niños con uniforme nuevo.',
      'La segunda fue una entrevista a Hermelinda Ortiz, de ochenta y un años, hecha este año. Recuerda que hubo empleo para los hombres, que su marido murió de los pulmones a los cuarenta y cuatro y que el hospital «fue un consultorio con una cama». También dijo que nunca volvió a ver el pueblo tan alegre como en aquellos años.',
      'La tercera fue un libro publicado en 2010 por una economista. Con archivos de la alcaldía muestra que los ingresos del municipio se multiplicaron por seis, que la mitad de los obreros venía de otras regiones y que, dos años después del cierre, la población se había reducido a la tercera parte.',
      'Los estudiantes pegaron además una caricatura de 1979, sacada de un periódico sindical: un hombre gordo, con el casco de la empresa, sopla un pastel que dice «cinco años»; los invitados, de cara tiznada, tosen en lugar de cantar.',
      'En clase discutieron cuál fuente era «la verdadera». Una estudiante sostuvo que el libro, porque trae cifras. Otro, que la entrevista, porque la señora lo vivió. La profesora preguntó qué podía probar cada una y qué no. Hicieron una tabla. El folleto probaba lo que la empresa quería que se creyera; la entrevista, cómo lo vivió una mujer; el libro, cómo cambiaron las cuentas y la población; la caricatura, qué reclamaban los obreros.',
      'Al final escribieron un texto de una página. La última línea decía: «La mina trajo dinero y se llevó gente; según a quién se le pregunte, fue las dos cosas o solo una de ellas».',
    ],
  };
  const Q = preg(PLAZA, 'sociales');
  return mundo('icf-sc-fuentes', 'Fuentes y Argumentos', 'sociales', [l1, l2, l3], [
    ['icf-sc-fuentes-1', 'Secundaria: estudia el pasado a partir de otras fuentes.', Q('De las fuentes reunidas, es secundaria:', ['El folleto de 1975', 'La caricatura de 1979', 'El libro de 2010', 'Ninguna de ellas'], 2, 'El libro estudia lo ocurrido con archivos; el folleto y la caricatura son de la época.', '¿Cuál se hizo después, a partir de otros documentos?')],
    ['icf-sc-fuentes-1', 'Pregunta quién hizo la fuente y para qué.', Q('El folleto de la empresa debe leerse con cuidado principalmente porque:', ['Tiene fotos a color', 'Su propósito era mostrar el proyecto de forma favorable', 'Es muy antiguo', 'No habla de niños'], 1, 'La empresa quería que se creyera en el progreso que prometía.', 'Piensa qué ganaba la empresa con el folleto.')],
    ['icf-sc-fuentes-2', 'Cada fuente prueba unas cosas y no otras.', Q('El libro de la economista NO permite saber:', ['Cómo cambiaron los ingresos del municipio', 'De dónde venían los obreros', 'Cuánto se redujo la población', 'Cómo se sintió una familia al perder a alguien'], 3, 'El libro trabaja con cuentas y población; lo vivido por una familia lo da la entrevista.', 'Busca la opción que no se puede contar con archivos.')],
    ['icf-sc-fuentes-2', 'Un solo testimonio no permite generalizar.', Q('A partir de la entrevista, sería un error concluir que:', ['El marido de Hermelinda murió joven', 'Todas las familias del pueblo lo vivieron igual', 'Hermelinda recuerda alegría y pérdida', 'El hospital prometido fue pequeño, según ella'], 1, 'Es la voz de una persona: no prueba lo que vivieron todas.', 'Cuidado con la palabra «todas».')],
    ['icf-sc-fuentes-3', 'La caricatura opina con contraste y exageración.', Q('En la caricatura, que los invitados tosan en lugar de cantar critica:', ['La falta de música en las fiestas', 'El daño a la salud de los obreros mientras la empresa celebra', 'El precio de los pasteles', 'La edad de los invitados'], 1, 'Las caras tiznadas y la tos señalan el daño de la mina; la empresa celebra su aniversario.', 'Une la tos, las caras tiznadas y el pastel.')],
    ['icf-sc-fuentes-3', 'Un texto que reúne voces no las borra: las muestra.', Q('La última línea del texto de los estudiantes expresa que:', ['La mina fue mala para todos', 'La mina fue buena para todos', 'La valoración depende de la perspectiva de cada fuente', 'No se puede saber nada del pasado'], 2, '«Según a quién se le pregunte»: las fuentes miran desde lugares distintos.', 'Fíjate en la expresión «según a quién».')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-sistemico.js
// Preicfes · Sociales y Ciudadanas · mundo 5 «Problemas Complejos» (spec 2026-11-25-preicfes-estructura). Casos inventados para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BASURA = {
    id: 'icf-quebrada', title: 'La quebrada que se desborda',
    ficha: { autor: 'Equipo de una emisora comunitaria', fuente: 'Serie «Preguntas del barrio»', fecha: 'Marzo de 2026' },
    paras: [
      'En abril la quebrada La Honda se desbordó por tercera vez en cinco años y dejó barro en ciento veinte casas. «Fue el aguacero», dijeron muchos. Tenían razón a medias. Ese día llovió fuerte, pero en 1998 llovió más y no pasó nada. El aguacero fue lo que disparó el desborde; no explica por qué ahora sí.',
      'Las causas de fondo se fueron juntando. Cuando la fábrica de tejidos cerró, llegaron familias sin empleo que construyeron en la ladera, donde el suelo era barato. Para hacer las casas se cortaron árboles; sin raíces, la tierra se suelta y baja hasta el cauce. Además, el camión de la basura no sube hasta allá, así que una parte termina en el agua y tapa el paso.',
      'Las consecuencias también vienen en cadena. Con el barro se cerró la escuela dos semanas. Sin clases, varias madres dejaron de ir a trabajar para cuidar a los hijos. Con menos ingresos, algunas familias se atrasaron en el arriendo y se mudaron más arriba, a la ladera, donde es más barato. Así, una consecuencia del desborde se volvió una nueva causa.',
      'En la reunión del barrio, un líder propuso un culpable: «Esto es por los que llegaron». Una vecina le respondió que ellos no cerraron la fábrica ni decidieron por dónde sube el camión. Que dos cosas ocurran juntas no significa que una sea la única causa de la otra. Además, señalar a un grupo suele tapar las decisiones que nadie quiere revisar.',
      'La ingeniera de la alcaldía llevó un mapa con flechas. En él, casi ninguna flecha salía de un solo lugar. Empleo, vivienda, bosque, basura y lluvia se empujaban unos a otros. «Si solo hacemos un muro», advirtió, «el agua pasará, pero volverá a taparse».',
      'Acordaron tres cosas: una ruta de recolección que suba, sembrar con las familias en las zonas de mayor riesgo y reubicar a las veinte casas que están dentro del cauce. El muro quedó para el final. Nadie cree que esto evite todos los aguaceros. La idea es que un aguacero vuelva a ser solo un aguacero.',
    ],
  };
  const l1 = leccion('icf-sc-sistemico-1', 'Causas y consecuencias', guion(
    ['Detonante y causa de fondo', 'El detonante dispara; las causas de fondo explican por qué esta vez sí.'],
    ['Varias causas', 'Los problemas sociales casi nunca tienen una sola.'],
    ['En cadena y en círculo', 'Una consecuencia puede volverse una nueva causa.'],
    ['Juntas no es por', 'Que dos cosas pasen a la vez no prueba que una cause la otra.']), [
    x('genero-o-cita', '¿Es el **detonante** o una **causa de fondo**?', { doc: BASURA, rot: ['detonante', 'causa de fondo'],
      ...F(['El aguacero de ese día', 0, '¿Disparó el hecho o lo venía preparando?'], ['Casas en la ladera sin árboles', 1, '¿Disparó el hecho o lo venía preparando?'], ['El camión no sube por la basura', 1, '¿Disparó el hecho o lo venía preparando?'], ['El cierre de la fábrica', 1, '¿Disparó el hecho o lo venía preparando?']), bien: 'Lo que dispara y lo que prepara.' },
      'El aguacero disparó el desborde; la ladera, la basura y el cierre lo fueron preparando.', 'Pregunta si ocurrió ese día o si venía de tiempo atrás.'),
    x('pasos-del-proceso', 'Ordena la cadena. El primer paso está en su puesto.', { doc: BASURA, que: 'la cadena', de: 'Del cierre al desborde', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Cierra la fábrica.', 'Llegan familias a la ladera.', 'Se cortan árboles.', 'La tierra baja al cauce.', 'Un aguacero lo desborda.'], mira: ['', 'Llegan cuando ya no hay empleo.', 'Se cortan para construir las casas.', 'La tierra se suelta cuando faltan raíces.', 'Es lo que dispara al final.'], bien: 'Cierre, ladera, tala, tierra y desborde.' },
      'El cierre lleva familias a la ladera, se tala, la tierra baja y el aguacero desborda.', 'Busca en el párrafo 2 qué pasó antes y qué después.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: BASURA,
      ...F(['cuenta el hecho y separa el detonante', 0, 'Busca el desborde.'], ['explica las causas de fondo', 1, 'Busca lo que se fue juntando.'], ['sigue las consecuencias', 2, 'Busca la escuela.'], ['discute una explicación simple', 3, 'Busca el culpable.'], ['muestra cómo se conectan', 4, 'Busca el mapa.'], ['cuenta lo que acordaron', 5, 'Busca las tres cosas.'], ['narra la historia de la fábrica', null, 'La fábrica solo se nombra.']),
      luz: [[1, 'lo que disparó el desborde'], [2, 'Las causas de fondo'], [3, 'Las consecuencias'], [4, 'un culpable'], [5, 'un mapa con flechas'], [6, 'Acordaron tres cosas']], bien: 'Hecho, causas, consecuencias, crítica, mapa y acuerdo.' },
      'Va del hecho a las causas, las consecuencias, una explicación simple, el mapa y el acuerdo.', 'Busca en el comienzo de cada párrafo de qué se ocupa.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: BASURA, texto: '|El líder| señaló a |los recién llegados|. Una vecina le respondió que ellos no cerraron la fábrica.',
      ...T(['«le»', 0, 'Pon en su lugar lo que ataste: ¿a quién respondió?'], ['«ellos»', 1, 'Pon en su lugar lo que ataste: ¿quiénes no la cerraron?']), bien: 'El líder y los recién llegados.' },
      'La vecina le responde al líder y «ellos» son los que llegaron al barrio.', 'Mira si la palabra nombra a uno o a varios.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: BASURA, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['En 1998 llovió más y no se desbordó.', 0, 'Léela junto al párrafo 1.'], ['Algo cambió en la quebrada después de 1998.', 1, '¿Por qué con más lluvia no pasó nada?'], ['El problema puede repetirse con más fuerza.', 1, '¿Adónde se mudan las familias después?'], ['La alcaldía ocultó el mapa.', 2, '¿Alguna oración lo dice?']),
      luz: [[1, 'en 1998 llovió más'], [3, 'a la ladera'], [3, 'una nueva causa']], bien: 'Comparar dos fechas descubre causas.' },
      '1998 está escrito; que algo cambió y que puede repetirse se deducen; ocultar el mapa se inventa.', 'Compara los dos aguaceros y sigue el círculo del párrafo 3.'),
    x('balanza-tesis', 'Afirmación: «la única causa es la lluvia». ¿Qué hace cada dato?', { doc: BASURA, tesis: 'La única causa es la lluvia',
      ...F(['Con una lluvia mayor, años atrás, no pasó nada.', 1, '¿Bastó la lluvia esa vez?'], ['Otra quebrada limpia y con bosque no se desbordó ese día.', 1, '¿Le llovió también?'], ['Todas las quebradas de la región se desbordaron, sin importar su estado.', 0, 'Si fuera así, ¿qué explicaría todo?'], ['La reunión fue un martes.', 2, '¿Dice algo de las causas?']), bien: 'Comparar casos prueba causas.' },
      'Que no pasara con más lluvia o con bosque la debilita; que todas se desbordaran la apoyaría; el martes no pesa.', 'Pregunta qué cambia entre los casos que se desbordan y los que no.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: BASURA, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'El desborde tiene varias causas conectadas.',
      ...T(['Los recién llegados cerraron la fábrica.', 1, 'Busca qué no hicieron ellos.'], ['Un muro bastaría para siempre.', 7, 'Busca qué advirtió la ingeniera.'], ['El acuerdo evitará todos los aguaceros.', 10, 'Busca qué cree la gente del acuerdo.']), bien: 'Una oración desmiente cada una.' },
      'Ellos no la cerraron, el muro volvería a taparse y nadie cree que evite todos los aguaceros.', 'Saca la palabra clave: fábrica, muro, aguaceros.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: BASURA, lineas: ['La lluvia disparó el desborde, pero no lo explica sola.', 'El barro era oscuro.', 'Desempleo, tala y basura lo fueron preparando.', 'Las consecuencias se vuelven nuevas causas.', 'El camión es de basura.', 'Las soluciones atienden varias causas.'], ...S([1, 4], { 0: 'Separa detonante y fondo.', 2: 'Son las causas de fondo.', 3: 'Es el círculo.', 5: 'Es el acuerdo.' }), bien: 'Detonante, fondo, círculo y acuerdo.' },
      'El color del barro y el tipo de camión no explican nada; lo demás sí.', 'Deja lo que ayuda a entender por qué pasó.'),
  ]);

  const MINA = {
    id: 'icf-turismo', title: 'Un hotel frente a la ciénaga',
    ficha: { autor: 'Periódico escolar «El Manglar»', fuente: 'Edición especial', fecha: 'Abril de 2026' },
    paras: [
      'Una empresa quiere construir un hotel de doscientas habitaciones frente a la ciénaga de Las Garzas. El proyecto parece un asunto de dinero y, en efecto, lo es: promete cien empleos y más impuestos para un municipio que apenas paga sus profesores. Pero los que fuimos a preguntar volvimos con un cuaderno lleno de otras cosas.',
      'La bióloga del parque nos habló de la dimensión ambiental. El manglar cría los peces que se pescan en toda la costa y frena las olas en las tormentas. Cortar cuatro hectáreas para el muelle no acaba con la ciénaga, dijo, pero la parte en dos, y hay animales que no cruzan.',
      'Doña Petrona, que preside el consejo comunitario, nos habló de lo cultural. En esa orilla se hace cada año el velorio de los santos del agua, y allí están enterrados los ombligos de medio pueblo. «Ustedes ven una playa», nos dijo; «nosotros vemos un altar». Para ella no hay precio que alcance, porque no está en venta.',
      'El alcalde insistió en lo político y en lo legal. Como se trata de territorio de una comunidad negra, la ley ordena una consulta previa antes de decidir. Él la apoya, aunque teme que se alargue. También hay división: los jóvenes del puerto están a favor, porque llevan dos años buscando trabajo.',
      'Al comparar notas descubrimos que casi todos tenían razón en lo suyo. El choque no es entre buenos y malos, sino entre dimensiones: lo que mejora la economía puede dañar el ambiente; lo que cuida la cultura puede dejar sin empleo a los jóvenes. Incluso dentro de una misma dimensión hay tensiones: el hotel daría trabajo, pero podría quitárselo a los pescadores.',
      'Un profesor propuso una regla que nos gustó: antes de votar, cada grupo debe explicar con sus palabras lo que más le importa al otro, hasta que el otro diga «sí, es eso». Todavía no hay decisión. Hay, eso sí, un nuevo plano del hotel: más pequeño, sin muelle y lejos de la orilla. Nadie está feliz del todo. Quizá esa sea una buena señal.',
    ],
  };
  const l2 = leccion('icf-sc-sistemico-2', 'Dimensiones en choque', guion(
    ['Mirar por dimensiones', 'Económica, ambiental, cultural, política, legal, social.'],
    ['Cada actor enfatiza una', 'La bióloga, el ambiente; la líder, la cultura; la empresa, el dinero.'],
    ['El choque', 'Lo que mejora una dimensión puede empeorar otra.'],
    ['Acordar', 'Ceder un poco en cada una suele ser mejor que ganar solo en una.']), [
    x('pinta-tipos', 'Pinta cada dato con su dimensión.', { doc: MINA, plumas: ['económica', 'ambiental', 'cultural'],
      ...P(['El manglar cría los peces de la costa.', 1, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Habrá más impuestos para el municipio.', 0, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Se hace el velorio de los santos del agua.', 2, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Hay animales que no cruzan.', 1, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Promete cien empleos.', 0, '¿Habla de dinero, de naturaleza o de creencias y costumbres?']), bien: 'Dinero, naturaleza y costumbres.' },
      'Impuestos y empleos son económicos; peces y animales, ambientales; el velorio, cultural.', 'Pregunta qué se gana o se pierde en cada dato.'),
    x('voz-de-la-fuente', 'Ata cada preocupación a quien la tiene.', { ayuda: 'Tira un hilo desde cada preocupación hasta quien la tiene.', doc: MINA, portadas: [['La bióloga', 'actor'], ['Doña Petrona', 'actor'], ['El alcalde', 'actor'], ['Los jóvenes del puerto', 'actor']],
      ...T(['que la ciénaga quede partida', 0, '¿Quién habla de animales que no cruzan?'], ['que se pierda un lugar sagrado', 1, '¿Quién ve un altar?'], ['que el trámite se alargue', 2, '¿Quién habla de la ley?'], ['seguir sin trabajo', 3, '¿Quién lleva dos años buscando?']), bien: 'Cada actor, su dimensión.' },
      'La bióloga cuida la ciénaga, doña Petrona lo sagrado, el alcalde el trámite y los jóvenes el empleo.', 'Busca quién dijo cada cosa y qué le preocupa.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: MINA,
      ...F(['¿Qué exige la ley antes de decidir?', 3, 'Busca el comienzo que habla de lo legal.'], ['¿Para qué sirve el manglar?', 1, 'Busca el comienzo que habla del ambiente.'], ['¿Qué regla propuso un profesor?', 5, 'Busca el comienzo que lo nombra.']),
      luz: [[4, 'una consulta previa'], [2, 'frena las olas'], [6, 'cada grupo debe explicar']], bien: 'Ley, ambiente y regla.' },
      'La ley está en el 4, el manglar en el 2 y la regla en el 6.', 'Lee solo el comienzo de cada párrafo y decide.'),
    x('genero-o-cita', '¿El choque es **entre dimensiones** o **dentro de una misma**?', { doc: MINA, rot: ['entre dimensiones', 'dentro de una'],
      ...F(['Más empleo en el hotel, menos para los pescadores', 1, '¿Las dos partes hablan de lo mismo?'], ['Más impuestos, menos manglar', 0, '¿Las dos partes hablan de lo mismo?'], ['Se cuida un altar y se frena el empleo', 0, '¿Las dos partes hablan de lo mismo?'], ['Los jóvenes ganan sueldo, los pescadores pierden ventas', 1, '¿Las dos partes hablan de lo mismo?']), bien: 'Dos temas o uno solo.' },
      'Empleo contra empleo y sueldo contra ventas son de una misma; impuestos y altar chocan con otra.', 'Nombra la dimensión de cada parte y compáralas.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MINA, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Doña Petrona preside el consejo comunitario.', 0, 'Léela junto al párrafo 3.'], ['Ofrecerle más dinero no cambiaría su posición.', 1, '¿Qué dice ella del precio?'], ['El nuevo plano atiende a quienes se oponían.', 1, '¿Qué le quitaron al hotel y adónde lo movieron?'], ['El hotel ya abrió.', 2, '¿Hay decisión?']),
      luz: [[3, 'no hay precio que alcance'], [6, 'sin muelle y lejos de la orilla']], bien: 'Los cambios muestran a quién se oyó.' },
      'El cargo está escrito; lo del dinero y lo del plano se deducen; aún no hay decisión.', 'Compara el plano nuevo con las quejas de cada uno.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MINA, filas: [{ antes: 'Cortar cuatro hectáreas', topes: ['acaba la ciénaga', 'no la afecta', 'la parte en dos'], va: 2 }, { antes: 'La consulta previa es', topes: ['un favor', 'una orden de la ley', 'ilegal'], va: 1 }, { antes: 'Con el plano nuevo,', topes: ['nadie está feliz del todo', 'todos están felices', 'nadie cede'], va: 0 }], mira: ['Relee lo que dijo la bióloga.', 'Relee por qué se hace.', 'Relee el final del párrafo 6.'], luz: [[2, 'la parte en dos'], [4, 'la ley ordena'], [6, 'Nadie está feliz del todo']], bien: 'Parte, ordena y reparte.' },
      'La parte en dos, la ley la ordena y nadie quedó feliz del todo.', 'Busca la oración exacta que corresponde a cada perilla.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que dice **cómo es** el conflicto.', { doc: MINA, nums: [5], apuesta: 'Chocan dimensiones, no buenos y malos.', ...S(['5.1'], { '5.0': 'Dice lo que descubrieron, no cómo es el choque.', '5.2': 'Da un caso dentro de una dimensión.' }), bien: '«No… sino» define el conflicto.' },
      'La segunda oración lo define: el choque es entre dimensiones, no entre buenos y malos.', 'Busca la oración que descarta una idea y pone otra.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MINA, lineas: ['Un hotel promete empleo e impuestos.', 'El cuaderno se llenó.', 'También afecta el ambiente, la cultura y la ley.', 'El choque es entre dimensiones.', 'El hotel tiene habitaciones.', 'Se busca un plan en que cada uno ceda.'], ...S([1, 4], { 0: 'Es la dimensión económica.', 2: 'Son las otras dimensiones.', 3: 'Es la idea central.', 5: 'Es la salida.' }), bien: 'Propuesta, dimensiones, choque y salida.' },
      'El cuaderno y las habitaciones son detalles; lo demás explica el conflicto.', 'Deja lo que necesitas para entender el desacuerdo.'),
  ]);

  const PICO = {
    id: 'icf-pico', title: 'La buena idea que hizo trancón',
    ficha: { autor: 'Semillero de políticas públicas', fuente: 'Cuaderno de casos', fecha: 'Mayo de 2026' },
    paras: [
      'En la ciudad de Altamira el tráfico era insoportable. El concejo aprobó una medida sencilla: cada carro debía quedarse en casa un día a la semana, según el último número de la placa. El primer mes las calles se vaciaron. El alcalde salió en televisión con una bicicleta.',
      'Al año, el trancón era peor que antes. ¿Qué pasó? Quienes podían pagarlo compraron un segundo carro, casi siempre viejo y barato, con una placa que terminara en otro número. Una medida contra los carros había aumentado los carros. Y como eran viejos, contaminaban más.',
      'Nadie en el concejo quería ese resultado. A eso se le llama efecto no deseado: lo que produce una intervención sin que nadie lo busque. Aparece porque las personas no se quedan quietas cuando cambia una regla: se acomodan. Quien diseña una política debe preguntarse qué hará la gente al día siguiente.',
      'También hubo efectos desiguales. Quien tenía dinero compró otro carro; quien no, empezó a salir a las cuatro y media de la mañana para alcanzar un bus repleto. Los repartidores que usaban su moto perdían un día de ingreso por semana. La misma regla pesaba distinto según quién la cargara. Sin embargo, en las cifras que publicaba el concejo aparecía un solo promedio para toda la ciudad, y ese promedio escondía la diferencia.',
      'Y hubo un efecto bueno que nadie anunció: como el bus iba lleno, los pasajeros se organizaron y lograron un carril exclusivo. El carril, y no la placa, redujo los tiempos de viaje en veinte minutos para quienes usan el transporte público.',
      'El concejo corrigió. Mantuvo el carril, cambió la medida por un cobro a quien entra solo en carro al centro y usó ese dinero para más buses. Esta vez publicó de antemano qué iba a medir: tiempos de viaje, calidad del aire y gasto de las familias más pobres. Si en un año no mejora, la regla se cae sola. Una buena intervención no es la que suena bien, sino la que se deja corregir.',
    ],
  };
  const l3 = leccion('icf-sc-sistemico-3', 'Efectos de una intervención', guion(
    ['Lo que se busca', 'Toda medida tiene un propósito.'],
    ['Lo que no se busca', 'La gente se acomoda y aparecen efectos no deseados.'],
    ['Para quién', 'La misma regla pesa distinto según quién la cargue.'],
    ['Medir y corregir', 'Conviene decir de antemano qué se va a medir.']), [
    x('genero-o-cita', '¿Es un efecto **buscado** o **no buscado** por el concejo?', { doc: PICO, rot: ['buscado', 'no buscado'],
      ...F(['Menos carros en la calle el primer mes', 0, '¿Para eso se aprobó?'], ['Se compran segundos carros', 1, '¿Para eso se aprobó?'], ['Más contaminación por carros viejos', 1, '¿Para eso se aprobó?'], ['Los pasajeros logran un carril', 1, '¿Para eso se aprobó?']), bien: 'También hay efectos buenos no buscados.' },
      'Solo vaciar las calles era el propósito; los carros, la contaminación y el carril no estaban previstos.', 'Compara cada efecto con lo que quería la medida.'),
    x('pasos-del-proceso', 'Ordena lo que pasó. El primer paso está en su puesto.', { doc: PICO, que: 'el caso', de: 'La medida de Altamira', fija: 1, ini: [0, 2, 4, 1, 3], tiras: ['Se aprueba la medida de la placa.', 'Las calles se vacían.', 'Se compran segundos carros.', 'El trancón empeora.', 'El concejo corrige.'], mira: ['', 'Ocurre el primer mes.', 'Es lo que hace la gente para acomodarse.', 'Es lo que se ve al año.', 'Es lo último que cuenta el texto.'], bien: 'Aprobar, vaciar, acomodarse, empeorar y corregir.' },
      'Se aprueba, funciona un mes, la gente compra carros, empeora y se corrige.', 'Fíjate en las palabras que dicen cuándo ocurrió cada cosa.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: PICO,
      ...F(['presenta la medida y su éxito', 0, 'Busca el primer mes.'], ['cuenta el resultado contrario', 1, 'Busca el segundo carro.'], ['define el efecto no deseado', 2, 'Busca «se le llama».'], ['muestra a quién le pesó más', 3, 'Busca los repartidores.'], ['cuenta un efecto bueno', 4, 'Busca el carril.'], ['explica la corrección', 5, 'Busca lo que se va a medir.'], ['explica cómo se fabrica un bus', null, 'Nadie fabrica buses aquí.']),
      luz: [[1, 'El primer mes'], [2, 'un segundo carro'], [3, 'efecto no deseado'], [4, 'efectos desiguales'], [5, 'un carril exclusivo'], [6, 'El concejo corrigió']], bien: 'Medida, resultado, concepto, desigualdad, carril y corrección.' },
      'Presenta la medida, su mal resultado, el concepto, la desigualdad, un efecto bueno y la corrección.', 'Mira de qué efecto habla cada párrafo del caso.'),
    x('pista-tipo', 'Ata cada grupo a cómo le pesó la medida.', { doc: PICO, lineas: ['Compró otro carro.', 'Salía a las cuatro y media.', 'Perdía un día de ingreso.', 'Ganó un viaje más corto, al final.'],
      ...T(['quien tenía dinero', 0, '¿Quién podía evitarla pagando?'], ['quien dependía del bus lleno', 1, '¿Quién madrugaba más?'], ['el repartidor en moto', 2, '¿Quién trabaja con su vehículo?'], ['el pasajero, tras el carril', 3, '¿A quién ayudó lo no previsto?']), bien: 'La misma regla, pesos distintos.' },
      'Con dinero se evitaba; el del bus madrugaba, el repartidor perdía ingreso y el carril ayudó al pasajero.', 'Busca qué hizo, ganó o perdió cada grupo de personas.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: PICO, frases: [[3, 'lo que produce una ', 'intervención', ' sin que nadie lo busque'], [3, 'cuando cambia una regla: se ', 'acomodan', ''], [6, 'publicó ', 'de antemano', ' qué iba a medir']],
      ...F(['medida', 0, '¿Cómo llama el texto a lo que hizo el concejo?'], ['adaptan', 1, '¿Qué hizo la gente con la placa?'], ['desde antes', 2, '¿Cuándo avisó qué mediría?'], ['cirugía', null, 'Aquí nadie opera a nadie.'], ['sientan', null, 'No se trata de sillas.']), bien: 'El contexto decide el sentido.' },
      'La intervención es la medida, acomodarse es adaptarse y de antemano es desde antes.', 'Reemplaza y mira si la oración dice lo mismo.'),
    x('balanza-tesis', 'Afirmación: «la placa redujo los tiempos de viaje». ¿Qué hace cada dato?', { doc: PICO, tesis: 'La placa redujo los tiempos de viaje',
      ...F(['Al año el trancón era peor.', 1, '¿Se viajaba más rápido?'], ['Los tiempos bajaron solo donde hay carril.', 1, '¿Qué otra cosa los explica?'], ['El primer mes las calles se vaciaron.', 0, '¿Apoya al menos por un tiempo?'], ['La bicicleta del alcalde es verde.', 2, '¿Mide tiempos?']), bien: 'Otra causa explica mejor.' },
      'El trancón y el carril la debilitan; el primer mes la apoya; la bicicleta no pesa.', 'Pregunta si el dato señala a la placa o a otra causa.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PICO, nums: [2, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los segundos carros contaminaban más.', 0, 'Léela junto al párrafo 2.'], ['El concejo aprendió de su primera medida.', 1, '¿Qué hace distinto esta vez?'], ['Al concejo le importa no cargar a los más pobres.', 1, '¿Qué va a medir esta vez?'], ['El alcalde fue reelegido.', 2, '¿Se habla de elecciones?']),
      luz: [[2, 'contaminaban más'], [6, 'Esta vez publicó'], [6, 'gasto de las familias más pobres']], bien: 'Lo que se mide muestra lo que importa.' },
      'La contaminación está escrita; que aprendió y que cuida a los pobres se deducen; la reelección no aparece.', 'Mira qué anunció que mediría y qué pasa si no mejora.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PICO, lineas: ['Una medida contra el tráfico lo empeoró.', 'El alcalde usó una bicicleta.', 'La gente se acomodó y surgieron efectos no deseados.', 'La regla pesó distinto según el dinero.', 'Algunos salían a las cuatro y media.', 'Se corrigió anunciando qué se mediría.'], ...S([1, 4], { 0: 'Es el problema.', 2: 'Es el concepto.', 3: 'Es la desigualdad.', 5: 'Es la lección.' }), bien: 'Problema, concepto, desigualdad y corrección.' },
      'La bicicleta y la hora son detalles; lo demás sirve para evaluar otra medida.', 'Deja lo que usarías para analizar otra política.'),
  ]);

  const ESCUELA = {
    id: 'icf-celulares', title: 'El colegio sin celulares',
    paras: [
      'El colegio San Isidro prohibió los celulares desde enero. La rectora explicó el motivo: en un año, las peleas grabadas y publicadas habían pasado de tres a diecinueve. «El celular tiene la culpa», afirmó una madre en la asamblea. Otra recordó que ese mismo año el colegio recibió, de un día para otro, a los estudiantes de una sede que cerró por grietas, y que los cursos pasaron de treinta a cuarenta y cinco alumnos.',
      'A los tres meses los videos bajaron a uno. Las peleas, según el registro de enfermería, siguieron iguales: solo dejaron de grabarse. Los profesores notaron más conversación en el recreo y más atención en clase. Al mismo tiempo aparecieron problemas que nadie previó. Varios estudiantes que trabajan por la tarde perdieron turnos porque no veían los mensajes de sus jefes. Dos niñas con diabetes, que medían su glucosa con una aplicación, tuvieron que pedir permiso cada vez.',
      'Los que tenían dinero compraron relojes que reciben mensajes. Los demás se quedaron sin nada. Además surgió, detrás de la cancha, un pequeño negocio: un alumno de once alquilaba su teléfono a quinientos pesos el minuto.',
      'El consejo directivo se reunió en abril. Los profesores pedían mantener la prohibición por la atención; los padres que trabajan, poder comunicarse; los estudiantes, confianza; y la orientadora, que se hablara de las peleas y no solo de los videos. La secretaría de educación recordó que cualquier regla debe respetar el derecho a la salud.',
      'La decisión fue intermedia. Los celulares se guardan en clase y se pueden usar en el primer recreo; quienes los necesiten por salud los llevan siempre. Se crearon tres grupos de mediación para los cursos que crecieron, y la secretaría se comprometió a abrir dos cursos más. En noviembre se revisará con cuatro datos: atención en clase, peleas en enfermería, quejas de acoso y opinión de los estudiantes. «Si solo miramos los videos», dijo la orientadora, «vamos a creer que todo se arregló».',
    ],
  };
  const Q = preg(ESCUELA, 'sociales');
  return mundo('icf-sc-sistemico', 'Problemas Complejos', 'sociales', [l1, l2, l3], [
    ['icf-sc-sistemico-1', 'Busca qué más cambió al mismo tiempo.', Q('El dato de los cursos de cuarenta y cinco alumnos sirve para:', ['Probar que el celular causa las peleas', 'Señalar otra posible causa del aumento de peleas', 'Mostrar que la sede cerró por error', 'Negar que hubo peleas'], 1, 'Ese año también cambió el tamaño de los cursos: puede ser otra causa.', 'Pregunta qué más pasó ese mismo año.')],
    ['icf-sc-sistemico-1', 'Que algo deje de verse no significa que deje de ocurrir.', Q('Según el registro de enfermería, la prohibición:', ['Acabó con las peleas', 'Aumentó las peleas', 'Redujo las grabaciones, pero no las peleas', 'No cambió nada en el colegio'], 2, 'Las peleas siguieron iguales: solo dejaron de grabarse.', 'Compara el número de videos con el registro de enfermería.')],
    ['icf-sc-sistemico-2', 'Cada actor enfatiza una dimensión distinta.', Q('El caso de las niñas con diabetes muestra un choque entre:', ['La disciplina y el derecho a la salud', 'La moda y el estudio', 'El deporte y la economía', 'Los profesores y los bomberos'], 0, 'La regla de disciplina dificultaba cuidar su salud.', 'Nombra lo que buscaba la regla y lo que ellas necesitaban.')],
    ['icf-sc-sistemico-2', 'Una salida puede atender varias dimensiones.', Q('La decisión de abril atiende sobre todo a:', ['Solo los profesores', 'Solo los padres', 'Nadie, porque mantiene la regla', 'Varios intereses, con concesiones de cada grupo'], 3, 'Guarda en clase, permite un recreo, exceptúa la salud y crea mediación.', 'Compara cada parte de la decisión con lo que pedía cada grupo.')],
    ['icf-sc-sistemico-3', 'La gente se acomoda a las reglas.', Q('El alquiler del teléfono detrás de la cancha es un ejemplo de:', ['Efecto buscado por la rectora', 'Efecto no deseado de la medida', 'Causa de la prohibición', 'Dimensión ambiental'], 1, 'Nadie quería ese negocio: apareció cuando los estudiantes se acomodaron a la regla.', 'Pregunta si la prohibición se hizo para eso.')],
    ['icf-sc-sistemico-3', 'Medir una sola cosa puede engañar.', Q('La frase final de la orientadora advierte que:', ['Los videos deben volver', 'Hay que prohibir las cámaras', 'Un solo indicador puede hacer creer que el problema se resolvió', 'Las peleas ya se acabaron'], 2, 'Si solo se cuentan videos, parece resuelto aunque las peleas sigan.', 'Une la frase con el dato de enfermería.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-historia.js
// Preicfes · Sociales y Ciudadanas · mundo 6 «Historia de Colombia» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const COLONIA = {
    id: 'icf-colonia', title: 'De súbditos a ciudadanos',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Febrero de 2026' },
    paras: [
      'Durante casi tres siglos, lo que hoy es Colombia fue parte del imperio español. La Corona nombraba a quienes gobernaban, cobraba impuestos y controlaba el comercio: solo se podía vender y comprar, legalmente, con la metrópoli. La sociedad estaba ordenada por origen. Arriba, los españoles nacidos en Europa; luego sus descendientes americanos, los criollos; después mestizos, indígenas y, en la base, los africanos esclavizados.',
      'Ese orden nunca fue tranquilo. Hubo indígenas que pleitearon por sus resguardos y esclavizados que huyeron y fundaron palenques, como el de San Basilio, reconocido por la Corona a comienzos del siglo XVIII. Resistir no era siempre pelear: también era conservar una lengua, una fiesta o una forma de sembrar.',
      'En el siglo XVIII, los reyes de la casa de Borbón quisieron sacar más provecho de sus colonias. Subieron los impuestos, crearon monopolios como el del tabaco y prefirieron a los peninsulares para los cargos. En 1781, en El Socorro, Manuela Beltrán rompió el edicto de un nuevo impuesto, y miles de personas marcharon hacia Santafé. Los comuneros pactaron unas capitulaciones que el gobierno incumplió. José Antonio Galán, que siguió en rebeldía, fue ejecutado en 1782.',
      'Los criollos tenían dinero y estudios, pero no el poder. Leían a los ilustrados franceses y conocían la independencia de Estados Unidos. A fines de 1793, Antonio Nariño tradujo e imprimió los Derechos del Hombre; al año siguiente, eso le costó la cárcel. Cuando en 1808 Napoleón invadió España y puso preso al rey, surgió una pregunta incómoda: si no hay rey, ¿quién manda?',
      'El 20 de julio de 1810, en Santafé, una disputa por un florero fue la chispa de un cabildo abierto que formó una junta de gobierno. No fue todavía la independencia total: la junta decía gobernar en nombre del rey. Vinieron años de división entre centralistas y federalistas, la reconquista española de 1816 y, por fin, la campaña libertadora, que triunfó en Boyacá el 7 de agosto de 1819.',
      'La nueva república cambió muchas cosas y dejó otras. Ya no había súbditos, sino ciudadanos; pero solo votaban los hombres libres con propiedades o renta. La esclavitud duró hasta 1851. Los indígenas perdieron, poco a poco, sus tierras comunales. La independencia cambió quién gobernaba antes de cambiar cómo se vivía.',
    ],
  };
  const l1 = leccion('icf-sc-historia-1', 'De la Colonia a la República', guion(
    ['El orden colonial', 'Un imperio que controla cargos, comercio e impuestos, y una sociedad ordenada por origen.'],
    ['Resistencias', 'Palenques, pleitos, comuneros: el orden nunca fue tranquilo.'],
    ['Causas y detonantes', 'Reformas, ideas y crisis del rey; el florero fue la chispa.'],
    ['Cambios y permanencias', 'Hubo república, pero siguieron la esclavitud y el voto de pocos.']), [
    x('linea-vida', 'Lleva cada hecho a su época.', { doc: COLONIA, rot: ['antes de 1800', 'de 1800 a 1819', 'después de 1819'],
      ...F(['La marcha de los comuneros', 0, 'Busca el año de El Socorro.'], ['La junta de Santafé', 1, 'Busca el año del florero.'], ['El fin legal de la esclavitud', 2, 'Busca hasta cuándo duró.'], ['La batalla de Boyacá', 1, 'Busca el triunfo de la campaña.']), luz: [[3, 'En 1781'], [5, '20 de julio de 1810'], [6, 'hasta 1851']], bien: '1781, 1810, 1819 y 1851.' },
      'Los comuneros son de 1781; la junta, de 1810; Boyacá, de 1819; la esclavitud terminó en 1851.', 'Busca la fecha de cada hecho en el texto.'),
    x('genero-o-cita', '¿Es una **causa de fondo** o el **detonante** del 20 de julio?', { doc: COLONIA, rot: ['de fondo', 'detonante'],
      ...F(['La disputa por el florero', 1, '¿Venía de tiempo atrás?'], ['Los cargos para los peninsulares', 0, '¿Venía de tiempo atrás?'], ['Las ideas ilustradas', 0, '¿Venía de tiempo atrás?'], ['Los impuestos y monopolios', 0, '¿Venía de tiempo atrás?']), bien: 'La chispa y la leña.' },
      'El florero fue la chispa; cargos, ideas e impuestos venían acumulándose.', 'Pregunta si ocurrió ese día o desde antes.'),
    x('pista-tipo', 'Ata cada grupo a lo que lo caracteriza en el texto.', { doc: COLONIA, lineas: ['peninsulares', 'criollos', 'africanos esclavizados', 'indígenas'],
      ...T(['preferidos para los cargos', 0, '¿A quiénes prefirieron los Borbones?'], ['con dinero y estudios, sin el poder', 1, '¿Quiénes leían a los ilustrados?'], ['algunos huyeron y fundaron palenques', 2, '¿Quiénes hicieron San Basilio?'], ['pleitearon por sus resguardos', 3, '¿Quiénes defendían tierras comunales?']), bien: 'Cada grupo, su lugar y su lucha.' },
      'Peninsulares con cargos, criollos sin poder, palenques de esclavizados y resguardos indígenas.', 'Busca en el texto qué se dice de cada grupo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: COLONIA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'La independencia fue un proceso con varias etapas.',
      ...T(['El gobierno cumplió lo pactado con los comuneros.', 3, 'Busca qué pasó con las capitulaciones.'], ['El 20 de julio fue la independencia total.', 6, 'Busca en nombre de quién gobernaba la junta.'], ['Desde 1819 votaron todos.', 9, 'Busca quiénes votaban.']), bien: 'Incumplió, todavía no y solo algunos.' },
      'Las capitulaciones se incumplieron, la junta gobernaba en nombre del rey y votaban pocos.', 'Busca la palabra clave: comuneros, independencia, votar.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: COLONIA, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Nariño fue preso por imprimir los Derechos del Hombre.', 0, 'Búscala junto al nombre de Nariño.'], ['Al gobierno le inquietaban esas ideas.', 1, '¿Por qué castigaría una traducción?'], ['Un hombre sin propiedades podía ser ciudadano y no votar.', 1, '¿Quiénes votaban?'], ['Nariño viajó con Napoleón.', 2, '¿El texto los une?']),
      luz: [[4, 'eso le costó la cárcel'], [6, 'solo votaban']], bien: 'El castigo muestra el miedo.' },
      'La cárcel está escrita; la inquietud y el ciudadano sin voto se deducen; el viaje se inventa.', 'Pregunta por qué un gobierno castigaría eso.'),
    x('balanza-tesis', 'Tesis: «la independencia cambió quién gobernaba antes de cambiar cómo se vivía». ¿Qué hace cada dato?', { doc: COLONIA, tesis: 'Cambió quién gobernaba antes de cómo se vivía',
      ...F(['La esclavitud siguió más de treinta años.', 0, '¿Siguió algo de la vida de antes?'], ['Solo votaban hombres con propiedades o renta.', 0, '¿Cambió para la mayoría?'], ['En 1820 se repartió la tierra entre todos.', 1, 'Si fuera cierto, ¿qué diría de la tesis?'], ['El florero era de porcelana.', 2, '¿Habla de la vida o del gobierno?']), bien: 'Cambios y permanencias.' },
      'La esclavitud y el voto restringido la apoyan; un reparto general la debilitaría; el florero no pesa.', 'Supón cierto cada dato y pregunta si la vida cambió pronto.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: COLONIA, frases: [[1, 'legalmente, con la ', 'metrópoli', ''], [3, 'crearon ', 'monopolios', ' como el del tabaco'], [2, 'indígenas que ', 'pleitearon', ' por sus resguardos']],
      ...F(['España', 0, '¿Quién dominaba la colonia?'], ['negocios de un solo vendedor', 1, '¿Quién podía vender el tabaco?'], ['reclamaron ante la ley', 2, '¿Cómo defendieron sus tierras?'], ['ciudad grande', null, 'Aquí se habla de un imperio.'], ['bailaron', null, 'Se trata de defender tierras.']), bien: 'Cada palabra en su época.' },
      'La metrópoli es el país que domina, el monopolio es un solo vendedor y pleitear es reclamar ante la ley.', 'Lee la oración completa y piensa quién manda.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: COLONIA, lineas: ['La sociedad colonial estaba ordenada por origen.', 'La campaña triunfó en agosto.', 'Hubo resistencias y reformas que molestaron.', 'La crisis del rey abrió el camino a la independencia.', 'Galán siguió en rebeldía.', 'La república dejó muchas desigualdades.'], ...S([1, 4], { 0: 'Es el punto de partida.', 2: 'Son causas de fondo.', 3: 'Es el momento clave.', 5: 'Es lo que permaneció.' }), bien: 'Orden, resistencia, crisis y permanencias.' },
      'El mes y la rebeldía de Galán son detalles; lo demás explica el proceso.', 'Deja lo que ayuda a entender por qué y qué cambió.'),
  ]);

  const SIGLO = {
    id: 'icf-siglo19', title: 'Un país que se escribía y se borraba',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'Pocos países estrenaron tantas constituciones en un siglo. Entre 1821 y 1886 hubo, por lo menos, ocho textos nacionales. Varios cambiaban el nombre del país y casi todos, la respuesta a tres preguntas: ¿cuánto poder tiene el gobierno central?, ¿qué lugar ocupa la Iglesia?, ¿quién puede votar?',
      'La primera república unió a la Nueva Granada, Venezuela y Ecuador. Los historiadores la llaman Gran Colombia. Era enorme y sus regiones estaban mal comunicadas; además, Bolívar y Santander tenían ideas distintas sobre cuánto debía mandar el centro. En 1830 se separaron Venezuela y Ecuador, y ese mismo año murió Bolívar en Santa Marta.',
      'A mitad de siglo aparecieron los dos partidos que marcarían la historia. Los conservadores defendían, en general, un Estado central fuerte y a la Iglesia católica como base del orden. Los liberales pedían más libertades, más poder para las regiones y separar a la Iglesia del Estado. Dentro de cada partido había ricos y pobres; muchas veces se era liberal o conservador por la familia o por el pueblo.',
      'Las reformas liberales de mitad de siglo abolieron la esclavitud, expropiaron tierras de la Iglesia y, en 1863, consolidaron con la Constitución de Rionegro un país federal, los Estados Unidos de Colombia, con nueve estados que tenían ejército propio. Hubo muchas libertades y también muchas guerras locales.',
      'En 1886, con Rafael Núñez y Miguel Antonio Caro, la Regeneración hizo lo contrario: un país unitario, con un presidente fuerte, y un acuerdo con la Iglesia que le entregó la educación. Los liberales quedaron casi por fuera del gobierno. El siglo terminó con la guerra de los Mil Días, entre 1899 y 1902, que dejó unos cien mil muertos según los cálculos más citados. Al año siguiente, con apoyo de Estados Unidos, se separó Panamá.',
      'Mientras los partidos peleaban, el café crecía en las laderas. A fines de siglo ya era el principal producto que se exportaba. Con él llegaron caminos, pequeños propietarios en unas regiones y grandes haciendas en otras. La política se escribía en constituciones; la vida, en recibos de café.',
    ],
  };
  const l2 = leccion('icf-sc-historia-2', 'Siglo XIX', guion(
    ['Tres preguntas', 'Centro o regiones, Iglesia y Estado, y quién vota.'],
    ['Dos partidos', 'Conservadores y liberales, a mitad de siglo.'],
    ['Péndulo', '1863, federal y liberal; 1886, central y conservadora.'],
    ['Economía', 'El café cambió el país mientras los partidos peleaban.']), [
    x('pinta-tipos', 'Pinta cada idea con el partido que, en general, la defendía.', { doc: SIGLO, plumas: ['conservador', 'liberal'],
      ...P(['Un Estado central fuerte.', 0, '¿Quién quería un centro fuerte?'], ['Separar a la Iglesia del Estado.', 1, '¿Quién quería separarla?'], ['Más poder para las regiones.', 1, '¿Quién quería repartir el poder?'], ['La Iglesia como base del orden.', 0, '¿Quién veía así a la Iglesia?']), bien: 'Centro e Iglesia; regiones y libertades.' },
      'Los conservadores, centro e Iglesia; los liberales, regiones y separación.', 'Relee el párrafo que presenta a los dos partidos.'),
    x('linea-vida', 'Lleva cada rasgo a su constitución.', { doc: SIGLO, rot: ['Rionegro, 1863', 'Regeneración, 1886'],
      ...F(['Nueve estados con ejército', 0, 'Busca el nombre «Estados Unidos de Colombia».'], ['Un presidente fuerte', 1, 'Busca a Núñez y Caro.'], ['La Iglesia recibe la educación', 1, 'Busca el acuerdo con la Iglesia.'], ['Un país federal', 0, 'Busca la palabra en el párrafo 4.']), luz: [[4, 'un país federal'], [5, 'un país unitario']], bien: 'De un extremo al otro.' },
      'Rionegro fue federal, con ejércitos regionales; la de 1886, unitaria, presidencial y con la Iglesia.', 'Compara lo que hizo cada reforma: párrafos 4 y 5.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: SIGLO,
      ...F(['¿Por qué se separó la Gran Colombia?', 1, 'Busca el comienzo que nombra la primera república.'], ['¿Qué producto se exportaba más?', 5, 'Busca el comienzo que nombra un cultivo.'], ['¿Qué tres preguntas cambiaban?', 0, 'Busca el comienzo sobre constituciones.']),
      luz: [[2, 'mal comunicadas'], [6, 'el principal producto'], [1, 'tres preguntas']], bien: 'Comienzo, segundo y último.' },
      'La separación está en el 2, el café en el 6 y las preguntas en el 1.', 'Lee solo la primera oración de cada párrafo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SIGLO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['En cada partido había ricos y pobres.', 0, 'Léela junto al párrafo 3.'], ['Dejar por fuera a un partido ayudó a que hubiera guerra.', 1, '¿Qué pasó después de que los liberales quedaran por fuera?'], ['Dos vecinos con ideas parecidas podían ser de partidos opuestos.', 1, '¿Por qué se era liberal o conservador muchas veces?'], ['Panamá se separó por una guerra de religión.', 2, '¿El texto da esa causa?']),
      luz: [[3, 'había ricos y pobres'], [5, 'casi por fuera del gobierno'], [3, 'por la familia o por el pueblo']], bien: 'La familia y el pueblo pesaban.' },
      'Ricos y pobres está escrito; la exclusión y la herencia del partido se deducen; la religión no.', 'Une lo que pasa antes con lo que pasa después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: SIGLO, filas: [{ antes: 'Los conservadores defendían el centro', topes: ['nunca', 'siempre y todos', 'en general'], va: 2 }, { antes: 'Con Rionegro hubo', topes: ['solo paz', 'libertades y guerras locales', 'solo guerra'], va: 1 }, { antes: 'La cifra de muertos de los Mil Días es', topes: ['un cálculo', 'exacta', 'falsa'], va: 0 }], mira: ['Busca las dos palabras que limitan la idea.', 'Relee el final del párrafo 4.', 'Busca «unos» y «según».'], luz: [[3, 'en general'], [4, 'muchas guerras locales'], [5, 'según los cálculos']], bien: 'En general, las dos cosas y un cálculo.' },
      'En general, libertades con guerras locales y una cifra calculada.', 'Busca en el texto la palabra que pone el límite.'),
    x('pasos-del-proceso', 'Ordena el siglo. El primer paso está en su puesto.', { doc: SIGLO, que: 'el siglo', de: 'De la Gran Colombia a Panamá', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Se une la Gran Colombia.', 'Venezuela y Ecuador se separan.', 'Se escribe la de Rionegro.', 'Llega la Regeneración.', 'Guerra de los Mil Días.'], mira: ['', 'Ocurre en 1830.', 'Ocurre en 1863.', 'Ocurre en 1886.', 'Cierra el siglo.'], bien: 'Unión, separación, federal, central y guerra.' },
      'Primero la unión, en 1830 la separación, luego 1863, 1886 y la guerra.', 'Busca los años en el texto y ponlos en fila.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que opone las **leyes** y los **recibos**.', { doc: SIGLO, nums: [6], apuesta: 'Una se escribía en leyes; la otra, en café.', ...S(['6.3'], { '6.0': 'Dice que las dos cosas pasaban a la vez.', '6.1': 'Da un dato de exportación.', '6.2': 'Dice qué llegó con el café.' }), bien: 'La imagen final resume la idea.' },
      'La última oración opone las constituciones a los recibos de café.', 'Busca la oración que cierra el texto con una imagen.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO, lineas: ['El siglo discutió centro, Iglesia y voto.', 'Bolívar murió en Santa Marta.', 'Dos partidos nacieron a mitad de siglo.', 'Se pasó de un país federal a uno central.', 'La guerra empezó en 1899.', 'El café transformó la economía.'], ...S([1, 4], { 0: 'Es la idea que organiza el texto.', 2: 'Son los actores.', 3: 'Es el péndulo.', 5: 'Es el cambio económico.' }), bien: 'Preguntas, partidos, péndulo y café.' },
      'El lugar y el año son detalles; lo demás organiza el siglo.', 'Deja lo que explica los cambios del país.'),
  ]);

  const SIGLO20 = {
    id: 'icf-siglo20', title: 'La paz y sus intentos',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'Las primeras décadas del siglo XX trajeron ferrocarriles, café y la indemnización por Panamá. En las plantaciones y los pozos petroleros nacieron los sindicatos. En diciembre de 1928, en Ciénaga, el ejército disparó contra trabajadores en huelga de una bananera extranjera. Aún se discute cuántos murieron; nadie discute que marcó al país.',
      'En 1930 los liberales volvieron al poder y, pocos años después, hicieron reformas: derecho a la huelga, función social de la propiedad, más educación pública. Parte del país sintió que por fin avanzaba; otra parte, que se perdía el orden. Jorge Eliécer Gaitán, que hablaba del «país político» y del «país nacional», reunió multitudes. El 9 de abril de 1948 lo asesinaron en Bogotá.',
      'Su muerte no creó la violencia entre liberales y conservadores, que ya venía, pero la multiplicó. A los años que siguieron se les llama «La Violencia», con mayúscula: unos doscientos mil muertos y cientos de miles de personas que huyeron del campo. Entre 1953 y 1957 gobernó el general Rojas Pinilla. Para salir de la dictadura y de la guerra, los dos partidos crearon el Frente Nacional: se turnaron la presidencia durante dieciséis años.',
      'El Frente Nacional redujo la guerra entre partidos, pero cerró la puerta a los demás. Quien no era liberal ni conservador tenía muy difícil participar. En los años sesenta, en un mundo partido por la Guerra Fría, nacieron guerrillas como las FARC y el ELN, que decían luchar por la tierra y la igualdad. Más tarde aparecieron grupos paramilitares, que decían defenderse de ellas, y el narcotráfico, que financió a unos y a otros.',
      'La población civil puso la mayoría de las víctimas. Hubo desplazamiento, secuestros, masacres, reclutamiento de niños y ejecuciones de inocentes presentados como combatientes. Todos los grupos armados y también agentes del Estado cometieron crímenes. Decir esto no es repartir culpas por igual: es reconocer que ninguna víctima vale menos por quién la mató.',
      'Los intentos de paz también hacen parte de la historia. En 1990 el M-19 dejó las armas; un año después, una asamblea plural escribió una nueva Constitución. En 2016 el Estado y las FARC firmaron un acuerdo, rechazado por poca diferencia en un plebiscito y luego modificado. Creó una comisión de la verdad y una justicia especial. El conflicto no terminó del todo, pero miles de personas siguen vivas porque algo cambió.',
    ],
  };
  const l3 = leccion('icf-sc-historia-3', 'Siglo XX y conflicto armado', guion(
    ['De la huelga al 9 de abril', 'Sindicatos, reformas y la muerte de Gaitán.'],
    ['La Violencia y el Frente Nacional', 'Guerra entre partidos y un pacto que cerró la puerta a otros.'],
    ['El conflicto armado', 'Guerrillas, paramilitares, narcotráfico y Estado; las víctimas, sobre todo civiles.'],
    ['Intentos de paz', '1990, la Constitución de 1991, el acuerdo de 2016.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: SIGLO20,
      ...F(['el comienzo del siglo y las huelgas', 0, 'Busca los sindicatos.'], ['reformas y Gaitán', 1, 'Busca el regreso de los liberales.'], ['La Violencia y el pacto', 2, 'Busca el turno en la presidencia.'], ['el origen del conflicto armado', 3, 'Busca los años sesenta.'], ['las víctimas', 4, 'Busca a la población civil.'], ['los intentos de paz', 5, 'Busca el año 1990.'], ['la llegada de los españoles', null, 'Eso fue siglos antes.']),
      luz: [[1, 'nacieron los sindicatos'], [2, 'hicieron reformas'], [3, 'el Frente Nacional'], [4, 'nacieron guerrillas'], [5, 'La población civil'], [6, 'Los intentos de paz']], bien: 'Huelgas, reformas, violencia, conflicto, víctimas y paz.' },
      'El texto recorre huelgas, reformas, La Violencia, el conflicto, las víctimas y la paz.', 'Lee el comienzo de cada párrafo y dale un nombre.'),
    x('linea-vida', 'Lleva cada hecho a su momento.', { doc: SIGLO20, rot: ['antes de 1950', 'de 1950 a 1989', 'desde 1990'],
      ...F(['La masacre de las bananeras', 0, 'Busca el año de Ciénaga.'], ['El Frente Nacional', 1, 'Busca qué vino después de Rojas.'], ['Nacen las FARC y el ELN', 1, 'Busca los años sesenta.'], ['La nueva Constitución', 2, 'Busca un año después de 1990.']), luz: [[1, '1928'], [4, 'años sesenta'], [6, 'En 1990']], bien: '1928, los cincuenta, los sesenta y 1991.' },
      'Bananeras 1928, Frente Nacional tras 1957, guerrillas en los sesenta y Constitución en 1991.', 'Busca la fecha o la década de cada hecho.'),
    x('genero-o-cita', 'Del Frente Nacional, ¿es un efecto **buscado** o **no buscado**?', { doc: SIGLO20, rot: ['buscado', 'no buscado'],
      ...F(['Salir de la dictadura', 0, '¿Para eso se creó?'], ['Reducir la guerra entre partidos', 0, '¿Para eso se creó?'], ['Cerrar la puerta a otros grupos', 1, '¿El texto lo da como meta o como resultado?'], ['Alimentar que algunos buscaran las armas', 1, '¿Para eso se creó?']), bien: 'Un pacto con efectos inesperados.' },
      'Salir de la dictadura y de la guerra era la meta; la exclusión y lo que siguió, no.', 'Mira para qué se creó y qué pasó después.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: SIGLO20, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'La mayoría de las víctimas fueron civiles.',
      ...T(['Se sabe exactamente cuántos murieron en Ciénaga.', 3, 'Busca lo que aún se discute.'], ['La violencia empezó con la muerte de Gaitán.', 4, 'Busca si ya venía.'], ['Solo un grupo cometió crímenes.', 10, 'Busca quiénes los cometieron.']), bien: 'Se discute, ya venía y todos.' },
      'La cifra se discute, la violencia ya venía y los crímenes fueron de todos los grupos y de agentes del Estado.', 'Saca la palabra clave: cuántos, empezó, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SIGLO20, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El narcotráfico financió a grupos enfrentados.', 0, 'Léela junto al final del párrafo 4.'], ['El país estaba dividido frente al acuerdo.', 1, '¿Cómo fue el resultado del plebiscito?'], ['Un contexto mundial influyó en el conflicto.', 1, '¿Qué pasaba en el mundo en los sesenta?'], ['El M-19 ganó la presidencia en 1990.', 2, '¿Se habla de esa elección?']),
      luz: [[4, 'financió a unos y a otros'], [6, 'por poca diferencia'], [4, 'la Guerra Fría']], bien: 'Poca diferencia: un país dividido.' },
      'El narcotráfico está escrito; la división y el contexto se deducen; la presidencia no aparece.', 'Piensa qué muestra un resultado tan cerrado.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que **aclara** cómo se debe entender lo anterior.', { doc: SIGLO20, nums: [5], apuesta: 'Ninguna víctima vale menos.', ...S(['5.3'], { '5.0': 'Dice quiénes fueron la mayoría.', '5.1': 'Da ejemplos de lo que ocurrió.', '5.2': 'Dice quiénes cometieron crímenes.' }), bien: '«No es… es…» aclara.' },
      'La última oración aclara: no se trata de repartir culpas por igual, sino de reconocer a las víctimas.', 'Busca la oración que dice qué no es y qué sí es.'),
    x('balanza-tesis', 'Tesis: «el Frente Nacional trajo una paz incompleta». ¿Qué hace cada dato?', { doc: SIGLO20, tesis: 'El Frente Nacional trajo una paz incompleta',
      ...F(['Redujo la guerra entre liberales y conservadores.', 0, '¿Trajo algo de paz?'], ['Nacieron guerrillas en esos años.', 0, '¿Fue completa?'], ['Durante el pacto no hubo ningún grupo armado.', 1, 'Si fuera cierto, ¿sería incompleta?'], ['Duró un número par de años.', 2, '¿Habla de la paz?']), bien: 'Algo de paz y algo de guerra.' },
      'Reducir una guerra y ver nacer otra apoyan «incompleta»; no haber armados la debilitaría; el número par no pesa.', 'La tesis tiene dos partes: hubo paz y no fue completa.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO20, lineas: ['Las huelgas y las reformas abrieron el siglo.', 'Rojas era general.', 'La Violencia llevó a un pacto que excluyó a otros.', 'El conflicto armado golpeó sobre todo a civiles.', 'La huelga fue en diciembre.', 'Hubo varios intentos de paz.'], ...S([1, 4], { 0: 'Es el comienzo.', 2: 'Es el puente entre dos guerras.', 3: 'Es el centro del texto.', 5: 'Es el cierre.' }), bien: 'Comienzo, pacto, conflicto y paz.' },
      'El grado y el mes son detalles; lo demás es el hilo del siglo.', 'Deja lo que explica cómo se llegó hasta hoy.'),
  ]);

  const CAJA = {
    id: 'icf-caja', title: 'Tres papeles en una caja de galletas',
    paras: [
      'Al morir doña Carmen Arango, su nieta, que estudia historia, abrió la caja de galletas donde guardaba «lo importante». Había tres papeles, envueltos en el mismo pañuelo.',
      'El primero era la copia de una carta de 1782. Un antepasado, tejedor de El Socorro, le contaba a un compadre: «Volvimos con las manos llenas de papeles firmados y ya no valen nada. Subieron otra vez el tabaco. A Galán lo mataron para que los demás aprendamos. Yo no aprendí a callarme; aprendí a leer lo que se firma».',
      'El segundo era un billete de 1886, con un mensaje en el reverso. Lo escribió un bisabuelo que había sido soldado del Estado Soberano de Santander: «Me licenciaron. Ya no hay Estado, ni ejército, ni bandera: todo se manda desde Bogotá. Dicen que así habrá orden. El cura abrió la escuela y echó al maestro liberal. Mi hermano está contento; yo no. En la mesa ya no hablamos».',
      'El tercero era la cédula de Carmen, con la fecha en que votó por primera vez: primero de diciembre de 1957. Ese día se decidía en un plebiscito si liberales y conservadores se turnarían el poder para salir de la dictadura y de la guerra entre ellos. Ninguna colombiana había votado antes en una elección nacional, aunque el derecho se había aprobado en 1954. Votaron más de un millón ochocientas mil mujeres. El mismo texto que confirmaba sus derechos reservaba los cargos a los dos partidos.',
      'Junto a la cédula había un recorte con una caricatura: una señora entra a votar y, detrás, el marido carga al niño y la olla. El dibujante quiso burlarse. La abuela había escrito encima, con esfero azul: «Ojalá».',
      'La nieta puso los tres papeles en fila. Uno hablaba de promesas incumplidas; otro, de un país que cambiaba de dueño; el último, de una puerta que se abría mientras otra quedaba cerrada. Comprendió por qué su abuela no los había guardado con las fotos, sino con las escrituras de la casa.',
    ],
  };
  const Q = preg(CAJA, 'sociales');
  return mundo('icf-sc-historia', 'Historia de Colombia', 'sociales', [l1, l2, l3], [
    ['icf-sc-historia-1', 'Los comuneros pactaron y el gobierno incumplió.', Q('«Papeles firmados que ya no valen nada» se refiere a:', ['Las cédulas de 1957', 'Las capitulaciones pactadas con los comuneros', 'La Constitución de 1886', 'Los Derechos del Hombre'], 1, 'La carta es de 1782 y nombra El Socorro, el tabaco y a Galán: habla de lo pactado con los comuneros.', 'Mira la fecha, el lugar y a quién nombra la carta.')],
    ['icf-sc-historia-1', 'El monopolio y los impuestos: causas de fondo.', Q('La frase «Subieron otra vez el tabaco» muestra una de las causas del descontento colonial:', ['La falta de escuelas', 'La guerra entre partidos', 'El voto femenino', 'Las cargas y monopolios de la Corona'], 3, 'El tabaco era un monopolio de la Corona, que subía sus cobros.', 'Recuerda qué reformas hicieron los Borbones.')],
    ['icf-sc-historia-2', '1886: del federalismo al centralismo.', Q('El cambio que cuenta el soldado es el paso de:', ['Un país federal a uno central', 'Una colonia a una república', 'Una dictadura a un pacto', 'Un reino a un imperio'], 0, '«Ya no hay Estado, ni ejército: todo se manda desde Bogotá».', 'Compara dónde se mandaba antes y dónde después.')],
    ['icf-sc-historia-2', 'La Iglesia recibió la educación en la Regeneración.', Q('«El cura abrió la escuela y echó al maestro liberal» ilustra:', ['La abolición de la esclavitud', 'La independencia', 'El papel de la Iglesia en la educación desde 1886', 'El origen de los sindicatos'], 2, 'La Regeneración acordó con la Iglesia que dirigiera la educación.', 'Piensa qué decidió la Constitución de ese año sobre la escuela.')],
    ['icf-sc-historia-3', 'Mira qué abre y qué cierra una reforma.', Q('«Una puerta que se abría mientras otra quedaba cerrada» quiere decir que el plebiscito:', ['Abrió escuelas y cerró iglesias', 'Permitió votar solo a los hombres', 'Confirmó derechos a las mujeres, pero reservó los cargos a dos partidos', 'Separó a Panamá'], 2, 'El mismo texto hizo las dos cosas.', 'Busca las dos cosas que hizo el mismo texto.')],
    ['icf-sc-historia-3', 'Una caricatura también es una fuente de su época.', Q('La palabra «Ojalá», escrita sobre la caricatura, muestra que la abuela:', ['Convirtió la burla en un deseo de mayor igualdad', 'Admiraba al dibujante', 'Quería que nadie votara', 'No entendió el dibujo'], 0, 'El dibujante se burlaba de que el hombre cuidara; ella lo desea.', 'Compara lo que quería el dibujante con lo que escribe ella.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-mundo.js
// Preicfes · Sociales y Ciudadanas · mundo 7 «Historia del Mundo» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REVO = {
    id: 'icf-revoluciones', title: 'Cuando el mundo cambió de máquinas y de dueño',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Febrero de 2026' },
    paras: [
      'A finales del siglo XVIII ocurrieron, casi a la vez, dos clases de revolución. Unas cambiaron quién mandaba; otra cambió cómo se producía. Ninguna fue cosa de un día, y entre todas fabricaron buena parte del mundo en que vivimos.',
      'En 1776, trece colonias inglesas de América del Norte declararon su independencia. Su argumento era nuevo: todos los hombres nacen iguales, los gobiernos existen para proteger derechos y obtienen su poder del consentimiento de los gobernados. En la práctica, ese «todos» no incluía a las mujeres, a los pueblos indígenas ni a las personas esclavizadas.',
      'En Francia, el rey gobernaba con poder absoluto y la sociedad estaba dividida en estamentos. El clero y la nobleza casi no pagaban impuestos; el resto, la inmensa mayoría, sí. En 1789, con las cuentas en quiebra y el pan cada vez más caro, los representantes del pueblo se declararon Asamblea Nacional. En agosto proclamaron los Derechos del Hombre y del Ciudadano. Después vinieron la república, el Terror y, en 1799, Napoleón.',
      'La revolución que más lejos llevó la palabra «libertad» ocurrió en Haití. Allí, en 1791, se rebelaron miles de personas esclavizadas en las plantaciones de azúcar. En 1804 fundaron un país sin esclavos. Francia les cobró después una enorme suma por reconocerlo. Muchas historias olvidan mencionarlo; los dueños de esclavos de toda América, en cambio, no lo olvidaron un solo día.',
      'Mientras tanto, en Inglaterra, la máquina de vapor movía telares y, pronto, trenes y barcos. La Revolución Industrial multiplicó lo que se producía y llenó las ciudades de obreros, entre ellos niños, con jornadas de doce o más horas. Surgieron dos grupos con intereses opuestos: quienes tenían las fábricas y quienes solo tenían su trabajo.',
      'Del choque nacieron los sindicatos, las leyes laborales y nuevas ideas. El liberalismo defendía la propiedad y las libertades individuales; el socialismo, que la riqueza se repartiera. El voto se fue ampliando, despacio: primero algunos propietarios, luego los hombres, mucho más tarde las mujeres. La democracia no fue un regalo de las revoluciones, sino una pelea que ellas dejaron abierta.',
    ],
  };
  const l1 = leccion('icf-sc-mundo-1', 'Revoluciones y democracia', guion(
    ['Dos clases', 'Políticas: quién manda. Industrial: cómo se produce.'],
    ['Derechos para ¿todos?', 'La palabra era universal; la práctica, no.'],
    ['Haití', 'La revolución hecha por personas esclavizadas.'],
    ['Después', 'Sindicatos, leyes, liberalismo, socialismo y un voto que se amplía despacio.']), [
    x('linea-vida', 'Lleva cada hecho a su revolución.', { doc: REVO, rot: ['Estados Unidos', 'Francia', 'Haití'],
      ...F(['Trece colonias se independizan', 0, 'Busca el año 1776.'], ['Se proclaman los Derechos del Hombre', 1, 'Busca el año 1789.'], ['Se funda un país sin esclavos', 2, 'Busca el año 1804.'], ['Gobierna Napoleón', 1, 'Busca el año 1799.']), luz: [[2, 'trece colonias'], [3, 'En agosto proclamaron'], [4, 'un país sin esclavos']], bien: '1776, 1789 y 1804.' },
      'Las colonias en 1776; Derechos y Napoleón en Francia; un país sin esclavos en Haití.', 'Busca en qué párrafo del texto aparece cada hecho.'),
    x('genero-o-cita', '¿Es un cambio **político** o **de la producción**?', { doc: REVO, rot: ['político', 'de la producción'],
      ...F(['El pueblo se declara Asamblea Nacional', 0, '¿Cambia quién manda o cómo se produce?'], ['La máquina de vapor mueve telares', 1, '¿Cambia quién manda o cómo se produce?'], ['Se reconocen derechos del ciudadano', 0, '¿Cambia quién manda o cómo se produce?'], ['Las ciudades se llenan de obreros', 1, '¿Cambia quién manda o cómo se produce?']), bien: 'Mandar y producir.' },
      'La asamblea y los derechos cambian el poder; el vapor y los obreros, la producción.', 'Pregunta si habla de gobierno o de fábricas.'),
    x('pista-tipo', 'Ata cada idea a quien la defendía o la vivía.', { doc: REVO, lineas: ['El gobierno nace del consentimiento.', 'Libertades individuales y propiedad.', 'Que la riqueza se reparta.', 'Un país fundado sin esclavos.'],
      ...T(['colonias de América del Norte', 0, '¿Quién explicó para qué existen los gobiernos?'], ['liberalismo', 1, '¿Cuál defiende al individuo?'], ['socialismo', 2, '¿Cuál defiende repartir?'], ['revolución haitiana', 3, '¿Quiénes eran antes esclavizados?']), bien: 'Cada idea, su origen.' },
      'Consentimiento en Norteamérica, libertades en el liberalismo, reparto en el socialismo y Haití sin esclavos.', 'Relee los párrafos 2, 4 y 6: ahí está cada idea.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REVO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las colonias se independizaron en 1776.', 0, 'Léela junto al párrafo 2.'], ['Haití asustó a los dueños de esclavos.', 1, '¿Por qué no lo olvidaron un solo día?'], ['La declaración prometía más de lo que cumplió.', 1, '¿A quiénes dejaba por fuera?'], ['Haití le declaró la guerra a Inglaterra.', 2, '¿El texto las une?']),
      luz: [[2, 'En 1776'], [4, 'no lo olvidaron'], [2, 'no incluía']], bien: 'No olvidar puede ser temer.' },
      'El año está escrito; el temor y la promesa incumplida se deducen; la guerra no aparece.', 'Piensa por qué a alguien le importaría tanto Haití.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REVO, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'El voto se amplió poco a poco.',
      ...T(['En Francia todos pagaban impuestos por igual.', 1, 'Busca quiénes casi no pagaban.'], ['En las fábricas no había niños.', 6, 'Busca quiénes llenaron las ciudades.'], ['La democracia llegó completa con las revoluciones.', [10, 11], 'Busca qué dejaron las revoluciones.']), bien: 'Casi no, entre ellos, pelea abierta.' },
      'El clero y la nobleza casi no pagaban, había niños y la democracia quedó como pelea abierta.', 'Saca la palabra clave: impuestos, niños, completa.'),
    x('balanza-tesis', 'Tesis: «la Revolución francesa tuvo causas económicas». ¿Qué hace cada dato?', { doc: REVO, tesis: 'Tuvo causas económicas',
      ...F(['Las cuentas estaban en quiebra.', 0, '¿Habla de dinero?'], ['El pan estaba cada vez más caro.', 0, '¿Habla de dinero?'], ['Ese año la cosecha fue abundante y barata.', 1, 'Si fuera cierto, ¿quedaría la causa del pan?'], ['El rey usaba peluca.', 2, '¿Cambia la economía?']), bien: 'Quiebra y pan.' },
      'La quiebra y el pan la apoyan; una cosecha barata la debilitaría; la peluca no pesa.', 'Pregunta si el dato tiene que ver con precios o cuentas.'),
    x('bisagras', 'Pon en cada hueco la palabra que une. Sobran dos.', { doc: REVO, pares: [['La palabra era «todos»,', 'muchos quedaban por fuera.'], ['Las jornadas eran larguísimas;', 'nacieron los sindicatos.'], ['El pueblo protestó', 'el pan era muy caro.']],
      ...F(['pero', 0, 'Contrasta: ¿dónde lo segundo no es lo prometido?'], ['por eso', 1, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['porque', 2, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['es decir,', null, 'Repetiría lo mismo: ninguna pareja repite.'], ['para que', null, 'Anunciaría un propósito: aquí nadie lo busca.']), bien: 'Contraste, resultado y causa.' },
      'La promesa contrasta, las jornadas traen sindicatos y el pan explica la protesta.', 'Di qué hace la segunda idea con la primera.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REVO, lineas: ['Hubo revoluciones políticas y una de la producción.', 'Las colonias eran trece.', 'Proclamaron derechos que no alcanzaban a todos.', 'Haití fundó un país sin esclavos.', 'Los Derechos se proclamaron en agosto.', 'El voto y las leyes laborales llegaron por luchas.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es la tensión central.', 3: 'Es el caso más radical.', 5: 'Es el cierre.' }), bien: 'Dos clases, límites, Haití y luchas.' },
      'El número y el mes son detalles; lo demás es el hilo.', 'Deja lo que explica qué cambió y para quién.'),
  ]);

  const GUERRA = {
    id: 'icf-guerras', title: 'Treinta años de guerra y cuarenta de miedo',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'A comienzos del siglo XX las potencias europeas competían por colonias, mercados y prestigio, y se habían repartido en dos alianzas. El 28 de junio de 1914 un nacionalista mató en Sarajevo al heredero de Austria-Hungría. En pocas semanas, por el juego de las alianzas, media Europa estaba en guerra. El disparo fue la chispa; la pólvora llevaba años guardada.',
      'La Primera Guerra Mundial duró hasta 1918 y dejó alrededor de diez millones de soldados muertos. En plena guerra, en 1917, una revolución llevó al poder en Rusia a los bolcheviques, que se proponían construir el socialismo. El Tratado de Versalles, en 1919, culpó a Alemania y le impuso pagos enormes. Muchos alemanes lo vivieron como una humillación.',
      'En 1929 quebró la bolsa de Nueva York y la crisis se regó por el mundo. Sin trabajo y con miedo, mucha gente escuchó a quienes ofrecían orden y culpables. En Italia ya gobernaba el fascismo; en 1933 Hitler llegó al poder en Alemania por vías legales y acabó con la democracia. El nazismo convirtió el racismo en política de Estado.',
      'La Segunda Guerra Mundial comenzó en 1939 con la invasión de Polonia. Murieron entre sesenta y ochenta millones de personas, la mayoría civiles. En el Holocausto, el régimen nazi asesinó a unos seis millones de judíos, y también a gitanos, personas con discapacidad, opositores y otros grupos. La guerra terminó en 1945, después de que Estados Unidos lanzara bombas atómicas sobre Hiroshima y Nagasaki.',
      'Ese mismo año se fundó la Organización de las Naciones Unidas y, en 1948, se proclamó la Declaración Universal de los Derechos Humanos. Pero los vencedores se separaron. Estados Unidos, capitalista, y la Unión Soviética, comunista, armaron bloques rivales. Como las dos tenían bombas capaces de destruirlo todo, no se atacaron de frente: fue una guerra «fría».',
      'Fría para ellas. En Corea, Vietnam, Angola o Centroamérica, los bloques apoyaron a bandos distintos y la guerra fue muy caliente. En América Latina, el miedo al comunismo sirvió para justificar golpes militares. El Muro de Berlín, levantado en 1961 para que nadie se fuera del lado oriental, cayó en 1989; dos años después dejó de existir la Unión Soviética.',
    ],
  };
  const l2 = leccion('icf-sc-mundo-2', 'Guerras y Guerra Fría', guion(
    ['1914', 'Alianzas, colonias y nacionalismo: un disparo fue la chispa.'],
    ['Entre guerras', 'Versalles, la crisis del 29, fascismo y nazismo.'],
    ['1939–1945', 'La mayoría de las víctimas, civiles; el Holocausto; las bombas atómicas.'],
    ['Guerra Fría', 'Dos bloques que no se atacan de frente y pelean en otros países.']), [
    x('pasos-del-proceso', 'Ordena los hechos. El primero está en su puesto.', { doc: GUERRA, que: 'los hechos', de: 'De Sarajevo al Muro', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Atentado de Sarajevo.', 'Tratado de Versalles.', 'Crisis de la bolsa.', 'Invasión de Polonia.', 'Cae el Muro de Berlín.'], mira: ['', 'Se firma un año después de la guerra.', 'Ocurre en 1929.', 'Empieza la segunda guerra.', 'Ocurre en 1989.'], bien: '1914, 1919, 1929, 1939 y 1989.' },
      'Sarajevo 1914, Versalles 1919, crisis 1929, Polonia 1939 y el Muro 1989.', 'Busca el año de cada uno y ponlos en fila.'),
    x('genero-o-cita', 'De la Primera Guerra, ¿es **causa de fondo** o **detonante**?', { doc: GUERRA, rot: ['de fondo', 'detonante'],
      ...F(['La competencia por colonias', 0, '¿Venía de años?'], ['El atentado de Sarajevo', 1, '¿Fue lo que disparó todo?'], ['Las dos alianzas', 0, '¿Venía de años?'], ['El afán de prestigio de las potencias', 0, '¿Venía de años?']), bien: 'La pólvora y la chispa.' },
      'Colonias, alianzas y prestigio venían de años; el atentado la disparó.', 'Pregunta si ocurrió ese día o se venía guardando.'),
    x('pista-tipo', 'Ata cada hecho a su consecuencia en el texto.', { doc: GUERRA, lineas: ['El Tratado de Versalles', 'La crisis de 1929', 'La Segunda Guerra', 'El miedo al comunismo'],
      ...T(['humillación en Alemania', 0, '¿Cuál le impuso pagos?'], ['gente que busca orden y culpables', 1, '¿Cuál dejó sin trabajo?'], ['fundación de la ONU', 2, '¿Cuál terminó en 1945?'], ['golpes militares justificados', 3, '¿Cuál se usó en América Latina?']), bien: 'Cada hecho, su efecto.' },
      'Versalles humilló, la crisis dio miedo, la guerra llevó a la ONU y el miedo justificó golpes.', 'Busca qué cuenta el texto justo después de cada hecho.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: GUERRA, nums: [3, 4, 6], pregunta: 'Queda en pie', queda: 'La Guerra Fría fue violenta en varios países.',
      ...T(['Hitler llegó al poder con un golpe militar.', 2, 'Busca por qué vías llegó.'], ['La mayoría de los muertos fueron soldados.', 5, 'Busca quiénes fueron la mayoría.'], ['El Muro se hizo para que no entraran extranjeros.', 11, 'Busca para qué se levantó.']), bien: 'Legales, civiles y salir.' },
      'Llegó por vías legales, la mayoría fueron civiles y el Muro evitaba que se fueran.', 'Saca la palabra clave: Hitler, muertos, Muro.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GUERRA, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Declaración Universal es de 1948.', 0, 'Léela junto al párrafo 5.'], ['Las armas atómicas no impidieron otras guerras.', 1, '¿Dónde fue caliente la guerra?'], ['Los derechos humanos fueron en parte una respuesta a la guerra.', 1, '¿Qué había pasado justo antes?'], ['La ONU fue idea de Rusia.', 2, '¿Se dice de quién fue la idea?']),
      luz: [[5, 'en 1948'], [6, 'muy caliente'], [5, 'Ese mismo año']], bien: 'El orden de los hechos ayuda a deducir.' },
      'El año está escrito; las otras guerras y la respuesta al horror se deducen; el autor de la idea no.', 'Une lo que pasó antes con lo que pasó después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: GUERRA, filas: [{ antes: 'La Guerra Fría fue «fría»', topes: ['en todo el mundo', 'en ninguna parte', 'entre las dos potencias'], va: 2 }, { antes: 'El Holocausto asesinó a', topes: ['solo judíos', 'judíos y también otros grupos', 'solo opositores'], va: 1 }, { antes: 'La Unión Soviética dejó de existir', topes: ['en 1991', 'en 1989', 'en 1961'], va: 0 }], mira: ['Relee dónde fue caliente.', 'Relee a quiénes asesinó.', 'Suma dos años a la caída del Muro.'], luz: [[6, 'Fría para ellas'], [4, 'y también a gitanos'], [6, 'dos años después']], bien: 'Ellas, varios y 1991.' },
      'Fría entre potencias, víctimas de varios grupos y fin en 1991.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Tesis: «la crisis económica ayudó al ascenso del nazismo». ¿Qué hace cada dato?', { doc: GUERRA, tesis: 'La crisis ayudó al nazismo',
      ...F(['El voto nazi creció cuando creció el desempleo.', 0, '¿Crecieron a la vez?'], ['El voto nazi ya era mayoría antes de la crisis.', 1, 'Si fuera cierto, ¿habría ayudado la crisis?'], ['Hitler había nacido en Austria.', 2, '¿Habla de la crisis?']), bien: 'El orden en el tiempo importa.' },
      'Crecer con el desempleo la apoya; ser mayoría antes la debilitaría; el lugar de nacimiento no pesa.', 'Pregunta qué ocurrió primero y qué vino después.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: GUERRA, lineas: ['Las alianzas convirtieron un atentado en guerra mundial.', 'El atentado fue en junio.', 'Versalles y la crisis abonaron el nazismo.', 'La segunda guerra mató sobre todo a civiles.', 'La bolsa estaba en Nueva York.', 'Dos bloques se enfrentaron sin atacarse de frente.'], ...S([4, 1], { 0: 'Es el comienzo.', 2: 'Es el puente entre guerras.', 3: 'Es el centro del texto.', 5: 'Es la Guerra Fría.' }), bien: 'Alianzas, nazismo, civiles y bloques.' },
      'El mes y la ciudad son detalles; lo demás une los hechos.', 'Deja lo que explica por qué pasó lo siguiente.'),
  ]);

  const LIBRES = {
    id: 'icf-descolonizacion', title: 'Los que no esperaron permiso',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'En 1945, cerca de un tercio de la población del mundo vivía en territorios gobernados por otro país. Treinta años después, casi todas esas colonias eran Estados independientes. A ese proceso se le llama descolonización. Las potencias europeas habían quedado debilitadas por la guerra, pero eso no basta para explicarlo: había, sobre todo, millones de personas que no pensaban seguir esperando.',
      'La India mostró un camino. Mohandas Gandhi propuso la desobediencia civil no violenta: no pagar impuestos injustos, no comprar telas inglesas, caminar cientos de kilómetros para fabricar sal, cosa que estaba prohibida. En 1947 se logró la independencia. El país nació partido en dos, la India, de mayoría hindú, y Pakistán, de mayoría musulmana; en la partición murieron cientos de miles de personas.',
      'Otros caminos fueron armados. Argelia peleó casi ocho años contra Francia, hasta 1962. En muchos lugares de África, las fronteras que heredaron los nuevos países habían sido trazadas en Europa, con regla, sin preguntar quién vivía a cada lado. Parte de las guerras que vinieron después nació en esas rayas.',
      'En Sudáfrica el problema era otro: una minoría blanca gobernaba el país y, desde 1948, había convertido la segregación en ley. El apartheid decía dónde podía vivir, estudiar o sentarse cada persona según su color. Nelson Mandela pasó veintisiete años preso. En 1994, en las primeras elecciones en que todos pudieron votar, fue elegido presidente.',
      'También dentro de países independientes hubo quienes exigieron que la palabra «todos» se cumpliera. En 1955, en Estados Unidos, Rosa Parks se negó a ceder su puesto en un bus; el boicot que siguió dio a conocer a Martin Luther King. En 1964 y 1965 se aprobaron leyes contra la segregación y a favor del voto. Las mujeres, los estudiantes, los pueblos indígenas y, más tarde, las personas LGBT organizaron sus propios movimientos.',
      'Un movimiento social no es un partido ni un ejército: es gente que se organiza, fuera de las instituciones, para cambiar algo que considera injusto. Sus herramientas son la marcha, el boicot, la huelga, el arte, la ley. Casi nunca gana todo lo que pide. Pero, cuando gana algo, lo que antes parecía imposible empieza a parecer de sentido común.',
    ],
  };
  const l3 = leccion('icf-sc-mundo-3', 'Descolonización y movimientos sociales', guion(
    ['Descolonización', 'En treinta años casi todas las colonias fueron Estados.'],
    ['Dos caminos', 'La no violencia de la India y la guerra de Argelia.'],
    ['Fronteras y apartheid', 'Rayas trazadas en Europa y segregación hecha ley.'],
    ['Movimientos sociales', 'Gente organizada, fuera de las instituciones, para cambiar algo injusto.']), [
    x('pinta-tipos', 'Pinta cada hecho con su lugar.', { doc: LIBRES, plumas: ['India', 'Sudáfrica', 'Estados Unidos'],
      ...P(['Caminar para fabricar sal.', 0, 'Busca quién propuso la no violencia.'], ['Apartheid desde 1948.', 1, 'Busca dónde la segregación fue ley así.'], ['Rosa Parks no cede su puesto.', 2, 'Busca el boicot del bus.'], ['No comprar telas inglesas.', 0, 'Busca quién propuso la no violencia.'], ['Mandela, presidente en 1994.', 1, 'Busca las primeras elecciones de todos.']), bien: 'Sal, apartheid y bus.' },
      'La sal y las telas son de la India; apartheid y Mandela, de Sudáfrica; Parks, de Estados Unidos.', 'Busca el nombre propio que aparece en cada párrafo.'),
    x('genero-o-cita', '¿Es una acción **no violenta** o **armada**?', { doc: LIBRES, rot: ['no violenta', 'armada'],
      ...F(['Boicot a los buses', 0, '¿Se usan armas ahí?'], ['La guerra de Argelia', 1, '¿Se usan armas ahí?'], ['No pagar impuestos injustos', 0, '¿Se usan armas ahí?'], ['Negarse a ceder un puesto', 0, '¿Se usan armas ahí?']), bien: 'Desobedecer también es luchar.' },
      'Boicot, impuestos y el puesto son desobediencia; Argelia fue una guerra.', 'Pregunta si alguien usa la fuerza contra otros.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: LIBRES,
      ...F(['define la descolonización', 0, 'Busca «se le llama».'], ['un camino sin violencia y su costo', 1, 'Busca a Gandhi.'], ['caminos armados y fronteras', 2, 'Busca la regla.'], ['segregación hecha ley', 3, 'Busca el apartheid.'], ['luchas dentro de países independientes', 4, 'Busca el bus.'], ['define movimiento social', 5, 'Busca «no es un partido».'], ['la vida de un rey', null, 'No aparece ningún rey.']),
      luz: [[1, 'se le llama descolonización'], [2, 'no violenta'], [3, 'con regla'], [4, 'El apartheid'], [5, 'Rosa Parks'], [6, 'Un movimiento social']], bien: 'Definir, dos caminos, apartheid, luchas y definir.' },
      'Abre con una definición, recorre casos y cierra con otra definición.', 'Mira de qué caso o idea habla cada párrafo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: LIBRES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La India se independizó en 1947.', 0, 'Léela junto al párrafo 2.'], ['Una independencia sin guerra puede traer violencia.', 1, '¿Qué pasó en la partición?'], ['Algunas fronteras separaron a un mismo pueblo.', 1, '¿A quién no se le preguntó?'], ['Francia ganó la guerra de Argelia.', 2, '¿Hasta cuándo peleó Argelia y qué logró?']),
      luz: [[2, 'En 1947'], [2, 'en la partición'], [3, 'sin preguntar']], bien: 'Una raya puede partir un pueblo.' },
      'El año está escrito; la violencia de la partición y los pueblos divididos se deducen; que ganara Francia no.', 'Une lo que hicieron con lo que pasó después.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: LIBRES, frases: [[2, 'propuso la ', 'desobediencia civil', ' no violenta'], [4, 'había convertido la ', 'segregación', ' en ley'], [5, 'el ', 'boicot', ' que siguió']],
      ...F(['negativa a cumplir normas injustas', 0, '¿Qué hacían con los impuestos y la sal?'], ['separación por el color', 1, '¿Qué decidía dónde vivir o sentarse?'], ['acuerdo de no usar el servicio', 2, '¿Qué hizo la gente con los buses?'], ['unión de todos', null, 'Es lo contrario de una de ellas.'], ['desfile militar', null, 'Aquí no hay ejércitos.']), bien: 'Palabras de la ciudadanía.' },
      'Desobedecer es no cumplir lo injusto, segregar es separar y boicotear es dejar de usar.', 'Mira los ejemplos que da el texto alrededor.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 1 la oración que dice que **una causa no basta**.', { doc: LIBRES, nums: [1], apuesta: 'Europa débil no explica todo.', ...S(['1.3'], { '1.0': 'Da la situación del comienzo.', '1.1': 'Da la situación treinta años después.', '1.2': 'Le pone nombre al proceso.' }), bien: '«Pero eso no basta» suma otra causa.' },
      'La última oración reconoce la debilidad de Europa y dice que no basta para explicarlo.', 'Busca la oración que reconoce una causa y agrega otra.'),
    x('balanza-tesis', 'Tesis: «un movimiento social puede cambiar las leyes». ¿Qué hace cada dato?', { doc: LIBRES, tesis: 'Un movimiento social puede cambiar las leyes',
      ...F(['Después del boicot y las marchas se aprobaron leyes.', 0, '¿Hubo un cambio legal?'], ['Las leyes ya estaban aprobadas antes de las marchas.', 1, 'Si fuera cierto, ¿habrían cambiado por ellas?'], ['El bus era amarillo.', 2, '¿Habla de leyes?']), bien: 'El orden de los hechos decide.' },
      'Leyes después de las marchas la apoyan; si fueran de antes, la debilitarían; el color no pesa.', 'Mira en cada dato qué pasó primero: ¿las marchas o las leyes?'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: LIBRES, lineas: ['En treinta años casi todas las colonias se independizaron.', 'Fabricar sal estaba prohibido.', 'Hubo caminos pacíficos y armados, con costos.', 'Se luchó también contra la segregación.', 'Mandela estuvo veintisiete años preso.', 'Los movimientos cambian lo que parece posible.'], ...S([1, 4], { 0: 'Es el proceso.', 2: 'Son los caminos.', 3: 'Es la otra lucha.', 5: 'Es la conclusión.' }), bien: 'Proceso, caminos, segregación y conclusión.' },
      'La sal y los años de cárcel son detalles; lo demás es el hilo.', 'Deja lo que explica el proceso, no un solo caso.'),
  ]);

  const SOPA = {
    id: 'icf-carta-berlin', title: 'La mesa de los abuelos',
    paras: [
      'En una residencia para mayores de una ciudad europea, cuatro personas comparten la mesa del almuerzo. La directora les pidió que contaran, para un libro, qué día cambió su vida. Estas son sus respuestas.',
      'Greta, de noventa y un años, habló de su padre. «En 1932 era obrero y se quedó sin trabajo. Tenía hambre y vergüenza. Un partido le ofreció un plato de sopa, un uniforme y alguien a quien culpar. Nunca le perdoné el uniforme. La sopa, sí. Cuando oigo hoy que todo se arreglaría si se fueran los de afuera, vuelvo a oler esa sopa».',
      'Samuel, de ochenta y ocho, nació en una colonia africana. «El mapa de mi país lo dibujaron en una oficina, a cinco mil kilómetros. La raya pasaba por el patio de mi abuela: la cocina quedó de un lado y la letrina del otro. En 1960 nos dieron bandera. La raya la dejaron. He vivido dos guerras y en las dos se peleaba por el patio de mi abuela».',
      'Irina, de ochenta y cuatro, vivía en Berlín oriental. «Una mañana de agosto de 1961 amaneció el alambre. Mi novio trabajaba al otro lado. Nos hacíamos señas desde una ventana con un espejo. Cuando cayó el muro, veintiocho años después, fui a buscarlo. Tenía nietos. Me mostró un cajón: adentro estaba el espejo».',
      'Marie, de ochenta y seis, nació en Haití. «En la escuela, el primer día, nos hacían decir una fecha: 1804. Mi abuela contaba que una mujer de la familia cortó caña encadenada y murió siendo dueña de un pedazo de tierra y de su nombre. También contaba que la libertad nos la cobraron: Francia exigió una fortuna por perder a sus esclavos y el país pagó durante más de un siglo».',
      'La directora publicó las cuatro historias sin cambiar una palabra. En el prólogo escribió: «Los libros de historia cuentan que hubo una revolución, una crisis, un reparto y un muro. Aquí se ve qué se siente cuando la historia entra a la casa sin tocar la puerta».',
      'Un lector le escribió para quejarse: cuatro recuerdos, dijo, no son pruebas de nada. Ella le contestó que tenía razón: no prueban lo que pasó en el mundo. Prueban que pasó en alguien, y que todavía duele cuando se sirve la sopa.',
    ],
  };
  const Q = preg(SOPA, 'sociales');
  return mundo('icf-sc-mundo', 'Historia del Mundo', 'sociales', [l1, l2, l3], [
    ['icf-sc-mundo-1', 'Haití: la revolución de los esclavizados, en 1804.', Q('La fecha que Marie repetía en la escuela recuerda:', ['La caída de Napoleón', 'La fundación de un país por quienes habían sido esclavizados', 'La llegada de los españoles', 'El fin de la Guerra Fría'], 1, 'En 1804 nació Haití, fundado por personas que habían sido esclavizadas.', 'Recuerda qué pasó en Haití ese año.')],
    ['icf-sc-mundo-1', 'La palabra «libertad» y su costo.', Q('«La libertad nos la cobraron» muestra una contradicción con los ideales de 1789 porque:', ['Francia proclamó la libertad y exigió dinero por la de otros', 'Haití no quería ser libre', 'Los ideales eran solo económicos', 'Haití era más rico que Francia'], 0, 'El país que proclamó los Derechos del Hombre cobró por perder a sus esclavos.', 'Une lo que Francia proclamó con lo que exigió.')],
    ['icf-sc-mundo-2', 'Las condiciones económicas influyen en la política.', Q('La historia del padre de Greta ayuda a entender por qué algunas personas apoyaron un régimen autoritario:', ['Por amor a la democracia', 'Por el desempleo, el hambre y un culpable que les ofrecieron', 'Porque odiaban la sopa', 'Por orden de un juez'], 1, 'Sin trabajo y con vergüenza, le ofrecieron comida, uniforme y alguien a quien culpar.', 'Mira qué le faltaba y qué le ofrecieron.')],
    ['icf-sc-mundo-2', 'Culpar a un grupo simplifica un problema.', Q('Cuando Greta dice «vuelvo a oler esa sopa», advierte que:', ['La comida de hoy es mala', 'Extraña a su padre', 'El discurso que culpa a los de afuera se parece al de entonces', 'Le gusta cocinar'], 2, 'Compara el discurso actual con el que sedujo a su padre.', 'Lee la frase que va justo antes de la sopa.')],
    ['icf-sc-mundo-2', 'El Muro dividió Berlín desde 1961 hasta 1989.', Q('El relato de Irina ilustra una consecuencia de la Guerra Fría:', ['La división de familias y personas por la separación en bloques', 'El reparto de África', 'La crisis de la bolsa', 'La Revolución Industrial'], 0, 'El muro separó a quienes vivían a cada lado.', 'Piensa qué separó a Irina de su novio.')],
    ['icf-sc-mundo-2', 'Un testimonio prueba lo vivido, no lo general.', Q('La respuesta de la directora al lector reconoce que los testimonios:', ['Son falsos', 'Sirven para conocer cómo se vivió, no para probar lo general', 'Reemplazan los libros de historia', 'No sirven para nada'], 1, 'No prueban lo que pasó en el mundo; prueban que pasó en alguien.', 'Compara lo que dice que no prueban y lo que sí.')],
    ['icf-sc-mundo-3', 'Muchas fronteras africanas se trazaron en Europa.', Q('La imagen de la raya en el patio de la abuela muestra que:', ['La casa era muy grande', 'La abuela construyó mal', 'Las fronteras coloniales ignoraron a quienes vivían allí', 'El mapa era pequeño'], 2, 'El mapa se dibujó lejos, sin tener en cuenta a la gente.', 'Mira dónde dibujaron el mapa.')],
    ['icf-sc-mundo-3', 'La independencia no siempre cambió las fronteras.', Q('La frase «nos dieron bandera. La raya la dejaron» sugiere que la independencia:', ['No ocurrió', 'Resolvió todos los problemas', 'Fue pagada con dinero', 'Dejó sin resolver problemas heredados de la Colonia'], 3, 'Hubo país nuevo, pero con la frontera que causó guerras.', 'Compara lo que cambió con lo que quedó igual.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-geografia.js
// Preicfes · Sociales y Ciudadanas · mundo 8 «Territorio y Ambiente» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REGIONES = {
    id: 'icf-regiones', title: 'Un país en seis pedazos que se tocan',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Febrero de 2026' },
    paras: [
      'Colombia suele dividirse en seis regiones naturales: Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular. La división mira el relieve, el clima y la vegetación. No es una reja: hay municipios con un pie en cada lado, y la gente, los ríos y las mercancías las cruzan todos los días.',
      'La cordillera de los Andes entra por el sur y se abre en tres ramales. Por eso, cerca de la línea del ecuador, el clima depende sobre todo de la altura: cada mil metros que se suben, la temperatura baja unos seis grados. En un viaje de dos horas se pasa del plátano al frailejón. En la Andina vive la mayor parte de la población, aunque ocupa cerca de la cuarta parte del territorio.',
      'La Amazonía y la Orinoquía, juntas, son más de la mitad del país y tienen menos de una décima parte de sus habitantes. El Pacífico es uno de los lugares más lluviosos del mundo; La Guajira, en el Caribe, es casi un desierto. La densidad de población, que es el número de habitantes por kilómetro cuadrado, cambia muchísimo de un lugar a otro.',
      'Un mapa no muestra todo: escoge. El mapa político muestra límites; el físico, montañas y ríos; el temático, un solo asunto, como las lluvias o el desempleo. La escala dice cuánto se redujo la realidad. En un mapa 1 : 1 000 000, un centímetro son diez kilómetros. Con una escala más grande, por ejemplo 1 : 10 000, cabe menos territorio y se ven más detalles.',
      'La población también se mueve. A mediados del siglo XX, la mayoría de los colombianos vivía en el campo; hoy, unas tres de cada cuatro personas viven en ciudades. Unos migraron buscando trabajo o estudio; muchos otros huyeron de la violencia. Las ciudades crecieron rápido y sin plan, y en sus bordes surgieron barrios levantados por sus propios habitantes.',
      'Además, la población envejece. Las familias tienen menos hijos y la gente vive más años. En las pirámides de población, la base se encoge y la parte alta se ensancha. Eso obliga a pensar en más cuidados y pensiones, y en menos salones de primaria. Un dibujo de barras puede anunciar, con veinte años de ventaja, lo que una sociedad va a necesitar.',
    ],
  };
  const l1 = leccion('icf-sc-geografia-1', 'Regiones, mapas y población', guion(
    ['Seis regiones', 'Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular.'],
    ['Altura y clima', 'Cerca del ecuador, la temperatura depende de la altura.'],
    ['Mapas', 'Político, físico, temático; y la escala.'],
    ['Población', 'Densidad, migración del campo a la ciudad y envejecimiento.']), [
    x('pinta-tipos', 'Pinta cada dato con su región.', { doc: REGIONES, plumas: ['Andina', 'Caribe', 'Pacífica'],
      ...P(['Vive la mayor parte de la población.', 0, 'Busca qué región concentra la gente.'], ['Tiene un lugar casi desértico.', 1, 'Busca dónde está La Guajira.'], ['Es de los lugares más lluviosos.', 2, 'Busca el que casi siempre se moja.'], ['La cruzan tres ramales de cordillera.', 0, 'Busca dónde se abren los Andes.']), bien: 'Gente, desierto y lluvia.' },
      'La Andina concentra gente y cordilleras, el Caribe tiene La Guajira y el Pacífico, la lluvia.', 'Busca el nombre de la región junto a cada dato.'),
    x('pista-tipo', 'Ata cada necesidad al mapa que la resuelve.', { doc: REGIONES, lineas: ['mapa político', 'mapa físico', 'mapa temático', 'mapa a escala 1 : 10 000'],
      ...T(['ver los límites de un departamento', 0, '¿Cuál muestra límites?'], ['ver montañas y ríos', 1, '¿Cuál muestra el relieve?'], ['ver dónde llueve más', 2, '¿Cuál muestra un solo asunto?'], ['ver las calles de un barrio', 3, '¿Cuál deja ver más detalles?']), bien: 'Cada mapa escoge.' },
      'Límites en el político, relieve en el físico, lluvias en el temático y detalle en la escala grande.', 'Piensa qué elige mostrar cada uno de esos mapas.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: REGIONES, filas: [{ antes: 'Al subir mil metros, la temperatura', topes: ['sube seis grados', 'no cambia', 'baja unos seis grados'], va: 2 }, { antes: 'En 1 : 1 000 000, un centímetro son', topes: ['un kilómetro', 'diez kilómetros', 'mil kilómetros'], va: 1 }, { antes: 'Hoy viven en ciudades', topes: ['tres de cada cuatro', 'uno de cada cuatro', 'todos'], va: 0 }], mira: ['Relee lo que pasa con la altura.', 'Relee el ejemplo de la escala.', 'Relee cómo se movió la población.'], luz: [[2, 'baja unos seis grados'], [4, 'diez kilómetros'], [5, 'tres de cada cuatro']], bien: 'Baja, diez y tres de cuatro.' },
      'Baja unos seis grados, un centímetro son diez kilómetros y tres de cada cuatro viven en ciudades.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REGIONES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Andina ocupa cerca de la cuarta parte del territorio.', 0, 'Léela junto al párrafo 2.'], ['La densidad de la Amazonía es baja.', 1, 'Compara su tamaño con sus habitantes.'], ['A 2 000 metros hace unos doce grados menos que al nivel del mar.', 1, 'Multiplica lo que baja por cada mil metros.'], ['En la Amazonía no hay ciudades.', 2, '¿Tener poca gente es no tener ciudades?']),
      luz: [[2, 'la cuarta parte'], [3, 'menos de una décima parte'], [2, 'unos seis grados']], bien: 'Comparar y multiplicar.' },
      'La cuarta parte está escrita; la densidad y los doce grados se deducen; lo de las ciudades no.', 'Haz la comparación o la cuenta con los datos.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REGIONES, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'La población del país envejece.',
      ...T(['Las regiones son fronteras que nadie cruza.', 2, 'Busca qué dice que no es.'], ['Un buen mapa muestra todo.', 3, 'Busca qué hace un mapa.'], ['Las familias tienen cada vez más hijos.', [9, 10], 'Busca qué pasa con los hijos.']), bien: 'No es reja, escoge y menos hijos.' },
      'La división no es una reja, un mapa escoge y las familias tienen menos hijos.', 'Saca la palabra clave: fronteras, todo, hijos.'),
    x('genero-o-cita', '¿Es una migración **por decisión** o **forzada**?', { doc: REGIONES, rot: ['por decisión', 'forzada'],
      ...F(['Se fue a estudiar a Cali', 0, '¿Podía quedarse?'], ['Huyó de un grupo armado', 1, '¿Podía quedarse?'], ['Buscó un mejor empleo', 0, '¿Podía quedarse?'], ['Una amenaza la sacó de su finca', 1, '¿Podía quedarse?']), bien: 'Elegir o huir.' },
      'Estudio y empleo son decisiones; el grupo armado y la amenaza obligan.', 'Pregunta si la persona podía quedarse sin peligro.'),
    x('balanza-tesis', 'Idea: «esta ciudad necesitará más cuidado para mayores». ¿Qué hace cada dato?', { doc: REGIONES, tesis: 'Necesitará más cuidado para mayores',
      ...F(['La parte alta de su pirámide se ensancha.', 0, '¿Qué edades están arriba?'], ['Llegan miles de familias jóvenes con bebés.', 1, '¿Hacia qué edades crece?'], ['Su escudo tiene un cóndor.', 2, '¿Habla de edades?']), bien: 'La pirámide anuncia.' },
      'Ensancharse arriba la apoya; familias jóvenes la debilitan; el escudo no pesa.', 'Piensa qué edades de la población crecen con cada dato.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REGIONES, lineas: ['El país se divide en seis regiones que se cruzan.', 'El frailejón crece arriba.', 'La altura y la lluvia cambian mucho entre lugares.', 'Los mapas escogen qué mostrar.', 'Hay barrios en los bordes.', 'La población se concentra, se mueve y envejece.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es el contraste natural.', 3: 'Es la idea sobre los mapas.', 5: 'Es la idea sobre la población.' }), bien: 'Regiones, contrastes, mapas y población.' },
      'El frailejón y los bordes son detalles; lo demás resume.', 'Deja lo que sirve para explicar el país en general.'),
  ]);

  const PARAMO = {
    id: 'icf-paramo-agua', title: 'El agua que nace en la neblina',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Marzo de 2026' },
    paras: [
      'Los recursos naturales se dividen en renovables, como el agua, el bosque o el viento, que pueden recuperarse si se usan con medida, y no renovables, como el petróleo o el carbón, que tardan millones de años en formarse. Que algo sea renovable no quiere decir que sea infinito: un bosque talado más rápido de lo que crece se acaba igual.',
      'Los páramos son un buen ejemplo. Están por encima de los tres mil metros, más o menos, y casi la mitad de los que hay en el mundo está en Colombia. Sus plantas atrapan la neblina y sus suelos la guardan como una esponja. De allí viene buena parte del agua que toman las ciudades. Un frailejón crece alrededor de un centímetro al año: si se arranca uno de dos metros, se arrancan dos siglos.',
      'En los páramos también vive gente, muchas veces desde antes de que existieran las leyes que los protegen. Siembran papa, tienen vacas, abren caminos. Prohibirles todo de un día para otro los deja sin sustento; permitirles todo seca el agua de millones. Por eso la ley habla de reconversión: ayudarlos a cambiar, poco a poco, a actividades que no dañen el suelo.',
      'El desarrollo sostenible busca satisfacer las necesidades de hoy sin quitarles a las generaciones futuras la posibilidad de satisfacer las suyas. Tiene tres patas: la económica, la social y la ambiental. Si una falla, la mesa se cae. Una mina que da empleo y envenena un río cojea; una reserva que protege un río y expulsa a sus habitantes, también.',
      'El cambio climático lo complica todo. La quema de combustibles y la tala aumentan los gases que retienen calor en la atmósfera. Colombia emite una parte pequeña del total mundial, pero es muy vulnerable: hay glaciares que se derriten, costas que se inundan, sequías y lluvias más fuertes. En el país, la mayor fuente de esas emisiones no son las fábricas: es la deforestación y el uso de la tierra.',
      'Las decisiones sobre el territorio nunca son solo técnicas. Alguien gana y alguien pierde, y no siempre quien pierde está sentado a la mesa. La consulta previa, las audiencias públicas y los planes de ordenamiento existen para que se oiga a los que viven allí. Un mapa con todos los recursos marcados y ninguna casa dibujada es un mapa peligroso.',
    ],
  };
  const l2 = leccion('icf-sc-geografia-2', 'Recursos, ambiente y desarrollo', guion(
    ['Renovables y no', 'Renovable no es infinito: depende de la velocidad a la que se use.'],
    ['Páramos', 'Fábricas de agua donde también vive gente.'],
    ['Sostenible', 'Tres patas: económica, social y ambiental.'],
    ['Clima y decisiones', 'Emitimos poco, somos vulnerables y la deforestación pesa mucho.']), [
    x('genero-o-cita', '¿Es un recurso **renovable** o **no renovable**?', { doc: PARAMO, rot: ['renovable', 'no renovable'],
      ...F(['El viento', 0, '¿Se recupera pronto?'], ['El carbón', 1, '¿Se recupera pronto?'], ['Un bosque', 0, '¿Se recupera pronto?'], ['El petróleo', 1, '¿Se recupera pronto?'], ['El agua', 0, '¿Se recupera pronto?']), bien: 'Años o millones de años.' },
      'Viento, bosque y agua se recuperan; carbón y petróleo tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('pinta-tipos', 'Pinta cada efecto con la pata del desarrollo que toca.', { doc: PARAMO, plumas: ['económica', 'social', 'ambiental'],
      ...P(['Se crean empleos.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se envenena un río.', 2, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se expulsa a una comunidad.', 1, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Aumentan las ventas.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se recupera el suelo.', 2, '¿Habla de dinero, de la gente o de la naturaleza?']), bien: 'Dinero, gente y naturaleza.' },
      'Empleos y ventas son económicos; la comunidad, social; río y suelo, ambientales.', 'Di quién o qué gana o pierde con cada efecto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PARAMO, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'El páramo se puede proteger sin expulsar a su gente.',
      ...T(['Lo renovable nunca se acaba.', 1, 'Busca qué pasa si se usa muy rápido.'], ['En los páramos no vive nadie.', 2, 'Busca quién vive allí.'], ['Lo que más emite el país son las fábricas.', 9, 'Busca la mayor fuente.']), bien: 'Se acaba, vive gente y deforestación.' },
      'Un bosque talado muy rápido se acaba, en los páramos vive gente y la mayor fuente es la deforestación.', 'Saca la palabra clave: nunca, nadie, fábricas.'),
    x('voz-de-la-fuente', 'Ata cada preocupación a quien la tendría.', { ayuda: 'Tira un hilo desde cada preocupación hasta quien la tendría.', doc: PARAMO, portadas: [['Campesina del páramo', 'actor'], ['Acueducto de la ciudad', 'actor'], ['Empresa minera', 'actor'], ['Comunidad consultada', 'actor']],
      ...T(['perder su siembra de papa', 0, '¿Quién vive de la tierra?'], ['que disminuya el agua', 1, '¿Quién la lleva a las casas?'], ['no poder extraer', 2, '¿Quién busca minerales?'], ['que no se oiga su voz', 3, '¿Para quién existe la consulta?']), bien: 'Cada actor, su interés.' },
      'La campesina teme por su siembra, el acueducto por el agua, la empresa por extraer y la comunidad por ser oída.', 'Piensa qué perdería cada uno si se decide sin él.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: PARAMO, frases: [[3, 'la ley habla de ', 'reconversión', ''], [5, 'es muy ', 'vulnerable', ''], [4, 'envenena un río ', 'cojea', '']],
      ...F(['cambio gradual de actividad', 0, '¿Qué busca la ley con los campesinos?'], ['fácil de afectar', 1, '¿Qué le pasa al país con el clima?'], ['está incompleta', 2, '¿Qué le falta a esa mesa?'], ['expulsión', null, 'Es lo contrario de lo que busca la ley.'], ['muy fuerte', null, 'Es lo contrario de lo que le pasa.']), bien: 'El contexto las explica.' },
      'Reconversión es cambiar poco a poco, vulnerable es fácil de afectar y cojear es estar incompleta.', 'Lee el ejemplo que da el texto alrededor.'),
    x('balanza-tesis', 'Propuesta: «prohibir toda siembra en el páramo desde mañana». ¿Qué hace cada dato?', { doc: PARAMO, tesis: 'Prohibir toda siembra desde mañana',
      ...F(['El ganado y la siembra secan el suelo que guarda agua.', 0, '¿Es una razón a favor?'], ['Trescientas familias viven solo de esa siembra.', 1, '¿A quién deja sin sustento?'], ['Donde se ayudó a cambiar, el agua se recuperó sin expulsar a nadie.', 1, '¿Hacía falta prohibir de golpe?'], ['Las papas son amarillas.', 2, '¿Cambia la decisión?']), bien: 'Proteger sí, ¿de golpe?' },
      'El suelo la apoya; las familias y el cambio gradual la debilitan; el color no pesa.', 'Pregunta si el dato hace más o menos conveniente prohibir ya.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que **define** el desarrollo sostenible.', { doc: PARAMO, nums: [4], apuesta: 'Hoy sí, sin quitarle a mañana.', ...S(['4.0'], { '4.1': 'Dice cuáles son sus partes.', '4.2': 'Dice qué pasa si falta una.', '4.3': 'Da ejemplos que cojean.' }), bien: 'Necesidades de hoy y de mañana.' },
      'La primera oración lo define: satisfacer lo de hoy sin quitarles a las generaciones futuras.', 'Busca la oración que dice qué es lo que busca.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PARAMO, lineas: ['Renovable no significa infinito.', 'La neblina es blanca.', 'Los páramos dan agua y allí vive gente.', 'Lo sostenible cuida economía, sociedad y ambiente.', 'Hay vacas.', 'Las decisiones deben oír a quienes viven en el territorio.'], ...S([1, 4], { 0: 'Es la primera idea.', 2: 'Es el ejemplo central.', 3: 'Es el concepto.', 5: 'Es el cierre.' }), bien: 'Recursos, páramo, sostenible y voces.' },
      'La neblina blanca y las vacas son detalles; lo demás resume.', 'Deja lo que usarías para evaluar otro proyecto.'),
  ]);

  const PUERTO = {
    id: 'icf-puerto', title: 'El puerto de Bahía Mangle',
    paras: [
      'Bahía Mangle es un municipio de ocho mil habitantes en una costa de manglares. Dos de cada tres adultos viven de la pesca o de sacar piangua, un molusco que crece entre las raíces. Un mapa físico muestra allí una entrada honda y tranquila, ideal para barcos grandes. Un mapa de biodiversidad muestra, en el mismo punto, el criadero de peces más importante de la zona.',
      'En 2023 una empresa propuso construir un puerto. Ofreció seiscientos empleos durante la obra y noventa después. El gobierno nacional apoyó la idea: las mercancías del interior ahorrarían once horas de camino. El alcalde también, porque los impuestos alcanzarían para el hospital que el pueblo pide desde hace veinte años.',
      'El consejo comunitario pidió la consulta previa a la que tiene derecho. En las reuniones, los jóvenes se dividieron. «Yo no quiero sacar piangua toda la vida», dijo uno. «Y yo no quiero pedirle permiso a una empresa para entrar a mi playa», contestó otra. Las mujeres piangueras llevaron un mapa hecho por ellas, con los sitios donde trabajan, los caminos de agua y los nombres que les dieron sus abuelas. Ninguno aparecía en los planos de la empresa.',
      'Los estudios ambientales calcularon que se perdería un tercio del manglar. La empresa ofreció sembrar el doble en otra bahía, a sesenta kilómetros. Una bióloga advirtió que un manglar tarda unos quince años en volver a ser criadero y que, además, frena las olas en las tormentas, cada vez más fuertes.',
      'Después de un año acordaron un muelle más pequeño, en una punta sin manglar, aunque menos honda. Entrarán barcos medianos. Serán menos empleos, pero con cupos y formación para gente del municipio. El mapa de las piangueras quedó pegado al acuerdo como documento oficial: es el primero de la región en el que los lugares llevan los nombres que usa quien los camina.',
    ],
  };
  const Q = preg(PUERTO, 'sociales');
  return mundo('icf-sc-geografia', 'Territorio y Ambiente', 'sociales', [l1, l2], [
    ['icf-sc-geografia-1', 'Un mapa temático muestra un solo asunto.', Q('El mapa de biodiversidad y el físico muestran cosas distintas del mismo punto porque:', ['Uno está equivocado', 'Cada mapa escoge qué representar', 'Son de países distintos', 'Tienen el mismo tema'], 1, 'Uno muestra la profundidad y otro, el criadero: cada uno escoge.', 'Relee qué se ve en cada mapa en el párrafo 1.')],
    ['icf-sc-geografia-1', 'Un mapa puede dejar por fuera a la gente.', Q('El mapa de las piangueras es importante porque:', ['Es más bonito', 'Está a una escala menor', 'Muestra usos y nombres que los planos de la empresa no incluían', 'Fue hecho por el gobierno'], 2, 'Ninguno de esos sitios aparecía en los planos de la empresa.', 'Relee el final del párrafo 3 del texto.')],
    ['icf-sc-geografia-1', 'La población y su trabajo dependen del territorio.', Q('El dato de que dos de cada tres adultos viven de la pesca o la piangua permite deducir que:', ['El puerto afectaría el sustento de la mayoría', 'Nadie quiere el puerto', 'El municipio es muy rico', 'Todos son pescadores'], 0, 'Si el manglar se pierde, se afecta la actividad de la mayoría.', 'Une ese dato con lo que pasaría con el manglar.')],
    ['icf-sc-geografia-2', 'Sostenible: tres patas.', Q('El acuerdo final se acerca al desarrollo sostenible porque:', ['Elimina el puerto', 'Da el máximo de empleos', 'Busca equilibrar empleo, comunidad y manglar', 'Siembra en otra bahía'], 2, 'Menos empleos pero con formación, sin talar el manglar y con la comunidad.', 'Revisa qué pasa con cada pata.')],
    ['icf-sc-geografia-2', 'Compensar en otro lugar puede no reemplazar.', Q('La advertencia de la bióloga cuestiona la compensación porque:', ['Sembrar es ilegal', 'La otra bahía es más grande', 'Los manglares no existen', 'El daño es aquí y ahora; la recuperación, lejos y en quince años'], 3, 'El manglar nuevo estaría a sesenta kilómetros y tardaría años.', 'Compara dónde y cuándo se pierde y dónde y cuándo se recupera.')],
    ['icf-sc-geografia-2', 'La consulta previa busca oír a quienes viven en el territorio.', Q('La consulta previa permitió en este caso:', ['Que el gobierno decidiera solo', 'Que se prohibiera pescar', 'Que la empresa se fuera del país', 'Que la comunidad aportara información y cambiara el proyecto'], 3, 'Las piangueras llevaron su mapa y el proyecto cambió.', 'Compara el proyecto del comienzo con el acuerdo.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-economia.js
// Preicfes · Sociales y Ciudadanas · mundo 9 «Economía y Globalización» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const MERCADO = {
    id: 'icf-mercado-papa', title: 'Lo que dice un precio',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Febrero de 2026' },
    paras: [
      'Un precio es un mensaje. Cuando mucha gente quiere algo y hay poco, sube; cuando sobra, baja. La cantidad que los compradores quieren a cada precio se llama demanda; la que los vendedores ofrecen, oferta. El precio en que las dos coinciden es el de equilibrio.',
      'En el mercado de Villa Rica, una helada dañó la mitad de la papa. El bulto pasó de 80 mil a 140 mil pesos. Nadie se puso de acuerdo para subirlo: había menos papa y las mismas ganas de comerla. Algunas familias se pasaron a la yuca, que también subió un poco. Cuando un producto puede reemplazar a otro, se llaman sustitutos.',
      'No todos los mercados se parecen. Si hay muchos vendedores, compiten y ninguno manda. Si hay uno solo, es un monopolio: puede cobrar caro y atender mal. Si unos pocos se ponen de acuerdo en secreto para fijar el precio, forman un cartel, y en Colombia eso es ilegal.',
      'El Estado interviene por varias razones. Regula los monopolios, protege al consumidor y paga lo que el mercado no paga, como un faro o una campaña de vacunas. También pone límites: si una fábrica ensucia el río, el daño lo pagan otros, y a eso los economistas le dicen externalidad. Puede incluso fijar un precio máximo, pero si lo pone muy bajo los vendedores ofrecen menos y aparecen la escasez y la reventa.',
      'Para hacer todo eso cobra impuestos. Los directos, como el de renta, dependen de lo que cada quien gana o tiene. Los indirectos, como el IVA, se pagan al comprar: el mismo peso de impuesto sale del bolsillo de un rico y del de un pobre, aunque al pobre le duele más. Un impuesto es progresivo cuando cobra una proporción mayor a quien más tiene; es regresivo cuando termina pesando más sobre quien menos tiene.',
      'El dinero recogido va al presupuesto. En él se ve qué le importa a un gobierno: cuánto pone en escuelas, en carreteras o en pagar deudas. Si gasta más de lo que recibe hay déficit, y debe pedir prestado, recortar o cobrar más. Cada salida tiene quien la aplauda y quien la pague.',
    ],
  };
  const l1 = leccion('icf-sc-economia-1', 'Mercado, precios e impuestos', guion(
    ['Oferta y demanda', 'El precio sube si hay poco y muchos lo quieren; baja si sobra.'],
    ['Competencia, monopolio y cartel', 'Muchos compiten; uno solo manda; unos pocos se ponen de acuerdo.'],
    ['El papel del Estado', 'Regula, protege y paga lo que el mercado no paga.'],
    ['Impuestos', 'Directos e indirectos; progresivos y regresivos.']), [
    x('pinta-tipos', 'Pinta cada noticia con lo que cambió en el mercado.', { doc: MERCADO, plumas: ['baja la oferta', 'sube la oferta', 'sube la demanda'],
      ...P(['Una plaga acabó con los limones.', 0, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Hubo cosecha récord de tomate.', 1, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Llegó la temporada escolar y todos buscan cuadernos.', 2, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Cerró la mitad de las panaderías.', 0, '¿Cambió lo que se ofrece o lo que se quiere?']), bien: 'Vendedores o compradores.' },
      'La plaga y los cierres bajan la oferta, la cosecha la sube y la temporada sube la demanda.', 'Pregunta si el cambio les ocurrió a los que venden o a los que compran.'),
    x('genero-o-cita', '¿El impuesto es **directo** o **indirecto**?', { doc: MERCADO, rot: ['directo', 'indirecto'],
      ...F(['El de renta, según lo que se gana', 0, '¿Depende de lo que se tiene o de comprar?'], ['El IVA de un jabón', 1, '¿Depende de lo que se tiene o de comprar?'], ['El predial de una casa', 0, '¿Depende de lo que se tiene o de comprar?'], ['El que va en el precio de una gaseosa', 1, '¿Depende de lo que se tiene o de comprar?']), bien: 'Tener o comprar.' },
      'Renta y predial dependen de lo que se gana o se tiene; IVA y gaseosa, de comprar.', 'Mira si se paga por ganar o tener, o al momento de comprar.'),
    x('pista-tipo', 'Ata cada nombre a su caso.', { doc: MERCADO, lineas: ['una sola empresa vende el agua del pueblo', 'tres fábricas acuerdan en secreto el precio del pañal', 'cuarenta puestos venden arepas', 'el humo de un horno enferma a los vecinos'],
      ...T(['monopolio', 0, '¿Dónde hay un solo vendedor?'], ['cartel', 1, '¿Dónde hay un acuerdo secreto?'], ['competencia', 2, '¿Dónde hay muchos vendedores?'], ['externalidad', 3, '¿Dónde el daño lo pagan otros?']), bien: 'Uno, pocos, muchos y terceros.' },
      'Uno solo es monopolio, el acuerdo es cartel, muchos compiten y el humo es externalidad.', 'Cuenta los vendedores y mira quién paga el daño.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MERCADO, filas: [{ antes: 'La papa subió porque', topes: ['los vendedores se pusieron de acuerdo', 'el gobierno lo ordenó', 'había menos papa y la misma demanda'], va: 2 }, { antes: 'Un precio máximo muy bajo puede traer', topes: ['más producción', 'escasez y reventa', 'nada'], va: 1 }, { antes: 'Los carteles en Colombia son', topes: ['ilegales', 'legales', 'obligatorios'], va: 0 }], mira: ['Relee qué pasó después de la helada.', 'Relee el final del párrafo 4.', 'Relee el final del párrafo 3.'], luz: [[2, 'había menos papa'], [4, 'la escasez y la reventa'], [3, 'eso es ilegal']], bien: 'Menos papa, escasez e ilegales.' },
      'Había menos papa, el precio muy bajo trae escasez y los carteles son ilegales.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MERCADO, nums: [2, 3, 5], pregunta: 'Queda en pie', queda: 'El IVA se paga al comprar.',
      ...T(['Los vendedores de papa hicieron un acuerdo.', 2, 'Busca qué no hizo nadie.'], ['Todos los mercados funcionan igual.', 5, 'Busca la oración más corta del párrafo 3.'], ['El IVA depende de cuánto gana cada quien.', 11, 'Busca qué se dice de los indirectos.']), bien: 'Nadie, no todos y al comprar.' },
      'Nadie se puso de acuerdo, no todos los mercados se parecen y el IVA se paga al comprar.', 'Saca la palabra clave: acuerdo, igual, gana.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MERCADO, nums: [2, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El bulto llegó a 140 mil pesos.', 0, 'Léela junto a la helada.'], ['Para esas familias, la yuca es un sustituto de la papa.', 1, '¿Qué hicieron algunas familias?'], ['El mismo IVA quita una proporción mayor del ingreso de un pobre.', 1, 'Compara el mismo peso en dos bolsillos.'], ['La helada duró tres días.', 2, '¿Se dice cuánto duró?']),
      luz: [[2, '140 mil'], [2, 'se pasaron a la yuca'], [5, 'al pobre le duele más']], bien: 'Sustitutos y proporciones.' },
      'Los 140 mil están escritos; la yuca y la proporción se deducen; los días no aparecen.', 'Piensa qué significa en la práctica cada ejemplo del texto.'),
    x('balanza-tesis', 'Propuesta: «fijar un precio máximo a los arriendos». ¿Qué hace cada dato?', { doc: MERCADO, tesis: 'Fijar un precio máximo a los arriendos',
      ...F(['Miles de familias gastan en arriendo más de la mitad del sueldo.', 0, '¿A quién ayudaría?'], ['Donde se hizo, muchos dueños dejaron de arrendar.', 1, '¿Qué pasó con la oferta?'], ['Las casas tienen ventanas.', 2, '¿Cambia la decisión?']), bien: 'Ayuda a unos, reduce la oferta.' },
      'El gasto de las familias la apoya; la oferta que bajó la debilita; las ventanas no pesan.', 'Pregunta si el dato hace más o menos conveniente la medida.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MERCADO, lineas: ['El precio depende de la oferta y la demanda.', 'El bulto es de papa.', 'Hay competencia, monopolios y carteles.', 'El Estado interviene y cobra impuestos.', 'Hay un faro.', 'El presupuesto muestra las prioridades de un gobierno.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Son las clases de mercado.', 3: 'Es el papel del Estado.', 5: 'Es el cierre.' }), bien: 'Precio, mercados, Estado y presupuesto.' },
      'El bulto y el faro son detalles; lo demás resume.', 'Deja lo que usarías para explicar otro mercado.'),
  ]);

  const CANASTA = {
    id: 'icf-canasta-rosa', title: 'La canasta de Rosa',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Marzo de 2026' },
    paras: [
      'En enero, Rosa llenaba su canasta con 100 mil pesos. En diciembre, la misma canasta le costó 110 mil. Esa subida general de los precios se llama inflación: en su caso fue del 10 %. Que suba solo el tomate no es inflación; que suba casi todo, sí.',
      'Rosa gana lo mismo que en enero. Su salario nominal, el que dice el recibo, no cambió; su salario real, que es lo que alcanza a comprar, bajó. Si se lo hubieran subido el 10 %, estaría igual. Quien guarda billetes debajo del colchón también pierde, y quien debe plata a una tasa fija a veces gana.',
      'El banco central de un país, que en Colombia es el Banco de la República, intenta mantener la inflación baja. Su herramienta principal es la tasa de interés. Si la sube, los préstamos salen caros, la gente gasta menos y los precios se frenan. El costo es que también se frenan las ventas y el empleo.',
      'La tasa de desempleo mide qué parte de la fuerza laboral busca trabajo y no lo encuentra. Quien no busca no cuenta: ni el estudiante de tiempo completo, ni quien se cansó de buscar. Por eso la tasa puede bajar por dos razones muy distintas. Además, muchos de los que trabajan lo hacen en la informalidad: sin contrato, ni salud, ni pensión.',
      'La pobreza se mide de más de una forma. La monetaria compara el ingreso con lo que cuesta una canasta básica. La multidimensional mira también la escuela, la salud, el agua y la vivienda. Una familia puede pasar la línea del ingreso y seguir sin acueducto. También hay hogares que salen de la pobreza y vuelven a entrar varias veces en pocos años.',
      'La desigualdad es otra cosa: mira cómo se reparte. El índice de Gini va de 0, cuando todos tienen lo mismo, a 1, cuando uno solo lo tiene todo. Un país puede volverse más rico y más desigual a la vez. El producto interno bruto por persona divide la torta por igual en el papel, no en la mesa.',
    ],
  };
  const l2 = leccion('icf-sc-economia-2', 'Inflación, desempleo y pobreza', guion(
    ['Inflación', 'Subida general de los precios; baja lo que alcanza el salario.'],
    ['Tasa de interés', 'Si sube, se gasta menos y los precios se frenan; también el empleo.'],
    ['Desempleo', 'Solo cuenta a quien busca trabajo y no lo encuentra.'],
    ['Pobreza y desigualdad', 'Cuánto falta y cómo se reparte son preguntas distintas.']), [
    x('genero-o-cita', '¿La medida habla de **pobreza** o de **desigualdad**?', { doc: CANASTA, rot: ['pobreza', 'desigualdad'],
      ...F(['Hogares que no alcanzan la canasta básica', 0, '¿Mira lo que falta o cómo se reparte?'], ['Índice de Gini', 1, '¿Mira lo que falta o cómo se reparte?'], ['Viviendas sin agua potable', 0, '¿Mira lo que falta o cómo se reparte?'], ['Parte del ingreso que recibe el 10 % más rico', 1, '¿Mira lo que falta o cómo se reparte?']), bien: 'Lo que falta o el reparto.' },
      'La canasta y el agua miran lo que falta; el Gini y la parte del más rico, el reparto.', 'Pregunta si se compara con una línea o entre personas.'),
    x('pasos-del-proceso', 'Ordena lo que ocurre cuando el banco central frena la inflación. El primero está en su puesto.', { doc: CANASTA, que: 'el freno', de: 'La canasta de Rosa', fija: 1, ini: [0, 2, 4, 1, 3], tiras: ['Los precios suben mucho.', 'El banco sube la tasa de interés.', 'Los préstamos salen caros.', 'La gente gasta menos.', 'Los precios se frenan.'], mira: ['', 'Es la herramienta del banco.', 'Es lo primero que cambia con la tasa.', 'Es lo que hace la gente con créditos caros.', 'Es el resultado buscado.'], bien: 'Tasa, préstamos, gasto y precios.' },
      'Sube la tasa, se encarecen los préstamos, se gasta menos y los precios se frenan.', 'Pregunta qué tuvo que pasar antes de cada paso.'),
    x('pinta-tipos', 'Pinta cada persona según cómo cuenta en la tasa de desempleo.', { doc: CANASTA, plumas: ['desempleada', 'ocupada', 'no está en la fuerza laboral'],
      ...P(['Busca trabajo hace tres meses y no encuentra.', 0, '¿Trabaja? ¿Busca?'], ['Vende tintos sin contrato.', 1, '¿Trabaja? ¿Busca?'], ['Estudia todo el día y no busca trabajo.', 2, '¿Trabaja? ¿Busca?'], ['Se cansó de buscar y ya no busca.', 2, '¿Trabaja? ¿Busca?']), bien: 'Trabajar, buscar o ninguna.' },
      'La que busca es desempleada, la que vende está ocupada y quienes no buscan no cuentan.', 'Haz dos preguntas: si trabaja y, si no, si está buscando.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CANASTA, filas: [{ antes: 'El salario nominal de Rosa', topes: ['subió', 'bajó', 'no cambió'], va: 2 }, { antes: 'Su salario real', topes: ['subió', 'bajó', 'no cambió'], va: 1 }, { antes: 'Un Gini de 0 significa', topes: ['que todos tienen lo mismo', 'que uno lo tiene todo', 'que nadie trabaja'], va: 0 }], mira: ['Relee qué dice el recibo.', 'Relee lo que alcanza a comprar.', 'Relee entre qué números va el índice.'], luz: [[2, 'no cambió'], [2, 'lo que alcanza a comprar, bajó'], [6, 'cuando todos tienen lo mismo']], bien: 'Igual, menos y todos igual.' },
      'El nominal no cambió, el real bajó y un Gini de 0 es que todos tienen lo mismo.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CANASTA, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'Un país puede crecer y volverse más desigual.',
      ...T(['Si sube el tomate, hay inflación.', 3, 'Busca el ejemplo del tomate.'], ['Todo el que no trabaja cuenta como desempleado.', 5, 'Busca quién no cuenta.'], ['El PIB por persona muestra lo que recibe cada quien.', 11, 'Busca la torta.']), bien: 'Casi todo, quien busca y el papel.' },
      'Que suba solo el tomate no es inflación, quien no busca no cuenta y la torta se reparte igual solo en el papel.', 'Saca la palabra clave: tomate, no trabaja, por persona.'),
    x('voz-de-la-fuente', 'Con inflación alta, ata cada efecto a quien lo vive.', { ayuda: 'Tira un hilo desde cada efecto hasta quien lo vive.', doc: CANASTA, portadas: [['Empleada con sueldo fijo', 'actor'], ['Quien guarda billetes', 'actor'], ['Quien debe a tasa fija', 'actor'], ['Banco central', 'actor']],
      ...T(['compra menos con lo mismo que gana', 0, '¿Quién recibe igual cada mes?'], ['sus ahorros alcanzan para menos', 1, '¿Quién tiene la plata quieta?'], ['lo que paga vale cada vez menos', 2, '¿Quién puede ganar?'], ['debe subir la tasa', 3, '¿Quién tiene esa herramienta?']), bien: 'No todos la viven igual.' },
      'El sueldo alcanza menos, los billetes pierden, la deuda fija pesa menos y el banco sube la tasa.', 'Piensa qué tiene cada uno y si ese valor cambia.'),
    x('balanza-tesis', 'Afirmación: «bajó el desempleo, así que hay más gente trabajando». ¿Qué hace cada dato?', { doc: CANASTA, tesis: 'Hay más gente trabajando',
      ...F(['Aumentó en 200 mil el número de ocupados.', 0, '¿Creció el número que importa?'], ['Muchos dejaron de buscar y hay los mismos ocupados.', 1, '¿Por qué bajó la tasa?'], ['La encuesta se imprimió en papel azul.', 2, '¿Dice algo del empleo?']), bien: 'La tasa baja por dos razones.' },
      'Más ocupados la apoya; dejar de buscar la debilita; el papel no pesa.', 'Recuerda que la tasa puede bajar por dos razones.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: CANASTA, frases: [[2, 'Su salario ', 'nominal', ', el que dice el recibo'], [4, 'lo hacen en la ', 'informalidad', ''], [1, 'Esa subida ', 'general', ' de los precios']],
      ...F(['en pesos', 0, '¿Qué mira el recibo?'], ['falta de protección', 1, '¿Qué no tienen: contrato, salud?'], ['de casi todos', 2, '¿Sube uno o muchos?'], ['de uno solo', null, 'Es lo contrario de general.'], ['en compras', null, 'Eso sería el salario real.']), bien: 'El contexto las explica.' },
      'Nominal es en pesos, informalidad es falta de protección y general es de casi todos.', 'Lee el ejemplo que da el texto alrededor.'),
  ]);

  const CAMISETA = {
    id: 'icf-camiseta', title: 'La camiseta que dio la vuelta al mundo',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Abril de 2026' },
    paras: [
      'La camiseta que lleva puesta Nico dice «Hecho en Vietnam». El algodón creció en la India, la tela se tejió en China, el diseño se dibujó en España y el barco que la trajo navega con bandera de Panamá. A esa red de países conectados por el comercio, el dinero, la información y las personas se le llama globalización.',
      'No es nueva. Hace siglos, la seda y la plata ya cruzaban el mundo. Lo nuevo es la velocidad: los contenedores abarataron el transporte, internet acercó las oficinas y los tratados bajaron los aranceles, que son los impuestos a lo que entra de otro país.',
      'Un tratado de libre comercio abre la puerta en los dos sentidos. Quien exporta flores o café encuentra más compradores; quien produce arroz o leche debe competir con fincas gigantes que a veces reciben subsidios de sus gobiernos. El consumidor suele pagar menos. El pequeño productor, si nadie lo ayuda a prepararse, puede quebrar.',
      'Las multinacionales llevan empleo y tecnología a los países donde se instalan. También buscan dónde los salarios y las exigencias ambientales son menores. Si un país sube sus reglas, pueden amenazar con irse. Por eso algunos proponen reglas comunes: un impuesto mínimo y derechos laborales que valgan en todas partes.',
      'La cultura también viaja. Millones de migrantes envían dinero a sus casas y llevan consigo recetas, palabras, canciones y fiestas de su tierra. Nico oye música coreana y, en Seúl, una muchacha baila salsa caleña. Unos temen que todo termine pareciéndose; otros ven mezclas nuevas. A lo local que se cruza con lo global algunos le dicen «glocal»: una hamburguesa con patacón.',
      'Estar conectados también contagia los problemas. Una crisis en los bancos de un país deja sin empleo a gente de otro; un virus da la vuelta al mundo en semanas; una guerra lejana encarece el pan. Organismos como la ONU, el Fondo Monetario Internacional o la Organización Mundial del Comercio intentan coordinar respuestas. No todos los países pesan lo mismo en ellos.',
    ],
  };
  const l3 = leccion('icf-sc-economia-3', 'Globalización', guion(
    ['Una red', 'Países conectados por comercio, dinero, información y personas.'],
    ['Libre comercio', 'Bajan los aranceles: unos ganan mercados y otros pierden el suyo.'],
    ['Empresas y reglas', 'Las multinacionales llevan empleo y buscan costos bajos.'],
    ['Cultura y crisis', 'También viajan las costumbres y los problemas.']), [
    x('pinta-tipos', 'Pinta cada ejemplo con la dimensión de la globalización que muestra.', { doc: CAMISETA, plumas: ['económica', 'cultural', 'política'],
      ...P(['Se exportan flores a otro continente.', 0, '¿Comercio, costumbres o gobierno?'], ['Se baila salsa en Seúl.', 1, '¿Comercio, costumbres o gobierno?'], ['Varios países firman un acuerdo en la ONU.', 2, '¿Comercio, costumbres o gobierno?'], ['Una hamburguesa lleva patacón.', 1, '¿Comercio, costumbres o gobierno?']), bien: 'Comercio, costumbres y acuerdos.' },
      'Las flores son economía, la salsa y la hamburguesa cultura, y el acuerdo política.', 'Pregunta qué cruza la frontera: cosas, costumbres o decisiones.'),
    x('genero-o-cita', 'Con un tratado de libre comercio, ¿más bien **gana** o **arriesga**?', { doc: CAMISETA, rot: ['gana', 'arriesga'],
      ...F(['Quien exporta café', 0, '¿Encuentra compradores o competidores?'], ['Quien siembra arroz en una finca pequeña', 1, '¿Encuentra compradores o competidores?'], ['Quien compra más barato', 0, '¿Paga menos o más?'], ['Quien vende leche sin ayuda para prepararse', 1, '¿Encuentra compradores o competidores?']), bien: 'La puerta se abre en los dos sentidos.' },
      'Exportador y consumidor ganan; arroz y leche de pequeños productores arriesgan.', 'Piensa a quién se le abre un mercado y a quién le llega un competidor.'),
    x('pista-tipo', 'Ata cada término a su ejemplo.', { doc: CAMISETA, lineas: ['impuesto a lo que entra de otro país', 'fábrica con sedes en nueve países', 'ayuda de un gobierno a sus fincas', 'arepa rellena de sushi'],
      ...T(['arancel', 0, '¿Cuál se cobra en la frontera?'], ['multinacional', 1, '¿Cuál está en muchos países?'], ['subsidio', 2, '¿Cuál es una ayuda?'], ['glocal', 3, '¿Cuál mezcla lo local y lo global?']), bien: 'Impuesto, empresa, ayuda y mezcla.' },
      'El arancel se cobra al entrar, la multinacional está en varios países, el subsidio ayuda y lo glocal mezcla.', 'Busca en el texto la explicación que acompaña cada término.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CAMISETA, filas: [{ antes: 'La globalización', topes: ['empezó con internet', 'ya terminó', 'no es nueva'], va: 2 }, { antes: 'En los organismos internacionales los países', topes: ['pesan todos igual', 'no pesan todos lo mismo', 'no participan'], va: 1 }, { antes: 'Los tratados', topes: ['bajaron los aranceles', 'subieron los aranceles', 'crearon la seda'], va: 0 }], mira: ['Relee el comienzo del párrafo 2.', 'Relee el final del texto.', 'Relee lo nuevo del párrafo 2.'], luz: [[2, 'No es nueva'], [6, 'No todos los países pesan lo mismo'], [2, 'bajaron los aranceles']], bien: 'No es nueva, no pesan igual y bajaron.' },
      'No es nueva, los países no pesan lo mismo y los tratados bajaron los aranceles.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CAMISETA, nums: [2, 4, 6], pregunta: 'Queda en pie', queda: 'Un problema lejano puede afectar lo que se paga aquí.',
      ...T(['El comercio entre continentes es un invento reciente.', [0, 1], 'Busca la seda y la plata.'], ['Las multinacionales solo buscan donde hay más exigencias.', 4, 'Busca qué buscan también.'], ['Una crisis se queda siempre en el país donde nace.', [7, 8], 'Busca el ejemplo de los bancos.']), bien: 'Seda, menores y otro país.' },
      'La seda cruzaba hace siglos, las multinacionales buscan exigencias menores y la crisis pasa a otro país.', 'Saca la palabra clave: reciente, exigencias, crisis.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CAMISETA, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El algodón creció en la India.', 0, 'Léela junto a la camiseta.'], ['La etiqueta no cuenta todos los países que participaron.', 1, 'Compara lo que dice con los países que nombra el texto.'], ['Al arrocero le convendría ayuda antes de firmar el tratado.', 1, '¿Qué le puede pasar si nadie lo prepara?'], ['Nico pagó veinte mil por la camiseta.', 2, '¿Se dice cuánto pagó?']),
      luz: [[1, 'El algodón creció en la India'], [1, '«Hecho en Vietnam»'], [3, 'si nadie lo ayuda a prepararse']], bien: 'Comparar y prever.' },
      'La India está escrita; la etiqueta y la ayuda se deducen; el precio no aparece.', 'Compara lo que muestra la etiqueta con lo que cuenta el texto.'),
    x('voz-de-la-fuente', 'Ata cada opinión sobre un tratado a quien la diría.', { ayuda: 'Tira un hilo desde cada opinión hasta quien la diría.', doc: CAMISETA, portadas: [['Exportadora de flores', 'actor'], ['Arrocero pequeño', 'actor'], ['Sindicato', 'actor'], ['Comprador', 'actor']],
      ...T(['«por fin entro a ese mercado»', 0, '¿A quién se le abre una puerta?'], ['«no puedo competir con sus subsidios»', 1, '¿Quién enfrenta fincas gigantes?'], ['«que los derechos valgan aquí y allá»', 2, '¿Quién defiende a los trabajadores?'], ['«ahora me sale más barato»', 3, '¿Quién paga menos?']), bien: 'Cada quien desde su lugar.' },
      'La exportadora gana mercado, el arrocero compite, el sindicato pide derechos y el comprador ahorra.', 'Pregunta qué le cambia el tratado a cada uno.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CAMISETA, lineas: ['La globalización conecta países.', 'El barco lleva bandera.', 'El libre comercio beneficia a unos y golpea a otros.', 'La cultura también viaja y se mezcla.', 'El patacón va con hamburguesa.', 'Las crisis se contagian y piden coordinación.'], ...S([1, 4], { 0: 'Es la definición.', 2: 'Es la idea sobre el comercio.', 3: 'Es la idea sobre la cultura.', 5: 'Es el cierre.' }), bien: 'Red, comercio, cultura y crisis.' },
      'La bandera y el patacón son detalles; lo demás resume.', 'Deja lo que sirve para entender otro producto o país.'),
  ]);

  const CAFE = {
    id: 'icf-cooperativa-cafe', title: 'La taza y la montaña',
    paras: [
      'En Alto Brisas, trescientas familias siembran café. Durante años se lo vendieron al único comprador que subía con camión. Pagaba lo que quería: no había otro. En 2023 las familias formaron una cooperativa, compraron su propio camión y empezaron a vender directo a tostadores de Japón y Alemania. El precio que reciben por carga subió un 40 %.',
      'No todo fue ganancia. El precio del café se decide en una bolsa, a miles de kilómetros. Cuando en Brasil hay buena cosecha, baja en Alto Brisas, aunque allí no haya cambiado nada. En la última caída, la carga pasó de un millón a setecientos mil pesos en cuatro meses. Ese mismo año, los fertilizantes importados se encarecieron por una guerra en otro continente.',
      'Con los ingresos de los primeros años, la cooperativa pagó mejor a los recolectores. Pero en el pueblo los precios subieron 12 % y el jornal, solo 8 %. «Gano más pesos y compro menos mercado», resumió doña Elvira, recolectora. La mayoría trabaja sin contrato, y fuera de la cosecha muchos dejan de buscar empleo porque saben que no hay. Las cifras oficiales dicen que el desempleo del municipio es bajo.',
      'El alcalde propuso un impuesto igual para todas las familias: cien mil pesos al año para arreglar la carretera. La cooperativa respondió con otra idea: que cada quien pague un porcentaje de lo que vende. «Cien mil pesos es un almuerzo para el hotel y un mes de mercado para un recolector», dijo su gerente. Después de varias asambleas se aprobó el porcentaje.',
      'Un estudiante calculó que el ingreso promedio por persona del municipio se había duplicado en seis años. También que casi todo el aumento había quedado en el 10 % de las familias, las dueñas de más tierra. En la plaza hay ahora un café con letrero en inglés donde una taza cuesta lo que un recolector gana en media mañana. Los turistas le toman fotos a la montaña. «Yo a esa montaña la conozco por debajo», dice doña Elvira, «que es por donde se recoge».',
    ],
  };
  const Q = preg(CAFE, 'sociales');
  return mundo('icf-sc-economia', 'Economía y Globalización', 'sociales', [l1, l2, l3], [
    ['icf-sc-economia-1', 'Un solo comprador tiene mucho poder.', Q('Antes de la cooperativa, el comprador podía pagar lo que quería porque:', ['Era el único que compraba', 'El café era malo', 'Lo ordenaba la ley', 'Había muchos compradores'], 0, 'Sin otros compradores, las familias no tenían a quién más vender.', 'Relee qué dice el texto del único camión.')],
    ['icf-sc-economia-1', 'Progresivo: paga más quien más tiene.', Q('El argumento del gerente contra los cien mil pesos iguales es que esa cuota:', ['Es ilegal', 'No alcanza para la carretera', 'Pesa más sobre quien menos tiene', 'La cobran en dólares'], 2, 'Es un almuerzo para el hotel y un mes de mercado para un recolector.', 'Compara qué significa esa suma para cada uno.')],
    ['icf-sc-economia-2', 'El salario real es lo que se alcanza a comprar.', Q('La frase «gano más pesos y compro menos mercado» significa que doña Elvira:', ['Perdió su empleo', 'Tiene más salario real', 'Tiene el mismo salario nominal', 'Tiene más salario nominal y menos salario real'], 3, 'El jornal subió 8 % y los precios, 12 %.', 'Compara la subida del jornal con la de los precios.')],
    ['icf-sc-economia-2', 'Quien no busca no cuenta como desempleado.', Q('El desempleo oficial puede ser bajo aunque fuera de la cosecha falte trabajo porque:', ['Todos tienen contrato', 'Quienes dejan de buscar no se cuentan', 'La cooperativa miente', 'Los turistas cuentan como empleados'], 1, 'Muchos dejan de buscar y salen de la cuenta.', 'Recuerda a quién cuenta la tasa de desempleo.')],
    ['icf-sc-economia-2', 'Promedio alto y reparto desigual.', Q('Los cálculos del estudiante muestran que el municipio:', ['Es más rico y más desigual', 'Es más pobre', 'Reparte todo por igual', 'No ha cambiado'], 0, 'El promedio se duplicó y casi todo quedó en el 10 % de las familias.', 'Une los dos datos del estudiante.')],
    ['icf-sc-economia-3', 'Lo que pasa lejos llega hasta aquí.', Q('Un ejemplo de que la globalización contagia problemas en Alto Brisas es:', ['La compra del camión', 'El letrero en inglés', 'Las asambleas', 'El alza de los fertilizantes por una guerra lejana'], 3, 'Una guerra en otro continente encareció un insumo local.', 'Busca un hecho lejano con efecto en el pueblo.')],
    ['icf-sc-economia-3', 'La puerta se abre en los dos sentidos.', Q('La relación de la cooperativa con el mercado mundial se describe mejor como:', ['Solo beneficios', 'Una oportunidad que también trae riesgos', 'Solo pérdidas', 'Un asunto que no la afecta'], 1, 'Subió el precio que reciben, pero dependen de la bolsa y de los insumos.', 'Compara el final del párrafo 1 con el párrafo 2.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-modelos.js
// Preicfes · Sociales y Ciudadanas · mundo 10 «Modelos para Decidir» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const CONCEPTOS = {
    id: 'icf-conceptos', title: 'Las palabras que ordenan el mundo',
    ficha: { autor: 'Cuaderno de ciencias sociales', fuente: 'Colección «Ideas»', fecha: 'Febrero de 2026' },
    paras: [
      'En una clase, Samir preguntó si Colombia es un Estado, una nación o un país. La profesora contestó que depende de qué se quiera mirar. Un concepto es una herramienta: sirve para ver una parte de la realidad y deja otra en la sombra. Usar uno por otro hace que dos personas discutan sin hablar de lo mismo.',
      'El Estado es una organización que gobierna un territorio y una población, y que tiene la autoridad para hacer leyes y hacerlas cumplir. Tiene soberanía cuando ningún otro manda sobre él. El gobierno es apenas el grupo de personas que lo dirige por un tiempo: los gobiernos cambian y el Estado continúa.',
      'La nación es otra cosa: un grupo que se reconoce unido por una historia, una lengua o unas costumbres. Un Estado puede reunir varias naciones, como ocurre en Bolivia, que se define como plurinacional. Y hay naciones sin Estado propio, como el pueblo kurdo, repartido entre varios países.',
      'Poder es la capacidad de influir en lo que hacen otros. A veces se ejerce por la fuerza; a veces, porque la gente reconoce que quien manda tiene derecho a hacerlo. A eso último se le llama legitimidad. Algo puede ser legal y perder legitimidad: una norma aprobada según las reglas, pero que casi todos consideran injusta.',
      'La sociedad también se mira por capas. La clase social agrupa según los ingresos, el trabajo o la propiedad; la etnia, según una cultura y un origen compartidos; el género, según lo que una sociedad espera de hombres y mujeres. Una misma persona está en todas a la vez. Cuando es posible subir o bajar de posición, se habla de movilidad social.',
      'La cultura no es solo arte ni folclor: son los modos de vivir, creer y hacer que se aprenden. Juzgar otra cultura con la medida de la propia es etnocentrismo; tratar de entenderla desde sus propias razones es relativismo cultural. Entender, aclaró la profesora, no obliga a aprobarlo todo: los derechos humanos ponen un límite.',
    ],
  };
  const l1 = leccion('icf-sc-modelos-1', 'Conceptos básicos', guion(
    ['Para qué un concepto', 'Deja ver una parte de la realidad.'],
    ['Estado, gobierno y nación', 'Una organización, quienes la dirigen y un grupo que se siente unido.'],
    ['Poder y legitimidad', 'Influir en otros; y que reconozcan el derecho a mandar.'],
    ['Sociedad y cultura', 'Clase, etnia, género; y modos de vivir que se aprenden.']), [
    x('pinta-tipos', 'Pinta cada ejemplo con el concepto que le corresponde.', { doc: CONCEPTOS, plumas: ['Estado', 'gobierno', 'nación'],
      ...P(['El presidente y sus ministros de este periodo.', 1, '¿Organización, personas o grupo unido?'], ['Un pueblo que comparte lengua e historia, sin país propio.', 2, '¿Organización, personas o grupo unido?'], ['La organización que hace leyes en un territorio.', 0, '¿Organización, personas o grupo unido?'], ['Lo que continúa cuando cambian los gobernantes.', 0, '¿Organización, personas o grupo unido?']), bien: 'Organización, personas y grupo.' },
      'Los ministros son gobierno, el pueblo es nación y la organización que continúa, Estado.', 'Pregunta si cambia con las elecciones y si depende de sentirse unidos.'),
    x('genero-o-cita', '¿Es poder por la **fuerza** o por **legitimidad**?', { doc: CONCEPTOS, rot: ['fuerza', 'legitimidad'],
      ...F(['Obedecen porque los amenazan con armas', 0, '¿Reconocen el derecho a mandar?'], ['Aceptan al alcalde porque lo eligieron', 1, '¿Reconocen el derecho a mandar?'], ['Siguen a la mayora por respeto a su sabiduría', 1, '¿Reconocen el derecho a mandar?'], ['Pagan una «vacuna» por miedo', 0, '¿Reconocen el derecho a mandar?']), bien: 'Miedo o reconocimiento.' },
      'Armas y miedo son fuerza; la elección y el respeto, legitimidad.', 'Piensa si obedecerían aunque nadie los amenazara.'),
    x('pista-tipo', 'Ata cada concepto a su caso.', { doc: CONCEPTOS, lineas: ['la hija de un obrero llega a ser jueza', '«qué raro comen ellos, lo normal es lo nuestro»', 'estudiar por qué otro pueblo entierra así a sus muertos', 'ningún otro país decide por este'],
      ...T(['movilidad social', 0, '¿Dónde cambia la posición?'], ['etnocentrismo', 1, '¿Dónde se juzga con la medida propia?'], ['relativismo cultural', 2, '¿Dónde se intenta entender?'], ['soberanía', 3, '¿Dónde nadie manda de afuera?']), bien: 'Cada caso, su palabra.' },
      'Subir es movilidad, juzgar es etnocentrismo, entender es relativismo y no recibir órdenes, soberanía.', 'Busca en el texto la explicación que acompaña cada palabra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CONCEPTOS, filas: [{ antes: 'Un Estado', topes: ['tiene una sola nación', 'no tiene naciones', 'puede reunir varias naciones'], va: 2 }, { antes: 'Algo legal', topes: ['siempre es legítimo', 'puede perder legitimidad', 'nunca es legítimo'], va: 1 }, { antes: 'Entender otra cultura', topes: ['no obliga a aprobarlo todo', 'obliga a aprobarlo todo', 'es imposible'], va: 0 }], mira: ['Relee el ejemplo de Bolivia.', 'Relee el final del párrafo 4.', 'Relee lo que aclaró la profesora.'], luz: [[3, 'puede reunir varias naciones'], [4, 'puede ser legal y perder legitimidad'], [6, 'no obliga a aprobarlo todo']], bien: 'Varias, puede y no obliga.' },
      'Puede reunir varias naciones, lo legal puede perder legitimidad y entender no obliga a aprobar.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONCEPTOS, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'El gobierno dirige el Estado por un tiempo.',
      ...T(['Cuando cambia el gobierno, el Estado termina.', 2, 'Busca qué cambia y qué continúa.'], ['Toda nación tiene su propio Estado.', 5, 'Busca el pueblo kurdo.'], ['La cultura es solo el arte y el folclor.', 6, 'Busca qué no es la cultura solamente.']), bien: 'Continúa, sin Estado y no solo.' },
      'El Estado continúa, hay naciones sin Estado y la cultura no es solo arte.', 'Saca la palabra clave: termina, toda, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONCEPTOS, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Bolivia se define como plurinacional.', 0, 'Léela junto al ejemplo.'], ['Estado y nación no siempre coinciden.', 1, 'Compara los dos ejemplos del párrafo 3.'], ['Dos personas de la misma clase pueden ser de distinta etnia.', 1, '¿Por qué cosas agrupa cada capa?'], ['El pueblo kurdo tiene treinta lenguas.', 2, '¿Se dice cuántas tiene?']),
      luz: [[3, 'se define como plurinacional'], [3, 'naciones sin Estado propio'], [5, 'Una misma persona está en todas a la vez']], bien: 'Comparar ejemplos.' },
      'Lo plurinacional está escrito; que no coinciden y las capas se deducen; las lenguas no aparecen.', 'Une los ejemplos con las definiciones del texto.'),
    x('balanza-tesis', 'Idea: «en este municipio hay poca movilidad social». ¿Qué hace cada dato?', { doc: CONCEPTOS, tesis: 'Hay poca movilidad social',
      ...F(['Nueve de cada diez hijos de jornaleros son jornaleros.', 0, '¿Cambian de posición?'], ['La mitad de los hijos de jornaleros terminó la universidad y cambió de oficio.', 1, '¿Cambian de posición?'], ['El municipio tiene un río.', 2, '¿Habla de posiciones?']), bien: 'Subir o quedarse.' },
      'Que repitan el oficio la apoya; que cambien la debilita; el río no pesa.', 'Recuerda qué significa movilidad social y compara padres e hijos.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CONCEPTOS, lineas: ['Un concepto deja ver una parte de la realidad.', 'Samir hizo una pregunta en clase.', 'Estado, gobierno y nación son cosas distintas.', 'El poder puede apoyarse en la fuerza o en la legitimidad.', 'Los kurdos viven en varios países.', 'Clase, etnia, género y cultura ayudan a mirar la sociedad.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es la primera distinción.', 3: 'Es la idea sobre el poder.', 5: 'Son las otras herramientas.' }), bien: 'Herramientas y distinciones.' },
      'La pregunta de Samir y los kurdos son ejemplos; lo demás resume.', 'Deja lo que serviría para analizar otro país.'),
  ]);

  const MODELOS = {
    id: 'icf-rio-manso', title: 'Cuatro maneras de arreglar un pueblo',
    ficha: { autor: 'Cuaderno de ciencias sociales', fuente: 'Colección «Ideas»', fecha: 'Marzo de 2026' },
    paras: [
      'Río Manso tiene un hospital viejo, una escuela llena y poco dinero. El concejo pidió propuestas. Llegaron cuatro, y detrás de cada una había una idea distinta de lo que debe hacer un Estado. A esas ideas simplificadas, que ayudan a comparar, las ciencias sociales les dicen modelos.',
      'La primera propone bajar impuestos y dejar que empresas privadas compitan por atender a la gente. Confía en la libertad de cada quien y en el mercado: el Estado debe ser pequeño y cuidar las reglas. Es la lógica liberal en lo económico. Sus críticos preguntan qué pasa con quien no puede pagar.',
      'La segunda propone cobrar más a quienes más tienen y ofrecer salud y escuela gratuitas para todos. Es la lógica del Estado de bienestar, que mantiene el mercado y reparte una parte de lo que produce. Sus críticos preguntan cuánto puede cobrarse antes de que las empresas se vayan.',
      'La tercera propone que el municipio sea dueño de las principales empresas y decida qué producir. Es la lógica socialista: lo que es de todos debe servir a todos. Sus críticos señalan que, sin competencia ni controles, quien administra puede volverse ineficiente o abusar del poder.',
      'La cuarta viene de la vereda: que las comunidades decidan en asamblea, según sus costumbres, y que el bienestar no se mida solo en dinero, sino en agua limpia, tiempo y vida en común. Es la lógica comunitaria, cercana a lo que varios pueblos andinos llaman buen vivir. Sus críticos preguntan si funciona para una ciudad de un millón de personas.',
      'El concejo terminó mezclando: salud pública, un parque industrial privado y presupuesto votado en las veredas. Casi ningún país usa un modelo puro. Reconocerlos sirve para otra cosa: ante una decisión, preguntar qué valor pone primero, si la libertad, la igualdad, la propiedad común o la comunidad; a quién beneficia, y qué deja por fuera. Ningún modelo es neutral; tampoco lo es quien lo critica. Por eso conviene comparar las respuestas que da cada uno y no solo su nombre.',
    ],
  };
  const l2 = leccion('icf-sc-modelos-2', 'Modelos y decisiones públicas', guion(
    ['Modelo', 'Una idea simplificada que ayuda a comparar.'],
    ['Cuatro lógicas', 'Liberal, de bienestar, socialista y comunitaria.'],
    ['Valores', 'Cada una pone primero un valor y recibe críticas.'],
    ['Mezclas', 'Casi ningún país usa un modelo puro.']), [
    x('pista-tipo', 'Ata cada medida a la lógica que tiene detrás.', { doc: MODELOS, lineas: ['menos impuestos y más competencia', 'impuesto progresivo para salud gratuita', 'el municipio compra la fábrica de leche', 'la asamblea decide el turno del agua'],
      ...T(['liberal', 0, '¿Cuál confía en el mercado?'], ['de bienestar', 1, '¿Cuál mantiene el mercado y reparte?'], ['socialista', 2, '¿Cuál vuelve pública la empresa?'], ['comunitaria', 3, '¿Cuál decide en asamblea?']), bien: 'Mercado, reparto, propiedad y asamblea.' },
      'Competir es liberal, repartir es de bienestar, ser dueños es socialista y la asamblea, comunitaria.', 'Pregunta quién decide y quién es dueño en cada medida.'),
    x('pinta-tipos', 'Pinta cada frase con el valor que pone primero.', { doc: MODELOS, plumas: ['libertad', 'igualdad', 'comunidad'],
      ...P(['«Que cada quien escoja su médico y lo pague».', 0, '¿Escoger, repartir o vivir juntos?'], ['«Que nadie se quede sin escuela por ser pobre».', 1, '¿Escoger, repartir o vivir juntos?'], ['«Decidamos juntos, como nos enseñaron los mayores».', 2, '¿Escoger, repartir o vivir juntos?'], ['«El Estado no debe decirme qué vender».', 0, '¿Escoger, repartir o vivir juntos?']), bien: 'Escoger, repartir y juntos.' },
      'Escoger y vender sin permiso es libertad, la escuela para todos igualdad y decidir juntos, comunidad.', 'Busca la palabra que delata lo que más le importa a quien habla.'),
    x('voz-de-la-fuente', 'Ata cada crítica a la propuesta que la recibe.', { ayuda: 'Tira un hilo desde cada crítica hasta la propuesta.', doc: MODELOS, portadas: [['Primera: mercado', 'propuesta'], ['Segunda: bienestar', 'propuesta'], ['Tercera: socialista', 'propuesta'], ['Cuarta: comunitaria', 'propuesta']],
      ...T(['deja por fuera a quien no puede pagar', 0, '¿Cuál depende de pagar?'], ['las empresas podrían irse', 1, '¿Cuál cobra más?'], ['quien administra puede abusar', 2, '¿Cuál concentra la propiedad?'], ['quizás no sirve en una gran ciudad', 3, '¿Cuál se piensa para comunidades?']), bien: 'Cada modelo, su crítica.' },
      'El mercado excluye a quien no paga, cobrar espanta empresas, concentrar permite abusos y la asamblea es difícil en grande.', 'Busca la última oración del párrafo de cada propuesta.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MODELOS, filas: [{ antes: 'Los modelos son', topes: ['copias exactas de un país', 'leyes', 'ideas simplificadas'], va: 2 }, { antes: 'El Estado de bienestar', topes: ['elimina el mercado', 'mantiene el mercado', 'no cobra impuestos'], va: 1 }, { antes: 'Un modelo puro lo usa', topes: ['casi ningún país', 'la mitad de los países', 'todo país'], va: 0 }], mira: ['Relee el final del párrafo 1.', 'Relee la segunda propuesta.', 'Relee el párrafo 6.'], luz: [[1, 'ideas simplificadas'], [3, 'mantiene el mercado'], [6, 'Casi ningún país usa un modelo puro']], bien: 'Simplificadas, mantiene y casi ninguno.' },
      'Son ideas simplificadas, el de bienestar mantiene el mercado y casi ningún país usa uno puro.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MODELOS, nums: [2, 5, 6], pregunta: 'Queda en pie', queda: 'Conviene preguntar a quién beneficia una decisión.',
      ...T(['Para la lógica liberal, el Estado debe ser grande.', 1, 'Busca cómo debe ser el Estado.'], ['El buen vivir mide el bienestar solo en dinero.', 4, 'Busca en qué más se mide.'], ['El concejo escogió una sola propuesta.', 7, 'Busca qué terminó haciendo.']), bien: 'Pequeño, no solo y mezclando.' },
      'El Estado debe ser pequeño, el bienestar no se mide solo en dinero y el concejo mezcló.', 'Saca la palabra clave: grande, solo, una sola.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 1 la oración que **define** qué es un modelo.', { doc: MODELOS, nums: [1], apuesta: 'Una idea simplificada para comparar.', ...S(['1.3'], { '1.0': 'Describe los problemas del pueblo.', '1.1': 'Cuenta lo que hizo el concejo.', '1.2': 'Dice qué había detrás, pero no lo define.' }), bien: 'Ideas simplificadas que ayudan a comparar.' },
      'La última oración lo define: ideas simplificadas, que ayudan a comparar.', 'Busca la oración que pone el nombre y dice para qué sirve.'),
    x('balanza-tesis', 'Propuesta: «que una empresa privada maneje el hospital de Río Manso». ¿Qué hace cada dato?', { doc: MODELOS, tesis: 'Que una empresa privada maneje el hospital',
      ...F(['En un pueblo parecido, la empresa redujo a la mitad las filas sin cobrar más.', 0, '¿Mejoró la atención?'], ['Seis de cada diez habitantes no podrían pagar las tarifas previstas.', 1, '¿A quién deja por fuera?'], ['El hospital está pintado de blanco.', 2, '¿Cambia la decisión?']), bien: 'Eficiencia y acceso.' },
      'Las filas la apoyan; las tarifas la debilitan; el color no pesa.', 'Pregunta si el dato hace más o menos conveniente la medida para la gente.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MODELOS, lineas: ['Los modelos son ideas simplificadas sobre lo que debe hacer un Estado.', 'La escuela está llena.', 'Hay lógicas liberal, de bienestar, socialista y comunitaria.', 'Cada una pone primero un valor y recibe críticas.', 'Habrá un parque industrial.', 'Casi siempre se mezclan.'], ...S([1, 4], { 0: 'Es la definición.', 2: 'Son los modelos.', 3: 'Es lo que permite compararlos.', 5: 'Es la conclusión.' }), bien: 'Definición, modelos, valores y mezcla.' },
      'La escuela y el parque son detalles; lo demás resume.', 'Deja lo que usarías para analizar otra decisión.'),
  ]);

  const AGUA = {
    id: 'icf-acueducto-alto', title: 'El agua de Cerro Alto',
    paras: [
      'Cerro Alto tiene cuatro mil habitantes y un acueducto construido a mano por sus abuelos. Lo maneja una junta de vecinos elegida cada dos años. Cobra una tarifa baja e igual para todos y, cuando falta plata, se llama a convite: un día de trabajo por familia. «Aquí el agua no es de nadie, por eso la cuidamos todos», dice la fundadora.',
      'En 2023 la sequía bajó el caudal y los nuevos conjuntos de casas aumentaron el consumo. Hubo semanas con agua un día sí y otro no. La alcaldía, elegida el año anterior con una votación alta, propuso entregar el servicio a una empresa privada por veinte años. La empresa prometió arreglar las tuberías, poner contadores y cobrar según lo que gaste cada casa. «El que gasta más debe pagar más; así nadie desperdicia», explicó su representante.',
      'El contrato era legal: cumplía todas las normas. Pero en la audiencia casi nadie lo apoyó. «Ustedes fueron elegidos para dirigir, no para entregar lo que hicimos nosotros», dijo un vecino. Una concejala propuso otra salida: que el municipio fuera el dueño y que las casas de mayor valor pagaran una tarifa más alta para subsidiar a las de menor valor. Un grupo de jóvenes recordó que en la vereda de abajo vive una comunidad indígena que considera sagrado el nacimiento y que nadie la había consultado.',
      'Un profesor hizo un cuadro en el tablero. En cada columna puso una propuesta; en cada fila, una pregunta: quién decide, quién es dueño, quién paga y quién queda por fuera. «No les voy a decir cuál es mejor», advirtió. «Les pido que no comparen los nombres, sino las respuestas».',
      'Después de cinco meses acordaron que la junta siguiera administrando, con contadores y cobro según el consumo, una tarifa menor para los hogares de menos ingresos y apoyo técnico del municipio. La comunidad indígena quedó con un puesto y con derecho a opinar sobre el nacimiento. El profesor borró el tablero y dejó solo las preguntas. «Esas sirven para el próximo problema», dijo.',
    ],
  };
  const Q = preg(AGUA, 'sociales');
  return mundo('icf-sc-modelos', 'Modelos para Decidir', 'sociales', [l1, l2], [
    ['icf-sc-modelos-1', 'Legal y legítimo no son lo mismo.', Q('El contrato con la empresa era legal, pero en la audiencia se mostró que le faltaba:', ['Soberanía', 'Legitimidad', 'Movilidad social', 'Territorio'], 1, 'Cumplía las normas, pero casi nadie lo reconocía como aceptable.', 'Compara lo que dice la norma con lo que aceptó la gente.')],
    ['icf-sc-modelos-1', 'El gobierno dirige por un tiempo.', Q('La frase «fueron elegidos para dirigir, no para entregar lo que hicimos nosotros» distingue entre:', ['Etnia y género', 'Nación y cultura', 'El gobierno de turno y lo que pertenece a la comunidad', 'La clase alta y la clase baja'], 2, 'El vecino reconoce que pueden dirigir, pero no disponer de lo construido por todos.', 'Pregunta qué les reconoce y qué les niega.')],
    ['icf-sc-modelos-1', 'La cultura son modos de vivir y creer.', Q('Que la comunidad indígena considere sagrado el nacimiento muestra que:', ['El agua es también un asunto cultural', 'El agua no sirve para beber', 'El acueducto es ilegal', 'La alcaldía es indígena'], 0, 'Un mismo lugar tiene un sentido que viene de los modos de creer de un grupo.', 'Relee qué significa el nacimiento para esa comunidad.')],
    ['icf-sc-modelos-2', 'Cada lógica responde distinto quién decide y quién paga.', Q('La forma en que la junta manejaba el acueducto al comienzo corresponde sobre todo a una lógica:', ['Liberal', 'De bienestar', 'Colonial', 'Comunitaria'], 3, 'Decisión de vecinos, convite y cuidado común.', 'Mira quién decide y cómo se trabaja.')],
    ['icf-sc-modelos-2', 'Propiedad pública y subsidio.', Q('La propuesta de la concejala pone primero:', ['La igualdad, porque quien más tiene ayuda a quien menos tiene', 'La libertad de escoger empresa', 'La competencia', 'El lucro del municipio'], 0, 'Las casas de mayor valor subsidian a las de menor valor.', 'Relee quién pagaría más y para qué.')],
    ['icf-sc-modelos-2', 'Comparar respuestas, no nombres.', Q('El cuadro del profesor sirve para:', ['Mostrar que todas son iguales', 'Escoger la más barata', 'Comparar propuestas con los mismos criterios', 'Defender a la empresa'], 2, 'Las mismas preguntas se aplican a cada propuesta.', 'Mira qué puso en las filas y qué pidió.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-indaga.js
// Preicfes · Ciencias Naturales · mundo 1 «Indagación Científica» (spec 2026-11-20-curso-preicfes): la competencia que más
// pregunta la prueba de ciencias: la pregunta de un experimento, sus variables, el control, los datos y qué se puede concluir.
// Estándar de diez: el experimento se lee con juegos LEC y sus datos se manejan con juegos de lienzo; un juego en movimiento y la
// zona de examen al final. Experimentos escritos para Zuka (los resultados siguen lo que pasa de verdad).
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc } = ICF;

  const FRIJOL = {
    id: 'icf-frijol', title: 'Frijoles a oscuras',
    ficha: { autor: 'Grupo de ciencias de un colegio público', fuente: 'Informe de laboratorio de grado once', fecha: 'Abril de 2026' },
    paras: [
      'Un grupo de grado once se preguntó si la cantidad de luz que recibe una planta de frijol cambia lo que crece en sus primeras dos semanas de vida.',
      'Antes de empezar escribieron su hipótesis: «Las plantas que reciben más horas de luz crecerán más altas». Les parecía evidente, porque las plantas necesitan luz para fabricar su alimento.',
      'Sembraron 40 semillas del mismo paquete en 40 vasos con la misma tierra y las repartieron en cuatro grupos de diez. Cada grupo recibió 0, 4, 8 o 12 horas diarias de luz de una lámpara, dentro de cajas que se mantuvieron a la misma temperatura. Todas recibieron 20 mililitros de agua al día. Lo único que cambiaba de un grupo a otro era la luz.',
      'A los 14 días midieron la altura de cada plántula y contaron sus hojas. Germinaron casi todas las semillas en los cuatro grupos. La altura promedio fue de 12 cm en el grupo sin luz, 10 cm con 4 horas, 8 cm con 8 horas y 7 cm con 12 horas. Las plántulas que crecieron a oscuras eran amarillas, delgadas y casi no tenían hojas; las de 12 horas eran verdes, gruesas y tenían en promedio seis hojas.',
      'El resultado contradijo la hipótesis. La profesora les explicó que una plántula a oscuras se estira buscando la luz, con la energía que tenía guardada en la semilla: es más alta, pero no más sana. El grupo concluyó que la altura no era una buena medida de lo que querían saber.',
      'Para mejorar el estudio propusieron medir también la masa de las plantas secas y repetir el experimento con otra variedad de frijol, para saber si el resultado se mantiene.',
    ],
  };

  const PENDULO = {
    id: 'icf-pendulo', title: 'El péndulo de la clase',
    ficha: { autor: 'Profesora de física', fuente: 'Bitácora de laboratorio', fecha: 'Mayo de 2026' },
    paras: [
      'En una clase de física, dos equipos se preguntaron de qué depende el tiempo que tarda un péndulo en ir y volver, lo que se llama su período. El equipo de Samuel pensaba que dependía de la masa: una pesa más pesada debería oscilar más rápido. El equipo de Lucía creía que dependía de la longitud de la cuerda.',
      'Para probar la primera idea, ataron a una cuerda de un metro pesas de 50, 100 y 200 gramos. Soltaron cada una desde el mismo ángulo pequeño y midieron con un cronómetro el tiempo de diez oscilaciones completas, para dividirlo después entre diez. El período fue de 2.0 segundos en los tres casos.',
      'Para probar la segunda, usaron siempre la pesa de 100 gramos y cambiaron la longitud: 25, 50, 100 y 200 centímetros. Los períodos fueron 1.0, 1.4, 2.0 y 2.8 segundos. Al cuadruplicar la longitud, de 25 a 100 centímetros, el período se duplicó.',
      'Samuel propuso una conclusión: «Ninguna variable importa mucho, porque el período casi no cambió». Lucía le mostró la tabla: con la masa el período no cambió nada, pero con la longitud sí, y siempre en la misma dirección: a mayor longitud, mayor período. Además, la relación no es proporcional, porque duplicar la longitud no duplica el período.',
      'La profesora agregó dos advertencias. Primero, medir diez oscilaciones y dividir reduce el error del cronómetro, que depende de los reflejos de quien lo maneja. Segundo, los resultados valen para ángulos pequeños; con oscilaciones muy amplias el período cambia un poco.',
      'Al final, los dos equipos escribieron una conclusión común: en sus mediciones, el período depende de la longitud de la cuerda y no de la masa de la pesa.',
    ],
  };

  const l1 = leccion('icf-cn-indaga-1', 'Preguntas, variables y control', [
    sc(6, 'Casi un tercio de la prueba de Ciencias es **indagación**: no pregunta un dato de memoria, sino cómo se averigua algo con un experimento.', { title: 'Cómo se averigua' }),
    sc(7, 'Todo experimento empieza con una **pregunta** y una **hipótesis**, una respuesta posible que se puede poner a prueba.', { title: 'Pregunta e hipótesis' }),
    sc(7, 'La **variable independiente** es la que el investigador cambia; la **dependiente**, la que mide para ver el efecto; las **controladas** se mantienen iguales para que no confundan el resultado.', { title: 'Tres clases de variables' }),
    sc(7, 'Ejemplo: para saber si el abono hace crecer más el pasto, se abonan unas macetas y otras no, con la misma semilla, la misma agua y la misma luz. Si se riega más a las abonadas, ya no se sabe qué causó la diferencia.', { title: 'Cambiar una sola cosa' }),
    sc(6, 'Un resultado que contradice la hipótesis no es un fracaso: es información. La hipótesis se corrige y el experimento se mejora.', { title: 'Cuando la hipótesis falla' }),
  ], [
    x('descarta-prueba', 'Estas tres afirmaciones son falsas. Ata cada una a la oración que la desmiente.', { doc: FRIJOL, nums: [3, 4, 5], pregunta: 'Queda en pie', queda: 'La única diferencia entre los grupos fue la luz.',
      ...T(['Cada grupo recibió distinta agua.', [2, 3], 'Busca qué recibieron todas o qué cambiaba entre los grupos.'], ['Sin luz, las semillas no germinan.', 5, 'Busca la oración que dice cuántas germinaron.'], ['Los datos confirmaron la hipótesis.', 8, 'Busca la oración que compara resultado e hipótesis.']), bien: 'Los datos mandan sobre lo que uno esperaba.' },
      'Todas recibieron 20 mililitros, germinaron casi todas y el resultado contradijo la hipótesis.', 'Busca la palabra clave de cada afirmación: agua, germinar, hipótesis.'),
    x('genero-o-cita', 'En el experimento de los frijoles, ¿qué **cambió** a propósito el grupo y qué no?', { doc: FRIJOL, rot: ['lo que cambiaron', 'lo que midieron o dejaron igual'],
      ...F(['Las horas de luz', 0, '¿Los cuatro grupos recibieron lo mismo?'], ['La altura a los 14 días', 1, '¿La escogieron ellos o la leyeron con la regla?'], ['El agua diaria', 1, '¿Los cuatro grupos recibieron cantidades distintas?'], ['La tierra de los vasos', 1, '¿Los cuatro grupos tenían tierras distintas?'], ['El número de hojas', 1, '¿Lo decidieron antes o lo contaron al final?']), luz: [[3, 'Lo único que cambiaba de un grupo a otro era la luz']], bien: 'Se cambia una sola cosa; lo demás se mide o se controla.' },
      'La luz es la variable independiente; la altura y las hojas se miden; el agua y la tierra se controlan.', 'Pregunta por cada una: ¿la decidieron distinta para cada grupo?'),
    x('pista-tipo', 'Ata cada parte de la investigación a su oración.', { doc: FRIJOL, lineas: ['¿Cambia la luz lo que crece una planta de frijol?', 'Con más luz crecerán más altas.', 'La altura promedio sin luz fue de 12 cm.', 'La altura no era una buena medida.'],
      ...T(['la pregunta', 0, 'Busca la oración que no afirma nada todavía.'], ['la hipótesis', 1, 'Busca lo que se espera antes de medir.'], ['un resultado', 2, 'Busca un dato leído con un instrumento.'], ['una conclusión', 3, 'Busca lo que se piensa después de ver los datos.']), bien: 'Pregunta, hipótesis, resultado y conclusión.' },
      'La pregunta abre, la hipótesis predice, el resultado es un dato medido y la conclusión interpreta.', 'Piensa cuándo se escribe cada cosa: antes de medir, al medir o después.'),
    x('balanza-tesis', 'Conclusión: «a oscuras el frijol se estira, pero no crece más sano». ¿Qué hace cada dato?', { doc: FRIJOL, tesis: 'A oscuras se estira, pero no crece más sano',
      ...F(['Sin luz eran altas, amarillas y sin hojas.', 0, '¿Muestra altura y mala salud a la vez?'], ['Con 12 horas tenían más masa seca.', 0, 'Más masa, ¿habla de mejor o de peor crecimiento?'], ['A oscuras, otra variedad tuvo más hojas y masa.', 1, '¿Crecieron mejor o peor sin luz?'], ['Los vasos eran blancos.', 2, '¿Tiene que ver con la luz o con la salud?']), bien: 'Un dato pesa si cambia lo que se puede concluir.' },
      'Altas y amarillas, y más masa con luz, apoyan; una variedad más sana a oscuras debilita; el color del vaso no pesa.', 'Supón que cada dato es cierto: ¿creerías más o menos en la conclusión?'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FRIJOL, nums: [4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Con 12 horas tuvieron unas seis hojas.', 0, 'Léela junto a la última oración del párrafo 4.'], ['A más luz, menos altura.', 1, 'No está escrita: mira las cuatro alturas en orden.'], ['Con 24 horas no crecerían.', 2, '¿Probaron ese número de horas?'], ['La plántula a oscuras es más alta, pero no más sana.', 0, 'Léela junto a la explicación de la profesora.']),
      luz: [[4, '12 cm en el grupo sin luz, 10 cm con 4 horas'], [5, 'es más alta, pero no más sana']], bien: 'Lo que no se probó no se puede afirmar.' },
      'Las hojas y la salud están escritas; la tendencia sale de los cuatro datos; 24 horas no se probaron.', 'Mira hasta dónde llegan los datos: más allá de ellos solo se puede suponer.'),
    x('lee-escala', 'La gráfica muestra la altura promedio de tres grupos. Pon la altura de **cada uno** y cuánto suman.', { vals: [12, 10, 7], rot: ['0 h', '4 h', '12 h'], hi: 16, st: 4, et: ['0 h', '4 h', '12 h', 'suma'], ops: ['+', '+', '='], metas: ['12', '10', '7', '29'], fichas: ['12', '10', '7', '29', '9', '8', '3'],
      mira: ['Mira en qué línea termina la barra.', 'Está a mitad de camino entre 8 y 12.', 'Está un poco abajo de la línea del 8.', 'Suma las tres barras.'], trampas: { '1:9': 'Entre 8 y 12 hay 4: la mitad son 2 más que 8.', '2:8': 'No alcanza la línea del 8.', '2:3': 'Cada línea vale 4: cuenta desde abajo.' }, ok: 'La escala manda: aquí va de 4 en 4.' },
      'Las líneas van de 4 en 4: 12 cae en una línea, 10 está a la mitad entre 8 y 12, y 7 un poco abajo de 8.', 'Antes de leer, mira cuánto vale cada línea del eje y cuánto es la mitad de ese espacio.'),
    sol('Una estudiante quiere saber si la temperatura del agua cambia el tiempo que tarda en disolverse una pastilla efervescente. ¿Cómo debe organizar su experimento?',
      ['La variable que ella cambia es [[la temperatura del agua]]', 'La variable que mide es [[el tiempo de disolución]]', 'Debe mantener igual [[la cantidad de agua]] y el tipo de pastilla', 'Para confiar en el resultado, cada temperatura se prueba [[varias veces]]'],
      ['una sola vez', 'la opinión de sus compañeros', 'el color de la pastilla al final'],
      'La temperatura es la independiente y el tiempo la dependiente. Si cambiara también la cantidad de agua, no sabría qué causó la diferencia; y repetir cada prueba reduce el efecto de los errores al medir.',
      'Pregúntate qué cambia ella a propósito, qué mide con el cronómetro y qué podría confundir el resultado si no lo deja igual.'),
    err('Para saber si un fertilizante hace crecer más el maíz, un agricultor diseña este experimento.',
      ['Siembra dos parcelas iguales con la misma semilla', 'A la parcela A le pone fertilizante y a la B no', 'Riega la parcela A todos los días y la B una vez por semana', 'Al mes compara la altura de las plantas de las dos parcelas'], 2,
      ['Riega las dos parcelas con la misma cantidad y frecuencia', 'Riega la parcela B todos los días y la A una vez por semana', 'Riega más la parcela que vaya creciendo menos'],
      'El riego distinto agrega una segunda diferencia: si A crece más, no se sabría si fue el fertilizante o el agua. El agua debe ser una variable controlada, igual en las dos parcelas.',
      'Busca el paso en que las dos parcelas dejan de ser iguales en algo distinto del fertilizante.'),
    opc('Una investigadora quiere saber si la cantidad de sal en el agua afecta la germinación de semillas de rábano. Pone 20 semillas en cada uno de cuatro platos con agua que tiene 0, 1, 2 y 4 gramos de sal por litro. ¿Cuál de las siguientes condiciones debe ser igual en los cuatro platos?',
      ['La cantidad de sal del agua', 'El número de semillas que germinan', 'La temperatura y la luz que reciben', 'El tiempo que tarda cada semilla en germinar'], 2,
      'La sal es la variable que ella cambia y las semillas que germinan (y cuándo) son lo que mide. La temperatura y la luz deben ser iguales para que no confundan el resultado.',
      'Separa lo que se cambia a propósito, lo que se mide y lo que hay que dejar fijo.'),
  ]);

  const l2 = leccion('icf-cn-indaga-2', 'Datos y conclusiones', [
    sc(6, 'Una conclusión vale si los datos la respaldan. La prueba pregunta mucho: «¿cuál conclusión es válida según la tabla?».', { title: 'Lo que dicen los datos' }),
    sc(7, 'Una variable **no influye** si al cambiarla el resultado no cambia; **influye** si el resultado cambia siempre en la misma dirección.', { title: 'Influye o no influye' }),
    sc(7, 'Ejemplo: si al duplicar la carga de una bicicleta el frenado pasa de 4 a 8 metros, la relación parece **proporcional**. Si pasa de 4 a 6, aumenta, pero no es proporcional.', { title: 'Proporcional o solo creciente' }),
    sc(7, 'Repetir una medición y promediar reduce el error. Y una conclusión solo vale para las condiciones medidas: no se puede extender a lo que nadie probó.', { title: 'Errores y límites' }),
    sc(6, 'Muchos fenómenos crecen o decrecen por multiplicación: las bacterias se duplican y los medicamentos se reducen a la mitad. Se reconocen porque cada paso multiplica por lo mismo.', { title: 'Patrones que multiplican' }),
  ], [
    x('ajusta-alcance', 'Mueve cada perilla hasta que la conclusión diga lo que muestran los datos del péndulo.', { doc: PENDULO, filas: [{ antes: 'Al cambiar la masa, el período', topes: ['aumenta', 'no cambia', 'disminuye'], va: 1 }, { antes: 'Al alargar la cuerda, el período', topes: ['disminuye', 'no cambia', 'aumenta'], va: 2 }, { antes: 'Si la longitud se cuadruplica, el período', topes: ['se duplica', 'se triplica', 'se cuadruplica'], va: 0 }], mira: ['Relee los tres casos del párrafo 2.', 'Mira los cuatro períodos del párrafo 3 en orden.', 'Compara el período de 25 con el de 100 centímetros.'], luz: [[2, '2.0 segundos en los tres casos'], [3, '1.0, 1.4, 2.0 y 2.8 segundos'], [3, 'el período se duplicó']], bien: 'Cada conclusión, con su dato.' },
      'Con la masa dio 2.0 s siempre; con la longitud subió de 1.0 a 2.8 s; de 25 a 100 cm pasó de 1.0 a 2.0 s.', 'Lleva cada frase a su serie de datos y compara el primero con el último.'),
    x('pinta-tipos', 'Pinta cada oración: ¿es un **dato**, una **hipótesis** o una **conclusión**?', { doc: PENDULO, plumas: ['dato', 'hipótesis', 'conclusión'],
      ...P(['Una pesa más pesada debería oscilar más rápido.', 1, '¿Se midió ya o se espera que pase?'], ['El período fue de 2.0 segundos.', 0, '¿Se leyó en un instrumento o se pensó después?'], ['El período depende de la longitud y no de la masa.', 2, '¿Es una medida o una idea que las junta?'], ['Con 200 cm tardó 2.8 segundos.', 0, '¿Se leyó en un instrumento o se pensó después?']), bien: 'Se espera, se mide y se concluye.' },
      'La hipótesis se dice antes de medir, el dato se lee en el cronómetro y la conclusión junta los datos.', 'Pregúntate si la oración sale del cronómetro, de antes de usarlo o de mirar toda la tabla.'),
    x('pasos-del-proceso', 'Ordena cómo se prueba una idea. El primer paso está en su puesto.', { que: 'el método', de: 'La prueba de la longitud', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Preguntarse de qué depende el período.', 'Proponer que depende de la longitud.', 'Fijar la masa y el ángulo y cambiar la cuerda.', 'Medir diez oscilaciones con cada cuerda.', 'Comparar los períodos y concluir.'], mira: ['', 'La propuesta responde una pregunta que ya se hizo.', 'El diseño prueba una propuesta que ya se tiene.', 'Se mide cuando ya se sabe qué se cambia.', 'Se compara lo que ya se midió.'], bien: 'Pregunta, hipótesis, diseño, medida y conclusión.' },
      'Se pregunta, se propone, se diseña cambiando una sola cosa, se mide y solo al final se concluye.', 'Cada paso usa lo que dejó el anterior: ¿qué hace falta tener antes?'),
    x('comprueba-apuesta', 'Subraya la oración del párrafo 4 que muestra por qué Samuel se **equivoca**.', { doc: PENDULO, nums: [4], apuesta: 'Ninguna variable importa mucho.', ...S(['4.1'], { '4.0': 'Es lo que dijo Samuel, no lo que lo desmiente.', '4.2': 'Agrega cómo es la relación; que sí exista ya se dijo antes.' }), bien: 'Con la longitud sí cambia, y siempre en la misma dirección.' },
      'Lucía separa las dos series: con la masa no cambia nada, pero con la longitud crece siempre.', 'Busca la oración que compara las dos variables con la tabla en la mano.'),
    x('genero-o-cita', 'Para probar **solo** la longitud, ¿sirve esta prueba?', { doc: PENDULO, rot: ['sí sirve', 'mezcla variables'],
      ...F(['Misma pesa y ángulo, cuerdas de 40 y 80 cm', 0, '¿Cuántas cosas cambian entre las dos?'], ['Pesa grande en cuerda larga, chica en corta', 1, '¿Cuántas cosas cambian entre las dos?'], ['Misma pesa y ángulo, cinco cuerdas distintas', 0, '¿Cuántas cosas cambian entre las cinco?'], ['Cuerda larga con ángulo grande, corta con chico', 1, 'Además de la cuerda, ¿cambia algo más?']), bien: 'Si cambian dos cosas, no se sabe cuál fue.' },
      'Solo sirven las pruebas en las que la cuerda es lo único distinto; en las otras no se sabe a qué se debe el cambio.', 'Cuenta cuántas cosas cambian de una medida a la otra: solo puede ser una.'),
    x('mayor-tramo', 'La gráfica muestra el período (en décimas de segundo) con 25, 50, 100 y 200 cm. Toca el tramo que más creció **en porcentaje**.', { v: [10, 14, 20, 28] },
      'De 10 a 14 y de 20 a 28 sube el 40 %; de 14 a 20 sube 6 de 14, cerca del 43 %: ese es el mayor, aunque el último suba más décimas.', 'Divide lo que subió cada tramo entre el valor con que empezó ese tramo.'),
    sol('Una estudiante calienta agua y registra la temperatura cada minuto: 20, 26, 32, 38 y 44 °C en los minutos 0 a 4. Si la tendencia sigue igual, ¿qué temperatura tendrá a los 7 minutos y hasta cuándo vale la predicción?',
      ['Cada minuto la temperatura sube [[6]] °C', 'A los 7 minutos: 20 °C más 7 veces lo que sube por minuto, [[62]] °C', 'La temperatura cambia de forma [[constante]] mientras se calienta', 'La predicción vale solo hasta que el agua llegue a unos [[100]] °C, donde hierve'],
      ['44', 'variable', '50'],
      'Los datos suben 6 °C por minuto, así que a los 7 minutos el agua estaría a 62 °C. La tendencia no sigue para siempre: al hervir, la temperatura deja de subir aunque se siga calentando.',
      'Halla cuánto sube por minuto restando dos datos seguidos, y piensa qué le pasa al agua cuando hierve.'),
    err('Un estudiante cuelga masas de un resorte y mide cuánto se estira: 100 g, 2 cm; 200 g, 4 cm; 300 g, 6 cm. Este es su análisis.',
      ['Cada 100 g, el resorte se estira 2 cm más', 'El estiramiento es directamente proporcional a la masa', 'Con 500 g el resorte se estirará 8 cm', 'Con 50 g se estirará 1 cm'], 2,
      ['Con 500 g el resorte se estirará 10 cm', 'Con 500 g el resorte se estirará 5 cm', 'Con 500 g el resorte ya no se estirará más'],
      'Si son proporcionales, 500 g son 5 veces 100 g: $5 \\cdot 2 = 10$ cm. El 8 sale de sumar 2 cm a los 6 que había con 300 g, como si 500 g fueran solo 100 g más.',
      'Revisa la predicción con 500 g: ¿cuántas veces cabe 100 g en 500 g?'),
    opc('Una investigadora mide el oxígeno disuelto en un río en cinco puntos, desde su nacimiento hasta la salida de una ciudad: 9, 9, 8, 5 y 3 mg/L. Los dos últimos puntos están después de una descarga de aguas residuales. La conclusión mejor respaldada por estos datos es:',
      ['Las aguas residuales son la única causa de la falta de oxígeno en todos los ríos', 'El oxígeno del río aumenta a medida que se acerca a la ciudad', 'En el nacimiento del río no hay peces', 'En este río hay menos oxígeno después de la descarga de aguas residuales'], 3,
      'Los datos muestran que el oxígeno baja a 5 y 3 mg/L justo después de la descarga. No permiten hablar de todos los ríos ni de los peces, y el oxígeno disminuye, no aumenta.',
      'Descarta las conclusiones que hablan de algo que no se midió o que van más allá de este río.'),
  ]);

  return mundo('icf-cn-indaga', 'Indagación Científica', 'ciencias', [l1, l2], [
    ['icf-cn-indaga-1', 'Dos variables son inversamente proporcionales cuando su producto se mantiene.',
      play('grafica-relacion', 'A temperatura constante, un gas ocupa 6 L con una presión de 2 atm. Si presión y volumen son inversamente proporcionales, mueve los puntos', { kind: 'inversa', k: 12, given: [[2, 6]], xs: [3, 4, 6], tol: 0.25, xmax: 8, ymax: 8 },
        'El producto presión por volumen se mantiene en 12: con 3 atm, 4 L; con 4 atm, 3 L; con 6 atm, 2 L.', { hint: 'Multiplica las coordenadas del punto dado: ese producto debe ser igual en todos los puntos.' })],
    ['icf-cn-indaga-1', 'Antes de leer una barra, mira cuánto vale cada raya de la escala.',
      play('lee-barras', 'Plantas de tomate con distintas dosis de abono: altura a las tres semanas, en cm. ¿Cuánto mide el grupo C?', { rounds: [{ bars: [['A', 18], ['B', 24], ['C', 27], ['D', 21]], hi: 30, step: 6, q: 'val', a: 2, max: 30, tstep: 1 }] },
        'Las rayas van de 6 en 6: la barra C llega a la mitad entre 24 y 30, es decir, 27 cm.', { hint: 'Calcula cuánto vale cada raya del eje y ubica la barra entre dos de ellas.' })],
    ['icf-cn-indaga-1', 'La variable dependiente es la que se mide para ver el efecto de la que se cambia.',
      opc('Un estudiante quiere saber si la cantidad de sal disuelta cambia la temperatura a la que se congela el agua. Prepara vasos con 0, 5, 10 y 15 g de sal en 100 mL de agua y los pone en el mismo congelador. La variable dependiente de su experimento es:',
        ['La cantidad de sal de cada vaso', 'La cantidad de agua de cada vaso', 'La temperatura a la que se congela el agua', 'El congelador que usa'], 2,
        'Él cambia la sal (independiente) y mide la temperatura de congelación (dependiente). El agua y el congelador son iguales en todos los vasos: son variables controladas.', 'Pregúntate qué mide el estudiante al final para saber si la sal tuvo efecto.')],
    ['icf-cn-indaga-2', 'Cuando una cantidad se reduce a la mitad cada cierto tiempo, se cuentan las mitades.',
      play('media-vida', 'Una muestra de 160 g de una sustancia radiactiva se reduce a la mitad cada 5 horas. ¿Cuándo quedan 20 g?', { rounds: [{ A0: 160, T: 5, target: 20, thing: 'sustancia', unit: 'g' }] },
        '160, 80, 40 y 20 g: tres medias vidas, 15 horas.', { hint: 'Parte 160 por la mitad hasta llegar a 20 y cuenta cuántas veces lo hiciste.' })],
    ['icf-cn-indaga-2', 'En una mezcla, el porcentaje compara una parte con el total.',
      play('mezcla', 'Hay 40 g de alcohol. Añade agua hasta que la solución tenga 25 % de alcohol', { solute: 40, target: 25, step: 10, max: 300 },
        'Si 40 g son el 25 %, la mezcla pesa 160 g: se añaden 120 g de agua.', { hint: 'El alcohol tiene que ser la cuarta parte de toda la mezcla.' })],
    ['icf-cn-indaga-2', 'Una conclusión válida describe lo que muestran los datos medidos, sin ir más allá.',
      opc('En el experimento de la sal, los vasos con 0, 5, 10 y 15 g de sal se congelaron a 0, −3, −6 y −9 °C. La conclusión que mejor se apoya en estos datos es:',
        ['La sal hace que el agua hierva a menor temperatura', 'A más sal disuelta, más baja es la temperatura a la que se congela el agua', 'Con 20 g de sal el agua ya no se congela nunca', 'La sal no tiene ningún efecto sobre el agua'], 1,
        'Cada 5 g de sal bajan 3 °C la temperatura de congelación. Nadie midió la ebullición ni 20 g de sal, y los datos sí muestran un efecto.', 'Quédate con la opción que describe la tendencia de la tabla sin hablar de lo que no se midió.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-celula.js
// Preicfes · Ciencias Naturales · mundo 2 «Célula y Organismos» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const PAPA = {
    id: 'icf-papa', title: 'La papa que pesó distinto',
    ficha: { autor: 'Grupo de biología de grado once', fuente: 'Informe de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'Toda célula está rodeada por una membrana que deja pasar unas sustancias y otras no. El agua la atraviesa con facilidad; la sal, muy poco. Un grupo quiso ver qué ocurre con las células de una papa en agua con distinta cantidad de sal.',
      'Cortaron doce cilindros iguales de una misma papa, los pesaron y los repartieron en cuatro vasos: agua destilada y soluciones con 1 %, 3 % y 5 % de sal. A la media hora los secaron con papel y volvieron a pesarlos.',
      'En agua destilada los cilindros aumentaron su masa 8 %; con 1 % de sal casi no cambiaron; con 3 % perdieron 6 % y con 5 %, 11 %. Los del agua destilada quedaron rígidos; los de 5 %, blandos.',
      'La explicación es la ósmosis: el agua pasa por la membrana hacia donde hay más sal disuelta. En agua destilada hay más sal dentro de la célula, así que el agua entra. En la solución de 5 % hay más sal afuera, y el agua sale.',
      'Con 1 % la cantidad de sal era parecida adentro y afuera; por eso entraba tanta agua como salía. Las células vegetales, además, tienen una pared rígida que impide que se revienten cuando se llenan de agua. Un glóbulo rojo, que no la tiene, sí se rompe en agua destilada.',
      'La ósmosis no gasta energía de la célula. Para mover sustancias en sentido contrario, de donde hay menos a donde hay más, la célula debe usar energía: es el transporte activo.',
    ],
  };
  const l1 = leccion('icf-cn-celula-1', 'Célula y transporte', guion(
    ['La puerta', 'La membrana decide qué entra y qué sale: el agua pasa fácil; la sal, muy poco.'],
    ['Ósmosis', 'El agua va hacia donde hay más sal disuelta.'],
    ['Sin gasto o con gasto', 'Ir a favor no gasta energía; ir en contra, de menos a más, sí: transporte activo.'],
    ['La pared', 'Las células vegetales tienen pared: se ponen rígidas en vez de reventar.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que da la **regla** de la ósmosis.', { doc: PAPA, nums: [4], apuesta: 'El agua se mueve hacia donde hay más sal.', ...S(['4.0'], { '4.1': 'Aplica la regla al agua destilada.', '4.2': 'Aplica la regla a la solución de 5 %.' }), bien: 'Lo demás son casos de la regla.' },
      'La primera oración enuncia la regla; las otras dos la aplican a cada vaso.', 'Busca la oración que vale para cualquier vaso.'),
    x('genero-o-cita', '¿Hacia dónde va el agua: **entra** a la célula o **sale**?', { doc: PAPA, rot: ['entra', 'sale'],
      ...F(['Papa en agua destilada', 0, '¿Dónde hay más sal: adentro o afuera?'], ['Papa en sal al 5 %', 1, '¿Dónde hay más sal: adentro o afuera?'], ['Lechuga salada en la ensalada', 1, '¿Dónde quedó la sal?'], ['Uva pasa en agua pura', 0, '¿Dónde hay más azúcar disuelto?']), bien: 'El agua va hacia donde hay más disuelto.' },
      'En agua pura hay más soluto dentro y el agua entra; con sal afuera, sale.', 'Compara dónde hay más sustancia disuelta: hacia allá va el agua.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PAPA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'Con 1 % entraba tanta agua como salía.',
      ...T(['Con 3 % de sal la masa aumentó.', 0, 'Busca los cambios de masa.'], ['Un glóbulo rojo resiste en agua destilada.', 4, 'Busca qué pasa con los glóbulos.'], ['La ósmosis gasta energía.', 5, 'Busca lo que no gasta la célula.']), bien: 'Los datos y la explicación coinciden.' },
      'Con 3 % perdieron masa, el glóbulo se rompe y la ósmosis no gasta energía.', 'Busca la palabra clave de cada afirmación en el texto.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: PAPA, filas: [{ antes: 'Al aumentar la sal de 1 % a 5 %, la masa', topes: ['sube', 'baja', 'no cambia'], va: 1 }, { antes: 'Con 1 % de sal, la masa', topes: ['casi no cambia', 'se duplica', 'se pierde toda'], va: 0 }, { antes: 'La variable que cambió el grupo fue', topes: ['la papa', 'el tiempo', 'la sal'], va: 2 }], mira: ['Compara 1 %, 3 % y 5 % en orden.', 'Relee la primera oración del párrafo 3.', 'Relee en qué se diferenciaban los vasos.'], luz: [[3, 'perdieron 6 %'], [3, 'casi no cambiaron'], [2, '1 %, 3 % y 5 % de sal']], bien: 'Cada frase, con su dato.' },
      'De 1 % a 5 % la masa baja cada vez más; con 1 % casi no cambia, y lo único distinto era la sal.', 'Lee los datos en orden, de menos sal a más sal.'),
    x('pista-tipo', 'Ata cada papel a lo que le corresponde en el experimento.', { doc: PAPA, lineas: ['La cantidad de sal del agua', 'El cambio de masa', 'El tamaño de los cilindros', 'El agua pasa hacia donde hay más sal'],
      ...T(['variable independiente', 0, '¿Qué cambió el grupo a propósito?'], ['variable dependiente', 1, '¿Qué midieron para ver el efecto?'], ['variable controlada', 2, '¿Qué dejaron igual?'], ['explicación', 3, '¿Qué dice por qué ocurre?']), bien: 'Tres papeles y una explicación.' },
      'La sal se cambia, la masa se mide, el tamaño se controla y la ósmosis explica.', 'Pregunta qué se cambió, qué se midió y qué se dejó igual.'),
    x('lee-escala', 'En otro experimento, la gráfica muestra cuánta masa **perdieron** unos cilindros (en décimas de %). Pon cada valor y la diferencia entre 5 % y 3 %.', { vals: [60, 110, 80], rot: ['3 %', '5 %', '4 %'], hi: 120, st: 40, et: ['3 %', '5 %', '4 %', '5 % menos 3 %'], ops: ['', '', ''], metas: ['60', '110', '80', '50'], fichas: ['60', '110', '80', '50', '45', '85', '170'],
      mira: ['Está a mitad de camino entre 40 y 80.', 'Está a tres cuartos del camino entre 80 y 120.', 'Mira en qué línea termina.', 'Resta la de 3 % a la de 5 %.'], trampas: { '0:45': 'Cada línea vale 40: la mitad son 20, no 5.', '1:85': 'Cada línea vale 40: tres cuartos son 30, no 5.', '3:170': 'Eso es la suma.' }, ok: 'La escala manda.' },
      'Las líneas van de 40 en 40: 60 y 110 no caen en una línea, 80 sí. La diferencia es $110 - 60 = 50$.', 'Mira cuánto vale cada línea y qué parte del espacio alcanza la barra.'),
    sol('En un vaso con 2 % de sal, un cilindro de papa de 25 g queda en 24 g. ¿Qué porcentaje de su masa perdió y qué ocurrió con el agua?', ['Perdió $25 - 24 =$ [[1]] gramo', 'Es $1 \\div 25 =$ [[0.04]], es decir, el [[4]] %', 'El agua [[salió]] de las células'], ['25', '0.25', 'entró'], 'El cambio se compara con la masa inicial: 4 %. Si perdió masa, salió agua.', 'Divide lo que cambió entre la masa del comienzo.'),
    err('Un estudiante explica por qué se marchita una lechuga con sal.', ['La sal queda afuera de las células', 'Hay más sal afuera que adentro', 'El agua entra a las células', 'Las células pierden rigidez'], 2, ['El agua sale de las células', 'La sal entra rápido a las células', 'La pared de las células se rompe'], 'El agua va hacia donde hay más sal, que es afuera: sale y la hoja se ablanda.', 'Aplica la regla: ¿hacia dónde va el agua si hay más sal afuera?'),
    opc('A una persona deshidratada no se le inyecta agua destilada en la sangre, sino suero con una cantidad de sal parecida a la de la sangre. Esto se hace porque con agua destilada:', ['Los glóbulos rojos perderían agua y se arrugarían', 'El agua entraría a los glóbulos rojos y podrían romperse', 'La sal de los glóbulos gastaría energía', 'La membrana de los glóbulos dejaría de existir'], 1, 'Dentro del glóbulo habría más sal que afuera: el agua entra y, como no tiene pared, puede reventar.', 'Decide dónde habría más sal y recuerda que el glóbulo no tiene pared.'),
  ]);

  const AZUCAR = {
    id: 'icf-glucosa', title: 'El termostato del azúcar',
    ficha: { autor: 'Equipo de un hospital universitario', fuente: 'Boletín de salud', fecha: 'Marzo de 2026' },
    paras: [
      'Nuestro cuerpo trabaja para que su interior cambie poco aunque afuera cambie mucho. A ese equilibrio se le llama homeostasis. La temperatura, el agua y el azúcar de la sangre se mantienen dentro de ciertos límites gracias a varios sistemas que se avisan unos a otros.',
      'Después de comer, el sistema digestivo rompe los alimentos en moléculas pequeñas. La glucosa pasa del intestino delgado a la sangre y el sistema circulatorio la reparte. El páncreas, que pertenece al sistema endocrino, detecta que la glucosa subió y libera insulina, una hormona que ayuda a las células a tomarla.',
      'Para comprobarlo, se midió la glucosa de dos voluntarios antes de un desayuno y cada hora después. En la persona A los valores fueron 90, 130, 105 y 90 miligramos por decilitro. En la persona B, 140, 240, 230 y 210.',
      'En A la glucosa subió y volvió a su valor inicial: su cuerpo respondió. En B subió mucho más y a las tres horas seguía alta. Los médicos sospecharon que su cuerpo produce poca insulina o no responde bien a ella, como ocurre en la diabetes; para confirmarlo pidieron más exámenes.',
      'El ejercicio también participa. Al moverse, los músculos gastan glucosa y piden más oxígeno; entonces el corazón late más rápido y la respiración se acelera. El dióxido de carbono que producen las células sale por los pulmones, y el calor sobrante, con el sudor.',
      'Ningún sistema trabaja solo. Si los riñones fallan, los desechos se acumulan en la sangre aunque el corazón esté sano; si los pulmones fallan, al músculo le falta oxígeno aunque haya glucosa de sobra.',
    ],
  };
  const l2 = leccion('icf-cn-celula-2', 'Sistemas del cuerpo y homeostasis', guion(
    ['Equilibrio', 'Homeostasis: mantener el interior estable aunque afuera cambie.'],
    ['El aviso', 'Sube la glucosa, el páncreas libera insulina y las células la toman: la glucosa baja.'],
    ['Trabajo en equipo', 'Digestivo, circulatorio, respiratorio, excretor y endocrino dependen unos de otros.'],
    ['Leer la curva', 'Lo importante es si el valor vuelve al punto de partida.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: AZUCAR,
      ...F(['¿Qué es la homeostasis?', 0, 'Busca el comienzo que habla de que el interior cambie poco.'], ['¿Quién libera la insulina?', 1, 'Busca el comienzo que habla de comer.'], ['¿Qué hace el cuerpo al moverse?', 4, 'Busca el comienzo que nombra el ejercicio.']),
      luz: [[1, 'homeostasis'], [2, 'libera insulina'], [5, 'el corazón late más rápido']], bien: 'Equilibrio, comida y ejercicio.' },
      'El primer párrafo define el equilibrio, el segundo explica la comida y el quinto, el ejercicio.', 'Busca en los comienzos la idea más cercana a la pregunta.'),
    x('pasos-del-proceso', 'Ordena lo que pasa después de comer. El primer paso está en su puesto.', { que: 'el aviso', de: 'De la comida a la célula', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Los alimentos se rompen en moléculas.', 'La glucosa pasa a la sangre.', 'El páncreas detecta que subió.', 'Libera insulina.', 'Las células toman la glucosa.'], mira: ['', 'Pasa a la sangre lo que ya se rompió.', 'Se detecta algo que ya está en la sangre.', 'La hormona responde a un aviso.', 'Las células la toman con ayuda de la hormona.'], bien: 'Digestión, sangre, aviso, hormona y célula.' },
      'Se digiere, pasa a la sangre, el páncreas lo detecta, libera insulina y las células la toman.', 'Cada paso necesita lo que dejó el anterior.'),
    x('voz-de-la-fuente', 'Ata cada tarea a su sistema.', { ayuda: 'Tira un hilo desde cada tarea hasta su sistema.', doc: AZUCAR, portadas: [['Digestivo', 'sistema'], ['Circulatorio', 'sistema'], ['Respiratorio', 'sistema'], ['Excretor', 'sistema']],
      ...T(['Rompe los alimentos', 0, '¿Dónde se vuelve pequeña la comida?'], ['Reparte la glucosa por el cuerpo', 1, '¿Quién lleva cosas a todas partes?'], ['Saca el dióxido de carbono', 2, '¿Por dónde sale ese gas?'], ['Filtra desechos de la sangre', 3, '¿Qué hacen los riñones?']), bien: 'Cada sistema, su tarea.' },
      'Romper es del digestivo, repartir del circulatorio, sacar el gas del respiratorio y filtrar del excretor.', 'Piensa en el órgano que hace cada tarea y a qué sistema pertenece.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: AZUCAR, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['A volvió a su valor inicial.', 0, 'Léela junto a la primera oración del párrafo 4.'], ['A las tres horas B tenía más que A en su punto más alto.', 1, 'Compara 210 con los valores de A.'], ['Hacen falta más exámenes para confirmar.', 0, 'Léela junto al final del párrafo 4.'], ['B come demasiado dulce.', 2, '¿Se midió lo que come?']),
      luz: [[4, 'volvió a su valor inicial'], [3, '140, 240, 230 y 210'], [4, 'pidieron más exámenes']], bien: 'Sospechar no es confirmar.' },
      'El regreso y los exámenes están escritos; comparar 210 con 130 se deduce; la dieta de B no se midió.', 'Revisa los números de las dos personas antes de decidir.'),
    x('balanza-tesis', 'Hipótesis: el cuerpo de B no regula bien la glucosa. ¿Qué hace cada dato?', { doc: AZUCAR, tesis: 'El cuerpo de B no regula bien la glucosa',
      ...F(['Tres horas después seguía en 210.', 0, '¿Volvió a su valor inicial?'], ['Otro día, en ayunas, también dio alta.', 0, '¿Apoya que el problema se repite?'], ['El medidor de B estaba dañado.', 1, '¿Se puede confiar en sus valores?'], ['B es más alto que A.', 2, '¿La estatura mide la glucosa?']), bien: 'Un aparato dañado cambia todo.' },
      'Seguir alta y repetirse apoyan; un medidor dañado debilita; la estatura no pesa.', 'Supón cierto cada dato y mira si creerías más o menos.'),
    x('mayor-tramo', 'La gráfica muestra las pulsaciones (en decenas) de un corredor: reposo, trote, carrera y pique. Toca el tramo que más creció **en porcentaje**.', { v: [6, 9, 12, 16] },
      'De 6 a 9 sube 50 %; de 9 a 12 y de 12 a 16, cerca de 33 %. El último sube más pulsaciones, pero no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('La persona A tenía 90 mg/dL en ayunas y 135 una hora después de una fruta. ¿En qué porcentaje subió?', ['Subió $135 - 90 =$ [[45]]', 'Se compara con el valor de [[antes]]: 90', '$45 \\div 90 = 0.5$: subió el [[50]] %'], ['después', '33', '135'], 'El aumento se compara con el valor inicial: la mitad de 90 es 45, un 50 %.', '¿Con cuál de los dos valores se compara el cambio?'),
    err('Un estudiante describe qué ocurre cuando alguien corre.', ['Los músculos gastan más glucosa', 'Necesitan más oxígeno', 'El corazón late más despacio para ahorrar energía', 'Sale más dióxido de carbono por los pulmones'], 2, ['El corazón late más rápido para llevar oxígeno', 'El corazón se detiene un momento', 'El corazón deja de llevar glucosa'], 'Si los músculos piden más oxígeno y glucosa, la sangre debe circular más rápido.', 'Piensa cómo llega el oxígeno a los músculos.'),
    opc('En un día muy caluroso una persona suda y orina menos que en un día fresco, aunque beba lo mismo. La explicación más adecuada es que:', ['Los riñones dejan de funcionar con el calor', 'El sudor se convierte en orina', 'El cuerpo conserva agua por los riñones porque pierde más por la piel', 'La sangre se evapora'], 2, 'Para mantener estable el agua, si se pierde más con el sudor se elimina menos por la orina: homeostasis.', 'Piensa cómo mantiene el cuerpo la misma cantidad de agua.'),
  ]);

  const ADN = {
    id: 'icf-proteina', title: 'Una receta copiada con errores',
    ficha: { autor: 'Profesora de biología molecular', fuente: 'Guía para docentes', fecha: 'Abril de 2026' },
    paras: [
      'El ADN guarda las instrucciones para fabricar proteínas. Está escrito con cuatro letras, las bases A, T, C y G, y en las células de las plantas y los animales casi todo permanece en el núcleo. Las proteínas, en cambio, se fabrican fuera de él, en los ribosomas. ¿Cómo llega la receta de un lugar a otro?',
      'El primer paso se llama transcripción: se abre una parte del ADN y se copia en una molécula más corta, el ARN mensajero. En el ARN no hay T; en su lugar aparece U. Donde el ADN tiene A, el ARN lleva U; donde tiene T, lleva A; donde tiene C, lleva G, y donde tiene G, lleva C.',
      'El segundo paso es la traducción. El ribosoma lee el ARN mensajero de tres en tres letras. Cada grupo de tres, llamado codón, indica un aminoácido. Los ARN de transferencia traen los aminoácidos y el ribosoma los une en fila: esa fila es la proteína.',
      'Con cuatro letras se pueden formar 64 codones, pero solo hay unos veinte aminoácidos comunes. Por eso varios codones indican el mismo. Por ejemplo, GAA y GAG indican ácido glutámico, mientras que GUA indica valina.',
      'Un cambio en una letra del ADN es una mutación. Si el codón nuevo indica el mismo aminoácido, la proteína no cambia. Si indica otro, puede cambiar. Es lo que ocurre en la anemia falciforme: una sola letra distinta pone valina donde iba ácido glutámico, y la hemoglobina se deforma.',
      'Agregar o quitar una letra suele ser peor, porque desde ese punto todos los grupos de tres se corren. Es como leer una frase con los espacios en el lugar equivocado: las letras son casi las mismas, pero ya no dicen nada.',
    ],
  };
  const l3 = leccion('icf-cn-celula-3', 'Del ADN a la proteína', guion(
    ['La receta', 'El ADN guarda instrucciones en el núcleo; las proteínas se hacen en los ribosomas.'],
    ['Transcripción', 'ADN → ARN mensajero: A con U, T con A, C con G, G con C.'],
    ['Traducción', 'El ribosoma lee de tres en tres: cada codón indica un aminoácido.'],
    ['Mutación', 'Cambiar una letra puede no cambiar nada; agregar o quitar una corre todos los grupos.']), [
    x('pasos-del-proceso', 'Ordena el camino del ADN a la proteína. El primer paso está en su puesto.', { doc: ADN, que: 'el proceso', de: 'Del ADN a la proteína', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Se abre una parte del ADN.', 'Se copia en ARN mensajero.', 'El ARN llega al ribosoma.', 'El ribosoma lee de tres en tres.', 'Los aminoácidos se unen en fila.'], mira: ['', 'Se copia lo que ya está a la vista.', 'Llega al ribosoma lo que ya se copió.', 'Se lee lo que ya llegó.', 'Se unen según lo que se leyó.'], bien: 'Abrir, copiar, llevar, leer y unir.' },
      'El ADN se abre y se copia; el ARN llega al ribosoma, que lee codones y une aminoácidos.', 'Distingue lo que pasa en el núcleo de lo que pasa en el ribosoma.'),
    x('genero-o-cita', '¿Pasa en la **transcripción** o en la **traducción**?', { doc: ADN, rot: ['transcripción', 'traducción'],
      ...F(['Se forma ARN mensajero', 0, '¿Se copia o se lee?'], ['Se leen codones', 1, '¿Se copia o se lee?'], ['A del ADN se vuelve U', 0, '¿Se copia o se lee?'], ['Se unen aminoácidos', 1, '¿Se copia o se arma la proteína?'], ['Trabaja el ribosoma', 1, '¿Dónde está: en el núcleo o fuera?']), bien: 'Copiar y leer.' },
      'Copiar el ADN en ARN es transcripción; leer codones y unir aminoácidos, traducción.', 'Pregunta si se está copiando la receta o si ya se está cocinando.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ADN, nums: [1, 2, 5], pregunta: 'Queda en pie', queda: 'Una letra puede cambiar una proteína.',
      ...T(['Las proteínas se fabrican en el núcleo.', 2, 'Busca dónde se fabrican.'], ['El ARN usa la letra T.', [5, 6], 'Busca qué aparece en lugar de T.'], ['Toda mutación cambia la proteína.', 8, 'Busca cuándo la proteína no cambia.']), bien: 'Lugar, letra y excepción.' },
      'Se fabrican en los ribosomas, el ARN lleva U y hay mutaciones que no cambian la proteína.', 'Busca en cada opción la palabra que el texto corrige.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ADN, filas: [{ antes: 'El ribosoma lee las letras de', topes: ['dos en dos', 'tres en tres', 'cuatro en cuatro'], va: 1 }, { antes: 'Un mismo aminoácido puede tener', topes: ['varios codones', 'ningún codón', 'solo un codón'], va: 0 }, { antes: 'Quitar una letra suele', topes: ['no hacer nada', 'mejorar la proteína', 'correr los grupos'], va: 2 }], mira: ['Relee el párrafo 3: ¿cómo lee?', 'Relee el párrafo 4: GAA y GAG.', 'Relee el párrafo 6: ¿qué pasa desde ese punto?'], luz: [[3, 'de tres en tres letras'], [4, 'varios codones indican el mismo'], [6, 'todos los grupos de tres se corren']], bien: 'Tres reglas del código.' },
      'Se lee de tres en tres, varios codones indican lo mismo y quitar una letra corre todo.', 'Cada regla está en un párrafo distinto: 3, 4 y 6.'),
    x('pilares', 'El techo es una afirmación. ¿Qué la sostiene y qué no?', { doc: ADN, idea: 'Una mutación puede no cambiar la proteína',
      ...F(['GAA y GAG indican lo mismo.', 0, '¿Muestra un cambio de letra sin efecto?'], ['Hay 64 codones y unos 20 aminoácidos.', 0, '¿Explica que sobren codones?'], ['El ADN está en el núcleo.', 1, '¿Dice algo de cambiar letras?'], ['El ARN usa U.', 1, '¿Dice algo de cambiar letras?']), bien: 'Sobran codones: por eso caben cambios sin efecto.' },
      'Que varios codones indiquen lo mismo sostiene la idea; el lugar del ADN y la U son ciertos, pero no la apoyan.', 'Una oración puede ser cierta y no sostener la idea.'),
    x('lee-escala', 'La gráfica cuenta proteínas normales en tres muestras. Pon cada valor y cuántas **menos** tiene C que A.', { vals: [80, 60, 30], rot: ['A', 'B', 'C'], hi: 80, st: 20, et: ['A', 'B', 'C', 'A menos C'], ops: ['', '', ''], metas: ['80', '60', '30', '50'], fichas: ['80', '60', '30', '50', '25', '110', '21'],
      mira: ['Mira en qué línea termina.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 20 y 40.', 'Resta la de C a la de A.'], trampas: { '2:25': 'Cada línea vale 20: la mitad son 10.', '2:21': 'Cada línea vale 20: la mitad son 10.', '3:110': 'Eso es la suma.' }, ok: 'La muestra C es la que menos tiene.' },
      'Las líneas van de 20 en 20; C queda a mitad entre 20 y 40. La diferencia es $80 - 30 = 50$.', 'Mira cuánto vale cada línea antes de leer la barra de C.'),
    sol('Un trozo de ADN dice TAC. ¿Cuál es su ARN mensajero?', ['Donde el ADN tiene T, el ARN lleva [[A]]', 'Donde tiene A, lleva [[U]]', 'Donde tiene C, lleva [[G]]', 'El ARN mensajero es [[AUG]]'], ['T', 'ATG', 'C'], 'T con A, A con U y C con G: AUG. El ARN no usa T.', 'Copia letra por letra con la regla y recuerda que el ARN no tiene T.'),
    err('Alguien traduce un ARN mensajero de 12 letras.', ['El ribosoma lee de tres en tres', 'Son $12 \\div 3 = 4$ codones', 'Cada codón indica un aminoácido', 'La fila tiene 12 aminoácidos'], 3, ['La fila tiene 4 aminoácidos', 'La fila tiene 3 aminoácidos', 'La fila tiene 36 aminoácidos'], 'Un aminoácido por codón: 4 codones, 4 aminoácidos.', '¿Cuántos codones se contaron en el segundo paso?'),
    opc('En un gen se cambia una letra y el codón pasa de GAA a GAG. Según el texto, la proteína:', ['No cambia, porque los dos codones indican ácido glutámico', 'Pierde todos sus aminoácidos', 'Cambia ácido glutámico por valina', 'Se fabrica en el núcleo'], 0, 'GAA y GAG indican el mismo aminoácido; el cambio a valina ocurre con GUA.', 'Busca en el párrafo 4 qué indica cada codón.'),
  ]);

  const AGUA = {
    id: 'icf-pez', title: 'El pez de dos aguas',
    paras: [
      'El salmón nace en ríos de agua dulce, vive en el mar y vuelve al río a reproducirse. En cada lugar su cuerpo enfrenta un problema distinto: conservar la misma cantidad de sal y de agua por dentro.',
      'En el río, el agua de afuera tiene menos sal que su sangre. Por ósmosis entra agua a su cuerpo; el pez casi no bebe y produce mucha orina muy diluida.',
      'En el mar ocurre lo contrario: afuera hay más sal y el agua tiende a salir. El pez bebe agua de mar, orina poco y elimina el exceso de sal por células de las branquias, que gastan energía para sacarla.',
      'Un grupo midió la sal en la sangre de salmones pasados del río al mar. El primer día subió de 150 a 190 unidades; al quinto día había bajado a 160 y se mantuvo así. En peces de otra especie, que solo viven en ríos, subió a 260 y murieron.',
      'Los investigadores encontraron que, antes de salir al mar, los salmones fabrican más de una proteína de las branquias que bombea sal. Esa proteína se produce a partir de un gen que los peces de río también tienen, pero que en ellos se usa poco.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: AGUA, ...p }, e, { hint: h });
  return mundo('icf-cn-celula', 'Célula y Organismos', 'ciencias', [l1, l2, l3], [
    ['icf-cn-celula-1', 'El agua va hacia donde hay más sal disuelta.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Por qué entra agua en el río?', [2]], ['¿Cuánto bebe y orina en el mar?', [3]], ['¿Qué pasó con los peces de río?', [4]]] }, 'El río está en el 2, el mar en el 3 y el experimento en el 4.', 'Busca la palabra clave de cada pregunta: río, beber, experimento.')],
    ['icf-cn-celula-1', 'Ir en contra, de menos a más, gasta energía.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Sacar una sustancia hacia donde ya hay más de ella exige gastar energía.', cards: [['Una célula que mete potasio aunque adentro ya hay más.', true], ['Una raíz que absorbe un mineral del que ya tiene más que el suelo.', true], ['Agua que entra a una pasa en un vaso.', false], ['Oxígeno que pasa de donde hay mucho a donde hay poco.', false]] }, 'Meter potasio o un mineral que ya abunda adentro va en contra y gasta; la pasa y el oxígeno van a favor.', 'Pregunta si va de más a menos (gratis) o de menos a más (con gasto).')],
    ['icf-cn-celula-1', 'Compara dónde hay más sal antes de decir hacia dónde va el agua.', opc('Si un pez de río se pone en agua de mar, lo primero que ocurre es que:', ['Entra agua a su cuerpo y se hincha', 'Deja de tener membranas', 'Gana agua por la orina', 'Sale agua de su cuerpo por ósmosis'], 3, 'Afuera hay más sal: el agua sale del pez.', 'Decide dónde hay más sal: en su sangre o en el mar.')],
    ['icf-cn-celula-2', 'Homeostasis: volver a un valor estable después de un cambio.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Al quinto día la sal bajó a 160.', 0], ['El salmón recuperó el equilibrio; el pez de río, no.', 1], ['Los salmones beben agua en el mar.', 0], ['El salmón vive más de diez años.', 2]] }, 'Los 160 y el agua que bebe están escritos; el equilibrio se deduce al comparar; la edad no aparece.', 'Compara lo que pasó con los dos grupos de peces.')],
    ['icf-cn-celula-2', 'Un sistema puede ajustar lo que entra y lo que sale.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'En el mar, el salmón hace todo esto, EXCEPTO:', cards: [['Beber agua', [3]], ['Orinar poco', [3]], ['Sacar sal por las branquias', [3, 5]], ['Producir mucha orina diluida', null]] }, 'La orina abundante y diluida es del río, no del mar.', 'Revisa en qué lugar ocurre cada cosa.')],
    ['icf-cn-celula-2', 'Lo importante de una curva es si vuelve al punto de partida.', opc('Los datos de los salmones muestran que su cuerpo:', ['No reaccionó al cambio', 'Reguló la sal hasta un valor cercano al inicial', 'Aumentó la sal sin límite', 'Cambió de especie'], 1, 'Subió a 190 y volvió a 160, cerca de los 150 iniciales.', 'Compara el primer valor, el más alto y el último.')],
    ['icf-cn-celula-3', 'Tener un gen no significa usarlo: puede estar casi apagado.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [3, 5], options: ['En el mar el pez bebe y gasta energía para sacar sal.', 'Los salmones usan más un gen que otros peces también tienen.', 'Los peces de río no tienen genes para la sal.', 'En el mar el pez no necesita agua.'], key: [0, 1] }, 'El 3 explica qué hace en el mar; el 5, que el gen existe en ambos y se usa distinto.', 'El resumen no puede contradecir el párrafo: mira «también tienen».')],
    ['icf-cn-celula-3', 'Del gen a la proteína: transcripción y traducción.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['plantea el problema', 'explica lo que pasa en el río', 'explica lo que pasa en el mar', 'da los datos de un experimento', 'explica la causa en las proteínas', 'cuenta una leyenda'], key: [0, 1, 2, 3, 4] }, 'Problema, río, mar, datos y explicación; no hay leyenda.', 'Busca las palabras río, mar, midió y proteína.')],
    ['icf-cn-celula-3', 'Para fabricar más proteína hay que copiar más el gen.', opc('Que los salmones fabriquen más de la proteína que bombea sal implica que en sus branquias:', ['El ADN se convirtió en sal', 'Apareció un gen que no existía', 'Se transcribe y traduce más ese gen', 'Los ribosomas entraron al núcleo'], 2, 'Para tener más proteína, el gen se copia más en ARN y se traduce más. El gen ya existía.', 'Recuerda los dos pasos que llevan del gen a la proteína.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-movimiento.js
// Preicfes · Ciencias Naturales · mundo 3 «Movimiento y Fuerzas» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const CARRO = {
    id: 'icf-carrito', title: 'Dos carritos y un cronómetro',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Para describir un movimiento hay que decir desde dónde se mide, en qué lugar está el objeto y en qué momento. La posición es ese lugar; la velocidad dice cuánto cambia la posición en cada segundo, y hacia dónde; la aceleración, cuánto cambia la velocidad en cada segundo.',
      'El curso soltó dos carritos sobre rieles y anotó su posición cada segundo. El carrito A, movido por un motor, estuvo en 0, 20, 40, 60 y 80 centímetros. El carrito B, que bajaba por una rampa, en 0, 5, 20, 45 y 80.',
      'Los dos llegaron a los 80 centímetros en cuatro segundos, así que su velocidad media fue la misma: 20 centímetros por segundo. Sin embargo, no se movieron igual. A recorrió 20 centímetros en cada segundo: su velocidad fue constante. B recorrió 5, luego 15, luego 25 y luego 35: cada segundo avanzó 10 más que en el anterior, es decir, su velocidad aumentó siempre en la misma cantidad.',
      'Al dibujar la posición contra el tiempo, la gráfica de A es una recta; la de B, una curva que se empina. En la gráfica de A la inclinación es la velocidad: si fuera más empinada, A sería más rápido. Un tramo horizontal significaría que está quieto, no que va por un camino plano.',
      'Un estudiante afirmó que, como las dos gráficas se cruzan a los cuatro segundos, en ese momento iban a la misma velocidad. Su compañera lo corrigió: el cruce solo dice que están en el mismo lugar. En ese instante, la curva de B es más empinada; B iba más rápido.',
      'Para terminar, pusieron a A en sentido contrario. La posición pasó de 80 a 0 en cuatro segundos, y la velocidad fue de −20 centímetros por segundo. El signo menos no significa que vaya más despacio: indica el sentido.',
    ],
  };
  const l1 = leccion('icf-cn-movimiento-1', 'Posición, velocidad y aceleración', guion(
    ['Tres preguntas', 'Posición: dónde está. Velocidad: cuánto cambia la posición por segundo. Aceleración: cuánto cambia la velocidad.'],
    ['La recta y la curva', 'En la gráfica de posición, una recta es velocidad constante; una curva, velocidad que cambia.'],
    ['La inclinación', 'Más empinada, más rápido. Horizontal, quieto.'],
    ['El signo', 'Dice el sentido, no la rapidez.']), [
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: CARRO, filas: [{ antes: 'La velocidad del carrito A', topes: ['aumenta', 'es constante', 'disminuye'], va: 1 }, { antes: 'La velocidad media de A y la de B son', topes: ['muy distintas', 'cero', 'iguales'], va: 2 }, { antes: 'En cada segundo B avanza 10 cm', topes: ['más que antes', 'en total', 'menos que antes'], va: 0 }], mira: ['Mira cuánto avanza A en cada segundo.', 'Compara cuánto recorrieron y en cuánto tiempo.', 'Compara 5, 15, 25 y 35.'], luz: [[3, 'su velocidad fue constante'], [3, 'su velocidad media fue la misma'], [3, '10 más que en el anterior']], bien: 'Constante, igual media y en aumento.' },
      'A avanza siempre 20; los dos hacen 80 en 4 segundos; y B suma 10 más cada vez.', 'Resta las posiciones seguidas para ver cuánto avanza en cada segundo.'),
    x('genero-o-cita', '¿Describe la **velocidad** o la **aceleración**?', { doc: CARRO, rot: ['velocidad', 'aceleración'],
      ...F(['Avanza 20 cm cada segundo', 0, '¿Cambia la posición o cambia la rapidez?'], ['Cada segundo va 10 cm/s más rápido', 1, '¿Cambia la posición o cambia la rapidez?'], ['Una moto frena antes de la curva', 1, '¿Cambia la posición o cambia la rapidez?'], ['Un tren va a 80 km/h por la recta', 0, '¿Cambia la posición o cambia la rapidez?']), bien: 'Cambia el lugar o cambia la rapidez.' },
      'Avanzar es velocidad; ganar o perder rapidez, aceleración. Frenar también es acelerar.', 'Pregunta si lo que cambia es dónde está o qué tan rápido va.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CARRO, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'La gráfica de A es una recta.',
      ...T(['Un tramo horizontal es un camino plano.', 2, 'Busca qué significa horizontal.'], ['Al cruzarse iban igual de rápido.', [4, 5], 'Busca qué dice de verdad el cruce.'], ['El signo menos indica que va despacio.', 8, 'Busca qué indica el signo.']), bien: 'La gráfica no es el dibujo del camino.' },
      'Horizontal es quieto, el cruce es el mismo lugar y el menos indica el sentido.', 'Busca en cada opción la palabra que el texto corrige.'),
    x('tres-viajes', 'Completa el dato que falta en cada movimiento.', { viajes: [{ n: 'trote', d: 12, v: 8, t: 1.5, falta: 'd' }, { n: 'bici', d: 60, v: 20, t: 3, falta: 't' }, { n: 'bus', d: 150, v: 60, t: 2.5, falta: 'v' }], fichas: ['12', '3', '60', '9.5', '40', '147'] },
      '$8 \\cdot 1.5 = 12$; $60 \\div 20 = 3$; $150 \\div 2.5 = 60$.', 'Distancia es velocidad por tiempo; las otras dos se despejan dividiendo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CARRO, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['B estuvo en 45 cm a los tres segundos.', 1, 'Cuenta: la primera posición es a los cero segundos.'], ['A llevaba un motor.', 0, 'Léela junto a la descripción de A.'], ['A los 5 segundos B estaría en 125 cm si siguiera igual.', 1, 'Suma lo que avanzaría en el segundo siguiente.'], ['B pesa más que A.', 2, '¿Se pesaron los carritos?']),
      luz: [[2, 'movido por un motor'], [2, '0, 5, 20, 45 y 80']], bien: 'Los datos permiten ir un paso más.' },
      'El motor está escrito; los 45 a los 3 s y los $80 + 45 = 125$ se deducen; el peso no se midió.', 'Ordena las posiciones con su segundo: 0, 1, 2, 3 y 4.'),
    x('lee-escala', 'La gráfica muestra cuánto avanzó otro carrito en tres segundos seguidos (en cm). Pon cada avance y el total.', { vals: [10, 30, 50], rot: ['1.º', '2.º', '3.º'], hi: 60, st: 20, et: ['1.º', '2.º', '3.º', 'total'], ops: ['+', '+', '='], metas: ['10', '30', '50', '90'], fichas: ['10', '30', '50', '90', '5', '25', '45'],
      mira: ['Está a mitad de camino entre 0 y 20.', 'Está a mitad de camino entre 20 y 40.', 'Está a mitad de camino entre 40 y 60.', 'Suma los tres avances.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '1:25': 'Cada línea vale 20: la mitad son 10.', '2:45': 'Cada línea vale 20: la mitad son 10.' }, ok: 'Cada segundo avanza 20 más: acelera.' },
      'Las líneas van de 20 en 20: $10 + 30 + 50 = 90$ cm. Cada segundo avanza 20 más.', 'Mira cuánto vale cada línea y cuánto es la mitad.'),
    sol('Un carro pasa de 10 m/s a 25 m/s en 5 segundos. ¿Cuál es su aceleración?', ['El cambio de velocidad es $25 - 10 =$ [[15]] m/s', 'Ocurre en [[5]] segundos', 'La aceleración es $15 \\div 5 =$ [[3]] m/s cada segundo'], ['5 m', '35', '7'], 'La aceleración es cuánto cambia la velocidad por segundo: 3 m/s².', 'Halla cuánto cambió la velocidad y repártelo en los segundos.'),
    err('Un estudiante lee una gráfica de posición contra tiempo con un tramo horizontal entre 2 s y 6 s.', ['El eje vertical es la posición', 'Entre 2 s y 6 s la posición no cambia', 'El objeto avanza por un camino plano'], 2, ['El objeto está quieto', 'El objeto acelera', 'El objeto se devuelve'], 'Si la posición no cambia con el tiempo, el objeto no se mueve.', 'Si la posición es la misma cuatro segundos, ¿se movió?'),
    opc('Dos atletas corren 100 metros en 14 segundos. La primera va siempre a la misma velocidad; la segunda empieza despacio y acelera. Es correcto afirmar que:', ['Tienen la misma velocidad media', 'La segunda recorrió más distancia', 'La primera tuvo mayor aceleración', 'En todo momento fueron igual de rápidas'], 0, 'Misma distancia en el mismo tiempo: misma media, aunque en cada instante fueran distinto.', 'La velocidad media solo mira la distancia total y el tiempo total.'),
  ]);

  const CAJA = {
    id: 'icf-caja', title: 'La caja que no se quería mover',
    ficha: { autor: 'Equipo de un taller de mecánica', fuente: 'Cartilla para aprendices', fecha: 'Abril de 2026' },
    paras: [
      'Una fuerza es un empujón o un jalón. Se mide en newtons y tiene dirección: no es lo mismo empujar hacia la derecha que hacia arriba. Cuando sobre un objeto actúan varias fuerzas, lo que importa es la fuerza neta, es decir, lo que resulta al juntarlas.',
      'En el taller hay una caja de 20 kilogramos. Dos aprendices la empujan hacia la derecha con 50 y 30 newtons, y el piso la frena con 80. La fuerza neta es cero. La caja, que estaba quieta, sigue quieta. Si ya venía moviéndose, seguiría a la misma velocidad: con fuerza neta cero, un objeto no cambia su movimiento.',
      'Esto sorprende, porque estamos acostumbrados a que todo se detenga. Pero lo que detiene a una caja que se suelta es el roce, que también es una fuerza. Sobre una pista de hielo, donde el roce es pequeño, la misma caja avanza mucho más con el mismo empujón.',
      'Después, los aprendices empujaron con 140 newtons en total. Ahora la fuerza neta era de 60 hacia la derecha, y la caja aceleró 3 metros por segundo cada segundo. Con el doble de fuerza neta habría acelerado el doble; con el doble de masa y la misma fuerza, la mitad. Esa relación se escribe: fuerza neta igual a masa por aceleración.',
      'Uno de los aprendices preguntó por qué le dolían las manos si era él quien empujaba. La respuesta es que las fuerzas vienen por pares: cuando empujas la caja, la caja te empuja a ti con la misma fuerza y en sentido contrario. No se anulan, porque actúan sobre objetos distintos: una sobre la caja y la otra sobre ti.',
      'Por último, pesaron la caja. El peso es la fuerza con que la Tierra la atrae, unos 200 newtons; la masa, 20 kilogramos, es la cantidad de materia. En la Luna, la masa sería la misma y el peso, cerca de la sexta parte.',
    ],
  };
  const l2 = leccion('icf-cn-movimiento-2', 'Fuerzas y equilibrio', guion(
    ['Fuerza neta', 'Las fuerzas se juntan: hacia el mismo lado se suman; en sentidos contrarios se restan.'],
    ['Neta cero', 'El objeto no cambia su movimiento: quieto sigue quieto; si se mueve, sigue igual.'],
    ['F = m · a', 'Más fuerza, más aceleración; más masa, menos aceleración.'],
    ['Pares', 'Si empujas algo, te empuja igual en sentido contrario.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 2 la oración con la **regla** para fuerza neta cero.', { doc: CAJA, nums: [2], apuesta: 'Con fuerza neta cero, el movimiento no cambia.', ...S(['2.4'], { '2.0': 'Presenta la caja y su masa.', '2.1': 'Dice qué fuerzas actúan.', '2.2': 'Calcula la fuerza neta de este caso.', '2.3': 'Dice qué pasó con la caja quieta.' }), bien: 'Quieto o a la misma velocidad.' },
      'La última oración termina con la regla general: con fuerza neta cero no cambia el movimiento.', 'Busca la oración que vale para cualquier objeto.'),
    x('genero-o-cita', '¿La fuerza neta es **cero** o **no**?', { doc: CAJA, rot: ['es cero', 'no es cero'],
      ...F(['Un libro quieto sobre la mesa', 0, '¿Cambia su movimiento?'], ['Un bus que arranca', 1, '¿Cambia su movimiento?'], ['Un carro a 60 km/h constantes en línea recta', 0, '¿Cambia su movimiento?'], ['Un balón que frena en el pasto', 1, '¿Cambia su movimiento?']), bien: 'Si el movimiento no cambia, neta cero.' },
      'El libro y el carro constante no cambian; el bus que arranca y el balón que frena, sí.', 'No preguntes si se mueve: pregunta si cambia su movimiento.'),
    x('pista-tipo', 'Ata cada idea a su situación.', { doc: CAJA, lineas: ['Con el doble de masa, acelera la mitad.', 'Al remar, el agua empuja al bote.', 'La caja avanza más en el hielo.', 'En la Luna pesa menos.'],
      ...T(['fuerza, masa y aceleración', 0, 'Busca la que compara cuánto acelera.'], ['las fuerzas vienen por pares', 1, 'Busca la que habla de dos cosas que se empujan.'], ['el roce frena', 2, 'Busca la que compara pisos.'], ['el peso no es la masa', 3, 'Busca la que cambia de lugar en el espacio.']), bien: 'Cuatro ideas, cuatro casos.' },
      'La masa y la aceleración, el par agua y bote, el roce del piso y el peso en otro lugar.', 'Busca la palabra de cada idea: masa, empuja, frena o pesa.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CAJA, filas: [{ antes: 'Con 140 N hacia la derecha y 80 de roce, la fuerza neta es', topes: ['220 N', '60 N', '0 N'], va: 1 }, { antes: 'Con el doble de fuerza neta, la aceleración', topes: ['se duplica', 'no cambia', 'baja a la mitad'], va: 0 }, { antes: 'En la Luna la masa', topes: ['desaparece', 'se reduce', 'es la misma'], va: 2 }], mira: ['El roce va en sentido contrario.', 'Relee el final del párrafo 4.', 'Relee la última oración del texto.'], luz: [[4, '60 hacia la derecha'], [4, 'habría acelerado el doble'], [6, 'la masa sería la misma']], bien: 'Restar, duplicar y conservar.' },
      '$140 - 80 = 60$; el doble de fuerza da el doble de aceleración; la masa no cambia de lugar a lugar.', 'Busca la oración exacta para cada perilla.'),
    x('balanza-tesis', 'Afirmación: «todo objeto en movimiento se detiene solo». ¿Qué hace cada dato?', { doc: CAJA, tesis: 'Todo objeto en movimiento se detiene solo',
      ...F(['Una nave sigue viajando sin motores.', 1, '¿La nave se detuvo?'], ['En el hielo la caja llega más lejos.', 1, '¿Se detiene por sí sola o por el roce?'], ['Un experimento sin roce mostró que se frena igual.', 0, 'Si fuera cierto, ¿a quién le daría la razón?'], ['La caja es de madera.', 2, '¿Dice algo del movimiento?']), bien: 'Lo que frena es el roce.' },
      'La nave y el hielo la debilitan; que se frenara sin roce la apoyaría; la madera no pesa.', 'Piensa qué tendría que pasar si la afirmación fuera cierta.'),
    x('mayor-tramo', 'La gráfica muestra la aceleración de una caja con cuatro empujones cada vez mayores. Toca el tramo que más creció **en porcentaje**.', { v: [8, 14, 20, 30] },
      'De 8 a 14 sube 75 %; de 14 a 20, cerca de 43 %; de 20 a 30, 50 %. El último sube más unidades, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('Una lancha de 400 kg recibe 1 500 N hacia adelante del motor y 300 N hacia atrás del agua. ¿Cuál es su aceleración?', ['La fuerza neta es $1\\,500 - 300 =$ [[1 200]] N', 'Se divide entre la masa: [[400]] kg', 'La aceleración es [[3]] m/s²'], ['1 800', '4.5', '480 000'], '$1\\,200 \\div 400 = 3$: fuerza neta entre masa.', 'Junta primero las fuerzas; el agua empuja en contra.'),
    err('Un niño empuja una pared con 100 N y la pared no se mueve. Alguien lo explica.', ['El niño empuja la pared con 100 N', 'La pared empuja al niño con 100 N', 'Esas dos fuerzas se anulan y por eso la pared no se mueve'], 2, ['No se anulan, porque actúan sobre objetos distintos; a la pared la sostienen otras fuerzas', 'La pared no hace ninguna fuerza', 'La pared empuja con más fuerza que el niño'], 'El par acción y reacción actúa sobre cuerpos distintos. La pared no se mueve porque el piso y la estructura la sujetan.', '¿Sobre quién actúa cada una de esas fuerzas?'),
    opc('Un paracaidista cae a velocidad constante. Las fuerzas que actúan sobre él son el peso, hacia abajo, y la resistencia del aire, hacia arriba. Se puede afirmar que:', ['El peso es mayor, porque baja', 'No actúa ninguna fuerza', 'La resistencia del aire es mayor', 'Las dos fuerzas son iguales, porque su velocidad no cambia'], 3, 'Velocidad constante es fuerza neta cero: el peso y la resistencia se equilibran, aunque se mueva hacia abajo.', 'Pregunta si su movimiento cambia, no si se mueve.'),
  ]);

  const LUNA = {
    id: 'icf-gravedad', title: 'Por qué la Luna no se cae',
    ficha: { autor: 'Observatorio de un colegio', fuente: 'Boletín de astronomía', fecha: 'Mayo de 2026' },
    paras: [
      'Todos los objetos con masa se atraen. A esa atracción se le llama gravedad. Es más fuerte cuanto mayores son las masas y más débil cuanto más lejos están. Por eso notamos la de la Tierra, que es enorme, y no la de una silla.',
      'Cerca del suelo, todos los objetos caen con la misma aceleración si el aire no estorba: cada segundo su velocidad aumenta unos 10 metros por segundo. En un tubo al vacío, una pluma y una moneda llegan al tiempo. En el aire, la pluma se demora, no porque pese menos, sino porque el aire la frena más en proporción a su peso.',
      'El grupo soltó una bola desde una torre y, con una cámara, calculó su velocidad: 0 al comienzo, 10 a un segundo, 20 a los dos y 30 a los tres metros por segundo. Luego soltó otra del doble de masa. Los valores fueron los mismos, dentro del error de la cámara.',
      'Si la Tierra atrae a la Luna, ¿por qué no se cae? Porque además de caer se mueve de lado. Imaginemos una montaña muy alta y una bola lanzada cada vez con más velocidad: primero cae cerca; después, más lejos; con la velocidad justa, cae siguiendo la curva de la Tierra y nunca llega al suelo. Eso es una órbita: caer sin alcanzar el piso.',
      'La gravedad también explica las mareas. La Luna atrae más el agua del lado que le queda cerca que el centro de la Tierra, y menos el agua del lado opuesto. Esa diferencia estira los océanos y forma dos abultamientos; al girar la Tierra, cada costa pasa por ellos dos veces al día, más o menos.',
      'El peso cambia con el lugar porque depende de la gravedad. Una persona de 60 kilogramos pesa unos 600 newtons en la Tierra y unos 100 en la Luna. Su masa es la misma en los dos sitios. Los astronautas de una estación flotan no porque allá no haya gravedad, sino porque ellos y la estación caen juntos.',
    ],
  };
  const l3 = leccion('icf-cn-movimiento-3', 'Gravedad', guion(
    ['Se atraen', 'Más masa, más atracción; más lejos, menos.'],
    ['Caer', 'Sin aire, todo cae igual: unos 10 m/s más cada segundo.'],
    ['Órbita', 'Es caer mientras se avanza de lado.'],
    ['Peso y masa', 'El peso cambia con el lugar; la masa, no.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: LUNA,
      ...F(['¿De qué depende la fuerza de gravedad?', 0, 'Busca el comienzo que habla de que se atraen.'], ['¿Por qué la Luna no cae al suelo?', 3, 'Busca el comienzo que hace esa pregunta.'], ['¿Por qué cambia el peso?', 5, 'Busca el comienzo que nombra el peso.']),
      luz: [[1, 'más fuerte cuanto mayores son las masas'], [4, 'además de caer se mueve de lado'], [6, 'depende de la gravedad']], bien: 'Atracción, órbita y peso.' },
      'La atracción abre el 1, la Luna el 4 y el peso el 6.', 'Busca en los comienzos la palabra clave de cada pregunta.'),
    x('genero-o-cita', '¿Es **masa** o **peso**?', { doc: LUNA, rot: ['masa', 'peso'],
      ...F(['Sesenta kilogramos en la Tierra y en la Luna', 0, '¿Cambia con el lugar?'], ['Cien newtons en la Luna', 1, '¿Es una fuerza o una cantidad de materia?'], ['La fuerza con que la Tierra te atrae', 1, '¿Es una fuerza o una cantidad de materia?'], ['La cantidad de materia', 0, '¿Es una fuerza o una cantidad de materia?']), bien: 'Materia o fuerza.' },
      'La masa es materia y no cambia; el peso es una fuerza, en newtons, que depende del lugar.', 'Mira la unidad: kilogramos o newtons. Y si cambia con el lugar.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: LUNA, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'La gravedad depende de la masa y de la distancia.',
      ...T(['La pluma cae lento porque pesa menos.', [1, 2], 'Busca por qué se demora.'], ['Con el doble de masa cayó más rápido.', 5, 'Busca cómo fueron los valores.'], ['En la estación no hay gravedad.', 9, 'Busca por qué flotan.']), bien: 'El aire, los datos y caer juntos.' },
      'La frena el aire, los valores fueron iguales y los astronautas caen junto con la estación.', 'Busca la palabra clave de cada opción: pluma, masa y estación.'),
    x('pasos-del-proceso', 'Ordena los lanzamientos desde la montaña, de menor a mayor velocidad. El primero está en su puesto.', { doc: LUNA, que: 'lo que pasa', de: 'La bola en la montaña', fija: 1, ini: [0, 2, 3, 1], tiras: ['Se suelta: cae al pie.', 'Se lanza suave: cae cerca.', 'Se lanza fuerte: cae lejos.', 'Con la velocidad justa: da la vuelta.'], mira: ['', 'Va con poca velocidad de lado.', 'Va más rápido, pero todavía toca el suelo.', 'Es la única que no llega al suelo.'], bien: 'Caer, cada vez más lejos, hasta no llegar.' },
      'A más velocidad de lado, más lejos cae, hasta que la curva de la Tierra se lo impide.', 'Piensa qué tan lejos llega cada lanzamiento.'),
    x('balanza-tesis', 'Tesis: sin aire, la masa no cambia la caída. ¿Qué hace cada dato?', { doc: LUNA, tesis: 'Sin aire, la masa no cambia la caída',
      ...F(['Pluma y moneda llegan al tiempo en el vacío.', 0, '¿Cayeron igual con masas distintas?'], ['Dos bolas de distinta masa dieron los mismos valores.', 0, '¿Cayeron igual con masas distintas?'], ['En otro tubo al vacío la moneda llegó antes.', 1, '¿Cayeron igual?'], ['La torre es de ladrillo.', 2, '¿Dice algo de la caída?']), bien: 'Dos apoyan, uno debilitaría.' },
      'El tubo y las dos bolas apoyan; otro tubo con resultado distinto debilitaría; la torre no pesa.', 'Supón cierto cada dato y compara masas y tiempos.'),
    x('lee-escala', 'La gráfica muestra la velocidad de una bola que cae (en m/s) a 1, 2 y 3 segundos. Pon cada una y cuánto creció de 1 s a 3 s.', { vals: [10, 20, 30], rot: ['1 s', '2 s', '3 s'], hi: 40, st: 20, et: ['1 s', '2 s', '3 s', 'creció'], ops: ['', '', ''], metas: ['10', '20', '30', '20'], fichas: ['10', '20', '30', '20', '5', '25', '60'],
      mira: ['Está a mitad de camino entre 0 y 20.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 20 y 40.', 'Resta la velocidad de 1 s a la de 3 s.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '2:25': 'Cada línea vale 20: la mitad son 10.', '3:60': 'Eso es la suma de las tres.' }, ok: 'Crece 10 m/s en cada segundo.' },
      'Las líneas van de 20 en 20: 10, 20 y 30. De 1 s a 3 s creció 20 m/s.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('Una piedra se suelta desde un puente y tarda 4 segundos en llegar al agua. Si cada segundo gana 10 m/s, ¿con qué velocidad llega y cuál fue su velocidad media?', ['Llega con $4 \\cdot 10 =$ [[40]] m/s', 'Empezó en [[0]] m/s', 'La media, entre la inicial y la final, es [[20]] m/s'], ['10', '14', '80'], 'Gana 10 cada segundo: llega a 40. La media entre 0 y 40 es 20 m/s.', 'La velocidad crece parejo desde que se suelta.'),
    err('Alguien compara a una astronauta en la Tierra y en la Luna.', ['Su masa en la Tierra es 70 kg', 'En la Luna la gravedad es menor', 'En la Luna su masa es cerca de 12 kg'], 2, ['En la Luna su masa sigue siendo 70 kg', 'En la Luna su masa es 420 kg', 'En la Luna no tiene masa'], 'Lo que baja a la sexta parte es el peso, no la masa.', '¿Cuál de los dos depende del lugar: la masa o el peso?'),
    opc('Un satélite da vueltas alrededor de la Tierra con los motores apagados. No cae al suelo porque:', ['A esa altura no hay gravedad', 'Se mueve de lado tan rápido que cae siguiendo la curva de la Tierra', 'El aire lo sostiene', 'Pesa muy poco'], 1, 'La gravedad lo hace caer todo el tiempo, pero su velocidad lateral lo mantiene en órbita.', 'Recuerda la bola lanzada desde la montaña.'),
  ]);

  const FRENO = {
    id: 'icf-frenado', title: 'Cuánto tarda en parar una moto',
    paras: [
      'Un grupo estudió la distancia que recorre una moto desde que el conductor ve un obstáculo hasta que se detiene. Esa distancia tiene dos partes: la de reacción, mientras el conductor decide frenar, y la de frenado, mientras la moto pierde velocidad.',
      'En pavimento seco, a 10 metros por segundo, la de reacción fue de 10 metros y la de frenado, de 7. A 20 metros por segundo, la de reacción fue de 20 y la de frenado, de 28. Al duplicar la velocidad, la reacción se duplicó y el frenado se cuadruplicó.',
      'Repitieron la prueba en pavimento mojado. La reacción fue igual; el frenado casi se duplicó, porque el roce entre la llanta y el piso es menor.',
      'También probaron con un pasajero. La moto, con más masa, necesitó más fuerza para frenar en la misma distancia; con la misma fuerza de frenos, se detuvo más adelante.',
      'El grupo concluyó que mirar el celular, que aumenta el tiempo de reacción, y la lluvia, que reduce el roce, alargan la distancia por razones distintas, y que sus efectos se suman.',
    ],
  };
  const MARTE = {
    id: 'icf-marte', title: 'Una piedra en tres mundos',
    paras: [
      'Una misma piedra de 6 kilogramos se lleva, en un relato, a la Tierra, a Marte y a la Luna. Su masa no cambia en el viaje, porque tiene la misma cantidad de materia.',
      'Su peso sí cambia: unos 60 newtons en la Tierra, 22 en Marte y 10 en la Luna, porque la gravedad es distinta en cada lugar.',
      'Al soltarla desde la misma altura, sin aire, tarda más en la Luna que en la Tierra, pues allá gana menos velocidad en cada segundo.',
      'Si en la Luna se suelta además una pluma, las dos llegan al tiempo: sin aire, la masa no cambia la caída.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: FRENO, ...p }, e, { hint: h });
  return mundo('icf-cn-movimiento', 'Movimiento y Fuerzas', 'ciencias', [l1, l2, l3], [
    ['icf-cn-movimiento-1', 'A velocidad constante, la distancia crece parejo con el tiempo.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué dos partes tiene la distancia?', [1]], ['¿Qué pasó al duplicar la velocidad?', [2]], ['¿Qué cambia con la lluvia?', [3]]] }, 'Las partes están en el 1, la velocidad en el 2 y la lluvia en el 3.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-movimiento-1', 'Compara cómo cambia una cantidad cuando otra se duplica.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Al duplicar la velocidad, el frenado se cuadruplicó.', 0], ['A 20 m/s el total en seco fue de 48 metros.', 1], ['A 30 m/s la moto se cae.', 2], ['A 10 m/s el total en seco fue de 17 metros.', 1]] }, 'Lo del frenado está escrito; $20 + 28 = 48$ y $10 + 7 = 17$ se deducen; lo de 30 m/s no aparece.', 'Suma las dos partes cuando haga falta.')],
    ['icf-cn-movimiento-1', 'Distancia es velocidad por tiempo.', opc('Durante la reacción la moto sigue a velocidad constante. A 20 m/s recorrió 20 m; el tiempo de reacción fue de:', ['0.5 s', '20 s', '2 s', '1 s'], 3, '$20 \\div 20 = 1$ segundo.', 'Divide la distancia entre la velocidad.')],
    ['icf-cn-movimiento-2', 'El roce es una fuerza que frena.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'Alargan la distancia total todas estas, EXCEPTO:', cards: [['El pavimento mojado', [3, 5]], ['Llevar un pasajero', [4]], ['Mirar el celular', [5]], ['Pintar la moto de rojo', null]] }, 'La lluvia está en el 3 y el 5, el pasajero en el 4 y el celular en el 5; el color no aparece.', 'Busca cada opción como causa.')],
    ['icf-cn-movimiento-2', 'Con más masa hace falta más fuerza para el mismo cambio.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Con la misma fuerza, un objeto con más masa tarda más en cambiar su movimiento.', cards: [['Un camión lleno frena más lejos que vacío con los mismos frenos.', true], ['Una carreta cargada arranca más despacio con el mismo caballo.', true], ['Una bombilla alumbra más con más corriente.', false], ['Una planta crece más con agua.', false]] }, 'El camión y la carreta tienen más masa y la misma fuerza; las otras no hablan de fuerza y masa.', 'Busca casos donde cambie la masa y no la fuerza.')],
    ['icf-cn-movimiento-2', 'Fuerza neta es masa por aceleración.', opc('Si la moto lleva el doble de masa y los frenos hacen la misma fuerza, su desaceleración es:', ['El doble', 'La mitad', 'Igual', 'Cero'], 1, 'Con la misma fuerza y el doble de masa, la aceleración es la mitad.', 'Usa fuerza igual a masa por aceleración.')],
    ['icf-cn-movimiento-3', 'La masa no cambia con el lugar; el peso, sí.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { doc: MARTE, labels: ['dice lo que no cambia: la masa', 'compara el peso en tres lugares', 'compara cómo cae en dos lugares', 'compara dos objetos que caen', 'cuenta cómo se hizo el viaje'], key: [0, 1, 2, 3] }, 'Masa, peso, caída en dos lugares y caída de dos objetos; el viaje no se narra.', 'Mira qué se compara en cada párrafo.')],
    ['icf-cn-movimiento-3', 'Sin aire, la masa no cambia la caída; la gravedad del lugar, sí.', pl('resume-parrafo', 'Cada párrafo en una frase', { doc: MARTE, paras: [2, 3, 4], options: ['El peso depende de la gravedad del lugar.', 'Con menos gravedad, la caída es más lenta.', 'Sin aire, objetos de distinta masa caen igual.', 'En la Luna la piedra tiene menos masa.', 'La pluma cae más lento por ser liviana.'], key: [0, 1, 2] }, 'El 2 habla del peso, el 3 de la gravedad al caer y el 4 de la masa. Las otras dos contradicen el texto.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-movimiento-3', 'En la Luna el peso es menor y la masa es la misma.', opc('Si la misma moto estuviera en la Luna, es correcto afirmar que:', ['Tendría menos masa y el mismo peso', 'No tendría masa ni peso', 'Tendría la misma masa y menos peso', 'Tendría el mismo peso y más masa'], 2, 'La masa es la cantidad de materia; el peso depende de la gravedad, que allá es menor.', 'Separa lo que depende del lugar de lo que no.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-materia.js
// Preicfes · Ciencias Naturales · mundo 4 «Materia y Mezclas» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const HIELO = {
    id: 'icf-hielo', title: 'La olla que no pasaba de noventa y seis',
    ficha: { autor: 'Curso de química de grado décimo', fuente: 'Bitácora de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'Toda la materia está hecha de partículas que se mueven. En un sólido vibran en su sitio, muy juntas; en un líquido se deslizan unas sobre otras; en un gas se mueven libres y separadas. Al calentar, las partículas se mueven más; al enfriar, menos. Las partículas no cambian de tamaño: cambian su movimiento y la distancia entre ellas.',
      'El curso puso 200 gramos de hielo en una olla y midió la temperatura cada minuto mientras la calentaba. Durante seis minutos el termómetro marcó 0 °C, aunque la llama estaba encendida. Después subió hasta 96 °C y allí se quedó, mientras el agua hervía.',
      'En los tramos planos la energía no sube la temperatura: se usa en vencer las fuerzas que mantienen unidas a las partículas. Mientras quede hielo, la mezcla sigue a 0 °C; mientras quede agua líquida hirviendo, sigue a la misma temperatura. Por eso poner más fuego a una sopa que ya hierve no la calienta más: solo hace que se evapore más rápido.',
      'Un estudiante creyó que el termómetro estaba dañado, porque el agua hierve a 100 °C. No lo estaba: el colegio queda a 1 200 metros de altura, donde el aire presiona menos y las partículas escapan con mayor facilidad. A nivel del mar habría marcado 100; en un páramo, menos de 90.',
      'Al final pesaron lo que quedó. La olla tenía 170 gramos de agua: faltaban 30. No desaparecieron: se fueron al aire como vapor. Cuando pusieron una tapa fría encima, aparecieron gotas. El cambio de estado es físico: la sustancia sigue siendo agua.',
      'También midieron la densidad, que es la masa que hay en cada unidad de volumen. Un cubo de hielo de 10 centímetros cúbicos tenía 9.2 gramos, y la misma cantidad de agua, 10. Por eso el hielo flota: en el agua, al congelarse, las partículas quedan más separadas. Con casi todas las demás sustancias ocurre lo contrario.',
    ],
  };
  const l1 = leccion('icf-cn-materia-1', 'Estados y propiedades', guion(
    ['Partículas', 'Sólido: juntas y vibrando. Líquido: se deslizan. Gas: libres y separadas.'],
    ['El tramo plano', 'Mientras cambia de estado, la temperatura no sube.'],
    ['Presión', 'Con menos presión del aire, el agua hierve a menor temperatura.'],
    ['Densidad', 'Masa entre volumen: lo menos denso flota.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica **por qué** la temperatura no sube en un tramo plano.', { doc: HIELO, nums: [3], apuesta: 'La energía suelta a las partículas en vez de calentarlas.', ...S(['3.0'], { '3.1': 'Dice cuánto dura cada tramo.', '3.2': 'Aplica la idea a una sopa.' }), bien: 'Energía que suelta, no que calienta.' },
      'La primera oración lo explica: la energía vence las fuerzas entre partículas en lugar de subir la temperatura.', 'Busca la oración que dice en qué se usa la energía.'),
    x('genero-o-cita', '¿Es un cambio **físico** o **químico**?', { doc: HIELO, rot: ['físico', 'químico'],
      ...F(['El hielo se derrite', 0, '¿Aparece otra sustancia?'], ['Un papel se quema', 1, '¿Aparece otra sustancia?'], ['El vapor se vuelve gotas', 0, '¿Aparece otra sustancia?'], ['Una manzana se oxida', 1, '¿Aparece otra sustancia?'], ['Se corta un alambre', 0, '¿Aparece otra sustancia?']), bien: 'Si la sustancia es la misma, es físico.' },
      'Derretir, condensar y cortar conservan la sustancia; quemar y oxidar forman otras.', 'Pregunta si al final sigue siendo la misma sustancia.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: HIELO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'A mayor altura, el agua hierve a menor temperatura.',
      ...T(['Al calentar, las partículas crecen.', 3, 'Busca qué cambia y qué no en las partículas.'], ['El termómetro estaba dañado.', 5, 'Busca por qué marcaba 96.'], ['El agua que faltaba desapareció.', 9, 'Busca adónde se fue.']), bien: 'Movimiento, altura y vapor.' },
      'Las partículas no cambian de tamaño, el termómetro servía y el agua se fue como vapor.', 'Busca la palabra clave de cada afirmación.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: HIELO, filas: [{ antes: 'Mientras se derretía, la temperatura', topes: ['subió', 'no cambió', 'bajó'], va: 1 }, { antes: 'Comparado con el agua, el hielo es', topes: ['más denso', 'igual de denso', 'menos denso'], va: 2 }, { antes: 'Más fuego a una sopa que hierve la', topes: ['evapora más rápido', 'calienta más', 'enfría'], va: 0 }], mira: ['Relee los seis minutos del párrafo 2.', 'Compara 9.2 con 10 gramos.', 'Relee el final del párrafo 3.'], luz: [[2, 'marcó 0 °C'], [6, '9.2 gramos'], [3, 'se evapore más rápido']], bien: 'Plano, flota y evapora.' },
      'La temperatura quedó en 0 °C, el hielo tiene menos masa en el mismo volumen y hervir más solo evapora.', 'Busca el dato de cada perilla antes de moverla.'),
    x('pista-tipo', 'Ata cada estado a cómo están sus partículas.', { doc: HIELO, lineas: ['Juntas, vibran en su sitio.', 'Se deslizan unas sobre otras.', 'Libres y muy separadas.', 'Unas en su sitio y otras deslizándose.'],
      ...T(['sólido', 0, '¿En cuál no cambian de lugar?'], ['líquido', 1, '¿En cuál toman la forma del vaso?'], ['gas', 2, '¿En cuál llenan todo el espacio?'], ['hielo derritiéndose', 3, '¿En cuál conviven dos estados?']), bien: 'Vibrar, deslizar y volar.' },
      'El sólido vibra, el líquido desliza, el gas se separa y al derretirse conviven dos estados.', 'Piensa qué tanto se pueden mover en cada caso.'),
    x('lee-escala', 'La gráfica muestra a qué temperatura hierve el agua en tres lugares (en °C). Pon cada una y la diferencia entre mar y páramo.', { vals: [100, 95, 85], rot: ['mar', 'pueblo', 'páramo'], hi: 100, st: 20, et: ['mar', 'pueblo', 'páramo', 'mar − páramo'], ops: ['', '', ''], metas: ['100', '95', '85', '15'], fichas: ['100', '95', '85', '15', '99', '81', '185'],
      mira: ['Mira en qué línea termina.', 'Está a tres cuartos del camino entre 80 y 100.', 'Está a un cuarto del camino entre 80 y 100.', 'Resta la del páramo a la del mar.'], trampas: { '1:99': 'Cada línea vale 20: tres cuartos son 15.', '2:81': 'Cada línea vale 20: un cuarto son 5.', '3:185': 'Eso es la suma.' }, ok: 'Más arriba, hierve a menos.' },
      'Las líneas van de 20 en 20: 100, 95 y 85. La diferencia es 15 °C.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    sol('Una piedra de 90 g ocupa 30 cm³. ¿Cuál es su densidad y qué pasa si se echa al agua (1 g/cm³)?', ['La densidad es $90 \\div 30 =$ [[3]] g/cm³', 'Es [[mayor]] que la del agua', 'Por eso la piedra se [[hunde]]'], ['2 700', 'menor', 'mantiene a flote'], 'Masa entre volumen: 3 g/cm³, más que el agua, así que se hunde.', 'Divide la masa entre el volumen y compara con 1.'),
    err('Alguien explica por qué una botella con agua llena y tapada se rompe en el congelador.', ['El agua se congela', 'Al congelarse ocupa más volumen', 'Porque su masa aumenta'], 2, ['Porque sus partículas quedan más separadas', 'Porque se vuelve más densa', 'Porque entra aire por la tapa'], 'La masa no cambia; el hielo ocupa más porque sus partículas quedan más separadas.', '¿De dónde saldría más masa si está tapada?'),
    opc('Se calientan 500 g de agua a nivel del mar hasta que hierve y se deja cinco minutos más con la llama al máximo. Al final, la temperatura del agua es:', ['Mayor de 100 °C, porque recibió más calor', '100 °C, y hay menos agua que al comienzo', '100 °C, y hay la misma cantidad de agua', 'Menor de 100 °C, porque se enfrió'], 1, 'Mientras hierve sigue a 100 °C; la energía extra la convierte en vapor, así que queda menos.', 'Recuerda en qué se usa la energía durante un cambio de estado.'),
  ]);

  const MEZCLA = {
    id: 'icf-balde', title: 'El balde revuelto',
    ficha: { autor: 'Profesor de química', fuente: 'Guía de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'En un balde cayeron, por accidente, agua, sal, arena, virutas de hierro y un chorro de aceite. La profesora no dejó botarlo. «Separarlo es un rompecabezas», dijo, «y las piezas son las propiedades».',
      'Una mezcla reúne sustancias que conservan sus propiedades. Si se ven partes distintas, como arena en agua, es heterogénea. Si se ve pareja, como agua con sal, es homogénea y se llama disolución: la sal es el soluto y el agua, el solvente. Un compuesto es otra cosa: en el agua, el hidrógeno y el oxígeno están unidos y no se separan con un colador.',
      'Primero pasaron un imán envuelto en plástico y salió el hierro, porque es magnético. Después dejaron quieto el balde: el aceite, menos denso y que no se mezcla con el agua, quedó arriba. Lo retiraron con un embudo de decantación, que deja salir primero el líquido de abajo.',
      'Luego vertieron el resto en un filtro de papel. La arena, que no se disuelve, quedó atrapada; el agua salada pasó, porque las partículas disueltas son mucho más pequeñas que los huecos del papel. Un estudiante propuso filtrar otra vez para sacar la sal. Filtraron tres veces: el agua siguió salada.',
      'Para separar la sal calentaron el agua. Al evaporarse, la sal quedó en el fondo. Como además querían recuperar el agua, enfriaron el vapor y lo recogieron: eso es destilar. La destilación también separa dos líquidos que hierven a distinta temperatura, como el alcohol, que hierve a 78 °C, y el agua.',
      'Pesaron todo al final. La suma de las partes dio casi lo mismo que el balde del comienzo; faltaban unos gramos, que se quedaron en el papel y en las paredes. Separar una mezcla no crea ni destruye nada: solo aprovecha que cada sustancia es distinta.',
    ],
  };
  const l2 = leccion('icf-cn-materia-2', 'Mezclas y separación', guion(
    ['Mezcla o compuesto', 'En una mezcla cada sustancia conserva sus propiedades; en un compuesto están unidas.'],
    ['Homogénea o heterogénea', 'Pareja o con partes visibles.'],
    ['La propiedad manda', 'Imán si es magnético, filtro si no se disuelve, decantar si flota, evaporar si hierve distinto.'],
    ['Nada se pierde', 'La masa total se conserva.']), [
    x('pasos-del-proceso', 'Ordena cómo separaron el balde. El primer paso está en su puesto.', { doc: MEZCLA, que: 'la separación', de: 'El balde revuelto', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Imán: sale el hierro.', 'Reposo y embudo: sale el aceite.', 'Filtro: queda la arena.', 'Calor: se evapora el agua.', 'La sal queda en el fondo.'], mira: ['', 'Se retira lo que flota antes de filtrar.', 'Se filtra cuando ya no hay aceite.', 'Se calienta lo que pasó por el papel.', 'Aparece cuando ya no hay agua.'], bien: 'Imán, embudo, filtro, calor y sal.' },
      'Primero el hierro, luego el aceite, después la arena y al final se evapora el agua y queda la sal.', 'Busca «Primero», «Después», «Luego» y «Para separar».'),
    x('voz-de-la-fuente', 'Ata cada método a la propiedad que aprovecha.', { ayuda: 'Tira un hilo desde cada propiedad hasta su método.', doc: MEZCLA, portadas: [['Imán', 'método'], ['Filtración', 'método'], ['Decantación', 'método'], ['Destilación', 'método']],
      ...T(['ser atraído', 0, '¿Cuál sirve para el hierro?'], ['no disolverse y tener granos grandes', 1, '¿Cuál sirve para la arena?'], ['distinta densidad', 2, '¿Cuál sirve para lo que flota?'], ['hervir a distinta temperatura', 3, '¿Cuál sirve para alcohol y agua?']), bien: 'Cada método, su propiedad.' },
      'El imán atrae, el filtro retiene granos, decantar usa la densidad y destilar, la ebullición.', 'Pregunta qué diferencia hay entre las dos sustancias.'),
    x('genero-o-cita', '¿La mezcla es **homogénea** o **heterogénea**?', { doc: MEZCLA, rot: ['homogénea', 'heterogénea'],
      ...F(['Agua con sal', 0, '¿Se ven partes distintas?'], ['Agua con arena', 1, '¿Se ven partes distintas?'], ['Aire limpio', 0, '¿Se ven partes distintas?'], ['Ensalada', 1, '¿Se ven partes distintas?'], ['Agua con aceite', 1, '¿Se ven partes distintas?']), bien: 'Pareja o con partes.' },
      'El agua salada y el aire se ven parejos; arena, ensalada y aceite muestran partes.', 'Imagínala en un vaso: ¿se ve igual en todas partes?'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MEZCLA, nums: [4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Filtrar diez veces tampoco sacaría la sal.', 1, '¿Por qué pasó el agua salada las tres veces?'], ['El alcohol hierve a 78 °C.', 0, 'Léela junto a la destilación.'], ['Al destilar, el alcohol sale antes que el agua.', 1, 'Compara las temperaturas a las que hierven.'], ['La arena pesaba 200 gramos.', 2, '¿Se dice cuánto pesaba?']),
      luz: [[4, 'el agua siguió salada'], [5, '78 °C']], bien: 'El tamaño y la temperatura deciden.' },
      'Los 78 °C están escritos; la sal y el orden de salida se deducen; el peso de la arena no aparece.', 'Usa la explicación del texto para ir un paso más.'),
    x('balanza-tesis', 'Afirmación: «la sal se destruye al disolverse». ¿Qué hace cada dato?', { doc: MEZCLA, tesis: 'La sal se destruye al disolverse',
      ...F(['Al evaporar el agua reaparece la sal.', 1, '¿Se había destruido?'], ['El agua sigue salada después de filtrar.', 1, '¿La sal sigue ahí?'], ['La masa del agua con sal es menor que la suma.', 0, 'Si fuera cierto, ¿faltaría algo?'], ['La sal es blanca.', 2, '¿Dice si sigue ahí?']), bien: 'Reaparece: no se destruyó.' },
      'Que reaparezca y que siga salada la debilitan; una masa menor la apoyaría; el color no pesa.', 'Piensa qué debería pasar si la sal dejara de existir.'),
    x('mayor-tramo', 'La gráfica muestra los gramos de sal que van quedando al evaporar agua de mar, en cuatro momentos. Toca el tramo que más creció **en porcentaje**.', { v: [8, 10, 15, 21] },
      'De 8 a 10 sube 25 %; de 10 a 15, 50 %; de 15 a 21, 40 %. El último sube más gramos, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('Se mezclan 180 g de agua y 20 g de sal. ¿Cuánto pesa la disolución y qué porcentaje es sal?', ['La disolución pesa $180 + 20 =$ [[200]] g', 'La sal es $20 \\div 200 =$ [[0.1]]', 'Es el [[10]] % de la masa'], ['160', '11', '20'], 'El porcentaje se calcula sobre toda la disolución: 10 %.', 'El total incluye también la sal.'),
    err('Se quiere separar una mezcla de arena, sal y agua y recuperar las tres.', ['Se filtra: la arena queda en el papel', 'Pasa el agua con sal', 'Se filtra otra vez con el mismo papel para sacar la sal', 'Se enfría el vapor para recuperar el agua'], 2, ['Se destila: se calienta para separar el agua de la sal', 'Se pasa un imán para sacar la sal', 'Se deja reposar hasta que la sal flote'], 'La sal disuelta pasa por el papel: hay que evaporar el agua y enfriar el vapor.', '¿Qué pasó cuando filtraron varias veces?'),
    opc('Para separar una mezcla de dos líquidos que se disuelven entre sí y hierven a 56 °C y 100 °C, el método más adecuado es:', ['Filtración', 'Destilación', 'Imantación', 'Decantación'], 1, 'Como forman una mezcla pareja y hierven a distinta temperatura, se destila.', 'Busca la propiedad en que se diferencian.'),
  ]);

  const AZUCAR = {
    id: 'icf-azucar', title: 'Cuánta azúcar cabe en un vaso',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Disolver no es derretir. Cuando el azúcar se disuelve, las partículas de agua rodean a las de azúcar y las reparten por todo el vaso. La azúcar sigue ahí: el agua queda dulce y la masa es la suma de las dos. La solubilidad dice cuánto soluto se puede disolver, como máximo, en cierta cantidad de solvente a una temperatura dada.',
      'El club midió la solubilidad del azúcar en 100 gramos de agua. A 20 °C se disolvieron 200 gramos; a 40 °C, 240; a 60 °C, 290; a 80 °C, 360. Con la sal de cocina repitieron la prueba: 36, 36.5, 37 y 38 gramos. La temperatura cambia mucho la solubilidad del azúcar y casi nada la de la sal.',
      'Si a 20 °C se agregan 250 gramos de azúcar, se disuelven 200 y quedan 50 en el fondo. La disolución está saturada: no admite más. Con menos de 200 estaría insaturada. Agitar o moler el azúcar hace que se disuelva más rápido, pero no que quepa más; para que quepa más hay que calentar o agregar agua.',
      'Calentaron la disolución con los 250 gramos hasta 60 °C: se disolvió todo. Luego la dejaron enfriar, quieta, hasta 20 °C. No apareció azúcar en el fondo. La disolución estaba sobresaturada, con más soluto del que corresponde. Bastó dejar caer un cristal para que el exceso se cristalizara en minutos.',
      'Con los gases ocurre al revés. El oxígeno se disuelve menos en agua caliente: en 1 litro a 10 °C caben unos 11 miligramos; a 30 °C, 7.5. Por eso los peces de un estanque sufren en los días de calor, y por eso una gaseosa tibia pierde rápido su gas.',
      'No todo se disuelve en todo. El agua, cuyas partículas tienen un lado positivo y otro negativo, disuelve bien la sal y el azúcar; el aceite, no. «Lo semejante disuelve a lo semejante», dicen los químicos. El jabón sirve porque tiene una punta que se lleva con el agua y otra que se lleva con la grasa.',
    ],
  };
  const l3 = leccion('icf-cn-materia-3', 'Solubilidad', guion(
    ['Disolver no es derretir', 'El soluto se reparte entre las partículas del solvente; la masa se conserva.'],
    ['Hasta cuánto', 'Solubilidad: lo máximo que cabe en cierta cantidad de solvente a una temperatura.'],
    ['Más rápido no es más', 'Agitar acelera; calentar (en muchos sólidos) aumenta lo que cabe.'],
    ['Gases', 'Al revés: en agua caliente cabe menos gas.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: AZUCAR,
      ...F(['¿Cuántos gramos se disolvieron a cada temperatura?', 1, 'Busca el comienzo que dice que se midió.'], ['¿Qué pasa con los gases?', 4, 'Busca el comienzo que los nombra.'], ['¿Por qué sirve el jabón?', 5, 'Busca el comienzo que dice que no todo se disuelve.']),
      luz: [[2, '240'], [5, 'El oxígeno se disuelve menos'], [6, 'El jabón sirve']], bien: 'Medidas, gases y semejanza.' },
      'Las medidas están en el 2, los gases en el 5 y el jabón en el 6.', 'Busca en los comienzos la palabra más cercana.'),
    x('genero-o-cita', '¿Hace que se disuelva **más rápido** o que **quepa más**?', { doc: AZUCAR, rot: ['más rápido', 'cabe más'],
      ...F(['Agitar con una cuchara', 0, '¿Cambia la cantidad máxima?'], ['Agregar más agua', 1, '¿Cambia la cantidad máxima?'], ['Moler el azúcar', 0, '¿Cambia la cantidad máxima?'], ['Pasar de 20 a 60 °C', 1, '¿Cambia la cantidad máxima?']), bien: 'Rapidez no es capacidad.' },
      'Agitar y moler aceleran; más agua y más temperatura (en el azúcar) permiten que quepa más.', 'Mira si al final se disuelve más o solo antes.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: AZUCAR, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'La temperatura casi no cambia la solubilidad de la sal.',
      ...T(['Disolver es lo mismo que derretir.', 0, 'Busca la oración más corta del comienzo.'], ['Agitar hace que quepa más azúcar.', 7, 'Busca qué logra agitar.'], ['El oxígeno se disuelve mejor en agua caliente.', 9, 'Busca qué pasa con el oxígeno al calentar.']), bien: 'Tres oraciones, tres desmentidos.' },
      'Disolver no es derretir, agitar solo acelera y el oxígeno se disuelve menos en agua caliente.', 'Saca la palabra clave: derretir, agitar, oxígeno.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: AZUCAR, filas: [{ antes: 'De 20 a 80 °C, la solubilidad del azúcar', topes: ['baja', 'no cambia', 'sube mucho'], va: 2 }, { antes: 'La de la sal', topes: ['casi no cambia', 'se duplica', 'llega a cero'], va: 0 }, { antes: 'A 20 °C, con 250 g de azúcar quedan sin disolver', topes: ['0 g', '50 g', '200 g'], va: 1 }], mira: ['Compara 200 con 360.', 'Compara 36 con 38.', 'Relee cuántos se disuelven a 20 °C.'], luz: [[2, 'a 80 °C, 360'], [2, '36, 36.5, 37 y 38'], [3, 'quedan 50 en el fondo']], bien: 'Sube mucho, casi no y sobran.' },
      'El azúcar pasa de 200 a 360; la sal, de 36 a 38; y a 20 °C sobran 50 gramos.', 'Compara el primer valor de cada serie con el último.'),
    x('pista-tipo', 'Ata cada nombre a su vaso (100 g de agua a 20 °C).', { doc: AZUCAR, lineas: ['150 g de azúcar, todo disuelto', '200 g de azúcar, todo disuelto', '250 g disueltos tras enfriar quieta', '250 g con 50 en el fondo'],
      ...T(['insaturada', 0, '¿En cuál todavía cabe más?'], ['justo saturada, sin sobrante', 1, '¿En cuál ya no cabe más y no sobra?'], ['sobresaturada', 2, '¿En cuál hay más de lo que corresponde, disuelto?'], ['saturada, con sobrante', 3, '¿En cuál sobra en el fondo?']), bien: 'El límite son 200 gramos.' },
      'Con menos de 200 cabe más; con 200 está justa; 250 disueltos pasan del límite; y el fondo muestra lo que sobra.', 'Compara lo disuelto en cada vaso con lo máximo que cabe.'),
    x('lee-escala', 'La gráfica muestra la solubilidad del azúcar a 20, 60 y 80 °C (en gramos). Pon cada valor y cuánto sube de 20 a 80 °C.', { vals: [200, 290, 360], rot: ['20 °C', '60 °C', '80 °C'], hi: 400, st: 80, et: ['20 °C', '60 °C', '80 °C', 'sube'], ops: ['', '', ''], metas: ['200', '290', '360', '160'], fichas: ['200', '290', '360', '160', '245', '325', '560'],
      mira: ['Está a mitad de camino entre 160 y 240.', 'Está entre 240 y 320, un poco más de la mitad.', 'Está a mitad de camino entre 320 y 400.', 'Resta la de 20 a la de 80.'], trampas: { '1:245': 'Cada línea vale 80: 5 sería muy poquito.', '2:325': 'Cada línea vale 80: la mitad son 40.', '3:560': 'Eso es la suma.' }, ok: 'A más temperatura, cabe más azúcar.' },
      'Las líneas van de 80 en 80: 200, 290 y 360. La diferencia es $360 - 200 = 160$ g.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('A 40 °C se disuelven hasta 240 g de azúcar en 100 g de agua. ¿Cuánto se disuelve en 50 g de agua, y cuánto queda en el fondo si se echan 150 g?', ['En la mitad del agua cabe la mitad: [[120]] g', 'Se echan 150 g: quedan $150 - 120 =$ [[30]] g en el fondo', 'La disolución está [[saturada]]'], ['240', '90', 'insaturada'], 'La solubilidad es proporcional al agua: 120 g; sobran 30.', 'Con la mitad del agua, ¿cuánto cabe?'),
    err('Alguien explica por qué una gaseosa tibia pierde su gas.', ['El gas está disuelto en el líquido', 'Al calentarse cabe más gas disuelto', 'Por eso se escapa'], 1, ['Al calentarse cabe menos gas disuelto', 'Al calentarse el gas se vuelve azúcar', 'Al calentarse el líquido se vuelve más denso'], 'En agua tibia cabe menos gas: lo que sobra se escapa.', 'Recuerda qué pasa con el oxígeno al calentar.'),
    opc('Un estudiante dice que 260 g de azúcar se disolverán por completo en 100 g de agua a 60 °C. Según los datos, su afirmación es:', ['Falsa, porque a 20 °C solo caben 200 g', 'Falsa, porque agitar no ayuda', 'Verdadera, porque la sal también se disuelve', 'Verdadera, porque a 60 °C caben hasta 290 g'], 3, 'A 60 °C caben hasta 290 g: 260 se disuelven todos.', 'Busca el límite a la temperatura que se pregunta.'),
  ]);

  const MAR = {
    id: 'icf-salina', title: 'De dónde sale la sal',
    paras: [
      'En las salinas, el agua de mar entra a piscinas anchas y poco profundas. El sol y el viento evaporan el agua; la sal, que no se evapora, queda en el fondo.',
      'Cien litros de agua de mar traen unos 3.5 kilogramos de sales, casi todas sal común. Una piscina de mil metros cuadrados recibe agua hasta una altura de veinte centímetros.',
      'Antes de la última piscina, el agua pasa por otras en las que se asientan la arena y el barro. Después de varios días, la disolución se satura y empiezan a formarse cristales.',
      'La sal cruda trae arcilla. Para limpiarla se disuelve otra vez, se filtra y se vuelve a evaporar.',
      'Cuando llueve, se pierde la cosecha: el agua dulce vuelve a disolver los cristales. Por eso las salinas están en lugares secos y con viento.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: MAR, ...p }, e, { hint: h });
  return mundo('icf-cn-materia', 'Materia y Mezclas', 'ciencias', [l1, l2, l3], [
    ['icf-cn-materia-1', 'Evaporar es un cambio físico: la sustancia es la misma.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué evapora el agua?', [1]], ['¿Cuánta sal trae el agua de mar?', [2]], ['¿Qué daña la cosecha?', [5]]] }, 'El sol y el viento están en el 1, la cantidad en el 2 y la lluvia en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-materia-1', 'El viento y el calor aceleran la evaporación.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['La sal no se evapora.', 0], ['Una piscina ancha evapora más que una honda con la misma agua.', 1], ['Mil litros traen unos 35 kg de sales.', 1], ['La sal es más cara que el azúcar.', 2]] }, 'La sal está escrita; la piscina ancha y los 35 kg se deducen; el precio no aparece.', 'Usa el dato de cien litros para hallar el de mil.')],
    ['icf-cn-materia-1', 'Al evaporarse, las partículas de agua se separan y pasan al aire.', opc('Cuando el agua de la piscina se evapora, sus partículas:', ['Se convierten en sal', 'Crecen hasta volverse gas', 'Se separan y pasan al aire, pero siguen siendo agua', 'Desaparecen'], 2, 'Es un cambio físico: la sustancia es la misma, con sus partículas separadas.', 'Recuerda qué cambia en un cambio de estado.')],
    ['icf-cn-materia-2', 'Cada método aprovecha una propiedad.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Lo que no se disuelve se separa dejando asentar o filtrando.', cards: [['Dejar reposar un río turbio en un tanque', true], ['Colar el café molido', true], ['Evaporar agua para obtener sal', false], ['Usar un imán para sacar clavos', false]] }, 'El barro y el café no se disuelven; evaporar y atraer usan otras propiedades.', 'Busca casos en que se separe algo sin disolver.')],
    ['icf-cn-materia-2', 'Para limpiar la sal se disuelve, se filtra y se evapora.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'Para limpiar la sal cruda se hace todo esto, EXCEPTO:', cards: [['Disolverla', [4]], ['Filtrarla', [4]], ['Evaporar el agua', [4]], ['Pasarle un imán', null]] }, 'Disolver, filtrar y evaporar están en el 4; el imán no aparece.', 'Busca cada paso en el párrafo de la limpieza.')],
    ['icf-cn-materia-2', 'La arcilla no se disuelve: queda en el filtro.', opc('Al disolver la sal cruda y filtrarla, en el papel queda:', ['La arcilla', 'La sal', 'El agua', 'Nada, porque todo pasa'], 0, 'La arcilla no se disuelve y no pasa por el papel; la sal disuelta, sí.', '¿Cuál de las sustancias no se disuelve?')],
    ['icf-cn-materia-3', 'Saturada: no admite más soluto.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [3, 5], options: ['Se asienta la arena, la disolución se satura y se forman cristales.', 'La lluvia disuelve de nuevo la sal.', 'Los cristales se forman antes de que se evapore el agua.', 'La lluvia aumenta la cosecha.'], key: [0, 1] }, 'El 3 cuenta la saturación; el 5, el efecto de la lluvia. Las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-materia-3', 'La lluvia agrega agua y vuelve a caber sal: cada párrafo cuenta una parte.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['explica la idea general', 'da cantidades', 'cuenta el paso por varias piscinas', 'explica cómo se limpia', 'explica el efecto de la lluvia', 'cuenta la historia de un pueblo'], key: [0, 1, 2, 3, 4] }, 'Idea, cantidades, piscinas, limpieza y lluvia; no hay historia del pueblo.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-materia-3', 'La solubilidad depende del agua que haya.', opc('Cuando llueve sobre los cristales, estos se disuelven de nuevo porque:', ['La lluvia está más caliente', 'El agua dulce que cae no está saturada y admite sal', 'La sal se evapora con la lluvia', 'La lluvia trae más sal'], 1, 'El agua nueva puede disolver sal: la disolución deja de estar saturada.', 'Piensa si al agua de lluvia le cabe sal.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-ecosistemas.js
// Preicfes · Ciencias Naturales · mundo 5 «Ecosistemas y Energía» (spec 2026-11-25-preicfes-estructura). Casos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const LAGUNA = {
    id: 'icf-laguna', title: 'Quién se come a quién en la laguna',
    ficha: { autor: 'Grupo ecológico escolar', fuente: 'Guía de campo', fecha: 'Febrero de 2026' },
    paras: [
      'En la laguna de Chircal, las algas y las plantas fabrican su alimento con la luz del sol: son productores. Los caracoles y los renacuajos comen algas: son consumidores primarios. Las mojarras se comen a los renacuajos: son consumidoras secundarias. La garza, que se come a las mojarras, es consumidora terciaria.',
      'La flecha de una cadena trófica va de quien es comido hacia quien come, porque muestra hacia dónde pasa la energía: alga → renacuajo → mojarra → garza. Varias cadenas que se cruzan forman una red. La garza también come caracoles; en esa cadena es consumidora secundaria.',
      'Los hongos y las bacterias descomponen hojas, heces y animales muertos. No están al final de la fila: reciben materia de todos los niveles y devuelven al agua nutrientes que las algas vuelven a usar. La materia da vueltas; la energía, no.',
      'El grupo calculó la energía de cada nivel por metro cuadrado al año: algas, 8 000 kilocalorías; consumidores primarios, 800; mojarras, 80; garzas, 8. De un nivel al siguiente pasa, más o menos, la décima parte. El resto se gasta en respirar, moverse y mantenerse vivos, y sale en forma de calor, o queda en partes que nadie se come.',
      'Por eso hay muchas algas y pocas garzas, y por eso las cadenas casi nunca tienen más de cinco eslabones: no queda energía para uno más. También por eso alimentar a una población con granos exige menos terreno que alimentarla con carne de animales que comieron granos.',
      'Un verano alguien soltó truchas que se comieron casi todos los renacuajos. Las algas, casi sin quien las comiera, cubrieron la laguna de verde. De noche, al respirar y descomponerse, gastaron el oxígeno, y en la mañana aparecieron mojarras muertas. Cambiar un solo eslabón movió toda la red.',
    ],
  };
  const l1 = leccion('icf-cn-ecosistemas-1', 'Cadenas y pirámides tróficas', guion(
    ['Niveles', 'Productores, consumidores primarios, secundarios, terciarios; y descomponedores.'],
    ['La flecha', 'Va hacia quien come: por ahí pasa la energía.'],
    ['La décima parte', 'De un nivel al siguiente pasa cerca del 10 %; el resto sale como calor o no se come.'],
    ['Una red', 'Cambiar un eslabón mueve a los demás.']), [
    x('pista-tipo', 'Ata cada nivel a su organismo en la cadena alga → renacuajo → mojarra → garza.', { doc: LAGUNA, lineas: ['alga', 'renacuajo', 'mojarra', 'garza'],
      ...T(['productor', 0, '¿Cuál fabrica su alimento con luz?'], ['consumidor primario', 1, '¿Cuál come productores?'], ['consumidor secundario', 2, '¿Cuál come al que come algas?'], ['consumidor terciario', 3, '¿Cuál está al final de esta cadena?']), bien: 'De la luz a la garza.' },
      'El alga produce, el renacuajo come algas, la mojarra lo come y la garza cierra la cadena.', 'Sigue la flecha desde el organismo que usa la luz.'),
    x('genero-o-cita', '¿Es la **materia** o la **energía** de la laguna?', { doc: LAGUNA, rot: ['la materia', 'la energía'],
      ...F(['Da vueltas y se vuelve a usar', 0, '¿Cuál reciclan los hongos?'], ['Entra con la luz y sale como calor', 1, '¿Cuál se va y no regresa?'], ['Los nutrientes que las algas toman otra vez', 0, '¿Son sustancias o algo que se pierde en calor?'], ['Pasa a otro nivel cerca de la décima parte', 1, '¿Qué midieron en kilocalorías?']), bien: 'Una circula, la otra pasa.' },
      'Los nutrientes circulan; la energía entra con la luz, pasa en parte y sale como calor.', 'Relee el final del párrafo 3 y piensa en el calor.'),
    x('mayor-tramo', 'La gráfica cuenta garzas en cuatro años. Toca el tramo en que más crecieron **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %. El último suma más garzas, no más porcentaje.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: LAGUNA, nums: [2, 3, 4], pregunta: 'Queda en pie', queda: 'La garza puede ocupar dos niveles distintos.',
      ...T(['La flecha va hacia quien es comido.', 0, 'Busca hacia dónde apunta la flecha.'], ['Los hongos solo reciben materia de las garzas.', [3, 4], 'Busca de qué niveles reciben.'], ['Casi toda la energía pasa al nivel siguiente.', [6, 7, 8], 'Busca qué parte pasa.']), bien: 'Flecha, hongos y décima parte.' },
      'La flecha va hacia quien come, los hongos reciben de todos y pasa cerca de la décima parte.', 'Saca la palabra clave: flecha, hongos, energía.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestra el texto.', { doc: LAGUNA, filas: [{ antes: 'Sin renacuajos, las algas', topes: ['disminuyeron', 'aumentaron', 'no cambiaron'], va: 1 }, { antes: 'De algas a primarios pasó', topes: ['la mitad', 'todo', 'la décima parte'], va: 2 }, { antes: 'Las mojarras murieron por falta de', topes: ['oxígeno', 'agua', 'luz'], va: 0 }], mira: ['Relee qué pasó sin quien las comiera.', 'Compara 8 000 con 800.', 'Relee lo que ocurrió de noche.'], luz: [[6, 'cubrieron la laguna de verde'], [4, 'la décima parte'], [6, 'gastaron el oxígeno']], bien: 'Más algas, un décimo y sin oxígeno.' },
      'Las algas aumentaron, pasó la décima parte y faltó oxígeno.', 'Busca el dato de cada perilla antes de moverla.'),
    x('lee-escala', 'La gráfica muestra la masa de tres niveles de otra laguna (en kg). Pon cada una y cuánto **más** pesan los productores que los primarios.', { vals: [180, 45, 15], rot: ['productores', 'primarios', 'secundarios'], hi: 200, st: 40, et: ['productores', 'primarios', 'secundarios', 'más'], ops: ['', '', ''], metas: ['180', '45', '15', '135'], fichas: ['180', '45', '15', '135', '165', '20', '225'],
      mira: ['Está a mitad de camino entre 160 y 200.', 'Está un poco por encima de 40.', 'Está por debajo de la mitad del primer tramo.', 'Resta los primarios a los productores.'], trampas: { '0:165': 'Cada línea vale 40: la mitad son 20.', '2:20': 'Eso sería justo la mitad del primer tramo.', '3:225': 'Eso es la suma.' }, ok: 'Abajo hay mucho más que arriba.' },
      'Las líneas van de 40 en 40: 180, 45 y 15. La diferencia es $180 - 45 = 135$ kg.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('En un pastizal, los productores tienen 50 000 kcal. Si a cada nivel pasa la décima parte, ¿cuánto llega al consumidor terciario?', ['Al primario llegan [[5 000]] kcal', 'Al secundario, [[500]] kcal', 'Al terciario, [[50]] kcal'], ['10 000', '5', '25 000'], 'Se toma la décima parte tres veces.', 'Cuenta los niveles: son tres pasos.'),
    err('Alguien explica por qué hay pocas águilas en un bosque.', ['El águila está en el último nivel', 'A cada nivel pasa parte de la energía', 'El águila recibe toda la energía de las plantas'], 2, ['Al águila le llega muy poca de la energía de las plantas', 'El águila fabrica su energía con la luz', 'El águila devuelve la energía a las plantas'], 'En cada nivel se pierde casi todo: al último llega muy poca.', '¿Qué parte pasa en cada nivel?'),
    opc('Un insecticida que no se degrada se acumula en los organismos. La mayor concentración se espera en:', ['Las algas', 'Los renacuajos', 'Las garzas, que comen muchos organismos contaminados', 'El agua'], 2, 'Cada nivel come muchos del anterior y guarda lo que no se degrada: arriba se concentra.', 'Piensa cuántas mojarras come una garza y cuántos renacuajos comió cada mojarra.'),
  ]);

  const CICLO = {
    id: 'icf-compost', title: 'El cuaderno del compost',
    ficha: { autor: 'Huerta escolar', fuente: 'Cuaderno de observación', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos de la Tierra son casi siempre los mismos: lo que cambia es dónde están y con quién se juntan. El carbono que hoy está en una hoja estuvo ayer en el aire. A ese ir y venir entre los seres vivos, el aire, el agua y el suelo se le llama ciclo.',
      'En el ciclo del carbono, las plantas toman dióxido de carbono del aire y, con agua y luz, fabrican azúcares y liberan oxígeno: es la fotosíntesis. Plantas, animales, hongos y bacterias usan esos azúcares y devuelven dióxido de carbono al aire: es la respiración. Quemar leña, carbón o gasolina también lo devuelve, pero mucho más rápido, y desde depósitos que tardaron millones de años en formarse.',
      'El nitrógeno es casi cuatro quintas partes del aire y, sin embargo, las plantas no pueden usarlo así. Necesitan que ciertas bacterias, muchas de ellas en las raíces del fríjol y otras leguminosas, lo conviertan en formas que se disuelven en el suelo. Otras bacterias hacen lo contrario y lo regresan al aire.',
      'La huerta hizo una prueba. En la cama A sembró maíz; en la B, maíz con fríjol; en la C, maíz con abono químico. Las tres recibieron la misma agua y la misma luz. A los tres meses, las matas medían en promedio 140, 168 y 175 centímetros. En el agua que escurrió de C había nueve veces los nitratos de A; en la de B, casi los mismos de A.',
      'Ese exceso llega a la quebrada y alimenta las algas, que crecen sin control; al morir, las bacterias que las descomponen consumen el oxígeno. La cama B creció casi lo mismo que C sin ese problema: el nitrógeno del fríjol se va soltando despacio.',
      'Con los restos de la cosecha hicieron compost. Los descomponedores calentaron la pila hasta 58 °C: era su respiración. La masa bajó de 40 a 22 kilogramos. No se destruyó: casi todo lo que falta se fue al aire como dióxido de carbono y vapor de agua.',
    ],
  };
  const l2 = leccion('icf-cn-ecosistemas-2', 'Ciclos de la materia', guion(
    ['La materia circula', 'Los mismos átomos pasan por aire, agua, suelo y seres vivos.'],
    ['Carbono', 'La fotosíntesis lo toma del aire; la respiración y la quema lo devuelven.'],
    ['Nitrógeno', 'Las bacterias lo vuelven útil para las plantas.'],
    ['Exceso', 'Demasiados nutrientes en el agua acaban con el oxígeno.']), [
    x('genero-o-cita', '¿**Toma** dióxido de carbono del aire o lo **devuelve**?', { doc: CICLO, rot: ['lo toma', 'lo devuelve'],
      ...F(['La fotosíntesis del maíz', 0, '¿Qué usa la planta para hacer azúcar?'], ['La respiración de un hongo', 1, '¿Qué sale al usar azúcares?'], ['Quemar gasolina', 1, '¿Qué sale por el exhosto?'], ['La pila de compost caliente', 1, '¿Qué están haciendo los descomponedores?']), bien: 'Una lo guarda, las otras lo sueltan.' },
      'Solo la fotosíntesis lo toma; respirar, quemar y descomponer lo devuelven.', 'Pregunta si se fabrica azúcar o si se gasta.'),
    x('pasos-del-proceso', 'Ordena cómo un exceso de abono deja sin oxígeno una quebrada. El primer paso está en su puesto.', { doc: CICLO, que: 'la cadena', de: 'Del abono a la quebrada', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Sobran nitratos en el suelo.', 'El agua los lleva a la quebrada.', 'Las algas crecen sin control.', 'Mueren y las bacterias las descomponen.', 'Se agota el oxígeno.'], mira: ['', 'Llegan con el agua que escurre.', 'Crecen cuando ya tienen nutrientes.', 'Se descomponen después de morir.', 'Es el resultado final.'], bien: 'Sobra, escurre, crece, muere y falta.' },
      'Los nitratos escurren, las algas crecen, mueren, se descomponen y se agota el oxígeno.', 'Sigue el párrafo 5 de la primera palabra a la última.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: CICLO, portadas: [['Cama A', 'experimento'], ['Qué se siembra o abona', 'experimento'], ['Altura de las matas', 'experimento'], ['Agua y luz', 'experimento']],
      ...T(['el control', 0, '¿Con cuál se comparan las otras?'], ['lo que se cambió', 1, '¿Qué es distinto entre las camas?'], ['lo que se midió', 2, '¿Qué se anotó a los tres meses?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron las tres por igual?']), bien: 'Control, cambio, medida e igualdad.' },
      'A es el control, se cambió lo sembrado o abonado, se midió la altura y agua y luz fueron iguales.', 'Relee el párrafo que cuenta la prueba de las camas.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CICLO, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las matas de C midieron en promedio 175 cm.', 0, 'Léela junto a los datos.'], ['El fríjol ayudó al maíz a crecer.', 1, 'Compara A con B.'], ['Unos 18 kg de la pila pasaron al aire, sobre todo.', 1, 'Compara la masa de antes y la de después.'], ['El fríjol de B dio más cosecha que el maíz.', 2, '¿Se midió la cosecha?']),
      luz: [[4, '140, 168 y 175'], [6, 'de 40 a 22 kilogramos']], bien: 'Comparar y restar.' },
      'Los 175 están escritos; la ayuda del fríjol y los 18 kg se deducen; la cosecha no se midió.', 'Haz la comparación o la resta con los datos.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica **cómo** llega el nitrógeno a las plantas.', { doc: CICLO, nums: [3], apuesta: 'Ciertas bacterias lo vuelven útil.', ...S(['3.1'], { '3.0': 'Dice que está en el aire y que así no sirve.', '3.2': 'Dice cómo vuelve al aire.' }), bien: 'Bacterias en la raíz.' },
      'La segunda oración dice que las bacterias lo convierten en formas que se disuelven.', 'Busca la oración donde algo se convierte en otra cosa útil.'),
    x('mayor-tramo', 'La gráfica muestra la altura (en cm) de una mata de maíz en cuatro semanas. Toca el tramo que más creció **en porcentaje**.', { v: [16, 20, 30, 42] },
      'De 16 a 20 crece 25 %; de 20 a 30, 50 %; de 30 a 42, 40 %. El último crece más centímetros, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('En la prueba, A midió 140 cm, B 168 y C 175. ¿Cuánto más creció B que A, en porcentaje, y cuánto le faltó para igualar a C?', ['B creció $168 - 140 =$ [[28]] cm más', 'Comparado con los 140 de A es un [[20]] % más', 'Le faltaron [[7]] cm para igualar a C'], ['35', '25', '17'], '28 de 140 son el 20 %; $175 - 168 = 7$.', 'El porcentaje se calcula sobre la altura de A.'),
    err('Alguien explica la pérdida de masa del compost.', ['Los descomponedores respiran', 'Al respirar usan los azúcares', 'La materia que falta se destruyó'], 2, ['La materia que falta se fue, sobre todo, como dióxido de carbono y vapor', 'La materia que falta se volvió energía de la luz', 'La materia que falta se volvió nitrógeno del fríjol'], 'La materia no se destruye: salió al aire.', '¿Puede desaparecer la materia en un ciclo?'),
    opc('Para reducir los nitratos que llegan a la quebrada sin perder mucho crecimiento del maíz, la huerta debería:', ['Doblar el abono químico', 'Sembrar maíz con fríjol', 'Quitar toda el agua', 'Sembrar solo maíz'], 1, 'B creció casi lo mismo que C sin el exceso de nitratos.', 'Compara las alturas y lo que escurre de cada cama.'),
  ]);

  const ISLA = {
    id: 'icf-parejas', title: 'Vecinos obligados',
    ficha: { autor: 'Reserva natural «El Roble»', fuente: 'Cartilla para visitantes', fecha: 'Abril de 2026' },
    paras: [
      'Ninguna especie vive sola. En un mismo árbol de la reserva se cruzan al menos cinco maneras de convivir, y se distinguen por una pregunta: ¿quién gana, quién pierde y a quién le da igual?',
      'En el mutualismo ganan los dos. El colibrí toma néctar y lleva polen de una flor a otra. Los hongos de las raíces le dan agua y minerales al roble y reciben azúcares. En el comensalismo uno gana y al otro le da igual: una bromelia se apoya en una rama alta para recibir luz sin quitarle nada al árbol.',
      'En el parasitismo uno gana y el otro pierde, casi siempre sin morir de inmediato. El muérdago hunde sus raíces en la rama y le roba savia. En la depredación el que gana mata: el gavilán caza ratones. La competencia es distinta: pierden los dos, porque gastan energía disputando lo mismo, como dos aves que buscan el mismo hueco para anidar.',
      'Los depredadores y sus presas suben y bajan juntos, con un poco de retraso. La reserva contó cada año ratones y gavilanes: 400 y 8; 700 y 10; 500 y 18; 250 y 12. Cuando hay muchos ratones, los gavilanes crían más; cuando hay muchos gavilanes, los ratones disminuyen; y entonces los gavilanes, sin comida, también.',
      'Todo lugar tiene un límite. La capacidad de carga es el número de individuos que un ambiente puede sostener con su comida, su agua y su espacio. Una población que la supera agota los recursos y baja.',
      'Hace cinco años llegó una rana de otro país. No tenía depredadores en la reserva y comía los mismos insectos que las ranas de aquí. Hoy, de cada diez ranas que se oyen de noche, siete son las nuevas. Es una especie invasora: no por ser extranjera, sino por crecer desplazando a las demás. La reserva no propone acabarlas de golpe, porque ya hay culebras que se alimentan de ellas.',
    ],
  };
  const l3 = leccion('icf-cn-ecosistemas-3', 'Relaciones entre especies', guion(
    ['La pregunta', '¿Quién gana, quién pierde y a quién le da igual?'],
    ['Nombres', 'Mutualismo, comensalismo, parasitismo, depredación y competencia.'],
    ['Suben y bajan', 'Presas y depredadores se siguen con retraso.'],
    ['Límite e invasoras', 'La capacidad de carga y las especies que desplazan a otras.']), [
    x('pinta-tipos', 'Pinta cada caso con su relación.', { doc: ISLA, plumas: ['mutualismo', 'comensalismo', 'parasitismo'],
      ...P(['El colibrí lleva polen y toma néctar.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El muérdago roba savia.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['La bromelia se apoya en la rama.', 1, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El hongo da minerales y recibe azúcares.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['Una garrapata chupa sangre de un perro.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?']), bien: 'Gana-gana, gana-igual y gana-pierde.' },
      'Colibrí y hongo: ganan los dos; bromelia: al árbol le da igual; muérdago y garrapata: el otro pierde.', 'Di qué le pasa a cada uno de los dos seres vivos.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: ISLA,
      ...F(['¿Cuántos gavilanes se contaron?', 3, 'Busca el comienzo que nombra depredadores.'], ['¿Qué es la capacidad de carga?', 4, 'Busca el comienzo que habla de un límite.'], ['¿Cuándo llegó la rana?', 5, 'Busca el comienzo que habla de años.']),
      luz: [[4, '400 y 8'], [5, 'La capacidad de carga'], [6, 'Hace cinco años']], bien: 'Conteo, límite y llegada.' },
      'El conteo está en el 4, el límite en el 5 y la rana en el 6.', 'Lee solo los comienzos de los párrafos y decide.'),
    x('balanza-tesis', 'Afirmación: «la rana nueva desplaza a las de aquí». ¿Qué hace cada dato?', { doc: ISLA, tesis: 'La rana nueva desplaza a las de aquí',
      ...F(['Comen los mismos insectos.', 0, '¿Compiten por algo?'], ['Siete de cada diez que se oyen son nuevas.', 0, '¿Quién domina hoy?'], ['El número de ranas de aquí no ha bajado.', 1, '¿Las desplazó de verdad?'], ['La rana nueva es verde clara.', 2, '¿Cambia quién desplaza?']), bien: 'Comer lo mismo apoya; si no bajan, no.' },
      'Competir y ser mayoría la apoyan; que no bajaran la debilitaría; el color no pesa.', 'Pregunta si el dato muestra que las otras pierden algo.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ISLA, filas: [{ antes: 'Después de que hubo más ratones, los gavilanes', topes: ['bajaron', 'subieron', 'no cambiaron'], va: 1 }, { antes: 'Una especie es invasora por', topes: ['venir de lejos', 'ser fea', 'crecer desplazando'], va: 2 }, { antes: 'En la competencia', topes: ['pierden los dos', 'ganan los dos', 'gana uno siempre'], va: 0 }], mira: ['Compara 10 con 18.', 'Busca «no por… sino por».', 'Relee el final del párrafo 3.'], luz: [[4, '500 y 18'], [6, 'crecer desplazando'], [3, 'pierden los dos']], bien: 'Suben después, desplazan y pierden.' },
      'Los gavilanes subieron al año siguiente, invade quien desplaza y en la competencia pierden los dos.', 'Busca en el texto el dato de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ISLA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'Una población que supera el límite baja.',
      ...T(['El parásito mata siempre de inmediato.', 0, 'Busca qué le pasa al que pierde.'], ['Toda especie extranjera es invasora.', 10, 'Busca por qué es invasora.'], ['La reserva quiere acabar ya las ranas nuevas.', 11, 'Busca qué no propone la reserva.']), bien: 'Casi siempre, sino y no propone.' },
      'El parásito casi nunca mata enseguida, invade quien desplaza y la reserva no las acaba de golpe.', 'Saca la palabra clave: parásito, extranjera, reserva.'),
    x('lee-escala', 'La gráfica muestra los ratones de tres años de otra reserva. Pon cada valor y cuántos **menos** hay en el tercero que en el segundo.', { vals: [350, 600, 200], rot: ['año 1', 'año 2', 'año 3'], hi: 800, st: 200, et: ['año 1', 'año 2', 'año 3', 'menos'], ops: ['', '', ''], metas: ['350', '600', '200', '400'], fichas: ['350', '600', '200', '400', '300', '250', '800'],
      mira: ['Está a tres cuartos del camino entre 200 y 400.', 'Mira en qué línea termina.', 'Mira en qué línea termina.', 'Resta el año 3 al año 2.'], trampas: { '0:300': 'Pasa de la mitad del tramo.', '0:250': 'Eso es un cuarto del tramo.', '3:800': 'Eso es la suma.' }, ok: 'Sube y baja.' },
      'Las líneas van de 200 en 200: 350, 600 y 200. Hay $600 - 200 = 400$ menos.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    sol('Un potrero puede sostener 4 vacas por hectárea. Tiene 15 hectáreas y hoy hay 72 vacas. ¿Cuántas sobran?', ['La capacidad de carga es $4 \\cdot 15 =$ [[60]] vacas', 'De las 72 que hay, sobran [[12]]', 'Si siguen así, el pasto se [[agota]]'], ['19', '132', 'recupera'], 'La capacidad es 60; sobran 12 y el pasto se agota.', 'Multiplica lo que aguanta una hectárea por las que hay.'),
    err('Alguien clasifica la relación entre una abeja y una flor.', ['La abeja toma néctar', 'La flor recibe polen de otra flor', 'Como la abeja se lleva algo, es parasitismo'], 2, ['Como ganan las dos, es mutualismo', 'Como a la flor le da igual, es comensalismo', 'Como compiten, es competencia'], 'La abeja se alimenta y la flor se poliniza: mutualismo.', '¿La flor pierde o gana?'),
    opc('Si una enfermedad acaba con la mayoría de los ratones, lo más probable a corto plazo es que los gavilanes:', ['Aumenten, porque hay más espacio', 'No cambien, porque comen plantas', 'Se vuelvan productores', 'Disminuyan o busquen otra presa'], 3, 'Sin su alimento, bajan o cambian de presa.', 'Mira qué pasa con los gavilanes cuando hay pocos ratones.'),
  ]);

  const BOSQUE = {
    id: 'icf-lobos', title: 'El regreso de las dantas',
    paras: [
      'La danta es el mamífero terrestre más grande de nuestras selvas. Come hojas y frutos y, al caminar, reparte las semillas en sus heces, a veces a varios kilómetros.',
      'En un bosque donde desaparecieron por la caza, los árboles de semilla grande dejaron de nacer lejos de sus padres. Los brotes, apiñados, competían por la luz y casi todos morían.',
      'Hace diez años soltaron quince dantas con collar de rastreo. Hoy son treinta y dos. En las parcelas que visitan hay cinco veces más brotes de semilla grande que en las que no.',
      'Las heces también alimentan a escarabajos que entierran el abono y airean el suelo. Los escarabajos son comida de aves y ranas.',
      'El bosque tiene espacio y frutos para unas cuarenta dantas. Los guardias calculan que se llegará a ese número en pocos años y que después la población se mantendrá cerca de él.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BOSQUE, ...p }, e, { hint: h });
  return mundo('icf-cn-ecosistemas', 'Ecosistemas y Energía', 'ciencias', [l1, l2, l3], [
    ['icf-cn-ecosistemas-1', 'La danta come hojas y frutos: es consumidora primaria.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué come la danta?', [1]], ['¿Cuántas dantas hay hoy?', [3]], ['¿Quién come escarabajos?', [4]]] }, 'La dieta está en el 1, el número en el 3 y los escarabajos en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-ecosistemas-1', 'Una cadena sigue a quien come a quien.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Los escarabajos son comida de aves.', 0], ['Con más dantas, las ranas pueden tener más comida.', 1], ['Las dantas tienen collar de rastreo.', 0], ['Las ranas comen semillas.', 2]] }, 'Aves y collar están escritos; lo de las ranas se deduce por los escarabajos; las semillas no.', 'Sigue la cadena: danta, heces, escarabajo, rana.')],
    ['icf-cn-ecosistemas-1', 'Los consumidores primarios comen productores.', opc('En este bosque, la danta ocupa el nivel de:', ['Productor', 'Consumidor secundario', 'Consumidor primario', 'Descomponedor'], 2, 'Come hojas y frutos: se alimenta de productores.', 'Mira de qué se alimenta la danta.')],
    ['icf-cn-ecosistemas-2', 'El abono devuelve materia al suelo.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Los restos de unos seres vuelven al suelo y sirven a otros.', cards: [['Hojas secas que se pudren y abonan un árbol', true], ['Estiércol que fertiliza un cultivo', true], ['La luz del sol que calienta una piedra', false], ['El agua que se evapora de un charco', false]] }, 'Hojas y estiércol devuelven materia; la piedra y el charco no son restos de seres vivos.', 'Busca restos de seres vivos que otro aprovecha.')],
    ['icf-cn-ecosistemas-2', 'Enterrar el abono mantiene los nutrientes en el suelo.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 5], options: ['Las heces alimentan escarabajos que mejoran el suelo.', 'El bosque sostiene a unas cuarenta dantas.', 'Los escarabajos dañan el suelo.', 'La población crecerá sin parar.'], key: [0, 1] }, 'El 4 habla de los escarabajos y el 5 del límite; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-ecosistemas-2', 'La materia circula: lo que uno desecha, otro lo usa.', opc('Los escarabajos ayudan al ciclo de la materia porque:', ['Crean nutrientes de la nada', 'Hacen fotosíntesis', 'Destruyen el carbono', 'Llevan al suelo los nutrientes de las heces'], 3, 'Entierran las heces y sus nutrientes quedan disponibles.', 'Piensa adónde va el abono.')],
    ['icf-cn-ecosistemas-3', 'Los brotes apiñados compiten por la luz.', pl('intruso-excepto', 'La opción que no corresponde a la danta', { ask: 'Según el texto, las dantas hacen todo esto, EXCEPTO:', cards: [['Comer frutos', [1]], ['Repartir semillas', [1]], ['Alimentar escarabajos', [4]], ['Cazar ranas', null]] }, 'Comer, repartir y alimentar están en el texto; cazar ranas no.', 'Busca cada acción en el texto.')],
    ['icf-cn-ecosistemas-3', 'Capacidad de carga: cuántos sostiene el lugar.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al animal', 'cuenta qué pasó sin él', 'muestra datos del regreso', 'sigue otro efecto en la red', 'explica hasta dónde crecerá', 'enseña a cazar dantas'], key: [0, 1, 2, 3, 4] }, 'Presenta, cuenta la ausencia, da datos, sigue la red y explica el límite.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-ecosistemas-3', 'Cerca del límite, la población deja de crecer.', opc('Los guardias esperan que la población se mantenga cerca de cuarenta porque:', ['Las dantas dejan de respirar', 'Es la capacidad de carga del bosque', 'Los collares lo impiden', 'Las ranas se las comen'], 1, 'El bosque tiene espacio y frutos para unas cuarenta.', 'Relee el último párrafo.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-energia.js
// Preicfes · Ciencias Naturales · mundo 6 «Energía y Calor» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const PISTA = {
    id: 'icf-pista', title: 'La pista de canicas',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'La energía no se ve: se nota en lo que puede hacer. Un cuerpo que se mueve tiene energía cinética: depende de su masa y del cuadrado de su velocidad. Uno que está en alto tiene energía potencial gravitatoria: depende de su masa, de la gravedad y de la altura. A la suma de las dos se le llama energía mecánica.',
      'El curso soltó una canica de 100 gramos desde una rampa de 80 centímetros de alto. Arriba, quieta, toda su energía era potencial: 0.8 julios, tomando la gravedad como 10. Al bajar, la altura disminuye y la velocidad crece: la potencial se convierte en cinética.',
      'Si nada frenara a la canica, la suma sería siempre 0.8 julios. A mitad de la altura habría 0.4 de potencial y 0.4 de cinética; abajo, 0.8 de cinética, y, sin contar el giro, la velocidad sería de 4 metros por segundo. En la otra rampa subiría de nuevo hasta 80 centímetros.',
      'Midieron. Abajo la velocidad fue de 3.7 metros por segundo y la canica subió solo 60 centímetros en la otra rampa. Faltaba energía. No había desaparecido: el roce había calentado un poquito la pista y la canica, y parte se había ido en sonido. La energía total se conserva; la mecánica, solo si no hay roce.',
      'Repitieron con una canica de 200 gramos, desde la misma altura. Tenía el doble de energía, pero llegó abajo con la misma velocidad. Al chocar con un taco de madera, sin embargo, lo empujó el doble de distancia. La masa no cambia la rapidez de la caída; cambia lo que la energía puede hacer.',
      'Por último soltaron la canica desde el doble de altura. Abajo no llegó con el doble de velocidad, sino con cerca de 1.4 veces. Como la energía cinética va con el cuadrado de la velocidad, duplicarla exige menos que duplicar la rapidez. Por eso un carro que va al doble de velocidad necesita unas cuatro veces la distancia para frenar.',
    ],
  };
  const l1 = leccion('icf-cn-energia-1', 'Energía mecánica', guion(
    ['Cinética y potencial', 'Movimiento y altura. Su suma es la energía mecánica.'],
    ['Se transforma', 'Al bajar, la potencial se vuelve cinética; al subir, al revés.'],
    ['Se conserva', 'Sin roce, la suma no cambia; con roce, una parte pasa a calor y sonido.'],
    ['El cuadrado', 'El doble de velocidad es cuatro veces la energía cinética.']), [
    x('genero-o-cita', '¿Qué energía tiene **más**: potencial o cinética?', { doc: PISTA, rot: ['potencial', 'cinética'],
      ...F(['La canica quieta, arriba', 0, '¿Está en alto o se mueve rápido?'], ['La canica al pasar por abajo', 1, '¿Está en alto o se mueve rápido?'], ['Un columpio en el punto más alto', 0, '¿Está en alto o se mueve rápido?'], ['Una flecha que pasa a ras del suelo', 1, '¿Está en alto o se mueve rápido?']), bien: 'Altura o movimiento.' },
      'Quieta arriba y en lo alto del columpio, potencial; abajo y a ras, cinética.', 'Pregunta si lo que la tiene es la altura o el movimiento.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PISTA, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'Con roce, la energía mecánica disminuye.',
      ...T(['La energía que faltaba desapareció.', [3, 4], 'Busca adónde se fue.'], ['La canica pesada cae más rápido.', [6, 8], 'Busca con qué velocidad llegó.'], ['Con el doble de altura, el doble de velocidad.', [10, 11], 'Busca cuánto creció la velocidad.']), bien: 'Calor, misma rapidez y 1.4.' },
      'Se fue en calor y sonido, la masa no cambia la rapidez y la velocidad creció 1.4 veces.', 'Saca la palabra clave: desapareció, pesada, doble.'),
    x('voz-de-la-fuente', 'Ata cada momento a su energía, si no hay roce.', { ayuda: 'Tira un hilo desde cada reparto hasta su momento.', doc: PISTA, portadas: [['Arriba', 'momento'], ['A la mitad', 'momento'], ['Abajo', 'momento'], ['En la otra rampa, al parar', 'momento']],
      ...T(['0.8 J de potencial, al soltarla', 0, '¿Cuándo está quieta al comienzo?'], ['0.4 J y 0.4 J', 1, '¿Cuándo están repartidas?'], ['0.8 J de cinética', 2, '¿Cuándo va más rápido?'], ['otra vez 0.8 J de potencial', 3, '¿Cuándo vuelve a quedar quieta?']), bien: 'La suma siempre es 0.8.' },
      'Arriba toda es potencial, a la mitad se reparte, abajo toda es cinética y al parar vuelve a ser potencial.', 'En cada momento, las dos deben sumar 0.8 julios.'),
    x('lee-escala', 'La gráfica muestra la energía (en mJ) de otra canica en tres momentos. Pon cada valor y cuánta se **perdió** del inicio al final.', { vals: [500, 450, 350], rot: ['inicio', 'mitad', 'final'], hi: 600, st: 100, et: ['inicio', 'mitad', 'final', 'se perdió'], ops: ['', '', ''], metas: ['500', '450', '350', '150'], fichas: ['500', '450', '350', '150', '405', '305', '850'],
      mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre 400 y 500.', 'Está a mitad de camino entre 300 y 400.', 'Resta la final a la inicial.'], trampas: { '1:405': 'Cada línea vale 100: la mitad son 50.', '2:305': 'Cada línea vale 100: la mitad son 50.', '3:850': 'Eso es la suma.' }, ok: 'El roce la convierte en calor.' },
      'Las líneas van de 100 en 100: 500, 450 y 350. Se perdieron $500 - 350 = 150$ mJ.', 'Mira cuánto vale cada línea antes de leer.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: PISTA, filas: [{ antes: 'En la otra rampa subió', topes: ['80 cm', 'más de 80 cm', '60 cm'], va: 2 }, { antes: 'Con doble masa, la velocidad abajo fue', topes: ['el doble', 'la misma', 'la mitad'], va: 1 }, { antes: 'La energía total', topes: ['se conserva', 'se pierde', 'se crea'], va: 0 }], mira: ['Relee lo que midieron.', 'Relee la segunda prueba.', 'Relee el final del párrafo 4.'], luz: [[4, 'subió solo 60 centímetros'], [5, 'con la misma velocidad'], [4, 'La energía total se conserva']], bien: 'Menos altura, igual rapidez, total constante.' },
      'Subió 60 cm, la velocidad fue la misma y la energía total se conserva.', 'Busca el dato de cada perilla antes de moverla.'),
    x('mayor-tramo', 'La gráfica muestra la velocidad (en dm/s) de un carrito en cuatro momentos. Toca el tramo que más creció **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    sol('Un bloque de 2 kg se suelta desde 5 m. Sin roce y con gravedad 10, ¿qué energía tiene y con qué rapidez llega?', ['Energía potencial: $2 \\cdot 10 \\cdot 5 =$ [[100]] J', 'Abajo toda es [[cinética]]', '$\\tfrac12 \\cdot 2 \\cdot v^2$ iguala ese valor: $v =$ [[10]] m/s'], ['50', 'potencial', '20'], 'La cinética de abajo vale 100 J: $v^2 = 100$ y llega a 10 m/s.', 'Iguala la energía de arriba con la de abajo.'),
    err('Un carro pasa de 20 a 40 km/h. ¿Qué pasa con su energía cinética?', ['La velocidad se duplica', 'La energía va con el cuadrado de la velocidad', 'La energía se duplica'], 2, ['La energía se multiplica por 4', 'La energía no cambia', 'La energía se multiplica por 20'], 'La velocidad se multiplica por 2 y la energía, por $2^2 = 4$.', 'Aplica el cuadrado al factor 2.'),
    opc('Un péndulo se suelta desde cierta altura y, sin roce, sube al otro lado:', ['Más alto, porque toma impulso', 'Hasta la misma altura', 'La mitad, porque se cansa', 'No sube'], 1, 'La energía mecánica se conserva: llega a la misma altura.', 'Si no hay roce, la suma de energías no cambia.'),
  ]);

  const CAFE = {
    id: 'icf-termo', title: 'Tres vasos de café',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Temperatura y calor no son lo mismo. La temperatura dice qué tanto se mueven, en promedio, las partículas de un cuerpo. El calor es energía que pasa de un cuerpo más caliente a uno más frío. Un lago tibio tiene menos temperatura que una taza de café hirviendo, pero muchísima más energía en sus partículas.',
      'El calor viaja de tres maneras. Por conducción, de partícula en partícula, como en una cuchara metida en la sopa. Por convección, cuando un líquido o un gas caliente sube y el frío baja. Por radiación, en ondas que no necesitan materia: así llega el calor del Sol.',
      'El grupo sirvió café a 80 °C en tres vasos iguales de tamaño: uno de metal, uno de vidrio y uno de icopor, todos con la misma tapa. El salón estaba a 20 °C. A los diez minutos midieron 52, 61 y 72 grados. A la hora, el de metal estaba casi a 20, el de vidrio a 26 y el de icopor a 45.',
      'El metal es buen conductor: deja pasar el calor con rapidez. El icopor es aislante, porque está lleno de aire quieto. Por eso, aunque los tres vasos llevan horas en el mismo salón y tienen la misma temperatura, el de metal se siente más frío al tocarlo: se lleva más rápido el calor de la mano.',
      'Al final, si se espera lo suficiente, todos llegan a 20 grados: es el equilibrio térmico. El calor deja de pasar cuando las temperaturas se igualan. Nunca pasa «frío»: lo que sentimos como frío es calor que sale de nosotros.',
      'No todo se calienta con la misma facilidad. Para subir un grado a un kilo de agua se necesitan unos 4 200 julios; a un kilo de arena, unos 800. A esa cantidad se le llama calor específico. Por eso en la playa, a mediodía, la arena quema y el mar no; y por la noche la arena se enfría primero.',
    ],
  };
  const l2 = leccion('icf-cn-energia-2', 'Calor y temperatura', guion(
    ['No son lo mismo', 'Temperatura: qué tanto se mueven las partículas. Calor: energía que pasa.'],
    ['Tres caminos', 'Conducción, convección y radiación.'],
    ['Equilibrio', 'El calor pasa hasta que las temperaturas se igualan.'],
    ['Calor específico', 'El agua necesita mucho calor para subir un grado.']), [
    x('pinta-tipos', 'Pinta cada caso con la manera en que viaja el calor.', { doc: CAFE, plumas: ['conducción', 'convección', 'radiación'],
      ...P(['Una cuchara se calienta en la sopa.', 0, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['El aire caliente sube en un cuarto.', 1, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['El Sol calienta la cara.', 2, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['Las brasas calientan la mano puesta a un lado.', 2, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['La baldosa enfría el pie descalzo.', 0, '¿Pasa por contacto, por un fluido que se mueve o en ondas?']), bien: 'Contacto, fluido y ondas.' },
      'Cuchara y baldosa por contacto, el aire sube por convección y Sol y brasas por radiación.', 'Mira si hay contacto, un fluido que se mueve o nada en medio.'),
    x('genero-o-cita', '¿Se habla de **calor** o de **temperatura**?', { doc: CAFE, rot: ['calor', 'temperatura'],
      ...F(['Lo que marca el termómetro', 1, '¿Se mide en grados?'], ['Energía que pasa a lo más frío', 0, '¿Es algo que pasa o algo que se tiene?'], ['Qué tanto se mueven las partículas', 1, '¿Es un promedio o una energía que pasa?'], ['Los 4 200 julios para un kilo de agua', 0, '¿En qué unidad se mide?']), bien: 'Grados o julios.' },
      'El termómetro y el movimiento promedio son temperatura; la energía que pasa, calor.', 'Los grados miden una; los julios miden la otra.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CAFE, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El salón estaba a 20 °C.', 0, 'Léela junto al experimento.'], ['En diez minutos, el de metal perdió más grados.', 1, 'Compara 80 con cada medida.'], ['El icopor es más barato que el metal.', 2, '¿Se habla de precios?'], ['Con el mismo calor, un kilo de arena sube más grados que uno de agua.', 1, 'Compara 800 con 4 200.']),
      luz: [[3, 'El salón estaba a 20'], [3, '52, 61 y 72'], [6, 'unos 800']], bien: 'Restar y comparar.' },
      'Los 20 están escritos; lo del metal y lo de la arena se deducen; el precio no.', 'Haz las restas de grados y compara los julios.'),
    x('lee-escala', 'La gráfica muestra la temperatura (en °C) a los diez minutos de tres recipientes nuevos. Pon cada una y la diferencia entre la mayor y la menor.', { vals: [75, 60, 45], rot: ['termo', 'barro', 'lata'], hi: 80, st: 20, et: ['termo', 'barro', 'lata', 'diferencia'], ops: ['', '', ''], metas: ['75', '60', '45', '30'], fichas: ['75', '60', '45', '30', '63', '41', '120'],
      mira: ['Está a tres cuartos del camino entre 60 y 80.', 'Mira en qué línea termina.', 'Está a un cuarto del camino entre 40 y 60.', 'Resta la menor a la mayor.'], trampas: { '0:63': 'Cada línea vale 20: tres cuartos son 15.', '2:41': 'Cada línea vale 20: un cuarto son 5.', '3:120': 'Eso es la suma de dos.' }, ok: 'El termo conserva mejor.' },
      'Las líneas van de 20 en 20: 75, 60 y 45. La diferencia es $75 - 45 = 30$ °C.', 'Mira qué parte del tramo alcanza cada barra.'),
    x('balanza-tesis', 'Afirmación: «el icopor conserva mejor el calor». ¿Qué hace cada dato?', { doc: CAFE, tesis: 'El icopor conserva mejor el calor',
      ...F(['A la hora, su café estaba a 45 y los otros por debajo de 30.', 0, '¿Cuál quedó más caliente?'], ['Solo el vaso de icopor tenía tapa.', 1, 'Si fuera cierto, ¿sería por el material?'], ['Los tres vasos tenían la misma tapa.', 0, '¿La comparación es justa?'], ['El café era de la sierra.', 2, '¿Cambia el material del vaso?']), bien: 'Comparar cambiando una sola cosa.' },
      'Los 45 grados y la misma tapa la apoyan; una tapa solo en uno la debilitaría; el origen no pesa.', 'Pregunta si lo único distinto era el material.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que explica por qué el metal **se siente** más frío.', { doc: CAFE, nums: [4], apuesta: 'Se lleva más rápido el calor de la mano.', ...S(['4.2'], { '4.0': 'Dice cómo es el metal, sin hablar de la mano.', '4.1': 'Habla del icopor.' }), bien: 'Misma temperatura, distinta rapidez.' },
      'La tercera oración une las dos cosas: misma temperatura, pero el metal se lleva más rápido el calor.', 'Busca la oración que habla de lo que siente la mano.'),
    sol('Se mezclan 1 kg de agua a 20 °C y 1 kg de agua a 60 °C, sin perder calor. ¿A qué temperatura quedan?', ['El agua caliente [[cede]] calor a la otra', 'Como hay igual masa, quedan a [[40]] °C', 'Cada una cambió [[20]] grados'], ['recibe', '80', '30'], 'Masas iguales de agua: el punto medio, 40 °C.', 'La que está más caliente es la que da.'),
    err('Alguien explica por qué una cobija abriga.', ['El cuerpo está más caliente que el aire', 'El calor pasa del cuerpo al aire', 'La cobija produce calor'], 2, ['La cobija hace que el calor salga más despacio', 'La cobija enfría el aire', 'La cobija deja entrar frío al cuerpo'], 'La cobija es aislante: frena la salida del calor.', '¿De dónde sale el calor: de la cobija o del cuerpo?'),
    opc('A mediodía la arena está a 50 °C y el mar a 27 °C. La mejor explicación es que:', ['El Sol calienta solo la arena', 'El mar refleja toda la luz', 'El agua necesita más calor para subir cada grado', 'La arena está más cerca del Sol'], 2, 'El calor específico del agua es mayor: con el mismo calor sube menos.', 'Compara los julios que pide cada kilo.'),
  ]);

  const SOLAR = {
    id: 'icf-horno', title: 'El horno de la vereda',
    paras: [
      'En una vereda sin gas, los estudiantes construyeron un horno solar: una caja negra por dentro, con tapa de vidrio y paredes rellenas de papel arrugado.',
      'La luz del Sol atraviesa el vidrio y el negro la absorbe. El interior se calienta; el vidrio deja salir poco calor y el aire quieto del papel lo retiene.',
      'Un día despejado midieron: a las diez, 35 °C; a las once, 60; a las doce, 85; a la una, 95. Un huevo tardó cuarenta minutos en cocerse.',
      'Pintaron de blanco otra caja igual. A la una marcaba 52 °C: el blanco refleja gran parte de la luz.',
      'En un día nublado, la caja negra llegó a 50 °C. De noche, sin Sol, se enfrió más despacio que una olla de metal puesta al lado.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: SOLAR, ...p }, e, { hint: h });
  return mundo('icf-cn-energia', 'Energía y Calor', 'ciencias', [l1, l2], [
    ['icf-cn-energia-1', 'La energía se transforma: luz en calor.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Con qué rellenaron las paredes?', [1]], ['¿Cuánto tardó el huevo?', [3]], ['¿Qué pasó en un día nublado?', [5]]] }, 'El relleno está en el 1, el huevo en el 3 y el nublado en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-energia-1', 'Nada se crea: la energía del horno viene del Sol.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El negro absorbe la luz.', 0], ['Sin Sol el horno no cocina.', 1], ['La caja blanca se calentó menos que la negra.', 1], ['El vidrio es irrompible.', 2]] }, 'El negro está escrito; lo de la noche y la comparación se deducen; el vidrio no.', 'Compara 95 con 52 y piensa en la noche.')],
    ['icf-cn-energia-1', 'En el horno, energía luminosa se convierte en térmica.', opc('La transformación de energía que ocurre dentro del horno es:', ['De calor a luz', 'De movimiento a altura', 'De luz a calor', 'De sonido a luz'], 2, 'El negro absorbe la luz y se calienta.', 'Mira qué entra por el vidrio y qué se siente adentro.')],
    ['icf-cn-energia-2', 'Aire quieto: buen aislante.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'El aire quieto retiene el calor.', cards: [['Plumas esponjadas de un pájaro con frío', true], ['Ventana de doble vidrio', true], ['Un ventilador que mueve el aire', false], ['Una cuchara de metal en la sopa', false]] }, 'Plumas y doble vidrio guardan aire quieto; el ventilador lo mueve y el metal conduce.', 'Busca dónde hay aire que no se mueve.')],
    ['icf-cn-energia-2', 'El color cambia cuánta radiación se absorbe.', pl('intruso-excepto', 'La opción que no ayuda a calentar el horno', { ask: 'Todo esto ayuda a que el horno se caliente, EXCEPTO:', cards: [['La tapa de vidrio', [2]], ['El interior negro', [2]], ['El papel de las paredes', [2]], ['Pintarlo de blanco', null]] }, 'Vidrio, negro y papel ayudan; el blanco refleja la luz.', 'Busca lo que hace cada parte en el texto.')],
    ['icf-cn-energia-2', 'Los aislantes frenan el paso del calor.', opc('De noche la caja se enfría más despacio que la olla porque:', ['La caja produce calor', 'El papel con aire quieto frena la salida del calor', 'El metal atrae el frío', 'La Luna la calienta'], 1, 'El aire quieto es aislante; el metal conduce.', 'Compara el material de las dos.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-atomo.js
// Preicfes · Ciencias Naturales · mundo 7 «Átomo y Enlaces» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const ATOMO = {
    id: 'icf-atomo', title: 'La casa vacía de la materia',
    ficha: { autor: 'Profesora de química', fuente: 'Guía de décimo grado', fecha: 'Febrero de 2026' },
    paras: [
      'Todo lo que tocas está hecho de átomos. Cada átomo tiene un núcleo diminuto, con protones, de carga positiva, y neutrones, sin carga. Alrededor se mueven los electrones, de carga negativa y casi dos mil veces más livianos que un protón. Si el núcleo fuera una canica en el centro de un estadio, los electrones andarían por las gradas. En medio no hay nada.',
      'El número de protones se llama número atómico y decide qué elemento es: con 6 protones es carbono; con 7, nitrógeno. No importa lo demás. El número de masa suma protones y neutrones. Un átomo neutro tiene tantos electrones como protones.',
      'Dos átomos del mismo elemento pueden tener distinto número de neutrones: son isótopos. El carbono 12 tiene 6 neutrones y el carbono 14 tiene 8. Químicamente se comportan casi igual. El carbono 14 es inestable: con el tiempo se transforma y emite radiación, y por eso sirve para calcular la edad de restos antiguos.',
      'Un átomo que gana o pierde electrones se vuelve un ion. El sodio pierde uno con facilidad y queda con carga +1: 11 protones y 10 electrones. El cloro gana uno y queda con carga −1. Al formarse un ion cambian los electrones; el núcleo no, así que sigue siendo el mismo elemento.',
      'La tabla periódica ordena los elementos por su número atómico. Las columnas son grupos: los elementos de un mismo grupo tienen igual número de electrones en su última capa y por eso se parecen. Las filas son periodos. Al bajar por un grupo, los átomos son más grandes, porque tienen más capas; al avanzar por un periodo, en general, son más pequeños, porque el núcleo atrae con más fuerza.',
      'A la izquierda y en el centro están los metales, que tienden a perder electrones; a la derecha, los no metales, que tienden a ganarlos. Los gases nobles, en la última columna, tienen completa su última capa y casi no reaccionan. El modelo también ha cambiado: Dalton imaginó esferas; Thomson descubrió el electrón; Rutherford, el núcleo; Bohr propuso niveles de energía.',
    ],
  };
  const l1 = leccion('icf-cn-atomo-1', 'El átomo y la tabla periódica', guion(
    ['Tres partículas', 'Protones y neutrones en el núcleo; electrones alrededor.'],
    ['¿Qué elemento es?', 'Lo decide el número de protones. Isótopo: otros neutrones. Ion: otros electrones.'],
    ['La tabla', 'Grupos que se parecen y periodos que avanzan.'],
    ['Tamaño', 'Crece al bajar y, en general, disminuye al avanzar.']), [
    x('pinta-tipos', 'Pinta cada dato con su partícula.', { doc: ATOMO, plumas: ['protón', 'neutrón', 'electrón'],
      ...P(['Decide qué elemento es.', 0, '¿Cuál da el número atómico?'], ['Está en el núcleo y no tiene carga.', 1, '¿Cuál es neutro?'], ['Es casi dos mil veces más liviano.', 2, '¿Cuál pesa menos?'], ['Cambia de número en un isótopo.', 1, '¿Qué distingue al carbono 12 del 14?'], ['Se gana o se pierde al formar un ion.', 2, '¿Qué cambia al volverse ion?']), bien: 'Identidad, masa y carga.' },
      'El protón decide, el neutrón distingue isótopos y el electrón forma iones.', 'Relee los párrafos 2, 3 y 4: cada uno habla de una.'),
    x('genero-o-cita', '¿Es un **isótopo** o un **ion** del átomo neutro?', { doc: ATOMO, rot: ['isótopo', 'ion'],
      ...F(['Carbono con 8 neutrones', 0, '¿Cambian los neutrones o los electrones?'], ['Sodio con 10 electrones', 1, '¿Cambian los neutrones o los electrones?'], ['Cloro que ganó un electrón', 1, '¿Cambian los neutrones o los electrones?'], ['Hidrógeno con un neutrón más', 0, '¿Cambian los neutrones o los electrones?']), bien: 'Neutrones o electrones.' },
      'El carbono y el hidrógeno cambian neutrones; el sodio y el cloro, electrones.', 'Mira qué partícula es distinta de la del átomo neutro.'),
    x('lee-escala', 'La gráfica muestra el radio (en picómetros) de tres átomos de un mismo grupo. Pon cada uno y cuánto **más** mide el tercero que el primero.', { vals: [150, 190, 230], rot: ['litio', 'sodio', 'potasio'], hi: 240, st: 40, et: ['litio', 'sodio', 'potasio', 'más'], ops: ['', '', ''], metas: ['150', '190', '230', '80'], fichas: ['150', '190', '230', '80', '143', '195', '380'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a tres cuartos del camino entre 160 y 200.', 'Está a tres cuartos del camino entre 200 y 240.', 'Resta el primero al tercero.'], trampas: { '0:143': 'Cada línea vale 40: tres cuartos son 30.', '1:195': 'Cada línea vale 40: tres cuartos son 30.', '3:380': 'Eso es una suma.' }, ok: 'Al bajar por el grupo, crecen.' },
      'Las líneas van de 40 en 40: 150, 190 y 230. La diferencia es $230 - 150 = 80$ pm.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ATOMO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Los elementos de un grupo se parecen.',
      ...T(['El número de neutrones decide qué elemento es.', [0, 1], 'Busca cuál número lo decide.'], ['Al volverse ion, cambia el elemento.', 7, 'Busca qué no cambia.'], ['Al bajar por un grupo los átomos son más pequeños.', 11, 'Busca cómo cambia el tamaño.']), bien: 'Protones, mismo elemento y más grandes.' },
      'Deciden los protones, el núcleo no cambia y al bajar son más grandes.', 'Saca la palabra clave: neutrones, ion, bajar.'),
    x('voz-de-la-fuente', 'Ata cada idea al científico.', { ayuda: 'Tira un hilo desde cada idea hasta su autor.', doc: ATOMO, portadas: [['Dalton', 'modelo'], ['Thomson', 'modelo'], ['Rutherford', 'modelo'], ['Bohr', 'modelo']],
      ...T(['esferas', 0, '¿Quién las imaginó?'], ['el electrón', 1, '¿Quién lo descubrió?'], ['el núcleo', 2, '¿Quién lo descubrió?'], ['niveles de energía', 3, '¿Quién los propuso?']), bien: 'Un modelo se corrige con otro.' },
      'Dalton esferas, Thomson electrón, Rutherford núcleo y Bohr niveles.', 'Relee la última oración del texto: nombra a los cuatro.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ATOMO, filas: [{ antes: 'Entre el núcleo y los electrones hay', topes: ['aire', 'neutrones', 'nada'], va: 2 }, { antes: 'Los gases nobles', topes: ['reaccionan mucho', 'casi no reaccionan', 'son metales'], va: 1 }, { antes: 'Los metales tienden a', topes: ['perder electrones', 'ganar electrones', 'ganar protones'], va: 0 }], mira: ['Relee la comparación del estadio.', 'Relee la última columna.', 'Relee dónde están los metales.'], luz: [[1, 'En medio no hay nada'], [6, 'casi no reaccionan'], [6, 'tienden a perder electrones']], bien: 'Vacío, estables y pierden.' },
      'En medio no hay nada, los nobles casi no reaccionan y los metales pierden electrones.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('Un átomo neutro tiene número atómico 17 y número de masa 35. ¿Cuántas partículas tiene de cada clase?', ['Protones: [[17]]', 'Neutrones: [[18]]', 'Si gana un electrón, queda con [[18]] electrones', 'Su carga será [[−1]]'], ['35', '16', '+1'], 'Protones 17; neutrones $35 - 17 = 18$; con un electrón más, 18 y carga $-1$.', 'El número de masa suma protones y neutrones.'),
    err('Alguien explica qué es el carbono 14.', ['Tiene 6 protones, como todo carbono', 'Su número de masa es 14', 'Por eso tiene 14 neutrones'], 2, ['Por eso tiene 8 neutrones', 'Por eso tiene 14 electrones', 'Por eso tiene 14 protones'], '$14 - 6 = 8$ neutrones: la masa suma los dos.', 'Resta los protones al número de masa.'),
    opc('Dos elementos de un mismo grupo de la tabla se parecen químicamente porque tienen:', ['El mismo número de protones', 'El mismo número de capas', 'Los mismos electrones en la última capa', 'La misma masa'], 2, 'Los electrones de la última capa deciden cómo reaccionan.', 'Piensa qué comparten los de una columna.'),
  ]);

  const ENLACE = {
    id: 'icf-enlace', title: 'Cuatro polvos sin nombre',
    ficha: { autor: 'Grupo de laboratorio', fuente: 'Bitácora de química', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos se unen porque juntos quedan más estables. La mayoría busca completar ocho electrones en su última capa. Hay tres maneras principales de lograrlo y cada una deja su huella en las propiedades de la sustancia.',
      'En el enlace iónico, un metal le entrega electrones a un no metal. Quedan iones de cargas opuestas que se atraen y forman una red ordenada. Por eso las sales son duras, se funden a temperaturas altas y, disueltas o fundidas, conducen la electricidad: sus iones pueden moverse. Sólidas no la conducen, porque los iones están fijos.',
      'En el enlace covalente, dos no metales comparten electrones. Si los comparten por igual, como en el oxígeno del aire, el enlace es apolar. Si uno atrae más, como el oxígeno en el agua, queda un lado un poco negativo y otro un poco positivo: es polar. Muchas sustancias covalentes se funden a temperaturas bajas y no conducen.',
      'En el enlace metálico, los átomos sueltan sus electrones más externos, que se mueven por toda la pieza como un mar. Eso explica que los metales conduzcan bien la electricidad y el calor, y que se puedan doblar sin romperse.',
      'El grupo recibió cuatro polvos o granos sin nombre y los probó. A se fundió a 801 °C, se disolvió en agua y su disolución encendió el bombillo. B se fundió a 186 °C, se disolvió y no lo encendió. C no se disolvió en agua, se fundió a 63 °C y no condujo. D no se disolvió, brillaba, y encendió el bombillo estando sólido.',
      'Con la tabla de la profesora los identificaron: sal, azúcar, parafina y limadura de aluminio. Nadie los probó con la lengua. No fue solo por seguridad: las propiedades que se miden dicen más que el sabor. El color, en cambio, no ayudó: tres eran blancos y solo el enlace los distinguía.',
    ],
  };
  const l2 = leccion('icf-cn-atomo-2', 'Tipos de enlace', guion(
    ['Iónico', 'Un metal entrega electrones a un no metal: sales.'],
    ['Covalente', 'Dos no metales comparten: por igual (apolar) o no (polar).'],
    ['Metálico', 'Electrones sueltos, como un mar.'],
    ['Propiedades', 'El enlace se nota en la fusión, la disolución y la electricidad.']), [
    x('pinta-tipos', 'Pinta cada caso con su enlace.', { doc: ENLACE, plumas: ['iónico', 'covalente', 'metálico'],
      ...P(['Un metal entrega electrones a un no metal.', 0, '¿Se entregan, se comparten o se sueltan?'], ['Dos no metales comparten.', 1, '¿Se entregan, se comparten o se sueltan?'], ['Electrones como un mar.', 2, '¿Se entregan, se comparten o se sueltan?'], ['El agua.', 1, '¿De qué son sus átomos: metales o no metales?'], ['El cobre de un cable.', 2, '¿Es un metal solo?']), bien: 'Entregar, compartir o soltar.' },
      'Entregar es iónico, compartir covalente y soltar metálico; el agua es covalente y el cobre, metálico.', 'Pregunta qué pasa con los electrones en cada caso.'),
    x('pista-tipo', 'Ata cada polvo a su sustancia.', { doc: ENLACE, lineas: ['A: 801 °C, conduce disuelta', 'B: 186 °C, se disuelve, no conduce', 'C: 63 °C, no se disuelve', 'D: brilla y conduce sólida'],
      ...T(['sal', 0, '¿Cuál tiene iones?'], ['azúcar', 1, '¿Cuál se disuelve sin iones?'], ['parafina', 2, '¿Cuál se funde primero?'], ['aluminio', 3, '¿Cuál es metal?']), bien: 'La propiedad delata el enlace.' },
      'La sal conduce disuelta, el azúcar no, la parafina no se disuelve y el aluminio brilla y conduce.', 'Usa juntos la temperatura de fusión y el bombillo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ENLACE, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'La sal disuelta conduce la electricidad.',
      ...T(['La sal sólida conduce.', 3, 'Busca por qué no lo hace.'], ['En el agua los electrones se comparten por igual.', 6, 'Busca quién atrae más.'], ['El color permitió identificarlos.', 11, 'Busca qué no ayudó.']), bien: 'Fijos, polar y no ayudó.' },
      'Los iones están fijos, el oxígeno atrae más y el color no ayudó.', 'Saca la palabra clave: sólida, agua, color.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ENLACE, nums: [2, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El polvo A se fundió a 801 °C.', 0, 'Léela junto a los datos.'], ['Al disolver B no se forman iones.', 1, '¿Por qué no encendió el bombillo?'], ['Si se funde A, encendería el bombillo.', 1, '¿Qué pasa con los iones de una sal fundida?'], ['C es más barato que D.', 2, '¿Se habla de precios?']),
      luz: [[5, 'A se fundió a 801'], [5, 'no lo encendió'], [2, 'fundidas']], bien: 'Sin iones que se muevan, no conduce.' },
      'Los 801 están escritos; que B no forma iones y que A fundida conduce se deducen; el precio no.', 'Usa la regla de los iones para explicar el bombillo.'),
    x('mayor-tramo', 'La gráfica muestra los gramos de una sal que se disuelven en el mismo vaso de agua a cuatro temperaturas. Toca el tramo en que más crece **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Hipótesis: «este polvo es una sal». ¿Qué hace cada dato?', { doc: ENLACE, tesis: 'Este polvo es una sal',
      ...F(['Se funde a 770 °C y disuelto conduce.', 0, '¿Se parece a A?'], ['Conduce estando sólido.', 1, '¿Los iones fijos conducen?'], ['Se funde a 60 °C.', 1, '¿Las sales se funden tan bajo?'], ['Es blanco.', 2, '¿El color decide?']), bien: 'Fusión y electricidad, no color.' },
      'Fundirse alto y conducir disuelto la apoya; conducir sólido o fundirse a 60 la debilita; el color no pesa.', 'Compara cada dato con lo que hizo el polvo A.'),
    sol('El magnesio pierde 2 electrones y el cloro gana 1. ¿Qué compuesto forman?', ['El magnesio queda con carga [[+2]]', 'Cada cloro queda con carga [[−1]]', 'Para que la suma dé cero hacen falta [[2]] cloros', 'El enlace es [[iónico]]'], ['+1', '1', 'covalente'], 'Dos cloros de $-1$ compensan un magnesio de $+2$: $MgCl_2$.', 'Las cargas deben sumar cero.'),
    err('Alguien explica por qué se dobla un alambre de cobre.', ['El cobre tiene enlace metálico', 'Sus electrones forman un mar', 'Como sus iones están fijos, se rompe al doblarlo'], 2, ['Como el mar de electrones se acomoda, las capas se deslizan sin romperse', 'Como comparte electrones por parejas, se vuelve líquido', 'Como no tiene electrones, se estira'], 'El mar de electrones mantiene unida la pieza al deslizarse.', '¿Qué hace el mar de electrones cuando se mueve una capa?'),
    opc('Una sustancia no conduce sólida, se funde a 850 °C y, fundida, conduce. Su enlace es:', ['Iónico', 'Covalente apolar', 'Metálico', 'Covalente polar'], 0, 'Iones fijos en el sólido y móviles al fundirse: iónico.', 'Compara con lo que hace la sal.')]);

  const FUEGO = {
    id: 'icf-pirotecnia', title: 'Los colores de la pólvora',
    paras: [
      'Cada color de un fuego artificial viene de un metal: el sodio da amarillo; el cobre, verde azulado; el estroncio, rojo; el bario, verde.',
      'Al calentarse, los electrones del átomo suben a niveles de mayor energía. Cuando regresan, sueltan esa energía en forma de luz.',
      'Como cada elemento tiene sus propios niveles, cada uno emite sus propios colores: son como una huella digital. Así se sabe de qué están hechas las estrellas.',
      'Los metales se usan en forma de sales, porque son más estables y fáciles de manejar que el metal puro. El sodio puro, por ejemplo, reacciona con violencia con el agua.',
      'El helio se descubrió así: en 1868 se vio en la luz del Sol un color que no correspondía a ningún elemento conocido. Décadas después se encontró en la Tierra.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: FUEGO, ...p }, e, { hint: h });
  return mundo('icf-cn-atomo', 'Átomo y Enlaces', 'ciencias', [l1, l2], [
    ['icf-cn-atomo-1', 'Cada elemento tiene sus propios niveles de energía.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué metal da el rojo?', [1]], ['¿Por qué se emite luz?', [2]], ['¿Cómo se descubrió el helio?', [5]]] }, 'El rojo está en el 1, la luz en el 2 y el helio en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-atomo-1', 'La luz emitida identifica al elemento.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El sodio da amarillo.', 0], ['La luz de una estrella permite saber si tiene sodio.', 1], ['Con la luz se podría saber qué metal lleva un cohete.', 1], ['El bario es el metal más caro.', 2]] }, 'El sodio está escrito; la estrella y el cohete se deducen; el precio no.', 'Une los párrafos 1 y 3.')],
    ['icf-cn-atomo-1', 'Los electrones suben y bajan de nivel.', opc('La luz de un fuego artificial se produce cuando los electrones:', ['Salen del núcleo', 'Regresan a un nivel de menor energía', 'Se vuelven protones', 'Se detienen'], 1, 'Al regresar sueltan energía en forma de luz.', 'Relee qué pasa cuando regresan.')],
    ['icf-cn-atomo-2', 'Las sales son compuestos iónicos, más estables que el metal.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Un elemento se comporta distinto solo que unido a otros.', cards: [['El cloro es tóxico, pero en la sal se come', true], ['El sodio reacciona con agua, la sal no', true], ['El agua caliente se enfría', false], ['Un cable se dobla', false]] }, 'Cloro y sodio cambian al unirse; enfriarse y doblarse no cambian la sustancia.', 'Busca casos en que el elemento está solo y luego unido.')],
    ['icf-cn-atomo-2', 'Metal con no metal: enlace iónico.', pl('intruso-excepto', 'La opción que no es razón para usar sales', { ask: 'Se usan sales en la pólvora por todo esto, EXCEPTO:', cards: [['Son más estables', [4]], ['Son más fáciles de manejar', [4]], ['El metal puro puede ser peligroso', [4]], ['Apagan los colores', null]] }, 'Las tres primeras están en el párrafo 4; los colores no se apagan.', 'Busca cada razón en el párrafo de las sales.')],
    ['icf-cn-atomo-2', 'En una sal, el metal entrega electrones.', opc('En el cloruro de estroncio, el estroncio (metal) y el cloro (no metal) se unen porque:', ['Comparten electrones por igual', 'Sueltan un mar de electrones', 'No tienen electrones', 'El metal entrega electrones al no metal'], 3, 'Metal con no metal: enlace iónico.', 'Pregunta qué hace un metal frente a un no metal.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-herencia.js
// Preicfes · Ciencias Naturales · mundo 8 «Herencia y Evolución» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const CONEJOS = {
    id: 'icf-conejos', title: 'Los conejos de la profesora',
    ficha: { autor: 'Colegio agrícola', fuente: 'Cuaderno de cruces', fecha: 'Febrero de 2026' },
    paras: [
      'Un gen es un tramo de ADN con información para una característica. Cada gen puede tener versiones distintas, llamadas alelos. Una coneja recibe dos alelos de cada gen: uno de la madre y otro del padre. Al conjunto de alelos se le llama genotipo; a lo que se ve, fenotipo.',
      'En los conejos del colegio, el pelo corto es dominante y el largo, recesivo. El alelo dominante se escribe con mayúscula, A; el recesivo, con minúscula, a. Un conejo AA o Aa tiene pelo corto; solo el aa lo tiene largo. El que tiene dos alelos iguales es homocigoto; el que los tiene distintos, heterocigoto.',
      'La profesora cruzó un macho AA con una hembra aa. Todos los hijos recibieron una A del padre y una a de la madre: los doce fueron Aa, de pelo corto. Después cruzó dos de esos hijos. Cada uno puede dar A o a. Las combinaciones son cuatro: AA, Aa, aA y aa. Se esperan tres de pelo corto por cada uno de pelo largo.',
      'Nacieron ocho conejos: cinco cortos y tres largos. Un estudiante dijo que la regla había fallado. No había fallado: la probabilidad dice lo que se espera en muchos nacimientos, no lo que ocurre en cada camada. En los registros de cinco años, con 412 nacimientos de esa clase de cruce, 305 fueron cortos y 107 largos.',
      'No todo se hereda tan sencillo. En algunas flores, ni el rojo ni el blanco dominan y el heterocigoto es rosado. En los grupos sanguíneos, A y B se notan los dos: el hijo puede ser AB. La estatura depende de muchos genes y también de la alimentación.',
      'Además, hay genes en los cromosomas sexuales. El daltonismo más común está en el cromosoma X y es recesivo. Una mujer, XX, necesita dos copias para tenerlo; un hombre, XY, con una le basta. Por eso es más frecuente en ellos. Una mujer con una sola copia no lo tiene, pero puede transmitirlo: es portadora.',
    ],
  };
  const l1 = leccion('icf-cn-herencia-1', 'Genes y cruces', guion(
    ['Dos alelos', 'Uno de la madre y otro del padre. Genotipo: los alelos. Fenotipo: lo que se ve.'],
    ['Dominante y recesivo', 'Con uno dominante basta; el recesivo necesita dos.'],
    ['El cuadro', 'Cuatro casillas con las combinaciones posibles.'],
    ['Probabilidad', 'Dice lo que se espera en muchos, no en cada camada.']), [
    x('genero-o-cita', '¿Es **genotipo** o **fenotipo**?', { doc: CONEJOS, rot: ['genotipo', 'fenotipo'],
      ...F(['Aa', 0, '¿Son letras de alelos o algo que se ve?'], ['Pelo largo', 1, '¿Son letras de alelos o algo que se ve?'], ['Tener dos alelos iguales', 0, '¿Habla de los alelos o de lo que se ve?'], ['Flor rosada', 1, '¿Habla de los alelos o de lo que se ve?']), bien: 'Lo que se tiene y lo que se ve.' },
      'Aa y los alelos iguales son genotipo; el pelo y el color se ven: fenotipo.', 'Pregunta si lo puedes ver o si está en los genes.'),
    x('pista-tipo', 'Ata cada nombre a su genotipo.', { doc: CONEJOS, lineas: ['AA', 'Aa', 'aa'],
      ...T(['homocigoto de pelo corto', 0, '¿Cuál tiene dos iguales y dominantes?'], ['heterocigoto', 1, '¿Cuál tiene dos distintos?'], ['pelo largo', 2, '¿Cuál no tiene ninguna A?']), bien: 'Iguales, distintos y sin A.' },
      'AA es homocigoto corto, Aa heterocigoto y aa de pelo largo.', 'Mira si las letras son iguales y si hay mayúscula.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONEJOS, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un hijo recibe un alelo de cada padre.',
      ...T(['Un conejo Aa tiene el pelo largo.', 2, 'Busca qué pelo tiene el que lleva una A.'], ['Como nacieron tres largos de ocho, la regla falló.', 6, 'Busca qué dice la probabilidad.'], ['La estatura depende de un solo gen.', 11, 'Busca de qué depende.']), bien: 'Corto, no falló y muchos genes.' },
      'El Aa tiene pelo corto, la probabilidad vale en muchos nacimientos y la estatura depende de muchos genes.', 'Saca la palabra clave: Aa, regla, estatura.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONEJOS, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los doce primeros hijos fueron de pelo corto.', 0, 'Léela junto al primer cruce.'], ['Un hijo daltónico recibió el alelo de su madre.', 1, '¿De quién recibe un hombre su X?'], ['Dos padres de pelo corto pueden tener hijos de pelo largo.', 1, '¿Qué pasó al cruzar dos Aa?'], ['Los conejos de pelo largo viven más.', 2, '¿Se habla de cuánto viven?']),
      luz: [[3, 'los doce fueron Aa'], [6, 'un hombre, XY'], [3, 'cada uno de pelo largo']], bien: 'El Y viene del padre, la X de la madre.' },
      'Los doce están escritos; la X de la madre y los hijos largos se deducen; la edad no aparece.', 'Piensa de quién viene cada cromosoma o alelo.'),
    x('lee-escala', 'La gráfica muestra los nacimientos de otro registro. Pon cada valor y cuántos cortos hay **más** que largos.', { vals: [150, 50, 200], rot: ['cortos', 'largos', 'total'], hi: 200, st: 40, et: ['cortos', 'largos', 'total', 'más'], ops: ['', '', ''], metas: ['150', '50', '200', '100'], fichas: ['150', '50', '200', '100', '123', '42', '250'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a un cuarto del camino entre 40 y 80.', 'Mira en qué línea termina.', 'Resta los largos a los cortos.'], trampas: { '0:123': 'Cada línea vale 40: tres cuartos son 30.', '1:42': 'Cada línea vale 40: un cuarto son 10.' }, ok: 'Tres a uno.' },
      'Las líneas van de 40 en 40: 150, 50 y 200. La diferencia es 100.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CONEJOS, filas: [{ antes: 'Al cruzar Aa con Aa se esperan largos', topes: ['la mitad', 'ninguno', 'uno de cada cuatro'], va: 2 }, { antes: 'Una mujer portadora', topes: ['es daltónica', 'no es daltónica, pero puede transmitirlo', 'no lo transmite'], va: 1 }, { antes: 'En las flores rosadas', topes: ['ninguno domina', 'domina el rojo', 'domina el blanco'], va: 0 }], mira: ['Relee las cuatro combinaciones.', 'Relee la última oración.', 'Relee lo de las flores.'], luz: [[3, 'tres de pelo corto por cada uno'], [6, 'es portadora'], [5, 'ni el rojo ni el blanco dominan']], bien: 'Uno de cuatro, transmite y ninguno.' },
      'Uno de cada cuatro, la portadora transmite y en las flores ninguno domina.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('En una planta, la flor morada (M) domina a la blanca (m). Se cruza Mm con mm. ¿Qué se espera?', ['El padre Mm puede dar M o m; la madre, solo [[m]]', 'Los hijos serán Mm o [[mm]]', 'Se espera que sean blancas el [[50]] %'], ['M', 'MM', '25'], 'Mitad Mm (moradas) y mitad mm (blancas).', 'Escribe lo que puede dar cada uno y combínalo.'),
    err('Alguien cruza dos conejos Aa y explica lo que espera.', ['Cada uno da A o a', 'Las combinaciones son AA, Aa, aA y aa', 'Se espera que la mitad sea de pelo largo'], 2, ['Se espera que la cuarta parte sea de pelo largo', 'Se espera que todos sean de pelo largo', 'Se espera que ninguno sea de pelo largo'], 'Solo aa tiene pelo largo: una de cuatro.', 'Cuenta en cuántas combinaciones no hay mayúscula.'),
    opc('Una pareja sin daltonismo tiene un hijo daltónico. Lo más probable es que:', ['El padre sea portador', 'La madre sea portadora', 'Los dos sean daltónicos', 'El hijo no sea de ellos'], 1, 'El hijo recibe su X de la madre; el padre sin daltonismo no tiene el alelo.', 'Pregunta de quién recibe la X un hombre.'),
  ]);

  const REPRO = {
    id: 'icf-fresas', title: 'Las fresas y las abejas',
    ficha: { autor: 'Vivero comunitario', fuente: 'Guía de siembra', fecha: 'Marzo de 2026' },
    paras: [
      'Una mata de fresa puede tener hijas de dos maneras. Con un estolón, un tallo que se arrastra y echa raíces, produce otra mata sin ayuda de nadie: es reproducción asexual. Con la flor, cuando un grano de polen llega al pistilo de otra y se forma una semilla, la reproducción es sexual.',
      'En la asexual hay un solo progenitor y los hijos son genéticamente iguales a él, salvo que ocurra una mutación. Es rápida y no necesita pareja. Así se multiplican las bacterias, que se parten en dos; las levaduras, que forman yemas; y las papas, que se siembran por pedazos.',
      'En la sexual se unen dos células especiales, los gametos: el óvulo y el espermatozoide; en las plantas con flor, el gameto masculino viaja en el polen. Cada gameto tiene la mitad de los cromosomas. Al unirse, el cigoto recupera el número completo. Los gametos humanos tienen 23 cromosomas; las demás células del cuerpo, 46.',
      'Hay dos divisiones celulares que no conviene confundir. La mitosis produce dos células iguales a la original y sirve para crecer y reparar. La meiosis produce cuatro células con la mitad de cromosomas y sirve para formar gametos. En la meiosis los cromosomas intercambian pedazos y se reparten al azar: por eso dos hermanos no son iguales.',
      'En el vivero hicieron una prueba. Cubrieron treinta flores con una malla que no dejaba entrar insectos; dejaron otras treinta abiertas. Las cubiertas dieron 11 fresas, casi todas deformes; las abiertas, 27. La malla dejaba pasar el sol, el aire y la lluvia.',
      'El año siguiente apareció un hongo. En la parcela sembrada con estolones de una sola mata murieron casi todas; en la que venía de semillas, murió una de cada cuatro. Ser iguales ahorra tiempo mientras nada cambia. Cuando algo cambia, la variedad es el seguro de vida de una especie.',
    ],
  };
  const l2 = leccion('icf-cn-herencia-2', 'Reproducción', guion(
    ['Asexual', 'Un progenitor, hijos iguales, rápida.'],
    ['Sexual', 'Dos gametos con la mitad de cromosomas: hijos variados.'],
    ['Mitosis y meiosis', 'Dos iguales para crecer; cuatro con la mitad para gametos.'],
    ['Variedad', 'Protege cuando el ambiente cambia.']), [
    x('pinta-tipos', 'Pinta cada caso con su tipo de reproducción.', { doc: REPRO, plumas: ['asexual', 'sexual'],
      ...P(['Una bacteria se parte en dos.', 0, '¿Hay uno o dos progenitores?'], ['El polen llega a otra flor.', 1, '¿Hay uno o dos progenitores?'], ['Un estolón echa raíces.', 0, '¿Hay uno o dos progenitores?'], ['Un óvulo se une a un espermatozoide.', 1, '¿Hay uno o dos progenitores?'], ['Se siembra un pedazo de papa.', 0, '¿Hay uno o dos progenitores?']), bien: 'Uno o dos progenitores.' },
      'Bacteria, estolón y papa tienen un progenitor; polen y óvulo unen dos gametos.', 'Cuenta cuántos progenitores aportan en cada caso.'),
    x('genero-o-cita', '¿Es **mitosis** o **meiosis**?', { doc: REPRO, rot: ['mitosis', 'meiosis'],
      ...F(['Cierra una herida', 0, '¿Repara o forma gametos?'], ['Forma óvulos', 1, '¿Repara o forma gametos?'], ['Da dos células iguales', 0, '¿Cuántas y cómo quedan?'], ['Reduce a la mitad los cromosomas', 1, '¿Cuál divide el número?']), bien: 'Crecer o formar gametos.' },
      'Reparar y dar dos iguales es mitosis; formar óvulos con la mitad, meiosis.', 'Pregunta para qué sirve y cuántos cromosomas quedan.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba de la malla.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: REPRO, portadas: [['Flores abiertas', 'experimento'], ['Malla', 'experimento'], ['Número de fresas', 'experimento'], ['Sol, aire y lluvia', 'experimento']],
      ...T(['el control', 0, '¿Con cuáles se compara?'], ['lo que se cambió', 1, '¿Qué impedía entrar a los insectos?'], ['lo que se midió', 2, '¿Qué contaron?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron todas?']), bien: 'Control, cambio, medida e igual.' },
      'Las abiertas son el control, la malla lo que se cambió, las fresas lo medido y sol, aire y lluvia lo igual.', 'Relee cómo se hizo la prueba con las flores.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REPRO, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las flores abiertas dieron 27 fresas.', 0, 'Léela junto a la prueba.'], ['Los insectos ayudan a que se formen buenas fresas.', 1, 'Compara cubiertas y abiertas.'], ['Entre las matas de semilla había algunas resistentes al hongo.', 1, '¿Por qué no murieron todas?'], ['El hongo llegó en las abejas.', 2, '¿Se dice cómo llegó?']),
      luz: [[5, '27'], [5, '11 fresas'], [6, 'una de cada cuatro']], bien: 'Comparar grupos permite deducir.' },
      'Las 27 están escritas; los insectos y la resistencia se deducen; cómo llegó el hongo no.', 'Compara qué pasó en cada grupo de plantas.'),
    x('mayor-tramo', 'La gráfica muestra cuántas bacterias (en miles) hay cada hora. Toca el tramo que más creció **en porcentaje**.', { v: [8, 14, 24, 36] },
      'De 8 a 14 crece 75 %; de 14 a 24, 71 %; de 24 a 36, 50 %. El último suma más, pero en porcentaje crece menos.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Idea: «la variedad genética protegió a las fresas de semilla». ¿Qué hace cada dato?', { doc: REPRO, tesis: 'La variedad protegió a las de semilla',
      ...F(['Las iguales murieron casi todas.', 0, '¿Qué pasó donde no había variedad?'], ['Las de semilla estaban en otra parcela, con menos humedad para el hongo.', 1, '¿Hay otra explicación?'], ['Se repitió en la misma parcela con igual resultado.', 0, '¿Descarta otra explicación?'], ['Las fresas son rojas.', 2, '¿Habla de la variedad?']), bien: 'Otra explicación posible debilita.' },
      'Las iguales y la repetición la apoyan; la humedad distinta la debilita; el color no pesa.', 'Pregunta qué más pudo ser distinto entre las parcelas.'),
    sol('Una célula del cuerpo de un perro tiene 78 cromosomas. ¿Cuántos tienen sus gametos y el cigoto?', ['El gameto tiene la mitad: [[39]]', 'El cigoto junta dos gametos: [[78]]', 'El gameto se forma por [[meiosis]]'], ['156', 'mitosis', '40'], '$78 \\div 2 = 39$ y dos gametos suman 78.', 'Los gametos llevan la mitad.'),
    err('Alguien explica por qué dos hermanos no son iguales.', ['Cada gameto se forma por meiosis', 'En la meiosis los cromosomas se reparten al azar', 'Por eso todos los gametos de una persona son iguales'], 2, ['Por eso los gametos de una persona son distintos entre sí', 'Por eso los hermanos tienen distinto número de cromosomas', 'Por eso los hermanos son genéticamente iguales'], 'El reparto al azar hace distintos a los gametos.', '¿Qué produce un reparto al azar?'),
    opc('Un cultivo de banano se multiplica siempre por hijuelos de la misma planta. Su mayor riesgo es que:', ['Crezca muy despacio', 'Una sola enfermedad afecte a todas las plantas', 'Las plantas sean muy distintas', 'No tenga cromosomas'], 1, 'Son genéticamente iguales: si una es vulnerable, todas lo son.', 'Recuerda qué pasó con las fresas de estolones.'),
  ]);

  const EVO = {
    id: 'icf-lagartijas', title: 'Las lagartijas de la isla Parda',
    ficha: { autor: 'Grupo de campo', fuente: 'Diario de observación', fecha: 'Abril de 2026' },
    paras: [
      'En la isla Parda, las rocas son oscuras. Hace ochenta años, un naturalista contó lagartijas: nueve de cada diez eran verdes y una era parda. Hoy, de cada diez, ocho son pardas. Nadie las pintó y ninguna lagartija verde se volvió parda. Lo que cambió fue la población.',
      'La selección natural lo explica con cuatro pasos. Uno: los individuos de una población no son iguales; hay variación. Dos: parte de esa variación se hereda. Tres: nacen más de los que pueden sobrevivir. Cuatro: los que tienen características favorables en ese ambiente sobreviven y se reproducen más, y dejan más hijos parecidos.',
      'Sobre roca oscura, los halcones ven mejor a las verdes. Las pardas llegaban más a menudo a tener crías, que también eran pardas. Generación tras generación, la proporción cambió. La variación apareció antes, por mutaciones al azar; el ambiente no la fabricó, la seleccionó.',
      'Conviene evitar dos errores. El primero es pensar que los individuos se adaptan porque lo necesitan: una lagartija no se oscurece por esforzarse. El segundo es creer que lo favorable lo es siempre: en la isla vecina, de arena clara, las pardas casi no existen. Estar adaptado es estarlo a un lugar y a un momento.',
      'Las pruebas de la evolución vienen de muchas partes. Los fósiles muestran formas intermedias. Los huesos del brazo humano, la aleta de la ballena y el ala del murciélago son los mismos, acomodados de otra manera. El ADN de especies emparentadas se parece más que el de especies lejanas.',
      'También la vemos mientras ocurre. Si se toma un antibiótico y se abandona antes de tiempo, mueren primero las bacterias sensibles y quedan las pocas resistentes. Esas se multiplican. La siguiente infección ya no responde. No es que la bacteria «se acostumbre»: es que las otras murieron.',
    ],
  };
  const l3 = leccion('icf-cn-herencia-3', 'Selección natural', guion(
    ['Cuatro pasos', 'Variación, herencia, más nacimientos que sobrevivientes y reproducción diferente.'],
    ['La población cambia', 'El individuo no se transforma: cambia la proporción.'],
    ['Al azar y seleccionada', 'La mutación es al azar; el ambiente selecciona.'],
    ['Pruebas', 'Fósiles, huesos parecidos, ADN y bacterias resistentes.']), [
    x('pasos-del-proceso', 'Ordena lo que pasó con las lagartijas. El primer paso está en su puesto.', { doc: EVO, que: 'el cambio', de: 'De verdes a pardas', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Hay verdes y unas pocas pardas.', 'Los halcones cazan más verdes.', 'Las pardas tienen más crías.', 'Las crías heredan el color.', 'La mayoría es parda.'], mira: ['', 'Es lo que hace el ambiente.', 'Es lo que logran las que sobreviven.', 'Es lo que les pasa a sus hijas.', 'Es el resultado.'], bien: 'Variar, cazar, criar, heredar y cambiar.' },
      'Había variación, los halcones cazan verdes, las pardas crían, heredan el color y la población cambia.', 'Sigue los cuatro pasos que explica el párrafo 2.'),
    x('genero-o-cita', '¿La explicación es **correcta** o tiene el **error** típico?', { doc: EVO, rot: ['correcta', 'error típico'],
      ...F(['Se oscureció porque lo necesitaba', 1, '¿El individuo cambia por esfuerzo?'], ['Las pardas dejaron más crías', 0, '¿Habla de reproducción?'], ['La bacteria se acostumbró al remedio', 1, '¿El individuo cambia por esfuerzo?'], ['Quedaron las que ya eran resistentes', 0, '¿La variación estaba antes?']), bien: 'No se esfuerzan: se seleccionan.' },
      'Necesitar y acostumbrarse son el error; dejar crías y quedar las resistentes es la selección.', 'Pregunta si cambia el individuo o la población.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVO, nums: [1, 3, 4], pregunta: 'Queda en pie', queda: 'Lo favorable depende del lugar.',
      ...T(['Cada lagartija verde se volvió parda.', 3, 'Busca qué no hizo ninguna.'], ['El ambiente fabricó el color pardo.', 8, 'Busca qué hizo el ambiente.'], ['Ser parda es ventaja en cualquier isla.', [11, 12], 'Busca la isla vecina.']), bien: 'Ninguna, seleccionó y otra isla.' },
      'Ninguna se volvió parda, el ambiente seleccionó y en la arena clara casi no hay pardas.', 'Saca la palabra clave: cada, fabricó, cualquier.'),
    x('pista-tipo', 'Ata cada clase de prueba a su ejemplo.', { doc: EVO, lineas: ['formas intermedias en la roca', 'brazo, aleta y ala con los mismos huesos', 'secuencias parecidas', 'bacterias resistentes'],
      ...T(['fósiles', 0, '¿Cuál se halla en la roca?'], ['anatomía comparada', 1, '¿Cuál habla de huesos?'], ['ADN', 2, '¿Cuál compara secuencias?'], ['evolución observada hoy', 3, '¿Cuál ocurre ante nosotros?']), bien: 'Muchas pruebas, una idea.' },
      'Los fósiles, los huesos, el ADN y las bacterias apuntan a lo mismo.', 'Mira de dónde sale cada una de las pruebas.'),
    x('lee-escala', 'La gráfica muestra las pardas de cada cien en tres conteos. Pon cada valor y cuánto **subió** del primero al último.', { vals: [10, 45, 80], rot: ['hace 80 años', 'hace 40', 'hoy'], hi: 80, st: 20, et: ['primero', 'segundo', 'hoy', 'subió'], ops: ['', '', ''], metas: ['10', '45', '80', '70'], fichas: ['10', '45', '80', '70', '5', '41', '90'],
      mira: ['Está a mitad de camino de la primera línea.', 'Está a un cuarto del camino entre 40 y 60.', 'Mira en qué línea termina.', 'Resta el primero al último.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '1:41': 'Cada línea vale 20: un cuarto son 5.', '3:90': 'Eso es la suma.' }, ok: 'De 10 a 80.' },
      'Las líneas van de 20 en 20: 10, 45 y 80. Subió $80 - 10 = 70$.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('balanza-tesis', 'Hipótesis: «los halcones causaron el cambio». ¿Qué hace cada dato?', { doc: EVO, tesis: 'Los halcones causaron el cambio',
      ...F(['En un islote oscuro sin halcones, siguen siendo verdes.', 0, '¿Qué pasa al quitar los halcones?'], ['En un islote oscuro sin halcones, también son pardas.', 1, '¿Hicieron falta los halcones?'], ['Los halcones anidan en marzo.', 2, '¿Explica el color?']), bien: 'Quitar una causa la pone a prueba.' },
      'Sin halcones y verdes la apoya; sin halcones y pardas la debilita; el mes no pesa.', 'Compara lugares con halcones y lugares sin ellos.'),
    sol('En una población de 200 polillas, 20 son oscuras. Tras un incendio sobreviven 18 oscuras y 42 claras. ¿Qué porcentaje es oscuro antes y después?', ['Antes eran oscuras el [[10]] %', 'Sobrevivieron en total [[60]]', 'Ahora son oscuras el [[30]] %'], ['18', '20', '43'], '$20 \\div 200 = 10\\%$; $18 \\div 60 = 30\\%$.', 'Compara siempre con el total de ese momento.'),
    err('Alguien explica el cuello largo de las jirafas.', ['Había jirafas de cuello más largo y más corto', 'Las de cuello largo alcanzaban más comida', 'Al estirarse, el cuello les creció y lo heredaron'], 2, ['Dejaron más crías, que heredaron el cuello largo', 'Las de cuello corto se estiraron hasta alcanzar', 'El cuello creció porque lo necesitaban'], 'Lo que se gana por estirarse no se hereda: se seleccionó la variación que ya había.', '¿Se hereda lo que se estira en la vida?'),
    opc('Un paciente suspende el antibiótico al sentirse mejor. Esto favorece la resistencia porque:', ['Las bacterias aprenden a defenderse', 'El antibiótico crea bacterias nuevas', 'Sobreviven y se multiplican las más resistentes', 'El cuerpo rechaza el remedio'], 2, 'Mueren las sensibles y quedan las resistentes, que se multiplican.', 'Piensa cuáles quedan vivas.'),
  ]);

  const MAIZ = {
    id: 'icf-maiz', title: 'De dónde salió el maíz',
    paras: [
      'Hace unos nueve mil años, en lo que hoy es México, la gente recogía los granos de una hierba llamada teocinte. Su mazorca medía lo que un dedo y tenía una docena de granos duros.',
      'Cada año guardaban para sembrar las semillas de las plantas con granos más grandes o más blandos. Es selección artificial: escoge la gente y no el ambiente.',
      'Cuando los científicos compararon el ADN del maíz y del teocinte, hallaron que la diferencia de forma depende, en gran parte, de unos pocos genes. Todavía se pueden cruzar y dar hijos fértiles.',
      'El maíz moderno ya no puede vivir solo: sus granos no se sueltan y, si la mazorca cae entera, los brotes se ahogan entre sí. Necesita quien lo desgrane.',
      'Hay cientos de variedades: de colores, de clima frío o caliente. Cuando un hongo atacó los cultivos de un país que sembraba casi una sola, se perdió una parte enorme de la cosecha. La resistencia se halló en otras variedades que casi nadie sembraba.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: MAIZ, ...p }, e, { hint: h });
  return mundo('icf-cn-herencia', 'Herencia y Evolución', 'ciencias', [l1, l2, l3], [
    ['icf-cn-herencia-1', 'Unos pocos genes pueden cambiar mucho la forma.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué se halló al comparar el ADN?', [3]], ['¿Cómo era el teocinte?', [1]], ['¿Por qué no puede vivir solo el maíz?', [4]]] }, 'El ADN está en el 3, el teocinte en el 1 y la dependencia en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-herencia-1', 'Lo que se hereda pasa en las semillas.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El teocinte tenía una docena de granos.', 0], ['El tamaño del grano se hereda.', 1], ['Maíz y teocinte son parientes cercanos.', 1], ['El teocinte era amarillo.', 2]] }, 'La docena está escrita; que se hereda y el parentesco se deducen; el color no.', 'Piensa por qué sirvió guardar esas semillas.')],
    ['icf-cn-herencia-1', 'El fenotipo depende del genotipo.', opc('Guardar las semillas de las plantas con granos grandes sirvió porque:', ['Las semillas grandes no necesitan agua', 'Los hijos heredan los alelos de sus padres', 'El grano crece por desearlo', 'El teocinte no tiene genes'], 1, 'Al reproducir esas plantas, sus alelos se hicieron más comunes.', 'Pregunta qué reciben las plantas hijas.')],
    ['icf-cn-herencia-2', 'La variedad protege.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Sembrar una sola variedad es un riesgo.', cards: [['Un cultivo de papas iguales arrasado por una plaga', true], ['Un bosque con un solo tipo de pino, enfermo', true], ['Una huerta con veinte especies', false], ['Una vaca que da más leche', false]] }, 'Papas iguales y pinos iguales muestran el riesgo; la huerta variada es lo contrario.', 'Busca casos en que todo es igual y algo lo ataca.')],
    ['icf-cn-herencia-2', 'Hijos fértiles: parentesco cercano.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del maíz moderno se dice todo esto, EXCEPTO:', cards: [['Necesita quien lo desgrane', [4]], ['Puede cruzarse con el teocinte', [3]], ['Tiene cientos de variedades', [5]], ['Crece bajo el agua', null]] }, 'Las tres primeras están en el 4, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-herencia-2', 'Reproducción sexual: variedad.', opc('Conservar variedades viejas de maíz es útil porque:', ['Pueden tener alelos que sirvan ante una enfermedad', 'Son más bonitas', 'No se reproducen', 'Todas son iguales'], 0, 'La resistencia al hongo se halló en variedades que casi nadie sembraba.', 'Piensa qué puede faltarles a plantas casi iguales cuando llega una plaga.')],
    ['icf-cn-herencia-3', 'Selección artificial: escoge la gente.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 4], options: ['La gente escogió qué semillas sembrar.', 'El maíz depende de las personas.', 'El ambiente escogió las semillas.', 'El maíz se siembra solo.'], key: [0, 1] }, 'El 2 habla de escoger semillas; el 4, de su dependencia; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-herencia-3', 'Las mismas reglas: variación, herencia y selección.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al antepasado', 'explica la selección', 'da la prueba del ADN', 'muestra una consecuencia', 'cuenta un riesgo y su salida', 'enseña a cocinar'], key: [0, 1, 2, 3, 4] }, 'Antepasado, selección, prueba, consecuencia y riesgo; no hay receta.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-herencia-3', 'Natural o artificial: quién selecciona.', opc('La diferencia entre la selección del maíz (la gente guardaba las semillas de granos grandes) y la de unas lagartijas que los halcones cazan según su color es:', ['En el maíz no hubo herencia', 'En las lagartijas no hubo variación', 'En el maíz escogió la gente y en las lagartijas, el ambiente', 'Ninguna de las dos es selección'], 2, 'Las dos tienen variación y herencia; cambia quién selecciona.', 'Pregunta quién decidía cuáles se reproducían.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-reacciones.js
// Preicfes · Ciencias Naturales · mundo 9 «Reacciones y Cantidades» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, S, sol, err, opc, guion } = ICF;

  const FRASCO = {
    id: 'icf-frasco-cerrado', title: 'El frasco que no cambió de peso',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'En un cambio físico, la sustancia sigue siendo la misma: el hielo derretido es agua. En un cambio químico, o reacción, unas sustancias se convierten en otras con propiedades distintas. Las que se gastan se llaman reactivos; las que aparecen, productos.',
      'Hay señales que hacen sospechar una reacción: sale un gas, cambia el color, aparece un sólido en un líquido, se libera o se absorbe calor. Son pistas, no pruebas. El agua que hierve también suelta burbujas, y no es una reacción: el vapor sigue siendo agua.',
      'El club quemó un trozo de madera en una balanza. La masa bajó de 50 a 4 gramos y alguien dijo que el resto se había destruido. Después echaron vinagre y bicarbonato en un frasco con tapa. Salió gas y, sin embargo, la balanza marcó lo mismo antes y después. Cuando abrieron la tapa, la masa bajó.',
      'La explicación es que en una reacción los átomos no se crean ni se destruyen: se sueltan de unos y se unen a otros. Por eso la masa total se conserva. La madera parecía perder masa porque los gases se iban; y con un clavo ocurre lo contrario: al oxidarse pesa más, porque se le unen átomos de oxígeno del aire.',
      'Una ecuación química cuenta esa historia. A la izquierda de la flecha van los reactivos; a la derecha, los productos. Debe haber los mismos átomos de cada clase en los dos lados. Para lograrlo se cambian los coeficientes, que dicen cuántas moléculas hay; nunca los subíndices, porque eso cambiaría la sustancia: el agua es H₂O y el agua oxigenada, H₂O₂.',
      'Las reacciones pueden clasificarse. En una síntesis, varias sustancias forman una sola. En una descomposición, una sola da varias. En una combustión, una sustancia se une con oxígeno y libera energía en forma de calor y luz. Si la reacción libera calor es exotérmica; si lo absorbe, endotérmica. Encender una estufa es lo primero; la compresa que se enfría al golpearla, lo segundo. Las plantas también absorben energía, la del Sol, para formar azúcar.',
    ],
  };
  const l1 = leccion('icf-cn-reacciones-1', 'Reacciones y conservación', guion(
    ['Físico o químico', 'En una reacción aparecen sustancias nuevas.'],
    ['La masa se conserva', 'Los átomos no se crean ni se destruyen: se reacomodan.'],
    ['Balancear', 'Se cambian los coeficientes, nunca los subíndices.'],
    ['Clases', 'Síntesis, descomposición y combustión; exotérmica o endotérmica.']), [
    x('genero-o-cita', '¿Es un cambio **físico** o **químico**?', { doc: FRASCO, rot: ['físico', 'químico'],
      ...F(['Se derrite un helado', 0, '¿Aparece una sustancia nueva?'], ['Se quema un papel', 1, '¿Aparece una sustancia nueva?'], ['Se disuelve azúcar en agua', 0, '¿Aparece una sustancia nueva?'], ['Se oxida una reja', 1, '¿Aparece una sustancia nueva?'], ['Se agria la leche', 1, '¿Aparece una sustancia nueva?']), bien: 'Misma sustancia o sustancia nueva.' },
      'Derretir y disolver no cambian la sustancia; quemar, oxidar y agriar, sí.', 'Pregunta si al final hay una sustancia que antes no estaba.'),
    x('balancea-atomos', 'Balancea la formación del **agua**: $H_2 + O_2 \\to H_2O$. Mueve cuántas moléculas hay de cada una, con los números **más pequeños**.', { izq: [['H₂', { H: 2 }], ['O₂', { O: 2 }]], der: [['H₂O', { H: 2, O: 1 }]], sol: [2, 1, 2], max: 6 },
      'Con $2H_2 + O_2 \\to 2H_2O$ hay 4 hidrógenos y 2 oxígenos en cada lado.', 'Empieza por el oxígeno: ¿cuántas moléculas de agua usan los dos?'),
    x('conserva-atomos', 'Toca **todas** las ecuaciones que están **balanceadas**.', { casos: [{ t: 'C + O₂ → CO₂', si: true }, { t: 'N₂ + H₂ → NH₃', no: 'Hay 2 nitrógenos antes y 1 después.' }, { t: '2Mg + O₂ → 2MgO', si: true }, { t: 'CH₄ + O₂ → CO₂ + 2H₂O', no: 'Hay 2 oxígenos antes y 4 después.' }, { t: '2H₂O₂ → 2H₂O + O₂', si: true }], falta: 'Falta otra: cuenta átomo por átomo en los dos lados.', ok: 'Los mismos átomos antes y después.' },
      'Carbono, magnesio y agua oxigenada cuadran; en las otras sobran o faltan átomos.', 'Multiplica el coeficiente por el subíndice de cada átomo.'),
    x('masa-cerrada', 'En frascos **cerrados**, pon la masa que falta, en gramos.', { et: ['24 + 32 → ?', '10 + ? → 26', '? → 44 + 56', '7 + 3 → 4 + ?'], metas: ['56', '16', '100', '6'], fichas: ['56', '16', '100', '6', '36', '12', '8'], mira: ['Suma los reactivos.', 'Lo que falta completa el producto.', 'Suma los productos.', 'Los dos lados deben pesar igual.'], trampas: { '1:36': 'Sumaste: los reactivos juntos deben dar 26.', '2:12': 'Restaste: un solo reactivo dio los dos productos.' }, ok: 'La masa total es la misma.' },
      'Los dos lados pesan igual: 56, 16, 100 y 6 gramos.', 'Suma todo lo de un lado e iguálalo con el otro.'),
    x('pista-tipo', 'Ata cada clase de reacción a su ejemplo.', { doc: FRASCO, lineas: ['hierro y azufre forman un solo sólido', 'el agua oxigenada da agua y oxígeno', 'el gas de la estufa arde con oxígeno', 'una compresa química se pone helada'],
      ...T(['síntesis', 0, '¿En cuál varias dan una sola?'], ['descomposición', 1, '¿En cuál una sola da varias?'], ['combustión', 2, '¿En cuál hay llama?'], ['endotérmica', 3, '¿En cuál se absorbe calor?']), bien: 'Cuántas entran, cuántas salen y qué pasa con el calor.' },
      'Juntarse es síntesis, partirse es descomposición, arder es combustión y enfriar es absorber calor.', 'Cuenta los reactivos y los productos, y mira el calor.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: FRASCO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un clavo pesa más al oxidarse.',
      ...T(['Si hay burbujas, hay una reacción.', [1, 2], 'Busca otra cosa que también suelta burbujas.'], ['Al quemarse, los átomos de la madera desaparecen.', 3, 'Busca qué no les pasa a los átomos.'], ['Para balancear se cambian los subíndices.', 9, 'Busca qué se cambia y qué nunca.']), bien: 'Burbujas, átomos y coeficientes.' },
      'El agua que hierve suelta burbujas, los átomos no se destruyen y se cambian los coeficientes.', 'Saca la palabra clave: burbujas, desaparecen, subíndices.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FRASCO, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La madera pasó de 50 a 4 gramos en la balanza.', 0, 'Léela junto al primer experimento.'], ['Los gases de la madera se llevaron más de la mitad de la masa que marcaba.', 1, 'Compara lo que había con lo que quedó.'], ['El frasco abierto perdió gas.', 1, '¿Por qué bajó la masa al abrir la tapa?'], ['El vinagre pesaba 30 gramos.', 2, '¿Se dice cuánto pesaba?']),
      luz: [[3, 'La masa bajó de 50 a 4 gramos'], [4, 'los gases se iban'], [3, 'Cuando abrieron la tapa']], bien: 'Comparar y explicar.' },
      'Los 50 y 4 están escritos; los gases se deducen; el peso del vinagre no aparece.', 'Une lo que midieron con la explicación del párrafo 4.'),
    sol('Balancea $CH_4 + O_2 \\to CO_2 + H_2O$ y cuenta los oxígenos.', ['El metano trae 4 hidrógenos: salen [[2]] moléculas de agua', 'A la derecha hay $2 + 2 =$ [[4]] oxígenos', 'Hacen falta [[2 moléculas]] de $O_2$'], ['3', '1', '4 moléculas'], '$CH_4 + 2O_2 \\to CO_2 + 2H_2O$.', 'Cuadra primero carbono e hidrógeno y deja el oxígeno para el final.'),
    err('Alguien balancea la reacción del hidrógeno con el oxígeno.', ['Se escribe $H_2 + O_2 \\to H_2O$', 'Falta un oxígeno a la derecha', 'Se cambia la fórmula: $H_2 + O_2 \\to H_2O_2$'], 2, ['Se cambian los coeficientes: $2H_2 + O_2 \\to 2H_2O$', 'Se quita un oxígeno: $H_2 + O \\to H_2O$', 'Se agrega un oxígeno suelto a la derecha'], '$H_2O_2$ es otra sustancia: el agua oxigenada. Los subíndices no se tocan.', '¿Sigue siendo agua lo que quedó a la derecha?'),
    opc('Una vela encendida dentro de un frasco sellado se apaga a los pocos segundos. Si se pesa el frasco completo antes y después, la masa:', ['Es la misma, porque nada entra ni sale', 'Disminuye, porque la vela se gastó', 'Aumenta, porque se forma humo', 'Disminuye, porque el oxígeno desaparece'], 0, 'Los átomos siguen dentro del frasco: la masa se conserva.', 'Piensa si algún átomo salió del frasco.'),
  ]);

  const RECETA = {
    id: 'icf-receta-moles', title: 'La receta de los átomos',
    ficha: { autor: 'Profesora de química', fuente: 'Hoja de clase', fecha: 'Abril de 2026' },
    paras: [
      'Para hacer un sándwich se necesitan dos panes y una tajada de queso. Con diez panes y cuatro tajadas salen cuatro sándwiches: se acaba el queso y sobran dos panes. El queso es lo que limita. En química pasa lo mismo, pero no se cuentan panes sino moléculas.',
      'Las moléculas son demasiado pequeñas para contarlas una por una. Por eso se cuentan por paquetes llamados moles. Un mol tiene 6.02 · 10²³ partículas, así como una docena tiene doce. Un mol de cualquier sustancia tiene el mismo número de partículas, pero no pesa lo mismo: una docena de huevos no pesa lo que una docena de sandías.',
      'La masa molar dice cuántos gramos pesa un mol. Se obtiene sumando las masas de los átomos: si el hidrógeno pesa 1 y el oxígeno 16, un mol de agua, H₂O, pesa 18 gramos. Con 36 gramos de agua se tienen dos moles.',
      'La ecuación balanceada es la receta. En N₂ + 3H₂ → 2NH₃, un mol de nitrógeno necesita tres moles de hidrógeno y produce dos de amoníaco. Los coeficientes dan proporciones entre moles, no entre gramos: un mol de nitrógeno pesa 28 gramos y tres de hidrógeno, apenas 6. Suman 34, que es justo lo que pesan los dos moles de amoníaco.',
      'El reactivo que se acaba primero se llama reactivo límite y decide cuánto producto sale. El otro queda en exceso. Si hay dos moles de nitrógeno y tres de hidrógeno, el hidrógeno alcanza solo para gastar un mol de nitrógeno: salen dos moles de amoníaco y sobra un mol de nitrógeno. El límite no es siempre el que pesa menos, ni el que tiene menos moles: depende de la receta.',
      'En la vida real casi nunca sale todo lo calculado. Parte se pierde, parte no reacciona. El rendimiento compara lo que se obtuvo con lo que se esperaba: si se calculaban 20 gramos y salieron 15, fue del 75 %. Las fábricas gastan mucho dinero para subirlo unos pocos puntos.',
    ],
  };
  const l2 = leccion('icf-cn-reacciones-2', 'Estequiometría', guion(
    ['El mol', 'Un paquete de partículas, como la docena.'],
    ['La receta', 'Los coeficientes dan proporciones entre moles.'],
    ['El que limita', 'El reactivo que se acaba primero decide cuánto sale.'],
    ['Rendimiento', 'Lo que se obtuvo comparado con lo que se esperaba.']), [
    x('paquetes-limite', 'La receta $N_2 + 3H_2 \\to 2NH_3$ usa **1** de $N_2$ y **3** de $H_2$. Hay **5** de $N_2$ y **12** de $H_2$. Mueve cuántas veces se completa la receta.', { hay: [['N₂', 5, 1], ['H₂', 12, 3]], que: 'recetas', max: 8 },
      'El hidrógeno alcanza para $12 \\div 3 = 4$ recetas; sobra 1 de nitrógeno.', 'Divide lo que hay de cada uno entre lo que pide la receta.'),
    x('relacion-moles', 'En $N_2 + 3H_2 \\to 2NH_3$, pon los **moles** que faltan.', { et: ['con 2 de N₂, hidrógeno', 'con 2 de N₂, amoníaco', 'con 9 de H₂, nitrógeno', 'para 10 de NH₃, hidrógeno'], metas: ['6', '4', '3', '15'], fichas: ['6', '4', '3', '15', '2', '30', '27'], mira: ['Por cada nitrógeno van tres.', 'Por cada nitrógeno salen dos.', 'Por cada tres hidrógenos va uno.', 'Halla cuántas recetas dan 10.'], trampas: { '3:30': 'Cada receta da 2 de amoníaco, no 1.', '2:27': 'Multiplicaste: aquí se divide entre 3.', '0:2': 'La receta es 1 a 3.' }, ok: 'Los coeficientes son la receta.' },
      'La receta 1 : 3 : 2 da 6, 4, 3 y 15 moles.', 'Cuenta primero cuántas veces se hace la receta.'),
    x('sube-moles', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un mol de $SO_2$, con S = 32 y O = 16, ¿cuántos **gramos** pesa?', r: 64, c: '32 + 2 \\cdot 16', e: { 48: 'Hay dos oxígenos.' } },
      { q: 'Se esperaban **50 g** y salieron **40 g**. ¿De qué **porcentaje** fue el rendimiento?', r: 80, c: '40 \\div 50 \\cdot 100', e: { 40: 'Esos son los gramos.' } },
      { q: 'En $2Mg + O_2 \\to 2MgO$, con Mg = 24 y O = 16, ¿cuántos **gramos** de $O_2$ gastan **48 g** de Mg?', r: 32, c: '1 \\cdot 32', e: { 16: 'El oxígeno viene en pares: $O_2$.', 48: 'Los coeficientes hablan de moles, no de gramos.' } }] },
      '$32 + 32 = 64$ g; $40 \\div 50 = 80\\%$; 48 g son 2 moles de Mg, que gastan 1 mol de $O_2$: 32 g.', 'Pasa los gramos a moles antes de usar la receta.'),
    x('balancea-atomos', 'Balancea la descomposición $KClO_3 \\to KCl + O_2$, con los números **más pequeños**.', { izq: [['KClO₃', { K: 1, Cl: 1, O: 3 }]], der: [['KCl', { K: 1, Cl: 1 }], ['O₂', { O: 2 }]], sol: [2, 2, 3], max: 6 },
      'Los oxígenos cuadran en 6: $2KClO_3 \\to 2KCl + 3O_2$.', 'Busca un número de oxígenos que sirva para grupos de 3 y de 2.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECETA, filas: [{ antes: 'Un mol de agua y un mol de hierro tienen', topes: ['la misma masa', 'el mismo volumen', 'el mismo número de partículas'], va: 2 }, { antes: 'Los coeficientes dan proporciones entre', topes: ['gramos', 'moles', 'litros'], va: 1 }, { antes: 'El reactivo límite es el que', topes: ['se acaba primero', 'pesa menos', 'cuesta más'], va: 0 }], mira: ['Relee la comparación con la docena.', 'Relee qué dicen los coeficientes.', 'Relee cómo se llama el que se acaba.'], luz: [[2, 'el mismo número de partículas'], [4, 'proporciones entre moles'], [5, 'se acaba primero']], bien: 'Partículas, moles y el que se acaba.' },
      'Igual número de partículas, proporciones entre moles y se acaba primero.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('lee-escala', 'La gráfica muestra los gramos de producto en tres intentos. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [12, 18, 27], rot: ['primero', 'segundo', 'tercero'], hi: 30, st: 6, et: ['primero', 'segundo', 'tercero', 'aumentó'], ops: ['', '', ''], metas: ['12', '18', '27', '15'], fichas: ['12', '18', '27', '15', '25', '39', '13'],
      mira: ['Mira en qué línea termina.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 24 y 30.', 'Resta el primero al último.'], trampas: { '2:25': 'Cada línea vale 6: la mitad son 3.', '3:39': 'Eso es la suma.' }, ok: 'De 12 a 27.' },
      'Las líneas van de 6 en 6: 12, 18 y 27. Aumentó $27 - 12 = 15$ g.', 'Mira cuánto vale cada línea antes de leer.'),
    x('balanza-tesis', 'Afirmación: «en este experimento, el oxígeno era el reactivo límite». ¿Qué hace cada dato?', { doc: RECETA, tesis: 'El oxígeno era el límite',
      ...F(['Al agregar más oxígeno salió más producto.', 0, '¿Qué pasa si se agrega del que limita?'], ['Al final sobró oxígeno.', 1, '¿Sobra el que limita?'], ['El frasco era azul.', 2, '¿Cambia las cantidades?']), bien: 'El que limita se acaba.' },
      'Que salga más al agregarlo la apoya; que sobre la debilita; el color no pesa.', 'Recuerda qué le pasa al reactivo límite al final.'),
    sol('En $2H_2 + O_2 \\to 2H_2O$ se tienen 8 moles de $H_2$ y 3 de $O_2$. ¿Cuántos moles de agua salen?', ['El hidrógeno alcanza para $8 \\div 2 =$ [[4]] recetas', 'El oxígeno alcanza para [[3]] recetas: es el límite', 'Salen $3 \\cdot 2 =$ [[6]] moles de agua'], ['8', '2', '11'], 'El oxígeno limita: 3 recetas de 2 moles de agua.', 'Cuenta cuántas recetas permite cada reactivo.'),
    err('Se tienen 10 moles de A y 6 de B para la receta $2A + B \\to C$. Alguien busca el límite.', ['Para 6 de B harían falta 12 de A', 'Solo hay 10 de A', 'B tiene menos moles: B es el límite'], 2, ['No alcanza A para todo B: A es el límite', 'Como hay más A, sobra A', 'Los dos se acaban a la vez'], 'A alcanza para 5 recetas y B, para 6: limita A, aunque tenga más moles.', '¿Cuántas recetas permite cada uno?'),
    opc('Si en $C + O_2 \\to CO_2$ se queman 36 g de carbono (C = 12, O = 16), la masa de $CO_2$ que se produce es:', ['36 g', '44 g', '96 g', '132 g'], 3, '36 g son 3 moles: 3 moles de $CO_2$ pesan $3 \\cdot 44 = 132$ g.', 'Pasa los gramos de carbono a moles.'),
  ]);

  const PH = {
    id: 'icf-repollo', title: 'El repollo que cambia de color',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Mayo de 2026' },
    paras: [
      'El jugo del repollo morado cambia de color según lo que se le eche. Con limón se vuelve rojo; con agua pura queda morado; con jabón, verde. Una sustancia que hace eso se llama indicador.',
      'Los ácidos, como el limón o el vinagre, liberan iones de hidrógeno, H⁺, cuando están en agua. Las bases, como el jabón o la leche de magnesia, liberan iones OH⁻ o atrapan los H⁺. Los ácidos suaves saben agrios y las bases se sienten jabonosas, pero probar o tocar una sustancia desconocida es peligroso: los ácidos y las bases fuertes queman.',
      'El pH mide qué tan ácida es una disolución. Va, por lo general, de 0 a 14: menos de 7 es ácida, 7 es neutra y más de 7 es básica. La escala no avanza de uno en uno, sino por diez: una disolución de pH 3 tiene diez veces más H⁺ que una de pH 4 y cien veces más que una de pH 5.',
      'El club midió varias cosas. El jugo de limón marcó 2; el café, 5; la leche, 6.5; la sangre ronda 7.4; el agua con jabón, 10; el blanqueador, 12. Al agregarle agua al jugo de limón, el pH subió hacia 7, pero por más agua que echaron nunca pasó de 7.',
      'Cuando un ácido y una base se mezclan en la proporción justa, se neutralizan: los H⁺ y los OH⁻ forman agua, y queda una sal. Por eso un antiácido, que es una base suave, alivia la acidez del estómago, y por eso se echa cal a los suelos muy ácidos. Si se echa base de más, la mezcla queda básica.',
      'El pH importa en todas partes. La sangre tiene sustancias que impiden que cambie mucho, porque con pocas décimas de más o de menos el cuerpo falla. La lluvia normal tiene pH cercano a 5.6, porque disuelve dióxido de carbono; la lluvia ácida, por gases de fábricas y carros, puede bajar de 4.5 y daña hojas, lagos y estatuas de mármol.',
    ],
  };
  const l3 = leccion('icf-cn-reacciones-3', 'Ácidos, bases y pH', guion(
    ['Ácidos y bases', 'Los ácidos liberan H⁺; las bases, OH⁻ o atrapan H⁺.'],
    ['La escala', 'Menos de 7 ácida, 7 neutra, más de 7 básica; cada paso es por 10.'],
    ['Neutralizar', 'Ácido y base en la proporción justa dan agua y sal.'],
    ['Diluir', 'Con agua, el pH se acerca a 7 sin pasarlo.']), [
    x('nivel-ph', 'La muestra A tiene pH **6**. Mueve la muestra B, que es **mil veces más ácida**.', { base: 6, k: -3 },
      'Mil es $10^3$: tres pasos hacia lo ácido, pH 3.', 'Cada paso de pH es por diez: cuenta cuántos hacen mil.'),
    x('genero-o-cita', '¿La sustancia es **ácida** o **básica**?', { doc: PH, rot: ['ácida', 'básica'],
      ...F(['Jugo de limón, pH 2', 0, 'Compara su pH con 7.'], ['Agua con jabón, pH 10', 1, 'Compara su pH con 7.'], ['Café, pH 5', 0, 'Compara su pH con 7.'], ['Sangre, pH 7.4', 1, 'Compara su pH con 7.'], ['Lluvia normal, pH 5.6', 0, 'Compara su pH con 7.']), bien: 'Menos o más de 7.' },
      'Limón, café y lluvia están por debajo de 7; jabón y sangre, por encima.', 'El 7 es el punto neutro: mira de qué lado está cada una.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PH, nums: [3, 4, 5], pregunta: 'Queda en pie', queda: 'Un antiácido es una base suave.',
      ...T(['Un pH de 3 es apenas un poco más ácido que uno de 4.', 2, 'Busca cómo avanza la escala.'], ['Con mucha agua, el limón se vuelve básico.', 5, 'Busca de qué número nunca pasó.'], ['Al mezclar ácido y base, la mezcla siempre queda neutra.', 8, 'Busca qué pasa si se echa base de más.']), bien: 'Por diez, hasta 7 y sin pasarse.' },
      'La escala va por diez, el limón diluido nunca pasó de 7 y con base de más queda básica.', 'Saca la palabra clave: poco, agua, siempre.'),
    x('lee-escala', 'La gráfica muestra el pH de tres suelos. Pon cada valor y cuánto **debe subir** el primero para igualar al último.', { vals: [4, 5, 7], rot: ['suelo 1', 'suelo 2', 'suelo 3'], hi: 8, st: 2, et: ['suelo 1', 'suelo 2', 'suelo 3', 'debe subir'], ops: ['', '', ''], metas: ['4', '5', '7', '3'], fichas: ['4', '5', '7', '3', '6.5', '11', '2'],
      mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre 4 y 6.', 'Está a mitad de camino entre 6 y 8.', 'Resta el primero al último.'], trampas: { '2:6.5': 'Cada línea vale 2: la mitad es 1.', '3:11': 'Eso es la suma.' }, ok: 'De 4 a 7.' },
      'Las líneas van de 2 en 2: 4, 5 y 7. Debe subir 3 pasos: mil veces menos H⁺.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pista-tipo', 'Ata cada explicación a lo que se observó.', { doc: PH, lineas: ['el jugo de repollo se vuelve rojo', 'el antiácido alivia el estómago', 'al echar agua, el pH del limón sube hacia 7', 'el pH de la sangre casi no cambia'],
      ...T(['le echaron un ácido', 0, '¿Cuál habla del color?'], ['se neutralizan ácido y base', 1, '¿Cuál mezcla un ácido con una base suave?'], ['se diluye', 2, '¿Cuál agrega agua?'], ['hay sustancias que lo regulan', 3, '¿Cuál se mantiene estable?']), bien: 'Indicador, neutralizar, diluir y regular.' },
      'El rojo indica ácido, el antiácido neutraliza, el agua diluye y la sangre se regula.', 'Pregunta qué se agregó en cada caso y qué cambió.'),
    x('balanza-tesis', 'Hipótesis: «el lago está muriendo por la lluvia ácida». ¿Qué hace cada dato?', { doc: PH, tesis: 'El lago muere por la lluvia ácida',
      ...F(['Su pH bajó de 6.8 a 4.6 en veinte años de lluvias ácidas.', 0, '¿Hay acidez como se esperaba?'], ['Su pH no ha cambiado y apareció una fuga de petróleo.', 1, '¿Hay acidez? ¿Hay otra causa?'], ['El lago tiene forma de pera.', 2, '¿Dice algo de la acidez?']), bien: 'La causa debe dejar huella.' },
      'Que el pH baje la apoya; sin cambio y con otra causa se debilita; la forma no pesa.', 'Piensa qué debería medirse si la causa fuera esa.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que explica **qué ocurre con los iones** al neutralizar.', { doc: PH, nums: [5], apuesta: 'Los iones se juntan y forman agua.', ...S(['5.0'], { '5.1': 'Da dos usos de la neutralización.', '5.2': 'Dice qué pasa si se echa de más.' }), bien: 'H⁺ y OH⁻ forman agua.' },
      'La primera oración lo explica: los H⁺ y los OH⁻ forman agua, y queda una sal.', 'Busca la oración que nombra los dos iones.'),
    sol('Una muestra de pH 9 se lleva a pH 7. ¿Cómo cambia la cantidad de H⁺?', ['La muestra de pH 9 es [[básica]]', 'De 9 a 7 hay [[2]] pasos', 'La cantidad de H⁺ se multiplica por [[100]]'], ['ácida', '20', '16'], 'Cada paso hacia lo ácido multiplica por 10: $10 \\cdot 10 = 100$.', 'Recuerda: a menor pH, más H⁺.'),
    err('Alguien quiere subir el pH de un suelo de pH 4.', ['Un suelo de pH 4 es ácido', 'Para neutralizarlo hace falta una base', 'Se le echa vinagre, que tiene pH 3'], 2, ['Se le echa cal, que es una base', 'Se le echa jugo de limón, que tiene pH 2', 'Se le echa más tierra de pH 4'], 'El vinagre es un ácido y bajaría el pH: la cal lo sube.', '¿De qué lado de 7 está lo que se le echa?'),
    opc('La muestra P tiene pH 2 y la muestra Q, pH 4. Es correcto afirmar que:', ['Q es el doble de ácida que P', 'P es cien veces más ácida que Q', 'P es el doble de ácida que Q', 'Las dos son básicas'], 1, 'Dos pasos de pH: $10 \\cdot 10 = 100$ veces.', 'Cada paso de la escala es por diez.'),
  ]);

  const ARREPA = {
    id: 'icf-levadura', title: 'Por qué crece el pan',
    paras: [
      'Las levaduras son hongos diminutos que se alimentan del azúcar de la masa. Sin oxígeno, transforman cada molécula de azúcar en dos de alcohol y dos de dióxido de carbono. La ecuación es C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.',
      'El gas queda atrapado en la masa y la infla. Si la masa se deja en un recipiente abierto, pierde un poco de masa, porque parte del gas se escapa; en uno cerrado, la balanza no cambia.',
      'En el horno, el alcohol se evapora, las burbujas se agrandan con el calor y las levaduras mueren. La corteza se dora por otras reacciones entre azúcares y proteínas.',
      'Hay otra forma de inflar: el polvo de hornear. Trae bicarbonato, que es una base, y un ácido seco. Al mojarse reaccionan y sueltan dióxido de carbono. Con exceso de bicarbonato la torta queda con sabor a jabón.',
      'Una panadera pesó: con 180 gramos de azúcar, que es un mol, esperaba 88 gramos de dióxido de carbono, que son dos moles. Obtuvo 66, porque no toda el azúcar alcanzó a fermentar.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: ARREPA, ...p }, e, { hint: h });
  return mundo('icf-cn-reacciones', 'Reacciones y Cantidades', 'ciencias', [l1, l2, l3], [
    ['icf-cn-reacciones-1', 'En la fermentación aparecen sustancias nuevas.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué produce la levadura?', [1]], ['¿Por qué cambia la masa en un recipiente abierto?', [2]], ['¿Cuánto gas se obtuvo?', [5]]] }, 'Los productos están en el 1, el recipiente en el 2 y lo obtenido en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-reacciones-1', 'Los átomos se conservan.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Cada azúcar da dos moléculas de dióxido de carbono.', 0], ['En un recipiente cerrado el gas sigue adentro.', 1], ['En un recipiente abierto, una parte de los átomos de la mezcla pasa al aire.', 1], ['La levadura es de color café.', 2]] }, 'Las dos moléculas están escritas; lo del gas se deduce; el color no aparece.', 'Une el párrafo 2 con la conservación de la masa.')],
    ['icf-cn-reacciones-1', 'Evaporarse es un cambio físico.', opc('Según el texto, en el horno ocurren cambios físicos y químicos. Un cambio físico es:', ['El dorado de la corteza', 'La fermentación', 'La evaporación del alcohol', 'La reacción del bicarbonato'], 2, 'El alcohol evaporado sigue siendo alcohol.', 'Busca dónde no aparece una sustancia nueva.')],
    ['icf-cn-reacciones-2', 'Los coeficientes son la receta.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se obtuvo menos producto del que permitía la receta.', cards: [['Se esperaban 40 g y salieron 30', true], ['Parte del reactivo no reaccionó', true], ['Salió justo lo calculado', false], ['Se pesó el frasco vacío', false]] }, '30 de 40 y lo que no reaccionó muestran un rendimiento menor; los otros no.', 'Busca casos en que salga menos de lo esperado.')],
    ['icf-cn-reacciones-2', 'La masa de los productos viene de los reactivos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del dióxido de carbono se dice todo esto, EXCEPTO:', cards: [['Infla la masa', [2]], ['También lo suelta el polvo de hornear', [4]], ['Se esperaban 88 gramos', [5]], ['Huele a limón', null]] }, 'Las tres primeras están en el 2, el 4 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-reacciones-2', 'Rendimiento: obtenido sobre esperado.', opc('El rendimiento de la fermentación que midió la panadera fue del:', ['75 %', '22 %', '66 %', '133 %'], 0, 'Se divide lo obtenido: $66 \\div 88 = 0.75$.', 'Divide lo que obtuvo entre lo que esperaba.')],
    ['icf-cn-reacciones-3', 'Ácido y base reaccionan.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 3], options: ['Un ácido y una base sueltan el gas que infla.', 'El calor termina el trabajo.', 'El bicarbonato es un ácido.', 'El horno enfría la masa.'], key: [0, 1] }, 'El 4 habla del polvo de hornear; el 3, del horno; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-reacciones-3', 'Con base de más, la mezcla queda básica.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta la reacción', 'explica qué pasa con la masa', 'cuenta lo que hace el horno', 'muestra otra forma de inflar', 'da una medición', 'compara panaderías'], key: [0, 1, 2, 3, 4] }, 'Reacción, masa, horno, otra forma y medición; no hay panaderías.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-reacciones-3', 'El sabor a jabón delata una base.', opc('La torta con exceso de bicarbonato sabe a jabón porque:', ['Quedó ácida', 'Se evaporó el alcohol', 'Murió la levadura', 'Quedó básica'], 3, 'El bicarbonato sobrante es una base.', 'Recuerda qué clase de sustancia es el bicarbonato.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-ondas.js
// Preicfes · Ciencias Naturales · mundo 10 «Ondas, Luz y Sonido» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const CUERDA = {
    id: 'icf-cuerda', title: 'Lo que viaja y lo que se queda',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Una onda es una perturbación que viaja. Lleva energía de un lugar a otro, pero no lleva la materia: un corcho en un estanque sube y baja mientras la onda pasa, y se queda casi en el mismo sitio. Las que necesitan un medio, como el sonido o las olas, se llaman mecánicas; la luz no lo necesita: es electromagnética y cruza el vacío.',
      'Si el medio vibra de lado a lado mientras la onda avanza, como una cuerda sacudida, es transversal. Si vibra en la misma dirección en que avanza, como un resorte que se aprieta y se suelta, es longitudinal. El sonido en el aire es de esta última clase: zonas apretadas y zonas sueltas que viajan.',
      'Para describirla se mide la amplitud, que es cuánto se aparta del centro; la longitud de onda, que es la distancia entre dos crestas seguidas, y la frecuencia, que es cuántas vibraciones ocurren en un segundo y se mide en hertz. El periodo es lo que tarda una vibración: si hay cinco por segundo, cada una tarda un quinto de segundo.',
      'La rapidez es la longitud de onda multiplicada por la frecuencia. La pone el medio, no quien produce la onda: en el aire, a unos 20 °C, el sonido viaja a cerca de 340 metros por segundo, sea grave o agudo. Por eso, si la frecuencia se duplica, la longitud de onda se reduce a la mitad. En el agua, el sonido va más de cuatro veces más rápido que en el aire.',
      'En el sonido, la frecuencia es el tono: más frecuencia, más agudo. La amplitud es la intensidad: más amplitud, más fuerte. Los humanos oímos, más o menos, de 20 a 20 000 hertz; los perros llegan más arriba. Lo que pasa de nuestro límite se llama ultrasonido.',
      'En la luz visible, la frecuencia es el color: el rojo tiene la menor y el violeta, la mayor. En el vacío todos los colores van igual de rápido, a unos 300 000 kilómetros por segundo. Por eso se ve el rayo antes de oír el trueno: contar los segundos y multiplicarlos por 340 da, más o menos, la distancia en metros.',
    ],
  };
  const l1 = leccion('icf-cn-ondas-1', 'Frecuencia y longitud', guion(
    ['Qué viaja', 'La energía; la materia vibra y se queda.'],
    ['Transversal y longitudinal', 'Vibra de lado o en la misma dirección.'],
    ['Medidas', 'Amplitud, longitud de onda, frecuencia y periodo.'],
    ['Rapidez', 'Longitud por frecuencia; la pone el medio.']), [
    x('largo-onda', 'Una onda viaja a **24 m/s** con frecuencia de **3 Hz**. Mueve su **longitud de onda**.', { v: 24, f: 3, max: 16, u: 'm' },
      'La rapidez entre la frecuencia: $24 \\div 3 = 8$ m de longitud.', 'La longitud por la frecuencia debe dar la rapidez: ¿qué número falta?'),
    x('cuenta-vibraciones', 'El dibujo muestra lo que vibró un punto en **4 s**. Mueve su **frecuencia**.', { n: 12, t: 4, max: 12 },
      'Hay 12 vibraciones en 4 s: 3 cada segundo, 3 Hz.', 'Cuenta las vibraciones completas y repártelas entre los segundos.'),
    x('genero-o-cita', '¿La onda es **mecánica** o **electromagnética**?', { doc: CUERDA, rot: ['mecánica', 'electromagnética'],
      ...F(['El sonido de una flauta', 0, '¿Necesita un medio?'], ['La luz de una estrella', 1, '¿Necesita un medio?'], ['Las olas de un lago', 0, '¿Necesita un medio?'], ['La señal de radio de un satélite', 1, '¿Necesita un medio?'], ['El temblor del suelo', 0, '¿Necesita un medio?']), bien: 'Con medio o en el vacío.' },
      'Sonido, olas y temblores necesitan un medio; luz y radio cruzan el vacío.', 'Pregunta si podría llegar atravesando el espacio vacío.'),
    x('tono-o-volumen', '¿Qué se cambia en el sonido de cada caso?', { et: ['subir el volumen', 'cantar más agudo', 'tocar más suave', 'voz más grave'], metas: ['amplitud', 'frecuencia', 'amplitud', 'frecuencia'], fichas: ['amplitud', 'frecuencia', 'amplitud', 'frecuencia', 'rapidez', 'rapidez'], mira: ['¿Es más fuerte o más agudo?', '¿Es más fuerte o más agudo?', '¿Cambia la fuerza o el tono?', '¿Cambia la fuerza o el tono?'], trampas: { '0:rapidez': 'La rapidez la pone el medio.', '1:rapidez': 'La rapidez la pone el medio.', '2:rapidez': 'La rapidez la pone el medio.', '3:rapidez': 'La rapidez la pone el medio.' }, ok: 'Fuerza: amplitud. Tono: frecuencia.' },
      'El volumen es amplitud; el tono, frecuencia; la rapidez no cambia.', 'Separa lo fuerte o suave de lo agudo o grave.'),
    x('pista-tipo', 'Ata cada medida a su definición.', { doc: CUERDA, lineas: ['cuánto se aparta del centro', 'distancia entre dos crestas seguidas', 'vibraciones en un segundo', 'lo que tarda una vibración'],
      ...T(['amplitud', 0, '¿Cuál mide qué tan alta es?'], ['longitud de onda', 1, '¿Cuál es una distancia entre crestas?'], ['frecuencia', 2, '¿Cuál cuenta en cada segundo?'], ['periodo', 3, '¿Cuál es un tiempo?']), bien: 'Altura, distancia, cuántas y cuánto tarda.' },
      'La amplitud se aparta, la longitud separa crestas, la frecuencia cuenta y el periodo tarda.', 'Mira si cada una es una distancia, un número por segundo o un tiempo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CUERDA, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'El sonido viaja más rápido en el agua que en el aire.',
      ...T(['La onda arrastra el corcho hasta la orilla.', 1, 'Busca qué hace el corcho.'], ['Los sonidos agudos viajan más rápido por el aire.', 4, 'Busca quién pone la rapidez.'], ['En el vacío, la luz roja es más lenta que la violeta.', 8, 'Busca cómo van los colores en el vacío.']), bien: 'Se queda, el medio e igual.' },
      'El corcho se queda, la rapidez la pone el medio y los colores van igual en el vacío.', 'Saca la palabra clave: corcho, agudos, roja.'),
    x('lee-escala', 'La gráfica muestra la rapidez del sonido (en m/s) en tres gases. Pon cada valor y cuánto **mayor** es la tercera que la primera.', { vals: [250, 350, 450], rot: ['gas 1', 'gas 2', 'gas 3'], hi: 500, st: 100, et: ['gas 1', 'gas 2', 'gas 3', 'diferencia'], ops: ['', '', ''], metas: ['250', '350', '450', '200'], fichas: ['250', '350', '450', '200', '205', '305', '700'],
      mira: ['Está a mitad de camino entre 200 y 300.', 'Está a mitad de camino entre 300 y 400.', 'Está a mitad de camino entre 400 y 500.', 'Resta la primera a la tercera.'], trampas: { '0:205': 'Cada línea vale 100: la mitad son 50.', '1:305': 'Cada línea vale 100: la mitad son 50.', '3:700': 'Eso es la suma.' }, ok: 'El medio cambia la rapidez.' },
      'Las líneas van de 100 en 100: 250, 350 y 450. La diferencia es 200 m/s.', 'Mira cuánto vale cada línea antes de leer.'),
    x('sube-rapidez', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Longitud de **0.5 m** y frecuencia de **80 Hz**. ¿Cuál es la **rapidez** en m/s?', r: 40, c: '0.5 \\cdot 80', e: { 80: 'Esa es la frecuencia.' } },
      { q: 'Cada vibración tarda **0.05 s**. ¿Cuál es la **frecuencia** en Hz?', r: 20, c: '1 \\div 0.05', e: { 6: 'Se divide 1 entre el periodo.' } },
      { q: 'La rapidez no cambia y la frecuencia se **triplica**. Si la longitud era **60 cm**, ¿cuánto mide ahora?', r: 20, c: '60 \\div 3', e: { 60: 'Con otra frecuencia cambia.' } }] },
      '$0.5 \\cdot 80 = 40$; $1 \\div 0.05 = 20$; y $60 \\div 3 = 20$ cm.', 'Con la misma rapidez, si una sube, la otra baja en la misma proporción.'),
    sol('Se ve un rayo y el trueno se oye 5 s después. ¿A qué distancia cayó?', ['El sonido recorre cada segundo [[340]] m', 'En 5 s recorre [[1700]] m', 'En kilómetros son [[1.7]]'], ['300', '68', '17'], '$340 \\cdot 5 = 1\\,700$ m: 1.7 km.', 'La luz llega casi al instante: usa la rapidez del sonido.'),
    err('Alguien compara dos sonidos en el mismo aire: uno de 200 Hz y otro de 400 Hz.', ['El de 400 Hz es más agudo', 'Los dos viajan igual de rápido', 'El de 400 Hz tiene el doble de longitud de onda'], 2, ['El de 400 Hz tiene la mitad de longitud de onda', 'Los dos tienen la misma longitud de onda', 'El de 400 Hz no tiene longitud de onda'], 'Con la misma rapidez, doble frecuencia es mitad de longitud.', '¿Qué producto debe quedar igual?'),
    opc('En una cuerda se aumenta solo la amplitud de la onda, sin cambiar la cuerda ni la frecuencia. Entonces:', ['La onda transporta más energía', 'La onda viaja más rápido', 'La longitud de onda se duplica', 'El periodo se reduce'], 0, 'La rapidez la pone la cuerda; más amplitud es más energía.', 'Piensa qué depende del medio y qué no.'),
  ]);

  const ESPEJO = {
    id: 'icf-espejo', title: 'Rebotar, doblarse o quedarse',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Abril de 2026' },
    paras: [
      'Cuando una onda llega a una superficie pueden pasar tres cosas: que rebote, que siga del otro lado o que sea absorbida. Casi siempre ocurre un poco de cada una. Un vidrio deja pasar la mayor parte de la luz y devuelve una pequeña parte: por eso, de noche, nos vemos en la ventana.',
      'Al rebotar, o reflejarse, el ángulo con que sale es igual al ángulo con que llega. Los dos se miden desde la normal, una línea perpendicular a la superficie. En un espejo los rayos salen ordenados y forman una imagen; en una hoja de papel, que es rugosa, salen en todas direcciones.',
      'El eco es el sonido reflejado. Si grito frente a un cerro y el eco vuelve a los dos segundos, el sonido hizo ida y vuelta: el cerro está a la mitad de los 680 metros que recorrió. Los murciélagos y los barcos usan esa idea con ultrasonido. En una sala llena de cortinas casi no hay eco, porque las telas lo absorben.',
      'Al pasar de un medio a otro, la onda cambia de rapidez y, si entra inclinada, de dirección. Eso es la refracción. Cuando la luz pasa del aire al agua, va más despacio y se acerca a la normal; al salir del agua al aire, se aleja. Si llega derecha, sobre la normal, no se desvía.',
      'Por la refracción, un lápiz metido en un vaso parece partido y una moneda en el fondo parece más cerca de la superficie. La frecuencia no cambia al pasar de un medio a otro; la longitud de onda, sí. Como cada color se desvía un poco distinto, un prisma, o una gota de lluvia, separa la luz blanca: de ahí sale el arcoíris.',
      'Si la luz va del agua hacia el aire y llega muy inclinada, ya no puede salir: se refleja toda hacia adentro. Se llama reflexión total interna. Con ella funciona la fibra óptica, un hilo de vidrio por el que la luz viaja rebotando y lleva los mensajes de internet a miles de kilómetros.',
    ],
  };
  const l2 = leccion('icf-cn-ondas-2', 'Reflexión y refracción', guion(
    ['Tres destinos', 'Rebotar, pasar o ser absorbida.'],
    ['Reflexión', 'Sale con el mismo ángulo con que llega, desde la normal.'],
    ['Eco', 'El sonido va y vuelve: la distancia es la mitad.'],
    ['Refracción', 'Al cambiar de medio cambia la rapidez y, si entra inclinada, la dirección.']), [
    x('refleja-angulo', 'Un rayo llega al espejo formando **35° con el espejo**. Mueve el rayo que sale, medido **desde la normal**.', { g: 55, con: true },
      'Con la normal forma $90 - 35 = 55°$, y sale con el mismo ángulo.', 'El ángulo con el espejo y el de la normal completan 90°.'),
    x('eco-distancia', 'En un aire donde el sonido va a **340 m/s**, el eco vuelve a los **3 s**. Mueve la distancia al cerro.', { v: 340, t: 3, max: 1200, paso: 10 },
      'Recorrió $340 \\cdot 3 = 1\\,020$ m en ida y vuelta: el cerro está a 510 m.', 'Halla lo que recorrió en total y piensa que fue y volvió.'),
    x('se-acerca-normal', 'La luz pasa de un medio a otro. ¿Qué hace el rayo?', { et: ['del aire al agua, inclinado', 'del agua al aire, inclinado', 'del aire al agua, sobre la normal', 'del aire al vidrio, inclinado'], metas: ['se acerca', 'se aleja', 'no se desvía', 'se acerca'], fichas: ['se acerca', 'se aleja', 'no se desvía', 'se acerca', 'se aleja', 'no se desvía'], mira: ['En el agua va más despacio.', 'En el aire va más rápido.', 'Llega derecho.', 'En el vidrio va más despacio.'], trampas: { '2:se acerca': 'Cambia la rapidez, pero no la dirección.' }, ok: 'Más despacio, se acerca; más rápido, se aleja.' },
      'Al ir más despacio se acerca a la normal; al ir más rápido, se aleja; derecho no se desvía.', 'Pregunta en qué medio va más despacio y si entra inclinado.'),
    x('genero-o-cita', '¿Es **reflexión** o **refracción**?', { doc: ESPEJO, rot: ['reflexión', 'refracción'],
      ...F(['El eco en un cañón', 0, '¿Rebota o cambia de medio?'], ['Un lápiz que parece partido en el agua', 1, '¿Rebota o cambia de medio?'], ['La luna vista en un charco', 0, '¿Rebota o cambia de medio?'], ['La lente de unas gafas', 1, '¿Rebota o cambia de medio?']), bien: 'Rebotar o cambiar de medio.' },
      'Eco y charco rebotan; el lápiz y la lente cambian de medio.', 'Mira si la onda vuelve o atraviesa la superficie.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ESPEJO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Una gota de lluvia puede separar los colores.',
      ...T(['El vidrio deja pasar toda la luz.', 2, 'Busca qué devuelve el vidrio.'], ['Un rayo que llega sobre la normal se desvía.', 6, 'Busca qué pasa si llega derecha.'], ['Al entrar al agua cambia la frecuencia de la luz.', 8, 'Busca qué no cambia.']), bien: 'Devuelve, no se desvía y no cambia.' },
      'El vidrio devuelve una parte, el rayo derecho no se desvía y la frecuencia no cambia.', 'Saca la palabra clave: toda, normal, frecuencia.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ESPEJO, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las telas absorben el sonido.', 0, 'Léela junto a la sala de cortinas.'], ['Una pared lisa y dura da más eco que una cortina.', 1, '¿Qué hacen las telas con el sonido?'], ['Si el eco volviera en seis segundos, el cerro estaría a 1 020 metros.', 1, 'Usa la misma cuenta del párrafo 3.'], ['El cerro está cubierto de pinos.', 2, '¿Se dice qué tiene?']),
      luz: [[3, 'las telas lo absorben'], [3, 'a la mitad de los 680 metros']], bien: 'Comparar y calcular.' },
      'Las telas están escritas; la pared y los 1 020 m se deducen; los pinos no aparecen.', 'Haz la cuenta de ida y vuelta con otro tiempo.'),
    x('balanza-tesis', 'Hipótesis: «la luz se desvía porque cambia de rapidez». ¿Qué hace cada dato?', { doc: ESPEJO, tesis: 'Se desvía porque cambia de rapidez',
      ...F(['Entre dos líquidos en los que va igual de rápido, no se desvía.', 0, '¿Qué pasa si la rapidez no cambia?'], ['Entre dos medios con la misma rapidez, se desvía mucho.', 1, 'Si fuera cierto, ¿haría falta el cambio de rapidez?'], ['El vaso es de plástico rojo.', 2, '¿Habla de la rapidez?']), bien: 'Quitar la causa la pone a prueba.' },
      'Sin cambio y sin desvío la apoya; sin cambio y con desvío la debilita; el color no pesa.', 'Compara lo que pasa cuando la rapidez cambia y cuando no.'),
    sol('Un barco envía un sonido al fondo y lo recibe 0.4 s después. En el agua va a 1 500 m/s. ¿Qué profundidad hay?', ['En total recorre $1\\,500 \\cdot 0.4 =$ [[600]] m', 'Fue ida y [[vuelta]]', 'La profundidad es [[300]] m'], ['1500', 'sola', '1200'], '$600 \\div 2 = 300$ m.', 'El sonido baja y sube.'),
    err('Un rayo llega a un espejo a 20° de la normal. Alguien halla el ángulo entre el rayo que llega y el que sale.', ['Sale a 20° de la normal', 'Los dos están a lados distintos de la normal', 'Entre los dos hay 20°'], 2, ['Entre los dos hay 40°', 'Entre los dos hay 70°', 'Entre los dos hay 0°'], '20° a un lado y 20° al otro: 40°.', 'Dibuja la normal en medio de los dos rayos.'),
    opc('Una moneda en el fondo de una piscina parece más cerca de la superficie porque, al salir del agua, la luz:', ['Se refleja toda', 'Se acerca a la normal', 'Se absorbe', 'Se aleja de la normal'], 3, 'Al pasar al aire va más rápido y se aleja de la normal: el ojo la ve más arriba.', 'Piensa en qué medio va más rápido.'),
  ]);

  const ECO = {
    id: 'icf-ecografia', title: 'Ver con sonido',
    paras: [
      'Una ecografía usa ultrasonido: sonido de millones de hertz, muy por encima de lo que oímos. Un aparato que se apoya en la piel envía pulsos cortos y escucha lo que vuelve.',
      'Cada vez que el pulso pasa de un tejido a otro, una parte se refleja y otra sigue. Un computador mide cuánto tarda cada eco y calcula a qué profundidad está la superficie que lo devolvió.',
      'Entre la piel y el aparato se pone un gel. Sin él quedaría una capa de aire, y el aire devuelve casi todo el ultrasonido: nada entraría al cuerpo.',
      'Con más frecuencia se ven detalles más pequeños, pero el sonido se absorbe más y no llega tan hondo. Por eso se usa una frecuencia alta para el cuello y una más baja para el abdomen.',
      'Si la superficie que refleja se mueve, como la sangre, el eco vuelve con una frecuencia un poco distinta. Con ese cambio se calcula qué tan rápido va la sangre.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: ECO, ...p }, e, { hint: h });
  return mundo('icf-cn-ondas', 'Ondas, Luz y Sonido', 'ciencias', [l1, l2], [
    ['icf-cn-ondas-1', 'Ultrasonido: más frecuencia de la que oímos.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Para qué sirve el gel?', [3]], ['¿Qué cambia con la frecuencia?', [4]], ['¿Cómo se mide la sangre?', [5]]] }, 'El gel está en el 3, la frecuencia en el 4 y la sangre en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-ondas-1', 'El tiempo del eco da la profundidad.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El aire devuelve casi todo el ultrasonido.', 0], ['Un eco que tarda más viene de más hondo.', 1], ['Para ver hondo conviene una frecuencia menor.', 1], ['El gel es de color azul.', 2]] }, 'Lo del aire está escrito; lo del eco y la hondura se deducen; el color no aparece.', 'Une lo que tarda el eco con la profundidad.')],
    ['icf-cn-ondas-1', 'No oímos por encima de unos 20 000 Hz.', opc('El paciente no oye los pulsos de la ecografía porque:', ['Son muy suaves', 'Su frecuencia es mayor que la que oímos', 'Son electromagnéticos', 'No hay gel'], 1, 'Son millones de hertz; oímos hasta unos 20 000.', 'Compara la frecuencia del aparato con la que oímos.')],
    ['icf-cn-ondas-2', 'El tiempo del eco da la distancia.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se halla una distancia con el tiempo que tarda un eco.', cards: [['El murciélago que encuentra un insecto', true], ['El barco que mide la profundidad', true], ['La linterna que alumbra un cuarto', false], ['El termómetro que marca la fiebre', false]] }, 'El murciélago y el barco usan ecos; la linterna y el termómetro, no.', 'Busca casos en que algo va, rebota y vuelve.')],
    ['icf-cn-ondas-2', 'En cada cambio de medio, una parte se refleja.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del ultrasonido se dice todo esto, EXCEPTO:', cards: [['Una parte se refleja y otra sigue', [2]], ['El aire lo devuelve casi todo', [3]], ['Se absorbe más con más frecuencia', [4]], ['Viaja en el vacío', null]] }, 'Las tres primeras están en el 2, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-ondas-2', 'El eco va y vuelve.', opc('Un pulso viaja a 1 500 m/s dentro del cuerpo y su eco vuelve en 0.0001 s. La superficie que lo reflejó está a:', ['15 cm', '30 cm', '7.5 cm', '1.5 cm'], 2, 'Recorre 0.15 m en ida y vuelta: 7.5 cm.', 'Halla lo que recorre en total y pártelo en dos.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-gases.js
// Preicfes · Ciencias Naturales · mundo 11 «Gases y Disoluciones» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const JERINGA = {
    id: 'icf-jeringa', title: 'La jeringa tapada',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Las partículas de un gas están muy separadas y se mueven sin parar. Al chocar con las paredes del recipiente empujan: eso es la presión. Si el gas se calienta, sus partículas se mueven más rápido y chocan con más fuerza. Si hay más partículas, o menos espacio, los choques son más frecuentes.',
      'Una jeringa tapada encierra una cantidad fija de aire. Al empujar el émbolo sin cambiar la temperatura, el aire cabe en menos espacio y las partículas chocan más seguido: la presión sube. Si el volumen se reduce a la mitad, la presión se duplica. El producto de la presión por el volumen no cambia; es la ley de Boyle.',
      'Un globo inflado y metido al congelador se encoge. La presión es casi la misma, la del aire de afuera, pero al bajar la temperatura el volumen baja. Es la ley de Charles: volumen y temperatura son proporcionales, siempre que la temperatura se mida en kelvin. Para pasar de grados Celsius a kelvin se suman 273.',
      '¿Por qué en kelvin? Porque su cero es el de verdad: no hay nada más frío. Pasar de 10 a 20 °C parece el doble, pero son 283 y 293 kelvin: apenas un 3.5 % más. Un globo no duplica su tamaño por eso.',
      'Si el recipiente es rígido, como una lata de aerosol, el volumen no puede cambiar. Al calentarla, lo que sube es la presión: por eso dice que no se arroje al fuego. Es la ley de Gay-Lussac.',
      'Al inflar una llanta entran más partículas, y con más partículas hay más choques. Presión, volumen, cantidad y temperatura están unidos en una sola ecuación, la del gas ideal: PV = nRT. Un gas real se parece a uno ideal cuando la presión no es muy alta y la temperatura no es muy baja. A gran altura hay menos presión, y en cada litro de aire hay menos partículas de oxígeno: por eso los montañistas se cansan.',
    ],
  };
  const l1 = leccion('icf-cn-gases-1', 'Leyes de los gases', guion(
    ['Presión', 'Los choques de las partículas contra las paredes.'],
    ['Boyle', 'Con temperatura fija, presión por volumen no cambia.'],
    ['Charles', 'Con presión fija, el volumen es proporcional a los kelvin.'],
    ['Gay-Lussac', 'Con volumen fijo, la presión es proporcional a los kelvin.']), [
    x('boyle-embolo', 'Un gas ocupa **6 L** a **2 atm**. Sin cambiar la temperatura, la presión sube a **3 atm**. Mueve el émbolo.', { P: 2, V: 6, P2: 3, max: 9, paso: 1 },
      'El producto es $2 \\cdot 6 = 12$ y $12 \\div 3 = 4$ L.', 'El producto de la presión por el volumen debe ser el mismo.'),
    x('charles-globo', 'Un globo tiene **6 L** a **300 K**. Con la misma presión se enfría a **250 K**. Mueve su volumen.', { V: 6, T: 300, T2: 250, max: 10, paso: 0.5 },
      'El volumen y los kelvin van en la misma proporción: $6 \\cdot \\tfrac{250}{300} = 5$ L.', 'Halla cuántos kelvin corresponden a cada litro.'),
    x('gas-sube-baja', '¿Qué le pasa a lo que se pregunta en cada caso?', { et: ['más presión, igual T: volumen', 'más calor, presión igual: volumen', 'lata al sol: presión', 'sale aire de la llanta: presión'], metas: ['baja', 'sube', 'sube', 'baja'], fichas: ['baja', 'sube', 'sube', 'baja', 'igual', 'igual'], mira: ['El producto no cambia: si una sube, la otra…', 'Con más kelvin, más volumen.', 'El volumen es fijo y las partículas van más rápido.', 'Hay menos partículas que chocan.'], trampas: { '2:igual': 'El volumen es el que no cambia.', '0:igual': 'Para que el producto no cambie, algo debe bajar.' }, ok: 'Boyle, Charles, Gay-Lussac y menos partículas.' },
      'Con Boyle baja, con Charles y Gay-Lussac sube y con menos partículas baja.', 'Mira qué se deja fijo en cada caso y qué se mueve.'),
    x('genero-o-cita', '¿En cada caso se mantiene **la presión** o **el volumen**?', { doc: JERINGA, rot: ['la presión', 'el volumen'],
      ...F(['Un globo en el congelador', 0, '¿Puede cambiar de tamaño?'], ['Una lata cerrada al sol', 1, '¿Puede cambiar de tamaño?'], ['Un globo que se infla al calentarse', 0, '¿Puede cambiar de tamaño?'], ['Una olla sellada que se calienta', 1, '¿Puede cambiar de tamaño?']), bien: 'Flexible o rígido.' },
      'Los globos cambian de tamaño y quedan con la presión de afuera; la lata y la olla son rígidas.', 'Pregunta si las paredes del recipiente pueden moverse.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: JERINGA, nums: [2, 3, 5], pregunta: 'Queda en pie', queda: 'La presión viene de los choques de las partículas.',
      ...T(['Si el volumen baja a la mitad, la presión también.', [1, 2], 'Busca qué le pasa a la presión con la mitad del volumen.'], ['En el congelador el globo crece.', [4, 5], 'Busca qué le pasa al globo.'], ['Al calentar una lata, su volumen crece.', 8, 'Busca qué no puede cambiar.']), bien: 'Se duplica, se encoge y no puede.' },
      'La presión se duplica, el globo se encoge y en la lata el volumen no puede cambiar.', 'Saca la palabra clave: mitad, congelador, lata.'),
    x('lee-escala', 'La gráfica muestra el volumen de un globo (en mL) a 280, 320 y 360 K. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [700, 800, 900], rot: ['280 K', '320 K', '360 K'], hi: 1000, st: 200, et: ['280 K', '320 K', '360 K', 'aumentó'], ops: ['', '', ''], metas: ['700', '800', '900', '200'], fichas: ['700', '800', '900', '200', '650', '850', '1600'],
      mira: ['Está a mitad de camino entre 600 y 800.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 800 y 1 000.', 'Resta el primero al último.'], trampas: { '0:650': 'Cada línea vale 200: la mitad son 100.', '2:850': 'Cada línea vale 200: la mitad son 100.', '3:1600': 'Eso es la suma.' }, ok: 'Cada 40 K, 100 mL más.' },
      'Las líneas van de 200 en 200: 700, 800 y 900. Aumentó 200 mL.', 'Mira cuánto vale cada línea antes de leer.'),
    x('sube-gas', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un gas a **5 atm** ocupa **8 L**. ¿Cuántos **litros** ocupa a **2 atm**, con la misma temperatura?', r: 20, c: '5 \\cdot 8 \\div 2', e: { 16: 'El producto 5 por 8 debe conservarse.' } },
      { q: 'Una lata está a **30** unidades de presión y **300 K**. ¿Cuál es su **presión** a **600 K**?', r: 60, c: '30 \\cdot 2', e: { 30: 'Al calentarse, la presión sube.' } },
      { q: '¿Cuántos **grados Celsius** son **353 K**?', r: 80, c: '353 - 273', e: {} }] },
      '$40 \\div 2 = 20$ L; el doble de kelvin es el doble de presión, 60; y $353 - 273 = 80$.', 'Mira qué queda fijo en cada caso antes de calcular.'),
    sol('Un gas ocupa 4 L a 27 °C. Con la misma presión se calienta a 177 °C. ¿Qué volumen ocupa?', ['27 °C son [[300]] K', '177 °C son [[450]] K', 'El volumen es $4 \\cdot 1.5 =$ [[6]] L'], ['327', '26', '8'], '$\\tfrac{450}{300} = 1.5$: el volumen crece a 6 L.', 'Pasa las temperaturas a kelvin antes de comparar.'),
    err('Un globo de 2 L pasa de 20 °C a 40 °C con la misma presión.', ['Con presión fija, al calentarse el globo crece', 'La temperatura se duplicó', 'El volumen crece en la misma proporción que los kelvin'], 1, ['En kelvin pasó de 293 a 313: un 7 % más', 'La temperatura no cambió', 'La temperatura se redujo a la mitad'], 'La proporción vale en kelvin: el globo crece un 7 %.', '¿En qué unidad se comparan las temperaturas?'),
    opc('Se tapa una jeringa con 20 mL de aire y se empuja hasta 5 mL, sin que cambie la temperatura. La presión del aire:', ['Se reduce a la cuarta parte', 'No cambia', 'Se duplica', 'Se hace cuatro veces mayor'], 3, 'El volumen es la cuarta parte: la presión, cuatro veces mayor.', 'El producto no cambia: compara los volúmenes.'),
  ]);

  const SUERO = {
    id: 'icf-suero', title: 'El suero de la abuela',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una disolución tiene un soluto, lo que se disuelve, y un solvente, lo que disuelve. La concentración dice cuánto soluto hay en cierta cantidad de disolución. No es lo mismo tener mucho soluto que estar muy concentrada: una piscina tiene más sal que una cucharada de salmuera y, sin embargo, está menos salada.',
      'Hay varias formas de medirla. El porcentaje en masa compara los gramos de soluto con cien gramos de disolución; los gramos por litro, con un litro; la molaridad compara los moles de soluto con los litros de disolución. Para cantidades muy pequeñas se usan las partes por millón: un miligramo en un kilogramo. Una cifra sin su unidad no dice nada: cinco puede ser mucho o casi nada.',
      'La abuela de Tania prepara suero casero: un litro de agua hervida, seis cucharaditas rasas de azúcar y media de sal. «Con más sal es peligroso», advierte. Tiene razón: un suero muy concentrado saca agua de las células en vez de dársela.',
      'Diluir es agregar solvente. El soluto no cambia; se reparte en más volumen y la concentración baja. Si a un litro con 10 gramos se le agrega otro litro de agua, quedan 10 gramos en dos litros: cinco por litro. Por eso el producto de la concentración por el volumen es el mismo antes y después.',
      'También se puede concentrar: al evaporar agua, el soluto se queda y la concentración sube. Si se sacan unas gotas de la disolución, en cambio, la concentración no cambia: sale soluto y sale solvente en la misma proporción. Una cucharada de suero está tan salada como la jarra entera.',
      'El agua de los acueductos se trata con cloro: queda entre 0.3 y 2 partes por millón. Con menos, sobreviven microbios; con más, molesta y puede hacer daño. Por eso se mide varias veces al día, en la planta y en las casas. En la etiqueta de un remedio, un cero de más puede convertirlo en veneno.',
    ],
  };
  const l2 = leccion('icf-cn-gases-2', 'Concentración', guion(
    ['Concentración', 'Cuánto soluto hay en cierta cantidad de disolución.'],
    ['Unidades', 'Porcentaje, gramos por litro, molaridad y partes por millón.'],
    ['Diluir', 'Se agrega solvente: el soluto es el mismo.'],
    ['Sacar un poco', 'La concentración no cambia.']), [
    x('concentra-agua', 'Hay **30 g** de azúcar. Mueve el volumen de la disolución para que quede a **20 g por litro**.', { g: 30, meta: 20, max: 3, paso: 0.25 },
      'Los gramos entre la concentración: $30 \\div 20 = 1.5$ litros.', 'Cada litro debe llevar 20 gramos: ¿para cuánto alcanza?'),
    x('diluye-agua', 'Hay **2 L** a **15 g/L**. Mueve el agua que hay que **agregar** para que quede a **5 g/L**.', { V: 2, C: 15, C2: 5, max: 8, paso: 0.5 },
      'Hay 30 g: a 5 g/L llenan 6 L. Se agregan 4 L.', 'Halla cuántos gramos hay y cuántos litros deben ser al final.'),
    x('concentracion-tabla', 'Pon la concentración de cada disolución.', { et: ['12 g en 3 L', '5 g de sal en 50 g de disolución', '0.5 mol en 0.25 L', '4 mg en 2 kg'], metas: ['4 g/L', '10 %', '2 mol/L', '2 ppm'], fichas: ['4 g/L', '10 %', '2 mol/L', '2 ppm', '36 g/L', '5 %', '0.125 mol/L'], mira: ['Divide los gramos entre los litros.', 'Compara con cien gramos.', 'Divide los moles entre los litros.', 'Cada parte por millón es 1 mg por kg.'], trampas: { '0:36 g/L': 'Multiplicaste: se divide entre los litros.', '1:5 %': 'Son 5 de 50, no de 100.', '2:0.125 mol/L': 'Multiplicaste: se divide entre los litros.' }, ok: 'Soluto entre disolución.' },
      '$12 \\div 3 = 4$; $5 \\div 50 = 10\\%$; $0.5 \\div 0.25 = 2$; y 2 mg por kg.', 'Siempre se divide el soluto entre la disolución.'),
    x('mas-o-menos-concentrada', '¿Qué le pasa a la **concentración**?', { et: ['se agrega agua', 'se evapora agua', 'se saca la mitad del jugo', 'se agrega y disuelve azúcar'], metas: ['baja', 'sube', 'no cambia', 'sube'], fichas: ['baja', 'sube', 'no cambia', 'sube', 'baja', 'no cambia'], mira: ['El mismo soluto en más volumen.', 'El mismo soluto en menos volumen.', 'Sale soluto y sale solvente.', 'Más soluto en casi el mismo volumen.'], trampas: { '2:baja': 'Queda menos jugo, pero igual de dulce.' }, ok: 'Soluto y solvente.' },
      'Con agua baja, al evaporar o agregar soluto sube y al sacar un poco no cambia.', 'Pregunta qué pasó con el soluto y qué con el solvente.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: SUERO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Al evaporar agua, la concentración sube.',
      ...T(['Lo que tiene más soluto siempre está más concentrado.', 2, 'Busca la piscina.'], ['Al diluir se pierde soluto.', [4, 5], 'Busca qué no cambia.'], ['Una cucharada de suero está menos salada que la jarra.', [8, 9], 'Busca la comparación con la jarra.']), bien: 'La piscina, no cambia y tan salada.' },
      'La piscina tiene más sal y está menos salada, el soluto no cambia y la cucharada está igual.', 'Saca la palabra clave: más soluto, diluir, cucharada.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SUERO, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El suero lleva media cucharadita de sal por litro.', 0, 'Léela junto a la receta.'], ['Para dos litros hacen falta doce cucharaditas de azúcar.', 1, 'Usa la receta con el doble de agua.'], ['Un agua con 3 partes por millón de cloro tiene demasiado.', 1, 'Compara con el intervalo.'], ['La abuela vive en un pueblo con río.', 2, '¿Se dice dónde vive?']),
      luz: [[3, 'media de sal'], [3, 'seis cucharaditas rasas'], [6, 'entre 0.3 y 2 partes por millón']], bien: 'Proporción y comparación.' },
      'La sal está escrita; las doce y las 3 partes se deducen; el pueblo no aparece.', 'Usa la receta y el intervalo con otros números.'),
    x('balanza-tesis', 'Hipótesis: «la planta murió por un abono muy concentrado». ¿Qué hace cada dato?', { doc: SUERO, tesis: 'Murió por un abono muy concentrado',
      ...F(['Las plantas con el abono diluido siguen sanas.', 0, '¿Qué pasa al bajar la concentración?'], ['Las plantas sin abono también murieron.', 1, '¿Hizo falta el abono?'], ['La maceta es redonda.', 2, '¿Cambia la concentración?']), bien: 'Comparar con y sin.' },
      'Las diluidas la apoyan; las que no tenían abono la debilitan; la maceta no pesa.', 'Compara lo que pasa al quitar o bajar la causa.'),
    sol('Se mezclan 1 L de jugo con 40 g de azúcar y 3 L de agua. ¿Cómo queda?', ['El azúcar sigue siendo [[40]] g', 'El volumen es [[4]] L', 'La concentración es [[10]] g/L'], ['3', '13.3', '160'], '$40 \\div 4 = 10$ g/L.', 'El azúcar no cambia: cambia el volumen.'),
    err('Alguien prepara una disolución de sal al 10 % en masa.', ['Pesa 10 g de sal', 'Pesa 100 g de agua', 'Mezcla hasta que se disuelva'], 1, ['Pesa 90 g de agua, para 100 g de disolución', 'Pesa 10 g de agua', 'Pesa 1 000 g de agua'], 'Con 100 g de agua serían 110 g de disolución: 9.1 %.', '¿El porcentaje es del agua o de toda la disolución?'),
    opc('De una jarra con suero se sirve la mitad en un vaso. La concentración del suero del vaso:', ['Es la misma que la de la jarra', 'Es la mitad', 'Es el doble', 'No se puede comparar'], 0, 'Sale soluto y solvente en la misma proporción.', 'Piensa si el vaso queda más o menos salado.'),
  ]);

  const BUZO = {
    id: 'icf-buzo', title: 'El aire del buzo',
    paras: [
      'En la superficie, el aire nos aprieta con una atmósfera de presión. Bajo el agua, cada diez metros agregan otra: a diez metros hay dos; a veinte, tres.',
      'Un globo lleno de aire que baja se encoge. Si se llena a diez metros y se suelta, crece al subir y puede reventar. Por eso un buzo nunca debe contener la respiración mientras asciende.',
      'Con más presión, más gas se disuelve en la sangre. A gran profundidad, el nitrógeno del aire se disuelve en el cuerpo del buzo.',
      'Si sube muy rápido, la presión baja de golpe y ese nitrógeno deja de estar disuelto: forma burbujas, como al destapar una gaseosa. Es muy peligroso.',
      'La solución es subir despacio y hacer paradas, para que el gas salga poco a poco por los pulmones. Las tablas dicen cuánto esperar según la profundidad y el tiempo.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BUZO, ...p }, e, { hint: h });
  return mundo('icf-cn-gases', 'Gases y Disoluciones', 'ciencias', [l1, l2], [
    ['icf-cn-gases-1', 'A más presión, menos volumen.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuánta presión hay a veinte metros?', [1]], ['¿Por qué no contener la respiración?', [2]], ['¿Para qué se hacen paradas?', [5]]] }, 'La presión está en el 1, la respiración en el 2 y las paradas en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-gases-1', 'Cada diez metros, una atmósfera más.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['A diez metros hay dos atmósferas.', 0], ['A treinta metros hay cuatro atmósferas.', 1], ['El aire de los pulmones crece al subir.', 1], ['El mar estaba a 20 °C.', 2]] }, 'Las dos atmósferas están escritas; las cuatro y los pulmones se deducen; la temperatura no aparece.', 'Usa la regla de los diez metros y el ejemplo del globo.')],
    ['icf-cn-gases-1', 'Presión por volumen no cambia.', opc('Un globo tiene 6 L en la superficie. A 20 metros, con la misma temperatura, ocupa:', ['18 L', '6 L', '2 L', '3 L'], 2, 'A 20 m hay 3 atmósferas: $6 \\div 3 = 2$ L.', 'Halla cuántas atmósferas hay a esa profundidad.')],
    ['icf-cn-gases-2', 'Con más presión se disuelve más gas.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Al bajar la presión, el gas disuelto se escapa.', cards: [['La gaseosa que burbujea al destaparla', true], ['La champaña que suelta gas al abrirla', true], ['El agua que se congela', false], ['La sal que queda al evaporar', false]] }, 'Gaseosa y champaña sueltan gas al bajar la presión; las otras no.', 'Busca casos en que se abre algo que estaba a presión.')],
    ['icf-cn-gases-2', 'El gas disuelto sale poco a poco.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del buzo se dice todo esto, EXCEPTO:', cards: [['No debe contener la respiración al subir', [2]], ['Se le disuelve nitrógeno', [3]], ['Debe hacer paradas', [5]], ['Debe beber gaseosa', null]] }, 'Las tres primeras están en el 2, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-gases-2', 'Más tiempo y más hondo: más gas disuelto.', opc('Si la sangre de un buzo tiene 6 mg de nitrógeno por cada 0.3 L, su concentración es:', ['1.8 mg/L', '20 mg/L', '2 mg/L', '6.3 mg/L'], 1, 'Se dividen los miligramos entre los litros: $6 \\div 0.3 = 20$.', 'Divide el soluto entre el volumen.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-electrico.js
// Preicfes · Ciencias Naturales · mundo 12 «Electricidad y Magnetismo» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const CASA = {
    id: 'icf-casa-luz', title: 'La casa que se quedó a oscuras',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Una corriente eléctrica es carga que se mueve por un conductor. Para que circule hace falta un camino cerrado y algo que la empuje, como una pila. Ese empuje se llama voltaje y se mide en voltios; la corriente, en amperios. Si el camino se corta en cualquier punto, como cuando se abre un interruptor, la carga deja de circular.',
      'Todo conductor se opone un poco al paso de la carga: es su resistencia, que se mide en ohmios. La ley de Ohm dice que el voltaje es la corriente por la resistencia. Con la misma pila, si la resistencia se duplica, la corriente se reduce a la mitad. Un alambre largo y delgado resiste más que uno corto y grueso del mismo metal.',
      'En serie hay un solo camino. La corriente es la misma en todos los elementos y el voltaje se reparte. Las resistencias se suman. Si un bombillo se quema, se apagan todos: así eran las luces de Navidad de antes.',
      'En paralelo cada elemento tiene su propio camino. Todos reciben el mismo voltaje y la corriente se reparte. Si uno se apaga, los demás siguen. Las casas se conectan así. Cada aparato que se enchufa abre otro camino, y la corriente total aumenta.',
      'Cuando la corriente total es demasiado grande, los cables se calientan y puede haber un incendio. Para evitarlo, un interruptor automático de la caja corta el paso. Un cortocircuito es un camino casi sin resistencia: la corriente se dispara en un instante. Por eso nunca se deben juntar los dos cables pelados de un enchufe.',
      'La potencia dice cuánta energía se gasta en cada segundo: es el voltaje por la corriente, y se mide en vatios. Un bombillo de 10 vatios encendido cien horas gasta lo mismo que una ducha de 5 000 vatios en doce minutos: un kilovatio hora. Eso es lo que se cobra en el recibo.',
    ],
  };
  const l1 = leccion('icf-cn-electrico-1', 'Circuitos', guion(
    ['Corriente', 'Carga que se mueve por un camino cerrado.'],
    ['Ohm', 'Voltaje es corriente por resistencia.'],
    ['Serie y paralelo', 'Un solo camino, o uno para cada elemento.'],
    ['Potencia', 'Voltaje por corriente: energía en cada segundo.']), [
    x('corriente-resistor', 'La pila es de **12 V** y la resistencia, de **8 Ω**. Mueve la **corriente**.', { V: 12, R: 8, max: 4, paso: 0.25 },
      'El voltaje entre la resistencia: $12 \\div 8 = 1.5$ A.', 'La corriente por la resistencia debe dar el voltaje.'),
    x('serie-resistencia', 'Con una pila de **24 V** pasan **2 A** por dos resistencias **en serie**. Una es de **5 Ω**. Mueve la otra.', { V: 24, I: 2, R1: 5, max: 15 },
      'En total hay $24 \\div 2 = 12$ Ω; la otra es $12 - 5 = 7$ Ω.', 'Halla primero la resistencia de todo el camino.'),
    x('paralelo-ramas', 'Una pila de **12 V** alimenta **en paralelo** una resistencia de **6 Ω** y otra de **4 Ω**. Completa.', { et: ['voltaje en la de 4 Ω', 'corriente en la de 6 Ω', 'corriente en la de 4 Ω', 'corriente total'], metas: ['12 V', '2 A', '3 A', '5 A'], fichas: ['12 V', '2 A', '3 A', '5 A', '6 V', '1.2 A'], mira: ['En paralelo, todas reciben lo mismo.', 'Divide el voltaje entre 6.', 'Divide el voltaje entre 4.', 'Suma las de las dos ramas.'], trampas: { '0:6 V': 'El voltaje se reparte en serie, no en paralelo.', '3:1.2 A': 'Esa sería la corriente si estuvieran en serie.' }, ok: 'Mismo voltaje; la corriente se suma.' },
      'Las dos reciben 12 V; pasan 2 A y 3 A; en total, 5 A.', 'Aplica la ley de Ohm en cada rama por separado.'),
    x('que-prende', 'Hay cinco circuitos con una pila y bombillos buenos, salvo lo que se dice. Toca **todos** en los que **algún bombillo prende**.', { casos: [{ t: 'dos en paralelo, uno quemado', si: true }, { t: 'dos en serie, uno quemado', no: 'En serie hay un solo camino y quedó cortado.' }, { t: 'uno solo, con el interruptor cerrado', si: true }, { t: 'uno solo, con el cable suelto', no: 'Sin camino cerrado no hay corriente.' }, { t: 'tres en serie, todos buenos', si: true }], falta: 'Falta otro: busca un camino cerrado que pase por un bombillo bueno.', ok: 'Hay camino cerrado.' },
      'En paralelo queda el otro camino; el cerrado y los tres en serie también tienen camino completo.', 'Sigue con el dedo el camino de la pila y mira si vuelve a ella.'),
    x('genero-o-cita', '¿Es propio de un circuito **en serie** o **en paralelo**?', { doc: CASA, rot: ['en serie', 'en paralelo'],
      ...F(['La corriente es la misma en todos', 0, '¿Hay uno o varios caminos?'], ['Todos reciben el mismo voltaje', 1, '¿Hay uno o varios caminos?'], ['Si uno falla, todos se apagan', 0, '¿Hay uno o varios caminos?'], ['Las tomas de una casa', 1, '¿Hay uno o varios caminos?']), bien: 'Un camino o varios.' },
      'Un camino: misma corriente y falla total; varios caminos: mismo voltaje, como en las casas.', 'Cuenta los caminos que puede tomar la carga.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CASA, nums: [2, 3, 4], pregunta: 'Queda en pie', queda: 'Un alambre grueso y corto resiste menos que uno largo y delgado del mismo metal.',
      ...T(['Con más resistencia y la misma pila pasa más corriente.', 2, 'Busca qué pasa si la resistencia se duplica.'], ['En serie, si un bombillo se quema los demás siguen.', 7, 'Busca las luces de Navidad.'], ['En paralelo todos usan el mismo camino.', [8, 12], 'Busca qué tiene cada elemento.']), bien: 'A la mitad, todos y el propio.' },
      'Con más resistencia la corriente baja, en serie se apagan todos y en paralelo cada uno tiene su camino.', 'Saca la palabra clave: más resistencia, quema, mismo camino.'),
    x('sube-vatios', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un cargador usa **20 V** y **3 A**. ¿Cuál es su **potencia** en vatios?', r: 60, c: '20 \\cdot 3', e: { 6: 'Se multiplica el voltaje por la corriente.' } },
      { q: 'Tres resistencias **en serie** de **10**, **14** y **20** Ω. ¿Cuál es la **total**?', r: 44, c: '10 + 14 + 20', e: { 20: 'En serie se suman todas.' } },
      { q: '¿Cuántos **voltios** hacen pasar **4 A** por **9 Ω**?', r: 36, c: '4 \\cdot 9', e: { 14: 'Se multiplican.' } }] },
      '$20 \\cdot 3 = 60$ W; $10 + 14 + 20 = 44$ Ω; y $4 \\cdot 9 = 36$ V.', 'Escribe primero qué fórmula relaciona los datos.'),
    sol('Una plancha de 1 200 W se usa 30 minutos cada día. ¿Cuánta energía gasta en 10 días?', ['Cada día funciona [[0.5]] horas', 'Cada día gasta $1\\,200 \\cdot 0.5 =$ [[600]] Wh', 'En 10 días son [[6]] kWh'], ['30', '36000', '12'], '$600 \\cdot 10 = 6\\,000$ Wh: 6 kWh.', 'Pasa los minutos a horas.'),
    err('Alguien conecta dos bombillos iguales en serie a una pila de 6 V.', ['Hay un solo camino', 'La corriente es la misma en los dos', 'Cada bombillo recibe 6 V'], 2, ['Cada bombillo recibe 3 V', 'Cada bombillo recibe 12 V', 'Uno recibe 6 V y el otro 0 V'], 'En serie el voltaje se reparte: 3 V para cada uno.', '¿Qué se reparte y qué se mantiene en serie?'),
    opc('En una casa se enchufan más aparatos a la misma red. El interruptor automático corta el paso porque:', ['El voltaje bajó a cero', 'La corriente total aumentó demasiado', 'La resistencia de cada aparato aumentó', 'Los aparatos quedaron en serie'], 1, 'Cada aparato abre otro camino y la corriente total crece.', 'Piensa qué le pasa a la corriente total con cada aparato.'),
  ]);

  const GLOBO = {
    id: 'icf-globo-iman', title: 'El globo, el imán y la brújula',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Al frotar un globo con lana, pasan electrones de la lana al globo. El globo queda con carga negativa y la lana, con positiva. No se creó carga: solo se movió de un lado a otro.',
      'Las cargas del mismo signo se repelen y las de signo contrario se atraen. La fuerza crece si las cargas son mayores y disminuye mucho con la distancia: al doble de distancia, la fuerza es cuatro veces menor. Es la ley de Coulomb.',
      'El globo cargado también atrae pedacitos de papel que no tienen carga. Las cargas del papel se acomodan: las positivas quedan un poco más cerca del globo y las negativas, más lejos. Como la atracción actúa desde más cerca, gana. Por la misma razón, un globo frotado se queda pegado a la pared durante un buen rato.',
      'Un imán tiene dos polos, norte y sur. Los polos iguales se repelen y los distintos se atraen. Si se parte, cada pedazo vuelve a tener los dos: hasta ahora nadie ha podido separar un polo solo. Un imán atrae hierro, níquel y cobalto, pero no cobre, aluminio ni plástico.',
      'La Tierra se comporta como un imán enorme, y la brújula es una aguja imantada que se alinea con ella. Una corriente también produce magnetismo: en 1820, Oersted vio que una aguja se movía cerca de un cable. Un alambre enrollado en un clavo de hierro, con corriente, es un electroimán: se puede prender y apagar.',
      'Lo contrario también ocurre: al mover un imán cerca de una bobina aparece corriente en ella. Se llama inducción, y con ella funcionan los generadores de las hidroeléctricas: el agua mueve imanes o bobinas y así se empujan los electrones. Electricidad y magnetismo resultaron ser dos caras de lo mismo. Si el imán se queda quieto, en cambio, no aparece ninguna corriente: hace falta que algo cambie.',
    ],
  };
  const l2 = leccion('icf-cn-electrico-2', 'Cargas e imanes', guion(
    ['Cargas', 'Iguales se repelen y distintas se atraen; no se crean.'],
    ['Coulomb', 'Al doble de distancia, la cuarta parte de la fuerza.'],
    ['Imanes', 'Siempre tienen dos polos.'],
    ['Electroimán e inducción', 'La corriente produce magnetismo y el imán que se mueve, corriente.']), [
    x('atrae-repele', '¿Se **atraen**, se **repelen** o **nada**?', { et: ['dos globos frotados con lana', 'polo norte y polo sur', 'imán y moneda de aluminio', 'globo cargado y papelitos'], metas: ['se repelen', 'se atraen', 'nada', 'se atraen'], fichas: ['se repelen', 'se atraen', 'nada', 'se atraen', 'se repelen', 'nada'], mira: ['Los dos quedaron con la misma carga.', 'Son polos distintos.', 'Mira qué metales atrae un imán.', 'Las cargas del papel se acomodan.'], trampas: { '2:se atraen': 'El imán no atrae aluminio.', '3:nada': 'Aunque no tengan carga, sus cargas se acomodan.' }, ok: 'Signos, polos, metales y acomodo.' },
      'Globos iguales se repelen, polos distintos se atraen, el aluminio no siente nada y el papel es atraído.', 'Mira primero si tienen la misma carga o el mismo polo.'),
    x('fuerza-cambia', 'Dos cargas se atraen con una fuerza de **36**. ¿Cuánto vale en cada cambio?', { et: ['al doble de distancia', 'a la mitad de distancia', 'una carga al doble', 'al triple de distancia'], metas: ['9', '144', '72', '4'], fichas: ['9', '144', '72', '4', '18', '12', '36'], mira: ['Al doble, cuatro veces menor.', 'A la mitad, cuatro veces mayor.', 'La fuerza crece igual que la carga.', 'Al triple, nueve veces menor.'], trampas: { '0:18': 'La distancia va al cuadrado.', '1:72': 'La distancia va al cuadrado.', '3:12': 'La distancia va al cuadrado.' }, ok: 'La distancia, al cuadrado; la carga, no.' },
      '$36 \\div 4 = 9$; $36 \\cdot 4 = 144$; $36 \\cdot 2 = 72$; y $36 \\div 9 = 4$.', 'La distancia cuenta al cuadrado y al contrario.'),
    x('genero-o-cita', '¿Es **electroimán** (corriente que da magnetismo) o **inducción** (magnetismo que da corriente)?', { doc: GLOBO, rot: ['electroimán', 'inducción'],
      ...F(['La grúa que suelta la chatarra al apagarse', 0, '¿Qué produce qué?'], ['El generador de una hidroeléctrica', 1, '¿Qué produce qué?'], ['El clavo con alambre y pila', 0, '¿Qué produce qué?'], ['La linterna que se agita para cargarla', 1, '¿Qué produce qué?']), bien: 'Corriente o movimiento.' },
      'La grúa y el clavo usan corriente para atraer; el generador y la linterna producen corriente.', 'Pregunta qué se pone y qué se obtiene en cada aparato.'),
    x('pista-tipo', 'Ata cada explicación a lo que se observa.', { doc: GLOBO, lineas: ['el globo frotado queda cargado', 'la brújula apunta al norte', 'la aguja se mueve cerca de un cable', 'un imán partido sigue siendo imán'],
      ...T(['pasaron electrones', 0, '¿Dónde hubo frotación?'], ['la Tierra es como un imán', 1, '¿Dónde actúa un imán enorme?'], ['la corriente produce magnetismo', 2, '¿Dónde hay un cable?'], ['los polos no se separan', 3, '¿Dónde se parte algo?']), bien: 'Electrones, Tierra, corriente y polos.' },
      'Frotar mueve electrones, la Tierra orienta, la corriente mueve la aguja y los polos van juntos.', 'Busca en el texto la causa de cada observación.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: GLOBO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Un electroimán se puede apagar.',
      ...T(['Al frotar se crea carga nueva.', 2, 'Busca qué no se creó.'], ['Al partir un imán queda un solo polo en cada pedazo.', 5, 'Busca qué tiene cada pedazo.'], ['Solo un imán puede mover una aguja imantada.', 8, 'Busca el hallazgo de Oersted.']), bien: 'No se creó, los dos y un cable.' },
      'La carga solo se movió, cada pedazo tiene dos polos y un cable con corriente movió la aguja.', 'Saca la palabra clave: crea, partir, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GLOBO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Al doble de distancia, la fuerza es cuatro veces menor.', 0, 'Léela junto a la ley de Coulomb.'], ['Una lata de aluminio no se puede separar con un imán.', 1, '¿Qué no atrae un imán?'], ['Si se acercan a la mitad, la fuerza es cuatro veces mayor.', 1, 'Lee la ley al contrario.'], ['El imán del texto es de herradura.', 2, '¿Se dice su forma?']),
      luz: [[2, 'cuatro veces menor'], [4, 'no cobre, aluminio ni plástico']], bien: 'Al contrario y con otro objeto.' },
      'El doble está escrito; el aluminio y la mitad se deducen; la forma no aparece.', 'Aplica lo que dice el texto a un caso distinto.'),
    x('balanza-tesis', 'Hipótesis: «el clavo atrae por la corriente y no porque ya fuera imán». ¿Qué hace cada dato?', { doc: GLOBO, tesis: 'Atrae por la corriente',
      ...F(['Al desconectar la pila, los clips se caen.', 0, '¿Qué pasa al quitar la corriente?'], ['Sin pila, el clavo atrae los mismos clips.', 1, '¿Hizo falta la corriente?'], ['El clavo mide 8 cm.', 2, '¿Dice de dónde viene la atracción?']), bien: 'Quitar la causa la pone a prueba.' },
      'Que se caigan la apoya; que atraiga sin pila la debilita; el largo no pesa.', 'Compara lo que pasa con corriente y sin corriente.'),
    sol('Dos cargas a 2 cm se repelen con fuerza 80. ¿Con qué fuerza se repelen a 8 cm?', ['La distancia se multiplica por [[4]]', 'La fuerza se divide entre [[16]]', 'La nueva fuerza es [[5]]'], ['20', '6', '64'], '$4^2 = 16$ y $80 \\div 16 = 5$.', 'La distancia cuenta al cuadrado.'),
    err('Alguien explica por qué se pega a la pared un globo frotado.', ['Al frotarlo, el globo ganó electrones', 'En la pared, las cargas se acomodan', 'La pared se queda con todos los electrones del globo'], 2, ['La parte positiva queda más cerca y la atracción gana', 'La pared se convierte en un imán', 'El globo pierde su carga al instante'], 'La pared no necesita carga: basta que sus cargas se acomoden.', 'Compara con lo que hacen los pedacitos de papel.'),
    opc('Para hacer más fuerte un electroimán, lo más adecuado es:', ['Cambiar el clavo de hierro por uno de plástico', 'Quitar la pila', 'Dar menos vueltas de alambre', 'Dar más vueltas de alambre'], 3, 'Con más vueltas, la misma corriente produce más magnetismo.', 'Piensa qué cambio aumenta el efecto de la corriente.'),
  ]);

  const TREN = {
    id: 'icf-tren-iman', title: 'El tren que flota',
    paras: [
      'Algunos trenes no ruedan: flotan. Debajo llevan electroimanes, y en la vía hay otros. Al encenderlos con los polos adecuados, el tren queda suspendido a unos centímetros, sin tocar el riel.',
      'Como no hay roce con la vía, casi todo lo que lo frena es el aire. Algunos han pasado de 600 kilómetros por hora en pruebas.',
      'Para avanzar, los electroimanes de la vía cambian de polo muchas veces por segundo: los de adelante atraen al tren y los de atrás lo empujan. Cambiar el polo es fácil: basta invertir el sentido de la corriente.',
      'Para frenar se hace lo contrario. En ese momento los imanes del tren se mueven frente a las bobinas de la vía y producen corriente, que se devuelve a la red.',
      'El problema es el costo. La vía entera lleva bobinas, y algunos modelos usan superconductores: materiales que, muy fríos, no tienen resistencia y conducen corrientes enormes sin calentarse.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: TREN, ...p }, e, { hint: h });
  return mundo('icf-cn-electrico', 'Electricidad y Magnetismo', 'ciencias', [l1, l2], [
    ['icf-cn-electrico-1', 'Sin resistencia, la corriente no calienta.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Por qué es tan veloz?', [2]], ['¿Cómo se invierte un polo?', [3]], ['¿Qué es un superconductor?', [5]]] }, 'La velocidad está en el 2, el polo en el 3 y el superconductor en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-electrico-1', 'La resistencia calienta.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Los superconductores no tienen resistencia.', 0], ['Un cable con resistencia se calienta con mucha corriente.', 1], ['Al frenar, el tren devuelve energía.', 1], ['El tren es de color blanco.', 2]] }, 'El superconductor está escrito; el cable y la energía se deducen; el color no aparece.', 'Piensa qué pasaría si hubiera resistencia.')],
    ['icf-cn-electrico-1', 'Voltaje es corriente por resistencia.', opc('Con el mismo voltaje, si la resistencia de una bobina baja a la cuarta parte, la corriente:', ['Baja a la cuarta parte', 'No cambia', 'Se hace cuatro veces mayor', 'Se duplica'], 2, 'El producto no cambia: cuatro veces menos resistencia es cuatro veces más corriente.', 'Aplica la ley de Ohm con el voltaje fijo.')],
    ['icf-cn-electrico-2', 'Polos distintos se atraen, iguales se repelen.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Una corriente produce magnetismo que se puede prender y apagar.', cards: [['El timbre con electroimán', true], ['La grúa de chatarra', true], ['El imán de la nevera', false], ['Un globo frotado', false]] }, 'Timbre y grúa usan corriente; el de la nevera es permanente y el globo es carga quieta.', 'Busca dónde hay corriente que se enciende.')],
    ['icf-cn-electrico-2', 'Un imán que se mueve produce corriente.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del tren se dice todo esto, EXCEPTO:', cards: [['No roza la vía', [2]], ['Los de adelante lo atraen', [3]], ['Devuelve corriente al frenar', [4]], ['Lleva ruedas de caucho', null]] }, 'Las tres primeras están en el 2, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-electrico-2', 'Imán que se mueve frente a una bobina: inducción.', opc('La corriente que el tren devuelve al frenar se explica por:', ['La inducción', 'La ley de Coulomb', 'El roce con la vía', 'La carga estática'], 0, 'Imanes que se mueven frente a bobinas producen corriente: inducción.', '¿Qué se mueve frente a las bobinas?')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-cts.js
// Preicfes · Ciencias Naturales · mundo 13 «Ciencia y Sociedad» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const VACUNA = {
    id: 'icf-vacuna-pueblo', title: 'El brote de San Roque',
    ficha: { autor: 'Puesto de salud', fuente: 'Boletín escolar', fecha: 'Marzo de 2026' },
    paras: [
      'En San Roque hubo un brote de sarampión. La enfermedad la causa un virus, que se multiplica dentro de las células. Los antibióticos matan bacterias, así que no sirven contra él. Tomarlos por si acaso solo ayuda a que aparezcan bacterias resistentes.',
      'Una vacuna le muestra al cuerpo una parte del virus, o un virus debilitado, para que las defensas aprendan a reconocerlo. Quien se vacuna queda con células de memoria: si el virus llega después, la respuesta es rápida. La vacuna no cura a quien ya está enfermo; previene.',
      'En la escuela había 200 niños vacunados y 50 sin vacunar. Se enfermaron 4 de los vacunados y 20 de los otros. Alguien dijo: «¿Ven? También se enferman los vacunados». Es cierto, pero el riesgo fue muy distinto: 2 de cada 100 frente a 40 de cada 100.',
      'Cuando casi todos están protegidos, el virus no encuentra a quién pasar y se protegen también los que no pueden vacunarse, como los recién nacidos. A eso se le llama inmunidad de grupo. Para el sarampión, que se contagia muchísimo, hace falta que cerca del 95 % esté protegido.',
      'Ninguna medicina es perfecta. La vacuna puede dar fiebre o dolor en el brazo y, muy rara vez, una reacción grave. Antes de usarse se prueba en miles de voluntarios y después se sigue vigilando. Decidir es comparar el riesgo de usarla con el de no usarla: tampoco hacer nada es gratis.',
      'La tecnología también diagnostica. Los rayos X atraviesan la carne y se detienen en el hueso; la ecografía usa sonido; la resonancia, imanes. Cada una sirve para algo distinto y tiene su cuidado: los rayos X, por ejemplo, llevan energía que puede dañar el ADN, y por eso se usan solo lo necesario. Un buen diagnóstico ahorra remedios, tiempo y miedo, pero ninguna imagen reemplaza la conversación con quien atiende.',
    ],
  };
  const l1 = leccion('icf-cn-cts-1', 'Salud y tecnología', guion(
    ['Virus y bacterias', 'El antibiótico mata bacterias, no virus.'],
    ['Vacunas', 'Enseñan a las defensas: previenen, no curan.'],
    ['Riesgo', 'Se compara en proporción, no en cantidad.'],
    ['Tecnología', 'Rayos X, ecografía y resonancia sirven para cosas distintas.']), [
    x('riesgo-grupos', 'De **400** con casco se golpearon **8**; de **50** sin casco, **10**. Completa.', { et: ['riesgo con casco', 'riesgo sin casco', 'veces mayor sin casco', 'con casco, en 1 000'], metas: ['2 %', '20 %', '10', '20'], fichas: ['2 %', '20 %', '10', '20', '8 %', '80', '12'], mira: ['Divide 8 entre 400.', 'Divide 10 entre 50.', 'Compara los dos porcentajes.', 'Saca el 2 % de 1 000.'], trampas: { '0:8 %': 'Son 8 de 400, no de 100.', '2:12': 'Compara dividiendo, no restando otras cantidades.' }, ok: 'Proporción, no cantidad.' },
      '$8 \\div 400 = 2\\%$; $10 \\div 50 = 20\\%$; diez veces; y 20 de cada 1 000.', 'Divide cada caso entre el tamaño de su grupo.'),
    x('genero-o-cita', '¿Serviría un **antibiótico**?', { doc: VACUNA, rot: ['sí serviría', 'no serviría'],
      ...F(['Sarampión', 1, '¿La causa un virus o una bacteria?'], ['Una herida con estafilococos', 0, '¿Es un virus o una bacteria?'], ['Gripa', 1, '¿La causa un virus o una bacteria?'], ['Tuberculosis (bacilo de Koch)', 0, '¿Es un virus o una bacteria?']), bien: 'Solo contra bacterias.' },
      'Sarampión y gripa son virus; la herida y la tuberculosis, bacterias.', 'El antibiótico actúa contra un solo tipo de microbio.'),
    x('pista-tipo', 'Ata cada tecnología a lo que conviene mirar.', { doc: VACUNA, lineas: ['un hueso que pudo romperse', 'un bebé antes de nacer', 'prevenir el sarampión', 'una infección por bacterias'],
      ...T(['rayos X', 0, '¿Qué se detiene en el hueso?'], ['ecografía', 1, '¿Cuál usa sonido y no daña el ADN?'], ['vacuna', 2, '¿Cuál prepara las defensas?'], ['antibiótico', 3, '¿Cuál mata bacterias?']), bien: 'Cada una para lo suyo.' },
      'Rayos X para el hueso, sonido para el bebé, vacuna para prevenir y antibiótico para bacterias.', 'Busca cómo funciona cada una en el texto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: VACUNA, nums: [1, 2, 4], pregunta: 'Queda en pie', queda: 'Vacunarse protege también a otros.',
      ...T(['El antibiótico mata el virus del sarampión.', 2, 'Busca contra qué sirven.'], ['La vacuna cura a quien ya está enfermo.', 6, 'Busca qué hace y qué no.'], ['Para frenar el sarampión basta vacunar a la mitad.', 9, 'Busca el porcentaje.']), bien: 'Bacterias, previene y 95 %.' },
      'Los antibióticos matan bacterias, la vacuna previene y hace falta cerca del 95 %.', 'Saca la palabra clave: virus, cura, mitad.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: VACUNA, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Se enfermaron 20 de los no vacunados.', 0, 'Léela junto a los datos de la escuela.'], ['El riesgo sin vacuna fue veinte veces mayor.', 1, 'Compara 2 y 40 de cada cien.'], ['Con 80 % de vacunados, el sarampión podría seguir pasando.', 1, 'Compara con lo que hace falta.'], ['La escuela tenía doce salones.', 2, '¿Se dice cuántos salones?']),
      luz: [[3, '20 de los otros'], [3, '2 de cada 100 frente a 40 de cada 100'], [4, 'cerca del 95 %']], bien: 'Dividir y comparar.' },
      'Los 20 están escritos; las veinte veces y el 80 % se deducen; los salones no aparecen.', 'Compara entre sí los números que da el texto.'),
    x('balanza-tesis', 'Afirmación: «esta vacuna protege». ¿Qué hace cada dato?', { doc: VACUNA, tesis: 'Esta vacuna protege',
      ...F(['Enfermaron 3 de 1 000 vacunados y 60 de 1 000 sin vacunar.', 0, '¿En qué grupo hubo más riesgo?'], ['Enfermaron 50 de 1 000 en cada grupo.', 1, '¿Hubo diferencia?'], ['El frasco es de vidrio.', 2, '¿Habla de protección?']), bien: 'Comparar grupos iguales.' },
      'La diferencia la apoya; el empate la debilita; el frasco no pesa.', 'Compara el riesgo que hubo en los dos grupos.'),
    sol('De 250 personas con un remedio mejoraron 200; de 250 con un placebo, 120. ¿Cuánto más mejoró el grupo del remedio?', ['Con remedio mejoró el [[80]] %', 'Con placebo, el [[48]] %', 'La diferencia son [[32]] puntos'], ['200', '120', '128'], '$200 \\div 250 = 80\\%$ y $120 \\div 250 = 48\\%$.', 'Divide cada cantidad entre 250.'),
    err('«Se enfermaron 30 vacunados y 20 no vacunados: la vacuna empeora». Había 3 000 vacunados y 100 sin vacunar.', ['Con vacuna: 30 de 3 000, el 1 %', 'Sin vacuna: 20 de 100, el 20 %', 'Como 30 es más que 20, la vacuna empeora'], 2, ['Como 1 % es menos que 20 %, la vacuna protege', 'Como hay más vacunados, no se puede comparar', 'Como 20 es menos que 30, conviene no vacunarse'], 'Los grupos son de distinto tamaño: se comparan los porcentajes.', '¿Se comparan cantidades o proporciones?'),
    opc('A una mujer embarazada le duele el tobillo y el médico prefiere evitar los rayos X. La razón es que:', ['No muestran los huesos', 'Son un sonido muy fuerte', 'Llevan energía que puede dañar el ADN', 'Producen campos magnéticos'], 2, 'Los rayos X pueden dañar el ADN; por eso se usan lo necesario.', 'Relaciona la técnica con su cuidado.'),
  ]);

  const RECURSO = {
    id: 'icf-energia-isla', title: 'La isla que apagó su planta',
    ficha: { autor: 'Grupo de energía', fuente: 'Boletín escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una isla producía su electricidad con una planta de diésel. Cada litro quemado soltaba unos 2.7 kilogramos de dióxido de carbono, además de hollín. El combustible llegaba en barco y, si había mal tiempo, la isla se quedaba a oscuras. Los ancianos contaban que, en las noches de tormenta, el puesto de salud guardaba las vacunas en neveras con hielo.',
      'Los habitantes estudiaron otras fuentes. El sol alcanza, pero de noche no hay; el viento sopla más en la tarde y algunos días falta. Las dos son renovables y no sueltan gases mientras funcionan, aunque fabricar los paneles y las baterías sí tiene un costo ambiental: hay que sacar minerales y, al final, reciclarlos.',
      'Decidieron instalar paneles y turbinas, guardar energía en baterías y dejar el diésel para emergencias. Al primer año, el consumo de combustible bajó de 900 a 300 mil litros. En el segundo, a 180 mil. La factura bajó, pero la inversión tardará nueve años en pagarse.',
      'El dióxido de carbono y el metano dejan pasar la luz del sol y retienen parte del calor que sale de la Tierra. Es el efecto invernadero, y sin él el planeta sería helado. El problema es que hoy hay más gases de los que había y el calor retenido aumenta.',
      'También revisaron la basura. La mitad era materia orgánica, que hicieron compost. El plástico se redujo con envases que se devuelven: reducir y reutilizar ahorra más que reciclar, porque reciclar también gasta energía. Las pilas se guardan aparte: tienen metales que contaminan el agua y el suelo.',
      'Un grupo se opuso a las turbinas: temía por las aves. En vez de discutir a ciegas, contaron aves durante un año y cambiaron de lugar dos turbinas. Murieron muchas menos. La solución no fue parar ni seguir igual, fue medir y corregir. Hoy publican cada mes el conteo en la puerta de la escuela.',
    ],
  };
  const l2 = leccion('icf-cn-cts-2', 'Recursos y ambiente', guion(
    ['Fuentes de energía', 'Renovables o no; todas tienen costos.'],
    ['Efecto invernadero', 'Es necesario; el problema es que aumenta.'],
    ['Residuos', 'Reducir y reutilizar antes que reciclar.'],
    ['Medir y corregir', 'Las decisiones mejoran con datos.']), [
    x('compensa-justo', 'Una familia suelta **1 200 kg** de CO₂ al año con su moto. Cada árbol adulto absorbe **20 kg** al año. Mueve cuántos árboles la **compensan**.', { gasta: 1200, cada: 20, max: 100, et: 'árboles', u: 'kg' },
      'Lo que suelta entre lo que absorbe cada uno: $1\\,200 \\div 20 = 60$.', 'Divide lo que se suelta entre lo que absorbe cada uno.'),
    x('genero-o-cita', '¿La fuente es **renovable** o **no renovable**?', { doc: RECURSO, rot: ['renovable', 'no renovable'],
      ...F(['Viento', 0, '¿Se repone pronto?'], ['Diésel', 1, '¿Se repone pronto?'], ['Sol', 0, '¿Se repone pronto?'], ['Carbón', 1, '¿Se repone pronto?'], ['Corriente de un río', 0, '¿Se repone pronto?']), bien: 'Cada día o en millones de años.' },
      'Viento, sol y ríos se reponen; diésel y carbón tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('lee-escala', 'La gráfica muestra el diésel (en miles de litros) antes, al primer año y al segundo. Pon cada valor y cuánto **bajó** en total.', { vals: [900, 300, 180], rot: ['antes', 'año 1', 'año 2'], hi: 960, st: 120, et: ['antes', 'año 1', 'año 2', 'bajó'], ops: ['', '', ''], metas: ['900', '300', '180', '720'], fichas: ['900', '300', '180', '720', '880', '250', '1080'],
      mira: ['Está a mitad de camino entre 840 y 960.', 'Está a mitad de camino entre 240 y 360.', 'Está a mitad de camino entre 120 y 240.', 'Resta el último al primero.'], trampas: { '1:250': 'Cada línea vale 120: la mitad son 60.', '3:1080': 'Eso es la suma.' }, ok: 'De 900 a 180.' },
      'Las líneas van de 120 en 120: 900, 300 y 180. Bajó 720 mil litros.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pinta-tipos', 'Pinta cada dato con lo que muestra de la decisión.', { doc: RECURSO, plumas: ['ventaja', 'costo', 'corrección'],
      ...P(['El diésel bajó a 180 mil litros.', 0, '¿Mejora, cuesta o ajusta?'], ['La inversión tardará nueve años en pagarse.', 1, '¿Mejora, cuesta o ajusta?'], ['Cambiaron de lugar dos turbinas.', 2, '¿Mejora, cuesta o ajusta?'], ['Fabricar baterías exige sacar minerales.', 1, '¿Mejora, cuesta o ajusta?']), bien: 'Mejora, cuesta y ajusta.' },
      'Menos diésel es ventaja; pagar y sacar minerales, costos; mover turbinas, corrección.', 'Pregunta qué se gana, qué se paga y qué se arregló.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: RECURSO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Medir ayudó a cuidar las aves.',
      ...T(['Los paneles no tienen ningún costo ambiental.', 2, 'Busca qué pasa al fabricarlos.'], ['Sin efecto invernadero estaríamos mejor.', 4, 'Busca cómo sería el planeta.'], ['Reciclar es siempre lo primero que hay que hacer.', 8, 'Busca qué ahorra más.']), bien: 'Fabricar, helado y reducir.' },
      'Fabricar paneles cuesta, sin efecto invernadero sería helado y reducir ahorra más que reciclar.', 'Saca la palabra clave: ningún, sin, primero.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECURSO, filas: [{ antes: 'El diésel quedó para', topes: ['uso diario', 'vender', 'emergencias'], va: 2 }, { antes: 'Las pilas se guardan aparte porque', topes: ['pesan mucho', 'tienen metales que contaminan', 'son caras'], va: 1 }, { antes: 'De la basura, la materia orgánica era', topes: ['la mitad', 'la décima parte', 'toda'], va: 0 }], mira: ['Relee qué decidieron.', 'Relee el final del párrafo 5.', 'Relee el comienzo del párrafo 5.'], luz: [[3, 'para emergencias'], [5, 'metales que contaminan'], [5, 'La mitad era materia orgánica']], bien: 'Emergencias, metales y la mitad.' },
      'El diésel quedó para emergencias, las pilas tienen metales y la mitad era orgánica.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Propuesta: «cambiar todos los buses por eléctricos». ¿Qué hace cada dato?', { doc: RECURSO, tesis: 'Cambiar todos los buses por eléctricos',
      ...F(['La ciudad respiraría 40 % menos hollín.', 0, '¿Es una razón a favor?'], ['Su electricidad viene casi toda de quemar carbón.', 1, '¿Cuánto bajarían de verdad los gases?'], ['Los buses son azules.', 2, '¿Cambia la decisión?']), bien: 'Mirar también de dónde sale la energía.' },
      'Menos hollín la apoya; el carbón la debilita; el color no pesa.', 'Pregunta qué se gana y de dónde sale la energía.'),
    sol('La isla bajó de 900 a 300 mil litros de diésel y cada litro suelta 2.7 kg de CO₂.', ['Dejó de quemar [[600]] mil litros', 'Evitó $600 \\cdot 2.7 =$ [[1620]] mil kg', 'Son [[1620 toneladas]]'], ['300', '810', '16.2 toneladas'], '1 620 mil kilogramos son 1 620 toneladas.', 'Multiplica los litros que dejó de quemar.'),
    err('Alguien explica el calentamiento global.', ['El CO₂ deja pasar la luz del sol', 'Retiene parte del calor que sale de la Tierra', 'Por eso el efecto invernadero es un invento dañino que no debería existir'], 2, ['Por eso, si los gases aumentan, aumenta el calor retenido', 'Por eso, si los gases aumentan, la Tierra se enfría', 'Por eso, sin gases la Tierra estaría más caliente'], 'El efecto invernadero es natural y necesario; el problema es su aumento.', '¿Cómo sería el planeta sin él?'),
    opc('Una familia quiere reducir al máximo su basura plástica. Lo más efectivo es:', ['Comprar más plástico reciclable', 'Usar envases que se devuelven y comprar a granel', 'Quemar el plástico', 'Mezclarlo con lo orgánico'], 1, 'Reducir y reutilizar ahorra más que reciclar.', 'Piensa qué evita que el residuo aparezca.'),
  ]);

  const EVID = {
    id: 'icf-pulsera', title: 'La pulsera milagrosa',
    ficha: { autor: 'Club de ciencias', fuente: 'Boletín escolar', fecha: 'Mayo de 2026' },
    paras: [
      'Una página vendía una pulsera de cobre «con energía» que quitaba el dolor de rodilla. Mostraba a un deportista famoso, treinta testimonios y una frase: «probado científicamente». No decía dónde ni cómo. El club decidió revisar la afirmación. No querían burlarse de nadie: querían saber si era cierto.',
      'Un testimonio cuenta lo que le pasó a una persona. Puede ser sincero y no probar nada: el dolor sube y baja solo, y quien espera mejorar suele sentirse mejor. Eso último se llama efecto placebo. Además, la página mostraba a los que mejoraron, no a los que siguieron igual.',
      'Para saberlo hicieron un experimento con 60 voluntarios. A 30, escogidos al azar, les dieron la pulsera; a los otros 30, una idéntica de plástico pintado. Ni ellos ni quien les preguntaba por el dolor sabían cuál tenían: eso es doble ciego. Después de un mes mejoraron 17 con la de cobre y 16 con la de plástico.',
      'La diferencia es tan pequeña que puede deberse al azar. Los dos grupos mejoraron, pero por igual. El club no dijo «está demostrado que no sirve jamás»; dijo que, con ese experimento, no hay evidencia de que la pulsera funcione mejor que una falsa.',
      'En ciencia, un solo estudio casi nunca cierra un tema. Se repite, lo revisan otros expertos, se juntan muchos estudios. También importa quién paga: si lo paga quien vende el producto, hay que mirar con más cuidado. No significa que sea falso, significa que hay que pedir los datos.',
      'Decidir con evidencia no es dejar de lado los valores. La ciencia puede decir cuánto contamina una mina o cuánto protege un casco; si se permite la mina o se exige el casco lo decide la sociedad, mirando también quién gana, quién pierde y qué le importa. Pero decidir contra los datos, o sin ellos, sale caro.',
    ],
  };
  const l3 = leccion('icf-cn-cts-3', 'Decisiones con evidencia', guion(
    ['Testimonio no es prueba', 'El dolor varía solo y existe el placebo.'],
    ['Buen experimento', 'Grupos al azar, control y doble ciego.'],
    ['Más de un estudio', 'Se repite y lo revisan otros.'],
    ['Datos y valores', 'La ciencia informa; la sociedad decide.']), [
    x('solida-o-no', '¿La evidencia es **más sólida** o **más débil**?', { et: ['treinta testimonios', 'experimento con control', 'veinte estudios juntos', '«lo dijo un famoso»'], metas: ['más débil', 'más sólida', 'más sólida', 'más débil'], fichas: ['más débil', 'más sólida', 'más sólida', 'más débil', 'más débil', 'más sólida'], mira: ['¿Con qué se comparan?', '¿Se compara con otro grupo?', '¿Coinciden muchos estudios?', '¿La fama es una prueba?'], ok: 'Comparar y repetir.' },
      'Comparar con un control y juntar estudios es sólido; testimonios y fama, no.', 'Pregunta si hubo comparación y si se repitió.'),
    x('buena-evidencia', 'Se quiere probar si un té ayuda a dormir. Toca **todo** lo que hace **mejor** el experimento.', { casos: [{ t: 'repartir los grupos al azar', si: true }, { t: 'que cada quien escoja su grupo', no: 'Así los grupos quedan distintos desde el comienzo.' }, { t: 'dar al otro grupo un té parecido, falso', si: true }, { t: 'contar solo a los que mejoraron', no: 'Así se esconde a quienes siguieron igual.' }, { t: 'que nadie sepa quién toma cuál', si: true }], falta: 'Falta otra que evita que los grupos se distingan.', ok: 'Azar, control y doble ciego.' },
      'Azar, control y doble ciego dejan que solo cambie el té.', 'Busca lo que hace que los grupos sean iguales en lo demás.'),
    x('pasos-del-proceso', 'Ordena cómo el club revisó la afirmación. El primer paso está en su puesto.', { doc: EVID, que: 'la revisión', de: 'La pulsera milagrosa', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Leen la afirmación de la página.', 'Reparten a los voluntarios al azar.', 'Dan pulseras iguales, una falsa.', 'Cuentan cuántos mejoran.', 'Comparan los dos grupos.'], mira: ['', 'Va antes de dar las pulseras.', 'Va después de repartir.', 'Va después del mes.', 'Es lo último: con los dos conteos.'], bien: 'Leer, repartir, dar, contar y comparar.' },
      'Leen, reparten al azar, dan las pulseras, cuentan y comparan.', 'Pregunta qué necesitaban tener antes de cada paso.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVID, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Quien espera mejorar suele sentirse mejor.',
      ...T(['Un testimonio sincero es una prueba.', 1, 'Busca la palabra sincero.'], ['El club demostró que la pulsera no sirve jamás.', 6, 'Busca qué no dijo el club.'], ['Un solo estudio basta para cerrar un tema.', 7, 'Busca cuánto vale un solo estudio.']), bien: 'No prueba, no dijo y casi nunca.' },
      'Un testimonio puede ser sincero y no probar, el club no dijo «jamás» y un estudio casi nunca cierra un tema.', 'Saca la palabra clave: sincero, jamás, solo.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica el **doble ciego**.', { doc: EVID, nums: [3], apuesta: 'Nadie sabía cuál pulsera era cuál.', ...S(['3.2'], { '3.0': 'Dice cuántas personas participaron.', '3.1': 'Dice cómo se repartieron las pulseras.', '3.3': 'Da el resultado.' }), bien: 'Ni ellos ni quien preguntaba.' },
      'La tercera oración: ni ellos ni quien les preguntaba sabían cuál tenían.', 'Busca la oración que dice quién no sabía.'),
    x('genero-o-cita', '¿Es una pregunta para **la ciencia** (datos) o para **la sociedad** (valores)?', { doc: EVID, rot: ['la ciencia', 'la sociedad'],
      ...F(['¿Cuánto mercurio hay en el río?', 0, '¿Se responde midiendo?'], ['¿Debe permitirse la mina?', 1, '¿Se responde solo midiendo?'], ['¿Cuánto baja el casco las lesiones?', 0, '¿Se responde midiendo?'], ['¿Es justo cobrar por entrar al parque?', 1, '¿Se responde solo midiendo?']), bien: 'Medir o decidir.' },
      'El mercurio y las lesiones se miden; permitir y cobrar también dependen de valores.', 'Pregunta si bastaría con medir para responder.'),
    x('sube-evidencia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Mejoraron **33** de **50** voluntarios. ¿Qué **porcentaje** es?', r: 66, c: '33 \\div 50 \\cdot 100', e: { 34: 'Ese es el que no mejoró.' } },
      { q: 'En **5** estudios de **80** personas cada uno, mejoró el **25 %**. ¿Cuántas personas **mejoraron**?', r: 100, c: '400 \\cdot 0.25', e: { 20: 'Esas son las de un solo estudio.' } },
      { q: 'Con remedio mejoró el **70 %** y con placebo, el **42 %**. ¿Cuántos **puntos** de diferencia?', r: 28, c: '70 - 42', e: { 70: 'También mejoró el grupo del placebo.' } }] },
      '$33 \\div 50 = 66\\%$; el 25 % de 400 son 100; y $70 - 42 = 28$.', 'El efecto del remedio es lo que supera al placebo.'),
    sol('Con la pulsera de cobre mejoraron 17 de 30 y con la falsa, 16 de 30. ¿Qué se concluye?', ['La diferencia es de [[1]] persona', 'En porcentaje son unos [[3]] puntos', 'La diferencia puede deberse [[al azar]]'], ['17', '33', 'a la pulsera'], '$1 \\div 30$ es cerca del 3 %: muy poco para 60 personas.', 'Resta y compara con los 30 de cada grupo.'),
    err('Un anuncio dice que una crema «funciona» porque 8 de cada 10 clientas que la siguen comprando la recomiendan.', ['8 de cada 10 la recomiendan', 'Se preguntó solo a quienes siguieron comprándola', 'Entonces funciona para cualquier persona'], 2, ['Entonces no se sabe: faltan quienes la dejaron y un grupo de control', 'Entonces funciona para 2 de cada 10', 'Entonces no funciona para nadie'], 'Solo se oyó a quienes siguieron: la muestra está sesgada y no hay control.', '¿A quién no se le preguntó?'),
    opc('Un estudio pagado por una fábrica de gaseosas concluye que el azúcar no afecta el peso. Lo más razonable es:', ['Aceptarlo, porque es un estudio', 'Decir que es falso, porque lo pagó la fábrica', 'Creerle solo si lo dice un famoso', 'Revisar los datos y compararlo con otros estudios'], 3, 'El interés no prueba que sea falso, pero obliga a pedir los datos y comparar.', 'Evita aceptar o rechazar sin mirar.'),
  ]);

  const AGUA = {
    id: 'icf-filtro', title: 'El filtro de barro',
    paras: [
      'En la vereda El Cedro muchos niños tenían diarrea. Un análisis encontró bacterias en el agua del pozo. Un grupo propuso filtros de barro con una capa de plata, que detienen y matan bacterias.',
      'Antes de comprarlos para todos hicieron una prueba. De 100 casas, 50 escogidas al azar recibieron el filtro. A los tres meses hubo diarrea en 6 de esas casas y en 21 de las otras.',
      'También midieron el agua: antes tenía 80 colonias de bacterias por cada 100 mililitros; filtrada, 2. El filtro no quita sales ni metales, así que no sirve para un agua contaminada por una mina.',
      'Cada filtro cuesta 60 mil pesos y dura tres años si se lava cada mes. Hervir el agua también mata las bacterias, pero gasta leña, y la leña se saca del bosque que protege el pozo.',
      'La vereda decidió comprar filtros para todos y cercar el pozo, porque por ahí entraban los animales. «El filtro limpia el agua», dijo la promotora, «la cerca evita que se ensucie».',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: AGUA, ...p }, e, { hint: h });
  return mundo('icf-cn-cts', 'Ciencia y Sociedad', 'ciencias', [l1, l2, l3], [
    ['icf-cn-cts-1', 'Las bacterias del agua enferman.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuántas casas enfermaron?', [2]], ['¿Qué no quita el filtro?', [3]], ['¿Para qué la cerca?', [5]]] }, 'Las casas están en el 2, lo que no quita en el 3 y la cerca en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-cts-1', 'El riesgo se compara en proporción.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Hubo diarrea en 21 de las casas sin filtro.', 0], ['El riesgo con filtro fue del 12 %.', 1], ['Si el agua tuviera mercurio, el filtro no bastaría.', 1], ['El pozo tiene diez metros.', 2]] }, 'Las 21 están escritas; el 12 % y el mercurio se deducen; la hondura no aparece.', 'Divide y usa lo que el filtro no quita.')],
    ['icf-cn-cts-1', 'Comparar dos grupos.', opc('Hubo diarrea en 6 de 50 casas con filtro y en 21 de 50 sin filtro. El riesgo con filtro, frente al de sin filtro, fue:', ['3.5 veces menor', '15 veces menor', 'Igual', '3.5 veces mayor'], 0, '$21 \\div 6 = 3.5$, y los grupos son iguales.', 'Compara 6 de 50 con 21 de 50.')],
    ['icf-cn-cts-2', 'Evitar la contaminación es mejor que limpiarla.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Es mejor evitar un daño que arreglarlo después.', cards: [['Cercar el nacimiento de un río', true], ['Usar menos bolsas en vez de recogerlas del mar', true], ['Limpiar el derrame cuando ya ocurrió', false], ['Medir el largo de un puente', false]] }, 'Cercar y usar menos evitan; limpiar llega después y medir no tiene que ver.', 'Busca lo que actúa antes de que aparezca el daño.')],
    ['icf-cn-cts-2', 'Toda solución tiene costos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del filtro se dice todo esto, EXCEPTO:', cards: [['Lleva una capa de plata', [1]], ['No quita sales', [3]], ['Dura tres años si se lava', [4]], ['Funciona con electricidad', null]] }, 'Las tres primeras están en el 1, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-cts-2', 'Lo que pasa en un lugar afecta a otro.', opc('En una vereda, la leña se corta en el bosque que rodea el pozo. Hervir el agua con leña puede ser un problema a largo plazo porque:', ['No mata las bacterias', 'Agrega metales al agua', 'Acaba el bosque que protege el pozo', 'Enfría el agua'], 2, 'La leña se saca del bosque que protege el pozo.', 'Sigue de dónde sale la leña.')],
    ['icf-cn-cts-3', 'Grupos al azar y control.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 5], options: ['Probaron el filtro en la mitad de las casas, al azar.', 'Decidieron limpiar y también prevenir.', 'Dieron el filtro a quien lo pidió primero.', 'Decidieron no hacer nada.'], key: [0, 1] }, 'El 2 cuenta la prueba; el 5, la decisión; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-cts-3', 'Del problema a la decisión.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['plantea el problema y una salida', 'describe la prueba', 'muestra alcances y límites', 'compara costos', 'cuenta la decisión', 'enseña a nadar'], key: [0, 1, 2, 3, 4] }, 'Problema, prueba, límites, costos y decisión; nadar no aparece.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-cts-3', 'Al azar, para que los grupos sean iguales.', opc('Escoger al azar las casas que recibieron el filtro sirvió para:', ['Gastar menos', 'Que todos quedaran contentos', 'Usar menos plata', 'Que los dos grupos se parecieran en lo demás'], 3, 'Al azar, lo único distinto entre los grupos es el filtro.', 'Piensa qué pasaría si cada quien escogiera.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-avisos.js
// Preicfes · Inglés · mundo 1 «Avisos y Vocabulario» (spec 2026-11-20-curso-preicfes): las primeras partes de la prueba de inglés:
// qué dice un aviso, dónde se vería y qué palabra corresponde a una descripción. Las instrucciones van en español, como en el
// examen; los textos, en inglés. Cada lección trabaja un texto original en 7 juegos LEC y un juego en movimiento; la evaluación,
// otros avisos con preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg } = ICF;

  const AVISOS = {
    id: 'icf-avisos', title: 'Notices around town',
    paras: [
      'SCHOOL LIBRARY. Please return books by Friday. Students who return books late cannot borrow new ones for two weeks. If you need more time, ask the librarian before the date on your card.',
      'CITY PARK. No cycling on the grass. Bicycles must stay on the path, and dogs must be on a lead at all times. The park closes at 7 p.m. from November to February.',
      'DANGER: WET FLOOR. The cleaning team is working in this area. Please use the stairs on the left until the floor is dry. Thank you for your patience.',
      'SCIENCE MUSEUM. Free entry for students on Wednesdays. Show your student card at the ticket office. Groups of more than ten people must book their visit one week before.',
      'BUS STATION. The 8:15 bus to the airport is cancelled today because of the storm. Passengers can take the 9:00 bus with the same ticket. We are sorry for any problems this may cause.',
      'LOST AND FOUND. Did you lose a blue jacket in the gym on Monday? Come to the main office before 3 p.m. and describe it to collect it. Things that nobody collects go to charity after one month.',
    ],
  };

  const MERCADO = {
    id: 'icf-mercado', title: 'Saturday at the market',
    ficha: { autor: 'Students of an English class', fuente: 'School magazine', fecha: 'June 2026' },
    paras: [
      'Every Saturday morning, the main square of San Rafael changes. At six o\'clock, farmers from the mountains arrive in old trucks full of potatoes, oranges, cheese and fresh flowers. By seven, the square is full of tables, voices and the smell of coffee.',
      'Doña Rosa has sold vegetables here for thirty years. She grows everything on her small farm, two hours away, without chemicals. "People come back because they know where their food comes from," she says. Her daughter Camila helps her now, and she uses a phone to take payments, so customers do not need cash.',
      'Next to them, a young baker called Julián sells bread made with corn and cheese. He started with one basket two years ago. Now he bakes three hundred pieces every Friday night, and he usually sells everything before ten o\'clock.',
      'The market is not only a place to shop. Children run between the tables, old friends meet for breakfast, and on the first Saturday of the month a band plays music in the square. For many families, it is the most important day of the week.',
      'However, life is not easy for the farmers. Transport is expensive, and when it rains the roads become dangerous. Some young people prefer to move to the city. "If nobody buys from us, the farms will disappear," Doña Rosa explains. That is why the town council now gives free stalls to farmers who come every week.',
    ],
  };

  const l1 = leccion('icf-en-avisos-1', 'Signs and notices', [
    sc(6, 'La prueba de inglés empieza con avisos cortos: hay que saber **qué dicen** y **dónde se verían**. No hace falta entender cada palabra, sino la idea.', { title: 'Avisos cortos' }),
    sc(7, 'Las palabras que mandan: **No** + verbo en -ing prohíbe («No smoking»); **must** obliga («You must wear a helmet»); **Please** pide con cortesía («Please close the door»).', { title: 'Prohibir, obligar, pedir' }),
    sc(7, 'Ejemplo: «Staff only» quiere decir «solo empleados»: no se puede entrar si no trabajas allí. «Out of order» quiere decir «no funciona».', { title: 'Avisos que se repiten' }),
    sc(7, 'Las palabras de tiempo cambian todo: «until» (hasta), «before» (antes de), «after» (después de), «from … to …» (de … a …).', { title: 'Hasta, antes, después' }),
    sc(6, 'Truco del examen: lee la opción y vuelve al aviso. Una opción que agrega algo que el aviso no dice es incorrecta, aunque suene lógica.', { title: 'Volver al aviso' }),
  ], [
    x('donde-mirar', 'Where can you read this? Lleva cada pregunta al aviso donde la buscarías.', { doc: AVISOS,
      ...F(['When can a student go in for free?', 3, 'Busca el lugar que cobra entrada.'], ['Where can I ride my bike?', 1, 'Busca un lugar al aire libre.'], ['What can I do if my bus does not leave?', 4, 'Busca el lugar de donde salen los viajes.']),
      luz: [[2, 'Bicycles must stay on the path'], [4, 'Free entry for students on Wednesdays'], [5, 'Passengers can take the 9:00 bus']], bien: 'The first words say the place.' },
      'Las primeras palabras de cada aviso dicen el lugar: museo (free entry), parque (bike) y estación (bus).', 'Lee solo el lugar con el que empieza cada aviso y piensa qué se hace ahí.'),
    x('genero-o-cita', 'Is it a **rule** you must follow or just **information**?', { doc: AVISOS, rot: ['a rule', 'information'],
      ...F(['Dogs must be on a lead', 0, 'Mira el verbo: «must», ¿cuenta u obliga?'], ['The park closes at 7 p.m.', 1, '¿Te pide hacer algo o te dice una hora?'], ['No cycling on the grass', 0, '«No» + «-ing», ¿informa o prohíbe?'], ['The 8:15 bus is cancelled', 1, '¿Te pide hacer algo o te cuenta lo que pasa?'], ['Please return books by Friday', 0, '«Please» + verbo, ¿cuenta algo o pide algo?']), bien: '«Must», «no -ing» and «please» tell you what to do.' },
      '«Must», «No cycling» y «Please return» piden u obligan; «closes» y «is cancelled» solo dan información.', 'Fíjate en el verbo: ¿le dice al lector qué hacer o le cuenta algo?'),
    x('sella-parrafo', 'All these things are in the notices, **EXCEPT**: Ata cada opción a su aviso.', { doc: AVISOS,
      ...T(['Use a different way because the floor is wet', 2, 'Busca «stairs» y «dry».'], ['Describe a jacket to get it back', 5, 'Busca «lost» y «collect».'], ['Book early if your group is big', 3, 'Busca «groups» y «ten people».'], ['Buy food at the museum', 6, 'El museo está. ¿Dice algo de comida?']),
      luz: [[3, 'use the stairs on the left'], [4, 'Groups of more than ten people'], [6, 'describe it to collect it']], bien: 'The option with no notice is the answer.' },
      'El piso mojado está en el aviso 3, la chaqueta en el 6 y los grupos en el 4; de comida no hay nada.', 'Busca la acción de cada opción, no solo el lugar que nombra.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: AVISOS, frases: [[1, 'Please ', 'return', ' books by Friday'], [2, 'The park ', 'closes', ' at 7 p.m.'], [6, 'Things that nobody ', 'collects', ' go to charity']],
      ...F(['give back', 0, 'What do you do with a library book at the end?'], ['shuts', 1, 'At 7 p.m. you cannot go in any more: what happens?'], ['picks up', 2, 'What does the owner do with a lost thing?'], ['buy', null, 'In a library you do not pay for the books.'], ['starts', null, 'It is the end of the day, not the beginning.']), bien: 'Same meaning, different word.' },
      '«Return» es «give back», «close» es «shut» y «collect» es «pick up»: la oración dice lo mismo.', 'Pon cada palabra en la oración y mira si el aviso sigue pidiendo lo mismo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: AVISOS, nums: [4, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Students need a card for free entry.', 0, 'Léela junto a «Show your student card».'], ['On Mondays students pay to enter.', 1, 'Si es gratis los miércoles, ¿qué pasa otro día?'], ['The old ticket is good for the 9:00 bus.', 0, 'Léela junto a «with the same ticket».'], ['The 9:00 bus is more expensive.', 2, 'Busca si el aviso habla de precios.']),
      luz: [[4, 'Show your student card'], [4, 'on Wednesdays'], [5, 'with the same ticket']], bien: 'Written, deduced or not there.' },
      'La tarjeta y el tiquete están escritos; lo del lunes se deduce; el precio del bus de las 9 no aparece.', 'Busca primero si está escrito. Si no, pregunta qué frase del aviso te lleva a esa idea.'),
    x('voz-de-la-fuente', 'Where can you see these notices? Átalos.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: AVISOS, portadas: [['In a hospital', 'place'], ['In a swimming pool', 'place'], ['In a restaurant', 'place'], ['In a classroom', 'place']],
      ...T(['Please turn off your phone near the patients', 0, 'Busca a quién hay que cuidar.'], ['Shower before you get in the water', 1, 'Busca dónde te mojas.'], ['Ask the waiter for the menu', 2, 'Busca quién trabaja ahí.'], ['Clean the board after the lesson', 3, 'Busca qué objeto se limpia.']), bien: 'One word shows the place.' },
      '«Patients», «water», «waiter» y «board» delatan el lugar: hospital, piscina, restaurante y salón.', 'En cada aviso hay una palabra que solo tiene sentido en un lugar. Encuéntrala.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: AVISOS, nums: [1, 2, 6], pregunta: 'It is true', queda: 'The library, the park and the office have rules about time.',
      ...T(['If you are late, you can borrow more books.', 2, 'Busca «late» y «borrow».'], ['You can ride on the grass.', [5, 6], 'Busca «cycling» o «bicycles».'], ['Lost things stay in the office for ever.', 11, 'Busca «one month».']), bien: 'One sentence is enough to say no.' },
      'Quien devuelve tarde no puede prestar, no se puede montar en el pasto y lo no reclamado se dona al mes.', 'Busca la palabra clave de cada frase y lee completa la oración donde está.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are not important to understand the notices.', { doc: AVISOS, lineas: ['Return books on time.', 'The jacket is blue.', 'Keep bikes on the path.', 'Students enter the museum free on Wednesdays.', 'There is a storm today.', 'Lost things are in the main office.'], ...S([1, 4], { 0: 'It is the rule of the library.', 2: 'It is the rule of the park.', 3: 'It is the offer of the museum.', 5: 'It says where to go.' }), bien: 'Rules and places stay; details go.' },
      'El color de la chaqueta y la tormenta son detalles; las reglas y los lugares son el mensaje del aviso.', 'Pregunta qué necesita saber quien lee el aviso para saber qué hacer.'),
  ]);

  const l2 = leccion('icf-en-avisos-2', 'Words and meanings', [
    sc(6, 'Otra parte del examen da una **descripción** en inglés y pide la palabra: «This person makes bread» → «baker».', { title: 'De la descripción a la palabra' }),
    sc(7, 'Las profesiones se reconocen por lo que la persona **hace**: «a farmer grows food», «a nurse helps doctors», «a driver takes you from one place to another».', { title: 'Lo que hace cada uno' }),
    sc(7, 'En un texto, «he», «she», «it» y «they» apuntan a algo dicho antes. Ejemplo: «My aunt has a dog. She walks it every day»: «she» es la tía y «it» el perro.', { title: 'He, she, it, they' }),
    sc(7, 'Una palabra se entiende por su oración: en «the roads become dangerous», «dangerous» tiene que ser algo malo que causa la lluvia.', { title: 'El contexto ayuda' }),
    sc(6, 'Palabras que cambian el sentido: «however» (sin embargo), «because» (porque), «so» (así que), «but» (pero).', { title: 'Bisagras en inglés' }),
  ], [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: MERCADO, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['a market day', 0, 'Read the title again: which word names the topic?'], ['describe a place', 1, 'Who writes it, and why would they write for a school magazine?'], ['a magazine article', 2, 'Look at the source.'], ['a football match', null, 'There is no sport in the title.'], ['sell a car', null, 'A school magazine is not for that.'], ['a poem', null, 'The source and the authors do not say that.']),
      luz: [[1, 'the main square of San Rafael changes'], [4, 'The market is not only a place to shop']], bien: 'Title, author and source gave it away.' },
      'El título habla de un mercado y la fuente es una revista escolar: un artículo que describe un lugar.', 'Lee por separado el título, quién escribe y dónde se publica.'),
    x('voz-de-la-fuente', 'Match each description with its word. Átalas.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: MERCADO, portadas: [['basket', 'a thing'], ['farmer', 'a person'], ['square', 'a place'], ['cash', 'a thing']],
      ...T(['You carry bread or fruit in it', 0, 'Is it a person, a place or a thing?'], ['This person grows food', 1, 'Is it a person, a place or a thing?'], ['An open place in the middle of a town', 2, 'Is it a person, a place or a thing?'], ['Coins and notes', 3, 'You use it to pay: what is it?']), bien: 'First the kind of word, then the meaning.' },
      '«You carry… in it» es un objeto, «this person» una persona, «an open place» un lugar; monedas y billetes, «cash».', 'Decide primero si la descripción es de una persona, un lugar o una cosa.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: MERCADO, frases: [[2, 'so customers do not ', 'need', ' cash'], [3, 'He ', 'started', ' with one basket'], [4, 'old friends ', 'meet', ' for breakfast']],
      ...F(['have to use', 0, 'They can pay with a phone: what is not necessary?'], ['began', 1, 'It was the first thing he did two years ago.'], ['get together', 2, 'What do friends do when they eat with each other?'], ['finished', null, 'He still works: it is not the end.'], ['sell', null, 'Friends are there to eat, not to do business.']), bien: 'Same meaning in the same place.' },
      '«Need» es «have to use», «start» es «begin» y «meet» es «get together»: la oración no cambia.', 'Pon cada opción en la oración y léela entera antes de decidir.'),
    x('tira-referente', 'What do these words refer to? Átalas.', { doc: MERCADO, texto: 'Next to |the farmers|, |a young baker| called Julián sells |bread| made with corn. He started with |one basket|, and now he bakes it every Friday night.',
      ...T(['«He»', 1, 'Put it in the sentence: who started?'], ['«it»', 2, 'Put it in the sentence: what can you bake?']), bien: '«He» is a person; «it» is a thing.' },
      '«He» apunta a una persona, el panadero; «it» apunta a lo que se hornea, el pan.', '«He» es para un hombre y «it» para una cosa. Prueba cada opción en la oración.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: MERCADO,
      ...F(['shows how the day begins', 0, 'Look for the hours of the morning.'], ['presents a farmer', 1, 'Look for a woman and her vegetables.'], ['presents a baker', 2, 'Look for bread and Friday nights.'], ['says why the market is special', 3, 'Look for music and old friends.'], ['explains a problem and a help', 4, 'Look for «However».'], ['gives a recipe', null, 'Nobody explains how to cook something.']),
      luz: [[1, 'At six o\'clock'], [2, 'vegetables'], [5, 'However']], bien: 'Beginning, two people, what makes it special and a problem.' },
      'El texto muestra cómo empieza el día, presenta a dos personas, dice qué lo hace especial y cierra con un problema.', 'Lee la primera oración de cada párrafo y pregunta para qué sirve.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: MERCADO, rot: ['before', 'now', 'the future'],
      ...F(['He had one basket', 0, 'Is the verb in the past or in the present?'], ['He bakes three hundred pieces', 1, 'Look at the word «Now».'], ['He sells everything before ten', 1, 'Look at the word «usually».'], ['Farms will disappear if nobody buys', 2, 'Look at the word «will».']),
      luz: [[3, 'He started with one basket two years ago'], [3, 'Now he bakes'], [5, 'the farms will disappear']], bien: 'The verb tells you when.' },
      '«Started» está en pasado, «bakes» y «sells» en presente y «will disappear» en futuro: el verbo dice cuándo.', 'Mira el verbo y palabras como «ago», «now» o «will».'),
    x('pista-tipo', 'Match each clue with its sentence.', { doc: MERCADO, lineas: ['By seven, the square is full of tables.', 'For many families, it is the most important day.', 'Transport is expensive.', 'The town council now gives free stalls.'],
      ...T(['a time', 0, 'Look for an hour.'], ['an opinion of people', 1, 'Look for what people feel about the day.'], ['a problem', 2, 'Look for something that makes life difficult.'], ['a solution', 3, 'Look for a help that somebody gives.']), bien: 'Time, opinion, problem and solution.' },
      '«By seven» es la hora, «most important» es lo que sienten, «expensive» es un problema y «free stalls» una ayuda.', 'Busca en cada oración una palabra que muestre hora, opinión, dificultad o ayuda.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MERCADO, lineas: ['Every Saturday farmers sell in the square.', 'The trucks are old.', 'People trust the food they buy there.', 'It is also a place to meet.', 'Julián uses cheese.', 'Life is hard for farmers, so the town helps them.'], ...S([1, 4], { 0: 'It says what happens and when.', 2: 'It is why people come back.', 3: 'It is the other reason to go.', 5: 'It is the problem and the help.' }), bien: 'Main ideas stay; details go.' },
      'Los camiones viejos y el queso son detalles: sin ellos se entiende qué es el mercado y qué problema tiene.', 'Quita cada oración y mira si todavía se entiende de qué trata el texto.'),
  ]);

  const TERMINAL = {
    id: 'icf-terminal', title: 'Notices at the bus station',
    paras: [
      'TICKETS. Buy your ticket before you get on the bus. Drivers do not sell tickets. Students pay half price from Monday to Friday if they show their student card at the ticket office.',
      'WAITING ROOM. Please keep your bags with you at all times. Bags left alone will be removed by security. Do not leave food on the seats, and please keep the room clean for other passengers.',
      'PLATFORM 4. Closed for repairs until 15 July. Buses to the coast now leave from Platform 6. Ask at the information desk if you are not sure where to go.',
      'CAFÉ. Open every day from 5 a.m. to 10 p.m. Fresh coffee, fruit and sandwiches. Bring your own cup and get a 10 % discount on hot drinks.',
      'LOST TICKETS. If you lose your ticket, go to Window 2 with your ID. We cannot give you a new ticket without it, so always carry it when you travel.',
    ],
  };
  const Q = preg(TERMINAL, 'ingles');
  return mundo('icf-en-avisos', 'Avisos y Vocabulario', 'ingles', [l1, l2], [
    ['icf-en-avisos-1', 'Un aviso da información concreta: búscala en él antes de elegir.',
      Q('According to the notices, buses to the coast now leave from:', ['Platform 4', 'Window 2', 'Platform 6', 'The café'], 2,
        'El aviso del andén 4 dice que está cerrado por reparaciones y que los buses a la costa salen ahora del andén 6.', 'Lee el aviso PLATFORM 4 completo: dice dónde salen ahora los buses.')],
    ['icf-en-avisos-1', '«Please keep» pide algo y «will be removed» dice lo que pasa si no se cumple.',
      Q('What does the WAITING ROOM notice ask you to do?', ['Give your bags to the driver', 'Leave your bags with security', 'Eat only in the café', 'Keep your bags with you'], 3,
        'El aviso pide tener las maletas con uno todo el tiempo; las que se dejan solas se las lleva seguridad. No obliga a comer en la cafetería.', 'Mira qué pasa con las maletas que se dejan solas.')],
    ['icf-en-avisos-1', 'Las condiciones de un aviso deben cumplirse todas.',
      Q('The TICKETS notice says that students:', ['Always travel free', 'Pay half price on weekdays if they show their card', 'Can buy tickets from the driver', 'Pay half price only on Sundays'], 1,
        'Pagan la mitad de lunes a viernes mostrando el carné. Los conductores no venden tiquetes y nadie viaja gratis.', 'Busca dos condiciones en el aviso: qué días y qué deben mostrar.')],
    ['icf-en-avisos-2', 'Una palabra se entiende por lo que la rodea en el aviso.',
      Q('In the CAFÉ notice, "discount" means:', ['Less money to pay', 'A bigger cup', 'A free sandwich', 'A later closing time'], 0,
        'Si traes tu propio vaso te cobran un 10 % menos por las bebidas calientes: «discount» es pagar menos.', 'Fíjate en el «10 %»: ¿qué le pasa al precio si traes tu vaso?')],
    ['icf-en-avisos-2', '«It» apunta a algo dicho antes que concuerda con él.',
      Q('In the LOST TICKETS notice, the word "it" in "without it" refers to:', ['Your ticket', 'Your ID', 'Window 2', 'The bus'], 1,
        'Para dar un tiquete nuevo hace falta el documento: «without it» es sin tu ID. Por eso dicen que lo lleves siempre.', 'Pregúntate qué hay que llevar a la ventanilla 2 para recibir un tiquete nuevo.')],
    ['icf-en-avisos-2', 'Muchas palabras del examen describen el estado de un lugar.',
      Q('"Closed for repairs" means that Platform 4:', ['Is very busy', 'Is only for students', 'Is being fixed', 'Is a new platform'], 2,
        '«Repairs» son arreglos: el andén está cerrado mientras lo arreglan.', 'Piensa por qué cerrarían un andén hasta una fecha.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-dialogos.js
// Preicfes · Inglés · mundo 2 «Conversaciones Cortas» (spec 2026-11-25-preicfes-estructura): completar una conversación con la respuesta
// que encaja. Diálogos escritos para Zuka; las explicaciones van en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BUS = {
    id: 'icf-en-bus', title: 'On the way to school',
    ficha: { autor: 'English club', fuente: 'School podcast script', fecha: 'March 2026' },
    paras: [
      'Laura is at the bus stop. It is half past six and it is raining. Diego arrives with a big green umbrella. "Good morning! How are you?" he asks. "Not very well," says Laura. "I forgot my umbrella and my shoes are wet." Diego laughs and opens his. "Don\'t worry. There is room for two."',
      'While they wait, they talk about the English test. "What time does it start?" asks Diego. "At eight," answers Laura, "in room twelve." Diego looks nervous. He studied for two hours last night, but he does not remember the past tense. "Can you help me?" he asks. "Of course," she says, and she takes out her notebook.',
      'The bus is late. At ten to seven a woman asks them a question. "Excuse me, does this bus go to the hospital?" "No, it doesn\'t," says Diego. "You need number forty. It stops across the street." The woman thanks them and runs, because the forty is already coming.',
      'Finally their bus arrives. It is full, so they have to stand. "How long does it take?" asks a new student next to them. His name is Samuel and it is his first week. "About twenty minutes," says Laura. "Which class are you in?" "I\'m in 11B," he says. "So are we!" answer Laura and Diego at the same time.',
      'When they get off, the rain has stopped. Samuel does not know where room twelve is. "Why don\'t you come with us?" says Laura. "That would be great," he says. They are five minutes late, but the teacher is still looking for her keys.',
    ],
  };
  const l1 = leccion('icf-en-dialogos-1', 'Everyday replies', guion(
    ['La palabra que pregunta', 'What time pide una hora; where, un lugar; who, una persona; how long, una duración; why, una razón.'],
    ['Do, does, is', 'Does it go…? se responde Yes, it does o No, it doesn’t. Is it…? se responde Yes, it is.'],
    ['Dar y aceptar', 'Why don’t you come? invita; That would be great acepta.'],
    ['La trampa', 'Una opción puede repetir una palabra de la pregunta y no responderla.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: BUS,
      ...F(['What did Laura forget?', 0, 'Busca el comienzo en la parada.'], ['What subject is the test?', 1, 'Busca el comienzo en el que hablan de una prueba.'], ['Why do they stand on the bus?', 3, 'Busca el comienzo en que llega el bus.']),
      luz: [[1, 'I forgot my umbrella'], [2, 'the English test'], [4, 'It is full']], bien: 'The beginning of each paragraph helps.' },
      'La parada abre el 1, la prueba el 2 y la llegada del bus el 4.', 'Lee solo el comienzo de cada párrafo y busca la palabra clave.'),
    x('voz-de-la-fuente', 'Match each question with its answer.', { ayuda: 'Tira un hilo desde cada respuesta hasta su pregunta.', doc: BUS, portadas: [['What time?', 'question'], ['How long?', 'question'], ['Which class?', 'question'], ['Does it go there?', 'question']],
      ...T(['At eight.', 0, '¿Es una hora, una duración, un grupo o un sí/no?'], ['About twenty minutes.', 1, '¿Es una hora, una duración, un grupo o un sí/no?'], ['I\'m in 11B.', 2, '¿Es una hora, una duración, un grupo o un sí/no?'], ['No, it doesn\'t.', 3, '¿Es una hora, una duración, un grupo o un sí/no?']), bien: 'The question word asks for the answer.' },
      '«What time» pide hora, «how long» duración, «which class» un grupo y «does» se contesta con «does».', 'Mira qué clase de dato pide cada palabra de pregunta.'),
    x('genero-o-cita', 'Is it an **invitation** or a **request for help**?', { doc: BUS, rot: ['invitation', 'request for help'],
      ...F(['Why don\'t you come with us?', 0, '¿Ofrece un plan o pide algo?'], ['Can you help me?', 1, '¿Ofrece un plan o pide algo?'], ['Could you open the door, please?', 1, '¿Ofrece un plan o pide algo?'], ['Would you like to have lunch?', 0, '¿Ofrece un plan o pide algo?'], ['Let\'s go to the park.', 0, '¿Ofrece un plan o pide algo?']), bien: 'Why don\'t you, would you like, let\'s: plans.' },
      '«Why don’t you», «would you like» y «let’s» invitan; «can you» y «could you» piden un favor.', 'Pregunta si quien habla ofrece hacer algo juntos o necesita un favor.'),
    x('pinta-voces', 'Paint each sentence with its speaker.', { doc: BUS, plumas: ['Laura', 'Diego', 'Samuel'],
      ...P(['My shoes are wet.', 0, 'Busca quién no tiene paraguas.'], ['There is room for two.', 1, 'Busca quién abre el paraguas.'], ['That would be great.', 2, 'Busca quién recibe la invitación.'], ['At eight, in room twelve.', 0, 'Busca quién «answers».'], ['You need number forty.', 1, 'Busca quién le responde a la mujer.']), bien: 'Says, asks and answers show the speaker.' },
      'Los verbos «says», «asks» y «answers» muestran quién habla en cada caso.', 'Busca el verbo de decir que está después de las comillas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: BUS, frases: [[3, 'The bus is ', 'late', '.'], [5, 'When they ', 'get off', ', the rain has stopped'], [4, '', 'Finally', ' their bus arrives']],
      ...F(['not on time', 0, 'They wait and wait: how is the bus?'], ['leave the bus', 1, 'They arrive at school: what do they do?'], ['at last', 2, 'After a long time, the bus arrives.'], ['very fast', null, 'It is slow today, not quick.'], ['never', null, 'The bus does arrive.']), bien: 'Same idea.' },
      '«Late» es «not on time», «get off» es «leave the bus» y «finally» es «at last».', 'Pon la ficha en la oración y mira si cuenta lo mismo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BUS, nums: [3, 4], pregunta: 'It is true', queda: 'Samuel is in the same class.',
      ...T(['The bus is early.', 0, 'Busca cómo llega el bus.'], ['Number forty stops far away.', 5, 'Busca dónde para el cuarenta.'], ['They sit on the bus.', 8, 'Busca cómo viajan.']), bien: 'One sentence says no.' },
      'El bus llega tarde, el cuarenta para al frente y en el bus van de pie.', 'Busca la palabra contraria a la de cada frase.'),
    x('tira-referente', 'What do these words refer to?', { doc: BUS, texto: '|Diego| has |a green umbrella| and |Laura| forgot hers. He opens it and they wait.',
      ...T(['«He»', 0, 'Put it in the sentence: who opens?'], ['«it»', 1, 'Put it in the sentence: what can you open?']), bien: 'He is a boy; it is a thing.' },
      '«He» es Diego, el único hombre; «it» es la cosa que se abre: el paraguas.', '«He» es para un hombre; «it», para una sola cosa.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BUS, lineas: ['Laura and Diego wait for the bus.', 'The umbrella is green.', 'They talk about the test.', 'They help a woman and meet Samuel.', 'The woman needs number forty.', 'They go to class together.'], ...S([1, 4], { 0: 'It is where the story begins.', 2: 'It is what worries Diego.', 3: 'It is what happens while they wait.', 5: 'It is how the story ends.' }), bien: 'Main events stay.' },
      'El color del paraguas y el número del otro bus son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si todavía se entiende la historia.'),
  ]);

  const TIENDA = {
    id: 'icf-en-tienda', title: 'A day at the clothes shop',
    ficha: { autor: 'Students of tourism', fuente: 'Customer service handbook', fecha: 'April 2026' },
    paras: [
      'Paula works at a clothes shop on Saturdays. Her boss, Mr. Reyes, has one rule: polite words cost nothing. He says that customers forget the price, but they do not forget how you speak to them.',
      'The first customer is a man who looks angry. "This shirt has a hole in it," he says. "I\'m very sorry about that," answers Paula. "Would you like a new one or your money back?" The man did not expect it. "A new one, please," he says, and his voice is softer.',
      'Later, a tourist comes in. She does not speak Spanish. "Could you tell me how much these boots are?" "They\'re eighty dollars," says Paula. "Oh, that\'s a bit too expensive for me." "I see. May I show you another pair?" The tourist smiles. "Yes, please. That\'s very kind of you."',
      'In the afternoon a boy asks, "Do you mind if I take a photo of this jacket? I want to show it to my mother." Paula knows that Do you mind is a strange question, because the polite answer is no. "Not at all," she says. "Go ahead." Ten minutes later the mother arrives and buys two jackets.',
      'At six, Mr. Reyes closes the door. "How was your day?" he asks. "Tiring, but nice," says Paula. "Would you mind working next Saturday too?" he asks. She thinks for a second. "I\'d love to, but I have an exam." "No problem," he says. "Good luck with it." Paula goes home thinking that her boss follows his own rule.',
    ],
  };
  const l2 = leccion('icf-en-dialogos-2', 'Polite answers', guion(
    ['Pedir con cortesía', 'Could you…?, May I…? y Would you like…? son más corteses que una orden.'],
    ['Do you mind', 'Do you mind if…? pregunta si molesta: para decir que sí se puede, se responde No o Not at all.'],
    ['Rechazar sin ofender', 'I’d love to, but… dice que no con amabilidad y da la razón.'],
    ['Disculpas y suerte', 'A una queja: I’m sorry. A un examen: Good luck. A un favor: That’s very kind of you.']), [
    x('voz-de-la-fuente', 'Match each situation with the polite answer.', { ayuda: 'Tira un hilo desde cada situación hasta su respuesta.', doc: TIENDA, portadas: [['I\'m so sorry', 'answer'], ['Good luck!', 'answer'], ['Of course not', 'answer'], ['You\'re welcome', 'answer']],
      ...T(['This phone is broken!', 0, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['I have an exam today.', 1, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Do you mind if I sit here?', 2, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Thank you for your help.', 3, '¿La persona se queja, agradece, pide permiso o va a hacer algo?']), bien: 'Complaint, exam, permission, thanks.' },
      'A una queja se pide disculpa, a un examen se desea suerte, al permiso «of course not» y a las gracias «you’re welcome».', 'Di primero qué hace la persona: se queja, agradece, pide o cuenta.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: TIENDA,
      ...F(['presents the rule', 0, 'Look for the boss and his idea.'], ['an angry customer', 1, 'Look for a hole.'], ['a foreign customer', 2, 'Look for the boots.'], ['a question about a photo', 3, 'Look for «Do you mind».'], ['the end of the day', 4, 'Look for the hour.'], ['a robbery', null, 'Nobody takes anything without paying.']),
      luz: [[1, 'one rule'], [2, 'angry'], [3, 'a tourist'], [4, 'a photo'], [5, 'At six']], bien: 'Rule, three customers and the end.' },
      'El texto da la regla, muestra tres clientes y termina con el día.', 'Busca en cada párrafo quién entra o qué hora es.'),
    x('genero-o-cita', 'Does it say **yes** or **no**?', { doc: TIENDA, rot: ['says yes', 'says no'],
      ...F(['Do you mind if I open it? Not at all.', 0, 'Si no le molesta, ¿se puede?'], ['Would you like to come? I\'d love to, but I can\'t.', 1, 'Lee lo que va después de «but».'], ['May I come in? Go ahead.', 0, '¿Le da permiso o no?'], ['Can I smoke here? I\'m afraid not.', 1, '¿Le da permiso o no?']), bien: 'Not at all means yes, you can.' },
      '«Not at all» y «go ahead» dan permiso; «but I can’t» y «I’m afraid not» lo niegan con cortesía.', 'Con «Do you mind», decir «no» es dar permiso.'),
    x('pinta-tipos', 'Paint each sentence: does it **offer**, **ask permission** or **refuse**?', { doc: TIENDA, plumas: ['offers', 'asks permission', 'refuses'],
      ...P(['Would you like a new one?', 0, '¿Da algo, pide permiso o dice que no?'], ['Do you mind if I take a photo?', 1, '¿Da algo, pide permiso o dice que no?'], ['I\'d love to, but I have an exam.', 2, '¿Da algo, pide permiso o dice que no?'], ['May I use your pen?', 1, '¿Da algo, pide permiso o dice que no?'], ['Can I get you some water?', 0, '¿Da algo, pide permiso o dice que no?']), bien: 'Three ways of being polite.' },
      '«Would you like» y «can I get you» ofrecen; «do you mind» y «may I» piden permiso; «I’d love to, but» rechaza.', 'Pregunta quién hará la acción y si la acepta.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: TIENDA, nums: [2, 4], pregunta: 'It is true', queda: 'Paula is polite with everybody.',
      ...T(['The man wants his money back.', 5, 'Busca lo que pide al final.'], ['The man expected that answer.', 4, 'Busca cómo le cayó la pregunta de Paula.'], ['The mother buys one jacket.', 11, 'Busca cuántas compra.']), bien: 'One sentence is enough.' },
      'Pide una camisa nueva, no esperaba esa respuesta y la madre compra dos chaquetas.', 'Busca el dato exacto que cambia cada frase.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: TIENDA, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The boots are eighty dollars.', 0, 'Léela junto a la respuesta de Paula.'], ['The man feels better.', 1, '¿Cómo es su voz al final?'], ['The tourist does not speak Spanish.', 0, 'Léela junto a la segunda oración del párrafo 3.'], ['The tourist is from Canada.', 2, '¿Alguna oración dice su país?']),
      luz: [[3, 'eighty dollars'], [2, 'his voice is softer'], [3, 'She does not speak Spanish']], bien: 'A softer voice shows a feeling.' },
      'El precio y el idioma están escritos; que se siente mejor se deduce de su voz; el país no aparece.', 'Busca pistas en cómo hablan las personas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: TIENDA, frases: [[2, 'a man who looks ', 'angry', ''], [3, 'a bit too ', 'expensive', ' for me'], [5, '"', 'Tiring', ', but nice," says Paula']],
      ...F(['very annoyed', 0, 'His shirt has a hole: how does he feel?'], ['high in price', 1, 'She cannot pay eighty dollars.'], ['exhausting', 2, 'She worked all day: how was it?'], ['cheap', null, 'It is the opposite.'], ['hungry', null, 'It looks similar, but it is about food.']), bien: 'Angry is not hungry.' },
      '«Angry» es enojado (no «hungry»), «expensive» es caro y «tiring» es agotador.', 'Cuidado con palabras que se parecen: prueba en la oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: TIENDA, lineas: ['Paula\'s boss believes in polite words.', 'She works on Saturdays.', 'She calms an angry customer.', 'She helps a tourist and a boy.', 'The shop closes at six.', 'Her boss is polite with her too.'], ...S([1, 4], { 0: 'It is the rule of the story.', 2: 'It is the first example.', 3: 'They are the other examples.', 5: 'It is the end of the idea.' }), bien: 'The rule and its examples stay.' },
      'El día y la hora de cierre son detalles; la regla y sus ejemplos son la historia.', 'Busca lo que tiene que ver con hablar con cortesía.'),
  ]);

  const PLAN = {
    id: 'icf-en-plan', title: 'The trip that almost did not happen',
    ficha: { autor: 'Eleventh grade', fuente: 'Class blog', fecha: 'May 2026' },
    paras: [
      'Our class is going to visit the desert next month. We have dreamed about it for two years, and last Friday we had a meeting to decide everything. It was not easy. Everybody had a different idea and, at the beginning, nobody was listening.',
      '"I think we should go by bus," said Manuela. "It\'s cheaper." "I don\'t agree," answered Nico. "It takes fourteen hours. I\'d rather fly." Then Tatiana said quietly, "I\'m worried about the money. My family can\'t pay for a plane." There was a long silence.',
      'Nico looked at the floor. "I\'m sorry. I didn\'t think about that," he said. "What if we sell food at the school fair?" suggested Manuela. "That\'s a brilliant idea!" said almost everybody. "I\'m going to make empanadas," said Tatiana, and for the first time she looked happy.',
      'We sold three hundred empanadas and two hundred juices. We were exhausted, but we were also proud. On Monday we counted the money: it was enough for a comfortable bus, but not for a plane. "I\'m a little disappointed," said Nico, "but I\'m excited too. We can sing for fourteen hours." "Oh no," said the teacher, and we all laughed.',
      'Now everything is ready. We will leave on the tenth of June at five in the morning. If it rains, we will visit the museum first. Tatiana is bringing a speaker, Manuela is bringing the tickets, and Nico, who wanted to fly, is bringing a pillow.',
    ],
  };
  const l3 = leccion('icf-en-dialogos-3', 'Feelings and plans', guion(
    ['Cómo se siente', 'Worried, proud, exhausted, excited: la respuesta debe ir con el sentimiento.'],
    ['Planes', 'Be going to: lo que ya se decidió. Will: lo que se promete o se calcula. What if…?: se sugiere.'],
    ['De acuerdo o no', 'I agree, So do I aceptan; I don’t agree, I’d rather… prefieren otra cosa.'],
    ['Reaccionar', 'A una buena noticia: That’s great! A una mala: I’m sorry to hear that.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: PLAN, rot: ['at the meeting', 'the fair and Monday', 'the trip'],
      ...F(['Nobody was listening', 0, 'Busca cuándo tenían que decidir.'], ['They sold empanadas', 1, 'Busca el verbo «sold».'], ['They counted the money', 1, 'Busca el día.'], ['They will leave at five', 2, 'Busca «will».']), luz: [[1, 'we had a meeting'], [4, 'On Monday we counted the money'], [5, 'We will leave']], bien: 'Past, past and future.' },
      'La reunión va primero, luego la venta y el conteo, y el viaje está en futuro con «will».', 'Mira el tiempo del verbo y los días que nombra el texto.'),
    x('voz-de-la-fuente', 'Match each piece of news with the best reaction.', { ayuda: 'Tira un hilo desde cada noticia hasta la reacción.', doc: PLAN, portadas: [['I\'m sorry to hear that', 'reaction'], ['Congratulations!', 'reaction'], ['Don\'t worry, I\'ll help you', 'reaction'], ['Have a nice trip!', 'reaction']],
      ...T(['My dog is very ill.', 0, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I won the race!', 1, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I can\'t do this homework.', 2, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['We leave for the desert now.', 3, '¿Es una noticia triste, un logro, un problema o una despedida?']), bien: 'Each feeling has its answer.' },
      'A lo triste se lamenta, al logro se felicita, al problema se ofrece ayuda y al viaje se desea suerte.', 'Nombra primero el sentimiento de quien habla.'),
    x('genero-o-cita', 'Does the speaker **agree** or **disagree**?', { doc: PLAN, rot: ['agrees', 'disagrees'],
      ...F(['That\'s a brilliant idea!', 0, '¿Le gusta la propuesta o prefiere otra?'], ['I\'d rather fly.', 1, '¿Le gusta la propuesta o prefiere otra?'], ['So do I.', 0, '¿Piensa lo mismo o distinto?'], ['I don\'t think so.', 1, '¿Piensa lo mismo o distinto?'], ['You\'re right.', 0, '¿Piensa lo mismo o distinto?']), bien: 'I\'d rather means another choice.' },
      '«Brilliant», «so do I» y «you’re right» aceptan; «I’d rather» y «I don’t think so» prefieren otra cosa.', 'Pregunta si quien habla seguiría con la misma idea.'),
    x('pinta-voces', 'Paint each idea with its speaker.', { doc: PLAN, plumas: ['Manuela', 'Nico', 'Tatiana'],
      ...P(['A bus is cheaper.', 0, 'Busca quién habla primero en la reunión.'], ['I\'d rather fly.', 1, 'Busca quién «answered».'], ['I\'m worried about the money.', 2, 'Busca quién habló «quietly».'], ['What if we sell food?', 0, 'Busca quién «suggested».'], ['We can sing for fourteen hours.', 1, 'Busca quién está un poco decepcionado.']), bien: 'Said, answered and suggested.' },
      'Manuela propone el bus y la venta, Nico prefiere volar y canta, Tatiana se preocupa por el dinero.', 'Busca el nombre que está junto a cada cita.'),
    x('comprueba-apuesta', 'Underline the sentence in paragraph 3 that shows Tatiana **changes** her feelings.', { doc: PLAN, nums: [3], apuesta: 'Tatiana is not worried any more.', ...S(['3.5'], { '3.0': 'It is about another person.', '3.1': 'Somebody says sorry here.', '3.2': 'Somebody explains why he is sorry.', '3.3': 'It is a suggestion.', '3.4': 'It is the reaction of the group.' }), bien: 'For the first time she looked happy.' },
      'La última oración dice que por primera vez se vio feliz: antes estaba preocupada.', 'Busca la oración con el nombre de Tatiana y un adjetivo de sentimiento.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: PLAN, frases: [[4, 'We were ', 'exhausted', ', but we were also proud'], [3, 'That\'s a ', 'brilliant', ' idea'], [2, 'I\'m ', 'worried', ' about the money']],
      ...F(['very tired', 0, 'They worked a lot: how did they feel?'], ['very good', 1, 'Almost everybody liked it.'], ['not calm', 2, 'She thinks her family cannot pay.'], ['very angry', null, 'Nobody is fighting here.'], ['bored', null, 'They were working, not waiting.']), bien: 'Feelings in context.' },
      '«Exhausted» es muy cansado, «brilliant» muy bueno y «worried» preocupado.', 'Piensa qué pasó antes para que se sintieran de esa manera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: PLAN, nums: [4, 5], pregunta: 'It is true', queda: 'They are going to the desert by bus.',
      ...T(['They got money for a plane.', 2, 'Busca para qué alcanzó.'], ['They leave at night.', 7, 'Busca la hora de salida.'], ['If it rains, they will not go out.', 8, 'Busca qué harán con mal tiempo.']), bien: 'One sentence says no.' },
      'Alcanzó para un bus, salen a las cinco de la mañana y si llueve van al museo.', 'Busca el dato de dinero, de hora y de lluvia.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: PLAN, lineas: ['The class plans a trip.', 'They sold two hundred juices.', 'They disagree about the bus and the plane.', 'They sell food to get money.', 'Nico brings a pillow.', 'They go by bus and they are happy.'], ...S([1, 4], { 0: 'It is the beginning of the story.', 2: 'It is the problem.', 3: 'It is the solution.', 5: 'It is the end.' }), bien: 'Plan, problem, solution and end.' },
      'La cantidad de jugos y la almohada son detalles; lo demás es plan, problema, solución y final.', 'Deja el plan, el problema, la solución y el final.'),
  ]);

  const CAFE = {
    id: 'icf-en-cafe', title: 'Two friends and a new job',
    paras: [
      'Sara meets her friend Julio at a café on Sunday morning. "You look happy," she says. "I am," he answers. "I got the job at the animal hospital!" "Congratulations!" says Sara. "When do you start?" "Tomorrow at seven. I\'m a little nervous."',
      'The waiter comes. "Are you ready to order?" "Could I have a coffee, please?" says Julio. "I\'m sorry, the machine is broken," says the waiter. "Would you like some tea?" Julio does not like tea very much, but he smiles. "Tea is fine, thank you."',
      '"How are you going to get there?" asks Sara. "By bike. It takes half an hour." "Do you mind if I go with you? My school is on the same street." "Not at all," says Julio. "We can talk on the way."',
      'Sara looks at her watch. Her grandmother is waiting for her. "I\'d love to stay longer, but I have to go," she says. "What about lunch on Friday? You can tell me about your first week." "That sounds great," he says. "And Sara… thanks for coming."',
    ],
  };
  const Q = preg(CAFE, 'ingles');
  return mundo('icf-en-dialogos', 'Conversaciones Cortas', 'ingles', [l1, l2, l3], [
    ['icf-en-dialogos-1', '«When» pide un momento y «how» con un viaje pide el medio.', Q('When Sara asks "How are you going to get there?", she wants to know:', ['The time Julio starts', 'The place of the hospital', 'The way Julio will travel', 'The price of the bike'], 2, 'Julio responde «By bike»: la pregunta es por el medio de transporte.', 'Mira qué responde Julio a esa pregunta.')],
    ['icf-en-dialogos-1', 'La respuesta debe dar el dato que pide la palabra de pregunta.', Q('Which answer is correct for "When do you start?"', ['By bike', 'Tomorrow at seven', 'At the animal hospital', 'A little nervous'], 1, '«When» pide un momento: mañana a las siete.', '¿Cuál opción es un momento?')],
    ['icf-en-dialogos-2', 'A «Do you mind if…?» se responde «Not at all» para dar permiso.', Q('When Julio says "Not at all", he means that:', ['He prefers to go alone', 'He does not like Sara', 'He does not have a bike', 'Sara can go with him'], 3, 'No le molesta: ella puede ir con él. Después dice que pueden hablar en el camino.', 'Lee lo que Julio agrega después.')],
    ['icf-en-dialogos-2', '«I’d love to, but…» rechaza con cortesía.', Q('Sara says "I\'d love to stay longer, but I have to go" to:', ['Leave politely', 'Order more tea', 'Invite the waiter', 'Say she is bored'], 0, 'Dice con cortesía que no puede quedarse, porque la esperan.', 'Fíjate en lo que va después de «but».')],
    ['icf-en-dialogos-3', 'La reacción va con la noticia: a un logro se felicita.', Q('Sara says "Congratulations!" because Julio:', ['Has a new job', 'Drinks tea', 'Has a new bike', 'Is nervous'], 0, 'Acaba de contar que consiguió el trabajo en el hospital de animales.', 'Lee lo que Julio dijo justo antes.')],
    ['icf-en-dialogos-3', '«What about…?» sugiere un plan.', Q('At the end, Sara and Julio decide to:', ['Work together', 'Go to see her grandmother', 'Have lunch on Friday', 'Drink coffee every Sunday'], 2, 'Sara sugiere almorzar el viernes y Julio responde que suena muy bien.', 'Busca la sugerencia que empieza con «What about».')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-gramatica.js
// Preicfes · Inglés · mundo 3 «Gramática en Contexto» (spec 2026-11-25-preicfes-estructura): textos escritos para Zuka; se explica en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const RADIO = {
    id: 'icf-en-abuelo', title: 'My grandfather\'s bicycle',
    ficha: { autor: 'Valentina, 16', fuente: 'School story contest', fecha: 'March 2026' },
    paras: [
      'My grandfather bought his bicycle in 1971. It was green, and it cost him three months of work. He rode it to the factory every morning, and on Sundays he took my grandmother to the river on it. When he was seventy, he stopped riding because his knees hurt.',
      'For ten years the bicycle has been in our garage, under an old blanket. Nobody has used it, and spiders have made their houses in the wheels. Last month, while I was looking for a box, I found it. I asked my grandfather if I could repair it. He was watching television. He turned it off and smiled.',
      'We have worked on it every Saturday since then. He knows the name of every piece, but his hands are weak, so he tells me what to do and I do it. I have learned more words than in any class: chain, brake, pedal, spoke. When something is difficult, he says the same thing: "Slowly. It isn\'t running away."',
      'Yesterday we finished. I was going to paint it blue, but he looked so sad that I chose green. This afternoon I am riding it to the river for the first time. He is coming too, in my uncle\'s car, and he is bringing a sandwich, because he says that nobody rides well on an empty stomach.',
      'One day I will give this bicycle to someone younger than me. I will tell them who bought it, how much it cost and why it must always be green. And if something breaks, I won\'t be afraid. I know that it isn\'t running away.',
    ],
  };
  const l1 = leccion('icf-en-gramatica-1', 'Verbs and tenses', guion(
    ['Pasado simple', 'Bought, rode, took: algo que terminó. Va con yesterday, last month, in 1971.'],
    ['Presente perfecto', 'Has been, have worked… since: empezó antes y sigue o importa hoy.'],
    ['Pasado continuo', 'Was looking: lo que estaba pasando cuando ocurrió otra cosa.'],
    ['Futuro', 'Will para promesas; am riding this afternoon para planes ya hechos.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: RADIO, rot: ['before', 'now', 'the future'],
      ...F(['He rode it to the factory', 0, 'Mira el verbo: ¿«rode» ya pasó?'], ['He knows the name of every piece', 1, 'Mira el verbo: ¿es así hoy?'], ['She will give it to someone younger', 2, 'Busca «will».'], ['It cost three months of work', 0, 'Mira de qué año se habla.']),
      luz: [[1, 'He rode it'], [3, 'He knows'], [5, 'I will give']], bien: 'Rode, knows, will give.' },
      '«Rode» y «cost» están en pasado, «knows» en presente y «will» es futuro.', 'Mira la forma del verbo antes de mirar la historia.'),
    x('genero-o-cita', 'Is it **finished** or does it **continue until now**?', { doc: RADIO, rot: ['finished', 'until now'],
      ...F(['He bought it in 1971', 0, '¿Hay una fecha cerrada?'], ['It has been in our garage for ten years', 1, '¿Dice «for» con «has»?'], ['We have worked every Saturday since then', 1, '¿Dice «since»?'], ['Yesterday we finished', 0, '¿Hay una fecha cerrada?']), bien: 'In 1971, yesterday: finished. For, since: until now.' },
      'Con «in 1971» y «yesterday» terminó; con «has… for» y «have… since» llega hasta hoy.', 'Busca las palabras de tiempo: in, yesterday, for, since.'),
    x('cambia-palabra', 'Put the verb that means the same. Sobran dos.', { doc: RADIO, frases: [[1, 'he ', 'stopped riding', ' because his knees hurt'], [2, 'I ', 'found', ' it'], [4, 'Yesterday we ', 'finished', '']],
      ...F(['did not ride any more', 0, 'He was seventy and it hurt: what happened?'], ['discovered', 1, 'She was looking for a box and saw it.'], ['completed the work', 2, 'The bicycle is ready.'], ['started to ride', null, 'It is the opposite idea.'], ['lost', null, 'She did not lose it: she saw it.']), bien: 'Same tense, same idea.' },
      '«Stopped riding» es dejó de montar, «found» encontró y «finished» terminó el trabajo.', 'Pon cada opción en la oración y mira si cuenta lo mismo.'),
    x('tira-referente', 'What do these words refer to?', { doc: RADIO, texto: '|My grandfather| was watching |television| when I asked him about |the bicycle|. He turned it off and smiled.',
      ...T(['«He»', 0, 'Put it in the sentence: who was there?'], ['«it»', 1, 'Put it in the sentence: what can you turn off?']), bien: 'A man, and something you turn off.' },
      '«He» es el abuelo y «it» es el televisor, lo único que se apaga.', 'Pregunta qué cosa se puede apagar, es decir, «turn off».'),
    x('pasos-del-proceso', 'Put the story in order. The first step is in its place.', { doc: RADIO, que: 'the story', de: 'The green bicycle', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['He buys the bicycle.', 'He stops riding it.', 'She finds it in the garage.', 'They repair it together.', 'She rides it to the river.'], mira: ['', 'It happens when he is seventy.', 'It happens after ten years in the garage.', 'It happens every Saturday.', 'It is the plan for this afternoon.'], bien: 'Buy, stop, find, repair, ride.' },
      'Primero la compra, luego la deja, años después ella la encuentra, la reparan y por fin sale.', 'Busca las edades, los años y los días de la historia.'),
    x('pista-tipo', 'Match each tense with its sentence.', { doc: RADIO, lineas: ['He took my grandmother to the river.', 'I was looking for a box.', 'Nobody has used it.', 'I won\'t be afraid.'],
      ...T(['a finished action', 0, 'Busca un pasado simple.'], ['an action in progress in the past', 1, 'Busca «was» y «-ing».'], ['something until now', 2, 'Busca el auxiliar «has».'], ['something about the future', 3, 'Busca «will» o «won\'t».']), bien: 'Four tenses.' },
      '«Took» terminó, «was looking» estaba en curso, «has used» llega hasta hoy y «won’t» habla del futuro.', 'Mira el auxiliar de cada oración: was, has o will.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: RADIO, nums: [1, 4], pregunta: 'It is true', queda: 'The bicycle is green again.',
      ...T(['He stopped because of the rain.', 3, 'Busca por qué dejó de montar.'], ['They are still repairing it.', [4, 6], 'Busca qué pasó ayer.'], ['The grandfather stays at home today.', 7, 'Busca qué hará él.']), bien: 'One sentence says no.' },
      'Le dolían las rodillas, ayer terminaron y el abuelo también va.', 'Busca la razón, el día y quién va al paseo.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RADIO, lineas: ['A grandfather had a bicycle.', 'The blanket was old.', 'It stayed in a garage for years.', 'He and his granddaughter repaired it.', 'There is a sandwich.', 'She will give it to someone one day.'], ...S([1, 4], { 0: 'It is the beginning.', 2: 'It is the problem.', 3: 'It is the main event.', 5: 'It is the end.' }), bien: 'Beginning, problem, event and end.' },
      'La manta y el sándwich son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si se entiende.'),
  ]);

  const FARM = {
    id: 'icf-en-cafe-farm', title: 'Where your coffee comes from',
    ficha: { autor: 'Tourism students', fuente: 'Guide for visitors', fecha: 'April 2026' },
    paras: [
      'Most of the coffee in this region grows on small farms in the mountains, between 1,200 and 1,800 metres above sea level. The plants need a lot of water, but they do not like too much sun, so farmers often put banana trees among them to give shade.',
      'From September to December, many people come to pick the coffee. It is hard work because every fruit must be picked by hand. Only the red ones are ready. If you pick the green ones, the coffee tastes bitter. A good worker can fill a basket in less than an hour, although most visitors cannot fill even half of it in a morning.',
      'After that, the beans are washed and dried in the sun for about ten days. Someone has to move them every few hours, and if it rains, they must be covered at once. Finally they are put into bags and sold. A farmer gets only a little of the money that you pay for a cup in a big city.',
      'That is why some families have opened their farms to visitors. During the tour, you can walk between the plants, learn how to choose the best fruits and drink a cup at the end. The money from the tours helps them in the months without harvest. There are also a few houses where you can sleep, but there isn\'t much space, so you should book before you come.',
      'Bring good shoes and a hat, and do not wear anything white. You don\'t need much money, because lunch is included. And please ask before you take a photo of anybody. They are at work, and nobody likes to be a postcard.',
    ],
  };
  const l2 = leccion('icf-en-gramatica-2', 'Small words that matter', guion(
    ['Preposiciones', 'In un mes o un lugar cerrado, on un día o una superficie, at una hora o un punto, from… to un tramo.'],
    ['Cantidades', 'Much con lo que no se cuenta; many y a few con lo que sí; a little con lo que no.'],
    ['Conectores', 'So trae el resultado; because, la causa; although, un obstáculo; but, un contraste.'],
    ['Somebody, anybody, nobody', 'Nobody ya niega; anybody va en preguntas y negaciones.']), [
    x('bisagras', 'Put the word that joins the two ideas. Sobran dos.', { doc: FARM, pares: [['They do not like too much sun,', 'farmers put banana trees among them.'], ['It is hard work', 'every fruit must be picked by hand.'], ['A good worker can fill a basket in an hour,', 'most visitors cannot fill even half.']],
      ...F(['so', 0, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['because', 1, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['although', 2, 'Pone un contraste: ¿dónde lo segundo no es lo esperado?'], ['before', null, 'It is about time: no pair is about what is first.'], ['or', null, 'It gives a choice: no pair gives two options.']), bien: 'Result, cause and contrast.' },
      'La sombra es resultado del sol, la mano es la causa del trabajo duro y los visitantes contrastan.', 'Di qué hace la segunda idea: ¿resulta, explica o contrasta?'),
    x('genero-o-cita', 'Can you count it? **many / a few** or **much / a little**', { doc: FARM, rot: ['many / a few', 'much / a little'],
      ...F(['houses', 0, '¿Se puede decir «two houses»?'], ['water', 1, '¿Se puede decir «two waters» para contar litros?'], ['money', 1, '¿Se puede decir «three moneys»?'], ['visitors', 0, '¿Se puede decir «ten visitors»?'], ['space', 1, '¿Se puede decir «four spaces» para un cuarto?']), bien: 'Count it: many. Not: much.' },
      'Casas y visitantes se cuentan; agua, dinero y espacio, no.', 'Prueba con un número delante de la palabra.'),
    x('pista-tipo', 'Match each time word with the part of the text it completes.', { doc: FARM, lineas: ['___ September to December', '___ about ten days', '___ the tour', 'book ___ you come'],
      ...T(['From', 0, 'Busca dos meses, de uno a otro.'], ['For', 1, 'Busca cuánto dura algo.'], ['During', 2, 'Busca un evento en el que pasan cosas.'], ['before', 3, 'Busca qué se hace primero.']), bien: 'From… to, for, during, before.' },
      '«From… to» une dos meses, «for» mide duración, «during» va con un evento y «before» pone algo antes.', 'Mira lo que sigue: meses, días, un evento o una acción.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: FARM,
      ...F(['What do the plants need?', 0, 'Busca el comienzo que habla de dónde crece.'], ['What happens if it rains on the beans?', 2, 'Busca el comienzo «After that».'], ['What should you wear?', 4, 'Busca el comienzo que pide llevar cosas.']),
      luz: [[1, 'a lot of water'], [3, 'they must be covered'], [5, 'good shoes and a hat']], bien: 'Growing, drying and visiting.' },
      'El 1 habla de dónde crece, el 3 de lo que pasa después y el 5 de lo que hay que llevar.', 'Lee los comienzos y busca la palabra más cercana.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: FARM, frases: [[2, 'It is ', 'hard', ' work'], [3, 'they must be covered ', 'at once', ''], [4, 'learn how to ', 'choose', ' the best fruits']],
      ...F(['difficult', 0, 'You do it by hand all day: how is it?'], ['immediately', 1, 'It starts to rain: when do you cover them?'], ['select', 2, 'You want the red ones: what do you do?'], ['easy', null, 'It is the opposite idea.'], ['throw away', null, 'You want to keep the best fruits.']), bien: 'Small changes, same idea.' },
      '«Hard» es difícil, «at once» es de inmediato y «choose» es seleccionar.', 'Lee la oración completa con cada ficha en el hueco.'),
    x('tira-referente', 'What do these words refer to?', { doc: FARM, texto: '|The beans| are dried in |the sun|. |Someone| has to move them every few hours, and it must shine for ten days.',
      ...T(['«them»', 0, 'Put it in the sentence: what is moved?'], ['«it»', 1, 'Put it in the sentence: what can shine?']), bien: 'Many beans, one sun.' },
      '«Them» es plural: los granos; «it» es singular y brilla: el sol.', '«Them» es para varias cosas; «it», para una.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: FARM, nums: [2, 4], pregunta: 'It is true', queda: 'The money from tours helps the families.',
      ...T(['You can pick the fruits with a machine.', 1, 'Busca cómo se recoge cada fruto.'], ['Green fruits taste better.', 3, 'Busca qué pasa con los verdes.'], ['You do not need to book a house.', 8, 'Busca qué debes hacer antes de ir.']), bien: 'One sentence says no.' },
      'Se recoge a mano, los verdes amargan y hay que reservar porque hay poco espacio.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: FARM, lineas: ['Coffee grows on small farms in the mountains.', 'Bags are used at the end.', 'It is picked by hand and dried in the sun.', 'Farmers get little money.', 'A hat is a good idea.', 'Tours help the families.'], ...S([1, 4], { 0: 'It says where it grows.', 2: 'It is how it is made.', 3: 'It is the problem.', 5: 'It is the solution.' }), bien: 'Place, process, problem and solution.' },
      'Las bolsas y el sombrero son detalles; lo demás es lugar, proceso, problema y ayuda.', 'Deja lo que explica por qué reciben visitantes.'),
  ]);

  const CITY = {
    id: 'icf-en-ciudades', title: 'Two sisters, two cities',
    ficha: { autor: 'Daniela Prieto', fuente: 'Travel magazine', fecha: 'May 2026' },
    paras: [
      'My sister Ana lives in Bogotá and I live in Santa Marta. We grew up in the same house, but our lives are very different now. Her city is bigger than mine, and it is also higher and colder. When I visit her, I wear two jackets, and she laughs at me.',
      'Bogotá has the best museums in the country, and I have never been bored there. There are more concerts in one week than in a whole year in my city. However, it isn\'t as relaxed as Santa Marta. The traffic is terrible. Ana\'s trip to work is longer than my whole morning: she leaves home at five to arrive at seven.',
      'Santa Marta is not as exciting, but the sea is the most beautiful thing I know. Everything is closer. I go to work on foot, and I have lunch at home. Food is cheaper too, especially fish. On the other hand, it is so hot in February that it is impossible to walk at noon, and some services, like the internet, are worse than in the capital.',
      'We often argue about who is happier. She says that I am lazier than her, and I say that she is more tired than me. Last Christmas our mother, who lives in a tiny town, listened to us for an hour. "You are both as stubborn as your father," she said. "The best city is the one where somebody waits for you."',
      'This year Ana is going to spend a month with me. She says it will be the quietest month of her life. I think it will be the loudest of mine, because she never stops talking. I can\'t wait.',
    ],
  };
  const l3 = leccion('icf-en-gramatica-3', 'Comparing things', guion(
    ['Más que', 'Cortas: bigger than, colder than. Largas: more tired than.'],
    ['Menos o igual', 'As… as: tan como. Not as… as: no tan como.'],
    ['El más', 'The biggest, the most beautiful, the best, the worst.'],
    ['Irregulares', 'Good, better, the best. Bad, worse, the worst.']), [
    x('pinta-tipos', 'Paint each sentence: which city does it describe?', { doc: CITY, plumas: ['Bogotá', 'Santa Marta', 'both'],
      ...P(['It is colder.', 0, 'Busca dónde se usan dos chaquetas.'], ['Food is cheaper.', 1, 'Busca dónde hay pescado.'], ['It has the best museums.', 0, 'Busca quién tiene conciertos.'], ['A sister lives there.', 2, '¿En cuál de las dos no vive ninguna hermana?'], ['Everything is closer.', 1, 'Busca dónde se va a pie.']), bien: 'Compare, then decide.' },
      'El frío y los museos son de Bogotá, la comida barata y lo cercano de Santa Marta, y en ambas vive una hermana.', 'Busca la oración del texto que compara cada cosa.'),
    x('genero-o-cita', 'Is it **comparing two** or **choosing the top one**?', { doc: CITY, rot: ['comparing two', 'the top one'],
      ...F(['bigger than mine', 0, '¿Lleva «than» o «the…-est / the most»?'], ['the most beautiful thing', 1, '¿Lleva «than» o «the…-est / the most»?'], ['as stubborn as your father', 0, '¿Compara con alguien o escoge entre todos?'], ['the quietest month of her life', 1, '¿Compara con alguien o escoge entre todos?'], ['worse than in the capital', 0, '¿Lleva «than» o «the…-est / the most»?']), bien: 'Than, as… as: two. The…-est, the most: top.' },
      '«Than» y «as… as» comparan; «the most» y «the quietest» escogen el mayor de todos.', 'Busca «than» o «the» con «-est» o «most».'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: CITY, frases: [[2, 'it ', 'isn\'t as relaxed as', ' Santa Marta'], [3, 'Everything is ', 'closer', ''], [2, 'The traffic is ', 'terrible', '']],
      ...F(['is less relaxed than', 0, 'Which city is calmer?'], ['nearer', 1, 'She goes on foot: how far are things?'], ['very bad', 2, 'Two hours to get to work: how is it?'], ['is more relaxed than', null, 'It says the opposite.'], ['very good', null, 'Nobody is happy with two hours.']), bien: 'Not as… as = less… than.' },
      '«Isn’t as relaxed as» es «less relaxed than», «closer» es «nearer» y «terrible», «very bad».', 'Cuidado: «not as… as» quiere decir menos.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: CITY, filas: [{ antes: 'Santa Marta is', topes: ['colder than Bogotá', 'as cold as Bogotá', 'hotter than Bogotá'], va: 2 }, { antes: 'The number of concerts in Bogotá is', topes: ['higher', 'lower', 'the same'], va: 0 }, { antes: 'The internet in Santa Marta is', topes: ['better', 'worse', 'the same'], va: 1 }], mira: ['Read paragraph 1 again: where is it colder?', 'Read paragraph 2 again: concerts in one week.', 'Read the end of paragraph 3 again.'], luz: [[1, 'higher and colder'], [2, 'more concerts'], [3, 'are worse than in the capital']], bien: 'Hotter, higher and worse.' },
      'Bogotá es más fría, tiene más conciertos y en Santa Marta el internet es peor.', 'Busca la palabra que compara en cada párrafo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: CITY, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Ana needs two hours to get to work.', 1, 'Leave at five, arrive at seven.'], ['Fish is cheaper in Santa Marta.', 0, 'Read the part about food.'], ['The writer works near her home.', 1, 'How does she go to work?'], ['Ana earns more money.', 2, 'Is there a sentence about what they earn?']),
      luz: [[2, 'leaves home at five'], [3, 'especially fish'], [3, 'on foot']], bien: 'Five to seven is two hours.' },
      'El pescado está escrito; las dos horas y la cercanía se deducen; lo que ganan no aparece.', 'Haz la cuenta de las horas y fíjate en cómo va al trabajo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: CITY, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Ana will visit her sister.',
      ...T(['The writer is always bored in Bogotá.', 0, 'Busca qué dice de aburrirse.'], ['Their mother lives in a big city.', 7, 'Busca dónde vive la mamá.'], ['Ana will stay for a weekend.', 10, 'Busca cuánto tiempo se queda.']), bien: 'One sentence says no.' },
      'Nunca se aburre, la mamá vive en un pueblo diminuto y Ana se queda un mes.', 'Busca en el texto el dato exacto de cada frase.'),
    x('pinta-voces', 'Paint each idea with the person who says it.', { doc: CITY, plumas: ['Ana', 'the writer', 'the mother'],
      ...P(['You are lazier than me.', 0, 'Busca quién critica a la escritora.'], ['You are more tired than me.', 1, 'Busca quién le contesta.'], ['The best city is where somebody waits for you.', 2, 'Busca quién escuchó una hora.'], ['It will be the loudest month.', 1, 'Busca «I think».'], ['It will be the quietest month.', 0, 'Busca «She says».']), bien: 'She says, I say, our mother said.' },
      '«She says» es de Ana, «I think» de la escritora y las comillas, de la mamá.', 'Busca el verbo de decir y mira quién es su sujeto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: CITY, lineas: ['Two sisters live in different cities.', 'The writer wears two jackets.', 'Bogotá is more exciting but less relaxed.', 'Santa Marta is cheaper and closer.', 'Ana leaves at five.', 'Their mother says people matter more than places.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is one side of the comparison.', 3: 'It is the other side.', 5: 'It is the message.' }), bien: 'Situation, two sides and message.' },
      'Las chaquetas y la hora son detalles; lo demás es la comparación y el mensaje.', 'Deja las dos ciudades y lo que dice la mamá.'),
  ]);

  const MUSEO = {
    id: 'icf-en-museo', title: 'The smallest museum in the valley',
    paras: [
      'In 2012, Teresa Gómez opened a museum in her own kitchen. She had only eleven objects: old radios that her neighbours did not want any more. Today there are more than three hundred, and the kitchen has become the smallest but the most visited museum in the valley.',
      'Teresa has never asked anybody for money. People bring radios because they have a story. A taxi driver brought the one that his father was listening to when he was born. A nurse gave her a tiny radio that is smaller than a matchbox.',
      'Although many of them do not work, Teresa repairs at least one every month. She learned by herself, from books, and she is better than most of the technicians in the city. While she works, she tells visitors who owned each radio.',
      'Next year she will move the museum to a bigger house, because there isn\'t much space. "The new place is as old as the radios," she says. "They will feel at home."',
    ],
  };
  const Q = preg(MUSEO, 'ingles');
  return mundo('icf-en-gramatica', 'Gramática en Contexto', 'ingles', [l1, l2, l3], [
    ['icf-en-gramatica-1', '«Has become» llega hasta hoy; «In 2012, … opened» cierra el pasado.', Q('According to the text, the museum started:', ['Last year', 'In 2012', 'Next year', 'When Teresa was born'], 1, '«In 2012, Teresa Gómez opened»: un pasado con fecha.', 'Busca el verbo «opened».')],
    ['icf-en-gramatica-1', '«Will» habla del futuro.', Q('According to Teresa, what will happen next year?', ['The museum will close', 'Teresa will learn English', 'The museum will be in a bigger house', 'Teresa will sell the radios'], 2, '«Next year she will move the museum to a bigger house».', 'Busca «will» en el último párrafo.')],
    ['icf-en-gramatica-2', '«Although» une una idea con lo que no se esperaba.', Q('"Although many of them do not work" means that:', ['All the radios work', 'A lot of radios are broken, but she repairs some', 'Teresa does not work', 'Nobody visits the museum'], 1, 'Muchas no funcionan; aun así, ella repara al menos una al mes.', '¿Qué hace Teresa a pesar de eso?')],
    ['icf-en-gramatica-2', '«Much» va con lo que no se cuenta: much space.', Q('Teresa needs a new house because:', ['The kitchen is too small now', 'The kitchen is too old', 'Her neighbours want the kitchen', 'She has a lot of money'], 0, '«There isn’t much space»: hay poco espacio para más de trescientas radios.', 'Busca lo que va después de «because».')],
    ['icf-en-gramatica-3', '«Smaller than» compara dos cosas.', Q('In the text, the nurse\'s radio is:', ['As big as a matchbox', 'Bigger than a matchbox', 'The biggest radio', 'Not as big as a matchbox'], 3, '«Smaller than a matchbox» es lo mismo que «not as big as a matchbox».', '«Not as… as» quiere decir menos.')],
    ['icf-en-gramatica-3', '«Better than most» no es lo mismo que «the best».', Q('According to the text, Teresa is:', ['A better technician than most in the city', 'The worst technician in the city', 'As good as her neighbours', 'The youngest technician'], 0, '«She is better than most of the technicians in the city».', 'Busca «better than» y mira con quién la comparan.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-corto.js
// Preicfes · Inglés · mundo 4 «Textos Cortos» (spec 2026-11-25-preicfes-estructura): mensajes y textos de nivel básico, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const MAILS = {
    id: 'icf-en-mails', title: 'Messages on the fridge',
    ficha: { autor: 'The Suárez family', fuente: 'Notes, emails and chats', fecha: 'One week in April 2026' },
    paras: [
      'NOTE ON THE FRIDGE. Monday, 6 a.m. Kids, I have an early meeting. There are eggs and bread. Lucas, please walk the dog before school, not after, because the neighbours don\'t like the noise at noon. Sofía, your blue shirt is in the washing machine, so wear the white one. Love, Mum.',
      'CHAT. Monday, 3 p.m. Sofía: Mum, I have a problem. I\'m sleeping at Ana\'s house tonight and I left my project at home. It is for tomorrow morning. Can Grandpa bring it? Mum: He doesn\'t drive at night any more. Ask your teacher if you can send a photo today and bring it on Wednesday. Sofía: Good idea. She said yes!',
      'EMAIL TO THE COACH. Tuesday. Dear Mr Ramos, Lucas hurt his foot this morning while he was walking the dog. The doctor says it isn\'t broken, but he can\'t run for two weeks. He would like to come to training to watch and help with the water. Is that all right? Best wishes, Clara Suárez.',
      'ANSWER. Wednesday. Dear Ms Suárez, I\'m sorry to hear that. Of course he can come. In fact, I need someone to write down the points on Saturday, and Lucas is very good at maths. Tell him to bring a pencil and a hat. Regards, Andrés Ramos.',
      'NOTE ON THE FRIDGE. Saturday. Mum, Dad: we have gone to the game. Lucas is the new "assistant". He has told everybody. There is pizza in the oven for you; we made it, so don\'t worry if it looks strange. Back at six. Grandpa is coming with us, because it is in the afternoon. Sofía.',
    ],
  };
  const l1 = leccion('icf-en-corto-1', 'Short messages', guion(
    ['¿Quién a quién?', 'Mira quién firma y a quién saluda: Dear Mr Ramos… Best wishes, Clara.'],
    ['¿Para qué?', 'Un mensaje pide, avisa, responde, invita o agradece.'],
    ['Datos', 'Subraya día, hora, lugar y lo que hay que hacer.'],
    ['Lo que no se dice', 'Si el abuelo no maneja de noche y va por la tarde, se entiende por qué puede ir.']), [
    x('donde-mirar', 'Lleva cada pregunta al mensaje donde la buscarías.', { doc: MAILS,
      ...F(['What should Sofía wear?', 0, 'Busca la nota de la mañana.'], ['Why can\'t Lucas run?', 2, 'Busca el mensaje al entrenador.'], ['What is there to eat on Saturday?', 4, 'Busca la nota del sábado.']),
      luz: [[1, 'wear the white one'], [3, 'hurt his foot'], [5, 'There is pizza']], bien: 'Read the heading first.' },
      'La ropa está en la nota del lunes, el pie en el correo y la comida en la nota del sábado.', 'Lee solo los encabezados y decide dónde está.'),
    x('pinta-voces', 'Paint each message with its writer.', { doc: MAILS, plumas: ['Mum', 'Sofía', 'Mr Ramos'],
      ...P(['Please walk the dog before school.', 0, 'Busca quién firma la nota del lunes.'], ['I left my project at home.', 1, 'Busca quién tiene un problema.'], ['Tell him to bring a pencil.', 2, 'Busca quién responde el correo.'], ['He would like to come and watch.', 0, 'Busca quién escribe al entrenador.'], ['We made it, so don\'t worry.', 1, 'Busca quién firma el sábado.']), bien: 'The name at the end tells you.' },
      'Mum firma la nota del lunes y el correo (Clara), Sofía escribe el chat y la nota del sábado, y Mr Ramos responde.', 'Mira el nombre o la firma de cada mensaje.'),
    x('voz-de-la-fuente', 'Match each purpose with its message.', { ayuda: 'Tira un hilo desde cada propósito hasta su mensaje.', doc: MAILS, portadas: [['Monday note', 'message'], ['The chat', 'message'], ['Email to the coach', 'message'], ['Saturday note', 'message']],
      ...T(['to tell the kids what to do', 0, '¿Cuál da instrucciones?'], ['to ask for help with homework', 1, '¿Cuál empieza con un problema?'], ['to explain an injury and ask permission', 2, '¿Cuál le escribe a alguien de fuera?'], ['to say where they are', 3, '¿Cuál avisa que salieron?']), bien: 'Tell, ask, explain, inform.' },
      'La nota del lunes da instrucciones, el chat pide ayuda, el correo explica y la del sábado avisa.', 'Pregunta qué quiere lograr quien escribe.'),
    x('genero-o-cita', 'Is it **formal** or **informal**?', { doc: MAILS, rot: ['formal', 'informal'],
      ...F(['Dear Mr Ramos', 0, '¿Se le escribe así a un amigo?'], ['Love, Mum', 1, '¿Se le escribe así a un jefe?'], ['Regards', 0, '¿Se usa con alguien que no es de la familia?'], ['Good idea. She said yes!', 1, '¿Suena a chat o a carta?']), bien: 'Dear and Regards; Love and chat.' },
      '«Dear Mr» y «Regards» son formales; «Love, Mum» y la frase del chat, informales.', 'Piensa a quién le escribirías de esa manera.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: MAILS, nums: [3, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Lucas\'s foot is not broken.', 0, 'Léela junto a lo que dice el doctor.'], ['Grandpa drives them to the game.', 1, '¿Por qué importa que sea por la tarde?'], ['Lucas is proud of his new job.', 1, '¿A quién se lo ha contado?'], ['Lucas\'s team wins.', 2, '¿Se dice el resultado?']),
      luz: [[3, 'it isn\'t broken'], [5, 'because it is in the afternoon'], [5, 'He has told everybody']], bien: 'He does not drive at night.' },
      'El pie está escrito; que el abuelo maneje y que Lucas esté orgulloso se deducen; el resultado no.', 'Junta la nota del sábado con lo que se dijo en el chat.'),
    x('pasos-del-proceso', 'Put the week in order. The first step is in its place.', { doc: MAILS, que: 'the week', de: 'The Suárez family', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Mum leaves a note.', 'Sofía forgets her project.', 'Lucas hurts his foot.', 'The coach answers.', 'They go to the game.'], mira: ['', 'It happens on Monday afternoon.', 'It happens on Tuesday morning.', 'It happens on Wednesday.', 'It happens on Saturday.'], bien: 'Monday, Monday, Tuesday, Wednesday, Saturday.' },
      'La nota y el proyecto son del lunes, el pie del martes, la respuesta del miércoles y el juego del sábado.', 'Mira el día que aparece en cada encabezado.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: MAILS, nums: [1, 4], pregunta: 'It is true', queda: 'Lucas will write down the points.',
      ...T(['Lucas must walk the dog after school.', 4, 'Busca cuándo debe pasear al perro.'], ['Sofía wears the blue shirt on Monday.', 5, 'Busca dónde está la camisa azul.'], ['Lucas is bad at maths.', 11, 'Busca en qué es muy bueno.']), bien: 'One sentence says no.' },
      'El perro va antes del colegio, la camisa azul está lavándose y Lucas es muy bueno en matemáticas.', 'Busca en cada frase la palabra que cambia la verdad.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MAILS, lineas: ['A family leaves messages for a week.', 'There are eggs and bread.', 'Sofía forgets a project and solves it.', 'Lucas hurts his foot and gets a new job.', 'The pizza is in the oven.', 'The kids and Grandpa go to the game.'], ...S([1, 4], { 0: 'It says what the text is.', 2: 'It is the first problem.', 3: 'It is the second problem and its solution.', 5: 'It is the end.' }), bien: 'Problems and solutions stay.' },
      'Los huevos y la pizza son detalles; los problemas y sus soluciones son la historia.', 'Deja lo que le pasa a cada hijo y cómo acaba.'),
  ]);

  const LIBRARY = {
    id: 'icf-en-burro', title: 'The library with four legs',
    ficha: { autor: 'Young readers\' magazine', fuente: 'Section «People like us»', fecha: 'May 2026' },
    paras: [
      'When Nelson Bravo was a young teacher, he noticed that many of his students had no books at home. The school was two hours from the nearest town, and there was no road. One morning he put forty books on his donkey and went from farm to farm. He thought that nobody would open the door. He came back with an empty bag.',
      'Now he is fifty-three, and he has two donkeys, Comma and Period, and almost two thousand books. Every weekend he visits eight villages. Children wait for him under a tree. They can keep a book for two weeks and, if they tell the story to someone else, they get an extra week. "A book is not finished until you tell it," he says.',
      'At first, some parents were not happy. They thought that reading was a waste of time when there was so much work on the farm. Nelson did not argue. He started to bring books about cows, corn and water. Soon the parents were asking for them, and two of them have learned to read with their children.',
      'It isn\'t always easy. Once, thieves took his bag and found only fairy tales, so they gave it back. Another time, Period fell into the river. He was fine, but sixty books were wet. The children put them in the sun, page by page. Some of those books look terrible now. They are everybody\'s favourites.',
      'People often ask Nelson why he does not use a motorbike. He says that a motorbike cannot cross the river, and that nobody runs out of the house to see a motorbike. When he arrives, the first thing that children do is hug the donkeys. The second is to ask: "What did you bring today?"',
    ],
  };
  const l2 = leccion('icf-en-corto-2', 'What the text says', guion(
    ['Idea principal', 'De qué trata todo el texto, no un párrafo.'],
    ['Detalles', 'Quién, dónde, cuándo, cuánto: están escritos.'],
    ['Palabra por el contexto', 'Si no conoces una palabra, mira lo que la rodea.'],
    ['Correct, wrong, doesn’t say', 'Una opción puede sonar bien y no estar en el texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: LIBRARY, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['an unusual library', 0, 'Read the title again: what has four legs there?'], ['tell a person\'s story', 1, 'Read the name of the section.'], ['a magazine article', 2, 'Look at the source.'], ['a horse race', null, 'The title names another thing with the legs.'], ['sell furniture', null, 'A magazine for young readers is not a shop.'], ['a letter to a friend', null, 'A magazine section is not a private message.']),
      luz: [[1, 'forty books on his donkey'], [2, 'two thousand books']], bien: 'Title, author and section gave it away.' },
      'El título habla de una biblioteca rara y la sección, de personas: un artículo que cuenta una historia.', 'Lee por separado el título, quién escribe y la sección.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: LIBRARY,
      ...F(['tells how it started', 0, 'Look for a young teacher.'], ['tells how it works now', 1, 'Look for his age today.'], ['tells how parents changed', 2, 'Look for the parents.'], ['tells two difficult moments', 3, 'Look for thieves and a river.'], ['explains why donkeys', 4, 'Look for another kind of transport.'], ['explains how to build a road', null, 'Nobody builds a road here.']),
      luz: [[1, 'a young teacher'], [2, 'Now he is fifty-three'], [3, 'some parents were not happy'], [4, 'It isn\'t always easy'], [5, 'a motorbike']], bien: 'Start, now, parents, problems and donkeys.' },
      'El texto cuenta el comienzo, cómo funciona hoy, el cambio de los padres, dos problemas y por qué burros.', 'Lee la primera oración de cada párrafo y nómbrala.'),
    x('genero-o-cita', 'Is it **correct** or does the text **not say** it?', { doc: LIBRARY, rot: ['correct', 'doesn\'t say'],
      ...F(['Children can keep a book for two weeks.', 0, '¿Encuentras la oración que lo dice?'], ['Nelson is married.', 1, '¿Encuentras la oración que lo dice?'], ['He has two donkeys.', 0, '¿Encuentras la oración que lo dice?'], ['The government gives him money.', 1, '¿Encuentras la oración que lo dice?'], ['Thieves gave his bag back.', 0, '¿Encuentras la oración que lo dice?']), bien: 'If you can\'t find it, it doesn\'t say.' },
      'Las dos semanas, los dos burros y los ladrones están escritos; el matrimonio y el dinero no aparecen.', 'Busca la oración; si no la encuentras, no lo dice.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LIBRARY, frases: [[1, 'he ', 'noticed', ' that many of his students had no books'], [3, 'reading was ', 'a waste of time', ''], [4, 'Some of those books ', 'look terrible', ' now']],
      ...F(['saw', 0, 'He was their teacher: what did he do?'], ['not useful', 1, 'There was a lot of work: what did parents think?'], ['are in bad condition', 2, 'They were wet and dried in the sun.'], ['very important', null, 'Parents thought the opposite at first.'], ['are more expensive', null, 'Nobody talks about the price of the books.']), bien: 'The sentence gives the meaning.' },
      '«Noticed» es vio, «a waste of time» es inútil y «look terrible» es que están en mal estado.', 'Mira lo que pasa antes y después de la palabra.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LIBRARY, rot: ['when he was young', 'at first with parents', 'now'],
      ...F(['He took forty books to the farms', 0, 'Busca «a young teacher».'], ['They thought reading was not useful', 1, 'Busca «At first».'], ['He visits eight villages', 2, 'Busca «Every weekend».'], ['He has almost two thousand books', 2, 'Busca la palabra «Now».']), luz: [[1, 'One morning'], [3, 'At first'], [2, 'Every weekend']], bien: 'Was, thought, visits.' },
      'Los cuarenta libros son del comienzo, la duda de los padres vino al principio y lo demás es de hoy.', 'Mira el tiempo del verbo y las palabras de tiempo.'),
    x('tira-referente', 'What do these words refer to?', { doc: LIBRARY, texto: '|Thieves| took |his bag| and found only |fairy tales|, so they gave it back.',
      ...T(['«they»', 0, 'Put it in the sentence: who gave something back?'], ['«it»', 1, 'Put it in the sentence: what did they take?']), bien: 'People, and one thing.' },
      '«They» son los ladrones y «it» es la bolsa, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LIBRARY, nums: [1, 4, 5], pregunta: 'It is true', queda: 'Parents changed their minds.',
      ...T(['There was a good road to the school.', 1, 'Busca cómo se llegaba a la escuela.'], ['The wet books were thrown away.', [9, 10, 11], 'Busca qué hicieron con los libros mojados.'], ['A motorbike would be better, Nelson says.', 13, 'Busca por qué no la usa.']), bien: 'One sentence says no.' },
      'No había carretera, los libros mojados se secaron y siguen siendo favoritos, y la moto no cruza el río.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LIBRARY, lineas: ['A teacher takes books to farms on donkeys.', 'One donkey is called Comma.', 'Children borrow books and tell the stories.', 'Parents became interested too.', 'It takes two hours to get to town.', 'He does not change the donkeys for a motorbike.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it works.', 3: 'It is an important change.', 5: 'It is the end and the reason.' }), bien: 'Idea, system, change and reason.' },
      'El nombre del burro y las dos horas son detalles; lo demás es la historia.', 'Deja lo que contarías en una frase a un amigo.'),
  ]);

  const PIANO = {
    id: 'icf-en-piano', title: 'The piano at the station',
    paras: [
      'Last year, somebody left an old piano at the train station in our town. There was a note on it: "Play me. I am free." At first, people only looked at it. Then a cleaner called Marta sat down one night, after work, and played a song that she had learned when she was six.',
      'Someone made a video, and soon the station was full of music. Students played before class, and an old man came every day at five to play the same waltz. The trains were still late, but nobody complained as much as before.',
      'In December, the company wanted to take the piano away because some passengers could not hear the announcements. People signed a letter, and the company had a better idea: now there is a small red light on the piano. When it turns on, you stop playing for a minute.',
      'Marta still cleans the station. On Fridays she gives lessons there for free. Her oldest student is the man of the waltz. He is learning a second song.',
    ],
  };
  const Q = preg(PIANO, 'ingles');
  return mundo('icf-en-corto', 'Textos Cortos', 'ingles', [l1, l2], [
    ['icf-en-corto-1', 'Un mensaje tiene un propósito: pedir, avisar, invitar.', Q('The note on the piano invited people to:', ['Buy the piano', 'Play the piano', 'Clean the piano', 'Move the piano'], 1, '«Play me. I am free» invita a tocarlo; «free» es que no cuesta.', 'Lee la nota que está entre comillas.')],
    ['icf-en-corto-1', 'Busca qué hay que hacer y cuándo.', Q('When the red light turns on, people must:', ['Leave the station', 'Play louder', 'Wait for a minute without playing', 'Buy a ticket'], 2, '«You stop playing for a minute»: hay que parar un minuto.', 'Lee la última oración del párrafo 3.')],
    ['icf-en-corto-2', 'La idea principal vale para todo el texto.', Q('What is the text mainly about?', ['A train company that loses money', 'An old man who can\'t play', 'A cleaner who leaves her job', 'How a piano changed life at a station'], 3, 'Todo el texto cuenta lo que pasó en la estación desde que apareció el piano.', 'Busca la opción que sirve para los cuatro párrafos.')],
    ['icf-en-corto-2', 'La razón está junto a «because».', Q('The company wanted to take the piano away because:', ['Some passengers could not hear the announcements', 'The piano was too old', 'Marta played every night', 'The trains were late'], 0, '«Because some passengers could not hear the announcements».', 'Busca «because» en el párrafo 3.')],
    ['icf-en-corto-2', 'Lo que no se puede señalar, el texto no lo dice.', Q('Which of these does the text NOT say?', ['Marta gives free lessons', 'The old man plays a waltz', 'Students played before class', 'The piano was made in France'], 3, 'Las clases, el vals y los estudiantes están; de dónde es el piano no se dice.', 'Busca cada opción: una no aparece.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-largo.js
// Preicfes · Inglés · mundo 5 «Textos Largos» (spec 2026-11-25-preicfes-estructura): artículos de nivel intermedio, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const NIGHT = {
    id: 'icf-en-night', title: 'The school that opens at night',
    ficha: { autor: 'Interview by Laura Peña', fuente: 'Magazine «Second Chances»', fecha: 'June 2026' },
    paras: [
      'Every evening, when most schools are dark, the lights of the San Roque school come on. The students are not children. Some of them are builders who still have paint on their hands; others are grandmothers who have already cooked dinner for six. The youngest is nineteen and the oldest is seventy-four. They are all here to finish the studies that they once had to leave.',
      'The night school was the idea of Teresa Lozano, who used to clean the building in the afternoons. She could not read the notes that the teachers left for her, and she was too embarrassed to say so. One day she threw away a box of exams by mistake. Instead of shouting at her, the maths teacher, Mr Ibarra, asked her a simple question: "Would you like to learn?"',
      'At first there were only two of them, sitting in an empty classroom. Then Teresa brought her sister, and her sister brought three neighbours. After a year there were forty students, and the headteacher had to ask the town for money to pay the electricity. Today there are two hundred and ten, as well as a waiting list.',
      'The biggest problem is not the maths, Mr Ibarra says, but tiredness. Many students work for ten hours before they come. For that reason, classes last only forty minutes, and the first five are always for coffee. "You cannot teach a person who is asleep," he explains. The school also looks after the students\' children in a room next door, because otherwise half of the mothers would stay at home.',
      'Not everybody finishes. About a third of the students leave during the first three months, often because they have found a job with a different timetable. The school does not see this as a failure. It keeps their notebooks in a cupboard with their names on them, and almost half of those who leave come back one day to ask for them.',
      'Teresa finished secondary school last December, at the age of sixty-one. She no longer cleans the building: she works in the office, where she writes the notes that other people read. On the wall behind her desk there is an old box. It still says "Exams".',
    ],
  };
  const l1 = leccion('icf-en-largo-1', 'Main idea and details', guion(
    ['Primero, de qué trata', 'Lee el título y la primera oración de cada párrafo.'],
    ['La idea de un párrafo', 'Lo que tienen en común sus oraciones.'],
    ['Detalles', 'La pregunta usa otras palabras: «at the age of sixty-one» es «when she was 61».'],
    ['Orden', 'Las preguntas suelen seguir el orden del texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: NIGHT, frase: 'It is about [0], from [1], and it wants [2].', rot: ['what topic?', 'where does it appear?', 'what for?'],
      ...F(['a school for adults', 0, 'Read the title: at what time does it open?'], ['a magazine', 1, 'Look at the source.'], ['to tell real stories', 2, 'Look at the source and the kind of text.'], ['a school for musicians', null, 'Nothing in the title talks about music.'], ['a text message', null, 'It has an interviewer and a source.'], ['to sell coffee', null, 'A magazine about second chances is not a shop.']),
      luz: [[1, 'The students are not children'], [1, 'finish the studies']], bien: 'Title and source gave it away.' },
      'El título habla de una escuela nocturna y la fuente es una revista de segundas oportunidades.', 'Lee por separado el título, quién escribe y la fuente.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: NIGHT,
      ...F(['presents the students', 0, 'Look for the people in the first lines.'], ['tells how the idea started', 1, 'Look for a mistake with a box.'], ['tells how it grew', 2, 'Look for the numbers of students.'], ['explains a problem and its solutions', 3, 'Look for tired people.'], ['talks about those who leave', 4, 'Look for a cupboard.'], ['tells where Teresa is now', 5, 'Look for December.'], ['explains how to open a bank', null, 'Nobody talks about a bank.']),
      luz: [[1, 'The students are not children'], [2, 'was the idea of Teresa'], [3, 'After a year there were forty'], [4, 'The biggest problem'], [5, 'Not everybody finishes'], [6, 'Teresa finished']], bien: 'Students, idea, growth, problem, leaving, today.' },
      'El texto presenta a los estudiantes, cuenta el origen, el crecimiento, un problema, quiénes se van y el hoy.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: NIGHT,
      ...F(['Why are classes so short?', 3, 'Busca el párrafo que habla de un problema.'], ['How many people study there today?', 2, 'Busca el párrafo que cuenta cómo creció.'], ['What happens to the notebooks?', 4, 'Busca el párrafo de los que no terminan.']),
      luz: [[4, 'classes last only forty minutes'], [3, 'two hundred and ten'], [5, 'It keeps their notebooks']], bien: 'Each question has its paragraph.' },
      'La duración está en el 4, el número en el 3 y los cuadernos en el 5.', 'Di primero de qué habla cada párrafo del texto.'),
    x('linea-vida', 'Put each fact about Teresa in its moment.', { doc: NIGHT, rot: ['before the school', 'at the beginning', 'now'],
      ...F(['She could not read the notes', 0, 'Busca lo que no podía hacer.'], ['She cleaned the building', 0, 'Busca «used to».'], ['She brought her sister', 1, 'Busca «Then».'], ['She works in the office', 2, 'Busca «no longer».']), luz: [[2, 'used to clean'], [3, 'Teresa brought her sister'], [6, 'she works in the office']], bien: 'Used to, then and now.' },
      'No podía leer y limpiaba antes, trajo a su hermana al comienzo y hoy trabaja en la oficina.', '«Used to» es antes; «no longer» marca un cambio.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: NIGHT, nums: [2, 4], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Teresa was embarrassed.', 0, 'Léela junto al párrafo 2.'], ['Mr Ibarra understood why she made the mistake.', 1, '¿Qué le preguntó en vez de gritar?'], ['Some students have small children.', 1, '¿Para quiénes es el cuarto de al lado?'], ['Mr Ibarra has three children.', 2, '¿Se habla de su familia?']),
      luz: [[2, 'too embarrassed to say so'], [2, 'Would you like to learn?'], [4, 'looks after the students\' children']], bien: 'His question shows that he understood.' },
      'La pena está escrita; que él entendió y que hay estudiantes con hijos pequeños se deducen; sus hijos no se nombran.', 'Mira qué hace cada persona, no solo lo que dice.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: NIGHT, nums: [1, 4, 5], pregunta: 'It is true', queda: 'The oldest student is seventy-four.',
      ...T(['The students are children.', [1, 2, 3], 'Busca quiénes no son.'], ['The biggest problem is maths.', 5, 'Busca cuál es el problema.'], ['The school thinks that leaving is a failure.', 12, 'Busca qué piensa la escuela.']), bien: 'One sentence says no.' },
      'No son niños, el problema es el cansancio y la escuela no lo ve como un fracaso.', 'Busca en el texto la palabra clave de cada frase.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: NIGHT, frases: [[2, 'she was too ', 'embarrassed', ' to say so'], [4, 'The school also ', 'looks after', ' the students\' children'], [6, 'She ', 'no longer cleans', ' the building']],
      ...F(['ashamed', 0, 'She could not read: how did she feel?'], ['takes care of', 1, 'What does the school do with them in the room?'], ['doesn\'t clean any more', 2, 'Does she clean now?'], ['proud', null, 'It is the opposite of how she felt.'], ['searches for', null, 'The children are not lost.']), bien: 'The sentence gives the meaning.' },
      '«Embarrassed» es con vergüenza, «looks after» es cuidar y «no longer» es ya no.', 'Mira lo que pasa antes y después de la palabra.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: NIGHT, lineas: ['Adults finish school at night.', 'There is a cupboard.', 'A cleaner and a teacher started it.', 'The school adapts to tired students.', 'Classes begin with coffee.', 'Today Teresa works in the office.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is how it works.', 5: 'It closes the story.' }), bien: 'Idea, start, system and end.' },
      'El mueble y el café son detalles; lo demás es la historia.', 'Deja lo que contarías a alguien en un minuto.'),
  ]);

  const SILENCE = {
    id: 'icf-en-noise', title: 'Please don\'t help me with my silence',
    ficha: { autor: 'Daniela Rueda', fuente: 'Opinion page, «Campus News»', fecha: 'May 2026' },
    paras: [
      'I have been quiet since I was born. My mother says that I did not cry: I looked around. At school, my teachers wrote the same sentence every year: "Daniela is an excellent student, but she should participate more." I am twenty now, and I would like to answer them, in writing, of course.',
      'People usually think that quiet people are sad, rude or afraid. Some are, just as some noisy people are. But silence can also be a way of listening. In a group of five, if four are talking, somebody has to notice that the fifth idea was the best one. Very often, that somebody is me.',
      'I understand why teachers ask us to speak. It is difficult to know what a student is thinking if she never opens her mouth, and in many jobs you have to explain your ideas aloud. I have worked on it, and I can do it. What I do not accept is the word "but" in that sentence, as if being quiet were a hole in an otherwise good person.',
      'Last month, a professor tried something different. Before each discussion, she gave us three minutes to write. Then everybody read one idea. The result surprised her: the students who usually talked the most had the shortest papers, and some of the best questions came from the back of the room. She has used the method ever since, and nobody calls it a favour for shy people any more.',
      'I am not asking noisy people to be quiet. I love my noisy friends; they order the pizza, and I hate the telephone. I am asking for something smaller: a pause. Count to five before you fill the silence. You may discover that it was not empty.',
      'So, dear teachers, thank you for those twelve reports. If you ever write one about a student like me again, please take out three letters. "Daniela is an excellent student, and she listens." You will not need the rest.',
    ],
  };
  const l2 = leccion('icf-en-largo-2', 'The writer and the reader', guion(
    ['¿Para qué escribe?', 'To tell, to explain, to complain, to persuade, to thank…'],
    ['¿Qué siente u opina?', 'Busca adjetivos, «I think», «what I do not accept».'],
    ['¿Qué quiere del lector?', 'Pide, invita o advierte: «I am asking for…».'],
    ['El tono', 'Puede ser serio, divertido, molesto o agradecido.']), [
    x('pinta-tipos', 'Paint each sentence: is it a fact or an opinion?', { doc: SILENCE, plumas: ['fact', 'opinion'],
      ...P(['I am twenty now.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Silence can be a way of listening.', 1, '¿Se puede comprobar o es lo que ella piensa?'], ['A professor gave us three minutes to write.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Being quiet is not a hole in a person.', 1, '¿Se puede comprobar o es lo que ella piensa?']), bien: 'You can check a fact.' },
      'La edad y los tres minutos se comprueban; lo demás es lo que ella piensa del silencio.', 'Pregunta si alguien podría no estar de acuerdo.'),
    x('voz-de-la-fuente', 'Match each purpose with its paragraph.', { ayuda: 'Tira un hilo desde cada propósito hasta su párrafo.', doc: SILENCE, portadas: [['Paragraph 2', 'text'], ['Paragraph 3', 'text'], ['Paragraph 4', 'text'], ['Paragraph 5', 'text']],
      ...T(['to correct a wrong idea', 0, '¿Cuál empieza con lo que la gente piensa?'], ['to accept a reason and set a limit', 1, '¿Cuál empieza con «I understand»?'], ['to give an example', 2, '¿Cuál cuenta lo que hizo alguien?'], ['to ask the reader for something', 3, '¿Cuál dice lo que pide?']), bien: 'Correct, accept, show, ask.' },
      'El 2 corrige una idea, el 3 reconoce y pone un límite, el 4 da un ejemplo y el 5 pide algo.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('genero-o-cita', 'Would the writer **agree** or **disagree**?', { doc: SILENCE, rot: ['she agrees', 'she disagrees'],
      ...F(['Quiet students can have great ideas.', 0, '¿Qué mostró el método de la profesora?'], ['Noisy people should stop talking.', 1, '¿Qué dice que no está pidiendo?'], ['Speaking aloud is useful in many jobs.', 0, '¿Qué reconoce en el párrafo 3?'], ['A quiet person always feels sad.', 1, '¿Qué piensa de esa idea?']), bien: 'She asks for a pause, not for silence.' },
      'Reconoce que hablar sirve y que los callados tienen ideas; no pide callar a nadie ni cree que estén tristes.', 'Busca en el texto qué dice ella de cada idea.'),
    x('subraya-tesis', 'Underline in paragraph 5 the sentence that says **what she is asking for**.', { doc: SILENCE, nums: [5], n: 1, va: ['5.2'], mira: { '5.0': 'She says what she is not asking.', '5.1': 'She talks about her friends.', '5.3': 'It is how to do it, not the request itself.', '5.4': 'It is what may happen after.' }, bien: 'She asks for something small.' },
      '«I am asking for something smaller: a pause» dice lo que pide.', 'Una oración dice lo que no pide; busca la que dice lo que sí.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: SILENCE, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['They had three minutes.', 0, 'It is true, but what happened after that?'], ['Writing first helped quiet students to share good ideas.', 1, 'Does it cover the whole paragraph?'], ['Students who talk a lot never think.', 2, 'Does the text say «never»?']),
      luz: [[4, 'she gave us three minutes to write'], [4, 'some of the best questions']], bien: 'The method gave everybody a chance.' },
      'Los tres minutos son un detalle; «never» dice de más; la idea justa es que escribir antes ayudó.', 'La idea justa explica para qué sirvió el método.'),
    x('tira-referente', 'A new sentence about her friends: what do these words refer to?', { doc: SILENCE, texto: 'I love |my noisy friends|; they order |the pizza|, and it is always good.',
      ...T(['«they»', 0, 'Put it in the sentence: who orders?'], ['«it»', 1, 'Put it in the sentence: what is good?']), bien: 'People, and one thing.' },
      '«They» son los amigos que piden y «it», la pizza, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: SILENCE, nums: [5, 6], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['She hates the telephone.', 0, 'Busca lo que odia.'], ['The three letters are the word "but".', 1, 'Compara la frase de los reportes con la nueva.'], ['She writes with humour.', 1, '¿Cómo suena lo de la pizza y los reportes?'], ['Her teachers have read this text.', 2, '¿Se dice si lo leyeron?']),
      luz: [[5, 'I hate the telephone'], [6, 'take out three letters']], bien: 'But becomes and.' },
      'Lo del teléfono está escrito; la palabra y el humor se deducen; si la leyeron no se sabe.', 'Compara las dos frases sobre Daniela, al comienzo y al final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: SILENCE, lineas: ['A quiet student answers her teachers.', 'She did not cry when she was born.', 'Silence can be a way of listening.', 'Writing first gave everybody a chance.', 'Her friends order pizza.', 'She asks people for a pause.'], ...S([1, 4], { 0: 'It is who writes and why.', 2: 'It is her main opinion.', 3: 'It is her example.', 5: 'It is her request.' }), bien: 'Purpose, opinion, example and request.' },
      'El nacimiento y la pizza son detalles; lo demás es su argumento.', 'Deja lo que ella quiere que entiendas al leerla.'),
  ]);

  const MAP = {
    id: 'icf-en-map', title: 'The man who draws wrong maps',
    paras: [
      'If you get lost in the old part of our city, there is a good chance that it is Fabio Serna\'s fault. For eleven years he has been drawing maps for tourists, and every one of them has a mistake. He makes the mistakes on purpose.',
      'It started when he worked in a hotel. Guests used to arrive with a perfect map on their phones, walk straight to the cathedral, take the same photo and walk straight back. "They had seen everything and met nobody," he says. So he drew a map in which one street was missing. The first couple who used it came back three hours late, with a bag of bread and the telephone number of a baker who had walked with them.',
      'His maps are free, and at the bottom they say, in very small letters: "This map has one mistake. Ask somebody." He never puts the mistake near a dangerous street, and he changes it every month, because the neighbours enjoy being asked, but it should not always be the same ones, at the same corner.',
      'Not everyone is amused. A tour company complained to the mayor that the maps made visitors miss their buses. The mayor\'s answer was to order two thousand copies. Since then, a university has studied the effect: visitors with Fabio\'s map talk to six local people on average, while those with a phone talk to one, and that one is usually the waiter.',
      'I asked Fabio if he was not tired of drawing the same streets. He gave me a map of my own neighbourhood, where I have lived for twenty years. I looked for the mistake all afternoon. In the end I had to ask a neighbour. We had never spoken before.',
    ],
  };
  const Q = preg(MAP, 'ingles');
  return mundo('icf-en-largo', 'Textos Largos', 'ingles', [l1, l2], [
    ['icf-en-largo-1', 'La idea principal sirve para todo el texto.', Q('What is the text mainly about?', ['A hotel that loses its guests', 'A tour company with late buses', 'Maps with a mistake that make people talk to each other', 'A baker who helps tourists'], 2, 'Todo el texto habla de los mapas con un error y de lo que producen.', 'Busca la opción que sirve para los cinco párrafos.')],
    ['icf-en-largo-1', 'La pregunta usa otras palabras que el texto.', Q('Why does Fabio change the mistake every month?', ['Because the streets are dangerous', 'So that the same neighbours are not always asked', 'Because the mayor told him to', 'To sell more maps'], 1, 'Los vecinos disfrutan que les pregunten, pero no siempre los mismos en la misma esquina.', 'Lee el final del párrafo 3.')],
    ['icf-en-largo-1', 'Los números: mira de quién es cada uno.', Q('According to the university, people who use a phone usually talk to:', ['One person, often a waiter', 'Six local people', 'Nobody', 'Two thousand people'], 0, '«Those with a phone talk to one, and that one is usually the waiter».', 'Hay dos números en el párrafo 4: mira cuál es el del teléfono.')],
    ['icf-en-largo-2', 'Pregunta para qué escribe el autor.', Q('The writer\'s main purpose is to:', ['Complain about tourists', 'Sell a map', 'Teach people to draw', 'Tell the story of an unusual project'], 3, 'Cuenta la historia de Fabio y de sus mapas, sin vender ni quejarse.', 'Piensa qué hace el autor en casi todos los párrafos.')],
    ['icf-en-largo-2', 'El final muestra lo que el autor aprendió.', Q('At the end, the writer realises that:', ['The map was perfect', 'Fabio is tired of his work', 'It is better to buy a phone', 'The people next door were strangers until that day'], 3, 'Después de veinte años nunca había hablado con su vecino.', 'Lee las dos últimas oraciones.')],
    ['icf-en-largo-2', 'El tono se nota en los gestos y las palabras.', Q('How does the mayor feel about the maps?', ['He likes them', 'He is afraid of them', 'He hasn\'t seen them', 'He wants to stop them'], 0, 'Ante la queja, mandó pedir dos mil copias: le gustan.', 'Mira qué hizo cuando recibió la queja.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-vocabulario.js
// Preicfes · Inglés · mundo 6 «Palabras en Contexto» (spec 2026-11-25-preicfes-estructura): textos de nivel A2 y B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BAKERY = {
    id: 'icf-en-bakery', title: 'A bakery without a door',
    ficha: { autor: 'Written by Iris Vélez', fuente: 'Travel blog «Slow Streets»', fecha: 'April 2026' },
    paras: [
      'There is a bakery in the old part of Popayán that has no door. It has a small window, a bell, and a basket that goes down on a rope from the second floor. You ring the bell, put your money in the basket and shout what you want. A minute later, the basket comes back with warm bread. In eleven years, nobody has ever stolen it.',
      'The owner, Fermín Ruiz, opened the place after an accident at work. He was told that he would hardly walk again, and his flat had thirty-two stairs. Moving was too expensive, so he decided to stay at home and let the bread travel instead of him. At first his neighbours laughed at the idea. Then they tried the bread.',
      'He gets up at three. He does not use any machines, except for an old radio. While the dough is resting, he reads the notes that people leave in the basket. Some are orders for the following day. Others are jokes, recipes, or questions such as "How do you get rid of mice?" He answers every one of them, usually with a piece of cake.',
      'Business has grown so quickly that a supermarket offered to sell his bread. He turned it down. "They wanted two thousand rolls a day, all the same size," he explains. "I make two hundred, and each one looks like the person I am thinking of." He did accept, however, a smaller offer: the hospital now sends a nurse with a long list every Friday.',
      'Last month the rope broke. The basket fell on the street with forty rolls in it. Before Fermín could reach the window, the children of the block had already picked everything up, and someone had climbed a ladder with a new rope. There was one roll missing. The next morning he found a coin in the basket, with a note: "Sorry. I was hungry."',
    ],
  };
  const l1 = leccion('icf-en-vocabulario-1', 'Choosing the right word', guion(
    ['Mira alrededor', 'La palabra correcta encaja en sentido y en gramática.'],
    ['Palabras parecidas', 'say / tell, make / do, look / watch: cada una tiene su compañía.'],
    ['Verbos con partícula', 'get up, give up, turn down, look after: el sentido cambia.'],
    ['Cantidad', 'much, many, few, any, every.']), [
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: BAKERY, frases: [[2, 'he would ', 'hardly', ' walk again'], [3, 'How do you ', 'get rid of', ' mice?'], [4, 'He ', 'turned it down', '.']],
      ...F(['only with difficulty', 0, 'After the accident, could he walk easily?'], ['remove', 1, 'Who wants mice at home?'], ['said no to it', 2, 'Did the supermarket sell his bread?'], ['very fast', null, 'He had an accident: think about it.'], ['accepted it', null, 'It is the opposite.']), bien: 'The sentence gives the meaning.' },
      '«Hardly» es apenas, «get rid of» es deshacerse de y «turn down» es rechazar.', 'Lee lo que pasa antes y después de cada palabra.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: BAKERY, pares: [['He uses no machines,', 'an old radio.'], ['Moving was too expensive,', 'he stayed at home.'], ['He reads the notes', 'the dough is resting.']],
      ...F(['except for', 0, 'One thing is different: which pair has an exception?'], ['so', 1, 'The second idea is the result of the first one.'], ['while', 2, 'Two things happen at the same time.'], ['because of', null, 'It gives a cause before a noun.'], ['unless', null, 'It is a condition: no pair has one.']), bien: 'Exception, result and time.' },
      '«Except for» exceptúa, «so» da el resultado y «while» indica a la vez.', 'Di qué hace la segunda idea con la primera.'),
    x('genero-o-cita', 'Which verb goes with it: **make** or **do**?', { doc: BAKERY, rot: ['make', 'do'],
      ...F(['a cake', 0, '¿Se fabrica algo?'], ['your homework', 1, '¿Es una tarea?'], ['a mistake', 0, '¿Con qué verbo se dice «cometer un error»?'], ['the shopping', 1, '¿Es una actividad?'], ['a decision', 0, '¿Con qué verbo se dice «tomar una decisión»?']), bien: 'Make a cake, do a task.' },
      '«Make» crea algo (cake, mistake, decision); «do» es para tareas (homework, shopping).', 'Piensa si se crea algo nuevo o se realiza una tarea.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: BAKERY, nums: [1, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The bakery has no door.', 0, 'Búscala al comienzo.'], ['The neighbours care about Fermín.', 1, '¿Qué hicieron cuando se rompió la cuerda?'], ['The person with the coin felt bad.', 1, '¿Qué dice la nota?'], ['The rope was made in China.', 2, '¿Se dice de dónde es?']),
      luz: [[1, 'has no door'], [5, 'picked everything up'], [5, 'Sorry. I was hungry']], bien: 'A coin and a note say a lot.' },
      'La puerta está escrita; el cariño y la pena se deducen; el origen de la cuerda no.', 'Mira lo que hace la gente en el último párrafo.'),
    x('pista-tipo', 'Match each word with its opposite.', { doc: BAKERY, lineas: ['expensive', 'accept', 'warm', 'following'],
      ...T(['cheap', 0, '¿Cuál habla de precio?'], ['turn down', 1, '¿Cuál es decir sí?'], ['cold', 2, '¿Cuál habla de temperatura?'], ['previous', 3, '¿Cuál habla de lo que viene después?']), bien: 'Price, answer, heat and time.' },
      'Caro y barato, aceptar y rechazar, tibio y frío, siguiente y anterior.', 'Di primero de qué habla cada palabra de la lista.'),
    x('tira-referente', 'What do these words refer to?', { doc: BAKERY, texto: '|The supermarket| wanted |the rolls|, but it wanted them all the same size.',
      ...T(['«it»', 0, 'Put it in the sentence: who wanted?'], ['«them»', 1, 'Put it in the sentence: what was the same size?']), bien: 'One place, many things.' },
      '«It» es el supermercado, uno solo; «them», los panes, varios.', '«It» es para uno solo y «them» es para varios.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BAKERY, nums: [1, 2, 4], pregunta: 'It is true', queda: 'The hospital buys his bread.',
      ...T(['People often steal the basket.', 4, 'Busca qué ha pasado en once años.'], ['The neighbours loved the idea from the beginning.', 8, 'Busca qué hicieron al comienzo.'], ['He makes two thousand rolls a day.', 13, 'Busca cuántos hace él.']), bien: 'One sentence says no.' },
      'Nadie la ha robado, al comienzo se rieron y él hace doscientos.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BAKERY, lineas: ['A man sells bread with a basket on a rope.', 'He has an old radio.', 'He started after an accident.', 'He keeps his business small.', 'A nurse comes on Fridays.', 'His neighbours help him.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is his decision.', 5: 'It is the end.' }), bien: 'Idea, start, decision and end.' },
      'La radio y la enfermera son detalles; lo demás es la historia.', 'Deja lo que contarías de la historia en cuatro frases.'),
  ]);

  const RIVER = {
    id: 'icf-en-river', title: 'The beautiful art of being bored',
    ficha: { autor: 'Dr Marcos Lema', fuente: 'Science page for students', fecha: 'May 2026' },
    paras: [
      'When did you last feel bored? For many people the answer is surprising: they cannot remember. A bus is late, and we look at our phones. A film becomes slow, and we look at our phones. We have almost completely lost the ability to do nothing, and some scientists are worried about it.',
      'Boredom is unpleasant, of course. Nevertheless, it seems to be useful. In one study, people were asked to copy numbers from a telephone book for fifteen minutes, which is a terribly boring task. Afterwards they had to think of different uses for a plastic cup. They had more original ideas than another group, who had not copied anything.',
      'The explanation may be simple. When nothing interesting happens outside, the mind starts looking for something inside. It remembers, imagines and makes unexpected connections. In addition, boredom tells us that what we are doing is not meaningful enough, so it pushes us to change. Without it, we would probably stay in front of the same wall for ever.',
      'This does not mean that every kind of boredom is good. A person who is bored at work for years can become unhappy or even ill. Moreover, people who get bored easily sometimes look for dangerous ways of feeling alive. As with salt, the right amount makes the difference.',
      'So what can we do? I am not going to suggest that you throw your phone into the river. Instead, try a small experiment. The next time you are waiting for something, keep your hands in your pockets. At first you will feel uncomfortable. Then, if you are lucky, you will have an idea. And if you have no idea at all, at least you will have seen what the sky looks like on a Tuesday.',
    ],
  };
  const l2 = leccion('icf-en-vocabulario-2', 'Word families and connectors', guion(
    ['Familias', 'bore, bored, boring, boredom: el final dice qué clase de palabra es.'],
    ['Prefijos', 'un-, dis-, in- dan lo contrario: unpleasant, unexpected.'],
    ['Conectores', 'However y nevertheless contrastan; moreover agrega; therefore concluye.'],
    ['-ed y -ing', 'bored es cómo te sientes; boring es lo que lo causa.']), [
    x('genero-o-cita', 'Which one completes the idea: **bored** or **boring**?', { doc: RIVER, rot: ['bored', 'boring'],
      ...F(['I am ___ today.', 0, '¿Habla de cómo se siente alguien?'], ['This film is ___.', 1, '¿Habla de la cosa que lo causa?'], ['The children look ___.', 0, '¿Habla de cómo se siente alguien?'], ['What a ___ task!', 1, '¿Habla de la cosa que lo causa?']), bien: 'People are bored; things are boring.' },
      '«Bored» es cómo se siente alguien; «boring», lo que aburre.', 'Pregunta si la palabra habla de quien siente o de lo que causa.'),
    x('pinta-tipos', 'Paint each word with its type.', { doc: RIVER, plumas: ['noun', 'adjective', 'adverb'],
      ...P(['boredom', 0, 'Look at the end of the word.'], ['useful', 1, 'Look at the end of the word.'], ['completely', 2, 'Look at the end of the word.'], ['explanation', 0, 'Look at the end of the word.'], ['dangerous', 1, 'Look at the end of the word.']), bien: '-dom, -tion; -ful, -ous; -ly.' },
      '«-dom» y «-tion» forman sustantivos, «-ful» y «-ous» adjetivos y «-ly» adverbios.', 'Compara las terminaciones: algunas se repiten.'),
    x('bisagras', 'Put the connector. Sobran dos.', { doc: RIVER, pares: [['Boredom is unpleasant.', 'it seems to be useful.'], ['It helps the mind.', 'it pushes us to change.'], ['I had nothing to do,', 'I looked at the sky.']],
      ...F(['Nevertheless,', 0, 'One idea is bad and the other one is good.'], ['In addition,', 1, 'It adds another good thing.'], ['so', 2, 'The second idea is the result.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, addition and result.' },
      '«Nevertheless» contrasta, «in addition» agrega y «so» da el resultado.', 'Di si la segunda idea se opone, se suma o resulta.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: RIVER, frases: [[1, 'lost the ', 'ability', ' to do nothing'], [3, 'makes ', 'unexpected', ' connections'], [2, '', 'Afterwards', ' they had to think']],
      ...F(['power', 0, 'It is something that we can do.'], ['surprising', 1, 'The prefix «un-» says «not».'], ['Later', 2, 'When did they do the second task?'], ['usual', null, 'It is the opposite of one of them.'], ['Before', null, 'It is the opposite of one of them.']), bien: 'Context and prefixes help.' },
      '«Ability» es la capacidad, «unexpected» lo que sorprende y «afterwards» después.', 'Mira el prefijo de la palabra o la oración completa.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: RIVER, filas: [{ antes: 'Boredom', topes: ['is useless', 'is always good', 'seems to be useful'], va: 2 }, { antes: 'The writer wants you to', topes: ['sell your phone', 'try an experiment', 'stop working'], va: 1 }, { antes: 'The bored group had', topes: ['more original ideas', 'no ideas', 'the same ideas'], va: 0 }], mira: ['Busca la palabra que suaviza la idea.', 'Relee el párrafo 5.', 'Relee el resultado del estudio.'], luz: [[2, 'it seems to be useful'], [5, 'try a small experiment'], [2, 'more original ideas']], bien: 'Seems, try and more.' },
      'Parece útil, propone un experimento y el grupo aburrido tuvo más ideas.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: RIVER,
      ...F(['presents the problem', 0, 'Look for what we have lost.'], ['describes a study', 1, 'Look for a telephone book.'], ['gives an explanation', 2, 'Look for the mind.'], ['shows the other side', 3, 'Look for salt.'], ['suggests something to do', 4, 'Look for pockets.'], ['sells a phone', null, 'Nobody sells anything.']),
      luz: [[1, 'lost the ability'], [2, 'In one study'], [3, 'The explanation'], [4, 'This does not mean'], [5, 'try a small experiment']], bien: 'Problem, study, why, but, so.' },
      'Presenta el problema, un estudio, la explicación, un límite y una sugerencia.', 'Lee el comienzo de cada párrafo y dile un nombre.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: RIVER, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['Salt is in the text.', 0, 'It is true, but what does it compare?'], ['Some boredom helps, but too much can be bad.', 1, 'Compare it with the last sentence.'], ['Boredom always makes people ill.', 2, 'Does the text say «always»?']),
      luz: [[4, 'the right amount'], [4, 'This does not mean']], bien: 'The right amount.' },
      'La sal es una comparación, «always» dice de más y la idea justa es la cantidad adecuada.', 'Mira la palabra «every» y la última oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RIVER, lineas: ['We have forgotten how to be bored.', 'The cup is plastic.', 'A little boredom can help us to have ideas.', 'Too much boredom can be bad.', 'It was a telephone book.', 'The writer suggests waiting without a phone.'], ...S([1, 4], { 0: 'It is the problem.', 2: 'It is the main idea.', 3: 'It is the limit.', 5: 'It is the suggestion.' }), bien: 'Problem, idea, limit and suggestion.' },
      'El vaso y el directorio son detalles del estudio; lo demás es el argumento.', 'Deja lo que usarías para explicarle el texto a alguien.'),
  ]);

  const LIGHT = {
    id: 'icf-en-light', title: 'The lighthouse keeper\'s cat',
    paras: [
      'Sergio Paz had lived alone in the lighthouse for nine years when a cat arrived. Nobody knows how it crossed the water. It was thin, wet and extremely angry, and it immediately chose the only comfortable chair.',
      'At first, Sergio was not pleased. He was used to silence, and the cat complained about everything: the food, the wind and, above all, the radio. However, he soon noticed something strange. Every time that the cat hid under the bed, a storm came within two hours. The official weather service was often wrong. The cat was not.',
      'Sergio began to write it down. He also told the fishermen, who laughed at him until one of them decided not to go out one morning because the cat was hiding. That day three boats were damaged. Since then, the fishermen have called the lighthouse before every trip. They do not ask for the weather forecast. They ask: "Where is she?"',
      'A scientist who visited the island last year was careful. Cats, she explained, may feel changes in air pressure, so there is probably no magic in it. Nevertheless, before she left, she asked Sergio to phone her if the cat went under the bed.',
      'Sergio has been offered a modern station with sensors and a screen. He has accepted it, although he keeps it in the kitchen, next to the fish. "The machine tells me what is happening," he says. "She tells me whether I should worry."',
    ],
  };
  const Q = preg(LIGHT, 'ingles');
  return mundo('icf-en-vocabulario', 'Palabras en Contexto', 'ingles', [l1, l2], [
    ['icf-en-vocabulario-1', 'Mira lo que hace el personaje para entender la palabra.', Q('«At first, Sergio was not pleased» means that he was:', ['Unhappy about the cat', 'Asleep', 'Very tired of fishing', 'Glad to have a cat'], 0, '«Pleased» es contento; con «not», no le gustó.', 'Mira lo que hacía el gato y cómo vivía Sergio.')],
    ['icf-en-vocabulario-1', '«Be used to» es estar acostumbrado.', Q('«He was used to silence» means that silence was:', ['Something he hated', 'Something new for him', 'Something normal for him', 'Something he needed to buy'], 2, 'Después de nueve años solo, el silencio era lo normal.', 'Piensa cuántos años había vivido solo.')],
    ['icf-en-vocabulario-1', 'Escoge la palabra que encaja en sentido y gramática.', Q('Which word could replace «damaged» in paragraph 3?', ['Painted', 'Sold', 'Broken', 'Built'], 2, 'Después de una tormenta, las barcas quedaron dañadas.', 'Piensa qué hace una tormenta con una barca.')],
    ['icf-en-vocabulario-2', 'Nevertheless contrasta.', Q('In paragraph 4, «Nevertheless» shows that the scientist:', ['Believed in magic', 'Was angry', 'Didn\'t like cats', 'Trusted the cat a little, although she had an explanation'], 3, 'Explica que no es magia y, aun así, pide que la llamen.', 'Compara lo que explicó con lo que pidió.')],
    ['icf-en-vocabulario-2', '-ly forma adverbios: cómo o cuándo ocurre algo.', Q('In «it immediately chose the only comfortable chair», «immediately» tells us:', ['When it chose the chair', 'Which chair it was', 'Why it chose the chair', 'Whose chair it was'], 0, '«Immediately» es de inmediato: dice cuándo.', 'Pregunta qué información agrega la palabra.')],
    ['icf-en-vocabulario-2', 'Although: aunque.', Q('What does Sergio mean in the last paragraph?', ['The machine is useless', 'The cat should use the machine', 'He will sell the cat', 'Both help him, but in different ways'], 3, 'La máquina informa y la gata le dice si preocuparse.', 'Compara lo que dice de la máquina con lo que dice de ella.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-inferencia.js
// Preicfes · Inglés · mundo 7 «Inferir y Opinar» (spec 2026-11-25-preicfes-estructura): textos de nivel B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const LETTER = {
    id: 'icf-en-postman', title: 'The postman\'s last street',
    ficha: { autor: 'Short story by Omar Díaz', fuente: 'Magazine «Small Towns»', fecha: 'March 2026' },
    paras: [
      'On his last working day, Mr Beltrán polished his shoes twice. He had carried letters along the same eleven streets for thirty-eight years, and he knew which dogs were only pretending. There were just nine envelopes in his bag. When he started, there used to be two hundred.',
      'At number four, Mrs Pinto was waiting behind the curtain, as usual. She always opened the door before he could ring. "Anything for me?" she asked. There was nothing; there had been nothing since her son stopped writing. Mr Beltrán put his hand in the bag, took out a supermarket leaflet and gave it to her with great care, as if it were made of glass. She thanked him and said she would read it after lunch.',
      'The baker gave him a warm roll without saying a word. He had never done that before. The children of the corner house had drawn a stamp on the pavement with chalk, so big that three of them could lie inside it. Mr Beltrán walked around it, even though it was raining and his shoes were already wet.',
      'In the last street lived a man who had not spoken to him since 1997, because of a parcel that arrived broken. Mr Beltrán had a letter for him. He could have left it in the box. Instead, he rang the bell. The man opened the door, looked at the letter, looked at the shoes, and then, for some reason, looked at his own hands. "You had better come in," he said. "The coffee is on."',
      'The next morning, at exactly eight, Mrs Pinto looked through the curtain. A young woman with a yellow helmet was riding past on a motorbike, and she did not stop. Mrs Pinto waited a little longer. Then she heard somebody whistling. Mr Beltrán was coming up the street, in old shoes, without a bag. He had a leaflet in his hand.',
    ],
  };
  const l1 = leccion('icf-en-inferencia-1', 'Reading between the lines', guion(
    ['Inferir', 'Unir dos datos del texto para entender algo que no está escrito.'],
    ['Gestos', 'Lo que un personaje hace dice lo que siente.'],
    ['Pistas, no imaginación', 'Debes poder señalar el dato que te hace pensarlo.'],
    ['Must, might, can’t', 'must be: seguro; might be: quizá; can’t be: imposible.']), [
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: LETTER, nums: [1, 2], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['There were nine envelopes in the bag.', 0, 'Busca el número de sobres.'], ['People write fewer letters now.', 1, 'Compara nueve con doscientos.'], ['Mrs Pinto misses her son.', 1, '¿Qué pregunta siempre y quién dejó de escribir?'], ['Her son lives in Spain.', 2, '¿Se dice dónde vive?']),
      luz: [[1, 'nine envelopes'], [1, 'two hundred'], [2, 'her son stopped writing']], bien: 'Two facts make one idea.' },
      'Nueve está escrito; que hoy se escribe menos y que ella extraña a su hijo se deducen; España no.', 'Une dos datos: si no puedes señalarlos, no está.'),
    x('pista-tipo', 'Match each action with the feeling it shows.', { doc: LETTER, lineas: ['He polished his shoes twice.', 'He gave the leaflet with great care.', 'He walked around the drawing.', 'The man looked at his own hands.'],
      ...T(['it is a special day for him', 0, '¿Cuál es de su último día?'], ['kindness to a lonely person', 1, '¿A quién le dio algo sin importancia?'], ['respect for what children made', 2, '¿Qué evitó pisar?'], ['he feels ashamed', 3, '¿Quién llevaba años sin hablar?']), bien: 'Actions speak.' },
      'Lustrar es por el día especial, el cuidado por bondad, rodear el dibujo por respeto y mirarse las manos por vergüenza.', 'Pregunta por qué una persona haría ese gesto.'),
    x('genero-o-cita', 'From the clues: **it must be true** or **it might be true**?', { doc: LETTER, rot: ['must be true', 'might be true'],
      ...F(['He worked for more than thirty years', 0, '¿Hay un dato que lo asegura?'], ['The letter was from the man\'s family', 1, '¿Se dice de quién era?'], ['The new post person uses a motorbike', 0, '¿Hay un dato que lo asegura?'], ['The baker felt sad', 1, '¿Es seguro o solo posible?']), bien: 'Must needs proof; might is possible.' },
      'Los 38 años y la moto están seguros; la familia y la tristeza son posibles.', '«Must» pide una prueba; «might» solo una posibilidad.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LETTER, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Mr Beltrán visits Mrs Pinto the next day.',
      ...T(['Mrs Pinto got a letter that day.', 3, 'Busca lo que había para ella.'], ['Mr Beltrán left the letter in the box.', 9, 'Busca qué hizo en su lugar.'], ['The woman on the motorbike stopped.', 14, 'Busca qué hizo al pasar.']), bien: 'One sentence says no.' },
      'No había nada para ella, él tocó el timbre y la moto no paró.', 'Busca en el texto la palabra clave de cada frase.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LETTER, rot: ['years before', 'the last day', 'the next morning'],
      ...F(['A parcel arrived broken', 0, 'Busca el año 1997.'], ['The baker gave him a roll', 1, 'Busca al panadero.'], ['He came with old shoes', 2, 'Busca cómo venía vestido al final.'], ['He had two hundred letters', 0, 'Busca «used to be».']), luz: [[4, 'since 1997'], [3, 'a warm roll'], [5, 'in old shoes']], bien: 'Used to, that day, next morning.' },
      'El paquete y las doscientas cartas son de antes, el pan del último día y los zapatos viejos del siguiente.', 'Busca la expresión de tiempo de cada hecho.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LETTER, frases: [[1, 'which dogs were only ', 'pretending', ''], [4, 'You ', 'had better', ' come in'], [3, '', 'even though', ' it was raining']],
      ...F(['acting', 0, 'Were those dogs really dangerous?'], ['should', 1, 'Is it an order, a wish or advice?'], ['although', 2, 'Does the rain agree with what he did?'], ['because', null, 'The rain is not the reason.'], ['can\'t', null, 'The man opened the door.']), bien: 'Context gives the meaning.' },
      '«Pretending» es fingir, «had better» es deberías y «even though» es aunque.', 'Lee toda la oración y piensa qué ocurre de verdad.'),
    x('talla-idea', 'Why did he come back? Put each idea in its size.', { doc: LETTER, p: 5, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['He was whistling.', 0, 'It is true, but why did he come?'], ['He knows that Mrs Pinto waits for someone every day.', 1, 'Join paragraph 2 and paragraph 5.'], ['He is going to live with Mrs Pinto.', 2, 'Does the text say that?']),
      luz: [[5, 'Mrs Pinto looked through the curtain'], [5, 'He had a leaflet in his hand']], bien: 'He keeps the visit, not the job.' },
      'Silbar es un detalle, vivir con ella dice de más; vuelve porque sabe que lo esperan.', 'Une el folleto del párrafo 2 con el del final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LETTER, lineas: ['A postman works for the last time.', 'The helmet is yellow.', 'He is kind to a lonely woman.', 'He makes peace with an old enemy.', 'It is raining.', 'The next day he visits the woman again.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is what we learn about him.', 3: 'It is an important change.', 5: 'It is the end of the story.' }), bien: 'Situation, kindness, peace and end.' },
      'El casco y la lluvia son detalles; lo demás es la historia.', 'Deja lo que muestra quién es él y qué cambia.'),
  ]);

  const ZOO = {
    id: 'icf-en-zoo', title: 'Should our zoo close?',
    ficha: { autor: 'Two letters to the editor', fuente: 'City newspaper', fecha: 'April 2026' },
    paras: [
      'FIRST LETTER, from Paula Henao. I went to the zoo last Sunday for the first time in twenty years. The same bear was walking the same eight steps, forwards and backwards, next to the same wall. I counted. My daughter asked me what he had done wrong. I could not answer her. I believe that the zoo should close.',
      'I know that zoos say they protect animals. Some really do. According to its own website, however, our zoo has 340 animals, and only six of them belong to species that are in danger. Nor has it returned a single one to nature since 2010. A place that locks up 334 animals so that we can eat ice cream in front of them is not a hospital. It is a shop window.',
      'SECOND LETTER, from Julián Marín, vet. Ms Henao is right about the bear, and I have said so for years. But she is wrong about the solution. Most of our animals were taken from people who kept them illegally: a monkey that lived in a bathroom, parrots without feathers. They cannot survive in the forest. If we close the zoo, where will they go?',
      'In my opinion, what we need is a different kind of zoo: no new animals, more space and fewer visitors. Last year 80,000 children came. Perhaps many of them only remember the ice cream. But one of them might become the person who protects the forest, and nobody protects what they have never seen.',
      'A week later the newspaper published a note from Ms Henao. "I visited Dr Marín. I still think that nobody needs to see a bear in order to love one. But I met the monkey from the bathroom, and I have changed my mind about closing. I would now say: stop buying, stop selling tickets at weekends, and move the bear first." Dr Marín\'s answer was even shorter: "The bear moves on Monday. Bring your daughter."',
    ],
  };
  const l2 = leccion('icf-en-inferencia-2', 'Opinions and facts', guion(
    ['Fact', 'Se puede comprobar: 340 animals.'],
    ['Opinion', 'I believe, in my opinion, should: alguien puede no estar de acuerdo.'],
    ['Reason', 'Una opinión vale más con razones y datos.'],
    ['Change of mind', 'Un buen argumento puede hacer cambiar de idea.']), [
    x('genero-o-cita', 'Is it a **fact** or an **opinion**?', { doc: ZOO, rot: ['fact', 'opinion'],
      ...F(['The zoo has 340 animals', 0, '¿Se puede contar?'], ['The zoo should close', 1, '¿Alguien puede no estar de acuerdo?'], ['80,000 children came last year', 0, '¿Se puede contar?'], ['It is a shop window', 1, '¿Es un dato o una comparación de quien opina?']), bien: 'Count it or discuss it.' },
      'Los animales y los niños se cuentan; cerrar y la vitrina son opiniones.', 'Pregunta si podrías comprobarlo con números.'),
    x('pinta-voces', 'Paint each idea with its writer.', { doc: ZOO, plumas: ['Paula Henao', 'Julián Marín'],
      ...P(['It is not a hospital.', 0, 'Busca la primera carta.'], ['They cannot survive in the forest.', 1, 'Busca quién es veterinario.'], ['No new animals and more space.', 1, 'Busca quién propone otra clase de zoo.'], ['Nobody needs to see a bear to love one.', 0, 'Busca quién escribió la nota final.']), bien: 'Two voices, two ideas.' },
      'Paula critica la vitrina y escribe la nota; Julián explica y propone otro zoo.', 'Busca la firma o el nombre antes de cada carta.'),
    x('balanza-tesis', 'Opinion: "our zoo does not protect animals". What does each fact do?', { doc: ZOO, tesis: 'Our zoo does not protect animals',
      ...F(['Only six animals are in danger.', 0, '¿La apoya o la debilita?'], ['Most animals were taken from illegal owners.', 1, '¿Los protegió de algo?'], ['It has not returned any animal to nature.', 0, '¿La apoya o la debilita?'], ['The ice cream is good.', 2, '¿Habla de proteger?']), bien: 'For, against, or nothing.' },
      'Seis en peligro y ninguno devuelto la apoyan; haberlos rescatado la debilita; el helado no pesa.', 'Pregunta si el dato muestra que protege o que no.'),
    x('pilares', 'What supports Dr Marín\'s idea: "We should not close the zoo"?', { doc: ZOO, idea: 'We should not close the zoo',
      ...F(['The animals cannot survive in the forest.', 0, '¿Explica por qué no cerrar?'], ['Children may learn to protect nature.', 0, '¿Explica por qué no cerrar?'], ['The bear walks eight steps.', 1, '¿Es una razón para no cerrar?'], ['The note was published a week later.', 1, '¿Es una razón para no cerrar?']), bien: 'Reasons answer why.' },
      'Que no sobrevivan y que los niños aprendan son razones; los pasos y la fecha no.', 'Une la idea y la frase con «because» y mira si tiene sentido.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: ZOO, pares: [['Ms Henao is right about the bear.', 'she is wrong about the solution.'], ['They can\'t survive in the forest,', 'the zoo can\'t close.'], ['We need a different zoo', 'the animals have nowhere to go.']],
      ...F(['However,', 0, 'One idea agrees and the other one does not.'], ['so', 1, 'The second idea is the result.'], ['because', 2, 'The second idea gives the reason.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, result and reason.' },
      '«However» contrasta, «so» da el resultado y «because» la razón.', 'Di qué hace la segunda idea con la primera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: ZOO, nums: [2, 3, 5], pregunta: 'It is true', queda: 'Ms Henao changed her mind.',
      ...T(['Most animals in the zoo are in danger.', 2, 'Busca cuántos están en peligro.'], ['Dr Marín thinks that the bear is fine.', 7, 'Busca en qué le da la razón.'], ['Ms Henao still wants to close the zoo.', 15, 'Busca en qué cambió de idea.']), bien: 'One sentence says no.' },
      'Solo seis están en peligro, él le da la razón sobre el oso y ella cambió de idea.', 'Busca en el texto la palabra clave de cada frase.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: ZOO, filas: [{ antes: 'The zoo has returned to nature', topes: ['many animals', 'six animals', 'no animals since 2010'], va: 2 }, { antes: 'One child', topes: ['will certainly', 'might', 'cannot'], va: 1 }, { antes: 'At the end they', topes: ['agree on some things', 'agree on nothing', 'never meet'], va: 0 }], mira: ['Busca lo que dice desde 2010.', 'Busca la palabra de posibilidad.', 'Relee la nota final.'], luz: [[2, 'Nor has it returned a single one'], [4, 'might become'], [5, 'I have changed my mind']], bien: 'None, might and some.' },
      'Ninguno desde 2010, «might» es posibilidad y al final coinciden en parte.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: ZOO, lineas: ['Two people write about closing a zoo.', 'The bear takes eight steps.', 'One says that it does not protect animals.', 'The other says that the animals have nowhere to go.', 'There are parrots.', 'They meet and find a middle way.'], ...S([1, 4], { 0: 'It is the topic.', 2: 'It is one opinion.', 3: 'It is the other opinion.', 5: 'It is the end.' }), bien: 'Topic, two opinions and end.' },
      'Los pasos y los loros son detalles; lo demás es la discusión.', 'Deja lo que explica en qué piensan distinto.'),
  ]);

  const TRAIN = {
    id: 'icf-en-shoes', title: 'The shoe museum',
    paras: [
      'There is a museum in our town with only one room and no famous object in it. It belongs to Alba Ríos, who used to repair shoes. For forty years, people left shoes in her shop and some of them never came back. She did not sell them. "Somebody might need to remember," she says.',
      'Each pair has a card. "Size 37, red. She said she would dance in them on Saturday. She never collected them, and that was the year of the flood." "Boots, very old. He came every month for twelve years to ask if they were ready. They were ready. He liked to talk."',
      'The council wanted to move the museum to a bigger building, with lights and a café. Alba thanked them and said no. A shoe, she explained, is the only thing that keeps the shape of a person, and shapes need quiet. Some people think that she is being difficult. I think she is right, although I would have liked the coffee.',
      'Last month a woman of about seventy came in, walked slowly along the wall and stopped in front of the red shoes. She did not say anything. She took off her own shoes, which were grey and comfortable, and she tried the red ones on. They still fitted. Alba turned up the radio.',
      'There is now an empty space on the wall. Alba has not taken away the card, but she has written one more line on it. I will not tell you what it says. You should go and read it.',
    ],
  };
  const Q = preg(TRAIN, 'ingles');
  return mundo('icf-en-inferencia', 'Inferir y Opinar', 'ingles', [l1, l2], [
    ['icf-en-inferencia-1', 'Une dos datos para deducir.', Q('What can we deduce about the woman of about seventy?', ['She wanted to steal the shoes', 'She worked in the museum', 'She was probably the owner of the red shoes', 'She had never seen them before'], 2, 'Se detiene ante ellos, se los prueba y todavía le quedan.', 'Une lo que hizo con que todavía le quedaban.')],
    ['icf-en-inferencia-1', 'Un gesto dice lo que no se dice.', Q('Why does Alba turn up the radio?', ['So that the woman can dance', 'Because she cannot hear', 'To make the woman leave', 'Because it is late'], 0, 'La tarjeta decía que iba a bailar con esos zapatos.', 'Recuerda lo que decía la tarjeta de los zapatos rojos.')],
    ['icf-en-inferencia-1', 'Los gestos muestran intenciones.', Q('Why did the man with the boots come every month?', ['They were never ready', 'He wanted his money', 'He had forgotten the shop', 'He enjoyed talking with Alba'], 3, '«They were ready. He liked to talk».', 'Lee las dos últimas frases de su tarjeta.')],
    ['icf-en-inferencia-2', 'Opinion: alguien puede no estar de acuerdo.', Q('Which sentence is an opinion of the writer?', ['The museum has one room', 'I think she is right', 'Each pair has a card', 'The council wanted to move it'], 1, '«I think» anuncia una opinión.', 'Busca la frase que alguien podría discutir.')],
    ['icf-en-inferencia-2', 'Una razón responde por qué.', Q('Why doesn\'t Alba want a bigger building?', ['It is too expensive', 'She doesn\'t like coffee', 'She thinks that the shoes need a quiet place', 'She wants to sell the shoes'], 2, '«Shapes need quiet»: necesitan silencio.', 'Lee lo que explica sobre los zapatos.')],
    ['icf-en-inferencia-2', 'El final puede invitar al lector.', Q('What does the writer want the reader to do?', ['Visit the museum', 'Buy red shoes', 'Write a card', 'Open a café'], 0, '«You should go and read it» invita a visitarlo.', 'Lee la última oración.')],
  ]);
})());
;
//#archivo js/data.js
// Contenido de Zuka: cursos → unidades → lecciones. Cada lección = 1 clip vertical + ejercicios.
// Álgebra, Trigonometría, Cálculo Diferencial y Geometría Vectorial viven en js/courses/; las ayudas para escribir contenido, en js/content.js.

const COURSES = [
  COURSE_ALGEBRA,
  COURSE_TRIG,
  COURSE_CALC,
  COURSE_GEO,
  COURSE_PREUDA,
  {
    id: 'fis', level: 'Semestre 1', name: 'Física Mecánica', icon: 'F', color: '#facc15',
    tagline: 'Por qué las cosas se mueven: fuerzas, energía y movimiento.',
    units: [
      {
        world: 'cinematica', title: 'Cinemática',
        lessons: [
          {
            id: 'fis-1', title: 'MRU y MRUA',
            clip: { scenes: [
              sc(5, '**MRU**: velocidad constante. La posición crece en línea recta.', { title: '$x = x_0 + v\\,t$', viz: { type: 'graph', xr: [0, 5], yr: [0, 22], f: t => 4 * t, draw: true, ax: ['t (s)', 'x (m)'] } }),
              sc(5, '**MRUA**: la velocidad cambia de forma constante. La gráfica es una parábola.', { title: '$x = x_0 + v_0 t + \\tfrac{1}{2} a t^2$', viz: { type: 'graph', xr: [0, 5], yr: [0, 26], f: t => t * t, draw: true, ax: ['t (s)', 'x (m)'] } }),
              sc(5, 'Y la velocidad crece linealmente con el tiempo.', { title: '$v = v_0 + a\\,t$', viz: { type: 'graph', xr: [0, 5], yr: [0, 12], f: t => 2 * t, draw: true, ax: ['t (s)', 'v (m/s)'] } }),
            ] },
            ex: [
              num('Un auto va a 20 m/s constantes. ¿Qué distancia recorre en 5 s?', 100, '$x = v\\,t = 20 \\cdot 5 = 100$ m.', { suffix: 'm' }),
              num('Parte del reposo con $a = 2$ m/s². ¿Velocidad a los 6 s?', 12, '$v = 0 + 2 \\cdot 6 = 12$ m/s.', { suffix: 'm/s' }),
              num('¿Y qué distancia recorrió en esos 6 s?', 36, '$x = \\tfrac{1}{2} \\cdot 2 \\cdot 6^2 = 36$ m.', { suffix: 'm' }),
              mc('En el MRU la aceleración es…', ['Cero', 'Constante y positiva', 'Igual a la velocidad', 'Igual a $g$'], 0, 'Velocidad constante ⇒ no hay aceleración.'),
            ],
          },
          {
            id: 'fis-2', title: 'Tiro parabólico',
            clip: { scenes: [
              sc(6, 'Un proyectil combina **dos movimientos**: MRU en $x$ y caída libre en $y$.', { viz: { type: 'projectile', v0: 20, ang: 50 } }),
              sc(5, 'Cambia el ángulo y cambia el alcance.', { viz: { type: 'projectile', v0: 20, anim: [15, 75] } }),
              sc(5, 'Sin resistencia del aire, el alcance máximo se logra a 45°.', { title: '$R = \\dfrac{v_0^2 \\sin 2\\theta}{g}$', viz: { type: 'projectile', v0: 20, ang: 45 } }),
            ] },
            ex: [
              sld('Ajusta el ángulo de lanzamiento para lograr el **máximo alcance**', {
                viz: { type: 'projectile', v0: 20 }, min: 10, max: 80, step: 5, init: 20,
                readout: v => `$\\theta = ${v}^\\circ$`, check: v => v === 45, answerText: '$\\theta = 45^\\circ$',
                explain: '$\\sin 2\\theta$ es máximo cuando $2\\theta = 90^\\circ$.',
              }),
              mc('En el punto más alto de la trayectoria, la velocidad vertical es…', ['Cero', 'Máxima', 'Igual a $v_0$', 'Igual a $g$'], 0, 'Deja de subir y empieza a bajar: $v_y = 0$.'),
              num('Caída libre desde 20 m con $g = 10$ m/s². ¿Tiempo en llegar al suelo?', 2, '$20 = \\tfrac{1}{2} \\cdot 10\\,t^2 \\Rightarrow t = 2$ s.', { suffix: 's' }),
            ],
          },
        ],
      },
      {
        world: 'dinamica', title: 'Dinámica',
        lessons: [
          {
            id: 'fis-3', title: 'Leyes de Newton',
            clip: { scenes: [
              sc(5, '**1ª ley**: sin fuerza neta, un cuerpo mantiene su velocidad.', { title: '$\\sum \\vec F = 0 \\Rightarrow \\vec v = \\text{cte}$', viz: { type: 'push', F: 0 } }),
              sc(5, '**2ª ley**: la fuerza neta produce aceleración.', { title: '$\\sum \\vec F = m\\,\\vec a$', viz: { type: 'push', F: 10, m: 2 } }),
              sc(5, '**3ª ley**: a toda acción corresponde una reacción igual y opuesta.', { viz: { type: 'push', pair: true } }),
            ] },
            ex: [
              num('Una masa de 5 kg acelera a 3 m/s². ¿Fuerza neta?', 15, '$F = m\\,a = 5 \\cdot 3 = 15$ N.', { suffix: 'N' }),
              sld('Ajusta la fuerza para que el bloque de 4 kg acelere a $2$ m/s²', {
                viz: { type: 'push', m: 4 }, min: 0, max: 20, step: 1, init: 2,
                readout: v => `$F = ${v}$ N`, check: v => v === 8, answerText: '$F = 8$ N', explain: '$F = m\\,a = 4 \\cdot 2 = 8$ N.',
              }),
              num('¿Cuánto pesa un objeto de 10 kg? ($g = 9.8$ m/s²)', 98, '$W = m\\,g = 98$ N.', { suffix: 'N' }),
              mc('Si empujas una pared con 50 N, la pared te empuja con…', ['50 N en sentido contrario', '0 N', 'Más de 50 N', 'Menos de 50 N'], 0, 'Tercera ley de Newton.'),
            ],
          },
          {
            id: 'fis-4', title: 'Plano inclinado',
            clip: { scenes: [
              sc(5, 'Un bloque sobre un plano inclinado. ¿Qué fuerzas actúan?', { viz: { type: 'incline', ang: 30 } }),
              sc(6, 'Descompón el peso en una parte paralela y otra perpendicular al plano.', { title: '$mg\\sin\\theta \\quad mg\\cos\\theta$', viz: { type: 'incline', ang: 30, comps: true } }),
              sc(5, 'Más inclinación → más componente que lo hace deslizar.', { viz: { type: 'incline', anim: [15, 55], comps: true } }),
            ] },
            ex: [
              sld('Ajusta $\\theta$ para que la componente paralela sea **la mitad** del peso', {
                viz: { type: 'incline', comps: true }, min: 5, max: 60, step: 5, init: 15,
                readout: v => `$\\theta = ${v}^\\circ$`, check: v => v === 30, answerText: '$\\theta = 30^\\circ$',
                explain: '$mg\\sin\\theta = \\tfrac{1}{2} mg \\Rightarrow \\sin\\theta = \\tfrac{1}{2} \\Rightarrow \\theta = 30^\\circ$.',
              }),
              num('Un bloque sin fricción baja por un plano de 30°. ¿Su aceleración? ($g = 10$)', 5, '$a = g \\sin 30^\\circ = 5$ m/s².', { suffix: 'm/s²' }),
              mc('La fuerza normal sobre el bloque vale…', ['$mg\\cos\\theta$', '$mg\\sin\\theta$', '$mg$', '$mg\\tan\\theta$'], 0, 'Equilibra la componente perpendicular del peso.'),
            ],
          },
          {
            id: 'fis-5', title: 'Trabajo y energía',
            clip: { scenes: [
              sc(5, 'La energía del movimiento es la **energía cinética**.', { title: '$E_c = \\tfrac{1}{2} m v^2$', viz: { type: 'graph', xr: [0, 5], yr: [0, 26], f: sq, draw: true, ax: ['v', 'Ec'] } }),
              sc(5, 'La energía por estar a cierta altura es la **potencial gravitatoria**.', { title: '$E_p = m\\,g\\,h$', viz: { type: 'energy' } }),
              sc(6, 'Sin fricción, al caer la potencial se convierte en cinética: la total se conserva.', { title: '$E_c + E_p = \\text{cte}$', viz: { type: 'energy' } }),
            ] },
            ex: [
              num('Energía cinética de una masa de 2 kg a 3 m/s', 9, '$\\tfrac{1}{2} \\cdot 2 \\cdot 3^2 = 9$ J.', { suffix: 'J' }),
              num('Energía potencial de 1 kg a 5 m de altura ($g = 10$)', 50, '$m\\,g\\,h = 1 \\cdot 10 \\cdot 5 = 50$ J.', { suffix: 'J' }),
              num('Un objeto cae desde 5 m ($g = 10$). ¿Con qué velocidad llega al suelo?', 10, '$m g h = \\tfrac{1}{2} m v^2 \\Rightarrow v = \\sqrt{2gh} = 10$ m/s.', { suffix: 'm/s' }),
              mc('Si no hay fricción, al caer la energía potencial…', ['Se convierte en cinética', 'Desaparece', 'Se duplica', 'Permanece igual'], 0, 'Conservación de la energía mecánica.'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'int', level: 'Semestre 2', name: 'Cálculo Integral', icon: '∫', color: '#34d399',
    tagline: 'Sumar lo infinitamente pequeño: áreas, volúmenes y acumulación.',
    units: [
      {
        world: 'integral', title: 'La integral',
        lessons: [
          {
            id: 'int-1', title: 'Área bajo la curva',
            clip: { scenes: [
              sc(5, '¿Cuál es el área bajo $y = x^2$ entre 0 y 2? Usemos rectángulos.', { viz: { type: 'riemann', f: sq, a: 0, b: 2, n: [4, 4], xr: [-0.3, 2.4], yr: [-0.5, 4.5] } }),
              sc(6, 'Más rectángulos → mejor aproximación.', { viz: { type: 'riemann', f: sq, a: 0, b: 2, n: [4, 80], xr: [-0.3, 2.4], yr: [-0.5, 4.5], exact: '8/3 ≈ 2.667' } }),
              sc(5, 'En el límite, la suma se vuelve una **integral**.', { title: '$\\displaystyle\\int_0^2 x^2\\,dx = \\dfrac{8}{3}$', viz: { type: 'riemann', f: sq, a: 0, b: 2, n: [300, 300], xr: [-0.3, 2.4], yr: [-0.5, 4.5] } }),
            ] },
            ex: [
              num('$\\displaystyle\\int_0^2 2x\\,dx = \\;?$ (pista: es un triángulo)', 4, 'Triángulo de base 2 y altura 4: área $= \\tfrac{1}{2} \\cdot 2 \\cdot 4 = 4$.'),
              mc('Si $n \\to \\infty$, la suma de Riemann…', ['Tiende al área exacta', 'Tiende a cero', 'Siempre diverge', 'No cambia'], 0, 'Esa es justamente la definición de la integral definida.'),
              sld('El área exacta es $\\tfrac{8}{3} \\approx 2.667$. Elige $n$ para que el error sea menor que $0.1$', {
                viz: { type: 'riemann', f: sq, a: 0, b: 2, xr: [-0.3, 2.4], yr: [-0.5, 4.5], exact: '2.667' }, min: 2, max: 60, step: 1, init: 4,
                readout: v => `$n = ${v}$`, check: v => v >= 40, answerText: '$n \\geq 40$',
                explain: 'Con rectángulos izquierdos el error es $\\tfrac{4}{3}\\cdot\\tfrac{3n - 1}{n^2} \\approx \\tfrac{4}{n}$: necesitas $n \\geq 40$.',
              }),
            ],
          },
          {
            id: 'int-2', title: 'Antiderivadas',
            clip: { scenes: [
              sc(5, 'Integrar es el proceso **inverso** de derivar.', { steps: ['$\\dfrac{d}{dx}\\left(\\tfrac{x^3}{3}\\right) = x^2$', '$\\Rightarrow \\displaystyle\\int x^2\\,dx = \\tfrac{x^3}{3} + C$'] }),
              sc(5, 'Regla de la potencia para integrales:', { title: '$\\displaystyle\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$', steps: ['$\\displaystyle\\int x^4\\,dx = \\tfrac{x^5}{5} + C$'] }),
              sc(6, '**Teorema fundamental**: evalúa la antiderivada en los extremos.', { title: '$\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)$', steps: ['$\\displaystyle\\int_0^3 x^2\\,dx = \\tfrac{27}{3} - 0 = 9$'] }),
            ] },
            ex: [
              mc('$\\displaystyle\\int x^2\\,dx$', ['$\\tfrac{x^3}{3} + C$', '$2x + C$', '$x^3 + C$', '$\\tfrac{x^2}{2} + C$'], 0, 'Sube el exponente y divide entre el nuevo exponente.'),
              num('$\\displaystyle\\int_0^3 x^2\\,dx = \\;?$', 9, '$\\left[\\tfrac{x^3}{3}\\right]_0^3 = 9$.'),
              mc('$\\displaystyle\\int \\cos x\\,dx$', ['$\\sin x + C$', '$-\\sin x + C$', '$\\cos x + C$', '$-\\cos x + C$'], 0, "Porque $(\\sin x)' = \\cos x$."),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'lin', level: 'Semestre 2', name: 'Álgebra Lineal', icon: 'M', color: '#fb923c',
    tagline: 'Vectores y matrices: el idioma del espacio y sus transformaciones.',
    units: [
      {
        world: 'lineal', title: 'Vectores y matrices',
        lessons: [
          {
            id: 'lin-1', title: 'Vectores',
            clip: { scenes: [
              sc(5, 'Un vector tiene **magnitud** y **dirección**.', { viz: { type: 'vectors', A: [3, 1], only: 'A' } }),
              sc(6, 'Para sumar, pon la cola de uno en la punta del otro.', { title: '$\\vec a + \\vec b$', viz: { type: 'vectors', A: [3, 1], B: [1, 2] } }),
              sc(5, 'La magnitud sale de Pitágoras:', { title: '$|\\vec v| = \\sqrt{v_x^2 + v_y^2}$', viz: { type: 'vectors', A: [3, 4], only: 'A', xr: [-1, 5], yr: [-1, 5] } }),
            ] },
            ex: [
              mc('$(1, 2) + (3, 1) = \\;?$', ['$(4, 3)$', '$(3, 2)$', '$(4, 2)$', '$(2, 3)$'], 0, 'Se suma componente a componente.'),
              num('Magnitud de $\\vec v = (3, 4)$', 5, '$\\sqrt{9 + 16} = 5$.'),
              num('Producto punto $(1, 2) \\cdot (3, 4)$', 11, '$1 \\cdot 3 + 2 \\cdot 4 = 11$.'),
            ],
          },
          {
            id: 'lin-2', title: 'Matrices como transformaciones',
            clip: { scenes: [
              sc(4, 'Una matriz $2 \\times 2$ **transforma** el plano entero.', { viz: { type: 'matrix', M: [[1, 0], [0, 1]] } }),
              sc(5, 'Esta estira el eje $x$ al doble.', { title: '$\\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}$', viz: { type: 'matrix', M: [[2, 0], [0, 1]] } }),
              sc(5, 'Esta gira el plano 90°.', { title: '$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$', viz: { type: 'matrix', M: [[0, -1], [1, 0]] } }),
              sc(5, 'El **determinante** mide cuánto escala las áreas.', { title: '$\\det = ad - bc$', viz: { type: 'matrix', M: [[1, 1], [0, 2]] } }),
            ] },
            ex: [
              mc('¿Qué matriz gira el plano $90^\\circ$ en sentido antihorario?', ['$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$', '$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$', '$\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$', '$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$'], 0, 'Envía $\\hat\\imath \\to (0, 1)$ y $\\hat\\jmath \\to (-1, 0)$.'),
              num('$\\det\\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix} = \\;?$', 5, '$2 \\cdot 3 - 1 \\cdot 1 = 5$.'),
              mc('Si $\\det A = 0$, la transformación…', ['Aplasta el plano a una recta o un punto', 'Rota el plano', 'No cambia nada', 'Duplica las áreas'], 0, 'Las áreas se multiplican por 0: se pierde una dimensión.'),
            ],
          },
        ],
      },
    ],
  },
];
;
//#archivo js/courses/preicfes.js
// Curso Preicfes Saber 11 (spec 2026-11-20-curso-preicfes): preparación para el examen de Estado de grado 11, con cinco
// componentes que se estudian por separado (como el Preuniversitario UdeA): al entrar se elige el componente y luego se ven solo
// sus mundos. Va después de data.js: arma el curso con los mundos de js/courses/preicfes-*.js y lo pone en COURSES después del
// Preuniversitario. Nace en borrador (supabase/migrations/20261120000001_curso_preicfes.sql) hasta la revisión docente.
const COURSE_PREICFES = {
  id: 'preicfes', level: 'Saber 11', name: 'Preicfes Saber 11', icon: '11', color: '#e879f9',
  tagline: 'Las cinco pruebas del examen de grado 11, una por una.',
  blocks: PI_BLOCKS,
  units: PI_BLOCKS.flatMap(b => PI_MUNDOS.filter(u => u.block === b.id)),
  soon: piPendientes(PI_MUNDOS),
};
COURSES.splice(COURSES.findIndex(c => c.id === 'preuda') + 1, 0, COURSE_PREICFES);
;
//#archivo js/courses/sin-escribir.js
// Sin escribir (spec 2026-11-17-sin-escribir): ningún ejercicio pide teclear un número. Cada ejercicio `num(...)` de los
// cursos se cambia aquí, al cargar, por un juego: «Arma la cuenta» (el estudiante plantea la operación con fichas y el
// juego la calcula) o «Escala la solución» (elige el paso válido en cada nivel del razonamiento). El enunciado, la
// explicación y la pista del ejercicio original se conservan.
// La tabla va por `lección#posición` (las evaluaciones: `exam-<mundo>#posición`). Si alguien mueve un ejercicio y la
// ficha deja de dar su respuesta, el cambio no se aplica (queda el ejercicio de escribir) y `tests/sin-escribir.test.js` avisa.
//   C('7 * 200000 / 100000', ['1000'])  → Arma la cuenta: una cuenta correcta y las fichas que sobran.
//   E([paso válido, falso, falso], …)   → Escala la solución: un nivel por paso; el válido va primero.

const SIN_ESCRIBIR = (() => {
  const C = (sol, traps = []) => ({ game: 'arma-la-cuenta', sol: sol.split(' '), traps });
  const E = (...levels) => ({ game: 'escala-solucion', levels });
  return {
    // ---------- Álgebra ----------
    'alg-0a#4': C('7 - 2', ['3', '1']),
    'alg-0b#3': C('2 ^ 4', ['1', '6', '8']),
    'exam-conjuntos#3': C('2 ^ 5', ['10', '4']),
    'alg-12b#4': E(['Junta 4 · 25 = 100', 'Junta 4 · 19 = 100', 'Junta 4 · 25 = 29'], ['19 · 100 = 1900', '19 · 100 = 190', '19 + 100 = 119']),
    'alg-12c#3': C('5/6 * 9/10', ['6/5']),
    'exam-numeros#6': C('2.25 - -3.5', ['3.5']),
    'alg-12#3': C('7 * 200000 / 100000', ['1000', '100']),
    'alg-12#4': C('13500 / 5', ['5600', '2']),
    'alg-13c#5': C('476000 / 1.19', ['0.19', '0.81']),
    'exam-razones#6': C('7 * 15 / 2', ['100']),
    'alg-22a#3': C('r ( 64 + 36 )', ['8', '6']),
    'alg-22b#2': C('2 + 4', ['20', '80', '5']),
    'exam-potencias#5': C('( r r 16 ) ^ 3', ['4', '12']),
    'alg-14d#3': C('6 + 2 * 6', ['12', '3']),
    'alg-4a#3': C('-5 * 3 ^ 2 + 30 * 3 + 1', ['6']),
    'alg-4a#4': C('15 * 15', ['30', '2']),
    'alg-73#3': C('ln(30) / ln(4)', ['30', '4']),
    'alg-73#4': C('ln(2) / 0.04', ['2', '4']),
    // ---------- Trigonometría ----------
    'trig-41a#2': C('180 / π', ['360', '2']),
    'trig-41b#2': C('50 * 120 * π / 180', ['360']),
    'trig-1#1': C('10 * 3/5', ['5/3', '4/5']),
    'trig-2#1': C('10 * sen(60°)', ['cos(60°)', 'tan(60°)']),
    'trig-42c#2': C('2000 / sen(30°)', ['cos(30°)', 'tan(30°)']),
    'trig-3#1': C('-12 / r ( 5 ^ 2 + 12 ^ 2 )', ['13', '17']),
    'trig-43b#2': C('360 - 315', ['180', '270']),
    'trig-44a#1': E(['La amplitud es |a|', 'La amplitud es a', 'La amplitud es 2π ÷ |a|'], ['4', '−4', 'π/2']),
    'trig-44b#1': C('π / 4', ['2', '8']),
    'trig-45#2': C('360 - 210', ['180', '30']),
    'trig-45#3': E(['sen θ = 5/6', 'cos θ = 5/6', 'tan θ = 5/6'], ['θ = sen⁻¹(5/6)', 'θ = cos⁻¹(5/6)', 'θ = tan⁻¹(5/6)'], ['θ ≈ 56.4°', 'θ ≈ 33.6°', 'θ ≈ 39.8°']),
    'trig-4#1': C('-1 * r ( 1 + 2 ^ 2 )'),
    'trig-47b#2': E(['1 − cos²x = sen²x', '1 − cos²x = −sen²x'], ['1 + cot²x = csc²x', '1 + cot²x = sec²x'], ['sen²x · csc²x = 1', 'sen²x · csc²x = sen⁴x', 'sen²x · csc²x = 0']),
    'trig-48a#1': C('3/5 * -5/13 + 4/5 * 12/13', ['-4/5', '-12/13']),
    'trig-48b#2': C('2 * 5/13 * -12/13', ['12/13']),
    'trig-49#2': E(['3x = π/4 + kπ', '3x = π/4 + kπ/2'], ['x = π/12 + kπ/3', 'x = π/12 + kπ/6'], ['k = 0, 1, 2: tres soluciones', 'k = 0 a 5: seis soluciones', 'k = 0: una solución']),
    'trig-46a#1': C('10 * sen(45°) / sen(30°)', ['cos(30°)']),
    'trig-46b#1': E(['c² = 5² + 8² − 2·5·8·cos 60°', 'c² = 5² + 8² + 2·5·8·cos 60°', 'c² = 5² + 8² − 2·5·8'], ['c² = 89 − 40 = 49', 'c² = 89 + 40 = 129', 'c² = 89 − 80 = 9'], ['c = √49 = 7', 'c = √129 ≈ 11.36', 'c = √9 = 3']),
    'trig-151#2': C('r ( 6 ^ 2 + 8 ^ 2 )', ['14']),
    'trig-151#3': C('180 + 45', ['360', '90']),
    'trig-152#3': E(['z = √2 cis 135°', 'z = √2 cis 45°', 'z = 2 cis 135°'], ['z⁴ = (√2)⁴ cis (4 · 135°)', 'z⁴ = 4 · √2 cis (135° + 4°)'], ['4 cis 540° = 4 cis 180°', '4 cis 540° = 4 cis 0°'], ['−4', '4']),
    'trig-153#3': C('90 / 3', ['8', '360', '2']),
    // ---------- Cálculo ----------
    'alg-32#4': E(['15 > 5x', '15 < 5x', '−1 > 5x'], ['x < 3', 'x > 3', 'x ≤ 3'], ['mayor entero: 2', 'mayor entero: 3', 'mayor entero: 4']),
    'alg-26c#3': C('75 - 0.4', ['2']),
    'alg-26c#4': C('7 * -2', ['2', '-7', '9', '5']),
    'alg-51#3': C('6 + 8 + r ( 6 * 6 + 8 * 8 )', ['0']),
    'alg-51#4': C('2 * -1 - 4', ['3']),
    'calc-recta#3': C('12 / 3', ['2', '-2']),
    'calc-recta#4': C('-1 / -1/4 + 1', ['1/4']),
    'alg-52#3': C('( -2 ) ^ 2 - 3 * -2'),
    'alg-52#4': C('6 / 2', ['-6', '1']),
    'calc-tipos#3': C('5 - 3', ['11', '1']),
    'calc-tipos#4': C('24 / 2 ^ 3', ['6']),
    'alg-53#3': E(['Primero g: g(1) = 1', 'Primero f: f(1) = 2'], ['Luego f(1) = 1² + 1', 'Luego g(2) = 3 · 2 − 2'], ['2', '4']),
    'alg-53#4': E(['Primero f: f(2) = 5', 'Primero g: g(2) = 4'], ['Luego g(5) = 3 · 5 − 2', 'Luego f(4) = 4² + 1'], ['13', '17']),
    'calc-tramos#3': C('6 + 1.5 * ( 6 - 2 )'),
    'calc-tramos#4': C('5 - 3', ['-5', '7']),
    'alg-61#3': C('3 * 5 - 4', ['2']),
    'alg-61#4': C('1 - 3', ['6']),
    'alg-62#3': C('( 13 + 7 ) / 4'),
    'alg-62#4': C('( 29 - 2 ) ^ 1/3'),
    'calc-1#0': C('3 * 2 + 1'),
    'calc-1#1': E(['(x − 1)(x + 1) ÷ (x − 1)', '(x − 1)² ÷ (x − 1)'], ['x + 1, con x → 1', 'x − 1, con x → 1'], ['2', '0']),
    'calc-2#0': E(['Divide todo entre x²', 'Reemplaza x por ∞ y resta'], ['3 + 1/x²', '3x² + 1'], ['3', '∞']),
    'calc-3#1': C('2 * 3', ['9']),
    'calc-4#1': C('6 * 1 + 2', ['3']),
    'calc-5#1': C('6 / 2', ['-6', '1']),
    // ---------- Geometría vectorial ----------
    'geo-1#1': E(['Suma las dos: 4x = 8', 'Suma las dos: 4x = 16', 'Resta las dos: 2x = 8'], ['x = 2', 'x = 4', 'x = 8']),
    'geo-1#3': E(['z = −1', 'z = 1'], ['2y + 1 = 5, y = 2', '2y − 1 = 5, y = 3'], ['x = 2 − 2 + 1 = 1', 'x = 2 − 2 − 1 = −1', 'x = 2 − 3 + 1 = 0']),
    'geo-2#2': C('1 * 1 + 2 * 4', ['3', '0', '-1']),
    'geo-2#3': C('2 * 4', ['3']),
    'geo-2#4': C('1 * 4 + 3 * 1', ['2', '-1']),
    'geo-3#2': C('-3 + 5', ['8']),
    'geo-3#3': E(['Aᵀ es 2 × 3', 'Aᵀ es 3 × 2'], ['AᵀA: (2 × 3)(3 × 2) = 2 × 2', 'AᵀA: (3 × 2)(2 × 3) = 3 × 3'], ['2 filas', '3 filas']),
    'geo-3#4': E(['(AB)ᵀ(2, 1) = AB(1, 2)', '(AB)ᵀ(2, 1) = AB(2, 1)'], ['fila 1 de A · columna 2 de B', 'fila 2 de A · columna 1 de B'], ['1 · 1 + 2 · 0 = 1', '3 · 0 + 4 · 1 = 4']),
    'geo-4#1': C('-1 * -3', ['1/3', '0']),
    'geo-4#2': C('-1 * 3 / ( 5 * 2 - 3 * 3 )'),
    'geo-4#3': E(['(AB)⁻¹ = B⁻¹A⁻¹', '(AB)⁻¹ = A⁻¹B⁻¹'], ['fila 2 de B⁻¹ · columna 2 de A⁻¹', 'fila 2 de A⁻¹ · columna 2 de B⁻¹'], ['3 · 2 + 1 · 1 = 7', '0 · 0 + 1 · 1 = 1']),
    'geo-5#1': C('-1 * 5 / ( 2 * 3 - 5 * 1 )'),
    'geo-5#3': C('3 * 1 + -5 * 1', ['-1', '2']),
    'geo-6#1': E(['Desarrolla por la fila 1', 'Multiplica la diagonal'], ['2 · (3 − 2) − 0 + 1 · (1 − 0)', '2 · (3 + 2) − 0 + 1 · (1 + 0)', '2 · 3 · 1'], ['3', '11', '6']),
    'geo-6#2': C('3 * -1 * 4', ['7', '-2', '5', '0']),
    'geo-6#3': C('2 ^ 3 * 5'),
    'geo-7#1': E(['0 · (5 − 3) − 2 · (5 − 2) + 4 · (3 − 2)', '0 · (5 − 3) + 2 · (5 − 2) + 4 · (3 − 2)'], ['−6 + 4', '6 + 4'], ['−2', '10']),
    'geo-7#2': C('12 / 3 / -1', ['2']),
    'geo-7#3': E(['Sumar a una fila un múltiplo de otra', 'Multiplicar una fila por 7'], ['no cambia el determinante', 'multiplica el determinante por 7'], ['det = 1', 'det = 7']),
    'geo-8#1': C('2 * -3 - 1 * 1', ['7', '0']),
    'geo-8#2': C('( 7 * -3 - 1 * 0 ) / -7'),
    'geo-8#3': C('-3 / 4', ['3']),
    'geo-8#4': C('8 / 3', ['4', '2']),
    'geo-9#2': C('r ( ( -5 ) ^ 2 + 12 ^ 2 )', ['17', '7']),
    'geo-9#3': E(['El vector es (2t + 1, −t + 4)', 'El vector es (2t + 4, −t + 1)'], ['Anula la y: −t + 4 = 0', 'Anula la x: 2t + 1 = 0'], ['t = 4', 't = −½']),
    'geo-10#2': C('( 2 + 4 + 9 ) / 3', ['1', '7']),
    'geo-10#3': C('14 / 2', ['3']),
    'geo-11#2': C('r ( 2 ^ 2 + 3 ^ 2 + 6 ^ 2 )'),
    'geo-11#3': C('2 / 3', ['-1', '9']),
    'geo-12#1': C('4 / 2', ['1', '3']),
    'geo-12#2': C('1 + 3 * 2', ['-2', '4']),
    'geo-12#3': C('-6 / 3', ['2', '5']),
    'geo-13#2': E(['1 + 2t = 3 + s  y  2 + t = 6 − s', '1 + 2t = 6 − s  y  2 + t = 3 + s'], ['Sumando: 3 + 3t = 9, t = 2', 'Sumando: 3 + 3t = 9, t = 3'], ['x = 1 + 2 · 2 = 5', 'x = 1 + 2 · 3 = 7']),
    'geo-13#3': C('( 9 - 3 ) / 4', ['2', '1']),
    'geo-14#1': E(['u · v = 1', 'u · v = 2'], ['cos θ = 1 ÷ (√2 · √2) = ½', 'cos θ = 1 ÷ (2 · 2) = ¼'], ['θ = 60°', 'θ = 30°', 'θ = 45°']),
    'geo-14#2': C('4 / ( 3 + 2 )', ['-1']),
    'geo-14#3': C('3 ^ 2 + 2 * 6 + 4 ^ 2'),
    'geo-15#2': C('( -1 * 3 + 3 * 4 ) / 5', ['2', '0']),
    'geo-15#3': E(['La proyección es el vector cero', 'La proyección es lo más larga posible'], ['u · v = 0', 'u · v = ‖u‖‖v‖'], ['90°', '0°', '180°']),
    'geo-16#1': C('( 4 * 3 + 3 * -1 - 4 ) / 5'),
    'geo-16#2': C('2 * 1 - 2 + 3 * -1'),
    'geo-16#3': C('( 14 - 2 - 2 - 1 ) / 3'),
    'geo-16#4': E(['Normales: (1, 1, 1) y (1, −1, 0)', 'Normales: (1, 1, 1) y (1, 1, 0)'], ['n₁ · n₂ = 1 − 1 + 0 = 0', 'n₁ · n₂ = 1 + 1 + 0 = 2'], ['90°', '0°', '45°']),
    'geo-17#1': C('2 * 2 - 0 * -1', ['3', '1']),
    'geo-17#2': C('1 * -1 - 2 * 3', ['0']),
    'geo-17#3': C('r ( 8 ^ 2 + 6 ^ 2 ) / 2'),
    'geo-17#4': E(['î × ĵ = k̂', 'î × ĵ = −k̂'], ['Al cambiar el orden cambia el signo', 'El orden no importa'], ['c = −1', 'c = 1']),
    'geo-18#1': C('-1 * 0 - 2 * -1', ['3', '6']),
    'geo-18#2': C('1 * 2 * 4', ['3', '0']),
    'geo-18#3': C('r ( 3 ^ 2 + 4 ^ 2 )', ['1']),
    'geo-18#4': C('1 * -1 - 1 * 1', ['0']),
    'geo-19#2': C('100 / ( 2 * sen(30°) )', ['cos(30°)']),
    'geo-19#3': C('r ( 30 ^ 2 + 40 ^ 2 )', ['70']),
    'geo-19#4': C('20 * cos(60°)', ['sen(60°)']),
    'geo-20#2': C('r ( 8 ^ 2 + 6 ^ 2 ) / 2'),
    'geo-20#3': C('r ( 200 ^ 2 + 50 ^ 2 )', ['250', '150']),
    'geo-21#2': C('50 * 10 * cos(60°)', ['sen(60°)']),
    'geo-21#3': C('40 * 0.25', ['4']),
    'geo-21#4': C('0 * 0 - 3 * 1', ['2']),
    'geo-22#2': C('-12 / 4', ['2', '12']),
    'geo-22#3': C('1 ^ 2 / ( 4 * 0.25 )', ['2']),
    'geo-23#2': C('r ( 169 - 144 )', ['13', '12']),
    'geo-23#3': C('r ( 16 + 9 ) / 4', ['3']),
    'geo-23#4': C('3 * r ( 1 - 4 ^ 2 / 5 ^ 2 )'),
    // ---------- Física, Cálculo integral, Álgebra lineal ----------
    'fis-1#0': C('20 * 5', ['2']),
    'fis-1#1': C('2 * 6', ['0']),
    'fis-1#2': C('2 * 6 ^ 2 / 2'),
    'fis-2#2': C('r ( 2 * 20 / 10 )'),
    'fis-3#0': C('5 * 3', ['2']),
    'fis-3#2': C('10 * 9.8'),
    'fis-4#1': C('10 * sen(30°)', ['cos(30°)']),
    'fis-5#0': C('2 * 3 ^ 2 / 2'),
    'fis-5#1': C('1 * 10 * 5'),
    'fis-5#2': C('r ( 2 * 10 * 5 )'),
    'int-1#0': C('2 * 4 / 2'),
    'int-2#1': C('3 ^ 3 / 3', ['2']),
    'lin-1#1': C('r ( 3 ^ 2 + 4 ^ 2 )', ['7']),
    'lin-1#2': C('1 * 3 + 2 * 4'),
    'lin-2#1': C('2 * 3 - 1 * 1'),
  };
})();

// Cambia en los cursos cada ejercicio de escribir por su juego. Devuelve cuántos cambió y cuáles no pudo.
function sinEscribir(courses, table = SIN_ESCRIBIR) {
  const out = { done: 0, missing: [], mismatch: [], unused: new Set(Object.keys(table)) };
  const swap = (list, id) => (list || []).forEach((ex, i) => {
    if (!ex || ex.type !== 'input') return;
    const key = `${id}#${i}`, t = table[key];
    if (!t) { out.missing.push(key); return; }
    out.unused.delete(key);
    const { type, answer, tol, prefix, suffix, answerText, ...rest } = ex;
    let params;
    if (t.game === 'arma-la-cuenta') {
      const v = GAMES['arma-la-cuenta']?.evaluate(t.sol), lim = tol ?? 1e-6 * Math.max(1, Math.abs(answer));
      if (!(Math.abs(v - answer) <= lim)) { out.mismatch.push(key); return; }   // la ficha ya no es de este ejercicio: se deja como estaba
      // El juego calcula exacto: vale la cuenta de la ficha, no el redondeo que se aceptaba al escribir (con ese margen
      // pasaban cuentas falsas). La tolerancia vieja solo dice cuántos decimales mostrar.
      const round = { sol: t.sol, traps: t.traps, answer: v, tol: 1e-9 * Math.max(1, Math.abs(v)), ...(tol != null ? { digits: tol } : {}), ...(suffix ? { unit: suffix } : {}) };
      params = { rounds: [round] };
    } else params = { rounds: [{ levels: t.levels }] };
    list[i] = { ...rest, type: 'play', game: t.game, params };
    out.done++;
  });
  for (const c of courses) for (const u of c.units || []) {
    for (const l of u.lessons || []) swap(l.ex, l.id);
    if (u.exam) { const exs = u.exam.items.map(it => it.ex); swap(exs, `exam-${u.world}`); exs.forEach((ex, i) => { u.exam.items[i].ex = ex; }); }
    if (u.boss) swap(u.boss.ex, u.boss.id);
  }
  out.unused = [...out.unused];
  return out;
}
if (typeof COURSES !== 'undefined') {
  const r = sinEscribir(COURSES);
  if ((r.missing.length || r.mismatch.length) && typeof console !== 'undefined') console.warn('sin-escribir: quedan ejercicios de escribir', r.missing, r.mismatch);
}
;
//#archivo js/courses/algebra-taller.js
// Práctica final del curso. Los id de las lecciones, el progreso y los medios se conservan.
(() => {
  const algebra = COURSE_ALGEBRA.units.flatMap(u => u.lessons);
  const lessons = new Map(algebra.map(l => [l.id, l]));
  const tex = s => '$' + s + '$';
  const n = x => +x.toFixed(5);
  const grid = (size, fn) => Array.from({ length: size }, (_, i) => fn(i));
  const pick = (size, fn) => grid(size, i => i).filter(fn);
  const xy = v => tex('(' + v.join(',') + ')');
  const line = (a, b) => x => a * x + b;
  const par = (a, h, k) => x => a * (x - h) ** 2 + k;
  const format = (v, symbol = 'x') => tex(symbol + '=' + n(v));
  const lab = (mode, q, r, hint, explain, motion = false) => play('taller-' + mode, q,
    { rounds: [r], ...(motion ? { motion: true } : {}) },
    explain || hint + ' ' + (r.solution || r.read(r.goal)), { hint, canvasGuide: true, ...(motion ? { motion: true } : {}) });
  const rail = (q, [lo, hi, start, goal, step], read, hint, more = {}) =>
    lab(more.loads ? 'balanza' : 'barra', q, { lo, hi, start, goal, step, read, ...more }, hint, more.explain, more.motion);
  const rect = (q, max, goal, hint, { start = [1, 2], read = ([a, b]) => tex(`${a}\\cdot ${b}=${a * b}`), valid, explain } = {}) =>
    lab('area', q, { max, start, goal, read, valid }, hint, explain);
  const point = (q, bounds, start, goal, curves, hint, more = {}) =>
    lab('plano', q, { bounds, start, goal, curves, read: xy, ...more }, hint, more.explain, more.motion);
  const probe = (q, bounds, start, goal, fn, hint, more = {}) => lab('sonda', q,
    { bounds, start, goal, curves: [fn, ...(more.other || [])],
      read: x => Number.isFinite(fn(x)) ? tex(`f(${x})=${n(fn(x))}`) : `Sin valor en ${x}`,
      ...more }, hint, more.explain, more.motion);
  const dial = (q, values, goal, read, hint, more = {}) =>
    lab('giro', q, { values, goal, start: more.start ?? 0, read: i => read(values[i], i), ...more }, hint, more.explain, more.motion);
  const tiles = (q, cols, values, goal, hint, more = {}) => lab('mosaico', q,
    { tiles: values, cols, start: [], goal, read: v => 'Celdas pintadas · ' + v.length, ...more }, hint, more.explain);
  const groups = (q, regions, values, goal, hint, more = {}) => lab('membrana', q,
    { regions, tiles: values, start: values.map(() => -1), goal,
      read: v => regions.map((label, i) => label + ' ' + v.filter(x => x === i).length).join('  ·  '),
      solution: regions.map((label, i) => label + ' → ' + values.filter((_, j) => goal[j] === i).join(', ')).join(' · '),
      ...more }, hint, more.explain, more.motion);
  const bridges = (q, fractions, den, cards, goal, hint, explain) => lab('puentes', q,
    { fractions: fractions.map(([a, b]) => tex('\\frac{' + a + '}{' + b + '}')), tiles: cards.map(tex), start: [-1, -1], goal,
      read: v => tex(v.map((j, i) => j < 0 ? den[i] : '(' + den[i] + ')(' + cards[j] + ')').join('\\quad | \\quad')),
      solution: explain }, hint, explain);
  function route(q, labels, goal, hint, more = {}) {
    const nodes = [[.5, .07, labels[0]], [.22, .38, labels[1]], [.78, .38, labels[2]],
      [.22, .68, labels[3]], [.78, .68, labels[4]], [.5, .94, labels[5]]];
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5]];
    const read = v => v.map(i => labels[i]).join(' → ');
    return lab('trazo', q, { nodes, edges, start: [0], goal: [0, ...goal, 5], minLength: 4, read, ...more }, hint, more.explain, more.motion);
  }
  function tune(id, keep, additions, close) {
    const l = lessons.get(id), previous = l.ex;
    const selected = keep.map(g => {
      const e = previous.find(e => e.game === g);
      if (!e) throw new Error(id + ' no contiene el juego ' + g);
      return { ...e, canvasGuide: true };
    });
    const ending = close || previous.at(-1);
    l.ex = [...selected, ...additions, { ...ending, canvasGuide: true, motion: true }];
  }

  // Teoría de Conjuntos
  tune('alg-0a', ['cumple-notacion', 'tacha-repetidos', 'atrapa-elementos'], [
    groups('Separa las letras de SOL del resto del universo.', ['En SOL', 'Fuera'], ['S', 'M', 'O', 'L', 'R'], [0, 1, 0, 0, 1], 'Cada letra cuenta una vez. Busca las que puedes señalar en SOL.', { explain: 'El conjunto de letras de SOL es $\\{S,O,L\\}$. M y R quedan fuera.' }),
    tiles('Pinta todas las palabras que terminan en «a».', 3, ['mesa', 'sol', 'nube', 'silla', 'papel', 'tiza'], [0, 3, 5], 'Comprueba la última letra de cada palabra.', { read: v => 'Elementos elegidos · ' + v.length, explain: 'Mesa, silla y tiza comparten la propiedad de terminar en «a».' }),
    rail('Ajusta la cardinalidad del conjunto de letras de ARENA.', [0, 7, 1, 4], v => tex('n(A)=' + v), 'Las dos apariciones de A representan el mismo elemento.', { input: v => v + ' elementos', bars: v => [['Letras distintas', v]], explain: '$A=\\{A,R,E,N\\}$ contiene cuatro elementos.' }),
  ]);
  tune('alg-0b', ['arma-conjunto', 'mueve-circulos', 'cubo-partes'], [
    groups('Construye dos conjuntos disjuntos. Pon las vocales en A y las consonantes en B.', ['A', 'B'], ['A', 'R', 'U', 'S', 'I', 'T'], [0, 1, 0, 1, 0, 1], 'Si los conjuntos son disjuntos, ningún elemento puede pertenecer a ambos.', { explain: '$A\\cap B=\\varnothing$. Ninguna letra de A está en B.' }),
    tiles('Pinta dos elementos del conjunto $B=\\{A,C,E\\}$.', 3, ['A', 'b', 'C', 'd', 'E', 'f'], [0, 2], 'Elige dos de las letras mayúsculas. Cualquier pareja de ellas sirve.', { valid: v => v.length === 2 && v.every(i => i % 2 === 0), explain: 'Cualquier pareja tomada de $B=\\{A,C,E\\}$ es un subconjunto de dos elementos.' }),
    rail('Cuenta los subconjuntos de un conjunto con tres elementos, incluido el vacío.', [0, 12, 3, 8], v => tex('n(\\mathcal P(A))=' + v), 'Haz dos elecciones por elemento: incluirlo o dejarlo fuera.', { bars: v => [['Subconjuntos', v]], explain: 'Hay $2^3=8$ combinaciones de incluir o excluir elementos.' }),
  ]);
  tune('alg-0c', ['reparte-venn', 'pinta-venn', 'encuesta-venn'], [
    tiles('Pinta la intersección. M marca múltiplos de 2 y T marca múltiplos de 3.', 4,
      ['2M', '3T', '4M', '6MT', '7', '8M', '9T', '12MT'], [3, 7], 'La intersección conserva cada elemento que cumple las dos condiciones.', { explain: 'Los únicos números que pertenecen a las dos familias de la escena son 6 y 12.' }),
    groups('Construye A menos B. A contiene las letras de CASTOR y B las de CARTA.', ['$A-B$', 'Resto'], ['A', 'S', 'T', 'O', 'R', 'C'], [1, 0, 1, 0, 1, 1], 'Parte de las letras de CASTOR y retira las que también se usan en CARTA.', { explain: '$A-B=\\{S,O\\}$.' }),
    rail('Entre 18 personas, 10 usan bus, 11 usan metro y 6 usan ambos. Ajusta cuántas usan al menos uno.', [0, 18, 7, 15], v => tex('n(B\\cup M)=' + v), 'Entre las dos listas, las seis personas en común aparecen dos veces.', { bars: v => [['Al menos uno', v], ['Ninguno', 18 - v]], explain: '$10+11-6=15$ personas usan al menos uno. Tres no usan ninguno.' }),
  ]);

  // La Recta Real
  tune('alg-11', ['ascensor', 'recta-espejo', 'fuga-de-familia'], [
    point('Marca en el eje horizontal dónde terminas después de avanzar 4 desde −7.', [-8, 8, -2, 2], [0, 0], [-3, 0], [], 'Cada avance es un paso hacia la derecha. Conserva la altura cero.', { explain: '$-7+4=-3$.' }),
    groups('Distribuye los enteros según queden antes o después de cero.', ['Negativos', 'Cero', 'Positivos'], ['$-7$', '$0$', '$4$', '$-3$', '$9$'], [0, 1, 2, 0, 2], 'Usa la posición respecto del cero. El cero queda en su propia región.'),
    rail('Eleva una sonda que parte de la cota −9 hasta la cota 2.', [0, 15, 3, 11], v => tex('(-9)+' + v + '=' + (v - 9)),
      'Cuenta los pasos hasta la cota cero y luego añade los que faltan.', { bars: v => [['Distancia al cero', 9], ['Tramo recorrido', v]] }),
  ]);
  tune('alg-11b', ['pizzeria', 'candado-fraccion', 'pon-la-rayita', 'fuga-de-familia'], [
    tiles('Cubre con un color exactamente tres octavos del tablero.', 4, grid(8, () => ''), [0, 1, 2], 'El tablero tiene ocho partes del mismo tamaño. El numerador cuenta las que se cubren.', { valid: v => v.length === 3, read: v => tex('\\frac{' + v.length + '}{8}'), explain: 'Tres celdas de ocho representan $\\tfrac38$ sin importar su ubicación.' }),
    rect('Construye 18 casillas organizadas en 3 filas iguales.', [9, 6], [6, 3], 'Reparte las 18 unidades entre las tres filas. Cada fila es un tercio del total.', { read: ([a, b]) => tex(a + '\\cdot' + b + '=' + (a * b)) }),
    point('Pon el punto en el eje horizontal donde están $\\tfrac54$ y 1.25.', [0, 2, -1, 1], [.25, 0], [1.25, 0], [], 'Completa primero una unidad de cuatro cuartos. Mira cuánto sobra.', { dx: .25, explain: '$\\tfrac54=1+\\tfrac14=1.25$.' }),
  ]);
  tune('alg-11c', ['cajas-numericas', 'lupa-densidad', 'ubica-en-recta', 'compas-raiz', 'acorrala-raiz'], [
    dial('Gira hasta una marca situada entre $\\sqrt{19}$ y $\\sqrt{27}$.', [3, 4, 5, 6, 7, 8], 2, v => tex(v + '^2=' + v * v), 'Eleva al cuadrado las marcas positivas para compararlas con 19 y 27.', { explain: '$19<25<27$, de modo que $5$ queda entre las dos raíces.' }),
    point('Busca en el eje horizontal un racional estrictamente entre 1.41 y 1.42.', [1.405, 1.425, -1, 1], [1.405, 0], [1.415, 0], [], 'Mira las milésimas que hay entre las dos centésimas dadas.', { dx: .001, valid: ([x, y]) => y === 0 && x > 1.41 && x < 1.42, explain: '$1.415$ es una de varias opciones racionales dentro del intervalo.' }),
  ]);
  tune('alg-12b', ['corta-rectangulo', 'inversos-gemelos'], [
    rect('Reagrupa el área de $4(2+3)$ en dos filas iguales.', [10, 6], [10, 2], 'La distributiva conserva las 20 unidades de área. Cambia la forma sin cambiar la cantidad.'),
    rail('Iguala $4(3+x)$ con 32.', [0, 9, 2, 5], x => tex('4(3+' + x + ')=' + (4 * (3 + x))), 'Divide 32 entre los cuatro grupos y mira qué parte de cada grupo ya está fija.', { loads: x => [4 * (3 + x), 32] }),
    tiles('Pinta el rectángulo de 3 filas que forman las columnas B, C y D.', 5, grid(15, i => 'ABCDE'[i % 5]), [1, 2, 3, 6, 7, 8, 11, 12, 13], 'El área de cada columna suma lo mismo. Tres columnas por tres filas forman nueve celdas.', { read: v => tex('A=' + v.length), explain: 'Puedes repartir el cálculo como $3(1+2)=3+6=9$.' }),
    route('Desde 1, recorre las estaciones aplicando primero ×4 y después +3.', ['1', '4', '5', '7', '8', 'fin'], [1, 3], 'Multiplica primero lo que hay en la estación de salida. Suma después.'),
  ], probe('Lleva la sonda al valor que deja $3x+12$ en cero y suéltala.', [-7, 6, -10, 32], 1, -4, line(3, 12), 'Busca el opuesto aditivo de 12 antes de dividir entre 3.', { motion: true }));
  tune('alg-12c', ['arma-producto', 'cancela-balanza'], [
    rail('Mueve el contrapeso hasta que $(-3)x$ sea 18.', [-8, 8, 2, -6], x => tex('(-3)(' + x + ')=' + (-3 * x)), 'Con un factor negativo, ¿qué signo necesita el otro para que el producto sea positivo?', { loads: x => [-3 * x, 18] }),
    point('Representa en el eje horizontal el resultado de $-3-(-5)$.', [-7, 7, -3, 3], [0, 0], [2, 0], [], 'Restar un negativo equivale a sumar su opuesto.'),
    tiles('Pinta los productos de signo negativo.', 3, ['$(-2)(-5)$', '$3(-4)$', '$(-7)2$', '$2(6)$', '$0(-4)$', '$(-6)(-1)$'], [1, 2], 'Un producto de dos factores distintos de cero es negativo cuando exactamente uno de ellos lo es.', { explain: 'Los productos negativos son $3(-4)$ y $(-7)2$.' }),
    groups('Lleva cada cociente a la región de su signo.', ['$+$', '$-$'], ['$8/2$', '$-6/3$', '$-9/-3$', '$9/-3$'], [0, 1, 0, 1], 'Los signos iguales dan cociente positivo. Los distintos dan negativo.'),
  ], route('Traza la ruta que aplica ×(−2) dos veces desde 3. Suelta para recorrerla.', ['3', '6', '$-6$', '$-12$', '12', 'fin'], [2, 4], 'Cada multiplicación por un negativo invierte el signo.', { motion: true, explain: '$3\\to -6\\to12$.' }));
  tune('alg-12d', ['tren-ordenado', 'dobla-la-recta', 'distancia-justa', 'dibuja-intervalo'], [
    point('En el eje horizontal, marca el punto a cuatro unidades de −2 que queda a su izquierda.', [-8, 8, -2, 2], [0, 0], [-6, 0], [], 'La distancia admite dos direcciones. La consigna fija la que necesitas.', { marks: [[-2, 0]], explain: '$|-6-(-2)|=4$ y $-6<-2$.' }),
    rail('Iguala la distancia de $x$ a 3 con la distancia de $x$ a −5.', [-8, 8, 2, -1], x => tex('|' + x + '-3|=' + Math.abs(x - 3) + '\\quad |' + x + '+5|=' + Math.abs(x + 5)), 'El punto medio de dos marcas queda a la misma distancia de ambas.', { loads: x => [Math.abs(x - 3), Math.abs(x + 5)] }),
  ]);

  // Escalas y Proporciones
  tune('alg-12', ['limonada', 'estira-foto'], [
    rect('Haz un panel de 12 celdas cuyo ancho sea tres veces su alto.', [10, 5], [6, 2], 'Si cada fila es tres veces el alto, prueba con alturas pequeñas y compara las áreas.', { read: ([a, b]) => tex(a + ':' + b + '\\qquad A=' + a * b) }),
    tiles('Pinta exactamente dos celdas por cada tres que dejes sin pintar.', 5, grid(10, () => ''), [0, 1, 2, 3], 'Una copia de la razón ocupa cinco celdas. El tablero admite dos copias.', { valid: v => v.length === 4, read: v => tex(v.length + ':' + (10 - v.length)), explain: '$4:6$ y $2:3$ representan la misma razón.' }),
    point('Coloca en el plano una mezcla de 9 vasos con razón limón a agua de 1:2. El eje horizontal mide limón.', [0, 9, 0, 9], [1, 2], [3, 6], [line(2, 0)], 'Cada grupo completo tiene un vaso de limón y dos de agua.', { read: ([x, y]) => tex(x + ':' + y + '\\qquad ' + x + '+' + y + '=' + (x + y)) }),
    rail('Ajusta el número de tandas para servir 20 porciones, con 5 por tanda.', [0, 8, 1, 4], x => tex('5\\cdot' + x + '=' + 5 * x), 'Cada tanda añade el mismo volumen.', { bars: x => [['Porciones servidas', 5 * x]], scale: 40 }),
  ], dial('Ajusta el brazo de la válvula para servir 15 medidas en razón jarabe a agua de 2:3. Suelta para verter.', [0, 1, 2, 3, 4, 5], 3,
    k => tex(2 * k + ':' + 3 * k + '\\qquad V=' + 5 * k), 'Una vuelta a otra marca selecciona cuántos lotes de cinco medidas sirves.', { motion: true }));
  tune('alg-12e', ['balanza-proporcion', 'sombra-arbol', 'cuadrado-media', 'duplica-magnitud', 'grafica-relacion', 'reparto'], [],
    lab('fraccion', 'Ajusta la segunda cinta hasta representar la misma fracción que la primera.',
      { parts: 5, filled: 3, lo: 0, hi: 10, start: 2, goal: 6, read: v => tex('\\frac35\\qquad\\frac{' + v + '}{10}') },
      'Cada quinto ocupa exactamente dos décimos. Compara las dos longitudes.', '$\\frac35=\\frac6{10}$.', true));
  tune('alg-12f', ['arma-regla', 'bascula', 'la-obra', 'engranajes'], [
    probe('Tres bombas llenan un tanque en 20 minutos. Sitúa la sonda en cinco bombas para leer el tiempo.', [1, 8, 0, 30], 3, 5, x => 60 / x,
      'Duplica el número de bombas y el tiempo se reduce a la mitad. El producto se conserva.',
      { read: x => tex('t=' + (60 % x ? '\\frac{60}{' + x + '}' : 60 / x) + '\\ \\mathrm{min}'), explain: 'Con cinco bombas tarda $60/5=12$ minutos.' }),
    rect('Ocho personas hacen un trabajo en seis turnos. Organiza la misma carga en cuatro turnos.', [14, 8], [12, 4], 'Conserva las 48 unidades persona-turno. Déjalas en cuatro filas.', { explain: 'Se necesitan $48/4=12$ personas a ese ritmo.' }),
  ]);
  tune('alg-13', ['cuadricula-cien', 'rueda-porcentaje', 'cruz-porcentaje', 'mezcla'], [
    rect('Forma 20 casillas en 5 filas. La primera fila será exactamente el 20 % del rectángulo.', [8, 7], [4, 5], 'Cinco filas iguales hacen que cada fila sea la quinta parte.', { read: ([x, y]) => tex(x + '\\cdot' + y + '=' + x * y + '\\qquad \\frac{1}{' + y + '}') }),
    point('Marca la compra de 80 mil pesos con un ahorro del 30 %. El eje horizontal es el precio, el vertical es el ahorro.', [0, 100, 0, 40], [20, 6], [80, 24], [line(.3, 0)], 'Por cada diez mil pesos de precio ahorras tres mil.', { dx: 10, dy: 1 }),
  ], rail('Desliza la banda del precio para cobrar el 35 % de $80 mil. Suelta para aplicar el cobro.', [0, 100, 15, 35, 5],
    p => tex('\\frac{' + p + '}{100}\\cdot 80=' + n(.8 * p)), 'El precio completo representa el 100 %. Busca qué parte del total te piden cobrar.',
    { input: p => p + ' %', bars: p => [['Precio completo', 80], ['Cobro · ' + n(.8 * p) + ' mil', .8 * p]], scale: 80, motion: true }));
  tune('alg-13c', ['estira-barra', 'etiqueta-rebaja', 'bodegas'], [
    rail('Halla el descuento para que 150 mil pesos se conviertan en 120 mil.', [0, 50, 10, 20, 5], p => tex('150(1-' + p + '/100)=' + n(150 * (1 - p / 100))), 'Compara el ahorro con los 150 mil iniciales.', { input: p => p + ' %', bars: p => [['Antes', 150], ['Después', 150 * (1 - p / 100)]], scale: 150 }),
    tiles('Un artículo pierde una cuarta parte de su valor. Pinta el valor que conserva.', 4, grid(12, () => ''), grid(9, i => i), 'El descuento ocupa una de cuatro partes iguales. Pinta las restantes.', { valid: v => v.length === 9, read: v => tex('100\\%\\cdot\\frac{' + v.length + '}{12}=' + n(v.length * 100 / 12) + '\\%'), explain: 'Conserva el 75 % del valor inicial.' }),
    point('Marca en la gráfica la pareja de precios antes y después de aumentar 25 % a 48 mil pesos.', [0, 80, 0, 100], [16, 20], [48, 60], [line(1.25, 0)], 'El precio original sigue allí y se suma una cuarta parte.', { dx: 4, dy: 5 }),
  ], lab('recibo', 'Recorta el precio de 72 mil para que vuelva a 60 mil.',
    { price: 72, lo: 0, hi: 12, start: 0, goal: 2, read: v => tex('72\\cdot\\frac{' + (12 - v) + '}{12}=' + (72 - 6 * v)) },
    'La rebaja se mide sobre 72. Cada división de la banda descuenta seis mil.',
    'La rebaja exacta es $\\tfrac16$ del precio vigente, es decir, $16\\tfrac23\\%$.', true));
  tune('alg-13d', ['cascada', 'mejor-oferta', 'rebote', 'dos-etapas'], [
    rail('Después de un aumento del 25 %, ajusta el descuento que devuelve un precio al valor inicial.', [0, 50, 10, 20, 5],
      p => tex('1.25(1-' + p + '/100)=' + n(1.25 * (1 - p / 100))), 'El descuento se aplica sobre un total mayor que el original.', { input: v => v + ' %', loads: v => [1.25 * (1 - v / 100), 1] }),
    point('Marca el par de precios de un artículo de 50 mil tras descuentos del 10 % y del 20 %.', [0, 70, 0, 70], [20, 14], [50, 36], [line(.72, 0)], 'Multiplica los factores de lo que queda: 90 % y 80 %.', { dx: 2, dy: 1 }),
  ], lab('cascada', 'Aplica a 100 mil una rebaja del 30 % y luego un aumento del 20 %.',
    { price: 100, start: [0, 0], goal: [-30, 20], read: ([a, b]) => tex('100(' + (1 + a / 100) + ')(' + (1 + b / 100) + ')=' + n(100 * (1 + a / 100) * (1 + b / 100))) },
    'El segundo porcentaje se calcula sobre el resultado de la primera etapa.', 'Primero quedan 70 mil. Al aumentar ese valor un 20 %, quedan 84 mil.', true));

  // Exponentes y Radicales
  tune('alg-21a', ['arbol-potencia', 'torre-producto', 'pares-negativos'], [
    rail('Ajusta el exponente de base 3 para producir 243.', [0, 6, 1, 5], x => tex('3^{' + x + '}=' + 3 ** x), 'Cada paso multiplica otra vez por 3.', { bars: x => [['Cantidad producida', 3 ** x]], scale: 3 ** 6 }),
    tiles('Identifica las potencias de base negativa que dan un valor positivo.', 3, ['$(-3)^2$', '$(-3)^3$', '$(-2)^4$', '$(-2)^5$', '$(-5)^6$', '$(-5)^7$'], [0, 2, 4], 'Agrupa los signos negativos en pares. Cuando sobra uno, el resultado queda negativo.', { explain: 'Los exponentes 2, 4 y 6 forman pares completos de signos.' }),
    dial('Gira al exponente que produce $\\tfrac{1}{8}$ con base 2.', [-4, -3, -2, -1, 0, 1], 1, v => tex('2^{' + v + '}=' + n(2 ** v)), 'Un exponente negativo da el recíproco de la potencia con exponente positivo.'),
  ]);
  tune('alg-21b', ['cuenta-factores', 'cambia-de-piso', 'salta-la-coma'], [
    rail('Ajusta el exponente de $2^x$ para que $2^5\\cdot 2^x=2^9$.', [-5, 7, 1, 4], x => tex('2^5\\cdot2^{' + x + '}=2^{' + (5 + x) + '}'), 'Al unir las dos cadenas se cuentan juntos todos los factores.'),
    rect('Representa los factores de $(a^4)^3$ como tres filas iguales de factores $a$.', [7, 6], [4, 3], 'Cada fila representa una copia completa de $a^4$.', { read: ([x, y]) => tex('(a^{' + x + '})^{' + y + '}=a^{' + x * y + '}') }),
    groups('Distribuye las potencias según el signo de su exponente tras simplificarlas.', ['Negativo', 'Cero', 'Positivo'], ['$a^2/a^5$', '$a^2a^3$', '$a^4/a^4$', '$(a^{-1})^3$'], [0, 2, 1, 0],
      'En un cociente de la misma base, elimina los factores que están en ambos lados.', { explain: 'Los exponentes finales son −3, 5, 0 y −3, respectivamente.' }),
  ], lab('factores', 'Simplifica $a^6/a^3$ arrastrando los factores de abajo sobre sus copias de arriba.',
    { top: 6, bottom: 3, factor: '$a$', start: 0, goal: 3,
      read: k => tex('\\frac{a^{' + (6 - k) + '}}{a^{' + (3 - k) + '}}' + (k === 3 ? '=a^3' : '')) },
    'Cada pareja cancelada reduce en uno los dos exponentes.', '$a^6/a^3=a^{6-3}=a^3$ para $a\\ne0$.', true));
  tune('alg-22a', ['lado-del-cuadrado', 'reparte-factores'], [
    rail('Mueve el lado del cuadrado hasta que su área sea 49.', [0, 10, 3, 7], x => tex(x + '^2=' + x * x), 'La raíz cuadrada principal mide una longitud y es no negativa.', { loads: x => [x * x, 49] }),
    groups('Agrupa los radicandos según si tienen raíz cuadrada entera.', ['Entera', 'No entera'], ['16', '18', '25', '27', '36', '38'], [0, 1, 0, 1, 0, 1], 'Busca los números que aparecen al cuadrar un entero.', { explain: '$16=4^2$, $25=5^2$ y $36=6^2$.' }),
    probe('Mueve la sonda de $x^3$ hasta la altura −27.', [-4, 4, -30, 30], 2, -3, x => x ** 3, 'Una potencia impar conserva el signo de la base.'),
    dial('Ajusta el exponente de 64 que equivale a sacar la raíz cúbica y luego elevar al cuadrado.', ['$0$', '$1/3$', '$1/2$', '$2/3$', '$3/2$', '$2$'], 3,
      (v, i) => tex('64^{' + ['0', '1/3', '1/2', '2/3', '3/2', '2'][i] + '}=' + n(64 ** [0, 1 / 3, 1 / 2, 2 / 3, 3 / 2, 2][i])), 'El índice de la raíz queda en el denominador y la potencia en el numerador.'),
  ]);
  tune('alg-22b', ['saca-del-radical', 'parte-baldosa', 'tabla-conjugado'], [
    groups('Agrupa las longitudes radicales por su parte irracional simplificada.', ['$\\sqrt2$', '$\\sqrt3$'],
      ['$\\sqrt8$', '$\\sqrt{12}$', '$\\sqrt{18}$', '$\\sqrt{27}$'], [0, 1, 0, 1], 'Separa primero un factor cuadrado perfecto de cada radicando.', { explain: '$2\\sqrt2,2\\sqrt3,3\\sqrt2,3\\sqrt3$.' }),
    rect('Construye una baldosa de área 24 con base cuadrada perfecta 4.', [8, 8], [4, 6], 'Extraer la raíz de 4 solo deja el otro factor dentro del radical.',
      { read: ([a, b]) => tex('\\sqrt{' + (a * b) + '}=\\sqrt{' + a + '}\\sqrt{' + b + '}'), explain: '$\\sqrt{24}=2\\sqrt6$.' }),
    rail('Ajusta el multiplicador entero de $\\sqrt3$ para igualar $\\sqrt{75}$.', [1, 9, 2, 5], x => tex('(' + x + '\\sqrt3)^2=' + 3 * x * x), 'Busca el cuadrado perfecto que acompaña al 3 dentro de 75.', { loads: x => [3 * x * x, 75], explain: '$\\sqrt{75}=5\\sqrt3$.' }),
  ]);

  // Sucesiones y Series
  tune('alg-14', ['pisa-huellas', 'escalera-aritmetica', 'rellena-medios', 'cuenta-saltos'], [
    point('Ubica el quinto término de la secuencia 4, 7, 10, … . El eje horizontal es el índice.', [0, 7, 0, 25], [1, 4], [5, 16], [line(3, 1)], 'Desde la primera posición hasta la quinta hay cuatro saltos.'),
    rail('Ajusta la diferencia para que una progresión que empieza en 24 tenga cuarto término 9.', [-8, 6, 1, -5], d => tex('a_4=24+3(' + d + ')=' + (24 + 3 * d)), 'Hay tres saltos y el total disminuye 15 unidades.', { bars: d => [['Primer término', 24], ['Cuarto término', 24 + 3 * d]], scale: 42 }),
  ]);
  tune('alg-14b', ['dos-escaleras', 'parejas-gauss', 'suma-filas'], [
    rect('Construye el rectángulo formado por dos escaleras de cinco peldaños, con extremos 4 y 12.', [7, 18], [5, 16], 'Los extremos de las escaleras se emparejan para producir la altura de cada columna.', { explain: 'El rectángulo tiene cinco columnas de altura 16. Cada escalera tiene área 40.' }),
    rail('Ajusta el número de términos de 3, 6, 9, … cuya suma sea 63.', [1, 10, 3, 6], x => tex('S_{' + x + '}=' + (3 * x * (x + 1) / 2)), 'La suma es la media del primer y último término por el número de términos.', { bars: x => [['Suma', 3 * x * (x + 1) / 2]], scale: 165 }),
    tiles('Pinta las parejas que permiten sumar 5, 8, 11, 14, 17 por los extremos.', 3, ['$5+17$', '$5+14$', '$8+14$', '$8+17$', '$11+11$', '$11+14$'], [0, 2, 4],
      'Cada término emparejado con su reflejo en la lista suma lo mismo. El central se empareja consigo al duplicar la lista.', { explain: 'Las parejas valen 22. Para calcular una sola suma, divides en dos la suma de la lista duplicada.' }),
  ]);
  tune('alg-14c', ['rebota-pelota', 'torre-producto', 'rellena-medios'], [
    probe('Una pelota parte de 64 cm y conserva la mitad de la altura en cada rebote. Busca cuándo queda en 8 cm.', [0, 6, 0, 64], 1, 3, x => 64 * .5 ** x,
      'Cada rebote multiplica la altura anterior por la misma razón.'),
    dial('Gira a la razón que transforma 5 en 20 después de dos pasos.', ['$1/2$', '$1$', '$2$', '$3$', '$4$', '$5$'], 2,
      (_, i) => tex('a_3=' + n(5 * [.5, 1, 2, 3, 4, 5][i] ** 2)), 'La misma razón debe aplicarse dos veces para que el resultado se cuadruplique.'),
    point('Ubica el cuarto término de 3, 6, 12, … en el plano índice–valor.', [0, 6, 0, 32], [1, 3], [4, 24], [x => 3 * 2 ** (x - 1)], 'Al pasar del índice 1 al 4 aplicas tres veces la razón.', { dy: 1 }),
  ]);
  tune('alg-14d', ['resta-corrida', 'limite-serie'], [
    tiles('En un mosaico de 16 celdas pinta lo que cubren las tres primeras capas: mitad, cuarto y octavo.', 4, grid(16, () => ''), grid(14, i => i), 'Parte de la mitad. Cada nueva contribución ocupa la mitad de la anterior.', { valid: v => v.length === 14, read: v => tex('\\frac{' + v.length + '}{16}'), explain: '$\\frac12+\\frac14+\\frac18=\\frac{14}{16}$.' }),
    rail('Ajusta cuántos términos de $12+6+3+\\cdots$ suman 21.', [1, 8, 1, 3], x => tex('S_{' + x + '}=' + n(24 * (1 - .5 ** x))), 'Al agregar un término, se suma la mitad del último que ya tienes.', { bars: x => [['Suma acumulada', 24 * (1 - .5 ** x)], ['Distancia a 24', 24 * .5 ** x]], scale: 24 }),
    point('Ubica el punto que muestra cuánto falta para 2 después de sumar $1+\\tfrac12+\\tfrac14$. El eje horizontal cuenta términos.', [0, 6, 0, 2], [1, 1], [3, .25], [x => 2 * .5 ** x], 'Resta la suma parcial al límite. La distancia restante va disminuyendo.', { dy: .125 }),
    dial('Ajusta la razón de una serie geométrica cuyo primer término es 8 y cuya suma infinita es 16.', ['$0$', '$1/4$', '$1/3$', '$1/2$', '$3/4$', '$7/8$'], 3,
      (_, i) => tex('S_\\infty=' + n(8 / (1 - [0, .25, 1 / 3, .5, .75, .875][i]))), 'Si la suma es el doble del primer término, compara cuánto queda al quitar la primera contribución.'),
  ]);
  tune('alg-15', ['arma-sigma', 'parte-sigma', 'suma-filas', 'torre-producto'], [
    groups('Lleva a la región de suma los términos que intervienen en $\\sum_{k=2}^{4}(2k+1)$.', ['Suma', 'Fuera'], ['3', '5', '7', '9', '11'], [1, 0, 0, 0, 1],
      'Los índices de 2 a 4 se incluyen en ambos extremos.', { explain: 'Los términos son 5, 7 y 9. El total es 21.' }),
    rail('Ajusta el último índice para que $\\prod_{k=2}^{m}k=120$.', [2, 7, 3, 5],
      m => tex('\\prod_{k=2}^{' + m + '}k=' + grid(m - 1, i => i + 2).reduce((a, b) => a * b, 1)), 'Cada nuevo índice aporta un factor y el producto anterior se conserva como factor parcial.'),
  ]);

  // Álgebra de Polinomios
  tune('alg-23a', [], [
    groups('Agrupa los términos por su grado para ver cuáles se pueden sumar.', ['$x^2$', '$x$', 'Constante'],
      ['$-5x$', '$7$', '$-x^2$', '$4x^2$', '$3x$', '$-2$'], [1, 2, 0, 0, 1, 2], 'El coeficiente puede variar. Los términos semejantes conservan la misma potencia de x.'),
    tiles('En la expresión $7x^5-5x^5-2x^5+4x^2+x-3$, pinta los términos de grado 5 que se cancelan.', 3,
      ['$7x^5$', '$-5x^5$', '$-2x^5$', '$4x^2$', '$x$', '$-3$'], [0, 1, 2], 'Suma los coeficientes de la potencia mayor antes de leer el grado.', { explain: 'Los términos de grado 5 suman cero. El polinomio resultante tiene grado 2.' }),
    probe('Evalúa $2x^2-x+3$ en $x=-2$ con la sonda.', [-4, 4, 0, 32], 1, -2, x => 2 * x ** 2 - x + 3, 'Sustituye el número negativo entre paréntesis antes de elevarlo.'),
    rail('Ajusta $k$ para que $kx^3-6x^3+2x^2$ tenga grado 2.', [0, 10, 2, 6], x => tex('(' + (x - 6) + ')x^3+2x^2'),
      'El grado baja cuando el coeficiente del término cúbico se vuelve cero.'),
    rect('Construye la malla de cruces al multiplicar un polinomio de tres términos por uno de cuatro.', [6, 6], [4, 3],
      'Cada término de un polinomio se multiplica por cada término del otro.', { valid: ([a, b]) => a * b === 12 && Math.min(a, b) === 3, explain: 'Se calculan 12 productos antes de reunir términos semejantes.' }),
    point('Marca el intercepto vertical de $x^2+2x-3$.', [-5, 5, -6, 10], [1, 0], [0, -3], [x => x * x + 2 * x - 3],
      'En el eje vertical, la entrada es cero y solo queda el término constante.'),
  ]);
  tune('alg-3', ['bloques-area'], [
    rect('Arma el cuadrado que representa $(3+4)^2$.', [9, 9], [7, 7], 'El lado tiene las dos partes juntas. El cuadrado incluye también los dos rectángulos mixtos.',
      { explain: '$7^2=3^2+2\\cdot3\\cdot4+4^2=49$.' }),
    rail('Equilibra $(x+3)^2$ con $x^2+6x+9$ y llévalos juntos a 64.', [0, 8, 1, 5],
      x => tex('(' + x + '+3)^2=' + (x + 3) ** 2), 'La expansión da el mismo valor para todo x. Busca primero qué lado positivo tiene área 64.',
      { loads: x => [(x + 3) ** 2, 64], explain: 'El lado mide 8. Por eso $x=5$ y ambas escrituras valen 64.' }),
    tiles('Pinta las piezas que quedan al repartir $(x+3)(x-3)$.', 2, ['$x^2$', '$3x$', '$-3x$', '$-9$'], [0, 3],
      'Los dos productos mixtos tienen el mismo tamaño y signos opuestos.', { explain: 'Se cancelan $3x$ y $-3x$. Queda $x^2-9$.' }),
    probe('Usa la sonda de $(x-4)^2$ para encontrar dónde vale cero.', [-1, 8, 0, 30], 1, 4, par(1, 4, 0),
      'Un cuadrado es cero cuando la cantidad que se eleva es cero.'),
    groups('Separa por tipo las piezas del área de $(x+2)(x+5)$.', ['$x^2$', 'Término lineal', 'Constante'],
      ['$x^2$', '$2x$', '$5x$', '$10$'], [0, 1, 1, 2], 'Las bandas mixtas llevan una sola x y se pueden juntar.', { explain: 'El área total es $x^2+7x+10$.' }),
  ]);
  tune('alg-24c', [], [
    rail('Ajusta el coeficiente central en $(a+b)^4$.', [0, 10, 2, 6], v => tex(v + 'a^2b^2'),
      'Cuenta cuántas formas hay de escoger dos de los cuatro factores para tomar b.', { bars: v => [['Término central', v]] }),
    tiles('Para obtener $a^2b^3$ en $(a+b)^5$, pinta tres factores de los que tomas $b$.', 5,
      ['1', '2', '3', '4', '5'], [0, 2, 4], 'Cada casilla pintada representa un factor del que tomas b.', { valid: v => v.length === 3,
        read: v => tex('a^{' + (5 - v.length) + '}b^{' + v.length + '}'), explain: 'Hay $\\binom53=10$ maneras de pintar tres de las cinco posiciones.' }),
    groups('Agrupa los términos de $(a-b)^4$ según el signo de su coeficiente.', ['Positivos', 'Negativos'],
      ['$a^4$', '$a^3b$', '$a^2b^2$', '$ab^3$', '$b^4$'], [0, 1, 0, 1, 0], 'Cada b viene de elegir un factor −b. Cuenta cuántos signos negativos se multiplican.'),
    rect('En $(a+b)^3$ dibuja tres columnas con dos opciones por columna.', [6, 6], [3, 2],
      'Cada columna representa un factor, y sus dos celdas son las opciones a y b.', { read: ([x, y]) => tex(y + '^{' + x + '}=' + y ** x), explain: 'Hay 8 productos antes de reunirlos en los términos de la expansión.' }),
    dial('Gira hasta el exponente de b del término con coeficiente 5 que tiene menor exponente de a en $(a+b)^5$.', [0, 1, 2, 3, 4, 5], 4,
      (k, i) => tex([1, 5, 10, 10, 5, 1][i] + 'a^{' + (5 - k) + '}b^{' + k + '}'), 'Hay dos coeficientes 5. Compara en cuál el exponente de a queda más pequeño.'),
    route('Sigue la potencia de a al avanzar dos términos desde el primer término de $(a+b)^5$.', ['5', '4', '6', '3', '2', 'fin'], [1, 3],
      'En cada paso, cambias una elección de a por una de b.'),
  ]);
  tune('alg-24b', ['bloques-area', 'completa-cuadrado'], [
    rect('Encuentra dos factores positivos de 24 que sumen 11.', [12, 10], [8, 3],
      'El área representa el producto y la suma de los dos lados representa el término lineal.', { valid: ([a, b]) => a * b === 24 && a + b === 11,
        read: ([a, b]) => tex('u+v=' + (a + b) + '\\quad uv=' + a * b), explain: '$x^2+11x+24=(x+3)(x+8)$.' }),
    rail('Ajusta el factor común de $18x^3+12x^2$ para que el factor restante tenga coeficientes 3 y 2.', [1, 18, 3, 6],
      v => tex(v + 'x^2\\left(\\frac{18}{' + v + '}x+\\frac{12}{' + v + '}\\right)'), 'El número debe dividir ambos coeficientes. Usa además la menor potencia común de x.'),
    probe('Encuentra el cero negativo de $x^2-25$ sobre la curva.', [-7, 7, -27, 26], 1, -5, x => x * x - 25,
      'Factoriza como diferencia de cuadrados. Busca el cruce que está a la izquierda del origen.'),
    groups('Separa los factores de $x^2+x-20$ de las otras expresiones.', ['Factores', 'Fuera'], ['$x+5$', '$x-4$', '$x+4$', '$x-5$'], [0, 0, 1, 1],
      'Los dos números deben sumar 1 y multiplicar −20.', { explain: '$x^2+x-20=(x+5)(x-4)$.' }),
  ]);

  // Parábolas y Complejos
  tune('alg-23c', [], [
    point('Arrastra el punto hasta representar $-3+2i$.', [-5, 5, -5, 5], [1, 1], [-3, 2], [],
      'El eje horizontal mide la parte real y el vertical la parte imaginaria.'),
    dial('Gira el brazo desde $i^0$ hasta la quinta multiplicación por $i$.', [0, 1, 2, 3, 4, 5, 6, 7], 5,
      k => tex('i^{' + k + '}=' + ['1', 'i', '-1', '-i'][k % 4]), 'Cada paso multiplica por i. Cuatro pasos completan una vuelta.'),
    rail('Ajusta la parte imaginaria de $3+bi$ hasta que el módulo sea 5. Usa un b positivo.', [0, 7, 2, 4],
      b => tex('|3+' + b + 'i|=\\sqrt{' + (9 + b * b) + '}'), 'Las partes real e imaginaria son catetos de un triángulo rectángulo.',
      { bars: b => [['Cuadrado de la parte real', 9], ['Cuadrado de la parte imaginaria', b * b]], scale: 49 }),
    groups('Mueve cada complejo a su lado del eje real.', ['Arriba', 'Abajo', 'En el eje'], ['$5-2i$', '$-i$', '$2i$', '$-3$', '$2+i$'],
      [1, 1, 0, 2, 0], 'Solo el coeficiente de i decide la altura.'),
    tiles('Pinta las operaciones que dejan un número real.', 2, ['$i^2$', '$i^3$', '$(2+i)(2-i)$', '$2+i$'], [0, 2],
      'Busca productos de conjugados y potencias pares de i.', { explain: '$i^2=-1$ y $(2+i)(2-i)=5$ son reales.' }),
    route('Parte de $1+i$ y multiplica por i dos veces.', ['$1+i$', '$-1+i$', '$1-i$', '$-1-i$', '$1+i$', 'fin'], [1, 3],
      'Multiplicar por i gira el vector 90° en sentido antihorario.'),
  ]);
  tune('alg-1', ['balanza-exponencial'], [
    rail('Quita la misma cantidad a ambos lados de $3x+7=19$ hasta aislar $3x$.', [0, 14, 0, 7],
      v => tex('3x+' + (7 - v) + '=' + (19 - v)), 'El 7 debe quedar en cero y los dos miembros deben recibir el mismo cambio.', { explain: 'Quitar 7 deja $3x=12$ y luego $x=4$.' }),
    rect('Construye tres filas de fichas iguales para representar $3x=21$.', [10, 7], [7, 3],
      'El total se reparte en tres filas iguales. La fila representa una copia de x.', { explain: '$x=7$.' }),
    point('Coloca el punto donde $y=2x-1$ y $y=7$ tienen el mismo valor.', [-4, 8, -5, 12], [1, 1], [4, 7], [line(2, -1), line(0, 7)],
      'El punto de intersección debe tener la misma altura en las dos rectas.'),
    tiles('Pinta las ecuaciones cuyo único valor solución sea 3.', 2, ['$2x=6$', '$x+2=6$', '$5x-7=8$', '$3x=12$'], [0, 2],
      'Sustituye x por 3 y compara los miembros de cada igualdad.', { explain: 'Tres cumple $2x=6$ y $5x-7=8$.' }),
    route('Traza las cantidades correctas al resolver $4x-5=23$: primero elimina el −5 y luego despeja.', ['23', '$4x=28$', '$4x=18$', '$x=7$', '$x=4$', 'fin'],
      [1, 3], 'Suma 5 a ambos lados. Después divide ambos lados entre 4.'),
  ]);
  tune('alg-4a', ['completa-cuadrado', 'mueve-parabola'], [
    point('Marca el vértice de $y=2(x+1)^2-3$.', [-5, 5, -6, 12], [1, 2], [-1, -3], [par(2, -1, -3)],
      'El vértice aparece donde se anula la parte al cuadrado.'),
    probe('Busca en $f(x)=-(x-2)^2+7$ el máximo de la altura.', [-3, 7, -11, 9], -1, 2, par(-1, 2, 7), 'El término cuadrático se resta. La altura es mayor cuando ese término es cero.'),
    rail('Ajusta el coeficiente $a$ para que $y=ax^2+1$ pase por $(2,13)$.', [-4, 7, 1, 3], a => tex('y(2)=4(' + a + ')+1=' + (4 * a + 1)),
      'Sustituye el valor horizontal en el cuadrado y compara la altura resultante con 13.', { loads: a => [4 * a + 1, 13] }),
    groups('Mueve cada parábola al lado que indica su abertura.', ['Hacia arriba', 'Hacia abajo'],
      ['$2x^2$', '$-x^2+4$', '$(x-2)^2$', '$-3(x+1)^2$'], [0, 1, 0, 1], 'El signo del factor que multiplica el cuadrado controla la abertura.'),
  ]);
  tune('alg-4', ['raices-imanes'], [
    point('Marca la raíz positiva de $y=x^2-9$.', [-6, 6, -10, 12], [1, 3], [3, 0], [par(1, 0, -9)], 'Una raíz es un cruce con la altura cero. La raíz positiva queda a la derecha.'),
    rail('Ajusta $c$ para que el discriminante de $x^2-6x+c=0$ sea cero.', [0, 14, 5, 9], c => tex('\\Delta=36-4(' + c + ')=' + (36 - 4 * c)),
      'Iguala el cuadrado del coeficiente lineal con cuatro veces el independiente.', { loads: c => [36, 4 * c] }),
    groups('Separa las ecuaciones por la cantidad de raíces reales distintas.', ['Ninguna', 'Una', 'Dos'],
      ['$x^2+1=0$', '$x^2-4=0$', '$(x-2)^2=0$', '$x^2+9=0$'], [0, 2, 1, 0],
      'Compara lo que tendría que valer el cuadrado con cero.'),
    tiles('Pinta todas las raíces enteras de $x^2-3x-10=0$.', 3, ['$-5$', '$-2$', '$0$', '$2$', '$3$', '$5$'], [1, 5],
      'Busca dos números cuyo producto sea −10 y cuya suma sea 3 para leer las raíces.', { explain: 'Los cruces son $-2$ y $5$, pues $(x+2)(x-5)=0$.' }),
    route('Empieza en $x^2-10x=-21$ y sigue hasta la raíz mayor por completar el cuadrado.', ['$x^2-10x$', 'suma 25', 'suma 10', '$5+2$', '$5-2$', 'fin'],
      [1, 3], 'La mitad de −10 se eleva al cuadrado. Luego usa el signo que produce la raíz mayor.'),
  ]);

  // Raíces de Polinomios
  tune('alg-23b', [], [
    rect('Empaca 32 unidades como cuatro filas de ocho para representar una división exacta en el arreglo.', [10, 8], [8, 4],
      'Cada fila tiene el tamaño del divisor. El número de filas es el cociente.', { explain: '$32=8\\cdot4+0$.' }),
    rail('Ajusta el coeficiente de $x^2$ para que $kx^2+5x+6=(x+2)(x+3)$.', [0, 8, 4, 1],
      k => tex(k + 'x^2+5x+6'), 'El coeficiente del término de mayor grado se obtiene multiplicando los dos términos x.'),
    groups('Pon los términos del dividendo en su columna y detecta qué grado falta.', ['Grado 3', 'Grado 2', 'Grado 1'],
      ['$2x^3$', '$0x$', '$-4x^2$', '$0x^2$'], [0, 2, 1, 1],
      'Un término con coeficiente cero sirve como marcador de posición en una columna.', { explain: 'El polinomio $2x^3-4x^2$ tiene coeficiente lineal cero.' }),
    probe('Sondea $x^2+2x+7$ en $x=2$ para medir el residuo al dividir por $x-2$.', [-4, 4, 0, 30], 0, 2, x => x * x + 2 * x + 7,
      'La identidad del dividendo se simplifica cuando el divisor se vuelve cero.'),
    tiles('Pinta las divisiones cuyo cociente, si la división es exacta, tiene grado 2.', 2,
      ['$x^5/x^3$', '$x^4/x^3$', '$x^6/x^4$', '$x^3/x^3$'], [0, 2], 'Resta el grado del divisor al grado del dividendo.',
      { explain: 'Las diferencias $5-3$ y $6-4$ valen 2.' }),
    route('Parte del grado 7. Divide por un polinomio de grado 3 y luego divide el cociente por otro de grado 2.',
      ['7', '4', '10', '2', '6', 'fin'], [1, 3], 'En cada división, resta el grado del divisor al del dividendo.'),
  ]);
  tune('alg-92', ['division-sintetica'], [
    probe('Mide el residuo de dividir $x^3-2x+5$ por $x+2$.', [-4, 4, -14, 18], 0, -2, x => x ** 3 - 2 * x + 5,
      'Busca primero el valor que hace que el divisor valga cero.'),
    point('Marca el punto que da el residuo de dividir $x^2-3x+4$ por $x-4$.', [-2, 6, 0, 22], [1, 3], [4, 8],
      [x => x * x - 3 * x + 4], 'El dato horizontal viene del divisor. El vertical es el valor del polinomio en ese punto.'),
    tiles('Pinta los valores de r que hacen de $x-r$ un factor de $(x-1)(x+3)(x-4)$.', 3, ['$-4$', '$-3$', '$-1$', '$0$', '$1$', '$4$'],
      [1, 4, 5], 'Para cada factor, encuentra qué valor de x lo hace cero.', { explain: '$r=-3,1,4$.' }),
    rail('Ajusta $k$ para que $x-3$ sea factor de $x^2+kx-15$.', [-5, 6, 0, 2],
      k => tex('P(3)=9+3(' + k + ')-15=' + (3 * k - 6)), 'Si el divisor es un factor, el residuo de evaluar en 3 debe ser cero.', { loads: k => [9 + 3 * k, 15] }),
    groups('Agrupa divisores de $P(x)=x^2-4$ según produzcan división exacta o residuo.', ['Exacta', 'Con residuo'],
      ['$x-2$', '$x+1$', '$x+2$', '$x-3$'], [0, 1, 0, 1], 'El divisor es factor cuando el polinomio se anula en su raíz.'),
  ]);
  tune('alg-93', ['raices-imanes'], [
    tiles('Marca las raíces en las que la gráfica de $(x+3)(x-1)^2(x-4)^3$ cruza el eje.', 3, ['$-3$', '$1$', '$4$'],
      [0, 2], 'Un factor de potencia impar cambia de signo al pasar por su cero.', { explain: 'Cruza en −3 y 4. En 1 toca el eje y rebota.' }),
    probe('Alumbra la raíz negativa de $(x+2)^2(x-3)$.', [-4, 5, -30, 24], 0, -2, x => (x + 2) ** 2 * (x - 3),
      'Un cero doble toca el eje aunque la gráfica no cambie de lado.'),
    groups('Coloca cada potencia en su región. Mira el comportamiento de la curva en 2.', ['Cruza', 'Toca y vuelve'],
      ['$(x-2)^2$', '$(x-2)^3$', '$(x-2)^4$', '$x-2$'], [1, 0, 1, 0], 'Los exponentes pares mantienen el signo alrededor de la raíz.'),
    point('Marca la altura de $y=-(x+2)(x-4)$ en $x=0$.', [-5, 6, -12, 10], [1, 1], [0, 8],
      [x => -(x + 2) * (x - 4)], 'Sustituye cero y observa los signos de los dos factores.'),
    rail('Ajusta la multiplicidad del primer cero para que $(x+1)^m(x-4)^2$ tenga grado 7.', [1, 8, 2, 5],
      m => tex('\\deg P=' + m + '+2=' + (m + 2)), 'Cada copia de un factor lineal aporta uno al grado total.'),
  ]);

  // Fracciones Algebraicas
  tune('alg-25a', ['cancela-factores', 'cruz-asintotas'], [
    point('Marca el hueco que queda al simplificar $(x^2-9)/(x-3)$.', [-5, 6, -4, 11], [1, 4], [3, 6], [line(1, 3)],
      'La recta simplificada da la altura. La coordenada horizontal se excluye por el denominador original.', { explain: 'El hueco queda en $(3,6)$ porque la expresión original excluye $x=3$.' }),
    tiles('Pinta todos los valores que deja fuera $\\dfrac{x+5}{(x-2)(x+3)}$.', 3, ['$-5$', '$-3$', '$-2$', '$0$', '$2$', '$3$'],
      [1, 4], 'Se excluyen los ceros del denominador original, incluso si otro factor pudiera cancelarse.', { explain: 'Se excluyen $x=-3$ y $x=2$.' }),
    groups('Para $\\dfrac{(x-1)(x+4)}{(x-1)(x+2)}$, separa hueco, asíntota y valor permitido.', ['Hueco', 'Asíntota', 'Permitido'],
      ['$1$', '$-2$', '$-4$', '$0$'], [0, 1, 2, 2], 'Un cero de un factor cancelado deja un hueco. Si el factor sigue en el denominador, hay asíntota.'),
    probe('Sigue la gráfica de $\\dfrac{x^2-4}{x-2}$ y busca dónde llega a 7.', [-5, 8, -4, 12], 0, 5, x => x === 2 ? NaN : x + 2,
      'El factor compartido deja $x+2$ en todos los puntos permitidos.', { holes: [[2, 4]] }),
  ]);
  tune('alg-25b', ['cancela-factores'], [
    bridges('Amplía las dos fracciones hasta construir el mismo denominador.', [['1', 'x-2'], ['2', 'x+3']], ['x-2', 'x+3'],
      ['x+3', 'x-2', 'x+2', 'x-3'], [0, 1], 'Cada fracción necesita el factor que ya aparece en la otra.',
      'Las dos fracciones quedan sobre $(x-2)(x+3)$. La suma es $\\frac{3x-1}{(x-2)(x+3)}$, con $x\\ne2,-3$.'),
    tiles('Para $1/(x-2)+1/(x+3)$, pinta los factores que deben estar en el denominador común.', 2,
      ['$x-2$', '$x+3$', '$x-3$', '$x+2$'], [0, 1], 'Cada factor original debe poder dividir al denominador común sin residuo.',
      { explain: 'El denominador común más corto es $(x-2)(x+3)$.' }),
    groups('Construye el numerador de $\\frac{2}{x}+\\frac{3}{x+1}$ sobre $x(x+1)$ llevando cada pieza a su lugar.',
      ['Primer sumando', 'Segundo sumando', 'Sobra'], ['$2x$', '$2$', '$3x$', '$3$'], [0, 0, 1, 2],
      'Multiplica cada numerador por el factor que le falta a su denominador.', { explain: '$2(x+1)+3x=5x+2$.' }),
    probe('Sondea en $x=3$ la suma $\\dfrac1x+\\dfrac1{x+1}$.', [1, 7, 0, 2], 1, 3, x => 1 / x + 1 / (x + 1),
      'Al sustituir 3, compara los dos denominadores para convertirlos a doceavos.', { explain: '$\\frac13+\\frac14=\\frac7{12}$.' }),
    route('Traza los factores al convertir $\\dfrac{x}{x-1}\\div\\dfrac{x+2}{x-1}$ en un producto y simplificar.',
      ['inicio', '$\\times\\frac{x-1}{x+2}$', '$\\times\\frac{x+2}{x-1}$', '$\\frac{x}{x+2}$', '$\\frac{x+2}{x}$', 'fin'],
      [1, 3], 'Invierte solo el divisor. Conserva las restricciones de la operación original.',
      { explain: 'El resultado es $x/(x+2)$ con $x\\ne1$ y $x\\ne-2$.' }),
  ]);
  tune('alg-101', ['afina-sistema', 'combina-vectores'], [
    point('Encuentra la intersección de $y=x+2$ y $y=8-x$.', [-3, 9, -2, 11], [1, 3], [3, 5], [line(1, 2), line(-1, 8)],
      'Una solución debe quedar sobre las dos rectas al mismo tiempo.'),
    groups('Distribuye los puntos según si cumplen $x+y=5$.', ['En la recta', 'Fuera'], ['$(1,4)$', '$(2,4)$', '$(5,0)$', '$(-1,6)$'], [0, 1, 0, 0],
      'Suma las dos coordenadas de cada punto para comprobar la ecuación.'),
    rail('Ajusta el multiplicador de $x-2y$ para sumarlo a $3x+6y$ y eliminar y.', [-5, 7, 1, 3],
      m => tex((3 + m) + 'x+(' + (6 - 2 * m) + ')y'), 'Busca qué múltiplo de −2 cancela el coeficiente +6.', { loads: m => [2 * m, 6] }),
    tiles('Pinta las ecuaciones de rectas paralelas a $y=2x+1$ que no coinciden con ella.', 2,
      ['$y=2x-4$', '$y=-2x+1$', '$y=2x+1$', '$y=2x+5$'], [0, 3], 'Las rectas paralelas tienen la misma pendiente. Compara sus interceptos.',
      { explain: 'Los interceptos −4 y 5 son distintos de 1, y ambas pendientes valen 2.' }),
  ]);
  tune('alg-102', [], [
    point('Encuentra la intersección positiva de $y=x^2$ y $y=4$.', [-4, 4, -2, 10], [1, 1], [2, 4], [par(1, 0, 0), line(0, 4)],
      'Compara la rama derecha de la parábola con la altura de la recta.'),
    probe('Sigue $y=x^2-1$ hasta su intersección de abscisa negativa con $y=2x+2$.', [-4, 5, -7, 15], 0, -1, x => x * x - 1,
      'Iguala las dos alturas y conserva la candidata que queda a la izquierda del cero.', { other: [line(2, 2)] }),
    tiles('Pinta las parejas que resuelven simultáneamente $x+y=5$ y $xy=6$.', 2, ['$(2,3)$', '$(1,4)$', '$(3,2)$', '$(0,5)$'],
      [0, 2], 'Cada pareja debe pasar las dos pruebas. Cambiar el orden puede dejar las dos relaciones intactas.', { explain: 'Las parejas $(2,3)$ y $(3,2)$ tienen suma 5 y producto 6.' }),
    rail('En $A/(x-1)+2/(x+1)$, ajusta $A$ para que el numerador común contenga $5x$.', [-4, 8, 1, 3],
      a => tex((a + 2) + 'x+(' + (a - 2) + ')'), 'Al expandir el numerador, el coeficiente de x reúne una copia de A y una de 2.'),
    groups('Al eliminar los denominadores de $A/(x-2)+B/(x+3)$, asigna a cada letra su factor.', ['Multiplica A', 'Multiplica B', 'Fuera'],
      ['$x-2$', '$x+3$', '$x$', '$x+2$'], [1, 0, 2, 2], 'Completa cada denominador con el factor del otro término.'),
    route('En $\\dfrac{7x-1}{(x-1)(x+2)}$, usa $x=1$ para despejar $A$.',
      ['inicio', '$6=3A$', '$6=3B$', '$A=2$', '$A=3$', 'fin'], [1, 3],
      'A acompaña a $1/(x-1)$. Tras multiplicar por el denominador común, el término con $x-1$ desaparece al sustituir 1.'),
  ]);

  // Crecimiento Exponencial
  tune('alg-71', ['balanza-exponencial', 'proyector-sombras'], [
    probe('Sigue la gráfica de $3^x$ hasta la altura 27.', [-3, 4, 0, 30], 0, 3, x => 3 ** x,
      'La curva sube multiplicando por 3 con cada paso de una unidad.'),
    point('Marca el intercepto vertical de $f(x)=2\\cdot4^x$.', [-3, 3, 0, 16], [1, 2], [0, 2], [x => 2 * 4 ** x],
      'En el eje vertical el exponente vale cero.'),
    groups('Separa las funciones según aumenten o disminuyan al mover x hacia la derecha.', ['Crecen', 'Decrecen'],
      ['$2^x$', '$(1/3)^x$', '$4^x$', '$(3/4)^x$'], [0, 1, 0, 1], 'Una base entre 0 y 1 reduce la altura de cada paso siguiente.'),
    rail('Ajusta la cantidad inicial para que, después de triplicarse dos veces, queden 54 unidades.', [1, 10, 2, 6],
      v => tex(v + '\\cdot3^2=' + v * 9), 'Deshaz las dos multiplicaciones por 3.', { bars: v => [['Inicio', v], ['Tras dos etapas', v * 9]], scale: 90 }),
  ]);
  tune('alg-13b', ['crece-planta', 'carrera-interes', 'ajusta-capital', 'mejor-oferta', 'alcancias-gemelas'], [
    rail('Ajusta los periodos hasta duplicar un capital de 100 con interés simple de 20 % por periodo.', [0, 9, 1, 5],
      t => tex('M=100(1+0.2\\cdot' + t + ')=' + n(100 * (1 + .2 * t))), 'Cada vez se añaden 20 unidades calculadas sobre el capital inicial.',
      { bars: t => [['Capital', 100], ['Monto acumulado', 100 + 20 * t]], scale: 280 }),
    point('Marca en la curva el monto de 200 tras tres periodos al 10 % compuesto.',
      [0, 5, 210, 300], [1, 220], [3, 266], [t => 200 * 1.1 ** t],
      'Cada crecimiento se aplica al monto completo del periodo anterior.',
      { valid: ([x, y]) => x === 3 && Math.abs(y - 266.2) <= 1.25, explain: '$200\\cdot1.1^3=266.2$.' }),
  ]);
  tune('alg-72', ['espejo-diagonal'], [
    point('Refleja $(3,8)$ de $y=2^x$ sobre $y=x$.', [0, 9, 0, 9], [3, 8], [8, 3],
      [x => 2 ** x, x => Math.log2(x), x => x], 'La entrada de la exponencial se vuelve la salida del logaritmo.', { explain: '$2^3=8$ equivale a $\\log_2(8)=3$.' }),
    rail('Ajusta el argumento $b$ para que $\\log_2 4 + \\log_2 b=\\log_2 32$.', [1, 12, 2, 8],
      b => tex('\\log_2(4\\cdot' + b + ')=\\log_2(' + (4 * b) + ')'), 'Sumar logaritmos de la misma base corresponde a multiplicar los argumentos.', { loads: b => [4 * b, 32] }),
    dial('Gira hasta el exponente de 5 que produce $1/25$.', [-3, -2, -1, 0, 1, 2], 1,
      v => tex('5^{' + v + '}=' + n(5 ** v)), 'El exponente que buscas es el logaritmo en base 5 de esa fracción.'),
    groups('Agrupa los argumentos de $\\log_3 x$ por el signo del resultado.', ['Negativo', 'Cero', 'Positivo'],
      ['$1/3$', '$1$', '$9$', '$1/9$', '$3$'], [0, 1, 2, 0, 2], 'Para una base mayor que 1, las potencias de exponente negativo quedan entre 0 y 1.'),
    tiles('Pinta los argumentos que admite $\\ln(x-2)$.', 3, ['$-3$', '$0$', '$1$', '$2$', '$3$', '$8$'], [4, 5],
      'El argumento completo, x menos 2, debe quedar estrictamente positivo.', { explain: 'El dominio es $x>2$. De la lista sirven 3 y 8.' }),
  ]);
  tune('alg-73', ['balanza-exponencial'], [
    point('Marca el punto donde $2^x$ iguala a 16.', [-2, 6, 0, 22], [1, 2], [4, 16], [x => 2 ** x, line(0, 16)],
      'Busca qué potencia de 2 da la altura de la recta horizontal.'),
    probe('Sondea $\\log_2(x-1)$ hasta que la altura sea 3.', [2, 12, 0, 4], 3, 9, x => Math.log2(x - 1),
      'Convierte la igualdad a forma exponencial y añade el desplazamiento de una unidad.'),
    groups('Clasifica los valores para resolver $\\log_2(x-1)+\\log_2(x+1)=3$.', ['Solución', 'Admitido', 'Fuera del dominio'],
      ['$-3$', '$1$', '$2$', '$3$', '$5$'], [2, 2, 1, 0, 1], 'Primero exige que ambos argumentos sean positivos. Luego prueba el producto en la ecuación.',
      { explain: '$x^2-1=8$ produce las candidatas −3 y 3. La única válida es 3.' }),
    tiles('Pinta las ecuaciones que tienen $x=2$ como solución.', 2, ['$3^x=9$', '$2^x=2$', '$\\log_2(x+2)=2$', '$\\ln(x-2)=0$'],
      [0, 2], 'Sustituye 2 en cada caso. Para evaluar un logaritmo, verifica antes el dominio.',
      { explain: '$3^2=9$ y $\\log_2(2+2)=2$.' }),
    route('Despeja $x$ en $3^{2x-1}=27$ aumentando de estación cuando la igualdad sea equivalente.', ['inicio', '$2x-1=3$', '$2x-1=9$', '$x=2$', '$x=5$', 'fin'],
      [1, 3], 'Expresa 27 como potencia de 3. Luego iguala exponentes.'),
  ]);

  // Sin jefes (spec 2026-11-18-algebra-revision): la evaluación conserva sus preguntas, suma las variantes y los retos
  // que eran del jefe (cada uno ligado a la lección que repasa) y el nodo del jefe desaparece del mundo.
  function assess(world, boss, replacements, bossLessons) {
    const u = COURSE_ALGEBRA.units.find(u => u.world === world);
    const item = (lesson, ex, review) => ({ lesson, review: review || ((ex.hint || '') + ' ' + (ex.explain || '')).trim(),
      ex: { ...ex, canvasGuide: true, exam: true, motion: false, params: { ...ex.params, motion: false, autoDemo: false } } });
    // Las preguntas de escoger o de armar con fichas de tocar no siguen: el usuario las descartó.
    const dull = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'ordena-terminos', 'verdadero-falso'];
    const items = u.exam.items.filter(it => !dull.includes(it.ex.game)).map(it => item(it.lesson, it.ex, it.review));
    for (const [i, ex] of Object.entries(replacements)) items.push(item(u.exam.items[i].lesson, ex));
    boss.forEach((ex, i) => items.push(item(bossLessons[i], ex)));
    // Orden del mundo: primero las preguntas de la primera lección.
    const order = u.lessons.map(l => l.id);
    u.exam.items = items.map((it, k) => [it, k]).sort((a, b) => order.indexOf(a[0].lesson) - order.indexOf(b[0].lesson) || a[1] - b[1]).map(([it]) => it);
    u.exam.minutes = Math.max(12, Math.round(u.exam.items.length * 1.5));
    delete u.boss;
  }

  assess('conjuntos', [
    groups('El universo son las letras de CLIMA. Separa las que pertenecen también a MAR.', ['En común', 'Solo en CLIMA'],
      ['C', 'L', 'I', 'M', 'A'], [1, 1, 1, 0, 0], 'Un elemento en común aparece en las dos palabras.'),
    tiles('Colorea el complemento de $A=\\{2,4,6\\}$ en $U=\\{1,2,3,4,5,6\\}$.', 3,
      ['1', '2', '3', '4', '5', '6'], [0, 2, 4], 'Parte de U y excluye los elementos que aparecen en A.', { explain: '$A^c=\\{1,3,5\\}$.' }),
    route('Traza las cardinalidades. Parte de 3 elementos, añade uno nuevo y luego añade dos que ya estaban.', ['3', '4', '5', '4', '6', 'fin'],
      [1, 3], 'Añadir una copia de un elemento no cambia la cardinalidad.', { motion: true }),
  ], {
    3: rail('Ajusta el número de subconjuntos de $\\{P,L,A,T,O\\}$.', [0, 40, 10, 32], v => tex('n(\\mathcal P(A))=' + v),
      'Incluye o deja fuera cada uno de los cinco elementos.', { explain: '$2^5=32$ subconjuntos, incluido el vacío.' }),
  }, ['alg-0c', 'alg-0c', 'alg-0a']);
  assess('numeros', [
    play('ubica-en-recta', 'Suelta cada número en su lugar de la recta', { min: -3, max: 3, tol: 0.15, points: [
      { label: '−7/4', tex: '-\\tfrac74', value: -1.75 }, { label: '2/3', tex: '\\tfrac23', value: 0.6667 }, { label: '−√2', tex: '-\\sqrt2', value: -1.4142 }, { label: '2.25', tex: '2.25', value: 2.25 },
    ] }, 'Siete cuartos son una unidad y tres cuartos, a la izquierda del cero; $-\\sqrt2 \\approx -1.41$ queda un poco a su derecha, y $\\tfrac23$ y $2.25$ a la derecha del cero.',
      { hint: 'Antes de soltar, convierte cada número a decimal: así ves entre qué enteros cae y de qué lado del cero está.' }),
    groups('Pon cada valor en la familia más pequeña que lo contiene.', ['Enteros', 'Racionales no enteros', 'Irracionales'],
      ['$-3$', '$1/7$', '$\\sqrt5$', '$\\sqrt{16}$', '$0.25$'], [0, 1, 2, 0, 1],
      'Reduce una raíz cuadrada exacta antes de clasificarla.'),
    probe('Desplaza la sonda de $y=|x+2|$ hasta la rama izquierda con altura 3 y suéltala.', [-7, 5, 0, 7], 0, -5, x => Math.abs(x + 2),
      'Busca el punto que se aleja tres unidades hacia la izquierda de −2.', { motion: true }),
  ], {
    6: rail('Ajusta la distancia entre $-3.5$ y $2.25$.', [0, 8, 3, 5.75, .25], v => format(v, 'd'),
      'Mide cada tramo hasta cero y suma las longitudes.', { explain: '$|2.25-(-3.5)|=5.75$.' }),
  }, ['alg-11b', 'alg-11c', 'alg-12d']);
  assess('razones', [
    rect('Construye un rectángulo de 24 unidades cuya razón ancho a alto sea 3:2.', [10, 8], [6, 4],
      'Multiplica los lados del modelo por el mismo número y comprueba el área.', { read: ([a, b]) => tex(a + ':' + b + '\\quad A=' + a * b) }),
    point('Marca cuánto cuesta comprar seis unidades si cuatro cuestan 18 mil pesos.', [0, 10, 0, 40], [2, 9], [6, 27], [line(4.5, 0)],
      'Dos unidades cuestan la mitad del precio conocido.'),
    route('Desde 200 mil, aplica una rebaja de 25 % y después un aumento de 10 %.', ['200', '150', '175', '165', '160', 'fin'], [1, 3],
      'El segundo cambio toma como base el precio tras la rebaja.', { motion: true }),
  ], {
    6: probe('En un mapa, 2 cm representan 15 km. Pon la sonda en la distancia que representan 7 cm.',
      [0, 8, 0, 64], 2, 7, line(7.5, 0), 'Un centímetro representa la mitad de 15 km.', { explain: '$7\\cdot7.5=52.5$ km.' }),
  }, ['alg-12', 'alg-12f', 'alg-13d']);
  assess('potencias', [
    rect('Empaca $(2^3)^2$ como dos filas de tres factores 2. Muestra cuántos factores hay en total.', [6, 5], [3, 2],
      'Cada fila repite completa la potencia de adentro.', { read: ([x, y]) => tex('(2^{' + x + '})^{' + y + '}=2^{' + x * y + '}') }),
    rail('Equilibra $k\\sqrt5$ con $\\sqrt{180}$ usando un entero positivo.', [1, 9, 3, 6], k => tex('(' + k + '\\sqrt5)^2=' + 5 * k * k),
      'Factoriza 180 como cinco veces un cuadrado perfecto.', { loads: k => [5 * k * k, 180], explain: '$\\sqrt{180}=6\\sqrt5$.' }),
    probe('Lleva la sonda a $x=-3$ en $y=4^x$ y sigue el cambio de escala.', [-4, 2, 0, 5], 0, -3, x => 4 ** x,
      'Un paso hacia la izquierda divide la altura entre 4.', { motion: true, explain: '$4^{-3}=\\tfrac1{64}$.' }),
  ], {
    5: dial('En la rueda de potencias de 81, identifica el exponente que saca la raíz cuarta y luego eleva al cubo.',
      ['$1/4$', '$1/3$', '$3/4$', '$4/3$', '$2$', '$3$'], 2, (v, i) => tex('81^{' + v.slice(1, -1) + '}=' + n(81 ** [.25, 1 / 3, .75, 4 / 3, 2, 3][i])),
      'El índice de la raíz es el denominador de la potencia fraccionaria.', { explain: '$81^{3/4}=3^3=27$.' }),
  }, ['alg-21b', 'alg-22b', 'alg-21a']);
  assess('progresiones', [
    point('Marca en la gráfica el séptimo término de 2, 6, 10, … .', [0, 8, 0, 35], [1, 2], [7, 26], [line(4, -2)],
      'Entre los términos 1 y 7 hay seis saltos de la misma longitud.'),
    tiles('Pinta cuatro capas sobre 32 celdas: mitad, cuarto, octavo y dieciseisavo.', 8, grid(32, () => ''), grid(30, i => i),
      'La primera capa usa 16 celdas. Cada capa posterior usa la mitad de la anterior.', { valid: v => v.length === 30, read: v => tex('\\frac{' + v.length + '}{32}'), explain: '$16+8+4+2=30$ celdas.' }),
    probe('Busca cuántas etapas necesita un acumulado de $1+2+4+\\cdots$ para llegar a 31.', [0, 6, 0, 65], 1, 5, x => 2 ** x - 1,
      'Al duplicar la suma y restar la original, queda la siguiente potencia menos uno.', { motion: true }),
  ], {
    0: point('Marca el término 12 de $5,8,11,\\ldots$.', [0, 14, 0, 48], [2, 8], [12, 38], [line(3, 2)], 'Cuenta los saltos que separan el término 1 del 12.'),
    1: rect('Forma un rectángulo de diez columnas con dos copias de la suma $2+4+\\cdots+20$.', [12, 24], [10, 22],
      'Los términos se emparejan por los extremos. Cada pareja suma lo mismo.', { explain: 'El rectángulo tiene 220 unidades. Una copia de la suma vale 110.' }),
    2: probe('Sondea el número de bacterias tras seis horas, si empieza una y la cantidad se duplica cada hora.', [0, 7, 0, 130], 2, 6, x => 2 ** x,
      'El número de duplicaciones es el número de horas.'),
  }, ['alg-14', 'alg-14d', 'alg-14d']);
  assess('polinomios', [
    groups('Reúne las piezas semejantes de $(x+2)(x+7)$ para construir el polinomio.', ['Cuadrado', 'Lineales', 'Constante'],
      ['$7x$', '$x^2$', '$14$', '$2x$'], [1, 0, 2, 1], 'Solo las dos piezas lineales comparten la misma potencia de x.', { explain: '$x^2+9x+14$.' }),
    tiles('Para el término $a^3b^2$ de $(a+b)^5$, marca exactamente las dos posiciones que aportan b.', 5,
      ['1', '2', '3', '4', '5'], [1, 3], 'Puedes elegir cualquier par de las cinco posiciones.', { valid: v => v.length === 2, explain: 'Hay diez pares. El término completo es $10a^3b^2$.' }),
    probe('Lleva la sonda al cero positivo de $y=x^2-2x-15$ y suéltala.', [-6, 7, -18, 20], 0, 5, x => x * x - 2 * x - 15,
      'El factor que corresponde a la raíz positiva se anula en la rama derecha.', { motion: true }),
  ], {
    0: probe('Evalúa $x^2-4x+7$ en $x=-2$.', [-4, 5, 0, 42], 1, -2, x => x * x - 4 * x + 7, 'Sustituye con paréntesis en los dos términos variables.'),
    1: tiles('Pinta los tres términos que quedan al desarrollar $(3x-2)^2$.', 3,
      ['$9x^2$', '$-12x$', '$9x$', '$4$', '$-4x$', '$-4$'], [0, 1, 3],
      'La parte de grado 1 suma los productos mixtos.', { explain: 'Al desarrollar sale $9x^2-12x+4$.' }),
    2: rect('Construye una tabla de parejas ordenadas de siete objetos, sin repetir un objeto consigo mismo.', [9, 8], [7, 6],
      'Una primera elección deja seis posibilidades para la segunda. Cada pareja sin orden aparece dos veces.',
      { explain: '$\\binom72=7\\cdot6/2=21$.' }),
    4: tiles('Pinta los dos factores que recomponen $x^3+27$.', 2,
      ['$x+3$', '$x^2-3x+9$', '$x-3$', '$x^2+3x+9$'], [0, 1],
      'Es una suma de cubos. Al multiplicar, los términos mixtos se cancelan.', { explain: '$x^3+27=(x+3)(x^2-3x+9)$.' }),
  }, ['alg-3', 'alg-24c', 'alg-24b']);
  assess('cuadraticas', [
    point('Coloca el conjugado de $-2+3i$ en el plano complejo.', [-5, 5, -5, 5], [1, 0], [-2, -3], [],
      'Refleja sobre el eje real. La parte real queda fija y la imaginaria cambia de signo.'),
    rail('Equilibra la ecuación $5x-8=2x+7$.', [0, 10, 2, 5], x => tex(5 * x - 8 + '\\quad\\text{y}\\quad' + (2 * x + 7)),
      'Junta las copias de x en un miembro y las constantes en el otro.', { loads: x => [5 * x - 8, 2 * x + 7] }),
    probe('Encuentra la abscisa del máximo de $y=-(x-3)^2+8$.', [-2, 8, -9, 10], 0, 3, par(-1, 3, 8),
      'El término que se resta es un cuadrado y puede valer cero.', { motion: true }),
  ], {
    0: rail('Ajusta el valor real del producto $(2-i)(2+i)$.', [0, 10, 2, 5], v => format(v),
      'Multiplica como una diferencia de cuadrados y usa $i^2=-1$.', { explain: 'El producto es $4-i^2=5$.' }),
    1: point('Marca la intersección de $y=2(x+3)$ y $y=x-4$.', [-12, 2, -17, 10], [-3, 0], [-10, -14], [line(2, 6), line(1, -4)],
      'Simplifica primero la distributiva. El punto debe estar en las dos rectas.'),
    3: rail('Desliza hasta indicar el discriminante de $3x^2-2x-1$.', [-12, 24, 0, 16], v => format(v, '\\Delta'),
      'Eleva b al cuadrado y resta $4ac$, conservando el signo del término independiente.', { explain: '$(-2)^2-4\\cdot3(-1)=16$.' }),
    4: tiles('Marca en el tablero las raíces de $x^2+2x-8=0$.', 3, ['$-4$', '$-2$', '$0$', '$2$', '$4$', '$8$'],
      [0, 3], 'Dos factores lineales con constantes de producto −8 y suma 2 dejan ver las raíces.', { explain: 'Los factores son $(x+4)(x-2)$.' }),
  }, ['alg-23c', 'alg-1', 'alg-4a']);
  assess('grado-superior', [
    tiles('Pinta los puntos donde cruza el eje $y=(x+1)^2(x-2)(x-4)^3$.', 3, ['$-1$', '$2$', '$4$'],
      [1, 2], 'Solo la multiplicidad impar cambia el signo de la gráfica.', { explain: 'Cruza en 2 y 4. Rebota en −1.' }),
    rail('Ajusta el coeficiente de $x$ para que $x+2$ sea factor de $x^2+kx+6$.', [-2, 9, 1, 5],
      k => tex('P(-2)=10-2(' + k + ')=' + (10 - 2 * k)), 'El residuo que se obtiene al evaluar en −2 debe valer cero.', { loads: k => [10, 2 * k] }),
    probe('Lleva la sonda al valor que da el residuo de dividir $x^3-2x+1$ por $x+3$.', [-5, 5, -45, 45], 0, -3, x => x ** 3 - 2 * x + 1,
      'Para un divisor de la forma $x-r$, el residuo es $P(r)$.', { motion: true }),
  ], {
    0: groups('Reconstruye el cociente de $(x^2+2x-3)/(x-1)$ arrastrando las piezas que contiene.', ['Cociente', 'Fuera'], ['$x$', '$3$', '$-3$', '$x^2$'],
      [0, 0, 1, 1], 'Factoriza el dividendo y retira el factor que coincide con el divisor.', { explain: '$x^2+2x-3=(x-1)(x+3)$.' }),
    2: probe('Marca el valor de entrada que revela el residuo de dividir $2x^3-x+5$ entre $x+1$.', [-4, 4, -16, 22], 1, -1, x => 2 * x ** 3 - x + 5,
      'Evalúa donde el divisor es cero.'),
    4: tiles('Para $x^3-3x^2+2x+5$, pinta cada coeficiente que cambia de signo con respecto al anterior.', 4,
      ['1', '$-3$', '2', '5'], [1, 2], 'Recorre los coeficientes en orden descendente de grado.',
      { explain: 'Hay dos cambios de signo. Por la regla de Descartes puede haber dos raíces positivas o ninguna.' }),
  }, ['alg-93', 'alg-92', 'alg-92']);
  assess('racionales', [
    bridges('Construye el denominador común para sumar las dos expresiones.',
      [['3', 'x+1'], ['1', 'x-4']], ['x+1', 'x-4'], ['x+1', 'x-4', 'x-1', 'x+4'], [1, 0],
      'Cada expresión necesita el factor que le falta.', 'Queda $\\frac{4x-11}{(x+1)(x-4)}$, con $x\\ne-1,4$.'),
    groups('Clasifica los valores para $\\dfrac{(x+2)(x-5)}{(x+2)(x-1)}$.', ['Hueco', 'Asíntota', 'Permitido'],
      ['$-2$', '$1$', '$5$', '$0$'], [0, 1, 2, 2], 'Conserva todas las restricciones del denominador original.'),
    point('Encuentra la intersección con $x>0$ de $y=x^2-4$ y $y=2x+4$. Suelta para recorrer el plano.', [-5, 6, -6, 14],
      [0, 1], [4, 12], [par(1, 0, -4), line(2, 4)], 'Iguala las alturas y conserva la solución positiva.', { motion: true }),
  ], {
    2: bridges('Amplía lo necesario para sumar $\\frac3x+\\frac2{x^2}$.', [['3', 'x'], ['2', 'x^2']], ['x', 'x^2'],
      ['x', '1', 'x^2', 'x+1'], [0, 1], 'Solo falta un factor de x a la primera fracción.',
      '$\\frac3x+\\frac2{x^2}=\\frac{3x+2}{x^2}$, con $x\\ne0$.'),
    4: point('Encuentra el punto de corte de $y=x^2$ y $y=x+2$ que tiene abscisa negativa.', [-4, 4, -2, 12], [1, 1], [-1, 1],
      [par(1, 0, 0), line(1, 2)], 'Las dos curvas pueden tener más de un punto en común. Usa el que queda a la izquierda del eje vertical.'),
  }, ['alg-25b', 'alg-25a', 'alg-102']);
  assess('exp-log', [
    point('Marca en $y=2^x$ la altura que corresponde a dos pasos a la izquierda de cero.', [-4, 5, 0, 8], [1, 2], [-2, .25],
      [x => 2 ** x], 'Cada paso a la izquierda divide la altura anterior por 2.', { dy: .25 }),
    tiles('Pinta los argumentos que hacen que $\\log_2(x-4)$ sea positivo.', 3, ['$2$', '$4$', '$5$', '$6$', '$8$', '$3$'],
      [3, 4], 'Para un logaritmo en base mayor que 1, la salida positiva pide un argumento estrictamente mayor que 1.',
      { explain: '$x-4>1$, así que sirven 6 y 8.' }),
    probe('Encuentra el valor que hace $\\log_2(x+2)=4$. Suelta para recorrer la curva.', [-1, 20, 0, 5], 2, 14, x => Math.log2(x + 2),
      'Vuelve a la forma exponencial. Luego deshaz el desplazamiento de dos unidades.', { motion: true }),
  ], {
    1: rail('Ajusta el interés simple en miles que generan 200 mil pesos durante seis meses al 2 % mensual.',
      [0, 42, 10, 24], v => format(v, 'I'), 'Cada mes se añaden 4 mil pesos sobre el capital original.', { explain: '$200\\cdot0.02\\cdot6=24$ mil pesos.' }),
    2: dial('Elige en la rueda el exponente de base 4 que produce 64.', [0, 1, 2, 3, 4, 5], 3, v => tex('4^{' + v + '}=' + 4 ** v),
      'Parte de la unidad y cuenta las multiplicaciones por 4.'),
    3: probe('Sondea $3^x$ hasta alcanzar el producto $9\\cdot27$ que corresponde a la suma de logaritmos.', [0, 6, 0, 300], 2, 5, x => 3 ** x,
      'La suma de logaritmos de la misma base se convierte en el logaritmo de un producto.'),
    4: probe('Busca el valor aproximado de x que hace que $5^x$ llegue a 20.', [1, 2, 0, 26], 1, 1.86, x => 5 ** x,
      'La solución queda entre 1 y 2. Acerca la sonda a la altura dada.',
      { dx: .01, valid: x => Math.abs(5 ** x - 20) < .2, explain: '$x=\\log_5 20\\approx1.861$.' }),
  }, ['alg-71', 'alg-72', 'alg-73']);
})();
