// Ejemplos resueltos y marcados de Lectura Crítica del Preicfes (libro 6). Textos originales.
// H(título, pregunta, párrafos [[trozos]], opciones, pasos [lo que se explica, { luz: trozos u opciones, x: opciones que se tachan,
// n: { párrafo u opción: rótulo } }], respuesta). Los trozos del texto se cuentan desde 0.
const H = (t, q, T, O, m, r) => {
  const nT = T.flat().length, id = k => (typeof k === 'string' ? nT + 'ABCD'.indexOf(k) : k), pa = k => (/[A-D]/.test(k) ? T.length + 'ABCD'.indexOf(k) : +k);
  return [{ t, q, escena: 'hoja', en: { letras: [...T.map((_, i) => `${i + 1}`), ...'ABCD'.slice(0, O.length)], paras: [...T, ...O.map(o => [o])] },
    m: m.map(([d, v = {}]) => [d, { ...(v.luz ? { luz: v.luz.map(id) } : {}), ...(v.x ? { tacha: v.x.map(id) } : {}), ...(v.n ? { nota: Object.fromEntries(Object.entries(v.n).map(([k, s]) => [pa(k), s])) } : {}) }]), r }];
};
Object.assign(EJ, {
  // ------------------------------------------------------------------------------------------- Lo que dice el texto
  'icf-lc-literal-1': H('Dice, se deduce o no está', 'De acuerdo con la noticia, es correcto afirmar que', [
    ['El colegio Santa Inés estrenó una huerta en su azotea.', 'La cuidan los estudiantes de noveno, por turnos de una semana.'],
    ['La primera cosecha, de lechugas y cilantro, se usó en el comedor escolar.', 'El tomate no prosperó: el viento de la tarde quebraba las matas.'],
    ['Para el próximo semestre, los estudiantes piensan levantar una malla contra el viento.'],
  ], ['la huerta dio lechugas, cilantro y tomate.', 'la malla busca proteger las matas del viento.', 'los turnos los organiza la rectora.', 'el comedor compra sus verduras a la huerta.'], [
    ['Con «es correcto afirmar», cada opción se lleva al texto y se le busca su prueba.', {}],
    ['A suma el tomate a la cosecha, pero el texto dice que no prosperó.', { luz: [2, 3], x: ['A'], n: { A: 'contradice' } }],
    ['Nadie dice quién organiza los turnos, y la cosecha se usó: no se vendió. C y D no están.', { luz: [1], x: ['C', 'D'], n: { C: 'no está', D: 'no está' } }],
    ['B junta dos oraciones: el viento quebraba las matas, y por eso la malla.', { luz: [3, 4, 'B'], n: { 1: 'problema', 2: 'salida' } }],
  ], 'B. Se deduce al juntar el problema del viento con la malla.'),
  'icf-lc-literal-2': H('Tirar del hilo', 'En la carta, «ella» se refiere a', [
    ['Señor director: el domingo publicaron una nota sobre la biblioteca de mi vereda.', 'En ella dicen que solo tiene libros viejos.'],
    ['Es cierto que muchos lo son.', 'Pero los niños los leen hasta gastarlos, se los prestan entre primos y los devuelven con dibujos en las márgenes, y eso no lo cuenta ninguna cifra.'],
  ], ['la vereda.', 'la nota.', 'la biblioteca.', 'la carta de la lectora.'], [
    ['«Ella» apunta hacia atrás: se buscan antes palabras femeninas.', { luz: [0], n: { 0: 'tres candidatas' } }],
    ['Hay tres: la nota, la biblioteca y la vereda. Se prueba cada una en el lugar de «ella».', {}],
    ['«En la biblioteca dicen…»: una biblioteca no dice nada; dice lo que se publicó.', { x: ['C'], n: { C: 'no dice' } }],
    ['La vereda tampoco publica, y la carta es este texto, no lo que se critica.', { x: ['A', 'D'] }],
    ['«En la nota dicen que solo tiene libros viejos» se lee bien.', { luz: [1, 'B'] }],
  ], 'B. Al reemplazar, solo «la nota» puede decir algo.'),
  // ------------------------------------------------------------------------------------------- Cómo está armado
  'icf-lc-estructura-1': H('El oficio del párrafo', 'En la columna, el tercer párrafo cumple la función de', [
    ['Cada diciembre, la ciudad gasta más en pólvora que en bomberos.'],
    ['El año pasado, en un solo barrio, tres niños terminaron en urgencias por quemaduras.', 'Ninguno había comprado la pólvora: la encendieron adultos.'],
    ['Alguien dirá que es tradición.', 'Las tradiciones también cambian: antes se fumaba dentro de los buses.'],
    ['La alcaldía debería cambiar la pólvora por un espectáculo de luces.'],
  ], ['presentar la tesis del autor.', 'dar un caso que muestra el problema.', 'responder a una posible objeción.', 'cerrar con una propuesta.'], [
    ['Se arma el mapa: qué hace cada párrafo frente al anterior.', { luz: [0], n: { 0: 'problema' } }],
    ['El segundo trae un caso con lugar y cifra: ese es el oficio de B, pero en otro párrafo.', { luz: [1, 2], x: ['B'], n: { 1: 'caso', B: 'es el 2' } }],
    ['El último propone con «debería»: es la tesis y el cierre.', { luz: [5], x: ['A', 'D'], n: { 3: 'propuesta', A: 'es el 4', D: 'es el 4' } }],
    ['«Alguien dirá» trae la voz contraria, y la oración siguiente la contesta.', { luz: [3, 4, 'C'], n: { 2: 'objeción y respuesta' } }],
  ], 'C. Trae lo que diría otro y lo contesta con un ejemplo.'),
  'icf-lc-estructura-2': H('Lo que trae el conector', 'En el texto, «sin embargo» introduce', [
    ['Los colibríes baten las alas hasta ochenta veces por segundo.', 'Por eso necesitan comer casi todo el día.'],
    ['De noche, sin embargo, no pueden buscar flores.', 'Entonces bajan su temperatura y entran en un sueño profundo,', 'parecido a una hibernación de unas horas, del que despiertan con el primer sol.'],
  ], ['una consecuencia de batir tanto las alas.', 'un límite: de noche no pueden hacer lo que necesitan.', 'un ejemplo de colibrí.', 'otro dato sobre su vuelo.'], [
    ['Antes de mirar las opciones: ¿qué venía antes del conector?', { luz: [1], n: { 0: 'deben comer' } }],
    ['«Sin embargo» choca con eso: necesitan comer, pero de noche no hay cómo.', { luz: [2], n: { 1: 'choca' } }],
    ['La consecuencia la trae «entonces», una oración después.', { luz: [3], x: ['A'], n: { A: 'es «entonces»' } }],
    ['No hay un caso particular ni se suman datos del vuelo.', { x: ['C', 'D'], luz: ['B'] }],
  ], 'B. Opone lo que viene a lo que se esperaba.'),
  'icf-lc-estructura-3': H('¿De quién es la frase?', 'En la noticia, la oración «Ninguno presentó cuentas que lo mostraran» corresponde a', [
    ['El concejo aprobó anoche, por once votos contra dos, cerrar la plaza principal a los carros los domingos.'],
    ['«Vamos a ganar un parque sin gastar un peso», dijo la concejala Rivas.'],
    ['Los comerciantes, en cambio, aseguraron que perderían la mitad de sus ventas.', 'Ninguno presentó cuentas que lo mostraran.'],
  ], ['una cita directa de la concejala.', 'lo que dicen los comerciantes, con otras palabras.', 'un comentario del periodista sobre lo que dijeron los comerciantes.', 'la decisión del concejo.'], [
    ['Las comillas encierran las palabras exactas de Rivas.', { luz: [1], n: { 1: 'Rivas, directa' } }],
    ['«Aseguraron que» cuenta lo de los comerciantes sin comillas: es estilo indirecto.', { luz: [2], n: { 2: 'comerciantes' } }],
    ['La última oración no tiene «dijo» ni «según»: nadie la firma, es la voz de quien escribe.', { luz: [3] }],
    ['No es Rivas ni el concejo, y no repite a los comerciantes: los pone en duda.', { x: ['A', 'B', 'D'], n: { B: 'los duda' }, luz: ['C'] }],
  ], 'C. Sin marca de cita, la voz es la del periodista, y evalúa.'),
  // ------------------------------------------------------------------------------------------- Argumentos
  'icf-lc-argumento-1': H('La tesis y sus razones', '¿Cuál es la tesis del texto?', [
    ['Cada salón debería tener una hora semanal de lectura libre.'],
    ['Quien elige qué leer, lee más:', 'en el colegio vecino, la biblioteca presta el doble desde que lo probaron.'],
    ['Además, leer sin nota quita el miedo a equivocarse.', 'Y no cuesta nada: los libros ya están en los estantes.'],
  ], ['Elegir qué leer hace que se lea más.', 'Los colegios deberían dar una hora a la semana para leer lo que cada uno quiera.', 'La biblioteca vecina presta el doble que antes.', 'La lectura libre no tiene costo.'], [
    ['La tesis es lo que el autor quiere que aceptes; las razones responden «¿por qué?».', {}],
    ['El «debería» del comienzo pide algo: es la candidata a tesis.', { luz: [0], n: { 0: 'pide' } }],
    ['Se pregunta «¿por qué?» y responde el resto: se lee más, quita el miedo, no cuesta.', { luz: [1, 3, 4], n: { 1: 'razón', 2: 'razones' } }],
    ['A y D son razones; C es el dato que sostiene a A.', { x: ['A', 'C', 'D'], n: { A: 'razón', C: 'dato', D: 'razón' }, luz: ['B'] }],
  ], 'B. Las demás opciones responden por qué hay que aceptarla.'),
  'icf-lc-argumento-2': H('Lo que debilita', '¿Cuál de estos datos debilitaría más la conclusión de la autora?', [
    ['Un estudio en cuarenta colegios siguió a dos mil estudiantes durante un año y encontró que los que desayunan en casa sacan mejores notas en matemáticas y lectura.'],
    ['Por eso, dice su autora, si el colegio diera un desayuno gratis a todos, el rendimiento general subiría.'],
  ], ['Los colegios del estudio eran públicos y privados.', 'Los que desayunaban eran, casi siempre, los que dormían más horas.', 'Muchos padres apoyan el desayuno escolar.', 'El estudio midió matemáticas y lectura.'], [
    ['Primero, qué se concluye: que el desayuno causa las buenas notas.', { luz: [1], n: { 1: 'conclusión' } }],
    ['El estudio solo muestra que las dos cosas van juntas.', { luz: [0], n: { 0: 'van juntas' } }],
    ['Debilita lo que dé otra explicación. B trae otra causa posible: dormir más.', { luz: ['B'], n: { B: 'otra causa' } }],
    ['A y D describen el estudio sin tocar la causa; C es una opinión, no un dato sobre notas.', { x: ['A', 'C', 'D'], n: { A: 'neutro', C: 'opinión', D: 'neutro' } }],
  ], 'B. Si dormir explica las notas, el desayuno quizá no las cambie.'),
  // ------------------------------------------------------------------------------------------- Textos literarios
  'icf-lc-literario-1': H('Lo que hace, no lo que dice', 'Por lo que hace el hermano, se puede inferir que', [
    ['Mi hermano dice que no le teme a nada.', 'Anoche se fue la luz y él encontró la vela antes que nadie.'],
    ['No la soltó en toda la noche.', 'Con cada ruido la alzaba hacia la puerta.'],
    ['Yo me dormí en el sofá. Él siguió sentado, con la vela en la mano, hasta que amaneció.'],
  ], ['es tan valiente como dice.', 'la oscuridad lo inquietaba más de lo que admite.', 'quería asustar a quien cuenta.', 'le gusta trasnochar.'], [
    ['Cuenta un «yo» que mira a su hermano desde afuera: lo que dice y lo que hace.', { luz: [0], n: { 0: 'lo que dice' } }],
    ['Los actos: no suelta la vela, la alza con cada ruido, no duerme.', { luz: [2, 3, 4], n: { 1: 'actos', 2: 'actos' } }],
    ['Esos actos chocan con su frase. A le cree a lo dicho, no a lo hecho.', { x: ['A'], n: { A: 'cree lo dicho' } }],
    ['Nada muestra ganas de asustar ni gusto por trasnochar.', { x: ['C', 'D'], n: { C: 'no está', D: 'lo pone uno' }, luz: ['B'] }],
  ], 'B. Un personaje se conoce por lo que hace, más que por lo que dice.'),
  'icf-lc-literario-2': H('El objeto que carga algo', 'En el fragmento, el reloj detenido representa, sobre todo,', [
    ['Desde que la abuela murió, nadie le da cuerda al reloj grande de la sala, el que ella misma compró en una feria.'],
    ['Marca las cuatro y diez desde hace un año.', 'Mamá le quita el polvo los domingos,', 'pero no deja que nadie lo arregle, ni siquiera el relojero que vino a ofrecerse.'],
  ], ['el descuido de la casa.', 'el deseo de que el tiempo con la abuela no pase.', 'que nadie sabe arreglar relojes.', 'la hora en que murió la abuela.'], [
    ['Un símbolo carga algo más. Se mira qué le pasa al objeto y quién lo cuida.', {}],
    ['Dejó de andar porque, desde que ella murió, nadie le da cuerda: el reloj queda atado a ella.', { luz: [0], n: { 0: 'atado a ella' } }],
    ['Mamá lo limpia, pero no deja que lo arreglen: lo cuida quieto.', { luz: [2, 3], n: { 1: 'lo cuida quieto' } }],
    ['A choca con el polvo que se quita; C se queda en lo literal; D: el texto no dice la hora.', { x: ['A', 'C', 'D'], n: { A: 'lo limpian', C: 'literal', D: 'no está' }, luz: ['B'] }],
  ], 'B. Que nadie lo arregle es querer que ese tiempo no avance.'),
  'icf-lc-literario-3': H('Tema y tono', 'El tono del poema es principalmente', [
    ['Vuelvo a la calle del colegio,', 'vuelvo a la tienda de don Luis,'],
    ['vuelvo al portón que ya no abre', 'y que de niña quise abrir.'],
    ['Todo está igual y nada es mío:', 'vuelvo, y ya no sé volver.'],
  ], ['alegre, por el reencuentro.', 'nostálgico: lo querido ya no le pertenece.', 'de enojo contra quien cerró el portón.', 'de burla hacia la infancia.'], [
    ['«Vuelvo» se repite en casi todos los versos: el poema pesa sobre el regreso.', { luz: [0, 1, 2, 5], n: { 0: 'repite' } }],
    ['Pero el regreso no se completa: el portón no abre, «nada es mío», «ya no sé volver».', { luz: [2, 4, 5], n: { 2: 'pérdida' } }],
    ['A se queda con el tema, volver, y pierde el sentimiento.', { x: ['A'], n: { A: 'solo el tema' } }],
    ['Nadie es culpado y la niñez no se ridiculiza.', { x: ['C', 'D'], n: { C: 'sin culpable', D: 'no se burla' }, luz: ['B'] }],
  ], 'B. Tema: volver; tono: la tristeza de que ya no sea igual.'),
  // ------------------------------------------------------------------------------------------- Textos filosóficos
  'icf-lc-filosofico-1': H('La pregunta detrás del caso', 'El problema que plantea el texto es', [
    ['Imagina una máquina que copia a una persona átomo por átomo', 'y la arma en otra ciudad, con todos sus recuerdos.'],
    ['La copia jura ser la misma que entró a la máquina.', '¿Lo es?', 'Ningún microscopio lo resolvería: las dos son idénticas.'],
    ['La pregunta, entonces, no es qué hay en el cuerpo, sino qué nos hace seguir siendo la misma persona.'],
  ], ['cómo construir una máquina que copie personas.', 'qué hace que alguien siga siendo la misma persona.', 'si un microscopio puede ver átomos.', 'cuántos recuerdos caben en un cuerpo.'], [
    ['El texto imagina un caso que no existe: es un experimento mental, sirve para pensar.', { luz: [0, 1], n: { 0: 'caso imaginado' } }],
    ['A toma el caso por el problema: la máquina es el medio, no la pregunta.', { x: ['A'], n: { A: 'el caso' } }],
    ['Más datos no la cierran: por eso es filosófica. C y D buscan un dato.', { luz: [4], x: ['C', 'D'], n: { C: 'un dato', D: 'un dato' } }],
    ['El último párrafo la dice entera.', { luz: [5, 'B'], n: { 2: 'la pregunta' } }],
  ], 'B. La máquina solo sirve para probar la pregunta por la identidad.'),
  'icf-lc-filosofico-2': H('El ejemplo que distingue', 'En el texto, el caso del pasillo del hospital sirve para', [
    ['Obedecer una regla no es lo mismo que seguirla.'],
    ['Obedece quien la cumple porque alguien lo vigila;', 'la sigue quien la cumple porque entiende para qué sirve.'],
    ['Pasa con los que no corren en el pasillo de un hospital:', 'uno camina porque hay un guardia; otro, porque piensa en los enfermos.'],
  ], ['mostrar que en los hospitales hay guardias.', 'ilustrar con un caso la diferencia entre obedecer y seguir una regla.', 'criticar a quienes corren en los hospitales.', 'definir qué es una regla.'], [
    ['Primero se ubica la distinción: dos palabras que parecen iguales.', { luz: [0], n: { 0: 'distingue' } }],
    ['El segundo párrafo define cada una por su motivo: la vigilancia o entender.', { luz: [1, 2], n: { 1: 'define' } }],
    ['El pasillo pone las dos maneras en un caso que se ve: el guardia y los enfermos.', { luz: [3, 4], n: { 2: 'caso' } }],
    ['A y C toman el ejemplo por el tema; D: no define la regla, sino dos maneras de cumplirla.', { x: ['A', 'C', 'D'], n: { A: 'literal', C: 'no critica', D: 'otra cosa' }, luz: ['B'] }],
  ], 'B. El ejemplo pone en escena la distinción.'),
  // ------------------------------------------------------------------------------------------- Textos discontinuos
  'icf-lc-discontinuo-1': H('La cifra y su nota', 'Según la infografía, es correcto afirmar que', [
    ['Titular: ¿Cuánta agua lleva lo que comes?'],
    ['Una taza de café: 140 litros.', 'Un huevo: 200 litros.', 'Una hamburguesa: 2 400 litros.'],
    ['Nota: se cuenta el agua usada para cultivar, criar y transportar, no la que se bebe.'],
  ], ['una hamburguesa contiene 2 400 litros de agua.', 'producir una hamburguesa gasta más agua que producir un huevo.', 'el café se prepara con 140 litros.', 'el huevo es el alimento más sano.'], [
    ['Cada parte hace algo: el titular pregunta, las cifras responden y la nota dice cómo leerlas.', { luz: [0], n: { 0: 'pregunta', 1: 'cifras', 2: 'cómo leer' } }],
    ['La nota cambia todo: es el agua usada para producir, no la que el alimento tiene.', { luz: [4] }],
    ['A y C leen la cifra sin la nota.', { x: ['A', 'C'], n: { A: 'sin la nota', C: 'sin la nota' } }],
    ['Nada habla de salud. B compara dos cifras de la misma lista y respeta la nota.', { x: ['D'], n: { D: 'no está' }, luz: [2, 3, 'B'] }],
  ], 'B. 2 400 es más que 200, y las dos cifras son agua de producción.'),
  'icf-lc-discontinuo-2': H('Entre viñetas', '¿Qué se puede inferir de la tira?', [
    ['Viñeta 1: un niño mira su boletín frente a la puerta.', 'Nube de pensamiento: «Ojalá papá esté dormido».'],
    ['Viñeta 2: el papá abre, con los lentes puestos.', 'Globo: «Te estaba esperando».'],
    ['Viñeta 3: el pasillo vacío.', 'Cartela: «Dos horas después».'],
  ], ['El niño dijo en voz alta que quería que su papá durmiera.', 'Entre la viñeta 2 y la 3 pasó un buen rato que la tira no muestra.', 'El papá dormía cuando llegó el niño.', 'El niño sacó buenas notas.'], [
    ['El borde dice cómo se habla: la nube es pensamiento, no voz.', { luz: [1], x: ['A'], n: { 0: 'piensa', A: 'era nube' } }],
    ['El papá abre despierto y lo esperaba: C choca con la viñeta 2.', { luz: [2, 3], x: ['C'], n: { C: 'choca' } }],
    ['Lo que pasó entre la 2 y la 3 no se dibuja; la cartela dice cuánto duró.', { luz: [5], n: { 2: 'salto' } }],
    ['D lo pone uno: nadie dice las notas, y el miedo del niño apunta a lo contrario.', { x: ['D'], n: { D: 'lo pone uno' }, luz: ['B'] }],
  ], 'B. Lo que hay entre viñetas se completa con la espera y las dos horas.'),
  'icf-lc-discontinuo-3': H('La pieza que no encaja', 'En la página, ¿qué pieza contradice a las demás?', [
    ['Titular: «La ciclovía vacía el centro».'],
    ['Gráfico: bicicletas por domingo en la Avenida 5, en pleno centro: 800 en marzo, 3 100 en octubre.'],
    ['Voz de un tendero: «Los domingos vendo más jugos que nunca».'],
    ['Pie de foto: familias en bicicleta frente a los locales de la avenida.'],
  ], ['El titular', 'El gráfico', 'La voz del tendero', 'El pie de foto'], [
    ['Se dice en pocas palabras qué afirma cada pieza.', {}],
    ['El gráfico: casi cuatro veces más bicicletas. La voz: más ventas. La foto: gente frente a los locales.', { luz: [1, 2, 3], n: { 1: 'más gente', 2: 'más ventas', 3: 'gente' } }],
    ['Las tres van en la misma dirección: se completan.', { x: ['B', 'C', 'D'], n: { B: 'completa', C: 'completa', D: 'completa' } }],
    ['Solo el titular dice que el centro queda vacío: choca con las otras tres.', { luz: [0, 'A'], n: { 0: 'choca' } }],
  ], 'A. Las otras tres piezas muestran más gente, no menos.'),
  // ------------------------------------------------------------------------------------------- Evaluar el texto
  'icf-lc-evalua-1': H('Lo que el aviso da por hecho', 'El aviso da por hecho que', [
    ['¿Tu hijo pasa horas frente al celular?'],
    ['Inscríbelo en el campamento Cerro Azul: diez días sin señal, entre ríos y montañas, con caminatas, fogatas y talleres de nudos.', 'Volverá hablando contigo otra vez.'],
    ['Cupos limitados para niños de 9 a 14 años. Inscripciones hasta el 30 de mayo.'],
  ], ['a los niños no les gustan los campamentos.', 'el celular le quita al hijo la conversación con sus padres.', 'en la montaña siempre hay señal.', 'los padres no tienen celular.'], [
    ['Un supuesto no se escribe, pero sin él la frase no funciona.', {}],
    ['«Volverá hablando contigo otra vez» solo tiene sentido si hoy no habla, y si la causa es lo que el campamento quita.', { luz: [1, 2], n: { 1: 'promesa' } }],
    ['La pregunta del comienzo nombra esa causa: el celular.', { luz: [0], n: { 0: 'el problema' } }],
    ['C dice lo contrario del aviso; A y D no hacen falta para que convenza.', { x: ['A', 'C', 'D'], n: { A: 'no hace falta', C: 'al revés', D: 'no hace falta' } }],
    ['Y la intención es vender cupos: el supuesto trabaja para eso.', { luz: [3, 'B'], n: { 2: 'intención' } }],
  ], 'B. Sin ese supuesto, la promesa del aviso no tendría sentido.'),
  'icf-lc-evalua-2': H('¿Alcanza el respaldo?', '¿Por qué el anuncio no basta para concluir que la mayoría de deportistas prefiere Rayo?', [
    ['Las bebidas Rayo anuncian en vallas de toda la ciudad:', '«Nueve de cada diez deportistas prefieren Rayo».'],
    ['En letra pequeña, al pie de la valla, se lee que la encuesta se hizo a diez atletas del equipo de ciclismo que patrocina la marca y que recibe de ella sus uniformes.'],
  ], ['Porque nueve de diez es una cifra baja.', 'Porque se preguntó a pocos, y todos tenían interés en la marca.', 'Porque los deportistas no toman bebidas.', 'Porque la letra pequeña es difícil de leer.'], [
    ['Se mira el respaldo: ¿a quién y a cuántos se preguntó?', { luz: [1, 2], n: { 1: 'respaldo' } }],
    ['Diez personas no hablan por todos los deportistas: de pocos casos no se concluye sobre todos.', { n: { 0: 'todos' } }],
    ['Y son del equipo que la marca paga: tienen un interés.', { luz: ['B'], n: { B: 'pocos e interesados' } }],
    ['A confunde: nueve de diez es mucho; el problema es de dónde sale. C no está; D habla de la forma.', { x: ['A', 'C', 'D'], n: { A: 'no es eso', C: 'no está', D: 'la forma' } }],
  ], 'B. La muestra es pequeña y tiene interés en la marca.'),
  'icf-lc-evalua-3': H('El valor de fondo', '¿Qué valor defiende el autor de la columna?', [
    ['Un río no es una tubería.'],
    ['Quienes quieren encauzarlo en concreto lo miran como un estorbo que hay que domar.', 'Pero el río es la casa de garzas y peces, y la memoria de los pueblos que crecieron en su orilla.'],
    ['Antes de preguntar cuánto cuesta dejarlo libre, habría que preguntar cuánto vale.'],
  ], ['La eficiencia de las obras públicas.', 'El cuidado de la naturaleza y de lo que significa para la gente.', 'El ahorro del dinero del municipio.', 'El progreso por medio de la construcción.'], [
    ['Las imágenes delatan cómo se ve el mundo: «tubería» y «estorbo» es la mirada de otros.', { luz: [0, 1], n: { 0: 'imagen', 1: 'la otra mirada' } }],
    ['El autor responde con «casa» y «memoria»: el río vale por sí y por la gente.', { luz: [2] }],
    ['Cierra oponiendo costar a valer: no mide en plata.', { luz: [3], x: ['C'], n: { C: 'costar' } }],
    ['A y D son los valores de quienes encauzan, la postura que él critica.', { x: ['A', 'D'], n: { A: 'la otra voz', D: 'la otra voz' }, luz: ['B'] }],
  ], 'B. Opone «cuánto vale» a «cuánto cuesta».'),
  // ------------------------------------------------------------------------------------------- Comparar textos
  'icf-lc-comparar-1': H('Matizar no es negar', '¿Cómo se relaciona el texto 2 con el texto 1?', [
    ['Texto 1. Leer en papel ayuda a entender más:', 'en varias pruebas, quienes leyeron impreso respondieron mejor que quienes leyeron en pantalla.'],
    ['Texto 2. La ventaja del papel aparece sobre todo con textos largos y lectura con prisa;', 'con textos cortos y sin reloj, casi desaparece.'],
  ], ['Lo contradice: la pantalla es mejor.', 'Lo matiza: dice en qué casos se cumple lo que afirma el texto 1.', 'Lo ejemplifica con una prueba.', 'No tienen un tema en común.'], [
    ['Primero, lo que comparten: los dos hablan de papel, pantalla y cuánto se entiende.', { luz: [0, 2], n: { 0: 'tema', 1: 'tema' } }],
    ['El texto 2 no niega la ventaja: la acepta con textos largos y con prisa.', { luz: [2], x: ['A'], n: { A: 'no la niega' } }],
    ['Pero le pone límites: con textos cortos y sin reloj casi desaparece.', { luz: [3], n: { 1: 'pone límites' } }],
    ['No trae un caso de la idea del 1, y sí comparten tema.', { x: ['C', 'D'], luz: ['B'] }],
  ], 'B. Matizar es decir cuándo vale una afirmación.'),
  'icf-lc-comparar-2': H('Conceder y responder', 'Frente al argumento de Ana, Beto', [
    ['Ana: el colegio debería prohibir el celular en clase.', 'Distrae, y cada notificación corta la atención por varios minutos, aunque nadie la conteste.'],
    ['Beto: prohibirlo es un error.', 'Es cierto que distrae, pero sirve para buscar datos y, en una emergencia, para avisar a la familia.'],
  ], ['lo rechaza diciendo que el celular no distrae.', 'acepta que distrae, pero da razones para no prohibirlo.', 'ataca a Ana en lugar de responderle.', 'está de acuerdo con prohibirlo.'], [
    ['En una frase: Ana pide prohibir; Beto, no prohibir.', { luz: [0, 2], n: { 0: 'prohibir', 1: 'no prohibir' } }],
    ['«Es cierto que distrae» acepta la razón de Ana: es una concesión.', { luz: [3], x: ['A'], n: { A: 'sí lo acepta' } }],
    ['Después, «pero» trae sus razones: datos y emergencias. No habla de Ana como persona.', { x: ['C'], n: { C: 'no ataca' } }],
    ['D choca con «prohibirlo es un error».', { luz: [2, 'B'], x: ['D'], n: { D: 'choca' } }],
  ], 'B. Concede la razón de Ana y responde con otras.'),
});
