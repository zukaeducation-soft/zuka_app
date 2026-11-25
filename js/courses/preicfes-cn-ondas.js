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
      ...F(['Las telas absorben el sonido.', 0, 'Léela junto a la sala de cortinas.'], ['Una pared lisa y dura da más eco que una cortina.', 1, '¿Qué hacen las telas con el sonido?'], ['Si el eco volviera en un segundo, el cerro estaría a 170 metros.', 1, 'Usa la misma cuenta del párrafo 3.'], ['El cerro está cubierto de pinos.', 2, '¿Se dice qué tiene?']),
      luz: [[3, 'las telas lo absorben'], [3, 'a la mitad de los 680 metros']], bien: 'Comparar y calcular.' },
      'Las telas están escritas; la pared y los 170 m se deducen; los pinos no aparecen.', 'Haz la cuenta de ida y vuelta con otro tiempo.'),
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
    ['icf-cn-ondas-1', 'Con la misma rapidez, más frecuencia es menos longitud.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El aire devuelve casi todo el ultrasonido.', 0], ['Con más frecuencia, la longitud de onda es menor.', 1], ['Para ver hondo conviene una frecuencia menor.', 1], ['El gel es de color azul.', 2]] }, 'Lo del aire está escrito; la longitud y la hondura se deducen; el color no aparece.', 'Une la rapidez fija con la frecuencia.')],
    ['icf-cn-ondas-1', 'No oímos por encima de unos 20 000 Hz.', opc('El paciente no oye los pulsos de la ecografía porque:', ['Son muy suaves', 'Su frecuencia es mayor que la que oímos', 'Son electromagnéticos', 'No hay gel'], 1, 'Son millones de hertz; oímos hasta unos 20 000.', 'Compara la frecuencia del aparato con la que oímos.')],
    ['icf-cn-ondas-2', 'El tiempo del eco da la distancia.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se halla una distancia con el tiempo que tarda un eco.', cards: [['El murciélago que encuentra un insecto', true], ['El barco que mide la profundidad', true], ['La linterna que alumbra un cuarto', false], ['El termómetro que marca la fiebre', false]] }, 'El murciélago y el barco usan ecos; la linterna y el termómetro, no.', 'Busca casos en que algo va, rebota y vuelve.')],
    ['icf-cn-ondas-2', 'En cada cambio de medio, una parte se refleja.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del ultrasonido se dice todo esto, EXCEPTO:', cards: [['Una parte se refleja y otra sigue', [2]], ['El aire lo devuelve casi todo', [3]], ['Se absorbe más con más frecuencia', [4]], ['Viaja en el vacío', null]] }, 'Las tres primeras están en el 2, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-ondas-2', 'El eco va y vuelve.', opc('Un pulso viaja a 1 500 m/s dentro del cuerpo y su eco vuelve en 0.0001 s. La superficie que lo reflejó está a:', ['15 cm', '30 cm', '7.5 cm', '1.5 cm'], 2, 'Recorre 0.15 m en ida y vuelta: 7.5 cm.', 'Halla lo que recorre en total y pártelo en dos.')],
  ]);
})());
