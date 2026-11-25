// Preuniversitario · pu-el-1 «Prelectura» (Explora). Textos cortos propios: no son los de los ejercicios.
{
  const HIELO = { cab: ['Lo que el hielo recuerda', 'Grupo de glaciología de una universidad', 'Revista de divulgación', 'Marzo de 2025'],
    paras: [['Cada invierno, la nieve que cae sobre un nevado se aplasta y se vuelve una capa de hielo.', 'En esa capa quedan atrapados el polvo y el aire de aquel año.', 'Por eso, perforar un nevado es como leer un diario del clima.']] };

  xpLec('pu-el-1', [
    ['Los bordes del texto',
      xpMira('hoja', 'Empecemos por la idea: antes de leer un texto se leen **sus bordes**.', { ...HIELO, tapa: true }, [
        ['El texto está tapado. Solo se ven sus bordes: título, autor, fuente y fecha.', {}],
        ['El título anuncia el tema: algo sobre lo que el hielo guarda.', { luz: ['t'] }],
        ['El autor dice quién habla: científicos que estudian los glaciares.', { luz: ['a'] }],
        ['La fuente dice para qué se escribió: una revista de divulgación explica.', { luz: ['f'] }],
        ['La fecha dice de cuándo son los datos.', { luz: ['d'] }],
        ['Con eso se apuesta: explicará qué guarda el hielo. Y al destaparlo, así es.', { luz: [2], tapa: false }],
      ], 'El título anuncia el tema; el autor, quién habla; la fuente, para qué; la fecha, de cuándo es.'),
      xpHaz('hoja', 'Subraya los **dos** bordes que anuncian que este texto va a **defender una postura**.', { modo: 'toca', meta: ['t', 'f'], cab: ['Prohibir los patines no arregla los andenes', 'Vecina del barrio', 'Columna de opinión', 'Mayo de 2025'], paras: [],
        pista: 'Quién firma y cuándo no dicen si habrá postura. Busca dónde se toma partido y qué clase de texto es.' }, 'Un título que toma partido y una columna de opinión anuncian que se va a defender algo.')],
    ['La fuente dice para qué',
      xpMira('hoja', 'Segunda idea: el mismo tema cambia según **de dónde viene** el texto.', { letras: ['A', 'B', 'C'], paras: [['Informe técnico de la empresa de acueducto.'], ['Columna de opinión de un periódico.'], ['Testimonio en un libro de memorias.']] }, [
        ['Tres textos sobre el mismo río. Todavía no hemos leído ninguno.', {}],
        ['Un informe técnico registra: dirá cuánta agua lleva y qué tan limpia está.', { luz: [0], nota: { 0: 'registra datos' } }],
        ['Una columna de opinión defiende: dirá qué se debería hacer con el río.', { luz: [1], nota: { 1: 'defiende una postura' } }],
        ['Un testimonio cuenta: dirá cómo era crecer junto al río.', { luz: [2], nota: { 2: 'cuenta lo vivido' } }],
        ['Al texto que explica se le llama expositivo; al que cuenta, narrativo.', {}],
        ['¿Buscas un dato? Sirve más la fuente que mide y, entre esas, la más reciente.', { luz: [0] }],
        ['Por eso la fuente dice qué buscar, y también qué no esperar.', {}],
      ], 'Un informe registra, la divulgación explica, una columna defiende y un testimonio cuenta.'),
      xpHaz('hoja', 'Pon al margen para qué se escribió cada texto.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['contar lo vivido', 'explicar algo', 'defender una postura'], meta: [1, 2, 0],
        paras: [['«Por qué flotan los barcos de hierro», revista de ciencia para jóvenes.'], ['«El tren sí vale la pena», editorial de un diario.'], ['«Mis años en el faro», memorias de un farero.']], pista: 'Alguno no va ahí. Mira otra vez la fuente de cada uno, no solo el tema.' }, 'La fuente y el título, juntos, dicen para qué se escribió.')],
    ['La vista rápida',
      xpMira('hoja', 'Tercera idea: antes de leer todo, se pasa la vista por **el comienzo de cada párrafo**.', { paras: [['Los pulpos tienen tres corazones.', 'Dos llevan la sangre a las branquias y el otro, al resto del cuerpo.'], ['Su inteligencia también sorprende.', 'En los acuarios abren frascos y reconocen a quien los alimenta.'], ['Sin embargo, viven poco.', 'La mayoría no pasa de dos años.']] }, [
        ['Este texto tiene tres párrafos. No hace falta leerlos completos todavía.', {}],
        ['Se leen solo los comienzos: con eso se sabe de qué trata cada uno.', { luz: [0, 2, 4] }],
        ['Quedan tres pistas al margen: el cuerpo, la inteligencia y la vida.', { nota: { 0: 'cuerpo', 1: 'inteligencia', 2: 'cuánto viven' } }],
        ['Si preguntan qué hacen con los frascos, ya sabes a qué párrafo ir.', { luz: [3] }],
        ['También ayudan las palabras que se repiten: muestran el tema.', {}],
      ], 'El comienzo de cada párrafo y las palabras que se repiten dicen dónde está cada cosa.'),
      xpHaz('hoja', 'Solo ves los comienzos. Subraya el párrafo al que irías para saber **cuánto cuesta** mantener un huerto.', { modo: 'toca', meta: [2], paras: [['Los huertos de azotea empezaron como un pasatiempo.'], ['Hoy alimentan comedores enteros.'], ['Sostenerlos, eso sí, exige dinero y tiempo.'], ['Por eso algunos edificios reparten las tareas.']], pista: 'Ese comienzo anuncia otra cosa. Busca el que habla de lo que hace falta para mantenerlos.' }, 'Un buen comienzo anuncia lo que sigue: allá se vuelve a buscar el dato.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Antes de leer «Cinco mitos sobre el café», de una revista de salud, **tacha** las dos preguntas que el texto seguramente **no** va a responder.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['¿Qué creencias falsas hay sobre el café?'], ['¿Qué sintió la autora la primera vez que lo probó?'], ['¿Le hace daño al corazón?'], ['¿Cuál es la mejor cafetería de la ciudad?']], pista: 'Alguna de las tachadas sí cabe en un texto que corrige creencias sobre la salud. Busca las que pedirían otra clase de texto.' }, 'Los bordes dicen qué esperar del texto y también qué no.')],
  ], 'Antes de leer: los bordes para apostar el tema y el propósito, y una vista rápida para saber dónde está cada cosa.');
}
