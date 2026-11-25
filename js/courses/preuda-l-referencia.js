// Preuniversitario · Comprensión lectora · mundo 11 «Referencia y cohesión» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): un relato de dos guardianes de faro lleno de «este», «aquel», «esto último» y «lo cual»
// (pronombres y referentes) y una crónica del aguacate que nombra lo mismo de muchas maneras y omite verbos con comas
// (sustituciones y elipsis). La evaluación usa un texto sobre un constructor de canoas. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const FAROS = {
    id: 'lec-guardianes-faro', title: 'Los guardianes de la bahía',
    ficha: { autor: 'Relato de una escritora del Caribe', fuente: 'Antología de relatos del mar', fecha: '2024' },
    paras: [
      'En la bahía de Taganga hubo durante años dos guardianes de faro: don Eliécer, que cuidaba el faro del morro, y su sobrino Abel, que vigilaba la boya luminosa de la entrada. Este era joven y confiaba en los aparatos; aquel había aprendido el oficio de memoria y desconfiaba de todo lo que tuviera batería.',
      'Cada noche, don Eliécer subía los ochenta escalones del faro con una linterna, aunque la luz ya se prendía sola desde 1990. Lo hacía por costumbre, decía, pero también porque desde arriba podía ver lo que ningún sensor veía: una lancha sin luces, un pescador que se demoraba demasiado, una nube que anunciaba tormenta. Esto último, según él, no lo enseñaba ningún manual.',
      'Abel, en cambio, revisaba la boya desde su celular. Una aplicación le avisaba si la batería bajaba o si la luz dejaba de parpadear, lo cual le permitía dormir tranquilo. Su tío se burlaba de él: decía que un guardián que duerme no es guardián, sino inquilino. Abel se reía y le mostraba en la pantalla cuántas horas llevaba encendida la boya sin una sola falla.',
      'Una noche de octubre, la aplicación dejó de funcionar porque se cayó la señal de todo el pueblo. Abel no se dio cuenta de que la boya se había apagado: dormía con el celular en la mano, esperando un aviso que nunca llegó. Quien sí lo notó fue don Eliécer, que desde lo alto del morro vio un barco de turistas acercarse a las rocas de la entrada. Bajó como pudo, despertó a su sobrino y entre los dos encendieron a mano una lámpara de emergencia que este había dejado olvidada en el bote.',
      'Al día siguiente, el capitán del barco fue a darles las gracias. Le dijo a Abel que la aplicación era una maravilla, siempre que alguien siguiera mirando el mar. Abel no respondió nada, pero esa noche subió con su tío los ochenta escalones. Desde entonces lo acompaña los jueves, y don Eliécer, a cambio, aprendió a leer los avisos del celular, cosa que nunca pensó que haría.',
    ],
  };

  const AGUACATE = {
    id: 'lec-oro-verde', title: 'El oro verde',
    ficha: { autor: 'Reportaje de una periodista agraria', fuente: 'Revista de un periódico de Antioquia', fecha: 'Julio de 2025' },
    paras: [
      'Hace veinte años, el aguacate hass era casi desconocido en las fincas del oriente antioqueño. Hoy, esta variedad de piel rugosa ocupa miles de hectáreas, y el llamado «oro verde» se exporta a Europa en contenedores refrigerados; cada semana salen de la región decenas de camiones rumbo al puerto. Los productores de papa, muchos de ellos, cambiaron de cultivo; los de leche, unos pocos.',
      'El fruto tiene ventajas claras para el campesino: se vende en dólares, aguanta bien el viaje y los compradores extranjeros pagan por él más que el mercado local. Por eso muchas familias dejaron sus potreros y sembraron árboles; otras, sus huertas de pancoger. En algunas veredas, el paisaje cambió tanto que los mayores dicen no reconocer las lomas donde crecieron. Los jornaleros, en cambio, encontraron trabajo casi todo el año en la recolección.',
      'Pero la bonanza tiene un costo. Cada árbol necesita mucha agua, y en algunas veredas los acueductos comunitarios ya han tenido que racionar el líquido en verano. Además, el monocultivo deja al productor en manos de unos pocos compradores: si el precio internacional cae, toda la región cae con él. Eso ya pasó con el café en otras épocas, cuando una caída del precio dejó endeudadas a muchas familias.',
      'Algunos agrónomos recomiendan no apostarlo todo a la misma fruta. Doña Amparo Gómez, por ejemplo, tiene aguacates en la parte alta de su finca, café en la media y una huerta en la baja. Cuando el precio de los primeros bajó el año pasado, el segundo la salvó; y la tercera, como siempre, le dio la comida. Su finca no es la que más gana en la vereda, dice, pero es la única que nunca ha tenido que venderse.',
      'El aguacate no es el villano de esta historia ni tampoco el héroe. Es un cultivo, y como todo cultivo conviene sembrarlo con las cuentas claras: cuánta agua hay, cuántos compradores, qué pasa si un año sale mal. Quien hace esas cuentas antes de sembrar no se arrepiente después de haber sembrado.',
    ],
  };

  // ---------------- Lección 1 · Pronombres y referentes ----------------
  setLesson('pu-rf-1', [
    play('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: FAROS, texto: 'Hubo dos guardianes: |don Eliécer|, que cuidaba |el faro del morro|, y su sobrino |Abel|, que vigilaba |la boya|. Este era joven; aquel había aprendido el oficio de memoria.', tarjetas: ['«Este»', '«aquel»'], va: [2, 0],
      mira: ['Es el más cercano de los dos guardianes nombrados.', 'Es el más lejano de los dos guardianes nombrados.'], bien: 'Este, el cercano; aquel, el lejano.' },
      '«Este» es Abel, el último guardián nombrado; «aquel», don Eliécer, el primero.',
      { hint: 'Cuenta hacia atrás: ¿cuál de los dos guardianes se nombró más cerca?' }),
    play('pinta-voces', '¿A quién apunta la palabra en mayúsculas?', { doc: FAROS, plumas: ['don Eliécer', 'Abel'], lineas: ['Don Eliécer despertó a su sobrino y buscó la lámpara que ESTE había dejado en el bote.', 'Abel revisaba el celular; su tío se burlaba de ÉL.', 'Don Eliécer miraba el mar mientras Abel dormía: fue ÉL quien vio el barco.', 'Abel subió los jueves con su tío, y ESTE aprendió a leer los avisos.'], va: [1, 1, 0, 0],
      mira: ['El más cercano de los dos nombrados.', '¿De quién se burla el tío?', '¿Quién estaba despierto?', 'El más cercano de los dos nombrados.'], bien: 'Lo cercano y el sentido deciden juntos.' },
      'La lámpara la dejó el más cercano, Abel; el tío se burla de Abel; el que miraba el mar era don Eliécer; y «este», en la última, es el tío, recién nombrado.',
      { hint: 'Reemplaza la palabra por cada nombre y lee la oración completa.' }),
    play('cambia-tipo', 'Completa con «este» y «aquel» para que diga eso. Sobran fichas.', { de: 'lo que pasó', antes: 'Luis se quedó y Darío se fue.', frase: 'Vinieron Darío y Luis; [0] se quedó, [1] se fue.', rot: ['¿quién se quedó?', '¿quién se fue?'], fichas: ['este', 'aquel', 'ella', 'esto'], va: [0, 1, null, null],
      mira: ['Se quedó el que se nombró más cerca.', 'Se fue el que se nombró más lejos.', 'Los dos son hombres.', 'No se reemplaza a una persona con eso.'], bien: 'Luis está cerca; Darío, lejos.' },
      'Luis se nombró de último: «este». Darío, primero: «aquel».',
      { hint: 'Mira el orden en que aparecen los dos nombres en la oración.' }),
    play('ordena-texto', 'Se desordenó el relato. La primera tira está en su puesto.', { doc: { title: FAROS.title, ficha: FAROS.ficha }, fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['En la bahía de Taganga hubo durante años dos guardianes de faro: don Eliécer, que cuidaba el faro del morro, y su sobrino Abel, que vigilaba la boya luminosa de la entrada.', 'Cada noche, don Eliécer subía los ochenta escalones del faro con una linterna, aunque la luz ya se prendía sola desde 1990.', 'Abel, en cambio, revisaba la boya desde su celular.', 'Una noche de octubre, la aplicación dejó de funcionar porque se cayó la señal de todo el pueblo.', 'Al día siguiente, el capitán del barco fue a darles las gracias.'],
      mira: ['', 'Cuenta lo que hacía uno de los dos guardianes.', '«En cambio» se opone a otro ya contado.', '«La aplicación» ya se había nombrado.', '«Al día siguiente» ¿de qué noche?'], bien: 'Los dos, el tío, el sobrino, la noche y el día después.' },
      'El tío; «Abel, en cambio»; la noche en que falla «la aplicación»; y «Al día siguiente».',
      { hint: 'Busca a qué se opone «en cambio», qué aplicación es y después de qué noche.' }),
    play('pasos-del-proceso', 'Ordena lo que pasó la noche del apagón.', { que: 'lo que cuenta el párrafo 4', de: 'De la señal a la lámpara', fija: 0, ini: [3, 1, 0, 2], tiras: ['Se cae la señal.', 'La aplicación deja de avisar.', 'Don Eliécer ve el barco.', 'Encienden una lámpara a mano.'],
      mira: ['Es lo que empieza todo.', 'Sin señal no hay aviso.', 'Lo ve porque nadie más se enteró.', 'La encienden por lo que él vio.'], bien: 'Un «porque» y un par de ojos.' },
      'Sin señal no hay aviso; don Eliécer ve el barco y entre los dos encienden la lámpara.',
      { hint: 'Busca el «porque» de la primera oración del párrafo 4.' }),
    play('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que mejor prueba esta conclusión.', { doc: FAROS, nums: [5], n: 1, apuesta: 'El capitán cree que la tecnología sirve, pero no basta.', va: ['5.1'],
      mira: { '5.0': 'Solo dice a qué fue.', '5.2': 'Habla de lo que hizo Abel.', '5.3': 'Cuenta lo que aprendió cada uno.' }, bien: '«Siempre que alguien siguiera mirando.»' },
      '«Era una maravilla, siempre que alguien siguiera mirando el mar»: la acepta con una condición.',
      { hint: 'Busca las palabras del capitán y la condición que pone.' }),
    play('genero-o-cita', '¿Se cumple la idea: la tecnología ayuda, pero no reemplaza la atención?', { rot: ['se cumple', 'no se cumple'], doc: FAROS, fichas: ['Una piloto mira los instrumentos aunque vuele en automático.', 'Un señor cambia su celular dañado.', 'Un enfermero revisa al paciente aunque la máquina diga que está bien.', 'Una niña aprende a montar en bicicleta.'], va: [0, 1, 0, 1],
      mira: ['¿Hay máquina y, además, alguien atento?', '¿Hay alguien que siga mirando?', '¿Hay máquina y, además, alguien atento?', '¿Hay alguna máquina en la que se confíe?'], bien: 'Máquina y mirada: las dos piezas.' },
      'La piloto y el enfermero usan la máquina sin dejar de mirar. En las otras falta una de las piezas.',
      { hint: 'Busca dos cosas: un aparato que ayuda y una persona que no se confía.' }),
    play('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a una oración que la desmiente.', { doc: FAROS, nums: [4, 5], pregunta: 'Queda en pie', queda: 'Los dos aprendieron algo del otro.', tarjetas: ['Abel fue quien vio el barco.', 'La luz de emergencia se prendió sola.', 'Abel no volvió a subir al faro.'], va: [[1, 2], 3, [6, 7]],
      mira: ['Busca «Quien sí lo notó».', 'Busca «a mano».', 'Busca los ochenta escalones.'], bien: 'Cada falsa cae con una oración.' },
      'Quien lo notó fue don Eliécer; la encendieron «a mano»; y Abel subió esa noche y los jueves.',
      { hint: 'Busca la oración que habla de lo mismo y mira quién hace qué.' }),
  ]);

  // ---------------- Lección 2 · Sustituciones y elipsis ----------------
  setLesson('pu-rf-2', [
    play('pinta-voces', 'Muchos nombres para lo mismo: pinta cada expresión según lo que nombra.', { doc: AGUACATE, plumas: ['el aguacate', 'el agua', 'el café'], lineas: ['esta variedad de piel rugosa', 'el líquido que se raciona', 'el llamado «oro verde»', 'el segundo cultivo de doña Amparo', 'la misma fruta'], va: [0, 1, 0, 2, 0],
      mira: ['¿Cuál tiene la piel así?', '¿Qué reparten los acueductos?', '¿Qué se exporta a Europa?', 'Cuenta en orden lo que tiene en su finca.', '¿A cuál no conviene apostarle todo?'], bien: 'Sustituir es nombrar sin repetir.' },
      'Variedad, oro verde y fruta son el aguacate; el líquido, el agua; y el segundo de la lista, el café.',
      { hint: 'Busca cada expresión en el texto y mira de qué se venía hablando.' }),
    play('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: AGUACATE, texto: 'Doña Amparo tiene |aguacates| en la parte alta, |café| en la media y |una huerta| en la baja. Cuando el precio de los primeros bajó, el segundo la salvó; y la tercera le dio la comida.', tarjetas: ['«los primeros»', '«el segundo»', '«la tercera»'], va: [0, 1, 2],
      mira: ['Cuenta en orden y mira el plural.', 'Cuenta en orden.', 'Cuenta en orden y mira el femenino.'], bien: 'Se cuenta en el orden en que se nombró.' },
      'Aguacates, café y huerta: primeros, segundo y tercera, en el orden en que se nombraron.',
      { hint: 'Numera los tres cultivos en el orden de la primera oración.' }),
    play('cambia-tipo', 'En «los de leche, unos pocos» se omitió algo. Escríbelo completo. Sobran fichas.', { de: 'con elipsis', antes: 'Los productores de papa, muchos de ellos, cambiaron de cultivo; los de leche, unos pocos.', frase: '[0] de leche, unos pocos, [1].', rot: ['¿quiénes?', '¿qué hicieron?'], fichas: ['Los productores', 'cambiaron de cultivo', 'Los camiones', 'vendieron leche'], va: [0, 1, null, null],
      mira: ['Es lo mismo que hay antes de «de papa».', 'Es lo que hicieron los de papa.', 'Van al puerto: ¿son «de leche»?', 'Eso no se dijo de los de papa.'], bien: 'La elipsis calla lo que ya se sabe.' },
      'Se omitieron «productores» y «cambiaron de cultivo», que ya se habían dicho de los de papa.',
      { hint: 'Mira la primera mitad de la oración: lo que falta en la segunda está allí.' }),
    play('signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: AGUACATE, texto: 'Muchas familias dejaron sus potreros; otras|,| sus huertas. El llamado |«oro verde»| se exporta a Europa. Pero la bonanza tiene un costo: |¿cuánta agua hay?|', tarjetas: ['ocupa el lugar de un verbo que no se repite', 'marca un apodo'], va: [0, 1],
      mira: ['Busca dónde falta «dejaron».', 'Busca un nombre puesto por la gente.'], bien: 'La coma también guarda silencio.' },
      'La coma de «otras, sus huertas» ocupa el lugar de «dejaron». Las comillas marcan el apodo «oro verde».',
      { hint: 'Lee en voz alta y busca dónde tendrías que repetir un verbo.' }),
    play('ordena-texto', 'Se desordenó el reportaje. La primera tira está en su puesto.', { doc: { title: AGUACATE.title, ficha: AGUACATE.ficha }, fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Hace veinte años, el aguacate hass era casi desconocido en las fincas del oriente antioqueño.', 'El fruto tiene ventajas claras para el campesino: se vende en dólares, aguanta bien el viaje y los compradores extranjeros pagan por él más que el mercado local.', 'Pero la bonanza tiene un costo.', 'Algunos agrónomos recomiendan no apostarlo todo a la misma fruta.', 'El aguacate no es el villano de esta historia ni tampoco el héroe.'],
      mira: ['', 'Cuenta lo bueno del fruto ya nombrado.', '«Pero» se opone a algo bueno: ¿ya se dijo?', 'Recomiendan por algo malo: ¿ya se dijo?', 'Cierra pesando lo bueno y lo malo.'], bien: 'Auge, ventajas, costo, consejo y balance.' },
      'El auge; sus ventajas; «Pero» el costo; el consejo; y el balance: ni villano ni héroe.',
      { hint: 'El «Pero» necesita algo bueno antes, y el balance final, lo bueno y lo malo.' }),
    play('bisagras', 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.', { doc: AGUACATE, pares: [['Se vende en dólares;', 'muchos dejaron sus potreros.'], ['Trajo bonanza;', 'gasta mucha agua.'], ['Conviene variar;', 'doña Amparo tiene tres cultivos.']], fichas: ['por eso', 'sin embargo,', 'por ejemplo,', 'es decir,', 'porque'], va: [0, 1, 2, null, null],
      mira: ['¿Dónde lo segundo resulta?', '¿Dónde lo bueno choca con lo malo?', '¿Dónde lo segundo es un caso?', 'Ninguna segunda idea aclara la primera.', 'Ninguna segunda idea es la causa de la primera.'], bien: 'Resulta, choca e ilustra.' },
      'Cambiar de cultivo resulta de los dólares; el agua choca con la bonanza; y doña Amparo es un caso.',
      { hint: 'Pregunta si lo segundo es resultado, obstáculo o caso.' }),
    play('balanza-tesis', 'Tesis: conviene no depender de un solo cultivo. ¿Qué hace cada dato?', { doc: AGUACATE, tesis: 'Conviene no depender de un solo cultivo', fichas: ['Si el precio cae, toda la región cae.', 'A doña Amparo la salvó el café.', 'Las fincas de un cultivo resisten mejor.', 'El hass tiene la piel rugosa.'], va: [0, 0, 1, 2],
      mira: ['Si todo cae junto, ¿la tesis gana o pierde?', 'Si otro cultivo salva, ¿la tesis gana o pierde?', 'Si resisten mejor, ¿la tesis gana o pierde?', '¿La piel da o quita razones?'], bien: 'La piel rugosa no pesa.' },
      'La caída y el café apoyan; resistir mejor con uno solo la debilitaría; la piel no pesa.',
      { hint: 'Supón que cada dato es cierto y pregunta qué le hace a la tesis.' }),
    play('tacha-resumen', 'Tacha las tres oraciones que no hacen falta para entender el reportaje.', { doc: AGUACATE, n: 3, lineas: ['El aguacate creció mucho en pocos años.', 'Salen camiones rumbo al puerto.', 'Da ganancias, pero gasta agua y depende de pocos compradores.', 'Los mayores no reconocen las lomas.', 'Conviene variar y sembrar con las cuentas claras.', 'Amparo tiene café en la parte media.'], va: [1, 3, 5],
      mira: { 0: 'Es el tema del reportaje.', 2: 'Reúne lo bueno y lo malo.', 4: 'Es la recomendación.' }, bien: 'Auge, balance y consejo.' },
      'Los camiones, las lomas y el café de Amparo ilustran. Quedan el auge, el balance y el consejo.',
      { hint: 'Guarda qué pasó, qué tiene de bueno y de malo, y qué se aconseja.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const CANOA = {
    id: 'lec-canoas-tumaco', title: 'Las canoas de don Pastor',
    paras: [
      'En el puerto de Tumaco, algunos constructores de canoas todavía trabajan con machete y azuela. Don Pastor Quiñones, el más viejo de ellos, aprendió de su padre, y este, de un abuelo que había llegado del Chocó. Sus canoas se reconocen en todo el puerto: la proa es más alta que la de las demás, lo cual las hace más seguras con oleaje.',
      'Cada embarcación sale de un solo tronco. El árbol se escoge en el monte, se corta y se arrastra hasta el río; allí, el agua lo lleva hasta el taller. Tallarlo toma dos meses; pintarlo, una semana.',
      'Los jóvenes prefieren las lanchas de fibra de vidrio, que son más rápidas y no se pudren. Don Pastor no los culpa. Solo les pide que, antes de comprar una, aprendan a hacer la otra.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: CANOA, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-referencia', 'Evaluación · Referencia y cohesión', [
    ['pu-rf-1', '«Este» señala a lo más cercano de lo que se acaba de nombrar.',
      Q('En «aprendió de su padre, y este, de un abuelo», la palabra «este» se refiere a:', ['don Pastor', 'el padre de don Pastor', 'el abuelo', 'el Chocó'], 1,
        '«Este» es el último nombrado antes: el padre, que a su vez aprendió de un abuelo.',
        'Busca el nombre más cercano antes de «este» y prueba reemplazándolo.')],
    ['pu-rf-1', '«Lo cual» se refiere a toda una idea dicha antes, no a una sola palabra.',
      Q('En el párrafo 1, «lo cual» se refiere a:', ['que la proa sea más alta que la de las demás', 'el puerto de Tumaco', 'las demás canoas', 'el oleaje'], 0,
        'Lo que hace más seguras a las canoas es que su proa sea más alta: «lo cual» recoge esa idea entera.',
        'Pregúntate qué hace más seguras las canoas con oleaje.')],
    ['pu-rf-1', 'Un pronombre concuerda en género y número con su referente.',
      Q('En «Don Pastor no los culpa», «los» se refiere a:', ['las lanchas', 'los troncos', 'los constructores', 'los jóvenes'], 3,
        'Lo que don Pastor podría reprochar es que los jóvenes prefieran las lanchas: no los culpa a ellos.',
        'Busca en la oración anterior un grupo, en masculino plural, al que se pueda culpar de algo.')],
    ['pu-rf-2', 'En la elipsis, la coma ocupa el lugar de una palabra que no se repite.',
      Q('En «Tallarlo toma dos meses; pintarlo, una semana», la coma después de «pintarlo» ocupa el lugar de:', ['tronco', 'semana', 'toma', 'dos meses'], 2,
        'La frase completa sería «pintarlo toma una semana»; el verbo se omite para no repetirlo.',
        'Reconstruye la segunda parte con la palabra que falta.')],
    ['pu-rf-2', 'Un texto nombra lo mismo de varias maneras para no repetir.',
      Q('La expresión «Cada embarcación» (párrafo 2) sustituye a:', ['las canoas', 'los troncos', 'las lanchas de fibra', 'los talleres'], 0,
        'El párrafo 2 sigue hablando de las canoas de don Pastor: cada una sale de un solo tronco.',
        'Las lanchas de fibra aparecen después. ¿De qué se hablaba al final del párrafo 1?')],
    ['pu-rf-2', '«El otro» o «la otra» señalan el término de la pareja que no se acaba de mencionar.',
      Q('En «aprendan a hacer la otra», «la otra» se refiere a:', ['la lancha de fibra de vidrio', 'la canoa de un solo tronco', 'la proa', 'la azuela'], 1,
        'Frente a la lancha que van a comprar, «la otra» es la canoa tradicional que don Pastor les pide aprender a hacer.',
        'En el párrafo 3 hay dos tipos de embarcación. Si una es la que se compra, ¿cuál es la otra?')],
  ]);
});
