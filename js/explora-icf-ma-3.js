// Preicfes · Matemáticas, mundo 3 «Conteo y Probabilidad» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  // Árbol de a ramas y, en cada una, b: se ve la primera o las dos partes.
  const arbol = (v, K) => {
    let h = ''; const a = Math.round(v.a), b = Math.round(v.b), n = a * b, Y = k => 24 + (k + 0.5) * 160 / n;
    for (let i = 0; i < a; i++) { const y = Y(i * b + (b - 1) / 2); h += K.l(40, 104, 140, y, 'lg gr') + K.c(140, y, 6, 'fA'); for (let j = 0; j < b; j++) h += K.f(v.f, K.l(140, y, 260, Y(i * b + j), 'lm') + K.c(260, Y(i * b + j), 5, 'fG')); }
    return h + K.c(40, 104, 7, 'fF') + K.f(v.f, K.t(300, 108, n, 'b tg')) + K.t(170, 204, v.t || '', 's ta');
  };
  // Dos círculos que se cruzan: solo a, los dos, solo b.
  const venn = (v, K) => K.c(140, 100, 70, 'fa') + K.c(210, 100, 70, 'fg') + K.t(105, 106, v.a, 'b') + K.t(245, 106, v.b, 'b') + K.f(v.f, K.t(175, 106, v.m, 'b tf')) + K.t(170, 196, v.t || '', 's ta');
  // Bolsa: k de un color entre n; las primeras se marcan.
  const bolsa = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => K.c(58 + (i % 8) * 32, 60 + Math.floor(i / 8) * 36, 12, i < Math.round(v.k) ? 'fA' : 'fG')).join('') + K.t(170, 160, v.t || '', 'ta');
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 80, et: e }));

  xpLec('icf-ma-azar-1', [
    ['Y multiplica',
      xpMira('dibujo', 'Empecemos por la idea: si haces una cosa **y además** otra, los casos se multiplican.', { dib: arbol, v: { a: 2, b: 3, f: 0, t: '' }, alto: 212 }, [
        ['Dos camisas: dos ramas.', {}],
        ['Con cada camisa van tres pantalones.', { f: 1 }],
        ['Son seis pintas: cada rama se abre en tres.', { t: '2 · 3 = 6' }, '$2 \\cdot 3 = 6$'],
        ['Con tres camisas habría nueve.', { a: 3, t: '3 · 3 = 9' }, '$3 \\cdot 3 = 9$'],
        ['No se suma: cada una va con cada una.', {}],
      ], 'Una cosa y además otra: se multiplica.'),
      xpHaz('dibujo', 'Hay 3 sopas. Mueve los jugos hasta que haya **15** almuerzos de sopa y jugo.', { dib: (v, K) => arbol({ a: 3, b: v.b, f: 1 }, K), v: { b: 2 }, metas: { b: 5 }, alto: 260, manijas: [{ k: 'b', min: 1, max: 7, paso: 1, et: 'jugos' }], lee: v => `$3 \\cdot ${v.b} = ${3 * v.b}$`, dice: () => 'Cada sopa va con cada jugo.' }, '$3 \\cdot 5 = 15$.')],
    ['O suma',
      xpMira('fichas', 'Segunda idea: si escoges **una sola** cosa, los casos se suman.', { slots: fila('y', 'o'), fichas: ['20', '9'], alto: 96 }, [
        ['Hay 4 buses y 5 trenes.', {}],
        ['Ir en bus y volver en tren: dos decisiones.', { pon: { 0: '20' } }, '$4 \\cdot 5 = 20$'],
        ['Ir en bus o en tren: una sola decisión.', { pon: { 1: '9' } }, '$4 + 5 = 9$'],
        ['Pregúntate si al final tienes una cosa o dos.', { marca: [0, 1] }],
        ['Y multiplica; o, escogiendo una sola, suma.', { marca: [] }],
      ], 'Dos decisiones se multiplican; una sola elección entre grupos se suma.'),
      xpHaz('fichas', '6 libros y 3 revistas. Pon cuántas maneras hay de llevar un libro **y** una revista, y de llevar **una sola** cosa.', { slots: fila('libro y revista', 'una sola'), fichas: ['18', '9', '63', '3', '36'], meta: ['18', '9'], alto: 96, pista: 'La primera son dos decisiones; la segunda, una.' }, '$6 \\cdot 3 = 18$ y $6 + 3 = 9$.')],
    ['Lo que se cuenta dos veces',
      xpMira('dibujo', 'Tercera idea: lo que está en **los dos** grupos se cuenta una sola vez.', { dib: venn, v: { a: 12, b: 8, m: 4, f: 0, t: '' }, alto: 204 }, [
        ['A nadar van 16 y a correr 12.', { t: '16 nadan · 12 corren' }],
        ['Pero 4 hacen las dos cosas: están en el centro.', { f: 1 }],
        ['Solo nadan 12 y solo corren 8.', {}, '$16 - 4 = 12 \\quad 12 - 4 = 8$'],
        ['Si sumas 16 y 12, los 4 entran dos veces.', { t: '16 + 12 = 28' }, '$16 + 12 = 28$'],
        ['Por eso se quitan una vez: son 24.', { t: '28 − 4 = 24' }, '$28 - 4 = 24$'],
      ], 'Alguno = suma de los dos grupos − los que están en ambos.'),
      xpHaz('fichas', '10 cantan, 7 bailan y 3 hacen las dos. Pon cuántos solo cantan y cuántos hacen alguna.', { slots: fila('solo cantan', 'alguna'), fichas: ['7', '14', '17', '13', '20'], meta: ['7', '14'], alto: 96, pista: 'Quita los 3 a los que cantan; y a la suma, una sola vez.' }, '$10 - 3 = 7$ y $10 + 7 - 3 = 14$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una clave lleva una vocal y luego dos dígitos que pueden repetirse. Pon las opciones de cada casilla y el total.', { slots: fila('vocal', 'dígito', 'dígito', 'total').map(s => ({ ...s, w: 62 })), fichas: ['5', '10', '10', '500', '9', '450', '25'], meta: ['5', '10', '10', '500'], alto: 96, pista: 'Los dígitos se pueden repetir: no se pierde ninguno.' }, '$5 \\cdot 10 \\cdot 10 = 500$.')],
  ], 'Y multiplica, o suma, y lo repetido se quita una vez.');

  xpLec('icf-ma-azar-2', [
    ['¿Importa el orden?',
      xpMira('hoja', 'Empecemos por la idea: cambia dos de lugar y mira si el resultado **es otro**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Oro y plata entre atletas'], ['Dos sabores en un vaso'], ['Una clave de tres cifras'], ['Un equipo de cuatro']] }, [
        ['Si cambias oro y plata, gana otro: importa.', { luz: [0], nota: { 0: 'con orden' } }],
        ['Mango y mora o mora y mango: el mismo vaso.', { luz: [1], nota: { 1: 'sin orden' } }],
        ['123 no abre lo que abre 321.', { luz: [2], nota: { 2: 'con orden' } }],
        ['El equipo es el mismo aunque los nombres estén al revés.', { luz: [3], nota: { 3: 'sin orden' } }],
        ['Con orden es permutación; sin orden, combinación.', {}],
      ], 'Cambia el orden: si sale otra cosa, importa.'),
      xpHaz('hoja', 'Subraya los **dos** casos en que el orden **no** importa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Escoger tres cartas para quedarse'], ['Presidenta y secretaria'], ['Dos amigos para ir al cine'], ['Las letras de una placa']], pista: 'En alguno, cambiar de lugar cambia el resultado.' }, 'Las cartas y los amigos son los mismos.')],
    ['Con orden',
      xpMira('fichas', 'Segunda idea: con orden, cada puesto **gasta** una opción.', { slots: fila('1.º', '2.º', '3.º', 'total').map(s => ({ ...s, w: 62 })), fichas: ['7', '6', '5', '210'], alto: 96 }, [
        ['Siete corredoras y tres medallas.', {}],
        ['Para el oro hay siete.', { pon: { 0: '7' } }],
        ['Para la plata quedan seis.', { pon: { 1: '6' } }],
        ['Para el bronce, cinco.', { pon: { 2: '5' } }],
        ['Se multiplican: 210 podios.', { pon: { 3: '210' } }, '$7 \\cdot 6 \\cdot 5 = 210$'],
      ], 'Con orden: n por (n − 1) por… tantas veces como puestos.'),
      xpHaz('fichas', '9 personas, capitán y portero. Pon las opciones de cada puesto y el total.', { slots: fila('capitán', 'portero', 'total'), fichas: ['9', '8', '72', '81', '36', '17'], meta: ['9', '8', '72'], alto: 96, pista: 'Quien es capitán ya no puede ser portero.' }, '$9 \\cdot 8 = 72$.')],
    ['Sin orden se divide',
      xpMira('hoja', 'Tercera idea: sin orden, cada grupo se contó **varias veces**.', { paras: [['ABC', 'ACB', 'BAC'], ['BCA', 'CAB', 'CBA']] }, [
        ['Escoge a Ana, Beto y Caro.', { luz: [0] }],
        ['Contando con orden aparecen seis veces.', { luz: [0, 1, 2, 3, 4, 5] }, '$3 \\cdot 2 \\cdot 1 = 6$'],
        ['Pero es el mismo grupo.', { nota: { 0: 'el mismo', 1: 'el mismo' } }],
        ['Con 7 personas: 210 con orden, entre 6.', {}, '$210 \\div 6 = 35$'],
        ['Y escoger 5 de 7 es lo mismo que dejar 2.', {}, '$\\tfrac{7 \\cdot 6}{2} = 21$'],
      ], 'Sin orden: cuenta con orden y divide entre los órdenes del grupo.'),
      xpHaz('fichas', 'De 6 personas se escogen 2 sin orden. Pon las parejas con orden y sin orden.', { slots: fila('con orden', 'sin orden'), fichas: ['30', '15', '12', '36', '60'], meta: ['30', '15'], alto: 96, pista: 'Cada pareja salió dos veces.' }, '$6 \\cdot 5 = 30$ y $30 \\div 2 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '4 médicas y 3 enfermeros; se escogen 2 médicas y 1 enfermero. Pon cada elección y el total.', { slots: fila('médicas', 'enfermero', 'total'), fichas: ['6', '3', '18', '12', '9', '35'], meta: ['6', '3', '18'], alto: 96, pista: 'Las médicas van sin orden: 4 por 3 entre 2.' }, '$6 \\cdot 3 = 18$.')],
  ], 'Orden, puestos y división: esas tres preguntas bastan.');

  xpLec('icf-ma-azar-3', [
    ['Favorables entre posibles',
      xpMira('dibujo', 'Empecemos por la idea: la probabilidad es **qué parte** de los casos sirve.', { dib: bolsa, v: { n: 8, k: 2, t: '' }, alto: 176 }, [
        ['Ocho bolas; dos de un color.', {}],
        ['Sirven dos de ocho: un cuarto.', { t: '2 de 8' }, '$\\tfrac28 = \\tfrac14$'],
        ['Con cuatro de ocho, la mitad.', { k: 4, t: '4 de 8' }, '$\\tfrac48 = \\tfrac12$'],
        ['Cuatro de dieciséis: otra vez un cuarto.', { n: 16, t: '4 de 16' }, '$\\tfrac{4}{16} = \\tfrac14$'],
        ['Más favorables no es más probable: mira el total.', {}],
      ], 'Favorables entre posibles; y se compara la parte, no la cantidad.'),
      xpHaz('dibujo', 'Hay 12 bolas. Mueve las del color hasta que su probabilidad sea $\\tfrac13$.', { dib: (v, K) => bolsa({ n: 12, k: v.k }, K), v: { k: 1 }, metas: { k: 4 }, alto: 220, manijas: [{ k: 'k', min: 0, max: 12, paso: 1, et: 'del color' }], lee: v => `$\\tfrac{${v.k}}{12}$`, dice: () => 'Un tercio de doce.' }, '$\\tfrac{4}{12} = \\tfrac13$.')],
    ['De 0 a 1',
      xpMira('fichas', 'Segunda idea: va de **0** (imposible) a **1** (seguro).', { slots: fila('un 7', 'un 3', 'par', 'menos de 7').map(s => ({ ...s, w: 64 })), fichas: ['0', '1/6', '1/2', '1'], alto: 96 }, [
        ['Un dado de seis caras.', {}],
        ['Que salga 7 es imposible.', { pon: { 0: '0' } }],
        ['Que salga 3: una de seis.', { pon: { 1: '1/6' } }],
        ['Que salga par: tres de seis.', { pon: { 2: '1/2' } }],
        ['Menor que 7: siempre.', { pon: { 3: '1' } }],
      ], 'Nunca es negativa ni pasa de 1.'),
      xpHaz('fichas', 'Una tarjeta del 1 al 5. Pon la probabilidad de que sea mayor que 3 y de que sea mayor que 5.', { slots: fila('mayor que 3', 'mayor que 5'), fichas: ['2/5', '0', '3/5', '1', '5/2'], meta: ['2/5', '0'], alto: 96, pista: 'Cuenta las que sirven: el 3 no es mayor que 3.' }, 'Sirven el 4 y el 5; mayor que 5 no hay.')],
    ['Lo contrario y dos dados',
      xpMira('hoja', 'Tercera idea: lo que pasa y lo que no **completan 1**; con dos dados se cuentan **parejas**.', { letras: ['1', '2', '3'], paras: [['Llueve: 30 %'], ['Suman 3: (1, 2) y (2, 1)'], ['Suman 2: (1, 1)']] }, [
        ['Si llueve con 30 %, no llueve con 70 %.', { luz: [0], nota: { 0: 'el resto: 70 %' } }],
        ['Dos dados: 36 parejas ordenadas.', {}, '$6 \\cdot 6 = 36$'],
        ['La suma 3 sale de dos parejas.', { luz: [1], nota: { 1: '2/36' } }],
        ['La suma 2, de una sola.', { luz: [2], nota: { 2: '1/36' } }],
        ['Por eso no todas las sumas son igual de fáciles.', { luz: [1, 2] }],
      ], 'Contrario: 1 menos. Dos dados: 36 parejas ordenadas.'),
      xpHaz('fichas', 'Pon en cuántas parejas la suma es 4 y la probabilidad de que **no** sea 4.', { slots: fila('parejas', 'no es 4'), fichas: ['3', '33/36', '2', '3/36', '1/11'], meta: ['3', '33/36'], alto: 96, pista: 'Busca las parejas ordenadas, como (1, 3), y réstalas de 36.' }, 'Tres parejas; las otras 33 no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Urna A: 3 rojas de 6. Urna B: 4 rojas de 10. Pon la probabilidad de roja en cada una.', { slots: fila('urna A', 'urna B'), fichas: ['1/2', '2/5', '3/4', '1/3', '4/6'], meta: ['1/2', '2/5'], alto: 96, pista: 'Divide entre todas las bolas de su urna.' }, 'B tiene más rojas, pero A es más probable.')],
  ], 'Parte del total, entre 0 y 1, y lo contrario completa.');

  xpLec('icf-ma-azar-4', [
    ['¿Sobre quiénes?',
      xpMira('hoja', 'Empecemos por la idea: la pregunta dice **entre quiénes** se escoge.', { paras: [['Mujeres: 10', 'con gafas 4'], ['Hombres: 10', 'con gafas 2'], ['Todos: 20', 'con gafas 6']] }, [
        ['Entre todos, la de una mujer es 10 de 20.', { luz: [0, 4] }, '$\\tfrac{10}{20}$'],
        ['Entre todos, con gafas: 6 de 20.', { luz: [4, 5] }, '$\\tfrac{6}{20}$'],
        ['Entre las mujeres, con gafas: 4 de 10.', { luz: [0, 1], nota: { 0: 'ahora son 10' } }, '$\\tfrac{4}{10}$'],
        ['Entre los de gafas, mujer: 4 de 6.', { luz: [1, 5], nota: { 2: 'ahora son 6' } }, '$\\tfrac46$'],
        ['El mismo 4, sobre totales distintos.', { luz: [1] }],
      ], 'Primero di entre quiénes se escoge: ese es el total.'),
      xpHaz('fichas', 'De 30 trabajan 12 de noche; de esos, 3 en moto. Pon la de moto **entre los de la noche** y la de noche **entre todos**.', { slots: fila('moto | noche', 'noche'), fichas: ['1/4', '2/5', '1/10', '3/30', '12/3'], meta: ['1/4', '2/5'], alto: 96, pista: 'La primera se divide entre 12.' }, '$\\tfrac{3}{12} = \\tfrac14$ y $\\tfrac{12}{30} = \\tfrac25$.')],
    ['Con o sin devolver',
      xpMira('dibujo', 'Segunda idea: si no se devuelve, la **segunda vez** cambia.', { dib: bolsa, v: { n: 5, k: 3, t: '' }, alto: 176 }, [
        ['Tres naranjas de cinco.', { t: '3/5' }],
        ['Saco una y la devuelvo: sigue igual.', { t: 'otra vez 3/5' }, '$\\tfrac35 \\cdot \\tfrac35$'],
        ['Saco una naranja y la guardo.', { n: 4, k: 2, t: 'quedan 2 de 4' }],
        ['Ahora la segunda es 2 de 4.', {}, '$\\tfrac35 \\cdot \\tfrac24$'],
        ['Cambian los dos números: las que sirven y el total.', {}],
      ], 'Sin devolver hay una menos en el total, y quizá una menos que sirve.'),
      xpHaz('fichas', '4 rojas y 4 blancas. Sale una roja y **no** se devuelve. Pon la probabilidad de otra roja y de blanca.', { slots: fila('otra roja', 'blanca'), fichas: ['3/7', '4/7', '4/8', '3/8', '1/2'], meta: ['3/7', '4/7'], alto: 96, pista: 'Quedan 7 bolas.' }, 'Quedan 3 rojas y 4 blancas de 7.')],
    ['Al menos uno',
      xpMira('fichas', 'Tercera idea: «al menos uno» es **todo menos ninguno**.', { slots: fila('falla 1.º', 'falla 2.º', 'ambos', 'alguno').map(s => ({ ...s, w: 66 })), fichas: ['1/2', '3/4', '3/8', '5/8'], alto: 96 }, [
        ['Uno acierta con un medio y otro con un cuarto.', {}],
        ['Fallan con un medio y tres cuartos.', { pon: { 0: '1/2', 1: '3/4' } }],
        ['Que fallen los dos: se multiplica.', { pon: { 2: '3/8' } }, '$\\tfrac12 \\cdot \\tfrac34 = \\tfrac38$'],
        ['Lo demás es que acierte alguno.', { pon: { 3: '5/8' } }, '$1 - \\tfrac38 = \\tfrac58$'],
        ['Sumar los aciertos contaría dos veces cuando aciertan ambos.', {}],
      ], 'Alguno = 1 − ninguno.'),
      xpHaz('fichas', 'Dos focos fallan con 1/3 cada uno, sin afectarse. Pon la de que fallen ambos y la de que alguno sirva.', { slots: fila('fallan ambos', 'alguno sirve'), fichas: ['1/9', '8/9', '2/3', '4/9', '1/6'], meta: ['1/9', '8/9'], alto: 96, pista: 'Multiplica los fallos y réstalo de 1.' }, '$\\tfrac13 \\cdot \\tfrac13 = \\tfrac19$ y $1 - \\tfrac19$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '2 verdes y 4 azules; se sacan dos **sin devolver**. Pon la de azul primero y la de dos azules.', { slots: fila('1.ª azul', 'dos azules'), fichas: ['2/3', '2/5', '4/9', '3/5', '7/6'], meta: ['2/3', '2/5'], alto: 96, pista: 'Después de una azul quedan cinco bolas: ¿cuántas son azules?' }, '$\\tfrac46 \\cdot \\tfrac35 = \\tfrac25$.')],
  ], 'Entre quiénes, qué queda y todo menos ninguno.');
}
