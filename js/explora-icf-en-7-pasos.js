// Preicfes · Inglés, mundo 7 «Inferir y Opinar», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza
// desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (inferencia y opinión del autor, A–D).
{
  xpAmplia('icf-en-inferencia-1', {
    conecta: 'icf-en-corto-1',
    desde: [
      ['Desde cero: qué es inferir',
        xpMira('hoja', 'Antes de todo: **inferir** es descubrir lo que el texto no dice, usando lo que sí dice.', { letras: ['dato', 'idea'], paras: [['Sebastián is carrying a towel and a swimsuit.'], ['He is going to swim.']] }, [
          ['En la lección de mensajes viste que se pueden unir dos datos.', {}],
          ['Inferir es descubrir algo que el texto no dice, usando lo que sí dice.', {}],
          ['Como un detective: la toalla y el vestido de baño son pistas.', { luz: [0], nota: { 0: 'pistas' } }],
          ['Nadie escribió «va a nadar», pero las pistas lo muestran.', { luz: [1], nota: { 1: 'se infiere' } }],
          ['Si una idea no tiene pistas en el texto, es inventada.', {}],
        ], 'Inferir: sacar lo que no se dice a partir de lo que sí se dice.'),
        xpHaz('hoja', '«Valentina has a backpack, a map and hiking boots.» Subraya lo que se infiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['She is going to a party.'], ['She is going for a long walk.'], ['She is sleeping.']], pista: 'Une las pistas: el mapa y las botas.' }, 'Mapa y botas de caminar: va de caminata.')],
    ],
    despues: [
      ['Más difícil: la inferencia que se pasa',
        xpMira('hoja', 'Un paso más: una buena inferencia **no va más allá** de las pistas.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Pablo bought flowers and a cake on Sunday.'], ['Pablo bought something sweet.'], ['It was his mum\'s birthday.'], ['Pablo always buys flowers.']] }, [
          ['Una inferencia buena no va más allá de las pistas.', { luz: [0] }],
          ['«Something sweet» sale seguro: un pastel es dulce.', { luz: [1], nota: { 1: 'segura' } }],
          ['El cumpleaños de la mamá puede ser, pero nada lo dice.', { luz: [2], nota: { 2: 'quizá' } }],
          ['«Always» exagera: un domingo no es siempre.', { luz: [3], nota: { 3: 'exagera' } }],
          ['Desconfía de always, never, everybody y nobody.', {}],
        ], 'La inferencia correcta es la más segura; los absolutos exageran.'),
        xpHaz('hoja', '«Andrés smiled when he read his test result.» Subraya lo **más seguro**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He got the best grade in the world.'], ['He was happy with his result.'], ['He never fails.']], pista: 'Una exagera y otra usa «never».' }, 'Sonreír al leerlo: quedó contento, nada más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **qué se puede inferir**: la buena usa todas las pistas.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['When Marta got home, the TV was on, there were two cups on the table and the dog was quiet.'], ['Marta\'s house was empty.'], ['Somebody the dog knows was at home.'], ['A thief came in.'], ['Marta drank two cups of coffee.']] }, [
        ['Pregunta típica: ¿qué se puede inferir? Las pistas están en el texto.', { luz: [0] }],
        ['La A choca con los datos: la tele encendida y dos tazas.', { luz: [1], nota: { 1: 'contradice' } }],
        ['La C asusta, pero el perro tranquilo no apoya un ladrón.', { luz: [3], nota: { 3: 'sin pistas' } }],
        ['La D usa las tazas, pero Marta apenas acaba de llegar.', { luz: [4], nota: { 4: 'trampa' } }],
        ['La B une las tres pistas: alguien conocido estaba en casa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'La inferencia buena usa todas las pistas y no choca con ninguna.'),
      xpHaz('hoja', '«The fridge was empty. Dad wrote a list, took the car keys and two big bags.» Subraya lo que se infiere.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Dad is going to buy food.'], ['Dad is cleaning the fridge.'], ['Dad sold the car.'], ['The family never eats.']], pista: 'Une la nevera vacía, la lista y las bolsas.' }, 'Va a mercar: nevera vacía, lista y bolsas.')],
    cierre: 'Pistas señaladas, inferencias seguras y nada de absolutos: así se lee entre líneas.',
  });

  xpAmplia('icf-en-inferencia-2', {
    conecta: 'icf-en-largo-2',
    desde: [
      ['Desde cero: qué es opinar',
        xpMira('hoja', 'Antes de todo: **opinar** es decir lo que uno piensa, aunque otro piense distinto.', { paras: [['fact', 'Bogotá is about 2 600 metres high.'], ['opinion', 'Bogotá is the best city to live in.']] }, [
          ['En la lección del autor y el lector viste que un hecho se comprueba.', {}],
          ['Opinar es decir lo que uno piensa, aunque otro piense distinto.', {}],
          ['La altura de Bogotá se mide: es un hecho, «fact».', { luz: [0, 1], nota: { 0: 'se mide' } }],
          ['«The best city» depende de cada persona: es una opinión.', { luz: [2, 3], nota: { 1: 'se discute' } }],
          ['Una opinión no es mentira: es una mirada personal.', {}],
        ], 'Fact se comprueba; opinion es una mirada que se puede discutir.'),
        xpHaz('hoja', 'Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Medellín has a metro.'], ['Medellín is the most beautiful city.'], ['Medellín is in Antioquia.']], pista: '¿Cuál podría discutir alguien de otra ciudad?' }, '«The most beautiful» depende de quien mira.')],
    ],
    despues: [
      ['Más difícil: de quién es la opinión',
        xpMira('hoja', 'Un paso más: en un texto puede haber **varias voces**: la del autor y la de otros.', { paras: [['Some parents say that video games are a waste of time.'], ['However, I believe they can teach teamwork.']] }, [
          ['En un texto puede haber dos opiniones: la del autor y la de otros.', {}],
          ['«Some parents say» es la opinión de unos padres, no del autor.', { luz: [0], nota: { 0: 'otros' } }],
          ['«However, I believe» trae la del autor.', { luz: [1], nota: { 1: 'autor' } }],
          ['La trampa: atribuirle al autor lo que dijeron otros.', { luz: [0] }],
          ['Busca «I think», «I believe» o «in my view»: ahí habla el autor.', {}],
        ], 'Say o claim: otros. I think o I believe: el autor.'),
        xpHaz('hoja', '«Many people claim that cities are too noisy. In my view, the noise shows a city full of life.» Subraya lo que piensa el **autor**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cities are too noisy.'], ['Noise shows a lively city.'], ['Nobody likes cities.']], pista: 'Su opinión viene después de «in my view».' }, 'Lo suyo va después de «in my view».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan qué **opina el autor**: separa su voz de la de los demás.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Some people think school uniforms are boring. I agree they are not very nice. But I think they help students feel equal, so I want to keep them.'], ['Uniforms are boring and should go.'], ['Uniforms are very nice clothes.'], ['Uniforms help students feel equal.'], ['All students hate uniforms.']] }, [
        ['Pregunta: ¿qué opina el autor? Hay varias voces en el texto.', { luz: [0] }],
        ['La A es lo que piensan otros: «some people think».', { luz: [1], nota: { 1: 'otros' } }],
        ['La B dice lo contrario: él acepta que no son bonitos.', { luz: [2], nota: { 2: 'al revés' } }],
        ['La D exagera con «all»: nadie habló de todos.', { luz: [4], nota: { 4: 'exagera' } }],
        ['La C sale de «I think»: es la opinión del autor.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Separa las voces: la opinión del autor va con I think o I believe.'),
      xpHaz('hoja', '«My friends say the new park is too small. I don\'t agree: it is small, but it is safe and clean.» Subraya lo que opina el autor.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['The park is too small to use.'], ['The park is good: it is safe and clean.'], ['All parks are dirty.'], ['The park is very big.']], pista: 'Lo de los amigos no es lo suyo; busca lo que viene después de «I don\'t agree».' }, 'Acepta que es pequeño, pero lo defiende.')],
    cierre: 'Hecho u opinión, de quién es la opinión y con qué razón la sostiene.',
  });
}
