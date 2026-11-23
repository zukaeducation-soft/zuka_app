// Álgebra · alg-0a «¿Qué es un conjunto? Notación y pertenencia»: explicación interactiva que reemplaza el video
// (spec 2026-11-23-explora-leccion-interactiva; motor en js/explora.js, escena «conjunto»). Mismo formato que pu-cm-1:
// cada capítulo abre con una explicación que corre sola (`muestra`), sigue «tu turno» y el problema va al final.
// Los ejemplos (bandera, semáforo, vocales, dado, pares, COLOMBIA, TOMATE, heladería) no salen en los ejercicios.
EXPLORA['alg-0a'] = {
  caps: ['¿Qué es un conjunto?', 'Pertenecer', 'Dos formas de escribirlo', 'Sin repetidos ni orden', 'Ahora sí, un problema'],
  pasos: [
    // ---- ¿Qué es un conjunto? ----
    { cap: 0, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'B', items: ['verde', 'amarillo', 'negro', 'azul', 'blanco', 'rojo'] },
      texto: 'Empecemos por la idea más básica del álgebra: **qué es un conjunto**.',
      momentos: [
        { dice: 'Un conjunto es una colección de objetos. A cada objeto que está en él se le llama **elemento**.' },
        { pon: ['amarillo', 'azul', 'rojo'], cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: 'B: los colores de la bandera de Colombia. Entran el amarillo, el azul y el rojo.' },
        { marca: 'verde', cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: '¿Y el verde? No está en la bandera, así que se queda afuera. Nadie lo discute.' },
        { cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: 'Eso es estar **bien definido**: ante cualquier objeto se sabe, sin discutir, si entra o no.' },
        { cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: '«Los colores más bonitos» no sería un conjunto: cada persona elegiría distinto.' },
      ],
      idea: 'Un conjunto es una colección **bien definida** de objetos; cada objeto es un **elemento**.' },
    { cap: 0, tipo: 'conjunto', nombre: 'S', items: ['azul', 'rojo', 'negro', 'verde', 'blanco', 'amarillo'], meta: ['rojo', 'amarillo', 'verde'],
      texto: '**Tu turno.** Arma S, el conjunto de las luces de un semáforo: arrastra adentro cada color que le corresponde.',
      idea: 'Una regla clara decide qué entra: $S = \\{\\text{rojo}, \\text{amarillo}, \\text{verde}\\}$.' },

    // ---- Pertenecer ----
    { cap: 1, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'V', items: ['m', 'a', 'e', 's', 'i', 'o', 'u', 'r'] },
      texto: 'Segunda idea: **pertenecer**. Para decir si algo está o no en un conjunto hay un símbolo.',
      momentos: [
        { pon: ['a', 'e', 'i', 'o', 'u'], cuenta: '$V = \\{a, e, i, o, u\\}$', dice: 'V es el conjunto de las vocales. Sus cinco elementos entran uno por uno.' },
        { marca: 'e', cuenta: '$e \\in V$', dice: 'La e está adentro. Se escribe e ∈ V y se lee «e pertenece a V».' },
        { marca: 'm', cuenta: '$m \\notin V$', dice: 'La m se queda afuera: m ∉ V, «m no pertenece a V». Es el mismo símbolo, tachado.' },
        { cuenta: '$e \\in V, \\quad m \\notin V$', dice: 'Costumbre: los conjuntos se nombran con mayúscula y sus elementos, casi siempre, con minúscula.' },
      ],
      idea: '$\\in$ se lee «pertenece a» y $\\notin$, «no pertenece a». Los conjuntos se nombran con mayúscula.' },
    { cap: 1, tipo: 'conjunto', nombre: 'D', items: ['1', '2', '3', '4', '5', '6'], meta: ['5', '6'],
      texto: '**Tu turno.** D es el conjunto de las caras de un dado mayores que 4. Arrastra adentro solo las que pertenecen.',
      idea: '$5 \\in D$ y $6 \\in D$, pero $4 \\notin D$.' },

    // ---- Dos formas de escribirlo ----
    { cap: 2, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'P', items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] },
      texto: 'Tercera idea: un conjunto se puede escribir **de dos formas**.',
      momentos: [
        { dice: 'La primera forma es la más directa: nombrar todos sus elementos, uno por uno.' },
        { pon: ['2', '4', '6', '8'], cuenta: '$P = \\{2, 4, 6, 8\\}$', dice: 'Por **extensión**: los elementos entre llaves y separados por comas.' },
        { cuenta: '$P = \\{x : x \\text{ es par},\\ 0 < x < 10\\}$', dice: 'Por **comprensión**: se escribe la regla que cumplen. Los dos puntos se leen «tal que».' },
        { marca: '6', cuenta: '$6 \\in P$', dice: 'Se lee: «los x tales que x es par y está entre 0 y 10». El 6 cumple: está adentro.' },
        { marca: '7', cuenta: '$7 \\notin P$', dice: 'El 7 no es par: no cumple la regla, así que se queda afuera.' },
        { cuenta: '$\\{x : x \\text{ es par}\\}$', dice: 'Si quitamos el tope de 10 es otro conjunto, con infinitos pares: solo se puede escribir por comprensión.' },
      ],
      idea: 'Por **extensión** se nombran los elementos; por **comprensión** se da la regla. «:» se lee «tal que».' },
    { cap: 2, tipo: 'conjunto', nombre: 'T', items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], meta: ['3', '6', '9'],
      texto: '**Tu turno.** Escribe por extensión $T = \\{x : x \\text{ es múltiplo de } 3,\\ 0 < x < 10\\}$ arrastrando adentro sus elementos.',
      idea: 'Por extensión, $T = \\{3, 6, 9\\}$.' },

    // ---- Sin repetidos ni orden ----
    { cap: 3, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'K', items: ['c', 'o', 'l', 'o', 'm', 'b', 'i', 'a'] },
      texto: 'Cuarta idea: en un conjunto **nada se repite** y **el orden no importa**.',
      momentos: [
        { dice: 'K es el conjunto de las letras de la palabra COLOMBIA. Metamos las letras una por una.' },
        { pon: ['c', 'o', 'l'], cuenta: '$K = \\{c, o, l\\}$', dice: 'Entran la c, la o y la l…' },
        { pon: ['o'], cuenta: '$K = \\{c, o, l\\}$', dice: '¡Otra o! Ya estaba adentro, así que se funde con la primera: en un conjunto nada se repite.' },
        { pon: ['m', 'b', 'i', 'a'], cuenta: '$K = \\{c, o, l, m, b, i, a\\}$', dice: 'Entran las demás. La palabra tiene ocho letras, pero el conjunto tiene siete elementos.' },
        { mezcla: true, cuenta: '$\\{c, o, l, m, b, i, a\\} = \\{a, b, c, i, l, m, o\\}$', dice: 'Si los ordenamos de otra forma, sigue siendo el mismo conjunto: el orden no importa.' },
        { cuenta: '$n(K) = 7$', dice: 'El número de elementos se llama **cardinal** y se escribe n(K). Aquí, n(K) = 7.' },
      ],
      idea: 'En un conjunto no hay repetidos ni importa el orden. El **cardinal** $n(A)$ es cuántos elementos tiene.' },
    { cap: 3, tipo: 'conjunto', nombre: 'R', items: ['t', 'o', 'u', 'm', 'a', 't', 'p', 'e'], meta: ['t', 'o', 'm', 'a', 'e'], cardinal: true,
      texto: '**Tu turno.** Arma R, el conjunto de las letras de TOMATE. Mete las dos t y mira qué pasa; deja afuera lo que no está en la palabra.',
      idea: '$R = \\{t, o, m, a, e\\}$ y $n(R) = 5$, aunque TOMATE tenga seis letras.' },
    { cap: 3, tipo: 'casillas', filas: [{ tex: '$n(\\{1, 1, 2\\})$', r: '2' }, { tex: '$n(\\{x, y, z, x\\})$', r: '3' }], fichas: ['3', '2', '4', '1'],
      pista: 'Cuenta los elementos distintos: lo repetido cuenta una sola vez.',
      texto: 'El cardinal no cuenta repetidos. Toca la ficha con el cardinal de cada conjunto.',
      idea: 'Lo repetido cuenta una sola vez: $n(\\{1, 1, 2\\}) = 2$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'conjunto', nombre: 'H', items: ['fresa', 'vainilla', 'coco', 'fresa', 'mora', 'vainilla', 'limón', 'fresa', 'mora'], meta: ['fresa', 'vainilla', 'mora'], cardinal: true,
      texto: 'Pedidos de hoy en una heladería: fresa, vainilla, fresa, mora, vainilla, fresa, mora. Arma H, el conjunto de sabores vendidos. ¿Cuántos son?',
      idea: 'Siete pedidos, pero $H = \\{\\text{fresa}, \\text{vainilla}, \\text{mora}\\}$ y $n(H) = 3$.' },
    { cap: 4, tipo: 'cierre', clave: 'alg-0a', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Conjunto y elemento, $\\in$ y $\\notin$, extensión y comprensión, sin repetidos ni orden, y el cardinal.' },
  ],
};
