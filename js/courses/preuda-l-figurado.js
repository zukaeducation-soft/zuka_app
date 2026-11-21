// Preuniversitario · Comprensión lectora · mundo 12 «Lenguaje figurado» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): una crónica de Medellín de madrugada llena de metáforas, comparaciones, personificaciones e
// hipérboles (figuras literarias) y un «elogio» del trancón que dice lo contrario de lo que piensa (ironía). La evaluación usa el
// recuerdo de un abuelo pescador del río Cauca. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const MADRUGADA = {
    id: 'lec-ciudad-cinco', title: 'La ciudad a las cinco',
    ficha: { autor: 'Crónica de un escritor de Medellín', fuente: 'Suplemento literario de un periódico', fecha: 'Enero de 2025' },
    paras: [
      'A las cinco de la mañana, Medellín todavía no se ha puesto los zapatos. Las montañas que la rodean son un abrazo oscuro, y las luces de las laderas parecen un pesebre que alguien se olvidó de recoger en enero. En el centro, los primeros buses bostezan en los paraderos con las puertas abiertas, y un perro callejero cruza la avenida vacía como si fuera el dueño de la ciudad.',
      'Los que madrugan forman una ciudad aparte. Hay panaderos con los brazos blancos de harina, como estatuas que se movieran; vigilantes que llevan cien años sin dormir; vendedoras de tinto que empujan sus carritos cuesta arriba con una paciencia de piedra. Nadie habla mucho a esa hora: las palabras también están dormidas, y los saludos se hacen con la cabeza.',
      'A las seis, el sol asoma por el oriente y la ciudad empieza a desperezarse. El río, que de noche era una cinta negra, se vuelve de plata por unos minutos. Las palomas del parque Berrío ocupan sus puestos como funcionarias puntuales, y el metro, ese gusano de acero, empieza a tragarse a la gente por montones. En los vagones, muchos dormitan de pie, agarrados de las barras, como si todavía estuvieran soñando con la cama.',
      'A las siete ya no queda nada de aquella ciudad en voz baja. Los pitos, los gritos de los vendedores y la música de los almacenes llenan cada rincón, y uno tiene la impresión de que todo el mundo llegó tarde a la misma cita. Los semáforos cambian de color sin que nadie los mire, y hasta los edificios parecen tener prisa. Nadie se acuerda ya del perro de las cinco ni de las palabras dormidas.',
      'Pero quien vio la ciudad a las cinco sabe que ella también tiene un rato de silencio, y que lo guarda solo para los que madrugan. Es un secreto pequeño, de una hora apenas, que no sale en las postales ni en los noticieros. Para conocerlo no hay que pagar nada: basta con poner el despertador un poco antes que el sol.',
    ],
  };

  const TRANCON = {
    id: 'lec-elogio-trancon', title: 'Elogio del trancón',
    ficha: { autor: 'Columna de humor', fuente: 'Periódico de Medellín, página de opinión', fecha: 'Noviembre de 2025' },
    paras: [
      'Quiero dedicar estas líneas a una institución que no recibe el reconocimiento que merece: el trancón de la autopista a las seis de la tarde. Mientras otras ciudades desperdician su tiempo en trenes rápidos y carriles exclusivos, nosotros hemos sabido conservar una tradición que nos regala, cada día, hora y media de reflexión obligatoria. Todos los días, sin falta: ni el colegio fue nunca tan puntual.',
      'Gracias al trancón, miles de personas han descubierto la música de los vendedores ambulantes, el arte de comer empanada sin soltar el volante y la paciencia, esa virtud que los monjes buscan durante años en las montañas y que nosotros encontramos entre una buseta y un camión de gaseosas. ¿Qué más se le puede pedir a una vía? Hay quienes han aprendido a leer, a rezar el rosario completo y hasta a cortarse las uñas mientras esperan que se mueva el carro de adelante.',
      'Hay quienes se quejan, claro. Dicen que pasan más tiempo en el carro que con sus hijos, que el humo les irrita los ojos y que llegan a la casa sin ganas de nada. Son, sin duda, personas que no han entendido la belleza de quedarse quietas durante cuarenta minutos frente a la misma valla de un colchón. Allá ellos, que se lo pierden.',
      'Las autoridades, sabias como siempre, han decidido proteger esta tradición. Llevan quince años estudiando la ampliación de la vía, y es de esperar que la sigan estudiando quince más, por si acaso. Construirla de afán sería, como todo el mundo sabe, un error imperdonable. Mientras tanto, cada año se venden más carros y la vía sigue midiendo lo mismo, lo cual garantiza que la tradición no corra ningún peligro.',
      'Así que la próxima vez que esté detenido en la autopista, no se desespere ni pite por gusto. Apague el radio, mire a su alrededor y respire hondo el aire fresco del tubo de escape del carro de adelante: está rodeado de miles de personas que, como usted, están aprovechando al máximo su vida.',
    ],
  };

  // ---------------- Lección 1 · Figuras literarias ----------------
  setLesson('pu-lf-1', [
    play('ordena-parrafos', 'Arma la crónica otra vez', { doc: MADRUGADA },
      'La crónica sigue el reloj: las cinco, los que madrugan a esa misma hora, «A las seis», «A las siete» y el cierre con «Pero quien vio la ciudad a las cinco», que vuelve al comienzo.',
      { hint: 'Busca las horas al comienzo de los párrafos. El último no trae hora: vuelve a una que ya pasó.' }),
    play('palabra-a-la-medida', 'Lo que quieren decir las figuras', { doc: MADRUGADA, rounds: [
      { p: 1, before: 'Medellín todavía no ', word: 'se ha puesto los zapatos', after: '.', options: ['ha empezado su día', 'ha comprado ropa', 'ha salido a caminar', 'se ha acostado'], answer: 0 },
      { p: 2, before: 'empujan sus carritos cuesta arriba con una ', word: 'paciencia de piedra', after: '.', options: ['paciencia firme e incansable', 'paciencia dura y fría como una roca', 'paciencia de escultor', 'poca paciencia'], answer: 0 },
      { p: 3, before: 'el metro, ese gusano de acero, empieza a ', word: 'tragarse', after: ' a la gente por montones', options: ['recibir en sus vagones', 'expulsar', 'asustar', 'olvidar en las estaciones'], answer: 0 },
    ] }, 'En el examen importa lo que significa la figura: la ciudad que no se ha puesto los zapatos todavía no empieza el día; la paciencia de piedra es firme e incansable; y el metro «se traga» a la gente porque la recibe a montones en sus vagones.',
      { hint: 'No leas la figura al pie de la letra: pregúntate qué idea real quiere transmitir.' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: MADRUGADA, rounds: [
      { p: 2, text: 'Nadie habla mucho a esa hora|:| las palabras también están dormidas', options: ['anuncia por qué nadie habla', 'abre una lista de oficios', 'marca una cita', 'separa dos preguntas'], answer: 0 },
      { p: 2, text: 'como estatuas que se movieran|;| vigilantes que llevan cien años sin dormir', options: ['separa partes de una lista que ya tienen comas', 'cierra el párrafo', 'anuncia una explicación', 'marca una pregunta'], answer: 0 },
      { p: 3, text: 'y el metro|,| ese gusano de acero, empieza a tragarse a la gente', options: ['abre un inciso que nombra al metro con una metáfora', 'separa dos verbos', 'reemplaza un verbo que no se repite', 'anuncia una cita'], answer: 0 },
    ] }, 'Los dos puntos anuncian la razón poética del silencio. El punto y coma separa las partes de una lista larga cuyas partes ya llevan comas. Y las comas del párrafo 3 encierran un inciso: «ese gusano de acero» es otro nombre del metro.',
      { hint: 'Fíjate qué viene después del signo: una razón, otra parte de una lista o un nombre nuevo para lo que se acaba de decir.' }),
    play('termometro-tono', 'El tono de la crónica', { doc: MADRUGADA, rounds: [
      { frag: 'Nadie habla mucho a esa hora: las palabras también están dormidas, y los saludos se hacen con la cabeza.', scale: ['poético', 'técnico', 'agresivo', 'irónico'], answer: 0 },
      { frag: 'Pero quien vio la ciudad a las cinco sabe que ella también tiene un rato de silencio, y que lo guarda solo para los que madrugan.', scale: ['afectuoso', 'burlón', 'técnico', 'alarmado'], answer: 0 },
    ] }, 'Las palabras «dormidas» son una imagen poética. Y el cierre habla de la ciudad con cariño, como de alguien que guarda un secreto.',
      { hint: 'Fíjate en cómo trata el autor a la ciudad: ¿como un objeto o como alguien a quien quiere?' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: MADRUGADA, q: '¿Qué quiere decir el autor con «Medellín todavía no se ha puesto los zapatos»?', options: [
      ['Que a esa hora la gente de Medellín sale descalza a la calle.', 3],
      ['Que a esa hora la ciudad todavía no ha empezado su día.', 0],
      ['Que nadie en la ciudad trabaja antes de las siete.', 1],
      ['Que la ciudad nunca termina de despertar.', 2],
    ] }, 'B lee la personificación: la ciudad es como alguien que aún no se ha arreglado para salir. A toma la frase al pie de la letra, y eso el texto no lo dice. C dice de más: a las cinco ya trabajan panaderos, vigilantes y vendedoras. D dice lo contrario de las siete, cuando todo es ruido. Sobra el sello «Mezcla datos».',
      { hint: 'Una figura no se lee al pie de la letra. Pregúntate qué hace alguien antes de ponerse los zapatos.' }),
    play('caso-nuevo', '¿Hay personificación?', { doc: MADRUGADA, principle: 'Una personificación les da acciones o rasgos humanos a cosas, lugares o animales.', ask: '¿En cuáles frases hay personificación?', cards: [
      ['El viento golpeaba la puerta con rabia.', true],
      ['La nevera ronca toda la noche.', true],
      ['La casa era grande y vieja.', false],
      ['Corrió como un rayo.', false],
    ] }, 'Sentir rabia y roncar son cosas de personas: el viento y la nevera están personificados. «Grande y vieja» describe sin figura, y «como un rayo» es una comparación.',
      { hint: 'Pregúntate si la cosa hace algo que solo haría una persona.' }),
    play('resumen-esencial', 'El resumen en tres renglones', { doc: MADRUGADA, ideas: [
      ['A las cinco la ciudad está en silencio y solo la recorren los que madrugan.', true],
      ['Con el sol la ciudad despierta poco a poco, y a las siete ya es puro ruido.', true],
      ['Ese rato de silencio es un secreto que solo conocen los madrugadores.', true],
      ['Un perro callejero cruza la avenida vacía.', false],
      ['Las palomas del parque Berrío ocupan sus puestos.', false],
      ['El río se vuelve de plata por unos minutos.', false],
    ] }, 'La crónica va de la ciudad callada de las cinco a la ciudad ruidosa de las siete, y cierra con el secreto de los que madrugan. El perro, las palomas y el río son imágenes que pintan cada hora, no lo que el texto quiere decir.',
      { hint: 'En un texto lleno de imágenes, las ideas esenciales son las que quedan cuando se quitan las imágenes.' }),
  ]);

  // ---------------- Lección 2 · Ironía ----------------
  setLesson('pu-lf-2', [
    play('anticipa-texto', 'Antes de leer', { doc: TRANCON, slots: [
      ['Tema', ['el trancón de la ciudad', 'la historia de los carros', 'cómo se construye una autopista'], 0],
      ['Tono', ['humorístico, con ironía', 'solemne, como un informe técnico', 'triste, como una despedida'], 0],
      ['Tipo de texto', ['columna de opinión', 'noticia de tránsito', 'manual de conducción'], 0],
    ] }, 'Un «elogio» del trancón en una columna de humor de la página de opinión: lo que se espera es una crítica dicha al revés, con ironía.',
      { hint: 'Piensa si alguien elogiaría de verdad un trancón. La ficha dice en qué sección se publica.' }),
    play('termometro-tono', 'Lo que dice y lo que piensa', { doc: TRANCON, rounds: [
      { frag: 'Las autoridades, sabias como siempre, han decidido proteger esta tradición.', scale: ['irónico', 'respetuoso', 'técnico', 'temeroso'], answer: 0 },
      { frag: '¿Qué más se le puede pedir a una vía?', scale: ['sarcástico', 'curioso', 'preocupado', 'neutral'], answer: 0 },
      { frag: 'está rodeado de miles de personas que, como usted, están aprovechando al máximo su vida.', scale: ['irónico', 'sincero', 'solemne', 'asustado'], answer: 0 },
    ] }, 'Llamar «sabias» a autoridades que llevan quince años sin hacer la obra es ironía. La pregunta finge admiración por una vía que no funciona. Y nadie aprovecha su vida detenido en un trancón: el autor dice lo contrario de lo que piensa.',
      { hint: 'Compara lo que dice cada frase con los hechos del texto: quince años de estudio, cuarenta minutos quietos, humo.' }),
    play('balanza-argumento', 'La tesis escondida', { doc: TRANCON, ask: 'La tesis real del autor está detrás de la ironía. Pesa estas oraciones frente a ella.', thesis: 'El trancón de la autopista es un problema que las autoridades no han querido resolver.', cards: [
      ['Llevan quince años estudiando la ampliación de la vía.', 0],
      ['Hay quienes pasan más tiempo en el carro que con sus hijos.', 0],
      ['Cada año se venden más carros y la vía sigue midiendo lo mismo.', 0],
      ['La vía se amplió el año pasado y el trancón desapareció.', 1],
      ['En la autopista hay vallas de colchones.', null],
    ] }, 'Los quince años de estudio, el tiempo perdido y los carros que aumentan muestran el problema y la inacción. Si la vía ya se hubiera ampliado y el trancón desaparecido, la tesis sería falsa. La valla del colchón es un detalle cómico.',
      { hint: 'Primero saca la tesis real: lo contrario de lo que dice el «elogio». Luego pesa cada oración.' }),
    play('subraya-prueba', 'La prueba de la ironía', { doc: TRANCON, rounds: [
      { claim: 'El autor se burla de lo mucho que tardan las autoridades en decidir.', p: 4, answer: 1 },
      { claim: 'El autor sabe que el trancón le quita a la gente tiempo con su familia.', p: 3, answer: 1 },
    ] }, 'La burla está en los quince años de estudio que, «es de esperar», durarán quince más. Y el tiempo con la familia aparece en lo que dicen los que se quejan: pasan más tiempo en el carro que con sus hijos.',
      { hint: 'En una columna irónica, la verdad suele estar en lo que el autor pone en boca de otros o en lo que exagera.' }),
    play('palabra-a-la-medida', 'Palabras con doble filo', { doc: TRANCON, rounds: [
      { p: 1, before: 'que nos regala, cada día, hora y media de reflexión ', word: 'obligatoria', after: '.', options: ['que no se puede evitar', 'voluntaria', 'agradable', 'pagada por las empresas de buses'], answer: 0 },
      { p: 4, before: 'Construirla de afán sería, como todo el mundo sabe, un error ', word: 'imperdonable', after: '.', options: ['muy grave', 'pequeño', 'útil', 'frecuente'], answer: 0 },
    ] }, '«Regala» y «obligatoria» chocan: nadie regala algo obligatorio; la ironía está en ese choque. Y llamar «imperdonable» a construir rápido una vía que lleva quince años en estudio es decir lo contrario de lo que se piensa.',
      { hint: 'Busca el choque entre la palabra y lo que la rodea: un regalo obligatorio, un error que sería hacer la obra.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: TRANCON, q: '¿Qué busca el autor al llamar al trancón «una institución que no recibe el reconocimiento que merece»?', options: [
      ['Criticar el trancón con ironía, diciendo lo contrario de lo que piensa.', 0],
      ['Elogiar de verdad el trancón como una tradición de la ciudad.', 2],
      ['Pedir que se construyan trenes rápidos en todas las ciudades del país.', 1],
      ['Contar que los monjes buscan la paciencia en las montañas.', 4],
    ] }, 'A es la ironía: el elogio es una crítica al revés. B dice lo contrario de lo que el autor piensa; C dice de más, porque los trenes rápidos solo se mencionan de otras ciudades; y D toma un detalle de una comparación como si fuera el propósito. Sobra el sello «El texto no lo dice».',
      { hint: 'Antes de sellar, decide si el autor piensa de verdad lo que dice. Lo que exagera es la pista.' }),
    play('signos-que-hablan', 'Signos de la ironía', { doc: TRANCON, rounds: [
      { p: 2, text: '|¿|Qué más se le puede pedir a una vía?', options: ['abre una pregunta retórica que no espera respuesta', 'abre una duda real del autor', 'cita a un conductor', 'marca una exclamación'], answer: 0 },
      { p: 4, text: 'Las autoridades|,| sabias como siempre, han decidido', options: ['abre un inciso irónico sobre las autoridades', 'separa los elementos de una lista', 'anuncia un ejemplo', 'marca el final de una cita'], answer: 0 },
    ] }, 'La pregunta no espera respuesta: finge admiración. Y entre las comas va el inciso «sabias como siempre», que en este contexto quiere decir lo contrario.',
      { hint: 'Pregúntate si el autor espera que alguien le responda, y qué va entre las dos comas.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const ABUELO = {
    id: 'lec-abuelo-rio', title: 'Mi abuelo y el río',
    paras: [
      'Mi abuelo tenía las manos como raíces: anchas, torcidas y llenas de tierra aunque se las lavara. Decía que el río Cauca era un señor de mal genio que no avisaba antes de crecer, y que había que hablarle con respeto.',
      'Cuando construyeron la represa, un funcionario vino a explicarnos que el río ahora sería «más ordenado». Mi abuelo lo escuchó con atención y le dio las gracias: «Qué bueno, doctor. A ver si ahora los peces también aprenden a hacer fila».',
      'El folleto que repartió la empresa ese mismo día prometía «un río al servicio del progreso» y traía una foto del embalse al atardecer, con dos garzas muy bien ubicadas. Explicaba, con la seriedad de un manual de instrucciones, que el caudal sería «estable» todo el año y que los pescadores podrían aprovechar los cursos de turismo que se dictarían en la cabecera municipal, a dos horas en chiva.',
      'Ese año pescó tan poco que, según él, los pescados venían a contarle chistes de lo vacía que estaba la canoa. Mi abuela, que no perdía ocasión, le decía que por lo menos ahora llegaba temprano a almorzar. Él se reía, pero se quedaba mirando el agua quieta como quien espera una visita que no llega.',
      'Hoy el embalse sale en las postales del departamento, y los turistas se toman fotos en el mirador con las garzas de verdad, que son menos puntuales que las del folleto. Mi abuelo no volvió a hablarle al río; decía que ya no tenía con quién discutir. Yo voy de vez en cuando y le hablo por él, con el respeto que me enseñó, aunque no sé si este río nuevo todavía entiende.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: ABUELO, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-figurado', 'Evaluación · Lenguaje figurado', [
    ['pu-lf-1', 'La comparación une dos cosas con «como»; la metáfora las identifica sin «como».',
      Q('La expresión «las manos como raíces» es:', ['una ironía', 'una hipérbole', 'una comparación', 'una personificación'], 2,
        'Une las manos y las raíces con «como»: es una comparación.',
        '¿Hay alguna palabra que una las dos cosas?')],
    ['pu-lf-1', 'La personificación da rasgos humanos a lo que no es humano.',
      Q('Decir que el río «era un señor de mal genio» es una figura que:', ['exagera el tamaño del río', 'le da rasgos humanos al río', 'dice lo contrario de lo que se piensa', 'compara el río con una raíz'], 1,
        'Tener mal genio y no avisar son rasgos de una persona: el río está personificado.',
        'Pregúntate quién puede tener mal genio.')],
    ['pu-lf-1', 'Una hipérbole exagera para decir algo con fuerza; se lee por su sentido.',
      Q('La frase «los pescados venían a contarle chistes de lo vacía que estaba la canoa» quiere decir que:', ['los peces hablaban', 'la canoa estaba rota', 'el abuelo contaba chistes', 'pescó muy poco'], 3,
        'La exageración humorística dice que la canoa estaba casi vacía: pescó muy poco ese año.',
        'No la leas al pie de la letra: ¿qué quiere mostrar la exageración?')],
    ['pu-lf-1', 'Una personificación les da rasgos humanos a las cosas; también puede mostrar el cariño del narrador.',
      Q('En «no sé si este río nuevo todavía entiende» (párrafo 5), el narrador:', ['sigue tratando al río como a una persona, igual que su abuelo', 'cree que el embalse ya no tiene agua suficiente para los peces', 'compara el río de antes con una canoa vacía y quieta', 'se burla con cariño de la costumbre de su abuelo de hablarle al río'], 0,
        'Dice que el río «entiende» y que le habla con respeto, como su abuelo: es una personificación que continúa la del párrafo 1. No se burla: hace lo mismo que él.',
        'Pregúntate quién puede «entender», y qué hace el narrador cuando va al río.')],
    ['pu-lf-2', 'La ironía sutil no contradice un hecho: se nota en un detalle que sobra o en un tono solemne para algo pequeño.',
      Q('La frase «con dos garzas muy bien ubicadas» (párrafo 3) sugiere que el narrador:', ['desconfía de una foto demasiado arreglada para vender la represa', 'admira lo bien tomada que quedó la foto del folleto de la empresa', 'sabe mucho de las aves que viven cerca del embalse', 'cree que las garzas volvieron al río gracias a la nueva represa'], 0,
        'Nadie dice que la foto sea falsa, pero «muy bien ubicadas» toma distancia: las garzas parecen puestas para la foto. Es una ironía sutil, de registro, que el párrafo 5 confirma con las garzas «menos puntuales que las del folleto».',
        'Si solo quisiera describir la foto, ¿haría falta decir que las garzas estaban «muy bien ubicadas»?')],
    ['pu-lf-2', 'Un dato puesto al final, sin comentario, también puede ser irónico.',
      Q('Los cursos de turismo «en la cabecera municipal, a dos horas en chiva» muestran que el narrador piensa que:', ['la oferta de la empresa estaba lejos de servirles a los pescadores', 'los pescadores debían aprender turismo para no quedarse sin oficio', 'la chiva era el mejor transporte para llegar a la cabecera', 'la empresa se preocupó de verdad por el futuro de los pescadores'], 0,
        'No dice que los cursos sean inútiles: lo deja ver con el dato del final, dos horas en chiva para quien vivía de pescar en el río. Esa distancia es la ironía.',
        'Fíjate en el dato que el narrador agrega después de la coma. ¿Por qué lo pondría?')],
    ['pu-lf-2', 'La ironía dice lo contrario de lo que se piensa; los hechos la delatan.',
      Q('Cuando el abuelo dice «Qué bueno, doctor», su intención es:', ['agradecer de corazón la explicación del funcionario', 'burlarse con ironía de la promesa del funcionario', 'pedir un favor para la familia de pescadores', 'felicitar al funcionario por la obra terminada'], 1,
        'Enseguida dice que los peces tendrán que «hacer fila»: se burla de la idea de un río «ordenado».',
        'Lee lo que el abuelo dice justo después del «Qué bueno».')],
    ['pu-lf-2', 'Las comillas pueden marcar distancia frente a la palabra de otro.',
      Q('Las comillas en «más ordenado» indican que el narrador:', ['toma distancia de la palabra del funcionario', 'cita una frase que repetía siempre su abuelo', 'marca el título oficial del proyecto de la represa', 'destaca una palabra técnica que no conocía'], 0,
        'Son las palabras del funcionario, y el narrador las cita con distancia, porque el resultado fue que el abuelo casi no pescó.',
        'Pregúntate de quién son esas palabras y si el narrador está de acuerdo con ellas.')],
    ['pu-lf-2', 'La ironía se reconoce cuando lo que se dice choca con lo que pasa.',
      Q('Lo que delata la ironía del abuelo es que:', ['el funcionario era doctor y sabía mucho de ríos y represas', 'el río era tan grande que nadie podía ordenarlo de verdad', 'los peces no pueden hacer fila, y después casi no pescó', 'el abuelo era amable con todos los que venían a la vereda'], 2,
        'La imagen absurda de los peces en fila y la pesca que se acabó muestran que el «Qué bueno» no era sincero.',
        'Busca el hecho que contradice el agradecimiento del abuelo.')],
  ]);
});
