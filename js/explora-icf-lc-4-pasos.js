// Preicfes · Lectura Crítica, mundo 4 «Textos Literarios», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): texto literario,
// narrador, personaje, sentido figurado, verso, estrofa y voz poética definidos desde cero; luego el narrador que sabe poco, la
// figura que cambia con el contexto, el tono que choca con las palabras y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-literario-1', {
    conecta: 'icf-lc-estructura-3',
    desde: [
      ['Desde cero: qué es un texto literario',
        xpMira('hoja', 'Antes de las palabras difíciles: un **texto literario** inventa un mundo con palabras: un cuento, una novela, un poema.', { paras: [['Una noticia: «El martes llovió en Pasto».'], ['Un cuento: «Esa tarde la lluvia llegó a Pasto buscando a alguien».']] }, [
          ['En la lección de voces viste que no siempre habla quien escribe.', {}],
          ['La noticia informa un hecho real.', { luz: [0], nota: { 0: 'informa' } }],
          ['El cuento inventa: la lluvia busca a alguien.', { luz: [1], nota: { 1: 'inventa' } }],
          ['En un cuento, la voz que cuenta se llama narrador.', { luz: [1] }],
          ['Los seres a quienes les pasa la historia son los personajes.', {}],
          ['Y lo que les pasa, en orden, es la trama.', {}],
        ], 'Literatura: un mundo inventado. Narrador: quien cuenta. Personajes: a quienes les pasa.'),
        xpHaz('hoja', 'Pon al margen qué es cada parte del cuento.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['personaje', 'narrador', 'trama'], meta: [1, 0, 2], paras: [['«Yo lo vi todo desde la ventana».'], ['Don Tulio, el zapatero del barrio.'], ['Perdió su martillo, lo buscó y lo encontró.']], pista: 'Alguno no va ahí: ¿quién cuenta, a quién le pasa y qué pasa?' }, 'El «yo» cuenta, don Tulio vive la historia y lo que pasa es la trama.')],
    ],
    despues: [
      ['Más difícil: el narrador que sabe poco',
        xpMira('hoja', 'Un paso más: un narrador puede **equivocarse** o saber poco. Lo que él cree no siempre es lo que pasó.', { paras: [['Yo tenía seis años y estaba seguro:'], ['papá se iba cada lunes porque le gustaba el bus.'], ['Volvía cansado, con olor a cemento y las manos rotas.']] }, [
          ['Narra un niño de seis años.', { luz: [0], nota: { 0: 'narrador niño' } }],
          ['Él cree que el papá viaja por gusto.', { luz: [1], nota: { 1: 'lo que cree' } }],
          ['Pero las pistas dicen otra cosa: cemento y manos rotas.', { luz: [2], nota: { 2: 'las pistas' } }],
          ['El lector entiende más que el narrador: el papá trabaja duro.', { luz: [1, 2] }],
          ['No confundas lo que cree el narrador con lo que muestra el texto.', {}],
        ], 'Si el narrador sabe poco, las pistas dicen más que sus palabras.'),
        xpHaz('hoja', '«Mi hermana dice que ya no le gusta bailar. Cada noche, con la puerta cerrada, se oye música y el piso cruje». Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Odia la música.'], ['Sigue bailando a escondidas.'], ['El piso está dañado.']], pista: 'Junta lo que dice la hermana con lo que se oye cada noche.' }, 'Lo que hace contradice lo que dice: sigue bailando.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Del personaje se puede afirmar que…». La buena sale de **lo que hace**, no de lo que dicen de él.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Todos llamaban a Rubiela «la brava». Pero cuando el perro del vecino se enfermó, ella pasó la noche cuidándolo y nunca lo contó.'], ['Es brava, como dicen todos.'], ['Es cariñosa, aunque no lo muestre.'], ['Es veterinaria.'], ['Odia a los vecinos.']] }, [
        ['La pregunta: ¿qué se puede afirmar de Rubiela?', { luz: [0] }],
        ['A repite lo que dicen otros, no lo que ella hace.', { luz: [1], nota: { 1: 'lo que dicen' } }],
        ['C inventa un oficio que el texto no menciona.', { luz: [3], nota: { 3: 'no está' } }],
        ['D contradice lo que hizo por el perro del vecino.', { luz: [4], nota: { 4: 'al revés' } }],
        ['B sale de sus actos: cuida y no lo cuenta.', { luz: [2], nota: { 2: 'se deduce' } }],
      ], 'El personaje se conoce por sus actos; las opiniones de otros pueden ser la trampa.'),
      xpHaz('hoja', '«Mi abuela guardaba las cartas del abuelo en una caja. Nunca la abría, pero la limpiaba cada día». Subraya lo que se deduce de la abuela.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Tenía muchas cajas.'], ['Las cartas no le importaban.'], ['Cuidaba un recuerdo valioso.'], ['El abuelo vivía con ella.']], pista: 'Junta las dos acciones: no abrirla y limpiarla cada día.' }, 'Limpiar la caja cada día muestra que el recuerdo le importa.')],
    cierre: 'Distingue autor y narrador, mira lo que hacen los personajes y compara el comienzo con el final.',
  });

  xpAmplia('icf-lc-literario-2', {
    conecta: 'icf-lc-literario-1',
    desde: [
      ['Desde cero: literal y figurado',
        xpMira('hoja', 'Antes de las palabras difíciles: el **sentido literal** es lo que dicen las palabras tal cual; el **figurado**, lo que quieren decir.', { paras: [['Me muero de hambre.'], ['Ese examen fue un hueso.'], ['Mi mamá tiene un corazón de oro.']] }, [
          ['En la lección del narrador viste que las pistas dicen más que las palabras.', {}],
          ['Nadie se muere por almorzar tarde: es una manera de hablar.', { luz: [0], nota: { 0: 'mucha hambre' } }],
          ['Un examen no es un hueso: se dice que fue difícil.', { luz: [1], nota: { 1: 'difícil' } }],
          ['Un corazón de oro no brilla: habla de bondad.', { luz: [2], nota: { 2: 'bondad' } }],
          ['Las usas a diario: se llaman figuras.', {}],
          ['Leer una figura es traducirla a lo que de verdad pasa.', {}],
        ], 'Literal: lo que dicen las palabras. Figurado: lo que quieren decir. Las figuras se traducen.'),
        xpHaz('hoja', 'Pon al margen qué quiere decir cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['está muy cansado', 'es muy pequeño', 'está muy bravo'], meta: [1, 2, 0], paras: [['Ese apartamento es una caja de fósforos.'], ['Juan echa humo por las orejas.'], ['Llegué muerto del trabajo.']], pista: 'Alguno no va ahí: traduce cada frase a lo que pasa de verdad.' }, 'Una caja diminuta, humo de rabia y un cansancio enorme.')],
    ],
    despues: [
      ['Más difícil: la figura cambia con el contexto',
        xpMira('hoja', 'Un paso más: una figura no tiene un sentido fijo. El **contexto** de la historia decide qué quiere decir.', { paras: [['Cuando el hijo se fue, la casa quedó en invierno.'], ['Cuando nació la niña, se acabó el invierno de la casa.'], ['En Bogotá el invierno trae aguaceros.']] }, [
          ['Aquí «invierno» no habla del clima: habla de tristeza.', { luz: [0], nota: { 0: 'tristeza' } }],
          ['Aquí la misma imagen se cierra: volvió la alegría.', { luz: [1], nota: { 1: 'fin de la tristeza' } }],
          ['Y aquí «invierno» es literal: la temporada de lluvias.', { luz: [2], nota: { 2: 'literal' } }],
          ['La palabra es la misma; el contexto cambia el sentido.', { luz: [0, 2] }],
          ['Pregunta qué pasó en la historia cuando aparece la figura.', {}],
        ], 'El sentido de una figura sale de lo que pasa en la historia, no del diccionario.'),
        xpHaz('hoja', '«Después de la pelea, entre los dos hermanos se levantó un muro». Subraya lo que significa el muro.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Construyeron una pared en la casa.'], ['Dejaron de hablarse.'], ['Se volvieron más fuertes.']], pista: 'Esa lectura es literal o no sale de la pelea. ¿Qué pasa entre dos personas después de pelear?' }, 'El muro es la distancia que dejó la pelea.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «La expresión X tiene el mismo sentido que…». Hay que traducir la figura sin quedarse en sus palabras.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Desde que cerró la fábrica, el pueblo es un reloj parado».'], ['el pueblo tiene un reloj dañado'], ['en el pueblo la vida se detuvo'], ['el pueblo llega tarde a todo'], ['el pueblo desapareció']] }, [
        ['La pregunta: ¿qué quiere decir «un reloj parado»?', { luz: [0] }],
        ['A lo toma literal: la trampa de las mismas palabras.', { luz: [1], nota: { 1: 'literal' } }],
        ['C usa la idea de tiempo, pero cambia el sentido.', { luz: [3], nota: { 3: 'otro sentido' } }],
        ['D exagera: el pueblo sigue ahí, solo quieto.', { luz: [4], nota: { 4: 'exagera' } }],
        ['B traduce la figura: sin la fábrica, nada se mueve.', { luz: [2], nota: { 2: 'mismo sentido' } }],
      ], 'Traduce la figura a lo que pasó en la historia y busca la opción que lo diga.'),
      xpHaz('hoja', '«Cuando le dieron la noticia, a Marina se le vino el mundo encima». ¿Qué expresión tiene el mismo sentido?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Marina se cayó.'], ['Marina sintió un dolor enorme.'], ['Hubo un temblor.'], ['Marina se puso contenta.']], pista: 'Esa opción toma la frase al pie de la letra o le cambia el sentimiento.' }, 'Que el mundo se le venga encima es sentir un golpe enorme.')],
    cierre: 'Traduce cada figura a lo que pasa en la historia: el contexto decide su sentido.',
  });

  xpAmplia('icf-lc-literario-3', {
    conecta: 'icf-lc-literario-2',
    desde: [
      ['Desde cero: verso, estrofa y voz poética',
        xpMira('hoja', 'Antes de las palabras difíciles: un **poema** se escribe en renglones cortos, los **versos**. Un grupo de versos es una **estrofa**.', { paras: [['La lluvia toca el techo,', 'cuenta los días que faltan.'], ['Yo, desde la cama,', 'le contesto con mi calma.']] }, [
          ['En la lección de figuras viste que una imagen dice una cosa con otra.', {}],
          ['Cada renglón corto es un verso.', { luz: [0], nota: { 0: 'verso' } }],
          ['Los versos juntos forman una estrofa.', { luz: [0, 1], nota: { 0: 'estrofa 1' } }],
          ['Quien habla en el poema es la voz poética: aquí, un «yo».', { luz: [2], nota: { 1: 'voz poética' } }],
          ['La voz no es el poeta: es alguien que él inventa.', {}],
        ], 'Verso: un renglón. Estrofa: un grupo de versos. Voz poética: quien habla en el poema.'),
        xpHaz('hoja', '«Soy el bus de la última ruta, / llevo cansancio y canciones». Subraya quién es la **voz poética**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El poeta'], ['Un bus'], ['Los pasajeros']], pista: 'Busca quién dice «soy».' }, 'Habla un bus: el poeta le prestó la voz.')],
    ],
    despues: [
      ['Más difícil: el tono que choca con las palabras',
        xpMira('hoja', 'Un paso más: un poema puede hablar de algo alegre con un **tono** triste. En ese choque está el sentido.', { paras: [['Qué bonita la fiesta,'], ['todos bailan en la sala;'], ['yo cuido tu silla vacía'], ['por si vuelves a la casa.']] }, [
          ['Empieza alegre: una fiesta bonita.', { luz: [0, 1], nota: { 0: 'alegría' } }],
          ['El tercer verso cambia todo: una silla vacía.', { luz: [2], nota: { 2: 'ausencia' } }],
          ['La voz no baila: espera a alguien que no está.', { luz: [2, 3] }],
          ['El tono final es triste, aunque haya fiesta.', { luz: [3], nota: { 3: 'tono triste' } }],
          ['Tema: la ausencia en medio de la alegría de otros.', { luz: [0, 2] }],
        ], 'Cuando la alegría de afuera choca con la voz, el tono está en lo que siente la voz.'),
        xpHaz('hoja', '«Me regalaron un balcón frente al mar, / y yo, que no sé nadar, / lo miro de lejos, con miedo». Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Feliz'], ['Temeroso'], ['Burlón']], pista: 'Mira cómo dice la voz que mira el mar.' }, 'El regalo es bonito, pero la voz mira «con miedo».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el poema, la voz poética…» o «el tono del poema es…». Las trampas confunden la voz con el poeta.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Soy la quebrada del pueblo: / me tiraron llantas y botellas, / y aun así les doy agua cada mañana».'], ['El poeta vive junto a una quebrada.'], ['La quebrada reprocha el daño, pero sigue dando.'], ['La quebrada está feliz con su basura.'], ['El poema enseña a reciclar llantas.']] }, [
        ['La pregunta: ¿qué expresa la voz poética?', { luz: [0] }],
        ['A confunde la voz con el poeta: aquí habla la quebrada.', { luz: [1], nota: { 1: 'no es el poeta' } }],
        ['C ignora el reproche: nadie está feliz con llantas encima.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D convierte el poema en una lección que no da.', { luz: [4], nota: { 4: 'no está' } }],
        ['B junta la queja y el «aun así»: esa es.', { luz: [2], nota: { 2: 'sí' } }],
      ], 'Pregunta quién habla, de qué se queja y qué cambia después de palabras como «aun así».'),
      xpHaz('hoja', '«Me fui del campo a la ciudad grande; / tengo luz, tengo ruido, tengo prisa, / y cada noche sueño con gallinas». ¿Qué expresa la voz?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Odia el campo.'], ['Extraña la vida del campo.'], ['Le encanta la prisa.'], ['El poeta cría gallinas.']], pista: 'Mira con qué sueña cada noche y qué viene después de tanto «tengo».' }, 'Tiene de todo, pero sueña con el campo: lo extraña.')],
    cierre: 'En un poema, pregunta quién habla, con qué tono y qué cambia cuando se rompe lo que se repite.',
  });
}
