// Preuniversitario · pu-cm-4 «Potencias, raíces y estimación»: explicación interactiva (spec
// 2026-11-23-explora-leccion-interactiva; escena «potencia» en js/explora-numeros.js). Los ejemplos no son los de los
// ejercicios de la lección (81 por reenvíos, la torre del 2 con 2⁶, 3⁵/3³, 0.36 m², 20, √30, 25 y −27, 2⁹·5⁶, 3⁴·3²/(3²)³, 90 cm²…).
EXPLORA['pu-cm-4'] = {
  caps: ['Multiplicar repetido', 'Al cuadrado: un área', 'Contar factores', 'Raíces', 'Ahora sí, un problema'],
  pasos: [
    // ---- Multiplicar repetido ----
    { cap: 0, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: '¿Qué es una potencia? Es **multiplicar repetido**: el mismo número, varias veces.',
      momentos: [
        { base: 2, e: 1, cuenta: '$2^1 = 2$', dice: 'Tomemos el 2. Uno solo son dos puntos.' },
        { base: 2, e: 3, cuenta: '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$', dice: 'Si multiplicamos 2 por 2 por 2, los puntos se van duplicando y llegan a 8. Eso es 2 a la 3.' },
        { base: 2, e: 5, cuenta: '$2^5 = 32$', dice: 'Cada 2 que se agrega duplica todo lo anterior. Con cinco, ya vamos en 32.' },
        { base: 2, e: 3, cuenta: '$2^3 \\neq 2 \\cdot 3$', dice: 'Ojo: 2 a la 3 no es lo mismo que 2 por 3. Da 8, no 6.' },
        { base: 5, e: 0, cuenta: '$5^0 = 1$', dice: 'Y si el exponente es cero, todavía no hemos multiplicado nada: queda el 1 del que partimos.' },
      ],
      idea: 'Una potencia es multiplicar repetido: $b^n$ son $n$ factores iguales a $b$. Y $b^0 = 1$.' },
    { cap: 0, tipo: 'potencia', base: 3, meta: 3, max: 5,
      texto: '**Tu turno.** Ahora arrastra el exponente hasta que el 3 llegue a 27.',
      idea: 'Tres treses: $3^3 = 27$.' },

    // ---- Al cuadrado: un área ----
    { cap: 1, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'La expresión **al cuadrado** viene de una figura: el área de un cuadrado con ese lado.',
      momentos: [
        { s: 3, cuenta: '$3^2 = 9$', dice: 'Este tiene lado 3: son 3 filas de 3 casillas, 9 en total. Por eso 3 al cuadrado es 9.' },
        { s: 6, cuenta: '$6^2 = 36$', dice: 'Al duplicar el lado, de 3 a 6, uno esperaría el doble de casillas. Pero son 36, ¡el cuádruple!' },
        { s: 10, cuenta: '$10^2 = 100$', dice: 'Con lado 10 llegamos a 100 casillas. El área siempre es lado por lado.' },
        { s: 9, cuenta: '$(3 \\cdot 3)^2 = 9 \\cdot 9 = 81$', dice: '¿Y al triplicar el lado, de 3 a 9? Pasamos de 9 casillas a 81: nueve veces más área.' },
        { s: 3, cuenta: '$0.3^2 = 0.09$', dice: 'También sirve con decimales. Si las 100 casillas valen 1, un lado de 0.3 cubre 9: el área es 0.09.' },
      ],
      idea: 'Elevar al cuadrado es el área de un cuadrado: $n^2 = n \\cdot n$.' },
    { cap: 1, tipo: 'potencia', modo: 'lado', meta: 7, max: 10,
      texto: '**Tu turno.** Mueve el lado hasta que el cuadrado tenga 49 casillas.',
      idea: 'Lado 7: $7^2 = 49$.' },

    // ---- Contar factores ----
    { cap: 2, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: 'Las leyes de las potencias no hay que memorizarlas: **salen de contar**.',
      momentos: [
        { base: 2, grupos: [3, 4], cuenta: '$2^3 \\cdot 2^4$', dice: 'Mira estos dos grupos: en uno el 2 está tres veces; en el otro, cuatro.' },
        { base: 2, grupos: [3, 4], junta: true, cuenta: '$2^3 \\cdot 2^4 = 2^7$', dice: 'Cuando los multiplicamos se juntan, y el 2 queda siete veces. Por eso se suman los exponentes.' },
        { base: 5, grupos: [2, 2, 2], cuenta: '$(5^2)^3$', dice: 'Veamos otro caso: tres grupos iguales, y en cada uno el 5 está dos veces.' },
        { base: 5, grupos: [2, 2, 2], junta: true, cuenta: '$(5^2)^3 = 5^6$', dice: 'Tres grupos de dos son seis. Al elevar una potencia, los exponentes se multiplican.' },
      ],
      idea: 'Con la misma base, al multiplicar potencias los exponentes se suman; al elevar una potencia, se multiplican.' },
    { cap: 2, tipo: 'casillas', filas: [{ tex: '$3^2 \\cdot 3^5$', r: '3⁷' }, { tex: '$(7^2)^4$', r: '7⁸' }], fichas: ['3¹⁰', '7⁸', '3⁷', '7⁶'],
      pista: 'Cuenta los factores: en el primero se juntan, en el segundo hay grupos iguales.',
      texto: '**Tu turno.** Toca la ficha de cada resultado. Basta con contar los factores, sin calcular nada.',
      idea: '$3^2 \\cdot 3^5 = 3^7$ y $(7^2)^4 = 7^8$.' },

    // ---- Raíces ----
    { cap: 3, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'Hagamos la pregunta al revés: eso es la **raíz cuadrada**.',
      momentos: [
        { s: 1, dice: 'Esta vez conocemos el área, 81 casillas, y queremos saber cuánto mide el lado.' },
        { s: 9, ms: 1800, cuenta: '$\\sqrt{81} = 9$', dice: 'Hacemos crecer el cuadrado hasta las 81 casillas, y el lado mide 9. Esa es la raíz de 81.' },
        { s: 8, cuenta: '$8^2 = 64 < 70$', dice: 'Probemos con la raíz de 70. Un lado de 8 da 64 casillas: todavía no alcanza.' },
        { s: 9, cuenta: '$64 < 70 < 81$', dice: 'Uno de 9 da 81 y se pasa. Entonces la raíz de 70 está entre 8 y 9, más cerca del 8.' },
        { s: 6, cuenta: '$\\sqrt{0.36} = 0.6$', dice: 'Para la raíz de 0.36 pintamos 36 casillas de 100. El lado mide 6 décimas: la raíz es 0.6.' },
        { s: 10, cuenta: '$71 \\cdot 19 \\approx 70 \\cdot 20 = 1\\,400$', dice: 'Estimar también ayuda. En vez de 71 por 19, pensamos en 70 por 20: da cerca de 1 400.' },
      ],
      idea: 'La raíz cuadrada busca el lado: $\\sqrt{81} = 9$ porque $9^2 = 81$. Si no es exacta, se acorrala entre dos cuadrados.' },
    { cap: 3, tipo: 'potencia', modo: 'lado', meta: 8, max: 10,
      texto: '**Tu turno.** Encuentra la raíz de 64: mueve el lado hasta que el cuadrado tenga 64 casillas.',
      idea: '$\\sqrt{64} = 8$ porque $8^2 = 64$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'potencia', base: 10, meta: 5, max: 7,
      texto: 'En un juego, cada nivel multiplica los puntos por 10 y se empieza con 1. ¿Cuántos niveles hay que pasar para llegar a 100 000? Arrastra.',
      idea: 'Cinco veces por 10: $10^5 = 100\\,000$, un 1 con cinco ceros.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-4', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Multiplicar repetido, el cuadrado como área, contar factores y la raíz como la pregunta al revés.' },
  ],
};
