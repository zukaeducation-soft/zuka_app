// Preuniversitario · pu-cm-4 «Potencias, raíces y estimación»: explicación interactiva (spec
// 2026-11-23-explora-leccion-interactiva; escena «potencia» en js/explora-numeros.js). Los ejemplos no son los de los
// ejercicios de la lección (81 por reenvíos, la torre del 2 con 2⁶, 3⁵/3³, 0.36 m², 20, √30, 25 y −27, 2⁹·5⁶, 3⁴·3²/(3²)³, 90 cm²…).
EXPLORA['pu-cm-4'] = {
  caps: ['Multiplicar repetido', 'Al cuadrado: un área', 'Contar factores', 'Raíces', 'Ahora sí, un problema'],
  pasos: [
    // ---- Multiplicar repetido ----
    { cap: 0, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: 'Empecemos por la idea: una potencia es **multiplicar repetido**.',
      momentos: [
        { base: 2, e: 1, cuenta: '$2^1 = 2$', dice: 'Primero, un solo 2: dos puntos.' },
        { base: 2, e: 3, cuenta: '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$', dice: '2 a la 3 es multiplicar tres doses: 2 por 2 por 2. Mira cómo se duplican los puntos.' },
        { base: 2, e: 5, cuenta: '$2^5 = 32$', dice: 'Cada factor más duplica todo: con cinco doses ya son 32.' },
        { base: 2, e: 3, cuenta: '$2^3 \\neq 2 \\cdot 3$', dice: 'Cuidado: 2 a la 3 no es 2 por 3. Son ocho, no seis.' },
        { base: 5, e: 0, cuenta: '$5^0 = 1$', dice: 'Y con cero factores la potencia vale 1: es el punto de partida de toda multiplicación.' },
      ],
      idea: 'Una potencia es multiplicar repetido: $b^n$ son $n$ factores iguales a $b$. Y $b^0 = 1$.' },
    { cap: 0, tipo: 'potencia', base: 3, meta: 3, max: 5,
      texto: '**Tu turno.** Arrastra el exponente hasta que el 3 llegue a 27.',
      idea: 'Tres treses: $3^3 = 27$.' },

    // ---- Al cuadrado: un área ----
    { cap: 1, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'Segunda idea: elevar **al cuadrado** es armar un cuadrado.',
      momentos: [
        { s: 3, cuenta: '$3^2 = 9$', dice: 'Un cuadrado de lado 3 tiene 3 filas de 3: nueve casillas. Eso es 3 al cuadrado.' },
        { s: 6, cuenta: '$6^2 = 36$', dice: 'Si el lado se duplica a 6, el área no se duplica: se cuadruplica, 36 casillas.' },
        { s: 10, cuenta: '$10^2 = 100$', dice: 'Lado 10, cien casillas. Por eso se le dice «al cuadrado»: es el área de un cuadrado.' },
        { s: 9, cuenta: '$(3 \\cdot 3)^2 = 9 \\cdot 9 = 81$', dice: 'Al triplicar el lado, de 3 a 9, el área se multiplica por 9: de 9 a 81 casillas.' },
        { s: 3, cuenta: '$0.3^2 = 0.09$', dice: 'Con decimales: si 100 casillas son 1, un lado de 0.3 cubre 9 de las 100. Son 0.09, dos cifras decimales.' },
      ],
      idea: 'Elevar al cuadrado es el área de un cuadrado: $n^2 = n \\cdot n$.' },
    { cap: 1, tipo: 'potencia', modo: 'lado', meta: 7, max: 10,
      texto: '**Tu turno.** Arrastra el lado hasta que el cuadrado tenga 49 casillas.',
      idea: 'Lado 7: $7^2 = 49$.' },

    // ---- Contar factores ----
    { cap: 2, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: 'Tercera idea: las leyes de las potencias **salen de contar**.',
      momentos: [
        { base: 2, grupos: [3, 4], cuenta: '$2^3 \\cdot 2^4$', dice: 'Aquí hay tres doses por un lado y cuatro por otro.' },
        { base: 2, grupos: [3, 4], junta: true, cuenta: '$2^3 \\cdot 2^4 = 2^7$', dice: 'Al multiplicarlos se juntan: siete doses. Los exponentes se suman.' },
        { base: 5, grupos: [2, 2, 2], cuenta: '$(5^2)^3$', dice: 'Ahora tres grupos iguales, cada uno con dos cincos.' },
        { base: 5, grupos: [2, 2, 2], junta: true, cuenta: '$(5^2)^3 = 5^6$', dice: 'En total son seis cincos: al elevar una potencia, los exponentes se multiplican.' },
      ],
      idea: 'Con la misma base, al multiplicar potencias los exponentes se suman; al elevar una potencia, se multiplican.' },
    { cap: 2, tipo: 'casillas', filas: [{ tex: '$3^2 \\cdot 3^5$', r: '3⁷' }, { tex: '$(7^2)^4$', r: '7⁸' }], fichas: ['3¹⁰', '7⁸', '3⁷', '7⁶'],
      pista: 'Cuenta los factores: en el primero se juntan, en el segundo hay grupos iguales.',
      texto: '**Tu turno.** Toca la ficha de cada resultado. Cuenta los factores: no hay que calcular nada.',
      idea: '$3^2 \\cdot 3^5 = 3^7$ y $(7^2)^4 = 7^8$.' },

    // ---- Raíces ----
    { cap: 3, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'Cuarta idea: la **raíz cuadrada** es la pregunta al revés.',
      momentos: [
        { s: 1, dice: 'Ya no preguntamos cuánto da el área, sino qué lado tiene un cuadrado de 81 casillas.' },
        { s: 9, ms: 1800, cuenta: '$\\sqrt{81} = 9$', dice: 'El cuadrado crece hasta 81 casillas: su lado es 9. Por eso la raíz de 81 es 9.' },
        { s: 8, cuenta: '$8^2 = 64 < 70$', dice: '¿Y la raíz de 70? Con lado 8 hay 64 casillas: no alcanza.' },
        { s: 9, cuenta: '$64 < 70 < 81$', dice: 'Con lado 9 hay 81: se pasa. La raíz de 70 está entre 8 y 9, más cerca de 8.' },
        { s: 6, cuenta: '$\\sqrt{0.36} = 0.6$', dice: 'Con decimales igual: 0.36 son 36 casillas de 100, un cuadrado de lado 6 décimas. La raíz es 0.6.' },
        { s: 10, cuenta: '$71 \\cdot 19 \\approx 70 \\cdot 20 = 1\\,400$', dice: 'Estimar un producto: se redondea cada número a una cifra. 7 por 2 son 14, y dos ceros más.' },
      ],
      idea: 'La raíz cuadrada busca el lado: $\\sqrt{81} = 9$ porque $9^2 = 81$. Si no es exacta, se acorrala entre dos cuadrados.' },
    { cap: 3, tipo: 'potencia', modo: 'lado', meta: 8, max: 10,
      texto: '**Tu turno.** Encuentra la raíz de 64: arrastra el lado del cuadrado hasta que tenga 64 casillas.',
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
