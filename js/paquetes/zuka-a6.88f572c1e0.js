// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/gimnasio-lectura.js
// Gimnasio de Comprensión lectora del Preuniversitario (spec 2026-11-25-gimnasio-escenas, pruebas tests/gimnasio-escenas.test.js):
// dos retos por mundo (Fuerza y Élite) sobre un texto corto y nuevo, con los ejercicios en que el texto es la escena. Va después
// de gimnasio-escenas.js.
{
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-l-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, ficha, paras) => ({ id: `gym-${id}`, title, ...(ficha ? { ficha: { autor: ficha[0], fuente: ficha[1], fecha: ficha[2] } } : {}), paras });

  // ---------------------------------------------------------------------------------------------------------- estrategias
  const LLUVIA = D('lluvia', 'Cosechar la lluvia', ['Equipo técnico de un acueducto rural', 'Cartilla para comunidades', 'Mayo de 2026'], [
    'En la vereda El Tablón llueve mucho y, sin embargo, falta agua. Cada aguacero corre por los techos, cae al patio y se pierde en la quebrada antes de que alguien pueda guardarlo.',
    'La solución cabe en un patio: una canaleta, un filtro de grava y un tanque. Con un techo mediano y un mes lluvioso, una familia llena un tanque de mil litros en pocos días.',
    'Esa agua no es para beber. Sirve para lavar, regar y descargar el baño, que es en lo que se va casi toda. Así, la potable alcanza para lo que de verdad la necesita.',
    'Por eso la cartilla no pide grandes obras. Pide que cada casa deje de mirar la lluvia como un estorbo y empiece a verla como una cosecha.']);
  reto('lluvia-1', ['pu-el-1', 'pu-el-3'], 2, 'Antes de leer', 'Bordes, comienzos y dato', 'Un texto corto firmado por un acueducto rural. Aprovecha los bordes y los comienzos antes de leerla toda.', [
    ['Apuesta', 'Mira quién firma y dónde se publica: eso dice qué clase de texto será y para qué.', 'antes-de-leer', 'Completa la apuesta. Sobran fichas.', { doc: LLUVIA, frase: 'Es [0] sobre [1], para [2].', rot: ['¿qué clase?', '¿qué tema?', '¿para qué?'], fichas: ['una cartilla', 'guardar agua de lluvia', 'enseñar a hacerlo', 'una leyenda', 'una cosecha de maíz', 'vender tanques'], va: [0, 1, 2, null, null, null], mira: ['Está en la fuente.', 'El título usa una imagen: ¿qué se «cosecha»?', 'Una cartilla para comunidades, ¿qué busca?', 'La fuente dice otra cosa.', 'En el título no hay maíz.', 'La firma un acueducto.'], luz: [[2, 'una canaleta, un filtro de grava y un tanque']], bien: 'La apuesta se cumple.' }, 'La fuente dice cartilla para comunidades: enseña a guardar la lluvia.', ['La clase de texto está escrita en un borde.', 'Una cartilla de un acueducto rural enseña a hacer algo.'], 'Bordes: cartilla, agua de lluvia, enseñar'],
    ['Vuelve al lugar', 'Ya viste los comienzos. Lleva cada pregunta al párrafo que la promete.', 'donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: LLUVIA, fichas: ['¿Qué materiales se necesitan?', '¿Se puede beber?', '¿Qué pasa hoy con los aguaceros?'], va: [1, 2, 0], mira: ['Busca el comienzo que anuncia una solución.', 'Busca el comienzo que dice para qué no es.', 'Busca el comienzo que cuenta el problema.'], luz: [[1, 'se pierde en la quebrada'], [2, 'una canaleta'], [3, 'Sirve para lavar']], bien: 'Cada comienzo cumplió lo prometido.' }, 'La solución abre el 2, «no es para beber» el 3 y el problema el 1.', ['Lee solo los comienzos.', 'El problema va primero, la solución después.'], 'Problema, solución y uso: cada pregunta a su párrafo']],
    'La cartilla enseña a guardar agua que no es para beber.', 'Los bordes dicen qué esperar; los comienzos, dónde buscar.');
  reto('lluvia-2', ['pu-el-2', 'pu-el-3'], 3, 'El mapa y la intrusa', 'Qué hace cada párrafo', 'El mismo texto, ahora por dentro: su mapa y una pregunta EXCEPTO.', [
    ['El mapa', 'No digas de qué habla cada párrafo: di qué hace.', 'mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: LLUVIA, fichas: ['plantea el problema', 'da la solución', 'aclara para qué sirve', 'concluye con una invitación', 'refuta a un experto'], va: [0, 1, 2, 3, null], mira: ['Busca «sin embargo».', 'Busca los materiales.', 'Busca para qué no es.', 'Busca «Por eso».', 'Nadie opina en contra.'], luz: [[1, 'falta agua'], [2, 'La solución'], [3, 'no es para beber'], [4, 'Por eso']], bien: 'Problema, solución, uso e invitación.' }, 'Problema, solución, aclaración e invitación final.', ['Mira las primeras palabras de cada uno.', 'El último empieza con «Por eso».'], 'Mapa: problema, solución, uso, invitación'],
    ['EXCEPTO', 'La opción que se queda sin párrafo es la respuesta. No respondas por lo que suena lógico.', 'sella-parrafo', '«El agua recogida sirve para todo lo siguiente, **EXCEPTO**:» Ata cada opción a su párrafo.', { doc: LLUVIA, tarjetas: ['Lavar', 'Regar', 'Descargar el baño', 'Generar energía'], va: [2, 2, 2, 4], mira: ['Busca los usos.', 'Busca los usos.', 'Busca los usos.', 'Suena posible: búscala.'], luz: [[3, 'lavar, regar y descargar el baño']], bien: 'La energía no está.' }, 'Los tres usos están en el párrafo 3; la energía, en ninguno.', ['Los usos están juntos en una oración.', 'Busca la que no está en esa oración.'], 'La intrusa: generar energía']],
    'El texto va de problema a invitación, y la intrusa es la energía.', 'El mapa ahorra releer; la intrusa se prueba, no se adivina.');

  // ----------------------------------------------------------------------------------------------------------------- tipos
  const CAMPANA = D('campana', 'La campana muda', ['Crónica de una profesora', 'Periódico escolar', 'Abril de 2026'], [
    'El lunes a las seis, como todos los lunes, Gabriel tiró de la cuerda y la campana no sonó. Tiró otra vez. Nada. Los niños, que ya corrían hacia la fila, se quedaron quietos en la mitad del patio.',
    'Es una campana pequeña, verdosa, con un borde mordido por los años. Cuelga de una viga que huele a humedad y tiene grabada una fecha que nadie alcanza a leer.',
    'Una campana suena porque el badajo golpea el metal y lo hace vibrar. Si el badajo se gasta o se suelta, el golpe no llega y el metal se queda callado.',
    '«Yo la oí cuando era estudiante», cuenta Gabriel. «Me dio pena verla así, como a un abuelo que pierde la voz».',
    'El colegio debería repararla en vez de comprar un timbre: un timbre avisa, pero esa campana nos reúne.']);
  reto('campana-1', ['pu-tt-1', 'pu-tt-2'], 2, 'Cinco maneras en una crónica', 'La pista de cada tipología', 'Una crónica corta que cambia de tipología en cada párrafo.', [
    ['Las tipologías', 'Pregunta a cada oración: ¿qué pasó?, ¿cómo es?, ¿cómo funciona?, ¿qué habría que hacer?', 'pinta-tipos', 'Pinta cada oración según lo que hace.', { doc: CAMPANA, plumas: ['narra', 'describe', 'explica', 'argumenta'], lineas: ['Gabriel tiró de la cuerda y la campana no sonó.', 'Es una campana pequeña, verdosa, con un borde mordido.', 'Suena porque el badajo golpea el metal y lo hace vibrar.', 'El colegio debería repararla en vez de comprar un timbre.', 'Los niños se quedaron quietos en la mitad del patio.'], va: [0, 1, 2, 3, 0], mira: ['¿Pasó algo o se muestra cómo es?', '¿Pasó algo o se muestra cómo es?', '¿Cuenta un hecho o dice cómo funciona?', '¿Informa o pide algo?', '¿Pasó algo o se muestra cómo es?'], bien: 'Cada una con su huella.' }, 'Acciones pasadas narran, rasgos describen, causas explican y «debería» argumenta.', ['Busca el tiempo del verbo y las palabras que piden.', '«Porque» dice cómo funciona; «debería» pide.'], 'Narra, describe, explica, argumenta, narra'],
    ['Las marcas', 'Los signos dicen quién habla y qué viene.', 'signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: CAMPANA, texto: '|«|Yo la oí cuando era estudiante», cuenta Gabriel. El colegio debería repararla en vez de comprar un timbre|:| un timbre avisa, pero esa campana nos reúne|.|', tarjetas: ['abre palabras exactas', 'anuncia la razón'], va: [0, 1], mira: ['Busca dónde empieza a hablar Gabriel.', 'Busca dónde sigue el porqué.'], bien: 'Comillas y dos puntos.' }, 'Las comillas abren lo que dijo Gabriel; los dos puntos anuncian la razón.', ['Mira qué viene después de cada signo.', 'Uno abre una voz y otro una razón.'], 'Comillas: cita. Dos puntos: razón']],
    'La crónica narra, describe, explica, deja oír una voz y argumenta.', 'La tipología se reconoce por su pista; la voz, por sus signos.');
  reto('campana-2', ['pu-tt-1', 'pu-tt-3'], 3, 'Lo que manda en la crónica', 'De todo el texto o de una parte', '¿Qué propósito organiza el texto y qué es solo una cita?', [
    ['El propósito', 'Prueba cada propósito con los cinco párrafos.', 'todo-o-parte', '¿Es de **todo** el texto o de una parte?', { doc: CAMPANA, rot: ['de todo el texto', 'solo de una parte'], fichas: ['Contar qué le pasó a la campana y pedir que la reparen', 'Explicar por qué suena', 'Mostrar cómo es', 'Dejar oír a Gabriel'], va: [0, 1, 1, 1], mira: ['¿Cuántos párrafos caben ahí?', '¿En cuántos párrafos se explica?', '¿En cuántos párrafos se describe?', '¿En cuántos párrafos habla?'], bien: 'Lo demás está al servicio de eso.' }, 'Contar y pedir recoge los cinco párrafos; lo otro es de uno solo.', ['Cuenta cuántos párrafos le sirven a cada uno.', 'Solo uno cubre desde el lunes hasta la petición.'], 'Propósito: contar y pedir que la reparen'],
    ['¿Testimonio?', 'El género lo da quien habla en todo el texto, no en un pedazo.', 'genero-o-cita', '¿El texto entero es testimonio o hay solo una cita?', { rot: ['texto entero', 'solo una cita'], fichas: ['Las palabras de Gabriel en esta crónica', 'Un libro en que una campanera cuenta su vida', 'Dos frases de un vecino en una noticia', 'La carta en que un exalumno cuenta sus años de colegio'], va: [1, 0, 1, 0], mira: ['¿Quién escribe la crónica?', '¿Quién habla de principio a fin?', '¿Quién escribe la noticia?', '¿Quién habla de principio a fin?'], bien: 'Una cita no cambia el género.' }, 'Gabriel y el vecino solo aparecen citados; la campanera y el exalumno hablan todo el texto.', ['Pregunta quién escribe.', 'Si habla de principio a fin, es testimonio.'], 'Cita: Gabriel y el vecino. Testimonio: los otros dos']],
    'Cuenta lo de la campana y pide repararla; Gabriel es una cita.', 'Lo que predomina organiza todo; la cita es una parte.');

  // ------------------------------------------------------------------------------------------------------------- explícita
  const SEMILLAS = D('semillas', 'El banco que no presta plata', null, [
    'En 2019, doce familias de la vereda Aguacatal abrieron una casa de semillas. Guardan 84 variedades de maíz y 31 de fríjol en frascos de vidrio, cada uno con su etiqueta.',
    'El préstamo es sencillo: quien se lleva una libra devuelve libra y media después de la cosecha. Si la cosecha se pierde, devuelve cuando pueda. Hasta hoy, según Marta Giraldo, que lleva el registro, solo tres familias no han devuelto.',
    'La casa no reemplaza a las tiendas agrícolas. Reduce, eso sí, lo que cada familia gasta en semilla, y algunas variedades que ya no se vendían en el pueblo volvieron a sembrarse.',
    '«Una semilla guardada no es un recuerdo; es una promesa», dice Giraldo. En enero pidieron a la alcaldía un salón más grande y aún esperan respuesta.']);
  reto('semillas-1', ['pu-ie-1', 'pu-ie-4'], 2, 'Datos de la casa de semillas', 'Palabra clave y dueño', 'Ubica cada dato en su párrafo y di quién dice cada cosa.', [
    ['Cada dato en su lugar', 'Saca de cada pregunta una palabra clave y piensa qué comienzo la promete.', 'donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: SEMILLAS, fichas: ['¿Cuántas familias empezaron?', '¿Cuánto se devuelve?', '¿Cambia lo que se compra en las tiendas?'], va: [0, 1, 2], mira: ['Busca el comienzo con un año.', 'Busca el comienzo que habla del préstamo.', 'Busca el comienzo que compara la casa con otros lugares.'], luz: [[1, 'doce familias'], [2, 'libra y media'], [3, 'Reduce, eso sí']], bien: 'Cada dato en su párrafo.' }, 'Las familias en el 1, la devolución en el 2 y las compras en el 3.', ['Saca la palabra clave de cada pregunta.', 'Devolver va con préstamo; comprar, con tiendas.'], 'Familias: 1; devolución: 2; compras: 3'],
    ['¿Quién lo dice?', 'Mira si hay «según», comillas o un verbo de decir.', 'genero-o-cita', '¿Lo dice Marta Giraldo o quien escribe?', { doc: SEMILLAS, rot: ['Marta Giraldo', 'quien escribe'], fichas: ['Solo tres familias no han devuelto.', 'La casa no reemplaza a las tiendas.', 'Una semilla guardada es una promesa.', 'Guardan 84 variedades de maíz.'], va: [0, 1, 0, 1], mira: ['Busca «según».', '¿Hay alguna marca de otra voz?', 'Busca las comillas.', '¿Hay alguna marca de otra voz?'], bien: '«Según» y las comillas dicen de quién es.' }, '«Según Marta» y las comillas son de ella; lo demás, de quien escribe.', ['Busca la marca junto a cada idea.', 'Dos tienen marca y dos no.'], 'De Marta: las tres familias y la promesa']],
    'Empezaron doce familias; Marta dice lo de las tres y lo de la promesa.', 'Palabra clave para ubicar, marca para atribuir.');
  reto('semillas-2', ['pu-ie-2', 'pu-ie-3'], 3, 'Ni más ni menos', 'Cuida lo que mide', 'Paráfrasis con trampa y afirmaciones que solo suenan ciertas.', [
    ['El alcance', 'Vuelve a la frase y busca la palabra que mide.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: SEMILLAS, filas: [{ antes: 'La casa hace que el gasto en semilla', topes: ['siga igual', 'baje', 'desaparezca'], va: 1 }, { antes: 'Volvieron a sembrarse', topes: ['ninguna de las variedades', 'algunas variedades', 'todas las variedades'], despues: 'que ya no se vendían', va: 1 }], mira: ['Relee «Reduce, eso sí».', 'Relee el final del párrafo 3.'], luz: [[3, 'Reduce, eso sí'], [3, 'algunas variedades']], bien: 'El mismo alcance.' }, 'El texto dice «reduce» y «algunas».', ['Busca el verbo y la palabra de cantidad en el párrafo 3.', 'Reducir no es desaparecer.'], '«Reduce» y «algunas»: ni más ni menos'],
    ['¿Lo dice?', 'Señala la frase antes de aceptar. Pedir no es recibir.', 'todo-o-parte', '¿Lo dice el texto o solo suena cierto?', { doc: SEMILLAS, rot: ['lo dice el texto', 'solo suena cierto'], fichas: ['Quien pierde la cosecha devuelve después.', 'La alcaldía les dio un salón.', 'Las semillas guardadas rinden más.', 'Hay más variedades de maíz que de fríjol.'], va: [0, 1, 1, 0], mira: ['Busca «Si la cosecha se pierde».', 'Mira el verbo: ¿pidieron o recibieron?', '¿Alguien compara el rendimiento?', 'Compara las dos cantidades.'], luz: [[2, 'devuelve cuando pueda'], [4, 'aún esperan respuesta'], [1, '84 variedades de maíz y 31 de fríjol']], bien: 'Pedir no es recibir.' }, 'Devolver después y la comparación de cantidades están; el salón no llegó y el rendimiento no se nombra.', ['Compara verbo por verbo.', 'Una sale de comparar dos cantidades escritas.'], 'Lo dice: devolver después y las cantidades']],
    'El gasto baja, algunas variedades volvieron, y la alcaldía no ha respondido.', 'Las trampas cambian cuánto, cuántos o quién hizo qué.');

  // ------------------------------------------------------------------------------------------------------------- inferencia
  const TALLER = D('taller', 'El taller de don Nacho', null, [
    'Don Nacho repara radios en un local donde apenas caben él y su banco. En la pared cuelgan treinta aparatos con un papelito y un nombre. Algunos llevan ahí tantos años que el nombre ya no se lee.',
    'Cada mañana les quita el polvo en el mismo orden. Cuando llega a un radio rojo de perilla grande, se demora un poco más y sube el volumen del suyo.',
    'Su nieta le propuso vender los que nadie reclama. Él le dijo que lo iba a pensar. Al otro día, los papelitos borrosos amanecieron con los nombres escritos de nuevo, en tinta negra.',
    'La cuadra ha cambiado: donde estaba la sastrería hay una tienda de celulares. Desde entonces llegan menos clientes, pero don Nacho abre media hora más temprano.']);
  reto('taller-1', ['pu-in-1', 'pu-in-4'], 2, 'Lo que muestra don Nacho', 'Del gesto al sentimiento', 'Nadie nombra lo que siente don Nacho. Se ve.', [
    ['Las pistas', 'Pregunta qué haría alguien que siente eso y búscalo.', 'pista-tipo', 'Ata cada inferencia a la oración que la deja ver.', { doc: TALLER, lineas: ['Se demora un poco más ante el radio rojo.', 'Los papelitos amanecieron escritos de nuevo.', 'Algunos llevan tantos años que el nombre no se lee.', 'Abre media hora más temprano.'], tarjetas: ['Ese aparato le recuerda algo', 'No piensa venderlos', 'Hay dueños que no volvieron', 'No se resigna a perder clientes'], va: [0, 1, 2, 3], mira: ['¿Ante qué se detiene?', '¿Qué hizo en vez de vender?', '¿Qué muestra el paso del tiempo?', '¿Qué hace cuando llegan menos?'], bien: 'Todo está en lo que hace.' }, 'Detenerse, reescribir, los nombres borrosos y abrir antes dejan ver cada cosa.', ['Busca el gesto de cada inferencia.', 'Reescribir los nombres contesta la propuesta de la nieta.'], 'Gestos: demorarse, reescribir, abrir antes'],
    ['¿Pista o suposición?', 'Si no puedes señalar la frase, la pusiste tú.', 'genero-o-cita', '¿Inferencia con pista o suposición?', { doc: TALLER, rot: ['hay pista', 'la pone uno'], fichas: ['Le importan los radios ajenos.', 'El radio rojo era de su esposa.', 'Para la nieta, algunos radios ya no los van a recoger.', 'Va a cerrar el taller.'], va: [0, 1, 0, 1], mira: ['Busca lo que hace cada mañana.', '¿Alguna frase habla de una esposa?', 'Busca qué propuso.', '¿Abrir más temprano apunta a cerrar?'], luz: [[2, 'les quita el polvo en el mismo orden'], [3, 'vender los que nadie reclama']], bien: 'Posible no es inferido.' }, 'El polvo y la propuesta son pistas; la esposa y el cierre los pone uno.', ['Señala con el dedo la frase.', 'Dos no tienen ninguna frase.'], 'Con pista: le importan; la nieta no espera a los dueños']],
    'Don Nacho recuerda, cuida y no se rinde.', 'Un gesto, una inferencia; sin gesto, suposición.');
  reto('taller-2', ['pu-in-2', 'pu-in-3'], 3, 'Lo que se da por hecho', 'Antes, ahora y por qué', 'Presupuestos en el texto y causas en parejas de hechos, del texto o inventadas.', [
    ['Lo supuesto', 'Pregunta qué tuvo que ser cierto antes para que se diga así.', 'dice-deduce', '¿El texto lo dice, lo da por hecho o nada?', { doc: TALLER, nums: [1, 4], rot: ['lo dice', 'lo da por hecho', 'nada'], fichas: ['La cuadra cambió.', 'Antes llegaban más clientes.', 'Hoy hay una tienda de celulares.', 'La tienda vende radios.'], va: [0, 1, 0, 2], mira: ['Relee el comienzo del párrafo 4.', '«Llegan menos»: ¿menos que cuándo?', 'Léela junto a «hay una tienda».', '¿Alguien dice qué más vende?'], luz: [[4, 'La cuadra ha cambiado'], [4, 'llegan menos clientes']], bien: '«Menos» supone un antes.' }, '«Menos» da por hecho que antes llegaban más; el cambio de la cuadra y la tienda están dichos.', ['Busca la palabra que compara.', 'Para decir «menos» tuvo que haber más.'], '«Menos» supone que antes eran más'],
    ['¿Causa o coincidencia?', 'Quita lo primero: ¿lo segundo pasaría igual?', 'pinta-voces', '¿Lo primero **causa** lo segundo o solo coincide?', { plumas: ['la causa', 'solo coincide'], lineas: ['La nieta propuso vender; él reescribió los nombres.', 'Cerró la sastrería; ese mes llovió mucho.', 'Llegan menos clientes; abre más temprano.', 'Colgó un radio rojo; subió el precio del pan.'], va: [0, 1, 0, 1], mira: ['¿Habría reescrito los nombres sin la propuesta?', '¿Una sastrería hace llover?', '¿Para qué abriría antes?', '¿Un radio cambia el precio del pan?'], bien: 'Después no es por.' }, 'La propuesta y los pocos clientes empujan lo que hace; la lluvia y el pan solo coinciden.', ['Quita lo primero con la imaginación.', 'Dos parejas no tienen relación.'], 'Causan: la propuesta y los pocos clientes']],
    'Antes había más clientes; la propuesta y la falta de clientes explican sus gestos.', 'Presupuesto: lo que tiene que ser cierto. Causa: lo que, sin ello, no pasaría.');

  // ------------------------------------------------------------------------------------------------------------ vocabulario
  const FERIA = D('feria', 'La feria que despegó', null, [
    'El primer año, la feria fue un fracaso redondo: llovió, llegaron cuatro puestos y la banda tocó para un perro. Los organizadores, lejos de tirar la toalla, tomaron nota.',
    'El segundo año sembraron la idea en los colegios y tejieron acuerdos con los transportadores. La feria despegó: en una mañana se vendieron todas las hortalizas.',
    'Hoy es un evento sólido. Subsiste con lo que cobra por puesto y reinvierte lo que sobra. Sus críticos dicen que creció de más; ellos responden, con humor fino, que prefieren ese problema al del perro.']);
  reto('feria-1', ['pu-vo-1', 'pu-vo-2'], 2, 'Palabras de feria', 'La palabra en su oración', 'Verbos concretos usados con ideas y palabras con varios sentidos.', [
    ['El reemplazo', 'Reemplaza y lee hasta el final: si se vuelve raro, no es.', 'cambia-palabra', 'Pon en cada hueco lo que significa. Sobran dos.', { doc: FERIA, frases: [[1, 'la feria fue un fracaso ', 'redondo', ':'], [2, 'La feria ', 'despegó', ':'], [3, 'Hoy es un evento ', 'sólido', '.']], fichas: ['completo', 'empezó a crecer', 'firme', 'circular', 'se desprendió'], va: [0, 1, 2, null, null], mira: ['¿Le quedó algo bueno a ese fracaso?', '¿Qué pasó esa mañana con las ventas?', 'Se sostiene solo: ¿cómo es?', 'Un fracaso no tiene forma.', 'La feria no estaba pegada.'], bien: 'El contexto eligió.' }, 'Redondo es completo, despegar es empezar a crecer y sólido, firme.', ['Lee lo que sigue a cada palabra.', 'Lo que va tras los dos puntos lo explica.'], 'Redondo: completo. Despegó: creció. Sólido: firme'],
    ['De la cosa a la idea', 'Piensa qué hace ese verbo con una cosa y busca lo parecido con una idea.', 'pista-tipo', 'Ata cada significado a la oración donde está.', { doc: FERIA, lineas: ['Sembraron la idea en los colegios.', 'Tejieron acuerdos con los transportadores.', 'Tomaron nota de los errores.'], tarjetas: ['hicieron nacer', 'construyeron poco a poco', 'aprendieron de ellos'], va: [0, 1, 2], mira: ['¿Qué pasa con algo sembrado?', '¿Cómo se hace algo tejido?', '¿Para qué se anota un error?'], bien: 'Sembrar, tejer, anotar.' }, 'Sembrar es hacer nacer; tejer, construir poco a poco; tomar nota, aprender.', ['Mira qué hace cada verbo con una cosa.', 'Un tejido se hace hilo por hilo.'], 'Sembrar: nacer. Tejer: poco a poco. Nota: aprender']],
    'La feria pasó de ser un fracaso completo a ser un evento firme.', 'Reemplaza en la oración; de la cosa se pasa a la idea.');
  reto('feria-2', ['pu-vo-3', 'pu-vo-4'], 3, 'Dichos y piezas', 'Al pie de la letra o no', 'Expresiones que no se leen tal cual y palabras hechas de piezas.', [
    ['¿Tal cual?', 'Imagínalo tal cual. Si es absurdo, es una manera de decir.', 'genero-o-cita', '¿Al pie de la letra o manera de decir?', { doc: FERIA, rot: ['al pie de la letra', 'manera de decir'], fichas: ['Llovió.', 'Lejos de tirar la toalla.', 'Llegaron cuatro puestos.', 'Con humor fino.'], va: [0, 1, 0, 1], mira: ['¿Pudo pasar tal cual?', '¿Había una toalla?', '¿Pudo pasar tal cual?', '¿El humor tiene grosor?'], bien: 'Rendirse y con ingenio.' }, 'La toalla y lo fino son maneras de decir: rendirse y con ingenio.', ['Busca lo que no puede pasar tal cual.', 'Nadie boxeaba y el humor no se mide.'], 'Maneras de decir: la toalla y el humor fino'],
    ['Las piezas', 'Parte la palabra y prueba el sentido en la oración.', 'genero-o-cita', '¿La pieza «re-» quiere decir «otra vez»?', { doc: FERIA, rot: ['sí, otra vez', 'no: engaña'], fichas: ['reinvierte lo que sobra', 'responden con humor', 'reabrir la feria', 'un fracaso redondo'], va: [0, 1, 0, 1], mira: ['¿Invierte otra vez?', '¿«Ponden» otra vez?', '¿Abre otra vez?', '¿«Dondo» otra vez?'], bien: 'Manda el contexto.' }, 'Reinvertir y reabrir repiten; responder y redondo, no.', ['Quita «re-» y agrega «otra vez».', 'Dos palabras no existen sin «re-».'], 'Otra vez: reinvierte y reabrir']],
    'Tirar la toalla es rendirse; «re-» no siempre repite.', 'Si es absurdo tal cual, es figurado; si la pieza no encaja, engaña.');

  // ------------------------------------------------------------------------------------------------- aplicación y analogía
  const HORMIGAS = D('hormigas', 'El camino de las hormigas', null, [
    'Cuando una hormiga encuentra comida, vuelve al nido dejando un rastro de olor. Otras lo siguen y, si también encuentran, lo refuerzan. El rastro de un camino corto se refuerza más rápido, porque se recorre más veces.',
    'Nadie dirige el tráfico. El mejor camino aparece solo, de muchas decisiones pequeñas. Si la comida se acaba, nadie refuerza el rastro, que se evapora, y las hormigas vuelven a explorar.',
    'El olor es para ellas como una huella en la nieve: guía mientras dure. Pero una huella no mejora porque la pisen otros, y el rastro sí.']);
  reto('hormigas-1', ['pu-ap-1'], 2, 'La idea de las hormigas', 'Saca el principio y pruébalo', 'Saca el principio del texto y reconócelo en otros temas.', [
    ['El principio', 'Un principio no nombra a las hormigas y no exagera.', 'talla-idea', 'Pon cada versión en su talla.', { doc: HORMIGAS, p: 2, rot: ['se queda en el caso', 'principio', 'dice de más'], fichas: ['Las hormigas dejan olor.', 'De muchas decisiones pequeñas puede salir un buen orden.', 'Nunca hacen falta jefes.'], va: [0, 1, 2], mira: ['¿Sirve para otro tema?', '¿Sirve para otro tema sin exagerar?', '¿El texto diría «nunca»?'], luz: [[2, 'de muchas decisiones pequeñas']], bien: 'Un principio viaja.' }, 'El olor es el caso y «nunca» exagera; el principio sirve para otros temas.', ['Prueba cada versión con una ciudad.', 'Una exagera y otra no sale del hormiguero.'], 'Principio: orden que sale de decisiones pequeñas'],
    ['Otros casos', 'Busca las dos piezas: nadie dirige y, aun así, aparece un orden.', 'genero-o-cita', '¿Se cumple el principio?', { rot: ['se cumple', 'no se cumple'], fichas: ['Un sendero que nació de tantos que cruzaron el prado.', 'Un director que ordena a la orquesta.', 'Una palabra nueva que todos empiezan a usar.', 'Un semáforo que regula una esquina.'], va: [0, 1, 0, 1], mira: ['¿Alguien mandó hacerlo?', '¿Hay quien dirija?', '¿Alguien la impuso?', '¿Hay algo que mande?'], bien: 'Sin jefe y con orden.' }, 'El sendero y la palabra nacen de muchos; el director y el semáforo mandan.', ['Pregunta si alguien manda.', 'En dos casos alguien o algo dirige.'], 'Se cumple: el sendero y la palabra']],
    'De muchas decisiones pequeñas puede salir un buen orden.', 'Sin nombrar el caso ni exagerar; y las piezas se buscan en el nuevo tema.');
  reto('hormigas-2', ['pu-ap-2'], 3, 'La huella y el rastro', 'La relación con un verbo', 'Analogías: la que conserva la relación y hasta dónde llega.', [
    ['La relación', 'Di la relación con un verbo y pruébala al otro lado.', 'cambia-tipo', 'Completa la analogía. Sobran fichas.', { de: 'misma relación: guía a quien lo sigue', antes: 'Rastro es a hormiga como…', frase: '[0] es a [1]', rot: ['¿qué guía?', '¿a quién?'], fichas: ['faro', 'barco', 'arena', 'nieve'], va: [0, 1, null, null], mira: ['El rastro guía: ¿qué guía aquí?', 'La hormiga es guiada: ¿quién aquí?', 'No guía a nadie.', 'No guía a nadie.'], bien: 'El faro guía al barco.' }, 'El rastro guía a la hormiga como el faro al barco.', ['¿Qué hace el rastro con la hormiga?', 'Busca algo que guíe a alguien en el mar.'], 'Guiar: faro y barco'],
    ['El límite', 'Toda comparación falla en algo. Busca dónde el texto separa las dos cosas.', 'comprueba-apuesta', 'Subraya la oración que dice el **límite** de la comparación.', { doc: HORMIGAS, nums: [2, 3], n: 1, apuesta: 'Huella y rastro no se parecen en todo.', va: ['3.1'], mira: { '2.0': 'No compara.', '2.1': 'Dice cómo aparece el camino.', '2.2': 'Dice qué pasa si se acaba.', '3.0': 'Dice en qué se parecen.' }, bien: 'El «pero» puso el límite.' }, 'La huella no mejora porque la pisen otros; el rastro sí.', ['El límite va después de una palabra que se opone.', 'Busca lo que uno hace y la otra no.'], 'Límite: la huella no mejora y el rastro sí']],
    'El faro guía al barco; y una huella no mejora con el uso.', 'Di la relación con un verbo y busca el «pero».');

  // ----------------------------------------------------------------------------------------------------------------- fuentes
  const PERROS = D('perros', 'Perros en el bus', null, [
    '¿Deben viajar perros en el bus? La veterinaria Inés Roldán sostiene que sí, con bozal y en horas tranquilas. «Un perro bien llevado molesta menos que un celular sin audífonos», dice.',
    'El conductor Wilmar Sierra se opone. Según él, en un frenazo un perro grande es un peligro. Admite, eso sí, que los pequeños en guacal nunca le han dado problema.',
    'La empresa propone un bus especial los domingos. Creo que es un buen comienzo, aunque deja por fuera a quien trabaja entre semana. A mi juicio, la regla debería depender del tamaño y no del día.']);
  reto('perros-1', ['pu-fu-1'], 2, 'Las voces del bus', 'Quién y cómo lo dice', 'Tres voces y una opinión: separa quién dice qué y si lo copian o lo cuentan.', [
    ['Cada voz', 'Busca el verbo o la marca junto a cada idea.', 'pinta-voces', 'Pinta cada idea con el color de quien la dice.', { doc: PERROS, plumas: ['Roldán', 'Sierra', 'quien escribe'], lineas: ['Que viajen con bozal y en horas tranquilas.', 'En un frenazo, un perro grande es un peligro.', 'La regla debería depender del tamaño.', 'Los pequeños en guacal no dan problema.'], va: [0, 1, 2, 1], mira: ['Busca «sostiene».', 'Busca «Según él».', 'Busca «A mi juicio».', 'Busca «Admite».'], bien: 'Cada una con su marca.' }, 'Roldán «sostiene», Sierra habla «según él» y «admite», y «a mi juicio» es de quien escribe.', ['Vuelve al texto y busca la marca.', 'Una voz reconoce algo que no le conviene.'], 'Roldán, Sierra, quien escribe, Sierra'],
    ['¿Copiado o contado?', 'Comillas copian; «que» o «según» cuentan.', 'genero-o-cita', '¿Cita directa o indirecta?', { doc: PERROS, rot: ['directa', 'indirecta'], fichas: ['«Un perro bien llevado molesta menos», dice.', 'Según él, es un peligro.', 'Admite que los pequeños no dan problema.', 'Sostiene que sí, con bozal.'], va: [0, 1, 1, 1], mira: ['¿Lleva comillas?', '¿Lleva comillas?', '¿Lleva comillas?', '¿Lleva comillas?'], bien: 'Una sola copia palabras exactas.' }, 'Solo la primera lleva comillas.', ['Busca las comillas.', 'Solo hay una con palabras exactas.'], 'Directa: solo la de Roldán con comillas']],
    'Roldán a favor, Sierra en contra, y quien escribe pide mirar el tamaño.', 'La marca dice de quién es; las comillas, si son sus palabras.');
  reto('perros-2', ['pu-fu-2'], 3, 'Posturas y citas de afuera', 'Frente a la tesis', 'Ubica las posturas y decide qué le hace cada cita a la tesis.', [
    ['Las posturas', '¿Sí, no, o sí con condiciones?', 'linea-vida', 'Pon a cada quien en su postura frente a dejar viajar perros.', { doc: PERROS, rot: ['a favor', 'matizada', 'en contra'], fichas: ['Sierra, el conductor.', 'La empresa: un bus especial los domingos.', 'Quien escribe: según el tamaño.'], va: [2, 1, 1], mira: ['Admite algo, pero ¿qué verbo usa el texto para su postura?', '¿Dice sí, no o sí con condiciones?', '¿Dice sí, no o sí con condiciones?'], bien: 'Dos condiciones y un no.' }, 'Sierra se opone; la empresa y quien escribe ponen condiciones.', ['Busca la condición de cada uno.', 'Uno no acepta; dos aceptan con condiciones.'], 'En contra: Sierra; matizadas: las otras'],
    ['Las citas', 'Compara con la tesis, no con un detalle.', 'balanza-tesis', 'Tesis: la regla debe depender del **tamaño**. ¿Qué hace cada cita?', { doc: PERROS, tesis: 'La regla debe depender del tamaño', fichas: ['«Los perros pequeños en guacal no causan caídas.»', '«Los grandes empujan a otros al frenar.»', '«Los accidentes son iguales con chicos y grandes.»', '«El bus tiene cuarenta sillas.»'], va: [0, 0, 1, 2], mira: ['Si los pequeños no causan caídas, ¿importa el tamaño?', 'Si los grandes empujan, ¿importa el tamaño?', 'Si da igual, ¿importa el tamaño?', '¿Habla del tamaño del perro?'], bien: 'Si da igual, la tesis cae.' }, 'Pequeños seguros y grandes que empujan apoyan; si da igual, debilita; las sillas no pesan.', ['Supón que cada cita es cierta.', 'Una dice que el tamaño no cambia nada.'], 'Apoyan dos, una debilita y una no pesa']],
    'Sierra en contra; la tesis cae si el tamaño da igual.', 'Ubica la postura y pesa cada cita contra la tesis.');

  // --------------------------------------------------------------------------------------------------------------- conectores
  const BICI = D('bici', 'El «milagro» de las bicicletas', null, [
    'Hace un año, el colegio estrenó su «milagro»: veinte bicicletas para prestar. Hubo fotos, discursos y una cinta roja. Sin embargo, hoy quedan nueve.',
    'Las razones son varias. En primer lugar, nadie las revisaba; por otra parte, no había candados (salvo los que cada quien trajera de su casa).',
    'Se dirá, con razón, que veinte bicicletas son mejor que ninguna. Nadie pide devolverlas. Pero un préstamo sin cuidado no es un préstamo: es un regalo lento.',
    'En suma, no faltaron bicicletas; faltó, más bien, quien respondiera por ellas.']);
  reto('bici-1', ['pu-cn-1'], 2, 'Lo que anuncian los conectores', 'El conector dice qué viene', 'Reconoce qué anuncia cada conector y cuándo rectifica.', [
    ['Qué anuncia', 'Tapa lo que sigue y pregunta qué esperarías.', 'pinta-tipos', 'Pinta cada oración según lo que anuncia su conector.', { doc: BICI, plumas: ['contraste', 'suma', 'conclusión', 'consecuencia'], lineas: ['Sin embargo, hoy quedan nueve.', 'Por otra parte, no había candados.', 'En suma, no faltaron bicicletas.', 'Por eso, conviene nombrar a un encargado.', 'Además, nadie las revisaba.'], va: [0, 1, 2, 3, 1], mira: ['¿Va a favor o en contra de lo anterior?', '¿Agrega otra razón?', '¿Recoge lo dicho?', '¿Es un resultado?', '¿Agrega otra razón?'], bien: 'Cada conector avisa.' }, 'Sin embargo contrasta, por otra parte y además suman, en suma concluye y por eso trae el efecto.', ['Mira qué hace lo que sigue con lo anterior.', 'Dos agregan otra razón.'], 'Contraste, suma, conclusión, consecuencia, suma'],
    ['Oponer o rectificar', 'Si niega una idea y pone otra, rectifica.', 'genero-o-cita', '¿Opone o rectifica?', { doc: BICI, rot: ['opone', 'rectifica'], fichas: ['Hubo fiesta; sin embargo, quedan nueve.', 'No faltaron bicicletas; faltó, más bien, quien respondiera.', 'No es un préstamo: al contrario, es un regalo.', 'Son pocas, pero sirven.'], va: [0, 1, 1, 0], mira: ['¿Alguna idea quedó negada?', '¿Cuál de las dos queda en pie?', '¿Cuál de las dos queda en pie?', '¿Alguna idea quedó negada?'], bien: 'El «no» es la pista.' }, '«Más bien» y «al contrario» llegan tras un «no» y reemplazan.', ['Busca el «no» en la primera parte.', 'En dos, lo segundo reemplaza lo negado.'], 'Rectifican: «más bien» y «al contrario»']],
    'El texto contrasta, suma, concluye y rectifica.', 'El conector avisa; tras un «no», «más bien» rectifica.');
  reto('bici-2', ['pu-cn-2'], 3, 'Qué hace cada parte', 'Nombra la función', 'Funciones de párrafo, matiz y signos.', [
    ['La función', 'Las primeras palabras delatan lo que hace cada párrafo.', 'mapa-margen', 'Lleva al margen la función de cada párrafo. Sobra una.', { doc: BICI, fichas: ['presenta con ironía', 'da las causas', 'concede y refuta', 'concluye', 'da un ejemplo extranjero'], va: [0, 1, 2, 3, null], mira: ['Busca las comillas.', 'Busca «Las razones».', 'Busca «con razón» y «Pero».', 'Busca «En suma».', 'No se nombra otro país.'], luz: [[1, '«milagro»'], [2, 'Las razones'], [3, 'con razón'], [4, 'En suma']], bien: 'Cuatro funciones.' }, 'Ironía, causas, concesión con respuesta y conclusión.', ['Mira el comienzo de cada uno.', 'El tercero acepta y luego responde.'], 'Presenta, causas, concede y refuta, concluye'],
    ['Los signos', 'Mira qué guarda cada signo: una burla, una excepción o una aclaración.', 'signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: BICI, texto: 'el colegio estrenó su |«milagro»|… no había candados |(salvo los que cada quien trajera de su casa)|. Pero un préstamo sin cuidado no es un préstamo|:| es un regalo lento.', tarjetas: ['toma distancia de la palabra', 'guarda una excepción', 'anuncia lo que de verdad es'], va: [0, 1, 2], mira: ['¿Qué palabra no se cree?', '¿Dónde hay una salvedad?', '¿Dónde se aclara?'], bien: 'Comillas, paréntesis y dos puntos.' }, 'Las comillas son irónicas, el paréntesis guarda la excepción y los dos puntos aclaran.', ['Lee lo que está dentro o después.', 'Uno se burla, otro exceptúa y otro aclara.'], 'Ironía, excepción y aclaración']],
    'Presenta, explica, concede y refuta, concluye.', 'Busca la marca y nombra lo que hace.');

  // ------------------------------------------------------------------------------------------------------------ argumentación
  const SIESTA = D('siesta', 'Defensa de la siesta', null, [
    'Sostengo que los colegios de jornada larga deberían permitir una siesta de veinte minutos. Según un estudio con 300 estudiantes, quienes descansan después del almuerzo cometen menos errores en la tarde.',
    'En un colegio de Sincelejo lo probaron un semestre y bajaron las llegadas tarde a la segunda jornada. A nadie se le ocurre exigirle a un celular que funcione sin recargarlo.',
    'Hay quien piensa que es perder tiempo. Admito que veinte minutos son veinte minutos. Los cuadernos de las tres de la tarde, llenos de tachones, cuentan el resto.',
    'Curiosamente, los mismos que se oponen duermen la suya los domingos.']);
  reto('siesta-1', ['pu-ag-1', 'pu-ag-3'], 2, 'Razones y hechos', '¿Con qué lo defiende?', 'Reconoce de qué tipo es cada razón y separa los hechos de las opiniones.', [
    ['Las razones', 'Cifra, caso o comparación: cada una deja su huella.', 'pinta-tipos', 'Pinta cada argumento según su tipo.', { doc: SIESTA, plumas: ['datos', 'ejemplo', 'analogía'], lineas: ['Un estudio con 300 estudiantes halló menos errores.', 'En un colegio de Sincelejo lo probaron un semestre.', 'A nadie se le exige a un celular funcionar sin recarga.', 'Siete de cada diez dicen rendir más tras descansar.'], va: [0, 1, 2, 0], mira: ['¿Trae cantidades o un caso?', '¿Trae cantidades o un caso?', '¿Compara con otra cosa?', '¿Trae cantidades o un caso?'], bien: 'Datos, ejemplo y analogía.' }, 'El estudio y los siete de diez son datos; Sincelejo, un ejemplo; el celular, analogía.', ['Busca cifras, un lugar o una comparación.', 'Dos traen cantidades.'], 'Datos, ejemplo, analogía, datos'],
    ['¿Se comprueba?', 'Si alguien lo duda, ¿hay a dónde ir a mirar?', 'pinta-voces', '¿Hecho comprobable u opinión?', { doc: SIESTA, plumas: ['hecho', 'opinión'], lineas: ['Lo probaron un semestre.', 'Deberían permitir una siesta.', 'Participaron 300 estudiantes.', 'Ya es hora de intentarlo.'], va: [0, 1, 0, 1], mira: ['¿Hay registro?', '¿Informa o pide?', '¿Se puede contar?', '¿Informa o exige?'], bien: 'Exigir también es opinar.' }, 'El semestre y los 300 se verifican; «deberían» y «ya es hora» piden.', ['Pregunta si hay dónde comprobarlo.', 'Dos piden algo.'], 'Hechos: el semestre y los 300']],
    'Defiende la siesta con datos, un ejemplo y una analogía.', 'Qué defiende, por qué, y qué se puede verificar.');
  reto('siesta-2', ['pu-ag-1', 'pu-ag-2'], 3, 'La objeción y el tono', 'Conceder sin perder', 'La objeción, la concesión, la respuesta y la actitud.', [
    ['Las piezas', 'La respuesta puede llegar sin «pero».', 'pieza-argumento', 'Ata cada pieza a su oración.', { doc: SIESTA, lineas: ['Admito que veinte minutos son veinte minutos.', 'Los colegios deberían permitir una siesta.', 'Los cuadernos llenos de tachones cuentan el resto.', 'Hay quien piensa que es perder tiempo.'], tarjetas: ['tesis', 'objeción', 'concesión', 'respuesta'], va: [1, 3, 0, 2], mira: ['¿Qué se defiende?', '¿Qué diría el otro lado?', '¿Dónde se acepta una parte?', '¿Qué hecho contesta?'], bien: 'Un hecho respondió sin «pero».' }, 'Tesis: permitirla; objeción: perder tiempo; concesión: «Admito»; respuesta: los tachones.', ['Busca «deberían», «hay quien» y «admito».', 'Los tachones son un hecho que contesta.'], 'Tesis, objeción, concesión y respuesta'],
    ['La actitud', 'Quita la palabra: si el dato queda completo, solo mostraba actitud.', 'genero-o-cita', 'Si quitas lo que va entre paréntesis, ¿se pierde un dato o solo la actitud?', { rot: ['solo la actitud', 'un dato'], fichas: ['(Curiosamente), duermen los domingos.', 'Lo probaron (un semestre).', '(Por fortuna), bajaron las llegadas tarde.', 'Descansan (veinte) minutos.'], va: [0, 1, 0, 1], mira: ['Sin ella, ¿sabes menos?', 'Sin ella, ¿sabes menos?', 'Sin ella, ¿sabes menos?', 'Sin ella, ¿sabes menos?'], bien: 'Dos solo opinan.' }, '«Curiosamente» y «por fortuna» muestran actitud; semestre y veinte son datos.', ['Lee sin la palabra.', 'Dos no cambian el hecho.'], 'Actitud: curiosamente y por fortuna']],
    'Concede los veinte minutos y responde con los tachones; «curiosamente» ironiza.', 'Se concede, se responde con un hecho, y el adverbio opina.');

  // ------------------------------------------------------------------------------------------------------------- dos textos
  const LIBRO1 = D('papel', 'Leer en papel', null, [
    'Quien lee en papel recuerda mejor dónde estaba cada idea: arriba, al final, junto a una mancha de café. Varios estudios señalan que esa memoria del lugar puede ayudar a comprender.',
    'El papel, además, no interrumpe. Por supuesto, pesa y se acaba el espacio en la casa. Pero nadie recibe un mensaje en medio de una novela impresa.']);
  const LIBRO2 = D('pantalla', 'Leer en pantalla', null, [
    'En mi biblioteca rural hay dos estantes y cuatrocientos libros digitales. Para mis lectores, la pantalla no es un lujo: es el único lugar donde caben tantos libros.',
    'No niego que distrae. Los avisos están hechos para que uno los abra. Por eso enseño a apagarlos antes de leer. Y agrando la letra para quienes ya no ven la pequeña.']);
  const DOS = { doc: LIBRO1, docs: [LIBRO1, LIBRO2] };
  reto('libros-1', ['pu-dt-1'], 2, 'Papel y pantalla', 'En los dos o en uno', 'Dos textos sobre leer: qué comparten y cómo se sostienen.', [
    ['Coincidir', 'Una coincidencia está en los dos, aunque con otras palabras.', 'linea-vida', 'Lleva cada idea a donde está.', { ...DOS, rot: ['solo el Uno', 'los dos', 'solo el Dos'], fichas: ['Importa que nada interrumpa la lectura.', 'El lugar de la idea se recuerda.', 'Se puede agrandar la letra.', 'El papel pesa y ocupa espacio.'], va: [1, 0, 2, 0], mira: ['Busca las interrupciones en los dos.', 'Busca la memoria del lugar en los dos.', 'Busca la letra en los dos.', 'Busca el peso en los dos.'], bien: 'La distracción está en ambos.' }, 'Los dos se preocupan por las interrupciones; lo demás es de uno.', ['Abre los dos textos.', 'Uno dice «no interrumpe» y el otro enseña a apagar avisos.'], 'En los dos: evitar interrupciones'],
    ['Los respaldos', 'Mira quién habla: ¿estudios, otra persona o «yo»?', 'pista-tipo', 'Ata cada respaldo a su fragmento. Uno de los fragmentos es nuevo.', { ...DOS, lineas: ['Varios estudios señalan que puede ayudar.', 'En mi biblioteca hay dos estantes.', 'Un lector me contó que volvió a leer.'], tarjetas: ['experiencia propia', 'investigación', 'lo que cuenta otro'], va: [1, 0, 2], mira: ['Busca la primera persona.', 'Busca la ciencia.', 'Busca a alguien más.'], bien: 'Tres respaldos distintos.' }, '«Mi» es experiencia propia; los estudios, investigación; el lector, otro.', ['Busca «mi», «estudios» y «me contó».', 'La primera persona delata la experiencia.'], 'Propia, investigación, otro']],
    'Coinciden en evitar interrupciones.', 'Busca en los dos y compara con qué se sostienen.');
  reto('libros-2', ['pu-dt-2'], 3, '¿Qué diría el otro?', 'Su tesis como lente', 'Usa la tesis de cada uno y lo que concede.', [
    ['Quién lo diría', 'Que la frase no contradiga lo que ya dijo.', 'pinta-voces', '¿Quién lo diría?', { ...DOS, plumas: ['el autor Uno', 'el autor Dos', 'ninguno'], lineas: ['«Subrayo con lápiz y recuerdo la página.»', '«Sin pantalla, mis lectores tendrían dos estantes.»', '«Los avisos del celular ayudan a leer.»'], va: [0, 1, 2], mira: ['¿Quién defiende el lugar en la página?', '¿Quién habla de sus lectores?', '¿Alguno celebra los avisos?'], bien: 'Ninguno celebra los avisos.' }, 'Subrayar es del Uno; los estantes, del Dos; los avisos no los defiende nadie.', ['Recuerda qué defiende cada uno.', 'Los dos ven un problema en los avisos.'], 'Uno, Dos y ninguno'],
    ['Contra el Uno', 'Sirve lo que su autor sostiene o concede y choca con la tesis.', 'genero-o-cita', 'Alguien discute con el **Uno**. ¿Qué le sirve?', { ...DOS, rot: ['le sirve', 'no le sirve'], fichas: ['Uno: pesa y se acaba el espacio.', 'Dos: caben más libros.', 'Uno: se recuerda el lugar.', 'Dos: no niego que distrae.'], va: [0, 0, 1, 1], mira: ['El autor lo concede: ¿choca con su tesis?', '¿Choca con preferir el papel?', '¿Favorece o contradice al Uno?', '¿Favorece o contradice al Uno?'], bien: 'Una concesión también sirve.' }, 'El peso que concede y los libros que caben chocan; el lugar y la distracción favorecen al Uno.', ['Pregunta si choca con preferir papel.', 'El Uno concede algo en su contra.'], 'Sirven: el peso y los libros que caben']],
    'El Uno subraya, el Dos cuida sus lectores; contra el Uno sirve su concesión.', 'La tesis es el lente; lo concedido cuenta.');

  // -------------------------------------------------------------------------------------------------------------- referencia
  const PUENTE = D('puente', 'El puente y la barca', null, [
    'Durante años, la barca de Tulia y el puente de don Efrén se disputaron a los viajeros. Este cobraba por cruzar; aquella, por conversar. La mujer sabía todos los chismes del río; el hombre, todas las cuentas.',
    'Una creciente se llevó el paso. La estructura apareció kilómetros abajo, torcida. Don Efrén miró el hueco y no dijo nada; eso preocupó a todos.',
    'Tulia lo llevó gratis a la otra orilla. Él pagó el viaje de vuelta con una cuenta bien hecha; ella, con un chisme. Desde entonces trabajan juntos: la primera rema y el segundo cobra.']);
  reto('puente-1', ['pu-rf-1'], 2, 'A quién apunta', 'Atrás, reemplaza y lee', 'Pronombres que apuntan a personas, cosas y hechos.', [
    ['Este y aquella', 'Lo más cercano es «este»; lo más lejano, «aquella».', 'tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: PUENTE, texto: '|la barca de Tulia| y |el puente de don Efrén| se disputaron a |los viajeros|. Este cobraba por cruzar; aquella, por conversar.', tarjetas: ['«Este»', '«aquella»'], va: [1, 0], mira: ['Es masculino, singular y el más cercano.', 'Es femenina.'], bien: 'El género confirma.' }, '«Este» es el puente y «aquella», la barca.', ['Cuenta hacia atrás y mira el género.', 'Una es femenina.'], 'Este: puente. Aquella: barca'],
    ['Un hecho entero', '«Eso» no siempre es una cosa: puede ser algo que pasó.', 'tira-referente', 'Ata «eso» a aquello a lo que apunta.', { doc: PUENTE, texto: 'La estructura apareció |kilómetros abajo|. |Don Efrén| |miró el hueco y no dijo nada|; eso preocupó a todos.', tarjetas: ['«eso»'], va: [2], mira: ['¿Qué fue lo que preocupó: un lugar, una persona o un hecho?'], bien: 'Preocupó su silencio.' }, 'Lo que preocupó fue que mirara el hueco y callara.', ['Pon cada opción en vez de «eso».', 'Es algo que hizo, no algo que es.'], 'Eso: que miró y no dijo nada']],
    'Este es el puente, aquella la barca, y eso, el silencio.', 'Hacia atrás, reemplaza y lee.');
  reto('puente-2', ['pu-rf-2'], 3, 'Otros nombres y silencios', 'Lo que se sustituye y lo que se calla', 'Sustituciones y elipsis en el mismo texto.', [
    ['Otros nombres', 'Mira de qué se venía hablando.', 'pinta-voces', 'Pinta cada expresión según lo que nombra.', { doc: PUENTE, plumas: ['Tulia', 'don Efrén', 'el puente'], lineas: ['la mujer', 'la estructura torcida', 'el hombre de las cuentas', 'el paso que se llevó la creciente', 'la primera, que rema'], va: [0, 2, 1, 2, 0], mira: ['¿Quién sabía los chismes?', '¿Qué apareció río abajo?', '¿Quién cobraba?', '¿Qué se llevó el agua?', '¿Quién tiene la barca?'], bien: 'Cinco nombres, tres cosas.' }, 'La mujer y la primera son Tulia; el hombre, don Efrén; la estructura y el paso, el puente.', ['Busca cada expresión en el texto.', 'Dos nombran el puente.'], 'Tulia, puente, Efrén, puente, Tulia'],
    ['Lo callado', 'Lo que falta está en la primera mitad.', 'cambia-tipo', 'Escribe completo lo que calla «ella, con un chisme». Sobran fichas.', { de: 'con elipsis', antes: 'Él pagó el viaje de vuelta con una cuenta bien hecha; ella, con un chisme.', frase: 'Ella [0] [1] con un chisme.', rot: ['¿qué hizo?', '¿qué cosa?'], fichas: ['pagó', 'el viaje de vuelta', 'cobró', 'la creciente'], va: [0, 1, null, null], mira: ['Es el verbo de la primera mitad.', 'Es lo que se pagó.', 'En esa oración nadie cobra.', 'Eso no se paga.'], bien: 'La coma guardó «pagó el viaje de vuelta».' }, 'Se calló «pagó el viaje de vuelta».', ['Mira la primera mitad.', 'La coma guarda un verbo y su objeto.'], 'Callado: pagó el viaje de vuelta']],
    'La estructura es el puente; y se calló «pagó el viaje».', 'Otro nombre o un silencio: los dos apuntan a lo ya dicho.');

  // --------------------------------------------------------------------------------------------------------------- figurado
  const SEQUIA = D('sequia', 'La quebrada cansada', null, [
    'La quebrada está cansada: baja arrastrando los pies entre las piedras. Es un hilo de plata que alguien dejó caer. Los sauces, como abuelas inclinadas, le buscan la cara.',
    'En el pueblo llevamos mil años esperando el acueducto. La oficina, veloz como siempre, ya imprimió el tercer afiche. En él, un niño sonríe bajo un chorro que nadie ha visto.',
    'El señor secretario inauguró, con la solemnidad de quien descubre un océano, una llave. La llave no tiene agua, pero brilla.']);
  reto('sequia-1', ['pu-lf-1'], 2, 'Las imágenes de la quebrada', 'Nombra y traduce', 'Reconoce la figura y di qué quiere decir.', [
    ['La figura', 'Busca «como»; si no está, mira si es, si es humano o si exagera.', 'pinta-tipos', 'Pinta cada frase según su figura.', { doc: SEQUIA, plumas: ['metáfora', 'comparación', 'personificación', 'hipérbole'], lineas: ['La quebrada está cansada.', 'Es un hilo de plata.', 'Los sauces, como abuelas inclinadas.', 'Llevamos mil años esperando.'], va: [2, 0, 1, 3], mira: ['¿Quién se cansa?', '¿Dice que es o dice «como»?', '¿Dice que es o dice «como»?', '¿Se puede esperar tanto?'], bien: 'Cuatro figuras.' }, 'Cansarse es humano; «es un hilo», metáfora; «como abuelas», comparación; mil años, hipérbole.', ['Busca primero el «como».', 'Una exagera y otra da algo humano.'], 'Personificación, metáfora, comparación, hipérbole'],
    ['Qué quiere decir', 'Traduce la imagen sin agregarle.', 'talla-idea', '«Es un hilo de plata que alguien dejó caer». Pon cada versión en su talla.', { doc: SEQUIA, p: 1, rot: ['al pie de la letra', 'justa', 'dice de más'], fichas: ['A alguien se le cayó una joya.', 'Baja muy poca agua, y brilla.', 'El agua se acabó para siempre.'], va: [0, 1, 2], mira: ['¿Habla de una joya?', 'Un hilo es delgado: ¿qué dice del agua?', '¿Dice que se acabó?'], luz: [[1, 'Es un hilo de plata']], bien: 'Poca y brillante.' }, 'Un hilo es poca agua; la plata, que brilla. Ni joya ni fin.', ['¿Cómo es un hilo? ¿Y la plata?', 'Delgado y brillante.'], 'Hilo de plata: poca agua que brilla']],
    'La quebrada lleva muy poca agua.', 'Nombra la figura y tradúcela sin agregar.');
  reto('sequia-2', ['pu-lf-2'], 3, 'La ironía del acueducto', 'Compara con los hechos', 'Ironías evidentes y sutiles, y lo que de verdad se piensa.', [
    ['¿En serio?', 'Compara cada frase con los hechos del texto.', 'pinta-voces', '¿Con ironía o en serio, como un dato?', { doc: SEQUIA, plumas: ['con ironía', 'en serio'], lineas: ['La oficina, veloz como siempre.', 'La llave no tiene agua.', 'Imprimió el tercer afiche.', 'Con la solemnidad de quien descubre un océano.'], va: [0, 1, 1, 0], mira: ['¿Los hechos muestran que sea veloz?', '¿Se puede comprobar?', '¿Se puede comprobar?', '¿El tono va con una llave?'], bien: 'Los hechos van en serio.' }, 'La llave seca y el afiche son hechos; «veloz» y la solemnidad, ironía.', ['Busca qué se puede comprobar.', 'Dos son datos.'], 'Ironía: veloz y la solemnidad'],
    ['Lo que piensa', 'Dale la vuelta al elogio.', 'pista-tipo', 'Ata lo que se **piensa** a lo que se **dice**.', { doc: SEQUIA, lineas: ['La oficina, veloz como siempre.', 'Inauguró, como quien descubre un océano, una llave.', 'La llave no tiene agua, pero brilla.'], tarjetas: ['se demoran', 'exageran algo pequeño', 'importa más la apariencia'], va: [0, 1, 2], mira: ['¿Cuál alaba la rapidez?', '¿Cuál pone un tono enorme?', '¿Cuál muestra algo bonito que no sirve?'], bien: 'Debajo del elogio.' }, '«Veloz» dice que tardan; el océano, que exageran; el brillo, que es apariencia.', ['Dale la vuelta a cada una.', 'Una llave seca que brilla no sirve.'], 'Tardan, exageran, apariencia']],
    'Se burla de la demora y de la apariencia.', 'La ironía choca con los hechos o con el tono.');
}
;
//#archivo js/gimnasio-mate.js
// Gimnasio de Álgebra y Trigonometría (spec 2026-11-25-explora-algebra-trigonometria, pruebas tests/gimnasio-mate.test.js): un reto de
// Fuerza y uno de Élite por mundo, con las escenas de alg-escena.js y trig-escena.js. Va después de gimnasio-lectura.js.
{
  // Un paso: [título, entrenador, juego, enunciado, datos, explicación, [ayuda, ayuda], nota].
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-m-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, p, explain, hints, note]) => {
      const params = p.metas && p.et ? { mira: p.metas.map(() => hints[0]), trampas: {}, ok: 'Así se arma.', fichas: [...p.metas, ...p.sobra], ...p } : { mira: hints[0], ok: 'Esa era la posición.', ...p };
      return { title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note };
    }) });
  const F = (et, metas, sobra, x = {}) => ({ et, metas, sobra, ...x });
  const ks = (...l) => l;

  // ----------------------------------------------------------------------------------------------- Álgebra
  reto('conjuntos-1', ['alg-0b', 'alg-0c'], 2, 'Pasaportes y maletas', 'Empieza por lo común', 'De 60 viajeros, 38 llevan maleta, 27 morral y 11 las dos cosas. ¿Cuántos llevan solo una y cuántos, ninguna?', [
    ['Las tres zonas', 'Lo común está contado en los dos grupos. Réstalo a cada uno.', 'fichas-venn', 'De **60** viajeros, **38** llevan maleta (A), **27** morral (B) y **11** las dos. Llena.', F(['solo A', 'solo B', 'ninguna'], ['27', '16', '6'], ['38', '11', '22'], { z: ['', '11', '', ''] }), '$38 - 11 = 27$, $27 - 11 = 16$ y $60 - 54 = 6$.', ['Quita los 11 a cada total.', 'Suma las tres zonas y compara con los 60.'], 'solo A 38 − 11, solo B 27 − 11, afuera: lo que falta = 6'],
    ['Solo una', 'Solo una cosa junta las dos puntas, sin el centro.', 'fichas-venn', '¿Cuántos llevan **exactamente una** cosa y cuántos **alguna**?', F(['una', 'alguna'], ['43', '54'], ['65', '11', '49'], { z: ['27', '11', '16', '6'] }), '$27 + 16 = 43$ y $43 + 11 = 54$.', ['Suma las dos puntas.', 'Para «alguna» agrega el centro.'], 'una: puntas; alguna: puntas y centro = 54']],
    '43 llevan solo una, 11 las dos y 6 ninguna.', 'Primero el centro; lo demás se calcula quitándolo.');
  reto('conjuntos-2', ['alg-0b', 'alg-0c'], 3, 'El solape y los subconjuntos', 'Mueve hasta que cuadre', 'La unión de A (14) y B (9) tiene 18 elementos. ¿Cuántos comparten, y cuántos subconjuntos tiene lo común?', [
    ['El solape', 'Si no compartieran nada, la unión sería la suma. Corre B hasta que cuadre.', 'solapa-conjuntos', 'A tiene **14** y B **9**; la unión tiene **18**. Mueve cuántos comparten.', { a: 14, b: 9, ks: ks(['i', 0, 9, 'comparten']), v: { i: 0 }, meta: { i: 5 } }, '$14 + 9 - 5 = 18$.', ['La suma se pasa de 18: lo que sobra se contó dos veces.', 'Suma los dos y compara con 18.'], '14 + 9 − unión = 5'],
    ['Las partes', 'Cada elemento puede ir o no ir.', 'fichas-torre', 'El común tiene **5** elementos. Pon cuántos subconjuntos tiene y cuántos **no vacíos**.', F(['todos', 'no vacíos'], ['32', '31'], ['10', '25', '16'], { n: 5, b: '2', cap: 'ir o no ir' }), '$2^5 = 32$ y se quita el vacío.', ['Dos opciones por elemento.', 'Multiplica cinco veces por 2.'], '2⁵ y uno menos = 31']],
    'Comparten 5 y hay 32 subconjuntos.', 'Suma, quita lo repetido; y por cada elemento, duplica.');
  reto('recta-1', ['alg-11', 'alg-12c'], 2, 'El ascensor del hotel', 'Un movimiento a la vez', 'Un ascensor está en el −3, sube 8 y baja 11. ¿Dónde queda? Y si baja 4 pisos por minuto, ¿dónde estaba hace 3 minutos?', [
    ['Sube y baja', 'Sigue cada movimiento desde donde quedó.', 'fichas-recta', 'Desde **−3**, sube **8** y luego baja **11**. Pon los dos pisos.', F(['sube', 'baja'], ['5', '−6'], ['11', '−5', '6'], { pts: [-3] }), '$-3 + 8 = 5$ y $5 - 11 = -6$.', ['Ocho pasos a la derecha desde −3.', 'Desde ahí, once a la izquierda: cruza el cero.'], '−3 + 8 y luego − 11 = −6'],
    ['Hacia atrás', 'Bajar es velocidad negativa; hace 3 minutos es tiempo negativo.', 'fichas-recta', 'Baja **4** pisos por minuto y ahora está en **−6**. ¿Cuánto más arriba estaba hace **3** minutos y en qué piso?', F(['más arriba', 'piso'], ['12', '6'], ['−12', '−18', '7'], { pts: [-6] }), '$(-4)(-3) = 12$ y $-6 + 12 = 6$.', ['Negativo por negativo.', 'Suma ese número al piso de ahora.'], '(−4)(−3), y −6 más eso = 6']],
    'Queda en el −6; hace tres minutos estaba en el 6.', 'Dos negativos se voltean dos veces.');
  reto('recta-2', ['alg-12d'], 3, 'Tolerancias', 'Centro y distancia', 'Una pieza sirve entre −7 y 3. Escríbelo como distancia y luego resuelve una desigualdad que se voltea.', [
    ['Centro y radio', 'El centro está en la mitad de los bordes.', 'tramo-recta', 'Arma el tramo de **−7** a **3**: pon centro y distancia.', { ks: ks(['c', -4, 4, 'centro'], ['r', 1, 6, 'distancia']), v: { c: 0, r: 1 }, meta: { c: -2, r: 5 } }, 'El medio es $-2$ y cada borde está a 5.', ['Promedia los dos bordes.', 'Cuenta del centro a un borde.'], '|x + 2| ≤ la distancia = 5'],
    ['Se voltea', 'Al dividir entre un negativo cambia el sentido.', 'fichas-recta', 'Resuelve $-3x + 4 < 19$. Pon a cuánto es menor $-3x$ y de qué es **mayor** x.', F(['−3x <', 'x >'], ['15', '−5'], ['23', '5', '−15'], { pts: [] }), '$-3x < 15$, entonces $x > -5$.', ['Primero quita el 4.', 'Divide entre −3 y voltea el signo.'], '−3x < 15, x > lo que da = −5']],
    'La pieza cumple |x + 2| ≤ 5; y x > −5.', 'Tramo: centro y distancia. Negativo: se voltea.');
  reto('escalas-1', ['alg-12', 'alg-12e'], 2, 'La receta para la fiesta', 'Cuánto vale una parte', 'Un jugo lleva mora y agua 2 : 7. Para 45 vasos, ¿cuántos de cada uno? ¿Y cuánta agua para 14 de mora?', [
    ['Las partes', 'Junta las partes y reparte el total.', 'fichas-barra', 'Mora y agua **2 : 7**, **45** vasos. Completa.', F(['una parte', 'mora', 'agua'], ['5', '10', '35'], ['9', '14', '7'], { segs: [[2, 'mora', 'fa'], [7, 'agua', 'fg']] }), 'Nueve partes de 5 vasos.', ['¿Cuántas partes iguales hay?', 'Reparte 45 entre ellas.'], '45 ÷ 9 vasos por parte; agua = 35'],
    ['Otra cantidad', 'La razón se conserva: lo que multiplica a una, multiplica a la otra.', 'fichas-barra', 'Con **14** de mora, ¿por cuánto se multiplicó y cuánta agua va?', F(['veces', 'agua'], ['7', '49'], ['12', '19', '28'], { segs: [[2, '14', 'fa'], [7, '?', 'fg']] }), '$14 \\div 2 = 7$ y $7 \\cdot 7 = 49$.', ['¿Cuántas veces cabe el 2 en 14?', 'Multiplica el 7 por eso.'], '14 ÷ 2 veces; agua = 49']],
    '10 de mora y 35 de agua; con 14, 49.', 'Halla una parte y vuelve a armar.');
  reto('escalas-2', ['alg-13c', 'alg-13d'], 3, 'El precio de vuelta', 'Factor y división', 'Una bici sube 25 % y después baja 20 %. ¿Cuánto cambió? Y si otra quedó en 84 tras bajar 30 %, ¿cuánto valía?', [
    ['En cadena', 'Cada cambio es un factor. Multiplícalos.', 'fichas-barra', 'De 100: sube **25 %** y baja **20 %**. Pon cada valor.', F(['tras subir', 'al final'], ['125', '100'], ['105', '95', '120'], { segs: [[100, '100', 'fa']] }), '$1.25 \\cdot 0.8 = 1$: vuelve al comienzo.', ['Primero 100 por 1.25.', 'Toma el 80 % de eso.'], '1.25 por 0.8 vuelve al comienzo'],
    ['Hacia atrás', '84 no es el 100 %: es lo que quedó.', 'barra-factor', 'El precio nuevo es **84** y es el **70 %** del viejo. Mueve el viejo en la barra de abajo.', { base: 84, rb: 'queda', T: 150, ks: ks(['x', 80, 150, 'precio viejo', 5]), v: { x: 80 }, meta: { x: 120 } }, '$84 \\div 0.7 = 120$.', ['El 10 % es 84 entre 7.', 'Diez veces ese 10 %.'], '84 ÷ 0.7 = 120']],
    'Queda igual; y la otra valía 120.', 'Adelante se multiplica; atrás se divide.');
  reto('potencias-1', ['alg-21a', 'alg-21b'], 2, 'Cajas dentro de cajas', 'Cuenta factores', 'Simplifica una expresión con potencias contando factores.', [
    ['Juntar', 'Juntar suma exponentes; un paquete repetido los multiplica.', 'fichas-torre', '$(x^3)^2 \\cdot x^4$: pon el exponente del paquete y el total.', F(['(x³)²', 'total'], ['6', '10'], ['5', '9', '24'], { n: 4, cap: 'paquetes' }), '$3 \\cdot 2 = 6$ y $6 + 4 = 10$.', ['Dos paquetes de tres.', 'Suma los cuatro que faltan.'], 'x⁶ · x⁴: exponente = 10'],
    ['Quitar', 'Dividir quita factores; si faltan, quedan abajo.', 'fichas-torre', '$\\tfrac{x^{10}}{x^{13}}$ y $\\tfrac{(2x)^3}{x}$: pon el exponente de la primera, y el número y el exponente de la segunda.', F(['1.ª', 'número', 'x a la'], ['−3', '8', '2'], ['3', '6', '4'], { n: 3, cap: 'se cancelan' }), '$10 - 13 = -3$; $8x^3 \\div x = 8x^2$.', ['Resta los exponentes en orden.', 'El 3 también entra al 2.'], 'x⁻³; y 8x al exponente = 2']],
    'Quedan x a la 10, x a la −3 y 8x².', 'Las leyes solo cuentan factores.');
  reto('potencias-2', ['alg-22a', 'alg-22b'], 3, 'El lote y los radicales', 'Saca parejas', 'Un lote cuadrado usa 81 losas: ¿cuánto mide su lado? ¿Y cuánto da √98 − √32?', [
    ['El lado', 'El lado es el número que al cuadrado da el área.', 'lado-area', 'Un lote cuadrado usa **81** losas. Mueve el lado.', { ks: ks(['s', 1, 10, 'lado']), v: { s: 2 }, meta: { s: 9 } }, '$9^2 = 81$.', ['Busca un número por sí mismo.', 'Prueba con 8: ¿se queda corto?'], 'raíz de 81 = 9'],
    ['Simplificar', 'De cada pareja de factores iguales sale uno.', 'fichas-torre', '$\\sqrt{98} - \\sqrt{32}$: simplifica al máximo cada una y resta.', F(['√98', '√32', 'resta'], ['7√2', '4√2', '3√2'], ['√66', '2√8', '11√2'], { n: 2, b: '7', cap: '98 = 2 · 7 · 7' }), '$7\\sqrt2 - 4\\sqrt2 = 3\\sqrt2$.', ['98 es 49 por 2 y 32 es 16 por 2.', 'Resta los números de afuera.'], 'las dos en veces de √2: 7 − 4']],
    'El lado es 9 y la resta, 3√2.', 'Parejas afuera; se suman raíces iguales.');
  reto('sucesiones-1', ['alg-14', 'alg-14b'], 2, 'Las graderías', 'Un salto menos', 'Una gradería empieza con 9 sillas y suma 4 por fila. ¿Cuántas hay en la fila 12 y en total?', [
    ['La fila', 'De la primera a la doce hay once saltos.', 'fichas-escalera', 'Empieza en **9** y suma **4**. Pon los saltos y la fila **12**.', F(['saltos', 'fila 12'], ['11', '53'], ['12', '57', '48'], { xs: [9, 13, 17, 21, 25] }), '$9 + 11 \\cdot 4 = 53$.', ['Un salto menos que filas.', 'Los saltos por 4, más la primera.'], '9 + 11 · 4 = 53'],
    ['El total', 'Dos escaleras hacen un rectángulo.', 'fichas-escalera', 'De 9 a 53, **12** filas. Pon primera más última y el total.', F(['1.ª + última', 'total'], ['62', '372'], ['44', '744', '636'], { xs: [9, 13, 17, 21, 25] }), '$\\tfrac{12 \\cdot 62}{2} = 372$.', ['Suma las puntas.', 'Por doce y a la mitad.'], '12 · 62 ÷ 2 = 372']],
    'La fila 12 tiene 53 y en total son 372.', 'Saltos para el término; puntas para la suma.');
  reto('sucesiones-2', ['alg-14c', 'alg-14d', 'alg-15'], 3, 'La pelota que rebota', 'La razón manda', 'Encuentra la razón y la suma de infinitos rebotes.', [
    ['La razón', 'Cada paso multiplica por lo mismo.', 'escalera-salto', 'Empieza en **2** y el **cuarto** término es **54**. Mueve la razón.', { geo: 1, a: 2, n: 4, top: 60, ks: ks(['d', 1, 4, 'razón']), v: { d: 1 }, meta: { d: 3 } }, '$2 \\cdot 3^3 = 54$.', ['¿Cuántas veces cabe 2 en 54?', 'Eso es la razón multiplicada tres veces.'], '54 ÷ 2 = 27; razón = 3'],
    ['Infinitos', 'Si cada rebote se encoge, la suma no crece sin fin.', 'fichas-escalera', 'Rebotes de **15**, **6**, **2.4**… Pon la razón, $1 - r$ y la suma.', F(['r', '1 − r', 'suma'], ['0.4', '0.6', '25'], ['2.5', '9', '37.5'], { xs: [15, 6, 2.4] }), '$15 \\div 0.6 = 25$.', ['Divide 6 entre 15.', 'El primero entre lo que le falta a r para 1.'], '15 ÷ 0.6 = 25']],
    'La razón es 3; y los rebotes suman 25.', 'Razón entre vecinos; con |r| < 1 hay suma.');
  reto('polinomios-1', ['alg-23a', 'alg-3'], 2, 'El mural', 'Llena el rectángulo', 'Un mural mide x + 8 por x + 3. Halla su área. Luego desarrolla el cuadrado de 2x − 5.', [
    ['El área', 'Cuatro pedazos: todos con todos.', 'fichas-area', '$(x + 8)(x + 3)$: pon el coeficiente de x y el número.', F(['de x', 'número'], ['11', '24'], ['5', '83', '16'], { t: ['x²', '8x', '3x', '?'] }), '$x^2 + 11x + 24$.', ['Junta las dos barras.', 'La esquina es 8 por 3.'], '8x + 3x; esquina = 24'],
    ['El cuadrado', 'En un cuadrado las dos barras son iguales.', 'fichas-area', '$(2x - 5)^2$: pon los tres coeficientes.', F(['x²', 'x', 'número'], ['4', '−20', '25'], ['2', '−10', '−25'], {}), '$4x^2 - 20x + 25$.', ['El 2 también se eleva.', 'Dos veces 2x por 5, con su signo.'], '4x² − 20x + lo de la esquina = 25']],
    'x² + 11x + 24 y 4x² − 20x + 25.', 'Todos con todos; y dos barras iguales.');
  reto('polinomios-2', ['alg-24b', 'alg-24c'], 3, 'De vuelta a los lados', 'Suma y producto', 'Factoriza repartiendo barras y halla un término de Newton.', [
    ['Los lados', 'Reparte las barras hasta que la esquina cierre.', 'rectangulo-barras', '$x^2 + 9x + 14$: reparte 9 barras (más al lado).', { ks: ks(['p', 1, 8, 'al lado'], ['q', 1, 5, 'abajo']), v: { p: 1, q: 1 }, meta: { p: 7, q: 2 } }, '$(x + 7)(x + 2)$.', ['Las barras son la suma; la esquina, el producto.', 'Prueba los divisores de 14.'], '7 + 2 y 7 · 2 = 14'],
    ['Newton', 'El coeficiente cuenta maneras; no olvides la potencia del 2.', 'fichas-fraccion', 'En $(x + 2)^6$, el término con $x^4$: pon las maneras y el coeficiente.', F(['maneras', 'coeficiente'], ['15', '60'], ['6', '30', '20'], { cap: '(x + 2)⁶' }), '$\\binom62 \\cdot 4 = 60$.', ['Dos de seis: 6 · 5 entre 2.', 'Por 2 al cuadrado.'], 'C(6, 2) · 2² = 60']],
    '(x + 7)(x + 2) y 60x⁴.', 'Suma y producto; maneras por potencia.');
  reto('parabolas-1', ['alg-4a', 'alg-1'], 2, 'El arco del puente', 'Vértice primero', 'Ubica una parábola por su vértice y lee sus coeficientes.', [
    ['El vértice', 'Mueve hasta cubrir la sombra.', 'vertice-mueve', 'Lleva la parábola sobre la **punteada**.', { a: 0.5, ks: ks(['h', -4, 4, 'h'], ['k', -4, 4, 'k']), v: { h: 0, k: 0 }, meta: { h: 3, k: -2 } }, 'Vértice $(3, -2)$: $y = \\tfrac12(x - 3)^2 - 2$.', ['Mira el punto más bajo de la sombra.', 'h es a la derecha; k, hacia abajo.'], 'vértice en x = 3 y en y = −2'],
    ['Desde la fórmula', 'El eje está en menos b sobre dos a.', 'fichas-parabola', '$y = -x^2 + 4x + 1$: pon h y k.', F(['h', 'k'], ['2', '5'], ['−2', '4', '1'], { f: [-1, 4, 1] }), '$h = 2$ y $-4 + 8 + 1 = 5$.', ['Divide −4 entre −2.', 'Evalúa la función ahí.'], 'h = 2; al evaluar, k = 5']],
    'Vértices (3, −2) y (2, 5).', 'El vértice ubica toda la parábola.');
  reto('parabolas-2', ['alg-4', 'alg-23c'], 3, 'Raíces que se ven y que no', 'El discriminante decide', 'Una ecuación corta el eje y la otra no. Halla todas sus raíces.', [
    ['Cortes', 'Factoriza o usa la fórmula.', 'fichas-parabola', '$x^2 - 2x - 3 = 0$: pon el discriminante y las raíces, la menor primero.', F(['b²−4ac', 'menor', 'mayor'], ['16', '−1', '3'], ['−8', '1', '−3'], { f: [1, -2, -3] }), '$4 + 12 = 16$: $x = \\tfrac{2 \\pm 4}{2}$.', ['Cuidado con el signo de −4ac.', 'La raíz de 16 es 4.'], 'x = (2 ± 4) ÷ 2: mayor = 3'],
    ['Sin cortes', 'Negativo: las raíces son complejas y van en pareja.', 'fichas-parabola', '$x^2 - 4x + 5 = 0$: pon el discriminante y, en $a \\pm bi$, a y b.', F(['b²−4ac', 'a', 'b'], ['−4', '2', '1'], ['36', '4', '5'], { f: [1, -4, 5] }), '$\\tfrac{4 \\pm 2i}{2} = 2 \\pm i$.', ['16 menos 20.', 'La raíz de −4 es 2i; todo entre 2.'], '(4 ± 2i) ÷ 2; a = 2, b = 1']],
    '−1 y 3; y 2 ± i.', 'El discriminante dice si hay cortes.');
  reto('raices-1', ['alg-92', 'alg-23b'], 2, 'El residuo sin dividir', 'Evalúa', 'Usa el valor del polinomio para hallar residuos y raíces.', [
    ['La raíz', 'Un factor x − c da cero en c.', 'toca-raiz', '$P(x) = x^3 - 4x^2 + x + 6$. Mueve x a la raíz **mayor**.', { c: [1, -4, 1, 6], ks: ks(['x', -3, 4, 'x']), v: { x: 0 }, meta: { x: 3 } }, '$27 - 36 + 3 + 6 = 0$.', ['Prueba los divisores de 6.', 'La mayor es positiva y menor que 4.'], 'P en x da cero cuando x = 3'],
    ['El cociente', 'La sintética baja, multiplica y suma.', 'fichas-cubica', 'Divide $x^3 - 4x^2 + x + 6$ entre $x - 3$: pon la fila de abajo.', F(['1.º', '2.º', '3.º', 'residuo'], ['1', '−1', '−2', '0'], ['3', '−7', '2'], { r: [-1, 2, 3] }), '$x^2 - x - 2$, exacto.', ['Baja el 1 y multiplica por 3.', '−4 + 3; 1 − 3; 6 − 6.'], '1, −1, −2 y residuo = 0']],
    'La raíz mayor es 3 y el cociente, x² − x − 2.', 'P(c) es el residuo.');
  reto('raices-2', ['alg-93'], 3, 'Armar el polinomio', 'Raíces y multiplicidad', 'De una gráfica a sus factores.', [
    ['Leer', 'Donde cruza hay una raíz.', 'fichas-cubica', 'La curva corta en tres enteros. Ponlos de menor a mayor. (Cada columna vale 1.)', F(['1.º', '2.º', '3.º'], ['−2', '0', '3'], ['2', '−3', '1'], { r: [-2, 0, 3], k: 0.8 }), 'Cruza en −2, 0 y 3.', ['El eje vertical es el 0.', 'Cuenta columnas desde el centro.'], 'cortes: −2, 0 y = 3'],
    ['Contar', 'Par rebota; impar cruza; suman el grado.', 'fichas-fraccion', '$x^2(x - 5)^3(x + 2)^4$: pon el grado, cuántas raíces distintas hay y en cuántas rebota.', F(['grado', 'distintas', 'rebota'], ['9', '3', '2'], ['24', '4', '1'], { cap: 'x² (x − 5)³ (x + 2)⁴' }), '$2 + 3 + 4 = 9$; pares en 0 y −2.', ['Suma los exponentes.', 'Rebota donde el exponente es par.'], 'grado 9; rebota en dos raíces = 2']],
    'Cortes −2, 0 y 3; grado 9.', 'La multiplicidad dice si cruza o rebota.');
  reto('fracciones-1', ['alg-25a', 'alg-25b'], 2, 'Cancelar y sumar', 'Factoriza primero', 'Simplifica una fracción algebraica y suma otras dos.', [
    ['Cancelar', 'Solo se cancelan factores.', 'fichas-fraccion', '$\\tfrac{x^2 - 16}{x^2 - 4x}$ simplificada: pon arriba y abajo.', F(['arriba', 'abajo'], ['x + 4', 'x'], ['x − 4', '4', '4x'], { cap: '(x² − 16) / (x² − 4x)' }), '$\\tfrac{(x-4)(x+4)}{x(x-4)}$.', ['Arriba, diferencia de cuadrados.', 'Abajo, factor común x.'], '(x + 4) sobre x'],
    ['Sumar', 'Lo que le falta a cada una, arriba y abajo.', 'fichas-fraccion', '$\\tfrac{3}{x} + \\tfrac{2}{x - 1}$ sobre $x(x - 1)$: arriba queda $\\square x - \\square$.', F(['de x', 'se resta'], ['5', '3'], ['6', '1', '2'], { cap: '3/x + 2/(x − 1)' }), '$3(x - 1) + 2x = 5x - 3$.', ['El numerador multiplica a todo x − 1.', 'Junta 3x y 2x.'], '3x − 3 + 2x; se resta = 3']],
    '(x + 4)/x y (5x − 3)/(x(x − 1)).', 'Factoriza, cancela y busca el común.');
  reto('fracciones-2', ['alg-101', 'alg-102'], 3, 'El cruce', 'Cumplir las dos', 'Encuentra el punto común y desarma una fracción.', [
    ['El punto', 'El punto debe estar en las dos rectas.', 'cruce-rectas', 'Lleva el punto al cruce de $y = 2x - 1$ y $y = -x + 8$.', { m: 2, b: -1, n: -1, d: 8, ks: ks(['x', 0, 8, 'x'], ['y', 0, 8, 'y']), v: { x: 1, y: 1 }, meta: { x: 3, y: 5 } }, '$2x - 1 = 8 - x$: $x = 3$, $y = 5$.', ['Iguala las dos expresiones.', 'Vuelve por la y con cualquiera.'], '3x = 9; x = 3, y = 5'],
    ['Desarmar', 'Escoge x que apague una letra.', 'fichas-fraccion', '$\\tfrac{8x + 1}{(x + 1)(x - 6)} = \\tfrac{A}{x + 1} + \\tfrac{B}{x - 6}$. Pon A y B.', F(['A', 'B'], ['1', '7'], ['−7', '8', '49'], { cap: 'A/(x + 1) + B/(x − 6)' }), 'En $x = -1$: $-7 = -7A$; en $x = 6$: $49 = 7B$.', ['Con x = 6 se apaga A.', 'Con x = −1 se apaga B.'], '49 = 7B, −7 = −7A; B = 7']],
    '(3, 5); A = 1 y B = 7.', 'Iguala; y apaga letras.');
  reto('expo-1', ['alg-71', 'alg-13b'], 2, 'La laguna y el ahorro', 'Multiplica cada paso', 'Un alga se duplica y un ahorro gana interés compuesto.', [
    ['La curva', 'En x = 0 la curva vale a.', 'curva-crece', 'Lleva $y = a \\cdot 2^x$ sobre la **punteada**.', { b: 2, ks: ks(['a', 1, 6, 'a']), v: { a: 1 }, meta: { a: 3 } }, 'Corta el eje en 3: $a = 3$.', ['Mira dónde corta la punteada el eje vertical.', 'Cada cuadro vale 2 hacia arriba.'], 'en x = 0 vale a = 3'],
    ['El ahorro', 'Cada año multiplica por lo mismo.', 'fichas-crece', '400 mil al **5 %** anual compuesto. Pon el factor, y el monto al año y a los dos años (miles).', F(['factor', '1 año', '2 años'], ['1.05', '420', '441'], ['0.05', '440', '405'], { xs: [400] }), '$400 \\cdot 1.05 = 420$ y $420 \\cdot 1.05 = 441$.', ['Sumar 5 % es multiplicar por un factor mayor que 1.', 'El segundo 5 % es de 420.'], '400 · 1.05 · 1.05 = 441']],
    'a = 3 y el ahorro llega a 441 mil.', 'Cada paso multiplica por el mismo factor.');
  reto('expo-2', ['alg-72', 'alg-73'], 3, 'La pregunta del exponente', 'Misma base o logaritmo', 'Resuelve con logaritmos y con bases iguales.', [
    ['Logaritmos', '¿A qué exponente?', 'fichas-crece', 'Pon cada logaritmo.', F(['log₂ 32', 'log₄ 8', 'log₃ 1/9'], ['5', '3/2', '−2'], ['16', '2', '1/2'], { xs: [2, 4, 8, 16, 32] }), '$2^5$; $4^{3/2} = 8$; $3^{-2}$.', ['Escribe cada número como potencia.', '4 y 8 son potencias de 2.'], '5; 3/2; y para 1/9 = −2'],
    ['La ecuación', 'Junta en un solo logaritmo y descarta lo que no exista.', 'fichas-fraccion', '$\\log_2 x + \\log_2 (x + 6) = 4$: pon a qué es igual $x(x + 6)$, x, y la raíz que se descarta.', F(['x(x+6)', 'x', 'se descarta'], ['16', '2', '−8'], ['4', '8', '−2'], { cap: 'log₂ x(x + 6) = 4' }), '$x^2 + 6x - 16 = (x + 8)(x - 2)$.', ['Dos a la cuarta.', 'Un logaritmo no acepta negativos.'], 'x² + 6x = 16; se descarta = −8']],
    '5, 3/2 y −2; y x = 2.', 'Pregunta el exponente; revisa el dominio.');

  // ----------------------------------------------------------------------------------------------- Trigonometría
  reto('ondas-1', ['trig-41a', 'trig-41b'], 2, 'La rueda del molino', 'Radianes para todo', 'Un aspa de 9 m gira −210°: ¿dónde queda? ¿Y qué arco recorre si gira 80°?', [
    ['Dónde queda', 'Quita vueltas hasta quedar en una sola.', 'coterminal-rueda', 'El aspa giró **−210°**. Lleva el punto a donde quedó.', { metas: [150] }, '$-210^\\circ + 360^\\circ = 150^\\circ$.', ['Gira en el sentido del reloj.', 'Suma una vuelta completa.'], '−210° + una vuelta = 150°'],
    ['El arco', 'Primero radianes; luego radio por ángulo.', 'arco-cuenta', 'Un aspa de **9 m** gira **80°**. Pon el ángulo en radianes y el arco.', F(['radianes', 'arco'], ['4π/9', '4π'], ['9π/4', '720', '8π'], { g: 80, cap: '80°' }), '$\\tfrac{80\\pi}{180} = \\tfrac{4\\pi}{9}$ y $9 \\cdot \\tfrac{4\\pi}{9} = 4\\pi$.', ['Simplifica 80 sobre 180.', 'Multiplica por el radio.'], '9 · 4π/9 = 4π']],
    'Queda en 150°; con 80° recorre 4π m.', 'En radianes, arco es radio por ángulo.');
  reto('ondas-2', ['trig-3', 'trig-43b'], 3, 'Espejos de la rueda', 'Referencia y signo', 'Encuentra parejas de ángulos y valores exactos.', [
    ['Las parejas', 'Misma altura, uno a cada lado.', 'gemelos-seno', 'Marca los dos ángulos con $\\operatorname{sen}\\theta = -\\tfrac{\\sqrt3}{2}$.', { metas: [240, 300], linea: ['y', -0.866] }, 'Referencia 60° debajo del eje.', ['Debajo del eje, a cada lado.', 'La referencia es la de raíz de tres medios.'], 'dos ángulos bajo el eje; el mayor = 300°'],
    ['Los valores', 'Valor de la referencia con el signo del cuadrante.', 'signo-valor', 'Pon cada valor exacto.', F(['sen 135°', 'cos 300°', 'tan 330°'], ['√2/2', '1/2', '−√3/3'], ['−√2/2', '−1/2', '√3'], { gs: [135, 300, 330] }), 'Referencias 45°, 60° y 30°.', ['Halla cada referencia.', 'Mira qué función es positiva en ese cuadrante.'], 'referencias 45°, 60° y 30°; la última = −√3/3']],
    '240° y 300°; √2/2, 1/2 y −√3/3.', 'Referencia para el valor, cuadrante para el signo.');
  reto('ondas-3', ['trig-44a', 'trig-44b'], 3, 'La marea', 'Centro, amplitud y periodo', 'Modela una marea con una ola.', [
    ['Altura', 'El centro es el promedio; la amplitud, lo que se aleja.', 'ola-centro', 'Ajusta la ola entre **las dos líneas** (arriba 2, abajo −4).', { franja: [2, -4], ks: ks(['A', 1, 4, 'amplitud'], ['k', -2, 2, 'centro']), v: { A: 1, k: 0 }, meta: { A: 3, k: -1 } }, 'Centro $-1$, amplitud 3.', ['Promedia 2 y −4.', 'Cuenta del centro al tope.'], 'centro −1; amplitud = 3'],
    ['El ritmo', 'El periodo es 2π entre ω.', 'lee-periodo', 'Una marea se repite cada **12** horas. La del dibujo, cada 4π. Pon ω de cada una.', F(['12 horas', 'dibujo'], ['π/6', '1/2'], ['6π', '2', '24π'], { o: { A: 2, w: 0.5 } }), '$\\tfrac{2\\pi}{12}$ y $\\tfrac{2\\pi}{4\\pi}$.', ['Divide 2π entre el periodo.', 'Simplifica las dos fracciones.'], '2π ÷ 12 y 2π ÷ 4π = 1/2']],
    'Centro −1, amplitud 3 y ω = π/6.', 'Tres lecturas: centro, amplitud y periodo.');
  reto('ident-1', ['trig-4', 'trig-47b'], 2, 'Pitágoras disfrazado', 'Todo a seno y coseno', 'Usa Pitágoras para completar y simplificar.', [
    ['Completar', 'Los dos cuadrados juntos hacen 1.', 'pitagoras-uno', '$\\cos^2\\theta = 0.84$. Mueve $\\operatorname{sen}^2\\theta$ (centésimas).', { cs: 84, ks: ks(['s', 0, 100, 'centésimas', 4]), v: { s: 0 }, meta: { s: 16 } }, '$1 - 0.84 = 0.16$.', ['Juntos completan cien centésimas.', 'Quita 84 a 100.'], '100 − 84 = 16'],
    ['Simplificar', 'Cambia todo a seno y coseno.', 'simplifica-senos', 'Simplifica.', F(['sec θ · sen θ', 'csc θ ÷ sec θ'], ['tan θ', 'cot θ'], ['1', 'csc θ', 'cos θ'], { cap: 'todo en sen y cos' }), '$\\tfrac{\\operatorname{sen}}{\\cos}$ y $\\tfrac{1}{\\operatorname{sen}} \\div \\tfrac{1}{\\cos} = \\tfrac{\\cos}{\\operatorname{sen}}$.', ['La secante es uno sobre coseno.', 'Dividir entre una fracción es multiplicar por la volteada.'], 'sen/cos es tan; cos/sen = cot θ']],
    'sen² = 0.16; tan θ y cot θ.', 'Pitágoras completa; seno y coseno simplifican.');
  reto('ident-2', ['trig-48a', 'trig-48b', 'trig-49'], 3, 'Doblar y resolver', 'Fórmula y factor', 'Usa el ángulo doble y resuelve una ecuación.', [
    ['El doble', 'El doble usa los dos: seno y coseno.', 'doble-cuenta', '$\\operatorname{sen}a = \\tfrac{20}{29}$, a agudo. Pon cos a y sen 2a.', F(['cos a', 'sen 2a'], ['21/29', '840/841'], ['9/29', '40/29', '41/841'], { cap: 'sen a = 20/29' }), '$2 \\cdot \\tfrac{20}{29} \\cdot \\tfrac{21}{29}$.', ['Pitágoras con 20 y 29.', 'Dos veces el producto.'], '2 · 20 · 21 sobre 29² = 840/841'],
    ['La ecuación', 'Despeja y busca los dos cuadrantes.', 'pareja-ecuacion', 'Marca las dos soluciones de $\\operatorname{sen}x - \\sqrt2 = -\\operatorname{sen}x$ en una vuelta.', { metas: [45, 135] }, '$2\\operatorname{sen}x = \\sqrt2$.', ['Junta los senos a un lado.', 'Seno positivo: primero y segundo.'], '2 sen x = √2; la mayor = 135°']],
    '840/841; 45° y 135°.', 'La fórmula arma; el factor resuelve.');
  reto('ident-3', ['trig-46a', 'trig-46b'], 3, 'El terreno sin ángulo recto', '¿Hay pareja?', 'Escoge la ley y halla lados y área.', [
    ['Cosenos', 'Dos lados y el ángulo entre ellos: no hay pareja.', 'cosenos-ley', 'Lados **5** y **8** con **60°** entre ellos. Pon 2ab cos C, c² y c.', F(['2ab cos C', 'c²', 'c'], ['40', '49', '7'], ['80', '129', '89'], { a: '5', b: '8', c: 'c' }), '$25 + 64 - 40 = 49$.', ['El coseno de 60° es un medio.', 'Pitágoras menos la corrección.'], '25 + 64 − 40 es c²; c = 7'],
    ['El área', 'Medio lado por lado por seno.', 'area-senos', 'Lados **12** y **7** con **150°** entre ellos. Pon la altura sobre el 12 y el área.', F(['altura', 'área'], ['3.5', '21'], ['7', '42', '6'], { an: 150, a: '7', c: '12' }), '$7\\operatorname{sen}150^\\circ = 3.5$ y $\\tfrac12 \\cdot 12 \\cdot 3.5$.', ['El seno de 150° es el de 30°.', 'Media base por altura.'], '½ · 12 · 3.5 = 21']],
    'El lado mide 7 y el área, 21.', 'Sin pareja, cosenos; el área, con seno.');
  reto('polar-1', ['trig-151', 'trig-152'], 2, 'El mapa polar', 'Cuánto y hacia dónde', 'Lleva números a polar y multiplícalos.', [
    ['A polar', 'Distancia y dirección.', 'polar-flecha', 'Lleva la flecha al punto amarillo, $-3$.', { pto: [-3, 0], ks: ks(['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]), v: { r: 1, g: 30 }, meta: { r: 3, g: 180 } }, '$-3 = 3\\operatorname{cis}180^\\circ$.', ['El módulo no es negativo.', 'El punto está a la izquierda.'], 'módulo 3 y ángulo = 180°'],
    ['Multiplicar', 'Módulos por, ángulos más.', 'producto-polar', 'z es $1\\operatorname{cis}90^\\circ$. Lleva la flecha a $z \\cdot 5\\operatorname{cis}210^\\circ$.', { z: [1, 90], ks: ks(['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]), v: { r: 1, g: 0 }, meta: { r: 5, g: 300 } }, '$5\\operatorname{cis}300^\\circ$.', ['Suma los ángulos.', 'Multiplica los módulos.'], '90° + 210° = 300°']],
    '3 cis 180° y 5 cis 300°.', 'Multiplicar gira y estira.');
  reto('polar-2', ['trig-152', 'trig-153'], 3, 'Potencias y pétalos', 'Repite o reparte', 'Eleva un número y encuentra sus raíces.', [
    ['Elevar', 'Pasa a polar, eleva y vuelve.', 'potencia-polar', '$(1 - i)^5$: pon el módulo, el ángulo final (0° a 360°) y el resultado.', F(['módulo', 'ángulo', 'resultado'], ['4√2', '135°', '−4 + 4i'], ['5√2', '315°', '4 − 4i'], { cap: '(1 − i)⁵' }), '$315^\\circ \\cdot 5 = 1575^\\circ$, que es $135^\\circ$.', ['El módulo de 1 − i es √2 y está en 315°.', 'Quita vueltas a 1575.'], '5 · 315° son cuatro vueltas y 135°; da = −4 + 4i'],
    ['Las raíces', 'El índice dice cuántas y la vuelta se reparte.', 'petalos', 'Arma las raíces **cuartas** de $\\operatorname{cis}120^\\circ$.', { ks: ks(['n', 2, 8, 'cuántas'], ['a', 0, 60, 'primera', 10]), v: { n: 2, a: 0 }, meta: { n: 4, a: 30 } }, 'Cuatro, cada 90°, desde 30°.', ['Parte el ángulo en cuatro.', 'Cuatro pétalos.'], '120° ÷ 4 = 30°']],
    '−4 + 4i; y cuatro raíces desde 30°.', 'Elevar repite; la raíz reparte.');
}
;
//#archivo js/gimnasio-icf.js
// Gimnasio del Preicfes Saber 11 (spec 2026-11-25-preicfes-estructura, pruebas tests/preicfes.test.js): un reto de Fuerza y uno de Élite
// por mundo hecho, con las escenas de las lecciones y textos o números nuevos. Va después de gimnasio-mate.js.
{
  const { F, T, P, S } = ICF;
  // Un paso: [título, entrenador, juego, enunciado, datos, explicación, [ayuda, ayuda], nota].
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  // -------------------------------------------------------------------------------------------------- Matemáticas · datos
  reto('datos-1', ['icf-ma-datos-1', 'icf-ma-datos-2'], 2, 'El torneo de lectura', 'De la gráfica al promedio', 'Tres grupos leyeron 60, 90 y 30 libros. ¿En cuánto debe quedar el cuarto para que el promedio de todos sea una meta dada?', [
    ['De la tabla a la gráfica', 'Antes de dibujar, mira cuánto vale una raya. Casi ningún dato cae donde uno cree.', 'pasa-tabla', 'Pasa la tabla a la gráfica: A **60**, B **90**, C **30**.', { vals: [60, 90, 30], rot: ['A', 'B', 'C'], hi: 120, st: 60, paso: 15 }, 'Las rayas van de 60 en 60: 90 y 30 caen a mitad de camino.', ['La mitad de una raya no vale diez: divide lo que vale la raya.', 'Cada raya vale sesenta.'], 'Rayas de 60: A en la raya, B y C a la mitad'],
    ['El dato que falta', 'Trabaja con sumas: el promedio por la cantidad dice cuánto deben sumar todos.', 'dato-para-promedio', 'Ahora en decenas: 6, 9, 3 y **uno más**. Muévelo hasta que el **promedio** sea 7.', { d: [6, 9, 3], m: 7 }, 'Cuatro datos con promedio 7 suman 28; hay 18 y faltan 10.', ['Multiplica el promedio que se quiere por la cantidad de datos.', 'Deben sumar 28 y ya suman 18.'], 'Suma necesaria 28, ya hay 18: falta 10']],
    'El cuarto grupo debe leer 10 decenas de libros: 100.', 'Para un promedio, piensa en la suma que exige; para una gráfica, en lo que vale la raya.');
  reto('datos-2', ['icf-ma-datos-3'], 3, 'La noticia del barrio', 'Desconfía del dibujo y de la muestra', 'Un periódico compara dos barrios con una gráfica cortada y una encuesta. ¿Qué se puede creer?', [
    ['El piso cortado', 'Averigua desde dónde empieza el eje para que el dibujo muestre lo que dice la noticia.', 'sube-piso', 'El Alto tuvo 40 robos y el Bajo 48. ¿En qué número debe **empezar el eje** para que Bajo **parezca el triple**?', { a: 40, b: 48, veces: 3 }, 'Desde 36, uno mide 4 y el otro 12: parece el triple.', ['Busca un piso desde el que una altura sea tres veces la otra.', 'Las alturas son lo que sobra por encima del piso.'], 'Alturas 4 y 12: el eje arranca en 36'],
    ['Lo que sí se concluye', 'Separa lo que dicen los números de lo que el periódico les agrega.', 'se-concluye', 'De **60** vecinos sorteados, **45** piden más luz y **12** piden cámaras. Toca **todo** lo que se concluye.', { casos: [{ t: 'el 75 % de los sorteados pide más luz', si: true }, { t: 'todo el país quiere más luz', no: 'Solo se preguntó a vecinos de un barrio.' }, { t: '1 de cada 5 sorteados pide cámaras', si: true }, { t: 'hay robos porque falta luz', no: 'Los datos dicen qué piden, no la causa.' }, { t: '15 sorteados no piden más luz', si: true }], falta: 'Falta algo que sale directo de los números.' }, '$\\tfrac{45}{60} = 75\\,\\%$, $\\tfrac{12}{60} = \\tfrac15$ y $60 - 45 = 15$.', ['Una conclusión válida habla solo de quienes se preguntó.', 'Compara cada cantidad con el total de sorteados.'], 'Vale lo que sale de 45, 12 y 60; no el país ni la causa']],
    'La gráfica exagera y la encuesta solo habla de los vecinos sorteados.', 'Eje, muestra y causa: las tres trampas de una noticia con números.');

  // ------------------------------------------------------------------------------------------------- Lectura · literal
  const CABLE = D('cable', 'El cable que cosió la loma', [
    'Durante décadas, subir a la loma de San Isidro tomaba una hora: un bus hasta la avenida, otro hasta el pie del cerro y cuatrocientos escalones. Quien trabajaba en el centro salía de su casa de noche y volvía de noche.',
    'El cable aéreo cambió esa cuenta. Hoy el mismo viaje dura veinte minutos y cuesta un solo pasaje. «Recuperé dos horas al día», dice Ofelia Rentería, que limpia oficinas y ahora estudia por las tardes.',
    'No todo fue ganancia. Los arriendos cerca de las estaciones subieron y algunos vecinos tuvieron que irse más arriba, donde el cable no llega. Además, cuando hay tormenta eléctrica el servicio se detiene.',
    'Aun así, pocos en la loma quieren volver atrás. Lo que piden es que el cable se complete: más estaciones y reglas para que quien vivió los escalones pueda quedarse a vivir el cable.']);
  reto('texto-1', ['icf-lc-literal-1'], 2, 'El cable de la loma', 'Mapa y EXCEPTO', 'Un texto corto sobre transporte. Arma su mapa y encuentra la opción intrusa.', [
    ['El mapa', 'Di qué hace cada párrafo, no de qué habla.', 'mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: CABLE, ...F(['muestra cómo era antes', 0, 'Busca «Durante décadas».'], ['muestra el cambio', 1, 'Busca lo que pasa «Hoy».'], ['señala problemas', 2, 'Busca «No todo fue ganancia».'], ['concluye con una petición', 3, 'Busca lo que «piden».'], ['explica cómo funciona el motor', null, 'Ningún párrafo habla de máquinas.']), luz: [[1, 'Durante décadas'], [2, 'Hoy el mismo viaje'], [3, 'No todo fue ganancia'], [4, 'Lo que piden']], bien: 'Antes, cambio, problemas y petición.' }, 'Antes, cambio, problemas y petición: las primeras palabras de cada párrafo lo anuncian.', ['Lee solo el comienzo de cada uno.', 'El último empieza con «Aun así».'], 'Mapa: antes, cambio, problemas, petición'],
    ['La intrusa', 'Lleva cada opción a su párrafo. La que se quede sin casa es la respuesta.', 'sella-parrafo', '«Con el cable pasó todo esto, **EXCEPTO**:» Ata cada opción.', { doc: CABLE, ...T(['El viaje se acortó', 1, 'Busca los minutos.'], ['Subieron arriendos', 2, 'Busca el párrafo de los problemas.'], ['Se detiene con tormentas', 2, 'Busca el párrafo de los problemas.'], ['Se quitaron los escalones', 4, 'Los escalones se nombran: ¿dice que los quitaron?']), luz: [[2, 'veinte minutos'], [3, 'Los arriendos cerca de las estaciones subieron'], [3, 'el servicio se detiene']], bien: 'Se nombran los escalones, pero nadie los quitó.' }, 'El viaje corto está en el 2; arriendos y tormentas, en el 3; que quitaran los escalones, en ninguno.', ['Dos opciones comparten párrafo.', 'Que se nombre algo no significa que le pasara eso.'], 'La intrusa: quitar los escalones']],
    'El texto va del antes a la petición; nadie quitó los escalones.', 'El mapa dice dónde buscar y la búsqueda dice cuál sobra.');
  reto('texto-2', ['icf-lc-literal-2'], 3, 'Las palabras del cable', 'Probar y tirar el hilo', 'El mismo texto, palabra por palabra.', [
    ['La palabra justa', 'Pon cada ficha en la oración y léela entera: no basta que sea sinónimo en el diccionario.', 'cambia-palabra', 'Pon la palabra que dice lo mismo. Sobran dos.', { doc: CABLE, frases: [[1, 'subir a la loma de San Isidro ', 'tomaba', ' una hora'], [2, '«', 'Recuperé', ' dos horas al día»'], [4, 'Lo que piden es que el cable se ', 'complete', ': más estaciones']], ...F(['duraba', 0, '¿Qué hacía la subida con una hora?'], ['gané de nuevo', 1, '¿Qué hizo con dos horas que antes perdía?'], ['termine de construir', 2, 'Mira lo que piden después de los dos puntos.'], ['bebía', null, 'Nadie bebe una hora.'], ['sané', null, 'Las horas no estaban enfermas.']), bien: 'El sentido lo pone la oración.' }, 'Tomar es durar, recuperar es ganar de nuevo y completar, terminar de construir.', ['Lee la oración con cada ficha.', 'Una ficha es sinónimo, pero en otra oración.'], 'Tomaba → duraba; recuperé → gané; complete → termine'],
    ['Quién lo dice', 'Busca comillas y verbos de decir. Lo que no los tiene es de quien escribe.', 'pinta-voces', 'Pinta cada idea con quien la dice.', { doc: CABLE, plumas: ['el autor', 'Ofelia', 'la gente de la loma'], ...P(['Ahora tiene dos horas más cada día.', 1, 'Busca las comillas.'], ['Debe haber más estaciones.', 2, 'Busca quiénes «piden».'], ['No todo fue ganancia.', 0, '¿Hay alguien más que lo firme?'], ['Antes se subían cuatrocientos escalones.', 0, '¿Hay comillas en ese párrafo?']), bien: 'Comillas, «piden» y lo demás.' }, 'Las comillas son de Ofelia, «piden» es de la gente y el resto lo dice el autor.', ['Mira qué va entre comillas.', 'La petición no es del autor: es de otros.'], 'Ofelia cita; la gente pide; el autor cuenta']],
    'Cada palabra se prueba en su oración y cada idea tiene su dueño.', 'Sentido en contexto y voces: dos preguntas fijas de la prueba.');

  // ---------------------------------------------------------------------------------------------- Sociales · Constitución
  const POZO = D('pozo', 'El pozo de Las Brisas', [
    'En la vereda Las Brisas, el único pozo se secó después de que una empresa de flores abrió otro más profundo a doscientos metros. Cuarenta familias quedaron sin agua.',
    'Primero escribieron a la corporación autónoma regional, la autoridad ambiental, para preguntar si la empresa tenía permiso. A los doce días les respondieron: el permiso existía, pero nadie había revisado sus condiciones.',
    'Entonces se dividieron las tareas. Por la salud de los niños pusieron una tutela; por el agua del subsuelo, que es de todos, una acción popular.',
    'Mientras el juez decidía, la Procuraduría abrió una investigación contra el funcionario que nunca revisó el permiso.']);
  reto('estado-1', ['icf-sc-constitucion-2'], 2, 'El pozo de Las Brisas', 'De quién es el derecho', 'Un caso con varias herramientas. ¿Cuál va con cada reclamo?', [
    ['Clasifica el reclamo', 'Pregunta si el derecho es de una persona o de todos a la vez.', 'genero-o-cita', '¿**Tutela** o **acción popular**?', { doc: POZO, rot: ['acción de tutela', 'acción popular'], ...F(['Un niño enfermo por falta de agua', 0, '¿De quién es la salud en juego?'], ['El subsuelo que comparten las veredas', 1, '¿De cuántos es esa agua?'], ['Una anciana sin atención médica', 0, '¿De quién es la salud en juego?'], ['El aire con pesticidas', 1, '¿Quiénes respiran ese aire?']), bien: 'Una persona o todos: ahí se decide.' }, 'La salud de alguien va por tutela; el agua y el aire de todos, por acción popular.', ['Si al arreglarlo ganan todos, es colectivo.', 'El niño y la anciana son personas con nombre.'], 'Persona: tutela. Todos: popular'],
    ['Ordena el caso', 'Antes de demandar se pide; después se escoge la herramienta.', 'pasos-del-proceso', 'Ordena lo que pasó. El primero está en su puesto.', { que: 'lo que pasó', de: 'El caso del pozo', fija: 1, ini: [0, 2, 3, 1], tiras: ['El pozo se secó.', 'Preguntaron por el permiso.', 'La autoridad respondió.', 'Pusieron tutela y acción popular.'], mira: ['', 'Nadie responde lo que no se ha preguntado.', 'Se responde una pregunta ya hecha.', '«Entonces» llega después de saber la respuesta.'], bien: 'Daño, petición, respuesta y acciones.' }, 'Primero el daño, luego la petición, su respuesta y, al final, las acciones.', ['¿Qué necesitaban saber antes de demandar?', 'La respuesta llegó a los doce días.'], 'Daño, petición, respuesta, acciones']],
    'Tutela por la salud, acción popular por el agua, después de preguntar.', 'Primero se pide, después se escoge la herramienta según de quién es el derecho.');
  reto('estado-2', ['icf-sc-constitucion-1'], 3, 'Quién hace qué', 'El verbo dice la rama', 'En el caso del pozo aparecen varias autoridades. Ubica cada una y lo que se puede concluir.', [
    ['Cada autoridad', 'No mires el tema: mira el verbo. ¿Legisla, gobierna, juzga o vigila?', 'pinta-tipos', 'Pinta cada acción.', { doc: POZO, plumas: ['ejecutiva', 'judicial', 'control'], ...P(['La alcaldía manda un carrotanque con agua.', 0, '¿Gobierna, juzga o vigila?'], ['El juez decide la tutela.', 1, '¿Gobierna, juzga o vigila?'], ['La Procuraduría investiga al funcionario.', 2, '¿Gobierna, juzga o vigila?'], ['La Contraloría revisa el gasto.', 2, '¿Gobierna, juzga o vigila?']), bien: 'Gobernar, juzgar y vigilar.' }, 'La alcaldía gobierna, el juez decide y la Procuraduría y la Contraloría vigilan.', ['Subraya el verbo de cada acción.', 'Investigar y revisar son del mismo tipo.'], 'Carrotanque: ejecutiva. Fallo: judicial. Investigar: control'],
    ['Dice o se deduce', 'Una investigación no es una condena: cuidado con lo que se agrega.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: POZO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['El permiso existía.', 0, 'Léela junto a la respuesta de la autoridad.'], ['El funcionario pudo incumplir su deber.', 1, '¿Por qué lo investigarían?'], ['El funcionario recibió dinero.', 2, '¿Alguna oración habla de dinero?'], ['La respuesta tardó doce días.', 0, 'Léela junto a la segunda oración.']), luz: [[2, 'el permiso existía'], [4, 'abrió una investigación']], bien: 'Investigar no prueba culpa.' }, 'El permiso y los doce días están escritos; que pudo incumplir se deduce; el dinero se inventa.', ['Busca primero lo escrito.', 'Una investigación supone una sospecha, no más.'], 'Escrito: permiso y plazo. Deducido: posible falta']],
    'Gobernar, juzgar y vigilar son tareas distintas, y una sospecha no es una condena.', 'El verbo muestra la rama; el texto, hasta dónde se puede concluir.');

  // ------------------------------------------------------------------------------------------------ Ciencias · indagación
  const PAN = D('pan', 'El moho del pan', [
    'Dos hermanas querían saber si la humedad hace que el pan críe moho más rápido.',
    'Partieron un mismo pan en doce tajadas. Cuatro las dejaron secas, a cuatro les echaron cinco gotas de agua y a cuatro, diez. Guardaron todas en bolsas iguales, en el mismo cajón.',
    'A los cinco días, las secas no tenían moho; las de cinco gotas tenían manchas pequeñas en dos tajadas; las de diez gotas, manchas grandes en las cuatro.',
    'La menor concluyó que el agua se convierte en moho. La mayor dijo que el moho ya estaba en el aire, en forma de esporas, y que la humedad solo le ayuda a crecer.']);
  reto('moho-1', ['icf-cn-indaga-1'], 2, 'El moho del pan', 'Los tres papeles', 'Un experimento de cocina. Encuentra sus variables y lo que desmiente a quien se equivoca.', [
    ['Qué cambió y qué no', 'Lo que se decide distinto para cada grupo es lo que se prueba.', 'genero-o-cita', '¿Lo **cambiaron** a propósito?', { doc: PAN, rot: ['sí, lo cambiaron', 'no, lo midieron o lo dejaron igual'], ...F(['Las gotas de agua', 0, '¿Todos los grupos recibieron lo mismo?'], ['El cajón', 1, '¿Había un cajón para cada grupo?'], ['El tamaño de las manchas', 1, '¿Lo decidieron o lo miraron al final?'], ['El pan', 1, '¿Usaron panes distintos?']), luz: [[2, 'en el mismo cajón']], bien: 'Una cosa cambia, las demás no.' }, 'Solo las gotas cambian; el cajón y el pan se controlan y las manchas se miden.', ['Busca lo que no fue igual para las doce tajadas.', 'Las manchas se miran al final.'], 'Cambia: gotas. Se mide: manchas. Igual: pan y cajón'],
    ['La tendencia', 'Lee los tres grupos en orden antes de concluir.', 'ajusta-alcance', 'Ajusta cada conclusión a los datos.', { doc: PAN, filas: [{ antes: 'Con más gotas, el moho', topes: ['disminuyó', 'quedó igual', 'aumentó'], va: 2 }, { antes: 'Sin agua, el moho a los cinco días', topes: ['no apareció', 'apareció en dos', 'apareció en todas'], va: 0 }], mira: ['Compara las manchas pequeñas y las grandes.', 'Relee lo que pasó con las secas.'], luz: [[3, 'las secas no tenían moho'], [3, 'manchas grandes en las cuatro']], bien: 'Cada frase con su dato.' }, 'Las secas sin moho, dos con manchas pequeñas, cuatro con manchas grandes: aumentó con el agua.', ['Pon los tres grupos en fila.', 'Mira cuántas tajadas tenían manchas en cada grupo.'], 'Más agua, más moho; secas, ninguno']],
    'Cambiaron el agua; a más agua, más moho en cinco días.', 'Identifica los papeles y lee la tendencia antes de explicar.');
  reto('moho-2', ['icf-cn-indaga-2'], 3, '¿De dónde sale el moho?', 'La explicación y su prueba', 'Dos explicaciones para los mismos datos. ¿Qué dato sirve para escoger?', [
    ['Pesa los datos', 'Supón que cada dato es cierto y mira hacia dónde se inclina la balanza.', 'balanza-tesis', 'Explicación: el moho viene de esporas y la humedad le ayuda. ¿Qué hace cada dato?', { doc: PAN, tesis: 'El moho viene de esporas; el agua solo ayuda', ...F(['Pan húmedo hervido y sellado no crió moho.', 0, 'Si no había esporas, ¿qué se esperaba?'], ['Con microscopio se hallaron esporas en muestras del aire.', 0, '¿Muestra de dónde puede salir?'], ['En aire sin esporas, el agua sola crió moho.', 1, 'Si no había esporas, ¿de dónde salió?'], ['El cajón era de madera.', 2, '¿Cambia alguna de las dos explicaciones?']), bien: 'Un dato pesa si podía haber salido distinto.' }, 'Sellado y sin moho, y esporas vistas, apoyan; moho sin esporas debilita; la madera no pesa.', ['Pregunta qué esperaría cada hermana.', 'El cajón era igual para todos.'], 'Apoyan: sellado y microscopio. Debilita: moho sin esporas'],
    ['Dato, hipótesis o conclusión', 'Piensa cuándo se dice cada cosa.', 'pinta-tipos', 'Pinta cada oración.', { doc: PAN, plumas: ['dato', 'hipótesis', 'conclusión'], ...P(['Las de diez gotas tenían manchas en las cuatro.', 0, '¿Se vio o se pensó?'], ['La humedad hará que críe moho más rápido.', 1, '¿Es antes o después de mirar?'], ['El agua ayuda al moho a crecer.', 2, '¿Es una sola medida o junta varias?'], ['Las secas no tenían moho.', 0, '¿Se vio o se pensó?']), bien: 'Antes, al mirar y después.' }, 'Las manchas se vieron, «hará» se dijo antes y la idea general salió después.', ['El verbo en futuro delata una.', 'Una junta los tres grupos en una idea.'], 'Vistos: manchas. Antes: «hará». Después: la idea']],
    'La explicación de las esporas gana si los datos que podían tumbarla la apoyan.', 'Una buena prueba es la que podría salir mal.');

  // -------------------------------------------------------------------------------------------------- Inglés · avisos
  const POOL = D('pool', 'Notices at the sports centre', [
    'SWIMMING POOL. You must take a shower before you get in. No running near the water. Children under eight cannot swim without an adult.',
    'GYM. Open from 6 a.m. to 9 p.m. Please clean the machines after you use them. Bring your own towel.',
    'TENNIS COURTS. Book by phone one day before. If it rains, you can use your ticket another day.',
    'CAFÉ. We close at 4 p.m. on Sundays. Members get a free juice with any sandwich.']);
  reto('notice-1', ['icf-en-avisos-1'], 2, 'The sports centre', 'Palabra clave y verbo', 'Avisos de un centro deportivo. Ubica cada pregunta y distingue las reglas.', [
    ['Where?', 'Lee solo el lugar con que empieza cada aviso.', 'donde-mirar', 'Lleva cada pregunta al aviso donde la buscarías.', { doc: POOL, ...F(['Can my little brother swim alone?', 0, 'Busca el lugar con agua.'], ['What happens with my game if it rains?', 2, 'Busca un lugar al aire libre.'], ['When can I have a free drink?', 3, 'Busca donde se come y se bebe.']), luz: [[1, 'Children under eight cannot swim'], [3, 'If it rains'], [4, 'a free juice']], bien: 'The first word says the place.' }, '«Pool», «courts» y «café» dicen el lugar de cada pregunta.', ['«Swim» solo tiene sentido en un lugar.', 'La lluvia importa al aire libre.'], 'Swim: pool. Rain: courts. Drink: café'],
    ['Rule or information', 'Fíjate en el verbo: ¿te dice qué hacer o te cuenta algo?', 'genero-o-cita', 'Is it a **rule** or **information**?', { doc: POOL, rot: ['a rule', 'information'], ...F(['No running', 0, '¿Cuenta algo o prohíbe?'], ['We close at 4 p.m.', 1, '¿Te pide algo o te dice una hora?'], ['You must take a shower', 0, '¿Cuenta algo u obliga?'], ['Open from 6 a.m.', 1, '¿Te pide algo o te dice una hora?']), bien: 'Must and no -ing are rules.' }, '«Must» y «No running» son reglas; las horas solo informan.', ['Busca «must», «no» y «please».', 'Las horas informan.'], 'Rules: no running, must. Information: hours']],
    'The place is in the first word; the rule, in the verb.', 'Palabra clave para ubicar y verbo para distinguir.');
  reto('notice-2', ['icf-en-avisos-2'], 3, 'Say it another way', 'La misma idea, otras palabras', 'Los mismos avisos, dichos de otra manera.', [
    ['Same meaning', 'Prueba cada palabra en la oración completa.', 'cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: POOL, frases: [[2, 'Please ', 'clean', ' the machines'], [3, '', 'Book', ' by phone one day before'], [2, '', 'Bring', ' your own towel']], ...F(['wash', 0, 'What do you do with a dirty machine?'], ['reserve', 1, 'What do you do by phone before you play?'], ['come with', 2, 'The towel is yours: what must you do with it?'], ['read', null, 'It is not a book with pages.'], ['break', null, 'Nobody asks you to damage it.']), bien: 'Same idea, different word.' }, '«Clean» es «wash», «book» aquí es «reserve» y «bring» es «come with».', ['«Book» tiene dos sentidos: mira «by phone».', 'La toalla viene contigo de la casa.'], 'Clean: wash. Book: reserve. Bring: come with'],
    ['True or not', 'Busca la oración que desmiente cada frase.', 'descarta-prueba', 'These are false. Ata cada una a la oración que la desmiente.', { doc: POOL, nums: [1, 2], pregunta: 'It is true', queda: 'A boy of six needs an adult in the pool.', ...T(['You can swim and shower later.', 1, 'Busca «before».'], ['You can run near the water.', 2, 'Busca «running».'], ['The centre gives you a towel.', 7, 'Busca «your own».']), bien: 'One sentence says no.' }, 'La ducha va antes, no se corre y la toalla la lleva cada uno.', ['Saca la palabra clave de cada frase.', '«Your own» dice de quién es la toalla.'], 'Before, no running, your own']],
    'Same idea, other words; and one sentence is enough to say no.', 'Compara ideas, no palabras copiadas.');
}
;
//#archivo js/gimnasio-icf-2.js
// Gimnasio del Preicfes, segundos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('prop-1', ['icf-ma-proporcion-1', 'icf-ma-proporcion-3'], 2, 'La cooperativa', 'Partes iguales y trabajo fijo', 'Tres socios se reparten unas horas en razón y después cambian las máquinas de la cooperativa.', [
    ['Reparte las horas', 'Cuenta las partes iguales antes de dividir.', 'corta-reparto', 'Reparte **60** horas en razón **2 : 3 : 5**. Pon los dos cortes, en ese orden.', { r: [2, 3, 5], total: 60, paso: 6, que: 'horas' }, 'Son 10 partes de 6: 12, 18 y 30.', ['Suma los tres números de la razón.', 'Cada parte vale 60 ÷ 10.'], 'Partes de 60 ÷ 10: 12, 18 y 30'],
    ['Cambia las máquinas', 'El trabajo total no cambia: mídelo en máquinas por días.', 'rectangulo-trabajo', '**9** máquinas tardan **8** días. Con **6** iguales, ¿cuántos días?', { a1: 9, b1: 8, a2: 6, ea: 'máquinas', eb: 'días', max: 18 }, '$9 \\cdot 8 = 72$ y $72 \\div 6 = 12$ días.', ['Con menos máquinas debe tardar más.', 'Divide 72 entre las seis.'], '9 · 8 = 72; 72 ÷ 6 = 12']],
    'Les tocan 12, 18 y 30 horas, y seis máquinas tardan 12 días.', 'Un reparto se divide en partes iguales; un trabajo fijo conserva su producto.');
  reto('prop-2', ['icf-ma-proporcion-2', 'icf-ma-proporcion-4'], 3, 'Precios y carreteras', 'Factores y diferencias', 'Un precio cambia dos veces y un carro alcanza a otro.', [
    ['Dos cambios', 'No sumes los porcentajes: el segundo es del precio que dejó el primero.', 'dos-cambios', 'Un flete de **100** mil **sube 40 %** y después **baja 25 %**. ¿En cuánto queda?', { a: 100, c: [40, -25], max: 160, paso: 5 }, '$100 \\cdot 1.4 = 140$ y $140 \\cdot 0.75 = 105$.', ['Halla el precio después de la subida.', 'Quita la cuarta parte de 140.'], '100 · 1.4 = 140; 140 · 0.75 = 105'],
    ['La persecución', 'Van hacia el mismo lado: solo cuenta la diferencia.', 'reloj-caza', 'El de atrás va a 90 y el de adelante, a 60, con **45 km** de ventaja. ¿A las cuántas horas lo alcanza?', { D: 600, va: 60, vb: 90, vent: 45, max: 6 }, 'Descuenta 30 por hora: $45 \\div 30 = 1.5$.', ['Resta las velocidades.', 'Divide 45 entre lo que descuenta cada hora.'], '45 ÷ 30 = 1.5']],
    'Queda en 105 mil y lo alcanza en hora y media.', 'Los cambios se multiplican; al perseguir, las velocidades se restan.');

  const FARO = D('faro', 'El último farero', [
    'Durante cuarenta años, Aníbal encendió el faro de Punta Gallinas. Hoy lo enciende un sensor, y él vende café a los turistas.',
    'El cambio tuvo razones: el sensor no se enferma ni se duerme. Además, gasta menos. Los marineros, sin embargo, dicen que perdieron algo más que una luz.',
    '«Aníbal avisaba por radio cuando cambiaba el viento», recuerda una capitana. «El sensor solo sabe que es de noche». Según la oficina de puertos, los avisos del clima ahora llegan por satélite y son más exactos.',
    'Quizá las dos cosas sean ciertas. Un aparato puede acertar más y, aun así, no responder cuando alguien pregunta.']);
  reto('arma-1', ['icf-lc-estructura-1', 'icf-lc-estructura-2'], 2, 'El último farero', 'Oficios y bisagras', 'Una crónica corta. Di qué hace cada párrafo y cómo se unen sus ideas.', [
    ['El mapa', 'Mira qué hace cada párrafo frente al anterior.', 'mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: FARO, ...F(['contrasta antes y hoy', 0, 'Busca «Durante» y «Hoy».'], ['da razones y una queja', 1, 'Busca «razones» y «sin embargo».'], ['enfrenta dos voces', 2, 'Busca las comillas y «Según».'], ['concluye sin escoger bando', 3, 'Busca «Quizá».'], ['explica cómo se hace café', null, 'Nadie explica una receta.']), luz: [[1, 'Durante cuarenta años'], [2, 'sin embargo'], [3, 'Según la oficina'], [4, 'Quizá']], bien: 'Contraste, razones, voces y cierre.' }, 'Antes y hoy, razones con queja, dos voces y un cierre que las reúne.', ['Lee los comienzos.', 'El último empieza con «Quizá».'], 'Mapa: contraste, razones, voces, cierre'],
    ['Las bisagras', 'Di qué hace la segunda idea antes de mirar las fichas.', 'bisagras', 'Pon la palabra que une. Sobran dos.', { doc: FARO, pares: [['El sensor no se duerme.', 'gasta menos.'], ['El cambio tuvo razones.', 'los marineros perdieron algo.']], ...F(['Además,', 0, 'Suma: ¿dónde van las dos hacia el mismo lado?'], ['Sin embargo,', 1, 'Opone: ¿dónde chocan?'], ['Por ejemplo,', null, 'Ninguna segunda es un caso de la primera.'], ['Es decir,', null, 'Ninguna repite lo mismo.']), bien: 'Suma y opone.' }, 'Gastar menos es otra ventaja; perder algo choca con las razones.', ['Una pareja suma y otra choca.', 'Las ventajas van juntas.'], 'Ventaja con ventaja: suma. Razón y queja: choque']],
    'El texto contrasta, razona, deja oír dos voces y concluye.', 'Oficio de cada párrafo y relación entre ideas.');
  reto('arma-2', ['icf-lc-estructura-3'], 3, 'Las voces del faro', 'Quién dice y cómo', 'El mismo texto: ¿de quién es cada idea y hasta dónde llega?', [
    ['Las voces', 'Busca comillas, «según» y verbos de decir.', 'pinta-voces', 'Pinta cada idea con su dueño.', { doc: FARO, plumas: ['el cronista', 'la capitana', 'la oficina'], ...P(['Aníbal avisaba del viento.', 1, 'Busca quién «recuerda».'], ['Los avisos por satélite son más exactos.', 2, 'Busca «Según».'], ['Quizá las dos cosas sean ciertas.', 0, '¿Hay comillas ahí?'], ['El sensor solo sabe que es de noche.', 1, 'Busca las comillas.']), bien: 'Comillas, «según» y lo demás.' }, 'Lo entrecomillado es de la capitana, «según» es de la oficina y el cierre, del cronista.', ['Mira las comillas.', 'Lo que no tiene marca es de quien escribe.'], 'Capitana: comillas. Oficina: según. Cronista: quizá'],
    ['El alcance', 'Ni más ni menos de lo que dice.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FARO, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Aníbal vende café.', 0, 'Léela junto al párrafo 1.'], ['La capitana extraña los avisos.', 1, '¿Cómo habla de Aníbal y del sensor?'], ['Aníbal odia el sensor.', 2, '¿Alguna oración dice qué siente él?']), luz: [[1, 'él vende café']], bien: 'La nostalgia se oye en la comparación.' }, 'El café está escrito, que lo extraña se deduce y el odio se inventa.', ['Busca primero lo escrito.', 'Una comparación puede mostrar un sentimiento.'], 'Escrito: café. Deducido: extraña. Inventado: odio']],
    'Cada idea tiene dueño, y lo que no se puede señalar no está.', 'Marcas de voz y alcance.');

  const PUERTO = D('muelle', 'El muelle de Bocas', [
    'La alcaldesa de Bocas anunció que arrendaría el muelle de pescadores a un hotel. Llevaba dos años en el cargo y esa decisión no estaba en su programa.',
    'Los pescadores pidieron un cabildo abierto. En la sesión, la alcaldesa mostró el contrato y 130 personas opinaron. No se votó.',
    'Una veeduría comparó el arriendo con otros de la región y encontró que era cuatro veces menor. Envió su informe a la Contraloría y a la Procuraduría.',
    'Mientras se investiga, un grupo recoge firmas para revocar a la alcaldesa. Ella dice que respetará el resultado.']);
  reto('voz-1', ['icf-sc-participacion-1'], 2, 'El muelle de Bocas', 'Mecanismo según el propósito', '¿Qué mecanismo usó cada quien y qué podía lograr?', [
    ['El mecanismo', 'Pregunta qué se busca: conversar, votar una norma o retirar del cargo.', 'voz-de-la-fuente', 'Ata cada propósito a su mecanismo.', { ayuda: 'Tira un hilo desde cada propósito hasta su mecanismo.', doc: PUERTO, portadas: [['Cabildo abierto', 'mecanismo'], ['Revocatoria', 'mecanismo'], ['Referendo', 'mecanismo']], ...T(['Que la alcaldesa explique y la gente opine', 0, '¿Se vota o se conversa?'], ['Que deje el cargo', 1, '¿Qué se discute: una norma o una persona?'], ['Que se derogue una norma', 2, '¿Qué se discute: una norma o una persona?']), bien: 'Conversar, retirar y derogar.' }, 'Opinar es cabildo, retirar es revocatoria y derogar una norma, referendo.', ['Di el verbo de cada propósito.', 'Solo uno retira a alguien.'], 'Opinar: cabildo. Retirar: revocatoria. Derogar: referendo'],
    ['Lo que alcanza', 'Cada mecanismo tiene su límite.', 'ajusta-alcance', 'Ajusta cada frase al texto.', { doc: PUERTO, filas: [{ antes: 'En el cabildo la gente', topes: ['votó', 'opinó', 'eligió'], va: 1 }, { antes: 'La revocatoria, por el tiempo en el cargo,', topes: ['aún no se puede', 'nunca se puede', 'sí se puede pedir'], va: 2 }], mira: ['Relee el final del párrafo 2.', 'Mira cuánto lleva en el cargo y recuerda la condición.'], luz: [[2, 'No se votó'], [1, 'dos años en el cargo']], bien: 'Opinar y pedir.' }, 'En el cabildo se opina; con dos años ya se puede pedir la revocatoria.', ['Busca «No se votó».', 'La condición es de un año.'], 'Cabildo: opinar. Revocatoria: ya pasó el año']],
    'El cabildo sirvió para opinar y la revocatoria ya se puede pedir.', 'Propósito y condición de cada mecanismo.');
  reto('voz-2', ['icf-sc-participacion-2', 'icf-sc-participacion-3'], 3, 'Quién vigila el muelle', 'Cada entidad, su pregunta', 'El informe de la veeduría llegó a dos entidades. ¿Qué busca cada una?', [
    ['La pregunta', 'Dinero, conducta o delito.', 'pinta-tipos', 'Pinta cada pregunta con quien la responde.', { doc: PUERTO, plumas: ['Contraloría', 'Procuraduría', 'Fiscalía'], ...P(['¿Cuánto dejó de recibir el municipio?', 0, '¿Habla de dinero, de conducta o de delito?'], ['¿Se faltó al deber al firmar?', 1, '¿Habla de dinero, de conducta o de delito?'], ['¿Hubo soborno?', 2, '¿Habla de dinero, de conducta o de delito?'], ['¿Debe sancionarse a un funcionario?', 1, '¿Habla de dinero, de conducta o de delito?']), bien: 'Dinero, deber y delito.' }, 'Lo no recibido es dinero, el deber es conducta y el soborno, un delito.', ['Subraya la palabra clave de cada pregunta.', 'El soborno se juzga.'], 'Dinero: Contraloría. Deber: Procuraduría. Soborno: Fiscalía'],
    ['Pesa el dato', 'Un informe apoya, pero no condena.', 'balanza-tesis', 'Tesis: el arriendo perjudicó al municipio.', { doc: PUERTO, tesis: 'El arriendo perjudicó al municipio', ...F(['Era cuatro veces menor que otros.', 0, '¿El municipio ganó o perdió?'], ['El hotel también reparó el muelle, por más dinero.', 1, '¿El municipio recibió algo más?'], ['Opinaron 130 personas.', 2, '¿Cambia lo que se pagó?']), bien: 'Apoya, debilita y no pesa.' }, 'Un arriendo bajo apoya, una reparación costosa debilita y la asistencia no pesa.', ['Supón que cada dato es cierto.', 'Mira cuánto recibe el municipio.'], 'Apoya: arriendo. Debilita: reparación']],
    'La Contraloría sigue el dinero, la Procuraduría la conducta, y falta probar.', 'Una pregunta por entidad, y ninguna culpa sin prueba.');

  const CAMELLO = D('cacto', 'El cacto y la sal', [
    'Un grupo puso tres trozos iguales de cacto en agua con 0 %, 2 % y 6 % de sal durante una hora.',
    'El primero ganó 5 gramos, el segundo no cambió y el tercero perdió 4.',
    'Después pusieron el tercero en agua sin sal: recuperó 3 gramos y volvió a estar firme.']);
  reto('cel-1', ['icf-cn-celula-1'], 2, 'El cacto y la sal', 'Hacia donde hay más sal', 'Lee los datos y decide hacia dónde fue el agua.', [
    ['Hacia dónde', 'Compara la sal de adentro con la de afuera.', 'genero-o-cita', '¿El agua **entró** o **salió**?', { doc: CAMELLO, rot: ['entró', 'salió'], ...F(['En 0 % de sal', 0, '¿Ganó o perdió masa?'], ['En 6 % de sal', 1, '¿Ganó o perdió masa?'], ['El tercero, al pasarlo a agua sin sal', 0, '¿Ganó o perdió masa?']), luz: [[2, 'ganó 5 gramos'], [2, 'perdió 4'], [3, 'recuperó 3 gramos']], bien: 'La masa delata al agua.' }, 'Si ganó masa, entró agua; si perdió, salió.', ['Mira si la masa subió o bajó.', 'El tercero cambió dos veces.'], 'Gana masa: entra. Pierde: sale'],
    ['Ajusta', 'Lee los tres datos en orden.', 'ajusta-alcance', 'Ajusta cada frase a los datos.', { doc: CAMELLO, filas: [{ antes: 'La sal de adentro se parece a la de', topes: ['0 %', '2 %', '6 %'], va: 1 }, { antes: 'Las células del tercero', topes: ['murieron todas', 'se volvieron sal', 'seguían funcionando'], va: 2 }], mira: ['¿En cuál no cambió la masa?', 'Mira qué pasó al devolverlas al agua.'], luz: [[2, 'no cambió'], [3, 'volvió a estar firme']], bien: 'Sin cambio: equilibrio.' }, 'Si no cambió con 2 %, adentro hay algo parecido; si recuperó firmeza, seguían vivas.', ['Sin cambio de masa hay equilibrio.', 'Una célula muerta no se pone firme.'], 'Equilibrio en el segundo; el tercero se recupera']],
    'Entró con 0 %, salió con 6 % y adentro hay cerca de 2 %.', 'La masa muestra hacia dónde va el agua.');
  reto('cel-2', ['icf-cn-celula-2', 'icf-cn-celula-3'], 3, 'Avisos y recetas', 'Orden y prueba', 'Ordena cómo responde el cuerpo y pesa los datos de una hipótesis.', [
    ['El aviso', 'Cambio, aviso, respuesta y efecto.', 'pasos-del-proceso', 'Ordena. El primero está en su puesto.', { que: 'la respuesta', de: 'Tres días en el desierto', fija: 1, ini: [0, 2, 3, 1], tiras: ['Se pierde agua con el sudor.', 'El cerebro detecta la sangre concentrada.', 'Libera una hormona.', 'Los riñones retienen agua.'], mira: ['', 'Se detecta un cambio que ya ocurrió.', 'Se libera cuando ya se detectó.', 'Los riñones obedecen a un aviso.'], bien: 'Cambio, aviso, hormona y efecto.' }, 'Se pierde agua, el cerebro lo nota, libera una hormona y el riñón retiene.', ['¿Quién se da cuenta primero?', 'El riñón actúa al final.'], 'Pierde, detecta, libera, retiene'],
    ['Pesa', 'Un dato pesa si podía haber salido distinto.', 'balanza-tesis', 'Tesis: ese cambio de letra no afecta la proteína.', { tesis: 'El cambio de letra no afecta la proteína', ...F(['El codón nuevo indica el mismo aminoácido.', 0, '¿La fila de aminoácidos cambia?'], ['La proteína se dobla distinto.', 1, '¿Cambió algo en la proteína?'], ['El gen está en una planta.', 2, '¿Dice algo del codón?']), bien: 'Mismo aminoácido, misma fila.' }, 'El mismo aminoácido apoya, doblarse distinto debilita y la planta no pesa.', ['¿Qué esperarías si no afecta?', 'La especie no dice nada del codón.'], 'Apoya: mismo aminoácido. Debilita: se dobla distinto']],
    'El cuerpo retiene agua y una letra puede no cambiar nada.', 'Ordena la respuesta y pesa cada dato.');

  const HOSTEL = D('hostel', 'At the hostel', [
    '"Good evening. Do you have a room for tonight?" asks Emma. "I\'m afraid we\'re full," says the man, "but my sister has a house near here."',
    '"That\'s very kind of you. How far is it?" "Five minutes on foot." "Do you mind if I leave my bike here?" "Not at all. Put it behind the door."',
    '"I\'m so tired," says Emma. "I cycled eighty kilometres today." "Congratulations! Would you like some soup before you go?" "I\'d love some," she says.']);
  reto('chat-1', ['icf-en-dialogos-1'], 2, 'At the hostel', 'Qué dato se pide', 'Una conversación en un hostal. Une preguntas con respuestas.', [
    ['Questions', 'Mira la palabra que pregunta.', 'voz-de-la-fuente', 'Match each answer with its question.', { ayuda: 'Tira un hilo desde cada respuesta hasta su pregunta.', doc: HOSTEL, portadas: [['How far is it?', 'question'], ['Do you have a room?', 'question'], ['Would you like some soup?', 'question']], ...T(['Five minutes on foot.', 0, '¿Es distancia, sí/no o una oferta?'], ['I\'m afraid we\'re full.', 1, '¿Es distancia, sí/no o una oferta?'], ['I\'d love some.', 2, '¿Es distancia, sí/no o una oferta?']), bien: 'Distance, room and offer.' }, '«How far» pide distancia, «do you have» un sí o no y «would you like» ofrece.', ['¿Cuál responde a cuánto hay de lejos?', '«I’m afraid» suaviza un no.'], 'Far: minutes. Room: full. Soup: love'],
    ['Who says it?', 'Busca «asks» y «says».', 'pinta-voces', 'Paint each sentence with its speaker.', { doc: HOSTEL, plumas: ['Emma', 'the man'], ...P(['We\'re full.', 1, 'Busca quién trabaja allí.'], ['I cycled eighty kilometres.', 0, 'Busca quién está cansada.'], ['Put it behind the door.', 1, 'Busca quién da permiso.'], ['That\'s very kind of you.', 0, 'Busca quién agradece.']), bien: 'A guest and a host.' }, 'Emma pide, agradece y cuenta; el hombre informa y ofrece.', ['¿Quién necesita un cuarto?', 'Quien da permiso es el del hostal.'], 'Emma: cycled, kind. Man: full, put']],
    'Each answer gives what the question asks.', 'Palabra que pregunta y quién habla.');
  reto('chat-2', ['icf-en-dialogos-2', 'icf-en-dialogos-3'], 3, 'Polite and tired', 'Fórmula y sentimiento', 'La misma conversación: permisos, sentimientos y reacciones.', [
    ['Yes or no', '«Do you mind» se responde al revés de lo que parece.', 'genero-o-cita', 'Does it say **yes** or **no**?', { doc: HOSTEL, rot: ['says yes', 'says no'], ...F(['Do you mind if I leave my bike? Not at all.', 0, 'Si no le molesta, ¿puede dejarla?'], ['Do you have a room? I\'m afraid we\'re full.', 1, '¿Hay un cuarto libre?'], ['Would you like some soup? I\'d love some.', 0, '¿Acepta la sopa?']), bien: 'Not at all gives permission.' }, '«Not at all» da permiso, «I’m afraid» niega y «I’d love some» acepta.', ['Traduce «mind» como molestar.', '«Love» muestra que sí quiere.'], 'Bike: yes. Room: no. Soup: yes'],
    ['Reactions', 'Nombra el sentimiento.', 'pista-tipo', 'Match each reaction with its situation.', { lineas: ['I cycled eighty kilometres!', 'My bike is broken.', 'I\'m hungry.'], ...T(['Congratulations!', 0, '¿Logro, problema o necesidad?'], ['I\'m sorry to hear that.', 1, '¿Logro, problema o necesidad?'], ['Would you like some soup?', 2, '¿Logro, problema o necesidad?']), bien: 'Achievement, problem and need.' }, 'Al logro se felicita, al problema se lamenta y al hambre se ofrece comida.', ['¿Cuál es una buena noticia?', 'A quien tiene hambre se le ofrece algo.'], 'Logro: congratulations. Problema: sorry. Hambre: soup']],
    'Not at all means yes, and each feeling has its answer.', 'Fórmulas de cortesía y reacciones.');
}
;
//#archivo js/gimnasio-icf-3.js
// Gimnasio del Preicfes, terceros mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-2.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('azar-1', ['icf-ma-azar-1', 'icf-ma-azar-2'], 2, 'Uniformes y cargos', 'Y multiplica; el orden decide', 'Un club diseña su uniforme y elige a su junta.', [
    ['El uniforme', 'Cada elección se combina con todas las otras.', 'arbol-ramas', 'Se combinan **3** camisetas, varias **pantalonetas** y **4** medias. ¿Cuántas pantalonetas dan **24** uniformes?', { a: 3, c: 4, total: 24, max: 10, et: 'pantalonetas' }, '$3 \\cdot n \\cdot 4 = 24$: dos pantalonetas.', ['Multiplica lo que ya conoces.', '¿Qué número por doce da el total?'], '3 · 4 = 12; 24 ÷ 12 = 2'],
    ['La junta', 'Los cargos son distintos: importa quién queda en cada uno.', 'cuantos-candidatos', 'Se puede elegir **presidenta y tesorera** de **42** maneras. ¿Cuántas candidatas hay?', { total: 42, max: 12, cargos: ['presidenta', 'tesorera'] }, '$7 \\cdot 6 = 42$: siete candidatas.', ['Son dos números seguidos.', 'Prueba multiplicando un número por el anterior.'], 'Dos seguidos que dan 42: el mayor es 7']],
    'Dos pantalonetas y siete candidatas.', 'Multiplica las elecciones y mira si el orden importa.');
  reto('azar-2', ['icf-ma-azar-3', 'icf-ma-azar-4'], 3, 'La bolsa y los sensores', 'Entre quiénes y todo menos ninguno', 'Una urna debe quedar pareja con otra y dos sensores vigilan una puerta.', [
    ['Urnas parejas', 'Iguala la parte del total, no la cantidad.', 'iguala-urnas', 'La urna A tiene **2** naranjas de **8** bolas. La B tiene **3** naranjas: échale verdes hasta que naranja sea **igual de probable**.', { a: 2, t: 8, b: 3, max: 14 }, 'En A es un cuarto: en B, 3 de 12; faltan 9 verdes.', ['Halla qué parte de A es naranja.', 'Las tres naranjas deben ser un cuarto del total de B.'], 'Un cuarto: total 12; verdes 12 − 3 = 9'],
    ['Al menos uno', 'Halla primero que fallen los dos.', 'falla-cuadrado', 'Dos sensores fallan con la **misma** probabilidad, sin afectarse. Al menos uno funciona con **0.91**. Mueve la de fallar.', { al: 0.91 }, 'Fallan los dos con 0.09: cada uno, con 0.3.', ['Resta de uno para saber cuándo fallan ambos.', 'Busca un número que por sí mismo dé nueve centésimas.'], '1 − 0.91 = 0.09, y su raíz = 0.3']],
    'Nueve verdes; cada sensor falla con 0.3.', 'Parte del total, y alguno es todo menos ninguno.');

  const PARED = D('mural2', '¿Pintar o no pintar?', [
    'El concejo estudiantil quiere cubrir de murales la pared del patio. Yo creo que debe hacerlo, pero no toda.',
    'La razón es simple: una pared que alguien pintó se cuida. En la sede vecina, los rayones bajaron a la mitad el año en que se pintó.',
    'Algunos profesores temen que los murales distraigan. Es posible, si están frente al tablero; la pared del patio no lo está.',
    'Por eso propongo empezar por una mitad y comparar. Si la otra amanece igual de rayada, sabremos qué hacer.']);
  reto('tesis-1', ['icf-lc-argumento-1'], 2, '¿Pintar o no pintar?', 'Tesis, razón y respuesta', 'Una carta corta. Encuentra qué defiende y cómo.', [
    ['La tesis', 'Busca lo que alguien podría discutir.', 'subraya-tesis', 'Subraya la oración del párrafo 1 que dice lo que se va a **defender**.', { doc: PARED, nums: [1], n: 1, va: ['1.1'], mira: { '1.0': 'Cuenta lo que quiere el concejo, no lo que defiende quien escribe.' }, bien: '«Yo creo» la anuncia.' }, '«Yo creo que debe hacerlo, pero no toda» es lo que defiende.', ['Busca quién habla en primera persona.', 'La otra oración solo cuenta un plan.'], 'Tesis: pintar, pero no toda'],
    ['Las piezas', 'Di el papel de cada oración.', 'pieza-argumento', 'Ata cada pieza a su oración.', { doc: PARED, lineas: ['Los rayones bajaron a la mitad.', 'Temen que distraigan.', 'La pared del patio no está frente al tablero.'], ...T(['prueba de la razón', 0, 'Busca un dato.'], ['contraargumento', 1, 'Busca lo que temen otros.'], ['respuesta', 2, 'Busca lo que contesta ese temor.']), bien: 'Prueba, objeción y respuesta.' }, 'El dato prueba, el temor objeta y el lugar responde.', ['Una trae un número.', 'Otra contesta a los profesores.'], 'Dato, temor y contestación']],
    'Defiende pintar una parte, con un dato y una respuesta.', 'Tesis, prueba, objeción y respuesta.');
  reto('tesis-2', ['icf-lc-argumento-2'], 3, 'El peso de los datos', 'Creer más o creer menos', 'La misma carta: ¿qué datos la harían más fuerte o más débil?', [
    ['Pesa', 'Supón cierto cada dato.', 'balanza-tesis', 'Tesis: pintar hace que la pared se cuide.', { doc: PARED, tesis: 'Pintar hace que la pared se cuide', ...F(['En tres sedes más también bajaron los rayones.', 0, '¿Se repite el resultado?'], ['Ese año la sede vecina puso cámaras.', 1, '¿Podría haber otra causa?'], ['La pintura era amarilla.', 2, '¿Cambia lo que se cuida?']), bien: 'Repetir apoya; otra causa debilita.' }, 'Más sedes apoyan, las cámaras ofrecen otra causa y el color no pesa.', ['¿Cuál ofrece otra explicación?', 'El color no cambia el cuidado.'], 'Apoya: sedes. Debilita: cámaras'],
    ['El alcance', 'Ni más ni menos que la prueba.', 'ajusta-alcance', 'Ajusta cada frase a la carta.', { doc: PARED, filas: [{ antes: 'Propone pintar', topes: ['toda la pared', 'la mitad', 'nada'], va: 1 }, { antes: 'El dato de los rayones viene de', topes: ['todo el país', 'ninguna parte', 'una sede'], va: 2 }], mira: ['Relee la propuesta del párrafo 4.', 'Relee de dónde salen los rayones.'], luz: [[4, 'por una mitad'], [2, 'En la sede vecina']], bien: 'Una mitad, una sede.' }, 'Propone una mitad y su dato es de una sede.', ['Busca «empezar por».', 'El dato es de un solo lugar.'], 'Mitad de la pared; una sede']],
    'Más sedes la harían fuerte; las cámaras, débil.', 'Pesa cada dato y cuida el alcance.');

  const TERMINAL = D('cancha', 'La cancha de las seis', [
    'En el barrio Los Pinos hay una sola cancha. A las seis la quieren los futbolistas, un grupo de baile de mayores y los dueños de perros.',
    'Los futbolistas dicen: «la cancha es para deporte». Las señoras del baile, que a esa hora salen de trabajar, piden la mitad. Los dueños de perros solo necesitan un lugar cercado.',
    'Un vecino dijo que «los jóvenes son unos egoístas». Una futbolista le recordó que su equipo limpia la cancha cada domingo.',
    'La junta propuso turnos. El baile pidió lunes y jueves; los perros aceptaron el lote de al lado si lo cercaban.']);
  reto('actor-1', ['icf-sc-perspectivas-1'], 2, 'La cancha de las seis', 'Posición, interés y actor', 'Tres grupos quieren el mismo lugar a la misma hora.', [
    ['¿Qué o para qué?', 'Pregunta para qué lo piden.', 'genero-o-cita', '¿Es **posición** o **interés**?', { doc: TERMINAL, rot: ['posición', 'interés'], ...F(['La cancha es para deporte', 0, '¿Dice qué quieren o para qué?'], ['Un lugar cercado para soltar al perro', 1, '¿Dice qué quieren o para qué?'], ['Que nos den la mitad', 0, '¿Dice qué quieren o para qué?'], ['Bailar al salir del trabajo', 1, '¿Dice qué quieren o para qué?']), bien: 'Se pide algo para algo.' }, 'Pedir la cancha o la mitad es posición; bailar o soltar al perro, interés.', ['Si responde «para qué», es interés.', 'Las que exigen un espacio son posiciones.'], 'Posición: exigir. Interés: para qué'],
    ['Quién es quién', 'Busca en el texto por qué lo pide cada quien.', 'voz-de-la-fuente', 'Ata cada interés a su actor.', { ayuda: 'Tira un hilo desde cada interés hasta su actor.', doc: TERMINAL, portadas: [['Futbolistas', 'actor'], ['Grupo de baile', 'actor'], ['Dueños de perros', 'actor']], ...T(['Jugar', 0, '¿Quién habla de deporte?'], ['Moverse después del trabajo', 1, '¿Quién sale de trabajar a esa hora?'], ['Un sitio cerrado', 2, '¿Quién necesita una cerca?']), bien: 'Jugar, bailar y soltar.' }, 'Los futbolistas juegan, las señoras bailan y los dueños necesitan cerca.', ['Uno no necesita la cancha misma.', 'Busca quién sale de trabajar.'], 'Deporte: fútbol. Salida: baile. Cerca: perros']],
    'Tres posiciones chocan; los intereses caben.', 'Pregunta para qué y aparecen salidas.');
  reto('actor-2', ['icf-sc-perspectivas-2', 'icf-sc-perspectivas-3'], 3, 'Turnos y prejuicios', 'Hecho contra etiqueta', 'En la discusión hay un prejuicio y una propuesta. Evalúalos.', [
    ['Prejuicio o hecho', '¿Juzga a todo un grupo o se puede comprobar?', 'genero-o-cita', '¿**Prejuicio** o se puede **comprobar**?', { doc: TERMINAL, rot: ['prejuicio', 'se puede comprobar'], ...F(['Los jóvenes son unos egoístas', 0, '¿Habla de un hecho o de un grupo entero?'], ['El equipo limpia los domingos', 1, '¿Se podría ir a mirar?'], ['Las señoras siempre se quejan', 0, '¿Habla de un hecho o de un grupo entero?'], ['Hay una sola cancha', 1, '¿Se podría contar?']), bien: 'La etiqueta no cuenta nada.' }, 'Las etiquetas juzgan al grupo; limpiar y contar se comprueban.', ['Busca palabras como «siempre» y «son».', 'Lo que se puede ir a ver no es prejuicio.'], 'Etiquetas: prejuicio. Contar o mirar: hecho'],
    ['La propuesta', 'Mira a quién atiende y a quién no.', 'balanza-tesis', 'Tesis: los turnos atienden a todos.', { doc: TERMINAL, tesis: 'Los turnos atienden a todos', ...F(['El baile tendría lunes y jueves.', 0, '¿Atiende a alguien?'], ['Nadie paga la cerca del lote.', 1, '¿Quién quedaría por fuera?'], ['El barrio se llama Los Pinos.', 2, '¿Cambia los turnos?']), bien: 'Sin cerca, alguien queda por fuera.' }, 'Los días del baile apoyan, la cerca sin dueño debilita y el nombre no pesa.', ['¿Quién puso una condición?', 'El nombre del barrio no decide.'], 'Apoya: días. Debilita: cerca']],
    'Hay un prejuicio y una buena salida, si alguien paga la cerca.', 'Separa etiquetas de hechos y busca quién queda por fuera.');

  const TRINEO = D('trineo', 'El trineo de madera', [
    'Un trineo de 20 kilos es jalado con 100 newtons. Sobre arena, el roce es de 60; sobre hielo, de 10.',
    'En la arena acelera 2 metros por segundo cada segundo; en el hielo, 4.5.',
    'Cuando se sube una niña de 20 kilos, en el hielo acelera menos.']);
  reto('mov-1', ['icf-cn-movimiento-2'], 2, 'El trineo de madera', 'Fuerza neta y masa', 'Un trineo en dos pisos distintos y con más carga.', [
    ['La neta', 'El roce va en sentido contrario: se resta.', 'ajusta-alcance', 'Ajusta cada frase a los datos.', { doc: TRINEO, filas: [{ antes: 'En la arena la fuerza neta es', topes: ['160 N', '40 N', '60 N'], va: 1 }, { antes: 'En el hielo la fuerza neta es', topes: ['110 N', '10 N', '90 N'], va: 2 }], mira: ['Resta el roce de la arena.', 'Resta el roce del hielo.'], luz: [[1, '100 newtons']], bien: 'Se restan los roces.' }, '$100 - 60 = 40$ y $100 - 10 = 90$.', ['El roce se opone al jalón.', 'Haz una resta para cada piso.'], '100 − 60 y 100 − 10 = 90'],
    ['Con más carga', 'Con la misma fuerza, más masa acelera menos.', 'balanza-tesis', 'Tesis: con el doble de masa y la misma fuerza neta, acelera la mitad.', { doc: TRINEO, tesis: 'Con el doble de masa acelera la mitad', ...F(['Con la niña y 90 N de fuerza neta aceleró 2.25 en vez de 4.5.', 0, '¿Es la mitad?'], ['Con 40 kilos y la misma fuerza neta aceleró igual que con 20.', 1, '¿Cambió al duplicar la masa?'], ['La niña llevaba gorro.', 2, '¿Cuánto cambia eso?']), bien: '2.25 es la mitad de 4.5.' }, 'La mitad apoya, acelerar igual debilitaría y el gorro no pesa.', ['Compara con 4.5.', 'Busca el dato que no dice nada.'], 'Mitad: apoya. Igual: debilita']],
    'Netas de 40 y 90 N; el doble de masa acelera la mitad.', 'Junta las fuerzas y repártelas en la masa.');
  reto('mov-2', ['icf-cn-movimiento-1', 'icf-cn-movimiento-3'], 3, 'Viajes y caídas', 'Datos en orden', 'Completa tres movimientos y ordena una caída.', [
    ['Tres viajes', 'Distancia es velocidad por tiempo.', 'tres-viajes', 'Completa el dato que falta.', { viajes: [{ n: 'canoa', d: 18, v: 12, t: 1.5, falta: 'd' }, { n: 'patines', d: 48, v: 16, t: 3, falta: 't' }, { n: 'tren', d: 175, v: 70, t: 2.5, falta: 'v' }], fichas: ['18', '3', '70', '13.5', '32', '172'] }, '$12 \\cdot 1.5 = 18$; $48 \\div 16 = 3$; $175 \\div 2.5 = 70$.', ['Multiplica para la distancia y divide para lo demás.', 'El tren: reparte los kilómetros entre las dos horas y media.'], '12 · 1.5; 48 ÷ 16; 175 ÷ 2.5 = 70'],
    ['La caída', 'Cada segundo gana lo mismo.', 'pasos-del-proceso', 'Ordena lo que le pasa a una paracaidista. El primero está en su puesto.', { que: 'la caída', de: 'De la avioneta al suelo', fija: 1, ini: [0, 2, 3, 1], tiras: ['Salta: solo cuenta el peso.', 'Gana velocidad y el aire la frena más.', 'El aire iguala al peso: velocidad constante.', 'Abre el paracaídas y frena.'], mira: ['', 'El aire frena más cuando ya va rápido.', 'Se equilibra después de ganar velocidad.', 'Lo abre cuando ya va a velocidad constante.'], bien: 'Acelerar, equilibrar y frenar.' }, 'Salta, gana velocidad, se equilibra y abre el paracaídas.', ['¿Cuándo frena más el aire?', 'Frenar con el paracaídas va al final.'], 'Salta, acelera, equilibra, abre']],
    'Los tres viajes completos y la caída en orden.', 'd = v · t, y fuerza neta cero es velocidad constante.');

  const PUENTE = D('bridge', 'The bridge', [
    'My town has the oldest bridge in the region. It was built in 1890, and people have crossed it every day since then.',
    'Last year, while engineers were painting it, they found a letter in the wood. Nobody knows who wrote it.',
    'A new bridge is going to open in March. It will be wider and safer, but it won\'t be as beautiful as the old one, so we have asked the mayor to keep both.']);
  reto('gram-1', ['icf-en-gramatica-1'], 2, 'The bridge', 'Palabra de tiempo y verbo', 'Un texto corto. Ubica cada hecho en su tiempo.', [
    ['When?', 'Mira la forma del verbo.', 'linea-vida', 'Put each fact in its moment.', { doc: PUENTE, rot: ['before', 'until now', 'the future'], ...F(['It was built', 0, 'Mira la fecha.'], ['They found a letter', 0, 'Busca «last year».'], ['People have crossed it', 1, 'Busca «since».'], ['A new bridge is going to open', 2, 'Busca «going to».']), luz: [[1, 'since then'], [3, 'is going to open']], bien: 'Dates, since and going to.' }, '«Was built» y «found» terminaron, «have crossed» sigue y «going to» es futuro.', ['Busca las palabras de tiempo.', '«Since» llega hasta hoy.'], 'Was, found: antes. Have: hasta hoy. Going to: futuro'],
    ['Match', 'Di qué hace cada verbo.', 'pista-tipo', 'Match each idea with its sentence.', { doc: PUENTE, lineas: ['They were painting it.', 'They found a letter.', 'It will be wider.'], ...T(['a long action in the past', 0, 'Busca «were» y «-ing».'], ['a short action in the past', 1, 'Busca un pasado simple.'], ['a prediction', 2, 'Busca el futuro.']), bien: 'Long, short and future.' }, 'La larga lleva «were painting», la corta «found» y la predicción «will».', ['La larga termina en -ing.', 'La predicción lleva «will».'], 'Were -ing, found, will']],
    'Every verb has its time word.', 'Palabra de tiempo primero, verbo después.');
  reto('gram-2', ['icf-en-gramatica-2', 'icf-en-gramatica-3'], 3, 'Old or new?', 'Comparar y unir', 'El mismo texto: compara los dos puentes y une ideas.', [
    ['Compare', '«Not as… as» quiere decir menos.', 'ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: PUENTE, filas: [{ antes: 'The new bridge will be', topes: ['narrower', 'as wide', 'wider'], va: 2 }, { antes: 'The old bridge is', topes: ['less beautiful', 'more beautiful', 'as beautiful'], va: 1 }], mira: ['Busca cómo será el nuevo.', 'Busca «as beautiful as» y mira si hay un «not».'], luz: [[3, 'wider and safer'], [3, 'won\'t be as beautiful as']], bien: 'Wider, but less beautiful.' }, 'El nuevo será más ancho y menos bonito: el viejo es más bonito.', ['«Wider» compara el ancho.', 'Si el nuevo no es tan bonito, ¿cuál lo es más?'], 'Nuevo: wider. Viejo: more beautiful'],
    ['Join', 'Di qué hace la segunda idea.', 'bisagras', 'Put the word that joins. Sobran dos.', { doc: PUENTE, pares: [['It won\'t be as beautiful,', 'we asked the mayor to keep both.'], ['It will be safer,', 'it won\'t be as beautiful.']], ...F(['so', 0, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['but', 1, 'Contrasta: ¿dónde una cosa es buena y otra no?'], ['because', null, 'Daría la causa: ninguna segunda idea lo es.'], ['when', null, 'It is about time: no pair is.']), bien: 'Result and contrast.' }, 'Pedirle al alcalde es el resultado; seguro y menos bonito contrastan.', ['Una pareja tiene algo bueno y algo malo.', 'La otra termina en lo que hicieron.'], 'Resultado: so. Contraste: but']],
    'The new bridge is wider; the old one is more beautiful.', 'Compara con cuidado y une con sentido.');
}
;
//#archivo js/gimnasio-icf-4.js
// Gimnasio del Preicfes, cuartos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-3.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('medida-1', ['icf-ma-medida-1', 'icf-ma-medida-2'], 2, 'La placa y la plazoleta', 'Completar y quitar', 'Un taller corta una placa y un parque rodea una plazoleta. Mide las dos.', [
    ['La placa', 'Lo que queda es el total menos el hueco.', 'marco-hueco', 'A una placa de 12 por 6 se le abre un hueco **cuadrado**. Ajústalo hasta que queden **47** cuadros.', { w: 12, h: 6, area: 47 }, '$72 - 25 = 47$: el hueco es un cuadrado de lado 5.', ['Resta lo que debe quedar de la placa completa.', 'Busca un número que, por sí mismo, dé lo que se quitó.'], '72 − 47 = 25 = lado por lado; lado 5'],
    ['La plazoleta', 'Resta superficies de círculos.', 'anillo-justo', 'A un disco de radio 5 se le abre un hueco redondo. Ajústalo hasta que el anillo mida $21\\pi$.', { R: 5, area: 21 }, '$25\\pi - 21\\pi = 4\\pi$: el hueco tiene radio 2.', ['Halla la superficie del disco completo.', 'Lo que sobra es el hueco: ¿qué radio tiene?'], '25π − 21π = 4π; radio 2']],
    'Un hueco de lado 5 y otro de radio 2.', 'Total menos lo que queda: eso es el hueco.');
  reto('medida-2', ['icf-ma-medida-3'], 3, 'El tanque y el embudo', 'Capas, tercios y litros', 'Una finca llena un tanque y un embudo de granos.', [
    ['El tanque', 'Pasa los litros a metros cúbicos.', 'litros-nivel', 'Un tanque tiene fondo de 5 m por 2 m. Se le echan **25 000 litros**. ¿Hasta dónde sube el agua?', { a: 5, b: 2, litros: 25000 }, 'Son 25 m³ sobre 10 m²: 2.5 m.', ['Cada metro cúbico tiene mil litros.', 'Reparte los metros cúbicos entre el área del fondo.'], '25 m³ ÷ 10 m² = 2.5 m'],
    ['El embudo', 'Una pirámide llena un tercio de su prisma.', 'piramide-altura', 'El embudo es una pirámide de base cuadrada de lado 6. Dale altura hasta que quepan **48**.', { a: 6, vol: 48 }, '$\\tfrac13 \\cdot 36 \\cdot h = 12h = 48$: altura 4.', ['Halla el área de la base y toma su tercera parte.', 'Mira cuántas veces cabe esa tercera parte en el volumen.'], '36 ÷ 3 = 12; 48 ÷ 12 = 4']],
    'El agua sube 2.5 m y el embudo mide 4 de alto.', 'Litros a metros cúbicos, y la pirámide es un tercio.');

  const PARAGUAS = D('paraguas', 'El paraguas rojo', [
    'Mi tía abría el paraguas rojo todos los jueves, lloviera o no, y se sentaba en la banca del paradero. Yo le llevaba el café y no preguntaba.',
    'El paraguas era una flor terca en medio del polvo. Los choferes la saludaban con la bocina. «Todavía no», les decía ella, y ellos seguían.',
    'Un jueves bajó del bus un hombre canoso, con un paraguas igual. Se miraron como dos relojes que de pronto dan la misma hora.',
    'Desde entonces, cuando llueve, los dos salen sin paraguas.']);
  reto('lit-1', ['icf-lc-literario-1'], 2, 'El paraguas rojo', 'Quién cuenta y qué cambia', 'Un cuento muy corto. Encuentra a quien lo cuenta y lo que cambia.', [
    ['Lo que se deduce', 'Junta gestos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PARAGUAS, nums: [1, 2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Los choferes la saludaban con la bocina.', 0, 'Léela junto al párrafo 2.'], ['Ella esperaba a alguien.', 1, '¿Qué significa «Todavía no»?'], ['El hombre canoso era a quien ella esperaba.', 1, '¿Qué traía él y qué pasó después?'], ['El hombre era chofer.', 2, '¿Se dice su oficio?']), luz: [[2, 'saludaban con la bocina'], [2, 'Todavía no'], [3, 'un paraguas igual']], bien: 'Los gestos hablan.' }, 'La bocina está escrita; la espera y a quién esperaba se deducen; el oficio no.', ['Busca la oración exacta de cada afirmación.', 'Si hace falta unir dos datos, se deduce.'], 'Bocina: dice. La espera y el hombre: se deducen'],
    ['El cambio', 'Compara el comienzo con el final.', 'comprueba-apuesta', 'Subraya la oración que muestra **lo que cambió** entre el comienzo y el final.', { doc: PARAGUAS, nums: [3, 4], apuesta: 'Ya no necesitan la señal.', ...S(['4.0'], { '3.0': 'Cuenta quién llegó.', '3.1': 'Cuenta cómo se miraron.' }), bien: 'De abrirlo sin lluvia a no usarlo con lluvia.' }, 'Antes abría el paraguas sin lluvia; ahora salen sin él aunque llueva.', ['¿Para qué servía el paraguas al comienzo?', 'Compara cuándo lo abría antes y qué hacen ahora.'], 'Al final ya no hace falta la señal']],
    'Ella esperaba a ese hombre; la espera terminó.', 'Los gestos muestran y el final se compara con el comienzo.');
  reto('lit-2', ['icf-lc-literario-2', 'icf-lc-literario-3'], 3, 'Una flor terca', 'Figuras y sentido', 'El mismo cuento: mira cómo está dicho.', [
    ['Las figuras', 'Busca «como», «era» o un rasgo de persona.', 'pinta-tipos', 'Pinta cada frase con su recurso.', { doc: PARAGUAS, plumas: ['metáfora', 'símil', 'literal'], ...P(['El paraguas era una flor terca.', 0, '¿Dice que es otra cosa, compara con «como» o lo cuenta tal cual?'], ['Se miraron como dos relojes.', 1, '¿Dice que es otra cosa, compara con «como» o lo cuenta tal cual?'], ['Yo le llevaba el café.', 2, '¿Dice que es otra cosa, compara con «como» o lo cuenta tal cual?']), bien: 'Es, como y tal cual.' }, '«Era una flor» identifica, «como dos relojes» compara y el café es literal.', ['Busca primero la palabra «como».', 'Pregunta si una cámara lo habría grabado así.'], 'Metáfora, símil y literal'],
    ['El sentido', 'El objeto cambia con los personajes.', 'talla-idea', 'Tres interpretaciones del paraguas: pon cada una en su talla.', { doc: PARAGUAS, p: 2, rot: ['se queda en un detalle', 'justa', 'dice de más'], ...F(['Es de color rojo.', 0, 'Es cierto, pero ¿qué quiere decir?'], ['Es la señal de una espera que no se rinde.', 1, 'Compárala con «terca» y «Todavía no».'], ['Prueba que el hombre la abandonó.', 2, '¿El cuento dice por qué se separaron?']), luz: [[2, 'flor terca'], [2, 'Todavía no']], bien: 'Terca como la espera.' }, 'El color es un detalle y el abandono no se cuenta; la señal de la espera lo explica todo.', ['¿Cuándo lo abría y cuándo dejó de abrirlo?', 'Descarta la que inventa un motivo.'], 'Rojo: detalle. Espera: justa. Abandono: de más']],
    'Metáfora y símil; el paraguas es la espera.', 'Nombra la figura, tradúcela y mira qué carga el objeto.');

  const RIO = D('puente-fuentes', 'El puente de Agua Clara', [
    'Placa de 1935: «El progreso llega a Agua Clara. Obra del señor gobernador».',
    'Libreta de un albañil, 1934: «Van tres meses sin pago. Ayer cayó Moisés. Nadie paró la obra».',
    'Artículo de una historiadora, 2019: con los libros de cuentas muestra que el puente costó el doble de lo anunciado.',
    'La familia de Moisés guarda una foto suya, sin fecha. Es la única que existe.']);
  reto('fuentes-1', ['icf-sc-fuentes-1'], 2, 'El puente de Agua Clara', 'Tipo y propósito', 'Cuatro huellas de un puente. Di qué es cada una y para qué sirve.', [
    ['Tipo de fuente', 'De la época o sobre la época.', 'genero-o-cita', '¿Es fuente **primaria** o **secundaria** sobre la construcción?', { doc: RIO, rot: ['primaria', 'secundaria'], ...F(['La libreta del albañil', 0, '¿La escribió quien estaba allí?'], ['El artículo de 2019', 1, '¿Se hizo con otras fuentes, después?'], ['La placa de 1935', 0, '¿Es de la época?']), bien: 'De entonces o sobre entonces.' }, 'Libreta y placa son de la época; el artículo la estudia.', ['Mira la fecha de cada una.', 'La que estudia libros de cuentas llegó después.'], 'Libreta y placa: primarias. Artículo: secundaria'],
    ['Para qué se hizo', 'Pregunta qué ganaba quien la hizo.', 'voz-de-la-fuente', 'Ata cada propósito a su fuente.', { ayuda: 'Tira un hilo desde cada propósito hasta su fuente.', doc: RIO, portadas: [['La placa', 'fuente'], ['La libreta', 'fuente'], ['El artículo', 'fuente']], ...T(['quedar bien ante el público', 0, '¿Cuál se puso a la vista de todos?'], ['anotar lo que se vivió', 1, '¿Cuál era privada?'], ['explicar con documentos', 2, '¿Cuál usa libros de cuentas?']), bien: 'Lucirse, anotar y explicar.' }, 'La placa luce al gobernador, la libreta anota y el artículo explica.', ['Una es pública y otra, privada.', 'La que explica vino después.'], 'Placa: lucirse. Libreta: anotar. Artículo: explicar']],
    'Dos primarias y una secundaria, con tres propósitos.', 'Fecha y propósito primero.');
  reto('fuentes-2', ['icf-sc-fuentes-2', 'icf-sc-fuentes-3'], 3, 'Lo que prueba y lo que calla', 'Límites y conclusiones', 'Las mismas huellas: mide qué se puede concluir.', [
    ['Sale o dice de más', 'Compara con lo que la fuente muestra.', 'genero-o-cita', '¿La conclusión **sale** de las fuentes o **dice de más**?', { doc: RIO, rot: ['sale de ellas', 'dice de más'], ...F(['El albañil anotó que no le pagaban', 0, '¿Está en la libreta?'], ['Todos los puentes de la época costaron el doble', 1, '¿El artículo habla de todos?'], ['El costo real superó lo anunciado', 0, '¿Lo muestra el artículo?'], ['El gobernador se quedó con el dinero', 1, '¿Alguna fuente lo muestra?']), bien: 'Ni todos ni culpables sin prueba.' }, 'La libreta y el artículo sostienen dos; «todos» y la culpa van más allá.', ['Cuidado con la palabra «todos».', 'Superar lo anunciado no dice quién se quedó con la plata.'], 'Anotó y superó: salen. Todos y culpa: de más'],
    ['La balanza', 'Supón cierto cada dato.', 'balanza-tesis', 'Tesis: «la placa oculta cómo se hizo el puente». ¿Qué hace cada dato?', { doc: RIO, tesis: 'La placa oculta cómo se hizo el puente', ...F(['La libreta cuenta meses sin pago.', 0, '¿La placa lo menciona?'], ['Otra placa, al lado, nombra a los obreros caídos.', 1, '¿Estaría oculto?'], ['El puente tiene dos arcos.', 2, '¿Habla de cómo se hizo?']), bien: 'Lo que falta también es un dato.' }, 'Los meses sin pago la apoyan; nombrar a los obreros la debilitaría; los arcos no pesan.', ['Mira qué dice la placa y qué calla.', 'Si algo se muestra al lado, ¿está oculto?'], 'Sin pago: apoya. Otra placa: debilita']],
    'El albañil anotó y el costo superó lo anunciado; la placa calla.', 'Cada fuente prueba lo suyo; lo que calla se busca en otra.');

  const SOPA = D('sal-marina', 'Agua de mar en una botella', [
    'Un grupo trajo del mar una botella con agua, arena y un clavo oxidado a medias. Quería el agua dulce, la sal y la arena, por separado.',
    'Primero sacó el clavo. Después dejó pasar todo por un papel. Luego calentó lo que pasó y recogió el vapor en un frasco frío.',
    'En el papel quedó la arena; en la olla, la sal; en el frasco, agua sin sabor. Pesaron todo: faltaban dos gramos, pegados a los recipientes.']);
  reto('materia-1', ['icf-cn-materia-1', 'icf-cn-materia-2'], 2, 'Agua de mar en una botella', 'La propiedad manda', 'Sigue una separación y explica por qué funciona.', [
    ['El orden', 'Busca «Primero», «Después» y «Luego».', 'pasos-del-proceso', 'Ordena la separación. El primer paso está en su puesto.', { doc: SOPA, que: 'la separación', de: 'La botella de mar', fija: 1, ini: [0, 2, 3, 1], tiras: ['Sacar el clavo.', 'Filtrar con papel.', 'Calentar lo que pasó.', 'Enfriar el vapor y recogerlo.'], mira: ['', 'Se filtra antes de calentar.', 'Se calienta lo que ya pasó por el papel.', 'El vapor aparece al calentar.'], bien: 'Clavo, filtro, calor y frío.' }, 'Sacan el clavo, filtran, calientan y enfrían el vapor.', ['La arena se quita antes de calentar.', 'No hay vapor sin calor.'], 'Clavo, filtrar, calentar, enfriar'],
    ['La propiedad', 'Pregunta en qué se diferencian.', 'pista-tipo', 'Ata cada propiedad a lo que separó.', { doc: SOPA, lineas: ['la arena del agua', 'el agua de la sal', 'el vapor en gotas'], ...T(['no se disuelve', 0, '¿Cuál no pasó por el papel?'], ['una hierve y la otra no', 1, '¿Cuál se logró con calor?'], ['al enfriar se junta', 2, '¿Cuál se logró con frío?']), bien: 'Granos, hervor y frío.' }, 'La arena no se disuelve, el agua hierve sin llevarse la sal y el vapor se condensa.', ['El papel retiene lo que no se disuelve.', 'Calor y frío hacen cambios opuestos.'], 'No se disuelve; hierve; se condensa']],
    'Clavo, filtro, calor y frío.', 'Cada método aprovecha una diferencia.');
  const PANELA = D('panela', 'La panela en agua', [
    'En un vaso de agua a 10 °C cupieron 40 gramos de panela; a 30 °C, 50; a 50 °C, 75. Lo que se echó de más quedó en el fondo.',
    'Con la cuchara, la panela se disolvió antes, pero el sobrante fue el mismo. Solo se probó con panela.']);
  reto('materia-2', ['icf-cn-materia-3'], 3, 'La panela en agua', 'Cuánto cabe y qué cambia', 'Una prueba de solubilidad: lee la gráfica y mide lo que se concluye.', [
    ['La gráfica', 'Mira cuánto vale cada línea.', 'lee-escala', 'La gráfica muestra los gramos que caben en un vaso a 10, 30 y 50 °C. Pon cada valor y cuánto sube de 10 a 50 °C.', { vals: [40, 50, 75], rot: ['10 °C', '30 °C', '50 °C'], hi: 80, st: 20, et: ['10 °C', '30 °C', '50 °C', 'sube'], ops: ['', '', ''], metas: ['40', '50', '75', '35'], fichas: ['40', '50', '75', '35', '45', '70', '115'], mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre dos líneas.', 'Está a tres cuartos del camino entre dos líneas.', 'Resta el primero al último.'], trampas: { '1:45': 'La mitad de una línea son diez.', '2:70': 'Pasa de la mitad del tramo.', '3:115': 'Eso es la suma.' }, ok: 'Con más calor, cabe más.' }, 'Las líneas van de 20 en 20: 40, 50 y 75; sube 35.', ['Cada línea vale veinte.', 'Lee los tres antes de restar.'], '75 − 40 = 35'],
    ['La conclusión', 'No digas más de lo medido.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo que se puede afirmar.', { doc: PANELA, filas: [{ antes: 'De 10 a 50 °C, en este vaso,', topes: ['cabe menos', 'cabe lo mismo', 'cabe más'], va: 2 }, { antes: 'Si se agita a 10 °C, cabe', topes: ['lo mismo', 'más', 'menos'], va: 0 }, { antes: 'En todos los sólidos pasa igual:', topes: ['seguro', 'no se sabe', 'nunca'], va: 1 }], mira: ['Compara la primera cantidad con la última.', 'Busca qué pasó con la cuchara.', 'Mira cuántas sustancias se probaron.'], luz: [[1, 'a 50 °C, 75'], [2, 'el sobrante fue el mismo'], [2, 'Solo se probó con panela']], bien: 'Más, lo mismo y no se sabe.' }, 'Cabe más con calor, agitar solo apura y un sólido no habla por todos.', ['Agitar cambia la rapidez, no el límite.', '¿Cuántas sustancias se midieron?'], 'Más; lo mismo; no se sabe']],
    'Sube 35 gramos; agitar no cambia el límite.', 'Lee la escala y no generalices con un solo caso.');

  const KITE = D('kites', 'Kites on Sunday', [
    'Hi Vera! The kite contest is on Sunday at nine, not on Saturday, because it is going to rain. Can you bring the glue? I have the paper. Don\'t tell Hugo: it is a surprise for him. Pía',
    'Hi Pía! Of course. Hugo has asked me twice why I am buying so much glue. I told him that my shoes were broken. He has offered to fix them! See you on Sunday. Vera']);
  reto('corto-1', ['icf-en-corto-1'], 2, 'Kites on Sunday', 'Quién, qué y cuándo', 'Two messages. Find who writes, what for and when.', [
    ['Who?', 'Mira el saludo y la firma.', 'pinta-voces', 'Paint each message with its writer.', { doc: KITE, plumas: ['Pía', 'Vera'], ...P(['I have the paper.', 0, 'Busca quién firma ese mensaje.'], ['I am buying so much glue.', 1, 'Busca quién firma ese mensaje.'], ['It is a surprise for him.', 0, 'Busca quién firma ese mensaje.'], ['I told him that my shoes were broken.', 1, 'Busca quién firma ese mensaje.']), bien: 'The name is at the end.' }, 'Pía escribe el primero y Vera, el segundo.', ['La firma está al final.', 'El nombre del saludo es de quien recibe.'], 'Primero: Pía. Segundo: Vera'],
    ['What can you deduce?', 'Une dos datos.', 'dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: KITE, nums: [1, 2], rot: ['it says so', 'you can deduce it', 'it does not say'], ...F(['The contest is on Sunday.', 0, 'Busca el día en el primer mensaje.'], ['Vera lied about her shoes.', 1, '¿Para qué era el pegamento de verdad?'], ['Hugo won last year.', 2, '¿Se habla del año pasado?']), luz: [[1, 'on Sunday'], [2, 'my shoes were broken']], bien: 'The glue is for the kite.' }, 'El día está escrito; que los zapatos eran una excusa se deduce; del año pasado no se habla.', ['Busca el día en el primer mensaje.', 'Piensa para qué quería el pegamento.'], 'Sunday: dice. Shoes: se deduce']],
    'Pía writes first; the shoes were an excuse.', 'Firma, propósito y unir dos datos.');
  const CLOCK = D('clock-shop', 'The shop that opens at night', [
    'Ivo\'s shop opens at eight in the evening and closes at dawn. He repairs alarm clocks, and he says that people only think about them at night.',
    'Last winter, the electricity failed in the whole neighbourhood. Ivo put fifty old clocks in his window, all of them ringing at six. Nobody was late for work that day.',
    'Since then, his neighbours have called him "the sun". He does not like the name: he is never awake to see it.']);
  reto('corto-2', ['icf-en-corto-2'], 3, 'The shop that opens at night', 'Idea, palabra y verdad', 'A short story. Find the idea, a word and what it does not say.', [
    ['Correct or not there', 'Señala la oración.', 'genero-o-cita', 'Is it **correct** or does the text **not say** it?', { doc: CLOCK, rot: ['correct', 'doesn\'t say'], ...F(['Ivo works at night.', 0, '¿Encuentras la oración?'], ['Ivo has a son.', 1, '¿Encuentras la oración?'], ['The clocks rang at six.', 0, '¿Encuentras la oración?'], ['The shop is expensive.', 1, '¿Encuentras la oración?']), bien: 'Point at the sentence.' }, 'El horario y las seis están escritos; el hijo y los precios no aparecen.', ['Si no la puedes señalar, no lo dice.', 'Lee el párrafo 2 para la hora.'], 'Night y six: correct. Son y price: no'],
    ['The main idea', 'Debe servir para todo.', 'talla-idea', 'Put each sentence in its size.', { doc: CLOCK, p: 2, rot: ['only a detail', 'just right', 'says too much'], ...F(['There were fifty clocks.', 0, 'It is true, but what happened with them?'], ['Ivo helped everyone to wake up without electricity.', 1, 'Does it cover the paragraph?'], ['Ivo has brought electricity back.', 2, 'Does the text say that?']), luz: [[2, 'the electricity failed'], [2, 'Nobody was late']], bien: 'The clocks did the work.' }, 'Cincuenta relojes es un detalle; no devolvió la luz: despertó a todos.', ['¿Qué logró con los relojes?', 'Descarta la que no está en el texto.'], 'Cincuenta: detalle. Ayudó: justa']],
    'Ivo woke everyone up; nothing is said about a son or prices.', 'Señala la oración y busca la idea que cubre todo.');
}
;
//#archivo js/gimnasio-icf-5.js
// Gimnasio del Preicfes, quintos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-4.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('lineal-1', ['icf-ma-lineal-1', 'icf-ma-lineal-2'], 2, 'La bicicleta alquilada', 'Fijo y por cada uno', 'Un local alquila bicicletas. Arma su tarifa y úsala.', [
    ['La recta', 'Lo fijo es donde empieza; el cambio, cuánto sube.', 'tarifa-recta', 'Cobra **4 mil** fijos y **2 mil por hora**. Arma su recta.', { b: 4, m: 2, xm: 8, ym: 24, sy: 4, ex: 'horas', ey: 'mil $' }, 'Empieza en 4 y a las 8 horas va en $4 + 16 = 20$.', ['El extremo izquierdo es lo que se paga sin usar horas.', 'Al fijo súmale lo de todas las horas.'], 'Empieza en 4 y llega a 4 + 2 · 8 = 20'],
    ['El presupuesto', 'Quita lo fijo y reparte.', 'llega-presupuesto', 'En otro local cobran **15** fijos y **6 por hora**. ¿Cuántas horas dan un total de **69**?', { b: 15, m: 6, total: 69, max: 15, et: 'horas', uno: 'hora' }, '$69 - 15 = 54$ y $54 \\div 6 = 9$.', ['Lo fijo se paga una sola vez.', 'Reparte lo que queda entre lo de una hora.'], '69 − 15 = 54; 54 ÷ 6 = 9']],
    'La recta va de 4 a 20; nueve horas.', 'Fijo una vez y cambio por cantidad.');
  reto('lineal-2', ['icf-ma-lineal-3'], 3, 'Dos planes de internet', 'El cruce decide', 'A cobra 6 fijos y 5 por GB; B, 30 fijos y 2 por GB. Di desde dónde conviene cada uno.', [
    ['El cruce', 'Lo que se llevan entre lo que se acercan.', 'cruce-planes', 'A: **6** fijos y **5 por GB**. B: **30** fijos y **2 por GB**. ¿Con cuántos GB cuestan **lo mismo**?', { a: [6, 5], c: [30, 2], max: 12, et: 'GB', uno: 'GB' }, '$30 - 6 = 24$ y se acercan 3 por GB: 8.', ['Resta los fijos de los dos planes.', 'Reparte esa resta entre lo que se acercan con cada GB.'], '24 ÷ 3 = 8'],
    ['De qué lado', 'Prueba un número de cada lado.', 'zona-conviene', 'A: 6 fijos y 5 por GB. B: 30 fijos y 2 por GB. Pinta los GB en que **A es más barato**.', { max: 12, x: 8, d: -1, et: 'GB en que A es más barato', ok: 'Antes del empate gana el de menor fijo.', st: 2 }, 'Con pocos GB, A cuesta menos: con 1, vale 11 y B, 32.', ['El borde es donde empatan.', 'Calcula los dos con un solo GB.'], 'Menos de 8 GB']],
    'Empatan en 8 GB; antes conviene A.', 'Halla el cruce y prueba cada lado.');

  const OLVIDO = D('olvido', 'Elogio del olvido', [
    '¿Sería mejor recordarlo todo? Parece que sí: nadie perdería las llaves ni los cumpleaños.',
    'Pero supongamos a alguien que no olvida nada. Guardaría cada aguacero de su vida por separado, con sus gotas y sus charcos. No podría decir «lluvia».',
    'Sostengo que entender es dejar caer detalles. Quien lo guarda todo tiene un archivo, no una idea.',
    'No digo que la memoria sobre. Digo que, sin algo de olvido, no sabríamos qué hacer con ella.']);
  reto('filo-1', ['icf-lc-filosofico-1'], 2, 'Elogio del olvido', 'Pregunta, caso y tesis', 'Un ensayo muy corto. Sigue su razonamiento.', [
    ['Las piezas', 'Di el papel de cada oración.', 'pieza-argumento', 'Ata cada papel a su oración.', { doc: OLVIDO, lineas: ['Parece que sí: nadie perdería las llaves.', 'Supongamos a alguien que no olvida nada.', 'Sostengo que entender es dejar caer detalles.'], ...T(['respuesta que se prueba primero', 0, 'Busca lo que «parece».'], ['caso imaginado', 1, 'Busca un verbo que invite a imaginar.'], ['tesis', 2, 'Busca lo que defiende en primera persona.']), bien: 'Parece, supongamos y sostengo.' }, 'Lo que parece se prueba, se imagina un caso y se sostiene una tesis.', ['Fíjate en el verbo de cada una.', 'La tesis es lo que queda en pie.'], 'Parece; supongamos; sostengo'],
    ['Lo que no dice', 'Mide cada afirmación.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: OLVIDO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['No dice que la memoria sobre.', 0, 'Léela junto al párrafo 4.'], ['Para usar una palabra hay que pasar por alto detalles.', 1, '¿Por qué no podría decir «lluvia»?'], ['El autor tiene mala memoria.', 2, '¿Habla de la suya?']), luz: [[4, 'No digo que la memoria sobre'], [2, 'No podría decir']], bien: 'Las palabras agrupan.' }, 'La memoria está escrita, lo de las palabras se deduce y su memoria no se cuenta.', ['Busca la oración exacta.', 'Une el caso de los aguaceros con la tesis.'], 'Memoria: dice. Palabras: se deduce']],
    'Prueba, imagina y sostiene.', 'La tesis queda después de la prueba.');
  reto('filo-2', ['icf-lc-filosofico-2'], 3, 'Archivo o idea', 'Conceptos y alcance', 'El mismo ensayo: mide sus conceptos.', [
    ['Dos conceptos', 'Usa las palabras como el autor.', 'pinta-tipos', 'Según el ensayo, pinta cada caso.', { doc: OLVIDO, plumas: ['archivo', 'idea'], ...P(['Guardar cada hoja de un árbol por separado.', 0, '¿Conserva todas las diferencias o las pasa por alto?'], ['Decir «árbol» ante un pino y un mango.', 1, '¿Conserva todas las diferencias o las pasa por alto?'], ['Memorizar mil números sin buscar la regla.', 0, '¿Conserva todas las diferencias o las pasa por alto?']), bien: 'Guardar todo o agrupar.' }, 'Guardar hojas y números sueltos es archivo; agrupar es idea.', ['Pregunta si se guarda todo o se agrupa.', 'Una palabra sirve para muchas cosas.'], 'Hojas y números: archivo. Árbol: idea'],
    ['El alcance', 'No digas más que el autor.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el ensayo.', { doc: OLVIDO, filas: [{ antes: 'Para entender hace falta olvidar', topes: ['todo', 'nada', 'algo'], va: 2 }, { antes: 'La memoria', topes: ['sobra', 'no sobra', 'no existe'], va: 1 }], mira: ['Relee el final del párrafo 4.', 'Busca lo que el autor aclara que no dice.'], luz: [[4, 'sin algo de olvido'], [4, 'No digo que la memoria sobre']], bien: 'Algo de olvido y memoria.' }, 'Pide algo de olvido y no desprecia la memoria.', ['Mira cuánto olvido pide.', 'Relee la primera oración del párrafo 4.'], 'Algo; no sobra']],
    'Archivo guarda, idea agrupa; hace falta algo de olvido.', 'Usa el concepto del autor y mide su alcance.');

  const PESCA = D('pesca', 'Menos peces en Puerto Lindo', [
    'Este año los pescadores de Puerto Lindo sacaron la mitad de peces. Una tormenta rompió varias redes en enero y todos la culparon.',
    'Pero la pesca baja desde hace diez años: se talaron manglares donde crían los peces y llegaron barcos grandes.',
    'El gobierno regaló motores para ayudar. Los pescadores fueron más lejos y pescaron más, dos años; después hubo aún menos peces. Quien no sabía manejar motor quedó por fuera.',
    'Ahora proponen sembrar manglar, cerrar la pesca dos meses al año y pagar ese tiempo.']);
  reto('sist-1', ['icf-sc-sistemico-1'], 2, 'Menos peces en Puerto Lindo', 'Detonante, fondo y cadena', 'Un problema con varias causas. Sepáralas.', [
    ['Detonante o fondo', 'Mira si venía de tiempo atrás.', 'genero-o-cita', '¿Es un hecho **de este año** o una causa **de fondo**?', { doc: PESCA, rot: ['de este año', 'de fondo'], ...F(['La tormenta de enero', 0, '¿Desde cuándo pasa?'], ['La tala de manglares', 1, '¿Desde cuándo pasa?'], ['Los barcos grandes', 1, '¿Desde cuándo pasa?']), bien: 'Enero frente a diez años.' }, 'La tormenta es de enero; tala y barcos vienen de años.', ['Compara enero con diez años.', 'Busca lo que se nombra después de «Pero».'], 'Tormenta: este año. Tala y barcos: fondo'],
    ['La balanza', 'Compara casos.', 'balanza-tesis', 'Afirmación: «la tormenta es la causa de que haya menos peces». ¿Qué hace cada dato?', { doc: PESCA, tesis: 'La tormenta es la causa', ...F(['La pesca ya bajaba antes de la tormenta.', 1, '¿Podía causarlo algo que aún no pasaba?'], ['Donde no hubo tormenta la pesca también cayó.', 1, '¿Qué pasó sin tormenta?'], ['Donde no hubo tormenta la pesca no cayó.', 0, '¿Señala a la tormenta?']), bien: 'Antes y en otros lugares.' }, 'Que bajara antes o en otro lugar la debilita; que sin tormenta no cayera la apoya.', ['Mira qué pasó antes de enero.', 'Compara lugares con tormenta y sin ella.'], 'Antes y otro lugar: debilitan']],
    'La tormenta disparó; la tala y los barcos son el fondo.', 'Compara en el tiempo y entre lugares.');
  reto('sist-2', ['icf-sc-sistemico-2', 'icf-sc-sistemico-3'], 3, 'Motores y manglares', 'Efectos y dimensiones', 'El mismo puerto: evalúa las medidas.', [
    ['Efectos', 'Mira para qué se hizo.', 'genero-o-cita', '¿Es un efecto **buscado** o **no buscado** de los motores?', { doc: PESCA, rot: ['buscado', 'no buscado'], ...F(['Pescar más por un tiempo', 0, '¿Para eso se regalaron?'], ['Que después hubiera menos peces', 1, '¿Para eso se regalaron?'], ['Que algunos quedaran por fuera', 1, '¿Para eso se regalaron?']), bien: 'Ayudaron y empeoraron.' }, 'Pescar más era la meta; menos peces y excluidos no.', ['Compara con el propósito del gobierno.', 'Solo una de las tres era la meta.'], 'Más pesca: buscado. Lo demás, no'],
    ['Dimensiones', 'Nombra lo que cuida cada parte.', 'pinta-tipos', 'Pinta cada parte de la nueva propuesta con lo que cuida.', { doc: PESCA, plumas: ['el ambiente', 'el ingreso'], ...P(['Sembrar manglar.', 0, '¿Cuida la naturaleza o la plata de la gente?'], ['Cerrar la pesca dos meses.', 0, '¿Cuida la naturaleza o la plata de la gente?'], ['Pagar ese tiempo.', 1, '¿Cuida la naturaleza o la plata de la gente?']), bien: 'La propuesta cuida las dos.' }, 'Manglar y cierre cuidan los peces; el pago, a las familias.', ['Pregunta quién se beneficia primero.', 'El pago es para quienes no pueden pescar.'], 'Manglar y cierre: ambiente. Pago: ingreso']],
    'Los motores tuvieron efectos no buscados; la propuesta cuida ambiente e ingreso.', 'Efectos por grupos y salida con varias dimensiones.');

  const CAFE = D('sombra', 'Café con sombra', [
    'En una finca, la mitad del café crece bajo árboles y la otra mitad, al sol. Bajo los árboles viven aves que comen una plaga del café.',
    'Las hojas que caen se pudren y abonan el suelo. En la mitad al sol hay que comprar abono, y parte llega a la quebrada.',
    'Se contaron granos dañados por la plaga: 4 de cada 100 con sombra y 15 de cada 100 al sol. Al sol se recogieron más granos en total.']);
  reto('eco-1', ['icf-cn-ecosistemas-1', 'icf-cn-ecosistemas-2'], 2, 'Café con sombra', 'Cadena y ciclo', 'Una finca, dos maneras de sembrar. Sigue la cadena y la materia.', [
    ['La cadena', 'La flecha va hacia quien come.', 'pista-tipo', 'Ata cada nivel a su organismo.', { doc: CAFE, lineas: ['café', 'plaga', 'ave'], ...T(['productor', 0, '¿Quién usa la luz?'], ['consumidor primario', 1, '¿Quién come café?'], ['consumidor secundario', 2, '¿Quién come la plaga?']), bien: 'Café, plaga y ave.' }, 'El café produce, la plaga lo come y el ave come la plaga.', ['Empieza por quien usa la luz.', 'Sigue quién se come a quién.'], 'Café → plaga → ave'],
    ['El ciclo', 'La materia vuelve al suelo.', 'comprueba-apuesta', 'Subraya en el párrafo 2 la oración que muestra un **ciclo** de la materia.', { doc: CAFE, nums: [2], apuesta: 'Lo que cae vuelve a servir.', ...S(['2.0'], { '2.1': 'Cuenta lo que se compra y lo que se pierde.' }), bien: 'De la hoja al suelo.' }, 'Las hojas caen, se pudren y abonan: la materia vuelve.', ['Busca qué vuelve al suelo.', 'Pregunta qué sale de un ser vivo y alimenta a otro.'], 'Hojas que se pudren y abonan']],
    'Café, plaga, ave; y hojas que vuelven al suelo.', 'Sigue quién come y adónde va la materia.');
  reto('eco-2', ['icf-cn-ecosistemas-3'], 3, 'Sombra, aves y granos', 'Relaciones y conclusiones', 'La misma finca: mide lo que se puede concluir.', [
    ['El alcance', 'Compara los datos.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: CAFE, filas: [{ antes: 'Con sombra, el daño por la plaga es', topes: ['mayor', 'igual', 'menor'], va: 2 }, { antes: 'El total de granos es mayor', topes: ['con sombra', 'al sol', 'en ninguna'], va: 1 }], mira: ['Compara 4 con 15.', 'Relee la última oración.'], luz: [[3, '4 de cada 100'], [3, 'Al sol se recogieron más']], bien: 'Menos daño; más total al sol.' }, 'El daño es menor con sombra y el total es mayor al sol.', ['Mira el daño de cada mitad.', 'El total es otro dato.'], 'Menor daño con sombra; más total al sol'],
    ['La balanza', 'Supón cierto cada dato.', 'balanza-tesis', 'Hipótesis: «las aves reducen el daño». ¿Qué hace cada dato?', { doc: CAFE, tesis: 'Las aves reducen el daño', ...F(['Con una malla que no deja entrar aves, el daño sube.', 0, '¿Qué cambió al quitar las aves?'], ['Con la malla, el daño queda igual.', 1, '¿Hacían falta las aves?'], ['Las aves cantan de día.', 2, '¿Habla del daño?']), bien: 'Quitar las aves prueba su papel.' }, 'Si sin aves sube, apoya; si queda igual, debilita; el canto no pesa.', ['Piensa qué pasa al quitar las aves.', 'Un dato no habla del daño.'], 'Sube: apoya. Igual: debilita']],
    'Menos daño con sombra; la malla pondría a prueba a las aves.', 'Compara y prueba quitando una sola cosa.');

  const BENCH = D('bench', 'The yellow bench', [
    'There is a yellow bench in our school. If you sit on it, it means that you don\'t want to be alone, and someone has to come and talk to you.',
    'The idea was Nico\'s. He is eight, and he used to eat his lunch in the library because he had no friends. He asked the headteacher for a bench "for people like me".',
    'During the first week nobody sat there: they were too embarrassed. So the headteacher sat on it herself, with a sandwich, and waited. Eleven children came.',
    'Now other schools have copied the idea. Nico no longer needs the bench, but he checks it every day, just in case.']);
  reto('largo-1', ['icf-en-largo-1'], 2, 'The yellow bench', 'Mapa y palabras', 'A short article. Find the map and the meaning.', [
    ['The map', 'Di qué hace cada párrafo.', 'mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: BENCH, ...F(['explains what it means', 0, 'Look for «it means».'], ['tells whose idea it was', 1, 'Look for the boy.'], ['tells how it started', 2, 'Look for the first week.'], ['tells what happens now', 3, 'Look for «Now».'], ['explains how to paint it', null, 'Nobody paints here.']), luz: [[1, 'it means'], [2, 'The idea was'], [3, 'During the first week'], [4, 'Now other schools']], bien: 'Meaning, idea, start, now.' }, 'Explica qué significa, de quién fue, cómo empezó y cómo va hoy.', ['Lee las primeras palabras de cada párrafo.', 'Busca «idea», «week» y «now».'], 'Meaning, idea, start, now'],
    ['The words', 'Mira lo que rodea cada palabra.', 'cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: BENCH, frases: [[2, 'he ', 'used to eat', ' his lunch in the library'], [4, 'Nico ', 'no longer needs', ' the bench']], ...F(['ate in the past', 0, 'Does he eat there today?'], ['doesn\'t need any more', 1, 'Does he need it now?'], ['will eat', null, 'It is not about the future.'], ['needs very much', null, 'It is the opposite.']), bien: 'Before and not any more.' }, '«Used to» es antes y «no longer», ya no.', ['Pregunta si todavía pasa.', 'Las dos hablan de algo que cambió.'], 'Used to: antes. No longer: ya no']],
    'Four paragraphs; «used to» and «no longer» show change.', 'Mapa primero y palabras por contexto.');
  reto('largo-2', ['icf-en-largo-2'], 3, 'Just in case', 'Inferir y tono', 'The same article: what can you deduce?', [
    ['Deduce', 'Une gestos.', 'dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: BENCH, nums: [3, 4], rot: ['it says so', 'you can deduce it', 'it does not say'], ...F(['Eleven children came.', 0, 'Busca el número.'], ['Nico has friends now.', 1, '¿Por qué ya no necesita el banco?'], ['He remembers how it felt to be alone.', 1, '¿Por qué lo revisa cada día?'], ['The bench is made of metal.', 2, '¿Se dice de qué es?']), luz: [[3, 'Eleven children'], [4, 'no longer needs'], [4, 'just in case']], bien: 'He checks it just in case.' }, 'Los once están escritos; los amigos y el recuerdo se deducen; el material no.', ['Busca el número en el texto.', 'Piensa por qué vuelve cada día.'], 'Eleven: dice. Amigos y recuerdo: se deducen'],
    ['Fact or opinion', 'Un hecho se comprueba.', 'pinta-tipos', 'Paint each sentence: fact or opinion?', { doc: BENCH, plumas: ['fact', 'opinion'], ...P(['Nico is eight.', 0, '¿Se puede comprobar?'], ['It is the best idea of the year.', 1, '¿Alguien podría no estar de acuerdo?'], ['Other schools have copied it.', 0, '¿Se puede comprobar?']), bien: 'You can check a fact.' }, 'La edad y las escuelas se comprueban; «the best» opina.', ['Busca un adjetivo que valore.', 'Las otras dos se pueden comprobar.'], 'Eight y schools: fact. Best: opinion']],
    'Nico has friends and remembers; «the best» is an opinion.', 'Une gestos y separa hechos de opiniones.');
}
;
//#archivo js/gimnasio-icf-6.js
// Gimnasio del Preicfes, sextos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-5.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('forma-1', ['icf-ma-forma-1', 'icf-ma-forma-2'], 2, 'La carpa y el mástil', 'Ángulos, cierre y cuadrados', 'Un grupo arma una carpa y levanta un mástil.', [
    ['Las varillas', 'Entre la resta y la suma.', 'tercer-lado', 'Dos varillas miden **6** y **9**. ¿Entre qué enteros puede medir la tercera para que **cierre**?', { a: 6, b: 9, max: 16 }, 'Más que 3 y menos que 15: de 4 a 14.', ['Compara con la resta y con la suma de las dos.', 'Los extremos no sirven: quedaría una línea.'], 'Más que 3, menos que 15: de 4 a 14'],
    ['El mástil', 'Para un cateto se resta.', 'cateto-falta', 'Un cable de **25 m** baja de la punta de un mástil hasta una estaca a **15 m** del pie. Dale su altura.', { c: 25, b: 15 }, '$625 - 225 = 400$: el mástil mide 20 m.', ['El cable es la hipotenusa.', 'Es una familia 3-4-5 agrandada.'], '25² − 15² = 400 = altura²; altura 20']],
    'De 4 a 14, y un mástil de 20 m.', 'Cierra entre resta y suma; para un cateto se resta.');
  reto('forma-2', ['icf-ma-forma-3', 'icf-ma-forma-4'], 3, 'Sombras y razones', 'El mismo factor', 'Mide sin subir: con sombras y con razones.', [
    ['La sombra', 'Compara las sombras.', 'sombra-poste', 'Una señal de 2 m da una sombra de 1.5 m. A la misma hora, un mural da **6 m** de sombra. Dale su altura.', { h0: 2, s0: 1.5, s: 6 }, 'La sombra es 4 veces: $2 \\cdot 4 = 8$ m.', ['Mira cuántas veces cabe una sombra en la otra.', 'La altura crece por ese mismo número.'], '6 ÷ 1.5 = 4 veces; 2 · 4 = 8'],
    ['Las razones', 'Nombra los lados desde θ.', 'razones-tres', 'Opuesto 12, adyacente 35, hipotenusa 37. Pon cada razón de θ.', { et: ['sen', 'cos', 'tan'], metas: ['12/37', '35/37', '12/35'], fichas: ['12/37', '35/37', '12/35', '37/12', '35/12'], mira: ['Opuesto sobre hipotenusa.', 'Adyacente sobre hipotenusa.', 'Opuesto sobre adyacente.'], trampas: {}, ok: 'Cada razón con sus dos lados.', t: { co: '12', ca: '35', hi: '37' } }, 'Seno 12/37, coseno 35/37 y tangente 12/35.', ['Dos de ellas llevan abajo el lado más largo.', 'La tangente usa los dos catetos.'], 'sen op/hip, cos ady/hip, tan op/ady']],
    'El mural mide 8 m; 12/37, 35/37 y 12/35.', 'Sombras: mismo factor. Razones: nombra los lados.');

  const NEVERA = D('nevera', 'Etiqueta de una nevera', [
    'TÍTULO, en grande: «¡Ahorra como nunca!». Dibujo de una alcancía feliz.',
    'TABLA. Consumo al mes: 40 kilovatios. Modelo anterior: 65. Categoría: B, de A a G.',
    'NOTA, en letra pequeña: «Medido con la puerta cerrada, a 20 °C. El precio de la energía cambia según la ciudad».']);
  reto('disco-1', ['icf-lc-discontinuo-1'], 2, 'La etiqueta', 'Cada parte y su oficio', 'Una etiqueta corta. Di qué hace cada parte y qué permite concluir.', [
    ['Qué hace cada parte', 'No es lo que dice: es para qué está.', 'pista-tipo', 'Ata cada función a su parte.', { doc: NEVERA, lineas: ['título y dibujo', 'tabla', 'nota'], ...T(['atraer al comprador', 0, '¿Cuál usa una cara feliz?'], ['dar cantidades', 1, '¿Cuál tiene números en orden?'], ['poner límites', 2, '¿Cuál va en letra pequeña?']), bien: 'Atraer, cuantificar y limitar.' }, 'El título atrae, la tabla da números y la nota limita.', ['Mira cuál se ve primero.', 'La letra pequeña suele poner condiciones.'], 'Título: atraer. Tabla: números. Nota: límites'],
    ['Lo que se puede decir', 'Compara con los datos.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo que permite la etiqueta.', { doc: NEVERA, filas: [{ antes: 'Comparada con el modelo anterior, gasta', topes: ['más', 'igual', 'menos'], va: 2 }, { antes: 'Es de la categoría de mayor ahorro:', topes: ['sí', 'no', 'no se sabe'], va: 1 }], mira: ['Compara 40 con 65.', 'Mira cuál es la primera letra de la escala.'], luz: [[2, 'Modelo anterior: 65'], [2, 'B, de A a G']], bien: 'Gasta menos, pero no es A.' }, 'Gasta menos que la anterior y es B, no A.', ['Busca los dos consumos en la tabla.', 'La escala empieza en A.'], 'Menos; no']],
    'Atrae, informa y limita; gasta menos, pero no es A.', 'Di para qué está cada parte y qué dice la letra pequeña.');
  const TIRA = D('tira', 'Tira: La reunión', [
    'VIÑETA 1. Diez personas en una mesa larga. Globo liso del jefe: «Todas las ideas son bienvenidas».',
    'VIÑETA 2. Una mujer levanta la mano. Globo: «Podríamos…». Sobre ella, el globo enorme del jefe le tapa las palabras: «¡SIGUIENTE PUNTO!».',
    'VIÑETA 3. Nube de pensamiento, compartida por los diez: un reloj. En la pared, un cartel: «Aquí nos escuchamos».']);
  reto('disco-2', ['icf-lc-discontinuo-2', 'icf-lc-discontinuo-3'], 3, 'La reunión', 'Lo que se dice y lo que se muestra', 'Una tira de tres viñetas. Busca el choque.', [
    ['Los recursos', 'El borde y el tamaño hablan.', 'voz-de-la-fuente', 'Ata cada efecto a su recurso.', { ayuda: 'Tira un hilo desde cada efecto hasta su recurso.', doc: TIRA, portadas: [['Globo que tapa a otro', 'viñeta 2'], ['Nube compartida', 'viñeta 3'], ['Cartel de la pared', 'viñeta 3']], ...T(['interrumpir', 0, '¿Cuál no deja leer otro?'], ['que todos piensan lo mismo', 1, '¿Cuál es un pensamiento?'], ['ironía', 2, '¿Cuál dice lo contrario de lo que pasa?']), bien: 'Tapar, compartir y contradecir.' }, 'El globo tapa, la nube une y el cartel es irónico.', ['Mira qué globo tapa a cuál.', 'El cartel no coincide con la escena.'], 'Tapar; pensar igual; ironía'],
    ['El mensaje', 'Busca el choque entre frase y escena.', 'talla-idea', 'Pon cada mensaje en su talla.', { doc: TIRA, p: 2, rot: ['se queda en un detalle', 'justo', 'dice de más'], ...F(['La mesa es larga.', 0, 'Es cierto, pero ¿qué critica?'], ['Se dice que se escucha, pero no se deja hablar.', 1, 'Compara la frase de la viñeta 1 con la 2.'], ['Toda reunión es inútil.', 2, '¿La tira habla de todas?']), luz: [[2, 'le tapa las palabras'], [2, '¡SIGUIENTE PUNTO!']], bien: 'Decir y hacer no coinciden.' }, 'La mesa es un detalle, «toda» dice de más y el choque es la crítica.', ['Compara lo que dice el jefe con lo que hace.', 'Cuidado con «toda».'], 'Detalle, justo y de más']],
    'El cartel es irónico: dicen escuchar y no dejan hablar.', 'Busca dónde chocan la palabra y el dibujo.');

  const PALEN = D('hist-linea', 'Cuatro momentos', [
    'En 1781 los comuneros marcharon contra un impuesto. El gobierno pactó y después incumplió.',
    'En 1810 una junta tomó el gobierno en Santafé, todavía en nombre del rey.',
    'En 1851 se abolió la esclavitud; en 1863 el país se volvió federal y en 1886, central.',
    'El siglo cerró con una guerra de tres años y, en 1903, con la separación de Panamá.']);
  reto('hist-1', ['icf-sc-historia-1', 'icf-sc-historia-2'], 2, 'Cuatro momentos', 'Orden y sentido', 'Un resumen corto. Ordena y deduce.', [
    ['El orden', 'Busca los años.', 'pasos-del-proceso', 'Ordena los hechos. El primero está en su puesto.', { doc: PALEN, que: 'los hechos', de: 'De los comuneros a Panamá', fija: 1, ini: [0, 2, 3, 1], tiras: ['Marcha de los comuneros.', 'Junta de Santafé.', 'Fin de la esclavitud.', 'Separación de Panamá.'], mira: ['', 'Ocurrió en 1810.', 'Ocurrió en 1851.', 'Cierra el resumen.'], bien: '1781, 1810, 1851 y 1903.' }, 'Comuneros, junta, abolición y Panamá.', ['Busca el año de cada uno.', 'La abolición fue a mitad del siglo.'], 'Comuneros, junta, abolición, Panamá'],
    ['Deducir', 'Une dos datos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PALEN, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['La junta gobernaba en nombre del rey.', 0, 'Léela junto a 1810.'], ['La esclavitud siguió décadas después de la junta.', 1, 'Compara 1810 con 1851.'], ['En 1863 había paz en todo el país.', 2, '¿Se habla de paz?']), luz: [[2, 'en nombre del rey'], [3, 'En 1851']], bien: 'Las fechas también cuentan.' }, 'El rey está escrito, las décadas se deducen y la paz no aparece.', ['Busca la oración exacta.', 'Resta los años.'], 'Rey: dice. Décadas: se deduce']],
    'Comuneros, junta, abolición y Panamá.', 'Ordena por años y compara fechas.');
  const FRENTE = D('hist-frente', 'El pacto', [
    'Para salir de la dictadura y de la guerra entre ellos, liberales y conservadores pactaron turnarse la presidencia dieciséis años.',
    'La guerra entre los dos bajó. Pero quien no era de esos partidos tenía muy difícil ser elegido.',
    'En esos años, con la Guerra Fría de fondo y la tierra en pocas manos, surgieron guerrillas.']);
  reto('hist-2', ['icf-sc-historia-3'], 3, 'El pacto', 'Buscado, no buscado y varias causas', 'Tres párrafos sobre el Frente Nacional. Evalúalos.', [
    ['Efectos', 'Compara con el propósito.', 'genero-o-cita', 'Según el texto, ¿es un efecto **buscado** o **no buscado** del pacto?', { doc: FRENTE, rot: ['buscado', 'no buscado'], ...F(['Salir de la dictadura', 0, '¿Para eso se hizo?'], ['Bajar la guerra entre los dos', 0, '¿Para eso se hizo?'], ['Dejar sin opción a otros', 1, '¿Para eso se hizo?']), bien: 'Dos metas y un costo.' }, 'Salir de la dictadura y de la guerra era la meta; la exclusión, no.', ['Relee la primera oración.', 'Una de las tres no aparece como meta.'], 'Dictadura y guerra: buscado. Exclusión: no'],
    ['Las causas', 'Cuidado con «la única».', 'balanza-tesis', 'Afirmación: «la única causa de las guerrillas fue el pacto». ¿Qué hace cada dato?', { doc: FRENTE, tesis: 'La única causa fue el pacto', ...F(['La tierra estaba en pocas manos.', 1, '¿Hay otra causa?'], ['El mundo vivía la Guerra Fría.', 1, '¿Hay otra causa?'], ['Antes del pacto no había ningún otro problema.', 0, 'Si fuera cierto, ¿quedaría solo el pacto?']), bien: 'Varias causas debilitan «única».' }, 'Tierra y Guerra Fría son otras causas; que no hubiera más problemas la apoyaría.', ['Cuenta las causas del párrafo 3.', 'Otra causa debilita la palabra «única».'], 'Tierra y Guerra Fría: debilitan']],
    'La exclusión no se buscaba; hubo varias causas.', 'Propósito, efectos y más de una causa.');

  const PATIN = D('patineta', 'La pista en U', [
    'Una patinadora de 50 kilos se suelta desde 2 metros en una pista en U. Con gravedad 10, arriba tiene 1 000 julios de energía potencial.',
    'Al otro lado sube solo 1.8 metros: allí tiene 900 julios. Las ruedas quedan tibias.',
    'Después engrasa las ruedas y repite desde la misma altura: sube 1.9 metros.']);
  reto('energia-1', ['icf-cn-energia-1'], 2, 'La pista en U', 'Se transforma y se conserva', 'Una patinadora y dos pruebas. Sigue la energía.', [
    ['La energía que falta', 'Nada desaparece.', 'descarta-prueba', 'Estas dos opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PATIN, nums: [1, 2, 3], pregunta: 'Queda en pie', queda: 'El roce convierte parte en calor.', ...T(['La primera vez subió a la altura de donde salió.', 2, 'Busca hasta dónde subió la primera vez.'], ['El roce no produjo calor.', 3, 'Busca cómo quedaron las ruedas.']), bien: 'Menos altura y ruedas tibias.' }, 'Subió 1.8 m, no 2, y las ruedas quedaron tibias.', ['Compara las dos alturas.', 'Busca algo que se calentó.'], 'Subió 1.8; ruedas tibias'],
    ['El alcance', 'Lee los números.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: PATIN, filas: [{ antes: 'Con las ruedas engrasadas, se pierde', topes: ['más energía', 'la misma', 'menos energía'], va: 2 }, { antes: 'La energía total, contando el calor,', topes: ['disminuye', 'se conserva', 'aumenta'], va: 1 }], mira: ['Compara 1.8 con 1.9.', 'Nada se crea ni se destruye.'], luz: [[3, 'sube 1.9 metros'], [2, 'Las ruedas quedan tibias']], bien: 'Menos roce, menos calor.' }, 'Sube más: se pierde menos; y la total se conserva.', ['Mira en cuál prueba subió más.', 'Suma también lo que se volvió calor.'], 'Menos energía; se conserva']],
    'Se fue en calor; con grasa se pierde menos.', 'La total se conserva: busca el calor.');
  const TINTO = D('tinto', 'El termo y el pocillo', [
    'A las seis se sirvió tinto a 90 °C en un termo y en un pocillo de aluminio, los dos tapados. Afuera había 15 °C.',
    'A las siete el termo marcaba 82 °C y el pocillo, 24. A medianoche el pocillo estaba a 15 y el termo, a 48.',
    'El termo tiene dos paredes con vacío en medio y un espejo por dentro.']);
  reto('energia-2', ['icf-cn-energia-2'], 3, 'El termo y el pocillo', 'Caminos del calor', 'Dos recipientes y sus datos. Explica y mide.', [
    ['Los caminos', '¿Contacto, fluido u ondas?', 'pista-tipo', 'Ata cada camino del calor a la parte del termo que lo frena.', { doc: TINTO, lineas: ['el vacío', 'el espejo', 'la tapa'], ...T(['conducción por la pared', 0, '¿Dónde no hay partículas que se toquen?'], ['radiación', 1, '¿Qué devuelve las ondas?'], ['convección del aire de arriba', 2, '¿Qué no deja salir el vapor caliente?']), bien: 'Vacío, espejo y tapa.' }, 'El vacío frena el contacto, el espejo las ondas y la tapa el aire que sube.', ['El vacío no tiene partículas.', 'Un espejo devuelve la luz y el calor.'], 'Vacío: conducción. Espejo: radiación. Tapa: convección'],
    ['Deducir', 'Resta y compara.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: TINTO, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['A las siete el termo marcaba 82 °C.', 0, 'Búscala en los datos.'], ['El pocillo llegó al equilibrio con el aire.', 1, 'Compara su temperatura con la de afuera.'], ['El termo pesa más.', 2, '¿Se habla del peso?']), luz: [[2, '82 °C'], [2, 'estaba a 15'], [1, 'Afuera había 15']], bien: 'Iguales: ya no pasa calor.' }, 'El 82 está escrito; el equilibrio se deduce; el peso no.', ['Busca el dato exacto.', 'Compara el pocillo con el aire a medianoche.'], '82: dice. Equilibrio: se deduce']],
    'Vacío, espejo y tapa; el pocillo llegó al equilibrio.', 'Cada parte frena un camino del calor.');

  const PARK = D('umbrella', 'The umbrella library', [
    'In our town you can borrow an umbrella the way you borrow a book. There is a red box at every bus stop. You take one, and you give it back when the weather gets better.',
    'At first people thought the idea was ridiculous. "They will get rid of them or sell them," they said. Surprisingly, only four umbrellas out of three hundred have disappeared.',
    'The council was so pleased that it is going to do the same with raincoats. However, some shops that sell umbrellas are not happy at all.']);
  reto('vocab-1', ['icf-en-vocabulario-1'], 2, 'The umbrella library', 'La palabra por el contexto', 'A short article. Work out the words.', [
    ['Same meaning', 'Mira lo que la rodea.', 'cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: PARK, frases: [[2, 'the idea was ', 'ridiculous', '. "They'], [2, 'They will ', 'get rid of', ' them or sell them']], ...F(['silly', 0, 'Did people like the idea at first?'], ['lose', 1, 'Selling is one way of not having them any more: what is another?'], ['excellent', null, 'People did not like it at first.'], ['borrow', null, 'They think people will not give them back.']), bien: 'Context gives the meaning.' }, '«Ridiculous» es tonta y «get rid of», quedarse sin ellas.', ['Piensa si a la gente le gustó la idea.', 'Las dos palabras son negativas.'], 'Silly; lose'],
    ['Deduce', 'Une dos datos.', 'dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: PARK, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'], ...F(['Four umbrellas have disappeared.', 0, 'Busca el número.'], ['People were more honest than expected.', 1, '¿Qué pensaban al comienzo y qué pasó?'], ['The raincoats are yellow.', 2, '¿Se dice de qué color son?']), luz: [[2, 'only four umbrellas'], [2, 'Surprisingly']], bien: 'Surprisingly tells you.' }, 'El número está; la honestidad se deduce; el color no.', ['Busca el número en el texto.', '«Surprisingly» compara con lo que se esperaba.'], 'Four: dice. Honest: se deduce']],
    'Silly and lose; people were honest.', 'Contexto primero.');
  reto('vocab-2', ['icf-en-vocabulario-2'], 3, 'However, some shops…', 'Familias y conectores', 'The same article: word types and links.', [
    ['Word types', 'Mira el final.', 'pinta-tipos', 'Paint each word with its type.', { doc: PARK, plumas: ['adjective', 'adverb'], ...P(['ridiculous', 0, 'Look at the end of the word.'], ['surprisingly', 1, 'Look at the end of the word.'], ['happy', 0, 'Can a person be like this?']), bien: '-ous and -ly.' }, '«Ridiculous» y «happy» describen; «surprisingly» comenta la oración.', ['Fíjate en la que termina en -ly.', '«-ous» describe cosas.'], 'Ridiculous, happy: adjective. Surprisingly: adverb'],
    ['Links', 'Di qué hace la segunda idea.', 'bisagras', 'Put the word that joins. Sobran dos.', { doc: PARK, pares: [['The council is pleased.', 'some shops are not.'], ['Few umbrellas disappeared,', 'the council will do it with raincoats.']], ...F(['However,', 0, 'Two people feel differently.'], ['so', 1, 'The second idea is the result.'], ['For example,', null, 'No pair gives an example.'], ['because', null, 'No second idea gives the cause.']), bien: 'Contrast and result.' }, '«However» contrasta y «so» da el resultado.', ['En una pareja hay sentimientos opuestos.', 'En la otra, lo segundo sale de lo primero.'], 'However: contraste. So: resultado']],
    'Adjectives, an adverb, a contrast and a result.', 'Final de palabra y oficio del conector.');
}
;
//#archivo js/gimnasio-icf-7.js
// Gimnasio del Preicfes, séptimos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-6.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('ecua-1', ['icf-ma-ecuaciones-1', 'icf-ma-ecuaciones-2'], 2, 'El marco y el cuadrado', 'Plantear y completar', 'Un taller hace un marco y completa un mosaico.', [
    ['El marco', 'Medio borde es un ancho y un largo.', 'ancho-del-marco', 'El **largo** de un marco es **2 menos que el triple del ancho**, y su borde mide **52**. Mueve el ancho.', { k: 3, q: 2, P: 52, max: 12 }, '$4a - 2 = 26$: el ancho es 7 y el largo, 19.', ['Escribe el largo con la letra del ancho.', 'Suma los dos y compáralos con la mitad del borde.'], '26 + 2 = 28; 28 ÷ 4 = 7'],
    ['El mosaico', 'La esquina es un cuadrado.', 'cuadrado-falta', 'Faltan cuadritos para completar el cuadrado: $x^2 + 8x + ?$', { a: 4, max: 20 }, 'Dos grupos de $4x$: la esquina es de 4 por 4, dieciséis.', ['Parte las tiras en dos grupos iguales.', 'La esquina mide lo mismo por los dos lados.'], '8 ÷ 2 = 4; 4 · 4 = 16']],
    'Ancho 7; faltan 16 cuadritos.', 'Una letra para todo y una esquina cuadrada.');
  reto('ecua-2', ['icf-ma-ecuaciones-3', 'icf-ma-ecuaciones-4'], 3, 'Recibos y bordes', 'Restar y decidir el borde', 'Compara dos recibos y pinta una desigualdad.', [
    ['Los recibos', 'Lo igual desaparece.', 'resta-recibos', 'Los cuadros son **camisetas** y los círculos **gorras**. Compara los dos recibos.', { f: [[2, 2, 30], [2, 5, 48]], et: ['más gorras', 'más precio', 'una gorra', 'una camiseta'], metas: ['3', '18', '6', '9'], fichas: ['3', '18', '6', '9', '7', '78', '12'], mira: ['¿En cuántas gorras se diferencian?', '¿En cuánto se diferencian los totales?', 'Reparte lo que cuesta de más.', 'Quita las gorras y reparte entre las camisetas.'], trampas: { '1:78': 'Se restan los totales.' }, ok: '2 · 9 + 2 · 6 = 30 y 2 · 9 + 5 · 6 = 48.' }, 'Tres gorras más cuestan 18: 6 cada una; $30 - 12 = 18$, 9 por camiseta.', ['Las camisetas son iguales en los dos.', 'Con el precio de una gorra vuelve al primer recibo.'], '18 ÷ 3 = 6; (30 − 12) ÷ 2 = 9'],
    ['El borde', 'Mira si se divide entre un negativo.', 'pinta-intervalo', 'Pinta todos los números que cumplen $7 - 2x > 1$.', { n: 7, m: -2, c: 1, b: 3, dir: -1, ab: 1, texto: 'x menor que 3, sin el 3' }, '$-2x > -6$: al dividir se voltea, $x < 3$.', ['Quita primero el número que está solo.', 'Prueba el borde y un número de cada lado.'], '−2x > −6; se voltea: x < 3']],
    'Gorra 6, camiseta 9; x menor que 3.', 'Resta lo igual y cuida el signo.');

  const DETER = D('escaleras', 'Suba a pie', [
    'Deberían apagar el ascensor de la alcaldía hasta el cuarto piso. Subir cuatro pisos al día mejora el corazón y ahorra energía.',
    'Lo probé un mes: bajé dos kilos. También dejé de comer pan, así que no sé bien a qué se lo debo.',
    'Me dirán que hay gente mayor o en silla de ruedas. Claro: para ellos habría llave. Los demás no tenemos excusa.']);
  reto('evalua-1', ['icf-lc-evalua-1'], 2, 'Suba a pie', 'Supuesto y honestidad', 'Una propuesta corta. Busca lo que supone y lo que reconoce.', [
    ['Dice o supone', 'Si puedes señalar la oración, lo dice.', 'genero-o-cita', '¿La autora lo **dice** o lo **supone**?', { doc: DETER, rot: ['lo dice', 'lo supone'], ...F(['Subir mejora el corazón', 0, '¿Encuentras la oración?'], ['Si apagan el ascensor, la gente subirá a pie en vez de no ir', 1, '¿Está escrito o hace falta?'], ['Bajó dos kilos', 0, '¿Encuentras la oración?']), bien: 'Lo supuesto no se escribe.' }, 'El corazón y los kilos están escritos; que la gente subirá se da por hecho.', ['Busca cada una en el texto.', 'Niega la que no encuentres: ¿se cae la idea?'], 'Corazón y kilos: dice. Que subirán: supone'],
    ['El límite', 'Reconocer una duda da confianza.', 'comprueba-apuesta', 'Subraya la oración que **reconoce** que su prueba es débil.', { doc: DETER, nums: [2, 3], apuesta: 'No sabe a qué se debe.', ...S(['2.1'], { '2.0': 'Cuenta el resultado, sin dudar.', '3.0': 'Recoge una objeción de otros.', '3.1': 'Responde la objeción.', '3.2': 'Cierra con fuerza, sin dudar.' }), bien: 'El pan es otra causa posible.' }, 'Dejó el pan al mismo tiempo: no sabe a cuál se lo debe.', ['Busca la que duda de la causa.', 'Aparece un cambio en la comida.'], 'La del pan']],
    'Supone que subirán; reconoce la duda del pan.', 'Niega el supuesto y busca la duda.');
  const CREMA = D('crema', 'Crema milagrosa', [
    'Anuncio: «El 95 % de las mujeres vio resultados. La usan las actrices. ¿Y usted qué espera?».',
    'Letra gris: «Encuesta a 19 clientas, dos semanas. No se comparó con otra crema».',
    'Una dermatóloga: «Casi cualquier crema humecta. Para decir que esta hace más, hay que compararla».']);
  reto('evalua-2', ['icf-lc-evalua-2', 'icf-lc-evalua-3'], 3, 'Crema milagrosa', 'Alcance y quién habla', 'Un anuncio con letra gris. Mide lo que se puede creer.', [
    ['Se sostiene o no', 'Cuántos, quiénes y comparados con qué.', 'genero-o-cita', '¿El enunciado **se sostiene** o **dice de más**?', { doc: CREMA, rot: ['se sostiene', 'dice de más'], ...F(['Casi todas las encuestadas dijeron ver resultados', 0, '¿Se preguntó justo eso?'], ['Es mejor que otras cremas', 1, '¿Se comparó con alguna?'], ['Sirve a todas las mujeres', 1, '¿A cuántas se les preguntó?']), bien: '19 clientas no son todas.' }, 'Las 19 respondieron; ni se comparó ni eran todas.', ['Lee con calma la letra gris.', 'Pregunta si se comparó con otra.'], 'Encuestadas: sí. Mejor y todas: de más'],
    ['Quién lo dice', 'Mira qué gana cada uno.', 'voz-de-la-fuente', 'Ata cada dato a su voz.', { ayuda: 'Tira un hilo desde cada dato hasta su voz.', doc: CREMA, portadas: [['El anuncio', 'vende'], ['La letra gris', 'aclara'], ['La dermatóloga', 'explica']], ...T(['apela a la fama', 0, '¿Quién nombra actrices?'], ['dice a cuántas se preguntó', 1, '¿Dónde está el 19?'], ['pide una comparación', 2, '¿Quién dice qué haría falta?']), bien: 'Fama, número y método.' }, 'El anuncio usa la fama, la letra gris el número y la doctora pide comparar.', ['Busca a las actrices.', 'Una voz dice qué faltó hacer.'], 'Anuncio: fama. Gris: 19. Doctora: comparar']],
    'Solo se sostiene lo de las 19; falta comparar.', 'Mide el alcance y mira quién habla.');

  const MUNDO = D('mundo-linea', 'Cinco fechas', [
    'En 1789, los representantes del pueblo francés proclamaron derechos. La nobleza perdió sus privilegios.',
    'En 1804, quienes habían sido esclavizados fundaron Haití.',
    'En 1933 Hitler llegó al poder por vías legales, en medio del desempleo. En 1945 terminó la guerra y nació la ONU.',
    'En 1989 cayó el Muro de Berlín.']);
  reto('mundo-1', ['icf-sc-mundo-1', 'icf-sc-mundo-2'], 2, 'Cinco fechas', 'Orden y deducción', 'Un resumen corto del mundo. Ordena y deduce.', [
    ['El orden', 'Busca los años.', 'pasos-del-proceso', 'Ordena los hechos. El primero está en su puesto.', { doc: MUNDO, que: 'los hechos', de: 'De Francia a Berlín', fija: 1, ini: [0, 2, 3, 1], tiras: ['Derechos en Francia.', 'Se funda Haití.', 'Nace la ONU.', 'Cae el Muro.'], mira: ['', 'Ocurrió en 1804.', 'Ocurrió en 1945.', 'Ocurrió en 1989.'], bien: '1789, 1804, 1945 y 1989.' }, 'Francia, Haití, ONU y Muro.', ['Busca el año de cada uno.', 'La ONU nace al final de la guerra.'], 'Francia, Haití, ONU, Muro'],
    ['Deducir', 'Une dos datos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MUNDO, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['La nobleza perdió privilegios.', 0, 'Búscala en el párrafo 1.'], ['Una dictadura puede empezar sin golpe militar.', 1, '¿Por qué vías llegó Hitler?'], ['La ONU se fundó en Berlín.', 2, '¿Se dice dónde?']), luz: [[1, 'perdió sus privilegios'], [3, 'por vías legales']], bien: 'Legal no siempre es democrático.' }, 'La nobleza está escrita, la dictadura se deduce y el lugar no aparece.', ['Busca la oración exacta.', 'Piensa qué enseña lo de 1933.'], 'Nobleza: dice. Dictadura: se deduce']],
    'Francia, Haití, ONU y Muro; una dictadura puede empezar con leyes.', 'Ordena por años y une datos.');
  const BUS = D('bus', 'El puesto del bus', [
    'En un pueblo, los del cerro debían subir al bus por la puerta de atrás. Una costurera se sentó adelante y la bajaron.',
    'Los del cerro dejaron de usar el bus. Caminaron cuatro meses. La empresa casi quiebra y quitó la regla.',
    'Un año después, el concejo prohibió esa clase de reglas en todo el municipio.']);
  reto('mundo-2', ['icf-sc-mundo-3'], 3, 'El puesto del bus', 'Herramientas y efectos', 'Un caso corto. Di qué hicieron y qué lograron.', [
    ['Qué fue', 'Nombra la herramienta.', 'pista-tipo', 'Ata cada nombre a su hecho.', { doc: BUS, lineas: ['subir por atrás', 'sentarse adelante', 'dejar de usar el bus', 'prohibir la regla'], ...T(['segregación', 0, '¿Cuál separa a un grupo?'], ['desobediencia', 1, '¿Cuál incumple una norma injusta?'], ['boicot', 2, '¿Cuál deja de usar un servicio?'], ['cambio legal', 3, '¿Cuál hace el concejo?']), bien: 'Cuatro nombres, cuatro hechos.' }, 'Subir atrás segrega, sentarse desobedece, dejar el bus boicotea y prohibir cambia la ley.', ['Mira quién hace cada cosa.', 'El concejo hace normas.'], 'Segregación, desobediencia, boicot, ley'],
    ['Qué logró', 'El orden importa.', 'balanza-tesis', 'Tesis: «el boicot cambió la regla». ¿Qué hace cada dato?', { doc: BUS, tesis: 'El boicot cambió la regla', ...F(['La empresa casi quiebra y quitó la regla.', 0, '¿Qué pasó primero?'], ['La regla ya se había quitado antes del boicot.', 1, 'Si fuera cierto, ¿la cambió el boicot?'], ['La costurera cosía vestidos.', 2, '¿Habla de la regla?']), bien: 'Primero el boicot, después el cambio.' }, 'La quiebra la apoya; que fuera antes la debilitaría; los vestidos no pesan.', ['Mira qué pasó primero.', 'Un dato no tiene que ver.'], 'Quiebra: apoya. Antes: debilita']],
    'Segregación, desobediencia, boicot y ley.', 'Nombra la herramienta y revisa el orden.');

  const SALES = D('iones', 'Tres frascos', [
    'Frasco 1: átomos con 12 protones, 12 neutrones y 10 electrones.',
    'Frasco 2: átomos con 12 protones, 14 neutrones y 12 electrones.',
    'Frasco 3: una sustancia que no conduce sólida, pero disuelta enciende un bombillo.']);
  reto('atomo-1', ['icf-cn-atomo-1'], 2, 'Tres frascos', 'Qué cambia', 'Dos frascos de átomos. Compara sus partículas.', [
    ['Ion o isótopo', 'Compara con el átomo de 12, 12 y 12.', 'genero-o-cita', 'Comparado con el átomo de 12 p, 12 n y 12 e, ¿qué es?', { doc: SALES, rot: ['un ion', 'un isótopo'], ...F(['El del frasco 1', 0, '¿Qué partícula cambió?'], ['El del frasco 2', 1, '¿Qué partícula cambió?']), bien: 'Electrones o neutrones.' }, 'En el 1 faltan electrones: ion. En el 2 hay más neutrones: isótopo.', ['Mira los electrones del frasco 1.', 'Mira los neutrones del frasco 2.'], '1: ion. 2: isótopo'],
    ['Lo que se puede decir', 'Resta y compara.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: SALES, filas: [{ antes: 'Los frascos 1 y 2 tienen', topes: ['elementos distintos', 'el mismo elemento', 'gases'], va: 1 }, { antes: 'La carga del frasco 1 es', topes: ['−2', '0', '+2'], va: 2 }], mira: ['Compara los protones.', 'Hay más protones que electrones.'], luz: [[1, '12 protones'], [1, '10 electrones']], bien: 'Mismo elemento, carga +2.' }, 'Los dos tienen 12 protones; en el 1, 12 menos 10 da +2.', ['El elemento lo deciden los protones.', 'Resta electrones a protones.'], 'Mismo elemento; 12 − 10 = +2']],
    'Un ion +2 y un isótopo del mismo elemento.', 'Protones: quién es. Electrones: carga. Neutrones: isótopo.');
  reto('atomo-2', ['icf-cn-atomo-2'], 3, 'El tercer frasco', 'El enlace se nota', 'Una sustancia y sus propiedades. Deduce su enlace.', [
    ['La hipótesis', 'Compara con una sal.', 'balanza-tesis', 'Hipótesis: «el frasco 3 tiene enlace iónico». ¿Qué hace cada dato?', { doc: SALES, tesis: 'El frasco 3 tiene enlace iónico', ...F(['Disuelto enciende el bombillo.', 0, '¿Hay iones que se muevan?'], ['No conduce sólido.', 0, '¿Están fijos los iones?'], ['Se funde a 40 °C.', 1, 'Si fuera cierto, ¿se parecería a una sal?']), bien: 'Fijo no conduce; suelto sí.' }, 'Conducir disuelto y no sólido la apoyan; fundirse a 40 la debilitaría.', ['Recuerda cuándo se mueven los iones.', 'Las sales se funden muy caliente.'], 'Bombillo y sólido: apoyan'],
    ['Cada enlace', 'Entregar, compartir o soltar.', 'pinta-tipos', 'Pinta cada propiedad con su enlace.', { doc: SALES, plumas: ['iónico', 'metálico', 'covalente'], ...P(['Conduce sólido y se dobla.', 1, '¿Dónde hay un mar de electrones?'], ['Conduce disuelto, no sólido.', 0, '¿Dónde hay iones?'], ['No conduce ni disuelto.', 2, '¿Dónde no hay iones ni mar?']), bien: 'Mar, iones o nada.' }, 'El mar conduce sólido, los iones disueltos y lo compartido no.', ['El metal conduce siempre.', 'El azúcar no tiene iones.'], 'Metálico, iónico, covalente']],
    'Enlace iónico: iones fijos en el sólido y libres al disolverse.', 'Electricidad y fusión delatan el enlace.');

  const LIGHTS = D('lights', 'The house with no lights', [
    'Every evening the lights of the old house come on at seven. Last Friday they didn\'t. Miss Rojas, who lives opposite, put on her coat and crossed the street with a pot of soup.',
    'Mr Vega opened the door with a candle in his hand. "I am saving electricity," he said. He didn\'t look at her. On the table there were three unopened envelopes from the power company.',
    'She put the soup on the table, on top of the envelopes. "I\'ve made too much again," she said. "And I need someone to help me eat it. Every Friday, if you can."']);
  reto('infer-1', ['icf-en-inferencia-1'], 2, 'The house with no lights', 'Gestos y pistas', 'A short story. Read the actions.', [
    ['Deduce', 'Une dos datos.', 'dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: LIGHTS, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'], ...F(['He opened the door with a candle.', 0, 'Búscala en el párrafo 2.'], ['He hasn\'t paid the electricity bill.', 1, '¿Qué hay sobre la mesa?'], ['She is his sister.', 2, '¿Se dice qué son?']), luz: [[2, 'a candle'], [2, 'three unopened envelopes']], bien: 'Envelopes tell the truth.' }, 'La vela está, la deuda se deduce por los sobres y el parentesco no.', ['Busca la oración de la vela.', 'Piensa de quién son los sobres.'], 'Candle: dice. Electricity: se deduce'],
    ['Feelings', 'Pregunta por qué haría eso.', 'pista-tipo', 'Match each feeling with its action.', { doc: LIGHTS, lineas: ['He didn\'t look at her.', 'She crossed the street.', 'She said it was too much soup.'], ...T(['ashamed', 0, '¿Quién evita una mirada?'], ['worried', 1, '¿Quién fue a ver qué pasaba?'], ['kind, without hurting him', 2, '¿Cuál esconde una ayuda?']), bien: 'She helps without saying it.' }, 'No mirar es pena, cruzar es preocupación y la sopa, bondad con tacto.', ['Piensa por qué alguien no mira.', 'La excusa de la sopa esconde algo.'], 'Ashamed, worried, kind']],
    'He hasn\'t paid; she helps without hurting him.', 'Señala la pista y lee el gesto.');
  const FOUNT = D('fountain', 'Save the fountain?', [
    'The fountain has been broken for ten years. I think the council should repair it, because children need a place to play.',
    'Mr Cruz says that it would cost 30 million pesos. He is right. But last year the council spent 45 on fireworks that lasted nine minutes.',
    'My neighbour used to disagree with me. Then she saw the photos of 1960, and she changed her mind.']);
  reto('infer-2', ['icf-en-inferencia-2'], 3, 'Save the fountain?', 'Hechos, razones y cambios', 'A short opinion text. Separate facts and reasons.', [
    ['Fact or opinion', '¿Se comprueba o se discute?', 'genero-o-cita', 'Is it a **fact** or an **opinion**?', { doc: FOUNT, rot: ['fact', 'opinion'], ...F(['The council should repair it', 1, '¿Se comprueba o se discute?'], ['The fireworks lasted nine minutes', 0, '¿Se comprueba o se discute?'], ['It has been broken for ten years', 0, '¿Se comprueba o se discute?']), bien: 'Should gives an opinion.' }, 'Los minutos y los años se comprueban; «should» opina.', ['Busca la palabra «should».', 'Los números se comprueban.'], 'Should: opinion. Números: fact'],
    ['For or against', 'Supón cierto cada dato.', 'balanza-tesis', 'Opinion: "the council can pay for it". What does each fact do?', { doc: FOUNT, tesis: 'The council can pay for it', ...F(['It spent 45 million on fireworks.', 0, '¿Muestra que hay dinero?'], ['The fireworks were paid by a company.', 1, 'Si fuera cierto, ¿gastó el concejo?'], ['The photos are from 1960.', 2, '¿Habla de dinero?']), bien: 'For, against, nothing.' }, 'Los 45 la apoyan; que pagara otro la debilita; las fotos no pesan.', ['Compara los dos gastos del texto.', 'Un dato no habla de dinero.'], 'Fireworks: apoya. Company: debilita']],
    'Facts have numbers; the money argument depends on who paid.', 'Comprueba, razona y mira quién pagó.');
}
;
//#archivo js/gimnasio-icf-8.js
// Gimnasio del Preicfes, octavos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-7.js.
{
  const { F, T, P, S } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('argu-1', ['icf-ma-argumenta-1', 'icf-ma-argumenta-2'], 2, 'El club de los múltiplos', 'Dirección y contraejemplo', 'Un club tiene reglas sobre números. Revísalas.', [
    ['La regla', 'No va al revés.', 'deduce-seguro', '«**Si un número es de 12, es de 3**». ¿Qué se concluye de cada dato?', { et: ['es de 12', 'no es de 3', 'es de 3', 'no es de 12'], metas: ['es de 3', 'no es de 12', 'no se sabe', 'no se sabe'], fichas: ['es de 3', 'no es de 12', 'no se sabe', 'no se sabe', 'es de 12', 'no es de 3'], mira: ['Si pasa lo primero, pasa lo segundo.', 'Si fuera de 12 sería de 3.', 'Piensa en el 9 y en el 24.', 'Piensa en el 9 y en el 10.'], trampas: {}, ok: 'Ida, o vuelta negando.' }, 'De ida vale y de vuelta solo negando las dos.', ['Busca un número que cumpla el dato y mira si obliga.', 'Dos de los datos dejan abiertas las dos opciones.'], 'Ida: sí. Vuelta: solo negando'],
    ['El que la tumba', 'Cumple la condición y falla la conclusión.', 'tumba-todos', '«**Todos los múltiplos de 5 son múltiplos de 10**». Toca **todos** los números que la tumban.', { a: 5, b: 10, nums: [15, 20, 25, 30, 12, 45] }, '15, 25 y 45 son de 5 y no de 10; el 12 no es de 5.', ['Primero mira si cumple la condición de la regla.', 'De esos, quédate con los que no terminan en cero.'], 'Terminan en 5: los tres']],
    'La regla va de ida; tres números tumban la otra.', 'Mira la dirección y busca quien cumpla y falle.');
  reto('argu-2', ['icf-ma-argumenta-3'], 3, '¿Se puede saber?', 'Una sola respuesta', 'Antes de calcular, decide si la información alcanza.', [
    ['Alcanza', 'Busca dos casos distintos.', 'alcanza-o-no', 'Se quiere saber el **perímetro de un cuadrado**. Con cada dato, ¿**alcanza** o **no alcanza**?', { et: ['su lado mide 8', 'su área es 49', 'es más grande que otro', 'está en un parque'], metas: ['alcanza', 'alcanza', 'no alcanza', 'no alcanza'], fichas: ['alcanza', 'alcanza', 'no alcanza', 'no alcanza', 'alcanza', 'no alcanza'], mira: ['Cuatro lados iguales.', 'Del área sale el lado.', 'Puede tener muchos tamaños.', 'No dice nada de sus medidas.'], ok: 'El lado o el área bastan.' }, 'Con el lado o el área hay un solo perímetro.', ['Mira si de ese dato sale el lado.', 'El área de un cuadrado deja un solo lado.'], 'Lado y área: alcanzan'],
    ['Sobra', 'Cambia el dato y mira la respuesta.', 'datos-que-sobran', 'Una tienda vende 30 panes a 800 pesos, abre a las 6 y tiene 2 empleados. Se quiere saber **cuánto recibe** por los panes. Toca lo que **sobra**.', { casos: [{ t: 'vende 30 panes', no: 'Hace falta la cantidad.' }, { t: 'abre a las 6', si: true }, { t: 'a 800 pesos', no: 'Hace falta el precio.' }, { t: 'tiene 2 empleados', si: true }], falta: 'Falta otro que no cambia lo recibido.', ok: 'Bastan cantidad y precio.' }, 'Cantidad por precio: la hora y los empleados sobran.', ['Pregunta qué operación harías.', 'Cambia cada dato: ¿cambia lo recibido?'], 'Cantidad · precio; lo demás sobra']],
    'Alcanzan el lado y el área; sobran la hora y los empleados.', 'Busca dos casos y cambia los datos.');

  const PERROS = D('dos-perros', 'Dos textos sobre perros', [
    'TEXTO 1: En cinco parques con zona para perros sueltos bajaron a la mitad las mordeduras en el resto del parque. Faltan datos de otras ciudades.',
    'TEXTO 2: Mi perro Trapo no entiende de zonas. Cree que el mundo entero es su zona y que yo soy el que anda suelto. Que le pongan reja al parque: él seguirá saludando a todos.']);
  reto('compara-1', ['icf-lc-comparar-1'], 2, 'Dos textos sobre perros', 'Comunes y distintos', 'Dos textos cortos. Compara propósito y alcance.', [
    ['Uno, otro o ambos', 'Debe poder señalarse.', 'pinta-tipos', 'Pinta cada idea con el texto que la trae.', { doc: PERROS, plumas: ['texto 1', 'texto 2', 'los dos'], ...P(['Da un resultado medido.', 0, '¿Cuál habla de mordeduras?'], ['Usa humor.', 1, '¿Cuál bromea con el perro?'], ['Habla de perros y parques.', 2, '¿Está en uno o en ambos?']), bien: 'Dato, humor y tema.' }, 'El dato es del 1, el humor del 2 y el tema de los dos.', ['Busca en cuál de los dos hay números.', 'El tema está en los dos.'], 'Dato: 1. Humor: 2. Tema: ambos'],
    ['El alcance', 'No digas más que el texto.', 'ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que los textos.', { doc: PERROS, filas: [{ antes: 'El texto 1 habla de', topes: ['todas las ciudades', 'ningún parque', 'cinco parques'], va: 2 }, { antes: 'El texto 2 cree que la reja', topes: ['resolverá todo', 'no cambiará a su perro', 'es ilegal'], va: 1 }], mira: ['Relee cuántos parques.', 'Relee la última oración.'], luz: [[1, 'cinco parques'], [2, 'él seguirá saludando']], bien: 'Cinco y no cambiará.' }, 'Cinco parques y un perro que seguirá igual.', ['Busca el número de parques.', 'Mira lo que dice que hará el perro.'], 'Cinco; no cambiará']],
    'Dato en uno, humor en otro; el alcance es de cinco parques.', 'Señala cada idea en su texto.');
  const WIFI = D('dos-wifi', 'Wifi en el parque', [
    'TEXTO 1: Pongan wifi gratis en el parque. Cuarenta estudiantes hacen tareas en la acera de la panadería porque allí llega la señal.',
    'TEXTO 2: Es cierto que muchos no tienen internet. Pero el parque es de los pocos sitios donde todavía se habla. Pongan el wifi en la biblioteca y ábranla hasta las nueve.']);
  reto('compara-2', ['icf-lc-comparar-2'], 3, 'Wifi en el parque', 'Conceder y proponer', 'Dos posturas cortas. Mira cómo responde la segunda.', [
    ['Cómo responde', 'Mira qué hace cada frase.', 'pista-tipo', 'Ata cada movimiento a su frase.', { doc: WIFI, lineas: ['Es cierto que muchos no tienen internet.', 'Pero el parque es de los pocos sitios donde todavía se habla.', 'Pongan el wifi en la biblioteca.'], ...T(['concede', 0, '¿Cuál reconoce algo?'], ['objeta', 1, '¿Cuál empieza con contraste?'], ['propone otra salida', 2, '¿Cuál pide algo distinto?']), bien: 'Conceder, objetar y proponer.' }, 'Reconoce, contrasta y propone.', ['Fíjate en las primeras palabras.', 'La última pide algo.'], 'Concede, objeta, propone'],
    ['Coinciden o chocan', 'Busca el punto en los dos.', 'genero-o-cita', '¿Los textos **coinciden** o **chocan**?', { doc: WIFI, rot: ['coinciden', 'chocan'], ...F(['Hay estudiantes sin internet', 0, '¿Alguno lo niega?'], ['El lugar del wifi', 1, '¿Piden el mismo sitio?'], ['Conviene ofrecer wifi', 0, '¿Los dos lo piden?']), bien: 'El problema los une; el lugar, no.' }, 'Los dos ven el problema y piden wifi; chocan en el lugar.', ['Busca lo que pide cada uno.', 'Una diferencia es de sitio.'], 'Problema y wifi: coinciden. Lugar: chocan']],
    'Concede, objeta y propone; chocan solo en el lugar.', 'Separa el problema de la salida.');

  const VALLE = D('valle-geo', 'El valle de Santa Rita', [
    'Santa Rita está a 2 000 metros. Su pirámide de población tiene la base angosta y la parte alta ancha.',
    'Cada año se van doscientos jóvenes a la capital: unos a estudiar; otros, porque la sequía acabó la siembra.',
    'En un mapa 1 : 100 000, el embalse está a 3 centímetros del pueblo.']);
  reto('geo-1', ['icf-sc-geografia-1'], 2, 'El valle de Santa Rita', 'Mapas y población', 'Tres datos de un municipio. Deduce.', [
    ['Deducir', 'Usa la escala y la pirámide.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: VALLE, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['El pueblo está a 2 000 metros.', 0, 'Búscala en el párrafo 1.'], ['El embalse está a 3 kilómetros.', 1, '¿Cuánto vale cada centímetro?'], ['Hay pocos niños en proporción.', 1, '¿Cómo es la base de la pirámide?'], ['El embalse es de agua salada.', 2, '¿Se habla de eso?']), luz: [[1, '2 000 metros'], [3, '1 : 100 000'], [1, 'la base angosta']], bien: 'Escala y pirámide.' }, 'La altura está escrita, la distancia y la base se deducen y la sal no aparece.', ['En esa escala, un centímetro es un kilómetro.', 'La base muestra a los niños.'], '3 cm → km; base angosta: pocos niños'],
    ['Migrar', '¿Podían quedarse?', 'genero-o-cita', '¿Es migración **por estudio** o **por el ambiente**?', { doc: VALLE, rot: ['por estudio', 'por el ambiente'], ...F(['Se fue a la universidad', 0, '¿Qué la movió?'], ['Se fue por la sequía', 1, '¿Qué la movió?'], ['Perdió su siembra', 1, '¿Qué la movió?']), bien: 'Aprender o no poder sembrar.' }, 'La universidad es estudio; la sequía y la siembra, ambiente.', ['Pregunta qué la hizo irse.', 'La siembra depende del agua.'], 'Universidad: estudio. Sequía: ambiente']],
    'A 3 km, con pocos niños; se van por estudio o por sequía.', 'Escala, pirámide y motivo.');
  const MINITA = D('cantera', 'La cantera', [
    'Una cantera ofrece ochenta empleos en un cerro que da agua a seis veredas. El plano marca la piedra; no marca las casas.',
    'El estudio dice que el caudal bajaría un tercio. La empresa ofrece un acueducto a veinte kilómetros.',
    'La junta propone una cantera más pequeña, lejos del nacimiento, con vigilancia de las veredas.']);
  reto('geo-2', ['icf-sc-geografia-2'], 3, 'La cantera', 'Tres patas y una mesa', 'Un proyecto con tres propuestas. Evalúalo.', [
    ['Las patas', 'Nombra lo que toca cada efecto.', 'pinta-tipos', 'Pinta cada efecto con su pata.', { doc: MINITA, plumas: ['económica', 'social', 'ambiental'], ...P(['Ochenta empleos.', 0, '¿Dinero, gente o naturaleza?'], ['El caudal baja un tercio.', 2, '¿Dinero, gente o naturaleza?'], ['Las casas no aparecen en el plano.', 1, '¿Dinero, gente o naturaleza?']), bien: 'Empleo, gente y agua.' }, 'Empleos, económica; casas, social; caudal, ambiental.', ['El agua es naturaleza.', 'Las casas son de personas.'], 'Empleos, casas, caudal'],
    ['La balanza', 'Revisa las tres patas.', 'balanza-tesis', 'Idea: «la propuesta de la junta es más sostenible que la inicial». ¿Qué hace cada dato?', { doc: MINITA, tesis: 'La de la junta es más sostenible', ...F(['Queda lejos del nacimiento.', 0, '¿Cuida el agua?'], ['Las veredas vigilan.', 0, '¿Incluye a la gente?'], ['La cantera pequeña secaría igual el agua.', 1, 'Si fuera cierto, ¿sería mejor?']), bien: 'Agua y gente en la mesa.' }, 'Alejarse y vigilar la apoyan; secar igual la debilitaría.', ['Mira qué pasa con el agua.', 'Mira quién participa.'], 'Lejos y vigilancia: apoyan']],
    'Empleo, gente y agua; la de la junta equilibra más.', 'Revisa las tres patas y quién decide.');

  const GATOS = D('gatos', 'Los gatos de la plaza', [
    'En los gatos de la plaza, el pelo liso (L) domina al rizado (l). Dos gatos lisos tuvieron cuatro crías: tres lisas y una rizada.',
    'En otra camada de esa pareja, las cinco crías fueron lisas.']);
  reto('here-1', ['icf-cn-herencia-1', 'icf-cn-herencia-2'], 2, 'Los gatos de la plaza', 'Alelos escondidos', 'Una pareja de gatos y dos camadas. Deduce sus genes.', [
    ['Los padres', 'La cría rizada recibió dos alelos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GATOS, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['El liso domina al rizado.', 0, 'Búscala en el párrafo 1.'], ['Los dos padres son Ll.', 1, '¿De dónde salió la cría rizada?'], ['La próxima cría será rizada.', 2, '¿Se puede asegurar?']), luz: [[1, 'domina al rizado'], [1, 'una rizada']], bien: 'Cada padre dio una l.' }, 'La dominancia está escrita, los Ll se deducen y la próxima no se puede asegurar.', ['Piensa qué dos alelos tiene la cría rizada.', 'La probabilidad no asegura una cría.'], 'Domina: dice. Ll: se deduce'],
    ['Las células', '¿Crecer o formar gametos?', 'genero-o-cita', '¿Es **mitosis** o **meiosis**?', { rot: ['mitosis', 'meiosis'], doc: GATOS, ...F(['Crece la pata de una cría', 0, '¿Crecer o formar gametos?'], ['Se forma un espermatozoide', 1, '¿Crecer o formar gametos?'], ['Se cura un rasguño', 0, '¿Crecer o formar gametos?']), bien: 'Copiar o reducir.' }, 'Crecer y curar es mitosis; el espermatozoide, meiosis.', ['Pregunta para qué sirve.', 'Solo una forma gametos.'], 'Pata y rasguño: mitosis. Espermatozoide: meiosis']],
    'Los padres son Ll; crecer y curar es mitosis.', 'Devuélvete desde la cría recesiva.');
  const PICOS = D('picos', 'Picos en la sequía', [
    'En una isla, antes de la sequía, los picos de las aves medían en promedio 9 milímetros. Solo quedaron semillas grandes y duras.',
    'Murieron ocho de cada diez aves. Entre las que sobrevivieron, el promedio fue 10. Sus crías, al año siguiente, también promediaron 10.']);
  reto('here-2', ['icf-cn-herencia-3'], 3, 'Picos en la sequía', 'Variar, heredar, seleccionar', 'Datos de aves antes y después de una sequía. Explica el cambio.', [
    ['Los pasos', 'Variación, selección y herencia.', 'pasos-del-proceso', 'Ordena lo que pasó. El primero está en su puesto.', { doc: PICOS, que: 'el cambio', de: 'Picos en la sequía', fija: 1, ini: [0, 2, 3, 1], tiras: ['Hay picos de varios tamaños.', 'La sequía deja semillas duras.', 'Sobreviven más los de pico grande.', 'Las crías heredan el pico.'], mira: ['', 'Es el cambio del ambiente.', 'Es a quién favorece.', 'Es lo que se ve al año.'], bien: 'Variar, cambiar, sobrevivir y heredar.' }, 'Variación, sequía, supervivencia y herencia.', ['Primero ya había picos distintos.', 'La herencia se ve en las crías.'], 'Variar, sequía, sobrevivir, heredar'],
    ['Correcta o error', '¿Individuo o población?', 'genero-o-cita', '¿La explicación es **correcta** o tiene el **error** típico?', { doc: PICOS, rot: ['correcta', 'error típico'], ...F(['A cada ave le creció el pico por hambre', 1, '¿Cambia el individuo?'], ['Sobrevivieron más las de pico grande', 0, '¿Habla de quién quedó?'], ['El promedio de la población cambió', 0, '¿Habla del grupo?']), bien: 'Cambia el grupo.' }, 'El pico no creció por hambre: cambió quiénes quedaron.', ['Pregunta si habla de un ave o del grupo.', 'El hambre no alarga picos.'], 'Hambre: error. Grupo: correcta']],
    'Variación, sequía, supervivencia y herencia; cambió la población.', 'Cambia el grupo, no el individuo.');
}
;
//#archivo js/gimnasio-icf-9.js
// Gimnasio del Preicfes, novenos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-8.js.
{
  const { F, T, P } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('plata-1', ['icf-ma-finanzas-1'], 2, 'El ahorro de la moto', 'Sumar lo mismo', 'Un ahorro crece con interés simple y otro con compuesto. Compáralos.', [
    ['Con simple', 'Mira cuánto agrega un periodo.', 'plazo-simple', 'Hay **600** mil al **4 % mensual simple**. Mueve los meses hasta **792** mil.', { C: 600, i: 24, meta: 792, max: 14, et: 'meses' }, 'Cada mes agrega 24 y faltan 192: son 8 meses.', ['Halla lo que agrega un solo mes.', 'Reparte lo que falta entre lo que agrega cada mes.'], '24 por mes: 8 meses'],
    ['Con compuesto', 'Multiplica año por año.', 'plazo-compuesto', 'Hay **400** mil al **30 % anual compuesto**. Mueve hasta el **primer** año con **800** mil o más.', { C: 400, r: 30, meta: 800, max: 8 }, '520, 676 y 878.8: se pasa en el año 3.', ['Cada año se multiplica por 1.3.', 'Calcula el saldo de cada año hasta pasar la meta.'], '520, 676, 878.8: año 3']],
    '8 meses con simple; 3 años con compuesto.', 'Uno suma lo mismo, el otro multiplica por lo mismo.');
  reto('plata-2', ['icf-ma-finanzas-2'], 3, 'La bicicleta a plazos', 'Volver y completar', 'Una bicicleta tiene IVA, cuota inicial y cuotas.', [
    ['Sin IVA', 'Para volver se divide.', 'antes-del-iva', 'Con IVA del **19 %** vale **833** mil. Mueve el precio **sin IVA**, en miles.', { final: 833, iva: 19, min: 600, max: 800, paso: 5 }, '$833 \\div 1.19 = 700$ mil.', ['El precio sin IVA por 1.19 da el total.', 'Prueba con números redondos y multiplica por 1.19.'], '833 ÷ 1.19 = 700'],
    ['Las cuotas', 'Quita la inicial.', 'cuotas-justas', 'En total se pagan **833** mil: **113** de inicial y cuotas de **80**. Mueve el número de cuotas.', { total: 833, ini: 113, cuota: 80, max: 14 }, '$833 - 113 = 720$ y $720 \\div 80 = 9$ cuotas.', ['Empieza por quitar la cuota inicial.', 'Divide lo que falta entre el valor de cada cuota.'], '720 entre 80: 9 cuotas']],
    'Sin IVA vale 700 mil y se paga en 9 cuotas.', 'Dividir para volver, quitar la inicial y repartir.');

  const FERIA = D('feria-mango', 'La feria del mango', [
    'En la feria, un mango pasó de 500 a 900 pesos después de que una tormenta tumbó la mitad de la cosecha. Además, esa semana llegaron mil turistas.',
    'Solo quedó un transportador. Cobra el doble que antes: dice que el camino está malo. Los campesinos dicen que no tienen a quién más llamar.']);
  reto('econo-1', ['icf-sc-economia-1'], 2, 'La feria del mango', 'Oferta y poder', 'Subió el mango y subió el transporte. Explica cada alza.', [
    ['Por qué subió', 'Mira a quién le ocurrió el cambio.', 'pinta-tipos', 'Pinta cada hecho con lo que cambió.', { doc: FERIA, plumas: ['baja la oferta', 'sube la demanda', 'hay un monopolio'], ...P(['La tormenta tumbó la cosecha.', 0, '¿Cambió lo que se vende?'], ['Llegaron mil turistas a comer mango.', 1, '¿Cambió lo que se quiere?'], ['Solo quedó un transportador.', 2, '¿Cuántos venden el servicio?']), bien: 'Vendedores, compradores y poder.' }, 'La cosecha baja la oferta, los turistas suben la demanda y un solo transportador es monopolio.', ['Pregunta si cambió lo que hay o lo que se quiere.', 'Cuenta cuántos ofrecen el transporte.'], 'Cosecha, turistas, uno solo'],
    ['Deducir', 'Usa los datos del texto.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FERIA, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['El mango llegó a 900 pesos.', 0, 'Búscala en el párrafo 1.'], ['El mango subió un 80 %.', 1, 'Compara los 400 que subió con los 500.'], ['El transportador fija el precio casi solo.', 1, '¿Hay a quién más llamar?'], ['La tormenta fue en marzo.', 2, '¿Se dice el mes?']), luz: [[1, 'de 500 a 900 pesos'], [2, 'no tienen a quién más llamar']], bien: 'Cuenta y poder.' }, 'Los 900 están escritos; el 80 % y el poder se deducen; el mes no aparece.', ['Divide lo que subió entre lo que valía.', 'Piensa qué pasa si no hay otro vendedor.'], '400 ÷ 500; un solo vendedor']],
    'Menos oferta, más demanda y un solo transportador.', 'Pregunta qué cambió y quién tiene el poder.');
  const FABRICA = D('fabrica-zapatos', 'La fábrica que llegó', [
    'Una multinacional abrió en Puerto Claro una fábrica de zapatos: dio 400 empleos con contrato. Dos talleres locales cerraron ese año y 60 personas quedaron sin trabajo.',
    'El ingreso promedio subió 20 %. El Gini del municipio pasó de 0.41 a 0.48. Los precios subieron 5 %.']);
  reto('econo-2', ['icf-sc-economia-2', 'icf-sc-economia-3'], 3, 'La fábrica que llegó', 'Promedio y reparto', 'Llegó una multinacional. Mide sus efectos.', [
    ['La balanza', 'Distingue ingreso de reparto.', 'balanza-tesis', 'Idea: «la llegada de la fábrica benefició a todos por igual». ¿Qué hace cada dato?', { doc: FABRICA, tesis: 'Benefició a todos por igual', ...F(['El Gini pasó de 0.41 a 0.48.', 1, '¿Se repartió más o menos parejo?'], ['Dos talleres cerraron.', 1, '¿Todos ganaron?'], ['Una encuesta mostró que el ingreso de todos los hogares subió 20 %.', 0, 'Si todos suben igual, ¿es parejo?'], ['Hace zapatos.', 2, '¿Dice cómo se repartió?']), bien: 'Subió el promedio, no el reparto.' }, 'El Gini y los cierres la debilitan; que todos subieran igual la apoya; el producto no pesa.', ['Recuerda qué significa un Gini mayor.', 'Busca a quienes perdieron.'], 'Gini y cierres: en contra'],
    ['Gana o arriesga', 'Mira qué le cambia a cada uno.', 'genero-o-cita', '¿Con la fábrica cada quien **gana** o **arriesga**?', { doc: FABRICA, rot: ['gana', 'arriesga'], ...F(['Quien obtuvo contrato', 0, '¿Qué le cambió?'], ['Dueña de un taller pequeño', 1, '¿Qué le llega?'], ['Quien compra zapatos más baratos', 0, '¿Paga menos o más?']), bien: 'Empleo, competencia y precio.' }, 'El contrato y el precio benefician; el taller enfrenta competencia.', ['Piensa en lo que cada uno recibe o pierde.', 'Los talleres venden lo mismo que la fábrica.'], 'Contrato y comprador: ganan; taller: arriesga']],
    'Subió el promedio y también la desigualdad; el taller arriesga.', 'El promedio no cuenta cómo se reparte.');

  reto('reac-1', ['icf-cn-reacciones-1', 'icf-cn-reacciones-2'], 2, 'El gas de la estufa', 'Cuadrar y dividir', 'Se quema un gas en una estufa. Balancea y mira cuál reactivo se acaba.', [
    ['Balancear', 'Deja el oxígeno para el final.', 'balancea-atomos', 'Balancea la combustión del propano: $C_3H_8 + O_2 \\to CO_2 + H_2O$, con los números **más pequeños**.', { izq: [['C₃H₈', { C: 3, H: 8 }], ['O₂', { O: 2 }]], der: [['CO₂', { C: 1, O: 2 }], ['H₂O', { H: 2, O: 1 }]], sol: [1, 5, 3, 4], max: 6 }, 'Salen 3 de $CO_2$ y 4 de agua: 10 oxígenos, es decir, $5O_2$.', ['Empieza por el carbono y el hidrógeno.', 'Todos los hidrógenos van a moléculas que llevan dos.'], 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O'],
    ['El que limita', 'Divide lo que hay entre lo que pide.', 'paquetes-limite', 'Cada reacción usa **1** de $C_3H_8$ y **5** de $O_2$. Hay **6** de $C_3H_8$ y **20** de $O_2$. Mueve cuántas ocurren.', { hay: [['C₃H₈', 6, 1], ['O₂', 20, 5]], que: 'reacciones', max: 8 }, 'El oxígeno alcanza para $20 \\div 5 = 4$; sobran 2 de propano.', ['Halla cuántas reacciones permite cada uno.', 'Manda el que permite menos.'], '6 y 4: ocurren 4']],
    'La receta es 1 a 5 y el oxígeno limita: 4 reacciones.', 'Primero la receta; después, el que se acaba.');
  const PECERA = D('pecera', 'La pecera', [
    'El agua de una pecera tenía pH 7. Después de tres meses sin cambios midió 5 y varios peces murieron. Los restos de comida producen ácidos al descomponerse.',
    'Otra pecera igual, limpiada cada semana, siguió en 7. Ninguno de sus peces murió.']);
  reto('reac-2', ['icf-cn-reacciones-3'], 3, 'La pecera', 'Por diez', 'El agua de una pecera cambió. Mide y explica.', [
    ['La medida', 'Cada paso es por diez.', 'nivel-ph', 'La muestra A, de otra pecera, tiene pH **8**. Mueve la muestra B, **cien veces más ácida**.', { base: 8, k: -2 }, 'Cien son dos pasos hacia lo ácido: pH 6.', ['Recuerda hacia qué lado está lo ácido.', 'Escribe cien como una multiplicación de dieces.'], '100 = dos pasos: pH 6'],
    ['La causa', 'Compara las dos peceras.', 'balanza-tesis', 'Hipótesis: «los restos de comida acidificaron el agua». ¿Qué hace cada dato?', { doc: PECERA, tesis: 'Los restos acidificaron el agua', ...F(['La pecera limpia siguió en 7.', 0, '¿Qué pasa al quitar los restos?'], ['Otra pecera con restos siguió en 7.', 1, '¿Bastaron los restos?'], ['Los peces eran rojos.', 2, '¿Cambia el pH?']), bien: 'Quitar la causa la pone a prueba.' }, 'La limpia la apoya; con restos y sin cambio se debilita; el color no pesa.', ['Compara lo que cambia entre las peceras.', 'Piensa qué debería pasar si la causa fuera esa.'], 'Limpia en 7: apoya']],
    'Dos pasos son cien veces; la pecera limpia apoya la causa.', 'Cuenta los pasos y compara con el control.');
}
;
//#archivo js/gimnasio-icf-10.js
// Gimnasio del Preicfes, décimos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-9.js.
{
  const { F, T, P } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('curva-1', ['icf-ma-curvas-1', 'icf-ma-curvas-2'], 2, 'El puente y el cultivo', 'Simetría y factores', 'Un arco de puente y un cultivo que crece. Dos curvas distintas.', [
    ['El arco', 'Busca la mitad.', 'vertice-parabola', 'Un arco toca el suelo en **3 m** y en **17 m**. Mueve la distancia de su punto **más alto**.', { r1: 3, r2: 17, h: 10, max: 20, et: 'distancia (m)' }, '$\\tfrac{3 + 17}{2} = 10$ m.', ['El arco es simétrico: los dos apoyos están a igual altura.', 'Busca el punto a igual distancia de los apoyos.'], 'Mitad entre 3 y 17: 10'],
    ['El cultivo', 'Mira qué potencia es.', 'veces-factor', 'Hay **2** algas y se **triplican** cada semana. Mueve las semanas hasta **162**.', { C: 2, k: 3, meta: 162, max: 8, et: 'semanas' }, '$162 \\div 2 = 81 = 3^4$: 4 semanas.', ['Divide la meta entre lo que había.', 'Busca qué potencia de 3 es ese número.'], '81 = 3⁴']],
    'El arco sube hasta los 10 m y el cultivo tarda 4 semanas.', 'La simetría para la parábola; los factores para la exponencial.');
  reto('curva-2', ['icf-ma-curvas-3', 'icf-ma-curvas-4'], 3, 'La marea y la recta', 'Centro y cortes', 'Lee una onda y una recta sin dibujarlas enteras.', [
    ['La marea', 'Primero el centro.', 'amplitud-onda', 'La marea va de **1 m** a **11 m**. Mueve la línea media y la amplitud.', { min: 1, max: 11, hi: 12 }, 'La media es 6 y la amplitud, 5.', ['Busca el punto a igual distancia del máximo y del mínimo.', 'La amplitud se mide desde el centro.'], 'Media 6, amplitud 5'],
    ['La recta', 'Sobre un eje, la otra coordenada es 0.', 'corte-ejes', 'Mueve los cortes de $5x + 2y = 20$ con los ejes.', { a: 5, b: 2, c: 20, max: 12 }, 'Con $y = 0$, $x = 4$; con $x = 0$, $y = 10$.', ['Reemplaza por 0 una coordenada y despeja la otra.', 'Haz las dos cuentas por separado.'], '(4, 0) y (0, 10)']],
    'Media 6, amplitud 5; cortes (4, 0) y (0, 10).', 'Busca el centro y reemplaza por 0.');

  const ISLA = D('isla-norte', 'La Isla Norte', [
    'La Isla Norte tiene parlamento propio y hace sus leyes, pero otro país decide sobre su defensa. Sus habitantes hablan una lengua que no se habla en ninguna otra parte.',
    'El año pasado el parlamento aprobó, según las reglas, prohibir esa lengua en las escuelas. Ocho de cada diez habitantes dijeron que la norma es injusta.']);
  reto('modelo-1', ['icf-sc-modelos-1'], 2, 'La Isla Norte', 'Conceptos en un caso', 'Un caso inventado. Aplica los conceptos.', [
    ['Deducir', 'Usa las definiciones.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ISLA, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Ocho de cada diez la consideran injusta.', 0, 'Búscala en el párrafo 2.'], ['Su soberanía no es completa.', 1, '¿Quién decide sobre la defensa?'], ['La norma es legal, pero poco legítima.', 1, 'Compara cómo se aprobó con lo que opinan.'], ['La isla exporta pescado.', 2, '¿Se habla de eso?']), luz: [[2, 'Ocho de cada diez'], [1, 'otro país decide sobre su defensa'], [2, 'según las reglas']], bien: 'Soberanía y legitimidad.' }, 'El ocho de diez está escrito; la soberanía y la legitimidad se deducen; el pescado no.', ['Recuerda qué significa soberanía.', 'Legal es según las reglas; legítimo, que lo reconozcan.'], 'Defensa ajena; legal y rechazada'],
    ['El concepto', 'Cada dato, su palabra.', 'pinta-tipos', 'Pinta cada dato con el concepto que muestra.', { doc: ISLA, plumas: ['nación', 'Estado', 'legitimidad'], ...P(['Comparten una lengua propia.', 0, '¿Habla de sentirse unidos?'], ['Tiene un parlamento que hace leyes.', 1, '¿Habla de la organización?'], ['Casi todos rechazan la norma.', 2, '¿Habla de reconocer o no?']), bien: 'Lengua, leyes y rechazo.' }, 'La lengua es de la nación, las leyes del Estado y el rechazo toca la legitimidad.', ['Pregunta si habla del grupo, de la organización o de aceptar.', 'Busca la palabra que más se acerca a cada definición.'], 'Lengua, leyes, rechazo']],
    'Soberanía incompleta y una norma legal poco legítima.', 'Ata cada dato a una definición.');
  const BUSES = D('buses', 'Los buses de Santa Fe', [
    'Santa Fe discute qué hacer con sus buses. Propuesta A: venderlos a tres empresas que compitan. Propuesta B: que sigan siendo públicos y que los paguen los impuestos de los más ricos.',
    'Propuesta C: que cada barrio maneje los suyos y decida en asamblea las rutas. Con A, los barrios altos, donde hay pocos pasajeros, quedarían sin ruta.']);
  reto('modelo-2', ['icf-sc-modelos-2'], 3, 'Los buses de Santa Fe', 'Lógicas y consecuencias', 'Tres propuestas para el transporte. Reconócelas y evalúalas.', [
    ['Las lógicas', 'Quién decide y quién paga.', 'pista-tipo', 'Ata cada lógica a su propuesta.', { doc: BUSES, lineas: ['A: vender a empresas que compitan', 'B: públicos, con impuestos a los más ricos', 'C: cada barrio decide en asamblea'], ...T(['liberal', 0, '¿Cuál confía en la competencia?'], ['de igualdad, con impuestos', 1, '¿Cuál reparte?'], ['comunitaria', 2, '¿Cuál decide en asamblea?']), bien: 'Competir, repartir y decidir juntos.' }, 'A confía en el mercado, B reparte y C decide en comunidad.', ['Mira quién toma la decisión en cada una.', 'Busca las palabras competir, impuestos y asamblea.'], 'A: mercado; B: impuestos; C: asamblea'],
    ['La balanza', 'Mira a quién deja por fuera.', 'balanza-tesis', 'Idea: «la propuesta A es la mejor para todos los barrios». ¿Qué hace cada dato?', { doc: BUSES, tesis: 'A es la mejor para todos los barrios', ...F(['Los barrios altos quedarían sin ruta.', 1, '¿Es mejor para todos?'], ['En una ciudad parecida, al competir llegaron rutas a todos los barrios.', 0, '¿A quiénes llegó?'], ['Los buses son verdes.', 2, '¿Cambia algo?']), bien: '«Todos» es mucho decir.' }, 'Quedar sin ruta la debilita; que llegara a todos la apoya; el color no pesa.', ['Fíjate en la palabra todos de la idea.', 'Busca a quiénes beneficia y a quiénes no.'], 'Barrios altos: en contra']],
    'Tres lógicas; A deja por fuera a los barrios altos.', 'Pregunta quién decide, quién paga y quién queda por fuera.');

  reto('onda-1', ['icf-cn-ondas-1'], 2, 'La cuerda del gimnasio', 'Frecuencia y longitud', 'Se sacude una cuerda gruesa. Mide su onda.', [
    ['La frecuencia', 'Cuenta y reparte.', 'cuenta-vibraciones', 'El dibujo muestra lo que vibró un punto en **5 s**. Mueve su **frecuencia**.', { n: 10, t: 5, max: 10 }, '10 vibraciones en 5 s: 2 Hz.', ['Cuenta las vibraciones completas del dibujo.', 'Repártelas entre los segundos.'], '10 ÷ 5 = 2 Hz'],
    ['La longitud', 'El producto da la rapidez.', 'largo-onda', 'La onda viaja a **10 m/s** con esos **2 Hz**. Mueve su **longitud de onda**.', { v: 10, f: 2, max: 12, u: 'm' }, '$10 \\div 2 = 5$ m.', ['La longitud por la frecuencia da la rapidez.', 'Divide la rapidez entre la frecuencia.'], '10 ÷ 2 = 5 m']],
    'Vibra a 2 Hz y cada onda mide 5 m.', 'Vibraciones por segundo y producto igual a la rapidez.');
  reto('onda-2', ['icf-cn-ondas-2'], 3, 'El cañón y el espejo', 'Ida y vuelta, igual ángulo', 'Un eco en un cañón y un rayo en un espejo.', [
    ['El eco', 'Fue y volvió.', 'eco-distancia', 'A **340 m/s**, el eco vuelve a los **5 s**. Mueve la distancia a la pared.', { v: 340, t: 5, max: 1800, paso: 10 }, '$340 \\cdot 5 = 1\\,700$; la mitad, 850 m.', ['Halla todo lo que recorrió el sonido.', 'Recuerda que recorrió el camino dos veces.'], '1 700 ÷ 2 = 850 m'],
    ['El espejo', 'Se mide desde la normal.', 'refleja-angulo', 'Un rayo llega formando **65° con el espejo**. Mueve el que sale, **desde la normal**.', { g: 25, con: true }, '$90 - 65 = 25°$, y sale igual.', ['Pasa primero el ángulo a la normal.', 'El espejo y la normal forman un ángulo recto.'], '90 − 65 = 25°']],
    'La pared está a 850 m y el rayo sale a 25° de la normal.', 'Parte el recorrido y mide desde la normal.');
}
;
//#archivo js/gimnasio-icf-11.js
// Gimnasio del Preicfes, onceavos mundos y Electricidad (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-10.js.
{
  const { F } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('espa-1', ['icf-ma-espacio-1', 'icf-ma-espacio-2'], 2, 'El logo y la pila', 'Un movimiento a la vez', 'Un logo se mueve en el plano y una pila de cajas se mira de frente.', [
    ['El giro', 'Igual distancia al centro.', 'rota-punto', 'El logo gira **180°** alrededor del punto resaltado. Arrastra el punto a donde queda **A**.', { A: [3, -2], otros: [[5, -2], [3, 2]], g: 180 }, 'En media vuelta cambian los dos signos: $(-3, 2)$.', ['La imagen queda al lado opuesto del centro.', 'Cambia el signo de las dos coordenadas.'], '(−3, 2)'],
    ['La pila', 'La más alta de cada columna.', 'vista-frente', 'Plano desde arriba con la altura de cada torre. Toca lo que se ve **de frente**.', { h: [[1, 3, 1], [2, 1, 1], [1, 2, 4]], alto: 4 }, 'Se ven 2, 3 y 4.', ['Mira columna por columna.', 'De cada columna se ve la torre más alta.'], '2, 3, 4']],
    'A queda en (−3, 2) y de frente se ven 2, 3 y 4.', 'Signos para el giro; la más alta para la vista.');
  reto('espa-2', ['icf-ma-espacio-3'], 3, 'El terreno', 'Restar y promediar', 'Un terreno con forma de paralelogramo y un pozo en su centro.', [
    ['La esquina', 'Los lados opuestos van igual.', 'cuarto-vertice', 'A, B y C son esquinas **seguidas** del terreno. Arrastra **D**.', { A: [-5, 1], B: [-1, 4], C: [5, 3] }, 'De B a A: 4 a la izquierda y 3 abajo; desde C: $(1, 0)$.', ['D está junto a A y a C.', 'Repite desde C lo que se camina de B a A.'], '(1, 0)'],
    ['El pozo', 'El centro es el medio de una diagonal.', 'punto-medio', 'El pozo está en el medio de la diagonal que sale de **A**; su otro extremo, la esquina opuesta, aquí se llama **B**.', { A: [-5, 1], B: [5, 3] }, '$\\tfrac{-5 + 5}{2} = 0$ y $\\tfrac{1 + 3}{2} = 2$.', ['Promedia las dos coordenadas de lado.', 'Promedia también las dos alturas.'], '(0, 2)']],
    'D queda en (1, 0) y el pozo en (0, 2).', 'Restar para copiar un lado, promediar para el medio.');

  reto('gas-1', ['icf-cn-gases-1'], 2, 'El pistón y el globo', 'Qué queda fijo', 'Un gas en dos situaciones. Mira qué no cambia.', [
    ['El pistón', 'El producto no cambia.', 'boyle-embolo', 'Un gas ocupa **8 L** a **3 atm**. Con la misma temperatura pasa a **4 atm**. Mueve el émbolo.', { P: 3, V: 8, P2: 4, max: 12, paso: 1 }, '$3 \\cdot 8 = 24$ y $24 \\div 4 = 6$ L.', ['Multiplica la presión por el volumen de antes.', 'Ese producto debe dar igual con la presión nueva.'], '24 ÷ 4 = 6 L'],
    ['El globo', 'Volumen y kelvin.', 'charles-globo', 'Un globo de **4 L** a **200 K** pasa a **350 K** con la misma presión. Mueve su volumen.', { V: 4, T: 200, T2: 350, max: 10, paso: 0.5 }, '$4 \\cdot \\tfrac{350}{200} = 7$ L.', ['Compara los kelvin de antes y de después.', 'Cada 50 K de antes corresponden a un litro.'], '350 ÷ 50 = 7 L']],
    'El gas queda en 6 L y el globo, en 7 L.', 'Primero mira qué queda fijo.');
  reto('gas-2', ['icf-cn-gases-2'], 3, 'La limonada del bazar', 'Mismo soluto', 'Se prepara limonada y después se suaviza.', [
    ['Preparar', 'Soluto entre disolución.', 'concentra-agua', 'Hay **90 g** de azúcar. Mueve el volumen para que quede a **40 g/L**.', { g: 90, meta: 40, max: 4, paso: 0.25 }, '$90 \\div 40 = 2.25$ L.', ['Cada litro debe llevar 40 gramos.', 'Divide los gramos que hay entre los que lleva cada litro.'], '90 ÷ 40 = 2.25 L'],
    ['Suavizar', 'Los gramos no cambian.', 'diluye-agua', 'Quedan **1.5 L** a **40 g/L**. Mueve el agua que se **agrega** para dejarla a **30 g/L**.', { V: 1.5, C: 40, C2: 30, max: 3, paso: 0.25 }, 'Hay 60 g: a 30 g/L llenan 2 L. Se agrega 0.5 L.', ['Halla cuántos gramos de azúcar quedan.', 'Al volumen final réstale lo que ya había.'], '2 − 1.5 = 0.5 L']],
    'Se preparan 2.25 L y se agrega medio litro de agua.', 'El azúcar es la misma; cambia el volumen.');

  reto('elec-1', ['icf-cn-electrico-1'], 2, 'La linterna', 'Ohm y camino', 'Una linterna con una pila y dos resistencias.', [
    ['La corriente', 'Voltaje entre resistencia.', 'corriente-resistor', 'La pila es de **9 V** y la resistencia, de **4 Ω**. Mueve la corriente.', { V: 9, R: 4, max: 4, paso: 0.25 }, '$9 \\div 4 = 2.25$ A.', ['La corriente por la resistencia da el voltaje.', 'Divide el voltaje entre la resistencia.'], '9 ÷ 4 = 2.25 A'],
    ['La otra', 'En serie se suman.', 'serie-resistencia', 'Con **30 V** pasan **3 A** por dos resistencias en serie. Una es de **6 Ω**. Mueve la otra.', { V: 30, I: 3, R1: 6, max: 12 }, '$30 \\div 3 = 10$ y $10 - 6 = 4$ Ω.', ['Halla la resistencia de todo el camino.', 'Quítale la que ya conoces.'], '10 − 6 = 4 Ω']],
    'Pasan 2.25 A y la otra resistencia es de 4 Ω.', 'Ohm para todo el camino y después resta.');
  const CLIPS = D('clips', 'El clavo y los clips', [
    'Un grupo enrolló alambre en un clavo de hierro y lo conectó a una pila. Con 20 vueltas atrajo 4 clips; con 40, 8 clips; con 60, 12 clips. Sin pila no atrajo ninguno.',
    'Después usó una barra de madera con 60 vueltas: atrajo uno.']);
  reto('elec-2', ['icf-cn-electrico-2'], 3, 'El clavo y los clips', 'Comparar con y sin', 'Un grupo prueba electroimanes. Interpreta sus datos.', [
    ['Deducir', 'Usa los datos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CLIPS, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Con 40 vueltas atrajo 8 clips.', 0, 'Búscala en el párrafo 1.'], ['Con 50 vueltas atraería unos 10 clips.', 1, 'Mira cuántos clips hay por vuelta.'], ['El hierro ayuda a atraer más.', 1, 'Compara 60 vueltas con hierro y con madera.'], ['Los clips eran rojos.', 2, '¿Se dice el color?']), luz: [[1, 'con 40, 8 clips'], [2, 'atrajo uno']], bien: 'Proporción y comparación.' }, 'Los 8 están escritos; los 10 y el hierro se deducen; el color no.', ['Busca cuántos clips corresponden a cada diez vueltas.', 'Compara los dos casos de 60 vueltas.'], '2 clips por cada 10 vueltas'],
    ['La fuerza', 'La distancia, al cuadrado.', 'fuerza-cambia', 'Dos cargas se repelen con fuerza **72**. ¿Cuánto vale en cada cambio?', { et: ['al doble de distancia', 'al triple de distancia', 'una carga a la mitad'], metas: ['18', '8', '36'], fichas: ['18', '8', '36', '24', '144'], mira: ['Al doble, cuatro veces menor.', 'Al triple, nueve veces menor.', 'La fuerza baja igual que la carga.'], trampas: { '1:24': 'La distancia va al cuadrado.' }, ok: 'Cuadrado para la distancia.' }, '$72 \\div 4 = 18$; $72 \\div 9 = 8$; y $72 \\div 2 = 36$.', ['La distancia cuenta al cuadrado.', 'La carga cuenta sin cuadrado.'], '18, 8 y 36']],
    'Más vueltas y hierro atraen más; la distancia va al cuadrado.', 'Compara casos en los que cambia una sola cosa.');
}
;
//#archivo js/gimnasio-icf-12.js
// Gimnasio del Preicfes, últimos mundos (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-11.js.
{
  const { F } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('disp-1', ['icf-ma-dispersion-1', 'icf-ma-dispersion-2'], 2, 'Los tiros al aro', 'Equilibrio y caja', 'Los tiros que encestó un equipo en cada partido.', [
    ['El equilibrio', 'Reparte por igual.', 'desvios-cero', 'Mueve el apoyo hasta que las **desviaciones** sumen **0**.', { d: [2, 2, 5, 9, 12], hi: 12 }, '$30 \\div 5 = 6$.', ['Las desviaciones se equilibran en el promedio.', 'Suma los datos y repártelos entre cinco.'], '30 ÷ 5 = 6'],
    ['La caja', 'El medio y el medio de cada mitad.', 'arma-caja', 'Los datos son 2, 4, 5, 7, 7, 8 y 11. Pon los tres **cortes** de su caja.', { d: [2, 4, 5, 7, 7, 8, 11], hi: 12 }, 'Mediana 7; 2, 4, 5 dan 4 y 7, 8, 11 dan 8.', ['Busca primero el dato del medio.', 'Después, el medio de los tres de cada lado.'], '4, 7 y 8']],
    'El promedio es 6 y la caja va de 4 a 8, con mediana 7.', 'Reparte para el promedio; busca el medio para la caja.');
  reto('disp-2', ['icf-ma-dispersion-3'], 3, 'El café y las horas', 'Tendencia y causa', 'Una nube de puntos y una afirmación apresurada.', [
    ['Predecir', 'Alarga la línea.', 'predice-nube', 'La nube muestra tazas de café y clientes. Mueve la **predicción** para **7**.', { pts: [[1, 14], [2, 17], [2, 19], [3, 21], [4, 25], [4, 27], [5, 29], [6, 35]], m: 4, b: 10, x: 7, tol: 2, hx: 9, hy: 60 }, 'La tendencia sube 4 por cada una: cerca de 38.', ['Imagina la línea que pasa por la mitad de la nube.', 'Alárgala hasta la línea punteada.'], 'cerca de 38'],
    ['La causa', 'Ir juntas no es causar.', 'causa-o-no', 'En una ciudad, quienes toman **más café** **duermen menos**. Toca **todo** lo que se puede decir **solo con eso**.', { casos: [{ t: 'hay una correlación negativa', si: true }, { t: 'el café quita el sueño a todos', no: 'Eso afirma una causa, y para todos.' }, { t: 'podría ser que quien duerme poco tome más café', si: true }, { t: 'sin café todos dormirían ocho horas', no: 'Nada en el dato permite asegurarlo.' }], falta: 'Falta otra que no afirma una causa.', ok: 'Se observa, no se asegura la causa.' }, 'Van al contrario, pero no se sabe cuál causa cuál.', ['Separa lo que se observa de lo que se supone.', 'La causa podría ir en el otro sentido.'], 'correlación, no causa']],
    'Para 7 se predicen unos 38; la correlación es negativa y no prueba causa.', 'Alarga la tendencia y no saltes a la causa.');

  reto('nume-1', ['icf-ma-numeros-1', 'icf-ma-numeros-2'], 2, 'La célula y el coro', 'Coma y cruce', 'Un número diminuto y dos grupos que se cruzan.', [
    ['La célula', 'Cuenta los lugares.', 'coma-cientifica', 'Mueve el exponente para que sea el **mismo número**.', { m: '7.5', et: '0.0000075', e: -6, lo: -9, hi: 9 }, 'La coma corre 6 lugares: $7.5 \\cdot 10^{-6}$.', ['Cuenta cuántos lugares corre la coma.', 'El número es menor que 1: mira el signo.'], '10⁻⁶'],
    ['El coro', 'Quita los de afuera.', 'cruce-grupos', 'De **36** jóvenes, **21** cantan, **17** tocan y **4** nada. Mueve cuántos hacen **las dos**.', { a: 21, b: 17, total: 36, fuera: 4, A: 'cantan', B: 'tocan' }, 'Hacen algo 32; $21 + 17 - 32 = 6$.', ['Quita del total a los que no hacen nada.', 'Lo que sobra al sumar los dos grupos es el cruce.'], '38 − 32 = 6']],
    'El exponente es −6 y seis hacen las dos cosas.', 'Cuenta lugares y quita lo repetido.');
  reto('nume-2', ['icf-ma-numeros-3'], 3, 'La escalera y la hormiga', 'Saltos y mitades', 'Una escalera que crece igual y una hormiga que se acerca a su meta.', [
    ['La escalera', 'Un salto menos que el lugar.', 'que-termino', 'La sucesión **7, 12, 17…** sigue igual. Mueve el lugar del **72**.', { a: 7, d: 5, meta: 72, max: 20 }, 'Del 7 al 72 hay 65: 13 saltos. Lugar 14.', ['Halla cuántos saltos hay del primero al último.', 'El lugar es uno más que los saltos.'], '65 ÷ 5 + 1 = 14'],
    ['La hormiga', 'Duplica el denominador.', 'mitades-faltan', 'En cada paso recorre la **mitad** de lo que falta. Mueve cuántos pasos hacen que falte **1/256**.', { tope: 256, max: 12 }, '$2^8 = 256$: 8 pasos.', ['Mira cuánto falta tras uno, dos y tres pasos.', 'Busca qué potencia de 2 es 256.'], '2⁸ = 256']],
    'El 72 está en el lugar 14 y a la hormiga le toman 8 pasos.', 'Saltos para la aritmética, potencias para las mitades.');

  reto('cts-1', ['icf-cn-cts-1', 'icf-cn-cts-2'], 2, 'El barrio saludable', 'Proporción y compensación', 'Un barrio compara riesgos y calcula su huella.', [
    ['El riesgo', 'Divide entre el grupo.', 'riesgo-grupos', 'Con toldillo enfermaron **9** de **300**; sin toldillo, **24** de **200**. Completa.', { et: ['riesgo con toldillo', 'riesgo sin toldillo', 'veces mayor sin toldillo'], metas: ['3 %', '12 %', '4'], fichas: ['3 %', '12 %', '4', '9 %', '24 %'], mira: ['Divide 9 entre 300.', 'Divide 24 entre 200.', 'Compara los dos porcentajes.'], trampas: { '0:9 %': 'Son 9 de 300, no de 100.', '1:24 %': 'Son 24 de 200, no de 100.' }, ok: 'Proporción, no cantidad.' }, '$9 \\div 300 = 3\\%$; $24 \\div 200 = 12\\%$; cuatro veces.', ['Cada caso se divide entre su propio grupo.', 'Después compara los dos porcentajes dividiendo.'], '3 %, 12 % y 4 veces'],
    ['La huella', 'Divide lo que se suelta.', 'compensa-justo', 'El barrio suelta **900 kg** de CO₂ al mes. Cada panel evita **25 kg**. Mueve cuántos **paneles** lo compensan.', { gasta: 900, cada: 25, max: 50, et: 'paneles', u: 'kg' }, '$900 \\div 25 = 36$ paneles.', ['Halla cuántas veces cabe lo que evita cada uno.', 'Divide los kilogramos entre los que evita un panel.'], '900 ÷ 25 = 36']],
    'Sin toldillo el riesgo es cuatro veces mayor; hacen falta 36 paneles.', 'Divide entre el grupo y entre lo que evita cada uno.');
  const TE = D('te-memoria', 'El té de la memoria', [
    'Una empresa dice que su té mejora la memoria. Lo probó con 20 empleados, que sabían lo que tomaban. A los quince días recordaron más palabras que el primer día.',
    'No hubo otro grupo. La prueba del día quince usó la misma lista de palabras del primer día.']);
  reto('cts-2', ['icf-cn-cts-3'], 3, 'El té de la memoria', 'Buscar lo que falta', 'Una empresa anuncia un resultado. Revisa la prueba.', [
    ['Deducir', 'Mira qué no se controló.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: TE, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Participaron 20 empleados.', 0, 'Búscala en el párrafo 1.'], ['Pudieron mejorar porque ya conocían la lista.', 1, '¿Qué lista se usó el día quince?'], ['No fue un estudio ciego.', 1, '¿Sabían lo que tomaban?'], ['El té era verde.', 2, '¿Se dice de qué era?']), luz: [[1, '20 empleados'], [2, 'la misma lista'], [1, 'sabían lo que tomaban']], bien: 'Repetir la lista y saber.' }, 'Los 20 están escritos; la lista repetida y el no ser ciego se deducen; el color no.', ['Fíjate en qué cambió además del té.', 'Pregunta quién sabía y con qué se comparó.'], 'lista repetida; no ciego'],
    ['Arreglar', 'Que solo cambie el té.', 'buena-evidencia', 'Toca **todo** lo que haría **mejor** la prueba.', { casos: [{ t: 'otro grupo con un té falso', si: true }, { t: 'usar una lista nueva', si: true }, { t: 'que los pruebe el dueño de la empresa', no: 'Tiene interés en el resultado.' }, { t: 'más personas, repartidas al azar', si: true }, { t: 'contar solo a los que mejoraron', no: 'Así se esconde a los demás.' }], falta: 'Falta otra que deja el té como único cambio.', ok: 'Control, lista nueva y azar.' }, 'Control, lista nueva y azar dejan que solo cambie el té.', ['Busca lo que quita otras explicaciones.', 'Cuida quién mide y a quién se cuenta.'], 'control, lista, azar']],
    'La lista repetida y la falta de control dejan otras explicaciones.', 'Busca qué más cambió y cómo quitarlo.');
}
;
//#archivo js/inicio.js
// Inicio, Mis cursos y gimnasio flotante (spec 2026-11-19-inicio-mis-cursos, pruebas tests/inicio-mis-cursos.test.js).
// Inicio muestra los cursos en grande y lo que se estudia ahora; Mis cursos, los cursos en que está inscrito el estudiante;
// la vista de un curso (pestaña interna 'learn', en app.js) empieza con una portada limpia, y en todo el curso (portada,
// mapa y mundos) flota el botón del gimnasio con los retos del nivel que lleva el estudiante.

if (typeof ICON !== 'undefined') ICON.book = svg('<path d="M5 5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2z"/><path d="M5 19a2 2 0 0 0 2 2h12v-4"/><path d="M9 7.5h6"/>');

// El mundo que corresponde al nivel que lleva el estudiante en el curso c (y en el componente block, si hay uno abierto):
// el mundo abierto (s.open), o el de la primera lección sin hacer, o el último si ya terminó. Con componentes y ninguno
// abierto, el componente que se estudió por última vez (s.last, id de lección), como «Sigue aquí». s = { done, open, last }.
function courseLevelUi(c, block, s) {
  if (s.open != null && c.units[s.open]) return s.open;
  if (!block && c.blocks) {
    const lastU = c.units.find(u => u.lessons.some(l => l.id === s.last));
    block = c.blocks.find(b => b.id === lastU?.block) || c.blocks[0];
  }
  const idx = c.units.map((u, i) => (!block || u.block === block.id ? i : -1)).filter(i => i >= 0);
  return idx.find(i => c.units[i].lessons.some(l => !(s.done || {})[l.id])) ?? idx[idx.length - 1] ?? 0;
}

// Inscrito: está en S.misCursos o ya tiene alguna lección hecha. En el orden del catálogo, sin cursos que no existen.
function enrolledIds(s, courses) {
  const mine = new Set(s.misCursos || []), done = s.done || {};
  return courses.filter(c => mine.has(c.id) || c.units.some(u => u.lessons.some(l => done[l.id]))).map(c => c.id);
}

// Los retos del gimnasio para el mundo ui del curso c: los de este mundo (abiertos o no) y, para repasar, los abiertos de
// mundos anteriores del mismo componente. pending = abiertos de este mundo que aún no se han superado.
function gymWorld(c, ui, done, unlockAll, mine = {}) {
  const u = c.units[ui], fab = !!u;   // en todos los cursos (spec 2026-11-19-inicio-mis-cursos)
  const groups = typeof gymRetos === 'function' ? gymRetos(c) : [];
  const here = (groups.find(g => g.ui === ui)?.retos || []).map(r => ({ r, open: gymOpen(r, done, unlockAll) }));
  const review = groups.filter(g => g.ui < ui && c.units[g.ui].block === u?.block).flatMap(g => g.retos).filter(r => gymOpen(r, done, unlockAll));
  // Más adelante: los primeros retos de los mundos que siguen (del mismo componente), para que la hoja nunca quede vacía.
  const ahead = groups.filter(g => g.ui > ui && c.units[g.ui].block === u?.block).flatMap(g => g.retos).slice(0, 3)
    .map(r => ({ r, open: gymOpen(r, done, unlockAll) }));
  return { fab, here, review, ahead, pending: here.filter(x => x.open && !mine[x.r.id]).length };
}

const courseExercises = c => c.units.reduce((t, u) => t + u.lessons.reduce((s, l) => s + l.ex.length, 0), 0);
const cursosInscritos = () => { const ids = enrolledIds(S, cursosVisibles()); return cursosVisibles().filter(c => ids.includes(c.id)); };
// Mis cursos: los comprados. En desarrollo y para el administrador (todo abierto), los inscritos.
const myCourses = () => (SIN_CANDADOS || cuentaEsAdmin() ? cursosInscritos() : cursosVisibles().filter(c => cursoComprado(c)));

// Inscribe un curso (sin repetir). renderLearn lo llama: el curso que se ve queda siempre en Mis cursos.
function enroll(id) {
  if ((S.misCursos || []).includes(id)) return;
  S.misCursos = [...(S.misCursos || []), id]; save();
}
// Abre un curso: lo inscribe y muestra su portada (mapa de mundos o, con componentes, la elección de componente).
function openCourse(id) {
  S.course = id; enroll(id);
  openWorld = null; openBlock = null; save();
  go('learn'); view.scrollTop = 0;
}

// ---- Inicio ----
// «Sigue aprendiendo» va dentro de cada curso, no en el Inicio ni en Mis cursos (pedido del 2026-11-19): la lección que toca
// en ese curso (o en su componente), el mundo, el avance y «Continuar». ls: las lecciones que cuenta el avance.
function continueCardHTML(c, cur, ls) {
  const ui = c.units.findIndex(u => u.lessons.includes(cur)), u = c.units[ui], w = WORLDS[u.world] || { name: u.title };
  const blockName = c.blocks?.find(b => b.id === u.block)?.name, d = ls.filter(isDone).length;
  const i = ls.indexOf(cur), nx = ls[i + 1], next = nx && c.units.find(x => x.lessons.includes(nx))?.block === u.block ? nx : null;
  return `<section class="home-continue" aria-label="Sigue aprendiendo">
    <div class="hk-top">${courseArt(c, 'lg')}<div><p class="hk-eyebrow">${d ? 'Sigue aprendiendo' : 'Empieza aquí'}${blockName ? ` · ${esc(blockName)}` : ''}</p>
      <b class="hk-title">${esc(cur.title)}</b><span class="hk-sub">Mundo ${worldNo(c, ui)} · ${esc(w.name)}</span></div></div>
    <div class="hk-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></div>
    ${next ? `<p class="hk-next">Después: ${esc(next.title)}</p>` : ''}
    <button class="btn" data-continue>${d ? 'Continuar' : 'Empezar'} · +10 XP</button>
  </section>`;
}

// Saludo según la hora. Pura.
const hmSaludo = h => (h < 5 ? 'Buenas noches' : h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches');
// Filtros del Inicio: para qué sirve cada curso. Pura.
const HM_FILTROS = [['todos', 'Todos'], ['entrar', 'Entrar a la U', ['preuda', 'preicfes']], ['carrera', 'Para la carrera', ['algebra', 'trig', 'calc', 'geo', 'int', 'lin', 'fis']]];
const hmPasa = (c, f) => { const x = HM_FILTROS.find(y => y[0] === f); return !x || !x[2] || x[2].includes(c.id); };
let hmFiltro = 'todos';
// Aro de avance alrededor de una figura.
const aroHTML = (p, dentro, cls = '') => `<span class="aro ${cls}" style="--p:${Math.max(0, Math.min(1, p)).toFixed(3)}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" pathLength="1"/><circle class="v" cx="50" cy="50" r="45" pathLength="1"/></svg><span class="aro-in">${dentro}</span></span>`;

function renderHome() {
  if (rolEquipo()) return renderHomeEquipo();   // js/equipo.js: docentes y gestores
  const mine = cursosInscritos(), now = new Date(), hoy = todayXP(), goalP = Math.min(1, hoy / S.goal), name = (S.name || '').trim().split(/\s+/)[0], racha = streakNow();
  const y = $('.hm', view) ? view.scrollTop : 0, sem = dkSemana(dkActive(now), now), b = activeTutorias(S.tutorias, +now)[0], nx = b ? null : nextFree(+now, []);
  const tarjeta = c => {
    const ls = lessonsOf(c), d = ls.filter(isDone).length, inscrito = mine.includes(c);
    return `<button class="hc-card" data-open="${c.id}" data-inclina style="--c:${c.color}" aria-label="${esc(c.name)}${inscrito ? `, ${d} de ${ls.length} lecciones` : ''}">
        <span class="hc-esc"><span class="hc-laminas" aria-hidden="true">${c.units.slice(0, 8).map(u => `<span class="world-art">${(WORLDS[u.world] || {}).art || ''}</span>`).join('')}</span><span class="hc-art">${courseArt(c, 'xl')}</span>${inscrito && d ? `<span class="hc-pct">${Math.round((d / ls.length) * 100)} %</span>` : ''}</span>
        <span class="hc-body"><b>${esc(c.name)}</b><span class="hc-tag">${esc(c.tagline || '')}</span>
          <span class="hc-stats">${ICON.book}${ls.length} lecciones<span aria-hidden="true">·</span>${courseExercises(c)} ejercicios</span>
          ${inscrito ? `<span class="hc-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></span>` : ''}
          <span class="hc-go">${inscrito ? 'Entrar' : 'Empezar'} ${ICON.right}</span></span>
      </button>`;
  };
  view.innerHTML = `<div class="home"><div class="hm">
    <section class="hm-hero"><div class="hm-hola"><header class="home-head"><p>${hmSaludo(now.getHours())}${name ? `, ${esc(name)}` : ''}</p><h1>¿Qué aprendemos hoy?</h1></header>
        <p class="hm-meta">${goalP >= 1 ? '<b>¡Meta cumplida!</b> Todo lo que sigue es ganancia.' : hoy ? `Te faltan <b>${S.goal - hoy} XP</b> para tu meta de hoy.` : `Tu meta de hoy: <b>${S.goal} XP</b>, más o menos ${Math.ceil(S.goal / 10)} lecciones.`}</p>
        <ol class="hm-sem" aria-label="Tu semana">${sem.map(x => `<li class="${x.lit ? 'lit' : ''}${x.today ? ' today' : ''}"${x.today ? ' aria-current="date"' : ''}><small>${x.l}</small><span>${x.lit ? ICON.flame : ''}</span><span class="hm-sr">${x.lit ? 'con actividad' : 'sin actividad'}</span></li>`).join('')}</ol>
        <button class="hm-racha" type="button" data-dk="streak">${ICON.flame}<span>${racha ? `<b>${racha} ${racha === 1 ? 'día' : 'días'}</b> de racha` : 'Empieza tu racha hoy'}</span>${ICON.right}</button></div>
      <button class="hm-aro" type="button" data-dk="streak" data-inclina aria-label="Meta de hoy: ${hoy} de ${S.goal} XP. Ver tu actividad">${aroHTML(goalP, goalP >= 1 ? mascotSVG('cheer', 'm-hello') : mascotSVG('think', 'm-hello'), goalP >= 1 ? 'lleno' : '')}<span class="hm-xp"><b>${hoy}</b> / ${S.goal} XP</span></button></section>
    ${installEvt && !S.hideInstall ? `<section class="install-banner">
      <img src="icons/zuka-claro-192.png" alt="" width="44" height="44">
      <div><b>Instala Zuka</b><p>Ábrela como app, incluso sin conexión.</p></div>
      <button class="btn brand sm" data-install>Instalar</button>
      <button class="icon-btn" data-hide-install aria-label="Ocultar">${ICON.x}</button>
    </section>` : ''}
    ${simulacrosHTML()}${metasHTML()}
    <section class="hm-cursos"><div class="hm-fila"><h2 class="home-h2">Cursos</h2><div class="hm-filtros" role="group" aria-label="Filtrar cursos">${HM_FILTROS.filter(f => cursosVisibles().some(c => hmPasa(c, f[0]))).map(f => `<button type="button" data-hm="${f[0]}" aria-pressed="${f[0] === hmFiltro}">${f[1]}</button>`).join('')}</div></div>
      <div class="home-courses"></div></section>
    <section class="hm-ase"><span class="hm-cal" aria-hidden="true">${(() => { const d = b ? tuDate(b.date) : nx ? tuDate(nx.date) : now; return `<small>${TU_MON[d.getMonth()]}</small><b>${d.getDate()}</b>`; })()}</span><div><h2>${b ? 'Tu próxima asesoría' : '¿Te enredas con un tema?'}</h2>
        <p>${b ? `<b>${esc(dayLabel(b.date, +now))}, ${hourLabel(b.time)}</b> · ${esc(tuCourse(b.course)?.name || 'Asesoría')}` : nx ? `Hay cupo con un profe: <b>${esc(dayLabel(nx.date, +now))}, ${hourLabel(nx.time)}</b>` : 'No quedan cupos esta semana.'}</p>
        <button class="btn ghost" type="button" data-dk="tutorias">${b ? 'Ver mi asesoría' : 'Separar asesoría'}</button></div></section>
  </div></div>`;
  metasBind(view); simulacrosBind(view);
  const pintaCursos = () => {
    if (!cursosVisibles().some(c => hmPasa(c, hmFiltro))) hmFiltro = 'todos';
    $('.home-courses', view).innerHTML = cursosVisibles().filter(c => hmPasa(c, hmFiltro)).map(tarjeta).join('');
    view.querySelectorAll('[data-hm]').forEach(k => k.setAttribute('aria-pressed', k.dataset.hm === hmFiltro));
    view.querySelectorAll('[data-open]').forEach(k => k.onclick = () => openCourse(k.dataset.open));
    inclina($('.home-courses', view));
  };
  view.querySelectorAll('[data-hm]').forEach(k => k.onclick = () => { hmFiltro = k.dataset.hm; pintaCursos(); });
  pintaCursos(); dkBind(view); inclina($('.hm-hero', view));
  $('[data-install]', view)?.addEventListener('click', promptInstall);
  $('[data-hide-install]', view)?.addEventListener('click', () => { S.hideInstall = true; save(); renderHome(); });
  view.scrollTop = y;
}
// Lo que se inclina hacia el puntero (solo ratón; nada con «reducir movimiento»).
function inclina(raiz) {
  if (!raiz || !matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  raiz.querySelectorAll('[data-inclina]').forEach(e => {
    e.onpointermove = ev => { const r = e.getBoundingClientRect(); e.style.setProperty('--ry', `${((ev.clientX - r.left) / r.width - .5) * 12}deg`); e.style.setProperty('--rx', `${(.5 - (ev.clientY - r.top) / r.height) * 10}deg`); };
    e.onpointerleave = () => { e.style.setProperty('--rx', '0deg'); e.style.setProperty('--ry', '0deg'); };
  });
}

// ---- Mis cursos (spec 2026-11-25-inicio-y-mis-cursos) ----
// Curso, componente y mundo que se miran: se recuerdan al volver.
const mcVe = { c: null, b: {}, u: {}, va: '' };   // va: por dónde iba; si avanzó o cambió de curso, se vuelve a lo que toca
const MC_PASO = 132;   // distancia entre mundos en el sendero
const mcY = i => 92 + 34 * Math.sin(i * 1.15);   // altura del mundo i (admite decimales, para el trazo)
// Trazo del sendero de n mundos. Pura.
const mcTrazo = n => Array.from({ length: (n - 1) * 10 + 1 }, (_, k) => `${k ? 'L' : 'M'}${(70 + k / 10 * MC_PASO).toFixed(1)} ${mcY(k / 10).toFixed(1)}`).join('');
// Hasta dónde va encendido: mundos completos seguidos, más la parte del que va a medias. `av`: avance 0–1 de cada mundo. Pura.
function mcHasta(av) {
  let i = 0; while (i < av.length && av[i] >= 1) i++;
  return Math.min(av.length - 1, i >= av.length ? av.length - 1 : i + av[i] * .999);
}
function renderMyCourses() {
  const mine = myCourses(), y = $('.mc', view) ? view.scrollTop : 0;
  const va = `${S.course}|${S.lastLesson}|${Object.keys(S.done).length}`;
  if (va !== mcVe.va) Object.assign(mcVe, { c: null, b: {}, u: {}, va });
  if (!mine.some(c => c.id === mcVe.c)) mcVe.c = (mine.find(c => c.id === S.course) || mine[0])?.id || null;
  view.innerHTML = `<div class="mycourses"><div class="mc">
    <header class="home-head mc-head"><div><h1>Mis cursos</h1><p>${mine.length ? 'Elige un curso y recorre sus mundos.' : cuentaDeColegio() ? 'Tu institución aún no te asigna cursos.' : 'Aún no has comprado ningún curso.'}</p></div><button class="btn ${mine.length ? 'ghost' : 'brand'} mc-more" data-home>${mine.length ? 'Comprar más cursos' : 'Ver la tienda'}</button></header>
    ${mine.length ? `<div class="mc-list${mine.length > 1 ? '' : ' solo'}" role="group" aria-label="Tus cursos">${mine.map(c => {
      const ls = lessonsOf(c), d = ls.filter(isDone).length;
      return `<button class="mc-row" type="button" data-ve="${c.id}" style="--c:${c.color}">${aroHTML(d / ls.length, courseArt(c, 'lg'))}<span class="mc-body"><b>${esc(c.name)}</b><small>${d} de ${ls.length}</small></span></button>`;
    }).join('')}</div><section class="mc-esc" aria-live="off"></section>`
    : `<div class="m-empty">${mascotSVG('think')}<p>${cuentaDeColegio() ? 'Cuando tu institución te asigne un curso, aparecerá aquí con todos sus mundos.' : cursosConAcceso().length ? 'Tu prueba está en el Inicio. Cuando compres un curso, aparecerá aquí con todos sus mundos.' : 'Cuando compres un curso, aparecerá aquí con todos sus mundos.'}</p></div>`}
  </div></div>`;
  $('[data-home]', view).onclick = () => openTienda('cursos');
  view.querySelectorAll('[data-ve]').forEach(b => b.onclick = () => { mcVe.c = b.dataset.ve; mcPinta(mine); });
  if (mine.length) mcPinta(mine, true);
  view.scrollTop = y;
}
function mcPinta(mine, primera = false) {
  const c = mine.find(x => x.id === mcVe.c), esc0 = $('.mc-esc', view), cur = currentLesson(c), ls = lessonsOf(c), d = ls.filter(isDone).length;
  view.querySelectorAll('[data-ve]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ve === c.id));
  if (primera) $(`[data-ve="${c.id}"]`, view)?.scrollIntoView({ block: 'nearest', inline: 'center' });
  const acc = accesoCurso(Cuenta.accesos, c.id), al = cursoComprado(c, true), donde = cur && c.units.findIndex(u => u.lessons.includes(cur));
  const retos = gymRetos(c).flatMap(g => g.retos), est = Object.entries(S.gym || {}).reduce((t, [id, v]) => t + (retos.some(r => r.id === id) || id.startsWith(`cal-${c.id}-`) ? v.best || 0 : 0), 0);
  const mundos = c.units.filter(u => u.lessons.every(isDone)).length;
  if (c.blocks && !c.blocks.some(b => b.id === mcVe.b[c.id])) mcVe.b[c.id] = (cur && blockOf(c, cur)) || c.blocks[0].id;
  esc0.style.cssText = `--c:${c.color}`;
  esc0.innerHTML = `<div class="mc-cab"><span class="mc-arte" data-inclina>${aroHTML(d / ls.length, courseArt(c, 'xl'), 'gran')}</span>
      <div class="mc-info"><h2>${esc(c.name)}</h2><p>${cur ? `${d ? 'Vas en' : 'Comienza por'} <b>${esc((WORLDS[c.units[donde].world] || { name: c.units[donde].title }).name)}</b>: ${esc(cur.title)}` : '¡Curso completado! Puedes repasar cualquier mundo.'}</p>
        <p class="mc-cifras"><span><b>${Math.round(d / ls.length * 100)} %</b> del curso</span><span><b>${mundos}</b> de ${c.units.length} mundos</span>${est ? `<span><b><i>★</i> ${est}</b> en el gimnasio</span>` : ''}${acc.estado === 'pago' ? `<span class="${acc.dias <= 7 ? 'poco' : ''}"><b>${diasTexto(acc.dias)}</b> de acceso</span>` : ''}</p>
        <div class="mc-acts"><button class="btn" type="button" data-entra>Entrar al curso ${ICON.right}</button>${acc.estado === 'vencido' ? '<button class="btn ghost" type="button" data-renueva>Renovar</button>' : ''}<button class="mc-mini" type="button" data-gim>${ICON.gym || ICON.bolt}<span>Gimnasio</span></button>${al ? `<button class="mc-mini" type="button" data-tut>${ICON.calendar}<span>Asesoría</span></button>` : ''}</div></div></div>
    ${c.blocks ? `<div class="mc-comps" role="group" aria-label="Componentes">${dkTramos(c, isDone).map(t => `<button type="button" data-comp="${t.b.id}">${blockArt(c, t.b)}<span><b>${esc(t.name)}</b><small>${t.d} de ${t.n} lecciones</small></span></button>`).join('')}</div>` : ''}
    <div class="mc-ruta" tabindex="0" role="group" aria-label="Mundos. Desliza de lado para recorrerlos."></div><div class="mc-det" role="status"></div>`;
  $('[data-entra]', esc0).onclick = () => openCourse(c.id);
  const rn = $('[data-renueva]', esc0); if (rn) rn.onclick = () => openComprar(c.id);
  $('[data-gim]', esc0).onclick = () => { S.course = c.id; enroll(c.id); save(); mcVe.va = `${S.course}|${S.lastLesson}|${Object.keys(S.done).length}`; gymFocus = { course: c.id, ui: courseLevelUi(c, c.blocks?.find(b => b.id === mcVe.b[c.id]), { done: S.done, last: S.lastLesson }) }; go('gym'); view.scrollTop = 0; };
  const tt = $('[data-tut]', esc0); if (tt) tt.onclick = () => { tuElige(c); go('tutorias'); };
  esc0.querySelectorAll('[data-comp]').forEach(b => b.onclick = () => { mcVe.b[c.id] = b.dataset.comp; mcRuta(c, cur); });
  inclina(esc0); mcRuta(c, cur);
}
// El sendero: los mundos del curso (o del componente) en una ola que se recorre de lado; tocar uno lo muestra abajo.
function mcRuta(c, cur) {
  const esc0 = $('.mc-esc', view), ruta = $('.mc-ruta', esc0), bid = c.blocks ? mcVe.b[c.id] : null, clave = `${c.id}/${bid || ''}`;
  const idx = c.units.map((u, i) => (!bid || u.block === bid ? i : -1)).filter(i => i >= 0), aqui = bid ? currentLesson(c, bid) : cur, av = idx.map(i => c.units[i].lessons.filter(isDone).length / c.units[i].lessons.length);
  if (!idx.includes(mcVe.u[clave])) mcVe.u[clave] = idx.find(i => aqui && c.units[i].lessons.includes(aqui)) ?? idx[0];
  esc0.querySelectorAll('[data-comp]').forEach(b => b.setAttribute('aria-pressed', b.dataset.comp === bid));
  const W = 140 + (idx.length - 1) * MC_PASO, D = mcTrazo(idx.length), lejos = idx.length > 1 ? mcHasta(av) / (idx.length - 1) : 0;
  ruta.innerHTML = `<div class="mc-lienzo" style="width:${W}px"><svg width="${W}" height="184" aria-hidden="true"><path d="${D}"/><path class="v" d="${D}" pathLength="1" style="--h:${lejos.toFixed(4)}"/></svg>${idx.map((ui, k) => {
    const u = c.units[ui], { w, wDone, all, closed } = worldInfo(c, u), here = !!aqui && u.lessons.includes(aqui);
    return `<button type="button" class="mc-mundo${all ? ' todo' : ''}${closed ? ' cerrado' : ''}${here ? ' aqui' : ''}" data-mu="${ui}" style="left:${70 + k * MC_PASO}px;top:${mcY(k).toFixed(1)}px;--p:${av[k].toFixed(3)}" aria-label="Mundo ${worldNo(c, ui)}: ${esc(w.name)}, ${wDone} de ${u.lessons.length} lecciones${here ? ', aquí vas' : ''}${closed ? ', cerrado' : ''}"><span class="mm-art world-art">${w.art || ''}</span>${all ? `<span class="mm-b">${ICON.star}</span>` : closed ? `<span class="mm-b">${ICON.lock}</span>` : ''}${here ? '<span class="mm-aqui" aria-hidden="true">Aquí vas</span>' : ''}</button>`;
  }).join('')}</div>`;
  const pon = (ui, foco) => {
    mcVe.u[clave] = ui;
    const u = c.units[ui], { w, wDone, closed } = worldInfo(c, u);
    ruta.querySelectorAll('[data-mu]').forEach(b => { const on = +b.dataset.mu === ui; b.setAttribute('aria-pressed', on); b.classList.toggle('on', on); });
    $('.mc-det', esc0).innerHTML = `<span class="md-art world-art" aria-hidden="true">${w.art || ''}</span><div><p class="md-n">Mundo ${worldNo(c, ui)} · ${wDone} de ${u.lessons.length} lecciones</p><h3>${esc(w.name)}</h3><ul class="md-lecs">${u.lessons.map(l => `<li class="${isDone(l) ? 'ok' : l === aqui ? 'ya' : ''}">${isDone(l) ? ICON.check : '<i></i>'}<span>${esc(l.title)}</span></li>`).join('')}</ul>${closed ? '<p class="md-c">Se abre al avanzar por los mundos anteriores.</p>' : ''}<button class="btn ghost" type="button" data-ir>Ir a este mundo ${ICON.right}</button></div>`;
    $('[data-ir]', esc0).onclick = () => { S.course = c.id; enroll(c.id); openBlock = c.blocks ? { course: c.id, id: u.block } : null; openWorld = { course: c.id, i: ui }; save(); go('learn'); };
    const n = $(`[data-mu="${ui}"]`, ruta);
    ruta.scrollTo({ left: n.offsetLeft - ruta.clientWidth / 2, behavior: foco === 'salto' || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (foco === true) n.focus({ preventScroll: true });
  };
  let id = null, x0 = 0, s0 = 0, movio = false;   // con ratón también se arrastra
  ruta.onpointerdown = e => { movio = false; if (e.pointerType !== 'mouse' || e.button) return; id = e.pointerId; x0 = e.clientX; s0 = ruta.scrollLeft; };
  ruta.onpointermove = e => { if (e.pointerId !== id) return; if (!e.buttons) { id = null; ruta.classList.remove('mano'); return; } if (!movio && Math.abs(e.clientX - x0) > 6) { movio = true; ruta.setPointerCapture(id); ruta.classList.add('mano'); } if (movio) ruta.scrollLeft = s0 - (e.clientX - x0) / zk(); };
  ruta.onpointerup = ruta.onpointercancel = e => { if (e.pointerId === id) { id = null; ruta.classList.remove('mano'); } };
  ruta.onclick = e => { if (movio) { movio = false; return; } const b = e.target.closest('[data-mu]'); if (b) pon(+b.dataset.mu); };
  ruta.onkeydown = e => { const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = Math.max(0, Math.min(idx.length - 1, idx.indexOf(mcVe.u[clave]) + k)); pon(idx[i], true); };
  pon(mcVe.u[clave], 'salto');
}

// Portada limpia de un curso o de un componente: enlace a Mis cursos, dibujo grande, título, descripción y cifras.
function courseHeadHTML(c, block) {
  const ls = block ? lessonsOf(c).filter(l => c.units.find(u => u.lessons.includes(l))?.block === block.id) : lessonsOf(c);
  const units = block ? c.units.filter(u => u.block === block.id) : c.units;
  const ex = units.reduce((t, u) => t + u.lessons.reduce((s, l) => s + l.ex.length, 0), 0), d = ls.filter(isDone).length;
  return `${block ? '' : `<button class="ch-back" data-courses>${ICON.back}<span>Mis cursos</span></button>`}
    <header class="course-head">
      ${courseArt(c, 'xl')}
      ${block ? `<p class="ch-eyebrow">Componente ${c.blocks.indexOf(block) + 1} · ${esc(c.name)}</p>` : c.level ? `<p class="ch-eyebrow">${esc(c.level)}</p>` : ''}
      <h1>${esc(block ? block.name : c.name)}</h1>
      <p class="ch-sub">${esc(block ? block.desc : c.tagline || '')}</p>
      <p class="ch-stats"><span>${ICON.book}${ls.length} lecciones</span><span>${ICON.target}${ex} ejercicios</span></p>
      ${d ? `<div class="ch-prog"><span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span><small>${d}/${ls.length}</small></div>` : ''}
    </header>`;
}
function bindCourseHead() { $('[data-courses]', view)?.addEventListener('click', () => go('cursos')); }

// ---- gimnasio flotante (dentro de un mundo) ----
// Mancuerna en relieve sobre una base (pedido del 2026-11-19): discos con costado y cara, en los colores del curso
// (--g1..--g4, de ART_PAL; ver gymFabColors); la base toma los tonos del tema (--gb*, --gd*, en css/styles.css).
// Se dibuja con el eje horizontal y luego se inclina; la cara visible de los discos mira a la izquierda.
const GYM_3D = (() => {
  const plate = (x0, x1, face) => `<rect x="${Math.min(x0, x1)}" y="-13" width="${Math.abs(x1 - x0)}" height="26" fill="url(#gf-g)"/>
    <rect x="${Math.min(x0, x1)}" y="-13" width="${Math.abs(x1 - x0)}" height="26" fill="url(#gf-s)"/>
    <ellipse cx="${x1}" cy="0" rx="4.6" ry="13" fill="url(#gf-g)"/><ellipse cx="${x1}" cy="0" rx="4.6" ry="13" fill="url(#gf-s)"/>
    <ellipse cx="${x0}" cy="0" rx="4.6" ry="13" fill="url(#gf-g)"/><ellipse cx="${x0}" cy="0" rx="4.6" ry="13" fill="#fff" opacity=".38"/>
    ${face ? `<ellipse cx="${x0 - .3}" cy="0" rx="1.6" ry="3.8" style="fill:var(--g4)" opacity=".5"/>` : ''}`;
  return `<svg class="gf-art" viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <linearGradient id="gf-g" gradientUnits="userSpaceOnUse" x1="-20" y1="0" x2="20" y2="0">
      <stop offset="0" style="stop-color:var(--g1)"/><stop offset=".5" style="stop-color:var(--g2)"/><stop offset="1" style="stop-color:var(--g3)"/></linearGradient>
    <linearGradient id="gf-s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" style="stop-color:var(--g4)" stop-opacity=".35"/></linearGradient>
    <radialGradient id="gf-b" cx=".5" cy=".35" r=".7">
      <stop offset="0" style="stop-color:var(--gb1)"/><stop offset="1" style="stop-color:var(--gb2)"/></radialGradient>
    <radialGradient id="gf-d" cx=".5" cy=".3" r=".75">
      <stop offset="0" style="stop-color:var(--gd1)"/><stop offset="1" style="stop-color:var(--gd2)"/></radialGradient>
    <radialGradient id="gf-h" cx=".5" cy=".5" r=".5">
      <stop offset="0" style="stop-color:var(--g2)" stop-opacity=".55"/><stop offset=".6" style="stop-color:var(--g3)" stop-opacity=".2"/><stop offset="1" style="stop-color:var(--g3)" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="32" cy="52" rx="30" ry="11" fill="url(#gf-h)"/>
  <ellipse cx="32" cy="48" rx="25" ry="10.5" fill="url(#gf-b)"/>
  <ellipse cx="32" cy="47.2" rx="25" ry="10.5" fill="none" style="stroke:var(--grim)" stroke-width=".8"/>
  <ellipse cx="32" cy="47.5" rx="19" ry="7.4" fill="url(#gf-d)"/>
  <ellipse cx="33" cy="47" rx="12" ry="3.6" style="fill:var(--g4)" opacity=".3"/>
  <g class="gf-db"><g transform="translate(32 28) rotate(-36)">
    ${plate(10, 19, false)}
    <rect x="-10" y="-3.6" width="20" height="7.2" rx="1" fill="url(#gf-g)"/><rect x="-10" y="-3.6" width="20" height="7.2" rx="1" fill="url(#gf-s)"/>
    ${plate(-19, -10, true)}
  </g></g>
</svg>`;
})();

// Degradado de la pesa: tono claro → color del curso → su acento; --g4 es la sombra.
function gymFabColors(c) {
  const p = (typeof ART_PAL !== 'undefined' && ART_PAL[c.id]) || {};
  return `--c:${c.color};--g1:${p.soft || c.color};--g2:${p.blue || c.color};--g3:${p.sun || c.color};--g4:${p.deep || c.color}`;
}
function gymFabHTML(c, ui) {
  const g = gymWorld(c, ui, S.done, S.unlockAll, S.gym || {});
  if (!g.fab) return '';
  return `<button class="gym-fab" data-gym-fab data-ui="${ui}" style="${gymFabColors(c)}" aria-label="Gimnasio: retos guiados de tu nivel${g.pending ? `, ${g.pending} por hacer` : ''}">
    ${GYM_3D}${g.pending ? `<span class="gym-fab-n" aria-hidden="true">${g.pending}</span>` : ''}</button>`;
}
function bindGymFab(c) {
  const b = $('[data-gym-fab]', view);
  if (!b) return;
  b.closest('.learn')?.classList.add('has-fab');   // espacio abajo para el botón (sin depender de :has)
  // Las pesas abren la página del gimnasio en el mundo del nivel del estudiante (spec 2026-11-19-gimnasio-niveles).
  b.addEventListener('click', () => { gymFocus = { course: c.id, ui: +b.dataset.ui }; go('gym'); });
}

;
//#archivo js/acceso.js
// Acceso por código y por curso: lógica pura (sin red ni DOM), compartida por la app y el panel /admin.
// La validación que cuenta está en Supabase (privado.puede, acceso_video, entrar-codigo); esto solo decide qué se pinta.
// Spec: docs/superpowers/specs/2026-11-24-acceso-por-codigo.md

const SUPA_URL = 'https://bzzzufyjhzjqawwrduom.supabase.co';
const SUPA_KEY = 'sb_publishable_g9nE6w3Da54IrmHbeKkXQg_iWR8eiAC';   // llave pública: va en el navegador

const DIA_MS = 86400000;
const vigente = (hasta, now) => !hasta || new Date(hasta).getTime() > now;

// Cómo está el acceso a un curso: 'pago', 'prueba' (primer mundo), 'vencido' (pagó y venció: conserva el primer mundo),
// 'prueba_vencida' o 'ninguno'. `accesos`: filas { curso, tipo, desde, hasta }.
function accesoCurso(accesos, curso, now = Date.now()) {
  const a = (accesos || []).find(x => x.curso === curso);
  if (!a) return { estado: 'ninguno', dias: null };
  const ok = vigente(a.hasta, now), dias = a.hasta ? Math.max(0, Math.ceil((new Date(a.hasta).getTime() - now) / DIA_MS)) : null;
  return { estado: a.tipo === 'pago' ? (ok ? 'pago' : 'vencido') : ok ? 'prueba' : 'prueba_vencida', dias, desde: a.desde, hasta: a.hasta };
}
// Comprado: lo pagó, esté vigente o vencido (la prueba no cuenta). Con `alDia`, solo vigente.
const comprado = (accesos, curso, alDia = false, now = Date.now()) => { const e = accesoCurso(accesos, curso, now).estado; return e === 'pago' || (!alDia && e === 'vencido'); };
const tienePago = (accesos, now = Date.now()) => (accesos || []).some(a => a.tipo === 'pago' && vigente(a.hasta, now));

// Por qué no se puede abrir un recurso { curso, prueba, tipo }: null (sí se puede), 'sesion', 'bloqueado', 'ninguno',
// 'prueba' (hay que comprar), 'vencido', 'prueba_vencida' o 'tutorias' (sin horas en el saldo). Los clips, para todos.
function motivoBloqueo({ perfil, accesos, horas = 0 }, rec, now = Date.now()) {
  if (!rec || rec.tipo === 'clip') return null;
  if (!perfil) return 'sesion';
  if (perfil.rol === 'admin') return null;
  if (perfil.bloqueado) return 'bloqueado';
  if (rec.tipo === 'tutorias') return horas > 0 ? null : 'tutorias';
  const { estado } = accesoCurso(accesos, rec.curso, now);
  if (estado === 'pago' || (rec.prueba && (estado === 'prueba' || estado === 'vencido'))) return null;
  return estado;
}

// Textos de la hoja que sale al tocar algo con candado.
function textoBloqueo(motivo, curso = 'este curso') {
  return ({
    sesion: { title: 'Entra con tu código', text: 'Este contenido se abre con tu código de acceso. Si aún no tienes uno, pídelo por WhatsApp.' },
    bloqueado: { title: 'Tu acceso está en pausa', text: 'Escríbenos por WhatsApp para revisarlo. Tu avance sigue guardado.' },
    ninguno: { title: `${curso} no está en tu plan`, text: 'Puedes comprarlo y se activa en tu mismo código, junto a lo que ya tienes.' },
    prueba: { title: 'Aquí termina tu prueba', text: `Tu código de prueba abre el primer mundo de ${curso}. Compra el acceso y sigue donde vas: tu avance no se pierde.` },
    prueba_vencida: { title: 'Tu prueba terminó', text: `Compra el acceso a ${curso} para continuar. Tu avance sigue guardado.` },
    vencido: { title: 'Tu plan venció', text: `Renueva ${curso} para seguir. Conservas el primer mundo y todo tu avance.` },
    tutorias: { title: 'Necesitas horas de asesoría', text: 'Compra una hora o un paquete y separa tu asesoría virtual cuando quieras.' },
  })[motivo] || null;
}

// Todo lo que la app puede abrir, como filas de la tabla `lecciones` (tools/sync-lecciones.js). `prueba`: lo abre un código
// de prueba (el primer mundo del curso; con componentes, el primer mundo de cada uno).
function catalogo(courses, curios = [], summaryOf = () => null) {
  const rows = [], seen = new Set();
  const add = r => { if (r.id && !seen.has(r.id)) { seen.add(r.id); rows.push(r); } };
  const videos = l => [l.clip, ...(l.more || [])].map(c => c && c.bunny).filter(Boolean);
  courses.forEach(c => {
    let n = 0;
    c.units.forEach((u, ui) => {
      const prueba = ui === 0 || (!!c.blocks && !!u.block && c.units[ui - 1].block !== u.block);
      const base = { curso: c.id, prueba };
      u.lessons.forEach(l => add({ ...base, id: l.id, tipo: 'leccion', titulo: l.title, orden: n++, videos: videos(l) }));
      if (u.boss) add({ ...base, id: u.boss.id, tipo: 'jefe', titulo: u.boss.title, orden: n, videos: videos(u.boss) });
      if (u.exam) add({ ...base, id: u.exam.id, tipo: 'evaluacion', titulo: u.exam.title, orden: n, videos: [] });
      if (summaryOf(u)) add({ ...base, id: `resumen-${u.world}`, tipo: 'resumen', titulo: `Resumen: ${u.title}`, orden: n, videos: [] });
    });
  });
  curios.forEach((q, i) => add({ id: q.id, tipo: 'clip', curso: 'clips', prueba: true, titulo: q.title, orden: i, videos: videos(q) }));
  add({ id: 'tutorias', tipo: 'tutorias', curso: '', prueba: false, titulo: 'Tutorías', orden: 0, videos: [] });
  return rows;
}

// Códigos: 10 letras o números, en mayúsculas, sin I, O, 0 ni 1. Se aceptan con espacios o guiones.
const limpiaCodigo = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const codigoValido = s => /^[A-HJ-NP-Z2-9]{10}$/.test(s);
const muestraCodigo = c => `${c.slice(0, 5)}-${c.slice(5)}`;

const CANJE_ERRORES = {
  formato: 'El código tiene 10 letras y números. Revísalo: no lleva la letra I, la O, el 0 ni el 1.',
  no_existe: 'Ese código no existe. Revisa que esté escrito igual que te lo enviaron.',
  ya_usado: 'Ese código ya pertenece a otra cuenta.',
  es_tuyo: 'Ese código ya es el de tu cuenta.',
  bloqueado: 'Ese código está en pausa. Escríbenos por WhatsApp para revisarlo.',
  es_admin: 'Esa cuenta es administradora: entra con correo y contraseña.',
  dispositivos: 'Ese código ya está abierto en el máximo de dispositivos. Escríbenos por WhatsApp para liberar uno.',
  demasiados_intentos: 'Demasiados intentos fallidos. Espera 15 minutos y vuelve a intentarlo.',
  sin_sesion: 'Entra con tu código para continuar.',
  sin_perfil: 'Tu cuenta aún no está lista. Cierra sesión, vuelve a entrar e inténtalo de nuevo.',
  red: 'No hay conexión. Revisa tu internet e inténtalo de nuevo.',
};
const canjeError = e => CANJE_ERRORES[e] || 'No se pudo usar el código. Inténtalo de nuevo.';

// ---------- WhatsApp ----------
const waNumero = s => { const d = String(s || '').replace(/\D/g, ''); return d.length === 10 ? `57${d}` : d; };   // celular de Colombia sin indicativo
function waLink(numero, texto) {
  const n = waNumero(numero);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(texto)}` : '';
}
const mesesTexto = n => (n === 1 ? '1 mes' : `${n} meses`);
const WA = {
  prueba: () => 'Hola, quiero un código de prueba de Zuka.',
  info: que => `Hola, quiero información${que ? ` sobre ${que}` : ''} de Zuka.`,
  compra: ({ curso, meses, precio, codigo, nombre }) => `Hola, quiero comprar ${curso} por ${mesesTexto(meses)}${precio != null ? ` (${cop(precio)})` : ''}.${nombre ? ` Soy ${nombre}.` : ''}${codigo ? ` Mi código de Zuka es ${muestraCodigo(codigo)}.` : ''}`,
  ayuda: codigo => `Hola, necesito ayuda con mi acceso a Zuka.${codigo ? ` Mi código es ${muestraCodigo(codigo)}.` : ''}`,
  envio: ({ nombre, codigo, cursos, prueba, dias, url }) => `Hola${nombre ? ` ${nombre}` : ''}, este es tu código de acceso a Zuka: *${muestraCodigo(codigo)}*\n\nEntra en ${url} y escríbelo. ${prueba
    ? `Es de prueba: abre el primer mundo de ${cursos}${dias ? ` durante ${diasTexto(dias)}` : ''}.` : `Abre ${cursos} completo${dias ? ` por ${diasTexto(dias)}, desde que lo uses por primera vez` : ''}.`}\n\nGuárdalo: con el mismo código entras siempre y conservas tu avance.`,
  activado: ({ nombre, codigo, cursos, hasta, url }) => `Hola${nombre ? ` ${nombre}` : ''}, tu acceso a ${cursos} ya está activo${hasta ? ` hasta el ${fechaCorta(hasta)}` : ''}. Entra en ${url} con tu código de siempre${codigo ? `: *${muestraCodigo(codigo)}*` : ''}. Tu avance sigue igual.`,
  vence: ({ nombre, curso, hasta }) => `Hola${nombre ? ` ${nombre}` : ''}, tu acceso a ${curso} en Zuka vence el ${fechaCorta(hasta)}. Si renuevas antes, los días se suman y no pierdes tu avance.`,
};

// ---------- datos personales (obligatorios con un curso pagado) ----------
const DATOS = {
  genero: [['mujer', 'Mujer'], ['hombre', 'Hombre'], ['no_binario', 'No binario'], ['otro', 'Otro'], ['no_dice', 'Prefiero no decirlo']],
  edad: [['menos_14', 'Menos de 14'], ['14_15', '14 a 15'], ['16_17', '16 a 17'], ['18_20', '18 a 20'], ['21_25', '21 a 25'], ['26_35', '26 a 35'], ['mas_35', 'Más de 35']],
  ocupacion: [['colegio', 'Colegio, antes de 10.º'], ['decimo', 'Estoy en 10.º'], ['once', 'Estoy en 11.º'], ['egresado', 'Ya me gradué del colegio'], ['universidad', 'Estoy en la universidad'], ['trabajo', 'Trabajo'], ['otro', 'Otro']],
  presentacion: [['1_mes', 'En menos de un mes'], ['3_meses', 'En 1 a 3 meses'], ['6_meses', 'En 4 a 6 meses'], ['mas', 'En más de 6 meses'], ['no', 'No voy a presentar examen']],
  horas: [['1_2', '1 a 2 horas'], ['3_5', '3 a 5 horas'], ['6_10', '6 a 10 horas'], ['mas_10', 'Más de 10 horas']],
  medio: [['amigo', 'Me la recomendaron'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp'], ['colegio', 'Colegio o profesor'], ['google', 'Google'], ['otro', 'Otro']],
};
const datoTexto = (k, v) => ((DATOS[k] || []).find(x => x[0] === v) || [])[1] || v || '—';
const esMenor = edad => ['menos_14', '14_15', '16_17'].includes(edad);
const datosFaltan = (perfil, accesos, now = Date.now()) => !!perfil && !['admin', 'gestor'].includes(perfil.rol) && !perfil.datos_en && tienePago((accesos || []).filter(a => !a.institucion), now);
// El primer dato que falta o no es válido: { campo, texto }, o null.
function datosError(d) {
  const falta = k => !String(d[k] || '').trim();
  const pide = { nombre: 'Escribe tu nombre completo.', correo: 'Escribe tu correo.', telefono: 'Escribe tu celular.', ciudad: 'Escribe tu ciudad.',
    genero: 'Elige tu género o «Prefiero no decirlo».', edad: 'Elige tu rango de edad.', ocupacion: 'Cuéntanos qué haces ahora.' };
  const orden = ['nombre', 'correo', 'telefono', 'ciudad', 'genero', 'edad', 'ocupacion'];
  for (const campo of orden) {
    if (falta(campo)) return { campo, texto: pide[campo] };
    if (campo === 'correo' && !/^\S+@\S+\.\S+$/.test(d.correo.trim())) return { campo, texto: 'Ese correo no parece válido.' };
    const n = campo === 'telefono' ? d.telefono.replace(/\D/g, '').length : 10;
    if (n < 7 || n > 15) return { campo, texto: 'Revisa tu celular: debe tener al menos 7 números.' };
  }
  if (!d.acepta) return { campo: 'acepta', texto: esMenor(d.edad) ? 'Falta la autorización de tu acudiente.' : 'Falta tu autorización para guardar los datos.' };
  return null;
}

// Mensajes de Supabase Auth en español.
function authError(err) {
  const m = String((err && (err.code || err.message)) || '').toLowerCase();
  if (/invalid login|invalid_credentials/.test(m)) return 'Correo o contraseña incorrectos.';
  if (/not confirmed|email_not_confirmed/.test(m)) return 'Confirma tu correo: te enviamos un enlace al registrarte.';
  if (/already registered|user_already_exists/.test(m)) return 'Ya hay una cuenta con ese correo. Inicia sesión.';
  if (/weak_password|at least|should be/.test(m)) return 'La contraseña es muy corta o débil: usa 8 caracteres o más.';
  if (/rate limit|too many|over_/.test(m)) return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  if (/valid email|invalid.*email|email_address_invalid/.test(m)) return 'Ese correo no parece válido.';
  if (/fetch|network/.test(m)) return 'No hay conexión. Revisa tu internet e inténtalo de nuevo.';
  return 'No se pudo completar. Inténtalo de nuevo.';
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function fechaCorta(iso) {
  const d = new Date(iso);
  return iso && !Number.isNaN(d.getTime()) ? `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}` : '—';
}
const cop = n => `$ ${String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
const diasTexto = n => (n === 1 ? '1 día' : `${n} días`);
;
//#archivo js/estado.js
// Avance completo en la nube (tabla `estado_app`, spec 2026-11-24-acceso-por-codigo): XP, racha, evaluaciones, gimnasio,
// guardados… para que el mismo código muestre lo mismo en cualquier dispositivo. Las lecciones van aparte (`progreso`).
// Se junta con lo que haya en la nube: ningún dispositivo borra lo que hizo otro.

const ESTADO_MAPAS = ['saved', 'likes', 'watched', 'guides'];
const ESTADO_CAMPOS = ['reinicio', 'name', 'xp', 'correct', 'answered', 'streak', 'maxStreak', 'lastDay', 'goal', 'course', 'lastLesson', 'misCursos', 'libros',
  'today', 'tourDone', 'carne', 'days', 'exams', 'gym', ...ESTADO_MAPAS];

const estadoToma = s => Object.fromEntries(ESTADO_CAMPOS.filter(k => s[k] !== undefined && s[k] !== null).map(k => [k, s[k]]));

const estadoDia = d => Math.round(Date.parse(`${d}T00:00:00Z`) / 86400000);
// `local` manda en las preferencias; en lo ganado, lo mejor de los dos. Si uno reinició su progreso después, manda ese.
// Pura.
function estadoMezcla(local, nube) {
  // Solo los campos de hoy: lo que guardó una versión vieja (p. ej. `tutorias`, que ya vive en la base) no vuelve.
  const solo = x => Object.fromEntries(ESTADO_CAMPOS.filter(k => x && x[k] !== undefined).map(k => [k, x[k]]));
  const a = solo(local), b = solo(nube);
  if ((a.reinicio || 0) !== (b.reinicio || 0) && nube && local) return (a.reinicio || 0) > (b.reinicio || 0) ? { ...a } : b;
  const r = { ...b, ...a };
  const max = k => { const v = Math.max(Number(a[k]) || 0, Number(b[k]) || 0); if (a[k] !== undefined || b[k] !== undefined) r[k] = v; };
  ['xp', 'maxStreak'].forEach(max);
  const mas = (Number(b.answered) || 0) > (Number(a.answered) || 0) ? b : a;   // aciertos y respuestas van juntos
  if (mas.answered !== undefined) { r.answered = mas.answered; r.correct = mas.correct || 0; }
  const la = a.lastDay || '', lb = b.lastDay || '', rac = lb > la || (lb === la && (b.streak || 0) > (a.streak || 0)) ? b : a;
  if (rac.lastDay) {
    r.lastDay = rac.lastDay; r.streak = rac.streak || 0;
    // Dos dispositivos: si la racha del otro llega hasta la víspera de esta (o se cruza), es la misma y empieza donde empezó la más vieja.
    const otra = rac === a ? b : a;
    if (otra.lastDay && otra.streak && r.streak) {
      const fin = estadoDia(r.lastDay), ini = fin - r.streak + 1, ini2 = estadoDia(otra.lastDay) - otra.streak + 1;
      if (estadoDia(otra.lastDay) >= ini - 1 && ini2 < ini) r.streak = fin - ini2 + 1;
    }
    r.maxStreak = Math.max(r.maxStreak || 0, r.streak);
  }
  const ta = a.today, tb = b.today;
  if (tb && (!ta || !ta.day || tb.day > ta.day || (tb.day === ta.day && (tb.xp || 0) > (ta.xp || 0)))) r.today = tb;
  ESTADO_MAPAS.forEach(k => { if (a[k] || b[k]) r[k] = { ...b[k], ...a[k] }; });
  if (a.days || b.days) {
    r.days = { ...b.days };
    Object.entries(a.days || {}).forEach(([d, n]) => { r.days[d] = Math.max(n, r.days[d] || 0); });
  }
  ['exams', 'gym'].forEach(k => {
    if (!a[k] && !b[k]) return;
    r[k] = { ...b[k] };
    Object.entries(a[k] || {}).forEach(([id, x]) => {
      const y = r[k][id];
      const nuevo = y && (y.at || 0) > (x.at || 0) ? y : x;
      r[k][id] = y ? { ...nuevo, best: Math.max(x.best || 0, y.best || 0) } : x;
    });
  });
  if (a.misCursos || b.misCursos) r.misCursos = [...new Set([...(a.misCursos || []), ...(b.misCursos || [])])];
  if (!a.name && b.name) r.name = b.name;
  if (((b.carne || {}).at || 0) > ((a.carne || {}).at || 0)) r.carne = b.carne;   // el carné, el que se cambió de último
  if (!a.answered && b.answered && b.goal) r.goal = b.goal;
  if (!a.lastLesson && b.lastLesson) { r.lastLesson = b.lastLesson; if (b.course) r.course = b.course; }
  r.tourDone = !!(a.tourDone || b.tourDone);
  return r;
}

// ---------- subir y bajar ----------
let estadoSubido = '', estadoTimer = null, estadoEnCurso = null;
const estadoTexto = () => JSON.stringify(estadoToma(S));
const estadoListo = () => Cuenta.sb && Cuenta.user && !Cuenta.user.offline && (S.cuenta || {}).uid === Cuenta.user.id;

// Junta y guarda. En `_unir` deja el panel el avance de otra cuenta que se unió a esta.
async function estadoSync() {
  if (!estadoListo()) return false;
  if (estadoEnCurso) return estadoEnCurso;
  estadoEnCurso = (async () => {
    const uid = Cuenta.user.id;
    try {
      const { data, error } = await Cuenta.sb.from('estado_app').select('datos').eq('usuario', uid).maybeSingle();
      if (error || !estadoListo() || Cuenta.user.id !== uid) return false;
      const nube = data && data.datos;
      let datos = nube ? estadoMezcla(estadoToma(S), nube) : estadoToma(S);
      ((nube && nube._unir) || []).forEach(x => { datos = estadoMezcla(datos, { ...x, reinicio: datos.reinicio }); });
      const ans = S.answered || 0, cor = S.correct || 0;
      Object.assign(S, datos); save();
      if (uso.ans != null) { uso.ans += (S.answered || 0) - ans; uso.ok += (S.correct || 0) - cor; }   // lo hecho en otro dispositivo no cuenta como de hoy
      const texto = estadoTexto();
      const up = await Cuenta.sb.from('estado_app').upsert({ usuario: uid, datos, actualizado_en: new Date().toISOString() });
      if (up.error) return false;
      if (Cuenta.user && Cuenta.user.id === uid) estadoSubido = texto;
      return true;
    } catch (e) { return false; }
  })();
  const ok = await estadoEnCurso;
  estadoEnCurso = null;
  return ok;
}
// Sube si algo cambió.
function estadoEnvia() {
  clearTimeout(estadoTimer);
  if (estadoListo() && estadoTexto() !== estadoSubido) return estadoSync();
  return Promise.resolve(true);
}
function estadoPronto() { clearTimeout(estadoTimer); estadoTimer = setTimeout(estadoEnvia, 4000); }
// Lo que quedara sin subir de una cuenta se aparta en el dispositivo y se junta cuando esa cuenta vuelva.
function estadoAparta(uid) {
  try { localStorage.setItem(`zuka-pend-${uid}`, JSON.stringify({ done: S.done, secs: S.secs, estado: estadoToma(S) })); } catch (e) { /* sin espacio */ }
}
function estadoRecupera(uid) {
  try {
    const x = JSON.parse(localStorage.getItem(`zuka-pend-${uid}`));
    if (!x) return;
    Object.assign(S.done, x.done);
    Object.entries(x.secs || {}).forEach(([k, n]) => { S.secs[k] = Math.max(S.secs[k] || 0, n); });
    Object.assign(S, estadoMezcla(estadoToma(S), x.estado));
    localStorage.removeItem(`zuka-pend-${uid}`); save();
  } catch (e) { /* sin copia */ }
}
// Otra pestaña de la misma cuenta guardó (`otro` es lo que dejó en el disco): se junta con lo de esta, para que el
// próximo save() de aquí no borre lo que se hizo allá. Pura, salvo que cambia `s`; false si no había nada que juntar.
function estadoJunta(s, otro) {
  if (!otro || ((otro.cuenta || {}).uid || '') !== ((s.cuenta || {}).uid || '')) return false;
  const ra = s.reinicio || 0, rb = otro.reinicio || 0;
  // Reinició allá: lo que allá ya no existe (gimnasio, última lección…) tampoco se queda aquí.
  if (rb > ra) { s.done = { ...otro.done }; s.secs = { ...otro.secs }; ESTADO_CAMPOS.forEach(k => { if (otro[k] === undefined) delete s[k]; }); }
  else if (rb === ra) {
    s.done = Object.assign(s.done || {}, otro.done);
    s.secs = s.secs || {};
    Object.entries(otro.secs || {}).forEach(([k, n]) => { s.secs[k] = Math.max(s.secs[k] || 0, n); });
  }
  Object.assign(s, estadoMezcla(estadoToma(s), otro));
  return true;
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', e => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      const ans = S.answered || 0, cor = S.correct || 0;
      estadoJunta(S, JSON.parse(e.newValue));
      // Lo respondido en la otra pestaña ya lo reporta ella: aquí no cuenta como uso de esta (igual que en estadoSync).
      if (typeof uso !== 'undefined' && uso.ans != null) { uso.ans += (S.answered || 0) - ans; uso.ok += (S.correct || 0) - cor; }
    } catch (err) { /* copia ilegible: se deja lo de esta pestaña */ }
  });
}
// Otra cuenta entra en este dispositivo: lo ganado por la anterior no se le pasa.
function estadoLimpia() {
  const d = DEFAULTS();
  ESTADO_CAMPOS.forEach(k => { if (k in d) S[k] = d[k]; else delete S[k]; });
  S.tutorias = []; delete S.libros;
  estadoSubido = '';
}
if (typeof document !== 'undefined' && document.addEventListener) {
  setInterval(() => { if (!document.hidden) estadoEnvia(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) estadoEnvia(); });
}
;
//#archivo js/cuenta.js
// Cuenta del estudiante: entrada con código de acceso, «Mi plan», compra, progreso en la nube, candados por curso y
// enlaces de video (spec 2026-11-24-acceso-por-codigo). La lógica pura está en js/acceso.js.
// Sin conexión (o si no carga la librería de Supabase) la app sigue con lo guardado en el celular.

const Cuenta = {
  sb: null,        // cliente de Supabase (null sin conexión)
  user: null,      // usuario con sesión
  perfil: null,    // fila de `perfiles` (se guarda en S.cuenta para abrir sin conexión)
  accesos: [],     // filas de `accesos`: los cursos de esta cuenta (y los que abre su institución, con `institucion`)
  inst: { nombres: [], metas: [] },   // institución del estudiante: quién ve su avance y sus metas
  codigo: '',      // el código con el que se entra
  productos: null, // planes a la venta (tabla `productos`)
  ajustes: {},     // tabla `ajustes`: whatsapp, pago_info…
  recursos: {},    // id de lección o recurso → { curso, prueba, tipo }
  cursos: null,    // id de curso → publicado (tabla `cursos`); null si aún no se sabe
  bases: new Map() // id de video → { base, hasta }
};

// En el computador de desarrollo no hay candados (para revisar contenido y correr los robots);
// con ?candados en la dirección sí se ven.
const SIN_CANDADOS = typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  && !/[?&]candados\b/.test(location.search);

// Motivo por el que algo está cerrado para quien usa la app ahora (null = abierto).
function planMotivo(id) {
  if (SIN_CANDADOS) return null;
  return motivoBloqueo({ perfil: Cuenta.user ? Cuenta.perfil : null, accesos: Cuenta.accesos, horas: typeof Tienda === 'undefined' ? 0 : Tienda.saldo.general + Tienda.saldo.universidad }, Cuenta.recursos[id] || { tipo: 'leccion' });
}

function cuentaCache() {
  // uid = cuenta cuyo avance está en este celular; solo cambia cuando la sincronización termina bien.
  S.cuenta = { uid: (S.cuenta || {}).uid || null, perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst, codigo: Cuenta.codigo, sesion: !!Cuenta.user };
  save();
}
// Repinta la pestaña abierta (no durante una lección ni sobre el feed de clips, que se reiniciaría).
function cuentaRepinta() {
  if (typeof go !== 'function' || lessonClose || $('#overlay.open')) return;
  if (tab !== 'clips') go(tab);
}

// Qué es cada cosa (curso, si la abre un código de prueba). Va al cargar el archivo, antes de que app.js pinte.
if (typeof COURSES !== 'undefined') {
  catalogo(COURSES, typeof CURIOS === 'undefined' ? [] : CURIOS, typeof summaryOf === 'function' ? summaryOf : undefined)
    .forEach(r => { Cuenta.recursos[r.id] = { curso: r.curso, prueba: r.prueba, tipo: r.tipo }; });
  try { const t = JSON.parse(localStorage.getItem('zuka-tienda')) || {}; Cuenta.productos = t.productos || null; Cuenta.ajustes = t.ajustes || {}; } catch (e) { /* sin copia */ }
}

// ---------- quién ve todo abierto ----------
// Esconde lo que no es suyo (css/acceso.css, `.de-colegio`) y, si estaba en una de esas pestañas, lo lleva a Inicio.
function colegioMarca() {
  document.body.classList.toggle('de-colegio', cuentaDeColegio());
  if (cuentaDeColegio() && typeof tab !== 'undefined' && ['tienda', 'tutorias'].includes(tab) && !lessonClose) go('home');
}
// Estudiante de un colegio (o su gestor): solo Inicio, Mis cursos y Tú; no compra (spec 2026-11-25-estudiante-colegio).
const cuentaDeColegio = () => !!Cuenta.user && instManda({ perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst, horas: typeof Tienda === 'undefined' ? 0 : Tienda.saldo.general + Tienda.saldo.universidad });
const cuentaFija = () => !!Cuenta.user && (typeof Cuenta.inst.fija === 'boolean' && (Cuenta.perfil || {}).rol !== 'admin' ? Cuenta.inst.fija : instFija({ perfil: Cuenta.perfil, accesos: Cuenta.accesos, inst: Cuenta.inst }));   // lo dice la base; con una copia vieja, la misma regla
const colegioAvisa = () => toast('Tu institución maneja tus cursos. Si necesitas algo, pídelo a tu docente.');
const cuentaEsAdmin = () => !!(Cuenta.user && Cuenta.perfil && Cuenta.perfil.rol === 'admin');
// El administrador tiene siempre todo abierto (S.unlockAll: cursos, mundos, lecciones, jefes y
// evaluaciones, sin perder vidas); no se puede apagar. A los demás las lecciones y los mundos se les
// abren uno tras otro, al completar el anterior. En el computador de desarrollo no se toca (allí el
// interruptor «Modo revisión» de Ajustes decide).
function cuentaRol() {
  if (SIN_CANDADOS) return;
  S.unlockAll = cuentaEsAdmin() || (Cuenta.perfil || {}).rol === 'gestor';   // quien enseña mira cualquier lección, sin vidas ni orden
  save();
}

// ---------- pantalla de entrada ----------
// Sale al abrir la app sin sesión (y al cerrar sesión): se entra con el código de acceso. El correo queda para la
// administración y para cuentas creadas antes de los códigos.
function cuentaPideEntrar() {
  if (!Cuenta.sb || Cuenta.user || SIN_CANDADOS) return false;
  authScreen();
  return true;
}
function authCerrar() {
  const el = $('#auth'), pz = $('#landing');   // también la presentación (js/presentacion.js), si seguía abierta
  if (!el && !pz) return;
  el?.remove(); if (pz) presentacionCerrar(); else if (typeof applyTheme === 'function') applyTheme();
  if (!datosFaltan(Cuenta.perfil, Cuenta.accesos) && (Cuenta.perfil || {}).rol !== 'gestor' && typeof tourShouldStart === 'function' && tourShouldStart(S)) startTour();   // el recorrido de bienvenida esperaba (los datos van antes)
}
const waBoton = (texto, rotulo, cls = 'ghost') => {
  const u = waLink(Cuenta.ajustes.whatsapp, texto);
  return u ? `<a class="btn ${cls} wa" href="${esc(u)}" target="_blank" rel="noopener">${rotulo}</a>` : '';
};
function authScreen(modo = 'codigo', aviso = '') {
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  const cod = modo !== 'correo';
  const volver = typeof pzDesde !== 'undefined' && pzDesde;   // se llegó desde la presentación: se puede volver a ella
  const pedir = waBoton(WA.prueba(), 'Pedir un código de prueba');
  el.innerHTML = `<div class="auth-in">
    ${volver ? `<button class="link-btn auth-volver" type="button" data-pz-volver>${ICON.back} Conocer Zuka</button>` : ''}
    <div class="auth-brand">${zukaWord()}</div>
    <h1>${cod ? 'Entra con tu código' : 'Entra con tu correo'}</h1>
    <p class="muted">${cod ? 'Es el que recibiste por WhatsApp. Con el mismo código entras siempre y sigues donde ibas.' : 'Para administración y cuentas creadas con correo.'}</p>
    <form class="acct-form" novalidate>
      ${cod ? CAMPO_CODIGO : campo('correo', 'Correo', 'email', 'autocomplete="email" inputmode="email" required')
    + campo('clave', 'Contraseña', 'password', 'autocomplete="current-password" required')}
      <p class="form-msg${aviso ? ' bad' : ''}" role="alert"${aviso ? '' : ' hidden'}>${aviso}</p>
      <button class="btn main" type="submit">Entrar</button>
    </form>
    ${cod ? '' : '<button class="link-btn" type="button" data-olvide>Olvidé mi contraseña</button>'}
    <div class="auth-guest">${cod ? `${pedir || '<p class="muted">Si aún no tienes código, pídelo por el WhatsApp de Zuka.</p>'}
      <button class="link-btn auth-otro" type="button" data-modo="correo">Entrar con correo</button>`
    : '<button class="btn ghost" type="button" data-modo="codigo">Entrar con código</button>'}</div>
  </div>`;
  const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el);
  $('[data-modo]', el).onclick = e => authScreen(e.currentTarget.dataset.modo);
  $('[data-olvide]', el)?.addEventListener('click', openOlvide);
  $('[data-pz-volver]', el)?.addEventListener('click', () => pzVolver());
  // En el computador es una ventana sobre la presentación: tocar afuera la cierra y vuelve a ella.
  el.onclick = e => { if (e.target === el && $('#landing')) pzVolver(); };
  const error = t => { msg.textContent = t; msg.className = 'form-msg bad'; msg.hidden = false; };
  f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    const d = Object.fromEntries(new FormData(f));
    if (sinRed()) return error(sinRed());
    if (cod && !codigoValido(limpiaCodigo(d.codigo))) return error(canjeError('formato'));
    if (!cod && (!/^\S+@\S+\.\S+$/.test(d.correo.trim()) || !d.clave)) return error('Escribe tu correo y tu contraseña.');
    msg.hidden = true; b.disabled = true; b.textContent = 'Un momento…';
    let mal = null;
    try {
      if (cod) mal = await entrarConCodigo(limpiaCodigo(d.codigo));
      else {
        const r = await Cuenta.sb.auth.signInWithPassword({ email: d.correo.trim(), password: d.clave });
        mal = r.error ? authError(r.error) : null;
      }
    } catch (x) { mal = authError(x); }
    if (!f.isConnected) return;
    b.disabled = false; b.textContent = 'Entrar';
    if (mal) error(mal);   // con sesión, la pantalla la cierra cuentaSesion
  };
}
// Este navegador, para el límite de dispositivos por código.
function dispositivoId() {
  let id = null;
  try { id = localStorage.getItem('zuka-dispositivo'); } catch (e) { /* sin almacenamiento */ }
  if (!id) {
    id = [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, '0')).join('');
    try { localStorage.setItem('zuka-dispositivo', id); } catch (e) { /* idem */ }
  }
  return id;
}
function dispositivoNombre() {
  const u = navigator.userAgent;
  const so = /android/i.test(u) ? 'Android' : /iphone|ipad/i.test(u) ? 'iPhone o iPad' : /windows/i.test(u) ? 'Windows' : /mac/i.test(u) ? 'Mac' : 'Otro';
  const nav = /edg\//i.test(u) ? 'Edge' : /firefox/i.test(u) ? 'Firefox' : /chrome|crios/i.test(u) ? 'Chrome' : /safari/i.test(u) ? 'Safari' : 'Navegador';
  return `${so} · ${nav}${isStandalone() ? ' (app)' : ''}`;
}
// Devuelve un texto de error o null si quedó la sesión abierta.
async function entrarConCodigo(codigo) {
  const { data, error } = await Cuenta.sb.functions.invoke('entrar-codigo', { body: { codigo, dispositivo: dispositivoId(), nombre: dispositivoNombre() } });
  if (error) return /fetch|network|failed to send/i.test(`${error.name} ${error.message}`) && !navigator.onLine ? canjeError('red') : canjeError('');
  if (!data || !data.ok) return canjeError(data && data.error);
  const v = await Cuenta.sb.auth.verifyOtp({ token_hash: data.token_hash, type: 'magiclink' });
  return v.error ? authError(v.error) : null;
}

// ---------- cursos habilitados ----------
// El estudiante ve los cursos de su cuenta y, para comprarlos, los que el administrador publicó (tabla `cursos`).
// El administrador los ve todos, con la marca «Borrador» en los que aún no habilita. Sin datos del servidor valen los
// de CURSOS_LISTOS.
const CURSOS_LISTOS = ['algebra', 'trig'];
try { Cuenta.cursos = JSON.parse(localStorage.getItem('zuka-cursos')) || null; } catch (e) { /* sin copia */ }
const cursoBorrador = c => (Cuenta.cursos ? Cuenta.cursos[c.id] !== true : !CURSOS_LISTOS.includes(c.id));
const cursoVisible = c => (portalMios() ? c.id === 'preicfes' : SIN_CANDADOS || cuentaEsAdmin() || (Cuenta.accesos || []).some(a => a.curso === c.id) || (!cuentaDeColegio() && !cursoBorrador(c)));
// «Mis cursos», el perfil y las asesorías: solo lo comprado (pedido del 2026-11-24). La prueba se abre desde Inicio.
const cursoComprado = (c, alDia = false) => SIN_CANDADOS || cuentaEsAdmin() || comprado(Cuenta.accesos, c.id, alDia);
const accesoCursoFila = id => (Cuenta.accesos || []).find(a => a.curso === id);
const cursosConAcceso = () => cursosVisibles().filter(c => SIN_CANDADOS || cuentaEsAdmin() || (Cuenta.accesos || []).some(a => a.curso === c.id));
function cursosVisibles() {
  const v = COURSES.filter(cursoVisible);
  return v.length ? v : COURSES.slice(0, 1);
}

// ---------- uso diario ----------
// Tiempo con la app abierta y a la vista, lecciones completadas y ejercicios respondidos: se envían
// cada minuto (registrar_uso) y alimentan las estadísticas del panel. Solo con sesión.
// Cuenta mientras hay alguien: un toque o una tecla en los últimos tres minutos (lo que dura leer un texto), o algo que se mira o se oye
// hasta el final (video, escenas, voz de Explora: usoVivo). Los clips en bucle no cuentan solos.
// Sin eso, dejar la app abierta sumaba horas (se vio en los datos: 4 horas sin un solo ejercicio).
const uso = { seg: 0, t: Date.now(), lec: 0, ans: null, ok: null, act: Date.now() };
const USO_QUIETO = 180000;
const usoHayAlguien = now => now - uso.act < USO_QUIETO || [...document.querySelectorAll('video')].some(v => !v.paused && !v.ended && !v.loop);
function usoVivo(seg = 0) { uso.act = Math.max(uso.act, Date.now() + seg * 1000); }
function usoTick(visible = !document.hidden) {
  const now = Date.now(), dt = (now - uso.t) / 1000;
  uso.t = now;
  if (visible && usoHayAlguien(now) && dt > 0 && dt < 40 && Cuenta.user && !Cuenta.user.offline) uso.seg += dt;
  if (uso.seg >= 60) usoEnvia();
}
function usoEnvia() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || typeof S === 'undefined') return;
  if (uso.ans == null) { uso.ans = S.answered; uso.ok = S.correct; }
  const seg = Math.round(uso.seg), ej = Math.max(0, S.answered - uso.ans), ac = Math.max(0, S.correct - uso.ok), lec = uso.lec;
  if (!seg && !ej && !lec) return;
  uso.seg = 0; uso.lec = 0; uso.ans = S.answered; uso.ok = S.correct;
  Cuenta.sb.rpc('registrar_uso', { p_segundos: seg, p_lecciones: lec, p_ejercicios: ej, p_aciertos: Math.min(ac, ej), p_xp: S.xp, p_racha: streakNow() })
    .then(() => {}, () => {});
}
if (typeof document !== 'undefined') {
  setInterval(() => usoTick(), 15000);
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchmove'].forEach(k => addEventListener(k, () => { uso.act = Date.now(); }, { passive: true, capture: true }));
  // Al esconder la app se cuenta lo que iba y se envía; al volver, el reloj arranca de nuevo.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { usoTick(true); usoEnvia(); } else uso.t = uso.act = Date.now();
  });
}

function cuentaInit() {
  if (typeof S === 'undefined') return;
  // Lo último que se supo de la cuenta: sirve para abrir sin conexión.
  if (S.cuenta && S.cuenta.sesion && S.cuenta.perfil) {
    Cuenta.user = { id: S.cuenta.perfil.id, offline: true }; Cuenta.perfil = S.cuenta.perfil;
    Cuenta.accesos = S.cuenta.accesos || []; Cuenta.inst = S.cuenta.inst || { nombres: [], metas: [] }; Cuenta.codigo = S.cuenta.codigo || '';
  }
  cuentaRol();
  if (!window.supabase || !window.supabase.createClient) return;
  Cuenta.sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
  // Dentro del aviso de Supabase no se le puede volver a llamar: se sale primero con setTimeout.
  Cuenta.sb.auth.onAuthStateChange((ev, session) => setTimeout(() => cuentaSesion(ev, session), 0));
  // Al llegar el WhatsApp por primera vez, la entrada lo muestra (sin borrar lo que ya se estaba escribiendo).
  cuentaTienda().then(() => { const i = $('#auth input[name="codigo"]'); if (i && !i.value && !$('#auth .wa')) authScreen(); }, () => {});
  Cuenta.sb.from('cursos').select('id,publicado').then(({ data }) => {
    if (!data || !data.length) return;
    const m = {}; data.forEach(r => { m[r.id] = r.publicado; });
    const cambio = JSON.stringify(m) !== JSON.stringify(Cuenta.cursos);
    Cuenta.cursos = m;
    try { localStorage.setItem('zuka-cursos', JSON.stringify(m)); } catch (e) { /* sin espacio */ }
    if (cambio) { cuentaRepinta(); if (typeof presentacionRefresca === 'function') presentacionRefresca(); }
  });
}

async function cuentaSesion(ev, session) {
  const antes = Cuenta.user && !Cuenta.user.offline ? Cuenta.user.id : null;
  if (!session) {
    if (ev === 'INITIAL_SESSION' && !navigator.onLine) return;   // sin red: vale lo guardado
    Cuenta.user = null; Cuenta.perfil = null; Cuenta.accesos = []; Cuenta.inst = { nombres: [], metas: [] }; Cuenta.codigo = ''; tiendaFuera(); Cuenta.bases.clear(); cuentaCola.clear();
    cuentaCache(); cuentaRol(); cuentaRepinta();
    if (!SIN_CANDADOS && !Clave.vista) { const tapa = datosAbierta; datosAbierta = false; if (tapa || (!$('#auth') && !$('#landing') && !lessonClose)) authScreen(); }
    return;
  }
  const uidPrevio = (S.cuenta || {}).uid || null, perfilPrevio = cuentaHuella();
  Cuenta.user = session.user;
  if (ev === 'PASSWORD_RECOVERY') claveRecupera();   // js/clave.js
  if (antes === session.user.id && ev === 'TOKEN_REFRESHED') return;
  await cuentaPerfil();
  cuentaRol();
  if (datosAbierta) { /* los datos personales se quedan a la vista */ } else if (!Clave.vista) authCerrar(); else if (typeof presentacionCerrar === 'function') presentacionCerrar();   // la contraseña nueva se queda a la vista
  // Supabase repite el aviso de sesión cada vez que se vuelve a la pestaña: solo se repinta si algo cambió.
  if (antes === session.user.id) { if (cuentaHuella() !== perfilPrevio) cuentaRepinta(); datosPide(); return; }
  Cuenta.bases.clear(); cuentaCola.clear();   // nada pendiente de otra cuenta sube a esta
  uso.seg = 0; uso.lec = 0; uso.ans = S.answered; uso.ok = S.correct; uso.t = Date.now();
  if (await cuentaSyncProgreso(uidPrevio)) await estadoSync();
  await Promise.all([tiendaCarga().catch(() => {}), asesoriasCarga().catch(() => {})]);
  cuentaRepinta(); portalAbre();
  datosPide();
}
// Si la primera sincronización falló (sin red), se vuelve a intentar.
async function cuentaReintenta() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || lessonClose || (S.cuenta || {}).uid === Cuenta.user.id) return;
  if (await cuentaSyncProgreso((S.cuenta || {}).uid || null)) { await estadoSync(); cuentaRepinta(); }
}
if (typeof document !== 'undefined') setInterval(() => { if (!document.hidden) cuentaReintenta().catch(() => {}); }, 60000);
const cuentaHuella = () => JSON.stringify([Cuenta.perfil, Cuenta.accesos, Cuenta.inst, Tienda.mios, Tienda.saldo]);
// Al volver a la app se pregunta si cambió el acceso (el administrador acaba de confirmar un pago…).
let cuentaVista = 0;
async function cuentaRevisa() {
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline || Date.now() - cuentaVista < 30000) return;
  cuentaVista = Date.now();
  await cuentaReintenta();
  const antes = cuentaHuella(), pagos = new Set(Cuenta.accesos.filter(a => a.tipo === 'pago' && vigente(a.hasta, Date.now())).map(a => a.curso));
  await Promise.all([cuentaPerfil(), tiendaMios().catch(() => {}), asesoriasCarga().catch(() => {})]);
  if (tab === 'tienda' && !$('#tienda')) tiendaPinta('', false);
  if (cuentaHuella() === antes) return;
  const nuevo = Cuenta.accesos.find(a => a.tipo === 'pago' && vigente(a.hasta, Date.now()) && !pagos.has(a.curso));
  if (nuevo) toast(`¡Listo! Tu acceso a ${cursoNombre(nuevo.curso)} está activo.`);
  Cuenta.bases.clear(); cuentaRepinta(); datosPide();
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (!document.hidden) cuentaRevisa(); });

const nombreFijo = () => { const n = ((Cuenta.inst.persona || (Cuenta.inst.equipo || [])[0] || {}).nombre || (Cuenta.perfil || {}).nombre || '').trim(); return n.split(/\s+/)[0].slice(0, 24); };
const primerNombre = p => ((p && p.nombre) || '').trim().split(/\s+/)[0].slice(0, 24);
async function cuentaPerfil() {
  if (!Cuenta.sb || !Cuenta.user) return null;
  const uid = Cuenta.user.id;
  const [{ data }, acc, cod, ins] = await Promise.all([Cuenta.sb.from('perfiles').select('*').eq('id', uid).maybeSingle(),
    Cuenta.sb.from('accesos').select('curso,tipo,desde,hasta').eq('usuario', uid), Cuenta.sb.rpc('mi_codigo'), Cuenta.sb.rpc('mi_institucion')]);
  if (!Cuenta.user || Cuenta.user.id !== uid) return null;   // mientras tanto cambió de cuenta
  if (Cuenta.perfil && Cuenta.perfil.id !== uid) Cuenta.inst = { nombres: [], metas: [] };   // otra cuenta
  const deInst = ins.data ? ins.data.accesos : (Cuenta.perfil?.id === uid ? Cuenta.accesos || [] : []).filter(a => a.institucion);
  if (acc.data) Cuenta.accesos = instJunta(acc.data, deInst);
  if (ins.data) Cuenta.inst = { nombres: ins.data.instituciones || [], metas: ins.data.metas || [], simulacros: ins.data.simulacros || [], avisos: ins.data.avisos || [], equipo: ins.data.equipo || [], persona: ins.data.persona || null, fija: ins.data.fija };
  if (!cod.error) Cuenta.codigo = cod.data || '';
  if (data) {
    Cuenta.perfil = data;
    if (data.rol === 'gestor' && $('#auth') && !datosAbierta && !Clave.vista) portalPend = true;   // acaba de entrar con su código: va a su portal (js/portal.js)
    if (!S.name) S.name = primerNombre(data);
    if (cuentaFija()) { const n = nombreFijo(); if (n && n !== S.name) { S.name = n; save(); } }   // el que puso su institución
    cuentaCache(); colegioMarca();
  }
  return data;
}

// Junta el avance del celular con el de la nube. Si en este celular estudiaba otra cuenta, su avance
// local no se le pasa a la nueva: se reemplaza por el de la nube.
async function cuentaSyncProgreso(uidPrevio) {
  if (!Cuenta.sb || !Cuenta.user) return false;
  const uid = Cuenta.user.id, otro = uidPrevio && uidPrevio !== uid;
  // Se aparta lo de la otra cuenta antes de nada: aunque falle la red, esta no estudia encima de lo ajeno.
  if (otro) { estadoAparta(uidPrevio); S.done = {}; S.secs = {}; estadoLimpia(); S.tourDone = true; S.name = primerNombre(Cuenta.perfil); }   // tampoco XP, racha, evaluaciones… de la cuenta anterior
  S.secs = S.secs || {};
  if (otro) { S.cuenta = Object.assign(S.cuenta || {}, { uid: null }); save(); }
  estadoRecupera(uid);
  const { data, error } = await Cuenta.sb.from('progreso').select('leccion,completada,segundos_vistos').eq('usuario', uid);
  if (error || !data || !Cuenta.user || Cuenta.user.id !== uid) return false;
  const nube = new Map(data.map(r => [r.leccion, r]));
  data.forEach(r => {
    if (r.completada) S.done[r.leccion] = true;
    S.secs[r.leccion] = Math.max(S.secs[r.leccion] || 0, r.segundos_vistos || 0);
  });
  const faltan = [...new Set([...Object.keys(S.done).filter(id => S.done[id]), ...Object.keys(S.secs)])]
    .filter(id => { const r = nube.get(id); return !r || (!!S.done[id] && !r.completada) || (S.secs[id] || 0) > (r.segundos_vistos || 0); })
    .map(id => ({ leccion: id, completada: !!S.done[id], segundos: Math.round(S.secs[id] || 0) }));
  S.cuenta = Object.assign(S.cuenta || {}, { uid: Cuenta.user.id });   // desde aquí el avance del celular es de esta cuenta
  save();
  for (let i = 0; i < faltan.length; i += 400) await Cuenta.sb.rpc('guardar_progreso', { p_filas: faltan.slice(i, i + 400) });
  return true;
}

// Guarda el avance de una lección (al completarla y mientras se ve su video). Lo que no alcanza a
// subir queda en S.done / S.secs y sube en el siguiente inicio de sesión.
const cuentaCola = new Map();
let cuentaTimer = null;
function cuentaProgreso(id, { completada = false, segundos = 0 } = {}) {
  S.secs = S.secs || {};
  if (segundos > (S.secs[id] || 0)) S.secs[id] = Math.round(segundos);
  const q = cuentaCola.get(id) || { leccion: id, completada: false, segundos: 0 };
  if (completada && !q.completada) uso.lec++;
  q.completada = q.completada || completada; q.segundos = Math.max(q.segundos, Math.round(S.secs[id] || 0));
  cuentaCola.set(id, q);
  clearTimeout(cuentaTimer);
  if (completada) { cuentaEnvia(); estadoPronto(); } else cuentaTimer = setTimeout(cuentaEnvia, 15000);
}
function cuentaEnvia() {
  clearTimeout(cuentaTimer);
  if (!cuentaCola.size) return;
  save();
  if (!Cuenta.sb || !Cuenta.user || Cuenta.user.offline) return;
  // Solo sube si lo que hay en el celular es de esta cuenta (ya se sincronizó con ella).
  if ((S.cuenta || {}).uid !== Cuenta.user.id) return;
  const filas = [...cuentaCola.values()], uid = Cuenta.user.id; cuentaCola.clear();
  Cuenta.sb.rpc('guardar_progreso', { p_filas: filas }).then(({ error }) => {
    if (error && Cuenta.user && Cuenta.user.id === uid) filas.forEach(f => { if (!cuentaCola.has(f.leccion)) cuentaCola.set(f.leccion, f); });
  }, () => {});
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (document.hidden) cuentaEnvia(); });

// Dirección de la carpeta de un video de Bunny (sin la barra final). La firma el servidor y solo si
// la cuenta puede verlo. Si el servidor no contesta se prueba la dirección sin firma, que sirve
// mientras Bunny no exija token.
// La dirección ya pedida y aún vigente, o null: deja adjuntar el video en el mismo toque que abre la lección.
function cuentaVideoBaseYa(id) {
  const hit = Cuenta.bases.get(id);
  return hit && hit.hasta > Date.now() ? hit.base : null;
}
function cuentaVideoBase(id, reintento = false) {
  const libre = `https://${bunnyHost(id)}/${id}`;
  // Biblioteca nueva (sin token): el servidor solo dice si la cuenta puede verlo; la dirección es la libre.
  const vieja = BUNNY_VIEJOS.has(id);
  const ya = cuentaVideoBaseYa(id);
  if (ya) return Promise.resolve(ya);
  if (!Cuenta.sb) return Promise.resolve(libre);
  return Cuenta.sb.functions.invoke('video-url', { body: { video: id } }).then(({ data, error }) => {
    if (data && data.ok && data.base) {
      const base = vieja ? data.base : libre;
      Cuenta.bases.set(id, { base, hasta: vieja && data.expira ? data.expira * 1000 - 600000 : Date.now() + 3600000 });
      return base;
    }
    const status = error && error.context && error.context.status;
    // 401: la sesión venció mientras la app estaba en segundo plano. Se renueva y se pide otra vez.
    if (status === 401 && !reintento) return Cuenta.sb.auth.refreshSession().then(() => cuentaVideoBase(id, true), () => cuentaVideoBase(id, true));
    if ((status === 403 || status === 401) && !SIN_CANDADOS) throw new Error('sin_acceso');
    return libre;
  }, () => libre);
}

// ---------- formularios (hojas inferiores) ----------
const campo = (name, label, type = 'text', extra = '') =>
  `<label class="fld"><span>${label}</span><input name="${name}" type="${type}" aria-label="${label}" ${extra}></label>`;
const CAMPO_CODIGO = campo('codigo', 'Código de acceso', 'text', 'autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="14" placeholder="ABCDE-FGH23" required');

// Hoja con un formulario: `enviar(datos)` devuelve un texto de error o nada si salió bien.
function hojaForm({ title, intro = '', campos, ok, pie = '', enviar }) {
  openSheet(`<form class="acct-form" novalidate><h3 class="sheet-title">${title}</h3>
    ${intro ? `<p class="muted">${intro}</p>` : ''}${campos}
    <p class="form-msg" role="alert" hidden></p>
    <button class="btn main" type="submit">${ok}</button>${pie}</form>`, sh => {
    const f = $('form', sh), msg = $('.form-msg', sh), b = $('button[type=submit]', sh);
    f.onsubmit = async e => {
      e.preventDefault();
      if (b.disabled) return;
      msg.hidden = true; b.disabled = true; const txt = b.textContent; b.textContent = 'Un momento…';
      let err = null;
      try { err = await enviar(Object.fromEntries(new FormData(f)), sh); } catch (x) { err = authError(x); }
      b.disabled = false; b.textContent = b.dataset.txt || txt;
      if (err) { msg.textContent = err; msg.hidden = false; msg.className = 'form-msg bad'; }
    };
    setTimeout(() => $('input', f)?.focus({ preventScroll: true }), 250);
  });
}
const sinRed = () => (!Cuenta.sb ? 'No hay conexión. Revisa tu internet e inténtalo de nuevo.' : null);
const cursoNombre = id => (COURSES.find(c => c.id === id) || {}).name || id;
function openEntrar() { closeSheet(false); authScreen(); }

// Otro código para esta misma cuenta: añade lo que trae (debe estar sin estrenar); el avance no cambia.
function openCanje() {
  if (cuentaDeColegio()) return colegioAvisa();
  if (!Cuenta.user) return openEntrar();
  hojaForm({
    title: 'Añadir un código',
    intro: 'Si te dieron otro código, lo que trae se suma a tu cuenta. Sigues entrando con el de siempre y tu avance no cambia.',
    campos: CAMPO_CODIGO, ok: 'Añadir',
    enviar: async (d, sh) => {
      const c = limpiaCodigo(d.codigo);
      if (!codigoValido(c)) return canjeError('formato');
      if (sinRed()) return canjeError('red');
      const { data, error } = await Cuenta.sb.rpc('canjear_codigo', { p_codigo: c });
      if (error) return canjeError(/fetch|network/i.test(error.message || '') ? 'red' : '');
      if (!data || !data.ok) return canjeError(data && data.error);
      await cuentaPerfil(); Cuenta.bases.clear();
      $('.sheet-card', sh).innerHTML = `<div class="grabber"></div><div class="acct-form canje-ok"><span class="canje-check">${ICON.check}</span>
        <h3 class="sheet-title">Código añadido</h3>
        <p class="muted">${(data.concede || []).map(x => `${esc(cursoNombre(x.curso))} (${x.tipo === 'pago' ? 'completo' : 'prueba'})`).join(', ')}.</p>
        <button class="btn main" type="button" data-ok>Entendido</button></div>`;
      $('[data-ok]', sh).onclick = () => { closeSheet(); cuentaRepinta(); if (!datosPide()) go('home'); };
    },
  });
}

// ---------- pagar con el QR de Bre-B ----------
// brand/pago-breb.png: el QR de Zuka Education redibujado con el mismo contenido (tests/tienda.test.js lo vigila). No trae el
// valor: el estudiante lo escribe. Desde el mismo celular se guarda la imagen y se sube en la app del banco.
const PAGO_QR = 'brand/pago-breb.png';
const pagoHTML = total => `<section class="pago"><h3>Paga con Bre-B</h3>${total != null ? `<p class="pago-valor">${cop(total)}</p>` : ''}
  <img src="${PAGO_QR}" width="260" height="260" alt="Código QR de Bre-B para pagar a Zuka Education"><b>Zuka Education</b>
  <ol><li>Escanéalo desde Nequi o la app de tu banco. Si estás en este celular, guarda la imagen y súbela en la opción de leer QR.</li>
    <li>Revisa que diga <b>Zuka Education</b>${total != null ? ` y escribe <b>${cop(total)}</b>` : ' y escribe el valor'}.</li><li>Envíanos el comprobante por WhatsApp.</li></ol>
  <a class="btn ghost" href="${PAGO_QR}" download="Zuka-pago-BreB.png">Guardar QR</a></section>`;
const openPago = (total, texto) => openSheet(`<div class="acct-form">${pagoHTML(total)}${waBoton(texto, 'Enviar comprobante', 'main brand')}</div>`);

// ---------- comprar ----------
// Se elige cuánto tiempo; queda la solicitud en el panel y se abre WhatsApp con el mensaje escrito. El acceso se activa
// en el mismo código cuando el administrador confirma el pago.
const productosDe = id => (Cuenta.productos || []).filter(p => p.curso === id && p.activo).sort((a, b) => a.meses - b.meses);
async function cuentaTienda() {
  if (!Cuenta.sb) return;
  const [pr, aj] = await Promise.all([Cuenta.sb.from('productos').select('*'), Cuenta.sb.from('ajustes').select('*')]);
  if (pr.data) Cuenta.productos = pr.data;
  if (aj.data) Cuenta.ajustes = Object.fromEntries(aj.data.map(x => [x.clave, x.valor]));
  try { localStorage.setItem('zuka-tienda', JSON.stringify({ productos: Cuenta.productos, ajustes: Cuenta.ajustes })); } catch (e) { /* sin espacio */ }
}
async function openComprar(id, elegido) {
  if (!Cuenta.user) return openEntrar();
  if (cuentaDeColegio()) return colegioAvisa();
  const a = accesoCurso(Cuenta.accesos, id), renueva = !accesoCursoFila(id)?.institucion && (a.estado === 'pago' || a.estado === 'vencido'), curso = cursoNombre(id);
  openSheet(`<div class="acct-form compra"><h3 class="sheet-title">${renueva ? 'Renovar' : 'Comprar'} ${esc(curso)}</h3>
    <p class="muted">${a.estado === 'pago' ? `Te quedan ${diasTexto(a.dias)}: los que compres se suman.` : 'Se activa en tu mismo código y sigues donde vas: no pierdes nada de tu avance.'}</p>
    <div class="compra-lista" role="radiogroup" aria-label="Duración">${silueta('opciones', 3)}</div>
    <p class="form-msg" role="alert" hidden></p></div>`);
  if (!Cuenta.productos) await cuentaTienda().catch(() => {});
  const box = $('#sheet .compra'), lista = $('#sheet .compra-lista');
  if (!box) return;
  const ps = productosDe(id);
  if (!ps.length) { lista.outerHTML = `<p class="muted">Escríbenos y te contamos cómo comprarlo.</p>${waBoton(WA.ayuda(Cuenta.codigo), 'Escribir por WhatsApp', 'main brand')}`; return; }
  let sel = ps.find(p => p.id === elegido) || ps[ps.length - 1];
  const mes = ps[0].meses === 1 ? ps[0].precio : null;
  lista.innerHTML = ps.map(p => `<button type="button" role="radio" class="compra-op" data-p="${esc(p.id)}" aria-checked="${p === sel}" tabindex="${p === sel ? 0 : -1}">
    <span><b>${mesesTexto(p.meses)}</b><small>${mes && p.precio && p.meses > 1 ? `${cop(p.precio / p.meses)} al mes` : diasTexto(p.dias)}</small></span>
    <strong>${p.precio != null ? cop(p.precio) : 'Precio por WhatsApp'}</strong></button>`).join('');
  const ops = [...lista.querySelectorAll('.compra-op')];
  const elige = i => { sel = ps[i]; ops.forEach((o, k) => { o.setAttribute('aria-checked', k === i); o.tabIndex = k === i ? 0 : -1; }); pinta(); };
  ops.forEach((o, i) => {
    o.onclick = () => elige(i);
    o.onkeydown = e => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const j = (i + d + ops.length) % ops.length; elige(j); ops[j].focus(); } };
  });
  box.insertAdjacentHTML('beforeend', `${Cuenta.ajustes.pago_info ? `<p class="muted compra-info">${esc(Cuenta.ajustes.pago_info)}</p>` : ''}<div class="compra-pie"></div><details class="pago-mas"><summary>Ver QR para pagar</summary><div></div></details>`);
  // Enlace de verdad (no window.open tras una espera): así ningún navegador lo bloquea.
  const pinta = () => {
    const u = waLink(Cuenta.ajustes.whatsapp, WA.compra({ curso, meses: sel.meses, precio: sel.precio, codigo: Cuenta.codigo, nombre: (Cuenta.perfil || {}).nombre }));
    const mas = $('.pago-mas', box);
    mas.hidden = sel.precio == null; $('div', mas).innerHTML = sel.precio == null ? '' : pagoHTML(sel.precio);
    $('.compra-pie', box).innerHTML = u ? `<a class="btn main brand" href="${esc(u)}" target="_blank" rel="noopener" data-pide>Pedir por WhatsApp</a>` : '<button class="btn main brand" type="button" data-pide>Solicitar</button>';
    $('[data-pide]', box).onclick = async () => {
      const msg = $('.form-msg', box);
      const r = await Cuenta.sb?.rpc('pedir_compra', { p_producto: sel.id }).then(x => x, x => ({ error: x }));
      if (!box.isConnected) return;
      msg.hidden = false;
      if (!r || r.error) { msg.className = 'form-msg bad'; msg.textContent = u ? 'No quedó registrada aquí, pero puedes enviar el mensaje de WhatsApp.' : 'No se pudo enviar. Inténtalo de nuevo.'; return; }
      msg.className = 'form-msg ok'; msg.textContent = 'Solicitud enviada. Cuando confirmemos tu pago, el curso se abre aquí mismo.';
    };
  };
  pinta();
}
// Hoja que sale al tocar algo con candado: dice por qué y qué hacer.
function openBloqueo(id) {
  const motivo = planMotivo(id), rec = Cuenta.recursos[id] || {}, t = textoBloqueo(motivo, cursoNombre(rec.curso));
  if (!t) return;
  if (cuentaDeColegio() && motivo !== 'bloqueado' && motivo !== 'sesion') return openSheet(`<div class="acct-form lock-sheet"><span class="lock-ico">${ICON.lock}</span><h3 class="sheet-title">No está en tus cursos</h3><p class="muted">Tu institución elige los cursos que tienes. Si lo necesitas, pídelo a tu docente.</p><button class="btn main" type="button" data-a>Entendido</button></div>`, sh => { $('[data-a]', sh).onclick = () => closeSheet(); });
  const compra = rec.curso && ['ninguno', 'prueba', 'prueba_vencida', 'vencido'].includes(motivo);
  openSheet(`<div class="acct-form lock-sheet"><span class="lock-ico">${ICON.lock}</span>
    <h3 class="sheet-title">${esc(t.title)}</h3><p class="muted">${esc(t.text)}</p>
    ${motivo === 'sesion' ? '<button class="btn main" type="button" data-a="entrar">Entrar con mi código</button>'
    : motivo === 'bloqueado' ? waBoton(WA.ayuda(Cuenta.codigo), 'Escribir por WhatsApp', 'main')
    : `<button class="btn main" type="button" data-a="compra">${motivo === 'vencido' ? 'Renovar' : compra ? 'Comprar acceso' : 'Comprar horas'}</button>
      ${motivo === 'tutorias' ? '' : '<button class="btn ghost" type="button" data-a="paquetes">Ver paquetes y libros</button><button class="link-btn" type="button" data-a="canje">Ya tengo otro código</button>'}`}</div>`,
  sh => sh.querySelectorAll('[data-a]').forEach(b => { b.onclick = () => ({ entrar: openEntrar, canje: openCanje, paquetes: () => openTienda(), compra: () => (compra ? openComprar(rec.curso) : openTienda('asesorias')) })[b.dataset.a](); }));
}
// Aviso dentro del curso (portada): prueba, plan por vencer o vencido, con su botón.
function accesoAvisoHTML(c) {
  if (SIN_CANDADOS || cuentaEsAdmin() || !Cuenta.user || accesoCursoFila(c.id)?.institucion) return '';   // renueva la institución, no el estudiante
  const a = accesoCurso(Cuenta.accesos, c.id);
  const t = {
    prueba: `Estás en la <b>prueba</b>: se abre el primer mundo${c.blocks ? ' de cada componente' : ''}${a.dias != null ? ` (${a.dias === 1 ? 'queda' : 'quedan'} ${diasTexto(a.dias)})` : ''}.`,
    prueba_vencida: 'Tu prueba terminó. Tu avance sigue guardado.', vencido: 'Tu plan venció. Conservas el primer mundo y tu avance.',
    ninguno: 'Este curso no está en tu plan.', pago: a.dias != null && a.dias <= 7 ? `Tu plan vence en <b>${diasTexto(a.dias)}</b>. Si renuevas ya, los días se suman.` : '',
  }[a.estado];
  return t ? `<section class="acc-aviso"><p>${t}</p><button class="btn sm main brand" type="button" data-comprar="${esc(c.id)}">${a.estado === 'pago' || a.estado === 'vencido' ? 'Renovar' : 'Comprar'}</button></section>` : '';
}
const bindAccesoAviso = () => $('[data-comprar]', view)?.addEventListener('click', e => openComprar(e.currentTarget.dataset.comprar));

// ---------- tarjeta «Mi plan» de la pestaña Tú ----------
const accesoPill = a => ({ pago: '<span class="pill ok">Activo</span>', prueba: '<span class="pill warn">Prueba</span>', vencido: '<span class="pill bad">Vencido</span>', prueba_vencida: '<span class="pill bad">Prueba terminada</span>' })[a.estado] || '';
function cuentaCard() {
  if (!Cuenta.user) {
    return `<section class="card acct-card"><h3>Mi plan</h3><p class="muted">Entra con tu código de acceso para ver tus cursos y guardar tu avance.</p>
      <button class="btn brand" data-acct="entrar">Entrar con mi código</button></section>`;
  }
  const p = Cuenta.perfil || {}, admin = p.rol === 'admin', mios = Cuenta.accesos || [], gestor = p.rol === 'gestor', de = Cuenta.inst.nombres;
  return `<section class="card acct-card"><div class="acct-head"><h3>${admin ? 'Administración' : 'Mi plan'}</h3></div>
    ${gestor ? '<p class="muted">Esta es una cuenta de gestión. En el portal registras a tus estudiantes y sigues su avance.</p><button class="btn brand" type="button" data-acct="portal">Abrir el portal</button>' : de.length ? `<p class="acct-inst">Estudias con <b>${esc(de.join(' y '))}</b>. Sus docentes ven tu avance y tu tiempo de estudio.</p>` : ''}
    ${admin ? '<p class="muted">Tienes todo el contenido abierto. Entra directo a lo que necesites:</p>'
    : mios.length ? `<ul class="plan-cursos">${mios.map(x => {
      const a = accesoCurso(mios, x.curso);
      const cu = COURSES.find(k => k.id === x.curso);
      return `<li style="--c:${cu?.color || 'var(--brand)'}">${cu ? aroHTML(pfQueda(x, a), courseArt(cu, 'md')) : ''}<div class="acct-head"><b>${esc(cursoNombre(x.curso))}</b>${accesoPill(a)}</div>
        <p class="muted">${a.estado === 'pago' ? `Del ${fechaCorta(a.desde)} al ${fechaCorta(a.hasta)} · <b class="${a.dias <= 7 ? 'warn' : ''}">${a.dias === 1 ? 'queda' : 'quedan'} ${diasTexto(a.dias)}</b>`
        : a.estado === 'prueba' ? `Primer mundo abierto${a.hasta ? ` hasta el ${fechaCorta(a.hasta)}` : ''}.` : `Terminó el ${fechaCorta(a.hasta)}. Tu avance sigue guardado.`}</p>
        ${x.institucion ? `<p class="muted">Con ${esc(x.institucion)}</p>` : `<button class="btn sm ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-acct="comprar" data-curso="${esc(x.curso)}">${x.tipo === 'pago' ? 'Renovar' : 'Comprar acceso'}</button>`}</li>`;
    }).join('')}</ul>` : '<p class="muted">Aún no tienes cursos en tu cuenta.</p>'}
    ${admin ? `<nav class="adm-atajos" aria-label="Administración">${[['estudiantes', 'Estudiantes', 'user'], ['codigos', 'Códigos', 'lock'], ['solicitudes', 'Solicitudes', 'bag'], ['pedidos', 'Pedidos', 'doc'], ['asesorias', 'Asesorías', 'calendar'], ['ventas', 'Ventas', 'trophy']].map(([h, t, i]) => `<a href="admin/#${h}">${ICON[i]}<span>${t}</span></a>`).join('')}</nav><a class="btn brand" href="admin/">Panel de administración</a>` : `<div class="acct-actions"><button class="btn brand" data-acct="tienda">Tienda</button><button class="btn ghost" data-acct="canje">Añadir código</button></div>`}
    <div class="acct-foot">${admin || cuentaFija() ? '<span></span>' : '<button class="link-btn" data-acct="datos">Mis datos</button>'}<button class="link-btn" data-acct="salir">Cerrar sesión</button></div></section>`;
}
async function cuentaSalir() {
  cuentaEnvia(); usoEnvia();
  await estadoEnvia().catch(() => {});   // nada de lo ganado se queda sin subir
  if (Cuenta.sb) await Cuenta.sb.auth.signOut({ scope: 'local' }).catch(() => {});
  portalVe(false); Cuenta.user = null; Cuenta.perfil = null; Cuenta.accesos = []; Cuenta.inst = { nombres: [], metas: [] }; Cuenta.codigo = ''; tiendaFuera(); cuentaCache(); cuentaRol(); toast('Sesión cerrada.'); cuentaRepinta();
  if (!SIN_CANDADOS) authScreen();
}
function cuentaBind(root) {
  const acts = { portal: () => go('portal'), entrar: openEntrar, tienda: () => openTienda(), canje: openCanje, datos: () => datosScreen(false),
    comprar: b => openComprar(b.dataset.curso),
    copia: () => navigator.clipboard?.writeText(muestraCodigo(Cuenta.codigo)).then(() => toast('Código copiado.'), () => toast(muestraCodigo(Cuenta.codigo))),
    salir: () => ask({ title: '¿Cerrar sesión?', text: Cuenta.codigo ? `Para volver necesitarás tu código: ${muestraCodigo(Cuenta.codigo)}. Guárdalo antes.` : 'Tu avance queda guardado en tu cuenta.', ok: 'Cerrar sesión', cancel: 'Quedarme' })
      .then(si => { if (si) cuentaSalir(); }) };
  root.querySelectorAll('[data-acct]').forEach(b => { b.onclick = () => acts[b.dataset.acct](b); });
}
;
//#archivo js/clave.js
// Restablecer la contraseña (spec 2026-11-24-restablecer-clave): pedir el enlace, poner la contraseña nueva al
// volver del correo, y qué hacer si el enlace ya no sirve. Usa la pantalla de entrada (#auth) de js/cuenta.js.

// Dirección pública de la app: a ella vuelven los enlaces de los correos. Tiene que estar en Supabase →
// Authentication → URL Configuration (Site URL y Redirect URLs); si no está, Supabase manda al Site URL.
const APP_URL = 'https://zukaapp-mu.vercel.app/';
const correoVuelve = (loc = location) =>
  (/^(localhost|127\.0\.0\.1)$|\.localhost$/.test(loc.hostname) ? loc.origin + loc.pathname : APP_URL);

// Qué trae la dirección al volver del correo: 'nueva' (enlace de recuperar), 'vencido' (no sirve) o null.
function claveEnlace(hash = '', search = '') {
  const h = new URLSearchParams(hash.replace(/^#/, '')), q = new URLSearchParams(search);
  if (h.get('error_code') || h.get('error') || q.get('error_code')) return 'vencido';
  return h.get('type') === 'recovery' && h.get('access_token') ? 'nueva' : null;
}

const CLAVE_MIN = 8;
// Estado de los dos campos, para la lista que se va marcando y para el aviso al guardar.
function claveRevisa(clave = '', otra = '') {
  const largo = clave.length >= CLAVE_MIN, igual = !!otra && clave === otra;
  return { largo, igual, error: !largo ? `La contraseña debe tener ${CLAVE_MIN} caracteres o más.` : !igual ? 'Las dos contraseñas no son iguales.' : null };
}

// Vista abierta por un enlace del correo: mientras está, el aviso de sesión de Supabase no la cierra.
// Se lee al cargar el archivo, antes de que Supabase limpie la dirección.
const Clave = { vista: typeof location === 'undefined' ? null : claveEnlace(location.hash, location.search) };
function claveAlAbrir() {
  if (!Clave.vista) return false;
  if (Clave.vista === 'vencido') history.replaceState(history.state, '', location.pathname);
  claveScreen(Clave.vista);
  return true;
}
// Supabase avisó que se entró con el enlace (por si la dirección no lo decía).
function claveRecupera() {
  if (!Clave.vista) claveScreen(Clave.vista = 'nueva');
}
function claveSal() {   // a la pantalla de entrada
  Clave.vista = null;
  if (Cuenta.user) authCerrar(); else authScreen('correo');
}

const claveCampo = (name, label) => `<div class="fld"><label for="cl-${name}">${label}</label>
  <span class="clave-in"><input id="cl-${name}" name="${name}" type="password" autocomplete="new-password" minlength="${CLAVE_MIN}" required aria-describedby="cl-reglas">
  <button type="button" data-ver="cl-${name}" aria-pressed="false" aria-label="Mostrar: ${label.toLowerCase()}">Mostrar</button></span></div>`;

const CLAVE_SOBRE = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>';
const claveForm = (campos, ok) => `<form class="acct-form" novalidate>${campos}
  <p class="form-msg" role="alert" hidden></p><button class="btn main" type="submit">${ok}</button></form>`;

function claveHTML(vista, correo = '') {
  const pedir = () => claveForm(campo('correo', 'Correo', 'email', `autocomplete="email" inputmode="email" value="${esc(correo)}" required`), 'Enviar enlace')
    + `<button class="link-btn" type="button" data-sal>${Cuenta.user ? 'Volver' : 'Volver a iniciar sesión'}</button>`;
  const V = {
    pedir: () => [ICON.lock, 'Recupera tu contraseña', 'Escribe el correo de tu cuenta y te enviamos un enlace para poner una contraseña nueva.', pedir()],
    enviado: () => [CLAVE_SOBRE, 'Revisa tu correo', `Si hay una cuenta con <b>${esc(correo)}</b>, te llegará un enlace. Si no lo ves, mira en correo no deseado.`,
      '<button class="btn main" type="button" data-sal>Entendido</button><button class="link-btn" type="button" data-otro>No me llegó: pedir otro</button>'],
    nueva: () => [ICON.lock, 'Crea tu contraseña nueva', 'Elige una que no uses en otros sitios.', claveForm(
      claveCampo('clave', 'Contraseña nueva') + claveCampo('otra', 'Repite la contraseña')
      + `<ul class="clave-reglas" id="cl-reglas"><li data-r="largo">${ICON.check}${CLAVE_MIN} caracteres o más</li><li data-r="igual">${ICON.check}Las dos son iguales</li></ul>`,
      'Guardar contraseña') + '<button class="link-btn" type="button" data-cancela>Cancelar</button>'],
    vencido: () => [ICON.clock, 'Este enlace ya no sirve', 'Los enlaces se usan una sola vez y vencen pronto. Escribe tu correo y te enviamos otro para entrar.', pedir()],
    lista: () => [ICON.check, 'Contraseña cambiada', 'Ya tienes la sesión abierta aquí. En tus otros dispositivos, entra con la contraseña nueva.',
      '<button class="btn main" type="button" data-empieza>Empezar a estudiar</button>'],
  };
  const [ico, titulo, texto, cuerpo] = V[vista]();
  return `<div class="auth-in clave clave-${vista}"><div class="auth-brand">${zukaWord()}</div>
    <span class="clave-ico">${ico}</span><h1 tabindex="-1">${titulo}</h1><p class="muted">${texto}</p>${cuerpo}</div>`;
}

function claveScreen(vista, correo = '') {
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  el.onclick = null;   // tocar afuera no la cierra: se perdería lo escrito
  el.innerHTML = claveHTML(vista, correo);
  el.scrollTop = 0;
  const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el);
  const error = t => { msg.textContent = t; msg.className = 'form-msg bad'; msg.hidden = false; };
  $('[data-sal]', el)?.addEventListener('click', claveSal);
  $('[data-otro]', el)?.addEventListener('click', () => claveScreen('pedir', correo));
  $('[data-empieza]', el)?.addEventListener('click', () => { Clave.vista = null; authCerrar(); go('learn'); });
  // Sin cambiarla no se queda la sesión que abrió el enlace.
  $('[data-cancela]', el)?.addEventListener('click', async () => {
    try { await Cuenta.sb?.auth.signOut({ scope: 'local' }); } catch (e) { /* ya no había sesión */ }
    Cuenta.user = null;
    claveSal();
  });
  el.querySelectorAll('[data-ver]').forEach(x => x.onclick = () => {
    const i = $('#' + x.dataset.ver, el), ver = i.type === 'password';
    i.type = ver ? 'text' : 'password'; x.textContent = ver ? 'Ocultar' : 'Mostrar'; x.setAttribute('aria-pressed', ver);
  });
  if (vista === 'nueva') f.oninput = () => {
    const r = claveRevisa(f.clave.value, f.otra.value);
    el.querySelectorAll('[data-r]').forEach(li => li.classList.toggle('on', r[li.dataset.r]));
  };
  if (f) f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    msg.hidden = true;
    const d = Object.fromEntries(new FormData(f));
    const mal = vista === 'nueva' ? claveRevisa(d.clave, d.otra).error : /^\S+@\S+\.\S+$/.test(d.correo.trim()) ? null : 'Ese correo no parece válido.';
    if (mal || sinRed()) return error(mal || sinRed());
    const txt = b.textContent; b.disabled = true; b.textContent = 'Un momento…';
    let r;
    try {
      r = vista === 'nueva' ? await Cuenta.sb.auth.updateUser({ password: d.clave })
        : await Cuenta.sb.auth.resetPasswordForEmail(d.correo.trim(), { redirectTo: correoVuelve() });
    } catch (x) { r = { error: x }; }
    if (!f.isConnected) return;
    b.disabled = false; b.textContent = txt;
    if (r.error) {
      const t = `${r.error.code || ''} ${r.error.name || ''} ${r.error.message || ''}`;
      if (vista === 'nueva' && /session|jwt|expired/i.test(t)) return claveScreen(Clave.vista = 'vencido');
      return error(/same_password/.test(t) ? 'Esa es tu contraseña actual. Elige otra.' : authError(r.error));
    }
    if (vista !== 'nueva') { Clave.vista = null; return claveScreen('enviado', d.correo.trim()); }
    Cuenta.sb.auth.signOut({ scope: 'others' }).then(() => {}, () => {});   // se cierran las demás sesiones
    claveScreen(Clave.vista = 'lista');
  };
  // El foco va al primer campo, o al título para que el lector de pantalla anuncie la vista.
  ($('input', el) || $('h1', el)).focus({ preventScroll: true });
}

// «Olvidé mi contraseña» (desde la pantalla de entrada o la hoja de iniciar sesión).
function openOlvide() {
  const correo = ($('#sheet.open input[name="correo"]') || $('#auth input[name="correo"]'))?.value.trim() || '';
  closeSheet(false);
  claveScreen('pedir', correo);
}
;
//#archivo js/datos.js
// Datos personales del estudiante (spec 2026-11-24-acceso-por-codigo): obligatorios con un curso pagado y vigente. Tres
// pasos cortos en la pantalla #auth. Con `fija` no se puede saltar; desde «Tú» se abre para editarlos.

const DATOS_PASOS = [
  { t: 'Completa tus datos', p: 'Los usamos para tu plan, tu soporte y para recomendarte qué estudiar.', campos: ['nombre', 'correo', 'telefono', 'ciudad'] },
  { t: 'Sobre ti', p: 'Así conocemos a quienes estudian en Zuka.', campos: ['genero', 'edad', 'ocupacion', 'institucion'] },
  { t: 'Tu meta', p: 'Con esto sabemos cómo ayudarte mejor.', campos: ['meta', 'presentacion', 'horas', 'dificultad', 'medio', 'acepta'] },
];
const datosOpc = (k, v) => `<option value="">Elige…</option>${DATOS[k].map(([id, t]) => `<option value="${id}"${id === v ? ' selected' : ''}>${t}</option>`).join('')}`;
function datosCampo(k, d) {
  const inp = (label, type, extra) => `<label class="fld"><span>${label}</span><input name="${k}" type="${type}" value="${esc(d[k] || '')}" ${extra}></label>`;
  const sel = label => `<label class="fld"><span>${label}</span><select name="${k}">${datosOpc(k, d[k])}</select></label>`;
  return ({
    nombre: () => inp('Nombre completo', 'text', 'autocomplete="name" maxlength="80" required'),
    correo: () => inp('Correo', 'email', 'autocomplete="email" inputmode="email" maxlength="120" required'),
    telefono: () => inp('Celular (con WhatsApp)', 'tel', 'autocomplete="tel" inputmode="tel" maxlength="30" required'),
    ciudad: () => inp('Ciudad o municipio', 'text', 'autocomplete="address-level2" maxlength="80" required'),
    genero: () => sel('Género'), edad: () => sel('Rango de edad'), ocupacion: () => sel('¿Qué haces ahora?'),
    institucion: () => inp('Colegio, universidad o institución (opcional)', 'text', 'maxlength="120"'),
    meta: () => inp('¿Qué carrera o meta tienes? (opcional)', 'text', 'maxlength="120" placeholder="Por ejemplo, Medicina en la UdeA"'),
    presentacion: () => sel('¿Cuándo presentas tu próximo examen? (opcional)'),
    horas: () => sel('¿Cuánto puedes estudiar a la semana? (opcional)'),
    dificultad: () => inp('¿Qué tema te cuesta más? (opcional)', 'text', 'maxlength="120"'),
    medio: () => sel('¿Cómo conociste Zuka? (opcional)'),
    acepta: () => `<label class="check"><input type="checkbox" name="acepta"${d.acepta ? ' checked' : ''}><span data-acepta>${datosAcepta(d.edad)}</span></label>
      <label class="check"><input type="checkbox" name="acepta_mensajes"${d.acepta_mensajes ? ' checked' : ''}><span>Quiero recibir novedades y consejos por WhatsApp o correo (opcional).</span></label>`,
  })[k]();
}
const datosAcepta = edad => (esMenor(edad)
  ? 'Soy menor de edad y mi madre, padre o acudiente autoriza que Zuka guarde estos datos para prestar el servicio (Ley 1581 de 2012).'
  : 'Autorizo que Zuka guarde estos datos para prestar el servicio (Ley 1581 de 2012). Puedo pedir que se corrijan o se borren.');

let datosAbierta = false;
// ¿Hay que pedirlos ya? Nunca en medio de una lección.
function datosPide() {
  if (datosAbierta || lessonClose || tourOpen() || Clave.vista || $('#overlay.open') || !datosFaltan(Cuenta.perfil, Cuenta.accesos)) return false;
  datosScreen(true);
  return true;
}
function datosScreen(fija) {
  if (!fija && cuentaFija()) return toast('Tus datos los cambia el gestor de tu institución.');
  datosAbierta = true;
  const p = Cuenta.perfil || {};
  const d = { ...Object.fromEntries(DATOS_PASOS.flatMap(x => x.campos).map(k => [k, p[k] || ''])), acepta: !!p.datos_en, acepta_mensajes: !!p.acepta_mensajes };
  let paso = 0;
  let el = $('#auth');
  if (!el) { el = document.createElement('div'); el.id = 'auth'; document.body.appendChild(el); }
  el.onclick = null;
  const toma = () => new FormData($('form', el)).forEach((v, k) => { d[k] = v; });
  const guarda = () => { toma(); ['acepta', 'acepta_mensajes'].forEach(k => { const c = $(`[name=${k}]`, el); if (c) d[k] = c.checked; }); };
  const cierra = () => { datosAbierta = false; authCerrar(); };
  const pinta = (foco = true, aviso = '') => {
    const s = DATOS_PASOS[paso], fin = paso === DATOS_PASOS.length - 1;
    el.innerHTML = `<div class="auth-in clave datos"><div class="auth-brand">${zukaWord()}</div>
      <p class="datos-paso">Paso ${paso + 1} de ${DATOS_PASOS.length}</p><span class="mini-bar" aria-hidden="true"><i style="width:${((paso + 1) / DATOS_PASOS.length) * 100}%"></i></span>
      <h1 tabindex="-1">${fija && !paso ? '¡Tu plan está activo! ' : ''}${s.t}</h1><p class="muted">${s.p}</p>
      <form class="acct-form" novalidate>${s.campos.map(k => datosCampo(k, d)).join('')}
        <p class="form-msg bad" role="alert"${aviso ? '' : ' hidden'}>${aviso}</p>
        <button class="btn main" type="submit">${fin ? 'Guardar' : 'Continuar'}</button></form>
      <div class="form-links">${paso ? '<button type="button" data-atras>Atrás</button>' : ''}${fija ? '<button type="button" data-salir>Cerrar sesión</button>' : '<button type="button" data-cierra>Cancelar</button>'}</div></div>`;
    el.scrollTop = 0;
    const f = $('form', el), msg = $('.form-msg', el), b = $('button[type=submit]', el);
    const error = ({ campo: k, texto }) => {
      const en = DATOS_PASOS.findIndex(x => x.campos.includes(k));
      if (en !== paso) { paso = en; pinta(false, texto); } else { msg.textContent = texto; msg.hidden = false; }
      $(`[name=${k}]`, el)?.focus();
    };
    $('[data-atras]', el)?.addEventListener('click', () => { guarda(); paso--; pinta(); });
    $('[data-cierra]', el)?.addEventListener('click', cierra);
    $('[data-salir]', el)?.addEventListener('click', () => { datosAbierta = false; cuentaSalir(); });
    f.onsubmit = async e => {
      e.preventDefault();
      if (b.disabled) return;
      guarda(); msg.hidden = true;
      const mal = datosError(d);
      if (mal && (fin || s.campos.includes(mal.campo))) return error(mal);
      if (!fin) { paso++; return pinta(); }
      if (sinRed()) return error({ campo: 'acepta', texto: sinRed() });
      b.disabled = true; b.textContent = 'Un momento…';
      let r;
      try { r = await Cuenta.sb.rpc('guardar_datos', { p: d }); } catch (x) { r = { error: x }; }
      if (!f.isConnected) return;
      b.disabled = false; b.textContent = 'Guardar';
      if (r.error) return error({ campo: 'acepta', texto: /fetch|network/i.test(r.error.message || '') ? canjeError('red') : r.error.code === '42501' ? r.error.message : 'No se pudieron guardar. Inténtalo de nuevo.' });
      S.name = d.nombre.trim().split(/\s+/)[0].slice(0, 24); save();
      await cuentaPerfil();
      cierra(); toast('Datos guardados. ¡Gracias!'); cuentaRepinta();
    };
    if (foco) ($('h1', el)).focus({ preventScroll: true });
  };
  pinta();
}
;
//#archivo js/tienda.js
// Tienda: pestaña con el catálogo (cursos, paquetes, libros, asesorías) y mis pedidos (spec 2026-11-24-tienda-libros). El
// pedido (dirección, total y pago) se hace en una capa propia (#tienda) sobre la app.
// El precio lo pone la base al crear el pedido (crear_pedido); aquí solo se muestra. Se paga por fuera y el administrador
// confirma en el panel.

// ---------- lógica pura ----------
// Los libros no se venden sueltos, solo el paquete (spec 2026-11-25-paquete-libros).
const libroSuelto = a => ['fisico', 'digital'].includes(a.tipo) && ((a.da || {}).fisicos || (a.da || {}).libros || []).length === 1;
const tiendaPrecio = (a, conPlan) => (conPlan && a.precio_plan != null ? a.precio_plan : a.precio);
const tiendaFisicos = (items, arts) => items.reduce((t, x) => t + ((arts.find(a => a.id === x.id) || { da: {} }).da.fisicos || []).length * x.cantidad, 0);
// Cuentas del carrito: { subtotal, fisicos, envio, total }. `items`: [{ id, cantidad }].
function tiendaCuenta(items, arts, conPlan, zona) {
  const subtotal = items.reduce((t, x) => { const a = arts.find(y => y.id === x.id); return t + (a ? tiendaPrecio(a, conPlan) || 0 : 0) * x.cantidad; }, 0);
  const fisicos = tiendaFisicos(items, arts), envio = fisicos && zona ? zona.precio * Math.ceil(fisicos / 8) : 0;
  return { subtotal, fisicos, envio, total: subtotal + envio };
}
const PEDIDO_ESTADO = { pendiente: ['warn', 'Por pagar'], pagado: ['ok', 'Pagado'], preparando: ['ok', 'En preparación'], enviado: ['ok', 'Enviado'], entregado: ['ok', 'Entregado'], cancelado: ['', 'Cancelado'] };
const pedidoTexto = p => `Hola, hice el pedido ${p.id} en Zuka: ${p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${x.nombre}`).join(', ')}. Total: ${cop(p.total)}${p.envio ? ` (incluye envío a ${p.direccion.ciudad})` : ''}.${p.codigo ? ` Mi código es ${muestraCodigo(p.codigo)}.` : ''}`;
const direccionError = d => [['nombre', 'Escribe quién recibe.'], ['telefono', 'Escribe el celular de quien recibe.'], ['departamento', 'Escribe el departamento.'], ['ciudad', 'Escribe la ciudad o el municipio.'], ['direccion', 'Escribe la dirección.']]
  .map(([campo, texto]) => (String(d[campo] || '').trim() ? null : { campo, texto })).find(Boolean) || null;

// ---------- datos ----------
// Tienda.* se llena al entrar (artículos, envíos y libros son públicos; lo demás es de la cuenta).
const Tienda = { arts: [], envios: [], libros: [], mios: [], saldo: { general: 0, universidad: 0, grupo: 0 }, pedidos: [], carro: {}, vista: 'todo', cargada: false };
async function tiendaCarga() {
  if (!Cuenta.sb) return false;
  const [a, e, l] = await Promise.all([Cuenta.sb.from('articulos').select('*'), Cuenta.sb.from('envios').select('*'), Cuenta.sb.from('libros').select('*')]);
  if (a.error || e.error || l.error) return false;
  const orden = (x, y) => x.orden - y.orden;
  Tienda.libros = l.data.sort((x, y) => x.id - y.id);
  // Lo digital no se vende hasta que sus libros estén subidos y publicados.
  const listo = x => (x.da.libros || []).every(id => Tienda.libros.some(b => b.id === id && libroListo(b)));
  Tienda.arts = a.data.filter(x => x.activo && x.precio != null && !libroSuelto(x) && listo(x)).sort(orden);
  Tienda.envios = e.data.filter(x => x.activo).sort(orden);
  Tienda.cargada = true;
  return tiendaMios();
}
async function tiendaMios() {
  if (!Cuenta.sb || !Cuenta.user) { Tienda.mios = []; Tienda.pedidos = []; return true; }
  const uid = Cuenta.user.id;
  const [m, s, p] = await Promise.all([Cuenta.sb.from('libros_acceso').select('libro,hasta').eq('usuario', uid), Cuenta.sb.rpc('mi_saldo'), Cuenta.sb.from('pedidos').select('*').eq('usuario', uid)]);
  if (!Cuenta.user || Cuenta.user.id !== uid) return false;
  if (m.data) Tienda.mios = m.data.filter(x => vigente(x.hasta, Date.now()));
  if (s.data) Tienda.saldo = s.data;
  if (p.data) Tienda.pedidos = p.data.sort((x, y) => y.id - x.id);
  return true;
}
const libroMio = id => cuentaEsAdmin() || Tienda.mios.some(x => x.libro === id);
const libroListo = l => l.publicado && l.version > 0 && l.paginas > 0;
const conPlan = () => tienePago((Cuenta.accesos || []).filter(a => !a.institucion));   // lo que da una institución no es una compra
const carroItems = () => Object.entries(Tienda.carro).filter(([id]) => Tienda.arts.some(a => a.id === id)).map(([id, cantidad]) => ({ id, cantidad }));

// ---------- pestaña ----------
function tiendaAtras() {   // botón atrás (js/back.js): cierra el libro o el pedido
  if (sheetIsOpen || dialogOpen()) return false;
  if (lectorAtras()) return true;
  const el = $('#tienda');
  if (!el) return false;
  if (el.dataset.paso !== 'enviando') { tiendaCerrar(); if (tab === 'tienda') tiendaPinta(); }   // enviando: se está creando el pedido
  return true;
}
function tiendaCerrar() { const el = $('#tienda'); if (!el) return; el.remove(); tiendaInerte(false); }
function tiendaInerte(on) { ['#topbar', '#view', '#tabbar'].forEach(s => { const x = $(s); if (x) x.inert = on; }); }
function openTienda(vista = 'todo') {
  if (cuentaDeColegio()) return colegioAvisa();
  closeSheet(false); tiendaCerrar();
  Tienda.vista = vista;
  go('tienda'); view.scrollTop = 0;
}
// La pinta go('tienda'); los datos se ponen al día cada vez que se entra.
function renderTienda() {
  tiendaPinta('', false);
  tiendaCarga().catch(() => false).then(ok => {
    if (tab !== 'tienda' || lector || $('#tienda')) return;
    if (ok || Tienda.cargada) tiendaPinta('', false);
    else {
      $('.td-in', view).innerHTML = '<p class="td-vacio">No se pudo cargar la tienda. Revisa tu conexión.</p><button class="btn ghost td-otra" type="button">Reintentar</button>';
      $('.td-otra', view).onclick = renderTienda;
    }
  });
}
const tiendaPortada = (id, cls = '') => `<img class="td-portada ${cls}" src="brand/libros/${id}.webp" alt="" width="180" height="255" loading="lazy">`;
// Las horas son para cursos comprados: se venden a quien tiene uno o lo lleva en el mismo pedido.
const tiendaHorasOk = () => conPlan() || cuentaEsAdmin() || carroItems().some(x => (Tienda.arts.find(a => a.id === x.id).da.cursos || []).length);
const tiendaBoton = a => `<span class="td-ctl" data-ctl="${esc(a.id)}">${tiendaBotonIn(a)}</span>`;
function tiendaBotonIn(a) {
  const n = Tienda.carro[a.id] || 0;
  if (a.tipo === 'asesoria' && !n && !tiendaHorasOk()) return '<small class="td-plan td-solo">Con un curso comprado</small>';
  if (!n) return `<button class="btn sm main brand" type="button" data-mas="${a.id}">Añadir<span class="td-sr"> ${esc(a.nombre)}</span></button>`;
  return a.tipo === 'fisico' || a.tipo === 'asesoria'
    ? `<span class="td-cant" role="group" aria-label="Cantidad de ${esc(a.nombre)}"><button type="button" data-menos="${a.id}" aria-label="Quitar uno">−</button><b>${n}</b><button type="button" data-mas="${a.id}" aria-label="Añadir uno"${n >= 10 ? ' disabled' : ''}>+</button></span>`
    : `<button class="btn sm ghost" type="button" data-menos="${a.id}">Quitar</button>`;
}
function tiendaPrecioHTML(a) {
  const p = tiendaPrecio(a, conPlan());
  return `<strong class="td-precio">${p !== a.precio ? `<s>${cop(a.precio)}</s> ` : ''}${cop(p)}</strong>${a.precio_plan != null && !conPlan() ? `<small class="td-plan">${cop(a.precio_plan)} si ya tienes plan</small>` : ''}`;
}
const tiendaDe = tipo => Tienda.arts.filter(a => a.tipo === tipo);
const tiendaPal = id => (typeof ART_PAL !== 'undefined' && ART_PAL[id]) || { blue: '#4f7cff', deep: '#24419c', soft: '#9db7ff', pale: '#dbe5ff', sun: '#6fd3ff' };
const tiendaColor = id => { const p = tiendaPal(id); return `--a:${p.blue};--b:${p.deep};--d:${p.soft};--e:${p.sun};--f:${p.pale}`; };
// Lo que costaría por separado lo que trae un paquete (0 si algo no se vende aparte): el ahorro es de verdad. Los libros cuentan como su paquete.
function tiendaSuelto(a, arts, productos, plan = false) {
  const d = a.da || {}, vale = x => (x ? tiendaPrecio(x, plan) : NaN), juego = (tipo, k, ids) => vale(arts.find(x => x.id !== a.id && x.tipo === tipo && !((x.da || {}).cursos || []).length && ((x.da || {})[k] || []).join() === ids.join()));
  const partes = [...(d.cursos || []).map(c => (productos || []).filter(p => p.curso === c && p.activo && p.dias === d.dias).map(p => p.precio)[0]),
    // Los digitales que acompañan a los mismos impresos van de regalo: no se cuentan.
    ...((d.fisicos || []).length ? [juego('fisico', 'fisicos', d.fisicos)] : (d.libros || []).length ? [juego('digital', 'libros', d.libros)] : []),
    ...(d.horas ? [vale(arts.find(x => x.id !== a.id && x.tipo === 'asesoria' && x.da.horas === 1 && x.da.horas_tipo === d.horas_tipo)) * d.horas] : [])];
  return partes.length > 1 || (d.horas > 1) ? (partes.every(Number.isFinite) ? partes.reduce((x, y) => x + y, 0) : 0) : 0;
}
const tiendaAhorro = a => Math.max(0, tiendaSuelto(a, Tienda.arts, Cuenta.productos, conPlan()) - tiendaPrecio(a, conPlan()));
const tiendaAhorroHTML = a => { const n = tiendaAhorro(a); return n >= 1000 ? `<span class="td-ahorro">Ahorras ${cop(n)}</span>` : ''; };
const tiendaCheck = xs => `<ul class="td-check">${xs.filter(Boolean).map(x => `<li>${ICON.check}<span>${x}</span></li>`).join('')}</ul>`;
// Pila de libros en perspectiva.
const tiendaPila = ids => `<span class="td-pila" aria-hidden="true">${ids.map((id, i) => `<span class="td-tomo" style="--i:${i - (ids.length - 1) / 2}">${tiendaPortada(id)}</span>`).join('')}</span>`;

// Paquete: banda de color con lo que trae, lista y precio con su ahorro.
function tiendaPaqHTML(a) {
  const d = a.da || {}, cs = (d.cursos || []).map(id => COURSES.find(c => c.id === id)).filter(Boolean), meses = Math.round((d.dias || 0) / 30);
  return `<article class="td-paq${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}" data-lleva="${esc(a.id)}" style="${tiendaColor((cs[0] || {}).id)}">
    <div class="td-escena${(d.libros || d.fisicos || []).length ? '' : ' luz'}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}${tiendaAhorroHTML(a)}
      <span class="td-artes">${(d.libros || d.fisicos || []).length ? tiendaPila(d.libros || d.fisicos) : cs.map(c => courseArt(c, 'xl')).join('')}</span></div>
    <div class="td-cont"><h3>${esc(a.nombre)}</h3>
      ${tiendaCheck([...cs.map(c => `${esc(c.name)}${meses ? `, ${mesesTexto(meses)}` : ''}`), (d.fisicos || []).length && `${d.fisicos.length} ${d.fisicos.length === 1 ? 'libro impreso' : 'libros impresos'} a color, en tu casa`,
    (d.libros || []).length && `${d.libros.length} ${d.libros.length === 1 ? 'libro digital' : 'libros digitales'} para leer en la app`, d.horas && `${d.horas === 1 ? '1 hora' : `${d.horas} horas`} de asesoría`])}
      <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div></article>`;
}
// Curso: su figura en grande sobre su color, qué trae y el tiempo, que se elige en la misma tarjeta.
function tiendaCursoHTML(c) {
  const a = accesoCurso(Cuenta.accesos, c.id), ps = productosDe(c.id), sel = ps.find(p => p.id === (Tienda.plan || {})[c.id]) || ps[ps.length - 1];
  const ex = c.units.reduce((t, u) => t + u.lessons.reduce((n, l) => n + l.ex.length, 0), 0), tiene = !accesoCursoFila(c.id)?.institucion && (a.estado === 'pago' || a.estado === 'vencido');
  return `<article class="td-curso" data-curso="${esc(c.id)}" style="--c:${c.color};${tiendaColor(c.id)}"><div class="td-escena luz">${accesoPill(a)}<span class="td-artes">${courseArt(c, 'xl')}</span></div>
    <div class="td-cont"><h3>${esc(c.name)}</h3><p>${esc(c.tagline || '')}</p>
      <p class="td-datos"><span><b>${c.units.length}</b> ${c.units.length === 1 ? 'mundo' : 'mundos'}</span><span><b>${lessonsOf(c).length}</b> lecciones</span><span><b>${ex}</b> ejercicios</span></p>
      <div class="td-mundos" tabindex="0" role="group" aria-label="Mundos de ${esc(c.name)}">${c.units.slice(0, 14).map(u => { const w = WORLDS[u.world] || { name: u.title }; return `<figure><span class="world-art" aria-hidden="true">${w.art || ''}</span><figcaption>${esc(w.name)}</figcaption></figure>`; }).join('')}${c.units.length > 14 ? `<p>y ${c.units.length - 14} más</p>` : ''}</div>
      ${ps.length > 1 ? `<div class="td-dur" role="radiogroup" aria-label="Duración de ${esc(c.name)}">${ps.map(p => `<button type="button" role="radio" aria-checked="${p === sel}" data-dur="${esc(p.id)}" data-de="${esc(c.id)}">${mesesTexto(p.meses)}</button>`).join('')}</div>` : ''}
      <div class="td-pie"><span><strong class="td-precio" data-v-precio="${sel && sel.precio != null ? sel.precio : ''}">${sel && sel.precio != null ? cop(sel.precio) : 'Por WhatsApp'}</strong><small class="td-plan">${!sel ? '' : sel.precio != null && sel.meses > 1 ? `${mesesTexto(sel.meses)} · ${cop(sel.precio / sel.meses)} al mes` : mesesTexto(sel.meses)}</small></span>
        <button class="btn ${a.estado === 'pago' ? 'ghost' : 'main brand'}" type="button" data-compra="${esc(c.id)}">${tiene ? 'Renovar' : 'Comprar'}</button></div></div></article>`;
}
const tiendaJuegos = tipo => tiendaDe(tipo).filter(a => ((tipo === 'fisico' ? a.da.fisicos : a.da.libros) || []).length > 1);
const librosPaginas = () => Tienda.libros.reduce((s, l) => s + (l.paginas || 0), 0);
// Paquete de libros: banda ancha con los tomos abiertos en abanico y lo que trae.
const tiendaJuegoHTML = a => `<article class="td-banda${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}" data-lleva="${esc(a.id)}" style="${tiendaColor('preuda')}"><div class="td-cont"><span class="td-tipo">${a.tipo === 'fisico' ? 'Impresos, con envío' : 'Digitales, en la app'}</span><h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p>${tiendaCheck(Tienda.libros.map(l => `${esc(l.titulo)}${l.paginas ? `, ${l.paginas} páginas` : ''}`))}${librosPaginas() ? `<p class="td-pags"><b>${librosPaginas()}</b> páginas a color en total</p>` : ''}
  <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div><div class="td-escena">${tiendaPila(Tienda.libros.map(l => l.id))}</div></article>`;
const tiendaBandas = () => tiendaLista('td-bandas', [...tiendaJuegos('fisico'), ...tiendaJuegos('digital')].map(tiendaJuegoHTML).join(''));
// Cada tomo se mira y se gira; se compra el paquete.
function tiendaLibroHTML(l) {
  const ver = libroListo(l) || cuentaEsAdmin();
  return `<article class="td-libro" data-libro="${l.id}"><div class="td-escena">${tiendaTomo3D(l)}<small class="td-gira" aria-hidden="true">Arrastra para girarlo</small></div><div class="td-cont"><span class="td-tipo">${esc(l.subtitulo)}</span><h3>${esc(l.titulo)}</h3><p>${l.paginas ? `${l.paginas} páginas a color` : ''}</p>
    ${ver ? `<button class="btn sm ${libroMio(l.id) ? 'main brand' : 'ghost'}" type="button" data-leer="${l.id}"${l.version ? '' : ' disabled'}>${libroMio(l.id) ? 'Leer' : 'Ver muestra'}</button>` : ''}</div></article>`;
}
// Libro en tres dimensiones: tapa, lomo, hojas y contratapa; gira con --g.
const tiendaTomo3D = l => `<span class="lb3" data-gira aria-hidden="true"><span class="lb3-in"><span class="lb3-t">${tiendaPortada(l.id)}</span><span class="lb3-l"><i>${esc(l.titulo)}</i></span><span class="lb3-h"></span><span class="lb3-c"><i>ZUKA</i></span></span></span>`;
// Asesoría: las horas en grande y cuánto sale cada una.
function tiendaHoraHTML(a) {
  const h = a.da.horas || 1, p = tiendaPrecio(a, conPlan());
  return `<article class="td-hora${a.destacado ? ' top' : ''}${Tienda.carro[a.id] ? ' on' : ''}" data-art="${esc(a.id)}">${a.destacado ? '<span class="td-top">Recomendado</span>' : ''}
    <div class="td-reloj" aria-hidden="true" style="--h:${Math.min(8, h)}"><b>${h}</b><small>${h === 1 ? 'hora' : 'horas'}</small></div>
    <h3>${esc(a.nombre)}</h3><p>${esc(a.detalle)}</p><small class="td-plan">${h > 1 ? `${cop(p / h)} por hora` : ''}</small>${tiendaAhorroHTML(a)}
    <div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></article>`;
}
const tiendaSec = (t, html, v = '', sub = '') => (html ? `<section><div class="td-tit"><div><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${v ? `<button class="link-btn" type="button" data-v="${v}">Ver todo</button>` : ''}</div>${html}</section>` : '');
const tiendaLista = (cls, html) => (html ? `<div class="${cls}">${html}</div>` : '');
const tiendaCursosHTML = () => tiendaLista('td-cursos', cursosVisibles().map(tiendaCursoHTML).join(''));

// ---------- vitrina: los productos en una rueda que se desliza ----------
// Qué sale y en qué orden: el Preuniversitario si no lo tiene, los paquetes, el juego impreso, los demás cursos y las horas.
function tiendaVitrinaItems() {
  const cs = cursosVisibles(), arts = tiendaDe('paquete').concat(tiendaJuegos('fisico')), curso1 = c => {
    const pr = productosDe(c.id).filter(p => p.precio != null).sort((x, y) => x.precio / x.meses - y.precio / y.meses)[0];
    return { k: 'curso', id: c.id, pal: c.id, t: c.name, p: c.tagline || '', fig: courseArt(c, 'xl'), precio: pr ? pr.precio / pr.meses : null, nota: pr ? `al mes, en el plan de ${mesesTexto(pr.meses)}` : '', desde: !!pr };
  };
  const noTiene = cs.filter(c => !comprado(Cuenta.accesos, c.id, true)), primero = noTiene.filter(c => c.id === 'preuda'), otros = noTiene.filter(c => c.id !== 'preuda');
  const libros = ids => tiendaPila(ids.slice(0, 4));
  const art = a => { const c = cs.find(x => x.id === (a.da.cursos || [])[0]), ids = a.da.fisicos || a.da.libros || []; return { k: 'art', id: a.id, a, pal: (c || { id: 'preuda' }).id, t: a.nombre, p: a.detalle, fig: ids.length ? libros(ids) + (c ? `<span class="vt-mini">${courseArt(c, 'xl')}</span>` : '') : (a.da.cursos || []).map(id => cs.find(x => x.id === id)).filter(Boolean).map(x => courseArt(x, 'xl')).join(''), precio: tiendaPrecio(a, conPlan()), nota: '' }; };
  const A = arts.map(art), B = otros.map(curso1), mez = [];   // intercalados: el color cambia de uno a otro
  for (let i = 0; i < Math.max(A.length, B.length); i++) mez.push(...[B[i], A[i]].filter(Boolean));
  return [...primero.map(curso1), ...mez].slice(0, 9);
}
// Índice más cercano de una rueda que no da la vuelta. Pura.
const tiendaCerca = (x, n) => Math.max(0, Math.min(n - 1, Math.round(x)));
function tiendaHeroHTML() {
  const xs = tiendaVitrinaItems();
  if (!xs.length) return '';
  return `<section class="td-hero vt" aria-roledescription="carrusel" aria-label="Destacados"><div class="vt-fondo"></div><div class="vt-rueda" tabindex="0" role="group" aria-label="Desliza o usa las flechas">${xs.map((x, i) => `<div class="vt-it" data-i="${i}" style="${tiendaColor(x.pal)}"><div class="vt-cart">${x.fig}</div><span class="vt-piso"></span></div>`).join('')}</div>
    <div class="vt-txt" aria-live="polite"></div>
    <button class="vt-fl ant" type="button" aria-label="Anterior">${ICON.back}</button><button class="vt-fl sig" type="button" aria-label="Siguiente">${ICON.right}</button>
    <div class="vt-ptos">${xs.map((x, i) => `<button type="button" data-pto="${i}" aria-label="${esc(x.t)}"></button>`).join('')}</div></section>`;
}
function tiendaVitrinaViva(el) {
  const h = $('.vt', el); if (!h) return;
  const xs = tiendaVitrinaItems(), rueda = $('.vt-rueda', h), its = [...h.querySelectorAll('.vt-it')], txt = $('.vt-txt', h), n = its.length, quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let p = tiendaCerca(Tienda.vt || 0, n), meta = p, sel = -1, raf = 0, id = null, x0 = 0, y0 = 0, p0 = 0, movio = false;
  const info = i => {
    if (i === sel) return;
    sel = Tienda.vt = i; const x = xs[i];
    txt.innerHTML = `<h2>${esc(x.t)}</h2><p>${esc(x.p)}</p><div class="vt-acc">${x.precio != null ? `<span>${x.desde ? '<small>Desde</small>' : ''}<strong>${cop(x.precio)}</strong>${x.nota ? `<small>${x.nota}</small>` : ''}</span>` : ''}${x.k === 'curso' ? `<button class="btn main" type="button" data-compra="${esc(x.id)}">Comprar</button>` : tiendaBoton(x.a)}</div>${x.a ? tiendaAhorroHTML(x.a) : ''}`;
    h.style.cssText = tiendaColor(x.pal);
    h.querySelectorAll('[data-pto]').forEach((b, k) => { if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    $('.ant', h).disabled = i === 0; $('.sig', h).disabled = i === n - 1;
  };
  const pinta = () => {
    its.forEach((e, i) => { const d = i - p, a = Math.abs(d); e.style.transform = `translateX(${(d * 72).toFixed(1)}%) translateZ(${(-a * 130).toFixed(0)}px) rotateY(${(Math.max(-1, Math.min(1, d)) * -32).toFixed(1)}deg)`; e.style.opacity = Math.max(0, 1 - Math.max(0, a - .4) * .42).toFixed(2); e.style.zIndex = 20 - Math.round(a * 4); e.style.visibility = a > 2.6 ? 'hidden' : ''; });
    info(tiendaCerca(p, n));
  };
  const anda = () => { raf = 0; if (!h.isConnected) return; p += (meta - p) * .16; if (Math.abs(meta - p) < .002) p = meta; else raf = requestAnimationFrame(anda); pinta(); };
  const va = i => { meta = Math.max(0, Math.min(n - 1, i)); if (quieto) { p = meta; pinta(); } else if (!raf) raf = requestAnimationFrame(anda); };
  rueda.onpointerdown = e => { if (e.button) return; id = e.pointerId; x0 = e.clientX; y0 = e.clientY; p0 = p; movio = false; };
  rueda.onpointermove = e => {
    if (e.pointerId !== id) return;
    if (!e.buttons) return suelta(e);
    if (!movio && Math.abs(e.clientX - x0) > 7) { movio = true; rueda.setPointerCapture(id); h.classList.add('mano'); cancelAnimationFrame(raf); raf = 0; }
    if (movio) { p = meta = Math.max(-.35, Math.min(n - .65, p0 - (e.clientX - x0) / zk() / (its[0].offsetWidth * .72))); pinta(); }
  };
  const suelta = e => { if (e.pointerId !== id) return; id = null; h.classList.remove('mano'); if (movio) va(tiendaCerca(p + Math.max(-.35, Math.min(.35, (x0 - e.clientX) / 260)), n)); };
  rueda.onpointerup = suelta; rueda.onpointercancel = suelta;
  rueda.onclick = e => { if (movio) { movio = false; return; } const it = e.target.closest('.vt-it'); if (it) va(+it.dataset.i); };
  rueda.onkeydown = e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); va(tiendaCerca(meta, n) + d); } };
  $('.ant', h).onclick = () => va(tiendaCerca(meta, n) - 1); $('.sig', h).onclick = () => va(tiendaCerca(meta, n) + 1);
  h.querySelectorAll('[data-pto]').forEach(b => { b.onclick = () => va(+b.dataset.pto); });
  pinta();
}

// ---------- horas: el reloj se gira para elegir cuántas ----------
const tiendaHorasGen = () => tiendaDe('asesoria').filter(a => a.da.horas_tipo === 'general' && a.da.horas <= 12).sort((x, y) => x.da.horas - y.da.horas);
// La opción cuyas horas quedan más cerca. Pura.
const tiendaHoraCerca = (h, ops) => ops.reduce((m, o, i) => (Math.abs(o - h) < Math.abs(ops[m] - h) ? i : m), 0);
function tiendaDialHTML() {
  const ops = tiendaHorasGen();
  if (ops.length < 2) return tiendaLista('td-horas', tiendaDe('asesoria').map(tiendaHoraHTML).join(''));
  const i = Math.max(0, ops.findIndex(a => a.id === Tienda.dial) >= 0 ? ops.findIndex(a => a.id === Tienda.dial) : ops.findIndex(a => a.destacado)), a = ops[i], h = a.da.horas, p = tiendaPrecio(a, conPlan());
  return `<div class="td-dialc" data-art="${esc(a.id)}"><div class="td-dial" role="slider" tabindex="0" aria-label="Horas de asesoría" aria-valuemin="${ops[0].da.horas}" aria-valuemax="${ops[ops.length - 1].da.horas}" aria-valuenow="${h}" aria-valuetext="${h} ${h === 1 ? 'hora' : 'horas'}, ${cop(p)}" style="--f:${h / 12}">
      <svg viewBox="0 0 220 220" aria-hidden="true">${Array.from({ length: 12 }, (_, k) => { const t = (k + 1) * Math.PI / 6, r = ops.some(o => o.da.horas === k + 1); return `<circle class="${r ? 'op' : ''}${k + 1 <= h ? ' ll' : ''}" cx="${110 + 86 * Math.sin(t)}" cy="${110 - 86 * Math.cos(t)}" r="${r ? 9 : 4}"/>`; }).join('')}<circle class="riel" cx="110" cy="110" r="86" pathLength="12"/><circle class="arco" cx="110" cy="110" r="86" pathLength="12" style="stroke-dasharray:${h} 12"/><g class="ag" style="transform:rotate(${h * 30}deg)"><path d="M110 110V44"/><circle cx="110" cy="24" r="15"/></g></svg>
      <div class="td-dial-n"><b>${h}</b><small>${h === 1 ? 'hora' : 'horas'}</small></div></div>
    <div class="td-dial-t"><h3>${esc(a.nombre)} con un profe</h3><p>${esc(a.detalle)}</p>
      <div class="td-dur" role="radiogroup" aria-label="Cuántas horas">${ops.map(o => `<button type="button" role="radio" aria-checked="${o === a}" tabindex="${o === a ? 0 : -1}" data-hora="${esc(o.id)}">${o.da.horas} h</button>`).join('')}</div>
      ${h > 1 ? `<p class="td-cada"><b>${cop(p / h)}</b> cada hora</p>` : ''}${tiendaAhorroHTML(a)}<div class="td-pie"><span>${tiendaPrecioHTML(a)}</span>${tiendaBoton(a)}</div></div></div>
    ${tiendaLista('td-horas', tiendaDe('asesoria').filter(x => !ops.includes(x)).map(tiendaHoraHTML).join(''))}`;
}
function tiendaDialVivo(el) {
  const d = $('.td-dial', el); if (!d) return;
  const ops = tiendaHorasGen(), hs = ops.map(o => o.da.horas), i0 = hs.indexOf(+d.getAttribute('aria-valuenow'));
  const pon = (i, foco) => { const k = Math.max(0, Math.min(ops.length - 1, i)); if (ops[k].id === (Tienda.dial || ops[i0].id) && k === i0) return; Tienda.dial = ops[k].id; const c = $('.td-dialhueco', el); c.innerHTML = tiendaDialHTML(); tiendaDialVivo(el); tiendaLigaRadios(c); if (foco) $(foco, c)?.focus({ preventScroll: true }); };
  d.onkeydown = e => { const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (k) { e.preventDefault(); pon(i0 + k, '.td-dial'); } };
  let id = null; const ag = $('.ag', d);
  const hora = e => { const r = d.getBoundingClientRect(); let t = Math.atan2(e.clientX - r.left - r.width / 2, r.top + r.height / 2 - e.clientY) / Math.PI * 6; if (t <= .4) t += 12; return t; };
  d.onpointerdown = e => { if (e.button) return; id = e.pointerId; d.setPointerCapture(id); d.classList.add('mano'); d.onpointermove(e); };
  d.onpointermove = e => { if (e.pointerId !== id) return; const t = hora(e); ag.style.transform = `rotate(${t * 30}deg)`; $('.arco', d).style.strokeDasharray = `${t} 12`; const h = hs[tiendaHoraCerca(t, hs)]; $('.td-dial-n b', d).textContent = h; $('.td-dial-n small', d).textContent = h === 1 ? 'hora' : 'horas'; };
  const fin = e => { if (e.pointerId !== id) return; id = null; d.classList.remove('mano'); const k = e.type === 'pointerup' ? tiendaHoraCerca(hora(e), hs) : i0; if (k !== i0) return pon(k); ag.style.transform = `rotate(${hs[i0] * 30}deg)`; $('.arco', d).style.strokeDasharray = `${hs[i0]} 12`; $('.td-dial-n b', d).textContent = hs[i0]; };
  d.onpointerup = fin; d.onpointercancel = fin;
  d.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
}

// ---------- morral: lo que se lleva ----------
const tiendaMini = a => { const d = a.da || {}, id = (d.fisicos || d.libros || [])[0], c = (d.cursos || [])[0]; return id ? tiendaPortada(id) : c && typeof courseArt === 'function' ? courseArt({ id: c }, 'md') : `<b>${d.horas || 1} h</b>`; };
const TD_MORRAL = '<svg class="td-morral" viewBox="0 0 64 64" aria-hidden="true"><path class="a" d="M22 16a10 10 0 0 1 20 0"/><path class="b" d="M12 30a16 16 0 0 1 16-16h8a16 16 0 0 1 16 16v22a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"/><path class="c" d="M20 38h24v14a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3z"/><path class="d" d="M20 44h24M32 42v5"/></svg>';
function tiendaCarroHTML() {
  const items = carroItems(), n = items.reduce((t, x) => t + x.cantidad, 0), k = tiendaCuenta(items, Tienda.arts, conPlan()), ver = Tienda.vista !== 'pedidos';
  if (!ver || !Tienda.cargada) return '';
  const abierto = n && Tienda.abierto;
  return `<footer class="td-carro${n ? '' : ' vacio'}${abierto ? ' abierto' : ''}">
    ${abierto ? `<div class="td-dentro"><ul>${items.map(x => { const a = Tienda.arts.find(y => y.id === x.id); return `<li><span class="td-mi">${tiendaMini(a)}</span><span class="td-mn">${esc(a.nombre)}<small>${cop(tiendaPrecio(a, conPlan()) * x.cantidad)}</small></span>${tiendaBoton(a)}</li>`; }).join('')}</ul></div>` : ''}
    <button class="td-bolsa" type="button" data-bolsa aria-expanded="${!!abierto}"${n ? '' : ' disabled'} aria-label="${n ? `${abierto ? 'Cerrar' : 'Ver'} tu morral, ${n} ${n === 1 ? 'artículo' : 'artículos'}` : 'Tu morral está vacío'}">${TD_MORRAL}${n ? `<b class="td-n">${n}</b>` : ''}</button>
    <span class="td-tot">${n ? `<small>${n} ${n === 1 ? 'artículo' : 'artículos'}${k.fisicos ? ' · envío aparte' : ''}</small><b>${cop(k.subtotal)}</b>` : '<small>Arrastra aquí lo que quieras llevar, o tócalo para añadirlo</small>'}</span>
    ${n ? '<button class="btn main brand" type="button" data-td="pedir">Continuar</button>' : ''}</footer>`;
}
// Suma o resta sin redibujar la página: cambia los huecos de ese artículo, las horas y el morral.
function tiendaCambia(id, delta, desde) {
  const a = Tienda.arts.find(x => x.id === id); if (!a) return;
  if (delta > 0 && a.tipo === 'asesoria' && !Tienda.carro[id] && !tiendaHorasOk()) return toast('Las asesorías son para cursos comprados. Añade primero un curso o un paquete.');
  const n = Math.max(0, Math.min(a.tipo === 'fisico' || a.tipo === 'asesoria' ? 10 : 1, (Tienda.carro[id] || 0) + delta));
  if (n === (Tienda.carro[id] || 0)) return;
  if (n) Tienda.carro[id] = n; else delete Tienda.carro[id];
  if (!carroItems().length) Tienda.abierto = false;
  if (delta > 0) tiendaVuela(a, desde);
  tiendaRefresca(delta > 0);
}
function tiendaRefresca(suma = false) {
  const act = document.activeElement, hueco0 = act?.closest?.('[data-ctl]'), foco = act?.dataset && (act.dataset.mas || act.dataset.menos), enCarro = act?.closest?.('.td-carro'), bolsa = act?.hasAttribute?.('data-bolsa');
  view.querySelectorAll('[data-art]').forEach(x => x.classList.toggle('on', !!Tienda.carro[x.dataset.art]));
  const hueco = $('.td-carrohueco', view); hueco.innerHTML = tiendaCarroHTML();
  view.querySelectorAll('[data-ctl]').forEach(x => { const a = Tienda.arts.find(y => y.id === x.dataset.ctl); if (a) x.innerHTML = tiendaBotonIn(a); });
  if (suma) { const b = $('.td-bolsa', hueco); b?.classList.add('salta'); }
  if (foco) { (enCarro ? hueco.querySelector(`[data-ctl="${CSS.escape(foco)}"] button:not(:disabled)`) : hueco0?.querySelector('button:not(:disabled)') || $('[data-bolsa]:not(:disabled)', hueco) || $('.td-tabs [aria-current]', view))?.focus({ preventScroll: true }); } else if (bolsa) $('[data-bolsa]', hueco)?.focus({ preventScroll: true });
}
// La figura del artículo vuela al morral.
function tiendaVuela(a, desde) {
  const dest = $('.td-bolsa', view);
  if (!desde || !dest || !dest.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = desde.getBoundingClientRect(), d = dest.getBoundingClientRect(), f = document.createElement('span');
  f.className = 'td-vuela'; f.innerHTML = tiendaMini(a); f.style.left = `${(r.left + r.width / 2) / zk()}px`; f.style.top = `${(r.top + r.height / 2) / zk()}px`;
  document.body.append(f);
  const dx = (d.left + d.width / 2 - r.left - r.width / 2) / zk(), dy = (d.top + d.height / 2 - r.top - r.height / 2) / zk();
  f.animate([{ transform: 'translate(-50%, -50%) scale(1)' }, { transform: `translate(calc(-50% + ${dx * .45}px), calc(-50% + ${dy * .45 - 110}px)) scale(1.15) rotate(-8deg)`, offset: .45 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.25) rotate(14deg)`, opacity: .6 }], { duration: 720, easing: 'cubic-bezier(.4, 0, .3, 1)' }).onfinish = () => f.remove();
  setTimeout(() => f.remove(), 1200);
}
// Con el ratón: una tarjeta se arrastra hasta el morral.
function tiendaArrastra(el) {
  el.querySelectorAll('[data-lleva] .td-escena').forEach(s => {
    let id = null, x0 = 0, y0 = 0, f = null;
    const art = s.closest('[data-lleva]').dataset.lleva, quita = () => { f?.remove(); f = null; view.classList.remove('llevando'); };
    const sobre = e => { const r = $('.td-carro', view)?.getBoundingClientRect(); return r && e.clientY > r.top - 40 && e.clientX > r.left && e.clientX < r.right; };
    s.onpointerdown = e => { if (e.button || e.pointerType !== 'mouse') return; id = e.pointerId; x0 = e.clientX; y0 = e.clientY; e.preventDefault(); s.setPointerCapture(id); };
    s.onpointermove = e => {
      if (e.pointerId !== id) return;
      if (!f && Math.hypot(e.clientX - x0, e.clientY - y0) > 8) { f = document.createElement('span'); f.className = 'td-vuela mano'; f.innerHTML = $('.td-artes, .td-pila', s).outerHTML; document.body.append(f); view.classList.add('llevando'); }
      if (f) { f.style.left = `${e.clientX / zk()}px`; f.style.top = `${e.clientY / zk()}px`; $('.td-carro', view)?.classList.toggle('sobre', sobre(e)); }
    };
    const fin = e => { if (e.pointerId !== id) return; id = null; const dentro = f && e.type === 'pointerup' && sobre(e), de = f; if (dentro) tiendaCambia(art, 1, de); quita(); $('.td-carro', view)?.classList.remove('sobre'); };
    s.onpointerup = fin; s.onpointercancel = fin;
  });
}
// Los libros giran con el dedo; se quedan donde se sueltan.
function tiendaGira(el) {
  el.querySelectorAll('[data-gira]').forEach(b => {
    const caja = b.closest('.td-escena'); let id = null, x0 = 0, g0 = 0, g = -24;
    caja.onpointerdown = e => { if (e.button) return; id = e.pointerId; x0 = e.clientX; g0 = g; caja.setPointerCapture(id); b.classList.add('mano'); };
    caja.onpointermove = e => { if (e.pointerId !== id) return; g = g0 + (e.clientX - x0) * .7; b.style.setProperty('--g', `${g}deg`); if (Math.abs(e.clientX - x0) > 20) caja.classList.add('giro'); };
    caja.onpointerup = caja.onpointercancel = e => { if (e.pointerId === id) { id = null; b.classList.remove('mano'); } };
  });
}
// Radios en fila: flechas para cambiar.
function tiendaLigaRadios(el) {
  el.querySelectorAll('.td-dur').forEach(d => { d.onkeydown = e => { const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const bs = [...d.querySelectorAll('button')], i = bs.findIndex(b => b.getAttribute('aria-checked') === 'true'); bs[(i + k + bs.length) % bs.length].click(); }; });
}
// Cambia una tarjeta en su sitio; `foco`: lo que queda enfocado.
function tiendaTarjeta(sel, html, foco) {
  const v = $(sel, view); if (!v) return;
  const antes = v.querySelector('[data-v-precio]')?.dataset.vPrecio, t = document.createElement('template'); t.innerHTML = html.trim();
  const n = t.content.firstElementChild, sc = $('.td-mundos', v)?.scrollLeft || 0; n.classList.add('quieta'); v.replaceWith(n);
  if ($('.td-mundos', n)) $('.td-mundos', n).scrollLeft = sc;
  tiendaGira(n); tiendaLigaRadios(n); if (n.dataset.art) n.classList.toggle('on', !!Tienda.carro[n.dataset.art]);
  const p = n.querySelector('[data-v-precio]'), a = +antes, b = +(p?.dataset.vPrecio || 0);   // el precio corre de un valor al otro
  if (p && a && b && a !== b && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const t0 = performance.now(); const paso = now => { const u = Math.min(1, (now - t0) / 420); p.textContent = cop(u < 1 ? Math.round((a + (b - a) * (1 - (1 - u) ** 3)) / 100) * 100 : b); if (u < 1 && p.isConnected) requestAnimationFrame(paso); }; requestAnimationFrame(paso); }
  if (foco) n.querySelector(foco)?.focus({ preventScroll: true });
}
const TIENDA_CONFIA = [['lock', 'Pago con QR de Bre-B'], ['bolt', 'Se activa en tu mismo código'], ['check', 'Tu avance no se pierde'], ['download', 'Envíos a todo el país']];
const tiendaConfiaHTML = () => `<ul class="td-confia">${TIENDA_CONFIA.map(([i, t]) => `<li>${ICON[i]}<span>${t}</span></li>`).join('')}</ul>`;

function tiendaVistaHTML() {
  if (Tienda.vista === 'todo') {
    return `${tiendaHeroHTML()}${tiendaConfiaHTML()}${Tienda.cargada ? '' : silueta('tarjetas', 3)}`
      + tiendaSec('Paquetes', tiendaLista('td-paqs', tiendaDe('paquete').map(tiendaPaqHTML).join('')), '', 'Todo junto sale mejor.')
      + tiendaSec('Cursos', tiendaCursosHTML(), 'cursos', 'Elige el tiempo y empieza hoy.')
      + tiendaSec('Libros', tiendaBandas(), 'libros', 'Los cuatro en un paquete: impresos en tu casa o digitales en la app.')
      + tiendaSec('Asesorías', tiendaDe('asesoria').length ? `<div class="td-dialhueco">${tiendaDialHTML()}</div>` : '', 'asesorias', 'Una hora con un profe, sobre lo que más te cuesta.');
  }
  if (Tienda.vista === 'cursos') {
    return tiendaSec('Cursos', tiendaCursosHTML(), '', 'Elige el tiempo y empieza hoy.') + tiendaSec('Paquetes', tiendaLista('td-paqs', tiendaDe('paquete').map(tiendaPaqHTML).join('')), '', 'Todo junto sale mejor.') + tiendaConfiaHTML();
  }
  if (Tienda.vista === 'libros') {
    return `${tiendaBandas() || (Tienda.cargada ? '<p class="td-vacio">El paquete no está disponible por ahora. Escríbenos por WhatsApp y te avisamos.</p>' : '')}
      ${tiendaSec('Lo que trae el paquete', tiendaLista('td-libros', Tienda.libros.map(tiendaLibroHTML).join('')), '', 'Gíralos y mira la muestra de cada uno.')}
      <p class="td-nota">Los libros se venden solo en el paquete de los cuatro. Los digitales se leen dentro de la app por 12 meses, con conexión; no se descargan. Los impresos se envían a todo el país.</p>`;
  }
  if (Tienda.vista === 'asesorias') {
    const s = Tienda.saldo, hay = s.general + s.universidad;
    return `<section class="td-saldo"><div><h2>${hay ? `Tienes ${hay} ${hay === 1 ? 'hora' : 'horas'}` : 'Aún no tienes horas'}</h2><p>${hay ? `${s.general} ${s.general === 1 ? 'general' : 'generales'} · ${s.universidad} de universidad${s.grupo ? ` · ${s.grupo} en grupo` : ''}` : 'Elige cuántas quieres y sepáralas cuando las necesites.'}</p></div>
      ${hay && conPlan() ? '<button class="btn main brand td-ir" type="button" data-td="separar">Separar una asesoría</button>' : ''}</section>
      <div class="td-dialhueco">${tiendaDialHTML()}</div>
      <p class="td-nota">Las asesorías son de los cursos que tienes comprados. Cada una es virtual y dura 1 hora. Si cancelas con 12 horas o más de anticipación, la hora vuelve a tu saldo.</p>`;
  }
  return `<section><h2>Mis pedidos</h2>${Tienda.pedidos.length ? `<div class="td-lista">${Tienda.pedidos.map(p => `<article class="td-pedido"><div class="acct-head"><b>Pedido ${p.id}</b><span class="pill ${PEDIDO_ESTADO[p.estado][0]}">${PEDIDO_ESTADO[p.estado][1]}</span></div>
    <p>${p.items.map(x => `${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(x.nombre)}`).join(', ')}</p><p class="muted">${fechaCorta(p.creado_en)} · ${cop(p.total)}${p.envio ? ` (envío ${cop(p.envio)})` : ''}</p>
    ${p.guia ? `<p class="td-guia">${esc(p.transportadora)} · guía <b>${esc(p.guia)}</b></p>` : ''}
    ${p.estado === 'pendiente' ? `<div class="acct-actions"><button class="btn main brand" type="button" data-pago="${p.id}">Pagar</button><button class="btn ghost" type="button" data-cancela="${p.id}">Cancelar pedido</button></div>` : ''}</article>`).join('')}</div>` : '<p class="td-vacio">Aún no tienes pedidos.</p>'}</section>`;
}
const TD_ICO = { todo: 'bag', cursos: 'book', libros: 'doc', asesorias: 'calendar', pedidos: 'check' };
function tiendaPinta(foco = '', mueve = true) {
  if (tab !== 'tienda') return;
  const el = view, y = $('.tienda', el) ? el.scrollTop : 0;
  const porPagar = Tienda.pedidos.filter(p => p.estado === 'pendiente').length;
  const V = [['todo', 'Todo'], ['cursos', 'Cursos'], ['libros', 'Libros'], ['asesorias', 'Asesorías'], ['pedidos', `Mis pedidos${porPagar ? ` (${porPagar})` : ''}`]];
  const tabs = $('.td-tabs', el)?.scrollLeft || 0, FILAS = '.td-paqs, .td-cursos, .td-libros, .td-mundos', corrido = el.dataset.vista === Tienda.vista ? [...el.querySelectorAll(FILAS)].map(x => x.scrollLeft) : [];
  el.dataset.vista = Tienda.vista; el.classList.remove('llevando'); document.querySelectorAll('.td-vuela.mano').forEach(x => x.remove());
  el.innerHTML = `<div class="tienda"><header class="td-head"><h1 tabindex="-1">Tienda</h1></header>
    <nav class="td-tabs" aria-label="Secciones de la tienda">${V.map(([id, t]) => `<button type="button" data-v="${id}"${id === Tienda.vista ? ' aria-current="page"' : ''}>${ICON[TD_ICO[id]] || ''}${t}</button>`).join('')}</nav>
    <div class="td-in">${tiendaVistaHTML()}</div>
    <div class="td-carrohueco">${tiendaCarroHTML()}</div></div>`;
  [...el.querySelectorAll(FILAS)].forEach((x, i) => { if (corrido[i]) x.scrollLeft = corrido[i]; });
  el.scrollTop = y; $('.td-tabs', el).scrollLeft = tabs;
  const A = { pedir: tiendaPedir, separar: () => go('tutorias') };
  // Un solo manejador: los huecos cambian sin volver a ligar nada.
  $('.tienda', el).onclick = e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    const d = b.dataset, esc1 = () => b.closest('article, .td-dialc, .vt')?.querySelector('.td-escena, .td-dial, .vt-rueda') || b;
    if (d.td) return A[d.td]();
    if (d.mas) return tiendaCambia(d.mas, 1, esc1());
    if (d.menos) return tiendaCambia(d.menos, -1);
    if (d.leer) return openLector(+d.leer);
    if (d.compra) return openComprar(d.compra, (Tienda.plan || {})[d.compra]);
    if (d.dur) { Tienda.plan = { ...Tienda.plan, [d.de]: d.dur }; return tiendaTarjeta(`[data-curso="${d.de}"]`, tiendaCursoHTML(courseById(d.de)), '[data-dur][aria-checked="true"]'); }
    if (d.hora) { Tienda.dial = d.hora; const c = $('.td-dialhueco', el); c.innerHTML = tiendaDialHTML(); tiendaDialVivo(el); tiendaLigaRadios(c); tiendaRefresca(); return $('[data-hora][aria-checked="true"]', c).focus({ preventScroll: true }); }
    if ('bolsa' in d) { Tienda.abierto = !Tienda.abierto; return tiendaRefresca(); }
  };
  tiendaVitrinaViva(el); tiendaDialVivo(el); tiendaArrastra(el); tiendaGira(el); tiendaLigaRadios(el);
  el.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { Tienda.vista = b.dataset.v; tiendaPinta(`.td-tabs [data-v="${b.dataset.v}"]`); el.scrollTop = 0; $('.td-tabs [aria-current]', el)?.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }; });
  el.querySelectorAll('[data-pago]').forEach(b => { b.onclick = () => { const p = Tienda.pedidos.find(x => x.id === +b.dataset.pago); if (p) openPago(p.total, pedidoTexto(p)); }; });
  el.querySelectorAll('[data-cancela]').forEach(b => { b.onclick = () => ask({ title: '¿Cancelar este pedido?', text: 'Si ya pagaste, no lo canceles: envíanos el comprobante.', ok: 'Sí, cancelar', cancel: 'Conservarlo', danger: true }).then(async si => {
    if (!si) return;
    const r = await Cuenta.sb.rpc('cancelar_pedido', { p_id: +b.dataset.cancela });
    toast(r.error ? 'No se pudo cancelar. Inténtalo de nuevo.' : 'Pedido cancelado.'); await tiendaMios(); tiendaPinta();
  }); });
  if (mueve) (foco && el.querySelector(foco) || $('h1', el)).focus({ preventScroll: true });
}

// ---------- pedido: dirección (si hay impresos) → confirmar ----------
const DIR = [['nombre', 'Quién recibe', 'autocomplete="name" maxlength="80"'], ['telefono', 'Celular', 'type="tel" inputmode="tel" autocomplete="tel" maxlength="30"'], ['documento', 'Cédula o documento (opcional)', 'inputmode="numeric" maxlength="20"'],
  ['departamento', 'Departamento', 'autocomplete="address-level1" maxlength="60"'], ['ciudad', 'Ciudad o municipio', 'autocomplete="address-level2" maxlength="80"'], ['direccion', 'Dirección', 'autocomplete="street-address" maxlength="120"'], ['detalle', 'Barrio, apartamento o indicaciones (opcional)', 'maxlength="120"']];
function tiendaCapa(paso) {
  let el = $('#tienda');
  if (!el) {
    el = document.createElement('div'); el.id = 'tienda';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Tu pedido');
    document.body.appendChild(el);
  }
  el.dataset.paso = paso;
  tiendaInerte(true);
  return el;
}
function tiendaPedir() {
  const items = carroItems();
  if (!items.length) return;
  if (!Cuenta.user) return openEntrar();
  if (!tiendaHorasOk() && items.some(x => Tienda.arts.find(a => a.id === x.id).tipo === 'asesoria')) return toast('Las asesorías son para cursos comprados. Añade un curso o quita las horas.');
  const el = tiendaCapa('pedir');
  const p = Cuenta.perfil || {}, d = { nombre: p.nombre || '', telefono: p.telefono || '', ciudad: p.ciudad || '', ...(S.envio || {}) };
  const fis = tiendaFisicos(items, Tienda.arts);
  const clave = [...crypto.getRandomValues(new Uint8Array(12))].map(x => x.toString(16).padStart(2, '0')).join('');   // si se reintenta, es el mismo pedido
  let zona = Tienda.envios.find(z => z.id === (S.envio || {}).zona) || null;
  el.innerHTML = `<header class="td-bar"><button class="icon-btn" type="button" data-td="volver" aria-label="Volver a la tienda">${ICON.back}</button><h1 tabindex="-1">Tu pedido</h1></header>
    <div class="td-cuerpo"><form class="td-in td-form acct-form" novalidate>
      <section><h2>Resumen</h2><ul class="td-res">${items.map(x => { const a = Tienda.arts.find(y => y.id === x.id); return `<li><span>${x.cantidad > 1 ? `${x.cantidad} × ` : ''}${esc(a.nombre)}</span><b>${cop(tiendaPrecio(a, conPlan()) * x.cantidad)}</b></li>`; }).join('')}</ul></section>
      ${fis ? `<section><h2>¿A dónde lo enviamos?</h2><div class="compra-lista" role="radiogroup" aria-label="Zona de envío">${Tienda.envios.map(z => `<button type="button" role="radio" class="compra-op" data-z="${esc(z.id)}" aria-checked="${zona === z}"><span><b>${esc(z.nombre)}</b><small>${esc(z.detalle)}</small></span><strong>${cop(z.precio * Math.ceil(fis / 8))}</strong></button>`).join('')}</div>
        <div class="td-dir">${DIR.map(([k, t, x]) => `<label class="fld"><span>${t}</span><input name="${k}" value="${esc(d[k] || '')}" ${x}></label>`).join('')}</div></section>` : ''}
      <section class="td-total"></section>
      <p class="form-msg bad" role="alert" hidden></p><button class="btn main brand" type="submit">Hacer pedido</button></form></div>`;
  const f = $('form', el), msg = $('.form-msg', el), b = $('[type=submit]', el);
  const cuenta = () => { const k = tiendaCuenta(items, Tienda.arts, conPlan(), zona); $('.td-total', el).innerHTML = `<ul class="td-res">${fis ? `<li><span>Envío</span><b>${zona ? cop(k.envio) : 'Elige la zona'}</b></li>` : ''}<li class="t"><span>Total</span><b>${cop(k.total)}</b></li></ul>`; };
  const guarda = () => { if (!fis) return; DIR.forEach(([k]) => { d[k] = f[k].value; }); S.envio = { ...d, zona: zona ? zona.id : '' }; save(); };
  $('[data-td]', el).onclick = () => { if (b.disabled) return; guarda(); tiendaCerrar(); tiendaPinta(); };
  const zs = [...el.querySelectorAll('[data-z]')];
  const elige = i => { zona = Tienda.envios[i]; zs.forEach((x, k) => x.setAttribute('aria-checked', k === i)); cuenta(); };
  zs.forEach((x, i) => { x.onclick = () => elige(i); });
  const error = (texto, campo) => { msg.textContent = texto; msg.hidden = false; (campo && f[campo] ? f[campo] : msg).focus?.(); msg.scrollIntoView({ block: 'nearest' }); };
  f.onsubmit = async e => {
    e.preventDefault();
    if (b.disabled) return;
    msg.hidden = true; guarda();
    if (fis && !zona) return error('Elige a dónde enviamos.');
    const mal = fis && direccionError(d);
    if (mal) return error(mal.texto, mal.campo);
    if (sinRed()) return error(sinRed());
    b.disabled = true; b.textContent = 'Un momento…'; el.dataset.paso = 'enviando';
    let r;
    try { r = await Cuenta.sb.rpc('crear_pedido', { p: { clave, items, zona: zona ? zona.id : '', direccion: fis ? d : {} } }); } catch (x) { r = { error: x }; }
    if (!r.error) { Tienda.carro = {}; tiendaMios().catch(() => {}); }
    if (!f.isConnected) return;
    el.dataset.paso = 'pedir'; b.disabled = false; b.textContent = 'Hacer pedido';
    if (r.error) return error(/fetch|network/i.test(r.error.message || '') ? canjeError('red') : r.error.message || 'No se pudo hacer el pedido.');
    tiendaListo(r.data);
  };
  cuenta(); $('h1', el).focus({ preventScroll: true });
}
function tiendaListo(p) {
  const el = tiendaCapa('listo');
  el.innerHTML = `<header class="td-bar"><button class="icon-btn" type="button" data-td="cerrar" aria-label="Cerrar">${ICON.x}</button><h1 tabindex="-1">Pedido ${p.id}</h1></header>
    <div class="td-cuerpo"><div class="td-in td-listo"><span class="canje-check">${ICON.check}</span><h2>Pedido recibido</h2>
      <p class="muted">Paga y envíanos el comprobante por WhatsApp. Al confirmarlo, lo digital se abre aquí mismo${p.envio ? ' y te avisamos el envío' : ''}.</p>
      ${Cuenta.ajustes.pago_info ? `<p class="td-info">${esc(Cuenta.ajustes.pago_info)}</p>` : ''}
      ${pagoHTML(p.total)}
      ${waBoton(pedidoTexto(p), 'Enviar comprobante', 'main brand')}<button class="btn ghost" type="button" data-td="pedidos">Ver mis pedidos</button></div></div>`;
  $('[data-td=cerrar]', el).onclick = () => { tiendaCerrar(); tiendaPinta(); };
  $('[data-td=pedidos]', el).onclick = () => openTienda('pedidos');
  $('h1', el).focus({ preventScroll: true });
}

// ---------- libros dentro de la app ----------
// Estante en la portada del Preuniversitario y en «Tú».
function librosHTML(soloMios = false) {
  const ls = Tienda.libros.filter(l => (soloMios ? libroListo(l) && Tienda.mios.some(x => x.libro === l.id) : true));
  if (!ls.length || (!soloMios && !Tienda.arts.length)) return '';
  return `<section class="td-estante"><div class="acct-head"><h2>${soloMios ? 'Mis libros' : 'Libros del Preuniversitario'}</h2>${soloMios ? '' : '<button class="link-btn" type="button" data-tienda="libros">Ver el paquete</button>'}</div>
    <div class="td-fila-libros">${ls.map(l => `<button type="button" class="td-lomo" data-libro="${l.id}" aria-label="${esc(l.titulo)}: ${libroMio(l.id) && libroListo(l) ? 'leer' : 'ver en la tienda'}">${tiendaPortada(l.id)}<b>${esc(l.titulo)}</b><small>${libroMio(l.id) && libroListo(l) ? 'Leer' : esc(l.subtitulo)}</small></button>`).join('')}</div></section>`;
}
function bindLibros(root) {
  root.querySelectorAll('[data-tienda]').forEach(b => { b.onclick = () => openTienda(b.dataset.tienda); });
  root.querySelectorAll('[data-libro]').forEach(b => { b.onclick = () => { const l = Tienda.libros.find(x => x.id === +b.dataset.libro); return l && libroMio(l.id) && libroListo(l) ? openLector(l.id) : openTienda('libros'); }; });
}
// Al cerrar sesión no queda nada de la cuenta.
function tiendaFuera() {
  if (lector) lectorCerrar();
  tiendaCerrar();
  Object.assign(Tienda, { mios: [], pedidos: [], carro: {}, saldo: { general: 0, universidad: 0, grupo: 0 } });
  delete S.envio;
}
;
//#archivo js/lector.js
// Lector de los libros (spec 2026-11-24-tienda-libros): las páginas viven en una carpeta privada de Supabase y solo se
// entregan a quien tiene el libro. Se dibujan en un lienzo con el nombre y el código del estudiante como marca de agua; no
// hay archivo que descargar, ni menú, ni impresión. Nada evita del todo una captura: la marca dice de quién salió.

const lectorRuta = (l, n) => `${l.id}/v${l.version}/${String(n).padStart(4, '0')}.webp`;
// Páginas que se dibujan: las visibles y una a cada lado. Pura.
const lectorCerca = (vis, total) => [...new Set(vis.flatMap(n => [n - 1, n, n + 1]))].filter(n => n >= 1 && n <= total).sort((a, b) => a - b);
let lector = null;

function lectorAtras() {
  if (!lector) return false;
  if ($('.lx-indice.on')) { $('.lx-indice').classList.remove('on'); return true; }
  lectorCerrar();
  return true;
}
function lectorCerrar() {
  if (!lector) return;
  lector.io.disconnect(); removeEventListener('resize', lector.talla); document.removeEventListener('keydown', lector.tecla, true);
  lector.urls.forEach(b => b.close?.());
  $('#lector')?.remove();
  document.body.classList.remove('leyendo');
  lector = null;
  const t = $('#tienda'); if (t) t.inert = false; else tiendaInerte(false);
}
async function openLector(id) {
  if (!Cuenta.sb || !Cuenta.user) return toast('Necesitas conexión para leer.');
  // La fila al día: si se cambió el PDF, las páginas están en otra carpeta.
  const fila = await Cuenta.sb.from('libros').select('*').eq('id', id).maybeSingle().then(x => x, () => ({}));
  if (fila.data) Tienda.libros = Tienda.libros.map(x => (x.id === id ? fila.data : x));
  const l = Tienda.libros.find(x => x.id === id);
  if (!l || !Cuenta.user) return toast('Necesitas conexión para leer.');
  if (!l.version || !l.paginas) return toast('Este libro aún no está disponible.');
  const mio = libroMio(id), total = mio ? l.paginas : Math.min(l.muestra, l.paginas);
  if (!total) return;
  lectorCerrar();
  const marca = `${(Cuenta.perfil || {}).nombre || ''}${Cuenta.codigo ? ` · ${muestraCodigo(Cuenta.codigo)}` : ''}`.trim() || 'Zuka';
  const el = document.createElement('div');
  el.id = 'lector'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', `Libro: ${l.titulo}`);
  el.innerHTML = `<header class="lx-bar"><button class="icon-btn" type="button" data-x="cerrar" aria-label="Cerrar el libro">${ICON.x}</button><h1 tabindex="-1">${esc(l.titulo)}</h1>
      <span class="lx-acc">${(l.indice || []).length && mio ? '<button class="btn sm ghost" type="button" data-x="indice">Índice</button>' : ''}<button class="icon-btn" type="button" data-x="menos" aria-label="Alejar">−</button><button class="icon-btn" type="button" data-x="mas" aria-label="Acercar">+</button></span></header>
    <div class="lx-hojas" tabindex="0" aria-label="Páginas">${Array.from({ length: total }, (_, i) => `<div class="lx-hoja" data-n="${i + 1}"><canvas aria-label="Página ${i + 1}" role="img"></canvas></div>`).join('')}
      ${mio ? '' : `<div class="lx-fin"><h2>Hasta aquí la muestra</h2><p>El libro completo tiene ${l.paginas} páginas.</p><button class="btn main brand" type="button" data-x="comprar">Ver precios</button></div>`}</div>
    <footer class="lx-pie"><label><span class="sr">Ir a la página</span><input type="number" min="1" max="${total}" inputmode="numeric" value="1"></label><span>de ${total}${mio ? '' : ' (muestra)'}</span></footer>
    ${(l.indice || []).length && mio ? `<nav class="lx-indice" aria-label="Índice"><ol>${l.indice.map(x => `<li style="--n:${Math.min(2, x.n || 0)}"><button type="button" data-ir="${x.p}">${esc(x.t)}<small>${x.p}</small></button></li>`).join('')}</ol></nav>` : ''}`;
  document.body.appendChild(el);
  document.body.classList.add('leyendo');
  const t = $('#tienda'); if (t) t.inert = true; else tiendaInerte(true);
  const cont = $('.lx-hojas', el), hojas = [...el.querySelectorAll('.lx-hoja')], input = $('.lx-pie input', el);
  const L = lector = { l, urls: new Map(), pidiendo: new Map(), vis: new Set(), zoom: 1, razon: 1.414, pag: 1 };
  const vivo = () => lector === L;

  // Cada página: se pide una vez, se dibuja al acercarse y se suelta al alejarse (un libro entero no cabe en memoria).
  const baja = n => {
    if (L.urls.has(n)) return Promise.resolve(L.urls.get(n));
    if (!L.pidiendo.has(n)) {
      L.pidiendo.set(n, Cuenta.sb.storage.from('libros').download(lectorRuta(l, n)).then(async ({ data, error }) => {
        if (error || !data) throw error || new Error('pagina');
        const bmp = await createImageBitmap(data);
        if (vivo()) { L.urls.set(n, bmp); L.razon = bmp.height / bmp.width; }
        return bmp;
      }).finally(() => L.pidiendo.delete(n)));
    }
    return L.pidiendo.get(n);
  };
  const dibuja = async n => {
    const h = hojas[n - 1], cv = $('canvas', h);
    if (!h || h.dataset.ok === String(cv.clientWidth)) return;
    let bmp;
    try { bmp = await baja(n); } catch (e) {
      if (vivo() && !$('.lx-mal', h)) {
        h.insertAdjacentHTML('beforeend', '<p class="lx-mal">No se pudo cargar la página. <button class="btn sm ghost" type="button">Reintentar</button></p>');
        $('.lx-mal button', h).onclick = () => { $('.lx-mal', h).remove(); dibuja(n); };
      }
      return;
    }
    if (!vivo() || !lectorCerca([...L.vis], total).includes(n)) return;
    const w = cv.clientWidth, px = Math.min(bmp.width, Math.round(w * Math.min(2, devicePixelRatio || 1)));
    h.style.setProperty('--r', bmp.height / bmp.width);
    cv.width = px; cv.height = Math.round(px * bmp.height / bmp.width);
    const g = cv.getContext('2d');
    g.drawImage(bmp, 0, 0, cv.width, cv.height);
    // Marca de agua en diagonal: se lee, pero no estorba.
    g.save(); g.globalAlpha = .07; g.fillStyle = '#0a1230'; g.font = `600 ${Math.round(px / 30)}px Jost, sans-serif`; g.textAlign = 'center';
    g.translate(cv.width / 2, cv.height / 2); g.rotate(-Math.PI / 6);
    for (let y = -cv.height; y <= cv.height; y += px / 4.5) g.fillText(`${marca}      ${marca}`, 0, y);
    g.restore();
    h.dataset.ok = String(w);
  };
  const ajusta = () => {
    const cerca = new Set(lectorCerca([...L.vis], total));
    cerca.forEach(dibuja);
    hojas.forEach((h, i) => { const n = i + 1; if (h.dataset.ok && !cerca.has(n)) { const c = $('canvas', h); c.width = c.height = 1; delete h.dataset.ok; } });
    [...L.urls.keys()].forEach(n => { if (!cerca.has(n)) { L.urls.get(n).close?.(); L.urls.delete(n); } });
  };
  L.io = new IntersectionObserver(es => {
    es.forEach(e => { const n = +e.target.dataset.n; e.isIntersecting ? L.vis.add(n) : L.vis.delete(n); });
    if (!L.vis.size) return;
    // La página que ocupa el centro de la pantalla.
    const b0 = cont.getBoundingClientRect(), medio = b0.top + b0.height / 2;
    L.pag = [...L.vis].sort((a, b) => { const c = n => { const r = hojas[n - 1].getBoundingClientRect(); return Math.abs((r.top + r.bottom) / 2 - medio); }; return c(a) - c(b); })[0];
    if (document.activeElement !== input) input.value = L.pag;
    if (mio) { S.libros = { ...S.libros, [id]: L.pag }; }
    ajusta();
  }, { root: cont, threshold: [0, .25, .5, .75] });
  const ir = n => { const k = Math.max(1, Math.min(total, n | 0)); hojas[k - 1].scrollIntoView({ block: 'start' }); };
  const zoom = k => {
    const antes = L.pag; L.zoom = Math.max(1, Math.min(2.5, Math.round((L.zoom + k) * 4) / 4));
    cont.style.setProperty('--z', L.zoom); hojas.forEach(h => delete h.dataset.ok); ir(antes); requestAnimationFrame(ajusta);
  };
  L.talla = () => { hojas.forEach(h => delete h.dataset.ok); ajusta(); };
  // Sin guardar, imprimir ni menú contextual sobre las páginas.
  L.tecla = e => {
    if ((e.ctrlKey || e.metaKey) && ['p', 's'].includes(e.key.toLowerCase())) { e.preventDefault(); e.stopPropagation(); toast('Este libro solo se lee en la app.'); }
    if (e.key === 'Escape' && !sheetIsOpen) { e.preventDefault(); e.stopPropagation(); lectorAtras(); }
  };
  document.addEventListener('keydown', L.tecla, true);
  addEventListener('resize', L.talla);
  el.oncontextmenu = e => e.preventDefault();
  el.ondragstart = e => e.preventDefault();
  const X = { cerrar: () => { save(); lectorCerrar(); }, menos: () => zoom(-.25), mas: () => zoom(.25), indice: () => $('.lx-indice', el).classList.toggle('on'), comprar: () => { lectorCerrar(); openTienda('libros'); } };
  el.querySelectorAll('[data-x]').forEach(b => { b.onclick = () => X[b.dataset.x](); });
  el.querySelectorAll('[data-ir]').forEach(b => { b.onclick = () => { $('.lx-indice', el).classList.remove('on'); ir(+b.dataset.ir); }; });
  input.onchange = () => { ir(+input.value); cont.focus({ preventScroll: true }); };
  hojas.forEach(h => L.io.observe(h));
  if (mio && (S.libros || {})[id] > 1) ir(S.libros[id]);
  $('h1', el).focus({ preventScroll: true });
}
;
//#archivo js/presentacion.js
// Página de presentación en la web (spec 2026-11-20-presentacion; referencia: la portada de Brilliant).
// Quien abre Zuka en el navegador sin tenerla instalada y sin sesión ve primero quiénes somos, con «Iniciar sesión»
// arriba. Va como capa propia (#landing) sobre la app; los botones de cuenta abren la pantalla de entrada (js/cuenta.js).

// ¿Sale? Pura: se prueba en Node.
function presentacionToca({ standalone, user, query = '' }) {
  const q = k => new RegExp(`[?&]${k}(=|&|$)`).test(query);
  if (q('presentacion')) return true;
  if (q('app')) return false;
  return !standalone && !user;
}

// El nombre en letra (pedido del 2026-11-20: sin el cerebro de puntos): barra de la presentación, entrada y barra de
// escritorio. El logo es logoHTML (js/marca.js).
const zukaWord = () => logoHTML();

const pzEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pzLessons = c => (c.units || []).reduce((n, u) => n + ((u.lessons || []).length), 0);

// ---- la portada se juega (spec 2026-11-24-portada-viva): cuentas puras, se prueban en Node ----
// Punto de la rueda: ángulo en grados [0, 360) de un desplazamiento en pantalla (y hacia abajo).
const pzAngulo = (dx, dy) => (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
// La altura del punto, dibujada hacia la derecha: en x0 vale sen θ y más lejos, lo que valía antes.
function pzOnda(deg, { x0, x1, cy, r, largo = 2.6 }) {
  const t = deg * Math.PI / 180, n = Math.max(24, Math.ceil((x1 - x0) / 7));
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(cy - r * Math.sin(t - (x - x0) / (r * largo / Math.PI))).toFixed(1)}`;
  }
  return d;
}
// Reto de la portada: que la altura sea ½. Devuelve el ángulo exacto (30 o 150) si quedó cerca; si no, null.
const pzReto = deg => [30, 150].find(a => Math.abs(deg - a) <= 2.5) ?? null;
const PZ_LADO = 10;   // lado del cuadrado de (a + b)²
const pzArea = a => ({ a, b: PZ_LADO - a, aa: a * a, ab: a * (PZ_LADO - a), bb: (PZ_LADO - a) ** 2 });
// Palanca: 2 kg a 3 pasos contra 3 kg a d pasos. Inclinación en grados (positiva: baja la derecha).
const pzPalanca = d => ({ izq: 2 * 3, der: 3 * d, giro: Math.max(-13, Math.min(13, (3 * d - 6) * 2.2)), ok: 3 * d === 6 });

const PZ_RETO = 'Arrastra el punto hasta que su altura sea <b>½</b>.';
const pzRueda = () => `<div class="pz-stage">
    <svg class="pz-rueda" viewBox="0 0 1440 380" preserveAspectRatio="xMinYMid meet">
      <path class="pz-eje"/><path class="pz-meta"/><text class="pz-meta-t">½</text>
      <path class="pz-onda"/><circle class="pz-aro"/><path class="pz-tri"/><path class="pz-arco"/><path class="pz-guia"/><path class="pz-alto"/>
      <circle class="pz-fin" r="5"/>
      <g class="pz-knob" role="slider" tabindex="0" aria-label="Ángulo del punto en la rueda" aria-valuemin="0" aria-valuemax="359" aria-valuenow="48">
        <circle class="pz-hit" r="40"/><circle class="pz-halo" r="20"/><circle class="pz-bola" r="11"/></g>
    </svg>
    <div class="pz-reto">
      <p class="pz-lee"><i>sen</i> <b>48°</b> = <b>0.74</b></p>
      <p class="pz-reto-t" aria-live="polite">${PZ_RETO}</p>
      <button class="pz-reto-go" type="button" data-pz="prueba" hidden>Pide tu código y sigue gratis</button>
    </div></div>`;

const PZ_AREA = `<svg class="pz-area" viewBox="0 0 320 300">
    <rect class="pz-aa"/><rect class="pz-ab"/><rect class="pz-ab pz-ba"/><rect class="pz-bb"/>
    <text class="pz-t-aa"/><text class="pz-t-ab"/><text class="pz-t-ba"/><text class="pz-t-bb"/>
    <text class="pz-l-a"/><text class="pz-l-b"/><path class="pz-corte"/>
    <g class="pz-knob" role="slider" tabindex="0" aria-label="Dónde se parte el lado del cuadrado" aria-valuemin="1" aria-valuemax="9" aria-valuenow="7">
      <circle class="pz-hit" r="30"/><circle class="pz-bola" r="10"/></g></svg>`;
const PZ_PALANCA = `<svg class="pz-pal" viewBox="0 0 360 250">
    <path class="pz-base" d="M180 148l-26 60h52z"/><path class="pz-suelo" d="M96 208h168"/>
    <g class="pz-viga"><path class="pz-brazo" d="M24 144h312"/>
      ${[-4, -3, -2, -1, 1, 2, 3, 4].map(k => `<path class="pz-marca" d="M${180 + k * 36} 144v9"/>`).join('')}
      <g class="pz-izq" transform="translate(72 144)"><rect x="-19" y="-40" width="38" height="38" rx="9"/><text y="-15">2</text></g>
      <g class="pz-knob pz-der" role="slider" tabindex="0" aria-label="Distancia del peso de 3 kilos al apoyo" aria-valuemin="1" aria-valuemax="4" aria-valuenow="4">
        <rect class="pz-hit" x="-32" y="-64" width="64" height="76"/><rect x="-23" y="-48" width="46" height="46" rx="10"/><text y="-18">3</text></g></g>
    <circle class="pz-pivote" cx="180" cy="145" r="6"/></svg>`;
const PZ_TUTOR = `<div class="pz-agenda" aria-hidden="true"><div class="pz-dias">${['L', 'M', 'M', 'J', 'V'].map((d, i) => `<span${i === 2 ? ' class="on"' : ''}><small>${d}</small>${11 + i}</span>`).join('')}</div>
    <div class="pz-horas">${['2:00 p. m.', '3:00 p. m.', '4:00 p. m.'].map((h, i) => `<span${i === 2 ? ' class="on"' : ''}>${h}</span>`).join('')}</div></div>`;
const PZ_MUNDOS = 12;   // mundos a la vista por curso; los demás se cuentan

// ---- tu camino: del colegio al grado (spec 2026-11-24-portada-aliado) ----
// Cada etapa nombra los cursos que la sirven; el que aún no está publicado sale como «Muy pronto».
const PZ_ETAPAS = [
  { id: 'colegio', name: 'Colegio', h: 'Llega con bases', p: 'Cierra los vacíos desde cero, con la idea antes que la fórmula.', cursos: ['algebra', 'trig', 'preicfes'] },
  { id: 'admision', name: 'Admisión', h: 'Presenta el examen sabiendo qué esperar', p: 'Razonamiento lógico y comprensión lectora, explicados paso a paso y con la forma en que se preguntan.', cursos: ['preuda'], mas: [{ t: 'Libros impresos' }, { t: 'Asesorías', si: ['preuda'] }] },
  { id: 'semestres', name: 'Semestres', h: 'Que las matemáticas no te frenen la carrera', p: 'Temas que siguen el programa de la Universidad de Antioquia y ejercicios para llegar preparado al parcial.', cursos: ['algebra', 'trig', 'calc', 'geo'], mas: [{ t: 'Asesorías' }] },
  { id: 'grado', name: 'Grado', h: 'Alguien a quien preguntarle', p: 'Cálculo, Física y Álgebra Lineal, con asesorías virtuales de una hora para cuando una materia se ponga difícil.', cursos: ['int', 'lin', 'fis'], mas: [{ t: 'Asesorías de universidad', si: ['calc', 'fis', 'int', 'lin'] }] },
];
const PZ_PARADAS = [.1, .37, .64, .9];
const pzCaminoY = x => .8 - .62 * x - .09 * Math.sin(x * Math.PI * 3);   // altura del camino, 0 arriba y 1 abajo
const pzEtapaEn = x => PZ_PARADAS.reduce((m, p, i) => (Math.abs(p - x) < Math.abs(PZ_PARADAS[m] - x) ? i : m), 0);
const pzCursosDe = (e, visibles, todos) => e.cursos.map(id => ({ c: visibles.find(c => c.id === id) || todos.find(c => c.id === id), listo: visibles.some(c => c.id === id) })).filter(x => x.c);
// Resorte amortiguado (un paso): devuelve [posición, velocidad].
function pzResorte(x, v, meta, dt, k = 170, c = 24) {
  const h = Math.min(dt, .032), a = k * (meta - x) - c * v;
  return [x + (v + a * h) * h, v + a * h];
}
const pzCaminoD = () => Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${(i / 60 * 1000).toFixed(1)} ${(pzCaminoY(i / 60) * 300).toFixed(1)}`).join('');
const PZ_DUDAS = [
  ['En clase lo entiendo, pero en el parcial me bloqueo', 'Mirar no es hacer. Aquí mueves cada idea hasta que puedes reconstruirla sin ayuda, y después la usas en problemas distintos.'],
  ['Me aprendo la fórmula y al mes se me olvida', 'Primero ves de dónde sale. Cuando la idea es tuya, la fórmula se puede volver a armar.'],
  ['No sé por dónde empezar a estudiar', 'Cada curso es un camino desde cero: un mundo después de otro. Abres Zuka y la lección que sigue ya está lista.'],
  ['Me da pena preguntar', 'Te equivocas sin público y pides pistas cuando quieras. Si hace falta, separas una asesoría y lo resuelves con una persona.'],
];
const pzCamino = (cursos, todos) => `<div class="pz-ruta" data-en="1">
      <div class="pz-ruta-map"><svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path class="pz-ruta-b" d="${pzCaminoD()}"/><path class="pz-ruta-l" d="${pzCaminoD()}"/></svg>
        <span class="pz-ruta-yo" aria-hidden="true"></span>
        <div role="tablist" aria-label="Etapas">${PZ_ETAPAS.map((e, i) => `<button type="button" role="tab" id="pz-et-${i}" aria-controls="pz-ep-${i}" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}" style="left:${PZ_PARADAS[i] * 100}%;top:${(pzCaminoY(PZ_PARADAS[i]) * 100).toFixed(1)}%"><i></i><span>${e.name}</span></button>`).join('')}</div></div>
      <div class="pz-ruta-txt">${PZ_ETAPAS.map((e, i) => `<div role="tabpanel" id="pz-ep-${i}" aria-labelledby="pz-et-${i}" class="pz-ep${i === 1 ? ' on' : ''}"${i === 1 ? '' : ' inert'}><h3>${e.h}</h3><p>${e.p}</p>
        <ul>${pzCursosDe(e, cursos, todos).map(({ c, listo }) => `<li style="--c:${c.color}"${listo ? '' : ' class="pronto"'}>${pzEsc(c.name)}${listo ? '' : '<small>Muy pronto</small>'}</li>`).join('')}${(e.mas || []).map(m => (!m.si || cursos.some(c => m.si.includes(c.id)) ? `<li>${m.t}</li>` : `<li class="pronto">${m.t}<small>Muy pronto</small></li>`)).join('')}</ul></div>`).join('')}</div></div>`;

// ---- programas (spec 2026-11-24-portada-programas; referencia de estructura: instruimos.com) ----
const PZ_LIBROS = [['Número y forma', 1], ['Orden, lógica y azar', 2], ['Leer lo que dice', 3], ['Leer lo que quiere decir', 4]];
// Lo que cada curso es para el estudiante. `tag`: su etiqueta; `meta`: para qué sirve; `trae`: además de las lecciones.
const PZ_PROG = {
  preuda: { color: '#22a652', foto: '<img class="pz-img-udea" src="brand/udea.webp" alt="La biblioteca y la fuente de la Universidad de Antioquia" width="900" height="600" loading="lazy">', tag: 'Admisión', h: 'Entra a la UdeA entendiendo el examen', meta: 'Llega al examen de admisión sabiendo qué se pregunta y cómo razonarlo.', trae: 'Explicaciones interactivas, ejercicios y evaluaciones por mundo' },
  preicfes: { foto: '<img class="pz-img-saber" src="brand/saber11.webp" alt="Una mano rellena con lápiz una hoja de respuestas" width="1200" height="900" loading="lazy">', tag: 'Grado 11', h: 'Las cinco pruebas del Saber 11, una por una', meta: 'Prepara el Saber 11 área por área, con problemas en contexto.', trae: 'Matemáticas, Lectura, Sociales, Ciencias e Inglés' },
};
// Cursos de fundamentación en Ingeniería y Ciencias: van juntos en una lámina y una tarjeta ancha.
const PZ_FUND = ['algebra', 'trig', 'calc', 'geo', 'int', 'lin', 'fis'], PZ_FUND_N = 'Fundamentación en Ingeniería y Ciencias', PZ_FUND_C = '#5eead4';
const PZ_CORTO = { algebra: 'Álgebra', trig: 'Trigo', calc: 'Cálculo', geo: 'Geometría', int: 'Integral', lin: 'Lineal', fis: 'Física' };
const PZ_ORDEN = ['preuda', 'preicfes', 'algebra', 'trig'];
const pzOrdena = cs => [...cs].sort((a, b) => ((PZ_ORDEN.indexOf(a.id) + 1) || 99) - ((PZ_ORDEN.indexOf(b.id) + 1) || 99));
const PZ_TABS = { 'Zuka, tu aliado': 'Inicio', 'Estudia desde cualquier lugar': 'Donde quieras', 'Preuniversitario UdeA': 'UdeA', 'Preicfes Saber 11': 'Saber 11', 'Fundamentación en Ingeniería y Ciencias': 'Ingeniería', 'Libros de admisión': 'Libros', 'Zuka para instituciones': 'Colegios' };
// Palabra gigante y fichas de cada lámina.
const PZ_GRAN = {
  'Zuka, tu aliado': ['Zuka', ['x²', '√', 'π', '∑', 'θ']], 'Estudia desde cualquier lugar': ['donde sea', ['+', '÷', '=', '×', '%']], 'Preuniversitario UdeA': ['UdeA', ['A', 'B', 'C', 'D', '40']], 'Preicfes Saber 11': ['Saber', ['11', 'A', '?', '%', '¿']],
  'Fundamentación en Ingeniería y Ciencias': ['ingeniería', ['∫', 'dx', 'lim', 'θ', 'Σ']], 'Libros de admisión': ['papel', ['Aa', '1', '2', '3', '4']], 'Zuka para instituciones': ['colegio', ['11A', '10B', '%', '✓', '9°']],
};
// Precio más bajo que se vende hoy, de lo que publica la tienda: { precio, meses } o null (entonces no se muestra nada).
function pzDesdeCurso(productos, id) {
  const ps = (productos || []).filter(p => p.curso === id && p.activo && p.precio != null).sort((a, b) => a.precio - b.precio);
  return ps.length ? { precio: ps[0].precio, meses: ps[0].meses } : null;
}
function pzDesdeArt(arts, tipo) {
  // la hora en grupo se anuncia aparte: el precio de la tarjeta es el de una hora individual
  // «libros»: el paquete de los cuatro, impreso o digital (sueltos no se venden)
  const es = a => (tipo === 'libros' ? ['fisico', 'digital'].includes(a.tipo) && ((a.da || {}).fisicos || (a.da || {}).libros || []).length > 1 : a.tipo === tipo);
  const ps = (arts || []).filter(a => es(a) && a.activo && a.precio != null && (tipo !== 'asesoria' || (a.da.horas === 1 && a.da.horas_tipo === 'general'))).map(a => a.precio);
  return ps.length ? { precio: Math.min(...ps) } : null;
}
const PZ_I = {
  dia: '<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>', hoja: '<path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7"/>', mas: '<path d="M3 5h18v12H3zM8 21h8M12 17v4"/>',
  meta: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', precio: '<path d="M3 12V4h8l10 10-7 7zM7.5 8.5v.01"/>',
  fl: '<path d="M9 5l7 7-7 7"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const pzI = k => `<svg class="pz-i" viewBox="0 0 24 24" aria-hidden="true">${PZ_I[k]}</svg>`;
const PZ_WA = '<svg class="pz-wa-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.600 15L2 22l5.100-1.300A10 10 0 1 0 12 2zm0 18.200a8.200 8.200 0 0 1-4.200-1.150l-.3-.18-3 .8.8-2.950-.2-.31A8.200 8.200 0 1 1 12 20.200zm4.700-6.100c-.26-.13-1.520-.75-1.760-.84-.23-.08-.4-.13-.57.13-.17.26-.66.84-.8 1-.15.17-.3.2-.55.07a6.900 6.900 0 0 1-3.450-3c-.26-.45.26-.42.75-1.390.08-.17.04-.31-.02-.44l-.8-1.900c-.2-.5-.42-.43-.57-.44h-.5c-.17 0-.44.06-.67.31-.23.26-.88.86-.88 2.100s.9 2.440 1.030 2.600c.13.17 1.780 2.720 4.310 3.810 1.600.69 2.230.75 3.030.63.49-.07 1.520-.62 1.730-1.220.21-.6.21-1.110.15-1.220-.06-.11-.23-.17-.49-.3z"/></svg>';

// Quiénes somos: tres afiches (entrar, no soltarla, cumplir el sueño). Símbolos: Phosphor Icons 2.1.1, duotono (licencia MIT).
const PZ_SUENOS = [
  { c: '#a3e635', h: 'Que entrar a la U no sea un lujo', p: 'Educación de la buena, desde tu celu y a tu ritmo, vivas donde vivas. Y el primer mundo va por cuenta de la casa.',
    d: '<path d="M200,40V224H168V32h24A8,8,0,0,1,200,40Z" opacity="0.2"/><path d="M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-40,0H176V40h16ZM64,40h96V216H64Zm80,92a12,12,0,1,1-12-12A12,12,0,0,1,144,132Z"/>' },
  { c: '#ff9d8c', h: 'Que nadie tire la toalla', p: 'A muchos la carrera se les enreda por las mates del primer semestre. Nosotros te ayudamos a llegar bien parado, para que no te toque soltarla.',
    d: '<path d="M200,152l-40,40L96,176,40,136,72.68,70.63,128,56l55.32,14.63L183.6,72H144L98.34,116.29a8,8,0,0,0,1.38,12.42C117.23,139.9,141,139.13,160,120Z" opacity="0.2"/><path d="M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l55.07-55.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41ZM41.53,64,62,74.22,36.43,125.27,16,115.06Zm116,119.13L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm62-57.87-25.52-51L214.47,64,240,115.06Zm-87.75,92.67a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z"/>' },
  { c: '#ffd257', h: 'Que cumplas ese sueño', p: 'Ser la primera de la casa en graduarse, ingeniero, profe, doctora… El sueño lo pones tú. Nosotros le metemos la ficha contigo.',
    d: '<path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2"/><path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"/>' },
];
const PZ_COMO = ['Primero la idea, después la fórmula', 'Juegas en vez de memorizar', 'Pistas cuando te trabas', 'Sin cronómetro ni afán'];

// Clips de la app de verdad (webp animados, sin sonido); `-quieto` es el cuadro fijo, para la pausa y «reducir movimiento».
const PZ_CLIPS = [
  ['explora', 'Ves la idea', 'La lección te la construye paso a paso.', 'Lección: los cuadrados de los lados de un triángulo muestran el teorema de Pitágoras'],
  ['figura', 'La mueves tú', 'Arrastras la figura y la cuenta cambia contigo.', 'Ejercicio: se arrastra la esquina de una foto hasta ampliarla sin deformarla'],
  ['rotula', 'Armas la respuesta', 'Llevas cada ficha a su lugar y compruebas.', 'Ejercicio: se arrastran medidas al lado que le falta a cada triángulo'],
  ['lanza', 'Y hasta juegas', 'Mandas el dron al número que responde.', 'Juego: un dron vuela por una recta hasta el número de la respuesta'],
];

function presentacionHTML(lista, { worlds = {}, install = '', todos = lista } = {}) {
  const cursos = pzOrdena(lista);
  const logo = zukaWord();
  const mascot = pose => (typeof mascotSVG === 'function' ? mascotSVG(pose) : '');
  const art = c => (typeof courseArt === 'function' ? courseArt(c, 'lg') : `<span class="pz-dot" style="background:${c.color}"></span>`);
  const empieza = (cls = '') => `<button class="btn main brand ${cls}" type="button" data-pz="prueba">Pide tu código de prueba</button>`;
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const pasos = '<ol class="pz-pasos"><li><b>Pide tu código</b><span>Por WhatsApp, gratis.</span></li><li><b>Juega el primer mundo</b><span>Y decide con calma.</span></li><li><b>Sigue donde vas</b><span>Tu curso se activa en el mismo código.</span></li></ol>';
  const info = (que, cls = '', txt = '') => `<button class="pz-wa ${cls}" type="button" data-pz="info" data-que="${pzEsc(que)}"${txt ? '' : ` aria-label="Preguntar por WhatsApp sobre ${pzEsc(que || 'Zuka')}"`}>${PZ_WA}${txt}</button>`;
  const precio = k => `<p class="pz-f pz-f-precio" data-pz-precio="${k}" hidden>${pzI('precio')}<span></span></p>`;
  const fila = (i, b, t) => `<p class="pz-f">${pzI(i)}<span><b>${b}</b>${t ? `<br>${t}` : ''}</span></p>`;
  const celu = id => `<span class="pz-celu"><img src="brand/app/${id}.webp" alt="" width="480" height="973" loading="lazy"></span>`;
  const libros = cls => `<div class="pz-estante ${cls}" data-inclina="9">${PZ_LIBROS.map(([t, n]) => `<span style="--i:${n - 2.5}"><img src="brand/libros/${n}.webp" alt="Libro ${n}: ${t}" loading="lazy" width="340" height="480"></span>`).join('')}</div>`;
  const orden = cursos;
  // Tarjeta de servicio: la foto manda; una frase, los datos en un renglón y el precio.
  const tarjeta = ({ color, fig, cls = '', name, tag, frase, datos, pr, ir, tab }) => `<article class="pz-prog ${cls} pz-rev" style="--c:${color}"><div class="pz-prog-art" aria-hidden="true">${fig}</div>
      <div class="pz-prog-txt"><p class="pz-prog-k">${tag}</p><h3>${pzEsc(name)}</h3><p class="pz-prog-f">${frase}</p><p class="pz-prog-d">${datos.map(d => `<span>${d}</span>`).join('')}</p>
        <div class="pz-prog-pie">${precio(pr)}<span class="pz-prog-b"><button class="btn sm" type="button" data-pz-ir="${ir}"${tab == null ? '' : ` data-tab="${tab}"`}>Ver más<span class="pz-sr"> sobre ${pzEsc(name)}</span></button>${info(name)}</span></div></div></article>`;
  const fund = PZ_FUND.map(id => cursos.find(c => c.id === id) || todos.find(c => c.id === id)).filter(Boolean), hayFund = cursos.some(c => PZ_FUND.includes(c.id));
  const foto = '<img src="brand/ingenieros.webp" alt="Dos ingenieros resuelven las reacciones de una viga en un tablero" width="1300" height="732" loading="lazy">';
  // Mazo: una carta por curso, una sobre otra; pzMazoVivo las abre bajo el puntero.
  const deCurso = c => (cursos.includes(c) ? `${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}` : 'Muy pronto');
  const mazo = hayFund ? `<div class="pz-mazo" style="--n:${fund.length}"><div class="pz-cartas">${fund.map((c, i) => `<button type="button" class="pz-carta${cursos.includes(c) ? '' : ' pronto'}" style="--i:${i};--k:${i - (fund.length - 1) / 2};--c:${c.color}" ${cursos.includes(c) ? `data-pz-ir="#pz-cursos" data-tab="${cursos.indexOf(c)}"` : 'data-pz-ir=".pz-prog-fund"'} data-n="${pzEsc(c.name)}" data-d="${deCurso(c)}" aria-label="${pzEsc(c.name)}: ${deCurso(c)}">${art(c)}<b>${PZ_CORTO[c.id] || pzEsc(c.name)}</b></button>`).join('')}</div><p class="pz-mazo-t" aria-hidden="true"><b>${pzEsc(fund[0].name)}</b><span>${deCurso(fund[0])}</span></p></div>` : '';
  const tarjetaFund = hayFund ? `<article class="pz-prog pz-prog-fund pz-rev" style="--c:${PZ_FUND_C}"><div class="pz-prog-art" aria-hidden="true">${foto}</div>
      <div class="pz-prog-txt"><p class="pz-prog-k">Primeros semestres</p><h3>${PZ_FUND_N}</h3><p class="pz-prog-f">Cierra los vacíos del colegio y llega preparado a tus parciales.</p>
        <ul class="pz-fcs">${fund.map(c => (cursos.includes(c) ? `<li><button type="button" data-pz-ir="#pz-cursos" data-tab="${cursos.indexOf(c)}" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}</small><small data-pz-precio="curso:${c.id}" hidden><span></span></small></span></button></li>` : `<li class="pronto" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>Muy pronto</small></span></li>`)).join('')}</ul>
        <div class="pz-prog-pie"><span class="pz-prog-b"><button class="btn sm" type="button" data-pz-ir="#pz-cursos" data-tab="${cursos.findIndex(c => PZ_FUND.includes(c.id))}">Ver más<span class="pz-sr"> sobre ${PZ_FUND_N}</span></button>${info(`los cursos de ${PZ_FUND_N}`)}</span></div></div></article>` : '';
  const progs = orden.filter(c => !PZ_FUND.includes(c.id)).map(c => {
    const p = PZ_PROG[c.id] || { tag: pzEsc(c.level || 'Curso'), meta: pzEsc(c.tagline || ''), trae: 'Explicaciones y ejercicios que se juegan' };
    return tarjeta({ color: p.color || c.color, cls: `pz-prog-${c.id}`, fig: p.foto || (PZ_PROG[c.id] ? celu(c.id) : art(c)), name: c.name, tag: p.tag, frase: p.meta, pr: `curso:${c.id}`, ir: '#pz-cursos', tab: cursos.indexOf(c),
      datos: [plural((c.units || []).length, 'mundo', 'mundos'), plural(pzLessons(c), 'lección', 'lecciones'), p.trae] });
  }).concat([
    tarjeta({ color: '#f5c451', cls: 'pz-prog-lib', fig: libros(''), name: 'Libros de admisión', tag: 'Paquete de 4, impresos o digitales', pr: 'art:libros', ir: '#pz-libros', frase: 'Estudia el examen de admisión tema por tema, en papel o en la app.', datos: ['Los cuatro libros juntos, a color', 'Ejemplos resueltos y talleres con clave'] }),
    tarjeta({ color: '#ff8a7a', cls: 'pz-prog-ase', fig: PZ_TUTOR, name: 'Asesorías en vivo', tag: 'Por horas', pr: 'art:asesoria', ir: '#pz-d-tut', frase: 'Resuelve con una persona lo que se te puso difícil.', datos: ['Una hora virtual', 'Tú eliges los temas, el día y la hora'] }),
    tarjetaFund,
    `<article class="pz-prog-inst pz-rev"><div><p class="pz-prog-k">Colegios e instituciones</p><h3>Zuka para todo tu colegio</h3><p class="pz-prog-f">Cupos para tus estudiantes y un portal para registrarlos y ver cómo van.</p><span class="pz-prog-b"><a class="btn sm" href="instituciones/">Cotizar</a><button class="btn sm ghost" type="button" data-pz-ir="#pz-inst">Ver precios</button></span></div>${pzInstMini()}</article>`,
  ]).join('');
  const prontos = todos.filter(c => !cursos.some(x => x.id === c.id) && !(hayFund && PZ_FUND.includes(c.id)));
  // Carrusel: la promesa con la foto, un programa por lámina y los libros. `data-c`: el color de la franja.
  // Detrás de cada lámina va su palabra en gigante y alrededor flotan fichas a distinta profundidad (pzCarrusel las mueve con el paso).
  const lamina = (c, name, cuerpo, fig, cls = '') => { const [w, fs] = PZ_GRAN[name] || [name.split(' ')[0], ['x', '+', '=', '?']]; return `<div class="pz-lamina ${cls}" data-c="${c}" data-w="${pzEsc(w)}" role="group" aria-roledescription="lámina" aria-label="${pzEsc(name)}"><span class="pz-gran" aria-hidden="true" style="--l:${[...w].length}">${pzEsc(w)}</span><span class="pz-fichas" aria-hidden="true">${fs.map((f, i) => `<i style="--i:${i}"><b>${pzEsc(f)}</b></i>`).join('')}</span><div class="pz-in pz-lam-in"><div class="pz-lam-txt">${cuerpo}</div><div class="pz-lam-fig">${fig}</div></div></div>`; };
  const mancha = f => `<div class="pz-mancha" data-inclina="7" aria-hidden="true">${f}</div>`;
  const laminas = [
    lamina('#a3e635', 'Zuka, tu aliado', `<h1>Tu aliado para <em>entrar</em> a la universidad y <em>terminarla</em></h1><p class="pz-lead">Cursos que se juegan, libros y asesorías para preparar la admisión y sacar adelante las matemáticas de la carrera.</p>
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz-ir="#pz-programas">Ver programas</button></div>`, '<div class="pz-mancha pz-foto" data-inclina="5"><img src="brand/estudiantes.webp" alt="Cuatro estudiantes universitarios conversan en el campus" width="1200" height="885" fetchpriority="high"></div>', 'pz-lam-foto'),
    lamina('#fdeee0', 'Estudia desde cualquier lugar', `<h2>Estudia desde cualquier lugar, <em>a tu ritmo</em></h2><p class="pz-lead">Desde tu celular, computador o tablet. Entras con el mismo código y tu avance te sigue.</p>
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz-ir="#pz-dudas">Cómo funciona</button></div>`, `<div class="pz-disp"><img class="pz-disp-f" src="brand/dispositivos.webp" alt="Una estudiante sonríe con su computador en un parque" width="1072" height="694" loading="lazy">
      <div class="pz-equipos" role="img" aria-label="La app Zuka en un celular, un computador y una tablet"><span class="pz-eq-cel"><img src="brand/app/preuda.webp" alt="" width="480" height="973" loading="lazy"></span><span class="pz-eq-pc"><img src="brand/app/computador.webp" alt="" width="880" height="550" loading="lazy"><i></i></span><span class="pz-eq-tab"><img src="brand/app/tablet.webp" alt="" width="480" height="662" loading="lazy"></span></div></div>`, 'pz-lam-disp'),
    ...orden.filter(c => PZ_PROG[c.id]).map(c => lamina(PZ_PROG[c.id].color || c.color, c.name, `<p class="pz-lam-k">${pzEsc(c.name)}</p><h2>${PZ_PROG[c.id].h}</h2><p class="pz-lead">${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}, a tu ritmo. El primer mundo es gratis con un código de prueba.</p>
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="${pzEsc(c.name)}">Quiero inscribirme</button><button class="btn ghost" type="button" data-pz="prueba">Probar gratis</button></div>`, PZ_PROG[c.id].foto ? `<div class="pz-mancha pz-foto pz-foto-ing" data-inclina="5">${PZ_PROG[c.id].foto}</div>` : mancha(celu(c.id)))),
    ...(hayFund ? [lamina(PZ_FUND_C, PZ_FUND_N, `<p class="pz-lam-k">Primeros semestres</p><h2>Fundamentación en Ingeniería y Ciencias</h2><p class="pz-lead">Las matemáticas que sostienen tu carrera, desde cero y a tu ritmo.</p>${mazo}
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="los cursos de ${PZ_FUND_N}">Quiero inscribirme</button><button class="btn ghost" type="button" data-pz-ir=".pz-prog-fund">Ver los cursos</button></div>`, `<div class="pz-mancha pz-foto pz-foto-ing" data-inclina="5">${foto}</div>`, 'pz-lam-fund')] : []),
    lamina('#f5e6c0', 'Libros de admisión', `<p class="pz-lam-k">Libros de admisión</p><h2>El examen, en cuatro libros</h2><p class="pz-lead">Un paquete de cuatro libros: dos de razonamiento lógico y dos de comprensión lectora. Impresos a color con envío, o digitales en la app.</p>
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="los libros de admisión">Quiero los libros</button><button class="btn ghost" type="button" data-pz-ir="#pz-libros">Conocerlos</button></div>`, mancha(libros('pz-est-lam')), 'pz-lam-libros'),
    lamina('#bfe3ff', 'Zuka para instituciones', `<p class="pz-lam-k">Colegios e instituciones</p><h2>Zuka para todo tu colegio</h2><p class="pz-lead">Cupos para tus estudiantes y un portal donde registras, acompañas y ves cómo va cada uno.</p>
      <div class="pz-ctas"><a class="btn main brand" href="instituciones/">Cotizar</a><button class="btn ghost" type="button" data-pz-ir="#pz-inst">Ver precios</button></div>`, `<div class="pz-mini" data-inclina="8">${pzInstMini()}</div>`, 'pz-lam-inst'),
  ];
  const mundo = u => {
    const w = worlds[u.world] || {};
    return `<li>${w.art ? `<span class="pz-lam world-art" aria-hidden="true">${w.art}</span>` : ''}<span>${pzEsc(w.name || u.title)}</span></li>`;
  };
  const gymC = cursos[0];
  const gymArt = typeof GYM_3D === 'string' && gymC
    ? `<span class="pz-gymart" data-inclina="14" style="${typeof gymFabColors === 'function' ? gymFabColors(gymC) : `--c:${gymC.color}`}">${GYM_3D}</span>` : '';
  const plates = n => (typeof gymPlates === 'function' ? gymPlates(n) : '');
  const demo = (cls, h, p, fig, pie = '') => `<article class="pz-demo ${cls} pz-rev" id="${cls}"><div class="pz-demo-txt"><h3>${h}</h3><p>${p}</p></div>
      <div class="pz-demo-fig">${fig}</div>${pie}</article>`;
  const menu = [['#pz-programas', 'Programas'], ['#pz-somos', 'Quiénes somos'], ['#pz-ruta', 'Tu camino'], ['#pz-como', 'Cómo se aprende'], ['#pz-inst', 'Instituciones'], ['#pz-dudas', 'Preguntas']];
  return `<header class="pz-bar"><div class="pz-in"><span class="pz-logo">${logo}</span>
      <nav class="pz-nav" id="pz-nav" aria-label="Secciones">${menu.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <span class="pz-bar-acts"><button class="pz-plat" type="button" data-pz="login"><span class="pz-larga">Plataforma virtual</span><span class="pz-corta">Entrar</span>${pzI('fl')}</button>
      <button class="pz-menu" type="button" aria-label="Menú" aria-expanded="false" aria-controls="pz-nav">${pzI('menu')}</button></span></div></header>
    <main class="pz-main">
    <section class="pz-hero pz-tinta" aria-roledescription="carrusel" aria-label="Programas destacados">
      <div class="pz-pista">${laminas.join('')}</div>
      <button class="pz-fl pz-ant" type="button" aria-label="Lámina anterior">${pzI('fl')}</button><button class="pz-fl pz-sig" type="button" aria-label="Lámina siguiente">${pzI('fl')}</button>
      <div class="pz-puntos"><button class="pz-pausa" type="button" aria-label="Pausar el carrusel"></button>${laminas.map((x, i) => { const n = (x.match(/aria-label="([^"]+)/) || [])[1] || '', tab = PZ_TABS[n] || n; return `<button type="button" class="pz-pto" aria-label="${tab}, lámina ${i + 1} de ${laminas.length}"${i ? '' : ' aria-current="true"'}><span aria-hidden="true">${tab}</span></button>`; }).join('')}</div>
    </section>
    <section class="pz-sec pz-in pz-programas" id="pz-programas">
      <header class="pz-head pz-rev"><h2>Elige por dónde <em>empiezas</em></h2><p>Cursos, libros, asesorías y un plan para colegios.</p></header>
      <div class="pz-progs">${progs}</div>
      ${prontos.length ? `<p class="pz-prontos"><b>Muy pronto</b>${prontos.map(c => `<span style="--c:${c.color}">${pzEsc(c.name)}</span>`).join('')}</p>` : ''}
    </section>
    <section class="pz-franja pz-azul" id="pz-somos"><div class="pz-in">
      <div class="pz-somos-top pz-rev"><div class="pz-somos-txt"><p class="pz-somos-k">Quiénes somos</p>
        <h2>Acá nadie se queda <em>por fuera</em></h2>
        <p class="pz-lead">Somos Zuka, una app hecha en Colombia. Creemos que estudiar con calidad no debería depender de la plata ni del barrio. Por eso te acompañamos a entrar a la U, a quedarte en ella y a salir con el cartón en la mano.</p></div>
        <div class="pz-somos-m" data-inclina="10"><p class="pz-globo">¿Malo para las mates? <b>¡Qué va!</b> De pronto nadie te las había explicado bien.</p><span aria-hidden="true">${mascot('cheer')}</span></div></div>
      <div class="pz-tres">${PZ_SUENOS.map(s => `<article class="pz-rev" style="--c:${s.c}"><svg viewBox="0 0 256 256" aria-hidden="true">${s.d}</svg><h3>${s.h}</h3><p>${s.p}</p></article>`).join('')}</div>
      <div class="pz-somos-como pz-rev"><h3>¿Y cómo? Sin enredos:</h3><ul>${PZ_COMO.map(t => `<li>${t}</li>`).join('')}</ul></div>
      </div>
    </section>
    <section class="pz-sec pz-in" id="pz-ruta">
      <header class="pz-head pz-rev"><h2>Contigo del colegio al grado</h2><p>Recorre el camino y mira qué tienes en cada etapa.</p></header>
      <div class="pz-rev">${pzCamino(cursos, todos)}</div>
    </section>
    <section class="pz-sec pz-in pz-pasa">
      <h2 class="pz-rev">¿Te ha pasado?</h2>
      <ul class="pz-quejas pz-rev">${PZ_DUDAS.map(([q, r], i) => `<li${i ? '' : ' class="on"'}><button type="button" aria-expanded="${!i}" aria-controls="pz-q-${i}">«${q}»</button><div class="pz-resp" id="pz-q-${i}"><p>${r}</p></div></li>`).join('')}</ul>
    </section>
    <section class="pz-sec pz-in" id="pz-como">
      <header class="pz-head pz-rev"><h2>Cómo se aprende en Zuka</h2>
        <p>Así se ve una lección por dentro: primero la idea, después la fórmula, y siempre con las manos.</p></header>
      <div class="pz-clips-caja pz-rev"><ul class="pz-clips">${PZ_CLIPS.map(([id, h, p, alt]) => `<li><span class="pz-clip"><picture><source media="(prefers-reduced-motion: reduce)" srcset="brand/clips/${id}-quieto.webp"><img src="brand/clips/${id}.webp" data-clip="${id}" alt="${alt}" width="320" height="622" loading="lazy"></picture></span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ul>
        <button class="pz-clips-p" type="button" aria-pressed="false">Pausar los videos</button></div>
      <p class="pz-prueba pz-rev">Ahora prueba tú: estos dibujos funcionan.</p>
      <div class="pz-demos">
        ${demo('pz-d-rueda', 'La rueda que dibuja la onda', 'La altura del punto es el seno del ángulo. Muévelo y mira cómo se dibuja.', pzRueda())}
        ${demo('pz-d-area', 'La fórmula deja de ser un truco', 'Mueve el corte: el cuadrado siempre se arma con las mismas cuatro piezas.', PZ_AREA,
    '<p class="pz-cuenta pz-cuenta-area"></p>')}
        ${demo('pz-d-pal', 'Practicas jugando', 'Corre el peso hasta equilibrar la palanca. La cuenta se escribe sola.', PZ_PALANCA,
    '<p class="pz-cuenta pz-cuenta-pal"></p>')}
        ${demo('pz-d-gym', 'Gimnasio cerebral', 'Retos guiados de lo que ya aprendiste. Empiezas suave y subes cuando estés listo.', gymArt,
    `<ul class="pz-levels"><li class="lv1">${plates(1)}Calentamiento</li><li class="lv2">${plates(2)}Fuerza</li><li class="lv3">${plates(3)}Élite</li></ul>`)}
        ${demo('pz-d-tut', 'Tutorías en vivo', 'Separa una asesoría virtual: eliges la materia, los temas, el día y la hora. Se compran por horas.', PZ_TUTOR)}
      </div>
    </section>
    <section class="pz-sec pz-in pz-topics" id="pz-cursos">
      <header class="pz-head pz-rev"><h2>Lo que vas a aprender</h2><p>Cada curso es un mapa de mundos, en orden y desde cero.</p></header>
      <div class="pz-cursos pz-rev">
        <div class="pz-tabs" role="tablist" aria-label="Cursos">${cursos.map((c, i) => `<button type="button" role="tab" id="pz-tab-${i}" aria-controls="pz-panel-${i}" data-pz-tab="${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>${plural(pzLessons(c), 'lección', 'lecciones')}</small></span></button>`).join('')}</div>
        ${cursos.map((c, i) => `<div class="pz-panel" role="tabpanel" id="pz-panel-${i}" aria-labelledby="pz-tab-${i}" data-pz-panel="${i}" style="--c:${c.color}"${i ? ' hidden' : ''}>
          <p>${pzEsc(c.tagline || '')}</p><ul class="pz-mundos">${(c.units || []).slice(0, PZ_MUNDOS).map(mundo).join('')}</ul>
          ${(c.units || []).length > PZ_MUNDOS ? `<p class="pz-mas">y ${plural(c.units.length - PZ_MUNDOS, 'mundo más', 'mundos más')}</p>` : ''}</div>`).join('')}
      </div>
    </section>
    ${pzInstHTML(cursos)}
    <section class="pz-sec pz-in pz-libros" id="pz-libros">
      <div class="pz-libros-txt pz-rev"><h2>Los libros, en un paquete</h2>
        <p>Cuatro libros para el examen de admisión: dos de razonamiento lógico y dos de comprensión lectora. Ejemplos resueltos, talleres con clave y la forma en que se pregunta cada tema. Se venden juntos, en un paquete: impresos a color con envío, o digitales en la app.</p></div>
      <div class="pz-rev">${libros('')}</div>
    </section>
    <section class="pz-sec pz-in pz-dudas" id="pz-dudas">
      <h2 class="pz-rev">Preguntas frecuentes</h2>
      <div class="pz-faq pz-rev">
        <details open><summary>¿Qué puedo hacer gratis?</summary><p>El primer mundo del curso, con un código de prueba que pides por WhatsApp. Para seguir, compras el curso y se activa en tu mismo código.</p></details>
        <details><summary>¿Necesito saber mucho para empezar?</summary><p>No. Los cursos empiezan desde cero, y casi todos los ejercicios traen una pista.</p></details>
        <details><summary>¿Sirve en el celular y en el computador?</summary><p>Sí. Funciona en el navegador de los dos y también se instala como una app, sin pasar por la tienda.</p>${install}</details>
        <details><summary>¿Cómo entro y qué pasa con mi avance?</summary><p>Escribes tu código y listo. Con ese mismo código entras siempre y conservas tu avance.</p></details>
      </div>
    </section>
    <section class="pz-final pz-tinta"><div class="pz-in"><div class="pz-final-art" data-inclina="16">${mascot('cheer')}</div>
      <div class="pz-final-txt"><h2>¿Qué estás esperando?</h2><p class="pz-lead">La universidad empieza hoy, y el primer mundo es gratis.</p>${pasos}
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz="login">Ya tengo código</button></div></div></div></section>
    </main>
    <footer class="pz-foot"><div class="pz-in"><div class="pz-foot-m"><span class="pz-logo">${logo}</span><small>Potencia tu mente</small></div>
      <nav aria-label="Programas"><b>Programas</b>${orden.map(c => `<a href="#pz-cursos" data-tab="${cursos.indexOf(c)}">${pzEsc(c.name)}</a>`).join('')}<a href="#pz-libros">Libros de admisión</a></nav>
      <nav aria-label="Zuka"><b>Zuka</b>${menu.slice(1).map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <div class="pz-foot-c"><b>Escríbenos</b>${info('', 'con', 'WhatsApp')}<button type="button" data-pz="login">Entrar a la plataforma</button></div>
      <small class="pz-foot-c2">© 2026 Zuka</small></div></footer>
    ${info('', 'pz-flota')}`;
}
// ---- instituciones (spec 2026-11-25-instituciones): qué trae y cuánto cuesta, con el precio en vivo ----
const PZ_INST = [['cupos', 'Tú registras', 'Pegas la lista de Excel y cada estudiante queda con su código.'], ['ve', 'Ves cómo van', 'Quién estudia, cuánto, qué domina y quién necesita una mano.'], ['meta', 'Pones metas', 'Un mundo o unas lecciones, con fecha, para cada grupo.'], ['docente', 'Invitas a tus docentes', 'Cada uno ve solo sus grupos.']];
const PZ_INST_I = { cupos: '<path d="M4 7h10M4 12h7M4 17h5M16 13v8M12 17h8"/>', ve: '<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/>', meta: '<circle cx="12" cy="12" r="8.500"/><circle cx="12" cy="12" r="3.500"/>', docente: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.500 3-5.500 6.500-5.500s6.500 2 6.500 5.500M17 6v8M13.500 10H21"/>' };
// Un portal en pequeño (datos de ejemplo).
const pzInstMini = () => `<div class="pz-ip" role="img" aria-label="Ejemplo del portal: cupos usados, actividad de la semana y avance por grupo"><p class="pz-ip-t"><b>Tu institución</b><small>Ejemplo</small></p><div class="pz-ip-k"><span class="pz-ip-a"><b>84</b><small>de 100 cupos</small></span><div class="pz-ip-b">${[38, 62, 50, 88, 74, 30, 22].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('')}</div></div>${[['11A', 72], ['11B', 54], ['10A', 38]].map(([g, p]) => `<p class="pz-ip-g"><span>${g}</span><i style="--p:${p}%"></i><b>${p} %</b></p>`).join('')}</div>`;
function pzInstHTML(cursos) {
  return `<section class="pz-sec pz-in pz-inst" id="pz-inst"><header class="pz-head pz-rev"><h2>Para colegios e instituciones</h2><p>Compra cupos para tus estudiantes y administra todo desde un portal. Mueve la barra y mira el precio.</p></header>
    <div class="pz-inst-g pz-rev"><div class="pz-inst-c"><p class="pz-inst-n"><output>60</output> estudiantes</p><input class="pz-inst-r" type="range" min="0" max="100" value="36" aria-label="Número de estudiantes">
        <div class="pz-inst-cs" role="group" aria-label="Cursos">${cursos.map((c, i) => `<button type="button" data-ic="${c.id}" aria-pressed="${!i}" style="--c:${c.color}">${pzEsc(c.name)}</button>`).join('')}</div>
        <div class="pz-inst-cs" role="group" aria-label="Duración"><button type="button" data-im="6" aria-pressed="true">6 meses</button><button type="button" data-im="12" aria-pressed="false">1 año</button></div>
        <div class="pz-inst-p" aria-live="polite"></div><div class="pz-ctas"><a class="btn main brand pz-inst-go" href="instituciones/">Pedir cotización</a><a class="btn ghost" href="instituciones/portal/">Entrar al portal</a></div></div>
      <div class="pz-inst-v">${pzInstMini()}<ul>${PZ_INST.map(([k, h, p]) => `<li><svg class="pz-i" viewBox="0 0 24 24" aria-hidden="true">${PZ_INST_I[k]}</svg><span><b>${h}</b>${p}</span></li>`).join('')}</ul></div></div></section>`;
}
// La barra va de 10 a 1000 estudiantes sin ser lineal: los números chicos tienen más sitio.
const pzInstN = v => { const n = 10 * Math.pow(100, v / 100); return n < 50 ? Math.round(n) : n < 200 ? Math.round(n / 5) * 5 : Math.round(n / 10) * 10; };
function pzInstVivo(el) {
  const s = el.querySelector('.pz-inst'), r = s?.querySelector('.pz-inst-r');
  if (!s) return;
  s.pinta = () => {
    const n = pzInstN(+r.value), cs = [...s.querySelectorAll('[data-ic][aria-pressed="true"]')].map(b => b.dataset.ic), meses = +s.querySelector('[data-im][aria-pressed="true"]').dataset.im, conf = instConf(Cuenta.ajustes.inst_precios);
    const p = instPrecio({ n, meses, cursos: cs }, Cuenta.productos, conf), sig = instSiguiente(n, conf), nom = id => pzEsc((COURSES.find(c => c.id === id) || {}).name || id);
    s.querySelector('output').textContent = n; r.setAttribute('aria-valuetext', `${n} estudiantes`);
    s.querySelector('.pz-inst-p').innerHTML = !cs.length ? '<p>Elige al menos un curso.</p>' : `${p.unitario ? `<p class="pz-inst-u"><b>${cop(p.unitario)}</b> por estudiante${p.descuento ? ` <em class="pz-inst-d">−${p.descuento} %</em>` : ''}</p><p>${cop(p.total)} en total por ${meses === 12 ? 'un año' : '6 meses'}.</p>` : '<p class="pz-inst-u"><b>Se cotiza</b></p>'}${p.unitario && p.sinPrecio.length ? `<p>${p.sinPrecio.map(nom).join(', ')} se cotiza aparte.</p>` : ''}${p.unitario && sig ? `<p>Desde ${sig[0]} estudiantes, ${sig[1]} % de descuento.</p>` : ''}`;
    s.querySelector('.pz-inst-go').href = `instituciones/?n=${n}&m=${meses}&c=${cs.join(',')}#cotizar`;
  };
  r.oninput = s.pinta;
  s.querySelectorAll('[data-ic]').forEach(b => { b.onclick = () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); s.pinta(); }; });
  s.querySelectorAll('[data-im]').forEach(b => { b.onclick = () => { s.querySelectorAll('[data-im]').forEach(x => x.setAttribute('aria-pressed', x === b)); s.pinta(); }; });
  s.pinta();
}
// Precios de la tienda: se escriben al llegar, sin volver a dibujar la página.
function pzPrecios(el, productos, arts) {
  el.querySelectorAll('[data-pz-precio]').forEach(p => {
    const [k, v] = p.dataset.pzPrecio.split(':'), d = k === 'curso' ? pzDesdeCurso(productos, v) : pzDesdeArt(arts, v);
    p.hidden = !d;
    if (d) p.querySelector('span').innerHTML = `Desde <b>${cop(d.precio)}</b>${d.meses ? ` por ${mesesTexto(d.meses)}` : v === 'asesoria' ? ' la hora' : ' los 4 libros'}`;
  });
}

// ---- dibujos que se mueven ----
// Arrastre directo (dedo, ratón) y flechas del teclado sobre una pieza `role="slider"`.
function pzArrastra(svg, knob, { mueve, tecla, suelta = () => {} }) {
  const punto = e => new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  let id = null;
  knob.addEventListener('pointerdown', e => {
    if (id !== null || e.button) return;
    id = e.pointerId; knob.setPointerCapture(id); knob.classList.add('held'); mueve(punto(e));
  });
  knob.addEventListener('touchstart', e => e.preventDefault(), { passive: false });   // el dedo arrastra, no desplaza
  knob.addEventListener('pointermove', e => { if (e.pointerId === id) mueve(punto(e)); });
  const fin = e => { if (e.pointerId !== id) return; id = null; knob.classList.remove('held'); suelta(); };
  knob.addEventListener('pointerup', fin); knob.addEventListener('pointercancel', fin);
  knob.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (d) { e.preventDefault(); tecla(d); }
  });
}
function pzRuedaViva(el, quieto) {
  const st = el.querySelector('.pz-stage'), svg = st.querySelector('svg'), $q = c => st.querySelector(c), knob = $q('.pz-knob');
  const [lee, dice, go] = [$q('.pz-lee'), $q('.pz-reto-t'), $q('.pz-reto-go')];
  let deg = 48, g, hecho = false, tocado = 0, visible = true, antes = 0, raf = 0;
  const pinta = () => {
    const t = deg * Math.PI / 180, x = g.cx + g.r * Math.cos(t), y = g.cy - g.r * Math.sin(t), n = Math.round(deg) % 360;
    const set = (c, k, v) => $q(c).setAttribute(k, v);
    set('.pz-onda', 'd', pzOnda(deg, g));
    set('.pz-tri', 'd', `M${g.cx} ${g.cy}L${x} ${y}V${g.cy}Z`);
    set('.pz-alto', 'd', `M${x} ${g.cy}V${y}`);
    set('.pz-guia', 'd', `M${x} ${y}H${g.x0}`);
    const q = g.r * .26;
    set('.pz-arco', 'd', `M${g.cx + q} ${g.cy}A${q} ${q} 0 ${deg > 180 ? 1 : 0} 0 ${g.cx + q * Math.cos(t)} ${g.cy - q * Math.sin(t)}`);
    set('.pz-fin', 'cx', g.x0); set('.pz-fin', 'cy', y);
    knob.setAttribute('transform', `translate(${x} ${y})`);
    knob.setAttribute('aria-valuenow', n);
    const v = Math.sin(t);
    knob.setAttribute('aria-valuetext', `${n} grados, altura ${v.toFixed(2)}`);
    lee.innerHTML = `<i>sen</i> <b>${n}°</b> = <b>${(Math.abs(v) < .005 ? 0 : v).toFixed(2).replace('-', '−')}</b>`;
  };
  const mide = () => {
    const W = st.clientWidth || 1440, H = svg.clientHeight || 380, ancho = W >= 760;
    const r = ancho ? Math.min(H * .41, 165) : Math.min(W * .22, H * .4);
    const gut = ancho ? 8 : 4, cx = gut + r + 14;
    g = { r, cx, cy: H / 2, x0: cx + r + (ancho ? 90 : 34), x1: W + 8, largo: ancho ? 2.6 : 1.5 };
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const aro = $q('.pz-aro');
    aro.setAttribute('cx', cx); aro.setAttribute('cy', g.cy); aro.setAttribute('r', r);
    $q('.pz-eje').setAttribute('d', `M0 ${g.cy}H${W}M${cx} ${g.cy - r - 22}V${g.cy + r + 22}`);
    $q('.pz-meta').setAttribute('d', `M${cx - r - 14} ${g.cy - r / 2}H${W}`);
    $q('.pz-meta-t').setAttribute('x', W - (ancho ? 32 : 14)); $q('.pz-meta-t').setAttribute('y', g.cy - r / 2 - 8);
    pinta();
  };
  const revisa = () => {
    const a = pzReto(deg);
    if (a === null) return;
    deg = a; pinta(); hecho = true; st.classList.add('ok');
    dice.innerHTML = `<b>¡Eso es!</b> sen ${a}° = ½. Así se siente una lección.`;
    go.hidden = false;
  };
  const toca = () => {   // se vuelve a mover después de acertar: el reto queda abierto otra vez
    tocado = performance.now(); st.classList.add('tocado');
    if (hecho) { hecho = false; st.classList.remove('ok'); dice.innerHTML = PZ_RETO; go.hidden = true; }
  };
  pzArrastra(svg, knob, {
    mueve: p => { toca(); deg = pzAngulo(p.x - g.cx, p.y - g.cy); pinta(); },
    tecla: d => { toca(); deg = (Math.round(deg / 5) * 5 + 5 * d + 360) % 360; pinta(); revisa(); },
    suelta: () => { tocado = performance.now(); revisa(); },
  });
  mide();
  const ro = new ResizeObserver(() => (st.isConnected ? mide() : ro.disconnect())); ro.observe(st);
  if (quieto) return;
  // Gira sola hasta que alguien la toca; después espera, y tras acertar se queda quieta.
  const paso = t => {
    raf = 0;
    if (!st.isConnected || !visible) return;
    const dt = Math.min(50, t - antes || 0); antes = t;
    if (!knob.classList.contains('held') && !hecho && !knob.matches(':focus-visible') && t - tocado > 6000) { deg = (deg + dt * .022) % 360; pinta(); }
    raf = requestAnimationFrame(paso);
  };
  tocado = -1e9; raf = requestAnimationFrame(paso);
  new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(paso); }, { root: el }).observe(st);
}
// ---- lo que responde al puntero (solo ratón; con «reducir movimiento», nada) ----
function pzPuntero(el) {
  const cosas = [];   // { paso(dt) → ¿sigue en marcha? }
  let raf = 0, antes = 0;
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = antes ? (t - antes) / 1000 : .016; antes = t;
    if (cosas.map(c => c.paso(dt)).some(Boolean)) raf = requestAnimationFrame(bucle); else antes = 0;
  };
  const anda = () => { if (!raf) raf = requestAnimationFrame(bucle); };
  // Dos números que persiguen su meta con un resorte y se pintan.
  const sigue = (pinta, k, c) => {
    const s = { x: 0, y: 0, vx: 0, vy: 0, mx: 0, my: 0, paso(dt) {
      [s.x, s.vx] = pzResorte(s.x, s.vx, s.mx, dt, k, c); [s.y, s.vy] = pzResorte(s.y, s.vy, s.my, dt, k, c);
      const vivo = Math.abs(s.mx - s.x) + Math.abs(s.my - s.y) + (Math.abs(s.vx) + Math.abs(s.vy)) * .1 > .02;
      if (!vivo) { s.x = s.mx; s.y = s.my; s.vx = s.vy = 0; }
      pinta(s.x, s.y); return vivo;
    } };
    cosas.push(s); return s;
  };
  const rel = (e, caja) => { const r = caja.getBoundingClientRect(); return [(e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5, r]; };
  // Botones principales: se dejan atraer un poco.
  el.querySelectorAll('.pz-main .btn.brand').forEach(b => {
    const s = sigue((x, y) => { b.style.translate = x || y ? `${x.toFixed(2)}px ${y.toFixed(2)}px` : ''; }, 220, 18);
    b.addEventListener('pointermove', e => { const [x, y] = rel(e, b); s.mx = x * 14; s.my = y * 10; anda(); });
    b.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Piezas que se inclinan hacia el puntero en 3D (libros, mancuerna, personaje).
  el.querySelectorAll('[data-inclina]').forEach(d => {
    const g = +d.dataset.inclina, zona = d.closest('.pz-demo, .pz-final, .pz-libros, .pz-prog, .pz-lamina, .pz-somos-top') || d;
    const s = sigue((x, y) => { d.style.setProperty('--rx', `${y.toFixed(2)}deg`); d.style.setProperty('--ry', `${x.toFixed(2)}deg`); }, 120, 16);
    zona.addEventListener('pointermove', e => { const [x, y] = rel(e, zona); s.mx = x * 2 * g; s.my = -y * 2 * g; anda(); });
    zona.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Luz que sigue al puntero en las tarjetas.
  el.querySelectorAll('.pz-demo, .pz-panel, .pz-ruta, .pz-prog').forEach(d => {
    d.classList.add('pz-luz');
    d.addEventListener('pointermove', e => { const [x, y] = rel(e, d); d.style.setProperty('--mx', `${((x + .5) * 100).toFixed(1)}%`); d.style.setProperty('--my', `${((y + .5) * 100).toFixed(1)}%`); });
  });
}
// El camino: el punto sigue al puntero (o al dedo) y se queda en la etapa elegida.
function pzCaminoVivo(el, quieto) {
  const ruta = el.querySelector('.pz-ruta'), map = ruta.querySelector('.pz-ruta-map'), yo = ruta.querySelector('.pz-ruta-yo'), luz = ruta.querySelector('.pz-ruta-l');
  const tabs = [...ruta.querySelectorAll('[role="tab"]')], eps = [...ruta.querySelectorAll('.pz-ep')];
  let x = PZ_PARADAS[1], v = 0, meta = x, sel = 1, raf = 0, t0 = 0;
  const pinta = () => {
    yo.style.left = `${x * 100}%`; yo.style.top = `${pzCaminoY(x) * 100}%`;
    luz.style.clipPath = `inset(0 ${(1 - x) * 100}% 0 0)`;
  };
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = t0 ? (t - t0) / 1000 : .016; t0 = t;
    [x, v] = pzResorte(x, v, meta, dt, 150, 21);
    if (Math.abs(meta - x) < .0005 && Math.abs(v) < .002) { x = meta; v = t0 = 0; } else raf = requestAnimationFrame(bucle);
    pinta();
  };
  const va = m => { meta = Math.max(.02, Math.min(.98, m)); if (quieto) { x = meta; pinta(); } else if (!raf) raf = requestAnimationFrame(bucle); };
  const elige = (i, foco) => {
    if (i !== sel) {
      sel = i;
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      eps.forEach((d, k) => { d.classList.toggle('on', k === i); d.inert = k !== i; });
    }
    if (foco) tabs[i].focus();
  };
  const mueve = e => { const r = map.getBoundingClientRect(), m = (e.clientX - r.left) / r.width; va(m); elige(pzEtapaEn(m)); };
  // con el dedo, solo tras un arrastre de lado: empezar a bajar la página no cambia la etapa
  let x0 = 0, lado = false;
  map.addEventListener('pointerdown', e => { x0 = e.clientX; lado = e.pointerType === 'mouse'; });
  map.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || (lado = lado || Math.abs(e.clientX - x0) > 10)) mueve(e); });
  ['pointerleave', 'pointercancel', 'pointerup'].forEach(n => map.addEventListener(n, () => va(PZ_PARADAS[sel])));
  tabs.forEach((b, i) => {
    b.onclick = () => { elige(i); va(PZ_PARADAS[i]); };
    b.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; elige(j, true); va(PZ_PARADAS[j]);
    };
  });
  pinta();
}
// «¿Te ha pasado?»: la frase que se toca (o se señala) muestra cómo ayuda Zuka.
function pzQuejasVivas(el, raton) {
  const lis = [...el.querySelectorAll('.pz-quejas li')];
  const abre = i => lis.forEach((li, k) => { li.classList.toggle('on', k === i); li.firstElementChild.setAttribute('aria-expanded', k === i); });
  lis.forEach((li, i) => {
    li.firstElementChild.onclick = () => abre(!esEscritorio() && li.classList.contains('on') ? -1 : i);   // en el celular, otro toque la cierra
    if (raton) li.firstElementChild.addEventListener('pointerenter', () => { if (esEscritorio()) abre(i); });
  });
}
// Carrusel: se desliza, con flechas, puntos o solo (cada 7 s hasta que alguien lo toca; nunca con «reducir movimiento»).
const PZ_PASA = 7000;
function pzCarrusel(el, quieto) {
  const hero = el.querySelector('.pz-hero'), pista = hero.querySelector('.pz-pista'), ls = [...pista.children], ptos = [...hero.querySelectorAll('.pz-pto')], pausa = hero.querySelector('.pz-pausa');
  let i = 0, anda = !quieto, enc = false, reloj = 0;
  // Cada capa se corre a su ritmo con el paso de la lámina, y las fichas siguen un poco al puntero.
  let pide = 0;
  const capas = () => { pide = 0; const w = pista.clientWidth || 1; ls.forEach((l, j) => { const d = pista.scrollLeft / w - j; if (Math.abs(d) < 1.2) l.style.setProperty('--d', d.toFixed(4)); }); };
  if (!quieto) {
    pista.addEventListener('scroll', () => { if (!pide) pide = requestAnimationFrame(capas); }, { passive: true });
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) { let va2 = 0, u = null; hero.addEventListener('pointermove', e => { u = e; if (!va2) va2 = requestAnimationFrame(() => { va2 = 0; const b = hero.getBoundingClientRect(); hero.style.setProperty('--mx', ((u.clientX - b.left) / b.width - .5).toFixed(3)); hero.style.setProperty('--my', ((u.clientY - b.top) / b.height - .5).toFixed(3)); }); }); }
  }
  const marca = k => {
    i = k; ls.forEach((l, j) => l.classList.toggle('va', j === k)); hero.style.backgroundColor = ls[k].dataset.c; hero.classList.toggle('azul', ls[k].classList.contains('pz-azul'));
    ls.forEach((l, j) => { l.inert = j !== k; });
    ptos.forEach((b, j) => { if (j === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
  };
  const va = k => pista.scrollTo({ left: ((k + ls.length) % ls.length) * pista.clientWidth, behavior: quieto ? 'auto' : 'smooth' });
  const para = () => { anda = false; clearInterval(reloj); pausa.hidden = true; hero.classList.add('parado'); };   // también las fichas
  let ancho = 0;   // al cambiar de ancho la lámina se queda en su sitio
  const mira = () => { const w = pista.clientWidth; if (w !== ancho) return; const k = Math.max(0, Math.min(ls.length - 1, Math.round(pista.scrollLeft / (w || 1)))); if (k !== i) marca(k); };
  pista.addEventListener('scroll', mira, { passive: true });
  hero.querySelector('.pz-ant').onclick = () => { para(); va(i - 1); };
  hero.querySelector('.pz-sig').onclick = () => { para(); va(i + 1); };
  ptos.forEach((b, k) => { b.onclick = () => { para(); va(k); }; });
  pausa.onclick = () => { para(); ptos[i].focus({ preventScroll: true }); };
  pista.addEventListener('pointerdown', para); pista.addEventListener('keydown', para);
  hero.addEventListener('pointerenter', () => { enc = true; }); hero.addEventListener('pointerleave', () => { enc = false; });
  const ro = new ResizeObserver(() => { if (!pista.isConnected) return ro.disconnect(); ancho = pista.clientWidth; pista.scrollLeft = i * ancho; }); ro.observe(pista);
  marca(0); pausa.hidden = !anda;
  if (anda) reloj = setInterval(() => {
    if (!pista.isConnected) return clearInterval(reloj);
    if (!enc && !document.hidden && !el.inert && el.scrollTop < 200 && !(hero.contains(document.activeElement) && document.activeElement.matches(':focus-visible'))) va(i + 1);
  }, PZ_PASA);
}
// Los clips se pueden detener: cada uno queda en su cuadro fijo.
function pzClips(el, quieto) {
  const b = el.querySelector('.pz-clips-p');
  b.hidden = quieto;
  b.onclick = () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', on); b.textContent = on ? 'Reproducir los videos' : 'Pausar los videos';
    el.querySelectorAll('[data-clip]').forEach(i => { i.src = `brand/clips/${i.dataset.clip}${on ? '-quieto' : ''}.webp`; });
  };
}
// Cuánto se abre cada carta según su distancia (en cartas) al puntero: 1 encima, 0 desde carta y media.
const pzAbre = d => { const f = Math.max(0, 1 - Math.abs(d) / 1.6); return f * f * (3 - 2 * f); };
// El mazo de cursos: las cartas se abren bajo el puntero o el dedo y la de encima dice su nombre completo.
function pzMazoVivo(el) {
  const m = el.querySelector('.pz-mazo');
  if (!m) return;
  const caja = m.querySelector('.pz-cartas'), cs = [...caja.children], [nom, det] = m.querySelector('.pz-mazo-t').children;
  let sel = -1, antes = -1;
  const pon = (p, vivo) => {
    const k = Math.max(0, Math.min(cs.length - 1, Math.round(p)));
    cs.forEach((c, i) => {
      const d = i - p;
      c.style.setProperty('--f', vivo ? pzAbre(d).toFixed(3) : (i === k ? .35 : 0));
      c.style.setProperty('--e', vivo ? Math.max(-1, Math.min(1, d)).toFixed(3) : 0);
      c.style.zIndex = vivo && i === k ? 60 : i + 1;
      c.classList.toggle('on', vivo && i === k);
    });
    if (k === sel) return;
    sel = k; nom.textContent = cs[k].dataset.n; det.textContent = cs[k].dataset.d;
  };
  const donde = e => { const r = caja.getBoundingClientRect(), w = cs[0].offsetWidth, paso = cs.length > 1 ? (r.width - w) / (cs.length - 1) : w; return (e.clientX - r.left - w / 2) / paso; };
  caja.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') pon(donde(e), true); });
  // Con el dedo: el primer toque la saca del mazo y el segundo la abre.
  caja.addEventListener('pointerdown', e => {
    const i = cs.indexOf(e.target.closest('.pz-carta'));
    antes = e.pointerType === 'mouse' || i < 0 ? -1 : sel === i && cs[i].dataset.vista ? -1 : i;
  });
  caja.addEventListener('click', e => {
    const i = cs.indexOf(e.target.closest('.pz-carta'));
    if (i < 0 || antes !== i) return;
    antes = -1; e.stopPropagation(); e.preventDefault(); cs.forEach((c, k) => { if (k === i) c.dataset.vista = '1'; else delete c.dataset.vista; }); pon(i, true);
  }, true);
  caja.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') pon(sel, false); });
  cs.forEach((c, i) => { c.addEventListener('focus', () => { if (c.matches(':focus-visible')) pon(i, true); }); });
  pon(0, false);
}
function pzAreaViva(el) {
  const svg = el.querySelector('.pz-area'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-area');
  const L = 232, X = 52, Y = 44;
  let a = 7;
  const pinta = () => {
    const m = pzArea(a), k = L / PZ_LADO, w = a * k - 2, v = m.b * k - 2, x2 = X + a * k + 2, y2 = Y + a * k + 2;
    const rect = (r, x, y, ww, h) => Object.entries({ x, y, width: ww, height: h, rx: 6 }).forEach(([n, z]) => r.setAttribute(n, z));
    const txt = (c, x, y, t, vis = true) => { const e = svg.querySelector(c); e.setAttribute('x', x); e.setAttribute('y', y + 6); e.textContent = t; e.style.opacity = vis ? 1 : 0; };
    rect(svg.querySelector('.pz-aa'), X, Y, w, w); rect(svg.querySelector('.pz-ab'), x2, Y, v, w);
    rect(svg.querySelector('.pz-ba'), X, y2, w, v); rect(svg.querySelector('.pz-bb'), x2, y2, v, v);
    txt('.pz-t-aa', X + w / 2, Y + w / 2, m.aa, a > 1); txt('.pz-t-ab', x2 + v / 2, Y + w / 2, m.ab, m.b > 1 && a > 1);
    txt('.pz-t-ba', X + w / 2, y2 + v / 2, m.ab, m.b > 1 && a > 1); txt('.pz-t-bb', x2 + v / 2, y2 + v / 2, m.bb, m.b > 1);
    txt('.pz-l-a', X + w / 2, 296 - 8, `a = ${a}`); txt('.pz-l-b', x2 + v / 2, 296 - 8, `b = ${m.b}`);
    svg.querySelector('.pz-corte').setAttribute('d', `M${X + a * k} ${Y - 14}V${Y + L}M${X} ${Y + a * k}H${X + L}`);
    knob.setAttribute('transform', `translate(${X + a * k} ${Y - 18})`);
    knob.setAttribute('aria-valuenow', a); knob.setAttribute('aria-valuetext', `a vale ${a}, b vale ${m.b}`);
    out.innerHTML = `(${a} + ${m.b})² = <b class="a">${m.aa}</b> + 2 · <b class="m">${m.ab}</b> + <b class="b">${m.bb}</b> = ${PZ_LADO ** 2}`;
  };
  const pon = v => { const n = Math.max(1, Math.min(PZ_LADO - 1, v)); if (n !== a) { a = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - X) / (L / PZ_LADO))), tecla: d => pon(a + d) });
  pinta();
}
function pzPalancaViva(el) {
  const svg = el.querySelector('.pz-pal'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-pal');
  let d = 4;
  const pinta = () => {
    const m = pzPalanca(d);
    svg.querySelector('.pz-viga').style.transform = `rotate(${m.giro}deg)`;
    knob.style.transform = `translate(${180 + d * 36}px, 144px)`;
    knob.setAttribute('aria-valuenow', d); knob.setAttribute('aria-valuetext', `${d} pasos${m.ok ? ', en equilibrio' : ''}`);
    svg.classList.toggle('ok', m.ok);
    out.innerHTML = `<b class="b">2 × 3</b> ${m.ok ? '=' : m.der > m.izq ? '&lt;' : '&gt;'} <b class="a">3 × ${d}</b><span>${m.ok ? 'En equilibrio' : m.der > m.izq ? 'Pesa más la derecha' : 'Pesa más la izquierda'}</span>`;
  };
  const pon = v => { const n = Math.max(1, Math.min(4, v)); if (n !== d) { d = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - 180) / 36)), tecla: k => pon(d + k) });
  pinta();
}

// ---- en la página ----
let pzDesde = false;   // la pantalla de entrada se abrió desde aquí: muestra «Volver» (js/cuenta.js)
function presentacionPide() {
  if (claveAlAbrir()) return true;   // se vuelve del correo de la contraseña (js/clave.js)
  const ok = presentacionToca({ standalone: isStandalone(), user: Cuenta.user, query: location.search });
  if (ok) presentacionAbrir();
  return ok;
}
// Se ve la portada (o la entrada abierta desde ella): tema claro por defecto (applyTheme, js/app.js).
const presentacionClara = () => !!document.getElementById('landing') || (pzDesde && !!document.getElementById('auth'));
function presentacionCerrar() {
  pzDesde = false;
  document.getElementById('landing')?.remove();
  pzInerte(false); applyTheme();
}
// Mientras se ve, lo de atrás no se alcanza con Tab ni con el lector de pantalla.
const PZ_DETRAS = ['#topbar', '#view', '#tabbar', '#overlay'];
function pzInerte(on) {
  PZ_DETRAS.forEach(s => { const x = document.querySelector(s); if (x) x.inert = on && !!document.getElementById('landing'); });
}
// Botón atrás del celular (js/back.js): desde la pantalla de entrada abierta aquí, vuelve a la presentación.
function presentacionAtras() {
  if (!document.getElementById('auth') || !pzDesde) return false;
  pzVolver();
  return true;
}
// De la pantalla de entrada a la presentación: la ventana se cierra (escritorio) o la presentación vuelve (celular).
function pzVolver() {
  document.getElementById('auth')?.remove();
  const lz = document.getElementById('landing');
  if (!lz) return presentacionAbrir();
  lz.inert = false; pzDesde = false;
  lz.focus({ preventScroll: true });
}
// Llegó la lista de cursos publicados (js/cuenta.js): se redibuja sin perder el sitio.
function presentacionRefresca() {
  const el = document.getElementById('landing');
  if (!el || el.inert) return;
  const y = el.scrollTop; presentacionAbrir(); el.scrollTop = y;
}
function presentacionInstall() {
  if (isStandalone()) return '';
  if (installEvt) return '<button class="btn main brand" type="button" data-pz="install">Instalar Zuka</button>';
  return `<p class="pz-help">${installHelp()}</p>`;
}
function presentacionAbrir() {
  let el = document.getElementById('landing');
  if (!el) {
    el = document.createElement('div'); el.id = 'landing';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Conoce Zuka');
    document.body.appendChild(el);
    applyTheme();
  }
  el.innerHTML = presentacionHTML(cursosVisibles(), { worlds: typeof WORLDS === 'undefined' ? {} : WORLDS, install: presentacionInstall(), todos: COURSES });
  el.scrollTop = 0;
  pzInerte(true);
  el.tabIndex = -1; el.focus({ preventScroll: true });   // la capa, no el título: las láminas se vuelven inertes
  el.querySelectorAll('[data-pz]').forEach(b => b.onclick = () => {
    const m = b.dataset.pz;
    if (m === 'install') return promptInstall().then(() => b.remove());
    const wa = m !== 'login' && waLink(Cuenta.ajustes.whatsapp, m === 'info' ? WA.info(b.dataset.que) : WA.prueba());
    if (wa) { window.open(wa, '_blank', 'noopener'); return; }
    // En el computador la entrada es una ventana sobre la presentación (css/escritorio.css); en el celular la reemplaza.
    const encima = esEscritorio();
    if (!encima) presentacionCerrar();
    pzDesde = true; authScreen(); applyTheme();
    const auth = document.getElementById('auth'), h1 = auth.querySelector('h1');
    h1.tabIndex = -1;
    if (encima) {
      el.inert = true; h1.focus();   // la presentación de atrás no se alcanza con Tab; Escape cierra la ventana
      if (!auth.dataset.pzEsc) { auth.dataset.pzEsc = '1'; auth.addEventListener('keydown', e => { if (e.key === 'Escape') pzVolver(); }); }
    }
  });
  // Pestañas de cursos (con flechas, foco itinerante).
  const tabs = [...el.querySelectorAll('[data-pz-tab]')];
  const pick = i => tabs.forEach((t, k) => {
    t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1;
    el.querySelector(`[data-pz-panel="${k}"]`).hidden = k !== i;
  });
  tabs.forEach((t, i) => {
    t.onclick = () => pick(i);
    t.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; pick(j); tabs[j].focus();
    };
  });
  // Las secciones se alcanzan sin tocar la dirección (#… es de Supabase).
  const bar = el.querySelector('.pz-bar'), quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boton = bar.querySelector('.pz-menu'), menu = on => { bar.classList.toggle('abre', on); boton.setAttribute('aria-expanded', on); };
  boton.onclick = () => menu(!bar.classList.contains('abre'));
  bar.onkeydown = e => { if (e.key === 'Escape' && bar.classList.contains('abre')) { menu(false); boton.focus(); } };
  const ir = (sel, tab) => {
    menu(false);
    if (tab != null) pick(+tab);
    const sec = el.querySelector(sel);
    sec.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' });
    const h = sec.querySelector('h2, h3'); h.tabIndex = -1; h.focus({ preventScroll: true });
  };
  el.querySelectorAll('.pz-nav a, .pz-foot a').forEach(x => x.onclick = e => { e.preventDefault(); ir(x.getAttribute('href'), x.dataset.tab); });
  el.querySelectorAll('[data-pz-ir]').forEach(b => b.onclick = () => ir(b.dataset.pzIr, b.dataset.tab));
  // Precios: primero los guardados; después, los de la base.
  pzPrecios(el, Cuenta.productos, Tienda.arts); pzInstVivo(el);
  if (Cuenta.sb) Promise.all([cuentaTienda(), tiendaCarga()]).then(() => { if (el.isConnected) { pzPrecios(el, Cuenta.productos, Tienda.arts); el.querySelector('.pz-inst')?.pinta?.(); } }, () => {});
  pzCarrusel(el, quieto); pzMazoVivo(el); pzClips(el, quieto); pzRuedaViva(el, quieto); pzAreaViva(el); pzPalancaViva(el); pzCaminoVivo(el, quieto);
  const raton = matchMedia('(hover: hover) and (pointer: fine)').matches;
  pzQuejasVivas(el, raton);
  if (raton && !quieto) pzPuntero(el);
  // Cada bloque aparece suave al entrar en pantalla.
  const rev = el.querySelectorAll('.pz-rev');
  if (!('IntersectionObserver' in window) || quieto) rev.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { root: el, threshold: .12 });
    rev.forEach(r => io.observe(r));
  }
}
;
//#archivo js/escritorio.js
// Zuka en computador (spec 2026-11-20-escritorio; referencia: la versión web de Brilliant). Los estilos viven en
// css/escritorio.css (desde ESCRITORIO_MIN px de ancho); aquí, lo que necesita datos: los paneles a los lados del
// video vertical de una lección (qué lección es y el recorrido de videos y ejercicios).
const ESCRITORIO_MIN = 1000;
const esEscritorio = () => typeof matchMedia === 'function' && matchMedia(`(min-width: ${ESCRITORIO_MIN}px)`).matches;

const esEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const esMin = secs => (secs >= 60 ? `${Math.round(secs / 60)} min` : `${Math.round(secs)} s`);

// ---- paneles de Inicio, Mis cursos, Tutorías y Tú (spec 2026-11-24-escritorio-vistas) ----
// Llevan la clase `dk`: en el celular no se ven (css/escritorio.css). Los botones se conectan con dkBind(view).
const dkActive = now => new Set([...Object.keys(S.days || {}), ...streakDays(S.lastDay, streakNow(), now)]);

// Los siete días de esta semana (lunes a domingo), con los que tuvieron actividad encendidos. Pura.
function dkSemana(active, now) {
  const lead = (now.getDay() + 6) % 7;
  return [...'LMXJVSD'].map((l, i) => ({ l, lit: active.has(dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - lead + i))), today: i === lead }));
}
// Avance por tramos de un curso: por componente si los tiene; si no, los mundos. `hecha(l)`: lección hecha. Pura.
function dkTramos(c, hecha) {
  const cuenta = us => { const ls = us.flatMap(u => u.lessons); return { d: ls.filter(hecha).length, n: ls.length }; };
  if (c.blocks) return c.blocks.map(b => ({ b, name: b.name, ...cuenta(c.units.filter(u => u.block === b.id)) }));
  return [{ name: 'Mundos completos', d: c.units.filter(u => u.lessons.every(hecha)).length, n: c.units.length }];
}

// Dentro de un curso: los mundos de un componente, en su tarjeta, y de qué consta cada lección, en su fila.
function dkMundosHTML(c, b) {
  return `<span class="dk cv-mundos" aria-hidden="true">${c.units.filter(u => u.block === b.id).map(u =>
    `<span${u.lessons.every(isDone) ? ' class="ok"' : ''}>${esc((WORLDS[u.world] || {}).name || u.title)}</span>`).join('')}</span>`;
}
function dkLeccionHTML(l) {
  const xp = typeof hayExplora === 'function' ? hayExplora(l.id) : typeof EXPLORA !== 'undefined' && EXPLORA[l.id];   // hayExplora: js/carga.js
  return `<span class="dk cv-meta">${xp ? 'Explicación interactiva' : `Video de ${esMin(clipSecs(l))}`} · ${l.ex.length} ejercicios</span>`;
}
function dkBind(root) {
  root.querySelectorAll('[data-dk]').forEach(b => b.onclick = () => (b.dataset.dk === 'streak' ? openStreakSheet() : (go(b.dataset.dk), view.scrollTop = 0)));
  root.querySelectorAll('[data-dk-open]').forEach(b => b.onclick = () => openCourse(b.dataset.dkOpen));
}

// Recorrido de la lección en tramos: cada video es uno; los ejercicios seguidos se juntan en uno. `at`: posición actual.
function leccionTramos(queue, at) {
  const out = [];
  queue.forEach((t, i) => {
    const last = out[out.length - 1];
    if (t.k === 'ex' && last && last.k === 'ex') { last.n++; last.to = i; return; }
    out.push({ k: t.k, part: t.n, n: 1, from: i, to: i });
  });
  return out.map(r => ({ ...r, state: at > r.to ? 'done' : at >= r.from ? 'now' : 'next' }));
}

// Paneles a los lados del video (solo se ven en escritorio). `n`: parte del video que se ve.
function leccionLadosHTML(c, l, queue, at, n, clip) {
  const u = (c.units || []).find(x => (x.lessons || []).includes(l));
  const world = u ? ((typeof WORLDS !== 'undefined' && WORLDS[u.world]) || {}).name || u.title : '';
  const parts = queue.filter(t => t.k === 'clip').length;
  const dur = clip && (clip.duration ?? (clip.scenes || []).reduce((s, x) => s + (x.d || 0), 0));
  const art = typeof courseArt === 'function' ? courseArt(c, 'lg') : '';
  const tramo = r => r.k === 'clip'
    ? `Video${parts > 1 ? ` · parte ${r.part + 1}` : ''}`
    : `${r.n} ${r.n === 1 ? 'ejercicio' : 'ejercicios'}`;
  const icon = r => (r.state === 'done' ? '✓' : r.k === 'clip' ? '▶' : '◆');
  return `<aside class="ls-side ls-l" aria-label="Lección">
      <div class="ls-course">${art}<span>${esEsc(c.name)}${world ? `<small>${esEsc(world)}</small>` : ''}</span></div>
      <h2>${esEsc(l.title)}</h2>
      <p class="ls-meta">${parts > 1 ? `Parte ${n + 1} de ${parts}` : 'Video de la lección'}${dur ? ` · ${esMin(dur)}` : ''}</p>
      <p class="ls-note">Primero la idea, después la fórmula. Míralo con calma: al terminar siguen los ejercicios.</p>
      <ul class="ls-keys"><li><kbd>↓</kbd> seguir</li><li><kbd>↑</kbd> video anterior</li><li><kbd>Enter</kbd> continuar</li></ul>
    </aside>
    <aside class="ls-side ls-r" aria-label="Tu recorrido">
      <p class="ls-eyebrow">Tu recorrido</p>
      <ol class="ls-path">${leccionTramos(queue, at).map(r => `<li class="${r.state}"><i aria-hidden="true">${icon(r)}</i>${tramo(r)}</li>`).join('')}</ol>
      <button class="btn main ls-go" type="button" data-ls-skip>Seguir ↓</button>
    </aside>`;
}

// Lo pinta startLesson (js/app.js) cada vez que muestra un video; el botón hace lo mismo que «Ejercicios ↓».
function leccionLados(root, c, l, queue, at, n, clip) {
  const host = root.querySelector('.ls-sides');
  if (!host) return;
  host.innerHTML = leccionLadosHTML(c, l, queue, at, n, clip);
  const skip = root.querySelector('.clip-skip');
  host.querySelector('[data-ls-skip]').textContent = skip ? skip.textContent : 'Seguir ↓';
  host.querySelector('[data-ls-skip]').onclick = () => skip?.click();
}

// ---- explicación interactiva en computador (spec 2026-11-24-explora-escritorio) ----
// Estado de cada capítulo: fracción hecha y el paso al que se vuelve al tocarlo (null si aún no se ha llegado).
function exploraCapitulos(caps, pasos, hechos) {
  return caps.map((t, c) => {
    const mios = pasos.map((p, k) => (p.cap === c ? k : -1)).filter(k => k >= 0), n = mios.filter(k => hechos[k]).length;
    const llega = mios[0] === 0 || !!hechos[mios[0] - 1];
    const falta = mios.find(k => !hechos[k]);   // a medias, se retoma donde iba
    return { t, hecho: n / mios.length, ir: llega ? falta ?? mios[0] : null };
  });
}
// Ancho de la escena: lo que deja el alto de la ventana según la proporción de su dibujo (el dibujo no se deforma).
const exploraAncho = (ratio, alto) => Math.round(Math.max(300, Math.min(760, ratio * alto * 0.33)));

function exploraRiel(root, d) {
  let el = root.querySelector('.xp-riel');
  if (!el) {
    el = document.createElement('aside');
    el.className = 'xp-riel';
    el.setAttribute('aria-label', 'Capítulos de la lección');
    el.innerHTML = `<div class="xr-top"><span class="xr-curso">${esEsc(d.course?.name || '')}</span><h2>${esEsc(d.lesson.title || '')}</h2></div><ol class="xr-caps"></ol><div class="xr-ideas"><h3>Lo que llevas construido</h3><ul></ul></div>`;
    root.prepend(el);
  }
  const caps = exploraCapitulos(d.caps, d.pasos, d.hechos), ol = el.querySelector('.xr-caps'), ul = el.querySelector('.xr-ideas ul');
  const foco = [...ol.querySelectorAll('button')].indexOf(document.activeElement);
  ol.innerHTML = caps.map((c, k) => `<li class="${k === d.cap ? 'now' : ''}${c.hecho >= 1 ? ' done' : ''}"><button type="button" data-ir="${c.ir ?? ''}"${c.ir == null ? ' disabled' : ''}${k === d.cap ? ' aria-current="step"' : ''}>
    <i style="--p:${c.hecho}">${c.hecho >= 1 ? '✓' : k + 1}</i><span>${esEsc(c.t)}</span></button></li>`).join('');
  if (foco >= 0) ol.querySelectorAll('button')[foco]?.focus({ preventScroll: true });
  ol.onclick = e => { const b = e.target.closest('button[data-ir]'); if (b && b.dataset.ir !== '' && !b.hasAttribute('aria-current')) d.ir(+b.dataset.ir); };
  const antes = el.dataset.n == null ? d.ideas.length : +el.dataset.n;   // al retomar no se animan las viejas
  el.dataset.n = d.ideas.length;
  ul.innerHTML = d.ideas.map((t, k) => `<li${k >= antes ? ' class="nueva"' : ''}>${tex(t)}</li>`).join('') || '<li class="none">Cada idea que ganes queda aquí.</li>';
  if (d.ideas.length > antes) ul.parentElement.scrollTop = ul.parentElement.scrollHeight;
  const stage = root.querySelector('.xp-stage');
  const ajusta = () => {
    const vb = stage.querySelector('.xp-svg')?.viewBox?.baseVal;
    if (vb?.height) stage.style.setProperty('--xp-w', `${exploraAncho(vb.width / vb.height, innerHeight / zk())}px`);
  };
  ajusta();
  if (!root.dataset.ajusta) { root.dataset.ajusta = '1'; new ResizeObserver(ajusta).observe(root); }
}
;
//#archivo js/instituciones.js
// Zuka para instituciones (spec 2026-11-25-instituciones): cuentas puras que comparten la landing, /instituciones, su portal y
// el panel. Sin DOM ni red: se prueban en Node (tests/instituciones.test.js). La base repite el precio (privado.inst_estimado).

const INST_PRECIOS = { tramos: [[1, 0], [30, 10], [100, 20], [300, 30]], anio: 10 };
// Lo que el panel guardó en ajustes.inst_precios; si no se entiende, los de arriba.
function instConf(texto) {
  try {
    const c = JSON.parse(texto), tr = (c.tramos || []).map(t => [Math.round(+t[0]), +t[1]]).filter(t => t[0] >= 1 && t[1] >= 0 && t[1] <= 90).sort((a, b) => a[0] - b[0]);
    if (tr.length && +c.anio >= 0 && +c.anio <= 90) return { tramos: tr, anio: +c.anio };
  } catch (e) { /* los de siempre */ }
  return INST_PRECIOS;
}
const instDescuento = (n, conf = INST_PRECIOS) => conf.tramos.reduce((d, [desde, p]) => (n >= desde ? Math.max(d, p) : d), 0);
// Precio por estudiante y total. productos: filas { curso, meses, precio, activo } de la tienda. Un año = dos periodos de 6 meses.
function instPrecio({ n, meses, cursos }, productos, conf = INST_PRECIOS) {
  const de = c => (productos || []).find(p => p.curso === c && p.meses === 6 && p.activo)?.precio ?? null;
  const base = cursos.reduce((t, c) => t + (de(c) || 0), 0) * (meses === 12 ? 2 : 1), descuento = instDescuento(n, conf), anio = meses === 12 ? conf.anio : 0;
  const unitario = Math.round(base * (100 - descuento) * (100 - anio) / 1e6) * 100;
  return { base, descuento, anio, unitario, total: unitario * n, sinPrecio: cursos.filter(c => de(c) == null) };
}
// Cuánto falta para el siguiente descuento: [estudiantes, %] o null.
const instSiguiente = (n, conf = INST_PRECIOS) => { const d = instDescuento(n, conf); return conf.tramos.find(t => t[0] > n && t[1] > d) || null; };

// Lista pegada de Excel o de un CSV: una persona por renglón. Sin títulos: «nombre, grupo, documento». Con títulos (en cualquiera de
// las cinco primeras filas) reconoce nombre y apellidos separados (SIMAT: APELLIDO1, APELLIDO2, NOMBRE1, NOMBRE2) y el grado con el grupo.
function instLista(texto) {
  const s = String(texto || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n'), out = [], malas = [], vistos = new Set();
  const sep = s.includes('\t') ? '\t' : s.includes(';') ? ';' : ',';
  // Casillas: entre comillas caben el separador y el salto de línea.
  const filas = []; let fila = [], caja = '', dentro = false, linea = 1, desde = 1;
  const casilla = () => { fila.push(caja.replace(/\s+/g, ' ').trim()); caja = ''; }, renglon = () => { casilla(); if (fila.some(Boolean)) filas.push({ c: fila, n: desde }); fila = []; desde = linea; };
  for (let k = 0; k < s.length; k++) {
    const x = s[k];
    if (x === '\n') linea++;
    if (dentro) { if (x === '"' && s[k + 1] === '"') { caja += '"'; k++; } else if (x === '"') dentro = false; else caja += x; }
    else if (x === '"' && !caja.trim()) { dentro = true; caja = ''; } else if (x === sep) casilla(); else if (x === '\n') renglon(); else caja += x;
  }
  renglon();
  const plano = x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const QUE = [['id', /^(n(ro|um|o)?|numero|tipo y numero)? ?(de |del )?(documento|doc|identificacion|identidad|cedula|t i|ti|tarjeta de identidad)( de identidad| de identificacion| estudiante| del estudiante| alumno)?$|^codigo( estudiante| del estudiante)?$/], ['junto', /^(nombres? completos?|nombres? y apellidos?|apellidos? y nombres?)( del estudiante| de los estudiantes| estudiante| alumno)?$|^estudiantes?$|^alumnos?$/],
    ['ap', /^(primer |segundo )?apellidos? ?[12s]?( primero| segundo| del estudiante| estudiante)?$/], ['no', /^(primer |segundo )?nombres? ?[12s]?( primero| segundo| del estudiante| estudiante| del alumno)?$/], ['gd', /^grado( cod| codigo)?$/], ['gr', /^(grupo|curso|salon|seccion)( cod| codigo| nombre)?$/]];
  const lee = c => { const m = {}; c.forEach((x, k) => { const q = QUE.find(y => y[1].test(plano(x))); if (q) (m[q[0]] = m[q[0]] || []).push(k); }); return m; };
  let T = null, ini = 0;
  for (let k = 0; k < Math.min(5, filas.length) && !T; k++) { const m = lee(filas[k].c); if (m.junto || m.no) { T = m; ini = k + 1; } }
  const ignora = T ? filas[ini - 1].c.filter((x, k) => x && !Object.values(T).some(ks => ks.includes(k)) && !/^(n|no|nro|item|tipodoc|tipo doc|tipo de documento)$/.test(plano(x))) : [];
  const de = (c, ks) => (ks || []).map(k => c[k] || '').filter(Boolean).join(' ');
  filas.slice(ini).forEach(({ c, n }) => {
    const g = T ? de(c, T.gr) : c[1] || '', d = T ? de(c, T.gd) : '', nombre = T ? (T.ap && T.no ? `${de(c, T.no)} ${de(c, T.ap)}`.trim() : de(c, (T.junto || T.no).slice(0, T.junto ? 1 : 9))) : c[0] || '';
    const x = { nombre: nombre.slice(0, 80), grupo: (d && g && !plano(g).startsWith(plano(d)) ? `${d}-${g}` : g || d).slice(0, 40), identificador: (T ? de(c, (T.id || []).slice(0, 1)) : c[2] || '').slice(0, 40) };
    const mal = por => malas.push({ linea: n, texto: c.join(', '), por });
    if (x.nombre.length < 2 || !/\p{L}/u.test(x.nombre)) return mal('sin nombre');
    const k = x.identificador.toLowerCase() || `${x.nombre}|${x.grupo}`.toLowerCase();
    if (vistos.has(k)) return mal('repetido en la lista');
    vistos.add(k); out.push(x);
  });
  // Sin títulos, si el «grupo» casi nunca se repite y no trae números, lo más probable es que sean apellidos.
  const gs = out.map(x => x.grupo).filter(Boolean), raro = !T && gs.length >= 4 && new Set(gs).size > gs.length * .7 && gs.filter(x => /\d/.test(x)).length < gs.length / 2;
  return { lista: out, malas, raro, ignora };
}

const instDia = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const instEntre = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
const instBogota = iso => (iso ? new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }) : '');
// La base manda el uso y lo hecho compactos (un texto por estudiante); el formato de antes también sirve.
function instAbre(D) {
  const lee = (o, f) => (Array.isArray(o) ? o : Object.entries(o || {}).flatMap(([id, t]) => t.split(';').map(x => f(+id, x.split(',')))));
  return { ...D, uso: lee(D.uso, (id, [d, s, e, a]) => [id, instDia(D.hoy, -d), +s, +e, +a]), hechas: lee(D.hechas, (id, [l, d]) => [id, l, d === '' || d == null ? null : instDia(D.hoy, -d)]) };
}
// Un día cuenta como estudio con un ejercicio respondido o cinco minutos: abrir y cerrar la app no es estudiar.
const instEstudio = u => u[3] > 0 || u[2] >= 300;
// Todo lo que muestra el portal, para unos filtros { dias, grupo, curso }. D: lo que devuelve institucion('panel').
function instCalcula(D, f) {
  const hoy = D.hoy, desde = instDia(hoy, 1 - f.dias), antes = instDia(hoy, 1 - 2 * f.dias), deCurso = new Map(D.lecciones.map(l => [l.id, l.curso]));
  const porCurso = new Map(); D.lecciones.forEach(l => porCurso.set(l.curso, [...(porCurso.get(l.curso) || []), l]));
  const contrato = new Set(D.cursos.map(c => c.id)), suyos = e => e.cursos.filter(c => contrato.has(c) && (!f.curso || c === f.curso));
  const gente = D.estudiantes.filter(e => e.activo && (!f.grupo || e.grupo === (f.grupo === '(sin grupo)' ? '' : f.grupo)) && (!f.curso || e.cursos.includes(f.curso)));
  const ids = new Set(gente.map(e => e.id)), uso = new Map(), hechas = new Map();
  D.uso.forEach(u => { if (ids.has(u[0])) uso.set(u[0], [...(uso.get(u[0]) || []), u]); });
  D.hechas.forEach(h => { if (ids.has(h[0])) { if (!hechas.has(h[0])) hechas.set(h[0], new Map()); hechas.get(h[0]).set(h[1], h[2]); } });
  const filas = gente.map(e => {
    const us = uso.get(e.id) || [], en = us.filter(u => u[1] >= desde), hs = hechas.get(e.id) || new Map(), cs = suyos(e);
    const total = cs.reduce((t, c) => t + (porCurso.get(c) || []).length, 0), n = [...hs.keys()].filter(l => cs.includes(deCurso.get(l))).length;
    const ej = en.reduce((t, u) => t + u[3], 0), ac = en.reduce((t, u) => t + u[4], 0), ult = [us.map(u => u[1]).sort().pop() || '', instBogota(e.ultima)].sort().pop();
    return { ...e, min: Math.round(en.reduce((t, u) => t + u[2], 0) / 60), ejercicios: ej, aciertos: ej >= 10 ? Math.round(100 * ac / ej) : null, hechas: n, total, avance: total ? n / total : 0,
      nuevas: [...hs].filter(([l, d]) => d && d >= desde && cs.includes(deCurso.get(l))).length, ult, sin: ult ? instEntre(ult, hoy) : null, dias: new Set(en.filter(instEstudio).map(u => u[1])).size };
  });
  const media = xs => (xs.length ? xs.reduce((t, x) => t + x, 0) / xs.length : 0), dentro = filas.filter(e => e.entro), prom = media(dentro.map(e => e.avance));
  // Se compara con su grupo (si alcanza a ser grupo): cada uno puede llevar otros cursos y otro ritmo.
  const deGrupo = new Map(); dentro.forEach(e => deGrupo.set(e.grupo, [...(deGrupo.get(e.grupo) || []), e.avance]));
  filas.forEach(e => { const g = deGrupo.get(e.grupo) || []; e.alerta = instAlerta(e, hoy, g.length >= 5 ? media(g) : prom); });
  const suma = (a, b) => [...uso.values()].flat().filter(u => u[1] >= a && u[1] <= b), activos = xs => new Set(xs.filter(instEstudio).map(u => u[0])).size, mins = xs => Math.round(xs.reduce((t, u) => t + u[2], 0) / 60);
  const ahora = suma(desde, hoy), previo = suma(antes, instDia(desde, -1)), ej = ahora.reduce((t, u) => t + u[3], 0);
  const serie = Array.from({ length: f.dias }, (_, i) => { const d = instDia(desde, i), xs = ahora.filter(u => u[1] === d); return { d, min: mins(xs), activos: activos(xs) }; });
  const grupos = [...new Set(D.estudiantes.filter(e => e.activo).map(e => e.grupo))].sort((a, b) => a.localeCompare(b, 'es', { numeric: true })).map(g => {
    const xs = filas.filter(e => e.grupo === g); return { grupo: g, n: xs.length, entraron: xs.filter(e => e.entro).length, activos: xs.filter(e => e.dias).length, avance: media(xs.map(e => e.avance)), min: Math.round(media(xs.map(e => e.min))), alerta: xs.filter(e => e.alerta).length };
  }).filter(g => g.n);
  const cursos = D.cursos.filter(c => !f.curso || c.id === f.curso).map(c => {
    const xs = gente.filter(e => e.cursos.includes(c.id)), ls = porCurso.get(c.id) || [], mapa = ls.map(l => ({ ...l, n: xs.filter(e => hechas.get(e.id)?.has(l.id)).length }));
    return { ...c, n: xs.length, total: ls.length, mapa, avance: xs.length && ls.length ? mapa.reduce((t, l) => t + l.n, 0) / (xs.length * ls.length) : 0 };
  });
  return { filas, serie, grupos, cursos, prom, entraron: dentro.length, activos: activos(ahora), activosAntes: activos(previo), min: mins(ahora), minAntes: mins(previo), aciertos: ej ? Math.round(100 * ahora.reduce((t, u) => t + u[4], 0) / ej) : null,
    nuevas: filas.reduce((t, e) => t + e.nuevas, 0), alertas: filas.filter(e => e.alerta).sort((a, b) => a.alerta.peso - b.alerta.peso), hechas };
}
// Quién necesita una mano y por qué (una sola razón, la más urgente). null: va bien.
// Los umbrales son un punto de partida: no están validados (docs/instituciones/verificacion.md dice cómo medirlos).
const INST_UMBRAL = { nunca: 3, ausente: 7, aciertos: 50, atras: .5 };
function instAlerta(e, hoy, prom, U = INST_UMBRAL) {
  if (!e.entro) return instEntre(e.alta, hoy) >= U.nunca ? { k: 'nunca', t: 'Aún no ha entrado', peso: 1 } : null;
  if (e.sin != null && e.sin >= U.ausente) return { k: 'ausente', t: `Lleva ${e.sin} días sin entrar`, peso: 2 };
  if (e.aciertos != null && e.aciertos < U.aciertos) return { k: 'aciertos', t: `Acierta el ${e.aciertos} % de los ejercicios`, peso: 3 };
  if (prom >= .08 && e.avance < prom * U.atras) return { k: 'atras', t: 'Va muy atrás de su grupo', peso: 4 };
  return null;
}
// Una meta: cuántos la cumplieron de los que la tienen. hechas: Map(id → Map(lección → día)).
function instMeta(m, estudiantes, hechas, hoy) {
  const xs = estudiantes.filter(e => e.activo && (!m.grupo || e.grupo === m.grupo) && e.cursos.includes(m.curso));
  const filas = xs.map(e => { const n = m.lecciones.filter(l => hechas.get(e.id)?.has(l)).length; return { e, n, ok: n === m.lecciones.length }; });
  return { filas, n: filas.length, ok: filas.filter(x => x.ok).length, p: filas.length ? filas.reduce((t, x) => t + x.n, 0) / (filas.length * m.lecciones.length) : 0, quedan: instEntre(hoy, m.hasta) };
}
// ¿Sus datos (nombre, grupo, documento…) los maneja su institución? Solo los cambian el gestor, en el portal, o Zuka. Quien compró un curso por su
// cuenta y lo tiene vigente maneja los suyos. La base repite la regla (privado.inst_fija).
function instFija({ perfil, accesos = [], inst }, now = Date.now()) {
  if (!perfil || perfil.rol === 'admin') return false;
  if (perfil.rol === 'gestor') return true;
  return !!(inst && inst.nombres && inst.nombres.length) && !accesos.some(a => !a.institucion && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > now);
}
// ¿Su institución le maneja los cursos? Entonces la app no le ofrece compras ni asesorías. Quien además compró algo por su cuenta
// (un curso vigente u horas) conserva la tienda: es suyo.
function instManda({ perfil, accesos = [], inst, horas = 0 }, now = Date.now()) {
  if (!perfil || perfil.rol === 'admin') return false;
  if (perfil.rol === 'gestor') return true;
  return !!(inst && inst.nombres && inst.nombres.length) && !(horas > 0) && !accesos.some(a => !a.institucion && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > now);
}
// Cursos de un estudiante con lo que le abre su institución: gana lo propio solo si está pago y dura más.
function instJunta(propios, deInst) {
  const out = new Map((propios || []).map(a => [a.curso, a]));
  (deInst || []).forEach(x => { const a = out.get(x.curso); if (!(a && a.tipo === 'pago' && a.hasta && new Date(a.hasta) > new Date(x.hasta))) out.set(x.curso, x); });
  return [...out.values()].sort((a, b) => a.curso.localeCompare(b.curso));
}
// ¿Aciertan las alertas? avisos y mal: Set de ids (lo que marcó el portal y lo que dijo el docente sin verlo); todos: los evaluados.
function instMide(avisos, mal, todos) {
  const vp = todos.filter(id => avisos.has(id) && mal.has(id)).length, fp = todos.filter(id => avisos.has(id) && !mal.has(id)).length, fn = todos.filter(id => !avisos.has(id) && mal.has(id)).length;
  // Intervalo de Wilson al 95 %: con pocos estudiantes un 70 % puede no significar nada.
  const w = (k, n) => { if (!n) return [0, 1]; const z = 1.96, p = k / n, d = 1 + z * z / n, c = p + z * z / (2 * n), m = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)); return [Math.max(0, (c - m) / d), Math.min(1, (c + m) / d)]; };
  return { vp, fp, fn, precision: vp + fp ? vp / (vp + fp) : null, cobertura: vp + fn ? vp / (vp + fn) : null, icPrecision: w(vp, vp + fp), icCobertura: w(vp, vp + fn) };
}

// ---------- docente responsable y simulacros (spec 2026-11-25-docente-responsable) ----------
// Nota: porcentaje de aciertos, de 0 a 100. No es un puntaje del examen real.
const instNota = (aciertos, n) => (n ? Math.round(100 * aciertos / n) : 0);
// Elige n preguntas repartidas entre los mundos, primero las que no se han usado; las de un mismo texto quedan seguidas.
function instElige(preguntas, mundos, n, usadas = new Set(), azar = Math.random) {
  const revuelve = xs => { const a = [...xs]; for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(azar() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
  const cola = new Map(mundos.map(m => [m, revuelve(preguntas.filter(p => p.m === m)).sort((a, b) => usadas.has(a.k) - usadas.has(b.k))])), out = [];
  for (const nuevas of [true, false]) {
    while (out.length < n) {
      let puso = false;
      for (const m of mundos) { const q = cola.get(m), j = q.findIndex(p => !nuevas || !usadas.has(p.k)); if (j < 0 || out.length >= n) continue; out.push(q.splice(j, 1)[0]); puso = true; }
      if (!puso) break;
    }
  }
  return instOrdena(out, mundos);
}
const instOrdena = (ps, mundos) => ps.map((p, i) => ({ p, i, j: mundos.indexOf(p.m), t: p.d == null ? -1 : ps.findIndex(x => x.d === p.d) })).sort((a, b) => a.j - b.j || (a.t < 0 ? a.i : a.t) - (b.t < 0 ? b.i : b.t) || a.i - b.i).map(x => x.p);
// Todo lo que se lee de un simulacro. det: { preguntas, resultados } de docencia('simulacro'); gente: los que deben presentarlo.
function instSimulacro(det, gente) {
  const ps = det.preguntas, N = ps.length, de = new Map(det.resultados.map(r => [r.estudiante, r]));
  const filas = gente.map(e => { const r = de.get(e.id); return { e, r: r || null, estado: !r ? 'falta' : r.entregado ? 'entregado' : 'curso', nota: r && r.entregado ? instNota(r.aciertos, N) : null }; });
  const ok = filas.filter(f => f.estado === 'entregado'), media = xs => (xs.length ? Math.round(xs.reduce((t, x) => t + x, 0) / xs.length) : null);
  const preguntas = ps.map((p, i) => {
    const dist = [0, 0, 0, 0]; let blanco = 0; ok.forEach(f => { const o = f.r.respuestas[i]; if (o >= 0 && o < 4) dist[o]++; else blanco++; });
    const mal = dist.map((x, o) => [x, o]).filter(x => x[1] !== p.r).sort((a, b) => b[0] - a[0])[0];
    return { i, p, dist, blanco, acierto: ok.length ? dist[p.r] / ok.length : null, trampa: mal && mal[0] > 0 && mal[0] >= dist[p.r] ? mal[1] : null };
  });
  const por = clave => [...new Set(ps.map(clave))].map(m => { const xs = preguntas.filter(x => clave(x.p) === m); return { m, n: xs.length, acierto: ok.length ? xs.reduce((t, x) => t + x.acierto, 0) / xs.length : null, lecciones: [...new Set(xs.filter(x => x.acierto != null && x.acierto < .6).map(x => x.p.l).filter(Boolean))] }; });
  const grupos = [...new Set(gente.map(e => e.grupo))].sort((a, b) => a.localeCompare(b, 'es', { numeric: true })).map(g => { const xs = filas.filter(f => f.e.grupo === g), k = xs.filter(f => f.nota != null); return { grupo: g, n: xs.length, entregaron: k.length, nota: media(k.map(f => f.nota)) }; });
  const notas = ok.map(f => f.nota), tramos = [0, 20, 40, 60, 80].map(d => ({ d, h: d === 80 ? 100 : d + 19, n: notas.filter(x => x >= d && (d === 80 || x < d + 20)).length }));
  return { filas, n: gente.length, entregaron: ok.length, curso: filas.filter(f => f.estado === 'curso').length, nota: media(notas), min: notas.length ? Math.min(...notas) : null, max: notas.length ? Math.max(...notas) : null, preguntas, mundos: por(p => p.m).sort((a, b) => (a.acierto ?? 1) - (b.acierto ?? 1)), grupos, tramos };
}
// Por mundo, lo que acertó un estudiante en varios simulacros. dets: [{ preguntas, resultados }].
function instPorMundo(dets, id) {
  const out = new Map();
  dets.forEach(d => { const r = d.resultados.find(x => x.estudiante === id && x.entregado); if (!r) return; d.preguntas.forEach((p, i) => { const x = out.get(p.m) || { m: p.m, n: 0, ok: 0, lecciones: new Set() }; x.n++; if (r.respuestas[i] === p.r) x.ok++; else if (p.l) x.lecciones.add(p.l); out.set(p.m, x); }); });
  return [...out.values()].map(x => ({ ...x, lecciones: [...x.lecciones] })).sort((a, b) => a.ok / a.n - b.ok / b.n);
}
;
//#archivo js/metas.js
// Metas que pone la institución del estudiante (spec 2026-11-25-instituciones): tarjeta en Inicio. Va después de inicio.js.
const metaEstado = (m, done) => { const n = m.lecciones.filter(l => done[l]).length; return { n, total: m.lecciones.length, sigue: m.lecciones.find(l => !done[l]) || null }; };
const metaPlazo = (hasta, hoy) => { const d = Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${hoy}T00:00:00Z`)) / 86400000); return d < 0 ? 'Ya pasó la fecha' : d === 0 ? 'Es para hoy' : d === 1 ? 'Es para mañana' : `Quedan ${d} días`; };
function metasHTML() {
  const ms = (Cuenta.inst.metas || []).map(m => ({ m, x: metaEstado(m, S.done), c: COURSES.find(c => c.id === m.curso) })).filter(x => x.c && (x.x.sigue || metaPlazo(x.m.hasta, today()) !== 'Ya pasó la fecha'));
  if (!ms.length) return '';
  return `<section class="hm-metas"><h2 class="home-h2">Metas de ${esc(Cuenta.inst.nombres[0] || 'tu institución')}</h2><div class="hm-mt">${ms.map(({ m, x, c }) => `<article style="--c:${c.color}">${aroHTML(x.n / x.total, courseArt(c, 'md'))}<div><b>${esc(m.titulo)}</b><small>${esc(c.name)} · ${x.n} de ${x.total} lecciones</small><small>${x.sigue ? metaPlazo(m.hasta, today()) : '¡Meta cumplida!'}</small></div>
    ${x.sigue ? `<button class="btn ghost sm" type="button" data-meta-ir="${esc(x.sigue)}" data-meta-c="${c.id}">Seguir</button>` : ''}</article>`).join('')}</div></section>`;
}
function metasBind(root) {
  root.querySelectorAll('[data-meta-ir]').forEach(b => { b.onclick = () => { const f = findLesson(b.dataset.metaIr); if (f && isUnlocked(f.c, f.l)) startLesson(f.c, f.l); else openCourse(b.dataset.metaC); }; });
}
;
//#archivo js/simulacros.js
// Simulacros y avisos que pone el docente responsable (spec 2026-11-25-docente-responsable): tarjetas en Inicio y la pantalla para
// presentarlos. Un intento, con el reloj de la base; lo marcado se guarda solo y califica la base. Va después de metas.js.
const SIM_COMP = { matematicas: 'Matemáticas', lectura: 'Lectura Crítica', sociales: 'Sociales y Ciudadanas', ciencias: 'Ciencias Naturales', ingles: 'Inglés' };
const simHora = iso => new Date(iso).toLocaleString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'America/Bogota' });
// Qué decir y qué botón poner. Pura: se prueba en Node.
function simTarjeta(s, ahora = Date.now()) {
  const abre = Date.parse(s.abre), cierra = Date.parse(s.cierra), lim = s.limite ? Date.parse(s.limite) : 0;
  if (s.estado === 'curso' && lim > ahora) return { t: `Lo estás presentando: quedan ${Math.max(1, Math.ceil((lim - ahora) / 60000))} min`, b: 'Seguir', hace: 'empezar', urge: true };
  if (s.estado === 'nuevo') {
    if (ahora < abre) return { t: `Abre el ${simHora(s.abre)}`, b: '', hace: '' };
    if (ahora >= cierra) return { t: 'Cerró y no lo presentaste', b: '', hace: '', mal: true, viejo: ahora - cierra > 3 * 864e5 };
    return { t: `Hasta el ${simHora(s.cierra)}`, b: 'Empezar', hace: 'empezar', urge: cierra - ahora < 864e5 };
  }
  if (s.ver || (s.muestra === 'cerrar' && ahora >= cierra)) return { t: s.aciertos == null ? 'Ya puedes ver tus respuestas' : `Sacaste ${instNota(s.aciertos, s.n)} de 100`, b: 'Ver respuestas', hace: 'revisar', viejo: ahora - cierra > 10 * 864e5 };
  return { t: s.muestra === 'nunca' ? 'Entregado. Pregúntale la nota a tu docente' : 'Entregado. Verás tus resultados cuando cierre', b: '', hace: '', viejo: ahora - cierra > 3 * 864e5 };
}
function simulacrosHTML() {
  const av = Cuenta.inst.avisos || [], ss = (Cuenta.inst.simulacros || []).map(s => ({ s, t: simTarjeta(s) })).filter(x => !x.t.viejo).sort((a, b) => !!b.t.urge - !!a.t.urge || (b.t.hace === 'empezar') - (a.t.hace === 'empezar') || Date.parse(a.s.cierra) - Date.parse(b.s.cierra));
  if (!av.length && !ss.length) return '';
  return `${av.length ? `<section class="hm-avisos" aria-label="Avisos de tus docentes">${av.slice(0, 4).map(a => `<article><p>${esc(a.texto)}</p><small>${esc(a.autor)} · ${esc(SIM_COMP[a.componente] || '')}</small></article>`).join('')}</section>` : ''}
    ${ss.length ? `<section class="hm-metas hm-sims"><h2 class="home-h2">Simulacros</h2><div class="hm-mt">${ss.slice(0, 6).map(({ s, t }) => `<article class="${t.urge ? 'urge' : ''}" style="--c:${COURSES.find(c => c.id === 'preicfes')?.color || 'var(--brand)'}"><div><b>${esc(s.titulo)}</b><small>${esc(SIM_COMP[s.componente] || '')} · ${s.n} preguntas · ${s.minutos} min</small><small class="${t.mal ? 'mal' : ''}">${esc(t.t)}</small></div>${t.b ? `<button class="btn ${t.hace === 'empezar' ? 'main' : 'ghost'} sm" type="button" data-sim="${s.id}" data-sim-a="${t.hace}">${t.b}</button>` : ''}</article>`).join('')}</div></section>` : ''}`;
}
function simulacrosBind(root) { root.querySelectorAll('[data-sim]').forEach(b => { b.onclick = () => { const s = Cuenta.inst.simulacros.find(x => x.id === +b.dataset.sim); if (s) b.dataset.simA === 'revisar' ? simRevisar(s, b) : simAviso(s, b); }; }); }
const simApi = async (a, p) => { const { data, error } = await Cuenta.sb.rpc('simulacro', { p_accion: a, p }); if (error) throw error; return data; };
const simError = e => (/fetch|network|load failed/i.test(e?.message || '') ? 'No hay conexión. Inténtalo de nuevo.' : e?.message || 'No se pudo abrir.');
const simMate = t => tex(t).replace(/__(.+?)__/g, '<u>$1</u>');
// Vuelve a leer lo de su institución (tras entregar, su tarjeta cambia).
async function simRefresca() { try { const r = await Cuenta.sb.rpc('mi_institucion'); if (r.data) { Object.assign(Cuenta.inst, { metas: r.data.metas || [], simulacros: r.data.simulacros || [], avisos: r.data.avisos || [] }); cuentaCache(); if (tab === 'home' && !lessonClose) go('home'); } } catch (e) { /* la próxima vez que entre */ } }

function simAviso(s) {
  const sigue = s.estado === 'curso';
  openSheet(`<div class="ls exam-sheet"><p class="eyebrow">${esc(SIM_COMP[s.componente] || 'Simulacro')}</p><h3>${esc(s.titulo)}</h3><p class="ls-meta"><span>${ICON.clock} ${s.minutos} min</span><span>${ICON.target} ${s.n} preguntas</span></p>
    <ul class="exam-rules"><li>Tienes un solo intento.</li><li>El reloj sigue aunque cierres la app.</li><li>Lo que marques se guarda solo. Puedes ir y volver entre preguntas.</li><li>Tu docente ve tus respuestas y si sales de la pantalla.</li></ul>
    <button class="btn main" type="button" data-go>${sigue ? 'Seguir' : 'Empezar ahora'}</button></div>`, sh => {
    const b = sh.querySelector('[data-go]');
    b.onclick = async () => { b.disabled = true; b.textContent = 'Abriendo…'; try { const d = await simApi('empezar', { id: s.id }); closeSheet(); simPresenta(s, d); } catch (e) { b.disabled = false; b.textContent = 'Intentar de nuevo'; toast(simError(e)); simRefresca(); } };
  });
}

const SIM_L = 'ABCD', simCopia = id => `zuka-sim-${Cuenta.user?.id || ''}-${id}`;
const simTexto = (t, abierto) => `<details class="lec-doc"${abierto ? ' open' : ''}><summary><span class="lec-dk">Texto</span><span class="lec-dt">${esc(t.title)}</span></summary><div class="lec-body">${t.paras.map((p, i) => `<p class="lec-p"><span class="lec-pn" aria-hidden="true">${i + 1}</span>${simMate(p)}</p>`).join('')}</div></details>`;
function simPresenta(s, d) {
  cleanup?.(); cleanup = null;
  const n = d.preguntas.length, resp = d.respuestas.slice(); let fin = Date.now() + d.segundos * 1000, marcaB = d.marca || '', k = 0, salidas = 0, listo = false, sucio = false, guarda = 0, timer = 0, enviando = false, fallo = false;
  // Si la red falló antes de cerrar, lo último marcado quedó en este dispositivo.
  try { const c = JSON.parse(localStorage.getItem(simCopia(s.id)) || 'null'); if (c && c.n === n && c.inicio === d.inicio) { salidas = c.salidas || 0; if (c.p && (c.marca || '') === marcaB) { c.resp.forEach((o, i) => { resp[i] = o; }); sucio = true; } } } catch (e) { /* sin copia */ }
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(d.titulo)}</b><span class="exam-clock" role="timer" aria-label="Tiempo restante">${ICON.clock}<b></b></span></div>
    <div class="lesson-body" tabindex="-1"></div><nav class="simu-nav" aria-label="Preguntas"></nav><div class="lesson-foot exam-foot"><button class="btn ghost skip" type="button">Anterior</button><button class="btn main" type="button">Siguiente</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const body = $('.lesson-body', ov), nav = $('.simu-nav', ov), clock = $('.exam-clock', ov), [ant, sig] = [$('.skip', ov), $('.btn.main', ov)];
  const copia = () => { try { localStorage.setItem(simCopia(s.id), JSON.stringify({ n, inicio: d.inicio, marca: marcaB, resp, salidas, p: sucio })); } catch (e) { /* sin sitio */ } };
  const manda = async () => { if (!sucio || listo || enviando) return; sucio = false; enviando = true; try { const r = await simApi('guardar', { id: s.id, respuestas: resp, salidas }); if (listo) return; if (r.guardado === false) return yaNo(r); fin = Date.now() + r.segundos * 1000; marcaB = r.marca || ''; copia(); ov.querySelector('.simu')?.classList.remove('sinred'); } catch (e) { sucio = true; ov.querySelector('.simu')?.classList.add('sinred'); } enviando = false; };
  // Ya se entregó en otro dispositivo o el docente lo cerró antes: se dice, no se finge.
  const yaNo = r => { listo = true; clearInterval(timer); clearTimeout(guarda); dismissDialog(); limpia(); final(r, 'Este simulacro ya cerró', 'Vale lo que alcanzó a guardarse antes.'); };
  const limpia = () => { try { localStorage.removeItem(simCopia(s.id)); } catch (e) { /* nada */ } };
  function final(r, t, p) {
    nav.hidden = true; body.innerHTML = `<div class="simu-fin"><span class="lock-ico">${ICON.check}</span><h2>${t}</h2><p>${p ? `${p} ` : ''}${r.ver ? 'Ya puedes ver tus respuestas.' : s.muestra === 'nunca' ? 'Tu docente te dirá cómo te fue.' : 'Verás tus resultados en Inicio cuando cierre.'}</p></div>`;
    const nv = { ...s, estado: 'entregado', ver: r.ver }; ant.hidden = !r.ver; ant.disabled = false; ant.textContent = 'Salir'; ant.onclick = () => cierra(); sig.disabled = false; sig.textContent = r.ver ? 'Ver respuestas' : 'Continuar'; sig.onclick = () => { cierra(); if (r.ver) simRevisar(nv); }; sig.focus(); simRefresca();
  }
  const marca = (i, o) => { resp[i] = resp[i] === o ? -1 : o; sucio = true; copia(); clearTimeout(guarda); guarda = setTimeout(manda, 2500); };
  function pinta(foco) {
    const p = d.preguntas[k], ult = k === n - 1;
    body.innerHTML = `<div class="simu-c${p.d != null && d.textos[p.d] ? ' con' : ''}">${p.d != null && d.textos[p.d] ? simTexto(d.textos[p.d], k === 0 || d.preguntas[k - 1].d !== p.d || innerWidth >= 900) : ''}<div class="simu-q"><p class="ex-kind">Pregunta ${k + 1} de ${n}</p><p class="simu-e" id="simu-e">${simMate(p.q)}</p><div class="simu-ops" role="radiogroup" aria-labelledby="simu-e">${p.o.map((o, j) => `<button type="button" role="radio" aria-checked="${resp[k] === j}" tabindex="${(resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1}" data-o="${j}"><b>${SIM_L[j]}</b><span>${simMate(o)}</span></button>`).join('')}</div></div></div>`;
    body.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => { marca(k, +b.dataset.o); Sfx.tap(); pintaOps(+b.dataset.o); }; });
    ant.disabled = !k; sig.textContent = ult ? 'Entregar' : 'Siguiente'; puntos(); body.scrollTop = 0; if (foco) body.focus({ preventScroll: true });
  }
  function pintaOps(f) { body.querySelectorAll('[data-o]').forEach((b, j) => { b.setAttribute('aria-checked', resp[k] === j); b.tabIndex = (resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1; if (j === f) b.focus({ preventScroll: true }); }); puntos(); }
  function puntos() { nav.innerHTML = d.preguntas.map((p, i) => `<button type="button" class="${i === k ? 'cur' : ''}${resp[i] >= 0 ? ' hecha' : ''}" data-i="${i}" aria-label="Pregunta ${i + 1}${resp[i] >= 0 ? ', respondida' : ''}"${i === k ? ' aria-current="true"' : ''}>${i + 1}</button>`).join(''); nav.querySelectorAll('[data-i]').forEach(b => { b.onclick = () => { k = +b.dataset.i; pinta(true); }; }); nav.querySelector('.cur')?.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  ant.onclick = () => { if (k) { k--; pinta(true); } };
  sig.onclick = async () => {
    if (k < n - 1) { k++; return pinta(true); }
    const f = resp.filter(o => o < 0).length;
    if (await ask({ title: '¿Entregar el simulacro?', text: f ? `Te ${f === 1 ? 'falta 1 pregunta' : `faltan ${f} preguntas`} por responder. Después de entregar no puedes cambiar nada.` : 'Respondiste todas. Después de entregar no puedes cambiar nada.', ok: 'Entregar', cancel: 'Seguir' })) entrega();
  };
  const t0 = () => Math.max(0, (fin - Date.now()) / 1000);
  function tick() { const q = t0(); $('b', clock).textContent = fmtClock(q); clock.classList.toggle('low', q <= 60); if (q <= 0 && !listo) entrega(true); else if (sucio && Math.round(q) % 20 === 0) manda(); }
  async function entrega(tiempo) {
    if (listo) return; listo = true; fallo = false; clearInterval(timer); clearTimeout(guarda); dismissDialog(); sig.disabled = ant.disabled = true; nav.hidden = true;
    body.innerHTML = '<p class="simu-fin">Entregando…</p>';
    try {
      const r = await simApi('entregar', { id: s.id, respuestas: resp, salidas }); limpia();
      r.guardado === false ? final(r, tiempo ? 'Se acabó el tiempo' : 'Este simulacro ya cerró', 'Vale lo que alcanzó a guardarse antes.') : final(r, tiempo ? 'Se acabó el tiempo' : 'Entregado', '');
    } catch (e) { listo = false; fallo = true; sucio = true; copia(); body.innerHTML = `<div class="simu-fin"><h2>No se pudo entregar</h2><p>${esc(simError(e))} Lo que marcaste está en este dispositivo: inténtalo ya, porque cuando se acaba el tiempo no se recibe.</p></div>`; sig.disabled = false; sig.textContent = 'Intentar de nuevo'; sig.onclick = () => entrega(tiempo); }
  }
  function cierra() { listo = true; clearInterval(timer); clearTimeout(guarda); document.removeEventListener('keydown', tecla); document.removeEventListener('visibilitychange', sale); ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('home'); }
  lessonClose = async () => { if (listo) return cierra(); if (await ask({ title: '¿Salir del simulacro?', text: 'El reloj sigue corriendo. Puedes volver desde Inicio mientras te quede tiempo.', ok: 'Salir', cancel: 'Seguir', danger: true })) { if (listo) return; await manda(); cierra(); simRefresca(); } };
  $('[data-close]', ov).onclick = () => lessonClose();
  function sale() { if (listo || fallo) return; if (!document.hidden) { sucio = true; manda(); return; }   // al volver, se ajusta el reloj con la base
    { salidas++; sucio = true; copia(); manda(); } }
  function tecla(e) { if (listo || fallo || document.querySelector('dialog[open], .dialog')) return; const b = e.target.closest?.('[data-o]'); if (b && ['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); const j = (+b.dataset.o + (e.key === 'ArrowDown' ? 1 : 3)) % 4; resp[k] = -1; marca(k, j); pintaOps(j); } else if (/^[a-d]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) { const j = SIM_L.indexOf(e.key.toUpperCase()); resp[k] = -1; marca(k, j); pintaOps(j); } }
  document.addEventListener('keydown', tecla); document.addEventListener('visibilitychange', sale);
  timer = setInterval(tick, 500); pinta(); tick(); if (sucio) manda();
}
async function simRevisar(s, boton) {
  if (boton) boton.disabled = true;
  let d; try { d = await simApi('revisar', { id: s.id }); } catch (e) { if (boton) boton.disabled = false; return toast(simError(e)); }
  if (boton) boton.disabled = false;
  cleanup?.(); cleanup = null;
  const ov = $('#overlay'), nota = instNota(d.aciertos, d.n), les = new Map(); d.preguntas.forEach((p, i) => { if (p.l && d.respuestas[i] !== p.r) les.set(p.l, (les.get(p.l) || 0) + 1); });
  const rep = [...les].sort((a, b) => b[1] - a[1]).map(x => findLesson(x[0])).filter(Boolean).slice(0, 4);
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(d.titulo)}</b></div><div class="lesson-body"><div class="simu-rev"><div class="simu-nota"><b>${nota}</b><span>de 100<small>${d.aciertos} de ${d.n} preguntas</small></span></div>
    ${rep.length ? `<section class="er-sec er-rev"><h3>${ICON.bulb} Para repasar</h3>${rep.map(f => `<button class="btn ghost sm" type="button" data-les="${f.l.id}">${esc(f.l.title)} ${ICON.right}</button>`).join('')}</section>` : ''}
    ${d.preguntas.map((p, i) => { const o = d.respuestas[i], ok = o === p.r; return `<details class="er-q ${ok ? 'ok' : 'bad'}"><summary><span class="er-ic">${ok ? ICON.check : o < 0 ? '–' : ICON.x}</span><span><small>Pregunta ${i + 1} · ${ok ? 'Correcta' : o < 0 ? 'Sin responder' : 'Incorrecta'}</small>${simMate(p.q)}</span></summary><div class="er-q-body">${p.d != null && d.textos[p.d] ? simTexto(d.textos[p.d], false) : ''}<ol class="simu-op2">${p.o.map((x, j) => `<li class="${j === p.r ? 'ok' : j === o ? 'mal' : ''}"><b>${SIM_L[j]}</b><span>${simMate(x)}${j === p.r ? '<small>Correcta</small>' : j === o ? '<small>La que marcaste</small>' : ''}</span></li>`).join('')}</ol>${p.e ? `<p class="fb-exp">${simMate(p.e)}</p>` : ''}</div></details>`; }).join('')}</div></div><div class="lesson-foot"><button class="btn main" type="button">Continuar</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const cierra = () => { ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('home'); };
  lessonClose = cierra; $('[data-close]', ov).onclick = cierra; $('.lesson-foot .btn', ov).onclick = cierra;
  ov.querySelectorAll('[data-les]').forEach(b => { b.onclick = () => { const f = findLesson(b.dataset.les); cierra(); if (f && isUnlocked(f.c, f.l)) startLesson(f.c, f.l); else openCourse('preicfes'); }; });
}
;
//#archivo js/simulacros-icf.js
// Simulacros del Preicfes que el estudiante presenta por su cuenta (spec 2026-11-26-simulacros-preicfes). Cada simulacro tiene las
// cinco pruebas, de 24 preguntas A–D nuevas; cada prueba se presenta aparte, con reloj, y se revisa con explicaciones. Con las cinco
// presentadas sale el puntaje global de 0 a 500 (Lectura, Matemáticas, Sociales y Ciencias pesan 3; Inglés, 1). Los datos van en
// js/simulacro-icf-N.js (PI_SIMULACROS.push(…)); este archivo va después de simulacros.js (usa simTexto, simMate y SIM_L).
const PI_SIMULACROS = [];
const SIM_PRUEBAS = [['lectura', 'Lectura Crítica'], ['matematicas', 'Matemáticas'], ['sociales', 'Sociales y Ciudadanas'], ['ciencias', 'Ciencias Naturales'], ['ingles', 'Inglés']];
const SIM_MIN = 48;   // minutos por prueba: dos por pregunta

// ---------------------------------------------------------------- lógica pura (se prueba en Node)
const simPuntaje = (aciertos, n) => Math.round(100 * aciertos / n);
function simGlobal(p) {
  if (!SIM_PRUEBAS.every(([k]) => p[k] != null)) return null;
  return Math.round(5 * (3 * (p.lectura + p.matematicas + p.sociales + p.ciencias) + p.ingles) / 13);
}
// Mundos para repasar: los que más errores tuvieron, en orden.
function simRepaso(items, resp) {
  const n = new Map();
  items.forEach((it, i) => { if (resp[i] !== it.r) n.set(it.m, (n.get(it.m) || 0) + 1); });
  return [...n].sort((a, b) => b[1] - a[1]).map(x => x[0]);
}
// Ayudantes para escribir los datos: P(mundo, enunciado, opciones, índice correcto, explicación, texto?) y T(título, párrafos, tabla?).
const simP = (m, q, o, r, e, d) => ({ m, q, o, r, e, d: d ?? null });
const simT = (title, paras, tabla) => ({ title, paras, tabla });

// ---------------------------------------------------------------- pantalla
const simRes = id => (S.simIcf ||= {})[id] ||= {};
const simNotas = s => Object.fromEntries(SIM_PRUEBAS.map(([k]) => [k, simRes(s.id)[k]?.best ?? null]));
const simLlave = () => C_PREICFES()?.units.find(u => u.exam)?.exam.id;
const C_PREICFES = () => COURSES.find(c => c.id === 'preicfes');
// Califica y guarda una prueba (al entregar, o si el tiempo se acabó con el estudiante fuera).
function simIcfCalifica(s, pr, resp) {
  const L = s.pruebas[pr], pct = simPuntaje(resp.filter((o, i) => o === L[i].r).length, L.length), r = simRes(s.id);
  r[pr] = { best: Math.max(r[pr]?.best ?? 0, pct), last: { pct, resp: resp.slice(), at: Date.now() } };
  delete S.simIcfCurso; save();
  return pct;
}
// Una prueba que se venció mientras el estudiante estaba fuera queda calificada con lo que alcanzó a marcar.
function simIcfVence() {
  const c = S.simIcfCurso, s = c && PI_SIMULACROS.find(x => x.id === c.id);
  if (!c || c.fin > Date.now()) return null;
  if (!s) { delete S.simIcfCurso; save(); return null; }
  return { s, pr: c.pr, resp: c.resp, pct: simIcfCalifica(s, c.pr, c.resp) };
}
function simTextoIcf(t, abierto) {
  const tabla = t.tabla ? `<table class="simi-tabla">${t.tabla.map((f, i) => `<tr>${f.map(c => (i ? `<td>${simMate(c)}</td>` : `<th>${simMate(c)}</th>`)).join('')}</tr>`).join('')}</table>` : '';
  return simTexto(t, abierto).replace('</div></details>', `${tabla}</div></details>`);
}

function simIcfHTML(c) {
  if (c.id !== 'preicfes' || !PI_SIMULACROS.length) return '';
  simIcfVence();
  const llave = simLlave(), cerrado = typeof planMotivo === 'function' && llave && planMotivo(llave);
  return `<section class="simi" aria-label="Simulacros"><h2 class="comp-title">Simulacros</h2><p class="simi-p">Las cinco pruebas, con preguntas nuevas y reloj: ${SIM_MIN} minutos por prueba. Presenta cada una cuando quieras; con las cinco sale tu puntaje global.</p>
    ${PI_SIMULACROS.map(s => { const nt = simNotas(s), gl = simGlobal(nt), hechas = SIM_PRUEBAS.filter(([k]) => nt[k] != null).length;
      return `<article class="simi-card"><header><b>${esc(s.titulo)}</b><span>${gl != null ? `<strong>${gl}</strong> de 500` : `${hechas} de 5 pruebas`}</span></header>
      <div class="simi-pr">${SIM_PRUEBAS.map(([k, nom]) => `<button type="button" data-simi="${s.id}" data-pr="${k}"${cerrado ? ' data-lock="1"' : ''}><span>${esc(nom)}</span><small>${cerrado ? ICON.lock : S.simIcfCurso?.id === s.id && S.simIcfCurso.pr === k ? 'En curso: sigue' : nt[k] != null ? `${nt[k]} de 100` : 'Presentar'}</small></button>`).join('')}</div></article>`; }).join('')}</section>`;
}
function simIcfBind(root) {
  root.querySelectorAll('[data-simi]').forEach(b => { b.onclick = () => {
    if (b.dataset.lock) return openBloqueo(simLlave());
    const s = PI_SIMULACROS.find(x => x.id === b.dataset.simi); if (s) simIcfAbre(s, b.dataset.pr);
  }; });
}

function simIcfAbre(s, pr) {
  const v = simIcfVence();
  if (v && v.s.id === s.id && v.pr === pr) return simIcfRevisa(s, pr, v.resp, v.pct, true);
  const otra = S.simIcfCurso;
  if (otra && !(otra.id === s.id && otra.pr === pr)) {
    const os = PI_SIMULACROS.find(x => x.id === otra.id), on = SIM_PRUEBAS.find(x => x[0] === otra.pr)[1];
    return openSheet(`<div class="ls exam-sheet"><p class="eyebrow">Prueba en curso</p><h3>Termina primero ${esc(on)}</h3><p>Tienes ${esc(on)} de ${esc(os.titulo)} en curso y su reloj sigue corriendo. Termínala antes de empezar otra prueba.</p><button class="btn main" type="button" data-go>Seguir con ${esc(on)}</button></div>`, sh => {
      sh.querySelector('[data-go]').onclick = () => { closeSheet(false); simIcfPresenta(os, otra.pr, otra); };
    });
  }
  const nom = SIM_PRUEBAS.find(x => x[0] === pr)[1], r = simRes(s.id)[pr], cur = S.simIcfCurso;
  const sigue = cur && cur.id === s.id && cur.pr === pr && cur.fin > Date.now();
  openSheet(`<div class="ls exam-sheet"><p class="eyebrow">${esc(s.titulo)}</p><h3>${esc(nom)}</h3><p class="ls-meta"><span>${ICON.clock} ${SIM_MIN} min</span><span>${ICON.target} ${s.pruebas[pr].length} preguntas</span></p>
    <ul class="exam-rules"><li>Preguntas de selección múltiple con una sola respuesta: A, B, C o D.</li><li>El reloj no se detiene si sales; puedes volver mientras quede tiempo.</li><li>Puedes ir y volver entre preguntas. Al entregar verás cada respuesta explicada.</li>${r ? `<li>Tu mejor resultado: ${r.best} de 100. Puedes volver a presentarla.</li>` : ''}</ul>
    <button class="btn main" type="button" data-go>${sigue ? 'Seguir' : 'Empezar'}</button>${r?.last ? '<button class="btn ghost" type="button" data-rev>Ver mis respuestas</button>' : ''}</div>`, sh => {
    sh.querySelector('[data-go]').onclick = () => { closeSheet(false); simIcfPresenta(s, pr, sigue ? cur : null); };
    const rv = sh.querySelector('[data-rev]'); if (rv) rv.onclick = () => { closeSheet(false); simIcfRevisa(s, pr, r.last.resp, r.last.pct); };
  });
}

function simIcfPresenta(s, pr, cur) {
  if (typeof cleanup === 'function') { cleanup(); cleanup = null; }
  const L = s.pruebas[pr], n = L.length, nom = SIM_PRUEBAS.find(x => x[0] === pr)[1];
  const resp = cur ? cur.resp.slice() : L.map(() => -1), fin = cur ? cur.fin : Date.now() + SIM_MIN * 60000;
  let k = 0, listo = false, timer = 0;
  const guarda = () => { S.simIcfCurso = { id: s.id, pr, resp, fin }; save(); };
  guarda();
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(nom)} · ${esc(s.titulo)}</b><span class="exam-clock" role="timer" aria-label="Tiempo restante">${ICON.clock}<b></b></span></div>
    <div class="lesson-body" tabindex="-1"></div><nav class="simu-nav" aria-label="Preguntas"></nav><div class="lesson-foot exam-foot"><button class="btn ghost skip" type="button">Anterior</button><button class="btn main" type="button">Siguiente</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const body = $('.lesson-body', ov), nav = $('.simu-nav', ov), clock = $('.exam-clock', ov), ant = $('.skip', ov), sig = $('.btn.main', ov);
  const marca = j => { resp[k] = resp[k] === j ? -1 : j; guarda(); };
  function pinta(foco) {
    const p = L[k], t = p.d != null ? s.textos[p.d] : null;
    body.innerHTML = `<div class="simu-c${t ? ' con' : ''}">${t ? simTextoIcf(t, k === 0 || L[k - 1].d !== p.d || innerWidth >= 900) : ''}<div class="simu-q"><p class="ex-kind">Pregunta ${k + 1} de ${n}</p><p class="simu-e" id="simu-e">${simMate(p.q)}</p><div class="simu-ops" role="radiogroup" aria-labelledby="simu-e">${p.o.map((o, j) => `<button type="button" role="radio" aria-checked="${resp[k] === j}" tabindex="${(resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1}" data-o="${j}"><b>${SIM_L[j]}</b><span>${simMate(o)}</span></button>`).join('')}</div></div></div>`;
    body.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => { marca(+b.dataset.o); Sfx.tap(); ops(+b.dataset.o); }; });
    ant.disabled = !k; sig.textContent = k === n - 1 ? 'Entregar' : 'Siguiente'; puntos(); body.scrollTop = 0; if (foco) body.focus({ preventScroll: true });
  }
  function ops(f) { body.querySelectorAll('[data-o]').forEach((b, j) => { b.setAttribute('aria-checked', resp[k] === j); b.tabIndex = (resp[k] < 0 ? 0 : resp[k]) === j ? 0 : -1; if (j === f) b.focus({ preventScroll: true }); }); puntos(); }
  function puntos() { nav.innerHTML = L.map((p, i) => `<button type="button" class="${i === k ? 'cur' : ''}${resp[i] >= 0 ? ' hecha' : ''}" data-i="${i}" aria-label="Pregunta ${i + 1}${resp[i] >= 0 ? ', respondida' : ''}"${i === k ? ' aria-current="true"' : ''}>${i + 1}</button>`).join(''); nav.querySelectorAll('[data-i]').forEach(b => { b.onclick = () => { k = +b.dataset.i; pinta(true); }; }); nav.querySelector('.cur')?.scrollIntoView({ block: 'nearest', inline: 'center' }); }
  ant.onclick = () => { if (k) { k--; pinta(true); } };
  sig.onclick = async () => {
    if (k < n - 1) { k++; return pinta(true); }
    const f = resp.filter(o => o < 0).length;
    if (await ask({ title: '¿Entregar la prueba?', text: f ? `Te ${f === 1 ? 'falta 1 pregunta' : `faltan ${f} preguntas`} por responder.` : 'Respondiste todas.', ok: 'Entregar', cancel: 'Seguir' })) entrega();
  };
  const tick = () => { const q = Math.max(0, (fin - Date.now()) / 1000); $('b', clock).textContent = fmtClock(q); clock.classList.toggle('low', q <= 60); if (q <= 0 && !listo) entrega(); };
  function entrega() {
    if (listo) return; listo = true; quita(); if (typeof dismissDialog === 'function') dismissDialog();
    const pct = simIcfCalifica(s, pr, resp);
    cierra(); simIcfRevisa(s, pr, resp, pct, true);
  }
  function tecla(e) { if (listo || document.querySelector('dialog[open], .dialog')) return; const b = e.target.closest?.('[data-o]'); if (b && ['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); const j = (+b.dataset.o + (e.key === 'ArrowDown' ? 1 : 3)) % 4; resp[k] = -1; marca(j); ops(j); } else if (/^[a-d]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) { const j = SIM_L.indexOf(e.key.toUpperCase()); resp[k] = -1; marca(j); ops(j); } }
  const quita = () => { clearInterval(timer); document.removeEventListener('keydown', tecla); };
  function cierra() { quita(); ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; }
  lessonClose = async () => { if (listo) return cierra(); if (await ask({ title: '¿Salir de la prueba?', text: 'El reloj sigue corriendo. Puedes volver desde el curso mientras te quede tiempo.', ok: 'Salir', cancel: 'Seguir', danger: true })) { if (listo) return; cierra(); go('learn'); } };
  $('[data-close]', ov).onclick = () => lessonClose();
  document.addEventListener('keydown', tecla);
  timer = setInterval(tick, 500); pinta(); tick();
}

function simIcfRevisa(s, pr, resp, pct, recien) {
  const L = s.pruebas[pr], nom = SIM_PRUEBAS.find(x => x[0] === pr)[1], ok = resp.filter((o, i) => o === L[i].r).length;
  const nt = simNotas(s), gl = simGlobal(nt), rep = simRepaso(L, resp).slice(0, 4).map(w => ({ w, u: C_PREICFES().units.find(u => u.world === w) })).filter(x => x.u);
  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam simu"><div class="lesson-top"><button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button><b class="simu-t">${esc(nom)} · ${esc(s.titulo)}</b></div><div class="lesson-body"><div class="simu-rev">
    <div class="simu-nota"><b>${pct}</b><span>de 100<small>${ok} de ${L.length} preguntas${recien ? '' : ' · último intento'}</small></span></div>
    ${gl != null ? `<p class="simi-gl">Con las cinco pruebas, tu puntaje global en este simulacro es <b>${gl}</b> de 500.</p>` : `<p class="simi-gl">Te ${5 - SIM_PRUEBAS.filter(([k]) => nt[k] != null).length === 1 ? 'falta 1 prueba' : `faltan ${5 - SIM_PRUEBAS.filter(([k]) => nt[k] != null).length} pruebas`} para tener el puntaje global.</p>`}
    ${rep.length ? `<section class="er-sec er-rev"><h3>${ICON.bulb} Para repasar</h3>${rep.map(x => `<button class="btn ghost sm" type="button" data-w="${x.w}">${esc(x.u.title)} ${ICON.right}</button>`).join('')}</section>` : ''}
    ${L.map((p, i) => { const o = resp[i], bien = o === p.r; return `<details class="er-q ${bien ? 'ok' : 'bad'}"><summary><span class="er-ic">${bien ? ICON.check : o < 0 ? '–' : ICON.x}</span><span><small>Pregunta ${i + 1} · ${bien ? 'Correcta' : o < 0 ? 'Sin responder' : 'Incorrecta'}</small>${simMate(p.q)}</span></summary><div class="er-q-body">${p.d != null ? simTextoIcf(s.textos[p.d], false) : ''}<ol class="simu-op2">${p.o.map((x, j) => `<li class="${j === p.r ? 'ok' : j === o ? 'mal' : ''}"><b>${SIM_L[j]}</b><span>${simMate(x)}${j === p.r ? '<small>Correcta</small>' : j === o ? '<small>La que marcaste</small>' : ''}</span></li>`).join('')}</ol><p class="fb-exp">${simMate(p.e)}</p></div></details>`; }).join('')}
    </div></div><div class="lesson-foot"><button class="btn main" type="button">Continuar</button></div></div>`;
  ov.classList.add('open'); document.body.classList.add('in-lesson');
  const cierra = () => { ov.classList.remove('open'); ov.innerHTML = ''; document.body.classList.remove('in-lesson'); lessonClose = null; go('learn'); };
  lessonClose = cierra; $('[data-close]', ov).onclick = cierra; $('.lesson-foot .btn', ov).onclick = cierra;
  ov.querySelectorAll('[data-w]').forEach(b => { b.onclick = () => {
    const c = C_PREICFES(), i = c.units.findIndex(u => u.world === b.dataset.w); cierra();
    S.course = c.id; openBlock = { course: c.id, id: c.units[i].block }; openWorld = { course: c.id, i }; save(); go('learn');
  }; });
}
;
//#archivo js/simulacro-icf-1.js
// Preicfes · Simulacro 1 (spec 2026-11-26-simulacros-preicfes): cinco pruebas de 24 preguntas A–D escritas para Zuka.
PI_SIMULACROS.push((() => {
  const P = simP, T = simT;
  const textos = {
    tren: T('El último tren de la tarde', [
      'Desde que cerraron la estación, don Aurelio seguía subiendo cada tarde al andén. Llevaba el mismo saco de paño, ya brillante en los codos, y se sentaba en la banca de hierro que nadie había querido llevarse. A las cinco y diez, la hora en que durante cuarenta años pasó el tren hacia el río, sacaba su reloj de bolsillo, lo miraba, lo cerraba con un chasquido y volvía a guardarlo.',
      'Los muchachos del pueblo se burlaban al principio. Después dejaron de verlo, como se deja de ver un árbol. Solo Marina, la nieta de la señora que vendía tintos, se atrevió un día a preguntarle a quién esperaba.',
      '—A nadie —dijo él—. Me espera a mí la costumbre. Si un día no subo, ella se queda sola en la banca.',
      'Marina no entendió, pero empezó a acompañarlo. Él le contaba qué pueblos había después del puente, cuánto pesaba un bulto de café mojado, por qué el maquinista tocaba tres veces el pito antes de la curva. Ella anotaba todo en un cuaderno de cuadros.',
      'El invierno en que don Aurelio no volvió a subir, Marina se sentó en la banca a las cinco y diez. No tenía reloj, así que contó despacio hasta tres, como el pito antes de la curva. Luego abrió el cuaderno y empezó a leer en voz alta, para que la costumbre no se quedara sola.',
    ]),
    biblio: T('Bibliotecas abiertas hasta la medianoche', [
      'En muchas ciudades del país, las bibliotecas públicas cierran a las seis de la tarde, justo cuando la mayoría de los estudiantes y trabajadores sale de sus jornadas. Es como abrir un comedor a la hora en que nadie tiene hambre.',
      'Propongo que al menos una biblioteca por localidad abra hasta la medianoche. No se trata de un lujo. Para quien comparte una habitación con cuatro hermanos, una mesa iluminada y silenciosa es la diferencia entre estudiar y no hacerlo. Para quien no tiene internet en casa, es la única puerta a los trámites que hoy solo se hacen en línea.',
      'Se dirá que no hay presupuesto. Pero el costo de mantener las luces y dos funcionarios de turno es pequeño frente a lo que una ciudad gasta en reparar lo que la falta de oportunidades rompe. Además, la experiencia de algunos municipios muestra que, cuando una biblioteca abre de noche, la calle que la rodea se vuelve más transitada y, por eso mismo, más segura.',
      'Otros dirán que de noche nadie lee. Es posible que los primeros meses las salas estén medio vacías: los hábitos tardan en cambiar. Por eso la apertura debe evaluarse al año, no a la semana, y con cifras públicas de visitantes.',
      'Una ciudad que apaga sus bibliotecas a las seis les dice a muchos de sus habitantes que el conocimiento tiene horario de oficina. Es hora de cambiar ese mensaje.',
    ]),
    verdad: T('¿Hay que decir siempre la verdad?', [
      'Imagina que un amigo se esconde en tu casa porque alguien lo persigue para hacerle daño. El perseguidor toca la puerta y te pregunta si tu amigo está adentro. ¿Debes decir la verdad? Esta pregunta, que parece de película, ha ocupado a los filósofos durante siglos.',
      'Una respuesta sostiene que mentir está mal siempre, sin excepción. Quien la defiende no niega que la mentira pueda traer buenas consecuencias en un caso; afirma que una regla moral que se rompe cuando conviene deja de ser una regla. Si cada uno decidiera cuándo mentir, nadie podría confiar en la palabra de nadie.',
      'Otra respuesta mira los resultados. Para ella, lo correcto es lo que produce el mayor bien o el menor daño. Mentir al perseguidor salva una vida y no perjudica a ningún inocente; por eso, en ese caso, mentir no solo está permitido, sino que es lo que se debe hacer.',
      'Entre las dos hay posiciones intermedias. Algunos distinguen entre mentir y callar: podrías negarte a responder sin decir nada falso. Otros señalan que quien amenaza a un inocente pierde el derecho a que se le diga la verdad.',
      'Ninguna de estas respuestas cierra la discusión. Pero pensar en el caso extremo sirve para algo: obliga a preguntarnos si nuestras reglas valen por sí mismas o por lo que logran.',
    ]),
    agua: T('¿En qué se nos va el agua?', [
      'En un hogar de la ciudad, cada persona usa en promedio 150 litros de agua al día. La tabla de abajo muestra en qué se van esos litros. La mayor parte no se usa para beber ni para cocinar, sino para limpiar y para llevarse lo que ya no sirve.',
      'Consejo 1: una ducha de 5 minutos gasta la mitad que una de 10. Consejo 2: una botella llena de arena dentro del tanque del sanitario ahorra cerca de un litro en cada descarga. Consejo 3: lavar la ropa solo cuando la carga esté completa reduce el número de lavadas a la semana.',
      'Una familia de cuatro personas que siga los tres consejos puede bajar su consumo hasta en una quinta parte, según los cálculos de la empresa de acueducto de la ciudad. Eso no solo reduce la factura: en temporada seca, cada litro que no se usa sigue guardado en el embalse.',
      'Ojo: el agua que se gasta en la casa no es la única que cuenta. Producir una camiseta de algodón puede requerir más de dos mil litros entre el cultivo, el tinte y la fábrica, y esos litros no aparecen en ningún recibo.',
    ], [['Uso', 'Litros por persona al día'], ['Ducha (10 minutos)', '45'], ['Sanitario', '35'], ['Lavar ropa', '25'], ['Otros', '20'], ['Lavar platos', '15'], ['Cocinar y beber', '10'], ['Total', '150']]),
    jardin: T('My grandmother\'s garden', [
      'My grandmother __(1)__ in a small house near the river. Every Saturday I visit her and we work in her garden. Last week we __(2)__ tomatoes and beans. She says that plants are __(3)__ than people because they never complain. For me, her garden is the __(4)__ beautiful place in the town.',
    ]),
    mensaje: T('A message from Sara', [
      'Hi Lucas! I can\'t go to the football match tomorrow because I have to take my little sister to the doctor. Can we watch the next game together on Saturday at my house? My mum will make pizza. Text me! — Sara',
    ]),
    bus: T('The library on wheels', [
      'In some small towns there is no library. Ten years ago, a teacher named Rosa decided to change that. She bought an old bus, painted it yellow and filled it with books. Every week the bus visits five villages in the mountains.',
      'At first, only a few children came. Many of them had never held a book of their own. Rosa did not give up. She started reading stories aloud under the trees, and soon parents began to come too. Some adults asked for books about farming and health.',
      'Today the bus carries more than two thousand books, and people can borrow them for a month. Volunteers from the city help Rosa on weekends. The biggest problem is the road: in the rainy season it is sometimes impossible to drive, so the villages wait for weeks.',
      'Rosa says the bus is not only about books. "It is about feeling that someone remembers you," she explains.',
    ]),
  };

  const lectura = [
    P('icf-lc-literal', 'Según el texto, don Aurelio subía al andén a las cinco y diez porque', ['esperaba a un familiar que llegaba en tren', 'a esa hora pasó el tren durante cuarenta años', 'los muchachos le pedían que vigilara la estación', 'a esa hora vendían tinto en la estación'], 1, 'El párrafo 1 dice que a las cinco y diez «durante cuarenta años pasó el tren»; él mismo aclara después que no espera a nadie.', 'tren'),
    P('icf-lc-literario', 'La frase «Me espera a mí la costumbre» sugiere que don Aurelio', ['cree que el tren volverá a pasar', 'no quiere hablar con Marina', 'tiene miedo de quedarse solo en su casa y prefiere pasar la tarde en el andén', 'sigue un hábito que le da sentido a sus tardes, aunque ya no haya tren'], 3, 'No espera a una persona: lo que lo lleva al andén es el hábito, que él trata casi como a un ser vivo que «se queda solo».', 'tren'),
    P('icf-lc-literal', 'En el párrafo 2, la expresión «como se deja de ver un árbol» indica que los muchachos', ['se acostumbraron tanto a su presencia que ya no lo notaban', 'dejaron de ir a la estación', 'talaron los árboles del andén', 'lo respetaban tanto por su edad que preferían no molestarlo más'], 0, 'Un árbol que siempre está ahí deja de llamar la atención: con don Aurelio pasó lo mismo.', 'tren'),
    P('icf-lc-estructura', '¿Qué función cumple el párrafo 4 dentro del relato?', ['Presenta un conflicto entre Marina y los muchachos', 'Describe cómo era la estación antes del cierre', 'Muestra cómo se forma el vínculo entre Marina y don Aurelio', 'Explica por qué cerraron la estación y qué pasó después con los trenes'], 2, 'En ese párrafo Marina empieza a acompañarlo, él le cuenta historias y ella las anota: nace la relación que el final retoma.', 'tren'),
    P('icf-lc-literario', 'Al final, Marina cuenta despacio hasta tres porque', ['repite el pito del tren antes de la curva, como una manera de continuar lo que aprendió', 'está esperando que llegue un tren', 'no sabe leer la hora', 'quiere que los muchachos del pueblo crean que el tren todavía pasa por allí'], 0, 'Contar hasta tres «como el pito antes de la curva» repite un detalle que le contó don Aurelio: ella toma su lugar en la costumbre.', 'tren'),
    P('icf-lc-evalua', '¿Cuál enunciado expresa mejor una idea central del cuento?', ['Las estaciones de tren deberían volver a abrirse', 'Los recuerdos y las costumbres pueden pasar de una persona a otra', 'Los jóvenes no respetan a los mayores', 'Los relojes de bolsillo son más confiables que los relojes de pulsera modernos'], 1, 'El cuento termina con Marina heredando la costumbre y las historias de don Aurelio.', 'tren'),

    P('icf-lc-argumento', 'La tesis del autor es que', ['las bibliotecas deberían cerrar más temprano para ahorrar', 'los estudiantes deberían estudiar solo en su casa', 'al menos una biblioteca por localidad debería abrir hasta la medianoche', 'las bibliotecas deberían cobrar la entrada a quienes las usen después de las seis'], 2, 'Lo dice en el párrafo 2 («Propongo que…») y todo el texto lo defiende.', 'biblio'),
    P('icf-lc-estructura', 'En el párrafo 3, el autor', ['responde a una posible objeción sobre el costo de su propuesta', 'cuenta la historia de una biblioteca famosa', 'reconoce que su propuesta es imposible de pagar con el presupuesto de la ciudad', 'critica el trabajo de los funcionarios'], 0, '«Se dirá que no hay presupuesto» anuncia una objeción, y el resto del párrafo la responde.', 'biblio'),
    P('icf-lc-argumento', '¿Cuál de estos datos fortalecería más el argumento del autor?', ['Muchas personas prefieren leer libros digitales', 'Algunas bibliotecas tienen goteras en el techo', 'El horario de los bancos y de las oficinas públicas también termina a las seis de la tarde', 'En una localidad que amplió el horario, las visitas nocturnas se triplicaron en un año'], 3, 'Mostraría que, con tiempo, la gente sí usa la biblioteca de noche: justo lo que el autor espera.', 'biblio'),
    P('icf-lc-literal', 'La comparación «como abrir un comedor a la hora en que nadie tiene hambre» busca mostrar que', ['las bibliotecas deberían vender comida', 'el horario actual no coincide con el momento en que la gente puede ir', 'los estudiantes pasan hambre', 'las bibliotecas quedan lejos de las casas y por eso la gente no alcanza a llegar'], 1, 'Un servicio abierto cuando nadie puede usarlo pierde su sentido: eso critica el autor del horario.', 'biblio'),
    P('icf-lc-evalua', 'Para defender su propuesta, el autor supone que', ['nadie lee de noche', 'todas las personas tienen internet en su casa', 'las bibliotecas tienen demasiados funcionarios para el poco público que reciben de día', 'muchas personas no tienen en su casa condiciones adecuadas para estudiar'], 3, 'Su argumento se apoya en quienes comparten habitación o no tienen internet: si todos estudiaran bien en casa, perdería fuerza.', 'biblio'),
    P('icf-lc-estructura', 'En el párrafo 4, el autor pide evaluar la medida al año y no a la semana porque', ['un año es lo que dura el presupuesto', 'así lo exige la ley', 'los hábitos de las personas tardan en cambiar', 'las cifras de la primera semana fueron malas'], 2, 'Él mismo lo explica: al comienzo las salas pueden estar medio vacías porque «los hábitos tardan en cambiar».', 'biblio'),

    P('icf-lc-filosofico', 'La pregunta principal que discute el texto es', ['si está bien mentir en algún caso', 'cómo se debe esconder a un amigo', 'por qué las personas mienten', 'qué castigo merece un perseguidor'], 0, 'El caso del perseguidor sirve para preguntar si la verdad obliga siempre o si mentir puede estar justificado.', 'verdad'),
    P('icf-lc-filosofico', 'Para la posición del párrafo 2, el problema de mentir «cuando conviene» es que', ['siempre trae malas consecuencias', 'está prohibido por las leyes', 'acabaría con la confianza en la palabra de los demás', 'solo los filósofos pueden decidir cuándo se justifica hacerlo'], 2, 'Esa posición no niega que una mentira pueda salir bien; dice que si cada uno decide cuándo mentir, nadie podría confiar en nadie.', 'verdad'),
    P('icf-lc-filosofico', 'La diferencia entre las posiciones de los párrafos 2 y 3 es que', ['la primera acepta la mentira y la segunda la rechaza', 'la primera juzga por la regla y la segunda por las consecuencias', 'las dos piensan exactamente lo mismo', 'la segunda solo habla de lo que dicen las leyes de cada país sobre la mentira'], 1, 'Una mira si se cumple la regla de no mentir; la otra, si el resultado produce el mayor bien o el menor daño.', 'verdad'),
    P('icf-lc-evalua', '¿Cuál respuesta al perseguidor se ajusta a la idea de «callar sin mentir» del párrafo 4?', ['«Se fue hace rato hacia el río»', 'Abrirle la puerta para que busque', 'Pedir ayuda a los vecinos y luego decir que no hay nadie', '«No voy a contestar esa pregunta»'], 3, 'Negarse a responder no dice nada falso; las otras opciones mienten o entregan al amigo.', 'verdad'),
    P('icf-lc-literal', 'Según el párrafo 5, pensar en un caso extremo sirve para', ['demostrar que mentir es bueno', 'terminar la discusión de una vez', 'preguntarse si las reglas valen por sí mismas o por lo que logran', 'entender las razones de quienes persiguen a otros para hacerles daño'], 2, 'El texto lo dice casi con esas palabras en su última oración.', 'verdad'),
    P('icf-lc-estructura', 'A lo largo de todo el texto, el autor', ['presenta varias posiciones sin declarar cuál es la correcta', 'defiende que siempre se debe decir la verdad', 'se burla de los filósofos', 'cuenta algo que le pasó en su casa con un amigo que se escondía'], 0, 'Expone tres caminos y cierra diciendo que «ninguna de estas respuestas cierra la discusión».', 'verdad'),

    P('icf-lc-discontinuo', 'Según la tabla, el uso que más agua consume cada día es', ['el sanitario', 'lavar la ropa', 'cocinar y beber', 'la ducha'], 3, 'La ducha de 10 minutos gasta 45 litros, más que cualquier otro uso.', 'agua'),
    P('icf-lc-discontinuo', 'La ducha y el sanitario juntos representan, del total diario de una persona,', ['cerca de una cuarta parte', 'más de la mitad', 'cerca de una décima parte', 'todo el consumo'], 1, '$45 + 35 = 80$ litros de 150: un poco más de la mitad.', 'agua'),
    P('icf-lc-discontinuo', 'Si una persona que se duchaba 10 minutos sigue el consejo 1, su consumo diario queda en', ['75 litros', '105 litros', 'unos 128 litros', '150 litros'], 2, 'La ducha baja a la mitad: de 45 a 22.5 litros. $150 - 22.5 = 127.5$, unos 128.', 'agua'),
    P('icf-lc-discontinuo', 'El último párrafo, que empieza con «Ojo», busca', ['mostrar que también se gasta agua en lo que compramos, aunque no aparezca en el recibo', 'invitar a no volver a comprar camisetas de algodón para que las fábricas gasten menos agua', 'corregir un error de la tabla', 'explicar cómo se cultiva el algodón'], 0, 'El ejemplo de la camiseta muestra un gasto de agua que el recibo del hogar no cuenta.', 'agua'),
    P('icf-lc-evalua', '¿Cuál conclusión NO se puede sacar de la infografía?', ['Cocinar y beber está entre los usos que menos agua gastan', 'Todos los hogares del país usan exactamente 150 litros por persona', 'Lavar la ropa solo con la carga completa ayuda a ahorrar agua cada semana', 'Hay agua que se gasta fuera de la casa'], 1, 'Los 150 litros son un promedio de los hogares de la ciudad: no se puede decir que todos usen exactamente eso.', 'agua'),
    P('icf-lc-literal', 'La botella con arena ahorra agua porque', ['la arena limpia el agua del tanque', 'hace que el sanitario descargue con más fuerza y así no haya que repetir la descarga', 'evita que el tanque se llene', 'ocupa espacio dentro del tanque y así cada descarga usa menos agua'], 3, 'Al ocupar parte del tanque, entra menos agua en cada llenado: cerca de un litro menos por descarga.', 'agua'),
  ];

  const matematicas = [
    P('icf-ma-datos', 'Una tienda vendió en cuatro semanas 120, 150, 90 y 140 jugos. El promedio de jugos vendidos por semana fue', ['125', '130', '120', '140'], 0, '$120 + 150 + 90 + 140 = 500$ y $500 \\div 4 = 125$.'),
    P('icf-ma-proporcion', 'En un mapa a escala $1 : 250\\,000$, dos pueblos están a 6 cm. La distancia real entre ellos es', ['1.5 km', '150 km', '15 km', '25 km'], 2, '$6 \\cdot 250\\,000 = 1\\,500\\,000$ cm, que son 15 000 m: 15 km.'),
    P('icf-ma-finanzas', 'Un celular de 800 mil pesos tiene 15 % de descuento y, sobre el precio rebajado, se cobra el IVA del 19 %. El precio final es', ['832 mil', '809.2 mil', '784 mil', '952 mil'], 1, '$800 \\cdot 0.85 = 680$ y $680 \\cdot 1.19 = 809.2$ mil. Los porcentajes no se restan: se aplican uno tras otro.'),
    P('icf-ma-azar', 'Julián tiene 4 camisetas y 3 pantalones. ¿Cuántas combinaciones distintas de una camiseta y un pantalón puede armar?', ['7', '24', '64', '12'], 3, 'Por cada camiseta hay 3 pantalones: $4 \\cdot 3 = 12$.'),
    P('icf-ma-azar', 'En una bolsa hay 5 bolas rojas, 3 azules y 2 verdes. Si se saca una al azar, la probabilidad de que NO sea roja es', ['$\\tfrac{3}{10}$', '$\\tfrac{1}{2}$', '$\\tfrac{1}{5}$', '$\\tfrac{2}{5}$'], 1, 'No rojas hay $3 + 2 = 5$ de 10: $\\tfrac{5}{10} = \\tfrac12$.'),
    P('icf-ma-medida', 'Un terreno rectangular de 24 m por 15 m se va a rodear con 3 vueltas de alambre. ¿Cuántos metros de alambre se necesitan?', ['234 m', '78 m', '360 m', '1 080 m'], 0, 'El perímetro es $2(24 + 15) = 78$ m y tres vueltas son $3 \\cdot 78 = 234$ m.'),
    P('icf-ma-medida', 'Un tanque cilíndrico tiene 1 m de radio y 2 m de altura. Con $\\pi \\approx 3.14$, le caben', ['628 litros', '3 140 litros', '12 560 litros', '6 280 litros'], 3, '$V = \\pi r^2 h = 3.14 \\cdot 1 \\cdot 2 = 6.28$ m³, y cada m³ son 1 000 litros.'),
    P('icf-ma-lineal', 'Un parqueadero cobra 3 000 pesos fijos más 2 000 por cada hora. ¿Cuánto paga quien deja el carro 5 horas?', ['10 000', '15 000', '13 000', '25 000'], 2, '$3\\,000 + 5 \\cdot 2\\,000 = 13\\,000$ pesos.'),
    P('icf-ma-lineal', 'Una vela mide 30 cm y se consume 2 cm cada hora. Su altura $h$ después de $t$ horas es', ['$h = 2t + 30$', '$h = 30t - 2$', '$h = 30 - 2t$', '$h = 2 - 30t$'], 2, 'Empieza en 30 y pierde 2 por cada hora: $h = 30 - 2t$.'),
    P('icf-ma-forma', 'Una escalera de 10 m se apoya en una pared con el pie a 6 m de ella. ¿A qué altura toca la pared?', ['4 m', '8 m', '16 m', '12 m'], 1, '$10^2 - 6^2 = 64$ y $\\sqrt{64} = 8$ m.'),
    P('icf-ma-forma', 'Un poste proyecta una sombra de 9 m al mismo tiempo que una persona de 1.6 m proyecta una sombra de 1.2 m. La altura del poste es', ['12 m', '6.75 m', '10.8 m', '14.4 m'], 0, 'Los triángulos son semejantes: $\\tfrac{h}{9} = \\tfrac{1.6}{1.2}$, así que $h = 12$ m.'),
    P('icf-ma-ecuaciones', 'En un curso hay 38 estudiantes y hay 6 mujeres más que hombres. ¿Cuántos hombres hay?', ['22', '19', '17', '16'], 3, 'Si hay $h$ hombres, hay $h + 6$ mujeres: $2h + 6 = 38$ y $h = 16$.'),
    P('icf-ma-ecuaciones', 'Una función de teatro cobra 12 mil por adulto y 7 mil por niño. Se vendieron 50 entradas por 460 mil. ¿Cuántas entradas de niño se vendieron?', ['22', '30', '20', '28'], 3, '$12(50 - n) + 7n = 460$: $600 - 5n = 460$ y $n = 28$.'),
    P('icf-ma-argumenta', '¿Cuál número muestra que es falsa la afirmación «todo número divisible entre 4 es divisible entre 8»?', ['12', '16', '24', '7'], 0, '12 es divisible entre 4 pero no entre 8. El 7 no sirve: ni siquiera es divisible entre 4.'),
    P('icf-ma-finanzas', 'Se ahorran 2 000 000 de pesos al 10 % anual con interés compuesto. Al cabo de 2 años hay', ['2 400 000', '2 200 000', '2 420 000', '2 440 000'], 2, '$2\\,000\\,000 \\cdot 1.1 = 2\\,200\\,000$ y $2\\,200\\,000 \\cdot 1.1 = 2\\,420\\,000$.'),
    P('icf-ma-curvas', 'La altura de un balón es $h(t) = -5t^2 + 20t$ (metros y segundos). Su altura máxima es', ['10 m', '20 m', '40 m', '15 m'], 1, 'Vale 0 en $t = 0$ y en $t = 4$: el máximo está en $t = 2$, con $h = -20 + 40 = 20$ m.'),
    P('icf-ma-curvas', 'Un cultivo empieza con 500 bacterias y se duplica cada 3 horas. ¿Cuántas hay a las 12 horas?', ['2 000', '8 000', '4 000', '6 000'], 1, 'En 12 horas hay 4 duplicaciones: $500 \\cdot 2^4 = 8\\,000$.'),
    P('icf-ma-espacio', 'El punto $(2, -5)$ se refleja respecto al eje x. Su imagen es', ['$(-2, -5)$', '$(-2, 5)$', '$(5, 2)$', '$(2, 5)$'], 3, 'Al reflejar en el eje x se conserva la x y cambia el signo de la y.'),
    P('icf-ma-dispersion', 'Las notas del grupo A son 3.0, 3.0, 3.0 y 3.0; las del grupo B, 1.0, 2.0, 4.0 y 5.0. Es correcto afirmar que', ['tienen el mismo promedio y B está más disperso', 'A tiene mayor promedio', 'B tiene mayor promedio', 'tienen la misma dispersión'], 0, 'Los dos promedian 3.0; las notas de B se apartan más de ese promedio.'),
    P('icf-ma-dispersion', 'Los salarios, en millones, de una empresa pequeña son 1.3, 1.3, 1.5, 1.6 y 9.0. ¿Qué medida representa mejor el salario típico?', ['El promedio, porque usa todos los datos', 'El salario mayor', 'La mediana, porque el 9.0 no la altera', 'El rango'], 2, 'El 9.0 sube el promedio a casi 3 millones; la mediana, 1.5, refleja lo que gana la mayoría.'),
    P('icf-ma-numeros', 'La distancia de la Tierra al Sol es de unos 150 000 000 km. En notación científica es', ['$1.5 \\cdot 10^8$ km', '$15 \\cdot 10^9$ km', '$1.5 \\cdot 10^7$ km', '$150 \\cdot 10^5$ km'], 0, 'La coma corre 8 lugares para dejar 1.5 entre 1 y 10.'),
    P('icf-ma-numeros', 'De 60 estudiantes, 35 juegan fútbol, 28 juegan baloncesto y 10 juegan los dos. ¿Cuántos no juegan ninguno?', ['17', '7', '3', '13'], 1, 'Juegan alguno $35 + 28 - 10 = 53$; no juegan $60 - 53 = 7$.'),
    P('icf-ma-azar', '¿Cuántos comités distintos de 2 personas se pueden formar con 6 candidatos?', ['12', '30', '36', '15'], 3, 'En un comité no importa el orden: $\\tfrac{6 \\cdot 5}{2} = 15$.'),
    P('icf-ma-datos', 'Una panadería pasó de vender 400 a 500 panes diarios. El aumento porcentual fue', ['20 %', '100 %', '25 %', '50 %'], 2, 'Subió 100 sobre los 400 de antes: $\\tfrac{100}{400} = 25\\,\\%$.'),
  ];

  const sociales = [
    P('icf-sc-constitucion', 'En Colombia, la rama del poder público encargada de hacer las leyes es', ['la ejecutiva, que encabeza el presidente', 'la judicial', 'la legislativa, que es el Congreso', 'la Registraduría'], 2, 'El Congreso, con Senado y Cámara, forma la rama legislativa.'),
    P('icf-sc-constitucion', 'A una persona le niegan en un hospital una cirugía urgente sin la cual corre peligro su vida. Para proteger su derecho de inmediato puede acudir a', ['la acción de tutela', 'un referendo', 'la revocatoria del mandato', 'un cabildo abierto'], 0, 'La tutela protege de forma rápida los derechos fundamentales cuando están amenazados, como la vida y la salud.'),
    P('icf-sc-participacion', 'Los habitantes de un municipio quieren sacar al alcalde antes de terminar su periodo porque no cumple el programa por el que votaron. El mecanismo adecuado es', ['el plebiscito', 'el cabildo abierto', 'la consulta popular', 'la revocatoria del mandato'], 3, 'La revocatoria permite a los votantes quitarle el mandato a un alcalde o gobernador que incumple su programa.'),
    P('icf-sc-participacion', 'La entidad que vigila cómo se gastan los recursos públicos es', ['la Fiscalía', 'la Contraloría', 'la Defensoría del Pueblo', 'el Senado'], 1, 'La Contraloría hace el control fiscal: revisa el uso de los dineros públicos.'),
    P('icf-sc-perspectivas', 'En un barrio se quiere construir un parque en un lote que hoy usan unos jóvenes como cancha y unos taxistas como parqueadero. ¿Qué afirmación reconoce mejor los intereses en juego?', ['Solo cuenta la opinión de los vecinos que pagan impuestos, porque el lote es de la ciudad', 'Jóvenes y taxistas usan el lote distinto y ambos pueden perder con el parque', 'Los taxistas no tienen ningún interés en el lote', 'Un parque beneficia a todos por igual'], 1, 'Reconocer a cada actor y lo que perdería es el primer paso para buscar una solución que no excluya a nadie.'),
    P('icf-sc-perspectivas', '«Los muchachos que llegan del campo no saben usar un computador». Esta afirmación es', ['un dato comprobado', 'el resultado de una encuesta', 'una generalización que puede ser un prejuicio', 'una norma de la Constitución'], 2, 'Atribuye a todo un grupo una característica sin pruebas: es una generalización que puede llevar a discriminar.'),
    P('icf-sc-fuentes', 'Un historiador quiere saber cómo vivían los obreros de una fábrica en los años treinta. ¿Qué fuente le da información más directa?', ['Cartas escritas por obreros de esa fábrica en esos años', 'Una película reciente sobre la época', 'Un libro escolar de hoy', 'La opinión de un turista que pasó por el pueblo en esos años'], 0, 'Las cartas son fuentes primarias: las escribieron quienes vivieron lo que se estudia.'),
    P('icf-sc-fuentes', 'Un periódico de mediados del siglo XX publicó que «el pueblo apoya masivamente al gobierno». Antes de usarlo como prueba de ese apoyo, conviene', ['aceptarlo como prueba, porque un periódico de la época vio lo que pasaba en ese momento', 'contar cuántas palabras tiene la noticia', 'averiguar el nombre del impresor', 'saber quién era el dueño del periódico y si había censura en ese momento'], 3, 'Una fuente se lee en su contexto: quién habla, con qué interés y con qué libertad.'),
    P('icf-sc-sistemico', 'Un municipio prohibió la pesca durante seis meses para que el río recuperara sus peces. ¿Qué efecto negativo, no buscado, debería prever?', ['Que aumenten los peces del río, que era justamente lo que buscaba la medida', 'Que el río se vea más limpio', 'Que lleguen más turistas', 'Que las familias que viven de la pesca se queden sin ingresos'], 3, 'Una medida ambiental puede golpear la economía de quienes dependen de ese recurso: hay que prever cómo apoyarlos.'),
    P('icf-sc-sistemico', 'Una carretera por una reserva natural acortaría el viaje a la ciudad, pero partiría el bosque en dos. El caso enfrenta, sobre todo, las dimensiones', ['religiosa y deportiva', 'económica y ambiental', 'familiar y artística', 'militar y educativa'], 1, 'Ganar tiempo y comercio choca con la conservación del bosque.'),
    P('icf-sc-historia', 'Durante la Colonia, la encomienda consistía en', ['una carta que se enviaba al rey de España', 'un impuesto que pagaban los comerciantes españoles por los productos que traían de Europa', 'la entrega de indígenas a un español, que les cobraba tributo y debía evangelizarlos', 'una fiesta religiosa del calendario'], 2, 'La encomienda entregaba indígenas a un encomendero a cambio de «protegerlos» y evangelizarlos; en la práctica permitió muchos abusos.'),
    P('icf-sc-historia', 'En el siglo XIX, muchas guerras enfrentaron a centralistas y federalistas. La Constitución de 1863, conocida como de Rionegro, se recuerda porque', ['organizó el país como una federación de estados soberanos', 'creó el Frente Nacional', 'abolió por primera vez la esclavitud', 'dio el voto a las mujeres'], 0, 'Fue la cumbre del federalismo: los Estados Unidos de Colombia. La esclavitud se abolió en 1851 y el voto femenino llegó en el siglo XX.'),
    P('icf-sc-historia', 'El Frente Nacional (1958-1974) fue un acuerdo según el cual', ['liberales y conservadores se alternaban la presidencia y se repartían los cargos públicos', 'se prohibieron todos los partidos y el país quedó en manos de una junta militar durante dieciséis años', 'Colombia se unió con Venezuela', 'las guerrillas llegaron al gobierno'], 0, 'Buscó terminar la violencia entre los dos partidos, pero cerró el paso a otras fuerzas políticas.'),
    P('icf-sc-mundo', 'La Revolución francesa difundió la idea de que', ['el rey recibe su poder directamente de Dios y por eso no debe responder ante el pueblo', 'solo los nobles deben votar', 'la Iglesia debe elegir a los gobernantes', 'el poder viene del pueblo y las personas nacen libres e iguales en derechos'], 3, 'La Declaración de los Derechos del Hombre y del Ciudadano puso la soberanía en la nación y la igualdad ante la ley.'),
    P('icf-sc-mundo', 'La Guerra Fría recibe ese nombre porque', ['se libró sobre todo en países de clima frío, como Rusia, Canadá y los países escandinavos', 'Estados Unidos y la Unión Soviética compitieron sin atacarse directamente entre ellas', 'duró un solo invierno', 'nadie tenía armas'], 1, 'Hubo carrera armamentista y guerras en otros países, pero las dos potencias no se atacaron directamente.'),
    P('icf-sc-geografia', 'Cerca del ecuador, al subir de la costa a una ciudad a 2 600 metros de altura, la temperatura', ['sube porque se está más cerca del Sol', 'no cambia', 'baja, porque disminuye con la altura', 'depende solo de la estación del año'], 2, 'En Colombia el clima depende sobre todo de la altura: unos 6 °C menos por cada 1 000 m.'),
    P('icf-sc-geografia', '¿Qué se puede ver mejor en un mapa a escala $1 : 50\\,000$ que en uno a $1 : 5\\,000\\,000$?', ['Todo el continente', 'Las fronteras de todos los países de América del Sur', 'Detalles de un municipio, como calles o quebradas', 'Los océanos'], 2, 'Una escala más grande reduce menos la realidad: muestra menos territorio con más detalle.'),
    P('icf-sc-economia', 'Una helada destruye buena parte de la cosecha de papa y la demanda sigue igual. Lo más probable es que el precio de la papa', ['suba', 'baje', 'se quede igual por ley', 'llegue a cero'], 0, 'Hay menos papa para las mismas ganas de comprarla: el precio sube.'),
    P('icf-sc-economia', 'El salario de una persona sube 4 % en un año y los precios suben 9 %. Su salario real', ['subió 13 %', 'subió 4 %', 'no cambió', 'bajó'], 3, 'El salario real mide lo que alcanza a comprar: si los precios suben más que el sueldo, baja.'),
    P('icf-sc-economia', 'Un tratado de libre comercio baja los aranceles a la leche importada. ¿Quiénes es más probable que enfrenten más competencia?', ['Los consumidores de leche', 'Los pequeños productores de leche del país', 'Los exportadores de café', 'Los bancos'], 1, 'La leche de afuera entra más barata y compite con la que producen los campesinos del país.'),
    P('icf-sc-modelos', 'Un gobierno que cobra más impuestos a quienes más ganan para ofrecer salud y educación gratuitas sigue, sobre todo, una lógica', ['de libre mercado sin intervención', 'de Estado de bienestar', 'monárquica', 'comunitaria basada en asambleas'], 1, 'El Estado de bienestar mantiene el mercado y reparte parte de la riqueza con servicios para todos.'),
    P('icf-sc-modelos', 'Una norma aprobada con todos los procedimientos, pero que la mayoría de la población rechaza por injusta, es', ['ilegal e ilegítima', 'ilegal, pero legítima', 'inválida de forma automática', 'legal, pero con poca legitimidad'], 3, 'Cumplir los procedimientos la hace legal; que la gente no la acepte afecta su legitimidad.'),
    P('icf-sc-constitucion', 'Que Colombia sea un «Estado social de derecho» significa, entre otras cosas, que', ['el presidente puede cambiar las leyes cuando quiera, siempre que sea para mejorar la vida social', 'solo importa el derecho a la propiedad', 'el Estado debe buscar condiciones de vida digna para las personas y no solo mantener el orden', 'no existen tribunales'], 2, 'Además de someterse a la ley, el Estado se compromete con la dignidad y los derechos sociales.'),
    P('icf-sc-participacion', 'Antes de aprobar una mina en el territorio de una comunidad indígena, el Estado debe', ['hacer una consulta previa con la comunidad', 'pedir permiso a otro país', 'convocar un plebiscito nacional', 'esperar a que la empresa decida sola si la mina se hace'], 0, 'La consulta previa es un derecho de los pueblos étnicos frente a decisiones que afectan su territorio.'),
  ];

  const ciencias = [
    P('icf-cn-indaga', 'Un estudiante quiere saber si la luz afecta el crecimiento de una planta de frijol. ¿Cuál montaje es el más adecuado?', ['Una planta a la luz, regada cada día, y otra igual a la sombra, regada una vez por semana', 'Una sola planta a la luz', 'Dos plantas a la sombra con distinta cantidad de agua', 'Dos plantas iguales, con la misma agua y la misma tierra, una a la luz y otra a la sombra'], 3, 'Solo debe cambiar la luz: si también cambia el agua, no se sabría qué causó la diferencia.'),
    P('icf-cn-indaga', 'En un experimento, al pasar el agua de 20 °C a 50 °C, el azúcar que se disuelve en 100 g de ella pasa de 204 g a 260 g. Se puede concluir que, en ese rango,', ['la temperatura no influye', 'a mayor temperatura se disuelve más azúcar', 'el azúcar se evapora', 'a mayor temperatura se disuelve menos azúcar'], 1, 'Al subir la temperatura subió la cantidad disuelta.'),
    P('icf-cn-celula', 'En una célula animal, la mayor parte de la energía (ATP) se produce en', ['la mitocondria', 'el cloroplasto', 'la pared celular', 'el núcleo'], 0, 'La respiración celular ocurre en las mitocondrias; las células animales no tienen cloroplastos ni pared.'),
    P('icf-cn-celula', 'Un trozo de papa que se deja en agua muy salada se arruga porque', ['la sal entra y la infla', 'absorbe la sal y crece', 'el agua sale de sus células hacia el lado donde hay más sal', 'el agua salada la cocina'], 2, 'Es ósmosis: el agua pasa por la membrana hacia donde hay más sal disuelta.'),
    P('icf-cn-celula', 'La hebra de ADN que sirve de molde es ATG CCA. El ARN mensajero que se transcribe a partir de ella es', ['ATG CCA', 'TAC GGT', 'UAC GGU', 'AUG CCA'], 2, 'A se une con U en el ARN, T con A, G con C y C con G: UAC GGU.'),
    P('icf-cn-movimiento', 'Un ciclista recorre 30 km en 1.5 horas. Su rapidez media es', ['45 km/h', '15 km/h', '31.5 km/h', '20 km/h'], 3, 'Se divide la distancia entre el tiempo: $30 \\div 1.5 = 20$ km/h.'),
    P('icf-cn-movimiento', 'Una caja está en reposo sobre una mesa. La fuerza que equilibra su peso es', ['la fricción', 'la fuerza normal que ejerce la mesa', 'una fuerza magnética', 'la tensión de una cuerda'], 1, 'La mesa empuja hacia arriba con la fuerza normal, igual al peso.'),
    P('icf-cn-movimiento', 'Si en un lugar sin aire se sueltan al tiempo, desde la misma altura, una pluma y un martillo,', ['llegan al suelo al mismo tiempo', 'el martillo llega primero', 'la pluma llega primero', 'la pluma se queda flotando'], 0, 'Sin aire no hay resistencia: la gravedad acelera igual a los dos.'),
    P('icf-cn-materia', 'Para separar una mezcla de agua y aceite, el método más sencillo es', ['dejarla reposar y separar las capas (decantación)', 'evaporar todo el líquido', 'pasarle un imán', 'tamizarla'], 0, 'El aceite, menos denso, queda arriba: basta separar las dos capas.'),
    P('icf-cn-ecosistemas', 'En la cadena pasto → conejo → zorro desaparecen los zorros. Lo más probable a corto plazo es que', ['disminuyan los conejos', 'aumente el pasto', 'aumenten los conejos y disminuya el pasto', 'el pasto desaparezca de inmediato'], 2, 'Sin depredador, los conejos se multiplican y comen más pasto.'),
    P('icf-cn-ecosistemas', 'En el ciclo del carbono, las plantas toman CO₂ del aire mediante', ['la respiración', 'la combustión', 'la descomposición', 'la fotosíntesis'], 3, 'En la fotosíntesis usan CO₂, agua y luz para formar azúcares.'),
    P('icf-cn-energia', 'Una pelota de 0.5 kg se deja caer desde 10 m, sin rozamiento ($g = 10$ m/s²). Justo antes de tocar el suelo, su energía cinética es', ['5 J', '50 J', '100 J', '500 J'], 1, 'Toda la energía potencial se vuelve cinética: $mgh = 0.5 \\cdot 10 \\cdot 10 = 50$ J.'),
    P('icf-cn-energia', 'Una baranda de metal y una de madera están a la misma temperatura, pero la de metal se siente más fría porque', ['está a menor temperatura', 'conduce el calor más rápido y le quita calor a la mano', 'la madera produce calor', 'el metal está siempre a menor temperatura que el aire que lo rodea'], 1, 'El metal es buen conductor: saca calor de la piel más rápido, y eso se siente como frío.'),
    P('icf-cn-atomo', 'Un átomo neutro de sodio tiene 11 protones. ¿Cuántos electrones tiene?', ['11', '12', '23', '10'], 0, 'Si es neutro, tiene tantos electrones como protones.'),
    P('icf-cn-atomo', 'La sal de cocina (NaCl) tiene enlace iónico porque', ['sus átomos comparten electrones por igual y forman moléculas separadas unas de otras', 'los dos elementos son metales', 'el sodio cede un electrón al cloro y quedan iones de carga opuesta que se atraen', 'no tiene electrones'], 2, 'Un metal y un no metal: uno cede y otro gana electrones.'),
    P('icf-cn-herencia', 'En una planta, la semilla lisa (R) domina sobre la rugosa (r). Al cruzar dos plantas Rr, la proporción esperada de semillas rugosas es', ['$\\tfrac12$', '$\\tfrac34$', '0', '$\\tfrac14$'], 3, 'Las combinaciones son RR, Rr, rR y rr: una de cuatro es rugosa.'),
    P('icf-cn-herencia', 'Las bacterias que sobreviven a un antibiótico y se multiplican son un ejemplo de', ['que las bacterias aprenden a defenderse', 'herencia de lo que se gana con esfuerzo', 'generación espontánea', 'selección natural'], 3, 'Las que ya eran resistentes sobreviven y dejan descendencia: la población cambia.'),
    P('icf-cn-reacciones', 'En la reacción $2H_2 + O_2 \\to 2H_2O$ reaccionan por completo 4 g de hidrógeno con 32 g de oxígeno. Se forman', ['32 g de agua', '36 g de agua', '28 g de agua', '4 g de agua'], 1, 'La masa se conserva: $4 + 32 = 36$ g.'),
    P('icf-cn-reacciones', 'Una sustancia con pH 3 es', ['ácida', 'neutra', 'básica', 'una sal pura'], 0, 'Un pH menor que 7 indica una sustancia ácida; 7 es neutro.'),
    P('icf-cn-ondas', 'Un sonido viaja a 340 m/s con una frecuencia de 170 Hz. Su longitud de onda es', ['0.5 m', '510 m', '2 m', '57 800 m'], 2, '$\\lambda = \\tfrac{v}{f} = \\tfrac{340}{170} = 2$ m.'),
    P('icf-cn-gases', 'Un gas está en un recipiente cerrado y rígido. Si se calienta, su presión', ['disminuye', 'no cambia', 'aumenta', 'se vuelve cero'], 2, 'Con volumen fijo, las partículas se mueven más rápido y chocan con más fuerza: la presión sube.'),
    P('icf-cn-electrico', 'Una resistencia de 6 Ω se conecta a una pila de 12 V. La corriente que pasa es', ['2 A', '72 A', '0.5 A', '18 A'], 0, 'Por la ley de Ohm, $I = \\tfrac{V}{R} = \\tfrac{12}{6} = 2$ A.'),
    P('icf-cn-cts', 'Para saber si una vacuna funciona, lo más adecuado es comparar', ['a quienes decidieron vacunarse con quienes decidieron no hacerlo, sin ningún sorteo', 'un grupo vacunado y otro que recibe un placebo, escogidos al azar', 'los testimonios de personas famosas', 'el precio de varias vacunas'], 1, 'Con grupos al azar y un placebo, lo único distinto entre los grupos es la vacuna.'),
    P('icf-cn-gases', 'Se disuelven 20 g de sal en agua hasta completar 500 mL de disolución. Su concentración es', ['10 g/L', '4 g/L', '25 g/L', '40 g/L'], 3, '500 mL son 0.5 L: $20 \\div 0.5 = 40$ g/L.'),
  ];

  const ingles = [
    P('icf-en-avisos', 'Where can you see this sign? "Please keep your phone silent during the film."', ['In a cinema', 'In a bank', 'In a park', 'In a swimming pool'], 0, '«The film» (la película) indica que el aviso está en un cine.'),
    P('icf-en-avisos', 'What does this sign mean? "No parking: emergency exit."', ['You can leave your car here, but only during an emergency.', 'Cars must go faster here.', 'The exit is closed.', 'Do not leave your car here; this door must stay free.'], 3, '«No parking» prohíbe estacionar porque la salida de emergencia debe quedar libre.'),
    P('icf-en-avisos', 'A door says: "Staff only beyond this point." Who can go past this door?', ['Every visitor', 'Children with their parents', 'People who work there', 'Nobody at all'], 2, '«Staff» es el personal: solo quienes trabajan allí pueden pasar.'),
    P('icf-en-avisos', 'A sign says: "Fresh bread every morning — open from 6 a.m." This sign is probably in a', ['pharmacy', 'bakery', 'library', 'garage'], 1, 'Pan fresco cada mañana: es una panadería, «bakery».'),
    P('icf-en-avisos', 'You use this object to cut paper. It is a', ['spoon', 'pillow', 'ladder', 'pair of scissors'], 3, '«Scissors» son las tijeras; las otras palabras son cuchara, almohada y escalera.'),
    P('icf-en-avisos', 'A person who takes care of sick people in a hospital is a', ['pilot', 'nurse', 'farmer', 'judge'], 1, '«Nurse» es enfermero o enfermera.'),
    P('icf-en-avisos', 'You put your clothes in this when you travel. It is a', ['fridge', 'wallet', 'suitcase', 'mirror'], 2, '«Suitcase» es la maleta; «wallet» es la billetera.'),
    P('icf-en-dialogos', 'Complete the conversation. "Would you like some more juice?" —', ['No, thanks. I\'m fine.', 'Yes, I would like it yesterday.', 'It\'s on Tuesday.', 'I am seventeen years old.'], 0, 'A un ofrecimiento se responde aceptando o rechazando con cortesía.'),
    P('icf-en-dialogos', 'Complete the conversation. "Sorry I\'m late." —', ['Yes, it\'s late.', 'Don\'t worry. We haven\'t started yet.', 'Yes, you are very late, thank you for coming.', 'At eight o\'clock.'], 1, 'Ante una disculpa, lo natural es tranquilizar a la otra persona.'),
    P('icf-en-dialogos', 'Complete the conversation. "How long have you lived here?" —', ['For about five years.', 'It\'s very long.', 'Next month.', 'By bus.'], 0, '«How long» pregunta por cuánto tiempo: «for about five years».'),
    P('icf-en-dialogos', 'Complete the conversation. "Can you help me carry these boxes?" —', ['Yes, I can\'t.', 'They are very heavy boxes, aren\'t you?', 'No, it\'s mine.', 'Sure. Where do you want them?'], 3, 'Acepta la petición y pregunta algo que tiene sentido para ayudar.'),
    P('icf-en-gramatica', 'Choose the word for gap (1).', ['live', 'living', 'lives', 'is live'], 2, 'Con «my grandmother» (ella) el presente simple lleva -s: «lives».', 'jardin'),
    P('icf-en-gramatica', 'Choose the word for gap (2).', ['plant', 'plants', 'planted', 'planting'], 2, '«Last week» pide pasado: «planted».', 'jardin'),
    P('icf-en-gramatica', 'Choose the word for gap (3).', ['easy', 'easier', 'easiest', 'more easy'], 1, 'Compara dos cosas con «than»: «easier than».', 'jardin'),
    P('icf-en-gramatica', 'Choose the word for gap (4).', ['most', 'more', 'much', 'very'], 0, '«The most beautiful»: superlativo de un adjetivo largo.', 'jardin'),
    P('icf-en-corto', 'Why can\'t Sara go to the match?', ['She is sick.', 'She doesn\'t like football and prefers to stay at home.', 'She has to work.', 'She has to take her sister to the doctor.'], 3, 'Lo dice al comienzo: «I have to take my little sister to the doctor».', 'mensaje'),
    P('icf-en-corto', 'In her message, what does Sara suggest?', ['Watching the next game together at her house', 'Going to the doctor with Lucas', 'Making pizza at Lucas\'s house', 'Playing football tomorrow'], 0, 'Propone ver el siguiente partido el sábado en su casa.', 'mensaje'),
    P('icf-en-corto', 'In the message, "Text me!" means', ['Write a book.', 'Call the doctor.', 'Send me a message.', 'Read my text.'], 2, '«Text» como verbo es enviar un mensaje de texto.', 'mensaje'),
    P('icf-en-corto', 'According to the message, who will make pizza?', ['Lucas', 'Sara\'s mother', 'Sara\'s sister', 'The doctor'], 1, '«My mum will make pizza»: la mamá de Sara.', 'mensaje'),
    P('icf-en-largo', 'What is the text mainly about?', ['How to repair an old bus', 'Why the roads in the mountains are bad in the rainy season', 'The life of volunteers in the city', 'A teacher who takes books to villages without a library'], 3, 'Todo el texto cuenta el proyecto de Rosa y su bus de libros.', 'bus'),
    P('icf-en-largo', 'Why did more people start coming to the bus?', ['Rosa gave them money.', 'The bus was new.', 'The children were forced to come by their teachers every week.', 'Rosa read stories aloud and parents joined.'], 3, 'El párrafo 2: empezó a leer en voz alta bajo los árboles y llegaron los padres.', 'bus'),
    P('icf-en-largo', 'What is the biggest problem for the project?', ['There are no books.', 'Nobody wants to read.', 'The road is bad in the rainy season.', 'The volunteers from the city'], 2, '«The biggest problem is the road» en temporada de lluvias.', 'bus'),
    P('icf-en-inferencia', 'What does Rosa mean in her last sentence?', ['The bus also shows people that they are not forgotten.', 'She wants to stop the project.', 'She needs more books.', 'People in the villages often forget to return the books on time.'], 0, '«Feeling that someone remembers you»: el bus muestra a los pueblos que alguien piensa en ellos.', 'bus'),
    P('icf-en-largo', 'The word "borrow" in paragraph 3 means', ['to buy', 'to take something and give it back later', 'to write', 'to give something to another person as a present'], 1, 'Se pueden llevar los libros por un mes y devolverlos: «borrow» es tomar prestado.', 'bus'),
  ];

  return { id: 'icf-sim-1', titulo: 'Simulacro 1', textos, pruebas: { lectura, matematicas, sociales, ciencias, ingles } };
})());
;
//#archivo js/simulacro-icf-2.js
// Preicfes · Simulacro 2 (spec 2026-11-26-simulacros-preicfes): cinco pruebas de 24 preguntas A–D escritas para Zuka.
// Cada pregunta se escribe con la opción correcta primero; `pon` la cambia de puesto según un patrón con seis claves por letra.
PI_SIMULACROS.push((() => {
  const T = simT, Q = (m, q, o, e, d) => simP(m, q, o, 0, e, d);
  const BASE = [1, 3, 0, 2, 0, 2, 3, 0, 1, 2, 1, 3, 2, 0, 3, 1, 3, 2, 0, 1, 3, 1, 0, 2];
  const pon = (L, giro) => L.map((it, i) => {
    const k = BASE[(i + giro) % BASE.length], o = [...it.o];
    [o[0], o[k]] = [o[k], o[0]];
    return { ...it, o, r: k };
  });

  const textos = {
    cartera: T('La cartera de Santa Inés', [
      'Durante veintidós años, Clemencia repartió el correo de Santa Inés a pie. Conocía cada puerta por el sonido de su bisagra y cada perro por su manera de ladrar. Sabía quién esperaba una carta del hijo que se fue a la capital y quién temblaba al ver un sobre con el sello del banco.',
      'Cuando llegaron los teléfonos, las cartas empezaron a escasear. Primero dejaron de llegar las de amor, después las de los hijos, y al final solo quedaron los recibos. Clemencia seguía haciendo el mismo recorrido, aunque su bolso pesaba cada vez menos.',
      'Una mañana encontró en la oficina un sobre sin remitente, dirigido a «quien todavía espere una carta». El jefe le dijo que lo botara: no había a quién entregarlo. Ella lo guardó en el bolsillo del delantal.',
      'Esa tarde, en lugar de volver a casa, recorrió el pueblo despacio. Vio a don Rufino regar sus matas mirando de reojo el camino, a la señora Elvira asomarse a la ventana cada vez que pasaba una moto, a un niño sentado en el andén con una cometa rota entre las manos.',
      'Al anochecer, Clemencia se sentó a escribir. Escribió una carta para don Rufino, otra para la señora Elvira y una más, con letra grande y redonda, para el niño. No las firmó. Al día siguiente las repartió como siempre, haciendo sonar las bisagras, y por primera vez en mucho tiempo el bolso le pareció pesado.',
    ]),
    celular: T('Que el colegio no le tema al celular', [
      'Cada cierto tiempo vuelve la misma propuesta: prohibir los celulares en los colegios. La idea suena sensata. Los teléfonos distraen, facilitan la copia en las evaluaciones y, a veces, sirven para burlarse de un compañero frente a todos. Nadie que haya dado una clase niega estos problemas.',
      'Sin embargo, creo que la prohibición total es una salida fácil a un problema difícil. Cuando un estudiante salga del colegio, nadie le va a quitar el teléfono en la puerta de la universidad o del trabajo. Si el colegio no le enseña a usarlo con criterio, ¿quién lo hará?',
      'Hay, además, un asunto de justicia. Para muchos jóvenes, el celular es el único aparato con internet que tienen. Prohibirlo en el aula significa negarles la posibilidad de consultar un diccionario, grabar una explicación o revisar una fuente durante la clase, algo que otros compañeros sí pueden hacer en sus computadores al llegar a casa.',
      'Propongo, en cambio, acuerdos claros: teléfonos guardados durante las evaluaciones y en los primeros minutos de cada clase, uso permitido cuando el docente lo indique para una tarea, y sanciones firmes para quien lo use para acosar. Estas reglas son más difíciles de cumplir que una prohibición, pero enseñan algo que la prohibición no enseña.',
      'Un colegio no prepara para un mundo sin pantallas, porque ese mundo no existe. Prepara, o debería preparar, para vivir bien entre ellas.',
    ]),
    teseo: T('El barco que cambió todas sus tablas', [
      'Cuenta una vieja historia que los atenienses conservaron durante siglos el barco en que el héroe Teseo había regresado de Creta. Cada vez que una tabla se pudría, la cambiaban por una nueva. Con los años llegó el día en que no quedaba ni una sola de las tablas originales. ¿Seguía siendo el barco de Teseo?',
      'Hay quien responde que sí: lo que hace que algo sea lo mismo no es su material, sino su forma, su historia y la función que cumple. El barco nunca dejó de navegar ni de ser cuidado como el barco de Teseo; los cambios fueron graduales y ninguno, por sí solo, lo convirtió en otro.',
      'Otros responden que no. Si alguien hubiera guardado las tablas viejas y con ellas armado de nuevo un barco, ¿cuál sería el verdadero? Parece difícil negar que el armado con las piezas originales tiene algún derecho al nombre.',
      'La pregunta no se queda en los barcos. Las células de nuestro cuerpo se renuevan; nuestras opiniones, gustos y recuerdos cambian. Sin embargo, decimos que la persona de cuarenta años es la misma que fue un niño de cinco. Algunos filósofos piensan que lo que nos mantiene es la memoria, el hilo que une lo que fuimos con lo que somos.',
      'Tal vez la pregunta no tenga una única respuesta. Pero obliga a aclarar qué entendemos cuando decimos que algo, o alguien, «sigue siendo el mismo».',
    ]),
    colegio: T('¿Cómo llegamos al colegio?', [
      'El consejo estudiantil de un colegio preguntó a sus 400 estudiantes cómo llegan cada mañana y cuánto tardan en promedio desde su casa. La tabla de abajo resume las respuestas de todos los grados.',
      'Los resultados sorprendieron a muchos: más de la mitad de los estudiantes llega sin usar ningún motor, a pie o en bicicleta. Quienes usan bicicleta son, en promedio, los que menos tardan, porque no esperan en los paraderos ni se detienen en los trancones de la avenida principal.',
      'Con estos datos, el consejo propuso pintar una ciclorruta en las tres cuadras que rodean el colegio y construir un parqueadero cubierto para cuarenta bicicletas más. Según sus cálculos, si una parte de quienes hoy usan transporte público se pasara a la bicicleta, cada uno ahorraría cerca de media hora cada mañana.',
      'La rectoría respondió que apoya la idea, pero pidió antes un estudio de seguridad: la avenida principal tiene mucho tráfico pesado, y ninguna cifra de minutos ahorrados compensa el riesgo de un accidente.',
      'La propuesta se discutirá en la próxima asamblea del colegio, con la participación de los padres de familia, los vecinos del barrio y la secretaría de movilidad del municipio.',
    ], [['Medio', 'Estudiantes', 'Tiempo promedio (min)'], ['A pie', '150', '15'], ['Bicicleta', '60', '12'], ['Bus escolar', '90', '25'], ['Transporte público', '80', '40'], ['Carro particular', '20', '20'], ['Total', '400', '']]),
    playa: T('The first time at the sea', [
      'Last December my family and I __(1)__ to the coast for the first time. My little brother __(2)__ never seen the sea before, so he was very excited. The trip by bus was __(3)__ than we expected: almost twelve hours! But when we arrived, the water was __(4)__ beautiful that he started to cry.',
    ]),
    nota: T('An email to Ms. Parker', [
      'Dear Ms. Parker, I am sorry, but I cannot come to class tomorrow. My family is moving to a new apartment and my parents need my help with the boxes. I have finished the history homework, so I will send it to you by email tonight. Could you tell me which pages we have to read for Friday? I don\'t want to miss anything before the exam. Thank you, Daniel.',
    ]),
    radio: T('A radio for the village', [
      'When Camila was fifteen, the only way to know what was happening in her village was to wait for the Sunday market. News travelled slowly, and sometimes it was wrong when it arrived. One day, a storm destroyed the bridge over the river, and many farmers drove to it the next morning because nobody had told them.',
      'Camila decided to do something. With an old computer, a microphone that her uncle gave her and the help of two friends, she started a small radio program from the school library. At first it was only fifteen minutes a week: the weather, the prices at the market and the dates of the vaccination days.',
      'Little by little, people began to call the program. A farmer explained how he protected his coffee from a pest, and a grandmother told old stories that the children had never heard. Today the program is on every day, and the mayor\'s office uses it to share important messages.',
      'Camila is now studying communication at a university in the city, but she still records a segment every Friday. "The radio did not make the village bigger," she says, "but it made the people closer."',
    ]),
  };

  const lectura = pon([
    Q('icf-lc-literal', 'Según el primer párrafo, Clemencia reconocía cada casa del pueblo por', ['el sonido que hacía la bisagra de su puerta', 'el color de la fachada y el número de la casa', 'el nombre de la familia escrito en el buzón', 'la cantidad de cartas que recibía cada mes'], 'El texto dice que «conocía cada puerta por el sonido de su bisagra».', 'cartera'),
    Q('icf-lc-literario', 'La frase «su bolso pesaba cada vez menos» (párrafo 2) expresa que', ['la gente del pueblo ya casi no se escribía cartas', 'Clemencia iba perdiendo las fuerzas con el paso de los años', 'el jefe le daba menos trabajo como castigo', 'los recibos del banco eran cada vez más livianos'], 'Con los teléfonos dejaron de llegar cartas: el bolso más liviano muestra que el oficio se iba quedando sin sentido.', 'cartera'),
    Q('icf-lc-literal', 'El sobre que Clemencia encontró en la oficina estaba dirigido a', ['quien todavía esperara una carta', 'don Rufino, que miraba el camino', 'la oficina de correos de la capital', 'Clemencia, de parte de alguien sin nombre'], 'El sobre decía «quien todavía espere una carta» y no tenía remitente.', 'cartera'),
    Q('icf-lc-estructura', '¿Qué función cumple el párrafo 4 dentro del relato?', ['Muestra a quiénes del pueblo les hace falta recibir algo', 'Explica por qué llegaron los teléfonos al pueblo de Santa Inés', 'Describe el recorrido de Clemencia en su juventud', 'Presenta una discusión entre Clemencia y su jefe'], 'Clemencia observa a don Rufino, a la señora Elvira y al niño, que esperan algo: son quienes después reciben sus cartas.', 'cartera'),
    Q('icf-lc-literario', 'Al final, el bolso «le pareció pesado» a Clemencia porque', ['llevaba cartas que ella escribió para quienes esperaban', 'el jefe le cargó en el bolso los recibos atrasados de todo el mes', 'estaba cansada de caminar por el pueblo de noche', 'el sobre sin remitente traía un paquete muy grande'], 'El peso vuelve con las cartas que ella misma escribió: su oficio recupera sentido.', 'cartera'),
    Q('icf-lc-evalua', '¿Cuál enunciado expresa mejor una idea central del cuento?', ['Un gesto de atención puede devolverle sentido a un oficio', 'La tecnología acabó con todos los oficios de los pueblos pequeños', 'Esperar noticias de alguien es una pérdida de tiempo', 'Los carteros deben abrir las cartas que no tienen dueño'], 'Clemencia mira a quienes esperan y les escribe: su atención convierte un recorrido vacío en algo valioso.', 'cartera'),

    Q('icf-lc-argumento', 'La tesis del autor es que', ['el colegio debe enseñar a usar el celular con reglas claras', 'los celulares deben prohibirse en todos los colegios sin excepción', 'los docentes deben usar más pantallas en sus clases', 'cada estudiante debe tener un computador para estudiar'], 'Rechaza la prohibición total y propone acuerdos de uso: el colegio debe enseñar a usarlo con criterio.', 'celular'),
    Q('icf-lc-argumento', 'En el párrafo 1, el autor', ['reconoce los problemas que trae el celular en clase', 'afirma que el celular nunca distrae a los estudiantes', 'cuenta cómo acosaron a un compañero en su colegio', 'propone castigos para quienes copien en las pruebas'], 'Antes de dar su opinión admite que los teléfonos distraen, facilitan la copia y sirven para burlarse: concede lo que dirían los contrarios.', 'celular'),
    Q('icf-lc-estructura', 'El párrafo 3 aporta un argumento basado en', ['la desigualdad en el acceso a internet', 'la experiencia del autor como docente', 'las cifras de copia en las evaluaciones', 'la opinión de los padres de familia'], 'Habla de «un asunto de justicia»: para muchos, el celular es el único acceso a internet.', 'celular'),
    Q('icf-lc-literal', 'Según el autor, las reglas que propone', ['son más difíciles de cumplir, pero enseñan algo', 'son más fáciles de cumplir que una prohibición', 'acaban por completo con el acoso entre compañeros', 'solo sirven para los estudiantes de grado once'], 'El párrafo 4 dice que son «más difíciles de cumplir que una prohibición, pero enseñan algo».', 'celular'),
    Q('icf-lc-evalua', '¿Cuál dato, de ser cierto, fortalecería más el argumento del párrafo 3?', ['Que en una encuesta seis de cada diez estudiantes dijeron no tener computador', 'Que la mitad de los docentes usa el celular en clase', 'Que los celulares nuevos tienen pantallas más grandes', 'Que en otros países también se discute la prohibición'], 'El párrafo 3 se apoya en que, para muchos, el celular es el único aparato con internet; quien no tiene computador depende de él, y el dato lo confirma con cifras.', 'celular'),
    Q('icf-lc-comparar', 'Una rectora escribe: «Desde que prohibimos los celulares, los recreos volvieron a tener conversación». Frente al texto, esta afirmación', ['apoya una medida que el autor considera una salida fácil', 'repite la propuesta del autor con otras palabras', 'demuestra que el autor tiene la razón en su argumento sobre la justicia', 'trata un tema que no tiene relación con el texto'], 'La rectora defiende la prohibición; el autor la llama «una salida fácil a un problema difícil».', 'celular'),

    Q('icf-lc-filosofico', '¿Qué problema plantea el texto?', ['Qué hace que algo siga siendo lo mismo cuando cambia', 'Cómo se construían y reparaban los barcos en la antigua Atenas', 'Por qué Teseo regresó de Creta en un barco viejo', 'Cuánto tiempo dura una tabla de madera en el mar'], 'El barco sirve de ejemplo para una pregunta general: qué hace que algo, o alguien, siga siendo el mismo.', 'teseo'),
    Q('icf-lc-filosofico', 'Según la posición del párrafo 2, el barco sigue siendo el de Teseo porque', ['conserva su forma, su historia y su función', 'todavía tiene algunas de sus tablas originales', 'los atenienses así lo decidieron en una votación', 'nadie notó que le iban cambiando las tablas'], 'Esa posición dice que la identidad no está en el material, sino en la forma, la historia y la función.', 'teseo'),
    Q('icf-lc-estructura', 'En el párrafo 3, el caso del barco armado con las tablas viejas sirve para', ['poner en duda la respuesta del párrafo 2', 'mostrar cómo se reparaban los barcos', 'probar que el barco de Teseo nunca existió', 'contar el final de la historia de Teseo'], 'Si las tablas viejas forman otro barco, este también reclama el nombre: es un contraejemplo a la primera respuesta.', 'teseo'),
    Q('icf-lc-filosofico', 'El párrafo 4 relaciona el problema del barco con', ['la identidad de las personas a lo largo de su vida', 'la manera de construir casas que duren siglos', 'las reglas de la navegación en el mar Egeo', 'la historia de la larga guerra que enfrentó a Atenas y Creta'], 'Pasa de los barcos a las personas: cambiamos de células, gustos y recuerdos y decimos que seguimos siendo los mismos.', 'teseo'),
    Q('icf-lc-filosofico', 'Para los filósofos que se mencionan al final del párrafo 4, una persona adulta es la misma que fue de niña porque', ['sus recuerdos unen lo que fue con lo que es', 'su cuerpo es el mismo, sin cambio alguno', 'conserva los mismos gustos y opiniones que tenía de niña', 'lleva el mismo nombre desde que nació'], 'Ellos dicen que lo que nos mantiene es la memoria, «el hilo que une lo que fuimos con lo que somos».', 'teseo'),
    Q('icf-lc-evalua', '¿Cuál de estas frases expresa una opinión del propio autor y no una de las posiciones que expone?', ['«Tal vez la pregunta no tenga una única respuesta»', '«Lo que hace que algo sea lo mismo no es su material»', '«El armado con las piezas originales tiene algún derecho al nombre»', '«Lo que nos mantiene es la memoria»'], 'Las otras tres resumen lo que piensan distintos grupos; en el último párrafo el autor da su propia valoración.', 'teseo'),

    Q('icf-lc-discontinuo', 'Según la tabla, ¿qué porcentaje de los estudiantes llega en bus escolar?', ['22.5 %', '25 %', '90 %', '9 %'], 'Son 90 de 400 estudiantes: 90 ÷ 400 = 0.225, es decir, 22.5 %.', 'colegio'),
    Q('icf-lc-discontinuo', 'La afirmación «más de la mitad de los estudiantes llega sin usar ningún motor» se apoya en que', ['150 + 60 = 210 estudiantes llegan a pie o en bicicleta', 'solo 20 estudiantes llegan en carro particular', '90 estudiantes usan el bus escolar cada mañana', 'el transporte público es el que tarda 40 minutos'], 'A pie y en bicicleta llegan 150 + 60 = 210 estudiantes, más que la mitad de 400.', 'colegio'),
    Q('icf-lc-literal', 'Según el texto, quienes llegan en bicicleta tardan menos porque', ['no esperan en paraderos ni quedan en los trancones', 'viven más cerca del colegio que los demás', 'salen de su casa más temprano que el resto', 'usan la ciclorruta que rodea las cuadras del colegio'], 'Lo dice el párrafo 2. La ciclorruta todavía no existe: es la propuesta del consejo.', 'colegio'),
    Q('icf-lc-discontinuo', 'Si un estudiante que hoy usa transporte público se pasa a la bicicleta y tarda lo que tardan los ciclistas, ¿cuántos minutos ahorra cada mañana?', ['28', '12', '40', '52'], 'En transporte público tarda 40 minutos y en bicicleta 12: ahorra 40 − 12 = 28, casi media hora.', 'colegio'),
    Q('icf-lc-estructura', 'Dentro del texto, el párrafo 4 introduce', ['una condición antes de aplicar la propuesta', 'el rechazo total de la rectoría a la idea', 'cifras nuevas sobre los tiempos de viaje de cada medio', 'la opinión de los vecinos del colegio'], 'La rectoría apoya la idea, pero pide primero un estudio de seguridad: es una condición, no un rechazo.', 'colegio'),
    Q('icf-lc-evalua', '¿Cuál conclusión NO se puede sacar de la información?', ['Los que viven más lejos son los que usan bicicleta', 'Llegan más estudiantes a pie que en cualquier otro medio', 'El transporte público es el más lento en promedio', 'Llegan menos estudiantes en carro que en bicicleta'], 'La encuesta no preguntó la distancia de la casa; las otras tres conclusiones salen directamente de la tabla.', 'colegio'),
  ], 0);

  const matematicas = pon([
    Q('icf-ma-datos', 'En cinco partidos, un equipo marcó 2, 0, 3, 1 y 4 goles. La mediana de los goles es', ['2', '1', '2.5', '3'], 'Ordenados quedan 0, 1, 2, 3, 4: el dato del medio es 2.'),
    Q('icf-ma-datos', 'En un diagrama circular sobre cómo viaja un grupo, el sector «bicicleta» mide 90°. ¿Qué parte del grupo viaja en bicicleta?', ['25 %', '9 %', '90 %', '50 %'], 'La circunferencia completa son 360°; 90° es la cuarta parte, el 25 %.'),
    Q('icf-ma-proporcion', 'Cuatro pintores, trabajando al mismo ritmo, pintan una casa en 6 días. ¿Cuántos días tardarían tres pintores?', ['8 días', '4.5 días', '7 días', '9 días'], 'Menos pintores tardan más (proporción inversa): 4 · 6 = 24 días de trabajo; 24 ÷ 3 = 8 días.'),
    Q('icf-ma-proporcion', 'Una receta de arepas para 6 personas lleva 450 g de harina. Para 10 personas se necesitan', ['750 g', '600 g', '900 g', '4 500 g'], 'Son 450 ÷ 6 = 75 g por persona; para 10 personas, 75 · 10 = 750 g.'),
    Q('icf-ma-azar', 'Se lanza un dado normal de seis caras. La probabilidad de que salga un número mayor que 4 es', ['1/3', '1/6', '2/3', '1/2'], 'Solo el 5 y el 6 son mayores que 4: 2 casos de 6, es decir, 1/3.'),
    Q('icf-ma-azar', '¿De cuántas maneras distintas se pueden ordenar 4 libros diferentes en un estante?', ['24', '16', '12', '8'], 'Hay 4 opciones para el primer puesto, 3 para el segundo, 2 para el tercero y 1 para el último: 4 · 3 · 2 · 1 = 24.'),
    Q('icf-ma-azar', 'Se lanzan dos monedas al aire. La probabilidad de obtener al menos una cara es', ['3/4', '1/2', '1/4', '2/3'], 'Los casos son CC, CS, SC y SS. Solo SS no tiene cara: 3 de 4.'),
    Q('icf-ma-medida', 'Una caja mide 30 cm de largo, 20 cm de ancho y 10 cm de alto. ¿Cuántos litros le caben? (1 litro = 1 000 cm³)', ['6 litros', '60 litros', '0.6 litros', '600 litros'], 'Su volumen es 30 · 20 · 10 = 6 000 cm³, que son 6 litros.'),
    Q('icf-ma-medida', 'Un jardín circular tiene 3 m de radio. Con $\\pi \\approx 3.14$, su área es', ['28.26 m²', '18.84 m²', '9.42 m²', '113.04 m²'], 'A = πr² = 3.14 · 9 = 28.26 m². El 18.84 es el perímetro, 2πr.'),
    Q('icf-ma-lineal', 'Una recta pasa por los puntos $(0, 2)$ y $(3, 8)$. Su pendiente es', ['2', '3', '6', '1/2'], 'La pendiente es el cambio en y sobre el cambio en x: (8 − 2) ÷ (3 − 0) = 6 ÷ 3 = 2.'),
    Q('icf-ma-lineal', 'El plan A de telefonía cobra 20 000 pesos fijos más 500 por minuto; el plan B, 35 000 fijos más 200 por minuto. El plan B resulta más barato cuando se hablan', ['más de 50 minutos', 'menos de 50 minutos', 'más de 30 minutos', 'exactamente 50 minutos'], 'Cuestan igual cuando 20 000 + 500m = 35 000 + 200m, es decir, m = 50. Desde ahí el B sube más despacio y queda más barato.'),
    Q('icf-ma-forma', 'Dos ángulos de un triángulo miden 40° y 75°. El tercer ángulo mide', ['65°', '115°', '35°', '55°'], 'Los ángulos internos de un triángulo suman 180°: 180 − 40 − 75 = 65°.'),
    Q('icf-ma-forma', 'Una foto de 10 cm por 15 cm se amplía sin deformarla, de modo que el lado de 10 cm pasa a medir 25 cm. El otro lado mide', ['37.5 cm', '30 cm', '40 cm', '22.5 cm'], 'El factor de ampliación es 25 ÷ 10 = 2.5, así que 15 · 2.5 = 37.5 cm. Sumar 15 cm a cada lado deformaría la foto.'),
    Q('icf-ma-ecuaciones', 'Tres números enteros consecutivos suman 72. El mayor de ellos es', ['25', '24', '23', '26'], 'n + (n + 1) + (n + 2) = 72, entonces 3n + 3 = 72 y n = 23. Los números son 23, 24 y 25.'),
    Q('icf-ma-ecuaciones', 'Una camisa y un pantalón cuestan juntos 150 mil pesos, y el pantalón cuesta el doble que la camisa. El pantalón cuesta', ['100 mil', '75 mil', '50 mil', '120 mil'], 'Si la camisa vale c, el pantalón vale 2c: 3c = 150, c = 50 y el pantalón vale 100 mil.'),
    Q('icf-ma-argumenta', 'Ana afirma que el cuadrado de todo número impar es impar. ¿Cuál razonamiento lo demuestra?', ['Todo impar es 2k + 1 y (2k + 1)² = 2(2k² + 2k) + 1, que es impar', 'Como 3² = 9 y 5² = 25 son impares, la regla vale para todos', 'El cuadrado de un número siempre es mayor que el número', 'Al multiplicar dos números iguales siempre resulta un par'], 'Unos cuantos ejemplos no demuestran una regla general; escribir el impar como 2k + 1 cubre todos los casos a la vez.'),
    Q('icf-ma-argumenta', 'Pedro dice que un descuento del 20 % seguido de otro del 20 % equivale a un descuento del 40 %. Su error es que', ['el segundo descuento se aplica sobre un precio ya rebajado', 'no se pueden hacer dos descuentos al mismo producto', 'el descuento total es en realidad mayor que el 40 %', 'el 20 % de cualquier precio es siempre el mismo valor'], 'Queda 0.8 · 0.8 = 0.64 del precio: el descuento total es del 36 %, no del 40 %.'),
    Q('icf-ma-finanzas', 'Un préstamo de 1 000 000 de pesos cobra 2 % de interés simple mensual. ¿Cuánto se paga de intereses en 6 meses?', ['120 000 pesos', '20 000 pesos', '12 000 pesos', '126 162 pesos'], 'El 2 % de 1 000 000 es 20 000 cada mes; en 6 meses, 6 · 20 000 = 120 000. Con interés compuesto saldría 126 162.'),
    Q('icf-ma-finanzas', 'Un televisor cuesta 1 200 000 pesos de contado o 12 cuotas de 115 000. ¿Cuánto más se paga si se compra a cuotas?', ['180 000 pesos', '115 000 pesos', '85 000 pesos', '1 380 000 pesos'], 'A cuotas se pagan 12 · 115 000 = 1 380 000; la diferencia es 1 380 000 − 1 200 000 = 180 000.'),
    Q('icf-ma-curvas', 'La parábola $y = x^2 - 6x + 5$ corta el eje x en', ['x = 1 y x = 5', 'x = −1 y x = −5', 'x = 2 y x = 3', 'x = 0 y x = 6'], 'x² − 6x + 5 = (x − 1)(x − 5) = 0, entonces x = 1 o x = 5.'),
    Q('icf-ma-curvas', 'Un carro pierde cada año el 20 % de su valor. Si hoy vale 50 millones, dentro de 2 años valdrá', ['32 millones', '30 millones', '40 millones', '36 millones'], 'Cada año conserva el 80 %: 50 · 0.8 · 0.8 = 32 millones. Restar dos veces el 20 % de 50 daría 30, que es un error.'),
    Q('icf-ma-espacio', 'El punto $(3, 1)$ se traslada 4 unidades a la izquierda y 2 unidades hacia arriba. Su nueva posición es', ['(−1, 3)', '(7, 3)', '(−1, −1)', '(5, −3)'], 'Ir a la izquierda resta en x: 3 − 4 = −1. Subir suma en y: 1 + 2 = 3.'),
    Q('icf-ma-dispersion', 'Dos cursos tienen la misma nota promedio, 3.5. La desviación estándar del curso X es 0.2 y la del curso Y es 1.1. Es correcto afirmar que', ['en general, las notas de X están más cerca del promedio que las de Y', 'el curso Y tiene mejores estudiantes que el curso X', 'en X todos los estudiantes sacaron exactamente 3.5', 'en el curso Y hay más estudiantes que en el curso X'], 'Una desviación pequeña indica datos concentrados cerca de la media. No dice nada del tamaño del curso ni de quién es mejor.'),
    Q('icf-ma-numeros', 'En la sucesión 3, 7, 11, 15, … el término número 20 es', ['79', '83', '80', '75'], 'Se suma 4 cada vez: el término 20 es 3 + 19 · 4 = 79.'),
  ], 5);

  const sociales = pon([
    Q('icf-sc-constitucion', 'En Colombia, la entidad que decide si una ley va en contra de la Constitución es', ['la Corte Constitucional', 'la Procuraduría General', 'el Congreso de la República', 'la Registraduría Nacional'], 'La Corte Constitucional guarda la integridad de la Constitución y puede declarar que una ley no vale por contradecirla.'),
    Q('icf-sc-constitucion', 'El derecho de petición le permite a una persona', ['presentar solicitudes a las autoridades y recibir una respuesta', 'elegir directamente a los magistrados de las altas cortes del país', 'dejar de pagar los impuestos que le parezcan injustos', 'exigir que un juez la proteja en pocos días en cualquier caso'], 'Es el derecho a pedir algo respetuosamente a una autoridad y obtener una respuesta pronta y de fondo. La protección rápida de un juez es la tutela.'),
    Q('icf-sc-constitucion', 'Un colegio sanciona a una estudiante sin dejarla explicar lo ocurrido ni presentar pruebas. El derecho que más claramente se vulnera es el', ['debido proceso', 'derecho al trabajo', 'derecho de reunión', 'derecho a la libertad de cultos'], 'El debido proceso exige escuchar a la persona y permitirle defenderse antes de sancionarla.'),
    Q('icf-sc-participacion', 'Un grupo de ciudadanos recoge firmas para presentar al concejo un proyecto de acuerdo sobre el reciclaje. Este mecanismo se llama', ['iniciativa popular normativa', 'revocatoria del mandato', 'acción de tutela', 'plebiscito'], 'La iniciativa popular permite a los ciudadanos presentar proyectos de norma ante el concejo, la asamblea o el Congreso.'),
    Q('icf-sc-participacion', 'En el gobierno escolar, el personero o la personera estudiantil tiene como función principal', ['promover los derechos y deberes de los estudiantes', 'calificar a los docentes y directivos al final de cada año escolar', 'administrar el dinero de la cafetería escolar', 'decidir qué materias se dictan cada año'], 'El personero promueve el ejercicio de los derechos y deberes de los estudiantes y recibe sus quejas.'),
    Q('icf-sc-participacion', 'En una consulta popular, la ciudadanía', ['responde sí o no a una pregunta de interés general', 'elige a los concejales y diputados de su región', 'demanda ante los jueces una ley que considera injusta', 'revisa las cuentas de los contratos del municipio'], 'La consulta popular somete a la decisión del pueblo una pregunta de carácter general que formula el gobernante.'),
    Q('icf-sc-perspectivas', 'Una empresa quiere construir una represa en un río. ¿Cuál preocupación es más probable que tengan los campesinos que viven río abajo?', ['Que baje el caudal y les falte agua para sus cultivos', 'Que la represa no produzca energía suficiente para vender', 'Que la empresa no encuentre inversionistas para la obra', 'Que suba el precio de la energía en la capital del país'], 'Quienes dependen del agua río abajo se preocupan por el caudal que les llega, no por las ganancias de la obra.'),
    Q('icf-sc-perspectivas', 'Un colegio propone un uniforme único. Un padre dice que así ahorra dinero; un estudiante, que limita su forma de expresarse. Estas posiciones', ['parten de valores distintos: lo económico y la identidad', 'demuestran que el padre de familia es quien tiene la razón', 'coinciden en que el uniforme único es una mala idea', 'se refieren a temas que no tienen relación entre sí'], 'Las dos opiniones tratan la misma propuesta, pero cada una da prioridad a un valor diferente.'),
    Q('icf-sc-fuentes', '¿Cuál de estas es una fuente primaria para estudiar la Campaña Libertadora de 1819?', ['Una carta escrita por un soldado que participó en ella', 'Un libro de historia publicado en el año 2000', 'Una película reciente sobre la vida de Bolívar', 'Un resumen hecho por un estudiante para presentar en su clase de historia'], 'Una fuente primaria la produce alguien que vivió los hechos, en su época.'),
    Q('icf-sc-fuentes', '«La ciudad es muy insegura: a mi vecino le robaron el celular la semana pasada». La principal debilidad de este argumento es que', ['saca una conclusión general a partir de un solo caso', 'usa un ejemplo que ocurrió hace muy poco tiempo', 'menciona a una persona que el autor conoce bien desde hace años', 'habla de un objeto que tiene mucho valor'], 'Un caso aislado no basta para hablar de toda la ciudad: harían falta datos más amplios.'),
    Q('icf-sc-sistemico', 'Si sube mucho el precio del combustible, ¿qué efecto en cadena es más probable?', ['Sube el costo del transporte y con él el de los alimentos', 'Bajan los pasajes del transporte público en todas las ciudades del país', 'Aumenta el número de carros particulares en las calles', 'Los alimentos se vuelven más baratos en los mercados'], 'Los alimentos viajan en camiones: si el combustible sube, el costo de llevarlos se traslada al precio.'),
    Q('icf-sc-sistemico', 'Para acabar con los trancones, una ciudad amplió sus avenidas, pero años después los trancones eran iguales. Una explicación posible es que', ['las vías nuevas animaron a más personas a usar el carro', 'las avenidas anchas son más difíciles de cruzar para quienes van a pie', 'los semáforos se dañaron durante la construcción', 'el clima de la ciudad cambió durante esos años'], 'Más espacio para los carros hace más cómodo usarlos, y el tráfico crece hasta volver a llenar las vías.'),
    Q('icf-sc-historia', 'La Constitución de 1991 reemplazó a la Constitución de', ['1886', '1863', '1821', '1957'], 'La Constitución de 1886, de la Regeneración, rigió hasta que la Asamblea Constituyente expidió la de 1991.'),
    Q('icf-sc-historia', 'El 9 de abril de 1948 ocurrió en Bogotá el llamado «Bogotazo», que fue', ['una ola de disturbios tras el asesinato de Jorge Eliécer Gaitán', 'la firma de un acuerdo de paz entre los partidos liberal y conservador', 'la inauguración del primer ferrocarril que tuvo el país', 'el primer día en que las mujeres votaron en Colombia'], 'El asesinato del líder liberal Gaitán desató disturbios en Bogotá y agravó la violencia entre los partidos.'),
    Q('icf-sc-historia', 'La Regeneración, liderada por Rafael Núñez a finales del siglo XIX, buscó', ['centralizar el poder y dar un papel fuerte a la Iglesia', 'crear un país federal con estados casi independientes', 'separar a Panamá de Colombia de manera pacífica', 'repartir las tierras de las grandes haciendas entre los campesinos'], 'Con la Constitución de 1886, la Regeneración acabó con el federalismo de Rionegro y se alió con la Iglesia católica.'),
    Q('icf-sc-mundo', 'La Revolución Industrial comenzó en el siglo XVIII en', ['Gran Bretaña', 'Estados Unidos', 'Japón', 'Rusia'], 'Gran Bretaña tuvo primero las máquinas de vapor, el carbón y las fábricas textiles con que empezó.'),
    Q('icf-sc-mundo', 'Al terminar la Segunda Guerra Mundial se creó la Organización de las Naciones Unidas (ONU) con el propósito principal de', ['mantener la paz y la seguridad entre las naciones', 'unir a todos los países del mundo bajo un solo gobierno', 'administrar las colonias de los países vencidos', 'organizar torneos deportivos entre los países'], 'La Carta de la ONU, de 1945, pone como primer propósito mantener la paz y la seguridad internacionales.'),
    Q('icf-sc-mundo', 'La caída del muro de Berlín, en 1989, simboliza', ['el fin de la división de Europa en dos bloques', 'el comienzo de la Primera Guerra Mundial', 'la independencia de las colonias africanas', 'la creación del primer parlamento alemán'], 'El muro separaba la parte de Berlín del bloque soviético de la del bloque occidental; su caída anunció el fin de la Guerra Fría.'),
    Q('icf-sc-geografia', 'La tala de la selva amazónica puede reducir las lluvias en regiones lejanas porque', ['los árboles devuelven al aire humedad que luego llueve', 'los troncos cortados tapan los ríos de esas regiones', 'sin árboles el Sol calienta menos la superficie', 'la madera se lleva en camiones hasta esas regiones'], 'La selva transpira enormes cantidades de agua; ese vapor viaja con el viento y cae como lluvia en otras zonas.'),
    Q('icf-sc-geografia', 'Colombia es el único país de Suramérica con costas en', ['el océano Pacífico y el mar Caribe', 'el océano Índico y el océano Pacífico', 'el mar Mediterráneo y el mar Caribe', 'el océano Atlántico sur y el Ártico'], 'Colombia tiene costa en el Pacífico y en el Caribe, que hace parte del océano Atlántico.'),
    Q('icf-sc-economia', 'En economía, se llama inflación a', ['la subida general y sostenida de los precios', 'la disminución del número de desempleados', 'la deuda que un país tiene con otro país', 'el impuesto que pagan los productos importados'], 'Inflación es la subida generalizada y continua de los precios, que le hace perder poder de compra al dinero.'),
    Q('icf-sc-economia', 'Si el peso colombiano pierde valor frente al dólar, lo más probable es que', ['los productos importados se vuelvan más caros', 'los viajes al exterior se vuelvan más baratos', 'los exportadores reciban menos pesos por venta', 'bajen los precios de los computadores importados'], 'Con un dólar más caro se necesitan más pesos para comprar lo que viene de afuera; los exportadores, en cambio, reciben más pesos.'),
    Q('icf-sc-modelos', 'Un modelo económico en el que el Estado es dueño de las empresas y fija los precios se llama', ['economía planificada', 'economía de libre mercado', 'economía de subsistencia', 'economía mixta de mercado'], 'En la economía planificada el Estado decide qué se produce y a qué precio; en el libre mercado lo deciden la oferta y la demanda.'),
    Q('icf-sc-modelos', 'Un municipio con poco presupuesto debe escoger entre un estadio nuevo y un acueducto para veredas sin agua potable. Un criterio basado en los derechos fundamentales llevaría a escoger', ['el acueducto, porque el agua potable protege la salud y la vida', 'el estadio, porque atraerá muchos más turistas y visitantes al municipio', 'el estadio, porque el deporte también es un derecho de la comunidad', 'ninguno de los dos, para guardar el dinero del año'], 'El acceso al agua potable afecta la salud y la vida; un criterio de derechos lo pone por delante del entretenimiento.'),
  ], 10);

  const ciencias = pon([
    Q('icf-cn-indaga', 'Para saber si un abono aumenta la cosecha de maíz, se siembran dos parcelas iguales y solo a una se le pone abono. La variable independiente es', ['el uso o no del abono', 'la cantidad de maíz cosechado', 'el tamaño de las parcelas', 'el tipo de semilla de maíz'], 'La variable independiente es la que el investigador cambia a propósito; la cosecha es la que se mide (dependiente).'),
    Q('icf-cn-indaga', 'Un resorte se estira 2 cm con 100 g, 4 cm con 200 g y 6 cm con 300 g. Si el patrón se mantiene, con 250 g se estirará', ['5 cm', '4.5 cm', '6 cm', '2.5 cm'], 'Se estira 2 cm por cada 100 g, es decir, 0.02 cm por gramo: 250 · 0.02 = 5 cm.'),
    Q('icf-cn-celula', 'La función principal de los cloroplastos en una célula vegetal es', ['hacer la fotosíntesis', 'almacenar el ADN', 'fabricar proteínas', 'eliminar los desechos'], 'Los cloroplastos tienen clorofila y transforman la energía de la luz en glucosa.'),
    Q('icf-cn-celula', 'Los glóbulos rojos de la sangre transportan sobre todo', ['oxígeno, unido a la hemoglobina', 'anticuerpos contra las bacterias', 'azúcares de reserva para el hígado', 'hormonas del crecimiento'], 'La hemoglobina de los glóbulos rojos se une al oxígeno en los pulmones y lo lleva a los tejidos.'),
    Q('icf-cn-celula', 'Al terminar la mitosis, una célula ha producido', ['dos células con la misma información genética que ella', 'cuatro células, cada una con la mitad de los cromosomas', 'una sola célula con el doble de cromosomas', 'dos células con información genética distinta'], 'La mitosis reparte copias idénticas del ADN. La meiosis es la que produce cuatro células con la mitad de los cromosomas.'),
    Q('icf-cn-movimiento', 'Un carro pasa de 0 a 20 m/s en 5 segundos. Su aceleración media es', ['4 m/s²', '100 m/s²', '25 m/s²', '15 m/s²'], 'a = cambio de velocidad ÷ tiempo = 20 ÷ 5 = 4 m/s².'),
    Q('icf-cn-movimiento', 'Una persona empuja una pared con una fuerza de 50 N y la pared no se mueve. La pared ejerce sobre la persona una fuerza', ['de 50 N en sentido contrario', 'nula, porque la pared no se mueve', 'de 100 N en el mismo sentido', 'menor que 50 N hacia la pared'], 'Por la tercera ley de Newton, las fuerzas de acción y reacción son iguales y opuestas, aunque nada se mueva.'),
    Q('icf-cn-materia', 'Para recuperar la sal disuelta en un vaso de agua, el método más adecuado es', ['la evaporación', 'la filtración', 'la decantación', 'la imantación'], 'La sal disuelta atraviesa cualquier filtro; al evaporar el agua, la sal queda en el recipiente.'),
    Q('icf-cn-materia', '¿Cuál de estos es un cambio químico?', ['Un clavo que se oxida con la humedad', 'Un cubo de hielo que se derrite', 'Una hoja de papel que se rasga', 'El azúcar que se disuelve en el café'], 'En la oxidación se forma una sustancia nueva, el óxido de hierro; en los demás casos la sustancia sigue siendo la misma.'),
    Q('icf-cn-ecosistemas', 'En una cadena alimentaria, la energía disponible disminuye de un nivel al siguiente porque', ['gran parte se gasta en vivir y se pierde como calor', 'los consumidores comen menos de lo que necesitan', 'las plantas guardan toda su energía para ellas', 'la energía se convierte en materia que no se usa'], 'Cada organismo usa la mayor parte de la energía en moverse, respirar y mantenerse; solo una fracción pasa al siguiente nivel.'),
    Q('icf-cn-ecosistemas', 'Las abejas toman néctar de las flores y, al hacerlo, transportan su polen. Esta relación es un ejemplo de', ['mutualismo', 'parasitismo', 'depredación', 'competencia'], 'Las dos especies se benefician: la abeja se alimenta y la flor queda polinizada.'),
    Q('icf-cn-energia', 'Un bombillo de 60 W permanece encendido 10 horas. La energía que consume es', ['0.6 kWh', '6 kWh', '60 kWh', '600 kWh'], 'E = P · t = 60 W · 10 h = 600 Wh, que son 0.6 kWh.'),
    Q('icf-cn-energia', 'Se sirve café caliente en una taza fría. ¿Qué ocurre con el calor?', ['Pasa del café a la taza hasta que igualan su temperatura', 'Pasa de la taza al café, porque la taza es la que está más fría', 'No pasa calor, porque la taza es de cerámica', 'El frío de la taza pasa al café y lo enfría'], 'El calor fluye del cuerpo más caliente al más frío hasta el equilibrio térmico; el «frío» no es algo que se transmita.'),
    Q('icf-cn-atomo', 'Dos isótopos de un mismo elemento se diferencian en su número de', ['neutrones', 'protones', 'electrones del átomo neutro', 'capas de electrones'], 'Los isótopos tienen los mismos protones, por eso son el mismo elemento, y distinto número de neutrones.'),
    Q('icf-cn-atomo', 'En una molécula de agua ($H_2O$), los átomos de hidrógeno y oxígeno se unen mediante enlaces', ['covalentes, porque comparten electrones', 'iónicos, porque se ceden electrones', 'metálicos, porque forman una red de iones', 'de hidrógeno, dentro de la misma molécula'], 'El hidrógeno y el oxígeno son no metales y comparten pares de electrones: enlace covalente. Los puentes de hidrógeno unen moléculas distintas.'),
    Q('icf-cn-herencia', 'El daltonismo es recesivo y su gen está en el cromosoma X. Una mujer portadora y un hombre de visión normal tienen un hijo varón. La probabilidad de que sea daltónico es', ['1/2', '1/4', '0', '1'], 'El hijo recibe el Y del padre y uno de los dos X de la madre; la mitad de las veces recibe el X con el gen.'),
    Q('icf-cn-herencia', 'Las mutaciones son importantes para la evolución porque', ['producen la variación sobre la que actúa la selección', 'siempre hacen más fuertes a los organismos', 'aparecen solo cuando el organismo las necesita para sobrevivir', 'impiden que las especies cambien con el tiempo'], 'Las mutaciones ocurren al azar; algunas dan ventaja y la selección natural hace que esas se vuelvan más comunes.'),
    Q('icf-cn-reacciones', 'En la combustión del metano, $CH_4 + 2O_2 \\to CO_2 + 2H_2O$. ¿Cuántas moléculas de oxígeno se necesitan para quemar 3 moléculas de metano?', ['6', '2', '3', '5'], 'Por cada molécula de metano se necesitan 2 de oxígeno: 3 · 2 = 6.'),
    Q('icf-cn-reacciones', 'Al mezclar vinagre con bicarbonato de sodio aparecen burbujas. Esto indica que', ['se forma un gas nuevo, el dióxido de carbono', 'el vinagre empieza a hervir por el calor', 'el bicarbonato se disuelve sin reaccionar', 'el aire del vaso se mezcla con el vinagre'], 'El ácido del vinagre reacciona con el bicarbonato y produce CO₂, que escapa en burbujas: es una reacción química.'),
    Q('icf-cn-ondas', 'El sonido no se propaga en el vacío porque', ['necesita un medio material que vibre', 'viaja más rápido que la luz', 'solo viaja por el aire caliente', 'se convierte en luz al salir de la atmósfera'], 'El sonido es una onda mecánica: sin partículas que vibren no hay cómo transmitirlo.'),
    Q('icf-cn-ondas', 'Un lápiz metido en un vaso con agua parece quebrado. Este efecto se debe a la', ['refracción de la luz al pasar del agua al aire', 'reflexión de la luz en el borde del vaso', 'absorción de la luz por parte del agua', 'difracción del sonido dentro del vaso'], 'La luz cambia de rapidez y de dirección al pasar de un medio a otro: eso es la refracción.'),
    Q('icf-cn-gases', 'Un globo inflado se mete en el congelador y, después de un rato, se ve más pequeño. A presión constante, esto ocurre porque', ['al bajar la temperatura, baja el volumen del gas', 'el aire se escapa del globo a causa del frío', 'el frío aumenta la cantidad de gas en el globo', 'el caucho del globo se vuelve más grueso'], 'A presión constante, el volumen de un gas es proporcional a su temperatura absoluta (ley de Charles).'),
    Q('icf-cn-electrico', 'Dos resistencias de 6 Ω se conectan en serie a una batería de 12 V. La corriente que circula es', ['1 A', '2 A', '4 A', '0.5 A'], 'En serie las resistencias se suman: 12 Ω. Por la ley de Ohm, I = V ÷ R = 12 ÷ 12 = 1 A.'),
    Q('icf-cn-cts', 'Una ciudad quiere cambiar sus buses diésel por buses eléctricos para reducir la contaminación del aire. ¿Qué pregunta es más importante responder para evaluar el beneficio ambiental total?', ['¿De qué fuentes sale la electricidad con que se cargarán?', '¿Cuántos pasajeros caben sentados en cada bus nuevo?', '¿Cuánto cuesta hoy el pasaje en los buses diésel que circulan?', '¿Qué rutas tienen más pasajeros por la mañana?'], 'Si la electricidad sale de quemar carbón, parte de la contaminación solo cambia de lugar: hay que mirar todo el ciclo.'),
  ], 15);

  const ingles = pon([
    Q('icf-en-avisos', 'Where can you see this sign? "Please return your tray after eating."', ['In a cafeteria', 'In a hospital room', 'In a bus station', 'In a clothes shop'], '«Tray» es la bandeja en la que se lleva la comida: el aviso está en una cafetería.'),
    Q('icf-en-avisos', 'What does this sign mean? "Caution: wet floor."', ['Walk carefully because you can slip.', 'Please clean the floor right now.', 'Never walk on this floor again.', 'The floor is new and very expensive.'], '«Caution» pide cuidado y «wet floor» es piso mojado: hay que caminar con cuidado.'),
    Q('icf-en-avisos', 'A sign says: "Lift out of order. Please use the stairs." This means that', ['the lift is not working', 'the stairs are closed today', 'the lift is only for workers', 'you must wait in line for it'], '«Out of order» significa dañado, que no funciona; por eso piden usar las escaleras.'),
    Q('icf-en-avisos', 'A sign at a swimming pool says: "Children under 12 must be with an adult." Which sentence is true?', ['A 10-year-old girl cannot swim there alone.', 'Adults cannot swim in this pool at all.', 'Only children can use this swimming pool.', 'A 15-year-old boy needs to come with his parents.'], '«Under 12» son los menores de 12 años: una niña de 10 necesita estar con un adulto.'),
    Q('icf-en-vocabulario', 'A person who repairs cars is a', ['mechanic', 'lawyer', 'waiter', 'dentist'], '«Mechanic» es mecánico; los otros son abogado, mesero y dentista.'),
    Q('icf-en-vocabulario', 'You wear this on your wrist to know the time. It is a', ['watch', 'ring', 'scarf', 'belt'], '«Watch» es el reloj de pulsera; ring, scarf y belt son anillo, bufanda y cinturón.'),
    Q('icf-en-vocabulario', 'You go to this place to buy medicine. It is a', ['pharmacy', 'bakery', 'stadium', 'museum'], '«Pharmacy» es la farmacia o droguería.'),
    Q('icf-en-dialogos', 'Complete the conversation. "What time does the bus leave?" —', ['At half past seven.', 'For two hours.', 'It\'s a red bus.', 'Yes, it leaves.'], '«What time» pregunta la hora: «at half past seven», a las siete y media.'),
    Q('icf-en-dialogos', 'Complete the conversation. "Could you pass me the salt, please?" —', ['Here you are.', 'I\'m not hungry.', 'I could yesterday.', 'It\'s too salty.'], '«Here you are» se dice al entregar algo que alguien pide.'),
    Q('icf-en-dialogos', 'Complete the conversation. "I passed my driving test!" —', ['Congratulations! You must be happy.', 'Don\'t worry, you can try again.', 'I\'m sorry to hear that.', 'Yes, the test is next Monday at nine.'], 'Ante una buena noticia se felicita; «I\'m sorry to hear that» y «try again» responden a una mala.'),
    Q('icf-en-dialogos', 'Complete the conversation. "Do you mind if I open the window?" —', ['Not at all. It\'s really hot.', 'Yes, it is a very big window.', 'I don\'t have any windows.', 'No, I mind it very much.'], '«Do you mind…?» pregunta si molesta; «not at all» quiere decir que no molesta, que puede abrirla.'),
    Q('icf-en-gramatica', 'Choose the word for gap (1).', ['went', 'go', 'goes', 'going'], '«Last December» pide pasado simple: «went».', 'playa'),
    Q('icf-en-gramatica', 'Choose the word for gap (2).', ['had', 'has', 'have', 'having'], 'Antes de ese viaje él no había visto el mar: pasado perfecto, «had never seen».', 'playa'),
    Q('icf-en-gramatica', 'Choose the word for gap (3).', ['longer', 'long', 'longest', 'more long'], 'Se compara con «than»: comparativo de un adjetivo corto, «longer».', 'playa'),
    Q('icf-en-gramatica', 'Choose the word for gap (4).', ['so', 'such', 'too', 'very'], '«So + adjetivo + that» expresa una consecuencia: tan hermosa que lloró.', 'playa'),
    Q('icf-en-corto', 'Why can\'t Daniel go to class tomorrow?', ['He has to help his family move.', 'He is sick in bed at home.', 'He has not finished his homework.', 'He has an exam at another school.'], 'Dice que su familia se muda y que sus papás necesitan su ayuda con las cajas.', 'nota'),
    Q('icf-en-corto', 'What will Daniel do tonight?', ['Send his history homework by email.', 'Read the pages for Friday\'s class.', 'Visit Ms. Parker at the school early.', 'Buy boxes for the new apartment.'], '«I will send it to you by email tonight»: esa noche enviará la tarea de historia.', 'nota'),
    Q('icf-en-corto', 'What does Daniel ask Ms. Parker for?', ['The pages to read for Friday.', 'More time for the homework.', 'Help with the moving boxes.', 'A new date for the exam.'], 'Pregunta qué páginas hay que leer para el viernes.', 'nota'),
    Q('icf-en-inferencia', 'From the email, we can say that Daniel', ['cares about not falling behind', 'does not like his history class', 'wants to change to a new school', 'is angry with his parents'], 'Ya hizo la tarea y pregunta qué leer para no perderse nada antes del examen: le importa estar al día.', 'nota'),
    Q('icf-en-largo', 'What is the text mainly about?', ['A girl who started a radio program for her village', 'A storm that destroyed a bridge over a river', 'How farmers protect their coffee from pests', 'The history of the radio stations in the big cities'], 'Todo el texto cuenta cómo Camila creó un programa de radio que unió a su pueblo.', 'radio'),
    Q('icf-en-largo', 'Why did Camila decide to start the program?', ['News arrived late and sometimes wrong.', 'Her uncle asked her to work at a radio.', 'The school library needed more visitors.', 'She wanted to become famous in the city.'], 'El párrafo 1 cuenta que las noticias llegaban despacio y a veces mal, como pasó con el puente.', 'radio'),
    Q('icf-en-largo', 'At the beginning, the program talked about', ['the weather, market prices and vaccinations', 'old stories told by the grandmothers', 'messages from the mayor\'s office', 'the courses that Camila takes at the university'], 'Lo dice el párrafo 2; las historias y los mensajes de la alcaldía llegaron después.', 'radio'),
    Q('icf-en-vocabulario', 'In paragraph 3, the expression "little by little" means', ['slowly, over time', 'very fast', 'only once', 'never again'], '«Little by little» es poco a poco: la gente empezó a llamar con el tiempo.', 'radio'),
    Q('icf-en-inferencia', 'What does Camila mean when she says the radio "made the people closer"?', ['People got to know and help each other more.', 'The village moved nearer to the big city.', 'People sat close to the radio to hear it.', 'The radio paid for a new bridge in the village.'], 'No habla de distancia física: la radio unió a la gente, que compartió saberes e historias.', 'radio'),
  ], 20);

  return { id: 'icf-sim-2', titulo: 'Simulacro 2', textos, pruebas: { lectura, matematicas, sociales, ciencias, ingles } };
})());
;
//#archivo js/simulacro-icf-3.js
// Preicfes · Simulacro 3 (spec 2026-11-26-simulacros-preicfes): cinco pruebas de 24 preguntas A–D escritas para Zuka.
// Cada pregunta se escribe con la opción correcta primero; `pon` la cambia de puesto según un patrón con seis claves por letra.
PI_SIMULACROS.push((() => {
  const T = simT, Q = (m, q, o, e, d) => simP(m, q, o, 0, e, d);
  const BASE = [2, 0, 3, 1, 3, 0, 1, 2, 0, 3, 2, 1, 0, 2, 1, 3, 1, 0, 2, 3, 0, 1, 3, 2];
  const pon = (L, giro) => L.map((it, i) => {
    const k = BASE[(i + giro) % BASE.length], o = [...it.o];
    [o[0], o[k]] = [o[k], o[0]];
    return { ...it, o, r: k };
  });

  const textos = {
    afinador: T('El afinador', [
      'Cada marzo, cuando empezaban las lluvias, don Esteban llegaba al colegio con su maletín de cuero y pedía que lo dejaran solo en el salón de música. Afinaba el piano viejo durante toda la mañana: golpeaba una tecla, escuchaba, giraba una clavija apenas un poco y volvía a golpear. Los estudiantes que pasaban por el pasillo solo oían la misma nota repetida, una y otra vez, como una gota que no termina de caer.',
      'Un año, la rectora le preguntó si no sería mejor cambiar ese piano por un teclado eléctrico, que nunca se desafina. Don Esteban se quedó callado un momento y luego le pidió que se sentara.',
      '—Toque cualquier cosa —le dijo.',
      'La rectora tocó las primeras notas de una canción infantil. El piano sonó grave y un poco ronco, como una voz que ha hablado mucho.',
      '—Este piano tiene setenta años —explicó él—. La madera se hincha con la humedad y se encoge con el sol. Por eso se desafina. Pero también por eso suena así: está vivo. Un teclado eléctrico no se equivoca nunca, y por eso mismo nunca le va a contar nada.',
      'La rectora no cambió el piano. Ese año, por primera vez, pidió que abrieran la puerta del salón mientras don Esteban trabajaba, y algunos estudiantes se quedaron en el pasillo, escuchando cómo una sola nota, después de muchos intentos, encontraba por fin su lugar.',
    ]),
    esquina: T('La comida de la calle también es patrimonio', [
      'En casi todas nuestras ciudades hay una esquina donde alguien vende arepas, empanadas, mazorcas o salpicón desde muy temprano. Esos puestos alimentan a miles de personas que no tienen tiempo ni dinero para sentarse en un restaurante. Sin embargo, muchas alcaldías los tratan solo como un problema de espacio público que hay que despejar.',
      'Creo que es un error. La comida callejera es una parte viva de nuestra cultura. Las recetas que se venden en esas esquinas se han pasado de generación en generación, y en ellas se reconoce de dónde venimos: el maíz, la panela, las frutas de cada región. Un turista que quiere conocer una ciudad no busca los restaurantes de cadena que encuentra en cualquier lugar del mundo; busca lo que solo se come allí.',
      'No niego que existan problemas. Algunos puestos bloquean los andenes y otros no cumplen normas mínimas de higiene. Pero la solución no es sacarlos, sino organizarlos: zonas señaladas, capacitación en manipulación de alimentos y un registro sencillo que no les cueste más de lo que ganan.',
      'Hay ciudades que ya lo hicieron. Allí, los vendedores pagan un permiso bajo, reciben un carrito con agua limpia y aparecen en los mapas turísticos de la ciudad. El espacio público quedó más ordenado y los vendedores, en lugar de esconderse, empezaron a cuidar la calle como algo propio.',
      'Despejar una esquina es fácil. Lo difícil, y lo valioso, es reconocer que en ella también se cocina la historia de una ciudad.',
    ]),
    maquina: T('La máquina de las experiencias', [
      'Un filósofo propuso un experimento mental. Imagina que existe una máquina capaz de darte cualquier experiencia que desees: escribir una gran novela, ganar un campeonato, tener muchos amigos que te admiran. Mientras estás conectado, flotas en un tanque con electrodos en el cerebro, pero no lo sabes: todo te parece real. Antes de conectarte eliges la vida que quieres vivir, y nunca más sientes dolor ni aburrimiento. ¿Te conectarías para siempre?',
      'Si lo único que importara en la vida fuera sentirse bien, la respuesta sería obvia: sí. Sin embargo, la mayoría de las personas a quienes se les plantea la pregunta dice que no. ¿Por qué?',
      'Una explicación es que no solo queremos tener la experiencia de hacer algo, sino hacerlo de verdad. No queremos sentir que escribimos una novela; queremos haberla escrito. Otra explicación es que queremos ser cierto tipo de persona —valiente, generosa, honesta—, y quien flota en un tanque no es nada de eso: solo cree serlo. Una tercera razón es que queremos tener contacto con una realidad que no hemos inventado nosotros mismos.',
      'Los defensores de que el placer es el único bien responden que esas razones son prejuicios: si dentro del tanque no notaríamos la diferencia, ¿qué nos importa?',
      'El experimento no resuelve la discusión, pero hace visible algo: cuando pensamos en una buena vida, casi nunca pensamos solo en cómo nos sentimos.',
    ]),
    residuos: T('¿Qué botamos en el colegio?', [
      'Durante una semana, el grupo ecológico de un colegio pesó todos los residuos que salieron de las canecas. En total se recogieron 250 kilogramos, sin contar los de la cafetería, que tiene su propio contrato de recolección. La tabla muestra cómo se repartieron.',
      'Lo primero que llamó la atención fue que casi la mitad de lo que se bota es orgánico: cáscaras de fruta, restos de almuerzo y hojas del patio. Ese material, que hoy termina en el relleno sanitario, podría convertirse en abono para la huerta del colegio.',
      'El grupo también encontró que la mayor parte del papel y el cartón llega mezclada con restos de comida y ya no se puede reciclar. Por eso propone poner canecas de tres colores en cada piso y hacer una campaña de un mes para enseñar a separar.',
      'El coordinador de servicios generales advirtió que las canecas de colores no sirven de nada si al final el camión de la basura mezcla todo. Antes de comprarlas, dijo, hay que conseguir que una asociación de recicladores del barrio recoja el material separado.',
      'El grupo presentará los resultados en la próxima reunión de padres de familia y volverá a pesar los residuos dentro de seis meses para comparar.',
    ], [['Tipo de residuo', 'Kilogramos en la semana'], ['Orgánicos', '115'], ['Papel y cartón', '55'], ['Plástico', '45'], ['Icopor y empaques', '20'], ['Vidrio y metal', '15'], ['Total', '250']]),
    max: T('Our dog Max', [
      'Our dog, Max, __(1)__ with us for six years. Every morning my sister __(2)__ him to the park before school. Max is __(3)__ dog in the neighborhood, but he is afraid of cats! Yesterday he __(4)__ under the bed when he saw one in the garden.',
    ]),
    paseo: T('School trip', [
      'SCHOOL TRIP TO THE SCIENCE MUSEUM. Date: Friday, May 12. The bus leaves at 7:30 a.m. from the main gate, so please arrive fifteen minutes early. Bring a packed lunch and a bottle of water; there is no cafeteria at the museum. Students must return the permission form signed by their parents before Wednesday. The trip costs 15 dollars. Questions? Talk to Mr. Rivera in room 204.',
    ]),
    astro: T('The boy who watched the sky', [
      'Tomás grew up in a small town in the mountains, where the nights are very dark. When he was twelve, his grandfather gave him an old pair of binoculars, and Tomás started to look at the sky every night. He made drawings of the Moon and wrote down the position of the brightest planets in a notebook.',
      'At school, nobody shared his interest. His classmates thought astronomy was boring, and his town had no library with science books. So Tomás used the internet at the town hall to read about stars and to write messages to an astronomy club in the capital.',
      'One night in July, he noticed a small bright point that was not in any of his maps. He took notes for five nights and sent them to the club. The members checked his observations: it was a comet that professional astronomers had discovered only a few days before. Tomás had not discovered it first, but his notes were so careful that the club invited him to give a talk.',
      'Today Tomás studies physics at university. "I did not have a telescope," he says, "but I had patience. In science, that is half of the equipment."',
    ]),
  };

  const lectura = pon([
    Q('icf-lc-literal', 'Según el texto, don Esteban iba al colegio cada año', ['cuando empezaban las lluvias de marzo', 'al terminar las clases de diciembre', 'cuando la rectora lo llamaba por teléfono', 'el día del concierto de fin de año'], 'La primera frase dice: «Cada marzo, cuando empezaban las lluvias».', 'afinador'),
    Q('icf-lc-literario', 'La comparación «como una gota que no termina de caer» (párrafo 1) sugiere', ['la paciencia y la lentitud del trabajo de afinar', 'que el techo del salón de música tenía goteras', 'que el piano estaba dañado y ya no tenía arreglo', 'el miedo que los estudiantes le tenían al afinador'], 'La nota repetida una y otra vez, como una gota que tarda, muestra un trabajo lento y paciente.', 'afinador'),
    Q('icf-lc-literal', 'La rectora propuso cambiar el piano porque', ['un teclado eléctrico nunca se desafina', 'el piano ocupaba mucho espacio en el salón', 'don Esteban cobraba demasiado por afinarlo', 'los estudiantes ya no querían aprender piano'], 'Lo dice el párrafo 2: el teclado eléctrico «nunca se desafina».', 'afinador'),
    Q('icf-lc-literario', 'Cuando don Esteban dice que el piano «está vivo», quiere decir que', ['cambia con el clima y por eso tiene un sonido propio', 'tiene un mecanismo que funciona solo, sin ayuda', 'fue fabricado con árboles que todavía crecen', 'los estudiantes lo cuidan como a una mascota'], 'La madera se hincha y se encoge: por eso se desafina, pero también por eso suena como suena.', 'afinador'),
    Q('icf-lc-estructura', '¿Qué función cumple el último párrafo del cuento?', ['Muestra que la rectora cambió su manera de ver el piano', 'Explica paso a paso cómo se fabrica un piano de madera', 'Presenta un conflicto nuevo entre los estudiantes', 'Describe el viaje de regreso de don Esteban a su casa'], 'La rectora no cambia el piano y además abre la puerta para que otros escuchen: ahora valora lo que antes quería reemplazar.', 'afinador'),
    Q('icf-lc-evalua', '¿Cuál de estas ideas defiende don Esteban?', ['Lo imperfecto puede tener un valor que lo perfecto no tiene', 'Los instrumentos modernos son siempre mejores que los viejos', 'La música solo debe tocarse en salones con la puerta cerrada', 'Los colegios deben gastar menos dinero en clases de música'], 'Dice que el teclado «no se equivoca nunca» y por eso «nunca le va a contar nada»: valora lo que cambia y se desafina.', 'afinador'),

    Q('icf-lc-argumento', 'La tesis del autor es que la comida callejera', ['debe organizarse y reconocerse como parte de la cultura', 'debe desaparecer de las calles para liberar los andenes', 'es menos atractiva para los turistas que la de cadena', 'debe venderse solo dentro de restaurantes con permiso'], 'Dice que tratarla solo como problema es un error y propone organizarla, porque es «una parte viva de nuestra cultura».', 'esquina'),
    Q('icf-lc-estructura', 'En el párrafo 3, el autor', ['admite algunos problemas y propone organizar los puestos', 'cuenta la historia de un vendedor de arepas de su barrio', 'reconoce que su propuesta no tiene cómo funcionar en la práctica', 'describe las recetas más antiguas que se venden en el país'], '«No niego que existan problemas» anuncia una concesión; enseguida propone organizar en vez de sacar.', 'esquina'),
    Q('icf-lc-argumento', '¿Qué argumento usa el autor en el párrafo 2?', ['Las recetas callejeras guardan la memoria de una región', 'La comida callejera es más barata que la del supermercado', 'Los vendedores callejeros pagan muchos impuestos al año', 'La comida de la calle es más saludable que la de restaurante'], 'Dice que las recetas se pasan de generación en generación y que en ellas «se reconoce de dónde venimos».', 'esquina'),
    Q('icf-lc-literal', 'Según el párrafo 4, en las ciudades que organizaron los puestos', ['los vendedores empezaron a cuidar la calle como algo propio', 'los turistas dejaron de visitar los puestos de las esquinas', 'los permisos se volvieron demasiado costosos para vender', 'se prohibió vender comida en las esquinas del centro'], 'El texto dice que los vendedores, «en lugar de esconderse, empezaron a cuidar la calle como algo propio».', 'esquina'),
    Q('icf-lc-evalua', '¿Cuál dato, de ser cierto, debilitaría más el argumento del párrafo 4?', ['Que en esas ciudades el desorden volvió a los pocos meses', 'Que en esas ciudades también hay restaurantes de cadena', 'Que en esas ciudades los permisos se cobran cada año', 'Que a algunos turistas no les gustan las empanadas'], 'El párrafo 4 usa esas ciudades como prueba de que organizar funciona; si el desorden volvió, la prueba se cae.', 'esquina'),
    Q('icf-lc-comparar', 'Un funcionario afirma: «Los andenes son de los peatones, no de los negocios». ¿Qué parte del texto responde mejor a esa preocupación?', ['La propuesta de zonas señaladas para los vendedores', 'La lista de comidas que se venden en las esquinas', 'La mención de los turistas que buscan lo que es local', 'La frase final sobre la historia que guarda la ciudad'], 'Las zonas señaladas ordenan los puestos sin bloquear el paso: responden a quien defiende el andén para los peatones.', 'esquina'),

    Q('icf-lc-filosofico', '¿Qué busca mostrar el experimento de la máquina?', ['Que una buena vida no parece depender solo de sentirse bien', 'Que la tecnología podrá curar algún día todas las enfermedades', 'Que los filósofos preferirían vivir conectados en un tanque', 'Que escribir una novela es más difícil que ganar un campeonato'], 'Si casi todos rechazan una vida que se siente perfecta, sentirse bien no parece ser lo único que importa.', 'maquina'),
    Q('icf-lc-filosofico', 'Según el párrafo 2, si lo único importante fuera sentirse bien,', ['lo obvio sería aceptar conectarse a la máquina', 'nadie querría conectarse a la máquina nunca', 'la máquina no podría funcionar de verdad', 'las personas preferirían el dolor al aburrimiento'], 'El texto dice que en ese caso «la respuesta sería obvia: sí».', 'maquina'),
    Q('icf-lc-filosofico', 'La segunda explicación del párrafo 3 sostiene que queremos', ['ser de verdad cierto tipo de persona', 'tener más experiencias agradables cada día', 'inventar nuestra propia realidad a nuestro gusto', 'evitar el dolor a cualquier costo y para siempre'], 'Queremos ser valientes, generosos u honestos, y quien flota en el tanque «solo cree serlo».', 'maquina'),
    Q('icf-lc-estructura', '¿Qué función cumple el párrafo 4?', ['Presenta la respuesta de quienes ven el placer como único bien', 'Resume las tres explicaciones que aparecen en el párrafo anterior', 'Describe con detalle cómo se construiría la máquina del tanque', 'Da la opinión definitiva del autor sobre si conectarse o no'], 'Después de las tres razones para no conectarse, el párrafo 4 da la réplica de los defensores del placer.', 'maquina'),
    Q('icf-lc-filosofico', '¿Cuál de estas personas razona como los defensores del párrafo 4?', ['«Si no noto la diferencia, me da igual que mi vida sea real»', '«Prefiero un logro verdadero a una alegría que sea falsa»', '«Quiero conocer el mundo tal como es, aunque me duela»', '«Me importa ser honesto aunque nadie me esté viendo»'], 'Ellos dicen que, si dentro del tanque no notaríamos la diferencia, no debería importarnos.', 'maquina'),
    Q('icf-lc-evalua', 'La frase final del texto expresa', ['una conclusión del autor sobre lo que revela el experimento', 'una regla que todos los filósofos aceptan sin discutir', 'un dato comprobado por una encuesta a muchas personas', 'una crítica contra quienes aceptarían conectarse'], 'El autor cierra diciendo qué hace visible el experimento, sin pretender que la discusión quede resuelta.', 'maquina'),

    Q('icf-lc-discontinuo', 'Según la tabla, ¿qué porcentaje de los residuos fue plástico?', ['18 %', '45 %', '25 %', '4.5 %'], 'Son 45 de 250 kilogramos: 45 ÷ 250 = 0.18, es decir, 18 %.', 'residuos'),
    Q('icf-lc-discontinuo', '¿Cuántos kilogramos más de orgánicos que de papel y cartón se recogieron en la semana?', ['60', '115', '170', '55'], 'Se restan las dos filas de la tabla: 115 − 55 = 60 kilogramos.', 'residuos'),
    Q('icf-lc-literal', 'Según el texto, buena parte del papel y el cartón no se puede reciclar porque', ['llega mezclada con restos de comida', 'pesa menos que el plástico y el vidrio', 'la cafetería tiene su propio contrato', 'las hojas del patio caen encima y lo dañan'], 'Lo dice el párrafo 3: llega «mezclada con restos de comida».', 'residuos'),
    Q('icf-lc-discontinuo', '¿Cuántos kilogramos de residuos NO orgánicos se recogieron en la semana?', ['135', '115', '150', '100'], 'Del total se restan los orgánicos: 250 − 115 = 135 kilogramos.', 'residuos'),
    Q('icf-lc-argumento', 'La advertencia del coordinador (párrafo 4) señala que', ['separar no sirve si después el material se vuelve a mezclar', 'las canecas de colores son demasiado caras para el colegio', 'el grupo ecológico pesó mal los residuos de esa semana', 'los recicladores del barrio no quieren trabajar con colegios'], 'Si el camión mezcla todo, la separación se pierde: por eso pide antes un acuerdo con los recicladores.', 'residuos'),
    Q('icf-lc-evalua', '¿Cuál conclusión NO se apoya en la información del texto?', ['Los estudiantes botan más residuos que los profesores', 'Los orgánicos son el tipo de residuo que más pesa', 'La cafetería no se tuvo en cuenta en la medición', 'Habrá una nueva medición dentro de seis meses'], 'El texto no separa los residuos por quién los bota; las otras tres conclusiones sí salen del texto o de la tabla.', 'residuos'),
  ], 3);

  const matematicas = pon([
    Q('icf-ma-datos', 'Las edades de cinco hermanos son 4, 7, 7, 10 y 12 años. La moda de las edades es', ['7', '8', '10', '4'], 'La moda es el dato que más se repite: el 7 aparece dos veces.'),
    Q('icf-ma-datos', 'Una gráfica de barras muestra las ventas de un kiosco: lunes 30, martes 45 y miércoles 25. ¿Cuántas ventas más hubo el martes que el miércoles?', ['20', '15', '45', '70'], 'Se restan las alturas de las barras: 45 − 25 = 20.'),
    Q('icf-ma-proporcion', 'Un carro gasta 6 galones de gasolina en 180 km. Al mismo ritmo, ¿cuántos galones gasta en 300 km?', ['10', '12', '8', '9'], 'Recorre 180 ÷ 6 = 30 km por galón; para 300 km necesita 300 ÷ 30 = 10 galones.'),
    Q('icf-ma-proporcion', 'En un curso, la razón entre hombres y mujeres es 2 : 3. Si hay 30 estudiantes, ¿cuántas mujeres hay?', ['18', '12', '20', '15'], 'El curso se reparte en 2 + 3 = 5 partes de 6 estudiantes; las mujeres son 3 · 6 = 18.'),
    Q('icf-ma-proporcion', 'El 35 % de los 240 estudiantes de un colegio usa lentes. ¿Cuántos estudiantes usan lentes?', ['84', '35', '96', '72'], 'El 35 % es 0.35 de cada unidad: 0.35 · 240 = 84 estudiantes.'),
    Q('icf-ma-azar', 'En una rifa se venden 200 boletas y solo una gana. Si alguien compra 5 boletas, la probabilidad de que gane es', ['1/40', '1/5', '5/100', '1/200'], 'Tiene 5 casos favorables de 200: 5/200 = 1/40.'),
    Q('icf-ma-azar', 'Un restaurante ofrece 3 sopas, 4 platos fuertes y 2 postres. ¿Cuántos almuerzos distintos de sopa, plato fuerte y postre se pueden armar?', ['24', '9', '12', '18'], 'Por el principio de multiplicación: 3 · 4 · 2 = 24. Sumar (9) sería contar las opciones sueltas.'),
    Q('icf-ma-numeros', 'Un bus pasa por un paradero cada 6 minutos y otro cada 8 minutos. Si pasan juntos a las 7:00, ¿a qué hora vuelven a coincidir?', ['7:24', '7:48', '7:14', '7:12'], 'Coinciden en el mínimo común múltiplo de 6 y 8, que es 24: a las 7:24.'),
    Q('icf-ma-medida', 'Un salón rectangular mide 8 m por 6 m. ¿Cuántas baldosas cuadradas de 50 cm de lado se necesitan para cubrir el piso?', ['192', '48', '96', '384'], 'El piso mide 8 · 6 = 48 m² y cada baldosa 0.5 · 0.5 = 0.25 m²: 48 ÷ 0.25 = 192.'),
    Q('icf-ma-medida', 'Un cubo tiene aristas de 4 cm. Su volumen es', ['64 cm³', '16 cm³', '48 cm³', '96 cm³'], 'V = 4 · 4 · 4 = 64 cm³. El 96 es el área de sus seis caras.'),
    Q('icf-ma-lineal', 'Un tanque tiene 500 litros de agua y pierde 25 litros por hora. ¿Después de cuántas horas queda vacío?', ['20', '25', '475', '12.5'], 'Se vacía cuando 500 − 25t = 0, es decir, t = 500 ÷ 25 = 20 horas.'),
    Q('icf-ma-lineal', '¿Cuál ecuación representa una recta que pasa por el origen y tiene pendiente −3?', ['y = −3x', 'y = x − 3', 'y = 3x', 'y = −3'], 'Una recta por el origen es y = mx; con m = −3 queda y = −3x. La de y = −3 es horizontal.'),
    Q('icf-ma-forma', 'Un rectángulo mide 6 cm por 8 cm. Su diagonal mide', ['10 cm', '14 cm', '12 cm', '7 cm'], 'Por Pitágoras, d² = 6² + 8² = 36 + 64 = 100, así que d = 10 cm.'),
    Q('icf-ma-forma', 'Los ángulos internos de un hexágono suman', ['720°', '540°', '360°', '1 080°'], 'Un polígono de n lados se divide en n − 2 triángulos: (6 − 2) · 180° = 720°.'),
    Q('icf-ma-ecuaciones', 'Laura tiene el triple de la edad de su hijo. Dentro de 12 años tendrá el doble. ¿Cuántos años tiene hoy el hijo?', ['12', '24', '6', '36'], 'Si el hijo tiene h, Laura tiene 3h: 3h + 12 = 2(h + 12), de donde h = 12.'),
    Q('icf-ma-ecuaciones', 'En una granja hay gallinas y vacas: en total 20 cabezas y 56 patas. ¿Cuántas vacas hay?', ['8', '12', '14', '6'], 'g + v = 20 y 2g + 4v = 56. Si todas fueran gallinas habría 40 patas; las 16 que sobran son 2 por vaca: 8 vacas.'),
    Q('icf-ma-argumenta', 'Sofía resuelve $2x + 6 = 14$ así: «2x = 14 + 6 = 20, entonces x = 10». ¿Cuál es su error?', ['Debió restar 6 en los dos lados, no sumarlo', 'Debió dividir 14 entre 2 antes que nada', 'Debió multiplicar por 2 en vez de dividir', 'No hay error: x = 10 es la solución'], 'Para despejar se resta 6: 2x = 8 y x = 4. Comprobación: 2 · 10 + 6 = 26, no 14.'),
    Q('icf-ma-argumenta', '¿Cuál ejemplo muestra que es falsa la afirmación «la suma de dos números irracionales siempre es irracional»?', ['√2 + (−√2) = 0', '√2 + √2 = 2√2', 'π + 1', '√3 + √5'], 'Son dos irracionales cuya suma, 0, es racional. π + 1 no sirve porque 1 no es irracional.'),
    Q('icf-ma-finanzas', 'Una cuenta de ahorros paga 1 % mensual de interés compuesto. Si se depositan 500 000 pesos, al cabo de 2 meses hay', ['510 050 pesos', '510 000 pesos', '505 000 pesos', '501 000 pesos'], '500 000 · 1.01 · 1.01 = 510 050. Con interés simple serían 510 000.'),
    Q('icf-ma-finanzas', 'Un trabajador gana 2 000 000 de pesos al mes y le descuentan 4 % para salud y 4 % para pensión. ¿Cuánto recibe?', ['1 840 000 pesos', '1 920 000 pesos', '1 600 000 pesos', '1 960 000 pesos'], 'Le descuentan 8 % en total: 0.08 · 2 000 000 = 160 000, y recibe 1 840 000.'),
    Q('icf-ma-curvas', 'La función $f(x) = 2^x$ en $x = 5$ vale', ['32', '10', '25', '64'], '2⁵ = 2 · 2 · 2 · 2 · 2 = 32. El 10 sale de multiplicar 2 · 5, que es un error común.'),
    Q('icf-ma-curvas', 'Una población de peces se reduce a la mitad cada año. Si hoy hay 8 000, ¿cuántos habrá en 3 años?', ['1 000', '2 000', '4 000', '2 667'], '8 000 → 4 000 → 2 000 → 1 000: se divide entre 2 tres veces.'),
    Q('icf-ma-espacio', 'El punto $(3, 0)$ se gira 90° alrededor del origen, en sentido contrario a las manecillas del reloj. Su imagen es', ['(0, 3)', '(0, −3)', '(−3, 0)', '(3, 3)'], 'Un cuarto de vuelta antihorario lleva el eje x positivo al eje y positivo: (3, 0) pasa a (0, 3).'),
    Q('icf-ma-dispersion', 'Los datos 2, 4, 6, 8 y 10 tienen un rango de', ['8', '10', '6', '30'], 'El rango es el mayor menos el menor: 10 − 2 = 8.'),
  ], 8);

  const sociales = pon([
    Q('icf-sc-constitucion', 'Las tres ramas del poder público en Colombia son', ['legislativa, ejecutiva y judicial', 'nacional, departamental y municipal', 'civil, militar y religiosa', 'electoral, fiscal y de control'], 'La Constitución divide el poder en tres ramas para que se controlen entre sí; la electoral y los órganos de control son entidades aparte.'),
    Q('icf-sc-constitucion', 'La acción popular sirve para proteger', ['derechos colectivos, como un ambiente sano o el espacio público', 'el derecho de una sola persona a recibir un medicamento que necesita', 'la elección de los representantes de un curso escolar', 'la propiedad privada de una empresa extranjera'], 'La acción popular defiende derechos e intereses de toda la comunidad; el caso individual urgente es para la tutela.'),
    Q('icf-sc-constitucion', 'Hoy, el presidente de la República en Colombia es elegido para un periodo de', ['cuatro años, sin reelección', 'seis años, con una reelección', 'cuatro años, con reelección inmediata', 'ocho años, sin reelección'], 'El periodo presidencial es de cuatro años y una reforma constitucional eliminó la reelección.'),
    Q('icf-sc-participacion', 'Según la Constitución, el voto en Colombia es', ['un derecho y un deber ciudadano', 'una obligación que se castiga con multa', 'un privilegio de quienes pagan impuestos', 'exclusivo de quienes saben leer y escribir'], 'La Constitución dice que el voto es un derecho y un deber, pero no lo hace obligatorio.'),
    Q('icf-sc-participacion', 'Las juntas de acción comunal son', ['organizaciones de vecinos que trabajan por su barrio o vereda', 'oficinas del gobierno nacional que hay en cada uno de los municipios', 'tribunales que juzgan los delitos menores', 'empresas privadas de servicios públicos'], 'Son organizaciones de la comunidad que gestionan obras y proyectos para su barrio o vereda.'),
    Q('icf-sc-participacion', 'Una veeduría ciudadana sirve para', ['vigilar cómo se ejecuta una obra o un programa público', 'elegir por votación al rector de un colegio oficial del municipio', 'cobrar los impuestos atrasados de un municipio', 'aprobar el presupuesto de la Nación cada año'], 'Las veedurías son grupos de ciudadanos que hacen control a la gestión pública.'),
    Q('icf-sc-perspectivas', 'En un municipio se discute si permitir la minería de oro. ¿Qué actor es más probable que dé prioridad al empleo inmediato?', ['Los trabajadores desempleados de la región', 'Una organización que protege las fuentes de agua', 'Una comunidad que vive del turismo ecológico', 'Los pescadores del río que pasa junto a la mina'], 'Quien no tiene trabajo ve en la mina una fuente de ingresos; los demás temen por el agua, el paisaje o la pesca.'),
    Q('icf-sc-perspectivas', 'Para resolver un conflicto entre vecinos por el ruido de una fiesta, la opción que mejor respeta a las dos partes es', ['dialogar y acordar un horario para la música', 'llamar a la policía sin hablar antes con nadie', 'subir el volumen de la música propia en respuesta', 'dejar de saludar a esos vecinos para siempre'], 'El diálogo permite que unos sigan celebrando y los otros descansen: los dos intereses quedan atendidos.'),
    Q('icf-sc-fuentes', 'Un estudiante quiere saber cuántas personas viven hoy en su municipio. La fuente más confiable es', ['las cifras del censo y las proyecciones de población del DANE', 'un comentario que circula en una red social', 'lo que recuerda un vecino que vive allí hace años', 'un afiche de una campaña política del municipio'], 'El censo es una medición oficial y sistemática; las demás son opiniones o fuentes con intereses.'),
    Q('icf-sc-fuentes', 'Un artículo afirma que una bebida «cura la gripa en un día» y cita solo al dueño de la empresa que la vende. El principal problema de esa fuente es que', ['tiene un interés económico en lo que afirma', 'conoce mejor que nadie la bebida que fabrica y vende', 'la gripa es una enfermedad muy común', 'el artículo es demasiado corto para leer'], 'Quien gana dinero con la venta no es una fuente imparcial; harían falta estudios independientes.'),
    Q('icf-sc-sistemico', 'Una fábrica grande cierra en un pueblo pequeño. ¿Qué consecuencia es más probable?', ['Bajan las ventas del comercio local porque hay menos salarios', 'Suben los salarios de todos los habitantes del pueblo y sus veredas', 'Llegan muchas más familias a vivir en el pueblo', 'Mejora de inmediato la economía de toda la región'], 'Los trabajadores despedidos gastan menos, y las tiendas, restaurantes y transportes del pueblo venden menos.'),
    Q('icf-sc-sistemico', 'Un país paga una parte del precio de la gasolina para que sea barata. Un efecto no buscado puede ser que', ['aumente el uso del carro y la contaminación del aire', 'la gente compre menos carros particulares y más bicicletas', 'el Estado reciba más dinero por impuestos', 'bajen los precios de los paneles solares'], 'Con gasolina barata manejar sale más económico; más carros en la calle significan más contaminación y un gasto grande para el Estado.'),
    Q('icf-sc-historia', 'El 20 de julio de 1810, en Santafé, ocurrió', ['un levantamiento que formó una junta de gobierno', 'la batalla final contra el ejército español en el puente', 'la firma de la Constitución de Rionegro', 'la separación de Panamá de Colombia'], 'Ese día, tras el incidente del florero, se formó una junta que inició el proceso de independencia.'),
    Q('icf-sc-historia', 'En 1903, Colombia perdió el territorio de', ['Panamá', 'Venezuela', 'Ecuador', 'La Guajira'], 'Panamá se separó de Colombia en 1903 con apoyo de Estados Unidos, que quería construir el canal.'),
    Q('icf-sc-historia', 'La ley que abolió la esclavitud en Colombia se expidió en', ['1851', '1810', '1991', '1903'], 'La ley de 1851, durante el gobierno de José Hilario López, abolió la esclavitud a partir del 1 de enero de 1852.'),
    Q('icf-sc-mundo', 'La Primera Guerra Mundial (1914 a 1918) se caracterizó por', ['la guerra de trincheras y el uso de armas industriales', 'el lanzamiento de las primeras bombas atómicas sobre ciudades', 'la llegada de los europeos a América', 'la caída del muro que dividía Berlín'], 'Fue una guerra de desgaste en trincheras, con ametralladoras, artillería y gases. Las bombas atómicas fueron en la Segunda.'),
    Q('icf-sc-mundo', 'El apartheid en Sudáfrica fue', ['un sistema legal de segregación contra la población negra', 'una guerra entre Sudáfrica y sus países vecinos', 'un tratado de comercio entre Sudáfrica y Europa', 'un movimiento pacífico que unió a todas las razas del país'], 'Entre 1948 y comienzos de los noventa, las leyes separaban a la población por raza y negaban derechos a la mayoría negra.'),
    Q('icf-sc-mundo', 'Para los pueblos indígenas, la conquista española de América en el siglo XVI trajo', ['una gran caída de su población por guerras y enfermedades', 'un crecimiento rápido de su población en pocos años', 'la independencia de sus territorios frente a Europa', 'el fin de toda forma de trabajo forzado en América'], 'La guerra, el trabajo forzado y enfermedades como la viruela causaron una caída enorme de la población indígena.'),
    Q('icf-sc-geografia', 'En Colombia, la cordillera de los Andes se divide en', ['tres ramales: occidental, central y oriental', 'dos ramales: uno que va al norte y otro que va al sur', 'cuatro ramales del mismo tamaño', 'un solo ramal que cruza el país'], 'Al sur del país, en el nudo de los Pastos, los Andes se dividen en dos; más al norte, en el macizo colombiano, de la cordillera central nace la oriental: quedan tres cordilleras.'),
    Q('icf-sc-geografia', 'Un páramo es importante para las ciudades cercanas porque', ['retiene y regula el agua que alimenta los ríos', 'produce la mayor parte de la energía del país', 'es la zona más cálida de toda la montaña', 'tiene los mejores suelos para criar ganado'], 'La vegetación del páramo, como los frailejones y los musgos, guarda agua y la va soltando poco a poco a los ríos.'),
    Q('icf-sc-economia', 'Cuando el Banco de la República sube las tasas de interés, busca sobre todo', ['frenar la inflación al encarecer el crédito', 'que la gente pida muchos más préstamos', 'que los bancos presten más dinero a las familias', 'estimular el consumo para que la economía crezca más rápido'], 'Si pedir prestado cuesta más, se gasta menos y los precios suben más despacio.'),
    Q('icf-sc-economia', 'El producto interno bruto (PIB) de un país mide', ['el valor de los bienes y servicios finales que produce en un periodo', 'la cantidad de billetes que imprime el banco central cada año', 'el número de habitantes que tiene el país en un año dado', 'el total de las deudas que el gobierno tiene con los bancos de otros países'], 'El PIB suma el valor de lo que se produce para uso final dentro del país en un tiempo dado, por lo general un año.'),
    Q('icf-sc-modelos', 'En un modelo de libre mercado, el precio de un producto lo fijan principalmente', ['la oferta y la demanda', 'las órdenes del gobierno', 'las decisiones de un sindicato', 'los costos de la publicidad'], 'Sin intervención del Estado, el precio sube cuando hay mucha demanda o poca oferta, y baja en el caso contrario.'),
    Q('icf-sc-modelos', 'Un gobierno quiere reducir los accidentes de moto. ¿Qué medida ataca una causa y no solo las consecuencias?', ['Mejorar la formación y el examen para la licencia', 'Construir más hospitales para atender a los heridos', 'Comprar más ambulancias para todas las ciudades', 'Pagar seguros más altos a las víctimas de choques'], 'Formar mejor a quienes manejan previene accidentes; las otras medidas atienden el daño después de que ocurre.'),
  ], 13);

  const ciencias = pon([
    Q('icf-cn-indaga', 'Un estudiante mide cuánto tarda en hervir el agua cuando cambia la cantidad de agua en la olla. ¿Qué debe mantener igual para que la comparación sea justa?', ['la estufa, la llama y el tipo de olla', 'la cantidad de agua en cada prueba', 'el tiempo que tarda el agua en hervir', 'el número de ollas que usa a la vez'], 'Solo debe cambiar la cantidad de agua (lo que se prueba) y medirse el tiempo; lo demás debe quedar igual.'),
    Q('icf-cn-indaga', 'En ciencias, una hipótesis es', ['una explicación posible que se puede poner a prueba', 'un dato que ya fue comprobado muchas veces', 'una opinión personal que no se puede discutir con nadie', 'el resultado final que arroja un experimento'], 'La hipótesis se propone antes del experimento y este sirve para apoyarla o descartarla.'),
    Q('icf-cn-celula', 'La membrana celular cumple la función de', ['controlar qué sustancias entran y salen de la célula', 'fabricar casi toda la energía que usa la célula', 'guardar y copiar toda la información genética de la célula', 'hacer la fotosíntesis en las células de las hojas'], 'La membrana es una barrera selectiva: deja pasar unas sustancias y otras no.'),
    Q('icf-cn-celula', 'Las bacterias se diferencian de las células animales en que', ['no tienen un núcleo definido', 'no tienen material genético', 'son siempre más grandes', 'no se pueden reproducir'], 'Las bacterias son procariotas: su ADN está suelto en el citoplasma, sin núcleo.'),
    Q('icf-cn-celula', 'En el cuerpo humano, la función principal de los riñones es', ['filtrar la sangre y eliminar desechos en la orina', 'producir los glóbulos rojos y blancos de la sangre', 'digerir las grasas de los alimentos', 'bombear la sangre a todo el cuerpo'], 'Los riñones filtran la sangre, quitan los desechos y el exceso de agua y forman la orina.'),
    Q('icf-cn-movimiento', 'Un objeto se mueve con velocidad constante de 15 m/s durante 4 s. La distancia que recorre es', ['60 m', '19 m', '3.75 m', '11 m'], 'Con velocidad constante, d = v · t = 15 · 4 = 60 m.'),
    Q('icf-cn-movimiento', 'Un pasajero va de pie en un bus que frena de golpe. El pasajero se va hacia adelante porque', ['por inercia tiende a seguir en movimiento', 'el bus lo empuja con fuerza hacia adelante', 'la gravedad aumenta cuando el bus frena', 'el aire de adentro lo empuja hacia adelante'], 'Por la primera ley de Newton, el cuerpo del pasajero conserva su movimiento mientras el bus se detiene.'),
    Q('icf-cn-materia', 'El agua de mar filtrada, sin arena ni algas, es', ['una mezcla homogénea', 'una sustancia pura', 'un elemento químico', 'una mezcla heterogénea'], 'Tiene sales disueltas de manera uniforme: es una solución, es decir, una mezcla homogénea.'),
    Q('icf-cn-materia', 'Cuando una sustancia pasa de líquido a gas, sus partículas', ['se separan y se mueven con más libertad', 'se juntan más y se ordenan en filas', 'dejan de moverse por completo', 'se convierten en otro elemento'], 'En el gas las partículas están muy separadas y se mueven más rápido y libremente que en el líquido.'),
    Q('icf-cn-ecosistemas', 'En un ecosistema, los hongos y bacterias que descomponen la materia muerta', ['devuelven nutrientes al suelo', 'producen oxígeno por fotosíntesis', 'son los consumidores primarios', 'solo pueden vivir en el agua'], 'Los descomponedores transforman los restos en nutrientes que las plantas vuelven a usar.'),
    Q('icf-cn-ecosistemas', 'Si en un lago se introduce una especie invasora que no tiene depredadores, lo más probable es que', ['su población crezca y compita con las especies nativas', 'desaparezca del lago en unos pocos días por falta de comida', 'mejore el equilibrio del lago con el tiempo', 'su población se mantenga pequeña porque no conoce el lago'], 'Sin depredadores que la controlen, se multiplica y le quita alimento y espacio a las especies propias del lago.'),
    Q('icf-cn-energia', 'Un panel solar transforma', ['energía luminosa en energía eléctrica', 'energía eléctrica en energía química', 'energía térmica en energía nuclear', 'energía sonora en energía luminosa'], 'Las celdas del panel convierten la luz del Sol en corriente eléctrica.'),
    Q('icf-cn-energia', 'Un carro de 1 000 kg va a 10 m/s. Su energía cinética es', ['50 000 J', '10 000 J', '100 000 J', '5 000 J'], 'Ec = ½ · m · v² = ½ · 1 000 · 100 = 50 000 J.'),
    Q('icf-cn-atomo', 'En la tabla periódica, los elementos de una misma columna (grupo)', ['tienen propiedades químicas parecidas', 'tienen exactamente la misma masa', 'son todos gases a temperatura ambiente', 'tienen el mismo número de protones'], 'En general tienen el mismo número de electrones en su última capa, y por eso reaccionan de forma parecida.'),
    Q('icf-cn-atomo', 'Un ion con carga +2 se forma cuando un átomo', ['pierde dos electrones', 'gana dos electrones', 'gana dos protones', 'pierde dos neutrones'], 'Al perder dos electrones (negativos) quedan dos protones sin compensar: carga +2.'),
    Q('icf-cn-herencia', 'Se cruza una planta de flor roja (RR) con una de flor blanca (rr). Si el rojo es dominante, las plantas hijas serán', ['todas de flor roja', 'todas de flor blanca', 'mitad rojas y mitad blancas', 'tres rojas por cada blanca'], 'Todas reciben R de un padre y r del otro: son Rr y muestran el rojo dominante.'),
    Q('icf-cn-herencia', 'En distintas islas, unas aves de la misma familia tienen picos diferentes según el alimento de cada isla. Esto se explica por', ['la selección natural', 'el uso y desuso de los órganos', 'la generación espontánea', 'la falta de comida en todas las islas'], 'En cada isla sobrevivieron y se reprodujeron más las aves con el pico adecuado para su alimento.'),
    Q('icf-cn-reacciones', 'Si H = 1 g/mol y O = 16 g/mol, la masa molar del agua ($H_2O$) es', ['18 g/mol', '17 g/mol', '32 g/mol', '34 g/mol'], 'Dos hidrógenos y un oxígeno: 2 · 1 + 16 = 18 g/mol.'),
    Q('icf-cn-reacciones', 'Para corregir un suelo muy ácido, un agricultor puede agregar', ['cal, que es una sustancia básica', 'vinagre, que es una sustancia ácida', 'agua destilada en gran cantidad', 'sal de cocina en pequeñas dosis'], 'Una base neutraliza el ácido y sube el pH del suelo; el vinagre lo haría aún más ácido.'),
    Q('icf-cn-ondas', 'Un trueno se oye 3 segundos después de ver el rayo. Si el sonido viaja a 340 m/s, la tormenta está a unos', ['1 020 m', '340 m', '113 m', '3 000 m'], 'La luz llega casi al instante; el sonido tarda 3 s: d = 340 · 3 = 1 020 m.'),
    Q('icf-cn-ondas', 'Bajo la luz blanca, un objeto se ve rojo porque', ['refleja la luz roja y absorbe los otros colores', 'absorbe toda la luz roja que le llega', 'produce su propia luz roja todo el tiempo, como un bombillo', 'convierte la luz blanca en calor rojo'], 'El color que vemos es el de la luz que el objeto refleja hacia nuestros ojos.'),
    Q('icf-cn-gases', 'Si se disuelve más azúcar en la misma cantidad de agua, la concentración de la solución', ['aumenta', 'disminuye', 'no cambia', 'disminuye, porque el azúcar ocupa espacio'], 'Hay más soluto en el mismo solvente: la solución queda más concentrada.'),
    Q('icf-cn-electrico', 'Dos imanes se acercan por sus polos norte. Lo que ocurre es que', ['se repelen', 'se atraen', 'se atraen solo si están muy cerca', 'no pasa nada'], 'Polos iguales se repelen y polos opuestos se atraen.'),
    Q('icf-cn-cts', 'Una empresa anuncia un plástico «biodegradable» que solo se degrada en plantas industriales a 60 °C. ¿Qué pregunta conviene hacer antes de decir que ayuda al ambiente?', ['¿Hay plantas así en la ciudad donde se va a botar?', '¿De qué color viene el plástico de cada bolsa?', '¿Cuánto pesa cada bolsa de ese plástico nuevo?', '¿Qué marca fabrica el plástico y en qué tiendas se vende?'], 'Si no hay plantas industriales cerca, el plástico termina en un relleno o en un río y no se degrada.'),
  ], 18);

  const ingles = pon([
    Q('icf-en-avisos', 'Where can you see this sign? "Please do not feed the animals."', ['In a zoo', 'In a bank', 'In a library', 'In a cinema'], '«Do not feed the animals» es «no alimente a los animales»: el aviso está en un zoológico.'),
    Q('icf-en-avisos', 'A sign on a door says: "Closed for lunch. Back at 2 p.m." What does it mean?', ['The place will open again at two.', 'The place is closed all day today.', 'Lunch is served here at two.', 'You can eat your lunch here now.'], '«Back at 2 p.m.» quiere decir que vuelven a abrir a las dos.'),
    Q('icf-en-avisos', 'What does this sign mean? "Silence, please: test in progress."', ['Be quiet because people are taking a test.', 'Speak loudly so that the teacher can hear you.', 'The test has already finished.', 'You must take a test right now.'], '«In progress» es «en curso»: hay personas presentando una prueba y piden silencio.'),
    Q('icf-en-avisos', 'A sign in a shop says: "Buy two, get one free." If you buy two shirts,', ['you get a third shirt without paying', 'you must pay the full price for three shirts', 'you get two shirts free', 'the shirts are not for sale'], '«Get one free» es «lleva una gratis»: por dos camisas pagadas recibes una tercera.'),
    Q('icf-en-vocabulario', 'A person who flies a plane is a', ['pilot', 'baker', 'plumber', 'teacher'], '«Pilot» es piloto; baker, plumber y teacher son panadero, plomero y profesor.'),
    Q('icf-en-vocabulario', 'You use this small object to open a door. It is a', ['key', 'fork', 'towel', 'pencil'], '«Key» es la llave; fork, towel y pencil son tenedor, toalla y lápiz.'),
    Q('icf-en-vocabulario', 'The opposite of "cheap" is', ['expensive', 'small', 'happy', 'early'], '«Cheap» es barato y su contrario es «expensive», caro.'),
    Q('icf-en-dialogos', 'Complete the conversation. "How much is this jacket?" —', ["It's forty dollars.", "It's blue and black.", "I'm fine, thanks.", "It's in my bag."], '«How much» pregunta el precio: «it\'s forty dollars».'),
    Q('icf-en-dialogos', 'Complete the conversation. "Where is the nearest bank?" —', ['Go straight and turn left.', 'It opens at nine o\'clock.', 'I have an account there.', 'Yes, it is very near.'], '«Where» pregunta por un lugar: la respuesta da indicaciones para llegar.'),
    Q('icf-en-dialogos', 'Complete the conversation. "Would you like to come to my party on Saturday?" —', ["I'd love to. What time?", 'Yes, I came last week.', "No, it's on Saturday.", 'I liked parties yesterday.'], 'A una invitación se responde aceptando o rechazando; «I\'d love to» es aceptarla con gusto.'),
    Q('icf-en-dialogos', 'Complete the conversation. "Excuse me, is this seat free?" —', ['Yes, please sit down.', 'I am free on Monday.', 'Yes, I am a student.', 'No, it is a chair.'], '«Is this seat free?» pregunta si el puesto está libre; se responde invitando a sentarse.'),
    Q('icf-en-gramatica', 'Choose the word or words for gap (1).', ['has lived', 'live', 'is live', 'living'], 'Algo que empezó hace seis años y sigue hoy se dice en presente perfecto: «has lived … for six years».', 'max'),
    Q('icf-en-gramatica', 'Choose the word for gap (2).', ['takes', 'take', 'taking', 'taken'], 'Es una rutina («every morning») y el sujeto es «my sister» (ella): presente simple con -s, «takes».', 'max'),
    Q('icf-en-gramatica', 'Choose the word or words for gap (3).', ['the biggest', 'bigger', 'the most big', 'big'], 'Compara a Max con todos los perros del barrio: superlativo de un adjetivo corto, «the biggest».', 'max'),
    Q('icf-en-gramatica', 'Choose the word for gap (4).', ['hid', 'hides', 'hide', 'hiding'], '«Yesterday» pide pasado simple: «hid», pasado irregular de «hide».', 'max'),
    Q('icf-en-corto', 'What time should students arrive at the main gate?', ['At 7:15 a.m.', 'At 7:30 a.m.', 'At 7:45 a.m.', 'At 7:00 a.m.'], 'El bus sale a las 7:30 y piden llegar quince minutos antes: a las 7:15.', 'paseo'),
    Q('icf-en-corto', 'Why do students need to bring lunch?', ['There is no cafeteria at the museum.', 'The food at the museum is expensive.', 'The trip is very short.', 'Mr. Rivera wants them to share food.'], 'El aviso dice «there is no cafeteria at the museum».', 'paseo'),
    Q('icf-en-corto', 'What must students do before Wednesday?', ['Return the form signed by their parents.', 'Visit the science museum with Mr. Rivera.', 'Buy a bottle of water for the trip.', 'Go to room 204 to ask questions.'], '«Students must return the permission form signed by their parents before Wednesday».', 'paseo'),
    Q('icf-en-inferencia', 'Where would you probably find this text?', ['On a school notice board', 'In a science book', 'In a letter from a friend', 'On a restaurant menu'], 'Da fecha, hora, costo y requisitos de una salida escolar: es un aviso para estudiantes y familias.', 'paseo'),
    Q('icf-en-largo', 'What is the text mainly about?', ['A boy whose interest in the sky grew into a career', 'The history of an old astronomy club in the capital city', 'How to build a cheap telescope at home', 'Why comets can be dangerous for the Earth'], 'Cuenta cómo Tomás, con unos binoculares y paciencia, llegó a estudiar física.', 'astro'),
    Q('icf-en-largo', 'How did Tomás learn more about the stars?', ['He read on the internet at the town hall.', 'He borrowed books from the school library.', 'His classmates at school taught him.', 'He studied with professional astronomers.'], 'El párrafo 2 dice que su pueblo no tenía biblioteca y que usó internet en la alcaldía («town hall»).', 'astro'),
    Q('icf-en-largo', 'Why did the club invite Tomás to give a talk?', ['His notes about the comet were very careful.', 'He was the first person to discover the comet.', 'He had the biggest telescope in his town.', 'His grandfather was a member of the club.'], 'No lo descubrió primero, pero «his notes were so careful» que lo invitaron.', 'astro'),
    Q('icf-en-vocabulario', 'In paragraph 2, "nobody shared his interest" means that', ['no one else at school liked astronomy', 'everybody at school liked astronomy', 'Tomás himself did not really like astronomy', 'his friends gave him binoculars'], 'Sus compañeros pensaban que la astronomía era aburrida: nadie compartía su interés.', 'astro'),
    Q('icf-en-inferencia', 'What does Tomás mean by his last sentence?', ['Patience is as important as tools in science.', 'Telescopes are much too expensive for young students.', 'Half of all scientists have no equipment.', 'He wants to sell his old binoculars.'], 'Dice que la paciencia es «la mitad del equipo»: vale tanto como los instrumentos.', 'astro'),
  ], 23);

  return { id: 'icf-sim-3', titulo: 'Simulacro 3', textos, pruebas: { lectura, matematicas, sociales, ciencias, ingles } };
})());
;
//#archivo js/portal.js
// El portal de la institución dentro de la app (spec 2026-11-25-portal-en-la-app): es una sección más del menú («Portal»). Se abre en un
// marco propio, a pantalla completa, que trae el mismo menú con sus opciones; desde él se vuelve a Inicio, Mis cursos o Tú sin recargar.
// También recorta, para un docente responsable, los componentes del Preicfes que no dirige.
const enEquipo = () => Cuenta.inst.equipo || [];
const portalPuede = () => !!Cuenta.user && ((Cuenta.perfil || {}).rol === 'gestor' || enEquipo().length > 0);
// Componentes de un docente responsable; null: no se recorta (gestor, administración, estudiante o docente sin asignar). Pura.
function portalComps(perfil, equipo) {
  if (!perfil || perfil.rol !== 'gestor' || !equipo.length || equipo.some(e => e.papel !== 'docente')) return null;
  const cs = [...new Set(equipo.flatMap(e => e.componentes || []))];
  return cs.length ? cs : null;
}
const portalMios = () => (Cuenta.user ? portalComps(Cuenta.perfil, enEquipo()) : null);
// Deja en el curso solo esos componentes (y lo devuelve entero si cambia la cuenta): así todas las pantallas lo respetan.
let portalClave = '';
function portalRecorta(cs = portalMios(), c = COURSES.find(x => x.id === 'preicfes')) {
  const clave = cs ? [...cs].sort().join() : '';
  if (!c || !c.blocks || clave === portalClave) return;
  portalClave = clave;
  if (!c.entero) c.entero = { blocks: c.blocks, units: c.units };
  c.blocks = cs ? c.entero.blocks.filter(b => cs.includes(b.id)) : c.entero.blocks;
  c.units = cs ? c.entero.units.filter(u => cs.includes(u.block)) : c.entero.units;
  if (typeof openWorld !== 'undefined') { openWorld = null; openBlock = null; }
  if (typeof gymFocus !== 'undefined') gymFocus = null;
}
function portalMarca() {
  const b = document.querySelector('#tabbar [data-tab="portal"]'); if (b) b.hidden = !portalPuede();
  portalRecorta();
  const f = document.querySelector('#portal'); if (f && f.dataset.de !== (Cuenta.user || {}).id) f.remove();   // otra cuenta: nada de la anterior
}
// El marco solo tapa la app cuando el portal ya está listo: si no carga, la app y su menú siguen ahí.
const portalListo = f => !!f && f.dataset.listo === '1';
function portalVe(si) {
  const f = document.querySelector('#portal'), ve = si && portalListo(f);
  document.body.classList.toggle('en-portal', ve); $('#app').inert = ve;
  if (f) f.hidden = portalListo(f) ? !si : false;
  if (f && !si && !portalListo(f)) f.remove();   // se fue antes de que cargara
}
function portalDice(html) { view.innerHTML = `<div class="portal-espera">${html}</div>`; const b = $('[data-otra]', view); if (b) b.onclick = renderPortal; }
function portalFalla(t) { document.querySelector('#portal')?.remove(); if (tab !== 'portal') return; portalVe(false); portalDice(`<p>${esc(t)}</p><button class="btn" type="button" data-otra>Reintentar</button>`); }
function renderPortal() {
  let f = document.querySelector('#portal');
  if (f && !portalListo(f)) { f.remove(); f = null; }
  if (f) { view.innerHTML = ''; portalVe(true); f.focus(); try { f.contentWindow.portalRefresca(); } catch (e) { /* sigue con lo que tiene */ } return; }
  if (!navigator.onLine) return portalFalla('Para abrir el portal necesitas conexión.');
  portalDice('<p>Abriendo tu portal…</p>');
  f = document.createElement('iframe'); f.id = 'portal'; f.title = 'Portal de tu institución'; f.src = 'instituciones/portal/'; f.dataset.de = Cuenta.user.id;
  document.documentElement.appendChild(f);   // fuera de <body>, que en computador lleva zoom: el portal trae el suyo
  setTimeout(() => { if (f.isConnected && !portalListo(f)) portalFalla('El portal tarda en responder.'); }, 20000);
}
// Lo que el portal le pide a la app (mismo origen).
if (typeof window !== 'undefined') {
  window.zukaIr = t => { if (!['home', 'cursos', 'profile'].includes(t)) return; profileSub = null; go(t); document.querySelector(`#tabbar [data-tab="${t}"]`)?.focus({ preventScroll: true }); };
  window.zukaListo = () => { const f = document.querySelector('#portal'); if (!f) return; f.dataset.listo = '1'; if (tab === 'portal') { view.innerHTML = ''; portalVe(true); f.focus(); } else f.hidden = true; };
  window.zukaFalla = portalFalla;
  try { localStorage.setItem('zuka-portal', '1'); } catch (e) { /* el portal se queda en su página */ }   // esta app ya lo trae dentro
}
// Atrás del celular con el portal abierto: lo consume el portal si tiene algo que cerrar o una vista anterior (js/back.js).
function portalAtras() { const f = document.querySelector('#portal'); if (tab !== 'portal' || !portalListo(f)) return false; try { return f.contentWindow.portalVuelve(); } catch (e) { return false; } }
// Al entrar con su código, o al llegar de /instituciones/portal, se abre el portal.
let portalPend = typeof location !== 'undefined' && /[?&]portal\b/.test(location.search || '');
function portalAbre() {
  if (!portalPend || !portalPuede()) return;
  // Nada se tapa: ni una lección, ni una hoja, ni los datos o la contraseña que se están escribiendo.
  if (lessonClose || Clave.vista || datosAbierta || $('#auth') || $('#sheet').classList.contains('open') || document.querySelector('.dialog, .tour')) { setTimeout(portalAbre, 1500); return; }
  portalPend = false;
  try { history.replaceState(history.state, '', location.pathname); } catch (e) { /* da igual */ }
  go('portal');
}
;
//#archivo js/equipo.js
// Docentes y gestores en la app (spec 2026-11-25-roles-de-institucion): Inicio con saludo y sus cursos; «Tú» con su institución y sus datos,
// que no se editan aquí. Va después de portal.js.
// 'docente' | 'gestor' | 'equipo' (aún no se sabe cuál) | '' (estudiante, administración o sin sesión). Pura.
function rolDe(perfil, equipo) { return !perfil || perfil.rol !== 'gestor' ? '' : !(equipo || []).length ? 'equipo' : equipo.every(e => e.papel === 'docente') ? 'docente' : 'gestor'; }
const rolEquipo = () => (Cuenta.user ? rolDe(Cuenta.perfil, enEquipo()) : '');
const ROL_T = { docente: 'Docente', gestor: 'Gestor', equipo: '' };
const equipoYo = () => enEquipo()[0] || { nombre: (Cuenta.perfil || {}).nombre || '', institucion: '' };
const equipoNombre = () => (equipoYo().nombre || (Cuenta.perfil || {}).nombre || S.name || '').trim();
function renderHomeEquipo() {
  const rol = rolEquipo(), y = $('.hm', view) ? view.scrollTop : 0, cs = cursosConAcceso(), yo = equipoNombre();
  view.innerHTML = `<div class="home"><div class="hm eq-home"><section class="eq-hola"><div><p>${hmSaludo(new Date().getHours())},</p><h1>${rol === 'docente' || !yo ? `<span>${ROL_T[rol]}</span> ` : ''}${esc(yo)}</h1></div><span class="eq-arte" data-inclina aria-hidden="true">${mascotSVG('cheer', 'm-hello')}</span></section>
    ${cs.length ? `<section class="hm-cursos"><div class="hm-fila"><h2 class="home-h2">${rol === 'gestor' ? 'Cursos de tu institución' : 'Tus cursos'}</h2></div><div class="home-courses">${cs.map(c => `<button class="hc-card" data-open="${c.id}" data-inclina style="--c:${c.color}" aria-label="${esc(c.name)}"><span class="hc-esc"><span class="hc-laminas" aria-hidden="true">${c.units.slice(0, 8).map(u => `<span class="world-art">${(WORLDS[u.world] || {}).art || ''}</span>`).join('')}</span><span class="hc-art">${courseArt(c, 'xl')}</span></span>
      <span class="hc-body"><b>${esc(c.name)}</b>${rol === 'docente' && c.blocks && portalMios() ? `<span class="eq-comps">${c.blocks.map(b => `<i>${esc(b.name)}</i>`).join('')}</span>` : `<span class="hc-tag">${esc(c.tagline || '')}</span>`}<span class="hc-stats">${ICON.book}${lessonsOf(c).length} lecciones<span aria-hidden="true">·</span>${courseExercises(c)} ejercicios</span><span class="hc-go">Entrar ${ICON.right}</span></span></button>`).join('')}</div></section>` : `<p class="eq-nada">${rol === 'gestor' ? 'Tu institución no tiene cursos vigentes.' : 'Tu gestor aún no te asigna cursos.'}</p>`}</div></div>`;
  view.querySelectorAll('[data-open]').forEach(k => { k.onclick = () => openCourse(k.dataset.open); });
  inclina($('.eq-home', view)); view.scrollTop = y;
}
// ---------- Tú ----------
const eqFecha = d => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const eqFicha = xs => `<dl class="eq-dl">${xs.filter(x => x[1]).map(([t, v]) => `<div><dt>${t}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const eqCurso = id => (COURSES.find(c => c.id === id) || { name: id }).name;
function renderTuEquipo() {
  const rol = rolEquipo(), e = equipoYo(), comps = (e.componentes || []).map(x => SIM_COMP[x] || x), y = $('.eq-tu', view) ? view.scrollTop : 0, hoy = today();
  const dias = e.hasta ? Math.max(0, instEntre(hoy, e.hasta)) : 0, tot = e.hasta ? Math.max(1, instEntre(e.desde, e.hasta)) : 1;
  view.innerHTML = `<div class="profile"><div class="pf eq-tu">
    <section class="pf-c eq-yo"><span class="eq-ini" aria-hidden="true">${esc(equipoNombre().split(/\s+/).slice(0, 2).map(x => [...x][0] || '').join('').toUpperCase() || 'Z')}</span><div><p>${ROL_T[rol]}</p><h1>${esc(equipoNombre() || ROL_T[rol] || 'Tu cuenta')}</h1>${e.institucion ? `<p>${esc(e.institucion)}</p>` : ''}</div><button class="icon-btn" type="button" data-settings aria-label="Ajustes">${ICON.gear}</button></section>
    <section class="pf-c"><div class="pf-cab"><h2>${rol === 'gestor' ? 'Tus datos' : 'Tus datos de docente'}</h2></div>${eqFicha([['Nombre', equipoNombre()], ['Correo', e.correo], ['Componentes', comps.join(', ')], ['Grupos', rol === 'docente' ? (e.grupos || []).join(', ') : ''], ['Código de acceso', Cuenta.codigo ? muestraCodigo(Cuenta.codigo) : '']])}<p class="eq-nota">${rol === 'gestor' ? 'Se cambian en Portal, Equipo.' : 'Solo los puede cambiar el gestor de tu institución.'}</p>${rol === 'gestor' ? '<button class="btn ghost" type="button" data-acct="portal">Abrir el portal</button>' : ''}</section>
    <section class="pf-c"><div class="pf-cab"><h2>Tu institución</h2>${rol === 'gestor' && e.hasta ? `<p>${e.vigente ? 'Contrato vigente' : 'Contrato no vigente'}</p>` : ''}</div>${eqFicha([['Nombre', e.institucion], ['Tipo', e.tipo], ['NIT', e.nit], ['Ciudad', e.ciudad], ['Contacto', e.contacto], ['Correo', e.correo_inst], ['Teléfono', e.telefono]])}
      ${rol === 'gestor' && e.hasta ? `<div class="eq-cifras"><p>${aroHTML(e.cupos ? e.usados / e.cupos : 0, `<b>${e.usados}</b>`)}<span><b>${e.usados} de ${e.cupos}</b>cupos en uso</span></p><p>${aroHTML(dias / tot, `<b>${dias}</b>`)}<span><b>${dias === 1 ? '1 día' : `${dias} días`}</b>hasta el ${eqFecha(e.hasta)}</span></p><p>${aroHTML(1, `<b>${e.docentes}</b>`)}<span><b>${e.docentes === 1 ? '1 docente' : `${e.docentes} docentes`}</b>con acceso</span></p></div><div class="eq-comps">${(e.cursos || []).map(c => `<i>${esc(eqCurso(c))}</i>`).join('')}</div><p class="eq-nota">Los datos de la institución los cambia Zuka.</p>` : ''}</section>
    <div class="pf-cuenta"><button class="btn ghost" type="button" data-acct="salir">Cerrar sesión</button></div></div></div>`;
  cuentaBind(view); $('[data-settings]', view).onclick = () => { profileSub = 'settings'; renderProfile(); view.scrollTop = 0; $('[data-back]', view).focus({ preventScroll: true }); };
  view.scrollTop = y;
}
// En «Tú» de un estudiante de institución: lo que su colegio registró.
function tuInstHTML() {
  const p = Cuenta.user && cuentaFija() ? Cuenta.inst.persona : null;
  return p ? `<section class="pf-c eq-est"><div class="pf-cab"><h2>Tus datos</h2><p>${esc(p.institucion)}</p></div>${eqFicha([['Nombre', p.nombre], ['Grupo', p.grupo], ['Documento', p.documento]])}<p class="eq-nota">Solo los puede cambiar el gestor de tu institución.</p></section>` : '';
}
;
//#archivo js/perfil.js
// Tú (spec 2026-11-25-tu): carné que se voltea, nivel, meta que se arrastra, mapa de actividad y logros. Lo arma renderProfile
// (js/app.js); aquí, las cuentas puras (tests/perfil.test.js) y cada pieza.

// ---------- cuentas puras ----------
// XP para llegar al nivel n: 0, 50, 150, 300, 500…
const pfXpDe = n => 25 * n * (n - 1);
const PF_TITULOS = ['Aprendiz', 'Explorador', 'Estratega', 'Analista', 'Maestro'];   // cambia cada tres niveles
function pfNivel(xp) {
  let n = 1; while (pfXpDe(n + 1) <= xp) n++;
  const a = pfXpDe(n), b = pfXpDe(n + 1);
  return { n, titulo: PF_TITULOS[Math.min(PF_TITULOS.length - 1, Math.floor((n - 1) / 3))], p: (xp - a) / (b - a), falta: b - xp };
}
// Últimas `semanas` semanas (lunes a domingo): [{ key, xp, hoy, futuro }]. `dias`: XP por día; `activos`: días con actividad sin XP anotado.
function pfMapa(dias, activos, now, semanas = 18) {
  const lead = (now.getDay() + 6) % 7, base = lead + (semanas - 1) * 7;
  return Array.from({ length: semanas * 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - base + i), key = dayKey(d);
    return { key, d, xp: (dias || {})[key] || 0, lit: !!(dias || {})[key] || activos.has(key), hoy: i === base, futuro: i > base };
  });
}
// De 0 a 4 según la meta del día.
const pfFuerza = (x, meta) => (!x.lit ? 0 : x.xp >= meta * 2 ? 4 : x.xp >= meta ? 3 : x.xp >= meta / 2 ? 2 : 1);
const PF_METAS = [10, 20, 30, 50];
// Logros: cada uno con su avance. x: { hechas, mundos, racha, xp, retos, estrellas, examenes, respondidas, aciertos, clases }.
const PF_LOGROS = [
  ['primera', 'check', 'Primer paso', 'Termina tu primera lección', 1, x => x.hechas], ['diez', 'book', 'En marcha', 'Termina 10 lecciones', 10, x => x.hechas], ['cincuenta', 'book', 'Imparable', 'Termina 50 lecciones', 50, x => x.hechas],
  ['mundo', 'star', 'Mundo completo', 'Termina todas las lecciones de un mundo', 1, x => x.mundos], ['cinco', 'star', 'Cinco mundos', 'Completa 5 mundos', 5, x => x.mundos],
  ['racha3', 'flame', 'Tres seguidos', 'Estudia 3 días seguidos', 3, x => x.racha], ['racha7', 'flame', 'Semana entera', 'Estudia 7 días seguidos', 7, x => x.racha], ['racha30', 'flame', 'Mes de hierro', 'Estudia 30 días seguidos', 30, x => x.racha],
  ['xp500', 'bolt', '500 XP', 'Junta 500 de experiencia', 500, x => x.xp], ['xp2000', 'bolt', '2.000 XP', 'Junta 2.000 de experiencia', 2000, x => x.xp],
  ['reto', 'gym', 'Primer reto', 'Supera un reto del gimnasio', 1, x => x.retos], ['estrellas', 'gym', 'Treinta estrellas', 'Gana 30 estrellas en el gimnasio', 30, x => x.estrellas],
  ['examen', 'trophy', 'A prueba', 'Saca 60 % o más en una evaluación', 1, x => x.examenes], ['punteria', 'target', 'Puntería', 'Responde bien 100 ejercicios', 100, x => x.aciertos],
];
const pfLogros = x => PF_LOGROS.map(([id, icono, t, p, meta, f]) => { const v = Math.max(0, f(x) || 0); return { id, icono, t, p, meta, v: Math.min(meta, v), ok: v >= meta }; });

// ---------- piezas ----------
const PF_COLORES = ['#6fd3ff', '#a3e635', '#b18cff', '#ff9d8c', '#ffd257', '#5eead4', '#f472b6', '#8fa8ff'];
const PF_POSES = [['think', 'Pensando'], ['cheer', 'Celebrando'], ['letra', 'Tu inicial']];
// Llega de la nube: solo se aceptan los colores y figuras de la lista.
const pfCarne = (k = S.carne || {}) => ({ pose: PF_POSES.some(p => p[0] === k.pose) ? k.pose : 'think', color: PF_COLORES.includes(k.color) ? k.color : PF_COLORES[0] });
// Parte del plan que queda (aro de «Mi plan»). x: acceso { desde, hasta }; a: accesoCurso.
const pfQueda = (x, a) => { if (a.dias === 0) return 0; if (!x.hasta) return 1; const t = (new Date(x.hasta) - new Date(x.desde)) / 86400000; return t > 0 ? Math.min(1, a.dias / t) : 0; };
// Antes de repintar: guarda foco, nombre a medias y desplazamientos; devuelve lo que los repone. Si no se veía Tú o cambió la cuenta, de cero.
function pfGuarda() {
  const uid = Cuenta.user?.id || '', f = document.activeElement, dentro = $('.pf', view) && view.contains(f);
  if (!$('.pm-mapa', view) || pfVer.uid !== uid) { pfVer = { atras: false, edita: false, dia: null, uid }; return () => {}; }
  const y = view.scrollTop, x = $('.pm-mapa', view).scrollLeft, nom = $('.name-input', view), en = dentro && f === nom, v = nom.value, cur = en ? [nom.selectionStart, nom.selectionEnd] : null;
  const sel = !dentro || en ? '' : ['.pm-riel', '.pm-mapa', '[data-settings]'].find(s => f.matches(s)) || [...f.attributes].filter(t => t.name.startsWith('data-') && t.value).map(t => `[${t.name}="${CSS.escape(t.value)}"]`).join('');
  const vueltos = [...view.querySelectorAll('[data-logro][aria-expanded="true"]')].map(b => b.dataset.logro);
  return () => {
    vueltos.forEach(id => $(`[data-logro="${id}"]`, view)?.setAttribute('aria-expanded', 'true'));
    $('.pm-mapa', view).scrollLeft = x; view.scrollTop = y;
    if (en) { const n = $('.name-input', view); n.value = v; n.focus({ preventScroll: true }); n.setSelectionRange(...cur); } else if (sel) $(sel, view)?.focus({ preventScroll: true });
  };
}
let pfVer = { atras: false, edita: false, dia: null, uid: null };   // lo que se mira; no se guarda
const pfCara = k => (k.pose === 'letra' ? `<span class="cn-letra">${esc(([...(S.name || 'Z')][0]).toUpperCase())}</span>` : mascotSVG(k.pose));
function pfDatos() {
  const all = cursosConAcceso().flatMap(lessonsOf), gym = Object.values(S.gym || {});
  return { total: all.length, hechas: all.filter(isDone).length, mundos: cursosConAcceso().flatMap(c => c.units).filter(u => u.lessons.length && u.lessons.every(isDone)).length, racha: Math.max(S.maxStreak || 0, streakNow()), xp: S.xp,
    retos: Object.keys(S.gym || {}).filter(id => !id.startsWith('cal-') && S.gym[id].best > 0).length, estrellas: gym.reduce((t, g) => t + (g.best || 0), 0), examenes: Object.values(S.exams || {}).filter(e => e.best >= 60).length, respondidas: S.answered, aciertos: S.correct };
}
function pfCarneHTML() {
  const k = pfCarne(), v = pfNivel(S.xp), cod = typeof Cuenta !== 'undefined' && Cuenta.codigo, desde = typeof Cuenta !== 'undefined' && Cuenta.perfil?.creado_en;
  return `<section class="cn-zona${pfVer.atras ? ' atras' : ''}${pfVer.edita ? ' edita' : ''}" style="--c:${esc(k.color)}"><div class="cn" data-inclina><div class="cn-in">
      <div class="cn-f cn-frente"><span class="cn-marca" aria-hidden="true">ZUKA</span><div class="cn-foto">${pfCara(k)}</div><div class="cn-d"><label class="cn-nom"><span class="hm-sr">Tu nombre</span><input class="name-input" value="${esc(S.name)}" placeholder="Escribe tu nombre" maxlength="24" autocomplete="given-name"${cuentaFija() ? ' readonly title="Lo cambia tu institución"' : ''}></label>
        <p class="cn-niv"><b>Nivel ${v.n}</b> ${v.titulo}</p><span class="cn-barra" role="img" aria-label="Te faltan ${v.falta} XP para el nivel ${v.n + 1}"><i style="width:${(v.p * 100).toFixed(1)}%"></i></span><p class="cn-xp">${S.xp} XP · faltan ${v.falta}</p></div></div>
      <div class="cn-f cn-dorso"><span class="cn-marca" aria-hidden="true">ZUKA</span>${cod ? `<p>Mi código de acceso</p><button class="cn-cod" type="button" data-acct="copia" aria-label="Copiar mi código ${muestraCodigo(cod)}"><b>${muestraCodigo(cod)}</b><span>Copiar</span></button><p class="cn-nota">Con este código entras siempre y conservas tu avance.</p>` : '<p>Tu carné de Zuka</p><p class="cn-nota">Cuando tengas un código de acceso, lo verás aquí.</p>'}${desde ? `<p class="cn-nota">En Zuka desde el ${fechaCorta(desde)}</p>` : ''}</div></div></div>
    <div class="cn-acts"><button class="cn-b" type="button" data-cn="voltea">${ICON.right}<span>${pfVer.atras ? 'Ver el frente' : cod ? 'Ver mi código' : 'Voltear'}</span></button><button class="cn-b" type="button" data-cn="edita" aria-expanded="${pfVer.edita}">${ICON.star}<span>Personalizar</span></button><button class="cn-b prof-gear" type="button" data-settings aria-label="Ajustes">${ICON.gear}<span>Ajustes</span></button></div>
    ${pfVer.edita ? `<div class="cn-edita"><div class="cn-op" role="group" aria-label="Figura">${PF_POSES.map(([p, t]) => `<button type="button" data-pose="${p}" aria-pressed="${p === k.pose}" aria-label="${t}">${pfCara({ pose: p })}</button>`).join('')}</div>
      <div class="cn-op" role="group" aria-label="Color">${PF_COLORES.map((c, i) => `<button type="button" class="col" data-color="${c}" style="--k:${c}" aria-pressed="${c === k.color}" aria-label="Color ${i + 1}"></button>`).join('')}</div></div>` : ''}</section>`;
}
function pfMetaHTML() {
  const hoy = todayXP(), i = Math.max(0, PF_METAS.indexOf(S.goal)), p = PF_METAS.includes(S.goal) ? i / (PF_METAS.length - 1) : 0;
  return `<section class="pf-c pf-meta" style="--p:${p}"><div class="pf-cab"><h2>Meta diaria</h2><p>${hoy} de ${S.goal} XP hoy${hoy >= S.goal ? ' · <b>¡cumplida!</b>' : ''}</p></div>
    <div class="pm-hoy">${aroHTML(hoy / S.goal, hoy >= S.goal ? ICON.check : ICON.bolt)}<p class="pm-n"><b>${S.goal}</b> XP <span>más o menos ${Math.ceil(S.goal / 10)} ${Math.ceil(S.goal / 10) === 1 ? 'lección' : 'lecciones'} al día</span></p></div>
    <div class="pm-riel" role="slider" tabindex="0" aria-label="Meta diaria" aria-valuemin="${PF_METAS[0]}" aria-valuemax="${PF_METAS[PF_METAS.length - 1]}" aria-valuenow="${S.goal}" aria-valuetext="${S.goal} XP al día"><span class="pm-l"></span>${PF_METAS.map((g, k) => `<i style="left:${k / (PF_METAS.length - 1) * 100}%"></i>`).join('')}<span class="pm-k"></span></div>
    <div class="pm-op" aria-hidden="true">${['Suave', 'Normal', 'Firme', 'Intensa'].map((t, k) => `<button type="button" style="left:${k / 3 * 100}%" tabindex="-1" data-meta="${PF_METAS[k]}">${t}</button>`).join('')}</div></section>`;
}
function pfMapaHTML() {
  const now = new Date(), m = pfMapa(S.days, dkActive(now), now), n = streakNow(), dias = m.filter(x => x.lit).length;
  const meses = Array.from({ length: 18 }, (_, s) => { const d = m[s * 7].d, a = s ? m[(s - 1) * 7].d : null; return !a || a.getMonth() !== d.getMonth() ? d.toLocaleDateString('es', { month: 'short' }).replace('.', '') : ''; });
  return `<section class="pf-c pf-mapa"><div class="pf-cab"><h2>Actividad</h2><button class="dk-link pf-mas" type="button" data-dk="streak">Ver el mes</button></div>
    <div class="pm-cifras"><p class="fuego">${ICON.flame}<b>${n}</b> ${n === 1 ? 'día' : 'días'} de racha</p><p>${ICON.trophy}<b>${Math.max(S.maxStreak || 0, n)}</b> la más larga</p><p>${ICON.calendar}<b>${dias}</b> ${dias === 1 ? 'día' : 'días'} en 18 semanas</p></div>
    <div class="pm-mapa" tabindex="0" role="group" aria-label="Actividad por día. Usa las flechas."><div class="pm-meses" aria-hidden="true">${meses.map((t, s) => `<span style="grid-column:${s + 1}">${t}</span>`).join('')}</div><div class="pm-g">${m.map((x, i) => (x.futuro ? '<span class="no"></span>' : `<button type="button" tabindex="-1" data-dia="${i}" class="f${pfFuerza(x, S.goal)}${x.hoy ? ' hoy' : ''}" aria-label="${x.d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}: ${x.lit ? (x.xp ? `${x.xp} XP` : 'con actividad') : 'sin actividad'}"></button>`)).join('')}</div></div>
    <p class="pm-dia" role="status">Toca un día para ver cuánto hiciste.</p></section>`;
}
function pfLogrosHTML() {
  const xs = pfLogros(pfDatos()), ok = xs.filter(x => x.ok).length;
  return `<section class="pf-c pf-logros"><div class="pf-cab"><h2>Logros</h2><p>${ok} de ${xs.length}</p></div><ul class="pf-lg">${xs.map(x => `<li><button type="button" class="lg-b${x.ok ? ' ok' : ''}" data-logro="${x.id}" aria-expanded="false"><span class="lg-in"><span class="lg-f">${aroHTML(x.v / x.meta, ICON[x.icono] || ICON.star)}<b>${x.t}</b><small>${x.ok ? 'Conseguido' : `${x.v} de ${x.meta}`}</small></span><span class="lg-a" aria-hidden="true">${x.p}${x.ok ? '' : `<i>Te ${x.meta - x.v === 1 ? 'falta' : 'faltan'} ${x.meta - x.v}</i>`}</span></span><span class="hm-sr">. ${x.p}</span></button></li>`).join('')}</ul></section>`;
}
function pfCursosHTML() {
  const mine = myCourses();
  return `<section class="pf-c pf-cursos"><div class="pf-cab"><h2>Tus cursos</h2></div>${mine.length ? `<div class="pc-l">${mine.map(c => { const ls = lessonsOf(c), d = ls.filter(isDone).length; return `<button type="button" data-dk-open="${c.id}" style="--c:${c.color}">${aroHTML(d / ls.length, courseArt(c, 'md'))}<span><b>${esc(c.name)}</b><small>${d} de ${ls.length} lecciones</small></span>${ICON.right}</button>`; }).join('')}</div>` : cuentaDeColegio() ? '<p class="pc-no">Tu institución aún no te asigna cursos.</p>' : '<p class="pc-no">Aún no has comprado ningún curso.</p><button class="btn ghost" type="button" data-dk="tienda">Ver la tienda</button>'}</section>`;
}
// ---------- vida ----------
function pfBind(root) {
  const zona = () => $('.cn-zona', root), q = s => $(s, root);
  const carne = foco => { const t = document.createElement('template'); t.innerHTML = pfCarneHTML().trim(); const f = t.content.firstElementChild; f.classList.add('quieta'); zona().replaceWith(f); ligaCarne(); if (foco) q(foco)?.focus({ preventScroll: true }); };
  const ligaCarne = () => {
    const z = zona(), nom = $('.name-input', z), dorso = () => { $('.cn-frente', z).inert = pfVer.atras; $('.cn-dorso', z).inert = !pfVer.atras; };
    dorso(); inclina(z); cuentaBind(z);
    if (!nom.readOnly) nom.oninput = () => { S.name = nom.value.trim(); save(); };
    if (!nom.readOnly) nom.onchange = () => { S.name = nom.value = nom.value.trim(); save(); if (pfCarne().pose === 'letra') $('.cn-foto', z).innerHTML = pfCara(pfCarne()); };
    nom.onkeydown = e => { if (e.key === 'Enter') nom.blur(); };
    z.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.cn === 'voltea') { pfVer.atras = !pfVer.atras; z.classList.toggle('atras', pfVer.atras); $('span', b).textContent = pfVer.atras ? 'Ver el frente' : Cuenta.codigo ? 'Ver mi código' : 'Voltear'; return dorso(); }
      if (b.dataset.cn === 'edita') { pfVer.edita = !pfVer.edita; return carne('[data-cn="edita"]'); }
      if (b.dataset.pose || b.dataset.color) { S.carne = { ...pfCarne(), ...(b.dataset.pose ? { pose: b.dataset.pose } : { color: b.dataset.color }), at: Date.now() }; save(); carne(b.dataset.pose ? `[data-pose="${b.dataset.pose}"]` : `[data-color="${b.dataset.color}"]`); }
    };
    $('[data-settings]', z).onclick = () => { profileSub = 'settings'; renderProfile(); view.scrollTop = 0; $('[data-back]', view).focus({ preventScroll: true }); };
  };
  ligaCarne();
  // Meta: se arrastra, con flechas o tocando el nombre. La app entera usa S.goal.
  const pon = (g, foco) => { if (g === S.goal) return pintaMeta(); S.goal = g; save(); const t = document.createElement('template'); t.innerHTML = pfMetaHTML().trim(); q('.pf-meta').replaceWith(t.content.firstElementChild); ligaMeta(); if (foco) q('.pm-riel').focus({ preventScroll: true }); pintaMapa(); };
  const pintaMeta = () => q('.pf-meta').style.setProperty('--p', Math.max(0, PF_METAS.indexOf(S.goal)) / (PF_METAS.length - 1));
  const ligaMeta = () => {
    const r = q('.pm-riel'), cerca = e => { const b = r.getBoundingClientRect(), p = Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)); return [p, PF_METAS[Math.round(p * (PF_METAS.length - 1))]]; };
    let id = null;
    r.onpointerdown = e => { if (e.button) return; id = e.pointerId; r.setPointerCapture(id); r.classList.add('mano'); r.onpointermove(e); };
    r.onpointermove = e => { if (e.pointerId !== id) return; const [p, g] = cerca(e); q('.pf-meta').style.setProperty('--p', p.toFixed(3)); q('.pm-n b').textContent = g; };
    const fin = e => { if (e.pointerId !== id) return; id = null; r.classList.remove('mano'); if (pfVer.pend) { pfVer.pend = false; setTimeout(() => { if (tab === 'profile' && !profileSub) renderProfile(); }); } if (e.type === 'pointerup') pon(cerca(e)[1], true); else { q('.pm-n b').textContent = S.goal; pintaMeta(); } };
    r.onpointerup = fin; r.onpointercancel = fin;
    r.onkeydown = e => { const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, Home: -9, End: 9 }[e.key]; if (!k) return; e.preventDefault(); pon(PF_METAS[Math.max(0, Math.min(PF_METAS.length - 1, Math.max(0, PF_METAS.indexOf(S.goal)) + k))], true); };
    root.querySelectorAll('[data-meta]').forEach(b => { b.onclick = () => pon(+b.dataset.meta, true); });
  };
  ligaMeta();
  const m = pfMapa(S.days, dkActive(new Date()), new Date()), caja = q('.pm-mapa');
  const pintaMapa = () => caja.querySelectorAll('[data-dia]').forEach(b => { const x = m[+b.dataset.dia]; b.className = `f${pfFuerza(x, S.goal)}${x.hoy ? ' hoy' : ''}${pfVer.dia === x.key ? ' on' : ''}`; });
  const dia = i => { const x = m[i]; if (!x || x.futuro) return; pfVer.dia = x.key; pintaMapa(); $('.pm-dia', root).innerHTML = `<b>${esc(x.d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' }))}</b>: ${x.lit ? (x.xp ? `${x.xp} XP${x.xp >= S.goal ? ', meta cumplida' : ''}` : 'con actividad') : 'sin actividad'}`; caja.querySelector(`[data-dia="${i}"]`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' }); };
  caja.onclick = e => { const b = e.target.closest('[data-dia]'); if (b) dia(+b.dataset.dia); };
  caja.onkeydown = e => { const k = { ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = m.findIndex(x => x.key === pfVer.dia); dia(i < 0 ? m.findIndex(x => x.hoy) : i + k); };
  caja.scrollLeft = caja.scrollWidth;
  const sel = m.findIndex(x => x.key === pfVer.dia); if (sel >= 0) dia(sel);
  root.querySelectorAll('[data-logro]').forEach(b => { b.onclick = () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); }; });
}
;
//#archivo js/app.js
// Zuka: estado persistente, navegación por pestañas, ruta de aprendizaje, feed de clips,
// lecciones con vidas/XP/racha y perfil.

const KEY = 'zuka-v1';
const HEART_MS = 20 * 60 * 1000; // una vida cada 20 minutos
const DEFAULTS = () => ({
  name: '', xp: 0, done: {}, exams: {}, watched: {}, likes: {}, saved: {}, course: 'algebra',
  streak: 0, maxStreak: 0, days: {}, lastDay: null, hearts: 5, heartsAt: Date.now(), today: { day: null, xp: 0 },
  goal: 30, correct: 0, answered: 0, voice: false, sfx: true, theme: 'system', hideInstall: false, videoQuality: 'auto', videoMuted: false, videoSpeed: 1,
  // Modo revisión: todas las lecciones abiertas y sin perder vidas, para revisar el contenido mientras
  // se construye. Se apaga en Perfil → Ajustes (o aquí, con false, antes de abrirla a estudiantes).
  unlockAll: true,
  tourDone: false,   // recorrido guiado de bienvenida (js/tour.js): ya visto o saltado
  guides: {}, guideAuto: true,   // guías «Cómo se juega» ya vistas, por juego o tipo de ejercicio (js/guia.js)
  tutorias: [],      // asesorías separadas en la pestaña Tutorías (js/tutorias.js)
  cuenta: null,      // última copia de la cuenta y su plan (js/cuenta.js), para abrir sin conexión
  secs: {},          // segundos vistos del video de cada lección
});

let S = (() => {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { /* almacenamiento no disponible */ }
  return Object.assign(DEFAULTS(), s || {});
})();
// Si el almacenamiento está lleno o cerrado (modo privado), el avance de la sesión no queda: se avisa una vez.
let saveFallo = false;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { if (!saveFallo) { saveFallo = true; if (typeof toast === 'function') toast('No se pudo guardar tu avance en este dispositivo. Libera espacio o sal del modo privado.'); } }
}

const $ = (s, r = document) => r.querySelector(s);
const view = $('#view');

// ---- tema claro / oscuro ----
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  // La portada abre en claro; solo va oscura si alguien eligió el tema oscuro.
  const t = S.theme === 'system' ? (darkQuery.matches && !presentacionClara() ? 'dark' : 'light') : S.theme;
  document.documentElement.dataset.theme = t;
  $('meta[name="theme-color"]').content = t === 'dark' ? '#07080f' : '#f4f6fb';
  setGameTheme(t);   // los minijuegos abiertos se repintan con la paleta del tema
}
darkQuery.addEventListener('change', () => S.theme === 'system' && applyTheme());

// ---- instalación (PWA) ----
let installEvt = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installEvt = e;
  if (tab !== 'clips') go(tab);
});
addEventListener('appinstalled', () => {
  installEvt = null;
  toast('¡Zuka quedó instalada!');
  if (tab !== 'clips') go(tab);
});
async function promptInstall() {
  if (!installEvt) return;
  installEvt.prompt();
  await installEvt.userChoice;
  installEvt = null;
  if (tab !== 'clips') go(tab);
}
function installHelp() {
  if (isIOS) return 'En Safari toca <b>Compartir</b> y luego <b>Añadir a pantalla de inicio</b>.';
  return 'Abre el menú del navegador y elige <b>Instalar app</b> o <b>Añadir a pantalla de inicio</b>.';
}
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js')
    .then(reg => { watchUpdates(reg, navigator.serviceWorker, showUpdateBar); checkOnReturn(reg); })
    .catch(() => {}));
}
// Barra encima del menú inferior: «Actualizar» recarga con la versión nueva; «Más tarde» la
// oculta hasta la próxima vez que se abra la app.
function showUpdateBar(apply, dismiss) {
  if ($('.update-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'update-bar';
  bar.setAttribute('role', 'status');
  bar.innerHTML = `${brainTile()}<div class="ub-text"><b>Hay una versión nueva de Zuka</b><span>Actualiza para tener lo último.</span></div>
    <div class="ub-actions"><button class="btn small main" data-update type="button">Actualizar</button><button class="btn small" data-later type="button">Más tarde</button></div>`;
  $('[data-update]', bar).onclick = () => { $('[data-update]', bar).textContent = 'Actualizando…'; apply(); };
  $('[data-later]', bar).onclick = () => { bar.remove(); dismiss(); };
  document.body.appendChild(bar);
}

// ---- fechas, XP, racha y vidas ----
const dayStr = d => dayKey(d);   // 'AAAA-MM-DD' local, igual que el calendario de actividad (js/ui.js)
const today = () => dayStr(new Date());
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };
const streakNow = () => (S.lastDay === today() || S.lastDay === yesterday() ? S.streak : 0);
const todayXP = () => (S.today.day === today() ? S.today.xp : 0);

function addXP(n) {
  if (S.today.day !== today()) S.today = { day: today(), xp: 0 };
  S.today.xp += n; S.xp += n;
  // XP de cada día, para el calendario de actividad (hoja de racha). Se guardan los 400 días más recientes.
  const days = S.days || (S.days = {});
  days[today()] = (days[today()] || 0) + n;
  const keys = Object.keys(days);
  if (keys.length > 400) keys.sort().slice(0, keys.length - 400).forEach(k => delete days[k]);
  save();
}
function markStreak() {
  if (S.lastDay === today()) return false;
  // La mejor racha anterior se guarda antes de reiniciarla (quien ya usaba la app llega con maxStreak en 0).
  S.maxStreak = Math.max(S.maxStreak || 0, S.streak || 0);
  S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1;
  S.maxStreak = Math.max(S.maxStreak || 0, S.streak);
  S.lastDay = today(); save();
  return true;
}
function syncHearts() {
  if (S.hearts >= 5) { S.heartsAt = Date.now(); return; }
  const n = Math.floor((Date.now() - S.heartsAt) / HEART_MS);
  if (n > 0) { S.hearts = Math.min(5, S.hearts + n); S.heartsAt += n * HEART_MS; save(); }
}
function loseHeart() {
  if (S.unlockAll) return;   // en modo revisión no se pierden vidas
  if (S.hearts >= 5) S.heartsAt = Date.now();
  S.hearts = Math.max(0, S.hearts - 1); save();
}
const minsToHeart = () => Math.max(1, Math.ceil((S.heartsAt + HEART_MS - Date.now()) / 60000));

// ---- cursos ----
// Solo entre los cursos que esta cuenta puede ver (js/cuenta.js): los estudiantes, los habilitados.
const courseById = id => cursosVisibles().find(c => c.id === id) || cursosVisibles()[0];
const lessonsOf = c => c.units.flatMap(u => u.lessons);
const isDone = l => !!S.done[l.id];
// Componentes (c.blocks, curso Preuniversitario UdeA): cada uno se abre por su cuenta, así que la primera lección
// de cada componente está abierta aunque el anterior no se haya terminado.
const blockStart = (c, l) => !!c.blocks && c.units.some((u, i) => u.lessons[0] === l && u.block && (i === 0 || c.units[i - 1].block !== u.block));
function isUnlocked(c, l) {
  if (S.unlockAll) return true;   // modo revisión: todo abierto
  const ls = lessonsOf(c), i = ls.indexOf(l);
  return i <= 0 || blockStart(c, l) || isDone(l) || isDone(ls[i - 1]);
}
function findLesson(id) {
  for (const c of COURSES) for (const l of lessonsOf(c)) if (l.id === id) return { c, l };
}
// clipsOf y buildQueue (orden de videos y ejercicios) viven en content.js.
const clipSecs = l => clipsOf(l).reduce((t, c) => t + (c.duration ?? c.scenes.reduce((s, x) => s + x.d, 0)), 0);

// ---- navegación ----
let tab = 'learn', cleanup = null;
// Cierra la clase abierta (pide confirmación si hay progreso); null cuando no hay clase.
let lessonClose = null;
function go(t) {
  if (['tienda', 'tutorias'].includes(t) && cuentaDeColegio()) t = 'home';   // un estudiante de colegio no compra ni separa asesorías
  if (t === 'portal' && !portalPuede()) t = 'home';
  if (t !== 'portal') portalVe(false);
  cleanup?.(); cleanup = null;
  tab = t;
  document.body.dataset.tab = t;
  // La vista de un curso ('learn') no tiene botón propio: se marca «Mis cursos» (spec 2026-11-19-inicio-mis-cursos).
  document.querySelectorAll('#tabbar button').forEach(b => b.classList.toggle('on', b.dataset.tab === (t === 'learn' || t === 'gym' ? 'cursos' : t)));
  renderTop();
  ({ home: renderHome, cursos: renderMyCourses, learn: renderLearn, gym: renderGym, clips: renderClips, tienda: renderTienda, portal: renderPortal, tutorias: renderTutorias, profile: renderProfile })[t]();
}

// Números largos de la barra de arriba: 12450 → «12.4 k», para que quepa el nombre del curso.
const shortNum = n => (n >= 10000 ? `${Math.floor(n / 100) / 10} k` : String(n));
function renderTop() {
  syncHearts();
  document.body.classList.toggle('de-colegio', cuentaDeColegio()); portalMarca();
  // Solo racha y experiencia, más grandes; sin la marca ni las vidas (las vidas se ven dentro de la lección).
  // Pedido del 2026-11-19: la app ocupa la pantalla de arriba abajo (spec 2026-11-19-pantalla-completa).
  $('#topbar').innerHTML = `<button class="tb-logo-d" type="button" data-home aria-label="Ir al inicio">${zukaWord()}</button>
    <div class="tb-pie">${cuentaEsAdmin() ? `<a class="tb-admin" href="admin/">${ICON.gear}<span>Administrar</span></a>` : ''}<div class="tb-stats">
      <button class="tb-stat streak${S.lastDay === today() ? ' lit' : ''}" data-streak aria-label="Racha: ${streakNow()} ${streakNow() === 1 ? 'día' : 'días'}. Ver tu actividad">${ICON.flame}<b>${streakNow()}</b></button>
      <span class="tb-stat xp" title="Experiencia: ${S.xp} XP">${ICON.bolt}<b>${shortNum(S.xp)}</b></span>
    </div></div>`;
  $('#topbar [data-streak]').onclick = openStreakSheet;
  $('#topbar [data-home]').onclick = () => { profileSub = null; go('home'); };   // logo del menú de escritorio (css/escritorio.css)
}

// ---- hojas inferiores ----
// La hoja es un diálogo modal (spec 2026-11-18-foco-y-teclado): lleva el foco adentro, Tab da la vuelta sin salirse,
// Escape la cierra, lo de atrás queda inerte (ni Tab ni el lector de pantalla lo alcanzan) y al cerrar el foco vuelve
// a quien la abrió. sheetOpener se recuerda solo al abrir: una hoja que reemplaza a otra no lo pisa. sheetIsOpen se pone
// en el acto (la clase 'open' llega un cuadro después, para la animación). Cerrada, la hoja misma queda inerte.
let sheetOpener = null, sheetIsOpen = false, sheetInerted = [];
const SHEET_BEHIND = ['#topbar', '#view', '#tabbar', '#overlay', '#auth', '#tienda', '#lector'];
const sheetFocusables = card => [...card.querySelectorAll(FOCUSABLE)].filter(x => x.offsetParent !== null || x === document.activeElement);
function sheetKey(e) {
  const card = $('#sheet .sheet-card');
  // Un diálogo, la guía o el recorrido encima de la hoja manejan sus propias teclas.
  if (!sheetIsOpen || !card || dialogOpen() || $('.guide-card, .tour-tip')) return;
  // Ninguna tecla sigue a la lección de atrás (allá Enter comprueba y las flechas cambian de ejercicio).
  e.stopPropagation();
  if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
  if (e.key !== 'Tab') return;
  const fs = sheetFocusables(card);
  const to = trapIndex(e.shiftKey, fs.indexOf(document.activeElement), fs.length);
  if (to === -2) { e.preventDefault(); card.focus({ preventScroll: true }); }
  else if (to >= 0) { e.preventDefault(); fs[to].focus({ preventScroll: true }); }
}
function openSheet(html, bind) {
  const sh = $('#sheet');
  if (!sheetIsOpen) {
    sheetOpener = document.activeElement;
    // Solo se vuelve inerte lo que no lo estaba, y al cerrar solo eso se devuelve.
    sheetInerted = SHEET_BEHIND.map(s => $(s)).filter(el => el && !el.inert);
    sheetInerted.forEach(el => { el.inert = true; });
  }
  sheetIsOpen = true;
  sh.inert = false;
  sh.innerHTML = `<div class="sheet-bg"></div><div class="sheet-card" role="dialog" aria-modal="true" tabindex="-1"><div class="grabber"></div>${html}</div>`;
  const card = $('.sheet-card', sh), title = card.querySelector('h1, h2, h3');
  if (title) { title.id ||= 'sheet-title'; card.setAttribute('aria-labelledby', title.id); } else card.setAttribute('aria-label', 'Hoja');
  requestAnimationFrame(() => { if (sheetIsOpen) sh.classList.add('open'); });
  sh.querySelector('.sheet-bg').onclick = () => closeSheet();
  document.removeEventListener('keydown', sheetKey, true);
  document.addEventListener('keydown', sheetKey, true);
  bind?.(sh);
  // El foco entra a la hoja: a su primer botón o enlace visible, o a la tarjeta si no tiene ninguno.
  (sheetFocusables(card)[0] || card).focus({ preventScroll: true });
}
// restore = false cuando la hoja da paso a otra vista (una lección, un examen): el foco no vuelve al mapa de atrás.
function closeSheet(restore = true) {
  const sh = $('#sheet');
  if (!sheetIsOpen) return;
  sheetIsOpen = false;
  sh.classList.remove('open');
  sh.inert = true;   // cerrada no se alcanza con Tab aunque siga en la página
  sheetInerted.forEach(el => { el.inert = false; });
  sheetInerted = [];
  document.removeEventListener('keydown', sheetKey, true);
  const back = sheetOpener; sheetOpener = null;
  if (restore && back && back.isConnected && !sh.contains(back)) back.focus({ preventScroll: true });
}

function openCoursePicker() {
  openSheet(`<h3 class="sheet-title">Elige un curso</h3><div class="course-list">${cursosVisibles().map(c => {
    const ls = lessonsOf(c), d = ls.filter(isDone).length;
    return `<button class="course-row${c.id === S.course ? ' on' : ''}" data-id="${c.id}" style="--c:${c.color}">
      ${courseArt(c, 'lg')}
      <span class="cr-body"><span class="eyebrow">${cursoBorrador(c) ? 'Borrador · ' : ''}${esc(c.level)} · ${ls.length} lecciones</span><b>${esc(c.name)}</b>
      <span class="mini-bar"><i style="width:${(d / ls.length) * 100}%"></i></span></span>
      ${d === ls.length ? `<span class="cr-done">${ICON.check}</span>` : ''}</button>`;
  }).join('')}</div>`, sh => sh.querySelectorAll('.course-row').forEach(b => b.onclick = () => {
    S.course = b.dataset.id; openWorld = null; openBlock = null; save(); closeSheet(false); go('learn'); view.scrollTop = 0;
  }));
}

// Hoja de racha = actividad: el mes en una cuadrícula con los días con actividad (S.days y la racha viva),
// flechas para ver meses anteriores y tres fichas (racha, XP de hoy, racha máxima).
function openStreakSheet() {
  const n = streakNow(), lit = S.lastDay === today(), now = new Date();
  const active = new Set([...Object.keys(S.days || {}), ...streakDays(S.lastDay, n, now)]);
  let off = 0;   // meses hacia atrás: 0 es el actual, −11 el más viejo que se muestra
  const cal = () => {
    const d = new Date(now.getFullYear(), now.getMonth() + off, 1);
    return `<div class="act-nav">
        <button class="icon-btn" data-month="-1" aria-label="Mes anterior"${off > -11 ? '' : ' disabled'}>${ICON.back}</button>
        <b>${d.toLocaleDateString('es', { month: 'long', year: 'numeric' })}</b>
        <button class="icon-btn" data-month="1" aria-label="Mes siguiente"${off ? '' : ' disabled'}>${ICON.right}</button></div>
      <ol class="act-grid" aria-label="Días con actividad">${[...'LMXJVSD'].map(l => `<li class="act-dow" aria-hidden="true">${l}</li>`).join('')}${
        monthGrid(d.getFullYear(), d.getMonth(), active, now).map(c =>
          `<li class="${c.out ? 'out' : ''}${c.lit ? ' lit' : ''}${c.today ? ' today' : ''}"${c.lit ? ` aria-label="${c.d}, con actividad"` : c.today ? ` aria-label="${c.d}, hoy"` : ''}><span>${c.d}</span></li>`).join('')}</ol>`;
  };
  openSheet(`<div class="act-sheet">
    <h3 class="sheet-title">Actividad</h3>
    <p class="muted">${lit ? '¡Hoy ya sumaste! Vuelve mañana para seguir tu racha.' : n ? 'Completa una lección hoy para no perder tu racha.' : 'Completa una lección para empezar tu racha.'}</p>
    <div class="act-cal">${cal()}</div>
    <div class="act-tiles">
      <p class="fire${lit ? ' lit' : ''}">${ICON.flame}<b>${n}</b><span>${n === 1 ? 'Día de racha' : 'Días de racha'}</span></p>
      <p class="gold">${ICON.bolt}<b>${todayXP()}</b><span>XP hoy</span></p>
      <p class="brand">${ICON.trophy}<b>${Math.max(S.maxStreak || 0, n)}</b><span>Racha máxima</span></p>
    </div>
  </div>`, sh => {
    const box = $('.act-cal', sh);
    box.onclick = e => {
      const b = e.target.closest('[data-month]');
      if (!b || b.disabled) return;
      off = Math.max(-11, Math.min(0, off + +b.dataset.month));
      box.innerHTML = cal();
      ($(`[data-month="${b.dataset.month}"]:not(:disabled)`, box) || $('[data-month]:not(:disabled)', box))?.focus();   // en el tope, a la otra flecha
    };
  });
}

function openLessonSheet(c, l) {
  if (planMotivo(l.id)) return openBloqueo(l.id);   // candado por plan (js/cuenta.js)
  const locked = !isUnlocked(c, l);
  clipsOf(l).forEach(k => k.bunny && cuentaVideoBase(k.bunny).catch(() => {}));   // adelanta el enlace del video
  openSheet(`<div class="ls" style="--c:${c.color}">
    <p class="eyebrow">${esc(c.name)}</p><h3>${esc(l.title)}</h3>
    <p class="ls-meta"><span>${ICON.clips} ${clipSecs(l) >= 90 ? `Video de ${Math.round(clipSecs(l) / 60)} min` : `Clip de ${clipSecs(l)} s`}</span><span>${ICON.target} ${l.ex.length} ejercicios</span></p>
    ${locked
      ? '<p class="muted">Completa la lección anterior para desbloquear esta.</p><button class="btn" disabled>Bloqueada</button>'
      : `<button class="btn" data-go>${isDone(l) ? 'Repasar · +5 XP' : 'Empezar · +10 XP'}</button>`}
  </div>`, sh => sh.querySelector('[data-go]')?.addEventListener('click', () => { closeSheet(false); startLesson(c, l); }));
}

// Jefe final de un mundo (unit.boss): una batalla que usa todo lo del mundo. Se abre al terminar sus lecciones.
const bossUnlocked = u => S.unlockAll || u.lessons.every(isDone);
function openBossSheet(c, u) {
  if (planMotivo(u.boss.id)) return openBloqueo(u.boss.id);
  const b = u.boss, open = bossUnlocked(u);
  openSheet(`<div class="ls" style="--c:${c.color}">
    <p class="eyebrow">Jefe final · ${esc((WORLDS[u.world] || {}).name || u.title)}</p><h3>${esc(b.title)}</h3>
    <p class="ls-meta"><span>${ICON.crown} Batalla por turnos</span><span>${ICON.clock} Sin reloj: se gana pensando</span></p>
    ${open
      ? `<button class="btn" data-go>${isDone(b) ? 'Volver a pelear · +5 XP' : 'Pelear · +10 XP'}</button>`
      : '<p class="muted">Completa las lecciones de este mundo para enfrentar al jefe.</p><button class="btn" disabled>Bloqueado</button>'}
  </div>`, sh => sh.querySelector('[data-go]')?.addEventListener('click', () => { closeSheet(false); startLesson(c, b); }));
}

// ---- pestaña Aprender ----
const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];
const PATH_STEP = 196;   // alto de cada fila de nivel (igual a .node-wrap en styles.css)
const W_OFFSETS = [0, 62, 0, -62];   // zigzag del camino de mundos
const WORLD_STEP = 236;  // alto de cada fila de mundo (igual a .wnode-wrap; el botón mide 128 px)
let openWorld = null;    // { course, i }: mundo abierto en la pestaña Aprender (null = mapa de mundos)
// Cursos con componentes (c.blocks, Preuniversitario UdeA): al entrar se elige primero el componente y luego se ven solo
// sus mundos. openBlock = { course, id } es el componente abierto; null = la pantalla para elegirlo.
let openBlock = null;
// Número del mundo para mostrar: dentro de su componente (el primer mundo de Lectura es el 1); sin componentes, el de siempre.
const worldNo = (c, ui) => (c.blocks ? c.units.slice(0, ui + 1).filter(u => u.block === c.units[ui].block).length : ui + 1);
function worldInfo(c, u) {
  const wDone = u.lessons.filter(isDone).length;
  return { w: WORLDS[u.world] || { name: u.title, art: '' }, wDone, all: wDone === u.lessons.length,
    closed: u.lessons.every(l => !isUnlocked(c, l) || !!planMotivo(l.id)) };
}
// Lección que toca: la primera sin terminar. En un curso con componentes, la del componente que se estudió por
// última vez (S.lastLesson), para que quien va por Lectura no vea «Sigue aquí» en Razonamiento.
const blockOf = (c, l) => c.units.find(u => u.lessons.includes(l))?.block;
function currentLesson(c, block) {
  const ls = lessonsOf(c);
  if (block) return ls.find(l => !isDone(l) && blockOf(c, l) === block);   // la que toca dentro de un componente
  if (c.blocks) {
    const last = ls.find(l => l.id === S.lastLesson), b = last && blockOf(c, last);
    const inBlock = b && ls.find(l => !isDone(l) && blockOf(c, l) === b);
    if (inBlock) return inBlock;
  }
  return ls.find(l => !isDone(l));
}
// Pantalla de entrada de un curso con componentes: la portada del curso y una tarjeta por componente, con sus mundos,
// sus lecciones, el avance y la lección que sigue. Tocar una tarjeta abre los mundos de ese componente.
// Mundos de un curso que aún no están escritos (c.soon): salen debajo del mapa de su componente con sus lecciones, sin abrirse.
const soonOf = (c, block) => (c.soon || []).filter(u => !block || u.block === block.id);
function soonHTML(c, block) {
  const l = soonOf(c, block), n0 = c.units.filter(u => !block || u.block === block.id).length;
  return !l.length ? '' : `<section class="soon"><h2>En preparación</h2><p>Los mundos que siguen en este componente.</p><ol>${l.map((u, i) =>
    `<li><small>Mundo ${n0 + i + 1} · ${esc(u.area)}</small><b>${esc(u.title)}</b><span>${u.lessons.map(esc).join(' · ')}</span></li>`).join('')}</ol></section>`;
}
function renderComponents(c) {
  const ls = lessonsOf(c), doneN = ls.filter(isDone).length;
  const lastL = ls.find(l => l.id === S.lastLesson), last = lastL && blockOf(c, lastL), cur = currentLesson(c);
  view.innerHTML = `<div class="learn cv" style="--c:${c.color}">
    <div class="cv-side">${courseHeadHTML(c)}
    ${cur ? continueCardHTML(c, cur, ls.filter(l => blockOf(c, l) === blockOf(c, cur))) : ''}${accesoAvisoHTML(c)}</div>
    <div class="cv-main"><h2 class="comp-title">Elige un componente</h2>
    <div class="comp-list">${c.blocks.map((b, k) => {
      const bl = ls.filter(l => blockOf(c, l) === b.id), d = bl.filter(isDone).length, nw = c.units.filter(u => u.block === b.id).length;
      const nxt = currentLesson(c, b.id), here = b.id === last;
      return `<button class="comp-card${here ? ' here' : ''}" data-block="${b.id}" type="button"
        aria-label="Componente ${k + 1}: ${esc(b.name)}. ${nw} ${nw === 1 ? 'mundo' : 'mundos'}, ${d} de ${bl.length} lecciones${here ? ', aquí ibas' : ''}">
        ${blockArt(c, b) || `<span class="comp-n" aria-hidden="true">${k + 1}</span>`}
        <span class="comp-body"><small>Componente ${k + 1}${here ? ' · aquí ibas' : ''}</small><b>${esc(b.name)}</b><span class="comp-desc">${esc(b.desc)}</span>
          <span class="comp-stats">${nw} ${nw === 1 ? 'mundo' : 'mundos'} · ${bl.length} lecciones${soonOf(c, b).length ? ` · ${soonOf(c, b).length} en preparación` : ''}</span>
          <span class="comp-prog"><span class="mini-bar"><i style="width:${(d / bl.length) * 100}%"></i></span><small>${d}/${bl.length}</small></span>
          <span class="comp-next">${nxt ? `${d ? 'Sigue' : 'Empieza'}: ${esc(nxt.title)}` : soonOf(c, b).length ? 'Al día con lo publicado' : 'Componente completado'}</span></span>
        ${dkMundosHTML(c, b)}
        <span class="comp-go" aria-hidden="true">${ICON.right}</span></button>`;
    }).join('')}</div>
    ${doneN === ls.length && !soonOf(c).length ? `<div class="course-done">${ICON.star}<div><b>¡Curso completado!</b><p>Repasa cualquier lección o prueba otro curso.</p></div></div>` : ''}
    ${simIcfHTML(c)}${c.id === 'preuda' && !cuentaDeColegio() ? librosHTML() : ''}</div>
    ${gymFabHTML(c, courseLevelUi(c, null, { done: S.done, last: S.lastLesson }))}
  </div>`;
  view.querySelectorAll('[data-block]').forEach(b => b.onclick = () => {
    openBlock = { course: c.id, id: b.dataset.block }; renderLearn(); $('[data-back]', view)?.focus({ preventScroll: true });
  });
  $('[data-continue]', view)?.addEventListener('click', () => startLesson(c, cur));
  bindCourseHead(); bindAccesoAviso(); bindGymFab(c); bindLibros(view); simIcfBind(view);
  view.scrollTop = 0;
}
function renderLearn() {
  const c = courseById(S.course);
  enroll(c.id);   // el curso que se ve queda en Mis cursos (recorrido, canje, ?tab=learn…)
  if (openWorld?.course === c.id && c.units[openWorld.i]) return renderWorld(c, openWorld.i);
  openWorld = null;
  if (c.blocks && openBlock?.course !== c.id) return renderComponents(c);
  // Con componentes, todo lo de esta vista (avance, «Sigue aquí», mapa) es solo del componente abierto.
  const block = c.blocks ? c.blocks.find(b => b.id === openBlock.id) || c.blocks[0] : null, bn = block ? c.blocks.indexOf(block) + 1 : 0;
  const ls = block ? lessonsOf(c).filter(l => blockOf(c, l) === block.id) : lessonsOf(c), doneN = ls.filter(isDone).length;
  const idx = c.units.map((u, i) => (!block || u.block === block.id ? i : -1)).filter(i => i >= 0);
  const cur = block ? currentLesson(c, block.id) : currentLesson(c);
  view.innerHTML = `<div class="learn cv" style="--c:${c.color}">
    <div class="cv-side">${block ? `<button class="world-back" data-back>${ICON.back}<span>Componentes</span></button>` : ''}
    ${courseHeadHTML(c, block)}
    ${cur ? continueCardHTML(c, cur, ls) : ''}${accesoAvisoHTML(c)}</div>
    <div class="cv-main">
    ${installEvt && !S.hideInstall ? `<section class="install-banner">
      <img src="icons/zuka-claro-192.png" alt="" width="44" height="44">
      <div><b>Instala Zuka</b><p>Ábrela como app, incluso sin conexión.</p></div>
      <button class="btn brand sm" data-install>Instalar</button>
      <button class="icon-btn" data-hide-install aria-label="Ocultar">${ICON.x}</button>
    </section>` : ''}
    <h2 class="dk cv-title">${block ? 'Mundos del componente' : 'Mundos del curso'}</h2>
    <div class="world-map" role="list">
      <svg class="trail" width="1" height="1" overflow="visible" aria-hidden="true"><path d="${worldTrail(idx.map((_, k) => W_OFFSETS[k % W_OFFSETS.length]), WORLD_STEP, 64)}"/></svg>
      ${idx.map((ui, k) => {
        const u = c.units[ui], { w, wDone, all, closed } = worldInfo(c, u), here = !!cur && u.lessons.includes(cur);
        return `<div class="wnode-wrap${closed ? ' closed' : ''}${all ? ' complete' : ''}" role="listitem" style="--x:${W_OFFSETS[k % W_OFFSETS.length]}px">
          ${here ? '<span class="start-bubble" aria-hidden="true">AQUÍ VAS</span>' : ''}
          <button class="wnode${here ? ' current' : ''}" data-world="${ui}" style="--p:${wDone / u.lessons.length}"
            aria-label="Mundo ${worldNo(c, ui)}: ${esc(w.name)}, ${wDone} de ${u.lessons.length} niveles${here ? ', aquí vas' : ''}">
            <span class="wnode-art">${w.art}</span>
            ${all ? `<span class="wnode-badge">${ICON.star}</span>` : closed ? `<span class="wnode-badge">${ICON.lock}</span>` : ''}
          </button>
          <span class="wnode-label" aria-hidden="true"><small>Mundo ${worldNo(c, ui)} · ${wDone}/${u.lessons.length}</small>${esc(w.name)}</span>
          <span class="dk mini-bar" aria-hidden="true"><i style="width:${(wDone / u.lessons.length) * 100}%"></i></span></div>`;
      }).join('')}
    </div>
    ${soonHTML(c, block)}
    ${cur ? '' : block ? `<div class="course-done">${ICON.star}<div><b>${soonOf(c, block).length ? 'Vas al día: terminaste los mundos publicados' : '¡Componente completado!'}</b><p>Repasa cualquier lección o vuelve a los componentes.</p></div></div>`
      : `<div class="course-done">${ICON.star}<div><b>¡Curso completado!</b><p>Repasa cualquier lección o prueba otro curso.</p></div></div>`}</div>
    ${gymFabHTML(c, courseLevelUi(c, block, { done: S.done, last: S.lastLesson }))}
  </div>`;
  view.querySelectorAll('.wnode').forEach(b => b.onclick = () => {
    openWorld = { course: c.id, i: +b.dataset.world }; renderLearn(); $('[data-back]', view).focus({ preventScroll: true });
  });
  $('[data-continue]', view)?.addEventListener('click', () => startLesson(c, cur));
  $('[data-back]', view)?.addEventListener('click', () => {
    openBlock = null; renderLearn();
    const card = view.querySelector(`[data-block="${block.id}"]`);
    card?.scrollIntoView({ block: 'center' }); card?.focus({ preventScroll: true });
  });
  $('[data-install]', view)?.addEventListener('click', promptInstall);
  $('[data-hide-install]', view)?.addEventListener('click', () => { S.hideInstall = true; save(); renderLearn(); });
  bindCourseHead(); bindAccesoAviso(); bindGymFab(c);
  view.scrollTop = 0;   // arriba queda «Sigue aquí»; el mapa de mundos está debajo
}

// Vista de un mundo: su tarjeta y el camino de sus niveles (lecciones).
function renderWorld(c, ui) {
  const u = c.units[ui], cur = currentLesson(c, u.block);   // la que toca en el componente de este mundo
  const { w, wDone, all, closed } = worldInfo(c, u);
  // El jefe final y la evaluación del mundo (si tiene) son nodos más al final del camino; no cuentan como lecciones.
  const xs = [...u.lessons, ...(u.boss ? [u.boss] : []), ...(u.exam ? [u.exam] : [])].map((_, i) => OFFSETS[i % OFFSETS.length]);
  view.innerHTML = `<div class="learn cv-world" style="--c:${c.color}">
    <button class="world-back" data-back>${ICON.back}<span>Mundos</span></button>
    <section class="world${closed ? ' closed' : ''}${all ? ' complete' : ''}">
      <header class="world-card">
        <div class="world-art">${w.art}
          <span class="world-tag">Mundo ${worldNo(c, ui)}</span>
          <span class="world-prog" aria-label="${wDone} de ${u.lessons.length} completadas">${all ? ICON.star : closed ? ICON.lock : ''}${wDone}/${u.lessons.length}</span></div>
        <div class="world-body"><h2>${esc(w.name)}</h2><p>${esc(u.title)}</p>
          <p class="world-stats"><span>${ICON.clips} ${u.lessons.length} lecciones</span><span>${ICON.target} ${u.lessons.reduce((t, l) => t + l.ex.length, 0)} ejercicios</span></p></div>
      </header>
      <div class="path">
        <svg class="trail" width="1" height="1" overflow="visible" aria-hidden="true"><path d="${worldTrail(xs, PATH_STEP)}"/></svg>
        ${u.lessons.map((l, li) => {
        // 'open': desbloqueada pero no es la siguiente (en modo revisión, todas las demás).
        const st = planMotivo(l.id) ? 'locked plan' : isDone(l) ? 'done' : l === cur ? 'current' : isUnlocked(c, l) ? 'open' : 'locked';
        const icon = st === 'done' ? ICON.check : st.startsWith('locked') ? ICON.lock : `<b class="node-n">${li + 1}</b>`;
        return `<div class="node-wrap" style="--x:${xs[li]}px">
          ${st === 'current' ? '<span class="start-bubble">EMPIEZA</span>' : ''}
          <button class="node ${st}" data-id="${l.id}" aria-label="Nivel ${worldNo(c, ui)}-${li + 1}: ${esc(l.title)}">${icon}</button>
          <span class="node-label"><small>Nivel ${worldNo(c, ui)}-${li + 1}</small>${esc(l.title)}${dkLeccionHTML(l)}</span></div>`;
      }).join('')}
        ${u.boss ? (() => {
          const st = planMotivo(u.boss.id) ? 'locked' : isDone(u.boss) ? 'done' : bossUnlocked(u) ? 'open' : 'locked';
          return `<div class="node-wrap" style="--x:${xs[u.lessons.length]}px">
          ${st === 'open' && u.lessons.every(isDone) ? '<span class="start-bubble">JEFE FINAL</span>' : ''}
          <button class="node boss ${st}" data-boss aria-label="Jefe final del mundo ${worldNo(c, ui)}: ${esc(u.boss.title)}">${st === 'locked' ? ICON.lock : ICON.crown}</button>
          <span class="node-label"><small>Jefe final</small>${esc(u.boss.title)}</span></div>`;
        })() : ''}
        ${u.exam ? (() => {
          const best = S.exams[u.exam.id]?.best, st = planMotivo(u.exam.id) ? 'locked' : best != null ? 'done' : examUnlocked(u) ? 'open' : 'locked';
          return `<div class="node-wrap" style="--x:${xs[xs.length - 1]}px">
          ${st === 'open' && u.lessons.every(isDone) ? '<span class="start-bubble">EVALÚATE</span>' : ''}
          <button class="node exam ${st}" data-exam aria-label="Evaluación del mundo ${worldNo(c, ui)}${best != null ? `, mejor resultado ${best}%` : ''}">${st === 'locked' ? ICON.lock : ICON.trophy}</button>
          <span class="node-label"><small>Evaluación · ${u.exam.minutes} min</small>${best != null ? `Mejor resultado: ${best}%` : 'Pon a prueba el mundo'}</span></div>`;
        })() : ''}</div></section>
    ${summaryOf(u) && planMotivo(`resumen-${u.world}`) ? `<button class="world-summary locked" data-summary-lock type="button">
      <span class="ws-icon">${ICON.lock}</span><span class="ws-text"><b>Resumen del mundo</b><small>PDF con la teoría, gráficas y un taller de 10 ejercicios · con el curso completo</small></span></button>`
    : summaryOf(u) ? `<a class="world-summary" href="${summaryOf(u)}" download="Zuka - ${esc(w.name)} (resumen).pdf" target="_blank" rel="noopener">
      <span class="ws-icon">${ICON.doc}</span><span class="ws-text"><b>Resumen del mundo</b><small>PDF con la teoría, gráficas y un taller de 10 ejercicios · se descarga con conexión</small></span>${ICON.download}</a>` : ''}
    ${ui + 1 < c.units.length && c.units[ui + 1].block === u.block ? `<button class="world-next" data-next>Siguiente: Mundo ${worldNo(c, ui + 1)} · ${esc((WORLDS[c.units[ui + 1].world] || c.units[ui + 1]).name || c.units[ui + 1].title)} ${ICON.right}</button>` : ''}
    ${gymFabHTML(c, ui)}
  </div>`;
  bindGymFab(c);
  view.querySelectorAll('.node[data-id]').forEach(b => b.onclick = () => openLessonSheet(c, findLesson(b.dataset.id).l));
  $('[data-exam]', view)?.addEventListener('click', () => (planMotivo(u.exam.id) ? openBloqueo(u.exam.id) : openExamSheet(c, u)));
  $('[data-summary-lock]', view)?.addEventListener('click', () => openBloqueo(`resumen-${u.world}`));
  $('[data-boss]', view)?.addEventListener('click', () => openBossSheet(c, u));
  $('[data-back]', view).onclick = () => {
    openWorld = null; renderLearn();
    const wb = view.querySelector(`.wnode[data-world="${ui}"]`);
    wb?.scrollIntoView({ block: 'center' }); wb?.focus({ preventScroll: true });
  };
  $('[data-next]', view)?.addEventListener('click', () => {
    openWorld = { course: c.id, i: ui + 1 }; renderLearn(); $('[data-back]', view).focus({ preventScroll: true });
  });
  view.scrollTop = 0;   // el mundo empieza arriba, o centrado en su nivel actual
  // Solo se baja hasta el nivel actual si queda fuera de la pantalla: así la tarjeta del mundo no se corta arriba.
  const curNode = view.querySelector('.node.current');
  if (curNode && curNode.getBoundingClientRect().bottom > view.getBoundingClientRect().bottom - 48) curNode.scrollIntoView({ block: 'center' });
}

// ---- pestaña Clips (feed vertical de curiosidades; ver js/curiosidades.js) ----
let feedFilter = 'all', feedStart = null;   // feedStart: id del clip en el que debe abrirse el feed
function likeCount(l) {
  const base = [...l.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7) % 4800 + 200;
  const n = base + (S.likes[l.id] ? 1 : 0);
  return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + ' k' : String(n);
}

function renderClips() {
  const topics = curioTopics();
  if (!topics.some(t => t.id === feedFilter)) feedFilter = 'all';
  const items = curioFeed(feedFilter);
  // Con un solo tema no hay nada que filtrar: sin chips.
  const chips = topics.length > 1 ? `<div class="chips">${[{ id: 'all', name: 'Para ti' }, ...topics].map(c =>
    `<button class="chip${feedFilter === c.id ? ' on' : ''}" data-f="${c.id}">${esc(c.name)}</button>`).join('')}</div>` : '';
  view.innerHTML = `<div class="feed-wrap">${chips}
    <div class="feed">${items.map(({ c, l }) => `<section class="feed-item" data-id="${l.id}">
      <div class="clip-host"></div>
      <div class="feed-cap"><small style="--c:${c.color}">${esc(c.name)}</small><b>${esc(l.title)}</b><span>${esc(l.fact)}</span></div>
      <aside class="rail" style="--c:${c.color}">
        <button class="rail-btn like${S.likes[l.id] ? ' on' : ''}" data-act="like" aria-label="Me gusta">${ICON.heart}<small>${likeCount(l)}</small></button>
        <button class="rail-btn save${S.saved[l.id] ? ' on' : ''}" data-act="save" aria-label="Guardar">${ICON.bookmark}<small>Guardar</small></button>
      </aside></section>`).join('')}</div></div>`;

  const feed = $('.feed', view), players = new Map();
  if (feedStart) { feed.querySelector(`.feed-item[data-id="${feedStart}"]`)?.scrollIntoView(); feedStart = null; }
  const onScreen = new Set();
  // Si el video de un clip no carga (sin conexión, archivo ausente), se cambia por sus escenas animadas.
  function mountClip(host, c, l, clip = l.clip) {
    const p = makePlayer(host, { ...l, clip }, c, { loop: true, feed: true, onEnd: () => watched(l),
      onFail: () => {
        if (!clip.scenes?.length || !(clip.video || clip.bunny) || players.get(l.id) !== p) return;
        p.destroy();
        const q = mountClip(host, c, l, { scenes: clip.scenes }); players.set(l.id, q);
        if (onScreen.has(l.id)) q.play();
      } });
    return p;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    const id = e.target.dataset.id;
    if (e.isIntersecting) {
      onScreen.add(id);
      if (!players.has(id)) { const { c, l } = findCurio(id); players.set(id, mountClip(e.target.querySelector('.clip-host'), c, l)); }
      players.get(id).play();
    } else { onScreen.delete(id); players.get(id)?.pause(); }
  }), { root: feed, threshold: 0.65 });
  feed.querySelectorAll('.feed-item').forEach(el => io.observe(el));

  view.querySelectorAll('.chip').forEach(b => b.onclick = () => { feedFilter = b.dataset.f; go('clips'); });
  feed.addEventListener('click', e => {
    const b = e.target.closest('.rail-btn');
    if (!b) return;
    const id = b.closest('.feed-item').dataset.id, { l } = findCurio(id);
    const act = b.dataset.act;
    if (act === 'like') {
      S.likes[id] = !S.likes[id]; b.classList.toggle('on', S.likes[id]);
      b.querySelector('small').textContent = likeCount(l); Sfx.tap();
    } else if (act === 'save') {
      S.saved[id] = !S.saved[id]; b.classList.toggle('on', S.saved[id]);
      toast(S.saved[id] ? 'Guardado en «Tú»' : 'Eliminado de guardados');
    }
    save();
  });

  cleanup = () => { io.disconnect(); players.forEach(p => p.destroy()); Narrator.stop(); };
}

function watched(l) {
  if (S.watched[l.id]) return;
  S.watched[l.id] = 1; addXP(1);
  toast(`${ICON.bolt} +1 XP por ver el clip`);
}

// ---- lección: clip + ejercicios ----
const PRAISE = ['¡Correcto!', '¡Excelente!', '¡Muy bien!', '¡Así se hace!', '¡Perfecto!'];

function startLesson(c, l) {
  if (planMotivo(l.id)) return openBloqueo(l.id);   // candado por plan: también si se llega por otro camino
  // Los juegos toman la paleta del curso (COURSE_PALETTES, js/games/kit.js); si la lección tiene explicación interactiva
  // (js/explora.js), sus ejercicios se ven, suenan y se leen como ella (clase xp-lesson, css/explora.css).
  const conExplora = typeof EXPLORA !== 'undefined' && !!EXPLORA[l.id];
  setGameCourse(c.id, { explora: conExplora });
  S.lastLesson = l.id; save();   // el componente que se estudia (currentLesson)
  syncHearts();
  if (S.hearts <= 0 && !S.unlockAll) return toast(`Sin vidas. Recuperas una en ${minsToHeart()} min.`);
  const back = tab;
  cleanup?.(); cleanup = null;

  const clips = clipsOf(l);
  const queue = buildQueue(l);
  const total = queue.length, t0 = Date.now();
  let pos = 0, solved = 0, mistakes = 0, handle = null, player = null, finished = false, clipTimer = null;

  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson${conExplora ? ' xp-lesson' : ''}" style="--c:${c.color}">
    <div class="lesson-top">
      <button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button>
      <div class="pbar"><i></i></div>
      ${S.unlockAll ? `<div class="rev-nav" title="Modo revisión: saltar entre ejercicios">
        <button type="button" data-jump="-1" aria-label="Ejercicio anterior">‹</button><b class="rev-pos"></b><button type="button" data-jump="1" aria-label="Ejercicio siguiente">›</button></div>` : ''}
      <span class="tb-stat hearts">${ICON.heart}<b>${S.hearts}</b></span>
    </div>
    <div class="lesson-body"></div>
    <div class="lesson-foot"><button class="btn main">Comprobar</button></div>
    <div class="feedback" role="status"></div>
    <button class="icon-btn clip-close" data-close aria-label="Salir">${ICON.x}</button>
    <button class="clip-skip" type="button">Ejercicios ↓</button>
    <span class="clip-part"></span>
    <div class="ls-sides"></div>
  </div>`;
  ov.classList.add('open');
  document.body.classList.add('in-lesson');   // sin menú inferior: la lección ocupa toda la pantalla
  const root = $('.lesson', ov), body = $('.lesson-body', ov), btn = $('.btn.main', ov), fb = $('.feedback', ov);
  const bar = $('.pbar i', ov), hearts = $('.lesson-top .hearts b', ov);

  const revPos = $('.rev-pos', ov);
  const updateBar = () => {
    bar.style.width = (solved / total) * 100 + '%'; hearts.textContent = S.hearts;
    if (revPos) revPos.textContent = `${Math.min(pos + 1, queue.length)}/${queue.length}`;
  };
  const teardown = () => { clearTimeout(clipTimer); clipTimer = null; player?.destroy(); player = null; handle?.destroy?.(); handle = null; };

  // `to`: pestaña a la que ir al salir (al tocar el menú inferior); si no, la de origen.
  function close(to) {
    if (!finished && pos > 0) {
      return ask({ title: '¿Salir de la lección?', text: 'Perderás el progreso de esta lección.', ok: 'Salir', cancel: 'Seguir aprendiendo', danger: true })
        .then(yes => { if (yes && lessonClose === close) { finished = true; close(to); } });
    }
    teardown(); Narrator.stop();
    document.removeEventListener('keydown', onKey);
    ov.classList.remove('open'); ov.innerHTML = '';
    document.body.classList.remove('in-lesson');
    lessonClose = null;
    go(typeof to === 'string' ? to : back);
  }
  lessonClose = close;
  ov.querySelectorAll('[data-close]').forEach(b => { b.onclick = () => close(); });

  // `pos` es la tarea actual. `review` es el video que se vuelve a ver al deslizar hacia
  // atrás (−1 si no se está repasando) y `reviewPos` su lugar en la cola; repasar no cambia el progreso.
  let review = -1, reviewPos = -1;
  let enterDir = 1;   // por dónde entra lo siguiente: 1 desde abajo (avanzar), −1 desde arriba (volver)

  function reset() {
    teardown(); updateBar();
    root.classList.remove('fb-open', 'clip-mode', 'clip-ended', 'clip-fresh');
    body.className = 'lesson-body';
    void body.offsetWidth; body.classList.add(enterDir < 0 ? 'enter-down' : 'enter-up'); enterDir = 1;
    body.scrollTop = 0;
    body.style.paddingBottom = '';
  }

  // El clip se ve a pantalla completa, como en Clips; la barra y los corazones vuelven en los ejercicios.
  function showClip(n, forward) {
    root.classList.add('clip-mode');
    body.classList.add('is-clip');
    body.innerHTML = '';
    // El botón de saltar se ve los primeros segundos y mientras el video está en pausa (CSS);
    // al terminar, la lección sigue sola a lo que venga.
    const advance = () => { btn.classList.remove('pulse'); forward(); };
    root.classList.add('clip-fresh');
    clipTimer = setTimeout(() => root.classList.remove('clip-fresh'), 2500);
    player = makePlayer(body, l, c, { clip: clips[n], onEnd: () => {
      root.classList.add('clip-ended'); btn.classList.add('pulse');
      clearTimeout(clipTimer); clipTimer = setTimeout(advance, 600);
    } });
    // El botón anuncia lo que sigue: otro video (en repaso, el siguiente video ya visto) o los ejercicios.
    const clipAt = i => (queue[i]?.k === 'clip' ? queue[i] : null);
    const after = review >= 0 ? queue.find((t, i) => i > reviewPos && i < pos && t.k === 'clip') ?? clipAt(pos) : clipAt(pos + 1);
    $('.clip-skip', root).textContent = after ? `Parte ${after.n + 1} ↓` : review >= 0 && queue[pos]?.k === 'ex' ? 'Al ejercicio ↓' : 'Ejercicios ↓';
    $('.clip-part', root).textContent = clips.length > 1 ? `Parte ${n + 1} de ${clips.length}` : '';
    leccionLados(root, c, l, queue, review >= 0 ? reviewPos : pos, n, clips[n]);   // paneles a los lados en escritorio (js/escritorio.js)
    player.play();
    btn.textContent = 'Continuar'; btn.disabled = false;
    btn.onclick = advance;
    $('.clip-skip', root).onclick = advance;
  }

  function showReview(n) {
    review = n;
    reviewPos = queue.findIndex(t => t.k === 'clip' && t.n === n);
    reset();
    showClip(n, next);
  }

  // Siguiente: entre videos repasados, o de vuelta a la tarea actual; en la tarea actual,
  // avanza el video o continúa tras responder. Un ejercicio sin responder no se salta.
  function next() {
    if (finished) return;
    if (review >= 0) {
      const q = queue.findIndex((t, i) => i > reviewPos && i < pos && t.k === 'clip');
      return q >= 0 ? showReview(queue[q].n) : step();
    }
    if (queue[pos].k === 'clip') return $('.clip-skip', root).click();
    if (fb.classList.contains('show')) return $('.btn', fb).click();
    toast('Responde el ejercicio para continuar');
    body.classList.remove('nudge'); void body.offsetWidth; body.classList.add('nudge');
  }

  // Anterior: vuelve a ver el último video que hay en la cola antes de la posición actual.
  function prev() {
    if (finished || fb.classList.contains('show')) return;
    for (let i = (review >= 0 ? reviewPos : pos) - 1; i >= 0; i--) {
      if (queue[i].k === 'clip') { enterDir = -1; return showReview(queue[i].n); }
    }
  }

  // Modo revisión: ‹ › saltan al ejercicio (o video) anterior o siguiente sin responder, para revisar
  // el contenido. No cuenta como resuelto ni quita vidas.
  function jump(d) {
    if (finished) return;
    fb.classList.remove('show');
    review = -1;
    pos = Math.max(0, Math.min(queue.length - 1, pos + d));
    step();
  }
  ov.querySelectorAll('[data-jump]').forEach(b => { b.onclick = () => jump(+b.dataset.jump); });

  // Deslizar con el dedo en vertical, como al hacer scroll: el dedo sube y viene lo que sigue; baja y vuelve
  // el video anterior (lessonSwipe, en content.js). Con eventos de toque: el desplazamiento del navegador
  // no los cancela, así que en un ejercicio se sabe si el contenido ya estaba arriba o al final.
  let touch = null;
  const edges = () => ({ atTop: body.scrollTop <= 0, atBottom: body.scrollHeight - body.clientHeight - body.scrollTop <= 2 });
  root.addEventListener('touchstart', e => {
    if (e.touches.length !== 1 || e.target.closest('.seek, .v-q-menu, input, textarea, .sim, .play, .feedback')) { touch = null; return; }
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), ...edges() };
  }, { passive: true });
  root.addEventListener('touchend', e => {
    if (!touch) return;
    const p = e.changedTouches[0], now = edges(), t0 = touch;
    touch = null;
    const act = lessonSwipe({ dx: p.clientX - t0.x, dy: p.clientY - t0.y, ms: Date.now() - t0.t, clip: root.classList.contains('clip-mode'),
      atTop: t0.atTop && now.atTop, atBottom: t0.atBottom && now.atBottom, answered: fb.classList.contains('show') });
    if (act === 'next') next(); else if (act === 'prev') prev();
  }, { passive: true });
  root.addEventListener('touchcancel', () => { touch = null; }, { passive: true });

  function step() {
    review = -1;
    reset();
    if (pos >= queue.length) return finish();
    const item = queue[pos];
    if (item.k === 'clip') {
      showClip(item.n, () => { solved++; pos++; step(); });
    } else {
      const ex = l.ex[item.i];
      btn.textContent = 'Comprobar'; btn.disabled = true;
      handle = renderExercise(body, ex, ok => { btn.disabled = !ok; });
      const q = conExplora && typeof xpPalabras === 'function' ? body.querySelector('.ex-q') : null;
      if (q) q.innerHTML = xpPalabras(ex.q, 22);   // el enunciado entra como el de la explicación
      btn.onclick = () => check(ex, item);
    }
  }

  function check(ex, item) {
    const r = handle.check();
    handle.lock(r.ok);
    S.answered++;
    if (r.ok) { S.correct++; solved++; conExplora ? XS.idea() : Sfx.ok(); }
    else { mistakes++; loseHeart(); queue.push(item); conExplora ? XS.nope() : Sfx.bad(); }
    save(); updateBar();
    fb.className = `feedback show ${r.ok ? 'ok' : 'bad'}`;
    fb.innerHTML = `<div class="fb-in">
      <div class="fb-head" id="fb-que"><span class="fb-icon">${r.ok ? ICON.check : ICON.x}</span><h4>${r.ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : 'Incorrecto'}</h4></div>
      ${r.ok ? '' : `<p class="fb-label">La respuesta correcta es:</p><div class="fb-sol" id="fb-sol">${tex(window.katex && typeof texify === 'function' ? texify(r.solution) : r.solution)}</div>`}
      ${ex.explain ? `<p class="fb-exp">${conExplora ? xpPalabras(ex.explain, 14) : tex(ex.explain)}</p>` : ''}
      <button class="btn" aria-describedby="fb-que fb-sol">${r.ok ? 'Continuar' : 'Entendido'}</button></div>`;
    root.classList.add('fb-open');
    $('.btn', fb).focus({ preventScroll: true });   // con teclado o lector, lo que sigue es «Continuar», no el «Comprobar» que quedó tapado
    // La retroalimentación tapa la parte de abajo: se deja ese espacio para poder desplazar el
    // ejercicio y verlo completo (en un juego largo, lo que quedó mal puede estar abajo).
    body.style.paddingBottom = `${Math.max(0, fb.offsetHeight - $('.lesson-foot', ov).offsetHeight) + 24}px`;
    $('.btn', fb).onclick = () => {
      fb.classList.remove('show');
      ov.tabIndex = -1; ov.focus({ preventScroll: true });   // el botón se esconde: el foco vuelve a la lección, no al aire
      if (S.hearts <= 0 && !S.unlockAll) return outOfHearts();
      pos++; step();
    };
  }

  function finish() {
    finished = true;
    const first = !isDone(l), perfect = mistakes === 0;
    const xp = (first ? 10 : 5) + (perfect ? 5 : 0);
    S.done[l.id] = true; addXP(xp);
    cuentaProgreso(l.id, { completada: true });   // avance en la nube (js/cuenta.js)
    const newStreak = markStreak();
    const exN = l.ex.length, acc = Math.round((100 * exN) / (exN + mistakes));
    const secs = Math.round((Date.now() - t0) / 1000);
    bar.style.width = '100%';
    body.className = 'lesson-body';
    body.innerHTML = `<div class="done-screen"><canvas class="confetti"></canvas>
      ${mascotSVG('cheer', 'm-win')}
      <h2>${perfect ? '¡Lección perfecta!' : '¡Lección completada!'}</h2>
      <p class="muted">${esc(l.title)}</p>
      <div class="done-stats">
        <div class="ds xp"><small>XP</small><b>${ICON.bolt}+${xp}</b></div>
        <div class="ds acc"><small>Precisión</small><b>${acc}%</b></div>
        <div class="ds time"><small>Tiempo</small><b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div>
      </div>
      ${newStreak ? `<p class="streak-up">${ICON.flame} ¡Racha de ${S.streak} ${S.streak === 1 ? 'día' : 'días'}!</p>` : ''}
    </div>`;
    btn.textContent = 'Continuar'; btn.disabled = false; btn.onclick = close;
    Sfx.win();
    requestAnimationFrame(() => confetti($('.confetti', body)));
  }

  function outOfHearts() {
    finished = true;
    body.className = 'lesson-body';
    body.innerHTML = `<div class="done-screen">
      ${mascotSVG('sad', 'm-win')}
      <h2>Te quedaste sin vidas</h2>
      <p class="muted">Recuperas una vida cada 20 minutos. Mientras tanto, entrena con el botón del gimnasio de tu curso: allí no se pierden vidas.</p>
      <button class="btn ghost" type="button" data-gym>Ir al gimnasio</button></div>`;
    root.classList.remove('fb-open');
    $('[data-gym]', body).onclick = () => close('gym');
    btn.textContent = 'Salir'; btn.disabled = false; btn.onclick = close;
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      const target = fb.classList.contains('show') ? $('.btn', fb) : !btn.disabled && btn;
      if (target) { e.preventDefault(); target.click(); }
    } else if (/^[1-9]$/.test(e.key) && e.target.tagName !== 'INPUT' && !fb.classList.contains('show')) {
      handle?.key?.(e.key);
    } else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.tagName !== 'INPUT') {
      // En computador, las flechas hacen lo mismo que deslizar.
      e.key === 'ArrowRight' ? next() : prev();
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && root.classList.contains('clip-mode')) {
      // Sobre el video, abajo y arriba también: como al hacer scroll.
      e.preventDefault();
      e.key === 'ArrowDown' ? next() : prev();
    }
  }
  document.addEventListener('keydown', onKey);
  step();
}

// ---- pestaña Perfil ----
// Lo que «Reiniciar progreso» no toca.
const RESET_KEEP = ['tourDone', 'carne', 'tutorias', 'cuenta', 'unlockAll', 'theme', 'name', 'goal', 'voice', 'sfx', 'videoQuality', 'videoMuted', 'videoSpeed', 'hideInstall', 'guides'];
let profileSub = null;   // 'settings': pantalla de Ajustes dentro de la pestaña Perfil (null = el perfil)
function renderProfile() {
  if (profileSub === 'settings') return renderSettings();
  if (rolEquipo()) return renderTuEquipo();   // js/equipo.js
  const saved = Object.keys(S.saved).filter(id => S.saved[id]).map(id => findCurio(id) || findLesson(id)).filter(x => x && (x.l.fact || cursoVisible(x.c)));   // nada guardado de un curso oculto
  if ($('.pm-riel.mano', view)) { pfVer.pend = true; return; }   // se está arrastrando la meta: se repinta al soltar
  const sigue = pfGuarda();   // un repintado desde afuera no mueve la página, ni el foco, ni borra el nombre a medias
  view.innerHTML = `<div class="profile"><div class="pf">
    ${pfCarneHTML()}${tuInstHTML()}${pfMetaHTML()}${pfMapaHTML()}${pfLogrosHTML()}${pfCursosHTML()}
    <div class="pf-cuenta">${cuentaCard()}</div>${librosHTML(true)}
    ${saved.length ? `<section class="pf-c pf-saved"><div class="pf-cab"><h2>Clips guardados</h2></div>${saved.map(({ c, l }) =>
      `<button class="saved-row" data-${l.fact ? 'curio' : 'lesson'}="${l.id}" style="--c:${c.color}">${ICON.bookmark}<span><b>${esc(l.title)}</b><small>${esc(c.name)}</small></span></button>`).join('')}</section>` : ''}
  </div></div>`;
  cuentaBind(view); dkBind(view); bindLibros(view); pfBind(view);   // el piñón (aria-label="Ajustes", data-settings) pone profileSub = 'settings'
  sigue();
  view.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => {
    const { c, l } = findLesson(b.dataset.lesson);
    if (isUnlocked(c, l)) startLesson(c, l); else toast(`Primero completa las lecciones anteriores de ${esc(c.name)}.`);
  });
  view.querySelectorAll('[data-curio]').forEach(b => b.onclick = () => { feedFilter = 'all'; feedStart = b.dataset.curio; go('clips'); });
}

// Ajustes: pantalla propia dentro de Perfil (se entra por el piñón). Filas con icono, en grupos.
function renderSettings() {
  const installed = isStandalone();
  const themes = [['system', 'Según el sistema', 'auto'], ['light', 'Claro', 'sun'], ['dark', 'Oscuro', 'moon']];
  const row = (icon, title, sub, end = '') => `<span class="set-ico">${ICON[icon]}</span><span class="set-body"><b>${title}</b>${sub ? `<small>${sub}</small>` : ''}</span>${end}`;
  const toggle = k => `<span class="toggle${S[k] ? ' on' : ''}"></span>`;
  const conCuenta = typeof Cuenta !== 'undefined' && !!Cuenta.user;   // con sesión, las lecciones hechas viven en la nube y vuelven
  view.innerHTML = `<div class="settings">
    <header class="set-head"><button class="icon-btn" data-back aria-label="Volver a Tú">${ICON.back}</button><h2>Ajustes</h2></header>
    <section class="set-group">
      <h3 class="eyebrow">Aprendizaje</h3>
      <div class="set-row">${row('target', 'Meta diaria', `${todayXP()} de ${S.goal} XP hoy`)}</div>
      <div class="seg" role="group" aria-label="Meta diaria">${[10, 20, 30, 50].map(g => `<button data-goal="${g}" class="${S.goal === g ? 'on' : ''}" aria-pressed="${S.goal === g}">${g} XP</button>`).join('')}</div>
    </section>
    <section class="set-group">
      <h3 class="eyebrow">Sonido</h3>
      <button class="set-row" data-set="voice" role="switch" aria-checked="${!!S.voice}">${row('voice', 'Narración por voz', 'En las lecciones sin video', toggle('voice'))}</button>
      <button class="set-row" data-set="sfx" role="switch" aria-checked="${!!S.sfx}">${row('sound', 'Efectos de sonido', '', toggle('sfx'))}</button>
    </section>
    <section class="set-group">
      <h3 class="eyebrow">Apariencia</h3>
      <div class="theme-cards" role="group" aria-label="Tema">${themes.map(([v, l, ic]) => `<button type="button" class="tc ${v}" data-theme-opt="${v}" aria-pressed="${S.theme === v}"><span class="tc-v" aria-hidden="true"><i></i><i></i><i></i></span><span class="tc-t">${ICON[ic]}${l}</span></button>`).join('')}</div>
    </section>
    ${SIN_CANDADOS ? `<section class="set-group">
      <h3 class="eyebrow">Administración</h3>
      <button class="set-row" data-set="unlockAll" role="switch" aria-checked="${!!S.unlockAll}">${row('lock', 'Modo revisión', 'Todas las lecciones abiertas y sin perder vidas', toggle('unlockAll'))}</button>
    </section>` : cuentaEsAdmin() ? `<section class="set-group">
      <h3 class="eyebrow">Administración</h3>
      <div class="set-row">${row('lock', 'Acceso total', 'Cuenta administradora: todos los cursos, mundos y lecciones abiertos, sin perder vidas')}</div>
    </section>` : ''}
    <section class="set-group">
      <h3 class="eyebrow">App</h3>
      ${!installed && installEvt
        ? `<button class="set-row" data-install>${row('download', 'Instalar Zuka', 'En tu celular o computador, como una app más', ICON.right)}</button>`
        : `<div class="set-row">${row('download', installed ? 'Zuka está instalada' : 'Instalar Zuka', installed ? 'Ya la estás usando como app.' : installHelp())}</div>`}
      <button class="set-row" data-tour>${row('play', 'Ver el recorrido otra vez', 'Un paseo corto por la app', ICON.right)}</button>
    </section>
    <section class="set-group">
      <button class="set-row danger" data-reset>${row('trash', 'Reiniciar progreso', conCuenta ? 'Borra tu XP y tu racha en este celular. Las lecciones guardadas en tu cuenta se conservan' : 'Borra tu XP, tu racha y las lecciones completadas')}</button>
    </section>
  </div>`;
  // Tras un cambio se repinta: se conservan el desplazamiento y el foco (mismo control, por su atributo data-).
  const repaint = b => {
    const y = view.scrollTop, k = ['goal', 'themeOpt', 'set'].find(n => n in b.dataset);
    const sel = `[data-${k === 'themeOpt' ? 'theme-opt' : k}="${b.dataset[k]}"]`;
    renderSettings(); view.scrollTop = y; $(sel, view)?.focus({ preventScroll: true });
  };
  $('[data-back]', view).onclick = () => { profileSub = null; renderProfile(); view.scrollTop = 0; $('[data-settings]', view).focus({ preventScroll: true }); };
  view.querySelectorAll('[data-goal]').forEach(b => b.onclick = () => { S.goal = +b.dataset.goal; save(); repaint(b); });
  view.querySelectorAll('[data-theme-opt]').forEach(b => b.onclick = () => { S.theme = b.dataset.themeOpt; save(); applyTheme(); repaint(b); });
  view.querySelectorAll('[data-set]').forEach(b => b.onclick = () => { S[b.dataset.set] = !S[b.dataset.set]; save(); repaint(b); });
  $('[data-install]', view)?.addEventListener('click', promptInstall);
  $('[data-tour]', view).onclick = () => { profileSub = null; startTour(); };
  $('[data-reset]', view).onclick = () => {
    ask({ title: '¿Borrar todo tu progreso?', text: `${conCuenta ? 'Se borran tu XP, tu racha, tus evaluaciones y tu gimnasio; las lecciones guardadas en tu cuenta se conservan.' : 'Se borran tu XP, tu racha y las lecciones completadas.'} Tus ajustes y tus asesorías separadas se conservan. No se puede deshacer.`, ok: 'Borrar todo', cancel: 'Cancelar', danger: true })
      .then(yes => {
        if (!yes) return;
        // Se conserva lo que no es progreso: cuenta, asesorías y preferencias (tema, nombre, meta, sonido, video, guías vistas).
        const keep = Object.fromEntries(RESET_KEEP.filter(k => k in S).map(k => [k, S[k]]));
        S = Object.assign(DEFAULTS(), keep); S.reinicio = Date.now(); estadoPronto(); openWorld = null; openBlock = null; profileSub = null; save(); applyTheme(); go('home');
      });
  };
}

// ---- arranque ----
document.querySelectorAll('#tabbar button').forEach(b => {
  b.insertAdjacentHTML('afterbegin', ICON[{ home: 'learn', cursos: 'book', gym: 'gym', clips: 'clips', tienda: 'bag', tutorias: 'calendar', portal: 'school' }[b.dataset.tab] || 'user']);
  b.onclick = () => {
    if (lessonClose) return lessonClose(b.dataset.tab);
    if (tab === 'learn' && b.dataset.tab === 'learn') { if (openWorld) openWorld = null; else openBlock = null; }   // tocar Aprender otra vez: un paso arriba (mundo → mapa → componentes)
    profileSub = null;   // el menú siempre lleva al Perfil, no a Ajustes
    go(b.dataset.tab);
  };
});
// Altura del menú inferior para lo que se acomoda encima de él. Durante una lección el menú se
// esconde (body.in-lesson pone --tabbar-h en 0): no se guarda esa altura 0.
const setTabbarHeight = () => { const h = $('#tabbar').offsetHeight; if (h) document.documentElement.style.setProperty('--tabbar-h', `${h}px`); };
setTabbarHeight();
addEventListener('resize', setTabbarHeight);
document.addEventListener('visibilitychange', () => { if (document.hidden) Narrator.stop(); });
// Quita la portada (#boot de index.html) cuando la app ya está pintada y con su fuente, para que
// aparezca completa de una vez; si la fuente tarda (o no hay conexión), no espera más de 300 ms (abrir rápido pesa más que la fuente).
// La espera se arma antes de pintar: si el arranque fallara, la portada igual se va.
function hideBoot() {
  const b = $('#boot');
  if (!b || b.classList.contains('out')) return;
  b.classList.add('out');
  setTimeout(() => b.remove(), 400);
}
const fontsReady = document.fonts?.load
  ? Promise.all(['400', '600', '700'].map(w => document.fonts.load(`${w} 1em "Plus Jakarta Sans"`))).catch(() => {})
  : null;
Promise.race([fontsReady, new Promise(r => setTimeout(r, 300))])
  .then(() => requestAnimationFrame(() => requestAnimationFrame(hideBoot)));
applyTheme();
cuentaInit();   // cuenta guardada y modo revisión solo para el administrador (js/cuenta.js), antes de pintar
go(tabFromURL(location.search));   // los atajos del icono instalado abren ?tab=clips, etc. (js/pwa.js)
watchConnection(window, document.body, toast);
if (isStandalone()) keepData(navigator);   // instalada: que el navegador no borre el progreso
setupBack();   // botón «atrás» del celular (js/back.js)
// Primera vez en la app: recorrido guiado (js/tour.js).
// En la web sin instalar y sin sesión sale primero la presentación (js/presentacion.js); si no, sin sesión, la pantalla
// de entrada. El recorrido empieza al cerrarlas.
if (!presentacionPide() && !cuentaPideEntrar() && tourShouldStart(S)) startTour();
;
//#archivo js/tapa.js
// Pantallas completas (auditoría 2026-11-26, hallazgo 6): la lección, la evaluación, el simulacro y el gimnasio se
// abren en #overlay, y la entrada en #auth. Mientras una está abierta, lo de atrás queda inerte (ni Tab ni el lector de
// pantalla lo alcanzan) y el foco entra a ella. Se vigila la página en vez de tocar cada sitio que abre o cierra una:
// así una pantalla nueva queda cubierta sin acordarse de nada. Las hojas, el recorrido y la presentación tapan lo suyo
// por su cuenta; aquí solo se suelta lo que aquí se tapó.
const TAPA_APP = ['#topbar', '#view', '#tabbar'];

// Pura: qué queda detrás según lo que está abierto.
function tapaDetras(leccion, entrada) {
  return [...(leccion || entrada ? TAPA_APP : []), ...(entrada ? ['#overlay'] : [])];
}

let tapaPuestos = new Set(), tapaCima = null;
function tapaSync(doc = document) {
  const ov = doc.querySelector('#overlay'), auth = doc.querySelector('#auth'), abierta = !!ov && ov.classList.contains('open');
  const quiere = tapaDetras(abierta, !!auth).map(s => doc.querySelector(s)).filter(Boolean);
  // Si al soltar hay otra capa completa encima (la presentación o la tienda, que tapan lo mismo por su cuenta), lo de
  // atrás sigue siendo suyo: solo se olvida. Caso: de la entrada se vuelve a «Conocer Zuka».
  const otra = doc.querySelector('#landing') || doc.querySelector('#tienda');
  for (const el of [...tapaPuestos]) if (!quiere.includes(el)) { if (!otra) el.inert = false; tapaPuestos.delete(el); }
  for (const el of quiere) if (!el.inert) { el.inert = true; tapaPuestos.add(el); }
  // El foco entra al abrirse, y también si una pantalla reemplazó a otra y el foco quedó en el aire (el botón que lo
  // tenía se borró). Con una hoja encima (pantalla inerte) se queda en la hoja.
  const cima = auth || (abierta ? ov : null), act = doc.activeElement;
  if (cima && !cima.inert && !cima.contains(act) && (cima !== tapaCima || !act || act === doc.body)) { cima.tabIndex = -1; cima.focus({ preventScroll: true }); }
  tapaCima = cima;
}

if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined' && document.body) {
  const mo = new MutationObserver(() => tapaSync());
  mo.observe(document.body, { childList: true });   // #auth entra y sale de <body>
  ['#overlay', ...TAPA_APP].forEach(s => { const el = document.querySelector(s); if (el) mo.observe(el, { attributes: true, attributeFilter: ['class', 'inert'] }); });
  tapaSync();
}
;
//#archivo js/carga.js
// Juegos y explicaciones por curso (auditoría 2026-11-26, hallazgo 7; spec 2026-11-26-arranque-liviano).
// La app publicada arranca con el núcleo y los datos de los cursos. Los juegos y las explicaciones interactivas van en
// paquetes aparte, uno por curso y uno común (los arma tools/empaquetar.js; la lista es ZUKA_PAQUETES, de
// js/paquetes/lista.js), y se piden aquí la primera vez que se abre una lección, una evaluación o un reto de ese curso.
// En localhost los archivos van sueltos y ya están todos: nada se pide y todo sigue siendo inmediato.
// Va de último en la lista de index.html: envuelve startLesson, startExam y startReto, que ya existen.
const CARGA = (() => {
  // null = archivos sueltos (o pruebas en Node): no hay nada que pedir.
  const P = (typeof window !== 'undefined' && window.zukaPaquetes && window.ZUKA_PAQUETES) || null;
  const pedidos = {}, listos = new Set();
  const pide = src => (pedidos[src] ??= new Promise((ok, no) => {
    const s = document.createElement('script');
    s.async = false;   // el común se ejecuta antes que el del curso
    s.onload = () => { listos.add(src); ok(); };
    s.onerror = () => { delete pedidos[src]; s.remove(); no(new Error('no llegó ' + src)); };
    s.src = src;
    document.head.appendChild(s);
  }));
  const de = id => (P ? [P.comun, P.cursos[id]].filter(Boolean) : []);
  const faltan = id => de(id).filter(s => !listos.has(s));
  const curso = id => Promise.all(faltan(id).map(pide));
  const todo = () => (P ? Promise.all([P.comun, ...Object.values(P.cursos)].filter(s => !listos.has(s)).map(pide)) : Promise.resolve());

  // ¿Está todo lo que esta lección necesita? Si el reparto por curso dejó algo fuera, se pide el resto (red de seguridad).
  const completo = n => (n.juegos || []).every(g => typeof GAMES === 'undefined' || GAMES[g]) &&
    (!n.explora || !P || !P.explora.includes(n.explora) || typeof EXPLORA === 'undefined' || !!EXPLORA[n.explora]);
  const juegosDe = lista => (lista || []).map(e => (e && e.ex ? e.ex : e)).filter(e => e && e.type === 'play').map(e => e.game);

  let abriendo = false;
  // Corre `sigue` cuando el curso tiene sus juegos: de inmediato si ya estaban; si no, al llegar.
  function abre(cursoId, necesita, sigue) {
    if (!P || (!faltan(cursoId).length && completo(necesita))) return sigue();
    if (abriendo) return undefined;   // un segundo toque mientras llega no abre dos lecciones
    abriendo = true;
    const aviso = setTimeout(() => { if (abriendo && typeof toast === 'function') toast('Cargando los juegos…'); }, 600);
    return curso(cursoId).then(() => (completo(necesita) ? null : todo())).then(
      () => { abriendo = false; clearTimeout(aviso); sigue(); },
      () => { abriendo = false; clearTimeout(aviso); if (typeof toast === 'function') toast('No se pudieron cargar los juegos. Revisa tu conexión e inténtalo otra vez.'); });
  }
  return { P, abre, curso, todo, faltan, completo, juegosDe, listos };
})();

// ¿La lección tiene explicación interactiva? Antes de cargar las explicaciones lo dice la lista de paquetes.
const hayExplora = id => !!((typeof EXPLORA !== 'undefined' && EXPLORA[id]) || (CARGA.P && CARGA.P.explora.includes(id)));

if (typeof startLesson === 'function') {
  const abreLeccion = startLesson;
  startLesson = function (c, l) {
    if (typeof planMotivo === 'function' && planMotivo(l.id)) return abreLeccion.apply(this, arguments);   // con candado no se pide nada
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(l.ex), explora: l.id }, () => abreLeccion.apply(this, arguments));
  };
}
if (typeof startExam === 'function') {
  const abreExamen = startExam;
  startExam = function (c, u) {
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(u && u.exam && u.exam.items) }, () => abreExamen.apply(this, arguments));
  };
}
if (typeof startReto === 'function') {
  const abreReto = startReto;
  startReto = function (c, r) {
    return CARGA.abre(c.id, { juegos: CARGA.juegosDe(r && r.steps) }, () => abreReto.apply(this, arguments));
  };
}

// Quien ya estudia un curso lo tiene listo antes de tocar «Continuar»: se piden sus juegos con la app ya pintada y quieta.
// Quien solo mira la portada o la Tienda no los pide nunca.
if (CARGA.P && typeof S !== 'undefined' && S.lastLesson && S.course) {
  const pide = () => CARGA.curso(S.course).catch(() => {});
  setTimeout(() => (typeof requestIdleCallback === 'function' ? requestIdleCallback(pide, { timeout: 4000 }) : pide()), 1500);
}
