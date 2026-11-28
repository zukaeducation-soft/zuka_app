// Preicfes · Inglés, mundo 5 «Textos Largos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde
// cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (mejor título y propósito, A–D).
{
  xpAmplia('icf-en-largo-1', {
    conecta: 'icf-en-corto-2',
    desde: [
      ['Desde cero: un texto largo sin miedo',
        xpMira('hoja', 'Antes de todo: un texto largo es como un tren: cada **párrafo** es un vagón con su carga.', { letras: ['1', '2', '3', '4'], paras: [['Juana grew up near the sea.'], ['She learned to swim at four.'], ['Later she trained every morning.'], ['Today she teaches children to swim, like her father did.']] }, [
          ['En la lección de textos cortos viste que la idea principal cubre todo.', {}],
          ['Un texto largo es lo mismo, pero repartido en varios párrafos.', {}],
          ['Cada párrafo tiene su propia tarea, como los vagones de un tren.', { luz: [0, 1, 2, 3] }],
          ['Casi siempre el primero presenta y el último cierra.', { luz: [0, 3], nota: { 0: 'presenta', 3: 'cierra' } }],
          ['Los del medio cuentan cómo pasó: aquí, cómo aprendió.', { luz: [1, 2], nota: { 1: 'cuenta', 2: 'cuenta' } }],
          ['No hace falta entender cada palabra: basta saber qué hace cada párrafo.', {}],
        ], 'Un texto largo son varios párrafos, cada uno con su tarea.'),
        xpHaz('hoja', 'Otro texto, de una cocinera. Subraya el párrafo que **cierra**.', { modo: 'toca', letras: ['1', '2', '3'], meta: [2], paras: [['Rocío learned to cook with her grandmother.'], ['At twenty she opened a small restaurant.'], ['Today her restaurant uses her grandmother\'s recipes.']], pista: 'El cierre mira hacia hoy y vuelve al comienzo.' }, 'El último cierra: hoy usa las recetas de la abuela.')],
    ],
    despues: [
      ['Más difícil: la respuesta en otro párrafo y con otras palabras',
        xpMira('hoja', 'Un paso más: la pregunta usa una palabra que **no está** en el texto.', { letras: ['1', '2', '3'], paras: [['The old factory gave jobs to the town for fifty years.'], ['People were proud of it.'], ['In the end it shut down: nobody bought its radios any more.']] }, [
          ['Pregunta: why did the factory close? Busquemos la respuesta.', {}],
          ['«Close» no aparece en el texto. ¿Se rinde uno? No.', {}],
          ['«Shut down» es cerrar: la respuesta está en el párrafo 3.', { luz: [2], nota: { 2: 'aquí' } }],
          ['La razón viene después de los dos puntos: nadie compraba radios.', { luz: [2] }],
          ['«Any more» es ya no: antes sí los compraban.', { luz: [2] }],
          ['Busca la idea en todo el texto, no la palabra exacta.', {}],
        ], 'La pregunta y el texto usan palabras distintas: busca la idea.'),
        xpHaz('hoja', 'Con ese texto: «How long did the factory work?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fifty years.'], ['Until people were proud.'], ['It sold radios.']], pista: '«How long» pide una duración; está en el primer párrafo.' }, '«For fifty years» es la duración.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan el **mejor título**: ni más amplio ni más estrecho que el texto.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Every year, students in Leticia count the pink dolphins of the Amazon. They use boats and cameras. This year they counted more than last year.'], ['Animals of the world'], ['A camera in a boat'], ['Young people who count river dolphins'], ['Why dolphins are pink']] }, [
        ['Pregunta clásica: ¿cuál es el mejor título para el texto?', { luz: [0] }],
        ['La A es demasiado amplia: el texto no habla de todo el mundo.', { luz: [1], nota: { 1: 'muy amplio' } }],
        ['La B es demasiado estrecha: la cámara es solo un detalle.', { luz: [2], nota: { 2: 'muy estrecho' } }],
        ['La D promete algo que el texto no explica.', { luz: [4], nota: { 4: 'no lo dice' } }],
        ['La C cubre quién, qué y dónde: ese es el título.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'El buen título no es más amplio ni más estrecho que el texto.'),
      xpHaz('hoja', '«In Barichara, old builders teach young people to make houses with earth. The houses stay cool in the heat.» Subraya el mejor título.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Houses of the world'], ['Learning to build with earth'], ['Hot days'], ['A young builder\'s hat']], pista: 'Descarta el muy amplio, el muy estrecho y el que no está en el texto.' }, 'La B cubre lo que se enseña y con qué material.')],
    cierre: 'Mapa de párrafos, la idea con otras palabras y el título justo: ni amplio ni estrecho.',
  });

  xpAmplia('icf-en-largo-2', {
    conecta: 'icf-en-largo-1',
    desde: [
      ['Desde cero: quién escribe y para quién',
        xpMira('hoja', 'Antes de todo: detrás de cada texto hay **alguien que escribe** y **alguien que lee**.', { paras: [['To: the Mayor'], ['Dear Sir,'], ['The park lights have not worked for a month.'], ['Please repair them.'], ['Yours, Luisa Díaz']] }, [
          ['En la lección anterior viste que cada párrafo tiene su tarea.', {}],
          ['Detrás de todo texto hay alguien que escribe y alguien que lee.', {}],
          ['Aquí lee el alcalde: el texto es formal, con «Dear Sir».', { luz: [0, 1], nota: { 1: 'formal' } }],
          ['Escribe Luisa, una vecina: lo dice la firma.', { luz: [4], nota: { 4: 'escribe' } }],
          ['Cuenta un problema y pide algo: se queja con respeto.', { luz: [2, 3], nota: { 2: 'problema', 3: 'pide' } }],
        ], 'Quién escribe, para quién y qué quiere: eso es el propósito.'),
        xpHaz('hoja', 'En esa carta, subraya la frase que dice **qué quiere** Luisa.', { modo: 'toca', letras: ['1', '2', '3'], meta: [1], paras: [['The park lights have not worked for a month.'], ['Please repair them.'], ['Yours, Luisa Díaz']], pista: 'El problema ya lo conoces; busca lo que pide.' }, '«Please repair them» es lo que pide.')],
    ],
    despues: [
      ['Más difícil: el tono',
        xpMira('hoja', 'Un paso más: el **tono** es cómo suena quien escribe, aunque no lo diga.', { paras: [['I can\'t wait for the trip!'], ['This is the third time I have written. I expect an answer today.'], ['I hope my son is all right there.']] }, [
          ['El tono es cómo suena quien escribe: alegre, bravo o preocupado.', {}],
          ['«Can\'t wait» y el signo de admiración: está emocionado.', { luz: [0], nota: { 0: 'excited' } }],
          ['«Third time» y «I expect»: está molesto y es firme.', { luz: [1], nota: { 1: 'angry' } }],
          ['«I hope… all right»: está preocupado por su hijo.', { luz: [2], nota: { 2: 'worried' } }],
          ['El tono no se dice: se nota en las palabras que escoge.', {}],
        ], 'El tono se nota en las palabras: excited, angry, worried, polite.'),
        xpHaz('hoja', '«Thank you for the invitation. I\'m afraid I can\'t go, but I hope it goes well.» Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Angry'], ['Polite'], ['Excited']], pista: 'Agradece, se excusa con suavidad y desea suerte.' }, 'Agradece y se excusa: es amable, polite.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **para qué** escribió el autor: mira todo el texto, sobre todo el final.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Our school needs more trees. In the afternoon the yard is too hot to play. Each student can bring one plant on Friday.'], ['To describe the school building.'], ['To complain about the students.'], ['To ask students to bring plants.'], ['To explain how trees grow.']] }, [
        ['Pregunta: ¿para qué escribió esto el autor? Mira todo el texto.', { luz: [0] }],
        ['La A habla del colegio, pero el texto no describe el edificio.', { luz: [1], nota: { 1: 'no lo hace' } }],
        ['La B: hay un problema, el calor, pero no culpa a los estudiantes.', { luz: [2], nota: { 2: 'trampa' } }],
        ['La D usa «trees», pero nadie explica cómo crecen.', { luz: [4], nota: { 4: 'repite' } }],
        ['La C: el final pide traer una planta. Ese es el propósito.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'El propósito sale de todo el texto; muchas veces se ve al final.'),
      xpHaz('hoja', '«Last week I lost my grey cat, Tito, near the church. He is friendly. Please call 300 555 0101.» ¿Para qué se escribe?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['To sell a cat.'], ['To find a lost cat.'], ['To describe a church.'], ['To complain about cats.']], pista: 'Mira lo que pide al final.' }, 'Pide que llamen: quiere encontrar a su gato.')],
    cierre: 'Quién escribe, para quién, con qué tono y para qué: todo el texto lo dice.',
  });
}
