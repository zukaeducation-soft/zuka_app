// Preuniversitario · pu-cm-2 «Fracciones»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva; escena «barras»
// en js/explora-numeros.js). Cada capítulo abre explicando, sigue «tu turno» y el problema va al final. Los ejemplos no son los
// de los ejercicios de la lección (tabla de quintos, 6/9, entre 1/2 y 3/5, 11/12, 7/8 − 1/2, 1/3 de 3/4, 3/5 = 21, 1/4 + 2/3…).
EXPLORA['pu-cm-2'] = {
  caps: ['Partes iguales', 'Fracciones equivalentes', 'Comparar y sumar', 'La fracción de una cantidad', 'Ahora sí, un problema'],
  pasos: [
    // ---- Partes iguales ----
    { cap: 0, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Empecemos por la idea: **qué es una fracción**. Mira la barra.',
      momentos: [
        { barras: [{ n: 0, d: 1 }], dice: 'Una fracción nace de cortar algo en partes iguales. Esta es una barra entera.' },
        { barras: [{ n: 0, d: 8 }], dice: 'La cortamos en 8 partes iguales. Ese 8 va abajo: se llama **denominador**.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Tomamos 3 de esas partes. El 3 va arriba: es el **numerador**. Son tres octavos.' },
        { barras: [{ n: 8, d: 8 }], cuenta: '$\\tfrac88 = 1$', dice: 'Si se toman las 8 partes, se tiene la barra entera: ocho octavos son 1.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Las partes deben ser iguales: si una fuera más grande, «tres octavos» no diría cuánto es.' },
      ],
      idea: 'El denominador dice en cuántas partes **iguales** se corta; el numerador, cuántas se toman.' },
    { cap: 0, tipo: 'barras', meta: [4, 7], d: 7,
      texto: '**Tu turno.** La barra está cortada en séptimos. Toma cuatro séptimos: arrastra sobre ella.',
      idea: 'Cuatro de siete partes iguales: $\\tfrac47$.' },

    // ---- Fracciones equivalentes ----
    { cap: 1, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Segunda idea: fracciones distintas pueden ser **la misma cantidad**.',
      momentos: [
        { barras: [{ n: 1, d: 2, label: '1/2' }], cuenta: '$\\tfrac12$', dice: 'Media barra: un medio.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }], cuenta: '$\\tfrac12 = \\tfrac24$',
          dice: 'Si cada parte se corta en dos, hay el doble de partes y se toma el doble: dos cuartos. ¡Mide lo mismo!' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }, { n: 4, d: 8, label: '4/8' }], cuenta: '$\\tfrac12 = \\tfrac24 = \\tfrac48$',
          dice: 'Otra vez, cuatro octavos. Multiplicar arriba y abajo por lo mismo no cambia la cantidad.' },
        { barras: [{ n: 10, d: 12, label: '10/12' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac{10}{12} = \\tfrac56$',
          dice: 'Simplificar es el camino de vuelta: dividir arriba y abajo entre lo mismo. Diez doceavos son cinco sextos.' },
      ],
      idea: 'Multiplicar o dividir arriba y abajo por el mismo número da una fracción **equivalente**: la misma cantidad.' },
    { cap: 1, tipo: 'barras', meta: [1, 3], d: 3, cortar: true, dpide: 12,
      texto: '**Tu turno.** Muestra un tercio, pero con la barra cortada en 12 partes: corta con la regla de abajo y llena.',
      idea: 'Un tercio son cuatro doceavos: $\\tfrac13 = \\tfrac{4}{12}$.' },

    // ---- Comparar y sumar ----
    { cap: 2, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Tercera idea: para comparar o sumar, primero **partes del mismo tamaño**.',
      momentos: [
        { barras: [{ n: 5, d: 6, label: '5/6' }, { n: 4, d: 5, label: '4/5' }], dice: '¿Cuál es mayor, 5/6 o 4/5? Con partes de distinto tamaño, a ojo no se sabe.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 = \\tfrac{25}{30} \\quad \\tfrac45 = \\tfrac{24}{30}$',
          dice: 'Las pasamos a partes iguales: treintavos. Ahora sí se cuentan, 25 contra 24.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 > \\tfrac45$',
          dice: 'Por eso 5/6 es mayor. El atajo es multiplicar en cruz: 5 por 5 son 25 y 4 por 6 son 24.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 1, d: 3, label: '1/3' }], cuenta: '$\\tfrac12 + \\tfrac13$',
          dice: 'Al sumar pasa lo mismo. Un medio más un tercio: no se juntan pedazos de distinto tamaño.' },
        { barras: [{ n: 3, d: 6, label: '3/6' }, { n: 2, d: 6, label: '2/6' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac36 + \\tfrac26 = \\tfrac56$',
          dice: 'En sextos sí: tres sextos más dos sextos son cinco sextos. Nunca 2/5: arriba con arriba y abajo con abajo no vale.' },
      ],
      idea: 'Para comparar o sumar, primero partes del mismo tamaño (el mismo denominador); luego se cuentan.' },
    { cap: 2, tipo: 'barras', meta: [7, 10], d: 2, cortar: true,
      texto: '**Tu turno.** Un medio más un quinto: corta en partes donde quepan los dos y llena la suma.',
      idea: 'En décimos: $\\tfrac12 + \\tfrac15 = \\tfrac{5}{10} + \\tfrac{2}{10} = \\tfrac{7}{10}$.' },

    // ---- La fracción de una cantidad ----
    { cap: 3, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Cuarta idea: **la fracción de una cantidad**. Ahora la barra vale algo.',
      momentos: [
        { barras: [{ n: 0, d: 1, total: 20 }], dice: 'Esta barra son 20 dulces. ¿Cuánto son tres cuartos de 20?' },
        { barras: [{ n: 0, d: 4, total: 20 }], cuenta: '$20 \\div 4 = 5$', dice: 'Primero se divide: 20 en 4 partes iguales da 5 en cada parte.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\text{ de } 20 = 3 \\cdot 5 = 15$',
          dice: 'Luego se toman 3 partes: 3 por 5 son 15. Divide entre el de abajo y multiplica por el de arriba.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\cdot 20 = \\tfrac{60}{4} = 15$',
          dice: 'También se puede multiplicar primero y dividir después: da lo mismo.' },
      ],
      idea: 'La fracción de una cantidad: se divide entre el denominador y se multiplica por el numerador.' },
    { cap: 3, tipo: 'barras', meta: [5, 6], d: 6, total: 42,
      texto: '**Tu turno.** Un viaje de 42 km: ya van cinco sextos. Toma esa parte y mira cuántos kilómetros son.',
      idea: 'Cada sexto son 7 km: $\\tfrac56 \\text{ de } 42 = 35$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'barras', meta: [2, 3], d: 1, cortar: true, total: 24,
      texto: 'Una cinta de 24 m se reparte y Ana se lleva dos tercios. Corta la cinta y toma su parte: ¿cuántos metros son?',
      idea: 'Cada tercio son 8 m: Ana se lleva $\\tfrac23 \\text{ de } 24 = 16$ m.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-2', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Partes iguales, fracciones equivalentes, comparar y sumar con el mismo denominador, y la fracción de una cantidad.' },
  ],
};
