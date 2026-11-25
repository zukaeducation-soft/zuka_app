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
      'TEXTO 1: No lo propongo con gusto. Pero un trancón también contamina: un motor detenido gasta y no avanza. Según nuestro modelo, la ampliación reduciría el tiempo de viaje a la mitad durante los primeros seis años. Sembraríamos trescientos árboles en el parque del sur, tres por cada uno que se quite.',
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
      ...P(['Ampliar a seis carriles.', 0, '¿Quién propone talar?'], ['Probar un carril de buses con pintura.', 1, '¿Quién propone algo que se pueda borrar?'], ['Un motor detenido también contamina.', 0, '¿Quién habla del trancón como contaminación?'], ['Los niños no caminan por el sur.', 1, '¿Quién responde a la siembra?'], ['El alivio dura seis años.', 0, '¿Quién lo calculó con su modelo?']), bien: 'Dos cartas, dos propuestas.' },
      'Solano amplía, calcula y habla del motor; Becerra prueba con pintura y responde sobre los niños.', 'Busca primero en qué carta aparece cada idea.'),
    x('pista-tipo', 'Ata cada movimiento a la frase que lo hace.', { doc: ARBOLES, lineas: ['«No lo propongo con gusto».', '«Los que hoy protestan mañana pitarán».', '«Los niños no caminan por el sur».', '«Tampoco quiero que todo quede igual».'],
      ...T(['admite un costo', 0, '¿Cuál reconoce algo malo de su idea?'], ['ataca a quien se opone', 1, '¿Cuál habla de las personas y no de los árboles?'], ['refuta la compensación', 2, '¿Cuál responde a los trescientos árboles?'], ['acepta que hay un problema', 3, '¿Cuál concede que el tráfico importa?']), bien: 'Admitir, atacar, refutar y conceder.' },
      'Solano admite un costo y ataca; Becerra refuta la siembra y concede que hay un problema.', 'Pregunta qué hace cada frase con la posición del otro.'),
    x('genero-o-cita', '¿Es una respuesta **a la idea** o un ataque **a la persona**?', { doc: ARBOLES, rot: ['a la idea', 'a la persona'],
      ...F(['Un árbol nuevo tarda quince años en dar sombra', 0, '¿Habla del plan o de alguien?'], ['Los que protestan son los que pitarán', 1, '¿Habla del plan o de alguien?'], ['El alivio dura solo seis años', 0, '¿Habla del plan o de alguien?'], ['No les escribo por nostalgia', 0, '¿Aclara una razón o insulta?']), bien: 'Solo una ataca.' },
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
    x('tacha-resumen', 'Tacha las dos oraciones que sobran al comparar las posturas.', { doc: ARBOLES, lineas: ['Solano propone ampliar y compensar en otro lugar.', 'La avenida se llama como los árboles.', 'Becerra muestra que la sombra y el alivio no duran lo mismo.', 'Ella propone una prueba que se pueda deshacer.', 'Ella barre hojas.', 'Los dos reconocen el problema del tráfico.'], ...S([1, 4], { 0: 'Es la primera postura.', 2: 'Es su mejor argumento.', 3: 'Es la segunda postura.', 5: 'Es lo que comparten.' }), bien: 'Dos posturas, un argumento y lo común.' },
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
