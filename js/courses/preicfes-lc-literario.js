// Preicfes · Lectura Crítica · mundo 4 «Textos Literarios» (spec 2026-11-25-preicfes-estructura). Cuentos y versos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const RELOJ = {
    id: 'icf-relojero', title: 'El relojero que atrasaba',
    ficha: { autor: 'Cuento de Mariela Quintana', fuente: 'Libro «Oficios de pueblo»', fecha: 'Primera edición, 2026' },
    paras: [
      'En el pueblo todos sabían que don Aurelio atrasaba los relojes. Uno le llevaba el suyo para que le cambiara la correa y, a la semana, descubría que había perdido cuatro minutos. Nadie se quejaba. Cobraba poco, hablaba menos, trabajaba todos los días del año, y el que necesitaba la hora exacta miraba la torre de la iglesia, que él mismo cuidaba.',
      'Yo tenía once años y barría su taller los sábados. Creía que se equivocaba por viejo. Una tarde lo vi abrir el reloj de la señora Dominga, que iba perfecto, y correrle la aguja hacia atrás con una pinza. Se dio cuenta de que lo miraba. No se puso rojo. Solo dijo: «Pásame el trapo».',
      'Desde entonces llevé la cuenta. Al boticario le quitó tres minutos; al alcalde, diez. A mi papá, que siempre andaba corriendo, le quitó un cuarto de hora, y en la casa notamos que se quedaba a terminar el café. A la señora Dominga, que esperaba cada tarde una carta de su hijo, le quitaba dos minutos cada mes, como quien no quiere la cosa.',
      'Me demoré años en preguntarle. Él tenía ya las manos torpes y yo le sostenía las piezas. «La gente viene porque siente que el tiempo se le va», me dijo. «Yo no sé devolverlo. Pero puedo hacer que llegue un poquito después.» Luego se quedó mirando la lupa, como si se hubiera gastado todas las palabras del año.',
      'El día de su entierro, la torre dio las cuatro. Vi a la gente levantar la muñeca para comprobar la hora y quedarse quieta, confundida: en cada reloj faltaba algo. Entonces la señora Dominga se rio. Después el boticario. Nos fuimos contagiando, al lado de la fosa, sin saber bien de qué nos reíamos, hasta que la campana calló.',
      'Yo heredé la pinza. No arreglo relojes: soy maestra. Pero los viernes, cuando faltan cuatro minutos para la salida y los niños están callados leyendo, me subo en la silla y, despacio, corro hacia atrás la aguja del salón.',
    ],
  };
  const l1 = leccion('icf-lc-literario-1', 'Narrador y personajes', guion(
    ['¿Quién cuenta?', 'Un narrador en primera persona participa o mira: «yo barría». Uno en tercera cuenta desde afuera: «él barría».'],
    ['El autor no es el narrador', 'Quien firma el libro inventa la voz que cuenta.'],
    ['Conocer por lo que hacen', 'Un personaje se conoce por sus actos: correr una aguja puede ser un acto de cariño.'],
    ['El cambio', 'Al final, algo o alguien ya no es como al comienzo.']), [
    x('mapa-margen', 'Lleva al margen qué pasa en cada parte. Sobra una nota.', { doc: RELOJ,
      ...F(['presenta al personaje y su rareza', 0, 'Busca lo que «todos sabían».'], ['la niña descubre que es a propósito', 1, 'Busca la pinza y el trapo.'], ['lleva la cuenta de los minutos', 2, 'Busca a quién le quitó cuánto.'], ['él explica su razón', 3, 'Busca la pregunta que tardó años.'], ['la despedida y la risa', 4, 'Busca la campana.'], ['ella continúa el gesto', 5, 'Busca qué heredó.'], ['el relojero pierde su taller', null, 'Nadie le quita el taller.']),
      luz: [[1, 'todos sabían'], [2, 'correrle la aguja'], [3, 'llevé la cuenta'], [4, 'Yo no sé devolverlo'], [5, 'El día de su entierro'], [6, 'Yo heredé la pinza']], bien: 'Rareza, descubrimiento, cuenta, razón, despedida y herencia.' },
      'El cuento va de la rareza a su secreto, de ahí a la razón y termina con quien hereda el gesto.', 'Di qué pasa en cada párrafo, no solo a quién nombra.'),
    x('genero-o-cita', '¿Lo **vivió o vio** la narradora, o lo **supone**?', { doc: RELOJ, rot: ['lo vivió o vio', 'lo supone'],
      ...F(['Barría el taller los sábados', 0, '¿Lo hizo ella misma?'], ['Se equivocaba por viejo', 1, '¿Lo comprobó o lo creía?'], ['Él corrió la aguja con una pinza', 0, '¿Lo presenció?'], ['Parecía haber gastado todas sus palabras', 1, '¿Es un hecho o lo que le parece?']), bien: '«Creía» y «como si» marcan lo supuesto.' },
      'Barrer y ver la pinza son hechos vividos; «creía» y «como si» muestran lo que ella supone.', 'Busca verbos como «creía» o expresiones como «como si».'),
    x('linea-vida', 'Lleva cada hecho al momento de la vida de la narradora.', { doc: RELOJ, rot: ['a los once años', 'de joven', 'ahora'],
      ...F(['Cree que él se equivoca por viejo', 0, '¿Qué edad tenía cuando lo creía?'], ['Le sostiene las piezas y pregunta', 1, 'Busca «me demoré años».'], ['Corre la aguja del salón', 2, 'Busca a qué se dedica.'], ['Lo ve correr la aguja de Dominga', 0, '¿Cuándo barría el taller?']), luz: [[2, 'once años'], [4, 'Me demoré años'], [6, 'soy maestra']], bien: 'Niña, joven y maestra.' },
      'A los once descubre, de joven pregunta y como maestra repite el gesto.', 'Busca edades y palabras como «años» o «ahora».'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: RELOJ, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Al alcalde le quitó diez minutos.', 0, 'Léela junto a la cuenta del párrafo 3.'], ['El padre empezó a vivir con menos prisa.', 1, '¿Qué notaron en la casa?'], ['En el entierro la gente notó que sus relojes iban atrasados.', 1, '¿Qué comparó la gente cuando sonó la torre?'], ['El hijo de Dominga nunca volvió.', 2, '¿Se dice qué pasó con él?']),
      luz: [[3, 'al alcalde, diez'], [3, 'se quedaba a terminar el café'], [5, 'en cada reloj faltaba algo']], bien: 'El café y los relojes dicen sin decir.' },
      'Los diez minutos están escritos; la calma del padre y el descubrimiento se deducen; del hijo no se sabe más.', 'Mira qué hace la gente: los gestos hablan.'),
    x('pista-tipo', 'Ata cada rasgo de don Aurelio a lo que lo muestra.', { doc: RELOJ, lineas: ['Cobraba poco y hablaba menos.', 'No se puso rojo: «Pásame el trapo».', 'A Dominga le quitaba dos minutos cada mes.', 'Trabajaba todos los días del año.'],
      ...T(['callado', 0, 'Busca la que habla de hablar.'], ['sin vergüenza de lo que hace', 1, 'Busca lo que hizo al ser descubierto.'], ['cuidadoso con quien espera', 2, 'Busca a quien aguarda una carta.'], ['constante', 3, 'Busca la que muestra que no descansaba.']), bien: 'Se conoce por lo que hace.' },
      'Sus gestos lo muestran: calla, no se avergüenza, cuida a quien espera y sigue trabajando.', 'Pregunta qué diría de una persona cada acto.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: RELOJ, texto: '|Don Aurelio| no sabe devolver |el tiempo| a |la gente|. Él puede, eso sí, hacer que lo sienta llegar un poquito después.',
      ...T(['«Él»', 0, 'Pon en su lugar lo que ataste: ¿quién puede hacer algo?'], ['«lo»', 1, 'Pon en su lugar lo que ataste: ¿qué llega después?']), bien: 'El relojero y el tiempo.' },
      '«Él» es don Aurelio; lo que llega un poquito después es el tiempo.', 'Comprueba quién actúa y qué es lo que llega.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que dice **qué puede hacer** él por la gente.', { doc: RELOJ, nums: [4], apuesta: 'No devuelve el tiempo, pero lo demora.', ...S(['4.4'], { '4.0': 'Cuenta cuándo se atrevió ella a preguntar.', '4.1': 'Cuenta cómo estaban sus manos.', '4.2': 'Dice por qué viene la gente.', '4.3': 'Dice lo que no sabe hacer.', '4.5': 'Cuenta cómo se quedó callado.' }), bien: '«Pero puedo» abre su razón.' },
      'Después de «Yo no sé devolverlo», «Pero puedo» dice lo que sí hace: que llegue un poquito después.', 'Busca la oración que empieza con un contraste.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: RELOJ, lineas: ['Un relojero atrasa los relojes a propósito.', 'Cambiaba correas.', 'Una niña lo descubre.', 'Él quiere que el tiempo llegue después.', 'La torre da las cuatro.', 'Ella, ya maestra, repite el gesto.'], ...S([1, 4], { 0: 'Es la rareza que mueve el cuento.', 2: 'Es quien cuenta y descubre.', 3: 'Es la razón del personaje.', 5: 'Es el final de la historia.' }), bien: 'Rareza, descubrimiento, razón y final.' },
      'Las correas y la torre ambientan; las demás son el hilo del cuento.', 'Quita cada oración y mira si la historia se entiende.'),
  ]);

  const RIO = {
    id: 'icf-canoa', title: 'La canoa de los que no volvieron',
    ficha: { autor: 'Relato de Ramiro Palacios', fuente: 'Antología de cuentos del Pacífico', fecha: 'Segunda edición, 2026' },
    paras: [
      'El río era un viejo que hablaba dormido. Eso decía mi abuela, y cuando la corriente rezongaba contra las piedras nos mandaba callar: «Déjenlo, que está contando». Nosotros nos reíamos. Pero de noche, con la casa a oscuras y el agua diciendo cosas debajo del piso, ninguno se reía.',
      'Mi abuela tenía una canoa amarrada al muelle que nadie usaba y que nadie se atrevía a pedir prestada. Estaba pintada de azul, llevaba siempre un remo y, cada viernes, ella le ponía adentro una hogaza y una vela apagada. Era la canoa de los que no volvieron. No había una tumba para mi abuelo ni para los otros siete; había esa cáscara azul, esperando como un perro a la puerta de una tienda.',
      'Un año llovieron mil noches en una. El río se tragó la cancha, el corral y la mitad de la escuela. Los hombres gritaban órdenes que el agua borraba antes de que llegaran. Alguien dijo que había que soltar la canoa, porque golpeaba contra el muelle y lo iba a arrancar. Mi abuela no contestó. Se metió al agua hasta la cintura, con su vestido flotando alrededor como una flor oscura, y la desamarró ella misma.',
      'Yo creí que iba a llorar. Le pasó la mano por el borde, como se despide a un hijo que viaja, y encendió la vela. Es mentira que una vela pueda arder bajo semejante aguacero; yo la vi arder. La canoa dio una vuelta, buscó la corriente y se fue, alumbrando poquito, hasta que dobló la curva.',
      'A los tres días, río abajo, la encontró una familia que llevaba dos noches subida en un techo. En ella salieron los cinco. Nos la devolvieron en agosto, despintada y con olor a barro, con un banco nuevo que el papá le había clavado en agradecimiento.',
      'Mi abuela la amarró en el mismo sitio. El viernes puso la hogaza, pero no puso la vela. «Ya volvieron», dijo. Esa noche el río habló como siempre, y por primera vez me pareció que no contaba, sino que escuchaba.',
    ],
  };
  const l2 = leccion('icf-lc-literario-2', 'Figuras y sentido', guion(
    ['Personificación', 'Dar a una cosa rasgos de persona: «el río hablaba dormido».'],
    ['Símil y metáfora', 'El símil compara con «como»; la metáfora dice que una cosa es otra.'],
    ['Hipérbole', 'Exagera para que se sienta: «llovieron mil noches en una».'],
    ['Símbolo', 'Un objeto que carga con algo más: la canoa, los que no volvieron.']), [
    x('pinta-tipos', 'Pinta cada frase con la figura que usa.', { doc: RIO, plumas: ['personificación', 'símil', 'hipérbole'],
      ...P(['El río hablaba dormido.', 0, '¿Da rasgos de persona, compara con «como» o exagera?'], ['Esperando como un perro a la puerta.', 1, '¿Da rasgos de persona, compara con «como» o exagera?'], ['Llovieron mil noches en una.', 2, '¿Da rasgos de persona, compara con «como» o exagera?'], ['Su vestido flotaba como una flor oscura.', 1, '¿Da rasgos de persona, compara con «como» o exagera?'], ['El río se tragó la cancha.', 0, '¿Da rasgos de ser vivo, compara con «como» o exagera?']), bien: 'Hablar y tragar, «como» y exagerar.' },
      'Hablar y tragar son de seres vivos, «como» introduce un símil y mil noches en una exagera.', 'Busca primero la palabra «como»; después, acciones de persona o exageraciones.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que muestra que el narrador **siente distinto** al río.', { doc: RIO, nums: [6], apuesta: 'El río ya no cuenta: escucha.', ...S(['6.3'], { '6.0': 'Cuenta dónde quedó la canoa.', '6.1': 'Cuenta qué puso la abuela y qué no.', '6.2': 'Dice por qué no puso la vela.' }), bien: 'El cierre vuelve al comienzo del cuento.' },
      'Al comienzo el río «está contando»; en la última oración «no contaba, sino que escuchaba».', 'Busca la oración que recuerda lo que decía la abuela al principio.'),
    x('voz-de-la-fuente', 'Ata cada objeto a lo que representa en el cuento.', { ayuda: 'Tira un hilo desde cada significado hasta su objeto.', doc: RIO, portadas: [['La canoa', 'objeto'], ['La vela encendida', 'objeto'], ['El banco nuevo', 'objeto'], ['El río', 'elemento']],
      ...T(['los que no volvieron', 0, '¿Qué cosa ocupa el lugar de una tumba?'], ['la despedida', 1, '¿Qué se enciende al soltar la canoa?'], ['la gratitud', 2, '¿Qué clavó el papá de la familia?'], ['la memoria que habla', 3, '¿Qué cuenta cosas de noche?']), bien: 'Objetos que cargan sentido.' },
      'La canoa guarda a los ausentes, la vela despide, el banco agradece y el río cuenta.', 'Pregunta qué siente la gente con cada objeto.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo, sin la imagen. Sobran dos.', { doc: RIO, frases: [[1, 'cuando la corriente ', 'rezongaba', ' contra las piedras'], [3, 'órdenes que el agua ', 'borraba', ' antes de que llegaran'], [5, 'En ella ', 'salieron', ' los cinco']],
      ...F(['sonaba ronca', 0, '¿Qué ruido hace el agua en las piedras?'], ['tapaba con su ruido', 1, '¿Qué les pasa a los gritos con tanta agua?'], ['se salvaron', 2, '¿Qué les pasó a los que estaban en el techo?'], ['escribía', null, 'El agua no deja nada por escrito.'], ['se ahogaron', null, 'Es lo contrario de lo que ocurrió.']), bien: 'Lo literal detrás de la imagen.' },
      'Rezongar es sonar ronco, borrar las órdenes es taparlas y salir de allí es salvarse.', 'Piensa qué pasó de verdad en cada escena.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: RIO, nums: [2, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La canoa estaba pintada de azul.', 0, 'Léela junto a la descripción de la canoa.'], ['El abuelo se perdió en el río.', 1, '¿Qué significa que no haya tumba y sí una canoa?'], ['La abuela cerró su duelo.', 1, '¿Por qué ya no puso la vela?'], ['El abuelo era pescador de camarones.', 2, '¿Se dice qué pescaba?']),
      luz: [[2, 'pintada de azul'], [2, 'No había una tumba'], [6, 'Ya volvieron']], bien: 'El duelo se cierra sin nombrarlo.' },
      'El color está escrito; la pérdida y el cierre del duelo se deducen; el oficio exacto no aparece.', 'Junta un objeto con lo que la abuela hace con él.'),
    x('genero-o-cita', '¿La frase va en sentido **literal** o **figurado**?', { doc: RIO, rot: ['literal', 'figurado'],
      ...F(['Llevaba dos noches subida en un techo', 0, '¿Pudo pasar tal como se dice?'], ['El río era un viejo', 1, '¿Pudo pasar tal como se dice?'], ['Le clavó un banco nuevo', 0, '¿Pudo pasar tal como se dice?'], ['Las órdenes se borraban', 1, '¿Pudo pasar tal como se dice?'], ['Se metió al agua hasta la cintura', 0, '¿Pudo pasar tal como se dice?']), bien: 'Si no puede pasar tal cual, es figurado.' },
      'El techo, el banco y el agua a la cintura ocurrieron; el río viejo y las órdenes borradas son imágenes.', 'Pregunta si una cámara lo habría grabado así.'),
    x('pasos-del-proceso', 'Ordena el viaje de la canoa. El primer paso está en su puesto.', { doc: RIO, que: 'el viaje', de: 'La canoa azul', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Espera amarrada en el muelle.', 'Golpea el muelle en la creciente.', 'La abuela la suelta con la vela.', 'Salva a una familia.', 'Vuelve despintada en agosto.'], mira: ['', 'Es lo que hace pedir que la suelten.', 'La suelta porque está dañando el muelle.', 'Pasa río abajo, después de soltarla.', 'La devuelven quienes la encontraron.'], bien: 'Esperar, golpear, soltar, salvar y volver.' },
      'Espera, la creciente la hace golpear, la sueltan, salva y regresa.', 'Sigue el orden de las aguas: antes, durante y después.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: RIO, lineas: ['Una abuela guarda una canoa por los que no volvieron.', 'La canoa es azul.', 'En una creciente debe soltarla.', 'La canoa salva a una familia.', 'El banco tiene clavos.', 'La abuela siente que ya volvieron.'], ...S([1, 4], { 0: 'Es el símbolo del cuento.', 2: 'Es el conflicto.', 3: 'Es lo que cambia todo.', 5: 'Es el final de la historia.' }), bien: 'Símbolo, conflicto, giro y final.' },
      'El color y los clavos son detalles; lo demás es el hilo del cuento.', 'Deja lo que hace falta para entender «ya volvieron».'),
  ]);

  const CANTO = {
    id: 'icf-barrendera', title: 'Canto de la que barre la plaza',
    ficha: { autor: 'Poema de Jacinta Mora', fuente: 'Libro «Oficios del alba»', fecha: 'Tercera edición, 2026' },
    paras: [
      'A las cuatro, cuando la ciudad es un animal que ronca, yo salgo con mi escoba a peinarle la espalda. Tengo un río de hojas, tengo un mar de papeles, tengo una luna vieja que me alumbra a medias. Nadie me ve llegar. Solo el perro sin dueño, que también trabaja de noche y no cobra, me saluda con la cola y camina a mi lado hasta la fuente.',
      'Barro el beso que anoche se cayó de una banca. Barro el boleto roto del que perdió su tren. Barro la flor que un hombre compró para una puerta que no se abrió. Barro, y lo que barro pesa. La gente cree que la basura son cáscaras; yo digo que son cartas que nadie terminó, y que mi recogedor las lee antes de que el camión se las lleve.',
      'Mi madre barrió esta plaza y la suya también. Me dejaron la escoba y un secreto: no se barre hacia afuera, se barre hacia el centro, como quien junta a los hijos para contarles algo. Por eso a las seis, en medio de la plaza, tengo un montón pequeño que parece un nido. Me siento junto a él. Respiro. Y por un minuto la ciudad es mía, limpia y callada como una iglesia sin misa.',
      'Después llegan ellos. Llegan los zapatos con prisa, los carros con hambre, las palomas con su burocracia. El primer cigarrillo cae, siempre, a las seis y diez. No me enojo. Si la plaza amaneciera limpia para siempre, ¿quién sabría que existo? Mi oficio es como el de la luna: se borra cada día y cada noche vuelve a comenzar.',
      'Un niño me preguntó si no me cansaba de barrer lo mismo. Le dije que nunca es lo mismo: que hoy había una pluma azul, ayer un botón, mañana quién sabe. Le di el botón. Se lo puso en el ojo como un monóculo y miró la plaza entera por el hueco. «Está linda», dijo. Y yo, que no lloro, barrí un rato el mismo sitio.',
      'Cuando me muera, no me hagan estatua. Las estatuas no barren y las palomas no las respetan. Que alguien, a las cuatro, junte las hojas hacia el centro. Que se siente. Que respire. Y si un perro sin dueño se le acuesta al lado, sabrá que estoy ahí, peinándole la espalda a la ciudad dormida.',
    ],
  };
  const l3 = leccion('icf-lc-literario-3', 'Poemas y canciones', guion(
    ['La voz poética', 'En un poema habla una voz, que no es el poeta: aquí, una barrendera.'],
    ['Repetir para decir', 'Repetir «barro» al comienzo de las frases da ritmo y peso: es una anáfora.'],
    ['Imágenes', 'Una imagen hace ver o sentir: «la ciudad es un animal que ronca».'],
    ['El tema y el tono', 'El tema es de qué habla en el fondo; el tono, con qué sentimiento.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada estrofa. Sobra una nota.', { doc: CANTO,
      ...F(['la salida de madrugada', 0, 'Busca la hora y el perro.'], ['lo que de verdad barre', 1, 'Busca lo que se repite al empezar.'], ['el secreto heredado', 2, 'Busca a la madre.'], ['la llegada de los demás', 3, 'Busca los zapatos y los carros.'], ['el encuentro con un niño', 4, 'Busca el botón.'], ['lo que pide para después', 5, 'Busca «Cuando me muera».'], ['su jubilación', null, 'Nadie habla de jubilarse.']),
      luz: [[1, 'A las cuatro'], [2, 'Barro el beso'], [3, 'un secreto'], [4, 'Después llegan ellos'], [5, 'Un niño'], [6, 'Cuando me muera']], bien: 'Salir, barrer, heredar, recibir, encontrar y pedir.' },
      'El poema sigue un día de trabajo y termina con una petición para después de la vida.', 'Busca la imagen principal de cada estrofa.'),
    x('pinta-tipos', 'Pinta cada frase con el recurso que usa.', { doc: CANTO, plumas: ['metáfora', 'símil', 'repetición'],
      ...P(['La ciudad es un animal que ronca.', 0, '¿Dice que una cosa es otra, compara con «como» o repite?'], ['Como quien junta a los hijos.', 1, '¿Dice que una cosa es otra, compara con «como» o repite?'], ['Barro el beso. Barro el boleto. Barro la flor.', 2, '¿Dice que una cosa es otra, compara con «como» o repite?'], ['Callada como una iglesia sin misa.', 1, '¿Dice que una cosa es otra, compara con «como» o repite?'], ['Son cartas que nadie terminó.', 0, '¿Dice que una cosa es otra, compara con «como» o repite?']), bien: 'Es, como y otra vez.' },
      '«Es» y «son» identifican, «como» compara y «Barro… Barro…» repite.', 'Busca «es», «como» o una palabra que vuelve.'),
    x('genero-o-cita', '¿Se barre algo **material** o algo que **representa** una historia?', { doc: CANTO, rot: ['cosa material', 'historia o sentimiento'],
      ...F(['Hojas secas', 0, '¿Se puede echar en una bolsa?'], ['El beso que se cayó de una banca', 1, '¿Se puede echar en una bolsa?'], ['Cáscaras', 0, '¿Se puede echar en una bolsa?'], ['La espera de una puerta que no se abrió', 1, '¿Se puede echar en una bolsa?'], ['Un botón', 0, '¿Se puede echar en una bolsa?']), bien: 'La basura cuenta historias.' },
      'Hojas, cáscaras y botón son cosas; el beso y la espera son lo que la voz imagina en ellas.', 'Pregunta si eso se puede tocar y cabe en el recogedor.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CANTO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Su madre también barrió la plaza.', 0, 'Léela junto al comienzo de la estrofa 3.'], ['La frase del niño la conmovió.', 1, '¿Por qué barre un rato el mismo sitio?'], ['Le enorgullece su oficio.', 1, '¿Cómo habla de su secreto y de su minuto?'], ['El niño es su nieto.', 2, '¿Se dice quién es el niño?']),
      luz: [[3, 'Mi madre barrió esta plaza'], [5, 'barrí un rato el mismo sitio']], bien: 'Barrer el mismo sitio es llorar sin decirlo.' },
      'Lo de la madre está escrito; la emoción y el orgullo se deducen; el parentesco no.', 'Mira lo que hace la voz después de oír al niño.'),
    x('talla-idea', 'Tres interpretaciones de la estrofa 4: pon cada una en su talla.', { doc: CANTO, p: 4, rot: ['se queda en un detalle', 'justa', 'dice de más'],
      ...F(['El primer cigarrillo cae a las seis y diez.', 0, 'Es cierto, pero ¿qué quiere decir con eso?'], ['Que su trabajo se deshaga cada día también le da sentido.', 1, 'Compárala con la pregunta y con la luna.'], ['Le gustaría que la gente ensuciara más.', 2, '¿Alguna oración pide más basura?']),
      luz: [[4, '¿quién sabría que existo?'], [4, 'cada noche vuelve a comenzar']], bien: 'Como la luna, vuelve a empezar.' },
      'La hora es un detalle; no pide más basura: acepta que su oficio recomienza y que eso la hace existir.', 'La idea justa explica la pregunta y la comparación con la luna.'),
    x('signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: CANTO, texto: 'Me dejaron un secreto|:| no se barre hacia afuera. |«|Está linda», dijo|.| Si amaneciera limpia, |¿|quién sabría que existo?',
      ...T(['anuncia en qué consiste', 0, 'Busca el signo después de «secreto».'], ['trae la voz del niño', 1, 'Busca el signo antes de lo que él dijo.'], ['abre una pregunta sin respuesta', 3, 'Busca dónde la voz se pregunta algo.']), bien: 'Anunciar, citar y preguntar.' },
      'Los dos puntos anuncian el secreto, las comillas traen al niño y la interrogación abre una pregunta retórica.', 'Mira qué viene justo después de cada signo.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: CANTO, texto: '|Un niño| tomó |el botón| y miró |la plaza|. Se lo puso en el ojo y dijo que estaba linda, y ella le pareció nueva.',
      ...T(['«lo»', 1, 'Pon en su lugar lo que ataste: ¿qué se puso en el ojo?'], ['«ella»', 2, 'Pon en su lugar lo que ataste: ¿qué le pareció nueva?']), bien: 'El botón y la plaza.' },
      'Lo que cabe en el ojo es el botón; lo que le pareció nueva es la plaza.', 'Comprueba género y sentido en la oración.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran.', { doc: CANTO, lineas: ['Una barrendera canta su oficio de madrugada.', 'La pluma era azul.', 'Dice que barre historias, no solo basura.', 'Heredó un secreto: juntar hacia el centro.', 'Las palomas llegan con los demás.', 'Pide que alguien siga su gesto.'], ...S([1, 4], { 0: 'Es la voz y su situación.', 2: 'Es la imagen central.', 3: 'Es lo que le da sentido a su oficio.', 5: 'Es el cierre.' }), bien: 'Voz, imagen, herencia y petición.' },
      'La pluma y las palomas son detalles; lo demás es el sentido del poema.', 'Deja lo que dirías si te preguntan de qué trata.'),
  ]);

  const MUDANZA = {
    id: 'icf-mudanza', title: 'Inventario',
    paras: [
      'El camión llegó a las siete, cuando la casa todavía olía a sueño. Papá había hecho una lista en un cuaderno cuadriculado: una nevera, dos camas, siete cajas de loza, un televisor que solo obedecía a golpes. Iba tachando a medida que los hombres subían las cosas. Le temblaba un poco el lápiz, pero era por el frío, dijo.',
      'Yo tenía mi propia lista, en la cabeza. La mancha del techo con forma de caballo. El escalón que se quejaba. El clavo donde mamá colgaba el delantal y que nadie, en dos años, se había atrevido a quitar. Esas cosas no cabían en el camión. Las repasé una por una, como quien cuenta ovejas, hasta que me sonó la voz de papá: «¿Ya está todo?».',
      'Le dije que sí. Entonces él caminó hasta la cocina, se quedó frente al clavo y levantó la mano. Pensé que iba a arrancarlo. Colgó la gorra un momento, la volvió a tomar, y apagó la luz aunque ya era de día.',
      'En el camión íbamos los tres apretados: el conductor, papá y yo, con la jaula del canario en las piernas. El canario, que no cantaba desde hacía dos años, empezó a cantar al pasar el puente. El conductor se rio bajito, sin decir nada. Papá miró por la ventana todo el camino, como si la carretera fuera un libro difícil.',
      'La casa nueva era blanca, recta y sin historia. Las paredes daban eco. Mientras bajaban la nevera, papá sacó del bolsillo un martillo pequeño y una cosa envuelta en un pañuelo. Buscó un sitio al lado de la estufa, midió con los dedos, dudó. Después dio tres golpes cortos.',
      'En el cuaderno, debajo del televisor, encontré años después un renglón sin tachar, escrito con otra letra o con la misma letra de otro día: «Un clavo».',
    ],
  };
  const Q = preg(MUDANZA, 'lectura');
  return mundo('icf-lc-literario', 'Textos Literarios', 'lectura', [l1, l2, l3], [
    ['icf-lc-literario-1', 'El narrador en primera persona participa en lo que cuenta.', Q('El narrador del cuento es:', ['El conductor del camión', 'El padre', 'Un hijo o una hija que vivió la mudanza', 'Alguien que no conoció a la familia'], 2, '«Yo tenía mi propia lista»: cuenta en primera persona y llama «papá» al otro personaje.', 'Busca quién dice «yo» y cómo llama al hombre de la lista.')],
    ['icf-lc-literario-1', 'A un personaje se le conoce por sus gestos.', Q('Cuando el padre dice que el lápiz le tiembla por el frío, el lector puede entender que:', ['Está enfermo', 'Quiere ocultar su emoción', 'La nevera estaba abierta', 'No sabe escribir'], 1, 'El gesto y la excusa («dijo») muestran que le cuesta dejar la casa.', 'Fíjate en la palabra «dijo» y en lo que está haciendo.')],
    ['icf-lc-literario-2', 'Un símil compara con «como».', Q('En «como si la carretera fuera un libro difícil», la comparación sugiere que el padre:', ['Está concentrado y le cuesta entender lo que siente', 'Va leyendo un libro', 'No conoce la carretera', 'Está enojado con el conductor'], 0, 'Mira fijo, como quien se esfuerza por leer: está metido en sus pensamientos.', '¿Cómo se mira un libro difícil?')],
    ['icf-lc-literario-2', 'Un símbolo es un objeto que carga con algo más.', Q('El clavo representa en el cuento:', ['El costo de la mudanza', 'La pereza de la familia', 'La fuerza del padre', 'La presencia de la madre, que la familia no quiere perder'], 3, 'Era donde ella colgaba el delantal y nadie se atrevía a quitarlo; el padre lo lleva a la casa nueva.', '¿Quién usaba el clavo y por qué nadie lo quitó?')],
    ['icf-lc-literario-3', 'Lo que se siente en un texto literario casi nunca se nombra.', Q('La frase «La casa nueva era blanca, recta y sin historia» expresa:', ['Alegría por el cambio', 'Que a la casa le faltan recuerdos', 'Que la casa está mal construida', 'Que la casa es más barata'], 1, '«Sin historia» se opone a la casa vieja, llena de marcas y recuerdos.', 'Compárala con la lista que el narrador llevaba en la cabeza.')],
    ['icf-lc-literario-3', 'El título puede tener más de un sentido.', Q('El título «Inventario» se refiere a:', ['Solo a los objetos del camión', 'A un almacén', 'A la lista de las cosas y, también, a lo que no se puede empacar', 'A los pasajeros del camión'], 2, 'Hay dos listas, la del cuaderno y la de la cabeza, y el último renglón las une: «Un clavo».', 'Cuenta cuántas listas hay en el cuento.')],
  ]);
})());
