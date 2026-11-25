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
