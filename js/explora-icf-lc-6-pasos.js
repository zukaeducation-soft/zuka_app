// Preicfes · Lectura Crítica, mundo 6 «Textos Discontinuos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): texto continuo y
// discontinuo, viñeta, globo, caricatura, ironía y texto mixto desde cero (con piezas dibujadas de XLAB: periódico y cartel); luego
// la gráfica que no dice la causa, la ironía de la caricatura, la foto que no prueba y las trampas del examen. Piezas breves propias.
{
  const X = XLAB;
  // Una hoja de periódico (se lee en fila) junto a un cartel de precios (se lee por partes).
  const dosTextos = v => X.foto(X.periodico(18, 26, 140, 124, 'Sube el pan', { nombre: 'EL BARRIO' }) +
    X.aviso(182, 26, 140, 124, ['PRECIOS DE HOY', 'Pan: 500', 'Leche: 4 000', 'Huevo: 700'], 'papel') +
    (v.a ? X.rot(88, 182, 'en fila') : '') + (v.b ? X.rot(252, 182, 'por partes') : '') + (v.c ? X.flecha(330, 8, 306, 44, '#ffd23f') : ''), 200, 'mesa');
  // Una página de periódico con titular, foto y columnas; rótulos opcionales.
  const pagina = v => X.foto(X.periodico(40, 14, 260, 150, 'Vuelven las ranas', { foto: 1, nombre: 'EL VECINO' }) +
    (v.t ? X.rot(250, 46, 'titular', 'oscuro') : '') + (v.f ? X.rot(87, 104, 'foto', 'oscuro') : '') + (v.c ? X.rot(220, 132, 'texto', 'oscuro') : ''), 200, 'mesa');

  xpAmplia('icf-lc-discontinuo-1', {
    conecta: 'icf-lc-estructura-1',
    desde: [
      ['Desde cero: en fila o por partes',
        xpMira('dibujo', 'Antes de las palabras difíciles: hay textos que se leen **en fila** y textos que se leen **por partes**.', { dib: dosTextos, v: {}, alto: 200 }, [
          ['En la lección de la función del párrafo viste que cada parte tiene un oficio.', {}],
          ['Una noticia se lee en fila: renglón tras renglón.', { a: 1 }],
          ['A eso se le llama texto continuo.', { a: 1 }],
          ['Un cartel de precios no se lee en fila: se salta de un dato a otro.', { a: 1, b: 1 }],
          ['Es un texto discontinuo, como tablas, avisos, gráficas y cómics.', { a: 1, b: 1 }],
          ['Cada pedazo cumple un oficio: el título dice de qué trata.', { a: 1, b: 1, c: 1 }],
        ], 'Continuo: se lee en fila. Discontinuo: por partes, como un cartel, una tabla o un cómic.'),
        xpHaz('hoja', 'Subraya los dos textos **discontinuos**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Una carta a la abuela.'], ['El horario de buses de la terminal.'], ['Un cuento de terror.'], ['La tabla de posiciones del torneo.']], pista: 'Alguno se lee en fila, renglón tras renglón. Busca los que se leen saltando.' }, 'El horario y la tabla se leen saltando de casilla en casilla.')],
    ],
    despues: [
      ['Más difícil: lo que la tabla no dice',
        xpMira('hoja', 'Un paso más: una tabla muestra **cuánto**, pero no siempre **por qué**. La trampa es leer una causa que no está.', { letras: ['tabla', 'a', 'b', 'c'], paras: [['Sombrillas vendidas: enero 100, abril 300. Gripas en el colegio: enero 10, abril 30.'], ['En abril se vendió el triple de sombrillas.'], ['Las sombrillas causan gripa.'], ['En abril llovió más.']] }, [
          ['La tabla da cuatro números.', { luz: [0] }],
          ['La a solo lee los números: está bien.', { luz: [1], nota: { 1: 'lo dice' } }],
          ['La b inventa una causa: suben juntas, pero eso no prueba nada.', { luz: [2], tacha: [2], nota: { 2: 'causa inventada' } }],
          ['La c puede ser cierta, pero la tabla no habla de lluvia.', { luz: [3], tacha: [3], nota: { 3: 'no está' } }],
          ['Que dos cosas suban juntas no dice que una cause la otra.', {}],
        ], 'Lee lo que muestran los números; la causa y lo que no aparece, no.'),
        xpHaz('hoja', 'Infografía: «Visitas a la biblioteca: lunes 20, sábado 80». Subraya lo que **sí** dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El sábado fueron cuatro veces más personas.'], ['El sábado la gente lee más libros.'], ['Los lunes la biblioteca está cerrada.']], pista: 'Esa opción va más allá de los números. Busca la que solo los compara.' }, '80 es cuatro veces 20: eso es todo lo que dice.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Según la tabla, es correcto afirmar que…». Compara con el **total**, no solo con el número grande.', { letras: ['tabla', 'A', 'B', 'C', 'D'], paras: [['¿Cómo llegas al colegio? Grado 6 (40 estudiantes): 20 a pie. Grado 11 (100 estudiantes): 30 a pie.'], ['En grado 11 caminan más, porque son 30.'], ['En grado 6 camina la mitad; en grado 11, menos de un tercio.'], ['Los de grado 11 son perezosos.'], ['Nadie en grado 11 llega en bus.']] }, [
        ['La pregunta: ¿qué es correcto afirmar según la tabla?', { luz: [0] }],
        ['A mira el número grande y olvida el total: trampa.', { luz: [1], nota: { 1: 'sin total' } }],
        ['C es una opinión que la tabla no da.', { luz: [3], nota: { 3: 'opinión' } }],
        ['D usa «nadie»: la tabla no habla del bus.', { luz: [4], nota: { 4: 'no está' } }],
        ['B compara cada número con su total: 20 de 40 y 30 de 100.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'En una tabla, compara cada cantidad con su total y no leas lo que no aparece.'),
      xpHaz('hoja', 'Tabla: «Barrio A, 50 casas: 10 sin luz. Barrio B, 20 casas: 8 sin luz». Según la tabla, ¿qué es correcto?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['A está peor, porque son 10 casas.'], ['B está peor: 4 de cada 10 casas no tienen luz.'], ['En B la luz es más cara.'], ['Todas las casas de A tienen luz.']], pista: 'Esa opción olvida el total o dice algo que la tabla no trae. Saca la parte de cada barrio.' }, '10 de 50 son 2 de cada 10; 8 de 20 son 4 de cada 10.')],
    cierre: 'En un texto discontinuo, mira qué hace cada parte, compara con el total y no leas causas que no están.',
  });

  xpAmplia('icf-lc-discontinuo-2', {
    conecta: 'icf-lc-estructura-3',
    desde: [
      ['Desde cero: cómo se lee un cómic',
        xpMira('hoja', 'Antes de las palabras difíciles: un **cómic** cuenta con dibujos en cuadros, las **viñetas**. Se leen de izquierda a derecha y de arriba abajo.', { letras: ['1', '2', '3'], paras: [['Viñeta 1: una niña mira la lluvia por la ventana.'], ['Viñeta 2: busca sus botas debajo de la cama.'], ['Viñeta 3: salta en un charco, feliz.']] }, [
          ['En la lección de voces viste que un texto puede tener varias voces.', {}],
          ['En un cómic, cada cuadro es una viñeta.', { luz: [0], nota: { 0: 'viñeta' } }],
          ['Se leen en orden, como los renglones.', { luz: [0, 1, 2] }],
          ['El orden cuenta una historia: mira, busca, salta.', { luz: [1, 2], nota: { 1: 'luego', 2: 'al final' } }],
          ['Las voces de los personajes van en globos; el narrador, en recuadros.', {}],
        ], 'Viñeta: cada cuadro. Globos: las voces de los personajes. Recuadro: el narrador.'),
        xpHaz('hoja', 'Pon al margen qué es cada elemento del cómic.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['globo', 'viñeta', 'recuadro'], meta: [1, 0, 2], paras: [['El cuadro donde está dibujada una escena.'], ['El espacio donde va lo que dice un personaje.'], ['La caja donde habla el narrador.']], pista: 'Alguno no va ahí: ¿dibujo, voz del personaje o voz del narrador?' }, 'Viñeta para la escena, globo para el personaje, recuadro para el narrador.')],
    ],
    despues: [
      ['Más difícil: la ironía de la caricatura',
        xpMira('hoja', 'Un paso más: una **caricatura** critica con humor. Muchas usan **ironía**: dicen lo contrario de lo que muestran.', { paras: [['Dibujo: una calle llena de huecos y un carro hundido hasta el techo.'], ['Globo del alcalde: «¡Nuestras vías son un ejemplo!».'], ['Recuadro: «Inauguración de obras».']] }, [
          ['El dibujo muestra un desastre.', { luz: [0], nota: { 0: 'lo que se ve' } }],
          ['El globo dice que todo está perfecto.', { luz: [1], nota: { 1: 'lo que dice' } }],
          ['El choque entre lo que se ve y lo que se dice es la ironía.', { luz: [0, 1] }],
          ['La caricatura no elogia al alcalde: lo critica.', { luz: [1] }],
          ['Trampa: creer que el autor piensa lo que dice el personaje.', {}],
        ], 'Ironía: lo dicho choca con lo mostrado. El autor critica; no comparte la frase del personaje.'),
        xpHaz('hoja', 'Caricatura: un río lleno de basura. Un pez con tapabocas dice: «¡Qué agua tan pura!». Subraya lo que critica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que los peces usen tapabocas.'], ['La contaminación del río.'], ['Que el agua esté limpia.']], pista: 'Compara lo que dice el pez con lo que se ve en el dibujo.' }, 'El pez dice lo contrario de lo que se ve: es ironía.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En la viñeta, la frase del personaje…» o «¿qué critica la caricatura?». Separa la voz del personaje de la del autor.', { letras: ['viñeta', 'A', 'B', 'C', 'D'], paras: [['Un señor carga diez bolsas plásticas. Globo: «Yo sí cuido el planeta: traje mi termo».'], ['El señor cuida el planeta, como él dice.'], ['Critica a quien dice cuidar el planeta y no lo hace.'], ['Los termos dañan el planeta.'], ['El autor vende bolsas plásticas.']] }, [
        ['La pregunta: ¿qué critica la caricatura?', { luz: [0] }],
        ['A le cree al personaje: confunde su voz con la del autor.', { luz: [1], nota: { 1: 'cree al personaje' } }],
        ['C toma una palabra del dibujo y le cambia el sentido.', { luz: [3], nota: { 3: 'misma palabra' } }],
        ['D inventa algo sobre el autor.', { luz: [4], nota: { 4: 'no está' } }],
        ['B ve el choque entre las bolsas y lo que dice.', { luz: [2], nota: { 2: 'ironía' } }],
      ], 'En un cómic, compara lo que dice el personaje con lo que muestra el dibujo.'),
      xpHaz('hoja', 'Viñeta: un hospital con pacientes en el piso del pasillo. Globo del gerente: «Atención cinco estrellas». ¿Qué expresa la viñeta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El hospital atiende muy bien.'], ['Una crítica a la mala atención del hospital.'], ['El gerente es médico.'], ['Todos los hospitales del país son malos.']], pista: 'Esa opción le cree al personaje o generaliza. Compara el globo con el dibujo.' }, 'Lo que dice el gerente choca con lo que se ve: es una crítica.')],
    cierre: 'En un cómic, lee las viñetas en orden, separa la voz del personaje de la del autor y busca la ironía.',
  });

  xpAmplia('icf-lc-discontinuo-3', {
    conecta: 'icf-lc-discontinuo-1',
    desde: [
      ['Desde cero: una página con muchas piezas',
        xpMira('dibujo', 'Antes de las palabras difíciles: una página de periódico mezcla **piezas**: titular, foto y texto. Cada una aporta algo.', { dib: pagina, v: {}, alto: 200 }, [
          ['En la lección de infografías viste que cada parte responde algo distinto.', {}],
          ['El titular resume la noticia en pocas palabras.', { t: 1 }],
          ['La foto deja ver lo que pasó.', { t: 1, f: 1 }],
          ['El texto explica con detalle y da los datos.', { t: 1, f: 1, c: 1 }],
          ['Juntas forman un texto mixto: parte continua y parte discontinua.', { t: 1, f: 1, c: 1 }],
        ], 'Un texto mixto junta piezas en fila (el texto) y piezas sueltas (titular, foto, tabla).'),
        xpHaz('hoja', 'Pon al margen la pieza que responde cada pregunta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['la foto', 'el titular', 'la tabla'], meta: [1, 2, 0], paras: [['¿Qué pasó, en pocas palabras?'], ['¿Cuántos hubo cada año?'], ['¿Cómo se veía el lugar?']], pista: 'Alguna no va ahí: ¿resume, cuenta o muestra?' }, 'El titular resume, la tabla cuenta y la foto muestra.')],
    ],
    despues: [
      ['Más difícil: la foto que no prueba',
        xpMira('hoja', 'Un paso más: una foto muestra **un momento y un lugar**. No prueba lo que pasa en todas partes ni todo el tiempo.', { letras: ['pieza', 'a', 'b', 'c'], paras: [['Foto: una cancha llena de niños jugando. Pie: «Domingo en el barrio Las Flores».'], ['Ese domingo había niños jugando en esa cancha.'], ['En la ciudad los niños juegan mucho.'], ['La cancha siempre está llena.']] }, [
          ['La foto muestra un domingo, en un barrio.', { luz: [0], nota: { 0: 'un momento' } }],
          ['La a se queda en lo que se ve.', { luz: [1], nota: { 1: 'alcanza' } }],
          ['La b salta de un barrio a toda la ciudad.', { luz: [2], tacha: [2], nota: { 2: 'generaliza' } }],
          ['La c salta de un día a siempre.', { luz: [3], tacha: [3], nota: { 3: 'absoluto' } }],
          ['El pie de foto dice el cuándo y el dónde: úsalo.', { luz: [0] }],
        ], 'Una foto vale para su momento y su lugar; lo demás dice de más.'),
        xpHaz('hoja', 'Foto: un bus vacío. Pie: «Ruta 12, martes a las 3 de la tarde». **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Nadie usa la ruta 12.'], ['Ese martes, a esa hora, el bus iba vacío.'], ['Los buses de la ciudad andan vacíos.']], pista: 'Alguna de las tachadas se queda en lo que muestra la foto.' }, '«Nadie» y «los buses de la ciudad» van más allá de una foto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «De la noticia y la gráfica se puede concluir…». La buena **cabe en todas las piezas** a la vez.', { letras: ['piezas', 'A', 'B', 'C', 'D'], paras: [['Titular: «Más turistas en el pueblo». Gráfica: de 2 000 a 5 000 turistas en un año. Una vendedora: «Vendo más, pero el arriendo se me duplicó».'], ['A todos en el pueblo les fue mejor.'], ['La vendedora vende menos que antes.'], ['Llegaron más turistas, aunque no todo fue ganancia.'], ['Los turistas subieron el arriendo a propósito.']] }, [
        ['La pregunta: ¿qué se concluye de las tres piezas juntas?', { luz: [0] }],
        ['A choca con la voz de la vendedora: generaliza.', { luz: [1], nota: { 1: 'generaliza' } }],
        ['B dice lo contrario de lo que ella cuenta.', { luz: [2], nota: { 2: 'al revés' } }],
        ['D inventa una intención que nadie mencionó.', { luz: [4], nota: { 4: 'no está' } }],
        ['C cabe en el titular, en la gráfica y en la voz.', { luz: [3], nota: { 3: 'cabe en todo' } }],
      ], 'Prueba cada conclusión contra cada pieza: si una la contradice, descártala.'),
      xpHaz('hoja', 'Titular: «El parque se renovó». Foto: juegos nuevos. Un abuelo: «Quitaron las bancas y no tengo dónde sentarme». ¿Qué se concluye?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El parque quedó perfecto para todos.'], ['Hubo cambios que no sirvieron a todos.'], ['Al abuelo no le gustan los parques.'], ['El parque sigue igual.']], pista: 'Esa opción choca con alguna pieza. Pruébala con el titular, la foto y la voz.' }, 'Hay juegos nuevos, pero el abuelo perdió su banca.')],
    cierre: 'En un texto mixto, pregunta qué aporta cada pieza y escoge la conclusión que cabe en todas.',
  });
}
