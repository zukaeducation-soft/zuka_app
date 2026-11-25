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
