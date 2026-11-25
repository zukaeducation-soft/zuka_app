// Ejemplos resueltos y marcados de Comprensión lectora (libros 3 y 4). Textos originales.
// H(título, pregunta, párrafos [[trozos]], opciones, pasos [lo que se explica, { luz: trozos u opciones, x: opciones que se tachan,
// n: { párrafo u opción: rótulo } }], respuesta). Los trozos del texto se cuentan desde 0.
const H = (t, q, T, O, m, r) => {
  const nT = T.flat().length, id = k => (typeof k === 'string' ? nT + 'ABCD'.indexOf(k) : k), pa = k => (/[A-D]/.test(k) ? T.length + 'ABCD'.indexOf(k) : +k);
  return [{ t, q, escena: 'hoja', en: { letras: [...T.map((_, i) => `${i + 1}`), ...'ABCD'.slice(0, O.length)], paras: [...T, ...O.map(o => [o])] },
    m: m.map(([d, v = {}]) => [d, { ...(v.luz ? { luz: v.luz.map(id) } : {}), ...(v.x ? { tacha: v.x.map(id) } : {}), ...(v.n ? { nota: Object.fromEntries(Object.entries(v.n).map(([k, s]) => [pa(k), s])) } : {}) }]), r }];
};
Object.assign(EJ, {
  // ------------------------------------------------------------------------------------------------ Libro 3
  'pu-el-1': H('Antes de leer', 'Un texto se titula «Instrucciones para escuchar un río», lo firma una ingeniera hidráulica y salió en una revista de ciencia para todo público. ¿Qué se puede esperar?', [['Título: Instrucciones para escuchar un río.'], ['Firma: una ingeniera hidráulica.'], ['Fuente: revista de ciencia para todo público.']], ['Un poema sobre el agua.', 'Una explicación de qué dice el sonido de un río.', 'Una noticia sobre una inundación.', 'El manual de una máquina.'], [
    ['El título habla de instrucciones y de escuchar: suena a poema, pero todavía no se decide.', { luz: [0], n: { 0: 'tema' } }],
    ['Quien firma estudia cómo se mueve el agua. El poema pierde fuerza.', { luz: [1], n: { 1: 'quién habla' }, x: ['A'] }],
    ['Una revista de ciencia para todo público no da noticias ni vende máquinas: explica.', { luz: [2], n: { 2: 'para qué' }, x: ['C', 'D'] }],
    ['Los tres bordes apuntan a lo mismo. La apuesta se confirma al leer.', { luz: ['B'] }],
  ], 'B. Ningún borde bastaba solo: se cruzan.'),
  'pu-el-2': H('La idea que reúne', '¿Cuál es la idea central del párrafo?', [['El mercado abre a las cuatro.', 'A esa hora llegan los camiones con flores.', 'A las cinco se prende el fogón de los caldos.', 'Cuando el barrio despierta, el mercado ya ha vivido medio día.']], ['Los camiones traen flores.', 'El mercado vive su jornada antes que el barrio.', 'En el mercado se vende caldo.', 'Todos los barrios madrugan.'], [
    ['Hay tres detalles con su hora: abre, llegan flores, se prende el fogón.', { luz: [0, 1, 2] }],
    ['La última oración los recoge: todo eso pasó antes de que el barrio despertara.', { luz: [3] }],
    ['A y C son detalles verdaderos, pero cada uno deja por fuera a los demás.', { x: ['A', 'C'], n: { A: 'un detalle', C: 'un detalle' } }],
    ['D habla de todos los barrios: es más de lo que dice el párrafo.', { x: ['D'], n: { D: 'de más' } }],
    ['B cubre las cuatro oraciones.', { luz: ['B'] }],
  ], 'B.'),
  'pu-el-3': H('Una pregunta EXCEPTO', 'Según el texto, la biblioteca móvil hace todo lo siguiente, EXCEPTO', [['El bus recorre siete veredas.', 'Presta libros por dos semanas', 'y deja uno de regalo en cada escuela.'], ['Los viernes, sus choferes leen en voz alta.']], ['prestar libros.', 'regalar libros a las escuelas.', 'enseñar a manejar.', 'leer en voz alta.'], [
    ['En EXCEPTO se busca cada opción en el texto y se marca la que sí está.', {}],
    ['Prestar: está en el primer párrafo. Regalar, también.', { luz: [1, 2], x: ['A', 'B'], n: { A: 'está', B: 'está' } }],
    ['Leer en voz alta: está en el segundo.', { luz: [3], x: ['D'], n: { D: 'está' } }],
    ['Los choferes aparecen, pero leen: nadie enseña a manejar. La palabra conocida es el anzuelo.', { luz: ['C'], n: { C: 'no está' } }],
  ], 'C.'),
  'pu-tt-1': H('Qué tipología manda', '¿Qué tipología predomina en el texto?', [['Mi tía cose de noche.', 'La lámpara es amarilla y la tela, áspera.'], ['Por eso creo que el taller debería abrir de día:', 'la luz natural cuida los ojos y ahorra energía.']], ['Narrativa', 'Descriptiva', 'Argumentativa', 'Expositiva'], [
    ['Hay algo que se cuenta y algo que se describe.', { luz: [0, 1], n: { 0: 'cuenta y muestra' } }],
    ['«Creo que… debería» es una postura, y después vienen dos razones.', { luz: [2, 3], n: { 1: 'defiende' } }],
    ['¿Para qué está la primera parte? Para llegar a la segunda: «por eso» las une.', {}],
    ['Manda la que organiza todo el texto, aunque la otra sea más vistosa.', { luz: ['C'], x: ['A', 'B', 'D'] }],
  ], 'C. Contar y describir están al servicio de defender una idea.'),
  'pu-tt-2': H('¿Entrevista o testimonio?', '¿A qué género pertenece el fragmento?', [['—¿Cuándo aprendió a nadar?'], ['—A los setenta. Antes me daba pena.'], ['—¿Y qué cambió?'], ['—Que se me acabó el tiempo de la pena.']], ['Testimonio', 'Entrevista', 'Crónica', 'Columna de opinión'], [
    ['Cada raya cambia el turno de quien habla: hay dos voces.', { luz: [0, 1, 2, 3] }],
    ['Una solo pregunta y la otra responde.', { n: { 0: 'pregunta', 1: 'responde', 2: 'pregunta', 3: 'responde' } }],
    ['En un testimonio también se cuenta lo vivido, pero habla una sola voz.', { x: ['A'] }],
    ['No hay quien narre con hora y lugar, ni quien defienda una tesis.', { x: ['C', 'D'], luz: ['B'] }],
  ], 'B.'),
  'pu-tt-3': H('El papel de cada párrafo', 'En la estructura del texto, el segundo párrafo cumple la función de', [['Los parques deberían cerrar más tarde.'], ['Se dirá que de noche son peligrosos.'], ['Pero un lugar con gente y con luz es más seguro que uno vacío.']], ['presentar la tesis.', 'dar un ejemplo.', 'presentar una objeción.', 'concluir.'], [
    ['El primero dice lo que se defiende.', { luz: [0], n: { 0: 'tesis' } }],
    ['«Se dirá que» trae la voz de otros: no es lo que piensa quien escribe.', { luz: [1], n: { 1: 'objeción' } }],
    ['«Pero» responde a esa voz.', { luz: [2], n: { 2: 'respuesta' } }],
    ['Entonces el segundo no defiende ni concluye: anticipa lo que dirían en contra.', { luz: ['C'], x: ['A', 'B', 'D'] }],
  ], 'C.'),
  'pu-ie-1': H('Juntar dos datos', '¿Cuántos años tenía Elisa cuando abrió la panadería?', [['Elisa nació en 1961, en una casa con horno.'], ['Vendió arepas durante diez años.', 'En 1989 abrió la panadería', 'y en 2004 le compró el local a su dueño.']], ['10', '28', '43', '15'], [
    ['Palabra clave de la pregunta: «abrió la panadería». Se busca y se encuentra un año.', { luz: [3] }],
    ['El texto no dice la edad. Falta otro dato: cuándo nació.', { luz: [0] }],
    ['Se juntan los dos: 1989 menos 1961 son 28.', { luz: ['B'] }],
    ['10 son los años de las arepas; 43 sale de usar 2004; 15 son los años entre abrir y comprar.', { x: ['A', 'C', 'D'], n: { A: 'otro dato', C: 'otro año', D: 'otra resta' } }],
  ], 'B. Los distractores usan números que sí están en el texto.'),
  'pu-ie-2': H('La paráfrasis fiel', '¿Cuál opción dice lo mismo que la oración del texto?', [['Algunos pescadores casi nunca salen con luna llena.']], ['Los pescadores no salen con luna llena.', 'Ciertos pescadores rara vez salen cuando hay luna llena.', 'Algunos pescadores solo salen con luna llena.', 'Con luna llena hay menos peces.'], [
    ['Se miran las palabras que miden: «algunos» (cuántos) y «casi nunca» (qué tan seguido).', { luz: [0] }],
    ['A las pierde a las dos: habla de todos y de nunca.', { x: ['A'], n: { A: 'exagera' } }],
    ['C le da la vuelta al sentido. D agrega una razón que nadie dio.', { x: ['C', 'D'], n: { C: 'al revés', D: 'no está' } }],
    ['B cambia las palabras y conserva las medidas: ciertos, rara vez.', { luz: ['B'] }],
  ], 'B.'),
  'pu-ie-3': H('Verdadero, pero no dicho', 'Según el texto, es correcto afirmar que', [['Las abuelas del pueblo tejen sombreros.', 'Cada sombrero toma tres semanas', 'y se vende en la feria de agosto.']], ['tejer relaja a las personas mayores.', 'los sombreros son caros.', 'hacer un sombrero toma tres semanas.', 'la feria se hace para vender sombreros.'], [
    ['A puede ser cierto en la vida, pero ¿qué frase del texto lo dice? Ninguna.', { x: ['A'], n: { A: 'no está' } }],
    ['B parece lógico si demoran tanto, pero el precio no aparece: lo llenó uno.', { x: ['B'], n: { B: 'lo llena uno' } }],
    ['D cambia el sentido: se venden **en** la feria; no dice que la feria sea **para** eso.', { luz: [2], x: ['D'], n: { D: 'cambia la relación' } }],
    ['C se puede señalar con el dedo.', { luz: [1, 'C'] }],
  ], 'C.'),
  'pu-ie-4': H('¿De quién es la idea?', '¿Quién sostiene que el puente es inseguro?', [['Según la alcaldía, el puente resiste cien años.'], ['La ingeniera Paz, en cambio, advierte que sus cables están gastados y que cruzarlo es un riesgo.'], ['A mi juicio, conviene revisarlo antes de discutir.']], ['La alcaldía', 'La ingeniera Paz', 'El autor del texto', 'Los vecinos'], [
    ['«Según» le entrega la primera idea a la alcaldía, que dice lo contrario.', { luz: [0], n: { 0: 'la alcaldía' }, x: ['A'] }],
    ['«Advierte que» le entrega la segunda a la ingeniera.', { luz: [1], n: { 1: 'la ingeniera' } }],
    ['«A mi juicio» es del autor, pero él solo pide revisar: no dice que sea inseguro.', { luz: [2], n: { 2: 'el autor' }, x: ['C'] }],
    ['Los vecinos no hablan. Queda una dueña.', { x: ['D'], luz: ['B'] }],
  ], 'B.'),
  'pu-vo-1': H('La prueba del reemplazo', '¿Qué palabra puede reemplazar a «levantó» sin cambiar el sentido?', [['La jueza levantó la sesión', 'y todos salieron a almorzar.']], ['alzó', 'construyó', 'terminó', 'despertó'], [
    ['Las cuatro pueden ser sinónimos de «levantar» en alguna parte. Decide la oración.', {}],
    ['La pista viene después: si todos salieron, la sesión se acabó.', { luz: [1] }],
    ['«Alzó la sesión», «construyó la sesión», «despertó la sesión»: ninguna encaja con salir a almorzar.', { x: ['A', 'B', 'D'] }],
    ['«Terminó la sesión y todos salieron»: dice lo mismo.', { luz: [0, 'C'] }],
  ], 'C.'),
  'pu-vo-2': H('El sentido que eligen las vecinas', 'En el texto, «clave» significa', [['El arquitecto señaló la piedra más alta del arco.', '—Si quitan la clave, las demás se caen —dijo.']], ['contraseña', 'explicación', 'signo del pentagrama', 'pieza central que cierra el arco'], [
    ['El sentido más común es «contraseña»: por eso es la primera trampa.', { x: ['A'], n: { A: 'el más común' } }],
    ['Las palabras vecinas hablan de piedra y de arco, no de música ni de respuestas.', { luz: [0], x: ['B', 'C'] }],
    ['Además se dice qué pasa sin ella: las demás se caen.', { luz: [1] }],
    ['Se prueba en la oración: «si quitan la pieza que cierra el arco, las demás se caen».', { luz: ['D'] }],
  ], 'D.'),
  'pu-vo-3': H('Una manera de decir', '«Se le fueron las luces» quiere decir que Tomás', [['Tomás había estudiado un mes.', 'Pero frente a la primera pregunta se le fueron las luces:', 'no recordó ni su apellido.']], ['se quedó sin electricidad.', 'se quedó en blanco.', 'se durmió.', 'perdió el examen.'], [
    ['Sumando las palabras sale un apagón, y en la escena no hay ninguno.', { x: ['A'], n: { A: 'al pie de la letra' } }],
    ['Los dos puntos explican la expresión: no recordó ni su apellido.', { luz: [1, 2] }],
    ['«Ni su apellido» exagera para mostrar cuánto olvidó.', {}],
    ['No dice que durmiera ni cómo le fue al final.', { x: ['C', 'D'], n: { C: 'no está', D: 'no está' }, luz: ['B'] }],
  ], 'B.'),
  'pu-vo-4': H('Leer por piezas', '¿Qué significa «intransitable» en el texto?', [['Después del derrumbe el camino quedó intransitable:', 'ni las mulas pudieron pasar.']], ['que no se puede recorrer', 'que no se puede mover', 'que pasa rápido', 'que es muy largo'], [
    ['Se parte: in- (no) + transit (pasar, como en tránsito) + -able (que se puede).', { luz: [0] }],
    ['Se arma otra vez: que no se puede pasar.', {}],
    ['El texto lo confirma después de los dos puntos.', { luz: [1] }],
    ['B confunde pasar con mover. C y D no tienen el «no» del comienzo.', { x: ['B', 'C', 'D'], luz: ['A'] }],
  ], 'A.'),
  'pu-rf-1': H('¿A quién señala?', '¿A qué se refiere «esta» en el texto?', [['Compararon la radio con la televisión.', 'Aquella dejaba las manos libres;', 'esta pedía sentarse a mirar.']], ['la radio', 'la televisión', 'las manos', 'la comparación'], [
    ['Hay dos candidatas, en orden: la radio y la televisión.', { luz: [0] }],
    ['«Aquella» señala la más lejana, la radio; «esta», la más cercana.', { luz: [1, 2] }],
    ['Se reemplaza y se lee: «la televisión pedía sentarse a mirar». Tiene sentido.', { luz: ['B'] }],
    ['Con la radio no: se oye, no se mira.', { x: ['A', 'C', 'D'] }],
  ], 'B.'),
  'pu-rf-2': H('Lo que se calla', 'En «Nora, en cambio, dos», ¿qué palabra está callada?', [['Iván sembró cinco guayabos;', 'Nora, en cambio, dos.']], ['Iván', 'guayabos', 'tierra', 'años'], [
    ['La segunda parte quedó corta: faltan el verbo y lo que se contó.', { luz: [1] }],
    ['Lo que falta está en la primera mitad: sembró… guayabos.', { luz: [0] }],
    ['Se completa: «Nora, en cambio, **sembró** dos **guayabos**». La coma guarda el puesto del verbo.', { luz: ['B'] }],
    ['Las demás no responden a «dos ¿qué?».', { x: ['A', 'C', 'D'] }],
  ], 'B. Se callan el verbo y los guayabos.'),
  'pu-cn-1': H('El conector que falta', '¿Qué conector completa el texto?', [['La receta es barata y rápida.', '______, nadie la prepara en casa.']], ['Por lo tanto', 'Además', 'Sin embargo', 'Por ejemplo'], [
    ['Primero se lee la relación, sin mirar las opciones. Si algo es barato y rápido, uno espera que se prepare.', { luz: [0] }],
    ['Pasa lo contrario de lo esperado: es una oposición.', { luz: [1] }],
    ['«Por lo tanto» traería lo esperado; «además» sumaría otra ventaja; «por ejemplo» mostraría un caso.', { x: ['A', 'B', 'D'], n: { A: 'consecuencia', B: 'suma', D: 'ejemplo' } }],
    ['«Sin embargo» opone.', { luz: ['C'], n: { C: 'opone' } }],
  ], 'C.'),
  'pu-cn-2': H('¿Qué hace el párrafo?', 'La función del segundo párrafo es', [['Caminar la ciudad la vuelve más segura.'], ['Es cierto que hay calles donde hoy nadie se atreve.'], ['Justamente por eso hay que llenarlas de pasos.']], ['ejemplificar.', 'conceder algo a quien piensa distinto.', 'concluir.', 'definir.'], [
    ['El primero afirma.', { luz: [0], n: { 0: 'afirma' } }],
    ['«Es cierto que» acepta algo que juega en contra: es la marca de una concesión.', { luz: [1], n: { 1: 'concede' } }],
    ['«Por eso» usa lo concedido para reforzar la idea del comienzo.', { luz: [2], n: { 2: 'concluye' } }],
    ['Conceder no es rendirse: es reconocer antes de responder.', { luz: ['B'], x: ['A', 'C', 'D'] }],
  ], 'B.'),
  // ------------------------------------------------------------------------------------------------ Libro 4
  'pu-in-1': H('Señalar la pista', '¿Qué se puede inferir del texto?', [['Cuando sonó el timbre, Julia escondió el cuaderno bajo la almohada', 'y encendió el televisor sin sonido.'], ['—¿Estudiando? —preguntó su madre.', '—Descansando —dijo ella.']], ['Julia no quería que supieran que escribía o leía.', 'Julia odia estudiar.', 'La madre es muy estricta.', 'El televisor está dañado.'], [
    ['Dos acciones rápidas: esconde algo y finge otra cosa.', { luz: [0, 1] }],
    ['Además responde lo contrario de lo que hacía.', { luz: [3] }],
    ['Juntas sostienen una sola idea: ocultaba lo del cuaderno.', { luz: ['A'] }],
    ['B, C y D necesitan algo que el texto no da: que odie, que la madre castigue, que el aparato falle.', { x: ['B', 'C', 'D'], n: { B: 'lo pone uno', C: 'lo pone uno', D: 'lo pone uno' } }],
  ], 'A. Una inferencia se señala con el dedo.'),
  'pu-in-2': H('Lo que se da por hecho', 'La frase presupone que', [['La emisora volvió a transmitir desde el faro.']], ['la emisora ya había transmitido desde el faro.', 'el faro es viejo.', 'la emisora transmitirá siempre.', 'nadie oía la emisora.'], [
    ['La palabra delatora es «volvió a»: solo tiene sentido si antes pasó lo mismo.', { luz: [0] }],
    ['Se prueba negando la frase: «la emisora **no** volvió a transmitir». Aun así, antes había transmitido.', { luz: ['A'] }],
    ['Lo que sobrevive a la negación es lo presupuesto.', {}],
    ['B, C y D pueden ser falsas sin que la frase pierda sentido.', { x: ['B', 'C', 'D'] }],
  ], 'A.'),
  'pu-in-3': H('Después no es por', 'Según el texto, ¿por qué bajó la venta de paraguas?', [['En mayo cambió el logo de la tienda', 'y ese mes bajó la venta de paraguas.'], ['Fue el mayo más seco en veinte años:', 'nadie tuvo que abrir uno.']], ['Porque cambió el logo.', 'Porque casi no llovió.', 'Porque subió el precio.', 'Porque era mayo.'], [
    ['Dos hechos del mismo mes: el logo y la baja.', { luz: [0, 1] }],
    ['Pasar juntos no es causar. Se quita el primero: si el logo no hubiera cambiado, ¿se venderían paraguas sin lluvia? No.', { x: ['A'], n: { A: 'solo coincide' } }],
    ['El segundo párrafo da la causa: no llovió y nadie los necesitó.', { luz: [2, 3, 'B'] }],
    ['El precio no se menciona, y mayo es el momento, no el motivo.', { x: ['C', 'D'] }],
  ], 'B.'),
  'pu-in-4': H('Lo que muestran los gestos', '¿Qué actitud muestra el abuelo?', [['El abuelo pasó la mano por la puerta del taller, ya sin herramientas.', '—Aquí cabía todo el barrio —dijo,', 'y se demoró en ponerle el candado.']], ['Desdén', 'Nostalgia', 'Enojo', 'Indiferencia'], [
    ['Nadie nombra el sentimiento: está en lo que hace.', { luz: [0] }],
    ['Recuerda con cariño algo que ya no está.', { luz: [1] }],
    ['Demorarse en cerrar es no querer irse.', { luz: [2] }],
    ['El desdén desprecia, el enojo culpa y la indiferencia no se demora.', { x: ['A', 'C', 'D'], luz: ['B'] }],
  ], 'B.'),
  'pu-ap-1': H('Del caso al principio', 'El texto muestra un principio. ¿Qué situación lo cumple?', [['Un colegio quitó los timbres.', 'Cada grupo empezó a mirar su reloj', 'y llegaba más a tiempo que antes.']], ['Pusieron un vigilante y nadie volvió a llegar tarde.', 'Cuando dejaron de recordarles la dosis, los pacientes aprendieron a llevar su propia cuenta.', 'Cambiaron los timbres por campanas.', 'Se perdió el reloj y todos llegaron tarde.'], [
    ['Se saca el principio sin nombrar el caso: al quitar un control externo, cada quien se hizo cargo y funcionó mejor.', { luz: [0, 1, 2] }],
    ['A hace lo contrario: añade un control.', { x: ['A'], n: { A: 'al revés' } }],
    ['C habla de timbres, pero el tema no es la estructura. D quita algo y empeora.', { x: ['C', 'D'], n: { C: 'solo el tema', D: 'falta una pieza' } }],
    ['B tiene todas las piezas: se quita el recordatorio, cada quien se encarga y sale bien.', { luz: ['B'] }],
  ], 'B.'),
  'pu-ap-2': H('La misma relación', 'SEMILLA es a ÁRBOL como', [['Semilla : árbol']], ['hoja : rama', 'borrador : libro', 'jardinero : árbol', 'pino : árbol'], [
    ['Se dice la relación con un verbo: la semilla **llega a ser** árbol.', { luz: [0], n: { 0: 'llega a ser' } }],
    ['La hoja no llega a ser rama: es una parte.', { x: ['A'], n: { A: 'parte y todo' } }],
    ['El jardinero cuida el árbol; el pino es un tipo de árbol. Comparten la palabra, no la relación.', { x: ['C', 'D'], n: { C: 'quien lo cuida', D: 'un tipo de' } }],
    ['El borrador llega a ser libro.', { luz: ['B'], n: { B: 'llega a ser' } }],
  ], 'B.'),
  'pu-fu-1': H('Voces en un párrafo', '¿Qué idea es del autor?', [['«El parque está perdido», dijo el administrador.'], ['Según un estudio, recibe la mitad de visitantes que antes.'], ['No está perdido, sino mal contado: me parece que nadie cuenta a los que entran de madrugada.']], ['El parque está perdido.', 'El parque recibe la mitad de visitantes.', 'Los visitantes están mal contados.', 'El parque abre de madrugada.'], [
    ['Las comillas entregan la primera idea al administrador.', { luz: [0], n: { 0: 'administrador' }, x: ['A'] }],
    ['«Según un estudio» entrega la segunda.', { luz: [1], n: { 1: 'un estudio' }, x: ['B'] }],
    ['«No… sino…» y «me parece» son del autor: niega lo del otro y pone lo suyo.', { luz: [2, 'C'], n: { 2: 'el autor' } }],
    ['D usa palabras del texto, pero nadie dice a qué hora abre.', { x: ['D'], n: { D: 'no está' } }],
  ], 'C.'),
  'pu-fu-2': H('Una cita de afuera', 'La tesis es: «Leer en voz alta en casa mejora el vocabulario de los niños». ¿Qué dato la **debilita**?', [['Tesis: leer en voz alta en casa mejora el vocabulario.']], ['En las casas donde se lee, los niños usan más palabras.', 'Niños a quienes solo se les conversa tienen el mismo vocabulario que aquellos a quienes se les lee.', 'Los libros para niños tienen muchos dibujos.', 'A los niños les gusta que les lean.'], [
    ['Para cada dato se pregunta: si fuera cierto, ¿creería más, menos o igual en la tesis?', { luz: [0] }],
    ['A la apoya.', { x: ['A'], n: { A: 'fortalece' } }],
    ['C y D pueden ser ciertas sin tocar el vocabulario.', { x: ['C', 'D'], n: { C: 'no pesa', D: 'no pesa' } }],
    ['Con B, sin lectura se logra lo mismo: ya no está claro que leer sea lo que mejora.', { luz: ['B'], n: { B: 'debilita' } }],
  ], 'B.'),
  'pu-ag-1': H('Qué defiende y por qué', '¿Cuál es el argumento principal del texto?', [['Las clases deberían empezar más tarde.'], ['En la adolescencia el sueño llega más tarde: un joven que madruga a las cinco asiste, pero no aprende.'], ['Sin duda, cambiar el horario incomoda a las familias.']], ['Las clases deben empezar más tarde.', 'Los jóvenes que madrugan demasiado no aprenden bien.', 'El cambio incomoda a las familias.', 'Los jóvenes son perezosos.'], [
    ['¿Qué defiende? «Deberían» marca la tesis.', { luz: [0], n: { 0: 'tesis' } }],
    ['¿Por qué? La razón viene en el segundo párrafo.', { luz: [1], n: { 1: 'argumento' } }],
    ['«Sin duda» concede un problema: no apoya la tesis.', { luz: [2], n: { 2: 'concede' } }],
    ['A es la tesis, C la concesión y D no está. Queda la razón.', { x: ['A', 'C', 'D'], n: { A: 'tesis', C: 'concesión', D: 'no está' }, luz: ['B'] }],
  ], 'B.'),
  'pu-ag-2': H('El tono', '¿Qué tono usa el autor al hablar del proyecto?', [['El proyecto ha sido presentado, felizmente, por cuarta vez.', 'Los vecinos ya conocen de memoria la maqueta;', 'lo que aún no conocen es el primer ladrillo.']], ['Entusiasta', 'Crítico con humor', 'Neutral', 'Triste'], [
    ['Se quita el adverbio: «presentado por cuarta vez». El dato sigue; lo que se va es la actitud.', { luz: [0] }],
    ['«Felizmente» no va con lo que sigue: cuatro presentaciones y nada construido.', { luz: [1, 2] }],
    ['El choque entre la palabra alegre y el hecho produce humor, y el humor critica.', { luz: ['B'] }],
    ['No hay entusiasmo verdadero ni tristeza, y la maqueta de memoria no es neutral.', { x: ['A', 'C', 'D'] }],
  ], 'B.'),
  'pu-ag-3': H('¿Se puede ir a mirar?', '¿Cuál de las oraciones es una opinión?', [['El museo tiene 412 piezas.'], ['La sala principal mide treinta metros.'], ['Ya era hora de que el barrio tuviera un museo así.'], ['La entrada cuesta ocho mil pesos.']], ['La 1', 'La 2', 'La 3', 'La 4'], [
    ['Para cada una: si alguien lo duda, ¿hay a dónde ir a mirar?', {}],
    ['Las piezas se cuentan, la sala se mide y el precio está en la taquilla: hechos.', { luz: [0, 1, 3], n: { 0: 'se cuenta', 1: 'se mide', 3: 'se consulta' }, x: ['A', 'B', 'D'] }],
    ['«Ya era hora» no se mide: dice qué le parece a quien habla.', { luz: [2, 'C'], n: { 2: 'valora' } }],
  ], 'C. No hizo falta un «creo» para que fuera opinión.'),
  'pu-lf-1': H('Cuatro figuras', '¿Qué figura hay en el texto y qué quiere decir?', [['La casa nos esperaba despierta,', 'con todas las ventanas mirando el camino.']], ['Hipérbole: la casa era enorme.', 'Comparación: la casa parecía un camino.', 'Personificación: la casa parecía aguardar a los que llegaban.', 'Metáfora: la casa era un ojo.'], [
    ['¿Qué hace la casa? Espera, está despierta y mira: cosas de personas.', { luz: [0, 1] }],
    ['Dar acciones humanas a lo que no es humano es personificar.', { n: { 0: 'humano' } }],
    ['No hay «como», no se exagera un tamaño y no se dice que la casa sea otra cosa.', { x: ['A', 'B', 'D'] }],
    ['Detrás de la imagen: al llegar, la casa iluminada daba la sensación de aguardarlos.', { luz: ['C'] }],
  ], 'C.'),
  'pu-lf-2': H('Darle la vuelta al elogio', '¿Qué piensa en realidad quien escribe?', [['Qué puntual es nuestro ascensor:', 'se daña todos los lunes a la misma hora.', 'Deberían darle un premio.']], ['Que el ascensor funciona bien.', 'Que el ascensor falla demasiado.', 'Que el ascensor merece un premio.', 'Que los lunes son malos.'], [
    ['El elogio: puntual y digno de premio.', { luz: [0, 2] }],
    ['El hecho, que va en serio: se daña todos los lunes.', { luz: [1], n: { 0: 'elogio y hecho chocan' } }],
    ['Cuando lo dicho choca con lo que pasa, hay ironía: se le da la vuelta al elogio.', { luz: ['B'] }],
    ['A y C toman las palabras al pie de la letra. D culpa al lunes.', { x: ['A', 'C', 'D'] }],
  ], 'B.'),
  'pu-dt-1': H('En los dos o en uno', '¿En qué coinciden los dos textos?', [['Texto 1: Las motos llegan donde no llega el bus.', 'Por eso crecen, aunque hacen ruido.'], ['Texto 2: El ruido de las motos enferma.', 'La ciudad debería limitarlas.']], ['Las motos deben limitarse.', 'Las motos hacen ruido.', 'El bus no llega a todas partes.', 'El ruido enferma.'], [
    ['Cada opción se busca en **los dos** textos.', {}],
    ['El ruido está en el 1 («aunque hacen ruido») y en el 2.', { luz: [1, 2, 'B'] }],
    ['Limitarlas y enfermar solo están en el 2.', { x: ['A', 'D'], n: { A: 'solo el 2', D: 'solo el 2' } }],
    ['Lo del bus, solo en el 1.', { x: ['C'], n: { C: 'solo el 1' } }],
  ], 'B. Coincidir en un hecho no es coincidir en la tesis.'),
  'pu-dt-2': H('¿Qué diría el otro?', '¿Qué respondería la autora del texto 2 a la idea del texto 1?', [['Texto 1: Para que la gente lea, hay que regalar libros.'], ['Texto 2: Tuvimos libros gratis cinco años y nadie los abrió.', 'La lectura creció cuando alguien empezó a leerlos en voz alta.']], ['Que se regalen más libros.', 'Que no basta con tener libros: hace falta quien lea con la gente.', 'Que leer no sirve.', 'Que los libros son caros.'], [
    ['Se busca la tesis del texto 2, que sirve de lente: lo que funcionó fue la lectura en voz alta.', { luz: [2], n: { 1: 'su tesis' } }],
    ['Con esa lente se mira la idea del 1: libros gratis ya los hubo y no bastaron.', { luz: [0, 1] }],
    ['A contradice su experiencia. C exagera: ella cuenta que la lectura creció.', { x: ['A', 'C'], n: { A: 'la contradice', C: 'exagera' } }],
    ['El precio no le importa: eran gratis. B sale directo de su tesis.', { x: ['D'], luz: ['B'] }],
  ], 'B.'),
});
